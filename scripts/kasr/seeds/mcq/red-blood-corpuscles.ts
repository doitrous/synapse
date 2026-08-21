/**
 * `101 ISK > Histology > Blood > Red Blood Corpuscles` — the question books' MCQs.
 *
 * Sixty-one rows, forty-seven live. The best-scanned leaf of the eleven I have
 * worked: the books print most of these questions once, cleanly, and key them
 * correctly, so only fourteen rows are lost and only one printed key is
 * overridden — `top-view-of-rbcs-is-while-side-view-is`, keyed to "oval,
 * biconvex" where the department book says rounded in top view and biconcave in
 * side view, and where "biconvex" is the shape the neighbouring question is
 * written to catch.
 *
 * Eight concepts are minted for the leaf itself and divide it the way the book's
 * three pages do: shape and light-microscopic appearance; ultrastructure and the
 * spectrin–actin cytoskeleton; adaptation to gas transport; count and life span;
 * rouleaux; osmotic fragility; the anaemias; and the reticulocyte. The last is
 * minted separately because two rows here are clinical — what rises in the blood
 * after a haemorrhage — and a student can know the reticulocyte is a young red
 * cell without knowing that its percentage is what a physician looks at.
 *
 * Six concepts are reused verbatim, five of them for questions that are not
 * about red cells at all. The topic clustering put a basophil question, a
 * monocyte question, two red-bone-marrow questions, two pigment questions and a
 * brown-fat question in this leaf; each keeps the concept its own leaf already
 * declared — `basophil-granule-contents-and-anaphylaxis`,
 * `monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage`,
 * `red-bone-marrow-stroma-and-free-cells`,
 * `organelles-inclusions-and-the-membranous-classification` and
 * `white-versus-brown-adipose-connective-tissue` — rather than a rival minted
 * here.
 *
 * One concept is minted outside this leaf and should be watched.
 * `collagen-synthesis-requires-vitamin-c` carries a scurvy case that landed here
 * and takes the modulePath of `Connective Tissue > Connective Tissue Fibres`,
 * which has no seed file yet. Whoever writes that leaf should reuse this key
 * rather than mint their own; it is declared here only because the question had
 * nowhere else to sit.
 *
 * Three of the exclusions are worth a reviewer's attention rather than a
 * rescan. `concerning-the-previous-disease-the-following-occurs` and
 * `the-etiology-of-the-disease-in-the-previous-case-could-be` are follow-on
 * questions whose case is not in the row — the books ask them beneath a stem
 * that the extraction filed as a separate question, and no rescan of these rows
 * will supply it. `which-of-the-following-gives-more-space-for-hb` is live but
 * carries a note in its explanation of option A: the department book credits the
 * absence of nucleus and organelles with the extra space and the biconcave shape
 * with surface area, so "all of the above" is the intended key and its first
 * member is the weakest.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Red Blood Corpuscles',
  modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
  articleId: 'ART-101-HIS-RED-BLOOD-CORPUSCLES',

  concepts: [
    {
      key: 'rbc-shape-size-and-light-microscopic-appearance',
      label: 'A red cell is a non-nucleated biconcave disc, 6–9 µm across, acidophilic with a pale centre one third of its diameter',
      definition:
        'Blood is a special connective tissue circulating in vessels, 45 per cent cells and 55 per cent plasma, and its formed elements are erythrocytes, leukocytes and thrombocytes. On a Leishman-stained film the red cell is rounded in top view and biconcave in side view, non-nucleated, and acidophilic — it takes the acidic eosin because haemoglobin is a basic protein — with a pale centre about a third of its diameter, which is what "normochromic" describes. It is 6–9 µm across, averaging 7.5 µm, and 2.2 µm thick at the edge against 0.8 µm at the centre. Abnormal shapes follow from a changed membrane or haemoglobin content: spherocytes, ovalocytes, sickle cells and pear-shaped poikilocytes, all more fragile and more easily haemolysed. Abnormal sizes are microcytes under 6 µm, macrocytes over 9 µm, and anisocytosis, several sizes in one film.',
      objective:
        'Describe a normal red cell on a stained film — shape in both views, size, staining and central pallor — and name the abnormalities of shape and size.',
      pitfall:
        'Reading the two views the wrong way round. The disc is rounded seen from above and biconcave seen edge-on; a red cell described as biconvex is a normal cell with its profile inverted, and it is offered in these books as a distractor more often than any other single error.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structural_description',
      aliases: ['Erythrocyte', 'Normochromic', 'Anisocytosis', 'Poikilocyte', 'Central pallor'],
    },
    {
      key: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      label: 'On electron microscopy a red cell has no nucleus and no organelles — only a membrane, a spectrin–actin skeleton and homogeneous haemoglobin',
      definition:
        'By electron microscopy the mature red cell has neither nucleus nor organelles; its interior is electron-dense homogeneous haemoglobin. Its cell membrane is the only membranous structure it has, and it is flexible. On the inner surface of that membrane a cytoskeleton of actin and spectrin maintains the biconcave shape and the stability of the membrane, which is why a defect in the spectrin gene rounds the cell into a spherocyte. On the outer surface the glycocalyx carries the antigenic sites of the ABO blood groups and of the Rh factor, so blood grouping is a property of the outside of the membrane and shape a property of the inside.',
      objective:
        'State what the red cell contains and lacks on electron microscopy, and assign shape to the inner surface of the membrane and blood grouping to the outer.',
      pitfall:
        'Swapping the two surfaces. Spectrin and actin are inside and hold the shape; the antigens are outside and decide the blood group — the two questions are printed with the same four options and differ only in which surface they name.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Spectrin', 'Glycocalyx of the red cell', 'ABO antigens'],
    },
    {
      key: 'rbc-adaptation-to-gas-transport',
      label: 'Every feature of the red cell is matched to one demand: flexibility to pass capillaries, lipoprotein membrane for gas exchange, biconcavity for surface area, and no nucleus so there is room for haemoglobin',
      definition:
        'The department book pairs each feature of the red cell with the function it serves, and the books examine the pairing rather than the list. The plasmalemma is flexible so the cell can be squeezed through narrow capillaries, and it is lipoprotein and therefore highly selective, which is what suits it to gas exchange. The biconcave shape gives a large surface area for that exchange, while the rounded edges ease passage through branched vessels. The absence of a nucleus and of organelles means the cell cannot divide, and leaves more room for haemoglobin — the cell is 33 per cent haemoglobin, 66 per cent water and 1 per cent enzymes. Those enzymes include haemoglobin reductase, which keeps the haemoglobin able to combine with oxygen, and carbonic anhydrase, which lets the cell carry carbon dioxide. Its functions are therefore transport of the respiratory gases and, through the bicarbonate it generates, acid–base buffering; it has no part in immunity and does not phagocytose.',
      objective:
        'Match each structural feature of the red cell to the function it is adapted for, and give the two functions of the cell.',
      pitfall:
        'Accepting a true feature paired with the wrong function. "Lipoprotein membrane to squeeze through capillaries" and "biconcave surface to pass through branched vessels" are both built from two true halves joined wrongly, and they are the standard distractors here — the pairing is the answer, not the fact.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Carbonic anhydrase', 'Haemoglobin reductase', 'Gas exchange'],
    },
    {
      key: 'rbc-count-life-span-and-what-changes-it',
      label: 'The red cell count averages 5 million/mm³ and the cell lives 120 days, and androgen, altitude, exercise and hypoxia all push the count up',
      definition:
        'The average red cell count is about 5 million per mm³: 4.5–5.5 million in the adult male and 4–5 million in the adult female, the difference being the stimulating effect of androgen on the bone marrow. The count is highest in the newborn and falls gradually thereafter. A red cell lives about 120 days, after which it is phagocytosed by macrophages in the liver, the bone marrow and the spleen, its pigment excreted as bile pigment and its iron reused. A count above 6 million is polycythaemia, an increase in the number of red cells, which is physiological at high altitude, on exercise and in the newborn, and pathological when hypoxia from chronic lung disease drives the marrow. A count below 4 million, or a fall in haemoglobin concentration, is anaemia.',
      objective:
        'Give the normal count in each sex, the life span, and the physiological and pathological causes of a raised count.',
      pitfall:
        'Confusing the direction of the words. Polycythaemia is more cells and anaemia is fewer; and the increase at altitude is physiological while the identical increase in chronic lung disease is not, because one is a response to thin air and the other to a failing lung.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'clinical_correlation',
      aliases: ['Polycythaemia', 'Erythrocyte count', 'Life span of red cells'],
    },
    {
      key: 'rouleaux-and-the-erythrocyte-sedimentation-rate',
      label: 'Rouleaux is a reversible pile-of-coins adhesion of red cells in slow circulation, caused by the high surface tension of the biconcave surface',
      definition:
        'Rouleaux is the adhesion of red cells to one another like piles of coins. It occurs in slow circulation, not in normal circulation, and its cause is the high surface tension produced by the biconcave surface of the cells. It is reversible and does no damage to the cells, and it is a property of red cells alone — no white cell or platelet forms it. Because stacked cells fall faster than single ones, anything that promotes rouleaux raises the erythrocyte sedimentation rate, which is why the rate rises in inflammation.',
      objective:
        'Define rouleaux, give its cause and the circulatory condition it needs, and say what it does to the sedimentation rate.',
      pitfall:
        'Calling rouleaux damage, or putting it in normal circulation. It is reversible and harmless and it needs the flow to be slow — a question offering "occurs in normal circulation" and "causes damage of RBCs" is offering the two halves of the same misunderstanding.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Rouleaux formation', 'ESR', 'Erythrocyte sedimentation rate'],
    },
    {
      key: 'rbc-osmotic-fragility-crenation-and-haemolysis',
      label: 'Red cells keep their shape in isotonic plasma, crenate in a hypertonic solution and burst in a hypotonic one, leaving a cell ghost',
      definition:
        'Red cells are fragile and hold their normal shape only in isotonic surroundings — plasma, whose osmotic pressure equals that of 0.9 per cent saline. Placed in a hypertonic solution they lose water, shrink and develop notches on the surface: crenation. Placed in a hypotonic solution they take up water, swell, burst and leak their haemoglobin, and what is left behind is the empty cell membrane, the cell ghost. This is osmotic fragility, and it is increased in the abnormally shaped cells — spherocytes, ovalocytes, sickle cells and poikilocytes — whose haemolysis produces anaemia.',
      objective:
        'Say what happens to a red cell in isotonic, hypertonic and hypotonic surroundings, and name crenation and the cell ghost.',
      pitfall:
        'Attaching crenation to the hypotonic solution. Crenation is shrinkage, so it belongs to the solution that draws water out — hypertonic — and the questions in these books routinely offer it the other way round.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Crenation', 'Cell ghost', 'Haemolysis', 'Osmotic fragility'],
    },
    {
      key: 'anaemias-by-cause-and-the-cell-each-produces',
      label: 'Each named anaemia has one cause: marrow depression, lack of intrinsic factor, an abnormal haemoglobin, lack of iron, or a membrane defect',
      definition:
        'Anaemia is a fall in the number of red cells, in the haemoglobin concentration, or both, and the department book names its types by cause. Aplastic anaemia is depression of the bone marrow, by X-rays or by drugs, so that the marrow makes too few cells of every line. Pernicious anaemia is deficiency of vitamin B12 caused by failure of the stomach to produce intrinsic factor, and the cells produced are macrocytes. Microcytic anaemia is iron deficiency, giving small pale cells. Sickle cell anaemia is a mutation in the DNA encoding haemoglobin, producing the abnormal rigid haemoglobin S which accumulates at one side of the cell and pulls it into a crescent. Haemolytic anaemias destroy cells already made: hereditary spherocytosis, from a primary defect in the spectrin gene which loses the biconcave shape, and favism. Acute blood loss is a further cause, and is not the same as any of them.',
      objective:
        'Name the cause of each type of anaemia the book lists, and the shape or size of red cell each produces.',
      pitfall:
        'Answering sickle cell anaemia with an abnormal nucleus. The mature red cell has no nucleus at all; the mutation is in the DNA of the marrow precursor and what the film shows is abnormal haemoglobin in a cell with no nucleus to be abnormal.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'clinical_correlation',
      aliases: ['Aplastic anaemia', 'Pernicious anaemia', 'Sickle cell anaemia', 'Hereditary spherocytosis'],
    },
    {
      key: 'reticulocyte-is-the-young-red-cell-and-rises-after-haemorrhage',
      label: 'A reticulocyte is a newly released red cell with residual ribosomes, acidophilic with a basophilic reticulum, and its percentage rises when the marrow is pushed',
      definition:
        'A reticulocyte is a red cell that has just lost its nucleus and still holds residual ribosomal RNA. Its cytoplasm is acidophilic like a mature cell but carries a basophilic reticulum, which a supravital stain such as brilliant cresyl blue shows as a network. It is the same size as a mature red cell, about 7.5 µm, and makes up roughly one per cent of the circulating red cells. Because it is the marrow\'s newest output, its percentage rises whenever erythropoiesis is driven hard — after acute haemorrhage most obviously — and it is therefore the index of how fast red cells are being made.',
      objective:
        'Identify a reticulocyte by its staining and the stain that shows it, and say what a raised reticulocyte count means.',
      pitfall:
        'Reading the reticulocyte as a white cell because of the basophilic material in it. It has no nucleus and no granules, it is not part of the leucocytic count, and a percentage quoted "of the total leucocytic count" belongs to a neutrophil rather than to this cell.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Reticulocyte count', 'Brilliant cresyl blue', 'Supravital stain'],
    },
    {
      key: 'collagen-synthesis-requires-vitamin-c',
      label: 'Collagen cannot be built without vitamin C, and scurvy is what a body with defective collagen looks like',
      definition:
        'Collagen is made by the fibroblast, and the hydroxylation of proline and lysine that stabilises the triple helix requires vitamin C. Without it the fibroblast secretes collagen that cannot form proper fibres, so every tissue that depends on collagen for its strength fails at once — this is scurvy. Gums bleed and teeth loosen because the periodontal ligament is collagen; wounds fail to heal because healing is the laying down of new collagen; capillaries leak and bruises appear because their walls are supported by collagen. The disease is a deficiency and not a bleeding disorder: the platelets are normal, which is what separates it from purpura.',
      objective:
        'Name the vitamin collagen synthesis requires and explain the signs of scurvy from the tissues collagen supports.',
      pitfall:
        'Reading bleeding gums as a platelet problem. Purpura is a low platelet count and bleeds without a wound; scurvy bleeds because the connective tissue holding the vessels and the teeth has failed, and the non-healing wounds are the clue that separates them.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'clinical_correlation',
      aliases: ['Scurvy', 'Vitamin C deficiency', 'Collagen fibres'],
    },
    {
      key: 'basophil-granule-contents-and-anaphylaxis',
      label: 'The basophil holds histamine and heparin, carries IgE receptors, and its histamine release is anaphylaxis',
      definition:
        'Basophils are 0–1% of the white cell count, 10–12 µm, with an S-shaped nucleus obscured by coarse granules that stain metachromatically purple with toluidine blue because of their heparin. The specific granules are large, rounded and electron dense, holding histamine, heparin, eosinophil chemotactic factor and leukotrienes, and the cell membrane carries receptors for IgE. Heparin prevents clotting and promotes allergy; histamine causes vasodilatation with a sudden drop in blood pressure — anaphylaxis; leukotrienes cause bronchospasm and bronchial asthma. Basophilia is above 2%.',
      objective: 'List what the basophil granule contains, and connect each substance to the clinical event it produces.',
      pitfall: 'Calling the basophil a mast cell. Both stain metachromatically, both hold histamine and heparin and both carry IgE receptors — the book compares them directly — but they differ in life span, size, nuclear shape and phagocytic ability, and the mast cell is 20–30 µm against the basophil’s 10–12.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Basophil granules', 'Anaphylaxis', 'Basophilia'],
    },
    {
      key: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      label: 'The monocyte is the largest leukocyte and the precursor of every phagocytic cell of the tissues',
      definition:
        'The monocyte is 13–20 µm across, the largest of the white cells, with a large eccentric kidney-shaped pale nucleus and non-granular pale basophilic cytoplasm whose lysosomes give it a frosted-glass look. It spends about three days in the blood, then enters connective tissue and becomes the macrophage, living some three months. It is an antigen-presenting cell, and it is the precursor of all the phagocytic cells of the body — the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone and the microglia of the central nervous system.',
      objective: 'Identify the monocyte by size and nuclear shape and name the tissue cells it gives rise to.',
      pitfall: 'Calling the large lymphocyte the largest leukocyte. It reaches 10–15 µm; the monocyte reaches 20 µm, and it is the nuclear shape — kidney, not round — that settles it on a film.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'structure_function_relationship',
    },
    {
      key: 'red-bone-marrow-stroma-and-free-cells',
      label: 'Red bone marrow is a stroma of fixed cells and blood sinusoids holding free developing blood cells and stem cells',
      definition:
        'Red bone marrow has a stroma and free cells. The stroma is reticular cells, which with reticular fibres form the supporting network, together with fibroblasts, undifferentiated mesenchymal cells, pericytes, osteogenic cells and fat cells — the largest cells in the marrow — and the blood sinusoids, wide irregular capillaries lined by endothelium on a non-continuous basement membrane, through whose pores finished cells enter the blood. The free cells are the developing stages of the blood cells and the stem cells, immature white cells outnumbering immature red cells about five to one because most white cells are shorter-lived.',
      objective: 'Name the fixed cells, the sinusoids and the free cells of red bone marrow and say what each contributes.',
      pitfall: 'Expecting the sinusoid to have a continuous basement membrane like an ordinary capillary. It is the gaps in it that let a finished blood cell leave the marrow at all.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S02-M03'],
      modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
      type: 'structural_description',
    },
    {
      key: 'organelles-inclusions-and-the-membranous-classification',
      label: 'Organelles are living and essential, inclusions are not, and organelles divide into membranous and non-membranous',
      definition:
        'Cytoplasm is cytosol, organelles and inclusions. Organelles are living, permanent, essential and active, and have vital functions; inclusions are non-living, temporary, usually not essential and inert, and result from the cell\'s activity. Organelles are classified by whether they have a limiting membrane. The membranous ones are the plasma membrane, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes and peroxisomes; the non-membranous ones are the ribosomes and the cytoskeleton, with the centrioles, cilia and flagella that the microtubules build. The inclusions are stored food — glycogen, which dissolves out of an H&E section leaving vacuoles and is shown by Best\'s carmine or PAS, and fat, vacuolated in H&E and orange with Sudan III — and pigments, endogenous (haemoglobin, melanin, lipofuscin) or exogenous (carbon and dust, carotene, tattoo dyes).',
      objective:
        'Separate organelles from inclusions by the five properties the book contrasts, sort the organelles into membranous and non-membranous, and name the inclusions and the stains that show them.',
      pitfall:
        'Calling a coated vesicle or a centriole an organelle of the wrong class. A coated vesicle is a piece of membrane and is membranous; a centriole is built of microtubules and has no membrane at all.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
      aliases: ['Cytoplasmic inclusions', 'Membranous organelles', 'Non-membranous organelles'],
    },
    {
      key: 'white-versus-brown-adipose-connective-tissue',
      label: 'White adipose tissue is unilocular and stores fat; brown adipose tissue is multilocular and burns it for heat',
      definition:
        'White adipose connective tissue is made of unilocular fat cells and is white because it is poorly vascularised and its droplets hold carotenoids; it is affected by diet and by hormones, lies under the skin and around organs, and stores fat. Brown adipose connective tissue is made of multilocular fat cells and is brown from its richer blood supply and the cytochrome pigments of its many mitochondria; it is affected by hormones but not by diet, is abundant in fetal life and in the newborn, is lost during childhood and replaced by white fat, and performs thermogenesis — burning fat to release heat through the thermogenin of its mitochondria.',
      objective: 'Contrast white and brown adipose tissue by fat cell type, colour, age distribution and function.',
      pitfall: 'Attributing thermogenesis to white fat because it insulates. Insulating against heat loss and generating heat are different jobs and belong to different tissues.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
  ],

  questions: [
    {
      key: 'normal-rbcs-are-b189c01b',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the shape and nuclear status of a normal red cell in one phrase.',
      explanations: {
        A: 'Oval red cells are ovalocytes, one of the abnormal shapes the book lists — normal in camels and birds, abnormal in a human film.',
        B: 'Nucleated red cells are precursors still in the marrow, or a sign of disease if they reach the blood. The mature cell has extruded its nucleus.',
        C: 'Correct. A normal red cell is a non-nucleated biconcave disc.',
        D: 'Biconvex is the profile with its curves reversed — thick in the middle instead of thin. It is the single commonest distractor in this chapter and turns on one letter.',
      },
    },
    {
      key: 'top-view-of-rbcs-is-while-side-view-is-0b40375f',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the appearance of a red cell in each of the two views.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books key this to C, "oval, biconvex". The department book states that red cells are rounded in top view and biconcave in side view, and both halves of the printed key are wrong: oval is the ovalocyte, an abnormal shape, and biconvex is the inverse of the normal profile. The answer is B.',
      explanations: {
        A: 'The two views the wrong way round. A disc seen edge-on is biconcave and seen from above is rounded, not the reverse; this option is the correct pair transposed and is the strongest distractor for that reason.',
        B: 'Correct. Rounded in top view, biconcave in side view.',
        C: 'Both halves wrong. Oval belongs to the ovalocyte, an abnormal cell, and biconvex reverses the profile. It is the option the books key this question to.',
        D: 'Biconvex and cylindrical describe no red cell at all — a cylinder has no view in which it looks like a disc.',
      },
    },
    {
      key: 'the-average-size-of-rbcs-2ce25ed7',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the red cell diameter in the correct unit.',
      explanations: {
        A: 'Correct. About 7 µm — the book gives a range of 6–9 µm with an average of 7.5 µm.',
        B: '7 nm is a thousandfold too small: that is the order of a cell membrane\'s thickness, not a cell\'s diameter.',
        C: '7 mm is a thousandfold too large and would make a red cell visible to the naked eye.',
        D: '0.7 cm is 7 mm again in another unit. All three wrong options carry the right figure and the wrong prefix, which is the whole of the question.',
      },
    },
    {
      key: 'central-pallor-in-rbcs-is-the-5b049397',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the size of the central pallor as a fraction of the cell.',
      explanations: {
        A: 'Correct. The pale centre occupies about the middle third of the diameter, and that is what "normochromic" means on a film.',
        B: 'A pallor half the diameter is what hypochromic cells show, as in iron deficiency — a real appearance, but not the normal one.',
        C: 'Two thirds pale would leave only a thin rim of haemoglobin, which is severe hypochromia.',
        D: 'A quarter is too small; a pallor that slight suggests a spherocyte, which has almost none because it has lost its biconcavity.',
      },
    },
    {
      key: 'rbcs-are-c3de41ae',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the staining reaction of the red cell and say what causes it.',
      explanations: {
        A: 'Basophilic means taking the basic dye, which acidic components do. Haemoglobin is a basic protein and so does the opposite.',
        B: 'No special stain is needed: the red cell takes eosin in a routine film, and in an unstained film it is already coloured by its own haemoglobin.',
        C: 'Correct. Red cells are acidophilic — they bind the acidic eosin, because haemoglobin is basic.',
        D: '"All the above" cannot hold when the first two options contradict each other and contradict the third.',
      },
    },
    {
      key: 'light-microscopic-features-of-red-blood-corpuscles-include-3f0788e4',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the normal light-microscopic feature out of three abnormal ones.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books print no key. Only B is a feature of normal red cells on light microscopy: they are acidophilic because haemoglobin is a basic protein. Variation in size is anisocytosis, an abnormality; nuclei are absent; and the centre is pale, not dark.',
      explanations: {
        A: 'Variation in size is anisocytosis, which the book lists among the abnormalities. A normal film shows cells of one size.',
        B: 'Correct. Red cells are acidophilic, taking the eosin of a Leishman or H&E preparation.',
        C: 'The mature red cell has no nucleus. Nucleated red cells in the blood mean the marrow is releasing immature cells.',
        D: 'The centre is pale, not dark — the cell is thinnest there. A dark centre would mean the disc was biconvex, which is the shape error this chapter keeps testing.',
      },
    },
    {
      key: 'the-rbcs-in-adults-b9684d0a',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about adult red cells from three that fail on a single fact.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key for either printing of this question. Only A is true: red cells are flexible biconcave discs. The life span is 120 days rather than three weeks, the cells are non-nucleated, and they contain haemoglobin, not myoglobin.',
      explanations: {
        A: 'Correct. Flexible, because they must pass capillaries narrower than themselves, and biconcave, for surface area.',
        B: 'Three weeks is about 21 days; the red cell lives 120. The figure belongs to no cell in this chapter.',
        C: 'The mature red cell has no nucleus at all — that is the point of the ultrastructure question on the same page.',
        D: 'Myoglobin is the oxygen-binding protein of muscle. The red cell carries haemoglobin, and the two are close enough in name to be worth separating deliberately.',
      },
    },
    {
      key: 'blood-elements-are-fe21544d',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the three formed elements of blood.',
      explanations: {
        A: 'True but incomplete. Erythrocytes are one of the three formed elements.',
        B: 'True but incomplete. Leukocytes are the second.',
        C: 'True but incomplete. Thrombocytes — the platelets — are the third.',
        D: 'Correct. All three are the formed elements of blood, which make up 45 per cent of it against 55 per cent plasma.',
      },
    },
    {
      key: 'characteristic-ultrastructural-feature-of-rbcs-includes-0819a81e',
      conceptKey: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State what the red cell has left on electron microscopy.',
      explanations: {
        A: 'Well-developed rough endoplasmic reticulum belongs to a cell making protein for export — a plasma cell or a fibroblast. The red cell made its haemoglobin before it lost its ribosomes.',
        B: 'A heterochromatic nucleus is a nucleus, and the mature red cell has none.',
        C: 'Correct. The cell membrane is the only membranous structure the mature red cell retains; there is no nucleus and no organelle inside it, only haemoglobin.',
        D: 'A euchromatic nucleus is the pale active nucleus of a synthesising cell — twice wrong here, since the cell has neither a nucleus nor any synthesis left to do.',
      },
    },
    {
      key: 'the-following-statements-concerning-erythrocytes-are-true-ex-4e0becc2',
      conceptKey: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that a cell without organelles cannot be metabolically active.',
      explanations: {
        A: 'True, so not the exception. Rounded in top view, biconcave in profile, and non-nucleated.',
        B: 'True, so not the exception. 6–9 µm is the book\'s range.',
        C: 'True, so not the exception. The red colour is the haemoglobin, which is also why the cell is acidophilic.',
        D: 'The exception, and the answer. A cell with no nucleus, no mitochondria and no ribosomes cannot be described as very active — it cannot divide, cannot repair itself and has about 120 days before it is eaten. Its one per cent of enzymes is all the metabolism it has.',
      },
    },
    {
      key: 'keep-shape-stability-of-cm-of-rbcs-4b181c0a',
      conceptKey: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name both proteins of the red cell membrane skeleton.',
      explanations: {
        A: 'True but incomplete. Actin is one of the two.',
        B: 'True but incomplete. Spectrin is the other, and it is the one whose gene is defective in hereditary spherocytosis.',
        C: 'Myosin is the motor protein of muscle and of the contractile machinery of other cells. The red cell does not contract and has none.',
        D: 'Correct. Actin and spectrin together form the cytoskeleton on the inner surface of the membrane that keeps the shape and stabilises the membrane.',
      },
    },
    {
      key: 'the-spectrin-actin-at-inner-surface-of-cell-membrane-of-rbcs-3f1e4309',
      conceptKey: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Assign the inner surface of the red cell membrane to shape.',
      explanations: {
        A: 'Blood grouping is decided by the antigens of the glycocalyx, on the *outer* surface. This question and the one about the outer surface are printed with the same four options and differ only in which surface they name.',
        B: 'Correct. The spectrin–actin network on the inner surface maintains the biconcave shape and the stability of the membrane.',
        C: 'The colour comes from haemoglobin in the cytoplasm, not from anything attached to the membrane.',
        D: '"All of the above" fails because the first and third belong elsewhere — one to the outer surface, one to the interior.',
      },
    },
    {
      key: 'the-outer-surface-of-cell-membrane-of-rbcs-is-responsible-fo-9d643339',
      conceptKey: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Assign the outer surface of the red cell membrane to the blood group antigens.',
      explanations: {
        A: 'Correct. The glycocalyx on the outer surface carries the antigenic sites of the ABO groups and of the Rh factor.',
        B: 'Shape is maintained from inside, by the spectrin–actin cytoskeleton. This is the paired question with the surfaces exchanged.',
        C: 'The colour is the haemoglobin filling the cell and owes nothing to either surface.',
        D: '"All of the above" collects three answers of which only one belongs to the outer surface.',
      },
    },
    {
      key: 'all-characters-of-rbcs-except-5c3f2534',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise that the biconcave shape exists to increase surface area.',
      explanations: {
        A: 'True, so not the exception. Flexibility lets the cell deform through capillaries narrower than itself.',
        B: 'True, so not the exception. The lipoprotein membrane is highly selective, which is what suits it to gas exchange.',
        C: 'True, so not the exception. The rounded edges ease passage through branched vessels.',
        D: 'The exception, and the answer. A biconcave disc has a *large* surface area for its volume — that is the whole reason for the shape, and the option inverts it.',
      },
    },
    {
      key: 'the-followings-concerning-rbc-adaptation-to-its-function-ecx-28cc4a27',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall that the red cell has no nucleus at all, small or otherwise.',
      explanations: {
        A: 'True, so not the exception. Biconcavity is for surface area.',
        B: 'True, so not the exception. The lipoprotein membrane is highly selective.',
        C: 'True, so not the exception. Elasticity lets the cell pass small capillaries.',
        D: 'The exception, and the answer. The space for haemoglobin comes from having *no* nucleus, not a small one. The option is written to be accepted by a student who has learnt the fact as "small nucleus, more haemoglobin" and never noticed that the nucleus is gone.',
      },
    },
    {
      key: 'the-following-are-characters-of-rbcs-except-c4334b47',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Keep immunity out of the red cell\'s job list.',
      explanations: {
        A: 'True, so not the exception. 7.5 µm is the average diameter.',
        B: 'The exception, and the answer. Immunity is the work of the leukocytes; the red cell transports gases and buffers acid, and has no defensive role. It is tempting because the red cell does carry surface antigens — but carrying an antigen is not mounting a defence.',
        C: 'True, so not the exception. The biconcave shape is the red cell\'s defining feature.',
        D: 'True, so not the exception. Rouleaux is a property of red cells and of no other blood cell.',
      },
    },
    {
      key: 'function-of-rbcs-is-4c5c0e37',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give both functions of the red cell.',
      explanations: {
        A: 'True but incomplete. Carrying oxygen and carbon dioxide is the first function.',
        B: 'True but incomplete. Through the carbonic anhydrase reaction the cell generates bicarbonate and acts as an acid–base buffer.',
        C: 'Phagocytosis needs lysosomes and pseudopodia. The red cell has neither; it is itself phagocytosed at the end of its 120 days.',
        D: 'Correct. Gas transport and acid–base buffering, and a student who stops at the first has given half the answer.',
      },
    },
    {
      key: 'plasmalemma-or-rbcs-is-adapted-for-gas-exchange-due-to-high-971d6993',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the membrane property that makes the red cell selective for gases.',
      explanations: {
        A: 'Myoglobin is in muscle, not in any membrane, and it stores oxygen rather than letting it across.',
        B: 'Cholesterol is present in every plasma membrane and stiffens it. It is not what the book credits with the selectivity for gases.',
        C: 'The carbohydrate of the glycocalyx carries the blood group antigens. It faces the plasma and identifies the cell rather than admitting gas.',
        D: 'Correct. The membrane is lipoprotein and therefore highly selective, which is the property the book pairs with gas exchange.',
      },
    },
    {
      key: 'adaptations-of-rbcs-to-function-include-3fe7baaf',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Match each red cell feature to its own function rather than to a neighbouring one.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. All four options name a true feature, but three of them pair it with the wrong function: the lipoprotein membrane is for gas exchange rather than for squeezing, the rounded edges are for passing branched vessels rather than for exchange, and the biconcave surface is for surface area rather than for branched vessels. Only A pairs correctly — a flexible membrane to squeeze through capillaries.',
      explanations: {
        A: 'Correct. Flexibility of the plasmalemma is what lets the cell be squeezed through a capillary narrower than itself.',
        B: 'The right property with the wrong purpose. Being lipoprotein makes the membrane highly selective and so suited to gas exchange; it is flexibility, not composition, that gets the cell through a capillary.',
        C: 'The right feature with the wrong purpose again. Rounded edges ease passage through branched vessels; surface area for gas exchange comes from the biconcavity.',
        D: 'And the fourth permutation. The biconcave surface gives the large surface area for exchange; passage through branched vessels is what the rounded edges are for. Each of these three options is built from two true halves joined wrongly, which is why the question is harder than the facts in it.',
      },
    },
    {
      key: 'which-of-the-following-gives-more-space-for-hb-24cadb0f',
      conceptKey: 'rbc-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name what the red cell gave up in order to hold more haemoglobin.',
      explanations: {
        A: 'The weakest member of the set. The department book credits the biconcave shape with surface area rather than with storage space, and a student who rejects this option has read the book correctly — but with B and C both plainly true, no single-option answer is available and the inclusive option is what the examiner intends.',
        B: 'True. Extruding the nucleus frees the largest single volume in the cell, at the price of never dividing again.',
        C: 'True. Losing the mitochondria and ribosomes frees the rest, which is why the mature cell is 33 per cent haemoglobin.',
        D: 'Correct as the question is set. B and C are both true and A is carried with them.',
      },
    },
    {
      key: 'average-number-of-normochromic-rbcs-is-million-mm3-f71a328f',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the average red cell count.',
      explanations: {
        A: '6 million per mm³ is the threshold above which the count is called polycythaemia, not the average.',
        B: 'Correct. About 5 million per mm³ on average — 4.5–5.5 in the male and 4–5 in the female.',
        C: '8 million is well outside any range the book gives, normal or abnormal.',
        D: '7 million is above the polycythaemia threshold. The figure 7.5 belongs to the diameter in micrometres, and confusing the two numbers is what produces this answer.',
      },
    },
    {
      key: 'life-span-of-rbcs-is-534ae95c',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the life span of the red cell.',
      explanations: {
        A: '90 days is short of the mark; no blood cell in this chapter is given that figure.',
        B: '100 days is the round number a student reaches for when the real one will not come, and it is the closest of the three wrong answers.',
        C: 'Correct. About 120 days, after which macrophages in liver, marrow and spleen phagocytose the cell.',
        D: '150 days is beyond the range. The book is specific because the figure is used to calculate how fast the marrow must work.',
      },
    },
    {
      key: 'male-rbcs-number-is-more-than-female-due-to-c95d501c',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the hormone that accounts for the sex difference in the red cell count.',
      explanations: {
        A: 'Oestrogen does not stimulate the marrow; if it did, the female count would be the higher of the two.',
        B: 'An inhibitory effect of oestrogen would also produce a higher male count, which is why this option is the hardest to reject — but the book attributes the difference to what androgen does, not to what oestrogen fails to do.',
        C: 'Correct. Androgen stimulates the bone marrow, which is why the male range is 4.5–5.5 million against the female 4–5 million.',
        D: 'An inhibitory androgen would reverse the observed difference and make the male count the lower one.',
      },
    },
    {
      key: 'polycythemia-is-5a37214a',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Define polycythaemia by what is increased.',
      explanations: {
        A: 'Decreased haemoglobin within the cells is hypochromia, and with a low count it is anaemia. Both are the opposite of this term.',
        B: 'A decreased number of red cells is anaemia — the exact converse, and the answer of a student who has the word without its prefix.',
        C: 'Correct. Polycythaemia is an increase in the number of red cells, above about 6 million per mm³.',
        D: 'Increased cell size is macrocytosis, a change in size rather than in number.',
      },
    },
    {
      key: 'physiological-increase-of-rbcs-in-the-following-except-111c706a',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Separate a physiological rise in the red cell count from a pathological one.',
      explanations: {
        A: 'True, so not the exception. Thin air at altitude is hypoxic, and the marrow answers with more cells in a healthy person.',
        B: 'True, so not the exception. Exercise raises the count physiologically.',
        C: 'True, so not the exception. The count is highest in the newborn and falls gradually afterwards.',
        D: 'The exception, and the answer. Chronic lung disease raises the count by the same hypoxic mechanism, but the hypoxia comes from a diseased lung rather than from thin air, so the polycythaemia is secondary and pathological. The mechanism being identical is exactly what makes this question worth asking.',
      },
    },
    {
      key: 'one-is-true-about-rbcs-d86ae856',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Recognise secondary polycythaemia among three false statements about red cell structure.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. Only D is true: chronic lung disease causes hypoxia, which drives the marrow and raises the red cell count. Azurophilic granules belong to leukocytes, the red cell centre is thinner than the periphery, and the diameter is 6–9 µm rather than 10–12.',
      explanations: {
        A: 'Azurophilic granules are primary lysosomes and belong to the granular leukocytes and to monocytes. The red cell has no granules of any kind.',
        B: 'Reversed. The cell is 0.8 µm thick at the centre and 2.2 µm at the edge, which is why the centre is pale.',
        C: '10–12 µm is the diameter of a neutrophil or a basophil. The red cell is 6–9 µm, and it is used as the ruler against which white cells are measured on a film.',
        D: 'Correct. Chronic lung disease produces hypoxia and hypoxia stimulates the marrow — a secondary polycythaemia.',
      },
    },
    {
      key: 'the-following-is-character-of-the-erythrocytes-c4a7d936',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Pick the correct red cell figure from three that belong to other cells or other words.',
      explanations: {
        A: 'Correct. The average diameter is 7.5 µm.',
        B: '20 days is not the red cell\'s life span; 120 days is. The figure has lost a digit rather than being a different fact.',
        C: '4,000–11,000 per mm³ is the total white cell count. The red cell count is in millions.',
        D: 'A count below 4 million is anaemia, not polycythaemia. The definition is right and the word attached to it is its opposite.',
      },
    },
    {
      key: 'concerning-the-rouleaux-appearance-which-is-false-f674a5cc',
      conceptKey: 'rouleaux-and-the-erythrocyte-sedimentation-rate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the cause of rouleaux as high surface tension.',
      explanations: {
        A: 'True, so not the false one. The cells adhere face to face like a pile of coins.',
        B: 'True, so not the false one. Rouleaux needs slow flow; in normal circulation the cells are kept apart.',
        C: 'True, so not the false one. The book attributes it to the high surface tension produced by the biconcave surface.',
        D: 'The false one, and the answer. It is high surface tension, not low. Options C and D are the same statement with one word changed, so the question is decided entirely on that word.',
      },
    },
    {
      key: 'rolueux-appearance-d1fb6e70',
      conceptKey: 'rouleaux-and-the-erythrocyte-sedimentation-rate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State that rouleaux is reversible and harmless.',
      explanations: {
        A: 'Rouleaux occurs in slow circulation, and the book says explicitly that it is not a feature of normal circulation.',
        B: 'Correct. It is a reversible phenomenon — the cells separate again when the flow speeds up.',
        C: 'It does no damage to the cells at all, which is the other half of what makes it reversible.',
        D: 'It raises the erythrocyte sedimentation rate rather than lowering it: stacked cells are heavier for their surface area and fall faster, which is why the rate rises in inflammation.',
      },
    },
    {
      key: 'rouleaux-appearance-is-characteristic-for-a59a1919',
      conceptKey: 'rouleaux-and-the-erythrocyte-sedimentation-rate',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute rouleaux to the red cell alone.',
      explanations: {
        A: 'Correct. Only red cells form rouleaux, because only they are biconcave discs that can stack face to face.',
        B: 'White cells are rounded and nucleated and do not stack. They also circulate in far smaller numbers.',
        C: 'The monocyte is a white cell, singled out here because it has its own named appearance — frosted glass — which is what the neighbouring question asks about.',
        D: '"None of the above" would be true only if red cells did not form rouleaux, and they are the cells the phenomenon is named for.',
      },
    },
    {
      key: 'regarding-rbcs-8802d891',
      conceptKey: 'rouleaux-and-the-erythrocyte-sedimentation-rate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Find the one true statement among three that each fail on one word.',
      explanations: {
        A: 'Aged red cells are destroyed by macrophages, in the liver, marrow and spleen. Megakaryocytes shed platelets and phagocytose nothing.',
        B: 'A decreased number is anaemia. Polycythaemia is the increase, and the two words are exchanged here.',
        C: 'The cytoskeleton does maintain the shape, but the shape is biconcave, not biconvex. One letter carries the whole error.',
        D: 'Correct. Red cells form rouleaux in slow circulation, reversibly and without damage.',
      },
    },
    {
      key: 'rbcs-are-fragile-so-maintained-in-solution-11b1ac55',
      conceptKey: 'rbc-osmotic-fragility-crenation-and-haemolysis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the tonicity in which red cells keep their shape.',
      explanations: {
        A: 'Correct. Isotonic surroundings — plasma, equivalent to 0.9 per cent saline — leave the cell unchanged.',
        B: 'A hypertonic solution draws water out and crenates the cell.',
        C: 'A hypotonic solution drives water in and bursts the cell, leaving a ghost.',
        D: '"None of the above" would require that no tonicity preserved the cell, which would make transfusion impossible.',
      },
    },
    {
      key: 'rbcs-if-placed-in-hypertonic-solution-it-288c7b44',
      conceptKey: 'rbc-osmotic-fragility-crenation-and-haemolysis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give what a hypertonic solution does to a red cell.',
      explanations: {
        A: 'Remaining unchanged is what an isotonic solution produces.',
        B: 'Correct. Water leaves the cell, which shrinks and develops surface notches — crenation.',
        C: 'Swelling and bursting is the hypotonic result, the exact opposite direction of water movement.',
        D: 'Leakage of haemoglobin and haemolysis is also hypotonic, and is the same event as C described from the haemoglobin\'s point of view. Two of the four options describe the opposite tonicity, which is the trap.',
      },
    },
    {
      key: 'aplastic-anemia-is-caused-by-fdcc213e',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the cause of aplastic anaemia and separate it from the other four.',
      explanations: {
        A: 'Iron deficiency gives microcytic anaemia and B12 deficiency gives pernicious anaemia. Both are deficiencies of a raw material, whereas aplastic anaemia is failure of the factory.',
        B: 'Correct. Aplastic anaemia is depression of the bone marrow — by X-rays, as here, or by drugs.',
        C: 'Acute blood loss removes cells already made and does not stop the marrow making more; the marrow in fact responds by working harder, which is why the reticulocyte count rises.',
        D: 'Spherocytosis and favism are haemolytic anaemias — the cells are made normally in number and destroyed early.',
      },
    },
    {
      key: 'is-low-vit-b12-due-to-failed-production-of-intrinsic-factor-efa543c3',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the anaemia that follows loss of intrinsic factor.',
      explanations: {
        A: 'Aplastic anaemia is marrow depression; the stomach is not involved and every cell line falls, not the red one alone.',
        B: 'Correct. Pernicious anaemia is vitamin B12 deficiency caused by failure of the stomach to make intrinsic factor, without which B12 cannot be absorbed.',
        C: 'Sickle cell anaemia is a mutation in the haemoglobin gene and has nothing to do with any vitamin.',
        D: 'Microcytic anaemia is iron deficiency. The distinction matters clinically: iron deficiency gives small cells, B12 deficiency large ones.',
      },
    },
    {
      key: 'is-abnormal-rigid-type-of-hb-hbs-accumulation-of-hb-at-one-s-eb1f70fe',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the anaemia produced by haemoglobin S.',
      explanations: {
        A: 'Aplastic anaemia produces too few cells of normal shape, not misshapen ones.',
        B: 'Pernicious anaemia produces macrocytes — large cells, still round.',
        C: 'Correct. Haemoglobin S is rigid and gathers at one side of the cell, drawing it into the crescent that names sickle cell anaemia.',
        D: 'Microcytic anaemia produces small pale cells from iron deficiency; the shape is unchanged.',
      },
    },
    {
      key: 'which-statement-typifies-sickle-cell-anemia-2b7e4372',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Locate the defect of sickle cell anaemia in the haemoglobin gene.',
      explanations: {
        A: 'A spherical cell is the spherocyte, and its defect is in spectrin — a membrane protein — not in haemoglobin.',
        B: 'Crenated cells are shrunken cells in a hypertonic solution. That is an osmotic artefact, not a disease.',
        C: 'The mature red cell has no nucleus, so it can have no abnormal one. This is the option that catches students who reach for "genetic disease" and picture a nucleus.',
        D: 'Correct. A mutation in the DNA encoding haemoglobin produces haemoglobin S, and the abnormal haemoglobin deforms the cell.',
      },
    },
    {
      key: 'hereditary-spherocytosis-of-rbcs-is-caused-by-xxx-c787da54',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Trace the spherocyte to a membrane skeleton protein rather than to haemoglobin.',
      explanations: {
        A: 'Haemoglobin S is the sickle cell defect. Both diseases deform the cell, and which molecule is at fault is exactly what separates them.',
        B: 'Haemoglobin reductase keeps haemoglobin able to bind oxygen. Its deficiency would impair gas carriage without changing the shape.',
        C: 'Carbonic anhydrase is the enzyme of carbon dioxide transport. Losing it would affect buffering, not shape.',
        D: 'Correct. A primary defect in the spectrin gene loses the membrane skeleton that holds the biconcavity, and the cell rounds up into a sphere — which is more fragile and is haemolysed early.',
      },
    },
    {
      key: 'regarding-the-reticulocyte-the-following-statement-is-correc-7436ea38',
      conceptKey: 'reticulocyte-is-the-young-red-cell-and-rises-after-haemorrhage',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Describe the reticulocyte\'s staining and reject the leukocyte figures beside it.',
      explanations: {
        A: 'Correct. The cytoplasm is acidophilic, like a mature red cell, with a basophilic reticulum of residual ribosomal RNA that a supravital stain shows up.',
        B: '20 µm is the size of a monocyte, the largest leukocyte. A reticulocyte is the size of the red cell it is about to become, about 7.5 µm.',
        C: 'The cell that rises in allergy is the eosinophil. The reticulocyte rises when the marrow is driven — after haemorrhage or haemolysis.',
        D: '60–70 per cent of the leucocytic count is the neutrophil. The reticulocyte is not a leukocyte at all and is counted as a percentage of red cells.',
      },
    },
    {
      key: 'a-child-arrived-at-the-pediatric-outpatient-clinic-complaini-0be1f21a',
      conceptKey: 'collagen-synthesis-requires-vitamin-c',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Read bleeding gums with non-healing wounds as a collagen failure.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. The stem names a connective tissue disease with bleeding gums, loosening teeth and wounds that will not heal — the triad of scurvy, in which vitamin C deficiency prevents normal collagen synthesis. The other three options are diseases of bone, of platelets and of red cells.',
      explanations: {
        A: 'Osteoporosis is loss of bone mass, from resorption outpacing formation. It presents with fractures, not with bleeding gums, and it does not stop wounds healing.',
        B: 'Purpura is a low platelet count, and it does cause bleeding gums — which makes it the strongest distractor here. What it does not cause is non-healing wounds or loosening teeth, and those are the collagen signs.',
        C: 'Anaemia causes pallor, breathlessness and fatigue. It is a failure to carry oxygen, not a failure of connective tissue, and the stem says the disease is one of connective tissue.',
        D: 'Correct. Scurvy — vitamin C deficiency — leaves the fibroblast unable to make sound collagen, so the periodontal ligament fails, the teeth loosen, the gums bleed and wounds do not close.',
      },
    },
    {
      key: 'basophils-are-characterized-by-91ec1768',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the basophil by its nuclear shape.',
      explanations: {
        A: 'The basophil is 10–12 µm and the red cell 6–9, so the basophil is the larger. Red cells are the ruler on a film, and every leukocyte is bigger than they are.',
        B: 'Azurophil granules alone, with no specific granules, describes no granular leukocyte. The basophil\'s defining granules are its coarse metachromatic specific granules.',
        C: 'Correct. The basophil has an S-shaped nucleus, usually half hidden by the coarse granules lying over it.',
        D: 'Coarse acidophilic granules are the eosinophil\'s. The basophil\'s granules are basophilic and stain metachromatically purple with toluidine blue because of their heparin.',
      },
    },
    {
      key: 'frosted-glass-appearance-is-characteristic-for-66eb96af',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the frosted-glass cytoplasm to the monocyte.',
      explanations: {
        A: 'Red cells have homogeneous haemoglobin and no granularity of any kind.',
        B: '"WBCs" as a class is too broad: the granular leukocytes have visible granules and the lymphocyte a clear rim, and only one white cell earns this description.',
        C: 'Correct. The monocyte\'s pale basophilic cytoplasm is full of fine lysosomes, which give it a ground-glass or frosted-glass look.',
        D: '"None of the above" fails because the appearance is a standard descriptive term for one of the listed cells.',
      },
    },
    {
      key: 'concerning-the-red-bone-marrow-which-statement-is-correct-d17f4a79',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Separate the stroma of red marrow from its free cells and recall the sinusoid\'s discontinuous basement membrane.',
      explanations: {
        A: 'Reticular cells are stromal, not free — they and the reticular fibres are the supporting network the free cells lie in.',
        B: 'Correct. Immature white cells outnumber immature red cells about five to one, because white cells are the shorter-lived and must be replaced faster.',
        C: 'The sinusoid\'s basement membrane is deliberately *not* continuous: the gaps are how a finished blood cell gets out of the marrow and into the blood.',
        D: 'The shaft of a long bone in an adult holds yellow marrow. Red marrow in the adult is in the flat bones and the ends of the long bones.',
      },
    },
    {
      key: 'ratio-of-immature-wbcs-to-immature-rbcs-274d053e',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the ratio of immature white to immature red cells in the marrow, in the right order.',
      explanations: {
        A: '1:5 is the ratio inverted, and it would mean the marrow spent most of its effort on red cells — which is the intuition students bring, since red cells outnumber white ones in the blood a thousand to one.',
        B: 'Correct. About 5:1 in favour of immature white cells, because their life span is days against the red cell\'s 120.',
        C: '4:1 is the right direction and the wrong figure.',
        D: '1:4 is the same wrong figure inverted as well.',
      },
    },
    {
      key: 'one-is-regarded-as-an-endogenous-pigment-5cecd123',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Separate pigments the body makes from pigments it takes in.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. The department book divides pigment inclusions into endogenous — haemoglobin, melanin and lipofuscin — and exogenous — carbon and dust, carotene, tattoo dyes. Only haemoglobin is on the endogenous list.',
      explanations: {
        A: 'Correct. Haemoglobin is made by the body, and it is listed with melanin and lipofuscin among the endogenous pigments.',
        B: 'Carbon is inhaled — the dust of city air and of smoke — and is the classic exogenous pigment.',
        C: 'Carotene comes from food and colours fat and skin. It is made by plants, not by us.',
        D: 'Tattoo dye is introduced through the skin and taken up by macrophages, which is why it stays. Exogenous by the most literal route of all.',
      },
    },
    {
      key: 'which-of-the-following-increases-with-age-a0ac60a7',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the pigment that accumulates as a cell ages.',
      explanations: {
        A: 'Correct. Lipofuscin is the wear-and-tear pigment: the indigestible residue of secondary lysosomes, which builds up in long-lived cells such as neurons and cardiac muscle.',
        B: 'Carotene is dietary and rises or falls with what is eaten, not with age.',
        C: 'Haemoglobin content is set by the marrow and does not accumulate in cells over a lifetime; the red cells carrying it are replaced every 120 days.',
        D: 'Haemosiderin accumulates where there has been bleeding or iron overload, which is a local or a pathological matter rather than a consequence of age.',
      },
    },
    {
      key: 'the-pigment-which-is-responsible-for-the-brown-color-of-brow-6b32ed38',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Trace the colour of brown fat to the mitochondria that make it warm.',
      explanations: {
        A: 'Melanin colours skin, hair and the choroid. No fat cell makes it.',
        B: 'Correct. The cytochrome pigments of the many mitochondria of the multilocular fat cell, together with a rich blood supply, are what make brown fat brown — and the mitochondria are there because the tissue burns fat for heat.',
        C: 'Haemosiderin is an iron-storage pigment left where blood has broken down. It gives a brown colour, which is what makes it plausible here, but not in fat.',
        D: 'Haemoglobin is in the blood within the tissue, and the richer blood supply does contribute to the colour — but the pigment the book names is the cytochrome of the mitochondria.',
      },
    },
    {
      key: 'acharacteristic-ultrastructural-feature-of-rbcs-includes-33915fb0',
      conceptKey: 'rbc-ultrastructure-and-the-spectrin-actin-cytoskeleton',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The worse of two printings of one question: the first word has been read as "Acharacteristic" and three options carry trailing full stops from the previous line, and it has no key. The clean printing at `characteristic-ultrastructural-feature-of-rbcs-includes-0819a81e` has the same four options and is keyed, and is live.',
    },
    {
      key: 'aplastic-anaemia-is-caused-by-1-cdf5f44f',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate with a stray "1" run into the stem and no key. The clean printing at `aplastic-anemia-is-caused-by-fdcc213e` is keyed and live.',
    },
    {
      key: 'hereditary-spherocytosis-of-rbcs-is-caused-by-f3518b13',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B has lost the enzyme it names and reads "Deficiency enzyme, ظ", so one of the four choices is unreadable. The complete printing at `hereditary-spherocytosis-of-rbcs-is-caused-by-xxx-c787da54` is keyed and live.',
    },
    {
      key: 'male-rbcs-no-is-more-than-female-due-to-2e682527',
      conceptKey: 'rbc-count-life-span-and-what-changes-it',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `male-rbcs-number-is-more-than-female-due-to-c95d501c` with the same four options and the same key; only the stem differs, "RBCs no is" against "RBCs number is". The fuller-worded printing is live. Nothing needs rescanning here — the books simply printed the question twice.',
    },
    {
      key: 'rbcs-in-adults-13ef4579',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D has been replaced by "Measurement of bleeding time", which is not an answer to this stem — it has bled in from a platelet question nearby. The parallel printing at `the-rbcs-in-adults-b9684d0a` has an intact option D and is live with a supplied answer.',
    },
    {
      key: 'hemoglobin-is-4350fef8',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived. The key, A for a basic protein, is right — and it is why the red cell is acidophilic — but a three-option question cannot be sat. A rescan recovers the fourth option; the teaching itself is carried by `rbcs-are-c3de41ae`, which is live.',
    },
    {
      key: 'sedimentation-rate-of-rbcs-with-inflammation-19ddc25e',
      conceptKey: 'rouleaux-and-the-erythrocyte-sedimentation-rate',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only — increase, decrease, constant — where the contract is four. The key, A, is right: inflammation promotes rouleaux and stacked cells sediment faster. It is the only sedimentation-rate question in the leaf, so a rescan is worth doing rather than letting the topic go untested.',
    },
    {
      key: 'changes-in-the-osmotic-pressure-of-rbcs-might-result-in-6f74924a',
      conceptKey: 'rbc-osmotic-fragility-crenation-and-haemolysis',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D was lost, leaving three, and of the three that survive only A is true — a cell ghost does follow haemolysis in a hypo-ionic solution — while B and C have crenation and rouleaux attached to the wrong tonicity. A three-option question with one true answer cannot be sat under the four-option contract; a rescan recovers it.',
    },
    {
      key: 'basophils-are-characterized-by-2-smaller-diameter-than-rbcs-f750faee',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and only three options remain. The clean printing at `basophils-are-characterized-by-91ec1768` is keyed and live.',
    },
    {
      key: 'a-patient-was-subjected-to-severe-bleeding-during-a-surgical-3662d3cc',
      conceptKey: 'reticulocyte-is-the-young-red-cell-and-rises-after-haemorrhage',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed its first two options and option D has swallowed the whole of the next question — "Reticulocytes. 1 ا 2. At the emergency unit of Kasr Al Aini hospital, a patient was admitted…". The answer is the reticulocyte, whose percentage rises when the marrow is driven after haemorrhage, and the question is worth recovering: this and its companion printing are the only clinical reticulocyte items in the leaf and both are damaged.',
    },
    {
      key: 'a-patient-was-subjected-to-severe-bleeding-during-a-surgical-05255366',
      conceptKey: 'reticulocyte-is-the-young-red-cell-and-rises-after-haemorrhage',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The other printing of the same question, and no better: the stem breaks off mid-word at "surgical operati" and option C has been reduced to "PI 3", which should read "Platelets". Both copies need the page rescanned.',
    },
    {
      key: 'abnormal-type-of-hemoglobin-hbs-primary-defect-in-actin-gene-d4b92a4a',
      conceptKey: 'anaemias-by-cause-and-the-cell-each-produces',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two questions have collided into one row. The stem is built from the options of a sickle cell question — "Abnormal type of hemoglobin (HbS) بط Primary defect in actin gene expression" — and then carries the whole of a third question about a newborn with sickle cell disease, while the four options belong to a different question altogether and list bronchial asthma, typhoid fever, leukaemia and drug hypersensitivity. Nothing here can be answered as printed; the page needs rescanning and will yield two or three separate questions.',
    },
    {
      key: 'concerning-the-previous-disease-the-following-occurs-05b191c7',
      conceptKey: 'collagen-synthesis-requires-vitamin-c',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem refers to "the previous disease" and the row does not contain it. This is a follow-on question printed beneath a case that the extraction filed as a separate row, so a student sitting it alone has nothing to reason from. This is a reviewer\'s problem rather than a scanner\'s: rescanning the page will not join the two rows, and someone has to decide whether to fold the case into the stem or drop the item. The intended case is almost certainly the scurvy one, since option B names defective collagen synthesis.',
    },
    {
      key: 'the-etiology-of-the-disease-in-the-previous-case-could-be-ec246534',
      conceptKey: 'collagen-synthesis-requires-vitamin-c',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same defect: the stem asks about "the previous case" and no case is in the row. Option B, deficiency in vitamin C, indicates that the case was the scurvy one now standing alone at `a-child-arrived-at-the-pediatric-outpatient-clinic-complaini-0be1f21a`, which is live. Joining them is an editorial decision, not a rescan.',
    },
  ],
}
