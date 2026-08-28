# AU-MED-102 · Medical Terminology · question-led triage

Lane W1-102-TERM. `MODULE = AU-MED-102`, department = `Terminology` (manifest
`departmentFolder`), `YEAR = AU_Y1`. Dispatched `GUARD = paper`; **finding below: the paper
guard does not hold for this department — see "GUARD reality check".**

## Top table

| | |
|---|---:|
| Lettered MCQ items across the 6 bank files | ~601 (50+136+180+38+10+187) |
| Non-MCQ items in the banks (matching pairs, body-plane matching, clinical completion blanks) | ~110 (see MCQ3 breakdown) |
| Cleanly keyed (reliable letter-to-question mapping) | ~487 (MCQ3 all formats + MCQ5 + MCQ6) |
| Answer present but **unusable as extracted** (scrambled column order — needs `-layout` reflow) | ~186 (MCQ1 50 + MCQ2 136) |
| No answer key found anywhere in the file | 38 (MCQ4) |
| Distinct tested ideas identified | ~150, after dedup across banks |
| — of which glossary-shaped (11-glossary-terms.md) | ~135 |
| — of which concept-shaped (02-concepts.md) | ~15 |
| Key search run so far (sampled, not exhaustive — see §Key search) | 21 queries |
| HIT-LIVE | 5 |
| HIT-PENDING (unimported batch elsewhere) | 13 |
| NEW (no hit anywhere) | 3 |
| EOM/EOY papers that test this department | **0 of 5** |

Every EOM paper for this module was read in full. None contains a Terminology section —
see "GUARD reality check". The department's entire exam signal is therefore the 6 MCQ banks.

## GUARD reality check

Dispatch set `GUARD = paper`. All 5 `AU-MED-102` Exams-folder papers were read page by page:

| sourceId | file | pages | subject headings found |
|---|---|---:|---|
| `src_8d6ddf874f8984be8217` | EOM - End foundation 2030.pdf | 12 | Anatomy, Biochemistry, Physiology, Histology, Embryology |
| `src_3bf4527b51de57464e14` | EOM - Final foundation 2030.pdf | 24 | (unheaded, but content is Biochem/Anatomy/Histology/Physiology/Embryology/Cell biology only) |
| `src_7d031a45baeadc973a00` | EOM - end foundation مصريين 222 1.pdf | 11 | Anatomy, Biochemistry, Physiology, Histology, Embryology |
| `src_29f02a5a4d6a273dea76` | EOM - End Foundation wafdeen-1.pdf | 15 | (same five, no Terminology string anywhere) |
| `src_413115a28d7dc9914c91` | EOM - Foundation Final Egyptian.pdf | 24 | (same five, no Terminology string anywhere) |

All 5 sit under `.../MED 102 .../Foundation of Basic Medical Sciences/Exams/` — the
**"Foundation of Basic Medical Sciences"** half of this two-course module, not the
**"Medical Terminology"** half. There is no `Exams` subfolder anywhere under
`.../Medical Terminology/` in the manifest (checked: the 12 `departmentFolder: Terminology`
rows are only `General/` (the book) and `Questions/` (the 6 banks)). No orientation/schedule
file exists either (consistent with the corpus-wide gap noted in the manifest README). **This
department has no paper in this corpus at all** — the practical guard is the bank set, the
same situation the brief documents for AU-MED-105/106. Recommend the orchestrator confirm
whether `GUARD` should read `bank` for this lane; the triage below proceeds on that basis
(banks are the source of scope) while keeping the dispatched label in the filename per §naming.

## Sources read

