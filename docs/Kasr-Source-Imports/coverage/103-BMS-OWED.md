# 103 BMS — what is not done

The companion to [`103-BMS-coverage.md`](103-BMS-coverage.md), following the pattern
of [`102-INT-OWED.md`](102-INT-OWED.md). That file is generated and says what was
read; this one is hand-authored and says what is owed, so a regeneration cannot
take the record with it.

Written by a lane that does not own 103 BMS, because the finding below was made
while verifying shared tooling and the 103 session had ended before it could be
handed over. Nothing in the module's batches was edited. Delete this file once the
rows are fixed.

---

## 1 · Thirteen concept rows are shells, and they fail three gates at once

Thirteen items across three concept batches carry an `id` and almost nothing else —
no `canonical_key`, and for the anatomy five, no `definition`, `subject`,
`primary_node_id`, `concept_type` or `explicit_objective` either. They read like
rows that failed to parse rather than concepts authored thin.

| Batch | Items | Keyless |
| --- | --- | --- |
| `concept/103-BMS-anatomy-concepts.md` | 15 | 5 |
| `concept/103-BMS-biochemistry-concepts.md` | 28 | 5 |
| `concept/103-BMS-histology-concepts.md` | 8 | 3 |

```
CON-MSK-594BD65D8C0D7A   CON-HEM-A1EF4D20C85878   CON-MSK-967E873EEEACE0 *
CON-MSK-700EC3AB121997   CON-HEM-4F64967BBFBB6F   CON-MSK-E36936D62038BF *
CON-MSK-6F2C49EFF66B46   CON-HEM-F2B664C215C912   CON-DER-A4BD56E5027310 *
CON-MSK-959D95DCE2E022 * CON-REN-31708150F8B722
CON-MSK-78379D5B8914BC * CON-REN-E5BAEF03791C8F
```

**These thirteen rows are one root cause behind three separate red signals**, which
is why the module can look like it has three problems:

- `medical:concept-ids` — exits 1 on "an item with no canonical_key", 13 times.
- `medical:presence` — the anatomy five report `unpopulated with no reason` on
  eleven fields each.
- `coverage/101-ISK-untaught-concepts.md` — "5 concept(s) no article teaches". The
  five starred above. **Every one of them is in this same keyless set** — an empty
  concept names no article and no article names it, so the gap is a symptom rather
  than a separate authoring debt.

Fixing the thirteen rows should close all three. Confirmed by enumerating both sets
and intersecting them, not by comparing the example IDs the gates print — the
presence output names only the first two per field, and comparing against that
sample makes the sets look disjoint when they are not.

## 2 · Why this blocks lanes other than 103

`scripts/kasr/check-concept-ids.ts` scans the whole concept directory regardless of
the paths it is given, so while these thirteen rows stand, **no concept lane can get
a green `medical:concept-ids` to demonstrate its own files are clean.** The red is
shared even though the cause is not. That makes this more urgent than a
module-local defect, and it is the reason it is written down here rather than left
for whoever next opens the module.

## 3 · The untaught list is not named for the module that owns it

The five starred concepts are reported in `coverage/101-ISK-untaught-concepts.md`,
which covers every module despite the filename — the link map is cross-module by
design, because a concept can in principle be taught by an article in any module.
The heading now says so. The filename stays because three files reference it.

Worth knowing when reading it: 101 ISK has none. Every entry in that file today is
103 BMS.
