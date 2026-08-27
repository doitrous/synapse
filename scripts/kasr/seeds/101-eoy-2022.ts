/**
 * The July 2022 first-round paper for 101 ISK, as data.
 *
 * `Module Name: Normal Structure of the Human Body / Module Code: ISK-101 /
 * Final Theoretical Module Exam / Date: 24/7/2022 / Time allowed: 3 hours /
 * Total Marks: 96 marks`, seventeen pages. Fourteen numbered short-answer
 * questions worth seventy-four marks, and they interleave Histology, Anatomy
 * and Embryology in one series rather than sectioning them — this paper has no
 * `[Section 1: Anatomy]` / `[Section 2: Histology]` split at all, which the 2024
 * and 2025 papers both have. Q1 is cytology, Q4 is the cubital fossa, Q11 is
 * amniotic fluid; the examiner simply ran through the module.
 *
 * ## Which file this is, and where else it appears
 *
 * `EOY 195 first 2022 101 ISK final (1).pdf` (src_bafb8703f4396f06d125),
 * seventeen pages, no text layer. The same seventeen pages appear twice more
 * inside `EOY 101 exams not answerd (1).pdf` (src_c58336a4f2f0a172b4fe) — at its
 * pages 1–17 and again at its pages 60–76, both footed `1/17` … `17/17` with
 * the same cover block and the same Q1A. That compilation is a scrapbook: it
 * also carries the September 2022 paper twice, an eight-page INT-101 paper of
 * 15/9/2022, and fragments of a sixteen-page **M105 Musculoskeletal-1** paper of
 * 8/10/2022 which is not this module at all. None of that is seeded from the
 * compilation; this sitting is seeded once, from its own file.
 *
 * It is a different paper from `EOY 195 first 2022  101 ISK  final module (1).pdf`
 * despite the near-identical filename. That one is fourteen pages, dated
 * 24/9/2022 — the September round — and its questions differ from the first
 * word: Q1A there is the EM of the Golgi apparatus, here it is the EM of
 * mitochondria; Q12 there asks the sites of yellow elastic connective tissue,
 * here mucoid. Two sittings, not two scans.
 *
 * ## Marks
 *
 * Every mark below is printed on the page. They reconcile exactly to the cover
 * total, which is worth recording because it is the check that no question was
 * missed: Section A 74 + Section B (29 MCQs at ½) 14.5 + Section C (3 extended
 * matching tables, ½ a match) 7.5 = 96.
 *
 * Question 14 is `Problem Solving Questions` and prints two cases under one
 * number, I and II, at five marks each. Its ten lettered subparts are seeded as
 * ten parts of one question at one mark each, which is what five marks over
 * five letters comes to, and the case numeral is kept in the part letter.
 *
 * ## Where the mark schemes come from
 *
 * Every `expects` line is the department's own book,
 * `scripts/kasr/extract/deptbook.json`, at the chapter on the seed's
 * `modulePath`. This paper has no solved copy. Granularity follows the
 * department's July 2023 model answer in `scripts/kasr/extract/sittings.json`:
 * the name and the mechanism are separate points, and alternatives inside a
 * point are joined by OR.
 *
 * ## Keys
 *
 * Every key is `clusters.json`'s verbatim, except three, all flagged on the
 * seeds: Q5 needed a new key because no cluster covers the movements of the
 * shoulder *girdle* as distinct from the shoulder *joint*, and Q14's two breast
 * concepts reuse the keys the 2025 EOY seed already minted so that the three
 * sittings that ask this case deduplicate onto one concept each.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this paper is. */
export const SOURCE: SourceRef = {
  id: 'src_bafb8703f4396f06d125',
  file: 'EOY 195 first 2022 101 ISK final (1).pdf',
  sittingYear: 2022,
  tier: 'end_of_year',
  sections: ['Section A'],
  incomplete:
    'Section A only. The paper also prints Section B — 29 multiple-choice questions at half a mark each, '
    + 'pages 14–16 — and Section C — three extended-matching tables at half a mark a match, page 17, on '
    + 'non-membranous organelles, epithelial tissue and blood. Both are reproduced in full in this copy; '
    + 'neither is seeded here, because the multiple-choice bank is authored separately under seeds/mcq/. '
    + 'The paper is 96 marks; this file carries the 74 of Section A.',
}


