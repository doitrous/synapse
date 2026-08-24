import { test } from 'node:test'
import assert from 'node:assert/strict'
import { _test } from './partyGames.js'

const glossary = {
  terms: [
    { id: 'anterior', term: 'Anterior', def: 'Toward the front of the body.' },
    { id: 'posterior', term: 'Posterior', def: 'Toward the back of the body.' },
    { id: 'superior', term: 'Superior', def: 'Above, toward the head.' },
    { id: 'inferior', term: 'Inferior', def: 'Below, toward the feet.' },
    { id: 'medial', term: 'Medial', def: 'Closer to the midline.' },
    { id: 'lateral', term: 'Lateral', def: 'Farther from the midline.' },
    { id: 'proximal', term: 'Proximal', def: 'Nearer the attachment.' },
    { id: 'distal', term: 'Distal', def: 'Farther from the attachment.' },
  ],
}

const members = [
  { userId: 'host', displayName: 'Host', role: 'host' },
  { userId: 'guest', displayName: 'Guest', role: 'member' },
]

function gameFrom(content) {
  return _test.createInitialPartyGame({
    id: 'game-1',
    partyId: 'party-1',
    hostId: 'host',
    content,
    members,
    at: '2026-08-24T10:00:00.000Z',
  })
}

test('party game creation refuses client-supplied content and answer keys', () => {
  assert.deepEqual(
    _test.contentFromTrustedSource({ kind: 'term-match', rounds: [], answerKey: 'x' }, { glossary }),
    { ok: false, reason: 'client_content_refused' },
  )
})

test('party game creation builds term match keys from published glossary data', () => {
  const result = _test.contentFromTrustedSource({ kind: 'term-match', seed: 4, pairs: 6 }, { glossary })
  assert.equal(result.ok, true)
  assert.equal(result.content.kind, 'term-match')
  assert.equal(result.content.source.kind, 'published')
  assert.equal(result.content.rounds.length, 6)
  assert.ok(result.content.rounds.every((round) => typeof round.answerKey === 'string'))
})

test('imported published minigame packs win over reviewed seed fallback', () => {
  const imported = {
    id: 'imported-sequence',
    kind: 'clinical_sequence',
    title: 'Imported sequence',
    prompt: 'Order the imported reviewed steps.',
    sourceLabel: 'Validated import batch',
    steps: [
      { id: 'one', text: 'One' },
      { id: 'two', text: 'Two' },
      { id: 'three', text: 'Three' },
    ],
  }
  const result = _test.contentFromTrustedSource(
    { kind: 'clinical-sequence', packId: 'imported-sequence' },
    { minigamePacks: { status: 'Published', validationStatus: 'validated', packs: [imported] } },
  )
  assert.equal(result.ok, true)
  assert.equal(result.content.source.kind, 'published')
  assert.equal(result.content.source.id, 'imported-sequence')
  assert.deepEqual(result.content.rounds[0].answerKey, ['one', 'two', 'three'])
})

test('an imported minigame is not trusted until it is published and validated', () => {
  const unreviewed = {
    id: 'unreviewed-sequence',
    kind: 'clinical_sequence',
    title: 'Unreviewed sequence',
    prompt: 'Order these steps.',
    steps: [
      { id: 'one', text: 'One' },
      { id: 'two', text: 'Two' },
      { id: 'three', text: 'Three' },
    ],
  }
  const result = _test.contentFromTrustedSource(
    { kind: 'clinical-sequence', packId: 'unreviewed-sequence' },
    { minigamePacks: { status: 'Draft', validationStatus: 'pending', packs: [unreviewed] } },
  )
  assert.equal(result.ok, true)
  assert.equal(result.content.source.kind, 'authored')
  assert.notEqual(result.content.source.id, 'unreviewed-sequence')
})

test('reviewed seed pack is an explicit fallback when no imported pack exists', () => {
  const result = _test.contentFromTrustedSource({ kind: 'red-flag-sort' }, {})
  assert.equal(result.ok, true)
  assert.equal(result.content.source.kind, 'authored')
  assert.equal(result.content.kind, 'red-flag-sort')
})

test('party game actions enforce membership, host controls, scoring and public redaction', () => {
  const built = _test.contentFromTrustedSource({ kind: 'term-grid', seed: 1, rounds: 4 }, { glossary })
  const game = gameFrom(built.content)

  assert.deepEqual(
    _test.applyActionToPartyGame(game, { userId: 'guest', partyId: 'party-1' }, { type: 'start' }, '2026-08-24T10:01:00.000Z'),
    { ok: false, reason: 'not_host' },
  )

  const started = _test.applyActionToPartyGame(game, { userId: 'host', partyId: 'party-1' }, { type: 'start' }, '2026-08-24T10:01:00.000Z')
  assert.equal(started.ok, true)
  assert.equal(started.game.status, 'in_round')

  const round = started.game.content.rounds[0]
  const answered = _test.applyActionToPartyGame(
    started.game,
    { userId: 'guest', partyId: 'party-1' },
    { type: 'submit_answer', roundId: round.id, answer: String(round.answerKey).split('').join(' - ') },
    '2026-08-24T10:02:00.000Z',
  )
  assert.equal(answered.ok, true)
  assert.equal(answered.game.scores.guest, 1)
  assert.equal(answered.events.some((event) => event.type === 'score_changed'), true)

  const state = _test.publicStateOf(answered.game)
  assert.equal(Object.hasOwn(state.currentRound, 'answerKey'), false)
  assert.deepEqual(state.answeredParticipantIds, ['guest'])
})

test('a connected guest must answer before the current round advances', () => {
  const built = _test.contentFromTrustedSource({ kind: 'term-grid', seed: 2, rounds: 4 }, { glossary })
  const game = gameFrom(built.content)
  const guestConnected = _test.applyActionToPartyGame(
    game,
    { userId: 'guest', partyId: 'party-1' },
    { type: 'reconnect' },
    '2026-08-24T10:00:30.000Z',
  ).game
  const started = _test.applyActionToPartyGame(
    guestConnected,
    { userId: 'host', partyId: 'party-1' },
    { type: 'start' },
    '2026-08-24T10:01:00.000Z',
  ).game
  const round = started.content.rounds[0]
  const hostAnswer = _test.applyActionToPartyGame(
    started,
    { userId: 'host', partyId: 'party-1' },
    { type: 'submit_answer', roundId: round.id, answer: round.answerKey },
    '2026-08-24T10:02:00.000Z',
  ).game
  assert.equal(hostAnswer.status, 'in_round')
  const guestAnswer = _test.applyActionToPartyGame(
    hostAnswer,
    { userId: 'guest', partyId: 'party-1' },
    { type: 'submit_answer', roundId: round.id, answer: round.answerKey },
    '2026-08-24T10:02:10.000Z',
  ).game
  assert.equal(guestAnswer.status, 'between_rounds')
})
