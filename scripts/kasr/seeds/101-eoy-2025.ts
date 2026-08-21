/**
 * The 2025 end-of-year paper for 101 ISK, as data.
 *
 * `EOY (ISK - 101) 199` — sixteen written questions, eighty-one marks: six in
 * Histology and ten in Anatomy, of which the last two are cases.
 *
 * It is NOT the whole paper. At the foot of the Histology section it prints
 * `+26 MCQ {½ Mark each}` and then not a single one of them, in this copy or
 * the solved one. So the real paper is 94 marks and this corpus holds 81 of
 * them; the other thirteen are twenty-six questions nobody here has seen.
 *
 * I originally recorded this paper as having no multiple-choice items at all,
 * in three commit messages and two batch headers, on the strength of the
 * printed questions all being written ones. The line saying otherwise is one
 * line, in the middle of a table, five pages in. It was a parallel session
 * reading the same PDF that caught it.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this paper is. */
export const SOURCE: SourceRef = {
  id: 'src_8cb257f4b6a6dcd730d0',
  file: 'EOY (ISK - 101) 199 (1).pdf',
  sittingYear: 2025,
  tier: 'end_of_year',
  sections: ['Histology', 'Anatomy'],
  notCaptured: '26 multiple-choice questions at ½ mark each, 13 marks, stated at the foot of the Histology section and printed in neither the solved nor the unsolved copy. The paper is 94 marks; 81 are here.',
}


