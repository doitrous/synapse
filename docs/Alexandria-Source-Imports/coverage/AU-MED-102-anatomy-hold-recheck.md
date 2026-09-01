# AU-MED-102 Anatomy — hold recheck, 2026-09-02

HANDOFF.md INCOMPLETE item 6: 17 of the 23 `pending-live/AU-MED-102-anatomy.md`
Kasr-overlay concepts had no teaching article in the Kasr 101-ISK batch when this
lane last checked, so their questions were held rather than authored around.
Kasr 101-ISK finished its two-sided coverage-verification pass (279/282) on
2026-08-23 and went live 2026-08-27 — recheck below.

**Correction to the "17" count:** working from the 23 ids actually listed in
`pending-live/AU-MED-102-anatomy.md` against the ids actually tested in
`pending-live/AU-MED-102-anatomy-questions.md` (`## main_concept`), 5 of the 23
are tested, not 6 — so **18** were held, not 17. (The stale "6 of 23" prose is in
that questions file's own header comment; not corrected here since this lane
does not own rewriting other lanes'/its own past header comments as content.)

## Method

For each of the 18 held ids: `grep -l <id> docs/Kasr-Source-Imports/article/*.md
docs/import-ready/article/*.md`, then read the matching article's
`related_concepts` field (not just any text match — LANE-BRIEF's own warning is
that a concept-side `article_ids` link or an incidental grep hit is not proof)
and its `## sections` body to confirm the article actually teaches the fact, not
just names the id in passing.

## Result: 18/18 now covered, 0 uncovered

| Concept id | Label (short) | Now taught by |
|---|---|---|
| CON-MSK-D193498AB94D21 | Anatomical (erect) position | ART-101-ANA-INTRODUCTION |
| CON-MSK-EE7CDEF8ACA587 | Three anatomical planes | ART-101-ANA-INTRODUCTION |
| CON-MSK-A0C1F50FABDC0F | Medial/lateral, proximal/distal | ART-101-ANA-INTRODUCTION |
| CON-MSK-9A22BB8909AF29 | Axial vs appendicular skeleton | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-00B4A0D32A6420 | Six bone shape classes | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-6DCABD3AE947F5 | Pneumatic bone function | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-EFD497A9922A4D | Long bone parts (epi/dia/metaphysis) | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-C30E73A5353ABB | Long bone growth, growing end | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-40012FE18569EC | Long bone's 4 arteries | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-2C78EFB16CA67F | Membranous vs endochondral ossification | ART-101-ANA-SKELETAL-SYSTEM |
| CON-MSK-4D7492BC85C03D | Upper limb joints classified by shape | ART-101-ANA-SYNOVIAL-JOINTS |
| CON-MSK-B88F413E4536F9 | Joint movement follows type/axes | ART-101-ANA-ELBOW-JOINT, ART-101-ANA-SHOULDER-REGION |
| CON-MSK-CBB4C433F2F81E | Elbow's 4 nerves (not axillary) | ART-101-ANA-RADIAL-NERVE |
| CON-MSK-229AAD0C8626CF | 3 muscle types classification | ART-101-ANA-MUSCLE-ATTACHMENTS |
| CON-MSK-4018ED42ADDDB4 | Muscle attachment (bone/raphe/skin/cartilage) | ART-101-ANA-MUSCLE-ATTACHMENTS |
| CON-MSK-F598AF39FBE297 | 4 muscle action roles | ART-101-ANA-MUSCLE-ATTACHMENTS |
| CON-MSK-BF3670E27D6F12 | Thoracic vs right lymphatic duct | ART-101-ANA-LYMPHATIC-SYSTEM |
| CON-MSK-888467E7C45479 | Muscle fibre architecture | ART-101-ANA-MUSCLE-ATTACHMENTS |

Spot-verified in full (not just related_concepts membership) for
ART-101-ANA-SKELETAL-SYSTEM and ART-101-ANA-MUSCLE-ATTACHMENTS (the two articles
covering 11 of the 18 ids) — both have real `### Definition`/`### Mechanism`/
`### Key determinants` prose naming every fact these concepts test, not a
passing mention. The other 6 articles were confirmed by targeted keyword search
inside their bodies (e.g. "thoracic duct": 7 hits in ART-101-ANA-LYMPHATIC-SYSTEM,
"erect position": 5 hits in ART-101-ANA-INTRODUCTION) rather than full read, given
the count of articles involved.

## Questions: released 0, not 18 — nothing was ever parked to move

Searched the whole `docs/Alexandria-Source-Imports/` tree for a draft/parked
question testing any of the 18 ids (not just `pending-live/AU-MED-102-anatomy-
questions.md` — the whole tree). None exist. `question/AU-MED-102-anatomy-mcq.md`'s
own header says so explicitly: the questions for "the 23 pending-live... concepts"
beyond the first 3-NEW-concept slice are "OWED... real but separate follow-up
work" — they were scope-excluded from authoring at the time, not authored and
set aside. The exam evidence for many of these facts (paper + page) is already
extracted in `coverage/AU-MED-102-anatomy-triage.md`, so authoring is unblocked,
but writing 18 new gate-clean MCQs (each needing 4 sourced answers/explanations)
is content authoring, not a tag/coverage recheck — flagged below as owed
follow-up rather than rushed in this pass.

## Gate

Nothing changed in `pending-live/AU-MED-102-anatomy-questions.md` or
`pending-live/AU-MED-102-anatomy.md` this pass (no questions to move, no id
changes) — not re-gated, no new run to report.

## Owed follow-up (not done here)

Author 18 new MCQs (one per id above, main_concept = that id) into
`pending-live/AU-MED-102-anatomy-questions.md`, apply-after
`101-ISK-mcq-concepts.md` + `101-ISK-anatomy.md` + `101-ISK-anatomy-2.md` (all
already live) + this lane's own `concept/AU-MED-102-anatomy-concepts.md` /
`article/AU-MED-102-anatomy-articles.md` / `evidence/AU-MED-102-anatomy-*.md`,
then `gate.mjs batch ... --with <those 5 files>` and `gate.mjs simulate` per the
file's own existing header commands.
