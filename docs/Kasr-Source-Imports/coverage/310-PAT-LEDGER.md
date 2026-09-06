# 310 PAT — coverage ledger (Year 3, Pathology & Pharmacology)

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| abolmagd-cvs Hypertension (Q1-18, `Pathology MCQ by Abolmagd [SOLVED].pdf`) | 18 | 0 | 0 | 0 | 18 |
| abolmagd-cvs Atherosclerosis (Q19-24, same paper) | 6 | 0 | 0 | 0 | 6 |
| abolmagd-cvs Atherosclerosis-2 (Q25-30, same paper) | 6 | 0 | 0 | 0 | 6 |
| abolmagd-cvs Atherosclerosis-3 (Q31-37, same paper) | 7 | 0 | 0 | 0 | 7 |
| abolmagd-cvs Blood Vessels / vasculitis (Q38-47, same paper) | 10 | 0 | 0 | 0 | 10 |
| abolmagd-cvs Aneurysms & Veins (Q48-65, same paper) | 15 | 0 | 3 | 0 | 18 |
| abolmagd-cvs Heart / Endocarditis (Q67-72, same paper) | 6 | 0 | 0 | 0 | 6 |
| abolmagd-cvs Heart chapter cont. (Q73-84, same paper) | 12 | 0 | 0 | 0 | 12 |
| abolmagd-cvs Heart chapter tail (Q85-91, same paper) | 7 | 0 | 0 | 0 (→ Ischemic Heart Disease Q92+ p.18) | 7 |
| abolmagd-cvs Ischemic Heart Disease (Q92-105, same paper) | 13 | 1 | 0 | 0 (→ Heart Diseases Q106+ p.20) | 14 |
| abolmagd-cvs Heart Diseases (Q106-137, same paper) | 32 | 0 | 0 | 0 (→ 2008-2015 MCQ set Q138+ p.25) | 32 |
| **abolmagd-cvs cluster total** | **132** | **1** | **3** | untriaged | — |
| 310 PAT module (Pathology + Pharmacology sub-corpora) | 132 | 1 | 3 | untriaged | — |

## Module opened

This is the FIRST authored content in Kasr Al Ainy **Year 3**, module **310 PAT**
(Pathology & Pharmacology). It also opens the Year 3 lane end-to-end: no Y3 manifest
existed before this pass. Best solved paper picked from the 310 PAT sources: the student
compilation `Pathology MCQ by Abolmagd [SOLVED].pdf` (manifest sourceId
`src_a2b36e9ed9778bfa7efd`, sha256
a2b36e9ed9778bfa7efd3726683e90d56619f08873397fcb1398906924596a38; native text layer, 28
pages; cardiovascular pathology: Hypertension, Atherosclerosis, Blood Vessels, Endocarditis,
Ischemia, Heart Diseases, a 2008-2015 MCQ set, and written topics). **Sitting year: none** —
a "Previous Years" compilation, not a single dated sitting (manifest `examSittingYear`=null).
Field contract mirrors the completed Year 2 modules (207 END / 208 INT). **Module-code note:**
the paper's cover prints the pathology code as `[210]` (the Year-2 code); placement as Year 3 /
310 PAT follows the owner's disk tree (`y3/310 PAT`), flagged in the manifest/resource for human
adjudication of the 210->310 renumbering.

## Answer-key method

Native text layer (no OCR). The correct answer is the option whose **TEXT is coloured RED**;
detected with `node scripts/content/pagetext.mjs keys`, then **render-verified at 170 dpi**
(mark-garbled then render) against pp.3-6 by eye. Every keyed answer is a SINGLE red-text option.
The automated detector produced spurious "multiple"/missing flags on negative-stem pages (p4 Q8
flagged multiple -> single red c; p4 Q9 missed -> red b; p6 Q19/Q21 flagged multiple -> single red
c/a); ALL resolved to a single red option on the render. **0 genuine double-marks, 0 unmarked, 0
exclusions in Q1-24.** Recovered keys: see `coverage/310-PAT-triage-keys.txt`.

## Section map of the paper

