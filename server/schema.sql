-- Synapse database schema (MariaDB / MySQL). Idempotent.

-- Generic JSON document store — mirrors the app's localStorage keys 1:1.
CREATE TABLE IF NOT EXISTS app_state (
  k          VARCHAR(160) PRIMARY KEY,
  v          LONGTEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
