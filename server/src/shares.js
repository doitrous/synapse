/**
 * Notes and whiteboards published behind a link.
 *
 * The rules live here so they can be reasoned about in one place, because they
 * are the only thing standing between "a student shared a note with their
 * study group" and "a student's private notebook is on the open web".
 *
 * Three states, and the server decides all three:
 *
 *   private — only the owner may read it. A link that has been revoked back to
 *             private answers 404 to everybody else, so a link that has already
 *             been passed around stops working rather than staying live.
 *   view    — a signed-in student in the owner's university and year may read.
 *   edit    — a signed-in student in that cohort may also write to it.
 *             Editing is attributed (`updated_by`), which anonymous editing
 *             could not be.
 *
 * Nothing here reads or writes `user_state`. A share starts as a copy taken at
 * publication and then receives its own guarded revision history. The source
 * notebook or whiteboard remains private and independent.
 */
import { randomBytes, randomUUID } from 'node:crypto'
import { pool } from './db.js'
import {
  SHARE_ACCESS, SHARE_KINDS, mayChangeAccess, mayRead, mayWrite, readPayload, readTitle, readTopics,
  revisionVerdict, sameCohort, viewerRights,
} from './sharePolicy.js'

/** Big enough that guessing one is not a strategy. */
export function newShareId() {
  return randomBytes(18).toString('base64url')
}

function parseJson(value, fallback = null) {
  if (value == null) return fallback
  if (typeof value !== 'string') return value
  try { return JSON.parse(value) } catch { return fallback }
}

/** Extract only explicit managed-media fields, with a traversal bound. */
export function payloadDocumentIds(value) {
  const ids = new Set()
  const stack = [value]
  let visited = 0
  while (stack.length && visited < 10_000) {
    const current = stack.pop()
    visited++
    if (!current || typeof current !== 'object') continue
    for (const [key, inner] of Object.entries(current)) {
      if ((key === 'documentId' || key === 'imageDocumentId') && typeof inner === 'string' && inner.trim()) {
        ids.add(inner.trim())
      } else if (inner && typeof inner === 'object') {
        stack.push(inner)
      }
    }
  }
  return [...ids].slice(0, 500)
}

export function payloadReferencesDocument(value, documentId) {
  return payloadDocumentIds(value).includes(documentId)
}

export function assetsWithinAllowlist(documentIds, approvedIds) {
  const approved = approvedIds instanceof Set ? approvedIds : new Set(approvedIds)
  return documentIds.every((documentId) => approved.has(documentId))
}

function publicTopicLabel(topic) {
  return topic.subtopic || topic.topic || topic.subjectId || null
}

function cleanKind(kind) {
  return SHARE_KINDS.has(kind) ? kind : null
}

function rowRevision(row) {
  const revision = Number(row.revision ?? row.revision_number ?? 1)
  return Number.isInteger(revision) && revision > 0 ? revision : 1
}

async function profileFor(conn, userId, lock = false) {
  const [rows] = await conn.query(
    `SELECT user_id, COALESCE(name, email) AS name, username, profile_icon,
            university_id, year, discoverable
       FROM students WHERE user_id = ? LIMIT 1${lock ? ' FOR UPDATE' : ''}`,
    [userId],
  )
  return rows[0] ?? null
}

async function topicsFor(conn, shareIds) {
  if (!shareIds.length) return new Map()
  const [rows] = await conn.query(
    `SELECT share_id, subject_id, topic, subtopic, position
       FROM shared_document_topics
      WHERE share_id IN (?)
      ORDER BY share_id, position`,
    [shareIds],
  )
  const byShare = new Map()
  for (const row of rows) {
    const next = byShare.get(row.share_id) ?? []
    next.push({ subjectId: row.subject_id ?? null, topic: row.topic ?? null, subtopic: row.subtopic ?? null })
    byShare.set(row.share_id, next)
  }
  return byShare
}

async function collaboratorsFor(conn, shareIds) {
  if (!shareIds.length) return new Map()
  const [rows] = await conn.query(
    `SELECT r.share_id, r.actor_id, COALESCE(s.username, s.name, s.email, a.email, r.actor_id) AS name,
            MAX(r.created_at) AS last_seen
       FROM shared_document_revisions r
       LEFT JOIN students s ON s.user_id = r.actor_id
       LEFT JOIN user_access a ON a.user_id = r.actor_id
      WHERE r.share_id IN (?) AND r.actor_id IS NOT NULL
      GROUP BY r.share_id, r.actor_id, name
      ORDER BY r.share_id, last_seen DESC`,
    [shareIds],
  )
  const byShare = new Map()
  for (const row of rows) {
    const next = byShare.get(row.share_id) ?? []
    const label = String(row.name || 'Student').split('@')[0]
    if (!next.includes(label)) next.push(label)
    byShare.set(row.share_id, next.slice(0, 8))
  }
  return byShare
}

