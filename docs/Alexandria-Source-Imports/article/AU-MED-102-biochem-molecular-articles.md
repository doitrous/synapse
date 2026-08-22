<!--
  AU-MED-102 (Foundation of Basic Medical Sciences & Medical Terminology) ·
  Biochemistry, sub-lane D (molecular biology & cell signalling) — articles for the
  26 NEW concepts minted in concept/AU-MED-102-biochem-molecular-concepts.md. Both
  directions are set: every concept below lists this article in its own article_ids,
  and this article lists every one of them in related_concepts.
-->

# Item

## id
ART-FND-DNA-REPLICATION-REPAIR-PCR

## title
DNA structure, replication, repair and amplification

## arabic_title
تركيب الحمض النووي وتضاعفه وإصلاحه وتضخيمه

## aliases
DNA replication
DNA repair
PCR

## subject
fnd

## topic
Molecular biology

## subtopic
DNA replication

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
9

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
DNA is a double helix of two antiparallel strands held together only by hydrogen bonds
between complementary bases, and every base's percentage in the molecule can be predicted
from Chargaff's rule once one base's percentage is known. Replication copies this molecule
with very low error, semiconservatively, using DNA ligase to join the lagging strand's
Okazaki fragments and topoisomerase to relieve the supercoiling that unwinding creates. A
dedicated repair pathway, nucleotide excision repair, removes UV damage — its failure is
xeroderma pigmentosum — and telomerase protects the chromosome ends that replication itself
cannot fully copy. The same chemistry can be run outside a cell entirely as PCR, which
amplifies a chosen DNA segment using primers, a heat-stable polymerase and free nucleotides.

## sections
### Definition
Deoxyribonucleic acid is a double helix built from two strands that run in opposite (antiparallel) directions, held to each other only by hydrogen bonds between complementary bases: adenine pairs with thymine through two hydrogen bonds, and guanine pairs with cytosine through three. By convention, the nucleotide sequence of a DNA strand is always written from its 5' end to its 3' end — never the reverse, and never ambiguously either direction — because the sugar-phosphate backbone itself has a fixed chemical polarity, a free 5'-phosphate at one end and a free 3'-hydroxyl at the other. A nucleotide is a base joined to a sugar (together, a nucleoside) plus one or more phosphate groups; removing the phosphate group, and only the phosphate group, converts a nucleotide into a nucleoside. Purine bases are broken down in a related but separate pathway: humans lack uricase, so adenine and guanine are degraded through hypoxanthine and xanthine to uric acid, which is excreted as such rather than oxidised further — the same nitrogenous-waste family as urea, but a genuinely separate end product from a separate pathway.

### Mechanism
Replication is semiconservative: each of the two new DNA duplexes keeps one original (parental) strand as template and builds one newly synthesised strand, so no daughter molecule ends up either fully new or fully old. New synthesis always runs 5' to 3', driven by DNA polymerase, which only ever extends an existing 3'-OH; a fresh strand can never be built 3' to 5'. Fidelity is very high for two independent reasons together: each incoming nucleotide must complementary-base-pair correctly before it is added, and DNA polymerase itself proofreads by removing a wrongly paired nucleotide through its own 3'-to-5' exonuclease activity — a student asked to predict a complementary strand is really being asked to apply the same base-pairing rule that gives replication its accuracy. Because the lagging strand is built discontinuously as short Okazaki fragments, each starting from its own RNA primer, DNA ligase is needed afterwards to seal the nick between one finished fragment and the next, forming the final phosphodiester bond that joins them into one continuous strand — ligase does not synthesise the fragments, only joins them. Unwinding the duplex ahead of the fork leaves the DNA ahead over-wound; topoisomerase relieves this supercoiling by transiently cutting one or both strands, letting the DNA rotate, and resealing the break, so the fork does not stall. Because a linear chromosome cannot be primed all the way to its very end, a small amount of sequence would be lost from the end of every chromosome at every division; telomerase, a reverse transcriptase that carries its own RNA template, extends the telomeric repeats at each end to offset this loss, which is why it is described as protecting DNA from ageing. The same core chemistry can be run entirely outside a living cell as the polymerase chain reaction: given two primers flanking the target sequence, a thermostable DNA polymerase able to survive repeated heating cycles, and all four deoxyribonucleoside triphosphates, an automated thermocycler amplifies one chosen DNA segment through repeated cycles — PCR is explicitly an in vitro technique, not an in vivo one, which is exactly why it needs a polymerase a living cell does not.

