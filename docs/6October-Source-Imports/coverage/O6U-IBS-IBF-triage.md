# O6U-IBS-101 + O6U-IBF-102 -- first-module triage (S3)

Source folder: `Year 1/IBS-IBF/_Telegram O6U Med Bot/`. Two files triaged in full:
`mid module BOS 101 module 1 october.pdf` (M1, 9p, 25 questions) and `mid module
BOS 101 module 2.pdf` (M2, 9p, 25 questions) -- both read page-by-page via
`pagetext.mjs show`, no OCR needed (0 garbled pages, fully native text).

## Why this module, and why these two files

`O6U-IBS-101`+`O6U-IBF-102` was chosen over the larger `Pathology Q Bank.pdf`
(401p/13,301 words, `O6U-IPA-107`) and `Micro q bank.pdf` (251p/7,046 words,
`O6U-IMP-106`) because those two banks' printed keys are sparse or confined to a
small fraction of their pages (see `coverage/O6U-Y1-priority-sources.md`), while
these two mid-module exams are **exported Moodle quiz reports**: every question
prints `"<pct>% of respondents (<n> of <total>) answered this question
correctly"` immediately under the stem, followed by every answer option with its
own respondent count. The key is recoverable by matching the option whose count
equals `<n>` -- Moodle's own grading engine states which option is correct via that
statistic, so this is a printed key, not a clinical inference. 49 of 50 questions
resolve this way with no ambiguity; the one exception (M2 Q6) is a genuine tie
between two options at the same count, and is held per the printed-key-conflict
rule rather than resolved by clinical reasoning.

M1 and M2 are the same underlying question bank sat by two different cohorts (M1:
~218-222 respondents per question; M2: ~193-197) -- roughly 18 of M1's 25 questions
recur verbatim or near-verbatim in M2, which is reflected below by triaging them
once per distinct concept, not twice.

## Per-question key recovery

