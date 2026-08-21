/**
 * `101 ISK > Histology > Epithelial Tissues > Glandular Epithelium` — the
 * question books' MCQs.
 *
 * Sixty-eight rows carry this leaf and forty-three of them are glandular
 * questions. The rest are the leaf's real problem and are excluded rather than
 * imported: eight are upper-limb anatomy or embryology that the extraction filed
 * here by accident, nine are surface-, neuro- or myo-epithelium questions that
 * belong to a neighbouring leaf, six lost an option to the scan and are down to
 * three, and two are OCR-damaged duplicates of rows that survived intact.
 * Every one of them stays below with a reason.
 *
 * The wrong-leaf exclusions need saying plainly, because they are not the
 * question's fault. A concept is declared on the leaf it belongs to, and the
 * emitter will only let a question point at a concept declared on its own leaf.
 * A myo-epithelium question sitting in this leaf can therefore be imported only
 * by minting a second myo concept here — which would split one idea in half —
 * or by attaching it to a glandular concept it does not test. Neither is worth
 * doing for a fault that a one-line correction to the bank's `leaf` field
 * fixes, after which each of them imports unchanged.
 *
 * Two myo-epithelium rows are kept, not excluded: both turn on which glands
 * have myo-epithelial cells at all, and the discriminator in both is the duct —
 * an endocrine gland has none, so it has nothing to squeeze secretion into.
 * That is a glandular fact, and it is the concept they are attached to.
 *
 * The department book (`scripts/kasr/extract/deptbook.json`, pp. 57–58) gives
 * the mechanisms of secretion but names no example gland for any of them. The
 * question books name them constantly — sebaceous, mammary, salivary — and are
 * consistent with each other and with general histology, so the examples are
 * taught here and recorded as a gap on the concept.
 *
 * `ART-101-HIS-GLANDULAR-EPITHELIUM` does not exist yet; another lane is
 * writing it. Cited anyway.
 *
 * Five rows from the sat end-of-module papers are added at the end. The three live
 * ones cover the three modes of secretion between them — apocrine, merocrine and,
 * by exclusion, holocrine — and none has a recovered answer, so each is worked from
 * the department book's one-line definitions and says so. Both exclusions are the
 * same holocrine question, once from 2022 with its answer merged into a compound
 * option and once from 2024 with no options at all; a rescan of either would make
 * it live.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Glandular Epithelium',
  modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
  articleId: 'ART-101-HIS-GLANDULAR-EPITHELIUM',

  concepts: [
    {
      key: 'glands-classified-by-presence-of-duct',
      label: 'Glandular epithelium is epithelium modified to secrete, and the presence of a duct divides glands into exocrine, endocrine and mixed',
      definition:
        'Glandular epithelium is a type of epithelium modified to act as a gland and produce secretion. Glands are classified by the presence or absence of a duct. An exocrine gland has a secretory portion, whose cells make the secretion, and an excretory portion — the ducts — that carries it outside the gland. An endocrine gland is ductless: groups of secretory cells with blood capillaries between them, whose hormone is carried away by the blood to distant parts of the body. A mixed gland has both, an exocrine part with a duct system and an endocrine part without; the pancreas is the example. Because myo-epithelial cells exist to squeeze secretion into a duct, they are found around exocrine acini — salivary, mammary and sweat glands — and not in a ductless gland such as the thyroid.',
      objective:
        'Divide glands into exocrine, endocrine and mixed by whether a duct is present, and say where each sends its secretion.',
      pitfall:
        'Treating "ductless" as a minor detail. It decides everything downstream: where the secretion goes (a surface or the blood), whether the gland can be classified by duct branching at all, and whether it has myo-epithelial cells.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'classification',
      aliases: ['Exocrine gland', 'Endocrine gland', 'Ductless gland', 'Mixed gland'],
      gaps: [
        'The department book names no example of a mixed gland. The question books answer "pancreas" consistently, and the pancreas does have both exocrine acini with a duct system and the islets of Langerhans without, so the example is taught here; it is not this faculty\'s stated wording.',
      ],
    },
    {
      key: 'exocrine-gland-modes-of-secretion',
      label: 'Exocrine glands secrete in one of three modes — merocrine, apocrine or holocrine — distinguished by how much of the cell is lost',
      definition:
        'By mode of secretion an exocrine gland is merocrine, apocrine or holocrine. Merocrine secretion is discharged outside the cell by exocytosis with no change in the secretory cell; it is the commonest mode, and the salivary glands are the example. In apocrine secretion the product is released together with the apex of the cell, so part of the apical cytoplasm is lost with it; the lactating mammary gland is the example. In holocrine secretion the product accumulates inside the cell, the swollen cell ruptures, and the whole cell is lost with the secretion; the sebaceous gland is the example.',
      objective:
        'Name the three modes of secretion, state how much of the cell each destroys, and give the gland that uses it.',
      pitfall:
        'Reading the prefixes as if they described the secretion rather than the cost to the cell. The ladder runs none, apex, whole cell — merocrine, apocrine, holocrine — and every distractor in this leaf is one rung out of place.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'classification',
      aliases: ['Merocrine', 'Apocrine', 'Holocrine', 'Mode of secretion'],
      gaps: [
        'The department book describes the three mechanisms and states explicitly that no named gland is given for any of them. Sebaceous for holocrine, lactating mammary for apocrine and salivary for merocrine come from the question books, are consistent across them and agree with general histology, but are not sourced to this faculty\'s own text.',
      ],
      conflicts: [
        'Some question books offer "eccrine" as a fourth mode alongside merocrine. The department book recognises three modes only, and eccrine is not one of them; where a book uses it, it means merocrine.',
      ],
    },
    {
      key: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      label: '"Simple" and "compound" describe the duct, "branched" describes the secretory part, and "tubular" or "alveolar" describes its shape',
      definition:
        'An exocrine gland consists of a secretory part and a duct, and each is classified separately. By branching of the duct a gland is simple, meaning its duct does not branch, or compound, meaning the duct branches like a tree with each branch carrying a secretory part; a simple gland whose secretory portion alone branches is called simple branched. By the shape of the secretory part a gland is tubular, when the secretory unit is a tube, alveolar or acinar, when it is rounded, or tubulo-alveolar, when it is flask-shaped. Every named gland carries one term from each list.',
      objective:
        'Say which structure the word "simple", "compound", "branched", "tubular" or "alveolar" is describing in a gland\'s name.',
      pitfall:
        'Taking "simple branched tubular" to mean a branching duct. Simple has already settled the duct — it does not branch — so the only thing left for "branched" to describe is the secretory part.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'classification',
      aliases: ['Simple gland', 'Compound gland', 'Branched gland', 'Tubular gland', 'Alveolar gland', 'Acinar gland'],
    },
    {
      key: 'named-exocrine-glands-in-the-combined-classification',
      label: 'Each named exocrine gland sits at one place in the combined classification — intestinal simple tubular, fundic simple branched tubular, sebaceous simple branched alveolar, salivary compound tubulo-alveolar',
      definition:
        'The book sets out the combined classification as nine or ten named forms: simple tubular, simple branched tubular, simple coiled tubular and compound tubular; simple alveolar, simple branched alveolar and compound alveolar; and simple, simple branched and compound tubulo-alveolar. The glands the question books place in them are the intestinal glands (crypts) as simple tubular, the fundic glands of the stomach as simple branched tubular, the sweat gland as simple coiled tubular, the collecting system of the kidney as compound tubular, the sebaceous gland as simple branched alveolar, and the salivary glands as compound tubulo-alveolar.',
      objective:
        'Place a named gland in the combined classification, reading the duct term and the secretory-shape term separately.',
      pitfall:
        'Answering from the organ rather than from the architecture. The stomach and the intestine are neighbours and both have tubular glands, but the fundic gland branches at its base and the intestinal crypt does not, and that single difference is the whole answer.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'classification',
      aliases: ['Combined classification of exocrine glands', 'Simple coiled tubular', 'Compound tubulo-alveolar'],
      gaps: [
        'The department book prints the nine-way classification as diagrams with no organ named against any of them. Every organ example here comes from the question books, which are consistent with each other on all six.',
      ],
    },
    {
      key: 'goblet-cell-the-unicellular-exocrine-gland',
      label: 'The goblet cell is a unicellular exocrine gland: one flask-shaped mucous-secreting cell sitting within a surface epithelium',
      definition:
        'By number of cells an exocrine gland is unicellular, formed of a single cell, or multicellular. The goblet cell is the unicellular example: a single flask-shaped cell that secretes mucus onto a free surface, scattered within the pseudostratified columnar ciliated epithelium of the respiratory tract and within the simple columnar epithelium of the intestine. It is exocrine because its secretion reaches a surface, and it needs no duct because it already sits on one.',
      objective:
        'Identify the goblet cell as a unicellular mucous exocrine gland and say where it is found.',
      pitfall:
        'Calling it multicellular because it lives among many cells. The classification counts the cells that make the secretion, and there is exactly one.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'structural_description',
      aliases: ['Goblet cell', 'Unicellular gland', 'Mucous cell'],
    },
    {
      key: 'exocrine-glands-by-nature-of-secretion',
      label: 'By the nature of what they make, exocrine glands are watery, serous or mucous — and the parotid is the serous one',
      definition:
        'By the nature of its secretion an exocrine gland is watery, serous — a watery secretion containing enzymes — or mucous. The parotid gland is purely serous; a gland containing both kinds of secretory cell is called mucoserous or mixed in nature, which is a different sense of "mixed" from the exocrine-plus-endocrine one.',
      objective:
        'Classify a gland by the nature of its secretion, and recognise the parotid as the purely serous salivary gland.',
      pitfall:
        'Confusing the two meanings of mixed. A mucoserous gland is mixed in the nature of its secretion; a mixed gland proper is one with an exocrine part and an endocrine part.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'classification',
      aliases: ['Serous gland', 'Mucous gland', 'Mucoserous gland'],
      gaps: [
        'The department book names no gland against watery, serous or mucous. That the parotid is serous comes from the question books.',
      ],
    },
  ],

  questions: [
    {
      key: 'simple-branched-tubular-glands-1dd38032',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Attribute "branched" in a gland\'s name to the secretory part, not the duct.',
      explanations: {
        A: 'The commonest wrong answer, and the one the name invites. A branching duct is what "compound" means, and this gland has already been called simple, which settles the duct as unbranched.',
        B: 'An endocrine gland is ductless, so it cannot be described by duct branching at all. Every term in this name presupposes a duct.',
        C: 'Tubular and alveolar are alternatives, not companions: the secretory unit here is a tube, which is what the word tubular states.',
        D: 'Correct. Simple fixes the duct as unbranched and tubular fixes the secretory unit as a tube, so the only structure left for "branched" to describe is the secretory portion.',
      },
    },
    {
      key: 'exocrine-glands-d1a2a24a',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define an exocrine gland by its duct.',
      explanations: {
        A: 'Unicellular glands such as the goblet cell are exocrine, but so are the multicellular ones. This option mistakes one subdivision of exocrine glands for the whole class.',
        B: 'Diffusion into the blood is what an endocrine gland does, and it is precisely what having a duct makes unnecessary.',
        C: 'Correct. An exocrine gland has a secretory portion that makes the secretion and an excretory portion — the ducts — that carries it outside the gland.',
        D: 'Hormones are the endocrine product. An exocrine secretion is delivered to a surface or a lumen, not to the bloodstream.',
      },
    },
    {
      key: 'myo-epithelial-cells-are-870dc4a2',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        'Work out which glands can have myo-epithelial cells by asking whether the gland has a duct to squeeze secretion into.',
      explanations: {
        A: 'Correct. The salivary gland is exocrine, so it has ducts, and its acini are wrapped by myo-epithelial cells whose contraction drives the secretion into them. The mammary and sweat glands are the book\'s other two examples.',
        B: 'The thyroid is a ductless endocrine gland. Its follicular cells release their hormone into blood capillaries, so there is no duct to squeeze anything into and no myo-epithelial cell to do it.',
        C: 'The pancreas is the trap, because it is a mixed gland and its exocrine half really does have acini and ducts. The book\'s stated sites are the salivary, mammary and sweat glands, and it does not extend them to the pancreas.',
        D: 'Acting as a receptor is neuro-epithelium, the class next door. Myo-epithelium is modified to contract, which is a different one of the four modifications.',
      },
    },
    {
      key: 'sebaceous-gland-is-considered-as-ead10238',
      conceptKey: 'named-exocrine-glands-in-the-combined-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Place the sebaceous gland in the combined classification.',
      explanations: {
        A: 'Compound needs a branching duct. The sebaceous gland empties by a single short duct into a hair follicle, and its secretory units are rounded rather than tubular.',
        B: 'Correct. A single unbranched duct makes it simple, several rounded secretory units off that one duct make it branched, and the rounded shape makes it alveolar.',
        C: 'Right on the branching, wrong on the shape. The sebaceous secretory unit is a rounded sac, not a tube — this is the answer of a student who remembered "branched" and stopped there.',
        D: 'Compound tubulo-alveolar is the salivary gland. Two of the three terms are wrong here.',
      },
    },
    {
      key: 'the-compound-tubulo-alveolar-glands-are-present-in-b9971be1',
      conceptKey: 'named-exocrine-glands-in-the-combined-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name the gland that is compound tubulo-alveolar.',
      explanations: {
        A: 'The sweat gland is simple coiled tubular: one unbranched duct and a tube coiled up in the dermis.',
        B: 'Intestinal crypts are simple tubular — straight unbranched tubes opening on the surface, with no duct tree at all.',
        C: 'Correct. The salivary glands have a duct system that branches like a tree, and flask-shaped secretory units, which is what tubulo-alveolar names.',
        D: 'The fundic glands of the stomach are simple branched tubular: the duct does not branch, the secretory part does.',
      },
    },
    {
      key: 'a-male-old-patient-has-been-a-heavy-smoker-for-25-years-he-c-f42cf400',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Hard',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable from this leaf as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two separate faults. First, the question is metaplasia of the respiratory epithelium and belongs to the Surface Epithelium leaf, where that concept is declared; the extraction filed it here. Second, the recorded answer is wrong: squamous metaplasia turns bronchial epithelium into stratified squamous non-keratinised epithelium, which is the lining of the oesophagus — option B — and not the transitional epithelium of the urinary bladder that the book\'s key gives as D. Both need fixing before it is imported; correcting the leaf alone would import a wrong answer.',
    },
    {
      key: 'according-to-the-mode-of-secretion-the-exocrine-glands-class-1fc09469',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Match a classifying criterion to the set of categories it produces.',
      explanations: {
        A: 'Correct. Mode of secretion asks how much of the cell goes with the product, and the three answers are apocrine, holocrine and merocrine.',
        B: 'Mucous, serous and mucoserous is the classification by the *nature* of the secretion — what it is made of, rather than how it leaves.',
        C: 'Simple, branched and compound classify the duct, which is a question about the gland\'s architecture rather than its secretory mechanism.',
        D: 'Alveolar, tubular and tubuloalveolar classify the shape of the secretory part. The book has five criteria and this question names one of them; picking the wrong list is the standard error.',
      },
    },
    {
      key: 'according-to-their-function-there-are-two-major-types-of-epi-ee2369f3',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Separate epithelium that covers from epithelium that secretes.',
      explanations: {
        A: 'Cartilage is connective tissue, not epithelium. This option does not answer the question it was asked.',
        B: 'Holocrine and apocrine are modes of secretion within one class of epithelium, not two classes of epithelial tissue.',
        C: 'Transitional and pseudostratified are two types of *surface* epithelium, so both sit inside one of the answer\'s two categories.',
        D: 'Correct as this book puts it — covering epithelium and secretory epithelium. Note that the department book itself recognises four classes, adding neuro-epithelium and myo-epithelium to these two; a question offering only two is using the coarser split.',
      },
    },
    {
      key: 'aii-of-the-following-muscles-form-boundary-of-anatomical-snu-726ffb99',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Upper-limb anatomy — the boundaries of the anatomical snuffbox — filed under Glandular Epithelium by the extraction. Nothing about the row is damaged; it needs its `leaf` corrected to the hand or forearm leaf, after which it imports unchanged. Importing it here would attach a muscle question to a histology article.',
    },
    {
      key: 'all-are-true-about-goblet-cell-except-16f68ba6',
      conceptKey: 'goblet-cell-the-unicellular-exocrine-gland',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Recognise that the goblet cell is a gland of exactly one cell.',
      explanations: {
        A: 'True, so not the exception. Mucus is the goblet cell\'s product, which is why it is classed as a mucous gland.',
        B: 'True, so not the exception. The name describes the shape — a narrow base and a swollen mucus-filled apex.',
        C: 'The exception, and the answer. Picked by students who count the cells around it rather than the cells doing the secreting. A goblet cell is the book\'s example of a unicellular gland.',
        D: 'True, so not the exception. Goblet cells are scattered through the pseudostratified columnar ciliated epithelium of the airway, and through the simple columnar epithelium of the intestine.',
      },
    },
    {
      key: 'apocrine-gland-is-6d34b123',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the gland that loses the apex of its cells with its secretion.',
      explanations: {
        A: 'The goblet cell discharges mucus by exocytosis and stays intact, which is merocrine.',
        B: 'The salivary gland is the standard merocrine example — its cells lose nothing at all.',
        C: 'The sebaceous gland is holocrine: the whole cell disintegrates and becomes the secretion. This is one rung too far along the ladder.',
        D: 'Correct. The lactating mammary gland releases its lipid droplets wrapped in a piece of the apical cytoplasm, which is what apocrine means.',
      },
    },
    {
      key: 'compound-tubular-glands-are-present-in-3ba96cb9',
      conceptKey: 'named-exocrine-glands-in-the-combined-classification',
      difficulty: 'Hard',
      questionType: 'Classification',
      learningObjective: 'Name a compound tubular gland, where both terms have to be right at once.',
      explanations: {
        A: 'The pancreas has a branching duct system, so it is compound, but its secretory units are rounded acini — it is compound alveolar, not tubular.',
        B: 'The parotid is a salivary gland, compound tubulo-alveolar. The duct term is right and the shape term is not.',
        C: 'The prostate is compound tubulo-alveolar as well. It is chosen by students who know it is compound and stop there.',
        D: 'Correct. The kidney is the book\'s compound tubular example: a branching duct tree whose secretory units are tubes rather than rounded acini.',
      },
    },
    {
      key: 'concerning-the-classification-of-the-exocrine-glands-the-ter-e0e960e6',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Attribute the word "simple" to the duct.',
      explanations: {
        A: 'Correct. Simple means the duct does not branch. It says nothing about how many secretory units hang off it — a simple branched gland has several.',
        B: 'This describes an unbranched *secretory* part, which is what "simple" is routinely mistaken for. A simple branched gland is the counter-example: simple duct, several secretory units.',
        C: 'Tubular describes the shape of the secretory part, and is chosen from an adjacent list rather than from the one the question asked about.',
        D: 'Alveolar likewise describes shape. Neither shape term has anything to say about the duct.',
      },
    },
    {
      key: 'concerning-the-exocrine-glands-the-term-compound-refers-to-21aabc25',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Attribute the word "compound" to the duct alone.',
      explanations: {
        A: 'Correct. Compound means the duct branches like a tree, with each branch carrying its own secretory part.',
        B: 'A branching secretory part is what "branched" names, and it can occur under a simple duct — a simple branched gland is exactly that.',
        C: 'The tempting hedge. It is true that a compound gland has many secretory parts, but the word compound is defined on the duct, and choosing both makes the term unable to distinguish anything.',
        D: 'Alveolar is a shape term from a different criterion, and a compound gland may be tubular, alveolar or tubulo-alveolar.',
      },
    },
    {
      key: 'concerning-the-exocrine-glands-the-term-tubular-refers-to-6dbc7b91',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Attribute the word "tubular" to the shape of the secretory part.',
      explanations: {
        A: 'An unbranching duct is "simple". This is the answer to the neighbouring question in the same series, and the two are routinely swapped.',
        B: 'The number of secretory units is not what tubular describes; a gland can have one tube or many.',
        C: 'Correct. Tubular means the secretory unit is a tube, as against rounded (alveolar) or flask-shaped (tubulo-alveolar).',
        D: 'Alveolar is the alternative to tubular, not a synonym for it — the secretory unit is rounded rather than tube-like.',
      },
    },
    {
      key: 'concerning-the-myoepithelial-cells-all-the-statements-are-tr-01125b5c',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        'Reason from the duct: a gland with no duct has nothing for a myo-epithelial cell to expel secretion into.',
      explanations: {
        A: 'Treat as true, so not the exception. The question books describe myo-epithelial cells as spindle-shaped and basket-like around the acinus; the department book gives no shape, so this is not sourced to it.',
        B: 'Treat as true, so not the exception. Contractile proteins are what let the cell squeeze, though again the department book states only that the cell contracts and does not name actin and myosin.',
        C: 'True, so not the exception, and it is the one thing the department book does state — myo-epithelium is epithelium modified to contract.',
        D: 'The exception, and the answer. An endocrine gland is ductless: its secretion leaves through the blood capillaries beside it, so there is no duct to squeeze it into and no work for a myo-epithelial cell to do. They belong to exocrine glands — salivary, mammary and sweat.',
      },
    },
    {
      key: 'epithelial-and-connective-tissue-differ-from-each-other-in-w-12c0077d',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Comparison',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three of the four options are cut off mid-sentence — "connective tissue is avascular but epithelial tissue is well", "cells in epithelial tissue are closely packed, whereas in connective", "connective tissue includes tissue that makes up glands, but". The correct option cannot be read to its end, so the question cannot be sat. Recoverable by rescanning the page; the intended answer is the closely-packed-cells option. It is also filed under the wrong leaf — it compares epithelium with connective tissue in general.',
    },
    {
      key: 'fundic-glands-of-the-stomach-are-considered-as-fc19cb2e',
      conceptKey: 'named-exocrine-glands-in-the-combined-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Distinguish the fundic gland from the intestinal crypt by whether the secretory part branches.',
      explanations: {
        A: 'Simple tubular is the intestinal crypt: a straight unbranched tube. The trap is that both organs are in the gut and both have tubular glands.',
        B: 'Alveolar means a rounded secretory unit. The fundic gland is a tube running down through the mucosa.',
        C: 'Correct. The duct does not branch, so it is simple; the secretory portion divides at its base into several tubes, so it is branched; and the units are tubes, so it is tubular.',
        D: 'Compound requires a branching duct tree, which the fundic gland does not have — it opens directly into a gastric pit.',
      },
    },
    {
      key: 'glands-are-classified-according-to-the-presence-or-absence-o-f0aff1eb',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Match the duct criterion to the three classes it produces.',
      explanations: {
        A: 'Correct. A duct makes a gland exocrine, no duct makes it endocrine, and having both parts makes it mixed.',
        B: 'Serous and mucous classify the nature of the secretion, which is a different one of the book\'s five criteria.',
        C: 'Unicellular and multicellular classify exocrine glands by the number of secretory cells, and presuppose that the duct question has already been answered.',
        D: 'A hedge that is wrong because option A is exactly right. It is chosen when the three-way answer is misremembered as two-way, exocrine and endocrine only.',
      },
    },
    {
      key: 'glands-that-lose-their-upper-portion-of-cytoplasm-during-sec-2041e56f',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match the loss of the cell apex to apocrine secretion.',
      explanations: {
        A: 'Correct. Apocrine secretion is released together with the apex of the cell, so a piece of apical cytoplasm goes with the product.',
        B: 'Merocrine costs the cell nothing — the product leaves by exocytosis and the cell is unchanged.',
        C: 'Holocrine costs the cell everything. Losing the upper portion is the middle rung, not the last one.',
        D: 'Autocrine describes a cell that acts on itself, which is a signalling term and not one of the book\'s three modes of secretion.',
      },
    },
    {
      key: 'glands-that-release-their-secretion-by-exocytosis-is-c2780472',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction — merocrine, apocrine and holocrine — and the contract is four to five. The question itself is sound and its answer is merocrine. The three modes are all the options this question ever had in some books, so rescanning may confirm it was printed as a three-option item rather than recover a fourth; if so it stays unusable in this form, and the equivalent four-option question at `the-gland-which-releases-its-secretion-by-exocytosis-without-3326218b` is the one to use.',
    },
    {
      key: 'glands-whose-ducts-have-many-branches-are-called-2d50f594',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name the gland whose duct branches.',
      explanations: {
        A: 'Simple is the opposite: a duct that does not branch.',
        B: 'Correct. A branching duct tree is what compound means.',
        C: '"Branched" is reserved for a branching secretory portion, and it is the word this question is designed to make you reach for wrongly.',
        D: 'Alveolar describes the shape of the secretory unit and says nothing about the duct.',
      },
    },
    {
      key: 'glandular-epithelium-is-classified-according-to-mode-of-secr-55c52d1c',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Pair each mode of secretion with the right amount of cell loss.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Each option pairs a mode with a description, and only D pairs them correctly: holocrine is the mode in which the whole cell is destroyed. A gives merocrine\'s description to apocrine, B gives apocrine\'s to merocrine, and C gives holocrine\'s to merocrine.',
      explanations: {
        A: 'The description belongs to merocrine, not apocrine. In apocrine secretion the cell does change — it loses its apex.',
        B: 'Backwards. Losing the apex of the cell is apocrine; merocrine leaves the cell untouched.',
        C: 'Destruction of the whole cell is holocrine. This is the same swap as B, one rung further along.',
        D: 'Correct. Holocrine secretion accumulates in the cell until the swollen cell ruptures and the whole cell is lost with the product.',
      },
    },
    {
      key: 'goblet-cell-is-an-example-of-all-of-the-followings-except-aa57d99d',
      conceptKey: 'goblet-cell-the-unicellular-exocrine-gland',
      difficulty: 'Hard',
      questionType: 'Classification',
      learningObjective: 'Separate what the goblet cell is from the epithelium it sits in.',
      explanations: {
        A: 'True, so not the exception. One cell doing the secreting is exactly what unicellular means.',
        B: 'True, so not the exception. Its product is mucus, which makes it a mucous gland.',
        C: 'The exception, and the answer, and a fine trap: goblet cells really do sit within simple columnar epithelium in the intestine. But "simple columnar secretory epithelium" names the surface epithelium around the cell, not the cell itself, and the goblet cell is also found in pseudostratified columnar ciliated epithelium, where that description would be wrong outright.',
        D: 'True, so not the exception. Its secretion reaches a free surface rather than the blood, which makes it exocrine.',
      },
    },
    {
      key: 'have-contractile-function-92b0c8ff',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The answer is myo-epithelium and the question tests the four functional classes of epithelium against each other, which is a Myo Epithelium and Surface Epithelium concept rather than a glandular one. Importing it here would have to point it at a gland classification it does not test. Correct the bank\'s `leaf` and it imports unchanged.',
    },
    {
      key: 'holocrine-gland-is-6667084b',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the gland that loses whole cells with its secretion.',
      explanations: {
        A: 'The goblet cell secretes by exocytosis and survives it, which is merocrine.',
        B: 'The salivary gland is merocrine — the standard example of the mode that costs the cell nothing.',
        C: 'Correct. Sebum is disintegrated sebaceous cells: the cell fills with lipid, swells, ruptures and becomes the secretion.',
        D: 'The lactating mammary gland is apocrine, losing only the apex. Chosen by students who know it loses something and do not check how much.',
      },
    },
    {
      key: 'holocrine-secretion-4cd48587',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State how much of the cell holocrine secretion destroys.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. Holocrine secretion is defined as the whole cell being lost with the product, which is option B; A is false because holocrine is a mode of exocrine secretion, and C and D are the definitions of apocrine and merocrine.',
      explanations: {
        A: 'Modes of secretion are a classification of *exocrine* glands. An endocrine gland is ductless and releases hormone into blood; it has no holocrine form.',
        B: 'Correct. The product accumulates, the swollen cell ruptures, and the whole cell is lost with the secretion.',
        C: 'Destruction of the apical part is apocrine — one rung short.',
        D: 'No change in the secretory cell is merocrine, the commonest mode and the opposite extreme from this one.',
      },
    },
    {
      key: 'if-part-of-the-apical-cytoplasm-is-released-with-secretion-o-bba56b52',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match the loss of apical cytoplasm to apocrine secretion.',
      explanations: {
        A: 'Merocrine secretion leaves the cell intact; nothing of the cytoplasm goes with the product.',
        B: 'Correct. Apocrine means the apex goes with the secretion, which is exactly what the stem describes.',
        C: 'Holocrine loses the entire cell, not part of it.',
        D: 'Endocrine is a classification by duct, not by mode. It answers a different criterion altogether, and is chosen when the "-crine" ending is read as if all four words belonged to one list.',
      },
    },
    {
      key: 'ina-gland-entire-cells-break-down-to-form-the-secretion-f7cf9770',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match whole-cell destruction to holocrine secretion.',
      explanations: {
        A: 'Exocrine is the class of gland, not the mode. All three modes below are exocrine, so this cannot distinguish anything.',
        B: 'Merocrine costs the cell nothing at all — the far end of the ladder from this stem.',
        C: 'Correct. Entire cells breaking down to become the product is the definition of holocrine secretion.',
        D: 'Autocrine is a signalling term for a cell acting on itself and is not one of the book\'s three modes.',
      },
    },
    {
      key: 'intestinal-glands-are-considered-as-3897521d',
      conceptKey: 'named-exocrine-glands-in-the-combined-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Place the intestinal crypt in the combined classification.',
      explanations: {
        A: 'Correct. The intestinal crypt is a straight unbranched tube opening on the surface — simple duct, tubular secretory part, no branching.',
        B: 'Simple branched tubular is the fundic gland of the stomach. The two are the classic pair, and the whole difference is whether the secretory part divides at its base.',
        C: 'Compound requires a branching duct tree, which the intestine\'s crypts do not have.',
        D: 'Simple coiled tubular is the sweat gland, whose tube is coiled up in the dermis. The intestinal crypt is straight.',
      },
    },
    {
      key: 'lactating-mammary-gland-release-their-secretion-by-3d6f197d',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options — merocrine, apocrine, holocrine — and the contract is four to five. The answer is apocrine. This is one of a run of four questions in the same book printed with the three modes as the whole option set; rescanning will show whether a fourth option was lost or never existed. The four-option equivalent is `one-of-the-following-glands-is-considered-as-apocrine-gland-1cad8c5d`.',
    },
    {
      key: 'merocrine-gland-is-99b351ba',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the gland whose cells lose nothing when they secrete.',
      explanations: {
        A: 'The goblet cell is in fact merocrine as well, which makes this option arguable rather than plainly wrong. The salivary gland is the example the books intend, and the one that appears in the answer key.',
        B: 'Correct. The salivary gland discharges its secretion by exocytosis with no change in the secretory cell, which is merocrine and the commonest mode.',
        C: 'The sebaceous gland is holocrine: the cell is the secretion.',
        D: 'The lactating mammary gland is apocrine, losing the apex of each cell with the milk fat.',
      },
    },
    {
      key: 'mixed-gland-is-a-mixture-of-6272fad4',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define a mixed gland by the two secretory arrangements it contains.',
      explanations: {
        A: 'Correct. A mixed gland has an exocrine part with a duct system and an endocrine part without, the pancreas being the example.',
        B: 'Simple and compound are two forms of exocrine duct. A gland is one or the other, and no gland is called mixed for having both.',
        C: 'Unicellular and multicellular is another exocrine subdivision, and again not what "mixed" refers to.',
        D: 'Stroma and parenchyma are the supporting and working tissue of any organ, so every gland is a mixture of them. The word tells you nothing, which is what makes it a plausible-sounding distractor.',
      },
    },
    {
      key: 'modify-to-give-secretion-83519986',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify the class of epithelium that is modified to secrete.',
      explanations: {
        A: 'Surface epithelium covers surfaces and lines cavities. Some of its cells secrete — the goblet cell does — but the class is defined by covering.',
        B: 'Correct. Glandular epithelium is by definition epithelium modified to act as a gland and produce secretion.',
        C: 'Neuro-epithelium is modified to receive a stimulus, not to make a product.',
        D: 'Myo-epithelium is modified to contract, and it acts on secretion made by somebody else.',
      },
    },
    {
      key: 'most-common-mechanism-secretion-discharged-with-no-change-in-a099caeb',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name the commonest mode of secretion and state what it costs the cell.',
      explanations: {
        A: 'Apocrine costs the cell its apex, so there is a change in the secretory cell — and it is much the rarer arrangement.',
        B: 'Correct. Merocrine secretion is discharged by exocytosis with no change in the cell, and the book names it the most common mode.',
        C: 'Holocrine destroys the cell entirely, which is the largest change of the three.',
        D: 'A hedge with no reason to be chosen: merocrine answers the stem exactly.',
      },
    },
    {
      key: 'one-of-the-following-glands-is-considered-as-apocrine-gland-1cad8c5d',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the apocrine gland among four named glands.',
      explanations: {
        A: 'Sebaceous glands are holocrine — the whole cell becomes sebum.',
        B: 'Correct. The mammary gland releases milk fat wrapped in the apex of the cell, which is apocrine.',
        C: 'Salivary glands are merocrine, losing nothing.',
        D: 'The exocrine pancreas is merocrine too; it is chosen when a student is looking for something unusual and picks the gland that is unusual for a different reason — it is the mixed gland.',
      },
    },
    {
      key: 'one-of-the-following-is-an-endodermal-derivative-2018-ac-ad-d4ae24f9',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An embryology question about germ-layer derivatives, filed here by the extraction, and printed with no answer key. Its stem also carries OCR noise ("(2018) Ac ad Ac ad ad ad"). It belongs to a development leaf; correcting the `leaf` and establishing the answer are both needed before it can be imported.',
    },
    {
      key: 'one-of-the-following-regarding-the-movements-of-thumb-is-fal-47a50162',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Upper-limb anatomy — the muscles moving the thumb — filed under Glandular Epithelium. The stem and option D also carry OCR noise ("(2022) em em em em em", ".P Ac ad"). Needs its `leaf` corrected to the hand leaf and the noise cleaned before import.',
    },
    {
      key: 'parotid-gland-is-considered-e538647c',
      conceptKey: 'exocrine-glands-by-nature-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify the parotid by the nature of its secretion.',
      explanations: {
        A: 'Mucous is the sublingual gland\'s predominant character, not the parotid\'s. A mucous secretion is viscid and carries no enzymes.',
        B: 'Correct. The parotid is purely serous — a watery secretion containing enzymes, which is what serous means in this classification.',
        C: 'Mucoserous is the submandibular gland, which has both cell types. Chosen by students who know the three salivary glands differ and cannot recall which is which.',
        D: 'Unicellular is a classification by cell number and would make the parotid a single cell. The only unicellular gland the book names is the goblet cell.',
      },
    },
    {
      key: 'regarding-myo-epithelium-one-of-the-following-statements-is-ba1fa98c',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A myo-epithelium question — its answer is that the cells contract, and its distractors are the cell\'s position and the neuro-epithelial function. The concept it tests is declared on the Myo Epithelium leaf, and the emitter only lets a question reference a concept declared on its own leaf. Correct the bank\'s `leaf` field and it imports unchanged against `myoepithelial-cell-basal-position-and-secretion-squeeze`.',
    },
    {
      key: 'salivary-glands-are-considered-as-0-7100e1fe',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An OCR-damaged copy of the same question: the stem trails a stray "0" and option B carries a broken table rule ("Holocrine glands |"). The clean copy is `salivary-glands-are-considered-as-1ca64e78`, which is the one to use. Kept here so that whoever rescans this page knows the row is a duplicate rather than a separate question.',
    },
    {
      key: 'salivary-glands-are-considered-as-1ca64e78',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Classify the salivary gland by mode of secretion when a shape term is also on offer.',
      explanations: {
        A: 'Correct. Salivary secretion leaves by exocytosis with no change in the secretory cell, which is merocrine — and merocrine is the commonest mode.',
        B: 'Holocrine is the sebaceous gland, where the whole cell is lost.',
        C: 'Apocrine is the lactating mammary gland, which loses the apex of its cells.',
        D: 'The interesting distractor, because it is not false — the salivary gland *is* compound tubulo-alveolar. It answers a different criterion, though: this option classifies by architecture where the other three classify by mode, and a question whose other options are all modes is asking about mode.',
      },
    },
    {
      key: 'salivary-glands-is-an-example-of-7eed0946',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that one gland is classified under several criteria at once.',
      explanations: {
        A: 'True, but not the whole answer. The salivary gland has ducts, so it is exocrine.',
        B: 'False. An endocrine gland is ductless and sends its product into the blood; salivary secretion goes down a duct into the mouth.',
        C: 'True, but not the whole answer. It secretes by exocytosis without losing any of the cell, so it is merocrine.',
        D: 'Correct. The criteria are independent, and the same gland is exocrine under one and merocrine under another. A student who stops at the first true option has answered half the question.',
      },
    },
    {
      key: 'salivary-glands-release-their-secretion-by-506e6981',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only — merocrine, apocrine, holocrine — against a contract of four to five. The answer is merocrine. One of the same run of three-option items in this book; `merocrine-gland-is-99b351ba` asks the same thing with four options and is the copy to use.',
    },
    {
      key: 'sebaceous-glands-release-their-secretion-by-e5a26d3e',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, from the same run as the salivary and mammary items above. The answer is holocrine. `holocrine-gland-is-6667084b` asks the same thing with four options and is the copy to use.',
    },
    {
      key: 'secretion-is-come-out-with-all-cell-ce99aead',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match whole-cell loss to holocrine secretion.',
      explanations: {
        A: 'Apocrine loses the apex only, which is the middle of the three.',
        B: 'Merocrine loses nothing; the cell is unchanged by secreting.',
        C: 'Correct. In holocrine secretion the swollen cell ruptures and the whole cell goes out with the product.',
        D: 'There is a mode that fits the stem exactly, so a hedge cannot be right here.',
      },
    },
    {
      key: 'secretion-is-come-out-with-apex-of-cell-ce86914e',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match loss of the cell apex to apocrine secretion.',
      explanations: {
        A: 'Correct. Apocrine secretion is released together with the apex of the cell.',
        B: 'Merocrine costs the cell nothing — exocytosis leaves the membrane and cytoplasm intact.',
        C: 'Holocrine costs the whole cell, not just its apex.',
        D: 'Apocrine answers the stem exactly, so the hedge is not needed.',
      },
    },
    {
      key: 'single-duct-with-non-branching-secretory-cell-64f84d4a',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the gland in which neither the duct nor the secretory part branches.',
      explanations: {
        A: 'Correct. One unbranched duct makes it simple, and a secretory part that does not divide makes it non-branched.',
        B: 'Compound requires the duct to branch, which the stem has ruled out.',
        C: 'Tubular is a shape term from the other criterion, and the stem says nothing about shape.',
        D: 'A hedge that cannot hold, since compound directly contradicts the single unbranched duct in the stem.',
      },
    },
    {
      key: 'site-of-cubical-epithelium-17cb77bb',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question — the sites of simple cubical epithelium — filed under Glandular Epithelium because two of its three sites happen to be glands. Its concept is declared on the Surface Epithelium leaf. Correct the bank\'s `leaf` and it imports unchanged.',
    },
    {
      key: 'stratified-columnar-non-ciliated-is-present-in-b307eec4',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question about the sites of stratified columnar non-ciliated epithelium — recto-anal junction, large ducts of glands, penile urethra — filed here presumably because one of its sites is a gland duct. Its concept is declared on the Surface Epithelium leaf. Correct the `leaf` and it imports unchanged.',
    },
    {
      key: 'stratified-squamous-epithelium-34-parotid-gland-is-considere-ec6e2cc6',
      conceptKey: 'exocrine-glands-by-nature-of-secretion',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The page break has been swallowed: the stem is the tail of the previous question ("Stratified squamous epithelium.") welded to the number and stem of this one, and option D carries the whole of the *next* question inside it ("Simple coiled tubular. 36. The compound alveolar glands are met with in: a, Salivary glands."). Three questions in one row. The parotid question itself survives intact at `parotid-gland-is-considered-e538647c`; the compound-alveolar question buried in option D is not in the bank as a row of its own and is worth recovering when this page is rescanned.',
    },
    {
      key: 'suprascapular-nerve-supplies-dep-book-2021-ac-ad-ac-ad-ad-ad-9f129c6c',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Upper-limb anatomy — the distribution of the suprascapular nerve — filed under Glandular Epithelium, with OCR noise in the stem ("(DEP BOOK - 2021) Ac ad Ac ad ad ad"). Belongs to the shoulder or nerve-supply leaf.',
    },
    {
      key: 'suprascapular-nerve-supplies-dep-book-p-vi-ad-538f528f',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same anatomy question again, from a second book, also filed here, also with OCR noise ("P Vi ad", "abduction of arm.Ac") and with no answer printed. Both copies need the same `leaf` correction; this one needs an answer established as well.',
    },
    {
      key: 'the-epithelium-that-lines-the-abdominal-cavity-peritoneum-se-2cbe65f8',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question — mesothelium as the lining of the serous membranes — filed under Glandular Epithelium. Its concept is declared on the Surface Epithelium leaf, where the same question is asked several times over. Correct the `leaf` and it imports unchanged.',
    },
    {
      key: 'the-following-fact-is-true-of-the-serratus-anterior-muscle-2-7b2bb4b5',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Upper-limb anatomy — the serratus anterior — filed under Glandular Epithelium, with OCR noise in the stem and in option D. Belongs to the pectoral region or shoulder leaf.',
    },
    {
      key: 'the-following-is-lined-by-simple-cubical-epithelium-69db8daa',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question — which of four organs is lined by simple cubical epithelium — filed here because the answer is the thyroid. Its concept is declared on the Surface Epithelium leaf. Correct the `leaf` and it imports unchanged.',
    },
    {
      key: 'the-gland-which-releases-its-secretion-by-exocytosis-without-3326218b',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name the mode in which the cell is unchanged by secreting.',
      explanations: {
        A: 'Correct. Merocrine secretion is discharged by exocytosis with no change in the secretory cell.',
        B: 'Apocrine loses the apex of the cell with the product, so the cell is changed.',
        C: 'Holocrine loses the whole cell.',
        D: 'Eccrine is not one of the three modes this book recognises. Where a question book uses it, it means merocrine — which is why this option is the hardest of the four to dismiss, and why it is worth knowing the department book\'s list is three long.',
      },
    },
    {
      key: 'the-most-common-type-of-secretion-of-exocrine-cells-is-1672f518',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State which mode of secretion is the commonest.',
      explanations: {
        A: 'The book is explicit that one mode predominates, so an even split is not the answer. It is chosen when the fact was never learnt and the option sounds cautious.',
        B: 'Correct. Merocrine is stated to be the most common mode, which fits: it is the only one that costs the cell nothing and can therefore be repeated indefinitely.',
        C: 'Holocrine destroys a cell per secretion and is confined to a few glands such as the sebaceous.',
        D: 'Apocrine is likewise uncommon, and the lactating mammary gland is its one everyday example.',
      },
    },
    {
      key: 'the-right-thoracic-duct-drains-the-ipka-7e4611d8',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A lymphatic anatomy question, filed under Glandular Epithelium — presumably because the word "duct" appears in it, which is exactly the sort of collision the extraction makes. Printed with no answer, and option D carries OCR noise. Needs a `leaf` correction and an answer before import.',
    },
    {
      key: 'the-secretions-of-endocrine-glands-are-released-directly-f59cb2ce',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State where an endocrine gland delivers its secretion.',
      explanations: {
        A: 'Delivery onto a surface is exocrine, and the skin is where several exocrine glands empty — sweat and sebaceous among them.',
        B: 'Correct. An endocrine gland is ductless; its hormone passes into the blood capillaries beside the secretory cells and is carried to distant parts of the body.',
        C: 'A gland duct is precisely what an endocrine gland does not have. This is the definition of the class it is being distinguished from.',
        D: 'Release into brain tissue would make the gland a neurosecretory structure with a local target. The defining feature of an endocrine gland is that the blood carries its product *away*.',
      },
    },
    {
      key: 'the-thoracic-duct-drains-ee7d8e41',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two faults at once. It is a lymphatic anatomy question filed under Glandular Epithelium, and option C was lost in extraction — the row runs A, B, D — leaving three options against a contract of four to five. Needs both a `leaf` correction and a rescan.',
    },
    {
      key: 'the-type-of-secretion-in-which-cells-lose-part-of-their-cyto-da71b4d5',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match partial loss of cytoplasm to apocrine secretion.',
      explanations: {
        A: 'Merocrine cells lose no cytoplasm at all.',
        B: 'Correct. Losing part of the cytoplasm — the apex — with the product is apocrine.',
        C: 'Holocrine cells lose all of their cytoplasm, along with everything else.',
        D: 'Cytocrine is not one of the book\'s modes. It is a real term for pigment transfer from melanocyte to keratinocyte, and here it functions purely as a plausible-sounding fourth "-crine".',
      },
    },
    {
      key: 'what-is-a-gland-called-if-it-has-a-branched-duct-50330a03',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived — simple, compound, tubular — against a contract of four to five. The answer is compound. `glands-whose-ducts-have-many-branches-are-called-2d50f594` asks the same thing with four options and is the copy to use; rescanning this page would show whether a fourth option was printed.',
    },
    {
      key: 'when-the-cell-is-expelled-as-a-secretory-product-which-term-f8c998f7',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match expulsion of the whole cell to holocrine secretion.',
      explanations: {
        A: 'Merocrine expels only the product; the cell stays where it is.',
        B: 'Apocrine expels the apex of the cell along with the product, which is part of the cell rather than the cell.',
        C: 'Correct. When the cell itself is the secretory product, the mode is holocrine.',
        D: 'Cytocrine is not one of the three modes, despite the "cyto-" making it sound like the one that involves whole cells. That resemblance is the trap.',
      },
    },
    {
      key: 'where-are-usually-myoepithelial-cells-7a87306f',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A myo-epithelium question, testing only where the cell sits relative to the secretory cells and the basement membrane. Its concept, `myoepithelial-cell-basal-position-and-secretion-squeeze`, is declared on the Myo Epithelium leaf. Two of its four options are also truncated mid-phrase ("between secretory cells & the basement", "the layer which is closest to the"), so it needs a rescan as well as a `leaf` correction.',
    },
    {
      key: 'which-of-the-following-glands-eliminates-its-complete-cells-37a9aeaf',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Match elimination of complete cells to holocrine secretion.',
      explanations: {
        A: 'Merocrine eliminates no cells; that is what makes it repeatable and the commonest mode.',
        B: 'Apocrine eliminates the apical part of a cell, not the complete cell.',
        C: 'Correct. Holocrine glands lose the entire cell with the secretion, and replace it from a basal reserve.',
        D: 'Endocrine answers a different criterion — presence of a duct — and no endocrine gland is described by any of the three modes.',
      },
    },
    {
      key: 'which-of-the-following-is-an-example-of-mixed-gland-3a0b2fe1',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name the gland that has both an exocrine and an endocrine part.',
      explanations: {
        A: 'The thyroid is purely endocrine. Its follicles look like secretory units with a lumen, which is what makes it tempting, but nothing leaves them by a duct.',
        B: 'The salivary gland is purely exocrine, and "mixed" is being read here in its other sense — a mucoserous secretion. That double meaning is the trap the question is built on.',
        C: 'Correct. The pancreas has exocrine acini draining through a duct system and endocrine islets releasing insulin and glucagon into the blood, which is the definition of a mixed gland.',
        D: 'A hedge that is wrong because the pancreas is exactly the example the classification was written for.',
      },
    },
    {
      key: 'which-type-of-the-epithelium-has-supporting-cells-e12c14ba',
      conceptKey: 'glands-classified-by-presence-of-duct',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a glandular epithelium question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The answer is neuro-epithelium — the taste bud\'s supporting (sustentacular) cells — so the question belongs to the Neuro Epithelium leaf, where that concept is declared. Worth flagging separately: the department book\'s neuro-epithelium section is three bullet points and never mentions supporting cells, so even in the right leaf this question tests something no source in this corpus states. It needs an evidence note as well as a `leaf` correction.',
    },
    {
      key: 'apocrine-secretion-refers-to-43576108',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Define apocrine secretion by what the cell loses with its product.',
      answerOverride: 'c',
      answerOverrideReason:
        'The 2020 paper printed no key and the highlight recovery does not cover that sitting, so the answer comes from the department book, which defines the three modes in one line each: merocrine discharges by exocytosis with no change in the cell, apocrine releases the secretion with the apex of the cell, and holocrine loses the whole cell.',
      explanations: {
        a: 'The most common mode is merocrine, which is how most glands work most of the time. Apocrine costs the cell part of itself and is therefore the less usual arrangement.',
        b: 'No change in the secretory cell is merocrine, where the product leaves by exocytosis and the membrane is restored. Apocrine takes the apex away with the secretion, so there is a change by definition.',
        c: 'Correct. In apocrine secretion the apical part of the cytoplasm is pinched off and leaves with the product — the prefix apo-, meaning off or away, is the whole definition.',
        d: 'Losing the whole cell is holocrine, as in the sebaceous gland. The three modes form a ladder of how much of the cell is spent, and this option is one rung past the answer.',
      },
    },
    {
      key: 'simple-branched-gland-explains-that-the-ed2afc3d',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Say which part of a simple branched gland is branched.',
      answerOverride: 'b',
      answerOverrideReason:
        'No key was printed on the 2021 paper and none was recovered for it, so the answer is worked from the department book: a simple gland is one with a single non-branching duct, and it is called simple branched when only the secretory portion branches. Simple always describes the duct, and branched always describes the secretory part.',
      explanations: {
        a: 'This inverts the naming. A branched duct makes the gland compound, and the word simple would then be wrong — the two halves of the name cannot both refer to the duct.',
        b: 'Correct. "Simple" fixes the duct as unbranched and "branched" then has only the secretory portion left to describe.',
        c: 'Neither part branching is a plain simple gland — simple tubular or simple alveolar — with no second word at all. Adding "branched" to the name has to mean something.',
        d: 'Both branching is a compound gland, and a compound gland is never called simple. This is the option for a student reading "branched" as a property of the whole gland.',
      },
    },
    {
      key: 'regarding-merocrine-secretion-2e8e53fc',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Define merocrine secretion and say how common it is.',
      answerOverride: 'd',
      answerOverrideReason:
        'The 2021 paper carried no key and no highlight was recovered for that sitting, so the answer is taken from the department book, which gives merocrine as the most common mode, discharged by exocytosis with no change in the secretory cell. Option b is the same sentence with "least" substituted for "most", which is what makes it the item\'s trap.',
      explanations: {
        a: 'The whole cell coming out with the secretion is holocrine — the sebaceous gland, where the swollen cell ruptures and is lost entirely.',
        b: 'Merocrine is the most common mode, not the least. Only one word separates this option from a true statement, and it is the word the examiner changed.',
        c: 'The apical part leaving with the secretion is apocrine. The three modes are one question asked three ways in these papers, and each mode appears as a distractor in the others.',
        d: 'Correct. In merocrine secretion the product leaves by exocytosis, the vesicle membrane fuses with the cell membrane and is recovered, and the cell is unchanged — which is why it can secrete indefinitely.',
      },
    },
    {
      key: 'regarding-holocrine-mode-of-glandular-secretion-33bc2ea4',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The correct option and a distractor have been merged into one entry. The candidate\'s pen crossed the letter of option d on this 2022 script, so the bank holds option c as "The whole cell is lost with secretion. =\" i, No change in secretory cells." — the answer the department book gives for holocrine secretion, run together with the merocrine option that is meant to be its rival. A student choosing that entry would be choosing both a true and a false statement at once. Recoverable by rescanning page 3 of the 2022 paper, after which it becomes a clean duplicate of the 2024 row below.',
    },
    {
      key: 'regarding-the-holocrine-mode-of-dine-tion-lar-secre-2z-no-ch-83b7c46d',
      conceptKey: 'exocrine-gland-modes-of-secretion',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No options in the bank row, and the stem itself is broken up ("Regarding the holocrine mode of dine tion: lar secre"). All four options were read into it after the pen crossed their letters, and they remain legible there: No change in secretory cells, Apex of cell come out with secretion, The whole cell is lost with secretion, The most common type. The department book makes the third of those the answer. A question with an empty option map cannot be emitted, so the row waits on a rescan of page 3 of the 2024 paper.',
    },
  ],
}
