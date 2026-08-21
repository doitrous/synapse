/**
 * `101 ISK > Anatomy > Upper Limb > Shoulder Region` — the question books' MCQs.
 *
 * A hundred and twenty-five rows in the bank, plus four moved here from `Arm`
 * because they ask what moves the arm at the shoulder joint rather than what
 * lies in the arm:
 *
 *   the-following-muscles-can-extends-the-arm-1cc0257f       (asked four times)
 *   the-following-muscle-can-extend-the-arm-dep-book-ad-…
 *   principal-muscles-which-produce-abduction-…-0e714e4e
 *   the-principal-muscles-which-produce-abduction-…-72e5ff0f
 *
 * Twelve of the eighteen concepts are not minted here. Nine already exist from
 * the written papers — `deltoid-attachment-nerve-action`,
 * `scapular-rotation-abduction-beyond-90-muscles`,
 * `shoulder-joint-type-ligaments-movements`,
 * `intermuscular-spaces-quadrangular-triangular-boundaries-contents`,
 * `axillary-nerve-injury-shoulder-dislocation`,
 * `long-thoracic-nerve-serratus-anterior-winging`,
 * `brachial-plexus-formation-branches`, `axilla-boundaries-walls-contents`,
 * `erb-palsy-upper-trunk-injury` and `case-clavicle-fracture-middle-third` —
 * and three belong to sibling MCQ leaves this batch already carries:
 * `scapular-border-muscle-attachments-medial-versus-lateral` to Muscles of the
 * Back, `upper-limb-joint-movements-follow-from-type` to Joints of Upper Limb,
 * and `biceps-brachii-heads-insertion-nerve-action` to Arm. Every one is copied
 * verbatim — label, definition, objective, pitfall — so re-emitting it is an
 * update that adds these occurrences to its exam signal and changes nothing
 * else. The emitter merges concepts by key across leaves, so a shared concept
 * emits one block carrying both articles.
 *
 * `skeletal-muscle-form-classification-by-fibre-direction` is minted here and
 * does not really belong to this leaf: five rows landed in Shoulder Region only
 * because deltoid is the multipennate example. The bank's `Muscular system`
 * leaf has no seed file yet; whoever writes it should reuse this key rather than
 * mint a rival.
 *
 * Fifteen questions are excluded. Nine are scan casualties — a stem that
 * swallowed its own first option, an option list of three, a stem truncated to
 * the words "Regarding the". Six are not: they are questions with no defensible
 * single answer, and rescanning will not help any of them. The labrum
 * glenoidale pair prints two true options, "fibro-cartilaginous rim around the
 * glenoid cavity" and "helps in stability of the shoulder joint"; the acromion
 * question prints four false ones; `one-of-the-following-muscles-is-not-a-
 * rotator-cuff-muscle` offers both serratus anterior and teres major as
 * non-cuff muscles. Those six need a faculty reviewer.
 *
 * Sixty-nine answers are overridden — fifty-two where the books printed no key,
 * and seventeen where the printed key is wrong. The wrong keys cluster on the
 * DEP BOOK pages again, and the commonest pattern is a key shifted by one row:
 * `the-axillary-nerve-innervates` keyed to "deltoid and supraspinatus", the
 * question above it being about supraspinatus, and
 * `the-following-muscle-abducts-the-arm-from-0-15` keyed to infraspinatus when
 * supraspinatus sits directly above it in the option list.
 *
 * What this leaf says the faculty examines: the rotator cuff and the four
 * movements of the shoulder joint, over and over, and the deltoid — its
 * multipennate form, its three sets of fibres, its axillary nerve, and the flat
 * shoulder its paralysis leaves. Abduction is asked in stages, and the stage
 * boundaries (0–15, 15–90, beyond 90) are the marks.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Shoulder Region',
  modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
  articleId: 'ART-101-ANA-SHOULDER-REGION',

  concepts: [
    {
      key: 'rotator-cuff-four-muscles-and-shoulder-stability',
      label: 'The rotator cuff is four muscles whose tendons blend with the capsule, and it is the shoulder\'s main stabiliser',
      definition: 'The rotator cuff — the musculo-tendinous cuff — is formed by subscapularis in front, supraspinatus above, and infraspinatus and teres minor behind. Their tendons blend with the capsule of the shoulder joint and hold the head of the humerus against the shallow glenoid cavity, and because the capsule has no muscle beneath it the cuff is deficient inferiorly, which is where the joint dislocates. The cuff is the main factor stabilising the shoulder. Three of the four rotate the humerus — subscapularis medially, infraspinatus and teres minor laterally — while supraspinatus alone does not rotate it but initiates abduction. Teres major, deltoid, serratus anterior and latissimus dorsi are not cuff muscles.',
      objective: 'Name the four rotator cuff muscles, say what the cuff does for the joint, and identify which cuff muscle does not rotate the humerus.',
      pitfall: 'Letting teres major into the cuff because teres minor is in it. The two are neighbours on the lateral border of the scapula and differ by one word; teres minor blends with the capsule and teres major does not go near it.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structure_function_relationship',
    },
    {
      key: 'humeral-tuberosity-attachments-and-the-cuff-insertions',
      label: 'The greater tuberosity takes three cuff muscles, the lesser takes the fourth, and the groove between them takes three more',
      definition: 'The greater tuberosity of the humerus carries three impressions, receiving from above downwards supraspinatus, infraspinatus and teres minor. The lesser tuberosity receives subscapularis alone. The intertubercular (bicipital) groove between them takes pectoralis major on its lateral lip, teres major on its medial lip and latissimus dorsi on its floor, and lodges the tendon of the long head of biceps. Because all three groove muscles pull the humerus towards the trunk, they share adduction and medial rotation of the arm.',
      objective: 'Assign each muscle of the shoulder to the greater tuberosity, the lesser tuberosity or the intertubercular groove, and give the action the groove muscles share.',
      pitfall: 'Swapping teres minor and teres major. Teres minor is a cuff muscle and reaches the greater tuberosity; teres major stops at the medial lip of the groove, alongside latissimus dorsi, whose tendon it accompanies.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structural_description',
    },
    {
      key: 'shoulder-abduction-first-ninety-degrees-supraspinatus-and-deltoid',
      label: 'Supraspinatus starts abduction and deltoid carries it to ninety degrees',
      definition: 'Abduction of the arm at the shoulder joint happens in two stages before the scapula moves. Supraspinatus initiates it and carries the arm through the first fifteen degrees, working from a position in which deltoid\'s pull is almost vertical and useless. The middle fibres of deltoid then take it from fifteen to ninety degrees, where the greater tuberosity meets the coraco-acromial arch and movement at the joint stops. Paralysis of deltoid therefore costs the fifteen-to-ninety range and no more; paralysis of supraspinatus costs the initiation.',
      objective: 'Give the muscle responsible for each stage of abduction to ninety degrees and state the range each covers.',
      pitfall: 'Saying deltoid abducts the arm and stopping. It cannot start the movement, and it cannot finish it: the first fifteen degrees are supraspinatus and everything past ninety is scapular rotation.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structure_function_relationship',
    },
    {
      key: 'shoulder-joint-movements-and-their-muscles',
      label: 'Each movement of the shoulder joint has a principal muscle, and neighbouring muscles do opposite things',
      definition: 'Flexion of the arm is by the anterior fibres of deltoid, the clavicular head of pectoralis major, coracobrachialis and biceps. Extension is by latissimus dorsi, the principal extensor, with teres major and the posterior fibres of deltoid. Adduction is by pectoralis major, latissimus dorsi and teres major — the three muscles of the intertubercular groove. Medial rotation is by pectoralis major, latissimus dorsi, teres major, subscapularis and the anterior (clavicular) fibres of deltoid. Lateral rotation is by infraspinatus, teres minor and the posterior fibres of deltoid. Supraspinatus takes part in no rotation at all, and serratus anterior acts on the scapula rather than on the joint.',
      objective: 'Name the principal muscle of each movement of the shoulder joint and say which movement a named muscle produces.',
      pitfall: 'Treating deltoid as one muscle. Its anterior fibres flex and medially rotate and its posterior fibres extend and laterally rotate, so deltoid is a correct answer for four opposite movements and a wrong one for each of the other four.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structure_function_relationship',
    },
    {
      key: 'shoulder-joint-capsule-bursae-and-nerve-supply',
      label: 'The shoulder capsule is lax below, its subscapular bursa opens into the joint and its subacromial bursa does not',
      definition: 'The capsule of the shoulder joint is attached above round the margin of the glenoid cavity outside the labrum and below to the anatomical neck of the humerus, except medially where it descends about a centimetre onto the surgical neck. It is lax, and it is weakest inferiorly, where no muscle supports it — which is why the head dislocates downwards. The subscapular bursa lies anteriorly beneath the tendon of subscapularis and communicates with the joint cavity through a gap in the capsule; the subacromial (subdeltoid) bursa lies above between the acromion and supraspinatus and does not communicate with it. The joint is supplied by the axillary, suprascapular and lateral pectoral nerves.',
      objective: 'Give the attachments of the shoulder capsule, say which of its bursae communicates with the joint cavity, and name its nerve supply.',
      pitfall: 'Making the subacromial bursa communicate with the joint. It is the subscapular bursa that does; the subacromial bursa is separated from the cavity by supraspinatus, which is exactly what an impinging coraco-acromial arch wears through.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structural_description',
    },
    {
      key: 'skeletal-muscle-form-classification-by-fibre-direction',
      label: 'Skeletal muscles are classified by the direction of their fibres, from strap-like to multipennate',
      definition: 'Skeletal muscles are classified by the arrangement of their fibres. Parallel or strap-like muscles have fibres running the length of the muscle — sartorius is the example, and rectus abdominis is a strap muscle interrupted by tendinous intersections. Pennate muscles have fibres set obliquely on a tendon like the barbs of a feather: unipennate with the tendon along one side, as in flexor pollicis longus; bipennate with the tendon in the middle and fibres on both sides, as in rectus femoris; and multipennate, with several tendinous septa, as in deltoid. Pennation packs more and shorter fibres into the same volume, so a pennate muscle is powerful but moves through a smaller range than a strap muscle of the same size.',
      objective: 'Classify a named muscle by the arrangement of its fibres, and give the example the book uses for each class.',
      pitfall: 'Reading pennation as a way of gaining range. It buys power at the cost of range; the strap muscle is the one built for range.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'classification',
    },
    {
      key: 'deltoid-attachment-nerve-action',
      label: 'Deltoid has three sets of fibres from a V-shaped origin, and each set does something different',
      definition: 'Deltoid is a thick triangular muscle forming the rounded contour of the shoulder. Its V-shaped origin is from the anterior border of the lateral third of the clavicle (anterior fibres), the lateral border of the acromion (middle fibres) and the lower lip of the crest of the spine of the scapula (posterior fibres); it inserts into the deltoid tuberosity at the middle of the lateral surface of the shaft of the humerus. It is supplied by the circumflex (axillary) nerve. Its anterior fibres flex and medially rotate the arm, its posterior fibres extend and laterally rotate it, and its middle fibres abduct the arm from fifteen to ninety degrees.',
      objective: 'Give the three origins, the insertion, the nerve supply and the three different actions of deltoid.',
      pitfall: 'Giving abduction as deltoid\'s action and stopping. The anterior and posterior fibres oppose each other in flexion and rotation, and it is the middle fibres alone that abduct — and only through fifteen to ninety degrees.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structural_description',
    },
    {
      key: 'scapular-rotation-abduction-beyond-90-muscles',
      label: 'Beyond ninety degrees the scapula rotates, by trapezius and serratus anterior',
      definition: 'Abduction of the arm beyond about ninety degrees cannot happen at the shoulder joint, because the greater tuberosity meets the coraco-acromial ligament; the arm is raised further by the scapula rotating on the chest wall so the glenoid cavity faces upwards. That rotation is produced by the upper and lower fibres of trapezius, supplied motor by the spinal root of the accessory nerve with sensory C3 and C4, acting with the lower five digitations of serratus anterior, supplied by the nerve to serratus anterior (long thoracic nerve, nerve of Bell). Serratus anterior is also the powerful protractor of the scapula and fixes it against the chest wall, so its paralysis wings the scapula.',
      objective: 'Name the muscles that rotate the scapula to carry abduction beyond ninety degrees, and give the nerve supply and action of each.',
      pitfall: 'Answering with deltoid and supraspinatus. Those carry abduction to ninety degrees; past it the question is about the shoulder girdle, and the answer is trapezius and serratus anterior.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structure_function_relationship',
    },
    {
      key: 'shoulder-joint-type-ligaments-movements',
      label: 'The shoulder joint\'s four ligaments are weak, which is why the joint dislocates',
      definition: 'The shoulder joint is a synovial polyaxial ball-and-socket joint between the head of the humerus and the glenoid cavity, deepened by the labrum glenoidale. Its ligaments are three weak gleno-humeral ligaments strengthening the anterior capsule, from the anterior margin of the glenoid cavity to the lesser tuberosity and the anatomical neck; the stronger coraco-humeral ligament strengthening the upper capsule, from the coracoid process to the upper border of the greater tuberosity; the transverse humeral ligament, a broad band from lesser to greater tuberosity converting the intertubercular groove into a canal and acting as a retinaculum for the long head of biceps; and the coraco-acromial ligament, which with the coracoid and acromion forms the coraco-acromial arch, a secondary socket above the joint. The joint is weak, unstable and easily dislocated because a very large humeral head sits against a small shallow glenoid, because the capsule and ligaments are weak and lax, and because no muscle supports the capsule directly from below.',
      objective: 'List the ligaments of the shoulder joint with their attachments, and relate their weakness to the instability of the joint.',
      pitfall: 'Reading the gleno-humeral ligaments as the joint\'s support. The book calls all three weak; what actually holds the shoulder is the rotator cuff, and the coraco-acromial arch above.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
      type: 'structural_description',
    },
    {
      key: 'intermuscular-spaces-quadrangular-triangular-boundaries-contents',
      label: 'The quadrangular and two triangular spaces below the shoulder each have set boundaries and their own contents',
      definition: 'Three intermuscular spaces lie just below the shoulder joint. The quadrangular space, laterally, is bounded above by teres minor behind and subscapularis in front, below by teres major, medially by the long head of triceps and laterally by the surgical neck of the humerus; it transmits the posterior circumflex humeral vessels and the axillary (circumflex) nerve. The upper triangular space, medially, has the same upper and lower boundaries with the long head of triceps laterally, and transmits only the circumflex scapular artery. The lower triangular space (triangular interval) lies lateral to the long head of triceps, bounded above by teres major and laterally by the lateral head of triceps and the shaft of the humerus, and transmits the radial nerve and the profunda brachii vessels.',
      objective: 'Give the boundaries and contents of the quadrangular, upper triangular and lower triangular spaces.',
      pitfall: 'Treating the long head of triceps as one boundary throughout. It is the medial boundary of the quadrangular space and the lateral boundary of the upper triangular space — which side of it a structure lies on is what separates the axillary nerve from the circumflex scapular artery.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structural_description',
    },
    {
      key: 'axillary-nerve-injury-shoulder-dislocation',
      label: 'Shoulder dislocation endangers the axillary nerve, costing deltoid and teres minor',
      definition: 'The axillary (circumflex) nerve, C5 and C6, winds round the surgical neck of the humerus through the quadrangular space, where dislocation of the shoulder, fracture of the surgical neck and crutch pressure all endanger it. It supplies deltoid and teres minor. Its injury loses abduction of the shoulder through the range deltoid provides, from fifteen to ninety degrees, flattens the rounded contour of the shoulder as deltoid wastes, and numbs a patch of skin over the lower half of the deltoid.',
      objective: 'Name the nerve endangered by shoulder dislocation, the muscles it supplies, and the movement, deformity and sensory loss its injury produces.',
      pitfall: 'Reporting total loss of abduction. Supraspinatus still initiates the first fifteen degrees and the scapular rotators still act above ninety; it is the middle range that goes.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries',
      type: 'clinical_correlation',
    },
    {
      key: 'long-thoracic-nerve-serratus-anterior-winging',
      label: 'Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula',
      definition: 'The long thoracic nerve (C5, C6, C7) runs on the surface of serratus anterior on the medial wall of the axilla, where it is exposed during axillary clearance. Serratus anterior rotates the scapula upward and holds its medial border against the chest wall, so its paralysis prevents abduction of the arm above the shoulder and lets the medial border stand off — a winged scapula.',
      objective: 'Explain why a mastectomy patient cannot abduct above the shoulder, and name the deformity that accompanies it.',
      pitfall: 'Blaming the axillary nerve. That would weaken abduction to ninety degrees and numb the regimental badge area; it is loss of scapular rotation above the shoulder, with winging, that names the long thoracic nerve.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
      type: 'clinical_correlation',
    },
    {
      key: 'brachial-plexus-formation-branches',
      label: 'The brachial plexus is roots, trunks, divisions and cords, and its branches sort flexor from extensor',
      definition: 'The brachial plexus lies partly in the neck and partly in the axilla and consists of roots C5 to T1, three trunks, six divisions and three cords. The upper trunk is C5 and C6, the middle trunk C7 alone, the lower trunk C8 and T1; each divides behind the clavicle into an anterior and a posterior division. The lateral cord is the anterior divisions of the upper and middle trunks, the medial cord the anterior division of the lower trunk, the posterior cord the posterior divisions of all three. Branches of the upper trunk are the nerve to subclavius and the suprascapular nerve; of the lateral cord, the musculocutaneous nerve, the lateral root of the median and the lateral pectoral nerve; of the medial cord, the ulnar nerve, the medial root of the median, the medial pectoral nerve and the medial cutaneous nerves of the arm and forearm; of the posterior cord, the radial and axillary nerves, the upper and lower subscapular nerves and the nerve to latissimus dorsi. All the lateral and medial cord branches supply the flexor side and all the posterior cord branches the extensor side.',
      objective: 'Give the root value and the four stages of the brachial plexus and list the branches of each trunk and cord.',
      pitfall: 'Listing branches without the flexor–extensor rule. The posterior cord supplies every extensor and the other two cords every flexor, which makes the list a system rather than a list.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
      type: 'structural_description',
    },
    {
      key: 'axilla-boundaries-walls-contents',
      label: 'The axilla holds the artery, the vein, the cords of the plexus, two stray nerves, five node groups and fat',
      definition: 'The contents of the axilla are the axillary artery and its branches; the axillary vein and its tributaries; the cords of the brachial plexus and their branches; the long thoracic nerve; the intercostobrachial nerve, which is the lateral cutaneous branch of the second thoracic nerve; five groups of axillary lymph nodes; the tail of the mammary gland; and axillary fat. The vessels and the plexus run from the apex to the base along the lateral wall, nearer the anterior wall than the posterior.',
      objective: 'Enumerate the contents of the axilla and say where the vessels and plexus run within it.',
      pitfall: 'Omitting the two nerves that are not plexus branches in the ordinary sense. The long thoracic nerve on the medial wall and the intercostobrachial nerve crossing the floor are the two that surgery meets, and both are in the list for that reason.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
      type: 'structural_description',
    },
    {
      key: 'erb-palsy-upper-trunk-injury',
      label: 'Traction on the head at delivery tears the upper trunk and gives the porter\'s tip posture',
      definition: 'Duchenne-Erb\'s paralysis is injury of the upper trunk of the brachial plexus, C5 and C6, from excessive displacement of the head to one side with depression of the shoulder on the other — in infants, a birth injury during delivery. The muscles paralysed are those of C5 and C6: deltoid and teres minor through the axillary nerve, subscapularis and teres major through the subscapular nerves, supraspinatus and infraspinatus through the suprascapular nerve, and biceps, brachialis and coracobrachialis through the musculocutaneous nerve. The limb takes the porter\'s tip posture — the shoulder adducted and medially rotated, the elbow extended and the forearm pronated — and sensation is lost along the lateral aspect of the arm and forearm.',
      objective: 'Recognise Erb\'s palsy from its obstetric mechanism, name the roots, list the paralysed muscles by their nerves, and describe the resulting posture.',
      pitfall: 'Learning the posture without the muscles behind it. Each component of the porter\'s tip is a named paralysis — adduction from deltoid and supraspinatus, medial rotation from infraspinatus and teres minor, extension and pronation from biceps — and the question asks for five muscles for that reason.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
      type: 'clinical_correlation',
    },
    {
      key: 'case-clavicle-fracture-middle-third',
      label: 'The clavicle breaks where its curvature changes, and the shoulder then drops because the limb hangs from it',
      definition: 'The clavicle fractures most often at the junction between its lateral and middle thirds, the site at which its curvature changes — the lateral third is convex posteriorly and the medial two thirds convex anteriorly. The shoulder drops because the weight of the upper limb is suspended from the lateral third of the clavicle through the coraco-clavicular ligament, which the department book calls the main medium by which the scapula and upper limb are suspended; the book adds that a fracture medial to that ligament\'s attachment lets the upper limb drop. The subclavian vessels and the divisions of the brachial plexus lie behind the bone and are liable to be damaged, and the fracture is treated with an arm sling to support the sagging limb.',
      objective: 'Explain why the clavicle fractures at the junction of its lateral and middle thirds, why the shoulder is then depressed, and what lies at risk behind it.',
      pitfall: 'Attributing the drop to muscle spasm. The limb is suspended from the clavicle by the coraco-clavicular ligament, so a break medial to that attachment simply lets the weight of the arm pull the shoulder down.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
      type: 'clinical_correlation',
    },
    {
      key: 'scapular-border-muscle-attachments-medial-versus-lateral',
      label: 'Four muscles grip the medial border of the scapula and the teres muscles take the lateral border',
      definition: 'The medial border of the scapula receives levator scapulae above the root of the spine, rhomboideus minor at the root of the spine and rhomboideus major below it on the dorsal aspect, and serratus anterior along the whole length of its costal aspect. The lateral border gives origin to teres minor from the upper two thirds of its dorsal surface and to teres major from the lower third and the inferior angle, with the long head of triceps arising just above it from the infraglenoid tubercle.',
      objective: 'Name the muscles attached to the medial border of the scapula and those attached to the lateral border, and assign any named muscle to the correct one.',
      pitfall: 'Placing serratus anterior on the lateral border because it runs laterally round the chest. It attaches along the costal surface of the medial border, and it is that grip which lets it hold the medial border against the chest wall.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Muscles of the Back',
      type: 'structural_description',
    },
    {
      key: 'upper-limb-joint-movements-follow-from-type',
      label: 'The movements possible at an upper limb joint follow from its type and the number of its axes',
      definition: 'A hinge joint — the elbow, the interphalangeal joints — is uniaxial and permits flexion and extension only, never abduction or adduction. A pivot joint is uniaxial for rotation: at the superior and inferior radio-ulnar joints that rotation is pronation and supination. An ellipsoid joint such as the wrist is biaxial and permits flexion, extension, abduction and adduction, and therefore circumduction. The condyloid metacarpophalangeal joints permit the same four. The shoulder girdle moves at the sternoclavicular and acromioclavicular joints in elevation, depression, protraction, retraction and circumduction.',
      objective: 'Say which movements are possible at a given upper limb joint, and which the shape of that joint forbids.',
      pitfall: 'Placing pronation at the wrist. Pronation and supination happen at the two radio-ulnar joints; the hand follows the radius, which is what makes the movement look as though it were at the wrist.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
      type: 'functional_relationship',
    },
    {
      key: 'biceps-brachii-heads-insertion-nerve-action',
      label: 'Biceps has two heads with different scapular origins, inserts on the radius, and is the powerful supinator',
      definition: 'Biceps brachii arises by a long head from the supraglenoid tubercle of the scapula, whose tendon runs through the shoulder joint inside the capsule but outside the synovial membrane before descending in the intertubercular groove, and by a short head from the lateral part of the tip of the coracoid process, lateral to coracobrachialis. The two bellies join and insert by the bicipital tendon into the posterior rough part of the radial (bicipital) tuberosity and by the bicipital aponeurosis into the deep fascia over the flexor muscles of the forearm. It is supplied by the musculocutaneous nerve, from the lateral cord. It flexes the elbow and is the powerful supinator of the flexed forearm; it is not a pronator, and it does not extend the elbow.',
      objective: 'Give the two origins, the insertion, the nerve supply and the actions of biceps brachii, and say what else takes attachment to the coracoid process.',
      pitfall: 'Putting the long head on the infraglenoid tubercle and the insertion on the ulnar tuberosity. Infraglenoid belongs to the long head of triceps and the ulnar tuberosity to brachialis, and each swap is a whole different muscle.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Arm',
      type: 'structural_description',
    },
  ],

  questions: [
    {
      key: 'lateral-rotation-at-the-shoulder-is-done-by-2ce9ec1a',
      conceptKey: 'shoulder-joint-movements-and-their-muscles',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the lateral rotator of the shoulder from a list of a medial rotator, a scapular muscle and an abductor.',
      explanations: {
        A: 'Correct, through its posterior fibres, which extend and laterally rotate the arm. Deltoid is the only muscle on this list that rotates the humerus laterally at all.',
        B: 'The exact opposite. Subscapularis is the anterior cuff muscle and the principal medial rotator; it is on the list because it is a rotator, but of the other kind.',
        C: 'Serratus anterior acts on the scapula — protraction and upward rotation — and never touches the humerus.',
        D: 'Supraspinatus is the one rotator cuff muscle that does not rotate. It initiates abduction and does nothing else.',
      },
    },
    {
      key: 'regarding-the-deltoid-muscle-mark-one-correct-statement-4c1852d8',
      conceptKey: 'deltoid-attachment-nerve-action',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the actions of each set of deltoid fibres, its cord of origin and the deformity of its paralysis.',
      explanations: {
        A: 'The middle fibres abduct. Adduction is pectoralis major, latissimus dorsi and teres major, none of which is part of deltoid.',
        B: 'The anterior fibres flex and medially rotate; the posterior fibres do the opposite, extending and laterally rotating. This option gives the posterior fibres the anterior fibres\' actions.',
        C: 'The axillary nerve comes from the posterior cord, not the lateral. The lateral cord gives the musculocutaneous nerve and the lateral pectoral nerve.',
        D: 'Correct. Deltoid gives the shoulder its rounded contour, so when it wastes the acromion stands out and the shoulder looks flat — the sign of an axillary nerve lesion.',
      },
    },
    {
      key: 'the-deltoid-muscle-choose-the-correct-answer-4434ddae',
      conceptKey: 'deltoid-attachment-nerve-action',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the origin, insertion, nerve supply and fibre actions of deltoid.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. Deltoid is inserted into the deltoid tuberosity, so B is true; A substitutes the coracoid process for the spine of the scapula, C gives it the wrong nerve and D gives its middle fibres an action on the scapula that belongs to trapezius and serratus anterior.',
      explanations: {
        A: 'Two of the three are right, which is what makes it dangerous. The third origin is the crest of the spine of the scapula, not the coracoid process — the coracoid gives pectoralis minor, coracobrachialis and the short head of biceps.',
        B: 'Correct. All three sets of fibres converge on the deltoid tuberosity, on the lateral surface of the middle of the humeral shaft.',
        C: 'The axillary nerve, not the radial. Both are branches of the posterior cord, which is why the swap is common; the radial nerve supplies the extensor compartments, and deltoid is not one of them.',
        D: 'The middle fibres abduct the arm at the shoulder joint. Rotation of the scapula is trapezius and serratus anterior, acting on a different bone.',
      },
    },
    {
      key: 'the-following-muscles-abducts-the-arm-from-0-15-758da45b',
      conceptKey: 'shoulder-abduction-first-ninety-degrees-supraspinatus-and-deltoid',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the muscle that initiates abduction and give the range it covers.',
      explanations: {
        A: 'Trapezius rotates the scapula and carries abduction past ninety degrees. It is the answer to the last stage of the movement, not the first.',
        B: 'Correct. Supraspinatus takes the arm through the first fifteen degrees, at which point deltoid\'s line of pull becomes effective.',
        C: 'Infraspinatus is a lateral rotator. It sits directly below supraspinatus on the scapula and directly below it in most option lists, which is exactly why it is here.',
        D: 'Deltoid takes over at fifteen degrees and carries the arm to ninety; it cannot start the movement, because at zero degrees its pull runs almost straight up the shaft of the humerus.',
      },
    },
    {
      key: 'the-glenohumeral-ligaments-choose-the-correct-answer-46c11721',
      conceptKey: 'shoulder-joint-type-ligaments-movements',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the number, strength and attachments of the gleno-humeral ligaments.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. There are three gleno-humeral ligaments, so B is true; the department book calls them weak, attaches them to the anterior margin of the glenoid only, and the dislocation they fail to prevent is anterior and inferior, not posterior.',
      explanations: {
        A: 'The book calls all three weak, and their weakness is the point: it is why the shoulder is the most commonly dislocated joint in the body.',
        B: 'Correct. Three gleno-humeral ligaments — superior, middle and inferior — thicken the front of the capsule.',
        C: 'They arise from the anterior margin of the glenoid cavity only, and run to the lesser tuberosity and the anatomical neck. A ligament attached round the whole margin would be a labrum, not a ligament.',
        D: 'They lie in front, so what little they resist is anterior displacement. Nothing supports the capsule below, which is where the head actually escapes.',
      },
    },
    {
      key: 'which-one-of-the-following-muscles-that-can-extend-the-arm-a2c92e89',
      conceptKey: 'shoulder-joint-movements-and-their-muscles',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the principal extensor of the arm at the shoulder joint.',
      explanations: {
        A: 'Infraspinatus is a lateral rotator of the humerus. It lies on the back of the scapula, which makes it look like an extensor, but its fibres run almost horizontally.',
        B: 'Correct. Latissimus dorsi is the principal extensor of the arm, and also adducts and medially rotates it.',
        C: 'The clavicular fibres of pectoralis major flex the arm — the opposite movement. The sternocostal fibres are the ones that assist extension from the flexed position.',
        D: 'The anterior fibres of deltoid flex; it is the posterior fibres that extend, and the option names the wrong set.',
      },
    },
    {
      key: 'one-of-the-following-muscle-is-a-rotator-cuff-muscle-69608ba3',
      conceptKey: 'rotator-cuff-four-muscles-and-shoulder-stability',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise a rotator cuff muscle and reject the muscles that lie near the cuff without belonging to it.',
      explanations: {
        A: 'Correct. Infraspinatus is one of the four — subscapularis, supraspinatus, infraspinatus and teres minor — whose tendons blend with the capsule.',
        B: 'Pectoralis major reaches the lateral lip of the intertubercular groove, in front of the joint but nowhere near the capsule it would have to blend with.',
        C: 'Serratus anterior joins the scapula to the ribs and never crosses the shoulder joint at all.',
        D: 'The single commonest wrong answer here. Teres major sits immediately below teres minor on the lateral border of the scapula and differs by one word, but it goes to the medial lip of the groove and does not blend with the capsule.',
      },
    },
    {
      key: 'pronation-and-supination-of-the-forearm-occurs-at-7d88c780',
      conceptKey: 'upper-limb-joint-movements-follow-from-type',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the joints at which pronation and supination occur.',
      explanations: {
        A: 'The elbow is a uniaxial hinge and does flexion and extension only. It shares a capsule with the superior radio-ulnar joint, which is what makes this tempting.',
        B: 'Correct. Rotation of the radius on the ulna happens at the superior and inferior radio-ulnar joints, both pivot joints, working together.',
        C: 'The shoulder rotates the whole limb medially and laterally, which looks like pronation when the elbow is extended but happens at a different joint entirely.',
        D: 'The radio-carpal joint is ellipsoid and gives flexion, extension, abduction and adduction. The hand appears to turn over with the forearm only because it follows the radius.',
      },
    },
    {
      key: 'the-axillary-nerve-innervates-select-the-correct-answer-a0873b90',
      conceptKey: 'axillary-nerve-injury-shoulder-dislocation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the two muscles supplied by the axillary nerve.',
      explanations: {
        A: 'Supraspinatus belongs to the suprascapular nerve, from the upper trunk. Pairing it with deltoid mixes the two nerves that cross the top of the shoulder.',
        B: 'Correct. The axillary nerve supplies deltoid and teres minor, and nothing else.',
        C: 'Teres major is supplied by the lower subscapular nerve, another posterior cord branch, and this option keeps only teres minor from the true pair.',
        D: 'The same swap in the other direction: deltoid is right and teres major wrong.',
      },
    },
    {
      key: 'transverse-humeral-ligament-7ff2f6f7',
      conceptKey: 'shoulder-joint-type-ligaments-movements',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the attachments and the function of the transverse humeral ligament.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. The transverse humeral ligament bridges the two tuberosities and roofs the intertubercular groove, so D is true; A names the wrong second attachment, B names the wrong tendon and C credits it with a stabilising role it does not have.',
      explanations: {
        A: 'It runs from the lesser tuberosity to the greater tuberosity — from one tuberosity to the other, not from the tuberosity to the anatomical neck.',
        B: 'The wrong muscle by one word. What runs in the intertubercular groove is the tendon of the long head of *biceps*; the long head of triceps arises from the infraglenoid tubercle and goes the other way.',
        C: 'A retinaculum, not a stabiliser. It holds a tendon in its groove; the stability of the shoulder comes from the rotator cuff and the coraco-acromial arch.',
        D: 'Correct. Roofing the groove converts it into a canal through which the biceps tendon runs, and that is the ligament\'s whole purpose.',
      },
    },
    {
      key: 'which-muscles-are-innervated-by-the-axillary-nerve-fb35669b',
      conceptKey: 'axillary-nerve-injury-shoulder-dislocation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the two muscles supplied by the axillary nerve.',
      explanations: {
        A: 'Supraspinatus and infraspinatus are the suprascapular nerve\'s two muscles — a genuine pair, but a different nerve\'s.',
        B: 'Correct. Deltoid and teres minor are the axillary nerve\'s two muscles.',
        C: 'The pectoral muscles are supplied by the lateral and medial pectoral nerves, from the cords in front of the axillary artery.',
        D: 'Latissimus dorsi takes the thoracodorsal nerve and teres major the lower subscapular. Both are posterior cord branches, like the axillary, which is what makes them plausible.',
      },
    },
    {
      key: 'an-example-of-bipennate-muscle-is-892b4e46',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Give the book\'s example of a bipennate muscle.',
      explanations: {
        A: 'Rectus abdominis is a strap muscle, interrupted by tendinous intersections. Its fibres run the length of the muscle, not obliquely onto a tendon.',
        B: 'Correct. Rectus femoris has a central tendon with fibres running into it from both sides, which is what bipennate means.',
        C: 'Sartorius is the standard strap-like muscle — the longest in the body and entirely parallel-fibred.',
        D: 'Deltoid is multipennate: several tendinous septa, not one. It is the next class up.',
      },
    },
    {
      key: 'an-example-of-multipennate-muscle-is-132e2b26',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Give the book\'s example of a multipennate muscle.',
      explanations: {
        A: 'Correct. Deltoid has several tendinous septa with fibres passing obliquely to each, which packs the greatest number of fibres into the muscle and makes it powerful.',
        B: 'Tibialis anterior is unipennate — one tendon with fibres on a single side.',
        C: 'There is no muscle called rectus anterior in this scheme; the name is built from rectus femoris and rectus abdominis, which are bipennate and strap-like.',
        D: 'Supinator wraps round the upper radius and is not classified by pennation at all.',
      },
    },
    {
      key: 'an-example-of-strap-like-muscle-is-ad9f5f2d',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Give the book\'s example of a strap-like muscle.',
      explanations: {
        A: 'Rectus abdominis is a strap muscle too, but the book\'s example of a *plain* strap muscle is sartorius; rectus abdominis is the one with tendinous intersections, and that is the distinction the pair of questions is testing.',
        B: 'Correct. Sartorius runs uninterrupted from the anterior superior iliac spine to the tibia, its fibres parallel throughout.',
        C: 'Deltoid is multipennate, the opposite extreme — built for power rather than range.',
        D: 'Supinator is a short, flat muscle wrapped round the radius and is not the book\'s example of anything here.',
      },
    },
    {
      key: 'an-example-of-strap-like-muscle-with-tendinous-intersections-84b24aae',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Give the book\'s example of a strap muscle with tendinous intersections.',
      explanations: {
        A: 'Sartorius is the plain strap muscle, with no intersections. It is the answer to the companion question, and that is exactly why it is offered here.',
        B: 'Deltoid is multipennate; its tendinous septa are not intersections crossing a strap but septa within a pennate muscle.',
        C: 'Correct. Rectus abdominis is a strap muscle crossed by three or more tendinous intersections, which is what makes the "six-pack" visible.',
        D: 'Tibialis anterior is unipennate.',
      },
    },
    {
      key: 'labrum-glenoidale-choose-the-correct-answer-9c93b31c',
      conceptKey: 'shoulder-joint-type-ligaments-movements',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Two defensible answers, and the fault is in the printing rather than the scan. Option B — "fibro-cartilaginous rim around glenoid cavity" — is the labrum\'s definition, and option D — "it helps in stability of the shoulder joint" — is also true, because deepening the socket is precisely how the labrum contributes to stability. Neither can be called wrong, so the question cannot be sat as a single-best-answer. A faculty reviewer, not a rescan. The department printing `labrum-glenoidale-choose-the-correct-answer-dep-book-em-em-e-3d0e7b3a` has the same two options and keys neither of them.',
    },
    {
      key: 'medial-rotation-of-the-shoulder-joint-can-be-performed-by-7df12e1b',
      conceptKey: 'shoulder-joint-movements-and-their-muscles',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick a medial rotator of the shoulder from a list containing two lateral rotators and an abductor.',
      explanations: {
        A: 'The posterior fibres of deltoid extend and laterally rotate. Only its anterior fibres rotate medially, and the option names the wrong set.',
        B: 'Infraspinatus is a lateral rotator, one of the two cuff muscles behind the joint.',
        C: 'Correct. Teres major adducts, extends and medially rotates the arm, going to the medial lip of the intertubercular groove.',
        D: 'Supraspinatus abducts and does not rotate at all.',
      },
    },
    {
      key: 'principal-muscle-concerned-in-extension-of-the-shoulder-join-06ce8e1c',
      conceptKey: 'shoulder-joint-movements-and-their-muscles',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the principal extensor of the shoulder joint.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. Latissimus dorsi is the principal extensor of the arm; the anterior fibres of deltoid flex, teres minor rotates laterally and serratus anterior acts on the scapula.',
      explanations: {
        A: 'The anterior fibres flex the arm. It is the posterior fibres of deltoid that assist extension, and naming the wrong set is the trap.',
        B: 'Teres minor is a lateral rotator and a cuff muscle. Being on the back of the joint is not the same as extending it.',
        C: 'Correct. Latissimus dorsi is the principal extensor, and it also adducts and medially rotates.',
        D: 'Serratus anterior protracts and upwardly rotates the scapula; it has no action at the shoulder joint itself.',
      },
    },
    {
      key: 'regarding-biceps-brachii-choose-the-correct-answer-ecd31023',
      conceptKey: 'biceps-brachii-heads-insertion-nerve-action',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the head of biceps that lies within the shoulder capsule, its actions and its nerve.',
      explanations: {
        A: 'The wrong head. It is the *long* head, from the supraglenoid tubercle, that runs inside the capsule; the short head arises outside the joint from the coracoid process.',
        B: 'Correct. Biceps crosses the elbow and flexes it — its most obvious action, and the only true statement here.',
        C: 'Reversed. Biceps is the powerful supinator; pronation is pronator teres and pronator quadratus.',
        D: 'The musculocutaneous nerve, not the median. The median nerve passes down the arm beside biceps without supplying it.',
      },
    },
    {
      key: 'regarding-quadrangular-space-in-axillary-region-one-is-corre-2027c7f8',
      conceptKey: 'intermuscular-spaces-quadrangular-triangular-boundaries-contents',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the four boundaries and the contents of the quadrangular space.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. The surgical neck of the humerus is the lateral boundary of the quadrangular space, so B is true; the space is bounded above by subscapularis and teres minor, below by teres major, and it transmits the axillary nerve and posterior circumflex humeral vessels rather than the circumflex scapular artery.',
      explanations: {
        A: 'Supraspinatus is above the spine of the scapula, far from this space. The upper boundary is subscapularis in front and teres minor behind.',
        B: 'Correct. The surgical neck closes the space laterally, which is why the axillary nerve winding through it is torn by a fracture there.',
        C: 'Teres minor is the upper boundary, not the lower; teres major is below. Getting the two the wrong way round is the standard error, because both are teres muscles on the same border of the scapula.',
        D: 'The circumflex scapular artery passes through the *upper triangular* space, medial to the long head of triceps. The quadrangular space carries the axillary nerve and the posterior circumflex humeral vessels.',
      },
    },
    {
      key: 'regarding-shoulder-joint-one-is-correct-95e113bb',
      conceptKey: 'shoulder-joint-capsule-bursae-and-nerve-supply',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Give the capsular attachment of the shoulder joint, which bursa communicates with it, and which head of biceps is intracapsular.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. Supraspinatus and deltoid are the two muscles that abduct the joint, so C is true; A is defeated by the word "entire", B names the wrong bursa and D the wrong head of biceps.',
      explanations: {
        A: 'True of part of the capsule and therefore a trap. The capsule reaches the anatomical neck all round *except* medially, where it descends about a centimetre onto the surgical neck; "entire" turns a partial truth into a falsehood.',
        B: 'The wrong bursa and the wrong direction. The subscapular bursa lies anteriorly and does communicate with the cavity; the subacromial bursa lies above and does not.',
        C: 'Correct. Supraspinatus initiates abduction and the middle fibres of deltoid carry it to ninety degrees; between them they abduct the joint.',
        D: 'The long head, not the short. The short head of biceps arises from the coracoid process, entirely outside the joint.',
      },
    },
    {
      key: 'regarding-the-axillary-nerve-ebf85310',
      conceptKey: 'axillary-nerve-injury-shoulder-dislocation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the cord of origin, the space it traverses, the muscles and the skin of the axillary nerve.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. The axillary nerve supplies deltoid and teres minor, which makes D true; it arises from the posterior cord, passes through the quadrangular space, and its cutaneous branch covers the skin over the lower half of the deltoid — the upper lateral arm, not the lower.',
      explanations: {
        A: 'The posterior cord. The axillary nerve is one of its two terminal branches, the other being the radial nerve, and both supply extensors.',
        B: 'Half a level out. The upper lateral cutaneous nerve of the arm, from the axillary, covers the skin over the lower half of the deltoid — the upper part of the lateral arm. The *lower* lateral side of the arm belongs to the radial nerve.',
        C: 'The quadrangular space, not the triangular. This is the single most examined fact about the nerve, because it is the space bounded laterally by the surgical neck.',
        D: 'Correct. Deltoid and teres minor are its two muscles, which is why its injury flattens the shoulder and weakens lateral rotation.',
      },
    },
    {
      key: 'regarding-the-shoulder-joint-f332cebf',
      conceptKey: 'shoulder-joint-capsule-bursae-and-nerve-supply',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Give the nerve supply of the shoulder joint and the relation of the subscapular bursa and the labrum to its cavity.',
      explanations: {
        A: 'The reverse of the truth. The subscapular bursa does communicate with the joint cavity, through a gap in the capsule beneath the tendon of subscapularis; it is the subacromial bursa that does not.',
        B: 'Correct. The joint takes its nerve supply from the axillary and suprascapular nerves, with the lateral pectoral nerve — the nerves of the muscles that cross it, following Hilton\'s law.',
        C: 'Inferiorly is precisely where the capsule has no support at all: no ligament and no muscle, which is why the head dislocates downwards.',
        D: 'Both are inside. The capsule is attached outside the labrum, and the supraglenoid tubercle with the long head of biceps arising from it lies within the joint.',
      },
    },
    {
      key: 'select-the-most-acceptable-answer-allowing-free-mobility-of-ecc4fd20',
      conceptKey: 'shoulder-joint-type-ligaments-movements',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Explain why the shoulder is the most mobile joint in the body, and separate the factors that free it from those that restrain it.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. The disproportion between a large humeral head and a small shallow glenoid is what allows the range, and it is the first factor the department book lists; the other three are restraining structures. The department printing `select-most-acceptable-answer-allowing-free-mobility-of-shou-051de2bf` keys A.',
      explanations: {
        A: 'Correct. Only about a third of the head is in contact with the glenoid at any time, so the head can roll and spin through a very wide arc before it runs out of socket.',
        B: 'The gleno-humeral ligaments restrain movement, weakly. Adding ligaments to a joint reduces mobility; it does not create it.',
        C: 'The capsule\'s attachment is lax, especially below, which permits movement — but laxity of the sleeve follows from the shape of the bones rather than causing the range.',
        D: 'The rotator cuff holds the head in the socket. It is the reason the joint does not dislocate during that range, not the reason the range exists.',
      },
    },
    {
      key: 'the-greater-tuberosity-of-the-humerus-choose-correct-answer-1c151f46',
      conceptKey: 'humeral-tuberosity-attachments-and-the-cuff-insertions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Assign each named muscle to the greater tuberosity, the lesser tuberosity or the intertubercular groove.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. The greater tuberosity carries three impressions for supraspinatus, infraspinatus and teres minor, so C is true; subscapularis takes the lesser tuberosity, and pectoralis major and teres major take the lips of the groove between them.',
      explanations: {
        A: 'Subscapularis is the one cuff muscle in front of the joint, and it reaches the *lesser* tuberosity. It is the whole reason there are two tuberosities to tell apart.',
        B: 'Pectoralis major goes to the lateral lip of the intertubercular groove, just beyond the greater tuberosity but not on it.',
        C: 'Correct. Teres minor takes the lowest of the three impressions on the greater tuberosity, below supraspinatus and infraspinatus.',
        D: 'One word out. Teres major goes to the medial lip of the groove, with latissimus dorsi; teres minor is the cuff muscle on the tuberosity.',
      },
    },
    {
      key: 'the-principal-muscle-concerned-in-extension-of-the-shoulder-42de3835',
      conceptKey: 'shoulder-joint-movements-and-their-muscles',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the principal extensor of the shoulder joint.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. Latissimus dorsi is the principal extensor of the arm; this is the same question as `principal-muscle-concerned-in-extension-of-the-shoulder-join-06ce8e1c`, asked twice.',
      explanations: {
        A: 'The anterior fibres of deltoid flex the arm. Extension is assisted by its posterior fibres.',
        B: 'Teres minor rotates the arm laterally; lying behind the joint does not make a muscle an extensor.',
        C: 'Correct. Latissimus dorsi extends, adducts and medially rotates the arm, and is the principal muscle of the first of those.',
        D: 'Serratus anterior moves the scapula, not the humerus.',
      },
    },
    {
      key: 'the-principal-muscle-concerned-in-medial-rotation-of-the-sho-058f792d',
      conceptKey: 'shoulder-joint-movements-and-their-muscles',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the principal medial rotator of the shoulder from a list containing an abductor and a lateral rotator.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Pectoralis major is the only medial rotator among the four: the middle fibres of deltoid abduct, supraspinatus does not rotate at all and teres minor rotates laterally. The department printing `principal-muscle-concerned-in-medial-rotation-of-the-shoulde-7f6c72cf` keys B, which is overridden there for the same reason.',
      explanations: {
        A: 'Correct. Pectoralis major, running from the front of the chest to the lateral lip of the intertubercular groove, adducts and medially rotates the arm powerfully.',
        B: 'The middle fibres of deltoid abduct. Only its anterior fibres rotate medially, and the option names the wrong set.',
        C: 'Supraspinatus is the rotator cuff muscle that does not rotate; it initiates abduction.',
        D: 'Teres minor rotates laterally — the opposite movement — and is offered because it is the neighbour of teres major, which does rotate medially.',
      },
    },
    {
      key: 'upper-medial-triangular-space-of-the-axilla-choose-the-corre-f3faea15',
      conceptKey: 'intermuscular-spaces-quadrangular-triangular-boundaries-contents',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No option is true as printed. The upper border of the upper triangular space is teres minor behind with subscapularis in front, and this printing\'s option A reads "teres minor and supraspinatum" — supraspinatus is not a boundary of any of the three spaces, so the option is false; the lower border is teres major and not subscapularis, the axillary nerve goes through the quadrangular space, and what this space transmits is the circumflex scapular artery, not the lower subscapular nerve. Three other printings of the question — `upper-medial-triangular-space-of-axilla-choose-correct-answe-56f5b91b` and `-cb30fb6f` and `-55777d04` — print option A as "Upper border by teres minor" alone and are answerable. Needs a faculty reviewer to say whether the second muscle is a misprint; a rescan of a page that already reads cleanly will not settle it.',
    },
    {
      key: 'which-muscles-is-supplied-by-the-medial-cord-of-the-brachial-dc0f4e19',
      conceptKey: 'brachial-plexus-formation-branches',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Trace a named muscle back to the cord of the brachial plexus that supplies it.',
      explanations: {
        A: 'Teres major is supplied by the lower subscapular nerve, a posterior cord branch — the extensor side of the plexus.',
        B: 'Deltoid takes the axillary nerve, also from the posterior cord.',
        C: 'Anconeus takes the radial nerve, the third posterior cord branch. Three of the four options are posterior cord, which is what the question is built on.',
        D: 'Correct. Pronator teres is supplied by the median nerve, which is formed by a medial root from the medial cord and a lateral root from the lateral cord — so the medial cord does contribute to it, and it is the only flexor here.',
      },
    },
    {
      key: 'which-one-of-the-following-muscles-is-inserted-into-the-grea-fac187d3',
      conceptKey: 'humeral-tuberosity-attachments-and-the-cuff-insertions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the muscle inserted into the greater tuberosity from a list of groove and lesser-tuberosity muscles.',
      explanations: {
        A: 'Subscapularis is inserted into the lesser tuberosity — the other one.',
        B: 'Correct. Teres minor takes the lowest impression on the greater tuberosity, with supraspinatus and infraspinatus above it.',
        C: 'Teres major goes to the medial lip of the intertubercular groove; the single letter that separates it from teres minor separates two different bony attachments.',
        D: 'Latissimus dorsi is inserted into the floor of the intertubercular groove, between the two teres muscles\' attachments.',
      },
    },
    {
      key: 'which-tendon-is-intracapsular-extrasynovial-of-the-shoulder-45ba3171',
      conceptKey: 'biceps-brachii-heads-insertion-nerve-action',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Explain why the tendon of the long head of biceps is inside the capsule of the shoulder joint but outside its synovial membrane.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. The tendon of the long head of biceps arises from the supraglenoid tubercle within the capsule and is sleeved in synovial membrane, so it lies inside the capsule and outside the synovial cavity.',
      explanations: {
        A: 'Correct. It crosses the head of the humerus inside the capsule, wrapped in its own synovial sheath, and leaves the joint through the intertubercular groove.',
        B: 'The short head arises from the coracoid process, outside the joint altogether.',
        C: 'The long head of triceps arises from the infraglenoid tubercle, which lies below and outside the capsular attachment.',
        D: 'Teres minor blends with the outer surface of the capsule as part of the rotator cuff; blending with the capsule is not the same as running within it.',
      },
    },
    {
      key: 'winging-of-scapula-follows-paralysis-of-which-muscle-ada87e95',
      conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the muscle whose paralysis wings the scapula.',
      explanations: {
        A: 'Correct. Serratus anterior holds the medial border of the scapula against the chest wall; when it goes, the border stands off and the scapula wings.',
        B: 'Deltoid paralysis flattens the shoulder and costs abduction from fifteen to ninety degrees. It does not touch the scapula.',
        C: 'Trapezius paralysis drops the shoulder and weakens retraction. It produces a different deformity, and a genuinely tempting one, because both muscles rotate the scapula upward.',
        D: 'Teres major runs from the scapula to the humerus and moves the arm, not the scapula against the chest.',
      },
    },
    {
      key: 'a-33-year-old-man-was-admitted-to-the-emergency-department-a-2232c243',
      conceptKey: 'brachial-plexus-formation-branches',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Reason from a pair of lost movements back to the single nerve that supplies both muscles.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Weakness of medial rotation and adduction after a fracture of the lateral border of the scapula points to subscapularis and teres major, and the lower subscapular nerve is the branch that supplies both.',
      explanations: {
        A: 'Correct. The lower subscapular nerve, from the posterior cord, supplies the lower part of subscapularis and teres major — a medial rotator and an adductor — and teres major arises from the lateral border of the scapula, which is the bone that broke.',
        B: 'The axillary nerve would cost abduction from fifteen to ninety degrees and flatten the shoulder. Medial rotation would be largely preserved, because deltoid\'s anterior fibres are only one of five medial rotators.',
        C: 'The radial nerve is an extensor nerve of the arm and forearm; a lesion gives wrist drop, not weak rotation at the shoulder.',
        D: 'The spinal accessory nerve supplies trapezius, and its injury drops the shoulder and weakens retraction. It has nothing to do with rotation of the humerus.',
      },
    },
    {
      key: 'a-33-year-old-man-was-admitted-to-the-emergency-department-a-e0b06ea4',
      conceptKey: 'brachial-plexus-formation-branches',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Reason from a pair of lost movements back to the single nerve that supplies both muscles.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. This is a second printing of the same case; subscapularis and teres major are the weakened muscles and the lower subscapular nerve supplies both.',
      explanations: {
        A: 'Correct. Teres major arises from the lateral border of the scapula, and it and subscapularis share the lower subscapular nerve — the one branch whose loss weakens medial rotation and adduction together.',
        B: 'The axillary nerve costs abduction and the contour of the shoulder, not adduction.',
        C: 'The radial nerve gives wrist drop and weak elbow extension; the shoulder is spared.',
        D: 'The spinal accessory nerve supplies trapezius, and a lesion drops the shoulder rather than weakening rotation.',
      },
    },
    {
      key: 'a-47-year-old-tennis-professional-female-was-informed-by-her-9ef0e458',
      conceptKey: 'rotator-cuff-four-muscles-and-shoulder-stability',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Name the ligament that impinges on the rotator cuff from above and say which cuff muscle it wears through.',
      answerOverride: 'D',
      answerOverrideReason: 'The printed key is C, and C is wrong: the gleno-humeral ligaments lie in front of the capsule and touch no cuff muscle. The coraco-acromial ligament roofs the joint, and repeated overhead movement grinds the supraspinatus tendon against it — the classic impingement that ends in a cuff tear.',
      explanations: {
        A: 'The acromioclavicular ligament joins the clavicle to the acromion above the joint and does not lie against any tendon.',
        B: 'The coraco-humeral ligament strengthens the upper capsule and blends with supraspinatus rather than abrading it; it is the closest wrong answer here.',
        C: 'The key the book prints. The three gleno-humeral ligaments are anterior thickenings of the capsule and lie deep to subscapularis, not against a tendon that moves beneath them.',
        D: 'Correct. With the coracoid and the acromion the coraco-acromial ligament forms the coraco-acromial arch, and the supraspinatus tendon with the subacromial bursa slides beneath it every time the arm is raised.',
      },
    },
    {
      key: 'a-man-came-with-fracture-of-the-surgical-neck-of-the-humerus-8ad580b2',
      conceptKey: 'axillary-nerve-injury-shoulder-dislocation',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the movement to test when the axillary nerve is at risk, and say why it is that movement.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. A fracture of the surgical neck endangers the axillary nerve, whose muscle deltoid abducts the arm from fifteen to ninety degrees; abduction is therefore the movement that shows the lesion.',
      explanations: {
        A: 'Flexion is anterior deltoid, pectoralis major, coracobrachialis and biceps together, so an axillary lesion barely weakens it.',
        B: 'Extension is latissimus dorsi and teres major, neither of which is axillary; it would be normal.',
        C: 'Rotation is spread across five medial rotators and three lateral ones, so losing teres minor and part of deltoid leaves it nearly intact.',
        D: 'Correct. Deltoid is the only muscle that abducts from fifteen to ninety degrees, so abduction fails at once and unambiguously — which makes it the movement to test.',
      },
    },
    {
      key: 'a-man-came-with-fracture-of-the-surgical-neck-of-the-humerus-aa1d70b0',
      conceptKey: 'axillary-nerve-injury-shoulder-dislocation',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the movement to test when the axillary nerve is at risk, and say why it is that movement.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. This is the second printing of the same case; abduction is the movement deltoid alone performs, so it is the one that confirms an axillary nerve lesion.',
      explanations: {
        A: 'Flexion has four muscles behind it and is barely weakened.',
        B: 'Extension is latissimus dorsi and teres major, both unaffected.',
        C: 'Rotation is shared by many muscles; losing teres minor alone will not abolish it.',
        D: 'Correct. Deltoid is the sole abductor between fifteen and ninety degrees, so its paralysis shows there first.',
      },
    },
    {
      key: 'aii-muscles-attached-to-bicipital-intertubercular-groove-can-e5efec10',
      conceptKey: 'humeral-tuberosity-attachments-and-the-cuff-insertions',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Name the three muscles of the intertubercular groove and give the action they share.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. The three groove muscles are pectoralis major, latissimus dorsi and teres major, and the movement all three produce is adduction of the arm; extension is not shared, because pectoralis major flexes.',
      explanations: {
        A: 'None of the three abducts. All three pull the humerus towards the trunk, which is the opposite movement.',
        B: 'Correct. Pectoralis major on the lateral lip, latissimus dorsi on the floor and teres major on the medial lip all adduct the arm, and all three also rotate it medially.',
        C: 'The near miss. Latissimus dorsi and teres major extend, but pectoralis major flexes, so extension is not common to all the groove muscles — and the word "all" in the stem is what decides it.',
        D: 'All three rotate the arm medially, not laterally; lateral rotation is infraspinatus, teres minor and the posterior fibres of deltoid.',
      },
    },
    {
      key: 'an-example-of-multipennate-muscle-is-dep-book-vi-p-62438480',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Give the book\'s example of a multipennate muscle.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Deltoid is the book\'s multipennate example; the sibling printing `an-example-of-multipennate-muscle-is-132e2b26`, asked twice, keys A.',
      explanations: {
        A: 'Correct. Deltoid\'s several tendinous septa with obliquely set fibres make it multipennate, which is what gives it its power.',
        B: 'Tibialis anterior is unipennate: one tendon with fibres on one side only.',
        C: '"Rectus anterior" is not a muscle in this classification; the rectus muscles named here are rectus femoris, which is bipennate, and rectus abdominis, which is a strap.',
        D: 'Supinator is a flat sheet wrapped round the radius, not a pennate muscle.',
      },
    },
    {
      key: 'an-example-of-strap-like-muscle-with-tendinous-intersections-ff33347b',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A scan casualty. The stem has swallowed options A, B and C, and one of the surviving options — "Deoxygenated blood passes through the aorta to all tissues of the body" — belongs to a cardiovascular question on another page altogether, so the option set is not this question\'s. The intact copy is `an-example-of-strap-like-muscle-with-tendinous-intersections-84b24aae`, asked twice. Recoverable by rescanning; kept here so the duplicate is visible.',
    },
  ],
}
