import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { buildGrid } from './crossword.ts'
import { GLOSSARY_SEED } from './glossary.ts'
import { MINI_GAME_PACKS, validMiniGamePacks } from './minigamePacks.ts'
import {
  applyPartyGameAction,
  createPartyGameSession,
  partyContentFromOrderedMiniGamePack,
  partyContentFromRedFlagSortPack,
  partyContentFromSpotter,
  partyContentFromTermGrid,
  partyContentFromTermMatch,
  PartyGameRuleError,
  redactPartyGameEvent,
  redactPartyGameSession,
  replayPartyGameEvents,
  toPartyGameSseMessage,
  type PartyGameActor,
  type PartyGameContent,
} from './partyGameSync.ts'
import { buildSpotter } from './spotter.ts'
import { buildBoard } from './termMatch.ts'
import type { HistologySlide } from './histology.ts'

const now = '2026-08-24T10:00:00.000Z'
const later = '2026-08-24T10:01:00.000Z'
const partyId = 'party-1'
const host: PartyGameActor = { id: 'host-1', partyId }
const guest: PartyGameActor = { id: 'guest-1', partyId }

const source = { kind: 'authored' as const, id: 'fixture', label: 'Authored fixture' }

function baseSession(content: PartyGameContent) {
  return createPartyGameSession({
    id: 'game-1',
    partyId,
    hostId: host.id,
    host: { id: host.id, username: 'host' },
    content,
    now,
  })
}

function termGridContent() {
  const grid = buildGrid(
    GLOSSARY_SEED.slice(0, 14).map((term) => ({ term: term.term, clue: term.def })),
    12,
  )
  return partyContentFromTermGrid(grid, source)
}

function spotterContent() {
  const slides: HistologySlide[] = [{
    id: 'slide-1',
    title: 'Authorised epithelium slide',
    subjectId: 'his',
    tissue: 'Epithelium',
    stain: 'H&E',
    views: [{ objective: 4, image: 'media://slide-1-4x' }],
    structures: [
      { id: 's1', label: 'Goblet cell', at: { 4: { x: 0.2, y: 0.3 } } },
      { id: 's2', label: 'Lamina propria', at: { 4: { x: 0.5, y: 0.6 } } },
      { id: 's3', label: 'Epithelium', at: { 4: { x: 0.7, y: 0.4 } } },
      { id: 's4', label: 'Lumen', at: { 4: { x: 0.8, y: 0.2 } } },
    ],
  }]
  return partyContentFromSpotter(buildSpotter(slides, 4, 2), source)
}

describe('party game sync content adapters', () => {
  it('builds party content for every supported game without synthesizing facts', () => {
    const match = partyContentFromTermMatch(buildBoard(GLOSSARY_SEED, 'definition', 9, 6), source)
    const sequence = partyContentFromOrderedMiniGamePack(validMiniGamePacks('clinical_sequence')[0])
    const mechanism = partyContentFromOrderedMiniGamePack(validMiniGamePacks('mechanism_chain')[0])
    const redFlags = partyContentFromRedFlagSortPack(validMiniGamePacks('red_flag_sort')[0])
    const contents = [termGridContent(), spotterContent(), match, sequence, mechanism, redFlags]

    assert.deepEqual(
      contents.map((content) => content.kind),
      ['term-grid', 'spotter', 'term-match', 'clinical-sequence', 'mechanism-chain', 'red-flag-sort'],
    )
    for (const content of contents) {
      assert.equal(content.authoredOnly, true)
      assert.ok(content.rounds.length > 0)
      assert.ok(content.rounds.every((round) => round.answerKey !== undefined))
      assert.doesNotThrow(() => baseSession(content))
    }
  })

  it('refuses content that is not explicitly authored or published', () => {
    const unsafe = {
      ...termGridContent(),
      authoredOnly: false,
    } as unknown as PartyGameContent

    assert.throws(
      () => baseSession(unsafe),
      (error) => error instanceof PartyGameRuleError && error.code === 'synthetic_content_refused',
    )
  })
})

describe('party game sync transitions and security', () => {
  it('requires membership and host control for protected transitions', () => {
    const session = baseSession(termGridContent())
    assert.throws(
      () => applyPartyGameAction(session, guest, { type: 'start' }, later),
      (error) => error instanceof PartyGameRuleError && error.code === 'not_party_member',
    )

    const joined = applyPartyGameAction(session, guest, {
      type: 'join',
      participant: { id: guest.id, username: 'guest' },
    }, later).session

    assert.throws(
      () => applyPartyGameAction(joined, guest, { type: 'start' }, later),
      (error) => error instanceof PartyGameRuleError && error.code === 'host_required',
    )
  })

  it('records answer and score events, redacts answer material for public streams, and rejects duplicates', () => {
    let session = baseSession(termGridContent())
    session = applyPartyGameAction(session, guest, {
      type: 'join',
      participant: { id: guest.id, username: 'guest' },
    }, later).session
    session = applyPartyGameAction(session, host, { type: 'start' }, later).session

    const round = session.content.rounds[0]
    const submittedWithExtraPunctuation = String(round.answerKey).split('').join('-')
    const result = applyPartyGameAction(session, guest, {
      type: 'submit_answer',
      roundId: round.id,
      answer: submittedWithExtraPunctuation,
    }, later)

    assert.equal(result.session.scores[guest.id], 1)
    assert.equal(result.session.status, 'between_rounds')
    assert.throws(
      () => applyPartyGameAction(result.session, guest, {
        type: 'submit_answer',
        roundId: round.id,
        answer: String(round.answerKey),
      }, later),
      (error) => error instanceof PartyGameRuleError && error.code === 'invalid_state',
    )

    const publicState = redactPartyGameSession(result.session)
    assert.equal('answerKey' in publicState.currentRound!, false)

    const answerEvent = result.events.find((event) => event.type === 'answer_recorded')!
    const redacted = redactPartyGameEvent(answerEvent, publicState)
    assert.equal('answer' in (redacted.payload.answer as Record<string, unknown>), false)
    const sse = toPartyGameSseMessage(redacted)
    assert.equal(sse.event, 'answer_recorded')
    assert.equal(JSON.parse(sse.data).publicState.version, result.session.version)
  })

  it('replays persisted events into the same final state and supports reconnect/completion', () => {
    let session = baseSession(partyContentFromOrderedMiniGamePack(MINI_GAME_PACKS[0]))
    const initial = session
    const events = []

    const joined = applyPartyGameAction(session, guest, {
      type: 'join',
      participant: { id: guest.id, username: 'guest' },
    }, later)
    events.push(...joined.events)
    session = joined.session

    const started = applyPartyGameAction(session, host, { type: 'start' }, later)
    events.push(...started.events)
    session = started.session

    const round = session.content.rounds[0]
    const answered = applyPartyGameAction(session, guest, {
      type: 'submit_answer',
      roundId: round.id,
      answer: round.answerKey,
    }, later)
    events.push(...answered.events)
    session = answered.session

    const reconnected = applyPartyGameAction(session, guest, { type: 'reconnect' }, later)
    events.push(...reconnected.events)
    session = reconnected.session

    const completed = applyPartyGameAction(session, host, { type: 'next_round' }, later)
    events.push(...completed.events)
    session = completed.session

    assert.equal(session.status, 'completed')
    assert.deepEqual(replayPartyGameEvents(initial, events), session)
  })
})
