/**
 * `102 INT > Biochemistry > Regulation of Gene Expression` — the question
 * books' MCQs.
 *
 * `ART-102-BIO-REGULATION-OF-GENE-EXPRESSION` does not exist yet — no
 * article has been written for this chapter. It is cited anyway, the same
 * way `scripts/kasr/seeds/mcq/101-ISK/myo-epithelium.ts` cites
 * `ART-101-HIS-MYO-EPITHELIUM` before it existed, so the leaf is complete
 * the moment the article lands. The department's own orientation cancels
 * this chapter for the 2025/2026 written exam, but it is still taught and
 * examined practically, so it is authored here exactly like any other
 * chapter — the cancellation is not a reason to skip rows.
 *
 * 15 rows, triaged against the department book's own pages (physical
 * p102-106, `scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`).
 * Three rows had a broken or absent printed key that the book's own text
 * settles anyway (`p74-q1`'s key names a fifth option this extraction
 * doesn't have; `p74-q2` and `p74-q3` have no key at all), so they carry an
 * `answerOverride`. Two rows are excluded: `p74-q6` asks for the difference
 * between enhancers and "promoter proximal elements," a term the book never
 * uses even though it does discuss enhancers at length; `p75-q12` asks what
 * IF-4 proteins do, and no option cleanly matches either of the book's two
 * separate statements about initiation factors (IF-4 facilitates initiation
 * in the Translation chapter; unnamed "some IFs" are phosphorylated under
 * stress in this chapter), with no printed key to fall back on.
 *
 * Three concepts are reused: `post-translational-covalent-modification-types`
 * for the carboxylation/phosphorylation questions, `mrna-splicing-and-
 * alternative-splicing` for the alternative-splicing/protein-count question,
 * and `eukaryotic-transcription-elements-and-mrna-processing` for the TATA
 * box question — all three already state the exact fact being tested,
 * minted while authoring the RNA Synthesis and Protein Synthesis chapters.
 * The rest are new, one per section of the book's own five-level regulation
 * diagram (physical p102): the five-level overview itself, epigenetic
 * mechanisms, gene copy-number/rearrangement, cis-/trans-acting elements,
 * miRNA, and translational regulation by IF phosphorylation.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Regulation of Gene Expression',
  modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
  articleId: 'ART-102-BIO-REGULATION-OF-GENE-EXPRESSION',

  concepts: [
    {
      key: 'five-levels-of-eukaryotic-gene-expression-regulation',
      label:
        'Eukaryotic gene expression is regulated at five levels — pre-transcriptional (epigenetics, DNA amount, gene rearrangement), transcriptional (cis- and trans-acting elements), post-transcriptional (capping, poly-A tailing, splicing, miRNA), translational (IF phosphorylation) and post-translational (trimming, covalent modification)',
      definition:
        'Gene expression is the process by which the information contained within a gene becomes a functional product (RNA or protein), and it must be strictly regulated so that cells produce the correct number of proteins when they need them. There are two types of genes: unregulated (constitutive or housekeeping) genes, continually expressed at a fixed rate for basic cellular functions such as the β-actin gene; and regulated genes, the majority, expressed only under certain conditions, such as globin genes. Regulation of eukaryotic gene expression occurs at multiple levels, mainly at the level of transcription: (I) pre-transcriptional regulation — epigenetic mechanisms, the amount of DNA, and gene rearrangements; (II) transcriptional regulation — cis-acting elements and trans-acting elements; (III) post-transcriptional regulation — capping, poly-A tailing, splicing and miRNA; (IV) translational regulation — phosphorylation of some initiation factors; (V) post-translational regulation — trimming and covalent modification.',
      objective:
        'Place a given regulatory mechanism (epigenetics, capping, splicing, IF phosphorylation, trimming, etc.) at the correct one of the five levels at which eukaryotic gene expression is regulated, and distinguish a constitutive/housekeeping gene from a regulated gene.',
      pitfall:
        "Sorting post-transcriptional mechanisms (capping, poly-A tailing, splicing, miRNA) into the pre-transcriptional or translational category, or vice versa. The diagram fixes each mechanism at one level only, in the order the primary transcript actually passes through them: DNA changes come first (pre-transcriptional), then promoter/enhancer control of transcription itself, then processing of the freshly made transcript (post-transcriptional), then control of the ribosome reading it (translational), then modification of the finished protein (post-translational).",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
      type: 'classification',
    },
    {
      key: 'epigenetic-mechanisms-dna-methylation-and-histone-acetylation',
      label:
        'Epigenetic mechanisms change gene activity without changing the DNA sequence — DNA methyltransferase methylates cytosine at CpG islands to silence genes reversibly, and histone acetyltransferases acetylate histone lysines to open chromatin for transcription while histone deacetylases reverse it',
      definition:
        "Epigenetic means 'around the gene'; it refers to changes in DNA and histone proteins that do not alter the DNA sequence. DNA methylation is the methylation of a specific cytosine to form 5′methylcytosine by DNA methyltransferase; the target cytosine usually lies next to a guanine, forming a CpG island, often near or in a gene's promoter region; it is associated with silencing the activities of certain genes, and is a mechanism for regulating gene expression during cell differentiation, particularly in fetal development; demethylation reverses the process. Chromatin remodeling: the cellular genome is packaged with histones into chromatin structures, and activating a gene for transcription requires changes in chromatin state to make the region accessible to RNA polymerase and other proteins such as transcription factors. This occurs through mechanisms such as histone acetylation: histone acetyltransferases (HATs) transfer an acetyl group from acetyl coenzyme A to lysine residues in the tail of the histone octamer, removing a positive charge from the lysine's ε-amino group and so reducing the electrostatic interaction between the histones and the negatively charged DNA, which makes it easier for DNA to unwind from the histones with simultaneous activation of the gene; histone deacetylases (HDACs) remove these acetyl groups to re-form inactive chromatin.",
      objective:
        "Describe DNA methylation (target base, enzyme, CpG island, effect on gene activity, reversibility) and histone acetylation/deacetylation (enzymes, effect on chromatin state and gene activity) as the two epigenetic mechanisms.",
      pitfall:
        'Placing the methylated base on guanine, or treating methylation as a permanent, irreversible change. Cytosine is the base that gets methylated (forming 5-methylcytosine, typically at a CpG island), and demethylation reverses the process.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
      type: 'mechanism',
    },
    {
      key: 'gene-amplification-diminution-and-rearrangement',
      label:
        "Changing a gene's copy number (amplification or diminution) or rearranging its segments is a pre-transcriptional way to regulate its product — methotrexate resistance comes from DHFR gene amplification, and antibody diversity comes from immunoglobulin gene rearrangement",
      definition:
        "A change in the number of copies of a gene can affect the amount of gene product produced. Gene amplification (increase in number) is seen in response to certain chemotherapeutic drugs such as methotrexate, an inhibitor of dihydrofolate reductase (DHFR), required for DNA synthesis; malignant cells can develop resistance to methotrexate by amplifying the gene for this enzyme. Gene diminution (decrease in number) occurs during development of red blood cells, as all genes disappear during their maturation. Gene rearrangement: the heavy and light chains of immunoglobulins are encoded by several hundred gene segments; their rearrangement or recombination allows the generation of several million different immunoglobulins, providing the diversity needed for the recognition of an enormous number of antigens.",
      objective:
        "Distinguish gene amplification from gene diminution as opposite changes in gene copy number, name methotrexate resistance as the amplification example, and explain how immunoglobulin gene rearrangement generates antibody diversity.",
      pitfall:
        'Confusing gene amplification (more copies, as with the DHFR gene under methotrexate pressure) with gene rearrangement (the same limited gene segments recombined into new combinations, as in immunoglobulin genes) — amplification changes how much of one arrangement exists, rearrangement changes which arrangement exists.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
      type: 'mechanism',
    },
    {
      key: 'cis-and-trans-acting-transcriptional-regulatory-elements',
      label:
        'Transcriptional regulation works through cis-acting DNA elements — the promoter, enhancers/silencers and hormone-response elements — that act only on the same chromosome, and trans-acting regulatory molecules that diffuse from their site of synthesis to bind DNA anywhere in the genome',
      definition:
        'Regulation of gene expression at the level of transcription occurs through interaction between cis- and trans-acting elements. Cis-acting elements are DNA regulatory sequences flanking a gene, usually embedded in non-coding regions of the genome; they influence expression of genes only on the same chromosome; interaction between these DNA segments and regulatory molecules such as transcription factors can induce or repress the transcriptional machinery. Cis-acting elements include: the promoter, carrying the TATA box and the CAAT box/GC box (discussed in transcription); enhancers, which facilitate initiation of transcription by binding proteins that facilitate transcription-factor binding to the promoter, and which can be close to or thousands of base pairs from the promoter, upstream or downstream, on either strand, and silencers, which inhibit initiation of transcription by binding proteins that produce inhibition; and hormone-response elements, which let hormones regulate transcription when the hormone-receptor complex binds the specific DNA element, as with steroid and thyroid hormones. Trans-acting elements are the regulatory molecules that can diffuse from their site of synthesis in the cell to the DNA-binding site — for example, a trans-acting molecule transcribed from a gene on chromosome 11 can regulate another gene on chromosome 6.',
      objective:
        'Distinguish a cis-acting DNA element (promoter, enhancer, silencer, hormone-response element — all restricted to the same chromosome) from a trans-acting regulatory molecule (diffusible, able to act on genes elsewhere in the genome), and name the three types of cis-acting element listed.',
      pitfall:
        'Assuming enhancers must sit right next to the promoter. Explicitly that enhancers can be close to or thousands of base pairs away, upstream or downstream, on either strand — proximity is not what makes an element cis-acting; being restricted to the same chromosome is.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
      type: 'classification',
    },
    {
      key: 'mirna-post-transcriptional-gene-silencing',
      label: 'MicroRNAs are non-coding RNAs that reduce expression of their target mRNA, either by inducing its degradation or by blocking its translation',
      definition:
        'miRNAs are non-coding RNAs that reduce expression of the target mRNA either by inducing its degradation or blocking its translation.',
      objective: 'State what a microRNA does to its target mRNA and name the two mechanisms — degradation or translational blocking — by which it does so.',
      pitfall:
        'Treating miRNA as something that increases or initiates translation. The wording is that miRNAs reduce expression, acting as a brake rather than a switch.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
      type: 'mechanism',
    },
    {
      key: 'translational-regulation-by-if-phosphorylation',
      label: 'Translational regulation works by phosphorylating some initiation factors, which blocks protein synthesis under cell stress such as starvation',
      definition:
        'Phosphorylation of some IFs blocks protein synthesis. They are phosphorylated by protein kinases that are activated when the cell is under stress and when energy utilization for protein synthesis is deleterious, e.g. starvation.',
      objective:
        'State that translation is regulated by phosphorylating some initiation factors, which blocks protein synthesis, and identify cellular stress/starvation as the trigger given for this.',
      pitfall:
        'Assuming phosphorylation of an initiation factor always activates it, by analogy with kinase-activated enzymes elsewhere. Here phosphorylation blocks protein synthesis rather than promoting it — the same chemical modification has an inhibitory, not activating, effect at this checkpoint.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Regulation of Gene Expression',
      type: 'mechanism',
    },
    {
      key: 'post-translational-covalent-modification-types',
      label:
        'Covalent post-translational modification adds a functional group to an amino acid residue — phosphate, carbohydrate, acetyl or methyl, hydroxyl or carboxyl — and each has its own worked example',
      definition:
        'Amino acid residues in a finished chain are modified enzymatically to alter activity or stability, to direct the protein to a compartment, or to prepare it for secretion. Phosphorylation and dephosphorylation on serine, threonine or tyrosine regulate the enzymes of glycogen metabolism and regulators of gene transcription. Glycosylation marks proteins destined for secretion, lysosomes or membranes. Acetylation or methylation of the N-terminal residue alters charge, as in chromatin remodelling by histone acetylation. Hydroxylation of prolyl and lysyl residues stabilises collagen. Carboxylation forms γ-carboxyglutamate, which lets clotting proteins bind calcium.',
      objective: "Name the types of covalent post-translational modification and give the example for each.",
      pitfall:
        'Offering trimming — the conversion of pre-proinsulin to insulin — as a covalent modification. Trimming is proteolytic removal of a segment and is the other branch of post-translational modification, not this one.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Protein Synthesis (Translation)',
      type: 'classification',
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
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p74-q1',
      conceptKey: 'five-levels-of-eukaryotic-gene-expression-regulation',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify epigenetic mechanisms as pre-transcriptional regulation, among the options actually present.',
      answerOverride: 'a',
      answerOverrideReason:
        "The printed key names a fifth option this extracted row does not have. Among the four options present, only epigenetic mechanisms is listed under Pre-transcriptional regulation in the book (physical p102); mRNA stability, trimming and covalent modification belong to post-transcriptional or post-translational regulation instead.",
      explanations: {
        a: 'Listed epigenetic mechanisms as the first item under Pre-transcriptional regulation, alongside the amount of DNA and gene rearrangements.',
        b: 'mRNA stability relates to post-transcriptional features such as the poly(A) tail, not to pre-transcriptional regulation.',
        c: "Trimming is listed under Post-translational regulation in the diagram, not pre-transcriptional.",
        d: "Covalent modification is listed under Post-translational regulation in the diagram, not pre-transcriptional.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p74-q2',
      conceptKey: 'epigenetic-mechanisms-dna-methylation-and-histone-acetylation',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise DNA methylation and histone acetylation as the two epigenetic mechanisms.',
      answerOverride: 'c',
      answerOverrideReason:
        "correctSource is 'none' — no printed key survived. The book's own Epigenetic Mechanisms section opens with exactly these two examples, DNA methylation and chromatin remodeling by histone acetylation, so c is the answer the book supports.",
      explanations: {
        a: 'DNA methylation and histone acetylation do not alter the DNA sequence, so they are not genetic mutations.',
        b: 'Chromosomal rearrangements are large-scale structural changes to chromosomes; discussed methylation and acetylation under epigenetic mechanisms, a different category.',
        c: "The Epigenetic Mechanisms section is built around exactly these two examples: DNA methylation and chromatin remodeling by histone acetylation.",
        d: 'Translocation is a type of chromosomal rearrangement, not what is called DNA methylation or histone acetylation.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p74-q3',
      conceptKey: 'epigenetic-mechanisms-dna-methylation-and-histone-acetylation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that DNA methylation targets cytosine, is catalysed by DNA methyltransferase, and is reversible, and that it silences gene activity.',
      answerOverride: 'c',
      answerOverrideReason:
        "correctSource is 'none' — no printed key survived. The book states that methylation is 'associated with the silencing of the activities of certain genes,' which settles the answer as c; the same passage rules out the other three options (methylation targets cytosine, not guanine; demethylation reverses it, so it is not irreversible; and it is catalysed by DNA methyltransferase, not DNA ligase).",
      explanations: {
        a: "'Demethylation reverses the process' — methylation is reversible, not irreversible.",
        b: 'Placed the target cytosine next to a guanine (forming a CpG island); the base that gets methylated is cytosine, not guanine.',
        c: "DNA methylation 'is associated with the silencing of the activities of certain genes.'",
        d: 'DNA methyltransferase is the enzyme that methylates cytosine; DNA ligase, which joins DNA fragments, plays no part in this reaction.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p74-q4',
      conceptKey: 'gene-amplification-diminution-and-rearrangement',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name gene amplification as the mechanism of methotrexate resistance.',
      explanations: {
        a: 'Gene rearrangement recombines existing gene segments (as in immunoglobulin genes); credited methotrexate resistance to more copies of the DHFR gene, not to a rearrangement.',
        b: "DNA methylation is an epigenetic, gene-silencing mechanism; the methotrexate-resistance example is about increasing gene copy number, not methylating it.",
        c: 'Malignant cells can develop resistance to methotrexate — a DHFR inhibitor — by amplifying the gene for this enzyme.',
        d: 'Gene diminution is a decrease in gene copies, the example being genes disappearing during red blood cell maturation; methotrexate resistance works the opposite way, by increasing copies.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p74-q5',
      conceptKey: 'gene-amplification-diminution-and-rearrangement',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name gene rearrangement as the source of immunoglobulin diversity.',
      explanations: {
        a: "The heavy and light chains of immunoglobulins are encoded by several hundred gene segments, and their rearrangement generates several million different immunoglobulins.",
        b: 'DNA methylation silences gene activity; it is not the mechanism credited with generating antibody diversity.',
        c: 'Gene amplification increases the number of copies of one gene (the example is the DHFR gene under methotrexate); it does not recombine different gene segments the way immunoglobulin diversity requires.',
        d: 'Gene diminution decreases gene copy number, as in maturing red blood cells; it does not generate the combinatorial diversity of antibodies.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p74-q6',
      conceptKey: 'cis-and-trans-acting-transcriptional-regulatory-elements',
      difficulty: 'Hard',
      questionType: 'Classification',
      learningObjective: 'Distinguish enhancers from promoter-proximal elements by distance from the promoter.',
      exclude: true,
      excludeReason:
        "The book discusses enhancers' ability to act at a distance from the promoter, but it never introduces 'promoter proximal elements' as a named category to contrast them against, so the option set can't be adjudicated from book text alone.",
      explanations: {
        a: "Enhancers are never labelled as transcription factors themselves, nor promoter-proximal elements as DNA sequences specifically, so this contrast can't be confirmed from the assigned pages.",
        b: 'Enhancers facilitate (not inhibit) initiation of transcription, but it never discusses "promoter proximal elements" as a category at all, so this option can’t be confirmed either way.',
        c: "This option is closest to what about enhancers acting close to or thousands of base pairs from the promoter, but 'promoter proximal elements' is never introduced as a term, so a student has no book-based way to confirm this is the primary difference.",
        d: 'Described both enhancers and silencers as DNA sequences, not proteins, but it never discusses "promoter proximal elements" at all, so this contrast can’t be confirmed.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q7',
      conceptKey: 'eukaryotic-transcription-elements-and-mrna-processing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that the TATA box defines where transcription starts.',
      explanations: {
        a: "The TATA box is a cis-acting element, a DNA sequence, not a trans-acting (diffusible) regulatory molecule.",
        b: 'The CAAT box and GC box, not the TATA box, control how frequently transcription starts (its frequency); assigned the TATA box the job of fixing where it starts.',
        c: 'Placed the CAAT box and GC box 40-200 bp upstream; the TATA box itself is placed 20-30 bp upstream, a different location.',
        d: 'The TATA box defines where transcription is to start along the DNA.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q8',
      conceptKey: 'mrna-splicing-and-alternative-splicing',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name alternative splicing as the reason the number of proteins exceeds the number of genes.',
      explanations: {
        a: 'Chromatin condensation is an epigenetic/pre-transcriptional mechanism affecting whether a gene is expressed at all, not a source of extra protein variety from one gene.',
        b: 'Transcriptional control affects how much of a gene is transcribed, not how many different protein products one gene can yield.',
        c: 'Alternative splicing explains why the estimated number of proteins much exceeds the number of genes, since one primary transcript can be spliced differently to yield different proteins.',
        d: 'Translational control affects how efficiently an existing mRNA is translated, not how many different proteins a single gene’s transcript can be turned into.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q9',
      conceptKey: 'five-levels-of-eukaryotic-gene-expression-regulation',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise capping as a post-transcriptional regulation step.',
      explanations: {
        a: 'Epigenetic mechanisms are listed under Pre-transcriptional regulation, not post-transcriptional.',
        b: "The Post-transcriptional regulation section lists capping, poly-A tailing, splicing and miRNA.",
        c: 'Trimming is listed under Post-translational regulation, not post-transcriptional.',
        d: 'Basal expression elements (TATA, CAAT/GC boxes) belong to transcriptional regulation, not post-transcriptional.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q10',
      conceptKey: 'five-levels-of-eukaryotic-gene-expression-regulation',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise alternative splicing as part of post-transcriptional processing of mRNA.',
      explanations: {
        a: "Described no replacement of 'UU with CCA' anywhere in its account of mRNA processing; this option does not match any book-taught step.",
        b: 'Described addition, not removal, of the poly(A) tail as the polyadenylation step; this option reverses it.',
        c: 'A is never described"leader sequence" being removed as part of mRNA processing; this is not one of its listed steps.',
        d: "The Post-transcriptional regulation list includes splicing, and alternative splicing is the extension of splicing to yield multiple proteins from one gene's transcript.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q11',
      conceptKey: 'mirna-post-transcriptional-gene-silencing',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that miRNAs reduce expression of their target mRNA.',
      explanations: {
        a: 'MiRNAs reduce expression of their target mRNA, by degrading it or blocking its translation — the opposite of initiating translation.',
        b: 'Cis-acting elements are DNA sequences flanking a gene; miRNAs are RNA molecules that act post-transcriptionally on mRNA, a different category.',
        c: 'MiRNAs are non-coding RNAs that reduce expression of the target mRNA, either by inducing its degradation or blocking its translation.',
        d: 'Trans-acting elements are regulatory molecules that diffuse to a DNA-binding site to affect transcription; miRNAs act post-transcriptionally on mRNA, not at the level of DNA-binding transcriptional control.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q12',
      conceptKey: 'translational-regulation-by-if-phosphorylation',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'State what regulates initiation factors and what effect that regulation has on protein synthesis.',
      exclude: true,
      excludeReason:
        "The book states IF-4 binds the mRNA cap and facilitates ribosome binding during normal initiation (Protein Synthesis chapter), and separately states that stress-activated kinases phosphorylate 'some IFs' to block protein synthesis, without naming IF-4 specifically (this chapter, physical p106). No option cleanly matches either statement and no printed key exists to fall back on.",
      explanations: {
        a: "That IF-4 prevents formation of the preinitiation complex is never stated; on the contrary, IF-4 facilitates the initiation steps that build it.",
        b: 'The protein kinases that phosphorylate "some IFs" are activated under stress — it does not say that IF-4 itself is "activated" under stress; being phosphorylated is not the same as being activated, and IF-4 specifically in this passage is not named.',
        c: 'IF-4 interacting is never described with the poly(A) tail; that role belongs to poly(A) tail-binding proteins, a different set of factors.',
        d: 'This is the printed key\'s apparent intent, but it contradicts the Protein Synthesis chapter, where IF-4\'s stated role is to facilitate initiation (bind the cap, bring mRNA to the 40S subunit) — blocking protein synthesis is not what IF-4 itself does.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p75-q13',
      conceptKey: 'five-levels-of-eukaryotic-gene-expression-regulation',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise trimming as a post-translational modification.',
      explanations: {
        a: "Transcriptional modification is not a category applied to trimming; trimming acts on a finished protein chain, not on transcription.",
        b: 'Pretranscriptional regulation covers epigenetics, DNA amount and gene rearrangement — none of which is trimming, a protein-level event.',
        c: 'Posttranscriptional modification covers capping, poly-A tailing, splicing and miRNA, all acting on mRNA; trimming acts on a protein, not mRNA.',
        d: "Listed trimming under Post-Translational Modification of Proteins (discussed in Translation), alongside covalent modification.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p76-q14',
      conceptKey: 'post-translational-covalent-modification-types',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name carboxylation as a covalent modification to a peptide chain.',
      explanations: {
        a: 'Carboxylation, forming γ-carboxyglutamate so clotting proteins can bind calcium, is one of the covalent post-translational modifications.',
        b: 'Trimming is the proteolytic removal of a segment from a precursor protein — the other branch of post-translational modification, not a covalent addition.',
        c: "Capping adds a cap to the 5' end of mRNA, a post-transcriptional modification of RNA, not a covalent modification of a peptide chain.",
        d: 'Editing changes the coding sequence of mRNA (as in the ApoB example), a post-transcriptional RNA event, not a covalent modification of a peptide chain.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p76-q15',
      conceptKey: 'post-translational-covalent-modification-types',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name phosphorylation as a covalent modification that regulates protein function.',
      explanations: {
        a: 'Phosphorylation and dephosphorylation regulate the activity of many proteins, such as the enzymes of glycogen metabolism and regulators of gene transcription.',
        b: 'Trimming is proteolytic removal of a segment from a precursor protein, the other branch of post-translational modification, not a covalent modification that regulates an existing protein’s function.',
        c: 'Polyadenylation adds a poly(A) tail to mRNA, a post-transcriptional RNA modification, not a covalent modification of a protein.',
        d: 'Deamination is not one of the listed covalent protein modifications (phosphorylation, glycosylation, acetylation/methylation, hydroxylation, carboxylation); used cytidine deamination only in the context of mRNA editing.',
      },
    },
  ],
}
