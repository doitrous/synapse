/**
 * The May 2024 Baqoon (third-round resit) paper for 101 ISK, as data.
 *
 * `ISK 101 باقون MAY 2024` — sixteen written questions in three printed
 * sections: ten in Anatomy, two Cases, four in Histology. The paper's own last
 * line reads “+ including MCQ and Matching”, so the sitting also carried
 * multiple-choice and matching items; the document does not reproduce them and
 * they are left for the MCQ pipeline rather than forced into a written seed.
 *
 * Why this is the only end-of-module/resit file in this batch
 * ----------------------------------------------------------
 * Nine files were assigned. Eight of them hold no written questions at all, so
 * they yield no `Paper`. Each was opened and read, not inferred from OCR:
 *
 *   EOM ISK End 101 — 2022.pdf              (src_a54bbf7a625ba2b172fc)
 *   EOM ISK 101 - 2023.pdf                  (src_ce4292e31edea7517e7b)
 *     One sitting, not two. Both print the same cover: “Module Code: ISK-101 /
 *     End of Module Exam / Date: 10/12/2022 / Time allowed: 120 minutes /
 *     Total Marks: 72 marks / Number of pages: 11”, and the same Q1 (“The
 *     following cell stained metachromatically with toluidine blue is:”). The
 *     file named 2023 is the clean copy; the file named 2022 is the same paper
 *     with the answers highlighted. The manifest's 2023 is filename-derived and
 *     the paper itself says 2022.
 *
 *   EOM ISK 101 195 Answers.pdf             (src_9e6aad6c6af097e473d6)
 *   EOM ISK End 101– 2021 (answers).pdf     (src_17bf088a37f1ab6540a3)
 *     Likewise one sitting: both print “ISK-101 / End of Module Exam / Date:
 *     18/12/2021 / 120 minutes / 72 marks / 11 pages” and the same Q1
 *     (“Storage, packaging and chemical modification of proteins occur in:”).
 *     The 195 file is clean; the 2021 file is the same paper highlighted.
 *
 *   Both of those sittings, and EOM ISK EOM exam 2024.pdf
 *   (src_16f747e1171423933757, dated 5/12/2024), print the same instruction in
 *   a box under the cover: “The exam consists of 120 MCQs to be answered in the
 *   bubble sheet”. 120 items at 0.6 marks is the whole 72, so there is no
 *   written section for the marks to hide in. Confirmed to the last page.
 *
 *   EOM first 2021 101 INT end of module.pdf (src_9487fd713153c573087f)
 *     Cover reads INT-101, End Module Exam, 24/12/2020, 48 MCQs, 24 marks,
 *     6 pages. A different sitting again — and again entirely multiple choice.
 *
 *   Anatomy Formative Assessment [Upper Limb].pdf (src_415d10984252678d4a7a)
 *     Ten pages of five-option multiple choice with the answers ringed by hand,
 *     plus an appended “LYMPHATIC SYSTEM MCQS” sheet. No written question.
 *
 *   EOY BAQOON 197 mcq&match 101 (1).pdf     (src_d2867e081b0590fcee47)
 *     Photographed fragments of “Section B: Multiple Choices questions (½ mark
 *     for each question)” and “Section C: Extended matching questions (½ mark
 *     for each question)”. Section A is not among the pages. Nothing written.
 *
 * So: nine files, five distinct sittings, one written paper — this one.
 *
 * What this document is, and what that costs
 * ------------------------------------------
 * This is a student recall compilation of the sat paper, not the examiner's own
 * script. It reproduces each question as a heading and pastes the department's
 * own answer beneath it — tables and figures lifted from the department book —
 * which is why every `expects` line below can be traced. The two cases are
 * printed with their model answers spelled out a–e.
 *
 * It prints no marks anywhere. Rather than invent a split, every seed carries
 * the same `marks: 5`: a uniform placeholder that weights no question above
 * another. It is not the examiner's figure, and the totals the generators
 * derive from it — the paper total, `exam_relevance`, `estimated_seconds` —
 * are placeholders too. A reviewer with the real script should overwrite them.
 *
 * The cases keep the numbers the document prints for them (6 and 10) rather
 * than being renumbered 1 and 2, and sit in their own printed section, Cases,
 * so `C6` and `C10` cannot collide with Anatomy `A6` and `A10`.
 *
 * Concept keys are `clusters.json` keys, verbatim, for all sixteen questions —
 * none minted. Note that four of them name the same objectives the 2025
 * end-of-year file reaches under keys of its own (`anatomical-snuff-box-…`
 * differs between the two, for one), so those objectives will mint two concepts
 * until the keys are reconciled. Flagged rather than silently harmonised: the
 * 2025 file is outside this batch's scope.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this paper is. */
export const SOURCE: SourceRef = {
  id: 'src_530685004e73e670a4ed',
  file: 'EOY BAQOON 197 101 FINAL - BAKOON 2024 الدور الثالث  (1).pdf',
  sittingYear: 2024,
  tier: 'resit',
  sections: ['Anatomy', 'Cases', 'Histology'],
}

/** The paper prints no marks. Uniform, deliberately — see the file header. */
const M = 5

