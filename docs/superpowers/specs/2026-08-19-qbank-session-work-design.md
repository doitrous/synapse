# Qbank session work — design

**Date:** 2026-08-19
**Status:** Approved, ready to plan
**Slice:** A + B of an eleven-part request (see *Scope* below)

---

## Scope

This spec covers one slice of a larger request. The request named eleven
independent subsystems; building them under one spec would produce something too
vague to execute, so they were decomposed and ordered. This is the first slice —
chosen because it has the highest daily impact, rests mostly on plumbing that
already exists, and blocks nothing else, so it can ship on its own.

### In scope

1. Three question collections — **flagged**, **got wrong**, **omitted** — each
   viewable, sittable, and usable as the scope for a fresh test.
2. A **Draw from** filter on the new-session form, so a student can sit
   previously omitted questions directly.
3. **Strikethrough** on an answer's text, to exclude it while reasoning.
4. **"End"** replacing "End session", offering *leave* or *end and submit*.
5. The left menu **retracting** while a test is running.
6. Returning to the Question Bank landing on the hub with a **Continue** option
   rather than dropping straight back into the running test.
7. Moving the Resources **Organise by** control back to the right of the screen.

### Deliberately out of scope

These were requested and are deferred to their own specs, in this order:

| Slice | Feature | Depends on |
|---|---|---|
| C | Essay questions — student tab, admin Written Setup, bulk import, tips, per-question helpers | — |
| D | Flashcards — student decks under Notebook, admin Flashcards Setup, Anki-style scheduler, Medical Taxonomy decks | — |
| E | Microscope / histology slide viewer | — |
| F | Study parties — mixed content, university/year confinement, open vs private, party link | C |
| G | Word-tile game, solo and with a friend | F |
| H | Facebook connect and the Friends tab | F |

Three findings that will shape those later specs, recorded here so they are not
rediscovered:

- **Scrabble is a Hasbro/Mattel trademark.** Slice G should ship under a
  different name. The board is to hold 8–15 words per game.
- **Facebook friends has an external blocker.** Meta's `user_friends` returns
  only friends who also use the app *and* granted the same permission — which is
  the requested behaviour, but it needs App Review, business verification, and a
  live privacy policy URL. Slice H should carry a friend-code fallback so the
  Friends tab works before Meta approves.
- **Anki is AGPL-3.0.** Slice D matches its defaults and behaviour — learning
  steps 1m/10m, graduating interval 1d, easy 4d, starting ease 2.50, 20 new and
  200 reviews per day — without copying its code.

---

## Context

Three of these features look like one feature but are not, because the evidence
behind them lives in three different places.

**Flags already persist.** `QuestionBank.tsx` keeps them in
`synapse.qbank.marked.v1`, so a flagged question survives the sitting that
flagged it. Nothing reads them back outside the runner.

**Wrong answers are derivable.** Every checked answer writes an `AttemptRecord`
carrying `itemId` and `correct`, so "questions I got wrong" is a query over the
attempt log.

**Omissions leave no trace.** The attempt log only receives a question once its
answer is *checked*, so a skipped question writes nothing at all. Within a
sitting, `QuestionNavigator` distinguishes omitted from unseen using the
`visited` set — but that is component state, mirrored only into the live-session
document, and the live session is discarded when the sitting ends. Nothing
records which questions a finished test contained. This is the one genuinely new
piece of data in the slice.

### A defect this slice has to fix

`checkAnswer()` is the only caller of `logAttempt`, and its "Check answer" button
renders only under `mode === 'tutor'` (`QuestionBank.tsx:1264`). **A timed
sitting therefore writes zero attempt records.** It never reaches Previous tests,
never counts toward accuracy, streak, or bank completion, and — directly relevant
here — would leave the "got wrong" collection permanently empty for every timed
test a student sits.

The fix belongs in this slice because the collections are built on the attempt
log, and a collection that silently ignores half the tests a student sits is not
worth shipping. Committing on submit is specified in §3.

---

## Decisions taken

Four questions were settled before design:

1. **"Same scope" means same topics, fresh questions.** Given a collection,
   *test this scope* draws from the topics and subtopics those questions belong
   to — including material the student has not seen. It does not merely replay
   the collection, and it does not exclude it either.
2. **Omissions are derived from a stored question list**, not cached in a list
   of their own and not written into the attempt log. Storing the set of
   questions each sitting contained makes omission a fact derived from two
   records that already agree, so it cannot drift; deleting a test correctly
   drops its omissions; and it keeps skipped questions out of "bank completed"
   and the weekly totals, which writing them to the attempt log would inflate.
