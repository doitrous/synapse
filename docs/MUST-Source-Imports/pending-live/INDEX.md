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

## Anatomy tranche (2026-09-02, lane 3, branch `must-cvs201-author3`) — two more files

Two more files, from the Anatomy CVS201 EOM Final paper (105 items: 100 MCQ
across 5 topics + 6 essay, `src_ac0704bd16ff99889463`, each MCQ section
printed on its own answer page), depend on 21 concept ids: 20 in Kasr's own
unimported 104-CPS batch, 1 in the Year-3 SYS-CVS congenital heart disease
catalogue — checked directly against `server/data/medical-library-v1.json`,
none of the 21 present.

| File | Target ids | Records |
|---|---|---|
| `MUST-CVS-201-anatomy-concepts-overlay.md` | 21 concept ids: 20 in `docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md` (coronary arteries, cardiac veins, aortic sinuses, conducting system, arch of aorta, pulmonary trunk/ligamentum arteriosum, descending thoracic aorta, recurrent laryngeal nerve, vagus nerves, oesophagus, thoracic duct, diaphragm openings, superior mediastinum, and 6 embryology concepts), 1 in `docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md` (Tetralogy of Fallot) | 21 sparse updates — `+must`, `+2` (where not already present), `+MUST-CVS-201` on `universities`/`learner_years`/`modules`; `module_subject` restates each source's existing line plus MUST-CVS-201's own (the Tetralogy row has no prior `module_subject` to restate) |
| `MUST-CVS-201-anatomy-questions.md` | 49 MCQ records (`QST-MUSTCVS201-ANATOMY-PENDING-…`), `main_concept` pointing at the 21 ids above | New records, not sparse updates — `library_ids` names each target concept's own existing article, in `docs/Kasr-Source-Imports/article/104-CPS-anatomy.md` for the 20 Kasr-sourced concepts, `docs/import-ready/article/SYS-CVS-ARTICLE-T08.md` (carries `ART-CVS-TETRALOGY-OF-FALLOT`, SYS-CVS catalogue) for the Tetralogy question |

**Apply after**: `MUST-CVS-201-anatomy-concepts-overlay.md` applies after its
two named dependency files (`104-CPS-anatomy-concepts.md`,
`SYS-CVS-CONCEPT-T08.md`) are live; `MUST-CVS-201-anatomy-questions.md`
applies after both the overlay file above AND its article dependencies
(`docs/Kasr-Source-Imports/article/104-CPS-anatomy.md` for the 20
Kasr-sourced articles, the SYS-CVS Tetralogy article for the one Year-3
question) are live.

Full-tree `gate.mjs simulate` (all files above, real dependency files
first): see commit body / `coverage/MUST-CVS-201-GATES.md` for the pasted
summary line from this pass.

`gate.mjs batch` was not run on either new pending-live file, same tool
limitation as above (a sparse update's `module_subject` and a question's
`library_ids`/`resource_ids` pointing at another lane's not-yet-committed
concept/article both error under `--with`; `gate.mjs simulate` with the real
dependency files is the correct check here).

## Anatomy2 tranche (2026-09-02, lane 4, branch `must-cvs201-author4`) — two more files, closes the Anatomy paper

Two more files, from the same Anatomy CVS201 EOM Final paper the tranche-3
pair above already covers — this tranche authors the remaining half (50 of
51 un-authored MCQs; 1 held). Depends on 22 concept ids: 20 already pending
in `104-CPS-anatomy-concepts.md` (reused directly, no new overlay row — the
tranche-3 overlay file above already carries them), 1 more pending in
`SYS-CVS-CONCEPT-T08.md` (Eisenmenger physiology, a second record from the
same file already overlaid there for Tetralogy of Fallot), and 1 more
pending in `104-CPS-anatomy-concepts.md` (cardiac looping / dextrocardia,
extended to cover "situs inversus"). One MCQ (ESO-Q15, abdominal oesophagus
/ left gastric artery) is a genuine new mint instead — no existing concept
anywhere in the corpus covers it — in `concept/`, `article/`,
`evidence/{claims,citations,spans,sources}.md` (own lane files, not
pending-live).

