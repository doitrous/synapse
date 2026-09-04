// `npm run migrate` — the pre-deployment step. It may run as a user with DDL
// rights while the app itself runs as a DML-only user: set
// MIGRATE_DATABASE_URL to the privileged URL and DATABASE_URL stays the
// runtime one. Falls back to DATABASE_URL when unset, so nothing changes for
// a deployment that never split the users.
if (process.env.MIGRATE_DATABASE_URL) process.env.DATABASE_URL = process.env.MIGRATE_DATABASE_URL

const { migrate, pool } = await import('./db.js')

migrate()
  .then(() => { console.log('✓ schema applied'); return pool.end() })
  .then(() => process.exit(0))
  .catch((e) => { console.error('migration failed:', e); process.exit(1) })