### Key determinants
Because every adenine on one strand pairs with a thymine on the other, and every guanine with a cytosine, the total amount of adenine in double-stranded DNA always equals the total amount of thymine, and total guanine always equals total cytosine — Chargaff's rule. Given the percentage of any one base, the other three can be calculated directly from this rule, but only in double-stranded DNA: a single strand has no obligatory partner to enforce the 1:1 ratio, so the rule does not hold for single-stranded DNA or for RNA. The specific base identities and hydrogen-bond counts (two for A–T, three for G–C) are what actually determine how tightly a stretch of DNA is held together, which is why GC-rich regions separate less readily than AT-rich ones.

### Clinical significance
Xeroderma pigmentosum is caused by a defect in nucleotide excision repair, the pathway that normally removes bulky, helix-distorting lesions such as UV-induced pyrimidine dimers. Without it, unrepaired UV damage accumulates, producing the extreme sun sensitivity and skin changes that define the disease — a defect further along the pipeline (transcription or translation) would not produce this specific pattern of damage from sunlight exposure. PCR's ability to amplify a single chosen DNA segment from a trace sample is what makes it the basis of most modern molecular diagnostics, from infection testing to forensic identification, though the department's own teaching keeps PCR itself filed as a practical technique rather than a disease mechanism.

### Common misconceptions
Treating the 5'-to-3' writing convention as an arbitrary labelling choice that "could go either way" — the backbone's chemical polarity is real, not a convention invented for convenience, which is why the bank explicitly rejects "either direction" as an answer. Confusing DNA ligase's role (sealing a nick between two already-synthesised fragments) with topoisomerase's role (relieving torsional strain ahead of the fork by cutting and resealing) — both enzymes cut and reseal DNA, but at different problems. Confusing telomerase with topoisomerase or DNA ligase for the same reason; telomerase's job is specifically to offset end-replication loss, not to relieve supercoiling or join fragments. Calling PCR an in vivo technique because it reproduces replication chemistry — it deliberately runs that chemistry in a thermocycler, outside any cell, which is exactly why it needs a heat-stable polymerase no living cell uses.

## published_summary

## published_sections

## hold_these
Replication fidelity comes from two independent checks: correct base pairing as each
nucleotide is added, and DNA polymerase's own proofreading exonuclease — not either one
alone.
DNA ligase joins already-made Okazaki fragments; it does not synthesise them. Topoisomerase
relieves supercoiling ahead of the fork; it does not join fragments. These are two different
jobs, not two names for one enzyme.
Chargaff's rule (%A=%T, %G=%C) holds only for double-stranded DNA, never for a single strand
or for RNA.

## lose_the_mark
Answering that DNA sequence direction "could be written either way" — the 5'-to-3'
convention reflects the backbone's real chemical polarity, and the bank marks "either
direction" wrong.
Calling PCR an in vivo technique — it is explicitly in vitro, run in a thermocycler rather
than inside a living cell.
Attributing xeroderma pigmentosum to a transcription or translation defect rather than a
nucleotide-excision-repair defect.

## callout_evidence

## related_concepts
CON-FND-92DD65D96E3FA1
CON-FND-7302601EA492D2
CON-FND-73C77966B56FED
CON-FND-E8CD7F7F690B14
CON-FND-8E4A3DB9BC03AC
CON-FND-5B8E3AAFEB6C35
CON-FND-252B3C77D181DA
CON-FND-FFEE58EC9C0784
CON-FND-31C41EFEF31740
CON-FND-DB1988D55A69E3
CON-FND-914D9DDFB56AD1

## related_articles
ART-FND-TRANSCRIPTION-CODE-TRANSLATION: the transcription and translation steps this article's replicated DNA is read into

## question_ids

## resource_ids
src_80f6b1121bd3b85f8886
src_01ab4268402d32d4d111

## article_source_ids
src_80f6b1121bd3b85f8886
src_01ab4268402d32d4d111

## claim_ids
CLM-FND-92DD65D96E3FA1-01
CLM-FND-7302601EA492D2-01
CLM-FND-73C77966B56FED-01
CLM-FND-E8CD7F7F690B14-01
CLM-FND-8E4A3DB9BC03AC-01
CLM-FND-5B8E3AAFEB6C35-01
CLM-FND-252B3C77D181DA-01
CLM-FND-FFEE58EC9C0784-01
CLM-FND-31C41EFEF31740-01
CLM-FND-DB1988D55A69E3-01
CLM-FND-914D9DDFB56AD1-01