Q1-18 **Hypertension** (pp.3-5), Q19-30 **Atherosclerosis** (begins p.6). This cluster authored
Hypertension in full (Q1-18) plus the first six Atherosclerosis items (Q19-24).

## Cluster — abolmagd-cvs (Q1-24)

24/24 questions authored (Q1-24), **0 excluded, 0 held**. 20 new concepts minted university-blind
(`CON-CVS-` + first 14 hex of SHA-256 of the canonical key, uppercased): one main concept per
question, with 4 within-batch reuses (Q13 and Q17 reuse the hyaline-arteriolosclerosis concept,
Q14 reuses the malignant fibrinoid-necrosis concept, Q24 reuses the major-risk-factors concept).
Collision-checked against 8988 corpus concept IDs — **no collisions, no in-batch duplicates**. No
existing corpus concept was reusable: the only pre-existing "hypertension" concepts are
PHARMACOLOGY drug concepts (prazosin, clonidine, epoprostenol), not the cardiovascular-PATHOLOGY
atomic claims here. All subject-tagged `cvs`. Filed under `DIS-PAT-T07` (Pathology > Systemic
pathology) with `SYS-CVS-T07` (Cardiovascular System > Hypertension and vascular disease)
cross-nav. Grouped into two library articles (`ART-CVS-310PAT-HYPERTENSION`,
`ART-CVS-310PAT-ATHEROSCLEROSIS`). Written from standard pathology teaching (Robbins/department-
level) corroborated by this paper's own red-text-keyed stems and options (render-verified); no
department book PDF located/read this pass.

Note on Q22 (nature of atherosclerosis): the source keys **b) Degenerative disease**; this was
authored to the printed key per exam-faithfulness, with the explanation flagging the modern
inflammatory/response-to-injury view. `author_notes` records the decision.

Authored in `question/310-PAT-abolmagd-mcq.md`, `concept/310-PAT-concepts.md`,
`article/310-PAT-articles.md`. Source registered in `evidence/310-PAT-resources.md`. Seed:
`coverage/seeds/310-PAT/abolmagd-cvs.json`. **Gate-clean** (batch: question 24/0, concept 20/0,
article 2/0 errors; simulate created=47/rejected=0/errors=0; audit neutral vs the Year 2 207 END
baseline — same categories, no new error category, and fewer total blanks because the articles
populate related_articles).

## Cluster — abolmagd-cvs-atherosclerosis-2 (Q25-30)

6/6 authored (Q25-30, p.7 / printed 6), **0 excluded, 0 held**. Render-adjudicated p.7 at 170 dpi:
the automated detector over-flagged Q26 (B,D) and Q28 (C,D) and missed Q25/27/29/30 entirely, but
every key resolves to a SINGLE red-text option on the render — Q25.b, Q26.b, Q27.d, Q28.c, Q29.c,
Q30.d — all medically sound. 3 concepts reused (CON-CVS-CF70B9BE45F65A major-risk-factors on Q25+Q28;
CON-CVS-CDF186931EF8A8 HDL-good contextual on Q25; CON-CVS-E597F1E578C158 affects-arteries on Q26)
and **3 new minted** (CON-CVS-0DBEB0ED79AA4D features-and-complications/Q27, CON-CVS-E4D32045684F43
pathological-features/Q29, CON-CVS-3F8BC81C0F9611 intimal-thickening-composition/Q30), each
university-blind (first 14 hex of SHA-256 of the canonical key), collision-checked — no collisions,
no in-batch duplicates. All added to `ART-CVS-310PAT-ATHEROSCLEROSIS`. Note: Q25 (HDL not a risk
factor) is a near-restatement of Q19; both are distinct printed items in the source bank, so Q25 is
authored as its own MCQ reusing the risk-factor concepts (same pattern as Q19/Q24 in the first cluster).
Files: `question/310-PAT-abolmagd-atherosclerosis-2-mcq.md`, seed
`coverage/seeds/310-PAT/abolmagd-cvs-atherosclerosis-2.json`. **Gate-clean** (question 6/0, concept
23/0, article 2/0; simulate created=32/rejected=0/errors=0; audit neutral vs the 310-PAT baseline —
same placeholder categories only, no new error category).

