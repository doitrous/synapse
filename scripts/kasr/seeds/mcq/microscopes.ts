/**
 * `101 ISK > Histology > Introduction > Microscopes` — the question books' MCQs.
 *
 * Seven rows, of which three survive as sittable questions and four do not.
 * That ratio is worse than any other leaf in this batch and it has one cause:
 * this chapter is two pages of numbers — 1500 times, 0.2 mm, 0.2 µm, 0.2 nm —
 * and a number whose unit the scanner mangled is a number that means something
 * else. `one-statement-is-correct` prints its own correct option as "0.2 pm"
 * where the book wrote 0.2 µm, which turns a resolution into a distance a
 * thousand times smaller than an atom. The same substitution destroyed a
 * platelet question in `blood-platelets.ts`. All four exclusions here are
 * recoverable by rescanning, and each says what the intended option was so that
 * whoever rescans can check the recovery rather than re-derive it.
 *
 * `plasma-membrane-unit-membrane-em-and-thickness` is not minted here. It is
 * already declared in `the-cell.ts`, and this file repeats it verbatim — label,
 * definition, objective, pitfall, subject and modulePath, which stays
 * `Cytology > The cell` — so that the emitter's merge is a no-op whichever leaf
 * it reads first. Two of this leaf's rows are cell-membrane questions that the
 * topic clustering filed under Microscopes because they turn on what a
 * microscope can resolve; the concept they test belongs to the cell.
 *
 * Only two concepts, where most leaves carry four to eight. With three sittable
 * questions there is nothing honest to hang more on: a concept whose only
 * questions are excluded ones carries no exam signal and would claim coverage
 * this leaf does not have.
 *
 * One answer is overridden against a printed key. See
 * `all-the-statements-concerned-to-the-cell-membrane-are-true-e-eabfd37b`: the
 * books key the exception to "all membranes of the cell have the same
 * appearance", but the department book calls the mitochondrial and nuclear
 * membranes unit membranes too, so that statement is the faculty's own, and the
 * false one is the option calling the electron-microscopic appearance a
 * bilayer.
 *
 * Two rows from the sat end-of-module papers are added at the end, both live and
 * both from the 2020 paper, where they sit three questions apart as a deliberate
 * pair: the electron-microscopic feature of a steroid-secreting cell and of a
 * protein-forming cell, with smooth and rough endoplasmic reticulum offered in both
 * option sets. Neither carried a recovered answer; both are worked from the
 * department book and say so. They are authored against
 * `organelle-content-identifies-what-a-cell-does`, copied verbatim from
 * `cytoplasm.ts`, because that is exactly the inference they test — given the cell,
 * name the organelle — and because answering either one requires the other.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Microscopes',
  modulePath: '101 ISK > Histology > Introduction > Microscopes',
  articleId: 'ART-101-HIS-MICROSCOPES',

  concepts: [
    {
      key: 'magnification-and-resolution-power-and-the-limits-of-each-microscope',
      label: 'Magnification is how much bigger, resolution is how much finer — and the two microscopes are separated by resolution, not by magnification',
      definition:
        'Magnification power is the degree of enlargement, and equals the power of the objective lens multiplied by the power of the eyepiece: 15 × 100 gives the light microscope its maximum of 1500 times. Resolution power is the least distance between two points at which they can still be seen as two points and not one, and it is what actually limits a microscope. The naked eye resolves 0.2 mm, the light microscope 0.2 µm, and the electron microscope 0.2 nm; the units descend by a thousand at each step, since 1 mm = 1000 µm and 1 µm = 1000 nm, and 1 nm = 10 Å. The transmission electron microscope illuminates with an electron beam, magnifies with electromagnetic coils, magnifies 1000 to over 100,000 times and shows the interior of the specimen on a fluorescent screen. The scanning electron microscope shows only surfaces, and it is the one that gives a three-dimensional image.',
      objective:
        'Define magnification power and resolution power, give the resolution of the naked eye, the light microscope and the electron microscope in the correct unit, and say which microscope gives a three-dimensional image of a surface.',
      pitfall:
        'Swapping the two definitions, and swapping the units within them. Resolution is the small number and gets smaller as the microscope gets better, so a resolution quoted in millimetres belongs to the naked eye and one quoted in nanometres to the electron microscope; a student who reads 0.2 as the answer without reading its unit gets all three questions wrong at once.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microscopes',
      type: 'structural_description',
      aliases: ['Resolving power', 'Magnification power', 'TEM', 'SEM', 'Light microscope'],
    },
    {
      key: 'plasma-membrane-unit-membrane-em-and-thickness',
      label: 'The plasma membrane is a 7.5–10 nm trilaminar unit membrane, invisible in H&E and shown only by silver or PAS',
      definition:
        'The plasma membrane, or plasmalemma, is the limiting membrane that envelopes every cell, and it is 7.5–10 nm thick. On electron microscopy it is trilaminar — the unit membrane — two dark, electron-dense layers separated by an intermediate light, electron-lucent layer. On light microscopy it is not resolved with haematoxylin and eosin and has to be demonstrated with silver or with PAS, both of which act on the carbohydrate of its outer coat rather than on the membrane itself. Three other membranous terms are worth distinguishing: the glycocalyx is its own outer coat, cristae are the folds of the inner mitochondrial membrane, and cisternae are the sacs of the endoplasmic reticulum.',
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
      key: 'organelle-content-identifies-what-a-cell-does',
      label: 'What a cell is doing can be read from which organelle is prominent in it',
      definition:
        'A cell\'s organelle profile follows from its work, and the inference runs in both directions. A protein-forming cell for export — the plasma cell, the fibroblast, the pancreatic acinar cell — has abundant rough endoplasmic reticulum, deeply basophilic cytoplasm, a well-developed Golgi apparatus and a pale euchromatic nucleus. A steroid-forming cell has abundant smooth endoplasmic reticulum instead, and its cytoplasm is acidophilic. A phagocyte — the macrophage or histiocyte, the neutrophil, the monocyte — has many lysosomes, a prominent Golgi and pseudopodia. A resting cell such as the fibrocyte has few organelles, little rough endoplasmic reticulum and pale cytoplasm. The mature erythrocyte has gone to the other extreme and has no nucleus, no mitochondria and no ribosomes at all, having lost them as its haemoglobin content rose.',
      objective:
        'Predict which organelle will be prominent in a named cell, and name the cell from a described organelle profile.',
      pitfall:
        'Reading basophilia as a property of the cell rather than of its ribosomes. A cell is basophilic because it is full of rough endoplasmic reticulum, so the staining and the organelle are one fact, not two that have to be memorised separately.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      gaps: [
        'Several cells used in these rows have concepts of their own that already belong to sibling leaves of this batch — `fibroblast-active-and-fibrocyte-inactive` in `haemopoiesis.ts`, the macrophage and plasma cell in the connective-tissue leaves, and the erythrocyte in a leaf not yet seeded. None of them could be declared again here without emitting a duplicate concept id, so the cell-specific facts are carried in the option explanations. When those leaves are authored, these rows should be re-homed to them.',
      ],
    },
  ],

  questions: [
    {
      key: 'all-the-statements-concerned-to-the-cell-membrane-are-true-e-eabfd37b',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Separate what the membrane is built of from what the electron microscope shows of it.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books key this to B, which is also the taught statement: the two mitochondrial membranes and both layers of the nuclear envelope are "unit membranes", which is the statement that all the cell\'s membranes share one appearance. The false statement is C. By electron microscopy the membrane is trilaminar, not a bilayer — the bilayer is its molecular construction, and the third layer of the image exists because the heavy metal deposits in the hydrophilic heads and not in the tails between them. The same books key `electron-microscope-of-cell-membrane` to trilaminar over bilaminar, and `by-em-the-cell-membrane-appears-as` to trilaminar over lipid bilayer, so their own answer elsewhere contradicts the key printed here.',
      explanations: {
        A: 'True, so not the exception. Plasmalemma is simply the other name for the plasma membrane.',
        B: 'True, so not the exception, and the option most students pick because "all" sounds like an overstatement. It is not one here: unit membrane is a general term, applied to the mitochondrial membranes and to the nuclear envelope as well as to the cell surface.',
        C: 'The exception, and the answer. Bilayer describes how the phospholipid molecules are arranged, which is chemistry; what the electron microscope shows is three layers, because the osmium deposits in the two rows of hydrophilic heads and leaves the hydrophobic tails between them unstained. Answering with the molecular truth instead of the microscopic appearance is exactly the confusion the stem is set to catch.',
        D: 'True, so not the exception. At 7.5–10 nm the membrane is far below the light microscope\'s 0.2 µm resolution, so it cannot be resolved and has to be shown indirectly with silver or PAS.',
      },
    },
    {
      key: 'electron-microscope-of-cell-membrane-40a97d58',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Count the layers the electron microscope actually shows in the cell membrane.',
      explanations: {
        A: 'Bilaminar is the commonest wrong answer, taken from the phospholipid bilayer. The bilayer is the arrangement of the molecules; the image has one more layer than that.',
        B: 'Two dark electron-dense layers with a light electron-lucent layer between them — the trilaminar or unit membrane.',
        C: 'Tetralaminar describes nothing in the cell. Four layers would need two membranes, which is what a nuclear envelope or a mitochondrion has, not a cell membrane.',
        D: 'Unilaminar would be a single line, which is what the membrane looks like at low magnification before the three layers separate. It is not what the electron microscope resolves.',
      },
    },
    {
      key: 'the-resolution-of-tem-is-about-ca7c15d5',
      conceptKey: 'magnification-and-resolution-power-and-the-limits-of-each-microscope',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the resolution of the electron microscope in the correct unit.',
      explanations: {
        A: 'The electron microscope resolves 0.2 nm, a thousandfold finer than the light microscope\'s 0.2 µm.',
        B: '0.4 µm is the wrong order of magnitude and the wrong figure: 0.2 µm is the light microscope, and no instrument in this chapter is quoted at 0.4.',
        C: '0.2 mm is the resolution of the naked eye. Picked by students who remember the figure 0.2 and not which of the three it belongs to — all three resolutions are 0.2, and only the unit tells them apart.',
        D: '0.4 mm is coarser than the naked eye, which would make an electron microscope worse than no microscope at all.',
      },
    },
    {
      key: 'one-statement-is-correct-852894db',
      conceptKey: 'magnification-and-resolution-power-and-the-limits-of-each-microscope',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The one correct option is printed as "Resolution power of light microscope is 0.2 pm". The book gives 0.2 µm, and "pm" is the scanner\'s reading of µm — the same substitution that destroyed a platelet question. As printed the question has no correct answer at all, since picometres are wrong by six orders of magnitude and the other three options are false as written. A rescan recovers it: option B should read 0.2 µm and is the answer.',
    },
    {
      key: 'the-least-distance-between-2-points-that-can-be-seen-as-2-po-46be547d',
      conceptKey: 'magnification-and-resolution-power-and-the-limits-of-each-microscope',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three surviving options, not four: option A has swallowed option B, and reads "Magnification power of microscope. —_b. High power of microscop". A student cannot pick between two statements printed as one letter. The question itself is the book\'s own definition of resolution power and the answer is C. A rescan recovers it — A should read "Magnification power of microscope" and B "High power of microscope".',
    },
    {
      key: 'the-maximum-magnification-power-of-light-microscope-is-f85814cf',
      conceptKey: 'magnification-and-resolution-power-and-the-limits-of-each-microscope',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived, and the correct one is corrupted: C reads "1500 00", where the book gives 15 × 100 = 1500 times. Option D was lost entirely. A rescan recovers it — the answer is 1500, and the trailing digits are the scanner reading the book\'s own multiplication into the option.',
    },
    {
      key: 'three-dimensional-image-for-a-cell-can-be-obtained-by-b93a0000',
      conceptKey: 'magnification-and-resolution-power-and-the-limits-of-each-microscope',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four options are unusable. C has swallowed D and reads "Transmission electron microscope ‏.ل‎ Fluorescent microscope", so a student picking C cannot say which microscope they picked; D then reads "100 mm", which is text bled in from a neighbouring question and is not an answer to this stem at all. The intended set is scanning EM, light microscope, transmission EM, fluorescent microscope, and the answer is the scanning electron microscope, which shows surfaces in three dimensions. Recoverable by rescanning the page.',
    },
    {
      key: 'electron-microscopic-feature-of-cells-responsible-for-steroi-2182b5c4',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the organelle that identifies a steroid-secreting cell on electron microscopy.',
      answerOverride: 'c',
      answerOverrideReason:
        'The 2020 paper printed no key and the highlight recovery does not cover that sitting, so the answer given here is: smooth endoplasmic reticulum is sited in lipid-forming cells and its functions include synthesis of the steroid hormones cortisone and testosterone. This row and `electron-microscopic-feature-of-protein-forming-cells-is` are the same question asked for the two secretory cell types, and they must be answered as a pair.',
      explanations: {
        a: 'Proteasomes destroy abnormal and short-lived cytosolic proteins. They are not part of this course\'s cytology chapter, and nothing about them is secretory.',
        b: 'Numerous free ribosomes mark a cell making protein for its own use. A steroid is a lipid, and no ribosome makes one.',
        c: 'Abundant smooth endoplasmic reticulum is the electron-microscopic signature of a steroid-forming cell — the adrenal cortical cell, the Leydig cell — and it goes with acidophilic cytoplasm by light microscopy.',
        d: 'Well-developed rough endoplasmic reticulum is the protein-forming cell, and it is the answer to the sister question on this same paper. Swapping the two is the single mistake both items are built to catch.',
      },
    },
    {
      key: 'electron-microscopic-feature-of-protein-forming-cells-is-1631f787',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the organelle that identifies a protein-secreting cell on electron microscopy.',
      answerOverride: 'd',
      answerOverrideReason:
        'No key was printed on the 2020 paper and none was recovered, so the answer given here is: rough endoplasmic reticulum is sited in protein-forming cells — the plasma cell is the example — and it carries out protein synthesis, segregation, glycosylation and packing into transfer vesicles.',
      explanations: {
        a: 'Numerous lysosomes mark a phagocyte: the macrophage, the neutrophil, the monocyte. A cell that digests is not a cell that builds.',
        b: 'Numerous peroxisomes mark the liver and kidney cell, where they oxidise long-chain fatty acids. Their own enzymes are made on free ribosomes elsewhere in the cytoplasm.',
        c: 'Well-developed smooth endoplasmic reticulum is the steroid- or lipid-forming cell, and it is the answer to the sister question on the same paper. It has no ribosomes at all, so it cannot make protein.',
        d: 'Rough endoplasmic reticulum is rough because it is studded with ribosomes bound to ribophorins, and those ribosomes make the protein the cell exports.',
      },
    },
  ],
}
