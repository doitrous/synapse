/**
 * `102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes`
 * — the question books' MCQs.
 *
 * 12 rows, grounded in the department book's own chapter
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * p107–p111: "XIV- CELL CYCLE, APOPTOSIS & TUMOR SUPPRESSOR GENES" through
 * the end of the p53 section). 10 rows keep their printed key as-is; 2 had no
 * recoverable printed key (`correctSource: "none"`) but the book settles
 * them cleanly, so those carry an `answerOverride`. Nothing is excluded —
 * every row here is answerable from this chapter's own text.
 *
 * `cell-cycle-phases-g1-s-g2-m-g0` is minted here (its authoritative page,
 * p107) and reused verbatim in the DNA Synthesis, Replication and Repair
 * chapter's own leaf file, because that chapter's question book
 * independently asks which phase DNA replication occurs in. `caspases`
 * option b in the bank prints "Cystine proteases" — read here as the book's
 * own "cysteine proteases" (p109), an ordinary letter-substitution OCR slip
 * rather than a different, unsupported term.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
  modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
  articleId: 'ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES',

  concepts: [
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
      key: 'cyclin-cdk-complexes-and-restriction-point-control-cell-cycle-progression',
      label:
        'Growth-factor binding starts the cell cycle by inducing cyclins, which complex with specific CDKs to drive the cell past the late-G1 restriction point and through each subsequent transition',
      definition:
        'The cell cycle is initiated by binding of a growth factor to a growth factor receptor on the plasma membrane of the cell. This mediates an intracellular signalling cascade that induces cyclin genes. Cyclins complex with and activate certain cyclin-dependent kinases (CDKs) that produce the regulatory effects essential for passage from one phase to the next: CDK4 and CDK6 with cyclin D drive progression past the restriction point at the G1/S boundary; CDK2 with cyclin E or cyclin A drives initiation of DNA synthesis in early S phase; CDK1 with cyclin A or cyclin B drives the transition from G2 to M phase. The restriction point (R) is located at the late G1 stage: cells that pass through R will enter S phase and complete the entire cycle independently of the presence of growth factors.',
      objective:
        'State what triggers entry into the cell cycle, and name which cyclin-CDK complex governs the G1/S restriction point, S-phase initiation, and the G2/M transition.',
      pitfall:
        'Thinking growth factors are needed throughout the cycle. Once a cell passes the restriction point in late G1, it completes the rest of the cycle independently of further growth-factor signalling.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
      type: 'mechanism',
    },
    {
      key: 'cell-cycle-checkpoints-g1-g2-and-spindle-assembly',
      label:
        'Three checkpoints police the cell cycle: the G1 checkpoint checks cell size, nutrients, growth factors and DNA damage; the G2 checkpoint checks cell size and DNA damage; and the spindle-assembly checkpoint checks that chromosomes are properly attached to the spindle',
      definition:
        'There are three checkpoints that ensure DNA and chromosomal structure are intact before the cell cycle is completed. The G1 checkpoint checks for cell size, nutrients, growth factors and DNA damage. The G2 checkpoint checks for cell size and DNA damage. The spindle assembly checkpoint checks for proper attachment of chromosomes to the spindle.',
      objective:
        'Name the three cell-cycle checkpoints and state what each one verifies before letting the cycle proceed.',
      pitfall:
        "Assigning DNA-damage surveillance to the spindle checkpoint. DNA damage is checked at the G1 and G2 checkpoints; the spindle checkpoint's one job is confirming chromosome-to-spindle attachment before anaphase.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
      type: 'classification',
    },
    {
      key: 'apoptosis-definition-and-biological-significance',
      label:
        'Apoptosis is programmed, genetically directed cell death that eliminates harmful cells, shapes development, and maintains adult tissue homeostasis',
      definition:
        'Apoptosis is a programmed genetically directed cell death, a physiological cell-suicide program. It has three biological roles. First, eliminating individual cells whose survival would be harmful to the organism — cells damaged beyond repair, infected with a virus, starving, or under ionizing radiation or toxins causing irreparable DNA damage. Second, development: apoptosis is used during development of the embryo. Third, homeostasis: in healthy adults, cell number stays relatively constant through a balance between cell division and cell death; disturbing that balance can produce abnormal growth and tumours, or abnormal cell loss.',
      objective:
        'Define apoptosis and give its three biological roles: eliminating harmful cells, shaping development, and maintaining tissue homeostasis.',
      pitfall:
        "Equating apoptosis with necrosis. Necrosis is unplanned cell death from injury; apoptosis is the cell's own genetically directed, programmed suicide.",
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
      type: 'mechanism',
    },
    {
      key: 'caspases-and-the-extrinsic-and-intrinsic-apoptotic-pathways',
      label:
        'Caspases are cysteine proteases activated by two apoptotic pathways — the extrinsic pathway through TNF/FAS receptor ligand binding, and the intrinsic pathway through mitochondrial cytochrome c release — both converging on caspase-activated DNase',
      definition:
        'There are two main pathways for apoptosis. The extrinsic pathway is initiated through binding of a ligand to the tumour necrosis factor (TNF) or FAS receptors; this binding activates several caspases, which are intracellular cysteine proteases. Activated caspases activate caspase-activated DNase (CADase), the enzyme that cuts genomic DNA between nucleosomes into fragments of about 200 bp or its multiples, producing the characteristic DNA ladder seen on electrophoresis. The intrinsic (mitochondrial) pathway is used extensively in response to cellular stress; stressors promote release of cytochrome c from mitochondria into the cytosol, and released cytochrome c activates caspases, leading to CADase activation and apoptosis.',
      objective:
        'Name the enzyme class caspases belong to, and trace both the extrinsic and intrinsic pathways to the shared caspase/CADase endpoint.',
      pitfall:
        'Assuming any DNA damage automatically activates the extrinsic pathway. DNA damage and cellular stress work through the intrinsic (mitochondrial, cytochrome c) pathway; the extrinsic pathway starts specifically from a ligand binding the TNF or FAS receptor.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
      type: 'mechanism',
    },
    {
      key: 'cell-cycle-and-apoptosis-regulatory-proteins',
      label:
        'The proteins of the cell cycle and apoptosis divide into cycle regulators, the p53 guardian, the pro-apoptotic and anti-apoptotic Bcl-2 family, and the death receptors that start the extrinsic pathway',
      definition:
        'Cyclin-dependent kinases are the regulatory proteins that, complexed with cyclins, drive the cell from one phase of the cycle to the next. p53 is the guardian of the genome: it arrests the cycle in G1 through p21 after moderate DNA damage and triggers apoptosis through Bax after severe damage. Bax, Bak and Bok are the apoptotic members of the Bcl-2 family and control cytochrome c release; Bcl-2 and Bcl-x are the anti-apoptotic members. The TNF and FAS receptors initiate the extrinsic pathway when their ligands bind.',
      objective:
        'Assign each named protein of the cell cycle and apoptosis to the function it performs.',
      pitfall:
        'Reading Bcl-2 as pro-apoptotic because the whole family is named after it. Bcl-2 itself is the anti-apoptotic member; Bax is the apoptotic one, and under physiological conditions the two are in balance.',
      subject: 'fnd',
      primary: 'DIS-BIO-T06',
      secondary: ['SYS-FND-T01-S02'],
      modulePath: '102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes',
      type: 'classification',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p77-q1',
      conceptKey: 'cell-cycle-phases-g1-s-g2-m-g0',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        'Place DNA replication specifically in the S (synthesis) phase of the cell cycle.',
      explanations: {
        a: 'G1 is a growth phase in which the cell increases in size before committing to divide; DNA is not yet being copied.',
        b: "Correct. S stands for synthesis of DNA — during S phase all of the cell's genetic material is duplicated.",
        c: 'M phase is mitosis, separating the already-duplicated genetic material into two daughter cells — no new DNA synthesis happens here.',
        d: 'G2 is a further growth phase that prepares the cell for mitosis, after DNA has already been duplicated in S phase.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p77-q2',
      conceptKey: 'cell-cycle-phases-g1-s-g2-m-g0',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        'Name G0 as the quiescent, non-dividing resting phase a cell can enter after G1.',
      explanations: {
        a: 'G1 is still part of the active cycle — the cell is growing and preparing to divide, not resting outside the cycle.',
        b: 'S phase is when DNA is actively being copied, the opposite of a resting quiescent state.',
        c: 'M phase is active mitosis, the most dynamic part of the cycle, not a resting state.',
        d: 'Correct. G0 is the quiescent phase a cell enters after G1 if it stops dividing; the cell rests, performing its function without dividing, and for some cells (like most adult neurons) this is permanent.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p77-q3',
      conceptKey: 'cell-cycle-phases-g1-s-g2-m-g0',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        'State that mitosis (M phase) is when the cell physically divides into two daughter cells.',
      explanations: {
        a: 'G1 phase is a growth stage before division, not the stage where the cell actually splits into two.',
        b: 'S phase duplicates the genetic material but does not itself produce two separate cells.',
        c: "Correct. M phase is mitosis, the stage where the cell separates the two copies of its genetic material into two identical daughter cells.",
        d: 'G2 phase is a further growth and preparation stage that precedes mitosis, not the division itself.',
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book states directly (p107): 'M phase: the stage of mitosis where the cell separates the two copies of the genetic material into two identical daughter cells.'",
    },
    {
      key: 'MCQ-102-07f0a0ff-p77-q4',
      conceptKey: 'cyclin-cdk-complexes-and-restriction-point-control-cell-cycle-progression',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'State that binding of a growth factor to its receptor is what initiates the cell cycle.',
      explanations: {
        a: 'An enzyme in general is too vague and is not what the book names as the initiating signal — the specific trigger is a growth factor binding its receptor.',
        b: 'Correct. The book states the cell cycle is initiated by binding of a growth factor to a growth factor receptor on the plasma membrane, which triggers an intracellular signalling cascade that induces cyclin genes.',
        c: "A hormone is a different kind of signalling molecule from the growth factor the book specifically names as the cycle's initiating ligand.",
        d: 'A transcription factor acts downstream, inside the nucleus, once the signalling cascade is already running — it is not itself the initiating binding event at the membrane.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p77-q5',
      conceptKey: 'cyclin-cdk-complexes-and-restriction-point-control-cell-cycle-progression',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective:
        'Pair CDK4 with cyclin D as the complex that drives progression past the G1/S restriction point.',
      explanations: {
        a: 'Cyclin A pairs with CDK1 (G2/M transition) or CDK2 (S phase initiation) in the book\'s table, not with CDK4.',
        b: 'Cyclin B pairs with CDK1 for the G2-to-M transition, not with CDK4.',
        c: 'Correct. The book\'s table pairs CDK4 (and CDK6) with cyclin D for progression past the restriction point at the G1/S boundary.',
        d: 'Cyclin E pairs with CDK2 for initiation of DNA synthesis in early S phase, not with CDK4.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p77-q7',
      conceptKey: 'cell-cycle-checkpoints-g1-g2-and-spindle-assembly',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'State that the spindle assembly checkpoint verifies proper chromosome-to-spindle attachment before the cell divides.',
      explanations: {
        a: 'Correct. The book states the spindle assembly checkpoint checks for proper attachment of chromosomes to the spindle.',
        b: 'Checking cell size belongs to the G1 and G2 checkpoints, not to the spindle assembly checkpoint.',
        c: "Checking for DNA damage belongs to the G1 and G2 checkpoints; the spindle checkpoint's job is specifically about chromosome-spindle attachment.",
        d: 'Checking for growth factors is part of the G1 checkpoint, which also verifies nutrients and cell size — not a job the book assigns to the spindle assembly checkpoint.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p78-q8',
      conceptKey: 'cyclin-cdk-complexes-and-restriction-point-control-cell-cycle-progression',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective:
        'Define the restriction point as the late-G1 point beyond which a cell commits to completing the cycle independently of growth factors.',
      explanations: {
        a: 'Checking for DNA damage is the job of the G1 and G2 checkpoints, a separate mechanism from the restriction point.',
        b: 'Ensuring normal cell size is part of what the G1 (and G2) checkpoints verify, not what defines the restriction point itself.',
        c: 'Correct. The book states the restriction point (R), located in late G1, is the point beyond which cells that pass through will enter S phase and complete the entire cycle independently of the presence of growth factors.',
        d: 'DNA replication happens afterward, in S phase — the restriction point is the commitment point that precedes and permits entry into S phase, not replication itself.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p78-q9',
      conceptKey: 'apoptosis-definition-and-biological-significance',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective:
        'Define apoptosis as genetically programmed cell death, distinct from necrosis or mutation.',
      explanations: {
        a: 'Necrosis is unplanned cell death caused by injury, not the genetically directed process the question describes.',
        b: 'A mutation is a change in DNA sequence, not a description of a cell-death process at all.',
        c: "Correct. The book defines apoptosis as 'a programmed genetically directed cell death (physiological cell suicide program).'",
        d: 'A transversion is a specific type of point mutation (purine-for-pyrimidine substitution), unrelated to programmed cell death.',
      },
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key was recovered (correctSource: none). The book states directly (p109): 'Apoptosis is a programmed genetically directed cell death (physiological cell suicide program).'",
    },
    {
      key: 'MCQ-102-07f0a0ff-p78-q11',
      conceptKey: 'caspases-and-the-extrinsic-and-intrinsic-apoptotic-pathways',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective:
        'Identify caspases as a class of cysteine proteases activated during apoptosis.',
      explanations: {
        a: 'Serine proteases are a different enzyme class (e.g., trypsin, chymotrypsin) from the one the book assigns to caspases.',
        b: "Correct, allowing for the book's own spelling ('cystine' rather than 'cysteine'). The book states caspases are intracellular cysteine proteases.",
        c: 'Aspartate proteases are a different enzyme class (e.g., pepsin) from the one the book assigns to caspases.',
        d: 'Hydrolases is too broad a category — proteases are a subclass of hydrolases, but the question asks for the specific class, which the book gives as cysteine proteases.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p78-q12',
      conceptKey: 'caspases-and-the-extrinsic-and-intrinsic-apoptotic-pathways',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'Name mitochondria as the organelle whose cytochrome c release initiates the intrinsic apoptotic pathway.',
      explanations: {
        a: 'The nucleus houses the DNA whose damage can trigger apoptosis, but the intrinsic pathway itself is initiated by mitochondria releasing cytochrome c, not by the nucleus directly.',
        b: 'Correct. The book names the intrinsic (mitochondrial) pathway for cellular stress that promotes release of cytochrome c from mitochondria into the cytosol, activating caspases.',
        c: 'The endoplasmic reticulum is not the organelle the book names for initiating the intrinsic apoptotic pathway.',
        d: 'Lysosomes are not the organelle the book names for initiating the intrinsic apoptotic pathway.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p78-q13',
      conceptKey: 'caspases-and-the-extrinsic-and-intrinsic-apoptotic-pathways',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'State that cellular stress, including DNA damage, is what triggers mitochondrial cytochrome c release in the intrinsic pathway.',
      explanations: {
        a: 'Correct. The book states the intrinsic pathway is used extensively in response to different forms of cellular stress, and stressors — including DNA damage — promote the release of cytochrome c from mitochondria into the cytosol.',
        b: "Caspase 8 acts downstream of the extrinsic pathway's receptor activation, not as the trigger for cytochrome c release.",
        c: 'Caspase 9 is activated after cytochrome c is released, as part of the intrinsic pathway\'s downstream cascade — it is a consequence, not the trigger, of the release.',
        d: 'Caspase-activated DNase acts even further downstream, cutting genomic DNA after caspases are already active — it does not trigger the initial cytochrome c release.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p79-q15',
      conceptKey: 'cell-cycle-and-apoptosis-regulatory-proteins',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective:
        'Identify Bcl-2 as the anti-apoptotic member among the named Bcl-2 family genes.',
      explanations: {
        a: 'Bax is one of the pro-apoptotic members of the Bcl-2 family, controlling cytochrome c release — the opposite of anti-apoptotic.',
        b: 'Bok, like Bax, is a pro-apoptotic member of the Bcl-2 family, not the anti-apoptotic one.',
        c: 'Bak is also a pro-apoptotic member of the Bcl-2 family.',
        d: 'Correct. Bcl-2 is the anti-apoptotic member of the family named after it — under physiological conditions it balances the pro-apoptotic Bax, Bak and Bok.',
      },
    },
  ],
}
