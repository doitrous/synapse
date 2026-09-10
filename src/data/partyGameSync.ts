/**
 * Server-authoritative party game synchronization rules.
 *
 * This module is deliberately pure: no React, no fetch, no database, no clock
 * except the caller-provided timestamp. The server can persist the event
 * records below and stream their redacted form to clients over SSE. Clients may
 * render the redacted public state, but only the server should keep and score
 * answer keys.
 */

import { normalizeTermGridAnswer, type Grid } from './crossword.ts'
import type { OrderedMiniGamePack, RedFlagSortPack } from './minigamePacks.ts'
import { validateMiniGamePack } from './minigamePacks.ts'
import type { SpotterGame } from './spotter.ts'
import type { MatchBoard } from './termMatch.ts'

export type PartyGameKind =
  | 'term-grid'
  | 'spotter'
  | 'term-match'
  | 'clinical-sequence'
  | 'mechanism-chain'
  | 'red-flag-sort'
  | 'maristanas'

export type PartyGameStatus = 'lobby' | 'in_round' | 'between_rounds' | 'completed'
export type PartyAnswerValue = string | string[] | Record<string, string>

export interface PartyGameChoice {
  id: string
  label: string
  lang?: string
  dir?: 'ltr' | 'rtl'
}

export interface PartyGameContentSource {
  /** Authored/published only. The engine refuses synthetic runtime facts. */
  kind: 'authored' | 'published'
  id: string
  label: string
}

export interface PartyGameRound {
  id: string
  index: number
  prompt: string
  choices: PartyGameChoice[]
  answerKey: PartyAnswerValue
  maxPoints: number
  scoring: 'choice' | 'normalized_text' | 'ordered_exact_positions'
  payload?: Record<string, unknown>
}

export interface PartyGameContent {
  kind: PartyGameKind
  title: string
  source: PartyGameContentSource
  authoredOnly: true
  rounds: PartyGameRound[]
}

export interface PartyGameParticipant {
  id: string
  username: string
  profileIcon?: string
  connected: boolean
  joinedAt: string
  lastSeenAt: string
}

export interface PartyGameRoundAnswer {
  participantId: string
  roundId: string
  answer: PartyAnswerValue
  correct: boolean
  points: number
  maxPoints: number
  answeredAt: string
}

export interface PartyGameSession {
  id: string
  partyId: string
  hostId: string
  kind: PartyGameKind
  status: PartyGameStatus
  content: PartyGameContent
  participants: Record<string, PartyGameParticipant>
  currentRoundIndex: number
  answersByRound: Record<string, Record<string, PartyGameRoundAnswer>>
  scores: Record<string, number>
  version: number
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface PartyGameActor {
  id: string
  partyId: string
}

export type PartyGameAction =
  | { type: 'join'; participant: { id: string; username: string; profileIcon?: string } }
  | { type: 'leave' }
  | { type: 'reconnect' }
  | { type: 'start' }
  | { type: 'submit_answer'; roundId: string; answer: PartyAnswerValue }
  | { type: 'next_round' }
  | { type: 'end' }

export type PartyGameEventType =
  | 'participant_joined'
  | 'participant_left'
  | 'participant_reconnected'
  | 'game_started'
  | 'round_started'
  | 'answer_recorded'
  | 'score_changed'
  | 'game_completed'

export interface PartyGameEventRecord<TPayload = Record<string, unknown>> {
  id: string
  sequence: number
  partyId: string
  gameId: string
  type: PartyGameEventType
  actorId: string
  createdAt: string
  payload: TPayload
}

export type PublicPartyGameRound = Omit<PartyGameRound, 'answerKey'>
export type PublicPartyGameEvent = PartyGameEventRecord & { publicState?: PartyGamePublicState }

export interface PartyGamePublicState {
  id: string
  partyId: string
  hostId: string
  kind: PartyGameKind
  status: PartyGameStatus
  title: string
  source: PartyGameContentSource
  participants: Record<string, PartyGameParticipant>
  currentRoundIndex: number
  roundCount: number
  currentRound: PublicPartyGameRound | null
  answeredParticipantIds: string[]
  scores: Record<string, number>
  version: number
  updatedAt: string
  completedAt?: string
}

export interface PartyGameSseMessage {
  event: PartyGameEventType
  id: string
  data: string
}

export class PartyGameRuleError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'PartyGameRuleError'
    this.code = code
  }
}

function jsonClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function assert(condition: unknown, code: string, message: string): asserts condition {
  if (!condition) throw new PartyGameRuleError(code, message)
}

function ensureAuthoredContent(content: PartyGameContent): void {
  assert(content.authoredOnly === true, 'synthetic_content_refused', 'Party games can only use validated authored or published content.')
  assert(content.source.kind === 'authored' || content.source.kind === 'published', 'synthetic_content_refused', 'Party content source must be authored or published.')
  assert(content.rounds.length > 0, 'empty_content', 'Party games need at least one round.')
  for (const round of content.rounds) {
    assert(round.prompt.trim(), 'invalid_round', `${round.id}: prompt is required.`)
    assert(round.maxPoints > 0, 'invalid_round', `${round.id}: maxPoints must be positive.`)
  }
}

function assertSameParty(session: PartyGameSession, actor: PartyGameActor): void {
  assert(actor.partyId === session.partyId, 'wrong_party', 'Action actor is not in this party.')
}

function assertMember(session: PartyGameSession, actor: PartyGameActor): void {
  assertSameParty(session, actor)
  assert(Boolean(session.participants[actor.id]), 'not_party_member', 'Only party members can act on this game.')
}

function assertHost(session: PartyGameSession, actor: PartyGameActor): void {
  assertMember(session, actor)
  assert(actor.id === session.hostId, 'host_required', 'Only the host can control the party game.')
}

function currentRound(session: PartyGameSession): PartyGameRound | null {
  return session.content.rounds[session.currentRoundIndex] ?? null
}

function compareText(a: string, b: string): boolean {
  return a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase()
}

function scoreAnswer(round: PartyGameRound, answer: PartyAnswerValue): Omit<PartyGameRoundAnswer, 'participantId' | 'roundId' | 'answer' | 'answeredAt'> {
  if (round.scoring === 'ordered_exact_positions') {
    assert(Array.isArray(round.answerKey), 'invalid_answer_key', `${round.id}: ordered rounds require an ordered key.`)
    assert(Array.isArray(answer), 'invalid_answer', 'Submit the ordered item ids as an array.')
    const expected = round.answerKey
    let points = 0
    for (let i = 0; i < expected.length; i++) {
      if (answer[i] === expected[i]) points += 1
    }
    return { correct: points === expected.length && answer.length === expected.length, points, maxPoints: expected.length }
  }

  assert(typeof round.answerKey === 'string', 'invalid_answer_key', `${round.id}: choice/text rounds require a string key.`)
  assert(typeof answer === 'string', 'invalid_answer', 'Submit a single answer for this round.')
  const correct = round.scoring === 'normalized_text'
    ? normalizeTermGridAnswer(answer) === normalizeTermGridAnswer(round.answerKey)
    : compareText(answer, round.answerKey)
  return { correct, points: correct ? round.maxPoints : 0, maxPoints: round.maxPoints }
}

function createEvent<TPayload extends Record<string, unknown>>(
  session: PartyGameSession,
  actorId: string,
  type: PartyGameEventType,
  payload: TPayload,
  createdAt: string,
): PartyGameEventRecord<TPayload> {
  const sequence = session.version + 1
  return {
    id: `${session.id}:${sequence}`,
    sequence,
    partyId: session.partyId,
    gameId: session.id,
    type,
    actorId,
    createdAt,
    payload,
  }
}

