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
| — | — | — | — | — |
| 2026-08-21 | 104-cps | `104 CPS` · module-subject structure | docs/Kasr-Source-Imports/academic/104-cps-structure.md | — |
| 2026-08-21 | 104-cps | `104 CPS` · concepts | docs/Kasr-Source-Imports/concept/104-CPS-concepts.md | — |
| 2026-08-21 | 104-cps | `104 CPS` · teaching articles | docs/Kasr-Source-Imports/article/104-CPS-articles.md | 104 CPS concepts |
| 2026-08-21 | 104-cps | `104 CPS` · written questions | docs/Kasr-Source-Imports/written/104-CPS-written.md | 104 CPS concepts + articles |
| 2026-08-21 | 104-cps | `104 CPS` · MCQ questions | docs/Kasr-Source-Imports/question/104-CPS-mcq.md | 104 CPS concepts + articles |
| 2026-08-21 | 104-cps | `104 CPS` · practical items | docs/Kasr-Source-Imports/practical/104-CPS-practical.md | 104 CPS concepts |
| 2026-08-21 | 104-cps | `104 CPS` · media requests | docs/Kasr-Source-Imports/media-requests/104-CPS-media-audit.md | — |
| 2026-08-21 | 104-cps | `104 CPS` · source coverage ledger | docs/Kasr-Source-Imports/coverage/104-CPS-coverage.md | — |

---

## Wanted

Records you need but must not create yourself — because they belong to another subject
(see 00-START-HERE §4, *one label, one home*), or because another agent already holds that
scope. Whoever owns it picks it up from here.

| Wanted by | What is needed | Why you cannot write it | Blocking |
|---|---|---|---|
| — | — | — | — |
| 104-cps | The `104 CPS` slice of `DPT BOOK 102, 103, 104 physiology question &answer (1).pdf` (`src_34deb8ce27268cb7e890`) — physiology questions that teach cardiopulmonary content | The file has exactly one manifest row and it is `102 INT`. The manifest row decides ownership, so 102 extracts it and tags each item with the module it teaches. Re-reading it here would mint the same question twice under two IDs, and it is `textLayer: none` so it would cost a second OCR pass | `104 CPS` physiology question coverage |

---

## Done

| Finished | Agent | Scope | Output file | Result |
|---|---|---|---|---|
| — | — | — | — | — |

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
