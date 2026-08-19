# Qbank Session Work Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give a student three collections of questions worth returning to — flagged, got wrong, omitted — a way out of a running test that does not destroy it, and a runner that gets out of the way while they are in one.

**Architecture:** One new pure module derives the three collections from records that already exist (the flag store and the attempt log) plus one new stored fact (which questions each sitting contained). The Question Bank page consumes it; three small components are extracted into `src/components/qbank/` so the 1,296-line page does not grow further. A shell-level context lets a running test collapse the sidebar without writing the student's own preference.

**Tech Stack:** React 19, TypeScript (strict, `noUnusedLocals` on), Tailwind v4, `node --test --experimental-strip-types` for pure modules. No new dependencies.

## Global Constraints

- **Install dependencies first.** This worktree's `node_modules` is empty, so
  `npm install` must run once before any command below. Nothing in this plan
  adds a dependency.
- **Never claim done without `npx tsc -b` green.** `noUnusedLocals` is on — an unused import fails the build.
- **Run the full unit suite with `npm test`.** A single file: `node --test --experimental-strip-types src/data/qbankCollections.test.ts`.
- **Tested modules import relatively with an explicit `.ts` extension** (`./qbankScope.ts`), because `node --test` cannot resolve the `@/` Vite alias. Untested modules and components use `@/`.
- **Every student-facing string goes through `useT()`** — `t('Some text')`. The codebase is bilingual with full RTL.
- **Use logical CSS properties** (`ps-`/`pe-`/`start-`/`end-`, never `pl-`/`pr-`/`left-`/`right-`) — the app runs RTL.
- **Storage keys for student-owned state must start with `synapse.qbank.`** so `isUserOwnedState` routes them to the student's own record. Do not edit `src/lib/stateOwnership.ts` — the existing `/^synapse\.qbank\./` pattern already covers this plan's key.
- **Prune bound is 600 sittings**, exported as `MAX_STORED_SITTINGS`.
- **Comments explain why, not what.** This codebase's comments state the problem the code solves. Match that; do not narrate the code.
- **Commit after each task** with a message in the repo's voice — a plain sentence about what a person can now do, not a Conventional Commit prefix. See `git log` for the register.

---

## File Structure

**Created:**

| Path | Responsibility |
|---|---|
| `src/data/qbankCollections.ts` | Pure derivations: latest verdicts, the three collections, scope from a question set, manifest pruning. No storage, no React. |
| `src/data/qbankCollections.test.ts` | Unit tests for the above. |
| `src/components/shell/ImmersionContext.tsx` | `ImmersionProvider` + `useImmersion()` — lets a running surface collapse the chrome without writing the stored preference. |
| `src/components/qbank/EndSessionDialog.tsx` | The two-way exit from a running test. |
| `src/components/qbank/ContinueCard.tsx` | The paused-sitting card on the hub. |
| `src/components/qbank/QuestionCollections.tsx` | The Flagged & missed tab: three panels, three actions each. |

**Modified:**

| Path | Change |
|---|---|
| `src/lib/useAttemptLog.ts` | Add `useRecordAttempts` — a bulk writer that cannot undercount the index. |
| `src/pages/student/QuestionBank.tsx` | Manifests, commit-on-submit, strikethrough, the End dialog, the Continue card, the collections tab, the Draw-from filter, immersion. |
| `src/components/shell/AppShell.tsx` | Host `ImmersionProvider`; the sidebar follows `immersive \|\| collapsed`. |
| `src/pages/student/Resources.tsx` | Move the Organise-by control back into the Files/Videos row. |

**Defects fixed along the way** (each is load-bearing for a feature in this plan, and each is called out in the task that fixes it):

1. A timed sitting writes **zero** attempt records (Task 4).
2. A test's name is filed under the **outgoing** session id, so named tests show as untitled (Task 4).
3. Opening a past test for review **overwrites the paused live session**, destroying it (Task 7).

---

### Task 1: Collection derivations

**Files:**
- Create: `src/data/qbankCollections.ts`
- Test: `src/data/qbankCollections.test.ts`

**Interfaces:**
- Consumes: `AttemptRecord` from `./attempts.ts`; `Question` from `./qbank.ts`; `LibTopic` from `./library.ts`; `subtopicKey`, `topicKey`, `Scope` from `./qbankScope.ts`.
- Produces:
  - `type SessionManifests = Record<string, string[]>`
  - `MAX_STORED_SITTINGS: number` (600)
  - `latestVerdicts(records: AttemptRecord[]): Map<string, boolean>`
  - `incorrectIds(records: AttemptRecord[]): Set<string>`
  - `omittedIds(manifests: SessionManifests, records: AttemptRecord[]): Set<string>`
  - `questionsById(pool: Question[], ids: Set<string>): Question[]`
  - `scopeFromQuestions(questions: Question[], libraryTopics: LibTopic[]): Scope`
  - `pruneManifests(manifests: SessionManifests, limit?: number): SessionManifests`

- [ ] **Step 1: Write the failing test**

