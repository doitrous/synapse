-- Usernames are unique across the whole platform, not per university.
--
-- The old index scoped uniqueness to (university_id, username_normalized), so
-- the same handle could be taken once in every university. Product decision:
-- a username identifies one student everywhere. Swap the per-university unique
-- index for a global one on username_normalized alone.
--
-- Marked .dangerous.sql only because it contains DROP INDEX (the migration
-- guard flags any DROP). It loses no rows: multiple NULL username_normalized
-- values are still allowed by a unique index, so students without a username
-- do not collide. If two students in different universities already share a
-- normalized username, adding the global index will fail — dedupe those rows
-- first, then re-run.
ALTER TABLE students DROP INDEX IF EXISTS uniq_students_university_username;
ALTER TABLE students ADD UNIQUE INDEX IF NOT EXISTS uniq_students_username (username_normalized);
