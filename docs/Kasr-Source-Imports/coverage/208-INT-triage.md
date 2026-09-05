# 208 INT — first-module triage (S1)

**Scope of this pass:** one paper — `EOM - End of INT - 208 2023 195 With Answers.pdf`
(2023 sitting, 120 MCQs, fully keyed — see `208-INT-triage-keys.txt`). 208 INT carries
24 tier 1-3 papers total (`coverage/KAU-Y2-priority-sources.md`); the other 23 are not
yet triaged — this is a first pass to size the module and pick a representative slice,
not the whole module's S1.

Every hit below is from `node "Instruction Manual for Content Creation/tools/find-existing.mjs"
"<term>"` against the live library plus every `docs/*-Source-Imports/concept/` and
`docs/import-ready/concept/` file. Live = a hit tagged `live concept`/`live citation`.
Pending = a hit only in an unimported `docs/*/concept/*.md` or `docs/import-ready/concept/*.md`
file. New = no hit — `find-existing.mjs` itself reported "Safe to create one."

## Concept clusters (56 distinct concepts from 120 questions)

| # | Concept cluster | Questions | Status | Existing hit (if any) |
|--:|---|---|---|---|
| 1 | Chemotaxis & macrophage biology in acute inflammation | 1,2,11,12 | **live** | `CON-IMM-6047D47CEF7FE2`, `CON-IMM-96D7626B256F92` (chemotaxis); macrophage/repair concepts in the same search |
| 2 | Types of acute/suppurative inflammation (abscess, cellulitis, pseudomembranous) | 3,4 | new | — |
| 3 | Granuloma composition | 5 | pending | 10 hits incl. `CLM-INF-8658F6CDBBB685` |
| 4 | Granulation tissue | 6 | new | — |
| 5 | Healing by regeneration vs. fibrosis, wound-healing complications | 7,8,9 | new | — |
| 6 | Chronic inflammation cell types | 13 | new | — |
| 7 | Sinus/fistula definitions | 14 | new | — |
| 8 | Tumor markers (PSA, cytokeratin, AFP, calcitonin) | 15,27 | new | — |
| 9 | Chemical/viral carcinogens (aflatoxin, EBV, HPV) | 16,17,54 | pending (HPV only) | `CIT-0C3A4C9CA62E07` — HPV/genital warts citation |
| 10 | Oncogenes / tumor-suppressor genes | 18,19,23 | new | — |
| 11 | Disordered-growth terms (metaplasia/hyperplasia/dysplasia/atrophy/hypertrophy) | 20,21,29,30 | new | — |
| 12 | Cancer cachexia | 22 | new | — |
| 13 | Leukoplakia | 24 | new | — |
| 14 | Tumor differentiation / anaplasia grading | 25,32 | new | — |
| 15 | Embryonic tumors | 26 | new | — |
| 16 | Carcinoma in situ | 28 | new | — |
| 17 | Hematogenous spread of tumors / sarcoma biology | 31,33 | new | — |
| 18 | Edema causes | 34 | new | — |
| 19 | Congestion | 35 | new | — |
| 20 | Virchow's triad / thrombosis / thrombus propagation | 36,41,42 | pending | 20 hits, none an exact match — nearest is `103-BMS-EOY-2024-biochemistry-written.md` (unrelated case) |
| 21 | Pulmonary/systemic embolism | 37,38 | pending | 13 hits, nearest `AU-MED-103-physiology-mcq.md` (Alexandria, pending) |
| 22 | Ischemia/infarction (chronic ischemia, gangrene, pale vs. red infarcts) | 39,40,43 | pending | 40 hits, nearest `108-INT-practical.md` "renal infarction with coagulative necrosis" — same idea, different angle |
| 23 | Septicemia / toxemia / pyemia / bacteremia | 44,51 | new | — |
| 24 | Tuberculosis (primary site, fibrocaseous, intestinal) | 45,47,48 | pending | 29 hits, nearest `108-INT-concepts-pathology.md` "caseation necrosis" |
| 25 | Syphilis | 46 | new | — |
| 26 | Leprosy | 49 | new | — |
| 27 | Actinomycosis | 50 | new | — |
| 28 | AIDS — opportunistic infection & associated neoplasms | 52,53 | new | (the raw "AIDS" search hit was an unrelated 102-INT mRNA concept — false positive, not real coverage) |
| 29 | Bilharziasis (hepatic, rectal, pulmonary) | 55,56,57 | pending | 4 hits, nearest `101-ISK-mcq-concepts.md` aliases |
| 30 | Papanicolaou stain / cytology | 58 | new | — |
| 31 | Radiation injury syndromes | 59 | new | — |
| 32 | Pellagra | 60 | new | — |
| 33 | Pharmacokinetic dosing factors (age, route, organ function) | 61 | new | — |
| 34 | Volume of distribution calculation | 62 | pending | 26 hits, nearest `108-INT-EOY-mcq.md` "Interpreting a volume of distribution of 4 litres" — same skill, different numbers |
| 35 | Clearance / infusion-rate calculation | 63 | pending | 64 hits (mostly unrelated "clearance" text) — worth a second, narrower pass before minting |
| 36 | Half-life / time to steady state | 64 | pending | 14 hits, nearest `108-INT-EOY-written.md` "plasma half-life" |
| 37 | Cholinergic agonists & anticholinesterases (mechanism, Alzheimer's use) | 65,66,67,72 | pending | `103-BMS-mcq-vitamins-nerve-concepts.md` — anticholinesterase/myasthenia, adjacent not identical |
| 38 | Organophosphorus poisoning & atropine pharmacology | 68,69,70,71,73,74 | new | — |
| 39 | Neuromuscular blocker reversal (sugammadex) | 75 | new | — |
| 40 | Adrenergic agonists (phenylephrine, dobutamine, dopamine) | 76,77,78 | new | — |
| 41 | Beta-blockers (selectivity, carvedilol, masking hypoglycemia, drug interactions) | 79,80,81,94,103 | new | (generic "adrenergic receptor" pending hit is not beta-blocker-specific) |
| 42 | Alpha-blockers (prazosin) | 82 | new | — |
| 43 | Antiemetics / antihistamines | 83,84 | new | — |
| 44 | Angiotensin II physiology | 85 | pending | 17 hits, nearest `104-CPS-glossary.md` "Renin-angiotensin system" term entry |
| 45 | Diuretics (thiazide, loop, K-sparing, mannitol, ototoxicity) | 86,87,88,89,90,91 | new | — |
| 46 | Positive inotropy without vasoconstriction (PDE inhibitors) | 92 | new | — |
| 47 | Antianginal drugs (ivabradine, nitrates, nicorandil, CCBs) | 93,95,96,97,98,99,100 | new | — |
| 48 | Antihypertensives (clonidine, hydralazine, nitroprusside) | 101,104,105 | new | — |
| 49 | ACE inhibitors (adverse effects, renal excretion) | 102,107 | pending | 3 hits, nearest `SYS-RES-CONCEPT-MOVE-001.md` (import-ready, cough side effect only) |
| 50 | Cardiac glycosides / digitalis (mechanism, toxicity, AFib use) | 108,109,110 | pending | 3 hits, nearest `SYS-REN-CONCEPT-MOVE-001.md` (adrenaline-digitalis interaction, not the concept itself) |
| 51 | Newer heart-failure drugs (sacubitril, levosimendan) | 111,112 | new | — |
| 52 | Antiarrhythmics (lidocaine, amiodarone) | 113,114 | new | (glossary-only "Antiarrhythmic" term hit is not concept coverage) |
| 53 | Lipid-lowering drugs (ezetimibe; statins/fibrates and gallstones) | 115,116 | new | — |
| 54 | Anticoagulants (heparin/HIT, argatroban, DOACs) | 117,120 | pending | 33-75 hits across `102-INT-physiology-concepts.md` (heparin, warfarin) |
| 55 | Thrombolytics (alteplase) | 118 | new | — |
| 56 | Antiplatelet drugs (clopidogrel, ticagrelor) | 119 | new | — |

## Checkpoint table (13-orchestration.md §5 format)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| 208 INT (1 of 24 papers) | 120 | 120 | 56 | 1 | 15 | 40 | see below |

**Placement for new (coarse, by cluster group — not yet per-concept):**
- General pathology mechanisms (clusters 2,4,5,6,7,10,11,12,13,14,15,16,17,18,19,23,30,31,32) —
  candidate subject `fnd` (Foundations), matching where Year 1's general-pathology material
  sits; needs a placement ruling before minting, not assumed here.
- Infections (25,26,27,28) — candidate subject `inf`.
- Cardiovascular/renal pharmacology (38,39,40,41,42,43,45,46,47,48,51,52,53,55,56) —
  candidate subject `pharm`; whether it needs an explicit body-system suffix the way
  101 ISK's pharm concepts do (`LANE-CARD.md` §7) is **not decided for 208 INT** — flagged,
  not resolved.
- Oncology basics (8) — candidate subject `fnd` or a dedicated oncology micro-topic; not
  decided.

## What this pass does NOT cover

- The other 23 tier 1-3 papers for 208 INT (7 orientation, ~14 more EOM/EOY, 2 Baqoon) —
  untriaged. Several are visually garbled (0 native words: `EOM - {INT - 208} 198.pdf`,
  `EOM - INT - 208 2023 195.pdf`, `EOY - 208 197 written 1st.pdf`, `EOY - {INT-208}
  198.pdf`) and will need `pagetext.mjs ocr` before they can be triaged at all.
- Tier 4 (department books, 2 files) and tier 5 (banks, 10 files) are not triaged; they
  are typically higher-volume, lower-signal than a keyed exam paper and are usually
  triaged after the paper set, per `13-orchestration.md` §4's S1 ordering.
- No concept, article or question record has been minted from any of the above — Phase 0
  triages and reports; nothing here is authored. **Minting starts only after
  "TRIAGE APPROVED."**

## Second paper (lane 4, S1 continued): 2024 EOM

`EOM - End of Module INT-208 2024 ANS .pdf` (2024 sitting, 120 MCQs, 119/120 keyed by
green highlight annotation — see `208-INT-triage-keys.txt`'s second section). Read in
full (all 25 pages, native text layer, no OCR needed) to size the paper against the 2023
one and pick a representative authoring slice, not to author the whole paper in one pass.

**Composition, by rough count against the 2023 EOM paper already authored:** roughly a
third of this paper's 120 questions are near-literal duplicates of 2023 EOM items (same
stem and options, different letter order or light rewording — e.g. Q26 "Chemotaxis is…"
restates 2023's Q1; Q38/39/44/45 restate 2023's Q34/35/37/38 on edema/congestion/emboli);
roughly another third retest concepts the 2023 batch already minted, from a different
angle or a harder clinical-vignette framing (reused directly, no new mint); the remaining
third is genuinely new content this module has not tested yet, concentrated in two areas
the 2023 paper covered only thinly — pathology techniques/tumor-like lesions (TNM
staging, choristoma/hamartoma, intermediate/locally-malignant tumors, tissue fixation)
and higher-difficulty clinical pharmacology vignettes (spasmolytics, autacoids,
tachyphylaxis, physiological antagonism in anaphylaxis) — the pharmacology in particular
is noticeably more USMLE-style/clinical-vignette than the 2023 paper's simpler
fact-recall pharm items.

**This pass authored 38 items** (`coverage/seeds/208-INT/2024eom.json`), chosen for
strong single-source grounding (mostly the 208 INT Pathology Department Book, plus the
Pharma In Points notes for the four pharmacology items) and reuse of the existing 208 INT
concept bank wherever a fact was already minted: 20 of the 38 reuse an existing concept
(no new mint), 12 mint new concepts after both `find-existing.mjs` and a direct grep of
`concept/208-INT-concepts.md` — the direct grep caught two cases `find-existing.mjs`
missed entirely (a false negative on an exact-phrase search): the diphenhydramine-sedation
concept (already live in this file from lane 3) and the acute/chronic-ischemia
classification (already live from an earlier lane) both would have been re-minted as
duplicates without the second check. Flagging `find-existing.mjs`'s reliability gap for
whoever owns `Instruction Manual for Content Creation/tools/find-existing.mjs` next — it
is a hint, not a substitute for grepping the target concept file directly before minting.

1 item (Q74, p.16) is HELD — genuinely unmarked in the source, confirmed by render, not a
tool-reading error (its four neighbouring questions each show exactly one green-highlighted
option; Q74 shows none).

**Not authored from this paper:** the ~81 remaining items (duplicates of 2023 EOM,
concept-reuse candidates not selected this pass, and untriaged remainder) — left for a
future pass rather than exhaustively worked through, per the lane brief's "~40 keyed
items" target. 22 more tier 1-3 208 INT papers remain fully untriaged.

## Method note for the next wave

`pagetext.mjs`'s documented `keys` subcommand (referenced in this lane's brief as
"visually-marked keys → `pagetext.mjs keys`, fetch main for it") does not exist yet on
`main` as of this session (`5fd5555a`) — `usage: pagetext.mjs
<show|status|mark-garbled|unmark-garbled|render|ocr|index|grep>` has no `keys` entry.
This pass used the documented fallback instead: read the printed key (page 21 here),
confirm any ambiguous marking by rendering at 200 dpi before trusting it (`Content CLI`
§`pagetext.mjs`, and the `kasr-pdf-extraction-traps` hazard) — concretely, this paper's
occasional capitalised option letter inside a question stem (e.g. Q1's "C. Adhesion...")
looked like it might be a key marking and was **not** — it does not correlate with the
real printed key on page 21, confirmed by render. Flagging the missing `keys` subcommand
for whoever owns `scripts/content/pagetext.mjs` next.

## Third paper (S1 continued): EOM - {INT - 208} 198 (Solved)

`EOM - {INT - 208} 198 (Solved).pdf` (src_1521fa3aed9594cd3e0c, sha256
`1521fa3aed9594cd3e0c…`; sitting year **2026** by the printed exam date 6/5/2026). An
OCR'd image-PDF: no native text layer and no PDF annotations, so both `pagetext.mjs keys`
and `pdf_visual_keys.py` return empty — the answer key is a scanned **cyan highlight
circle** drawn over the correct option's letter (same marking family as the 2026 Baqoon
paper's cyan circle). Keys recovered from the OCR text and confirmed by rendering pages
1/2/5/8/13 at 150 dpi (OCR↔render agreed on 100% of sampled keys). 120 MCQs: **Q1-60**
4-option general pathology, **Q61-120** 5-option USMLE-style clinical pharmacology.
119/120 keyed; **Q56 excluded** (two options circled — b TP53 + c RB — with a handwritten
"Both are correct", an ambiguous two-answer key, per the 2026baqoon-q13 rule).

This paper's Q1-60 general-pathology half overlaps the already-authored 2023/2024 EOM banks
heavily — most items restate concepts those passes already minted, so the first authoring
cluster (Q1-22) reuses existing 208 INT concepts wherever a fact is already covered and
holds the near-literal duplicates rather than re-authoring them. The Q61-120 clinical-
pharmacology half is the paper's more distinctive content, left for a future pass.
See `208-INT-triage-keys.txt` third section for the full key table and method note.