3. **The menu collapses to the icon rail**, not to nothing. The study rail
   beside a question links out to the Library and Resources, so those
   destinations stay one click away.
4. **The text strikes, the badge selects.** Taken literally from the request.
   The trade-off is recorded in §3.

---

## 1 · Data layer

### The stored question list

A new user-owned document:

```
synapse.qbank.sessionQuestions.v1 : Record<sessionId, questionId[]>
```

Ids in the order they were sat. Written when a sitting begins, alongside the
existing `synapse.qbank.sessionNames.v1` entry; removed by `deleteSession`.

It needs no change to `stateOwnership.ts` — the existing `/^synapse\.qbank\./`
pattern already routes it to the student's own record rather than the shared
catalogue.

`usePersistentState` rewrites a whole document on every change, so the map is
**pruned to the most recent 600 sittings** on write. Unlike the attempt log,
this document is written only when a sitting begins or a test is deleted — never
per answer — so a larger bound costs little: 600 sittings of forty questions is
roughly a quarter of a megabyte, rewritten a handful of times a day. The bound
exists so the document cannot grow without limit, not to keep it small.

### `src/data/qbankCollections.ts`

A pure module with no storage of its own, tested with `node --test` under the
project's convention (explicit `.ts` extensions on its imports, as
`reviewQueue.ts` does).

```ts
/** Most recent marked verdict per question, across qbank and room surfaces. */
function latestVerdicts(records: AttemptRecord[]): Map<string, boolean>

/** Questions whose latest verdict was wrong. */
function incorrectIds(records: AttemptRecord[]): Set<string>

/** In a finished sitting, never answered — and not answered since. */
function omittedIds(
  manifests: Record<string, string[]>,
  records: AttemptRecord[],
): Set<string>

/** The Scope those questions imply, for "test this scope". */
function scopeFromQuestions(questions: Question[], libraryTopics: LibTopic[]): Scope
```

**The clearing rule.** Both `incorrectIds` and `omittedIds` are working sets a
student can empty, not permanent records. A question drops out of *got wrong*
once its latest verdict is correct, and out of *omitted* once it has been
answered at all. Recording every mistake a student ever made would produce a list
that only grows, which is the opposite of a revision tool.

**Scope derivation.** `questionsInScope` matches a question either by subtopic id
(`s:<id>`, from `libraryRefs`) or by topic title against the merged chooser tree.
`scopeFromQuestions` therefore emits an `s:` key per library reference, plus a
`t:` key for any topic in `chooserTopics(...)` whose title matches the question's
own `topic` — including the synthetic `qt:` topics that stand in for questions
the library has no article for.

---

## 2 · The hub

### Continue the most recent test

Today the restore effect ends with `setPhase(saved.phase)`, so leaving the
Question Bank and coming back drops the student straight into the running test
with no way to see where they are first.

The effect keeps restoring the sitting — questions, answers, position, timer,
flags, name — but **leaves the phase at `setup`**. A Continue card then sits above
the tabs whenever a sitting is paused, carrying its name, its progress
("12 of 20 answered"), and two actions: **Continue** (the existing `resumeSaved`)
and **Discard** (the existing `discardSession`).

Nothing about persistence changes: the mirror effect already returns early while
`phase === 'setup'`, so sitting on the hub cannot overwrite or lose the saved
test.

### The Flagged & missed tab

A third tab beside *New session* and *Previous tests*, holding one panel per
collection — **Flagged**, **Got wrong**, **Omitted** — each showing its count and
three actions:

- **View** — opens the collection in the existing read-only review runner, with
  answers and explanations revealed and the flag control still live, so a student
  can clear flags as they work through them. For a flagged question never
  answered, the correct option is simply shown; this is a study view, not a
  score.
- **Test these** — a fresh sitting over exactly those questions, shuffled and
  capped at the chosen length, under the normal rules.
- **Test this scope** — `scopeFromQuestions` over the collection, then a fresh
  sitting drawn from every question in that scope.

Each panel states plainly what fills it when empty, rather than showing a bare
zero — "Flag a question during a test and it appears here."

### The Draw from filter

A control on the new-session form — **All questions · Flagged · Got wrong ·
Omitted** — narrowing the pool before the topic chooser applies to it. The
existing "N of M available questions" line already reads from that pool, so it
reports the combined result without further change.

