# 104 CPS — MCQ authoring ledger

Machine-regenerable. Computed by joining every `scripts/kasr/seeds/mcq/104-CPS/*.ts` leaf's `questions[].key` against `scripts/kasr/extract/104-CPS/mcq-bank.json` by key — never by leaf tag, which is known to be unreliable (a row tagged for one leaf can already be claimed by another leaf's seed). Regenerate with `npm run kasr:ledger-104` before dispatching new authoring work; do not hand-edit this file.

## Totals

bank rows: 1289 | keyed: 1114 | unkeyed/OCR-blocked: 175 | authored: 772 | excluded: 173 | remaining: 207

Cross-check against `build-batches.ts "104 CPS"`'s own accounting (its "kept" count excludes live-but-unanswered rows, which this ledger counts as AUTHORED since their key is claimed in a seed either way):

- authored (by key, this ledger): 772
- of those, held back as unanswered (no printed answer, no `answerOverride`) the same way `mcq()` in build-batches.ts does: 0
- authored minus held-back = build-style "kept": 772

## By cluster (leaf tag)

| cluster (leaf tag) | bank rows | authored | excluded | remaining |
|---|---:|---:|---:|---:|
| Lungs — Gross Anatomy | 21 | 0 | 0 | 21 |
| Pulmonary Compliance | 45 | 24 | 3 | 18 |
| Basic Mechanisms of Circulatory Control | 36 | 13 | 6 | 17 |
| Gas exchange in the lung | 21 | 4 | 2 | 15 |
| Chromosomal Aberrations (Abnormalities) | 22 | 9 | 0 | 13 |
| Cardiac Function | 80 | 44 | 24 | 12 |
| Vascular Function | 44 | 27 | 5 | 12 |
| Gas Transport by the Blood | 35 | 23 | 1 | 11 |
| Control of Respiration | 25 | 9 | 6 | 10 |
| Lung Volumes and Capacities | 9 | 0 | 0 | 9 |
| Mechanical Properties of Cardiac Muscle | 42 | 26 | 8 | 8 |
| A-V Connections | 54 | 40 | 7 | 7 |
| Arteries | 62 | 45 | 10 | 7 |
| Conducting Portion | 74 | 60 | 7 | 7 |
| Veins | 36 | 21 | 8 | 7 |
| Cell Division | 42 | 35 | 2 | 5 |
| Thymus | 17 | 7 | 4 | 5 |
| Lymph node | 25 | 17 | 0 | 4 |
| Respiratory Portion | 34 | 28 | 2 | 4 |
| Special Circulation | 5 | 1 | 0 | 4 |
| Macrophage system | 5 | 1 | 1 | 3 |
| Organization of the Respiratory System | 12 | 6 | 3 | 3 |
| Spleen | 27 | 19 | 5 | 3 |
| out-of-module | 1 | 0 | 0 | 1 |
| Tonsils | 18 | 10 | 4 | 1 |
| (untagged) | 219 | 88 | 4 | 0 |
| Alveolar Phagocytes | 4 | 3 | 0 | 0 |
| Electrical Activity of the Heart | 82 | 57 | 25 | 0 |
| Human Chromosome | 48 | 43 | 4 | 0 |
| Mechanics of Breathing | 22 | 18 | 4 | 0 |
| Mediastinum | 41 | 30 | 11 | 0 |
| The Cell Cycle | 5 | 5 | 0 | 0 |
| The heart | 43 | 31 | 12 | 0 |
| Thoracic Wall | 33 | 28 | 5 | 0 |

## Remaining keys by cluster

Every KEYED bank row whose key is not yet claimed by any seed (authored or excluded). A dispatch can copy an exact key list straight out of a section below.

### Lungs — Gross Anatomy (21)

