import { migrate, pool } from './db.js'

migrate()
  .then(() => { console.log('✓ schema applied'); return pool.end() })
  .then(() => process.exit(0))
  .catch((e) => { console.error('migration failed:', e); process.exit(1) })
