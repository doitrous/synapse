/**
 * `101 ISK > Histology > Blood > Haemopoiesis` — the question books' MCQs.
 *
 * Six rows, and the leaf is smaller than it looks. Two of them are the same
 * bone-marrow-transplant question, one keyed and clean and one an unkeyed copy
 * with "Reticular ceils" for "Reticular cells"; the clean copy is kept and the
 * other excluded rather than deleted, so a rescan knows it is a duplicate.
 * One row is not a multiple-choice question at all — it is the tail of a
 * matching exercise that the extractor read as a stem — and one lost an option.
 *
 * That leaves three sittable questions, and the department's own chapter
 * explains why the leaf is thin: its ILO asks for the histology of every stage
 * of haemopoiesis, but the text covers only bone marrow structure, the
 * reticulocyte and the megakaryocyte. The books ask what the book teaches.
 *
 * `fibroblast-active-and-fibrocyte-inactive` is minted here and used again in
 * `connective-tissue-cells.ts` with the same key and the same definition. It is
 * one concept asked from two leaves, not two concepts — the question book filed
 * a fibroblast question under bone marrow because the marrow stroma contains
 * fibroblasts, and a student's mastery of the fibroblast should not be split in
 * half by where a question book happened to print it.
 *
 * One row from the sat end-of-module papers is added at the end, and it enlarges
 * this leaf rather than repeating it. `potentially-renewable-cells` asks the
 * three-way classification of cell populations, which the department book teaches
 * nowhere: the words renewable, labile and end cell are absent from the whole text,
 * and this chapter covers only marrow structure, the reticulocyte and the
 * megakaryocyte, as the leaf's own note already said. The 2020 paper set it anyway,
 * and a sat paper outranks every question book, so
 * `cell-renewal-populations-static-renewing-and-potentially-renewable` is minted
 * with a `gaps` note saying that no source this faculty would accept supports it.
 * The answer came neither from a key nor from the book, and the row says so.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Haemopoiesis',
  modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
  articleId: 'ART-101-HIS-HAEMOPOIESIS',

  concepts: [
    {
      key: 'bone-marrow-red-and-yellow',
      label: 'Red bone marrow is active haemopoietic tissue; yellow bone marrow is its inactive fatty replacement',
      definition: 'Bone marrow is myeloid tissue and is of two kinds. Red marrow is active and forms blood cells; it fills most bones in children and, in the adult, the flat, short and irregular bones. Yellow marrow is inactive and consists largely of fat cells; it occupies the shafts of the adult long bones. The two are interconvertible: yellow marrow is a fat store that changes back into active red marrow when the body needs blood cells, and red marrow fills with fat as haemopoietic activity falls.',
      objective: 'Distinguish red from yellow bone marrow by activity, fat content and site, and state that the change between them runs in both directions.',
      pitfall: 'Reading yellow marrow as dead or scarred tissue. It is a reserve, and its fat is what recedes when demand for blood cells rises.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S02-M03'],
      modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
      type: 'classification',
    },
    {
      key: 'haemopoietic-stem-cell-is-the-transplanted-component',
      label: 'The haemopoietic stem cell is the marrow component transplanted to treat leukaemia, because it alone repopulates every blood cell line',
      definition: 'Bone marrow transplantation infuses stem cells taken from a donor, or from the patient\'s own marrow, into a patient with a marrow disease such as leukaemia. What is being given is the haemopoietic stem cell: it is the free cell of the marrow from which every blood cell line descends, so it alone can restore all of them. The reticular cells, fat cells and blood sinusoids of the stroma are the tissue the stem cells then grow in, not the graft.',
      objective: 'Identify the haemopoietic stem cell as the transplanted component of bone marrow and explain why the stromal components are not.',
      pitfall: 'Picking whichever component looks most like the marrow — the sinusoids or the reticular network. A transplant has to restore every blood cell line, and only the stem cell can do that.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S02-M03', 'SYS-HEM-T04-S02-M01'],
      modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
      type: 'clinical_correlation',
    },
    {
      key: 'red-bone-marrow-stroma-and-free-cells',
      label: 'Red bone marrow is a stroma of fixed cells and blood sinusoids holding free developing blood cells and stem cells',
      definition: 'Red bone marrow has a stroma and free cells. The stroma is reticular cells, which with reticular fibres form the supporting network, together with fibroblasts, undifferentiated mesenchymal cells, pericytes, osteogenic cells and fat cells — the largest cells in the marrow — and the blood sinusoids, wide irregular capillaries lined by endothelium on a non-continuous basement membrane, through whose pores finished cells enter the blood. The free cells are the developing stages of the blood cells and the stem cells, immature white cells outnumbering immature red cells about five to one because most white cells are shorter-lived.',
      objective: 'Name the fixed cells, the sinusoids and the free cells of red bone marrow and say what each contributes.',
      pitfall: 'Expecting the sinusoid to have a continuous basement membrane like an ordinary capillary. It is the gaps in it that let a finished blood cell leave the marrow at all.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S02-M03'],
      modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
      type: 'structural_description',
    },
    {
      key: 'fibroblast-active-and-fibrocyte-inactive',
      label: 'The fibroblast is the active, protein-synthesising state of a fixed connective tissue cell, and the fibrocyte is its resting state',
      definition: 'The fibroblast is the commonest cell of connective tissue proper, arising from undifferentiated mesenchymal cells and pericytes, and it exists in two states. The active fibroblast is branched with long thin processes, deeply basophilic cytoplasm and a large pale oval nucleus with a prominent nucleolus; on electron microscopy it is a protein-synthesising cell, with well developed rough endoplasmic reticulum and Golgi, many mitochondria and a euchromatic nucleus. The inactive form, the fibrocyte, is a smaller spindle cell with few processes, paler cytoplasm, a small darker heterochromatic nucleus and much less rER, Golgi and mitochondria. It becomes active again for wound healing.',
      objective: 'Recognise the active fibroblast as the type example of a protein-synthesising cell and contrast it with the resting fibrocyte.',
      pitfall: 'Treating fibroblast and fibrocyte as two different cells. They are one cell in two states, and the suffix is the whole distinction: -blast is building, -cyte is resting.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
    },
    {
      key: 'cell-renewal-populations-static-renewing-and-potentially-renewable',
      label: 'Cell populations are static, renewing or potentially renewable, and the difference is whether the cell can come back into the cycle',
      definition:
        'Tissues are grouped by how their cells replace themselves. A static population is made of end cells that have left the cell cycle permanently and are never replaced — the neuron and the cardiac muscle cell. A renewing population is losing cells continuously and replacing them continuously from stem cells, as the blood, the epidermis and the lining of the gut do. A potentially renewable population sits between the two: its cells have left the cycle into a resting phase and are not dividing, but they retain the ability to re-enter the cycle and divide when replacement is needed — the liver cell and the fibroblast after injury. What separates the third group from the first is reversibility, and what separates it from the second is that the division happens on demand rather than continuously.',
      objective:
        'Distinguish static, renewing and potentially renewable cell populations by whether their cells can re-enter the cell cycle and whether replacement is continuous or on demand.',
      pitfall:
        'Reading "potentially renewable" as another name for a renewing population fed from stem cells. The renewing population replaces losses continuously from a stem cell; the potentially renewable one has ordinary differentiated cells that come back into the cycle themselves, and only when something calls for them.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S02-M03'],
      modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
      type: 'classification',
      aliases: ['Static cell population', 'Renewing cell population', 'End cell', 'Stable cell population'],
      gaps: [
        'The department book teaches no classification of cell populations anywhere: the words renewable, labile and end cell do not appear in it, and its haemopoiesis chapter covers only bone marrow structure, the reticulocyte and the megakaryocyte. The 2020 end-of-module paper set the question regardless, and a sat paper outranks the question books, so the concept is minted from the paper alone. Nothing in the faculty\'s own text supports the answer, and the row that tests it says so.',
      ],
    },
  ],

  questions: [
    {
      key: 'bone-marrow-component-which-can-be-transplanted-into-patient-f1f748f9',
      conceptKey: 'haemopoietic-stem-cell-is-the-transplanted-component',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the component of bone marrow that a transplant actually delivers.',
      explanations: {
        A: 'Reticular cells and their fibres are the marrow\'s scaffolding. They support haemopoiesis but make no blood cell, so transplanting them would rebuild the shelving and leave it empty.',
        B: 'Blood sinusoids are the route out of the marrow, not the source. They are vessels of the recipient\'s own bone and are not transferred.',
        C: 'Fat cells are what fills marrow as it becomes inactive — the opposite of what a leukaemic patient needs restored.',
        D: 'Correct. The haemopoietic stem cell is the free cell every blood cell line descends from, so it is the only component that can repopulate the whole marrow.',
      },
    },
    {
      key: 'c-t-mesenchymal-cells-have-the-following-charcters-except-55e1d013',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived extraction, and all three — that they are stem cells, that they are small branched cells, that they can differentiate into other connective tissue cells — are true of the undifferentiated mesenchymal cell. The exception was in the missing fourth option, so what was lost is the answer itself. Recoverable only by rescanning the page; nothing in the surviving text lets anyone reconstruct it.',
    },
    {
      key: 'fibroblast-in-the-histology-is-a-good-example-for-2eb56a2f',
      conceptKey: 'fibroblast-active-and-fibrocyte-inactive',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the fibroblast as the standard example of an actively synthesising cell rather than a free or a stem cell.',
      explanations: {
        A: 'Correct. The active fibroblast is the department\'s type example of a protein-synthesising cell: deeply basophilic cytoplasm, abundant rough endoplasmic reticulum and Golgi, and a pale euchromatic nucleus with a prominent nucleolus.',
        B: 'The fibroblast is a resident — fixed — connective tissue cell, long-lived and staying where it is. The free, transient cells of connective tissue are the plasma cells and the leukocytes that arrive from the blood.',
        C: 'A steroid-secreting cell is recognised by abundant smooth endoplasmic reticulum, tubular mitochondria and lipid droplets. The fibroblast secretes protein — collagen and ground substance — and has rough ER instead.',
        D: 'Tempting because the fibroblast comes from an undifferentiated mesenchymal cell, but it is the differentiated product, not the stem cell. The undifferentiated stem cells of connective tissue are the mesenchymal cells and the pericytes.',
      },
    },
    {
      key: 'nucleus-is-single-mulilobed-e-myeloblast-f-stem-cells-g-mass-73277d01',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'This is not a multiple-choice question. The extractor caught the tail of a matching exercise — the stem is a match cue plus its options list ("e. Myeloblast f. Stem cells g. Masson trichrome"), and the three "options" are the section headings that followed it on the page ("McQ", "Problem Solving", "Matching"). Rescanning would not recover an MCQ here because there was never one; what the page actually holds is a matching item, and matching is a different question format from the one this bank imports.',
    },
    {
      key: 'the-bone-marrow-component-which-can-be-transplanted-into-pat-4ef12d2c',
      conceptKey: 'haemopoietic-stem-cell-is-the-transplanted-component',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A second, worse copy of `bone-marrow-component-which-can-be-transplanted-into-patient-f1f748f9`: the same four options, but the OCR reads "Reticular ceils", the stem carries stray punctuation, and no answer key came with it. The clean copy is keyed and is the one imported. Kept here so that whoever rescans the page knows this row is a duplicate rather than a separate question, and does not author it twice.',
    },
    {
      key: 'which-bone-marrow-component-increases-markedly-as-hematopoie-372e3aeb',
      conceptKey: 'bone-marrow-red-and-yellow',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Predict what replaces haemopoietic tissue in the marrow as its activity falls.',
      explanations: {
        A: 'Correct. Falling haemopoietic activity is exactly what turns red marrow into yellow: fat cells expand to fill the space the haemopoietic cords gave up, which is why the shafts of adult long bones are fatty.',
        B: 'Erythrocytes are a product of haemopoiesis, so they fall with it, not rise. They are also finished cells that leave the marrow through the sinusoids rather than accumulating in it.',
        C: 'The haemopoietic cords are the haemopoietic tissue itself. Saying they increase as haemopoiesis decreases contradicts the stem — a trap for a student reading only the words "bone marrow component".',
        D: 'Stem cells are the source of haemopoiesis. Their numbers do not swell to fill an inactive marrow; the space is taken by fat.',
      },
    },
    {
      key: 'potentially-renewable-cells-8bc8c426',
      conceptKey: 'cell-renewal-populations-static-renewing-and-potentially-renewable',
      difficulty: 'Hard', questionType: 'Classification',
      learningObjective: 'Define a potentially renewable cell population and separate it from a renewing one and from end cells.',
      answerOverride: 'd',
      answerOverrideReason:
        'Neither a printed key nor a recovered highlight covers this row, and the department book does not settle it either: it teaches no classification of cell populations at all — the chapter covers bone marrow structure, the reticulocyte and the megakaryocyte and nothing else. The answer is therefore not from a key and not from the book, but from the standard three-way grouping the item is built on, in which the potentially renewable cell is the one that has left the cycle reversibly and returns to it when replacement is needed. Option c is the same statement with G2 substituted for the resting phase, which is what marks it as the examiner\'s intended trap. The concept carries a `gaps` note recording that no source this faculty would accept supports the answer.',
      explanations: {
        a: 'Continuous replacement from stem cells is a renewing population — blood, epidermis, the lining of the gut. The word the stem turns on is "potentially": these cells are not being replaced continuously, they are held in reserve.',
        b: 'End cells are a static population: neurons and cardiac muscle, which have left the cycle for good and are never replaced. That is the opposite of potentially renewable, and it is the option for a student reading "potentially" as "not actually".',
        c: 'The right idea with the wrong phase. A cell that leaves the cycle transiently leaves it in the resting phase after mitosis, not in G2 — G2 is the gap between DNA replication and mitosis, and a cell that has already copied its DNA is committed to dividing rather than resting.',
        d: 'Correct. A potentially renewable cell is out of the cycle but able to come back into it, and it does so when the tissue needs replacing — the liver cell after resection, the fibrocyte becoming an active fibroblast for wound healing.',
      },
    },
  ],
}
