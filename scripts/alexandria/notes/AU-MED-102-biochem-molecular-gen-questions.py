#!/usr/bin/env python3
"""MCQs for AU-MED-102 Biochemistry sub-lane D's 39 keyed, question-backed NEW
concepts (4 of the 43 stay unauthored as questions: CON-FND-5B8E3AAFEB6C35 and
CON-FND-CA2D65E688434A cite source items with an unresolved OCR '0' key,
CON-FND-A1FC2FAF9F0211 cites a printed-key gap, CON-FND-9D5D6275474035 cites the
source's own dual-answer disagreement — see LANE-BRIEF's decision procedure and
this lane's report). Every stem/option is the source's own wording."""

Q = []  # each: dict(concept, article, subject, topic, subtopic, stem, opts={a:..}, correct, expl={a:..}, src, section, difficulty)

def add(concept, article, topic, subtopic, stem, opts, correct, expl, src, section, diff="Moderate", qtype="Mechanism"):
    Q.append(dict(concept=concept, article=article, topic=topic, subtopic=subtopic, stem=stem, opts=opts,
                   correct=correct, expl=expl, src=src, section=section, diff=diff, qtype=qtype))

DNA_ART = "ART-FND-DNA-REPLICATION-REPAIR-PCR"
TRX_ART = "ART-FND-TRANSCRIPTION-CODE-TRANSLATION"
SIG_ART = "ART-FND-CELL-SIGNALING-RECEPTORS"
DNA_SRC = "src_80f6b1121bd3b85f8886"
EOM_SRC = "src_413115a28d7dc9914c91"
AFM_SRC = "src_01ab4268402d32d4d111"
SIG_SRC = "src_4ff0b2fb099c99bb896e"

add("CON-FND-92DD65D96E3FA1", DNA_ART, "Molecular biology", "Nucleotide metabolism",
    "What is the chief product of the catabolism of purines in human beings?",
    {"a":"Urea","b":"Uric acid","c":"Hypoxanthine","d":"Beta amino isobutyric acid"}, "b",
    {"a":"Urea is the end product of amino-acid nitrogen disposal via the urea cycle, a separate pathway from purine breakdown.",
     "b":"Correct. Humans lack uricase, the enzyme that would oxidise uric acid further in most other mammals. Adenine and guanine are degraded through hypoxanthine and xanthine, and the pathway stops at uric acid, which is excreted as such. This is why humans (uniquely among most mammals) can develop gout from excess uric acid — a downstream species has no equivalent build-up because uricase clears it further.",
     "c":"Hypoxanthine is a catabolic intermediate on the way to uric acid, not the final excreted product.",
     "d":"Beta-amino-isobutyric acid is a pyrimidine (thymine) catabolism product, not a purine one — a distractor testing whether the student confuses the two base classes' end products."},
    DNA_SRC, "DNA & RNA MCQ, Q1", "Easy")

add("CON-FND-7302601EA492D2", DNA_ART, "Molecular biology", "DNA replication",
    "Fidelity of DNA replication is ensured by:",
    {"a":"Complementary base pairing","b":"Specificity of DNA polymerase","c":"Recognition of a specific nucleotide sequence","d":"Formation of a phosphodiester bond"}, "a",
    {"a":"Correct. Complementary base pairing (A with T, G with C) is the first of replication's two independent fidelity checks: an incorrectly paired nucleotide is far less likely to be added in the first place, and any that is added is then caught by DNA polymerase's own proofreading exonuclease. Together these two mechanisms keep the replication error rate extremely low.",
     "b":"Specificity of DNA polymerase for correctly paired nucleotides is real and important, but on its own, without naming base pairing, it does not capture the mechanism this question is testing as the primary answer.",
     "c":"Recognition of a specific nucleotide sequence describes origin recognition, not the base-by-base fidelity check during elongation.",
     "d":"Phosphodiester bond formation is the chemistry that joins nucleotides together once they are correctly selected — it happens regardless of whether the base pairing was correct, so it does not itself ensure fidelity."},
    DNA_SRC, "DNA & RNA MCQ, Q2", "Moderate")

add("CON-FND-73C77966B56FED", DNA_ART, "Molecular biology", "DNA replication",
    "Which enzyme protects DNA from ageing?",
    {"a":"DNA polymerase","b":"Topoisomerase","c":"Deoxyribonuclease","d":"Telomerase"}, "d",
    {"a":"DNA polymerase synthesises new DNA strands during replication; it does not specifically compensate for the end-replication problem.",
     "b":"Topoisomerase relieves the supercoiling that unwinding creates ahead of the replication fork — a different problem from chromosome-end shortening.",
     "c":"Deoxyribonuclease degrades DNA; it plays no protective role against chromosome shortening.",
     "d":"Correct. Because a linear chromosome cannot be primed all the way to its very end, each round of replication loses a small amount of terminal sequence. Telomerase, a reverse transcriptase carrying its own RNA template, extends the telomeric repeats to offset this loss. This is why telomerase activity is described as protecting DNA from the shortening associated with cellular ageing."},
    DNA_SRC, "DNA & RNA MCQ, Q4", "Easy")

add("CON-FND-F1E54D68C8FAB0", TRX_ART, "Molecular biology", "Nucleic acid structure",
    "All of the following bases are found in mRNA, except:",
    {"a":"Adenine","b":"Guanine","c":"Uracil","d":"Thymine"}, "d",
    {"a":"Adenine is a purine base present in both DNA and RNA, including mRNA.",
     "b":"Guanine is a purine base present in both DNA and RNA, including mRNA.",
     "c":"Uracil is the pyrimidine base RNA uses in place of thymine, so it is present in mRNA.",
     "d":"Correct. Thymine is the base unique to DNA. RNA, including mRNA, substitutes uracil wherever DNA would carry thymine, so thymine itself is never found in mRNA."},
    DNA_SRC, "DNA & RNA MCQ, Q5", "Easy")

