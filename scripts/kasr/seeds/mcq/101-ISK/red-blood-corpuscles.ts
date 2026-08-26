/**
 * `101 ISK > Histology > Blood > Red Blood Corpuscles` — the question books' MCQs.
 *
 * Sixty-one rows, and unlike most leaves in this module it really is about
 * what its name says: forty-two of the rows are the red corpuscle itself. The
 * department's chapter is three pages and it is almost entirely numbers and
 * comparisons — 6–9 µm with an average of 7.5, a pale centre a third of the
 * diameter across, 5 million per cubic millimetre, 120 days, anaemia below
 * four million and polycythaemia above six — and the books ask down that list.
 *
 * The chapter also prints one table the examiners clearly like: "Adaptation of
 * RBCs To Perform Their Functions", three rows of plasmalemma, shape and
 * content against what each contributes. Seven questions in this leaf are that
 * table asked seven ways, which is why `red-corpuscle-adaptation-to-gas-transport`
 * carries more of this file than any other concept.
 *
 * `erythrocyte-identification-blood-film` and `reticulocyte-supravital-identification`
 * are not minted here. They already exist in the practical batch, written for
 * slide identification, and they say exactly what these MCQs ask in words — a
 * non-nucleated acidophilic disc with a central pallor of about a third, and a
 * reticulocyte whose reticulum exists only in a supravital preparation. Their
 * definitions are copied verbatim so that re-emitting them changes nothing but
 * their exam signal. `red-bone-marrow-stroma-and-free-cells` from
 * `haemopoiesis.ts`, `basophil-granule-contents-and-anaphylaxis` and
 * `monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage` from the
 * leukocyte leaves, and `organelles-inclusions-and-the-membranous-classification`
 * from `cytoplasm.ts` are reused the same way, for the seven rows that were
 * filed here because a red corpuscle happened to be one of their options.
 *
 * One answer contradicts the department book and is overridden with the
 * disagreement written down: `top-view-of-rbcs-is-while-side-view-is-0b40375f`
 * is keyed "oval, biconvex", and the book's own figure on page 26 is captioned
 * "Top view and Side view of the RBC" showing rounded and biconcave. Nothing
 * else in this leaf conflicts with the book; the other eight overrides are all
 * rows the source printed no key for.
 *
 * Fourteen rows are excluded. Four lost options below the four the contract
 * requires; five are damaged twins of clean rows kept here; three are follow-on
 * stems whose case did not come with them; one is a matching exercise the
 * extractor read as a stem; and one — the severe-bleeding vignette — arrived in
 * two copies, one with an option reading "PI 3" and one with the next question
 * printed inside its last option, so the reticulocyte question that vignette
 * asks survives only in the concept.
 *
 * Two rows from the sat end-of-module papers are added at the end and both are
 * excluded, which makes this the only leaf in the batch where the papers yielded no
 * sittable question at all. Both are ringed scripts: the brilliant cresyl blue row
 * has "Reticulocytes" merged into the neutrophil option, and the leptin row has no
 * options left. The department book answers both, and both name the page to
 * rescan.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Red Blood Corpuscles',
  modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
  articleId: 'ART-101-HIS-RED-BLOOD-CORPUSCLES',

  concepts: [
    {
      key: 'erythrocyte-identification-blood-film',
      label: 'An erythrocyte is identified by being non-nucleated, acidophilic and centrally pale',
      definition:
        'On a Leishman-stained film the erythrocyte is a rounded non-nucleated acidophilic disc about 7.5 micrometres across, with a central pallor of about one third of its diameter produced by its biconcavity. A crenated cell is the same cell shrunken in a hypertonic medium and shows notches at its edge.',
      objective:
        'Identify an erythrocyte in a blood film, give the character the answer page asks for, and tell a normal cell from a crenated one on the same plate.',
      pitfall:
        'Calling the central pallor a nucleus or a vacuole. It is thinning, not a hole; the mature red cell has no nucleus at all, which is the character the examiner is asking for.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04', 'SYS-HEM-T01-S01-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structural_description',
      aliases: ['Central pallor', 'Crenation', 'Normochromic'],
    },
    {
      key: 'red-corpuscle-count-life-span-and-polycythaemia',
      label: 'The red corpuscle count is five million, the life span a hundred and twenty days, and both anaemia and polycythaemia are defined by crossing a number',
      definition:
        'The average red corpuscle count is 5 million per cubic millimetre: 4.5–5.5 million in the adult male and 4–5 million in the adult female, the difference being the stimulating effect of the male hormones on the bone marrow. The count is highest in the newborn and falls gradually. The cell lives about 120 days and is then phagocytosed by macrophages in liver, spleen and bone marrow, its pigment excreted as bile pigment and its iron reused. Below 4 million per cubic millimetre, or with a low haemoglobin concentration, is anaemia; above 6 million is polycythaemia, which the book divides into physiological — high altitude, muscular exercise, the newborn — and pathological, in chronic lung and heart disease. Both are the body answering hypoxia by driving the marrow.',
      objective:
        'Give the normal red corpuscle count and life span, and say what number and what cause define anaemia and each kind of polycythaemia.',
      pitfall:
        'Calling chronic lung disease a physiological polycythaemia because the mechanism is the same. The book divides them by whether the hypoxia is normal for the situation — a mountain, exercise, being newly born — or the result of disease.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S02-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'classification',
      aliases: ['Polycythaemia', 'Anaemia', 'Oligocythaemia', 'RBC count'],
    },
    {
      key: 'red-corpuscle-adaptation-to-gas-transport',
      label: 'Everything a red corpuscle lacks and everything it is shaped like exists to carry more gas',
      definition:
        'The department book prints the red corpuscle\'s adaptations as three rows: plasmalemma, shape and content. The plasmalemma is flexible, so the cell squeezes through capillaries narrower than itself, and it is lipoprotein and therefore highly selective, letting the gases across while keeping the haemoglobin in. The shape is a biconcave disc with rounded edges, which gives a large surface area for the volume and lets the cell pass easily through branched vessels. The content is the third adaptation and it works by subtraction: there is no nucleus and there are no organelles — by electron microscopy the cell membrane is the only structure left — so the whole interior is free for haemoglobin, and the cell cannot divide and cannot repair itself, which is why it lasts only 120 days. It keeps enzymes: haemoglobin reductase to hold the iron in the state that binds oxygen, and carbonic anhydrase to carry carbon dioxide.',
      objective:
        'Give the three adaptations of the red corpuscle to gas transport and say what each one buys and what it costs.',
      pitfall:
        'Answering that a small nucleus leaves room for haemoglobin. There is no nucleus at all in the mature cell, and every "except" question in this leaf uses a small or a heterochromatic nucleus as its false option.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Biconcave disc', 'Haemoglobin reductase', 'Carbonic anhydrase'],
    },
    {
      key: 'red-corpuscle-membrane-carries-blood-groups-outside-and-a-cytoskeleton-inside',
      label: 'The red corpuscle membrane does two different jobs on its two faces: antigens outside, a spectrin and actin cytoskeleton inside',
      definition:
        'The outer surface of the red corpuscle\'s plasma membrane carries its glycocalyx, and the carbohydrate of that coat is where the antigenic sites of the ABO blood groups and of the Rh factor sit — so blood grouping is a property of the outside of the membrane. Beneath the inner surface lies a cytoskeleton of peripheral proteins, spectrin and actin, which maintains the biconcave shape and gives the membrane its elasticity and stability under the repeated deformation of passing through capillaries. Hereditary spherocytosis is the disease of that cytoskeleton: a primary defect in spectrin gene expression, so the cell rounds up into a sphere, loses its deformability and is destroyed early.',
      objective:
        'Say what the outer and the inner surfaces of the red corpuscle membrane each carry, and name the protein whose gene defect causes hereditary spherocytosis.',
      pitfall:
        'Crediting the cytoskeleton with the blood groups, or the coat with the shape. The two faces of one membrane do two unrelated jobs, and every question in this pair is built on swapping them.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T02-S02-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Spectrin', 'Glycocalyx', 'Hereditary spherocytosis', 'ABO antigens'],
    },
    {
      key: 'rouleaux-is-reversible-adhesion-that-raises-the-esr',
      label: 'Rouleaux is red corpuscles stacking like coins in slow circulation — reversible, harmless, and the reason the sedimentation rate rises',
      definition:
        'Rouleaux is the adhesion of red corpuscles to one another in piles resembling stacks of coins. It happens in slow circulation, not in normal flow, and its cause is the surface tension of the biconcave surfaces meeting face to face. It is reversible and does no damage to the cells. Its consequence is measurable: long chains of corpuscles sediment faster than single cells, so rouleaux raises the erythrocyte sedimentation rate, which is why the ESR rises non-specifically in inflammation.',
      objective:
        'Define rouleaux, give the circulatory condition it occurs in and its cause, and connect it to the erythrocyte sedimentation rate.',
      pitfall:
        'Reading rouleaux as damage. The cells are stuck together, not injured; the adhesion undoes itself when flow speeds up, and no haemolysis occurs.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S02-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Rouleaux', 'ESR', 'Erythrocyte sedimentation rate'],
    },
    {
      key: 'red-corpuscle-osmotic-fragility-crenation-and-haemolysis',
      label: 'A red corpuscle keeps its shape only in an isotonic medium; it crenates in a hypertonic one and bursts in a hypotonic one',
      definition:
        'The red corpuscle is fragile, and it holds its normal shape only in the isotonic plasma that surrounds it, whose osmotic pressure equals that of 0.9% saline. Put in a hypertonic solution it loses water, shrinks and shows notches at its edge — crenation. Put in a hypotonic solution it takes water in, swells, bursts and leaks its haemoglobin out; what is left behind is the empty membrane, the cell ghost. That is why anything infused into a vein has to be isotonic, and why osmotic fragility is measured as the concentration of saline at which the cells begin to lyse.',
      objective:
        'Predict what happens to a red corpuscle in an isotonic, a hypertonic and a hypotonic medium, and name the appearance each produces.',
      pitfall:
        'Swapping the two words. Hypertonic is the concentrated medium and it shrinks the cell; hypotonic is the dilute one and it bursts it — and a question offering "crenation in hypotonic solution" is exactly this swap.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T02-S02-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structure_function_relationship',
      aliases: ['Crenation', 'Cell ghost', 'Haemolysis', 'Osmotic fragility'],
    },
    {
      key: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      label: 'The three anaemias this chapter names fail at three different points: the marrow, the vitamin, and the haemoglobin molecule',
      definition:
        'The department book names three anaemias. Aplastic anaemia is destruction or depression of the bone marrow by irradiation or chemotherapy, so every line fails at once — a pancytopenia. Pernicious anaemia is a deficiency of vitamin B12 caused by the stomach\'s failure to produce intrinsic factor, without which the vitamin cannot be absorbed. Sickle cell anaemia is an abnormal, rigid haemoglobin, HbS, arising from a mutation in the DNA that encodes the globin chain; the haemoglobin piles up at one side of the cell and pulls it into a crescent, and the rigid abnormal cell is fragile and haemolyses. Each is named for where the failure is, not for what the blood film shows.',
      objective: 'Name the cause of aplastic, pernicious and sickle cell anaemia and place each failure at its own step.',
      pitfall:
        'Attributing sickling to an abnormal nucleus or an abnormal membrane protein. The mature red cell has no nucleus, and the defect is in the haemoglobin gene — spectrin is the membrane protein, and its defect gives spherocytosis, not sickling.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T02-S03-M01', 'SYS-HEM-T02-S02-M03'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'clinical_correlation',
      aliases: ['Aplastic anaemia', 'Pernicious anaemia', 'Sickle cell anaemia', 'HbS', 'Intrinsic factor'],
    },
    {
      key: 'blood-is-a-connective-tissue-of-cells-in-a-fluid-matrix',
      label: 'Blood is a connective tissue whose matrix is fluid, and its formed elements are the red corpuscles, the leukocytes and the platelets',
      definition:
        'Blood is a special type of connective tissue circulating inside blood vessels, made of cells and an extracellular fluid matrix called plasma — 45% cells and 55% plasma. Its formed elements are three: the erythrocytes or red blood corpuscles, the leukocytes or white blood cells, and the thrombocytes or platelets. The book adds that the red corpuscle and the platelet are not true cells, the one having lost its nucleus and the other never having been more than a fragment of a megakaryocyte. Blood is examined as a film — a drop spread on a slide, air-dried and stained with a neutral stain such as Leishman\'s.',
      objective: 'Name the three formed elements of blood and say what makes blood a connective tissue.',
      pitfall:
        'Excluding platelets because they are not cells. They are one of the three formed elements all the same, and the book says so in the same sentence in which it denies them cellhood.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S02-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'classification',
      aliases: ['Formed elements', 'Plasma', 'Blood film'],
    },
    {
      key: 'reticulocyte-supravital-identification',
      label: 'A reticulocyte is only seen in a supravital preparation, where cresyl blue precipitates its ribosomal remnants as a reticulum',
      definition:
        'The reticulocyte is the last stage before the mature red cell. It is acidophilic like a red cell but still holds remnants of ribosomes and polysomes; these are precipitated into a visible blue network only by a supravital stain such as cresyl blue, applied to living cells. Reticulocytes do not exceed one per cent of the cells in peripheral blood.',
      objective:
        'State that a slide is a supravital preparation, name cresyl blue as the stain and say that it is supravital, and identify the marked reticulocyte.',
      pitfall:
        'Answering "Leishman". Leishman\'s is applied to a fixed dried film and shows no reticulum at all; the whole point of this plate is that the reticulum exists only while the cell is alive.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04', 'SYS-HEM-T01-S01-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structural_description',
      aliases: ['Reticulocyte', 'Cresyl blue'],
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
      key: 'basophil-granule-contents-and-anaphylaxis',
      label: 'The basophil holds histamine and heparin, carries IgE receptors, and its histamine release is anaphylaxis',
      definition:
        'Basophils are 0–1% of the count, 10–12 µm, with an irregular segmented S-shaped nucleus obscured by coarse granules that stain metachromatically purple with toluidine blue because of their heparin. The specific granules are large, rounded and electron dense, holding histamine, heparin, eosinophil chemotactic factor and leukotrienes, and the cell membrane carries receptors for IgE. Heparin prevents clotting and promotes allergy; histamine causes vasodilatation with a sudden drop in blood pressure — anaphylaxis; leukotrienes cause bronchospasm and bronchial asthma. Basophilia is above 2%.',
      objective:
        'List what the basophil granule contains, and connect each substance to the clinical event it produces.',
      pitfall:
        'Calling the basophil a mast cell. Both stain metachromatically, both hold histamine and heparin and both carry IgE receptors — the book compares them directly — but they differ in life span, size, nuclear shape and phagocytic ability, and the mast cell is 20–30 µm against the basophil’s 10–12.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Basophil granules', 'Anaphylaxis', 'Basophilia'],
      conflicts: [
        'The recovered key for the 2022 end-of-module paper resolves its question 40 — which white blood cells contain histamine and heparin — to Eosinophils, while the department book gives histamine and heparin to the basophil and the mast cell and gives the eosinophil histaminase and sulphatase, which destroy them. The disagreement is recorded rather than resolved. The evidence in `eom-answers.json` points at the extraction rather than at either source: only three of the four option boxes were found on that page, the option that was lost is Basophils, and the candidate\'s highlight overlaps the box the key names by 13% of its area. The row is excluded in `microtechniques.ts` with the same note.',
      ],
    },
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
      definition: 'White adipose connective tissue is made of unilocular fat cells and is white because it is poorly vascularised and its droplets hold carotenoids; it is affected by diet and by hormones, lies under the skin and around organs, and stores fat. Brown adipose connective tissue is made of multilocular fat cells and is brown from its richer blood supply and the cytochrome pigments of its many mitochondria; it is affected by hormones but not by diet, is abundant in fetal life and in the newborn, is lost during childhood and replaced by white fat, and performs thermogenesis — burning fat to release heat through the thermogenin of its mitochondria.',
      objective: 'Contrast white and brown adipose tissue by fat cell type, colour, age distribution and function.',
      pitfall: 'Attributing thermogenesis to white fat because it insulates. Insulating against heat loss and generating heat are different jobs and belong to different tissues.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'scurvy-is-defective-collagen-synthesis',
      label: 'Bleeding gums, falling teeth and wounds that will not heal are collagen failing, and the cause is vitamin C deficiency',
      definition:
        'The department book states that vitamin C deficiency — scurvy — is due to defective collagen synthesis, and that it presents with unhealed wounds and bleeding gums. Collagen is the fibre of repair: the fibroblast becomes active in injury and lays it down, so when it cannot be made properly the wound stays open and the tissue holding teeth and vessel walls together fails. The book names one other collagen disorder in the same place, keloid, where healing goes the other way and collagen is deposited to excess in a skin scar.',
      objective: 'Recognise the clinical picture of defective collagen synthesis and name the vitamin whose deficiency causes it.',
      pitfall:
        'Reaching for elastin or reticulin because the presentation is bleeding. It is the collagen of the vessel wall and the gum that has failed; elastic and reticular fibres are unaffected in scurvy.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'clinical_correlation',
      aliases: ['Scurvy', 'Vitamin C deficiency', 'Keloid'],
    },
  ],

  questions: [
    // ---- light-microscopic identification -----------------------------------
    {
      key: 'normal-rbcs-are-b189c01b',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Give the shape of the normal red corpuscle and say whether it has a nucleus.',
      explanations: {
        A: 'Oval red cells — ovalocytes — are one of the abnormal shapes the book lists, alongside spherocytes, sickle cells and poikilocytes.',
        B: 'The shape is right and the nucleus is not. The mature mammalian red corpuscle has extruded its nucleus, and that is what leaves room for haemoglobin.',
        C: 'Correct. Non-nucleated biconcave discs — the two facts that between them define the cell.',
        D: 'Biconvex is the reverse curvature, and it would reduce the surface area for the volume rather than increasing it.',
      },
    },
    {
      key: 'rbcs-are-c3de41ae',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Easy', questionType: 'Staining',
      learningObjective: 'Say how a red corpuscle stains and why.',
      explanations: {
        A: 'Basophilic cytoplasm means RNA, and the mature red corpuscle has none — that is what the reticulocyte lost on its way to becoming one.',
        B: 'No special stain is needed: the routine Leishman\'s film shows the cell perfectly. A special stain is needed for the reticulocyte, which is a different cell.',
        C: 'Correct. Haemoglobin is a basic protein, so it binds the acidic dye eosin, and the corpuscle is acidophilic.',
        D: '"All the above" cannot hold when A and C are opposites.',
      },
    },
    {
      key: 'light-microscopic-features-of-red-blood-corpuscles-include-3f0788e4',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Pick the true light-microscopic feature of the red corpuscle.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. B is the department book\'s own account — the corpuscle is acidophilic because haemoglobin is a basic protein — and each of the other three contradicts the book: normal corpuscles are uniform in size (variation is anisocytosis, an abnormality), they have no nuclei, and the centre is pale rather than dark.',
      explanations: {
        A: 'Variation in size is anisocytosis, and the book lists it among the abnormalities of size along with microcytes and macrocytes. A normal film is uniform.',
        B: 'Correct. The cell is acidophilic, because haemoglobin is a basic protein and binds the acidic dye.',
        C: 'The mature red corpuscle has no nucleus. A nucleated red cell in peripheral blood is a pathological finding.',
        D: 'The exact inversion of the finding: the centre is pale, not dark, because the biconcavity thins it and it holds less haemoglobin.',
      },
    },
    {
      key: 'central-pallor-in-rbcs-is-the-5b049397',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Moderate', questionType: 'Recall of a number',
      learningObjective: 'Give the size of the central pallor as a fraction of the cell.',
      explanations: {
        A: 'Correct, and keyed. The pale centre is about one third of the diameter, which is the figure the book gives and the one a normochromic film is judged against.',
        B: 'A half would be a much paler cell than normal, and increased central pallor of that degree is what hypochromia means.',
        C: 'Two thirds would leave only a thin rim of haemoglobin — a severely hypochromic cell.',
        D: 'A quarter understates it, and would make a normal cell look denser than it is.',
      },
    },
    {
      key: 'top-view-of-rbcs-is-while-side-view-is-0b40375f',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Give the outline of a red corpuscle seen face on and seen edge on.',
      answerOverride: 'B',
      answerOverrideReason:
        'The bank carries C — "oval, biconvex" — and both halves of it contradict the department book, whose figure on page 26 is captioned "Top view and Side view of the RBC" and whose text reads "rounded in top view, biconcave in side view to increase surface area for gas exchange". Oval is an abnormal shape (the ovalocyte) and biconvex is the opposite curvature to the one that gives the cell its surface area. B states the book\'s own pair.',
      explanations: {
        A: 'The two halves are the right words in the wrong order. Biconcavity is what is seen from the side; from above the cell is a disc.',
        B: 'Correct on the department book\'s own figure: rounded seen face on, biconcave seen edge on.',
        C: 'The answer the page carries, and the reason for this override. Oval is the ovalocyte, an abnormal shape, and biconvex is the curvature the cell does not have.',
        D: 'Biconvex again, and a cylinder is no shape a red corpuscle takes in any view.',
      },
    },
    {
      key: 'the-following-statements-concerning-erythrocytes-are-true-ex-4e0becc2',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the false statement about the erythrocyte from three true ones.',
      explanations: {
        A: 'True. Rounded, biconcave and non-nucleated is the standard description.',
        B: 'True. The book gives the diameter as 6–9 µm, with an average of 7.5.',
        C: 'True. The colour is haemoglobin, and it is why the cell is acidophilic.',
        D: 'Correct, and the exception. The mature red corpuscle is the least active cell in the body: no nucleus, no organelles, no division and no protein synthesis — it is a bag of haemoglobin with a membrane.',
      },
    },
    {
      key: 'the-following-are-characters-of-rbcs-except-c4334b47',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Separate what the red corpuscle does from what the leukocytes do.',
      explanations: {
        A: 'True. The average diameter is 7.5 µm.',
        B: 'Correct, and the exception. Immunity is the leukocyte\'s work. The red corpuscle carries gases and buffers acid, and it has neither the organelles nor the receptors for a defensive role.',
        C: 'True, and the shape is what gives the cell its surface area.',
        D: 'True. Rouleaux is the reversible stacking that occurs in slow circulation.',
      },
    },
    {
      key: 'the-rbcs-in-adults-b9684d0a',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the adult red corpuscle.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. A is the department book\'s own description; the other three each contradict it, since the life span is about 120 days rather than three weeks, the mature cell is non-nucleated, and the oxygen-binding pigment of the red corpuscle is haemoglobin — myoglobin belongs to muscle.',
      explanations: {
        A: 'Correct. Flexible biconcave discs: the flexibility lets them through the capillaries and the biconcavity gives them their surface area.',
        B: 'Three weeks is far short. The life span is about 120 days, after which macrophages in liver, spleen and marrow destroy them.',
        C: 'The mature adult red corpuscle has no nucleus. Nucleated red cells belong to the developing stages in the marrow.',
        D: 'Myoglobin is the oxygen-binding pigment of muscle. The red corpuscle carries haemoglobin, and the two are confused because both bind oxygen and both are red.',
      },
    },
    {
      key: 'the-following-is-character-of-the-erythrocytes-c4a7d936',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Moderate', questionType: 'Recall of a number',
      learningObjective: 'Pick the correct one of the red corpuscle\'s four standard numbers.',
      explanations: {
        A: 'Correct. The average diameter is 7.5 µm, within a range of 6 to 9.',
        B: 'Twenty days is a leukocyte kind of figure. The red corpuscle lasts about 120 days.',
        C: '4000–11000 per cubic millimetre is the total leukocytic count, misprinted here as a range starting at 400. The red corpuscle count is in millions.',
        D: 'Below four million is anaemia, not polycythaemia. Polycythaemia is above six million, and this option swaps the two.',
      },
    },
    {
      key: 'the-average-size-of-rbcs-2ce25ed7',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Easy', questionType: 'Recall of a number',
      learningObjective: 'Give the red corpuscle\'s diameter in the correct unit.',
      explanations: {
        A: 'Correct, and the only option in a plausible unit. The department book gives 7.5 µm as the average within a 6–9 µm range, so the printed 7.0 is a rounding of it; what this question is really testing is the micrometre.',
        B: 'Nanometres would make the cell smaller than a mitochondrion and far below the resolution of the light microscope that routinely shows it.',
        C: 'Millimetres would make a red corpuscle visible to the naked eye.',
        D: '0.7 cm is seven millimetres — the size of a small bead.',
      },
    },
    {
      key: 'blood-elements-are-fe21544d',
      conceptKey: 'blood-is-a-connective-tissue-of-cells-in-a-fluid-matrix',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the formed elements of blood.',
      explanations: {
        A: 'True on its own. Erythrocytes are the most numerous of the three.',
        B: 'True on its own. Leukocytes are the nucleated cells of blood.',
        C: 'True on its own. Thrombocytes — platelets — are the third element, even though the book says they are not true cells.',
        D: 'Correct. All three are formed elements of blood, suspended in the fluid matrix that is plasma.',
      },
    },

    // ---- adaptation to gas transport ---------------------------------------
    {
      key: 'characteristic-ultrastructural-feature-of-rbcs-includes-0819a81e',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Ultrastructure',
      learningObjective: 'Say what an electron microscope finds inside a mature red corpuscle.',
      explanations: {
        A: 'Well-developed rough endoplasmic reticulum belongs to a protein-forming cell. The red corpuscle makes no protein at all.',
        B: 'A heterochromatic nucleus is the small lymphocyte\'s. The mature red corpuscle has no nucleus of any kind.',
        C: 'Correct. The cell membrane is the only membranous structure left; everything inside is homogeneous electron-dense haemoglobin.',
        D: 'A euchromatic nucleus is the active, protein-forming kind — twice wrong for a cell with no nucleus and no synthesis.',
      },
    },
    {
      key: 'all-characters-of-rbcs-except-5c3f2534',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the false statement in the book\'s adaptation table.',
      explanations: {
        A: 'True. The flexible plasmalemma lets the cell squeeze through a capillary narrower than itself.',
        B: 'True. The lipoprotein membrane is highly selective, admitting the gases and holding the haemoglobin in.',
        C: 'True. Rounded edges are what let it pass easily through branched vessels.',
        D: 'Correct, and the exception. The biconcave shape exists precisely to give a large surface area for the volume; a low surface area would defeat the whole design.',
      },
    },
    {
      key: 'the-followings-concerning-rbc-adaptation-to-its-function-ecx-28cc4a27',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the false adaptation, where the falsehood is the presence of a nucleus.',
      explanations: {
        A: 'True. The biconcave shape gives a large surface area for gas exchange.',
        B: 'True. The membrane is lipoprotein and therefore highly selective.',
        C: 'True. Its elasticity lets the cell through capillaries narrower than itself.',
        D: 'Correct, and the exception, on one word. There is no nucleus at all, small or otherwise; the space for haemoglobin comes from having lost it entirely.',
      },
    },
    {
      key: 'which-of-the-following-gives-more-space-for-hb-24cadb0f',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name everything about the red corpuscle that makes room for haemoglobin.',
      explanations: {
        A: 'True on its own. The biconcave shape distributes the same volume over a larger surface, which is part of the same design.',
        B: 'True on its own. Losing the nucleus frees the largest single volume in the cell.',
        C: 'True on its own. Losing the organelles frees the rest.',
        D: 'Correct. All three contribute, and together they are the "content" row of the book\'s adaptation table.',
      },
    },
    {
      key: 'plasmalemma-or-rbcs-is-adapted-for-gas-exchange-due-to-high-971d6993',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the property of the red corpuscle membrane that makes it selective for gases.',
      explanations: {
        A: 'Myoglobin is muscle\'s oxygen store and is not a membrane component of anything.',
        B: 'Cholesterol does sit among the fatty acid tails and stabilise the membrane, but the book attributes the selectivity for gas exchange to the membrane\'s lipoprotein nature.',
        C: 'The carbohydrate of the outer coat carries the blood group antigens. It is on one face only and has nothing to do with letting gases across.',
        D: 'Correct. The plasmalemma is lipoprotein and therefore highly selective — permeable to the gases and not to the haemoglobin.',
      },
    },
    {
      key: 'function-of-rbcs-is-4c5c0e37',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name what the red corpuscle does, and what it does not.',
      explanations: {
        A: 'True on its own. Carrying oxygen and carbon dioxide is the cell\'s main work.',
        B: 'True on its own. Haemoglobin and the carbonic anhydrase inside the cell make it an acid–base buffer.',
        C: 'Phagocytosis needs lysosomes and a cytoskeleton capable of pseudopodia. The red corpuscle has neither.',
        D: 'Correct. Gas transport and buffering are both red corpuscle functions; phagocytosis is the leukocyte\'s.',
      },
    },
    {
      key: 'adaptations-of-rbcs-to-function-include-3fe7baaf',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Match each adaptation to the property it actually derives from.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The department book pairs each adaptation with its own property: the flexible membrane is what lets the cell squeeze through narrow capillaries, the lipoprotein membrane is what makes it selective for gas exchange, the rounded edges are what ease passage through branched vessels, and the biconcave shape is what gives the surface area. Options B, C and D each keep the right pairs but exchange their halves; only A pairs a property with the consequence the book gives it.',
      explanations: {
        A: 'Correct. Flexibility is what squeezing through a narrow capillary needs, and the book attributes it to the plasmalemma in exactly those words.',
        B: 'The right property attached to the wrong consequence. Being lipoprotein is what makes the membrane selective for gases; being flexible is what lets it squeeze.',
        C: 'Swapped the other way. Rounded edges ease passage through branched vessels; it is the biconcave surface that serves gas exchange.',
        D: 'And swapped again: the biconcave surface gives surface area for gas exchange, while the rounded edges are what the book credits with passage through branched vessels.',
      },
    },

    // ---- the two faces of the membrane -------------------------------------
    {
      key: 'the-outer-surface-of-cell-membrane-of-rbcs-is-responsible-fo-9d643339',
      conceptKey: 'red-corpuscle-membrane-carries-blood-groups-outside-and-a-cytoskeleton-inside',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Say what the outer surface of the red corpuscle membrane carries.',
      explanations: {
        A: 'Correct. The glycocalyx on the outer surface carries the antigenic sites of the ABO groups and the Rh factor.',
        B: 'Shape is maintained from the inside, by the spectrin and actin cytoskeleton beneath the membrane.',
        C: 'Colour is haemoglobin, in the cytoplasm, and has nothing to do with either face of the membrane.',
        D: '"All of the above" fails because two of the three belong elsewhere — which is the point of asking the question by surface.',
      },
    },
    {
      key: 'the-spectrin-actin-at-inner-surface-of-cell-membrane-of-rbcs-3f1e4309',
      conceptKey: 'red-corpuscle-membrane-carries-blood-groups-outside-and-a-cytoskeleton-inside',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Say what the cytoskeleton beneath the red corpuscle membrane does.',
      explanations: {
        A: 'Blood grouping is a property of the outer surface, the carbohydrate coat, not of the proteins beneath the inner one.',
        B: 'Correct. Spectrin and actin maintain the biconcave shape and give the membrane the elasticity and stability it needs to be deformed thousands of times.',
        C: 'Colour is haemoglobin.',
        D: '"All of the above" would require the cytoskeleton to do the coat\'s job as well.',
      },
    },
    {
      key: 'keep-shape-stability-of-cm-of-rbcs-4b181c0a',
      conceptKey: 'red-corpuscle-membrane-carries-blood-groups-outside-and-a-cytoskeleton-inside',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name both proteins of the red corpuscle cytoskeleton.',
      explanations: {
        A: 'True on its own. Actin is one of the two.',
        B: 'True on its own. Spectrin is the other, and it is the one whose gene defect causes spherocytosis.',
        C: 'Myosin is the motor protein of muscle contraction and of the pericyte; the red corpuscle needs no motor, only a scaffold.',
        D: 'Correct. Actin and spectrin together are the peripheral protein network beneath the inner surface.',
      },
    },
    {
      key: 'hereditary-spherocytosis-of-rbcs-is-caused-by-xxx-c787da54',
      conceptKey: 'red-corpuscle-membrane-carries-blood-groups-outside-and-a-cytoskeleton-inside',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the protein whose gene defect gives hereditary spherocytosis.',
      explanations: {
        A: 'HbS is sickle cell anaemia — a haemoglobin defect that makes a crescent, not a sphere.',
        B: 'Haemoglobin reductase deficiency affects the oxidation state of the iron, not the shape of the cell.',
        C: 'Carbonic anhydrase carries carbon dioxide; losing it would impair gas transport, not deform the membrane.',
        D: 'Correct. A primary defect in spectrin gene expression leaves the cytoskeleton unable to hold the biconcavity, so the cell rounds up into a sphere and is destroyed early.',
      },
    },

    // ---- rouleaux ----------------------------------------------------------
    {
      key: 'rouleaux-appearance-is-characteristic-for-a59a1919',
      conceptKey: 'rouleaux-is-reversible-adhesion-that-raises-the-esr',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Name the blood cell that forms rouleaux.',
      explanations: {
        A: 'Correct. Only red corpuscles stack like coins, and the reason is their biconcave surfaces meeting face to face.',
        B: 'Leukocytes are irregular nucleated cells and do not stack.',
        C: 'The monocyte is a leukocyte and does not stack either; it is offered separately here because its frosted-glass cytoplasm is asked about in the row beside this one.',
        D: '"None of the above" cannot stand when the red corpuscle is on the list.',
      },
    },
    {
      key: 'concerning-the-rouleaux-appearance-which-is-false-f674a5cc',
      conceptKey: 'rouleaux-is-reversible-adhesion-that-raises-the-esr',
      difficulty: 'Hard', questionType: 'Negative stem',
      learningObjective: 'Give the cause of rouleaux and reject the inverted version of it.',
      explanations: {
        A: 'True. Rouleaux is adhesion of the corpuscles to each other.',
        B: 'True. It occurs in slow circulation, not in normal flow.',
        C: 'True, and the book\'s own explanation: the surface tension of the biconcave surfaces is what makes them stick.',
        D: 'Correct, and the false statement. It is high surface tension, not low, that causes the stacking — this option is C with one word inverted, which is the whole item.',
      },
    },
    {
      key: 'rolueux-appearance-d1fb6e70',
      conceptKey: 'rouleaux-is-reversible-adhesion-that-raises-the-esr',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about rouleaux, including its effect on the sedimentation rate.',
      explanations: {
        A: 'It occurs in slow circulation. Normal flow keeps the cells apart.',
        B: 'Correct, and keyed. Rouleaux is reversible: the stacks separate again when the circulation speeds up, and no cell is harmed.',
        C: 'No damage occurs, which is the point of calling it reversible.',
        D: 'The opposite of the consequence. Long chains sediment faster than single cells, so rouleaux raises the ESR — which is why the ESR rises in inflammation.',
      },
    },
    {
      key: 'regarding-rbcs-8802d891',
      conceptKey: 'rouleaux-is-reversible-adhesion-that-raises-the-esr',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the red corpuscle from a set of near-misses.',
      explanations: {
        A: 'The right places and the wrong cell. Aged red corpuscles are destroyed by macrophages in liver, spleen and bone marrow; the megakaryocyte is the platelet\'s parent and destroys nothing.',
        B: 'Inverted. A decreased number is anaemia; polycythaemia is an increase.',
        C: 'One word wrong. The cytoskeleton maintains the biconcave shape, not a biconvex one.',
        D: 'Correct. Rouleaux forms in slow circulation, reversibly and without damage.',
      },
    },

    // ---- osmotic fragility --------------------------------------------------
    {
      key: 'rbcs-are-fragile-so-maintained-in-solution-11b1ac55',
      conceptKey: 'red-corpuscle-osmotic-fragility-crenation-and-haemolysis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the tonicity in which a red corpuscle keeps its shape.',
      explanations: {
        A: 'Correct. The corpuscle keeps its normal shape in an isotonic medium, and plasma is isotonic — equal in osmotic pressure to 0.9% saline.',
        B: 'A hypertonic solution draws water out and crenates the cell.',
        C: 'A hypotonic solution drives water in until the cell bursts and leaves a ghost.',
        D: '"None of the above" cannot stand while isotonic is offered.',
      },
    },
    {
      key: 'rbcs-if-placed-in-hypertonic-solution-it-288c7b44',
      conceptKey: 'red-corpuscle-osmotic-fragility-crenation-and-haemolysis',
      difficulty: 'Easy', questionType: 'Prediction',
      learningObjective: 'Predict what a hypertonic medium does to a red corpuscle.',
      explanations: {
        A: 'Only an isotonic medium leaves the cell unchanged.',
        B: 'Correct. Water leaves the cell, it shrinks, and its edge takes on the notches that give crenation its name.',
        C: 'Swelling and bursting is what a hypotonic solution does — the opposite tonicity.',
        D: 'Leakage of haemoglobin and haemolysis is again the hypotonic outcome, and what it leaves behind is the cell ghost.',
      },
    },

    // ---- the named anaemias ------------------------------------------------
    {
      key: 'aplastic-anemia-is-caused-by-fdcc213e',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the cause of aplastic anaemia.',
      explanations: {
        A: 'Iron and vitamin B12 deficiencies give nutritional anaemias — microcytic and pernicious respectively — in which the marrow is present but under-supplied.',
        B: 'Correct. Aplastic anaemia is depression or destruction of the bone marrow itself, by irradiation or chemotherapy, and because the whole marrow fails all three cell lines fall together.',
        C: 'Acute blood loss gives a haemorrhagic anaemia with a marrow that responds by working harder — the reverse of aplasia.',
        D: 'Spherocytosis and favism are haemolytic: the marrow is normal and the cells are destroyed in the circulation.',
      },
    },
    {
      key: 'is-low-vit-b12-due-to-failed-production-of-intrinsic-factor-efa543c3',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the anaemia caused by failure of intrinsic factor.',
      explanations: {
        A: 'Aplastic anaemia is marrow failure from irradiation or chemotherapy, not a vitamin problem.',
        B: 'Correct. Pernicious anaemia is vitamin B12 deficiency, and the deficiency arises because the stomach fails to make the intrinsic factor B12 needs to be absorbed.',
        C: 'Sickle cell anaemia is a haemoglobin gene mutation.',
        D: 'Microcytic anaemia is the small-cell anaemia of iron deficiency; B12 deficiency makes cells too large, not too small.',
      },
    },
    {
      key: 'is-abnormal-rigid-type-of-hb-hbs-accumulation-of-hb-at-one-s-eb1f70fe',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the anaemia in which abnormal haemoglobin gathers at one side of the cell.',
      explanations: {
        A: 'Aplastic anaemia has normal haemoglobin and no marrow to make cells with it.',
        B: 'Pernicious anaemia is a B12 deficiency; the haemoglobin molecule is normal.',
        C: 'Correct. HbS is rigid and accumulates at one side of the cell, pulling it into the crescent that names sickle cell anaemia.',
        D: 'Microcytic anaemia is defined by cell size, not by an abnormal haemoglobin type.',
      },
    },
    {
      key: 'which-statement-typifies-sickle-cell-anemia-2b7e4372',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Place the defect of sickle cell anaemia at the right level.',
      explanations: {
        A: 'A spherical cell is the spherocyte, and its defect is in spectrin — a membrane protein, not a haemoglobin.',
        B: 'A crenated cell is an artefact of a hypertonic medium, not a disease.',
        C: 'The mature red corpuscle has no nucleus, so no red cell disease can be an abnormality of one.',
        D: 'Correct, and keyed. A mutation in the DNA encoding the globin chain produces HbS, and everything else about the disease follows from that molecule.',
      },
    },

    // ---- count and polycythaemia -------------------------------------------
    {
      key: 'average-number-of-normochromic-rbcs-is-million-mm3-f71a328f',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Easy', questionType: 'Recall of a number',
      learningObjective: 'Give the average red corpuscle count.',
      explanations: {
        A: 'Six million is the threshold above which the count becomes polycythaemia, not the average.',
        B: 'Correct. The average count is 5 million per cubic millimetre — 4.5–5.5 in the male, 4–5 in the female.',
        C: 'Eight million is far beyond even a pathological polycythaemia in this course.',
        D: 'Seven million is above the polycythaemia threshold and is not a normal figure.',
      },
    },
    {
      key: 'life-span-of-rbcs-is-534ae95c',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Easy', questionType: 'Recall of a number',
      learningObjective: 'Give the life span of the red corpuscle.',
      explanations: {
        A: 'Ninety days is short of the figure and is not a number this course gives for anything.',
        B: 'A hundred days is close enough to be tempting, which is why it is here; the book\'s figure is not it.',
        C: 'Correct. About 120 days, after which macrophages in liver, spleen and marrow remove the cell.',
        D: 'A hundred and fifty days overshoots. The cell cannot repair itself, having no organelles, which is what limits it.',
      },
    },
    {
      key: 'male-rbcs-number-is-more-than-female-due-to-c95d501c',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the reason the male red corpuscle count exceeds the female.',
      explanations: {
        A: 'The book attributes the difference to the male hormones, not to oestrogen driving the marrow.',
        B: 'An inhibitory effect of oestrogen would give the same arithmetic by a different route, but it is not what the book states.',
        C: 'Correct. The book gives the higher male count as the stimulatory effect of the male hormones — androgens — on the bone marrow.',
        D: 'An inhibitory androgen effect would make the male count the lower of the two, which is the reverse of the observation.',
      },
    },
    {
      key: 'polycythemia-is-5a37214a',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Define polycythaemia.',
      explanations: {
        A: 'Decreased haemoglobin in the corpuscles is hypochromia, one half of the definition of anaemia.',
        B: 'A decreased number is anaemia — oligocythaemia — the opposite condition.',
        C: 'Correct. Polycythaemia is an increased number of red corpuscles, above six million per cubic millimetre, driven by hypoxia stimulating the marrow.',
        D: 'Increased size is macrocytosis, an abnormality of size rather than of number.',
      },
    },
    {
      key: 'physiological-increase-of-rbcs-in-the-following-except-111c706a',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Separate physiological from pathological polycythaemia.',
      explanations: {
        A: 'Physiological. Thin air means less oxygen, and the marrow answers by making more carriers.',
        B: 'Physiological. Muscular exercise raises the count for the same reason.',
        C: 'Physiological. The newborn has the highest count of any age, and it falls gradually thereafter.',
        D: 'Correct, and the exception. Chronic lung disease raises the count by the same hypoxic mechanism, but the book files it under pathological polycythaemia because the hypoxia is disease rather than circumstance.',
      },
    },
    {
      key: 'one-is-true-about-rbcs-d86ae856',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Pick the one true statement about red corpuscles from a set of near-misses on size, shape and number.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. D is the department book\'s pathological polycythaemia — chronic lung disease raises the count through hypoxia — and the other three each contradict the book: azurophilic granules belong to leukocytes, the centre of the corpuscle is thinner than the periphery, and the diameter is 6–9 µm rather than 10–12.',
      explanations: {
        A: 'Azurophilic granules are lysosomes, and they are found in leukocytes. The red corpuscle has no organelles at all.',
        B: 'The reverse. The centre is 0.8 µm thick and the edge 2.2 µm, which is what makes the centre pale.',
        C: '10–12 µm is the basophil\'s size. The red corpuscle is 6–9 µm, averaging 7.5.',
        D: 'Correct. Chronic lung disease causes hypoxia, hypoxia drives the marrow, and the count rises — the book\'s own example of pathological polycythaemia.',
      },
    },

    // ---- rows filed here because a red corpuscle was one of the options -----
    {
      key: 'concerning-the-red-bone-marrow-which-statement-is-correct-d17f4a79',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about red bone marrow from four claims about its cells, its sinusoids and its site.',
      explanations: {
        A: 'Reticular cells are stromal, not free. The free cells of the marrow are the developing blood cells and the stem cells.',
        B: 'Correct. Immature white cells outnumber immature red cells about five to one, because most white cells are shorter-lived and need replacing faster.',
        C: 'The marrow sinusoid has a non-continuous basement membrane, and it is the gaps in it that let a finished cell out into the blood.',
        D: 'The shaft of an adult long bone holds yellow, fatty marrow. Red marrow in the adult is in the flat, short and irregular bones.',
      },
    },
    {
      key: 'ratio-of-immature-wbcs-to-immature-rbcs-274d053e',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Easy', questionType: 'Recall of a number',
      learningObjective: 'Give the ratio of immature white to immature red cells in marrow.',
      explanations: {
        A: '1:5 is the ratio inverted, and inverting it would say the marrow spends most of its effort on red cells — which the short life of the white cells makes untrue.',
        B: 'Correct. About five immature white cells to every immature red one.',
        C: '4:1 is the right direction with the wrong figure.',
        D: '1:4 is inverted as well as wrong.',
      },
    },
    {
      key: 'basophils-are-characterized-by-91ec1768',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Give the nuclear shape and granule type of the basophil.',
      explanations: {
        A: 'The basophil is 10–12 µm and the red corpuscle 6–9, so the basophil is the larger of the two.',
        B: 'Azurophilic granules are the non-specific lysosomal granules every granulocyte has. The basophil is defined by its specific granules in addition to them.',
        C: 'Correct. The basophil nucleus is irregular and S-shaped, usually half hidden under the coarse granules lying over it.',
        D: 'Acidophilic coarse granules are the eosinophil. Basophil granules are basophilic, and metachromatic with toluidine blue.',
      },
    },
    {
      key: 'frosted-glass-appearance-is-characteristic-for-66eb96af',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Name the blood cell whose cytoplasm looks like frosted glass and say what causes it.',
      explanations: {
        A: 'The red corpuscle has no cytoplasmic texture at all — it is homogeneous haemoglobin with a pale centre.',
        B: '"WBCs" as a whole is too broad: neutrophils, eosinophils and basophils are all granular in different ways, and the lymphocyte\'s cytoplasm is a clear blue rim.',
        C: 'Correct. The monocyte\'s pale basophilic cytoplasm is finely stippled with lysosomes, and that gives the frosted-glass or ground-glass look.',
        D: '"None of the above" cannot stand while the monocyte is on the list.',
      },
    },
    {
      key: 'which-of-the-following-increases-with-age-a0ac60a7',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the pigment that accumulates with age and say why.',
      explanations: {
        A: 'Correct. Lipofuscin is undigested residue left in residual bodies, and in cells that never divide — cardiac muscle, nerve cells — it accumulates year on year, which is why it is called the age pigment.',
        B: 'Carotene is an exogenous pigment taken in with food and dissolved in fat; its amount follows diet, not age.',
        C: 'Haemoglobin is an endogenous pigment but its concentration is set by the marrow, and if anything the count falls gradually from birth.',
        D: 'Haemosiderin accumulates where red cells have been broken down in quantity, which is a matter of haemolysis or bleeding rather than of years.',
      },
    },
    {
      key: 'one-is-regarded-as-an-endogenous-pigment-5cecd123',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Separate endogenous from exogenous pigment inclusions.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The department book\'s cytology chapter lists the endogenous pigments as haemoglobin, melanin and lipofuscin, and the exogenous ones as carbon and dust, carotene and tattoo dyes, which places three of these four options on the exogenous side and leaves haemoglobin.',
      explanations: {
        A: 'Correct. Haemoglobin is made by the body — the book\'s own first example of an endogenous pigment.',
        B: 'Carbon is inhaled dust: exogenous, and the pigment of an anthracotic lung.',
        C: 'Carotene comes in with food and is dissolved in the fat of the adipocyte, which is what makes white fat white rather than colourless.',
        D: 'Tattoo marks are dye injected under the skin — the book\'s own example of an exogenous pigment, and the most obviously so of the four.',
      },
    },
    {
      key: 'the-pigment-which-is-responsible-for-the-brown-color-of-brow-6b32ed38',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the pigment that makes brown adipose tissue brown.',
      explanations: {
        A: 'Melanin is the pigment of skin, hair and the choroid, made by melanocytes; it plays no part in adipose tissue.',
        B: 'Correct. The multilocular fat cell is packed with mitochondria, and their cytochrome pigment — with the tissue\'s richer blood supply — is what makes brown fat brown.',
        C: 'Haemosiderin is iron stored after red cells break down, and it is brown, which is why it is offered here.',
        D: 'Haemoglobin colours the blood in the tissue rather than the cells; the book attributes the colour to the cytochromes of the mitochondria.',
      },
    },
    {
      key: 'a-child-arrived-at-the-pediatric-outpatient-clinic-complaini-0be1f21a',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Recognise the clinical triad of defective collagen synthesis and name the disease.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. The department book states that vitamin C deficiency — scurvy — is due to defective collagen synthesis and is characterised by unhealed wounds and bleeding gums, which is the stem\'s own description, and the stem adds that the resident suspected a connective tissue disease.',
      explanations: {
        A: 'Osteoporosis is loss of bone mass, and it presents with fracture rather than with bleeding gums and open wounds.',
        B: 'Purpura is bleeding into the skin from a platelet or vessel problem; it would not explain teeth falling out or wounds failing to close.',
        C: 'Anaemia is a red corpuscle disorder. It causes pallor and breathlessness, not a failure of tissue repair.',
        D: 'Correct. Bleeding gums, loss of teeth and non-healing wounds together are scurvy, and the underlying lesion is collagen that cannot be made properly.',
      },
    },
    {
      key: 'regarding-the-reticulocyte-the-following-statement-is-correc-7436ea38',
      conceptKey: 'reticulocyte-supravital-identification',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Describe the reticulocyte\'s staining and reject the leukocyte figures offered beside it.',
      explanations: {
        A: 'Correct, and keyed. The cell is already acidophilic from its haemoglobin, and what a supravital stain adds is a basophilic reticulum precipitated from its remaining ribosomes.',
        B: 'Twenty micrometres is monocyte size. The reticulocyte is a red cell and is red-cell sized.',
        C: 'Allergy raises the eosinophil count. What raises the reticulocyte count is blood loss or haemolysis, because the marrow is releasing young cells early.',
        D: '60–70% of the total leukocytic count is the neutrophil. Reticulocytes do not exceed one per cent of the cells in peripheral blood.',
      },
    },

    // ================= excluded ==============================================
    {
      key: 'hemoglobin-is-4350fef8',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The teaching — haemoglobin is a basic protein, which is why the corpuscle is acidophilic — is carried by the concept and by `rbcs-are-c3de41ae`, which survives with four.',
    },
    {
      key: 'sedimentation-rate-of-rbcs-with-inflammation-19ddc25e',
      conceptKey: 'rouleaux-is-reversible-adhesion-that-raises-the-esr',
      difficulty: 'Easy', questionType: 'Prediction',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. What it asks — that the ESR rises in inflammation — is stated in the concept and asked with a full option set at `rolueux-appearance-d1fb6e70`.',
    },
    {
      key: 'changes-in-the-osmotic-pressure-of-rbcs-might-result-in-6f74924a',
      conceptKey: 'red-corpuscle-osmotic-fragility-crenation-and-haemolysis',
      difficulty: 'Hard', questionType: 'Prediction',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five, and the fourth was almost certainly the one that made the item work: the three that survive are a true statement about cell ghosts in a hypo-ionic solution and two statements with the tonicities swapped. With one option missing there is no way to be sure the intended answer was not in it.',
    },
    {
      key: 'basophils-are-characterized-by-2-smaller-diameter-than-rbcs-f750faee',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has fused with the stem — the row opens "Basophils are characterized by: | ° 2: Smaller diameter than RBCs" — leaving three filled options. The clean copy of the same question, with the same four options and a printed key, is `basophils-are-characterized-by-91ec1768`, and that is the one imported.',
    },
    {
      key: 'acharacteristic-ultrastructural-feature-of-rbcs-includes-33915fb0',
      conceptKey: 'red-corpuscle-adaptation-to-gas-transport',
      difficulty: 'Moderate', questionType: 'Ultrastructure',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The damaged twin of `characteristic-ultrastructural-feature-of-rbcs-includes-0819a81e`. Same four options, but the stem has lost the space after its first letter ("Acharacteristic ultrastructural feature") and every option carries a trailing full stop from the scan; the clean copy also came with a key, and this one did not.',
    },
    {
      key: 'rbcs-in-adults-13ef4579',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D belongs to a different question: it reads "Measurement of bleeding time", which is a platelet investigation and not a statement about red corpuscles at all, so it has been carried in from the item printed beside this one. Four slots are filled and the emitter would accept the row, but one of them answers another stem. The clean copy is `the-rbcs-in-adults-b9684d0a`, whose fourth option is "Contain myoglobin".',
    },
    {
      key: 'hereditary-spherocytosis-of-rbcs-is-caused-by-f3518b13',
      conceptKey: 'red-corpuscle-membrane-carries-blood-groups-outside-and-a-cytoskeleton-inside',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The damaged twin of `hereditary-spherocytosis-of-rbcs-is-caused-by-xxx-c787da54`. Option B has lost the name of its enzyme — it reads "Deficiency enzyme, ‏ظ‎" — so one distractor is unreadable. The clean copy carries the same stem, a complete option B ("Deficiency of hemoglobin reductase enzyme") and a printed key.',
    },
    {
      key: 'aplastic-anaemia-is-caused-by-1-cdf5f44f',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A second copy of `aplastic-anemia-is-caused-by-fdcc213e` from another book, with the same four options, a stray "1" left at the end of its stem and no key. The keyed clean copy is the one imported; this row is kept so that a rescan knows it is a duplicate.',
    },
    {
      key: 'male-rbcs-no-is-more-than-female-due-to-2e682527',
      conceptKey: 'red-corpuscle-count-life-span-and-polycythaemia',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same question as `male-rbcs-number-is-more-than-female-due-to-c95d501c`, printed twice in one book with "no" abbreviated in one and written out in the other, and with the same four options and the same key. One copy is imported; importing both would put a student through an identical item twice.',
    },
    {
      key: 'a-patient-was-subjected-to-severe-bleeding-during-a-surgical-05255366',
      conceptKey: 'reticulocyte-supravital-identification',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has lost letters in the middle — "during a surgical operati which blood cell is expected" — and option C is unreadable, printed as "PI 3" where the intended word was almost certainly "Platelets". A distractor a student cannot read is a distractor that cannot be reasoned about, and repairing it here would mean inventing what the page said.',
    },
    {
      key: 'a-patient-was-subjected-to-severe-bleeding-during-a-surgical-3662d3cc',
      conceptKey: 'reticulocyte-supravital-identification',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The second copy of the same vignette, damaged differently: the stem has the first two options printed inside it, and option D has the whole of the next question run into it ("Reticulocytes. 1 ... 2. At the emergency unit of Kasr Al Aini hospital, a patient was admitted complaining of abdominal pain and fever..."). Between the two copies the vignette is unrecoverable without a rescan; its teaching — that acute blood loss raises the reticulocyte count — is in the concept.',
    },
    {
      key: 'abnormal-type-of-hemoglobin-hbs-primary-defect-in-actin-gene-d4b92a4a',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a multiple-choice question as extracted. The stem is a fragment of one question\'s option list ("Abnormal type of hemoglobin (HbS) ... Primary defect in actin gene expression") and the four options belong to a different question entirely — bronchial asthma, typhoid fever, leukaemia, drug hypersensitivity — with a third question\'s stem trailing after option D. Two or three items have collapsed into one row, and nothing can be authored from it.',
    },
    {
      key: 'concerning-the-previous-disease-the-following-occurs-05b191c7',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A follow-on stem whose case did not come with it. "The previous disease" is unidentifiable from anything in the row, and its four options point at four different diseases — a haemolytic anaemia, scurvy, a mitochondrial disorder and osteoporosis — so choosing between them would mean guessing which vignette was printed above. It appears in two books, both times without its case.',
    },
    {
      key: 'the-etiology-of-the-disease-in-the-previous-case-could-be-ec246534',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same fault. This row is printed immediately after `a-child-arrived-at-the-pediatric-outpatient-clinic-complaini-0be1f21a` in its book and its intended answer is vitamin C deficiency, but the bank stores rows independently and a student would be shown "the disease in the previous case" with no previous case attached. Importing an item that refers to text a student cannot see teaches them the paper is broken.',
    },
    {
      key: 'the-can-be-stained-b-a-hiant-cresy-blue-stain-136d5ef5',
      conceptKey: 'reticulocyte-supravital-identification',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The correct option has been absorbed into another. The candidate\'s pen crossed the letter of option c on this 2022 script, so the bank holds option b as "Neutrophi oath Reticulocytes." — the false option run together with the true one. The department book gives brilliant cresyl blue as the supravital stain that shows the reticulum of ribosomal remnants in the reticulocyte, so the answer is the second half of that entry. The stem has also lost its blank to the scanner. Recoverable by rescanning page 4 of the 2022 paper.',
    },
    {
      key: 'endocrine-secretion-of-leptin-is-a-function-of-fibroblast-un-474f4e7e',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The bank row has no options. All four option letters were crossed by the pen on this 2024 script and the options were read into the stem, where they are legible as Fibroblast, Unilocular fat cell, Reticulocyte and Pericytes. The department book answers it — the endocrine function of the unilocular fat cell is secretion of leptin, which inhibits food intake and raises metabolic rate — but a question with an empty option map cannot be emitted. Recoverable by rescanning page 2 of the 2024 paper.',
    },
    {
      key: 'formation-of-an-abnormal-rigid-type-of-hb-hbs-results-in-e26b5958',
      conceptKey: 'named-anaemias-aplastic-pernicious-and-sickle-cell',
      difficulty: 'Easy', questionType: 'Clinical correlation',
      learningObjective: 'Name the anaemia caused by an abnormal rigid haemoglobin.',
      answerOverride: 'b',
      answerOverrideReason:
        'One of the strays the extractor could not file to a leaf; it is authored here because it names a red cell disease. The 2021 paper carried no key and the highlight recovery does not cover that sitting, so the answer comes from the department book, which gives sickle cell anaemia as the condition in which an abnormal rigid haemoglobin, HbS, distorts the corpuscle into a sickle.',
      explanations: {
        a: 'Aplastic anaemia is a failure of the bone marrow to produce cells at all. The haemoglobin it does make is normal; there is simply not enough of it, and the white cells and platelets fall with the red.',
        b: 'Correct. HbS is rigid and deforms the corpuscle into a sickle shape, which makes it fragile and unable to squeeze through a capillary — the two adaptations the normal red cell depends on.',
        c: 'Spherocytosis is a membrane defect: the cell loses its biconcave shape and becomes a sphere, which raises its osmotic fragility. The fault is in the membrane cytoskeleton, not in the haemoglobin.',
        d: 'Favism is haemolysis brought on by eating broad beans in a person deficient in an enzyme of the red cell. Like spherocytosis it destroys normal haemoglobin rather than being caused by an abnormal one.',
      },
    },
  ],
}
