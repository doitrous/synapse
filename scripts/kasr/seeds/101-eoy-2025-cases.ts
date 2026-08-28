/**
 * The faculty's own problem-solving case bank for first year, 2025, as data.
 *
 * `Cases of problem solving for the 1st year in different modules` — ten upper
 * limb cases, each with five to seven lettered subparts and each followed by
 * the department's own model answer under the heading `Answer`. That is what
 * makes this document worth seeding: every `expects` line below is the
 * examiner's own answer, not a reading of the book.
 *
 * ## Two files, one document
 *
 * `EOY Anatomy cases 1st year 2025-1 (2).pdf` and
 * `101 ANATOMY ASSESSMENT cases 1st year 2025-1 (2).pdf` are the same file
 * filed in two folders. The manifest gives them the same SHA-256
 * (`4ad2587114e7f1ba4811f945…`) and therefore the same `sourceId`
 * `src_4ad2587114e7f1ba4811`; they differ only in `corpusRelativePath`, one
 * under `EOY/` and one under `Written Questions/`. Seeded once.
 *
 * ## It is not a sitting, and is tiered accordingly
 *
 * It prints no date, no mark total, no exam rubric and no candidate
 * instructions — it is a revision bank of cases with model answers, not a paper
 * anybody sat. `tier` is `formative` for that reason, which is also what keeps
 * it from claiming the 2025 end-of-year paper's blueprint weight. Several of
 * its cases are the cases that were then set: case 2 is the 2025 EOY paper's
 * Case (1) and case 10 its Case (2), and cases 5 and 7 are the 2024 paper's
 * Q11 and Q12. Those repetitions are the point of reading it.
 *
 * ## The syllabus overrun
 *
 * The document runs past 101. After its `Upper Limb (101)` section it prints
 * `Lower Limb (103)` with six cases and `Cardiopulmonary (104)` with six more —
 * common peroneal nerve, femoral hernia, femoral neck fracture, knee meniscus,
 * sciatic nerve, coronary arteries, pleural effusion, haemopericardium, cardiac
 * conducting system, inhaled foreign body, aortic aneurysm. Twelve cases of
 * material that is not in this module's syllabus, circulating to first-year
 * students under a 101 filename. Only the ten upper-limb cases are seeded here;
 * `incomplete` records the rest rather than dropping them silently, because a
 * bank that overruns its module is a fact about this faculty and not a
 * transcription error. `clusters.json` already carries the twelve under
 * `OFF-TREE:` paths.
 *
 * ## Marks
 *
 * The document prints no marks anywhere. Five marks a case is used, which is
 * what this department prints against a problem-solving question in the same
 * kind of series: `(5 marks)` on the 2022 first-round paper's Problem Solving
 * Questions section, and the five that makes the 2024 paper's cases add its
 * cover total to ninety-six. Said here rather than left implied.
 *
 * ## Keys
 *
 * Every key is `clusters.json`'s, verbatim, except two. Case 2 reuses the two
 * keys the 2025 EOY seed already minted for the same case rather than the
 * cluster's names for them, because deduplicating against the seed corpus is
 * the thing that turns this repetition into evidence — and minting a second
 * copy of a concept the 2025 file already carries is exactly the failure the
 * key discipline exists to prevent. The disagreement is recorded on both seeds
 * under `conflicts` and needs reconciling the way the snuff box, the palmar
 * arches and the lysosomes were.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this document is. */
export const SOURCE: SourceRef = {
  id: 'src_4ad2587114e7f1ba4811',
  file: 'EOY Anatomy cases 1st year 2025-1 (2).pdf',
  sittingYear: 2025,
  tier: 'other',
  sections: ['Upper Limb'],
  incomplete:
    'Upper-limb cases only. The document continues past this module into "Lower Limb (103)" with six cases '
    + '(common peroneal nerve at the neck of the fibula, fracture neck of femur in the elderly, femoral hernia, '
    + 'knee meniscus injury, common peroneal nerve again, sciatic nerve laceration) and "Cardiopulmonary (104)" '
    + 'with six more (anginal pain and the coronary arteries, pleural effusion, haemopericardium, the cardiac '
    + 'conducting system, inhaled foreign body, thoracic aortic aneurysm). All twelve carry model answers and '
    + 'none of them is 101 material; they belong to modules 103 and 104 and are not seeded here.',
}