function applyEvent(session: PartyGameSession, event: PartyGameEventRecord): PartyGameSession {
  const next = jsonClone(session)
  next.version = event.sequence
  next.updatedAt = event.createdAt

  if (event.type === 'participant_joined') {
    const participant = event.payload.participant as PartyGameParticipant
    next.participants[participant.id] = participant
    next.scores[participant.id] ??= 0
    return next
  }

  if (event.type === 'participant_left') {
    const participantId = event.payload.participantId as string
    if (next.participants[participantId]) {
      next.participants[participantId].connected = false
      next.participants[participantId].lastSeenAt = event.createdAt
    }
    return next
  }

  if (event.type === 'participant_reconnected') {
    const participantId = event.payload.participantId as string
    if (next.participants[participantId]) {
      next.participants[participantId].connected = true
      next.participants[participantId].lastSeenAt = event.createdAt
    }
    return next
  }

  if (event.type === 'game_started') {
    next.status = 'in_round'
    next.currentRoundIndex = 0
    return next
  }

  if (event.type === 'round_started') {
    next.status = 'in_round'
    next.currentRoundIndex = event.payload.roundIndex as number
    return next
  }

  if (event.type === 'answer_recorded') {
    const answer = event.payload.answer as PartyGameRoundAnswer
    next.answersByRound[answer.roundId] ??= {}
    next.answersByRound[answer.roundId][answer.participantId] = answer
    return next
  }

  if (event.type === 'score_changed') {
    next.scores = { ...(event.payload.scores as Record<string, number>) }
    next.status = 'between_rounds'
    return next
  }

  if (event.type === 'game_completed') {
    next.status = 'completed'
    next.completedAt = event.createdAt
    return next
  }

  return next
}

function addEvent<TPayload extends Record<string, unknown>>(
  events: PartyGameEventRecord[],
  session: PartyGameSession,
  actorId: string,
  type: PartyGameEventType,
  payload: TPayload,
  createdAt: string,
): PartyGameSession {
  const event = createEvent(session, actorId, type, payload, createdAt)
  events.push(event)
  return applyEvent(session, event)
}

export function createPartyGameSession(args: {
  id: string
  partyId: string
  hostId: string
  content: PartyGameContent
  host: { id: string; username: string; profileIcon?: string }
  now: string
}): PartyGameSession {
  ensureAuthoredContent(args.content)
  assert(args.host.id === args.hostId, 'host_mismatch', 'The initial host must match hostId.')
  const host: PartyGameParticipant = {
    ...args.host,
    connected: true,
    joinedAt: args.now,
    lastSeenAt: args.now,
  }
  return {
    id: args.id,
    partyId: args.partyId,
    hostId: args.hostId,
    kind: args.content.kind,
    status: 'lobby',
    content: jsonClone(args.content),
    participants: { [host.id]: host },
    currentRoundIndex: 0,
    answersByRound: {},
    scores: { [host.id]: 0 },
    version: 0,
    createdAt: args.now,
    updatedAt: args.now,
  }
}

