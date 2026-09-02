# pending-live/ — apply order

Four files here (two tranche-1 pairs, below) are sparse overlay updates / new
question records that depend on concept ids MUST-CVS-201 shares with other
lanes' unimported batches — none of the target concept ids (7 for tranche 1,
8 more for the Histology tranche) is in `server/data/medical-library-v1.json`
(checked directly against the live JSON this checkout carries, not just
`find-existing.mjs`). No file here is staged in `docs/import-ready/` or
anywhere else — by design, same convention as Alexandria's and Ain Shams's
own `pending-live/` (see `docs/Alexandria-Source-Imports/pending-live/INDEX.md`
and `docs/Ain-Shams-Source-Imports/pending-live/INDEX.md`). Omar applies each
pair after confirming its own dependency, below, is live.

## Dependency status (2026-09-02)

None of the three dependency roots below have landed in production as far as
this checkout can tell — the live snapshot (`server/data/medical-library-v1.json`,
`generatedAt: 2026-08-11T03:09:06Z`) predates all three and holds none of the
seven target ids. That is expected staleness for two of the three (Kasr 104-CPS
and the SYS-CVS catalogue are both still Draft/`needs_evidence`, `status: under
review`, in their own source files as of this pass), not evidence a dependency
is close to landing. Omar should re-confirm against the live DB (or a fresh
`medical:snapshot-live`) before applying, as a final check.

## Files

| File | Target ids | Records |
|---|---|---|
| `MUST-CVS-201-concepts-overlay.md` | 7 concept ids: 2 in `docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md`, 2 in `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md`, 1 in `docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md`, 1 in `docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md`, 1 in `docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-concepts.md` | 7 sparse updates — `+must`, `+2`, `+MUST-CVS-201` on `universities`/`learner_years`/`modules`; `module_subject` restates every pre-existing line plus MUST-CVS-201's own (full-replacement field, no `+` semantics) |
| `MUST-CVS-201-questions.md` | 9 written-question records (`QW-MUST-CVS201-…`), `main_concept` pointing at the 7 ids above (2 of the 9 pairs share a concept: MW-Q1/MW-Q10 both cite the LCA-branches concept, Maria-Q6/Maria-Q7 both cite the hypertension-definition concept) | New records, not sparse updates — `library_ids` names each target concept's own existing article, from the same dependency file the concept overlay targets |

**Apply after**: `MUST-CVS-201-concepts-overlay.md` applies after its five
named dependency files are live; `MUST-CVS-201-questions.md` applies after
both the concepts-overlay file above AND its own five article dependencies
(`docs/Kasr-Source-Imports/article/104-CPS-anatomy.md`,
`docs/Kasr-Source-Imports/article/104-CPS-physiology.md`,
`docs/import-ready/article/SYS-CVS-ARTICLE-T04.md`,
`docs/import-ready/article/SYS-CVS-ARTICLE-T06.md`,
`docs/Alexandria-Source-Imports/article/AU-MED-106-physiology-articles.md`)
are live.

## Validation (this pass, positional `gate.mjs simulate`, real dependency files first)

```
node scripts/content/gate.mjs simulate \
  docs/MUST-Source-Imports/resource/MUST-CVS-201-resources.md \
  docs/MUST-Source-Imports/evidence/MUST-CVS-201-sources.md \
  docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
  docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md \
  docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md \
  docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md \
  docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-concepts.md \
  docs/Kasr-Source-Imports/article/104-CPS-anatomy.md \
  docs/Kasr-Source-Imports/article/104-CPS-physiology.md \
  docs/import-ready/article/SYS-CVS-ARTICLE-T04.md \
  docs/import-ready/article/SYS-CVS-ARTICLE-T06.md \
  docs/Alexandria-Source-Imports/article/AU-MED-106-physiology-articles.md \
  docs/MUST-Source-Imports/concept/MUST-CVS-201-concepts.md \
  docs/MUST-Source-Imports/article/MUST-CVS-201-articles.md \
  docs/MUST-Source-Imports/evidence/MUST-CVS-201-claims.md \
  docs/MUST-Source-Imports/evidence/MUST-CVS-201-citations.md \
  docs/MUST-Source-Imports/evidence/MUST-CVS-201-spans.md \
  docs/MUST-Source-Imports/pending-live/MUST-CVS-201-concepts-overlay.md \
  docs/MUST-Source-Imports/pending-live/MUST-CVS-201-questions.md \
  docs/MUST-Source-Imports/question/MUST-CVS-201-eom-written.md \
  --emit /tmp/must-cvs201-sim.json
```
→ `batches=19 created=300 updated=13 rejected=0 skipped=1 errors=0` (the one
skip is `academic/MUST-Y2-modules.md`, detected `unknown` — not a batch kind
`medical:simulate` applies, same caveat 12-resources.md documents for a
catalogue-resource file). The concepts-overlay batch reports
**`created:0, updated:7`** — confirms all 7 rows are genuine updates onto ids
that already exist in the five dependency files above, not duplicates. The
questions batch (`pending-live/MUST-CVS-201-questions.md`) reports
`created:9, updated:0, rejected:0`.