## span_ids
SPN-FND-DNA-REPL-01
SPN-FND-DNA-REPL-02
SPN-FND-DNA-REPL-03
SPN-FND-DNA-REPL-04

## universities
au

## years
AU_Y1

## module

## university_notes
AU: taught from AU-MED-102 Biochemistry's departmental question banks (DNA & RNA MCQ, the
AFM master bank's Molecular Biology section) and the module's End of Module/End of Year
papers; this department has no dedicated department book for Biochemistry, so the article's
teaching text is built from the banks' own stems rather than a textbook chapter — recorded
per LANE-BRIEF's scope rule rather than left unexplained.

## annotations
### definition_of · CON-FND-8E4A3DB9BC03AC
Quote: By convention, the nucleotide sequence of a DNA strand is always written from its 5' end to its 3' end — never the reverse, and never ambiguously either direction — because the sugar-phosphate backbone itself has a fixed chemical polarity, a free 5'-phosphate at one end and a free 3'-hydroxyl at the other.
Block: body

### definition_of · CON-FND-914D9DDFB56AD1
Quote: A nucleotide is a base joined to a sugar (together, a nucleoside) plus one or more phosphate groups; removing the phosphate group, and only the phosphate group, converts a nucleotide into a nucleoside.
Block: body

### definition_of · CON-FND-92DD65D96E3FA1
Quote: humans lack uricase, so adenine and guanine are degraded through hypoxanthine and xanthine to uric acid, which is excreted as such rather than oxidised further
Block: body

### mechanism_step_before · CON-FND-5B8E3AAFEB6C35
Quote: Replication is semiconservative: each of the two new DNA duplexes keeps one original (parental) strand as template and builds one newly synthesised strand, so no daughter molecule ends up either fully new or fully old.
Block: body

### definition_of · CON-FND-7302601EA492D2
Quote: Fidelity is very high for two independent reasons together: each incoming nucleotide must complementary-base-pair correctly before it is added, and DNA polymerase itself proofreads by removing a wrongly paired nucleotide through its own 3'-to-5' exonuclease activity
Block: body

### definition_of · CON-FND-252B3C77D181DA
Quote: DNA ligase is needed afterwards to seal the nick between one finished fragment and the next, forming the final phosphodiester bond that joins them into one continuous strand — ligase does not synthesise the fragments, only joins them.
Block: body

### definition_of · CON-FND-FFEE58EC9C0784
Quote: topoisomerase relieves this supercoiling by transiently cutting one or both strands, letting the DNA rotate, and resealing the break, so the fork does not stall
Block: body

### definition_of · CON-FND-73C77966B56FED
Quote: telomerase, a reverse transcriptase that carries its own RNA template, extends the telomeric repeats at each end to offset this loss, which is why it is described as protecting DNA from ageing
Block: body

### definition_of · CON-FND-DB1988D55A69E3
Quote: given two primers flanking the target sequence, a thermostable DNA polymerase able to survive repeated heating cycles, and all four deoxyribonucleoside triphosphates, an automated thermocycler amplifies one chosen DNA segment through repeated cycles
Block: body

### definition_of · CON-FND-31C41EFEF31740
Quote: the total amount of adenine in double-stranded DNA always equals the total amount of thymine, and total guanine always equals total cytosine — Chargaff's rule
Block: body

### definition_of · CON-FND-E8CD7F7F690B14
Quote: Xeroderma pigmentosum is caused by a defect in nucleotide excision repair, the pathway that normally removes bulky, helix-distorting lesions such as UV-induced pyrimidine dimers.
Block: body

## media

## media_recommendations
### diagram · The replication fork drawn as one labelled plate
Purpose: The question bank tests helicase, topoisomerase, DNA ligase, primase and both
polymerases as separate actors at the same structure; students who have not seen them drawn
together at once persistently swap their jobs (this article's own "Common misconceptions"
section names the ligase/topoisomerase swap specifically).
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed molecular biology diagram set
Rights: must be CC-BY or public domain

### flowchart · PCR cycle, one thermocycler cycle drawn as denaturation, annealing, extension
Purpose: The bank's PCR questions assume the student can picture what "repeated cycles"
means mechanically; a labelled temperature-cycle diagram makes the in-vitro, primer-driven
nature of the reaction concrete rather than a memorised list of requirements.
Priority: strongly helpful
Status: needed
Section: Mechanism

## publication_gate
needs_evidence

## evidence_basis
AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886) and the AFM master
bank's Molecular Biology section (src_01ab4268402d32d4d111), both staff-authored department
question sources for this module, cross-checked against each other where they overlap.

