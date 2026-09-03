-- A student's own status line, and the timezone the browser detected for them.
--
-- Both are optional and self-set; neither gates anything. `status_message` is
-- shown next to the name in the friends directory and party member list;
-- `timezone` replaces the account page's manual timezone picker with
-- auto-detection (see saveOwnProfile / normaliseTimezone in accounts.js).
ALTER TABLE students ADD COLUMN IF NOT EXISTS status_message VARCHAR(120) NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS timezone VARCHAR(64) NULL;
