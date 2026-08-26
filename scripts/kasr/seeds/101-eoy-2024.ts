/**
 * The 2024 end-of-year paper for 101 ISK, as data.
 *
 * `EOY (ISK - 101) 198` — sixteen written questions, seventy-six marks: twelve
 * in Anatomy, of which the last two are cases, and four in Histology. The paper
 * puts Anatomy first and Histology second, the opposite order to 2025.
 *
 * ## Which files this is, and how the duplicates were established
 *
 * Three of the ten files handed to this session are this one sitting:
 *
 *   - `EOY (ISK - 101) 198 (1).pdf` (src_e2593cfba37af83a33ad) — the paper.
 *   - `EOY (ISK - 101) 198 {Solved} (1).pdf` (src_f6963dc2526125ed37ca) — the
 *     same paper with model answers written into the two cases. Question for
 *     question, number for number, page for page, the two are identical: same
 *     twelve Anatomy stems in the same order with the same printed `{5 Marks}`,
 *     same four Histology stems at `{4 Marks}`, same ten MCQs with the same
 *     options in the same order, same two matching tables. The only textual
 *     differences are the answers in Q11 and Q12 and the fi/ffi ligatures the
 *     unsolved copy's font drops ("de nition", "brous", "strati ed").
 *   - `EOY 198 final 101 - 198 الدور الأول (1).pdf` (src_3c0f852bd6e451c4de1b) —
 *     a student's recall list of the same first-round 198 sitting. It carries no
 *     wording and no marks, only topics, but its ten MCQs are this paper's ten
 *     MCQs verbatim and in order, and its written topics are this paper's
 *     written questions in the department's own section order (Histo written,
 *     Basis, Embryo, Upper). It is the same sitting recorded a third time.
 *
 * Seeded once, from the unsolved copy, because the manifest's `sourceId` for
 * the paper proper is the one a reviewer should open. The solved copy is the
 * authority for the two cases' mark schemes and is named where it is used.
 *
 * ## Marks
 *
 * Anatomy Q1–Q10 and Histology Q1–Q4 print their own marks. The two cases,
 * Anatomy Q11 and Q12, print none. Five marks each is the figure that makes the
 * paper add up: 12 × 5 in Anatomy + 4 × 4 in Histology + 10 MCQs at one mark +
 * 10 matching rows at one mark = 96, which is the total printed on the cover of
 * both 2022 ISK-101 papers in this same corpus. The 2022 first-round paper also
 * prints `(5 marks)` against its problem-solving question, which is the same
 * kind of item in the same kind of series. Recorded here rather than left
 * silent, because five is a reading and not something the paper says.
 *
 * ## Where the mark schemes come from
 *
 * Every `expects` line on Q1–Q10 and H1–H4 is from the department's own book,
 * `scripts/kasr/extract/deptbook.json`, at the chapter named in the seed's
 * `modulePath`. The two cases are marked from the solved copy's model answers,
 * filled out from the book's nerve-injury chapter where the model answer is
 * terser than the question. The granularity follows the department's July 2023
 * model answer in `scripts/kasr/extract/sittings.json`, which pays the name and
 * the mechanism as separate half-marks and joins alternatives within a point
 * with OR.
 *
 * Anatomy Q9, the anatomical snuff box, is the one place three sources in this
 * corpus disagree about the contents. The book carries the box in its Forearm
 * chapter rather than its Hand chapter, which is where `clusters.json` files
 * the objective; the faculty case bank (src_4ad2587114e7f1ba4811, upper-limb
 * case 10) and the 2025 EOY seed each list the contents differently again. The
 * book is followed and the disagreement recorded on the seed rather than
 * settled here.
 *
 * ## What this file does not carry
 *
 * The paper's Section 2 also prints ten multiple-choice questions at one mark
 * each (p8–p9) and two extended-matching tables at one mark each (p10). They
 * are printed in full — nothing is missing from the copy — but they belong to
 * the question-book pipeline under `seeds/mcq/101-ISK/`, not here. `incomplete` says
 * so, so the written batch cannot be read as the whole paper.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this paper is. */
export const SOURCE: SourceRef = {
  id: 'src_e2593cfba37af83a33ad',
  file: 'EOY (ISK - 101) 198 (1).pdf',
  sittingYear: 2024,
  tier: 'end_of_year',
  sections: ['Anatomy', 'Histology', 'Matching'],
  incomplete:
    'The paper is 96 marks; this file carries 77. Missing: the ten multiple-choice questions at one mark '
    + 'each (Section 2 part II, p9), which are transcribed in scripts/kasr/extract/eoy-mcq-read.json and '
    + 'belong to the multiple-choice bank rather than here; and Table 2 of the extended-matching section '
    + '(p10, 1 mark). '
    + 'Table 1 of that section IS seeded, as the matching question M1. '
    + 'Table 2 is not, and deliberately. It asks five blood and marrow items against seven options, and two '
    + 'of the seven are a second true statement about an item that already has one: the basophil answers both '
    + '"Have S-shaped nucleus" and "Release histamine and leukotrienes", and the monocyte answers both '
    + '"Have horse-shoe shaped nucleus" and "Have cytoplasm with frosted glass appearance" — this module\'s '
    + 'own monocyte concept states the kidney-shaped nucleus and the frosted-glass cytoplasm together. The '
    + 'department book deepens the problem rather than settling it: it gives "bilobed (horse-shoe shaped)" to '
    + 'the EOSINOPHIL, which is not in column A at all, and gives the monocyte a "kidney-shaped" nucleus. So '
    + 'the examiner\'s intended mapping cannot be recovered from a blank paper, and a matching question with '
    + 'an invented mark scheme is worse than none. It needs the answer key or a faculty reviewer.',
}


