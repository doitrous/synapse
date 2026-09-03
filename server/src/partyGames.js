import { randomUUID } from 'node:crypto'
import { EventEmitter } from 'node:events'
import { pool } from './db.js'
import { MEDIA_STATE_KEY } from './mediaLibrary.js'
import { redactLedgerForStudent, releasedMediaIdsFromDocument } from './studentLedger.js'
import { chunk } from './batchInsert.js'

const GLOSSARY_KEY = 'nishany-medical-glossary-v1'
const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const MINIGAME_PACKS_KEY = 'nishany-minigame-packs-v1'

const GAME_KINDS = new Set([
  'term-grid',
  'spotter',
  'term-match',
  'clinical-sequence',
  'mechanism-chain',
  'red-flag-sort',
])

const streamBus = new EventEmitter()
streamBus.setMaxListeners(500)

/**
 * Server-side authored packs. The browser may choose one by id, but never sends
 * the answer key; the key is derived here from reviewed authored content.
 */
const AUTHORED_PACKS = [
  {
    id: 'cs-basic-life-support-primary-survey',
    kind: 'clinical-sequence',
    title: 'Basic life support primary survey',
    subjectId: 'fnd',
    topic: 'Emergencies & red flags',
    prompt: 'Place the actions in the order a responder should take before ongoing reassessment.',
    source: { label: 'Synapse authored emergency-skills seed pack', reviewedBy: 'Content operations' },
    steps: [
      { id: 'danger', text: 'Check the scene for danger before approaching.' },
      { id: 'response', text: 'Check responsiveness and call for help.' },
      { id: 'airway', text: 'Open the airway.' },
      { id: 'breathing', text: 'Check breathing.' },
      { id: 'compressions', text: 'Start chest compressions if breathing is absent or abnormal.' },
      { id: 'aed', text: 'Attach an AED as soon as it is available and follow prompts.' },
    ],
  },
  {
    id: 'mc-heart-failure-compensation',
    kind: 'mechanism-chain',
    title: 'Heart failure compensation loop',
    subjectId: 'cvs',
    topic: 'Heart failure',
    prompt: 'Arrange the mechanism from the initiating haemodynamic problem to the maladaptive outcome.',
    source: { label: 'Synapse authored CVS seed pack', reviewedBy: 'Content operations' },
    steps: [
      { id: 'low-output', text: 'Reduced effective cardiac output is sensed.' },
      { id: 'sympathetic', text: 'Sympathetic and renin–angiotensin activation increase.' },
      { id: 'retention', text: 'Salt and water retention raises filling pressures.' },
      { id: 'wall-stress', text: 'Higher wall stress increases myocardial workload.' },
      { id: 'remodelling', text: 'Progressive remodelling worsens pump function.' },
    ],
  },
  {
    id: 'rf-respiratory-escalation',
    kind: 'red-flag-sort',
    title: 'Respiratory escalation signals',
    subjectId: 'res',
    topic: 'Respiratory safety',
    prompt: 'Classify each authored finding by the action it should trigger in this learning scenario.',
    source: { label: 'Synapse authored respiratory seed pack', reviewedBy: 'Content operations' },
    lanes: { urgent: 'Urgent escalation', routine: 'Routine review' },
    findings: [
      { id: 'silent-chest', text: 'Silent chest with marked breathlessness', lane: 'urgent' },
      { id: 'cyanosis', text: 'Cyanosis or exhaustion', lane: 'urgent' },
      { id: 'mild-cough', text: 'Mild cough with normal activity and no distress', lane: 'routine' },
      { id: 'inhaler-technique', text: 'Poor inhaler technique without acute distress', lane: 'routine' },
      { id: 'saba-overuse', text: 'Frequent SABA use without inhaled corticosteroid cover', lane: 'urgent' },
      { id: 'stable-wheeze', text: 'Occasional wheeze responding to the usual reliever plan', lane: 'routine' },
    ],
  },
]

function parseJson(raw, fallback) {
  if (raw == null) return fallback
  if (typeof raw !== 'string') return raw
  try { return JSON.parse(raw) } catch { return fallback }
}

function nowIso() {
  return new Date().toISOString()
}

function seededRandom(seed) {
  let state = Number(seed) || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return ((state >>> 0) % 1_000_000) / 1_000_000
  }
}