async function hydrateShares(conn, rows, viewerId) {
  const ids = rows.map((row) => row.id)
  const topicMap = await topicsFor(conn, ids)
  const collaboratorMap = await collaboratorsFor(conn, ids)
  return rows.map((row) => shape(row, viewerId, {
    topics: topicMap.get(row.id) ?? [],
    collaborators: collaboratorMap.get(row.id) ?? [],
  }))
}

async function replaceTopics(conn, shareId, topics) {
  await conn.query('DELETE FROM shared_document_topics WHERE share_id = ?', [shareId])
  if (!topics.length) return
  await conn.query(
    `INSERT INTO shared_document_topics (share_id, position, subject_id, topic, subtopic)
     VALUES ${topics.map(() => '(?, ?, ?, ?, ?)').join(', ')}`,
    topics.flatMap((topic, index) => [shareId, index, topic.subjectId, topic.topic, topic.subtopic]),
  )
}

async function recordRevision(conn, { shareId, revision, actorId, title, payload, topics }) {
  await conn.query(
    `INSERT INTO shared_document_revisions (id, share_id, revision, actor_id, title, payload, topics)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [randomUUID(), shareId, revision, actorId, title, payload, JSON.stringify(topics ?? [])],
  )
}

async function ownedAssetIds(conn, ownerId, documentIds) {
  if (!documentIds.length) return new Set()
  const [rows] = await conn.query(
    'SELECT id FROM user_documents WHERE user_id = ? AND id IN (?) AND deleted_at IS NULL',
    [ownerId, documentIds],
  )
  return new Set(rows.map((row) => String(row.id)))
}

async function recordRevisionAssets(conn, shareId, revision, documentIds) {
  if (!documentIds.length) return
  await conn.query(
    `INSERT IGNORE INTO shared_document_revision_assets (share_id, revision, document_id)
     VALUES ${documentIds.map(() => '(?, ?, ?)').join(', ')}`,
    documentIds.flatMap((documentId) => [shareId, revision, documentId]),
  )
}

async function approvedAssetsForRevision(conn, row) {
  const revision = rowRevision(row)
  const [stored] = await conn.query(
    'SELECT document_id AS documentId FROM shared_document_revision_assets WHERE share_id = ? AND revision = ?',
    [row.id, revision],
  )
  if (stored.length) return new Set(stored.map((entry) => String(entry.documentId)))

  // Backward-compatible lazy migration for an owner-authored legacy revision.
  // Collaborator-authored JSON is never trusted to bootstrap file permission.
  if (row.updated_by && row.updated_by !== row.owner_id) return new Set()
  const requested = payloadDocumentIds(parseJson(row.payload, null))
  const owned = await ownedAssetIds(conn, row.owner_id, requested)
  if (owned.size !== requested.length) return new Set()
  await conn.query(
    `INSERT IGNORE INTO shared_document_revisions
       (id, share_id, revision, actor_id, title, payload, topics)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [randomUUID(), row.id, revision, row.owner_id, row.title, row.payload, JSON.stringify([])],
  )
  await recordRevisionAssets(conn, row.id, revision, requested)
  return owned
}

async function notifyFollowers(conn, { shareId, revision, actorId, title }) {
  await conn.query(
    `INSERT INTO shared_document_events (id, share_id, revision, kind, actor_id, payload)
     VALUES (?, ?, ?, 'revision', ?, ?)`,
    [randomUUID(), shareId, revision, actorId, JSON.stringify({ title })],
  )
  const [followers] = await conn.query(
    'SELECT user_id FROM shared_document_follows WHERE share_id = ? AND user_id <> ?',
    [shareId, actorId],
  )
  for (const follower of followers) {
    await conn.query(
      `INSERT INTO shared_document_notifications
         (id, user_id, share_id, revision, actor_id, kind, message)
       VALUES (?, ?, ?, ?, ?, 'shared_document_revision', ?)`,
      [
        randomUUID(),
        follower.user_id,
        shareId,
        revision,
        actorId,
        `${readTitle(title)} has a new revision.`,
      ],
    )
  }
}