- `03-6-visceral-pleufa-is-innervated-by-the-phrenic-and-the-fo-5369899d` — 03 6 visceral pleufa is innervated by the phrenic and the fower five 1 00 interc…
- `following-statements-regarding-lungs-are-true-except-a8d8c3cf` — Following statements regarding lungs are true, EXCEPT:
- `i-regarding-the-root-of-the-lung-mark-the-incorrect-answer-0-e92f0fa9` — i Regarding the root of the lung; mark the incorrect answer: 00 ْ a- It lie oppo…
- `one-of-the-followings-is-a-main-feature-of-the-right-lung-fe-6a94ad9a` — One of the followings is a main feature of the right lung: febref a It has two l…
- `pleural-reflection-lies-at-which-rib-level-in-the-midclavicu-4742bd47` — Pleural reflection lies at which rib level in the midclavicular line?
- `regarding-bronchopulmonary-segments-which-is-correct-03061e6c` — Regarding bronchopulmonary segments, which is correct?
- `regarding-surface-markings-of-the-lungs-the-following-is-tru-173291e3` — Regarding surface markings of the lungs the following is true:
- `regarding-the-blood-supply-of-the-lungs-mark-one-correct-sta-475d3a78` — Regarding the blood supply of the lungs, mark ONE correct statement:
- `regarding-the-bronchopulmonary-segments-choose-the-correct-s-a03bf8bf` — Regarding the bronchopulmonary segments, choose the correct statement:
- `regarding-the-lungs-all-the-following-statements-are-true-ex-1bfb9298` — Regarding the lungs, all the following statements are true, EXCEPT:
- `regarding-the-lungs-mark-the-wrong-statement-e5cc97b5` — Regarding the lungs, mark the wrong statement: ; :
- `regarding-the-lungs-the-following-statements-are-correct-exc-e8f3c3d0` — Regarding the lungs, the following statements are correct EXCEPT:
- `regarding-the-pleura-all-the-following-statements-are-true-e-1968aabb` — Regarding the pleura, all the following statements are true, EXCEPT:
- `regarding-the-right-lung-all-the-following-statements-are-tr-6f98f439` — Regarding the right lung, all the following statements are true, EXCEPT:
- `regarding-the-root-of-the-lung-all-true-except-5bb8ca0c` — Regarding the root of the lung all true except:
- `regarding-the-root-of-the-lung-one-is-incorrect-ab551b87` — Regarding the root of the lung, one is incorrect:
- `regarding-the-suprapleural-membrane-all-the-following-statem-c8caf1dc` — Regarding the suprapleural membrane, all the following statements are true, EXCE…
- `what-impression-cannot-be-found-on-the-mediastinal-surface-o-630618f3` — What impression cannot be found-on. the mediastinal surface of the right Jung:
- `what-lies-posterior-to-the-right-root-of-the-lung-961e042f` — What lies posterior to the right root of the lung?
- `which-of-the-following-are-the-bronchopulmonary-segments-of-b8d446b1` — Which of the following are the bronchopulmonary segments of the lingula of the l…
- `which-one-of-the-following-structures-leaves-an-impression-o-bc55d0f1` — Which one of the following structures leaves an impression on the mediastinal su…

### Pulmonary Compliance (18)

- `among-the-functions-of-surfactant-c9e14838` — Among the functions of surfactant:
- `an-infant-born-prematurely-in-gestational-week-25-has-neonat-f5ecfb0b` — An infant born prematurely in gestational week 25 has neonatal respiratory linc;…
- `concerning-compliance-of-large-arterial-blood-vessels-one-is-9eea479c` — Concerning compliance of large arterial blood vessels, one is true:
- `concerning-compliance-of-the-stomach-one-is-true-ec247c63` — Concerning compliance of the stomach, one is true:
- `if-the-lungs-experimentally-filled-completely-with-saline-so-4d4a1047` — If the lungs experimentally filled completely with saline, so the surface tensio…
- `normal-value-of-lung-compliance-is-about-b1eb2ab0` — Normal value of lung‘ compliance is about....:
- `regarding-transpulmonary-pressure-all-is-correct-except-eb323f99` — Regarding transpulmonary pressure all is correct, except:
- `the-recoil-tendency-of-the-lungs-b4d2cfea` — The recoil tendency of the lungs:
- `the-resistance-of-the-lungs-to-inflation-is-increase-by-ee943cea` — The resistance of the lungs to inflation is increase by:
- `which-disease-increase-lung-compliance-a-emphysema-572250fc` — Which disease increase lung compliance: ‏ظ‎ ‎a- Emphysema
- `which-disorder-decreases-the-chest-compliance-a178c097` — Which disorder decreases the chest compliance:
- `which-of-the-following-is-correct-regarding-type-il-pneumocy-1e2dfdfa` — Which of the following is correct regarding type Il pneumocytes?
- `which-of-the-following-is-not-true-concerning-respiratory-di-1e77d3bd` — Which of the following is NOT true concerning respiratory distress syndrome in p…
- `which-of-the-following-is-not-true-concerning-respiratory-di-95a783aa` — Which of the following is NOT true concerning respiratory distress sy ndrome in …
- `which-of-the-following-is-not-true-concerning-respiratory-di-a84e357a` — Which of the following is NOT true concerning respiratory distress = syndrome in…
- `which-of-the-following-represents-the-pressure-difference-th-3a447d91` — Which of the following represents the pressure difference that acts to distend t…
- `which-of-tne-following-represents-the-pressure-difference-th-8e096a02` — Which of tne following represents the pressure difference that acts to distend t…
- `which-one-can-increase-the-compliance-of-blood-vessels-3a01102d` — Which one can increase the compliance of blood vessels