add("CON-FND-5FF8EB2DB4D662", TRX_ART, "Molecular biology", "Transcription",
    "The processing of mRNA does not involve:",
    {"a":"Capping at the 5' terminus","b":"Poly-A tail attachment","c":"Removal of introns","d":"Transfer of mRNA into the nucleus"}, "d",
    {"a":"5' capping is one of the three genuine steps of mRNA processing.",
     "b":"Poly-A tail attachment at the 3' end is one of the three genuine steps of mRNA processing.",
     "c":"Removal of introns by splicing is one of the three genuine steps of mRNA processing.",
     "d":"Correct. Transfer (export) of the mature mRNA out of the nucleus happens after processing is complete, as a separate transport step — it is not itself one of the processing steps, which are capping, polyadenylation and splicing. The exam trap is listing export as a fourth processing step; keep processing (cap, tail, splice) and export (a later, separate move) as two different things."},
    DNA_SRC, "DNA & RNA MCQ, Q7", "Moderate")

add("CON-FND-A1B0BFB9626438", TRX_ART, "Molecular biology", "The genetic code",
    "Which of the following is NOT true regarding the genetic code?",
    {"a":"Degenerate","b":"Ambiguous","c":"Non-overlapping","d":"Universal"}, "b",
    {"a":"Degeneracy (several codons specifying one amino acid) is a real, true property of the genetic code, so it is not the answer to a NOT-true question.",
     "b":"Correct. The genetic code is unambiguous, not ambiguous: a given codon specifies only one amino acid, never several. 'Ambiguous' is the property most easily confused with degeneracy, but the two describe opposite directions of the codon-to-amino-acid mapping, and only degeneracy is true of the code.",
     "c":"Non-overlapping (each nucleotide belongs to only one codon) is a real, true property of the genetic code.",
     "d":"Universality (nearly all organisms share the same code) is a real, true property of the genetic code."},
    DNA_SRC, "DNA & RNA MCQ, Q9", "Moderate")

add("CON-FND-E8CD7F7F690B14", DNA_ART, "Molecular biology", "DNA repair",
    "A 13-year-old boy suffers from ulceration and extreme sensitivity to sunlight. Which of the following enzymes has a defect?",
    {"a":"Endonuclease","b":"Exonuclease","c":"Topoisomerase","d":"DNA helicase"}, "a",
    {"a":"Correct. This is xeroderma pigmentosum, caused by a defect in nucleotide excision repair. The endonuclease step of that pathway is what excises the damaged, UV-lesioned stretch of DNA (such as a pyrimidine dimer) so it can be replaced; without it, UV damage accumulates, producing extreme sun sensitivity and skin changes.",
     "b":"Exonuclease activity is central to DNA polymerase's proofreading during replication, not to excising a bulky UV lesion from otherwise intact DNA.",
     "c":"A topoisomerase defect would affect relief of supercoiling during replication, not specifically UV-lesion repair, and does not produce this sunlight-sensitivity picture.",
     "d":"A helicase defect would affect strand unwinding during replication or transcription, not specifically the excision step that removes UV-induced lesions."},
    DNA_SRC, "DNA & RNA MCQ, Q81", "Moderate", qtype="Diagnosis")

add("CON-FND-8E4A3DB9BC03AC", DNA_ART, "Molecular biology", "DNA structure",
    "The order of nucleotides in a DNA strand is always written:",
    {"a":"From the 5' to 3' direction","b":"From the 3' to 5' direction","c":"Could be in either direction","d":"None of the above"}, "a",
    {"a":"Correct. By convention, a DNA (or RNA) sequence is always written 5' to 3', because the sugar-phosphate backbone has a genuine, fixed chemical polarity — a free 5'-phosphate at one end, a free 3'-hydroxyl at the other — not because of an arbitrary labelling choice. Remember this as a real physical asymmetry of the molecule, not a notational habit, so 'it could go either way' is never the right answer.",
     "b":"Writing 3' to 5' reverses the convention; sequences are read and written 5' to 3', matching the direction of synthesis and the backbone's own polarity.",
     "c":"'Either direction' is the option this question exists to catch: the backbone's polarity is a real physical asymmetry, so the direction is not a free choice.",
     "d":"A correct, specific answer exists (5' to 3'), so 'none of the above' is wrong."},
    DNA_SRC, "DNA & RNA MCQ, Q11", "Easy")

add("CON-FND-412F3EDF118F44", TRX_ART, "Molecular biology", "Transcription",
    "RNA polymerase I transcribes the genes of:",
    {"a":"mRNA","b":"tRNA","c":"5.8S, 18S, 28S rRNA","d":"5S rRNA and snRNA"}, "c",
    {"a":"mRNA (protein-coding genes) is transcribed by RNA polymerase II, not I.",
     "b":"tRNA genes are transcribed by RNA polymerase III, not I.",
     "c":"Correct. RNA polymerase I is dedicated to transcribing the genes for the large ribosomal RNAs — 5.8S, 18S and 28S rRNA. Keep the three polymerases straight by their product, not their number: I makes the big rRNAs, II makes mRNA, III makes tRNA plus 5S rRNA and snRNA.",
     "d":"5S rRNA and the small nuclear RNAs are transcribed by RNA polymerase III, not I."},
    DNA_SRC, "DNA & RNA MCQ, Q14", "Moderate", qtype="Classification")

