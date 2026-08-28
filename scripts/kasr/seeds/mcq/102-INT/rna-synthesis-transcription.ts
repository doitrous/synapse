/**
 * `102 INT > Biochemistry > RNA Synthesis (Transcription)` — the question
 * books' MCQs.
 *
 * 23 rows, triaged against the department book's own pages (physical p86-91,
 * `scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`). Three rows
 * carried a printed key the two OCR passes read differently (`p61-q2`,
 * `p62-q8`, `p63-q16`); the book's own text settles each of them, so they get
 * an `answerOverride` rather than an exclusion. Two rows are excluded: the
 * 5'-cap bond-chemistry question (`p63-q14`) asks for a phosphate-bridge
 * structure the book never describes beyond "a cap is added"; the base-count
 * word problem (`p63-q19`) needs the concept of a 5'/3' untranslated region,
 * which this book never introduces, even though its printed key happens to
 * match the underlying arithmetic.
 *
 * Two concepts are reused from the existing 102 INT biochemistry set —
 * `eukaryotic-transcription-elements-and-mrna-processing` (promoter
 * elements, TFIID/TFIIH, RNA polymerase II, capping/poly-A/half-life,
 * alternative splicing) and `mrna-splicing-and-alternative-splicing`
 * (splicing mechanism, snRNP spliceosome, the SLE clinical correlation,
 * alternative splicing) — since between them they already state most of
 * this chapter's own content. The rest are minted fresh: the template-strand/
 * complementarity principles that open the chapter, the three RNA polymerase
 * types, the shared protective role of capping and polyadenylation, and the
 * ApoB mRNA-editing example, each a distinct fact the reused concepts do not
 * cover.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'RNA Synthesis (Transcription)',
  modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
  articleId: 'ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION',

  concepts: [
    {
      key: 'transcription-template-strand-and-rna-complementarity',
      label:
        "Only the template strand of DNA is transcribed; RNA is complementary and antiparallel to it, identical to the coding strand except U replaces T, and is built from ATP, GTP, CTP and UTP",
      definition:
        "Synthesis of RNA from DNA is known as transcription. Only one strand of DNA is transcribed: the strand transcribed into RNA is the template strand, and the other strand is the coding strand. The sequence of RNA is complementary to the sequence of the template strand, and it is the same as that of the coding strand except for U replacing T. The RNA polymerase II-TFIIF complex synthesises the complementary transcript of the template DNA strand using ribonucleoside triphosphates — ATP, GTP, CTP and UTP — as substrates, releasing pyrophosphate each time a nucleotide is added; the transcriptional-unit diagram shows the RNA transcript running 5' to 3'.",
      objective:
        "Identify the template strand as the one actually transcribed, state that RNA is complementary to it (and identical to the coding strand except U for T), and name the four ribonucleoside triphosphates RNA polymerase uses.",
      pitfall:
        "Naming the coding strand as the one RNA is complementary to, or listing TTP among RNA polymerase's substrates. RNA is complementary to the template strand and matches the coding strand instead; and RNA polymerase uses UTP, never TTP, because RNA has no thymine.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
      type: 'mechanism',
    },
    {
      key: 'eukaryotic-rna-polymerase-types-i-ii-iii',
      label: 'Of the three nuclear RNA polymerases, I and III mainly make rRNA and tRNA while II alone makes mRNA, most snRNA and miRNA',
      definition:
        'There are three types of nuclear RNA polymerases: RNA polymerase I and III, for synthesis of rRNAs and tRNAs mainly; and RNA polymerase II, for synthesis of mRNAs, most small nuclear RNAs (snRNAs) and micro RNAs (miRNAs).',
      objective: 'Assign each of the three nuclear RNA polymerases (I, II, III) to the class of RNA it mainly synthesises.',
      pitfall:
        'Assuming one polymerase makes all RNA, or defaulting to RNA polymerase II for any RNA-polymerase question. Divided the job three ways: I and III cover the ribosomal and transfer RNAs, and II alone covers messenger RNA, snRNA and miRNA — so a question about a large ribosomal RNA gene points to RNA polymerase I, not II.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
      type: 'classification',
    },
    {
      key: 'eukaryotic-transcription-elements-and-mrna-processing',
      label:
        'The two promoter boxes divide the work — TATA says where transcription starts and CAAT and GC say how often — while TFIIH opens the strands, polyadenylation sets how long the message lives, and alternative splicing decides how many proteins the gene yields',
      definition:
        "RNA polymerase II synthesises messenger RNA, most small nuclear RNAs and micro RNAs. The eukaryotic promoter carries two basal expression elements: the TATA box, of sequence TATAAA and 20 to 30 base pairs upstream of the start site, which defines where transcription is to start along the DNA; and the CAAT box and GC box, 40 to 200 base pairs upstream, which define when transcription starts and so control how frequently the event occurs. TFIID binds the TATA box first and the other transcription factors and RNA polymerase II assemble on it to form the pre-initiation complex; TFIIH then separates the two DNA strands by its helicase activity and activates RNA polymerase II. After transcription, the primary transcript is capped at the 5' end, polyadenylated at the 3' end by poly(A) polymerase — and the length of the poly(A) tail determines the half-life of the mRNA — spliced, and edited. Alternative splicing splices the primary transcript of some genes differently to yield different proteins from one gene, which explains why the estimated number of proteins much exceeds the number of genes.",
      objective: 'Assign each promoter element, transcription factor and processing step to the specific job it does in the making of a mature messenger RNA.',
      pitfall:
        'Reading the TATA box and the CAAT box as two names for the same thing because both are upstream promoter elements. TATA fixes the start point and CAAT and GC set the frequency; a mutation in one changes where transcription begins and in the other changes how much message is made.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
      type: 'classification',
    },
    {
      key: 'mrna-capping-and-polyadenylation-protect-and-stabilize',
      label:
        "The 5' cap and the 3' poly(A) tail both protect mRNA from ribonuclease attack and stabilise it, and each also helps translation — capping aids ribosome recognition and nuclear export, and the poly(A) tail's length sets the mRNA's half-life",
      definition:
        "Capping at the 5' end adds a methyl-guanosine cap; this stabilises the mRNA and protects it against attack by ribonucleases, and it facilitates protein synthesis by helping transport the mRNA to the cytoplasm and allowing its recognition by ribosomes. Polyadenylation at the 3' end adds a poly(A) tail (up to 200 adenine residues), added by poly(A) polymerase (PAP); this too stabilises the mRNA and protects it against ribonuclease attack, the length of the poly(A) tail determines the half-life of the mRNA, and it increases the efficiency of protein synthesis by binding specific poly(A) tail-binding proteins.",
      objective: 'State what capping and polyadenylation each contribute to a mature mRNA: protection from ribonucleases, stabilisation, and support for efficient translation.',
      pitfall:
        "Assuming only the poly(A) tail protects mRNA from degradation. Credited the same protective, ribonuclease-resistance role to the 5' cap; the poly(A) tail's distinguishing extra role is that its length sets the mRNA's half-life.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
      type: 'mechanism',
    },
    {
      key: 'mrna-splicing-and-alternative-splicing',
      label: 'Splicing removes introns and joins exons using the snRNP spliceosome, and splicing the same primary transcript differently yields several proteins from one gene',
      definition:
        'The primary transcript, hnRNA, contains introns that do not code for amino acids lying between the coding exons. Splicing removes the introns and joins the exons to give functional mRNA, and it requires a spliceosome made of small nuclear ribonucleoproteins — snRNPs, built of special proteins and small nuclear RNAs. Alternative splicing splices the same primary transcript in different ways to yield different proteins from one gene, which is why the number of proteins far exceeds the number of genes.',
      objective:
        'Identify the post-transcriptional steps on the pathway diagram, name the ribonucleoproteins that carry out splicing, and explain what alternative splicing achieves.',
      pitfall:
        "Thinking alternative splicing is a fault that produces a wrong protein. It is a normal, regulated route by which one gene legitimately encodes several different products — the antibody genes are the example.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: ['SYS-IMM-T03-S01'],
      modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
      type: 'mechanism',
    },
    {
      key: 'mrna-editing-apob-gene-example',
      label:
        'mRNA editing changes the coding information of an mRNA after transcription, as when a cytidine deaminase converts a CAA codon to the UAA stop codon in intestinal ApoB mRNA, producing the shorter Apo B-48 protein instead of liver’s Apo B-100',
      definition:
        'Coding information of mRNA can be changed by RNA editing. For example, in the liver, the single apolipoprotein B gene (Apo-B gene) is transcribed into an mRNA that directs synthesis of the apoB-100 protein (100-kDa); in the intestine, the same gene directs synthesis of a primary transcript that, by the action of a cytidine deaminase, has a CAA codon in the mRNA converted to UAA, a termination codon. Apo B-48 protein (48-kDa) results from translating this edited form of the mRNA. ApoB-100 and Apo B-48 proteins have different functions.',
      objective:
        "Describe mRNA editing using the ApoB example: the same gene and the same primary transcript, edited differently in liver versus intestine by a cytidine deaminase to produce two different proteins.",
      pitfall:
        'Confusing mRNA editing with alternative splicing. Both let one gene yield more than one protein, but editing chemically changes a base within the mRNA sequence itself (cytidine deaminase converting C to U), while splicing/alternative splicing works by choosing which exons to join, without changing any base.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > RNA Synthesis (Transcription)',
      type: 'mechanism',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p61-q1',
      conceptKey: 'transcription-template-strand-and-rna-complementarity',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: "State that RNA synthesis always proceeds 5' to 3', and rule out the false alternatives about priming, strand complementarity and NTP substrates.",
      explanations: {
        a: "The transcriptional-unit diagram shows the RNA transcript running 5' to 3'; RNA polymerase always extends the growing chain in this one direction.",
        b: "The pre-initiation and initiation steps have TFIID, the other transcription factors and RNA polymerase II assemble directly at the promoter and begin synthesis — nothing in this process is described as needing a primer, unlike DNA replication.",
        c: "This reverses the rule: 'the sequence of RNA is complementary to the sequence of template strand,' not the coding strand — mRNA matches the coding strand instead, except for U replacing T.",
        d: 'The four ribonucleoside triphosphates RNA polymerase II uses are ATP, GTP, CTP and UTP — not TTP, since RNA never contains thymine.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p61-q2',
      conceptKey: 'transcription-template-strand-and-rna-complementarity',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that mRNA is complementary to the template strand, not the coding strand.',
      answerOverride: 'd',
      answerOverrideReason:
        "The two OCR passes disagreed between options a and d. The book states directly that 'the sequence of RNA is complementary to the sequence of template strand,' which settles it as d — mRNA is complementary to the template strand, not the coding strand.",
      explanations: {
        a: 'The coding strand is what mRNA matches (apart from U for T) — it is complementary to the template strand, not to the coding strand itself.',
        b: 'Ribosomal RNA is a translation component, not the DNA strand mRNA is transcribed against.',
        c: 'tRNA is a translation component, not the DNA strand mRNA is transcribed against.',
        d: "Plainly that RNA's sequence is complementary to the template strand's sequence.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p61-q3',
      conceptKey: 'transcription-template-strand-and-rna-complementarity',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: "Derive an RNA product's sequence from a given template strand using complementary, antiparallel base pairing with U replacing T.",
      explanations: {
        a: 'This sequence uses DNA bases (T) rather than RNA bases (U), and does not correctly complement the template read antiparallel.',
        b: 'This uses T instead of U, so it cannot be the RNA product; RNA is built with uracil, never thymine, in place of adenine’s partner.',
        c: 'This keeps the template’s own base order rather than pairing each base with its complement — it copies GATCTAC into RNA letters (GAUCUAC) rather than transcribing its complement.',
        d: "Pairing each base of the 5'-GATCTAC-3' template with its complement, read antiparallel (RNA polymerase moves 3' to 5' along the template while extending RNA 5' to 3', with U replacing T), gives 5'-GUAGAUC-3'.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p61-q4',
      conceptKey: 'transcription-template-strand-and-rna-complementarity',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Pair RNA bases directly against a given DNA strand using complementary base pairing with U replacing T.',
      explanations: {
        a: 'This simply repeats the DNA sequence with T unchanged; RNA pairing requires each DNA base to be swapped for its complement, and T is never used in RNA.',
        b: 'Pairing each DNA base with its RNA complement (A pairs with U, T pairs with A, G pairs with C, C pairs with G) across ATG TGA CAG gives UAC ACU GUC.',
        c: 'This mixes DNA and RNA bases (T alongside U) in a way that does not consistently follow the complementary-pairing rule.',
        d: "This uses T throughout, which is a DNA base; the rule is that RNA takes U in place of T.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p61-q5',
      conceptKey: 'transcription-template-strand-and-rna-complementarity',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Apply the rule that mRNA matches the coding strand's sequence, U for T, to read off an mRNA sequence directly.",
      explanations: {
        a: 'This is neither the coding-strand sequence nor its proper U-for-T conversion; it does not follow the stated rule.',
        b: "MRNA 'is the same as that of coding strand except for U replacing T'; since CAGCGC contains no T to begin with, the mRNA sequence is identical to the coding strand, CAGCGC.",
        c: 'This does not match the coding strand’s letters position for position, so it cannot be the mRNA sequence the rule produces.',
        d: 'This does not match the coding strand’s letters position for position, so it cannot be the mRNA sequence the rule produces.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p61-q6',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name helicase (TFIIH) activity as what separates the two DNA strands for transcription.',
      explanations: {
        a: "Relief of torsional tension is a topoisomerase's job, not what is credited to helicase activity here.",
        b: 'TFIIH has a helicase activity that separates the two strands of DNA for initiation.',
        c: "RNA primers are not part of the transcription mechanism; RNA polymerase does not need a primer, unlike DNA polymerase.",
        d: "Re-annealing the strands happens after RNA polymerase passes, not as helicase's key function during transcription; credited TFIIH's helicase activity with separating strands, not rejoining them.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q7',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define the promoter as the DNA sequence RNA polymerase binds.',
      explanations: {
        a: "DNA polymerase acts in DNA replication, not transcription; the promoter is where RNA polymerase, not DNA polymerase, begins attachment.",
        b: 'The promoter is the nucleotide sequence at which RNA polymerase begins attachment, lying upstream of the transcription region.',
        c: "A restriction endonuclease cuts DNA at its own recognition sequence; this has nothing to do with the promoter's role in transcription.",
        d: 'The promoter is a DNA sequence, not an RNA sequence, and it is bound before any RNA exists.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q8',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: "State that the promoter's role is binding transcription factors that assemble the pre-initiation complex.",
      answerOverride: 'd',
      answerOverrideReason:
        "The two OCR passes disagreed between options a and d. The book describes the promoter's basal expression elements (TATA, CAAT/GC) and TFIID as binding transcription factors that assemble the pre-initiation complex there — the promoter's role is binding transcription factors, which is what controls gene expression, not recruiting DNA polymerase (the wrong enzyme for transcription).",
      explanations: {
        a: 'Described the promoter recruiting transcription factors and RNA polymerase II to begin transcription, not binding negative regulators to inhibit expression.',
        b: "The promoter recruits RNA polymerase II and transcription factors, not DNA polymerase — DNA polymerase belongs to DNA replication, not transcription.",
        c: "Splicing and recombination are separate post-transcriptional/gene-rearrangement processes; the promoter's role is initiating transcription, not enabling splicing.",
        d: "Described the promoter's basal expression elements (TATA box, CAAT/GC box) as the site where TFIID and the other transcription factors bind and assemble, which is how the promoter region influences gene expression.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q9',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Identify the TATA box as part of the promoter where RNA polymerase's transcription machinery assembles.",
      explanations: {
        a: "DNA polymerase belongs to DNA replication, not to the promoter's role in transcription.",
        b: 'Topoisomerase relieves DNA supercoiling; it is not what is associated with the TATA box.',
        c: "The TATA box is part of the promoter, the nucleotide sequence at which — per the terminology — RNA polymerase begins attachment; TFIID binds it first as the entry point for the RNA polymerase II pre-initiation complex.",
        d: 'DNA ligase joins DNA fragments during replication or repair; it has no role at the TATA box during transcription.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q10',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name RNA polymerase II as the enzyme responsible for eukaryotic mRNA synthesis.',
      explanations: {
        a: "RNA polymerase I is for rRNA synthesis mainly, per the classification, not mRNA.",
        b: 'Directly that RNA polymerase II is responsible for synthesis of mRNAs.',
        c: "RNA polymerase III is for tRNA synthesis mainly, per the classification, not mRNA.",
        d: 'DNA polymerase I is a DNA-replication enzyme, not an RNA-synthesising one.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q11',
      conceptKey: 'eukaryotic-rna-polymerase-types-i-ii-iii',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Assign large ribosomal RNA genes (18S, 28S) to RNA polymerase I.',
      explanations: {
        a: 'Grouped RNA polymerase III with polymerase I for rRNA/tRNA synthesis generally, but the large 18S/28S ribosomal RNAs specifically belong to polymerase I among the two.',
        b: "'RNA-dependent RNA polymerase' is not one of the three nuclear RNA polymerases; the three are RNA polymerase I, II and III.",
        c: 'Assigned rRNA synthesis mainly to RNA polymerase I (together with III for tRNA); the large 18S and 28S ribosomal RNA genes are transcribed by RNA polymerase I.',
        d: 'RNA polymerase II is dedicated to mRNA, most snRNA and miRNA, not to the large ribosomal RNAs.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q12',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that the TATA box defines the transcription start site.',
      explanations: {
        a: 'The TATA box belongs to transcription, not DNA replication; it a role in marking a replication start point is never assigned.',
        b: "The TATA box 'defines where transcription is to start along the DNA.'",
        c: 'Assigned the terminator, not the TATA box, to marking where transcription ends.',
        d: 'The TATA box acts at the start of transcription, not at the end of translation — an unrelated process.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p62-q13',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Recognise trimming as absent from the list of mRNA processing steps.",
      explanations: {
        a: "Capping is one of the four listed post-transcriptional modifications of mRNA — present, not lacking.",
        b: "Polyadenylation is one of the four listed modifications — present, not lacking.",
        c: "Splicing is one of the four listed modifications — present, not lacking.",
        d: "The post-transcriptional modifications of mRNA are capping, polyadenylation, splicing and editing; trimming is a post-translational modification of proteins, not something mRNA processing includes.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p63-q14',
      conceptKey: 'mrna-capping-and-polyadenylation-protect-and-stabilize',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: "Identify the chemical linkage joining the 5' cap to the first transcribed nucleotide of mRNA.",
      exclude: true,
      excludeReason:
        "The book states only that a methyl-guanosine cap is added at the 5' end (physical p90); it never describes the phosphate-bridge chemistry (3'-5' vs 5'-5', phosphodiester vs triphosphate) that these four options require distinguishing, so the correct option cannot be grounded in the assigned pages.",
      explanations: {
        a: "The bond linking the cap is not described to the transcript in enough chemical detail to confirm or rule out a 3'-5' phosphodiester bridge.",
        b: "The bond linking the cap is not described to the transcript in enough chemical detail to confirm or rule out a 5'-5' triphosphate bridge, even though this is the printed key.",
        c: "The bond linking the cap is not described to the transcript in enough chemical detail to confirm or rule out a 3'-3' triphosphate bridge.",
        d: "The bond linking the cap is not described to the transcript in enough chemical detail to confirm or rule out a 3'-5' triphosphate bridge.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p63-q15',
      conceptKey: 'mrna-capping-and-polyadenylation-protect-and-stabilize',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name the poly(A) tail as the mRNA feature that protects against degradation.',
      explanations: {
        a: 'Telomeres protect the ends of chromosomal DNA, not mRNA; they play no part in the mRNA-processing discussion.',
        b: "Polyadenylation 'stabilizes the mRNA and protects it against the attack by ribonucleases.'",
        c: 'Introns are removed by splicing before the mature mRNA is finished; they are not a feature that protects the mature message.',
        d: 'Exons are the coding sequence retained in the mature mRNA, but credited the poly(A) tail, not exons themselves, with ribonuclease protection.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p63-q16',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that splicing cuts introns out and joins exons together, not the reverse.',
      answerOverride: 'd',
      answerOverrideReason:
        "The two OCR passes disagreed between a and d. The book states splicing 'removes introns... and joins exons... to form functional mRNA,' which settles it as d — cutting of introns and joining of exons — the reverse of option a.",
      explanations: {
        a: 'This reverses the description: splicing cuts out introns and joins together the exons, not the other way round.',
        b: 'RNA polymerase carries out transcription itself; splicing is a separate, later step carried out by the spliceosome, not by RNA polymerase.',
        c: 'DNA ligase joins DNA fragments in replication or repair; splicing of mRNA is carried out by the spliceosome (snRNPs), not DNA ligase.',
        d: 'Splicing removes introns (non-expressed regions) and joins exons (expressed regions) to form functional mRNA.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p63-q17',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: "Recognise alternative splicing from a figure showing one gene's transcript yielding two different proteins.",
      explanations: {
        a: "Capping adds a methyl-guanosine cap to the 5' end; it does not produce two different proteins from one transcript, which is what the figure shows.",
        b: "Polyadenylation adds a poly(A) tail to the 3' end; it does not produce two different proteins from one transcript.",
        c: 'Plain splicing removes introns to give one mature mRNA; the figure’s two different protein products from the same exons is specifically what is called alternative splicing.',
        d: 'The primary transcript of some genes may be spliced differently to yield different proteins from the same gene — exactly what the figure of one transcript producing Protein A and Protein B shows.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p63-q18',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'State that mature mRNA lacks introns because splicing has already removed them.',
      explanations: {
        a: "The 5' cap is added during processing and is retained in mature mRNA — it would be present, not least likely.",
        b: "The 3' poly(A) tail is added during processing and is retained in mature mRNA — it would be present, not least likely.",
        c: 'Exons are the expressed, coding regions that splicing keeps and joins together — they are present in mature mRNA, not least likely.',
        d: 'Splicing removes introns and joins exons to form the functional, mature mRNA, so an intron is exactly what mature mRNA is least likely to still contain.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p63-q19',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: "Recognise which parts of a gene's primary transcript remain in the final coding sequence after splicing.",
      exclude: true,
      excludeReason:
        "The book never introduces 5'/3' untranslated regions or any base-counting method connecting intron removal, UTR length and codon count. Nothing in the assigned pages supports establishing which of these lengths is 'between the start and stop codon' for this scenario, even though the underlying arithmetic (150 amino acids implying 450 coding bases) matches the printed key.",
      explanations: {
        a: "1750 would only follow from including the intron in the coding count, which the account of splicing rules out — introns are removed before translation.",
        b: "750 would follow from adding both untranslated regions to the coding sequence, but untranslated regions are never introduced as part of this chapter's teaching, so this can't be confirmed from the assigned pages.",
        c: "650 does not correspond to any combination of the given numbers that the splicing/coding-sequence teaching would produce.",
        d: "450 matches 150 amino acids at 3 bases per codon, and is the printed key, but the 5'/3' untranslated-region concept this question's option set requires are never taught to rule out the other three answers.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p64-q20',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name the spliceosome as the complex that associates with introns during splicing.',
      explanations: {
        a: "'Splicer' is not the name for this machinery; named the spliceosome specifically.",
        b: 'Ribosomes carry out translation, not splicing; they play no part in intron removal.',
        c: "'Nuclear body' is not the term for the splicing machinery; it is called a spliceosome.",
        d: 'Splicing requires a spliceosome, made of small nuclear ribonucleoproteins (snRNPs) built of special proteins and small nuclear RNAs.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p64-q21',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Connect anti-snRNP autoantibodies in SLE to a splicing defect.',
      explanations: {
        a: "The clinical correlation names snRNPs, the spliceosome's components, as the antibody target in SLE — not a capping-related complex.",
        b: "The clinical correlation names snRNPs as the antibody target in SLE, not any polyadenylation-related component.",
        c: "The clinical correlation states that in SLE, autoantibodies target small nuclear ribonucleoproteins (snRNPs) — the components of the spliceosome that carries out splicing — so defective splicing is the mechanism.",
        d: "The clinical correlation concerns snRNPs and ordinary splicing, not the choice between alternative splice patterns.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p64-q22',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Recognise that a mutation at an intron-exon junction disrupts splicing, since that boundary is exactly where the spliceosome must recognise where to cut.',
      explanations: {
        a: "Capping happens at the 5' end of the transcript, not at internal intron-exon boundaries; a junction mutation does not fit a capping defect.",
        b: "Polyadenylation happens at the 3' end of the transcript, not at internal intron-exon boundaries; a junction mutation does not fit a polyadenylation defect.",
        c: "Splicing works by the spliceosome recognising the boundary between an intron and an exon in order to remove the intron and join the exons; a mutation exactly at that junction disrupts the recognition the description of splicing depends on.",
        d: 'Alternative splicing is a normal, regulated choice between splice patterns, not a description of what a junction mutation itself does to a single splice site.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p64-q23',
      conceptKey: 'mrna-editing-apob-gene-example',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Identify mRNA editing from the ApoB figure showing a CAA-to-UAA base change that shortens the translated protein.',
      explanations: {
        a: "Capping adds a 5' cap and does not change the coding sequence read by the ribosome, unlike the CAA-to-UAA base change the figure shows.",
        b: "Polyadenylation adds a 3' poly(A) tail and does not change the coding sequence read by the ribosome, unlike the change shown.",
        c: 'Splicing removes introns and joins exons; it does not itself convert one coding codon into a stop codon, which is what the figure’s CAA-to-UAA change and the resulting shorter Apo B-48 protein show.',
        d: 'The ApoB example is exactly this: a cytidine deaminase converts a CAA codon to the UAA stop codon in intestinal mRNA, producing the truncated Apo B-48 protein — this is mRNA editing.',
      },
    },
  ],
}