function shape(row, viewerId, extras = {}) {
  let payload = null
  try { payload = JSON.parse(row.payload) } catch { payload = null }
  const topics = extras.topics ?? parseJson(row.topics, [])
  const collaborators = extras.collaborators ?? parseJson(row.collaborators, [])
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    access: row.access,
    permission: row.access,
    payload,
    revision: rowRevision(row),
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    ownerName: row.owner_name ? String(row.owner_name).split('@')[0] : undefined,
    ownerUsername: row.owner_username ?? undefined,
    ownerIcon: row.owner_icon ?? undefined,
    subjectId: topics[0]?.subjectId ?? undefined,
    topics: topics.map(publicTopicLabel).filter(Boolean),
    topicMappings: topics,
    starCount: Number(row.star_count ?? 0),
    starred: Boolean(Number(row.starred ?? 0)),
    following: Boolean(Number(row.following ?? 0)),
    collaborators,
    // Says what this viewer may actually do, so a client never has to work the
    // permission out for itself and never has to be believed about it.
    ...viewerRights(row, viewerId),
  }
}

function shareSelect() {
  return `
    SELECT d.*,
           COALESCE(s.username, s.name, s.email) AS owner_name,
           s.username AS owner_username,
           s.profile_icon AS owner_icon,
           (SELECT COUNT(*) FROM shared_document_stars ss WHERE ss.share_id = d.id) AS star_count,
           EXISTS(SELECT 1 FROM shared_document_stars ss WHERE ss.share_id = d.id AND ss.user_id = ?) AS starred,
           EXISTS(SELECT 1 FROM shared_document_follows sf WHERE sf.share_id = d.id AND sf.user_id = ?) AS following
      FROM shared_documents d
      LEFT JOIN students s ON s.user_id = d.owner_id`
}