### Basic Mechanisms of Circulatory Control (17)

- `a-decrease-in-which-would-cause-chronic-hypertension-f762e6fe` — A decrease in which would cause chronic hypertension
- `about-mediators-and-vasoactive-substances-all-of-the-followi-ac96f885` — About mediators and vasoactive substances, all of the following are true Except:
- `all-about-renin-angiotensin-system-is-correct-except-28636919` — All about renin-angiotensin system is correct, except:
- `as-regard-carotid-sinus-syndrome-all-of-the-following-is-cor-11f1b928` — As regard carotid sinus syndrome all of the following is correct except;
- `concerning-nitric-oxide-no-the-following-are-true-except-a9c985aa` — Concerning nitric oxide NO, the following are true, except
- `epistaxis-mean-6a48dc85` — Epistaxis mean:
- `it-is-correct-to-say-8f7e9d38` — It is correct to say
- `it-the-noradrenergic-nerves-to-the-heart-are-stimulated-afte-65f9cb1e` — It the noradrenergic nerves to the heart are stimulated after giving a B-blocker…
- `long-term-regulation-of-arterial-blood-pressure-is-done-by-4e2ec8e0` — Long term regulation of arterial blood pressure is done by
- `mean-systemic-filling-pressure-is-decreased-by-d3f1a38e` — Mean systemic filling pressure is decreased by:
- `nitric-oxide-25204420` — Nitric oxide
- `renhin-is-released-in-the-following-conditions-except-1690beb3` — Renhin is released in the following conditions, except
- `stimalation-of-angiotensin-ii-receptors-at1-produce-all-exce-7cf8d5ad` — Stimalation of angiotensin II receptors AT1 produce all, except
- `stimulation-of-angiotensin-ii-receptors-at-2-produce-a2994df9` — Stimulation of angiotensin II receptors AT-2 produce:
- `systemic-arteriolar-constriction-may-result-from-an-increase-fdd3c641` — Systemic arteriolar constriction may result from an increase in local concentrat…
- `the-following-are-true-regarding-no-except-870b8ec2` — The following are true, regarding NO, except
- `which-of-the-following-is-not-a-vasodilator-metabolite-8da91769` — Which of the following is not a vasodilator metabolite?

### Gas exchange in the lung (15)

