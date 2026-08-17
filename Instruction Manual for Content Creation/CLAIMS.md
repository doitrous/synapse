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

---

## Wanted

Records you need but must not create yourself — because they belong to another subject
(see 00-START-HERE §4, *one label, one home*), or because another agent already holds that
scope. Whoever owns it picks it up from here.

| Wanted by | What is needed | Why you cannot write it | Blocking |
|---|---|---|---|
| kau-y1 | The five Kasr Alainy Year 1 courses (101 ISK, 102 INT, 103 BMS, 104 CPS, 108 INT) in Admin › Academic Setup, under `KAU_Y1` | Courses live in the university catalogue, not in any import batch — there is no importer for them. `KAU_Y1.courses` is `[]`, so no live module ID exists to reference. | Module tags on the 26 delivered questions resolve to nothing; **and any Year 1 timetable at all**, since `synapse-module-schedules-v1` is keyed `kau:Year 1:<courseId>` |
| kau-y1 | Concepts and articles for general histology, general biochemistry and cytogenetics | The eight valid subject IDs (`cvs`, `resp`, `renal`, `gi`, `neuro`, `endo`, `msk`, `pharm`) have no home for them, and `subjectId: "medical"` is legacy and not usable | Questions for modules **101 ISK, 102 INT and 103 BMS** — their past papers are written short-answer on exactly this content |
| kau-y1 | Concepts and articles for general pathology (cell injury, inflammation, neoplasia) | Same — no pathology subject exists among the eight; the live pathology-flavoured concepts sit under `pharm` and cover chemotherapy, not general pathology | The pathology half of **108 INT**; only the pharmacology half could be written |

---

## Done

| Finished | Agent | Scope | Output file | Result |
|---|---|---|---|---|
| 2026-08-17 | kau-y1 | SYS-CVS · questions (KAU Y1 · 104 CPS — cardiac cycle) | docs/import-ready/question/SYS-CVS-QUESTION-011.md | 6 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-CVS · questions (KAU Y1 · 104 CPS — output, ABP, venous) | docs/import-ready/question/SYS-CVS-QUESTION-012.md | 5 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-RES · questions (KAU Y1 · 104 CPS — ventilation, compliance) | docs/import-ready/question/SYS-RES-QUESTION-001.md | 5 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-RES · questions (KAU Y1 · 104 CPS — lung volumes, hypoxia) | docs/import-ready/question/SYS-RES-QUESTION-002.md | 5 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-PHA · questions (KAU Y1 · 108 INT — pharmacokinetics) | docs/import-ready/question/SYS-PHA-QUESTION-001.md | 5 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-CVS · questions (KAU Y1 · 104 CPS — conduction, ECG) | docs/import-ready/question/SYS-CVS-QUESTION-013.md | 7 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-CVS · questions (KAU Y1 · 104 CPS — valve/coronary anatomy, histology) | docs/import-ready/question/SYS-CVS-QUESTION-014.md | 6 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-RES · questions (KAU Y1 · 104 CPS — airway anatomy, histology) | docs/import-ready/question/SYS-RES-QUESTION-003.md | 6 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-PHA · questions (KAU Y1 · 108 INT — membrane transport) | docs/import-ready/question/SYS-PHA-QUESTION-002.md | 5 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-PHA · questions (KAU Y1 · 108 INT — acids, bases, pH) | docs/import-ready/question/SYS-PHA-QUESTION-003.md | 6 questions, fieldsUsed 48, 0 errors |
| 2026-08-17 | kau-y1 | SYS-PHA · questions (KAU Y1 · 108 INT — clearance, active transport) | docs/import-ready/question/SYS-PHA-QUESTION-004.md | 6 questions, fieldsUsed 48, 0 errors |

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