export async function createShare(ownerId, input = {}) {
  const { kind, title, access, payload } = input
  if (!SHARE_KINDS.has(kind)) return { error: 'unknown_kind' }
  const wanted = SHARE_ACCESS.has(access) ? access : 'view'
  const body = readPayload(payload)
  if (body.error) return { error: body.error }

  const id = newShareId()
  const topics = readTopics({
    ...(payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : {}),
    ...input,
  })
  const cleanTitle = readTitle(title)
  const requestedAssetIds = payloadDocumentIds(payload)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const profile = await profileFor(conn, ownerId, true)
    if (!profile?.university_id || !profile?.year) {
      await conn.rollback()
      return { error: 'profile_incomplete' }
    }
    const ownedAssets = await ownedAssetIds(conn, ownerId, requestedAssetIds)
    if (ownedAssets.size !== requestedAssetIds.length) {
      await conn.rollback()
      return { error: 'asset_not_owned' }
    }
    await conn.query(
      `INSERT INTO shared_documents
         (id, owner_id, kind, title, access, payload, revision, university_id, year, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      [id, ownerId, kind, cleanTitle, wanted, body.serialised, profile.university_id, profile.year, ownerId],
    )
    await replaceTopics(conn, id, topics)
    await recordRevision(conn, {
      shareId: id,
      revision: 1,
      actorId: ownerId,
      title: cleanTitle,
      payload: body.serialised,
      topics,
    })
    await recordRevisionAssets(conn, id, 1, requestedAssetIds)
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  return { ok: true, id, access: wanted, revision: 1 }
}

/**
 * Read a share, if this viewer is allowed to.
 *
 * `not_found` rather than `forbidden` for a private share held by somebody
 * else: whether a given token exists is itself worth not disclosing.
 */
export async function readShare(id, viewerId) {
  const [rows] = await pool.query(`${shareSelect(viewerId)} WHERE d.id = ? LIMIT 1`, [viewerId, viewerId, String(id ?? '')])
  if (!rows.length) return { error: 'not_found' }
  const row = rows[0]
  if (row.owner_id !== viewerId) {
    if (!viewerId) return { error: 'not_found' }
    const viewer = await profileFor(pool, viewerId)
    if (!sameCohort(row, viewer)) return { error: 'not_found' }
  }
  if (!mayRead(row, viewerId)) return { error: 'not_found' }
  const [share] = await hydrateShares(pool, [row], viewerId)
  return { ok: true, share }
}

/**
 * Change a share.
 *
 * The owner may change anything, including the access level. Somebody holding
 * an editable link may change the title and the contents, and deliberately not
 * the access: handing out a link should never hand out the ability to widen it.
 */
export async function updateShare(id, viewerId, patch) {
  if (!viewerId) return { error: 'unauthorized' }
  const { title, access, payload } = patch ?? {}
  const payloadTopics = payload !== undefined ? readTopics(payload) : []
  const hasTopicPatch = Object.prototype.hasOwnProperty.call(patch ?? {}, 'topics')
    || Object.prototype.hasOwnProperty.call(patch ?? {}, 'subjectId')
    || Object.prototype.hasOwnProperty.call(patch ?? {}, 'topic')
    || Object.prototype.hasOwnProperty.call(patch ?? {}, 'subtopic')
    || payloadTopics.length > 0
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query('SELECT * FROM shared_documents WHERE id = ? LIMIT 1 FOR UPDATE', [String(id ?? '')])
    if (!rows.length) {
      await conn.rollback()
      return { error: 'not_found' }
    }
    const row = rows[0]
    if (row.owner_id !== viewerId) {
      const viewer = await profileFor(conn, viewerId)
      if (!sameCohort(row, viewer)) {
        await conn.rollback()
        return { error: 'not_found' }
      }
    }
    if (!mayWrite(row, viewerId)) {
      await conn.rollback()
      return { error: 'not_found' }
    }

    const sets = []
    const params = []
    const nextTitle = title !== undefined ? readTitle(title) : row.title
    let nextPayload = row.payload
    let nextAssetIds = payloadDocumentIds(parseJson(row.payload, null))
    if (title !== undefined) { sets.push('title = ?'); params.push(nextTitle) }
    if (payload !== undefined) {
      const body = readPayload(payload)
      if (body.error) {
        await conn.rollback()
        return { error: body.error }
      }
      nextPayload = body.serialised
      nextAssetIds = payloadDocumentIds(payload)
      sets.push('payload = ?')
      params.push(body.serialised)
    }
    if (access !== undefined) {
      if (!mayChangeAccess(row, viewerId)) {
        await conn.rollback()
        return { error: 'only_the_owner_may_change_access' }
      }
      if (!SHARE_ACCESS.has(access)) {
        await conn.rollback()
        return { error: 'unknown_access' }
      }
      sets.push('access = ?')
      params.push(access)
    }

    const contentChanged = title !== undefined || payload !== undefined || hasTopicPatch
    const nextTopics = hasTopicPatch ? (payloadTopics.length ? payloadTopics : readTopics(patch)) : null
    let nextRevision = rowRevision(row)
    if (contentChanged) {
      const verdict = revisionVerdict(row, patch)
      if (!verdict.ok) {
        await conn.rollback()
        return { error: verdict.reason, status: verdict.reason === 'stale_revision' ? 409 : 400, currentRevision: verdict.currentRevision }
      }
      nextRevision = verdict.nextRevision
      if (row.owner_id === viewerId) {
        const ownedAssets = await ownedAssetIds(conn, row.owner_id, nextAssetIds)
        if (ownedAssets.size !== nextAssetIds.length) {
          await conn.rollback()
          return { error: 'asset_not_owned' }
        }
      } else {
        const approvedAssets = await approvedAssetsForRevision(conn, row)
        if (!assetsWithinAllowlist(nextAssetIds, approvedAssets)) {
          await conn.rollback()
          return { error: 'asset_not_shared' }
        }
      }
      sets.push('revision = ?')
      params.push(nextRevision)
    }

    if (!sets.length) {
      await conn.rollback()
      return { error: 'nothing_to_change' }
    }

    sets.push('updated_by = ?')
    params.push(viewerId, row.id)
    await conn.query(`UPDATE shared_documents SET ${sets.join(', ')} WHERE id = ?`, params)
    if (hasTopicPatch) await replaceTopics(conn, row.id, nextTopics)
    if (contentChanged) {
      const topics = hasTopicPatch ? nextTopics : (await topicsFor(conn, [row.id])).get(row.id) ?? []
      await recordRevision(conn, {
        shareId: row.id,
        revision: nextRevision,
        actorId: viewerId,
        title: nextTitle,
        payload: nextPayload,
        topics,
      })
      await recordRevisionAssets(conn, row.id, nextRevision, nextAssetIds)
      await notifyFollowers(conn, { shareId: row.id, revision: nextRevision, actorId: viewerId, title: nextTitle })
    }
    await conn.commit()
    return await readShare(row.id, viewerId)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function deleteShare(id, viewerId) {
  const [result] = await pool.query('DELETE FROM shared_documents WHERE id = ? AND owner_id = ?', [String(id ?? ''), viewerId])
  return result.affectedRows ? { ok: true } : { error: 'not_found' }
}

/** Everything this account has published, newest first. Payloads left out. */
export async function listShares(ownerId, options = {}) {
  const kind = cleanKind(options.kind)
  const where = ['d.owner_id = ?']
  const params = [ownerId]
  if (kind) { where.push('d.kind = ?'); params.push(kind) }
  const [rows] = await pool.query(
    `${shareSelect(ownerId)}
      WHERE ${where.join(' AND ')}
      ORDER BY d.updated_at DESC LIMIT 200`,
    [ownerId, ownerId, ...params],
  )
  return (await hydrateShares(pool, rows, ownerId)).map(({ payload: _payload, ...summary }) => summary)
}

async function shareVisibleToCohort(conn, shareId, viewerId) {
  const [rows] = await conn.query(
    `SELECT d.*,
            viewer.university_id AS viewer_university_id, viewer.year AS viewer_year
       FROM shared_documents d
       JOIN students viewer ON viewer.user_id = ?
      WHERE d.id = ? LIMIT 1`,
    [viewerId, shareId],
  )
  if (!rows.length) return null
  const row = rows[0]
  const viewer = { university_id: row.viewer_university_id, year: row.viewer_year }
  if (row.owner_id === viewerId) return row
  if (row.access === 'private') return null
  if (!sameCohort(row, viewer)) return null
  return row
}

/**
 * Cohort discovery for the Notebook/Whiteboard Shared tabs.
 *
 * Direct links keep their link semantics (`readShare`); this listing is stricter:
 * only non-private documents in the same university and year are discoverable.
 * Sharing a document is its own explicit opt-in and is independent from the
 * profile directory's “Let classmates find me” setting.
 */
export async function listDiscoverableShares(viewerId, options = {}) {
  const kind = cleanKind(options.kind)
  const limit = Math.min(Math.max(Number(options.limit) || 200, 1), 200)
  const profile = await profileFor(pool, viewerId)
  if (!profile?.university_id || !profile?.year) return []
  const where = [
    'd.owner_id <> ?',
    "d.access <> 'private'",
    'd.university_id = ?',
    'd.year = ?',
  ]
  const params = [viewerId, profile.university_id, profile.year]
  if (kind) { where.push('d.kind = ?'); params.push(kind) }
  const [rows] = await pool.query(
    `${shareSelect(viewerId)}
      WHERE ${where.join(' AND ')}
      ORDER BY star_count DESC, d.updated_at DESC
      LIMIT ?`,
    [viewerId, viewerId, ...params, limit],
  )
  return (await hydrateShares(pool, rows, viewerId)).map(({ payload: _payload, ...summary }) => summary)
}

export async function setShareStar(shareId, viewerId, starred) {
  if (!viewerId) return { error: 'unauthorized' }
  const conn = await pool.getConnection()
  try {
    const row = await shareVisibleToCohort(conn, String(shareId ?? ''), viewerId)
    if (!row) return { error: 'not_found' }
    if (starred) {
      await conn.query(
        `INSERT INTO shared_document_stars (share_id, user_id)
         VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = created_at`,
        [row.id, viewerId],
      )
    } else {
      await conn.query('DELETE FROM shared_document_stars WHERE share_id = ? AND user_id = ?', [row.id, viewerId])
    }
    const result = await readShare(row.id, viewerId)
    if (result.error) return result
    const { payload: _payload, ...summary } = result.share
    return { ok: true, share: { ...summary, starred: Boolean(starred) } }
  } finally {
    conn.release()
  }
}

export async function setShareFollow(shareId, viewerId, following) {
  if (!viewerId) return { error: 'unauthorized' }
  const conn = await pool.getConnection()
  try {
    const row = await shareVisibleToCohort(conn, String(shareId ?? ''), viewerId)
    if (!row) return { error: 'not_found' }
    if (row.owner_id === viewerId) return { error: 'cannot_follow_own_share' }
    if (following) {
      await conn.query(
        `INSERT INTO shared_document_follows (share_id, user_id)
         VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = created_at`,
        [row.id, viewerId],
      )
    } else {
      await conn.query('DELETE FROM shared_document_follows WHERE share_id = ? AND user_id = ?', [row.id, viewerId])
    }
    const result = await readShare(row.id, viewerId)
    if (result.error) return result
    const { payload: _payload, ...summary } = result.share
    return { ok: true, share: { ...summary, following: Boolean(following) } }
  } finally {
    conn.release()
  }
}

export async function shareRevisionHistory(shareId, viewerId) {
  const read = await readShare(shareId, viewerId)
  if (read.error) return read
  const [rows] = await pool.query(
    `SELECT r.revision, r.actor_id AS actorId,
            COALESCE(s.username, s.name, s.email, a.email, r.actor_id) AS actorName,
            r.title, r.topics, r.created_at AS createdAt
       FROM shared_document_revisions r
       LEFT JOIN students s ON s.user_id = r.actor_id
       LEFT JOIN user_access a ON a.user_id = r.actor_id
      WHERE r.share_id = ?
      ORDER BY r.revision DESC LIMIT 50`,
    [shareId],
  )
  return {
    ok: true,
    revisions: rows.map((row) => ({
      revision: Number(row.revision),
      actorId: row.actorId,
      actorName: row.actorName ? String(row.actorName).split('@')[0] : 'Student',
      title: row.title,
      topics: parseJson(row.topics, []),
      createdAt: row.createdAt,
    })),
  }
}

/** Internal bell notifications created by followed live documents. */
export async function listShareNotifications(viewerId, { limit = 50 } = {}) {
  const boundedLimit = Math.min(Math.max(Number(limit) || 50, 1), 100)
  const [rows] = await pool.query(
    `SELECT n.id, n.share_id AS shareId, n.message, n.read_at AS readAt,
            n.created_at AS createdAt, d.kind, d.title
       FROM shared_document_notifications n
       JOIN shared_documents d ON d.id = n.share_id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC LIMIT ?`,
    [viewerId, boundedLimit],
  )
  return rows.map((row) => ({
    id: row.id,
    title: row.kind === 'whiteboard' ? 'Shared whiteboard updated' : 'Shared note updated',
    message: row.message,
    to: `/s/${row.shareId}`,
    active: true,
    delivery: 'Immediate',
    scheduledAt: row.createdAt,
    automation: 'None',
    leadMinutes: 0,
    universityIds: [],
    years: [],
    groups: [],
    createdAt: row.createdAt,
    sentAt: row.createdAt,
    readAt: row.readAt,
  }))
}

export async function markShareNotificationsRead(viewerId, rawIds) {
  const ids = [...new Set((Array.isArray(rawIds) ? rawIds : []).map(String).filter(Boolean))].slice(0, 100)
  if (!ids.length) return { ok: true, changed: 0 }
  const [result] = await pool.query(
    'UPDATE shared_document_notifications SET read_at = COALESCE(read_at, NOW()) WHERE user_id = ? AND id IN (?)',
    [viewerId, ids],
  )
  return { ok: true, changed: Number(result.affectedRows ?? 0) }
}

/** Resolve one managed asset referenced by a readable shared document. */
export async function readShareAsset(shareId, documentId, viewerId) {
  if (!viewerId) return { error: 'not_found' }
  const [shares] = await pool.query(
    `SELECT d.* FROM shared_documents d
       LEFT JOIN students viewer ON viewer.user_id = ?
      WHERE d.id = ? AND (
        d.owner_id = ? OR (
          d.access IN ('view', 'edit')
          AND d.university_id = viewer.university_id
          AND d.year = viewer.year
        )
      ) LIMIT 1`,
    [viewerId, shareId, viewerId],
  )
  if (!shares.length) return { error: 'not_found' }
  await approvedAssetsForRevision(pool, shares[0])
  const [rows] = await pool.query(
    `SELECT f.id, f.title, f.storage_key AS storageKey, f.media_type AS mediaType,
            f.file_name AS fileName, f.mime_type AS mimeType
       FROM shared_documents d
       JOIN shared_document_revision_assets a
         ON a.share_id = d.id AND a.revision = d.revision
       JOIN user_documents f
         ON f.id = a.document_id AND f.user_id = d.owner_id AND f.deleted_at IS NULL
       LEFT JOIN students viewer ON viewer.user_id = ?
      WHERE d.id = ? AND a.document_id = ? AND (
        d.owner_id = ? OR (
          d.access IN ('view', 'edit')
          AND d.university_id = viewer.university_id
          AND d.year = viewer.year
        )
      ) LIMIT 1`,
    [viewerId, shareId, String(documentId ?? ''), viewerId],
  )
  return rows.length ? { ok: true, document: rows[0] } : { error: 'not_found' }
}