function shuffle(items, seed) {
  const random = seededRandom(seed)
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function normalizeTermGridAnswer(input) {
  return String(input ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

function textEquals(a, b) {
  return String(a ?? '').trim().toLocaleLowerCase() === String(b ?? '').trim().toLocaleLowerCase()
}

function requireCondition(condition, reason) {
  if (!condition) return { ok: false, reason }
  return null
}

function publicRound(round) {
  if (!round) return null
  const { answerKey: _answerKey, ...safe } = round
  return safe
}

function contentSource(kind, id, label) {
  return { kind, id, label }
}

function glossaryTerms(docs) {
  const terms = Array.isArray(docs?.glossary?.terms) ? docs.glossary.terms : []
  return terms.filter((term) => term?.id && term?.term && term?.def)
}

function termGridContent(request, docs) {
  const terms = glossaryTerms(docs)
  if (terms.length < 4) return { ok: false, reason: 'no_content' }
  const seed = Number(request.seed) || 1
  const count = Math.min(Math.max(Number(request.rounds) || 8, 4), 12)
  const chosen = shuffle(terms, seed).slice(0, count)
  return {
    ok: true,
    content: {
      kind: 'term-grid',
      title: request.title || 'Term Grid party',
      source: contentSource('published', GLOSSARY_KEY, 'Published medical glossary'),
      authoredOnly: true,
      rounds: chosen.map((term, index) => ({
        id: `term-grid:${term.id}`,
        index,
        prompt: term.def,
        choices: [],
        answerKey: term.term,
        maxPoints: 1,
        scoring: 'normalized_text',
        payload: { termId: term.id, category: term.category ?? null },
      })),
    },
  }
}

function termMatchContent(request, docs) {
  const mode = request.mode === 'arabic' ? 'arabic' : 'definition'
  const terms = glossaryTerms(docs).filter((term) => String(mode === 'arabic' ? term.ar : term.def).trim())
  if (terms.length < 6) return { ok: false, reason: 'no_content' }
  const seed = Number(request.seed) || 1
  const pairs = Math.min(Math.max(Number(request.pairs) || 8, 6), 12)
  const chosen = shuffle(terms, seed).slice(0, pairs)
  const partners = shuffle(chosen, seed ^ 0x9e3779b1)
  return {
    ok: true,
    content: {
      kind: 'term-match',
      title: request.title || 'Term Match party',
      source: contentSource('published', GLOSSARY_KEY, 'Published medical glossary'),
      authoredOnly: true,
      rounds: chosen.map((term, index) => ({
        id: `term-match:${term.id}`,
        index,
        prompt: term.term,
        choices: partners.map((partner) => ({
          id: partner.id,
          label: mode === 'arabic' ? partner.ar : partner.def,
          ...(mode === 'arabic' ? { lang: 'ar', dir: 'rtl' } : {}),
        })),
        answerKey: term.id,
        maxPoints: 1,
        scoring: 'choice',
        payload: { termId: term.id, mode },
      })),
    },
  }
}

function publishedSlides(docs) {
  const ledger = redactLedgerForStudent(
    Array.isArray(docs?.ledger) ? docs.ledger : [],
    releasedMediaIdsFromDocument(docs?.media),
  )
  return ledger
    .filter((item) => item?.kind === 'histology' && item?.histologyData)
    .map((item) => ({
      id: item.id,
      title: item.title,
      subjectId: item.subjectId,
      views: item.histologyData.views ?? [],
      structures: item.histologyData.structures ?? [],
    }))
    .filter((slide) => slide.views.length && slide.structures.length)
}

function spotterContent(request, docs) {
  const labels = new Set()
  const candidates = []
  for (const slide of publishedSlides(docs)) {
    for (const structure of slide.structures) {
      labels.add(structure.label)
      for (const [objective, at] of Object.entries(structure.at ?? {})) {
        if (at) candidates.push({ slide, structure, objective: Number(objective), at })
      }
    }
  }
  if (candidates.length < 2 || labels.size < 4) return { ok: false, reason: 'no_content' }
  const seed = Number(request.seed) || 1
  const rounds = shuffle(candidates, seed).slice(0, Math.min(Number(request.rounds) || 8, candidates.length))
  const labelList = [...labels]
  return {
    ok: true,
    content: {
      kind: 'spotter',
      title: request.title || 'Spotter party',
      source: contentSource('published', LEDGER_KEY, 'Published histology slides'),
      authoredOnly: true,
      rounds: rounds.map((candidate, index) => {
        const distractors = shuffle(labelList.filter((label) => label !== candidate.structure.label), seed + index + 1).slice(0, 3)
        return {
          id: `spotter:${candidate.slide.id}:${candidate.structure.id}:${candidate.objective}`,
          index,
          prompt: `Identify the pinned structure on ${candidate.slide.title}.`,
          choices: shuffle([candidate.structure.label, ...distractors], seed + index + 20).map((label) => ({ id: label, label })),
          answerKey: candidate.structure.label,
          maxPoints: 1,
          scoring: 'choice',
          payload: {
            slideId: candidate.slide.id,
            slideTitle: candidate.slide.title,
            objective: candidate.objective,
            structureId: candidate.structure.id,
            at: candidate.at,
          },
        }
      }),
    },
  }
}

function normalizePackKind(kind) {
  return String(kind ?? '').replaceAll('_', '-')
}

function validImportedPack(pack, expectedKind) {
  if (!pack || normalizePackKind(pack.kind) !== expectedKind) return false
  if (!String(pack.id ?? '').trim() || !String(pack.title ?? '').trim() || !String(pack.prompt ?? '').trim()) return false
  if (expectedKind === 'red-flag-sort') {
    const findings = Array.isArray(pack.findings) ? pack.findings : []
    const lanes = pack.lanes ?? {}
    return findings.length >= 4
      && typeof lanes.urgent === 'string'
      && typeof lanes.routine === 'string'
      && findings.every((finding) => (
        finding?.id && finding?.text && (finding.lane === 'urgent' || finding.lane === 'routine')
      ))
  }
  const steps = Array.isArray(pack.steps) ? pack.steps : []
  return steps.length >= 3 && new Set(steps.map((step) => step.id)).size === steps.length
    && steps.every((step) => step?.id && step?.text)
}

function importedPacks(docs) {
  const packDocument = docs?.minigamePacks
  const fromPackDoc = packDocument?.status === 'Published'
    && packDocument?.validationStatus === 'validated'
    && Array.isArray(packDocument.packs)
    ? packDocument.packs
    : []
  const fromLedger = (Array.isArray(docs?.ledger) ? docs.ledger : [])
    .filter((item) => item?.status === 'Published' && (item?.kind === 'minigame' || item?.kind === 'game'))
    .map((item) => item.minigameData ?? item.gameData ?? item.pack ?? null)
    .filter(Boolean)
  return [...fromPackDoc, ...fromLedger]
}

function packContent(pack, sourceKind = 'authored') {
  const source = contentSource(sourceKind, pack.id, pack.source?.label ?? pack.sourceLabel ?? 'Validated minigame pack')
  if (normalizePackKind(pack.kind) === 'red-flag-sort') {
    return {
      kind: 'red-flag-sort',
      title: pack.title,
      source,
      authoredOnly: true,
      rounds: pack.findings.map((finding, index) => ({
        id: `red-flag-sort:${pack.id}:${finding.id}`,
        index,
        prompt: finding.text,
        choices: [
          { id: 'urgent', label: pack.lanes.urgent },
          { id: 'routine', label: pack.lanes.routine },
        ],
        answerKey: finding.lane,
        maxPoints: 1,
        scoring: 'choice',
        payload: { packId: pack.id, findingId: finding.id, subjectId: pack.subjectId, topic: pack.topic },
      })),
    }
  }
  const kind = normalizePackKind(pack.kind)
  return {
    kind,
    title: pack.title,
    source,
    authoredOnly: true,
    rounds: [{
      id: `${kind}:${pack.id}`,
      index: 0,
      prompt: pack.prompt,
      choices: pack.steps.map((step) => ({ id: step.id, label: step.text })),
      answerKey: pack.steps.map((step) => step.id),
      maxPoints: pack.steps.length,
      scoring: 'ordered_exact_positions',
      payload: { packId: pack.id, subjectId: pack.subjectId, topic: pack.topic },
    }],
  }
}

function authoredPackContent(request, expectedKind, docs = {}) {
  const imported = importedPacks(docs).find((candidate) => (
    validImportedPack(candidate, expectedKind) && (!request.packId || candidate.id === request.packId)
  ))
  if (imported) return { ok: true, content: packContent(imported, 'published') }

  const pack = AUTHORED_PACKS.find((candidate) => candidate.id === request.packId && candidate.kind === expectedKind)
    ?? AUTHORED_PACKS.find((candidate) => candidate.kind === expectedKind)
  if (!pack) return { ok: false, reason: 'no_content' }
  return { ok: true, content: packContent(pack, 'authored') }
}

export function contentFromTrustedSource(request, docs = {}) {
  if (!GAME_KINDS.has(request?.kind)) return { ok: false, reason: 'invalid_kind' }
  if (
    'content' in request
    || 'answerKey' in request
    || (request.rounds !== undefined && typeof request.rounds !== 'number')
  ) return { ok: false, reason: 'client_content_refused' }
  if (request.kind === 'term-grid') return termGridContent(request, docs)
  if (request.kind === 'term-match') return termMatchContent(request, docs)
  if (request.kind === 'spotter') return spotterContent(request, docs)
  if (request.kind === 'clinical-sequence') return authoredPackContent(request, 'clinical-sequence', docs)
  if (request.kind === 'mechanism-chain') return authoredPackContent(request, 'mechanism-chain', docs)
  return authoredPackContent(request, 'red-flag-sort', docs)
}

function scoreAnswer(round, answer) {
  if (round.scoring === 'ordered_exact_positions') {
    if (!Array.isArray(answer) || !Array.isArray(round.answerKey)) return { ok: false, reason: 'invalid_answer' }
    let points = 0
    for (let i = 0; i < round.answerKey.length; i++) if (answer[i] === round.answerKey[i]) points++
    return {
      ok: true,
      correct: points === round.answerKey.length && answer.length === round.answerKey.length,
      points,
      maxPoints: round.answerKey.length,
    }
  }
  if (typeof answer !== 'string' || typeof round.answerKey !== 'string') return { ok: false, reason: 'invalid_answer' }
  const correct = round.scoring === 'normalized_text'
    ? normalizeTermGridAnswer(answer) === normalizeTermGridAnswer(round.answerKey)
    : textEquals(answer, round.answerKey)
  return { ok: true, correct, points: correct ? round.maxPoints : 0, maxPoints: round.maxPoints }
}

export function publicStateOf(game) {
  const round = game.content.rounds[game.currentRoundIndex] ?? null
  const roundAnswers = round ? game.answersByRound[round.id] ?? {} : {}
  return {
    id: game.id,
    partyId: game.partyId,
    hostId: game.hostId,
    kind: game.kind,
    status: game.status,
    title: game.title,
    source: game.content.source,
    participants: game.participants,
    currentRoundIndex: game.currentRoundIndex,
    roundCount: game.content.rounds.length,
    currentRound: publicRound(round),
    answeredParticipantIds: Object.keys(roundAnswers),
    scores: game.scores,
    version: game.version,
    updatedAt: game.updatedAt,
    completedAt: game.completedAt,
  }
}

function eventOf(game, actorId, type, payload, at) {
  const sequence = game.version + 1
  return {
    id: `${game.id}:${sequence}`,
    sequence,
    partyId: game.partyId,
    gameId: game.id,
    type,
    actorId,
    createdAt: at,
    payload,
  }
}

function appendEvent(game, events, actorId, type, payload, at) {
  const event = eventOf(game, actorId, type, payload, at)
  game.version = event.sequence
  game.updatedAt = at
  events.push(event)
  return event
}

export function createInitialPartyGame({ id, partyId, hostId, content, members, at }) {
  const participants = {}
  const scores = {}
  for (const member of members) {
    participants[member.userId] = {
      id: member.userId,
      username: member.displayName || 'Student',
      profileIcon: member.profileIcon ?? undefined,
      connected: member.userId === hostId,
      joinedAt: at,
      lastSeenAt: at,
    }
    scores[member.userId] = 0
  }
  if (!participants[hostId]) {
    participants[hostId] = { id: hostId, username: 'Host', connected: true, joinedAt: at, lastSeenAt: at }
    scores[hostId] = 0
  }
  return {
    id,
    partyId,
    hostId,
    kind: content.kind,
    title: content.title,
    status: 'lobby',
    content,
    participants,
    currentRoundIndex: 0,
    answersByRound: {},
    scores,
    version: 0,
    createdAt: at,
    updatedAt: at,
    completedAt: null,
  }
}

export function applyActionToPartyGame(game, actor, action, at = nowIso()) {
  const next = parseJson(JSON.stringify(game), game)
  const events = []
  const member = next.participants[actor.userId]
  const hostOnly = () => requireCondition(actor.userId === next.hostId, 'not_host')

  const memberError = requireCondition(actor.partyId === next.partyId && member, 'not_a_member')
  if (memberError) return memberError

  if (action.type === 'reconnect') {
    member.connected = true
    member.lastSeenAt = at
    appendEvent(next, events, actor.userId, 'participant_reconnected', { participantId: actor.userId }, at)
    return { ok: true, game: next, events }
  }

  if (action.type === 'leave') {
    member.connected = false
    member.lastSeenAt = at
    appendEvent(next, events, actor.userId, 'participant_left', { participantId: actor.userId }, at)
    return { ok: true, game: next, events }
  }

  if (action.type === 'start') {
    const err = hostOnly() || requireCondition(next.status === 'lobby', 'invalid_state')
    if (err) return err
    next.status = 'in_round'
    next.currentRoundIndex = 0
    appendEvent(next, events, actor.userId, 'game_started', { roundIndex: 0 }, at)
    appendEvent(next, events, actor.userId, 'round_started', { roundIndex: 0 }, at)
    return { ok: true, game: next, events }
  }

  if (action.type === 'submit_answer') {
    const err = requireCondition(next.status === 'in_round', 'invalid_state')
    if (err) return err
    const round = next.content.rounds[next.currentRoundIndex]
    if (!round || action.roundId !== round.id) return { ok: false, reason: 'wrong_round' }
    next.answersByRound[round.id] ??= {}
    if (next.answersByRound[round.id][actor.userId]) return { ok: false, reason: 'duplicate_answer' }
    const scored = scoreAnswer(round, action.answer)
    if (!scored.ok) return scored
    const recorded = {
      participantId: actor.userId,
      roundId: round.id,
      answer: action.answer,
      correct: scored.correct,
      points: scored.points,
      maxPoints: scored.maxPoints,
      answeredAt: at,
    }
    next.answersByRound[round.id][actor.userId] = recorded
    next.scores[actor.userId] = (next.scores[actor.userId] ?? 0) + scored.points
    appendEvent(next, events, actor.userId, 'answer_recorded', {
      answer: {
        participantId: actor.userId,
        roundId: round.id,
        correct: scored.correct,
        points: scored.points,
        maxPoints: scored.maxPoints,
        answeredAt: at,
      },
    }, at)
    appendEvent(next, events, actor.userId, 'score_changed', { scores: next.scores }, at)
    const activeMembers = Object.values(next.participants).filter((participant) => participant.connected)
    if (activeMembers.length > 0 && activeMembers.every((participant) => next.answersByRound[round.id][participant.id])) {
      next.status = 'between_rounds'
    }
    return { ok: true, game: next, events }
  }

  if (action.type === 'next_round') {
    const err = hostOnly() || requireCondition(next.status === 'in_round' || next.status === 'between_rounds', 'invalid_state')
    if (err) return err
    const nextIndex = next.currentRoundIndex + 1
    if (nextIndex >= next.content.rounds.length) {
      next.status = 'completed'
      next.completedAt = at
      appendEvent(next, events, actor.userId, 'game_completed', { scores: next.scores }, at)
      return { ok: true, game: next, events }
    }
    next.status = 'in_round'
    next.currentRoundIndex = nextIndex
    appendEvent(next, events, actor.userId, 'round_started', { roundIndex: nextIndex }, at)
    return { ok: true, game: next, events }
  }

  if (action.type === 'end') {
    const err = hostOnly()
    if (err) return err
    next.status = 'completed'
    next.completedAt = at
    appendEvent(next, events, actor.userId, 'game_completed', { scores: next.scores }, at)
    return { ok: true, game: next, events }
  }

  return { ok: false, reason: 'invalid_action' }
}

function redactEvent(event, publicState) {
  return { ...event, publicState }
}

async function trustedDocsForCreation() {
  const [rows] = await pool.query('SELECT k, v FROM app_state WHERE k IN (?, ?, ?, ?)', [GLOSSARY_KEY, LEDGER_KEY, MINIGAME_PACKS_KEY, MEDIA_STATE_KEY])
  const docs = {}
  for (const row of rows) {
    if (row.k === GLOSSARY_KEY) docs.glossary = parseJson(row.v, null)
    if (row.k === LEDGER_KEY) docs.ledger = parseJson(row.v, [])
    if (row.k === MINIGAME_PACKS_KEY) docs.minigamePacks = parseJson(row.v, [])
    if (row.k === MEDIA_STATE_KEY) docs.media = parseJson(row.v, { records: [] })
  }
  docs.ledger = redactLedgerForStudent(docs.ledger ?? [], releasedMediaIdsFromDocument(docs.media))
  return docs
}

async function partyMembers(partyId) {
  const [rows] = await pool.query(
    `SELECT pm.user_id AS userId, COALESCE(s.username, s.name, s.email, a.email) AS displayName,
            s.profile_icon AS profileIcon, pm.role
       FROM study_party_members pm
       LEFT JOIN students s ON s.user_id = pm.user_id
       LEFT JOIN user_access a ON a.user_id = pm.user_id
      WHERE pm.party_id = ?
      ORDER BY pm.joined_at`,
    [partyId],
  )
  return rows.map((row) => ({
    userId: row.userId,
    displayName: row.displayName ? String(row.displayName).split('@')[0] : 'Student',
    profileIcon: row.profileIcon,
    role: row.role,
  }))
}

async function partyMeta(partyId) {
  const [rows] = await pool.query(
    'SELECT id, host_user_id AS hostId, archived_at AS archivedAt FROM study_parties WHERE id = ? LIMIT 1',
    [partyId],
  )
  return rows[0] ?? null
}

async function memberVerdict(partyId, userId) {
  const [rows] = await pool.query(
    `SELECT p.host_user_id AS hostId, p.archived_at AS archivedAt, pm.user_id AS userId
       FROM study_parties p
       LEFT JOIN study_party_members pm ON pm.party_id = p.id AND pm.user_id = ?
      WHERE p.id = ? LIMIT 1`,
    [userId, partyId],
  )
  const row = rows[0]
  if (!row) return { ok: false, reason: 'not_found' }
  if (row.archivedAt) return { ok: false, reason: 'archived' }
  if (!row.userId) return { ok: false, reason: 'not_a_member' }
  return { ok: true, hostId: row.hostId, isHost: row.hostId === userId }
}

async function recordFromRows(row, participants, answers) {
  const content = parseJson(row.contentJson, { rounds: [] })
  const scores = parseJson(row.scoresJson, {})
  const answersByRound = {}
  for (const answer of answers) {
    answersByRound[answer.roundId] ??= {}
    answersByRound[answer.roundId][answer.userId] = {
      participantId: answer.userId,
      roundId: answer.roundId,
      answer: parseJson(answer.answerJson, null),
      correct: Boolean(answer.correct),
      points: Number(answer.points),
      maxPoints: Number(answer.maxPoints),
      answeredAt: answer.answeredAt,
    }
  }
  return {
    id: row.id,
    partyId: row.partyId,
    hostId: row.hostId,
    kind: row.kind,
    title: row.title,
    status: row.status,
    content,
    participants: Object.fromEntries(participants.map((participant) => [participant.userId, {
      id: participant.userId,
      username: participant.username,
      profileIcon: participant.profileIcon ?? undefined,
      connected: Boolean(participant.connected),
      joinedAt: participant.joinedAt,
      lastSeenAt: participant.lastSeenAt,
    }])),
    currentRoundIndex: Number(row.currentRoundIndex),
    answersByRound,
    scores,
    version: Number(row.version),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    completedAt: row.completedAt,
  }
}

async function fullGame(gameId, conn = pool, lock = false) {
  const [rows] = await conn.query(
    `SELECT id, party_id AS partyId, host_user_id AS hostId, kind, title, status,
            content_json AS contentJson, current_round_index AS currentRoundIndex,
            scores_json AS scoresJson, version, created_at AS createdAt,
            updated_at AS updatedAt, completed_at AS completedAt
       FROM study_party_games WHERE id = ? LIMIT 1${lock ? ' FOR UPDATE' : ''}`,
    [gameId],
  )
  if (!rows.length) return null
  const [participants] = await conn.query(
    `SELECT user_id AS userId, username, profile_icon AS profileIcon, connected,
            joined_at AS joinedAt, last_seen_at AS lastSeenAt
       FROM study_party_game_participants WHERE game_id = ?`,
    [gameId],
  )
  const [answers] = await conn.query(
    `SELECT user_id AS userId, round_id AS roundId, answer_json AS answerJson, correct,
            points, max_points AS maxPoints, answered_at AS answeredAt
       FROM study_party_game_answers WHERE game_id = ?`,
    [gameId],
  )
  return recordFromRows(rows[0], participants, answers)
}

async function persistGame(conn, game) {
  await conn.query(
    `UPDATE study_party_games
        SET status = ?, current_round_index = ?, scores_json = ?, version = ?,
            updated_at = ?, completed_at = ?
      WHERE id = ?`,
    [game.status, game.currentRoundIndex, JSON.stringify(game.scores), game.version, new Date(game.updatedAt), game.completedAt ? new Date(game.completedAt) : null, game.id],
  )
  // ponytail: 500 rows/insert — a party's participant/answer/event counts are
  // tiny in practice, but chunking keeps this safe if one ever isn't.
  for (const batch of chunk(Object.values(game.participants), 500)) {
    const placeholders = batch.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ')
    const params = batch.flatMap((participant) => [
      game.id, participant.id, participant.username, participant.profileIcon ?? null,
      participant.connected ? 1 : 0, new Date(participant.joinedAt), new Date(participant.lastSeenAt),
    ])
    await conn.query(
      `INSERT INTO study_party_game_participants
          (game_id, user_id, username, profile_icon, connected, joined_at, last_seen_at)
       VALUES ${placeholders}
       ON DUPLICATE KEY UPDATE username = VALUES(username), profile_icon = VALUES(profile_icon),
         connected = VALUES(connected), last_seen_at = VALUES(last_seen_at)`,
      params,
    )
  }
  const allAnswers = Object.values(game.answersByRound).flatMap((answers) => Object.values(answers))
  for (const batch of chunk(allAnswers, 500)) {
    const placeholders = batch.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(', ')
    const params = batch.flatMap((answer) => [
      game.id, answer.roundId, answer.participantId, JSON.stringify(answer.answer),
      answer.correct ? 1 : 0, answer.points, answer.maxPoints, new Date(answer.answeredAt),
    ])
    await conn.query(
      `INSERT INTO study_party_game_answers
          (game_id, round_id, user_id, answer_json, correct, points, max_points, answered_at)
       VALUES ${placeholders}
       ON DUPLICATE KEY UPDATE answer_json = VALUES(answer_json), correct = VALUES(correct),
         points = VALUES(points), max_points = VALUES(max_points), answered_at = VALUES(answered_at)`,
      params,
    )
  }
}

async function persistEvents(conn, events, publicState) {
  const publicEvents = events.map((event) => redactEvent(event, publicState))
  // ponytail: 500 rows/insert — see the note in persistGame above.
  for (const batch of chunk(publicEvents, 500)) {
    const placeholders = batch.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(', ')
    const params = batch.flatMap((event) => [
      event.id, event.gameId, event.partyId, event.sequence, event.type, event.actorId,
      JSON.stringify(event), new Date(event.createdAt),
    ])
    await conn.query(
      `INSERT INTO study_party_game_events
          (event_id, game_id, party_id, sequence, type, actor_id, payload_json, created_at)
       VALUES ${placeholders}`,
      params,
    )
  }
  return publicEvents
}

export async function createPartyGame(userId, partyId, request) {
  const membership = await memberVerdict(partyId, userId)
  if (!membership.ok) return membership
  if (!membership.isHost) return { ok: false, reason: 'not_host' }

  const docs = await trustedDocsForCreation()
  const built = contentFromTrustedSource(request ?? {}, docs)
  if (!built.ok) return built

  const meta = await partyMeta(partyId)
  if (!meta) return { ok: false, reason: 'not_found' }
  const members = await partyMembers(partyId)
  const at = nowIso()
  const game = createInitialPartyGame({
    id: randomUUID(),
    partyId,
    hostId: meta.hostId,
    content: built.content,
    members,
    at,
  })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query(
      `INSERT INTO study_party_games
          (id, party_id, host_user_id, kind, title, source_kind, source_id, source_label,
           content_json, status, current_round_index, scores_json, version, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        game.id, partyId, game.hostId, game.kind, game.title, game.content.source.kind,
        game.content.source.id, game.content.source.label, JSON.stringify(game.content),
        game.status, game.currentRoundIndex, JSON.stringify(game.scores), game.version, userId,
      ],
    )
    await persistGame(conn, game)
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  return { ok: true, game: publicStateOf(game) }
}

export async function partyGamesFor(userId, partyId) {
  const membership = await memberVerdict(partyId, userId)
  if (!membership.ok) return []
  const [rows] = await pool.query(
    `SELECT id, party_id AS partyId, host_user_id AS hostId, kind, title, status,
            current_round_index AS currentRoundIndex, version, updated_at AS updatedAt,
            completed_at AS completedAt
       FROM study_party_games
      WHERE party_id = ?
      ORDER BY COALESCE(completed_at, updated_at, created_at) DESC
      LIMIT 10`,
    [partyId],
  )
  return rows.map((row) => ({
    id: row.id,
    partyId: row.partyId,
    hostId: row.hostId,
    kind: row.kind,
    title: row.title,
    status: row.status,
    currentRoundIndex: Number(row.currentRoundIndex),
    version: Number(row.version),
    updatedAt: row.updatedAt,
    completedAt: row.completedAt,
  }))
}

export async function partyGameFor(userId, partyId, gameId) {
  const membership = await memberVerdict(partyId, userId)
  if (!membership.ok) return null
  const game = await fullGame(gameId)
  if (!game || game.partyId !== partyId) return null
  return publicStateOf(game)
}

export async function actOnPartyGame(userId, partyId, gameId, action) {
  const membership = await memberVerdict(partyId, userId)
  if (!membership.ok) return membership
  const conn = await pool.getConnection()
  let publicEvents
  let publicState
  try {
    await conn.beginTransaction()
    // Serialize every state transition for this game. Without the row lock two
    // answers can read the same version, double-score, and claim one sequence.
    const game = await fullGame(gameId, conn, true)
    if (!game || game.partyId !== partyId) {
      await conn.rollback()
      return { ok: false, reason: 'not_found' }
    }
    const result = applyActionToPartyGame(game, { userId, partyId }, action ?? {})
    if (!result.ok) {
      await conn.rollback()
      return result
    }
    publicState = publicStateOf(result.game)
    await persistGame(conn, result.game)
    publicEvents = await persistEvents(conn, result.events, publicState)
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  for (const event of publicEvents) streamBus.emit(gameId, event)
  return { ok: true, state: publicState, events: publicEvents }
}

function eventSequenceFromCursor(after) {
  if (!after) return 0
  const tail = String(after).split(':').pop()
  return Number(tail) || 0
}

function writeSse(res, event) {
  res.write(`id: ${event.id}\n`)
  res.write(`data: ${JSON.stringify(event)}\n\n`)
}

export async function streamPartyGameEvents(userId, partyId, gameId, req, res) {
  const membership = await memberVerdict(partyId, userId)
  if (!membership.ok) return res.status(membership.reason === 'not_found' ? 404 : 403).json({ error: membership.reason })
  const reconnected = await actOnPartyGame(userId, partyId, gameId, { type: 'reconnect' })
  if (!reconnected.ok) return res.status(reconnected.reason === 'not_found' ? 404 : 409).json({ error: reconnected.reason })

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })

  const after = eventSequenceFromCursor(req.query.after)
  const [rows] = await pool.query(
    `SELECT payload_json AS payloadJson FROM study_party_game_events
      WHERE game_id = ? AND sequence > ?
      ORDER BY sequence ASC
      LIMIT 200`,
    [gameId, after],
  )
  if (!rows.length) {
    writeSse(res, reconnected.events.at(-1))
  } else {
    for (const row of rows) writeSse(res, parseJson(row.payloadJson, {}))
  }

  const ping = setInterval(() => res.write(': ping\n\n'), 25_000)
  const send = (event) => writeSse(res, event)
  streamBus.on(gameId, send)
  req.on('close', () => {
    clearInterval(ping)
    streamBus.off(gameId, send)
    void actOnPartyGame(userId, partyId, gameId, { type: 'leave' }).catch(() => {})
  })
}

export const _test = {
  contentFromTrustedSource,
  createInitialPartyGame,
  applyActionToPartyGame,
  publicStateOf,
  normalizeTermGridAnswer,
}
