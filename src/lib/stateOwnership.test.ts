import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isUserOwnedState } from './stateOwnership.ts'

/**
 * This decides which endpoint a document is written to, and getting it wrong is
 * silent in development and fatal in production: a student-owned key that is not
 * matched here goes to the shared catalogue store, which only an admin may
 * write, so every save is refused by the server and the work is dropped.
 */

test('a student\'s own work is routed to their own record', () => {
  assert.equal(isUserOwnedState('nishany.notebook.a3f9'), true)
  assert.equal(isUserOwnedState('nishany.whiteboard.b1'), true)
  assert.equal(isUserOwnedState('nishany.calendar.blocks'), true)
  assert.equal(isUserOwnedState('nishany.qbank.attempts'), true)
  assert.equal(isUserOwnedState('nishany.progress.mastery.v1'), true)
  assert.equal(isUserOwnedState('nishany.annotations.doc-1.shard-0'), true)
  assert.equal(isUserOwnedState('nishany.bookmarks.resources.v1'), true)
  assert.equal(isUserOwnedState('nishany.account.audience.v1'), true)
  assert.equal(isUserOwnedState('nishany.essay.answers.v1'), true)
  assert.equal(isUserOwnedState('nishany.termgrid.progress.v1'), true)
  assert.equal(isUserOwnedState('nishany.maristanas.onboarding.v1'), true)
})

test('a student\'s flashcard decks and schedules are their own record', () => {
  // Same convention as the qbank prefix above: a dotted namespace under
  // nishany.flashcards. belongs to the student who owns the deck's schedule,
  // never to the shared catalogue that holds the deck's content.
  assert.equal(isUserOwnedState('nishany.flashcards.decks.v1'), true)
  assert.equal(isUserOwnedState('nishany.flashcards.dailyCounts.v1'), true)
})

test('every library key a student writes is their own', () => {
  assert.equal(isUserOwnedState('nishany.library.read'), true)
  assert.equal(isUserOwnedState('nishany.library.userArticles'), true)
  assert.equal(isUserOwnedState('nishany.library.personalTags'), true)
  // Highlights and sticky notes on articles.
  assert.equal(isUserOwnedState('nishany.library.marks.v1'), true)
})

test('the shared catalogue is not mistaken for a student\'s own', () => {
  // These are admin-written and student-read. Routing one to the per-user store
  // would give every student their own private copy of the whole library.
  assert.equal(isUserOwnedState('nishany-admin-content-ledger-v4'), false)
  assert.equal(isUserOwnedState('nishany-academic-universities-v1'), false)
  assert.equal(isUserOwnedState('nishany-medical-library-taxonomy-v1'), false)
  assert.equal(isUserOwnedState('nishany-module-schedules-v1'), false)
  assert.equal(isUserOwnedState('nishany-concept-graph-v2'), false)
})

test('a library key that is not a student\'s stays shared', () => {
  // The prefix alone must not be enough, or a future admin-owned library
  // document would silently become per-student.
  assert.equal(isUserOwnedState('nishany.library.publishedIndex'), false)
})

test('a student\'s own uploads and share links are their own record', () => {
  // Both reached the shared admin store under their old, undotted names, where
  // a student is refused every read and every write of them.
  assert.equal(isUserOwnedState('nishany.myDocuments.v1'), true)
  assert.equal(isUserOwnedState('nishany.account.shares.v1'), true)
})

test('the retired onboarding key is not quietly matched again', () => {
  // Whether an account has been enrolled is the server's answer now, read from
  // `/api/me`. Nothing should route this to either store.
  assert.equal(isUserOwnedState('nishany-onboarding-v1'), false)
})