- `a-49-year-old-man-has-a-pulmonary-embolism-that-completely-b-5ba07ffa` — A 49-year-old man has a pulmonary embolism that completely blocks blood flow to …
- `all-about-diffusion-of-o2-across-a-membrane-is-correct-excep-e804fcae` — All about diffusion of O2 across a membrane is correct, except:
- `all-about-ventilation-and-perfusion-of-different-regions-of-be381b3b` — All about ventilation and perfusion of different regions of the lung is correct,…
- `av-shunt-include-the-following-except-99b84173` — Av shunt include the following except
- `compared-with-the-apex-of-the-lung-the-base-of-the-lung-has-bcf708af` — Compared with the apex of the lung, the base of the lung has 3
- `compared-with-the-base-of-the-lung-in-a-person-who-is-standi-ccaa8882` — Compared with the base of the lung, in a person who is standing, the apex of the…
- `concerning-distribution-of-ventilation-and-perfusion-cf1c1193` — Concerning distribution of ventilation and perfusion:
- `lung-emphysema-decreases-the-pulmonary-diffusing-capacity-fo-ead15150` — Lung emphysema decreases the pulmonary diffusing capacity for gases due to:
- `the-alveoli-at-the-top-of-the-lungs-differ-from-those-at-the-1a0a9d30` — The alveoli at the top of the lungs differ from those at the bottom in:
- `ventilation-perfusion-v4-q-ratio-a45d5f6c` — Ventilation/perfusion (V4/Q) ratio: : :
- `when-a-person-is-standing-blood-flow-in-the-lungs-is-d559a19e` — When a person is standing, blood flow in the lungs is
- `which-of-following-conditions-would-limit-the-diffusion-of-o-63690754` — Which of following conditions would limit the diffusion of O; from alveoli to pu…
- `which-of-the-following-conditions-would-limit-the-diffusion-199d5c2b` — Which of the following conditions would limit the diffusion of O, from alveoli t…
- `which-person-would-be-expected-to-have-the-largest-alveolar-7d341e19` — Which person would be expected to have the largest Alveolar PO2-arterial PO2 gra…
- `with-respect-to-gas-exchange-across-the-alveolar-membrane-e168f662` — With respect to gas exchange across the alveolar membrane:

### Chromosomal Aberrations (Abnormalities) (13)

- `a-patient-was-diagnosed-as-having-chronic-myeloid-leukemia-h-e370e170` — A patient was diagnosed as having chronic myeloid leukemia. His | condition migh…
- `a-swab-from-the-buccal-mucosa-of-a-newly-born-infant-showed-ed97054a` — A swab from the buccal mucosa of a newly born infant showed more | than one Barr…
- `achild-presented-with-mental-retardation-muscular-hypotonia-7cd5aa87` — Achild presented with mental retardation, muscular hypotonia, cardiac abnormalit…
- `all-characters-of-trisomy-except-c611b9d6` — All characters of trisomy except
- `cause-non-disjunction-cacb3a17` — Cause non-disjunction
- `down-syndrome-mongolism-is-characterized-by-a-it-is-a-form-o-449c5e95` — Down syndrome (mongolism) is characterized by: ‏ظ‎ ‎| a. It is a form of triploi…
- `ifa-parent-is-a-carrier-of-a-chromosome-21-translocation-he-2f86d27d` — Ifa parent is a carrier of a chromosome 21 translocation, he might have a child …
- `it-is-absent-in-klinefelter-syndrome-9-addition-of-a-fragmen-4f0b50c3` — It is absent in Klinefelter syndrome | 9- Addition of a fragmented segment of on…
- `may-be-due-to-47-chromosomes-xxy-15-structural-aberrations-i-304914be` — May be due to 47 chromosomes (XXY). 15, Structural aberrations include:
- `monosomy-of-sex-chromosome-is-4dd33dcd` — Monosomy of sex chromosome is: |
- `philadelphia-chromosome-6245c1ec` — Philadelphia chromosome:
- `structural-aberrations-include-9c106da4` — Structural aberrations include:
- `trisomy-of-chromosome-x-is-d0d549ba` — Trisomy of chromosome X is:

### Cardiac Function (12)

