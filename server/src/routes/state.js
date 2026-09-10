/**
 * The shared document store: what a student may read, when each document last
 * changed, and the guarded read/write/delete of one document.
 */
import { callerHasActiveAccess } from '../accounts.js'
import { heldTabs, invalidateRoleTabs, mfaSatisfied, requireAuthenticated, requireConsole, requireSuperAdmin } from '../auth.js'
import { CONTENT_REPORTS_STATE_KEY } from '../contentReports.js'
import { pool } from '../db.js'
import { ACADEMIC_CATALOGUE_STATE_KEY, CONTENT_LEDGER_STATE_KEY, wrap } from '../http.js'
import { MEDIA_STATE_KEY } from '../mediaLibrary.js'
import { NOTIFICATION_CAMPAIGNS_KEY, projectCampaignsForStudent } from '../notificationDelivery.js'
import { collectMediaRequests } from '../mediaRequestPolicy.js'
import { deleteManagedMediaRow, invalidateSnapshots, mediaRecords, removePhysicalMediaIfUnreferenced, withManagedMediaDigestLock } from '../mediaStore.js'
import { hasConsoleAccess } from '../roles.js'
import { canonicalStateKey } from '../stateKeys.js'
import { applyDelta, authoriseChanges, diffDocument, isMergeable, mergeDocument, reconstructChanges } from '../stateMerge.js'
import { REDACTED_STATE_KEYS, archiveScopeBlockedPublishedItems, newlyArchiveScopeBlockedPublishedItems, newlyMediaBlockedPublishedItems, redactLedgerForStudent, releasedMediaIdsFromDocument } from '../studentLedger.js'
import { SUBSCRIBER_DISPLAY_STATE_KEY } from '../subscriberCount.js'
import { ROLE_TABS_STATE_KEY, holdsTab, tabsForStateKey } from '../tabs.js'

// Shared catalogue documents that students need in order to use the learning
// product. All other shared documents (reports, imports, email logs, settings)
// remain admin-only even when a key is guessed.
const STUDENT_READABLE_STATE = new Set([
  // Alt text and dimensions for every image a student may be shown. The bytes
  // are a separate, individually authenticated request.
  MEDIA_STATE_KEY,
  // The admin's edits to Terms, Privacy, Refund Policy and Contact. The most
  // public documents the platform has: they are read from the marketing footer
  // by somebody who has not signed up yet, so this one is readable with no
  // session at all. Only the `legal` tab may write it.
  'nishany-legal-pages-v1',
  // The faculty's own by-module and by-year structures. Students browse them.
  'nishany-library-trees-v1',
  'nishany-academic-universities-v1',
  'nishany-course-curricula-v1',
  'nishany-module-schedules-v1',
  // The by-module subject tree and the assessment/marks schemes. Admin-written
  // from the curriculum tabs, read by `useStudentCurriculum` on the student
  // side — so they belong here beside the other academic structures. Added
  // late with the academic model and, until now, missing: the 403 they returned
  // is what made the Question Bank, study rooms and dashboard show the
  // boundary's "could not be loaded".
  'nishany-module-subjects-v1',
  'nishany-assessment-schemes-v1',
  'nishany-admin-content-ledger-v4',
  'nishany-concept-graph-v2',
  'nishany-relation-types-v1',
  'nishany-taxonomy-tree-v4',
  'nishany-medical-library-taxonomy-v1',
  // The bilingual glossary behind /app/taxonomy. Admin-written, student-read.
  'nishany-medical-glossary-v1',
  'nishany-medical-evidence-published-v1',
  'nishany-plans-v1',
  'nishany-notification-campaigns-v1',
  'nishany-vouchers-v1',
  'nishany-system-colors-v1',
  // The current plan catalogue. Billing and onboarding both price against it,
  // and without it a student was offered the seeded plans instead of the ones
  // actually being sold.
  'nishany-plan-catalog-v1',
  // The student-ID discount offer, shown on Billing to the students it is for.
  'nishany-student-id-discount-v1',
  // The upload allowance, so the demo build can show the limit an admin set.
  'nishany-storage-limits-v1',
  // The construction economy is set by an admin and explained on the student
  // dashboard. Students can read the multipliers but only Settings can write.
  'nishany-maristana-config-v1',
  // The tutorial videos an admin curates; the dashboard's tutorial card plays
  // them. Admin-written, student-read — its 403 broke the dashboard.
  'nishany-tutorial-videos-v1',
  // Adaptive Study runs entirely on these three, on the student's own screen.
  // Admin-written and student-read: a student must not be able to edit the
  // thresholds they are judged by, but a page that cannot read them silently
  // falls back to defaults and reports figures nobody configured.
  'nishany-adaptive-config-v1',
  'nishany-adaptive-blueprints-v1',
  'nishany-adaptive-heldout-v1',
  // Whether the answer-distribution bars are shown to students, and how. The
  // Question Bank reads this to decide what to render; it is admin-written from
  // Settings and student-read only. Without it here the read 403s and every
  // page that reads it shows the boundary's "could not be loaded" instead.
  'nishany-answer-stats-v1',
])