export const SEEDS: Seed[] = [
  {
    q: 1, section: 'Anatomy', page: 1, marks: 5,
    asked: 'Explain different parts and function of Deep fascia.',
    label: 'Deep fascia is one non-elastic collagen membrane that takes five different forms, each with its own job',
    key: 'deep-fascia-parts-functions',
    definition: 'Deep fascia is a non-elastic membrane of compact, regular collagen fibres, well defined in the limbs, very strong and thick in the palm and sole, and absent in the face and in the anterior abdominal wall. It appears as broad sheets around muscle groups, as intermuscular septa and interosseous membranes, as retinacula at the wrist and ankle, as the palmar and plantar aponeuroses, and as fibrous sheaths around great vessels such as the carotid sheath.',
    objective: 'Name the five parts deep fascia forms and give the function of each.',
    pitfall: 'Describing deep fascia as a wrapping only. Four of its five parts are structural specialisations — septa, retinacula, aponeuroses and vessel sheaths — and a question asking for parts and functions is asking for those.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Fascia',
    type: 'structural_description',
    aliases: ['Fascia profunda', 'Investing layer of deep fascia'],
    gaps: [
      'The book names internal fascia as a third kind of fascia and then does not describe it, so a student asked to contrast deep with internal fascia has nothing in the department text to answer from.',
    ],
  },
  {
    q: 2, section: 'Anatomy', page: 1, marks: 5,
    asked: 'Mention definition and types of Fibrous joints.',
    label: 'A fibrous joint is an immobile union by fibrous tissue, in three named types',
    key: 'fibrous-joints-types-definition',
    definition: 'A fibrous joint is a joint in which the bone surfaces are connected by fibrous tissue and which is fixed or immobile. There are three types: syndesmosis, where the bones are held by an interosseous ligament, as at the inferior tibio-fibular joint; gomphosis, where a tooth root is held in its socket by the periodontal ligament; and suture, where skull bones are held by a thin sutural ligament, obliterated in old age.',
    objective: 'Define a fibrous joint and name its three types with the ligament and example of each.',
    pitfall: 'Naming the three types without the connecting tissue. It is the named ligament — interosseous, periodontal, sutural — that distinguishes them, not the site alone.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
    type: 'classification',
    aliases: ['Synarthrosis'],
  },
  {
    q: 3, section: 'Anatomy', page: 1, marks: 5,
    asked: 'Mention the site and explain the results of Fertlization.',
    label: 'Fertilisation happens in the ampulla of the uterine tube and has four results',
    key: 'fertilization-site-mechanism-results',
    definition: 'Fertilisation is the process by which sperm and ovum unite to form a zygote, and it occurs in the ampullary part of the uterine tube, its lateral third. Its results are the formation of the zygote; determination of sex, male (XY) or female (XX), by the fertilising sperm; restoration of the diploid number of forty-six chromosomes; and the start of cleavage with migration from the site of fertilisation to implantation in the uterine cavity.',
    objective: 'State where fertilisation occurs and give the four results the department book lists.',
    pitfall: 'Saying the uterus. Fertilisation is tubal; the uterus is where the product of it implants, four days later.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
    type: 'developmental_process',
    aliases: ['Conception'],
    uncertainty: 'The paper prints "Fertlization". The misspelling is the paper\'s and is kept in `asked` unedited.',
  },
  {
    q: 4, section: 'Anatomy', page: 1, marks: 5,
    asked: 'Mention abnormal sites of Implantation.',
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
      'The department book carries abnormal sites of implantation in its Second Week chapter, while `clusters.json` places this objective under First Week of Development. The cluster path is used here so the key stays the one the corpus deduplicates on; the book chapter is the Second Week one.',
    ],
  },
  {
    q: 5, section: 'Anatomy', page: 2, marks: 5,
    asked: 'Explain Congenital anomalies of the Umbilical cord.',
    label: 'The cord goes wrong in its length, its contents, its vessels or its attachment',
    key: 'umbilical-cord-anomalies',
    definition: 'The congenital anomalies of the umbilical cord are: a short cord, which limits fetal movement and can separate the placenta prematurely during delivery; a long cord, which may encircle the fetal neck or form a true knot; congenital umbilical hernia (omphalocele), where the proximal cord contains intestinal loops because the intestine failed to return to the abdominal cavity; presence of only one umbilical artery from degeneration of the other; and abnormal attachment to the placenta — battledore, at the margin, or velamentous, through the amniotic membrane.',
    objective: 'Enumerate the congenital anomalies of the umbilical cord and give the consequence of each.',
    pitfall: 'Calling a false knot an anomaly. A false knot is a wider curve of an umbilical artery and the book says it causes no fetal stress; it is the true knot, in a long cord, that matters.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'clinical_correlation',
    aliases: ['Omphalocele', 'Single umbilical artery'],
    uncertainty: 'The paper prints its mark marker twice on this question — "{5 Marks}. {5 Marks}". It is one five-mark question; the duplication is a typesetting slip in the paper and appears in both the solved and the unsolved copy.',
  },
  {
    q: 6, section: 'Anatomy', page: 2, marks: 5,
    asked: 'Regarding Deltoid muscle, mention its attachment, nerve supply and action.',
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
    q: 7, section: 'Anatomy', page: 3, marks: 5,
    asked: 'Regarding Musculo-cutaneous nerve, mention its origin, root value and branches.',
    label: 'The musculocutaneous nerve leaves the lateral cord, pierces coracobrachialis, and ends as a skin nerve',
    key: 'musculocutaneous-nerve-origin-course-branches',
    definition: 'The musculocutaneous nerve arises in the axilla from the lateral cord of the brachial plexus, root value C5, C6, C7. It descends lateral to the third part of the axillary artery and the uppermost part of the brachial artery, pierces coracobrachialis, and runs obliquely between biceps and brachialis. Its branches are muscular, to coracobrachialis, biceps and brachialis; about one inch above the elbow it pierces the deep fascia at the lateral border of the biceps tendon and continues as the lateral cutaneous nerve of the forearm, which divides into anterior and posterior branches supplying the skin of the lateral forearm and the upper part of the ball of the thumb.',
    objective: 'State the origin and root value of the musculocutaneous nerve and list its muscular and cutaneous branches.',
    pitfall: 'Giving the root value as C5, C6. The book carries C7 as well, and dropping it changes which root lesions are predicted to weaken elbow flexion.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'structural_description',
    aliases: ['Lateral cutaneous nerve of the forearm'],
    conflicts: [
      'The book\'s own chapter note says the ILO promises the course and branches of the named nerves in the Nerve Supply chapter, but the musculocutaneous course is actually printed in the Arm chapter. The scheme here is taken from the Arm chapter; `clusters.json` files the objective under Nerve Supply, and that path is kept.',
    ],
  },
  {
    q: 8, section: 'Anatomy', page: 3, marks: 5,
    asked: 'Mention origin and end of the Brachial artery, and enumerate its branches.',
    label: 'The brachial artery runs the whole arm superficially, from teres major to the neck of the radius',
    key: 'brachial-artery-origin-course-end-branches',
    definition: 'The brachial artery begins at the lower border of teres major as the continuation of the axillary artery, descends on the medial side of the shaft of the humerus and then passes to the front of the arm midway between the epicondyles into the cubital fossa, ending one centimetre below the elbow joint at the level of the neck of the radius by dividing into the radial and ulnar arteries. It is superficial throughout, covered only by skin and fascia, and is accompanied by two venae comitantes. Its branches are the profunda brachii, the superior ulnar collateral, the inferior ulnar collateral, the nutrient artery to the humerus, muscular branches to biceps, brachialis and coracobrachialis, and the two terminal arteries.',
    objective: 'Give the beginning, the ending and the six groups of branches of the brachial artery.',
    pitfall: 'Ending it at the elbow joint. The book puts the division one centimetre below the joint, at the neck of the radius, which is why the artery is still one vessel where it is palpated in the cubital fossa.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Arm',
    type: 'structural_description',
    aliases: ['Arteria brachialis'],
  },
  {
    q: 9, section: 'Anatomy', page: 4, marks: 5,
    asked: 'Regarding Anatomical snuff box, mention its site and boundaries.',
    label: 'The anatomical snuff box is a hollow on the lateral wrist bounded by three thumb tendons',
    key: 'anatomical-snuff-box-site-boundaries-contents',
    definition: 'The anatomical snuff box is a triangular hollow at the lateral part of the dorsum of the wrist, clearly visible when the thumb is extended. It is bounded medially by the tendon of extensor pollicis longus and laterally by the tendons of abductor pollicis longus and extensor pollicis brevis. Its roof is skin, superficial fascia containing the beginning of the cephalic vein and the digital branches of the superficial radial nerve, and deep fascia; its floor is the styloid process of the radius, the scaphoid proximally and the trapezium distally. It contains the radial artery as it winds backwards round the lateral side of the wrist to the dorsum of the hand, where its pulsation can be felt, and the tendons of extensor carpi radialis longus and brevis cross its floor.',
    objective: 'Give the site of the anatomical snuff box, its two tendon boundaries and its bony floor.',
    pitfall: 'Making abductor pollicis longus and extensor pollicis brevis two separate boundaries. They form one boundary together; the opposite boundary is extensor pollicis longus alone.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Hand',
    type: 'structural_description',
    aliases: ['Snuffbox', 'Radial fossa of the wrist'],
    conflicts: [
      'Three readings of the contents are in this corpus. The department book puts the radial artery in the box and says the tendons of extensor carpi radialis longus and brevis cross its floor, with the beginning of the cephalic vein in the roof. The faculty case bank (src_4ad2587114e7f1ba4811, upper-limb case 10) lists both the radial artery and those two tendons as contents. The 2025 EOY seed lists the radial artery and the beginning of the cephalic vein. The book is followed here and the other two recorded.',
      'The seed key used to be `anatomical-snuff-box-boundaries-contents-floor-roof`, minted from the 2025 paper. `clusters.json` carries `anatomical-snuff-box-site-boundaries-contents` across nine askings, and that is the key used here.',
      '`clusters.json` files this objective under Upper Limb > Hand and that path is kept, but the department book carries the snuff box in its Forearm chapter, not its Hand chapter.',
    ],
  },
  {
    q: 10, section: 'Anatomy', page: 4, marks: 5,
    asked: 'Regarding the Sterno-clavicular joint, mention its type and articulating surfaces, and summarize its ligaments.',
    label: 'The sternoclavicular joint is a modified saddle joint held stable by four ligaments and a disc',
    key: 'sternoclavicular-joint-type-surfaces-ligaments',
    definition: 'The sterno-clavicular joint is a synovial joint of the modified saddle variety, between the clavicular notch of the manubrium sterni with the first costal cartilage on one side and the sternal end of the clavicle on the other. Its capsule surrounds it completely, thicker in front and behind and thin above and below. Its ligaments are the anterior and posterior sterno-clavicular ligaments; the interclavicular ligament, running from the upper aspect of one clavicle\'s sternal end to the other across the upper margin of the manubrium; and the costo-clavicular ligament, from the first costo-chondral junction to the impression on the lower surface of the medial end of the clavicle, which prevents excessive elevation and protraction of the clavicle. The joint is stable, its strength depending on its ligaments and its intra-articular disc.',
    objective: 'Classify the sterno-clavicular joint, name its articulating surfaces, and describe its four ligaments.',
    pitfall: 'Calling it a simple saddle joint and stopping. The book calls it a modified saddle joint and makes its stability turn on the ligaments and the intra-articular disc, not on the fit of the surfaces.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
    type: 'structural_description',
    aliases: ['SC joint'],
  },
  {
    q: 11, section: 'Anatomy', page: 5, marks: 5,
    asked: 'A 12 years old boy suffered from fracture middle of the shaft of the humerus following a car accident a) What nerve is liable to be injured? b) What movements would be affected following paralysis of these muscles? c) What is the name of the resulting deformity? d) Why this deformity is considered functionally disabling?',
    label: 'A fracture of the humeral shaft catches the radial nerve in the spiral groove and drops the wrist',
    key: 'radial-nerve-injury-spiral-groove-wrist-drop',
    definition: 'The radial nerve runs in the spiral groove on the back of the shaft of the humerus with the profunda brachii vessels, and a fracture of the shaft may injure it there. The result is wrist drop and finger drop from paralysis of all the extensors of the wrist and fingers, with impaired extension of the elbow against resistance from triceps affection and failure of supination of the extended forearm. The deformity is disabling because a firm grip is impossible while the wrist is flexed: the wrist extensors act as synergists for the long flexors of the fingers during a power grip.',
    objective: 'Explain why a fracture of the humeral shaft injures the radial nerve, name the resulting deformity, and say why it disables the hand.',
    pitfall: 'Treating wrist drop as a cosmetic deformity. The disability is the grip, because a flexed wrist puts the long finger flexors at a length at which they cannot generate force.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Wrist drop', 'Saturday night palsy'],
    uncertainty: 'Subpart (b) asks what movements would be affected "following paralysis of these muscles", but no muscles were named — subpart (a) asked for a nerve. The paper\'s own wording is inconsistent and is kept unedited; the solved copy answers it as the movements lost when that nerve is cut.',
  },
  {
    q: 12, section: 'Anatomy', page: 5, marks: 5,
    asked: 'A young student tried to commit suicide by cutting in front of his wrist with a blade. a) What vessels would be cut? b) Describe 2 points where you can apply pressure to stop the bleeding. c) What nerves would be injured? d) What is the expected neurological loss?',
    label: 'A cut across the front of the wrist takes both forearm arteries and both hand nerves',
    key: 'case-wrist-laceration-vessels-nerves',
    definition: 'A transverse cut in front of the wrist divides the radial and ulnar arteries, which lie superficially there, and the median and ulnar nerves with the palmar cutaneous branch of each. Bleeding is controlled by compressing the brachial artery against the humerus, on the medial side at the middle of the arm and again against the humerus at the lower part of the arm. The neurological loss is sensory over the palmar aspect of the hand and fingers, and motor over all the small muscles of the hand.',
    objective: 'Say which vessels and nerves a wrist laceration divides, where to compress to stop the bleeding, and what neurological loss follows.',
    pitfall: 'Answering the sensory loss only. Every intrinsic muscle of the hand is supplied by the median or the ulnar nerve, so a wrist cut costs all of them and the hand loses its fine function entirely.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Wrist laceration', 'Suicidal wrist cut'],
  },
  {
    q: 1, section: 'Histology', page: 6, marks: 4,
    asked: 'Regarding Golgi apparatus (G.A.), mention its site, stains and its L.M. Picture.',
    label: 'The Golgi apparatus is invisible in H&E and has to be silvered to be seen at all',
    key: 'golgi-apparatus-structure-function-staining',
    definition: 'The Golgi apparatus is a membranous organelle concerned with secretion, well developed in secretory cells and sited apically in them or perinuclearly in nerve cells. In haematoxylin and eosin it is not stained: it shows only as a pale unstained area beside the nucleus, the negative Golgi image. Silver impregnation demonstrates it as a network of brown granules and fibrils. By electron microscopy it is a stack of three to ten interconnected parallel flat curved saccules, with an entry (cis) face receiving transfer vesicles from the rough endoplasmic reticulum and an exit (trans) face budding secretory vesicles and lysosomes.',
    objective: 'Give the site of the Golgi apparatus, the stains that demonstrate it, and its light-microscopic appearance including the negative Golgi image.',
    pitfall: 'Reporting the negative Golgi image as an absent Golgi. The pale area beside the nucleus is the organelle; it is unstained because H&E does not take to it, and a silver preparation shows it is there.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structural_description',
    aliases: ['Golgi body', 'Golgi complex', 'G.A.'],
    gaps: [
      'The book\'s Golgi section carries its "Functions:" heading with the content entirely inside an unextractable figure, so the functions of the Golgi are not available as department text. This question asks only for site, stains and light-microscopic picture, all of which are in the text.',
    ],
  },
  {
    q: 2, section: 'Histology', page: 6, marks: 4,
    asked: 'Enumerate types of Ribosomes, and mention their E.M. picture and functions.',
    label: 'Ribosomes are free or attached, and which they are decides where the protein goes',
    key: 'ribosome-types-em-function',
    definition: 'Ribosomes are non-membranous particles of ribosomal RNA and protein. The rRNA forms in the nucleolus and the proteins in the cytoplasm; both unite in the nucleolus into a small and a large subunit which return to the cytoplasm and join only during protein synthesis. They are of two types: free ribosomes, single or as polyribosomes linked by messenger RNA in rosettes or spiral chains, which form proteins used within the cell such as glycolytic enzymes; and attached ribosomes, bound to the rough endoplasmic reticulum by their large subunit at the ribophorins, which form the proteins the cell secretes, such as enzymes and hormones. Ribosomes are what makes cytoplasm basophilic, because of the acidity of the phosphate group in RNA.',
    objective: 'Name the two types of ribosome, describe their electron-microscopic appearance, and give the different destination of the protein each makes.',
    pitfall: 'Treating free and attached ribosomes as different organelles. They are the same particle in two places, and the place is what determines whether the protein stays in the cell or leaves it.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structure_function_relationship',
    aliases: ['Polyribosome', 'Polysome'],
  },
  {
    q: 3, section: 'Histology', page: 7, marks: 4,
    asked: 'Compare between Unilocular and Multilocular fat cells according to the following table:',
    label: 'Unilocular and multilocular fat cells share an origin and differ in everything else',
    key: 'fat-cells-unilocular-vs-multilocular-comparison',
    definition: 'Both adipose cells arise from the undifferentiated mesenchymal cell. The unilocular fat cell forms white adipose connective tissue: it is large, fifty to a hundred and fifty micrometres, and oval, with fat stored as one large droplet containing dissolved carotenoids that displaces the cytoplasm and nucleus to the periphery, so that when H&E dissolves the fat the cell shows the signet ring appearance; Sudan III stains the droplet orange, and by electron microscopy it has abundant smooth endoplasmic reticulum, few mitochondria and one large electron-dense droplet. The multilocular fat cell forms brown adipose connective tissue: it is smaller, with multiple small droplets and no signet ring, a mostly eccentric round nucleus, brown pigmentation, less smooth endoplasmic reticulum and many mitochondria rich in cytochrome oxidase.',
    objective: 'Compare unilocular and multilocular fat cells by origin, the tissue each forms and their light-microscopic appearance.',
    pitfall: 'Reading the signet ring as an artefact to be ignored. It is the diagnostic light-microscopic appearance of the unilocular cell, and it exists because H&E dissolved the fat.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
    type: 'comparison',
    aliases: ['White adipose cell', 'Brown adipose cell', 'Adipocyte'],
    gaps: [
      'The paper\'s table asks for Origin, Site and L.M. The book gives the origin (both from the undifferentiated mesenchymal cell) and the light-microscopic pictures, and gives the "site" only as the tissue each cell forms — white adipose connective tissue against brown adipose connective tissue. It names no body sites for brown fat, so the Site row is answered at the level the book supports and no further.',
    ],
  },
  {
    q: 4, section: 'Histology', page: 7, marks: 4,
    asked: 'Regarding Monocyte, mention L.M., E.M. pictures and one function. a) L.M.: b) E.M.: c) Function:',
    label: 'The monocyte is the kidney-shaped nucleus with frosted-glass cytoplasm that becomes a macrophage',
    key: 'monocyte-lm-em-function',
    definition: 'The monocyte is a non-granular leucocyte, thirteen to twenty micrometres across and three to eight per cent of the white cells. On light microscopy it has a large, eccentric, kidney-shaped pale nucleus with one or two nucleoli, and non-granular pale basophilic cytoplasm with a frosted-glass appearance produced by its lysosomes, the azurophil granules. On electron microscopy the nucleus is euchromatic with a clear nucleolus and the cytoplasm shows pseudopodia, mitochondria, rough endoplasmic reticulum, a well developed Golgi and many primary and secondary lysosomes. It is highly phagocytic: it stays about three days in the blood, then enters connective tissue and becomes a macrophage, and it is an antigen-presenting cell and the precursor of the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone and the microglia of the central nervous system.',
    objective: 'Describe the monocyte on light and electron microscopy and give one of its functions.',
    pitfall: 'Calling the frosted-glass cytoplasm granular. The monocyte is a non-granular leucocyte; the appearance comes from lysosomes, which is why the electron microscope finds them and the light microscope finds only a texture.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
    type: 'structural_description',
    aliases: ['Mononuclear phagocyte', 'Macrophage precursor'],
  },
  {
    // Table 1 of the paper's extended-matching section, read off the page image.
    //
    // Four seeds share this question number, so it emits co-primary on all four
    // concepts. That is what a matching table is: five prompts, each a different
    // epithelium, and a student can know three of them and miss two. Filing it
    // under one concept would give the whole mark's mastery evidence to whichever
    // was picked and none to the rest.
    //
    // Marks are on the first seed only. The paper says "1 Mark each" for its two
    // tables, so this question is worth one, and giving each seed a mark would
    // make the paper total four marks heavier than it is.
    q: 1, section: 'Matching', page: 10, marks: 1,
    asked: 'III) Extended matching questions: {1 Mark each} — Table 1. Column A: 1 Simple squamous epithilium, 2 Keratinized stratified squamous epithilium, 3 Simple columnar epithilium, 4 Simple cubical epithlium, 5 Transitional epithilium. Column B: Small intestine, Thyroid follicles, Blood vessels, Skin, Trachea, Urinary bladder, Esophagus.',
    label:
      'Simple squamous epithelium is one layer of flat cells with flat nuclei, thin enough for exchange and smooth enough for movement, and it takes a different name in each site',
    key: 'simple-squamous-epithelium-sites-names-and-functions',
    // Copied verbatim from `101-ISK-mcq-concepts.md`, where this concept was
    // minted. Re-emitting it is an update that adds this sitting to its exam
    // signal and changes nothing else. A placeholder here would overwrite the
    // real definition on import — the silent field loss this importer exists
    // to prevent, and which I reintroduced by writing 'see the concept of the
    // same key' into a field the importer applies rather than reads.
    definition:
      'Simple squamous epithelium is one layer of flat cells with flat nuclei. Being thin, it allows exchange of materials — gas exchange in the lung alveoli and filtration in Bowman\'s capsule of the kidney; being smooth, it allows the easy passage of fluids and the easy movement of organs against one another. It takes a different name in each site: endothelium lining the blood vessels and the heart, pneumocytes in the lung alveoli, and mesothelium on the serous membranes — the pleura, the pericardium and the peritoneum.',
    objective:
      'Recognise simple squamous epithelium by its cells and nuclei, give its regional names, and connect its thinness and smoothness to what each site needs.',
    pitfall:
      'Swapping endothelium and mesothelium. Endo- is inside a vessel; meso- is the mesodermal lining of the serous sacs. Both are the same epithelium under two names, and half the questions on this material turn on which name goes where.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Epithelial Tissues > Surface Epithelium',
    type: 'structural_description',
  },
  {
    q: 1, section: 'Matching', page: 10, marks: 0,
    asked: 'Table 1, prompts 3 and 4.',
    label:
      'Simple cubical epithelium secretes and reabsorbs, simple columnar secretes and absorbs, and adding cilia makes the columnar cell transport fluid in one direction',
    key: 'simple-cubical-and-simple-columnar-epithelium-sites-and-functions',
    // Copied verbatim from `101-ISK-mcq-concepts.md`, where this concept was
    // minted. Re-emitting it is an update that adds this sitting to its exam
    // signal and changes nothing else. A placeholder here would overwrite the
    // real definition on import — the silent field loss this importer exists
    // to prevent, and which I reintroduced by writing 'see the concept of the
    // same key' into a field the importer applies rather than reads.
    definition:
      'Simple cubical epithelium is one layer of cube-shaped cells with central rounded nuclei; it secretes and reabsorbs, and it lines the secretory acini of glands, the thyroid follicles and the convoluted tubules of the kidney. Simple columnar epithelium is one layer of tall cells with basal oval nuclei; it secretes and absorbs along the digestive tract, from the stomach through the intestine, and its absorptive cells carry microvilli seen as a striated or brush border. Simple columnar ciliated epithelium adds cilia and so transports fluid or particles across the surface in one direction — upwards in the bronchioles, and along the uterus and fallopian tube to move the ovum.',
    objective:
      'Distinguish simple cubical from simple columnar epithelium by cell height, nuclear shape, site and function, and say what adding cilia changes.',
    pitfall:
      'Giving the kidney one answer. The convoluted tubules are simple cubical, but Bowman\'s capsule in the same nephron is simple squamous, because filtration needs thinness and reabsorption needs cytoplasm.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Epithelial Tissues > Surface Epithelium',
    type: 'structural_description',
  },
  {
    q: 1, section: 'Matching', page: 10, marks: 0,
    asked: 'Table 1, prompt 2.',
    label:
      'Stratified squamous epithelium is 5–30 layers built from columnar basal cells up to flat surface cells, held by desmosomes, and it is keratinised only in the skin',
    key: 'stratified-squamous-epithelium-keratinised-and-non-keratinised',
    // Copied verbatim from `101-ISK-mcq-concepts.md`, where this concept was
    // minted. Re-emitting it is an update that adds this sitting to its exam
    // signal and changes nothing else. A placeholder here would overwrite the
    // real definition on import — the silent field loss this importer exists
    // to prevent, and which I reintroduced by writing 'see the concept of the
    // same key' into a field the importer applies rather than reads.
    definition:
      'Stratified squamous epithelium is more than one layer and is named for the shape of its superficial cells. Its basal layer is columnar cells with basal oval nuclei; its intermediate layers are polyhedral cells with central rounded nuclei, joined by desmosomes and becoming smaller towards the surface; its superficial layer is flat cells with flat nuclei. It is 5–30 layers thick and its function is protection against friction. The non-keratinised form lines the oesophagus, oral cavity, cornea, anal canal, tip of the urethra and vagina. The keratinised form, covered by a layer of keratin, is the epidermis of the skin.',
    objective:
      'Describe the layers of stratified squamous epithelium from base to surface, give its layer count, and separate the keratinised sites from the non-keratinised ones.',
    pitfall:
      'Writing that the oesophagus is keratinised. Keratin is for a dry surface exposed to air; every moist lining in the list is non-keratinised, and the skin is the only keratinised member.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Epithelial Tissues > Surface Epithelium',
    type: 'structural_description',
  },
  {
    q: 1, section: 'Matching', page: 10, marks: 0,
    asked: 'Table 1, prompt 5.',
    label:
      'Transitional epithelium — urothelium — has dome-shaped superficial cells with rigid plaques, and it thins from 6–8 layers to 3–4 as the bladder fills',
    key: 'transitional-epithelium-dome-cells-and-a-changing-layer-count',
    // Copied verbatim from `101-ISK-mcq-concepts.md`, where this concept was
    // minted. Re-emitting it is an update that adds this sitting to its exam
    // signal and changes nothing else. A placeholder here would overwrite the
    // real definition on import — the silent field loss this importer exists
    // to prevent, and which I reintroduced by writing 'see the concept of the
    // same key' into a field the importer applies rather than reads.
    definition:
      'Transitional epithelium, also called urothelium, lines the whole urinary tract — the pelvis of the ureter, the ureter, the urinary bladder and the prostatic urethra — and nowhere else. Its basal layer is cuboidal cells with central rounded nuclei; its intermediate cells are polyhedral, and in the full bladder they are pushed laterally so that the epithelium thins; its superficial cells are large and dome-shaped with an upper convex surface, sometimes binucleated, joined by junctional complexes, and their luminal surface is covered by rigid plaques that act as a barrier. It is 6–8 layers in the empty bladder and 3–4 in the full one, and the superficial cells become flat when it fills. Its functions are distensibility and protection against the cytotoxic effect of urine.',
    objective:
      'Identify transitional epithelium by its dome-shaped superficial cells and changing layer count, give both counts, and state its two functions.',
    pitfall:
      'Calling it stratified squamous when it is distended. The superficial cells do flatten and the epithelium does thin to 3–4 layers, and it is still transitional — that it changes is exactly what defines it.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Epithelial Tissues > Surface Epithelium',
    type: 'structural_description',
  },
]