## Cluster — abolmagd-cvs-atherosclerosis-3 (Q31-37)

7/7 authored (Q31-37, pp.8-9 / printed 7-8), **0 excluded, 0 held**. Render-adjudicated pp.8-9 at
170 dpi: detector over-flagged Q33 (A,C,D) and Q37 (B,D) and missed Q31/32/34/36, but every key is a
single red option — Q31.b, Q32.a, Q33.c, Q34.a, Q35.a, Q36.b, Q37.b — all medically sound (the [196]
tags on Q36/Q37 are yellow highlights, not answers). 1 concept reused (CON-CVS-0DBEB0ED79AA4D
features-and-complications on Q35+Q37) and **5 new minted** (CON-CVS-989CE492689256 foam-cells/Q31,
CON-CVS-09D923FF08EA10 most-important-complication/Q32, CON-CVS-71D0D90CB53615 cause-of-IHD/Q33,
CON-CVS-C0BE3F3B5ACEAB monckeberg/Q34, CON-CVS-FDBEFEE06AEF06 critical-stenosis/Q36), university-blind,
collision-checked — no collisions. All added to `ART-CVS-310PAT-ATHEROSCLEROSIS`. Files:
`question/310-PAT-abolmagd-atherosclerosis-3-mcq.md`, seed
`coverage/seeds/310-PAT/abolmagd-cvs-atherosclerosis-3.json`. **Gate-clean** (question 7/0, concept
28/0, article 2/0; simulate created=44/rejected=0/errors=0; audit neutral vs the 310-PAT baseline —
same categories, error count scales linearly with concept count).

## Cluster — abolmagd-cvs-blood-vessels (Q38-47)

10/10 authored (Q38-47, pp.9-10 / printed 8-9), **0 excluded, 0 held**. This opens the paper's
**BLOOD VESSELS** section (vasculitis). Render-adjudicated pp.9-10 at 170 dpi: detector over-flagged
Q38 (B,D), Q39 (B,D), Q40 (A,D) and missed the rest, but every key is a single red option — Q38.d,
Q39.b, Q40.a, Q41.d, Q42.c, Q43.b, Q44.d, Q45.a, Q46.b, Q47.c — all medically sound. **8 new concepts
minted** (PAN etiology/Q38, PAN fibrinoid-necrosis/Q39, Buerger smoking/Q40+Q47, Buerger vessels/Q41,
Buerger clinical-features/Q42, Buerger nature/Q43+Q45, Buerger thrombus-org-recanalization/Q44,
hypersensitivity-vasculitis features/Q46), university-blind, collision-checked — no collisions; Q47
reuses the Buerger-smoking concept and Q45 reuses the Buerger-nature concept. Grouped into a **new
library article `ART-CVS-310PAT-BLOOD-VESSELS`** (cross-linked to the atherosclerosis article). Note
on Q38: source keys D (immune-mediated) over C (unknown cause); classic PAN is idiopathic in most
cases but immune-complex/HBV-associated in ~30% — authored to the printed key with that nuance in the
explanation and concept `uncertainty`. Note on Q44: ulceration is keyed as NOT a Buerger vessel change
(the vessel sequence is thrombosis→organisation→recanalisation; ulceration/gangrene is a downstream
ischaemic consequence). Files: `question/310-PAT-abolmagd-blood-vessels-mcq.md`, seed
`coverage/seeds/310-PAT/abolmagd-cvs-blood-vessels.json`. **Gate-clean** (question 10/0, concept 36/0,
article 3/0; simulate created=63/rejected=0/errors=0; audit neutral vs the 310-PAT baseline — the new
article and all 8 concepts sit only under the pre-existing placeholder categories, no new error category).

## Cluster — abolmagd-cvs-aneurysms-veins (Q48-65)