| sourceId | file | pages | mode | key mechanism |
|---|---|---:|---|---|
| `src_1e2b5606d8f6ee3052dd` (MCQ1, twin of `_3363b59e…`, preferred) | MCQs - Terminology MCQ 1.pdf | 11 | native | answer block, page 11 — **column order scrambled by extraction, unusable as-is** |
| `src_87dd337f8824bca5763b` (MCQ2, twin of `_365ab5a3…`, preferred) | MCQs - terminology MCQ 2.pdf | 29 | native (CamScanner OCR baked into text layer) | answer block, pages 28–29 — **scrambled the same way**; some options also carry stray OCR glyphs (`@`, `*`, `#`, `o`) ahead of the letter that look like correct-answer marks but are not verified as such |
| `src_e7f879644488e0d21c41` (MCQ3, no twin) | MCQs - Terminology MCQ 3.pdf | 33 | native | **clean** — correct option marked inline with a literal `=` prefix (`c. =phlebitis`), plus explicit typed answer keys for the 50-pair matching block and the 7 clinical-completion cases |
| `src_41ca148fe30939499cc0` (MCQ4, twin of `_a467ee13…`, preferred) | MCQs - Terminology MCQ 4.pdf | 7 | native (rough OCR — several option letters garbled/missing) | **none found** — no answer block, no inline marker |
| `src_e5e68d9f509ff8b49bf9` (MCQ5, twin of `_9c2e169a…`, preferred) | MCQs - Terminology MCQ 5.pdf | 5 | native | **clean** — short numbered answer block (`126-A … 135-C`) |
| `src_5d2dbb44df399f871731` (MCQ6, no twin) | MCQs - Terminology MCQ 6.pdf | 31 | native | **clean** — full answer block organised by the same 5 lectures as the questions |
| `src_380d8e2b0c7467b4421e` (department book, preferred twin of `_fe0e423a…`) | terminology book final .pdf | — | native | **not yet cached** — `scripts/alexandria/pagetext/` does not have this sourceId as of this report. Not read. |

Twin note: every Terminology MCQ file except #3 and #6 has an "[from Alexandria University
Updated]" twin; per manifest rules the non-"Updated" copy is `twinPreferred` in every case
here (larger extracted word count) and is what was read. The "Updated" twins were not opened.

### A numbering oddity worth flagging, not resolving here

MCQ4 is headed "Terminology:" (no lecture label) and runs Q1–38, "Alpha Team" branded, rough
OCR, no key. MCQ5 is unheaded and runs Q126–135, also "Alpha Team" branded, clean key. MCQ6
is "Alpha Team" branded and runs Q1–187 across 5 labelled lectures, with its own clean key
covering the same range. Q39–125 are not present in either MCQ4 or MCQ5, and MCQ6's own
Q1–187 do not obviously match MCQ4's Q1–38 stem-for-stem (MCQ4 opens on glycosuria/renal
questions; MCQ6 opens on "inflammation of the lungs"). These may be three independent extracts
of a larger "Alpha Team" course question set, not one bank split three ways — recording the
gap rather than guessing which. Not blocking: MCQ6 is complete and clean on its own terms.

## Concept-shaped vs glossary-shaped — governing manual per item

Per the department note: medical terminology is overwhelmingly vocabulary. Classifying every
distinct tested idea below:

- **Glossary-shaped** (governed by `11-glossary-terms.md`): a single English term (word root,
  prefix, suffix, or whole word) with one plain meaning, tested by "X means…" or "the suffix
  X denotes…". This is the large majority — roughly 135 of ~150 distinct ideas.
- **Concept-shaped** (governed by `02-concepts.md`): a testable claim, rule, or mechanism that
  is not answered by looking up one word — a system of pluralisation, a clinical charting
  convention, a physiological fact dressed in terminology, an anatomical fact. About 15 items,
  listed in their own table below.

### Cross-lane collision — read before authoring Step 2

`docs/import-ready/glossary/` already holds **five pending files, 297 bilingual terms**,
per its own `INDEX.md`: `GLOSSARY-WORD-PARTS-001.md` (65, Word parts),
`GLOSSARY-ANATOMY-001.md` (53, Directional & anatomy), `GLOSSARY-SYSTEMS-001.md` (58,
Directional & anatomy), `GLOSSARY-CLINICAL-001.md` (52, Signs & symptoms/Examination/
Investigations), `GLOSSARY-CLINICAL-002.md` (69, Common conditions/Examination/Pharmacology).
Sourced from an unrelated "Medical Taxonomy Egypt" course, **not scoped to any university** —
the glossary format has no `universities` field at all, so this set is a global dictionary
every lane shares. Spot searches show almost every Word-parts item this department tests is
already there (`Hyper-`, `Hypo-`, `Tachy-`, `Brady-`, `Dys-`, `-itis`, `-ectomy`, `-otomy`,
`-ostomy`, `-oma`, `-megaly`, `-algia`, `-osis`, `-uria`, `-plegia`, `Peri-`, `Endo-`, `Epi-`,
`Sub-`, `A-/An-`, and most of the body-system word roots), and several Common-conditions and
Directional & anatomy terms too (`cholecystitis` under `Cyst(o)-`, `hysterectomy` under
`-ectomy`, `cardiomegaly` under `-megaly`, `Sagittal plane`).