Create `src/data/qbankCollections.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  incorrectIds, latestVerdicts, omittedIds, pruneManifests, questionsById, scopeFromQuestions,
} from './qbankCollections.ts'
import type { AttemptRecord } from './attempts.ts'
import type { Question } from './qbank.ts'
import type { LibTopic } from './library.ts'

function record(itemId: string, correct: boolean | null, at: string, sessionId = 's1'): AttemptRecord {
  return {
    id: `${sessionId}:qbank:${itemId}`,
    at, surface: 'qbank', itemId,
    subjectId: 'cvs', topic: 'Heart failure', difficulty: 'Moderate',
    conceptIds: [], correct, seconds: null, sessionId,
  }
}

function question(id: string, topic: string, refIds: string[] = []): Question {
  return {
    id, subjectId: 'cvs', topic, difficulty: 'Moderate', vignette: '', stem: id,
    options: [], explanation: '',
    libraryRefs: refIds.map((refId) => ({ id: refId, title: refId })),
    resourceRefs: [],
  } as unknown as Question
}

const LIBRARY: LibTopic[] = [{
  id: 'hf',
  title: 'Heart failure',
  subjectId: 'cvs',
  subtopics: [{ id: 'hf-path', title: 'Pathophysiology' } as LibTopic['subtopics'][number]],
}]

test('the latest verdict wins, not the first', () => {
  const records = [
    record('q1', false, '2026-08-01T09:00:00.000Z', 's1'),
    record('q1', true, '2026-08-05T09:00:00.000Z', 's2'),
  ]
  assert.equal(latestVerdicts(records).get('q1'), true)
})

test('an unmarked record does not clear a verdict', () => {
  // A station is ticked against a checklist, not marked against a key. It is
  // evidence of practice and says nothing about whether the student was right,
  // so it must not take a question out of the wrong list.
  const records = [
    record('q1', false, '2026-08-01T09:00:00.000Z', 's1'),
    record('q1', null, '2026-08-05T09:00:00.000Z', 's2'),
  ]
  assert.equal(latestVerdicts(records).get('q1'), false)
})

test('getting a question right takes it out of the wrong list', () => {
  const wrong = [record('q1', false, '2026-08-01T09:00:00.000Z', 's1')]
  assert.deepEqual([...incorrectIds(wrong)], ['q1'])
  const fixed = [...wrong, record('q1', true, '2026-08-05T09:00:00.000Z', 's2')]
  assert.deepEqual([...incorrectIds(fixed)], [])
})

test('a question a sitting served but never recorded is omitted', () => {
  const manifests = { s1: ['q1', 'q2'] }
  const records = [record('q1', true, '2026-08-01T09:00:00.000Z', 's1')]
  assert.deepEqual([...omittedIds(manifests, records)], ['q2'])
})

test('answering a question in any sitting takes it out of the omitted list', () => {
  // Omitted means "served, never attempted". Once a student has answered it
  // anywhere the list has done its job and should stop offering it.
  const manifests = { s1: ['q1', 'q2'] }
  const records = [
    record('q1', true, '2026-08-01T09:00:00.000Z', 's1'),
    record('q2', false, '2026-08-06T09:00:00.000Z', 's2'),
  ]
  assert.deepEqual([...omittedIds(manifests, records)], [])
})

test('questionsById keeps the pool order and drops unpublished ids', () => {
  const pool = [question('q1', 'Heart failure'), question('q2', 'Asthma')]
  assert.deepEqual(questionsById(pool, new Set(['q2', 'q1', 'gone'])).map((q) => q.id), ['q1', 'q2'])
})

test('a scope covers the subtopics referenced and the topics named', () => {
  const scope = scopeFromQuestions([question('q1', 'Heart failure', ['hf-path'])], LIBRARY)
  assert.deepEqual([...scope].sort(), ['s:hf-path', 't:hf'])
})

test('a question naming a topic the library does not cover contributes no topic key', () => {
  const scope = scopeFromQuestions([question('q1', 'Cardiac cycle', [])], LIBRARY)
  assert.deepEqual([...scope], [])
})

test('pruning keeps the most recent sittings and drops the oldest', () => {
  const manifests = { s1: ['q1'], s2: ['q2'], s3: ['q3'] }
  assert.deepEqual(pruneManifests(manifests, 2), { s2: ['q2'], s3: ['q3'] })
})

test('pruning leaves a map under the limit untouched', () => {
  const manifests = { s1: ['q1'] }
  assert.equal(pruneManifests(manifests, 2), manifests)
})
```

- [ ] **Step 2: Run the test and watch it fail**

```bash
node --test --experimental-strip-types src/data/qbankCollections.test.ts
```

Expected: FAIL — `Cannot find module ... qbankCollections.ts`.

- [ ] **Step 3: Write the implementation**

Create `src/data/qbankCollections.ts`:

```ts
import type { AttemptRecord } from './attempts.ts'
import type { Question } from './qbank.ts'
import type { LibTopic } from './library.ts'
import { subtopicKey, topicKey, type Scope } from './qbankScope.ts'

/**
 * The questions a student can come back to.
 *
 * Three collections, and the evidence behind each one lives somewhere
 * different. Flags are their own stored list. Wrong answers are a query over
 * the attempt log. Omissions are neither: the log only receives a question once
 * its answer is checked, so a skipped question writes nothing at all, and the
 * only way to know one was skipped is to know what the sitting contained.
 * `SessionManifests` is that record.
 *
 * Getting a question right takes it out of the wrong list, and answering one
 * takes it out of the omitted list. Both are working sets a student can empty.
 * A permanent record of every mistake would only ever grow, which is the
 * opposite of something to revise from.
 */

/** Which questions each finished sitting contained, in the order they were sat. */
export type SessionManifests = Record<string, string[]>

/**
 * How many sittings the manifest map keeps.
 *
 * `usePersistentState` rewrites a whole document on every change, so this map
 * has to be bounded. It is written only when a sitting begins or a test is
 * deleted — never per answer — so the bound is set high enough that no real
 * student reaches it rather than low enough to keep the document small.
 */
export const MAX_STORED_SITTINGS = 600

/** The surfaces whose records count as sitting a question from the bank. */
const QUESTION_SURFACES: ReadonlySet<string> = new Set(['qbank', 'room'])

/**
 * The most recent marked verdict per question.
 *
 * Unmarked records are skipped rather than treated as wrong: a station is
 * ticked by the student against a checklist, so it is evidence of practice and
 * says nothing about correctness.
 */
export function latestVerdicts(records: AttemptRecord[]): Map<string, boolean> {
  const latest = new Map<string, { at: string; correct: boolean }>()
  for (const entry of records) {
    if (!QUESTION_SURFACES.has(entry.surface) || entry.correct === null) continue
    const seen = latest.get(entry.itemId)
    if (seen && seen.at >= entry.at) continue
    latest.set(entry.itemId, { at: entry.at, correct: entry.correct })
  }
  const out = new Map<string, boolean>()
  latest.forEach((entry, itemId) => out.set(itemId, entry.correct))
  return out
}

export function incorrectIds(records: AttemptRecord[]): Set<string> {
  const out = new Set<string>()
  latestVerdicts(records).forEach((correct, itemId) => {
    if (!correct) out.add(itemId)
  })
  return out
}

/**
 * Served by a sitting, and never answered anywhere since.
 *
 * Order does not come into it. A question the student has attempted at any
 * point is one they have engaged with, so it leaves the list whichever sitting
 * the attempt belongs to — which also means this needs no timestamp for the
 * sitting itself, and a manifest is enough.
 */
export function omittedIds(manifests: SessionManifests, records: AttemptRecord[]): Set<string> {
  const answered = new Set<string>()
  for (const entry of records) {
    if (!QUESTION_SURFACES.has(entry.surface)) continue
    answered.add(entry.itemId)
  }
  const out = new Set<string>()
  for (const questionIds of Object.values(manifests)) {
    for (const id of questionIds) {
      if (!answered.has(id)) out.add(id)
    }
  }
  return out
}

/** The published questions behind a set of ids, in pool order. */
export function questionsById(pool: Question[], ids: Set<string>): Question[] {
  return pool.filter((question) => ids.has(question.id))
}

/**
 * The scope a set of questions implies — the topics they came from, not the
 * questions themselves.
 *
 * `questionsInScope` matches either a subtopic id carried by a library
 * reference or a topic title, so both kinds of key are emitted. A question
 * naming a topic outside the tree it is given contributes nothing; callers pass
 * the merged `chooserTopics` tree, where every topic the bank names exists.
 */
export function scopeFromQuestions(questions: Question[], libraryTopics: LibTopic[]): Scope {
  const byTitle = new Map<string, string>()
  for (const topic of libraryTopics) byTitle.set(topic.title.trim().toLowerCase(), topic.id)

  const scope: Scope = new Set()
  for (const question of questions) {
    for (const ref of question.libraryRefs) scope.add(subtopicKey(ref.id))
    const topicId = byTitle.get((question.topic ?? '').trim().toLowerCase())
    if (topicId) scope.add(topicKey(topicId))
  }
  return scope
}

/**
 * Keep the newest `limit` sittings.
 *
 * Insertion order is the chronological order: sittings are added as they are
 * started, and a session id is never an integer-like key, so both the object
 * and its JSON round-trip preserve it. Returns the input untouched when it is
 * already within the limit, so a write is only made when one is needed.
 */
export function pruneManifests(
  manifests: SessionManifests,
  limit = MAX_STORED_SITTINGS,
): SessionManifests {
  const keys = Object.keys(manifests)
  if (keys.length <= limit) return manifests
  const out: SessionManifests = {}
  for (const key of keys.slice(keys.length - limit)) out[key] = manifests[key]
  return out
}
```

