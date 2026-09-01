# ASU-MBG progress ledger

Tracks status against the 12 concept clusters in `ASU-MBG-triage.md`, plus Cluster 13 (Molecular
Biology of Cancer, found and triaged by author11) and Cluster 14 (Gene Therapy, found and triaged
by author12). Update this file, do not recreate it, as each cluster closes.

## Done (author12, branch `asu-mbg-author12`, base `asu-mbg-author11` @ 448915cf)

**Cluster 14 · Gene Therapy — new chapter, not in the original S1 triage. CLOSED, all 24
questions authored.**

Found sitting immediately after Cluster 13's own answer table, on the same PDF page (p.41), in
the same file (`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf`). Like Cluster 13, this chapter's
scan is clean throughout — no blacked-out or unrecoverable answer cells — and its own "Answers of
Gene Therapy" table (PDF p.43, not p.44 as an earlier note guessed — p.44 is the start of the
already-closed Mode of Inheritance chapter) keys all 24 questions. Full triage table:
`coverage/ASU-MBG-triage.md` Cluster 14.

| Concept | ID | Qs | Status |
|---|---|---:|---|
| Gene therapy definition & germline vs somatic heritability | `CON-FND-06F6AE69D9BD8D` | 1,2,3,23 | **new** |
| Restriction endonuclease origin & recognition (bacterial, palindromic) | `CON-FND-C444D428BE3E1D` | 4,5,9,14,19 | **new** |
| Sticky vs blunt restriction-fragment ends | `CON-FND-744B37261093E4` | 11,12 | **new** |
| Restriction fragment counting (linear vs circular) | `CON-FND-1F3840652F24F8` | 7,8 | **new** |
| Molecular cloning workflow (chimeric DNA, vectors, step order) | `CON-FND-3893485BBEEC06` | 6,10,13,15,16,18,20 | **new** |
| CRISPR-Cas9 gene-editing mechanism | `CON-FND-16C60870619649` | 21,24 | **new** |
| ADA-SCID as first gene-therapy success (related to Kasr `CON-IMM-10470076F1AF95`) | `CON-FND-1C82888CCCC7FD` | 17,22 | **new** |

7 concepts minted (all new — this chapter's facts are entirely distinct from anything found
live/pending), 1 article (`ART-FND-GENE-THERAPY-AND-RECOMBINANT-DNA-TECHNOLOGY`), 1 resource
record (`src_d83a3017c760e2770c22` — missing from the tree since Cluster 13, authored this pass
to satisfy the question gate's resource-existence check). `gate.mjs batch`: items=24 errors=0.
`gate.mjs simulate` (resource → concepts → article → questions): created=33 errors=0 rejected=0.
`ledger.mjs`: gene-therapy authored=24 held=0 remaining=0.

## Done (author11, branch `asu-mbg-author11`, base `asu-mbg-author10` @ 86222f5c)

**Cluster 13 · Molecular Biology of Cancer — new chapter, not in the original S1 triage. CLOSED,
all 44 questions authored.**

Found sitting between "Regulation of Gene Expression" (Cluster 6, still blocked) and "Mode of
Inheritance" (Cluster 7, closed) in file 1 (`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf`),
PDF pp.35-41. Unlike Cluster 6, this chapter's scan is clean throughout — no blacked-out or
unrecoverable answer cells — and its own "Answers of molecular biology of cancer" table (PDF p.41)
keys all 44 questions. Full triage table: `coverage/ASU-MBG-triage.md` Cluster 13.

| Concept | ID | Qs | Status |
|---|---|---:|---|
| Rb/E2F restriction-point control | `CON-FND-05748BDCBE10A5` | 1,2,5,6,14,20,24,41 | **new** |
| Proto-oncogene vs tumor-suppressor-gene definitions | `CON-FND-1BCB86AE1C6B66` | 8,9,11,12,13,16,18,25,26 | **new** |
| Proto-oncogene→oncogene activation mechanisms | `CON-FND-76604784CC143B` | 3,17,22 | **new** |
| Retroviral oncogenesis (promoter insertion + reverse transcriptase) | `CON-FND-4A768CDB232E77` | 39,40 | **new** |
| p53 DNA-damage response (Mdm2, p21, G1-S halt, apoptosis) | `CON-FND-B03C1C16A79323` | 19,21,37,38 | **new** |
| Caspase cascade — initiator/effector per pathway + apoptosome | `CON-FND-BBCC9BC05C8C5F` | 29,30,31,32,33,34,36,42,43 | **new** |
| Cancer-cell hallmark features | `CON-FND-CF3FFDEA6D271F` | 15 | **new** |
| Cell-cycle/apoptosis regulatory proteins (Kasr 102-INT, overlaid) | `CON-FND-1F66060A9C2625` | 44 | pending-hit |
| Cyclin-CDK/restriction point (Kasr 102-INT, overlaid) | `CON-FND-FF40DB9ED068F9` | 23 | pending-hit |
| Caspases general — cysteine proteases (Kasr 102-INT, overlaid) | `CON-FND-70E5BD77E8FE49` | 28 | pending-hit |
| Apoptosis morphology (108-INT, overlaid) | `CON-FND-46B3AD5A2D8294` | 10,27 | pending-hit |
| Apoptosis causes, physiological/pathological (108-INT, overlaid) | `CON-FND-A40D59DAB245EA` | 4,35 | pending-hit |
| Structural chromosomal aberrations / Philadelphia chromosome (already ASU-tagged, author4) | `CON-DEV-D2BA4082190B3F` | 7 | reused |

Two new minimal `TPL-CONCEPT` articles: `ART-FND-ONCOGENES-AND-TUMOR-SUPPRESSOR-GENES` (teaches the
7 concepts above except the caspase-cascade one) and `ART-FND-CASPASE-CASCADE-AND-APOPTOSOME` (teaches
the caspase-cascade concept), both cross-linked to the three existing pending articles their reused
concepts point to (`ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES`, `ART-108-PAT-
APOPTOSIS`, `ART-104-HIS-STRUCTURAL-ABERRATIONS`) — the latter two getting their own first ASU overlay
in `pending-live/ASU-MBG-molecular-genetics-articles.md` since neither had been ASU-tagged before.
Full evidence chain for the 7 new concepts (7 claims, 7 citations, no spans since no new span-worthy
article text beyond the definitions themselves). Files: `concept/ASU-MBG-molecular-biology-of-cancer-
concepts.md`, `article/ASU-MBG-molecular-biology-of-cancer-articles.md`, `evidence/ASU-MBG-molecular-
biology-of-cancer-{claims,citations}.md`, `question/ASU-MBG-molecular-biology-of-cancer-mcq.md`, plus
5 concept + 2 article sparse-overlay appends to `pending-live/ASU-MBG-molecular-genetics{,-articles}.md`.

**Two transcription errors caught and fixed during authoring, before the gate run**: Q23's key is
d) "Cyclin-dependent kinase", not b) "Cyclins" as first drafted (fixed in the triage table and the
pending-live overlay's field_notes before committing); Q24's key is c) "It binds E2F transcription
factor and prevents cell from entering [S phase]", not b) "...binds E2F and thus stimulates the cell
to enter S phase" as first drafted — option b reverses the real causality and is the keyed-wrong
distractor, caught by cross-checking against Q41's own differently-worded restatement of the same
correct fact. Both re-verified against the rendered source image twice before finalising.

