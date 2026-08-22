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

## Status after second sitting (2026-08-23)

Ink-annotation keys for all 46 legible items are now confirmed by 200 dpi render (see
§Ink-key confirmation below) — every key in the Questions/grouped-by-chapter tables above
should be read together with that section, which also corrects idea 4's mislabeling (esophageal
opening, not caval) and Q51/Q52. All 13 previously "unreadable" pages are recovered. The
Telegram "ASM Minds" practical CVS bank has been triaged for this department (see §Addendum);
module-wide idea count is now 36 (30 + 6 new), still 4 HIT-LIVE / 4 HIT-PENDING / 28 NEW.

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

## Ink-key confirmation at 200 dpi (second sitting, 2026-08-23)

Method: `pdftoppm -png -r 200` on the preferred answers twin (`src_fd99441a68dba7938dc2`),
all 55 pages, each PNG read by eye. No coordinate transform was needed in the end — the
transform note in §Hazards concerns automatic (word-bbox ∩ ink-rect) recovery only; reading
the render visually sidesteps it entirely, which is the toolchain's own prescribed fallback.
Two ink styles are used across the document, both unambiguous at 200 dpi: (a) a solid
black/dark oval or diamond stamped directly over the option's leading letter, and (b) the
correct option's whole line recoloured bright yellow against the others' white. No page
required a "ring vs cross" tiebreak; every mark was a single unambiguous option per question.

**All 55 pages are legible at 200 dpi — the 13 pages the Step-1 triage flagged unreadable were
a text-extraction artifact, not a rendering problem.** Pages 8, 20, 21, 22, 23, 25, 26, 32, 37,
38, 40, 43 and 49 all carry a clean stem, four options and one confirmed ink mark; page 26
duplicates page 25's question (same stem/options/mark) on a second image. Recovered content
adds: Q8 arytenoid cartilage (D), Q20 trachea/level (C = T4), Q21 IVC opening into right
atrium (B), Q22 fossa ovalis (A), Q23 azygos arch tributary level (C = sternal angle), Q32
diaphragmatic opening level (B = T8), Q37 thoracic duct termination (A = C7), Q38 aortic
opening level (B = T12), Q40 arch-of-aorta relation (A = left recurrent laryngeal nerve), Q43
right crus of diaphragm (A), Q49 arch-of-aorta relation again (B = left recurrent laryngeal
nerve, a second image of the same idea as Q40). Page 46 also carries a second, previously
uncatalogued question sharing its image ("this structure starts at" — IVC, A = L5).

**Two corrections to the Step-1 stem descriptions**, recorded as printed per brief's "never
reconcile silently" rule:
- **Q4 (page 4) is the esophageal opening of the diaphragm, not the caval opening.** The
  arrow sits on the smaller, more medial hiatus; the marked answer (B = vagi) and the visible
  aortic opening lower on the same plate confirm it. The Step-1 table's "Diaphragmatic caval
  opening contents" label for idea 4 is retitled below.
- **Q51 (page 51) is answered D = vertebral artery**, not a thyrocervical-trunk/external-
  carotid branch as Step-1 guessed from the single legible option. **Q52 (page 52)'s full stem
  is now legible — "this structure is supplied by which sensory nerve" — answered C = internal
  laryngeal nerve**, not A (recurrent laryngeal nerve), which Step-1 recorded as the only
  legible option and therefore could not classify with confidence.

**Confirmed answer key (46 original items + 11 recovered):**

