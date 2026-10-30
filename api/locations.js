import { timingSafeEqual } from "node:crypto";
import { neon } from "@neondatabase/serverless";

function isAuthorized(request, expectedToken) {
  const authorization = request.headers.authorization || "";
  const suppliedToken = authorization.replace(/^Bearer\s+/i, "");

  if (!suppliedToken || suppliedToken.length !== expectedToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(suppliedToken), Buffer.from(expectedToken));
}

function isSameOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers["x-forwarded-host"] || request.headers.host;

  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "GET" && request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Metode tidak diizinkan." });
  }

  if (!process.env.DATABASE_URL) {
    return response.status(500).json({ error: "Database belum dikonfigurasi." });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (request.method === "POST") {
      if (!isSameOrigin(request)) {
        return response.status(403).json({ error: "Permintaan tidak diizinkan." });
      }

      const { consent, latitude, longitude, accuracyM } = request.body || {};
      if (
        consent !== true ||
        !Number.isFinite(latitude) ||
        latitude < -90 ||
        latitude > 90 ||
        !Number.isFinite(longitude) ||
        longitude < -180 ||
        longitude > 180 ||
        !Number.isFinite(accuracyM) ||
        accuracyM < 0 ||
        accuracyM > 100000
      ) {
        return response.status(400).json({ error: "Data lokasi tidak valid." });
      }

      await sql.transaction([
        sql`SELECT pg_advisory_xact_lock(572014)`,
        sql`
          INSERT INTO visitor_locations
            (latitude, longitude, accuracy_m, consented_at)
          VALUES
            (${latitude}, ${longitude}, ${accuracyM}, now())
        `,
        sql`
          DELETE FROM visitor_locations
          WHERE id IN (
            SELECT id
            FROM visitor_locations
            ORDER BY created_at DESC, id DESC
            OFFSET 10
          )
        `,
      ]);

      return response.status(201).json({ message: "Lokasi berhasil disimpan." });
    }

    const adminToken = process.env.LOCATION_ADMIN_TOKEN;
    if (!adminToken) {
      return response.status(500).json({ error: "Akses admin belum dikonfigurasi." });
    }

    if (!isAuthorized(request, adminToken)) {
      return response.status(401).json({ error: "Token admin tidak valid." });
    }

    const locations = await sql`
      SELECT
        id,
        latitude,
        longitude,
        accuracy_m AS "accuracyM",
        consented_at AS "consentedAt"
      FROM visitor_locations
      ORDER BY created_at DESC, id DESC
      LIMIT 10
    `;

    return response.status(200).json({ locations });
  } catch (error) {
    console.error("Location API request failed:", error);
    return response.status(500).json({ error: "Permintaan lokasi gagal diproses." });
  }
}