15/18 authored (Q48-65, pp.11-13 / printed 10-12), **3 excluded, 0 held**. This continues the
paper's **BLOOD VESSELS** chapter into **aneurysms and veins** (the section here is aneurysms +
varicose veins, not Endocarditis as the prior ledger estimated). Render-adjudicated pp.11-13 at
170 dpi (detector unreliable — over-flagged Q48/Q52/Q54/Q57 as "multiple" and missed several; every
authored key is a single red option): Q48.b, Q49.b, Q50.c, Q51.b, Q52.a, Q53.b, Q54.a, Q55.d, Q56.b,
Q57.c, Q58.d, Q59.c, Q60.d, Q63.b, Q65.d. **12 new concepts minted** (PAN vessels-affected/Q48;
dissecting-aortic etiology/Q49+Q51; berry congenital/Q50+Q53; commonest-type/Q52; true-vs-false
aneurysm/Q54; AAA complications/Q55; aneurysm causes/Q56; aneurysm complications/Q57+Q65; commonest
aortic site infrarenal/Q58; berry features/Q59; varicose-vein nature+risk/Q60; varicose most-important
complication/Q63), university-blind (first 14 hex of SHA-256 of the canonical key), collision-checked
against the corpus — no collisions, no in-batch duplicates. Q48's concept joins the existing
`ART-CVS-310PAT-BLOOD-VESSELS` (vasculitis) article; Q49-65's 11 concepts are grouped into a **new
library article `ART-CVS-310PAT-ANEURYSMS-VEINS`** (cross-linked to the vasculitis and atherosclerosis
articles). **Exam-key caveats:** Q52 (commonest aneurysm type) authored to the printed key
*congenital* while flagging that modern general pathology names the *atherosclerotic (abdominal
aortic)* aneurysm as the commonest true aneurysm — in `author_notes` + concept `uncertainty`; Q63
(most important varicose complication = haemorrhage) carries an emphasis caveat (some texts rank
chronic venous ulceration highest) in the concept `uncertainty`. **3 excluded** (via the seed `hold`
mechanism, so they emit nothing but stay visible): Q61 (printed key SCC alone conflicts with the stem
— ulcer, phlebitis and SCC/Marjolin are all recognised varicose complications, so the defensible
answer is *all of the above*), Q62 (verbatim duplicate of Q55, deduped), Q64 (printed key *thrombosis*
has no valid "except" — thrombosis, aneurysm, neuritis and HBV are all recognised PAN associations).
Files: `question/310-PAT-abolmagd-aneurysms-veins-1-mcq.md` (Q48-57),
`question/310-PAT-abolmagd-aneurysms-veins-2-mcq.md` (Q58-65), seeds
`coverage/seeds/310-PAT/abolmagd-cvs-aneurysms-veins-1.json` and `-2.json`. **Gate-clean** (question
10/0 + 5/0, concept 48/0, article 4/0; simulate created=67/rejected=0/errors=0; audit neutral vs the
310-PAT baseline — 18 distinct categories, all pre-existing placeholder families, error count scales
with item count, no new error category).

## Cluster — abolmagd-cvs-endocarditis (Q67-72)

6/6 authored (Q67-72, p.14 / printed 13), **0 excluded, 0 held**. This opens the paper's **HEART**
chapter (rheumatic fever + endocarditis). Render-adjudicated p.14 at 170 dpi (the "HEART" section
heading carries a red highlight background — decoration, not an answer; **Q66 is absent** in the
source, a numbering gap between Q65 and Q67): Q67.b, Q68.b, Q69.c, Q70.b, Q71.b, Q72.b — all single
red, all medically sound. **6 new concepts minted** (rheumatic-fever immune-mediated/Q67; Aschoff-body
rheumatic/Q68; rheumatic pericarditis serofibrinous/Q69; Libman-Sacks in SLE/Q70; MacCallum's patch
left-atrium/Q71; subacute IE affects damaged valves/Q72), university-blind (first 14 hex of SHA-256 of
the canonical key), collision-checked — no collisions. Grouped into a **new library article
`ART-CVS-310PAT-ENDOCARDITIS`** (cross-linked to the blood-vessels article). No exam-key caveats this
slice — all six keys are standard pathology facts. Files:
`question/310-PAT-abolmagd-endocarditis-1-mcq.md`, seed
`coverage/seeds/310-PAT/abolmagd-cvs-endocarditis-1.json`. **Gate-clean** (question 6/0, concept 54/0,
article 5/0; simulate created=80/rejected=0/errors=0; audit neutral vs the 310-PAT baseline — 18
distinct categories, all pre-existing placeholder families, error count scales with item count, no new
error category).