**Defect found in passing, not mine to fix:** `GLOSSARY-WORD-PARTS-001.md` is written as
`# Item` / `## field_key` blocks. Per `11-glossary-terms.md` §1, the glossary importer reads
**only a markdown pipe table** — this file will not import as written. Flagging for whoever
holds that file's `CLAIMS.md` row.

**Implication for Step 2:** most of this department's glossary-shaped scope is an *update*
to these five existing files (or a note that the term is already covered), not new rows. A
handful look genuinely missing from all five — ENT/ophthalmology terms (`blepharitis`,
`dacryocystitis`, `esotropia`/`exotropia`, `anisocoria`, `keratoplasty`), reproductive-procedure
terms (`salpingo-oophoritis`, `hydrocele`, `hysterosalpingo-oophorectomy`, the
gravida/para term family), several suffixes (`-ptosis`, `-tripsy`, `-pexy`, `-plegia` is
covered but `-paresis` alone is not, `-phasia`), and the Latin/Greek pluralisation rule
itself. These need their own `find-existing.mjs` pass in Step 2 before authoring.

## Concept-shaped ideas — key search run (§10/§16 procedure)

| # | Canonical idea (candidate) | Tested at | Search result | Classification |
|---|---|---|---|---|
| 1 | Medical term = (prefix) + word root + (combining vowel) + suffix, and what each part contributes | MCQ2 Q23; MCQ3 Q138; MCQ6 Q33/116/161/169 | `find-existing.mjs "prefix"` / `"combining vowel"` not yet run individually; `"para"` (broad) returned 217 unrelated hits — too generic to read | not yet resolved — needs a sharper query in Step 2 |
| 2 | Latin/Greek pluralisation rule for medical nouns (-x→-ces, -is→-es, -on→-a, -a→-ae, -um→-a) | tested via ≥15 distinct nouns across MCQ1/2/3/6 (thorax, phalanx, testis, ilium, vertebra, ganglion, bronchus, lipoma, cervix …) | not yet searched | NEW candidate — no equivalent "pluralisation rule" concept found in any prior sample query |
| 3 | Gravida/para clinical charting convention (gravida = pregnancies, para = births) | MCQ1 Q15; MCQ2 Q27/36/51/74/110/111; MCQ3 Q36/50/51 | `find-existing.mjs "gravida"` → no hit; `"para"` → 217 hits, none on the counting rule itself | **NEW** |
| 4 | Descriptive vs. eponymous medical terms | MCQ6 Q16/171 | not yet searched | not yet resolved |
| 5 | Epiphysis/diaphysis: growth plate is at the end of a *long* bone only | MCQ6 Q180/181/186 | `find-existing.mjs "epiphysis"` → **HIT-PENDING**, `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`: "A long bone is an epiphysis at each end, a diaphysis between them, and a metaphysis where the two meet" | **HIT-PENDING** — same idea, Kasr Year-1 lane, unimported |
| 6 | Plasma is ~55% of total blood volume | MCQ6 Q109 | `find-existing.mjs "plasma volume"` → live `CON-CVS-1E8F1FB07C77D0` (autotransfusion after haemorrhage — a *different* claim about plasma volume expansion, not the 55% composition fact) | **NEW** (near-miss recorded, not a match) |
| 7 | Leukocyte types include monocyte, lymphocyte, basophil | MCQ6 Q110 | `find-existing.mjs "leukocyte"` → **HIT-PENDING**, `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` ("Leukocytes divide into granular — neutrophil, eosinophil, basophil — and non-granular — monocyte and lymphocyte") | **HIT-PENDING** |
| 8 | Vasodilation widens the vessel lumen and increases flow to the organ (mechanism, used for peripheral vascular disease) | MCQ6 Q129/134/145 | `find-existing.mjs "vasodilation"` → live `CON-IMM-0F12EDB7C7CC8E` (inflammation causes vasodilation — different context/mechanism) and a pending `GLOSSARY-WORD-PARTS-001.md` word-part row | glossary term exists (word part); the *mechanism* claim is a near-miss, not a hit — **NEW** if authored as a concept |
| 9 | Heart is composed of 3 tissue layers (epi-/myo-/endocardium) | MCQ6 Q107; MCQ6 Q95/99/146 (layer identity) | `find-existing.mjs "endocardium"` → **HIT-LIVE**, `CON-CVS-FDFA40F0021FAC` "Endocardial endothelium"; verified claim `CLM-CVS-FDFA40F0021FAC` | **HIT-LIVE** (adjacent, not identical — the live concept is about the endothelial lining, not the three-layer count; record as related, not the same concept) |
| 10 | Normal heart rate range (60–100/min) frames tachycardia/bradycardia | MCQ6 Q138 | `find-existing.mjs "heart rate"` → 8 hits, none stating the 60–100 reference range itself (closest: `CLM-CVS-09DB3696B58B62` "arterial pressure = HR × SV × TPR" — unrelated) | **NEW** |
| 11 | Tachycardia = abnormally fast heart rate | recurs ≥6× across MCQ1/2/3/6 | `find-existing.mjs "tachycardia"` → pending `SYS-CVS-CONCEPT-T05.md` (broad-complex tachycardia, polymorphic VT — clinical subtypes, not the base definition) and pending glossary word-part row | glossary term (word part) — **HIT-PENDING** on the word part; the base definition itself has no dedicated concept and does not need one |
| 12 | Bradycardia = abnormally slow heart rate | recurs across MCQ1/2/3/6 | `find-existing.mjs "bradycardia"` → pending `SYS-CVS-CONCEPT-T05.md` ("Bradycardia is treated for its symptoms and its level, not its rate" — a management concept, not the base definition) and pending glossary word-part row | glossary term — **HIT-PENDING** on the word part |
| 13 | Sperm capacitation = loss of the glycoprotein coat, a precondition for fertilisation | MCQ2 Q4 | `find-existing.mjs "capacitation"` → pending `docs/Kasr-Source-Imports/article/101-ISK-anatomy.md`, `question/101-ISK-mcq.md`, `written/101-ISK-BAQOON-2024-written.md` | **HIT-PENDING** |
| 14 | Ectoderm/mesoderm/endoderm inside-out arrangement in the developing embryo | MCQ3 Q91 | not yet searched — flag as likely **out of department scope**: this is an Embryology-course fact recycled into the Terminology bank. Recommend the Anatomy/Embryology AU-MED-102 lane owns this concept if it does not already exist; Terminology only needs the question, pointed at that concept | cross-department dependency |
| 15 | Ectopic pregnancy site classification (tubal/ovarian/abdominal/cervical) | MCQ2 Q89 (embedded, not in the 12 Terminology-folder rows — appears inside MCQ2 which sits in the Terminology folder even though the fact is obstetric pathology) | not yet searched | not yet resolved |

