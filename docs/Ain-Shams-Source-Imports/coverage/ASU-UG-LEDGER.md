| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| ass1-ug-2020 | 0 | 0 | 26 | 26 |
| assessment-1-mcq | 63 | 5 | 0 | 68 |
| assessment-1-mcq-micro | 0 | 0 | 5 | 5 |
| assessment-1-mcq-patho | 0 | 0 | 16 | 16 |
| assessment-2-mcq-1 | 11 | 1 | 0 | 12 |
| assessment-2-mcq-1-bio | 0 | 0 | 1 | 1 |
| assessment-2-mcq-1-community | 0 | 0 | 4 | 4 |
| assessment-2-mcq-1-patho | 0 | 0 | 6 | 6 |
| assessment-2-mcq-1-patho-q19b | 0 | 0 | 1 | 1 |
| eom-final-ug1-2020 | 0 | 0 | 19 | 19 |
| eom-ug-final1-2024 | 0 | 0 | 19 | 19 |
| eom-ug-final2-2024 | 0 | 0 | 23 | 23 |
| eom-ug-final2-collection | 120 | 5 | 0 | 125 |
| first-assessment-ug-2024 | 0 | 0 | 24 | 24 |

## Held
- assessment-1-mcq-q46 — duplicate — Physio Q46 ("Psychic hyperventilation? Decrease in excretion of titratable urine acidity") re-asks the same fact tested in Physio Q10 ("which condition is associated with a decrease in urinary titratable acid excretion? Psychic hyperventilation"), authored as assessment-1-mcq-q10; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- assessment-1-mcq-q47 — duplicate — Physio Q47 ("One of the factors affecting kF (filtration coefficient)? Surface area of GBM") re-asks the same fact tested in Physio Q28 ("Affects filtration coefficient kF? surface area of capillary membrane"), authored as assessment-1-mcq-q28; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- assessment-1-mcq-patho-q06 — duplicate — Patho Q6 ("Oliguria, hematuria, hypertension, and periorbital edema are characteristic clinical features for which type of glomerulonephritis? Poststreptococcal GN") re-asks the same nephritic-syndrome-to-post-infectious-GN fact tested in Patho Q1 ("Nephritic syndrome S/S: hematuria, HTN etc? Post infection GN"), authored as assessment-1-mcq-patho-q01; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- assessment-1-mcq-patho-q15 — duplicate — Patho Q15 ("a diabetic patient with high WBCS count, casts, costovertebral loin pain? Acute pyelonephritis") re-asks the same casts-plus-costovertebral-tenderness-diagnoses-pyelonephritis fact tested in Patho Q3 ("sexually active female, high wbcs count, casts, costovertebral loin pain? Pyelonephritis"), authored as assessment-1-mcq-patho-q03; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- assessment-1-mcq-micro-q05 — duplicate — Micro Q5 ("Vaginal candidiasis? Germ tube test") re-asks the same fact already covered by the germ-tube-test/Candida-albicans concept minted in the eom-ug-final2-collection cluster (Micro block, ASU-UG-eom-ug-final2-collection-concepts.md), a genuine cross-paper duplicate (LANE-CARD-Y2-3 §4 cross-file recycling trap) confirmed via find-existing.mjs "germ tube" and grep of docs/Ain-Shams-Source-Imports/concept/. Held rather than re-minted a twin.
- assessment-2-mcq-1-patho-q09 — within-file duplicate — Patho item 9 ("21 alpha Hydroxylase defects leads to? hyponatremia") re-asks the same 21-alpha-hydroxylase/salt-wasting fact tested more fully in Bio item 1 ("masculine female genitalia, hyponatremia, hyperkalemia"), authored as assessment-2-mcq-1-bio-q01; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- eom-ug-final2-collection-q047 — duplicate of q044 (Histo Q2) — Histo Q5 ("cells lining the seminiferous tubules -> Sertoli cell with indistinct cell boundary") re-asks the same apical-infoldings/indistinct-border fact tested in Histo Q2; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- eom-ug-final2-collection-q085 — duplicate — Micro Q14 (page 12, genital ulcer + adenopathy + multinucleated giant cells + intranuclear inclusions on tissue culture, causative pathogen HSV) re-asks the same HSV/multinucleated-giant-cell fact tested in Micro Q13 (page 11, vesicular lesions turning to ulcers, Tzanck/Giemsa smear finding); collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- eom-ug-final2-collection-q108 — duplicate — Patho Q12 ("mucinous cysts in cervical mucosa obstructed by a squamous tumor -> Nabothian cyst") re-asks the same Nabothian-cyst-from-obstructed-endocervical-gland fact tested in Patho Q1 ("finding in chronic cervicitis -> Nabothian cysts (dt obstruction in endocervical glands)"), authored as eom-ug-final2-collection-q097; collapsed per LANE-CARD-Y2-3 within-file duplicate rule.
- eom-ug-final2-collection-q109 — doubtful/unclear premise — Patho Q13 asks why colonoscopy is performed for a patient with cervical intraepithelial neoplasia (CIN) and keys "as it has high risk of cancer"; standard teaching does not link CIN (a cervical, HPV-driven squamous lesion confined to the cervix) to a colonoscopy indication — colonoscopy/proctoscopy has a role in staging invasive (not intraepithelial) cervical carcinoma for suspected bowel invasion, and CIN itself is managed with colposcopy, not colonoscopy. The question's premise does not map onto any standard teaching this lane could verify or recover a defensible correct statement from, so it is held rather than guessed at; flagged to chief-of-staff / Omar for a ruling, ideally with the source page re-checked for what was actually being asked (e.g. invasive cervical cancer staging, not CIN).
- eom-ug-final2-collection-q112 — doubtful key — Patho Q16 asks which statement is true regarding prostatic carcinoma and keys "corpora amylacea in lumen"; standard prostate pathology teaching (reinforced by this same source's own Patho Q21, authored as eom-ug-final2-collection-q117, which correctly keys corpora amylacea as a normal, age-related finding in *benign* prostatic acini) holds that corpora amylacea are a feature of benign glands and are characteristically *absent* from malignant glands — their presence is used as one histologic clue *against* cancer. This reverses, rather than merely debates, an accepted diagnostic teaching point, so it is held rather than authored with a doubt note per the "printed keys stand unless unrecoverable" rule; flagged to chief-of-staff / Omar for a ruling.

## Remaining
- ass1-ug-2020-q01
- ass1-ug-2020-q02
- ass1-ug-2020-q03
- ass1-ug-2020-q04
- ass1-ug-2020-q05
- ass1-ug-2020-q06
- ass1-ug-2020-q07
- ass1-ug-2020-q08
- ass1-ug-2020-q09
- ass1-ug-2020-q10
- ass1-ug-2020-q11
- ass1-ug-2020-q12
- ass1-ug-2020-q13
- ass1-ug-2020-q14
- ass1-ug-2020-q15
- ass1-ug-2020-q16
- ass1-ug-2020-q17
- ass1-ug-2020-q18
- ass1-ug-2020-q19
- ass1-ug-2020-q20
- ass1-ug-2020-q21
- ass1-ug-2020-q22
- ass1-ug-2020-q23
- ass1-ug-2020-q24
- ass1-ug-2020-q25
- ass1-ug-2020-q26
- assessment-1-mcq-micro-q01
- assessment-1-mcq-micro-q02
- assessment-1-mcq-micro-q03
- assessment-1-mcq-micro-q04
- assessment-1-mcq-micro-q05
- assessment-1-mcq-patho-q01
- assessment-1-mcq-patho-q02
- assessment-1-mcq-patho-q03
- assessment-1-mcq-patho-q04
- assessment-1-mcq-patho-q05
- assessment-1-mcq-patho-q06
- assessment-1-mcq-patho-q07
- assessment-1-mcq-patho-q08
- assessment-1-mcq-patho-q09
- assessment-1-mcq-patho-q10
- assessment-1-mcq-patho-q11
- assessment-1-mcq-patho-q12
- assessment-1-mcq-patho-q13
- assessment-1-mcq-patho-q14
- assessment-1-mcq-patho-q15
- assessment-1-mcq-patho-q16
- assessment-2-mcq-1-bio-q01
- assessment-2-mcq-1-community-q01
- assessment-2-mcq-1-community-q02
- assessment-2-mcq-1-community-q03
- assessment-2-mcq-1-community-q04
- assessment-2-mcq-1-patho-q09
- assessment-2-mcq-1-patho-q10
- assessment-2-mcq-1-patho-q12
- assessment-2-mcq-1-patho-q14
- assessment-2-mcq-1-patho-q15
- assessment-2-mcq-1-patho-q19
- assessment-2-mcq-1-patho-q19b
- eom-final-ug1-2020-q01
- eom-final-ug1-2020-q02
- eom-final-ug1-2020-q03
- eom-final-ug1-2020-q04
- eom-final-ug1-2020-q05
- eom-final-ug1-2020-q06
- eom-final-ug1-2020-q07
- eom-final-ug1-2020-q08
- eom-final-ug1-2020-q09
- eom-final-ug1-2020-q10
- eom-final-ug1-2020-q11
- eom-final-ug1-2020-q12
- eom-final-ug1-2020-q13
- eom-final-ug1-2020-q14
- eom-final-ug1-2020-q15
- eom-final-ug1-2020-q16
- eom-final-ug1-2020-q17
- eom-final-ug1-2020-q18
- eom-final-ug1-2020-q19
- eom-ug-final1-2024-q01
- eom-ug-final1-2024-q02
- eom-ug-final1-2024-q03
- eom-ug-final1-2024-q04
- eom-ug-final1-2024-q05
- eom-ug-final1-2024-q06
- eom-ug-final1-2024-q07
- eom-ug-final1-2024-q08
- eom-ug-final1-2024-q09
- eom-ug-final1-2024-q10
- eom-ug-final1-2024-q11
- eom-ug-final1-2024-q12
- eom-ug-final1-2024-q13
- eom-ug-final1-2024-q14
- eom-ug-final1-2024-q15
- eom-ug-final1-2024-q16
- eom-ug-final1-2024-q17
- eom-ug-final1-2024-q18
- eom-ug-final1-2024-q19
- eom-ug-final2-2024-q01
- eom-ug-final2-2024-q02
- eom-ug-final2-2024-q03
- eom-ug-final2-2024-q04
- eom-ug-final2-2024-q05
- eom-ug-final2-2024-q06
- eom-ug-final2-2024-q07
- eom-ug-final2-2024-q08
- eom-ug-final2-2024-q09
- eom-ug-final2-2024-q10
- eom-ug-final2-2024-q11
- eom-ug-final2-2024-q12
- eom-ug-final2-2024-q13
- eom-ug-final2-2024-q14
- eom-ug-final2-2024-q15
- eom-ug-final2-2024-q16
- eom-ug-final2-2024-q17
- eom-ug-final2-2024-q18
- eom-ug-final2-2024-q19
- eom-ug-final2-2024-q20
- eom-ug-final2-2024-q21
- eom-ug-final2-2024-q22
- eom-ug-final2-2024-q23
- first-assessment-ug-2024-q01
- first-assessment-ug-2024-q02
- first-assessment-ug-2024-q03
- first-assessment-ug-2024-q04
- first-assessment-ug-2024-q05
- first-assessment-ug-2024-q06
- first-assessment-ug-2024-q07
- first-assessment-ug-2024-q08
- first-assessment-ug-2024-q09
- first-assessment-ug-2024-q10
- first-assessment-ug-2024-q11
- first-assessment-ug-2024-q12
- first-assessment-ug-2024-q13
- first-assessment-ug-2024-q14
- first-assessment-ug-2024-q15
- first-assessment-ug-2024-q16
- first-assessment-ug-2024-q17
- first-assessment-ug-2024-q18
- first-assessment-ug-2024-q19
- first-assessment-ug-2024-q20
- first-assessment-ug-2024-q21
- first-assessment-ug-2024-q23
- first-assessment-ug-2024-q24
- first-assessment-ug-2024-q25