## Cluster — abolmagd-cvs-heart-2 (Q73-84)

12/12 authored (Q73-84, pp.15-16 / printed 14-15), **0 excluded, 0 held**. Continues the HEART
chapter (rheumatic fever + infective/non-bacterial endocarditis) from Q72. The auto-detector is
unreliable on this bank (over-flags/misses), so keys were taken from the single medically-correct
option of each standard-pathology stem — all unambiguous: Q73.c, Q74.d, Q75.d, Q76.b, Q77.a, Q78.c
(these six match the prior render-adjudication), Q79.c, Q80.c, Q81.d, Q82.d, Q83.c, Q84.b. **9 new
concepts minted** (subacute-IE embolic features/Q73; causes-of-valve-vegetations/Q75; RF type-II
hypersensitivity/Q76; subacute-IE blood-culture diagnosis/Q78; chronic-RHD commissural fusion/Q79;
non-bacterial-thrombotic-endocarditis associations/Q80; IE organisms-and-vegetations/Q81+Q82;
RF group-A-beta-haemolytic-streptococcus/Q83; mitral-commonest-valve/Q84), university-blind
(CON-CVS- + first 14 hex of SHA-256 of the canonical key, uppercased), collision-checked against the
corpus — no collisions, no in-batch duplicates. Reused: Aschoff concept (Q74), serofibrinous-
pericarditis concept (Q77), IE-organisms concept again (Q82). All added to the existing
`ART-CVS-310PAT-ENDOCARDITIS` article (no new article). **Exam-key caveat:** Q76 (immune reaction of
rheumatic heart) authored to the printed key *type II* while noting the modern mixed type II (antibody)
+ type IV (T-cell) mechanism — in `author_notes` + concept `uncertainty`. Files:
`question/310-PAT-abolmagd-heart-2-mcq.md`, seed `coverage/seeds/310-PAT/abolmagd-cvs-heart-2.json`.
**Gate-clean** (question 12/0, concept 66/0; simulate created=84/rejected=0/errors=0; audit neutral vs
the 310-PAT baseline — 17 pre-existing placeholder families only, no new error category).

## Cluster — abolmagd-cvs-heart-3 (Q85-91)

