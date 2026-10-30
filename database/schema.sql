CREATE TABLE IF NOT EXISTS visitor_locations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL
    CHECK (latitude BETWEEN -90 AND 90),
  longitude DOUBLE PRECISION NOT NULL
    CHECK (longitude BETWEEN -180 AND 180),
  accuracy_m DOUBLE PRECISION NOT NULL
    CHECK (accuracy_m BETWEEN 0 AND 100000),
  consented_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS visitor_locations_created_at_idx
  ON visitor_locations (created_at DESC, id DESC);