| File | Target ids | Records |
|---|---|---|
| `MUST-CVS-201-anatomy2-concepts-overlay.md` | 2 concept ids: 1 in `104-CPS-anatomy-concepts.md` (cardiac looping/dextrocardia), 1 in `SYS-CVS-CONCEPT-T08.md` (Eisenmenger physiology) | 2 sparse updates — same `+must`/`+2`/`+MUST-CVS-201` pattern as the tranche-3 overlay; the SYS-CVS-CONCEPT-T08 row has no prior `module_subject` to restate, same as that file's Tetralogy row |
| `MUST-CVS-201-anatomy2-questions.md` | 50 MCQ records (`QST-MUSTCVS201-ANATOMY2-PENDING-…`), `main_concept` pointing at the 22 ids above (20 already covered by the tranche-3 overlay, 2 new in this tranche's own overlay) plus the 1 new-mint concept (`library_ids` names its own new article, not pending) | New records, not sparse updates |

**Apply after**: `MUST-CVS-201-anatomy2-concepts-overlay.md` applies after
its two named dependency files (`104-CPS-anatomy-concepts.md`,
`SYS-CVS-CONCEPT-T08.md`) are live, same as the tranche-3 overlay row it
sits alongside; `MUST-CVS-201-anatomy2-questions.md` applies after both
overlay files above AND `docs/Kasr-Source-Imports/article/104-CPS-anatomy.md`
/ the SYS-CVS Eisenmenger article (`docs/import-ready/article/SYS-CVS-ARTICLE-T08.md`,
already live-dependent for Tetralogy) are live. The one new-mint question
(ESO-Q15) has no pending-live dependency at all — its concept, article and
evidence chain are this lane's own committed files.

Full-tree `gate.mjs simulate` (34 files: the 32-file tree tranche 3 ran plus
this tranche's 2 new pending-live files, real dependency files first):
`batches=34 created=663 updated=165 rejected=0 skipped=0 errors=0`. The new
anatomy2 overlay batch alone reports `created:0, updated:2` — confirms both
rows are genuine updates onto ids that already exist in their two named
dependency files, not duplicates. `MUST-CVS-201-anatomy2-questions.md`
reports `created:50, updated:0, rejected:0`. Direct `node
scripts/validate-content-batch.mjs` and `node scripts/simulate-content-import.mjs`
re-runs (same file list) both confirm the same zero-error result, ruling out
the `gate.mjs`-prints-`errors=0`-on-crash failure mode.

`gate.mjs batch` was not run on either new pending-live file, same tool
limitation as above. One extra wrinkle this tranche hit and fixed: a
citation against `src_ac0704bd16ff99889463` (the Anatomy paper's own
resource, for the ESO-Q15 new mint) failed `gate.mjs batch`'s "Resource …
does not exist" check even with `resource/MUST-CVS-201-resources.md` passed
via `--with` — traced to `scripts/validate-content-batch.mjs`'s citation
check only counting sibling rows whose batch-kind is `resource` (needs
`institution`+`processing_status` fields) towards a citable resource set,
never `catalogue-resource` (needs `source`+`type`, what
`resource/MUST-CVS-201-resources.md` actually is). Fixed by adding this
resource's own record to `evidence/MUST-CVS-201-sources.md` (the `resource`-kind
evidence-source registry already sitting beside `citations.md`, which
`gate.mjs`'s directory scan picks up automatically) — the 3 tranche-1/2
resources already had entries there, this tranche's new one (the Anatomy
paper, first cited only now that a new mint needs it) did not. Also merged
one new entry into the shared `evidence/corpus-source-index.json` (35 → 36
sources) for the same resource, needed by a separate, independent check.
