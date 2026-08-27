# 102 INT MCQ authoring — pass 1

Restarted task (prior attempt lost to a platform outage, zero commits landed). Bounded to
~50 questions this pass. Branch `author-102-mcq-p1`.

## Starting state (2026-08-27, after rebase onto origin/main @ fa51d7c)

`docs/import-ready/INDEX.md`'s 102 INT section claims "504 of 1,102 banked MCQ rows are
unauthored" and proposes a 3-4 pass split by department book. That figure is stale: it
predates two commits already on this branch's history (`2f0e8ed` "Triage the 102 INT
biochemistry MCQ bank: 320 questions from 353 rows", `9197065`) that triaged nearly the
entire biochemistry department book and both ANS/Blood physiology books into
`scripts/kasr/seeds/mcq/102-INT/*.ts` (30 leaf files, all 14 biochem chapters + Blood's 11
sub-chapters + ANS's 5 sub-chapters already have seed files).

Recomputed the real gap directly from `scripts/kasr/extract/102-INT/mcq-bank.json` (1,102
rows) against what the 30 existing seed files already reference (as authored `key:` or
excluded `key:`), respecting `duplicateOf` chains: **only 43 distinct, usable, printed-key
bank rows have never been referenced anywhere** (39 outside the "Introduction to
Biochemistry and Nutrition" chapter, which stays blocked on the faculty ruling
`coverage/102-INT-OWED.md` §4 already flags — 4 items, not touched this pass).

## What this pass actually found

Of those 39: **21 were genuinely new** and are now authored (verified via a stem+options
similarity check, difflib ratio, against every already-used bank row — all scored 0.38-0.72,
well under the 0.75 duplicate threshold used below). **18 were not**, once checked against
the full bank rather than trusted at face value:

- **17 are unlinked duplicates.** All 12 remaining "Blood" items (source book
  `src_439c87aadd2a449415d2`) and 3 of the 5 remaining "ANS" items (source book
  `src_b21bbb801aed8c932206`) turned out to be near-verbatim reprints of a question already
  authored under source book `src_2093c80b1f9c25f9c0a4`, at a fixed page offset per chapter
  (Blood: +6 pages, same q-number; ANS: +21 pages, same q-number) — the extractor's
  cross-book dedup pass evidently missed these because per-book OCR noise differs just
  enough (`"Concerning Hernoglobin"` vs `"Concerning Haemoglobin"`, `"lron"` vs `"Iron"`,
  `"XI!"` vs `"XI"`) that `duplicateOf` was never set. Confirmed row by row (stem, options
  and printed key all match) — full pairing list below. **Not authored a second time**;
  each site carries a one-line note instead. This is the same failure class the toolchain
  already documents once, in `platelets-and-haemostasis.ts`'s own excludeReason for
  `MCQ-102-2093c80b-p17-q66` ("same content... printed twice... not flagged `duplicateOf`
  because its dedup pass evidently runs across source books rather than within one" — that
  instance was *within* one book; this pass found the same failure *across* books, at much
  larger scale).
- **1 is an OCR key conflict with no defensible resolution** —
  `MCQ-102-b21bbb80-p1-q2` ("Acetylcholine: ..."), whose two OCR passes disagree between
  options c and d, neither of which the book actually supports (muscarine *activates*
  muscarinic receptors; ACh's effect is brief, not long). Its own already-authored duplicate,
  `MCQ-102-2093c80b-p22-q2`, was excluded rather than answer-overridden for exactly this
  reason ("excluded rather than overridden to an option neither pass proposed") — followed
  the same precedent, so this one stays unauthored too rather than re-litigated.
- **1 has no matching existing concept** — `MCQ-102-07f0a0ff-p20-q23` ("Snake venom causes
  hemolysis of RBCs due to activation of the following enzyme: Lecithinase"). None of the
  Lipids leaf's fifteen concepts state the lecithinase/snake-venom-hemolysis fact, and 102's
  concept space is closed (164/164 two-sided per the chief-of-staff ruling) — minting a new
  one is out of scope for an authoring pass. Logged, not forced onto a loosely-related
  concept.
- **4 are the Intro-chapter items**, already known-blocked (no faculty ruling on whether
  that chapter is taught) — not touched, per standing note.

### Duplicate pairing detail (17 unlinked duplicates found this pass)

| Not authored (source `439c87aa`/`b21bbb80`) | Already live as (source `2093c80b`) | File |
|---|---|---|
| MCQ-102-439c87aa-p1-q2 (pernicious anaemia) | MCQ-102-2093c80b-p7-q2 | vitamin-b12-and-folic-acid.ts |
| MCQ-102-439c87aa-p2-q7 (haemoglobin/CO2) | MCQ-102-2093c80b-p8-q7 | iron.ts |
| MCQ-102-439c87aa-p2-q10 (erythropoietin) | MCQ-102-2093c80b-p8-q10 | erythropoiesis.ts |
| MCQ-102-439c87aa-p3-q14 (B12/pancreatic) | MCQ-102-2093c80b-p9-q14 | vitamin-b12-and-folic-acid.ts |
| MCQ-102-439c87aa-p5-q25 (B12 nuclear maturation) | MCQ-102-2093c80b-p11-q25 | anaemia.ts |
| MCQ-102-439c87aa-p6-q31 (macrocytic anaemia) | MCQ-102-2093c80b-p12-q31 | vitamin-b12-and-folic-acid.ts |
| MCQ-102-439c87aa-p6-q32 (anaemia EXCEPT altitude) | MCQ-102-2093c80b-p12-q32 | anaemia.ts |
| MCQ-102-439c87aa-p9-q49 (antithrombin III) | MCQ-102-2093c80b-p15-q49 | platelets-and-haemostasis.ts |
| MCQ-102-439c87aa-p9-q50 (intrinsic pathway) | MCQ-102-2093c80b-p15-q50 | platelets-and-haemostasis.ts |
| MCQ-102-439c87aa-p10-q58 (iron/gastric HCl) | MCQ-102-2093c80b-p16-q58 | iron.ts |
| MCQ-102-439c87aa-p11-q61 (bile duct/vit K) | MCQ-102-2093c80b-p17-q61 | vitamin-b12-and-folic-acid.ts |
| MCQ-102-439c87aa-p11-q64 (platelet steps order) | MCQ-102-2093c80b-p17-q64 | platelets-and-haemostasis.ts |
| MCQ-102-b21bbb80-p4-q23 (ACh EXCEPT sympathetic post) | MCQ-102-2093c80b-p25-q23 | chemical-transmission-*.ts |
| MCQ-102-b21bbb80-p5-q27 (fight/flight skin vessels) | MCQ-102-2093c80b-p26-q27 | sympathetic-nervous-system.ts |
| MCQ-102-b21bbb80-p7-q36 (parasympathetic salivary) | MCQ-102-2093c80b-p28-q36 | parasympathetic-nervous-system.ts |
| MCQ-102-b21bbb80-p9-q48 (CN III parasympathetic) | MCQ-102-2093c80b-p30-q48 | parasympathetic-nervous-system.ts |
| MCQ-102-b21bbb80-p1-q2 (ACh, OCR-ambiguous) | MCQ-102-2093c80b-p22-q2 (excluded, not authored) | chemical-transmission-*.ts |

## 21 authored this pass, all existing-concept reuse, no new concept minted

- **Amino Acids of Biological Importance** (4): `MCQ-102-07f0a0ff-p25-q6`, `-p26-q13`,
  `-p28-q22`, `-p28-q24` — all reuse the leaf's own existing
  `amino-acid-chemical-and-nutritional-classification` concept.
- **Carbohydrates of Biological Importance** (2): `-p13-q60` (cellulose/constipation),
  `-p15-q70` (GAG/proteoglycan). The first reuses `cellulose-dietary-importance`
  (`CON-GIT-9589A7077392FD`), copied verbatim into this leaf from
  `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` — flagged as a candidate in this
  leaf's own header comment when first written, undeclared until now because no row tested
  it then. The second reuses the leaf's own `heteropolysaccharide-and-gag-classification`.
- **Cell Cycle, Apoptosis, and Tumor Suppressor Genes** (3): `-p77-q6`, `-p78-q10`,
  `-p78-q14` — reuse the leaf's own existing concepts.
- **DNA Synthesis (Replication) and Repair** (2): `-p59-q15`, `-p59-q16` — reuse
  `eukaryotic-dna-polymerases-and-roles`.
- **Enzymes** (4): `-p46-q11`, `-p46-q12`, `-p47-q16` reuse `factors-affecting-enzyme-
  reaction-rate`; `-p48-q26` (aspirin/cyclooxygenase) reuses
  `aspirin-platelet-aggregation-and-bleeding-time`, copied verbatim into this leaf from the
  Platelets and haemostasis leaf (same pattern as the cellulose reuse above).
- **Lipids of Biological Importance** (2): `-p18-q10`, `-p18-q13` — reuse the leaf's own
  `eicosanoid-synthesis-pathway-enzymes`.
- **Chemistry of Nucleic Acids** (3): `-p53-q4`, `-p55-q15`, `-p55-q16` — reuse the leaf's
  own `dna-double-helix-antiparallel-strands` (the third derives Chargaff's rule, %G=20%,
  as a corollary of the concept's stated complementary base pairing).
- **Protein Synthesis (Translation)** (1): `-p71-q22` — reuses the leaf's own
  `post-translational-covalent-modification-types`.

## Gates

`node --experimental-strip-types scripts/kasr/build-batches.ts "102 INT"`:
`442 MCQ questions (50 excluded, 1 unanswered) -> docs/Kasr-Source-Imports/question/102-INT-mcq.md`,
`139 MCQ concepts -> docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md`. Written batches
byte-unchanged (diff touched only the two MCQ-route files).

`medical:batch` on `question/102-INT-mcq.md` (`--with` every 102 concept/article/evidence
file): `items: 442`, `errors: 10` — the same 10 pre-existing `library_ids`-names-only-one-
of-two-teaching-articles rows INDEX.md's Gate status paragraph already documents (none of
the 21 new rows), 0 new. `medical:batch` on `concept/102-INT-mcq-concepts.md` (`--with`
articles/evidence/concepts/physiology-concepts): `items: 139, errors: []`.

`medical:simulate` chained 10 steps (resources → articles → concepts ×3 → claims →
citations → spans → relations → question ×2 → written ×4): `"errors": []`, `"skipped": []`
across the whole call; per-batch line for the two touched files —
`concept/102-INT-mcq-concepts.md concept 98 41 None` (98 created + 41 updated, was 40),
`question/102-INT-mcq.md question 442 0 0` (442 created, 0 rejected, was 421).

## Next-pass pointer

The 102 INT MCQ bank is now essentially exhausted for this triage mechanism: 0 genuinely
new, usable, printed-key rows remain outside the 4 blocked Intro-chapter items. The next
authoring lane on 102 should be one of: (a) the Intro chapter, once a faculty ruling lands
on whether it's taught; (b) one of the 9 unseeded sittings (EOM 2024/2023/2021, 3 Baqoon
second-sittings, EOY 2021/2022-recheck physiology, 2 GATHERED compilations) named in
`coverage/102-INT-OWED.md` §2 — real fresh-paper reading, not bank triage; (c) the
`practical/`/`glossary/` batches, both still empty for 102.
