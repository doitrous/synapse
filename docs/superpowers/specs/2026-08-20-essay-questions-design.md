# Essay questions — design

**Date:** 2026-08-20
**Status:** Approved, ready to plan
**Slice:** C of an eleven-part request

---

## Scope

Slices A+B and H are on `main`. Slice E is in PR #14. This is slice C, and it
is the one study parties (slice F) are waiting on — parties are meant to mix
question-bank, practical *and* essay material.

### In scope

1. An **Essay questions** tab for students.
2. A **guide to answering written questions** on that tab — how to approach
   them, not what any one answer is.
3. **Practice**: read the question, write an answer, then reveal the helpers and
   mark yourself against the key points.
4. Per-question **helpers**: the key points that must appear, what to write
   legibly, what the examiner scans for, and a model answer.
5. A **Written Setup** tab in the admin console, the same shape as the other
   content editors, with bulk import.

### Out of scope

Slices D, F, G (flashcards, study parties, the word game), unchanged.

**Automatic marking is deliberately not built.** See *Decisions taken*.

---

## Decisions taken

1. **The student writes, then marks themselves against the key points.** They
   type an answer, reveal the helpers, and tick off the points they actually
   made, beside the model answer.

   The tick-list *is* the teaching. "Mentioning key points matters more than
   length" is the single most useful thing to tell someone about written
   medical exams, and a checklist makes it something a student measures rather
   than something they read once at the top of a page.

2. **The app does not mark free prose.** Keyword matching fails in both
   directions — it misses a point made in other words, and it credits a keyword
   used in a wrong sentence. A student told they missed something they actually
   wrote will trust the tool less, not more, and the tool has no way to know it
   was wrong.

3. **A self-mark is practice, not a score.** The attempt log already draws this
   line: a practical station is ticked by the student, so it is recorded with
   `correct: null` — evidence of work, silent on accuracy. Storing `false` there
   would drag every accuracy figure down and storing `true` would inflate it.
   A written answer is marked by the person who wrote it, so it goes in the same
   way. The points-covered figure is kept for the student's own review and never
   feeds accuracy.

4. **Answers are the student's own and are kept.** They are written into a
   user-owned document, so a student can reread what they wrote last time —
   which is most of the value of having written it.

---

## 1 · The guide

A panel at the top of the tab, collapsible and remembered, holding the approach
rather than any answer:

- **Structure carries marks.** An examiner reading two hundred papers finds
  what they are looking for in a laid-out answer and misses it in a paragraph.
- **Arrows show you understand.** A → B → C reads as a mechanism you followed;
  the same three facts as a list reads as three facts.
- **Key points beat length.** Marks are for points named, not words written. A
  short answer with every point beats a page with four of them.
- **Write the mark-carrying words legibly.** The diagnosis, the enzyme, the
  organism, the drug — the words the examiner is scanning for. Everything else
  can be untidy; these cannot.
- **If you do not know it exactly, write what you do know.** Name the class if
  not the drug, the mechanism if not the name. A blank earns nothing; a near
  miss often earns something.
- **Answer the question that was asked.** "List" wants a list. "Compare" wants
  both sides. "Give three" stops at three.
- **Leave room.** Space after each answer to add a line if you remember it
  later — you often do.

Every line goes through `useT()`, and the panel is written once as data so the
same list is not duplicated across surfaces.

## 2 · Practising a question

Three stages, one question at a time:

1. **Read and write.** The question, and a textarea. Nothing else — no
   keywords, no hints. Revealing before attempting is the failure mode this
   whole surface exists to prevent, so the helpers are not merely collapsed;
   they are not rendered.
2. **Reveal.** One control, and only after something has been written or the
   student explicitly skips. Opens: the key points, what to write clearly, what
   the examiner scans for, and the model answer.
3. **Mark yourself.** Each key point is a checkbox against the student's own
   answer, still on screen. The count is shown as *4 of 6 points covered* —
   never as a percentage, and never called a score.

The answer and the ticked points are saved under
`synapse.essay.answers.v1`, keyed by question id, with the most recent attempt
kept. An attempt is logged with `surface: 'essay'`, `correct: null`.

`AttemptSurface` gains `'essay'` alongside `'qbank' | 'case' | 'lab' |
'station' | 'room'`.

### State ownership

`synapse.essay.` is added to `USER_OWNED_PATTERNS` in
`src/lib/stateOwnership.ts` **and** to its hand-maintained port in
`ios/Synapse/Core/Sync/StateOwnership.swift`. That file says it must stay a
direct port, and the failure it warns about is quiet: the phone would write a
student's answers to a key the web app never reads, and neither side would
report an error.

**The port has already drifted** — `synapse.myDocuments.` is in the web list
and missing from the Swift one. Nothing is losing data today, because that key
is only used in demo mode and iOS never writes it, but it is exactly the drift
the comment warns about. This slice restores it while it is in that file.

## 3 · The content

`ContentKind` gains `'essay'`, which is what buys the admin tab its catalogue,
status workflow, university/year scoping, editor and bulk import.

```ts
export interface EssayKeyPoint {
  id: string
  /** The point that must appear for a mark. */
  text: string
  /** Marked as one of the words to write legibly — a diagnosis, an enzyme. */
  legible?: boolean
}

export interface EssayAuthoringData {
  /** The question as it appears on a paper. */
  prompt: string
  keyPoints: EssayKeyPoint[]
  /** What the examiner is scanning this answer for. */
  examinerNote: string
  modelAnswer: string
}
```

*What to write clearly* is a flag on a key point rather than a separate list.
It is always one of the points that carries a mark, and keeping it as its own
free-text field invites an author to write it twice and let the two disagree.

## 4 · The admin tab

`WrittenSetup`, in the same navigator-around-`ControlDashboard` shape as
Practical Setup and Histology Setup. Its editor adds the prompt, the key points
(add, reorder, delete, flag as legible), the examiner note, and the model
answer.

Bulk import follows the existing schema pattern: `key_points` as one per line,
with a leading `!` marking a point to write legibly.

## 5 · Verification

**Unit** — pure modules, tested as this repo tests:

- an essay projects to the student shape only when published and with a prompt
  and at least one key point
- key-point parsing from an imported block, including the `!` legible marker
- the covered count is points ticked over points total, and is absent rather
  than zero before an answer is marked
- an unmarked answer produces an attempt with `correct: null`

**Typecheck** — `npx tsc -b`, `noUnusedLocals` on.

**In the browser:**

- the guide renders, collapses, and stays collapsed
- helpers are **not in the DOM** before revealing — not merely hidden
- writing, revealing, ticking, and returning later shows the answer again
- the admin tab lists essays, opens the editor, and publishes one that then
  appears for the student

**Not verifiable here:** nothing in this slice needs a database.
