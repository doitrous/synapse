-- Connect Cortex database schema (MariaDB / MySQL). Idempotent.

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
  -- Stored in E.164 so that 0100…, +20100… and 0020100… cannot register twice.
  phone              VARCHAR(32) UNIQUE,
  nationality        VARCHAR(64),
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

/* A student's own documents — a lecture handout, a scanned notebook.
   Ownership is a column and every query filters on it; the client never
   supplies a storage path, so a crafted one cannot escape the store. Rows are
   soft-deleted so a delete that races an in-flight read cannot 404 a reader
   mid-page; the bytes go immediately. */
CREATE TABLE IF NOT EXISTS user_documents (
  id           VARCHAR(64) PRIMARY KEY,
  user_id      VARCHAR(64) NOT NULL,
  title        VARCHAR(255) NOT NULL,
  storage_key  VARCHAR(255) NOT NULL,
  media_type   VARCHAR(32) NOT NULL DEFAULT 'pdf',
  size_bytes   BIGINT UNSIGNED NOT NULL DEFAULT 0,
  sha256       CHAR(64) NULL,
  page_count   INT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at   DATETIME NULL,
  INDEX idx_user_documents_owner (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Where to send a push notification.

   The token is the primary key, not the user, because it identifies a device
   and a device is what Apple delivers to. One person legitimately has several
   (phone, iPad); the same phone can also be handed to someone else, or a second
   student can sign in on it. Keying on the token means the later registration
   simply moves that device to the new owner, so a notification meant for one
   student cannot keep arriving on a device now signed in as another.

   `environment` is recorded because a sandbox token is invalid against the
   production APNs host and vice versa — sending to the wrong one fails for
   every build that was not the one that registered.

   Rows are deleted on sign-out and whenever Apple reports a token as gone. */
CREATE TABLE IF NOT EXISTS device_tokens (
  token        VARCHAR(255) PRIMARY KEY,
  user_id      VARCHAR(64) NOT NULL,
  platform     ENUM('ios') NOT NULL DEFAULT 'ios',
  environment  ENUM('sandbox','production') NOT NULL DEFAULT 'production',
  locale       VARCHAR(16) NULL,
  app_version  VARCHAR(32) NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_device_tokens_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Who has asked not to receive which category of email.
--
-- One row per address per category, written when someone unsubscribes and read
-- before every send. Transactional mail — verification, receipts, password
-- resets, privacy requests — is never suppressed: it is sent because something
-- happened to that account, and withholding it would harm the reader.
--
-- `token` is what the one-click link carries, so an address is never exposed in
-- a URL and a leaked link cannot be used to enumerate subscribers.
CREATE TABLE IF NOT EXISTS email_suppressions (
  id         VARCHAR(64) PRIMARY KEY,
  address    VARCHAR(255) NOT NULL,
  -- NULL means every non-transactional category.
  category   VARCHAR(64) NULL,
  reason     VARCHAR(32) NOT NULL DEFAULT 'unsubscribed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_suppression (address, category),
  INDEX idx_suppression_address (address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- The opaque token behind an unsubscribe link, minted per recipient.
CREATE TABLE IF NOT EXISTS email_unsubscribe_tokens (
  token      CHAR(48) PRIMARY KEY,
  address    VARCHAR(255) NOT NULL,
  category   VARCHAR(64) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_unsub_address (address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Study assistant ────────────────────────────────────────────────────────
   Three tables, because the assistant has three separable concerns: how it is
   configured, what each tier is allowed, and what has actually been spent.

   Deliberately absent: a transcript table. Storing what a student asks the
   assistant would be a record of exactly which topics they are weakest on,
   attached to their name, with no product that reads it yet. Usage is counted
   in aggregate instead, which is all the quota and the admin view need. */

-- One row, id = 1. The API key is stored encrypted (AES-256-GCM) under
-- ASSISTANT_KEY_SECRET and is never returned to any client, admin included —
-- `key_hint` is the last four characters, which is enough to tell two keys
-- apart and useless to anyone who reads it.
CREATE TABLE IF NOT EXISTS assistant_settings (
  id            TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
  enabled       BOOLEAN NOT NULL DEFAULT 0,
  model         VARCHAR(120) NOT NULL DEFAULT 'claude-sonnet-5',
  -- NULL means "use ANTHROPIC_API_KEY from the environment", which is the
  -- safer default and the one a fresh install starts on.
  api_key_enc   TEXT NULL,
  key_hint      VARCHAR(8) NULL,
  max_tokens    SMALLINT UNSIGNED NOT NULL DEFAULT 700,
  temperature   DECIMAL(3,2) NOT NULL DEFAULT 0.30,
  -- Appended to the built-in prompt rather than replacing it, so the clinical
  -- guardrail cannot be edited away from this screen.
  extra_prompt  TEXT NULL,
  updated_by    VARCHAR(64) NULL,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- What one tier may spend in a day. Keyed by the normalised plan name, so a
-- plan an admin invents from the subscription screen can be given a limit here
-- without a migration. A plan with no row falls back to `free` — fails closed.
CREATE TABLE IF NOT EXISTS assistant_tier_limits (
  plan            VARCHAR(64) PRIMARY KEY,
  label           VARCHAR(120) NOT NULL,
  daily_messages  SMALLINT UNSIGNED NOT NULL DEFAULT 10,
  enabled         BOOLEAN NOT NULL DEFAULT 1,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- One row per account per day. Written only after a model call succeeds, so a
-- failed request never costs a student a message.
CREATE TABLE IF NOT EXISTS assistant_usage (
  user_id       VARCHAR(64) NOT NULL,
  day           DATE NOT NULL,
  plan          VARCHAR(64) NOT NULL,
  messages      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  input_tokens  INT UNSIGNED NOT NULL DEFAULT 0,
  output_tokens INT UNSIGNED NOT NULL DEFAULT 0,
  fallbacks     SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, day),
  INDEX idx_assistant_usage_day (day)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* The assistant is no longer tied to one vendor. `provider` selects the wire
   format and the endpoint; `base_url` overrides it for a self-hosted or
   OpenAI-compatible endpoint that has no entry of its own. */
ALTER TABLE assistant_settings ADD COLUMN IF NOT EXISTS provider VARCHAR(32) NOT NULL DEFAULT 'anthropic' AFTER enabled;
ALTER TABLE assistant_settings ADD COLUMN IF NOT EXISTS base_url VARCHAR(300) NULL AFTER model;

/* One key per provider, rather than one key.
   Switching from Groq to Gemini to compare them should not mean pasting a key
   back in each time, and a key that has to be re-entered to switch is a key
   that ends up somewhere more convenient and less safe. Encrypted exactly as
   the single key was; `key_hint` is the last four characters. */
CREATE TABLE IF NOT EXISTS assistant_provider_keys (
  provider    VARCHAR(32) PRIMARY KEY,
  api_key_enc TEXT NOT NULL,
  key_hint    VARCHAR(8) NULL,
  updated_by  VARCHAR(64) NULL,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Friends ─────────────────────────────────────────────────────────────
   A friendship is a single row with its pair sorted, so two students pressing
   Add at the same moment cannot create two rows describing one friendship.
   `requested_by` is kept because it decides who is allowed to answer. */
CREATE TABLE IF NOT EXISTS friendships (
  user_a       VARCHAR(64) NOT NULL,
  user_b       VARCHAR(64) NOT NULL,
  requested_by VARCHAR(64) NOT NULL,
  status       ENUM('pending','accepted','declined') NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME NULL,
  PRIMARY KEY (user_a, user_b),
  INDEX idx_friendships_b (user_b, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Whether this student may be found in their cohort's directory. Default on:
   being findable by your own classmates is the point of the directory, and the
   cohort is already closed. The toggle lives in Account. */
ALTER TABLE students ADD COLUMN IF NOT EXISTS discoverable BOOLEAN NOT NULL DEFAULT 1;

/* A link a student can send to anyone, on any channel we do not control.
   Single use and short-lived: a link that lives forever in a group chat is a
   standing invitation to an account no one meant to add. */
CREATE TABLE IF NOT EXISTS friend_invites (
  token      CHAR(32) PRIMARY KEY,
  user_id    VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  used_by    VARCHAR(64) NULL,
  INDEX idx_friend_invites_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
