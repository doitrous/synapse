/**
 * Granular leukocytes — the multiple-choice questions the department books ask.
 *
 * The first leaf authored, and the one the emitter was built against. Every
 * explanation here is traceable to the department book's own chapter on
 * granular leukocytes (`scripts/kasr/extract/deptbook.json`, pp. 32–35) or to
 * the article written from it. Nothing is supplied from general haematology.
 *
 * Three concepts are minted here beyond the identification concept the 2025
 * paper already produced. The exam asks these cells three different ways —
 * what is in the granules, what the cell does with it, and what the count does
 * in disease — and a student can know one and not the others, so they are not
 * one concept with three questions.
 *
 * Three rows from the sat end-of-module papers are added at the end and all three
 * are live. None carried a recovered answer, so each is worked from the department
 * book and says so: the basophil row against its own numbers (0–1% of the count, an
 * S-shaped nucleus, metachromatic granules), the cell-mediated immunity row against
 * its sentence giving that arm to the T lymphocyte, and the neutrophil row against
 * its list of specific granule contents. The neutrophil row lost two of its four
 * options to a pen through their letters and is authored as a two-option item, the
 * answer being one of the two that survived.
 *
 * `lymphocyte-types-t-b-and-nk-and-the-immunity-each-mediates` is copied verbatim
 * from `non-granular-leukocytes.ts`, where it is minted — the paper asks it from
 * the granulocyte side, and a rival key would halve a student's mastery of it.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Granular leukocytes',
  modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
  articleId: 'ART-101-HIS-GRANULAR-LEUKOCYTES',

  concepts: [
    {
      key: 'neutrophil-granules-and-first-line-defence',
      label: 'The neutrophil carries two granule populations and is the first line of non-specific defence',
      definition:
        'Neutrophils are 60–70% of the white cell count, 10–12 µm, with a dark segmented nucleus of two to five lobes joined by thin chromatin threads. Their azurophil (primary) granules are large, few and dark — primary lysosomes holding myeloperoxidase. Their specific (secondary) granules are small, many and pale, holding collagenase, phagocytin, lysozyme and lactoferrin. Bacterial toxins attract them; they leave the blood by diapedesis between endothelial cells and become motile microphages.',
      objective:
        'Distinguish the neutrophil’s azurophil and specific granules by size, number, staining and contents, and say what each contributes to defence.',
      pitfall:
        'Treating the two granule populations as one. The exam asks which granule holds which enzyme, and myeloperoxidase is in the azurophil granule while lactoferrin, phagocytin, lysozyme and collagenase are in the specific one.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Polymorphonuclear leucocyte', 'Neutrophil granules', 'Microphage'],
      gaps: [
        'The department book states dead neutrophils form pus cells and that pus raises body temperature by stimulating the heat-regulating centre. No physiology source in this corpus supports the mechanism as stated; it is recorded because the book states it and it is examinable, not because it is verified.',
      ],
    },
    {
      key: 'eosinophil-granule-contents-and-role-in-allergy',
      label: 'The eosinophil ends an allergic reaction with histaminase and sulphatase, and kills parasites with its granule protein',
      definition:
        'Eosinophils are 1–4% of the count, 10–14 µm, with a bilobed horse-shoe nucleus joined by a thick chromatin thread and large acidophilic specific granules. On electron microscopy the granule is oval with an electron-dense crystalloid core of basic protein. The cell terminates allergy by secreting histaminase and sulphatase, which destroy histamine and heparin, and by phagocytosing antigen–antibody complexes; it defends against parasites by the cytotoxic effect of its granule protein. Eosinophilia is above 5%, eosinopenia below 1%.',
      objective:
        'Name the contents of the eosinophil granule and explain how each ends an allergic reaction or kills a parasite.',
      pitfall:
        'Confusing histaminase with histamine. The eosinophil destroys histamine; the basophil releases it. A question naming histaminase, sulphatase and neurotoxin is naming the eosinophil, and the same question with histamine and heparin is naming the basophil.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Eosinophil granules', 'Acidophil', 'Eosinophilia'],
      conflicts: [
        'The department book puts eosinophils at 1–4% of the differential count. Several question books and my own first reading of the 2025 paper give 2–4%. The book is this faculty’s own and governs; the discrepancy is recorded rather than resolved silently, because a one-mark question on the count could be marked either way.',
      ],
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
      key: 'lymphocyte-types-t-b-and-nk-and-the-immunity-each-mediates',
      label: 'The three lymphocytes look identical and differ only in their surface receptors: T mediates cell-mediated immunity, B mediates humoral immunity, NK acts without either',
      definition:
        'By function there are three lymphocytes, and the department book is explicit that they cannot be told apart by light or electron microscopy — only by their surface receptors. T lymphocytes are 60–80% of the lymphocytes and live for years; their stem cells leave the bone marrow for the thymus, where thymic education gives them their T-cell receptors, CD4 and CD8, and they mediate cell-mediated immunity. Their functional types are the cytotoxic CD8+ cell, which secretes perforins that make pores in virally infected, transplanted and neoplastic cells; the helper CD4+ cell, which activates the B cell; the regulatory or suppressor cell, which keeps the response off self antigens and damps an excessive one; and the memory cell. B lymphocytes are 20–30%, mature in the bone marrow in mammals and in the bursa of Fabricius in birds, carry receptors for IgM and IgD, and mediate humoral immunity by becoming plasma cells that secrete antibody. Natural killer cells are 5–10%, come from the precursors of T and B cells but never enter the thymus, carry neither T nor B receptors, act in innate early immunity without any helper T stimulation, and secrete interferon.',
      objective:
        'Name the three functional lymphocytes, give the immunity each mediates and where each matures, and give the four functional types of T cell with their CD markers.',
      pitfall:
        'Trying to tell them apart down a microscope. The book says outright that all three look alike by light and electron microscopy and differ only in their surface receptors, so every question about them is a question about markers — CD4 helper, CD8 cytotoxic — and never about appearance.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'classification',
      aliases: ['T lymphocyte', 'B lymphocyte', 'Natural killer cell', 'CD4', 'CD8', 'Cell mediated immunity', 'Humoral immunity'],
    },
  ],

  questions: [
    {
      key: 'basophil-membrane-contain-receptor-for-d799ae45',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the immunoglobulin the basophil membrane has receptors for.',
      explanations: {
        A: 'IgA is the immunoglobulin of secretions — tears, saliva, gut and respiratory mucus. Nothing in the book puts a receptor for it on the basophil.',
        B: 'IgG is the commonest circulating immunoglobulin and the one that crosses the placenta. Chosen by students who reason from abundance, but abundance is not what the receptor is for.',
        C: 'Correct. The book states the basophil membrane shows receptors for IgE, which is what makes the cell degranulate on a second exposure to an allergen.',
        D: 'IgM is the first antibody made in a primary response and the largest. It is not what the basophil binds.',
      },
    },
    {
      key: 'percent-of-neutrophils-2bc5173f',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Easy',
      questionType: 'Recall of a stated figure',
      learningObjective: 'Give the neutrophil’s share of the differential white cell count.',
      explanations: {
        A: 'Correct. 60–70%, which makes the neutrophil the commonest leukocyte. The book also gives the thresholds either side: neutrophilia above 75%, neutropenia below 60%.',
        B: '1–4% is the eosinophil’s share. Picked when the four options are read as a set and the wrong cell’s figure is chosen.',
        C: '0–1% is the basophil’s share — the rarest of the granulocytes.',
        D: '15–20% is closer to the lymphocyte, which is the second commonest cell rather than the first.',
      },
    },
    {
      key: 'contain-histaminase-sulfatase-neurotoxin-768ed0e3',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Identify a granulocyte from the contents of its granules.',
      explanations: {
        A: 'The neutrophil’s granules hold myeloperoxidase in the azurophil population and collagenase, phagocytin, lysozyme and lactoferrin in the specific one. None of the three named here.',
        B: 'Correct. Histaminase and sulphatase are what the eosinophil uses to destroy histamine and heparin and so terminate an allergic reaction; the granule’s basic protein is the cytotoxic agent against parasites.',
        C: 'The basophil is the cell that *holds* histamine and heparin. This option is the trap: the two cells are opposite ends of the same reaction, and the answer turns on histaminase versus histamine.',
        D: 'The lymphocyte is agranular. It is not a granular leukocyte at all, so it cannot be the answer to a question about granule contents.',
      },
    },
    {
      key: 'contain-histamine-heparine-73ddda18',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Identify the granulocyte whose granules contain histamine and heparin.',
      explanations: {
        A: 'The neutrophil holds no vasoactive amine. Its granules are for killing and digesting bacteria.',
        B: 'The eosinophil holds histamin*ase*, the enzyme that destroys histamine — the opposite role. This is the same pair of options as the previous question with the answer reversed, and the faculty asks it both ways.',
        C: 'Correct. Histamine and heparin are the basophil’s, and it is the heparin that makes the granules stain metachromatically with toluidine blue.',
        D: 'The plasma cell is a connective-tissue cell that secretes antibody. It is not a leukocyte of the granular series.',
      },
    },
    {
      key: 'cells-which-release-histaminase-enzyme-5ed9852e',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the cell that releases histaminase.',
      explanations: {
        A: 'Neutrophils release lactoferrin, phagocytin, lysozyme and collagenase — antibacterial, not anti-allergic.',
        B: 'Correct. The eosinophil secretes histaminase and sulphatase to destroy histamine and heparin, which is how it terminates an allergic reaction.',
        C: 'Plasma cells secrete antibody. They are not granular leukocytes.',
        D: 'The basophil releases histamine. Choosing it here is reading the stem as "which cell is involved with histamine" rather than which one destroys it.',
      },
    },
    {
      key: 'cells-which-release-histamine-8eb09521',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the cell that releases histamine.',
      explanations: {
        A: 'Neutrophils release no histamine; their granules are antibacterial.',
        B: 'The eosinophil releases histamin*ase*, which destroys histamine. The faculty sets this option and its mirror image in adjacent questions on purpose.',
        C: 'Plasma cells secrete antibody, not vasoactive amines.',
        D: 'Correct. The basophil releases histamine, causing vasodilatation and the sudden drop in blood pressure the book names as anaphylaxis. The mast cell does the same, but the option set here is of leukocytes.',
      },
    },
    {
      key: 'basophils-increase-in-number-in-case-of-a7adbbcc',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate',
      questionType: 'Applied',
      learningObjective: 'Say what raises the basophil count.',
      explanations: {
        A: 'Bacterial infection raises the neutrophil count — neutrophilia above 75% — because the neutrophil is the first line of non-specific defence.',
        B: 'Parasitic infection raises the eosinophil count. In Egypt, bilharziasis is the cause the department names.',
        C: 'Correct. Basophilia, above 2%, goes with allergy: the basophil carries IgE receptors and degranulates when an allergen cross-links them.',
        D: '"Both b and c" folds in parasitic infection, which is the eosinophil’s. Picked by students who know allergy is right and are unwilling to rule the other out.',
      },
    },
    {
      key: 'all-characters-of-neutrophils-except-262496a1',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Recognise which described feature does not belong to the neutrophil.',
      explanations: {
        A: 'True of the neutrophil: a single segmented nucleus of two to five lobes joined by thin chromatin threads. Not the exception.',
        B: 'True: on electron microscopy the neutrophil shows pseudopodia, few organelles, and more glycogen for energy. Not the exception.',
        C: 'Correct — this is the exception being asked for. Coarse basophilic granules containing heparin belong to the basophil, not the neutrophil, whose specific granules are fine and pale.',
        D: 'True: the azurophil (primary) granules are considered primary lysosomes and contain myeloperoxidase. Not the exception.',
      },
    },
    {
      key: 'azurophilic-granules-contain-mainly-3d709e79',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say what the azurophil granule contains.',
      explanations: {
        A: 'Collagenase is in the neutrophil’s *specific* granule, with phagocytin, lysozyme and lactoferrin. This option is the whole point of the question: the two granule populations hold different things.',
        B: 'Histaminase is the eosinophil’s, not the neutrophil’s.',
        C: 'Sulphatase is also the eosinophil’s, secreted with histaminase to destroy heparin.',
        D: 'Correct. The azurophil granule is a primary lysosome, so its contents are hydrolytic enzymes — myeloperoxidase among them, for defence against bacteria and viruses.',
      },
    },
    {
      key: 'secreted-by-neutrophil-to-help-in-healing-of-wounds-c5479466',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Moderate',
      questionType: 'Recall of a stated term',
      learningObjective: 'Name the substance the department book credits the neutrophil with for wound healing.',
      explanations: {
        A: 'Clathrin coats vesicles during receptor-mediated endocytosis. It is a cytology term that appears in this module’s cell chapter, which is why it is a plausible distractor here.',
        B: 'Correct, as the department book has it: the neutrophil secretes trephone, which it credits with helping wounds heal.',
        C: 'Tubulin is the protein of microtubules — cytoskeleton, not secretion.',
        D: 'Actin is the protein of microfilaments and of the microvillus core. Also cytoskeletal.',
      },
      answerOverride: undefined,
    },
    {
      key: 'a-21-years-old-patient-suffering-from-abdominal-pain-his-ser-9a6a6832',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Hard',
      questionType: 'Clinical application',
      learningObjective: 'Predict the differential count in typhoid fever.',
      explanations: {
        A: 'Basophilia, above 2%, goes with allergy rather than with a bacterial fever.',
        B: 'Polycythaemia is a raised red cell count and belongs to a different chapter entirely.',
        C: 'Correct. The department names typhoid as the commonest cause of neutropenia — below 60% — and it is the exception worth holding, because almost every other bacterial infection raises the neutrophil count instead.',
        D: 'Eosinophilia, above 5%, goes with parasitic infection and allergy. Picked by students who know the patient has an infection and reach for the parasite answer because the presentation is abdominal.',
      },
    },
    {
      key: 'is-a-second-most-common-cell-second-line-of-defense-818efa89',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not assessed — this item is withheld.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The question is about the lymphocyte, which is an agranular leukocyte and belongs to the next chapter, not this leaf — the bank’s leaf mapping is keyword-based and put it here on "second line of defense". More seriously, its own option set is unsound: "second most common cell" and "second line of defence" are not the same cell in every source, and the book calls the neutrophil the first line of non-specific defence without ranking a second. Re-file it under Non granular leukocytes and settle the intended answer with the department before it is used.',
    },
    {
      key: 'deficiency-of-peroxisomal-enzymes-19743f95',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not assessed — this item is withheld.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A cytology question about peroxisomes, filed here by the keyword mapper. It belongs to the Cytoplasm leaf. Not wrong, just in the wrong place, and importing it here would attach mastery evidence for a cytology concept to a blood one.',
    },
    {
      key: 'regarding-basophils-they-5693d302',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the basophil from a set of counts, nuclear shapes and staining claims.',
      answerOverride: 'd',
      answerOverrideReason:
        'The 2021 paper printed no key and the highlight recovery does not cover that sitting, so the answer is worked from the department book. Three of the four options contradict its own numbers and descriptions — basophils are 0–1% of the count, they rise in allergy rather than in pyogenic infection, and their nucleus is irregular and S-shaped — while the fourth restates its sentence that their coarse granules stain metachromatically purple with toluidine blue because of their heparin.',
      explanations: {
        a: 'Three to eight per cent is the monocyte. Basophils are 0–1%, the rarest white cell in the book, and basophilia begins above 2%.',
        b: 'Acute pyogenic infection raises the neutrophils, the first line of non-specific defence. The basophil rises in allergy, and its own products — histamine, heparin, leukotrienes — are what an allergic reaction is made of.',
        c: 'A kidney-shaped nucleus is the monocyte\'s. The basophil\'s is irregular, segmented and S-shaped, and it is usually hidden altogether by the granules lying over it.',
        d: 'Correct. The basophil\'s coarse granules are metachromatic — toluidine blue is blue and turns them purple — because of the heparin in them, and the mast cell shares the property for the same reason.',
      },
    },
    {
      key: 'which-leucocyte-is-responsible-for-cell-mediated-immunity-48f4b4fa',
      conceptKey: 'lymphocyte-types-t-b-and-nk-and-the-immunity-each-mediates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the lymphocyte that mediates cell-mediated immunity and the one that mediates humoral immunity.',
      answerOverride: 'b',
      answerOverrideReason:
        'No key was printed on the 2021 paper and none was recovered for that sitting, so the answer comes from the department book, which says in as many words that T lymphocytes mediate cell-mediated immunity and B lymphocytes mediate humoral immunity.',
      explanations: {
        a: 'The B lymphocyte mediates humoral immunity: activated by antigen and by a helper T cell it becomes a plasma cell and secretes antibody. Antibody is a molecule in the plasma, which is what "humoral" means, and it is the opposite arm from the one asked for.',
        b: 'Correct. T lymphocytes mature in the thymus, carry CD4 and CD8 receptors, and mediate cell-mediated immunity — the cytotoxic CD8 cells killing infected and neoplastic cells directly rather than through an antibody.',
        c: 'Basophils belong to the allergic response, not to either immune arm. They secrete histamine, heparin and leukotrienes and have only limited phagocytic power.',
        d: 'The monocyte becomes the macrophage, which presents antigen and so starts both responses — but presenting is not mediating, and the cell that carries the cell-mediated response out is the T lymphocyte.',
      },
    },
    {
      key: 'neutrophils-are-characterized-by-6-have-non-segmented-nuclel-934eb5dc',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The stem carries one of the options and two of the four are gone. The pen crossed the letters of options b and c on this 2022 script, so the row now reads "Neutrophils are characterized by: 6 Have non segmented nuclel." — option b sitting inside the stem, its letter read as a "6" and its last word mangled — and offers only a and d, two options against a contract of four to five. Option a is damaged too, trailing the noise "i cutteond". The department book makes phagocytin one of the four contents of the neutrophil\'s specific granules, so option a would be the answer, but a question that states one of its own choices in the stem and hides two more is not sittable, and supplying them from the book would be authoring a new item. A rescan of page 4 of the 2022 paper needs to recover the letters and text of options b and c and the tail of option a.',
    },
  ],
}