This is what lets a student sit previously omitted questions directly. The
collections tab is the shortcut with counts and a view; the filter is the general
mechanism, composable with a topic selection.

---

## 3 · The runner

### Strikethrough

An unrevealed option is currently one `<button>` wrapping the letter badge and
the text. It splits into two targets:

- the **letter badge** selects the answer, as the whole row does today
- the **text** strikes it through, and strikes it back

A struck option renders line-through and dimmed, carries `aria-pressed`, and
cannot be selected; striking the currently selected option clears the selection,
because keeping a pick on an option the student has just ruled out would
misreport what they think. Strikes are per question and last the sitting — they
are scratch marks, not a durable record — and are mirrored into the live-session
document so navigating to the Library and back does not lose them. They stay
visible once the answer is revealed, where the option is prose rather than a
control.

> **Recorded trade-off.** The text is by far the larger target, and a student
> coming from UWorld will click it expecting to answer. The alternative — the
> whole row selects, and a small strike control sits at the end of each row — was
> offered and not taken. If striking turns out to cost more mis-clicks than it
> saves, that is the change to make.

### End

The button reads **"End"**. While reviewing it continues to read "Back to
results" and behaves as it does today.

Pressing it opens a dialog offering two ways out, plus cancel:

- **Leave for now** — the sitting stays resumable and the student returns to the
  hub, where the Continue card is waiting. This is today's behaviour, now named.
- **End and submit** — the sitting is committed and its results view opens.

**End and submit** does three things in order:

1. writes an attempt record for every answered question that does not have one
   (see below);
2. records the sitting's question list under
   `synapse.qbank.sessionQuestions.v1`, so its unanswered questions become
   omitted;
3. clears the saved live session, so the test stops offering to resume, and
   opens `phase === 'results'`.

The finished test then appears in Previous tests and can be reopened through the
existing Review action.

### Committing a timed sitting

Step 1 above is the fix for the defect in *Context*. Every answered question
without a record gets one, carrying the same fields `checkAnswer` writes —
including concept evidence to the mastery ledger where the question is tagged.
`addAttempt` already refuses a duplicate by id, and the id is built from
`sessionId`, surface and item, so committing a sitting that was partly checked in
tutor mode cannot double-count.

The same commit runs behind the existing "See results" action, so a timed test
finished the ordinary way is recorded identically.

---

## 4 · The shell

`AppShell` owns `collapsed`, a preference persisted under
`synapse.shell.sidebarCollapsed`. Entering a test must not write to it: a student
who likes an expanded sidebar should still have one after their test.

A small context module — `src/components/shell/ImmersionContext.tsx` — provides
`ImmersionProvider` (rendered by `AppShell`) and `useImmersion()`. The Question
Bank turns immersion on while `phase === 'running'` and off otherwise, including
on unmount. The sidebar and the main column's padding then follow
`immersive || collapsed`, while the stored preference is left alone.

It is a context rather than a route check because a running test is a phase
inside the Question Bank route, not a route of its own. The same boundary is
what the practical runner and, later, party sessions will use.

---

## 5 · Resources

The Organise-by control currently sits inside the collapsible filter bar, below
the Files / Videos / My uploads switch. It moves back into that switch's row,
right-aligned beside the filter toggle, and stays hidden on My uploads as it is
today.

The row's own comment still describes the arrangement being restored —
*"Prominent Files / Videos switch + organize-by control"* — so the comment
becomes true again rather than needing a rewrite.

---

## 6 · Verification

**Unit** — `src/data/qbankCollections.test.ts`:

- `latestVerdicts` takes the most recent record, not the first
- a question answered wrong then right leaves *got wrong*
- a question in a sitting with no record for it is omitted
- an omitted question answered in a later sitting leaves *omitted*
- `scopeFromQuestions` emits subtopic keys from library references and topic
  keys for synthetic question-only topics
- pruning keeps the most recent 600 sittings and drops the oldest

**Typecheck** — `npx tsc -b` green. `noUnusedLocals` is on, so unused imports
fail the build.

**In the browser preview**, per the project's verification norms:

- striking an option, un-striking it, and striking the selected one
- End → Leave for now → Continue card → back into the test at the same question
- End → End and submit → results, and the test present in Previous tests
- a **timed** sitting reaching Previous tests and moving the accuracy figure —
  the defect fixed
- the sidebar collapsing on entering a test and returning to the student's own
  setting on leaving, with the stored preference unchanged
- Organise by sitting on the right of the Files / Videos row
