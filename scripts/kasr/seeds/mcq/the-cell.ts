/**
 * `101 ISK > Histology > Cytology > The cell` — the question books' MCQs.
 *
 * Fifty rows carry this leaf in the bank. Forty-one are authored here; nine are
 * authored in `cytoplasm.ts` instead, and the reason is worth stating because it
 * recurs. `cis-face-of-golgi`, `transfer-vesicles`, `well-developed-rer` and
 * `finger-like-projection-covered-by-cell-membrane` are Golgi, rER and cilium
 * questions that the extractor filed under this leaf. Their concepts belong to
 * `Cytoplasm` and are minted there. The emitter writes one concept block per
 * (leaf, concept) pair, so declaring the same concept in two leaves emits the
 * same concept id twice and the validator rejects the file — a concept can be
 * shared with a batch it is not in, but not with a sibling leaf inside this one.
 * Rather than mint rival Golgi and cilium concepts for four questions, the four
 * questions moved to where their teaching lives, which also gives them the one
 * article in this module that actually exists.
 *
 * The other five are the endocytosis questions — `clathrin`, `coated-vesicles`,
 * the two pinocytosis rows and the phagocytosis row. Endocytosis is one concept,
 * and `Cytoplasm` asks it fourteen more times than this leaf does, so the
 * concept is declared there and these five went with it rather than the fourteen
 * coming here. The department book teaches endocytosis in its cytoplasm chapter
 * too, which is the same judgement made independently.
 *
 * What is left is one coherent chapter: the plasma membrane. The books examine
 * it four ways and they examine it very hard — thickness alone is asked five
 * times in four different unit traps, and the cell coat is asked nine times.
 *
 * The junction concept is minted here because three junction questions were
 * filed under this leaf, but its `modulePath` points at
 * `Epithelial Tissues > Polarity and Membranous Specializations`, which is where
 * the department book teaches junctions and where the 87-question leaf that will
 * examine them properly lives. Whoever authors that leaf should reuse
 * `cell-junction-types-and-what-each-does` rather than mint a rival — and will
 * have to move these three questions here into that file, or move this concept
 * there, because the same duplicate-id rule applies.
 *
 * Five answers are overridden here and a sixth, `clathrin`, in `cytoplasm.ts`.
 * Two of them — `which-molecule-of-the-cell-membrane-has-a-stabilizing-effect`
 * and `one-of-the-followings-is-not-a-function-of-the-cell-membrane` — are keyed
 * wrong in the books by one letter, and in both cases the same book keys the
 * matching question correctly, which is what makes the misprint visible.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'The cell',
  modulePath: '101 ISK > Histology > Cytology > The cell',
  articleId: 'ART-101-HIS-THE-CELL',

  concepts: [
    {
      key: 'plasma-membrane-unit-membrane-em-and-thickness',
      label: 'The plasma membrane is a 7.5–10 nm trilaminar unit membrane, invisible in H&E and shown only by silver or PAS',
      definition:
        'The plasma membrane, or plasmalemma, is the limiting membrane that envelopes every cell, and it is 7.5–10 nm thick. On electron microscopy it is trilaminar — the unit membrane — two dark, electron-dense layers separated by an intermediate light, electron-lucent layer. On light microscopy it is not resolved with haematoxylin and eosin and has to be demonstrated with silver or with PAS, both of which act on the carbohydrate of its outer coat rather than on the membrane itself. The books set it against three other membranous terms: the glycocalyx is its own outer coat, cristae are the folds of the inner mitochondrial membrane, and cisternae are the sacs of the endoplasmic reticulum.',
      objective:
        'Give the thickness of the plasma membrane in the right unit, describe its trilaminar appearance on electron microscopy, and name the stains that show it by light microscopy.',
      pitfall:
        'Reading 7.5–10 in the wrong unit. Nanometres is the only order of magnitude that fits: micrometres would make the membrane thicker than most organelles, and angstroms would make it thinner than one lipid molecule.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > The cell',
      type: 'structural_description',
      aliases: ['Plasmalemma', 'Unit membrane', 'Trilaminar membrane'],
    },
    {
      key: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      label: 'The cell membrane is a phospholipid bilayer with cholesterol, peripheral and integral proteins, and carbohydrate on its outer face',
      definition:
        'The cell membrane is built of lipid, protein and carbohydrate. The lipid is phospholipid arranged as a bilayer, hydrophilic heads facing outwards to the aqueous solution on either side and hydrophobic tails directed inwards; cholesterol lies among the fatty acid tails, restricting phospholipid movement and so stabilising the membrane. Protein is about half the membrane mass and takes two forms: peripheral proteins, loosely attached to either surface, and integral or transmembrane proteins, which cross the bilayer and act as channel proteins for ions and water and as carrier proteins for small polar molecules such as glucose and for the sodium–potassium pump. The carbohydrate lies on the external surface only. Beneath the inner surface a cytoskeleton of peripheral proteins gives the red cell its elasticity and flexibility and holds its biconcave shape, while the membrane\'s own selective permeability lets gases cross and keeps haemoglobin in.',
      objective:
        'Name the three molecular components of the cell membrane, say where each sits, and give what each one does.',
      pitfall:
        'Swapping peripheral for integral. Only an integral protein crosses the bilayer, and only an integral protein can be a channel or a pump; a peripheral protein rests on a surface and is loosely attached.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > The cell',
      type: 'structure_function_relationship',
      aliases: ['Fluid mosaic model', 'Integral protein', 'Peripheral protein', 'Membrane cholesterol'],
    },
    {
      key: 'cell-coat-glycocalyx-composition-and-functions',
      label: 'The cell coat is the carbohydrate of the outer membrane surface, and it does the cell\'s recognising, adhering and receiving',
      definition:
        'The cell coat, or glycocalyx, is the fuzzy layer of glycoprotein and glycolipid molecules on the external surface of the cell membrane and on that surface only. It is not seen with haematoxylin and eosin but is demonstrated with PAS or with silver, because it is carbohydrate. It functions in cell adhesion, in cell identification and recognition, in protection and in cell immunity, and it carries the cell\'s specific receptors — for drugs, for hormones, for bacteria and for viruses. The blood group antigens are cell coat molecules on the erythrocyte surface, and a receptor of this kind is what makes one cell answer a signal another cell ignores.',
      objective:
        'State where the cell coat lies, what it is made of, how it is demonstrated, and list its functions including its work as the cell\'s receptor field.',
      pitfall:
        'Putting the coat on the inner surface as well as the outer. It is on the outer surface only; the inner surface carries the cytoskeleton, and swapping the two is the commonest way this question is failed.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > The cell',
      type: 'structure_function_relationship',
      aliases: ['Glycocalyx', 'Cell coat', 'Membrane receptors'],
      gaps: [
        'Two rows filed under this leaf name the immunoglobulin the basophil and the mast cell have membrane receptors for. The cell-specific facts belong to `basophil-granule-contents-and-anaphylaxis` and `mast-cell-identification`, both already minted in other batches; they are taught in the option explanations here rather than duplicated as a concept, because a concept already declared by a sibling leaf of this batch cannot be declared again without emitting a duplicate id.',
      ],
    },
    {
      key: 'cell-junction-types-and-what-each-does',
      label: 'Four lateral junctions are told apart by the width of the intercellular space and by what is anchored on the cytoplasmic side',
      definition:
        'Epithelial cells are linked laterally by four junctions. In the tight or occluding junction, the zonula occludens, the two adjacent cell membranes actually fuse at points through transmembrane proteins, leaving no space between them at all, and it encircles the apex of the cell like a belt, restricting passage between the cells. In the adherens junction, the zonula adherens, a wide intercellular space is bridged by transmembrane proteins joined with the help of calcium ions, and condensed protein on the cytoplasmic side binds them to actin filaments; it too encircles the cell. The macula adherens, or desmosome, has the same calcium-dependent bridging but its cytoplasmic attachment plaque anchors intermediate filaments, and it does not encircle the cell — it is scattered as circular spots and is the strongest junction, found where surfaces meet friction. The gap junction, or nexus, leaves a narrow gap bridged by channels, each built of six symmetrical transmembrane protein subunits, through which ions and small molecules pass between cells and impulses pass between muscle cells. Zonula occludens, zonula adherens and desmosome together make the junctional complex.',
      objective:
        'Name the four lateral cell junctions and distinguish them by intercellular spacing, by the filament each anchors, and by what each one is for.',
      pitfall:
        'Attributing membrane fusion to the gap junction. Only the zonula occludens fuses the two membranes; the gap junction leaves a real gap and bridges it — that is the whole point of the name.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'classification',
      aliases: ['Zonula occludens', 'Zonula adherens', 'Macula adherens', 'Desmosome', 'Gap junction', 'Nexus', 'Connexon', 'Junctional complex'],
    },
  ],

  questions: [
    {
      key: 'integral-proteins-are-represented-by-67d353fa',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the integral protein as the one that crosses the bilayer.',
      explanations: {
        A: 'A non-continuous layer describes the way peripheral proteins are scattered over the membrane surfaces, not the integral protein.',
        B: 'This is the definition of a peripheral protein — loosely attached to either surface — and it is the exact opposite of an integral one. It is the option most often taken by students who read "integral" as "important" rather than as "built in".',
        C: 'Small molecules are what integral proteins carry, not what they are. Glucose and ions cross through them; they are not made of them.',
        D: 'Correct. Integral proteins are transmembrane: they run right through the lipid bilayer, which is what allows them to be channels for ions and water and carriers such as the sodium–potassium pump.',
      },
    },
    {
      key: 'a-teen-ager-presenting-with-slower-growth-rate-than-expected-b74b876c',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Explain a failure of hormone action when the hormone level itself is normal.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book\'s own applied note gives this exact case: despite a normal blood level of growth hormone, lack of growth hormone receptors on the target cell membrane causes a type of dwarfism. Only option C states both halves — receptors defective, hormone level normal.',
      explanations: {
        A: 'A low hormone level would explain the failure without any receptor being involved, and the point of the question is a target cell that cannot hear a message that is being sent normally.',
        B: 'A defect of the whole cell membrane would not produce a picture confined to growth and sexual development. What is selective here is the receptor, not the membrane.',
        C: 'Correct. The hormone is present in the blood at a normal level, but the target cell has no receptors on its coat to bind it, so the signal is never received — the department book gives this as a cause of dwarfism.',
        D: 'The receptors that bind circulating hormones sit on the cell coat at the external surface, where the hormone can reach them. Endoplasmic reticulum is inside the cell and a blood-borne hormone never arrives there.',
      },
    },
    {
      key: 'about-function-of-cell-coat-which-of-the-followings-is-true-4c3a712c',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'List all the functions of the cell coat rather than stopping at the first true one.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A, B and C are each stated by the department book as a cell coat function, so the only option that is not incomplete is D.',
      explanations: {
        A: 'True, but not the whole answer. Cell recognition — one cell identifying another as self or foreign — is a cell coat function.',
        B: 'True, but not the whole answer. Adhesion of cells to each other is a cell coat function.',
        C: 'True, but not the whole answer. The coat carries the specific receptors for drugs, hormones, bacteria and viruses.',
        D: 'Correct. Recognition, adhesion and reception are three of the coat\'s functions and the book lists protection and cell immunity beside them; a student who stops at the first true option has answered a third of the question.',
      },
    },
    {
      key: 'all-the-following-statements-about-the-cell-membrane-are-tru-16e0d7f2',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place the cell coat on the outer surface and nowhere else.',
      explanations: {
        A: 'True, so not the exception. 7.5–10 nm is the thickness the department book gives.',
        B: 'True, so not the exception. The membrane is below the resolving power of the light microscope in an H&E section, which is why it has to be inferred rather than seen.',
        C: 'The exception, and the answer. Picked by students who remember that peripheral proteins sit on both surfaces and extend that to the coat. The carbohydrate is added on the external face only; the inner surface carries the cytoskeleton instead.',
        D: 'True, so not the exception. Silver and PAS both act on the carbohydrate of the coat, and they are the only way the membrane is shown by light microscopy.',
      },
    },
    {
      key: 'all-the-following-statements-concerning-gap-junction-nexus-a-ccc0e3ee',
      conceptKey: 'cell-junction-types-and-what-each-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Distinguish a bridged gap from a true membrane fusion.',
      explanations: {
        A: 'True, so not the exception. The gap junction leaves a narrow intercellular cleft — narrow, but a real one.',
        B: 'True, so not the exception. The minute structures crossing that cleft are the connexons.',
        C: 'True, so not the exception. Each channel is built of six symmetrical transmembrane protein subunits.',
        D: 'The exception, and the answer. Actual fusion of the two membranes belongs to the zonula occludens, where the distance between them falls to zero. The gap junction is named for the gap it keeps; a student who has learnt "junction means the membranes join" picks this one.',
      },
    },
    {
      key: 'as-regards-the-glycocalyx-4b212a1d',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Choose the true statement about the glycocalyx from three near-misses about its position and composition.',
      explanations: {
        A: 'The coat is on the external surface only. This option is the mirror of the commonest error, and it is what students choose when they generalise from peripheral proteins, which really are on both.',
        B: 'The glycocalyx projects from the outer face of the bilayer; it is not embedded within it. What is embedded in the lipid is cholesterol and the integral proteins.',
        C: 'It is formed of glycoproteins and glycolipids — that is, of the carbohydrate attached to protein and to lipid. Naming proteins and lipids without the sugar leaves out the only part that makes it a glycocalyx.',
        D: 'Correct. Adhesion and recognition are the coat\'s two headline functions, and both follow from its being the outermost, cell-specific layer of the cell.',
      },
    },
    {
      key: 'by-em-cell-membrane-63886849',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the trilaminar unit membrane completely.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A, B and C are the three parts of one statement — the unit membrane is three layers, the outer two electron dense and the middle electron lucent — so no single one of them can be the answer.',
      explanations: {
        A: 'True, but not the whole answer. Three layers is what "trilaminar" means and what "unit membrane" names.',
        B: 'True, but not the whole answer. The two dark lines are the electron-dense outer and inner layers.',
        C: 'True, but not the whole answer. The middle layer is electron lucent, which is why the membrane reads as two dark lines with a clear one between them.',
        D: 'Correct. The three options are one description broken into pieces, and the question is testing whether the whole trilaminar picture is held together.',
      },
    },
    {
      key: 'cell-coat-201d4c3e',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the one false statement in a set about the cell coat.',
      explanations: {
        A: 'True. The coat is a mixture of glycolipid and glycoprotein — sugar carried on the lipid and on the protein of the outer leaflet.',
        B: 'True. The receptors for drugs, hormones, bacteria and viruses are part of the coat.',
        C: 'False, and it is the statement the answer excludes. The coat is on the external surface only.',
        D: 'Correct. A and B are true and C is false, so "all except C" is the only option that holds. A student who reads only as far as C and stops has taken the trap the option set is built around.',
      },
    },
    {
      key: 'cell-membrane-is-formed-of-65999b42',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name all three molecular components of the cell membrane.',
      explanations: {
        A: 'True, but not the whole answer. Lipid is the phospholipid bilayer plus cholesterol.',
        B: 'True, but not the whole answer. Carbohydrate is the smallest component by mass and sits on the outer surface only, but it is a component.',
        C: 'True, but not the whole answer. Protein is about half the membrane by mass.',
        D: 'Correct. Lipid, protein and carbohydrate — the three-part answer the department book\'s own heading gives.',
      },
    },
    {
      key: 'cell-membrane-of-basophils-shows-receptors-for-1ba389ea',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the immunoglobulin whose receptor the basophil membrane carries.',
      explanations: {
        A: 'IgA is the immunoglobulin of secretions — tears, saliva, gut and airway mucus. Nothing puts a receptor for it on the basophil.',
        B: 'Correct. The basophil membrane carries receptors for IgE, and that is why a second exposure to an allergen makes the cell degranulate and release its histamine.',
        C: 'IgM is the first antibody of a primary response and the largest. Chosen by students reasoning from size or from primacy, neither of which is what the receptor is selected for.',
        D: 'IgD sits on the surface of B lymphocytes as an antigen receptor. It is a membrane immunoglobulin, which makes it tempting, but it is on a different cell.',
      },
    },
    {
      key: 'cell-recognition-and-adhesion-is-a-function-of-f52be7c2',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction — cholesterol, intrinsic proteins and cell coat — and the contract is four to five. The question itself is sound and its answer is the cell coat; the fourth option is worth recovering when the page is rescanned, because the same three-option shape appears in several rows from this book and a rescan would fix them together.',
    },
    {
      key: 'concerning-highly-selective-lipoproteins-of-plasmalemma-whic-9671041b',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise selective permeability as keeping large molecules in while letting gases through.',
      explanations: {
        A: 'True, so not the false one. Oxygen and carbon dioxide cross the lipid bilayer freely, which is the whole basis of the red cell\'s work.',
        B: 'False, and therefore the answer. If haemoglobin could escape, the red cell would empty itself into the plasma; selectivity means small gases pass and the large protein does not.',
        C: 'True, so not the false one. It is the same statement as B with the sense reversed, and having both in one option set is the point — a student who reads quickly will pick whichever they see first.',
        D: 'There is a false statement in the set, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'function-of-cell-coat-55edfeb5',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall the full list of cell coat functions.',
      explanations: {
        A: 'True, but not the whole answer. Identification and adhesion are the two functions most often quoted.',
        B: 'True, but not the whole answer. The book lists cell immunity among the coat\'s functions.',
        C: 'True, but not the whole answer. Protection is on the same list.',
        D: 'Correct. The department book gives adhesion, identification, protection and cell immunity together, so any single option leaves most of the list out.',
      },
    },
    {
      key: 'function-of-the-cell-coat-is-are-4a64a309',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall the full list of cell coat functions.',
      explanations: {
        A: 'True, but not the whole answer. Adhesion of one cell to another is a coat function.',
        B: 'True, but not the whole answer. Recognition of self from foreign is a coat function.',
        C: 'True, but not the whole answer. The specific receptors of the cell are carried on the coat.',
        D: 'Correct. All three are coat functions; the question is asked in this shape three separate times across the books, which is a fair measure of how much weight the department puts on it.',
      },
    },
    {
      key: 'gap-junction-is-characterized-by-1f9d3863',
      conceptKey: 'cell-junction-types-and-what-each-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the gap junction by what passes through it rather than by what holds it together.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A, B and C each describe a different junction — desmosome, adherens junction and adherens junction again — and only D describes the gap junction, whose channels carry ions and small molecules.',
      explanations: {
        A: 'Sites of mechanical stress and friction are where desmosomes are, because the desmosome is the strongest junction. The gap junction is a communication device and adds almost nothing to adhesion.',
        B: 'An intercellular space filled with adhesive material describes the adherens junction and the desmosome, where transmembrane proteins are joined across a wide gap with calcium.',
        C: 'Condensation of actin on the cytoplasmic side is the zonula adherens. Intermediate filaments, not actin, go to the desmosome, and nothing is anchored at a gap junction.',
        D: 'Correct. The gap junction\'s channels let ions and small molecules pass directly from one cytoplasm to the next, which is also how impulses travel between muscle cells.',
      },
    },
    {
      key: 'glycocalyx-can-be-detected-by-6838cdd7',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Choose the stains that demonstrate carbohydrate.',
      explanations: {
        A: 'H&E shows neither the membrane nor its coat; the coat is too thin and too little coloured by either dye. This is the option taken by students who assume that anything on a routine slide must be H&E-visible.',
        B: 'True, but not the whole answer. PAS is the carbohydrate stain and it does show the coat.',
        C: 'True, but not the whole answer. Silver also demonstrates it.',
        D: 'Correct. Both PAS and silver work, and both work for the same reason — they are acting on the sugar of the glycoproteins and glycolipids, not on the membrane itself.',
      },
    },
    {
      key: 'glycocalyx-is-f396eee7',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the glycocalyx as the carbohydrate component of the membrane.',
      explanations: {
        A: 'The protein component is the peripheral and integral proteins. "Glyco-" is the part of the word that names what this actually is.',
        B: 'Correct. The glycocalyx is the carbohydrate of the cell membrane, presented as glycoproteins and glycolipids on the outer surface.',
        C: 'The hydrophilic end of the phospholipid is its head, which faces the aqueous solution. It is on the outer surface too, which is what makes this option tempting, but it is lipid, not sugar.',
        D: 'The hydrophobic end is the fatty acid tail, and it points inwards, away from the surface entirely.',
      },
    },
    {
      key: 'glycocalyx-is-formed-of-fe73fdc5',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the two molecule types that make up the cell coat.',
      explanations: {
        A: 'Lipoproteins are what the membrane as a whole is often called. The coat is specifically the sugar carried on lipid and on protein, and "lipoprotein" leaves the sugar out.',
        B: 'Correct. Glycolipids and glycoproteins — carbohydrate attached to the lipid and to the protein of the outer leaflet.',
        C: 'Proteoglycans are ground substance molecules of connective tissue. They are sugar-rich, which is why the option looks plausible, but they are extracellular matrix, not membrane coat.',
        D: 'Phospholipids and cholesterol are the lipid of the bilayer itself, underneath the coat rather than part of it.',
      },
    },
    {
      key: 'how-thick-is-the-plasma-membrane-6b2c29ab',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give membrane thickness in the correct unit.',
      explanations: {
        A: 'Angstroms are a tenth of a nanometre, so 7.5–10 Å would be under a nanometre — thinner than a single phospholipid molecule, and thinner than one leaflet of the bilayer.',
        B: 'Correct. 7.5–10 nm, which is why the membrane cannot be resolved by light microscopy and needs the electron microscope.',
        C: 'Micrometres would make the membrane about the width of a red blood cell. The whole point of the figure is that the membrane is far below light-microscopic resolution.',
        D: 'Millimetres would make it visible to the naked eye. The option is in the set only to mark the far end of the unit ladder that this question is entirely about.',
      },
    },
    {
      key: 'in-zonula-occludens-distance-between-two-cell-membranes-is-34543e04',
      conceptKey: 'cell-junction-types-and-what-each-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State the intercellular distance at a tight junction.',
      explanations: {
        A: '20 nm is roughly the wide intercellular space of an adherens junction or a desmosome. Chosen by students who know the tight junction is narrow but not that it is nothing.',
        B: '20 µm is a thousand times too large — wider than most whole cells, so no junction could span it.',
        C: 'Correct. At the zonula occludens the two membranes fuse at points, so the distance between them falls to zero. That is why the junction seals the space and stops material passing between the cells.',
        D: '200 µm is larger still, and is in the set only as the far end of the unit ladder.',
      },
    },
    {
      key: 'in-zonula-occludens-the-distance-between-two-cell-membranes-27398749',
      conceptKey: 'cell-junction-types-and-what-each-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option letters have collapsed into one another: option A carries two options ("20nm" and "20 um"), option B is a sentence cut off mid-clause, and option C carries both "Zero" and "200 um" with a stray "0." between them. A student cannot choose a letter when two answers share one. The intact copy of this question is `in-zonula-occludens-distance-between-two-cell-membranes-is-34543e04` and its answer is zero; this row is a duplicate and is kept so a rescan knows it is not a separate question.',
    },
    {
      key: 'junctional-complex-e-adjacent-plasmalemma-fuse-at-certain-po-ab80cb2e',
      conceptKey: 'cell-junction-types-and-what-each-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a multiple-choice question at all. The stem is the tail of a matching exercise — junction names against lettered descriptions — with a page header and a running footer read into it, and the three "options" are the section headings of the answer key that followed ("MCQ", "Problem solving", "Matchin"). Rescanning will recover a matching exercise, not an MCQ, so this row should be re-extracted as one rather than repaired here.',
    },
    {
      key: 'one-of-the-followings-is-not-a-function-of-the-cell-membrane-5d49d8d0',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate what the membrane does from what the nucleus does.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys B, and passive diffusion is a membrane function — it is the plainest one there is. RNA synthesis happens in the nucleus and is the only listed activity the membrane has no part in. The key is one letter off; the answer is D.',
      explanations: {
        A: 'Active transport is a membrane function: the sodium–potassium pump is an integral protein of the membrane.',
        B: 'Passive diffusion is a membrane function too, and the most basic one — gases cross the bilayer by it without any protein at all. This is the option the book keys, and taking it would mean denying that anything crosses a membrane unaided.',
        C: 'Phagocytosis is a membrane function: the pseudopodia that surround a particle are membrane, and the phagosome is made from it.',
        D: 'Correct. RNA synthesis is done in the nucleus on a DNA template. It is the one item on the list the plasma membrane has nothing to do with.',
      },
    },
    {
      key: 'phospholipids-molecules-in-the-cell-membrane-have-f3e26c7c',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The row has a second problem worth flagging to whoever rescans it: the book keys B, "hydrophobic heads directed inwards", but the head of a phospholipid is hydrophilic by definition and it is the tails that point inwards. The correct surviving option is A. Both the missing option and the key need the page.',
    },
    {
      key: 'protein-components-of-the-cell-membrane-is-9c02ac05',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Distinguish peripheral from integral protein by position.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Each of A, B and C states a protein type on the wrong side of the bilayer; only D — integral proteins may cross the lipid bilayer — is as the department book has it.',
      explanations: {
        A: 'Peripheral proteins are outside the lipid bilayer, on one surface or the other. Inside the bilayer is where the integral proteins are.',
        B: 'The first half is right — peripheral proteins are outside the bilayer — but they are not a continuous layer; they are scattered and loosely attached. "Continuous" is what makes this option false.',
        C: 'Integral proteins are not outside the bilayer. This option and A are the same swap made in both directions, which is what the question is set to catch.',
        D: 'Correct. Integral proteins are transmembrane: they may cross the whole bilayer, which is what lets them serve as channels and pumps.',
      },
    },
    {
      key: 'responsible-for-blood-grouping-c0d98d93',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Attribute the blood group antigens to the cell coat.',
      explanations: {
        A: 'Correct. The blood group antigens are glycoprotein and glycolipid molecules of the cell coat on the outer surface of the red cell — cell identification, which is exactly what the coat is for.',
        B: 'The membrane cytoskeleton on the inner surface gives the red cell its elasticity and its biconcave shape. It faces the cytoplasm, so it cannot be what another person\'s antibodies recognise.',
        C: 'Cholesterol stabilises the bilayer. It is the same in every red cell of every group and carries no identity.',
        D: 'Phospholipids likewise are structural and identical between people. Only the sugar of the coat varies enough to type blood by.',
      },
    },
    {
      key: 'responsible-for-rbcs-elasticity-flexibility-9553639e',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute red cell deformability to the membrane cytoskeleton on the inner surface.',
      explanations: {
        A: 'The cell coat on the outer surface carries the blood group antigens. It identifies the cell; it does not give it shape. This is the paired question to `responsible-for-blood-grouping`, with the same four options, and swapping the two answers is what the pair is designed to catch.',
        B: 'Correct. The network of peripheral proteins on the inner surface of the plasma membrane is what lets the red cell fold through a capillary narrower than itself and spring back.',
        C: 'Cholesterol stabilises the bilayer and restricts phospholipid movement — it makes the membrane less mobile, not more deformable.',
        D: 'Phospholipids form the bilayer, which is fluid but has no mechanical memory of its own. Shape and recoil come from the protein scaffold beneath it.',
      },
    },
    {
      key: 'the-carbohydrate-coat-that-is-found-on-the-outer-surface-of-d9839b49',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the carbohydrate coat.',
      explanations: {
        A: 'Plasmalemma is the membrane itself, the structure the coat sits on.',
        B: 'Correct. Glycocalyx is the name for the carbohydrate coat of the outer membrane surface.',
        C: 'Cristae are the folds of the inner mitochondrial membrane. They are in the option set because this book uses one quartet of membranous terms across several questions.',
        D: 'Cisternae are the flattened sacs of the endoplasmic reticulum and the Golgi.',
      },
    },
    {
      key: 'the-carbohydrate-content-on-the-outer-side-of-the-plasma-mem-cb5b868f',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived extraction, glycolipid and glycoprotein, and the contract is four to five. Worse, both are true of the coat, so even the intact question may have been answerable only as "both" — a third and fourth option are needed before it can be judged. Recoverable only by rescanning the page.',
    },
    {
      key: 'the-cell-limiting-membrane-is-2db052d2',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the limiting membrane of the cell.',
      explanations: {
        A: 'Correct. The plasmalemma is the limiting membrane that envelopes the cell — that is the department book\'s own definition of it.',
        B: 'The glycocalyx is carried on the plasmalemma\'s outer surface. It is a coat, not a membrane, and it does not limit the cell by itself.',
        C: 'Cristae are folds of the inner mitochondrial membrane, inside an organelle rather than around the cell.',
        D: 'Cisternae are the sacs of the endoplasmic reticulum, again inside the cell.',
      },
    },
    {
      key: 'the-cell-membrane-can-be-demonstrated-by-8432d012',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Choose the stain that shows the cell membrane by light microscopy.',
      explanations: {
        A: 'H&E does not show it. This is the option most students take, because H&E is the slide they see every week — but the membrane is below the light microscope\'s resolution and neither dye concentrates in it.',
        B: 'Correct. PAS stains the carbohydrate of the cell coat, and it is that reaction, not the membrane itself, which makes the cell outline visible.',
        C: 'Sudan III is a fat stain, used on frozen sections for fat inclusions. The membrane\'s lipid is far too little to show with it.',
        D: 'Orcein stains elastic fibres in connective tissue and has nothing to do with the cell membrane.',
      },
    },
    {
      key: 'the-cell-membrane-of-the-mast-cells-have-specific-receptors-3ad69631',
      conceptKey: 'cell-coat-glycocalyx-composition-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the immunoglobulin whose receptor the mast cell membrane carries.',
      explanations: {
        A: 'IgM is the first antibody of a primary response, made and released by plasma cells rather than bound at a mast cell surface.',
        B: 'IgG is the commonest circulating immunoglobulin and the one crossing the placenta. Chosen by students reasoning from abundance.',
        C: 'IgA is the immunoglobulin of secretions and is handled by epithelium, not by mast cells.',
        D: 'Correct. The mast cell membrane carries IgE receptors, which is what makes it degranulate on re-exposure to an allergen — the same receptor the basophil has, and the department book compares the two cells directly.',
      },
    },
    {
      key: 'the-cell-membrane-s-thickness-ranges-from-0a4a3dc7',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the membrane thickness as a range within the right order of magnitude.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book gives 7.5–10 nm, which is option C; here every option is in nanometres, so the question tests the figure rather than the unit.',
      explanations: {
        A: '4–6 nm is thinner than the bilayer plus its coat, and is roughly what a single leaflet with its head groups would measure.',
        B: '6–7.5 nm brushes the bottom of the true range without reaching it. This option is set immediately below the answer, so it catches a half-remembered figure.',
        C: 'Correct. 7.5–10 nm is the range the department book gives.',
        D: '10–30 nm is thicker than any plasma membrane and closer to the width of an intercellular gap at an adherens junction.',
      },
    },
    {
      key: 'the-electron-microscopic-picture-of-cell-membrane-a-two-unit-35ca4214',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has been read into the stem — the stem ends "a-Two-unit membranes separated by space" — leaving only three lettered options. The question is sound and its answer is "two dark lines separated by a clear one"; splitting the stem from option A at rescan makes it sittable, and nothing else about the row needs repair.',
    },
    {
      key: 'the-function-of-cholesterol-in-the-cell-membrane-is-to-37301d86',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'State what cholesterol does in the bilayer.',
      explanations: {
        A: 'Channels are integral proteins spanning the bilayer. Cholesterol sits between the fatty acid tails and conducts nothing.',
        B: 'Correct. Cholesterol lies among the hydrophobic tails, restricts the movement of the phospholipids and so stabilises the membrane and modulates its fluidity.',
        C: 'Receptors are on the cell coat and are glycoprotein. Cholesterol is buried in the lipid interior where no extracellular ligand could reach it.',
        D: 'Both a and c would need cholesterol to be a channel and a receptor, and it is neither. This is the option for a student who thinks a lipid this famous must be doing more than one thing.',
      },
    },
    {
      key: 'the-inner-folds-of-mitochondrial-membrane-are-called-90464254',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Tell the plasmalemma apart from the other membranous terms the books offer beside it.',
      explanations: {
        A: 'Plasmalemma is the limiting membrane of the whole cell, not a fold inside an organelle.',
        B: 'Glycocalyx is the carbohydrate coat on the outer surface of the plasmalemma.',
        C: 'Correct. Cristae are the folds of the inner mitochondrial membrane, and they carry the elementary particles with ATP synthase activity.',
        D: 'Cisternae are the flattened sacs of the endoplasmic reticulum and of the Golgi. This quartet of four membranous terms is reused across several questions in this book, and answering it is a matter of holding all four apart at once.',
      },
    },
    {
      key: 'the-thickness-of-the-cell-membraneis-18ee7e88',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give membrane thickness in the correct unit.',
      explanations: {
        A: '7.5–10 mm is a centimetre-scale membrane. The option is at the far end of the unit ladder this question is built from.',
        B: '7.5–10 µm is about the diameter of a red blood cell — a thousand times too thick.',
        C: 'Correct. 7.5–10 nm.',
        D: 'There is a correct option in the set, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'thickness-of-the-cell-membrane-is-about-32e0bffb',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give membrane thickness in the correct unit and the correct order of magnitude.',
      explanations: {
        A: 'Correct. 7.5–10 nm, printed here without the dash. This is the fifth time the books ask membrane thickness, and the fourth different way of setting the trap.',
        B: 'The same figure in micrometres, a thousandfold too thick.',
        C: '75–100 nm is ten times the true thickness and is closer to the diameter of a small vesicle.',
        D: '75–100 µm is larger than most whole cells.',
      },
    },
    {
      key: 'what-is-the-limiting-membrane-of-a-cell-11c23a0e',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the limiting membrane of the cell.',
      explanations: {
        A: 'Correct. The plasmalemma is the limiting membrane enveloping the cell.',
        B: 'The glycocalyx is the coat carried on the plasmalemma\'s outer face, not the membrane itself.',
        C: 'Protoplasm is the whole living content of the cell, cytoplasm and nucleus together. It is what the membrane encloses, not what encloses it.',
        D: 'Cristae are folds of the inner mitochondrial membrane.',
      },
    },
    {
      key: 'which-molecule-of-the-cell-membrane-has-a-stabilizing-effect-dfdfa453',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute membrane stabilisation to cholesterol.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys C, phospholipids. Phospholipids are the fluid part of the membrane — cholesterol is what restricts their movement and stabilises it, and the same books key `the-function-of-cholesterol-in-the-cell-membrane-is-to` as "stabilize the cell membrane". The two questions cannot both be right, and the one with cholesterol named in the stem is the one to trust.',
      explanations: {
        A: 'Correct. Cholesterol sits among the fatty acid tails, restricts phospholipid movement and stabilises the bilayer.',
        B: 'The cell coat is on the outer surface and does recognition, adhesion and reception. It contributes nothing to the mechanical stability of the lipid.',
        C: 'Phospholipids are the component cholesterol acts on: on their own they are mobile, and that mobility is what stabilisation restrains. This is the option the book keys, and taking it reverses the relationship the question is about.',
        D: 'Intrinsic — integral — proteins are channels, carriers and pumps. They cross the bilayer but they do not hold it together.',
      },
    },
    {
      key: 'which-of-the-following-proteins-associated-with-the-erythroc-ffc9dca0',
      conceptKey: 'plasma-membrane-molecular-components-and-fluid-mosaic',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived — keratin, desmin and lamins — and none of them is the answer. Spectrin, the red cell membrane cytoskeletal protein that holds the biconcave shape, is in the lost option, so this row cannot be sat or even scored as extracted. A rescan of the page is the only fix.',
    },
  ],
}