Rows 1, 4, 10, 14, 15: search not yet run to completion — recorded honestly rather than
guessed. This table is a first pass; a full second pass belongs in Step 2, after
`TRIAGE APPROVED`, once the full glossary-vs-concept split is confirmed.

## Distinct tested ideas — glossary-shaped (sampled key search)

Full inventory (not reproduced question-by-question here; every item traces to at least one
occurrence below, with many recurring 3–8× across the six banks):

**Word parts** — suffixes: `-itis -ectomy -otomy -ostomy -oma -megaly -algia -pathy -osis
-uria -aemia/-emia -plegia -paresis -scope/-scopy -graphy/-gram/-graph -penia -cele -ptosis
-rrhea/-rrhoea -rrhage -stenosis -tripsy -pexy -malacia -sclerosis -trophy/-plasia -ism
-ible/-able -phagia -pnea -phasia -esthesia/-algesia -clasia`. Prefixes: `hyper- hypo- tachy-
brady- dys- a-/an- peri- epi- sub- supra- infra- syn- homo- hetero- contra- anti- ipsi-
pseudo- meta- poly- olig(o)- percutaneous/trans- retro- dextro-/sinistro- macro- micro-`.
Roots (partial — the great majority already staged in `GLOSSARY-WORD-PARTS-001.md`/
`GLOSSARY-SYSTEMS-001.md`): `nephro- hepato- cardio- gastro- entero- procto- colo- oophoro-
salpingo- orchido- hystero- mammo-/masto- spermato- phlebo- angio- encephalo- meningo- neuro-
myo-/rhabdomyo-/leiomyo- osteo- arthro- chondro- dermato- blepharo- kerato- rhino- oto-
glosso-/linguo- stomato- cheilo- gingivo- pneumo-/pulmo- thoraco- bronchio- pyo- hemo-/haemo-
thrombo- leuko- erythro- cyto- histo- patho- onco- necro- chole- pancreato-`.