export const SEEDS: Seed[] = [
  {
    q: 1, section: 'Histology', page: 1, marks: 3,
    asked: 'Compare between Eosinophils & Neutrophils regarding (Differential count, Shape of nucleus and LM cytoplasmic granules).',
    label: 'Eosinophils and neutrophils are told apart by count, nuclear lobes and granule staining',
    key: 'eosinophil-versus-neutrophil-light-microscopy',
    definition: 'Neutrophils are the commonest leukocyte at 60–70% of the differential count, with a nucleus of two to five lobes and fine granules that take neither dye strongly. Eosinophils are 1–4%, with a characteristically bilobed nucleus and coarse granules that stain deeply with eosin.',
    objective: 'Distinguish eosinophils from neutrophils on a stained film by differential count, nuclear shape and granule staining.',
    pitfall: 'Counting lobes alone. A young neutrophil may be bilobed; the granules, not the nucleus, are what settle it.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
    type: 'structural_description',
  },
  {
    q: 2, section: 'Histology', page: 2, marks: 4,
    asked: 'Explain how the structure (EM) of Hyalomere of Platelets correlate to its function.',
    label: 'The hyalomere’s microtubules and canalicular system carry out the platelet’s shape change and release',
    key: 'platelet-hyalomere-structure-function',
    definition: 'The hyalomere is the peripheral, pale zone of the platelet. Its marginal bundle of microtubules holds the resting discoid shape and contracts to produce pseudopodia; its open canalicular system opens the granule contents to the exterior, and its dense tubular system stores the calcium that triggers them.',
    objective: 'Explain how each structure of the hyalomere seen on electron microscopy produces a step of platelet function.',
    pitfall: 'Treating the hyalomere as inert because it looks empty. The granules are in the granulomere; the machinery that acts on them is here.',
    subject: 'haem', primary: 'DIS-HIS-T01', secondary: ['SYS-HEM-T01-S01-M03'],
    modulePath: '101 ISK > Histology > Blood > Blood Platelets',
    type: 'structure_function_relationship',
  },
  {
    q: 3, section: 'Histology', page: 2, marks: 4,
    asked: 'Discuss LM, EM, and Special staining regarding Mast cells.',
    label: 'Mast cells are identified by metachromatic granules on light microscopy and by their granule ultrastructure',
    key: 'mast-cell-identification',
    definition: 'Mast cells are large connective-tissue cells with a central rounded nucleus and cytoplasm filled with coarse granules. The granules are metachromatic with toluidine blue, staining purple where the dye is blue, because of their heparin. On electron microscopy the granules show a scroll or lamellar internal structure.',
    objective: 'Identify a mast cell by its light-microscopic appearance, its metachromatic staining and its granule ultrastructure.',
    pitfall: 'Confusing it with a plasma cell. Both are basophilic, but the plasma cell has a cartwheel nucleus and a pale Golgi hof and is not metachromatic.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
    type: 'structural_description',
  },
  {
    q: 4, section: 'Histology', page: 3, marks: 4,
    asked: 'Mention EM of types of Lysosomes.',
    label: 'Primary and secondary lysosomes are distinguished on electron microscopy by whether they have yet fused with a substrate',
    // The cluster key. This paper asks the electron-microscopic picture; five
    // other papers ask the three secondary subtypes by what the primary
    // lysosome fused with, and the department's own July 2023 model answer
    // marks exactly that. One objective, asked from either end.
    key: 'lysosome-types-secondary-fates',
    definition: 'A primary lysosome is a newly released homogeneous, moderately electron-dense vesicle budded from the Golgi, whose acid hydrolases have not yet acted. Secondary lysosomes are heterogeneous and of three types, named by what the primary lysosome fused with: the heterolysosome, from a phagosome, digesting solid particles, viruses and bacteria; the multivesicular body, from a pinocytic vesicle, with fluid content; and the autolysosome, from an autophagic vesicle, holding a destroyed endogenous substance or a damaged organelle. A residual body is the end state, holding indigestible material.',
    objective: 'Distinguish primary from secondary lysosomes on electron microscopy, and name the three secondary types by what the primary lysosome fused with.',
    pitfall: 'Naming the three secondary types and stopping. The department’s own model answer gives half a mark for the name and half for the mechanism of formation, so a list of three names scores half of what it could.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structural_description',
  },
  {
    q: 5, section: 'Histology', page: 4, marks: 4,
    asked: 'Describe origin and EM picture of Cilia.',
    label: 'A cilium arises from a basal body and is built on a 9+2 axoneme',
    key: 'cilium-origin-and-ultrastructure',
    definition: 'A cilium develops from a basal body, itself derived from a centriole, which migrates to the apical cell surface. On electron microscopy the shaft contains an axoneme of nine peripheral microtubule doublets around a central pair, with dynein arms on the doublets that produce the beat.',
    objective: 'Describe where a cilium comes from and what its 9+2 axoneme looks like on electron microscopy.',
    pitfall: 'Giving microvilli the same answer. A microvillus has an actin core and no axoneme, and does not beat.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
    type: 'structure_function_relationship',
  },
  {
    q: 6, section: 'Histology', page: 5, marks: 4,
    asked: 'Compare between Esophagus and Urinary bladder according to the following table.',
    label: 'Oesophagus and urinary bladder are lined by different stratified epithelia suited to different stresses',
    key: 'oesophagus-versus-bladder-epithelium',
    definition: 'The oesophagus is lined by stratified squamous non-keratinised epithelium, which resists the abrasion of a passing bolus. The bladder is lined by transitional epithelium (urothelium), whose dome-shaped superficial cells and plaque-bearing membrane let it stretch and stay impermeable to urine.',
    objective: 'Compare the epithelium of oesophagus and urinary bladder and relate each to the mechanical demand on that organ.',
    pitfall: 'Calling urothelium stratified squamous because its surface cells flatten when distended. It is transitional; the flattening is the point.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Epithelial Tissues > Surface Epithelium',
    type: 'structure_function_relationship',
  },
  {
    q: 1, section: 'Anatomy', page: 7, marks: 6,
    asked: 'Mention types of Muscle attachment.',
    label: 'A muscle attaches either directly to bone or through a tendon or an aponeurosis',
    key: 'muscle-attachment-types',
    definition: 'A muscle may attach directly, its fibres inserting into the periosteum, or indirectly through a tendon, a cord of dense regular connective tissue, or an aponeurosis, a flattened sheet of the same. The attachments are named origin and insertion, the origin conventionally the more fixed end.',
    objective: 'Name the types of muscle attachment and say how each differs in form.',
    pitfall: 'Treating origin and insertion as fixed anatomical facts. Which end moves depends on which is stabilised, and the two reverse in ordinary movements.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Muscular system',
    type: 'structural_description',
  },
  {
    q: 2, section: 'Anatomy', page: 8, marks: 6,
    asked: 'Compare between primary and secondary Cartilaginous joints.',
    label: 'Primary cartilaginous joints are hyaline and temporary; secondary ones are fibrocartilaginous and midline',
    key: 'primary-versus-secondary-cartilaginous-joints',
    definition: 'A primary cartilaginous joint (synchondrosis) unites bones by hyaline cartilage, is usually temporary and ossifies with growth, and permits no movement — the epiphyseal plate is the type example. A secondary cartilaginous joint (symphysis) unites bones by fibrocartilage, lies in the midline, is permanent and permits slight movement, as at the pubic symphysis and intervertebral discs.',
    objective: 'Compare primary and secondary cartilaginous joints by the cartilage involved, permanence, site and movement.',
    pitfall: 'Assuming every cartilaginous joint disappears. Only the primary ones ossify; a symphysis is there for life.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
    type: 'classification',
  },
  {
    q: 3, section: 'Anatomy', page: 9, marks: 6,
    asked: 'Describe Decidua regarding definition, parts and fates.',
    label: 'The decidua is the pregnant endometrium, in three parts named by their relation to the conceptus',
    key: 'decidua-definition-parts-fates',
    definition: 'The decidua is the functional layer of the endometrium after implantation, so named because it is shed at birth. Decidua basalis lies deep to the conceptus and becomes the maternal part of the placenta; decidua capsularis covers it and is stretched and lost as the sac grows; decidua parietalis lines the rest of the cavity and fuses with the capsularis by about the fourth month, obliterating the uterine cavity.',
    objective: 'Define the decidua, name its three parts by their relation to the conceptus, and give the fate of each.',
    pitfall: 'Swapping basalis and capsularis. Basalis is beneath and becomes placenta; capsularis is the covering and disappears.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'structural_description',
  },
  {
    q: 4, section: 'Anatomy', page: 10, marks: 6,
    asked: 'Summarize types and causes of Folding.',
    label: 'Embryonic folding is longitudinal and transverse, driven by unequal growth',
    key: 'embryonic-folding-types-and-causes',
    definition: 'Folding converts the flat trilaminar disc into a cylinder. Longitudinal (head and tail) folding is driven by the rapid growth of the neural tube, particularly the brain, and carries the septum transversum and heart ventrally. Transverse (lateral) folding is driven by growth of the somites, and brings the two lateral edges together to close the ventral body wall and pinch off the gut from the yolk sac.',
    objective: 'Name the two planes of embryonic folding and give the growth that drives each.',
    pitfall: 'Describing folding as something the embryo does actively. It is the consequence of parts growing at different rates, not a movement in itself.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
    type: 'developmental_process',
  },
  {
    q: 5, section: 'Anatomy', page: 11, marks: 7,
    asked: 'Mention attachment, action and nerve supply of Pectoralis Major.',
    label: 'Pectoralis major adducts and medially rotates the arm, supplied by both pectoral nerves',
    key: 'pectoralis-major-attachment-action-nerve',
    definition: 'Pectoralis major arises by a clavicular head from the medial half of the clavicle and a sternocostal head from the sternum and upper six costal cartilages, and inserts into the lateral lip of the bicipital groove. It adducts and medially rotates the arm; the clavicular head flexes the arm and the sternocostal head extends it from flexion. It is supplied by the lateral and medial pectoral nerves.',
    objective: 'Give the attachments, actions and nerve supply of pectoralis major, including the different action of each head.',
    pitfall: 'Giving one action for the whole muscle. The two heads oppose each other in flexion and extension, which is why the question asks for both.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
    type: 'structural_description',
  },
  {
    q: 6, section: 'Anatomy', page: 12, marks: 7,
    asked: 'Regarding Radial nerve, mention its origin, root value and branches in axilla and upper arm.',
    label: 'The radial nerve arises from the posterior cord, C5–T1, and branches in axilla and arm',
    key: 'radial-nerve-origin-roots-branches',
    definition: 'The radial nerve is the largest branch of the posterior cord of the brachial plexus, root value C5 to T1. In the axilla it gives muscular branches to the long and medial heads of triceps and the posterior cutaneous nerve of the arm. In the arm it gives branches to the lateral and medial heads of triceps and anconeus, the lower lateral cutaneous nerve of the arm and the posterior cutaneous nerve of the forearm, before dividing into superficial and deep terminal branches.',
    objective: 'State the origin and root value of the radial nerve and list its branches in the axilla and the arm.',
    pitfall: 'Giving the root value as C5–C8. The radial nerve carries T1, and dropping it changes which lesions are predicted to affect it.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'structural_description',
  },
  {
    q: 7, section: 'Anatomy', page: 13, marks: 7,
    asked: 'Describe site, formation and branches of the Deep Palmer Arch.',
    label: 'The deep palmar arch is the radial artery’s termination, lying a finger’s breadth proximal to the superficial arch',
    // The cluster key, not a deep-arch-only one: this paper asks the deep arch,
    // but the 2024 end-of-module and two other papers ask the two arches
    // together and one asks them as a comparison. A student who knows the deep
    // arch alone fails those, so it is one objective with two halves.
    key: 'palmar-arterial-arches-site-formation-branches',
    definition: 'The superficial palmar arch lies immediately deep to the palmar aponeurosis but superficial to the flexor tendons, crossing the palm at the level of the midshaft of the metacarpals; it is mainly the ulnar artery, completed by the superficial palmar branch of the radial, and gives four palmar digital arteries. The deep palmar arch lies deep to the flexor tendons, immediately distal to the bases of the metacarpals and so proximal to the superficial arch; it is formed mainly by the radial artery, completed by the deep branch of the ulnar, and gives three palmar metacarpal arteries, three perforating branches passing dorsally, and recurrent branches to the anterior carpal arch.',
    objective: 'Give the site, formation and branches of each palmar arch, and say how the two differ in level, in the artery that mainly forms them, and in what they supply.',
    pitfall: 'Swapping the two. The superficial arch is mainly ulnar and lies distal; the deep arch is mainly radial and lies proximal. The faculty asks them as a comparison as often as singly, so knowing one is half an answer.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Hand',
    type: 'structural_description',
  },
  {
    q: 8, section: 'Anatomy', page: 14, marks: 7,
    asked: 'Regarding Elbow joint, Mention its type, bony parts and describe its ligaments.',
    label: 'The elbow is a synovial hinge between humerus, ulna and radius, held by collateral ligaments',
    key: 'elbow-joint-type-bones-ligaments',
    definition: 'The elbow is a synovial joint of hinge type, between the trochlea and capitulum of the humerus above and the trochlear notch of the ulna and the head of the radius below. The radial collateral ligament runs from the lateral epicondyle to the anular ligament; the ulnar collateral ligament is triangular, running from the medial epicondyle in anterior, posterior and oblique bands to the coronoid process and olecranon.',
    objective: 'Classify the elbow joint, name its articulating bony parts, and describe its collateral ligaments.',
    pitfall: 'Including the superior radio-ulnar joint in the elbow. It shares the capsule but is a separate pivot joint, and the anular ligament belongs to it.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
    type: 'structural_description',
  },
  {
    q: 9, section: 'Anatomy', page: 15, marks: 3,
    asked: 'Case (1): A 45 years old woman noticed a hard painless lump in her breast. The case was diagnosed as carcinoma of the breast and an operation of mastectomy was performed. a) What lymph nodes should be removed during mastectomy operation? b) Should the physician examine the other breast? Why? c) After the operation, the patient was unable to abduct her arm above the shoulder. d) What other deformity can be noticed?',
    label: 'Breast lymph drains mainly to the axillary nodes, which is why mastectomy clears the axilla',
    key: 'breast-lymphatic-drainage-axillary',
    definition: 'About three quarters of the lymph of the breast drains laterally to the axillary nodes, chiefly the anterior (pectoral) group, then to central and apical nodes. The medial quadrants drain to the internal thoracic (parasternal) nodes, and some drains to the opposite breast and to the abdomen. This is why carcinoma spreads first to the axilla and why the axillary nodes are sampled or cleared at operation.',
    objective: 'Explain the lymphatic drainage of the breast and why it determines where carcinoma spreads and what surgery removes.',
    pitfall: 'Forgetting the medial route. A medial-quadrant tumour can reach parasternal nodes with a clear axilla, so a negative axilla is not a clear chest.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-GYN-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'clinical_correlation',
  },
  {
    q: 10, section: 'Anatomy', page: 15, marks: 3,
    asked: 'Case (2): A 30 years old woman fell on her outstretched hand. She suffered from severe pain in the lateral part of the wrist particularly at the base of the anatomical snuff box. a) What are the boundaries of the anatomical snuff box? b) What are the contents of the anatomical snuff box? c) What makes the floor of the anatomical snuff box? d) What makes the roof of the anatomical snuff box?',
    label: 'The anatomical snuff box is bounded by three tendons, floored by the scaphoid, and crossed by the radial artery',
    // The cluster key. The 2024 paper asks "site and boundaries" and this one
    // asks boundaries, contents, floor and roof; nine askings, one objective.
    key: 'anatomical-snuff-box-site-boundaries-contents',
    definition: 'The anatomical snuff box is a triangular hollow on the lateral wrist. Its anterior boundary is the tendons of abductor pollicis longus and extensor pollicis brevis; its posterior boundary is the tendon of extensor pollicis longus; its base is the styloid process of the radius. Its floor is the scaphoid and trapezium with the base of the first metacarpal and the styloid process of the radius, and its roof is skin and fascia crossed by the cephalic vein and the superficial branch of the radial nerve. Its contents are the radial artery and the beginning of the cephalic vein.',
    objective: 'Give the boundaries, contents, floor and roof of the anatomical snuff box.',
    pitfall: 'Giving abductor pollicis longus and extensor pollicis brevis as two separate boundaries. They form the anterior boundary together, and the posterior boundary is extensor pollicis longus alone.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Hand',
    type: 'structural_description',
  },
  {
    // The same question number as the seed above. Case 1 asks four lettered
    // things and the last two are a different idea entirely — a student can
    // know where the breast drains and still not know why she cannot lift her
    // arm afterwards. Two concepts, one question, co-primary on both.
    q: 9, section: 'Anatomy', page: 15, marks: 0,
    asked: 'Case (1) c) After the operation, the patient was unable to abduct her arm above the shoulder. d) What other deformity can be noticed?',
    label: 'Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula',
    key: 'long-thoracic-nerve-injury-winged-scapula',
    definition: 'The long thoracic nerve (C5, C6, C7) runs on the surface of serratus anterior on the medial wall of the axilla, where it is exposed during axillary clearance. Serratus anterior rotates the scapula upward and holds its medial border against the chest wall, so its paralysis prevents abduction of the arm above the shoulder and lets the medial border stand off — a winged scapula.',
    objective: 'Explain why a mastectomy patient cannot abduct above the shoulder, and name the deformity that accompanies it.',
    pitfall: 'Blaming the axillary nerve. That would weaken abduction to ninety degrees and numb the regimental badge area; it is loss of scapular rotation above the shoulder, with winging, that names the long thoracic nerve.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'clinical_correlation',
  },
]