| # | Source | Question (short) | Recovered answer | Method / confidence |
|--:|---|---|---|---|
| M1-1 | M1 | Epithelial tissue derived from | Three germ layers (200/222) | count match, 90% |
| M1-2 | M1 | Gland with branched duct | Compound gland (150/219) | count match, 68% |
| M1-3 | M1 | Origin of macrophages | Blood monocytes (96/220) | count match, 44% (plurality only) |
| M1-4 | M1 | Fusion of 1ry lysosomes + undigested remnants | Residual bodies (146/218) | count match, 67% |
| M1-5 | M1 | Drug-detox enzymes attached to | Smooth endoplasmic reticulum (116/221) | count match, 52% |
| M1-6 | M1 | Immunity function of | Cell coat (117/220) | count match, 53% |
| M1-7 | M1 | Solution: OH- > H+ | Basic solution (204/221) | count match, 92% |
| M1-8 | M1 | Severe muscle exercise leads to | Metabolic acidosis (199/221) | count match, 90% |
| M1-9 | M1 | Branched amino acid | Valine (170/219) | count match, 78% |
| M1-10 | M1 | Amino acids in glutathione | Glutamic, cysteine, glycine (168/218) | count match, 77% |
| M1-11 | M1 | Normal blood pH | 7.35-7.45 (222/222) | count match, 100% |
| M1-12 | M1 | Pronation: palm faces | Posterior (184/221) | count match, 83% |
| M1-13 | M1 | Inversion: plantar surface faces | Medial (158/221) | count match, 71% |
| M1-14 | M1 | Newly formed bone at diaphysis end | Metaphysis (133/222) | count match, 60% |
| M1-15 | M1 | Articular surface of long bone covered by | Hyaline cartilage (152/222) | count match, 68% |
| M1-16 | M1 | Term for area near the foot | Caudal (150/222) | count match, 68% |
| M1-17 | M1/M2 | Body part not supplied by spinal nerves | Head (M1: 186/220, 85%; M2: 142/197, 72%) | count match both sittings |
| M1-18 | M1 | Only vein carrying oxygenated blood | Pulmonary vein (208/222) | count match, 94% |
| M1-19 | M1 | Not part of the small intestine | Vermiform appendix (191/220) | count match, 87% |
| M1-20 | M1/M2 | Osmosis direction, A more concentrated than B | Water passes B->A (M1: 134/221, 61%; M2: 121/197, 61%) | count match both sittings |
| M1-21 | M1/M2 | Present in the cell membrane | Peripheral proteins (enzyme/hormone receptors) (M1: 80/221, 36%; M2: 89/196, 45%) | count match, **plurality only, both sittings under 50%** -- low confidence |
| M1-22 | M1/M2 | Parasympathetic supply to pelvis | Contract bladder wall + rectum (M1: 155/222, 70%; M2: 137/197, 70%) | count match both sittings |
| M1-23 | M1/M2 | Atropine given for | Spasmodic contractions/colics (M1: 81/217, 37%; M2: 64/197, 32%) | count match, **plurality only, both sittings well under 50%** -- low confidence, flag for review |
| M1-24 | M1/M2 | Prostigmine (AChE inhibitor) effect | Increase gastric secretion (M1: 116/220, 53%; M2: 113/193, 59%) | count match both sittings |
| M1-25 | M1/M2 | Bronchial asthma treated with | Sympathomimetic (M1: 146/221, 66%; M2: 112/196, 57%) | count match both sittings |
| M2-1 | M2 | Site for protraction/retraction | Mandible (149/197) | count match, 76% |
| M2-2 | M2 | Site for inversion/eversion | Foot (159/196) | count match, 81% |
| M2-3 | M2 | Epiphysis develops from | Secondary centers (130/197) | count match, 66% |
| M2-4 | M2 | Meaning of "Lateral" | Away from the medial plane (187/197) | count match, 95% |
| M2-5 | M2 | Muscle: tendon receives fibers from one side | Unipennate (172/195) | count match, 88% |
| M2-6 | M2 | Venous drainage of the intestines | **HELD -- printed-key conflict**: Inferior vena cava and Portal vein both show 81/197 (41%) | tie, not resolved by inference (medically "portal vein" is correct, but the rule is a conflict is a hold) |
| M2-8 | M2 | Right lymphatic duct drains | Right side of the thorax (170/195) | count match, 87% |
| M2-9 | M2 | Celiac disease damages which lining structure | Microvilli (147/194) | count match, 76% |
| M2-10 | M2 | Stain for reticular fibers | Silver & PAS (90/193) | count match, **plurality only, 47%** -- low confidence |
| M2-11 | M2 | Cigarette smoking damages | Cilia (120/196) | count match, 61% |
| M2-12 | M2 | Cell junction allowing molecule passage | Gap junction (137/194) | count match, 71% |
| M2-13 | M2 | Pinocytosis takes in | Fluid particles (168/196) | count match, 86% |
| M2-14 | M2 | RER basophilic due to | Ribosomes (156/196) | count match, 80% |

Questions triaged: **50** (M1: 25, M2: 25). Keys recovered: **49** (M2-6 held on a
printed-key conflict). Four keys (M1-3, M1-21, M1-23, M2-10) are recovered as the
correct option per Moodle's own statistic but reflect a **plurality under or near
50%** of respondents -- worth a second look before authoring, not necessarily
wrong.

## Concept table (distinct tested ideas, collapsed across M1/M2 duplicates)

