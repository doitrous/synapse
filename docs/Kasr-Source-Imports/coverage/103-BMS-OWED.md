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

## 1 · Thirteen rows have no `canonical_key`, and they are three different jobs

Thirteen items across three concept batches carry no `canonical_key`. They share
that one cause, and the work each needs is not the same — a third of the list is a
one-field fix and a third is genuinely unfinished. Read the tiers before estimating
the whole thing.

| Rows | Fields carried | `definition` | Article-linked | Owed |
| --- | --- | --- | --- | --- |
| biochemistry ×5 | 25–27 | yes | yes | `canonical_key` **only** |
| anatomy ×3 | 9 | no | yes | key + `definition` |
| anatomy ×2, histology ×3 | 7–9 | no | **no** | key + `definition` + an article |

```
biochemistry — complete but for the key
  CON-HEM-A1EF4D20C85878   CON-HEM-4F64967BBFBB6F   CON-HEM-F2B664C215C912
  CON-REN-31708150F8B722   CON-REN-E5BAEF03791C8F

anatomy — no definition, but an article already teaches them
  CON-MSK-594BD65D8C0D7A   CON-MSK-700EC3AB121997   CON-MSK-6F2C49EFF66B46

the untaught five — no definition and nothing teaches them
  CON-MSK-959D95DCE2E022   CON-MSK-78379D5B8914BC   CON-MSK-967E873EEEACE0
  CON-MSK-E36936D62038BF   CON-DER-A4BD56E5027310
```

The biochemistry five are finished work one field short: `CON-REN-E5BAEF03791C8F`
carries 27 populated fields. Adding five keys clears a third of the list and is
worth doing on its own, because it shrinks what the gate reports without touching
anything that needs judgement.

**One cause, three red signals** — which is why the module can look like it has
three problems:

- `medical:concept-ids` — exits 1 on "an item with no canonical_key", 13 times.
- `medical:presence` — the anatomy five report `unpopulated with no reason` on
  eleven fields each. This is the second tier and the third, not the first.
- `coverage/101-ISK-untaught-concepts.md` — "5 concept(s) no article teaches",
  the third tier. **All five are inside the keyless thirteen**, so the gap is a
  symptom of those rows rather than separate authoring debt — but note it is
  specific to the five, not a property of all thirteen. The other eight are
  article-linked already.

Confirmed by enumerating both sets and intersecting them, not by comparing the
example IDs the gates print — `medical:presence` names only the first two per
field, and neither of those two is in the untaught list, so reading the sample
makes the sets look disjoint when one is a subset of the other.

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
