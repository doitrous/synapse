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

-- Exact, reviewed manifests for retiring a legacy question/article catalogue.
-- The manifest keeps each original target as a manual-recovery record without
-- rolling the entire shared ledger over later edits.
CREATE TABLE IF NOT EXISTS content_archive_operations (
  id                  VARCHAR(64) PRIMARY KEY,
  created_by          VARCHAR(64) NOT NULL,
  status              ENUM('prepared','applied','expired','failed') NOT NULL DEFAULT 'prepared',
  ledger_version      BIGINT UNSIGNED NULL,
  ledger_digest       CHAR(64) NOT NULL,
  manifest_json       LONGTEXT NOT NULL,
  confirmation_phrase VARCHAR(255) NOT NULL,
  reason              VARCHAR(500),
  result_json         LONGTEXT,
  expires_at          DATETIME NOT NULL,
  applied_at          DATETIME,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_content_archive_operations (created_by, created_at),
  INDEX idx_content_archive_status (status, expires_at)
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
  role          ENUM('student','mcq_validator','reviewer','admin','editor') NOT NULL DEFAULT 'student',
  status        ENUM('active','suspended') NOT NULL DEFAULT 'active',
  -- A second factor is offered to everyone and forced on nobody. This records
  -- that an account asked to be held to aal2; see mfaSatisfied in auth.js.
  mfa_required  BOOLEAN NOT NULL DEFAULT 0,
  -- Which modules and years a reviewer may write. NULL means none: a reviewer
  -- with no assignment holds no content. Editors and super admins ignore it.
  content_scope JSON NULL,
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
  year_id            VARCHAR(64),
  plan               VARCHAR(64),
  status             VARCHAR(32),
  joined             DATE,
  last_active        DATETIME,
  questions_answered INT DEFAULT 0,
  accuracy           FLOAT DEFAULT 0,
  readiness          FLOAT DEFAULT 0,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Mail addresses we own (e.g. info@nishany.com).
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
ALTER TABLE students ADD COLUMN IF NOT EXISTS year_id VARCHAR(64) NULL;
ALTER TABLE students ADD INDEX IF NOT EXISTS idx_students_user (user_id);
ALTER TABLE students ADD INDEX IF NOT EXISTS idx_students_university_year_id (university_id, year_id);

CREATE TABLE IF NOT EXISTS academic_publish_requests (
  idempotency_key VARCHAR(128) PRIMARY KEY,
  actor_id        VARCHAR(64) NOT NULL,
  response_json   LONGTEXT NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_academic_publish_actor (actor_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Student-owned public identity. Authentication still comes from Supabase, but
   classmates and leaderboards need a stable handle that is not an email. The
   normalized copy is written by the server and unique only inside a university
   so the same username can exist at different schools without leaking between
   cohorts. */
ALTER TABLE students ADD COLUMN IF NOT EXISTS username VARCHAR(32) NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS username_normalized VARCHAR(32) NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS profile_icon VARCHAR(64) NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS social_provider VARCHAR(32) NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS social_subject VARCHAR(191) NULL;
/* Usernames are unique across the whole platform, not per university — see
   migration 0012. Multiple NULLs are allowed, so students without a username
   do not collide. */
ALTER TABLE students ADD UNIQUE INDEX IF NOT EXISTS uniq_students_username (username_normalized);

/* A photo, not a glyph. Points at a `managed_media` row (uploaded or imported
   from the OAuth provider's `avatar_url`/`picture`) rather than storing bytes
   here — the same table and serving path teaching media already uses. Null
   means "show the profile_icon glyph instead". */
ALTER TABLE students ADD COLUMN IF NOT EXISTS avatar_media_id VARCHAR(64) NULL;

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
  -- 'pdf' for anything the in-app reader can open, 'file' for everything else.
  media_type   VARCHAR(32) NOT NULL DEFAULT 'pdf',
  -- What it was called and what it is, so a download arrives named and typed.
  file_name    VARCHAR(255) NULL,
  mime_type    VARCHAR(128) NULL,
  size_bytes   BIGINT UNSIGNED NOT NULL DEFAULT 0,
  sha256       CHAR(64) NULL,
  page_count   INT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at   DATETIME NULL,
  INDEX idx_user_documents_owner (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Server-authoritative teaching media. The descriptive library remains in the
   versioned admin document, but file readiness lives here so a newly completed
   upload can be fetched immediately instead of waiting for that document's
   debounced save. Large files use upload_id until completion; ready rows use
   the content-addressed storage key. */
CREATE TABLE IF NOT EXISTS managed_media (
  id           VARCHAR(64) PRIMARY KEY,
  upload_id    VARCHAR(80) NULL UNIQUE,
  uploaded_by  VARCHAR(64) NOT NULL,
  -- A truthful lifecycle, not a boolean: bytes arrive (uploading), assemble
  -- (uploaded), are normalised where possible (processing), are checked against
  -- storage and read back (verifying), and only then are servable (ready) — or
  -- fail, with a reason. 'ready' means the file was genuinely round-tripped, not
  -- merely that an upload's last HTTP request returned.
  status       ENUM('queued','uploading','uploaded','processing','verifying','ready','failed') NOT NULL DEFAULT 'uploading',
  failure_reason VARCHAR(255) NULL,
  verified_at  DATETIME NULL,
  storage_key  VARCHAR(255) NULL,
  sha256       CHAR(64) NULL,
  media_type   ENUM('image','audio','video') NULL,
  mime_type    VARCHAR(128) NULL,
  size_bytes   BIGINT UNSIGNED NOT NULL DEFAULT 0,
  width        INT UNSIGNED NULL,
  height       INT UNSIGNED NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ready_at     DATETIME NULL,
  INDEX idx_managed_media_digest (sha256, status),
  INDEX idx_managed_media_uploader (uploaded_by, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE managed_media ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
-- Widen the lifecycle for existing installs. Safe and idempotent: it only adds
-- new enum members and never rewrites an existing 'uploading'/'ready' row.
ALTER TABLE managed_media MODIFY COLUMN status ENUM('queued','uploading','uploaded','processing','verifying','ready','failed') NOT NULL DEFAULT 'uploading';
ALTER TABLE managed_media ADD COLUMN IF NOT EXISTS failure_reason VARCHAR(255) NULL;
ALTER TABLE managed_media ADD COLUMN IF NOT EXISTS verified_at DATETIME NULL;

/* User document rows are the managed asset ledger for resources, notebooks and
   whiteboards. The source columns let reporting charge the owner's bytes once
   while still explaining where the asset came from. */
ALTER TABLE user_documents ADD COLUMN IF NOT EXISTS source_kind ENUM('resource','notebook','whiteboard') NOT NULL DEFAULT 'resource';
ALTER TABLE user_documents ADD COLUMN IF NOT EXISTS source_id VARCHAR(64) NULL;
ALTER TABLE user_documents ADD INDEX IF NOT EXISTS idx_user_documents_source (user_id, source_kind, deleted_at);

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
  platform     ENUM('ios','android','web') NOT NULL DEFAULT 'ios',
  environment  ENUM('sandbox','production') NOT NULL DEFAULT 'production',
  locale       VARCHAR(16) NULL,
  app_version  VARCHAR(32) NULL,
  web_endpoint TEXT NULL,
  web_p256dh   VARCHAR(255) NULL,
  web_auth     VARCHAR(255) NULL,
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

/* A note or a whiteboard, published behind a link.

   The share starts as a copy, not a pointer into `user_state`. The student's
   own private document remains independent, while the shared copy has its own
   revision history for safe live collaboration.

   `access` is the whole permission model, and it is checked on the server.
     private — only the owner may read it, so a leaked link reveals nothing.
     view    — signed-in classmates in the same cohort may read it.
     edit    — signed-in classmates in the same cohort may also write to it.

   No semicolons anywhere in this comment: `migrate()` splits the file on them
   to get its statements, so one here would cut this block in half and leave an
   unterminated comment for the server to execute at boot.

   The id is a long random token and the only thing a URL carries, so nothing
   about the owner or the document travels in the address. */
CREATE TABLE IF NOT EXISTS shared_documents (
  id          VARCHAR(64) PRIMARY KEY,
  owner_id    VARCHAR(64) NOT NULL,
  kind        VARCHAR(16) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  access      VARCHAR(16) NOT NULL DEFAULT 'private',
  payload     MEDIUMTEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by  VARCHAR(64) NULL,
  INDEX idx_shared_documents_owner (owner_id, kind, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Shared study material stays inside the owner's university and year. Every
   content edit advances a revision so a slower collaborator cannot silently
   overwrite newer work. Existing shares inherit their owner's cohort. */
ALTER TABLE shared_documents ADD COLUMN IF NOT EXISTS revision INT UNSIGNED NOT NULL DEFAULT 1;
ALTER TABLE shared_documents ADD COLUMN IF NOT EXISTS university_id VARCHAR(64) NULL;
ALTER TABLE shared_documents ADD COLUMN IF NOT EXISTS year VARCHAR(64) NULL;
ALTER TABLE shared_documents ADD INDEX IF NOT EXISTS idx_shared_documents_cohort (university_id, year, kind, access, updated_at);
UPDATE shared_documents d
JOIN students s ON s.user_id = d.owner_id
SET d.university_id = COALESCE(d.university_id, s.university_id),
    d.year = COALESCE(d.year, s.year)
WHERE d.university_id IS NULL OR d.year IS NULL;

CREATE TABLE IF NOT EXISTS shared_document_topics (
  share_id    VARCHAR(64) NOT NULL,
  position    SMALLINT UNSIGNED NOT NULL,
  subject_id  VARCHAR(96) NULL,
  topic       VARCHAR(255) NULL,
  subtopic    VARCHAR(255) NULL,
  PRIMARY KEY (share_id, position),
  INDEX idx_shared_document_topics_subject (subject_id, topic, subtopic),
  CONSTRAINT fk_shared_topics_document FOREIGN KEY (share_id) REFERENCES shared_documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS shared_document_revisions (
  id          VARCHAR(64) PRIMARY KEY,
  share_id    VARCHAR(64) NOT NULL,
  revision    INT UNSIGNED NOT NULL,
  actor_id    VARCHAR(64) NULL,
  title       VARCHAR(255) NOT NULL,
  payload     MEDIUMTEXT NOT NULL,
  topics      JSON NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_shared_document_revision (share_id, revision),
  INDEX idx_shared_document_revision_actor (actor_id, created_at),
  CONSTRAINT fk_shared_revisions_document FOREIGN KEY (share_id) REFERENCES shared_documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Managed media approved by the document owner for one exact shared revision.
   The viewer route never derives file permission from collaborator-editable
   payload JSON. A new revision gets a new allowlist after server validation. */
CREATE TABLE IF NOT EXISTS shared_document_revision_assets (
  share_id    VARCHAR(64) NOT NULL,
  revision    INT UNSIGNED NOT NULL,
  document_id VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (share_id, revision, document_id),
  INDEX idx_shared_revision_assets_document (document_id),
  CONSTRAINT fk_shared_revision_assets_revision FOREIGN KEY (share_id, revision)
    REFERENCES shared_document_revisions(share_id, revision) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS shared_document_stars (
  share_id    VARCHAR(64) NOT NULL,
  user_id     VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (share_id, user_id),
  INDEX idx_shared_document_stars_user (user_id, created_at),
  CONSTRAINT fk_shared_stars_document FOREIGN KEY (share_id) REFERENCES shared_documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS shared_document_follows (
  share_id    VARCHAR(64) NOT NULL,
  user_id     VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (share_id, user_id),
  INDEX idx_shared_document_follows_user (user_id, created_at),
  CONSTRAINT fk_shared_follows_document FOREIGN KEY (share_id) REFERENCES shared_documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS shared_document_events (
  id          VARCHAR(64) PRIMARY KEY,
  share_id    VARCHAR(64) NOT NULL,
  revision    INT UNSIGNED NOT NULL,
  kind        VARCHAR(64) NOT NULL,
  actor_id    VARCHAR(64) NULL,
  payload     JSON NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shared_document_events_share (share_id, revision),
  INDEX idx_shared_document_events_actor (actor_id, created_at),
  CONSTRAINT fk_shared_events_document FOREIGN KEY (share_id) REFERENCES shared_documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS shared_document_notifications (
  id          VARCHAR(64) PRIMARY KEY,
  user_id     VARCHAR(64) NOT NULL,
  share_id    VARCHAR(64) NOT NULL,
  revision    INT UNSIGNED NOT NULL,
  actor_id    VARCHAR(64) NULL,
  kind        VARCHAR(64) NOT NULL,
  message     VARCHAR(500) NOT NULL,
  read_at     DATETIME NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shared_document_notifications_user (user_id, read_at, created_at),
  CONSTRAINT fk_shared_notifications_document FOREIGN KEY (share_id) REFERENCES shared_documents(id) ON DELETE CASCADE
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

/* Whether this student may be found in their cohort's directory. Default off:
   a student opts in before classmates can find them, and existing rows are reset
   to the same explicit private state during this migration. */
ALTER TABLE students ADD COLUMN IF NOT EXISTS discoverable BOOLEAN NOT NULL DEFAULT 0;
ALTER TABLE students MODIFY COLUMN discoverable BOOLEAN NOT NULL DEFAULT 0;
UPDATE students SET discoverable = 0 WHERE discoverable <> 0;

/* Locked enrollment changes. Students can ask for a new university or year with
   a reason, while an admin applies or rejects the request with an audit note.
   Approving a university change rechecks the username constraint in code before
   writing the profile. */
CREATE TABLE IF NOT EXISTS enrollment_change_requests (
  id             VARCHAR(64) PRIMARY KEY,
  user_id        VARCHAR(64) NOT NULL,
  student_id     VARCHAR(64) NOT NULL,
  field          ENUM('university','year') NOT NULL,
  current_value  VARCHAR(128) NULL,
  requested_value VARCHAR(128) NOT NULL,
  reason         VARCHAR(500) NOT NULL,
  status         ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  admin_note     VARCHAR(500) NULL,
  reviewed_by    VARCHAR(64) NULL,
  reviewed_at    DATETIME NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enrollment_change_user (user_id, created_at),
  INDEX idx_enrollment_change_status (status, created_at),
  INDEX idx_enrollment_change_student (student_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Server-verified question attempts. Public rankings read only rows marked
   against the published question snapshot, never local client-only history. */
CREATE TABLE IF NOT EXISTS qbank_attempts (
  id                       VARCHAR(64) PRIMARY KEY,
  user_id                  VARCHAR(64) NOT NULL,
  student_id               VARCHAR(64) NOT NULL,
  session_id               VARCHAR(96) NOT NULL,
  question_id              VARCHAR(96) NOT NULL,
  university_id            VARCHAR(64) NOT NULL,
  year                     VARCHAR(32) NOT NULL,
  term                     VARCHAR(64) NOT NULL DEFAULT 'current',
  subject_id               VARCHAR(96) NULL,
  topic                    VARCHAR(255) NULL,
  subtopic                 VARCHAR(255) NULL,
  concept_ids              JSON NULL,
  answer_index             INT NOT NULL,
  correct_index            INT NOT NULL,
  correct                  TINYINT(1) NOT NULL,
  seconds                  INT NULL,
  session_duration_seconds INT NULL,
  overtime_seconds         INT NULL,
  answered_at              DATETIME NOT NULL,
  verified_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_qbank_attempt (user_id, session_id, question_id),
  INDEX idx_qbank_leaderboard (university_id, year, term, user_id),
  INDEX idx_qbank_concept_scope (university_id, year, term, verified_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Answer-change events ──────────────────────────────────────────────────
   Append-only log of every graded qbank answer, the accurate source for
   correct↔wrong transition tracking. Unlike qbank_attempts (deduped final
   answer per sitting, no monotonic column), `seq` gives a reliable
   server-assigned order within each (user, question) run, so transitions never
   depend on client clocks. One row per distinct attempt (attempt_id =
   "<session>:qbank:<question>"): a retake appends a new event, a retried POST
   is idempotent. See migration 0013. */
CREATE TABLE IF NOT EXISTS qbank_answer_events (
  seq            BIGINT AUTO_INCREMENT PRIMARY KEY,
  attempt_id     VARCHAR(64) NOT NULL,
  user_id        VARCHAR(64) NOT NULL,
  student_id     VARCHAR(64) NOT NULL,
  session_id     VARCHAR(96) NOT NULL,
  question_id    VARCHAR(96) NOT NULL,
  university_id  VARCHAR(64) NOT NULL,
  year           VARCHAR(32) NOT NULL,
  term           VARCHAR(64) NOT NULL DEFAULT 'current',
  answer_index   INT NOT NULL,
  correct_index  INT NOT NULL,
  correct        TINYINT(1) NOT NULL,
  answered_at    DATETIME NOT NULL,
  recorded_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_answer_event (attempt_id),
  INDEX idx_answer_events_transition (user_id, question_id, seq),
  INDEX idx_answer_events_scope (university_id, year, term, seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Question of the Day ──────────────────────────────────────────────────
   A separate progress track: one shared question per (university, year)
   cohort per Cairo-local day, answered inline. Never joined with or written
   alongside qbank_attempts — that structural separation is the whole point
   (see docs/superpowers/specs/2026-08-29-question-of-the-day-design.md §11).
   One row per (user_id, qotd_date): a second POST is a no-op, never an
   overwrite. */
CREATE TABLE IF NOT EXISTS qotd_answers (
  user_id       VARCHAR(64) NOT NULL,
  student_id    VARCHAR(64) NOT NULL,
  university_id VARCHAR(64) NOT NULL,
  year          VARCHAR(32) NOT NULL,
  term          VARCHAR(64) NOT NULL DEFAULT 'current',
  qotd_date     DATE NOT NULL,
  question_id   VARCHAR(96) NOT NULL,
  answer_index  INT NOT NULL,
  correct       TINYINT(1) NOT NULL,
  answered_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, qotd_date),
  INDEX idx_qotd_cohort (university_id, year, term, qotd_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* One row per Cairo-local day the reminder dispatch has run. INSERT IGNORE
   against the primary key is the exactly-once claim: whichever tick or
   instance inserts first runs the dispatch, every other tick sees
   affectedRows === 0 and no-ops. Tallies are written back after the run for
   observability, never read to decide whether to send. */
CREATE TABLE IF NOT EXISTS qotd_reminder_runs (
  run_date      DATE PRIMARY KEY,
  dispatched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  push_sent     INT NOT NULL DEFAULT 0,
  email_sent    INT NOT NULL DEFAULT 0,
  skipped       INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Build Maristanas ───────────────────────────────────────────────────
   Active study time is a server-clocked minute ledger. The unique bucket per
   student prevents two tabs, retries, or replayed requests from creating more
   than one minute of credit for the same wall-clock minute. Question and
   assessment credit is derived from qbank_attempts above, whose answer key is
   verified by the server. */
CREATE TABLE IF NOT EXISTS maristana_study_minutes (
  user_id       VARCHAR(64) NOT NULL,
  minute_bucket BIGINT NOT NULL,
  session_id    VARCHAR(64) NOT NULL,
  module_id     VARCHAR(96) NULL,
  subject_id    VARCHAR(96) NULL,
  surface       VARCHAR(64) NULL,
  recorded_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, minute_bucket),
  INDEX idx_maristana_study_recent (user_id, recorded_at),
  INDEX idx_maristana_study_module (user_id, module_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Names are the only hospital property stored directly. Stage and completion
   are derived from evidence on every read, so settings changes rebalance the
   collection without a destructive migration or an out-of-sync counter. */
CREATE TABLE IF NOT EXISTS maristana_hospitals (
  user_id     VARCHAR(64) NOT NULL,
  slot_number INT UNSIGNED NOT NULL,
  name        VARCHAR(80) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, slot_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Current all-access pricing. Promotions apply automatically, vouchers apply by
   code, and the quote endpoint chooses one discount only. */
CREATE TABLE IF NOT EXISTS pricing_promotions (
  id             VARCHAR(64) PRIMARY KEY,
  label          VARCHAR(160) NOT NULL,
  period         ENUM('monthly','term','both') NOT NULL DEFAULT 'both',
  discount_type  ENUM('percent','fixed') NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  starts_at      DATETIME NOT NULL,
  ends_at        DATETIME NOT NULL,
  active         BOOLEAN NOT NULL DEFAULT 1,
  created_by     VARCHAR(64) NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_pricing_promotions_live (active, starts_at, ends_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pricing_vouchers (
  id             VARCHAR(64) PRIMARY KEY,
  code           VARCHAR(64) NOT NULL UNIQUE,
  label          VARCHAR(160) NOT NULL,
  period         ENUM('monthly','term') NOT NULL,
  discount_type  ENUM('percent','fixed') NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  starts_at      DATETIME NOT NULL,
  ends_at        DATETIME NOT NULL,
  active         BOOLEAN NOT NULL DEFAULT 1,
  max_redemptions INT NULL,
  created_by     VARCHAR(64) NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_pricing_vouchers_live (active, period, starts_at, ends_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* One global acknowledgement per reached storage threshold. Once a threshold is
   dismissed it stays quiet until the next threshold is crossed. */
CREATE TABLE IF NOT EXISTS storage_threshold_acknowledgements (
  threshold_gb    INT PRIMARY KEY,
  acknowledged_by VARCHAR(64) NOT NULL,
  acknowledged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

/* ── Challenges ──────────────────────────────────────────────────────────
   A challenge is the same paper, sat apart.
   `question_ids` is frozen at creation for the same reason a study room's is:
   a question published or archived mid-challenge would change what is being
   compared, and the comparison is the whole point. */
CREATE TABLE IF NOT EXISTS challenges (
  id                     VARCHAR(64) PRIMARY KEY,
  challenger_id          VARCHAR(64) NOT NULL,
  opponent_id            VARCHAR(64) NOT NULL,
  question_ids           LONGTEXT NOT NULL,
  scope_label            VARCHAR(255) NOT NULL,
  status                 ENUM('sent','declined','running','complete') NOT NULL DEFAULT 'sent',
  challenger_finished_at DATETIME NULL,
  opponent_finished_at   DATETIME NULL,
  created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_challenges_opponent (opponent_id, status),
  INDEX idx_challenges_challenger (challenger_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Marked by the server against the published question, never by the client —
   a score the other student sees must not be self-reported. */
CREATE TABLE IF NOT EXISTS challenge_answers (
  challenge_id VARCHAR(64) NOT NULL,
  user_id      VARCHAR(64) NOT NULL,
  question_id  VARCHAR(96) NOT NULL,
  chosen_index INT NOT NULL,
  correct      TINYINT(1) NOT NULL,
  seconds      INT NULL,
  answered_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (challenge_id, user_id, question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Only the app-scoped Facebook id, and only while the student wants the link.
   Name, photo and email are already on the account; copying Facebook's copies
   would widen what we hold for nothing. `unlinked_at` records that a deletion
   request was honoured, which Meta requires us to be able to show. */
CREATE TABLE IF NOT EXISTS facebook_links (
  user_id     VARCHAR(64) PRIMARY KEY,
  fb_user_id  VARCHAR(64) NOT NULL UNIQUE,
  linked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unlinked_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* ── Study parties ───────────────────────────────────────────────────────── */
CREATE TABLE IF NOT EXISTS study_parties (
  id            VARCHAR(64) PRIMARY KEY,
  code          VARCHAR(12) NOT NULL UNIQUE,
  name          VARCHAR(255) NOT NULL,
  host_user_id  VARCHAR(64) NOT NULL,
  -- The cohort, copied from the host at creation. A party does not follow its
  -- host into a new year; the people in it are the year it was made for.
  university_id VARCHAR(64) NOT NULL,
  year          VARCHAR(32) NOT NULL,
  visibility    ENUM('open','invite') NOT NULL DEFAULT 'open',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  archived_at   DATETIME NULL,
  INDEX idx_parties_cohort (university_id, year, visibility, archived_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS study_party_members (
  party_id  VARCHAR(64) NOT NULL,
  user_id   VARCHAR(64) NOT NULL,
  role      ENUM('host','member') NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Where this member sits in the hall and what their desk looks like. Every
  -- column is NULL until they choose: a null piece means "not chosen", which
  -- the browser draws with default furniture, and is not the same as a choice.
  seat_desk      VARCHAR(16) NULL,
  seat_device    VARCHAR(16) NULL,
  seat_chair     VARCHAR(16) NULL,
  -- Which of the room's twenty desks, 0-19. NULL is "in the room, nowhere in
  -- particular" — the state a member is in before they are seated.
  seat_index     TINYINT NULL,
  -- The last heartbeat, and what it claimed. The claim expires: see
  -- `activityAt` in roomSeats.js.
  last_active_at DATETIME NULL,
  activity       VARCHAR(16) NULL,
  PRIMARY KEY (party_id, user_id),
  INDEX idx_party_members_user (user_id, joined_at),
  -- Two people cannot sit at one desk. MariaDB allows any number of NULLs in a
  -- unique index, so "nowhere in particular" stays available to everyone, and
  -- a genuine race for desk 3 fails as ER_DUP_ENTRY rather than as a read that
  -- was true a millisecond ago.
  UNIQUE KEY study_party_members_seat_unique (party_id, seat_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS study_party_sessions (
  id          VARCHAR(64) PRIMARY KEY,
  party_id    VARCHAR(64) NOT NULL,
  name        VARCHAR(255) NOT NULL,
  -- Frozen at creation: [{ kind: 'question'|'practical'|'essay', id }]
  item_refs   LONGTEXT NOT NULL,
  -- NULL means it is open from now, with no end.
  starts_at   DATETIME NULL,
  status      ENUM('open','scheduled','closed') NOT NULL DEFAULT 'open',
  created_by  VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at   DATETIME NULL,
  INDEX idx_party_sessions (party_id, status, starts_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Marked by the server for questions; for practical and essay items the
   student says how it went, so `correct` is NULL — the same rule the attempt
   log already follows, and the reason a session reports two numbers. */
CREATE TABLE IF NOT EXISTS study_party_answers (
  session_id  VARCHAR(64) NOT NULL,
  user_id     VARCHAR(64) NOT NULL,
  item_kind   VARCHAR(16) NOT NULL,
  item_id     VARCHAR(96) NOT NULL,
  correct     TINYINT(1) NULL,
  seconds     INT NULL,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_id, item_kind, item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Server-authoritative party games. The browser may choose a game kind and a
   trusted source id. The full content, including answer keys, is built and
   persisted here so a party score is never derived from client-supplied facts. */
CREATE TABLE IF NOT EXISTS study_party_games (
  id                  VARCHAR(64) PRIMARY KEY,
  party_id            VARCHAR(64) NOT NULL,
  host_user_id        VARCHAR(64) NOT NULL,
  kind                VARCHAR(32) NOT NULL,
  title               VARCHAR(255) NOT NULL,
  source_kind         ENUM('authored','published') NOT NULL,
  source_id           VARCHAR(160) NOT NULL,
  source_label        VARCHAR(255) NOT NULL,
  content_json        LONGTEXT NOT NULL,
  status              ENUM('lobby','in_round','between_rounds','completed') NOT NULL DEFAULT 'lobby',
  current_round_index INT NOT NULL DEFAULT 0,
  scores_json         LONGTEXT NOT NULL,
  version             BIGINT UNSIGNED NOT NULL DEFAULT 0,
  created_by          VARCHAR(64) NOT NULL,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME NULL,
  completed_at        DATETIME NULL,
  INDEX idx_party_games_party (party_id, status, updated_at),
  INDEX idx_party_games_host (host_user_id, updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS study_party_game_participants (
  game_id      VARCHAR(64) NOT NULL,
  user_id      VARCHAR(64) NOT NULL,
  username     VARCHAR(64) NOT NULL,
  profile_icon VARCHAR(64) NULL,
  connected    TINYINT(1) NOT NULL DEFAULT 0,
  joined_at    DATETIME NOT NULL,
  last_seen_at DATETIME NOT NULL,
  PRIMARY KEY (game_id, user_id),
  INDEX idx_party_game_participants_user (user_id, last_seen_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS study_party_game_answers (
  game_id     VARCHAR(64) NOT NULL,
  round_id    VARCHAR(160) NOT NULL,
  user_id     VARCHAR(64) NOT NULL,
  answer_json LONGTEXT NOT NULL,
  correct     TINYINT(1) NOT NULL,
  points      INT NOT NULL,
  max_points  INT NOT NULL,
  answered_at DATETIME NOT NULL,
  PRIMARY KEY (game_id, round_id, user_id),
  INDEX idx_party_game_answers_user (user_id, answered_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS study_party_game_events (
  event_id     VARCHAR(96) PRIMARY KEY,
  game_id      VARCHAR(64) NOT NULL,
  party_id     VARCHAR(64) NOT NULL,
  sequence     BIGINT UNSIGNED NOT NULL,
  type         VARCHAR(64) NOT NULL,
  actor_id     VARCHAR(64) NOT NULL,
  payload_json LONGTEXT NOT NULL,
  created_at   DATETIME NOT NULL,
  UNIQUE INDEX uniq_party_game_event_sequence (game_id, sequence),
  INDEX idx_party_game_events_party (party_id, created_at),
  INDEX idx_party_game_events_actor (actor_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Passkeys (WebAuthn). Supabase has no native passkey support, so this is a
   parallel credential store, not a Supabase table: register/authenticate run
   against this table alone, and a verified assertion then mints a real
   Supabase session (see webauthn.js — generateLink + the client's verifyOtp).
   One row per registered authenticator, so a student can hold several (phone,
   laptop, security key). */
CREATE TABLE IF NOT EXISTS webauthn_credentials (
  id            VARCHAR(64) PRIMARY KEY,
  user_id       VARCHAR(64) NOT NULL,
  credential_id VARCHAR(255) NOT NULL,
  public_key    TEXT NOT NULL,
  counter       BIGINT UNSIGNED NOT NULL DEFAULT 0,
  transports    VARCHAR(255) NULL,
  device_label  VARCHAR(120) NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at  DATETIME NULL,
  UNIQUE INDEX uniq_webauthn_credential_id (credential_id),
  INDEX idx_webauthn_credentials_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Non-editorial, university-scoped MCQ validation. Question snapshots contain
-- answer choices but never answer keys or explanations.
CREATE TABLE IF NOT EXISTS mcq_validation_batches (
  id              VARCHAR(64) PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  university_id   VARCHAR(64) NOT NULL,
  academic_year   VARCHAR(64),
  year_id         VARCHAR(64),
  term            VARCHAR(64),
  module_id       VARCHAR(96),
  module_name     VARCHAR(255),
  subject_id      VARCHAR(96),
  subject_name    VARCHAR(255),
  status          ENUM('draft','assigned','closed') NOT NULL DEFAULT 'draft',
  due_at          DATETIME,
  created_by      VARCHAR(64) NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_mcq_batches_scope (university_id, academic_year, term, module_id, subject_id),
  INDEX idx_mcq_batches_status (status, due_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mcq_validation_batch_questions (
  batch_id             VARCHAR(64) NOT NULL,
  question_id          VARCHAR(96) NOT NULL,
  ordinal_no           INT UNSIGNED NOT NULL,
  question_snapshot    MEDIUMTEXT NOT NULL,
  correct_answer       VARCHAR(32) NOT NULL,
  curriculum_placement JSON NOT NULL,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (batch_id, question_id),
  UNIQUE KEY uniq_mcq_batch_ordinal (batch_id, ordinal_no),
  INDEX idx_mcq_batch_question (question_id),
  FOREIGN KEY (batch_id) REFERENCES mcq_validation_batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mcq_validation_assignments (
  id              VARCHAR(64) PRIMARY KEY,
  batch_id        VARCHAR(64) NOT NULL,
  validator_id    VARCHAR(64) NOT NULL,
  university_id   VARCHAR(64) NOT NULL,
  status          ENUM('assigned','started','completed') NOT NULL DEFAULT 'assigned',
  assigned_by     VARCHAR(64) NOT NULL,
  assigned_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at      DATETIME,
  completed_at    DATETIME,
  UNIQUE KEY uniq_mcq_batch_validator (batch_id, validator_id),
  INDEX idx_mcq_assignment_validator (validator_id, status, assigned_at),
  INDEX idx_mcq_assignment_university (university_id, status),
  FOREIGN KEY (batch_id) REFERENCES mcq_validation_batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mcq_validation_sources (
  id              VARCHAR(64) PRIMARY KEY,
  validator_id    VARCHAR(64) NOT NULL,
  university_id   VARCHAR(64) NOT NULL,
  assignment_id   VARCHAR(64),
  source_type     ENUM('curriculum_map','schedule','supporting_source') NOT NULL,
  title           VARCHAR(255) NOT NULL,
  file_name       VARCHAR(255),
  mime_type       VARCHAR(128),
  size_bytes      INT UNSIGNED NOT NULL DEFAULT 0,
  source_url      TEXT,
  content_bytes   MEDIUMBLOB,
  uploaded_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mcq_sources_owner (validator_id, university_id, uploaded_at),
  INDEX idx_mcq_sources_assignment (assignment_id),
  FOREIGN KEY (assignment_id) REFERENCES mcq_validation_assignments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mcq_validation_submissions (
  id                    VARCHAR(64) PRIMARY KEY,
  assignment_id         VARCHAR(64) NOT NULL,
  batch_id              VARCHAR(64) NOT NULL,
  validator_id          VARCHAR(64) NOT NULL,
  university_id         VARCHAR(64) NOT NULL,
  question_id           VARCHAR(96) NOT NULL,
  academic_year         VARCHAR(64),
  year_id               VARCHAR(64),
  term                  VARCHAR(64),
  module_id             VARCHAR(96),
  module_name           VARCHAR(255),
  subject_id            VARCHAR(96),
  subject_name          VARCHAR(255),
  selected_answer       VARCHAR(32) NOT NULL,
  is_correct            BOOLEAN NOT NULL,
  confidence            TINYINT UNSIGNED NOT NULL,
  time_seconds          INT UNSIGNED NOT NULL,
  curriculum_relevance  ENUM('taught','not_taught','uncertain') NOT NULL,
  issue_category        ENUM('unclear_wording','multiple_plausible_answers','incorrect_answer_key','wrong_curriculum_placement','outdated_or_incomplete'),
  suggested_correction  TEXT,
  evidence_text         TEXT,
  evidence_url          TEXT,
  source_id             VARCHAR(64),
  submitted_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_mcq_assignment_question (assignment_id, question_id),
  INDEX idx_mcq_submission_scope (university_id, academic_year, term, module_id, subject_id),
  INDEX idx_mcq_submission_validator (validator_id, submitted_at),
  INDEX idx_mcq_submission_question (question_id, submitted_at),
  INDEX idx_mcq_submission_issue (issue_category, submitted_at),
  FOREIGN KEY (assignment_id) REFERENCES mcq_validation_assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (batch_id) REFERENCES mcq_validation_batches(id) ON DELETE CASCADE,
  FOREIGN KEY (source_id) REFERENCES mcq_validation_sources(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
