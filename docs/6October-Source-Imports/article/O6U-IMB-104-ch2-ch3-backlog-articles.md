# Item

## id
ART-O6U-IMB-DNA-POLYMERASE-ENZYMOLOGY

## title
DNA polymerase enzymology, replication directionality and cell-cycle timing

## arabic_title


## aliases


## subject
fnd

## topic
Molecular Biology

## subtopic
DNA polymerase enzymology and replication timing

## microtopic


## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids


## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
DNA polymerases extend an existing primer's free 3'-OH end, so all DNA synthesis runs 5' to 3', continuously on the leading strand and discontinuously on the lagging strand. In eukaryotes, several named polymerases split the work: α-primase lays down RNA primers, δ and ε carry out bulk strand synthesis, β repairs, and γ replicates mitochondrial DNA. RNA primer removal is a separate step (RNase H1/FEN1), not a polymerase's own job. All of this happens once per cycle, during S phase.

## sections
### Definition
DNA polymerase is the enzyme family that extends a primer by adding deoxyribonucleotides complementary to a template strand. It requires three things: a template strand to read, a primer bearing a free 3'-hydroxyl end to extend, and the four deoxyribonucleoside triphosphates (dATP, dCTP, dGTP, dTTP) as substrates. It cannot start a chain de novo, and it cannot extend from a free 5'-hydroxyl end -- extension always adds the incoming nucleotide's phosphate onto the primer's 3'-OH.

### Mechanism
Because extension is only possible 5' to 3', and the two template strands are antiparallel, one new strand (leading) is built continuously toward the replication fork from a single primer, while the other (lagging) is built discontinuously as a series of separately primed Okazaki fragments. In eukaryotes, polymerase α-primase lays down the initial RNA primers; δ and ε then carry out most of the processive strand synthesis (their precise leading/lagging assignment is debated across sources); β is a small, repair-dedicated polymerase; and γ is dedicated to mitochondrial DNA replication. Primer removal in eukaryotes is carried out by RNase H1 and FEN1, not by any of the named polymerases. DNA replication itself is confined to the S phase of the cell cycle, between the G1 and G2 gap phases.

### Key determinants
Sort "3'-OH required to extend" from "5'-OH plays no role" -- polymerase chemistry only works one way. Sort the eukaryotic polymerases by job: α-primase primes, δ/ε bulk-synthesize, β repairs, γ replicates mitochondria. Sort primer synthesis (a polymerase-associated primase) from primer removal (RNase H1/FEN1, not a polymerase). Place DNA replication specifically in S phase, not G1, G2 or M.

### Clinical significance
Because DNA polymerase γ is the sole replicase for mitochondrial DNA, drugs and mutations that impair it (e.g. certain nucleoside reverse transcriptase inhibitors) can cause mitochondrial toxicity, since nuclear polymerases are unaffected but the mitochondrial genome cannot be copied. Errors in distinguishing primer synthesis from primer removal, or in misplacing DNA replication outside S phase, are common exam traps that also reflect real conceptual boundaries between initiation, elongation and cell-cycle control.

## published_summary


## published_sections


## hold_these
DNA polymerase extends only from a primer's free 3'-OH end; synthesis is always 5' to 3'.
DNA replication occurs during S phase of the cell cycle.
One new strand at the fork is continuous (leading), the other discontinuous (lagging).
Eukaryotic polymerase α-primase makes RNA primers; RNase H1/FEN1, not a polymerase, removes them.

## lose_the_mark
Saying DNA polymerase needs a free 5'-OH primer end instead of a free 3'-OH end.
Placing DNA replication in G1, G2 or M phase instead of S phase.
Crediting a DNA polymerase (especially ε) with removing RNA primers.
Assuming both new strands at the fork are synthesized the same way (continuously or discontinuously).

## callout_evidence


## media


## media_recommendations


## related_concepts
CON-FND-C28D9173578FBF
CON-FND-408B11A406E8AF
CON-FND-4294A1B5F0B4B1
CON-FND-C8B6F732224055
CON-FND-201FE6CA503CB8
CON-FND-91BDB9708FC3A9

## related_articles


## resource_ids
src_15a36a801ec0b4a6705d

## article_source_ids
src_15a36a801ec0b4a6705d

## evidence_basis
Written from the printed-key facts of Bio questions.pdf's Chapter 2 (Replication) "MCQ Answers" table (coverage/O6U-IMB-104-triage.md); no department book chapter was available for this module this pass.