## evidence_gaps
Every claim/citation this article rests on is authored in this lane's own evidence file, but
each citation's resource_id names a src_ id whose evidence-source record is owned by
sub-lane A (evidence/AU-MED-102-biochemistry-resources.md) and does not exist yet — see
CLAIMS.md's Wanted row. The article's own teaching text is otherwise complete.

## conflicts

## last_reviewed

## review_due

## notes
Grouped article covering 11 of this sub-lane's 26 newly minted concepts (DNA structure,
replication, repair and PCR); a sibling article (ART-FND-TRANSCRIPTION-CODE-TRANSLATION)
covers transcription, the genetic code and translation, and a third
(ART-FND-CELL-SIGNALING-RECEPTORS) covers cell signalling.

## field_notes
aliases: Filled above.
arabicTitle: Filled above.
microtopicId: The canonical placement (DIS-BIO-T06) is already more precise than a curriculum-overlay microtopic would add.
nanotopicId: As above.
moduleIds: No verified live AU-MED-102 module row exists in src/data/universities.ts yet (owned by the academic lane, P0-B) — module_subject on each concept carries the department position explicitly instead.
questionIds: Questions testing these concepts are authored separately in question/AU-MED-102-biochem-molecular-mcq.md and will be linked back once that batch is confirmed against this article.
media: No rights-cleared asset exists yet — two are requested in media_recommendations.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## title
Transcription, the genetic code and translation

## arabic_title
النسخ والشفرة الوراثية والترجمة

## aliases
mRNA processing
Genetic code
Translation

## subject
fnd

## topic
Molecular biology

## subtopic
Transcription and translation

## microtopic