export const SCHEMES: Record<string, Scheme> = {
  M1: {
    format: 'matching',
    prompt: 'Match each epithelium in column A to the site in column B where it is found. Two options are not used.',
    expects: [
      'Simple squamous epithelium lines blood vessels, where it is called endothelium',
      'Keratinized stratified squamous epithelium covers the skin',
      'Simple columnar epithelium lines the small intestine',
      'Simple cubical epithelium lines the thyroid follicles',
      'Transitional epithelium lines the urinary bladder',
      'Trachea and oesophagus are the two options left over',
    ],
    options: [
      { letter: 'a', text: 'Small intestine' },
      { letter: 'b', text: 'Thyroid follicles' },
      { letter: 'c', text: 'Blood vessels' },
      { letter: 'd', text: 'Skin' },
      { letter: 'e', text: 'Trachea' },
      { letter: 'f', text: 'Urinary bladder' },
      { letter: 'g', text: 'Esophagus' },
    ],
    matches: [
      { prompt: 'Simple squamous epithilium', letter: 'c' },
      { prompt: 'Keratinized stratified squamous epithilium', letter: 'd' },
      { prompt: 'Simple columnar epithilium', letter: 'a' },
      { prompt: 'Simple cubical epithlium', letter: 'b' },
      { prompt: 'Transitional epithilium', letter: 'f' },
    ],
  },
  A1: {
    format: 'structured_written',
    prompt: 'Explain the different parts of the deep fascia and the function of each.',
    expects: [
      'Deep fascia is a non-elastic membrane formed of compact regular collagen fibres',
      'It forms broad sheets around groups of muscles',
      'Those sheets give muscle attachment, fix underlying structures in position and help venous return',
      'It forms intermuscular septa and interosseous membranes',
      'These separate muscle groups of different action and nerve supply, and increase the surface area for muscle attachment',
      'It forms retinacula — localised transverse thickened bands at the wrist and ankle',
      'The retinacula keep the tendons in position',
      'It forms the palmar aponeurosis in the palm and the plantar aponeurosis in the sole',
      'These are very thick strong layers protecting the underlying vessels, nerves and tendons',
      'It forms fibrous sheaths around big vessels, e.g. the carotid sheath around the common carotid artery, internal jugular vein and vagus',
    ],
  },
  A2: {
    format: 'structured_written',
    prompt: 'Define a fibrous joint and give its types.',
    expects: [
      'A fibrous joint is one in which the bone surfaces are connected by fibrous tissue',
      'Fibrous joints are fixed or immobile',
      'There are three types: syndesmosis, gomphosis and suture',
      'Syndesmosis: the bones are connected by an interosseous ligament, e.g. the inferior tibio-fibular joint',
      'Gomphosis: the roots of the teeth are connected to their sockets in the mandible and maxilla by the periodontal ligament',
      'Suture: skull bones are connected by a thin layer of fibrous tissue, the sutural ligament',
      'Sutures are obliterated in old age',
    ],
  },
  A3: {
    format: 'structured_written',
    prompt: 'Give the site of fertilisation and explain its results.',
    expects: [
      'Fertilisation is the process by which sperm and ovum unite to form a zygote',
      'It occurs in the ampullary part of the uterine tube, its lateral third',
      'Result: formation of the zygote',
      'Result: determination of sex — male (XY) or female (XX) according to the type of fertilising sperm',
      'Result: restoration of the diploid chromosome number, 46 from 23 and 23',
      'Result: the start of cleavage',
      'Result: migration from the site of fertilisation to implantation in the uterine cavity',
    ],
  },
  A4: {
    format: 'structured_written',
    prompt: 'Mention the abnormal sites of implantation.',
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
  A5: {
    format: 'structured_written',
    prompt: 'Explain the congenital anomalies of the umbilical cord.',
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
  A6: {
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
      'Middle fibres abduct the arm through the middle range — from 15 to 90 degrees',
    ],
  },
  A7: {
    format: 'structured_written',
    prompt: 'Give the origin, root value and branches of the musculocutaneous nerve.',
    expects: [
      'It arises in the axilla from the lateral cord of the brachial plexus',
      'Root value C5, C6, C7',
      'It descends lateral to the third part of the axillary artery and the uppermost part of the brachial artery',
      'It pierces coracobrachialis and descends obliquely between biceps and brachialis',
      'Muscular branches to coracobrachialis, biceps and brachialis',
      'About one inch above the elbow it pierces the deep fascia at the lateral border of the biceps tendon',
      'It continues as the lateral cutaneous nerve of the forearm',
      'That nerve divides into anterior and posterior branches supplying the skin of the lateral side of the forearm and the upper part of the ball of the thumb',
    ],
  },
  A8: {
    format: 'structured_written',
    prompt: 'Give the origin and the ending of the brachial artery and enumerate its branches.',
    expects: [
      'It begins at the lower border of teres major as the continuation of the axillary artery',
      'It descends on the medial side of the shaft of the humerus, then passes to the front of the arm midway between the epicondyles into the cubital fossa',
      'It ends 1 cm below the elbow joint, at the level of the neck of the radius',
      'It ends by dividing into the radial and ulnar arteries',
      'Branch: the profunda brachii — the largest and highest, arising just below the lower border of teres major',
      'Branch: the superior ulnar collateral artery, arising about the middle of the arm opposite the insertion of coracobrachialis',
      'Branch: the inferior ulnar collateral artery, arising about 5 cm above the elbow joint',
      'Branch: the nutrient artery to the humerus',
      'Branch: muscular branches to biceps, brachialis and coracobrachialis',
      'Terminal branches: the radial and ulnar arteries',
    ],
  },
  A9: {
    format: 'structured_written',
    prompt: 'Give the site and the boundaries of the anatomical snuff box.',
    expects: [
      'Site: a triangular hollow at the lateral part of the dorsum of the wrist',
      'It is clearly visible when the thumb is extended',
      'Bounded medially by the tendon of extensor pollicis longus',
      'Bounded laterally by the tendons of abductor pollicis longus and extensor pollicis brevis',
      'Floor: the styloid process of the radius, the scaphoid proximally and the trapezium distally',
      'Roof: skin, superficial fascia containing the beginning of the cephalic vein and digital branches of the superficial radial nerve, and deep fascia',
      'It contains the radial artery, whose pulsation can be felt there as it crosses to the dorsum of the hand',
    ],
  },
  A10: {
    format: 'structured_written',
    prompt: 'Give the type of the sterno-clavicular joint and its articulating surfaces, and summarise its ligaments.',
    expects: [
      'A synovial joint of the modified saddle variety',
      'Between the clavicular notch of the manubrium sterni with the first costal cartilage',
      'And the sternal end of the clavicle',
      'The capsule surrounds it completely, thicker in front and behind and thin above and below',
      'Ligament: the anterior sterno-clavicular ligament',
      'Ligament: the posterior sterno-clavicular ligament',
      'Ligament: the interclavicular ligament, from the upper aspect of the sternal end of one clavicle to the other, attached across the upper margin of the manubrium',
      'Ligament: the costo-clavicular ligament, from the upper aspect of the 1st costo-chondral junction to the impression on the lower surface of the medial end of the clavicle',
      'The costo-clavicular ligament prevents excessive elevation and protraction of the clavicle — the same function as subclavius, which acts as a dynamic ligament',
      'The joint is stable, its strength depending on its ligaments and its intra-articular disc',
    ],
  },
  A11: {
    format: 'multipart_written',
    prompt: 'A 12-year-old boy suffered a fracture of the middle of the shaft of the humerus following a car accident.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What nerve is liable to be injured?',
        expects: [
          'The radial nerve',
          'It lies in the spiral groove on the back of the shaft of the humerus, with the profunda brachii vessels',
        ],
      },
      {
        letter: 'b',
        prompt: 'What movements would be affected following paralysis of these muscles?',
        expects: [
          'Weak extension of the elbow, from affection of triceps',
          'Loss of extension of the wrist',
          'Loss of extension of the metacarpophalangeal joints — finger drop',
          'Failure of supination of the extended forearm',
        ],
      },
      {
        letter: 'c',
        prompt: 'What is the name of the resulting deformity?',
        expects: [
          'Wrist drop',
        ],
      },
      {
        letter: 'd',
        prompt: 'Why is this deformity considered functionally disabling?',
        expects: [
          'It affects the power of the hand grip',
          'The wrist extensors act as synergists for the long flexors of the fingers during a power grip',
          'A firm grip is impossible while the wrist is flexed',
        ],
      },
    ],
  },
  A12: {
    format: 'multipart_written',
    prompt: 'A young student tried to commit suicide by cutting in front of his wrist with a blade.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What vessels would be cut?',
        expects: [
          'The radial artery',
          'The ulnar artery',
        ],
      },
      {
        letter: 'b',
        prompt: 'Describe 2 points where you can apply pressure to stop the bleeding.',
        expects: [
          'The brachial artery compressed against the humerus at the medial side of the middle of the arm',
          'The brachial artery compressed against the humerus at the lower part of the arm',
          'The brachial artery is superficial throughout its course, covered only by skin and fascia, which is what makes compression possible',
        ],
      },
      {
        letter: 'c',
        prompt: 'What nerves would be injured?',
        expects: [
          'The ulnar nerve',
          'The median nerve',
          'The palmar cutaneous branch of the ulnar nerve',
          'The palmar cutaneous branch of the median nerve',
        ],
      },
      {
        letter: 'd',
        prompt: 'What is the expected neurological loss?',
        expects: [
          'Sensory: loss of sensation over the palmar aspect of the hand and fingers',
          'The ulnar supplies the medial third of the palm and the medial one and a half fingers; the median the lateral two-thirds and the lateral three and a half',
          'Motor: loss involving all the small muscles of the hand',
        ],
      },
    ],
  },
  H1: {
    format: 'structured_written',
    prompt: 'Give the site of the Golgi apparatus, the stains used for it, and its light-microscopic picture.',
    expects: [
      'Site: well developed in secretory cells',
      'Site: apical in secretory cells, OR perinuclear as in nerve cells',
      'Stains: it is not stained by H&E',
      'Stains: silver demonstrates it',
      'L.M. with H&E: it appears only as a pale unstained area near the nucleus — the negative Golgi image',
      'L.M. with silver: a network of brown granules and fibrils',
    ],
  },
  H2: {
    format: 'structured_written',
    prompt: 'Enumerate the types of ribosome and give their electron-microscopic picture and their functions.',
    expects: [
      'Type: free ribosomes — single, OR as polyribosomes linked by mRNA in rosettes or spiral chains',
      'Type: attached ribosomes, bound to the rough endoplasmic reticulum',
      'E.M.: non-membranous particles formed of rRNA and protein',
      'E.M.: each is a small and a large subunit, which join only during protein synthesis',
      'E.M.: attached ribosomes are bound to the rER by their large subunit, at the ribophorins',
      'Function: free ribosomes form proteins used within the cell, such as glycolytic enzymes',
      'Function: attached ribosomes form the proteins the cell secretes, such as enzymes and hormones',
      'Ribosomes cause cytoplasmic basophilia, because of the acidity of the phosphate group in RNA',
    ],
  },
  H3: {
    format: 'comparison_table',
    prompt: 'Compare unilocular and multilocular fat cells by origin, site and light-microscopic appearance.',
    expects: [
      'Origin: both arise from the undifferentiated mesenchymal cell (UMC)',
      'Site: the unilocular cell forms white adipose connective tissue',
      'Site: the multilocular cell forms brown adipose connective tissue',
      'L.M. unilocular: large (50–150 µm) and oval, with fat stored as one large droplet',
      'L.M. unilocular: the droplet displaces the cytoplasm and nucleus to the periphery, giving the signet ring appearance after H&E dissolves the fat',
      'L.M. unilocular: Sudan III stains the droplet orange',
      'L.M. multilocular: smaller, with multiple small droplets and no signet ring appearance',
      'L.M. multilocular: a mostly eccentric round nucleus, and brown pigmentation',
    ],
  },
  H4: {
    format: 'structured_written',
    prompt: 'Give the light-microscopic and electron-microscopic pictures of the monocyte and one of its functions.',
    expects: [
      'L.M.: a large, eccentric, kidney-shaped pale nucleus with one or two nucleoli',
      'L.M.: non-granular pale basophilic cytoplasm with a frosted-glass appearance, due to its lysosomes (azurophil granules)',
      'E.M.: the nucleus is euchromatic with a clear nucleolus',
      'E.M.: the cytoplasm shows pseudopodia, mitochondria, rER, a well developed Golgi and many primary and secondary lysosomes',
      'Function: it is highly phagocytic — it leaves the blood, enters connective tissue and becomes a macrophage that phagocytoses bacteria and debris',
      'Function (alternative): it is an antigen-presenting cell',
      'Function (alternative): it is the precursor of the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone OR the microglia of the CNS',
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
