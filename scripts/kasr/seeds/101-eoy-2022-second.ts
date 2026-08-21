/**
 * The September 2022 second-round paper for 101 ISK, as data.
 *
 * `Module Name: Normal Structure of the Human Body / Module Code: ISK-101 /
 * Final Theoretical Module Exam / Date: 24/9/2022 / Time allowed: 3 hours /
 * Total Marks: 96 marks`, fourteen pages. Fourteen numbered short-answer
 * questions worth seventy-four marks, interleaving Histology, Anatomy and
 * Embryology in one unsectioned series exactly as the July paper does.
 *
 * ## Why this is `resit` and not `end_of_year`
 *
 * Same module, same cohort, same cover total, two months later: 24/7/2022 was
 * the first round and 24/9/2022 is الدور الثاني, the September sitting for
 * students who did not pass it — the round definitions the corpus uses are in
 * `scripts/kasr/extract/sittings.json`. The manifest agrees, giving this file
 * `examSitting: "first"` and the July one `"second"`, which is the wrong way
 * round against the dates printed on the two covers; the dates are followed
 * here. Tiering it `resit` also keeps its batch from colliding with the July
 * paper's, which sharing a year and a tier would have caused silently.
 *
 * ## Which file this is
 *
 * `EOY 195 first 2022  101 ISK  final module (1).pdf`
 * (src_1641d3629225bb111726), fourteen pages, no text layer. Its filename says
 * "first" and is wrong. It is a different paper from
 * `EOY 195 first 2022 101 ISK final (1).pdf`, which is seventeen pages and
 * dated 24/7/2022 — the two differ from their first question, Golgi apparatus
 * here against mitochondria there, and go on differing through every question
 * and every MCQ. The same fourteen pages appear twice more inside
 * `EOY 101 exams not answerd (1).pdf` (its pages 18–31 and 46–59), which is a
 * scrapbook holding both 2022 papers twice over. Seeded once, from its own file.
 *
 * ## Marks
 *
 * All printed. They reconcile to the cover total: Section A 74 + Section B
 * (29 MCQs at ½) 14.5 + Section C (3 extended-matching tables, ½ a match) 7.5
 * = 96. Question 14 prints two problem-solving cases, I and II, at five marks
 * each; its ten lettered subparts are seeded as ten parts at one mark each,
 * with the case numeral kept in the part letter.
 *
 * ## Where the mark schemes come from
 *
 * The department's own book, `scripts/kasr/extract/deptbook.json`, at the
 * chapter on each seed's `modulePath`. No solved copy of this paper exists in
 * the corpus. Granularity follows the department's July 2023 model answer in
 * `scripts/kasr/extract/sittings.json` — name and mechanism paid separately,
 * alternatives inside a point joined by OR.
 *
 * ## Keys
 *
 * All from `clusters.json` verbatim except Q7, which reuses the key the 2025
 * EOY seed minted for the radial nerve so that the two sittings deduplicate;
 * the cluster spells the same objective one letter differently. Flagged on the
 * seed. Eleven of this paper's fourteen questions ask something another paper
 * in this corpus also asks, which is the highest overlap of any sitting read so
 * far and is the point of reading the second round at all.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this paper is. */
export const SOURCE: SourceRef = {
  id: 'src_1641d3629225bb111726',
  file: 'EOY 195 first 2022  101 ISK  final module (1).pdf',
  sittingYear: 2022,
  tier: 'resit',
  sections: ['Section A'],
  incomplete:
    'Section A only. The paper also prints Section B — 29 multiple-choice questions at half a mark each, '
    + 'pages 11–13 — and Section C — three extended-matching tables at half a mark a match, page 14, on '
    + 'cytoplasmic organelles, epithelial tissue and blood. Both are reproduced in full in this copy; '
    + 'neither is seeded here, because the multiple-choice bank is authored separately under seeds/mcq/. '
    + 'The paper is 96 marks; this file carries the 74 of Section A.',
}


