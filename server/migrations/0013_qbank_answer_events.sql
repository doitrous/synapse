-- Append-only log of every graded qbank answer, for accurate correct↔wrong
-- transition tracking.
--
-- qbank_attempts is the deduped "final answer per sitting" ledger the
-- leaderboards read; it upserts on (user, session, question) and carries no
-- monotonic column, so ordering transitions by the client-supplied answered_at
-- could misorder them. This table is the transition source of truth instead:
--   * seq (AUTO_INCREMENT) gives a reliable server-assigned chronological order
--     within each (user, question) run — no dependence on client clocks;
--   * one row per distinct attempt (attempt_id = "<session>:qbank:<question>"),
--     so a retake (new session id) appends a new event while a network retry of
--     the same POST is idempotent (ON DUPLICATE KEY UPDATE refreshes the grade
--     in place, keeping seq stable).
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