| Concept | Search term used | Result | Subject placement (if new) |
|---|---|---|---|
| Epithelium derives from the three germ layers | `germ layer` | pending (Kasr 101-ISK) | -- |
| Compound gland = branched duct | `compound gland` | pending (Kasr/import-ready 101-ISK-mcq-concepts) | -- |
| Monocytes are the origin of macrophages | `monocyte` | **live** (`CON-HEM-BD15B63AB982A9` etc.) + many pending | -- |
| Residual bodies = 1ry lysosome + undigested remnants | `residual body` | pending (Kasr 101-ISK-mcq-concepts) | -- |
| Smooth ER handles drug detoxification | `smooth endoplasmic reticulum` | pending (Kasr/AU-MED 101-ISK / AU-MED-102) | -- |
| Cell coat / glycocalyx and immunity | `glycocalyx`, `cell coat` | **live** (`CON-INF-8E477AF19762BE` etc.) + many pending | -- |
| Metabolic acidosis from severe exercise | `metabolic acidosis` | 1 hit found, but for renal-failure acidosis (different mechanism/scope) -- treated as **new** | fnd (exercise/lactic acid-base physiology, not organ-specific) |
| Branched-chain amino acid (valine) | `branched chain amino acid` | pending (Alexandria AU-MED-102-biochem-structural) | -- |
| Glutathione composition (Glu-Cys-Gly) | `glutathione` | **live** (`CON-RES-9DA5B3FB92BC7A` etc.) + many pending | -- |
| Normal blood pH range | `blood pH` | pending | -- |
| Pronation anatomical definition | `pronation` | pending (Kasr 101-ISK) | -- |
| Ankle inversion: plantar surface faces medial | `inversion of foot` | **new** -- no hit | msk |
| Metaphysis = new bone at diaphysis end | `metaphysis` | pending (Kasr 101-ISK-mcq-concepts) | -- |
| Hyaline cartilage covers articular surfaces | `hyaline cartilage` / `articular cartilage` | pending (Kasr 103-BMS-histology) | -- |
| "Caudal" as a directional term | `caudal` | pending (Kasr 101-ISK-mcq) | -- |
| Head is not supplied by spinal nerves (cranial nerves instead) | `spinal nerves` | pending (Kasr 101-ISK-anatomy-2) | -- |
| Pulmonary vein is the only vein carrying oxygenated blood | `pulmonary vein` | pending (Kasr 104-CPS, different module/year -- concept ids are university-blind so this still counts as a hit) | -- |
| Vermiform appendix is not part of the small intestine | `vermiform appendix` | **new** -- no hit | gi |
| Osmosis moves water toward the more concentrated solution | `osmosis` | pending (Kasr 103-BMS / AU-MED-102-physiology) | -- |
| Peripheral membrane proteins act as enzymes/receptors | `peripheral membrane protein`, `membrane protein` | **new** -- no hit | fnd |
| Parasympathetic pelvic supply contracts bladder + rectum | `parasympathetic pelvis` | **new** -- no hit | neuro (autonomic pathway) |
| Atropine for spasmodic colics | `atropine` | **new** -- no hit | pharm (FND -- anticholinergic) |
| Prostigmine (AChE inhibitor) increases gastric secretion | `prostigmine` | **new** -- no hit | pharm (FND -- anticholinesterase) |
| Sympathomimetics treat bronchial asthma | `sympathomimetic` | **new** -- no hit | pharm (FND) |
| Protraction/retraction occur at the mandible (TMJ) | `protraction retraction mandible` | **new** -- no hit | msk |
| Secondary ossification center forms the epiphysis | `secondary ossification center` | pending (Kasr 103-BMS-histology) | -- |
| "Lateral" = away from the median plane | `median plane` | pending (Kasr 101-ISK-mcq) | -- |
| Unipennate muscle architecture | `unipennate` | **new** -- no hit | msk |
| Portal vein drains the intestines | `portal vein` | **new** -- no hit (HELD, see M2-6) | gi |
| Right lymphatic duct drains the right thorax quadrant | `right lymphatic duct` | pending (Kasr/import-ready 101-ISK-mcq-concepts) | -- |
| Celiac disease damages the microvilli | `celiac disease` | **live** (`CON-GIT-9D697B22B63080` etc.) | -- |
| Reticular fibers stained by silver/PAS | `reticular fiber` | **live** (`CON-MSK-0E3AE8E79060E1`) + pending | -- |
| Cigarette smoke damages respiratory cilia | `cigarette smoke cilia` | **new** -- no hit | resp |
| Gap junctions allow molecule passage between cells | `gap junction` | **live** (`CON-GYN-AFE8962308CA70`, different context) + pending (Kasr 101-ISK, closer match) | -- |
| Pinocytosis takes in fluid particles | `pinocytosis` | pending (Kasr 101-ISK-mcq-concepts) | -- |
| RER basophilia is due to ribosomes | `ribosome`, `basophilia` | pending (Kasr 101-ISK-mcq-concepts) | -- |