- `cardiac-output-is-17967bd3` — Cardiac output is: |
- `diacrotic-notch-is-due-to-e9c90ebf` — Diacrotic notch is due to: |
- `during-the-reduced-ejection-phase-which-one-of-the-following-a7159cd9` — During the reduced ejection phase, which one of the following is true:
- `if-the-edv-is-increased-within-limits-1a718833` — If the EDV is increased (within limits):
- `if-the-edv-is-increased-within-limits-which-of-the-following-e4707b02` — If the EDV is increased (within limits), which of the following will occur?
- `systolic-pressure-in-right-ventricle-is-84464eed` — Systolic pressure in right ventricle is:
- `the-atrial-component-of-ventricular-filling-is-46a00baf` — The atrial component of ventricular filling is
- `the-left-ventricle-has-a-thicker-wall-than-the-right-ventric-466aa2d9` — The left ventricle has a thicker wall than the right ventricle because a, itis r…
- `the-strength-of-contraction-of-left-ventricular-muscle-incre-09963bab` — The strength of contraction of left ventricular muscle increases when : |
- `the-systolic-pressure-in-the-left-ventricle-is-c234e41a` — The systolic pressure in the left ventricle is:
- `the-work-performed-by-left-ventricle-is-greater-than-that-pe-eec8e8ca` — The work performed by left ventricle is greater than that performed by right ven…
- `what-s-the-correct-definition-of-cardiac-output-f23eae83` — What's the correct definition of cardiac output?

### Vascular Function (12)

- `as-the-blood-passes-along-the-tissues-332a11e2` — As the blood passes along the tissues:
- `atrial-natriuretic-peptide-6fd6b3d3` — Atrial natriuretic peptide
- `c-wave-in-jugular-venous-pulse-occurs-in-99804bb7` — C wave in jugular venous pulse occurs in:
- `concerning-laminar-blood-flow-one-is-incorrect-eb00a7cf` — Concerning laminar blood flow, one is incorrect:
- `is-non-membranous-cartwheel-like-derived-from-glycocalyx-9fb74d62` — is non-membranous Cartwheel-like, derived from glycocalyx
- `the-capillaries-which-are-present-in-the-nervous-tissue-are-28dee5ce` — The capillaries which are present in the nervous tissue are:
- `turbulence-is-almost-always-present-when-reynolds-number-is-afc8cefe` — Turbulence is almost always present when Reynolds number is more than:
- `which-combination-of-the-following-local-factors-leads-to-ar-c8779f94` — Which combination of the following local factors leads to arteriolar vasodilatat…
- `which-of-the-following-changes-would-not-occur-following-inh-ff65be24` — Which of the following changes would not occur following inhibition of angiotens…
- `which-of-the-following-describes-the-pulse-pressure-212b2ae7` — Which of the following describes the pulse pressure?
- `y-wave-in-jugular-venous-pulse-occurs-in-1-e831e3a0` — Y wave in jugular venous pulse occurs in: 1
- `y-wave-in-jugular-venous-pulse-occurs-in-5dec9a19` — Y wave in jugular venous pulse occurs in:

### Gas Transport by the Blood (11)

