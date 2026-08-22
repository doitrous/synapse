# AU-MED-106 · Anatomy + Anatomy and Embryology — question-led triage

Lane W1-106-ANAT. Module `AU-MED-106` (Cardiorespiratory System & Communication and Basic
Clinical Skills (2)), departments `Anatomy` and `Anatomy and Embryology` (sibling-folder
split, one lane — `coverage/00-gap-ledger.md` "Wave-1 decisions"). Year `AU_Y1`.

**GUARD = bank. NO-PAPER GUARD confirmed.** No file anywhere under this module's corpus tree
matches `*exam*` (case-insensitive), and the manifest carries zero `End of Module paper` /
`End of Module answers` / `End of Year paper` rows for `AU-MED-106` (confirmed against
`docs/Alexandria-Source-Imports/manifest/au-y1-sources.json`, and independently against
`scripts/alexandria/extract/PROGRESS.md`, which found AU-MED-106's EOM-shaped material filed
under `Department Questions` for other departments but recorded **zero** EOM rows for the
module overall). The eight `Department Questions` rows for this module (4 Anatomy, 4
Physiology) carry no `EOM`/`EOY` filename prefix. So: **the bank is the triage source**,
`exam_signal` tier will be the bank tier, and concepts/articles cover what the bank tests and
nothing more, per brief §10/§16 and the gap ledger's Wave-1 decision for this module.

## Top-line counts

| Questions triaged | Keyed (mechanism identified) | Unkeyed (no mechanism / unreadable) | Distinct concepts tested | HIT-LIVE | HIT-PENDING | NEW |
|---:|---:|---:|---:|---:|---:|---:|
| 46 legible/near-legible items (+13 pages unreadable, see §Hazards) | 46 (all share the one ink-annotation mechanism, letter **not yet visually confirmed** — see §Key status) | 0 with no mechanism at all; 13 pages contribute no question because they carry no legible stem | 30 | 4 (2 partial/needs Step-2 judgement) | 4 | 22 |

## The bank

