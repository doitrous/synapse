# 103 BMS — what is not done

The companion to [`103-BMS-coverage.md`](103-BMS-coverage.md), following the pattern
of [`102-INT-OWED.md`](102-INT-OWED.md). That file is generated and says what was
read; this one is hand-authored and says what is owed, so a regeneration cannot
take the record with it.

Written by a lane that does not own 103 BMS, because the findings below were made
while verifying shared tooling and the 103 session had ended before they could be
handed over.

That lane has since added the thirteen missing `canonical_key` values — §1 — because
the gate they were failing is shared and blocked every concept lane. No `id`,
`definition` or other authored field was touched, and the edit is additive: 39
lines added, none removed. Everything still open below needs the module's corpus
and is left for whoever owns it. Delete this file once §1's remaining eight rows
are done.

---

## 1 · ~~Thirteen rows have no `canonical_key`~~ — closed, and the rest was my error

**All thirteen carry a `canonical_key` and every 103 BMS concept batch validates
at 0 errors.** `medical:concept-ids`, which scans the whole concept directory
whatever paths it is given, is green.

**Correction, 2026-08-23.** An earlier version of this file said eight of the
thirteen still owed a `definition` and an `explicit_objective`, and that they
needed the corpus and an author who had read it. That was wrong, and it was
routed for staffing on my say-so. Withdrawn.

Those eight rows are **sparse updates to concepts that already exist**. All
eight ids are live, and all eight live records already carry a definition and an
explicit objective. The rows restate their label and change a few columns, which
is exactly what an update row is for. What was actually broken was the
validator: it asked every row for the authoring fields, including rows that were
editing a record rather than creating one, and reported the absence as a debt.
Fixed — `medical:batch` now recognises an update (an id that resolves to live
state or a `--with` sibling, plus its discriminator restated) and asks the
authoring fields of creates only.

So 103 BMS owes nothing on these thirteen rows. The keys were real work; the
definitions were a measurement error, and mine.

The keys, for the record:

```
biochemistry   hmp.g6pd.key-enzyme-nadph · g6pd.deficiency.oxidant-haemolysis
               haemolytic-anaemia.definition.jaundice
               gout.chronic.tophi-and-urate-stones
               gout.allopurinol.urate-lowering-and-renal-caution
anatomy        femur.adductor-canal.anterior-relations
               femur.adductor-canal.posterior-relation-adductor-longus
               femur.adductor-canal.posterior-relation-adductor-magnus
               hip.acetabulum.articular-surface
               hip.acetabulum.acetabular-branch-medial-circumflex
histology      bone.cells.four-types · skeletal.myofibril.a-and-i-bands
               hair-follicle.arrector-pili.structure-attachment
```

## 2 · Why this blocks lanes other than 103

`scripts/kasr/check-concept-ids.ts` scans the whole concept directory regardless of
the paths it is given. While the thirteen rows were keyless, **no concept lane could
get a green `medical:concept-ids` to show its own files were clean** — the red was
shared even though the cause was not. That is why §1 was fixed from outside the
module rather than left for whoever next opened it.

Worth keeping in mind for the eight rows still open: they fail `medical:presence`,
which reports per file, so that one does not block other lanes the way the
directory-wide scan did. The urgency ended with the keys.

## 3 · The untaught list is not named for the module that owns it

The five starred concepts are reported in `coverage/101-ISK-untaught-concepts.md`,
which covers every module despite the filename — the link map is cross-module by
design, because a concept can in principle be taught by an article in any module.
The heading now says so. The filename stays because three files reference it.

Worth knowing when reading it: 101 ISK has none. Every entry in that file today is
103 BMS.