## nanotopic

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
9

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
RNA differs from DNA by carrying uracil instead of thymine, being single-stranded, and
never containing xanthine as a base. A eukaryotic primary transcript becomes mature mRNA
through three processing steps — a 7-methylguanosine 5' cap, a 3' poly-A tail, and splicing
out introns — with nuclear export happening only afterwards, as a separate step. The coding
strand of a gene matches its mRNA base for base except that mRNA substitutes uracil for
thymine, and the genetic code that mRNA is read by is degenerate, unambiguous,
non-overlapping and universal, built from three-nucleotide codons. Translation starts at
the AUG codon, reads each codon against the matching tRNA anticodon (every tRNA terminating
in the same 3'-CCA acceptor sequence), and even decides the fate of an amino acid after
translation is finished, as cystine's formation from two cysteine residues shows.

## sections
### Definition
Ribonucleic acid is distinguished from DNA in two structural ways: it carries uracil where DNA carries thymine, and it is built as a single strand rather than a double helix. Neither RNA nor DNA ever incorporates xanthine as one of its four bases — xanthine is a purine catabolism intermediate, not a nucleic acid base, however often it appears in the same metabolic neighbourhood as the true purine bases. A codon is a triplet of three mRNA nucleotides, and the code built from these triplets carries four defining properties: it is degenerate (most amino acids have more than one codon), unambiguous (a given codon specifies only one amino acid, never several), non-overlapping (each nucleotide belongs to only one codon, read consecutively) and universal (nearly all organisms share it). "Ambiguous" is the property the code deliberately does not have, which is exactly the property most often tested by asking which statement about the code is false.

### Mechanism
A eukaryotic primary transcript is processed into mature mRNA by three steps: capping the 5' end with 7-methylguanosine triphosphate, adding a poly-A tail at the 3' end, and splicing out introns to join exons. Export of the finished mRNA from the nucleus to the cytoplasm happens afterwards, as a separate transport step, not as part of processing itself. Three RNA polymerases divide the transcription work by product: RNA polymerase I transcribes the genes for the large ribosomal RNAs (5.8S, 18S and 28S rRNA), RNA polymerase II transcribes protein-coding genes into mRNA, and RNA polymerase III transcribes tRNA genes together with 5S rRNA and the small nuclear RNAs. The coding (sense) strand of DNA reads the same sequence as the mRNA transcribed from that gene, base for base, except that everywhere the coding strand carries thymine the mRNA carries uracil — RNA polymerase itself actually copies the other strand, the template strand, by complementary base pairing, which is why "coding" and "transcribed" are not the same strand. Translation begins at the codon AUG in the overwhelming majority of mRNAs, where a methionyl-initiator-tRNA complex assembles rather than any other charged tRNA. Reading proceeds by anticodon-codon pairing: the anticodon, a three-nucleotide sequence carried on tRNA, base-pairs antiparallel with the complementary codon on mRNA, positioning that tRNA's specific amino acid at the correct place in the growing chain — every tRNA, whatever amino acid it carries, terminates its acceptor arm at the same 3'-CCA sequence, which is where the amino acid itself is attached.

### Key determinants
A base substitution is classified along two independent axes at once, and the bank tests both separately on the very same kind of event: by chemistry, a transition swaps one purine for the other purine or one pyrimidine for the other, while a transversion swaps a purine for a pyrimidine or the reverse; by consequence, the same substitution is nonsense if it creates a stop codon, missense if it changes the amino acid, or silent if the new codon is a synonym. Which axis a question asks about determines which answer is correct — the two classifications are not interchangeable descriptions of one fact.

### Clinical significance
Not every amino acid found in a finished protein has its own codon: cysteine does, but cystine — two cysteine molecules joined by a disulfide bond — is produced only after translation, by oxidation of two cysteine side chains, so no codon specifies cystine itself. This is the kind of post-translational event that can only be understood once the genetic code's scope (what it does and does not directly specify) is clear.

### Common misconceptions
Picking "ambiguous" as a true property of the genetic code because it superficially resembles "degenerate" — degeneracy means several codons can specify one amino acid; ambiguity would mean one codon specifies several amino acids, which never happens. Reversing which molecule carries the codon and which carries the anticodon — the codon is always the mRNA triplet, the anticodon is always the tRNA triplet that reads it. Listing nuclear export as one of the steps of mRNA processing, because it happens in the same general sequence of events as capping, tailing and splicing — export is a separate, later step. Treating cystine and cysteine as interchangeable names for one amino acid.

## published_summary

## published_sections

## hold_these
mRNA processing is capping + polyadenylation + splicing; nuclear export is not part of
processing, it happens afterwards.
A base substitution has two separate classifications that can both be asked about: its
chemistry (transition/transversion) and its consequence (nonsense/missense/silent).
Every tRNA ends its acceptor arm in the same 3'-CCA sequence, whatever amino acid it
carries.

## lose_the_mark
Calling the code "ambiguous" — it is unambiguous; degeneracy (several codons, one amino
acid) is not the same property as ambiguity (one codon, several amino acids), and only
degeneracy is true of the genetic code.
Swapping codon and anticodon between mRNA and tRNA.
Treating cystine as simply another name for cysteine rather than its disulfide-linked,
post-translational product.

## callout_evidence

## related_concepts
CON-FND-F1E54D68C8FAB0
CON-FND-5FF8EB2DB4D662
CON-FND-A1B0BFB9626438
CON-FND-412F3EDF118F44
CON-FND-DF5E3014A149FC
CON-FND-CA2D65E688434A
CON-FND-09FACBDCBBF8FD
CON-FND-D717E6E7EEA466
CON-FND-906B844C9AEE7D
CON-FND-A1FC2FAF9F0211

## related_articles
ART-FND-DNA-REPLICATION-REPAIR-PCR: the DNA-level structure and replication this article's transcribed and translated product depends on

## question_ids

## resource_ids
src_80f6b1121bd3b85f8886
src_01ab4268402d32d4d111
src_4852d425a88297af190e

## article_source_ids
src_80f6b1121bd3b85f8886
src_01ab4268402d32d4d111

## claim_ids
CLM-FND-F1E54D68C8FAB0-01
CLM-FND-5FF8EB2DB4D662-01
CLM-FND-A1B0BFB9626438-01
CLM-FND-412F3EDF118F44-01
CLM-FND-DF5E3014A149FC-01
CLM-FND-CA2D65E688434A-01
CLM-FND-09FACBDCBBF8FD-01
CLM-FND-D717E6E7EEA466-01
CLM-FND-906B844C9AEE7D-01
CLM-FND-A1FC2FAF9F0211-01

## span_ids
SPN-FND-TRX-01
SPN-FND-TRX-02
SPN-FND-TRX-03

## universities
au

## years
AU_Y1

## module

## university_notes
AU: taught from AU-MED-102 Biochemistry's departmental question banks (DNA & RNA MCQ, the
AFM master bank's Molecular Biology section, and the Protein Chemistry MCQ bank for the
cystine boundary fact) and the module's End of Module/End of Year papers; no dedicated
department book exists for Biochemistry in this module.

## annotations
### definition_of · CON-FND-F1E54D68C8FAB0
Quote: it carries uracil where DNA carries thymine, and it is built as a single strand rather than a double helix
Block: body

