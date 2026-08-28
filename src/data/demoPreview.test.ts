import assert from 'node:assert/strict'
import test from 'node:test'
import { ATTEMPT_INDEX_KEY, attemptMonthKey, type AttemptIndex, type AttemptMonth } from './attempts.ts'
import { CONTENT_LEDGER_STORAGE_KEY, type ManagedContentItem } from './contentControl.ts'
import { PRACTICAL_PROGRESS_STORAGE_KEY } from './practicalProgress.ts'
import { STUDY_BLOCKS_STORAGE_KEY } from './studyBlocks.ts'
import { WHITEBOARD_COLLECTION_KEY, type WhiteboardCollection } from './whiteboard.ts'
import {
  DEMO_NOTEBOOK_KEY,
  DEMO_SESSION_NAMES_KEY,
  DEMO_SHOWCASE_MARKER_KEY,
  DEMO_SHOWCASE_VERSION,
  demoManagedContent,
  seedDemoShowcase,
} from './demoPreview.ts'

class MemoryStorage {
  private values = new Map<string, string>()

  getItem(key: string): string | null {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

function read<T>(storage: MemoryStorage, key: string): T {
  const raw = storage.getItem(key)
  assert.ok(raw, `${key} should be populated`)
  return JSON.parse(raw) as T
}

const now = new Date('2026-08-24T12:00:00.000Z')

test('an untouched local showcase receives populated, clearly scoped previews', () => {
  const storage = new MemoryStorage()
  seedDemoShowcase(storage, now)

  const content = read<ManagedContentItem[]>(storage, CONTENT_LEDGER_STORAGE_KEY)
  assert.equal(content.filter((item) => item.kind === 'question' && item.status === 'Published').length, 11)
  assert.equal(content.some((item) => item.kind === 'histology' && item.status === 'Published'), true)
  assert.equal(content.some((item) => item.kind === 'deck' && item.status === 'Published'), true)
  assert.equal(content.some((item) => item.kind === 'essay' && item.status === 'Published'), true)

  const blocked = content.find((item) => item.id === 'demo-media-request-question')
  assert.equal(blocked?.status, 'In review')
  assert.equal(blocked?.questionData?.mediaRequests?.[0]?.status, 'needed')

  const index = read<AttemptIndex>(storage, ATTEMPT_INDEX_KEY)
  assert.equal(index.totals.attempts, 44)
  assert.equal(index.totals.marked, 44)
  const august = read<AttemptMonth>(storage, attemptMonthKey('2026-08'))
  assert.equal(august.records.length, 44)

  assert.equal(Object.keys(read<Record<string, string>>(storage, DEMO_SESSION_NAMES_KEY)).length, 4)
  assert.equal(read<unknown[]>(storage, STUDY_BLOCKS_STORAGE_KEY).length, 5)
  assert.equal(read<unknown[]>(storage, DEMO_NOTEBOOK_KEY).length, 2)
  assert.equal(read<WhiteboardCollection>(storage, WHITEBOARD_COLLECTION_KEY).boards.length, 2)
  assert.ok(read<Record<string, unknown>>(storage, PRACTICAL_PROGRESS_STORAGE_KEY).stations)
  assert.equal(storage.getItem(DEMO_SHOWCASE_MARKER_KEY), DEMO_SHOWCASE_VERSION)
})

test('seeding never overwrites existing authored content or personal work', () => {
  const storage = new MemoryStorage()
  const authored = { ...demoManagedContent(now)[0], title: 'My locally edited title' }
  const personalNote = { id: 'mine', title: 'Keep me', body: '', tags: [], updatedAt: now.toISOString() }
  storage.setItem(CONTENT_LEDGER_STORAGE_KEY, JSON.stringify([authored]))
  storage.setItem(DEMO_NOTEBOOK_KEY, JSON.stringify([personalNote]))
  storage.setItem(ATTEMPT_INDEX_KEY, JSON.stringify({
    version: 1,
    months: ['2026-08'],
    totals: { attempts: 1, marked: 1, correct: 1, lastAt: now.toISOString() },
  }))

  seedDemoShowcase(storage, now)

  const content = read<ManagedContentItem[]>(storage, CONTENT_LEDGER_STORAGE_KEY)
  assert.equal(content.find((item) => item.id === authored.id)?.title, 'My locally edited title')
  assert.deepEqual(read<unknown[]>(storage, DEMO_NOTEBOOK_KEY), [personalNote])
  assert.equal(read<AttemptIndex>(storage, ATTEMPT_INDEX_KEY).totals.attempts, 1)
})

test('the version marker makes repeat bootstrap idempotent', () => {
  const storage = new MemoryStorage()
  seedDemoShowcase(storage, now)
  const before = storage.getItem(CONTENT_LEDGER_STORAGE_KEY)
  seedDemoShowcase(storage, new Date('2026-09-01T12:00:00.000Z'))
  assert.equal(storage.getItem(CONTENT_LEDGER_STORAGE_KEY), before)
})