export const SEEDS: Seed[] = [
  {
    q: 1, section: 'Section A', page: 1, marks: 6,
    asked: 'A- Describe electron microscopic picture (EM) of mitochondria. (3 marks) B- Enumerate & Describe the types of Secondary lysosomes. (3 marks)',
    label: 'A mitochondrion is two membranes, an inner one folded into cristae, around a matrix that carries its own DNA',
    key: 'mitochondria-structure-em',
    definition: 'Mitochondria are the power-house of the cell, sited in its most active areas and bounded by two unit membranes. The outer membrane is smooth, carries porins and is permeable to small molecules; the inner is selectively permeable and folds into cristae bearing elementary particles with ATP synthase activity. The matrix holds the oxidative enzymes of the citric acid cycle, mitochondrial DNA with mRNA, tRNA and rRNA, and dense calcium-rich granules acting as catalysts. Mitochondria increase in number by simple division, and stain dark blue with iron haematoxylin and green with Janus green.',
    objective: 'Describe the electron-microscopic structure of a mitochondrion: its two membranes, the cristae and their elementary particles, and the contents of the matrix.',
    pitfall: 'Describing the cristae as folds and stopping. The elementary particles on them carry the ATP synthase, which is what makes the folding worth having.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structure_function_relationship',
    aliases: ['Mitochondrion', 'Chondriosome'],
  },
  {
    // Q1 prints A and B under one number and they are two different ideas —
    // an organelle's ultrastructure and a classification of another organelle.
    q: 1, section: 'Section A', page: 1, marks: 0,
    asked: 'B- Enumerate & Describe the types of Secondary lysosomes. (3 marks)',
    label: 'A secondary lysosome is named for what the primary lysosome fused with',
    key: 'lysosome-types-secondary-fates',
    definition: 'A primary lysosome is a newly released, homogeneous, moderately electron-dense vesicle. Secondary lysosomes are heterogeneous and are of three types, each named for what the primary lysosome fused with: the heterolysosome, primary lysosome plus phagosome, which digests solid particles; the multivesicular body, primary lysosome plus pinocytic vesicle, which digests fluid; and the autolysosome, primary lysosome plus autophagic vesicle, containing a destroyed endogenous substrate such as a mitochondrion. A residual body is the vesicle that retains undigested material afterwards.',
    objective: 'Name the three types of secondary lysosome and describe the fusion that forms each and the material it digests.',
    pitfall: 'Listing the three names without the fusions. The department\'s own model answer pays the name and the mechanism as separate half-marks, so a list of names is worth half of what the question is out of.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'classification',
    aliases: ['Heterolysosome', 'Multivesicular body', 'Autolysosome', 'Residual body'],
    conflicts: [
      'The 2025 EOY seed asks this material from the other end, as the electron-microscopic picture of primary, secondary and residual bodies. It is one objective and one cluster: that seed, 101-baqoon-2024.ts and SITTING_SIGNALS all use the cluster key `lysosome-types-secondary-fates`, as reconciled, and 101-eoy-2025.ts is registered first so its wording is what the concept carries.',
    ],
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
    asked: 'A- Discuss the L.M. (light microscopic picture) of blood Eosinophils. (2 marks) Nucleus Cytoplasm B- Mention 4 functions of blood Basophils. (2 marks)',
    label: 'The eosinophil is a bilobed nucleus behind large acidophilic granules',
    key: 'eosinophil-features-granules-function',
    definition: 'Eosinophils are one to four per cent of the leukocytes and ten to fourteen micrometres across. The nucleus is bilobed, horse-shoe shaped, its two lobes connected by a thick chromatin thread. The cytoplasm carries large acidophilic specific granules; by electron microscopy each is oval with an electron-dense core of basic protein, the internum, and a less dense periphery, the externum, containing histaminase, sulphatase and eosinophil-derived neurotoxin, alongside small azurophil granules which are lysosomes.',
    objective: 'Describe the light-microscopic picture of the eosinophil under the two headings the paper prints — nucleus and cytoplasm.',
    pitfall: 'Counting lobes to identify it. A young neutrophil is bilobed too; it is the large granules taking eosin strongly that settle it.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
    type: 'structural_description',
    aliases: ['Acidophil leukocyte'],
  },
  {
    q: 3, section: 'Section A', page: 3, marks: 0,
    asked: 'B- Mention 4 functions of blood Basophils. (2 marks)',
    label: 'The basophil is the blood cell that runs an allergic reaction',
    key: 'basophil-features-granules-ige',
    definition: 'Basophils are nought to one per cent of the leukocytes, with an irregular segmented S-shaped nucleus and coarse basophilic granules that obscure it and stain metachromatically purple with toluidine blue because of their heparin. The granules are large, rounded and electron dense, and contain histamine, heparin, eosinophil chemotactic factor and leukotrienes; the cell membrane carries receptors for IgE. The basophil secretes heparin, which prevents clotting and promotes allergy; histamine, whose vasodilatation causes the sudden drop in blood pressure of anaphylaxis; eosinophil chemotactic factor, which attracts eosinophils; and leukotrienes, which cause bronchospasm and bronchial asthma. It has limited phagocytic power.',
    objective: 'Give four functions of the basophil, each through the substance its granules release.',
    pitfall: 'Confusing it with the mast cell. The book says the two share metachromatic granules and IgE receptors and differ in life span, size, nuclear shape and phagocytic ability — a basophil lives a few days and is ten to twelve micrometres, a mast cell weeks to months and twenty to thirty.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
    type: 'structure_function_relationship',
    aliases: ['Basophil leukocyte'],
  },
  {
    q: 4, section: 'Section A', page: 4, marks: 5,
    asked: 'Describe the anatomy of the cubital fossa (site, boundaries, floor and contents).',
    label: 'The cubital fossa is the triangular hollow in front of the elbow, and everything important passes through it',
    key: 'cubital-fossa-boundaries-contents',
    definition: 'The cubital fossa is an inverted triangular hollow in front of the elbow joint, occupying the upper third of the front of the forearm. Its floor is brachialis medially and supinator laterally. Its roof is skin and superficial fascia — containing parts of the cephalic and basilic veins with the median cubital vein connecting them, the anterior branches of the lateral and medial cutaneous nerves of the forearm, and the supratrochlear lymph nodes in its upper lateral part — plus deep fascia reinforced by the bicipital aponeurosis. Its contents from medial to lateral are the median nerve, the termination of the brachial artery with the beginnings of the ulnar and radial arteries, the tendon of biceps, and the radial nerve with the beginning of its posterior interosseous branch.',
    objective: 'Give the site, boundaries, floor and contents of the cubital fossa, naming the contents in their medial-to-lateral order.',
    pitfall: 'Forgetting the bicipital aponeurosis. It lies in the roof and separates the median cubital vein from the median nerve and brachial artery beneath, which is what makes venepuncture there safe.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Arm',
    type: 'structural_description',
    aliases: ['Antecubital fossa'],
    gaps: [
      'The book defines the cubital fossa and gives its floor, roof and contents, and its classification list names "Boundaries of the cubital fossa", but the three boundaries themselves — brachioradialis, pronator teres and the line between the epicondyles — are not present as text in the extracted chapter. The scheme asks for them and marks the parts the book supports.',
    ],
  },
  {
    q: 5, section: 'Section A', page: 5, marks: 5,
    asked: 'Outline the movement allowed at the shoulder girdle and the muscles responsible.',
    label: 'The shoulder girdle elevates, depresses, protracts, retracts and rotates, each by a named set of muscles',
    key: 'shoulder-girdle-movements-muscles',
    definition: 'The shoulder girdle moves at the acromio-clavicular and sterno-clavicular joints. Elevation is by the upper fibres of trapezius with levator scapulae. Depression is by pectoralis minor, with subclavius steadying the clavicle and preventing excessive movement. Protraction is by serratus anterior, the main and powerful protractor, assisted by pectoralis minor. Retraction is by the middle fibres of trapezius with the rhomboids. Rotation so the glenoid cavity faces upward is by the upper and lower fibres of trapezius with the lower five digitations of serratus anterior, which is what lets the arm be raised overhead; rotation so the glenoid faces downward is by levator scapulae with rhomboideus minor.',
    objective: 'Name the movements of the shoulder girdle and the muscles that produce each, including both directions of scapular rotation.',
    pitfall: 'Treating rotation as one movement. Upward and downward rotation of the glenoid have different muscles, and it is upward rotation — trapezius with serratus anterior — that carries abduction past ninety degrees.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
    type: 'structure_function_relationship',
    aliases: ['Scapular movements', 'Pectoral girdle movements'],
    conflicts: [
      'New key, minted here. `clusters.json` has no objective for the movements of the shoulder *girdle*; its nearest entries — `shoulder-joint-movements-muscles`, `shoulder-abduction-muscles-attachments-nerve-action`, `scapular-rotation-abduction-beyond-90-muscles` — are all about the shoulder joint or about abduction, and this question is about the scapula and clavicle moving on the trunk. Flagged for reconciliation rather than forced into one of them.',
    ],
  },
  {
    q: 6, section: 'Section A', page: 6, marks: 5,
    asked: 'Give the origin, relations and branches of the ulnar artery in the forearm.',
    label: 'The ulnar artery is the larger terminal branch of the brachial, and it ends as the superficial palmar arch',
    key: 'ulnar-artery-course-relations-branches',
    definition: 'The ulnar artery begins in the cubital fossa below the elbow joint as the larger terminal branch of the brachial artery. It runs obliquely downwards and medially in the upper third of the forearm, then vertically along the medial side of its front, and at the wrist descends superficial to the flexor retinaculum, lateral to the ulnar nerve and the pisiform and medial to the hook of the hamate, ending in the hand as the superficial palmar arch. Near the elbow it gives the anterior ulnar recurrent artery, the posterior ulnar recurrent artery and the common interosseous artery, a short trunk arising about an inch below its beginning which divides into anterior and posterior interosseous arteries. In the forearm it gives muscular branches to the ulnar-side muscles, and at the wrist the anterior and posterior carpal arteries that form the two carpal arches.',
    objective: 'Give the origin, course, relations and branches of the ulnar artery in the forearm.',
    pitfall: 'Placing the ulnar artery under the flexor retinaculum. It passes superficial to it, with the ulnar nerve, which is why both are cut by a wound across the front of the wrist.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Forearm',
    type: 'structural_description',
    aliases: ['Arteria ulnaris'],
  },
  {
    q: 7, section: 'Section A', page: 7, marks: 5,
    asked: 'Mention the origin and the branches of the brachial plexus.',
    label: 'The brachial plexus is roots, trunks, divisions and cords, and its branches sort flexor from extensor',
    key: 'brachial-plexus-formation-branches',
    definition: 'The brachial plexus lies partly in the neck and partly in the axilla and consists of roots C5 to T1, three trunks, six divisions and three cords. The upper trunk is C5 and C6, the middle trunk C7 alone, the lower trunk C8 and T1; each divides behind the clavicle into an anterior and a posterior division. The lateral cord is the anterior divisions of the upper and middle trunks, the medial cord the anterior division of the lower trunk, the posterior cord the posterior divisions of all three. Branches of the upper trunk are the nerve to subclavius and the suprascapular nerve; of the lateral cord, the musculocutaneous nerve, the lateral root of the median and the lateral pectoral nerve; of the medial cord, the ulnar nerve, the medial root of the median, the medial pectoral nerve and the medial cutaneous nerves of the arm and forearm; of the posterior cord, the radial and axillary nerves, the upper and lower subscapular nerves and the nerve to latissimus dorsi. All the lateral and medial cord branches supply the flexor side and all the posterior cord branches the extensor side.',
    objective: 'Give the root value and the four stages of the brachial plexus and list the branches of each trunk and cord.',
    pitfall: 'Listing branches without the flexor–extensor rule. The posterior cord supplies every extensor and the other two cords every flexor, which makes the list a system rather than a list.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'structural_description',
    aliases: ['Plexus brachialis'],
  },
  {
    q: 8, section: 'Section A', page: 8, marks: 5,
    asked: 'Explain the attachments and nerve supply of the muscles produces supination of the forearm.',
    label: 'Supination is supinator and biceps, and biceps is the powerful one',
    key: 'supination-pronation-muscles-attachments-nerve',
    definition: 'Supination is lateral rotation of the forearm, and it is produced by supinator and by biceps brachii. Supinator surrounds the upper third of the shaft of the radius, arising from the supinator crest and fossa of the ulna and from the lateral epicondyle, the lateral collateral ligament of the elbow and the annular ligament, and inserting into the posterior, lateral and anterior aspects of the upper third of the radius above the oblique lines; it is one of the deep extensor group and is supplied by the posterior interosseous branch of the radial nerve, which pierces it and splits it into superficial and deep layers. Biceps brachii arises by a short head from the tip of the coracoid process and a long head from the supraglenoid tubercle, and inserts into the radial tuberosity by the bicipital tendon and into the deep fascia by the bicipital aponeurosis; it is supplied by the musculocutaneous nerve.',
    objective: 'Name the two muscles that supinate the forearm and give the attachments and nerve supply of each.',
    pitfall: 'Naming supinator alone. Biceps is the powerful supinator, and it is why a right-handed screw is driven by the flexed right arm.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Forearm',
    type: 'structural_description',
    aliases: ['Supinator', 'Biceps brachii'],
  },
  {
    q: 9, section: 'Section A', page: 9, marks: 5,
    asked: 'Describe the structure of the synovial joints.',
    label: 'A synovial joint is seven named components around a potential cavity',
    key: 'synovial-joint-structure-characters',
    definition: 'A synovial joint is freely mobile and present mostly in the limbs. It is formed of a fibrous capsule surrounding the joint, lined by synovial membrane and strengthened by strong ligaments; articular cartilage, hyaline cartilage covering the articular surfaces, smooth, lubricated by synovial fluid, with no blood vessels or nerves and nourished from the fluid; a joint cavity which is potential, holding only a thin film of fluid and becoming manifest if fluid, blood or pus collects; a synovial membrane, thin, moist and glistening, covering everything inside the joint except the articular surfaces and secreting and absorbing the fluid; synovial fluid, pale yellow and viscous like egg albumin, containing synovial cells, macrophages and lymphocytes; ligaments, capsular, extracapsular and intracapsular; and intra-articular structures such as a fibrocartilaginous disc, menisci, ligaments or a tendon.',
    objective: 'Name the seven components of a synovial joint and describe what each contributes.',
    pitfall: 'Calling the joint cavity a space. It is a potential cavity with only a film of fluid; it becomes an actual space only when disease fills it.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
    type: 'structural_description',
    aliases: ['Diarthrosis'],
  },
  {
    q: 10, section: 'Section A', page: 10, marks: 5,
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
    q: 11, section: 'Section A', page: 10, marks: 5,
    asked: 'Enumerate the functions of the amniotic fluid.',
    label: 'Amniotic fluid does different work early, late and during delivery',
    key: 'amniotic-fluid-functions',
    definition: 'Amniotic fluid is a clear watery fluid of water, electrolytes, protein, carbohydrate, lipid, phospholipid and urea, produced first by the amnioblast cells, then derived from maternal blood by osmosis, with fetal urine added from the fifth month. In early pregnancy it is a shock absorber protecting the fetus from external trauma, a thermal insulator keeping the fetal temperature constant, and the thing that prevents adhesion of the fetus to the uterine wall and of fetal parts to each other. In late pregnancy it provides space for the fetal movements that develop the fetal muscles, space for fetal urine, and a medium the fetus swallows to learn to suckle. During delivery it protects the fetus against uterine contractions, its fore bag helps the cervical canal dilate gradually, its rupture signals the start of labour, and being sterile it washes the vagina just before the fetus passes.',
    objective: 'Enumerate the functions of amniotic fluid in early pregnancy, in late pregnancy and during delivery.',
    pitfall: 'Giving cushioning alone. The book groups the functions by stage, and the delivery group — gradual cervical dilatation, the sign of labour, washing the birth canal — is a third of the answer.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'structure_function_relationship',
    aliases: ['Liquor amnii'],
  },
  {
    q: 12, section: 'Section A', page: 11, marks: 5,
    asked: 'Mentions the results of folding of the embryonic disc.',
    label: 'Folding turns a flat disc into a cylinder with a gut inside it and a ring in its belly wall',
    key: 'embryonic-disc-folding-types-causes-results',
    definition: 'Folding of the embryonic disc begins at the end of the third week and is complete at the end of the fourth. It is caused by expansion of the amniotic cavity, which produces longitudinal and transverse folding, and by growth of the neural tube and somites, which increases longitudinal length and drives the cephalo-caudal folds. Its results are transformation of the flat disc into a cylindrical body with a body cavity, the amniotic cavity coming to surround the embryo, and formation of the primitive umbilical ring — the defect in the ventral abdominal wall where the lateral folds fail to fuse because of the connecting stalk, allantois and vitelline duct. The gut is divided into foregut in the head fold, hindgut in the tail fold and midgut between the lateral folds, with the secondary yolk sac compressed into the vitelline duct. Folding also produces the forebrain bulge, the pericardial bulge and the stomodeum between them, and reverses position: the septum transversum becomes caudal and the bucco-pharyngeal membrane the most cranial structure, while the connecting stalk becomes more cranial and ventral and the cloacal membrane the most caudal.',
    objective: 'State the results of folding of the embryonic disc, including the divisions of the gut and the reversal of position.',
    pitfall: 'Missing the reversal of position. The septum transversum starts cranial to the disc and ends caudal to the heart, and a student who does not see the fold turn the disc over cannot place the diaphragm afterwards.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Embryonic Period',
    type: 'developmental_process',
    aliases: ['Cephalo-caudal folding', 'Lateral folding', 'Primitive umbilical ring'],
  },
  {
    q: 13, section: 'Section A', page: 12, marks: 5,
    asked: 'Point out the congenital abnormalities of the placenta.',
    label: 'The placenta goes wrong in six ways, and the department groups them by what is abnormal',
    key: 'placenta-anomalies',
    definition: 'The congenital anomalies of the placenta are grouped by what is abnormal about it: position, as in placenta previa; shape, bilobed or trilobed; number, twin or accessory placenta; attachment of the umbilical cord, velamentous where the cord is attached through the amniotic membrane and battledore where it is attached to the margin; diameter, as in placenta membranacea, which is thinner and wider; and infiltration, as accreta, increta and percreta.',
    objective: 'Enumerate the congenital anomalies of the placenta under the six headings the department book uses.',
    pitfall: 'Listing names without the grouping. The book groups them by position, shape, number, cord attachment, diameter and infiltration, and the grouping is what makes six unrelated names recallable.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'clinical_correlation',
    aliases: ['Velamentous placenta', 'Battledore placenta', 'Placenta membranacea', 'Placenta accreta'],
  },
  {
    q: 14, section: 'Section A', page: 13, marks: 10,
    asked: 'Problem Solving Questions: I. A 45 years old woman noticed a hard painless lump in her breast. The case was diagnosed as carcinoma of the breast and an operation of mastectomy was performed. (5 marks) a. What lymph nodes should be removed during mastectomy operation? b. What other areas do these lymph nodes drain? c. Should the physician examine the other breast? Why? d. After the operation, the patient was unable to abduct her arm above the shoulder. How can this be explained? e. What other deformity can be noticed? II) A 12 years old boy suffered from fracture middle of the shaft of the humerus following a car accident. (5 marks) a. What nerve is liable to be injured? b. What movements would be affected following paralysis of these muscles? c. What is the name of the resulting deformity? d. Why this deformity is considered functionally disabling? e. Mention the site of the sensory loss that would occur?',
    label: 'Breast lymph drains mainly to the axillary nodes, which is why mastectomy clears the axilla',
    key: 'breast-lymphatic-drainage',
    definition: 'The axillary lymph nodes take the great majority of the lymph of the breast and are the nodes removed at mastectomy. The anterior (pectoral) group lies along the lower border of pectoralis minor and receives from the central and lateral quadrants of the gland; the posterior (subscapular) group receives from the posterior trunk down to the iliac crest; the apical group, at the apex of the axilla, receives from all the other groups and from the upper limb. Together they drain the upper limb, the front and back of the chest and the abdominal walls down to the umbilicus. The lymphatics of the two breasts intercommunicate freely, which is why carcinoma of one is a reason to examine the other.',
    objective: 'Explain which nodes a mastectomy removes, what else those nodes drain, and why the opposite breast must be examined.',
    pitfall: 'Treating the axillary nodes as breast nodes only. They drain the whole upper limb and a wide field of trunk wall, so an enlarged axillary node is not by itself a breast finding.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-GYN-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
    type: 'clinical_correlation',
    aliases: ['Mastectomy', 'Axillary clearance'],
    conflicts: [
      'Key reused from the 2025 EOY seed so that the three sittings asking this case deduplicate onto one concept. `clusters.json` names the objective `case-breast-carcinoma-mastectomy-axillary-nodes` at five askings and separately carries `breast-lymphatic-drainage` at one. Not reconciled here.',
    ],
  },
  {
    q: 14, section: 'Section A', page: 13, marks: 0,
    asked: 'd. After the operation, the patient was unable to abduct her arm above the shoulder. How can this be explained? e. What other deformity can be noticed?',
    label: 'Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula',
    key: 'long-thoracic-nerve-serratus-anterior-winging',
    definition: 'The long thoracic nerve runs in the axilla and may be injured during radical mastectomy. It supplies serratus anterior, the main and powerful protractor of the shoulder, whose lower five digitations act with the upper and lower fibres of trapezius to rotate the scapula so the glenoid cavity looks upwards. Its injury gives winging of the scapula, difficulty in protraction of the shoulder girdle and difficulty in raising the arm above the head.',
    objective: 'Explain why a mastectomy patient cannot abduct above the shoulder, and name the deformity that accompanies it.',
    pitfall: 'Blaming the axillary nerve. That would flatten the shoulder and numb the skin over the lower deltoid; it is loss of scapular rotation above the shoulder, with winging, that names the long thoracic nerve.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'clinical_correlation',
    aliases: ['Winged scapula', 'Serratus anterior palsy'],
    conflicts: [
      'Key reused from the 2025 EOY seed. `clusters.json` names the same objective `long-thoracic-nerve-serratus-anterior-winging` at five askings. Not reconciled here.',
    ],
  },
  {
    q: 14, section: 'Section A', page: 13, marks: 0,
    asked: 'II) A 12 years old boy suffered from fracture middle of the shaft of the humerus following a car accident. a. What nerve is liable to be injured? b. What movements would be affected following paralysis of these muscles? c. What is the name of the resulting deformity? d. Why this deformity is considered functionally disabling? e. Mention the site of the sensory loss that would occur?',
    label: 'A fracture of the humeral shaft catches the radial nerve in the spiral groove and drops the wrist',
    key: 'radial-nerve-injury-spiral-groove-wrist-drop',
    definition: 'The radial nerve runs in the spiral groove on the back of the shaft of the humerus with the profunda brachii vessels, and a fracture of the shaft may injure it. The result is wrist drop and finger drop from paralysis of all the extensors of the wrist and fingers, with impaired extension of the elbow against resistance from triceps affection and failure of supination of the extended forearm. It is disabling because a firm grip is impossible while the wrist is flexed: the wrist extensors are synergists for the long finger flexors during a power grip. Sensory effects vary with the level — a small area of complete loss on the dorsum of the hand between the first and second metacarpals, restricted by overlap from adjacent nerves, with paraesthesia over the back of the arm and forearm and the lateral two-thirds of the dorsum of the hand.',
    objective: 'Explain why a humeral shaft fracture injures the radial nerve, name the deformity, say why it disables the hand, and give the sites of sensory loss.',
    pitfall: 'Expecting a wide area of anaesthesia. Only the patch between the first and second metacarpals is completely lost, because the adjacent nerves overlap everything else.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Wrist drop', 'Saturday night palsy'],
  },
]