export const SEEDS: Seed[] = [
  {
    q: 1, section: 'Section A', page: 1, marks: 6,
    asked: 'A- Describe electron microscopic picture (EM) of Golgi apparatus. (3 marks) B- Compare between microtubules & microfilaments regarding diameter, protein subunit & light microscope picture (L.M.). (3 marks)',
    label: 'The Golgi apparatus is invisible in H&E and has to be silvered to be seen at all',
    key: 'golgi-apparatus-structure-function-staining',
    definition: 'The Golgi apparatus is a membranous organelle concerned with secretion, well developed in secretory cells and sited apically in them or perinuclearly in nerve cells. By electron microscopy it is a stack of three to ten interconnected parallel flat curved saccules, each stack having an entry (cis) face that receives transfer vesicles from the rough endoplasmic reticulum and an exit (trans) face that buds secretory vesicles or lysosomes. In haematoxylin and eosin it is not stained and shows only as a pale area beside the nucleus, the negative Golgi image; silver demonstrates it as a network of brown granules and fibrils.',
    objective: 'Describe the electron-microscopic structure of the Golgi apparatus, including its cis and trans faces and what each does.',
    pitfall: 'Describing the stack without the faces. The cis face receives from the rough endoplasmic reticulum and the trans face buds product, and it is that polarity that makes the Golgi a processing line rather than a pile of membranes.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structure_function_relationship',
    aliases: ['Golgi body', 'Golgi complex', 'G.A.'],
    gaps: [
      'The book\'s Golgi section carries its "Functions:" heading with the content entirely inside an unextractable figure, so the functions of the Golgi are not available as department text. This question asks only for the EM picture, which is.',
    ],
  },
  {
    q: 1, section: 'Section A', page: 1, marks: 0,
    asked: 'B- Compare between microtubules & microfilaments regarding diameter, protein subunit & light microscope picture (L.M.). (3 marks)',
    label: 'Microtubules and microfilaments differ in diameter, in protein and in what they build',
    key: 'microtubules-vs-microfilaments-comparison',
    definition: 'Both are cytoskeletal elements and neither is visible by ordinary light microscopy — the whole cytoskeleton is seen only by immunofluorescence. Microtubules are twenty-four nanometres across, hollow cylinders whose wall is thirteen parallel protofilaments of alpha and beta tubulin, directed by the microtubule organising centre which contains gamma tubulin; they determine cell shape and elongation, transport organelles, form the mitotic spindle, and form centrioles, cilia and flagella. Microfilaments are five to seven nanometres across, fine strands of two chains of globular G actin coiled into filamentous F actin, lying beneath the plasmalemma and in microvilli; they change cell shape in endocytosis, exocytosis and amoeboid movement, transport organelles, cleave the cell in division, form the microvillus core and act in muscle contraction.',
    objective: 'Compare microtubules and microfilaments by diameter, protein subunit and light-microscopic appearance.',
    pitfall: 'Answering the L.M. row with a description. Neither is resolvable by ordinary light microscopy; the honest answer is that they are seen only by immunofluorescence.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'comparison',
    aliases: ['Tubulin', 'Actin filaments', 'Cytoskeleton'],
  },
  {
    q: 2, section: 'Section A', page: 2, marks: 4,
    asked: 'Compare between mast cell and plasma cell regarding origin, site & LM (light microscopic picture)',
    label: 'The mast cell and the plasma cell are both basophilic and share nothing else',
    key: 'mast-cell-lm-em-metachromasia',
    definition: 'The mast cell arises from the undifferentiated mesenchymal cell and lies in loose connective tissue around blood vessels and under the epithelium of the lung and digestive tube. It is a large oval cell, twenty to thirty micrometres, with a central spherical pale nucleus and cytoplasm full of basophilic granules that toluidine blue stains metachromatically purple or red. By electron microscopy it has a well developed Golgi, many mitochondria, few rough endoplasmic reticulum profiles and electron-dense membrane-bound granules.',
    objective: 'Give the origin, site and light-microscopic picture of the mast cell, and distinguish it from the plasma cell.',
    pitfall: 'Reading basophilia as one finding. The mast cell\'s basophilia is granular and metachromatic; the plasma cell\'s is diffuse cytoplasmic basophilia from rough endoplasmic reticulum and is not metachromatic at all.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
    type: 'structural_description',
    aliases: ['Mastocyte', 'Tissue basophil'],
  },
  {
    q: 2, section: 'Section A', page: 2, marks: 0,
    asked: 'Compare between mast cell and plasma cell regarding origin, site & LM (light microscopic picture)',
    label: 'The plasma cell is a B lymphocyte turned into an antibody factory, and its nucleus shows it',
    key: 'plasma-cell-features-function',
    definition: 'The plasma cell arises from the B lymphocyte and is numerous in lymphoid tissue. It is a large oval cell with deeply basophilic cytoplasm showing a negative Golgi image, and an eccentric spherical nucleus whose dark heterochromatin alternates with lighter euchromatin to give the cart-wheel or clock-face appearance. By electron microscopy it is a protein-forming cell rich in rough endoplasmic reticulum, with a well developed Golgi, many mitochondria, a euchromatic nucleus and no secretory granules. Its function is the synthesis and secretion of antibodies.',
    objective: 'Give the origin, site and light-microscopic picture of the plasma cell and relate them to antibody secretion.',
    pitfall: 'Expecting secretory granules. The plasma cell has none — it exports antibody continuously, which is why its cytoplasm is rough endoplasmic reticulum rather than stored product.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
    type: 'structure_function_relationship',
    aliases: ['Plasmacyte', 'Cart-wheel nucleus', 'Clock-face nucleus'],
  },
  {
    q: 3, section: 'Section A', page: 3, marks: 4,
    asked: 'Discuss the L.M., E.M., of blood monocytes and mention two functions.',
    label: 'The monocyte is the kidney-shaped nucleus with frosted-glass cytoplasm that becomes a macrophage',
    key: 'monocyte-lm-em-function',
    definition: 'The monocyte is a non-granular leucocyte, thirteen to twenty micrometres across and three to eight per cent of the white cells. On light microscopy it has a large, eccentric, kidney-shaped pale nucleus with one or two nucleoli, and non-granular pale basophilic cytoplasm with a frosted-glass appearance produced by its lysosomes, the azurophil granules. On electron microscopy the nucleus is euchromatic with a clear nucleolus and the cytoplasm shows pseudopodia, mitochondria, rough endoplasmic reticulum, a well developed Golgi and many primary and secondary lysosomes. It is highly phagocytic: it stays about three days in the blood, then enters connective tissue and becomes a macrophage, and it is an antigen-presenting cell and the precursor of the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone and the microglia of the central nervous system.',
    objective: 'Describe the monocyte on light and electron microscopy and give two of its functions.',
    pitfall: 'Calling the frosted-glass cytoplasm granular. The monocyte is a non-granular leucocyte; the appearance comes from lysosomes, which is why the electron microscope finds them and the light microscope finds only a texture.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
    type: 'structural_description',
    aliases: ['Mononuclear phagocyte', 'Macrophage precursor'],
  },
  {
    q: 4, section: 'Section A', page: 4, marks: 5,
    asked: 'Give the attachment, nerve supply and action of the Deltoid muscle.',
    label: 'Deltoid has three sets of fibres from a V-shaped origin, and each set does something different',
    key: 'deltoid-attachment-nerve-action',
    definition: 'Deltoid is a thick triangular muscle forming the rounded contour of the shoulder. Its V-shaped origin is from the anterior border of the lateral third of the clavicle (anterior fibres), the lateral border of the acromion (middle fibres) and the lower lip of the crest of the spine of the scapula (posterior fibres); it inserts into the deltoid tuberosity at the middle of the lateral surface of the shaft of the humerus. It is supplied by the circumflex (axillary) nerve. Its anterior fibres flex and medially rotate the arm, its posterior fibres extend and laterally rotate it, and its middle fibres abduct the arm from fifteen to ninety degrees.',
    objective: 'Give the three origins, the insertion, the nerve supply and the three different actions of deltoid.',
    pitfall: 'Giving abduction as deltoid\'s action and stopping. The anterior and posterior fibres oppose each other in flexion and rotation, and it is the middle fibres alone that abduct — and only through fifteen to ninety degrees.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
    type: 'structural_description',
    aliases: ['Deltoideus'],
  },
  {
    q: 5, section: 'Section A', page: 4, marks: 5,
    asked: 'List the ligaments of the shoulder joint and their attachment.',
    label: 'The shoulder joint\'s four ligaments are weak, which is why the joint dislocates',
    key: 'shoulder-joint-type-ligaments-movements',
    definition: 'The shoulder joint is a synovial polyaxial ball-and-socket joint between the head of the humerus and the glenoid cavity, deepened by the labrum glenoidale. Its ligaments are three weak gleno-humeral ligaments strengthening the anterior capsule, from the anterior margin of the glenoid cavity to the lesser tuberosity and the anatomical neck; the stronger coraco-humeral ligament strengthening the upper capsule, from the coracoid process to the upper border of the greater tuberosity; the transverse humeral ligament, a broad band from lesser to greater tuberosity converting the intertubercular groove into a canal and acting as a retinaculum for the long head of biceps; and the coraco-acromial ligament, which with the coracoid and acromion forms the coraco-acromial arch, a secondary socket above the joint. The joint is weak, unstable and easily dislocated because a very large humeral head sits against a small shallow glenoid, because the capsule and ligaments are weak and lax, and because no muscle supports the capsule directly from below.',
    objective: 'List the ligaments of the shoulder joint with their attachments, and relate their weakness to the instability of the joint.',
    pitfall: 'Reading the gleno-humeral ligaments as the joint\'s support. The book calls all three weak; what actually holds the shoulder is the rotator cuff, and the coraco-acromial arch above.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
    type: 'structural_description',
    aliases: ['Gleno-humeral joint', 'Coraco-acromial arch'],
  },
  {
    q: 6, section: 'Section A', page: 5, marks: 5,
    asked: 'Name the arteries share in the anastomosis around the scapula and give their origin.',
    label: 'The scapular anastomosis joins subclavian, axillary and aortic branches around the scapula',
    key: 'scapular-anastomosis-arteries',
    definition: 'The anastomosis around the scapula links three sets of vessels. From the first part of the subclavian artery come the suprascapular artery and the deep branch of the transverse cervical artery, both from the thyro-cervical trunk. From the third part of the axillary artery come the subscapular and circumflex scapular arteries. From the descending thoracic aorta come the posterior intercostal arteries. Because the anastomosis bridges the subclavian above and the axillary below, it can carry blood past a block in the axillary artery between the two.',
    objective: 'Name the arteries that share in the scapular anastomosis and give the parent vessel of each.',
    pitfall: 'Naming the vessels without their parents. The question is really about which trunks the anastomosis connects — the first part of the subclavian and the third part of the axillary — because that is what makes it a collateral route.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
    type: 'structural_description',
    aliases: ['Scapular anastomosis', 'Collateral circulation of the scapula'],
  },
  {
    q: 7, section: 'Section A', page: 5, marks: 5,
    asked: 'Mention the branches of the radial nerve.',
    label: 'The radial nerve arises from the posterior cord, C5–T1, and branches in axilla, spiral groove and lower arm',
    key: 'radial-nerve-origin-root-branches',
    definition: 'The radial nerve arises in the axilla as the larger terminal branch of the posterior cord of the brachial plexus, root value C5 to T1. In the axilla it gives muscular branches to the long and medial heads of triceps and the posterior cutaneous nerve of the arm. In the spiral groove it gives muscular branches to the lateral and medial heads of triceps and to anconeus, the lower lateral cutaneous nerve of the arm and the posterior cutaneous nerve of the forearm. In the lower arm, in the groove between brachialis and brachioradialis, it gives muscular branches to brachioradialis, extensor carpi radialis longus and the small lateral part of brachialis, and then divides in front of the lateral epicondyle into the posterior interosseous nerve, mainly muscular, and the superficial radial nerve, mainly cutaneous.',
    objective: 'List the branches of the radial nerve at each level — axilla, spiral groove, lower arm — and name its two terminal branches.',
    pitfall: 'Giving the root value as C5–C8. The radial nerve carries T1, and dropping it changes which lesions are predicted to affect it.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'structural_description',
    aliases: ['Nervus radialis', 'Posterior interosseous nerve', 'Superficial radial nerve'],
    conflicts: [
      'Key reused from the 2025 EOY seed, `radial-nerve-origin-roots-branches`, so the two sittings deduplicate. `clusters.json` spells the same objective `radial-nerve-origin-root-branches` — singular "root" — across eleven askings. One letter apart, two concepts if not reconciled.',
      'The book gives the radial nerve\'s course and branches in the Arm chapter and notes itself that the Nerve Supply chapter defers them and then contradicts the deferral. `clusters.json` files the objective under Nerve Supply and that path is kept.',
    ],
  },
  {
    q: 8, section: 'Section A', page: 6, marks: 5,
    asked: 'Point out the contents of the axilla.',
    label: 'The axilla holds the artery, the vein, the cords of the plexus, two stray nerves, five node groups and fat',
    key: 'axilla-boundaries-walls-contents',
    definition: 'The contents of the axilla are the axillary artery and its branches; the axillary vein and its tributaries; the cords of the brachial plexus and their branches; the long thoracic nerve; the intercostobrachial nerve, which is the lateral cutaneous branch of the second thoracic nerve; five groups of axillary lymph nodes; the tail of the mammary gland; and axillary fat. The vessels and the plexus run from the apex to the base along the lateral wall, nearer the anterior wall than the posterior.',
    objective: 'Enumerate the contents of the axilla and say where the vessels and plexus run within it.',
    pitfall: 'Omitting the two nerves that are not plexus branches in the ordinary sense. The long thoracic nerve on the medial wall and the intercostobrachial nerve crossing the floor are the two that surgery meets, and both are in the list for that reason.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'structural_description',
    aliases: ['Armpit', 'Axillary contents'],
  },
  {
    q: 9, section: 'Section A', page: 6, marks: 5,
    asked: 'Describe the characters and types of fibrous joint.',
    label: 'A fibrous joint is an immobile union by fibrous tissue, in three named types',
    key: 'fibrous-joints-types-definition',
    definition: 'A fibrous joint is a joint in which the bone surfaces are connected by fibrous tissue and which is fixed or immobile. There are three types: syndesmosis, where the bones are held by an interosseous ligament, as at the inferior tibio-fibular joint; gomphosis, where a tooth root is held in its socket in the mandible or maxilla by the periodontal ligament; and suture, where skull bones are held by a thin sutural ligament, obliterated in old age.',
    objective: 'Give the characters of a fibrous joint and name its three types with the ligament and example of each.',
    pitfall: 'Naming the three types without the connecting tissue. It is the named ligament — interosseous, periodontal, sutural — that distinguishes them, not the site alone.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
    type: 'classification',
    aliases: ['Synarthrosis'],
  },
  {
    q: 10, section: 'Section A', page: 7, marks: 5,
    asked: 'List the functions of the superficial fascia.',
    label: 'Superficial fascia insulates, smooths, mobilises, conducts, and carries muscles and glands',
    key: 'superficial-fascia-features',
    definition: 'Superficial fascia is a layer of loose connective tissue just deep to the skin, allowing the skin to move more or less freely over the underlying structures. It contains a variable quantity of fat, more in females — abundant in the gluteal region, anterior abdominal wall and breast, less in the limbs, absent in the eyelid, penis and scrotum. Its functions are to prevent heat loss as a thermal insulator; to soften and smooth the body surface; to facilitate movement of the skin over underlying structures; to act as the medium conducting nerves, vessels and lymphatics to the skin; to contain skin muscles, as the muscles of expression in the face; and to contain special glands such as the mammary glands.',
    objective: 'List the six functions of the superficial fascia the department book gives.',
    pitfall: 'Giving fat storage as the function. The fat is the material; the functions are what the layer does with it — insulation, contour, mobility, conduction, and housing muscles and glands.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Fascia',
    type: 'structure_function_relationship',
    aliases: ['Subcutaneous tissue', 'Hypodermis'],
  },
  {
    q: 11, section: 'Section A', page: 7, marks: 5,
    asked: 'Enumerate the abnormalities of the umbilical cord.',
    label: 'The cord goes wrong in its length, its contents, its vessels or its attachment',
    key: 'umbilical-cord-anomalies',
    definition: 'The congenital anomalies of the umbilical cord are: a short cord, which limits fetal movement and can separate the placenta prematurely during delivery; a long cord, which may encircle the fetal neck or form a true knot; congenital umbilical hernia (omphalocele), where the proximal cord contains intestinal loops because the intestine failed to return to the abdominal cavity; presence of only one umbilical artery from degeneration of the other; and abnormal attachment to the placenta — battledore, at the margin, or velamentous, through the amniotic membrane.',
    objective: 'Enumerate the congenital anomalies of the umbilical cord and give the consequence of each.',
    pitfall: 'Calling a false knot an anomaly. A false knot is a wider curve of an umbilical artery and the book says it causes no fetal stress; it is the true knot, in a long cord, that matters.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'clinical_correlation',
    aliases: ['Omphalocele', 'Single umbilical artery'],
  },
  {
    q: 12, section: 'Section A', page: 8, marks: 5,
    asked: 'Give the abnormal sites of implantation.',
    label: 'Implantation goes wrong either low inside the uterus or entirely outside it',
    key: 'implantation-abnormal-sites',
    definition: 'Abnormal implantation is of two kinds. Abnormal intrauterine implantation is in the lower uterine segment: placenta previa, where the placenta is related to the internal os, in complete or total, partial and marginal forms; and low-lying placenta, where the lower edge lies within two centimetres of the internal os. Ectopic pregnancy is implantation outside the uterine cavity — tubal, in the ampulla, isthmus or intramural part; ovarian, on the surface of the ovary; or omental, on the surface of the peritoneum.',
    objective: 'Classify the abnormal sites of implantation into intrauterine and ectopic and name the sites under each.',
    pitfall: 'Treating placenta previa as ectopic. It is inside the uterus; what is abnormal is how low, and the danger is obstructed labour and bleeding rather than rupture.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
    type: 'clinical_correlation',
    aliases: ['Ectopic pregnancy', 'Placenta previa'],
    conflicts: [
      'The department book carries abnormal sites of implantation in its Second Week chapter, while `clusters.json` places this objective under First Week of Development. The cluster path is used so the key stays the one the corpus deduplicates on.',
    ],
  },
  {
    q: 13, section: 'Section A', page: 8, marks: 5,
    asked: 'Explain the differentiation of the somite.',
    label: 'Each somite splits into a sclerotome and a dermomyotome, and those become bone, dermis and muscle',
    key: 'paraxial-mesoderm-somite-derivatives',
    definition: 'Somites are the transverse segments of the paraxial mesoderm, which lies on both sides of the notochord and neural tube. Each somite divides obliquely into a ventromedial sclerotome and a dorsolateral dermomyotome. The sclerotome cells migrate medially to surround the notochord and neural tube and form the vertebrae and intervertebral discs. The dermomyotome subdivides into a dermatome, which forms the dermis of the skin, and a myotome, which forms the skeletal muscles of the body; the dorsal part of the dermomyotome forms the muscle and dermis of the back of the vertebral column and its ventral part those of the rest of the body, matching the dorsal and ventral primary rami of the spinal nerve.',
    objective: 'Describe how a somite differentiates into sclerotome and dermomyotome and name what each derivative forms.',
    pitfall: 'Reading "dermatome" here as the skin area of a spinal nerve. In the somite it is the part of the dermomyotome that makes dermis — although the two senses are related, because the dorsal and ventral parts follow the two primary rami.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
    type: 'developmental_process',
    aliases: ['Sclerotome', 'Dermomyotome', 'Myotome', 'Paraxial mesoderm'],
  },
  {
    q: 14, section: 'Section A', page: 9, marks: 10,
    asked: 'Problem Solving Questions: I. A 16 years old girl fell on her outstretched hand and felt sudden pain in her right shoulder. On examination her shoulder was depressed. (5 marks) a. Which bone of the upper limb do you expect to be fractured? b. Which part of this bone is most commonly fractured? Why? c. Why is the shoulder region depressed? d. What structures are liable to be damaged in such a fracture? e. What is the procedure usually used for the fixation of such a fracture? II) Following an accident, a middle age man suffered from fracture of the medial epicondyle. (5 marks) a. What structure is liable to be injured? b. What are the muscles that would be paralyzed? c. What is the expected sensory loss? d. What is the name of the resulting deformity? e.Would this deformity be less severe if the nerve was injured at the wrist? Why?',
    label: 'The clavicle breaks where its curvature changes, and the shoulder then drops because the limb hangs from it',
    key: 'case-clavicle-fracture-middle-third',
    definition: 'The clavicle fractures most often at the junction between its lateral and middle thirds, the site at which its curvature changes — the lateral third is convex posteriorly and the medial two thirds convex anteriorly. The shoulder drops because the weight of the upper limb is suspended from the lateral third of the clavicle through the coraco-clavicular ligament, which the department book calls the main medium by which the scapula and upper limb are suspended; the book adds that a fracture medial to that ligament\'s attachment lets the upper limb drop. The subclavian vessels and the divisions of the brachial plexus lie behind the bone and are liable to be damaged, and the fracture is treated with an arm sling to support the sagging limb.',
    objective: 'Explain why the clavicle fractures at the junction of its lateral and middle thirds, why the shoulder is then depressed, and what lies at risk behind it.',
    pitfall: 'Attributing the drop to muscle spasm. The limb is suspended from the clavicle by the coraco-clavicular ligament, so a break medial to that attachment simply lets the weight of the arm pull the shoulder down.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
    type: 'clinical_correlation',
    aliases: ['Fractured clavicle', 'Collar bone fracture'],
  },
  {
    q: 14, section: 'Section A', page: 9, marks: 0,
    asked: 'II) Following an accident, a middle age man suffered from fracture of the medial epicondyle. a. What structure is liable to be injured? b. What are the muscles that would be paralyzed? c. What is the expected sensory loss? d. What is the name of the resulting deformity? e.Would this deformity be less severe if the nerve was injured at the wrist? Why?',
    label: 'The ulnar nerve behind the medial epicondyle, and why a high injury claws the hand less',
    key: 'ulnar-nerve-injury-claw-hand',
    definition: 'The ulnar nerve descends behind the medial epicondyle, grooving it, and is injured there by fracture, dislocation or compression. Injury at the wrist gives a partial claw hand — extension of the metacarpophalangeal joints of the fourth and fifth fingers with flexion of their interphalangeal joints from paralysis of their lumbricals and interossei, the second and third being less affected because their lumbricals are median-supplied — with loss of abduction and adduction of the fingers, loss of adduction of the thumb, flattening of the hypothenar eminence and hollowing between the metacarpals. Injury at or above the elbow makes the clawing less apparent, because the medial half of flexor digitorum profundus is also paralysed, and adds radial deviation of the hand from paralysis of flexor carpi ulnaris; the sensory loss then covers the medial third of the palm, the medial one and a half fingers front and back, and the medial third of the back of the hand.',
    objective: 'Give the muscles, sensory loss and deformity of an ulnar nerve injury at the elbow, and explain why the clawing is less than after an injury at the wrist.',
    pitfall: 'Assuming a higher injury is always worse. Clawing needs the long flexors intact to pull the fingers; cutting the nerve above them removes the very pull that makes the claw.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Ulnar claw hand', 'Ulnar paradox'],
  },
]

