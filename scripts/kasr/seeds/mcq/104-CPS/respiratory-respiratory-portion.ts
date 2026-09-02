import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Respiratory System — Respiratory Portion Pneumocytes",
  modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
  articleId: "ART-104-HIS-RESPIRATORY-PORTION",

  concepts: [
    {
      key: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      label: "Type I pneumocytes are flat cells covering 97% of the alveolar surface for gas exchange; type II are cuboidal surfactant-secreting stem cells",
      definition: "Type I pneumocytes (squamous alveolar cells) cover about 97% of the alveolar surface. By light microscopy they are flat squamous cells with flat nuclei and little cytoplasm; by electron microscopy they show few organelles in the perinuclear region and small pinocytic vesicles that turn over pulmonary surfactant, and they hold tight junctions with both other type I and type II cells. Their function is to provide a very thin wall for gas exchange and, through those tight junctions, to prevent leakage of tissue fluid into the alveolar cavity. Type II pneumocytes (great alveolar cells) cover only about 3% of the surface. They are cuboidal cells bulging into the air space, with central rounded nuclei and foamy cytoplasm; by electron microscopy they are rich in mitochondria, ribosomes, rough endoplasmic reticulum and a well-developed Golgi body, with membrane-bound multilamellar bodies (cytosomes) and a free surface bearing short microvilli. Their function is to secrete pulmonary surfactant and to act as the stem cell for both pneumocyte types.",
      objective: "Contrast type I and type II pneumocytes by the fraction of alveolar surface each covers, their light- and electron-microscopic appearance, and their function.",
      pitfall: "Assuming the cell covering most of the alveolar surface must be the more metabolically active one. It is the reverse: the type I cell is a thin, organelle-poor wall built purely for diffusion, while the much rarer type II cell carries the secretory machinery and is also the stem cell for both types.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "comparison",
      aliases: ["Type I pneumocyte", "Type II pneumocyte", "Squamous alveolar cell", "Great alveolar cell"],
    },
    {
      key: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      label: "The respiratory portion runs respiratory bronchiole -> alveolar duct -> alveolar sac -> alveolus; the respiratory bronchiole, not the alveolar duct, is the true conducting-to-respiratory transition, and pores of Kohn give collateral air circulation",
      definition: "The respiratory portion runs, in order, from respiratory bronchiole to alveolar duct to alveolar sac to alveolus. Respiratory bronchioles are the transition from the conducting portion — the first part of the respiratory tree where gas exchange can occur, since some alveoli already open directly from their wall — while keeping a cuboidal, ciliated (Clara-cell-bearing) epithelium that still looks like conducting-portion lining; the true conducting-to-respiratory boundary sits here, not at the alveolar duct, and terminal bronchioles (purely conducting) are never part of the respiratory zone. Alveolar ducts are the free terminations of the respiratory bronchioles, lined completely by alveolar openings, with smooth muscle only at those openings; alveolar sacs are groups of adjacent alveoli sharing a central space, and both ducts and sacs are lined by alveolar epithelium alone, with the alveolar duct's mouth-sphincter smooth muscle disappearing by the level of the sacs and individual alveoli. Alveolar pores (of Kohn) connect adjoining alveolar walls, equalising pressure between alveoli and providing collateral air circulation when a bronchiole is obstructed.",
      objective: "State the respiratory portion's four-part sequence (respiratory bronchiole, alveolar duct, alveolar sac, alveolus), identify the respiratory bronchiole -- not the alveolar duct or a terminal bronchiole -- as the true conducting-to-respiratory transition, and state the function of the pores of Kohn.",
      pitfall: "Placing the conducting-to-respiratory transition at the alveolar duct, or including the terminal bronchiole in the respiratory zone. The respiratory bronchiole is already gas-exchanging tissue -- its wall is interrupted by the first alveolar openings -- while the terminal bronchiole, one step upstream, is purely conducting and never part of the respiratory zone.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "definition",
      aliases: ["Respiratory portion sequence", "Pores of Kohn", "Respiratory bronchiole transition", "Alveolar duct and sac"],
    },
    {
      key: "blood-air-barrier.four-layers",
      label: "The blood-air barrier is four layers -- surfactant film, type I pneumocyte, fused basal lamina, capillary endothelium -- and deliberately excludes the type II pneumocyte",
      definition: "The blood-air barrier is the four-layer path across which gas exchange actually happens: the surfactant film on the alveolar surface, the type I pneumocyte, the fused basal lamina of that pneumocyte and the capillary endothelial cell, and the capillary endothelial cell itself. Type II pneumocytes are deliberately not part of this barrier -- their cuboidal, organelle-rich structure would be far too thick to support efficient, rapid gas diffusion, so despite sitting in the alveolar epithelium they are excluded from the thin diffusion path in a way that catches students who assume every pneumocyte type belongs to it.",
      objective: "List the four layers of the blood-air barrier (surfactant film, type I pneumocyte, fused basal lamina, capillary endothelium) and state that type II pneumocytes are not one of them.",
      pitfall: "Assuming every alveolar epithelial cell type belongs to the blood-air barrier. Type II pneumocytes sit in the alveolar wall but are excluded from the barrier itself -- their cuboidal, organelle-rich structure is too thick for the barrier's job of rapid diffusion, which only the thin type I pneumocyte can do.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "structure_function_relationship",
      aliases: ["Blood-air barrier", "Respiratory membrane layers", "Four-layer diffusion barrier"],
    },
    {
      key: "interalveolar-septum.composition",
      label: "Interalveolar septa are delicate, capillary-rich connective-tissue partitions with elastic and reticular fibres and resident phagocytes -- not smooth muscle, not collagen-supported, and not avascular",
      definition: "The interalveolar septum is the delicate connective-tissue partition separating adjacent alveoli. It carries the richest capillary network in the body, elastic fibres that assist lung expansion, reticular fibres that prevent overexpansion from injuring the capillaries, and extravasated monocytes that become the septum's own resident alveolar phagocytes (dust cells and heart-failure cells). It is not smooth-muscle tissue, not supported chiefly by collagen, and not avascular -- describing it that way reverses its actual composition.",
      objective: "State that interalveolar septa are delicate connective-tissue partitions carrying a dense capillary network, elastic and reticular fibres, and resident phagocytes -- not smooth muscle, not collagen-supported, and not avascular.",
      pitfall: "Assuming the interalveolar septum is supported the way a conducting airway wall is, with smooth muscle or collagen as the main structural element. It is instead a delicate, capillary-rich connective-tissue partition whose fibre content (elastic and reticular) serves lung mechanics and capillary protection, not structural rigidity.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "definition",
      aliases: ["Interalveolar septum", "Alveolar septum composition"],
    },
    {
      key: "respiratory-portion.clinical-correlations",
      label: "Emphysema is permanent alveolar enlargement from interalveolar-septal destruction by dust-cell protease/elastase, unleashed by smoking; a congenital anomaly can instead present as alveolar dilatation from birth",
      definition: "Two disease processes trace directly to the respiratory portion's normal structure. Emphysema is permanent, abnormal enlargement of the air spaces from destruction of the interalveolar septa, driven by protease and elastase enzymes secreted by dust cells -- normally kept in check by protective proteins that cigarette smoking inhibits, unleashing the same dust cell that ordinarily just clears inhaled particles. A congenital anomaly presenting as dilatation of the terminal or larger alveoli is a form of congenital cystic disease of the lung, distinct from a chest-wall or gas-exchange functional problem -- a structural malformation of the respiratory portion itself, present from birth, rather than an acquired destructive process like emphysema.",
      objective: "Identify emphysema as permanent alveolar enlargement from interalveolar-septal destruction by dust-cell protease/elastase (unleashed by smoking), and distinguish a congenital cystic malformation of the lung -- present from birth -- from that acquired, adult-onset process.",
      pitfall: "Treating every case of enlarged or dilated air spaces as emphysema. A congenital anomaly presenting as dilatation of the terminal or larger alveoli is a structural malformation present from birth, not the acquired, smoking-driven septal destruction that defines emphysema.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "comparison",
      aliases: ["Emphysema mechanism", "Congenital cystic disease of the lung", "Dust cell protease and elastase"],
    },
    {
      // Same concept as `surfactant.reduces-surface-tension-and-increases-
      // compliance` in `physiology-pulmonary-compliance-and-surfactant.ts`
      // (Pulmonary Compliance cluster) -- declared identically here so this
      // histology leaf's own surfactant-production/deficiency rows can share
      // it. build-batches.ts merges leaves by concept `key`, taking the
      // first leaf's definition; keep the two copies in sync if either is
      // edited.
      key: "surfactant.reduces-surface-tension-and-increases-compliance",
      label: "Pulmonary surfactant, secreted by type II pneumocytes, lowers alveolar surface tension and thereby increases pulmonary compliance; its deficiency increases surface tension and decreases compliance",
      definition: "Pulmonary surfactant is a phospholipid-rich secretion of the type II alveolar cells that spreads over the air-fluid interface lining the alveoli and markedly lowers its surface tension. Because surface tension is the larger of the two forces resisting lung expansion (the smaller being the elastic recoil of collagen and elastin), lowering it makes the lung easier to inflate for a given pressure change — surfactant increases pulmonary compliance, rather than the alveolar surface tension itself, which it reduces. A surfactant deficiency reverses this: alveolar surface tension rises, the lung becomes stiffer, and pulmonary compliance falls. This is exactly what happens in a preterm infant born before adequate surfactant production (respiratory distress syndrome of prematurity): increased surface tension collapses alveoli at the end of each expiration, and decreased compliance means far greater inspiratory pressure is needed to reinflate them, together driving progressive respiratory failure.",
      objective: "State that surfactant lowers alveolar surface tension and thereby increases pulmonary compliance, and predict the opposite pair of changes (increased surface tension, decreased compliance) in a surfactant-deficient lung such as in respiratory distress syndrome of prematurity.",
      pitfall: "Saying that surfactant's major function is to increase surface tension. It is the reverse: surfactant lowers surface tension, and it is that reduction which increases compliance, prevents end-expiratory alveolar collapse, and eases the work of breathing.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Pulmonary Compliance",
      type: "mechanism",
      aliases: ["Pulmonary surfactant function", "Surfactant and pulmonary compliance", "Respiratory distress syndrome of prematurity", "Type II pneumocyte secretion"],
      conflicts: [
        "Overlaps with the live concept CON-RES-4D4CBF3BB8AF1E (canonical_key `pulmonary-surfactant.functions-and-causes-of-deficiency`), authored by the written-paper pipeline into the generated `104-CPS-concepts.md`. Not merged -- see the identical note on this same concept in `physiology-pulmonary-compliance-and-surfactant.ts` and PROGRESS.md.",
      ],
    },
    {
      // kasr-104-author-run46: fresh mint. find-existing.mjs "fetal lung"
      // surfaced only a different module's (102 INT) amniotic-fluid
      // maturity-marker concept — a different fact entirely, confirming
      // clean module-blind search. Grounded in the department histology
      // book (p.38, "Fetal Lung"). Gap disclosed: this leaf's own live
      // article (ART-104-HIS-RESPIRATORY-PORTION) does not yet cover the
      // fetal lung at all — flagged for whoever next extends that article.
      key: "fetal-lung.collapsed-gland-like-histology",
      label: "The functionless, collapsed fetal lung resembles a gland (bronchiolar tree like ducts, alveoli like acini, distinguished from a true gland by cartilage plates), has clear lobes/lobules from thick septa, folded airways and congested vessels, and sinks whole in water — the basis of a forensic lung-flotation test",
      definition: "The fetal lung has no respiratory function and so remains collapsed throughout intrauterine life. It is characterized by: resembling a gland, in that branches of the bronchiolar tree resemble ducts and the alveoli resemble acini, while cartilage plates around the bronchi are exactly what differentiates the fetal lung from a true gland; clear lobes and lobules, owing to thick connective-tissue septa (unlike the less distinct lobulation of the mature, expanded lung); folded bronchi and bronchioles; congested lung blood vessels; alveoli that are themselves collapsed and lined by simple cuboidal epithelium (rather than the mature lung's simple squamous type I pneumocytes); and, because it has never been aerated, the whole fetal lung sinks in water — a finding with medico-legal importance, forming the basis of the forensic lung-flotation (hydrostatic) test used to distinguish a stillborn infant (lung never aerated, sinks) from one born alive and breathing (lung aerated, floats).",
      objective: "State the fetal lung's gland-like resemblance (bronchiolar tree as ducts, alveoli as acini, cartilage as the differentiating feature), its clear lobulation from thick septa, its folded airways, its collapsed cuboidal-lined alveoli, and the medico-legal significance of it sinking whole in water.",
      pitfall: "Reversing which structure resembles which gland component. It is the ALVEOLI that resemble acini, not the bronchioles — the bronchiolar tree itself resembles a gland's ducts. Also reversing the lobulation direction: thick, not thin, septa are what make the fetal lung's lobes and lobules clear.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: [],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "structural_description",
      aliases: ["Fetal lung histology", "Lung flotation test", "Hydrostatic test"],
    },
  ],

  questions: [
    {
      key: "type-of-junction-between-type-i-and-ii-pneumocyte-is-1d92c3a1",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name the tight junction as the connection between type I and type II pneumocytes.",
      explanations: {
        A: "A junctional complex is a broader structure of several junction types together; the specific junction between the two pneumocyte types is a tight junction alone.",
        B: "A desmosome is an anchoring junction resisting mechanical stress, not the junction between the two pneumocyte types.",
        C: "Type I pneumocytes have tight junctions with both type I and type II pneumocytes. A common trap: assuming the cell covering most of the alveolar surface must be the more metabolically active one.",
        D: "An adherens junction is a different junction type from the tight junction here.",
      },
    },
    {
      key: "surfactant-2c89308b",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 2 of 4-5 intended options (A, D) survived extraction -- well below the platform's 4-to-5-option import contract. The bank's own `variants` field shows three differently-worded, differently-optioned printings of this same stem across three source books, none of which fully agrees with this occurrence's own 2-option set, so the missing options cannot be confidently reconstructed from a sibling printing either.",
    },
    {
      key: "afferents-which-may-stimulate-inspiratory-centers-include-7cdecfe6",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank-tagged leaf mismatch (this is Control-of-Respiration content, not Respiratory Portion histology) as well as unanswerable: the bank's own extraction already flags this row unkeyed and unrecoverable -- each of the four listed afferent pathways (vagal alveolar stretch, arterial baroreceptors, pharyngeal afferents during vomiting, atrial baroreceptors) has a complex or borderline relationship to inspiratory drive (vagal lung-stretch afferents classically INHIBIT further inspiration via the Hering-Breuer reflex, for instance) rather than being a clean-cut stimulant, and no single option can be confidently resolved without the source's own intended framing.",
    },
    {
      key: "all-characters-of-type-l-pneumocyte-except-6ccf5591",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify organelle-richness as a type II, not type I, pneumocyte characteristic.",
      explanations: {
        A: "True, so not the exception. Type I pneumocytes line about 97% of the alveolar surface, by far the dominant cell of the alveolar epithelium by area, against type II's roughly 3% -- consistent with being described as the more numerous surface-covering cell.",
        B: "True, so not the exception. Type I pneumocytes are flat, squamous cells with flat nuclei and little cytoplasm, built purely to minimise the diffusion distance for gas exchange.",
        C: "The exception, and the answer. Type I pneumocytes are organelle-poor by design -- few mitochondria, Golgi apparatus or rough endoplasmic reticulum -- because they have no secretory job; it is type II pneumocytes that are rich in these organelles, needed to synthesise and package surfactant.",
        D: "True, so not the exception. Type I pneumocytes carry small pinocytic vesicles that turn over surfactant, set within an extremely thin membrane that keeps the diffusion path short.",
      },
    },
    {
      key: "type-i-pneumocyte-prevent-tissue-fluid-leakage-by-975c662c",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name the tight junction as what keeps tissue fluid from leaking into the alveolar space.",
      explanations: {
        A: "A junctional complex is a broader combination of several junction types together; the specific junction that seals type I pneumocytes against fluid leakage is the tight junction alone, not the whole complex.",
        B: "A desmosome is an anchoring junction that resists mechanical stress; it does not seal the intercellular space against fluid, which is what prevents leakage here.",
        C: "Correct. Type I pneumocytes are joined to each other and to type II pneumocytes by tight junctions, which seal the alveolar epithelium and keep tissue fluid from leaking into the alveolar air space.",
        D: "An adherens junction provides mechanical adhesion between cells but does not seal the intercellular space the way a tight junction does; it is not what keeps fluid out of the alveolus.",
      },
    },
    {
      key: "type-i-pneumocytes-72325b8d",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify providing a thin gas-exchange membrane as the defining type I pneumocyte characteristic.",
      explanations: {
        A: "Membrane-limited multilamellar bodies, which store surfactant precursors, are a defining electron-microscopic feature of type II pneumocytes, not type I.",
        B: "Correct. Type I pneumocytes are flat, organelle-poor cells whose entire structure exists to provide the thinnest possible membrane for gas to diffuse across.",
        C: "Secreting pulmonary surfactant is the job of type II pneumocytes; type I pneumocytes are purely structural and have no secretory role.",
        D: "Dividing and acting as the stem cell for both pneumocyte types is a type II pneumocyte function; type I pneumocytes are terminally differentiated and cannot divide.",
      },
    },
    {
      key: "type-i-pneumocytes-are-characterized-by-a348c670",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify flat squamous morphology as the defining type I pneumocyte characteristic.",
      explanations: {
        A: "Correct. Type I pneumocytes are flat, squamous cells with little cytoplasm, built to keep the blood-air barrier as thin as possible.",
        B: "Type I pneumocytes cover roughly 97% of the alveolar surface, not 3% -- the 3% figure belongs to type II pneumocytes, despite type II being more numerous in raw cell count.",
        C: "Membrane-limited multilamellar bodies are a defining electron-microscopic feature of type II pneumocytes, which store surfactant precursors in them; type I pneumocytes do not show them.",
        D: "Secreting pulmonary surfactant is a type II pneumocyte function; type I pneumocytes are purely structural gas-exchange cells.",
      },
    },
    {
      key: "type-ii-pneumocyte-is-characterized-by-all-except-3bd431ab",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify providing a thin gas-exchange membrane as a type I, not type II, pneumocyte characteristic.",
      explanations: {
        A: "True, so not the exception. Type II pneumocytes are rich in mitochondria, ribosomes, rough endoplasmic reticulum and Golgi, the organelles needed to synthesise and package surfactant.",
        B: "The exception, and the answer. Providing a very thin membrane for gas exchange is the job of the type I pneumocyte, not the cuboidal, organelle-rich type II pneumocyte.",
        C: "True, so not the exception. Secreting surfactant and acting as the stem cell for both pneumocyte types are the two defining functions of the type II pneumocyte.",
        D: "True, so not the exception. Type II pneumocytes are cuboidal cells bulging into the airspace, with foamy cytoplasm from their membrane-bound multilamellar bodies.",
      },
    },
    {
      key: "type-ii-pneumocytes-606f432f",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify surfactant production as the defining type II pneumocyte function.",
      explanations: {
        A: "Undergoing gas exchange across a thin membrane is the type I pneumocyte's job; type II pneumocytes are too thick and organelle-rich to serve this purpose.",
        B: "Type II pneumocytes are epithelial cells, not macrophages; the alveolar phagocytes (dust cells, heart-failure cells) are a separate, blood-monocyte-derived population.",
        C: "Being very flat and practically devoid of organelles describes the type I pneumocyte; type II pneumocytes are cuboidal and organelle-rich, the opposite description.",
        D: "Correct. Type II pneumocytes produce and secrete pulmonary surfactant, packaging it in their characteristic multilamellar bodies before release onto the alveolar surface.",
      },
    },
    {
      key: "type-lpneumocytes-7e094891",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify providing a thin gas-exchange membrane as the defining type I pneumocyte characteristic.",
      explanations: {
        A: "Membrane-limited multilamellar bodies, storing surfactant precursors, are a type II pneumocyte feature, not type I.",
        B: "Correct. Type I pneumocytes provide a thin membrane through which gas exchange occurs -- their entire structure is built for that one job.",
        C: "Secreting pulmonary surfactant is a type II pneumocyte function; type I pneumocytes have no secretory role.",
        D: "Dividing and acting as a stem cell for both pneumocyte types is a type II pneumocyte function; type I pneumocytes cannot divide.",
      },
    },
    {
      key: "type-pneumocytes-i-19fa4c42",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify providing a thin gas-exchange membrane as the defining type I pneumocyte characteristic.",
      explanations: {
        A: "Membrane-limited multilamellar bodies, storing surfactant precursors, are a type II pneumocyte feature, not type I.",
        B: "Correct. Type I pneumocytes provide a thin membrane through which gas exchange occurs, the defining job their flat, organelle-poor structure exists for.",
        C: "Secreting pulmonary surfactant is a type II pneumocyte function; type I pneumocytes have no secretory role.",
        D: "Dividing and acting as a stem cell for both pneumocyte types is a type II pneumocyte function; type I pneumocytes cannot divide.",
      },
    },
    {
      key: "all-the-following-characters-of-alveoli-except-3f4133ce",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify gas exchange as a type I, not type II, pneumocyte job even though both line the alveolus.",
      explanations: {
        A: "True, so not the exception. Alveoli are the structural and functional unit of gas exchange, the endpoint of the whole respiratory tree.",
        B: "True, so not the exception. Alveoli open into alveolar sacs, alveolar ducts and respiratory bronchioles alike.",
        C: "True, so not the exception. Alveolar pores (of Kohn) between adjoining alveolar walls equalise pressure between alveoli and give collateral air circulation when a bronchiole is obstructed.",
        D: "The exception, and the answer. Alveoli contain both pneumocyte types, but it is the type I pneumocyte that carries out gas exchange; the type II pneumocyte's job is secreting surfactant and acting as the stem cell for both types, not gas exchange itself.",
      },
    },
    {
      key: "alveolar-pore-of-kohn-6e3cbb07",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that the pores of Kohn provide collateral air circulation between alveoli.",
      explanations: {
        A: "Improving gas exchange directly is the job of the thin blood-air barrier itself, not the pores of Kohn, whose role is pressure equalisation between alveoli.",
        B: "Secreting pulmonary surfactant is a type II pneumocyte function, unrelated to the pores of Kohn, which are simply openings between adjoining alveolar walls.",
        C: "Correct. The pores of Kohn connect adjoining alveoli, equalising pressure between them and providing collateral air circulation when a bronchiole supplying one of them is obstructed.",
        D: "Preventing tissue fluid leakage is the job of the tight junctions between type I pneumocytes, not the pores of Kohn, which are open channels for air, not a barrier function.",
      },
    },
    {
      key: "free-termination-of-respiratory-bronchiole-ae66666e",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the alveolar duct as the free termination of the respiratory bronchiole.",
      explanations: {
        A: "Alveoli are the terminal structural units opening off ducts, sacs and bronchioles; they are not themselves the free termination of the respiratory bronchiole.",
        B: "The alveolar sac is a group of alveoli sharing a central space, one step further along the sequence than the free termination of the respiratory bronchiole.",
        C: "Correct. The alveolar duct is the free termination of the respiratory bronchiole -- a passage lined completely by alveolar openings, with smooth muscle only at their mouths.",
        D: "A type I pneumocyte is a cell type, not a segment of the airway; it cannot be the anatomical termination of the respiratory bronchiole.",
      },
    },
    {
      key: "region-of-transition-between-conducting-respiratory-portion-28eba947",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify the bronchioles, specifically the respiratory bronchiole, as the conducting-to-respiratory transition.",
      explanations: {
        A: "Alveoli are already deep in the respiratory portion, well past the conducting-to-respiratory transition, not the transition point itself.",
        B: "Bronchi are purely conducting-portion tissue, upstream of the transition, not the transition itself.",
        C: "The alveolar duct is already respiratory-portion tissue, past the transition; the true boundary sits one step further upstream, at the respiratory bronchiole.",
        D: "Correct, among these choices. The transition from the conducting to the respiratory portion happens at the level of the bronchioles -- specifically the respiratory bronchiole, whose wall is interrupted by the first alveolar openings while it still keeps the cuboidal, ciliated lining of conducting-portion tissue.",
      },
    },
    {
      key: "the-first-portion-of-the-respiratory-tree-where-gas-exchange-86978cf5",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Name the respiratory bronchiole as the first site gas exchange becomes possible.",
      explanations: {
        A: "The alveolar duct is already fully respiratory-portion tissue, one step past the first point gas exchange becomes possible.",
        B: "The alveolar sac is further along the sequence still, well past the first site where gas exchange can occur.",
        C: "Correct. The respiratory bronchiole is the first portion of the respiratory tree where gas exchange can occur -- its wall is interrupted by the openings of some alveoli, even though it keeps a conducting-portion-like cuboidal, ciliated lining.",
        D: "The terminal bronchiole is one step upstream of the respiratory bronchiole and is purely conducting-portion tissue; no gas exchange occurs there at all.",
      },
    },
    {
      key: "what-is-the-first-portion-of-the-respiratory-tree-where-gas-f0cf5a6c",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Name the respiratory bronchiole as the first site gas exchange becomes possible.",
      explanations: {
        A: "The alveolar duct is already fully respiratory-portion tissue, one step past the first point gas exchange becomes possible.",
        B: "The alveolar sac is further along the sequence still, well past the first site where gas exchange can occur.",
        C: "Correct. The respiratory bronchiole is the first portion of the respiratory tree where gas exchange can occur, its wall interrupted by the openings of some alveoli despite its conducting-portion-like cuboidal, ciliated lining.",
        D: "The terminal bronchiole, one step upstream of the respiratory bronchiole, is purely conducting-portion tissue; no gas exchange occurs there.",
      },
    },
    {
      key: "which-of-the-following-could-not-be-part-of-the-respiratory-57963540",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the terminal bronchiole as purely conducting-portion tissue, excluded from the respiratory zone.",
      explanations: {
        A: "Alveolar sacs are respiratory-zone tissue, groups of alveoli sharing a central airspace -- genuinely part of the respiratory zone, not the exception.",
        B: "Alveolar ducts are respiratory-zone tissue, the free termination of the respiratory bronchiole -- genuinely part of the respiratory zone, not the exception.",
        C: "The exception, and the answer. Terminal bronchioles are the last purely conducting-portion structure, one step upstream of the respiratory bronchiole; no alveoli open from their wall, so they take no part in gas exchange and are not part of the respiratory zone.",
        D: "Respiratory bronchioles are respiratory-zone tissue by definition -- the first segment whose wall is interrupted by alveolar openings -- genuinely part of the respiratory zone, not the exception.",
      },
    },
    {
      key: "the-structural-changes-that-occur-in-the-respiratory-airway-14592311",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "State that alveolar-duct smooth muscle disappears by the level of the alveolar sac and alveolus.",
      explanations: {
        A: "Reversed: goblet cells disappear before ciliated cells as the airway progresses distally -- goblet cells are already absent by the bronchiole level, while scattered ciliated cells persist even into the respiratory bronchioles.",
        B: "Reversed: serous and mucous glands progressively decrease, not increase, as the airway progresses distally, disappearing altogether by the level of the bronchioles.",
        C: "Correct. Smooth muscle persists as small sphincter-like knobs at the mouths of alveoli along the alveolar ducts, but this smooth muscle component is absent by the level of the alveolar sacs and individual alveoli, which are structured purely for gas exchange.",
        D: "Reversed: cartilage progressively decreases, not increases, as the airway progresses distally, disappearing altogether by the level of the bronchioles.",
      },
    },
    {
      key: "blood-air-barrier-is-formed-of-all-the-following-except-ffa63fff",
      conceptKey: "blood-air-barrier.four-layers",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the type II pneumocyte as excluded from the four-layer blood-air barrier.",
      explanations: {
        A: "True, so not the exception. The surfactant film lining the alveolar surface is the first of the barrier's four layers.",
        B: "The exception, and the answer. The cytoplasm of the type II pneumocyte is not one of the barrier's four layers; its cuboidal, organelle-rich structure is too thick for the thin diffusion path, which uses the type I pneumocyte instead.",
        C: "True, so not the exception. The fused basal lamina of the type I pneumocyte and the capillary endothelium is one of the barrier's four layers, holding the other two together.",
        D: "True, so not the exception. The cytoplasm of the capillary endothelial cell is the final of the barrier's four layers, completing the path from alveolar air to blood.",
      },
    },
    {
      key: "the-following-is-not-a-part-of-the-blood-air-barrier-92786e33",
      conceptKey: "blood-air-barrier.four-layers",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the type II pneumocyte as excluded from the four-layer blood-air barrier.",
      explanations: {
        A: "Type I pneumocytes, with their extremely thin, flattened cytoplasm, are a genuine, essential layer of the blood-air barrier.",
        B: "Surfactant, as the film lining the alveolar surface, is the barrier's outermost layer -- a genuine part of it, not the exception.",
        C: "Correct. Type II pneumocytes are excluded from the classic four-layer blood-air barrier; their cuboidal, organelle-rich structure would be far too thick to support rapid gas diffusion, so the thin type I pneumocyte carries out this job instead.",
        D: "Capillary endothelial cells, with their thin cytoplasm, are a genuine, essential layer of the blood-air barrier -- the final layer before blood itself.",
      },
    },
    {
      key: "interalveolar-septa-are-3e260244",
      conceptKey: "interalveolar-septum.composition",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that interalveolar septa are delicate connective-tissue partitions between alveoli.",
      explanations: {
        A: "Correct. Interalveolar septa are delicate connective-tissue partitions separating adjacent alveoli, carrying the richest capillary network in the body along with elastic and reticular fibres.",
        B: "Interalveolar septa do not have smooth muscle fibres of their own; smooth muscle in the respiratory portion is instead found as small sphincter-like knobs at the mouths of alveoli along the alveolar ducts.",
        C: "Interalveolar septa are supported chiefly by elastic and reticular fibres, not collagen; collagen is not their defining structural element.",
        D: "Interalveolar septa are the most richly vascularised connective tissue in the body, not avascular -- they carry the capillary network across which gas exchange happens.",
      },
    },
    {
      key: "interalveolar-septa-c03ed872",
      conceptKey: "interalveolar-septum.composition",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that interalveolar septa are delicate connective-tissue partitions between alveoli.",
      explanations: {
        A: "Correct. Interalveolar septa are delicate parts separating alveoli, built from connective tissue carrying a dense capillary network plus elastic and reticular fibres.",
        B: "Interalveolar septa do not contain their own smooth muscle fibres; the respiratory portion's smooth muscle is instead confined to small knobs at the mouths of alveoli along the alveolar ducts.",
        C: "Collagen fibres are not the septum's defining support; elastic and reticular fibres are, serving lung mechanics and capillary protection rather than rigidity.",
        D: "Interalveolar septa carry the richest capillary network in the body -- the opposite of having no blood capillaries.",
      },
    },
    {
      key: "lack-of-surfactant-produces-all-of-the-above-except-3e26cce3",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Identify decreased total lung capacity as not a direct, classic consequence of surfactant deficiency.",
      explanations: {
        A: "True, so not the exception. Without surfactant, small alveoli (with their higher collapsing pressure, by Laplace's law) become unstable and collapse while relatively larger alveoli over-distend -- a genuine consequence of surfactant deficiency.",
        B: "True, so not the exception. Increased alveolar surface tension without surfactant directly stiffens the lung, decreasing compliance.",
        C: "The exception, and the answer. Total lung capacity, a maximal structural lung volume, is not a direct or primary consequence of surfactant deficiency the way compliance and functional residual capacity are; TLC reduction is not the classic teaching point tested by this deficiency.",
        D: "True, so not the exception. Decreased compliance directly raises the work of breathing, a genuine downstream consequence of surfactant deficiency.",
      },
    },
    {
      key: "lung-surfactant-5ecaeb23",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that surfactant decreases the tendency of alveolar collapse during expiration.",
      explanations: {
        A: "Correct. By lowering alveolar surface tension, surfactant decreases the tendency of alveoli -- especially the smaller ones -- to collapse during expiration, when their radius and surface tension effects are at their most unfavourable.",
        B: "Surfactant decreases, not increases, the surface tension of the fluid lining the alveoli; raising surface tension is what happens in its absence, not what it does.",
        C: "Surfactant deficiency is classically linked to prematurity; this option's specific framing (diabetic mothers) is a real, separate risk factor via fetal hyperinsulinaemia, but is not the option this question's key selects.",
        D: "Surfactant helps prevent pulmonary oedema by reducing the surface-tension-driven force that favours fluid filtration into the alveoli -- the opposite of 'favouring' that filtration, as this option states.",
      },
    },
    {
      key: "lung-surfactant-a-decreases-the-tendency-of-alveolar-collaps-619db9e4",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "Identify infants of diabetic mothers as carrying an increased risk of surfactant deficiency.",
      explanations: {
        A: "This restates a true fact about surfactant (it does decrease the tendency of alveolar collapse) but is not the option this particular question's key selects as its intended answer.",
        B: "Surfactant's true action is to decrease, not increase, the surface tension of the fluid lining the alveoli -- the entire basis of its anti-collapse effect.",
        C: "Correct, per this question's key. Infants of diabetic mothers carry an increased risk of surfactant deficiency: fetal hyperinsulinaemia, driven by maternal hyperglycaemia crossing the placenta, delays maturation of the type II pneumocyte's surfactant-synthesising machinery even at a gestational age when production would otherwise be adequate.",
        D: "Surfactant helps prevent pulmonary oedema by reducing, not favouring, the surface-tension-driven force that would otherwise draw fluid in from the pulmonary capillaries.",
      },
    },
    {
      key: "pulmonary-surfactant-f39604b4",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that type II pneumocytes produce pulmonary surfactant.",
      explanations: {
        A: "Correct. Pulmonary surfactant is produced and secreted by type II pneumocytes, which package it in membrane-bound multilamellar bodies before release onto the alveolar surface.",
        B: "Alveolar macrophages (dust cells, heart-failure cells) clear inhaled particles and red cells; they play no role in producing surfactant.",
        C: "Surfactant decreases, not increases, the surface tension of the alveolar epithelium's lining fluid -- the opposite of what this option states.",
        D: "Type I pneumocytes are purely structural gas-exchange cells with no secretory function; producing surfactant is a type II pneumocyte job.",
      },
    },
    {
      key: "which-of-the-following-ceils-produce-surfactant-in-lung-alve-ab6f6f5b",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that type II alveolar cells produce pulmonary surfactant.",
      explanations: {
        A: "Endothelial cells form the capillary component of the blood-air barrier; they have no role in surfactant production.",
        B: "Goblet cells secrete mucus in the conducting airways and are not present in the alveoli at all, let alone producing surfactant there.",
        C: "Type I alveolar cells are thin, purely structural gas-exchange cells with no secretory function; they do not produce surfactant.",
        D: "Correct. Type II alveolar cells (pneumocytes) are the dedicated surfactant-producing cells, packaging it within multilamellar bodies before secreting it onto the alveolar surface.",
      },
    },
    {
      key: "which-of-the-following-cells-produce-surfactant-in-lung-alve-0ed7b354",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that type II alveolar cells produce pulmonary surfactant.",
      explanations: {
        A: "Endothelial cells form the capillary component of the blood-air barrier and play no role in surfactant production.",
        B: "Goblet cells secrete mucus in the conducting airways and are not present in the alveoli, nor involved in surfactant production.",
        C: "Type I alveolar cells are thin structural cells for gas exchange, not surfactant producers.",
        D: "Correct. Type II alveolar cells remain the dedicated surfactant-producing cells, packaging surfactant within multilamellar bodies before secreting it onto the alveolar surface to reduce surface tension and prevent collapse.",
      },
    },
    {
      key: "abnormal-permanent-enlargement-of-alveoli-7c059df4",
      conceptKey: "respiratory-portion.clinical-correlations",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Name emphysema as permanent, abnormal enlargement of the alveolar air spaces.",
      explanations: {
        A: "Epistaxis is nosebleed, an unrelated nasal condition with no connection to alveolar structure.",
        B: "Correct. Emphysema is defined as abnormal, permanent enlargement of the air spaces distal to the terminal bronchiole, from destruction of the interalveolar septa by dust-cell protease and elastase, normally kept in check by protective proteins that cigarette smoking inhibits.",
        C: "Bronchitis is inflammation of the bronchi, a conducting-portion condition, not a description of permanent alveolar enlargement.",
        D: "Sinusitis is inflammation of the paranasal sinuses, an entirely different anatomical region with no connection to alveolar enlargement.",
      },
    },
    {
      key: "the-anomaly-in-which-there-is-dilatation-of-terminal-or-larg-df7d986f",
      conceptKey: "respiratory-portion.clinical-correlations",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "Distinguish a congenital cystic malformation of the lung from tracheoesophageal fistula, respiratory distress and atresia.",
      explanations: {
        A: "Correct, per this source's own key and wording. A congenital anomaly presenting as dilatation of the terminal or larger alveoli -- sometimes labelled this way in older texts -- is a structural malformation of the lung's respiratory portion present from birth, distinct from any of the other three options here; the more standard modern term for this group of lesions is congenital cystic disease of the lung, but the option as printed is what this source's key marks correct.",
        B: "A tracheoesophageal fistula is an abnormal connection between the trachea and oesophagus, an entirely different congenital anomaly with no connection to alveolar dilatation.",
        C: "Respiratory distress (syndrome) is an acquired functional failure from surfactant deficiency, typically in a premature infant -- a physiological problem, not the structural, congenital dilatation this stem describes.",
        D: "Atresia is the congenital absence or closure of a passage; it describes something failing to form or open, the opposite of an abnormally dilated air space.",
      },
    },
    {
      // Leaf-tag mismatch: bank-tagged "A-V Connections" but genuinely
      // interalveolar-septum content — the same composition this concept
      // already teaches.
      key: "intra-alveoli-formed-of-all-the-following-except-09c00468",
      conceptKey: "interalveolar-septum.composition",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the interalveolar septum's resident phagocytes are extravasated monocytes, not neutrophils, and are not normally present as \"extra\" leucocytes.",
      explanations: {
        A: "True of the interalveolar septum, so not the exception — its capillary network and elastic fibres are both genuine components.",
        B: "True, so not the exception — reticular fibres are part of the septum's fibre content, protecting the capillaries from overexpansion.",
        C: "The exception, and the answer. The septum's resident phagocytes are extravasated monocytes (dust cells and heart-failure cells), not extra neutrophils — neutrophils are not a normal component of the interalveolar septum.",
        D: "True, so not the exception — alveolar phagocytes (dust cells and heart-failure cells) are genuine residents of the interalveolar septum.",
      },
    },
    {
      // Leaf-tag mismatch: bank-tagged "A-V Connections" but genuinely
      // blood-air-barrier content — the same four layers this concept
      // already teaches (type II pneumocyte deliberately excluded, red
      // blood corpuscle likewise not a structural layer of the barrier).
      key: "which-of-the-following-is-not-a-component-of-the-respiratory-40a9efde",
      conceptKey: "blood-air-barrier.four-layers",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the red blood corpuscle is cargo passing through the capillary, not a structural layer of the blood-air barrier itself.",
      explanations: {
        A: "The alveolar epithelial cell's (type I pneumocyte's) plasma membrane is a genuine structural layer of the blood-air barrier — true, so not the exception.",
        B: "The capillary endothelial cell's plasma membrane is a genuine structural layer of the barrier — true, so not the exception.",
        C: "The fused basal laminae of the alveolar epithelium and capillary endothelium form a genuine structural layer of the barrier, helping minimise its overall thickness — true, so not the exception.",
        D: "The exception, and the answer. The red blood corpuscle carries the oxygen and carbon dioxide being exchanged across the barrier, but it is cargo flowing through the capillary lumen, not a structural layer the barrier itself is built from.",
      },
    },
    {
      // Leaf-tag mismatch, corrupted stem: bank-tagged "A-V Connections" but
      // genuinely alveolar-sac content — a merge of two separate source
      // questions (a bronchiole item and an alveolar-sac item) into one
      // corrupted stem. The lettered options (A-D) survive clean and match
      // the alveolar-sac question, and the answer is confidently
      // reconstructed editorially, but the stem itself is unusable as
      // extracted — no seed-level field exists to override stem text (only
      // the answer letter can be overridden via `answerOverride`), the same
      // class of unfixable defect as the option-merge corruptions elsewhere
      // in this module.
      key: "a-histological-feature-of-the-bronchiole-is-0-a-it-has-carti-14b9553c",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The extracted stem is a corrupted merge of two separate source questions — a bronchiole-histology item and an alveolar-sac item — running together in one block of text with no clean boundary. The four lettered options (A-D) survive clean and answer only the alveolar-sac question, with a confident editorial reconstruction of the correct answer, but the stem itself cannot be presented to a student as extracted, and no seed-level field exists to rewrite stem text (only the answer letter can be overridden via `answerOverride`).",
    },
    {
      // Leaf-tag mismatch, corrupted option set: bank-tagged "A-V
      // Connections" but genuinely blood-air-barrier content.
      key: "which-of-the-following-is-a-component-of-the-respiratory-mem-f9f2931b",
      conceptKey: "blood-air-barrier.four-layers",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only three lettered options survive extraction (A, B and D — no C), one short of the platform's 4-to-5-option import contract, and the surviving D option (\"All of the above\") refers to a set that is missing a member, so it can no longer be presented meaningfully. The same fact — the blood-air barrier includes both the alveolar cell's and the capillary endothelial cell's plasma membranes — is already covered cleanly by this leaf's own `blood-air-barrier-is-formed-of-all-the-following-except` question on the same concept.",
    },
    {
      // Bank-tagged "Conducting Portion", genuinely the respiratory
      // bronchiole (this concept's own transition point). Duplicate
      // occurrence 1 of 3 (also 4e2dc249, a808aec7) of the same source
      // fact, extracted from three different question books.
      key: "airway-located-at-the-transition-between-conducting-and-resp-16186d60",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the respiratory bronchiole as the airway at the transition between the conducting and respiratory portions.",
      explanations: {
        A: "Secondary (lobar) bronchi are purely conducting-portion tissue, well upstream of the transition point.",
        B: "Correct. The respiratory bronchiole sits at the transition between the conducting and respiratory portions -- its wall is interrupted by the first alveolar openings while it still keeps the cuboidal, ciliated lining that looks like conducting-portion tissue.",
        C: "Terminal bronchioles are the last purely conducting structure, one step upstream of the respiratory bronchiole; no alveoli open from their wall.",
        D: "Primary (main) bronchi are the most proximal, purely conducting airway of the four options, far upstream of the transition.",
      },
    },
    {
      key: "the-part-of-airway-which-is-located-at-the-transition-betwee-4e2dc249",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the respiratory bronchiole as the airway at the transition between the conducting and respiratory portions.",
      explanations: {
        A: "Secondary bronchi are conducting-portion tissue only, upstream of the transition point.",
        B: "Correct. The respiratory bronchiole is the transitional airway -- gas exchange first becomes possible through the alveolar openings interrupting its wall, even though its lining still resembles the conducting portion's.",
        C: "Terminal bronchioles are the last purely conducting airway, immediately upstream of the respiratory bronchiole, with no alveolar openings of their own.",
        D: "Primary bronchi are far upstream, purely conducting airway with no transitional feature at all.",
      },
    },
    {
      key: "the-part-of-the-airway-which-is-located-at-the-transition-be-a808aec7",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the respiratory bronchiole as the airway at the transition between the conducting and respiratory portions.",
      explanations: {
        A: "Secondary bronchi lie entirely within the conducting portion, upstream of the transition.",
        B: "Correct. The respiratory bronchiole marks the boundary itself: some alveoli already open from its wall, but its own lining is still the cuboidal, ciliated (Clara-cell-bearing) epithelium of the conducting portion.",
        C: "Terminal bronchioles are purely conducting, the last airway before the respiratory bronchiole, with no alveolar openings.",
        D: "Primary bronchi are the most proximal airway among these choices, far from the transition.",
      },
    },
    {
      key: "which-of-the-following-is-the-first-branching-of-the-bronchi-25ef4f27",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name the respiratory bronchiole as the first branch of the bronchial tree with gas-exchanging capability.",
      explanations: {
        A: "Terminal bronchioles are one branch upstream of the first gas-exchanging airway; they are purely conducting, with no alveoli opening from their wall.",
        B: "Correct. Respiratory bronchioles are the first branching of the bronchial tree with gas-exchanging capability -- their wall is interrupted by the openings of some alveoli, even though the lining still looks like conducting-portion tissue.",
        C: "Alveoli are the terminal gas-exchange unit, several branches past the first point gas exchange becomes possible, not the first branching itself.",
        D: "Segmental bronchi are purely conducting-portion tissue, several branches upstream of any gas-exchanging airway.",
      },
    },
    {
      // Bank-tagged "Conducting Portion". "Gas exchange occurs in" the
      // alveolar sac -- a distinct fact from the respiratory bronchiole
      // being the *first* site gas exchange becomes possible (already kept
      // above as `the-first-portion-of-the-respiratory-tree-where-gas-
      // exchange-86978cf5` / `what-is-the-first-portion...`).
      key: "gas-exchange-occurs-in-53a49db9",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that gas exchange occurs in the alveolar sac, among these four named airway/airspace choices.",
      explanations: {
        A: "Terminal bronchioles are purely conducting-portion tissue, one step upstream of the respiratory bronchiole; no alveoli open from their wall, so no gas exchange occurs there.",
        B: "Intra-pulmonary bronchi are conducting-portion airway, several branches upstream of any gas-exchanging structure.",
        C: "Correct. The alveolar sac -- a group of adjacent alveoli opening into a common central space -- is respiratory-portion tissue, lined by alveolar epithelium, where gas exchange takes place.",
        D: "Extra-pulmonary bronchi are the most proximal bronchi, purely conducting-portion tissue, far from any gas-exchanging structure.",
      },
    },
    {
      key: "the-first-part-of-the-respiratory-tract-contains-non-ciliate-5a7257a5",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name the alveolar duct as the first part of the respiratory tract lined by non-ciliated cells.",
      explanations: {
        A: "Terminal bronchioles still carry a ciliated, cuboidal lining -- purely conducting-portion epithelium, not the non-ciliated lining the stem asks for.",
        B: "Respiratory bronchioles keep a cuboidal, ciliated (Clara-cell-bearing) lining, cilia only disappearing distally within this segment -- not yet the fully non-ciliated lining further along.",
        C: "The trachea is lined by pseudostratified ciliated columnar epithelium, the conducting portion's default ciliated lining, the opposite of what the stem asks for.",
        D: "Correct. The alveolar duct, lined completely by alveolar epithelium, is the first part of the respiratory tract with no ciliated cells left at all.",
      },
    },
    {
      key: "alveolar-duct-sac-are-lined-by-c823c948",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that the alveolar duct and alveolar sac are both lined by alveolar epithelium.",
      explanations: {
        A: "Olfactory epithelium lines the roof and superior conchae of the nasal cavity, an entirely different, proximal conducting-portion region.",
        B: "Correct. Both the alveolar duct and the alveolar sac are lined by alveolar epithelium alone.",
        C: "Respiratory epithelium (pseudostratified ciliated columnar with goblet cells) lines most of the conducting portion, not the alveolar duct or sac.",
        D: "Alveolar epithelium is the lining named directly by this leaf's own sourced concept, so 'none of the above' is incorrect.",
      },
    },
    {
      key: "alveolar-sacs-are-characterized-by-the-following-d7a17b89",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that alveolar sacs are groups of alveoli sharing a common central space.",
      explanations: {
        A: "This describes the alveolar duct -- the free termination of the respiratory bronchiole -- not the alveolar sac, which is one step further along the sequence.",
        B: "Alveolar sacs, like the alveolar duct, are lined by alveolar epithelium, not simple cuboidal epithelium.",
        C: "Smooth muscle in the respiratory portion is confined to small sphincter-like knobs at the mouths of alveoli along the alveolar duct; it has disappeared by the level of the alveolar sac.",
        D: "Correct. Alveolar sacs are groups of adjacent alveoli opening into a common central space.",
      },
    },
    {
      // Bank-tagged "Conducting Portion", genuinely respiratory-bronchiole
      // content. Duplicate occurrence 1 of 2 (also 284f61b0) of the same
      // statement-true item.
      key: "one-of-the-following-statements-concerning-respiratory-bronc-5e10f9d9",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that respiratory bronchioles carry a thin layer of smooth muscle in their wall.",
      explanations: {
        A: "Reversed: gas exchange does occur through the respiratory bronchiole's own wall, since some alveoli already open directly from it -- this is the transitional feature that defines the segment.",
        B: "Correct. Respiratory bronchioles carry a thin musculosa of smooth muscle in their wall, on a corium of elastic-fibre-rich connective tissue.",
        C: "Goblet cells are absent from bronchiolar epithelium generally (replaced by Clara cells); respiratory bronchioles do not carry goblet cells in their lining.",
        D: "Reversed: their epithelium is simple cuboidal, not simple columnar, ciliated -- and cilia become absent distally within this segment.",
      },
    },
    {
      key: "which-one-of-the-following-statements-concerning-respiratory-284f61b0",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that respiratory bronchioles carry a thin layer of smooth muscle in their wall.",
      explanations: {
        A: "Reversed: the respiratory bronchiole's wall is exactly where gas exchange first becomes possible, its wall interrupted by the openings of some alveoli.",
        B: "Correct. A thin layer of smooth muscle sits in the respiratory bronchiole's musculosa, over a corium rich in elastic fibres.",
        C: "Goblet cells fall away well before the respiratory bronchiole; Clara cells, not goblet cells, populate this segment's lining.",
        D: "Reversed: the lining is simple cuboidal ciliated epithelium (cilia lost distally), not simple columnar.",
      },
    },
    {
      key: "respiratory-bronchiole-is-characterized-by-all-except-89f9fea4",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Correct 'simple columnar ciliated' to 'simple cuboidal ciliated' as the respiratory bronchiole's own lining.",
      explanations: {
        A: "True of the respiratory bronchiole, so not the exception -- cilia become absent in its distal part.",
        B: "The exception, and the answer. The respiratory bronchiole's lining mucosa is simple cuboidal, not simple columnar, ciliated epithelium.",
        C: "True, so not the exception -- a thin layer of smooth muscle fibre sits in its musculosa.",
        D: "True, so not the exception -- its corium is loose connective tissue rich in elastic fibres.",
      },
    },
    {
      // Bank-tagged "Conducting Portion", genuinely surfactant-deficiency
      // content -- the same fact this concept's own definition already
      // states explicitly ("respiratory distress syndrome of prematurity").
      key: "respiratory-distress-syndrome-is-caused-by-deficiency-of-fccac63c",
      conceptKey: "surfactant.reduces-surface-tension-and-increases-compliance",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that respiratory distress syndrome is caused by a deficiency of pulmonary surfactant.",
      explanations: {
        A: "Goblet cells secrete mucus in the conducting airways; their absence plays no part in respiratory distress syndrome.",
        B: "Correct. Respiratory distress syndrome of prematurity is caused by a deficiency of pulmonary surfactant: alveolar surface tension rises, compliance falls, and alveoli collapse at the end of each expiration.",
        C: "Elastic fibres contribute the smaller of the two forces resisting lung expansion; their loss is not what defines respiratory distress syndrome.",
        D: "Sero-mucous glands lie in the conducting portion's submucosa and play no part in alveolar surface tension or respiratory distress syndrome.",
      },
    },
    {
      // Bank-tagged "Conducting Portion", genuinely a pneumocyte-
      // identification question (great alveolar cell = type II pneumocyte,
      // the surfactant-producing cell whose deficiency causes the
      // premature infant's respiratory distress).
      key: "in-premature-babies-suffering-from-difficulty-in-breathing-a-396bf6f5",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify the great alveolar cell (type II pneumocyte) as the cell whose immaturity underlies respiratory distress in premature infants.",
      explanations: {
        A: "Clara cells are bronchiolar, conducting-portion cells; they play no part in the alveolar surfactant deficiency behind a premature infant's breathing difficulty.",
        B: "Small granule cells are the conducting portion's neuroendocrine (APUD) cells, unrelated to alveolar surfactant production.",
        C: "Squamous alveolar cells (type I pneumocytes) form the thin gas-exchange wall but have no secretory role; they are not the cell whose immaturity causes the deficiency.",
        D: "Correct. Great alveolar cells (type II pneumocytes) are the surfactant-secreting cell; in a premature infant their immaturity leaves surfactant deficient, raising alveolar surface tension and causing the breathing difficulty that requires incubator care.",
      },
    },
    {
      // Bank-tagged "Conducting Portion", genuinely a corrupted duplicate
      // of `gas-exchange-occurs-in-53a49db9` (kept above, same concept):
      // the stem itself merges the clean question with a second,
      // unrelated fragment ("What is the first portion of the respiratory
      // tree..."), and option B's text is entirely absorbed into option
      // A's garbled block, leaving no clean, distinguishable option set.
      key: "gas-exchange-occurs-in-a-terminal-bronchioles-b-intra-pulmon-049ead38",
      conceptKey: "respiratory-portion.structural-sequence-and-pores-of-kohn",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Corrupted duplicate of `gas-exchange-occurs-in-53a49db9` (kept above, same concept, same underlying fact): the extracted stem runs two separate source questions together (\"Gas exchange occurs in...\" plus a second, unrelated \"What is the first portion of the respiratory tree...\" fragment), and the lettered options collapse into two garbled blocks with no clean A/B/C/D boundary -- option B's text is fully absorbed into option A's block. No seed-level field exists to rewrite stem or option text.",
    },
    // kasr-104-author-run46: this leaf's own 4 remaining bank rows
    // (ledger's second Respiratory Portion batch, leaf=null in the raw
    // bank so missed by a naive per-leaf scan).
    {
      key: "what-type-of-tissue-forms-the-alveoli-in-the-lung-44df5f2e",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that simple squamous epithelium (type I pneumocytes) forms the alveolar wall, covering 97% of its surface.",
      explanations: {
        A: "Correct. This leaf's own sourced concept states type I pneumocytes are squamous alveolar cells covering about 97% of the alveolar surface — the dominant epithelial tissue forming the alveolar wall.",
        B: "Simple cuboidal epithelium describes type II pneumocytes' own shape, but they cover only about 3% of the alveolar surface — the minority, not the tissue that principally 'forms the alveoli'.",
        C: "Simple columnar epithelium describes neither pneumocyte type; this leaf's own sourced concept names only squamous (type I) and cuboidal (type II) shapes among the alveolar epithelium's two cell types.",
        D: "Pseudostratified epithelium lines the conducting portion (trachea, bronchi), not the alveoli — a different region of the respiratory tract entirely.",
      },
      answerOverride: "A",
      answerOverrideReason: "No printed key exists (answerConfidence: editorial-no-printed-key). Re-verified against this leaf's own sourced concept, itself grounded in the department histology book (p.36): type I pneumocytes, described there as squamous alveolar cells, cover 97% of the alveolar surface — confirming A as the tissue that principally forms the alveolar wall.",
    },
    {
      key: "support-lung-tissue-prevent-over-expansion-684cc6bf",
      conceptKey: "interalveolar-septum.composition",
      difficulty: "Moderate",
      questionType: "Single best answer",
      learningObjective: "Name reticular fibres, not the capillary network, elastic fibres or extravasated leucocytes, as the interalveolar septum's own component that supports lung tissue and prevents over-expansion injuring the capillaries.",
      explanations: {
        A: "Merges two components with different jobs: the capillary network is the septum's dense vascular bed (gas exchange), and elastic fibres ALLOW lung expansion during inspiration — neither is credited with preventing over-expansion.",
        B: "Correct. This leaf's own sourced concept states reticular fibres 'support lung tissue and prevent overexpansion from injuring the capillaries' — the department book's own words for exactly this function.",
        C: "This leaf's own sourced concept names extravasated MONOCYTES (which become alveolar phagocytes), not neutrophils, among the septum's own components — and their role is phagocytic, not structural support.",
        D: "Alveolar phagocytes are the differentiated descendants of the septum's own extravasated monocytes; they do not themselves support lung tissue or resist over-expansion, a structural role reticular fibres alone carry.",
      },
      answerOverride: "B",
      answerOverrideReason: "No printed key exists (answerConfidence: external-solved-book-recovered, from a different solved question book). Re-verified directly against this leaf's own sourced concept, itself grounded in the department histology book (p.36): 'Reticular fibers to support lung tissue and prevent over-expansion that may injure the delicate blood capillaries' — a verbatim match for option B.",
    },
    {
      // kasr-104-author-run46: fresh mint. find-existing.mjs "fetal lung"
      // surfaced only a different module's (102 INT) amniotic-fluid
      // maturity-marker concept — a different fact entirely, module-blind
      // search confirmed clean. Grounded in this leaf's own histology
      // book (p.38, "Fetal Lung").
      key: "fetal-lung-is-characterized-by-fd1480a7",
      conceptKey: "fetal-lung.collapsed-gland-like-histology",
      difficulty: "Moderate",
      questionType: "Single best answer",
      learningObjective: "State that the whole fetal lung sinks in water, a finding with medico-legal importance (the basis of the forensic lung-flotation test), against three reversed distractors about its lobulation, bronchiolar folding and bronchiole-to-acinus comparison.",
      explanations: {
        A: "Reversed. The department book states the fetal lung's lobes and lobules ARE clear, due to the presence of THICK connective-tissue septa — not unclear due to thin septa.",
        B: "Reversed. The department book states the fetal lung's bronchi and bronchioles ARE folded, not unfolded.",
        C: "Correct. The department book states directly that the whole fetal lung sinks in water, a finding with medico-legal importance — the basis of the forensic test distinguishing a stillborn (lung never aerated, sinks) from a liveborn infant who breathed (lung aerated, floats).",
        D: "Reversed at the wrong level. The department book states the fetal lung's ALVEOLI (not its bronchioles) are similar to a gland's acini — its bronchiolar tree is instead similar to a gland's ducts.",
      },
      answerOverride: "C",
      answerOverrideReason: "No printed key exists (answerConfidence: same-file, but re-verified directly against the department book rather than assumed). The department histology book (p.38, 'Fetal Lung') states each of the four options' true content directly: lobes/lobules clear from thick septa (not A), bronchi/bronchioles folded (not B), 'the whole lung sinks in water & this has a medico-legal importance' (verbatim match for C), and alveoli — not bronchioles — resemble acini (not D as stated).",
    },
    {
      key: "fetal-lung-is-similar-to-gland-in-3e898cac",
      conceptKey: "fetal-lung.collapsed-gland-like-histology",
      difficulty: "Moderate",
      questionType: "Single best answer",
      learningObjective: "State that the fetal lung's alveoli, not its bronchioles, are what resemble a gland's acini — the bronchiolar tree instead resembles a gland's ducts.",
      explanations: {
        A: "Reversed. The department book credits the ALVEOLI, not the bronchioles, with resembling a gland's acini — the bronchiolar tree itself is instead compared to a gland's ducts.",
        B: "The book credits cartilage plates around the bronchi with being exactly what DIFFERENTIATES the fetal lung FROM a gland (glands have no cartilage) — the opposite of a similarity.",
        C: "Correct. The department book states directly that the fetal lung is 'similar to a gland where branches of bronchiolar tree are similar to ducts and the alveoli are similar to acini' — alveoli are the acinus-equivalent structure.",
        D: "Reversed at the wrong level. The book compares alveoli to acini, not to ducts — it is the bronchiolar tree, a different structure, that is compared to ducts.",
      },
      answerOverride: "C",
      answerOverrideReason: "No printed key exists (answerConfidence: same-file, but re-verified directly against the department book rather than assumed). The department histology book (p.38, 'Fetal Lung', point 1) states verbatim: 'Similar to a gland where branches of bronchiolar tree are similar to ducts and the alveoli are similar to acini' — a direct match for option C, with A, B and D each reversing or misattributing a different detail from the same passage.",
    },
  ],
}
