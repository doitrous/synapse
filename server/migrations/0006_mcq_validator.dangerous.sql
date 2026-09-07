-- Dedicated, non-editorial MCQ validation workflow.
-- The role ENUM widening is intentionally in a .dangerous.sql migration because
-- MariaDB has no additive ALTER syntax for ENUM values.

ALTER TABLE user_access MODIFY COLUMN role
  ENUM('student','mcq_validator','reviewer','admin','editor') NOT NULL DEFAULT 'student';

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
