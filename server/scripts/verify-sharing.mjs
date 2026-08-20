/**
 * Do the enrolment and sharing rules actually hold in SQL?
 *
 *   node --env-file-if-exists=.env server/scripts/verify-sharing.mjs
 *
 * `sharePolicy` is pure and unit-tested, but a permission model is only as good
 * as the queries that apply it, and those had never been run against a real
 * database. This runs them: it seeds two synthetic accounts, publishes a share
 * from one, and checks what the other can and cannot do with it at each access
 * level — including that revoking a link to `private` stops it opening for
 * somebody who already has it.
 *
 * It writes, so it refuses to run against anything but a database you have
 * named explicitly, and it removes everything it created on the way out. Point
 * it at a scratch database — never at production.
 *
 * Nothing here creates a real account or touches Supabase. The user ids are
 * strings; the server derives the real ones from a verified session.
 */
import assert from 'node:assert/strict'
import { pool } from '../src/db.js'
import { createShare, deleteShare, listShares, readShare, updateShare } from '../src/shares.js'
import { saveOwnEnrolment } from '../src/accounts.js'

const OWNER = 'verify-owner'
const OTHER = 'verify-other'
const IDS = [OWNER, OTHER]

/** Refuse anything that is not obviously a scratch database. */
function guard() {
  const name = process.env.DB_NAME ?? ''
  const url = process.env.DATABASE_URL ?? ''
  if (process.env.VERIFY_SHARING_I_MEAN_IT === 'yes') return
  if (/prod/i.test(name) || /prod/i.test(url)) {
    throw new Error('That looks like production. Point this at a scratch database.')
  }
}

const results = []
function check(name, run) {
  try {
    run()
    results.push(['ok', name])
  } catch (error) {
    results.push(['FAILED', `${name} — ${error.message}`])
  }
}

async function cleanup() {
  await pool.query('DELETE FROM shared_documents WHERE owner_id IN (?, ?)', IDS)
  await pool.query('DELETE FROM subscriptions WHERE student_id IN (?, ?)', IDS)
  await pool.query('DELETE FROM account_action_audit WHERE user_id IN (?, ?)', IDS)
  await pool.query('DELETE FROM students WHERE id IN (?, ?)', IDS)
  await pool.query('DELETE FROM user_access WHERE user_id IN (?, ?)', IDS)
}

