-- Server-held browser sessions (sessionStore.js).
--
-- The cookie carries 32 random bytes; only their SHA-256 is stored, so a dump
-- of this table cannot be replayed as a session. The Supabase tokens are
-- AES-256-GCM sealed under SESSION_ENC_KEY (iv || tag || ciphertext), so a dump
-- alone cannot be replayed against Supabase either.
CREATE TABLE IF NOT EXISTS sessions (
  id                CHAR(64)        NOT NULL PRIMARY KEY,
  user_id           VARCHAR(64)     NOT NULL,
  refresh_token     VARBINARY(1024) NOT NULL,
  access_token      VARBINARY(4096) NOT NULL,
  access_expires_at DATETIME        NOT NULL,
  aal               ENUM('aal1','aal2') NOT NULL DEFAULT 'aal1',
  created_at        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_agent        VARCHAR(255)    NULL,
  KEY user_idx (user_id),
  KEY seen_idx (last_seen_at)
);