### definition_of · CON-FND-A1B0BFB9626438
Quote: it is degenerate (most amino acids have more than one codon), unambiguous (a given codon specifies only one amino acid, never several), non-overlapping (each nucleotide belongs to only one codon, read consecutively) and universal (nearly all organisms share it)
Block: body

### definition_of · CON-FND-5FF8EB2DB4D662
Quote: A eukaryotic primary transcript is processed into mature mRNA by three steps: capping the 5' end with 7-methylguanosine triphosphate, adding a poly-A tail at the 3' end, and splicing out introns to join exons.
Block: body

### definition_of · CON-FND-412F3EDF118F44
Quote: RNA polymerase I transcribes the genes for the large ribosomal RNAs (5.8S, 18S and 28S rRNA), RNA polymerase II transcribes protein-coding genes into mRNA, and RNA polymerase III transcribes tRNA genes together with 5S rRNA and the small nuclear RNAs
Block: body

### definition_of · CON-FND-D717E6E7EEA466
Quote: The coding (sense) strand of DNA reads the same sequence as the mRNA transcribed from that gene, base for base, except that everywhere the coding strand carries thymine the mRNA carries uracil
Block: body

### definition_of · CON-FND-09FACBDCBBF8FD
Quote: Translation begins at the codon AUG in the overwhelming majority of mRNAs, where a methionyl-initiator-tRNA complex assembles rather than any other charged tRNA.
Block: body

### definition_of · CON-FND-906B844C9AEE7D
Quote: the anticodon, a three-nucleotide sequence carried on tRNA, base-pairs antiparallel with the complementary codon on mRNA, positioning that tRNA's specific amino acid at the correct place in the growing chain
Block: body

### definition_of · CON-FND-CA2D65E688434A
Quote: every tRNA, whatever amino acid it carries, terminates its acceptor arm at the same 3'-CCA sequence, which is where the amino acid itself is attached
Block: body

### definition_of · CON-FND-DF5E3014A149FC
Quote: by chemistry, a transition swaps one purine for the other purine or one pyrimidine for the other, while a transversion swaps a purine for a pyrimidine or the reverse
Block: body

### definition_of · CON-FND-A1FC2FAF9F0211
Quote: cystine — two cysteine molecules joined by a disulfide bond — is produced only after translation, by oxidation of two cysteine side chains, so no codon specifies cystine itself
Block: body

## media

## media_recommendations
### comparison table · RNA vs DNA, four rows (base, strandedness, xanthine, function)
Purpose: The bank tests these differences one at a time across several separate questions;
a single comparison table lets a student hold all four at once instead of memorising
isolated facts.
Priority: strongly helpful
Status: needed
Section: Definition

### diagram · A codon read against its anticodon at the ribosome, tRNA's CCA end shown carrying the amino acid
Purpose: Students persistently swap which molecule carries the codon and which carries the
anticodon; a single labelled diagram of the pairing event, drawn once, fixes the direction
of the relationship better than the prose restating it can.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed molecular biology diagram set
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886), the AFM master
bank's Molecular Biology section (src_01ab4268402d32d4d111), and the Protein Chemistry MCQ
bank (src_4852d425a88297af190e) for the cystine boundary fact.

## evidence_gaps
As with the sibling DNA/replication article: every citation's resource_id is a real corpus
src_ id, but the evidence-source record for it is owned by sub-lane A and not yet authored
(CLAIMS.md Wanted row).

## conflicts

## last_reviewed

## review_due

## notes
Grouped article covering 10 of this sub-lane's 26 newly minted concepts (transcription, the
genetic code and translation, including the amino-acid/genetic-code boundary fact C40).

## field_notes
aliases: Filled above.
arabicTitle: Filled above.
microtopicId: The canonical placement (DIS-BIO-T06) is already more precise than a curriculum-overlay microtopic would add.
nanotopicId: As above.
moduleIds: No verified live AU-MED-102 module row exists in src/data/universities.ts yet (owned by the academic lane, P0-B) — module_subject on each concept carries the department position explicitly instead.
questionIds: Questions testing these concepts are authored separately in question/AU-MED-102-biochem-molecular-mcq.md and will be linked back once that batch is confirmed against this article.
media: No rights-cleared asset exists yet — two are requested in media_recommendations.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-FND-CELL-SIGNALING-RECEPTORS

## title
Cell signalling: receptor mechanisms and second messengers

## arabic_title
الإشارات الخلوية: آليات المستقبلات والرسل الثاني

## aliases
Cell signaling
Second messengers
Receptor types

## subject
fnd

## topic
Cell signalling