export const SEEDS: Seed[] = [
  {
    q: 1, section: 'Upper Limb', page: 1, marks: 5,
    asked: 'A 16 years old girl fell on her outstretched hand and felt sudden pain in her right shoulder. On examination her shoulder was depressed. a. Which bone of the upper limb do you expect to be fractured? b. Which part of this bone is most commonly fractured? Why? c. Why is the shoulder region depressed? d. What structures are liable to be damaged in such a fracture? e. What is the procedure usually used for the fixation of such a fracture?',
    label: 'The clavicle breaks where its curvature changes, and the shoulder then drops because the limb hangs from it',
    key: 'case-clavicle-fracture-middle-third',
    definition: 'The clavicle fractures most often at the junction between its lateral and middle thirds, the site at which its curvature changes — the lateral third is convex posteriorly and the medial two thirds convex anteriorly. The shoulder drops because the weight of the upper limb is suspended from the lateral third of the clavicle through the coraco-clavicular ligament, the main medium by which the scapula and upper limb are suspended. The subclavian vessels and the divisions of the brachial plexus lie behind the bone and are liable to be damaged; the fracture is treated with an arm sling to support the sagging limb.',
    objective: 'Explain why the clavicle fractures at the junction of its lateral and middle thirds, why the shoulder is then depressed, and what lies at risk behind it.',
    pitfall: 'Attributing the drop to muscle spasm. The limb is suspended from the clavicle by the coraco-clavicular ligament, so a break lateral to nothing that suspends it simply lets the weight of the arm pull the shoulder down.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
    type: 'clinical_correlation',
    aliases: ['Fractured clavicle', 'Collar bone fracture'],
  },
  {
    q: 2, section: 'Upper Limb', page: 1, marks: 5,
    asked: 'A 45 years old woman noticed a hard painless lump in her breast. The case was diagnosed as carcinoma of the breast and an operation of mastectomy was performed. a. What lymph nodes should be removed during mastectomy operation? b. What other areas do these lymph nodes drain? c. Should the physician examine the other breast? Why? d. After the operation, the patient was unable to abduct her arm above the shoulder. How can this be explained? e. What other deformity can be noticed?',
    label: 'Breast lymph drains mainly to the axillary nodes, which is why mastectomy clears the axilla',
    key: 'breast-lymphatic-drainage',
    definition: 'The axillary lymph nodes take the great majority of the lymph of the breast and are the nodes removed at mastectomy. They also drain the upper limb, the front and back of the chest, and the abdominal walls down to the level of the umbilicus. The lymphatics of the two breasts intercommunicate freely across the midline, which is why carcinoma of one breast is a reason to examine the other.',
    objective: 'Explain which nodes a mastectomy removes, what else those nodes drain, and why the opposite breast must be examined.',
    pitfall: 'Treating the axillary nodes as breast nodes only. They drain the whole upper limb and a wide field of trunk wall, which is why an enlarged axillary node is not by itself a breast finding.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-GYN-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
    type: 'clinical_correlation',
    aliases: ['Mastectomy', 'Axillary clearance'],
    conflicts: [
      'This key is the one the 2025 EOY seed minted for the same case, so the two occurrences deduplicate onto one concept. `clusters.json` names this objective `case-breast-carcinoma-mastectomy-axillary-nodes` across five askings, and separately carries `breast-lymphatic-drainage` at one asking. Three names for the material; not reconciled here.',
    ],
  },
  {
    // Subparts d and e of case 2 are a different idea from the drainage the
    // first three ask about: a student can know where the breast drains and
    // still not know why she cannot lift her arm afterwards. Co-primary.
    q: 2, section: 'Upper Limb', page: 1, marks: 0,
    asked: 'd. After the operation, the patient was unable to abduct her arm above the shoulder. How can this be explained? e. What other deformity can be noticed?',
    label: 'Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula',
    key: 'long-thoracic-nerve-serratus-anterior-winging',
    definition: 'The long thoracic nerve may be injured during dissection of the axillary lymph nodes at radical mastectomy. It supplies serratus anterior, whose paralysis gives winging of the scapula, difficulty in protraction of the shoulder girdle and difficulty in raising the arm above the head.',
    objective: 'Explain why a mastectomy patient cannot abduct above the shoulder, and name the deformity that accompanies it.',
    pitfall: 'Blaming the axillary nerve. That would flatten the shoulder and numb the skin over the lower deltoid; it is loss of scapular rotation above the shoulder, with winging, that names the long thoracic nerve.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'clinical_correlation',
    aliases: ['Winged scapula', 'Serratus anterior palsy'],
    conflicts: [
      'This key is the 2025 EOY seed\'s, kept so the two occurrences deduplicate. `clusters.json` names the same objective `long-thoracic-nerve-serratus-anterior-winging` across five askings. Not reconciled here.',
    ],
  },
  {
    q: 3, section: 'Upper Limb', page: 2, marks: 5,
    asked: 'A rock climbing student fell and grasped a tree just before reaching the ground with his outstretched hands. He had motor and sensory losses. a.What nervous structure do you expect to be injured? b.What is the name of this injury? c. What are the paralyzed muscles? d.What is the expected deformity? e.Where would you test for skin sensations in such an injury?',
    label: 'Falling while clutching an object avulses the lower trunk of the brachial plexus and claws the hand',
    key: 'case-klumpke-lower-trunk-avulsion',
    definition: 'Klumpke\'s paralysis is injury of the lower trunk of the brachial plexus, C8 and T1, from excessive abduction of the arm with traction or tearing of those roots — falling from a height clutching an object is the type example. Because C8 and T1 fibres run mainly in the ulnar nerve to the lumbricals and interossei, the small muscles of the hand are paralysed and the result is a complete claw hand: hyperextension of the metacarpophalangeal joints from the unopposed extensor digitorum, with flexion of the interphalangeal joints from the unopposed long flexors, and loss of abduction and adduction of the fingers. Sensation is lost along the medial aspect of the arm, forearm and hand.',
    objective: 'Recognise Klumpke\'s paralysis from its mechanism, name the roots involved, and give the deformity and the sensory territory to test.',
    pitfall: 'Confusing it with Erb\'s palsy. Erb\'s is the upper trunk, C5 and C6, from depression of the shoulder, and it affects the proximal limb and the lateral sensory strip; Klumpke\'s is the lower trunk from traction with the arm up, and it is the hand and the medial strip.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'clinical_correlation',
    aliases: ['Klumpke\'s paralysis', 'Lower trunk avulsion', 'Complete claw hand'],
  },
  {
    q: 4, section: 'Upper Limb', page: 2, marks: 5,
    asked: 'During an obstructed labor, the obstetrician had to pull on the baby\'s head. The baby was noticed to be unable to move his arm and forearm properly. a. What nervous structure do you expect to be injured? b. What is the name of this injury? c. Name 5 muscles that would be paralyzed? d. What position will the arm and forearm take due to this paralysis? e. Where do you expect this baby to suffer from skin sensory loss?',
    label: 'Traction on the head at delivery tears the upper trunk and gives the porter\'s tip posture',
    key: 'erb-palsy-upper-trunk-injury',
    definition: 'Duchenne-Erb\'s paralysis is injury of the upper trunk of the brachial plexus, C5 and C6, from excessive displacement of the head to one side with depression of the shoulder on the other — in infants, a birth injury during delivery. The muscles paralysed are those of C5 and C6: deltoid and teres minor through the axillary nerve, subscapularis and teres major through the subscapular nerves, supraspinatus and infraspinatus through the suprascapular nerve, and biceps, brachialis and coracobrachialis through the musculocutaneous nerve. The limb takes the porter\'s tip posture — the shoulder adducted and medially rotated, the elbow extended and the forearm pronated — and sensation is lost along the lateral aspect of the arm and forearm.',
    objective: 'Recognise Erb\'s palsy from its obstetric mechanism, name the roots, list the paralysed muscles by their nerves, and describe the resulting posture.',
    pitfall: 'Learning the posture without the muscles behind it. Each component of the porter\'s tip is a named paralysis — adduction from deltoid and supraspinatus, medial rotation from infraspinatus and teres minor, extension and pronation from biceps — and the question asks for five muscles for that reason.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'clinical_correlation',
    aliases: ['Duchenne-Erb\'s paralysis', 'Porter\'s tip deformity', 'Waiter\'s tip'],
  },
  {
    q: 5, section: 'Upper Limb', page: 2, marks: 5,
    asked: 'A 12 years old boy suffered from fracture middle of the shaft of the humerus following a car accident. a. What nerve is liable to be injured? b. What movements would be affected following paralysis of these muscles? c. What is the name of the resulting deformity? d. Why this deformity is considered functionally disabling? e. Mention the site of the sensory loss that would occur?',
    label: 'A fracture of the humeral shaft catches the radial nerve in the spiral groove and drops the wrist',
    key: 'radial-nerve-injury-spiral-groove-wrist-drop',
    definition: 'The radial nerve runs in the spiral groove on the back of the shaft of the humerus and may be injured by a fracture of the shaft. The result is weak extension of the elbow and loss of extension of the wrist and of the metacarpophalangeal joints — wrist drop. It is disabling because the wrist extensors act as synergists for the long finger flexors during a power grip, so grip fails. Sensation is lost in the skin of the dorsum of the hand over the area between the first and second metacarpals, in the skin of the back of the forearm, and at the lower half of the lateral surface of the arm.',
    objective: 'Explain why a humeral shaft fracture injures the radial nerve, name the deformity, say why it disables the hand, and give the sites of sensory loss.',
    pitfall: 'Expecting a wide area of anaesthesia. Only the patch on the dorsum between the first and second metacarpals is completely lost, because the adjacent nerves overlap everything else.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Wrist drop', 'Saturday night palsy'],
  },
  {
    q: 6, section: 'Upper Limb', page: 3, marks: 5,
    asked: 'A 45 years old woman was admitted to hospital with dislocation of her right shoulder. a. What nerve is endangered by this dislocation? b. What are the muscles supplied by this nerve? c. What movements would be affected if this nerve was injured? d. What would be the deformity resulting from this paralysis? e. Where would be the skin sensory loss resulting from such an injury?',
    label: 'A dislocated shoulder endangers the axillary nerve and flattens the shoulder',
    key: 'axillary-nerve-injury-shoulder-dislocation',
    definition: 'The axillary nerve is frequently injured in dislocation of the shoulder joint, in fracture of the surgical neck of the humerus, and by pressure from a badly adjusted crutch. It supplies deltoid and teres minor. Its injury loses abduction of the shoulder from fifteen to ninety degrees, gives a flat shoulder from wasting of deltoid, and leaves a patch of sensory loss over the skin of the lower half of the deltoid.',
    objective: 'Name the nerve endangered by shoulder dislocation, the muscles it supplies, the movement lost, the deformity and the sensory patch.',
    pitfall: 'Saying abduction is lost altogether. Supraspinatus starts abduction to fifteen degrees and the scapular rotators carry it past ninety; what the axillary nerve costs is the middle range.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Flat shoulder', 'Circumflex nerve injury'],
  },
  {
    q: 7, section: 'Upper Limb', page: 3, marks: 5,
    asked: 'A young student tried to commit suicide by cutting in front of his wrist with a blade. a. What vessels would be cut? b. Describe 2 points where you can apply pressure to stop the bleeding. c. In what direction should the pressure be applied? d. What nerves would be injured? e. What is the expected neurological loss?',
    label: 'A cut across the front of the wrist takes both forearm arteries and both hand nerves',
    key: 'case-wrist-laceration-vessels-nerves',
    definition: 'A transverse cut in front of the wrist divides the radial and ulnar arteries and the median and ulnar nerves with the palmar cutaneous branch of each. Bleeding is controlled by compressing the brachial artery backwards against the humerus, at the medial side of the middle of the arm and again at the lower part of the arm. The neurological loss is sensory over the palmar aspect of the hand and fingers, and motor over all the small muscles of the hand.',
    objective: 'Say which vessels and nerves a wrist laceration divides, where and in which direction to compress, and what neurological loss follows.',
    pitfall: 'Compressing in the wrong direction. The brachial artery is pressed backwards onto the humerus; pressing medially or laterally rolls it off the bone and does nothing.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Wrist laceration', 'Suicidal wrist cut'],
  },
  {
    q: 8, section: 'Upper Limb', page: 4, marks: 5,
    asked: 'A house wife complains from numbness and tingling sensation in the hand and lateral fingers which was progressive. On examination, there was some wasting in the thenar eminence. a. What anatomical structure is diseased in this patient? b. Describe the area of the expected sensory impairment? c. Does this sensory impairment markedly affect the hand function? Why? d. What muscles would be functionally impaired? e. Does this motor impairment markedly affect the hand function? Why? f. What is the name of this syndrome? What is its usual cause? g. What is the name of the resulting deformity?',
    label: 'Carpal tunnel syndrome is the median nerve compressed under the flexor retinaculum',
    key: 'carpal-tunnel-median-nerve-compression',
    definition: 'Carpal tunnel syndrome is compression of the median nerve as it passes deep to the flexor retinaculum. Sensation is impaired over the palmar surface of the lateral three and a half fingers and over the dorsal aspect of their distal phalanges, which matters because touch and proprioception there are what fine manipulation depends on. The thenar muscles and the lateral two lumbricals are impaired, and loss of opposition of the thumb markedly affects the fine function of the hand and the hand grip. The deformity is the ape (monkey\'s) hand: the thenar eminence wasted and flattened, the thumb laterally rotated and adducted with loss of opposition.',
    objective: 'Localise the lesion in carpal tunnel syndrome, give its sensory and motor territory, and explain why each loss disables the hand.',
    pitfall: 'Calling the numbness the disability. The sensory loss is over the fingers that do fine work, but it is losing opposition of the thumb that costs the hand its grip.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Carpal tunnel syndrome', 'Ape hand', 'Monkey\'s hand'],
  },
  {
    q: 9, section: 'Upper Limb', page: 4, marks: 5,
    asked: 'Following an accident, a middle age man suffered from fracture in the medial epicondyle. a. What structure is liable to be injured? b. What are the muscles that would be paralyzed? c. What is the expected sensory loss? d. What is the name of the resulting deformity? e. Would this deformity be less severe if the nerve was injured at the wrist? Why?',
    label: 'The ulnar nerve behind the medial epicondyle, and why a high injury claws the hand less',
    key: 'ulnar-nerve-injury-claw-hand',
    definition: 'The ulnar nerve lies behind the medial epicondyle and is injured by fracture there. It paralyses flexor carpi ulnaris, the medial half of flexor digitorum profundus, the hypothenar muscles, the medial two lumbricals, the dorsal and palmar interossei and adductor pollicis. Sensation is lost over the medial third of the palm and of the dorsum of the hand and over both aspects of the medial one and a half fingers. The deformity is a partial claw hand — and it is paradoxically less severe here than after a wrist injury, because the medial half of flexor digitorum profundus is also paralysed and so cannot flex the interphalangeal joints of the clawed fingers.',
    objective: 'Give the muscles, sensory loss and deformity of an ulnar nerve injury at the elbow, and explain why the clawing is less than after an injury at the wrist.',
    pitfall: 'Assuming a higher injury is always worse. Clawing needs the long flexors intact to pull the fingers; cutting the nerve above them removes the very pull that makes the claw.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Ulnar claw hand', 'Ulnar paradox'],
    uncertainty: 'The model answer for this case runs subparts d and e together as "Partial claw hande. If the injury was near the wrist…" — the letter (e) is swallowed by the last word of (d). The split used here is the one the printed subparts ask for.',
  },
  {
    q: 10, section: 'Upper Limb', page: 5, marks: 5,
    asked: 'A 30 years old woman fell on her outstretched hand. She suffered from severe pain in the lateral part of the wrist particularly at the base of the anatomical snuff box. a. What is the expected diagnosis? b. What are the boundaries of the anatomical snuff box? c. What are the contents of the anatomical snuff box? d. What makes the floor of the anatomical snuff box? e. What makes the roof of the anatomical snuff box?',
    label: 'Tenderness in the snuff box after a fall on the outstretched hand means a fractured scaphoid',
    key: 'anatomical-snuff-box-site-boundaries-contents',
    definition: 'The anatomical snuff box is bounded medially by the tendon of extensor pollicis longus and laterally by the tendons of abductor pollicis longus and extensor pollicis brevis. It contains the radial artery and the tendons of extensor carpi radialis longus and brevis. Its floor is the styloid process of the radius with the scaphoid and the trapezium, and its roof is skin and superficial fascia containing the superficial radial nerve and the beginning of the cephalic vein. Because the scaphoid is in its floor, tenderness there after a fall on the outstretched hand is a fractured scaphoid until proved otherwise.',
    objective: 'Give the boundaries, contents, floor and roof of the anatomical snuff box, and say what tenderness in it means after a fall.',
    pitfall: 'Making abductor pollicis longus and extensor pollicis brevis two separate boundaries. They form one boundary together; the other is extensor pollicis longus alone.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Hand',
    type: 'clinical_correlation',
    aliases: ['Snuffbox', 'Scaphoid fracture'],
    conflicts: [
      'This model answer puts the tendons of extensor carpi radialis longus and brevis among the contents; the 2025 EOY seed puts the beginning of the cephalic vein among them instead. The department book, in its Forearm chapter, does neither: it gives the contents as the radial artery, says the extensor carpi radialis longus and brevis tendons cross the floor, and puts the beginning of the cephalic vein in the roof. The model answer is kept here because this file\'s whole value is that its schemes are the examiner\'s own, and the book\'s reading is recorded against it.',
    ],
  },
]