export function applyPartyGameAction(
  session: PartyGameSession,
  actor: PartyGameActor,
  action: PartyGameAction,
  now: string,
): { session: PartyGameSession; events: PartyGameEventRecord[] } {
  let next = jsonClone(session)
  const events: PartyGameEventRecord[] = []

  if (action.type === 'join') {
    assertSameParty(next, actor)
    assert(actor.id === action.participant.id, 'actor_mismatch', 'A member can only join as themselves.')
    assert(next.status === 'lobby', 'game_already_started', 'New members can only join while the game is in the lobby.')
    const existing = next.participants[actor.id]
    const participant: PartyGameParticipant = existing
      ? { ...existing, ...action.participant, connected: true, lastSeenAt: now }
      : { ...action.participant, connected: true, joinedAt: now, lastSeenAt: now }
    next = addEvent(events, next, actor.id, 'participant_joined', { participant }, now)
    return { session: next, events }
  }

  if (action.type === 'leave') {
    assertMember(next, actor)
    next = addEvent(events, next, actor.id, 'participant_left', { participantId: actor.id }, now)
    return { session: next, events }
  }

  if (action.type === 'reconnect') {
    assertMember(next, actor)
    next = addEvent(events, next, actor.id, 'participant_reconnected', { participantId: actor.id }, now)
    return { session: next, events }
  }

  if (action.type === 'start') {
    assertHost(next, actor)
    assert(next.status === 'lobby', 'invalid_state', 'Only lobby games can start.')
    next = addEvent(events, next, actor.id, 'game_started', { roundIndex: 0 }, now)
    return { session: next, events }
  }

  if (action.type === 'submit_answer') {
    assertMember(next, actor)
    assert(next.status === 'in_round', 'invalid_state', 'Answers are only accepted during an active round.')
    const round = currentRound(next)
    assert(round, 'round_missing', 'The active round is missing.')
    assert(action.roundId === round.id, 'wrong_round', 'Answer submitted for a round that is not active.')
    assert(!next.answersByRound[round.id]?.[actor.id], 'duplicate_answer', 'A member can answer a round once.')
    const scored = scoreAnswer(round, action.answer)
    const recorded: PartyGameRoundAnswer = {
      participantId: actor.id,
      roundId: round.id,
      answer: jsonClone(action.answer),
      answeredAt: now,
      ...scored,
    }
    next = addEvent(events, next, actor.id, 'answer_recorded', { answer: recorded }, now)
    const scores = { ...next.scores, [actor.id]: (next.scores[actor.id] ?? 0) + recorded.points }
    next = addEvent(events, next, actor.id, 'score_changed', { scores }, now)
    return { session: next, events }
  }

  if (action.type === 'next_round') {
    assertHost(next, actor)
    assert(next.status === 'between_rounds' || next.status === 'in_round', 'invalid_state', 'There is no round to advance.')
    const nextRoundIndex = next.currentRoundIndex + 1
    if (nextRoundIndex >= next.content.rounds.length) {
      next = addEvent(events, next, actor.id, 'game_completed', { scores: next.scores }, now)
      return { session: next, events }
    }
    next = addEvent(events, next, actor.id, 'round_started', { roundIndex: nextRoundIndex }, now)
    return { session: next, events }
  }

  assertHost(next, actor)
  next = addEvent(events, next, actor.id, 'game_completed', { scores: next.scores }, now)
  return { session: next, events }
}

export function replayPartyGameEvents(
  initial: PartyGameSession,
  events: PartyGameEventRecord[],
): PartyGameSession {
  return events
    .slice()
    .sort((a, b) => a.sequence - b.sequence)
    .reduce((session, event) => applyEvent(session, event), jsonClone(initial))
}

export function redactPartyGameSession(session: PartyGameSession): PartyGamePublicState {
  const round = currentRound(session)
  const publicRound: PublicPartyGameRound | null = round
    ? {
        id: round.id,
        index: round.index,
        prompt: round.prompt,
        choices: round.choices,
        maxPoints: round.maxPoints,
        scoring: round.scoring,
        payload: round.payload,
      }
    : null
  const roundId = round?.id
  return {
    id: session.id,
    partyId: session.partyId,
    hostId: session.hostId,
    kind: session.kind,
    status: session.status,
    title: session.content.title,
    source: session.content.source,
    participants: jsonClone(session.participants),
    currentRoundIndex: session.currentRoundIndex,
    roundCount: session.content.rounds.length,
    currentRound: publicRound,
    answeredParticipantIds: roundId ? Object.keys(session.answersByRound[roundId] ?? {}) : [],
    scores: { ...session.scores },
    version: session.version,
    updatedAt: session.updatedAt,
    completedAt: session.completedAt,
  }
}

