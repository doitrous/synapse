/**
 * `102 INT > Biochemistry > Chemistry of Nucleic Acids` — the question books'
 * MCQs.
 *
 * 17 rows, grounded in the department book's own chapter
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * p73–p80: "IX- NUCLEIC ACIDS" through the end of the chapter). The chapter's
 * last page (physical p80, printed 76, "Genetic Terminology") is cancelled
 * for the written exam per BIO ORIENTATION 102 (2025/2026), but no row here
 * tests that section — every row is about DNA/RNA composition, structure,
 * tRNA arms, phosphodiester bonds or histones, all from the examinable
 * printed 69–75.
 *
 * 10 rows keep their printed key as-is; 4 had no recoverable printed key
 * (`correctSource: "none"`) but the book settles them cleanly, so those carry
 * an `answerOverride`; 3 are excluded — one because its option set is
 * genuinely garbled (only one populated option key, itself running two
 * options' text together), one because the book never teaches which combined
 * base ratio is species-invariant (a form of Chargaff's second rule the book
 * simply does not state), and one because the printed key is directly
 * contradicted by the book's own text but the book does not say enough to
 * pick a specific replacement answer.
 *
 * `dna-double-helix-antiparallel-strands` is this chapter's own concept and
 * does the heaviest lifting here — hydrogen bonding, base pairing and the two
 * base-composition arithmetic questions all turn on it. It is also reused
 * from this leaf in the DNA Synthesis chapter's own arithmetic question,
 * which needs the identical A-T/G-C pairing fact.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Chemistry of Nucleic Acids',
  modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
  articleId: 'ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS',

  concepts: [
    {
      key: 'dna-double-helix-antiparallel-strands',
      label:
        'The two strands of the DNA double helix run antiparallel and are held to each other only by hydrogen bonds between complementary bases — two for A-T and three for G-C',
      definition:
        "Watson and Crick's double helix is the common physiological form of DNA. The two strands run antiparallel, are paired to each other and coil around a common axis to form a right-handed helix. They are held together by complementary base pairing through specific hydrogen bonds: adenine pairs with thymine through two hydrogen bonds and guanine with cytosine through three. The base pairs inside the helix are stacked above each other by Van der Waals forces and hydrophobic interactions, which stabilise the helix, and the whole resembles a spiral staircase in which the base pairs are the steps and the sugar-phosphate backbones the handrails.",
      objective:
        'State the orientation of the two DNA strands relative to each other and name the bond that holds them together, with the number of bonds in each base pair.',
      pitfall:
        'Calling the bond between the two strands covalent because DNA is chemically stable. The phosphodiester bonds along each backbone are covalent; the two strands are held to each other only by hydrogen bonds, which is why heat alone separates them.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
      type: 'structure_function_relationship',
    },
    {
      key: 'dna-rna-composition-and-structural-differences',
      label:
        "RNA differs from DNA in its sugar (ribose vs deoxyribose), its pyrimidine (uracil vs thymine) and its single-stranded structure, while both share the same two purines",
      definition:
        "DNA and RNA share the purine bases adenine and guanine and the pyrimidine cytosine. They differ in three other respects: DNA carries thymine and no uracil, while RNA carries uracil and only a minor amount of thymine (found in the T of the TψC arm of tRNA); DNA's sugar is 2-deoxyribose, RNA's is ribose; and DNA forms a double helix while RNA is single-stranded. DNA is linear or circular and is found mainly in the nucleus and mitochondria, carrying genetic information and directing the synthesis of RNAs; RNA occurs as mRNA, tRNA and rRNA, is found mainly in the cytosol, and carries out protein synthesis.",
      objective:
        "Name RNA's distinguishing sugar and base compared with DNA, and classify each of the four common bases as a purine or a pyrimidine.",
      pitfall:
        "Assuming RNA never contains thymine — the book notes thymine does appear in RNA, but only as a minor base within tRNA (the T of the TψC arm), so 'RNA never has thymine' overstates the rule.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
      type: 'classification',
    },
    {
      key: 'trna-cloverleaf-arms-and-functions',
      label:
        'The tRNA cloverleaf has four named arms plus an extra arm, each with its own job: the acceptor arm carries the amino acid, the D-arm (with dihydrouracil) is read by aminoacyl-tRNA synthetase, the anticodon arm pairs with the mRNA codon, and the TψC arm (thymine and pseudouridine) binds the ribosome',
      definition:
        "tRNA is a single strand folded into a cloverleaf shape, stabilized by hydrogen bonds, with four main arms and one extra arm. The acceptor arm terminates at its 3' OH end in a specific CCA sequence, where the amino acid is carried as an aminoacyl group. The D-arm contains the unusual base dihydrouracil and is important for recognition of the tRNA by aminoacyl-tRNA synthetase, the enzyme that attaches the correct amino acid to its specific tRNA. The anticodon arm contains the three-base anticodon, which pairs with the complementary codon of mRNA during translation. The TψC arm (loop IV) contains the unusual sequence of thymine and pseudouridine, and is important for binding the tRNA to the ribosome. The extra arm contains 3 to 12 unpaired bases and is the major site of variation between different tRNAs.",
      objective:
        'Name each arm of the tRNA cloverleaf and the specific job it performs in protein synthesis.',
      pitfall:
        "Swapping the D-arm's and the TψC arm's distinguishing bases — dihydrouracil marks the D-arm (synthetase recognition); thymine and pseudouridine mark the TψC arm (ribosome binding).",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
      type: 'structure_function_relationship',
    },
    {
      key: 'nucleic-acids-are-nucleotide-polymers-linked-by-phosphodiester-bonds',
      label:
        "Nucleic acids are polymers whose nucleotide units are joined by phosphodiester bonds between the 3'-hydroxyl of one nucleotide and the 5'-hydroxyl of the next, giving each strand a chemically distinct 5' and 3' end",
      definition:
        "Nucleic acids are polymers of nucleotides. Within each strand, nucleotides are linked together by phosphodiester bonds between the 3'-hydroxyl group of one nucleotide and the 5'-hydroxyl group of the next nucleotide, through a phosphate group; the alternating sugar-phosphate units form the backbone of the strand. Each polynucleotide strand therefore has two different ends: a 5' end with a free phosphate group attached to the 5'-hydroxyl of the terminal pentose, and a 3' end with a free 3'-hydroxyl group. The order of nucleotides in a strand is always written 5' to 3', which is also the direction of synthesis.",
      objective:
        'State what links nucleotides together within one strand and name the two chemically distinct ends of a polynucleotide strand.',
      pitfall:
        "Placing the phosphodiester bond between the bases rather than along the backbone — the bases project inward and pair by hydrogen bonds; the phosphodiester bond is what joins one nucleotide's sugar to the next nucleotide's phosphate.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
      type: 'structure_function_relationship',
    },
    {
      key: 'rna-types-and-functional-roles',
      label:
        'mRNA (~5% of cellular RNA) carries the codon sequence read during translation, tRNA (~15%) carries amino acids to match its anticodon to each codon, and rRNA (~80%) forms the ribosome itself',
      definition:
        'Three major RNA types participate in protein synthesis. Transfer RNA (tRNA) represents about 15% of total cellular RNA and carries a specific amino acid during protein synthesis, with at least one tRNA type for each of the twenty common amino acids. Messenger RNA (mRNA) represents only about 5% of cellular RNA; its coding region carries genetic information from the nuclear DNA to the cytosol as the template for protein synthesis, with each three-base codon designating one amino acid, flanked by untranslated 5\' and 3\' regions. Ribosomal RNA (rRNA) represents about 80% of total cellular RNA, associates with proteins to form the ribosome\'s two subunits (60S and 40S, together the 80S ribosome), and serves as the site of protein synthesis. Other minor RNA types — snRNAs (mRNA processing), miRNAs (gene expression regulation) and siRNAs (gene silencing by RNA interference) — are also found in eukaryotic cells.',
      objective:
        "State each major RNA type's approximate share of total cellular RNA and its specific job in protein synthesis.",
      pitfall:
        'Assuming mRNA, as the carrier of genetic information for translation, must be the most abundant RNA — it is actually the least abundant of the three (~5%), while rRNA, structural and non-informational, makes up the bulk (~80%).',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
      type: 'classification',
    },
    {
      key: 'histones-and-nucleosome-packaging',
      label:
        'Histones are lysine- and arginine-rich basic proteins that condense DNA into nucleosomes — an octamer core of H2A, H2B, H3 and H4 wrapped by about 140 bp of DNA, connected by H1-bound linker DNA into a beads-on-a-string chromatin fibre',
      definition:
        'Each chromosome contains DNA plus histone proteins. Histones are basic proteins rich in lysine and arginine, positively charged, which bind the acidic (phosphate-rich, negatively charged) DNA. Five major histone types — H1, H2A, H2B, H3 and H4 — occur in eukaryotic chromosomes and interact with the minor grooves of DNA. Their main function is to condense DNA into structural units called nucleosomes: each nucleosome is a histone octamer (two copies each of H2A, H2B, H3 and H4) wrapped by about one and three-quarter turns of supercoiled DNA (roughly 140 bp). Linker DNA (roughly 60 bp), with H1 attached, connects successive nucleosomes, giving chromatin its beads-on-a-string appearance before further, higher-order folding condenses it into chromosomes.',
      objective:
        'State what makes histones bind DNA electrostatically, name the four histone types in the nucleosome core, and describe how linker DNA connects nucleosomes into a beads-on-a-string fibre.',
      pitfall:
        "Counting H1 as part of the nucleosome's core octamer — the core is two copies each of H2A, H2B, H3 and H4; H1 instead binds the linker DNA between nucleosomes.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Nucleic Acids',
      type: 'structure_function_relationship',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p53-q1',
      conceptKey: 'dna-rna-composition-and-structural-differences',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        "Identify uracil as the nitrogenous base unique to RNA in place of DNA's thymine.",
      explanations: {
        a: "Thymine is DNA's base; the comparison table gives RNA uracil in its place (thymine appears in RNA only as a minor base within tRNA).",
        b: "Correct. RNA's nitrogenous base is uracil in place of DNA's thymine, per the book's own DNA/RNA comparison.",
        c: 'Xanthine is not one of the four bases the book lists for either DNA or RNA — it plays no part in this classification.',
        d: 'Hypoxanthine, like xanthine, is not among the bases the book assigns to DNA or RNA.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p53-q2',
      conceptKey: 'dna-rna-composition-and-structural-differences',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        "Identify ribose as RNA's sugar, in contrast to DNA's deoxyribose.",
      explanations: {
        a: 'Ribulose is a five-carbon sugar involved in photosynthetic carbon fixation, not the sugar of RNA.',
        b: 'Arabinose is not a sugar the book assigns to either nucleic acid.',
        c: "Correct. The book's comparison table gives RNA the sugar ribose, versus DNA's 2-deoxyribose.",
        d: "Deoxyribose is DNA's sugar, not RNA's — this option swaps the two nucleic acids' sugars.",
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book's DNA/RNA comparison table (p79) and the labeled structure figure (p73) both give RNA the sugar ribose, as opposed to DNA's 2-deoxyribose.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p53-q3',
      conceptKey: 'trna-cloverleaf-arms-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        "Name dihydrouracil as the unusual base that gives the tRNA D-arm its name.",
      explanations: {
        a: 'Uridine is a normal RNA nucleoside, not the unusual base that distinguishes the D-arm.',
        b: 'Pseudo-uridine is the unusual base found in the TψC arm, not the D-arm.',
        c: 'Correct. The book states the D-arm contains the unusual base dihydrouracil, which is important for the arm\'s recognition by aminoacyl-tRNA synthetase.',
        d: 'Thymidine is the unusual base found in the TψC arm alongside pseudouridine, not in the D-arm.',
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book states directly (p77): 'D-arm contains an unusual base dihydrouracil.'",
    },
    {
      key: 'MCQ-102-07f0a0ff-p53-q5',
      conceptKey: 'trna-cloverleaf-arms-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        "State that the TψC arm's name comes from its thymine, pseudouridine and cytosine sequence.",
      explanations: {
        a: 'Correct. The book states the TψC arm contains the unusual specific sequence of thymine and pseudouridine bases, alongside cytosine, giving the arm its name.',
        b: 'Uridine, the ordinary nucleoside, is not the unusual modified base the book names for this arm — pseudouridine is.',
        c: "Dihydrouridine is the unusual base of the D-arm, not the TψC arm — this swaps the two arms' distinguishing bases.",
        d: "Adenine is not the unusual base named for this arm at all; the book's sequence for this arm is thymine, pseudouridine and cytosine.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p53-q6',
      conceptKey: 'dna-double-helix-antiparallel-strands',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective:
        'Distinguish the base-stacking (Van der Waals) forces the book credits with stabilizing the helix from the hydrogen bonds that hold each base pair together.',
      explanations: {
        a: "Hydrogen bonds hold each base pair together (two for A-T, three for G-C) and give the pairing its specificity, but the book credits the Van der Waals stacking forces between neighbouring base pairs with providing the helix's overall stability.",
        b: 'Electrostatic bonds are not a force the book names as a source of nucleic acid stability.',
        c: "Correct. The book states the stacked base pairs are held together by Van der Waals forces and hydrophobic interactions, and that 'these forces provide the stability of the double helix.'",
        d: "Phosphodiester bonds are the covalent bonds within each backbone; they hold one strand's own nucleotides together, not the two strands to each other, and the book does not credit them with the helix's stability.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p53-q7',
      conceptKey: 'dna-rna-composition-and-structural-differences',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective:
        'Identify guanine as a purine base present in RNA, distinguishing it from the pyrimidines cytosine, thymine and uracil.',
      explanations: {
        a: 'Cytosine is a pyrimidine, not a purine — it does not answer the question as asked.',
        b: 'Thymine is a pyrimidine, and in RNA it appears only as a minor base within tRNA — not the purine the question is asking for.',
        c: "Correct. The book's comparison table lists adenine and guanine as the purines shared by both DNA and RNA; guanine is the purine among these four options.",
        d: "Uracil is a pyrimidine — RNA's substitute for DNA's thymine — not a purine.",
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book's comparison table (p79) lists 'Adenine & Guanine' as the purines present in both DNA and RNA; the other three options (cytosine, thymine, uracil) are all pyrimidines by the same table, so guanine is the only purine among the four options.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q8',
      conceptKey: 'dna-double-helix-antiparallel-strands',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective:
        "Apply complementary base pairing (A with T, G with C) to compute the total nucleotide count of a double-stranded DNA segment from two of its base counts.",
      explanations: {
        a: '100 only counts the adenine given in the question — it ignores that the segment is double-stranded and has an equal number of paired thymine and cytosine bases, plus the guanine paired with the given cytosine.',
        b: '200 accounts for adenine and its thymine partner (100+100) but leaves out the 100 cytosine and its 100 paired guanine entirely.',
        c: 'Correct. In double-stranded DNA, adenine pairs with thymine and guanine pairs with cytosine, so 100 adenine implies 100 thymine, and 100 cytosine implies 100 guanine: 100+100+100+100 = 400 nucleotides total.',
        d: '640 does not follow from doubling any combination of the given counts consistent with complementary base pairing — it overshoots what the A-T/G-C pairing rule gives.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q9',
      conceptKey: 'nucleic-acids-are-nucleotide-polymers-linked-by-phosphodiester-bonds',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'State that nucleotides are the building-block monomers nucleic acids are polymers of.',
      explanations: {
        a: 'Correct. The book opens by defining nucleic acids as polymers of nucleotides.',
        b: 'Nucleosides are a base plus a sugar, missing the phosphate group that makes a nucleotide — the actual repeating unit needs that phosphate to form the phosphodiester backbone.',
        c: 'Amino acids are the building blocks of proteins, an entirely different class of biomolecule.',
        d: 'Histones are proteins that package finished DNA into nucleosomes — they are not part of the nucleic acid polymer itself.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q10',
      conceptKey: 'rna-types-and-functional-roles',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        "Identify mRNA as the RNA type whose coding region is organized into codons.",
      explanations: {
        a: "Correct. The book states the coding region of mRNA carries genetic information as the template for protein synthesis, with each three-base codon designating an amino acid.",
        b: "Ribosomal RNA forms the ribosome's structure and catalytic core; it does not carry a codon sequence itself.",
        c: 'Transfer RNA reads a codon via its complementary anticodon, but the codon itself is on the mRNA being translated, not on the tRNA.',
        d: "DNA carries the gene the mRNA is transcribed from, but the codon — the triplet that designates an amino acid during translation — is a feature of the mRNA's coding region, not of DNA.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q11',
      conceptKey: 'excluded.chromatin-composition-option-set-garbled',
      difficulty: 'Moderate',
      questionType: 'Not applicable — excluded',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The row\'s option set is malformed: only a single option key ("a") is populated, and its text runs together what look like fragments of two different options ("Nucleic acids and proteins" followed by "c) Proteins only"), flagged by the extractor as `suspect: "option count"`. No usable b/c/d options survive to reconstruct a fair multiple-choice set.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q12',
      conceptKey: 'dna-double-helix-antiparallel-strands',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective:
        'Apply complementary base pairing to compute total nucleotide count from thymine and guanine counts.',
      explanations: {
        a: '160 only accounts for the thymine and its adenine partner (80+80) — it leaves out the 80 guanine and its 80 paired cytosine.',
        b: '40 is far too small even for one base pair\'s worth of the given counts — it does not follow from the base-pairing rule applied to either given number.',
        c: 'Correct. Thymine pairs with adenine and guanine pairs with cytosine, so 80 thymine implies 80 adenine, and 80 guanine implies 80 cytosine: 80+80+80+80 = 320 nucleotides total.',
        d: '640 overshoots what the pairing rule gives for these counts — it does not correspond to any consistent application of A-T/G-C pairing to 80 and 80.',
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). Applying the book's own base-pairing rule (p74: adenine pairs with thymine, guanine pairs with cytosine) to 80 thymine and 80 guanine gives 80 adenine and 80 cytosine as well, for 320 nucleotides total.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q13',
      conceptKey: 'nucleic-acids-are-nucleotide-polymers-linked-by-phosphodiester-bonds',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        'Locate the phosphodiester bond as the linkage between nucleotides within a nucleic acid strand.',
      explanations: {
        a: "Correct. The book states nucleotides within a nucleic acid strand are linked by phosphodiester bonds, between the 3'-hydroxyl of one nucleotide and the 5'-hydroxyl of the next, through a phosphate group.",
        b: 'Monosaccharides in a polysaccharide are linked by glycosidic bonds, not phosphodiester bonds — a different class of biomolecule entirely.',
        c: 'Amino acids in a polypeptide are linked by peptide bonds, not phosphodiester bonds.',
        d: 'Fatty acids in a diglyceride are linked by ester bonds to glycerol, not phosphodiester bonds.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p54-q14',
      conceptKey: 'dna-double-helix-antiparallel-strands',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'State that hydrogen bonds, not covalent bonds, hold the two strands of the DNA double helix together.',
      explanations: {
        a: "Covalent bonds hold each strand's own backbone together (the phosphodiester bonds), not the two strands to each other.",
        b: 'Correct. The two strands are held together by complementary base pairing through hydrogen bonds — two between A and T, three between G and C.',
        c: 'Ionic bonds are not the force the book names for holding the two strands together.',
        d: 'Phosphodiester bonds are the covalent bonds within a single strand\'s backbone; they do not join the two strands to each other, which is done only by hydrogen bonds.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p55-q17',
      conceptKey: 'excluded.chargaff-ratio-invariance-not-taught',
      difficulty: 'Hard',
      questionType: 'Not applicable — excluded',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "Tests which combined base ratio is constant across species — a form of Chargaff's second parity rule. The book teaches only that adenine pairs with thymine and guanine with cytosine (p74); it never states that (A+G)/(T+C) specifically is invariant across species, nor discusses base-ratio constancy at all. Two of the four options (c, d) also include uracil, which does not occur in DNA, but that alone is not enough to establish which of the two DNA-only options (a, b) the book intends as the constant ratio. Not taught in the module book.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p55-q18',
      conceptKey: 'excluded.non-histone-protein-packing-role-contradicted-by-book',
      difficulty: 'Moderate',
      questionType: 'Not applicable — excluded',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "The printed key (a, 'are not required') is directly contradicted by the book's own text (p76): 'Non-histone proteins... share in the packing of DNA and are important for regulation of gene expression and involved in replication and transcription' — they plainly are required. But the book does not specify whether that involvement runs from beginning to end of packing (b), only an earlier stage (c), or only a higher level of packing (d), so none of the three remaining options can be confirmed as the intended correct answer from the book's text alone.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p55-q19',
      conceptKey: 'histones-and-nucleosome-packaging',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'State that histones are basic proteins rich in lysine and arginine, which lets them bind acidic DNA electrostatically.',
      explanations: {
        a: 'Correct. The book states histones are basic proteins rich in lysine and arginine, which are positively charged and so bind the negatively charged, phosphate-rich DNA.',
        b: 'Leucine is a neutral, non-basic amino acid — swapping it in for lysine loses the positive charge that lets histones bind DNA.',
        c: "Histidine and leucine are not the residue pair the book credits with histones' basic, DNA-binding character; arginine and lysine are.",
        d: 'Glutamate and aspartate are acidic amino acids, which would make a protein negatively charged like DNA itself, not able to bind it electrostatically the way histones do.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p55-q20',
      conceptKey: 'dna-double-helix-antiparallel-strands',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'State the number of hydrogen bonds (two) between adenine and thymine, as distinct from the three between guanine and cytosine.',
      explanations: {
        a: '1 is too few for any base pair the book describes; even the weaker A-T pair has two hydrogen bonds, not one.',
        b: 'Correct. The book states adenine pairs with thymine through two hydrogen bonds.',
        c: '3 is the number of hydrogen bonds between guanine and cytosine, not adenine and thymine — this swaps the two base pairs\' bond counts.',
        d: '4 hydrogen bonds is not a count the book gives for either base pair; neither A-T (two) nor G-C (three) reaches four.',
      },
    },
  ],
}
