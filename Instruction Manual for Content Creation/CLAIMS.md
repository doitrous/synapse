# Claims

Who is working on what, right now. Several agents share this checkout; this file is how
they stay out of each other's files.

**Before you write anything:** re-read this file, check no open row overlaps your scope, add
your row to **Open**. **When you finish:** move it to **Done** with the file path and item
count.

A scope is a `(canonical node, content type)` pair. Two agents may both work `SYS-RES-T04`
if one holds concepts and the other holds practicals. Two agents may never hold the same
pair, and never the same output file.

---

## Open

| Claimed | Agent | Scope | Output file | Depends on |
|---|---|---|---|---|
| 2026-08-21 | sad-solomon-4bb999 | `101 ISK` question-book MCQs — every subject-tree leaf **except `Granular leukocytes`**, which the 101 lane holds | `scripts/kasr/seeds/mcq/**`, and its two generated outputs `docs/Kasr-Source-Imports/question/101-ISK-mcq.md` and `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` | The article for each leaf. A leaf is not done until one exists and names its concepts in `related_concepts` |
| 2026-08-21 | sad-solomon-4bb999 | `101 ISK` histology articles for the twelve leaves the 101 lane did not write | `docs/Kasr-Source-Imports/article/101-ISK-histology-2.md` | — |

---

## Wanted

Records you need but must not create yourself — because they belong to another subject
(see 00-START-HERE §4, *one label, one home*), or because another agent already holds that
scope. Whoever owns it picks it up from here.

| Wanted by | What is needed | Why you cannot write it | Blocking |
|---|---|---|---|
| — | — | — | — |
| 103-bms | `scripts/kasr/build-coverage.ts` taking `--module`, defaulting to `101 ISK` | Every lane needs it and five in-place edits is five conflicts; 103-bms is making the change once, per SHARED-TOOLCHAIN §2 — rebase onto it rather than writing a sixth | 103-BMS-coverage.md, and the same ledger for every other module |
| 103-bms | `scripts/kasr/{types,emit,build-batches}.ts` taking a module parameter, defaulting to `101 ISK` | They hardcode `101 ISK` in the ID mint, the `exam_signal` grammar and the output paths. **102 holds this retrofit** — 103-bms rebases onto it rather than forking the field set, per SHARED-TOOLCHAIN §2 | 103-BMS-concepts.md, 103-BMS-EOY-2025-written.md |

---

## Done