One tested idea was **not searched** this pass: "a basic solution has more OH-
than H+ ions" (M1-7) is general acid-base chemistry terminology, not
organ/system-specific medicine -- left out of the table above rather than forced
into live/pending/new; flag for the author who picks this module up to search it
before minting.

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| O6U-IBS-101 + O6U-IBF-102 | 50 | 49 | 37 (+1 unsearched, see above) | 6 | 18 | 12 | msk: 4 (ankle inversion, protraction/retraction, unipennate, portal-vein-adjacent anatomy) · gi: 2 (appendix, portal vein) · pharm/FND: 3 (atropine, prostigmine, sympathomimetics) · fnd: 2 (exercise metabolic acidosis, peripheral membrane proteins) · neuro: 1 (parasympathetic pelvic supply) · resp: 1 (cigarette smoke/cilia) |

Live-hit rate (6/36 = 17%) and pending-hit rate (18/36 = 50%) together account for
24 of 36 searched concepts (67%) landing on existing Kasr/Alexandria/Ain Shams
material -- consistent with the expectation that Year-1 body-structure/function
ideas mostly overlap what other universities' Year 1 lanes have already triaged or
authored.

## `BOS final exam 20-21 (o6u bot).PDF` -- triaged, verdict: NO PRINTED KEY (held, do not author)

