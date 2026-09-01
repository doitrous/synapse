/**
 * Voucher redemption, decided by the server.
 *
 * Eligibility used to be evaluated in the browser, and the redemption count was
 * incremented by the student's own `PUT /api/state/nishany-vouchers-v1` — a
 * request the API refuses, so applying a voucher failed silently and retried
 * every two seconds forever. Worse, had it succeeded, two students applying the
 * same last-seat voucher would each have read the same count and written the
 * same increment.
 *
 * Everything here happens inside one transaction, against the roster row the
 * server can see. The client's opinion is only ever a preview.
 */
import { pool } from './db.js'

const VOUCHER_KEY = 'nishany-vouchers-v1'

/** Typed refusals, so the UI can say which rule was not met. */
export const REFUSALS = {
  not_found: 'That voucher code was not found. Check the spelling and try again.',
  inactive: 'This voucher is not active.',
  not_started: 'This voucher is not available yet.',
  expired: 'This voucher has expired.',
  limit_reached: 'This voucher has reached its redemption limit.',
  not_your_university: 'This voucher is not available for your university.',
  not_your_year: 'This voucher is not available for your year.',
  not_your_group: 'This voucher is not available for your group.',
  already_redeemed: 'You have already applied this voucher.',
  no_profile: 'Your student profile has not been set up yet, so targeted vouchers cannot be checked.',
}

async function readVouchers(conn) {
  const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [VOUCHER_KEY])
  if (!rows.length) return []
  try {
    const parsed = JSON.parse(rows[0].v)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Write the catalogue back as the server, attributing the change to the student.
 *
 * This bypasses the admin gate on `PUT /api/state` legitimately: it is server
 * code applying a rule, not a client editing an admin document. The version row
 * records which account caused it.
 */
async function writeVouchers(conn, vouchers, actorId) {
  const value = JSON.stringify(vouchers)
  await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [VOUCHER_KEY, value, actorId])
  await conn.query(
    'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
    [VOUCHER_KEY, value],
  )
}

async function profileOf(conn, userId) {
  const [rows] = await conn.query(
    'SELECT id, university_id AS universityId, year, study_group AS studyGroup FROM students WHERE user_id = ? LIMIT 1',
    [userId],
  )
  return rows[0] ?? null
}

/**
 * Why this voucher is not for this student, or null when it is.
 *
 * A restriction the student cannot be matched against fails closed: a voucher
 * that names universities is not granted to someone whose university we do not
 * know. Guessing yes would hand a targeted discount to anyone who asked.
 */
function refusalFor(voucher, profile, liveRedemptions, now) {
  if (!voucher.active) return 'inactive'
  if (new Date(voucher.startsAt).getTime() > now) return 'not_started'
  if (new Date(voucher.expiresAt).getTime() < now) return 'expired'
  if (voucher.maxRedemptions > 0 && liveRedemptions >= voucher.maxRedemptions) return 'limit_reached'
  const targeted = voucher.universityIds?.length || voucher.years?.length || voucher.groups?.length
  if (targeted && !profile) return 'no_profile'
  if (voucher.universityIds?.length && !voucher.universityIds.includes(profile.universityId)) return 'not_your_university'
  if (voucher.years?.length && !voucher.years.includes(profile.year)) return 'not_your_year'
  if (voucher.groups?.length && !voucher.groups.includes(profile.studyGroup)) return 'not_your_group'
  return null
}

/** Live redemptions for a voucher — released ones return their seat to the pool. */
async function countRedemptions(conn, voucherId) {
  const [rows] = await conn.query(
    'SELECT COUNT(*) AS n FROM voucher_redemptions WHERE voucher_id = ? AND released_at IS NULL',
    [voucherId],
  )
  return Number(rows[0]?.n ?? 0)
}

export async function redeemVoucher(userId, rawCode) {
  const code = String(rawCode ?? '').trim()
  if (!code) return { ok: false, reason: 'not_found', message: REFUSALS.not_found }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const vouchers = await readVouchers(conn)
    const voucher = vouchers.find((item) => String(item.code).toLowerCase() === code.toLowerCase())
    if (!voucher) {
      await conn.rollback()
      return { ok: false, reason: 'not_found', message: REFUSALS.not_found }
    }

    const [mine] = await conn.query(
      'SELECT voucher_id, released_at FROM voucher_redemptions WHERE voucher_id = ? AND user_id = ?',
      [voucher.id, userId],
    )
    if (mine.length && mine[0].released_at === null) {
      await conn.rollback()
      return { ok: false, reason: 'already_redeemed', message: REFUSALS.already_redeemed }
    }

    const profile = await profileOf(conn, userId)
    const live = await countRedemptions(conn, voucher.id)
    const reason = refusalFor(voucher, profile, live, Date.now())
    if (reason) {
      await conn.rollback()
      return { ok: false, reason, message: REFUSALS[reason] }
    }

    // Re-applying a previously released voucher reuses the row, which is what
    // keeps the primary key meaning "one seat per student".
    await conn.query(
      `INSERT INTO voucher_redemptions (voucher_id, user_id, code) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE released_at = NULL, redeemed_at = CURRENT_TIMESTAMP`,
      [voucher.id, userId, voucher.code],
    )
    const updated = await countRedemptions(conn, voucher.id)
    await writeVouchers(
      conn,
      vouchers.map((item) => item.id === voucher.id
        ? { ...item, redemptionCount: updated, updatedAt: new Date().toISOString() }
        : item),
      userId,
    )
    await conn.commit()
    return { ok: true, voucher: { ...voucher, redemptionCount: updated } }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function releaseVoucher(userId) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query(
      'SELECT voucher_id AS voucherId FROM voucher_redemptions WHERE user_id = ? AND released_at IS NULL LIMIT 1',
      [userId],
    )
    if (!rows.length) {
      await conn.rollback()
      return { ok: true, released: null }
    }
    const voucherId = rows[0].voucherId
    await conn.query(
      'UPDATE voucher_redemptions SET released_at = CURRENT_TIMESTAMP WHERE voucher_id = ? AND user_id = ?',
      [voucherId, userId],
    )
    const vouchers = await readVouchers(conn)
    const updated = await countRedemptions(conn, voucherId)
    await writeVouchers(
      conn,
      vouchers.map((item) => item.id === voucherId
        ? { ...item, redemptionCount: updated, updatedAt: new Date().toISOString() }
        : item),
      userId,
    )
    await conn.commit()
    return { ok: true, released: voucherId }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

/** The voucher this student currently has applied, if any. */
export async function myVoucher(userId) {
  const [rows] = await pool.query(
    'SELECT voucher_id AS voucherId, code, redeemed_at AS redeemedAt FROM voucher_redemptions WHERE user_id = ? AND released_at IS NULL LIMIT 1',
    [userId],
  )
  return rows[0] ?? null
}