export const SCHEMES: Record<string, Scheme> = {
  H1: {
    format: 'comparison_table',
    prompt: 'Compare eosinophils and neutrophils by differential count, shape of the nucleus, and the appearance of the cytoplasmic granules on light microscopy.',
    expects: [
      'Neutrophils are 60–70% of the differential count',
      'Eosinophils are 1–4% of the differential count',
      'The neutrophil nucleus has two to five lobes',
      'The eosinophil nucleus is characteristically bilobed',
      'Neutrophil granules are fine and take neither dye strongly',
      'Eosinophil granules are coarse and stain deeply with eosin',
    ],
  },
  H2: {
    format: 'short_answer',
    prompt: 'Explain how the electron-microscopic structure of the hyalomere of the platelet relates to its function.',
    expects: [
      'The marginal bundle of microtubules holds the resting discoid shape',
      'Contraction of that bundle produces the pseudopodia of the activated platelet',
      'The open canalicular system discharges the granule contents to the exterior',
      'The dense tubular system stores the calcium that triggers release',
    ],
  },
  H3: {
    format: 'structured_written',
    prompt: 'Discuss the mast cell as seen on light microscopy, on electron microscopy, and with special staining.',
    expects: [
      'On light microscopy: a large cell with a central rounded nucleus and cytoplasm packed with coarse granules',
      'On electron microscopy: the granules show a scroll or lamellar internal structure',
      'With toluidine blue the granules are metachromatic, staining purple where the dye is blue',
      'The metachromasia is due to the heparin the granules contain',
    ],
  },
  H4: {
    format: 'short_answer',
    prompt: 'Describe the types of lysosome as they appear on electron microscopy.',
    expects: [
      'A primary lysosome is small, uniformly electron-dense and membrane-bound, newly budded from the Golgi',
      'Its acid hydrolases have not yet acted on a substrate',
      'A secondary lysosome is larger and heterogeneous, having fused with a phagosome or autophagosome',
      'A residual body is the end state, holding indigestible material',
    ],
  },
  H5: {
    format: 'structured_written',
    prompt: 'Describe the origin of a cilium and its appearance on electron microscopy.',
    expects: [
      'A cilium arises from a basal body',
      'The basal body derives from a centriole that migrates to the apical cell surface',
      'The shaft contains an axoneme of nine peripheral microtubule doublets around a central pair',
      'Dynein arms on the doublets produce the beat',
    ],
  },
  H6: {
    format: 'comparison_table',
    prompt: 'Compare the lining epithelium of the oesophagus and of the urinary bladder, and relate each to the demand on that organ.',
    expects: [
      'The oesophagus is lined by stratified squamous non-keratinised epithelium',
      'That epithelium resists the abrasion of a passing bolus',
      'The bladder is lined by transitional epithelium (urothelium)',
      'Its dome-shaped superficial cells and plaque-bearing membrane allow stretch while staying impermeable to urine',
    ],
  },
  A1: {
    format: 'short_answer',
    prompt: 'Mention the types of muscle attachment.',
    expects: [
      'Direct attachment, the fibres inserting into the periosteum',
      'Indirect attachment through a tendon, a cord of dense regular connective tissue',
      'Indirect attachment through an aponeurosis, a flattened sheet of the same tissue',
      'The two attachments are named origin and insertion',
      'The origin is conventionally the more fixed end',
      'Which end is fixed reverses between one movement and another',
    ],
  },
  A2: {
    format: 'comparison_table',
    prompt: 'Compare primary and secondary cartilaginous joints.',
    expects: [
      'A primary cartilaginous joint (synchondrosis) unites bones by hyaline cartilage',
      'It is usually temporary and ossifies with growth — the epiphyseal plate is the type example',
      'It permits no movement',
      'A secondary cartilaginous joint (symphysis) unites bones by fibrocartilage',
      'It lies in the midline and is permanent — the pubic symphysis and the intervertebral discs',
      'It permits slight movement',
    ],
  },
  A3: {
    format: 'structured_written',
    prompt: 'Describe the decidua: its definition, its parts, and the fate of each part.',
    expects: [
      'The decidua is the functional layer of the endometrium after implantation, so named because it is shed at birth',
      'Decidua basalis lies deep to the conceptus',
      'Basalis becomes the maternal part of the placenta',
      'Decidua capsularis covers the conceptus and is stretched and lost as the sac grows',
      'Decidua parietalis lines the rest of the uterine cavity',
      'Parietalis fuses with capsularis by about the fourth month, obliterating the cavity',
    ],
  },
  A4: {
    format: 'structured_written',
    prompt: 'Summarise the types of embryonic folding and the causes of each.',
    expects: [
      'Folding converts the flat trilaminar disc into a cylinder',
      'Longitudinal folding, at head and tail',
      'It is driven by the rapid growth of the neural tube, particularly the brain',
      'It carries the septum transversum and the heart ventrally',
      'Transverse (lateral) folding, driven by growth of the somites',
      'It closes the ventral body wall and pinches the gut off from the yolk sac',
    ],
  },
  A5: {
    format: 'structured_written',
    prompt: 'Mention the attachments, actions and nerve supply of pectoralis major.',
    expects: [
      'Clavicular head from the medial half of the clavicle',
      'Sternocostal head from the sternum and the upper six costal cartilages',
      'Inserts into the lateral lip of the bicipital groove',
      'Adducts and medially rotates the arm',
      'The clavicular head flexes the arm',
      'The sternocostal head extends it from flexion',
      'Supplied by the lateral and medial pectoral nerves',
    ],
  },
  A6: {
    format: 'structured_written',
    prompt: 'Give the origin and root value of the radial nerve, and its branches in the axilla and in the arm.',
    expects: [
      'It is the largest branch of the posterior cord of the brachial plexus',
      'Root value C5 to T1',
      'In the axilla: muscular branches to the long and medial heads of triceps',
      'In the axilla: the posterior cutaneous nerve of the arm',
      'In the arm: branches to the lateral and medial heads of triceps and to anconeus',
      'In the arm: the lower lateral cutaneous nerve of the arm and the posterior cutaneous nerve of the forearm',
      'It ends by dividing into superficial and deep terminal branches',
    ],
  },
  A7: {
    format: 'structured_written',
    prompt: 'Describe the site, formation and branches of the deep palmar arch.',
    expects: [
      'It lies on the bases of the metacarpals, deep to the long flexor tendons',
      'About a finger’s breadth proximal to the superficial palmar arch',
      'At the level of the proximal border of the extended thumb',
      'Formed mainly by the terminal part of the radial artery',
      'Completed medially by the deep branch of the ulnar artery',
      'Gives three palmar metacarpal arteries',
      'Gives perforating branches to the dorsal metacarpal arteries and recurrent branches to the carpal arch',
    ],
  },
  A8: {
    format: 'structured_written',
    prompt: 'Give the type of the elbow joint, its bony parts, and describe its ligaments.',
    expects: [
      'A synovial joint of hinge type',
      'Between the trochlea and capitulum of the humerus above',
      'And the trochlear notch of the ulna with the head of the radius below',
      'The radial collateral ligament runs from the lateral epicondyle to the anular ligament',
      'The ulnar collateral ligament is triangular and arises from the medial epicondyle',
      'It has anterior, posterior and oblique bands',
      'These reach the coronoid process and the olecranon',
    ],
  },
  A9: {
    format: 'multipart_written',
    prompt: 'A 45-year-old woman noticed a hard painless lump in her breast. Carcinoma of the breast was diagnosed and a mastectomy performed.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What lymph nodes should be removed during the mastectomy operation?',
        expects: [
          'The axillary nodes, which receive about three quarters of the lymph of the breast',
          'Chiefly the anterior (pectoral) group, then the central and apical nodes',
        ],
      },
      {
        letter: 'b',
        prompt: 'Should the physician examine the other breast? Why?',
        expects: [
          'Yes',
          'Lymphatics cross the midline, so carcinoma can reach the opposite breast',
          'The medial quadrants also drain to the internal thoracic (parasternal) nodes, so a clear axilla is not a clear chest',
        ],
      },
      {
        letter: 'c',
        prompt: 'After the operation the patient was unable to abduct her arm above the shoulder. Account for this.',
        conceptKey: 'long-thoracic-nerve-injury-winged-scapula',
        expects: [
          'The long thoracic nerve (C5, C6, C7) was injured during axillary clearance',
          'It lies on the surface of serratus anterior on the medial wall of the axilla',
          'Serratus anterior rotates the scapula upward, which abduction above the shoulder requires',
        ],
      },
      {
        letter: 'd',
        prompt: 'What other deformity can be noticed?',
        conceptKey: 'long-thoracic-nerve-injury-winged-scapula',
        expects: [
          'Winging of the scapula — its medial border stands off the chest wall',
        ],
      },
    ],
  },
  A10: {
    format: 'multipart_written',
    prompt: 'A 30-year-old woman fell on her outstretched hand and has severe pain in the lateral part of the wrist, particularly at the base of the anatomical snuff box.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What are the boundaries of the anatomical snuff box?',
        expects: [
          'Anteriorly, the tendons of abductor pollicis longus and extensor pollicis brevis together',
          'Posteriorly, the tendon of extensor pollicis longus',
          'Its base is the styloid process of the radius',
        ],
      },
      {
        letter: 'b',
        prompt: 'What are the contents of the anatomical snuff box?',
        expects: [
          'The radial artery, crossing the floor',
          'The beginning of the cephalic vein',
        ],
      },
      {
        letter: 'c',
        prompt: 'What makes the floor of the anatomical snuff box?',
        expects: [
          'The scaphoid and the trapezium',
          'With the styloid process of the radius and the base of the first metacarpal',
          'Which is why tenderness here after a fall on the outstretched hand means a scaphoid fracture',
        ],
      },
      {
        letter: 'd',
        prompt: 'What makes the roof of the anatomical snuff box?',
        expects: [
          'Skin and fascia',
          'Crossed by the cephalic vein and the superficial branch of the radial nerve',
        ],
      },
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