async function main() {
  guard()
  await cleanup()

  // Two accounts that have signed in and have no profile yet — the state every
  // real account is in immediately after registering.
  for (const id of IDS) {
    await pool.query(
      `INSERT INTO user_access (user_id, email, role, status) VALUES (?, ?, 'student', 'active')`,
      [id, `${id}@example.test`],
    )
  }

  /* ── Enrolment ───────────────────────────────────────────────────────── */

  const enrolled = await saveOwnEnrolment(OWNER, {
    universityId: 'kau', year: 'Year 3', group: 'Group 4',
    name: 'Verify Owner', phone: '0100 999 8877', nationality: 'Egyptian', plan: 'QBank',
  })
  check('enrolment writes a roster row', () => {
    assert.equal(enrolled.error, undefined)
    assert.equal(enrolled.profile.universityId, 'kau')
    assert.equal(enrolled.profile.year, 'Year 3')
    assert.equal(enrolled.profile.group, 'Group 4')
  })
  check('the real name from sign-up wins over the email placeholder', () => {
    assert.equal(enrolled.profile.name, 'Verify Owner')
  })
  const [[phoneRow]] = await pool.query('SELECT phone FROM students WHERE id = ?', [OWNER])
  check('the phone is stored in E.164', () => assert.equal(phoneRow.phone, '+201009998877'))

  check('enrolment grants a trial', () => {
    assert.equal(enrolled.profile.entitlement.state, 'trialing')
    assert.equal(enrolled.profile.entitlement.daysLeft > 0, true)
  })

  // Re-enrolling is what correcting a year does, and must not stack trials.
  const corrected = await saveOwnEnrolment(OWNER, { universityId: 'kau', year: 'Year 4', group: '' })
  check('correcting the year updates in place', () => assert.equal(corrected.profile.year, 'Year 4'))
  const [[subs]] = await pool.query(
    `SELECT COUNT(*) AS n FROM subscriptions WHERE student_id = ? AND status <> 'cancelled'`, [OWNER])
  check('a second enrolment does not grant a second trial', () => assert.equal(subs.n, 1))

  const refused = await saveOwnEnrolment(OWNER, { universityId: '', year: '' })
  check('enrolment refuses an empty university or year', () => assert.equal(refused.error, 'university_and_year_required'))

  await pool.query('UPDATE students SET name = ? WHERE id = ?', ['Corrected By Admin', OWNER])
  const afterAdmin = await saveOwnEnrolment(OWNER, { universityId: 'kau', year: 'Year 5', name: 'Verify Owner' })
  check('a name an administrator set is never overwritten by a later enrolment', () => {
    assert.equal(afterAdmin.profile.name, 'Corrected By Admin')
  })

  // The second account claims the same number. It must not be able to take it,
  // and must not be blocked from enrolling either.
  const second = await saveOwnEnrolment(OTHER, {
    universityId: 'kau', year: 'Year 1', phone: '+201009998877', name: 'Verify Other',
  })
  check('a phone already held by somebody else does not block enrolling', () => {
    assert.equal(second.error, undefined)
    assert.equal(second.profile.year, 'Year 1')
  })
  const [[otherPhone]] = await pool.query('SELECT phone FROM students WHERE id = ?', [OTHER])
  check('and that number is not duplicated onto the second account', () => assert.equal(otherPhone.phone, null))

  /* ── Sharing ─────────────────────────────────────────────────────────── */

  const created = await createShare(OWNER, {
    kind: 'note', title: 'Heart failure', access: 'view', payload: { body: '# Notes' },
  })
  check('a note can be published', () => assert.equal(typeof created.id, 'string'))
  const id = created.id

  const badKind = await createShare(OWNER, { kind: 'essay', title: 'x', access: 'view', payload: {} })
  check('an unknown kind is refused', () => assert.equal(badKind.error, 'unknown_kind'))

  const asOwner = await readShare(id, OWNER)
  const asOther = await readShare(id, OTHER)
  const asStranger = await readShare(id, null)
  check('a view link opens for the owner, a signed-in stranger, and nobody at all', () => {
    assert.equal(asOwner.share.canEdit, true)
    assert.equal(asOwner.share.isOwner, true)
    assert.equal(asOther.share.canEdit, false)
    assert.equal(asStranger.share.canEdit, false)
    assert.deepEqual(asStranger.share.payload, { body: '# Notes' })
  })

  const strangerWrite = await updateShare(id, OTHER, { payload: { body: 'defaced' } })
  check('a read-only link cannot be written to', () => assert.equal(strangerWrite.error, 'not_found'))
  const stillClean = await readShare(id, null)
  check('and the contents are unchanged', () => assert.deepEqual(stillClean.share.payload, { body: '# Notes' }))

  await updateShare(id, OWNER, { access: 'edit' })
  const collaborated = await updateShare(id, OTHER, { payload: { body: 'a real contribution' } })
  check('an editable link can be written to by somebody signed in', () => {
    assert.equal(collaborated.error, undefined)
    assert.deepEqual(collaborated.share.payload, { body: 'a real contribution' })
  })
  const [[attribution]] = await pool.query('SELECT updated_by FROM shared_documents WHERE id = ?', [id])
  check('and the edit is attributed to whoever made it', () => assert.equal(attribution.updated_by, OTHER))

  const widen = await updateShare(id, OTHER, { access: 'view' })
  check('holding an editable link does not carry the power to change access', () => {
    assert.equal(widen.error, 'only_the_owner_may_change_access')
  })

  const anonWrite = await updateShare(id, null, { payload: { body: 'anonymous' } })
  check('an unattributable edit is refused', () => assert.equal(anonWrite.error, 'unauthorized'))

  // The one that matters: revoking has to work after the link has gone round.
  await updateShare(id, OWNER, { access: 'private' })
  const revokedForOther = await readShare(id, OTHER)
  const revokedForStranger = await readShare(id, null)
  const stillOwners = await readShare(id, OWNER)
  check('revoking to private closes the link for everybody else', () => {
    assert.equal(revokedForOther.error, 'not_found')
    assert.equal(revokedForStranger.error, 'not_found')
  })
  check('and the owner keeps their own copy', () => assert.equal(stillOwners.share.title, 'Heart failure'))
  const revokedWrite = await updateShare(id, OTHER, { payload: { body: 'x' } })
  check('a revoked link cannot be written to either', () => assert.equal(revokedWrite.error, 'not_found'))

  const board = await createShare(OWNER, {
    kind: 'whiteboard', title: 'Board', access: 'view',
    payload: { notes: [{ id: 'n1', x: 0, y: 0, text: 'hi', tone: 'paper' }], links: [], frames: [], ink: [] },
  })
  const mine = await listShares(OWNER)
  check('a board publishes and both appear in the owner\'s list', () => {
    assert.equal(mine.length, 2)
    assert.equal(mine.some((row) => row.kind === 'whiteboard'), true)
    assert.equal(mine.every((row) => row.payload === undefined), true, 'the list must not carry payloads')
  })

  const strangerDelete = await deleteShare(board.id, OTHER)
  check('only the owner may delete a share', () => assert.equal(strangerDelete.error, 'not_found'))
  const ownerDelete = await deleteShare(board.id, OWNER)
  check('the owner may delete their own', () => assert.equal(ownerDelete.ok, true))
  const gone = await readShare(board.id, OWNER)
  check('and it is gone', () => assert.equal(gone.error, 'not_found'))

  await cleanup()

  const failed = results.filter(([state]) => state !== 'ok')
  for (const [state, name] of results) console.log(`${state === 'ok' ? '  ok' : 'FAIL'}  ${name}`)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) process.exitCode = 1
}

main()
  .catch((error) => { console.error(error); process.exitCode = 1 })
  .finally(() => pool.end())
