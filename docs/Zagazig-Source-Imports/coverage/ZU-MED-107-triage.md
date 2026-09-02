# ZU-MED-107 (GIT and Nutrition) — triage, author1 pass

Priority source per LANE-CARD.md §7 (Fakous campus, ruled USABLE — chief-of-staff,
2026-09-01). `source provenance: Fakous campus` on every question drawn from it.

## Source: `Fakous GIT final 2024.pdf`

5 pages, native text (no OCR needed — `pagetext.mjs status` reports `garbled=no` on
every page). 46 questions total: 10 short-essay questions (Section 1, p.1) + 36
single-best-answer MCQs (Section 2, pp.2-5), matching the paper's own header ("36
Single best answer (SBA) & 10 Short essay questions", 72 marks).

### Key-recovery method (the trap named in LANE-CARD.md §7, confirmed on this paper too)

`pagetext.mjs keys` reports **0 keyed / 0 ambiguous / 21 unmarked** across pp.2-5 — the
same hand-drawn-ink trap documented in `ZU-MED-106-triage.md`: the correct option is
marked by a diagonal pen stroke through its letter (occasionally an explicit "X" instead
— see Q20 below), added before scanning, which the automated detector cannot see because
it is a vector mark, not a font/colour property. The `pdftotext -layout` text layer shows
it indirectly (a dropped/corrupted option letter), but every one of the 36 SBA answers
below was **confirmed by rendering the page as an image** (`pagetext.mjs render --force`,
one render per page, pp.2-5 — 4 renders total) and reading the pen mark directly, not
inferred from the corrupted text alone.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Fakous GIT final 2024.pdf` | 46 (10 written + 36 SBA) | 35/36 SBA legible + render-confirmed (1 held, Q20, see below); written = essay, graded by rubric, no single-letter key | 33 distinct (3 SBA share one concept — Q6/Q9/Q13 all test the same ALA-synthase/heme-synthesis record) | 3 | 11 | 19 | `fnd` (bioenergetics, enzymology, carbohydrate/lipid/nitrogen biochemistry — the paper's biochemistry section), `gi` (gastric/intestinal physiology, hepatobiliary and pancreatic anatomy, GI histology — the paper's physiology/anatomy/histology section) |

**35/36 = 97% of the Final paper's SBA items keyed with real, legible stems** — well
above the ≥60% conditional-approval bar in the dispatch. Authoring proceeded without a
separate wait for TRIAGE APPROVED, per the dispatch's pre-approval.

### The one held item — Q20, an indefensible double-mark

"Which of the following enzymes is an endopeptidase acting on the peptide linkage in the
middle of the polypeptide chain especially between aromatic amino acids as phenylalanine &
tyrosine amino acids? a. Trypsin b. Chymotrypsin c. Pepsin d. Aminopeptidase" — option b
("Chymotrypsin") carries an explicit hand-drawn **X** immediately after the word (a
different, more deliberate mark than every other question's diagonal-stroke-through-the-
letter pattern), but option c ("Pepsin", which spills onto p.4 due to the page break)
independently shows the same diagonal-stroke-through-the-letter corruption as every other
confirmed answer on this paper. Both marks were render-confirmed (`1522efbc-p3.png`,
`1522efbc-p4.png`) — this is not a corrupted-text artefact resolved by rendering, the
paper genuinely carries two different marks on two different options for one question.
Per LANE-CARD.md §7 ("an indefensible key holds with reason `held-indefensible-key`"),
this item is **held**, not guessed — even though Chymotrypsin is the medically correct
answer to the stem (endopeptidase cleaving on the carboxyl side of aromatic residues) and
a concept for it is written anyway (`CON-FND-2C95FF78BBEFEE`) so a future clean-stem
question can test it.

### A source stem-typo kept as printed, not corrected

Q13's stem reads "…incorporation of ferrous ion into protoporphyrin **III**?" — almost
certainly a paper typo for protoporphyrin **IX** (the real ferrochelatase substrate). This
is a stem error, not an answer-key error, so the 00-START-HERE §0 answer-key ruling does
not directly govern it; kept verbatim as printed (source fidelity — "a past paper is a
source of what was asked") and the concept/explanation state the correct substrate
(protoporphyrin IX) directly, without editorialising about the paper.

Q18's stem and option c print "Carbonyl phosphate synthase I" (render-confirmed,
`1522efbc-p3.png`) — almost certainly a typo for "Carbamoyl phosphate synthase I", the
real rate-limiting urea-cycle enzyme. Same treatment: kept as printed in the question,
explanation names the correct enzyme.

### Concept search — 3 live-hit, 11 pending-hit, 19 new

`find-existing.mjs` run for every one of the 33 distinct concepts before minting.

**3 live hits** (concept already exists in `server/data/medical-library-v1.json`,
`universityIds: ["kau"]`) — sparse live overlay, `concept/ZU-MED-107-git-live-overlays.md`:
- `CON-GIT-6E386B69AA17CB` "Hydrochloric acid activates pepsinogen…" — Q21 (pepsinogen
  secretion linked to HCl secretion). Direct match.
- `CON-GIT-EF1FC3448781A0` "CCK contracts the gallbladder wall" — Q27 (gallbladder
  contractility stimulated by CCK). Direct match.
- `CON-GIT-8D9AD0B22770C0` "CCK augments secretin-induced alkaline pancreatic duct
  secretion" — Q28 (secretin increases exocrine pancreatic secretion). Same underlying
  fact (secretin drives pancreatic bicarbonate secretion, which CCK augments), tested from
  the secretin side rather than the CCK side.

**11 pending hits** (concept exists only in another lane's unimported batch — mostly
Kasr's `103-BMS` biochemistry batch, one Alexandria, one Mansoura) — sparse pending-live
overlay, `pending-live/ZU-MED-107-git-pending-overlays.md`:
- `CON-FND-D8A41B5C23B148` (Kasr 103-BMS) "Hydrogen peroxide is disposed of by catalase
  and by glutathione peroxidase…" — Q3 (peroxidase mechanism: two H2O2 molecules, no
  hydrogen donor, prevents free-radical initiation). Same disposal-mechanism idea tested
  from the catalase-route angle; not a perfect wording match but the tiebreaker (one
  record could answer both without becoming two stapled paragraphs) favours overlay over
  a second record.
- `CON-FND-229C78C9EB0E78` (Kasr 103-BMS) "Pyruvate dehydrogenase is irreversible and
  needs five coenzymes, of which thiamine pyrophosphate is the one that fails first" — Q4
  (thiamine-dependent enzyme essential for brain glucose oxidation). Direct match.
- `CON-FND-B928DE79E08882` (Kasr 103-BMS) "The hexose monophosphate pathway is the main
  source of NADPH…" — Q5 (HMP active in liver). The concept's own definition already
  names liver as a site. Direct match.
- `CON-HEM-8F2329AD7AF440` (Mansoura MANS-HIS-203) "ALA synthase is the mitochondrial,
  rate-limiting enzyme that catalyses the first step of haem synthesis" — Q6 (key
  regulatory enzyme of heme synthesis), Q9 (glycine + succinyl-CoA start heme synthesis)
  and Q13 (ferrochelatase inserts Fe2+ into protoporphyrin IX) all land on this one
  concept — its definition states the ALA-synthase condensation step, names glycine and
  succinyl-CoA as substrates, and mentions ferrochelatase's role at the pathway's end.
  Three SBA questions, one concept — same pattern as ZU-MED-106's Q14/Q17 sharing one
  concept.
- `CON-FND-EA1BA37ACB643B` (Kasr 103-BMS) "Hexokinase has a low Km…glucokinase has a high
  Km…" — Q12 (glucokinase higher Km than hexokinase). Direct match.
- `CON-FND-1BE461A57AB76D` (Kasr 103-BMS) "Von Gierke's disease is glucose
  6-phosphatase deficiency…" — Q14 (enzyme deficient in Von Gierke's disease). Direct
  match.
- `CON-FND-0189D5EC600BC7` (Alexandria AU-MED-103) "Debranching enzyme removes the last
  glucose at a branch point by hydrolysis…" — Q16 (debranching enzyme releases free
  glucose in glycogenolysis). Direct match.
- `CON-FND-45DCF7CE171F0B` (Kasr 103-BMS) "Glutamate dehydrogenase does the deamination
  that matters…" — Q17 (glutamate dehydrogenase's deamination reaction). Direct match.
- `CON-FND-3806EF570B0A1C` (Kasr 103-BMS) "Ammonia and aspartate donate the two nitrogen
  atoms of urea…N-acetylglutamate is what commits carbamoyl phosphate synthetase I" — Q18
  (rate-limiting urea-cycle enzyme). Direct match (question's own stem/option print the
  typo "Carbonyl"; kept as printed, see above).
- `CON-GIT-6CB618DBA50596` (Kasr 103-BMS) "Lipoprotein lipase empties triacylglycerol-rich
  particles at the capillary wall…" — Q19 (lipoprotein lipase hydrolyses TAG in
  chylomicrons). Direct match.
- `CON-FND-880D165894A5EC` (Kasr 103-BMS) "Ammonia travels as glutamine from brain and as
  alanine from muscle…" — Q7 (ammonia detoxified in brain as glutamine). Direct match.

**19 new concepts** — `concept/ZU-MED-107-git-concepts.md`, covered by 4 new articles
(`article/ZU-MED-107-git-articles.md`): Q1 (antimycin/Complex III), Q2 (substrate-level
phosphorylation), Q8 (cytochrome P450 monooxygenase), Q10 (chymotrypsin specificity), Q11
(acetyl-CoA excluded from gluconeogenesis), Q15 (reciprocal phosphorylation of glycogen
phosphorylase/synthase) under a shared bioenergetics/enzymology article; Q22
(somatostatin/gastrin), Q23 (ileocecal sphincter), Q24 (reflex vomiting), Q25
(post-hepatic jaundice), Q26 (hypoglycemia/vagal gastric secretion), Q29 (stomach storage
function), Q30 (HCl bactericidal function) under a GI-physiology article; Q31 (pancreatic
neck cyst/portal vein), Q32 (quadrate lobe/transverse colon), Q33 (gallbladder fundus/9th
costal cartilage) under a GI-anatomy article; Q34 (Ito cells/vitamin A), Q35 (chief
cells/zymogen granules), Q36 (fungiform papillae) under a GI-histology article.

One near-miss recorded, not merged: `CON-GIT-E10E05FE786B9A` (live, "Chief cells secrete
pepsin as inactive pepsinogen") states the secretory-product fact, not the identifying
ultrastructural feature (apical zymogen granules) Q35 tests — genuinely distinct
objective, cross-referenced in the new concept's `rejected_merge_candidate_ids` rather
than merged; the live record's own back-link is owed (not edited by this pass).

## The other 2 Fakous GIT sources (not this pass)

- `Fakous GIT Summer 2024.pdf` (resit paper) — `pagetext.mjs status` reports
  `garbled=yes` on all pages sampled (p1-20), unlike the Final paper. Needs OCR before
  triage; not attempted this pass (LANE-CARD.md §1 sequence is Final paper first, then
  Summer).
- `GIT Module - Practical revision 2.pdf` (35 MB, large) — spot-checked `status` on
  pp.41-70: mixed `garbled=yes`/`garbled=no`, very low word counts even on non-garbled
  pages (0-23 words), consistent with an image-heavy practical/OSPE-style file. Not
  triaged this pass; flagged for a future pass to confirm whether it holds any
  letter-option MCQ content at all, per LANE-CARD.md §1 item 3 ("skip image-identification
  stations").

## Skipped per LANE-CARD.md §1

OSPE files (`Fakous GIT OSPE 2024.pdf`, `Fakous GIT OSPE 2025.pdf`, `Fakous GIT SUMMER
OSPE 2025.pdf`, `Fakous_GIT_OSPE_2024_Signed_…pdf`) and the hand-out
(`GIT HAND OUT (1).pdf`) — catalogued here only, not triaged: all are image-identification
station formats or a lecture hand-out, not MCQ-shaped content this lane's format can
carry.

## Out of scope this pass

The paper's 10 written/essay questions (p.1, Section 1) carry no single-letter key —
graded by rubric/department book — and are out of scope for this SBA-only cluster, per
LANE-CARD.md §4 (scope one cluster at a time). Not seeded this pass:
1. Chemiosmotic theory for ATP synthesis
2. Functions of the HMP pathway
3. Two examples of transaminases, their reactions and clinical importance
4. Anabolic pathway of ammonia
5. Short/long-term factors regulating food intake
6. Segmenting intestinal movements — nature, mechanism, rate, value
7. Small intestinal peristaltic movements — mechanism and types
8. Artery of the midgut — name, origin, level of origin, branches
9. EM characters of enterocytes / histological structure of microvilli
10. Alpha vs beta cells of pancreas — percentage, size, distribution, granule histology

## Needs Omar

- None new this pass — the merge-vs-split calls above were resolved by the tiebreaker in
  00-START-HERE.md §4 without ambiguity, and Q20's double-mark is handled by the
  LANE-CARD's own `held-indefensible-key` rule rather than needing a ruling.