add("CON-FND-DF5E3014A149FC", TRX_ART, "Molecular biology", "Mutation",
    "Which of the following is a transition-type point mutation?",
    {"a":"Adenine is replaced by cytosine","b":"Uracil is replaced by adenine","c":"Guanine is replaced by adenine","d":"Guanine is replaced by uracil"}, "c",
    {"a":"Adenine (purine) replaced by cytosine (pyrimidine) is a purine-to-pyrimidine swap — a transversion, not a transition.",
     "b":"Uracil (pyrimidine) replaced by adenine (purine) is a pyrimidine-to-purine swap — a transversion, not a transition.",
     "c":"Correct. Guanine and adenine are both purines, so replacing one with the other is a purine-to-purine substitution — the definition of a transition. The memory hook is same-class-for-same-class: purine-for-purine or pyrimidine-for-pyrimidine is a transition, anything crossing the two classes is a transversion.",
     "d":"Guanine (purine) replaced by uracil (pyrimidine) is a purine-to-pyrimidine swap — a transversion, not a transition."},
    DNA_SRC, "DNA & RNA MCQ, Q16", "Moderate", qtype="Classification")

add("CON-FND-914D9DDFB56AD1", DNA_ART, "Molecular biology", "Nucleotide structure",
    "A nucleotide is converted into a nucleoside by removal of:",
    {"a":"Purine base","b":"Pyrimidine base","c":"Phosphorus","d":"Phosphate"}, "d",
    {"a":"Removing the base leaves an abasic sugar-phosphate, not a nucleoside — a nucleoside still has its base.",
     "b":"Removing the base leaves an abasic sugar-phosphate, not a nucleoside — a nucleoside still has its base.",
     "c":"'Phosphorus' names the element rather than the leaving group; the option the bank is testing against is the phosphate group specifically.",
     "d":"Correct. A nucleotide is a base-sugar (nucleoside) joined to one or more phosphate groups. Removing the phosphate group — and only the phosphate group — leaves the nucleoside."},
    DNA_SRC, "DNA & RNA MCQ, Q19", "Easy")

add("CON-FND-09FACBDCBBF8FD", TRX_ART, "Molecular biology", "Translation",
    "Which of the following is the mRNA start codon in most cases?",
    {"a":"UAA","b":"AGU","c":"AUG","d":"UGA"}, "c",
    {"a":"UAA is one of the three stop codons, not the start codon.",
     "b":"AGU codes for serine; it is not a start codon.",
     "c":"Correct. AUG is the start codon in the overwhelming majority of mRNAs, and it is recognised by a methionyl-initiator-tRNA complex that assembles at the start of translation. Hold onto AUG as both a start signal and a methionine codon — the same triplet does both jobs, which is why the first residue of a nascent chain is always methionine before any processing removes it.",
     "d":"UGA is one of the three stop codons, not the start codon."},
    DNA_SRC, "DNA & RNA MCQ, Q26", "Easy")

add("CON-FND-D717E6E7EEA466", TRX_ART, "Molecular biology", "Transcription",
    "The coding strand of DNA is the same as the associated mRNA except for:",
    {"a":"mRNA uses U instead of T","b":"mRNA uses T instead of U","c":"mRNA uses G instead of C","d":"mRNA uses C instead of G"}, "a",
    {"a":"Correct. The coding (sense) strand matches the mRNA sequence base for base, with the one systematic substitution that mRNA carries uracil everywhere the coding strand carries thymine. The one fact worth keeping is that RNA polymerase actually transcribes the other (template) strand, even though the coding strand is the one that reads like the mRNA.",
     "b":"This reverses the actual substitution — DNA has thymine, mRNA has uracil, not the other way round.",
     "c":"Guanine and cytosine identity is not what differs between the coding strand and mRNA; only the thymine/uracil substitution differs.",
     "d":"Guanine and cytosine identity is not what differs between the coding strand and mRNA; only the thymine/uracil substitution differs."},
    DNA_SRC, "DNA & RNA MCQ, Q30", "Moderate")

add("CON-FND-906B844C9AEE7D", TRX_ART, "Molecular biology", "Translation",
    "The anticodon is a set of three nucleotides on the 3'-end of ...., which corresponds to the codon on the .........",
    {"a":"tRNA; mRNA","b":"mRNA; tRNA","c":"tRNA; rRNA","d":"rRNA; tRNA"}, "a",
    {"a":"Correct. The anticodon is carried by tRNA and base-pairs, antiparallel, with the complementary codon on mRNA — this pairing positions the correct amino acid at the correct place in the growing polypeptide. A simple way to keep the direction straight: the codon is always on the message (mRNA), the anticodon is always on the carrier (tRNA) that reads it.",
     "b":"This reverses which molecule carries the codon and which carries the anticodon — the codon is always the mRNA triplet.",
     "c":"rRNA is not the molecule the anticodon pairs with; the pairing partner is mRNA's codon.",
     "d":"Neither the anticodon nor the codon is carried by rRNA in this pairing; the pairing is specifically tRNA anticodon with mRNA codon."},
    DNA_SRC, "DNA & RNA MCQ, Q31", "Moderate")

add("CON-FND-FFEE58EC9C0784", DNA_ART, "Molecular biology", "DNA replication",
    "Which of the following relieves the supercoil on the parental duplex of DNA caused by unwinding during synthesis?",
    {"a":"DNA polymerase","b":"Helicase","c":"DNA ligase","d":"Topoisomerase"}, "d",
    {"a":"DNA polymerase synthesises new strands; it does not relieve torsional strain ahead of the fork.",
     "b":"Helicase is what unwinds the duplex in the first place, creating the supercoiling problem — it does not relieve it.",
     "c":"DNA ligase seals nicks between already-synthesised Okazaki fragments; it plays no role in relieving supercoiling.",
     "d":"Correct. Topoisomerase relieves the over-winding (supercoiling) that builds up ahead of the fork as helicase unwinds the duplex, by transiently cutting one or both strands, letting the DNA rotate, and resealing the break. Keep helicase (creates the problem by unwinding) and topoisomerase (solves the problem by relieving strain) as two different, sequential roles at the fork."},
    DNA_SRC, "DNA & RNA MCQ, Q35", "Moderate")

