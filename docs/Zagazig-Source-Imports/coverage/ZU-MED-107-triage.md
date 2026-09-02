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

## Source: `Fakous GIT Summer 2024.pdf` (author2 pass)

The module's resit exam paper. 20 pages, `pagetext.mjs status` reports `garbled=yes`
(0 words) on every page — unlike the Final paper, this scan's text layer is unusable as-is.
OCR'd in full in the foreground (`pagetext.mjs ocr --pages 1-10` then `--pages 11-20`,
two chunks), then read with `show`. 46 questions total: 10 short-essay questions
(pp.1-2) + 36 single-best-answer MCQs (pp.3-18), the same 36 SBA/10 essay/72-mark
structure as the Final paper. Pages 19-20 are a trailing watermark/footer, no content.

### Key-recovery method

The same hand-drawn-ink trap named in LANE-CARD.md §7 and confirmed on the Final paper:
`pagetext.mjs keys` reports "no text layer — keys need ocr+render" (the OCR text layer
does exist but the tool still needs a render to attribute marks) — the correct option is
marked by a diagonal pen stroke through its letter, added before scanning, which
corrupts that option's leading glyph in the OCR output itself (e.g. "c." reads as "ff",
"b." reads as "#" or "go", "d." reads as "A." or "MA."). Every one of the 36 SBA answers
was first read from this OCR-corruption pattern, then **render-confirmed independently**
(`pagetext.mjs render --force`, one render per page, pp.3-18 — 16 renders total) by
viewing the rendered PNG and reading the pen mark directly. All 16 renders matched the
OCR-inferred key exactly, with no discrepancies.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Fakous GIT Summer 2024.pdf` | 46 (10 written + 36 SBA) | 36/36 SBA legible + render-confirmed (0 held); written = essay, no single-letter key | 36 questions on 35 distinct concepts (Q24 shares Q22's own git-final24 concept, extended rather than duplicated) — 5 reused directly from git-final24's own zu overlays, 4 new pending overlays, 1 new live overlay, 26 new | 1 | 4 | 26 | `fnd`/`pharm` (bioenergetics, vitamins, heme synthesis, nitrogen metabolism, xenobiotic metabolism), `gi` (gastric/intestinal regulation, hepatobiliary/pancreatic anatomy, GI histology) |

**36/36 = 100% of the Summer resit's SBA items keyed with real, legible stems and
render-confirmed** — no held items this pass, unlike the Final paper's one indefensible
double-mark.

### Concept search — 5 reused (own overlays), 1 live-hit, 4 pending-hit, 26 new

`find-existing.mjs` run for every distinct concept before minting. 5 of the 36 questions
land on concepts already overlaid onto zu/ZU-MED-107 by this lane's own `git-final24`
cluster — reused directly, no new overlay row needed: Q8 (ammonia/glutamine), Q17
(N-acetylglutamate/CPS1), Q18 (lipoprotein lipase), Q20 (glutamate dehydrogenase). A
5th, Q24 (`Which of the following factors decreases HCL secretion? Somatostatin`), lands
on the *same* concept `git-final24`'s Q22 already overlaid (`CON-GIT-E879C58362EAB0`,
"Somatostatin inhibits gastrin secretion") but tests a materially different fact (direct
parietal-cell inhibition, not just gastrin suppression) — resolved by **extending that
concept's own definition** in `concept/ZU-MED-107-git-concepts.md` to cover both
mechanisms, per the merge tiebreaker (00-START-HERE.md §4), rather than minting a
near-duplicate.

4 pending hits (Kasr 103-BMS, Alexandria AU-MED-102) are sparse pending-live overlays
added to the existing `pending-live/ZU-MED-107-git-pending-overlays.md`: ATP synthase
proton direction (Q1), cyanide/Complex IV (Q2), Cori cycle (Q11 — a *different* Kasr
concept from the one `git-final24` used elsewhere in this same module, since that paper
never asked a Cori cycle question), trypsin specificity (Q19). A 5th candidate (Helwan
HU-BMS-102, for Q9's glucuronidation fact) was found but **dropped** — its own
`article_ids` target does not exist as an authored article anywhere in the corpus, a gap
in Helwan's own batch, not fixable from here; Q9 mints its own concept instead.

1 live hit: Q36 ("Chief cells... secrete pepsinogen") overlays the same live concept
(`CON-GIT-E10E05FE786B9A`) the Final paper's own triage considered and rejected merging
for a *different* Final-paper question (Q35, "apical zymogen granules" — an
ultrastructural fact, not the secretory-product fact this Summer question tests) — here
the fact genuinely matches, so it is overlaid, not minted, unlike that earlier near-miss.

26 new concepts minted (`concept/ZU-MED-107-git-summer24-concepts.md`), covered by 5 new
articles (`article/ZU-MED-107-git-summer24-articles.md`): a carbohydrate/energy-metabolism
article (TCA yield, erythrocyte tissue restriction, odd-chain fatty acid gluconeogenesis,
anaerobic glycolysis yield, glycogen phosphorylase, McArdle disease — 6 concepts), a
vitamins/nitrogen article (vitamin E, ALA synthase/B6, urea cycle localisation, lead
porphyria, proline transamination exception, glucuronidation — 6 concepts), a GI
regulation article (Meissner's plexus, lingual lipase, gastric H+ active transport, VIP,
gastric emptying, vomiting mechanics, specific dynamic action, mucosal prostaglandins — 8
concepts), a GI anatomy article (portal vein pressure, splenic artery/duodenum,
hepatopancreatic ampulla, internal anal sphincter — 4 concepts), and a GI histology
article (sublingual gland, esophagus epithelium — 2 concepts).

### A defensible reading of an apparently-wrong key — Q35, esophageal epithelium

Q35's marked key ("a. Lined by simple columnar epithelium") is, read as a blanket claim
about the whole esophagus, medically wrong — the esophagus is lined predominantly by
stratified squamous non-keratinised epithelium; option "c. Contains striated muscles"
is also a true statement (upper third). Render-confirmed as a single, unambiguous mark
on option a (no second mark, unlike the Final paper's held Q20), so this does not qualify
as `held-indefensible-key` under LANE-CARD.md §7's own test (recoverable, not
unrecoverable). Per 00-START-HERE.md's answer-key ruling ("a printed key on a real exam
paper stands as printed, full stop, even if it looks wrong... explanation_<correct>
teaches the correct reasoning and names the discrepancy explicitly"), option a is kept as
`correct` and its explanation states the genuine, narrower fact the option supports: the
esophagus's short terminal segment at the gastroesophageal junction does transition to
simple columnar epithelium matching the adjacent gastric mucosa, distinct from (and not
contradicting) its predominant stratified squamous lining stated in the same explanation.

### Printed typos kept as printed (lane1 precedent continued)

Q12's option c prints "Porpionyl CoA" — almost certainly a typo for "Propionyl CoA" —
kept as printed in the question option text; the concept and explanation state the
correct name. Q25's stem prints "vasoactive intestinal Histamine peptide (VIP)" — almost
certainly a typo for "vasoactive intestinal peptide" — kept as printed; the concept and
explanation name VIP correctly without the spurious "Histamine".

## Source: `GIT Module - Practical revision 2.pdf` (verdict logged, not triaged)

Confirmed this pass, per LANE-CARD.md §1 item 3's authoring rule ("if under ~35
authored, confirm whether... otherwise log the verdict") — 36 SBA questions were already
authored from the Summer resit paper above, above the ~35 threshold, so this second
source was not triaged for authoring, only spot-read to confirm the verdict.
`pagetext.mjs status` on pp.1-70 (the full opening run, not just a sample): a
`garbled=no`/`garbled=yes` checkerboard with very low word counts even on clean pages
(0-23 words). `show` on pp.1, 4-6 confirms the content directly: page 1 reads "HISTOLOGY
OF GASTRO-INTESTINAL TRACT" as a title slide, and pp.4-6 read "Oral Cavity" / "5" /
"(filliform papillae)" — single-word image captions on a histology slide deck, not
letter-option MCQ content. **Verdict: no MCQ content; image-identification/practical
atlas format, skipped per LANE-CARD.md §1 item 3.** Not triaged further.

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
