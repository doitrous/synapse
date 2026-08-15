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
| — | — | — | — |

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
