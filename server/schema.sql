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
  -- A second factor is offered to everyone and forced on nobody. This records
  -- that an account asked to be held to aal2; see mfaSatisfied in auth.js.
  mfa_required  BOOLEAN NOT NULL DEFAULT 0,
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

-- Admin-only medical extraction review queue. Candidate wording is preserved
-- here for coverage and editorial work; it is never student-readable evidence.
CREATE TABLE IF NOT EXISTS medical_library_candidate_coverage (
  candidate_id          VARCHAR(96) PRIMARY KEY,
  source_id             VARCHAR(96) NOT NULL,
  system_id             VARCHAR(64),
  subject               VARCHAR(255),
  topic                 VARCHAR(500),
  subtopic              VARCHAR(500),
  microtopic            VARCHAR(500),
  label                 TEXT,
  statement             MEDIUMTEXT,
  concept_type          VARCHAR(255),
  risk_class            VARCHAR(64),
  confidence            DECIMAL(6,5),
  destination           VARCHAR(96) NOT NULL,
  reason_code           VARCHAR(128) NOT NULL,
  reason                TEXT NOT NULL,
  target_concept_id     VARCHAR(96),
  resource_relative_path TEXT,
  locator_page          INT,
  locator_printed_page  VARCHAR(64),
  locator_section       VARCHAR(500),
  locator_start         INT,
  locator_end           INT,
  coverage_unit_id      VARCHAR(191),
  support_span          TEXT,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_medical_candidate_destination (destination),
  INDEX idx_medical_candidate_system (system_id),
  INDEX idx_medical_candidate_source (source_id),
  INDEX idx_medical_candidate_target (target_concept_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Availability is kept separately from evidence qualification: a digest may
-- exist while its source binary or exact locator is unavailable.
CREATE TABLE IF NOT EXISTS medical_library_source_availability (
  source_id           VARCHAR(96) PRIMARY KEY,
  collection_id       VARCHAR(96) NOT NULL,
  relative_path       TEXT,
  availability_status VARCHAR(96) NOT NULL,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_medical_source_collection (collection_id),
  INDEX idx_medical_source_status (availability_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Account administration ──────────────────────────────────────────────
   Three things were missing before an admin could actually manage a user.

   The identity (`user_access`) and the profile (`students`) were joinable only
   by email, which is not a key: an address can change, and two records can
   disagree. `students.user_id` makes the link explicit and nullable, because a
   roster row may legitimately exist before that person has ever signed in.

   Entitlement had nowhere to live at all. `students.plan` names a tier but says
   nothing about when it started or when it ends, so "extend a subscription" had
   no field to extend. `subscriptions` holds one row per granted period; the
   current entitlement is the latest row that has not expired or been cancelled.

   And every action here is consequential — suspending an account, ending a
   subscription, sending a password reset. `account_action_audit` records who
   did what to whom and why, in the same shape as `role_promotion_audit`, so a
   change can always be traced back to a person and a reason. */

ALTER TABLE students ADD COLUMN IF NOT EXISTS user_id VARCHAR(64) NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS notes TEXT NULL;
ALTER TABLE students ADD INDEX IF NOT EXISTS idx_students_user (user_id);

/* The cohort a student belongs to inside their year — "Cardiovascular block",
   "Group B". Vouchers and notification campaigns have always offered group
   targeting, but nothing stored a group, so every group-restricted rule failed
   closed for everyone. This is where an admin now records it. */
ALTER TABLE students ADD COLUMN IF NOT EXISTS study_group VARCHAR(120) NULL;

CREATE TABLE IF NOT EXISTS subscriptions (
  id           VARCHAR(64) PRIMARY KEY,
  student_id   VARCHAR(64) NOT NULL,
  plan         VARCHAR(64) NOT NULL,
  -- `trialing` and `active` both grant access; `expired` and `cancelled` do not.
  -- Expiry is derived from `expires_at` at read time rather than written by a
  -- job, so a lapsed subscription cannot linger as `active` because nothing ran.
  status       ENUM('trialing','active','cancelled') NOT NULL DEFAULT 'active',
  started_at   DATETIME NOT NULL,
  -- NULL means open-ended: a comped or lifetime grant that never lapses.
  expires_at   DATETIME NULL,
  source       ENUM('manual','voucher','payment','trial') NOT NULL DEFAULT 'manual',
  granted_by   VARCHAR(64) NOT NULL,
  note         VARCHAR(500),
  cancelled_at DATETIME NULL,
  cancelled_by VARCHAR(64) NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_subscriptions_student (student_id, started_at),
  INDEX idx_subscriptions_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS account_action_audit (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id  VARCHAR(64) NULL,
  user_id     VARCHAR(64) NULL,
  action      VARCHAR(64) NOT NULL,
  detail      VARCHAR(500),
  reason      VARCHAR(500) NOT NULL,
  actor_id    VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_account_audit_student (student_id, created_at),
  INDEX idx_account_audit_user (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Voucher redemptions.

   The redemption count used to be a field inside the shared vouchers document,
   incremented by a read-modify-write from the student's browser — a contended
   counter edited by every client, and one the API refused to let a student
   write at all. The primary key here is what actually makes "one redemption
   per student" true rather than hoped-for. */
CREATE TABLE IF NOT EXISTS voucher_redemptions (
  voucher_id  VARCHAR(64) NOT NULL,
  user_id     VARCHAR(64) NOT NULL,
  code        VARCHAR(64) NOT NULL,
  redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Set when a student removes the voucher, so the seat returns to the pool
  -- without losing the record that it was once taken.
  released_at DATETIME NULL,
  PRIMARY KEY (voucher_id, user_id),
  INDEX idx_voucher_redemptions_user (user_id, redeemed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Study Together ──────────────────────────────────────────────────────
   A shared test: one student picks a set of published questions, others join
   by code, everyone answers the same set at their own pace, and results open
   once they have finished.

   The question set is frozen into `question_ids` at creation. If it were
   resolved live, an admin publishing or archiving a question mid-session would
   change what people were answering — and the results would compare scores
   over different papers. */
CREATE TABLE IF NOT EXISTS study_rooms (
  id                   VARCHAR(64) PRIMARY KEY,
  code                 VARCHAR(12) NOT NULL UNIQUE,
  name                 VARCHAR(255) NOT NULL,
  host_user_id         VARCHAR(64) NOT NULL,
  question_ids         LONGTEXT NOT NULL,
  timed                TINYINT(1) NOT NULL DEFAULT 1,
  seconds_per_question INT NULL,
  status               ENUM('lobby','running','closed') NOT NULL DEFAULT 'lobby',
  started_at           DATETIME NULL,
  closed_at            DATETIME NULL,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_study_rooms_host (host_user_id, created_at),
  INDEX idx_study_rooms_open (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS study_room_members (
  room_id      VARCHAR(64) NOT NULL,
  user_id      VARCHAR(64) NOT NULL,
  display_name VARCHAR(255),
  joined_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at  DATETIME NULL,
  PRIMARY KEY (room_id, user_id),
  INDEX idx_study_room_members_user (user_id, joined_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Correctness is decided by the server against the published question, never
   taken from the client — a score other people see must not be self-reported. */
CREATE TABLE IF NOT EXISTS study_room_answers (
  room_id      VARCHAR(64) NOT NULL,
  user_id      VARCHAR(64) NOT NULL,
  question_id  VARCHAR(96) NOT NULL,
  chosen_index INT NOT NULL,
  correct      TINYINT(1) NOT NULL,
  seconds      INT NULL,
  answered_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (room_id, user_id, question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