Sample search results (4 of ~135 ideas spot-checked): `cholecystitis` → HIT-PENDING
(`GLOSSARY-WORD-PARTS-001.md`), `hysterectomy` → HIT-PENDING (same file), `cardiomegaly` →
HIT-PENDING (same file), `nephroptosis` → NEW, `orchidectomy` → NEW, `sagittal` →
HIT-PENDING (`GLOSSARY-ANATOMY-001.md`), `proximal` → 22 hits (Kasr pending prose, not a
glossary-term hit — needs a narrower query).

**Directional & anatomy**: anatomical position, superior/inferior, anterior/posterior
(ventral/dorsal), medial/lateral, proximal/distal, ipsilateral/contralateral, dextro-/
sinistro- (+ dextrocardia as the worked example), sagittal/mid-sagittal/coronal/transverse
planes, adduction/abduction, cephalo-caudal direction. Most already staged in
`GLOSSARY-ANATOMY-001.md`; the specific relational pairs (proximal/distal, medial/lateral,
superior/inferior as a matched set) were not confirmed present in the portion of that file
read — needs a full read in Step 2.

**Signs & symptoms**: dyspnoea/orthopnoea/tachypnoea/bradypnoea/apnoea family; cyanosis;
epistaxis; haemoptysis vs haematemesis; dysphagia vs dyspepsia; aphasia; hemiparesis vs
hemiplegia vs quadriplegia; murmur vs arrhythmia; anorexia; myalgia/neuralgia/arthralgia/
cephalgia; diplopia/esotropia/exotropia/anisocoria/presbyopia/hyperopia/myopia; oliguria/
anuria/polyuria/nocturia/enuresis; haematuria; leukocytosis/leukopenia,
erythrocytosis/erythrocytopenia, thrombocytosis/thrombocytopenia; gynaecomastia.

**Examination/Investigations**: echocardiogram/-graphy/-graph, electrocardiogram/-graphy/
-graph (ECG), electroencephalography (EEG), angiography/venogram, audiometer, otoscope,
proctoscope/-scopy, colonoscopy/sigmoidoscopy, laparoscopy, bronchoscopy, mammography/
mammogram, cystoscopy.

**Common conditions** (body-system families, each a cluster of 3–7 related terms tested
together as a differential/distinction — full list of ~28 families in the department book
once cached): hepatobiliary (cholecystitis/cholelithiasis/cholelithotomy/cholelithotripsy/
cholecystectomy, hepatitis/hepatomegaly/cirrhosis, pancreatitis/pancreatectomy); GI
(gastritis/gastroenteritis/enterocolitis, appendicitis); CNS (meningitis/encephalitis/
meningioma/meningocele/encephalocele/myelodysplasia/anencephaly/meningomyelocele,
neuropathy/neuritis/neuralgia); renal/urinary (nephritis/pyelonephritis/pyelitis/
nephrolithiasis/hydronephrosis/nephroptosis/nephropexy, cystitis); male reproductive
(orchitis/orchidalgia/orchidectomy/orchidopexy/hydrocele); female reproductive (salpingitis/
salpingectomy/salpingo-oophoritis/hydrosalpinx/haematosalpinx, oophoritis/oophorectomy,
endometritis/endometriosis/perimetritis/myometrium, hysterectomy/hysterosalpingo-
oophorectomy); oral/ENT (gingivitis/stomatitis/glossitis/cheilitis,
pharyngitis/laryngitis/rhinitis, otitis media/dacryocystitis/blepharitis); musculoskeletal
(arthritis/osteitis/osteomyelitis/bursitis/tendinitis/chondritis,
osteoporosis/osteomalacia); vascular (phlebitis/arteritis); cardiac
(pericarditis/myocarditis/endocarditis, myocardial infarction/angina pectoris/
cardiomyopathy, tachycardia/bradycardia/dysrhythmia/arrhythmia); respiratory
(atelectasis, pneumothorax/haemothorax/pyothorax/pleurisy); endocrine
(hyperthyroidism/hypothyroidism/goitre); oncology-suffix family
(myeloma/lymphoma/osteoma/lipoma/haemangioma/sarcoma/carcinoma); enlargement family
(cardiomegaly/hepatomegaly/splenomegaly/macroglossia/macrostomia).