| Q | Page | Confirmed answer | Idea # |
|---|---|---|---|
| 1 | 1 | A – sternoclavicular joint | 1 |
| 2 | 2 | C – 1st part of subclavian artery | 2 |
| 3 | 3 | B – vagus nerve | 3 |
| 4 | 4 | B – vagi (esophageal opening, corrected) | 4 |
| 5 | 5 | C – 6th intercostal space | 5 |
| 6 | 6 | A – subclavian artery | 6 |
| 7 | 7 | D – abduction | 7 |
| 8 (recovered) | 8 | D – arytenoid cartilage | 11 |
| 9 | 9 | B – pulmonary vein | 8 |
| 10a/b | 10 | D – 3rd spine to 6th costal cartilage; D – lingula | 9 |
| 11 | 11 | B – left bronchus | 8 |
| 12 | 12 | B – T12 (printed key kept as-is; anatomically expected T10, not reconciled) | 10 |
| 13a/b | 13 | B – arch of azygos; D – right phrenic | 10 |
| 14 | 14 | B – aryepiglottic fold | 11 |
| 15 | 15 | B – external intercostal muscle | 12 |
| 16 | 16 | D – tip of transverse process | 13 |
| 17 | 17 | C – lower trunk of brachial plexus | 14 |
| 18 | 18 | D – separation Pulm. trunk/aorta–SVC (transverse sinus) | 15 |
| 19 | 19 | D – anastomosis with continuation of right coronary artery | 16 |
| 20 (recovered) | 20 | C – T4 | new (AD-5) |
| 21 (recovered) | 21 | B – IVC opening | 28 |
| 22 (recovered) | 22 | A – fossa ovalis | 28 |
| 23 (recovered) | 23 | C – sternal angle | 17/18 family |
| 24 | 24 | D – axillary artery | 21 |
| 25/26 (recovered, dup.) | 25, 26 | D – right valve of the sinuatrial orifice (embryological origin) | 28 |
| 27 | 27 | D – moderator band | 29 |
| 28 | 28 | D – left superior intercostal vein | 18 |
| 29 | 29 | B – superficial cardiac plexus | 19 |
| 30 | 30 | B – aortic vestibule | 30 |
| 31 | 31 | D – right subclavian + right internal jugular vein | 20 family |
| 32 (recovered) | 32 | B – T8 | 4 family |
| 33 | 33 | B – facial artery | 22 |
| 34 | 34 | B – nasal bone | 25 |
| 35 | 35 | D – middle ethmoidal air sinus | 24 |
| 36 | 36 | C – facial artery | 6/22 |
| 37 (recovered) | 37 | A – C7 (thoracic duct termination) | new |
| 38 (recovered) | 38 | B – T12 (aortic opening) | new (AD-6) |
| 39 | 39 | D – upper border of thyroid cartilage | 6 family |
| 40 (recovered) | 40 | A – left recurrent laryngeal nerve | 19 |
| 41 | 41 | D – vestibule | 23 |
| 42 | 42 | D – nasolacrimal duct | 24 family |
| 43 (recovered) | 43 | A – right crus | new |
| 44a/b | 44 | D – circumflex artery; D – right coronary artery | 16 |
| 45 | 45 | D – oblique vein of left atrium | 17 |
| 46 | 46 | B – pectinate muscle | 28 |
| 46b (recovered, shares page) | 46 | A – L5 (IVC begins) | new (AD-4) |
| 47 | 47 | D – scalenus medius | 26 |
| 48a/b | 48 | A – pedicle; A – lamina | 27 |
| 49 (recovered) | 49 | B – left recurrent laryngeal nerve | 19 |
| 50 | 50 | B – trabeculae carnea | 29 family |
| 51 | 51 | D – vertebral artery (corrected) | 6 family, retitled |
| 52 | 52 | C – internal laryngeal nerve (corrected, full stem now legible) | 11 family |
| 53 | 53 | D – hiatus semilunaris | 24 |
| 54 | 54 | B – saccule of larynx | 11 family |
| 55 | 55 | D – great cardiac vein | 17 |

Q1's stem ("this structure terminates at") and the Q24/Q52 stems Step-1 flagged as
under-legible are unaffected by this pass — the render confirms the options and mark but the
full stem context for Q24 (upper-limb framing) still needs Step-2 judgement on whether it
belongs to this bank's scope at all (kept as flagged, not resolved here).

## Addendum — Telegram "Practical CVS Qs Bank, ASM Minds" (second sitting, 2026-08-23)