Search-before-mint (`find-existing.mjs`, ≥4 queries each): "proto-oncogene", "tumor suppressor",
"Rb E2F", "retinoblastoma Rb", "loss of function tumor suppressor", "gain of function oncogene",
"proto-oncogene activation mechanisms", "chromosomal translocation cancer", "retrovirus oncogene",
"p53", "initiator caspase", "effector caspase", "apoptosome Apaf-1", "membrane blebbing",
"phosphatidylserine", "cancer cell characteristics hallmarks" — the 7 new concepts' facts returned no
hit anywhere; "apoptosis", "caspase", "restriction point" and "Philadelphia chromosome" each hit an
existing pending or already-ASU-tagged concept, sparse-overlaid rather than duplicated per the 5
pending-hit / 1 reused rows above.

Gates: `medical:batch` clean (0 errors) on all seven new/changed files together (concepts, articles,
evidence claims/citations, both pending-live overlay files, the 44-question file), explanation-length
0% under 200 chars / 0% under 3 sentences on the full 44-question run. `medical:simulate` (positional,
apply order: resources → concepts → articles → pending-live → evidence → questions, `--emit` to
scratch) 0 errors, 0 skipped, `delta: {articles:15, concepts:50, claims:7, citations:7, resources:1,
articleSpans:0}` against the full cumulative pending-live state (the pending-live totals reflect every
prior session's still-pending overlay work, not just this pass's own contribution, which is 2 articles
+ 7 concepts + 5 pending-live concept overlays + 2 pending-live article overlays + 7 claims + 7
citations + 0 spans + 44 questions); questions `created: 44, updated: 0, rejected: 0`.
`medical:audit --source <emitted-state>` — by exact-id filtering, every one of this pass's 7 new
concepts and 2 new articles appears exactly once each, only in the same generic, harmless
"microtopicId is blank without an explicit reason" completeness note already present on dozens of
prior sessions' concepts across this whole simulated state; 0 errors mention any of this pass's 44
questions, 7 claims or 7 citations, and none of the 7 new concepts appear in any concept-specific
defect category (canonicalKey/definition/articleIds/etc. missing — those all list only the sparse
pending-live overlay rows, which correctly omit fields they don't redeclare). `medical:concept-ids`
run clean: "no rival ids" — no canonical-key collision anywhere in the repo, including the 7 new keys.

**Traceable share:** 44/44 questions traceable to a `main_concept` covered by one of the two new
articles or one of the three existing overlaid articles — 100%.

**New finding, not triaged or authored this pass:** a "Gene Therapy" chapter starts immediately after
this chapter's own answer table on the same PDF page (pg41), with its own separate ~24-question answer
key (germline vs somatic gene therapy, restriction endonucleases, palindromic sequences, molecular
cloning, plasmids) — not named in this session's dispatch orders. Flagged for the orchestrator to scope
into a future dispatch; `find-existing.mjs` spot-checks suggest it is likely fully new content.

Commits on `asu-mbg-author11`: triage (this file's Cluster 13 section + `ASU-MBG-triage.md`), concepts
+ articles + evidence + pending-live overlays, questions in three batches (Q1-22, Q23-28, Q29-44,
the last after fixing the Q23/Q24 transcription errors caught above). Pushed to origin after every
commit.

## Done (author10, branch `asu-mbg-author10`, base `asu-mbg-author7` @ 8024699f)

**Cluster 1 · RNA types (superlatives) — CLOSED, all 6 questions authored.**

The "RNA Structure & Transcription" chapter's Q1, Q2, Q10, Q12, Q14, Q15 — read from the chapter's
own pages (PDF pp.3-4, pre-rendered by a prior pass and confirmed against fresh views) and keyed
from its own answer table (PDF p.15: 1=a, 2=a, 10=d, 12=b, 14=c, 15=e).

| Concept | ID | Qs | Status |
|---|---|---:|---|
| RNA types comparative properties (tRNA highest modified-nt%, mRNA most heterogeneous/"hnRNA", min ~20 tRNA species, mRNA the one coding RNA among rRNA/tRNA/snRNA/lncRNA) | `CON-FND-31428037F9FDDF` | Q1, Q2, Q12, Q15 | **new** |
| RNA vs DNA chemistry (2'-OH-driven alkali-lability, shorter, single-stranded with intra-strand H-bonds, uracil) | `CON-FND-297C617E70A8FA` | Q14 | **new** |
| tRNA cloverleaf (reused, already ASU-tagged by author7) | `CON-FND-4DCC3E30FD4C86` | Q10 | reused |

Both new concepts point `article_ids` at the pre-existing, already ASU-overlaid Kasr article
`ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS` (its own alias list already names "Types of RNA"; its
summary "closes on the three RNAs") — no new article minted, matching the triage note's prediction.
Full evidence chain (2 claims, 2 citations, no new spans since no new article). Files:
`concept/ASU-MBG-rna-types-superlatives-concepts.md`, `evidence/ASU-MBG-rna-types-superlatives-
{claims,citations}.md`, `question/ASU-MBG-rna-types-superlatives-mcq.md`.

Search-before-mint (`find-existing.mjs`): "tRNA modified nucleotides", "heterogeneous mRNA", "RNA
alkali labile", "non-coding RNA", "tRNA species amino acid", "DNA vs RNA differences" all returned
either no hit or an unrelated hit (a microRNA/gene-silencing concept, a different fact) — genuinely
new content, confirmed against the triage note's own prediction of "1-2 new concepts". "tRNA
cloverleaf" hit the existing `CON-FND-4DCC3E30FD4C86` (already ASU-tagged), reused directly for Q10.

Gates: `medical:batch` clean, 0 errors, on the concept file, the question file (`--with` the new
concept file, the ASU pending-live molecular-genetics overlay + articles files, the module's
evidence-sources file, and Kasr's `102-INT-mcq-concepts.md` to resolve the reused tRNA-cloverleaf
concept's `article_ids`), and both evidence files; explanation-length check 0% under 200 chars / 0%
under 3 sentences (all 6 pass clean, no residual warning at all). `medical:simulate` (positional,
`--emit` to scratch) 0 errors, 0 skipped, `delta: {articles:11, concepts:40, claims:2, citations:2,
resources:1, articleSpans:0}` against the full cumulative pending-live state (11/40 reflect every
prior session's still-pending overlay work, not just this pass's — this pass's own contribution is
0 articles + 2 concepts + 2 claims + 2 citations + 0 spans + 6 questions); questions `created:6,
updated:0, rejected:0`. `medical:audit --source <emitted-state>` 548 total errors on the full
simulated state (identical to the pre-existing baseline this session inherited — this pass added
0 net new error count), and by exact-id filtering only 1 error matches either new concept (the same
generic, harmless `relatedArticleIds missing` completeness note already present on dozens of prior
sessions' concepts) — 0 errors mention any of this pass's 6 new questions or 2 new claims/citations.
First revision left `arabic_label` blank on both new concepts, which the audit correctly flagged
(`arabicLabel is blank without an explicit reason` — a genuine gap, unlike the harmless
`relatedArticleIds` note); fixed by adding real Arabic labels/aliases to both concepts before the
final gate run above, matching this lane's established practice of filling Arabic fields on new
concepts (confirmed against author6's prokaryotic-apparatus concepts, both of which have them).

**Traceable share:** 6/6 questions traceable to a `main_concept` covered by an article — 100%.

Commit on `asu-mbg-author10`: concepts + evidence + questions + this ledger update, in one commit.
Pushed to origin.

**Cluster 3/4 remainder · Disease-correlation mutation questions — 18/~20 authored.**

The "Genetic Codes" chapter's Q12-22, Q26-28, Q30, Q36, Q38, Q44 — read from the chapter's own pages
(PDF pp.16-20) and keyed from its own answer table (PDF p.22: "Answers of Genetic Codes"). Q45-46
(codon-table lookups) deferred — their source page (PDF p.21) was not located this pass. Q7
deliberately skipped as redundant with Q1/Q2, per the pre-existing note in this same ledger.

| Concept | ID | Qs | Status |
|---|---|---:|---|
| Disease-mutation type associations (DMD/nonsense, sickle cell/missense, alpha-thal/frameshift, beta-thal/splice-site, Huntington/trinucleotide-repeat) | `CON-FND-BCF447304F1CBC` | Q12-16 | **new** |
| Codon table point-mutation consequence lookup (translate sequence, anticodon lookup, degenerate codon, stop-to-sense elongation, missense identification) | `CON-FND-4E6727895BF8B5` | Q17-22, Q30 | **new** |
| Adaptor hypothesis (mischarged tRNA incorporated by anticodon, not cargo) | `CON-FND-18F0DFB98E394F` | Q28 | **new** |
| Genetic code properties (reused, already ASU-tagged) | `CON-FND-A1B0BFB9626438` | Q26, Q27, Q38 | reused |
| Nonsense/missense/silent (reused, already ASU-tagged) | `CON-FND-4508AC0EA86F86` | Q36 | reused |
| Transition/transversion/frameshift (reused, already ASU-tagged) | `CON-FND-25E8976EFF0509` | Q44 | reused |

New concepts' `article_ids` point at the pre-existing Alexandria article `ART-FND-TRANSCRIPTION-CODE-
TRANSLATION` (already this module's home article for the genetic-code cluster), except the adaptor-
hypothesis concept, which points at Cluster 5's own `ART-FND-TRANSLATION-ENERGETICS-GENE-STRUCTURE`.
Reused concepts' actual article homes turned out to be Kasr's `ART-102-BIO-PROTEIN-SYNTHESIS-
TRANSLATION` (not the Alexandria article) for Q36/Q44 — `library_ids` set accordingly per-question,
not assumed from the concept's cluster-mates. Full evidence chain (3 claims, 3 citations, no new
spans). Files: `concept/ASU-MBG-genetic-code-disease-mutations-concepts.md`, `evidence/ASU-MBG-
genetic-code-disease-mutations-{claims,citations}.md`, `question/ASU-MBG-genetic-code-disease-
mutations-mcq.md`.

**Disclosed source/teaching nuance:** the department's own answer key pairs DMD with nonsense
mutation and alpha-thalassaemia with frameshift mutation (Q12, Q14), while more commonly cited
teaching describes DMD as predominantly caused by out-of-frame (frameshift) deletions and alpha-
thalassaemia by large gene deletions. Followed the department's own key rather than silently
substituting a different pairing (both explanations disclose the nuance explicitly), consistent with
this lane's established practice for keyed-but-atypical facts (cf. author7's Q16/Q17 energetics
disclosure). The five-question run's internal a-b-c-d-e answer-letter cycling, plus three of five
pairings matching strong independent priors (sickle cell/missense, beta-thal/splice-site, Huntington/
repeat), gave high confidence the table was read at the correct row/column, not off-by-one.

Search-before-mint (`find-existing.mjs`): "mischarged tRNA adaptor hypothesis", "Duchenne muscular
dystrophy mutation", "thalassemia mutation type", "stop codon readthrough elongated protein",
"Huntington disease trinucleotide repeat", "sickle cell anemia missense mutation" all returned no
hit — genuinely new content. The only near neighbour found was `CON-FND-A385468E42B123` (genetic
anticipation, from author6's modes-of-inheritance cluster) — a different fact about the same
Huntington/repeat biology, linked as `related_concept_ids` rather than merged.

Gates: `medical:batch` clean, 0 errors, on all four files (question file `--with` the new concept
file, both ASU pending-live overlay files, the module's evidence-sources file, Cluster 5's own
translation-articles file, Alexandria's `AU-MED-102-biochem-molecular-concepts.md`, and Kasr's
`102-INT-mcq-concepts.md` — needed to resolve two reused concepts' actual `article_ids`, which turned
out to differ from their Alexandria cluster-mates). First revision had a 39% under-3-sentences
explanation-length warning (7 of 18 correct-answer explanations were "Correct." plus only one more
sentence); strengthened all 7 to a genuine 3+ sentences before the final gate run, which now reads
0% under 200 chars / 0% under 3 sentences. `medical:simulate` (positional, `--emit` to scratch) 0
errors, 0 skipped, `delta: {articles:13, concepts:41, claims:3, citations:3, resources:1,
articleSpans:0}` against the full cumulative pending-live state; questions `created:18, updated:0,
rejected:0`. `medical:audit --source <emitted-state>` 562 total errors on this run's full simulated
state (a different file set than Cluster 1's own isolated audit, so not directly comparable in raw
count), and by exact-id filtering only 1 error matches any of this pass's 3 new concepts (the same
generic, harmless `relatedArticleIds missing` completeness note already present on dozens of prior
concepts, now also naming 2 of these 3) — 0 errors mention any of this pass's 18 questions, 3 claims
or 3 citations.

**Traceable share:** 18/18 questions traceable to a `main_concept` covered by an article — 100%.

Commit on `asu-mbg-author10`: concepts + evidence + questions + this ledger update, in one commit.
Pushed to origin.

## Done (author7, branch `asu-mbg-author7`, base `asu-mbg-author6` @ 937d4e8b)

**Cluster 5 · Translation / Protein Synthesis — CLOSED, all 65 questions authored.**

Keys recovered from the chapter's own answer table (PDF p.30, which also carries the chapter's own
Q60-65 — the table is not on a page by itself). Page map: pg22=Q1-6, pg23=Q7-14, pg24=Q15-22,
pg25=Q23-30, pg26=Q31-37, pg27=Q38-45, pg28=Q46-52, pg29=Q53-59, pg30=Q60-65+answer table.

Search-before-mint found 13 existing cross-university concepts (mostly Kasr's `102-INT-mcq-concepts.md`
"Protein Synthesis (Translation)" chapter and `101-ISK-mcq-concepts.md` histology chapter, plus two from
Alexandria's `AU-MED-102-biochem-molecular-concepts.md`) already covering most of the chapter — these
were sparse-overlaid with ASU tags (`+asu`, `+1`, `+ASU-MBG`, field_notes citation) rather than
duplicated, appended to `pending-live/ASU-MBG-molecular-genetics.md`. Two of their articles
(`ART-101-HIS-CYTOPLASMIC-ORGANELLES`, `ART-102-BIO-ENZYMES`) needed a first ASU overlay too, appended
to `pending-live/ASU-MBG-molecular-genetics-articles.md`.

6 new concepts minted for genuinely untaught facts (prokaryotic initiation apparatus was explicitly
out of scope for the one existing — eukaryotic-only — initiation concept; the E site was never
mentioned anywhere in the corpus; peptidyl transferase's specific 28S/23S rRNA identity existed only
at the subunit-location level; aminoacyl-tRNA-synthetase fidelity/"second genetic code" appeared
nowhere; the full per-residue energy tally and the mono/polycistronic gene-structure contrast were
both absent). Two new minimal `TPL-CONCEPT` articles teach these 6, cross-linked to the two existing
translation articles they deepen rather than duplicate.

| Concept | ID | Qs | Status |
|---|---|---:|---|
| Elongation cycle (A site, 60S peptidyl transferase, A→P translocation, 5'→3', N→C) | `CON-FND-9A1437CD0A382C` (Kasr, overlaid) | Q3,4,5,8,9,19,21,25,33,37,46,48,56,61,63 | reused |
| Translocation (eEF-2+GTP, A→P) | `CON-FND-60F505DFC88026` (Alexandria, overlaid) | Q14 | reused |
| Eukaryotic initiation (IF-4/40S/AUG/Met-tRNAi/P site) | `CON-FND-CC6BAFEE04D3F8` (Kasr, overlaid) | Q29,35,41,52,55 | reused |
| Translation requirements + 2-step ATP→AMP+PPi charging + 20 synthetases | `CON-FND-89278C7DEE1C9C` (Kasr, overlaid) | Q7,15,34,36 | reused |
| tRNA cloverleaf (acceptor/D/anticodon/TψC arms) | `CON-FND-4DCC3E30FD4C86` (Kasr, overlaid) | Q2,51 | reused |
| tRNA 3'-CCA ester bond (already ASU-tagged by author5) | `CON-FND-CA2D65E688434A` | Q11 | reused, no new overlay |
| Reversible phosphorylation (kinase/phosphatase, activate/inactivate) | `CON-FND-6A58FA1680290F` (Kasr, overlaid) | Q13,58,59,60 | reused |
| Covalent PTM types (glycosylation etc.) | `CON-FND-344140D2457FBB` (Kasr, overlaid) | Q12,43 | reused |
| Proteasome/ubiquitin | `CON-FND-0D6F0DC6CBAD60` (Kasr, overlaid) | Q22,50 | reused |
| Ribosome structure (rRNA+protein, 2 subunits) + polysome def | `CON-FND-4284C6B8667CD6` (Kasr, overlaid) | Q31,57 | reused |
| Free vs attached ribosome protein targeting | `CON-FND-60953640114635` (Kasr, overlaid) | Q44,45 | reused |
| Termination (stop codon→A site, release factor, peptidyl transferase hydrolysis) | `CON-FND-38857DFD506559` (Alexandria, overlaid) | Q18,32 | reused |
| Prokaryotic initiation (30S/Shine-Dalgarno/H-bonds/fMet/P-site entry) | `CON-FND-6D0BFB1CD8B9A3` | Q10,28,38,39,40 | **new** |
| E site + polysome 3'-end/longest-chain directionality | `CON-FND-8C0EB47D70D27A` | Q6,47 | **new** |
| Peptidyl transferase ribozyme identity (28S/23S rRNA) | `CON-FND-E5354D98C97340` | Q23,24,27,53,64 | **new** |
| Synthetase specificity/fidelity ("second genetic code") + decoding center | `CON-FND-02E8733D78D5DC` | Q20,26,54,62 | **new** |
| Energy cost of translation (4 bonds/residue; disclosed 3-bonds/residue convention for Q17's "30") | `CON-FND-E8FDAF79A38797` | Q1,16,17,30 | **new** |
| Polycistronic vs monocistronic mRNA/gene structure | `CON-FND-175BC0480CCD48` | Q42,49,65 | **new** |

Total: 42 questions on 13 reused/overlaid concepts + 23 questions on 6 new concepts = 65/65.

Files: `concept/ASU-MBG-translation-protein-synthesis-concepts.md`, `article/ASU-MBG-translation-protein-
synthesis-articles.md`, `evidence/ASU-MBG-translation-protein-synthesis-{claims,citations,spans}.md`,
`question/ASU-MBG-translation-protein-synthesis-mcq.md`, plus overlay appends to `pending-live/ASU-MBG-
molecular-genetics.md` and `pending-live/ASU-MBG-molecular-genetics-articles.md`.

**Known, disclosed source inconsistency:** Q16 (4 high-energy bonds per amino acid added, the fuller
and more standard count) and Q17 (30 bonds total for a 10-amino-acid chain, which implies a simplified
3-bonds-per-residue convention) do not arithmetically agree with each other under a single counting
rule — both are the department's own keyed answers from the same answer table, not a transcription
error on this pass's part. Disclosed explicitly in both questions' explanations and in the energetics
concept's own definition/uncertainty fields rather than silently forced to agree.

**Two near-duplicate reordered-option pairs**, both legitimately authored as separate items per the
source's own numbering: Q47/Q48 (P→E and A→P translocation movements, each independently correct and
individually tested) and Q54/Q62 (both keyed to aminoacyl-tRNA synthetase specificity/fidelity, options
reordered). Q61 is diagram-based in the source (a labelled elongation-complex schematic); reworded as a
self-contained text description preserving the exact tested fact (the growing peptide's far/exiting end
is mislabelled "carboxy-terminus" when it is actually the N-terminal, already-synthesized portion) since
this platform's question schema has no image field for MCQ stems.

Gates: `medical:batch` clean (0 errors; explanation-length warning resolved to ~2% under-3-sentences
residual, confirmed by manual review to be a heuristic false-positive on quote/em-dash punctuation, not
a real gap) across all four new files plus all 13 cross-university sibling concept/article files plus
both pending-live overlay files. `medical:simulate` (positional, apply order, `--emit` to a scratch
file) 0 errors, 0 skipped, `delta: {articles:13, concepts:44, claims:6, citations:6, resources:1,
articleSpans:2}` against the full cumulative pending-live state (13/44 reflect every prior session's
still-pending overlay work, not just this pass's — this pass's own new-record contribution is 2
articles + 6 concepts + 6 claims + 6 citations + 2 spans + 65 questions); questions `created:65,
updated:0, rejected:0`. `medical:audit --source <emitted-state>` 548 total errors on the full simulated
state, but by exact-id filtering: only 1 error matches any of this pass's 6 new concept/2 new article
ids (`CON-FND-175BC0480CCD48.relatedArticleIds missing` — the same generic, harmless field-completeness
note already present on dozens of pre-existing sparse-overlay concepts from prior sessions, not a new
category of gap), and 0 errors mention any of this pass's 65 questions. A baseline audit of the
untouched live state returns 0 errors; a control audit of only the pre-session pending-live content (as
it stood before this pass, no new files) already returns 411 errors — confirming the 548 figure is
overwhelmingly pre-existing accumulation across three authoring sessions' sparse-overlay work, not a
regression this pass introduced.

**Traceable share:** 65/65 questions traceable to a `main_concept` that is covered by one of 15 articles
(13 pre-existing Kasr/Alexandria/histology articles the reused concepts already point to, 2 new ones
minted this pass) — 100%.

Commits on `asu-mbg-author7`: `0a8344dc` (6 concepts + 2 articles + evidence + 11 concept/2 article
overlays), `56b02b79` (Q1-30), `d46cffa6` (Q31-45), plus the final Q46-65 + explanation-strengthening
commit and this ledger update. Pushed to origin.

## Done (author6, branch `asu-mbg-author6`, base `asu-mbg-author5` @ 2e8f8145)

**Cluster 7 · Modes of inheritance — CLOSED, all 52 questions authored.**

12 new concepts (subject `fnd`, zero live/pending hits found on search — genuinely new per triage),
2 new `TPL-CONCEPT` articles teaching all 12, full evidence chain (12 claims, 12 citations, 2 spans),
and one resource record closing a real gap (see below). All 52 questions from the "Mode of
Inheritance" chapter authored, keys recovered from the chapter's own answer table (PDF p.50).

| Concept | ID | Qs |
|---|---|---:|
| Genotype/phenotype/allele | `CON-FND-C37775BB2D8741` | Q4-7 |
| Zygosity states | `CON-FND-9D8C8CCF783D24` | Q8-13 |
| Autosomal dominant pattern | `CON-FND-398856B4B32D8E` | Q2, Q14, Q28, Q31, Q33, Q40, Q45, Q51 |
| New mutation → sporadic AD | `CON-FND-B8CDB276EC9E25` | Q3, Q50 |
| Autosomal recessive pattern | `CON-FND-87B8D24E724816` | Q22, Q27, Q32, Q34, Q35, Q44 |
| X-linked dominant pattern | `CON-FND-70936F91A4C8E5` | Q23, Q26, Q36 (shared), Q46 |
| X-linked recessive pattern | `CON-FND-592065F09E7EC8` | Q21, Q24, Q25, Q36 (shared), Q37, Q41, Q47, Q49 |
| Y-linked (holandric) | `CON-FND-613ADDD5AAE5EA` | Q38, Q39 |
| Mitochondrial pattern | `CON-FND-2ECC10B655DD47` | Q15-17 |
| Genomic imprinting (PWS/Angelman) | `CON-FND-12961F079B4C89` | Q18, Q19, Q29 |
| Trinucleotide repeat/anticipation | `CON-FND-A385468E42B123` | Q20, Q30, Q42, Q48, Q52 |
| Multifactorial risk factors | `CON-FND-D1119AD6424AF0` | Q43 |
| (reused, no new concept) | `CON-DEV-451A64C9445CAB` (author4's euploidy/aneuploidy concept) | Q1 (triploid ploidy arithmetic) |

Articles: `ART-FND-MENDELIAN-INHERITANCE-PATTERNS` (9 concepts), `ART-FND-NON-MENDELIAN-INHERITANCE-PATTERNS`
(3 concepts). Files: `concept/ASU-MBG-modes-of-inheritance-concepts.md`, `article/ASU-MBG-modes-of-
inheritance-articles.md`, `question/ASU-MBG-modes-of-inheritance-mcq.md`, `evidence/ASU-MBG-modes-of-
inheritance-{claims,citations,spans}.md`.

**Side fix, not a triage cluster:** `src_d83a3017c760e2770c22` — the resource id for the whole
`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf` source, already cited by author5 on 24+ live-pending
RNA/genetic-code questions and one concept — had never been registered in the evidence store (no
`## processing_status`/`## institution` record existed anywhere). Registered it in
`evidence/ASU-MBG-molecular-genetics-sources.md`. The repo's `evidence/corpus-source-index.json` was
also stale (1362 sources, missing this one and others); regenerated via
`node --experimental-strip-types scripts/asu/build-source-index.ts` → 1965 sources, all three ASU-year
manifests merged. Any ASU citation that previously failed `medical:batch` with "not a source the
corpus contains" should be re-checked against the fresh index before assuming it's still broken.

Gates (full chain, all four files together): `medical:batch` clean with `--with` naming the concept/
article/resource siblings plus the Kasr `104-CPS-histology{,-concepts}.md` + ASU `pending-live/
ASU-MBG-molecular-genetics.md` files (needed to resolve the reused `CON-DEV-451A64C9445CAB`);
`medical:simulate` (positional, apply order) `delta: {articles:2, concepts:12, claims:12, citations:12,
resources:1, articleSpans:2, questions:52}`, `skipped: []`, `errors: []`; `medical:audit --source`
0 errors traceable to any of these 12 concepts, 2 articles or 52 questions by exact-id filtering (the
349 total errors on the full simulated state are pre-existing gaps in the Kasr/pending-live sibling
files pulled in only to resolve the Q1 dependency — not introduced by this batch). Difficulty mix
across the 52: Easy 33% / Moderate 44% / Hard 19% / Challenging 4% (within the 15pp drift band of the
bank target, so `medical:batch` raised no note).

**Traceable share:** 52/52 questions traceable to a `main_concept` that is covered by one of the two
new articles (or, for Q1, by the pre-existing `ART-104-HIS-NUMERICAL-ABERRATIONS`) — 100%.

Commits on `asu-mbg-author6`: `92b60f7e` (concepts+articles+evidence+resource-registry-fix),
`029526a5` (Q1-13), `36eca534` (Q14-26), `e241f3f5` (Q27-39), `d794444c` (Q40-52),
`b153ba81` (this ledger), `1856e28b` (Ruling #1, below). Pushed to origin.

**Ruling #2 applied (chief-of-staff, this session's brief):** Cluster 6 (Gene expression regulation)
left alone per ruling — unrecoverable blacked-out key, not re-triaged, not touched.

**Ruling #1 applied — Cluster 2 prokaryotic apparatus CLOSED (tested-but-untaught).**

The 8 banked questions this lane had already flagged with no covering article (Q35, Q37, Q48, Q49,
Q58, Q76, Q80, Q81, "RNA Structure & Transcription" chapter) are now taught. 2 new minimal concepts,
scoped to exactly what these 8 ask and no wider:

| Concept | ID | Qs |
|---|---|---:|
| Sigma factor / holoenzyme / Pribnow box (initiation) | `CON-FND-A10D3E6030F49D` | Q49, Q58, Q76, Q80, Q81 |
| Rho-dependent vs intrinsic termination, no transcription helicase | `CON-FND-E5651C6097AEC7` | Q35, Q37, Q48 |

One minimal `TPL-CONCEPT` article, `ART-FND-PROKARYOTIC-TRANSCRIPTION-APPARATUS`, teaches both,
cross-linked to Alexandria's `ART-FND-TRANSCRIPTION-CODE-TRANSLATION` as the prokaryote/eukaryote
contrast pair. Full evidence chain (2 claims, 2 citations, 1 span) citing this same module's own
`src_d83a3017c760e2770c22`; field_notes disclose the ruling and that the mechanism is standard
textbook content with no specific external page verified this pass. Files:
`concept/ASU-MBG-prokaryotic-transcription-apparatus-concepts.md`, matching `article/`, `question/`
and `evidence/*` files of the same name-stem.

Gates: `medical:batch` clean (concepts 52/52 fields each — caught and fixed one `microtopicId`
field_notes gap the audit flagged: a free-text `## microtopic` value doesn't resolve to a `MIC_` id,
the same finding Alexandria's lane already documented for its own concepts); `related_articles`
directory-scope false positive on `ART-FND-TRANSCRIPTION-CODE-TRANSLATION` confirmed harmless via
`medical:simulate` per 04-library-articles.md's own documented caveat; `medical:simulate` created
2 concepts / 1 article / 2 claims / 2 citations / 1 span / 8 questions, 0 skipped, 0 errors;
`medical:audit` 0 errors traceable to either concept, the article, or any of the 8 questions.
Commit `1856e28b`.

## Done (author4/author5, branch `asu-mbg-author5`)

| Cluster | Qs authored | Concepts | Notes |
|---|---:|---|---|
| 10 · DNA/nucleotide chemistry | 24 (1 unkeyed, blacked cell) | 2 new | author4, commit 9b14aa42 |
| 11 · DNA replication | (within the 24 above) | — | author4, commit 9b14aa42 |
| 12 · DNA repair | (within the 24 above) | — | author4, commit 9b14aa42 |
| 8 · Chromosomal/numerical disorders | 32 (with cluster 9) | 5 overlay rows + 2 live-tag fixes | author4, commit 7e83c6b3 |
| 9 · Cytogenetic diagnostic techniques | (within the 32 above) | 1 new | author4, commit 7e83c6b3 |
| 1 · RNA types/post-transcriptional processing (partial) | 3 (Q3,7,9 — capping/poly-A) | 0 new (overlay CON-FND-5FF8EB2DB4D662) | author5, commit 1 |
| 2 · Transcription mechanism (partial — eukaryotic only, prokaryotic apparatus still open) | 15 (RNA pol I/II/III ×6, coding/template strand ×2, promoter/TATA/splicing ×4, tRNA-CCA aminoacylation ×4 minus 2 double-counted — see table below) | 0 new (4 overlays in Alexandria's AU-MED-102-biochem-molecular-concepts.md + 1 in Kasr's 102-INT-mcq-concepts.md) | author5, commit 1 |
| 3 · Genetic code properties (done) | 8 (Q1,2,3,5,34,39,40,47) | 0 new (overlay CON-FND-A1B0BFB9626438) | author5, commit 2 |
| 3 · Wobble/anticodon (done, was folded into cluster 3 in triage) | 2 (Q4, Q41) | 0 new (overlay CON-FND-FB17D0600C8D49) | author5, commit 2 |
| 4 · Mutation types & disease correlations (partial — transition/transversion/frameshift + nonsense/missense/silent done; other disease correlations e.g. Duchenne/thalassaemia/Huntington repeat-Qs from p.16-17 not yet authored) | 10 (Q6,23,24,29,43 on CON-FND-25E8976EFF0509; Q8,9,10,11,37 on CON-FND-4508AC0EA86F86) | 0 new (2 overlays, both in Kasr's 102-INT-mcq-concepts.md) | author5, commit 2 |
| 5 · Translation/protein synthesis (partial — start/stop codon recognition done; ribosome mechanics, peptidyl transferase, initiation factors etc. from "Translation Protein Synthesis Q1-59" not yet authored) | 4 (Q25,31,32,33) | 0 new (overlay CON-FND-09FACBDCBBF8FD) | author5, commit 2 |
| (reuse, no cluster) | 1 (Q36, topoisomerase shared enzyme) | 0 new — reused CON-FND-FFEE58EC9C0784, already ASU-tagged from author4 | author5, commit 1 |

Exact author5 question list (44 total, all from source file `EOM MCQs - Bg genetics final Mcqs
dr.Omar.pdf`):

Commit 1 ("RNA Structure & Transcription" chapter, Q1-106) — 20 questions:
- mRNA processing (CON-FND-5FF8EB2DB4D662): Q3, Q7, Q9 — 3
- RNA polymerase I/II/III (CON-FND-412F3EDF118F44): Q16, Q32, Q45, Q64, Q65, Q94 — 6
- Coding vs template strand (CON-FND-D717E6E7EEA466): Q29, Q69 — 2
- Eukaryotic transcription elements/TATA/splicing (CON-FND-CC55F157021237): Q39, Q75, Q93, Q96 — 4
- tRNA 3'-CCA aminoacylation (CON-FND-CA2D65E688434A): Q8, Q11, Q18, Q19 — 4
- Topoisomerase, reused (CON-FND-FFEE58EC9C0784): Q36 — 1

Commit 2 ("Genetic Codes" chapter, its own Q1-52, plus opening items of "Translation Protein
Synthesis" Q1-59) — 24 questions:
- Genetic code properties (CON-FND-A1B0BFB9626438): Q1, Q2, Q3, Q5, Q34, Q39, Q40, Q47 — 8
- Wobble/anticodon pairing (CON-FND-FB17D0600C8D49): Q4, Q41 — 2
- Transition/transversion/frameshift (CON-FND-25E8976EFF0509): Q6 (CF ΔF508), Q23, Q24, Q29, Q43 — 5
- Nonsense/missense/silent (CON-FND-4508AC0EA86F86): Q8, Q9, Q10, Q11, Q37 — 5
- AUG start/stop codon recognition (CON-FND-09FACBDCBBF8FD): Q25, Q31, Q32, Q33 — 4

Total = 20 + 24 = 44. Running lane total: 56 (author4) + 44 (author5) = **100 questions**.

## Real starting state found by author5 (git vs the dispatch brief)

The dispatch brief described "56 MCQs across 2 clusters" — confirmed exact by reading
`git log` on `origin/asu-mbg-author4` (commits `9b14aa42`, `7e83c6b3`) and the two question
files' line counts. No PROGRESS.md existed on the branch; this file is the first one.
`ASU-MBG-triage.md` (commit `0989b972`) is the authoritative remaining-scope source — it names
12 clusters, all sourced from the same 8-file S1 triage pass.

## Remaining (not yet authored)

All still sourced from `EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf` unless noted.

| Cluster | Rough Qs left | Key concepts still needed | Status |
|---|---:|---|---|
| 1 · RNA types (superlatives) | **CLOSED this pass (author10) — all 6 questions authored. See the "Done (author10)" section above.** | — | done |
| 2 · Transcription mechanism (prokaryotic apparatus) | **CLOSED this pass (author6) per chief-of-staff Ruling #1 — see the "Done" section above.** | — | done |
| 3/4 · Genetic code remainder | **18/~20 authored this pass (author10) — Q12-22, Q26-28, Q30, Q36, Q38, Q44. See the "Cluster 3/4 remainder" section above.** Still open: Q45-46 (codon-table lookups, PDF p.21 not located this pass). Q7 deliberately skipped (redundant w/ Q1/Q2). | Q45-46 need PDF p.21 (not yet found/rendered) | mostly done, 2 Qs open |
| 5 · Translation/protein synthesis (whole chapter) | **CLOSED this pass (author7) — all 65 questions authored. See the "Done (author7)" section above.** | — | done |
| 6 · Gene expression regulation | ~16+ Q in file 1's "Regulation of Gene Expression" section | **answers physically blacked out/redacted in the source scan** — genuine unrecoverable-key case (confirmed again this pass on p.15's own table having 2 blacked cells, Q17/Q82, same hazard pattern). `MCQs - Formative Gene expression gene therapy.docx` (4 items) also 0/4 keyed (plain-text extraction strips highlighting) | **blocked** — log needs-Omar, do not force. Do not re-triage per chief-of-staff ruling this session. |
| 7 · Modes of inheritance | **CLOSED this pass (author6) — see the "Done" section above.** | — | done |
| (misc) | "Collection Questions" Q1-27, LMS snippets ~15, file 1 pp.33-49 (~17pp not yet opened — pp.20-28, 30 now opened as the Genetic-Codes/Translation chapters and its answer table; pp.33-52 opened this pass while authoring cluster 7, no unrelated content of note beyond the "Molecular Biology of Cancer" chapter noted below), file 8 (essay) page count/remainder | unmapped | not yet triaged in detail |
| 13 · Molecular Biology of Cancer | **CLOSED this pass (author11) — all 44 questions authored, PDF pp.35-41. See "Cluster 13" in the "Done" section above.** | — | done |
| 14 · Gene Therapy | **CLOSED this pass (author12) — all 24 questions authored, PDF pp.41-43 (immediately after Cluster 13's own answer table, on the same page). Own "Answers of Gene Therapy" table is on PDF p.43 (corrects the earlier "p.44" guess — p.44 is the already-closed Mode of Inheritance chapter). See `coverage/ASU-MBG-triage.md` Cluster 14 for the full triage, and `coverage/ASU-MBG-LEDGER.md` for the gate summary.** | — | done |

## Page map confirmed this pass (PDF page index, via `pdftoppm`, cross-checked against printed page numbers where visible)

`EOM MCQs - Bg genetics final Mcqs dr.Omar.pdf`: pg1=cover, pg2=notes, pg3=Q1-9 (RNA Structure &
Transcription), pg4=Q10-17, pg5=Q18-25, pg6=Q26-34, pg7=Q35-43, pg8=Q44-52, pg9=Q53-61,
pg10=Q62-70, pg11=Q71-79, pg12=Q80-89(ish), pg13=Q90-98(ish), pg14=Q99-105, pg15=Q106 + the
RNA-Structure-&-Transcription answer table + Genetic Codes Q1-4, pg16=Genetic Codes Q5-12,
pg17=Q13-19 + codon table, pg18=Q20-27, pg19=Q28-35, pg20=Q36-44, pg21=Q45-52, pg22=Genetic
Codes answer table + Translation "Protein Synthesis" Q1-6, pg23=Q7-14, pg24=Q15-22, pg25=Q23-30,
pg26=Q31-37, pg27=Q38-45, pg28=Q46-52, pg29=Q53-59. The Translation chapter's own answer table
has not yet been located/read (needed before authoring cluster 5's remainder).

## Page map extended this pass (author6)

pg30 = Translation "RNA Translation" chapter's own answer table, Q1-65 (corrects the previous
"~59" guess — the chapter runs one number higher and the table is a single unsplit block).
pg33 = tail of "Regulation of Gene Expression" (Q17-24, cis/trans-acting elements, histone
acetylation) with "Answers of Regulation of Gene expression" bleeding through as ghost text from
the next page — that gene-expression answer table itself was not re-opened this pass (already
flagged blacked-out/unrecoverable by the prior pass, see Hazards). pg34-43ish = a "Molecular
Biology of Cancer" chapter not in the original 8-source triage at all (p53, Rb, retroviruses,
apoptosis, CRISPR/gene therapy) — pg40 (printed "39") showed Q37-44 on p53/apoptosis/retroviruses,
pg44 (printed "42") showed Q18-24 on CRISPR/gene editing with its own "Answers of Gene Therapy"
table (Q1-24) — meaning the cancer-biology sub-section (Q1-~36ish) has an earlier table not yet
located, and the whole chapter is unmapped and untriaged. pg44 (printed "43") = Mode of Inheritance
Q1-9, confirming this chapter's own start; pg44-50 covers all 52 of its questions plus its own
answer table on pg50 (see the "Done" section above for the full breakdown).

## Hazards confirmed this pass

- Q17 and Q82 of the RNA-Structure-&-Transcription answer table (p.15 of the PDF) are
  physically blacked-out/redacted cells, matching the same hazard already flagged for the
  Gene-Expression chapter — genuinely unrecoverable, not "not yet found". Both skipped.
- File-page-number citations in this batch use the PDF's own rendered page index (via
  `pdftoppm`), confirmed against three independent page renders (12, 14, 15) and
  cross-checked against the answer-key table's own internal consistency (Q25's calculation,
  Q29's and Q69's strand-direction derivations all matched the printed key) — high confidence
  the OCR/manual transcription is correct even though the source is a scanned photocopy.