export const SCHEMES: Record<string, Scheme> = {
  U1: {
    format: 'multipart_written',
    prompt: 'A 16-year-old girl fell on her outstretched hand and felt sudden pain in her right shoulder. On examination her shoulder was depressed.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'Which bone of the upper limb do you expect to be fractured?', expects: ['The clavicle'] },
      {
        letter: 'b',
        prompt: 'Which part of this bone is most commonly fractured? Why?',
        expects: [
          'The junction between the lateral and middle thirds',
          'It is the site of the change in curvature — the lateral third is convex posteriorly and the medial two thirds convex anteriorly',
        ],
      },
      {
        letter: 'c',
        prompt: 'Why is the shoulder region depressed?',
        expects: [
          'The shoulder drops because of the weight of the upper limb',
          'The limb is suspended through the coraco-clavicular ligament to the lateral third of the clavicle',
        ],
      },
      {
        letter: 'd',
        prompt: 'What structures are liable to be damaged in such a fracture?',
        expects: ['The subclavian vessels', 'The divisions of the brachial plexus'],
      },
      {
        letter: 'e',
        prompt: 'What is the procedure usually used for the fixation of such a fracture?',
        expects: ['An arm sling, to support the sagging limb'],
      },
    ],
  },
  U2: {
    format: 'multipart_written',
    prompt: 'A 45-year-old woman noticed a hard painless lump in her breast. Carcinoma of the breast was diagnosed and a mastectomy performed.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'What lymph nodes should be removed during the mastectomy operation?', expects: ['The axillary lymph nodes'] },
      {
        letter: 'b',
        prompt: 'What other areas do these lymph nodes drain?',
        expects: [
          'The upper limb',
          'The front and back of the chest',
          'The abdominal walls, down to the level of the umbilicus',
        ],
      },
      {
        letter: 'c',
        prompt: 'Should the physician examine the other breast? Why?',
        expects: ['Yes', 'Because of the free intercommunication of the lymphatics of the breasts of both sides'],
      },
      {
        letter: 'd',
        prompt: 'After the operation the patient was unable to abduct her arm above the shoulder. How can this be explained?',
        conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
        expects: [
          'The long thoracic nerve could have been injured during dissection of the axillary lymph nodes',
          'This leads to paralysis of the serratus anterior muscle',
          'Serratus anterior rotates the scapula, which raising the arm above the head requires',
        ],
      },
      {
        letter: 'e',
        prompt: 'What other deformity can be noticed?',
        conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
        expects: ['Winging of the scapula'],
      },
    ],
  },
  U3: {
    format: 'multipart_written',
    prompt: 'A rock-climbing student fell and grasped a tree just before reaching the ground with his outstretched hands. He had motor and sensory losses.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What nervous structure do you expect to be injured?',
        expects: ['Avulsion of the lower trunk of the brachial plexus', 'The roots involved are C8 and T1'],
      },
      { letter: 'b', prompt: 'What is the name of this injury?', expects: ["Klumpke's paralysis"] },
      {
        letter: 'c',
        prompt: 'What are the paralyzed muscles?',
        expects: [
          'Mainly the small muscles of the hand',
          'Because C8 and T1 fibres are distributed mainly through the ulnar nerve to the lumbricals and interossei',
        ],
      },
      {
        letter: 'd',
        prompt: 'What is the expected deformity?',
        expects: [
          'Complete claw hand',
          'Hyperextension of the metacarpophalangeal joints from the unopposed extensor digitorum, with flexion of the interphalangeal joints from the unopposed long flexors',
        ],
      },
      {
        letter: 'e',
        prompt: 'Where would you test for skin sensations in such an injury?',
        expects: ['Along the medial aspect of the arm, forearm and hand'],
      },
    ],
  },
  U4: {
    format: 'multipart_written',
    prompt: "During an obstructed labour the obstetrician had to pull on the baby's head. The baby was unable to move his arm and forearm properly.",
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What nervous structure do you expect to be injured?',
        expects: ['The upper trunk of the brachial plexus', 'The roots involved are C5 and C6'],
      },
      { letter: 'b', prompt: 'What is the name of this injury?', expects: ["Erb's palsy (Duchenne-Erb's paralysis)"] },
      {
        letter: 'c',
        prompt: 'Name 5 muscles that would be paralyzed.',
        expects: [
          'Deltoid and teres minor — axillary nerve',
          'Subscapularis and teres major — upper and lower subscapular nerves',
          'Supraspinatus and infraspinatus — suprascapular nerve',
          'Biceps, brachialis and coracobrachialis — musculocutaneous nerve',
          'Any five of these',
        ],
      },
      {
        letter: 'd',
        prompt: 'What position will the arm and forearm take due to this paralysis?',
        expects: [
          'The arm is adducted and medially rotated',
          'The forearm is extended and pronated',
          'This posture is the porter\'s tip deformity',
        ],
      },
      {
        letter: 'e',
        prompt: 'Where do you expect this baby to suffer from skin sensory loss?',
        expects: ['Along the lateral aspect of the arm and forearm'],
      },
    ],
  },
  U5: {
    format: 'multipart_written',
    prompt: 'A 12-year-old boy suffered a fracture of the middle of the shaft of the humerus following a car accident.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What nerve is liable to be injured?',
        expects: ['The radial nerve', 'It lies in the spiral groove on the back of the shaft of the humerus'],
      },
      {
        letter: 'b',
        prompt: 'What movements would be affected following paralysis of these muscles?',
        expects: [
          'Weak extension of the elbow',
          'Loss of extension of the wrist',
          'Loss of extension of the metacarpophalangeal joints',
        ],
      },
      { letter: 'c', prompt: 'What is the name of the resulting deformity?', expects: ['Wrist drop'] },
      {
        letter: 'd',
        prompt: 'Why is this deformity considered functionally disabling?',
        expects: [
          'It affects the power of the hand grip',
          'The wrist extensors act as synergists for the long flexors of the fingers during power grip of the hand',
        ],
      },
      {
        letter: 'e',
        prompt: 'Mention the site of the sensory loss that would occur.',
        expects: [
          'The skin of the dorsum of the hand over the area between the first and second metacarpal bones',
          'The skin of the back of the forearm',
          'The lower half of the lateral surface of the arm',
        ],
      },
    ],
  },
  U6: {
    format: 'multipart_written',
    prompt: 'A 45-year-old woman was admitted to hospital with dislocation of her right shoulder.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'What nerve is endangered by this dislocation?', expects: ['The axillary nerve'] },
      { letter: 'b', prompt: 'What are the muscles supplied by this nerve?', expects: ['Deltoid', 'Teres minor'] },
      {
        letter: 'c',
        prompt: 'What movements would be affected if this nerve was injured?',
        expects: ['Loss of abduction of the shoulder from 15 to 90 degrees'],
      },
      {
        letter: 'd',
        prompt: 'What would be the deformity resulting from this paralysis?',
        expects: ['Flat shoulder', 'From wasting of the deltoid'],
      },
      {
        letter: 'e',
        prompt: 'Where would be the skin sensory loss resulting from such an injury?',
        expects: ['The skin over the lower half of the deltoid'],
      },
    ],
  },
  U7: {
    format: 'multipart_written',
    prompt: 'A young student tried to commit suicide by cutting in front of his wrist with a blade.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'What vessels would be cut?', expects: ['The radial artery', 'The ulnar artery'] },
      {
        letter: 'b',
        prompt: 'Describe 2 points where you can apply pressure to stop the bleeding.',
        expects: [
          'The brachial artery compressed against the humerus at the medial side of the middle of the arm',
          'The brachial artery compressed against the humerus at the lower part of the arm',
        ],
      },
      { letter: 'c', prompt: 'In what direction should the pressure be applied?', expects: ['Backwards'] },
      {
        letter: 'd',
        prompt: 'What nerves would be injured?',
        expects: [
          'The ulnar nerve',
          'The median nerve',
          'The palmar cutaneous branch of the ulnar nerve',
          'The palmar cutaneous branch of the median nerve',
        ],
      },
      {
        letter: 'e',
        prompt: 'What is the expected neurological loss?',
        expects: [
          'Loss of sensation over the palmar aspect of the hand and fingers',
          'Motor loss involving all the small muscles of the hand',
        ],
      },
    ],
  },
  U8: {
    format: 'multipart_written',
    prompt: 'A housewife complains of progressive numbness and tingling in the hand and lateral fingers. On examination there is wasting of the thenar eminence.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'What anatomical structure is diseased in this patient?', expects: ['The median nerve'] },
      {
        letter: 'b',
        prompt: 'Describe the area of the expected sensory impairment.',
        expects: [
          'Sensory loss over the palmar surface of the lateral three and a half fingers',
          'And over the dorsal aspect of the distal phalanx of these fingers',
        ],
      },
      {
        letter: 'c',
        prompt: 'Does this sensory impairment markedly affect the hand function? Why?',
        expects: [
          'Yes',
          'The sense of touch and proprioception there is important for fine manipulations',
        ],
      },
      {
        letter: 'd',
        prompt: 'What muscles would be functionally impaired?',
        expects: ['The thenar muscles', 'The lateral two lumbricals'],
      },
      {
        letter: 'e',
        prompt: 'Does this motor impairment markedly affect the hand function? Why?',
        expects: [
          'Yes',
          'Loss of opposition of the thumb markedly affects the fine function of the hand and the hand grip',
        ],
      },
      {
        letter: 'f',
        prompt: 'What is the name of this syndrome? What is its usual cause?',
        expects: [
          'Carpal tunnel syndrome',
          'Compression of the median nerve as it passes deep to the flexor retinaculum',
        ],
      },
      { letter: 'g', prompt: 'What is the name of the resulting deformity?', expects: ["Ape's hand"] },
    ],
  },
  U9: {
    format: 'multipart_written',
    prompt: 'Following an accident, a middle-aged man suffered a fracture of the medial epicondyle.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'What structure is liable to be injured?', expects: ['The ulnar nerve'] },
      {
        letter: 'b',
        prompt: 'What are the muscles that would be paralyzed?',
        expects: [
          'Flexor carpi ulnaris and the medial half of flexor digitorum profundus',
          'The hypothenar muscles and the medial two lumbricals',
          'The dorsal and palmar interossei and adductor pollicis',
        ],
      },
      {
        letter: 'c',
        prompt: 'What is the expected sensory loss?',
        expects: [
          'Over the medial third of the palm and of the dorsum of the hand',
          'And over the palmar and dorsal aspects of the medial one and a half fingers',
        ],
      },
      { letter: 'd', prompt: 'What is the name of the resulting deformity?', expects: ['Partial claw hand'] },
      {
        letter: 'e',
        prompt: 'Would this deformity be less severe if the nerve was injured at the wrist? Why?',
        expects: [
          'No — an injury near the wrist gives the more severe deformity',
          'A high injury spares nothing but paralyses flexor carpi ulnaris and the medial half of flexor digitorum profundus as well',
          'It is that paralysis of the long flexor which makes the clawing less apparent',
        ],
      },
    ],
  },
  U10: {
    format: 'multipart_written',
    prompt: 'A 30-year-old woman fell on her outstretched hand and has severe pain in the lateral part of the wrist, particularly at the base of the anatomical snuff box.',
    expects: [],
    parts: [
      { letter: 'a', prompt: 'What is the expected diagnosis?', expects: ['Fracture of the scaphoid bone'] },
      {
        letter: 'b',
        prompt: 'What are the boundaries of the anatomical snuff box?',
        expects: [
          'Medially, the tendon of extensor pollicis longus',
          'Laterally, the tendons of abductor pollicis longus and extensor pollicis brevis',
        ],
      },
      {
        letter: 'c',
        prompt: 'What are the contents of the anatomical snuff box?',
        expects: [
          'The radial artery',
          'The tendons of extensor carpi radialis longus and brevis',
        ],
      },
      {
        letter: 'd',
        prompt: 'What makes the floor of the anatomical snuff box?',
        expects: [
          'The styloid process of the radius',
          'The scaphoid and the trapezium',
        ],
      },
      {
        letter: 'e',
        prompt: 'What makes the roof of the anatomical snuff box?',
        expects: [
          'Skin and superficial fascia',
          'Containing the superficial radial nerve and the beginning of the cephalic vein',
        ],
      },
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