## claim_ids


## span_ids


## evidence_gaps
No corpus-indexed source yet for these facts -- this PDF has not been through the shared corpus extraction pipeline. An S5 evidence pass is owed.

## notes


## field_notes
arabicTitle: No verification pass run this session.
aliases: No verification pass run this session.
module: No verified live O6U-IMB-104 module id supplied yet.
microtopic: Not assigned at authoring time.
nanotopic: Not assigned.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet scheduled.

## question_ids
[clear]

## university_notes
[clear]

## conflicts
[clear]

## last_reviewed
[clear]

## review_due
[clear]

## universities
o6u

## years
O6U_Y1

## module
[clear]

---

# Item

## id
ART-O6U-IMB-REPLICATION-PRIMING-AND-REPAIR

## title
Replication priming, prokaryotic polymerase III, and DNA repair enzymology

## arabic_title


## aliases


## subject
fnd

## topic
Molecular Biology

## subtopic
Replication priming, prokaryotic polymerase III and DNA repair

## microtopic


## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids


## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Every new DNA strand needs a short RNA primer, made by primase, before any DNA polymerase can extend it -- the lagging strand needs a fresh one for every Okazaki fragment. In prokaryotes, one polymerase (III) handles both leading and lagging strand synthesis, while polymerase I removes the RNA primers and fills the gaps; eukaryotes instead split leading/lagging synthesis across separate polymerases. Standard DNA excision repair needs an endonuclease, exonuclease and repair polymerase, but not topoisomerase.

## sections
### Definition
Primase is the enzyme that synthesizes the short RNA primer needed to start any stretch of DNA synthesis, since DNA polymerases cannot initiate a chain de novo and can only extend an existing 3'-OH end. In prokaryotes this enzyme is DnaG; a fresh primer is required for the single leading strand and for every Okazaki fragment of the lagging strand. Prokaryotic DNA polymerase III is the main replicative enzyme, extending both of these primed strands, while polymerase I is a separate, smaller enzyme responsible for excising the RNA primers (via its 5'→3' exonuclease activity) and filling the resulting gaps with DNA.

### Mechanism
At a prokaryotic replication fork, DnaG primase lays down RNA primers for both strands; polymerase III holoenzyme then extends the leading strand continuously and the lagging strand discontinuously as Okazaki fragments, using two linked catalytic cores. Polymerase I follows behind on the lagging strand, removing each RNA primer and replacing it with DNA (nick translation), after which DNA ligase seals the remaining nick. Eukaryotes achieve the same overall priming logic (RNA primer made by the α-primase complex) but assign leading- and lagging-strand bulk synthesis to different named polymerases rather than one enzyme handling both, which is the chief prokaryote-versus-eukaryote mechanistic difference. Separately, standard excision-repair pathways need an endonuclease to cut out damaged DNA, an exonuclease to trim it, and a repair polymerase to fill the gap -- but not topoisomerase, whose role is relieving supercoiling ahead of large-scale unwinding (as at a replication fork), a demand a short repair patch does not create.

### Key determinants
Sort "who makes the primer" (primase, an RNA-synthesizing enzyme) from "who removes it" (polymerase I in prokaryotes) from "who extends it" (polymerase III in prokaryotes). Sort "one enzyme handles both strands" (prokaryotic polymerase III) from "different enzymes per strand" (eukaryotes) as the key prokaryote/eukaryote replication difference. Sort DNA repair's required enzyme set (endo-/exonuclease, repair polymerase, ligase) from topoisomerase, which repair does not need.

### Clinical significance
Antibiotics and mutations that target bacteria-specific replication or repair components exploit exactly these enzyme distinctions; understanding which enzyme does which job (priming vs extension vs primer removal vs repair) is what lets a learner correctly attribute a described defect or drug target to the right step of the pathway rather than to a superficially similar-sounding enzyme.

## published_summary


## published_sections


## hold_these
Primase (not RNA polymerase, not a DNA polymerase) synthesizes the short RNA primer that starts DNA synthesis.
The lagging strand needs a fresh primer for every Okazaki fragment; the leading strand needs only one.
Prokaryotic DNA polymerase III synthesizes both the leading and lagging strands; polymerase I removes RNA primers and fills the gaps.
Eukaryotes, unlike prokaryotes, use different enzymes for leading- versus lagging-strand synthesis.
Standard DNA excision repair does not require topoisomerase.

