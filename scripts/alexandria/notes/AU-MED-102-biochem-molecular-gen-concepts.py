#!/usr/bin/env python3
"""Generate the NEW-concept batch file for AU-MED-102 Biochemistry, sub-lane D
(molecular biology & cell signalling). Hand-authored data below; this script only
lays it out in the importer's markdown shape so all 26 records carry the same
governance/audience boilerplate consistently."""
import json

# Each entry: id, canonical_key, label, aliases(list), arabic_label, arabic_aliases(list),
# definition, explicit_objective, pitfalls, concept_type, primary_node_id,
# secondary_node_ids(list or []), topic, subtopic, microtopic, module_subject(list),
# exam_signal(list of "src | tier | year | locator"), blueprint_weight, clinical_relevance,
# academic_relevance, weight_confidence, confidence, original_wording(list),
# related_concept_ids(list), rel_notes(str for field_notes relationships line),
# extra_field_notes(dict of key->reason for blanks beyond the standard set)

CONCEPTS = [
dict(
  id="CON-FND-92DD65D96E3FA1", key="purine.catabolism.uric-acid-endproduct",
  label="Purine catabolism in humans ends at uric acid, not urea or hypoxanthine",
  aliases=["Purine breakdown product","End product of purine catabolism","Uric acid formation"],
  arabic_label="حمض اليوريك كناتج نهائي لتكسير البيورينات",
  arabic_aliases=["تكسير البيورينات"],
  definition="Humans lack uricase, so the purine bases adenine and guanine are degraded through hypoxanthine and xanthine to uric acid, which is excreted rather than oxidised further. Urea is the end product of amino-acid nitrogen disposal, a separate pathway.",
  objective="State that uric acid, not urea or hypoxanthine, is the final excreted product of human purine catabolism, and explain why (uricase is absent in humans).",
  pitfalls="Confusing the end product of purine catabolism (uric acid) with the end product of amino-acid nitrogen disposal (urea) because both are nitrogenous waste excreted in urine. Hypoxanthine and xanthine are catabolic intermediates, not the end product.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01"],
  topic="Molecular biology", subtopic="Nucleotide metabolism", microtopic="Purine catabolism",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Purine catabolism"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q1"],
  bw=0.35, cr=0.3, ar=0.6, wc=0.4, conf=0.7,
  original=["The chief product of catabolism of purines in human beings is: b- Uric acid"],
  related=[], rel_notes="Cross-links to sub-lane C's blood-biochemistry heme/purine concepts (gout, hyperuricaemia) are that lane's to make; this record is the plain biochemical fact only.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-92DD65D96E3FA1-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-7302601EA492D2", key="replication.fidelity.base-pairing-and-proofreading",
  label="DNA replication fidelity rests on complementary base pairing and DNA polymerase's own proofreading, and the same base-pairing rule lets you write any strand's complement",
  aliases=["Replication fidelity","Complementary base pairing","Predicting a complementary DNA strand"],
  arabic_label="دقة التضاعف والتزاوج التكاملي للقواعد",
  arabic_aliases=["تزاوج القواعد التكاملي"],
  definition="Replication copies a template strand with very low error because each incoming nucleotide must complementary-base-pair correctly (A with T, G with C) before DNA polymerase adds it, and the polymerase itself proofreads by removing a wrongly-paired nucleotide via its 3'-to-5' exonuclease activity. The same pairing rule lets a student derive the complementary sequence of any given strand, antiparallel and base-for-base.",
  objective="Explain the two mechanisms that give DNA replication its fidelity, and apply the base-pairing rule to write the antiparallel complement of a given DNA sequence.",
  pitfalls="Naming only base pairing and forgetting that DNA polymerase's proofreading is a second, independent check — the question bank tests both as the reasons fidelity is high, not one alone. When writing a complementary strand, forgetting to reverse the direction (5'->3' becomes 3'->5' on the new strand written the other way).",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA replication", microtopic="Replication fidelity",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA replication"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q2, q3, q28",
               "src_01ab4268402d32d4d111 | department_bank | | molecular biology q1, q2"],
  bw=0.4, cr=0.3, ar=0.7, wc=0.5, conf=0.75,
  original=["Fidelity of replication is ensured by: a- Complementary base pairing (and) b- Specificity of DNA polymerase"],
  related=["CON-FND-5BAF472E54A764"], rel_notes="related_concept_ids links to the antiparallel/hydrogen-bonding concept (a Kasr pending record, so cross-linked loosely rather than as a typed edge, since a typed edge needs both endpoints live).",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-7302601EA492D2-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-73C77966B56FED", key="telomere.replication.telomerase-function",
  label="Telomerase adds telomeric repeats so a linear chromosome does not shorten with every replication",
  aliases=["Telomerase","End-replication problem","Chromosome ageing"],
  arabic_label="إنزيم التيلوميراز ووظيفته",
  arabic_aliases=["التيلومير"],
  definition="Linear chromosomes lose a small amount of sequence at each round of replication because the lagging strand cannot be primed all the way to its end. Telomerase, a reverse transcriptase carrying its own RNA template, extends the chromosome's telomeric repeats to offset this loss, which is why it is described as protecting DNA from ageing.",
  objective="State what telomerase does and why a cell without active telomerase loses chromosomal DNA with each division.",
  pitfalls="Confusing telomerase with topoisomerase or DNA ligase because all three are 'enzymes that do something to DNA ends or coils' — telomerase is specifically about compensating for end-replication loss, not relieving supercoiling or sealing nicks.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA replication", microtopic="Telomeres and telomerase",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA replication"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q4"],
  bw=0.3, cr=0.35, ar=0.55, wc=0.4, conf=0.7,
  original=["Which enzyme protects DNA from aging? d- Telomerase"],
  related=[], rel_notes="No populated neighbour under DIS-BIO-T06 shares this specific mechanism; recorded as an isolated leaf pending the relationship pass once more of this cluster is live.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-73C77966B56FED-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-F1E54D68C8FAB0", key="rna.composition.uracil-vs-thymine-single-strand",
  label="RNA is distinguished from DNA by uracil in place of thymine and by being single-stranded, and RNA never contains xanthine as a base",
  aliases=["RNA vs DNA bases","Uracil vs thymine","RNA composition"],
  arabic_label="التركيب الكيميائي للحمض النووي الريبي",
  arabic_aliases=["اليوراسيل مقابل الثايمين"],
  definition="RNA carries uracil where DNA carries thymine, is built as a single strand rather than a duplex, and — like DNA — never uses xanthine as one of its four bases; xanthine is a purine catabolism intermediate, not a nucleic acid base. mRNA in particular is important for protein synthesis and contains all the standard RNA bases except thymine.",
  objective="Identify the base and strandedness differences that distinguish RNA from DNA, and reject xanthine as a nucleic acid base in either.",
  pitfalls="Assuming xanthine must be one of the bases because it appears in the same metabolic neighbourhood as the true purine bases (adenine, guanine) — it is a catabolic intermediate, never incorporated into RNA or DNA.",
  concept_type="classification",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Nucleic acid structure", microtopic="RNA composition",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > RNA structure"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q5, q6, q18",
               "src_01ab4268402d32d4d111 | department_bank | | molecular biology q4, q5, q20"],
  bw=0.35, cr=0.25, ar=0.6, wc=0.45, conf=0.7,
  original=["The nitrogenous base absent in DNA is: a- Uracil", "As regard RNA, all are correct EXCEPT: a- It contains xanthine"],
  related=[], rel_notes="Loosely related to the mRNA-processing concept in this same file (both concern mRNA), but each answers a different question, so no typed edge — recorded as related_concept_ids only.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-F1E54D68C8FAB0-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-5FF8EB2DB4D662", key="mrna.processing.capping-polyadenylation-splicing",
  label="mRNA processing adds a 7-methylguanosine 5' cap and a 3' poly-A tail and removes introns by splicing — nuclear export is a separate, later step, not part of processing itself",
  aliases=["mRNA processing","5' cap","Poly-A tail","Post-transcriptional processing"],
  arabic_label="معالجة الحمض النووي الريبي المرسال",
  arabic_aliases=["الغطاء الطرفي 5", "ذيل بولي أدينين"],
  definition="A eukaryotic primary transcript is processed into mature mRNA by three steps: capping the 5' end with 7-methylguanosine triphosphate, adding a poly-A tail at the 3' end, and splicing out introns to join exons. Export of the finished mRNA from the nucleus to the cytoplasm happens afterwards, as a separate transport step, not as part of processing.",
  objective="List the three steps of mRNA processing and the chemical identity of the 5' cap, and distinguish processing from the nuclear-export step that follows it.",
  pitfalls="Listing nuclear export as one of the processing steps because it happens in the same general sequence of events — the question bank specifically tests that export is what processing is not.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Transcription", microtopic="mRNA processing",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Transcription"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q7, q42, q79",
               "src_01ab4268402d32d4d111 | department_bank | | molecular biology q6, q15"],
  bw=0.4, cr=0.3, ar=0.65, wc=0.45, conf=0.7,
  original=["The processing of mRNA does not involve: d- Transfer of mRNA into nucleus","After Transcription, 5' end of mRNA is capped with which molecule? a- 7-Methyl Guanosine Tri phosphate"],
  related=[], rel_notes="Cross-links loosely to the pending splicing/intron concept (CON-FND-27013C64915C7E, Kasr 102-INT) and the pending promoter concept (CON-FND-CC55F157021237) — both teach adjacent steps of the same transcription-to-translation pipeline.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-5FF8EB2DB4D662-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-A1B0BFB9626438", key="code.properties.degenerate-unambiguous-nonoverlapping-universal",
  label="The genetic code is degenerate, unambiguous, non-overlapping and universal, and each codon is exactly three nucleotides long",
  aliases=["Genetic code properties","Triplet code","Codon"],
  arabic_label="خصائص الشفرة الوراثية",
  arabic_aliases=["الشفرة الوراثية"],
  definition="A codon is a triplet of three mRNA nucleotides. The genetic code built from these triplets is degenerate (most amino acids have more than one codon), unambiguous (a given codon specifies only one amino acid, never several), non-overlapping (each nucleotide belongs to only one codon, read consecutively) and universal (nearly all organisms use the same code). It is not ambiguous — that is the property it lacks, and the property exam questions most often test by asking which statement is false.",
  objective="State the four defining properties of the genetic code (degenerate, unambiguous, non-overlapping, universal) and the length of a codon, and identify 'ambiguous' as the property the code does not have.",
  pitfalls="Picking 'ambiguous' as a true property of the genetic code because it superficially resembles 'degenerate' — degeneracy means several codons can specify one amino acid; ambiguity would mean one codon specifies several amino acids, which never happens.",
  concept_type="classification",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="The genetic code", microtopic="Genetic code properties",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Genetic code"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q9, q12, q46, q56, q68, q77",
               "src_01ab4268402d32d4d111 | department_bank | | molecular biology q8"],
  bw=0.4, cr=0.2, ar=0.65, wc=0.45, conf=0.75,
  original=["Which is not true regarding the genetic code? b- Ambiguous","The number of nitrogenous bases in mRNA that form a codon is: b- 3"],
  related=["CON-FND-906B844C9AEE7D"], rel_notes="related_concept_ids links to this file's own anticodon-codon-pairing concept — both belong to the same 'reading the genetic code' cluster.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-A1B0BFB9626438-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-E8CD7F7F690B14", key="repair.xeroderma-pigmentosum.nucleotide-excision-defect",
  label="Xeroderma pigmentosum is a defect in nucleotide excision repair, leaving UV-induced DNA damage unrepaired",
  aliases=["Xeroderma pigmentosum","Nucleotide excision repair defect","UV sensitivity, DNA repair"],
  arabic_label="جفاف الجلد المصطبغ وعيب الإصلاح باستئصال النيوكليوتيدات",
  arabic_aliases=["إصلاح استئصال النيوكليوتيدات"],
  definition="Xeroderma pigmentosum is caused by a defect in nucleotide excision repair, the pathway that normally removes bulky, helix-distorting lesions such as UV-induced pyrimidine dimers. Without it, unrepaired UV damage accumulates, producing the extreme sun sensitivity and skin changes (including a markedly raised skin-cancer risk) that define the disease.",
  objective="Name nucleotide excision repair as the pathway defective in xeroderma pigmentosum, and state what kind of lesion that pathway normally removes.",
  pitfalls="Attributing xeroderma pigmentosum to a transcription or translation defect rather than a DNA-repair defect, because the clinical vignette describes damage 'from the outside' (sunlight) rather than an obviously genetic mechanism.",
  concept_type="clinical_feature",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA repair", microtopic="Nucleotide excision repair",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA repair"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q10, q81",
               "src_01ab4268402d32d4d111 | department_bank | | molecular biology q9"],
  bw=0.4, cr=0.55, ar=0.5, wc=0.5, conf=0.75,
  original=["Xerodema pigmentosa results from defect in: c- DNA repair","A 13 years old boy suffers from ulceration and extreme sensitivity to sunlight, which of the following enzymes has a defect? a- Endonuclease"],
  related=[], rel_notes="Cross-links to this file's own DNA-repair-mechanism-family concept is owed once that concept is authored (deferred this turn, see field_notes).",
  extra_notes={"relatedConceptIds":"The broader DNA-repair-mechanism-family concept (base excision / nucleotide excision / mismatch repair) that would normally cross-link here is mapped but not yet authored in this pass; see this lane's hand-over report."},
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-E8CD7F7F690B14-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-8E4A3DB9BC03AC", key="dna.strand-direction.five-to-three-convention",
  label="The nucleotide sequence of a DNA strand is always written in the 5' to 3' direction by convention",
  aliases=["5' to 3' direction","DNA sequence convention"],
  arabic_label="اتجاه كتابة تسلسل الحمض النووي من 5' إلى 3'",
  arabic_aliases=[],
  definition="By convention, the nucleotide sequence of a DNA (or RNA) strand is always written starting from its 5' end and ending at its 3' end, never the reverse and never ambiguously either direction, because the sugar-phosphate backbone itself has a fixed chemical polarity (a free 5'-phosphate at one end, a free 3'-hydroxyl at the other).",
  objective="State that a nucleic acid sequence is conventionally written 5' to 3', and explain that this reflects the backbone's real chemical polarity rather than an arbitrary choice.",
  pitfalls="Treating the writing direction as an arbitrary convention that 'could go either way' — the bank explicitly rejects that option, because the physical polarity of the backbone is real, not a labelling choice.",
  concept_type="definition",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA structure", microtopic="Strand polarity",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA structure"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q11"],
  bw=0.3, cr=0.15, ar=0.55, wc=0.4, conf=0.7,
  original=["The order nucleotides in DNA strand in always written: a- From the 5' to 3' direction"],
  related=["CON-FND-5BAF472E54A764"], rel_notes="related_concept_ids links to the antiparallel/hydrogen-bonding pending concept — same structural topic, different specific fact.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-8E4A3DB9BC03AC-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-5B8E3AAFEB6C35", key="replication.directionality.semiconservative",
  label="DNA replication is semiconservative — each daughter duplex keeps one parental strand and synthesises one new strand — and it requires DNA polymerase",
  aliases=["Semiconservative replication","Meselson-Stahl"],
  arabic_label="التضاعف نصف المحافظ للحمض النووي",
  arabic_aliases=[],
  definition="Replication is semiconservative: each of the two new DNA duplexes is built from one original (parental) strand serving as template and one newly synthesised strand, so no daughter molecule is either fully new or fully old. It requires DNA polymerase, and — because polymerases only extend an existing 3'-OH — synthesis always proceeds 5' to 3' on the new strand, never 3' to 5'.",
  objective="State that replication is semiconservative and explain why new DNA synthesis always runs 5' to 3', never 3' to 5'.",
  pitfalls="Picking '3' to 5'' as a valid direction for new-strand synthesis because the template is read 3' to 5' — the template's reading direction and the new strand's synthesis direction are opposite, and the bank tests exactly this reversal as the false option.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA replication", microtopic="Semiconservative replication",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA replication"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q13"],
  bw=0.35, cr=0.2, ar=0.6, wc=0.45, conf=0.7,
  original=["Replication is characterized by all EXCEPT: c- It occurs from 3' - 5' direction"],
  related=["CON-FND-7302601EA492D2"], rel_notes="related_concept_ids links to this file's own replication-fidelity concept — same overall process, different tested facts.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-5B8E3AAFEB6C35-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-412F3EDF118F44", key="transcription.rna-polymerase.gene-class-specificity",
  label="Each eukaryotic RNA polymerase transcribes its own class of genes: RNA polymerase I makes the large ribosomal RNAs, II makes mRNA, and III makes tRNA and the small 5S rRNA and snRNA",
  aliases=["RNA polymerase I II III","Eukaryotic RNA polymerases"],
  arabic_label="أنواع بوليميراز الحمض النووي الريبي الثلاثة",
  arabic_aliases=[],
  definition="Eukaryotes divide transcription among three RNA polymerases by the class of RNA product: RNA polymerase I transcribes the genes for the large ribosomal RNAs (5.8S, 18S and 28S rRNA), RNA polymerase II transcribes protein-coding genes into mRNA, and RNA polymerase III transcribes tRNA genes together with 5S rRNA and the small nuclear RNAs.",
  objective="Match each of RNA polymerase I, II and III to the class of RNA gene it transcribes.",
  pitfalls="Assuming RNA polymerase I makes mRNA because it is 'numbered first' — mRNA is polymerase II's product; I is dedicated to the large ribosomal RNAs.",
  concept_type="classification",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Transcription", microtopic="RNA polymerase specificity",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Transcription"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q14"],
  bw=0.35, cr=0.2, ar=0.6, wc=0.45, conf=0.7,
  original=["RNA polymerase I transcribes the genes of: c- 5.8S, 18S, 28S rRNA"],
  related=[], rel_notes="No populated sibling under DIS-BIO-T06 yet shares this exact fact; flagged for the relationship pass once the wider molecular-biology cluster is fuller.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-412F3EDF118F44-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-DF5E3014A149FC", key="mutation.point-mutation.transition-vs-transversion",
  label="A transition point mutation swaps a purine for a purine or a pyrimidine for a pyrimidine; a transversion swaps a purine for a pyrimidine or vice versa",
  aliases=["Transition mutation","Transversion mutation","Point mutation classification by base chemistry"],
  arabic_label="طفرة الانتقال مقابل التحويل",
  arabic_aliases=[],
  definition="Point mutations are classed by the chemical relationship between the old and new base. A transition substitutes one purine for the other purine (A<->G) or one pyrimidine for the other pyrimidine (C<->T/U); a transversion substitutes a purine for a pyrimidine or a pyrimidine for a purine. This axis (transition vs transversion) is independent of whether the substitution turns out to be silent, missense or nonsense.",
  objective="Classify a given base substitution as a transition or a transversion from the purine/pyrimidine identity of the old and new bases.",
  pitfalls="Confusing this purine/pyrimidine axis with the functional-consequence axis (silent/missense/nonsense) — a question can ask for either classification of the very same substitution, and they are not interchangeable answers.",
  concept_type="classification",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Mutation", microtopic="Point mutation classification",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Mutation"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q16, q47, q83"],
  bw=0.35, cr=0.25, ar=0.6, wc=0.45, conf=0.7,
  original=["One of the following is transition type of point mutations: c- Guanine is replaced by adenine"],
  related=["CON-FND-4508AC0EA86F86"], rel_notes="related_concept_ids links to the pending nonsense/missense/silent concept — this record is the base-chemistry axis, that one the functional-consequence axis, of the same substitution event.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-DF5E3014A149FC-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-914D9DDFB56AD1", key="nucleotide.structure.nucleoside-vs-nucleotide",
  label="Removing the phosphate group from a nucleotide leaves a nucleoside",
  aliases=["Nucleoside vs nucleotide"],
  arabic_label="النيوكليوسيد مقابل النيوكليوتيد",
  arabic_aliases=[],
  definition="A nucleotide is a base joined to a sugar (a nucleoside) plus one or more phosphate groups. Removing the phosphate — not the base and not the sugar — is what converts a nucleotide into a nucleoside.",
  objective="State which group's removal converts a nucleotide into a nucleoside.",
  pitfalls="Answering 'purine base' or 'pyrimidine base' because base loss also changes the molecule — but base loss gives an abasic sugar-phosphate, not a nucleoside; it is specifically the phosphate whose removal defines the nucleoside.",
  concept_type="definition",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Nucleotide structure", microtopic="Nucleoside vs nucleotide",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Nucleotide structure"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q19"],
  bw=0.25, cr=0.15, ar=0.5, wc=0.4, conf=0.7,
  original=["Nucleotide is converted into nucleoside by removal of: d- Phosphate"],
  related=[], rel_notes="A small, self-contained definitional fact; no populated sibling to cross-link under DIS-BIO-T06 yet.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-914D9DDFB56AD1-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-CA2D65E688434A", key="trna.structure.acceptor-arm-cca",
  label="Every tRNA's acceptor arm ends in the same 3'-CCA sequence, which is where the amino acid attaches",
  aliases=["tRNA acceptor arm","3' CCA end"],
  arabic_label="ذراع القبول في الحمض النووي الريبي الناقل",
  arabic_aliases=[],
  definition="Every tRNA molecule, regardless of which amino acid it carries, terminates its acceptor arm at the 3' end with the same CCA sequence (5'-...C-C-A-3'). The terminal adenosine's 3'-hydroxyl is where the corresponding amino acid is esterified by its aminoacyl-tRNA synthetase.",
  objective="State the sequence that terminates every tRNA's acceptor arm and what attaches there.",
  pitfalls="Reversing the sequence direction (writing it 3'-ACC-5' or similar) — the bank tests the exact 5'-to-3' order, CCA, not just the three letters.",
  concept_type="definition",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Translation", microtopic="tRNA structure",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Translation"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q25"],
  bw=0.3, cr=0.2, ar=0.55, wc=0.4, conf=0.7,
  original=["The acceptor arm of tRNA terminates at its 3' OH ends by: 5'-CCA-3'"],
  related=["CON-FND-906B844C9AEE7D"], rel_notes="related_concept_ids links to this file's own anticodon-codon-pairing concept — both are tRNA structural facts.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-CA2D65E688434A-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-09FACBDCBBF8FD", key="translation.initiation.start-codon-aug",
  label="AUG is the mRNA start codon in almost every case, and initiation forms a complex with methionyl-tRNA",
  aliases=["Start codon","AUG"],
  arabic_label="شفرة البدء AUG",
  arabic_aliases=[],
  definition="Translation begins at the codon AUG in the overwhelming majority of mRNAs, which is why AUG is called the start codon. In eukaryotic initiation, a methionyl-initiator-tRNA complex (charged with methionine and recognising AUG) is what assembles at the start site, not one of the other amino-acid tRNAs.",
  objective="Name AUG as the (near-universal) mRNA start codon and identify methionyl-tRNA as the initiator complex that recognises it.",
  pitfalls="Picking a stop codon (UAA, UGA) as the start codon by confusing 'the first codon read' with 'the codon that starts the process' — the initiator complex specifically recognises AUG, and a stop codon terminates rather than starts.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Translation", microtopic="Translation initiation",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Translation"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q26, q33"],
  bw=0.35, cr=0.2, ar=0.6, wc=0.45, conf=0.7,
  original=["Which of the following is the mRNA start codon in most cases? c- AUG","During the initiation of translation in eukaryotes, a tRNA complex is formed with: c- Met (AUG)"],
  related=[], rel_notes="Cross-links to this file's own peptidyl-transferase/termination concept are owed once that concept is authored (deferred this turn, see field_notes).",
  extra_notes={"relatedConceptIds":"The translation-termination concept (peptidyl transferase, release factors) that would naturally cross-link here as the other end of the same process is mapped but not yet authored in this pass; see this lane's hand-over report."},
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-09FACBDCBBF8FD-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-252B3C77D181DA", key="replication.dna-ligase.okazaki-fragment-joining",
  label="DNA ligase joins Okazaki fragments together, sealing the nicks left on the lagging strand",
  aliases=["DNA ligase","Okazaki fragment joining"],
  arabic_label="إنزيم لايجيز وربط شظايا أوكازاكي",
  arabic_aliases=[],
  definition="The lagging strand is synthesised discontinuously as short Okazaki fragments, each starting from its own RNA primer. After the primers are removed and replaced with DNA, DNA ligase forms the final phosphodiester bond that seals the nick between adjacent fragments, joining them into one continuous strand.",
  objective="State what DNA ligase does at the lagging strand and why that step is needed there specifically.",
  pitfalls="Crediting DNA ligase with synthesising the fragments themselves — that is DNA polymerase's job; ligase only seals the join between fragments that already exist.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA replication", microtopic="Lagging-strand synthesis",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA replication"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q29"],
  bw=0.35, cr=0.2, ar=0.6, wc=0.45, conf=0.7,
  original=["What is the function of DNA ligase? c- Joins the Okazaki fragments"],
  related=["CON-FND-7302601EA492D2"], rel_notes="related_concept_ids links to this file's own replication-fidelity concept — same overall process.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-252B3C77D181DA-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-D717E6E7EEA466", key="transcription.strands.coding-strand-vs-mrna",
  label="The coding strand of DNA has the same sequence as its mRNA except that mRNA uses uracil where the coding strand uses thymine",
  aliases=["Coding strand","Sense strand","Template strand vs coding strand"],
  arabic_label="الشريط المرمز مقابل الحمض النووي الريبي المرسال",
  arabic_aliases=[],
  definition="The coding (sense) strand of DNA reads the same base sequence as the mRNA transcribed from that gene, base for base, with one systematic substitution: everywhere the coding strand carries thymine, the mRNA carries uracil. RNA polymerase itself copies the other strand, the template (antisense) strand, by complementary base pairing.",
  objective="State the one difference between a gene's coding strand and its mRNA, and identify which of the two DNA strands RNA polymerase actually reads.",
  pitfalls="Assuming the coding strand is the one RNA polymerase reads because it is called 'coding' — polymerase reads the template strand; the coding strand is named for matching the RNA product, not for being the one transcribed.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Transcription", microtopic="Coding vs template strand",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Transcription"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q30, q63"],
  bw=0.35, cr=0.2, ar=0.6, wc=0.45, conf=0.7,
  original=["The coding strand of DNA is the same as the associated mRNA EXCEPT for: a- mRNA uses U instead of T"],
  related=[], rel_notes="Cross-links to this file's own RNA-polymerase-mechanism concept are owed once that concept is authored (deferred this turn, see field_notes).",
  extra_notes={"relatedConceptIds":"The RNA-polymerase-mechanism concept (3'-addition, no primer) that would naturally cross-link here is mapped but not yet authored in this pass; see this lane's hand-over report."},
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-D717E6E7EEA466-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-906B844C9AEE7D", key="translation.trna.anticodon-codon-pairing",
  label="A tRNA's anticodon, at its 3' end, pairs with the complementary codon on mRNA to place the correct amino acid",
  aliases=["Anticodon","Codon-anticodon pairing"],
  arabic_label="اقتران الشفرة المضادة مع الشفرة الوراثية",
  arabic_aliases=[],
  definition="The anticodon is a three-nucleotide sequence carried on tRNA that base-pairs, antiparallel, with the complementary codon on mRNA. This pairing is what positions each tRNA's specific amino acid at the correct place in the growing polypeptide, translating the mRNA sequence into a protein sequence.",
  objective="State which two molecules pair through the anticodon-codon interaction, and which one (mRNA or tRNA) carries which.",
  pitfalls="Placing the anticodon on mRNA and the codon on tRNA — the terms are frequently swapped by students; the codon is always the mRNA triplet, the anticodon is always the tRNA triplet that reads it.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Translation", microtopic="Codon-anticodon pairing",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Translation"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q31"],
  bw=0.35, cr=0.2, ar=0.6, wc=0.45, conf=0.7,
  original=["The anticodon is a set of three nucleotides on the 3'-end of ...., which corresponds to the codon on the ......... a- tRNA; mRNA"],
  related=["CON-FND-CA2D65E688434A","CON-FND-A1B0BFB9626438"], rel_notes="related_concept_ids links to this file's own tRNA-acceptor-arm and genetic-code-properties concepts — all three are the 'reading the code at the ribosome' cluster.",
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-906B844C9AEE7D-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-FFEE58EC9C0784", key="replication.topoisomerase.supercoil-relief",
  label="Topoisomerase relieves the supercoiling that helicase's unwinding creates ahead of the replication fork",
  aliases=["Topoisomerase","DNA supercoil relief"],
  arabic_label="إنزيم توبويزوميراز وتخفيف الالتفاف الفائق",
  arabic_aliases=[],
  definition="As helicase unwinds the parental DNA duplex at the replication fork, the still-wound DNA ahead of the fork becomes overwound (positively supercoiled) because the two strands cannot simply spin freely in the cell. Topoisomerase relieves this supercoiling by transiently cutting one or both strands, letting the DNA rotate, and resealing the break — without it, the fork would stall.",
  objective="State what problem topoisomerase solves at the replication fork, and which enzyme's action creates that problem in the first place.",
  pitfalls="Confusing topoisomerase's role with DNA ligase's — both 'cut and reseal' DNA, but ligase seals nicks between finished Okazaki fragments while topoisomerase relieves torsional strain ahead of the fork.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA replication", microtopic="Supercoiling and topoisomerase",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA replication"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q35, q74"],
  bw=0.35, cr=0.25, ar=0.6, wc=0.45, conf=0.7,
  original=["Which of the following relives the supercoil on the parental duplex of DNA caused by unwinding during synthesis? d- Toposiomerase","What is the function of Topoisomerase enzyme in DNA replication? a- Relax supercoiled DNA created by Helicase action"],
  related=["CON-FND-252B3C77D181DA"], rel_notes="related_concept_ids links to this file's own DNA-ligase concept — both are 'cut and reseal' enzymes students conflate, worth an often_confused_with edge once both are live and the relationship pass runs.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-FFEE58EC9C0784-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-31C41EFEF31740", key="dna.composition.chargaff-base-ratio-rule",
  label="Chargaff's rule: in double-stranded DNA the amount of adenine equals thymine and the amount of guanine equals cytosine, so knowing one base's percentage gives every other base's percentage",
  aliases=["Chargaff's rule","DNA base ratios","Percentage base composition"],
  arabic_label="قاعدة شارجاف لنسب القواعد النيتروجينية",
  arabic_aliases=[],
  definition="Because every adenine on one strand of double-stranded DNA pairs with a thymine on the other, and every guanine pairs with a cytosine, the total amount of adenine in a DNA sample always equals the total amount of thymine, and total guanine always equals total cytosine (Chargaff's rule). Given the percentage of any one base, the other three percentages can be calculated directly from this rule.",
  objective="Apply Chargaff's rule to calculate the percentage of any base in double-stranded DNA given the percentage of one other base.",
  pitfalls="Applying Chargaff's rule to single-stranded nucleic acids (mRNA, ssDNA) where it does not hold, because there is no obligatory partner strand to enforce the 1:1 ratio.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="DNA structure", microtopic="Base composition rules",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > DNA structure"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q41, q51, q65, q80"],
  bw=0.4, cr=0.2, ar=0.65, wc=0.5, conf=0.75,
  original=["If cytosine content of DNA is 20% of the total bases, the adenine content will be: c- 30%"],
  related=["CON-FND-5BAF472E54A764"], rel_notes="related_concept_ids links to the pending antiparallel/hydrogen-bonding concept — Chargaff's rule is the quantitative consequence of that same base-pairing fact.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-31C41EFEF31740-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-DB1988D55A69E3", key="pcr.requirements.primers-polymerase-dntps",
  label="PCR is an in vitro DNA-amplification technique that requires two primers, a thermostable DNA polymerase and all four deoxyribonucleoside triphosphates, run through repeated thermocycler cycles",
  aliases=["PCR","Polymerase chain reaction","PCR requirements"],
  arabic_label="متطلبات تفاعل البوليميراز المتسلسل",
  arabic_aliases=["تفاعل البوليميراز المتسلسل"],
  definition="PCR amplifies a chosen DNA segment in vitro (not in a living cell) using an automated thermocycler. Each cycle needs two sequence-specific primers that flank the target, a thermostable DNA polymerase able to survive repeated heating (rather than the heat-sensitive polymerases used in vivo), and all four deoxyribonucleoside triphosphates as building blocks.",
  objective="List the three components PCR requires beyond the target DNA (two primers, thermostable polymerase, all four dNTPs) and state that it is an in vitro, not in vivo, technique.",
  pitfalls="Calling PCR an in vivo technique because it 'copies DNA the way a cell does' — it deliberately reproduces replication chemistry outside any cell, in a thermocycler, which is exactly why it needs a heat-stable polymerase a living cell does not.",
  concept_type="investigation",
  primary_node_id="DIS-BIO-T06", secondary=["SYS-FND-T01-S01-M03"],
  topic="Molecular biology", subtopic="Recombinant DNA techniques", microtopic="PCR",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Recombinant DNA and PCR"],
  exam_signal=["src_80f6b1121bd3b85f8886 | department_bank | | q44, q45"],
  bw=0.35, cr=0.3, ar=0.55, wc=0.45, conf=0.7,
  original=["PCR (Practical): a- In vivo technique for DNA amplification (false)","PCR requires (Practical): d- A and B (2 types of DNA primers, and thermostable DNA polymerase)"],
  related=[], rel_notes="The source bank itself tags both PCR items '(Practical)' — recorded here as a concept because the exam tests it as a fact, with a note that a practical/skills-checklist treatment may also be owed if a practical format source ever surfaces for this module.",
  article_id="ART-FND-DNA-REPLICATION-REPAIR-PCR",
  claim_id_hint="CLM-FND-DB1988D55A69E3-01",
  resource_id_hint="src_80f6b1121bd3b85f8886",
),
dict(
  id="CON-FND-A1FC2FAF9F0211", key="aminoacid.codon.no-direct-code-cystine",
  label="Cystine has no direct codon of its own because it is formed after translation, from two cysteine residues joined by a disulfide bond",
  aliases=["Cystine","Amino acids without a codon","Disulfide-linked cysteine"],
  arabic_label="السيستين لا يملك شفرة وراثية مباشرة",
  arabic_aliases=[],
  definition="The genetic code specifies cysteine, which does have codons. Cystine — two cysteine molecules joined by a disulfide bond — is produced only after translation, by oxidation of two cysteine side chains; because it is a post-translational product rather than a directly translated residue, no codon specifies cystine itself.",
  objective="Explain why cystine, unlike cysteine, has no direct genetic code word, in terms of when and how it is formed.",
  pitfalls="Treating cystine and cysteine as interchangeable names for one amino acid — cysteine is the codon-specified residue; cystine is the disulfide-bonded dimer formed afterwards, and only the latter lacks a codon.",
  concept_type="mechanism",
  primary_node_id="DIS-BIO-T06", secondary=["DIS-BIO-T05"],
  topic="Molecular biology", subtopic="The genetic code", microtopic="Post-translational amino acid modification",
  module_subject=["AU-MED-102 > Biochemistry > Molecular Biology > Genetic code","AU-MED-102 > Biochemistry > Protein Chemistry > Amino acid modification"],
  exam_signal=["src_4852d425a88297af190e | department_bank_unkeyed | | q74"],
  bw=0.25, cr=0.2, ar=0.45, wc=0.35, conf=0.65,
  original=["Which of the following amino acids doesn't have specific code on DNA? d- Cystine"],
  related=[], rel_notes="Boundary note: this idea sits at the seam between sub-lane A/C's protein-chemistry scope and sub-lane D's genetic-code scope; assigned to D per the triage's named exception (item C40) because the tested mechanism is codon assignment, not amino-acid structure.",
  extra_notes={"weightConfidence":"The source question (Protein MCQ bank Q74) has no printed answer key (the bank's key list ends at Q73) — the option 'd- Cystine' is the standard teaching answer, not a confirmed key, which is why this concept's own weight_confidence is set low rather than the higher confidence used elsewhere in this file."},
  article_id="ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
  claim_id_hint="CLM-FND-A1FC2FAF9F0211-01",
  resource_id_hint="src_4852d425a88297af190e",
),
dict(
  id="CON-FND-8C5B1666F4F7C1", key="signaling.phosphorylation.reversible-switch-ser-thr-tyr",
  label="Phosphorylation of a protein's serine, threonine or tyrosine residues is a reversible switch that can either raise or lower that protein's activity",
  aliases=["Protein phosphorylation","Phosphorylation sites","Reversible covalent modification"],
  arabic_label="الفسفرة كمفتاح تنظيمي قابل للعكس",
  arabic_aliases=[],
  definition="Phosphorylation attaches a phosphate group to a protein's serine, threonine or tyrosine side chain, and depending on the specific protein this can either activate or inactivate it — there is no single universal direction of effect. Because a phosphatase can remove the phosphate again, phosphorylation is a reversible regulatory switch, not a one-way modification.",
  objective="State that a protein's phosphorylation can raise or lower its activity depending on the protein, and name the three residues that can be phosphorylated.",
  pitfalls="Assuming phosphorylation always activates a protein (a common shorthand from kinase-cascade examples) — the bank specifically tests that the direction of effect is protein-dependent, not fixed.",
  concept_type="mechanism",
  primary_node_id="SYS-FND-T01-S02", secondary=["DIS-BIO-T05"],
  topic="Cell signalling", subtopic="Post-translational regulation", microtopic="Phosphorylation",
  module_subject=["AU-MED-102 > Biochemistry > Cell Signaling > Phosphorylation"],
  exam_signal=["src_4ff0b2fb099c99bb896e | department_bank | | q2, q8"],
  bw=0.4, cr=0.3, ar=0.6, wc=0.5, conf=0.75,
  original=["Phosphorylation of a protein: c- Either increases or decreases a protein's activity","On Phosphorylation of a signaling molecule, phosphate group can be linked to which of the following? d- All of the above (Tyrosine, Serine, Threonine)"],
  related=[], rel_notes="Cross-links to Kasr's own pending post-translational-modification concept (102-INT, general PTM survey) are noted but not made as a typed edge, since that record is itself unimported.",
  article_id="ART-FND-CELL-SIGNALING-RECEPTORS",
  claim_id_hint="CLM-FND-8C5B1666F4F7C1-01",
  resource_id_hint="src_4ff0b2fb099c99bb896e",
),
dict(
  id="CON-FND-13FCDB652CB258", key="signaling.target-cell.receptor-specificity",
  label="A cell is a target for a given hormone or signalling molecule only because it expresses the specific receptor for it, not because of its distance from the secreting cell",
  aliases=["Target cell definition","Receptor specificity"],
  arabic_label="الخلية المستهدفة وخصوصية المستقبل",
  arabic_aliases=[],
  definition="What makes a cell a 'target' for a hormone or other signalling molecule is that it expresses a receptor specific to that molecule — a cell without the matching receptor cannot respond, however close it sits to the source, and a cell with the receptor can respond however far away it sits.",
  objective="State that receptor expression, not physical proximity to the secreting cell, is what defines a target cell.",
  pitfalls="Assuming a 'neighbouring cell' is automatically a target cell (confusing this with paracrine signalling's short range) — proximity alone does not confer target status; the receptor does.",
  concept_type="definition",
  primary_node_id="SYS-FND-T01-S02-M02", secondary=[],
  topic="Cell signalling", subtopic="Hormone action", microtopic="Target cell specificity",
  module_subject=["AU-MED-102 > Biochemistry > Cell Signaling > Receptors"],
  exam_signal=["src_4ff0b2fb099c99bb896e | department_bank | | q5"],
  bw=0.3, cr=0.25, ar=0.5, wc=0.4, conf=0.7,
  original=["What defines a cell as a target for certain hormone? c- It has receptor specific to hormone"],
  related=["CON-FND-22F8C729D1E8B0"], rel_notes="related_concept_ids links to this file's own signalling-classification concept (autocrine/paracrine/endocrine) — that concept is about signal range, this one about what makes a cell able to receive the signal at all.",
  article_id="ART-FND-CELL-SIGNALING-RECEPTORS",
  claim_id_hint="CLM-FND-13FCDB652CB258-01",
  resource_id_hint="src_4ff0b2fb099c99bb896e",
),
dict(
  id="CON-FND-22F8C729D1E8B0", key="signaling.classification.autocrine-paracrine-endocrine",
  label="Cell signalling is classified by the distance the signal travels: autocrine acts on the same cell that secreted it, paracrine acts on nearby cells (including synaptic transmission, by this bank's classification), and endocrine travels through the bloodstream",
  aliases=["Autocrine signalling","Paracrine signalling","Endocrine signalling","Signalling classification"],
  arabic_label="تصنيف الإشارات الخلوية حسب المسافة",
  arabic_aliases=["الإفراز الذاتي","الإفراز المجاور"],
  definition="Cell-to-cell signalling is classified by how far the signal travels before acting: autocrine signalling acts back on the same cell that released it; paracrine signalling acts on nearby cells, and this question bank classifies synaptic transmission across the synaptic cleft as an example of paracrine signalling because the neurotransmitter acts locally on an adjacent cell rather than through the bloodstream; endocrine signalling releases a hormone into the blood to act on distant target cells.",
  objective="Classify a described signalling event as autocrine, paracrine or endocrine from the distance the signal travels, and recognise synaptic transmission as this bank's paracrine example.",
  pitfalls="Classifying synaptic transmission as its own separate category rather than as an instance of paracrine signalling — this exact bank keys it as paracrine because a neurotransmitter acting across a synaptic cleft is local, cell-to-neighbouring-cell signalling by the distance criterion the bank uses.",
  concept_type="classification",
  primary_node_id="SYS-FND-T01-S02", secondary=["DIS-BIO-T01"],
  topic="Cell signalling", subtopic="Signalling classification", microtopic="Autocrine, paracrine, endocrine",
  module_subject=["AU-MED-102 > Biochemistry > Cell Signaling > Signalling classification"],
  exam_signal=["src_4ff0b2fb099c99bb896e | department_bank | | q7","src_7d031a45baeadc973a00 | end_of_module | | short eom biochem q3"],
  bw=0.35, cr=0.25, ar=0.6, wc=0.45, conf=0.7,
  original=["Which type of signaling is the transmission of nerve impulse through the synaptic cleft? b- Paracrine"],
  related=["CON-FND-13FCDB652CB258"], rel_notes="related_concept_ids links to this file's own target-cell concept — both are foundational cell-signalling definitions taught together.",
  article_id="ART-FND-CELL-SIGNALING-RECEPTORS",
  claim_id_hint="CLM-FND-22F8C729D1E8B0-01",
  resource_id_hint="src_4ff0b2fb099c99bb896e",
),
dict(
  id="CON-FND-1D57FC5C8BFF90", key="receptor.structure.domain-count-membrane-vs-intracellular",
  label="A typical intracellular receptor is described as having about two domains, while a typical cell-membrane receptor is described as having more, by this bank's teaching",
  aliases=["Receptor domain count","Intracellular vs membrane receptor structure"],
  arabic_label="عدد النطاقات في المستقبلات",
  arabic_aliases=[],
  definition="This department's teaching gives a typical intracellular (nuclear/steroid-type) receptor about two domains, while a typical cell-membrane receptor is described with more domains, reflecting the added complexity of a membrane-spanning, ligand-binding and signal-transducing structure compared with an intracellular receptor's simpler ligand-binding and DNA-binding arrangement.",
  objective="State, per this department's teaching, the approximate domain count given for a typical intracellular receptor versus a typical cell-membrane receptor.",
  pitfalls="Treating this as a universally fixed number rather than the department's own simplified teaching figure — real receptor domain counts vary considerably by receptor family; the bank tests the taught figure specifically.",
  concept_type="classification",
  primary_node_id="SYS-FND-T01-S02-M02", secondary=[],
  topic="Cell signalling", subtopic="Receptor structure", microtopic="Receptor domain count",
  module_subject=["AU-MED-102 > Biochemistry > Cell Signaling > Receptors"],
  exam_signal=["src_4ff0b2fb099c99bb896e | department_bank | | q13, q14"],
  bw=0.2, cr=0.15, ar=0.4, wc=0.3, conf=0.55,
  original=["Number of Domains in Typical Intra Cellular receptor is: b- 2","Number of Domains in Typical Cell Membrane receptor is: c- 3"],
  related=["CON-FND-42F34977A8DF23"], rel_notes="related_concept_ids links to the pending four-receptor-types concept (Kasr 108-INT) — same receptor-classification cluster, different specific fact (domain count vs mechanism/timescale).",
  extra_notes={"weightConfidence":"Set low because this is a specific numeric figure from one department's own bank rather than a widely corroborated fact; recorded as taught, not independently verified against a standard textbook."},
  article_id="ART-FND-CELL-SIGNALING-RECEPTORS",
  claim_id_hint="CLM-FND-1D57FC5C8BFF90-01",
  resource_id_hint="src_4ff0b2fb099c99bb896e",
),
dict(
  id="CON-FND-D10E79C01B3345", key="signaling.camp.synthesis-and-degradation",
  label="Adenylate cyclase synthesises cAMP from ATP, and phosphodiesterase degrades cAMP back down, so the balance of the two enzymes sets the second messenger's level",
  aliases=["Adenylate cyclase","Phosphodiesterase","cAMP degradation"],
  arabic_label="تصنيع وتحلل الأدينوسين أحادي الفوسفات الحلقي",
  arabic_aliases=["الأدينيلات سيكلاز"],
  definition="cAMP, the second messenger of many GPCR pathways, is synthesised from ATP by adenylate cyclase and degraded to inactive 5'-AMP by phosphodiesterase. The intracellular cAMP level at any moment reflects the balance between these two opposing enzyme activities, not synthesis alone.",
  objective="Name the enzyme that makes cAMP and the enzyme that degrades it, and state that the signal's level depends on the balance of both.",
  pitfalls="Treating cAMP signalling as a one-way synthesis event and forgetting that phosphodiesterase actively terminates the signal — a rise in cAMP can result either from more synthesis or from less degradation.",
  concept_type="mechanism",
  primary_node_id="SYS-FND-T01-S02-M03", secondary=[],
  topic="Cell signalling", subtopic="Second messengers", microtopic="cAMP turnover",
  module_subject=["AU-MED-102 > Biochemistry > Cell Signaling > Second messengers"],
  exam_signal=["src_413115a28d7dc9914c91 | end_of_module | | long eom / foundation final egyptian paper (biochemistry section) q29"],
  bw=0.35, cr=0.3, ar=0.55, wc=0.45, conf=0.7,
  original=["Which of the following enzymes reverses the action of adenylate cyclase? a. phosphodiesterase"],
  related=["CON-FND-D6DFABFBA0BA5E"], rel_notes="related_concept_ids links to the pending nucleotide-six-jobs concept (Kasr 102-INT), which names cAMP's second-messenger role — this record is the synthesis/degradation mechanism behind that same role.",
  article_id="ART-FND-CELL-SIGNALING-RECEPTORS",
  claim_id_hint="CLM-FND-D10E79C01B3345-01",
  resource_id_hint="src_413115a28d7dc9914c91",
),
]