export function redactPartyGameEvent(event: PartyGameEventRecord, publicState?: PartyGamePublicState): PublicPartyGameEvent {
  const payload = event.type === 'answer_recorded'
    ? {
        answer: {
          participantId: (event.payload.answer as PartyGameRoundAnswer).participantId,
          roundId: (event.payload.answer as PartyGameRoundAnswer).roundId,
          correct: (event.payload.answer as PartyGameRoundAnswer).correct,
          points: (event.payload.answer as PartyGameRoundAnswer).points,
          maxPoints: (event.payload.answer as PartyGameRoundAnswer).maxPoints,
          answeredAt: (event.payload.answer as PartyGameRoundAnswer).answeredAt,
        },
      }
    : event.payload
  return { ...event, payload, ...(publicState ? { publicState } : {}) }
}

export function toPartyGameSseMessage(event: PublicPartyGameEvent): PartyGameSseMessage {
  return {
    event: event.type,
    id: event.id,
    data: JSON.stringify(event),
  }
}

export function partyContentFromTermGrid(grid: Grid, source: PartyGameContentSource, title = 'Term Grid party'): PartyGameContent {
  return {
    kind: 'term-grid',
    title,
    source,
    authoredOnly: true,
    rounds: grid.words.map((word, index) => ({
      id: `term-grid:${word.number}:${word.direction}`,
      index,
      prompt: word.clue,
      choices: [],
      answerKey: word.term,
      maxPoints: 1,
      scoring: 'normalized_text',
      payload: {
        clueNumber: word.number,
        direction: word.direction,
        row: word.row,
        column: word.column,
      },
    })),
  }
}

export function partyContentFromSpotter(game: SpotterGame, source: PartyGameContentSource, title = 'Spotter party'): PartyGameContent {
  return {
    kind: 'spotter',
    title,
    source,
    authoredOnly: true,
    rounds: game.rounds.map((round, index) => ({
      id: `spotter:${round.slideId}:${round.structureId}:${round.objective}`,
      index,
      prompt: `Identify the pinned structure on ${round.slideTitle}.`,
      choices: round.options.map((label) => ({ id: label, label })),
      answerKey: round.answer,
      maxPoints: 1,
      scoring: 'choice',
      payload: {
        slideId: round.slideId,
        slideTitle: round.slideTitle,
        objective: round.objective,
        structureId: round.structureId,
        at: round.at,
      },
    })),
  }
}

export function partyContentFromTermMatch(board: MatchBoard, source: PartyGameContentSource, title = 'Term Match party'): PartyGameContent {
  return {
    kind: 'term-match',
    title,
    source,
    authoredOnly: true,
    rounds: board.termTiles.map((term, index) => ({
      id: `term-match:${term.pairId}`,
      index,
      prompt: term.text,
      choices: board.partnerTiles.map((partner) => ({
        id: partner.pairId,
        label: partner.text,
        ...(partner.arabic ? { lang: 'ar', dir: 'rtl' as const } : {}),
      })),
      answerKey: term.pairId,
      maxPoints: 1,
      scoring: 'choice',
      payload: { mode: board.mode, termTileId: term.id },
    })),
  }
}

export function partyContentFromOrderedMiniGamePack(
  pack: OrderedMiniGamePack,
  source: PartyGameContentSource = { kind: 'authored', id: pack.id, label: pack.source.label },
): PartyGameContent {
  const errors = validateMiniGamePack(pack)
  assert(errors.length === 0, 'invalid_authored_pack', errors.join('; '))
  const kind = pack.kind === 'clinical_sequence' ? 'clinical-sequence' : 'mechanism-chain'
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
      payload: {
        packId: pack.id,
        topic: pack.topic,
        subjectId: pack.subjectId,
        explanation: pack.explanation,
      },
    }],
  }
}

export function partyContentFromRedFlagSortPack(
  pack: RedFlagSortPack,
  source: PartyGameContentSource = { kind: 'authored', id: pack.id, label: pack.source.label },
): PartyGameContent {
  const errors = validateMiniGamePack(pack)
  assert(errors.length === 0, 'invalid_authored_pack', errors.join('; '))
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
      payload: {
        packId: pack.id,
        findingId: finding.id,
        topic: pack.topic,
        subjectId: pack.subjectId,
      },
    })),
  }
}