29 pages, 0 native words (fully garbled scan) -- OCR'd in full (`pagetext.mjs ocr --pages
1-29`, dpi 300, psm 6, all 29 pages readable, no page needed a render for text recovery).
One page (p1) was rendered to verify the OCR reading of the answer-marker glyph
(`/tmp/o6u-final-render/5c0d2bbd-p1.png`, discarded after verification, not committed).

**Verdict**: this file is a Microsoft-Forms PDF export of **one specific respondent's own
completed exam attempt** ("Hi Ahmed, when you submit this form, the owner will be able to
see your name and email address," printed once per page as MS Forms' standard per-respondent
privacy notice), not an official/graded answer key. Every MCQ and True/False item shows
exactly one filled radio button -- OCR renders it as `©`/`@)` (filled) against `O` (empty) --
and the free-text SAQ section (pages 13-14) carries the same respondent's own typed answers.
Render of page 1 confirmed the OCR reading is accurate: the filled button next to "The bond
holds primary protein structure is hydrophobic bond" is **true**, which is a plain error
(primary structure is held by peptide/covalent bonds, not hydrophobic bonds).

At least three of the respondent's marked answers are demonstrably wrong against
undergraduate-level fact, found without rendering every page (this is not an exhaustive
error audit -- the true error rate could be higher, since it was not searched for):

1. **p1 Q2** -- "The bond holds primary protein structure is hydrophobic bond" -- marked
   **true**. Primary structure is held by peptide (covalent) bonds; hydrophobic bonds
   stabilise tertiary structure. Render-verified (see above).
2. **p11** (case) -- "...diagnosed as anaphylactic shock. mast cell is suspected to be
   responsible for this condition" -- marked **false**. Mast cells (IgE-mediated histamine
   release) are the textbook cause of anaphylaxis; this should be true. The same respondent
   repeats the error in the matching free-text SAQ on **p14** ("Can you suspect the cell
   responsible for this condition?" answered "Pericites" [sic] instead of mast cells).
3. **p28** -- "Engulfment of solid material by cell membrane is called Facilitated diffusion"
   -- marked **true**. Engulfment of solid material is phagocytosis; facilitated diffusion is
   passive transport of small solutes down a gradient via a carrier protein. Should be false.

A fourth item is questionable but not certain: **p23**, a Fehling/Benedict's-type reducing-
sugar test marked "negative with **Mannose**" -- mannose is a reducing sugar (should test
positive); sucrose (a non-reducing disaccharide, also an option on the same page) is the
textbook "negative" answer, but the image this OSPE item depends on was not rendered to
confirm which specific test/options applied, so this is flagged, not asserted, as a fourth
error.

Per chief-of-staff ruling (2026-09-02): "the marked radio buttons are one respondent's
answers, not a printed key, so `BOS final exam 20-21` is an UNKEYED source. Do not author
from it and do not invent editorial keys." **No concepts minted, no articles written, no
questions authored from this file.** Nothing in `coverage/seeds/O6U-IBS-IBF/` cites it.

### Full question inventory (for the next author who might reopen this file)

Paper structure, all on Moodle/MS-Forms single-best-answer or true/false format unless
noted: **I-MCQ** 25 items (1 point each, pp1-9) · **II-Cases** 5 clinical-vignette items (2
points each, pp9-11, image-free) · one MRI/joint-type item pair (p11-12, image-dependent) ·
**III-SAQ** 4 free-text items (3 points each, pp13-14, not MCQ-shaped, no options to key) ·
**IV-OSPE** ~25 image-dependent single-best-answer items (1 point each, pp14-24, histology
slides/bone specimens/biochemical test photos -- none of the underlying images were rendered,
since the no-key verdict was already reached from the text-only items) · **V-Oral** ~15
true/false items (pp25-29).

| # | Section | Stem (short) | Respondent's marked answer | Assessment |
|--:|---|---|---|---|
| 1 | I-MCQ | Ventral ramus contains which fibers | Mixed | matches fact |
| 2 | I-MCQ | Bond holding primary protein structure is hydrophobic (T/F) | True | **wrong** (peptide bond) |
| 3 | I-MCQ | Adipose cell is the most common CT cell (T/F) | False | matches fact |
| 4 | I-MCQ | Junction preventing passage of material between cells | Tight junction | matches fact |
| 5 | I-MCQ | In pronation, palm not facing posterior (T/F) | False | matches fact |
| 6 | I-MCQ | Amphoteric = carry equal opposite charges (T/F) | True | matches fact |
| 7 | I-MCQ | Right lymphatic duct does not drain | Left upper limb | matches fact |
| 8 | I-MCQ | Correct statement on membrane transport | Active transport needed against gradient | matches fact |
| 9 | I-MCQ | Ganglia acting only for parasympathetic | Terminal | matches fact (OCR also flagged "paravertebral", read as noise) |
| 10 | I-MCQ | Articular surface of long bone covered by | Hyaline cartilage | matches fact |
| 11 | I-MCQ | Responsible for healing of bones | Periosteum | plausible |
| 12 | I-MCQ | A fixed connective tissue cell | Fibroblasts | matches fact |
| 13 | I-MCQ | Is not an end artery | Uterine | matches fact |
| 14 | I-MCQ | Muscarinic receptors stimulated by | Neostigmine | matches fact (indirect agonist) |
| 15 | I-MCQ | Paramedian plane divides body into equal halves (T/F) | False | matches fact |
| 16 | I-MCQ | Simple cuboidal epithelium present in trachea (T/F) | False | matches fact |
| 17 | I-MCQ | A type of connective tissue proper | Adipose tissue | matches fact |
| 18 | I-MCQ | Site of noradrenaline release | Postganglionic sympathetic nerve endings to heart | matches fact |
| 19 | I-MCQ | Left cervical sympathetic lesion causes | Miosis on the left side | matches fact (Horner's; OCR also flagged "pale skin left", read as noise) |
| 20 | I-MCQ | Glands are rich in lymph vessels (T/F) | True | plausible |
| 21 | I-MCQ | Does not receive parasympathetic supply via vagus | Rectum | matches fact |
| 22 | I-MCQ | Histidine is not a branched ketogenic amino acid (T/F) | True | matches fact |
| 23 | I-MCQ | Rootlets of cilium contain | 9 microtubules | plausible (textbook-dependent phrasing) |
| 24 | I-MCQ | Simple squamous epithelium present in lung bronchioles (T/F) | False | matches fact |
| 25 | I-MCQ | Melanin is chromometalloprotein (T/F) | True | contested/ambiguous (OCR flagged both true and false) |
| 26 | II-Case | Celiac disease damages which part of lining epithelium | Microvilli | matches fact (same fact as live `CON-GIT-9D697B22B63080`, already authored by lane 1) |
| 27 | II-Case | Cigarette smoking damages which part of lining epithelium | Cilia | matches fact |
| 28 | II-Case | Drug to relieve bronchoconstriction | Sympathomimetic drug | matches fact |
| 29 | II-Case | Mast cell responsible for anaphylactic shock (T/F) | False | **wrong** (mast cells cause anaphylaxis) |
| 30 | II-Case | MRI slipped-disc joint type | Secondary cartilaginous | plausible (intervertebral disc) |
| 31-32 | II-Case | Two further joint-type T/F items, image-dependent | true/false (illegible OCR on option labels) | not assessed -- image not rendered |
| 33-36 | III-SAQ | Free-text: non-essential AA, primary amine, simple protein, AA rich in glutamic acid, semi-essential AA | (typed list, several plausible) | not MCQ-shaped, no key to recover |
| 37-39 | III-SAQ | Free-text: vagus action on respiratory/heart/stomach, adrenergic receptor types | (typed list) | not MCQ-shaped |
| 40 | III-SAQ | Free-text: types of bones + example each | (typed list) | not MCQ-shaped |
| 41-43 | III-SAQ | Free-text: cell responsible for anaphylaxis + substances + mechanism | "Pericites" / "Muscrine or Pilocarpine or Metacholine" / "parasympathetic stimulants" | **wrong** on item 1 (mast cells, not "Pericites"); items 2-3 also do not match textbook mast-cell mediators (histamine, not muscarinic agonists) |
| 44-~70 | IV-OSPE | ~25 image-dependent items: anatomical planes, bones/joints, muscle types, Golgi position/stain, tissue fibers/stains, epithelium type/location, organelle ID, biochemical spot tests (Fehling/iodine/Molisch/Seliwanoff), osmotic fragility | various | not assessed -- every item depends on an unrendered image; one (test "negative with Mannose", see above) flagged as likely wrong |
| ~71-85 | V-Oral | ~15 true/false items: adrenaline receptor selectivity, parasympathetic dominance at rest, sympathomimetics for asthma, beta-receptor action, lingual artery tortuosity, thoracic duct drainage side, brainstem/cerebellum relationship, shoulder labrum, phagocytosis-vs-facilitated-diffusion, lysosome/heterolysosome terminology, mother cell of CT cells, blood-cell staining, leucine/helix, calcitonin/protein, glycine/aromaticity | mostly matches fact | 1 confirmed wrong (facilitated diffusion, see above); "mother cell of CT cells is Macrophages" marked false correctly (fibroblast is the true mother cell); "heterolysosome" and "supravital stain" items are terminology calls, not assessed |

Net: even excluding the unassessed image-dependent OSPE block, at least 3 of ~46 text-only
items carry a demonstrably wrong marked answer (~6.5%), consistent with a diligent but
imperfect individual respondent rather than a graded/verified key. This closes triage on
this file; no further work on it without a new ruling.
