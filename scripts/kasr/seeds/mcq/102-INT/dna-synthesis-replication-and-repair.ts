/**
 * `102 INT > Biochemistry > DNA Synthesis (Replication) and Repair` — the
 * question books' MCQs.
 *
 * 22 rows, grounded entirely in the department book's own chapter
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * p81–p85: "X- EUKARYOTIC DNA SYNTHESIS (REPLICATION)" through the start of
 * "DNA Repair"). 16 rows keep their printed key as-is; 3 rows had no
 * recoverable printed key (`correctSource: "none"`) but the book settles the
 * answer cleanly, so those carry an `answerOverride`; 3 rows are excluded —
 * one because its printed-key option (direction of replication) is OCR-
 * garbled into an unreadable fragment ("3 'to3'"), and two because they test
 * telomerase's reverse-transcriptase mechanism and RNA template, which this
 * book's telomere section (p84) never states — it only says telomerase
 * "restores chromosomal length," not how.
 *
 * Two concepts are reused from the Chemistry of Nucleic Acids chapter rather
 * than re-minted: `dna-double-helix-antiparallel-strands` grounds the two
 * base-composition arithmetic questions (Watson-Crick pairing: A with T, G
 * with C), since that is exactly the fact those questions turn on. One
 * concept, `cell-cycle-phases-g1-s-g2-m-g0`, is minted here but homed in the
 * Cell Cycle, Apoptosis, and Tumor Suppressor Genes chapter (its authoritative
 * page, p107) and reused verbatim in that chapter's own leaf file, because
 * both chapters' question books independently ask which phase DNA replication
 * occurs in.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'DNA Synthesis (Replication) and Repair',
  modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
  articleId: 'ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR',

  concepts: [
    {
      key: 'eukaryotic-dna-polymerases-and-roles',
      label:
        'The five eukaryotic DNA polymerases divide the work of replication: α primes, β repairs, γ copies mitochondrial DNA, δ makes the lagging strand and ε makes the leading strand',
      definition:
        'DNA polymerase α, as the α–primase complex, lays down the RNA primers and the short DNA attached to them. DNA polymerase β fills the gap in DNA repair. DNA polymerase γ synthesises mitochondrial DNA. DNA polymerase δ synthesises the lagging strand from many primers, discontinuously as Okazaki fragments. DNA polymerase ε synthesises the leading strand continuously from a single primer. Polymerases δ and ε also proofread by exonuclease activity.',
      objective:
        'Name the five eukaryotic DNA polymerases and give the specific job each one does.',
      pitfall:
        'Swapping δ and ε. Epsilon makes the leading strand and needs only one primer; delta makes the lagging strand and needs many.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'classification',
    },
    {
      key: 'replication-fork-strand-separation',
      label:
        'A replication fork is made by two proteins working together — helicase breaks the hydrogen bonds to open the duplex, and single-strand binding proteins hold the separated strands apart and protect them',
      definition:
        'Helicase enzyme molecules attach at each origin of replication and unwind the DNA by breaking the hydrogen bonds between the nitrogenous base pairs, producing replication bubbles. Single strand binding (SSB) proteins then bind to the single strands of the unwound DNA and stabilise them; without SSB proteins the two strands would simply rewind, and the proteins also protect the single strand from nucleases that cleave single-stranded DNA. It is the action of helicase and SSB proteins together that creates the replication fork. Topoisomerases relieve the supercoils that unwinding generates ahead of the fork.',
      objective:
        'Name the two proteins that open and hold open the parental duplex at a replication fork and state what each contributes.',
      pitfall:
        'Expecting the strands to stay apart once helicase has passed. Complementary single strands re-anneal spontaneously; the SSB proteins are what keep the template available, which is why they are drawn coating the separated strands rather than sitting at the fork apex.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'mechanism',
    },
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
      key: 'dna-replication-is-semiconservative',
      label:
        'DNA replication is semi-conservative: each daughter molecule keeps one original parental strand and gains one newly synthesized strand',
      definition:
        'DNA replication is the process by which a double-stranded DNA molecule is copied to produce two identical daughter DNA molecules, catalysed mainly by DNA polymerases. Each parental strand acts as a template for a new complementary strand, so each daughter molecule is made of one original (conserved) strand and one newly synthesized strand — this pairing of one old and one new strand in every daughter molecule is what makes the mechanism semi-conservative.',
      objective:
        "State what 'semi-conservative' means for DNA replication and identify it as the mechanism eukaryotic cells use.",
      pitfall:
        'Confusing semi-conservative with conservative replication, where an entire original duplex would stay intact while a wholly new duplex formed beside it. Real replication mixes one old strand with one new strand in every daughter molecule; neither original duplex survives whole.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'mechanism',
    },
    {
      key: 'rna-primer-required-for-dna-synthesis-initiation',
      label:
        'DNA polymerases cannot begin synthesizing a new strand without a short RNA primer laid down first by the DNA polymerase α–primase complex',
      definition:
        "At the replication fork both parental strands serve as templates, but DNA polymerases cannot initiate DNA synthesis without an RNA primer already present. The RNA primer is a short segment of RNA that serves as a binding site for DNA polymerase; it is formed by the DNA polymerase α–primase complex and base-paired to the parental strand. The primer's 5' end attaches to the 3' end of the parental strand, and its own 3' end is what accepts the first deoxynucleotide DNA polymerase adds.",
      objective:
        'State why DNA polymerases require an RNA primer before they can synthesize DNA, and name the complex that lays the primer down.',
      pitfall:
        "Assuming DNA polymerase can start a new chain from nothing, or that the primer itself is made of DNA. It is RNA, made by the α–primase complex; DNA polymerase can only extend an existing 3'-OH end, never create one.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'mechanism',
    },
    {
      key: 'multiple-origins-of-replication-and-orc-proteins',
      label:
        'Eukaryotic chromosomes replicate from many AT-rich origins at once, each recognized and opened by origin recognition complex (ORC) proteins',
      definition:
        'Replication begins with the opening of DNA at multiple origins of replication. Many origins, rich in AT base pairs, are scattered across each chromosome and serve as starting points; they are recognized by origin recognition complex (ORC) proteins, which bind the origins and produce local opening and unwinding of the DNA double helix. Using multiple origins rather than one markedly decreases the total time replication takes, since many replication forks can work simultaneously along the same chromosome.',
      objective:
        'State why eukaryotic chromosomes use many replication origins rather than one, and name the protein complex that recognizes and opens them.',
      pitfall:
        'Crediting ribosomes, rather than origin recognition complex (ORC) proteins, with binding the origins — ribosomes have no role anywhere in DNA replication; they belong to protein synthesis.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'mechanism',
    },
    {
      key: 'cell-cycle-phases-g1-s-g2-m-g0',
      label:
        'The cell cycle divides into G1, S, G2 and M phases of active division, plus a G0 resting phase, and DNA is copied only during S phase',
      definition:
        'The cell cycle is divided into the mitotic phase (M) and interphase, which is further divided into G1, S and G2. G1 is the stage where the cell grows by increasing in size. S is the stage where the cell copies all its DNA — during S all the genetic material is duplicated. G2 is a further growth stage that prepares the cell to divide. M is mitosis, where the cell separates the two copies of its genetic material into two identical daughter cells. After passing through mitosis and into G1, a cell either continues through another division or stops dividing, entering the quiescent G0 phase; in G0 the cell rests, performing its function without dividing, and G0 is a permanent state for some cells, such as most adult neurons.',
      objective:
        'Name each phase of the cell cycle and its role, and identify S as the only phase in which DNA replication occurs.',
      pitfall:
        'Treating G0 as just another phase of the active cycle rather than an exit from it — G0 is the resting, non-dividing state a cell enters after G1, and for some cells (like adult neurons) it is permanent.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
      type: 'classification',
    },
    {
      key: 'termination-of-replication-primer-removal-and-ligation',
      label:
        'Replication finishes when RNase H removes the RNA primers, a DNA polymerase fills the resulting gaps, and DNA ligase joins the adjacent DNA fragments',
      definition:
        'Termination of replication removes the primers and joins the fragments in two steps. First, RNase H removes the RNA primers by its exonuclease activity, and a DNA polymerase fills the gaps this leaves between Okazaki fragments. Second, DNA ligase joins the ends of the adjacent DNA fragments, sealing the nicks between them — an ATP-requiring step.',
      objective:
        'Put the termination steps of replication in order: primer removal by RNase H, gap-filling by DNA polymerase, and sealing by DNA ligase.',
      pitfall:
        'Crediting DNA ligase with removing the RNA primers. Ligase only seals an existing nick between two already-complete DNA fragments; RNase H is the enzyme that clears the RNA primer out of the way first.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'mechanism',
    },
    {
      key: 'telomere-structure-and-function-in-replication',
      label:
        'Telomeres are the repetitive TTAGGG sequence and protective loop at chromosome ends that telomerase restores, because ordinary lagging-strand synthesis alone would shorten the chromosome every cycle',
      definition:
        "The ends of eukaryotic linear chromosomes are called telomeres. Their 3' strand carries a non-coding sequence (5'-TTAGGG-3') repeated thousands of times, and this 3' strand is longer than its complementary 5' strand by a few hundred nucleotides; the extra single-stranded 3' end folds back on itself into a loop stabilized by protein, which prevents chromosome stacking and protects the ends from nucleases. During replication, the leading strand can be copied to the very end of its parent strand, but the lagging strand cannot: primase cannot act at the 3' end because the space is too narrow, and even if it did, removing that last RNA primer would leave a short gap. Left alone this shortens the chromosome with every replication cycle; a telomerase enzyme solves the problem by restoring the chromosome's length.",
      objective:
        'Name the repeated telomeric sequence and its loop structure, and explain why lagging-strand synthesis alone would shorten a chromosome with each replication cycle.',
      pitfall:
        "Reaching for telomerase's reverse-transcriptase mechanism or an RNA template to explain how it restores length — the book states only that telomerase restores chromosomal length, not the mechanism by which it does so.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > DNA Synthesis (Replication) and Repair',
      type: 'mechanism',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p57-q1',
      conceptKey: 'dna-replication-is-semiconservative',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'Identify semi-conservative replication as the defining feature of how DNA is copied.',
      explanations: {
        a: "Correct. Each daughter DNA molecule keeps one original (conserved) parental strand and gains one newly synthesized strand — the book's own definition of semi-conservative replication.",
        b: "Only true of the lagging strand. The leading strand is synthesized continuously, so 'discontinuous' describes one of the two new strands, not replication as a whole.",
        c: 'Wrong direction of error. Eukaryotic replication starts at many origins across each chromosome and proceeds outward from each one, which makes it multi-directional at each origin, not unidirectional.',
        d: 'Mixes up two different enzymes. DNA ligase seals the nicks between finished fragments; DNA polymerases are what actually build the new strand by adding nucleotides.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p57-q2',
      conceptKey: 'dna-replication-is-semiconservative',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'Name the mechanism in which one new strand is built against one old strand as semi-conservative.',
      explanations: {
        a: 'A mutation is an error in the copied sequence, not a description of the copying mechanism itself.',
        b: "Correct. One strand of each daughter molecule is the original parental strand and one is newly synthesized against it — that pairing of one old, one new strand per daughter molecule is what 'semi-conservative' names.",
        c: "Discontinuous describes how the lagging strand is built, in Okazaki fragments — it is not the term for the old-strand/new-strand relationship the question describes.",
        d: 'Conservative would mean the original duplex stays entirely intact and a wholly new duplex forms alongside it. That is the opposite of what happens; DNA replication mixes one old and one new strand in each daughter molecule.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p57-q3',
      conceptKey: 'excluded.replication-direction-garbled-option',
      difficulty: 'Moderate',
      questionType: 'Not applicable — excluded',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "Option b, the printed key, is OCR-garbled beyond repair (\"3 'to3'\") and cannot be confirmed to read '5' to 3'', which is what the book's own text supports (p82: DNA polymerases 'synthesize the new strands in 5' to 3' direction'). Without a legible option b, the option set cannot be presented to a student.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p57-q4',
      conceptKey: 'replication-fork-strand-separation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'Identify helicase as the enzyme that unwinds the parental duplex at the replication fork.',
      explanations: {
        a: 'Correct. Helicase enzyme molecules attach at each origin and unwind the DNA by breaking the hydrogen bonds between base pairs, producing the replication bubble.',
        b: "'Replicase' is not a name the book uses for any replication enzyme — a plausible-sounding invented term, not the enzyme that opens the duplex.",
        c: 'DNA polymerase builds the new strand once the template is already single-stranded; it does not do the unwinding that exposes the template in the first place.',
        d: 'DNA ligase works at the very end of the process, sealing nicks between finished fragments — it has no role in opening the helix.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p57-q5',
      conceptKey: 'eukaryotic-dna-polymerases-and-roles',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective:
        'State that DNA polymerases are the enzymes that catalyze the elongation of a DNA strand.',
      explanations: {
        a: 'Correct. DNA polymerases catalyse the formation of polynucleotide chains, adding complementary nucleotides base-paired with the parental strand — this is elongation.',
        b: 'Helicase\'s job is upstream of elongation: it unwinds the duplex so a template is available, but it does not add nucleotides itself.',
        c: 'DNA ligase acts after elongation is finished, joining the ends of adjacent fragments rather than extending a strand.',
        d: 'Primase lays down the short RNA primer elongation starts from, but it is the polymerase, not the primase, that carries out the actual chain extension.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p57-q6',
      conceptKey: 'rna-primer-required-for-dna-synthesis-initiation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'Place RNA primer formation as the initiation step that must occur before a new DNA strand can be elongated.',
      explanations: {
        a: "Correct. DNA polymerases cannot initiate DNA synthesis without an RNA primer already in place — primer formation is the book's initiation step, carried out before elongation can begin.",
        b: 'Reverses the order. The primer has to exist before DNA polymerase can extend anything from it, not after.',
        c: 'Transcription is a separate process (making RNA from a DNA template for gene expression) — the RNA primer is a replication tool, not a product of, or a step before, transcription.',
        d: 'Same mix-up as the transcription option, in the other direction — the primer has nothing to do with when transcription happens.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q7',
      conceptKey: 'rna-primer-required-for-dna-synthesis-initiation',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'Identify the RNA primer as a short RNA molecule, not a sugar, a bare deoxyribose, or a protein.',
      explanations: {
        a: 'Five-carbon sugars are the backbone components of nucleotides, not a molecule that base-pairs with a template to prime synthesis.',
        b: 'Deoxyribose alone is a sugar with no base or phosphate — it cannot base-pair with anything or serve as a binding site for a polymerase.',
        c: "Correct. The book states the RNA primer is a short segment of RNA, formed by the DNA polymerase–primase complex and base-paired to the parental strand, giving DNA polymerase a 3'-OH end to extend.",
        d: 'Proteins do bind DNA (e.g., SSB proteins, histones), but none of them serves as the primer DNA polymerase extends — that role belongs specifically to a short RNA sequence.',
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered for this row (correctSource: none). The book states directly (p82) that 'RNA primer is a short segment of RNA used as a binding site for DNA polymerase', which is option c.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q8',
      conceptKey: 'dna-double-helix-antiparallel-strands',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective:
        'Apply complementary base pairing (A pairs with T) to compute the base composition of a newly synthesized complementary strand.',
      explanations: {
        a: "Correct. Adenine pairs with thymine, so wherever the template strand carries an A, the new complementary strand carries a T. The template is 20% A, so the new strand is 20% T.",
        b: "22.5% is not the composition of any single base in either strand here — it looks like an average of two of the template's percentages, which is not how complementary pairing works.",
        c: "25% is the template strand's own T content, not the new strand's. Copying the template's T percentage straight into the answer pairs T with itself instead of pairing template-A with new-T.",
        d: "30% is the template's G content. Since G pairs with C, the new strand's C content would be 30%, not its T content — this option confuses which base ends up complementary to which.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q9',
      conceptKey: 'eukaryotic-dna-polymerases-and-roles',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        "State that the two new DNA strands are synthesized differently — one continuously, one discontinuously — because DNA polymerase can only read 3' to 5'.",
      explanations: {
        a: "Only the lagging strand is made discontinuously. DNA polymerase ε makes the leading strand continuously from a single primer, so 'both' overstates it.",
        b: 'Correct. The leading strand is synthesized continuously by polymerase ε while the lagging strand is built discontinuously, as Okazaki fragments, by polymerase δ.',
        c: "Only the leading strand is continuous. The lagging strand's Okazaki fragments make continuous synthesis on both strands impossible given the fork's single overall direction of travel.",
        d: 'Both strands need an RNA primer — the lagging strand actually needs many primers, one per Okazaki fragment, so a single primer is not enough for even one strand, let alone both.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q10',
      conceptKey: 'eukaryotic-dna-polymerases-and-roles',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        'Identify Okazaki fragments as short pieces of newly synthesized DNA on the lagging strand.',
      explanations: {
        a: 'mRNA is synthesized continuously during transcription; it is not built in short fragments the way the lagging strand of DNA is.',
        b: 'tRNA is transcribed as a single continuous molecule that then folds into its cloverleaf shape — it has no Okazaki-fragment-style discontinuous synthesis.',
        c: 'rRNA, like the other RNA types, is synthesized continuously by transcription, not in short discontinuous pieces.',
        d: 'Correct. Okazaki fragments are the short pieces of DNA that polymerase δ builds discontinuously while copying the lagging strand at the replication fork.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q11',
      conceptKey: 'cell-cycle-phases-g1-s-g2-m-g0',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        'Place DNA replication specifically in the S (synthesis) phase of the cell cycle.',
      explanations: {
        a: 'G1 is a growth phase in which the cell increases in size before committing to divide; DNA is not yet being copied.',
        b: "Correct. S stands for synthesis of DNA — during S phase all of the cell's genetic material is duplicated, and it is the only phase in which replication occurs.",
        c: 'G2 is a further growth phase that prepares the cell for mitosis, after DNA has already been duplicated in S phase.',
        d: 'M phase is mitosis, where the two already-duplicated copies of the genetic material are separated into two daughter cells — no new DNA synthesis happens here.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q12',
      conceptKey: 'multiple-origins-of-replication-and-orc-proteins',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'State that eukaryotic chromosomes replicate from many origins at once, recognized by origin recognition complex (ORC) proteins.',
      explanations: {
        a: 'Correct. The book states many origins, rich in AT base pairs, serve as starting points across each chromosome, and that using multiple origins markedly decreases the time replication takes.',
        b: 'Origin recognition complex (ORC) proteins bind the origins, not ribosomes. Ribosomes have no role in DNA replication — they are the site of protein synthesis.',
        c: "Only the leading strand is synthesized continuously; the lagging strand is built discontinuously as Okazaki fragments, so 'continuous synthesis on both strands' is contradicted by the book's own description of the fork.",
        d: 'DNA replication is semi-conservative, not conservative — each daughter molecule keeps one old strand and gains one new one, rather than one daughter keeping an entirely intact original duplex.',
      },
      answerOverride: 'a',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book directly supports option a (p81: 'Many origins across the chromosomes... serve as starting points for replication... The presence of multiple replication origins markedly decreases the time needed for replication') and directly contradicts the other three: ORC proteins, not ribosomes, bind the origins (b); only the leading strand is synthesized continuously, not both strands (c); and replication is semi-conservative, not conservative (d).",
    },
    {
      key: 'MCQ-102-07f0a0ff-p58-q13',
      conceptKey: 'replication-fork-strand-separation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'State that single-strand binding proteins stabilize and protect the unwound single strands of DNA at the replication fork.',
      explanations: {
        a: 'Synthesizing the RNA primer is the job of the DNA polymerase–primase complex, not of SSB proteins.',
        b: 'Removing mispaired nucleotides by 3\'-5\' exonuclease activity is the proofreading function of DNA polymerases ε and δ, not of SSB proteins.',
        c: 'Correct. SSB proteins bind the single strands of unwound DNA and stabilize them — without them the two strands would simply rewind — and they also protect the exposed single strand from nucleases.',
        d: 'Cutting and resealing DNA ahead of the fork to relieve supercoiling is the job of topoisomerases, not SSB proteins.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p59-q14',
      conceptKey: 'rna-primer-required-for-dna-synthesis-initiation',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'Identify RNA, not DNA, histone, or protein, as the chemical nature of the short primer strand.',
      explanations: {
        a: 'DNA is what the primer allows to be synthesized afterward — the primer that gets DNA synthesis started is itself made of RNA, not DNA.',
        b: 'Correct. The short primer strand required to start DNA replication is RNA, formed by the DNA polymerase–primase complex and base-paired to the parental strand.',
        c: 'Histones are structural proteins that package finished DNA into nucleosomes; they play no role in priming new strand synthesis.',
        d: 'Protein is too broad and simply wrong here — the primer is a nucleic acid (RNA), not a protein, even though proteins such as primase are what synthesize it.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p59-q17',
      conceptKey: 'eukaryotic-dna-polymerases-and-roles',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective:
        "State that the lagging strand's discontinuous synthesis requires a fresh RNA primer for every Okazaki fragment.",
      explanations: {
        a: "All new DNA strands, leading and lagging alike, are synthesized 5' to 3' — this option reverses the direction of synthesis.",
        b: 'The lagging strand is copied in the direction opposite the advancing replication fork, so each new fragment is actually built away from the fork, not toward it.',
        c: 'Correct. DNA polymerase δ needs a new RNA primer to start each Okazaki fragment, so, unlike the single-primer leading strand, the lagging strand requires multiple RNA primers.',
        d: 'The lagging strand is the one synthesized discontinuously, in short Okazaki fragments — continuity describes the leading strand instead.',
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book supports option c directly: multiple RNA primers are required by DNA polymerase δ to synthesize the lagging strand (p82). The other three are directly contradicted: the lagging strand is synthesized 5' to 3', not 3' to 5' (a); it is copied in the opposite direction of the advancing fork, so it does not progress toward the fork (b); and it is synthesized discontinuously as Okazaki fragments, not continuously (d).",
    },
    {
      key: 'MCQ-102-07f0a0ff-p59-q18',
      conceptKey: 'termination-of-replication-primer-removal-and-ligation',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        'Name RNase H as the enzyme that removes RNA primers during termination of eukaryotic replication.',
      explanations: {
        a: 'DNA polymerase α, as part of the primase complex, lays the primer down in the first place — it does not remove it afterward.',
        b: 'RNA primase is the enzyme that synthesizes the RNA primer, which is the opposite job from removing it.',
        c: "This option repeats another DNA polymerase without changing the enzyme's job — DNA polymerases build or fill strands; primer removal is a separate, exonuclease-driven step.",
        d: 'Correct. RNase H removes the RNA primers by its exonuclease activity, clearing the way for the gaps to be filled and the fragments joined.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p59-q19',
      conceptKey: 'termination-of-replication-primer-removal-and-ligation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'Identify DNA ligase as the enzyme that seals the nicks left between adjacent Okazaki fragments.',
      explanations: {
        a: "Gyrase is a bacterial type of topoisomerase; it is not the enzyme the book names for joining fragments in eukaryotic replication.",
        b: 'Correct. Once RNase H has removed the primers and the gaps are filled, DNA ligase joins the ends of the adjacent DNA fragments.',
        c: 'Polymerase fills the gap left after primer removal, but it cannot seal the final nick between two DNA fragments — that step needs ligase.',
        d: "Helicase's job is unwinding the parental duplex at the start of replication; it plays no part in sealing fragments together at the end.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p59-q20',
      conceptKey: 'replication-fork-strand-separation',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        'State that topoisomerases relieve the supercoiling generated ahead of the replication fork.',
      explanations: {
        a: 'Correct. As the fork advances and DNA unwinds, supercoils build up ahead of it; topoisomerases remove this supercoiling.',
        b: 'Binding the origin sites is the job of origin recognition complex (ORC) proteins, not topoisomerases.',
        c: 'Opening the double-stranded DNA at the fork itself is helicase\'s job — topoisomerases work ahead of the fork on the still-wound DNA, relieving the strain unwinding creates, rather than doing the unwinding at the fork.',
        d: "Joining Okazaki fragments with phosphodiester bonds is DNA ligase's job, a completely different enzyme working at a different stage of replication.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p60-q21',
      conceptKey: 'termination-of-replication-primer-removal-and-ligation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        "State that DNA ligase's function is to join the Okazaki fragments of the lagging strand.",
      explanations: {
        a: "Ligase acts at the end of replication on both strands' finished fragments, not specifically 'on' the leading strand, which does not need fragment-joining at all since it is made continuously.",
        b: "Ligase does not undo anything DNA polymerase does — it completes the polymerase's work by sealing the nick left after the gap has been filled.",
        c: 'Correct. DNA ligase joins the ends of adjacent DNA fragments, sealing the nicks left between Okazaki fragments once their RNA primers are removed and the gaps filled.',
        d: 'Winding the leading and lagging strands together is not a step the book describes at all, and it is not what ligase does — ligase seals covalent breaks, it does not wind strands.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p60-q22',
      conceptKey: 'telomere-structure-and-function-in-replication',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'Name telomeres as the repeated sequence found at the ends of eukaryotic chromosomes.',
      explanations: {
        a: 'A kinetochore is the site on a chromosome where spindle fibres attach during mitosis — a different structure from the repeated end sequence being described here.',
        b: "Correct. Telomeres are the ends of eukaryotic linear chromosomes, carrying a non-coding sequence (5'-TTAGGG-3') repeated thousands of times.",
        c: 'A centriole is a cytoplasmic organelle involved in organizing the mitotic spindle — it has nothing to do with the repeated DNA sequence at chromosome ends.',
        d: 'Chromomere is not a term the book uses for the chromosome-end structure — it names beads of tightly coiled chromatin seen along a chromosome, not the telomeric repeat.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p60-q23',
      conceptKey: 'excluded.telomerase-reverse-transcriptase-not-taught',
      difficulty: 'Moderate',
      questionType: 'Not applicable — excluded',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "Tests that telomerase has reverse transcriptase activity. The book only says telomerase 'restores chromosomal length' (p84) — it never describes telomerase's mechanism, names it a reverse transcriptase, or mentions an RNA template. Not taught in the module book.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p60-q24',
      conceptKey: 'excluded.telomerase-mechanism-not-taught',
      difficulty: 'Moderate',
      questionType: 'Not applicable — excluded',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "Option d ('all the above') requires options a (reverse transcriptase) and b (RNA template) to also be true, and neither is stated anywhere in the book's account of telomerase (p84), which describes only what the repeat sequence is and that telomerase restores chromosome length after each replication cycle. Not taught in the module book.",
    },
  ],
}