## subtopic
Signal transduction

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T01-S02

## secondary_node_ids
DIS-BIO-T01

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
7

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
A cell becomes the target of a hormone or other signalling molecule because it expresses
the specific receptor for it, not because of how close it sits to the source. Signalling is
classified by how far it travels — autocrine acts back on the sender, paracrine acts on
nearby cells (this department's own bank keys synaptic transmission as paracrine, by that
same distance criterion), and endocrine travels through the blood — and received through
one of four receptor types spanning millisecond to hour timescales, from ligand-gated ion
channels to nuclear receptors. Once a signal is received, phosphorylation of a target
protein's serine, threonine or tyrosine residues is a reversible switch that can raise or
lower its activity, and for the G-protein-coupled pathway specifically, the level of the
second messenger cAMP reflects the balance between adenylate cyclase making it and
phosphodiesterase breaking it back down.

## sections
### Definition
What makes a cell a target for a hormone or other signalling molecule is that it expresses a receptor specific to that molecule — a cell without the matching receptor cannot respond, however close it sits to the source, and a cell that does have the receptor can respond however far away it sits. Signalling is classified by the distance the signal travels before acting: autocrine signalling acts back on the same cell that released it; paracrine signalling acts on nearby cells, and this question bank's own teaching classifies synaptic transmission across the synaptic cleft as an example of paracrine signalling, since a neurotransmitter acting locally on an adjacent cell fits the same "nearby cell" criterion; endocrine signalling releases a hormone into the blood to reach distant target cells.

### Mechanism
Phosphorylation attaches a phosphate group to a protein's serine, threonine or tyrosine side chain, and depending on the specific protein this can either activate or inactivate it — there is no single universal direction of effect, and because a phosphatase can remove the phosphate again, phosphorylation is a reversible regulatory switch rather than a one-way modification. For the second-messenger cAMP, adenylate cyclase synthesises it from ATP and phosphodiesterase degrades it back to inactive 5'-AMP, so the intracellular cAMP level at any moment reflects the balance between these two opposing activities, not synthesis alone — a rise in cAMP can come from more synthesis or from less degradation.

### Key determinants
This department's own teaching gives a typical intracellular (nuclear/steroid-type) receptor about two domains, while a typical cell-membrane receptor is described with more, reflecting the added complexity of a membrane-spanning, ligand-binding and signal-transducing structure compared with an intracellular receptor's simpler ligand-binding and DNA-binding arrangement — a specific, department-taught figure rather than a universal constant, since real receptor domain counts vary considerably by family.

### Clinical significance
Distinguishing which of the four receptor types a drug or hormone acts through — a receptor transducing on a millisecond timescale (an ion channel) versus one acting over hours (a nuclear receptor) — is what determines how quickly a clinical effect appears and how it can be modulated; the nicotinic-receptor/myasthenia-gravis vignette that recurs across this module's papers is exactly this kind of question, asked here for the receptor-mechanism classification rather than the neuromuscular anatomy and autoimmune disease process, which the AU-MED-102 Histology and Physiology lane teaches separately.

### Common misconceptions
Assuming phosphorylation always activates a protein, generalising from kinase-cascade examples — the direction of effect is protein-specific, not fixed, and the bank tests this directly. Classifying synaptic transmission as its own separate signalling category rather than as this bank's own example of paracrine signalling. Assuming a "neighbouring cell" is automatically a target cell, confusing proximity with paracrine range — proximity alone does not confer target status; only the matching receptor does.

## published_summary

## published_sections

## hold_these
Target-cell status depends on receptor expression, not on physical distance from the
source.
Phosphorylation can raise or lower a protein's activity depending on the protein — never
assume a fixed direction.
The intracellular cAMP level is a balance: adenylate cyclase makes it, phosphodiesterase
breaks it down.

## lose_the_mark
Treating a nearby cell as automatically a target cell (that is a description of paracrine
range, not of target-cell status, which needs the receptor).
Assuming phosphorylation is always activating.
Filing synaptic transmission as a signalling category of its own rather than this bank's
paracrine example.

## callout_evidence

## related_concepts
CON-FND-8C5B1666F4F7C1
CON-FND-13FCDB652CB258
CON-FND-22F8C729D1E8B0
CON-FND-1D57FC5C8BFF90
CON-FND-D10E79C01B3345

## related_articles
ART-FND-TRANSCRIPTION-CODE-TRANSLATION: the nucleotide-derived second-messenger chemistry (cAMP as one of the six jobs a free nucleotide can do) this article's mechanism section assumes