add("CON-FND-31C41EFEF31740", DNA_ART, "Molecular biology", "DNA structure",
    "If the cytosine content of DNA is 20% of the total bases, the adenine content will be:",
    {"a":"10%","b":"20%","c":"30%","d":"40%","e":"50%"}, "c",
    {"a":"10% does not satisfy Chargaff's rule given the other base percentages implied by 20% cytosine.",
     "b":"20% would make adenine equal to cytosine, which Chargaff's rule does not require (it requires A=T and G=C, not A=C).",
     "c":"Correct. By Chargaff's rule, %G=%C, so guanine is also 20%, leaving 60% for A+T combined; because %A=%T, each is 30%. The rule only ever gives two independent numbers to work from — once you know one base's percentage in double-stranded DNA, all four follow.",
     "d":"40% overstates adenine's share once G=C=20% and A=T are correctly split from the remaining 60%.",
     "e":"50% would only be correct if cytosine (and guanine) were 0%, which contradicts the given 20% cytosine content."},
    DNA_SRC, "DNA & RNA MCQ, Q41", "Hard", qtype="Mechanism")

add("CON-FND-DB1988D55A69E3", DNA_ART, "Molecular biology", "Recombinant DNA techniques",
    "PCR requires:",
    {"a":"Two types of DNA primers","b":"Thermostable DNA polymerase","c":"All 4 ribonucleoside triphosphates","d":"A and B"}, "d",
    {"a":"Two primers flanking the target sequence are required, but this alone omits the polymerase requirement, so it is not the most complete correct answer.",
     "b":"A thermostable DNA polymerase able to survive repeated heating cycles is required, but this alone omits the primer requirement.",
     "c":"PCR uses deoxyribonucleoside triphosphates (dNTPs) to build DNA, not ribonucleoside triphosphates — this option names the wrong building block.",
     "d":"Correct. PCR requires both two sequence-specific primers flanking the target and a thermostable DNA polymerase able to survive the repeated heating cycles of an automated thermocycler; naming both together is the complete answer among these options. The detail worth keeping is why the polymerase must be heat-stable: an ordinary DNA polymerase would denature on the very first heating step of the cycle."},
    DNA_SRC, "DNA & RNA MCQ, Q45", "Moderate", qtype="Investigation")

add("CON-FND-8C5B1666F4F7C1", SIG_ART, "Cell signalling", "Post-translational regulation",
    "Phosphorylation of a protein:",
    {"a":"Increases a protein's activity","b":"Decreases a protein's activity","c":"Either increases or decreases a protein's activity","d":"Has no effect"}, "c",
    {"a":"Phosphorylation increases activity for some proteins, but stating this as a universal rule misses that the effect is protein-dependent.",
     "b":"Phosphorylation decreases activity for some proteins, but stating this as a universal rule misses that the effect is protein-dependent.",
     "c":"Correct. Phosphorylation of a protein's serine, threonine or tyrosine residues is a reversible regulatory switch whose direction of effect — activating or inactivating — depends on the specific protein, not on phosphorylation itself. The point to hold onto is that phosphorylation is reversible (a phosphatase can remove the phosphate again), so it functions as a switch, not a one-way commitment.",
     "d":"Phosphorylation is one of the most common and consequential post-translational regulatory events; it is not inert."},
    SIG_SRC, "Cell Signaling MCQ, Q2", "Moderate")

add("CON-FND-13FCDB652CB258", SIG_ART, "Cell signalling", "Hormone action",
    "What defines a cell as a target for a certain hormone?",
    {"a":"It is a neighbour cell to the secreting cell","b":"It has signalling molecules","c":"It has a receptor specific to the hormone","d":"It is a cell distant to the secreting cell"}, "c",
    {"a":"Physical proximity to the secreting cell is neither necessary nor sufficient for target status — a nearby cell without the matching receptor cannot respond.",
     "b":"Having 'signalling molecules' is vague and does not capture what makes a cell able to receive a specific hormone's signal.",
     "c":"Correct. A cell is a target for a hormone because it expresses a receptor specific to that hormone — receptor expression, not distance, is what defines target status. The distinction worth keeping is that a distant cell with the receptor is a target and a nearby cell without it is not — proximity is not the deciding factor.",
     "d":"Distance from the secreting cell is not what defines a target cell either; a distant cell with the matching receptor is a target, and a nearby cell without it is not."},
    SIG_SRC, "Cell Signaling MCQ, Q5", "Easy")

add("CON-FND-22F8C729D1E8B0", SIG_ART, "Cell signalling", "Signalling classification",
    "Which type of signalling is the transmission of a nerve impulse through the synaptic cleft?",
    {"a":"Endocrine","b":"Paracrine","c":"Autocrine","d":"Direct contact"}, "b",
    {"a":"Endocrine signalling travels through the bloodstream to reach distant target cells, unlike a synapse's local, short-range transmission.",
     "b":"Correct. This question bank classifies synaptic transmission as paracrine signalling: the neurotransmitter crosses the synaptic cleft to act on a nearby (adjacent) cell, matching the 'nearby cell' criterion that defines paracrine range. Keep the distance criterion as the sorting rule for these categories: autocrine (self), paracrine (neighbour, including this synaptic example), endocrine (bloodstream, distant).",
     "c":"Autocrine signalling acts back on the same cell that released the signal; a synapse acts on a different (post-synaptic) cell.",
     "d":"Direct contact signalling requires physical membrane-to-membrane contact between cells, which is not how a chemical synapse operates — a neurotransmitter diffuses across a cleft."},
    SIG_SRC, "Cell Signaling MCQ, Q7", "Moderate")

