-- Contact form submissions (POST /api/contact). Idempotent.

CREATE TABLE IF NOT EXISTS support_messages (
  id         VARCHAR(64) PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  email      VARCHAR(320) NOT NULL,
  topic      VARCHAR(120),
  message    TEXT NOT NULL,
  emailed    TINYINT(1) NOT NULL DEFAULT 0,
  ip         VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_support_messages_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