export function registerStateManifestRoutes(app) {
  /**
   * When each catalogue document last changed.
   *
   * A phone cannot ask whether a document is stale without downloading all of it:
   * reads return the whole value, and there is no `HEAD` and no `If-None-Match`.
   * So an offline-first client had the choice of refetching every catalogue on
   * every launch or showing content it could not prove was current. This answers
   * the question directly — timestamps only, a few hundred bytes — and the client
   * fetches just the documents whose timestamp moved.
   *
   * A key that has never been written is reported as `null` rather than omitted,
   * so a client can tell "nothing stored yet" from "key not in the contract" and
   * stop asking for it.
   *
   * Registered before `/api/state/:key`, which would otherwise match this path
   * with `key = 'manifest'`. If that ordering is ever broken the request fails
   * closed — `manifest` is not in the readable set, so it would 403 rather than
   * disclose anything.
   */
  app.get('/api/state/manifest', requireAuthenticated, wrap(async (_req, res) => {
    const keys = [...STUDENT_READABLE_STATE]
    const [rows] = await pool.query(
      `SELECT k, updated_at AS updatedAt FROM app_state WHERE k IN (${keys.map(() => '?').join(',')})`,
      keys,
    )
    const stored = new Map(rows.map((row) => [row.k, row.updatedAt]))
    const out = {}
    for (const key of keys) out[key] = stored.get(key) ?? null
    res.json({ keys: out })
  }))

  // Bulk hydrate on app boot.
  app.get('/api/state', requireSuperAdmin, wrap(async (_req, res) => {
    const [rows] = await pool.query('SELECT k, v FROM app_state')
    const out = {}
    for (const r of rows) { try { out[r.k] = JSON.parse(r.v) } catch { out[r.k] = null } }
    res.json(out)
  }))
}

