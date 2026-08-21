/**
 * `101 ISK > Histology > Blood > Non granular leukocytes` — the question books' MCQs.
 *
 * Fourteen rows, ten of them sittable. Three of the four exclusions lost an
 * option to the scan; the fourth, "Cells increased in chronic infection", lost
 * the option that would have made its answer unique — the department teaches
 * both monocytosis and lymphocytosis as findings in chronic infection, so with
 * the fourth option gone two of the three survivors are defensible.
 *
 * Two pairs of near-identical questions are both kept. "Two cells are required
 * for the initiation of the cellular and humoral immune responses" appears once
 * keyed and once with its last two options fused by the OCR, and there the
 * damaged copy goes; but the antigen-presenting-cell pair differs only by the
 * word "all", both copies are clean and both are keyed, so both stand.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Non granular leukocytes',
  modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
  articleId: 'ART-101-HIS-NON-GRANULAR-LEUKOCYTES',

  concepts: [
    {
      key: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      label: 'The monocyte is the largest leukocyte and the precursor of every phagocytic cell of the tissues',
      definition: 'The monocyte is 13–20 µm across, the largest of the white cells, with a large eccentric kidney-shaped pale nucleus and non-granular pale basophilic cytoplasm whose lysosomes give it a frosted-glass look. It spends about three days in the blood, then enters connective tissue and becomes the macrophage, living some three months. It is an antigen-presenting cell, and it is the precursor of all the phagocytic cells of the body — the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone and the microglia of the central nervous system.',
      objective: 'Identify the monocyte by size and nuclear shape and name the tissue cells it gives rise to.',
      pitfall: 'Calling the large lymphocyte the largest leukocyte. It reaches 10–15 µm; the monocyte reaches 20 µm, and it is the nuclear shape — kidney, not round — that settles it on a film.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'structure_function_relationship',
    },
    {
      key: 'b-lymphocyte-becomes-the-plasma-cell',
      label: 'The plasma cell is a B lymphocyte that has been activated by antigen and by a helper T cell',
      definition: 'The B lymphocyte matures in the bone marrow in mammals and carries surface receptors for IgM and IgD. When it meets its specific antigen and is activated by a helper T cell, it becomes a plasmablast and then a plasma cell, which synthesises and secretes antibody — the humoral immune response. Some of its progeny become B memory cells, which give the rapid second response. The plasma cell itself is a transient connective tissue cell with deeply basophilic cytoplasm, a negative Golgi image and a cart-wheel nucleus.',
      objective: 'Trace the plasma cell back to the B lymphocyte and name what activates the change.',
      pitfall: 'Deriving the plasma cell from the T lymphocyte or the monocyte because both are involved in the response. The T helper cell only permits the change; the cell that becomes a plasma cell is the B lymphocyte.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'developmental_process',
    },
    {
      key: 'macrophage-and-t-helper-start-both-immune-responses',
      label: 'Both immune responses start with a macrophage presenting antigen to a helper T cell',
      definition: 'The cell-mediated and the humoral responses share their opening step. The macrophage phagocytoses the antigen and presents it, and the helper (CD4+) T cell recognises what it presents and is activated. The activated helper T cell then drives the cell-mediated arm and also activates the B lymphocyte that becomes the antibody-producing plasma cell of the humoral arm. So the pair of cells needed to begin both responses is the macrophage and the helper T cell.',
      objective: 'Name the two cells whose interaction initiates both the cell-mediated and the humoral immune response.',
      pitfall: 'Choosing the B lymphocyte as one of the pair because it makes the antibody. It is the effector of the humoral arm, not the initiator, and it does nothing until the helper T cell has already been activated.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'mechanism',
    },
    {
      key: 'lymphocyte-alone-among-blood-cells-still-divides',
      label: 'The lymphocyte is the blood cell that can still divide and the only one that returns from the tissues to the blood',
      definition: 'Mature blood cells are, with one exception, end cells. The erythrocyte and the platelet have no nucleus at all; the granulocyte and the monocyte leave the blood, do their work and die there. The lymphocyte keeps a full nucleus, proliferates when it meets its antigen to give a clone of effector and memory cells, and is actively motile, circulating continuously between the blood and the lymphoid organs — the department states it is the only cell that can return to the blood.',
      objective: 'Explain why the lymphocyte, alone among the circulating blood cells, can still divide.',
      pitfall: 'Assuming any nucleated white cell can divide. A neutrophil and a monocyte have nuclei but are already differentiated end cells; division stopped in the marrow.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'structure_function_relationship',
    },
    {
      key: 'leukocytes-are-granular-or-non-granular',
      label: 'Leukocytes divide into granular — neutrophil, eosinophil, basophil — and non-granular — monocyte and lymphocyte',
      definition: 'White blood cells are classified by whether their cytoplasm carries specific granules. The granular leukocytes are the neutrophil, the eosinophil and the basophil, each named for how its specific granules stain, and each has a segmented nucleus — the neutrophil so much so that it is also called the polymorphonuclear leukocyte. The non-granular leukocytes are the monocyte and the lymphocyte, whose cytoplasm holds only azurophil granules, which are lysosomes and are not specific granules. Platelets are not leukocytes at all.',
      objective: 'Sort the five leukocytes into granular and non-granular and recognise the synonyms each carries.',
      pitfall: 'Treating "non-granular" as meaning no granules whatsoever. Monocytes and lymphocytes both carry azurophil granules; what they lack are the specific granules that name the granulocytes.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'classification',
    },
  ],

  questions: [
    {
      key: 'cells-are-required-for-initiation-of-cellular-humoral-immuni-20ed46bb',
      conceptKey: 'macrophage-and-t-helper-start-both-immune-responses',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Name the two cells whose interaction opens both arms of the immune response.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. The same question, with the same four options, is keyed A in `two-cells-are-required-for-the-initiation-of-the-cellular-an-e19b9dc0`, and A is also what the department teaches: the macrophage presents the antigen and the helper T cell is activated by it.',
      explanations: {
        A: 'Correct. The macrophage presents the antigen, the helper T cell recognises it, and the activated helper then drives the cell-mediated arm and licenses the B cell for the humoral arm.',
        B: 'The suppressor (regulatory) T cell damps a response down and maintains tolerance to self. Pairing the brake with the response it is supposed to start is the trap here.',
        C: 'Half right, which is what makes it attractive: the macrophage is one of the pair, but the B lymphocyte is the effector of the humoral response only, and it acts after the helper T cell, not before it.',
        D: 'The plasmablast is already a committed antibody-producing cell — the end of the humoral response, not its beginning — and it has no part in the cell-mediated arm.',
      },
    },
    {
      key: 'cells-increased-in-chronic-infection-b8e83d3e',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived, and worse, the loss destroyed the single best answer. The department lists chronic infection — tuberculosis, syphilis, whooping cough — as a cause of both monocytosis and lymphocytosis, so with the fourth option gone, two of the three survivors are defensible and the question has no unique key. Rescanning would recover the missing option, and only then can it be judged whether the intended answer was one cell type or a combined option.',
    },
    {
      key: 'is-antigen-presenting-cell-precursor-of-all-phagocytic-cell-25d68247',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the monocyte as the source of every phagocytic cell of the tissues.',
      explanations: {
        A: 'A lymphocyte is immune-competent but not phagocytic, and it gives rise to plasma cells rather than to macrophages.',
        B: 'Correct. The monocyte presents antigen and is the precursor of the macrophage and of every phagocytic cell derived from it — dust cells, Kupffer cells, osteoclasts and microglia.',
        C: 'The neutrophil is highly phagocytic, which is exactly what makes it tempting, but it is an end cell: it phagocytoses and dies as a pus cell, and nothing descends from it.',
        D: 'The megakaryocyte belongs to the marrow and sheds platelets. It leaves nothing behind in the tissues.',
      },
    },
    {
      key: 'is-antigen-presenting-cell-precursor-of-phagocytic-cell-518b67f0',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the monocyte as both an antigen-presenting cell and the precursor of the tissue phagocytes.',
      explanations: {
        A: 'A lymphocyte carries antigen receptors but does not phagocytose or present antigen to others; that is the macrophage\'s and the monocyte\'s role.',
        B: 'Correct. The monocyte is an antigen-presenting cell and becomes the macrophage once it enters connective tissue.',
        C: 'The neutrophil phagocytoses vigorously but presents no antigen and is a terminal cell — it dies at the site as a pus cell.',
        D: 'The megakaryocyte is a marrow cell that produces platelets; it is neither phagocytic nor antigen-presenting.',
      },
    },
    {
      key: 'the-histiocyte-stem-cells-77a87bfc',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived and the contract is four to five. The question itself is sound and keyed — the histiocyte is the macrophage and it comes from the monocyte — so it is worth recovering when the page is rescanned. The same idea is asked intact at `the-origin-of-macrophages-is-81e14fa2`, which is the copy that imports.',
    },
    {
      key: 'the-largest-leucocytes-is-a28f51f6',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Rank the leukocytes by diameter and name the largest.',
      explanations: {
        A: 'Correct. The monocyte is 13–20 µm, larger than any other white cell on the film.',
        B: 'The commonest wrong answer, and an understandable one: the large lymphocyte is big at 10–15 µm, but it stops short of the monocyte. Its round nucleus, against the monocyte\'s kidney-shaped one, tells them apart.',
        C: 'The neutrophil is 10–12 µm. It looks busy because of its lobes, not because it is large.',
        D: 'The natural killer cell is a large lymphocyte and shares its size range, so it cannot be larger than the large lymphocyte, let alone the monocyte.',
      },
    },
    {
      key: 'the-origin-of-macrophages-is-81e14fa2',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the blood cell the tissue macrophage comes from.',
      explanations: {
        A: 'The fibrocyte is the resting fibroblast. It makes fibres and ground substance and has no phagocytic role.',
        B: 'The pericyte is an adult mesenchymal stem cell around capillaries and can become endothelium, fibroblast or smooth muscle — but not a macrophage.',
        C: 'Correct. The monocyte leaves the blood, enters connective tissue and becomes the macrophage, also called the histiocyte.',
        D: 'The B lymphocyte becomes the plasma cell. Confusing the two lines is the trap: one produces antibody, the other phagocytoses.',
      },
    },
    {
      key: 'the-origin-of-plasma-cells-is-f4603195',
      conceptKey: 'b-lymphocyte-becomes-the-plasma-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cell the plasma cell descends from.',
      explanations: {
        A: 'The fibrocyte is a resting fibroblast. Both it and the plasma cell are connective tissue cells, but they are unrelated lines.',
        B: 'The pericyte gives endothelium, fibroblasts and smooth muscle. It makes no immune cell.',
        C: 'The monocyte becomes the macrophage. Picking it here is the mirror image of the commonest error on the macrophage question — the two answers get swapped as a pair.',
        D: 'Correct. The B lymphocyte, once its antigen and a helper T cell have activated it, becomes a plasmablast and then the antibody-secreting plasma cell.',
      },
    },
    {
      key: 'two-celis-are-required-for-the-initiation-of-the-cellular-an-062c6299',
      conceptKey: 'macrophage-and-t-helper-start-both-immune-responses',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The fourth option was fused into the third by the scan — option C reads "B lymphocyte & Macrophage. 0. Plasmablast & Monocyte.." — leaving three parsed options with one of them holding two answers. The same question is intact and keyed at `two-cells-are-required-for-the-initiation-of-the-cellular-an-e19b9dc0`, which is the copy to use; kept here so a rescan recognises this row as the damaged duplicate rather than a separate question.',
    },
    {
      key: 'two-cells-are-required-for-the-initiation-of-the-cellular-an-e19b9dc0',
      conceptKey: 'macrophage-and-t-helper-start-both-immune-responses',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Name the two cells whose interaction initiates both the cell-mediated and the humoral response.',
      explanations: {
        A: 'Correct. The macrophage presents the antigen and the helper T cell is activated by it; from that one interaction both arms of the response follow.',
        B: 'The suppressor T cell exists to limit a response and to hold tolerance to self antigens. It ends responses rather than starting them.',
        C: 'The macrophage is right and the B lymphocyte is wrong: the B cell is the effector of the humoral arm and has no part in starting the cell-mediated one, and it needs the helper T cell before it does anything at all.',
        D: 'The plasmablast is the B lymphocyte already committed to making antibody, so it belongs at the end of the humoral response, not the start of both.',
      },
    },
    {
      key: 'which-cell-can-divide-0049d79b',
      conceptKey: 'lymphocyte-alone-among-blood-cells-still-divides',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the one circulating blood cell that retains the power to divide.',
      explanations: {
        A: 'The erythrocyte has no nucleus and no organelles — the space is given over to haemoglobin — so it cannot divide at all.',
        B: 'The thrombocyte is a shed fragment of megakaryocyte cytoplasm with no nucleus, so division is impossible.',
        C: 'Correct. The lymphocyte keeps a full nucleus and proliferates into a clone of effector and memory cells when it meets its antigen.',
        D: 'The tempting one: the monocyte has a large nucleus and clearly changes into a macrophage. But that is differentiation, not division — it is already an end cell when it leaves the marrow.',
      },
    },
    {
      key: 'which-feature-is-true-for-specific-granules-886d186d',
      conceptKey: 'leukocytes-are-granular-or-non-granular',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Three options survived and their letters are A, B and E, so options C and D were lost outright — the gap in the lettering shows the extraction did not simply mislabel them. The surviving E is the correct one, naming collagenase, histaminase and histamine as specific granule contents, so what was lost is the distractors rather than the answer. Rescanning the page would recover it.',
    },
    {
      key: 'which-of-the-following-is-a-granulocyte-e5f41a43',
      conceptKey: 'leukocytes-are-granular-or-non-granular',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Recognise the polymorphonuclear leukocyte as a granulocyte under its other name.',
      explanations: {
        A: 'A thrombocyte is a platelet, not a leukocyte at all — it is a non-nucleated fragment, and the granular/non-granular split applies only to white cells.',
        B: 'The monocyte is a non-granular leukocyte. Its cytoplasm holds azurophil granules, which are lysosomes, but no specific granules.',
        C: 'The lymphocyte is the other non-granular leukocyte, with only a thin rim of cytoplasm and a few azurophil granules in it.',
        D: 'Correct. Polymorphonuclear leukocyte is the neutrophil\'s other name, taken from its many-shaped 2–5-lobed nucleus, and the neutrophil is a granulocyte.',
      },
    },
    {
      key: 'which-of-these-blood-elements-can-differentiate-into-plasma-84a64f96',
      conceptKey: 'b-lymphocyte-becomes-the-plasma-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the blood element that becomes the antibody-secreting plasma cell.',
      explanations: {
        A: 'The monocyte differentiates in the tissues, but into the macrophage. Antibody production is not in its line.',
        B: 'The megakaryocyte sheds platelets in the marrow. It has nothing to do with immunity.',
        C: 'Correct. The B lymphocyte, activated by its antigen and by a helper T cell, becomes a plasmablast and then a plasma cell secreting antibody.',
        D: 'The near miss, and the reason this is asked: T lymphocytes are essential to the humoral response — the helper T cell is what licenses the B cell — but they mediate cell-mediated immunity and never become plasma cells themselves.',
      },
    },
  ],
}