## question_ids

## resource_ids
src_4ff0b2fb099c99bb896e

## article_source_ids
src_4ff0b2fb099c99bb896e

## claim_ids
CLM-FND-8C5B1666F4F7C1-01
CLM-FND-13FCDB652CB258-01
CLM-FND-22F8C729D1E8B0-01
CLM-FND-1D57FC5C8BFF90-01
CLM-FND-D10E79C01B3345-01

## span_ids
SPN-FND-SIG-01
SPN-FND-SIG-02

## universities
au

## years
AU_Y1

## module

## university_notes
AU: taught from AU-MED-102 Biochemistry's Cell Signaling MCQ bank (src_4ff0b2fb099c99bb896e)
and corroborated by the short and long End of Module papers' biochemistry sections. The
general four-receptor-types taxonomy this article assumes (ion channel / GPCR / receptor
tyrosine kinase / nuclear receptor) is a sparse update onto an existing pending Kasr
pharmacology concept (CON-FND-42F34977A8DF23), not a record minted by this lane — see this
lane's pending-live file — so it is referenced here in prose rather than in
`related_concepts`, which only names concepts this batch itself can resolve.
crossLaneBoundary: The myasthenia gravis / nicotinic-receptor vignette is authored by this
Biochemistry lane for the receptor-mechanism classification only; the AU-MED-102 Histology +
Physiology lane owns the neuromuscular-junction anatomy and autoimmune-disease teaching of
the same vignette.

## annotations
### definition_of · CON-FND-13FCDB652CB258
Quote: What makes a cell a target for a hormone or other signalling molecule is that it expresses a receptor specific to that molecule
Block: body

### definition_of · CON-FND-22F8C729D1E8B0
Quote: this question bank's own teaching classifies synaptic transmission across the synaptic cleft as an example of paracrine signalling, since a neurotransmitter acting locally on an adjacent cell fits the same "nearby cell" criterion
Block: body

### definition_of · CON-FND-8C5B1666F4F7C1
Quote: Phosphorylation attaches a phosphate group to a protein's serine, threonine or tyrosine side chain, and depending on the specific protein this can either activate or inactivate it
Block: body

### definition_of · CON-FND-D10E79C01B3345
Quote: adenylate cyclase synthesises it from ATP and phosphodiesterase degrades it back to inactive 5'-AMP, so the intracellular cAMP level at any moment reflects the balance between these two opposing activities, not synthesis alone
Block: body

### definition_of · CON-FND-1D57FC5C8BFF90
Quote: This department's own teaching gives a typical intracellular (nuclear/steroid-type) receptor about two domains, while a typical cell-membrane receptor is described with more
Block: body

## media

## media_recommendations
### diagram · The four receptor types drawn on one timescale axis, milliseconds to hours
Purpose: The bank tests which receptor type a given ligand uses across five separate
questions; a single timescale diagram lets a student place ion channel, GPCR, receptor
tyrosine kinase and nuclear receptor relative to each other instead of memorising four
isolated facts.
Priority: required
Status: needed
Section: Clinical significance
Source direction: openly licensed cell biology diagram set
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
AU-MED-102 Biochemistry's Cell Signaling MCQ bank (src_4ff0b2fb099c99bb896e), a
staff-authored department question source for this module.

## evidence_gaps
As with the sibling articles: every citation's resource_id is a real corpus src_ id, but the
evidence-source record for it is owned by sub-lane A and not yet authored (CLAIMS.md Wanted
row).

## conflicts

## last_reviewed

## review_due

## notes
Grouped article covering 5 of this sub-lane's 26 newly minted concepts (cell signalling);
the sixth cell-signalling idea this sub-lane owns, the general receptor-mechanism taxonomy,
is a sparse update onto an existing Kasr pharmacology concept and lives in this lane's
pending-live file instead of here.

## field_notes
aliases: Filled above.
arabicTitle: Filled above.
microtopicId: SYS-FND-T01-S02 (Cell cycle and signaling) is a topic-level node; the individual concepts each carry a more specific microtopic where the catalogue has one (Receptors, Second messengers).
nanotopicId: As above.
moduleIds: No verified live AU-MED-102 module row exists in src/data/universities.ts yet (owned by the academic lane, P0-B) — module_subject on each concept carries the department position explicitly instead.
questionIds: Questions testing these concepts are authored separately in question/AU-MED-102-biochem-molecular-mcq.md and will be linked back once that batch is confirmed against this article.
media: No rights-cleared asset exists yet — one is requested in media_recommendations.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