`gate.mjs batch` was **not** run on either pending-live file — the
per-file `module_subject` check has no way to know a sparse update's target
already carries the module named in its first `module_subject` line (it only
sees this file's own `## modules` cell, `+MUST-CVS-201`), so it refuses every
row with `module_subject starts with "104 CPS" …`, and a question's
`library_ids`/`resource_ids` pointing at another lane's not-yet-committed
article/resource likewise errors as "does not exist" under `--with`. Same
tool limitation Ain Shams's own `ASU-IBM-biochem-mcq-overlay-*.md` hit and
documented the same way — `gate.mjs simulate` with the real dependency
files is the correct check here, not `gate.mjs batch`.

## Histology tranche (2026-09-02) — two more files, same pattern

Two more files, from the Histology CVS201 EOM MCQ paper (50 MCQs,
`src_0511bc2ebb43a689a4c6`, printed key p.14), depend on 8 concept ids that
exist only in Kasr's own unimported 104-CPS batch — checked directly against
`server/data/medical-library-v1.json`, none of the 8 present. One ninth
Histology concept this tranche also cites, `CON-CVS-CC810A201244F0`
("Pericyte regulation of capillary flow"), IS confirmed live in that same
snapshot — its question (Q19, MCQ key `histo-q19`) is not in either
pending-live file; it is in `question/MUST-CVS-201-histology-mcq.md` instead,
cited directly with no local tag-update record.

| File | Target ids | Records |
|---|---|---|
| `MUST-CVS-201-histology-concepts-overlay.md` | 8 concept ids: 6 in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` (three-tunic plan, artery classification, metarteriole, vein classification, medium-artery-vs-vein, fenestrated capillary), 1 in `docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md` (arteriovenous anastomosis), 1 in `docs/Kasr-Source-Imports/concept/104-CPS-concepts.md` (continuous-vs-sinusoidal capillary) | 8 sparse updates — `+must`, `+2`, `+MUST-CVS-201` on `universities`/`learner_years`/`modules`; `module_subject` restates the source's existing line plus MUST-CVS-201's own |
| `MUST-CVS-201-histology-questions.md` | 45 MCQ records (`QST-MUSTCVS201-HISTOLOGY-PENDING-…`), `main_concept` pointing at the 8 ids above | New records, not sparse updates — `library_ids` names each target concept's own existing article in `docs/Kasr-Source-Imports/article/104-CPS-histology.md` or `104-CPS-articles.md` |

**Apply after**: `MUST-CVS-201-histology-concepts-overlay.md` applies after
its three named dependency files
(`104-CPS-histology-concepts.md`, `104-CPS-mcq-concepts.md`,
`104-CPS-concepts.md`) are live; `MUST-CVS-201-histology-questions.md`
applies after both the overlay file above AND its two article dependencies
(`docs/Kasr-Source-Imports/article/104-CPS-histology.md` for
`ART-104-HIS-HEART-AND-VESSEL-WALL`, `ART-104-HIS-ARTERIES-AND-VEINS` and
`ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS`; `104-CPS-articles.md` for
`ART-104-HIS-CAPILLARY-TYPES`) are live.

Full-tree `gate.mjs simulate` (all 28 MUST-CVS-201-relevant files, tranche 1
and this Histology tranche together, real dependency files first):
`batches=28 created=529 updated=139 rejected=0 skipped=0 errors=0`. The new
overlay batch alone reports `created:0, updated:8` — confirms all 8 rows are
genuine updates onto ids that already exist in the three named dependency
files, not duplicates. `MUST-CVS-201-histology-questions.md` reports
`created:45, updated:0, rejected:0`; `question/MUST-CVS-201-histology-mcq.md`
(the 5 direct, live-or-new-concept MCQs, gated normally with `gate.mjs
batch`, errors=0) reports `created:5, updated:0, rejected:0` in the same
simulate.

`gate.mjs batch` was likewise not run on either new pending-live file, same
tool limitation as above.