def block(title, body):
    return f"## {title}\n{body}\n\n"

def emit(c):
    out = "# Item\n\n"
    out += block("id", c["id"])
    out += block("label", c["label"])
    out += block("canonical_key", c["key"])
    out += block("aliases", "\n".join(c["aliases"]) if c["aliases"] else "")
    out += block("arabic_label", c["arabic_label"])
    out += block("arabic_aliases", "\n".join(c["arabic_aliases"]) if c["arabic_aliases"] else "")
    out += block("definition", c["definition"])
    out += block("explicit_objective", c["objective"])
    out += block("pitfalls", c["pitfalls"])
    out += block("concept_type", c["concept_type"])
    out += block("status", "under review")
    out += block("support_mode", "direct_statement")
    out += block("subject", "fnd")
    out += block("primary_node_id", c["primary_node_id"])
    out += block("secondary_node_ids", " | ".join(c["secondary"]) if c["secondary"] else "[clear]")
    out += block("topic", c["topic"])
    out += block("subtopic", c["subtopic"])
    out += block("microtopic", c["microtopic"])
    out += block("nanotopic", "")
    out += block("modules", "AU-MED-102")
    out += block("module_subject", "\n".join(c["module_subject"]))
    out += block("article_ids", c.get("article_id",""))
    sibling = {
        "ART-FND-DNA-REPLICATION-REPAIR-PCR": "ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
        "ART-FND-TRANSCRIPTION-CODE-TRANSLATION": "ART-FND-DNA-REPLICATION-REPAIR-PCR",
        "ART-FND-CELL-SIGNALING-RECEPTORS": "ART-FND-TRANSCRIPTION-CODE-TRANSLATION",
    }[c["article_id"]]
    out += block("related_article_ids", sibling)
    out += block("related_concept_ids", " | ".join(c["related"]) if c["related"] else "[clear]")
    out += block("resource_ids", c.get("resource_id_hint",""))
    out += block("approved_file_resource_ids", "")
    out += block("approved_video_resource_ids", "")
    out += block("learner_years", "1")
    out += block("universities", "au")
    out += block("blueprint_weight", str(c["bw"]))
    out += block("exam_weight_by_year", f"AU_Y1={c['bw']}")
    out += block("clinical_relevance", str(c["cr"]))
    out += block("academic_relevance", str(c["ar"]))
    out += block("weight_confidence", str(c["wc"]))
    out += block("confidence", str(c["conf"]))
    out += block("atomic_claim_ids", c.get("claim_id_hint",""))
    out += block("resource_occurrence_ids", "")
    out += block("source_candidate_ids", "")
    out += block("original_wording", "\n".join(c["original"]))
    out += block("merge_ids", "")
    out += block("rejected_merge_candidate_ids", "")
    out += block("conflicts", "")
    out += block("uncertainty", "")
    out += block("evidence_gaps", "Evidence must be attached before publication: this concept is authored ahead of sub-lane A's evidence/AU-MED-102-biochemistry-resources.md, so atomic_claim_ids/resource_ids point at the CLM-/CIT-/src_ ids this lane's own evidence file mints and cannot yet resolve against a live resource record (CLAIMS.md carries the Wanted row).")
    out += block("exam_signal", "\n".join(c["exam_signal"]))
    out += block("last_reviewed", "")
    out += block("review_due", "")
    out += block("owner", "Admin team")
    out += block("reviewer", "Medical team, Admin team")
    out += block("final_publisher", "Admin team")
    out += block("publication_status", "needs_evidence")
    out += block("editorial_review_status", "drafted_not_reviewed")
    out += block("exclusion_reason", "")
    notes = []
    notes.append(f"relationships: {c['rel_notes']}")
    notes.append("microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.")
    notes.append("nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.")
    notes.append("moduleIds: Placed under AU-MED-102 (Biochemistry) — see module_subject for the exact department position.")
    notes.append("approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.")
    notes.append("approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.")
    notes.append("resourceOccurrenceIds: Hand-authored from the AU-MED-102 Biochemistry question-led triage; this concept has no corpus pipeline-extraction record.")
    notes.append("sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for this idea's distinctive terms (>=4 queries) before minting; no existing record covers it (see this lane's report for the search transcript).")
    notes.append("lastReviewed: New record; it has not been reviewed yet.")
    notes.append("reviewDue: Set when the first review completes.")
    notes.append("mergeIds: No prior record has been folded into this one.")
    notes.append("rejectedMergeCandidateIds: No live or pending near-miss was found close enough to record as a rejected merge candidate.")
    notes.append("conflicts: No source disagreement found for this fact.")
    notes.append("uncertainty: None beyond the standard textbook-teaching level for a Year 1 fact.")
    notes.append("resourceIds: Deferred — sub-lane A owns the evidence-source record for the AU-MED-102 Biochemistry sources (Wanted row in CLAIMS.md); this concept's exam_signal already names the exact src_ id and question so the link can be completed once that file lands.")
    notes.append("atomicClaimIds: This lane's own evidence file (AU-MED-102-biochem-molecular-claims.md) mints the supporting claim for this concept, but the claim cannot resolve to a live/simulated resource until sub-lane A's evidence-source record for the cited src_ id lands (see CLAIMS.md Wanted row) — recorded per 02-concepts.md's second honest option (author the claim; publication follows once evidence resolves), not left blank.")
    if "extra_notes" in c:
        for k, v in c["extra_notes"].items():
            notes.append(f"{k}: {v}")
    out += block("field_notes", "\n".join(notes))
    return out

