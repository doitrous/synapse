# PUBLISH PLAN — Alexandria Year 1 (2026-08-22)

## Per module — done / remaining / owner / ETA
| Module | Done | Remaining | Owner | ETA (wall-clock, Sonnet lanes) |
|---|---|---|---|---|
| AU-MED-102 | academic batch; manifest; 5 triages (ANAT 31 ideas, BIOC ~334, EMBR 18, HIST+PHYS 58, TERM ~150 mostly glossary) | Step 2–4 authoring; BIOC split into 4 topic sub-lanes; TERM glossary-first | 8 lanes | triage→author 4–6 h after approval; BIOC sub-lanes the long pole |
| AU-MED-103 | 3 triages (BIOC 39, HIST 23, PHYS 20) | Step 2–4; PHYS articles cite a catalogued textbook (no teaching text in corpus); boundary questions to HIST | 3 lanes | 3–4 h |
| AU-MED-105 | 3 triages (ANAT 86, HIST 30, PHYS 23) | Step 2–4 under bank guard; --layout key recovery for 5 banks; 32 labelling media requests | 3 lanes | 4–5 h (ANAT long pole) |
| AU-MED-106 | 2 triages (ANAT 30, PHYS 35); bank guard confirmed, NO paper anywhere | Step 2–4 under bank guard; BIOC/HIST deferred to wave 2; ink-annotation key confirmation at 200 dpi | 2 lanes | 3–4 h |
| AU-MED-101 | nothing — empty corpus | Telegram fetch first; no lane until a source exists | fetch lane | blocked on browser slot |

## Ordered import checklist for Omar (per docs/import-ready INDEX order)
1. Academic setup › Import, AU selected: docs/import-ready/academic/au-modules.md (23 modules, AU-… ids). Once only.
2. Kasr Year 1 batches that Alexandria's pending-live updates depend on (named per file in docs/Alexandria-Source-Imports/pending-live/INDEX.md) — apply those Kasr files first.
3. docs/Alexandria-Source-Imports/evidence/ resources (catalogue) → article/ → concept/ → evidence (claims, citations, spans) → question/ + written/ — one module at a time in the order the INDEX lists, Bulk import with "Update matching items" ON.
4. pending-live/ files LAST, only after step 2's files are live; each carries its "apply only after …" line.
5. Media requests land in Library Setup → Media requests automatically; ~100+ image-dependent items (105 labelling spots, 106 anatomy bank, histology diagrams) will not publish until fulfilled.

## What needs Omar
- Telegram: Alexandria channel links (none are known; the corpus carries no provenance). MED 101 anything; MED 106 any EOM/EOY paper; MED 103 physiology lecture notes and anatomy; MED 105 biochemistry; MED 102 genetics (pathology); MED 102 biochemistry metabolism/blood/bioenergetics teaching text.
- Zero orientation/syllabus documents for any Alexandria module — the examined scope is inferred from papers and banks only.
- Confirmation of which Kasr Year 1 batches are already applied in production (drives pending-live ordering).
- The list of applied batches / production snapshot (`medical:snapshot-live`) so HIT-PENDING can become HIT-LIVE.

## Corrections to issue with TRIAGE APPROVED
- ALL lanes: the ≥4-query find-existing + canonical-key grep is mandatory per idea at mint time (several lanes sampled 1–2 queries); HIT-PENDING → pending-live/<slug>.md with the Kasr file named; simulate own directory only; subject from the 20; AU- ids; universities non-empty.
- 102-TERM: GUARD=bank; glossary-shaped items via 11-glossary-terms (pipe table), dedupe against docs/import-ready/glossary; concepts only for the ~15 concept-shaped ideas.
- 102-BIOC: split — sub-lane A structural CHO/lipid/protein chemistry + enzymes; B bioenergetics + CHO/lipid metabolism; C amino-acid/nitrogen/purine/heme/vitamins + blood; D molecular biology + signalling. Paper-tested ideas first; AFM bank primary; 132 no-text questions get textbook-resource articles and go on the fetch list.
- 102-HIST: Physiology IS examined — author it (fold stands only as one lane).
- 103-HIST/103-PHYS: the 5 boundary questions belong to Histology (has the department book); Physiology references the IDs.
- 103-PHYS: articles cite a catalogued standard physiology textbook resource (12-resources); note the absence of teaching text in field_notes.
- 105 all: bank guard stands (EOM MCQs file is a lecturer bank — evidence recorded); use the .layout.json sidecars for keys; labelling items = required media requests, never prose rewrites.
- 106 all: bank guard stands; 106-ANAT confirms ink-annotation letters at 200 dpi before Step 3; dubious marked answers phrased as sourced, not laundered.
- Everyone: record the questionable printed keys exactly as the triage did; never reconcile silently.
- 105-PHYS: the 10 cardiac-electrophysiology ideas are bank-tested → in scope; subject `cvs`; search live CVS concepts (Kasr 104 CPS) first — several are likely HIT-LIVE; author the rest from a catalogued CVS reference with a field_notes line that the department books do not cover them.
