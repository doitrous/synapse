-- Synapse database schema (MariaDB / MySQL). Idempotent.

CREATE TABLE IF NOT EXISTS schema_migrations (
  id         VARCHAR(160) PRIMARY KEY,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Generic JSON document store — mirrors the app's localStorage keys 1:1.
CREATE TABLE IF NOT EXISTS app_state (
  k          VARCHAR(160) PRIMARY KEY,
  v          LONGTEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Recoverable versions of shared/admin documents. A row is added only when a
-- document actually changes, so autosave does not create duplicate history.
CREATE TABLE IF NOT EXISTS app_state_versions (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  k          VARCHAR(160) NOT NULL,
  v          LONGTEXT NOT NULL,
  actor_id   VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_app_state_versions (k, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Private learning state. The composite primary key makes ownership explicit:
-- the same key (for example notebook notes) can safely exist for every user.
CREATE TABLE IF NOT EXISTS user_state (
  user_id    VARCHAR(64) NOT NULL,
  k          VARCHAR(160) NOT NULL,
  v          LONGTEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, k),
  INDEX idx_user_state_updated (user_id, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_state_versions (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    VARCHAR(64) NOT NULL,
  k          VARCHAR(160) NOT NULL,
  v          LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_state_versions (user_id, k, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Application roles are deliberately separate from client-editable profile
-- metadata. New accounts are students; admin promotion is an explicit,
-- audited server-side action.
CREATE TABLE IF NOT EXISTS user_access (
  user_id       VARCHAR(64) PRIMARY KEY,
  email         VARCHAR(255),
  role          ENUM('student','admin') NOT NULL DEFAULT 'student',
  status        ENUM('active','suspended') NOT NULL DEFAULT 'active',
  promoted_by   VARCHAR(64),
  promoted_at   DATETIME,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_access_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS role_promotion_audit (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       VARCHAR(64) NOT NULL,
  previous_role VARCHAR(32) NOT NULL,
  next_role     VARCHAR(32) NOT NULL,
  promoted_by   VARCHAR(64) NOT NULL,
  reason        VARCHAR(500) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_role_promotions (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- On-demand, same-MariaDB recovery snapshots. These are convenient restore
-- points, not disaster recovery; an off-server dump is still required.
CREATE TABLE IF NOT EXISTS data_snapshots (
  id            VARCHAR(64) PRIMARY KEY,
  label         VARCHAR(255) NOT NULL,
  snapshot_json LONGTEXT NOT NULL,
  created_by    VARCHAR(64),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_data_snapshots_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Students.
CREATE TABLE IF NOT EXISTS students (
  id                 VARCHAR(64) PRIMARY KEY,
  name               VARCHAR(255),
  email              VARCHAR(255) UNIQUE,
  university_id      VARCHAR(64),
  year               VARCHAR(32),
  plan               VARCHAR(64),
  status             VARCHAR(32),
  joined             DATE,
  last_active        DATETIME,
  questions_answered INT DEFAULT 0,
  accuracy           FLOAT DEFAULT 0,
  readiness          FLOAT DEFAULT 0,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Mail addresses we own (e.g. synapse@mail.doitrous.com).
CREATE TABLE IF NOT EXISTS mailboxes (
  address    VARCHAR(255) PRIMARY KEY,
  label      VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Messages (both directions).
CREATE TABLE IF NOT EXISTS emails (
  id         VARCHAR(64) PRIMARY KEY,
  direction  ENUM('inbound','outbound') NOT NULL,
  mailbox    VARCHAR(255),
  from_addr  VARCHAR(255),
  to_addr    TEXT,
  cc         TEXT,
  bcc        TEXT,
  subject    VARCHAR(998),
  html       LONGTEXT,
  text       LONGTEXT,
  status     VARCHAR(32),
  resend_id  VARCHAR(128),
  at         DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mail (mailbox, direction, at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Attachments. Small files stored inline (base64) or via storage_url for large ones.
CREATE TABLE IF NOT EXISTS attachments (
  id           VARCHAR(64) PRIMARY KEY,
  email_id     VARCHAR(64),
  filename     VARCHAR(255),
  content_type VARCHAR(128),
  size_bytes   INT,
  content_b64  LONGTEXT,
  storage_url  TEXT,
  FOREIGN KEY (email_id) REFERENCES emails(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