## lose_the_mark
Crediting RNA polymerase, rather than primase, with making the replication primer.
Confusing prokaryotic polymerase III (extends primed strands) with polymerase I (removes primers, fills gaps).
Thinking eukaryotes and prokaryotes differ in primer chemistry (both use RNA) or in continuity of synthesis (both are semi-discontinuous) rather than in which enzyme handles which strand.
Listing topoisomerase among the enzymes DNA repair requires.

## callout_evidence


## media


## media_recommendations


## related_concepts
CON-FND-E11B3BA47EC432
CON-FND-7F95E485DD35D7
CON-FND-6FFE025FC24D8D
CON-FND-7C18A25349CF71
CON-FND-4849DE26C08ED0
CON-FND-D4A71719452460

## related_articles


## resource_ids
src_15a36a801ec0b4a6705d

## article_source_ids
src_15a36a801ec0b4a6705d

## evidence_basis
Written from the printed-key facts of Bio questions.pdf's Chapter 2 (Replication) "MCQ Answers" table (coverage/O6U-IMB-104-triage.md); no department book chapter was available for this module this pass.

## claim_ids


## span_ids


## evidence_gaps
No corpus-indexed source yet for these facts -- this PDF has not been through the shared corpus extraction pipeline. An S5 evidence pass is owed.

## notes


## field_notes
arabicTitle: No verification pass run this session.
aliases: No verification pass run this session.
module: No verified live O6U-IMB-104 module id supplied yet.
microtopic: Not assigned at authoring time.
nanotopic: Not assigned.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet scheduled.

## question_ids
[clear]

## university_notes
[clear]

## conflicts
[clear]

## last_reviewed
[clear]

## review_due
[clear]

## universities
o6u

## years
O6U_Y1

## module
[clear]

---

# Item

## id
ART-O6U-IMB-PROKARYOTIC-TRANSCRIPTION-APPARATUS

## title
Prokaryotic transcription apparatus: sigma/rho factors, the Pribnow box, rifampicin and RNA synthesis mechanics

## arabic_title


## aliases


## subject
fnd

## topic
Molecular Biology

## subtopic
Prokaryotic transcription apparatus and RNA synthesis mechanics

## microtopic


## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids


## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Bacterial RNA polymerase needs sigma factor to find and bind its promoter -- specifically the Pribnow (-10) box -- and rho factor (or an intrinsic hairpin) to terminate. Rifampicin blocks the polymerase itself, stopping initiation, and is used clinically against mycobacteria. RNA synthesis follows the same 5'-to-3', primer-free, UTP-using rules as replication's polymerase chemistry, just without needing a 3'-OH primer to start.

## sections
### Definition
Sigma factor is the subunit that combines with bacterial RNA polymerase's core enzyme to form the holoenzyme; its job is to recognize promoter sequences, including the Pribnow box (-10 box, consensus TATAAT, positioned about 10bp upstream of the start site), and correctly position the polymerase to begin transcription. Rho factor is one of two termination mechanisms (alongside intrinsic, hairpin-based termination) that stop transcription at the end of a gene. Together, sigma and rho bracket the beginning and end of a prokaryotic transcription cycle.

### Mechanism
Sigma factor guides RNA polymerase holoenzyme to the promoter, where it recognizes the Pribnow box and (further upstream) the -35 box, then helps melt the local DNA duplex to form an open complex. Sigma typically dissociates once RNA synthesis is under way, leaving the core enzyme to elongate the transcript 5' to 3' -- the same obligatory direction as DNA synthesis, since RNA polymerase also extends only from a free 3'-OH end, though unlike DNA polymerase it needs no primer to start. At the gene's end, either rho factor (an ATP-dependent helicase-like protein) pulls the polymerase off the DNA, or an intrinsic G-C-rich hairpin followed by a U-rich stretch destabilizes the elongation complex on its own. Rifampicin interferes with this cycle by binding the polymerase's beta subunit and blocking transcription initiation, which is why it is bactericidal against actively transcribing organisms such as Mycobacterium tuberculosis.

