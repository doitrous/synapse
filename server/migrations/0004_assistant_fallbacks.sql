-- The assistant's fallback ladder, its spend cap, and per-call outcomes.
--
-- Until now one provider answered every student message, with one retry
-- against the same provider. A rate limit or an outage at that one vendor was
-- an outage of the whole feature. This adds the steps to try after it.

/* Each row is one rung of the ladder, tried in `step` order after the
   `assistant_settings` row itself, which is step 0. A provider may appear at
   several steps — a step is a place in the order, not a vendor, and "the same
   model again in a second" is a real answer to a 429. Keys are not stored
   here: a step signs with the key already held for its provider in
   `assistant_provider_keys`, so reusing a provider costs nothing. */
CREATE TABLE IF NOT EXISTS assistant_fallbacks (
  step       INT          NOT NULL PRIMARY KEY,
  provider   VARCHAR(32)  NOT NULL,
  model      VARCHAR(128) NOT NULL,
  -- NULL means "whatever the active provider is allowed", so a cheaper
  -- fallback can be given a shorter leash without repeating the main setting.
  max_tokens INT          NULL,
  enabled    TINYINT      NOT NULL DEFAULT 1,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Grading answers with a JSON object whose size is set by the mark scheme, not
   with prose held to six sentences. On the chat budget (700) it truncates
   mid-object and the whole call is wasted, so it gets its own allowance. */
ALTER TABLE assistant_settings ADD COLUMN IF NOT EXISTS grade_max_tokens INT NOT NULL DEFAULT 1200;

/* The share of calls a step must answer to keep its place in the ladder. A
   step that falls under it is skipped for ten minutes rather than tried first
   on every request while every student waits out its timeout. */
ALTER TABLE assistant_settings ADD COLUMN IF NOT EXISTS target_success_rate DECIMAL(4,3) NOT NULL DEFAULT 0.990;

/* Tokens the whole platform may spend in a day. NULL is no cap, which is the
   default: a cap that arrives by surprise is an outage. Past it the feature
   answers 503 rather than spending, and the admin screen says why. */
ALTER TABLE assistant_settings ADD COLUMN IF NOT EXISTS daily_token_cap INT NULL;

/* How the last call of this student's day went, which is what the circuit
   breaker's in-memory ring is seeded from after a restart. Nullable because
   every row written before this migration has no answer to give. */
ALTER TABLE assistant_usage ADD COLUMN IF NOT EXISTS ok TINYINT NULL;
ALTER TABLE assistant_usage ADD COLUMN IF NOT EXISTS step INT NULL;
ALTER TABLE assistant_usage ADD COLUMN IF NOT EXISTS latency_ms INT NULL;
