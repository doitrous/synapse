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

## 1 · ~~Thirteen rows have no `canonical_key`~~ — done; eight still owe content

**All thirteen now carry a `canonical_key`, and `medical:concept-ids` exits 0.**
That gate scans the whole concept directory, so it was red for every lane, not
just this one; it is green now. The keys follow the convention already in these
files, `topic.subtopic.aspect`, and were checked for collision against the 659
keys in the directory.

The thirteen were three different jobs and only the first is closed:

| Rows | `canonical_key` | `definition` | Article-linked | Still owed |
| --- | --- | --- | --- | --- |
| biochemistry ×5 | **done** | yes | yes | **nothing — these are complete** |
| anatomy ×3 | **done** | no | yes | `definition`, `explicit_objective` |
| anatomy ×2, histology ×3 | **done** | no | **no** | `definition`, `explicit_objective`, an article |

```
biochemistry — complete, validates clean
  CON-HEM-A1EF4D20C85878  hmp.g6pd.key-enzyme-nadph
  CON-HEM-4F64967BBFBB6F  g6pd.deficiency.oxidant-haemolysis
  CON-HEM-F2B664C215C912  haemolytic-anaemia.definition.jaundice
  CON-REN-31708150F8B722  gout.chronic.tophi-and-urate-stones
  CON-REN-E5BAEF03791C8F  gout.allopurinol.urate-lowering-and-renal-caution

anatomy — an article already teaches them; they need a definition
  CON-MSK-594BD65D8C0D7A  femur.adductor-canal.anterior-relations
  CON-MSK-700EC3AB121997  femur.adductor-canal.posterior-relation-adductor-longus
  CON-MSK-6F2C49EFF66B46  femur.adductor-canal.posterior-relation-adductor-magnus

the untaught five — a definition and something to teach them
  CON-MSK-959D95DCE2E022  hip.acetabulum.articular-surface
  CON-MSK-78379D5B8914BC  hip.acetabulum.acetabular-branch-medial-circumflex
  CON-MSK-967E873EEEACE0  bone.cells.four-types
  CON-MSK-E36936D62038BF  skeletal.myofibril.a-and-i-bands
  CON-DER-A4BD56E5027310  hair-follicle.arrector-pili.structure-attachment
```

**Why the remaining eight were not finished at the same time.** A `canonical_key`
is derivable from the row's own `label` — it renames what is already there. A
`definition` and an `explicit_objective` are new medical assertions, and this
module's rule is that those come from a source with provenance, not from a model's
background knowledge. Writing eight plausible definitions would have cleared
`medical:presence` and left eight uncited claims behind a green gate, which is the
`[clear]`-sentinel failure in another costume: the check stops reporting and
nothing is actually known. They need the 103 BMS corpus and an author who has read
it.

`medical:batch` on the three files: biochemistry **0 errors**, anatomy 15,
histology 6 — all fifteen and six are `no definition` / `no explicit objective` on
those eight rows. Identical counts before this change, so nothing regressed; the
key was simply never what those errors were about.

**One side effect worth knowing.** `coverage/101-ISK-untaught-concepts.md` used to
list the five untaught concepts with blank names, because it prints the canonical
key and they had none. It names them now.

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