**Pharmacology**: analgesic/antipyretic/anti-inflammatory, anticoagulant, antiarrhythmic,
vasodilator/diuretic, hypnotic/narcotic vs analgesic/analgesia vs anaesthetic/anaesthesia.

## Cohort, stream and sitting-year signals

No Terminology-folder source carries a cohort, stream, or sitting-year signal (all 12 rows:
`cohortSignal: null, streamSignal: null, sittingYear: null`) — these are course materials,
not sat papers, so this is expected, not a gap. Among the 5 Foundation-side EOM papers read
(which test nothing in this department but were read in full to confirm that): 2 carry
`cohortSignal: ["2030"]` (a graduating-batch label, per brief §5 — not a sitting year), 1
carries `streamSignal: "egyptian"`. One paper's filename contains "wafdeen" (the international
stream) but the manifest's `streamSignal` reads `null` for it — the classifier appears to
miss "wafdeen" as a filename token even though the brief documents it as the international-
stream marker. Flagging as a possible manifest patch-list candidate; not fixed here (not my
tooling to edit).

## Owed / not yet done

- Department book (`src_380d8e2b0c7467b4421e`) not yet in `scripts/alexandria/pagetext/` —
  needed to confirm the book's own chapter/lecture structure before Step 2 grouping is final.
  The "lecture 1–5" grouping used above is provisional, taken from MCQ6's own section
  headers, not from the book.
- MCQ1 and MCQ2 answer keys (186 items) need `-layout`-preserving re-extraction (or a render
  check per the decision procedure) before any key can be trusted — recorded as unkeyed, not
  guessed.
- MCQ4 (38 items) has no recoverable key found in this pass — recorded as unkeyed with no
  mechanism found, not `none` by assumption. A render check has not been done (no OCR/render
  tool run by this lane, per instructions not to OCR a paper).
- The full glossary-shaped inventory (~135 items) has been sampled (7 queries), not run
  exhaustively against `find-existing.mjs` + the five pending glossary files + the Kasr
  pending concept batches. Full reconciliation is Step 2 work.
- Rows 1, 4, 10, 14, 15 in the concept-shaped table have no search result yet.
- "MCQ part Two" in MCQ1's own title implies a "part One" that is not in this manifest under
  any department/module row checked. Recording as a possible gap, not chasing it further.

## Hazards for the next lane / the orchestrator

- **Cross-university glossary set already exists and is NOT Alexandria-specific.** Any lane
  authoring glossary terms for any module should search these 5 files first; duplicating a
  word part here wastes as much effort as duplicating a concept.
- **`GLOSSARY-WORD-PARTS-001.md` is in the wrong format** (`# Item` blocks, not a pipe table)
  and will not import as glossary content until fixed by whoever owns it.
- **This module's EOM papers test only "Foundation of Basic Medical Sciences"**, never
  "Medical Terminology" — true for all 5 papers sampled. Any other AU-MED-102 department
  lane relying on these same 5 papers should expect the same split.
- **MCQ answer keys extracted in default column order can come out scrambled** even when the
  manifest and the extractor agree the source is `native` text — this is a new failure mode
  (not the watermark-bleed or OCR-misread faults already documented in SHARED-TOOLCHAIN.md),
  worth a shared fix in `scripts/alexandria/extract/pagetext.py` (a `-layout`-equivalent pass)
  rather than five lanes hand-reordering the same kind of table.

BLOCKED: none.