- [ ] **Step 4: Run the test and watch it pass**

```bash
node --test --experimental-strip-types src/data/qbankCollections.test.ts
```

Expected: PASS — 10 tests, 0 failures.

- [ ] **Step 5: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/data/qbankCollections.ts src/data/qbankCollections.test.ts
git commit -m "Work out which questions are worth going back to"
```

---

### Task 2: Move Organise by back to the right

**Files:**
- Modify: `src/pages/student/Resources.tsx:242-276` (the Files/Videos row) and `:281-287` (the block being moved)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks rely on. Independent — it can land in any order.

This is the whole of slice B. The row's own comment at `Resources.tsx:242` already reads *"Prominent Files / Videos switch + organize-by control"* — the control was moved out of it into the collapsible filter bar, and this puts it back so the comment is true again.

- [ ] **Step 1: Cut the control out of the filter bar**

In `src/pages/student/Resources.tsx`, delete this block (currently the first child of the filter bar's `<div className="mb-4 space-y-3">`), including its comment:

```tsx
        {/* Promoted out of a small inline label: this decides the shape of the
            whole page, and it used to reset to System on every visit. It sits
            with the filters because grouping and filtering are one decision. */}
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 shadow-panel">
          <Icon icon={FolderTree} size={15} className="text-ink-3" />
          <span className="text-[12.5px] font-medium text-ink-2">{t('Organise by')}</span>
          <Segmented value={groupBy} onChange={(v) => setGroupBy(v as 'system' | 'module')} items={[{ value: 'system', label: t('System') }, { value: 'module', label: t('Module') }]} />
        </div>
```

- [ ] **Step 2: Paste it into the switch row, ahead of the filter controls**

In the same file, inside `<div className={cn('flex items-center gap-2', section === 'mine' && 'hidden')}>`, add it as the **first** child — before the `activeFilters` button — so it sits at the end of the row, which is the right of the screen in LTR and the left in RTL:

```tsx
        <div className={cn('flex items-center gap-2', section === 'mine' && 'hidden')}>
          {/* Back on the row it names. Grouping decides the shape of the whole
              page, so it does not belong folded away inside the filters — a
              student had to open a panel to find out why the page looked as it
              did. Hidden on My uploads, which has no folders to group. */}
          <div className="hidden items-center gap-2 sm:inline-flex">
            <Icon icon={FolderTree} size={15} className="text-ink-3" />
            <span className="text-[12.5px] font-medium text-ink-2">{t('Organise by')}</span>
            <Segmented value={groupBy} onChange={(v) => setGroupBy(v as 'system' | 'module')} items={[{ value: 'system', label: t('System') }, { value: 'module', label: t('Module') }]} />
          </div>
```

The `hidden sm:inline-flex` keeps a phone's switch row from wrapping into two lines; the control still reaches phone users because the row itself scrolls.

- [ ] **Step 3: Typecheck**

```bash
npx tsc -b
```

Expected: no output. If it reports `'FolderTree' is declared but its value is never read`, the Step 1 deletion removed the last use — re-check that Step 2 was applied.

- [ ] **Step 4: Check it in the browser**

Start the preview with the `preview_start` tool (never `npm run dev` in Bash), open `/app/resources`, and confirm: Organise by sits at the end of the Files / Videos / My uploads row; switching to My uploads hides it; switching System ↔ Module still regroups the folders.

- [ ] **Step 5: Commit**

```bash
git add src/pages/student/Resources.tsx
git commit -m "Put the grouping control back where it names"
```

---

### Task 3: Retract the menu while a test is running

**Files:**
- Create: `src/components/shell/ImmersionContext.tsx`
- Modify: `src/components/shell/AppShell.tsx`
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `ImmersionProvider` (component, `{ children: ReactNode }`) and `useImmersion(): { immersive: boolean; setImmersive: (on: boolean) => void }`, both exported from `@/components/shell/ImmersionContext`. Task 5 and Task 7 do not use it; later slices (the practical runner, party sessions) will.

- [ ] **Step 1: Write the context**

Create `src/components/shell/ImmersionContext.tsx`:

```tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * A surface asking for the chrome to get out of the way, for as long as it is
 * running.
 *
 * Deliberately not the stored `synapse.shell.sidebarCollapsed` preference: that
 * belongs to the student, and sitting one test should not quietly change how
 * their app looks afterwards. This is a request that lasts as long as the
 * surface making it, and the preference is what the shell falls back to the
 * moment it stops.
 *
 * A context rather than a route check because a running test is a phase inside
 * the Question Bank route, not a route of its own.
 */
interface Immersion {
  immersive: boolean
  setImmersive: (on: boolean) => void
}

const ImmersionCtx = createContext<Immersion>({ immersive: false, setImmersive: () => undefined })

export function ImmersionProvider({ children }: { children: ReactNode }) {
  const [immersive, setImmersive] = useState(false)
  const value = useMemo(() => ({ immersive, setImmersive }), [immersive])
  return <ImmersionCtx.Provider value={value}>{children}</ImmersionCtx.Provider>
}

