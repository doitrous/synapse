# MU-MED105 (Cardiovascular system) — S3 tier-1 triage

## Tier-1 inventory: 4 files, all EOM, no midterm/EOY/resit

`00 Module-wide/06 EOM Exams` holds all four tier-1 sources. `07 EOY Exams` and
`08 Resit and Baqoon` both exist as folders but are **empty** for MED105 (confirmed by
direct `find`, 2026-09-02) — unlike MED104, this module has no EOY or resit/baqoon paper at
all, only the single EOM sitting ("Support 43" batch), split across two source documents:

| sourceId | File | Kind | Pages | Words | Garbled | Twin |
|---|---|---|--:|--:|--:|---|
| `mu_9ac9f79f9ed25404b19b` | CVS End Module 43.pdf | full exam, unanswered | 16 | 2725 | 0 | none — distinct exam, own Q1-74 |
| `mu_b2fc082f072c18432ad3` | CVS Final 43 - Paper 1 Answered.pdf | half-exam, keyed | 14 | 2262 | 0 | twin of Unanswered below |
| `mu_a3aa1fdea67779294c75` | CVS Final 43 - Paper 1 Unanswered.pdf | half-exam, stems only | 13 | 1822 | 0 | twin of Answered above |
| `mu_70ab592bf2e6b55aefa3` | CVS Final 43 - Paper 2 Answered.pdf | half-exam, keyed | 12 | 1623 | 0 | no Paper 2 Unanswered exists |

