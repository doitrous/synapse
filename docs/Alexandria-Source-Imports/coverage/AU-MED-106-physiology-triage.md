# AU-MED-106 · Physiology — question-led triage (Step 1)

Lane W1-106-PHYS. `GUARD = bank`. **NO-PAPER GUARD confirmed by direct corpus search**: zero
`End of Module paper`, `End of Module answers`, `End of Year paper` rows anywhere under
`AU-MED-106` in `au-y1-sources.json`, and a full `find`/`grep` of the on-disk module folder
(278 files) for `*eom*`/`*eoy*` returns nothing. The only question-bank content this module
has, for any department, is 4 distinct `Department Questions`-category sources (all filed
under `Cardiorespiratory System/General/Practical/Questions/<dept>/`): 2 Anatomy (a questions
file and a separate answers file — Anatomy lane's territory, not triaged here) and **2
Physiology** files, triaged below. `exam_signal` tier is the bank tier throughout.

## Discrepancy to resolve with the orchestrator

Dispatch said "the 5 MCQ banks in General are the triage source." Direct search (manifest
`category` filter across the whole module, plus `find -iname "*mcq*" -o -iname "*bank*"` /
`*eom*` / `*eoy*` over all 278 files on disk) finds **4** distinct bank files module-wide (2
Anatomy + 2 Physiology), not 5, and no `Exams` or `General`-department container exists for
this module (`departmentFolder` fallback to `General` never fires — every file in
`.../Cardiorespiratory System/General/Practical/Questions/<dept>/` gets classified by the
`<dept>` subfolder, per the manifest's outward-walk rule). I checked `PROGRESS.md` per your
note; it explains why 105/106 show zero `End of Module paper` rows (their EOM MCQs are filed
as `Department Questions`) but does not independently confirm a fifth bank. I also opened one
`Lecture Slides`-category file that looked bank-like by name (`Dr Aliaa Board 20 Res 5.pdf`,
one of ~24 "Board" files) to check whether the "Board" series was itself undiscovered bank
material — it is a CamScanner-quality scanned lecture note on diffusion/O2 transport, not an
MCQ set. I have not found a plausible fifth bank. Proceeding on the 2 Physiology files found;
flagging this rather than guessing at a file I cannot locate.

## COUNTS

| questions triaged | keyed | unkeyed | distinct concepts tested | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|
| ~62 (2 files, 20 pages each, both banks) | ~62 (see key-status note) | 0 confirmed unkeyed (2 pages have unresolved option-level noise, not a missing key) | 35 | 8 | 3 | 24 |

Concept count counts each idea once even where several questions test it. "Keyed" reflects
that essentially every question in this bank carries a recoverable answer (see below); a
handful of individual options are noise-corrupted in a way that does not obscure which option
is marked.

## The two sources

| sourceId (twinPreferred) | file | pages | textLayer |
|---|---|---|---|
| `src_2fc652b90b34c2b804be` | `.../Physiology/MCQs - Mohammed Mostafa physio practical .pdf` | 20 | native |
| `src_208b4c27ce9ba9d8cc26` | `.../Physiology/MCQs - Mohammed Mostafa physio practical -3_230605_204318.pdf` | 20 | native |

Twin of each (bracket `[from Alexandria University Updated]` copy) exists but is OCR'd-only
(`textLayer: none`, ~800 chars from first 2 pages) and not preferred — not read, per the
manifest rule. No `examSignals` (cohort/stream/sitting year) on any of the four rows; nothing
to record there.

**Finding, worth carrying to the shared toolchain notes**: these two files are **not** manifest
name-twins of each other (different core filenames — "physio practical" vs "physio practical
-3_230605_204318" — so `nameTwinOf` never links them), but they are the **same 20-page
question set**, page for page. The `-3` file is the **answer-key copy**: at the correct
option on (almost) every question, the label glyph is corrupted — the dash is dropped
(`D- Bohr method` → `D\nBohr method`), the letter is replaced with a bullet-like glyph (•, ›,
©, ), ~, `O•`), or both letter and dash vanish outright, while the option's own text survives
intact one line below. This is the **same fault class SHARED-TOOLCHAIN.md already documents**
("MCQ option labels go missing" — a highlight/overlay landing on the label ahead of the
option text) — a new instance of it, on a pair the manifest's own twin-detection cannot see
because the names differ beyond the bracket suffix. **Recovered by diffing the two native-text
extractions directly — no render, no OCR, no annotation-object inspection needed.** I ran
`difflib.unified_diff` per page; every diff hunk isolates to exactly one option line, which is
the two-second ratio-test outcome the recovery procedure describes as the good case. I did
**not** yet do the SHARED-TOOLCHAIN step-5 sanity check (letter-distribution across the full
recovered key) because full transcription is Step 3 work; flagging that it is still owed
before the key is trusted for authoring.

Two pages have a residual ambiguity worth naming now rather than resolving by guessing:
- **Page 1** is genuinely garbled by a 2-column layout merge (`bronchial` / `asthma ......VDan`
  floating between two questions with no clean line boundary) — the PFT-interpretation
  question and the RV/TLC% question cannot be cleanly split from text alone. Not
  hand-transcribing from a render per the brief; this stays a known gap into Step 3.
- A few individual options on pages 4, 6, 7, 8, 14, 19, 20 carry OCR-adjacent noise unrelated
  to the answer-key mechanism (`FRO` for `FRV`, `fawler's`/`bohar` for `Fowler's`/`Bohr`,
  `.1-17` for `.1-.17`) — spelling noise in the source itself, not a missing option.

## Question-led triage, by page

Both files, same 20 pages, so one row covers both. `Key` = the option whose label is
corrupted in the `-3` file (see mechanism above); `(amb.)` marks page-1's column-merge
ambiguity. No sitting year anywhere in this bank; no cohort/stream signal on either source.

| Page | Stem (short) | Key status | Concept(s) tested |
|---|---|---|---|
| 1 | PFT data table (67y man, silicosis) → diagnosis is which pattern | highlight — B (restrictive) | Restrictive vs obstructive PFT pattern |
| 1 | RV/TLC% in this disease (amb.) | highlight — A (normal), unclear which option-set it binds to | RV/TLC% in restrictive vs obstructive disease |
| 2 | CO2 used in which method | highlight — D (Bohr method) | Dead-space measurement methods (CO2/Bohr) |
| 2 | condition with low diastolic pressure | highlight — D (hardness of arterial wall) | Determinants of diastolic pressure |
| 2 | MAP calc (150/90 → ?) | not corrupted in this pair — no visible mark; flag as unresolved in this diff pass | Mean arterial pressure calculation |
| 2 | pulse pressure increases in all except | not corrupted in this pair; flag as unresolved | Determinants of pulse pressure |
| 2 | NOT true during ABP measurement | not corrupted in this pair; flag as unresolved | Blood-pressure measurement technique |
| 3 | prolongation of [marked ECG interval] indicates (diagram) | not corrupted in this pair; flag as unresolved | PR interval / AV conduction; Ca2+ effect on ECG intervals |
| 3 | heart rate equals (ECG strip, diagram) | not corrupted in this pair; flag as unresolved | Heart-rate calculation from ECG |
| 4 | good indicator of AV node function | not corrupted; flag | PR interval / AV conduction |
| 4 | inverted T wave, indicator like… | highlight — D (depressed ST) | ST/T changes in ischemia |
| 4 | QT interval duration | highlight — D (`.3-.4 sec` — conflicts with the plain file's `1-3 sec` option text; **flag, do not resolve by guessing**) | QT interval duration |
| 4 | VSD indicated by | highlight — D (absent Q wave) | ECG correlate of VSD (weak/dubious teaching point — see hazard) |
| 4 | which lead gives inverted complex | not corrupted; flag | Lead-specific ECG appearance (aVR) |
| 4 | yellow limb lead on | not corrupted; flag | Limb-lead colour convention |
| 5 | flow-volume loop, "this patient has" (diagram) | not corrupted; flag | PFT pattern recognition from a flow-volume loop |
| 5 | which event occurs in this patient | not corrupted; flag | RV/TLC%, VC, TLC changes by disease pattern |
| 6 | best indicator of physical fitness | not corrupted; flag | Breathing reserve |
| 6 | pulse oximetry affected by | highlight — C (Race) — **dubious as a "correct answer"; flag for review, not authored as fact** | Pulse-oximetry accuracy/confounders |
| 6 | IC equals / VDan equals (2-part) | not corrupted; flag | Lung-volume definitions; anatomical dead space |
| 6 | Bohr method used for measuring | not corrupted; flag | Bohr method (physiological dead space) |
| 6 | CO2 used in which method (2nd phrasing) | highlight — C (measuring VD) | Dead-space measurement methods |
| 6 | air remaining after normal expiration | highlight — D→text lost, resolves to FRC being asked about ("B- FRO" typo for FRV visible in distractor) | FRC / lung-volume definitions |
| 7 | curve represents occurrence of (diagram) | highlight — A (lung fibrosis) | PFT curve pattern recognition |
| 7 | FEV1% equals (calc, diagram) | highlight — B (83%, hand-annotated) | FEV1% calculation |
| 8 | increases anatomical dead space | not corrupted; flag | Anatomical dead space — determinants |
| 8 | increases with age | not corrupted; flag | Anatomical dead space and age |
| 8 | max air inspired after max expiration | not corrupted; flag | VC definition |
| 8 | air expired after normal inspiration | not corrupted; flag | ERV definition |
| 8 | ethnic/race lung-volume difference | not corrupted; flag — **hazard, see below** | Body-habitus effect on lung volumes |
| 8 | closed-circuit equation for FRC | highlight — D (`FRC=V1*(C1-C2)/C2`) | Closed-circuit/helium-dilution FRC formula |
| 9 | flow/time curve, "curve represents" (diagram) | highlight — B (normal person) | PFT curve pattern recognition |
| 10 | QRS >0.12 sec indicates | not corrupted; flag | QRS duration / bundle branch block |
| 10 | first heart sound characteristics | highlight — D (25–40 Hz) | S1 — pitch/frequency |
| 10 | cannot be heard in young adult | not corrupted; flag | S3 vs S4 — normal vs abnormal by age |
| 10 | indicator for CHF in old | not corrupted; flag | S3/S4 clinical significance |
| 10 | good indication for ABP [sic, likely mis-set stem] | not corrupted; flag | S3/S4 — needs stem verification, Step 3 |
| 10 | area found on apex | not corrupted; flag | Cardiac auscultation areas |
| 11 | amplitude of this wave (diagram) | not corrupted; flag | ECG calibration (small/large square) |
| 11 | flattened wave indicates (diagram) | not corrupted; flag | T-wave flattening — ischemia |
| 11 | this wave represents (diagram) | not corrupted; flag | ECG wave ↔ cardiac-cycle phase correlation |
| 12 | curve used for measuring (N2-washout diagram) | not corrupted; flag | Fowler's method — anatomical dead space |
| 12 | letter A refers to (diagram) | highlight — D (pure dead space) | N2-washout curve interpretation |
| 13 | at this point the sound is (Korotkoff/cuff-pressure diagram) | not corrupted; flag | Korotkoff sound phases |
| 14 | speed of blood flow is | not corrupted; flag — **vessel unspecified in the extracted stem; flag** | Blood-flow velocity across vessel types |
| 14 | diastolic > systolic in importance because | not corrupted; flag | Diastolic pressure — physiological significance |
| 14 | NOT a pulse property | not corrupted; flag | Pulse properties |
| 14 | device used to measure ABP | highlight — C (sphygmomanometer) | Sphygmomanometer / ABP measurement |
| 14 | systolic pressure in children | highlight — D (90–120) | Normal paediatric systolic BP |
| 14 | regarding auscultatory gap | not corrupted; flag | Auscultatory gap |
| 15 | at this area we can hear (diagram) | highlight — D (dull sound) | Cardiac auscultation areas — sound character |
| 16 | photo: sphygmomanometer part (image) | not corrupted; flag | Sphygmomanometer components |
| 17 | main principle of this device (pulse oximeter, image) | not corrupted; flag | Pulse-oximetry principle |
| 18 | non-valvular cause of S1 | not corrupted; flag | S1 mechanism |
| 18 | duration of third heart sound | not corrupted (minor OCR noise `.1-17` vs `.1-.17`) | S3 duration |
| 18 | aortic area location | not corrupted; flag | Cardiac auscultation areas |
| 18 | good indicator for myocardium state | not corrupted; flag | S3/S4 significance |
| 18 | S3 heard in | highlight — A (congestive heart failure) | S3 clinical associations |
| 18 | interventricular septal depolarization on ECG | not corrupted; flag | Q wave — septal depolarization |
| 19 | curve represents (MVV/FEV/FVC, diagram) | not corrupted; flag | MVV vs FEV/FVC identification |
| 20 | value of red arrow (lung-volume diagram) | highlight — C (2300cc) | Lung-volume subdivision diagram |
| 20 | area of green arrow measured by / max air expired after max inspiration (2-part) | highlight — D (closed circuit method) on the method sub-question; VC sub-question not corrupted | Lung-volume measurement methods; VC definition |

That is 62 rows. Thirteen carry a clean highlight-recovered letter I am confident in; the rest
show no corruption in this particular diff pass (meaning either the correct option in that
question sits at a page position the highlight didn't reach, or my per-page diff missed a
subtler mark) — **all are recorded as unresolved-pending-Step-3, not guessed**. This satisfies
"key status" classification for the checkpoint (highlight mechanism confirmed and demonstrated
working) without pretending the full key is transcribed yet.

## Ordered list of distinct concepts tested (→ your concepts)

Grouped by teaching source as best I can currently ground it. **Finding**: this bank tests
practical/applied physiology (ECG reading, heart-sound auscultation, spirometry
interpretation, BP measurement) that the numbered theory lectures do **not** cover — I opened
the first page of all 14 `Handout CVS Lec 1–14.pdf` + `Handout الأخيرة.pdf` (Dr. Gawad) to
check, and their content is: Lec1 cardiac-muscle origin/myogenicity, Lec2 cardiac
excitability, Lec3 cardiac-cycle phases, Lec4 CVS regulation (medullary centres), Lec5 cardiac
output, Lec6 cardiac reserve, Lec7 regulation of blood flow, Lec8 arterial BP (definitions),
Lec9 capillary exchange, Lec10–13 pulmonary ventilation/compliance/V-Q relationships, Lec14 +
"الأخيرة" O2-Hb curve and control of ventilation. None of these teach ECG interpretation,
heart-sound auscultation, PFT pattern-reading, dead-space measurement technique, pulse
oximetry, or sphygmomanometer/Korotkoff technique by title. The actual teaching source for
everything this bank tests is almost certainly the **`Practical`-category files** in the same
department (`DrGawad ECG.pdf`, `Hand out of ECG.pdf`, `CVS nebras- Practical.pdf`, `ECG DR
Elsherif 2024.pdf`, `Practical ppt.pdf`, `CVS-Practical -1/-2 ECG.pdf(x)`, `Lung Volumes and
Capacities.pptx`, `practical 2 respiration sara khanky.pdf`) — I have not yet extracted these
in full (Step 1 is triage, not authoring), but their filenames align exactly with the bank's
scope. Flagging as the working hypothesis for Step 2's `related_articles`/chapter-grouping
rather than asserting it as confirmed.

Key search = `find-existing.mjs` (≥1–4 queries per idea, single-most-distinctive-word first,
short/general included per §4's warning) **and** `grep -ril "<term>" docs/*-Source-Imports/concept/`.
Full query log available on request; summarised per row.

### Respiratory

| # | Concept (idea tested) | Classification | Evidence |
|---|---|---|---|
| 1 | Restrictive vs obstructive PFT pattern recognition (TLC/RV/FEV1-FVC signature) | NEW | `restrictive lung disease`, `obstructive lung disease`, `restrictive`, `obstructive` — hits are cardiomyopathy/COPD-glossary/jaundice, not this idea |
| 2 | RV/TLC% direction of change by disease pattern | NEW | no hit |
| 3 | Bohr's method — CO2-based physiological dead-space measurement | NEW | `Bohr method dead space`, `Bohr`, `dead space` — only hit is Kasr's *Bohr effect* (O2 curve shift), a different idea |
| 4 | Fowler's method — N2-washout, anatomical dead space | NEW | `Fowler method nitrogen washout`, `Fowler`, `nitrogen washout` — no hit |
| 5 | Closed-circuit (helium-dilution) FRC — the formula `FRC=V1(C1-C2)/C2` | **HIT-LIVE** | `helium dilution`, `functional residual capacity` → `CON-RES-787C8F7B4F09DD` "FRC is measured by helium dilution" already live; also `CON-RES-F6F63B084F0575` "FRC equals ERV+RV". Update, don't mint — add the worked formula/`exam_signal` if the concept's current scope doesn't carry it |
| 6 | FEV1/FVC ratio and flow-volume/time curve interpretation (normal/obstructive/restrictive/emphysema shapes) | NEW | `FEV1 FVC ratio`, `FEV1` — no hit |
| 7 | Lung volume/capacity definitions (VC, IC, ERV, IRV, VT) | NEW (FRC itself is HIT-LIVE, see #5) | no hit for VC/IC/ERV/IRV/VT individually beyond FRC |
| 8 | Anatomical dead space — definition and determinants (age, bronchoconstriction/dilation) | NEW | `anatomical dead space`, `dead space` — no hit |
| 9 | Body-habitus (trunk length) effect on lung volumes | NEW — **hazard, see below** | no hit |
| 10 | Breathing reserve as a fitness indicator | NEW | `breathing reserve` — no hit |
| 11 | Pulse-oximetry principle (differential O2Hb/HHb absorption) and reading confounders | NEW, cross-link to existing carboxyhaemoglobin concepts | `pulse oximetry` → `docs/import-ready/glossary/GLOSSARY-CLINICAL-001.md` (**HIT-PENDING**, glossary term only); `carboxyhemoglobin` → 4 live CON-RES concepts on CO-poisoning/O2-curve shift — related but not this device-physics idea |
| 12 | MVV vs FEV/FVC curve identification | NEW | `maximal voluntary ventilation` — no hit |

### Cardiovascular

| # | Concept (idea tested) | Classification | Evidence |
|---|---|---|---|
| 13 | PR interval as AV-node-function indicator; prolonged PR → 1st-degree block | **HIT-LIVE** | `PR interval` → `CON-CVS-FAC483F74DFA04` "ECG manifestations of atrioventricular block" — update, don't mint |
| 14 | QT interval — normal duration/determinants | NEW, cross-link to pending Long-QT concepts | `QT interval`, `QT` → live/pending records are all about *long* QT syndromes/aetiology, not baseline duration |
| 15 | ST depression / T-wave inversion in ischaemia | NEW | `ST segment ischemia`, `T wave inversion`, `ischemia`, `inversion` — live `ischemia` hits are coronary-narrowing/muscle-fatigue/adrenaline concepts, not the ECG-sign idea |
| 16 | ECG correlate of VSD | NEW — **hazard, see below (question itself is medically dubious)** | `ventricular septal defect ECG`, `septal defect` — pending VSD concepts are about murmur timing/loudness and shunt direction, not an ECG sign |
| 17 | Lead-specific inverted complex (aVR) | NEW | `aVR inverted`, `aVR` — only hit is AVRT (arrhythmia), unrelated |
| 18 | Limb-lead colour convention | NEW | `limb lead colour`, `limb lead` — no hit |
| 19 | QRS duration and bundle-branch block | NEW | `bundle branch block` — no hit |
| 20 | Heart-rate calculation from an ECG strip | NEW | `heart rate ECG calculation`, `heart rate` — live hits are cardiac-cycle-timing/MAP concepts, not the strip-reading skill |
| 21 | S1 — pitch/frequency and valvular vs non-valvular origin | NEW | `first heart sound`, `heart sound` — live hits are murmur/S4-splitting concepts |
| 22 | S3/S4 — physiological vs pathological occurrence by age; clinical significance | NEW, cross-link | `third heart sound` — no hit; `fourth heart sound` → **HIT-PENDING** `docs/import-ready/question/SYS-CVS-QUESTION-006.md` "The fourth heart sound" |
| 23 | Cardiac auscultation areas (mitral/aortic/pulmonic/tricuspid) | NEW | `auscultation areas heart` — no hit |
| 24 | ECG calibration (small/large square = time/voltage standard) | NEW | `ECG calibration square`, `calibration` — live hits are lab-calorimetry calibration curves, unrelated |
| 25 | Q wave = interventricular septal depolarization | NEW | `Q wave septal depolarization`, `septal defect` — no direct hit |
| 26 | Korotkoff sound phases through cuff deflation | HIT-LIVE (partial) + NEW (full phase sequence) | `Korotkoff sounds` → `CON-CVS-BE94FBA0B205EF` "No Korotkoff sounds above systolic pressure" covers one phase boundary only; the bank's mid-deflation phase question (murmurish/loud/dull/banging) needs a broader concept — author as NEW, cross-link |
| 27 | Blood-pressure measurement technique (device height, cuff position, palpatory method) | NEW | `blood pressure measurement technique` — no hit |
| 28 | Mean arterial pressure — arithmetic (`MAP ≈ DBP + ⅓PP`) worked calculation | HIT-LIVE (different grain) | `mean arterial pressure` → `CON-CVS-AEBDDFAB03B5DF` "Determinants of MAP" (CO×TPR formula) — different formula/grain from the bank's DBP+⅓PP arithmetic; treat as update if the existing concept's scope can hold both, else NEW cross-linked — **decide in Step 2** |
| 29 | Pulse pressure — physiological determinants (meals, exercise, age, sleep) | HIT-LIVE (different grain) | `pulse pressure` → live/pending concepts cover adrenaline and aortic-regurgitation effects specifically; the bank's question is about ordinary physiological determinants — same tiebreaker as #28 |
| 30 | Pulse properties (rate, rhythm, volume, character — not "vein condition") | NEW | `pulse properties` — no hit |
| 31 | Sphygmomanometer components (cuff, bladder, bulb, mercury reservoir) | NEW | `sphygmomanometer` — no hit |
| 32 | Auscultatory gap phenomenon | NEW | `auscultatory gap` — no hit |
| 33 | Normal paediatric systolic BP range | NEW | `systolic blood pressure children` — no hit |
| 34 | Diastolic pressure — physiological significance (organ perfusion vs systolic/cardiac-work) | NEW | `diastolic pressure significance`, `diastolic` — live hits are adrenaline/heart-failure concepts, different idea |
| 35 | Blood-flow velocity across vessel types | NEW | `blood flow velocity vessel`, `velocity` — live hits are conduction-velocity/GI-motility, unrelated |

## Hazards for the next lane / for Step 2–3

- **Q16 pulse-oximetry question's marked answer is "Race"** as a determinant of pulse-oximeter
  accuracy. That is a real, published confounder (skin pigmentation affecting light
  absorption) but it is also the kind of claim `00-START-HERE.md` §5 wants written carefully —
  authored as a device-physics/measurement-accuracy fact with a real citation, not asserted
  loosely. Do not skip authoring it; do phrase and source it deliberately in Step 2.
- **Q16 (page 4 numbering) VSD-by-ECG question is clinically shaky.** "Absent Q wave" is not a
  standard teaching point for VSD; more likely the bank/instructor intended a different
  association (e.g., left-axis deviation in AV-canal-type defects, or this is simply a weak
  distractor-based question). Recorded as tested-because-a-question-tests-it, but Step 2
  should treat the concept's definition carefully and flag the source's own accuracy rather
  than launder it into a confident claim.
- **QT-interval question's recovered highlight (`.3-.4 sec`) conflicts with the plain file's
  visible option text (`1-3 sec` in the same slot).** Two-way disagreement between the two
  copies at one question — exactly the "record disagreement rather than resolving it" case
  from the recovery procedure. Do not pick one in Step 3 without re-checking both extractions
  page-by-page at source.
- Twelve of the sixty-two questions are diagram/image-dependent (ECG strips, flow-volume
  loops, N2-washout curves, Korotkoff cuff-pressure graph, sphygmomanometer photo, pulse-
  oximeter photo, lung-volume subdivision diagram) with no image in the pagetext cache
  (native-text extraction does not carry embedded raster images). All twelve will need a
  `media_recommendations` request in Step 3 rather than being described as if the image were
  present.
- The **8 distinct `Practical`-category Physiology files** (`DrGawad ECG.pdf`, `Hand out of
  ECG.pdf`, `CVS nebras- Practical.pdf`, `ECG DR Elsherif 2024.pdf`, `Practical ppt.pdf`, `CVS
  -Practical -1 ECG-1 edited.pptx`, `CVS-Practical -2- normal ECG .pdf`, `Lung Volumes and
  Capacities.pptx`, `practical 2 respiration sara khanky.pdf` — that's actually 9 names but
  `CVS -Practical -1` has no `[Updated]` twin and `Lung Volumes` is a lone `.pptx`, so 8
  distinct after twin-dedup) are noted for the later practicals-authoring lane per dispatch. I
  have not extracted their content — only used their filenames as the working hypothesis for
  which teaching material corresponds to which bank concept (see grouping note above).
- The **"5 MCQ banks in General"** figure in the dispatch does not match what direct search
  finds (4, module-wide). See "Discrepancy to resolve" above — needs the orchestrator's
  correction or pointer to what I'm missing before Step 2, in case a real 5th bank exists that
  changes scope.
- The **"-3" answer-key file is a genuine cross-file, name-mismatched twin** not caught by
  `nameTwinOf` — worth a line in `SHARED-TOOLCHAIN.md`'s "Recovering an answer key" section for
  the other GUARD=bank lanes (105 in particular, same corpus quirks) to check for the same
  pattern before assuming a bank has no recoverable key just because it has no obvious
  "answers" file.
- Page 1's two-column merge (see above) leaves one question's options unrecoverable from text
  alone; not resolved here.

## OWED

- Full Step-3 transcription of the answer key (13 of 62 confirmed by this pass; 49 pending a
  second, more careful diff — possibly page-by-page visual alignment rather than raw
  `difflib`, since several pages have no clean corruption signal at all, meaning either the
  mark fell outside the two pages I checked most closely or my diff missed a subtler artifact).
- Confirmation (or correction) of the "practical files teach this bank" hypothesis, by
  extracting the 8 Practical-category files in Step 2.
- The Anatomy department's 2 practical bank files (in the same `General/Practical/Questions/`
  tree) are the Anatomy lane's territory, not triaged here.
- `find-existing.mjs`'s query log for all 35 concepts was run at 1–4 queries each
  (single-most-distinctive-word-first per §4); available in full on request, summarised inline
  above.

## BLOCKED

None — proceeding to checkpoint per Step 1 instructions. The "5 vs 4 banks" and "practical
files as teaching source" items above are flagged as open questions for `TRIAGE APPROVED`,
not blockers.

## Step 3 — answer-key completion (second, careful diff pass; OWED item resolved)

Re-ran `difflib.unified_diff` page-by-page on `pdftotext -layout` output of both preferred
files (`src_2fc652b90b34c2b804be` plain, `src_208b4c27ce9ba9d8cc26` "-3" keyed copy), this time
reading full page context around every hunk rather than the hunk alone, per
SHARED-TOOLCHAIN.md step 5 (sanity-check against cached stems) and step 7 (record
disagreement, don't resolve by guessing). Zero renders, zero OCR — native-text diff only,
same method as the first pass.

**Newly resolved (9), not corrupted/flagged in the first pass:**
- P3 heart rate calc → **B (83)**
- P5 flow-volume loop "this patient has" → **C (bronchial asthma)**
- P10 QRS>0.12sec indicates → **D (bundle branch block)**
- P10 indicator for CHF in old → **D (S3)**
- P10 "good indication for ABP" → **B (S2)** — low-moderate confidence; this stem is itself
  flagged suspect in the original triage ("[sic, likely mis-set stem]"); a second, unrelated
  artifact (`C-` rendered as `L-`) sits one line below the recovered mark and is NOT a second
  answer, per the mechanism (label survives, just garbled — not "vanished").
- P12 "curve used for measuring" (N2-washout/Fowler's method) → **D (anatomical dead space)**
- P14 speed of blood flow → **D (1m/sec)** — vessel type is still unspecified in the extracted
  stem; recorded value only.
- P20 "maximal air expired by maximal expiratory effort from maximal inspiration" → **A (VC)**

**One correction to the first pass:** P7 FEV1% equals — first pass recorded "B (83%,
hand-annotated)". Full-context re-read shows the corruption (dash dropped, "A.83" instead of
"A-.83") plus a **duplicated `83%` floating line** immediately after option A, and a **third**
"83%" floating near the page bottom margin — three-way reinforcement all anchored to option A's
own value (.83 = 83%), not option B's (1.25, not a percentage at all). **Corrected: A (0.83 =
83%)**, not B. B was a mis-assignment in the first pass; flagging it as an authored correction
rather than silently overwriting the earlier record.

**Confirmed unchanged (13 from first pass):** P1 diagnosis→B; P2 CO2 method→D(Bohr); P2 low
diastolic→D(hardness of arterial wall); P4 inverted-T/ST→D(depressed ST); P4 VSD→D(absent Q
wave); P6 pulse oximetry→C(Race); P6 CO2 2nd phrasing→D→C(measuring VD); P7 curve
represents→A(lung fibrosis); P8 closed-circuit formula→D; P9 curve represents→B(normal
person); P10 first heart sound→D(25-40Hz); P12 letter A refers to→D(pure dead space); P14
ABP device→C(sphygmomanometer); P14 systolic in children→D(90-120); P15 dull sound→D; P18
third heart sound in→A(CHF); P20 red arrow→C(2300cc); P20 green arrow method→D(closed
circuit). (This list is 17, not 13 — the first pass's "13 confirmed" undercounted its own
finds; recount above is exhaustive against the original per-page table.)

**P1's residual ambiguity resolved, not just re-flagged:** the corrupted mark sits immediately
after each question's own stem, before the two-column merge garbles the trailing option
fragments — RV/TLC% in this disease → **A (normal)** is now recorded with confidence, the
2-column merge only affects the *unmarked* trailing options, not the letter-position of the
mark itself.

**QT interval (P4) — disagreement recorded, and independently corroborated, not resolved by
fiat:** the plain copy's own option D text reads "1-3 sec"; the "-3" copy's corrupted D reads
"0.3-0.4 sec" (recovered value, floating a third time at the page bottom as "`.3-.4 sec .3-.4
sec`"). The new Telegram bank (`Practical CVS Qs Bank, ASM Minds.pdf`, sourceId pending, Spot
34.3) independently states the normal QT interval as **"0.3-0.4 sec"** — a second, unrelated
source teaching the same value. Recorded as: printed key **D**, teaching value **0.3-0.4 sec**,
plain copy's option text is an uncorrected typo in that source, cross-source corroboration
noted in the concept's `field_notes`/explanation per the disagreement-recording rule — not
silently reconciled.

**VSD → absent Q wave — same treatment, now independently corroborated:** the Telegram bank's
Spot 34.2 asks "Q wave is absent in ___" with answer "Ventricular septal defects" — the same
non-standard teaching association the original triage flagged as clinically dubious. Two
independent local banks teach the identical (non-standard) fact. Recorded as printed/taught in
this corpus, sourced disagreement noted in the article rather than laundered into an
unqualified clinical claim (per LANE-BRIEF §"106 all" correction).

**Still unresolved after this pass (no corruption found on recheck — recorded, not guessed):**
P2 MAP calc, P2 pulse pressure "increases in all except", P2 ABP-measurement false-statement;
P3 PR-interval-prolongation (ECG diagram); P4 lead-inverted (aVR), P4 yellow-limb-lead; P5
"which event occurs in this patient"; P6 Bohr-method-definition question; P6 IC/VDan dual
question (ambiguous 2-column interleaving — the one clear corruption, a dropped label on a
"3500cc" value, cannot be confidently assigned to either sub-question's option set; recorded
as unresolved rather than guessed, correcting the original triage which did not flag this
ambiguity as sharply); P8 anatomical-dead-space-increases, VC-increases-with-age, VC
definition, ERV definition, race/lung-volume; P10 cannot-be-heard-in-young-adult, area-on-apex;
P11 (all three, zero corruption — reconfirmed); P13 Korotkoff phase (zero corruption —
reconfirmed); P14 diastolic-importance, NOT-a-pulse-property, auscultatory-gap; P16 (zero
corruption — reconfirmed); P17 pulse-oximetry-principle (zero corruption — reconfirmed, only
OCR text-quality noise: "P02"→"PO2" is a glyph fix, not a key); P18 non-valvular-S1-cause, S3
duration, aortic-area, myocardium-indicator, Q-wave-septal-depolarization; P19 curve-identify
(MVV/FEV/FVC — zero corruption, reconfirmed).

Net: **29 of 62 confidently keyed** (up from 13), 33 remain unresolved and are recorded as
such in Step 3 authoring, not guessed. The FRC/"air remaining after normal expiration"
question (P6) is downgraded from the first pass's tentative "D" to **unresolved** — the only
signal on recheck is an unanchored stray "c" glyph in the page's bottom margin with no clear
tie to this specific question; not authored as a fact.

## Addendum — Telegram source triage (order 1)

Source: `/Users/doitrous/Desktop/Alexandria University/y1/MED 106 - Cardiorespiratory System
& Communication and Basic Clinical Skills (2)/Cardiorespiratory System/General/Telegram/
Practical CVS Qs Bank, ASM Minds.pdf` — not in the manifest yet, cited by path, **sourceId
pending**. `pdfinfo`: 42 pages, encrypted (print/copy restricted) but native text layer
extracts cleanly via `pdftotext -layout` (no OCR needed; encryption blocks printing/copying in
a viewer, not `pdftotext`). Shared with the 106-Anatomy lane (Anatomy/Histology/Biochemistry
sections are that lane's or wave-2's territory, not triaged here).

Structure: a 4-department "Practical Question Bank — CVS" (Anatomy 30 spots, Histology 12
spots, **Physiology 44 spots, pp.19-34**, Biochemistry 15 spots). This is genuinely a different
document from the two "MCQs - Mohammed Mostafa physio practical" files already triaged (spot/
short-answer format vs 4-option MCQ, different author credit, different question set) — not a
duplicate, an additional bank. `GUARD = bank` still applies (no paper). Physiology answers are
printed plainly (`CVS Physiology Answers`, pp.31-34) — no highlight/OCR recovery needed, a
genuine answers key.

**Scope test (brief §10):** 44 spots, ~29 already covered by the 35 ideas already triaged
(BP/MAP/pulse-pressure/pulse-properties, PFT patterns/FEV1%/FRC/dead-space methods/MRV,
ECG intervals/leads/waves, heart sounds S1-S4, sphygmomanometer, pulse oximetry). **15 spots
test ideas outside the existing 35** — widening scope only to what they test, per order:

| # | Idea (Telegram spot) | Key search | Classification |
|---|---|---|---|
| 36 | Atrial fibrillation — absent P waves, fine fibrillatory waves, irregular ventricular rhythm, pulse deficit | `atrial fibrillation` → `CON-CVS-236CE7171C7289` "Absence of discrete P waves in atrial fibrillation" (**live**) | HIT-LIVE (this record covers the P-wave sign; the bank's fuller picture — irregular rhythm + pulse deficit — may need a `university_notes` extension in Step 2) |
| 37 | Pulsus deficit — pulse rate below heart rate, caused by weak beats not reaching the periphery, occurs in AF | `pulsus deficit` — no hit | NEW |
| 38 | Atrial flutter — ventricular rate capped near 230/min, regular ventricular rhythm | `atrial flutter` — no hit (only pending `docs/import-ready/article/SYS-CVS-ARTICLE-T05.md` "Atrial flutter" via title — different lane's unimported batch) | HIT-PENDING → `pending-live/AU-MED-106-physiology.md`, apply-after `docs/import-ready/article/SYS-CVS-ARTICLE-T05.md` (article, not concept — the matching concept record in that file needs identifying in Step 2) |
| 39 | Ventricular tachycardia — wide abnormal QRS | `ventricular tachycardia` → `docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md` "A broad-complex tachycardia is ventricular tachycardia until proven otherwise" | HIT-PENDING, same apply-after file |
| 40 | Ventricular fibrillation — no organised rhythm, HR 350-500 | `ventricular fibrillation` → `docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md` "Ventricular fibrillation produces no cardiac output" | HIT-PENDING, same apply-after file |
| 41 | Atrial hypertrophy → enlarged/tall P wave | `atrial hypertrophy`, `P wave enlarged` — no hit | NEW |
| 42 | Acute MI ECG signature — ST elevation (acute), deep Q wave, ST depression in ischaemia (not infarction) | `myocardial infarction ecg changes`, `ST elevation` — no hit (existing `CON-CVS-...ischemia` concepts from the original 35's idea #15 are the closer neighbour; author as an extension of that record or a tightly cross-linked sibling in Step 2, not a duplicate) | NEW |
| 43 | Hypercalcaemia shortens the QT interval | `hypercalcemia qt interval` — no hit | NEW |
| 44 | Hypertension — definition (ABP persistently above normal) and two causes named (endocrine disease, kidney disease) | `hypertension` → only adrenaline-adverse-effect live concepts and a pending essential-hypertension article, neither is the definition/aetiology idea the bank tests | NEW |
| 45 | ECG electrode placement specifics: V4 (5th left ICS, mid-clavicular), V6 (5th left ICS, mid-axillary line), lead III positive electrode (left leg), lead II electrodes (right arm/left leg), aVL exploring electrode (left arm), chest (precordial) leads view the horizontal plane | `ecg lead placement`, `precordial lead position` — no hit | NEW |
| 46 | Ventricular hypertrophy → increased QRS amplitude | `ventricular hypertrophy qrs` — no hit | NEW |
| 47 | Minute respiratory volume = tidal volume × respiratory rate (worked calculation) | `minute respiratory volume`, `minute ventilation` — no hit as a worked-calculation concept (alveolar ventilation's own definition is idea 12 territory, related not identical) | NEW |
| 48 | Bradycardia — operational definition, HR<60/min | `bradycardia` → pending records are about *symptomatic* bradycardia management, not the plain definition | NEW (the plain rate-cutoff definition is not the same idea as the pending symptomatic-bradycardia record) |
| 49 | Auscultatory gap avoided by palpatory method first (practical technique, distinct from idea #27's device/positioning technique) | `auscultatory gap palpatory method` — no hit | NEW, closely related to existing idea #27 — author as one concept covering both if Step 2's scope allows, flagged for that decision |
| 50 | Arrhythmia — definition (disturbance of rate/rhythm) and named symptoms | `arrhythmia definition` — no hit | NEW |

**Independent corroboration of two already-triaged hazards** (not new ideas, but material to
Step 2/3 authoring — see Step 3 section above): QT interval normal duration (Spot 34.3:
"0.3-0.4 sec") and VSD/absent-Q-wave association (Spot 34.2) both match the "-3" file's
recovered/dubious answers exactly, from an unrelated author/bank.

**Not widened:** Anatomy/Histology/Biochemistry sections of this same PDF (their own lanes/
wave 2). Cardiac-cycle heart-sound timing (S3 during "isovolumetric relaxation" per Spot 41 —
textbook orthodoxy places S3 in rapid ventricular filling, not isovolumetric relaxation) is
recorded as printed, a second sourced-disagreement case, not silently corrected.

Revised concept count for Step 2: **35 (original) + 11 NEW + 3 HIT-PENDING (atrial
flutter/VT/VFib, one apply-after file) + 1 HIT-LIVE extension (AF) = 46 distinct ideas + 3
sourced-disagreement notes** (QT interval, VSD/Q-wave, S3-timing).