Source: `/Users/doitrous/Desktop/Alexandria University/y1/MED 106 - Cardiorespiratory System &
Communication and Basic Clinical Skills (2)/Cardiorespiratory System/General/Telegram/Practical
CVS Qs Bank, ASM Minds.pdf` — not yet in the manifest, **sourceId pending**. 42 pages, native text
layer, `pdftotext -layout` (no OCR needed), no encryption issue for extraction despite the PDF's
print/copy-restricted flag. Shared with the AU-MED-106 Physiology lane (its own sections:
Physiology pp.19–31, Biochemistry pp.35–38 onward — not this lane's scope). This lane's scope is
the Anatomy sections only: "1. Cardiovascular system" (Qs pp.1–5, Answers pp.6–7, 17 spot items)
and "2. Pulmonary system" (Qs pp.8–9/10–11, Answers pp.12, 13 spot items) — 30 spot items total,
each a fill-in-the-blank identification/short-answer item with a printed (not ink-annotated)
answer key on its own numbered page. Histology (pp.13–17, 12 spot items) is out of scope per the
gap ledger's Wave-2 deferral for this module's Biochemistry/Histology.

**Format note.** These are practical spot-identification items (image absent from the extracted
text; "identify the X", "mention two Y") — short-answer/fill-in, not four-option MCQs. They read
as practical-station content per `06-osce-stations.md` / `08-skills-checklists.md` shape, not
`05-questions.md` shape. Recorded here as triage; Step 3 authoring routes them to `practical/`
rather than `question/` (flagged under Owed).

**Anatomy-taught ideas, keyed, classified** (bank-tier `exam_signal`; `cohortSignal` /
`streamSignal` / `sittingYear` all null — a compiled practical bank, not a dated sitting):

| # | Idea (spot ref) | Printed key | Relation to the 30 ideas above |
|---|---|---|---|
| a1 | First rib and its relations (CVS Spot.1: 1st rib / neck of rib / stellate ganglion + superior intercostal artery) | as printed | broadens idea 26 (1st rib muscle attachments) to include its neurovascular relations |
| a2 | Thoracic vertebra parts (Spot.2: spinous/transverse process) | as printed | reinforces idea 27 |
| a3 | Venous openings into the right atrium (Spot.3: SVC & IVC) | as printed | broadens idea 28 (RA internal features) — same chamber, same record per §4 tiebreaker |
| a4 | Typical rib, costal groove, intercostal neurovascular bundle (Spot.4) | as printed | **NEW** — no idea above covers rib cross-section anatomy |
| a5 | Anterior interventricular groove contents (Spot.5, Spot.15) | as printed | reinforces idea 17 (coronary sinus tributaries) / idea 16 family |
| a6 | Surface anatomy of the heart: apex (LV, left 5th ICS), ligamentum arteriosum, mitral/tricuspid valve surface markings (Spot.6, Spot.16) | as printed | **NEW** — surface anatomy is not covered by any of the 30 |
| a7 | Relations of the arch of the aorta (left phrenic + left recurrent laryngeal nerve) (Spot.7) | as printed | reinforces idea 19 (cardiac plexus/RLN, HIT-LIVE judgement) |
| a8 | Coronary sulcus contents (Spot.8) | as printed | reinforces idea 16 |
| a9 | Internal jugular vein and its neck arterial relations (Spot.9) | as printed | broadens idea 6 (neck vessel identification) |
| a10 | Common carotid artery origin, bifurcation, termination level (Spot.10) | as printed — right common carotid "from the arch of the aorta" recorded as printed though anatomically it is a brachiocephalic-trunk branch on the right; not reconciled | broadens idea 6 |
| a11 | Internal thoracic artery origin (Spot.11) | as printed | reinforces idea 5 (reciprocal of its termination) |
| a12 | Formation and termination of the superior vena cava (Spot.12) | as printed | **NEW** — distinct objective from idea 20 (LBCV formation); cross-link, do not merge (worked-example logic in 00-START-HERE §4) |
| a13 | Left brachiocephalic vein tributaries (Spot.13) | as printed | reinforces idea 20 |
| a14 | External carotid artery branches, thyrocervical trunk branches (Spot.14) | as printed | reinforces idea 22 |
| a15 | Formation of the inferior vena cava (Spot.17: union of common iliac veins, L5) | as printed; page's third sub-answer ("begins behind right sternoclavicular joint by union of IJV+subclavian v.") is anatomically the brachiocephalic vein, not the IVC — a genuine printed-key inconsistency, recorded as printed, not corrected | **NEW** — corroborated independently by the ink-bank's recovered Q46b (IVC begins at L5) |
| a16 | Cricothyroid/posterior cricoarytenoid/lateral cricoarytenoid/transverse arytenoid actions and nerve supply (Pulm Spot.1, 4, 8, 11) | as printed | substantially reinforces idea 7 (intrinsic laryngeal muscle actions) with the specific muscle-action-nerve triples idea 7's bank alone could not fully resolve |
| a17 | Right lung impressions incl. azygos vein impression (Pulm Spot.2) | as printed | reinforces idea 10 |
| a18 | Trachea: mediastinal subdivisions, relations (vagi, left recurrent laryngeal nerve), bifurcation level, anterior relations (thymus, left brachiocephalic vein) (Pulm Spot.3, 13) | as printed | **NEW** — corroborated by the ink-bank's recovered Q20 (trachea level = T4) |
| a19 | Left lung impressions: arch of aorta, cardiac notch (Pulm Spot.5) | as printed | reinforces idea 10 |
| a20 | Nasal cavity: sphenoethmoidal recess, sphenoid sinus (Pulm Spot.6) | as printed | reinforces idea 24 |
| a21 | Esophagus: level of origin (C6), mediastinal course | as printed | folded into a18 (taught as the paired tubular viscera of the mediastinum) |
| a22 | Diaphragmatic aortic opening: level (T12) and contents (aorta, azygos vein, thoracic duct implied) (Pulm Spot.9) | as printed | **NEW**, corroborated independently by the ink-bank's recovered Q38 (aortic opening = T12) |
| a23 | Right lung lobes and inferior pulmonary vein (Pulm Spot.10) | as printed | reinforces idea 9 |
| a24 | Diaphragmatic caval opening: level (T8), contents (right phrenic nerve, IVC) (Pulm Spot.12) | as printed | reinforces idea 4 family (now correctly disambiguated from the esophageal-opening item, see ink-confirmation corrections above), corroborated by recovered Q32 (T8) |

**Find-existing run for the six genuinely NEW ideas** (a4, a6, a12, a15, a18, a22 — ≥4 queries
each, `find-existing.mjs` plus `grep -ril` across `docs/*-Source-Imports/concept/`):

| Idea | Queries | Result |
|---|---|---|
| a4 (typical rib/costal groove) | "costal groove", "typical rib", "subcostal nerve", "intercostal vein groove" | no hit anywhere — **NEW** |
| a6 (heart surface anatomy/ligamentum arteriosum) | "ligamentum arteriosum", "cardiac notch", "apex beat", "mitral area surface anatomy" | "ligamentum arteriosum" appears only inside `CON-CVS-4F6394A2A7C0C5` (aortic-arch-aneurysm mediastinal-syndrome concept, Kasr 104-CPS, live) as a passing mention, not as its own concept; "apex beat" hits a live-pending **practical** station (`SYS-CVS-PRACTICAL-002`, palpating the praecordium), not a concept — near-miss, not a merge candidate (different content type). **NEW**, cross-link both in `related_concepts`/`related_articles` |
| a12 (SVC formation/termination) | "superior vena cava formation", "brachiocephalic veins union", "SVC termination", "azygos vein SVC" | no hit — **NEW** |
| a15 (IVC formation) | "inferior vena cava formation", "common iliac veins union", "IVC L5", "renal veins IVC" | no hit ("inferior vena cava" appears in Kasr `101-ISK-mcq-concepts.md` only inside a systemic/pulmonary/portal-circulation overview concept, not IVC formation) — **NEW** |
| a18 (trachea/esophagus mediastinal course) | "tracheal bifurcation", "carina trachea", "thymus trachea relation", "esophagus C6" | no hit — **NEW** |
| a22 (diaphragmatic aortic opening) | "aortic opening diaphragm", "thoracic duct diaphragm", "azygos vein diaphragm", "T12 diaphragm opening" | no hit — **NEW** |

**Addendum classification totals: 0 HIT-LIVE, 0 HIT-PENDING, 6 NEW (a4, a6, a12, a15, a18, a22);
the remaining 18 addendum ideas broaden or corroborate ideas 4–10, 16–20, 22, 24, 26–28 already
on the Step-1 list — no new concept records for those, only richer field content when Step 2
drafts them.** Combined module total after the addendum: **36 distinct ideas** (30 + 6), same
4 HIT-LIVE / 4 HIT-PENDING / now **28 NEW** (22 + 6).

### Owed (addendum)
- Physiology and Biochemistry/Histology sections of this same PDF belong to other lanes —
  not extracted further here beyond the table of contents already read.
- The 30 spot items are short-answer/practical-shaped, not MCQ-shaped; Step 3 should confirm
  routing (`practical/` vs `question/`) against `06-osce-stations.md` before authoring.
- a10's "right common carotid from the arch of the aorta" and a15's third sub-answer (IVC vs
  brachiocephalic-vein mixup) are genuine printed-key oddities recorded as printed, per brief;
  they should not silently become "fact" in an article — the department-book chapter, not the
  bank stem, is cited for the actual anatomical claim in both cases.

## Step-2 tiebreaker resolutions (second sitting, 2026-08-23)

Applying `00-START-HERE.md` §4 ("could one record answer both questions without becoming two
paragraphs stapled together?"):

- **Idea 3** ("posterior mediastinum contents on cross-section") — the Step-1 "thoracic duct"
  hit (`CON-MSK-BF3670E27D6F12`, "right lymphatic duct vs thoracic duct drainage
  territories") is a **false near-miss, not a merge**. The bank's own confirmed key (Q3 = B,
  vagus nerve) tests identifying the vagus nerve on a posterior-mediastinum cross-section —
  a structure-identification objective, not the lymph-duct-territory objective the live
  record states. **Reclassified NEW.** `CON-MSK-BF3670E27D6F12` recorded as a
  `rejected_merge_candidate_id` when the concept is authored.
- **Idea 19** (cardiac plexus / recurrent laryngeal nerve) — resolved as a **sparse update**
  to `CON-END-80B5AB75A902CA` (see `concept/AU-MED-106-anatomy-concepts.md`): same objective
  (what the RLN supplies), AU's bank just tests it from a gross-thoracic framing rather than
  thyroid surgery. The separate objective of *where* the nerve runs (hooking under the arch of
  the aorta on the left — Q29/Q40/Q49) is **not** covered by that record and stays a NEW idea
  ("course and relations of the recurrent laryngeal nerves in the thorax"), cross-linked.
- **Idea 30** (aortic vestibule) — `CON-CVS-32F6DDF825E732` ("Aortic orifice and valve cusps",
  key `aortic-orifice.location-and-ring`) states the valve ring itself; the bank's Q30 (B =
  aortic vestibule) tests the smooth-walled LV outflow tract proximal to the ring — a
  different structure with a different objective. **Two concepts, cross-linked, not a
  merge.** `CON-CVS-32F6DDF825E732` recorded as `rejected_merge_candidate_ids` when idea 30 is
  authored.
- **Idea 18** (azygos/hemiazygos system) — resolved as a **sparse update** to
  `CON-CVS-19E63D8A8E7EDA` in `pending-live/AU-MED-106-anatomy.md` (exact match, no scope
  difference).

All four resolutions are validated (see CLAIMS.md entry, this date). Full authoring of idea 3,
19's course-and-relations half, and 30 as NEW concept+article records remains **OWED** —
genuinely out of scope for this sitting alongside the addendum triage and the 200 dpi
ink-key pass; recommend a third sitting.