add("CON-FND-1D57FC5C8BFF90", SIG_ART, "Cell signalling", "Receptor structure",
    "The number of domains in a typical intracellular receptor is:",
    {"a":"1","b":"2","c":"3","d":"4"}, "b",
    {"a":"One domain understates the structure this department's teaching gives for a typical intracellular receptor.",
     "b":"Correct. This department's own teaching gives a typical intracellular (nuclear/steroid-type) receptor about two domains, fewer than the domain count given for a typical cell-membrane receptor. Treat this as this department's own taught figure rather than a universal constant — real receptor domain counts vary a great deal by family.",
     "c":"Three domains is the figure given for a typical cell-membrane receptor in this same teaching, not the intracellular receptor.",
     "d":"Four domains overstates the figure given for either receptor type in this department's teaching."},
    SIG_SRC, "Cell Signaling MCQ, Q13", "Easy")

add("CON-FND-D10E79C01B3345", SIG_ART, "Cell signalling", "Second messengers",
    "Which of the following enzymes reverses the action of adenylate cyclase?",
    {"a":"Phosphodiesterase","b":"Phospholipase","c":"Protein kinase A","d":"GTPase"}, "a",
    {"a":"Correct. Adenylate cyclase synthesises cAMP from ATP; phosphodiesterase degrades cAMP back to inactive 5'-AMP, directly reversing adenylate cyclase's product. The intracellular cAMP level reflects the balance of these two opposing activities.",
     "b":"Phospholipase acts on membrane phospholipids (for example generating diacylglycerol and IP3 in a different second-messenger pathway); it does not degrade cAMP.",
     "c":"Protein kinase A is activated by cAMP downstream of its synthesis; it does not degrade cAMP itself.",
     "d":"A GTPase acts on G-protein-bound GTP, terminating that part of the signalling cascade, but it does not degrade cAMP."},
    EOM_SRC, "Long EOM / Foundation Final Egyptian paper (biochemistry section), Q29", "Moderate")

add("CON-FND-22D1D9B77A768E", DNA_ART, "Molecular biology", "Nucleotide structure",
    "Cytosine is characterised by all of the following, EXCEPT:",
    {"a":"Pyrimidine base","b":"Present in DNA and RNA","c":"2-oxy-4-amino pyrimidine","d":"2-oxy-6-amino pyrimidine"}, "d",
    {"a":"Cytosine genuinely is a pyrimidine base, so this is a true statement, not the exception.",
     "b":"Cytosine genuinely is present in both DNA and RNA (unlike thymine or uracil), so this is a true statement, not the exception.",
     "c":"Cytosine genuinely is the 2-oxy-4-amino derivative of pyrimidine, so this is a true statement, not the exception.",
     "d":"Correct. Cytosine is 2-oxy-4-amino pyrimidine, not 2-oxy-6-amino pyrimidine — the '6' misstates cytosine's actual chemical structure, making this the false statement the question asks for. The detail worth keeping is the '4', not the '6' — a single-digit swap is exactly the kind of distractor this question bank favours."},
    DNA_SRC, "DNA & RNA MCQ, Q20", "Hard")

add("CON-FND-38857DFD506559", TRX_ART, "Molecular biology", "Translation",
    "What causes peptidyl transferase to hydrolyse the bond between the peptide chain and tRNA, terminating translation?",
    {"a":"tRNA anticodon","b":"mRNA codon","c":"tRNA stop codon","d":"Releasing factors"}, "d",
    {"a":"A tRNA anticodon pairs with a sense codon during elongation; there is no tRNA anticodon for a stop codon.",
     "b":"The mRNA codon at that position is a stop codon, but it is not itself what triggers hydrolysis — no tRNA recognises it, which is the actual trigger.",
     "c":"There is no such thing as a 'tRNA stop codon' — tRNAs carry anticodons for amino acids, and no tRNA exists that reads a stop codon.",
     "d":"Correct. When a stop codon reaches the ribosomal A site, no aminoacyl-tRNA recognises it; a release factor binds instead, and this triggers peptidyl transferase (on the 60S ribosomal subunit) to hydrolyse the bond linking the finished polypeptide to its tRNA. The thing to remember is that no tRNA ever reads a stop codon — a release factor substitutes for one, and that substitution is the trigger."},
    DNA_SRC, "DNA & RNA MCQ, Q34", "Moderate")

add("CON-FND-FE41A702648A00", TRX_ART, "Molecular biology", "Transcription",
    "Which of the following eukaryotic DNA control sequences does not need to be in a fixed location, and is most responsible for high rates of transcription of particular genes?",
    {"a":"Promoter","b":"Promoter-proximal element","c":"Enhancer","d":"Basal expression element"}, "c",
    {"a":"A promoter must occupy a fixed position (where RNA polymerase binds) relative to the gene it serves.",
     "b":"A promoter-proximal element, as its name states, sits near the promoter in a relatively fixed relationship, not free to move.",
     "c":"Correct. An enhancer is the DNA control sequence that does not need to be in a fixed location relative to the gene it regulates, and it is the element most responsible for driving high transcription rates of particular genes. Keep promoter (fixed position, where polymerase binds) and enhancer (flexible position, boosts the rate) as two clearly different jobs.",
     "d":"'Basal expression element' is not the location-independent, transcription-boosting element this bank is testing for — the enhancer is."},
    AFM_SRC, "AFM master bank, Molecular Biology section, Q37", "Moderate", qtype="Classification")

add("CON-FND-874F418DFB12AF", DNA_ART, "Molecular biology", "DNA replication",
    "What is the most important condition for the formation of single-stranded DNA from RNA?",
    {"a":"The RNA strand must contain 2'-deoxyribose","b":"The RNA strand must have a high content of G and C","c":"A primer must be present","d":"A reverse transcriptase must be present"}, "d",
    {"a":"RNA contains ribose, not 2'-deoxyribose; this option misstates RNA's own sugar and is not the condition being tested.",
     "b":"Base composition (G/C content) is not what enables DNA synthesis from an RNA template; the enzyme requirement is.",
     "c":"A primer is required for ordinary DNA-templated DNA synthesis, but the question is specifically asking what makes synthesis from an RNA template possible at all — that is the enzyme, not the primer.",
     "d":"Correct. Making single-stranded DNA from an RNA template requires reverse transcriptase, an RNA-dependent DNA polymerase; without it, RNA cannot be converted back into DNA. The detail worth keeping is the direction this enzyme reverses: ordinary polymerases are DNA-dependent, this one is uniquely RNA-dependent."},
    DNA_SRC, "DNA & RNA MCQ, Q38", "Moderate")

