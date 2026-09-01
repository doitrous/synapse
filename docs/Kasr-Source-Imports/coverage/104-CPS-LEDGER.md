# 104 CPS — MCQ authoring ledger

Machine-regenerable. Computed by joining every `scripts/kasr/seeds/mcq/104-CPS/*.ts` leaf's `questions[].key` against `scripts/kasr/extract/104-CPS/mcq-bank.json` by key — never by leaf tag, which is known to be unreliable (a row tagged for one leaf can already be claimed by another leaf's seed). Regenerate with `npm run kasr:ledger-104` before dispatching new authoring work; do not hand-edit this file.

## Totals

bank rows: 1289 | keyed: 1114 | unkeyed/OCR-blocked: 175 | authored: 591 | excluded: 130 | remaining: 431

Cross-check against `build-batches.ts "104 CPS"`'s own accounting (its "kept" count excludes live-but-unanswered rows, which this ledger counts as AUTHORED since their key is claimed in a seed either way):

- authored (by key, this ledger): 591
- of those, held back as unanswered (no printed answer, no `answerOverride`) the same way `mcq()` in build-batches.ts does: 0
- authored minus held-back = build-style "kept": 591

## By cluster (leaf tag)

| cluster (leaf tag) | bank rows | authored | excluded | remaining |
|---|---:|---:|---:|---:|
| (untagged) | 548 | 88 | 4 | 329 |
| Gas Transport by the Blood | 24 | 0 | 0 | 24 |
| Lymph node | 21 | 0 | 0 | 17 |
| Tonsils | 17 | 0 | 0 | 14 |
| Chromosomal Aberrations (Abnormalities) | 22 | 9 | 0 | 13 |
| A-V Connections | 54 | 40 | 7 | 7 |
| Basic Mechanisms of Circulatory Control | 18 | 8 | 4 | 6 |
| Veins | 34 | 21 | 8 | 5 |
| Arteries | 58 | 45 | 10 | 3 |
| Pulmonary Compliance | 30 | 24 | 3 | 3 |
| Vascular Function | 35 | 27 | 5 | 3 |
| Gas exchange in the lung | 8 | 4 | 2 | 2 |
| Mechanical Properties of Cardiac Muscle | 36 | 26 | 8 | 2 |
| Spleen | 26 | 19 | 5 | 2 |
| The heart | 13 | 10 | 2 | 1 |
| Alveolar Phagocytes | 4 | 3 | 0 | 0 |
| Cardiac Function | 68 | 44 | 24 | 0 |
| Cell Division | 37 | 35 | 2 | 0 |
| Conducting Portion | 67 | 60 | 7 | 0 |
| Control of Respiration | 15 | 9 | 6 | 0 |
| Electrical Activity of the Heart | 47 | 28 | 19 | 0 |
| Human Chromosome | 48 | 43 | 4 | 0 |
| Macrophage system | 2 | 1 | 1 | 0 |
| Organization of the Respiratory System | 9 | 6 | 3 | 0 |
| Respiratory Portion | 30 | 28 | 2 | 0 |
| Special Circulation | 1 | 1 | 0 | 0 |
| The Cell Cycle | 5 | 5 | 0 | 0 |
| Thymus | 12 | 7 | 4 | 0 |

## Remaining keys by cluster

Every KEYED bank row whose key is not yet claimed by any seed (authored or excluded). A dispatch can copy an exact key list straight out of a section below.

### (untagged) (329)

