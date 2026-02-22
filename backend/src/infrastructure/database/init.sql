CREATE TABLE IF NOT EXISTS todos (
  id         UUID PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  completed  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos (created_at DESC);