export const SEEDS: Seed[] = [
  {
    q: 1, section: 'Anatomy', page: 1, marks: M,
    asked: 'Boundaries and contents of intermuscular spaces',
    label: 'The quadrangular and two triangular spaces below the shoulder each have set boundaries and their own contents',
    key: 'intermuscular-spaces-quadrangular-triangular-boundaries-contents',
    definition: 'Three intermuscular spaces lie just below the shoulder joint. The quadrangular space, laterally, is bounded above by teres minor behind and subscapularis in front, below by teres major, medially by the long head of triceps and laterally by the surgical neck of the humerus; it transmits the posterior circumflex humeral vessels and the axillary (circumflex) nerve. The upper triangular space, medially, has the same upper and lower boundaries with the long head of triceps laterally, and transmits only the circumflex scapular artery. The lower triangular space (triangular interval) lies lateral to the long head of triceps, bounded above by teres major and laterally by the lateral head of triceps and the shaft of the humerus, and transmits the radial nerve and the profunda brachii vessels.',
    objective: 'Give the boundaries and contents of the quadrangular, upper triangular and lower triangular spaces.',
    pitfall: 'Treating the long head of triceps as one boundary throughout. It is the medial boundary of the quadrangular space and the lateral boundary of the upper triangular space — which side of it a structure lies on is what separates the axillary nerve from the circumflex scapular artery.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
    type: 'structural_description',
    aliases: ['Quadrangular space', 'Triangular interval', 'Spaces below the shoulder joint'],
  },
  {
    q: 2, section: 'Anatomy', page: 1, marks: M,
    asked: 'Superficial palmar arch and deep palmar arch compare (site, formation, branches)',
    label: 'The superficial palmar arch is mainly ulnar and distal; the deep arch is mainly radial and proximal',
    key: 'palmar-arterial-arches-site-formation-branches',
    definition: 'The superficial palmar arch lies between the palmar aponeurosis and the flexor tendons, crossing at the midshaft of the metacarpals; it is formed mainly by the ulnar artery and completed by the superficial palmar branch of the radial artery, and gives three common palmar digital arteries and a palmar digital artery to the medial side of the little finger. The deep palmar arch lies deep to the flexor tendons, just distal to the bases of the metacarpals and about half an inch proximal to the superficial arch; it is formed mainly by the radial artery and completed by the deep palmar branch of the ulnar artery, and gives three palmar metacarpal arteries, three perforating branches to the dorsal metacarpal arteries, and recurrent branches to the anterior carpal arch.',
    objective: 'Compare the superficial and deep palmar arches by site, formation and branches.',
    pitfall: 'Swapping which artery mainly forms which. The superficial arch is the ulnar artery completed by the radial; the deep arch is the radial completed by the ulnar — and the superficial one is the distal of the two.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Hand',
    type: 'structural_description',
    aliases: ['Arterial arches of the hand'],
    conflicts: [
      'This paper’s answer places the superficial arch half an inch distal to the deep arch; the department book (Hand) states one centimetre. Both are recorded; neither is corrected.',
      'Key collision: clusters.json puts the 2025 end-of-year question “Describe site, formation and branches of the Deep Palmer Arch” in this same cluster, but 101-eoy-2025.ts keys it `deep-palmar-arch-site-formation-branches`. Until the two keys are reconciled the build mints two concepts for one objective and neither carries the other’s occurrence.',
    ],
  },
  {
    q: 3, section: 'Anatomy', page: 1, marks: M,
    asked: 'Extensor retinaculum (boundaries and compartments)',
    label: 'The extensor retinaculum is anchored to radius and to pisiform and triquetral, and its septa make six tendon compartments',
    key: 'extensor-retinaculum-attachments-compartments',
    definition: 'The extensor retinaculum is a thick band of the deep fascia of the forearm lying obliquely across the back of the wrist, attached laterally to the anterior border of the lower end of the radius and medially to the pisiform and the triquetral. Five septa passing to ridges on the back of the lower end of the radius divide the space beneath it into six compartments, holding from lateral to medial: abductor pollicis longus with extensor pollicis brevis; extensor carpi radialis longus and brevis; extensor pollicis longus; the tendons of extensor digitorum and extensor indicis with the posterior interosseous nerve and anterior interosseous artery; extensor digiti minimi; and extensor carpi ulnaris.',
    objective: 'Give the attachments of the extensor retinaculum and name the contents of each of its six compartments in order.',
    pitfall: 'Losing the order by naming the compartments from a list of tendons rather than from Lister’s tubercle. The second compartment lies lateral to the tubercle and the third medial to it, which is what fixes the sequence.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > Upper Limb > Forearm',
    type: 'structural_description',
  },
  {
    q: 4, section: 'Anatomy', page: 2, marks: M,
    asked: 'Cutaneous nerves of arm region (origin, supply)',
    label: 'The skin of the arm is supplied in named strips from the radial nerve, the medial cord and the axillary nerve',
    key: 'upper-limb-cutaneous-nerve-supply',
    definition: 'The back of the arm is supplied by the posterior cutaneous nerve of the arm from the radial nerve. The medial side is supplied above by the intercostobrachial nerve, the lateral cutaneous branch of the second intercostal nerve, which also covers the floor of the axilla, and below by the medial cutaneous nerve of the arm from the medial cord. The lateral side is supplied over the upper half of the deltoid by the lateral supraclavicular nerve from C3 and C4, over the lower half of the deltoid by the upper lateral cutaneous nerve of the arm from the posterior branch of the axillary nerve, and over the lower lateral arm by the lower lateral cutaneous nerve of the arm from the radial nerve in the spiral groove.',
    objective: 'Name the cutaneous nerves of the shoulder region, axilla and arm, and give the origin and territory of each.',
    pitfall: 'Assuming the skin over the deltoid has one nerve. Its upper half is supraclavicular, from the cervical plexus, and only its lower half is axillary — which is why the sensory loss of an axillary lesion is a patch, not the whole shoulder.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'structural_description',
    aliases: ['Cutaneous nerves of the arm'],
  },
  {
    q: 5, section: 'Anatomy', page: 2, marks: M,
    asked: 'Nerve supply and action of muscles producing abduction of shoulder girdle (more than 90)',
    label: 'Beyond ninety degrees the scapula rotates, by trapezius and serratus anterior',
    key: 'scapular-rotation-abduction-beyond-90-muscles',
    definition: 'Abduction of the arm beyond about ninety degrees cannot happen at the shoulder joint, because the greater tuberosity meets the coraco-acromial ligament; the arm is raised further by the scapula rotating on the chest wall so the glenoid cavity faces upwards. That rotation is produced by the upper and lower fibres of trapezius, supplied motor by the spinal root of the accessory nerve with sensory C3 and C4, acting with the lower five digitations of serratus anterior, supplied by the nerve to serratus anterior (long thoracic nerve, nerve of Bell). Serratus anterior is also the powerful protractor of the scapula and fixes it against the chest wall, so its paralysis wings the scapula.',
    objective: 'Name the muscles that rotate the scapula to carry abduction beyond ninety degrees, and give the nerve supply and action of each.',
    pitfall: 'Answering with deltoid and supraspinatus. Those carry abduction to ninety degrees; past it the question is about the shoulder girdle, and the answer is trapezius and serratus anterior.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
    type: 'structure_function_relationship',
    aliases: ['Upward rotation of the scapula'],
  },
  {
    q: 6, section: 'Anatomy', page: 3, marks: M,
    asked: 'Supination and pronation (def, axis, muscles producing)',
    label: 'Supination and pronation turn the radius about an axis from its head to the head of the ulna',
    key: 'supination-pronation-muscles-attachments-nerve',
    definition: 'Supination is lateral rotation of the forearm and pronation medial rotation, both taking place at the superior and inferior radio-ulnar joints about a vertical axis running from the centre of the head of the radius above to the head of the ulna below, at the attachment of the apex of the articular disc. In supination the radius and ulna lie parallel, the palm faces forwards, the thumb points laterally and the interosseous membrane is tense; in pronation the shaft of the radius crosses in front of the ulna, the palm faces backwards, the thumb points medially and the membrane is lax. Biceps supinates when the elbow is flexed and supinator when it is extended; pronator teres and pronator quadratus pronate; brachioradialis brings the forearm to the mid-prone position.',
    objective: 'Define supination and pronation, give the joints and the axis of the movement, and name the muscles producing each.',
    pitfall: 'Placing the axis through the middle of the forearm. It runs from the head of the radius to the head of the ulna, which is why it is the radius that swings and the ulna that stays.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Forearm',
    type: 'structure_function_relationship',
  },
  {
    q: 7, section: 'Anatomy', page: 3, marks: M,
    asked: 'Mechanism of fertilization',
    label: 'Fertilization runs from capacitation through three phases of penetration to fusion of the two pronuclei',
    key: 'fertilization-site-mechanism-results',
    definition: 'Fertilization begins with capacitation, the removal of the glycoprotein coat from the acrosomal region of the sperm in the female tract, taking about seven hours. Phase I is dispersion of the corona radiata by the three to five hundred sperms that reach the ovum. Phase II is penetration of the zona pellucida: the sperm binds to zona receptors and its acrosomal enzymes dissolve a path for one sperm. Phase III is fusion of the plasma membranes of sperm and oocyte, the sperm contents passing in and the sperm membrane staying outside. The cortical and zona reaction then prevents polyspermy; the secondary oocyte completes the second meiotic division, producing the mature ovum and the second polar body; and the male and female pronuclei fuse to form the nucleus of the zygote.',
    objective: 'Describe the mechanism of fertilization from capacitation through the three phases of penetration to formation of the zygote nucleus.',
    pitfall: 'Treating the block to polyspermy as mechanical. It is the cortical and zona reaction — lysosomal enzymes from the cortical granules altering the zona receptors — not the zona simply being thick.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
    type: 'developmental_process',
  },
  {
    q: 8, section: 'Anatomy', page: 3, marks: M,
    asked: 'Analomies of placenta (regarding attachment of cord, abnormal sites of implantaion)',
    label: 'Placental anomalies are of position, shape, number and cord attachment',
    key: 'placenta-anomalies',
    definition: 'Anomalies of the placenta are grouped by position, by shape, by number and by the attachment of the umbilical cord. In position, implantation in the lower uterine segment gives placenta praevia, which this paper grades as parietalis, where the margin lies above the internal os, marginalis, where the margin covers it, and centralis, where the central part covers it. In shape the placenta may be bilobed or trilobed. In number there may be a twin placenta, two placentae with two cords, or an accessory placenta accompanying the main one. In cord attachment, a velamentous placenta has the cord attached through the membranes and a battledore placenta has it attached at the margin.',
    objective: 'Group the anomalies of the placenta by position, shape, number and cord attachment, and name an example of each.',
    pitfall: 'Confusing velamentous with battledore. Velamentous means the cord runs in through the membranes before reaching the placenta; battledore means it reaches the placenta but at its edge.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'classification',
    aliases: ['Congenital anomalies of the placenta'],
    conflicts: [
      'This paper’s answer grades placenta praevia as parietalis, marginalis and centralis. The department book (Second Week of Development) grades it complete/total, partial and marginal, and adds low-lying placenta. The two namings are not reconciled here.',
    ],
    gaps: [
      'The paper’s answer does not cover the book’s further groups — anomalies of diameter (placenta membranacea) and of infiltration (accreta, increta, percreta) — so a full mark scheme for this question is not established by either source alone.',
    ],
  },
  {
    q: 9, section: 'Anatomy', page: 4, marks: M,
    asked: 'Chorionic villi types and fate',
    label: 'Chorionic villi run primary to secondary to tertiary, and the chorion that carries them splits into frondosum and laeve',
    key: 'chorionic-villi-types-development',
    definition: 'Chorionic villi are projections of the chorion that begin at the end of the second week and develop through the third. A primary villus is a core of proliferating cytotrophoblast pushing the syncytiotrophoblast; it becomes a secondary villus when somatic extra-embryonic mesoderm enters the core, and a tertiary villus when fetal blood vessels appear in that mesoderm, the villi then separated by intervillous spaces full of maternal blood. A tertiary villus has a stem (anchoring) part running between chorion and decidua basalis and free (floating) side branches where exchange happens. The chorion carrying well-developed villi is the chorion frondosum, which persists as the fetal part of the placenta; the rest is chorion laeve, whose villi degenerate.',
    objective: 'Name the three types of chorionic villus and what changes between them, and give the fate of chorion frondosum and chorion laeve.',
    pitfall: 'Calling a villus tertiary as soon as it has a mesodermal core. Mesoderm alone makes it secondary; it is tertiary only once vessels have formed in that mesoderm.',
    subject: 'dev', primary: 'DIS-EMB-T02', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
    type: 'developmental_process',
    aliases: ['Chorion frondosum and chorion laeve'],
  },
  {
    q: 10, section: 'Anatomy', page: 4, marks: M,
    asked: 'Functions of deep fascia',
    label: 'Deep fascia works by what it forms — sheets, septa, retinacula, aponeuroses and vascular sheaths',
    key: 'deep-fascia-parts-functions',
    definition: 'Deep fascia is an inelastic membrane of compact regular collagen fibres, well defined in the limbs and absent in the face and the anterior abdominal wall. It forms broad sheets around groups of muscles, which fix underlying structures in position, give attachment to muscles and help venous return; intermuscular septa and interosseous membranes, which separate muscle groups of different action and nerve supply and add surface for attachment; retinacula, thickened transverse bands at wrist and ankle that hold the tendons in place; the palmar and plantar aponeuroses, thick layers protecting the vessels, nerves and tendons beneath; and fibrous sheaths around large vessels, such as the carotid sheath around the carotid arteries, internal jugular vein and vagus nerve.',
    objective: 'List the functions of deep fascia by naming the structures it forms and what each achieves.',
    pitfall: 'Answering with the functions of superficial fascia — insulation, smoothing the contour, carrying vessels to the skin. Those belong to the other layer, and deep fascia is where the question is.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Fascia',
    type: 'structure_function_relationship',
  },
  {
    q: 6, section: 'Cases', page: 5, marks: M,
    asked: '6) A 45 years old woman was admitted to hospital with dislocation of her right shoulder. a. What nerve is endangered by this dislocation? b. What are the muscles supplied by this nerve? c. What movements would be affected if this nerve was injured? d. What would be the deformity resulting from this paralysis? e. Where would be the skin sensory loss resulting from such an injury?',
    label: 'Shoulder dislocation endangers the axillary nerve, costing deltoid and teres minor',
    key: 'axillary-nerve-injury-shoulder-dislocation',
    definition: 'The axillary (circumflex) nerve, C5 and C6, winds round the surgical neck of the humerus through the quadrangular space, where dislocation of the shoulder, fracture of the surgical neck and crutch pressure all endanger it. It supplies deltoid and teres minor. Its injury loses abduction of the shoulder through the range deltoid provides, from fifteen to ninety degrees, flattens the rounded contour of the shoulder as deltoid wastes, and numbs a patch of skin over the lower half of the deltoid.',
    objective: 'Name the nerve endangered by shoulder dislocation, the muscles it supplies, and the movement, deformity and sensory loss its injury produces.',
    pitfall: 'Reporting total loss of abduction. Supraspinatus still initiates the first fifteen degrees and the scapular rotators still act above ninety; it is the middle range that goes.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
    type: 'clinical_correlation',
    aliases: ['Circumflex nerve injury', 'Flat shoulder'],
  },
  {
    q: 10, section: 'Cases', page: 5, marks: M,
    asked: '10) A 30 years old woman fell on her outstretched hand. She suffered from severe pain in the lateral part of the wrist particularly at the base of the anatomical snuff box. a. What is the expected diagnosis? b. What are the boundaries of the anatomical snuff box? c. What are the contents of the anatomical snuff box? d. What makes the floor of the anatomical snuff box? e. What makes the roof of the anatomical snuff box?',
    label: 'The snuff box is floored by the scaphoid, so tenderness in it after a fall means a scaphoid fracture',
    key: 'anatomical-snuff-box-site-boundaries-contents',
    definition: 'The anatomical snuff box is a triangular hollow at the lateral part of the back of the wrist, seen when the thumb is extended. It is bounded medially by the tendon of extensor pollicis longus and laterally by the tendons of abductor pollicis longus and extensor pollicis brevis. Its floor is the styloid process of the radius with the scaphoid proximally and the trapezium distally, crossed by the tendons of extensor carpi radialis longus and brevis. Its roof is skin and superficial fascia carrying the beginning of the cephalic vein and branches of the superficial radial nerve. It contains the radial artery, whose pulsation is felt there — and because the scaphoid floors it, tenderness in the box after a fall on the outstretched hand means a fractured scaphoid.',
    objective: 'Give the diagnosis suggested by tenderness in the anatomical snuff box after a fall, and the boundaries, contents, floor and roof of the box.',
    pitfall: 'Reading a normal radiograph as excluding the fracture. The scaphoid is what floors the box and the fracture is often invisible at first; the tenderness is the finding that matters.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Hand',
    type: 'clinical_correlation',
    aliases: ['Anatomical snuffbox', 'Scaphoid fracture'],
    conflicts: [
      'This paper’s answer gives the contents as the radial artery with the tendons of extensor carpi radialis longus and brevis. The department book (Forearm) counts those two tendons as crossing the floor rather than as contents, and adds the beginning of the cephalic vein in the roof. Recorded as both state it.',
      'Key collision: clusters.json puts the 2025 end-of-year Case (2) in this same cluster, but 101-eoy-2025.ts keys it `anatomical-snuff-box-boundaries-contents-floor-roof`. Until the two keys are reconciled the build mints two concepts for one objective.',
    ],
  },
  {
    q: 1, section: 'Histology', page: 6, marks: M,
    asked: 'Outline LM and EM of sER',
    label: 'Smooth endoplasmic reticulum is invisible in itself and known by the acidophilia it causes and its ribosome-free tubules',
    key: 'ser-structure-function-steroid-detoxification',
    definition: 'Smooth endoplasmic reticulum is a membranous organelle concerned with lipid and steroid synthesis, well developed in cells that form fat and steroid hormones, such as liver cells. On light microscopy it is not demonstrated as such, but where it is abundant it gives the cytoplasm an acidophilia. On electron microscopy it is a network of branching and anastomosing tubules of variable shape, continuous with the rough endoplasmic reticulum, whose membranes carry no bound ribosomes.',
    objective: 'Describe smooth endoplasmic reticulum as it appears on light microscopy and on electron microscopy, and say what it does.',
    pitfall: 'Expecting to see it under the light microscope. What is seen is the cytoplasmic acidophilia it produces when abundant, not the organelle.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structure_function_relationship',
    aliases: ['Agranular endoplasmic reticulum'],
  },
  {
    q: 2, section: 'Histology', page: 6, marks: M,
    asked: 'Types of 2ndry lysosome and their fates',
    label: 'A secondary lysosome is named by what the primary lysosome fused with, and all end as residual bodies',
    key: 'lysosome-types-secondary-fates',
    definition: 'Secondary lysosomes are heterogeneous membranous vesicles that have entered digestive events. A heterolysosome is a primary lysosome fused with a phagosome, digesting solid particles; a multivesicular body is a primary lysosome fused with a pinocytic vesicle, digesting fluid; an autolysosome is a primary lysosome fused with old organelles. What is left undigested becomes a residual body, which is either discharged from the cell by exocytosis or stays in it as lipofuscin, the pigment that accumulates with age particularly in non-dividing cells such as cardiac muscle and nerve cells.',
    objective: 'Name the three types of secondary lysosome by what the primary lysosome fused with, and give the fate of the residual body.',
    pitfall: 'Treating the residual body as a fourth type of secondary lysosome. It is the end state of all three, not a parallel kind.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'classification',
    aliases: ['Heterolysosome', 'Autolysosome', 'Multivesicular body', 'Residual body'],
    conflicts: [
      'Key collision: clusters.json puts the 2025 end-of-year question “Mention EM of types of Lysosomes” in this same cluster, but 101-eoy-2025.ts keys it `lysosome-types-electron-microscopy` — which is also the key SITTING_SIGNALS uses to attach the July 2023 departmental model answer. Reconciling the keys must move that signal too, so it is flagged rather than changed here.',
    ],
  },
  {
    q: 3, section: 'Histology', page: 7, marks: M,
    asked: 'Compare betwean plasma cell and macrophage (origin, site, LM)',
    label: 'Plasma cell and macrophage differ in origin, in where they sit and in what they look like stained',
    key: 'plasma-cell-vs-macrophage-comparison',
    definition: 'The plasma cell arises from the B lymphocyte through the plasmablast and lies in lymphoid tissue; on light microscopy it is a large oval cell with deeply basophilic cytoplasm showing a negative Golgi image, and a spherical eccentric nucleus whose alternating hetero- and euchromatin give the cart-wheel or clock-face appearance. The macrophage arises from the monocyte, is fixed in connective tissue as the histiocyte and free in lymphoid tissue, bone marrow, brain, liver and lung; on light microscopy it is a large branched motile cell with an irregular boundary, pale granular cytoplasm and a single darkly stained eccentric kidney-shaped nucleus, and it is demonstrated by vital stains such as trypan blue or India ink, which it takes up.',
    objective: 'Compare the plasma cell and the macrophage by origin, by site, and by their light-microscopic appearance.',
    pitfall: 'Separating them by basophilia alone. Both can look dark; it is the cart-wheel nucleus and negative Golgi image against the kidney-shaped nucleus and ingested vital stain that tell them apart.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
    type: 'structural_description',
    aliases: ['Histiocyte'],
  },
  {
    q: 4, section: 'Histology', page: 8, marks: M,
    asked: 'Eosinphile (percentage, LM, function)',
    label: 'The eosinophil is a small fraction of the leukocytes with a bilobed nucleus and granules that end allergy',
    key: 'eosinophil-features-granules-function',
    definition: 'Eosinophils are one to four per cent of the leukocytes. On light microscopy they are rounded cells ten to fourteen micrometres across with a bilobed, horse-shoe-shaped nucleus and cytoplasm full of numerous large refractile acidophilic granules. They terminate allergic reactions by secreting histaminase and sulphatase, which destroy histamine and heparin, and by phagocytosing antigen–antibody complexes; and they defend against parasites, their neurotoxins causing nervous dysfunction in the parasite. Their number rises in allergy and parasitic infection and falls with cortisone therapy.',
    objective: 'Give the differential count of the eosinophil, its light-microscopic appearance, and its functions.',
    pitfall: 'Reading eosinophilia as infection in general. It is allergy and parasites that raise the eosinophil; pyogenic infection raises the neutrophil.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
    type: 'structural_description',
    conflicts: [
      'The clustered label built from the end-of-year papers reads the eosinophil count as 2–4%. Both the department book (Granular leukocytes) and this paper’s own answer read 1–4%, and that is what is recorded here.',
    ],
  },
]

