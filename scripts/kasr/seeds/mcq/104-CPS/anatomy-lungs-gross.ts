import type { McqLeafSeed } from '../../mcq.ts'

/**
 * `104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy` — a new
 * leaf. Before minting anything, `104-CPS-anatomy-concepts.md` (not
 * `GENERATED_BY` this MCQ pipeline, so visible to `existingConceptIds()`
 * for module "104 CPS") turned out to hold a rich, already hand-authored,
 * pinned set of lung/pleura anatomy concepts, all pinned to real, live,
 * evidenced Draft articles — the same goldmine pattern documented
 * repeatedly elsewhere in this branch. Every question below is a sparse
 * reuse of one of those pinned records; this leaf mints nothing fresh.
 * `ART-104-ANA-LUNG-SEGMENTS-AND-BLOOD-SUPPLY`'s own article prose (in
 * `104-CPS-anatomy.md`) also carries a fuller bronchopulmonary-segment
 * per-lobe breakdown (3 upper/2 middle/5 lower right, 4 upper incl. 2
 * lingular/4 lower left) than the pinned concept's own summary
 * definition states — cited directly in the affected questions' own
 * explanations rather than left ungrounded.
 */
export const LEAF: McqLeafSeed = {
  leaf: "Anatomy Respiratory System — Lungs, Gross Anatomy",
  modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
  articleId: "ART-104-ANA-LUNG-SURFACE-FEATURES",

  concepts: [
    {
      // Sparse reuse: CON-RES-9E5D1C2A67CB5D, canonical_key already pinned
      // in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-LUNG-
      // SURFACE-FEATURES.
      key: "lung.hilum-and-root",
      label: "The root of the lung is enclosed in a pleural sleeve and its structures are arranged with the superior pulmonary vein most anterior, the principal bronchus most posterior and the artery in front of the bronchus",
      definition: "The hilum is the area on the mediastinal surface through which the structures of the root enter or leave the lung; the root is that group of structures, sleeved by a downward prolongation of mediastinal pleura that continues below as the pulmonary ligament. In both lungs the superior pulmonary vein lies most anteriorly, the inferior pulmonary vein most inferiorly, and the principal bronchus most posteriorly. The pulmonary artery lies in front of the bronchus, above it on the left and between the bronchus and superior pulmonary vein on the right. Bronchial vessels, the anterior and posterior pulmonary plexuses, and bronchopulmonary lymph nodes and vessels fill the spaces between these named structures. The right principal bronchus divides before it reaches the hilum into an eparterial bronchus to the upper lobe alone and a hyparterial bronchus to the middle and lower lobes.",
      objective: "Give the vertical and antero-posterior order of the structures at the root of the lung, and state that the right principal bronchus's eparterial branch supplies only the upper lobe.",
      pitfall: "Assuming the right eparterial bronchus supplies more than the upper lobe. It supplies the upper lobe alone; the middle and lower lobes are both supplied by the hyparterial bronchus.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Hilum of the lung", "Root of the lung", "Eparterial bronchus", "Hyparterial bronchus"],
    },
    {
      // Sparse reuse: CON-RES-DC7CC9CC4757BE, canonical_key already pinned
      // in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-LUNG-
      // SURFACE-FEATURES.
      key: "lung.fissures-and-lobes",
      label: "The oblique fissure is present in both lungs; only the right lung also has a horizontal fissure, which separates its upper and middle lobes",
      definition: "Both lungs have an oblique fissure, running from the posterior border 6 cm below the apex down and forwards to the inferior border, cutting as far as the hilum — corresponding on the surface to a line roughly along the medial border of the scapula when the arm is raised overhead, from about 3 cm off the T3 spine down to the sixth rib in the midaxillary line and forward to the sixth costal cartilage. The right lung alone also has a horizontal fissure, running from the fourth right costal cartilage anteriorly to meet the oblique fissure at the sixth rib in the midaxillary line, separating the upper from the middle lobe. The right lung therefore has three lobes — upper, middle and lower, the lower larger than the other two combined — while the left has only an upper lobe, equivalent to the right's upper and middle together and carrying the cardiac notch and lingula, and a lower lobe identical in extent to the right's.",
      objective: "State which fissure is unique to the right lung, name the lobes each fissure produces on each side, and give the horizontal fissure's own anterior (fourth costal cartilage) and lateral (sixth rib, midaxillary line) surface markings.",
      pitfall: "Assuming the left lung has no equivalent of the right middle lobe at all. It has no separate lobe, but the lingula of its upper lobe occupies the same territory the middle lobe occupies on the right.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Oblique fissure", "Horizontal fissure", "Lobes of the lung", "Surface markings of the lung fissures"],
    },
    {
      // Sparse reuse: CON-RES-2A560C53F8E712, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // LUNG-SEGMENTS-AND-BLOOD-SUPPLY. The per-lobe segment breakdown
      // (3/2/5 right, 4/4 left) is stated in that article's own prose
      // (104-CPS-anatomy.md) rather than in this concept's own shorter
      // summary definition — restated here from the article directly,
      // not invented.
      key: "bronchopulmonary-segment.definition-and-distribution",
      label: "A bronchopulmonary segment is a wedge-shaped, functionally independent unit supplied by its own segmental (tertiary) bronchus and pulmonary artery branch, ten on the right and eight on the left",
      definition: "A bronchopulmonary segment is a functionally independent unit of lung tissue supplied by a segmental (tertiary) bronchus and an accompanying end-artery branch of the pulmonary artery, with its own lymphatics and autonomic innervation (carried with the bronchial tree, not by the phrenic nerve). Each segment is wedge-shaped, apex at the hilum and base at the lung surface, separated from its neighbours by connective-tissue septa that carry the intersegmental radicles of the pulmonary veins. The trachea divides into two main bronchi, each dividing into lobar (secondary) bronchi — three on the right, two on the left — which divide again into segmental bronchi: ten on the right (three in the upper lobe, two in the middle, five in the lower) and eight on the left (four in the upper lobe, including two lingular segments, and four in the lower), the left having fewer because its apical and posterior segments share a common stem and its medial basal segment is frequently absent, though the numbering is kept identical on both sides for comparison.",
      objective: "Define a bronchopulmonary segment by its bronchus, artery and vein relationships; give the segment count per lobe on each side; and state that the phrenic nerve plays no role in a segment's own innervation.",
      pitfall: "Quoting '10 segments' or '8 segments' as if it applied to 'each lung' rather than one specific side — it is 10 on the right and 8 on the left, never the same figure for both.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Bronchopulmonary segments", "Segmental (tertiary) bronchus", "Lingular segments"],
      gaps: [
        "Neither the pinned concept nor its own teaching article names the lingula's two segments as 'superior' and 'inferior' explicitly — only that there are two. That specific naming is standard, undisputed bronchopulmonary-segment nomenclature; flagged for the article-authoring lane.",
      ],
    },
    {
      // Sparse reuse: CON-RES-CF9852282948CD, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // LUNG-SEGMENTS-AND-BLOOD-SUPPLY.
      key: "lung.dual-blood-supply",
      label: "The lung has two separate circulations: the functional pulmonary circulation, carrying deoxygenated blood to the alveoli, and the nutritive bronchial circulation, carrying oxygenated blood to the bronchial tree, stroma and visceral pleura",
      definition: "The lung receives two separate circulations. The functional, pulmonary circulation carries deoxygenated blood from the right ventricle by one pulmonary artery per lung, which branches with the bronchial tree as far as the alveolar capillaries as end arteries with no anastomoses between segments, and returns oxygenated blood to the left atrium by two pulmonary veins, superior and inferior, per lung. The nutritive, bronchial circulation supplies the bronchial tree, stroma and visceral pleura with OXYGENATED blood: the right lung by one bronchial artery from the third right posterior intercostal artery (or the upper left bronchial artery), the left lung by two bronchial arteries from the descending thoracic aorta, with bronchial veins draining the right lung to the azygos vein and the left to the superior hemiazygos vein. The alveoli themselves are supplied only by the pulmonary, not the bronchial, circulation.",
      objective: "State which circulation (pulmonary or bronchial) carries oxygenated versus deoxygenated blood, which one reaches the alveoli, and where each drains.",
      pitfall: "Treating 'blood supply of the lung' as one system. A question naming only the pulmonary artery and veins has answered function (gas exchange), not nutrition — the bronchial arteries are the ones an examiner is testing when the question turns to the lung's own tissue, and it is those bronchial arteries, not the pulmonary arteries, that carry OXYGENATED blood.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Bronchial artery", "Bronchial vein", "Pulmonary vs bronchial circulation"],
    },
    {
      // Sparse reuse: CON-RES-491F7739C10120, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // LUNG-SURFACE-FEATURES.
      key: "right-vs-left-lung.differences",
      label: "The right lung is shorter, broader and heavier than the left, has three lobes and two fissures against the left's two lobes and one, and ten bronchopulmonary segments against eight",
      definition: "The right lung is shorter than the left because the liver raises the right cupola of the diaphragm, but broader because the heart bulges to the left, and it is heavier with a greater capacity. Its anterior border is straight, unlike the left's cardiac notch and lingula, and its base is less concave. It has two fissures and three lobes against the left's one fissure and two lobes. At the hilum its superior lobar bronchus is eparterial, arising outside the lung and above the pulmonary artery, while the left's arises inside the lung; its pulmonary artery lies between the bronchus and the superior pulmonary vein rather than above and in front of the bronchus as on the left; and it has one bronchial artery against the left's two. It has ten bronchopulmonary segments against the left's eight.",
      objective: "List the size, lobe, fissure, segment-count and hilar-arrangement differences between the right and left lung.",
      pitfall: "Assuming 'larger' means the right lung is longer. It is actually shorter than the left (the liver raises the right diaphragmatic dome) but broader and heavier overall.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Right vs left lung", "Differences between the two lungs"],
    },
    {
      // Sparse reuse: CON-RES-DC1111DA6DD151, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // LUNG-SURFACE-FEATURES.
      key: "lung.mediastinal-surface-impressions",
      label: "The mediastinal surfaces of the two lungs carry different impressions: the right is grooved by the SVC, ascending aorta and azygos arch anterior/above its hilum, the left by the aortic arch and its branches above and the descending aorta behind",
      definition: "On the right lung's mediastinal surface, in front of and above the hilum lie the cardiac impression (related to the right atrium and auricle), the groove for the superior vena cava (continuing up into the right brachiocephalic vein groove), the triangular impression for the ascending aorta, the groove for the inferior vena cava, and the groove for the arch of the azygos vein, with the tracheal and oesophageal grooves, the latter continuing behind the hilum. On the left lung's mediastinal surface, the cardiac impression is related mainly to the left ventricle and atrium; above the hilum lie the broad groove for the arch of the aorta — separated from the lung by the left phrenic and vagus nerves, the superficial cardiac plexus and the left superior intercostal vein — and the grooves for the left common carotid and left subclavian arteries, with the oesophageal groove behind the subclavian groove; behind the hilum lies the groove for the descending thoracic aorta. The oesophagus is therefore the one structure leaving an impression on BOTH lungs' mediastinal surfaces. The right root itself sits anterior to (in front of) the IVC/SVC/azygos grooves, not behind them; the left root sits anterior to the descending aorta, which grooves the lung behind its hilum.",
      objective: "Name the vascular impressions above and in front of the hilum on the right lung and the left, state which single structure impresses both lungs, and give the antero-posterior relation of each root to its neighbouring great vessel.",
      pitfall: "Placing the ascending aorta's impression on the left lung. It is a right-lung impression, triangular and anterior to the hilum; the left lung's equivalent anterior impression is the pulmonary trunk, a different vessel entirely — and 'descending aorta behind the left hilum' should not be confused with 'aortic arch above the left hilum', two separate impressions from two different parts of the same vessel.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Cardiac impression", "Groove for the arch of the aorta", "Groove for the azygos vein", "Root of the lung relations"],
      gaps: [
        "This concept's own pinned definition does not itself state the root's vertebral level (T5-7) — standard, undisputed thoracic anatomy, not spelled out verbatim by the currently authored article; flagged for the article-authoring lane.",
      ],
    },
    {
      // Sparse reuse: CON-RES-69F499B794713C, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // LUNG-SURFACE-FEATURES.
      key: "lung.external-features",
      label: "Each lung resembles half a cone, with an apex above the medial third of the clavicle, a concave base on the diaphragm, a thin sharp anterior border, a thick rounded posterior border, and a costal and a medial (hilum-bearing) surface",
      definition: "Each lung resembles half a cone, with an apex projecting through the thoracic inlet to about one inch above the medial third of the clavicle, and a concave base resting on the diaphragm. It has two surfaces — a wide convex costal surface against the ribs, and a medial surface bearing the hilum, divided into a vertebral part related to the vertebral bodies, intercostal nerves and sympathetic chain, and a mediastinal part carrying the hilum and the grooves for neighbouring structures — and three borders: a thin, sharp anterior border, notched by the first rib above and, on the left, carrying the cardiac notch and lingula below; a thick, rounded posterior border; and an inferior border encircling the base.",
      objective: "Name the apex's surface landmark, describe the costal and medial surfaces, and state which border is thin/sharp and which is thick/rounded.",
      pitfall: "Assuming both lungs have an identical anterior border. Only the right is straight; the left carries the cardiac notch and lingula. Also assuming the ANTERIOR border is thick and rounded — that description belongs to the POSTERIOR border; the anterior border is thin and sharp.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Apex of the lung", "Base of the lung", "Costal surface", "Mediastinal surface", "Cardiac notch", "Lingula"],
    },
    {
      // Sparse reuse: CON-RES-CED26421AF8B39, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // PLEURA-STRUCTURE-AND-SURFACE-ANATOMY.
      key: "pleura.divisions-and-recesses",
      label: "The parietal pleura is named cervical, costal, mediastinal and diaphragmatic by the wall it lines, and the suprapleural membrane (Sibson's fascia) protects the cervical pleura and apex of the lung, resisting rather than assisting upward bulging",
      definition: "The parietal pleura is subdivided by the wall it lines: cervical pleura over the lung apex, costal pleura against the ribs and intercostal spaces, mediastinal pleura against the sides of the mediastinum — which encloses the root of the lung and continues below it as the pulmonary ligament — and diaphragmatic pleura over the diaphragm. Two recesses in each sac are not occupied by lung except in forced inspiration: the costomediastinal recess, between costal and mediastinal pleura behind the sternum, and the costodiaphragmatic recess, between costal and diaphragmatic pleura at the outlet of the thorax. The suprapleural membrane (Sibson's fascia), a dense fascial layer triangular in shape with its apex attached to the transverse process of C7 and its base at the inner border of the first rib and costal cartilage, closes the thoracic inlet and protects the cervical pleura and apex of the lung, RESISTING both inward suction at the neck root during inspiration and upward bulging of the apex during forced expiration — it does not itself move upward to increase thoracic vertical diameter.",
      objective: "Name the four regions of parietal pleura, describe the costodiaphragmatic recess, and state the suprapleural membrane's attachments and its resisting (not enabling) role against apex movement.",
      pitfall: "Assuming the suprapleural membrane's role is to allow the lung apex to move upward and expand thoracic volume. It does the opposite — it is a resisting, protective fascial sheet that PREVENTS the apex bulging upward and the neck root being sucked inward, not a structure that itself moves to increase any diameter.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Costomediastinal recess", "Costodiaphragmatic recess", "Pulmonary ligament", "Sibson's fascia", "Suprapleural membrane"],
    },
    {
      // Sparse reuse: CON-RES-B833146BBFCB26, canonical_key already
      // pinned in 104-CPS-anatomy-concepts.md, pinned to ART-104-ANA-
      // PLEURA-STRUCTURE-AND-SURFACE-ANATOMY.
      key: "pleura.surface-anatomy",
      label: "The parietal pleura's inferior border runs obliquely backwards, crossing the eighth rib in the midclavicular line, the tenth in the midaxillary line and the twelfth spine posteriorly",
      definition: "The cervical pleura is represented by a curved line, convex upwards, from the junction of the medial and middle thirds of the clavicle to the sternoclavicular joint, its highest point about 3 cm above the medial third of the clavicle. The inferior border runs obliquely backwards, crossing the eighth rib in the midclavicular line, the tenth in the midaxillary line and the twelfth spine posteriorly, and the posterior border ascends vertically alongside the vertebral column from the twelfth to the first thoracic spine.",
      objective: "Give the pleural reflection's rib level at the midclavicular, midaxillary and paravertebral lines.",
      pitfall: "Confusing the pleura's own inferior border (two ribs lower at each landmark) with the lung's own inferior border, which crosses the sixth rib in the midclavicular line and the eighth in the midaxillary line — the pleura extends further down than the lung it encloses, which is exactly the margin the costodiaphragmatic recess occupies.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Pleural reflection", "Surface anatomy of the pleura"],
    },
    {
      // Sparse reuse: CON-RES-3AB5ED388161A2, canonical_key already
      // pinned in 104-CPS-concepts.md (the written-paper pipeline's own
      // generated concept file — not GENERATED_BY this MCQ pipeline, so
      // existingConceptIds() for module "104 CPS" does see it, the same
      // reuse class documented repeatedly elsewhere in this branch).
      key: "pleura.nerve-supply",
      label: "Visceral pleura takes autonomic fibres from the pulmonary plexuses and feels no pain; parietal pleura takes the somatic nerve of the wall it lines, not the pulmonary plexuses",
      definition: "The visceral (pulmonary) pleura is supplied by the same autonomic innervation as the lung, through the anterior and posterior pulmonary plexuses, and is not sensitive to somatic stimuli such as pain and temperature. The parietal pleura takes the somatic innervation of the structure it lines: the cervical pleura from the first intercostal nerve, the costal pleura segmentally from the corresponding intercostal nerve, the mediastinal pleura and the central part of the diaphragmatic pleura from the phrenic nerve, and the peripheral part of the diaphragmatic pleura from the lower intercostal nerves.",
      objective: "Give the nerve supply of visceral and parietal pleura, naming the nerve for each part of the parietal pleura, and state that the pulmonary plexuses supply the VISCERAL, not the parietal, pleura.",
      pitfall: "Giving the phrenic nerve the whole diaphragmatic pleura, or crediting the pulmonary plexuses with the parietal pleura's own supply. Only the diaphragmatic pleura's central part is phrenic (the periphery is intercostal), and the pulmonary plexuses supply the VISCERAL pleura alone — the parietal pleura is somatically, not autonomically, innervated throughout.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Respiratory System > Lungs — Gross Anatomy",
      type: "structural_description",
      aliases: ["Nerve supply of the pleura", "Visceral pleura innervation", "Parietal pleura innervation"],
    },
  ],

  questions: [
    {
      key: "following-statements-regarding-lungs-are-true-except-a8d8c3cf",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the ascending aorta's impression belongs to the RIGHT, not the left, lung's mediastinal surface — the exception among four otherwise true statements.",
      explanations: {
        A: "The exception, and the answer. The ascending aorta's triangular impression is a RIGHT-lung mediastinal-surface feature, anterior to the hilum — placing it on the LEFT lung is incorrect; the left lung's own anterior impression at that level is instead the pulmonary trunk, a different vessel.",
        C: "True, so not the exception. Each lung receives non-oxygenated (deoxygenated) blood through its own pulmonary artery, part of the functional pulmonary circulation carrying blood from the right ventricle to the alveolar capillaries for gas exchange.",
        D: "True, so not the exception. The horizontal fissure of the right lung runs from the fourth right costal cartilage anteriorly to meet the oblique fissure at the sixth rib in the midaxillary line.",
        E: "True, so not the exception. The intersegmental connective-tissue septa between adjacent bronchopulmonary segments carry the radicles of the pulmonary veins — the one component of a segment's supply that is not itself confined within one segment.",
      },
    },
    {
      key: "i-regarding-the-root-of-the-lung-mark-the-incorrect-answer-0-e92f0fa9",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the right lung's root lies IN FRONT OF, not behind, the inferior vena cava — the incorrect statement among four otherwise true ones about the root of the lung.",
      explanations: {
        A: "True, so not the incorrect answer. The root of the lung lies opposite the bodies of the T5, T6 and T7 vertebrae. (Standard thoracic anatomy; not spelled out verbatim by this leaf's own currently authored article — flagged as a gap for the article-authoring lane.)",
        B: "True, so not the incorrect answer. Bronchial vessels are among the structures filling the spaces between the named components of the root, alongside the pulmonary plexuses and bronchopulmonary lymph nodes.",
        C: "The incorrect statement, and the answer. The root of the right lung lies IN FRONT OF (anterior to), not behind, the inferior vena cava — the IVC grooves the right lung's mediastinal surface in front of and above the hilum, not posterior to it.",
        D: "True, so not the incorrect answer. The root of the left lung lies anterior to the descending thoracic aorta, which grooves the left lung's mediastinal surface behind the hilum — the same relation stated from the aorta's side.",
      },
    },
    {
      key: "pleural-reflection-lies-at-which-rib-level-in-the-midclavicu-4742bd47",
      conceptKey: "pleura.surface-anatomy",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the pleural reflection crosses the eighth rib in the midclavicular line.",
      explanations: {
        A: "This is the correct answer. The parietal pleura's inferior border crosses the eighth rib in the midclavicular line, two ribs below the lung's own inferior border at the same landmark (the sixth rib) — the gap the costodiaphragmatic recess occupies.",
        B: "The ninth rib is not the pleural reflection's own midclavicular-line level; it is the eighth rib, not the ninth.",
        C: "The tenth rib is the pleural reflection's level in the MIDAXILLARY line, not the midclavicular line asked about here.",
        D: "The twelfth rib (or spine) is the pleural reflection's level posteriorly (paravertebrally), not in the midclavicular line.",
      },
    },
    {
      key: "regarding-bronchopulmonary-segments-which-is-correct-03061e6c",
      conceptKey: "bronchopulmonary-segment.definition-and-distribution",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the right lung's upper lobe divides into three bronchopulmonary segments, as opposed to false claims about segment count, innervation or shape.",
      explanations: {
        A: "There are ten bronchopulmonary segments on the RIGHT and eight on the LEFT — 'approximately 10 in each lung' is incorrect for the left side specifically.",
        B: "This is the correct answer. The right lung's upper lobe has three bronchopulmonary segments (apical, posterior, anterior) — part of its own total of ten (3 upper, 2 middle, 5 lower).",
        C: "A bronchopulmonary segment's own innervation runs with its bronchial tree, autonomically, not via the phrenic nerve — the phrenic nerve supplies the diaphragm and parts of the pleura, not the lung parenchyma's own segments.",
        D: "A bronchopulmonary segment is wedge-shaped (apex at the hilum, base at the lung surface), not quadrangular.",
      },
    },
    {
      key: "regarding-surface-markings-of-the-lungs-the-following-is-tru-173291e3",
      conceptKey: "lung.fissures-and-lobes",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the oblique fissure's surface line follows the medial border of the scapula when the arm is abducted overhead.",
      explanations: {
        A: "The lung apex rises about one inch (roughly 3 cm) above the MEDIAL third of the clavicle, not 5 cm above the LATERAL third — both the landmark and the distance given here are wrong.",
        B: "The oblique fissure's surface line does not follow the axis of the fourth rib; its own course runs from about 3 cm off the T3 spinous process down to the sixth rib in the midaxillary line and forward to the sixth costal cartilage.",
        C: "This is the correct answer. With the arm raised (abducted) overhead, the oblique fissure's surface projection corresponds closely to the medial border of the scapula in that position — the classic bedside landmark for locating it.",
        D: "The horizontal (transverse) fissure of the right lung runs from the fourth costal cartilage anteriorly to the sixth rib in the midaxillary line — not at the eighth costal cartilage level.",
      },
    },
    {
      key: "regarding-the-blood-supply-of-the-lungs-mark-one-correct-sta-475d3a78",
      conceptKey: "lung.dual-blood-supply",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the bronchial arteries, part of the nutritive circulation, carry oxygenated blood to the lung tissue, as opposed to the pulmonary vessels' own reversed (deoxygenated-in, oxygenated-out) roles.",
      explanations: {
        A: "This is the correct answer. The bronchial arteries, branches of the descending thoracic aorta (or, on the right, the third posterior intercostal artery), carry OXYGENATED blood to nourish the bronchial tree, lung stroma and visceral pleura — the nutritive circulation, distinct from the pulmonary vessels' gas-exchange role.",
        B: "Backwards: the pulmonary veins carry OXYGENATED, not deoxygenated, blood — they return blood from the alveolar capillaries, after gas exchange, to the left atrium.",
        C: "Backwards: the pulmonary arteries carry DEoxygenated, not oxygenated, blood — from the right ventricle to the alveolar capillaries for gas exchange.",
        D: "The alveoli are surrounded by capillaries from the PULMONARY, not the bronchial, circulation — the bronchial arteries nourish the bronchial tree, stroma and visceral pleura but do not reach the alveolar capillary bed itself.",
        E: "The pulmonary veins drain into the LEFT, not the right, atrium — carrying newly oxygenated blood back to the systemic side of the heart.",
      },
    },
    {
      key: "regarding-the-lungs-all-the-following-statements-are-true-ex-1bfb9298",
      conceptKey: "lung.external-features",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the lung's anterior border is thin and sharp, not thick and rounded — the exception among four otherwise true statements about the lung's shape.",
      explanations: {
        A: "True, so not the exception. The lung's apex projects through the thoracic inlet into the root of the neck, above the medial third of the clavicle.",
        B: "True, so not the exception. The lung's costal surface is wide, smooth and convex, against the ribs and intercostal spaces.",
        C: "True, so not the exception. The lung's mediastinal surface is concave, moulded against the heart and mediastinal structures it lies beside.",
        D: "The exception, and the answer. The lung's ANTERIOR border is thin and sharp, not thick and rounded — 'thick and rounded' instead describes the POSTERIOR border; the two are opposite in character.",
        E: "True, so not the exception. The lung's posterior border lies beside the vertebral column, corresponding to the vertebral part of its medial surface.",
      },
    },
    {
      key: "regarding-the-bronchopulmonary-segments-choose-the-correct-s-a03bf8bf",
      conceptKey: "bronchopulmonary-segment.definition-and-distribution",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Two independently defensible 'correct' answers survive in this option set: option C ('supplied by a tertiary bronchus') and option D ('supplied by end arteries') are BOTH true by this pipeline's own bronchopulmonary-segment concept, whose own definition states a segment is supplied by 'a segmental (tertiary) bronchus AND an accompanying end-artery branch of the pulmonary artery' — the same defining sentence names both facts as jointly true, with nothing in the sourced concept singling out one over the other as THE single correct statement in a 'choose the correct' (not 'choose the best') format. This row's own extraction confidence is additionally the weakest tier (editorial-no-printed-key, an educated guess rather than a verified printed key), reinforcing rather than resolving the doubt. Not authored to assert a single correct answer where two are equally defensible; the genuine tertiary-bronchus and end-artery facts are both taught cleanly via this leaf's own concept and its other kept questions.",
    },
    {
      key: "regarding-the-lungs-mark-the-wrong-statement-e5cc97b5",
      conceptKey: "pleura.nerve-supply",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option E's own text is not a statement about lungs at all — it is another question's own stem, bled in verbatim ('i Regarding the root of the lung; mark the incorrect answer:'), and option C is missing entirely. Only 3 usable options survive (A, B, D), below the platform's 4-to-5-option import contract, even though the credited answer (B — parietal pleura is NOT supplied by the pulmonary plexuses, which instead supply the visceral pleura) is itself well-grounded via this leaf's own pleura.nerve-supply concept. The genuine parietal-vs-visceral-pleura innervation fact is taught cleanly instead via this leaf's own regarding-the-pleura-all-the-following-statements-are-true-e-1968aabb question below.",
    },
    {
      key: "regarding-the-lungs-the-following-statements-are-correct-exc-e8f3c3d0",
      conceptKey: "lung.hilum-and-root",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the right lung's eparterial bronchus supplies the upper lobe alone, not the upper and middle lobes together — the exception among four otherwise true statements.",
      explanations: {
        A: "True, so not the exception. The bronchial arteries supply nutrition (oxygenated blood) to the lung tissue, part of the nutritive bronchial circulation distinct from the pulmonary vessels' gas-exchange role.",
        C: "The exception, and the answer. The right lung's eparterial bronchus supplies the UPPER LOBE ALONE — the middle and lower lobes are instead supplied by the separate hyparterial bronchus, arising below the pulmonary artery; crediting the eparterial bronchus with both the upper and middle lobes is incorrect.",
        D: "True, so not the exception. The right lung's upper lobe has three bronchopulmonary segments (apical, posterior, anterior).",
        E: "True, so not the exception. The apex of each lung projects into the root of the neck, above the medial third of the clavicle.",
      },
    },
    {
      key: "regarding-the-pleura-all-the-following-statements-are-true-e-1968aabb",
      conceptKey: "pleura.nerve-supply",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the visceral pleura is innervated autonomically by the pulmonary plexuses, not by the phrenic and lower five intercostal nerves — the exception among four otherwise true statements about the pleura.",
      explanations: {
        A: "True, so not the exception. The costodiaphragmatic recess is occupied by the lung's own inferior border during forced (deep) inspiration, when the expanding lung fills the space the recess normally leaves empty at rest.",
        B: "True, so not the exception. The visceral pleura, adherent to the lung throughout its surface, extends into the fissures between the lobes along with the lung tissue it covers.",
        C: "True, so not the exception. Lymphatics draining the visceral pleura pass centripetally to the bronchopulmonary lymph nodes at the hilum, the first station on the lung's own lymphatic drainage pathway.",
        D: "The exception, and the answer. The VISCERAL pleura is innervated autonomically, via the anterior and posterior pulmonary plexuses, and is insensitive to somatic pain — it is the PARIETAL pleura (specifically its mediastinal and central diaphragmatic parts) that takes the phrenic nerve, with costal pleura taking the segmental intercostal nerves instead of 'the lower five' uniformly.",
        E: "True, so not the exception. The costal pleura is separated from the ribs and costal cartilages by the endothoracic fascia, a thin fibroelastic layer between the two.",
      },
    },
    {
      key: "regarding-the-right-lung-all-the-following-statements-are-tr-6f98f439",
      conceptKey: "right-vs-left-lung.differences",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the right lung's horizontal fissure runs at the fourth, not the sixth, costal cartilage anteriorly — the exception among four otherwise true statements about the right lung.",
      explanations: {
        A: "True, so not the exception. The right lung is heavier and has a greater capacity than the left, even though it is shorter (the liver raises the right diaphragmatic dome).",
        B: "The exception, and the answer. The right lung's horizontal fissure runs anteriorly from the FOURTH right costal cartilage, not the sixth — it meets the oblique fissure at the sixth rib in the midaxillary line, but that sixth-rib point is a different, lateral landmark from where the horizontal fissure itself begins anteriorly.",
        C: "True, so not the exception. The right lung's upper lobe has three bronchopulmonary segments.",
        D: "True, so not the exception. The right lung's anterior border is straight, running vertically down to about the sixth costal cartilage, unlike the left's cardiac notch and lingula.",
        E: "True, so not the exception. The right lung's cardiac impression, anterior to its hilum, is related to the right atrium and auricle.",
      },
    },
    {
      key: "regarding-the-root-of-the-lung-all-true-except-5bb8ca0c",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the right lung's root lies IN FRONT OF, not behind, the inferior vena cava — the exception among five otherwise true statements about the root of the lung.",
      explanations: {
        A: "True, so not the exception. The root of the lung lies opposite the bodies of the T5, T6 and T7 vertebrae. (Standard thoracic anatomy; not spelled out verbatim by this leaf's own currently authored article — flagged as a gap for the article-authoring lane.)",
        B: "True, so not the exception. Bronchial vessels are among the structures filling the spaces between the named components of the root.",
        C: "The exception, and the answer. The root of the right lung lies IN FRONT OF, not behind, the inferior vena cava — the IVC grooves the right lung's mediastinal surface in front of and above the hilum.",
        D: "True, so not the exception. The root of the left lung lies anterior to the descending thoracic aorta, which grooves the left lung's mediastinal surface behind the hilum.",
        E: "True, so not the exception. The cardiac impression lies anterior to and below the root of the lung on both sides.",
      },
    },
    {
      key: "regarding-the-root-of-the-lung-one-is-incorrect-ab551b87",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the right lung's root lies IN FRONT OF, not behind, the inferior vena cava — the incorrect statement among four otherwise true ones about the root of the lung.",
      explanations: {
        A: "True, so not the incorrect answer. Bronchial vessels are among the structures included at the root of the lung, filling the spaces between its named components.",
        B: "The incorrect statement, and the answer. The root of the right lung lies IN FRONT OF, not behind, the inferior vena cava.",
        C: "True, so not the incorrect answer. The root of the left lung lies anterior to the descending thoracic aorta, which grooves the left lung's mediastinal surface behind the hilum.",
        D: "True, so not the incorrect answer. The cardiac impression lies anterior to and below the root of the lung.",
      },
    },
    {
      key: "regarding-the-suprapleural-membrane-all-the-following-statem-c8caf1dc",
      conceptKey: "pleura.divisions-and-recesses",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the suprapleural membrane resists, rather than causes, upward movement of the thoracic apex — the exception among four otherwise true statements about it.",
      explanations: {
        A: "True, so not the exception. The suprapleural membrane (Sibson's fascia) is a dense fascial layer that closes off the thoracic inlet, protecting the structures beneath it.",
        B: "True, so not the exception. Its base is attached to the inner border of the first rib and its costal cartilage.",
        C: "True, so not the exception. Its apex is attached to the transverse process of the seventh cervical vertebra.",
        D: "True, so not the exception. It protects the cervical pleura and the apex of the lung beneath it from injury and from being sucked inward during inspiration.",
        E: "The exception, and the answer. The suprapleural membrane does NOT move upwards to increase thoracic vertical diameter — it does the opposite, RESISTING upward bulging of the lung apex during forced expiration and inward suction at the root of the neck during inspiration, functioning as a protective, largely static fascial sheet rather than a moving one.",
      },
    },
    {
      key: "what-lies-posterior-to-the-right-root-of-the-lung-961e042f",
      conceptKey: "lung.hilum-and-root",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify the right vagus nerve as the structure lying posterior to the root of the right lung, as distinct from the phrenic nerve's own anterior position.",
      explanations: {
        A: "The aorta does not lie directly posterior to the right root specifically — the arch and descending aorta relate mainly to the left side of the mediastinum and the left lung's own root, not the right.",
        B: "The right PHRENIC nerve descends in front of, not behind, its lung's root, separated from it by mediastinal pleura — the opposite position from what this question asks about.",
        C: "This is the correct answer. The right vagus nerve descends posterior to the root of the right lung, contributing to the posterior pulmonary plexus there — the complementary position to the phrenic nerve's own anterior course past the same root. (Defensible by the phrenic nerve's confirmed anterior position and standard paired thoracic-nerve anatomy; the currently authored article states the phrenic relation explicitly but not this specific vagus relation — flagged as a gap for the article-authoring lane.)",
        D: "The LEFT, not the right, vagus nerve lies near the left root (crossing the aortic arch before giving the left recurrent laryngeal nerve) — it has no direct relation to the RIGHT lung's root.",
      },
    },
    {
      key: "which-of-the-following-are-the-bronchopulmonary-segments-of-b8d446b1",
      conceptKey: "bronchopulmonary-segment.definition-and-distribution",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Name the superior and inferior lingular segments as the two bronchopulmonary segments of the left lung's lingula.",
      explanations: {
        A: "Anterior and posterior are not the lingula's own segment names — those terms instead describe two of the segments elsewhere in the upper lobe (apical, posterior, anterior on the standard numbering).",
        B: "Medial and lateral are the names of two of the RIGHT middle lobe's own segments, the lingula's closest anatomical analogue on the other side — not the lingula's own segment names.",
        C: "This is the correct answer. The lingula of the left lung's upper lobe — the analogue of the right middle lobe — divides into two bronchopulmonary segments, the superior and inferior lingular segments. (The article confirms the lingula carries exactly two segments within the left upper lobe's total of four; the specific 'superior/inferior' naming is standard bronchopulmonary-segment nomenclature not spelled out verbatim by the currently authored article — flagged as a gap for the article-authoring lane.)",
        D: "Anterior basal and posterior basal are two of the LOWER lobe's own basal segments (shared in name and position by both lungs), not segments of the lingula, which sits in the upper lobe.",
        E: "Not correct: the lingula does have two named bronchopulmonary segments of its own (superior and inferior lingular), so 'none of the above' does not apply.",
      },
    },
    {
      key: "which-one-of-the-following-structures-leaves-an-impression-o-bc55d0f1",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify the oesophagus as the one structure that leaves an impression on the mediastinal surfaces of BOTH lungs.",
      explanations: {
        A: "This is the correct answer. The oesophagus grooves the mediastinal surface of both lungs — behind the hilum on the right, and behind the subclavian-artery groove (also behind the hilum) on the left — making it the one structure common to both sides' impressions.",
        C: "The inferior vena cava grooves only the RIGHT lung's mediastinal surface (in front of and above the hilum); the left lung has no IVC-related impression at all.",
        D: "The superior vena cava likewise grooves only the RIGHT lung's mediastinal surface; it has no equivalent impression on the left lung.",
      },
    },
    {
      key: "one-of-the-followings-is-a-main-feature-of-the-right-lung-fe-6a94ad9a",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 2 usable option letters survive extraction (B, D) — the credited option ('a- It has two lobes') has bled entirely into the stem itself, and options A and C are both missing outright. Far below the platform's 4-to-5-option import contract. The genuine right-lung-feature facts this row would test (three lobes, not two; azygos arch above the hilum) are taught cleanly elsewhere in this leaf via right-vs-left-lung.differences and lung.mediastinal-surface-impressions.",
    },
    {
      key: "03-6-visceral-pleufa-is-innervated-by-the-phrenic-and-the-fo-5369899d",
      conceptKey: "pleura.nerve-supply",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "This row merges at least three separate source questions' text across the stem/option boundary: a visceral-pleura-innervation fragment ('visceral pleura is innervated by the phrenic and the lower five intercostal nerves'), a right-lung-fissures fragment ('the right lung has horizontal and oblique fissures'), and a right-lung-wrong-statement stem, all run together, with only 3 option letters (B, C, D — no A) surviving and none of them answering a single coherent question. Below the platform's 4-to-5-option import contract regardless of which embedded question is considered; the genuine visceral-pleura-is-autonomic-not-phrenic fact this fragment touches on is taught cleanly instead via this leaf's own regarding-the-pleura-all-the-following-statements-are-true-e-1968aabb question above.",
    },
    {
      key: "what-impression-cannot-be-found-on-the-mediastinal-surface-o-630618f3",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option A's own text is itself a merge of two distinct choices ('The groove for inferior vena cava' and 'The groove for the left subclavian artery' run together with no letter boundary between them), and option B is missing outright — leaving the letter-to-content mapping unreliable for the remaining options. The bank's own credited answer (D, 'groove for superior vena cava... cannot be found') directly contradicts this leaf's own sourced lung.mediastinal-surface-impressions concept, under which the SVC groove IS a genuine right-lung mediastinal-surface feature — the physiologically consistent 'cannot be found on the right lung' answer is instead the left subclavian artery groove (a LEFT-lung-only impression), which is exactly the fact merged into corrupted option A rather than cleanly lettered on its own. Not authored to assert a credited answer that contradicts this pipeline's own sourced concept when the corruption plausibly explains the mismatch; the genuine fact (SVC groove is right-lung-only, left subclavian groove is left-lung-only) is taught cleanly via this leaf's own lung.mediastinal-surface-impressions concept and its other kept questions.",
    },
  ],
}
