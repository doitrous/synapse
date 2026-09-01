import { randomUUID } from 'node:crypto'
import { pool } from '../src/db.js'

const requiredMigrationId = '2026-08-11-remove-live-demo-notifications-v8'
const approval = process.env.MEDICAL_LIBRARY_APPLY
const notificationStateKey = 'nishany-notification-campaigns-v1'
const demoNotificationIds = new Set([
  'notification-review-window',
  'notification-study-block',
])

if (approval !== requiredMigrationId) {
  throw new Error(`Refusing to mutate MariaDB. Set MEDICAL_LIBRARY_APPLY=${requiredMigrationId} after explicit owner approval.`)
}

const jsonSafe = (value) => JSON.stringify(value, (_key, item) => typeof item === 'bigint' ? item.toString() : item)
const actor = `migration:${requiredMigrationId}`
const conn = await pool.getConnection()

try {
  await conn.beginTransaction()
  const [applied] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ? FOR UPDATE', [requiredMigrationId])
  if (applied.length) {
    await conn.rollback()
    console.log(JSON.stringify({ applied: false, alreadyApplied: true, migration: applied[0] }, null, 2))
    process.exitCode = 0
  } else {
    const [rows] = await conn.query('SELECT v, updated_at FROM app_state WHERE k = ? FOR UPDATE', [notificationStateKey])
    let campaigns = []
    if (rows.length) {
      try {
        const parsed = JSON.parse(rows[0].v)
        campaigns = Array.isArray(parsed) ? parsed : []
      } catch {
        throw new Error(`${notificationStateKey} is not valid JSON`)
      }
    }

    const retained = campaigns.filter((campaign) => !demoNotificationIds.has(campaign?.id))
    const removed = campaigns
      .filter((campaign) => demoNotificationIds.has(campaign?.id))
      .map((campaign) => ({ id: campaign.id, title: campaign.title }))

    const snapshot = {
      schemaVersion: 1,
      createdAt: new Date().toISOString(),
      scope: [notificationStateKey],
      tables: { app_state: rows.length ? [{ k: notificationStateKey, v: rows[0].v, updated_at: rows[0].updated_at }] : [] },
      note: 'Launch-cleanliness recovery point before deleting the two confirmed demo notification campaigns.',
    }
    const snapshotId = `snapshot-${randomUUID()}`
    await conn.query(
      'INSERT INTO data_snapshots (id, label, snapshot_json, created_by) VALUES (?, ?, ?, ?)',
      [snapshotId, `Before ${requiredMigrationId}`, jsonSafe(snapshot), actor],
    )

    if (rows.length) {
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [notificationStateKey, rows[0].v, actor])
      await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [JSON.stringify(retained), notificationStateKey])
    } else {
      await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?)', [notificationStateKey, JSON.stringify(retained)])
    }

    await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [requiredMigrationId])
    await conn.commit()

    const [migration] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ?', [requiredMigrationId])
    console.log(JSON.stringify({
      applied: true,
      migration: migration[0],
      snapshotId,
      removed,
      retainedCount: retained.length,
    }, null, 2))
  }
} catch (error) {
  await conn.rollback().catch(() => {})
  throw error
} finally {
  conn.release()
  await pool.end()
}