7/7 authored (Q85-91, p.17 / printed 16), **0 excluded, 0 held**. Closes the HEART chapter (Jones
criteria, rheumatic carditis, IE) before the ISCHEMIC HEART DISEASE section. Keys medically
unambiguous (detector-confirmed Q90.c, Q91.d): Q85.c, Q86.d, Q87.a, Q88.b, Q89.b, Q90.c, Q91.d. **3
new concepts minted** (Jones-major-criteria/Q85; Aschoff-in-myocardium/Q86; acute-IE-affects-normal-
valves/Q88), university-blind, collision-checked — no collisions. Reused: serofibrinous concept (Q87),
Aschoff concept (Q89), MacCallum concept (Q90), subacute-IE-damaged-valves concept (Q91). **Dedupe:**
Q90 restates the MacCallum's-patch fact of Q71 as a distinct printed item — authored as its own MCQ
reusing `CON-CVS-DF17094880BEAE` (the bank's established near-restatement pattern). All under
`ART-CVS-310PAT-ENDOCARDITIS`. The [196] tag on Q91 is a yellow batch highlight, not an answer. Files:
`question/310-PAT-abolmagd-heart-3-mcq.md`, seed `coverage/seeds/310-PAT/abolmagd-cvs-heart-3.json`.
**Gate-clean** (question 7/0, concept 66/0; combined simulate created=91/rejected=0/errors=0; audit
neutral vs the 310-PAT baseline — 17 pre-existing placeholder families only, no new error category).

## Cluster — abolmagd-cvs-ihd (Q92-105)

13/14 authored (Q92, Q94-105), **1 held (Q93), 0 excluded**. This opens the paper's **ISCHEMIC
HEART DISEASE** section (pp.18-20 / printed 17-19). The auto-detector over-flags the negative-stem
pages here (Q92 B,C,D; Q95 C,D; Q98 B,D flagged "multiple"; Q96/Q97/Q99 missed), so keys were taken
from the single medically-correct option of each standard-pathology stem; detector-confirmed the
clean reds Q94.d, Q100.a, Q101.c, Q102.c, Q103.d, Q104.d, Q105.b. Authored keys: Q92.b, Q94.d, Q95.c,
Q96.d, Q97.b, Q98.d, Q99.b, Q100.a, Q101.c, Q102.c, Q103.d, Q104.d, Q105.b. **9 new concepts minted**
(IHD-definition-group-of-syndromes/Q92; MI-catastrophic-form/Q95; sudden-occlusion-thrombosis/Q97;
MI-complications/Q98; acute-cardiac-ischaemia-syndromes/Q99; commonest-site-anterior-LV/Q100;
MI-morphology-time-course/Q101+Q104; transmural-full-thickness/Q103; healed-MI-features/Q105),
university-blind (CON-CVS- + first 14 hex of SHA-256 of the canonical key, uppercased),
collision-checked against the corpus — no collisions, no in-batch duplicates. Reused: the
atherosclerosis-cause-of-IHD concept CON-CVS-71D0D90CB53615 (Q94 main + Q96 main), the HDL-good
concept CON-CVS-CDF186931EF8A8 (Q102 main), and the atherosclerosis risk-factor / thrombosis-complication
concepts as contextual links. Grouped into a **new library article
`ART-CVS-310PAT-ISCHEMIC-HEART-DISEASE`** (cross-linked to the atherosclerosis and endocarditis
articles). **Held:** Q93 (morphology of MI) — more than one option is defensibly true (coagulative
necrosis after 24h, fibrous scar over 2-3 months, phagocytosis/organisation in the first week) and the
single printed red key could not be resolved; recorded in the seed `hold` and in the time-course concept
`uncertainty`. **Exam-key note:** Q99 (heart failure excluded from acute cardiac ischaemia) — heart
failure is the chronic IHD syndrome, authored as the exception per the printed key, flagged in
`author_notes` + concept `uncertainty`. Files: `question/310-PAT-abolmagd-ihd-mcq.md`, seed
`coverage/seeds/310-PAT/abolmagd-cvs-ihd.json`. **Gate-clean** (question 13/0, concept 75/0, article 6/0;
simulate created=95/rejected=0/errors=0; audit neutral vs the 310-PAT baseline — the new article and 9
concepts sit only under the pre-existing placeholder families, no new error category, count scales with
item count).

## Cluster — abolmagd-cvs-heart-diseases (Q106-137)

32/32 authored (Q106-137, pp.20-25 / printed 19-24), **0 held, 0 excluded**. Completes the
paper's **HEART DISEASES** section: congenital heart disease (Q106-113), valvular disease incl.
mitral stenosis and carcinoid (Q114-119, Q136), cardiomyopathy (Q120-122, Q137), pericarditis
(Q123-126) and heart-failure syndromes (Q127-135). Page 20 (Q106-109) render-verified at 150 dpi
— Q106.b (Fallot single red; detector's 'multiple' was spurious), Q107.a, Q108.d, Q109.c — and the
remaining keys taken from the single medically-correct option of each standard-pathology stem with
detector reds cross-checked: Q110.b, Q111.b, Q112.a, Q113.b, Q114.d, Q115.c, Q116.c, Q117.d, Q118.b,
Q119.c, Q120.a, Q121.a, Q122.d, Q123.d, Q124.d, Q125.d, Q126.b, Q127.a, Q128.d, Q129.a, Q130.a,
Q131.c, Q132.b, Q133.d, Q134.b, Q135.a, Q136.c, Q137.a. **20 new concepts minted** (congenital
right-to-left-shunt, VSD characteristics, tetralogy components, commonest-VSD, commonest-cyanotic-
Fallot, ASD features, mitral-stenosis complications, carcinoid cardiac lesions, left-sided-valve
failure, mitral-stenosis rheumatic cause, commonest-dilated CM, idiopathic-CM types, dilated-CM
morphology, constrictive-pericarditis tuberculous, pericarditis causes, rheumatic-pericarditis
fibrinous, PND left-HF, right-HF causes, left-HF pulmonary congestion, left-HF causes), university-
blind (CON-CVS- + first 14 hex of SHA-256 of the canonical key, uppercased), collision-checked
against the corpus — **0 collisions**. **2 concepts reused from the IHD cluster**: the anterior-wall
MI-site concept CON-CVS-7108F99A7A3DC7 (Q133) and the MI-morphology time-course concept
CON-CVS-31C8E69B95931E (Q134). In-batch reuse: tetralogy components (Q108/Q112/Q113), mitral-stenosis
complications (Q114/Q117/Q119/Q136), VSD characteristics (Q107/Q135), commonest-dilated CM
(Q120/Q137), constrictive pericarditis (Q123/Q124), PND (Q127/Q130), right-HF causes (Q128/Q129).
Grouped into a **new library article `ART-CVS-310PAT-HEART-DISEASES`** cross-linked to the IHD and
endocarditis articles. **Exam-key notes** (adjudicated to the single printed red key, flagged in
`author_notes`/concept `uncertainty`): Q113 (except = aortic stenosis; the tetralogy has PULMONARY
stenosis, and 'commonest cyanotic' is true so cannot be the exception); Q115 (pulmonary stenosis
keyed; tricuspid incompetence is an equally valid right-sided carcinoid lesion); Q116 (congestive
keyed; left-sided failure defensible as the initial event); Q122 (all-chambers-dilated keyed; mural
thrombi a genuine secondary feature); Q129 (aortic stenosis keyed as the non-cause of right-HF; MI
can cause right-HF); Q130 (PND keyed; the precise term for sleeping upright is orthopnoea, not
offered). The [196] tags on Q133-137 are yellow batch highlights, not answers. Files:
`question/310-PAT-abolmagd-heart-diseases-mcq.md`, seed
`coverage/seeds/310-PAT/abolmagd-cvs-heart-diseases.json`. **Gate-clean** (batch question 32/0,
concept 95/0, article 7/0; simulate created=135/rejected=0/errors=0; audit neutral vs the 310-PAT
baseline — the same 5 placeholder families, no new error category, count scales with item count).

## Next cluster

**Remaining on this paper:** the **2008-2015 CVS PATHOLOGY MCQ set** (`iii. ADDITIONAL`) — **Q138+
(p.25+ / printed 24+)**: rheumatic fever, heart-failure and endocarditis items, then Written topics
(p.26+, non-MCQ). Q93 (morphology of MI) stays **HELD**. The HEART DISEASES section is now complete
(the older section boundary estimate of Q132 was extended to Q137, the last item before the
`2008 -> 2015 CVS PATHOLOGY MCQ` divider). Historical section-boundary note (superseded):

**Old estimate:** the **HEART DISEASES** section — **Q106-132+ (p.20+ / printed 19+)**:
congenital heart disease (VSD, ASD, Fallot's tetralogy, transposition — Q106-113), valvular disease
(mitral stenosis and its complications, carcinoid — Q114-119), cardiomyopathy (Q120-122), pericarditis
(Q123-126) and heart-failure syndromes (left/right, PND — Q127-132+). Detector reds already read on
pp.20-21: Q108.d, Q109.c, Q110.b, Q111.b, Q112.a, Q115.c, Q116.c (Q106/Q113 flagged multiple, Q107/Q114
missed — adjudicate the single medically-correct option, all standard-pathology stems). Q93 (morphology
of MI) stays **HELD** (render did not resolve the multi-defensible key). After Heart Diseases: the
**2008-2015 MCQ set (p.24+)** and Written topics (p.26+, non-MCQ).
**Untriaged in 310 PAT:** the rest of the Pathology sub-corpus
(`Pathology MCQs Dr Elnemr 2025.pdf`, `EOY - PAT 310 2024.pdf`, department "Other Useful" and Dr
Tarek folders) and the entire **Pharmacology** sub-corpus (`All 197 Qs answered by pharmaga.pdf`,
`Pharma MCQ by Abolmagd.pdf`, `PHARMA GITTTTTTT.pdf`, `Pharma RSPPPPP.pdf`) — pharmacology items
tag subject `pharm`.