### Key determinants
Sort sigma's job (promoter recognition/positioning, acts at initiation) from rho's job (termination, acts at the gene's end) -- both are required for prokaryotic transcription, at different stages. Sort the Pribnow box (-10, prokaryotic) from the TATA box (eukaryotic) -- functionally equivalent but organism-specific terms. Sort rifampicin (blocks RNA polymerase, a transcription inhibitor) from tetracycline/puromycin/streptomycin (translation inhibitors). Sort RNA synthesis's shared rules with DNA synthesis (5'→3', extends from 3'-OH) from its one key difference (no primer needed).

### Clinical significance
Rifampicin's mechanism -- blocking bacterial RNA polymerase binding at the promoter -- underlies its clinical use in tuberculosis and meningococcal prophylaxis, and distinguishing it from ribosome-targeting antibiotics (tetracycline, streptomycin) or aminoacyl-tRNA mimics (puromycin) is a recurring pharmacology-adjacent exam distinction.

## published_summary


## published_sections


## hold_these
Sigma factor positions RNA polymerase on the promoter at initiation; rho factor (or an intrinsic hairpin) terminates transcription.
The Pribnow box is the prokaryotic -10 promoter element, the counterpart of the eukaryotic TATA box.
Rifampicin blocks prokaryotic RNA polymerase from binding the promoter.
RNA synthesis always runs 5' to 3', needs no primer, and uses UTP (not TTP).

## lose_the_mark
Crediting sigma factor with catalyzing RNA synthesis itself, or with terminating transcription.
Calling the Pribnow box a eukaryotic promoter feature, or confusing it with the -35 box.
Confusing rifampicin (transcription inhibitor) with a translation inhibitor.
Thinking RNA polymerase requires a primer, or that RNA uses TTP instead of UTP.

## callout_evidence


## media


## media_recommendations


## related_concepts
CON-FND-C65F7B0621BA0E
CON-FND-B098556C049168
CON-FND-B97792E9A6F2C8
CON-FND-864D70EA1A908C
CON-FND-4035756640CD3A

## related_articles


## resource_ids
src_15a36a801ec0b4a6705d

## article_source_ids
src_15a36a801ec0b4a6705d

## evidence_basis
Written from the printed-key facts of Bio questions.pdf's Chapter 3 (Transcription) "MCQ Answers" table (coverage/O6U-IMB-104-triage.md); no department book chapter was available for this module this pass.

## claim_ids


## span_ids


## evidence_gaps
No corpus-indexed source yet for these facts -- this PDF has not been through the shared corpus extraction pipeline. An S5 evidence pass is owed.

## notes


## field_notes
arabicTitle: No verification pass run this session.
aliases: No verification pass run this session.
module: No verified live O6U-IMB-104 module id supplied yet.
microtopic: Not assigned at authoring time.
nanotopic: Not assigned.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet scheduled.

## question_ids
[clear]

## university_notes
[clear]

## conflicts
[clear]

## last_reviewed
[clear]

## review_due
[clear]

## universities
o6u

## years
O6U_Y1

## module
[clear]

---

# Item

## id
ART-O6U-IMB-EUKARYOTIC-TRANSCRIPTION-INITIATION

## title
Eukaryotic transcription initiation: the TATA box, TBP, general transcription factors and RNA polymerase I

## arabic_title


## aliases


## subject
fnd

## topic
Molecular Biology

## subtopic
Eukaryotic transcription initiation apparatus

## microtopic


## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids


## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Eukaryotic RNA polymerase II promoters are marked by the TATA box, which TBP (TATA-box binding protein) recognizes to nucleate the pre-initiation complex, assembled with the help of general (basal) transcription factors required at essentially every promoter. Separately, RNA polymerase I is the dedicated enzyme for transcribing the large 18S/28S ribosomal RNA precursor, distinct from polymerase II's mRNA and polymerase III's tRNA/5S rRNA.

## sections
### Definition
The TATA box is a core promoter element roughly 25-30bp upstream of the transcription start site in many eukaryotic genes, and TBP (TATA-box binding protein), a subunit of the general transcription factor TFIID, is the protein that directly recognizes and binds it. General (basal) transcription factors are the larger set of accessory proteins -- for RNA polymerase II these include TFIIA, TFIIB, TFIID, TFIIE, TFIIF and TFIIH -- required at essentially every promoter to let RNA polymerase bind and form a physiologically functional transcription complex. RNA polymerase I, II and III are the three eukaryotic nuclear RNA polymerases, each dedicated to a different class of RNA.

### Mechanism
TBP binds the TATA box and bends the DNA sharply, nucleating ordered assembly of the remaining general transcription factors and RNA polymerase II into the pre-initiation complex; this basal machinery is necessary but not sufficient for high-level transcription, which also depends on gene-specific activators acting through additional co-activators. This TATA-box/TBP/general-transcription-factor system is specific to RNA polymerase II promoters. Separately, RNA polymerase I operates in the nucleolus on its own dedicated set of promoters to transcribe the large pre-rRNA transcript, which is processed into 18S, 5.8S and 28S rRNA; RNA polymerase III transcribes tRNA and 5S rRNA genes using yet another promoter/factor system. Each polymerase's promoter recognition machinery is distinct, even though all three ultimately depend on some assembly of dedicated initiation factors analogous in concept to TBP/TFIID.

### Key determinants
Sort the TATA box (a DNA sequence) from TBP (the protein that binds it) from the general transcription factors (the larger factor set TBP nucleates). Sort general/basal transcription factors (universally required for initiation) from gene-specific activators (increase transcription only at particular genes) and from elongation factors (act after initiation). Sort RNA polymerase I (large rRNA), II (mRNA), and III (tRNA/5S rRNA) by which RNA class each transcribes.

### Clinical significance
Because RNA polymerase II's basal machinery (TBP, general transcription factors) is required at virtually all protein-coding promoters, it is a frequent target of study for how transcription is globally regulated and mis-regulated; separately, the dedicated, high-throughput role of RNA polymerase I in ribosomal RNA production makes it a marker of cellular proliferative activity, since rapidly dividing cells need large amounts of new ribosomes.

## published_summary


## published_sections


## hold_these
The TATA box marks the transcription start site; TBP is the TATA-box binding protein that recognizes it.
General (basal) transcription factors, not activators or elongation factors, are what let eukaryotic RNA polymerases bind promoters.
RNA polymerase I transcribes the large 18S/28S rRNA genes; polymerase II transcribes mRNA; polymerase III transcribes tRNA and 5S rRNA.

## lose_the_mark
Expanding TBP as anything other than "TATA-box binding protein" (e.g. as a polymerase itself).
Confusing general/basal transcription factors with gene-specific activators or with elongation factors.
Assigning 18S/28S rRNA transcription to the wrong eukaryotic RNA polymerase.

## callout_evidence


## media


## media_recommendations


## related_concepts
CON-FND-48F15EF4D33CC3
CON-FND-AEDD7717935B9C
CON-FND-1D6BEB07F15D68
CON-FND-4C7C816DB6B786

## related_articles


## resource_ids
src_15a36a801ec0b4a6705d

## article_source_ids
src_15a36a801ec0b4a6705d

## evidence_basis
Written from the printed-key facts of Bio questions.pdf's Chapter 3 (Transcription) "MCQ Answers" table (coverage/O6U-IMB-104-triage.md); no department book chapter was available for this module this pass.

## claim_ids


## span_ids


## evidence_gaps
No corpus-indexed source yet for these facts -- this PDF has not been through the shared corpus extraction pipeline. An S5 evidence pass is owed.

## notes


## field_notes
arabicTitle: No verification pass run this session.
aliases: No verification pass run this session.
module: No verified live O6U-IMB-104 module id supplied yet.
microtopic: Not assigned at authoring time.
nanotopic: Not assigned.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet scheduled.

## question_ids
[clear]

## university_notes
[clear]

## conflicts
[clear]

## last_reviewed
[clear]

## review_due
[clear]

## universities
o6u

## years
O6U_Y1

## module
[clear]

---

# Item

## id
ART-O6U-IMB-MRNA-PROCESSING-AND-CODING-SEQUENCE

## title
mRNA processing, capping and the coding sequence

## arabic_title


## aliases


## subject
fnd

## topic
Molecular Biology

## subtopic
mRNA processing, capping and coding sequence

## microtopic


## nanotopic


## primary_node_id
DIS-BIO-T06

## secondary_node_ids


## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1-3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Eukaryotic pre-mRNA is processed by capping, splicing and polyadenylation -- not by any fourth step such as "trimming." The 5' cap is joined by an unusual 5'-5' triphosphate bridge, and together with the 3' poly(A) tail it protects the mature transcript from exonuclease degradation. The mature, spliced mRNA's sequence matches its coding strand (with U for T), and its coding-region length can be calculated directly from the encoded protein's amino-acid count.

## sections
### Definition
mRNA processing converts a primary transcript into a mature, translatable mRNA through three named steps: capping (adding a 7-methylguanosine cap to the 5' end via an unusual 5'-5' triphosphate bridge), splicing (removing introns and joining exons via the spliceosome), and polyadenylation (adding a 3' poly(A) tail). The mature transcript's sequence is identical to the gene's coding (sense) strand, with uracil in place of thymine, because mRNA is synthesized complementary to the template strand, which is itself complementary to the coding strand.

### Mechanism
The 5' cap and 3' poly(A) tail are added co-transcriptionally or shortly after transcription and together shield both ends of the mRNA from exonuclease degradation -- the cap protecting against 5'→3' attack and the tail against 3'→5' attack. Splicing removes intronic sequence entirely, so mature mRNA should contain none. Because introns are removed and untranslated regions (5'UTR, 3'UTR) lie outside the coding sequence, neither contributes to the span between the start (AUG) and stop codons; that span is instead set directly by the number of amino acids the gene encodes (each amino acid corresponding to one 3-base codon), letting the coding-region length be calculated from protein length alone, independent of intron size or UTR length.

### Key determinants
Sort the three real processing steps (capping, splicing, polyadenylation) from invented or unrelated terms like "trimming." Sort the cap's unusual 5'-5' triphosphate linkage from the standard 3'-5' phosphodiester bonds used elsewhere in the chain. Sort what protects mature mRNA (cap + tail, together) from what does not (introns, which are removed). Sort what counts toward coding-region length (only the amino-acid-encoding codons) from what does not (introns, 5'UTR, 3'UTR).

### Clinical significance
Defects in mRNA capping, splicing or polyadenylation underlie a range of inherited and acquired disease mechanisms (e.g. splice-site mutations producing truncated or non-functional proteins), and the coding-region-length calculation exercised here is the same logic used to predict the size of a protein product from genomic or cDNA sequence data in molecular diagnostics.

## published_summary


## published_sections


## hold_these
mRNA processing = capping + splicing + polyadenylation; there is no fourth "trimming" step.
The 5' cap is joined by an unusual 5'-5' triphosphate bridge, not a standard 3'-5' phosphodiester bond.
The 5' cap and 3' poly(A) tail together (not either alone) protect mature mRNA from degradation.
A processed mRNA's coding-region length equals its encoded amino-acid count × 3, excluding introns and UTRs.
Mature mRNA's sequence matches the coding strand (with U for T), not the template strand.

## lose_the_mark
Inventing or crediting a fourth mRNA processing step beyond capping, splicing and polyadenylation.
Describing the cap's linkage as a standard phosphodiester bond rather than a 5'-5' triphosphate bridge.
Crediting only the cap or only the tail with protecting mRNA from degradation.
Including intron or UTR length when calculating the coding sequence's span.
Deriving the mRNA sequence from the template strand by direct copying instead of from the coding strand by T→U substitution.

## callout_evidence


## media


## media_recommendations


## related_concepts
CON-FND-8EDC3FB37DD07F
CON-FND-AAD9C95825235F
CON-FND-BF1BB2468B9ACC
CON-FND-E1F3763F50BFC4
CON-FND-9C1BAF951BB251

## related_articles


## resource_ids
src_15a36a801ec0b4a6705d

## article_source_ids
src_15a36a801ec0b4a6705d

## evidence_basis
Written from the printed-key facts of Bio questions.pdf's Chapter 3 (Transcription) "MCQ Answers" table (coverage/O6U-IMB-104-triage.md); no department book chapter was available for this module this pass.

## claim_ids


## span_ids


## evidence_gaps
No corpus-indexed source yet for these facts -- this PDF has not been through the shared corpus extraction pipeline. An S5 evidence pass is owed.

## notes


## field_notes
arabicTitle: No verification pass run this session.
aliases: No verification pass run this session.
module: No verified live O6U-IMB-104 module id supplied yet.
microtopic: Not assigned at authoring time.
nanotopic: Not assigned.
lastReviewed: New record, not yet reviewed.
reviewDue: New record, not yet scheduled.

## question_ids
[clear]

## university_notes
[clear]

## conflicts
[clear]

## last_reviewed
[clear]

## review_due
[clear]

## universities
o6u

## years
O6U_Y1

## module
[clear]
