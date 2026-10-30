# Give away Iphone - NPS.BEC Bandung

## Database lokasi (Neon)

1. Buat project PostgreSQL di Neon.
2. Jalankan isi [`database/schema.sql`](./database/schema.sql) melalui Neon SQL Editor.
3. Salin connection string Neon (gunakan pooled connection string) ke environment variables Vercel sebagai `DATABASE_URL`.
4. Buat token admin acak, lalu simpan sebagai environment variable Vercel `LOCATION_ADMIN_TOKEN`. Jangan gunakan awalan `VITE_` dan jangan masukkan nilainya ke kode frontend.
5. Redeploy project setelah kedua environment variable ditambahkan.

Contoh membuat token acak dengan Node.js:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

## Persetujuan dan pengumpulan lokasi

Halaman tidak mengambil lokasi secara otomatis. Pengunjung harus mencentang persetujuan dan menekan **Bagikan lokasi saya**. Browser kemudian meminta izin lokasi; koordinat hanya dikirim setelah izin diberikan. Fitur ini memerlukan HTTPS (Vercel menyediakan HTTPS).

Database hanya menyimpan koordinat, akurasi GPS, dan waktu persetujuan/pengiriman; data identitas pengunjung tidak dikumpulkan. API mempertahankan maksimal 10 lokasi terbaru. Beritahu pengunjung tentang tujuan pengumpulan dan siapa yang dapat mengakses data sebelum mereka menyetujui.

## Melihat 10 lokasi terbaru

Kirim permintaan GET ke `/api/locations` dengan token admin melalui header Authorization. Contoh:

```sh
curl.exe -H "Authorization: Bearer TOKEN_ADMIN_ANDA" https://DOMAIN-ANDA/api/locations
```

Jangan panggil endpoint admin dari frontend atau menaruh token di URL. Simpan token secara rahasia dan rotasi melalui Vercel bila token terekspos.
