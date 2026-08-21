/**
 * `101 ISK > Histology > Blood > Blood Platelets` — the question books' MCQs.
 *
 * Nineteen distinct questions across the books. Four of them are the same two
 * questions asked twice with the OCR of one copy worse than the other, which is
 * why the excluded ones stay here: when someone rescans those pages the better
 * copy is already identified.
 *
 * `platelet-hyalomere-structure-function` is not minted here. It is already a
 * concept, from the 2025 end-of-year paper, and its definition below is copied
 * from that batch verbatim so re-emitting it is an update that changes nothing
 * except adding the question-book occurrences to its exam signal. A second
 * concept for the same idea would split a student's mastery in half.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Blood Platelets',
  modulePath: '101 ISK > Histology > Blood > Blood Platelets',
  articleId: 'ART-101-HIS-BLOOD-PLATELETS',

  concepts: [
    {
      key: 'platelet-hyalomere-structure-function',
      label: 'The hyalomere’s microtubules and canalicular system carry out the platelet’s shape change and release',
      definition: 'The hyalomere is the peripheral, pale zone of the platelet. Its marginal bundle of microtubules holds the resting discoid shape and contracts to produce pseudopodia; its open canalicular system opens the granule contents to the exterior, and its dense tubular system stores the calcium that triggers them.',
      objective: 'Explain how each structure of the hyalomere seen on electron microscopy produces a step of platelet function.',
      pitfall: 'Treating the hyalomere as inert because it looks empty. The granules are in the granulomere; the machinery that acts on them is here.',
      subject: 'haem', primary: 'DIS-HIS-T01', secondary: ['SYS-HEM-T01-S01-M03'],
      modulePath: '101 ISK > Histology > Blood > Blood Platelets',
      type: 'structure_function_relationship',
    },
    {
      key: 'platelet-two-zones-on-light-microscopy',
      label: 'A platelet is a non-nucleated fragment with a pale peripheral hyalomere and a dark central granulomere',
      definition: 'A platelet is a non-nucleated cytoplasmic fragment, 2–4 µm across, with a peripheral pale basophilic zone — the hyalomere — and a central dark granular zone, the granulomere, which holds the granules and the few organelles. Its cell coat is thick and rich in glycoprotein, which is what lets it adhere.',
      objective: 'Identify a platelet and name its two zones and what each contains.',
      pitfall: 'Calling the granulomere pale and the hyalomere dark. The names say it: hyalo- is the clear one, and it is peripheral.',
      subject: 'haem', primary: 'DIS-HIS-T01', secondary: ['SYS-HEM-T01-S01-M03'],
      modulePath: '101 ISK > Histology > Blood > Blood Platelets',
      type: 'structural_description',
    },
    {
      key: 'platelet-granule-types-and-contents',
      label: 'Platelets carry three granule types — alpha, delta and lambda — each with different contents',
      definition: 'Alpha granules hold clotting factors, fibrinogen and platelet-derived growth factor. Delta (dense) granules hold ADP, ATP, calcium and serotonin. Lambda granules are lysosomes, holding hydrolytic enzymes. All three lie in the granulomere.',
      objective: 'Name the three platelet granule types and give the contents of each.',
      pitfall: 'Putting serotonin in the alpha granules. It is in the delta granules with the calcium and the adenine nucleotides, and that grouping is what the question turns on.',
      subject: 'haem', primary: 'DIS-HIS-T01', secondary: ['SYS-HEM-T01-S01-M03'],
      modulePath: '101 ISK > Histology > Blood > Blood Platelets',
      type: 'classification',
    },
    {
      key: 'platelet-origin-from-megakaryocyte',
      label: 'Platelets are shed from megakaryocytes along demarcation channels that cut the cytoplasm into platelet ribbons',
      definition: 'Platelets arise from megakaryocytes in the bone marrow. Invaginations of the megakaryocyte plasma membrane — the demarcation channels — extend through the cytoplasm and into its pseudopodia, dividing it into platelet ribbons that fragment into individual platelets.',
      objective: 'Give the origin of the platelet and explain how demarcation channels produce it.',
      pitfall: 'Calling the demarcation channels cell junctions. They are membrane invaginations of one cell, not contacts between two.',
      subject: 'haem', primary: 'DIS-HIS-T01', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Blood Platelets',
      type: 'developmental_process',
    },
    {
      key: 'platelet-count-and-thrombocytopenia',
      label: 'The normal platelet count is 150,000–400,000/mm³, and bleeding follows when it falls far below it',
      definition: 'The normal platelet count is about 150,000–400,000 per mm³. Thrombocytopenia — a count below roughly 50,000 per mm³, from reduced marrow production or increased destruction — prolongs the bleeding time and causes purpura and excessive bleeding after trauma.',
      objective: 'State the normal platelet count and the consequences of a low one.',
      pitfall: 'Confusing the platelet count with the red or white cell counts. Platelets are hundreds of thousands, red cells millions, white cells thousands.',
      subject: 'haem', primary: 'DIS-HIS-T01', secondary: ['SYS-HEM-T01-S01-M03'],
      modulePath: '101 ISK > Histology > Blood > Blood Platelets',
      type: 'clinical_correlation',
    },
  ],

  questions: [
    {
      key: 'all-characters-of-platelet-xpt-ecab2ba3',
      conceptKey: 'platelet-two-zones-on-light-microscopy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that the platelet cell coat is thick and central to haemostasis, not incidental.',
      explanations: {
        A: 'True, so not the exception. The hyalomere is the peripheral pale zone and it is basophilic.',
        B: 'The exception, and the answer. The platelet coat is thick and glycoprotein-rich, and it is what lets the platelet adhere to damaged endothelium — the coat is the beginning of haemostasis, not a bystander.',
        C: 'True, so not the exception. The granulomere is the central dark zone and holds the granules with few other organelles.',
        D: 'True, so not the exception. The hyalomere holds the marginal microtubule bundle and actin filaments.',
      },
    },
    {
      key: 'as-regard-demarcation-channels-in-megakaryocytes-all-of-the-eb13a10f',
      conceptKey: 'platelet-origin-from-megakaryocyte',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Distinguish a membrane invagination within one cell from a junction between two.',
      explanations: {
        A: 'True, so not the exception. They are invaginations of the megakaryocyte plasma membrane.',
        B: 'True, so not the exception. They divide the cytoplasm into platelet ribbons which then fragment.',
        C: 'The exception, and the answer. Chosen by students who read "channel" as something between cells; a demarcation channel lies within a single megakaryocyte and joins nothing to anything.',
        D: 'True, so not the exception. The channels extend into the pseudopodia the megakaryocyte pushes into the marrow sinusoid.',
      },
    },
    {
      key: 'blood-platelets-have-the-following-characters-except-c3089da2',
      conceptKey: 'platelet-two-zones-on-light-microscopy',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall that a platelet is a cytoplasmic fragment and has no nucleus at all.',
      explanations: {
        A: 'True, so not the exception. 150,000–400,000/mm³ is the normal range.',
        B: 'True, so not the exception. That is the platelet\'s defining two-zone appearance.',
        C: 'True, so not the exception. Adhesion and aggregation at the site of injury are what platelets do.',
        D: 'The exception, and the answer. Picked by students who transfer the lobulated nucleus of the neutrophil, or of the megakaryocyte the platelet came from. A platelet is a shed fragment and has no nucleus, lobulated or otherwise.',
      },
    },
    {
      key: 'demarcation-channels-is-important-in-formation-c4d0a09b',
      conceptKey: 'platelet-origin-from-megakaryocyte',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Name what demarcation channels produce.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Demarcation channels subdivide megakaryocyte cytoplasm into platelets, which is the only option the mechanism produces.',
      explanations: {
        A: 'Correct. The channels cut the megakaryocyte cytoplasm into platelet ribbons, which fragment into platelets.',
        B: 'A reticulocyte is a young red cell that has lost its nucleus but kept ribosomes. Nothing subdivides it.',
        C: 'Backwards: the demarcation channels are inside the megakaryocyte, so they cannot form it.',
        D: 'Leucocytes arise by division of their own precursors, not by fragmentation of a larger cell.',
      },
    },
    {
      key: 'e-m-picture-of-blood-platelets-shows-72df4e13',
      conceptKey: 'platelet-hyalomere-structure-function',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only options A and C survived extraction; B and D were lost, and a two-option question cannot be sat. The same question is intact at key `ej-m-picture-of-blood-platelets-shows-055d2c8e`, which is the copy to use. Kept here so that whoever rescans the page knows this row is a duplicate and not a separate question.',
    },
    {
      key: 'ej-m-picture-of-blood-platelets-shows-055d2c8e',
      conceptKey: 'platelet-hyalomere-structure-function',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Place the microtubules, the canalicular systems and the granules in the correct zone of the platelet.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. Only D puts a structure in the zone that actually holds it: the marginal microtubule bundle lies in the peripheral hyalomere.',
      explanations: {
        A: 'The open canalicular system belongs to the hyalomere, the peripheral zone, not the central one. Its job is to open the granulomere\'s granules to the exterior across that periphery.',
        B: 'Microfilaments are in the hyalomere too. The central zone is where the granules are, which is what makes it dark.',
        C: 'The granulomere is named for its granules. Its microtubule content is not what defines it, and the marginal bundle is not there.',
        D: 'Correct. The marginal bundle of microtubules runs around the periphery within the hyalomere, and it is what holds the resting platelet in its discoid shape.',
      },
    },
    {
      key: 'granulomere-is-central-dark-granular-layer-of-following-bloo-1267f353',
      conceptKey: 'platelet-two-zones-on-light-microscopy',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the granulomere to the platelet and to nothing else.',
      explanations: {
        A: 'A neutrophil has granules throughout its cytoplasm and a lobed nucleus; it has no two-zone division into hyalomere and granulomere.',
        B: 'A basophil is granular, which is what makes this tempting, but its granules fill the cell rather than occupying a named central zone.',
        C: 'An erythrocyte is a biconcave disc filled with haemoglobin and has no granules at all.',
        D: 'Correct. Hyalomere and granulomere are the platelet\'s two zones, and the terms are used of nothing else.',
      },
    },
    {
      key: 'granulomere-of-blood-platelets-contains-d469b119',
      conceptKey: 'platelet-granule-types-and-contents',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Match each platelet granule type to its actual contents.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. Delta granules do hold ATP; each of the other three options misassigns either a structure or a granule content.',
      explanations: {
        A: 'The dense tubular system is a hyalomere structure — it stores the calcium that triggers release — and is not a granulomere content.',
        B: 'Serotonin is in the delta granules, not the alpha. Alpha granules hold clotting factors, fibrinogen and platelet-derived growth factor.',
        C: 'Correct. Delta, or dense, granules hold ADP, ATP, calcium and serotonin, and they lie in the granulomere.',
        D: 'Lambda granules are lysosomes and hold hydrolytic enzymes. The clotting factors belong to the alpha granules.',
      },
    },
    {
      key: 'hyalomere-is-in-af618a57',
      conceptKey: 'platelet-two-zones-on-light-microscopy',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the hyalomere to the platelet and to nothing else.',
      explanations: {
        A: 'A T lymphocyte has a large round nucleus and a thin rim of agranular cytoplasm — no named zones.',
        B: 'A B lymphocyte looks much the same on light microscopy, and is likewise not divided into zones.',
        C: 'A mast cell is filled with coarse metachromatic granules throughout, with no clear peripheral zone.',
        D: 'Correct. Hyalomere and granulomere are the platelet\'s two zones.',
      },
    },
    {
      key: 'hyalomere-of-blood-platelets-contain-be80bb1b',
      conceptKey: 'platelet-hyalomere-structure-function',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'List everything the hyalomere contains, rather than stopping at the first true option.',
      explanations: {
        A: 'True, but not the whole answer. The marginal microtubule bundle holds the resting discoid shape.',
        B: 'True, but not the whole answer. Actin and myosin contract to produce the pseudopodia of the activated platelet.',
        C: 'True, but not the whole answer. The open (surface-connected) canalicular system discharges the granules, and the dense tubular system stores the calcium that triggers them.',
        D: 'Correct. All three are hyalomere contents, and between them they perform every mechanical step the platelet takes.',
      },
    },
    {
      key: 'in-the-platelets-the-granulomere-contains-the-followings-exc-6203da86',
      conceptKey: 'platelet-granule-types-and-contents',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that platelets have three granule types and that a beta granule is not one of them.',
      explanations: {
        A: 'True, so not the exception. Alpha granules hold clotting factors and fibrinogen.',
        B: 'The exception, and the answer. There is no beta granule. It is invented by analogy with alpha and delta, and the DNA and RNA give it away — a platelet has no nucleus and carries no DNA.',
        C: 'True, so not the exception. Delta granules hold calcium along with ADP, ATP and serotonin.',
        D: 'True, so not the exception. Lambda granules are the platelet\'s lysosomes.',
      },
    },
    {
      key: 'number-of-platelets-are-448b29b8',
      conceptKey: 'platelet-count-and-thrombocytopenia',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'State the normal platelet count without confusing it with the red or white cell count.',
      explanations: {
        A: '5–6 million per mm³ is the red cell count.',
        B: 'Correct. The normal platelet count is roughly 150,000–400,000 per mm³.',
        C: '4,000–11,000 per mm³ is the total white cell count.',
        D: '2–4 million confuses the count with the platelet\'s diameter of 2–4 µm.',
      },
    },
    {
      key: 'origin-of-blood-platelets-50fffd36',
      conceptKey: 'platelet-origin-from-megakaryocyte',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Name the cell platelets are shed from.',
      explanations: {
        A: 'Mesenchymal cells give rise to connective tissue, not to blood platelets.',
        B: 'Correct. Platelets are fragments shed from megakaryocytes in the bone marrow.',
        C: 'Pericytes sit on the outside of capillaries and are contractile; they produce no blood cells.',
        D: 'Monocytes are themselves blood cells and become macrophages; they shed nothing.',
      },
    },
    {
      key: 'origin-of-platelet-303ab496',
      conceptKey: 'platelet-origin-from-megakaryocyte',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Name the cell platelets are shed from.',
      explanations: {
        A: 'A macrophage phagocytoses worn platelets; it does not produce them.',
        B: 'Undifferentiated mesenchymal cells give rise to connective tissue, not to platelets.',
        C: 'Correct. Platelets are shed from megakaryocytes in the bone marrow.',
        D: 'A fibroblast makes collagen and ground substance and produces no blood elements.',
      },
    },
    {
      key: 'platelet-ribbon-is-a-part-of-ceeb33f8',
      conceptKey: 'platelet-origin-from-megakaryocyte',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Place the platelet ribbon in the cell it forms within.',
      explanations: {
        A: 'A monocyte is a mature circulating cell and does not fragment.',
        B: 'Correct. Demarcation channels divide megakaryocyte cytoplasm into ribbons, which then break into individual platelets.',
        C: 'A reticulocyte is a young red cell; the word looks similar but the two have nothing to do with each other.',
        D: 'A lymphocyte divides in two when it proliferates; it never fragments into ribbons.',
      },
    },
    {
      key: 'purpura-or-thrombocytopenia-is-characterized-by-2e398f85',
      conceptKey: 'platelet-count-and-thrombocytopenia',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Connect a low platelet count to its marrow cause and its bleeding consequence together.',
      explanations: {
        A: 'True, but not the whole answer. Bleeding becomes a real risk once the count falls below about 50,000/mm³.',
        B: 'True, but not the whole answer. Reduced marrow production is one route to it, alongside increased destruction.',
        C: 'True, but not the whole answer. A prolonged bleeding time and excessive bleeding after trauma are how it presents.',
        D: 'Correct. The count, its cause and its consequence are all part of the picture, and a student who stops at the first true option has answered only a third of it.',
      },
    },
    {
      key: 'the-following-originate-from-megakaryocyte-abf0fdb9',
      conceptKey: 'platelet-origin-from-megakaryocyte',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Name what the megakaryocyte produces.',
      explanations: {
        A: 'Correct. Platelets are shed from megakaryocyte cytoplasm.',
        B: 'Erythrocytes come from the erythroid line, through the normoblast.',
        C: 'Monocytes come from the monocyte line in the marrow.',
        D: 'Lymphocytes come from lymphoid precursors, and mature in the thymus or the marrow.',
      },
    },
    {
      key: 'what-feature-is-true-for-the-central-region-of-human-platele-c6a0bc3b',
      conceptKey: 'platelet-two-zones-on-light-microscopy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived extraction and the contract is four to five. The question itself is sound — the central region is the granulomere and holds the granules — so it is worth recovering when the page is rescanned rather than abandoning.',
    },
    {
      key: 'which-of-the-following-is-true-for-platelets-1f36abef',
      conceptKey: 'platelet-two-zones-on-light-microscopy',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The correct option reads "2-4 pm": OCR has eaten the micron sign, so the right answer is printed as a unit of time. A student cannot be asked to pick an option whose units are wrong. Recoverable by rescanning — the intended answer is the 2–4 µm diameter.',
    },
  ],
}