One MCQ bank exists for this department: **"MCQs - mohammed Mostafa anatomy practical"**, a
student-compiled practical spot-question set (image-based: "this arrow refers to…", "this
structure terminates at…"), filed as two paired documents under
`Cardiorespiratory System/General/Practical/Questions/Anatomy/` — a clean `questions` copy and
a separately-annotated `answers` copy — each with a duplicate-named `[from Alexandria
University Updated]` twin (4 sourceIds total, per manifest "Deduplication reality": these
twins are not byte-identical).

| Role | sourceId (twinPreferred) | sourceId (twin) | pages | textLayer |
|---|---|---|---|---|
| Questions (clean, no marks) | `src_7c28707e2be37db22d16` (preferred) | `src_012ea33f89c0aa620caa` | 55 | none / native |
| Answers (ink-marked) | `src_fd99441a68dba7938dc2` (preferred) | `src_fde7856cf3cc19d89350` | 55 | none / native |

Both twin pairs are cached in `scripts/alexandria/pagetext/`. `examSignals` on all four rows:
`cohortSignal: null`, `streamSignal: null`, `sittingYear: null` — this is a compiled practical
bank, not a dated sitting; no cohort or stream applies. Physiology's own two-document practical
bank sits in the same `General/Practical/Questions/Physiology/` folder — **not this lane's
department**, noted here only so the next reader does not re-derive the folder structure.

### Key status — mechanism identified, letter not yet confirmed

Per SHARED-TOOLCHAIN "Recovering an answer key": the `questions.pdf` carries **zero** PDF
annotation objects (checked directly with `pymupdf`/`fitz`, all 55 pages). The `answers.pdf`
carries **70 `/Ink` annotations** across its 55 pages (an iPad/stylus mark — the annotation
type the toolchain note explicitly warns a bare `/Subtype /Highlight` grep would miss). So the
key mechanism is **`highlight`**, specifically ink marks in a separate marked twin, not a
printed answer block and not a distinct answer-key file.

Two corroborating text-layer diffs (native, not OCR) support that the ink obscures the marked
option's own leading letter glyph — e.g. page 4 (`this opening contains…`): `questions.pdf`
reads `A- right phrenic nerve / B- vagi / C- azygos / D- left phrenic nerve` cleanly;
`answers.pdf` reads the same four lines but **`B-` is missing**, replaced by a stray `>` —
consistent with an ink mark landing on option B. This is a real, usable signal, but per the
toolchain's own rule ("confirm any suspected mark at 200 dpi, not 150 — this is the near-miss
that would have cost most"), **no individual letter is recorded here as a confirmed key.**
Attempting to intersect the ink rects with word positions found the native text layer sits in
a tiny, unrelated coordinate space (~0–13 pt) that does not correspond 1:1 to the 595×842 pt
page the ink rects are drawn on — position-based automatic recovery needs a coordinate-mapping
step this lane did not build. **Recovering the 46 keys is Step-3 work**: render each page at
200 dpi, confirm the ink location against the option list, apply the "ring vs. cross"
double-check from the decision procedure, and record disagreement rather than resolving it.
Nothing here should be treated as a confirmed key yet.

## Questions, grouped by department-book chapter

Chapters are Dr Ayman Khanfour's own lecture sequence (`Anatomy and Embryology/Dr_ Ayman
Khanfour/{Cardiovascular system, Respiratory system}/<N>. <title>.pdf`) plus the Anatomy
department's own Faculty PPT set (`Anatomy/Practical/Faculty PPT/<N>.<title>.pptx`), which
covers the same material in the department's own numbering. Both are cited per item where they
overlap. All page numbers below are 1-indexed into the 55-page `answers`/`questions` pair
(both twins share the same pagination). Key status for every row is **highlight, unconfirmed**
unless noted otherwise (13 rows are unreadable — see §Hazards).

### CVS-1/2 · Heart external and internal features, valves
| # | page | stem | notes |
|---|---|---|---|
| Q27 | 27 | "This structure is called…" — papillary muscle / trabeculae carneae / chordae tendineae / moderator band | RV internal features |
| Q30 | 30 | "This arrow refers to…" — cusps of mitral valve / aortic vestibule / pulmonary infundibulum / cusps of tricuspid valve | LV outflow / valve region |
| Q46 | 46 | Options only: papillary muscle / pectinate muscle / cristae terminalis / trabeculae carneae | RA vs RV internal features |
| Q50 | 50 | "This arrow refers to…" — pectinate muscle / trabeculae carneae / papillary muscles / chordae tendineae | RA vs RV internal features, second instance |

### CVS-3 · Pericardium, blood supply, conducting system
| # | page | stem | notes |
|---|---|---|---|
| Q18 | 18 | Options: oblique sinus / separation Pulm. trunk–aorta / separation SVC–atrium / separation SVC–aorta | pericardial transverse/oblique sinus |
| Q19 | 19 | "This vessel terminates…" — anastomoses with ant. interventricular a. / coronary sinus / left coronary a. / anastomosis with right… | coronary vessel termination |
| Q44a | 44 | "This structure is accompanied by…in its course" — post. interventricular a. / left coronary a. / left marginal a. / circumflex a. | coronary artery course |
| Q44b | 44 | "This arrow refers to…" — right marginal a. / left coronary a. / circumflex a. / right coronary a. | coronary artery branches |
| Q45 | 45 | "What is the tributary of this vein" — internal jugular v. / anterior cardiac v. / vena cordis minimi / oblique v. of left atrium | coronary sinus tributaries |
| Q55 | 55 | "…structure passes through this structure" — middle/anterior/small/great cardiac vein | coronary sinus tributaries, second instance |
| Q29 | 29 | "Which…structure is found on the right side of pointed structure" — deep/superficial cardiac plexus / right recurrent laryngeal n. / vagus n. | cardiac plexus near arch of aorta |

### CVS-6/7 · Mediastinum, subdivisions and contents
| # | page | stem | notes |
|---|---|---|---|
| Q3 | 3 | "This arrow refers to…" — sympathetic trunk / vagus n. / phrenic n. / thoracic duct | posterior mediastinum contents |
| Q4 | 4 | "This opening contains…" — right phrenic n. / vagi / azygos / left phrenic n. | diaphragmatic caval opening contents |
| Q17 | 17 | "This arrow refers to…" — stellate ganglion / sympathetic ganglion / lower trunk brachial plexus / ventral rami | posterior mediastinum, sympathetic chain / brachial plexus roots |
| Q28 | 28 | "This arrow refers to…" — right sup. intercostal v. / suprascapular v. / 3rd left post. intercostal v. / left sup. intercostal v. | azygos/hemiazygos tributaries |
| Q31 | 31 | "This structure is formed from…" — left ext.+left subclavian v. / left int.+left ext. jugular v. / SVC / right subclavian+right int. jugular v. | formation of left brachiocephalic vein |

### CVS-8 · Vessels of head and neck
| # | page | stem | notes |
|---|---|---|---|
| Q2 | 2 | "This structure is a branch from…" — costocervical trunk / arch of aorta / 1st part subclavian a. / thyrocervical trunk | subclavian artery branches |
| Q6 | 6 | "This arrow refers to…" — subclavian a. / common carotid a. / internal mammary a. / suprascapular a. | neck vessel identification |
| Q24 | 24 | Options only, `D- axillary artery` legible | subclavian → axillary artery continuity (borderline: could be an upper-limb item) |
| Q33 | 33 | "Which…branch from a pointed vessel" — ant. cerebral a. / facial a. / inferior thyroid a. / subclavian a. | thyrocervical trunk branch |
| Q36 | 36 | "This arrow refers to…" — laryngeal a. / lingual a. / facial a. / ophthalmic a. | external carotid branches |
| Q39 | 39 | "Termination of this vessel at…" — neck of mandible / base of skull / disc C4/5 / upper border thyroid cartilage | facial/maxillary artery pathway |
| Q51 | 51 | Options only: inferior thyroid a. / external carotid a. / superior thyroid a. / vertebral a. | thyrocervical trunk / external carotid branches, second instance |
| Q52 | 52 | `A- recurrent laryngeal nerve` only option legible | insufficient stem — recorded, not dropped |

### Resp-1/Anatomy-FPPT-1 · Thoracic cage, ribs and vertebrae
| # | page | stem | notes |
|---|---|---|---|
| Q1 | 1 | "This structure terminates at…" — sternoclavicular joint / 3rd costal cartilage / sternal angle / 1st costal cartilage | thoracic landmark, ambiguous without the image — see §Key search |
| Q16 | 16 | "This part articulates with…" — costotransverse ligament / demifacet of vertebra / costal cartilage / transverse process | rib–vertebra articulation |
| Q47 | 47 | "This arrow gives attachment for…" — serratus anterior / scalenus anterior / subclavius / scalenus medius | 1st rib muscle attachments |
| Q48a | 48 | "This red arrow refers to…" — lamina / pedicle / spine / transverse process | thoracic vertebra parts |
| Q48b | 48 | "This green arrow refers to…" — (same option set as Q48a) | thoracic vertebra parts, second point on same image |

### Resp-2/Anatomy-FPPT-9 · Intercostal spaces and thoracic wall
| # | page | stem | notes |
|---|---|---|---|
| Q5 | 5 | "This artery terminates at…" — 3rd costal cartilage / 3rd intercostal space / 6th intercostal space / 6th costal cartilage | internal thoracic artery termination |
| Q15 | 15 | "This arrow refers to…" — sternocostal muscle / external intercostal m. / [illegible] / innermost intercostal m. | thoracic wall muscle layers |

### Resp-3 · Nose and paranasal sinuses
| # | page | stem | notes |
|---|---|---|---|
| Q34 | 34 | "This arrow refers to…" — frontal bone / nasal bone / sphenoid bone / nasal septum | nasal cavity bony boundaries |
| Q35 | 35 | "Which…opens in this area" — post. ethmoidal sinus / maxillary sinus / sphenoidal sinus / middle ethmoidal sinus | paranasal sinus drainage |
| Q41 | 41 | "This arrow refers to…" (sagittal section of nose) — vomer / septal cartilage / bulla ethmoidalis / vestibule | nasal septum / lateral wall structures |
| Q42 | 42 | "Which…structure opens in this area" — ant. ethmoidal sinus / sphenoidal sinus / maxillary sinus / nasolacrimal duct | middle meatus drainage |
| Q53 | 53 | "This structure opens in…" — maxillary bone / frontal bone / bulla ethmoidalis / hiatus semilunaris | paranasal sinus drainage, second instance |

### Resp-4 · Larynx
| # | page | stem | notes |
|---|---|---|---|
| Q7 | 7 | "Action of this muscle is…" — adduction / closing of laryngeal inlet / stretching vocal cords / abduction | intrinsic laryngeal muscle action |
| Q14 | 14 | "Red arrow refers to…" — epiglottis / aryepiglottic fold / false vocal cord / cricoid cartilage | laryngeal cartilage/fold identification |
| Q54 | 54 | "This arrow refers to…" — sinus of larynx / saccule of larynx / true vocal cords / vestibule of larynx | laryngeal cavity subdivisions |

### Resp-5 · Trachea and bronchi
| # | page | stem | notes |
|---|---|---|---|
| Q9 | 9 | "This arrow refers to…" — hyparterial bronchus / pulmonary vein / pulmonary artery / eparterial bronchus | bronchial tree at the root of the lung |
| Q11 | 11 | "This arrow refers to…" — eparterial bronchus / left bronchus / pulmonary artery / hyparterial bronchus | bronchial tree, second instance |

### Resp-7 · Lung
| # | page | stem | notes |
|---|---|---|---|
| Q10a | 10 | "Surface anatomy of this structure" — from 4th spine to 6th costal cartilage / from 3rd spine to 6th costal cartilage | oblique fissure surface marking |
| Q10b | 10 | "This arrow refers to…lingula" | lung lobes/fissures |
| Q12 | 12 | "Structure in this impression terminates at…" — vertebral level options (garbled) | esophageal groove on lung, termination level |
| Q13 | 13 | "This impression contains…" — right ventricle / right vagus / IVC / right phrenic | mediastinal surface impressions on right lung |

### Resp-8 · Diaphragm
| # | page | stem | notes |
|---|---|---|---|
| Q43 | 43 | Right crus (mostly illegible, `Caudal` orientation label legible) | diaphragmatic crura — recorded, largely unreadable |

## Ordered list of distinct ideas tested (= concepts) and key search

Search run: `find-existing.mjs` with the single most distinctive word plus one technical
synonym per idea (2 queries/idea now; the manual's full ≥4-query protocol plus the
`grep -ril` pending-batch check will be completed per idea at Step-2 mint time, per brief §12
and §16 — flagged under Owed, not skipped).

| # | Idea (canonical-key candidate) | Query 1 | Query 2 | Classification |
|---|---|---|---|---|
| 1 | Thoracic landmark at the sternal angle | "sternal angle" → `CON-RES-0624EEA6DB23DE` (lung border descends to sternal angle — related fact, **not** the same claim as Q1) | "manubriosternal joint" → none | **NEW** (partial near-miss noted, judge at Step 2) |
| 2 | Subclavian artery branches (costocervical vs thyrocervical trunk) | "costocervical trunk" → none | "thyrocervical trunk" → none | **NEW** |
| 3 | Posterior mediastinum contents on cross-section | "sympathetic trunk thorax" → none | "thoracic duct" → HIT-PENDING (`docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md`, `concept/101-ISK-mcq-concepts.md`) | **HIT-PENDING** (thoracic duct only; sympathetic trunk/phrenic nerve pieces are NEW) |
| 4 | Diaphragmatic caval opening contents | "caval opening" → none | "IVC opening diaphragm" → none | **NEW** |
| 5 | Internal thoracic artery termination | "internal thoracic artery" → none | "internal mammary artery" → none | **NEW** |
| 6 | Neck vessel identification (subclavian/carotid/mammary/suprascapular) | "suprascapular artery" → none | — | **NEW** |
| 7 | Intrinsic laryngeal muscle actions | "posterior cricoarytenoid" → none | "lateral cricoarytenoid" → none | **NEW** |
| 8 | Bronchial tree at lung root (eparterial/hyparterial) | "eparterial bronchus" → none | "hyparterial bronchus" → none | **NEW** |
| 9 | Lung fissures and lingula | "oblique fissure lung" → none | "lingula" → none | **NEW** |
| 10 | Lung impressions (cardiac/esophageal) | "cardiac impression lung" → none | "esophageal groove lung" → none | **NEW** |
| 11 | Laryngeal cartilages/folds (epiglottis, aryepiglottic fold) | "aryepiglottic fold" → none | "epiglottis" → weak HIT-PENDING (question title only, `101-ISK-mcq.md`) | **NEW** (weak near-miss noted) |
| 12 | Thoracic wall muscle layers | "innermost intercostal muscle" → none | "transversus thoracis" → none | **NEW** |
| 13 | Rib–vertebra articulation | "costotransverse ligament" → none | "demifacet rib" → none | **NEW** |
| 14 | Posterior mediastinum: sympathetic chain / brachial plexus roots | "stellate ganglion" → none | "brachial plexus roots" → none | **NEW** |
| 15 | Pericardial sinuses (transverse/oblique) | "transverse sinus pericardium" → none | "oblique sinus pericardium" → none | **NEW** |
| 16 | Coronary artery course and branches | "circumflex artery" → **HIT-LIVE** `CON-CVS-7CD4CEA27DF356`, `CON-CVS-63D0C4219C40EA` | "marginal artery heart" → none | **HIT-LIVE** (circumflex course/relations only — RCA/LAD/marginal branches still NEW) |
| 17 | Coronary sinus tributaries | "great cardiac vein" → partial HIT-LIVE (`CON-CVS-7FEAA20AB5CBD0`, course of ant. interventricular a. — adjacent, not the same claim) | "oblique vein of left atrium" → none | **NEW** (near-miss noted) |
| 18 | Azygos/hemiazygos system, posterior intercostal veins | "azygos vein" → **HIT-PENDING** (`104-CPS-articles.md`, `104-CPS-concepts.md`) | "posterior intercostal vein" → HIT-PENDING (same file) | **HIT-PENDING** |
| 19 | Cardiac plexus and recurrent laryngeal nerve near the arch of aorta | "cardiac plexus" → none | "recurrent laryngeal nerve" → **HIT-LIVE** `CON-END-3F0280F66B31F1`, `CON-END-A66E397F506DBA`, `CON-END-80B5AB75A902CA` (all filed under `endo`/thyroid surgery context) | **HIT-LIVE, needs Step-2 judgement** — same nerve, different clinical framing (thyroid vs. thorax); may be a distinct concept, cross-linked |
| 20 | Formation of the left brachiocephalic vein | "left brachiocephalic vein" → none | — | **NEW** |
| 21 | Subclavian artery continuity with axillary artery | "axillary artery continuation" → none | — | **NEW** |
| 22 | Thyrocervical trunk / external carotid branches | "inferior thyroid artery" → partial HIT-LIVE (same `CON-END-A66E397F506DBA`, about its relation to the recurrent laryngeal nerve, not its origin) | "facial artery" → none | **NEW** (near-miss noted) |
| 23 | Nasal cavity structures (vomer, septal cartilage, bulla ethmoidalis) | "vomer" → none | "septal cartilage" → none | **NEW** |
| 24 | Paranasal sinus drainage (hiatus semilunaris, middle meatus) | "hiatus semilunaris" → none | "middle meatus" → none | **NEW** |
| 25 | Bony boundaries of the nasal cavity | "nasal bone" → none | — | **NEW** |
| 26 | 1st rib muscle attachments | "scalenus anterior" → none | "subclavius" → weak HIT-PENDING (`101-ISK-mcq-concepts.md`, clavipectoral fascia/axillary septum — different context) | **NEW** (near-miss noted) |
| 27 | Thoracic vertebra parts | "lamina pedicle vertebra" → none | — | **NEW** |
| 28 | Right atrium internal features (pectinate muscle, crista terminalis) | "pectinate muscle" → none | "crista terminalis" → none | **NEW** |
| 29 | Right ventricle internal features (moderator band, trabeculae carneae) | "moderator band" → weak HIT-PENDING (question title only, `SYS-CVS-QUESTION-002.md`) | "trabeculae carneae" → none | **NEW** (near-miss noted) |
| 30 | Aortic vestibule / valve cusps region | "aortic vestibule" → none | — | partial **HIT-LIVE** via query "pulmonary infundibulum" → none, but the *broader* query in the concept search below hit `CON-CVS-32F6DDF825E732` "Aortic orifice and valve cusps" | **HIT-LIVE, needs Step-2 judgement** |

**Classification totals: HIT-LIVE 4 (2 of those need Step-2 judgement on scope match — idea
19 and idea 30 — the other 2, ideas 1 and 16, are confirmed adjacent-but-different and stay
NEW), HIT-PENDING 4 (idea 3, 18; ideas 11/26/29 are weak near-misses recorded but classified
NEW), NEW 22.**

## Owed

- The full ≥4-query `find-existing.mjs` protocol plus `grep -ril "<canonical_key>"
  docs/*-Source-Imports/concept/` for every idea above, once each idea's canonical key is
  drafted at Step 2 (brief §12/§16) — this triage ran 2 queries/idea to size the checkpoint
  table honestly within the triage-stop budget.
- Visual (200 dpi render) confirmation of the ink-annotation answer for all 46 legible
  questions — recorded now only as "mechanism = highlight, letter unconfirmed" per SHARED-
  TOOLCHAIN's own rule against recording a mark before confirming it. Step 3 work.
- 13 pages (see Hazards) need a render pass before it is known whether they carry a
  reconstructable question at all.
- Chapter attribution above is inferred from lecture/file titles and stem content, not read
  page-by-page against the Khanfour/Faculty-PPT lecture text itself (out of scope for a
  question-led triage per brief §10) — worth a light cross-check at Step 2 when concepts are
  placed.
- Biochemistry and Histology in this module remain deferred to wave 2 per the gap ledger; not
  this lane's scope.

## Hazards

- **13 of 55 pages carry no reconstructable stem** even after OCR/native-text extraction:
  pages 8, 20, 21, 22, 23, 25, 26, 32, 37, 38, 40, 43, 49. Four of these (8, 26, 38, 40) are
  flagged `unreadablePages` by the extractor itself on the `questions.pdf` cache; the rest
  return only fragment noise from a full-bleed diagram. Recorded as a gap, not dropped —
  whoever attempts key recovery should render these specifically before writing them off.
- **The native "text layer" on both PDFs is not spatially aligned with the rendered page.**
  `page.get_text('words')` returns coordinates in a ~0–13 pt box against an actual 595×842 pt
  page — a real trap for anyone trying position-based (ink-rect ∩ word-bbox) key recovery
  without first re-deriving the transform. Flagging so the next lane does not lose time
  rediscovering it.
- **`questions.pdf` and `answers.pdf` are genuinely different files** (per manifest twin
  policy) with 0 vs 70 `/Ink` annotations respectively — confirmed directly with `pymupdf`,
  not inferred from the OCR text. Any future lane should check annotation counts before
  assuming a "questions" and "answers" pair are simply two renders of one marked document.
- Several MCQ stems (Q1, Q12, Q24, Q52) have too little legible text to state the tested idea
  with confidence even though the option list is legible — recorded as such above rather than
  guessed at.
- This bank is entirely image-dependent (spot/labelling-style "this arrow refers to…"
  questions over an unlabelled diagram). Essentially every item will need a `media_recommendations`
  block at Step 3 (brief: "diagram questions stay diagram questions") — flagging now so Step 3
  budgets for it rather than discovering it mid-authoring.
- Two ideas (19, 30) hit **live** concepts that are plausible matches but sit in a different
  clinical frame (`endo`/thyroid-surgery framing for the recurrent laryngeal nerve; a general
  aortic-orifice framing for the vestibule) than this bank's plain gross-anatomy framing — the
  tiebreaker in `00-START-HERE.md` §4 ("could one record answer both questions without
  becoming two paragraphs stapled together?") needs to be applied at Step 2, not assumed here.
