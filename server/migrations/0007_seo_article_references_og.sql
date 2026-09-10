-- Hub parity: the reference list and the OG title/description the hub now sends
-- per article. Idempotent (ADD COLUMN IF NOT EXISTS), additive only.
--
-- `references` is a reserved word in MariaDB, so the column is `references_json`
-- and no query in this repo has to quote an identifier.

ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS references_json JSON NULL;

ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS og_title VARCHAR(500) NULL;

ALTER TABLE seo_articles ADD COLUMN IF NOT EXISTS og_description VARCHAR(1000) NULL;