- `about-70-of-the-carbon-dioxide-is-transported-to-the-lungs-1-5ecaaa90` — About 70% of the carbon dioxide is transported to the lungs: 1 ‏ا‎
- `all-about-hemoglobin-is-rue-except-d59e6077` — All about hemoglobin is (rue, except:
- `during-the-release-of-carbon-dioxide-in-the-lungs-ba73316c` — During the release of carbon dioxide in the lungs:
- `how-much-oxygen-is-normally-carried-in-the-blood-a1f343e8` — How much oxygen is normally carried in the blood?
- `in-the-transport-of-co2-from-the-tissues-to-the-lungs-which-b9c9fd6b` — In the transport of CO2 from the tissues to the lungs, which of the following oc…
- `ph-of-venous-blood-is-only-slightly-more-acidic-than-ph-of-a-93c10913` — pH of venous blood is only slightly more acidic than pH of arterial blood becaus…
- `select-the-correct-statement-about-o-transport-in-the-blood-c34350a2` — Select the correct statement about O, transport in the blood: 12 0 ‏خ146ا1ا1ا[| …
- `the-largest-amount-of-co-is-transported-by-the-blood-as-691eba1c` — The largest amount of CO; is transported by the blood as:
- `the-oxygen-hemoglobin-dissociation-curve-will-shift-to-the-r-6cda5909` — The oxygen-hemoglobin dissociation curve will shift to the right with:
- `the-oxyhemoglobin-dissociation-curve-fa89718b` — The oxyhemoglobin dissociation curve:
- `which-statement-about-hemoglobin-is-incorrect-e6822bc0` — Which statement about hemoglobin is Incorrect?

### Control of Respiration (10)

- `immediate-stoppage-of-respiration-can-be-caused-by-transecti-82f47191` — Immediate stoppage of respiration can be caused by transection:
- `in-normal-individual-respiration-is-regulated-by-all-except-7e8ddaae` — In normal individual respiration is regulated by all except:
- `medullary-inspiratory-neurons-are-stimulated-by-370da678` — Medullary inspiratory neurons are stimulated by:
- `spontaneous-respiration-ceases-after-7ab1a72f` — Spontaneous respiration ceases after:
- `the-carotid-and-aortic-bodies-increase-their-rate-of-dischar-32d0556f` — The carotid and aortic bodies increase their rate of discharge in response to:
- `transection-between-medulla-oblongata-and-upper-border-of-sp-d728ec2a` — Transection between medulla oblongata and upper border of spinal cord causes:
- `which-of-the-following-conditions-causes-hypoventilation-6ee07624` — Which of the following conditions causes hypoventilation?
- `which-of-the-following-discharge-spontaneously-during-quiet-b30226e7` — Which of the following discharge spontaneously during quiet breathing? ‏ا‎ ‎a- S…
- `which-of-the-following-discharge-spontaneously-during-quist-89974900` — Which of the following discharge spontaneously during quist breathing?
- `which-of-the-following-discharges-spontaneously-during-quiet-20ea9248` — Which of the following discharges spontaneously during quiet breathing?

### Lung Volumes and Capacities (9)

- `a-72-kg-woman-would-have-approximately-how-much-dead-space-i-055268e0` — A 72 kg woman would have approximately how much dead space in her lungs?
- `how-do-you-calculate-how-much-inspired-air-actually-ventilat-91ab164f` — How do you calculate how much inspired air actually ventilates the alveoli durin…
- `the-residual-volume-37dc4b1c` — The residual volume: :
- `tidal-volume-is-air-66461af4` — Tidal volume is air:
- `vital-capacity-e6eee7c9` — Vital capacity:
- `vital-capacity-is-reduced-by-all-except-75ee187f` — Vital capacity is reduced by all except:
- `which-of-the-following-concerning-average-lung-volumes-and-c-ade8fafa` — Which of the following concerning average lung volumes and capacities of a perso…
- `which-one-of-the-following-components-of-a-pulmonary-functio-1aeacf86` — Which one of the following components of a pulmonary function test will be norma…
- `which-volume-remains-in-the-lungs-after-a-maximal-expiration-1d4cbfd2` — Which volume remains in the lungs after a maximal expiration?

### Mechanical Properties of Cardiac Muscle (8)

- `all-characters-of-cardiac-sarcoplasm-except-xxx-73ce223b` — All characters of cardiac sarcoplasm except: XXX
- `increase-with-age-forming-brown-atrophy-of-heart-xxx-dc8cd7ee` — increase with age forming brown atrophy of heart XXX
- `the-low-resistance-pathways-between-myocardial-cells-that-al-a0d4998c` — The low-resistance pathways between myocardial cells that allow for the spread o…
- `the-plasticity-of-the-urinary-bladder-is-explained-by-8bf89a19` — The plasticity of the urinary bladder is explained by:
- `the-poiseuille-law-is-concerned-with-which-of-the-following-501dd5db` — The Poiseuille law is concerned with which of the following factors:
- `which-of-the-following-events-of-cardiac-myocyte-action-pote-3a3be2b8` — Which of the following events of cardiac myocyte action potential is correctly d…
- `which-of-the-following-is-correct-as-regards-na-ca-exchanger-e0bfc7af` — Which of the following is correct as regards Na+ - Ca++ exchanger?
- `which-of-the-following-maintain-the-ionic-concentrations-acr-20b74fb5` — Which of the following maintain the ionic concentrations across the sarcolemma o…

### A-V Connections (7)

- `during-anaphylactic-shock-release-of-which-substance-causes-87214129` — During anaphylactic shock, release of which substance causes vasodilation and in…
- `that-capillaries-can-withstand-high-internal-pressures-witho-57d4fc14` — That capillaries can withstand high internal pressures without bursting is expla…
- `the-capillaries-can-withstand-high-internal-pressure-without-75f7a208` — The capillaries can withstand high internal pressure without bursting is explain…
- `the-highest-pressure-inside-a-blood-vessel-is-present-in-a-p-cd85f021` — The highest pressure inside a blood vessel is present in: a Pulmonary vessels
- `thin-walled-capillaries-donot-burst-when-intracapillary-pres-286420f9` — Thin walled capillaries donot burst. when intracapillary pressure is increased w…
- `what-fraction-of-total-blood-volume-is-present-in-the-capill-f9b7cdfa` — What fraction of total blood volume is present in the capillaries at any given t…
- `which-of-the-following-is-characteristic-of-progressive-refr-ce2af6fc` — Which of the following is characteristic of progressive (refractory) hemorrhagic…

### Arteries (7)

- `all-characters-of-coronary-artery-except-8aa6bb03` — All characters of Coronary artery except
- `all-characters-of-t-intima-of-aorta-except-63c4ce7b` — All characters of T. intima of aorta except:
- `specialized-types-of-medium-sized-artery-include-the-followi-82300128` — Specialized types of medium sized artery include the following:
- `stimulation-of-arterial-baroreceptors-causes-all-except-aafa1ea1` — Stimulation of arterial baroreceptors causes all, Except:
- `stimulation-of-atrial-stretch-receptors-produce-ecf90d1b` — Stimulation of atrial stretch receptors produce
- `the-tunica-intima-of-coronary-artery-contains-8521e782` — The tunica intima of coronary artery contains:
- `under-normal-conditions-the-capillaries-95f54ee9` — Under normal conditions , the capillaries :

### Conducting Portion (7)

- `all-characters-of-extra-pulmonary-bronchi-except-5edbbc7f` — All characters of extra pulmonary bronchi except:
- `epithelium-of-trachea-lined-by-9cded545` — epithelium of trachea lined by
- `intrapulmonary-bronchus-has-tepret-epithelial-lining-with-no-a0257a5b` — Intrapulmonary bronchus has: tePret ‏-م‎ Epithelial lining with no goblet celis
- `prevent-over-distension-in-trachea-3478dfd1` — prevent over distension in trachea
- `the-glandular-epithelium-of-the-trachea-exists-in-08025378` — The glandular epithelium of the trachea exists in:
- `trachea-is-characterized-by-all-except-529d75ca` — trachea is characterized by All except
- `venous-plexuses-swell-bodies-is-present-in-c13eea5d` — venous plexuses (swell bodies) is present in

### Veins (7)

- `choose-the-correct-statement-concerning-the-lymphatic-vessel-9d893940` — Choose the correct statement concerning the lymphatic vessels:
- `greatest-total-cross-sectional-area-a-aorta-1242be79` — Greatest total cross sectional area | a, Aorta |
- `in-progressive-hemorrhagic-shock-which-of-the-following-occu-649d7c04` — In progressive hemorrhagic shock, which of the following occurs? ~~’
- `less-developed-spirally-arranged-smooth-muscles-are-a-featur-adbb9056` — Less developed spirally arranged smooth muscles are a feature of:
- `longitudinal-smooth-muscle-fibers-are-present-in-adventitia-abc2ab0d` — Longitudinal smooth muscle fibers are present in adventitia of:
- `regarding-brachiocephalic-veins-one-of-the-following-stateme-8aac4731` — Regarding brachiocephalic veins, one of the following statements is incorrect: ١
- `surface-receive-lymph-from-afferent-vessel-while-surface-whe-cfcfeed1` — surface receive lymph from afferent vessel, while ……… surface where vein, effere…

### Cell Division (5)

- `apoptosis-is-characterized-by-the-following-d02e77f3` — Apoptosis is characterized by the following:
- `cannot-divide-but-replaced-from-stem-cell-such-as-blood-cell-142667f7` — Cannot divide but replaced from stem cell such as blood cells
- `concerning-apoptosis-25140e67` — Concerning apoptosis: |
- `non-renewing-cells-are-characterized-by-all-the-following-ex-5836a5c6` — Non renewing cells are characterized by All the following except
- `one-of-the-following-is-a-potentially-renewable-cell-04f21553` — One of the following is a potentially renewable cell:

### Thymus (5)

- `concerning-thymus-gland-the-nursing-cells-are-3e67d3a8` — Concerning thymus gland, the nursing cells are:
- `outer-part-of-thymus-cortex-contain-while-inner-part-contain-e2cc156d` — outer part of thymus cortex Contain - - - - while inner part contain
- `regarding-thymus-gland-it-is-i-16460019` — Regarding thymus gland, It is: i
- `where-do-t-lymphocytes-acquire-their-immunocompetence-7eafb30a` — Where do T-lymphocytes acquire their immunocompetence?
- `which-of-the-following-is-considered-a-central-lymphatic-org-81ba1e71` — Which of the following is considered a central lymphatic organ:

### Lymph node (4)

- `all-of-the-following-help-drainage-of-lymph-except-6cd27447` — All of the following help drainage of lymph Except:
- `all-secondary-lymphatic-ergons-except-402b68d3` — All secondary lymphatic ergons except
- `reticular-ct-can-be-stained-by-50c0381c` — reticular CT can be stained by
- `which-two-of-the-following-are-necessary-to-stimulate-b-lymp-0b3fa792` — Which two of the following are necessary to stimulate B- Lymphocyte to divide an…

### Respiratory Portion (4)

- `fetal-lung-is-characterized-by-fd1480a7` — fetal lung is characterized by:
- `fetal-lung-is-similar-to-gland-in-3e898cac` — fetal lung is similar to gland in
- `support-lung-tissue-prevent-over-expansion-684cc6bf` — support lung tissue, prevent over-expansion
- `what-type-of-tissue-forms-the-alveoli-in-the-lung-44df5f2e` — What type of tissue forms the alveoli in the lung?

### Special Circulation (4)

- `all-of-the-following-cause-pulmonary-vasoconstriction-except-44323c47` — All of the following cause pulmonary vasoconstriction Except:
- `pulmonary-vascular-resistance-f5ca3914` — Pulmonary vascular resistance
- `the-coronary-blood-flow-0e0b7a15` — The coronary blood flow:
- `which-one-of-the-following-is-the-correct-statement-regardin-c5bde64a` — Which one of the following is the correct statement regarding coronary food flow…

### Macrophage system (3)

- `liver-cells-is-example-for-18d16db7` — liver cells is example for
- `monocyte-in-while-macrophage-in-ac70f5eb` — monocyte in ………., while macrophage in ……………
- `vonkupffer-cell-in-while-langerhan-s-cell-in-a4a2289a` — Vonkupffer cell in ………………., while langerhan's Cell in ……………

### Organization of the Respiratory System (3)

- `bronchoconstriction-is-produced-by-cea9ca3b` — Bronchoconstriction is produced by:
- `concerning-the-olfactory-epithelium-9305cebb` — Concerning the olfactory epithelium:
- `which-of-the-following-are-functions-of-components-of-the-re-4b944d7a` — Which of the following are functions of components of the respiratory system?

### Spleen (3)

- `irregular-barrel-shape-that-lined-by-fenestrated-cells-non-c-43d8f714` — ……..... irregular barrel shape that lined by fenestrated cells, non Contineuos b…
- `the-lymphatic-organ-containing-littoral-macrophage-cells-is-00df2662` — The lymphatic organ containing Littoral macrophage cells is: |
- `trabeculae-divide-spleen-into-024bb379` — trabeculae divide spleen into

### out-of-module (1)

- `which-of-the-following-characteristic-are-helpful-in-differe-90dd02ea` — Which of the following characteristic are helpful in differentiating between cer…

### Tonsils (1)

- `is-aggregation-of-lymph-tissue-with-incomplete-capsule-498c1c81` — is aggregation of lymph tissue with incomplete capsule

## Unkeyed (needs cleaner scans)

175 bank row(s) have no printed/recovered answer at all (`answerConfidence: "none"`). Of those, 137 are still untouched — neither authored (no `answerOverride` on file) nor excluded — and are not counted in "remaining" above because there is no establishable answer to author against yet. They need a cleaner scan, a solved-book match, or an editorial ruling before they can be dispatched.