- `03-6-visceral-pleufa-is-innervated-by-the-phrenic-and-the-fo-5369899d` — 03 6 visceral pleufa is innervated by the phrenic and the fower five 1 00 interc…
- `a-49-year-old-man-has-a-pulmonary-embolism-that-completely-b-5ba07ffa` — A 49-year-old man has a pulmonary embolism that completely blocks blood flow to …
- `a-72-kg-woman-would-have-approximately-how-much-dead-space-i-055268e0` — A 72 kg woman would have approximately how much dead space in her lungs?
- `a-decrease-in-carotid-sinus-pressure-from-100-mmhg-to-70-mml-6e408561` — A decrease in carotid sinus pressure from 100 mmHg to 70 mmlIlg will lead to
- `a-decrease-in-which-would-cause-chronic-hypertension-f762e6fe` — A decrease in which would cause chronic hypertension
- `a-healthy-45-year-old-man-is-reading-the-newspaper-which-of-39a53f44` — A healthy, 45-year-old man is reading the newspaper. Which of the following musc…
- `about-70-of-the-carbon-dioxide-is-transported-to-the-lungs-1-5ecaaa90` — About 70% of the carbon dioxide is transported to the lungs: 1 ‏ا‎
- `about-the-cardiac-conductivity-all-the-following-are-true-ex-6c3fa236` — About the cardiac conductivity, all the following are true except :
- `about-the-purkinje-tissue-all-the-following-are-true-except-a1365424` — About the purkinje tissue,all the following are true except :
- `all-about-diffusion-of-o2-across-a-membrane-is-correct-excep-e804fcae` — All about diffusion of O2 across a membrane is correct, except:
- `all-about-hemoglobin-is-rue-except-d59e6077` — All about hemoglobin is (rue, except:
- `all-about-renin-angiotensin-system-is-correct-except-28636919` — All about renin-angiotensin system is correct, except:
- `all-about-ventilation-and-perfusion-of-different-regions-of-be381b3b` — All about ventilation and perfusion of different regions of the lung is correct,…
- `all-characters-of-cardiac-sarcoplasm-except-xxx-73ce223b` — All characters of cardiac sarcoplasm except: XXX
- `all-characters-of-coronary-artery-except-8aa6bb03` — All characters of Coronary artery except
- `all-characters-of-extra-pulmonary-bronchi-except-5edbbc7f` — All characters of extra pulmonary bronchi except:
- `all-characters-of-t-intima-of-aorta-except-63c4ce7b` — All characters of T. intima of aorta except:
- `all-of-following-are-branches-of-descending-thoracic-aorta-e-59eb3cb8` — All of following are branches of descending thoracic aorta EXCEPT:
- `all-of-the-following-cause-pulmonary-vasoconstriction-except-44323c47` — All of the following cause pulmonary vasoconstriction Except:
- `all-of-the-following-help-drainage-of-lymph-except-6cd27447` — All of the following help drainage of lymph Except:
- `all-secondary-lymphatic-ergons-except-402b68d3` — All secondary lymphatic ergons except
- `all-the-following-are-correct-except-bbd77f2f` — All the following are correct except :
- `among-the-followings-the-most-superficial-structure-in-the-s-103cf442` — Among the followings the most superficial structure in the superior mediastinum …
- `among-the-functions-of-surfactant-c9e14838` — Among the functions of surfactant:
- `an-infant-born-prematurely-in-gestational-week-25-has-neonat-f5ecfb0b` — An infant born prematurely in gestational week 25 has neonatal respiratory linc;…
- `anterior-media-stinum-space-mark-the-unacceptable-statement-78c36e40` — Anterior media stinum Space, mark the unacceptable statement:
- `apoptosis-is-characterized-by-the-following-d02e77f3` — Apoptosis is characterized by the following:
- `as-regard-carotid-sinus-syndrome-all-of-the-following-is-cor-11f1b928` — As regard carotid sinus syndrome all of the following is correct except;
- `as-the-blood-passes-along-the-tissues-332a11e2` — As the blood passes along the tissues:
- `at-the-level-of-the-sternal-angle-the-following-features-are-835ef4ab` — At the level of the sternal angle the following features are present, EXCEPT:
- `at-the-sternal-angle-one-is-wrong-909d35f4` — At the sternal angle, one is wrong:
- `at-what-level-does-the-trachea-divides-into-the-main-bronchi-bd18e810` — At what level does the trachea divides into the main bronchi? ‏عم‎ At the level …
- `at-which-of-the-following-levels-does-the-base-of-the-heart-3ba1e7d4` — At which of the following levels does the base of the heart lie? ‏كهيعمر‎ ‎a- T2…
- `blood-flows-into-the-coronary-arteries-arises-from-the-20f83d05` — Blood flows into the coronary arteries arises from the:
- `bronchoconstriction-is-produced-by-cea9ca3b` — Bronchoconstriction is produced by:
- `buffer-nerves-are-branches-of-6e5be01a` — Buffer nerves are branches of; |
- `c-wave-in-jugular-venous-pulse-occurs-in-99804bb7` — C wave in jugular venous pulse occurs in:
- `cannot-divide-but-replaced-from-stem-cell-such-as-blood-cell-142667f7` — Cannot divide but replaced from stem cell such as blood cells
- `cardiac-output-is-17967bd3` — Cardiac output is: |
- `cells-in-the-sa-node-d8679a3c` — Cells in the SA node
- `compared-with-the-apex-of-the-lung-the-base-of-the-lung-has-bcf708af` — Compared with the apex of the lung, the base of the lung has 3
- `compared-with-the-base-of-the-lung-in-a-person-who-is-standi-ccaa8882` — Compared with the base of the lung, in a person who is standing, the apex of the…
- `concerning-apoptosis-25140e67` — Concerning apoptosis: |
- `concerning-distribution-of-ventilation-and-perfusion-cf1c1193` — Concerning distribution of ventilation and perfusion:
- `concerning-laminar-blood-flow-one-is-incorrect-eb00a7cf` — Concerning laminar blood flow, one is incorrect:
- `concerning-nitric-oxide-no-the-following-are-true-except-a9c985aa` — Concerning nitric oxide NO, the following are true, except
- `concerning-respiration-a-expiratory-muscles-act-during-norma-6bd951ba` — Concerning respiration: : a, expiratory muscles act during normal expiration
- `concerning-the-azygos-vein-choose-the-false-answer-8fa1ebff` — Concerning the azygos vein, choose the false answer:
- `concerning-the-external-intercostal-muscle-choose-the-incorr-7f6cb920` — ١ Concerning the external intercostal muscle; choose the incorrect answer:
- `concerning-the-intercostal-and-subcostal-arteries-which-of-t-24b9b038` — Concerning the intercostal and subcostal arteries, which of the following is tru…
- `concerning-the-intercostal-nerves-select-the-false-statement-c001aebb` — Concerning the intercostal nerves, select the false statement:
- `concerning-the-internal-thoracic-artery-select-correct-answe-749f950e` — Concerning the internal thoracic artery, select correct answer:
- `concerning-the-left-ventricle-select-the-incorrect-statement-6dc70dc8` — Concerning the left ventricle, select the incorrect statement:
- `concerning-the-oesophagus-all-true-except-135051ac` — Concerning the oesophagus all true EXCEPT:
- `concerning-the-olfactory-epithelium-9305cebb` — Concerning the olfactory epithelium:
- `concerning-the-posterior-intercostal-arteries-select-the-cor-80aa271c` — Concerning the posterior intercostal arteries, select the correct answer:
- `concerning-the-typical-intercostal-nerves-select-the-correct-c3dcf961` — Concerning the typical intercostal nerves, select the correct statement:
- `concerning-thymus-gland-the-nursing-cells-are-3e67d3a8` — Concerning thymus gland, the nursing cells are:
- `conduction-speed-is-highest-in-the-bc0dd1e9` — Conduction speed is highest in the:
- `conduction-speed-is-slowest-in-the-99b22b7b` — Conduction speed is slowest in the:
- `conduction-speed-is-slowest-in-the-tepret-abe02b6a` — Conduction speed is slowest in the: tePret
- `diacrotic-notch-is-due-to-e9c90ebf` — Diacrotic notch is due to: |
- `during-forced-expiration-f768b49b` — During forced expiration:
- `during-inspiration-there-is-29880fe3` — During inspiration there is: . :
- `during-quiet-inspiration-ipp-equals-a-1mmug-003c6ae3` — During quiet inspiration, IPP equals: a-- 1mmug
- `during-the-heart-development-the-left-horn-of-the-sinus-veno-a2954fc5` — During the heart development, the left horn of the sinus venosus becomes smaller…
- `during-the-heart-development-the-left-horn-of-the-sinus-veno-fb6e29c0` — During the heart development, the left horn of the sinus venosus becomes smaller…
- `during-the-reduced-ejection-phase-which-one-of-the-following-a7159cd9` — During the reduced ejection phase, which one of the following is true:
- `during-the-release-of-carbon-dioxide-in-the-lungs-ba73316c` — During the release of carbon dioxide in the lungs:
- `einthoven-s-triangle-is-an-equilateral-triangle-the-sides-of-a74c2de5` — Einthoven’s triangle is an equilateral triangle, the sides of which represent:
- `eleventh-1-regarding-the-external-intercostal-muscle-indicat-9a181d08` — Eleventh. 1 @)-Regarding the external - intercostal: muscle; indicate the wrong:…
- `epithelium-of-trachea-lined-by-9cded545` — epithelium of trachea lined by
- `external-intercostal-muscle-select-the-correct-statement-501f3257` — External intercostal muscle, select the correct statement:
- `fetal-lung-is-characterized-by-fd1480a7` — fetal lung is characterized by:
- `fetal-lung-is-similar-to-gland-in-3e898cac` — fetal lung is similar to gland in
- `following-statements-regarding-lungs-are-true-except-a8d8c3cf` — Following statements regarding lungs are true, EXCEPT:
- `forced-expiration-b-7d9febd4` — Forced expiration B
- `how-do-you-calculate-how-much-inspired-air-actually-ventilat-91ab164f` — How do you calculate how much inspired air actually ventilates the alveoli durin…
- `how-much-oxygen-is-normally-carried-in-the-blood-a1f343e8` — How much oxygen is normally carried in the blood?
- `i-regarding-the-root-of-the-lung-mark-the-incorrect-answer-0-e92f0fa9` — i Regarding the root of the lung; mark the incorrect answer: 00 ْ a- It lie oppo…
- `if-the-edv-is-increased-within-limits-1a718833` — If the EDV is increased (within limits):
- `if-the-edv-is-increased-within-limits-which-of-the-following-e4707b02` — If the EDV is increased (within limits), which of the following will occur?
- `if-the-lungs-experimentally-filled-completely-with-saline-so-4d4a1047` — If the lungs experimentally filled completely with saline, so the surface tensio…
- `ifa-child-inhales-by-mistake-a-foreign-body-it-will-pass-to-bcab2764` — Ifa child inhales by mistake a foreign body, it will pass to the right bronchus …
- `immediate-stoppage-of-respiration-can-be-caused-by-transecti-82f47191` — Immediate stoppage of respiration can be caused by transection:
- `in-normal-individual-respiration-is-regulated-by-all-except-7e8ddaae` — In normal individual respiration is regulated by all except:
- `in-quiet-breathing-expiration-is-e59e87c7` — In quiet breathing, expiration is: :
- `in-the-anatomical-position-the-heart-has-a-7f24a6c3` — In the anatomical position, the heart has a:
- `in-the-chest-wall-one-is-correct-2b79c80a` — In the chest wall, one is correct:
- `in-the-superior-mediastinum-which-is-appropriate-78a9a3f4` — In the superior mediastinum, which is appropriate?
- `in-the-transport-of-co2-from-the-tissues-to-the-lungs-which-b9c9fd6b` — In the transport of CO2 from the tissues to the lungs, which of the following oc…
- `in-which-mediastinum-is-the-thoracic-part-of-the-trachea-loc-90a56cbb` — In which mediastinum is the thoracic part of the trachea located?
- `in-which-mediastinum-is-the-thoracic-part-of-the-trachea-loc-a3662d0e` — In which mediastinum is the thoracic part of the trachea located? Superior |
- `increase-with-age-forming-brown-atrophy-of-heart-xxx-dc8cd7ee` — increase with age forming brown atrophy of heart XXX
- `increased-arteriolar-resistance-15i-metabolic-changes-that-p-a0ebb63c` — Increased arteriolar resistance 15i-Metabolic changes that produce vasodilation …
- `inira-alveolar-pressure-during-normal-inspiration-2dec0ace` — Inira-alveolar pressure during normal inspiration:
- `inspiration-50a94c7d` — Inspiration:
- `inspiration-i-1730519e` — Inspiration: i
- `intra-alveolar-pressure-a-is-negative-throughout-normal-quie-fa946e59` — Intra-alveolar pressure: a-Is negative throughout normal quiet breathing
- `intra-alveolar-pressure-b9340fd1` — Intra-alveolar pressure:
- `intra-alveolar-pressure-during-normal-inspiration-43eb14c9` — Intra-alveolar pressure during normal inspiration:
- `intrapulmonary-bronchus-has-tepret-epithelial-lining-with-no-a0257a5b` — Intrapulmonary bronchus has: tePret ‏-م‎ Epithelial lining with no goblet celis
- `is-aggregation-of-lymph-tissue-with-incomplete-capsule-498c1c81` — is aggregation of lymph tissue with incomplete capsule
- `is-non-membranous-cartwheel-like-derived-from-glycocalyx-9fb74d62` — is non-membranous Cartwheel-like, derived from glycocalyx
- `it-the-noradrenergic-nerves-to-the-heart-are-stimulated-afte-65f9cb1e` — It the noradrenergic nerves to the heart are stimulated after giving a B-blocker…
- `less-developed-spirally-arranged-smooth-muscles-are-a-featur-adbb9056` — Less developed spirally arranged smooth muscles are a feature of:
- `liver-cells-is-example-for-18d16db7` — liver cells is example for
- `longitudinal-smooth-muscle-fibers-are-present-in-adventitia-abc2ab0d` — Longitudinal smooth muscle fibers are present in adventitia of:
- `lung-emphysema-decreases-the-pulmonary-diffusing-capacity-fo-ead15150` — Lung emphysema decreases the pulmonary diffusing capacity for gases due to:
- `mean-systemic-filling-pressure-is-decreased-by-tepret-ef914ec2` — Mean systemic filling pressure is decreased by: tePret
- `medullary-inspiratory-neurons-are-stimulated-by-370da678` — Medullary inspiratory neurons are stimulated by:
- `metabolic-changes-that-produce-vasodilation-of-resistance-ve-d5fa92c6` — Metabolic changes that produce vasodilation of resistance vessels includes: ‏ل‎ …
- `monocyte-in-while-macrophage-in-ac70f5eb` — monocyte in ………., while macrophage in ……………
- `nitric-oxide-25204420` — Nitric oxide
- `non-renewing-cells-are-characterized-by-all-the-following-ex-5836a5c6` — Non renewing cells are characterized by All the following except
- `normal-value-of-lung-compliance-is-about-b1eb2ab0` — Normal value of lung‘ compliance is about....:
- `one-of-the-following-branches-arises-from-arch-of-aorta-5f0c9b55` — ٠ One of the following branches arises from arch of aorta:
- `one-of-the-following-does-not-open-into-the-right-atrium-2-a-3a31c50e` — One of the following does not open into the right atrium: (2 azygos vein
- `one-of-the-following-does-not-open-into-the-right-atrium-679e33ac` — One of the following does not open into the right atrium:
- `one-of-the-following-is-a-potentially-renewable-cell-04f21553` — One of the following is a potentially renewable cell:
- `one-of-the-following-is-not-a-branch-of-the-internal-thoraci-db5ffa2e` — One of the following is not a branch of the internal thoracic artery:
- `one-of-the-following-structures-lie-below-the-aortic-arch-87da8fa4` — One of the following structures lie below the aortic arch:
- `one-of-the-following-structures-passes-with-the-descending-t-924d7cfa` — One of the following structures passes with the descending thoracic aorta throug…
- `one-of-the-following-veinsdrain-into-the-right-brachiocephal-5f88d0f2` — One of the following veinsdrain into the right brachiocephalic vein:
- `one-of-the-followings-is-a-main-feature-of-the-right-lung-fe-6a94ad9a` — One of the followings is a main feature of the right lung: febref a It has two l…
- `one-of-the-followings-is-correct-concerning-the-coronary-sin-cbb41e7c` — One of the followings is correct concerning the coronary sinus of the heart:
- `one-of-the-followings-is-not-true-concerning-the-left-atrium-cc2b5add` — One of the followings is not true concerning the left atrium: in
- `opposite-the-tracheal-bifurcation-lies-indicate-the-correct-bcb94387` — Opposite the tracheal bifurcation, lies; indicate the correct answer:
- `outer-part-of-thymus-cortex-contain-while-inner-part-contain-e2cc156d` — outer part of thymus cortex Contain - - - - while inner part contain
- `p-r-interval-is-prolonged-in-all-the-following-cases-except-9c1e8349` — P-R interval is prolonged in all the following cases except:
- `pacemaker-potentials-are-normally-absent-from-98015db5` — Pacemaker potentials are normally absent from:
- `ph-of-venous-blood-is-only-slightly-more-acidic-than-ph-of-a-93c10913` — pH of venous blood is only slightly more acidic than pH of arterial blood becaus…
- `pleural-reflection-lies-at-which-rib-level-in-the-midclavicu-4742bd47` — Pleural reflection lies at which rib level in the midclavicular line?
- `prevent-over-distension-in-trachea-3478dfd1` — prevent over distension in trachea
- `propagation-of-the-action-potential-through-the-heart-isfast-b5f2c52d` — Propagation of the action potential through the heart isfastest in the :
- `pulmonary-vascular-resistance-f5ca3914` — Pulmonary vascular resistance
- `regarding-arch-of-aorta-mark-one-correct-answer-a-it-extends-99c650da` — Regarding arch of aorta, mark ONE correct answer: | a- It extends above the supr…
- `regarding-arch-of-aorta-the-following-statements-are-correct-7928ecd9` — Regarding arch of aorta, the following statements are correct, EXCEPT:
- `regarding-bronchopulmonary-segments-which-is-correct-03061e6c` — Regarding bronchopulmonary segments, which is correct?
- `regarding-descending-thoracic-aorta-select-the-true-answer-28c74a27` — Regarding descending thoracic aorta, select the true answer:
- `regarding-descending-thoracic-aorta-select-the-true-answer-a-30b7e545` — Regarding descending thoracic aorta, select the true answer: ‏كا‎ a- it is relat…
- `regarding-intercostal-blood-vessels-one-is-true-3464230a` — Regarding intercostal blood vessels, one is true:
- `regarding-intercostal-spaces-choose-the-correct-statement-5b563ce5` — Regarding intercostal spaces, choose the correct statement:
- `regarding-intercostal-spaces-choose-the-correct-statement-a-7ff13aa0` — Regarding intercostal spaces, choose the correct statement: ‏ا‎ ‎a. Internal int…
- `regarding-respiration-and-the-changes-in-the-thorax-all-the-69394d4b` — Regarding respiration and the changes in the thorax, all the followings are true…
- `regarding-surface-markings-of-the-lungs-the-following-is-tru-173291e3` — Regarding surface markings of the lungs the following is true:
- `regarding-the-arch-of-the-aorta-one-is-false-c6faa886` — Regarding the arch of the aorta, one is false:
- `regarding-the-arch-of-the-aorta-which-is-incorrect-5880a035` — Regarding the arch of the aorta, which is incorrect:
- `regarding-the-arterial-supply-of-the-heart-the-following-sta-726ad32b` — Regarding the arterial supply of the heart, the following statements are true, E…
- `regarding-the-azygos-vein-the-following-statements-are-corre-75a55e25` — Regarding the azygos vein, the following statements are Correct, EXCEPT:
- `regarding-the-blood-supply-of-the-lungs-mark-one-correct-sta-475d3a78` — Regarding the blood supply of the lungs, mark ONE correct statement:
- `regarding-the-bronchi-the-following-statements-are-true-exce-4c571716` — Regarding the bronchi, the following statements are true, EXCEPT:
- `regarding-the-bronchopulmonary-segments-choose-the-correct-s-a03bf8bf` — Regarding the bronchopulmonary segments, choose the correct statement:
- `regarding-the-cardiac-veins-one-is-true-877d38e6` — Regarding the cardiac veins, one is true:
- `regarding-the-coronary-arteries-all-the-following-statements-402c0dd1` — Regarding the coronary arteries, all the following statements are true, EXCEPT:
- `regarding-the-coronary-arteries-the-following-statements-are-db3acfda` — Regarding the coronary arteries, the following statements are correct, EXCEPT:
- `regarding-the-descending-thoracic-aorta-the-following-statem-0c346b05` — Regarding the descending thoracic aorta, the following statemen,. are correct, E…
- `regarding-the-external-intercostal-muscle-the-following-stat-694db6e0` — Regarding the external intercostal muscle, the following statements are true, EX…
- `regarding-the-heart-mark-one-correct-statement-d8600a96` — Regarding the heart, mark ONE correct statement:
- `regarding-the-heart-valves-which-of-the-followings-is-correc-af88156c` — Regarding the heart valves, which of the followings is correct?
- `regarding-the-intercostal-arteries-all-the-following-stateme-487c3bb6` — Regarding the intercostal arteries, all the following statements are true, EXCEP…
- `regarding-the-intercostal-arteries-one-is-true-15556e57` — Regarding the intercostal arteries, one is true:
- `regarding-the-intercostal-nerve-mark-one-correct-statement-39200e19` — Regarding the intercostal nerve, mark ONE correct statement:
- `regarding-the-intercostal-nerves-one-is-false-482d0ad2` — Regarding the intercostal nerves, one is false:
- `regarding-the-intercostal-nerves-the-following-statements-ar-de5ec519` — Regarding the intercostal nerves, the following statements are correct, EXCEPT:
- `regarding-the-internal-mammary-artery-the-following-statemen-fae6e956` — Regarding the internal mammary artery, the following statements are correct, EXC…
- `regarding-the-internal-thoracic-artery-one-is-false-fdbf7a43` — Regarding the internal thoracic artery, one is false:
- `regarding-the-lungs-all-the-following-statements-are-true-ex-1bfb9298` — Regarding the lungs, all the following statements are true, EXCEPT:
- `regarding-the-lungs-mark-the-wrong-statement-e5cc97b5` — Regarding the lungs, mark the wrong statement: ; :
- `regarding-the-lungs-the-following-statements-are-correct-exc-e8f3c3d0` — Regarding the lungs, the following statements are correct EXCEPT:
- `regarding-the-pleura-all-the-following-statements-are-true-e-1968aabb` — Regarding the pleura, all the following statements are true, EXCEPT:
- `regarding-the-ribs-one-of-the-following-statements-is-wrong-1d20d8ae` — Regarding the ribs; one of the following statements is wrong: _
- `regarding-the-right-coronary-artery-select-the-correct-state-6545e80e` — Regarding the right coronary artery, select the correct statement:
- `regarding-the-right-lung-all-the-following-statements-are-tr-6f98f439` — Regarding the right lung, all the following statements are true, EXCEPT:
- `regarding-the-root-of-the-lung-all-true-except-5bb8ca0c` — Regarding the root of the lung all true except:
- `regarding-the-root-of-the-lung-one-is-incorrect-ab551b87` — Regarding the root of the lung, one is incorrect:
- `regarding-the-s-a-node-2d9ef5ca` — Regarding the S-A node :
- `regarding-the-superior-mediastinum-select-the-incorrect-answ-8ac910fc` — Regarding the superior mediastinum, select the incorrect answer:
- `regarding-the-suprapleural-membrane-all-the-following-statem-c8caf1dc` — Regarding the suprapleural membrane, all the following statements are true, EXCE…
- `regarding-the-thoracic-skeleton-the-following-statements-are-62092e50` — Regarding the thoracic skeleton, the following statements are Correct, EXCEPT:
- `regarding-the-trachea-choose-the-correct-statement-a-it-cont-b24ef722` — Regarding the trachea, choose the correct statement: . : a, It contains incomple…
- `regarding-the-trachea-in-thorax-the-following-statements-are-9cd4602d` — Regarding the trachea in thorax, the following statements are Correct, EXCEPT:
- `regarding-the-trachea-mark-one-correct-statement-d3ea806b` — Regarding the trachea, mark ONE CORRECT statement:
- `regarding-the-vagus-nerves-mark-one-correct-statement-4f8ac496` — Regarding the vagus nerves, mark ONE correct statement:
- `regarding-the-vessels-of-the-thoracic-wall-the-following-sta-738e0dae` — Regarding the vessels of the thoracic wall, the following statements are correct…
- `regarding-thymus-gland-it-is-i-16460019` — Regarding thymus gland, It is: i
- `regarding-transpulmonary-pressure-all-is-correct-except-eb323f99` — Regarding transpulmonary pressure all is correct, except:
- `renhin-is-released-in-the-following-conditions-except-1690beb3` — Renhin is released in the following conditions, except
- `reticular-ct-can-be-stained-by-50c0381c` — reticular CT can be stained by
- `secretion-of-the-following-hormones-is-increased-during-hemo-62b59647` — Secretion of the following hormones is increased during hemorrhagic shock, excep…
- `select-the-correct-statement-about-o-transport-in-the-blood-c34350a2` — Select the correct statement about O, transport in the blood: 12 0 ‏خ146ا1ا1ا[| …
- `specialized-types-of-medium-sized-artery-include-the-followi-82300128` — Specialized types of medium sized artery include the following:
- `spontaneous-respiration-ceases-after-7ab1a72f` — Spontaneous respiration ceases after:
- `stimalation-of-angiotensin-ii-receptors-at1-produce-all-exce-7cf8d5ad` — Stimalation of angiotensin II receptors AT1 produce all, except
- `stimulation-of-angiotensin-ii-receptors-at-2-produce-a2994df9` — Stimulation of angiotensin II receptors AT-2 produce:
- `structures-passing-between-arch-0-pene-a-and-pulmonary-trunk-c8fde235` — Structures passing between arch - 0 pene a and pulmonary trunk, mark
- `support-lung-tissue-prevent-over-expansion-684cc6bf` — support lung tissue, prevent over-expansion
- `systemic-arteriolar-constriction-may-result-from-an-increase-fdd3c641` — Systemic arteriolar constriction may result from an increase in local concentrat…
- `systolic-pressure-in-right-ventricle-is-84464eed` — Systolic pressure in right ventricle is:
- `t-waye-is-inverted-in-a-muscular-exercise-be27b8b3` — 'T waye is inverted in: a, muscular exercise. |
- `the-1st-posterior-intercostal-artery-is-a-branch-from-72492885` — The 1st posterior intercostal artery is a branch from:
- `the-9th-anterior-intercostal-artery-is-a-branch-from-3bef8271` — The 9th anterior intercostal artery is a branch from:
- `the-action-of-the-ribs-during-breathing-67046c81` — The action of the ribs during breathing:
- `the-alveoli-at-the-top-of-the-lungs-differ-from-those-at-the-1a0a9d30` — The alveoli at the top of the lungs differ from those at the bottom in:
- `the-anterior-interventricular-artery-is-accompanied-by-46e16a29` — The anterior interventricular artery is accompanied by:
- `the-atrial-component-of-ventricular-filling-is-46a00baf` — The atrial component of ventricular filling is
- `the-atrio-ventricular-valves-a-have-three-cusps-for-each-val-74e93b22` — The atrio-ventricular valves : a.have three cusps for each valve
- `the-autonomic-plexus-of-the-oesophagus-indicate-the-correct-7fc3a91f` — The autonomic plexus of the oesophagus, indicate the correct statement:
- `the-average-normal-electrical-axis-of-the-heart-is-6e612f34` — The average normal electrical axis of the heart is;
- `the-capillaries-which-are-present-in-the-nervous-tissue-are-28dee5ce` — The capillaries which are present in the nervous tissue are:
- `the-carotid-and-aortic-bodies-increase-their-rate-of-dischar-32d0556f` — The carotid and aortic bodies increase their rate of discharge in response to:
- `the-coronary-blood-flow-0e0b7a15` — The coronary blood flow:
- `the-effect-of-parasympathetic-ns-on-the-heart-is-fbd13988` — The effect of parasympathetic NS on the heart is:
- `the-exploring-electrode-of-v1-of-unipolar-chest-leads-of-ecg-14f45925` — The exploring electrode of V1 of unipolar chest leads of ECG is placed at: a
- `the-exploring-electrode-of-v1-of-unipolar-chest-leads-of-ecg-fc99a24d` — The exploring electrode of V1 of unipolar chest leads of ECG is placed at:
- `the-fibers-of-the-a-v-bundle-its-branches-e7478cf8` — The fibers of the A-V bundle & its branches : . |
- `the-following-are-a-parts-of-the-conductive-system-of-the-he-98ca9ab2` — The following are a parts of the conductive system of the heart, EXCEPT:
- `the-following-are-parts-of-the-conductive-system-of-the-hear-baaf7de3` — The following are parts of the conductive system of the heart, EXCEPT:
- `the-following-are-the-contents-of-superior-mediastinum-excep-f5f71f58` — The following are the contents of superior mediastinum, EXCEPT:
- `the-following-are-the-contents-of-the-posterior-mediastinum-2d0d25e8` — The following are the contents of the posterior mediastinum, EXCEPT:
- `the-following-are-true-regarding-no-except-870b8ec2` — The following are true, regarding NO, except
- `the-following-structure-is-present-in-the-cavity-of-the-righ-0db915f2` — The following structure is present in the cavity of the right ventricle:
- `the-following-structure-lies-behind-the-oseophagus-0548e986` — The following structure lies behind the oseophagus:
- `the-function-of-the-av-node-is-to-a-excite-the-left-and-righ-00f4d17c` — The function of the AV node is to: a, Excite the left and right atrium
- `the-glandular-epithelium-of-the-trachea-exists-in-08025378` — The glandular epithelium of the trachea exists in:
- `the-heart-is-situated-in-e707e57c` — The heart is situated in:
- `the-internal-mammary-artery-arises-from-bc7138a7` — The Internal Mammary artery arises from:
- `the-internal-structure-of-left-ventricle-one-is-correct-f794c1b3` — The internal structure of left ventricle, one is correct:
- `the-largest-amount-of-co-is-transported-by-the-blood-as-691eba1c` — The largest amount of CO; is transported by the blood as:
- `the-left-recurrent-laryngeal-nerve-hooks-inferiorly-around-t-f916dd25` — The left recurrent laryngeal nerve hooks inferiorly around the:
- `the-left-superior-intercostal-vein-drains-usually-into-the-f54a19d6` — The Left superior intercostal vein drains usually into the:
- `the-left-ventricle-has-a-thicker-wall-than-the-right-ventric-466aa2d9` — The left ventricle has a thicker wall than the right ventricle because a, itis r…
- `the-low-resistance-pathways-between-myocardial-cells-that-al-a0d4998c` — The low-resistance pathways between myocardial cells that allow for the spread o…
- `the-lymphatic-organ-containing-littoral-macrophage-cells-is-00df2662` — The lymphatic organ containing Littoral macrophage cells is: |
- `the-main-function-of-the-cardiac-purkinje-system-is-to-a-pre-867155e1` — The main function of the cardiac purkinje system is to : a, prevent premature ve…
- `the-most-likely-response-in-a-patient-with-pneumothorax-upon-4477f37f` — The most likely response in a patient with pneumothorax upon entry of air into t…
- `the-most-superficial-structure-in-the-thoracic-inlet-is-the-4687669f` — The most superficial structure in the thoracic inlet is the:
- `the-muscles-of-inspiration-include-all-of-the-following-exce-c11b2e68` — The muscles of inspiration include all of the following, EXCEPT:
- `the-oxygen-hemoglobin-dissociation-curve-will-shift-to-the-r-6cda5909` — The oxygen-hemoglobin dissociation curve will shift to the right with:
- `the-oxyhemoglobin-dissociation-curve-fa89718b` — The oxyhemoglobin dissociation curve:
- `the-pulmonary-valve-sound-is-best-heard-at-indicate-the-corr-22983fbe` — The pulmonary valve sound is best heard at; indicate the correct answer:
- `the-recoil-tendency-of-the-lungs-b4d2cfea` — The recoil tendency of the lungs:
- `the-residual-volume-37dc4b1c` — The residual volume: :
- `the-resistance-of-the-lungs-to-inflation-is-increase-by-ee943cea` — The resistance of the lungs to inflation is increase by:
- `the-right-superior-intercostal-veins-drains-into-tepe-gd-8dd78bd6` — The right superior intercostal veins drains into: tePe gd
- `the-right-ventricle-contains-all-the-following-structures-ex-71e6d172` — The right ventricle contains all the following structures, EXCEPT:
- `the-sa-node-is-the-normal-pace-maker-because-a4457b2b` — The SA node is the normal pace maker because :
- `the-slowest-conducting-velocity-occurs-in-5a6c35c5` — The slowest conducting velocity occurs in:
- `the-slowest-conducting-velocity-occurs-in-which-of-the-follo-af891c81` — The slowest conducting velocity occurs in which of the following structures?
- `the-strength-of-contraction-of-left-ventricular-muscle-incre-09963bab` — The strength of contraction of left ventricular muscle increases when : |
- `the-superior-vena-cava-choose-the-true-answer-27315868` — The superior vena cava, choose the true answer:
- `the-systolic-pressure-in-the-left-ventricle-is-c234e41a` — The systolic pressure in the left ventricle is:
- `the-thoracic-part-of-trachea-is-related-posteriorly-to-the-e-54713c25` — The thoracic part of trachea is related posteriorly to the esophagus with the fo…
- `the-tunica-intima-of-coronary-artery-contains-8521e782` — The tunica intima of coronary artery contains:
- `the-work-performed-by-left-ventricle-is-greater-than-that-pe-eec8e8ca` — The work performed by left ventricle is greater than that performed by right ven…
- `thorax-all-are-true-except-88af29b9` — Thorax; all are true except:
- `tidal-volume-is-air-66461af4` — Tidal volume is air:
- `trachea-is-characterized-by-all-except-529d75ca` — trachea is characterized by All except
- `transection-between-medulla-oblongata-and-upper-border-of-sp-d728ec2a` — Transection between medulla oblongata and upper border of spinal cord causes:
- `turbulence-is-almost-always-present-when-reynolds-number-is-afc8cefe` — Turbulence is almost always present when Reynolds number is more than:
- `venous-plexuses-swell-bodies-is-present-in-c13eea5d` — venous plexuses (swell bodies) is present in
- `ventilation-perfusion-v4-q-ratio-a45d5f6c` — Ventilation/perfusion (V4/Q) ratio: : :
- `vital-capacity-e6eee7c9` — Vital capacity:
- `vital-capacity-is-reduced-by-all-except-75ee187f` — Vital capacity is reduced by all except:
- `vonkupffer-cell-in-while-langerhan-s-cell-in-a4a2289a` — Vonkupffer cell in ………………., while langerhan's Cell in ……………
- `what-impression-cannot-be-found-on-the-mediastinal-surface-o-630618f3` — What impression cannot be found-on. the mediastinal surface of the right Jung:
- `what-is-the-correct-pathway-of-impulses-through-the-conducti-26e4ed5e` — what is the correct pathway of impulses through the conducting system of the hea…
- `what-is-the-important-function-of-cardiac-purkinje-system-3132c9a7` — What is the important function of cardiac Purkinje system?
- `what-is-true-of-the-anatomy-of-the-trachea-8e21112a` — What is true of the anatomy of the trachea? —
- `what-lies-posterior-to-the-right-root-of-the-lung-961e042f` — What lies posterior to the right root of the lung?
- `what-s-the-correct-definition-of-cardiac-output-f23eae83` — What's the correct definition of cardiac output?
- `what-type-of-tissue-forms-the-alveoli-in-the-lung-44df5f2e` — What type of tissue forms the alveoli in the lung?
- `when-a-person-is-standing-blood-flow-in-the-lungs-is-d559a19e` — When a person is standing, blood flow in the lungs is
- `when-the-bundle-of-his-is-completely-interrupted-the-1245d791` — When the bundle of His is completely interrupted,the:
- `when-the-bundle-of-his-is-completely-interrupted-the-ae-7-ea-45a41f10` — When the bundle of His is completely interrupted,the: | ae 7 — eave Faye
- `when-the-respiratory-muscles-are-relaxed-the-lungs-are-at-f4ccf2fa` — When the respiratory muscles are relaxed, the lungs are at:
- `where-do-t-lymphocytes-acquire-their-immunocompetence-7eafb30a` — Where do T-lymphocytes acquire their immunocompetence?
- `which-disease-increase-lung-compliance-a-emphysema-572250fc` — Which disease increase lung compliance: ‏ظ‎ ‎a- Emphysema
- `which-disorder-decreases-the-chest-compliance-a178c097` — Which disorder decreases the chest compliance:
- `which-ef-the-following-are-muscles-of-inspiration-0eea2c0f` — Which ef the following are muscles of inspiration?
- `which-is-not-a-part-of-the-specialized-self-excitable-conduc-a538dc86` — Which is not a part of the specialized self-excitable conductive system of the h…
- `which-of-following-conditions-would-limit-the-diffusion-of-o-63690754` — Which of following conditions would limit the diffusion of O; from alveoli to pu…
- `which-of-the-following-are-functions-of-components-of-the-re-4b944d7a` — Which of the following are functions of components of the respiratory system?
- `which-of-the-following-are-muscles-of-inspiration-5936e8bb` — Which of the following are muscles of inspiration?
- `which-of-the-following-are-the-bronchopulmonary-segments-of-b8d446b1` — Which of the following are the bronchopulmonary segments of the lingula of the l…
- `which-of-the-following-characteristic-are-helpful-in-differe-90dd02ea` — Which of the following characteristic are helpful in differentiating between cer…
- `which-of-the-following-concerning-average-lung-volumes-and-c-ade8fafa` — Which of the following concerning average lung volumes and capacities of a perso…
- `which-of-the-following-conditions-causes-hypoventilation-6ee07624` — Which of the following conditions causes hypoventilation?
- `which-of-the-following-conditions-would-limit-the-diffusion-199d5c2b` — Which of the following conditions would limit the diffusion of O, from alveoli t…
- `which-of-the-following-describes-the-pulse-pressure-212b2ae7` — Which of the following describes the pulse pressure?
- `which-of-the-following-discharge-spontaneously-during-quiet-b30226e7` — Which of the following discharge spontaneously during quiet breathing? ‏ا‎ ‎a- S…
- `which-of-the-following-discharge-spontaneously-during-quist-89974900` — Which of the following discharge spontaneously during quist breathing?
- `which-of-the-following-discharges-spontaneously-during-quiet-20ea9248` — Which of the following discharges spontaneously during quiet breathing?
- `which-of-the-following-does-not-happen-during-inspiration-61b7b571` — Which of the following does NOT happen during inspiration?
- `which-of-the-following-events-of-cardiac-myocyte-action-pote-3a3be2b8` — Which of the following events of cardiac myocyte action potential is correctly d…
- `which-of-the-following-has-negative-chronotropic-effect-e351e202` — Which of the following has negative chronotropic effect?
- `which-of-the-following-has-the-slowest-rhythmicity-in-the-au-e06c2b37` — Which of the following has the slowest rhythmicity in the automatic cardiac tiss…
- `which-of-the-following-is-a-function-of-the-av-node-16a480fe` — Which of the following is a function of the AV node?
- `which-of-the-following-is-characteristic-about-the-conductin-c32dcb44` — which of the following is characteristic about the conducting system of the hear…
- `which-of-the-following-is-considered-a-central-lymphatic-org-81ba1e71` — Which of the following is considered a central lymphatic organ:
- `which-of-the-following-is-correct-as-regards-na-ca-exchanger-e0bfc7af` — Which of the following is correct as regards Na+ - Ca++ exchanger?
- `which-of-the-following-is-correct-regarding-type-il-pneumocy-1e2dfdfa` — Which of the following is correct regarding type Il pneumocytes?
- `which-of-the-following-is-not-a-part-of-the-specialized-seij-44db1b50` — Which of the following is not a part of the specialized seij-excitable conductiv…
- `which-of-the-following-is-not-true-concerning-respiratory-di-1e77d3bd` — Which of the following is NOT true concerning respiratory distress syndrome in p…
- `which-of-the-following-is-not-true-concerning-respiratory-di-95a783aa` — Which of the following is NOT true concerning respiratory distress sy ndrome in …
- `which-of-the-following-is-not-true-concerning-respiratory-di-a84e357a` — Which of the following is NOT true concerning respiratory distress = syndrome in…
- `which-of-the-following-is-the-correct-pathway-of-impulses-th-bcc9a59a` — Which of the following is the correct pathway of impulses through the conducting…
- `which-of-the-following-is-true-during-inspiration-b760feb5` — Which of the following is true during inspiration?
- `which-of-the-following-maintain-the-ionic-concentrations-acr-20b74fb5` — Which of the following maintain the ionic concentrations across the sarcolemma o…
- `which-of-the-following-occurs-during-inspiration-d111eb4c` — Which of the following occurs during inspiration? ْ
- `which-of-the-following-represents-the-pressure-difference-th-3a447d91` — Which of the following represents the pressure difference that acts to distend t…
- `which-of-the-following-statements-about-the-course-of-the-th-dff1f8cd` — Which of the following statements about the course of the thoracic part of esoph…
- `which-of-the-following-statements-regarding-the-esophagus-is-fcf71760` — Which of the following statements, regarding the esophagus is true:
- `which-of-the-following-statements-regarding-the-phrenic-nerv-5e25350f` — Which of the following statements regarding the phrenic nerves is | true?
- `which-of-the-following-structures-open-into-the-left-atrium-345fc7a5` — Which of the following structures open into the left atrium?
- `which-of-the-following-structures-present-at-the-level-of-th-60a385c5` — Which of the following structures present at the level of the lower border of th…
- `which-of-the-followings-is-not-a-content-in-the-superior-med-2c3e2242` — Which of the followings is not a content in the superior mediastinum?
- `which-of-tne-following-represents-the-pressure-difference-th-8e096a02` — Which of tne following represents the pressure difference that acts to distend t…
- `which-one-of-the-following-components-of-a-pulmonary-functio-1aeacf86` — Which one of the following components of a pulmonary function test will be norma…
- `which-one-of-the-following-is-the-correct-statement-regardin-c5bde64a` — Which one of the following is the correct statement regarding coronary food flow…
- `which-one-of-the-following-structures-leaves-an-impression-o-bc55d0f1` — Which one of the following structures leaves an impression on the mediastinal su…
- `which-one-of-the-followings-regarding-the-superior-vena-cava-c979512d` — Which one of the followings regarding the superior vena cava is not true:
- `which-person-would-be-expected-to-have-the-largest-alveolar-7d341e19` — Which person would be expected to have the largest Alveolar PO2-arterial PO2 gra…
- `which-statement-about-hemoglobin-is-incorrect-e6822bc0` — Which statement about hemoglobin is Incorrect?
- `which-two-of-the-following-are-necessary-to-stimulate-b-lymp-0b3fa792` — Which two of the following are necessary to stimulate B- Lymphocyte to divide an…
- `which-volume-remains-in-the-lungs-after-a-maximal-expiration-1d4cbfd2` — Which volume remains in the lungs after a maximal expiration?
- `with-respect-to-the-cardiac-plexuses-one-is-true-1f95d468` — With respect to the cardiac plexuses, one is true:
- `y-wave-in-jugular-venous-pulse-occurs-in-1-e831e3a0` — Y wave in jugular venous pulse occurs in: 1
- `y-wave-in-jugular-venous-pulse-occurs-in-5dec9a19` — Y wave in jugular venous pulse occurs in:

### Gas Transport by the Blood (24)

- `all-of-the-followings-are-correct-as-regards-cyanosis-except-1cb68242` — All of the followings are Correct as regards cyanosis EXCEPT:
- `carbon-dioxide-is-transported-in-blood-in-the-following-form-5c2f6551` — Carbon dioxide is transported in blood in the following forms, except:
- `carbonic-anhydrase-cb975a18` — Carbonic anhydrase:
- `cyanosis-1-60b08503` — Cyanosis: 1
- `cyanosis-3ce6dbd2` — Cyanosis:
- `during-chloride-shift-1-eefc11e6` — During chloride shift: 1
- `during-chloride-shift-1441cfda` — During chloride shift: :
- `factors-that-cause-shift-of-oxygen-dissociation-curve-to-the-b126141d` — Factors that cause shift of oxygen dissociation curve to the right are:
- `factors-that-shift-oxygen-dissociation-curve-to-the-left-inc-3448eb05` — Factors that shift oxygen dissociation curve to the left include:
- `hypoxic-hypoxia-3-7fa250af` — Hypoxic hypoxia: 3
- `hypoxic-hypoxia-b97facbb` — Hypoxic hypoxia:
- `in-which-vascular-bed-does-hypoxia-cause-vasoconstriction-bce0e518` — In which vascular bed does hypoxia cause vasoconstriction?
- `most-co-is-transported-in-the-blood-in-the-form-of-9dc7cf8c` — Most CO, is transported in the blood in the form of:
- `non-chemical-influence-on-respiration-inclucle-all-of-the-fo-491c9bf5` — Non-chemical influence on respiration inclucle all of the following, EXCEPT:
- `non-chemical-influence-on-respiration-include-all-of-the-fol-a0b06c7d` — Non-chemical influence on respiration include all of the following, EXCEPT: |
- `oxygen-therapy-is-of-limited-value-in-which-of-the-following-4b8eb82e` — Oxygen therapy is of limited value in which of the following situations?
- `oxygen-unloading-3-26f77f75` — Oxygen unloading: 3
- `oxygen-unloading-91021a0b` — Oxygen unloading:
- `regarding-chloride-shift-phenomenon-at-the-tissue-level-d2124bd0` — Regarding chloride shift phenomenon at the tissue level:
- `the-haldane-effect-refers-to-460f3b00` — The haldane effect refers to:
- `the-hemoglobin-oxygen-dissociation-curve-moves-up-and-to-the-58fa0d96` — The hemoglobin-oxygen dissociation curve moves up and to the left with:
- `the-respiratory-center-da0305c6` — The respiratory center:
- `which-of-the-following-causes-of-hypoxia-is-characterized-by-214aa73e` — Which of the following causes of hypoxia is characterized by a decreased arteria…
- `with-respect-to-the-binding-of-carbon-monoxide-to-haemoglobi-5467d1ba` — With respect to the binding of carbon monoxide to haemoglobin: ‏ا‎

### Lymph node (17)

- `all-characters-of-lymph-node-capsule-except-95568569` — All characters of lymph Node Capsule except
- `all-functions-of-lymph-node-except-4faf6247` — All functions of lymph Node except
- `choose-the-correct-statement-about-billroth-cords-aa93a7fb` — Choose the correct statement about Billroth cords:
- `choose-the-correct-statement-about-lymph-node-functions-79a10886` — Choose the correct statement about lymph node functions: |
- `choose-the-correct-statement-about-the-lymph-node-8ca055b5` — Choose the correct statement about the lymph node:
- `choose-the-correct-statement-about-the-lymph-node-a-lymph-ci-76fd16cb` — Choose the correct statement about the lymph node: a, Lymph circulates from medu…
- `concerning-the-billroth-cords-the-following-is-true-775e83c5` — Concerning the Billroth cords, the following is true:
- `concerning-the-paracortex-of-lymph-node-choose-the-correct-s-b9c8b9f2` — Concerning the paracortex of lymph node, choose the correct Statement:
- `identify-the-following-organ-choose-the-correct-statement-bd5813e3` — Identify the following organ & choose the correct statement:
- `in-intrapulmonary-bronchi-muco-serous-lymphatic-nodule-prese-63a9f274` — in intrapulmonary bronchi, muco-Serous, lymphatic nodule Present in:
- `is-bean-or-kidney-shaped-with-capsule-a9e2e5ba` — ……….. is bean or kidney shaped with Capsule
- `regarding-lymph-node-which-answer-is-correct-821e3545` — Regarding lymph node, which answer is correct?
- `regarding-the-germinal-center-in-lymph-node-2a8628a2` — Regarding the germinal center in lymph node:
- `regional-enlargement-of-lymph-nodes-may-be-due-to-68fe188c` — Regional enlargement of lymph nodes may be due to:
- `the-germinal-center-of-secondary-lymphatic-nodules-contain-m-7128bcbf` — The germinal center of secondary lymphatic nodules contain many:
- `the-primary-lymphatic-organs-include-1a970a71` — The primary lymphatic organs include:
- `which-cell-considered-as-a-part-of-the-phagocytic-system-325b83f1` — Which cell considered as a part of the phagocytic system:

### Tonsils (14)

- `a-10-year-old-child-had-frequent-acute-tonsillitis-his-mothe-d637af89` — A 10 year old child had frequent acute tonsillitis & his mother was advised to c…
- `a-7-year-old-child-came-to-the-pediatric-clinic-presenting-w-52cb44df` — A 7 year old child came to the pediatric clinic presenting with a typical pictur…
- `a-patient-has-an-auto-immune-disease-it-may-be-due-to-a-defe-060829f0` — A patient has an auto immune disease .It may be due to a defect in the lymphocyt…
- `a7-year-old-child-came-to-the-pediatric-clinic-presenting-wi-c1adae6b` — A7 year old child came to the pediatric clinic presenting with a typical picture…
- `all-characters-of-lingual-tonsil-except-0ee201de` — All characters of lingual tonsil except
- `all-characters-of-palatine-tonsil-except-42969d66` — All characters of palatine tonsil except
- `choose-the-correct-statement-about-pharyngeal-tonsil-0-9929dd81` — Choose the correct statement about pharyngeal! tonsil: 0
- `choose-the-correct-statement-about-pharyngeal-tonsil-fce585ae` — Choose the correct statement about pharyngeal tonsil:
- `choose-the-correct-statement-about-the-palatine-tonsil-7961b87c` — Choose the correct statement about the palatine tonsil:
- `concerning-palatine-tonsils-which-of-the-following-is-correc-2b7b1204` — Concerning palatine tonsils, which of the following is correct?
- `nasopharynx-04301511` — nasopharynx:
- `non-keratinized-stratified-squamous-epithelium-is-the-coveri-a6b12974` — Non keratinized stratified squamous epithelium is the covering of: |
- `the-lingual-tonsils-are-not-commonly-inflamed-because-84653f3a` — The lingual tonsils are not commonly inflamed because:
- `the-pharyngeal-tonsils-are-covered-by-47e66976` — The Pharyngeal tonsils are covered by

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

### A-V Connections (7)

- `during-anaphylactic-shock-release-of-which-substance-causes-87214129` — During anaphylactic shock, release of which substance causes vasodilation and in…
- `that-capillaries-can-withstand-high-internal-pressures-witho-57d4fc14` — That capillaries can withstand high internal pressures without bursting is expla…
- `the-capillaries-can-withstand-high-internal-pressure-without-75f7a208` — The capillaries can withstand high internal pressure without bursting is explain…
- `the-highest-pressure-inside-a-blood-vessel-is-present-in-a-p-cd85f021` — The highest pressure inside a blood vessel is present in: a Pulmonary vessels
- `thin-walled-capillaries-donot-burst-when-intracapillary-pres-286420f9` — Thin walled capillaries donot burst. when intracapillary pressure is increased w…
- `what-fraction-of-total-blood-volume-is-present-in-the-capill-f9b7cdfa` — What fraction of total blood volume is present in the capillaries at any given t…
- `which-of-the-following-is-characteristic-of-progressive-refr-ce2af6fc` — Which of the following is characteristic of progressive (refractory) hemorrhagic…

### Basic Mechanisms of Circulatory Control (6)

- `about-mediators-and-vasoactive-substances-all-of-the-followi-ac96f885` — About mediators and vasoactive substances, all of the following are true Except:
- `epistaxis-mean-6a48dc85` — Epistaxis mean:
- `it-is-correct-to-say-8f7e9d38` — It is correct to say
- `long-term-regulation-of-arterial-blood-pressure-is-done-by-4e2ec8e0` — Long term regulation of arterial blood pressure is done by
- `mean-systemic-filling-pressure-is-decreased-by-d3f1a38e` — Mean systemic filling pressure is decreased by:
- `which-of-the-following-is-not-a-vasodilator-metabolite-8da91769` — Which of the following is not a vasodilator metabolite?

### Veins (5)

- `choose-the-correct-statement-concerning-the-lymphatic-vessel-9d893940` — Choose the correct statement concerning the lymphatic vessels:
- `greatest-total-cross-sectional-area-a-aorta-1242be79` — Greatest total cross sectional area | a, Aorta |
- `in-progressive-hemorrhagic-shock-which-of-the-following-occu-649d7c04` — In progressive hemorrhagic shock, which of the following occurs? ~~’
- `regarding-brachiocephalic-veins-one-of-the-following-stateme-8aac4731` — Regarding brachiocephalic veins, one of the following statements is incorrect: ١
- `surface-receive-lymph-from-afferent-vessel-while-surface-whe-cfcfeed1` — surface receive lymph from afferent vessel, while ……… surface where vein, effere…

### Arteries (3)

- `stimulation-of-arterial-baroreceptors-causes-all-except-aafa1ea1` — Stimulation of arterial baroreceptors causes all, Except:
- `stimulation-of-atrial-stretch-receptors-produce-ecf90d1b` — Stimulation of atrial stretch receptors produce
- `under-normal-conditions-the-capillaries-95f54ee9` — Under normal conditions , the capillaries :

### Pulmonary Compliance (3)

- `concerning-compliance-of-large-arterial-blood-vessels-one-is-9eea479c` — Concerning compliance of large arterial blood vessels, one is true:
- `concerning-compliance-of-the-stomach-one-is-true-ec247c63` — Concerning compliance of the stomach, one is true:
- `which-one-can-increase-the-compliance-of-blood-vessels-3a01102d` — Which one can increase the compliance of blood vessels

### Vascular Function (3)

- `atrial-natriuretic-peptide-6fd6b3d3` — Atrial natriuretic peptide
- `which-combination-of-the-following-local-factors-leads-to-ar-c8779f94` — Which combination of the following local factors leads to arteriolar vasodilatat…
- `which-of-the-following-changes-would-not-occur-following-inh-ff65be24` — Which of the following changes would not occur following inhibition of angiotens…

### Gas exchange in the lung (2)

- `av-shunt-include-the-following-except-99b84173` — Av shunt include the following except
- `with-respect-to-gas-exchange-across-the-alveolar-membrane-e168f662` — With respect to gas exchange across the alveolar membrane:

### Mechanical Properties of Cardiac Muscle (2)

- `the-plasticity-of-the-urinary-bladder-is-explained-by-8bf89a19` — The plasticity of the urinary bladder is explained by:
- `the-poiseuille-law-is-concerned-with-which-of-the-following-501dd5db` — The Poiseuille law is concerned with which of the following factors:

### Spleen (2)

- `irregular-barrel-shape-that-lined-by-fenestrated-cells-non-c-43d8f714` — ……..... irregular barrel shape that lined by fenestrated cells, non Contineuos b…
- `trabeculae-divide-spleen-into-024bb379` — trabeculae divide spleen into

### The heart (1)

- `ecg-record-gives-valuable-information-about-all-of-the-follo-68820593` — ECG record gives valuable information about all of the following except: - ‏ظ‎ ‎…

## Unkeyed (needs cleaner scans)

175 bank row(s) have no printed/recovered answer at all (`answerConfidence: "none"`). Of those, 137 are still untouched — neither authored (no `answerOverride` on file) nor excluded — and are not counted in "remaining" above because there is no establishable answer to author against yet. They need a cleaner scan, a solved-book match, or an editorial ruling before they can be dispatched.