| Finished | Agent | Scope | Output file | Result |
|---|---|---|---|---|
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy + Histology + Physiology · claims | docs/Kasr-Source-Imports/evidence/103-BMS-claims.md | 29 claims, 13 fields, 0 errors. One file, not three: the six per-subject rows this replaces were never written, and `detectKind` reads only the first record, so one kind per file is the constraint that matters — not one subject per file. |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy + Histology + Physiology · citations | docs/Kasr-Source-Imports/evidence/103-BMS-citations.md | 29 citations, all 12 fields, 0 errors. One per claim; every span quoted from the three department books with an exact page locator. |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy + Histology + Physiology · article evidence spans | docs/Kasr-Source-Imports/evidence/103-BMS-spans.md | 18 spans, 6 fields, 0 errors. Exactly the 18 IDs the thirteen articles already name in `span_ids`, closing the `references unknown span` audit errors. Every `section_id` computed with the importer's own slugify from the article file; every `text` checked to appear character for character in that section. |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-anatomy-written.md | 6 questions, 34 marks, fieldsUsed 41, zero errors |
| 2026-08-21 | 103-bms | `103 BMS` · Histology · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-histology-written.md | 4 questions, 15 marks, fieldsUsed 41, zero errors |
| 2026-08-21 | 103-bms | `103 BMS` · Physiology · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-physiology-written.md | 4 questions, 19 marks, fieldsUsed 41, zero errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-biochemistry-written.md | 7 questions, 40 marks as the parts total (44 sat across the whole section, since group I asks for two of five), fieldsUsed 41, zero errors. Pages 5 and 6 read off the render — the solved copy's overlays there are not in the text layer. |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · EOY 2025 matching | docs/Kasr-Source-Imports/question/103-BMS-EOY-2025-biochemistry-matching.md | 1 matching question, 12 options against 10 prompts, 10 marks, fieldsUsed 43, zero errors. Both blank option rows survive as distractors F and G. Key read off the p8 render. |
| 2026-08-21 | 103-bms | `103 BMS` · academic structure | docs/Kasr-Source-Imports/academic/103-BMS-structure.md | 4 subjects, 225 nodes, from the four department books |
| 2026-08-21 | 103-bms | `103 BMS` · evidence sources | docs/Kasr-Source-Imports/evidence/103-BMS-sources.md | 6 sources, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy · concepts | docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md | 15 concepts (10 new, 5 updates), fieldsUsed 54, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy · articles | docs/Kasr-Source-Imports/article/103-BMS-anatomy.md | 6 articles, fieldsUsed 52, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · concepts | docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md | 28 concepts (23 new, 5 updates), fieldsUsed 54, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · articles | docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md | 11 articles, fieldsUsed 52, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · claims | docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md | 28 claims, fieldsUsed 14/14, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · citations | docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-citations.md | 28 citations, fieldsUsed 12/12, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · spans | docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-spans.md | 19 spans, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-biochemistry-written.md | 7 questions, fieldsUsed 41, 0 errors |
| 2026-08-21 | 103-bms-mcq-carb | `103 BMS` · Biochemistry · question-book MCQs, chapters Carbohydrate Metabolism + Bioenergetics + Tricarboxylic Acid Cycle | docs/Kasr-Source-Imports/question/103-BMS-MCQ-carbohydrate-bioenergetics.md | 116 questions, fieldsUsed 48 (floor 46), 0 errors. 112 from the 102 lane's extraction plus 4 printed questions it lost to OCR run-ons, recovered from the pages. All 12 null keys read off the printed key tables on file pages 86, 89 and 103; none guessed, none dropped. |
| 2026-08-21 | 103-bms-mcq-carb | `103 BMS` · Biochemistry · concepts for those three chapters | docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md | 36 new concepts, fieldsUsed 54 (floor 50), 0 errors. Seven questions map to concepts the 2025 exam lane already authored and mint nothing; twelve live near-misses examined and recorded in rejected_merge_candidate_ids. |
| 2026-08-21 | 103-bms-mcq-carb | `103 BMS` · Biochemistry · articles for those three chapters | docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md | 7 articles, fieldsUsed 52 (floor 49), 0 errors. Every one of the 36 new concepts is taught by exactly the article it names, checked in both directions by the build. |
| 2026-08-21 | 103-bms-mcq-carb | `103 BMS` · Biochemistry · claims for those 36 concepts | docs/Kasr-Source-Imports/evidence/103-BMS-mcq-carbohydrate-claims.md | 36 claims, fieldsUsed 13, 0 errors against the concept file. Closed set: 36 concepts in, 36 claims out, build refuses to write if they differ. |
| 2026-08-21 | 103-bms-mcq-carb | `103 BMS` · Biochemistry · citations for those 36 claims | docs/Kasr-Source-Imports/evidence/103-BMS-mcq-carbohydrate-citations.md | 36 citations, fieldsUsed 12, 0 errors. Every span the department book's own words, with an exact page locator. |
| 2026-08-21 | 103-bms-mcq-carb | `103 BMS` · Biochemistry · article spans for those 7 articles | docs/Kasr-Source-Imports/evidence/103-BMS-mcq-carbohydrate-spans.md | 36 spans, fieldsUsed 6, 0 errors. Derived from the articles' own annotation quotes so a span cannot drift from its article. |
| 2026-08-21 | 103-bms | `103 BMS` · Biochemistry · EOY 2025 matching | docs/Kasr-Source-Imports/question/103-BMS-EOY-2025-biochemistry-matching.md | 1 matching question, fieldsUsed 42, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Histology · concepts | docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md | 8 concepts (5 new, 3 updates), fieldsUsed 54, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Histology · articles | docs/Kasr-Source-Imports/article/103-BMS-histology.md | 4 articles, fieldsUsed 52, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Physiology · concepts | docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md | 8 concepts, fieldsUsed 54, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Physiology · articles | docs/Kasr-Source-Imports/article/103-BMS-physiology.md | 3 articles, fieldsUsed 52, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy/Histology/Physiology · claims | docs/Kasr-Source-Imports/evidence/103-BMS-claims.md | 29 claims, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy/Histology/Physiology · citations | docs/Kasr-Source-Imports/evidence/103-BMS-citations.md | 29 citations, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy/Histology/Physiology · spans | docs/Kasr-Source-Imports/evidence/103-BMS-spans.md | 18 spans, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Anatomy · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-anatomy-written.md | 6 questions, fieldsUsed 41, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Histology · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-histology-written.md | 4 questions, fieldsUsed 41, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · Physiology · EOY 2025 written | docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-physiology-written.md | 4 questions, fieldsUsed 41, 0 errors |
| 2026-08-21 | 103-bms | `103 BMS` · source coverage ledger | docs/Kasr-Source-Imports/coverage/103-BMS-coverage.md | 6 of 51 sources read; the other 45 named |
| 2026-08-21 | 102-int -> 103-bms | `103 BMS` slice of the shared department question books | `scripts/kasr/extract/102-INT/mcq-bank.json` (102's file, read-only from here) | **Delivered.** 1,102 MCQs extracted and module-tagged; 391 are `103 BMS` — 336 Biochemistry from `src_07f0a0ff41addf826c7f`, 55 Physiology from `src_2093c80b1f9c25f9c0a4`. 353 carry a printed answer key, 19 flagged suspect, 2 options damaged by OCR out of 1,563. Verified in place; not yet authored into batches |

---

### How to fill a row

**Claimed / Finished** — the date, `2026-08-15`.

**Agent** — whatever identifies your session to Omar. A short handle is fine; be consistent
across your rows.

**Scope** — `SYS-RES · T04 · concepts`. Use the canonical node ID, not a prose description,
so an overlap is obvious at a glance.

**Output file** — the full path, `docs/import-ready/concept/SYS-RES-CONCEPT-T04.md`. One
file per row. If your scope needs two files, take two rows.

**Depends on** — IDs you are referencing that another open row is producing, or a **Wanted**
line you are waiting on. Leave `—` if you depend only on live state.

**Result** — what the validator reported: `11 concepts, fieldsUsed 47, 0 errors`. This is
what tells Omar the batch is worth opening.

### Example rows

```
| 2026-08-15 | agent-a | SYS-RES · T04 · concepts   | docs/import-ready/concept/SYS-RES-CONCEPT-T04.md   | — |
| 2026-08-15 | agent-b | SYS-RES · T04 · practicals | docs/import-ready/practical/SYS-RES-PRACTICAL-008.md | CON-RES-* from agent-a |
```

Same node, different content types, different files. That is allowed and expected.

```
| agent-b | A concept for "furosemide loop diuresis" | Drug labels belong to `pharm`, not `renal` | SYS-RES-PRACTICAL-008 |
```

A **Wanted** row. Agent B references the concept once it exists; it does not mint one.