export function useImmersion(): Immersion {
  return useContext(ImmersionCtx)
}
```

- [ ] **Step 2: Host it in the shell and follow it**

In `src/components/shell/AppShell.tsx`:

1. Add the import beside the other shell imports:

```tsx
import { ImmersionProvider, useImmersion } from './ImmersionContext'
```

2. Rename the existing exported component to `AppShellInner` (change only the `export function AppShell(` line to `function AppShellInner(`) and add a new export at the bottom of the file:

```tsx
/** The provider has to sit above the routed page, which is what asks for it. */
export function AppShell({ portal }: { portal: Portal }) {
  return (
    <ImmersionProvider>
      <AppShellInner portal={portal} />
    </ImmersionProvider>
  )
}
```

3. Inside `AppShellInner`, immediately after the `useLocalPreference` calls, derive the effective state:

```tsx
  const { immersive } = useImmersion()
  // The student's own preference is never written by a test — it is only
  // overridden while one is running, and comes straight back afterwards.
  const railed = collapsed || immersive
```

4. Replace `collapsed` with `railed` in **three** places, leaving `toggleCollapsed` alone so the toggle still writes the student's own preference:

   - the desktop `<aside>` width: `collapsed ? 'w-(--spacing-sidebar-collapsed)' : 'w-(--spacing-sidebar)'` becomes `railed ? …`
   - the main column's padding: `collapsed ? 'lg:ps-(--spacing-sidebar-collapsed)' : 'lg:ps-(--spacing-sidebar)'` becomes `railed ? …`
   - the desktop sidebar's own prop:

```tsx
        <Sidebar portal={portal} collapsed={railed} onToggleCollapse={toggleCollapsed} />
```

   The **mobile drawer's** `<Sidebar portal={portal} collapsed={false} …>` is left exactly as it is — a drawer is never a rail.

- [ ] **Step 3: Ask for it from the Question Bank**

In `src/pages/student/QuestionBank.tsx`, add the import:

```tsx
import { useImmersion } from '@/components/shell/ImmersionContext'
```

and inside `export function QuestionBank()`, after the existing `useState` declarations:

```tsx
  // Sitting a test is the one thing here that wants the width, and the one
  // thing a student should not have to tidy the screen for first.
  const { setImmersive } = useImmersion()
  useEffect(() => {
    setImmersive(phase === 'running')
    return () => setImmersive(false)
  }, [phase, setImmersive])
```

- [ ] **Step 4: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 5: Check it in the browser**

Open `/app/qbank`, start a session, and confirm the sidebar narrows to the icon rail. Press "End session" to return to the hub and confirm it expands again. Collapse it by hand from the hub, start a test, end it, and confirm it is still collapsed — the preference was not overwritten.

- [ ] **Step 6: Commit**

```bash
git add src/components/shell/ImmersionContext.tsx src/components/shell/AppShell.tsx src/pages/student/QuestionBank.tsx
git commit -m "Give a running test the width, and give the menu back afterwards"
```

---

### Task 4: Remember what a sitting contained, and record a timed one

**Files:**
- Modify: `src/lib/useAttemptLog.ts`
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: `pruneManifests` and the `SessionManifests` type from Task 1. Not `MAX_STORED_SITTINGS` — it is the default parameter of `pruneManifests`, and importing it unused would fail `noUnusedLocals`.
- Produces:
  - `useRecordAttempts(): (inputs: Array<Omit<AttemptRecord, 'id' | 'at'>>) => void` from `@/lib/useAttemptLog`
  - Inside `QuestionBank`: `SESSION_QUESTIONS_STORAGE_KEY = 'synapse.qbank.sessionQuestions.v1'`, the `sessionQuestions` state pair, `beginSession(picked: Question[], id: string)`, and `commitAnswers(): void`. Tasks 5, 8 and 9 all call these.

**Two defects are fixed here**, both because this task's feature cannot work around them:

- **Timed sittings record nothing.** `checkAnswer` is the only caller of `logAttempt`, and its button renders only under `mode === 'tutor'` (`QuestionBank.tsx:1264`). Without a fix, the "got wrong" collection is empty for every timed test.
- **A test's name is filed under the wrong id.** `start()` writes `savedNames[sessionId]` and *then* `beginSession` calls `setSessionId(newSessionId())`, so the name lands on the outgoing id while the records land on the new one. Manifests would have the same bug, so the id is now generated by the caller.

- [ ] **Step 1: Write the bulk attempt writer**

In `src/lib/useAttemptLog.ts`, add after `useRecordAttempt`:

```ts
/**
 * Add several records at once.
 *
 * `useRecordAttempt` refuses a duplicate by comparing the index's `lastAt` with
 * the record's own timestamp, which is right for one answer committed on a
 * click and wrong for twenty committed in a loop: those all land in the same
 * millisecond, and every record after the first would be dropped from the
 * totals. This reads the shard instead and folds exactly what is new.
 */
export function useRecordAttempts() {
  const month = attemptMonth(new Date())
  const [shard, setMonth] = usePersistentState<AttemptMonth>(attemptMonthKey(month), () => emptyMonth(month))
  const [, setIndex] = usePersistentState<AttemptIndex>(ATTEMPT_INDEX_KEY, EMPTY_INDEX)

  return useCallback((inputs: Array<Omit<AttemptRecord, 'id' | 'at'>>) => {
    const at = new Date().toISOString()
    const seen = new Set(shard.records.map((record) => record.id))
    const fresh: AttemptRecord[] = []
    for (const input of inputs) {
      const id = attemptId(input)
      if (seen.has(id)) continue
      seen.add(id)
      fresh.push({ ...input, id, at })
    }
    if (!fresh.length) return
    setMonth((current) => fresh.reduce(addAttempt, current))
    setIndex((current) => fresh.reduce(indexAttempt, current))
  }, [shard.records, setIndex, setMonth])
}
```

- [ ] **Step 2: Add the manifest store to the Question Bank**

In `src/pages/student/QuestionBank.tsx`, add to the imports:

```tsx
import { pruneManifests, type SessionManifests } from '@/data/qbankCollections'
import { useAttemptHistory, useDeleteAttemptSession, useRecordAttempt, useRecordAttempts, type AttemptHistory } from '@/lib/useAttemptLog'
```

(the second line replaces the existing `useAttemptLog` import).

Beside `SESSION_NAMES_STORAGE_KEY`, add:

```tsx
/**
 * Which questions each sitting contained.
 *
 * The attempt log only receives a question once its answer is checked, so a
 * skipped one left no trace anywhere the moment its sitting ended. This is the
 * other half of the pair: with both, "served but never attempted" is a fact
 * rather than a guess.
 */
const SESSION_QUESTIONS_STORAGE_KEY = 'synapse.qbank.sessionQuestions.v1'
```

Inside the component, beside `savedNames`:

```tsx
  const [sessionQuestions, setSessionQuestions] = usePersistentState<SessionManifests>(SESSION_QUESTIONS_STORAGE_KEY, {})
```

- [ ] **Step 3: Give `beginSession` the id, and file the manifest under it**

Replace `beginSession` and its two callers:

```tsx
  function beginSession(picked: Question[], id: string) {
    if (!picked.length) return
    // Filed here rather than when the sitting ends: a test abandoned halfway
    // still served its questions, and the ones never reached are still omitted.
    setSessionQuestions((current) => pruneManifests({ ...current, [id]: picked.map((question) => question.id) }))
    setSession(picked)
    setSessionId(id)
    setIdx(0)
    setAnswers({})
    setChecked({})
    setReviewing(false)
    setElapsed(0)
    questionStartedAt.current = 0
    setVisited(new Set([0]))
    setShowAllRationales(false)
    setPhase('running')
  }
```

```tsx
  function start() {
    // The id is made here, not inside `beginSession`. It used to be made there,
    // after this line had already filed the name — so every name a student
    // typed was stored against the sitting they had just left, and the sitting
    // they were starting showed as untitled ever after.
    const id = newSessionId()
    setSavedNames((current) => ({ ...current, [id]: sessionName.trim() || autoSessionName }))
    beginSession(shuffle(available).slice(0, Math.min(count, available.length)), id)
  }

  function startPreset(kind: 'weak' | 'emergency' | 'demanding' | 'everything') {
    beginSession(shuffle(presetPool(kind)).slice(0, count), newSessionId())
  }
```

- [ ] **Step 4: Drop a deleted test's manifest**

In `deleteSession`, after the `setSavedNames` call:

```tsx
    setSessionQuestions((current) => {
      const next = { ...current }
      delete next[sessionId]
      return next
    })
```

- [ ] **Step 5: Commit every answered question**

Add `const logAttempts = useRecordAttempts()` beside the existing `const logAttempt = useRecordAttempt()`.

Both writers need the same record built the same way, so extract the builder first. Add it beside `checkAnswer`:

```tsx
  /**
   * The record one answer produces, and the mastery evidence that goes with it.
   *
   * Shared by the two writers so they cannot drift: one commits a single answer
   * as it is checked, the other commits a whole sitting at the end, and a
   * question must not be worth different things depending on which ran.
   */
  function attemptFor(question: Question, chosenIndex: number, seconds: number | null) {
    const correct = Boolean(question.options[chosenIndex]?.correct)
    const conceptIds = question.conceptIds ?? []
    // The mastery ledger only takes concept-tagged evidence, but the attempt
    // log takes every answer: an untagged question still happened.
    if (conceptIds.length) record({ conceptIds, source: 'question', correct })
    return {
      surface: 'qbank' as const,
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: question.difficulty,
      conceptIds,
      correct,
      seconds,
      sessionId,
    }
  }
```

Rewrite `checkAnswer`'s body to use it, keeping its existing guards and timing exactly as they are:

```tsx
  function checkAnswer() {
    setChecked((c) => ({ ...c, [q.id]: true }))
    if (checked[q.id] || chosen == null) return
    logAttempt(attemptFor(q, chosen, mode === 'timed' ? Math.max(0, elapsed - questionStartedAt.current) : null))
    questionStartedAt.current = elapsed
  }
```

Then add the bulk writer:

```tsx
  /**
   * Write a record for every answered question that does not have one.
   *
   * `checkAnswer` is the only other writer and its button only exists in tutor
   * mode, so a timed sitting used to reach its results having recorded nothing
   * at all: it never appeared in Previous tests, never moved the student's
   * accuracy, and left every question they got wrong invisible to the list
   * that is meant to collect them.
   *
   * `seconds` is null here. The per-question timer is only meaningful for an
   * answer committed as it was given; a sitting submitted at the end cannot say
   * how long any one question took, and inventing a figure would put a
   * measurement in the log that nothing measured.
   */
  function commitAnswers() {
    const pending = session.filter((question) => answers[question.id] != null && !checked[question.id])
    if (!pending.length) return
    logAttempts(pending.map((question) => attemptFor(question, answers[question.id], null)))
    setChecked((current) => {
      const next = { ...current }
      for (const question of pending) next[question.id] = true
      return next
    })
  }
```

- [ ] **Step 6: Call it when a sitting reaches its results**

In the runner's footer, replace the "See results" handler so finishing the ordinary way records the sitting:

```tsx
            <Button
              variant="primary"
              size="md"
              iconRight={reviewing ? undefined : Trophy}
              onClick={() => { if (!reviewing) commitAnswers(); setPhase('results') }}
            >
              {reviewing ? 'Finish review' : 'See results'}
            </Button>
```

- [ ] **Step 7: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 8: Check it in the browser**

Open `/app/qbank`, name a test, choose **Timed**, sit three questions answering all of them, and press "See results". Then go to **Previous tests** and confirm the sitting is listed **under the name you typed** — both defects in one check. Confirm "Your Qbank" accuracy has moved.

- [ ] **Step 9: Commit**

```bash
git add src/lib/useAttemptLog.ts src/pages/student/QuestionBank.tsx
git commit -m "Keep a record of a timed sitting, and of what it asked"
```

---

### Task 5: End, with two ways out

**Files:**
- Create: `src/components/qbank/EndSessionDialog.tsx`
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: `commitAnswers()` from Task 4.
- Produces: `submitted: boolean` on `LiveSession`, and the `submitted` state pair inside `QuestionBank`. Task 7's Continue card reads `saved.submitted` to decide whether a sitting is still worth offering.

- [ ] **Step 1: Write the dialog**

Create `src/components/qbank/EndSessionDialog.tsx`:

```tsx
import { LogOut, Pause, Trophy } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'

/**
 * The two ways out of a running test.
 *
 * There used to be one button and it did neither cleanly: it left the sitting
 * paused but was called "End session", so a student who wanted to be finished
 * had no way to say so, and one who wanted a break could not tell whether
 * pressing it would throw the work away.
 */
export function EndSessionDialog({
  answered,
  total,
  onLeave,
  onSubmit,
  onClose,
}: {
  answered: number
  total: number
  onLeave: () => void
  onSubmit: () => void
  onClose: () => void
}) {
  const t = useT()
  const unanswered = Math.max(0, total - answered)

  return (
    <Dialog onClose={onClose} label={t('End this test')} size="sm">
      <PanelHeader title={t('End this test?')} icon={LogOut} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {answered} {t('of')} {total} {t('answered')}
          {unanswered > 0 && <> · {unanswered} {t('not yet answered')}</>}
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="secondary" size="md" iconLeft={Pause} onClick={onLeave}>
            {t('Leave for now')}
          </Button>
          <p className="-mt-1 text-[12px] leading-relaxed text-ink-3">
            {t('The test stays where it is. Pick it up from the Question Bank whenever you like.')}
          </p>
          <Button variant="primary" size="md" iconLeft={Trophy} onClick={onSubmit}>
            {t('End and submit')}
          </Button>
          <p className="-mt-1 text-[12px] leading-relaxed text-ink-3">
            {unanswered > 0
              ? t('Marks what you answered and opens your results. Anything left is counted as omitted.')
              : t('Marks your answers and opens your results.')}
          </p>
        </div>
        <div className="border-t border-line pt-3">
          <Button variant="ghost" size="md" className="w-full" onClick={onClose}>
            {t('Cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
```

- [ ] **Step 2: Track whether a sitting has been submitted**

In `src/pages/student/QuestionBank.tsx`, add `submitted: boolean` to the `LiveSession` interface, immediately after `phase`:

```tsx
  phase: Exclude<Phase, 'setup'>
  /** A submitted sitting is finished with — it is never offered to resume. */
  submitted: boolean
  startedAt: string
```

Add the state beside `reviewing`:

```tsx
  const [submitted, setSubmitted] = useState(false)
```

Restore it in the restore effect, beside `setReviewing(saved.reviewing)`:

```tsx
    setSubmitted(saved.submitted ?? false)
```

Mirror it — add `submitted,` to the object passed to `setSaved`, and add `submitted` to that effect's dependency array.

Reset it in `beginSession`, beside `setReviewing(false)`:

```tsx
    setSubmitted(false)
```

- [ ] **Step 3: Wire the dialog into the runner**

Add the import:

```tsx
import { EndSessionDialog } from '@/components/qbank/EndSessionDialog'
```

Add the state beside `reportTarget`:

```tsx
  const [endOpen, setEndOpen] = useState(false)
```

Add the two handlers beside `discardSession`:

```tsx
  /** Step out, keep the sitting. */
  function leaveSession() {
    setEndOpen(false)
    setPhase('setup')
  }

  /** Finish for good: mark what was answered, then show the paper. */
  function submitSession() {
    commitAnswers()
    setSubmitted(true)
    setEndOpen(false)
    setPhase('results')
  }
```

- [ ] **Step 4: Rename the button and make it open the dialog**

In the runner header, replace the existing End button:

```tsx
            <button
              onClick={() => (reviewing ? setPhase('results') : setEndOpen(true))}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line-2 bg-surface px-3 text-[12.5px] font-semibold text-ink shadow-panel transition-colors hover:bg-inset sm:min-h-9"
            >
              <Icon icon={reviewing ? ArrowLeft : LogOut} size={14} />
              {reviewing ? t('Back to results') : t('End')}
            </button>
```

At the bottom of the runner's returned JSX, beside `<ReportContentDialog …>`:

```tsx
      {endOpen && (
        <EndSessionDialog
          answered={session.filter((question) => answers[question.id] != null).length}
          total={session.length}
          onLeave={leaveSession}
          onSubmit={submitSession}
          onClose={() => setEndOpen(false)}
        />
      )}
```

- [ ] **Step 5: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 6: Check it in the browser**

Start a 5-question tutor session, answer two, press **End**. Confirm the dialog reads "2 of 5 answered · 3 not yet answered". Press **Leave for now** — you land on the hub. Start another, answer two, press **End** → **End and submit** — you land on that test's results showing 2 of 5, and it appears in Previous tests.

- [ ] **Step 7: Commit**

```bash
git add src/components/qbank/EndSessionDialog.tsx src/pages/student/QuestionBank.tsx
git commit -m "Let a student step out of a test without ending it"
```

---

### Task 6: Strike an answer out

**Files:**
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: the `LiveSession` shape from Task 5.
- Produces: `struck: Record<string, number[]>` on `LiveSession`. Nothing else reads it.

- [ ] **Step 1: Hold the strikes**

Add `struck: Record<string, number[]>` to `LiveSession`, after `visited`:

```tsx
  visited: number[]
  /** Options the student has ruled out, per question. Scratch marks, not a record. */
  struck: Record<string, number[]>
```

Add the state beside `answers`:

```tsx
  const [struck, setStruck] = useState<Record<string, number[]>>({})
```

Restore it in the restore effect beside `setAnswers(saved.answers)`:

```tsx
    setStruck(saved.struck ?? {})
```

Mirror it — add `struck,` to the `setSaved` object and `struck` to that effect's dependency array. Reset it in `beginSession` beside `setAnswers({})`:

```tsx
    setStruck({})
```

- [ ] **Step 2: Write the toggle**

Add beside `checkAnswer`:

```tsx
  /**
   * Rule an option in or out.
   *
   * Ruling out the option that is currently selected clears the selection:
   * leaving a pick on something the student has just crossed off would submit
   * an answer they have visibly stopped believing.
   */
  function toggleStrike(index: number) {
    const ruledOut = !(struck[q.id] ?? []).includes(index)
    setStruck((current) => {
      const next = new Set(current[q.id] ?? [])
      if (!next.delete(index)) next.add(index)
      return { ...current, [q.id]: [...next] }
    })
    if (ruledOut && answers[q.id] === index) {
      setAnswers((current) => {
        const next = { ...current }
        delete next[q.id]
        return next
      })
    }
  }
```

- [ ] **Step 3: Split the option row into two targets**

Replace the whole `{q.options.map((opt, i) => { … })}` block with:

```tsx
          {q.options.map((opt, i) => {
            const ruledOut = (struck[q.id] ?? []).includes(i)
            const badge = (
              <span
                className={cn(
                  'grid size-6 shrink-0 place-items-center rounded-full border text-[12px] font-semibold',
                  revealed && opt.correct
                    ? 'border-success bg-success text-on-success'
                    : revealed && chosen === i
                      ? 'border-danger bg-danger text-on-danger'
                      : chosen === i
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-line-2 text-ink-2',
                )}
              >
                {revealed && opt.correct ? (
                  <Icon icon={Check} size={14} strokeWidth={2.6} />
                ) : revealed && chosen === i ? (
                  <Icon icon={X} size={14} strokeWidth={2.6} />
                ) : (
                  LETTERS[i]
                )}
              </span>
            )
            const text = (
              <span className={cn('flex-1 pt-0.5 text-[14px] text-ink', ruledOut && 'line-through decoration-ink-3')}>
                <ConceptText text={opt.text} enabled={revealed} />
              </span>
            )
            const shape = cn(
              'flex w-full items-start gap-3 rounded-lg border p-3 text-start transition-colors',
              optionClasses(i),
              ruledOut && !revealed && 'opacity-55',
            )
            return (
              <div key={i}>
                {revealed ? (
                  <div className={shape}>{badge}{text}</div>
                ) : (
                  /* Two targets, not one. The letter answers; the text rules
                     out. A student working an option list crosses things off
                     long before they commit to one, and there was nowhere to
                     put that thinking. */
                  <div className={shape}>
                    <button
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                      aria-label={`${t('Choose answer')} ${LETTERS[i]}`}
                      className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    >
                      {badge}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStrike(i)}
                      aria-pressed={ruledOut}
                      aria-label={`${ruledOut ? t('Rule back in') : t('Rule out')}: ${opt.text}`}
                      className="flex flex-1 cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    >
                      {text}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
```

- [ ] **Step 4: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 5: Check it in the browser**

Start a tutor session. Press an option's **text** — it goes line-through and dims. Press it again — it comes back. Press an option's **letter** — it selects. Select an option, then press its text — the selection clears and it strikes. Navigate to the next question and back — the strikes are still there. Navigate to `/app/library` and back to `/app/qbank`, continue the sitting, and confirm the strikes survived.

- [ ] **Step 6: Commit**

```bash
git add src/pages/student/QuestionBank.tsx
git commit -m "Cross an answer off while you are still thinking"
```

---

### Task 7: Come back to the hub, not into the test

**Files:**
- Create: `src/components/qbank/ContinueCard.tsx`
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: `submitted` on `LiveSession` (Task 5).
- Produces: nothing other tasks rely on.

**A defect is fixed here.** The mirror effect writes `saved` for any phase other than `setup` — including while *reviewing*. So opening a past test from Previous tests overwrote the paused live session, destroying a half-finished sitting. Guarding the mirror on `reviewing` fixes that and stops a read-only view being offered as work in progress.

- [ ] **Step 1: Write the card**

Create `src/components/qbank/ContinueCard.tsx`:

```tsx
import { Play, Trash2 } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Meter } from '@/components/ui/Meter'
import { useT } from '@/lib/i18n'

/**
 * The sitting that is still open.
 *
 * Coming back to the Question Bank used to drop the student straight into it,
 * mid-question, with no view of where they were or chance to do something else
 * first. The sitting is still restored — it is just offered rather than
 * resumed.
 */
export function ContinueCard({
  name,
  answered,
  total,
  onContinue,
  onDiscard,
}: {
  name: string
  answered: number
  total: number
  onContinue: () => void
  onDiscard: () => void
}) {
  const t = useT()
  return (
    <Panel className="mb-4 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent">{t('Still open')}</p>
          <p className="mt-0.5 truncate text-[15px] font-semibold text-ink">{name}</p>
          <div className="mt-2 flex items-center gap-2.5">
            <Meter value={total ? (answered / total) * 100 : 0} tone="accent" className="w-32" />
            <span className="tnum font-mono text-[12px] text-ink-2">
              {answered} {t('of')} {total} {t('answered')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md" iconLeft={Trash2} onClick={onDiscard}>{t('Discard')}</Button>
          <Button variant="primary" size="md" iconLeft={Play} onClick={onContinue}>{t('Continue')}</Button>
        </div>
      </div>
    </Panel>
  )
}
```

- [ ] **Step 2: Restore the sitting, but stay on the hub**

In `src/pages/student/QuestionBank.tsx`, in the restore effect, replace the final line `setPhase(saved.phase)` with:

```tsx
    // Deliberately not `setPhase(saved.phase)`. Everything about the sitting is
    // back — questions, answers, timer, strikes — but the student lands on the
    // hub and chooses to go back in, rather than arriving mid-question with no
    // idea where they are.
```

(i.e. delete the call and leave the comment; `phase` stays at its `'setup'` initial value.)

- [ ] **Step 3: Stop a review clobbering a paused sitting**

In the mirror effect, replace the early return:

```tsx
    // A review is not work in progress. It used to be mirrored like one, so
    // opening a finished test from Previous tests wrote itself over whatever
    // sitting the student had paused — and the paused sitting was gone.
    if (phase === 'setup' || reviewing) return
```

- [ ] **Step 4: Show the card**

Add the import:

```tsx
import { ContinueCard } from '@/components/qbank/ContinueCard'
```

In the setup branch, immediately after `<PageHeader title={t('Question Bank')} />` and before the Quick start `<section>`:

```tsx
        {saved && !saved.submitted && saved.questionIds.length > 0 && (
          <ContinueCard
            name={savedNames[saved.sessionId] ?? t('Untitled test')}
            answered={Object.keys(saved.answers).length}
            total={saved.questionIds.length}
            onContinue={resumeSaved}
            onDiscard={discardSession}
          />
        )}
```

- [ ] **Step 5: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 6: Check it in the browser**

Start a named 10-question session, answer three, click **Library** in the sidebar, then click **Question Bank**. You land on the hub with a "Still open" card naming the test and reading "3 of 10 answered". Press **Continue** — you are back on question 4 with your answers and strikes. Press **End → End and submit**, return to the hub, and confirm the card is gone. Then, with a *different* sitting paused, open a finished test from **Previous tests**, leave the review, and confirm the paused sitting's card is still there.

- [ ] **Step 7: Commit**

```bash
git add src/components/qbank/ContinueCard.tsx src/pages/student/QuestionBank.tsx
git commit -m "Offer the open test instead of dropping the student back into it"
```

---

### Task 8: The Flagged & missed tab

**Files:**
- Create: `src/components/qbank/QuestionCollections.tsx`
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: `incorrectIds`, `omittedIds`, `questionsById`, `scopeFromQuestions` (Task 1); `sessionQuestions`, `beginSession(picked, id)` (Task 4); `submitted` (Task 5).
- Produces: nothing other tasks rely on.

- [ ] **Step 1: Write the panels**

Create `src/components/qbank/QuestionCollections.tsx`:

```tsx
import { Eye, Flag, Play, Target, XCircle, CircleDashed, type LucideIcon } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import type { Question } from '@/data/qbank'
import { useT } from '@/lib/i18n'

export interface Collection {
  key: 'flagged' | 'incorrect' | 'omitted'
  title: string
  icon: LucideIcon
  /** What fills this list, said plainly when it is empty. */
  empty: string
  questions: Question[]
}

/**
 * The three lists worth coming back to.
 *
 * Each offers the same three things, because they are three different
 * questions a student asks about the same set: what is in it, can I sit it, and
 * what else is there like it. "Test this scope" is the third — the topics those
 * questions came from, including material the student has not seen.
 */
export function QuestionCollections({
  collections,
  onView,
  onTestThese,
  onTestScope,
}: {
  collections: Collection[]
  onView: (questions: Question[]) => void
  onTestThese: (questions: Question[]) => void
  onTestScope: (questions: Question[]) => void
}) {
  const t = useT()
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {collections.map((collection) => (
        <Panel key={collection.key} className="flex h-full flex-col">
          <PanelHeader
            title={collection.title}
            icon={collection.icon}
            hint={<span className="tnum font-mono text-[12px] text-ink-2">{collection.questions.length}</span>}
          />
          <div className="flex flex-1 flex-col justify-between gap-4 p-5">
            {collection.questions.length === 0 ? (
              <p className="text-[12.5px] leading-relaxed text-ink-3">{collection.empty}</p>
            ) : (
              <ul className="space-y-1.5">
                {collection.questions.slice(0, 3).map((question) => (
                  <li key={question.id} className="truncate text-[12.5px] text-ink-2">{question.stem}</li>
                ))}
                {collection.questions.length > 3 && (
                  <li className="text-[12px] text-ink-3">
                    {t('and')} {collection.questions.length - 3} {t('more')}
                  </li>
                )}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" iconLeft={Eye} disabled={!collection.questions.length} onClick={() => onView(collection.questions)}>
                {t('View')}
              </Button>
              <Button variant="secondary" size="sm" iconLeft={Play} disabled={!collection.questions.length} onClick={() => onTestThese(collection.questions)}>
                {t('Test these')}
              </Button>
              <Button variant="secondary" size="sm" iconLeft={Target} disabled={!collection.questions.length} onClick={() => onTestScope(collection.questions)}>
                {t('Test this scope')}
              </Button>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  )
}

/** The icons the Question Bank passes in, kept beside the component that uses them. */
export const COLLECTION_ICONS = { flagged: Flag, incorrect: XCircle, omitted: CircleDashed }
```

- [ ] **Step 2: Derive the three collections**

In `src/pages/student/QuestionBank.tsx`, extend the collections import:

```tsx
import {
  incorrectIds, omittedIds, pruneManifests, questionsById, scopeFromQuestions,
  type SessionManifests,
} from '@/data/qbankCollections'
import { COLLECTION_ICONS, QuestionCollections, type Collection } from '@/components/qbank/QuestionCollections'
```

Add after the `libraryTopics` memo:

```tsx
  const flaggedQuestions = useMemo(() => questionsById(questions, marked), [questions, marked])
  const incorrectQuestions = useMemo(
    () => questionsById(questions, incorrectIds(history.records)),
    [questions, history.records],
  )
  const omittedQuestions = useMemo(
    () => questionsById(questions, omittedIds(sessionQuestions, history.records)),
    [questions, sessionQuestions, history.records],
  )

  const collections: Collection[] = useMemo(() => [
    {
      key: 'flagged', title: t('Flagged'), icon: COLLECTION_ICONS.flagged,
      empty: t('Flag a question while you are sitting a test and it waits here.'),
      questions: flaggedQuestions,
    },
    {
      key: 'incorrect', title: t('Got wrong'), icon: COLLECTION_ICONS.incorrect,
      empty: t('Questions you answered wrongly collect here, and leave once you get them right.'),
      questions: incorrectQuestions,
    },
    {
      key: 'omitted', title: t('Omitted'), icon: COLLECTION_ICONS.omitted,
      empty: t('Questions a test served you but you never answered collect here.'),
      questions: omittedQuestions,
    },
  ], [flaggedQuestions, incorrectQuestions, omittedQuestions, t])
```

- [ ] **Step 3: Write the three actions**

Add beside `reviewSession`:

```tsx
  /**
   * Where a read-only view goes when it is done.
   *
   * A past test has results to go back to; a collection does not — it was never
   * sat as a sitting — so it returns to the hub instead.
   */
  const [reviewReturn, setReviewReturn] = useState<'setup' | 'results'>('results')

  /** Read a collection, answers and explanations shown. */
  function viewCollection(items: Question[]) {
    if (!items.length) return
    setSession(items)
    setSessionId(newSessionId())
    setAnswers({})
    setChecked({})
    setStruck({})
    setVisited(new Set(items.map((_, index) => index)))
    setIdx(0)
    setSubmitted(false)
    setReviewing(true)
    setReviewReturn('setup')
    setPhase('running')
  }

  function testTheseQuestions(items: Question[]) {
    beginSession(shuffle(items).slice(0, Math.min(count, items.length)), newSessionId())
  }

  /** Same topics, fresh questions — including ones the student has not seen. */
  function testScopeOf(items: Question[]) {
    const derived = scopeFromQuestions(items, libraryTopics)
    const pool = questionsInScope(questions, derived, libraryTopics)
    beginSession(shuffle(pool).slice(0, Math.min(count, pool.length)), newSessionId())
  }
```

In `reviewSession`, add `setReviewReturn('results')` beside `setReviewing(true)`. In `beginSession`, add `setReviewReturn('results')` beside `setReviewing(false)`.

- [ ] **Step 4: Send the End button to the right place**

In the runner header, the reviewing branch now honours where the view came from:

```tsx
            <button
              onClick={() => (reviewing ? setPhase(reviewReturn) : setEndOpen(true))}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line-2 bg-surface px-3 text-[12.5px] font-semibold text-ink shadow-panel transition-colors hover:bg-inset sm:min-h-9"
            >
              <Icon icon={reviewing ? ArrowLeft : LogOut} size={14} />
              {reviewing ? (reviewReturn === 'results' ? t('Back to results') : t('Done')) : t('End')}
            </button>
```

And in the footer, the "Finish review" button:

```tsx
              onClick={() => { if (!reviewing) commitAnswers(); setPhase(reviewing ? reviewReturn : 'results') }}
```

- [ ] **Step 5: Add the tab**

Widen the tab state:

```tsx
  const [hubTab, setHubTab] = useState<'new' | 'collections' | 'previous'>('new')
```

Replace the `<Tabs …>` items and change handler:

```tsx
        <Tabs
          className="mb-4"
          value={hubTab}
          onChange={(next) => setHubTab(next as 'new' | 'collections' | 'previous')}
          items={[
            { value: 'new', label: t('New session'), icon: GraduationCap },
            { value: 'collections', label: t('Flagged & missed'), icon: Flag, count: flaggedQuestions.length + incorrectQuestions.length + omittedQuestions.length },
            { value: 'previous', label: t('Previous tests'), icon: History, count: sessionSummaries.length },
          ]}
        />
```

Change the body's branch from `hubTab === 'previous' ? (…) : (…)` to a three-way. Replace the opening of that expression:

```tsx
        {hubTab === 'collections' ? (
          <QuestionCollections
            collections={collections}
            onView={viewCollection}
            onTestThese={testTheseQuestions}
            onTestScope={testScopeOf}
          />
        ) : hubTab === 'previous' ? (
```

The existing `<PreviousTests … />` and the `) : (` new-session block that follow are unchanged.

- [ ] **Step 6: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 7: Check it in the browser**

Sit a 5-question tutor test: flag one, answer one wrongly, skip two, submit. Open **Flagged & missed** and confirm each panel shows the right count. Press **View** on Flagged — the question opens with its answer shown and the End button reads **Done**, returning you to the hub. Press **Test these** on Got wrong — a fresh sitting of exactly that question. Press **Test this scope** — a sitting drawn from that question's topic, which may include questions you have not seen. Answer the wrong one correctly and confirm it leaves the Got wrong panel.

- [ ] **Step 8: Commit**

```bash
git add src/components/qbank/QuestionCollections.tsx src/pages/student/QuestionBank.tsx
git commit -m "Collect the questions worth another look, and act on them"
```

---

### Task 9: Draw a new session from a collection

**Files:**
- Modify: `src/pages/student/QuestionBank.tsx`

**Interfaces:**
- Consumes: `flaggedQuestions`, `incorrectQuestions`, `omittedQuestions` (Task 8).
- Produces: nothing.

This is the filter for solving previously omitted questions. The collections tab is the shortcut with counts; this is the general mechanism, composable with a topic selection.

- [ ] **Step 1: Add the source state and fold it into the pool**

In `src/pages/student/QuestionBank.tsx`, add the type beside `type Mode`:

```tsx
type Source = 'all' | 'flagged' | 'incorrect' | 'omitted'
```

Add the state beside `mode`:

```tsx
  const [source, setSource] = useState<Source>('all')
```

Replace the existing `available` memo with a source-narrowed pool feeding it:

```tsx
  const sourcePool = useMemo(() => {
    if (source === 'flagged') return flaggedQuestions
    if (source === 'incorrect') return incorrectQuestions
    if (source === 'omitted') return omittedQuestions
    return articleQuestions
  }, [source, articleQuestions, flaggedQuestions, incorrectQuestions, omittedQuestions])

  const available = useMemo(
    () => questionsInScope(sourcePool, scope, libraryTopics),
    [sourcePool, libraryTopics, scope],
  )
```

Note the `flaggedQuestions` / `incorrectQuestions` / `omittedQuestions` memos from Task 8 must be declared **above** this block.

- [ ] **Step 2: Add the control to the new-session form**

In the New session panel, insert this as the first child of `<div className="space-y-6 p-5">`, before the topic chooser's `<div>`:

```tsx
              <div>
                <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Draw from')}</p>
                <Segmented
                  value={source}
                  onChange={(value) => setSource(value as Source)}
                  items={[
                    { value: 'all', label: t('All questions') },
                    { value: 'flagged', label: t('Flagged') },
                    { value: 'incorrect', label: t('Got wrong') },
                    { value: 'omitted', label: t('Omitted') },
                  ]}
                />
                {/* The count below already reads from this pool, so the two
                    choices are visibly one decision rather than two. */}
                <p className="mt-2 text-[11.5px] text-ink-3">
                  {source === 'all'
                    ? t('Every published question you have access to.')
                    : t('Narrowed to one of your lists — combine it with a topic below.')}
                </p>
              </div>
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc -b
```

Expected: no output.

- [ ] **Step 4: Run the full unit suite**

```bash
npm test
```

Expected: all tests pass, including `qbankCollections.test.ts`.

- [ ] **Step 5: Check it in the browser**

On the hub's **New session** tab, set Draw from to **Omitted** and confirm the "N of M available questions" line drops to the omitted count. Add a topic selection and confirm the count narrows further. Start it and confirm you are served omitted questions. Set Draw from to a list that is empty and confirm **Start session** is disabled rather than starting an empty runner.

- [ ] **Step 6: Commit**

```bash
git add src/pages/student/QuestionBank.tsx
git commit -m "Start a session from the questions you skipped"
```

---

## Final verification

After Task 9, before calling the slice done:

- [ ] `npm test` — all green
- [ ] `npx tsc -b` — no output
- [ ] `npm run lint` — clean
- [ ] Walk the whole flow once in the browser preview: a **timed** session, strike an option, End → Leave, navigate away and back, Continue, End → End and submit, then check all three collection panels and the Draw-from filter reflect it.