export const SCHEMES: Record<string, Scheme> = {
  S1: {
    format: 'multipart_written',
    prompt: 'Cytology: the electron-microscopic picture of the mitochondrion, and the types of secondary lysosome.',
    expects: [],
    parts: [
      {
        letter: 'A',
        prompt: 'Describe the electron microscopic picture (EM) of mitochondria.',
        expects: [
          'Bounded by two unit membranes',
          'The outer membrane is smooth, carries porins and is permeable to small molecules',
          'The inner membrane is selectively permeable and folds into cristae',
          'The cristae bear elementary particles with ATP synthase activity',
          'The matrix contains the oxidative enzymes of the citric acid cycle',
          'The matrix contains DNA, mRNA, tRNA and rRNA',
          'The matrix contains dense Ca2+-rich granules acting as catalysts',
          'Mitochondria are sited in the most active areas of the cell and increase in number by simple division',
        ],
      },
      {
        letter: 'B',
        prompt: 'Enumerate and describe the types of secondary lysosome.',
        conceptKey: 'lysosome-types-secondary-fates',
        expects: [
          'Heterolysosome',
          'Formed by fusion of a primary lysosome with a phagosome — it digests solid particles',
          'Multivesicular body',
          'Formed by fusion of a primary lysosome with a pinocytic vesicle — it digests fluid',
          'Autolysosome',
          'Formed by fusion of a primary lysosome with an autophagic vesicle containing a destroyed endogenous substrate such as a mitochondrion',
          'Secondary lysosomes are heterogeneous, unlike the homogeneous moderately electron-dense primary lysosome',
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
    format: 'multipart_written',
    prompt: 'Blood: the light-microscopic picture of the eosinophil, and the functions of the basophil.',
    expects: [],
    parts: [
      {
        letter: 'A',
        prompt: 'Discuss the L.M. (light microscopic picture) of blood eosinophils — nucleus and cytoplasm.',
        expects: [
          'Nucleus: bilobed, horse-shoe shaped',
          'Nucleus: the two lobes are connected by a thick chromatin thread',
          'Cytoplasm: large acidophilic specific granules',
          'Cytoplasm: also small azurophil granules, which are lysosomes',
          'Eosinophils are 1–4% of the leukocytes and 10–14 µm across',
        ],
      },
      {
        letter: 'B',
        prompt: 'Mention 4 functions of blood basophils.',
        conceptKey: 'basophil-features-granules-ige',
        expects: [
          'Secretion of heparin — prevents clotting and promotes allergy',
          'Secretion of histamine — vasodilatation causing a sudden drop in blood pressure, i.e. anaphylaxis',
          'Release of eosinophil chemotactic factor — attracts eosinophils',
          'Release of leukotrienes — bronchospasm and bronchial asthma',
          'Limited phagocytic power',
        ],
      },
    ],
  },
  S4: {
    format: 'structured_written',
    prompt: 'Describe the anatomy of the cubital fossa: its site, boundaries, floor and contents.',
    expects: [
      'Site: an inverted triangular hollow in front of the elbow joint',
      'Site: it occupies the upper one third of the front of the forearm',
      'Floor: brachialis medially and supinator laterally',
      'Roof: skin and superficial fascia, plus deep fascia reinforced by the bicipital aponeurosis',
      'The roof contains parts of the cephalic and basilic veins with the median cubital vein connecting them, the anterior branches of the lateral and medial cutaneous nerves of the forearm, and the supratrochlear lymph nodes',
      'Contents, from medial to lateral: the median nerve, which leaves by passing between the two heads of pronator teres',
      'The termination of the brachial artery with the beginning of the ulnar and radial arteries',
      'The tendon of biceps',
      'The radial nerve with the beginning of its posterior interosseous branch',
      'The bicipital aponeurosis separates the median cubital vein superficially from the median nerve and terminal brachial artery deep to it',
    ],
  },
  S5: {
    format: 'structured_written',
    prompt: 'Outline the movements allowed at the shoulder girdle and the muscles responsible for each.',
    expects: [
      'The movements occur at the acromio-clavicular and sterno-clavicular joints',
      'Elevation: the upper fibres of trapezius with levator scapulae',
      'Depression: pectoralis minor',
      'Subclavius steadies the clavicle and prevents excessive shoulder girdle movement',
      'Protraction: serratus anterior, the main and powerful protractor, assisted by pectoralis minor',
      'Retraction: the middle fibres of trapezius with the rhomboids',
      'Rotation with the glenoid cavity facing upward: the upper and lower fibres of trapezius with the lower five digitations of serratus anterior',
      'That upward rotation is what allows the arm to be raised overhead',
      'Rotation with the glenoid cavity facing downward: levator scapulae with rhomboideus minor',
    ],
  },
  S6: {
    format: 'structured_written',
    prompt: 'Give the origin, relations and branches of the ulnar artery in the forearm.',
    expects: [
      'It begins in the cubital fossa below the elbow joint as the larger terminal branch of the brachial artery',
      'It runs obliquely downwards and medially in the upper third, then vertically along the medial side of the front of the forearm',
      'At the wrist it descends superficial to the flexor retinaculum',
      'There it lies lateral to the ulnar nerve and the pisiform and medial to the hook of the hamate',
      'It ends in the hand as the superficial palmar arch',
      'Branch: the anterior ulnar recurrent artery, ascending in front of the medial epicondyle to meet the anterior branch of the inferior ulnar collateral',
      'Branch: the posterior ulnar recurrent artery, ascending between the two heads of flexor carpi ulnaris to the back of the medial epicondyle to meet the superior ulnar collateral',
      'Branch: the common interosseous artery, arising about one inch below its beginning and dividing into anterior and posterior interosseous arteries',
      'Branch: muscular branches to the ulnar-side muscles',
      'Branch: the anterior and posterior carpal arteries, forming the anterior and posterior carpal arches',
    ],
  },
  S7: {
    format: 'structured_written',
    prompt: 'Mention the origin of the brachial plexus and its branches.',
    expects: [
      'Roots C5, C6, C7, C8 and T1; the plexus lies partly in the neck and partly in the axilla',
      'It consists of roots, trunks, divisions and cords',
      'Upper trunk from C5 and C6, middle trunk from C7 alone, lower trunk from C8 and T1',
      'Each trunk divides behind the clavicle into an anterior and a posterior division',
      'Lateral cord from the anterior divisions of the upper and middle trunks; medial cord from the anterior division of the lower trunk; posterior cord from the posterior divisions of all three',
      'Branches of the upper trunk: the nerve to subclavius and the suprascapular nerve',
      'Branches of the lateral cord: the musculocutaneous nerve, the lateral root of the median nerve and the lateral pectoral nerve',
      'Branches of the medial cord: the ulnar nerve, the medial root of the median nerve, the medial pectoral nerve, the medial cutaneous nerve of the arm and the medial cutaneous nerve of the forearm',
      'Branches of the posterior cord: the radial nerve, the axillary (circumflex) nerve, the upper and lower subscapular nerves and the nerve to latissimus dorsi (thoraco-dorsal)',
      'All lateral and medial cord branches supply the flexor side; all posterior cord branches supply the extensor side',
    ],
  },
  S8: {
    format: 'structured_written',
    prompt: 'Explain the attachments and nerve supply of the muscles that produce supination of the forearm.',
    expects: [
      'Supination is lateral rotation of the forearm',
      'The muscles are supinator and biceps brachii',
      'Supinator arises from the supinator crest and fossa of the ulna, and from the lateral epicondyle, the lateral collateral ligament of the elbow and the annular ligament',
      'It surrounds the upper third of the shaft of the radius and inserts into the posterior, lateral and anterior aspects of that upper third, above the oblique lines',
      'Supinator is supplied by the posterior interosseous branch of the radial nerve, which pierces it and splits it into superficial and deep layers',
      'Biceps brachii arises by a short head from the tip of the coracoid process and a long head from the supraglenoid tubercle',
      'It inserts into the radial tuberosity by the bicipital tendon, and into the deep fascia by the bicipital aponeurosis',
      'Biceps is supplied by the musculocutaneous nerve',
    ],
  },
  S9: {
    format: 'structured_written',
    prompt: 'Describe the structure of a synovial joint.',
    expects: [
      'A fibrous capsule surrounding the joint, lined by synovial membrane and strengthened by strong ligaments',
      'Articular cartilage — hyaline cartilage covering the articular surfaces, smooth and lubricated by synovial fluid',
      'It has no blood vessels or nerves and is nourished from the synovial fluid',
      'A joint cavity — a potential cavity containing only a very thin film of synovial fluid, becoming manifest if fluid, blood or pus collects',
      'A synovial membrane — thin, moist and glistening, covering everything inside the joint except the articular surfaces, and secreting and absorbing the fluid',
      'Synovial fluid — pale yellow and viscous like egg albumin, containing synovial cells, macrophages and lymphocytes',
      'Ligaments — capsular, extracapsular and intracapsular',
      'Intra-articular structures — an articular fibrocartilaginous disc, menisci, ligaments OR a tendon',
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
    prompt: 'Enumerate the functions of the amniotic fluid.',
    expects: [
      'Early pregnancy: a shock absorber protecting the fetus from external trauma',
      'Early pregnancy: a thermal insulator ensuring a constant fetal temperature',
      'Early pregnancy: prevention of adhesion of the fetus to the uterine wall and of fetal body parts to each other',
      'Late pregnancy: space for the fetal movements essential for development of the fetal muscles',
      'Late pregnancy: space for accumulation of fetal urine',
      'Late pregnancy: a medium the fetus swallows, learning how to suckle',
      'During delivery: it protects the fetus against uterine contractions',
      'During delivery: the fore bag of the amniotic sac helps gradual dilatation of the cervical canal',
      'During delivery: rupture of the amniotic sac is the sign of the start of labour',
      'During delivery: being sterile, it washes the vagina just before passage of the fetus',
    ],
  },
  S12: {
    format: 'structured_written',
    prompt: 'Mention the results of folding of the embryonic disc.',
    expects: [
      'Transformation of the flat disc into a cylindrical body with a body cavity',
      'The amniotic cavity comes to surround the embryo',
      'Formation of the primitive umbilical ring — the defect in the ventral abdominal wall where the lateral folds fail to fuse',
      'It fails to fuse because of the connecting stalk, the allantois and the vitelline duct',
      'The gut is divided into foregut in the head fold, hindgut in the tail fold and midgut between the lateral folds',
      'The secondary yolk sac is compressed to form the vitelline (vitello-intestinal) duct, connected to the midgut',
      'Formation of the forebrain bulge and the pericardial bulge, with the stomodeum between them',
      'The stomodeum is separated from the foregut by the bucco-pharyngeal membrane',
      'Reversal of position in the head fold: the septum transversum becomes caudal and the bucco-pharyngeal membrane the most cranial structure',
      'Reversal of position in the tail fold: the connecting stalk with the allantois becomes more cranial and ventral, and the cloacal membrane the most caudal',
    ],
  },
  S13: {
    format: 'structured_written',
    prompt: 'Point out the congenital abnormalities of the placenta.',
    expects: [
      'Abnormality of position — placenta previa',
      'Abnormality of shape — bilobed OR trilobed placenta',
      'Abnormality of number — twin OR accessory placenta',
      'Abnormality of attachment of the umbilical cord — velamentous, the cord attached through the amniotic membrane',
      'Abnormality of attachment of the umbilical cord — battledore, the cord attached to the margin',
      'Abnormality of diameter — placenta membranacea, thinner and wider',
      'Abnormality of infiltration — placenta accreta, increta and percreta',
    ],
  },
  S14: {
    format: 'multipart_written',
    prompt: 'Problem Solving Questions. I: a 45-year-old woman with a hard painless lump in the breast, diagnosed as carcinoma, for whom a mastectomy was performed. II: a 12-year-old boy with a fracture of the middle of the shaft of the humerus following a car accident.',
    expects: [],
    parts: [
      {
        letter: 'I-a',
        prompt: 'What lymph nodes should be removed during the mastectomy operation?',
        expects: ['The axillary lymph nodes', 'Chiefly the anterior (pectoral) group along the lower border of pectoralis minor, then the central and apical groups'],
      },
      {
        letter: 'I-b',
        prompt: 'What other areas do these lymph nodes drain?',
        expects: [
          'The upper limb',
          'The front and back of the chest',
          'The abdominal walls, down to the level of the umbilicus',
        ],
      },
      {
        letter: 'I-c',
        prompt: 'Should the physician examine the other breast? Why?',
        expects: ['Yes', 'Because of the free intercommunication of the lymphatics of the breasts of both sides'],
      },
      {
        letter: 'I-d',
        prompt: 'After the operation the patient was unable to abduct her arm above the shoulder. How can this be explained?',
        conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
        expects: [
          'The long thoracic nerve was injured during dissection of the axillary lymph nodes',
          'This paralyses serratus anterior',
          'Serratus anterior rotates the scapula so the glenoid cavity looks upwards, which raising the arm overhead requires',
        ],
      },
      {
        letter: 'I-e',
        prompt: 'What other deformity can be noticed?',
        conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
        expects: ['Winging of the scapula', 'With difficulty in protraction of the shoulder girdle'],
      },
      {
        letter: 'II-a',
        prompt: 'What nerve is liable to be injured?',
        conceptKey: 'radial-nerve-injury-spiral-groove-wrist-drop',
        expects: ['The radial nerve', 'It lies in the spiral groove on the back of the shaft of the humerus with the profunda brachii vessels'],
      },
      {
        letter: 'II-b',
        prompt: 'What movements would be affected following paralysis of these muscles?',
        conceptKey: 'radial-nerve-injury-spiral-groove-wrist-drop',
        expects: [
          'Loss of extension of the wrist and of the fingers — all the extensors are paralysed',
          'Impaired extension of the elbow against resistance, from affection of triceps',
          'Failure of supination of the extended forearm',
        ],
      },
      {
        letter: 'II-c',
        prompt: 'What is the name of the resulting deformity?',
        conceptKey: 'radial-nerve-injury-spiral-groove-wrist-drop',
        expects: ['Wrist drop, with finger drop'],
      },
      {
        letter: 'II-d',
        prompt: 'Why is this deformity considered functionally disabling?',
        conceptKey: 'radial-nerve-injury-spiral-groove-wrist-drop',
        expects: [
          'A firm grip is impossible while the wrist is flexed',
          'The wrist extensors act as synergists for the long flexors of the fingers during a power grip',
        ],
      },
      {
        letter: 'II-e',
        prompt: 'Mention the site of the sensory loss that would occur.',
        conceptKey: 'radial-nerve-injury-spiral-groove-wrist-drop',
        expects: [
          'A small area of complete sensory loss on the dorsum of the hand between the 1st and 2nd metacarpals',
          'It is restricted because of overlap by adjacent nerves',
          'Paraesthesia over the posterior surface of the arm and forearm, the lower lateral side of the arm and the lateral two-thirds of the dorsum of the hand',
        ],
      },
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