add("CON-FND-21B283A2FE53C4", DNA_ART, "Molecular biology", "Mutation",
    "Deamination of cytosine, if not repaired, produces:",
    {"a":"An insertion mutation","b":"A deletion mutation","c":"A point mutation","d":"A purine"}, "c",
    {"a":"Deamination changes one base's chemical identity in place; it does not add a base, so it is not an insertion.",
     "b":"Deamination changes one base's chemical identity in place; it does not remove a base, so it is not a deletion.",
     "c":"Correct. Cytosine deamination converts cytosine to uracil, which — if unrepaired before the next replication — pairs with adenine instead of guanine, converting the original base pair. This single-base substitution is a point mutation.",
     "d":"Deamination converts a pyrimidine (cytosine) into another pyrimidine-like base (uracil), not into a purine."},
    DNA_SRC, "DNA & RNA MCQ, Q39", "Moderate")

add("CON-FND-55348CAA8F9C16", DNA_ART, "Molecular biology", "DNA replication",
    "Which of the following proteins can introduce positive supercoils into DNA?",
    {"a":"Primosome","b":"DNA ligase","c":"Helicase","d":"Single-strand-binding protein"}, "a",
    {"a":"Correct. This question bank credits the primosome — the helicase-primase complex that unwinds DNA while laying down RNA primers — with introducing positive supercoiling into the DNA ahead of the advancing fork, which topoisomerase then relieves. Keep the primosome (creates the supercoiling problem) and topoisomerase (solves it) as paired opposites at the fork.",
     "b":"DNA ligase seals nicks between Okazaki fragments; it has no role in generating supercoiling.",
     "c":"Helicase alone is not the option this bank keys for introducing positive supercoils — it credits the composite primosome unit instead.",
     "d":"Single-strand-binding protein keeps separated strands apart; it does not introduce supercoiling."},
    DNA_SRC, "DNA & RNA MCQ, Q40", "Hard")

add("CON-FND-FE0A89860189A5", TRX_ART, "Molecular biology", "Transcription",
    "What is a foundational feature of RNA polymerase?",
    {"a":"It requires primers","b":"It uses nucleoside diphosphates","c":"It can add nucleotides at both ends of the chain","d":"It adds nucleotides at the 3' end of the growing polynucleotide chain"}, "d",
    {"a":"Unlike DNA polymerase, RNA polymerase does not require a primer — it can initiate synthesis de novo.",
     "b":"RNA polymerase uses nucleoside triphosphates (releasing pyrophosphate), not diphosphates, as its substrate.",
     "c":"RNA polymerase extends the chain in only one direction, not both ends simultaneously.",
     "d":"Correct. RNA polymerase adds nucleotides only at the 3' end of the growing RNA chain, the same directionality DNA polymerase uses, even though RNA polymerase needs no primer to start. The detail worth keeping is the contrast with DNA polymerase: same 3' addition direction, but no primer requirement."},
    DNA_SRC, "DNA & RNA MCQ, Q58", "Moderate")

add("CON-FND-6EF5C044E64C46", DNA_ART, "Molecular biology", "DNA replication",
    "Single-strand binding protein binds to single-stranded DNA:",
    {"a":"To keep the two strands from binding together","b":"To break hydrogen bonds between complementary base pairs","c":"To cut supercoils caused by the helicase enzyme","d":"To identify the origin of replication"}, "a",
    {"a":"Correct. Once helicase separates the two DNA strands at the fork, single-strand binding protein coats them to keep them apart, preventing them from re-annealing before they are used as templates. Keep single-strand binding protein's one job — keeping the strands apart — separate from helicase's job of separating them in the first place.",
     "b":"Breaking the hydrogen bonds between base pairs is helicase's job, which happens before single-strand binding protein coats the separated strands.",
     "c":"Cutting supercoils is topoisomerase's job, not single-strand binding protein's.",
     "d":"Identifying the origin of replication is the role of origin-recognition proteins, not single-strand binding protein, which acts after the strands are already separated."},
    DNA_SRC, "DNA & RNA MCQ, Q82", "Moderate")

add("CON-FND-7CEF0F2F8C9EE1", TRX_ART, "Molecular biology", "Mutation",
    "What is the type of mutation when a deletion or insertion of bases occurs?",
    {"a":"Point mutation","b":"Frame shift mutation","c":"All of the above","d":"None of the above"}, "b",
    {"a":"A point mutation is a single-base substitution; it does not describe adding or removing bases.",
     "b":"Correct. Inserting or deleting bases (not a multiple of three) shifts the ribosome's reading frame for every downstream codon — a frameshift mutation, a far more disruptive event than a single substitution. The thing to remember is scale: a point substitution changes one codon, a frameshift changes every codon after it.",
     "c":"Point mutation and frameshift mutation are distinct categories describing different kinds of change; they are not both correct together.",
     "d":"A correct, specific answer (frameshift mutation) exists, so 'none of the above' is wrong."},
    DNA_SRC, "DNA & RNA MCQ, Q86", "Easy", qtype="Classification")

