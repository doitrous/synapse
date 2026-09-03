# O6U-IMN-105 -- triage (S1-S3)

Source folder: `Year 1/MEN-IMN/_Telegram O6U Med Bot/`. Two of the four manifest files
triaged this pass (`Metabolism MCQ+20-21 #Diaa (O6U).pdf` and `Metabolism cases ++ Ro
Tele.pdf`, both tier 3/4 and fully garbled, were not opened this pass -- flagged for a future
look).

## `Metabolism mid exam -_-20-21 #Diaa (O6U bot)(2).pdf` -- TIER 1, 15p / flagged for a
visual check (`coverage/O6U-Y1-priority-sources.md` item 4)

This is a Google Forms "results view" export, screenshotted one question per page (15
questions, mixed 4-option single-best-answer and true/false). Every page carries a hand-drawn
**blue circle** around one option -- a genuine answer-key annotation, distinct from the
Google Forms teal "respondent selected this" highlight visible on some pages (a UI artifact
showing what the person who took the form actually picked, which can be wrong).

**Trap found and resolved**: on Q11 ("Which of the following hormones is not anti-insulin?"),
the blue circle marks **Parathormone** (medically correct -- PTH has no role in glucose
counter-regulation) while the page's teal "respondent selected" highlight marks **Growth
hormone** instead (medically wrong -- growth hormone genuinely is anti-insulin). This is the
same class of trap as the O6U-IBS-IBF lane's "BOS final exam" (a single respondent's own
mark, sometimes wrong) -- resolved the same way, by never keying from the respondent's own
selection and instead reading the independently-added, fact-checkable annotation (here, the
blue circle; there, a printed vote-count). All 15 blue-circled answers were rendered and
read individually, then cross-checked against standard biochemistry fact:

