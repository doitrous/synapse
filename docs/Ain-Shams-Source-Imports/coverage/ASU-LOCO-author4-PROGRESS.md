# ASU-LOCO-author4 progress (render-and-read biochem/parasit pass)

Branch: `asu-loco-author4`, based on `origin/asu-loco-author3` @ 7c5fbe78.

## Done

**Parasitology (25/25 MCQs) -- COMPLETE.**
- `docs/Ain-Shams-Source-Imports/question/ASU-LOCO-inf-parasitology-practical-mcq-1.md` (Q1-13)
- `docs/Ain-Shams-Source-Imports/question/ASU-LOCO-inf-parasitology-practical-mcq-2.md` (Q14-25)
- 1 new concept minted: `CON-INF-90289E813F213F` (Cimex lectularis identification), added to
  `docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-inf-parasitology-concepts.md` and back-linked
  into `ART-INF-ASU-LOCO-ARTHROPOD-VECTORS`'s `related_concepts` in
  `docs/Ain-Shams-Source-Imports/article/ASU-LOCO-inf-new-articles.md`.
- All other 12 concepts + both articles reused as authored in a prior pass (still pending import,
  not yet live -- confirmed via `server/data/medical-library-v1.json` grep, zero hits for any of
  the 12 ids before this session).
- Validated: `medical:batch` on each file separately (0 errors, fieldsUsed 51 both), `medical:simulate`
  positional across both files + concept/article/resource siblings together (created 25 questions,
  2 articles, 13 concepts, 3 resources; 0 rejected, 0 errors), `medical:audit` on the combined emit
  (zero findings reference any `QM-ASULOCO-*` id; the pre-existing concept/article evidence-chain
  gaps were baseline-diffed against `origin/asu-loco-author3` and confirmed already present there,
  not introduced this session).
- Pushed: `asu-loco-author4` @ e24a6c8c (2 commits: f36ba931, e24a6c8c).

Render method: `pdftoppm -png -r 200` on
`~/Desktop/Ain Shams/Year 1/Term 2/Locomotor System/Parasitology/Practical/Slides/MCQs - Para Dr
Ayman Locomotor Practical MCQ 2025.pdf` (manifest `src_45be51497717229c4fb8`), 8 pages rendered to
`/private/tmp/.../scratchpad/loco-render/para/p-*.png`, each read directly (no OCR -- confirmed
zero embedded fonts via `pdffonts`, zero extractable text via `pdftotext -layout`). Full printed
answer key (25/25) is a table on the PDF's page 6 (rendered page 7 of 8).

20 of 25 items reproduce the printed stem/options verbatim with a required `media_recommendations`
block (the photograph is genuinely load-bearing). 5 items (11-15) used an unlabelled three-photo
(A/B/C) choice format with no printed species names; those were reformatted as standard named-option
questions testing the same standard, independently well-established teaching fact carried by the
printed clinical vignette (which was itself fully legible and self-sufficient text) -- noted
per-item in `author_notes`. No stem/option/key was found illegible or excluded.

## Not started

**Biochemistry (~88 MCQs across 5 sections) -- NOT STARTED THIS SESSION.**

Source: `~/Desktop/Ain Shams/Year 1/Term 2/Locomotor System/Biochemistry/Questions/MCQs/MCQs -
Biochemistry Locomotor MCQs - CA1.pdf` (manifest `src_e4a23646b45bcc340c70`), 14 pages, confirmed
zero embedded fonts / zero extractable text (same no-text-layer finding as parasitology). Rendered
this session to `/private/tmp/.../scratchpad/loco-render/bio/p-01.png` .. `p-14.png` at 200dpi, but
**not yet read** -- resume here.

5 sections per the triage (`coverage/ASU-LOCO-triage.md` section B): Collagen (~30), Calcium &
Vitamin D (~18), Purine Catabolism (~16), Muscle Energy/Creatine (~20), "Important MCQs" clinical
vignettes (4). Each section has its own printed answer table (triage confirms all 5 legible).

Existing sparse-update concept drafts for this module, in
`docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-biochemistry.md` (5 records, sparse updates
onto Kasr/Alexandria concept ids -- collagen hydroxylation `CON-FND-96FF52D15F67AE`, scurvy
`CON-FND-46C9A4425362B0`, plus 3 more not yet inspected this session): **gated on those target
files being live** (`docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md`,
`101-ISK-mcq-concepts.md`, `103-BMS-mcq-purine-concepts.md`, `103-BMS-mcq-carbohydrate-concepts.md`,
`docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md`) -- **not checked
this session whether those 5 target files are now live**; check first before reusing. These 5
sparse-updates cover only a handful of specific facts, not full coverage of all ~88 questions --
most of the ~15 distinct concepts the triage names (calcium homeostasis, vitamin D activation,
Lesch-Nyhan, AGAT deficiency, Ehlers-Danlos, etc.) will need search-before-mint from scratch,
following the exact same pattern used for parasitology this session (mint-concept-id.mjs, INF/FND/
MSK system code as appropriate, article-per-concept-group backing before questions).

## Resume-first steps for the next session

1. `git fetch origin && git checkout -b asu-loco-author5 origin/asu-loco-author4` (do not resume
   this session).
2. Read `/private/tmp/claude-501/.../scratchpad/loco-render/bio/p-01.png` onward (that scratchpad
   is session-scoped and WILL be gone -- re-render first: `pdftoppm -png -r 200 "<the biochem PDF
   path above>" <outprefix>`).
3. Check whether the 5 Kasr/Alexandria target concept ids in
   `pending-live/ASU-LOCO-msk-biochemistry.md` are live yet (`grep` each id in
   `server/data/medical-library-v1.json`); if live, apply that sparse-update file as its own small
   commit before starting new question authoring.
4. Follow the parasitology pattern: read every page by eye, transcribe verbatim, recover each
   section's printed key, search-before-mint (`find-existing.mjs`) before minting any new concept,
   write one article per concept group, write questions in ~12-15-item files, validate
   (`medical:batch` per file, `medical:simulate` positional across the whole set, `medical:audit`
   diffed against baseline), commit each file separately, push to `asu-loco-author5`.

HANDOFF: asu-loco-author4@e24a6c8c · resume-first: biochem p1 (render fresh, not started)
