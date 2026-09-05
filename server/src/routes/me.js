/**
 * The caller's own account: profile, enrolment, avatar, export and discoverability.
 */
import { ACADEMIC_STATE_KEYS, parseAcademicDocuments, studentUniversityProjection } from '../academic.js'
import { getDiscoverable, getUserByIdentity, recordAiConsent, saveOwnEnrolment, saveOwnProfile, setDiscoverable } from '../accounts.js'
import { createSupportMessage, mySupportMessages } from '../support.js'
import { heldTabs, requireAuthenticated } from '../auth.js'
import { clearAvatar, setAvatarFromUpload, setAvatarFromUrl } from '../avatar.js'
import { pool } from '../db.js'
import { createEnrollmentChangeRequest, myEnrollmentChangeRequests } from '../enrollmentChanges.js'
import { getUser as goTrueGetUser, hasVerifiedTotp } from '../goTrue.js'
import { wrap } from '../http.js'
import { managedMediaFile, sendManagedMedia } from '../mediaStore.js'

export function registerMeRoutes(app) {
  /**
   * The caller's own profile and entitlement.
   *
   * A student surface needs to know who it is showing and what they have paid
   * for. Both answers already exist for admins; this exposes exactly the caller's
   * own row and nothing else. A missing roster row is a 200 with nulls rather
   * than a 404: "your university has not set up your profile yet" is a state the
   * app should render, not an error it should treat as a broken request.
   */
  app.get('/api/me', requireAuthenticated, wrap(async (req, res) => {
    const user = await getUserByIdentity(req.identity.id)
    /**
     * Two facts that only Supabase holds: whether the address is confirmed, and
     * whether a second factor is enrolled. Asking costs a round trip, so it is
     * asked only when the answer can still change — during the first hour of a
     * session, while somebody is waiting on a confirmation email — or when the
     * caller says it needs the current answer (`?fresh=1`, which the verify-email
     * page polls with). Otherwise `emailVerified` is null, meaning "not asked".
     */
    const session = req.sessionRow ?? null
    const wantsFresh = req.query.fresh === '1'
    // Age is measured by the database (TIMESTAMPDIFF at read time), never by
    // comparing its NOW() against this process's clock: the two hosts need not
    // share a time zone, and when they do not the window silently never opens.
    const account = session && (wantsFresh || Number(session.ageSeconds) < 3_600)
      ? (await goTrueGetUser(session.accessToken)).data
      : null
    res.json({
      user: {
        id: req.identity.id,
        email: req.identity.email,
        role: req.identity.role,
        rank: req.identity.rank,
        tabs: await heldTabs(req.identity),
        contentScope: req.identity.contentScope,
        aal: req.identity.aal,
        mfaRequired: Boolean(req.identity.mfaRequired),
        emailVerified: account ? Boolean(account.email_confirmed_at || account.confirmed_at) : null,
        // Enrolled but not yet presented on this session. Without a fresh user
        // record the best available answer is the account's own flag.
        mfaPending: req.identity.aal !== 'aal2'
          && (account ? hasVerifiedTotp(account) : Boolean(req.identity.mfaRequired)),
        // Only ever known on the same fresh read as `account` above (OAuth
        // sign-ups' first hour, or `?fresh=1`) — null otherwise. Lets
        // CompleteProfile.tsx prefill from what Google/Facebook handed back,
        // rather than asking for a name and a photo the account already has.
        metadataName: account ? (account.user_metadata?.full_name ?? account.user_metadata?.name ?? null) : null,
        avatarUrl: account ? (account.user_metadata?.avatar_url ?? account.user_metadata?.picture ?? null) : null,
      },
      profile: user
        ? {
            studentId: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            nationality: user.nationality,
            // True once phone and enrolment are both on record. False for a
            // social sign-up until CompleteProfile.tsx runs — Google/Facebook
            // hand back a name and an email and nothing else.
            profileComplete: user.profileComplete,
            universityId: user.universityId,
            year: user.year,
            yearId: user.yearId,
            group: user.group,
            status: user.status,
            username: user.username,
            profileIcon: user.profileIcon,
            statusMessage: user.statusMessage,
            aiConsentAt: user.aiConsentAt,
            timezone: user.timezone,
            avatarMediaId: user.avatarMediaId,
            discoverable: user.discoverable,
            socialProvider: user.socialProvider,
          }
        : null,
      subscription: user?.subscription ?? null,
      entitlement: user?.entitlement ?? { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null },
    })
  }))

  /**
   * Where this account studies, set by the student.
   *
   * Onboarding writes here, and the account page writes here when a student
   * corrects their year. It is the only writer of that fact, and `/api/me` is the
   * only reader — so a second browser cannot hold a different answer. This
   * replaced a browser-local document that each device kept its own copy of,
   * which is how one account came to show two different enrolled years.
   */
  app.put('/api/me/enrolment', requireAuthenticated, wrap(async (req, res) => {
    const result = await saveOwnEnrolment(req.identity.id, req.body ?? {})
    if (result.error) {
      const status = result.error === 'no_identity' ? 404 : (result.error === 'enrollment_locked' || result.error === 'username_taken' ? 409 : 400)
      return res.status(status).json(result)
    }
    res.json({ ok: true, profile: result.profile, phoneConflict: result.phoneConflict })
  }))

  /**
   * The student's own editable profile: username, icon, status message and
   * timezone. None of these are ever locked the way university/year are —
   * unlike `/me/enrolment`, this never touches enrolment or the trial grant.
   */
  app.put('/api/me/profile', requireAuthenticated, wrap(async (req, res) => {
    const result = await saveOwnProfile(req.identity.id, req.body ?? {})
    if (result.error) {
      const status = result.error === 'no_identity' ? 404 : (result.error === 'username_taken' ? 409 : 400)
      return res.status(status).json(result)
    }
    res.json({ ok: true, profile: result.profile })
  }))

  /**
   * Profile photo: upload, import from a social sign-up's provider photo, or
   * clear back to the glyph. Business logic (validation, storage, SSRF guards
   * on the import) lives in avatar.js; these three routes are the thin HTTP
   * shell around it, same split as saveOwnEnrolment above.
   */
  app.post('/api/me/avatar', requireAuthenticated, wrap(async (req, res) => {
    const result = await setAvatarFromUpload(req.identity.id, req.body?.image)
    if (result.error) return res.status(result.error === 'no_identity' ? 404 : 400).json(result)
    res.json({ ok: true, avatarMediaId: result.avatarMediaId })
  }))

  app.post('/api/me/avatar/import', requireAuthenticated, wrap(async (req, res) => {
    const result = await setAvatarFromUrl(req.identity.id, req.body?.url)
    if (result.error) return res.status(result.error === 'no_identity' ? 404 : 400).json(result)
    res.json({ ok: true, avatarMediaId: result.avatarMediaId })
  }))

  app.delete('/api/me/avatar', requireAuthenticated, wrap(async (req, res) => {
    const result = await clearAvatar(req.identity.id)
    if (result.error) return res.status(404).json(result)
    res.json({ ok: true })
  }))

  /**
   * Serve a stored avatar. Authenticated but otherwise unrestricted — unlike
   * `/api/media/:id`, which gates on the teaching-content release rules in
   * `mayReadManagedMedia`, a profile photo is not curated content and any
   * signed-in user may see any other's (the same exposure a leaderboard row
   * already has via a display name).
   */
  app.get('/api/me/avatar/:id', requireAuthenticated, wrap(async (req, res) => {
    const record = await managedMediaFile(req.params.id)
    if (!record || record.mediaType !== 'image') return res.status(404).json({ error: 'avatar not found' })
    if (!sendManagedMedia(res, record)) return res.status(404).json({ error: 'avatar not found' })
  }))

  app.post('/api/me/enrollment-change-requests', requireAuthenticated, wrap(async (req, res) => {
    const result = await createEnrollmentChangeRequest(req.identity.id, req.body ?? {})
    if (result.error) {
      const status = result.error === 'pending_exists' || result.error === 'unchanged' ? 409 : 400
      return res.status(status).json(result)
    }
    res.json(result)
  }))

  app.get('/api/me/enrollment-change-requests', requireAuthenticated, wrap(async (req, res) => {
    res.json({ requests: await myEnrollmentChangeRequests(req.identity.id) })
  }))

  app.get('/api/me/university', requireAuthenticated, wrap(async (req, res) => {
    const [profileRows] = await pool.query(
      `SELECT id, university_id AS universityId, year, year_id AS yearId, study_group AS studyGroup
         FROM students WHERE user_id = ? LIMIT 1`,
      [req.identity.id],
    )
    const [stateRows] = await pool.query(
      `SELECT k, v FROM app_state WHERE k IN (${ACADEMIC_STATE_KEYS.map(() => '?').join(',')})`,
      ACADEMIC_STATE_KEYS,
    )
    const rawDocuments = Object.fromEntries(stateRows.map((row) => [row.k, row.v]))
    const projection = studentUniversityProjection(profileRows[0] ?? null, parseAcademicDocuments(rawDocuments))
    res.json(projection)
  }))

  /**
   * Everything this account has stored, as the account's own data.
   *
   * The Account page has always offered a download. It exported the settings blob
   * the page happened to hold, while promising notes, highlights and progress —
   * this returns what the promise says: every `user_state` document owned by the
   * caller.
   */
  app.get('/api/me/export', requireAuthenticated, wrap(async (req, res) => {
    const [rows] = await pool.query(
      'SELECT k, v, updated_at AS updatedAt FROM user_state WHERE user_id = ? ORDER BY k',
      [req.identity.id],
    )
    const documents = {}
    for (const row of rows) {
      try { documents[row.k] = { value: JSON.parse(row.v), updatedAt: row.updatedAt } }
      catch { documents[row.k] = { value: null, updatedAt: row.updatedAt } }
    }
    const profile = await getUserByIdentity(req.identity.id)
    // The uploads themselves are too large to inline, but an export that lists
    // annotations for a document it never mentions is not the whole record.
    const [uploads] = await pool.query(
      `SELECT id, title, media_type AS mediaType, size_bytes AS sizeBytes, sha256, created_at AS createdAt
       FROM user_documents WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at`,
      [req.identity.id],
    )
    res.json({
      exportedAt: new Date().toISOString(),
      account: { id: req.identity.id, email: req.identity.email },
      profile,
      documents,
      uploads: uploads.map((row) => ({ ...row, downloadPath: `/api/my-documents/${row.id}/file` })),
    })
  }))

  /**
   * Whether the caller shows up in their own year's directory.
   *
   * The column defaults to private. A student must deliberately opt in before
   * they can appear in, or browse, their cohort directory. The actor is always
   * the verified session;
   * the value being written is the only thing that comes from the body.
   */
  app.get('/api/account/discoverable', requireAuthenticated, wrap(async (req, res) => {
    res.json({ discoverable: await getDiscoverable(req.identity.id) })
  }))

  app.post('/api/account/discoverable', requireAuthenticated, wrap(async (req, res) => {
    const result = await setDiscoverable(req.identity.id, Boolean(req.body?.discoverable))
    if (result.error === 'not_found') return res.status(404).json({ error: 'no account to update' })
    res.json(result)
  }))

  // Contact-us: a student files a support message; admins read them at
  // /api/admin/support-messages (routes/admin.js).
  app.post('/api/me/support', requireAuthenticated, wrap(async (req, res) => {
    const result = await createSupportMessage(req.identity.id, req.body ?? {})
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  app.get('/api/me/support', requireAuthenticated, wrap(async (req, res) => {
    res.json({ messages: await mySupportMessages(req.identity.id) })
  }))

  // AI-usage disclaimer acceptance. Idempotent: COALESCE keeps the first time.
  app.post('/api/me/consent/ai', requireAuthenticated, wrap(async (req, res) => {
    const result = await recordAiConsent(req.identity.id)
    if (result.error) return res.status(404).json(result)
    res.json({ aiConsentAt: result.aiConsentAt })
  }))
}