| Q | Topic | Blue-circled answer | Fact-check |
|--:|---|---|---|
| 1 | Why hypoglycemia is dangerous | Affects glucose supply to the brain | matches fact |
| 2 | Not a Complex I component | Succinate dehydrogenase | matches fact |
| 3 (T/F) | 50-120 mg/dl = normal fasting range | False | matches fact |
| 4 | Best definition of glucosuria | Detectable glucose in urine | matches fact |
| 5 | Hypoglycemia's blood glucose level | Less than 45 mg/dl | course-specific cutoff, flagged |
| 6 (T/F) | Muscle glycogen supplies blood glucose directly | False | matches fact |
| 7 (T/F) | G6PD deficiency + aspirin | True | matches fact |
| 8 (T/F) | Nucleus is the site of glycolytic enzymes | False | matches fact |
| 9 (T/F) | Peptide bond is high-energy | False | matches fact |
| 10 | TCA enzyme that is also an ETC member | Succinate dehydrogenase | matches fact |
| 11 | Hormone NOT anti-insulin | Parathormone | matches fact (teal highlight disagreed, wrong) |
| 12 (T/F) | Hereditary fructose intolerance -> hypoglycemia | True | matches fact |
| 13 (T/F) | Favism NOT associated with hemolysis | False | matches fact |
| 14 (T/F) | Galactosemia -> cataract | True | matches fact |
| 15 (T/F) | Favism = G6-phosphatase deficiency | False | matches fact (it's G6PD, a different enzyme) |

**Triaged: 15. Keys recovered: 15 (100%). Zero holds for key quality.**

### Authored this pass: 6 of 15 (40%)

Only the **6 four-option single-best-answer questions** (Q1, Q2, Q4, Q5, Q10, Q11) were
authored. The other **9 are true/false (2 options)**, held per this dispatch's standing floor
(`<4 options held`) -- not a key-quality problem, every one of the 9 is genuinely keyed and
fact-checked, just structurally out of scope for single-best-answer authoring.

`pagetext.mjs keys` was tried first per LANE-CARD guidance but failed
(`pdf_visual_keys.py: statistics.StatisticsError: no median for empty data` -- these pages
are image-only screenshots with no extractable text layer for the line-height heuristic to
work against), so all 15 pages were read by direct render + visual inspection instead.

## `Collection of Final meta Exams ( O6U).pdf` -- TIER 1, 12p fully garbled

OCR'd in full. This is a 12-page compilation of roughly five different O6U biochemistry final
exam papers spanning 2007-2013 (June 2007, January 2012, June 2013, January 2010, January
2009), overwhelmingly essay-format ("show only two of the following pathways", "enumerate
only six", "give the biochemical reason of only three") with two visible MCQ sections: page 4
(10 MCQs, following the June 2013 paper's essay portion) and page 7 (9 MCQs, a standalone
"Answer the following MCQ" section, 19 MCQ items total). A targeted grep for
`key|answer key|correct answer|model answer` across all 12 pages returned **zero hits** --
this file's MCQ sections carry no printed key of any kind, consistent with these being raw,
uncorrected past-paper scans rather than a study aid with an appended key. Several of the 19
MCQs are independently fact-checkable (e.g. p4 Q10 "Von Gierke disease is: metabolic disease
caused by deficiency of liver glucose 6 phosphatase" has an unambiguous correct textbook
answer), but per standing rule ("never key... by fact-checking"), **no answer was invented**
for any of them.

**Triaged: 19 (MCQ sections only; the essay sections are not MCQ-format and are out of
scope). Keys recovered: 0 (0%). All 19 held.**

## Checkpoint table

| Source | Items | Keyed | Keyed % | Authored |
|---|--:|--:|--:|--:|
| Metabolism mid exam (2).pdf | 15 | 15 | 100% | 6 |
| Collection of Final meta Exams.pdf | 19 (MCQ only) | 0 | 0% | 0 |
| **Module total** | **34** | **15** | **44%** | **6** |

Module-level keyed rate (44%) does **not** clear the 60% bar on its own, but per the
dispatch's per-paper conditional rule ("proceed on any paper where >=60% of items are keyed
with real stems"), `Metabolism mid exam -_-20-21 #Diaa (O6U bot)(2).pdf` alone clears it
(100% keyed) and was authored from independently; `Collection of Final meta Exams.pdf` did
not clear it and was held in full.

## Concept resolution

6 concepts tested, all 6 minted new (broad greps for hypoglycemia/glucosuria/anti-insulin/
Complex I/succinate dehydrogenase terms surfaced Kasr `103-BMS-mcq-carbohydrate-concepts.md`,
`103-BMS-biochemistry-concepts.md`, `103-BMS-mcq-lipid-concepts.md`, Alexandria
`AU-MED-103-biochemistry-concepts.md`, Ain Shams `ASU-UG-assessment-1-mcq-concepts.md` and
Helwan `HU-GIT-301-biochemistry-concepts.md` as candidate files; none contained an exact or
near-exact match for these six specific facts on closer read -- the closest, Kasr
`103-BMS-biochemistry-concepts.md`'s TCA rate-limiting-enzyme concept, tests a different
specific claim (which TCA enzymes are rate-controlling, not which one doubles as an ETC
complex) and was cited as a near-miss rather than reused). See
`coverage/O6U-IMN-105-triage-keys.txt` for the full per-question list.

## Authored

6 of 15 keyed questions from `Metabolism mid exam (2).pdf` authored (9 true/false held for
the <4-option floor); `Collection of Final meta Exams.pdf`'s 19 MCQ items held in full (no
key found). Seed: `coverage/seeds/O6U-IMN-105/imn105-mid-exam.json`. Batch:
`question/O6U-IMN-105-mid-exam-mcq.md`. New concepts: `concept/O6U-IMN-105-concepts.md` (6).
New articles: `article/O6U-IMN-105-articles.md` (3). Resource:
`resource/O6U-IMN-105-resources.md` (`src_7a10e22db791d97e81db`).
