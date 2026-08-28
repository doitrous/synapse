/**
 * Give an account the admin role, from the database side.
 *
 *   npm --prefix server run promote-admin -- <email>            # show, change nothing
 *   npm --prefix server run promote-admin -- <email> --commit    # promote
 *   npm --prefix server run promote-admin -- <email> --commit --role student
 *
 * Every route that can promote somebody is itself behind `requireAdmin`, which
 * is right for the second admin and impossible for the first: a fresh estate has
 * no admin, so nobody can make one, so `adminsynapse.doitrous.com` refuses
 * everyone. `setRole` in accounts.js says as much — "no way back from an estate
 * with no administrator that does not involve editing the database by hand".
 * This is that hand-editing, written down once so it is done consistently and
 * lands in `role_promotion_audit` like every other promotion.
 *
 * It prints before it writes and writes nothing without `--commit`, because the
 * argument is an email address and a typo should be a message, not a role.
 * `promoted_by` records this script rather than a person: the audit row should
 * not claim an administrator approved it when the whole point is that there was
 * none.
 */
import { pool } from '../src/db.js'

const args = process.argv.slice(2)
const commit = args.includes('--commit')
const roleIndex = args.indexOf('--role')
const role = roleIndex === -1 ? 'admin' : args[roleIndex + 1]
// -1 rather than 0 when there is no --role, or the first argument — the email —
// would be skipped as if it were that flag's value.
const roleValueIndex = roleIndex === -1 ? -1 : roleIndex + 1
const email = args.find((arg, index) => !arg.startsWith('--') && index !== roleValueIndex)

if (!email) {
  console.error('usage: promote-admin.mjs <email> [--commit] [--role admin|student]')
  process.exit(1)
}
if (!['admin', 'student'].includes(role)) {
  console.error(`--role must be admin or student, not "${role}"`)
  process.exit(1)
}

try {
  // Matched on email because that is what the person asking knows. The row is
  // created by the first authenticated request an account ever makes, so an
  // account that has never signed in is genuinely absent rather than mistyped —
  // and the two need different advice.
  const [rows] = await pool.query(
    'SELECT user_id AS userId, email, role, status FROM user_access WHERE email = ? ORDER BY created_at',
    [email],
  )

  if (!rows.length) {
    console.error(`no account with email "${email}".`)
    console.error('user_access rows are written on an account\'s first authenticated request — sign in once on the site, then run this again.')
    process.exit(1)
  }
  if (rows.length > 1) {
    console.error(`${rows.length} accounts share that email; refusing to guess.`)
    for (const row of rows) console.error(`  ${row.userId}  role=${row.role}  status=${row.status}`)
    process.exit(1)
  }

  const account = rows[0]
  console.log(`${account.email}  ${account.userId}`)
  console.log(`  role   ${account.role}${account.role === role ? '' : ` → ${role}`}`)
  console.log(`  status ${account.status}`)

  if (account.status !== 'active') {
    console.error('account is suspended — reactivate it before changing its role.')
    process.exit(1)
  }
  if (account.role === role) {
    console.log(`already ${role}; nothing to do.`)
    process.exit(0)
  }
  if (!commit) {
    console.log('\ndry run — nothing written. Re-run with --commit to apply.')
    process.exit(0)
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query(
      'UPDATE user_access SET role = ?, promoted_by = ?, promoted_at = NOW() WHERE user_id = ?',
      [role, 'script:promote-admin', account.userId],
    )
    await conn.query(
      'INSERT INTO role_promotion_audit (user_id, previous_role, next_role, promoted_by, reason) VALUES (?, ?, ?, ?, ?)',
      [account.userId, account.role, role, 'script:promote-admin', 'promoted from the database with scripts/promote-admin.mjs'],
    )
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }

  console.log(`\ndone — ${account.email} is now ${role}.`)
  // The browser holds the old answer from /api/me until something asks again.
  console.log('Reload adminsynapse.doitrous.com (a full reload, not a route change) to pick it up.')
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
