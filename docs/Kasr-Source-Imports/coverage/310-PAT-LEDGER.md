# 310 PAT — coverage ledger (Year 3, Pathology & Pharmacology)

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| abolmagd-cvs Hypertension (Q1-18, `Pathology MCQ by Abolmagd [SOLVED].pdf`) | 18 | 0 | 0 | 0 | 18 |
| abolmagd-cvs Atherosclerosis (Q19-24, same paper) | 6 | 0 | 0 | 0 | 6 |
| abolmagd-cvs Atherosclerosis-2 (Q25-30, same paper) | 6 | 0 | 0 | 0 | 6 |
| abolmagd-cvs Atherosclerosis-3 (Q31-37, same paper) | 7 | 0 | 0 | 0 | 7 |
| abolmagd-cvs Blood Vessels / vasculitis (Q38-47, same paper) | 10 | 0 | 0 | 0 | 10 |
| abolmagd-cvs Aneurysms & Veins (Q48-65, same paper) | 15 | 0 | 3 | 0 (→ p.14+ next section) | 18 |
| **abolmagd-cvs cluster total** | **62** | **0** | **3** | untriaged | — |
| 310 PAT module (Pathology + Pharmacology sub-corpora) | 62 | 0 | 3 | untriaged | — |

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

## Next cluster

**Remaining on this paper:** the next Pathology section from **p.14+** (printed 13+ — Endocarditis /
Ischemia / Heart Diseases per the section map), then the **2008-2015 MCQ set (p.24+)** and Written
topics (p.26+, non-MCQ). **Untriaged in 310 PAT:** the rest of the Pathology sub-corpus
(`Pathology MCQs Dr Elnemr 2025.pdf`, `EOY - PAT 310 2024.pdf`, department "Other Useful" and Dr
Tarek folders) and the entire **Pharmacology** sub-corpus (`All 197 Qs answered by pharmaga.pdf`,
`Pharma MCQ by Abolmagd.pdf`, `PHARMA GITTTTTTT.pdf`, `Pharma RSPPPPP.pdf`) — pharmacology items
tag subject `pharm`.