export const SCHEMES: Record<string, Scheme> = {
  A1: {
    format: 'comparison_table',
    prompt: 'Give the boundaries and the contents of the intermuscular spaces below the shoulder joint.',
    expects: [
      'Quadrangular space — above: teres minor behind and subscapularis in front; below: teres major; medially: long head of triceps; laterally: surgical neck of the humerus',
      'Quadrangular space contents: the posterior circumflex humeral vessels and the circumflex (axillary) nerve',
      'Upper triangular space — above: teres minor behind and subscapularis in front; below: teres major; laterally: long head of triceps',
      'Upper triangular space contents: the circumflex scapular artery only',
      'Lower triangular space — above: teres major; medially: long head of triceps; laterally: lateral head of triceps and the shaft of the humerus',
      'Lower triangular space contents: the profunda brachii vessels and the radial nerve',
    ],
  },
  A2: {
    format: 'comparison_table',
    prompt: 'Compare the superficial and the deep palmar arch by site, formation and branches.',
    expects: [
      'Superficial arch site: between the palmar aponeurosis and the flexor tendons, at the midshaft of the metacarpals',
      'Deep arch site: deep to the flexor tendons, just distal to the bases of the metacarpals and about half an inch proximal to the superficial arch',
      'Superficial arch formation: mainly the ulnar artery, completed by the superficial palmar branch of the radial artery',
      'Deep arch formation: mainly the radial artery, completed by the deep palmar branch of the ulnar artery',
      'Superficial arch branches: three common palmar digital arteries to the clefts of the medial four fingers, and a palmar digital artery to the medial side of the little finger',
      'Deep arch branches: three palmar metacarpal arteries joining the common palmar digital branches of the superficial arch',
      'Deep arch branches: three perforating arteries to the dorsal metacarpal arteries, and recurrent branches to the anterior carpal arch',
    ],
  },
  A3: {
    format: 'structured_written',
    prompt: 'Give the attachments of the extensor retinaculum and name the contents of each of its compartments.',
    expects: [
      'A thick band of the deep fascia of the forearm lying obliquely across the back of the wrist',
      'Attached laterally to the anterior border of the lower end of the radius, and medially to the pisiform and the triquetral',
      'Five septa divide the space deep to it into six compartments',
      '1st, on the lateral side of the lower end of the radius: abductor pollicis longus and extensor pollicis brevis',
      '2nd, lateral to Lister’s tubercle: extensor carpi radialis longus and extensor carpi radialis brevis',
      '3rd, medial to Lister’s tubercle: extensor pollicis longus',
      '4th, most medial on the back of the lower end of the radius: the tendons of extensor digitorum and extensor indicis, with the posterior interosseous nerve and the anterior interosseous artery',
      '5th, on the back of the inferior radio-ulnar joint: extensor digiti minimi',
      '6th, between the head and the styloid process of the ulna: extensor carpi ulnaris',
    ],
  },
  A4: {
    format: 'structured_written',
    prompt: 'Name the cutaneous nerves of the arm region, with the origin and territory of each.',
    expects: [
      'Back of the arm: the posterior cutaneous nerve of the arm, from the radial nerve',
      'Medial side above: the intercostobrachial nerve, the lateral cutaneous branch of the 2nd intercostal nerve, supplying the floor of the axilla and the upper part of the medial side of the arm',
      'Medial side below: the medial cutaneous nerve of the arm, from the medial cord, supplying the lower part of the medial side of the arm',
      'Lateral side: the lateral supraclavicular nerve, from C3 and C4, over the upper half of the deltoid',
      'Lateral side: the upper lateral cutaneous nerve of the arm, from the posterior branch of the axillary nerve, over the lower half of the deltoid',
      'Lateral side: the lower lateral cutaneous nerve of the arm, from the radial nerve, over the lower half of the lateral side of the arm',
    ],
  },
  A5: {
    format: 'structured_written',
    prompt: 'Give the nerve supply and the action of the muscles that abduct the shoulder girdle beyond ninety degrees.',
    expects: [
      'Beyond ninety degrees the arm is raised by upward rotation of the scapula, not by movement at the shoulder joint',
      'Trapezius is supplied motor by the spinal root of the accessory nerve, with C3 and C4',
      'Its upper and lower fibres together rotate the scapula so the glenoid cavity faces upwards, carrying abduction from 90 to 180 degrees',
      'Its upper fibres also elevate the scapula and maintain the level of the shoulder; its middle fibres retract it',
      'Serratus anterior is supplied by the nerve to serratus anterior, the long thoracic nerve (nerve of Bell)',
      'It is the powerful protractor of the scapula and rotates it upwards through 90 to 180 degrees with trapezius',
      'It fixes the scapula to the chest wall — its paralysis gives winging of the scapula',
    ],
  },
  A6: {
    format: 'structured_written',
    prompt: 'Define supination and pronation, give the axis of the movement, and name the muscles that produce each.',
    expects: [
      'Supination is lateral rotation of the forearm; pronation is medial rotation of the forearm',
      'Both occur at the superior and inferior radio-ulnar joints',
      'The axis runs from the head of the radius above to the head of the ulna below, at the attachment of the apex of the articular disc',
      'In supination the radius and ulna are parallel, the palm faces forwards, the thumb is directed laterally and the interosseous membrane is tense',
      'In pronation the shaft of the radius crosses the ulna, the palm faces backwards, the thumb is directed medially and the interosseous membrane is lax',
      'Supination: biceps when the elbow is flexed, and supinator when the elbow is extended',
      'Pronation: pronator teres and pronator quadratus',
      'Brachioradialis brings the forearm to the mid-prone position',
    ],
  },
  A7: {
    format: 'structured_written',
    prompt: 'Describe the mechanism of fertilization.',
    expects: [
      'Capacitation: the glycoprotein coat is removed from the acrosomal region of the sperms, taking about seven hours',
      'Phase I, penetration of the corona radiata: 300–500 sperms reach the ovum and disperse the corona radiata',
      'Phase II, penetration of the zona pellucida: the sperm binds to zona receptors and its acrosomal enzymes dissolve a path for one sperm, whose head reaches the plasma membrane of the secondary oocyte',
      'Phase III, penetration of the oocyte cell membrane: the two plasma membranes fuse and open, and the sperm contents pass into the ovum cytoplasm leaving the sperm membrane outside',
      'The cortical and zona reaction releases lysosomal enzymes that alter the sperm receptors and make the membrane impenetrable, preventing polyspermy',
      'The secondary oocyte completes the second meiotic division, forming the mature ovum and the second polar body',
      'The sperm nucleus becomes the male pronucleus and meets the female pronucleus',
      'The nuclear membranes of the two pronuclei fuse, forming the nucleus of the zygote',
    ],
  },
  A8: {
    format: 'structured_written',
    prompt: 'Give the anomalies of the placenta, with respect to the attachment of the cord and to abnormal sites of implantation.',
    expects: [
      'In position: placenta praevia, from implantation of the embryo in the lower segment of the uterus',
      'Placenta praevia parietalis — the margin of the placenta is above the internal os',
      'Placenta praevia marginalis — the margin of the placenta covers the internal os',
      'Placenta praevia centralis — the central part of the placenta covers the internal os',
      'In shape: bilobed or trilobed placenta',
      'In number: twin placenta, two identical placentae with two umbilical cords; accessory placenta, a small placenta accompanying the main one',
      'In cord attachment: velamentous placenta — the umbilical cord is attached to the placenta through the membranes',
      'In cord attachment: battledore placenta — the cord is attached to the margin of the placenta',
    ],
  },
  A9: {
    format: 'structured_written',
    prompt: 'Give the types of chorionic villus and the fate of each part of the chorion.',
    expects: [
      'Chorionic villi are projections from the chorion, starting at the end of the 2nd week and continuing through the 3rd week',
      'Primary villi: cytotrophoblast cells proliferate and push the syncytiotrophoblast',
      'Secondary villi: somatic extra-embryonic mesoderm enters the core of the primary villus',
      'Tertiary villi: fetal blood vessels appear in the mesodermal core, the villi separated by intervillous spaces filled with maternal blood',
      'Stem (anchoring) villus: the part running between the chorion and the decidua basalis',
      'Free (floating or absorbing) villi: side branches of the stem villus, responsible for the exchange of nutrients and gases with maternal blood',
      'Chorion frondosum carries well-developed tertiary villi and persists, sharing in the formation of the placenta',
      'Chorion laeve carries degenerating tertiary villi and degenerates',
    ],
  },
  A10: {
    format: 'short_answer',
    prompt: 'Give the functions of the deep fascia.',
    expects: [
      'Deep fascia is an inelastic membrane of compact collagen fibres, well defined in the limbs and absent in the face and the anterior abdominal wall',
      'Formation of broad sheets around muscles: fixing underlying structures in position, giving attachment to muscles, and helping venous return',
      'Formation of intermuscular septa and interosseous membranes: separating different muscle groups and increasing the area for muscle attachment',
      'Formation of retinacula: thickened localised transverse bands at the wrist and ankle that keep the tendons in position',
      'Formation of the palmar and plantar aponeuroses: thick strong layers protecting the vessels, nerves and tendons',
      'Formation of fibrous sheaths around big vessels: the carotid sheath around the carotid arteries, internal jugular vein and vagus nerve in the neck',
    ],
  },
  C6: {
    format: 'multipart_written',
    prompt: 'A 45-year-old woman was admitted to hospital with dislocation of her right shoulder.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What nerve is endangered by this dislocation?',
        expects: ['The axillary (circumflex) nerve'],
      },
      {
        letter: 'b',
        prompt: 'What are the muscles supplied by this nerve?',
        expects: ['Deltoid', 'Teres minor'],
      },
      {
        letter: 'c',
        prompt: 'What movements would be affected if this nerve was injured?',
        expects: [
          'Loss of abduction of the shoulder from 15 to 90 degrees — the range the middle fibres of deltoid provide',
          'The first 15 degrees, initiated by supraspinatus, and abduction above 90 degrees by scapular rotation are retained',
        ],
      },
      {
        letter: 'd',
        prompt: 'What would be the deformity resulting from this paralysis?',
        expects: ['A flat shoulder — the rounded contour is lost as deltoid wastes'],
      },
      {
        letter: 'e',
        prompt: 'Where would be the skin sensory loss resulting from such an injury?',
        expects: [
          'Over the lower half of the deltoid — the territory of the upper lateral cutaneous nerve of the arm',
        ],
      },
    ],
  },
  C10: {
    format: 'multipart_written',
    prompt: 'A 30-year-old woman fell on her outstretched hand and has severe pain in the lateral part of the wrist, particularly at the base of the anatomical snuff box.',
    expects: [],
    parts: [
      {
        letter: 'a',
        prompt: 'What is the expected diagnosis?',
        expects: ['Fracture of the scaphoid bone'],
      },
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
          'The radial artery, whose pulsation can be felt there',
          'The tendons of extensor carpi radialis longus and brevis',
        ],
      },
      {
        letter: 'd',
        prompt: 'What makes the floor of the anatomical snuff box?',
        expects: [
          'The styloid process of the radius, the scaphoid proximally and the trapezium distally',
          'Which is why tenderness here after a fall on the outstretched hand means a fractured scaphoid',
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
  H1: {
    format: 'structured_written',
    prompt: 'Outline the light-microscopic and electron-microscopic appearance of the smooth endoplasmic reticulum.',
    expects: [
      'A membranous organelle concerned with lipid and steroid synthesis',
      'Well developed in fat- and steroid-hormone-forming cells, for example liver cells',
      'By light microscopy it is not demonstrated as such',
      'But where it is abundant it causes cytoplasmic acidophilia',
      'By electron microscopy: branching and anastomosing tubules of variable shape, continuous with the rough endoplasmic reticulum',
      'Its membranes carry no bound ribosomes',
    ],
  },
  H2: {
    format: 'structured_written',
    prompt: 'Give the types of secondary lysosome and their fates.',
    expects: [
      'Secondary lysosomes are heterogeneous membranous vesicles that have entered into digestive events',
      'Heterolysosome: a primary lysosome fused with a phagosome',
      'Multivesicular body: a primary lysosome fused with a pinocytic vesicle',
      'Autolysosome: a primary lysosome fused with old organelles',
      'Residual body: the undigested material left after digestion',
      'A residual body is either discharged from the cell by exocytosis',
      'Or remains in the cell as lipofuscin, which increases with age especially in non-dividing cells',
    ],
  },
  H3: {
    format: 'comparison_table',
    prompt: 'Compare the plasma cell and the macrophage by origin, site and light-microscopic appearance.',
    expects: [
      'Plasma cell origin: B lymphocyte, through the plasmablast',
      'Macrophage origin: the monocyte',
      'Plasma cell site: lymphoid tissue',
      'Macrophage site: fixed in connective tissue as the histiocyte, and free in lymphoid tissue, bone marrow, brain, liver and lung',
      'Plasma cell by LM: a large oval cell with deeply basophilic cytoplasm showing a negative Golgi image',
      'Plasma cell by LM: a spherical eccentric nucleus with alternating eu- and heterochromatin, giving the cart-wheel or clock-face appearance',
      'Macrophage by LM: a large branched motile cell with an irregular boundary and pale granular cytoplasm',
      'Macrophage by LM: a single darkly stained eccentric kidney-shaped nucleus, and it takes up vital stains such as trypan blue or India ink',
    ],
  },
  H4: {
    format: 'structured_written',
    prompt: 'Comment on the eosinophil: its percentage, its appearance by light microscopy, and its functions.',
    expects: [
      'Eosinophils are 1–4% of the leukocytes',
      'By light microscopy: rounded cells 10–14 µm across',
      'Nucleus: bilobed, horse-shoe shaped',
      'Cytoplasm: numerous large, refractile, acidophilic granules',
      'Termination of allergic reactions: secreting histaminase and sulphatase to destroy histamine and heparin',
      'Termination of allergic reactions: phagocytosis of the antigen–antibody complexes',
      'Defence against parasites: neurotoxins causing nervous dysfunction of the parasite',
      'They increase in allergy and parasitic infection and decrease with cortisone therapy',
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