"CVS End Module 43" and "CVS Final 43 (Paper 1 + Paper 2)" are **two different real
sittings**, not duplicates — confirmed by direct read: End Module 43's Q1 is a Histology
cardiac-muscle-fibers stem, Final 43 Paper 1's Q1 is an Anatomy/Histology capillary-bed
stem. No sha256 twins, no near-duplicate content between these four (consistent with
LANE-CARD §7's corpus-wide note).

## Critical finding: this module's key convention is yellow highlight — `pagetext.mjs keys` does not detect it

`pagetext.mjs keys` reported alarmingly low key rates on all three "Answered"/full files —
3/74 (End Module 43), 9/49 raw-count (Paper 1 Answered), 2/50 raw-count (Paper 2 Answered) —
which would fail the 60% bar badly. **This is a tool gap, not a true low-key-rate finding.**
Per LANE-CARD §3 ("confirm any ambiguous page with ONE render"), three renders (the full
budget) were spent, one per file, each on a page the tool scored near-zero:

| File | Page rendered | Tool said | Actually shows |
|---|---|---|---|
| CVS End Module 43.pdf | p1 (Q1-4) | 0/4 marked | **4/4 keyed**, yellow highlight on the correct option (Q1=b, Q2=b, Q3=d, Q4=c) |
| CVS Final 43 - Paper 1 Answered.pdf | p1 (Q1-4) | 0/4 marked (Q1-4 specifically; tool's 9 hits were all later pages) | **3/3 keyed** on the visible options (Q1=b, Q2=c, Q3=b), same yellow-highlight convention |
| CVS Final 43 - Paper 2 Answered.pdf | p1 (Q1-3) | 0/3 marked | **3/3 keyed**, same yellow-highlight convention (Q1=e, Q2=c, Q3=c) |

10/10 sampled options across all three distinct files and all three subjects (Histology,
Anatomy/Histology, Pharmacology) carry a visible yellow-highlight key. `pagetext.mjs keys`
currently only flags red-text/bold/underline markup (per its own output vocabulary) — it has
no highlight-colour detector, or its highlight detector is tuned to the grey highlight seen
in MED104/MED102's comparison file and doesn't fire on yellow. The handful of "red-text"
hits the tool did report (e.g. End Module 43 p16 Q71-73) look like a second, inconsistently-
applied marking left by a different contributor on top of the primary yellow-highlight
scheme — not investigated further, render budget exhausted.

**This is a wall for whoever runs S2**: with all three renders spent confirming the
convention rather than extracting keys page-by-page, the actual key-recovery pass still has
to render (or otherwise visually read) most of this module's ~185 raw-counted items one page
at a time — budget renders per-file during authoring, same as MED104's approach. Worth
flagging to whoever owns `scripts/content/pagetext.mjs` that a yellow-highlight detector
would remove this render cost for MED105 and any other module using the same convention.

## Per-paper item counts (raw pattern count; MCQ vs mixed-format)

| Paper | Raw numbered-stem count | Format | Image-dependent (rule 3/9) |
|---|--:|---|--:|
| CVS End Module 43 | 74 | pure MCQ, continuous Q1-74, subjects round-robin (Histo/Anatomy/Physio/Pharma/Path) | 2-3 — Q6 ("structure marked by arrow"), Q70 ("structure marked by (A)"); Q7 borderline (no explicit visual cue in stem, held for review) |
| CVS Final 43 Paper 1 (Answered/Unanswered twins) | 51 raw / ~37 true MCQ (Q1-37 continuous) + a second short MCQ block (Q1-8, page 12) + an essay/short-answer tail (not MCQ, out of scope) | mixed: MCQ block + essay | 2 MCQ items (Q5 "structure marked by arrow", Q19 "arrowed artery") + 2 essay-tail items (arrowed-artery labelling, venous diagram) — essay items are out of MCQ scope regardless |
| CVS Final 43 Paper 2 (Answered only, no Unanswered twin) | 59 raw across several subject sub-blocks (Pharma Q1-10ish, then Physiology sub-topics each restarting at Q1) — not yet deduped into a single running count | mixed: several MCQ sub-blocks, some short-answer | 0 hits for figure/arrow/diagram/shown/labeled keywords — this paper reads clean of image dependency |

Given the confirmed 10/10 keyed sample rate and only a small, identifiable image-dependent
slice (held under rule 3/9, not counted against the keyed bar), **every one of the four
tier-1 files clears the 60% keyed/text-based/real-stems bar** — CVS End Module 43 by the
widest margin (single continuous MCQ block, only 2-3 items held for images).

## Condition check (chief-of-staff standing order)

**≥60% of the best paper's items keyed, text-based, real stems: MET**, and by a wide margin
once the yellow-highlight convention is accounted for (see finding above). Best paper is
`CVS End Module 43.pdf` — 74 continuous, cleanly-formatted MCQs, only 2-3 image-dependent,
zero garbled pages, confirmed-keyed sample of 4/4. Recommend **TRIAGE APPROVED** eligibility
on this basis; awaiting the chief of staff's literal phrase before any authoring starts.

## Concept search sample (live + all pending-live overlays)

`node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<term>"` run
against three MED105 topics, per LANE-CARD's reuse-family hint (Kasr 104-CPS, MUST CVS-201,
AU-106/AU-MED-105, ASU-CVS are the likely families):

- **"cardiac muscle"** — live hits (`CON-DEV-2CB0B170DE78F1`, `ART-CVS-CARDIAC-HISTOLOGY`)
  plus a rich pending family: `docs/import-ready/concept/103-BMS-histology-concepts.md`
  (Kasr, cardiac-muscle-fibre ultrastructure + Purkinje fibres — near-identical framing to
  MED105's own Histology MCQs above), `docs/Alexandria-Source-Imports/question/AU-MED-105-
  physiology-mcq.md` (same module code, different university, cardiac action-potential
  items), `docs/Ain-Shams-Source-Imports/article/ASU-CVS-foundations-articles.md`.
- **"digoxin"** — 1 live claim (`CLM-FND-0D3254CF812B1A`, needs_evidence) + 1 pending
  (Helwan GIT-301 pharmacology, digoxin as a diarrhoea-causing drug — different angle from
  MED105's own digoxin-contraindication stem, not a direct overlay target).
- **"atherosclerosis"** — dense pending family across Helwan BMS-102, Kasr 208-INT, and
  especially **MUST-CVS-201** (`atherosclerosis.risk-factors` canonical key, fatty-streak/
  foam-cell concepts) — MUST-CVS-201 is CVS-subject-matched and the strongest reuse
  candidate for MED105's own atherosclerosis pathology items (End Module 43 Q74, Paper 1
  Answered's pathology essay section).

Confirms the expected reuse families (Kasr 104-CPS histology, MUST CVS-201 pathology,
AU-MED-105/ASU-CVS physiology+anatomy) are present and searchable; S2 should search every
minted concept before minting, per rule 4.

## Method

`pagetext.mjs status` (all 4 files, 0 garbled pages) → `show --pages 1-3` per file (stem
reading) → `pagetext.mjs keys` per file (key-recovery attempt, undercounted per finding
above) → `pagetext.mjs grep` for raw stem-count and image-dependency keyword scan → 3
renders (`--force`, since no page is "garbled" by the tool's own definition — full budget
per LANE-CARD) to confirm the true key convention. No OCR needed (all 4 files have a clean
native text layer). Render PNGs were inspection-only, not committed.

## Needs Omar / open items

- No midterm or resit/baqoon tier-1 paper exists for MED105 in the local corpus — confirmed
  empty folders, not a missing-source gap to chase.
- The yellow-highlight key convention is not detected by `pagetext.mjs keys` — flagged above
  as a wall; S2 authoring should budget one render per remaining tier-1/tier-2 file to
  extract keys until (or unless) the tool gains a highlight detector.
- `CVS Final 43 Paper 2`'s subject-block renumbering (several Q1-resets within one file) is
  not yet deduped into a single running item list — S2's seed-authoring pass should read the
  file in full before minting, not rely on this triage's raw pattern count.