with open("/tmp/AU-MED-102-biochem-molecular-concepts.md", "w") as f:
    header = """<!--
  AU-MED-102 (Foundation of Basic Medical Sciences & Medical Terminology) ·
  Biochemistry, sub-lane D (molecular biology & cell signalling) — NEW concepts.

  Every ## id below was minted with tools/mint-concept-id.mjs (SYSTEM=FND), checked
  against live state and every unimported docs/*-Source-Imports concept batch first
  (>= 4 find-existing.mjs queries per idea, plus grep -ril <canonical_key> against
  every university's pending concept/ directory) per LANE-BRIEF.md SS10/SS16 -
  transcripts in this lane's scratch directory, summarised in its S8 report.

  26 of the 68 ideas this sub-lane owns (see coverage/AU-MED-102-biochemistry-triage.md
  SS9) are minted here; 7 more that hit an existing Kasr pending concept are sparse
  updates in pending-live/AU-MED-102-biochem-molecular.md instead, never here. The
  remaining ideas are mapped (target concept group + HIT/NEW decision already made)
  but not yet authored - see this lane's hand-over report for the list.

  atomic_claim_ids / resource_ids point at claim and citation ids this lane mints in
  its own evidence/AU-MED-102-biochem-molecular-*.md files. Those claims/citations
  name the correct src_... source ids (verified against corpus-source-index.json),
  but the *evidence-source* record for each of the 13 AU-MED-102 Biochemistry sources
  is owned by sub-lane A (evidence/AU-MED-102-biochemistry-resources.md) and does not
  exist yet - this lane references the ids rather than minting a resource, and has
  filed a Wanted row in CLAIMS.md. medical:audit will report these as an unresolved
  resource until that file lands; that is the documented cross-lane dependency, not a
  defect in this batch. See exam_signal on every record for the exact question this
  concept traces to.
-->

"""
    f.write(header)
    f.write("\n---\n\n".join(emit(c) for c in CONCEPTS))
print(f"Wrote {len(CONCEPTS)} concepts")