add("CON-FND-60F505DFC88026", TRX_ART, "Molecular biology", "Translation",
    "Translocation is the process where ....... moves in order to place the tRNA carrying the growing polypeptide chain in ...... site, thereby freeing ........ site.",
    {"a":"mRNA - A - P","b":"Ribosome - P - A","c":"tRNA - P - A","d":"Ribosome - A - P"}, "b",
    {"a":"mRNA does not itself relocate the tRNA between sites; the ribosome moves relative to the fixed mRNA-tRNA pairing.",
     "b":"Correct. The ribosome is what moves during translocation, shifting the peptide-bearing tRNA from the A site into the P site and thereby freeing the A site for the next aminoacyl-tRNA. Keep the direction fixed in memory as A-to-P, never P-to-A, for the tRNA carrying the growing chain.",
     "c":"The tRNA is what is relocated, not the entity doing the moving described by the first blank in this stem.",
     "d":"This reverses the site direction — the peptide-bearing tRNA moves from A to P, not P to A, so the sites in this option are in the wrong order relative to the correct one."},
    DNA_SRC, "DNA & RNA MCQ, Q66", "Hard")

add("CON-FND-B92EB41248D631", TRX_ART, "Molecular biology", "Translation",
    "eIF-1 and eIF-3 in protein synthesis are required:",
    {"a":"For binding of aminoacyl-tRNA to the 40S ribosomal subunit","b":"For binding of mRNA to the 40S ribosomal subunit","c":"For binding of the 60S subunit to the 40S subunit","d":"To prevent binding of the 60S subunit to the 40S subunit"}, "b",
    {"a":"Aminoacyl-tRNA binding is mediated by other initiation/elongation factors, not specifically by eIF-1/eIF-3's named role here.",
     "b":"Correct. eIF-1 and eIF-3 are required specifically for binding mRNA to the 40S ribosomal subunit, an early step of translation initiation distinct from 60S-subunit joining. The detail worth keeping is that this is specifically an mRNA-binding step, not the later 60S-joining step other factors handle.",
     "c":"60S-to-40S subunit joining is a later initiation step, handled by other factors, not the specific role tested for eIF-1/eIF-3 here.",
     "d":"eIF-1/eIF-3 do not function to block 60S joining; their tested role is enabling mRNA binding to the 40S subunit."},
    DNA_SRC, "DNA & RNA MCQ, Q69", "Hard")

add("CON-FND-D6A7B168134B07", TRX_ART, "Molecular biology", "Translation",
    "Which of the following antibiotics prevents tRNA from attaching to the A site of the ribosome?",
    {"a":"Chloramphenicol","b":"Tetracycline","c":"Streptomycin","d":"Erythromycin"}, "b",
    {"a":"Chloramphenicol inhibits peptidyl transferase activity, a different step from A-site tRNA attachment.",
     "b":"Correct. Tetracycline blocks bacterial protein synthesis by preventing aminoacyl-tRNA from attaching at the ribosomal A site. Keep tetracycline's A-site block distinct from chloramphenicol's peptidyl-transferase block and erythromycin's translocation block — three antibiotics, three different steps.",
     "c":"Streptomycin causes misreading of the genetic code at the 30S subunit, a different mechanism from blocking A-site attachment.",
     "d":"Erythromycin blocks translocation, a different step from A-site tRNA attachment."},
    DNA_SRC, "DNA & RNA MCQ, Q70", "Moderate", qtype="Pharmacology")

add("CON-FND-36FA9827A6B99C", DNA_ART, "Molecular biology", "DNA repair",
    "What is the mechanism that will remove uracil and incorporate the correct base?",
    {"a":"Direct repair","b":"Base excision repair","c":"Nucleotide excision repair","d":"Mismatch repair"}, "b",
    {"a":"Direct repair reverses specific chemical lesions (such as certain alkylation damage) in place, without excising a base — it is not the pathway that removes uracil.",
     "b":"Correct. Base excision repair removes a single damaged or inappropriate base — such as the uracil produced by cytosine deamination — via a glycosylase, then fills in the correct base. Keep the three repair pathways sorted by trigger: base excision for one damaged base, nucleotide excision for a bulky lesion, mismatch repair for a replication error.",
     "c":"Nucleotide excision repair removes a bulky, helix-distorting lesion such as a UV pyrimidine dimer, not a single inappropriate base like uracil.",
     "d":"Mismatch repair corrects a replication error (a mispaired but chemically normal base) that escaped proofreading, not a chemically damaged base like uracil."},
    DNA_SRC, "DNA & RNA MCQ, Q76", "Moderate", qtype="Classification")

add("CON-FND-014D200ED96498", DNA_ART, "Molecular biology", "DNA replication",
    "A patient had an acute bacterial infection and was given ciprofloxacin, which cured him. What is the effect of ciprofloxacin?",
    {"a":"Inhibitor of DNA polymerase","b":"Inhibitor of topoisomerase","c":"Inhibits the translocation reaction","d":"Inhibits initiation of protein synthesis"}, "b",
    {"a":"Ciprofloxacin does not target DNA polymerase; its target is a different replication enzyme.",
     "b":"Correct. Ciprofloxacin, a fluoroquinolone, inhibits bacterial DNA gyrase — a bacterial topoisomerase that relieves supercoiling ahead of the replication fork — blocking bacterial DNA replication and growth. The detail worth keeping is that DNA gyrase is specifically a topoisomerase, linking this drug's mechanism directly back to the replication-fork concept above.",
     "c":"Translocation is a ribosomal, translation-level step; ciprofloxacin's target is DNA replication machinery, not the ribosome.",
     "d":"Initiation of protein synthesis is unrelated to ciprofloxacin's mechanism, which acts on DNA replication, not translation."},
    EOM_SRC, "Long EOM / Foundation Final Egyptian paper (biochemistry section), Q24", "Moderate", qtype="Pharmacology")