export const SCHEMES: Record<string, Scheme> = {
  S1: {
    format: 'multipart_written',
    prompt: 'Cytology: the electron-microscopic picture of the Golgi apparatus, and microtubules against microfilaments.',
    expects: [],
    parts: [
      {
        letter: 'A',
        prompt: 'Describe the electron microscopic picture (EM) of the Golgi apparatus.',
        expects: [
          'Interconnected parallel flat curved saccules, stacked above each other',
          'A stack of 3–10 saccules',
          'Each stack has an entry (cis) face',
          'The cis face receives transfer vesicles from the rough endoplasmic reticulum',
          'Each stack has an exit (trans) face',
          'The trans face buds secretory vesicles OR lysosomes',
          'It is well developed in secretory cells, sited apically in them OR perinuclearly as in nerve cells',
        ],
      },
      {
        letter: 'B',
        prompt: 'Compare microtubules and microfilaments by diameter, protein subunit and light-microscopic picture.',
        conceptKey: 'microtubules-vs-microfilaments-comparison',
        expects: [
          'Diameter — microtubules: 24 nm',
          'Diameter — microfilaments: 5–7 nm',
          'Protein subunit — microtubules: alpha and beta tubulin, in a wall of 13 parallel protofilaments',
          'Protein subunit — microfilaments: globular G actin, two chains coiled into filamentous F actin',
          'L.M. — both are elements of the cytoskeleton and are difficult to see by light microscopy',
          'L.M. — they are demonstrated only by immunofluorescence',
        ],
      },
    ],
  },
  S2: {
    format: 'comparison_table',
    prompt: 'Compare the mast cell and the plasma cell by origin, site and light-microscopic picture.',
    expects: [
      'Origin — mast cell: from the undifferentiated mesenchymal cell (UMC)',
      'Origin — plasma cell: from the B lymphocyte',
      'Site — mast cell: loose connective tissue around blood vessels and under the epithelium of the lung and digestive tube',
      'Site — plasma cell: numerous in lymphoid tissue',
      'L.M. mast cell: a large oval cell with a central spherical pale nucleus',
      'L.M. mast cell: cytoplasm full of basophilic granules, stained metachromatically purple or red by toluidine blue',
      'L.M. plasma cell: a large oval cell with deeply basophilic cytoplasm showing a negative Golgi image',
      'L.M. plasma cell: an eccentric spherical nucleus with dark heterochromatin alternating with lighter euchromatin — the cart-wheel OR clock-face appearance',
    ],
  },
  S3: {
    format: 'structured_written',
    prompt: 'Discuss the light-microscopic and electron-microscopic picture of the blood monocyte and mention two of its functions.',
    expects: [
      'L.M.: a large, eccentric, kidney-shaped pale nucleus with one or two nucleoli',
      'L.M.: non-granular pale basophilic cytoplasm with a frosted-glass appearance, due to its lysosomes (azurophil granules)',
      'E.M.: the nucleus is euchromatic with a clear nucleolus',
      'E.M.: the cytoplasm shows pseudopodia, mitochondria, rER, a well developed Golgi and many primary and secondary lysosomes',
      'Function: highly phagocytic — it leaves the blood, enters connective tissue and becomes a macrophage phagocytosing bacteria and debris',
      'Function: it is an antigen-presenting cell',
      'Function: it is the precursor of the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone OR the microglia of the CNS',
    ],
  },
  S4: {
    format: 'structured_written',
    prompt: 'Give the attachments, nerve supply and actions of the deltoid muscle.',
    expects: [
      'A triangular thick muscle forming the rounded contour of the shoulder, with a V-shaped origin',
      'Anterior fibres from the anterior border of the lateral third of the clavicle',
      'Middle fibres from the lateral border of the acromion',
      'Posterior fibres from the lower lip of the crest of the spine of the scapula',
      'Inserts into the deltoid tuberosity, at the middle of the lateral surface of the shaft of the humerus',
      'Supplied by the circumflex (axillary) nerve',
      'Anterior fibres flex and medially rotate the arm',
      'Posterior fibres extend and laterally rotate the arm',
      'Middle fibres abduct the arm from 15 to 90 degrees',
    ],
  },
  S5: {
    format: 'structured_written',
    prompt: 'List the ligaments of the shoulder joint and their attachments.',
    expects: [
      'Three gleno-humeral ligaments, weak, strengthening the anterior capsule',
      'They run from the anterior margin of the glenoid cavity to the lesser tuberosity and the anatomical neck',
      'The coraco-humeral ligament, stronger, strengthening the upper capsule',
      'It runs from the coracoid process to the upper border of the greater tuberosity',
      'The transverse humeral ligament, a broad band from the lesser to the greater tuberosity',
      'It converts the intertubercular groove into a canal and acts as a retinaculum for the long head of biceps',
      'The coraco-acromial ligament, which with the coracoid and acromion forms the coraco-acromial arch — a secondary socket above the joint supporting the head of the humerus from above',
    ],
  },
  S6: {
    format: 'structured_written',
    prompt: 'Name the arteries that share in the anastomosis around the scapula and give the origin of each.',
    expects: [
      'The suprascapular artery — from the thyro-cervical trunk of the first part of the subclavian artery',
      'The deep branch of the transverse cervical artery — also from the thyro-cervical trunk of the first part of the subclavian artery',
      'The subscapular artery — from the third part of the axillary artery',
      'The circumflex scapular artery — from the third part of the axillary artery',
      'The posterior intercostal arteries — from the descending thoracic aorta',
      'The anastomosis therefore links the first part of the subclavian above with the third part of the axillary below',
    ],
  },
  S7: {
    format: 'structured_written',
    prompt: 'Mention the branches of the radial nerve.',
    expects: [
      'It is the larger terminal branch of the posterior cord of the brachial plexus, root value C5, C6, C7, C8 and T1',
      'In the axilla: muscular branches to the long and medial heads of triceps',
      'In the axilla: the posterior cutaneous nerve of the arm, to the skin of the back of the arm from the deltoid tuberosity to the elbow',
      'In the spiral groove: muscular branches to the lateral and medial heads of triceps and to anconeus',
      'In the spiral groove: the lower lateral cutaneous nerve of the arm',
      'In the spiral groove: the posterior cutaneous nerve of the forearm, to the middle of the back of the forearm down to the wrist',
      'In the lower arm, between brachialis and brachioradialis: muscular branches to brachioradialis, extensor carpi radialis longus and a small lateral part of brachialis',
      'Terminal: the posterior interosseous nerve, mainly muscular',
      'Terminal: the superficial radial nerve, mainly cutaneous',
    ],
  },
  S8: {
    format: 'structured_written',
    prompt: 'Point out the contents of the axilla.',
    expects: [
      'The axillary artery and its branches',
      'The axillary vein and its tributaries',
      'The cords of the brachial plexus and their branches',
      'The long thoracic nerve',
      'The intercostobrachial nerve — the lateral cutaneous branch of the 2nd thoracic nerve',
      'Five groups of axillary lymph nodes',
      'The tail of the mammary gland',
      'Axillary fat',
      'The axillary vessels and the plexus run from the apex to the base along the lateral wall, nearer to the anterior than the posterior wall',
    ],
  },
  S9: {
    format: 'structured_written',
    prompt: 'Describe the characters of a fibrous joint and its types.',
    expects: [
      'Character: the bone surfaces are connected by fibrous tissue',
      'Character: fibrous joints are fixed or immobile',
      'There are three types: syndesmosis, gomphosis and suture',
      'Syndesmosis: the bones are connected by an interosseous ligament, e.g. the inferior tibio-fibular joint',
      'Gomphosis: the roots of the teeth are connected to their sockets in the mandible and maxilla by the periodontal ligament',
      'Suture: skull bones are connected by a thin layer of fibrous tissue, the sutural ligament',
      'Sutures are obliterated in old age',
    ],
  },
  S10: {
    format: 'structured_written',
    prompt: 'List the functions of the superficial fascia.',
    expects: [
      'It prevents heat loss, acting as a thermal insulator',
      'It softens and smoothens the body surface',
      'It facilitates movement of the skin over the underlying structures',
      'It is the medium conducting nerves, vessels and lymphatics to the skin',
      'It contains skin muscles, as the muscles of expression in the face',
      'It contains special glands, such as the mammary glands',
    ],
  },
  S11: {
    format: 'structured_written',
    prompt: 'Enumerate the abnormalities of the umbilical cord.',
    expects: [
      'Short cord',
      'It limits fetal movement and causes premature separation of the placenta during delivery',
      'Long cord',
      'It may encircle the fetal neck OR form a true knot',
      'Congenital umbilical hernia (omphalocele) — the proximal part of the cord contains loops of intestine',
      'It is due to failure of return of the intestine to the abdominal cavity',
      'Presence of one umbilical artery, from degeneration of the other',
      'Abnormal attachment to the placenta — battledore, at the margin, OR velamentous, through the amniotic membrane',
    ],
  },
  S12: {
    format: 'structured_written',
    prompt: 'Give the abnormal sites of implantation.',
    expects: [
      'Abnormal intrauterine implantation: placenta previa — implantation in the lower uterine segment with the placenta related to the internal os',
      'Placenta previa occurs in complete (total), partial and marginal forms',
      'Abnormal intrauterine implantation: low-lying placenta — the lower edge lies within two cm of the margin of the internal os',
      'Ectopic pregnancy: tubal — in the ampulla, the isthmus OR the intramural part of the uterine tube',
      'Ectopic pregnancy: ovarian — on the surface of the ovary',
      'Ectopic pregnancy: omental — on the surface of the peritoneum',
      'In tubal ectopic pregnancy, rupture of the tube with internal haemorrhage is expected',
    ],
  },
  S13: {
    format: 'structured_written',
    prompt: 'Explain the differentiation of the somite.',
    expects: [
      'Somites are the transverse segments of the paraxial mesoderm, which lies on both sides of the notochord and neural tube',
      'Each somite divides obliquely into a ventromedial sclerotome and a dorsolateral dermomyotome',
      'Sclerotome cells migrate medially to surround the notochord and neural tube',
      'They form the vertebrae and the intervertebral discs',
      'The dermomyotome subdivides into dermatome and myotome',
      'The dermatome forms the dermis of the skin',
      'The myotome forms the skeletal muscles of the body',
      'The dorsal part of the dermomyotome forms the muscle and dermis of the back of the vertebral column, and the ventral part those of the rest of the body',
      'This matches the dorsal and ventral primary rami of the spinal nerve',
    ],
  },
  S14: {
    format: 'multipart_written',
    prompt: 'Problem Solving Questions. I: a 16-year-old girl fell on her outstretched hand with sudden pain in the right shoulder, which on examination was depressed. II: a middle-aged man suffered a fracture of the medial epicondyle following an accident.',
    expects: [],
    parts: [
      { letter: 'I-a', prompt: 'Which bone of the upper limb do you expect to be fractured?', expects: ['The clavicle'] },
      {
        letter: 'I-b',
        prompt: 'Which part of this bone is most commonly fractured? Why?',
        expects: [
          'The junction between the lateral and middle thirds',
          'It is the site of the change in curvature — the lateral third is convex posteriorly and the medial two thirds convex anteriorly',
        ],
      },
      {
        letter: 'I-c',
        prompt: 'Why is the shoulder region depressed?',
        expects: [
          'The shoulder drops because of the weight of the upper limb',
          'The limb is suspended through the coraco-clavicular ligament to the lateral third of the clavicle',
          'The book adds that if the clavicle is fractured medial to the attachment of that ligament, the upper limb drops',
        ],
      },
      {
        letter: 'I-d',
        prompt: 'What structures are liable to be damaged in such a fracture?',
        expects: ['The subclavian vessels', 'The divisions of the brachial plexus'],
      },
      {
        letter: 'I-e',
        prompt: 'What is the procedure usually used for the fixation of such a fracture?',
        expects: ['An arm sling, to support the sagging limb'],
      },
      {
        letter: 'II-a',
        prompt: 'What structure is liable to be injured?',
        conceptKey: 'ulnar-nerve-injury-claw-hand',
        expects: ['The ulnar nerve', 'It descends behind the medial epicondyle, grooving it'],
      },
      {
        letter: 'II-b',
        prompt: 'What are the muscles that would be paralyzed?',
        conceptKey: 'ulnar-nerve-injury-claw-hand',
        expects: [
          'Flexor carpi ulnaris and the medial half of flexor digitorum profundus',
          'The hypothenar muscles and the medial two lumbricals',
          'The dorsal and palmar interossei and adductor pollicis',
        ],
      },
      {
        letter: 'II-c',
        prompt: 'What is the expected sensory loss?',
        conceptKey: 'ulnar-nerve-injury-claw-hand',
        expects: [
          'The medial third of the palm and the medial third of the back of the hand',
          'The medial one and a half fingers, front and back',
        ],
      },
      {
        letter: 'II-d',
        prompt: 'What is the name of the resulting deformity?',
        conceptKey: 'ulnar-nerve-injury-claw-hand',
        expects: [
          'Partial claw hand — the 4th and 5th fingers',
          'Extension of their metacarpophalangeal joints with flexion of their interphalangeal joints',
          'The 2nd and 3rd fingers are less affected because their lumbricals are median-supplied',
        ],
      },
      {
        letter: 'II-e',
        prompt: 'Would this deformity be less severe if the nerve was injured at the wrist? Why?',
        conceptKey: 'ulnar-nerve-injury-claw-hand',
        expects: [
          'No — the deformity at the wrist is the more severe one',
          'An injury at or above the elbow makes the clawing less apparent',
          'Because the medial half of flexor digitorum profundus is also paralysed and cannot flex the interphalangeal joints',
          'The high injury adds radial deviation of the hand, from paralysis of flexor carpi ulnaris',
        ],
      },
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