export function registerStateDocumentRoutes(app) {
  app.get('/api/state/:key', wrap(async (req, res) => {
    // Console access, not the single role 'admin': an editor or a reviewer
    // authors this content and must read it whole. Redaction is for students.
    const authoring = hasConsoleAccess(req.identity?.role)
    const key = canonicalStateKey(req.params.key)
    if (!STUDENT_READABLE_STATE.has(key)) {
      if (!authoring) return res.status(403).json({ error: 'console access required' })
      if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
    }
    // `updatedAt` lets the client decide whether its crash-recovery copy is newer
    // than the stored document. Without it a stale browser silently wins and
    // re-uploads old data over a newer server-side write.
    //
    // `version` is the row this document was read at. The client sends it back on
    // save, which is what lets the write below reconstruct what that client
    // actually changed instead of taking its whole document on trust.
    // Tells the client this server understands delta saves (change-only writes)
    // for this document. A client withholds deltas until it sees this, so a client
    // built for delta can never send one to an older server that would read the
    // absent whole `value` as "delete everything". Only meaningful for authors —
    // students do not write.
    const deltaSupported = authoring && isMergeable(key)
    const [rows] = await pool.query(
      `SELECT s.v, s.updated_at AS updatedAt,
              (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
         FROM app_state s WHERE s.k = ?`,
      [key],
    )
    if (!rows.length) return res.json({ value: null, updatedAt: null, version: null, deltaSupported })
    const { updatedAt, version } = rows[0]
    let value
    try { value = JSON.parse(rows[0].v) } catch { return res.json({ value: null, updatedAt, version, deltaSupported }) }
    // Some readable documents are readable only in part. The content ledger holds
    // every authored item in every state, including drafts, the author's private
    // notes and the provenance of borrowed papers; a student gets its published
    // projection instead. That happens here rather than in the browser, because a
    // field removed after delivery has already been delivered.
    const redact = authoring ? undefined : REDACTED_STATE_KEYS.get(key)
    if (!authoring && key === CONTENT_LEDGER_STATE_KEY) {
      // The whole published catalogue in one read: the paid product. The sliced
      // `/api/content/*` routes gate this same content, so this legacy path must
      // too, or it is a way straight around them. A live trial or subscription is
      // required; console roles never reach here (they are `authoring`).
      if (!(await callerHasActiveAccess(req.identity))) {
        return res.status(402).json({ error: 'subscription_required' })
      }
      // The whole-ledger read the sliced `/api/content/*` routes replace. Native
      // bundles still take this path, so it stays — logged so we can see who is
      // left on it before anyone proposes deleting it.
      console.info('[content] legacy ledger fetch', { userId: req.identity?.id })
      const releasedMediaIds = releasedMediaIdsFromDocument({ records: await mediaRecords() })
      const [catalogueRows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [ACADEMIC_CATALOGUE_STATE_KEY])
      let catalogue = []
      try { catalogue = catalogueRows[0] ? JSON.parse(catalogueRows[0].v) : [] } catch { catalogue = [] }
      value = redactLedgerForStudent(value, releasedMediaIds, catalogue)
    } else if (!authoring && key === NOTIFICATION_CAMPAIGNS_KEY && Array.isArray(value)) {
      // Deliver only the campaigns due and addressed to this student's cohort —
      // the same match the bell makes, done before the document leaves the
      // server so inactive, future and other-cohort campaigns are never sent.
      const [profileRows] = await pool.query(
        'SELECT university_id AS universityId, year, study_group AS `group` FROM students WHERE user_id = ? LIMIT 1',
        [req.identity?.id],
      )
      value = projectCampaignsForStudent(value, profileRows[0] ?? {}, Date.now())
    } else if (redact) value = redact(value)
    // Archived reports stay on the record for editors and super admins, but a
    // reviewer's queue is only the live work: they are filtered out before the
    // document ever reaches a reviewer, not merely hidden in the browser.
    if (req.identity?.role === 'reviewer' && key === CONTENT_REPORTS_STATE_KEY && Array.isArray(value)) {
      value = value.filter((report) => report?.status !== 'Archived')
    }
    res.json({ value, updatedAt, version, deltaSupported })
  }))

  /**
   * How many version rows to keep per document, and how many to drop per save.
   *
   * Each version row is a full snapshot — the content ledger's are ~23 MB — so an
   * unbounded history was the table's runaway growth. Older rows are only ever
   * read as the merge base for a whole-document save from a client that loaded
   * long ago; a delta save needs none of them, and a base that has been pruned
   * simply asks that client to reload. Keeping a generous recent window preserves
   * that base for all but the most stale client, and the last resort for undoing
   * a bad write. Both are env-tunable. The delete is bounded so a large backlog
   * drains over successive saves instead of one heavy, locking delete.
   */
  const STATE_VERSION_RETENTION = Math.max(2, Number(process.env.STATE_VERSION_RETENTION) || 20)
  // Gentle by default: at steady state only one row per save exceeds the window,
  // so a small batch keeps up, and a large existing backlog drains over many
  // saves rather than in heavy 23 MB-a-row deletes that fight foreground writes.
  // Raise STATE_VERSION_PRUNE_BATCH to reclaim a big backlog faster.
  const STATE_VERSION_PRUNE_BATCH = Math.max(1, Number(process.env.STATE_VERSION_PRUNE_BATCH) || 5)
  const pruningVersionKeys = new Set()

  /**
   * Trim a key's version history to the newest STATE_VERSION_RETENTION rows.
   *
   * Runs after commit, off the write's transaction and lock, best-effort: it is
   * housekeeping, never part of whether the save succeeded. One key prunes at a
   * time so rapid saves cannot stack heavy deletes on top of each other.
   */
  async function pruneStateVersions(key) {
    if (pruningVersionKeys.has(key)) return
    pruningVersionKeys.add(key)
    try {
      // The oldest row we keep; everything with a smaller id is prunable. LIMIT and
      // OFFSET are inlined, not bound — they are validated server integers, and
      // mysql2 quotes bound LIMIT/OFFSET values into a syntax error.
      const [rows] = await pool.query(
        `SELECT id FROM app_state_versions WHERE k = ? ORDER BY id DESC LIMIT 1 OFFSET ${STATE_VERSION_RETENTION - 1}`,
        [key],
      )
      const floor = rows[0]?.id
      if (!floor) return
      await pool.query(
        `DELETE FROM app_state_versions WHERE k = ? AND id < ? ORDER BY id ASC LIMIT ${STATE_VERSION_PRUNE_BATCH}`,
        [key, floor],
      )
    } finally {
      pruningVersionKeys.delete(key)
    }
  }

  /**
   * Enforce that a media request only becomes supplied with verified media.
   *
   * Compares the merged ledger against what was stored and looks at every request
   * whose media was just attached, or that now claims to be supplied. A managed
   * upload must be 'ready' — genuinely round-tripped and verified — for the request
   * to stand: a ready one is promoted to 'supplied' in place (the server's decision,
   * not a label the client can assert), and one still verifying or failed refuses
   * the whole save. A mediaId with no managed row is pre-existing/legacy media and
   * is left untouched, so this never falsely blocks media the state machine does
   * not own.
   */
  async function enforceMediaSupply(conn, mergedLedger, storedLedger) {
    const merged = collectMediaRequests(mergedLedger)
    const stored = collectMediaRequests(storedLedger)
    const candidates = []
    for (const [id, request] of merged) {
      if (!request?.mediaId) continue
      const before = stored.get(id) ?? null
      const attachedNow = request.mediaId !== before?.mediaId
      const claimsSupplied = request.status === 'supplied' && before?.status !== 'supplied'
      if (attachedNow || claimsSupplied) candidates.push(request)
    }
    if (!candidates.length) return { ok: true, readyMediaIds: new Set() }

    const mediaIds = [...new Set(candidates.map((request) => request.mediaId))]
    const [rows] = await conn.query('SELECT id, status FROM managed_media WHERE id IN (?)', [mediaIds])
    const statusById = new Map(rows.map((row) => [row.id, row.status]))

    const notReady = []
    // The managed ids this save legitimately attaches, now verified ready. The
    // descriptive media record (its alt text and rights) rides a second, separate
    // save to the media document; until that lands the id is not yet "released",
    // which would otherwise make supplying media to an already-published item fail
    // purely on save ordering. Students never see the difference — they only ever
    // receive released media (see redactMediaForStudent) — so the publish guard may
    // safely treat a verified, just-attached asset as acceptable.
    const readyMediaIds = new Set()
    for (const request of candidates) {
      const status = statusById.get(request.mediaId)
      if (status === undefined) continue // not a managed upload — legacy media, left as-is
      if (status !== 'ready') { notReady.push({ id: request.id, mediaId: request.mediaId, status }); continue }
      if (request.status !== 'supplied') request.status = 'supplied'
      readyMediaIds.add(request.mediaId)
    }
    return notReady.length ? { ok: false, notReady } : { ok: true, readyMediaIds }
  }

  /**
   * Save a shared document.
   *
   * Three refusals, in the order they become knowable: you must hold a tab that
   * owns this key; the changes you are making must be yours to make; and nobody
   * may have changed the same item underneath you. Each answers with what is
   * wrong, because a save that fails silently is the bug this route used to have.
   */
  app.put('/api/state/:key', requireConsole, wrap(async (req, res) => {
    const key = canonicalStateKey(req.params.key)

    // The subscriber-display doc has a dedicated endpoint that re-captures the
    // real subscription count in the same transaction as a base change; the
    // generic route cannot express that, so it never writes this key — not even
    // for a super admin, who could otherwise bypass the tab check below.
    if (key === SUBSCRIBER_DISPLAY_STATE_KEY) {
      return res.status(403).json({ error: 'use POST /api/admin/subscriber-count for this document' })
    }

    const owners = tabsForStateKey(key)
    const held = await heldTabs(req.identity)
    const superAdmin = req.identity.role === 'super_admin'

    // A key no tab declares is reachable only by a super admin. Fail closed: a
    // document added later without a registry entry becomes a bug report, never
    // a hole.
    if (!superAdmin && !holdsTab(held, owners)) {
      return res.status(403).json({ error: 'that area is not part of your role' })
    }

    const baseVersion = req.body?.baseVersion
    if (baseVersion === undefined) {
      return res.status(400).json({ error: 'baseVersion is required; reload this page and try again' })
    }

    const conn = await pool.getConnection()
    let removedMediaRecords = []
    try {
      await conn.beginTransaction()
      let guardedRows = []
      let currentRows
      if (key === CONTENT_LEDGER_STATE_KEY || key === MEDIA_STATE_KEY || key === ACADEMIC_CATALOGUE_STATE_KEY) {
        // Publication, release, and valid curriculum placement are one invariant.
        // Lock all three documents in one deterministic query so concurrent
        // writes cannot validate against different catalogue/media generations.
        const [rows] = await conn.query(
          'SELECT k, v FROM app_state WHERE k IN (?, ?, ?) ORDER BY k FOR UPDATE',
          [ACADEMIC_CATALOGUE_STATE_KEY, CONTENT_LEDGER_STATE_KEY, MEDIA_STATE_KEY],
        )
        guardedRows = rows
        currentRows = rows.filter((row) => row.k === key)
      } else {
        const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
        currentRows = rows
      }
      const storedRaw = currentRows.length ? currentRows[0].v : null
      const [versionRows] = await conn.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [key])
      const storedVersion = versionRows[0]?.version ?? null

      const stored = storedRaw === null ? null : JSON.parse(storedRaw)

      // A delta save sends only the items this client changed. It is the same
      // authorisation and per-item conflict check as a whole-document save, but it
      // never needs the base document — the `before` carried by each change is the
      // conflict guard — so it is immune to a pruned version row, and one changed
      // question no longer costs a 22 MB upload. A `changes` array that is present
      // but malformed is refused; a whole-document `value` takes the path below.
      const rawChanges = req.body?.changes
      let merged
      let changesForAuth
      if (rawChanges !== undefined) {
        if (!isMergeable(key)) {
          await conn.rollback()
          return res.status(400).json({ error: 'delta_unsupported', reason: 'this document is saved whole, not by change' })
        }
        changesForAuth = reconstructChanges(key, rawChanges)
        if (!changesForAuth) {
          await conn.rollback()
          return res.status(400).json({ error: 'malformed_changes', reason: 'the change set is malformed; reload this page and try again' })
        }
        merged = applyDelta(key, stored, changesForAuth)
      } else {
        let base = null
        if (baseVersion !== null) {
          const [baseRows] = await conn.query('SELECT v FROM app_state_versions WHERE id = ? AND k = ?', [baseVersion, key])
          if (!baseRows.length) {
            await conn.rollback()
            return res.status(409).json({
              error: 'stale',
              reason: 'this page was loaded from a version that is no longer on record — reload and try again',
            })
          }
          base = JSON.parse(baseRows[0].v)
        } else if (storedVersion !== null) {
          // The client believed this document did not exist, and it does.
          await conn.rollback()
          return res.status(409).json({
            error: 'stale',
            reason: 'this document was created while you were editing — reload and try again',
          })
        }
        const incoming = req.body?.value ?? null
        // A document with no adapter yields no changes; the base-version check
        // above is what protects it, and the tab check below is its authorisation.
        changesForAuth = diffDocument(key, base, incoming)
        merged = mergeDocument(key, base, stored, incoming)
      }

      if (!superAdmin) {
        const authorised = authoriseChanges(changesForAuth, { heldTabs: held, contentScope: req.identity.contentScope, role: req.identity.role, rank: req.identity.rank })
        if (!authorised.ok) {
          await conn.rollback()
          return res.status(403).json({ error: 'refused', refusals: authorised.refusals })
        }
      }

      if (!merged.ok) {
        await conn.rollback()
        return res.status(409).json({
          error: 'conflict',
          conflicts: merged.conflicts,
          reason: 'somebody else changed the same items while you were editing',
        })
      }

      if (key === CONTENT_LEDGER_STATE_KEY || key === MEDIA_STATE_KEY || key === ACADEMIC_CATALOGUE_STATE_KEY) {
        const ledgerRow = guardedRows.find((row) => row.k === CONTENT_LEDGER_STATE_KEY)
        const mediaRow = guardedRows.find((row) => row.k === MEDIA_STATE_KEY)
        const catalogueRow = guardedRows.find((row) => row.k === ACADEMIC_CATALOGUE_STATE_KEY)
        const beforeLedger = ledgerRow ? JSON.parse(ledgerRow.v) : []
        const beforeMedia = mediaRow ? JSON.parse(mediaRow.v) : { records: [] }
        const beforeCatalogue = catalogueRow ? JSON.parse(catalogueRow.v) : []
        const ledger = key === CONTENT_LEDGER_STATE_KEY
          ? merged.value
          : beforeLedger
        const media = key === MEDIA_STATE_KEY
          ? merged.value
          : beforeMedia
        const catalogue = key === ACADEMIC_CATALOGUE_STATE_KEY
          ? merged.value
          : beforeCatalogue
        // "Supplied" is the server's word, not the client's: a request may only
        // become supplied with media that has finished verifying. Newly attached
        // (or newly supplied-claiming) requests are checked against the media
        // table; a ready managed upload is promoted to supplied here, and a request
        // pointing at media that is still verifying or has failed is refused. This
        // runs before the publish guard below so that guard can see the media just
        // supplied as acceptable, rather than blocking on the descriptive record's
        // separate, still-in-flight save.
        let suppliedReadyMediaIds = new Set()
        if (key === CONTENT_LEDGER_STATE_KEY) {
          const supply = await enforceMediaSupply(conn, ledger, beforeLedger)
          if (!supply.ok) {
            await conn.rollback()
            return res.status(409).json({
              error: 'media_not_ready',
              reason: 'a request can be supplied only with media that has finished verifying',
              requests: supply.notReady,
            })
          }
          suppliedReadyMediaIds = supply.readyMediaIds
        }
        const blockedItems = newlyMediaBlockedPublishedItems(
          beforeLedger,
          releasedMediaIdsFromDocument(beforeMedia),
          ledger,
          new Set([...releasedMediaIdsFromDocument(media), ...suppliedReadyMediaIds]),
        )
        if (blockedItems.length) {
          await conn.rollback()
          return res.status(409).json({
            error: 'media_required',
            reason: 'published content cannot be saved while required teaching media is unresolved or unreleased',
            blockedItems,
          })
        }
        const archiveScopeBlockedItems = key === ACADEMIC_CATALOGUE_STATE_KEY
          ? (() => {
              const beforeIds = new Set(archiveScopeBlockedPublishedItems(beforeLedger, beforeCatalogue).map((item) => item.id))
              return archiveScopeBlockedPublishedItems(ledger, catalogue).filter((item) => !beforeIds.has(item.id))
            })()
          : newlyArchiveScopeBlockedPublishedItems(beforeLedger, ledger, catalogue)
        if (archiveScopeBlockedItems.length) {
          await conn.rollback()
          return res.status(409).json({
            error: 'archive_scope_required',
            reason: 'archived content must be assigned to a valid university, year, and module before it can be published',
            blockedItems: archiveScopeBlockedItems,
          })
        }
        if (key === MEDIA_STATE_KEY) {
          const nextIds = new Set((Array.isArray(media?.records) ? media.records : []).map((record) => record.id))
          removedMediaRecords = (Array.isArray(beforeMedia?.records) ? beforeMedia.records : [])
            .filter((record) => !nextIds.has(record.id))
        }
      }

      const v = JSON.stringify(merged.value ?? null)
      let version = storedVersion
      if (storedRaw !== v) {
        const [inserted] = await conn.query(
          'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [key, v, req.identity.id],
        )
        version = inserted.insertId
        await conn.query(
          'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [key, v],
        )
      }
      await conn.commit()
      invalidateSnapshots(key)
      if (removedMediaRecords.length) {
        // The descriptive document is now authoritative. Reclaim each removed
        // managed alias only after that commit, so a failed state save can never
        // strand a live library record without its bytes.
        for (const record of removedMediaRecords) {
          try {
            const deleted = await deleteManagedMediaRow({ id: record.id })
            if (!deleted && record.storageKey) {
              await withManagedMediaDigestLock(record.sha256 || record.id, (mediaConn) => (
                removePhysicalMediaIfUnreferenced(record, mediaConn)
              ))
            }
          } catch (error) {
            // A remaining managed row is a durable cleanup marker. The stale
            // upload sweep retries it after the recovery window.
            console.error(`media cleanup failed for ${record.id}:`, error)
          }
        }
      }
      if (key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
      // A new version row was written iff the id advanced. Keep the history bounded
      // — after the response, so it never adds to save latency, and best-effort, so
      // a housekeeping hiccup is never a failed save.
      if (version !== storedVersion) {
        void pruneStateVersions(key).catch((error) => console.error(`version prune failed for ${key}:`, error?.message ?? error))
      }
      res.json({ ok: true, version })
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }))

  app.delete('/api/state/:key', requireSuperAdmin, wrap(async (req, res) => {
    // Deleting a whole document is not an edit: it has no per-item diff and so no
    // scope to judge it against. Super admin only.
    const key = canonicalStateKey(req.params.key)
    if ([CONTENT_LEDGER_STATE_KEY, MEDIA_STATE_KEY, ACADEMIC_CATALOGUE_STATE_KEY].includes(key)) {
      return res.status(409).json({
        error: 'protected_state',
        reason: 'the content ledger, media library, and academic catalogue must be changed through their guarded editors',
      })
    }
    // Reports are removed one at a time, with typed confirmation and a tombstone —
    // never wiped wholesale by a single call. See POST /api/content-reports/:id/delete.
    if (key === CONTENT_REPORTS_STATE_KEY) {
      return res.status(409).json({
        error: 'protected_state',
        reason: 'a content report is deleted one at a time through its own confirmed, audited action',
      })
    }
    await pool.query('DELETE FROM app_state WHERE k = ?', [key])
    invalidateSnapshots(key)
    if (key === ROLE_TABS_STATE_KEY) invalidateRoleTabs()
    res.json({ ok: true })
  }))
}
