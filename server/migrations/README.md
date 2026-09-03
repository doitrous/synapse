# server/migrations

- Name files `NNNN_description.sql`, zero-padded, applied in filename order by `runMigrations` (server/src/migrations.js).
- Each file must be idempotent (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, ...) — it may run against a database that already has some of its own changes.
- A file containing `DROP `, `MODIFY COLUMN`, or `CHANGE COLUMN` is refused unless its name ends `.dangerous.sql` — that's a deliberate second look before something destructive ships.
- Never edit a migration once it has been applied anywhere (including production); ship a new numbered file instead — `schema_migration_files` records versions by filename, so editing an applied file's contents has no effect and just desyncs the repo from what actually ran.
