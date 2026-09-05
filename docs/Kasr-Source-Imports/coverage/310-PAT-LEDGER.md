# 310 PAT — coverage ledger (Year 3, Pathology & Pharmacology)

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| abolmagd-cvs Hypertension (Q1-18, `Pathology MCQ by Abolmagd [SOLVED].pdf`) | 18 | 0 | 0 | 0 | 18 |
| abolmagd-cvs Atherosclerosis (Q19-24, same paper) | 6 | 0 | 0 | 6 (Q25-30) | 12 |
| **abolmagd-cvs cluster total** | **24** | **0** | **0** | untriaged | — |
| 310 PAT module (Pathology + Pharmacology sub-corpora) | 24 | 0 | 0 | untriaged | — |

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

## Next cluster

**Remaining on this paper:** Q25-30 Atherosclerosis (p.7) — Q26 and Q28 are detector-ambiguous
(negative stems), so **render-adjudicate p.7 before authoring**. Then Blood Vessels (p.8+),
Endocarditis (p.13+), Ischemia (p.17+), Heart Diseases (p.19+), the 2008-2015 MCQ set (p.24+), and
Written topics (p.26+, non-MCQ). **Untriaged in 310 PAT:** the rest of the Pathology sub-corpus
(`Pathology MCQs Dr Elnemr 2025.pdf`, `EOY - PAT 310 2024.pdf`, department "Other Useful" and Dr
Tarek folders) and the entire **Pharmacology** sub-corpus (`All 197 Qs answered by pharmaga.pdf`,
`Pharma MCQ by Abolmagd.pdf`, `PHARMA GITTTTTTT.pdf`, `Pharma RSPPPPP.pdf`) — pharmacology items
tag subject `pharm`.
