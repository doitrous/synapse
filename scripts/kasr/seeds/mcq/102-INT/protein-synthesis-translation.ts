/**
 * `102 INT > Biochemistry > Protein Synthesis (Translation)` — the question
 * books' MCQs.
 *
 * 26 rows, all triaged from the department book's own pages (physical p92-101,
 * `scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`). Only one row
 * (`p68-q1`) had no printed key at all; the book settles it anyway — protein
 * synthesis is placed at the rough endoplasmic reticulum, i.e. in the
 * cytoplasm, while post-transcriptional mRNA processing (including splicing,
 * "removal of introns") is placed in the nucleus — so it gets an
 * `answerOverride` rather than an exclusion. Every other row carried a clean
 * printed key that the book's text confirms, so nothing here is excluded.
 *
 * Two rows had OCR run-on garbage pasted onto option d (`p68-q4`, `p72-q28`):
 * the garbage is the printed answer-key table bleeding into the option text.
 * The option's real content — "Overlapping" and "Frame shift mutation"
 * respectively — is used for its explanation; the printed key for `p72-q28`
 * is legible inside its own garbage ("28.b") and confirms option b.
 *
 * Two concepts are reused from the existing 102 INT biochemistry set:
 * `post-translational-covalent-modification-types` for the carboxylation
 * question, and `point-mutation-types-and-consequences` for the sickle-cell
 * missense question. The rest are minted fresh, one per genuinely distinct
 * teachable fact the book's own chapter structure separates: the genetic
 * code's four characteristics, the codon itself, the wobble hypothesis,
 * what translation requires plus aminoacyl-tRNA formation, elongation's
 * three-step cycle, initiation's Met-tRNAi, cytoplasmic vs nuclear location,
 * trimming, and the substitution/transition/transversion/frameshift
 * mutation taxonomy (kept distinct from the existing consequence-focused
 * point-mutation concept).
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Protein Synthesis (Translation)',
  modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
  articleId: 'ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION',

  concepts: [
    {
      key: 'translation-occurs-in-cytoplasm-not-nucleus',
      label:
        'Translation takes place at the rough endoplasmic reticulum in the cytoplasm, so it is the one process among transcription, splicing, translation and DNA replication that never happens inside the nucleus',
      definition:
        "Rough endoplasmic reticulum is the site of formation of proteins in eukaryotes — translation happens in the cytoplasm, on ribosomes studding the rough ER, once the mature mRNA has already left the nucleus through a nuclear pore. By contrast, the department book places the post-transcriptional modifications of mRNA — capping, polyadenylation, splicing (removal of introns) and editing — inside the nucleus, before that export; transcription itself, which produces the primary transcript those modifications act on, necessarily happens there too.",
      objective:
        'State that protein synthesis (translation) is a cytoplasmic, rough-ER event, distinct from transcription and RNA processing, which are nuclear.',
      pitfall:
        "Assuming that because DNA and RNA synthesis both happen in the nucleus, protein synthesis does too. The finished, spliced mRNA has to be exported through a nuclear pore before a ribosome can ever read it.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'structure_function_relationship',
    },
    {
      key: 'genetic-code-characteristics-specificity-degeneracy-universality-reading-frame',
      label:
        'The genetic code is specific (one codon, one amino acid), degenerate (one amino acid, several synonym codons), nearly universal across organisms, and read in a fixed, non-overlapping reading frame three bases at a time from the initiating codon',
      definition:
        'Since each codon is formed of 3 of the 4 bases (U, C, A, G), there are 4³ = 64 possible codons: one, AUG, is the initiation codon; three (UAA, UAG, UGA) are termination (stop) codons that code for no amino acid; the rest code for amino acids. The genetic code has four characteristics: (1) Specificity — a particular codon always codes for only one amino acid, e.g. UUU codes only for phenylalanine; (2) Degeneracy — an amino acid may be coded by more than one codon, known as synonym codons, e.g. phenylalanine is coded by two synonym codons; (3) Universality — the genetic code is nearly universal, the same in all organisms; (4) Reading frame — codons are read from a specific starting point (the initiating codon) on the mRNA as a continuous, uninterrupted sequence of bases taken three at a time.',
      objective:
        'List the four characteristics of the genetic code — specificity, degeneracy, universality and reading frame — and recognise that reading the code as a continuous, non-overlapping sequence rules out any base being shared between two codons.',
      pitfall:
        "Adding 'overlapping' as a fifth characteristic. The book's reading-frame description reads the mRNA as 'a continuous uninterrupted sequence of bases taken 3 at a time' — every base belongs to exactly one codon, so the code cannot be read as overlapping the way this distractor claims.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'classification',
    },
    {
      key: 'codon-definition-location-and-start-stop-codons',
      label: 'A codon is a 3-base code word on mRNA for one amino acid; AUG is the single initiation codon, and UAA, UAG and UGA are the termination (stop) codons that code for no amino acid',
      definition:
        'The genetic code is the nucleotide sequence of mRNA representing the code words for amino acids, so called because those code words originate from DNA genes. Each 3 successive nitrogenous bases in mRNA represents a codon. Of the 64 possible codons, one — AUG — acts as the initiation codon for protein synthesis, three (UAA, UAG, UGA) are termination (stop, nonsense) codons that code for no amino acid, and the rest code for amino acids.',
      objective:
        'Define a codon as a 3-base mRNA code word for one amino acid, locate codons on mRNA specifically (not DNA, tRNA or rRNA), and name AUG as the initiation codon and UAA/UAG/UGA as the termination codons.',
      pitfall:
        "Placing codons on the template strand of DNA or on tRNA. The codon is, by the book's own definition, a feature of mRNA; DNA carries the gene the codon originates from, and tRNA carries the complementary anticodon, not the codon.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'definition',
    },
    {
      key: 'wobble-hypothesis-and-anticodon-pairing',
      label:
        "Codon and anticodon pair antiparallel, 5' to 3'; the wobble hypothesis explains how one tRNA can still recognise more than one codon because only the first two codon bases pair strictly, while the third is flexible",
      definition:
        "Correct pairing of the codon in the mRNA with the anticodon of the tRNA is essential for accurate translation. Codon and anticodon are always read from 5' to 3' direction, and they are antiparallel and complementary in base composition, interacting through base pairing. Some tRNAs recognise more than one codon for a given amino acid; the wobble hypothesis describes the mechanism by which this happens: the first two nucleotides in the codon are essential, while the third nucleotide is flexible, so that even if the third nucleotide changes, the codon may still indicate the same amino acid. The base pairing of the third nucleotide of the codon with the first nucleotide of the anticodon is therefore less specific.",
      objective:
        "Explain the wobble hypothesis: why the third codon base pairs more loosely with the anticodon's first base, letting one tRNA read more than one codon for the same amino acid.",
      pitfall:
        'Confusing wobble with degeneracy. Degeneracy is the property of the genetic code that several codons specify one amino acid; wobble is the tRNA-level mechanism — flexible third-base pairing — that lets a single tRNA species read more than one of those synonym codons.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'mechanism',
    },
    {
      key: 'translation-requirements-and-aminoacyl-trna-formation',
      label:
        'Translation requires all three RNA classes, activated amino acids, energy and protein factors; the amino acids are activated and loaded onto their matching tRNA by 20 amino acid-specific aminoacyl-tRNA synthetases in a two-step, ATP-consuming reaction',
      definition:
        "Translation is the process by which a cell makes protein using the genetic information carried in mRNA. It requires: (1) all three classes of RNA — mRNA as the template for correct amino acid addition, tRNAs that carry activated amino acids (as aminoacyl-tRNA) into the ribosomes, and ribosomes, which associate with the mRNA and contain the peptidyl transferase activity that catalyses peptide bond formation; (2) amino acids, activated and carried on tRNA; (3) a source of energy (ATP and GTP); (4) different protein factors. In the cytosol, the 20 different amino acids are carried on their corresponding tRNAs by 20 different amino-acyl-tRNA synthetases, each specific for one amino acid and its corresponding tRNA. Formation of aminoacyl-tRNA occurs in two steps: first, formation of an enzyme-AMP-amino acid complex, with hydrolysis of ATP into AMP and PPi; second, formation of the aminoacyl-tRNA complex, with release of the enzyme and AMP. Aminoacyl-tRNA is called 'charged tRNA'.",
      objective:
        'List what translation requires (three RNA classes, activated amino acids, energy, protein factors), and describe how each amino acid is activated and charged onto its own tRNA by its own aminoacyl-tRNA synthetase.',
      pitfall:
        "Treating a DNA-replication component, such as an Okazaki fragment, as something translation needs. The book's list of translation's requirements is the three RNA classes, activated amino acids, ATP/GTP and protein factors — nothing from lagging-strand DNA synthesis belongs on it. The same logic rules out the spliceosome, which belongs to mRNA splicing, a nuclear, pre-translation event, not to the ribosome's own machinery.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'mechanism',
    },
    {
      key: 'translation-elongation-and-peptide-bond-formation',
      label:
        'Elongation is a 3-step cycle — aminoacyl-tRNA binds the A site, peptidyl transferase forms the peptide bond, and the ribosome translocates one codon — that reads the mRNA codon by codon and so fixes the amino acid sequence of the growing chain',
      definition:
        'Elongation is a 3-step cycle repeated for each amino acid added to the protein after the initiator methionine: (1) binding of aminoacyl-tRNA to the A site, the charged tRNA determined by the mRNA codon aligned with the A site; (2) peptide bond formation, catalysed by peptidyl transferase — an enzyme that is part of the 60S ribosomal subunit — between the amino group of the new aminoacyl-tRNA in the A site and the carboxylic group of the peptidyl chain carried by the tRNA in the P site, which leaves peptidyl-tRNA in the A site; (3) translocation, in which the ribosome moves exactly 3 nucleotides (one codon) along the mRNA, moving the growing peptidyl-tRNA from the A site to the P site and freeing the A site for the next aminoacyl-tRNA. During elongation the ribosome moves 5’ to 3’ along the mRNA, synthesising the protein from amino to carboxyl terminus, so the sequence of amino acids added corresponds directly to the sequence of codons on the mRNA.',
      objective:
        'Walk through the three steps of elongation — A-site binding, peptide bond formation by peptidyl transferase, translocation — and state that the resulting amino acid sequence follows the mRNA’s codon sequence.',
      pitfall:
        "Crediting peptide bond formation to a separate 'polymerase' enzyme, or placing peptidyl transferase on the small (40S) subunit. The book is specific that peptidyl transferase is part of the 60S subunit and is the enzyme that forms the peptide bond.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'mechanism',
    },
    {
      key: 'translation-initiation-steps-and-met-trnai',
      label:
        'Eukaryotic translation initiates when IF-4 brings mRNA to the 40S subunit, which slides to the AUG start codon where methionyl-tRNA (Met-tRNAi) binds, before the 60S subunit joins to leave Met-tRNAi on the P site and the A site free',
      definition:
        "Initiation involves the assembly of the components of protein synthesis at the initiation codon. IF-4 binds to the 5'-cap of mRNA and facilitates the binding of mRNA to the 40S ribosomal subunit; the 40S subunit moves along the mRNA to reach the first codon (AUG); the initiating methionyl tRNA (Met-tRNAi) becomes bound to the AUG start codon; the 60S subunit then binds the 40S subunit, forming the completed 80S initiation complex, with release of IF-4. The ribosome has a peptidyl (P) site, where Met-tRNAi initially binds and which later holds the growing peptide chain, and an aminoacyl (A) site, which binds each new incoming aminoacyl-tRNA. At the end of initiation, Met-tRNAi sits on the P site, ready for elongation, and the A site is free.",
      objective:
        'State that the eukaryotic initiator tRNA is methionyl-tRNA (Met-tRNAi), bound to the AUG start codon, and place it correctly on the P site at the end of initiation.',
      pitfall:
        "Naming formylmethionyl-tRNA as the eukaryotic initiator. The book's eukaryotic initiation steps name only methionyl-tRNA (Met-tRNAi); formylmethionine does not appear in this chapter's account of eukaryotic translation.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'mechanism',
    },
    {
      key: 'post-translational-trimming-of-precursor-proteins',
      label:
        'Trimming removes a segment from an inactive protein precursor by proteolysis, as in the conversion of pre-proinsulin to insulin and trypsinogen to trypsin',
      definition:
        'Many proteins secreted from the cell are initially made as large, precursor molecules that are not functionally active. Portions of the protein chain must be removed by specialized endoproteases, which results in the release of an active molecule. For example, insulin is formed as pre-proinsulin, which is converted to proinsulin and then to insulin; and zymogens are inactive precursors of secreted enzymes, e.g. trypsinogen becomes activated to trypsin in the small intestine.',
      objective:
        "Identify trimming as the proteolytic removal of a segment from an inactive protein precursor, and name insulin and trypsinogen as the book's examples.",
      pitfall:
        "Confusing trimming with covalent modification. Trimming, unlike phosphorylation, glycosylation, acetylation, methylation, hydroxylation or carboxylation, does not add a functional group — it removes a piece of the chain by proteolysis to release the active protein.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'mechanism',
      aliases: ['Proteolytic processing', 'Zymogen activation'],
    },
    {
      key: 'post-translational-covalent-modification-types',
      label:
        'Covalent post-translational modification adds a functional group to an amino acid residue — phosphate, carbohydrate, acetyl or methyl, hydroxyl or carboxyl — and each has its own worked example',
      definition:
        'Amino acid residues in a finished chain are modified enzymatically to alter activity or stability, to direct the protein to a compartment, or to prepare it for secretion. Phosphorylation and dephosphorylation on serine, threonine or tyrosine regulate the enzymes of glycogen metabolism and regulators of gene transcription. Glycosylation marks proteins destined for secretion, lysosomes or membranes. Acetylation or methylation of the N-terminal residue alters charge, as in chromatin remodelling by histone acetylation. Hydroxylation of prolyl and lysyl residues stabilises collagen. Carboxylation forms γ-carboxyglutamate, which lets clotting proteins bind calcium.',
      objective: "Name the types of covalent post-translational modification and give the department book's example for each.",
      pitfall:
        'Offering trimming — the conversion of pre-proinsulin to insulin — as a covalent modification. Trimming is proteolytic removal of a segment and is the other branch of post-translational modification, not this one.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'classification',
    },
    {
      key: 'gene-mutation-types-substitution-transition-transversion-and-frameshift',
      label:
        'Base substitutions are transitions (purine for purine, or pyrimidine for pyrimidine) or transversions (purine for pyrimidine or vice versa); insertions or deletions cause a frameshift only when the number of bases added or removed is not a multiple of three',
      definition:
        "Mutations are permanent changes in a DNA sequence, caused by replication errors or by damage to DNA's nucleotides (chemical mutagens, irradiation, oxidative damage). There are two main types of gene mutation. (1) Base substitution (point mutation), the most common type, with two subgroups: transition, in which one purine is replaced by another purine, or one pyrimidine is replaced by another pyrimidine; and transversion, in which a purine is replaced by a pyrimidine, or a pyrimidine by a purine. (2) Deletion or insertion of one or more bases: a frameshift mutation occurs if the number of bases deleted or inserted is not a multiple of three (e.g. one or two bases), which changes the reading frame of the translated mRNA and usually produces a nonfunctional gene product; deletion or insertion of three, or a multiple of three, bases produces no change in reading frame, only the loss or gain of one or more amino acids, a less severe change than a frameshift.",
      objective:
        'Classify a given base change as a transition or transversion, and a given insertion/deletion as a frameshift mutation or an in-frame deletion/insertion, using the number of bases involved.',
      pitfall:
        "Treating any single-base change in DNA as automatically a 'substitution.' Comparing two aligned sequences base by base is needed to tell a substitution (same length, one base swapped) apart from a deletion (one strand shorter) or insertion (one strand longer) — the length difference, not just a mismatch, is what identifies a deletion or insertion.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'classification',
    },
    {
      key: 'point-mutation-types-and-consequences',
      label:
        'A base substitution in a coding region is nonsense if it creates a stop codon, missense if it changes the amino acid, and silent if the new codon is a synonym',
      definition:
        'Base substitutions are the commonest gene mutations. A nonsense mutation converts an amino acid codon into a stop codon, so translation terminates prematurely and the protein product is usually non-functional — thalassaemia is the example. A missense mutation changes the codon so a different amino acid is inserted; the effect ranges from none to very serious, as in sickle cell anaemia, where glutamate is replaced by valine at position six of the β chain. A silent mutation gives a synonym codon for the same amino acid, so the protein is unchanged.',
      objective: 'Name the three types of point mutation in a coding region and explain how each affects the protein product.',
      pitfall:
        'Assuming every missense mutation is harmless because only one amino acid changes. Whether it matters depends on which amino acid — swapping polar glutamate for nonpolar valine creates the sticky patch that produces sickle cell anaemia.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: ['SYS-FND-T02-S01'],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'classification',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p68-q1',
      conceptKey: 'translation-occurs-in-cytoplasm-not-nucleus',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify translation as the one listed process that happens outside the nucleus, at the rough endoplasmic reticulum.',
      answerOverride: 'b',
      answerOverrideReason:
        "correctSource is 'none' — no printed key survived. The book places protein synthesis at the rough endoplasmic reticulum, i.e. in the cytoplasm, while it places post-transcriptional processing of mRNA (including 'removal of introns', i.e. splicing) inside the nucleus; transcription must also occur there since it produces the transcript that gets processed. Translation is therefore the process absent from the nucleus.",
      explanations: {
        a: 'Transcription happens in the nucleus, where RNA polymerase reads the DNA template — it is not the exception.',
        b: 'Correct, and the answer. The book places protein synthesis at the rough endoplasmic reticulum, which is cytoplasmic; translation cannot happen in the nucleus because the ribosomes, tRNAs and aminoacyl-tRNA synthetases it needs are cytoplasmic machinery, and the mRNA reaching them has already been exported through a nuclear pore.',
        c: "Removal of introns is splicing, one of the post-transcriptional modifications of mRNA the book places 'in the nucleus' — not the exception.",
        d: 'DNA replication copies the nuclear genome and so happens in the nucleus — not the exception.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p68-q2',
      conceptKey: 'genetic-code-characteristics-specificity-degeneracy-universality-reading-frame',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Recognise 'overlapping' as the characteristic the genetic code does not have.",
      explanations: {
        a: "Specificity is one of the book's four characteristics of the genetic code — applicable, not the exception.",
        b: "Degeneracy is one of the book's four characteristics — applicable, not the exception.",
        c: "Universality is one of the book's four characteristics — applicable, not the exception.",
        d: "Correct. The book's reading-frame characteristic reads the code as 'a continuous uninterrupted sequence of bases taken 3 at a time' from a fixed start point — every base is used in exactly one codon, so the code is non-overlapping, not overlapping.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p68-q3',
      conceptKey: 'genetic-code-characteristics-specificity-degeneracy-universality-reading-frame',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise that specificity rules out one codon coding for more than one amino acid.',
      explanations: {
        a: 'True of the code (each codon is 3 of the 4 bases), so this is present, not lacking.',
        b: "This is degeneracy — an amino acid coded by more than one (synonym) codon — a real characteristic the book lists, so present, not lacking.",
        c: 'Universality is a real, book-listed characteristic — present, not lacking.',
        d: "Correct. This reverses specificity: the book states 'a particular codon always codes for only one amino acid.' A single codon coding for more than one amino acid is exactly what the code lacks.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p68-q4',
      conceptKey: 'genetic-code-characteristics-specificity-degeneracy-universality-reading-frame',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name degeneracy as the characteristic behind synonym codons for the same amino acid.',
      explanations: {
        a: "Correct. The book defines degeneracy as an amino acid being coded by more than one codon, called synonym codons — exactly the feature described.",
        b: "'Duplicative' is not one of the book's four named characteristics; it is invented terminology standing in for degeneracy.",
        c: 'Nonoverlapping describes the reading frame (bases read once each, three at a time), not the fact that one amino acid has several codons.',
        d: "Overlapping is not a real characteristic of the code at all — the book's reading frame is explicitly a continuous, non-overlapping sequence — and even if it were, it would not describe one amino acid having multiple codons.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q6',
      conceptKey: 'wobble-hypothesis-and-anticodon-pairing',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name the wobble hypothesis as the mechanism behind flexible third-base pairing.',
      explanations: {
        a: 'Degeneracy is the fact that an amino acid may have several synonym codons; the question asks about the pairing flexibility of the third base, which is wobble, a related but distinct idea.',
        b: 'Correct. The book names this flexibility of the third codon base — paired against the first anticodon base — the wobble hypothesis.',
        c: "'The central dogma' names the DNA to RNA to protein information flow; it says nothing about anticodon pairing flexibility.",
        d: 'Alternative splicing is a post-transcriptional mRNA-processing event, unrelated to how tRNA reads a codon.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q7',
      conceptKey: 'codon-definition-location-and-start-stop-codons',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Identify AUG as the genetic code's single initiation codon.",
      explanations: {
        a: 'A release/releasing factor acts at a stop codon during termination, not at AUG.',
        b: 'AUG starts translation; the codons that terminate the chain are UAA, UAG and UGA, not AUG.',
        c: "tRNA recognises a codon through its anticodon, but nothing in the book calls AUG a 'recognition site on tRNA' — the recognition site for any codon is on the mRNA itself.",
        d: 'Correct. The book names AUG as the one codon that acts as the initiation codon for protein synthesis.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q8',
      conceptKey: 'codon-definition-location-and-start-stop-codons',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name the three termination (stop) codons.',
      explanations: {
        a: 'Correct. The book names exactly these three as termination (stop) codons, coding for no amino acid.',
        b: "None of UGG, UGU or AGU is one of the book's three stop codons; UGG in fact codes for tryptophan.",
        c: "None of AAU, AAG or GAU is a stop codon in the book's genetic-code table.",
        d: 'None of GCG, GCA or GCU is a stop codon; these code for alanine.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q9',
      conceptKey: 'codon-definition-location-and-start-stop-codons',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Locate codons specifically on mRNA.',
      explanations: {
        a: 'The template strand of DNA carries the gene the codon is copied from, but the book defines the codon itself as a feature of mRNA, not of DNA.',
        b: "Correct. The book defines the genetic code as 'the nucleotide sequence of mRNA representing the code words for amino acids' — codons are on mRNA.",
        c: 'tRNA carries the anticodon, which pairs with the codon — the codon itself sits on mRNA, not on tRNA.',
        d: 'rRNA forms part of the ribosome that reads the codon; it does not itself carry codons.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q10',
      conceptKey: 'translation-requirements-and-aminoacyl-trna-formation',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State what tRNA physically transfers, and where from and to.',
      explanations: {
        a: 'Information moves from DNA to mRNA by transcription, not by tRNA, and not directly to the ribosome.',
        b: "mRNA itself carries information from DNA (via transcription) to the ribosome; tRNA's job is different — it carries amino acids, not information from mRNA.",
        c: 'Correct. The book states that in the cytosol, tRNAs carry the (activated) amino acids into the ribosomes.',
        d: 'Newly made polypeptide leaves the ribosome as a free chain, not attached to tRNA once released; this describes the ribosome’s output, not tRNA’s job.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q11',
      conceptKey: 'translation-requirements-and-aminoacyl-trna-formation',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise which components translation genuinely requires.',
      explanations: {
        a: 'The ribosome is explicitly one of translation’s requirements — it carries the peptidyl transferase activity — so it is compulsory.',
        b: 'mRNA is explicitly listed as the template translation requires — compulsory.',
        c: "Amino acids, activated and carried on tRNA, are explicitly one of the book's four requirements — compulsory.",
        d: "Correct. Okazaki fragments are a feature of lagging-strand DNA replication; they play no part in the book's list of what translation needs (three RNA classes, amino acids, energy, protein factors).",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p69-q12',
      conceptKey: 'codon-definition-location-and-start-stop-codons',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "State the book's definition of a codon.",
      explanations: {
        a: 'This describes a protein/enzyme action, not a codon, which the book defines as a sequence feature of mRNA, not a protein.',
        b: 'A codon is not a free-floating base; it is a fixed 3-base sequence within the mRNA chain.',
        c: "Correct. The book states that each 3 successive nitrogenous bases in mRNA represents a codon representing one amino acid's code word.",
        d: 'A codon is a base sequence on a single strand of mRNA, not a bond between two paired bases on complementary strands.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p70-q13',
      conceptKey: 'translation-requirements-and-aminoacyl-trna-formation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Identify the amino-acid-activation step from its ATP to AMP+PPi, enzyme-amino acid-tRNA reaction.',
      explanations: {
        a: "Correct. The reaction shown — an amino acid plus aminoacyl-tRNA synthetase and ATP, releasing PPi and forming an enzyme-AMP-amino acid complex before the aminoacyl-tRNA is released — is exactly the book's two-step formation of aminoacyl-tRNA, i.e. activation of the amino acid.",
        b: 'Initiation of translation involves IF-4, the 40S and 60S ribosomal subunits and the AUG start codon — none of which appear in a reaction between a free amino acid, its synthetase, ATP and tRNA.',
        c: 'Elongation adds amino acids to a growing chain already on the ribosome; this reaction has no ribosome and no growing peptide, only the free amino acid being loaded onto its tRNA.',
        d: 'Termination involves a release factor acting on a stop codon at the ribosome; nothing here matches that step.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p70-q14',
      conceptKey: 'translation-requirements-and-aminoacyl-trna-formation',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State the job of aminoacyl-tRNA synthetase.',
      explanations: {
        a: 'Correct. The book states that 20 different amino-acyl-tRNA synthetases, each specific for one amino acid and its tRNA, carry out the activation and loading of amino acids onto tRNA.',
        b: 'The synthetase activates and attaches an existing amino acid to its tRNA; it does not synthesise the amino acid itself.',
        c: "The synthetase's product, aminoacyl-tRNA, is described as 'charged' — the active, usable form — not an inactivated one.",
        d: "Nothing in the book's description of aminoacyl-tRNA synthetase involves degrading amino acids; its job is activation and attachment, not breakdown.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p70-q15',
      conceptKey: 'translation-requirements-and-aminoacyl-trna-formation',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: "Distinguish translation's own machinery from the spliceosome, which processes RNA before translation.",
      explanations: {
        a: 'Ribosomes are explicitly part of translation, carrying the peptidyl transferase activity — relevant, not the exception.',
        b: 'Peptidyl transferase, part of the 60S ribosomal subunit, catalyses the peptide bond itself — relevant, not the exception.',
        c: 'Correct. The spliceosome removes introns and joins exons during mRNA splicing, a nuclear, post-transcriptional step that happens before the finished mRNA ever reaches a ribosome — it plays no part in translation itself.',
        d: "Amino acyl-tRNA synthetase activates and loads amino acids onto tRNA, a step translation explicitly requires — relevant, not the exception.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p70-q16',
      conceptKey: 'translation-elongation-and-peptide-bond-formation',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: "State that the polypeptide's amino acid order is set by the mRNA's codon order.",
      explanations: {
        a: 'Correct. During elongation, the aminoacyl-tRNA bound at each step is determined by the mRNA codon aligned with the A site, so the order amino acids are added in — the polypeptide sequence — directly follows the order of codons on the mRNA.',
        b: "tRNA nucleotides form the anticodon and the rest of the tRNA structure; it is the codon they read, not the tRNA's own nucleotide sequence, that sets the amino acid order.",
        c: "rRNA does not carry anticodons; anticodons belong to tRNA, and rRNA's part is structural/catalytic (peptidyl transferase), not information-carrying.",
        d: "rRNA nucleotides form the ribosome's structure and its catalytic peptidyl transferase site; they do not dictate which amino acid goes where in the chain.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p70-q17',
      conceptKey: 'translation-initiation-steps-and-met-trnai',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name methionyl-tRNA (Met-tRNAi) as the tRNA that initiates eukaryotic translation.',
      explanations: {
        a: "Correct. The book's initiation steps have 'the initiating methionyl tRNA (Met-tRNAi)' bind to the AUG start codon on the mRNA — methionyl-tRNA is the eukaryotic initiator.",
        b: "Formylmethionyl-tRNA does not appear anywhere in the book's eukaryotic initiation steps, which name only methionyl-tRNA (Met-tRNAi).",
        c: 'Tyrosine is not the amino acid AUG codes for; AUG is the initiation codon for methionine, so the initiator tRNA carries methionine, not tyrosine.',
        d: 'Alanyl-tRNA carries alanine, not the methionine that AUG, the initiation codon, specifies.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p71-q18',
      conceptKey: 'translation-elongation-and-peptide-bond-formation',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name peptidyl transferase as the enzyme that forms the peptide bond.',
      explanations: {
        a: 'Correct. The book states that peptidyl transferase, part of the 60S subunit, forms the peptide bond between the amino group of the new aminoacyl-tRNA in the A site and the carboxylic group of the peptidyl chain in the P site.',
        b: 'Glucosyl transferase adds sugar groups (as in glycosylation, a post-translational modification); it has no role in bond formation between amino acids.',
        c: 'Peptidyl polymerase is not a book-named enzyme; peptide bond formation is credited specifically to peptidyl transferase.',
        d: 'Aminoacyl-tRNA synthetase attaches an amino acid to its tRNA before elongation begins; it does not form the bond between two amino acids already on the ribosome.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p71-q19',
      conceptKey: 'translation-elongation-and-peptide-bond-formation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Locate peptidyl transferase activity on the 60S ribosomal subunit.',
      explanations: {
        a: 'The 40S subunit is where the mRNA first binds and slides to find the AUG start codon during initiation; peptidyl transferase activity is on the large subunit, not this one.',
        b: 'Correct. The book states that peptidyl transferase is an enzyme that is part of the 60S subunit.',
        c: 'eEF-2 is an elongation factor name, not the ribosomal subunit carrying the catalytic activity itself, and this book does not credit it with peptidyl transferase activity.',
        d: 'Aminoacyl-tRNA is the substrate peptidyl transferase acts on, not the enzyme itself or its location.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p71-q20',
      conceptKey: 'post-translational-trimming-of-precursor-proteins',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise trimming as a post-translational modification, distinct from mRNA-processing steps.',
      explanations: {
        a: "5'-capping is a post-transcriptional modification of mRNA, not a post-translational modification of a finished protein.",
        b: 'Correct. Trimming — the proteolytic removal of a segment from a precursor protein — is one of the book’s two post-translational modifications, alongside covalent modification.',
        c: "3'-polyadenylation is a post-transcriptional modification of mRNA, not a post-translational one.",
        d: 'Splicing removes introns from the primary RNA transcript; it is a post-transcriptional, not post-translational, event.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p71-q21',
      conceptKey: 'post-translational-trimming-of-precursor-proteins',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: "Name trypsinogen activation as the book's zymogen example of trimming.",
      explanations: {
        a: 'Correct. The book names trypsinogen becoming activated to trypsin in the small intestine as its example of a zymogen (inactive enzyme precursor) activated by trimming — proteolytic removal of part of the chain.',
        b: 'Phosphorylation is covalent modification by addition of a phosphate group, unrelated to the proteolytic cleavage that activates trypsinogen.',
        c: 'Glycosylation adds a carbohydrate group and marks proteins for secretion or the lysosome/membrane; it is not how trypsinogen is activated.',
        d: 'Carboxylation adds a carboxyl group, as in clotting-protein activation for calcium binding; it is not how trypsinogen is converted to trypsin.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p71-q23',
      conceptKey: 'post-translational-covalent-modification-types',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name carboxylation as the covalent modification that lets clotting proteins bind calcium.',
      explanations: {
        a: 'Phosphorylation regulates enzyme activity (e.g. glycogen metabolism enzymes) by adding a phosphate group; it is not what lets clotting proteins bind calcium.',
        b: 'Glycosylation adds carbohydrate groups, mainly to proteins destined for secretion, lysosomes or membranes — not the modification behind calcium binding in clotting.',
        c: 'Hydroxylation of prolyl/lysyl residues stabilises collagen; it is not the modification that lets clotting proteins bind calcium.',
        d: 'Correct. The book states that carboxylation forms γ-carboxyglutamate, which allows clotting proteins to bind Ca2+, a step in clot formation.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p71-q24',
      conceptKey: 'gene-mutation-types-substitution-transition-transversion-and-frameshift',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Identify a deletion by comparing the length and bases of two aligned DNA sequences.',
      explanations: {
        a: 'Correct. Aligning the two sequences shows the second strand is one base shorter than the first — a base has been lost, which is a deletion.',
        b: 'An insertion would make the second, changed strand longer than the first, not shorter.',
        c: 'A substitution keeps both strands the same length, with one base replaced by another; here the second strand has fewer bases altogether.',
        d: 'The strands are not identical in length, so this is a mutation, not "no mutation."',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p72-q25',
      conceptKey: 'gene-mutation-types-substitution-transition-transversion-and-frameshift',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise a purine-for-purine substitution as a transition.',
      explanations: {
        a: 'Adenine (a purine) replaced by cytosine (a pyrimidine) crosses between the two base classes — that is a transversion, not a transition.',
        b: 'Uracil (a pyrimidine, and not even a DNA base) replaced by adenine (a purine) crosses between classes — a transversion pattern, not a transition.',
        c: "Correct. Guanine and adenine are both purines, so one replacing the other is a purine-for-purine substitution — the book's definition of a transition.",
        d: 'Guanine (a purine) replaced by uracil (a pyrimidine, and not a DNA base) crosses between classes — a transversion pattern, not a transition.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p72-q26',
      conceptKey: 'gene-mutation-types-substitution-transition-transversion-and-frameshift',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise a pyrimidine-for-purine substitution as a transversion.',
      explanations: {
        a: "'Transposition' is not one of the book's two named substitution types; the book names only transition and transversion.",
        b: 'Correct. Thymine (a pyrimidine) replaced by adenine (a purine) crosses between the two base classes — the book’s definition of a transversion.',
        c: 'A transition keeps the substitution within one base class (purine-for-purine or pyrimidine-for-pyrimidine); thymine to adenine crosses classes, so it cannot be a transition.',
        d: 'A frameshift mutation results from an insertion or deletion that is not a multiple of three bases, not from a single base substitution.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p72-q27',
      conceptKey: 'gene-mutation-types-substitution-transition-transversion-and-frameshift',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify a 1-2 base indel as a frameshift mutation.',
      explanations: {
        a: "Missense mutation is an effect of a base substitution changing one codon's amino acid, not the name for a 1-2 base insertion/deletion.",
        b: 'Silent mutation is an effect of a base substitution that leaves the amino acid unchanged; it does not describe an insertion or deletion.',
        c: 'Correct. The book states that inserting or deleting a number of bases that is not a multiple of three — such as one or two bases — shifts the reading frame, producing a frameshift mutation.',
        d: 'Nonsense mutation is an effect of a base substitution that creates a premature stop codon; it is not what an indel of one or two bases is called.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p72-q28',
      conceptKey: 'point-mutation-types-and-consequences',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: "Name sickle cell anaemia as the book's example of a missense mutation.",
      explanations: {
        a: "Nonsense mutation creates a premature stop codon and usually a non-functional truncated protein (the book's example is thalassaemia) — not the sickle cell mechanism, which changes rather than truncates the chain.",
        b: 'Correct. The book names sickle cell anaemia as its example of a missense mutation, in which glutamate is replaced by valine at position six of the β chain.',
        c: 'A silent mutation changes the codon to a synonym for the same amino acid, so the protein is unchanged — sickle cell anaemia is caused by an actual amino acid change, not a silent one.',
        d: 'A frameshift mutation comes from an insertion or deletion that is not a multiple of three bases, not from a single base substitution changing one codon’s amino acid, which is what causes sickle cell anaemia.',
      },
    },
  ],
}