add("CON-FND-32433CE637CA9A", TRX_ART, "Molecular biology", "Transcription",
    "What is the main function of RNA editing?",
    {"a":"Synthesis of the same protein from different genes","b":"Synthesis of a different protein from the same gene","c":"Removal of introns from mRNA","d":"Different splicing of mRNA"}, "b",
    {"a":"RNA editing changes a transcript's own sequence; it does not describe making one identical protein from separate genes.",
     "b":"Correct. RNA editing changes the sequence of an already-transcribed mRNA (for example introducing a premature stop codon), so a different protein is made from the same gene than would otherwise be translated — the clearest example being apoB-48 versus apoB-100 from the same gene. Keep RNA editing (changes a base in the transcript) distinct from alternative splicing (changes which exons are joined) — two different post-transcriptional mechanisms.",
     "c":"Removing introns is splicing, a distinct mechanism from RNA editing.",
     "d":"Alternative splicing changes which exons are joined; RNA editing changes a base within the transcript itself, which is the distinction this question tests."},
    EOM_SRC, "Long EOM / Foundation Final Egyptian paper (biochemistry section), Q92", "Hard")

add("CON-FND-A427EA66958B81", TRX_ART, "Molecular biology", "Transcription",
    "According to the regulation of gene expression, which of the following explains why mature red blood cells cannot form mRNA?",
    {"a":"RNA editing","b":"Alternative splicing","c":"Gene loss","d":"Translational regulation"}, "c",
    {"a":"RNA editing changes an existing transcript's sequence; it does not explain a total inability to transcribe at all.",
     "b":"Alternative splicing changes which exons a still-nucleated cell joins; it does not apply once the nucleus itself is gone.",
     "c":"Correct. During erythropoiesis the maturing red blood cell expels its nucleus. With no nucleus, there is no DNA template left to transcribe, so gene loss (of the whole nucleus) is why a mature red cell cannot make new mRNA.",
     "d":"Translational regulation controls how existing mRNA is used to make protein; it does not explain an inability to transcribe new mRNA in the first place."},
    EOM_SRC, "Long EOM / Foundation Final Egyptian paper (biochemistry section), Q27", "Moderate", qtype="Mechanism")


def block(title, body):
    return f"## {title}\n{body}\n\n"

def emit(q, n):
    letters = list(q["opts"].keys())
    out = "# Item\n\n"
    qid = f"QST-FND-{q['concept'].split('-')[-1]}-{n:02d}"
    out += block("id", qid)
    out += block("title", q["stem"])
    out += block("question", q["stem"])
    out += block("subject", "fnd")
    out += block("status", "Draft")
    out += block("owner", "Admin team")
    out += block("vignette", "")
    out += block("correct_answer", q["correct"].upper())
    for L in "abcdef":
        out += block(f"answer_{L}", q["opts"].get(L, ""))
        out += block(f"explanation_{L}", q["expl"].get(L, "") if L in q["opts"] else "")
    out += block("topic", q["topic"])
    out += block("subtopic", q["subtopic"])
    out += block("main_concept", q["concept"])
    out += block("concept_ids", "[clear]")
    out += block("contextual_concept_ids", "[clear]")
    out += block("difficulty", q["diff"])
    out += block("question_type", q["qtype"])
    out += block("cognitive_effort", "Medium")
    out += block("cognitive_effort_score", "0.5")
    out += block("setting", "Academic")
    out += block("reasoning_level", "2")
    out += block("inferred_difficulty", "55")
    out += block("exam_relevance", "6")
    out += block("clinical_relevance", "0.3")
    out += block("academic_relevance", "0.7")
    out += block("exam_weight_by_year", "AU_Y1=0.4")
    out += block("years", "AU_Y1")
    out += block("universities", "au")
    out += block("module", "AU-MED-102")
    out += block("question_only_for", "")
    out += block("library_ids", q["article"])
    out += block("resource_ids", q["src"])
    out += block("learning_objective", f"Answer correctly to demonstrate the objective of {q['concept']} (see the concept record).")
    out += block("source_citation", f"AU-MED-102 Biochemistry, {q['section']}.")
    out += block("attached_image", "")
    out += block("attachments", "[clear]")
    out += block("media_recommendations", "")
    out += block("estimated_seconds", "70")
    out += block("randomise_answers", "yes")
    out += block("author_notes", "Stem and options are the source's own wording, corroborated against the AFM master bank where noted; explanations authored to teach the mechanism, not just mark the key.")
    return out

header = """<!--
  AU-MED-102 (Foundation of Basic Medical Sciences & Medical Terminology) ·
  Biochemistry, sub-lane D (molecular biology & cell signalling) — MCQs for the
  keyed, question-backed NEW concepts in concept/AU-MED-102-biochem-molecular-concepts.md.

  4 of the 43 NEW concepts have NO question here: CON-FND-5B8E3AAFEB6C35 (Q13,
  garbled '0' key) and CON-FND-CA2D65E688434A (Q25, garbled '0' key) cite an
  unresolved OCR key; CON-FND-A1FC2FAF9F0211 cites Protein-Chemistry-bank Q74,
  whose printed key list ends at Q73 (no key at all); CON-FND-9D5D6275474035
  cites Q64, which the source itself marks "A or D" with a disagreeing marginal
  note. Per LANE-BRIEF's "Recovering an answer key" decision procedure and the
  triage's own precedent, none of the four is authored as a question this pass.
  E29 (translation initiation, Met-tRNA) needs no separate question: its source
  item (DNA & RNA MCQ Q33) tests the same fact QST-FND-09FACBDCBBF8FD-01 already
  covers (CON-FND-09FACBDCBBF8FD's own explicit_objective names both facts).

  Questions on this lane's 7 HIT-PENDING concepts (pending-live/AU-MED-102-biochem-
  molecular.md) are authored separately in pending-live/AU-MED-102-biochem-molecular-
  questions.md, per LANE-BRIEF SS21/SS22.
-->

"""

with open("/tmp/AU-MED-102-biochem-molecular-mcq.md", "w") as f:
    f.write(header)
    f.write("\n---\n\n".join(emit(q, i+1) for i, q in enumerate(Q)))
print(f"Wrote {len(Q)} questions")
