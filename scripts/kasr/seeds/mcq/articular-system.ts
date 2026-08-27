/**
 * `101 ISK > Anatomy > Basis of Anatomy > Articular system` — the question books' MCQs.
 *
 * Thirteen rows and only nine distinct questions: the elbow is asked twice in
 * two wordings each, and in both pairs one copy is cleaner than the other. The
 * dirty copies stay here excluded, so a rescan knows they are duplicates rather
 * than lost questions.
 *
 * Four concepts, none of them minted here. `fibrous-joints-types-definition`,
 * `primary-versus-secondary-cartilaginous-joints` and
 * `synovial-joint-structure-characters` already exist from the sat papers, and
 * `elbow-joint-type-bones-ligaments` already exists in
 * `seeds/mcq/joints-of-upper-limb.ts`. All four definitions below are copied
 * verbatim from those sources, so re-emitting them is an update that changes
 * nothing but the exam signal. The elbow one is the cross-leaf case the
 * contract warns about: the builder merges concepts by key across leaves, and
 * a byte-identical copy makes the merge harmless whichever leaf it takes.
 *
 * Five answers overridden, four of them because the printed key is wrong. This
 * leaf is one of the bad clusters: "an example of a secondary cartilaginous
 * joint" is keyed to the shoulder joint, the tooth-socket question is keyed to
 * syndesmosis, and "one of the following is a character of the secondary
 * cartilaginous joint" is keyed to a potential cavity. None of those survive
 * reading the department book's own chapter 4.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Articular system',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
  articleId: 'ART-101-ANA-SYNOVIAL-JOINTS',

  concepts: [
    {
      key: 'synovial-joint-structure-characters',
      label: 'A synovial joint is seven named components around a potential cavity',
      definition: 'A synovial joint is freely mobile and present mostly in the limbs. It is formed of a fibrous capsule surrounding the joint, lined by synovial membrane and strengthened by strong ligaments; articular cartilage, hyaline cartilage covering the articular surfaces, smooth, lubricated by synovial fluid, with no blood vessels or nerves and nourished from the fluid; a joint cavity which is potential, holding only a thin film of fluid and becoming manifest if fluid, blood or pus collects; a synovial membrane, thin, moist and glistening, covering everything inside the joint except the articular surfaces and secreting and absorbing the fluid; synovial fluid, pale yellow and viscous like egg albumin, containing synovial cells, macrophages and lymphocytes; ligaments, capsular, extracapsular and intracapsular; and intra-articular structures such as a fibrocartilaginous disc, menisci, ligaments or a tendon.',
      objective: 'Name the seven components of a synovial joint and describe what each contributes.',
      pitfall: 'Calling the joint cavity a space. It is a potential cavity with only a film of fluid; it becomes an actual space only when disease fills it.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
      type: 'structural_description',
    },
    {
      key: 'fibrous-joints-types-definition',
      label: 'A fibrous joint is an immobile union by fibrous tissue, in three named types',
      definition: 'A fibrous joint is a joint in which the bone surfaces are connected by fibrous tissue and which is fixed or immobile. There are three types: syndesmosis, where the bones are held by an interosseous ligament, as at the inferior tibio-fibular joint; gomphosis, where a tooth root is held in its socket by the periodontal ligament; and suture, where skull bones are held by a thin sutural ligament, obliterated in old age.',
      objective: 'Define a fibrous joint and name its three types with the ligament and example of each.',
      pitfall: 'Naming the three types without the connecting tissue. It is the named ligament — interosseous, periodontal, sutural — that distinguishes them, not the site alone.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
      type: 'classification',
    },
    {
      key: 'primary-versus-secondary-cartilaginous-joints',
      label: 'Primary cartilaginous joints are hyaline and temporary; secondary ones are fibrocartilaginous and midline',
      definition: 'A primary cartilaginous joint (synchondrosis) unites bones by hyaline cartilage, is usually temporary and ossifies with growth, and permits no movement — the epiphyseal plate is the type example. A secondary cartilaginous joint (symphysis) unites bones by fibrocartilage, lies in the midline, is permanent and permits slight movement, as at the pubic symphysis and intervertebral discs.',
      objective: 'Compare primary and secondary cartilaginous joints by the cartilage involved, permanence, site and movement.',
      pitfall: 'Assuming every cartilaginous joint disappears. Only the primary ones ossify; a symphysis is there for life.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
      type: 'classification',
    },
    {
      // Verbatim from `seeds/mcq/joints-of-upper-limb.ts`, including its own
      // modulePath. The elbow is the department book's type example of a
      // compound hinge, and the books ask about it from both chapters; two
      // concepts for it would halve a student's mastery of one joint.
      key: 'elbow-joint-type-bones-ligaments',
      label: 'The elbow is a synovial hinge between humerus, ulna and radius, held by collateral ligaments',
      definition: 'The elbow is a synovial joint of hinge type, between the trochlea and capitulum of the humerus above and the trochlear notch of the ulna and the head of the radius below. The radial collateral ligament runs from the lateral epicondyle to the anular ligament; the ulnar collateral ligament is triangular, running from the medial epicondyle in anterior, posterior and oblique bands to the coronoid process and olecranon.',
      objective: 'Classify the elbow joint, name its articulating bony parts, and describe its collateral ligaments.',
      pitfall: 'Including the superior radio-ulnar joint in the elbow. It shares the capsule but is a separate pivot joint, and the anular ligament belongs to it.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
      type: 'structural_description',
    },
  ],

  questions: [
    {
      key: 'regarding-the-elbow-joint-choose-the-correct-answer-8103e900',
      conceptKey: 'elbow-joint-type-bones-ligaments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the bones that form the elbow, classify it, and say what the capsule is and is not attached to.',
      explanations: {
        A: 'Three bones meet here — the lower end of the humerus above, the upper ends of the ulna and radius below — which is what makes the elbow a textbook example of a compound joint.',
        B: 'Coracobrachialis crosses the shoulder, not the elbow: it runs from the coracoid process to the middle of the humeral shaft and so cannot flex the elbow. Picked because its name contains "brachii" territory and it is learnt beside biceps, which does flex the elbow.',
        C: 'The capsule is attached to the neck of the radius through the anular ligament, deliberately not to the head. Anything anchored to the head would stop it spinning and abolish pronation and supination.',
        D: 'The classic swap. The pivot in this region is the superior radio-ulnar joint, which shares the elbow\'s capsule but is a separate joint; the elbow itself is a uniaxial hinge, held to flexion and extension by strong collateral ligaments.',
      },
    },
    {
      key: 'an-example-of-a-secondary-cartilaginous-joint-dep-book-2016-3ef45af2',
      conceptKey: 'primary-versus-secondary-cartilaginous-joints',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Recognise a secondary cartilaginous joint by its midline position and fibrocartilaginous disc.',
      answerOverride: 'A',
      answerOverrideReason: 'The book prints C, the sacroiliac joint, which is wrong: the sacroiliac is a synovial plane joint anteriorly with a posterior syndesmosis, and carries no fibrocartilaginous disc. The intervertebral joint is the department book\'s own named example of a secondary cartilaginous joint, and the option-list bleed in the stem shows the list itself began "a- Intervertebral".',
      explanations: {
        A: 'Two vertebral bodies, each capped by thin hyaline cartilage, are united by a white fibrocartilaginous disc in the midline, permanently and with slight movement — every criterion of a secondary cartilaginous joint.',
        B: 'A skull suture is fibrous, not cartilaginous: the bones are held by a thin sutural ligament, and it is immobile. Picked by students who remember only that sutures are not synovial.',
        C: 'The sacroiliac joint tempts because it is axial and barely mobile, so it feels like a symphysis. It is a synovial plane joint, and the pubic symphysis — not the sacroiliac — is the pelvic secondary cartilaginous joint.',
        D: 'The distal (inferior) tibio-fibular joint is a syndesmosis, a fibrous joint held by an interosseous ligament. Chosen when "held by tissue rather than a cavity" is read as cartilaginous.',
      },
    },
    {
      key: 'in-what-joint-is-the-root-of-the-tooth-attached-to-a-periodo-7dc07036',
      conceptKey: 'fibrous-joints-types-definition',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Attach the periodontal ligament to gomphosis and to no other fibrous joint.',
      answerOverride: 'A',
      answerOverrideReason: 'The book prints C, syndesmosis. The stem gives the definition of a gomphosis word for word — a tooth root held in its socket by the periodontal ligament — and syndesmosis is the interosseous-ligament type at the inferior tibio-fibular joint. The same question elsewhere in this leaf is keyed A.',
      explanations: {
        A: 'A gomphosis is a peg-in-socket fibrous joint, and the peg is a tooth root: the periodontal ligament holding it in the alveolus of the maxilla or mandible is what names it.',
        B: 'A suture also uses a fibrous ligament, the sutural ligament, but it unites two flat skull bones edge to edge, not a peg in a hole. Picked by students who group all three fibrous joints under "skull".',
        C: 'Syndesmosis is the third fibrous type and is held by an interosseous ligament, as between the lower ends of tibia and fibula. It is the printed key here and it is wrong: no tooth is involved.',
        D: 'Not a separate class — a serrate suture is one shape of suture, and adding the shape does not make it a tooth joint. Chosen when the longer, more technical-sounding option is assumed to be the more precise one.',
      },
    },
    {
      key: 'one-of-the-following-is-a-character-of-the-secondary-cartila-dba26b57',
      conceptKey: 'primary-versus-secondary-cartilaginous-joints',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Separate the characters of the secondary cartilaginous joint from those of the primary and of the synovial joint.',
      answerOverride: 'C',
      answerOverrideReason: 'The book prints D, a potential cavity, which belongs to the synovial joint and to no cartilaginous joint at all. Being midline is the department book\'s stated character of the secondary cartilaginous joint; temporary and immobile are the primary\'s.',
      explanations: {
        A: 'Temporary belongs to the primary cartilaginous joint, which ossifies with growth — the epiphyseal plate is gone by adulthood. A symphysis is permanent, and this is the single most common swap in the pair.',
        B: 'Immobile is again the primary joint. The secondary joint\'s fibrocartilaginous disc is elastic, and that elasticity is exactly what gives it its limited movement.',
        C: 'Secondary cartilaginous joints lie in the median plane — the intervertebral discs, the pubic symphysis, the manubriosternal joint — and position is their defining character.',
        D: 'The printed key, and the trap: a potential cavity is a synovial joint character. A cartilaginous joint has cartilage between the bones and therefore no cavity, potential or otherwise.',
      },
    },
    {
      key: 'regarding-characters-of-the-synovial-joint-one-is-wrong-2022-f6956691',
      conceptKey: 'synovial-joint-structure-characters',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'State which cartilage covers an articular surface and why it is not elastic.',
      answerOverride: 'C',
      answerOverrideReason: 'The book prints B, the fibrous capsule, which is the first of the seven components and plainly a true character. The false statement is C: articular cartilage is hyaline, not yellow elastic — elastic cartilage is found in the pinna and epiglottis and never on an articular surface.',
      explanations: {
        A: 'True, so not the wrong one. The joint cavity is one of the seven components, potential rather than open, and holding only a film of fluid.',
        B: 'True, so not the wrong one, and the printed key is wrong to name it. The fibrous capsule surrounds the joint, is lined by synovial membrane and is what the ligaments strengthen.',
        C: 'The wrong statement, and the answer. Articular cartilage is hyaline: smooth, avascular, without nerves, nourished from the synovial fluid. Yellow elastic cartilage is the pinna and epiglottis, and a surface that bends would not hold a joint.',
        D: 'True, so not the wrong one. Capsular, extracapsular and intracapsular ligaments are the sixth component and the chief factor in the joint\'s stability.',
      },
    },
    {
      key: 'what-is-the-type-of-joint-that-connects-the-roots-of-the-tee-59fe3020',
      conceptKey: 'fibrous-joints-types-definition',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the joint between a tooth root and its socket.',
      explanations: {
        A: 'Gomphosis is the fibrous peg-in-socket joint, and the tooth in its alveolus held by the periodontal ligament is its only example in the body.',
        B: 'A suture is fibrous too, and the maxilla the tooth sits in is a skull bone — which is what makes this tempting. A suture unites two bones edge to edge; a tooth is not a bone of the vault.',
        C: 'The sacroiliac joint is synovial and pelvic, and appears here only as filler. Chosen when a student recognises none of the terms and picks the joint they can name.',
        D: 'Synovial is the freely mobile class with a capsule and a cavity. A tooth that moved freely in its socket would be a tooth about to be lost, which is the point of the periodontal ligament being fibrous.',
      },
    },
    {
      key: 'which-of-the-following-contains-a-joint-cavity-2021-b5f58346',
      conceptKey: 'synovial-joint-structure-characters',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Recognise that a joint cavity is the property of a synovial joint alone.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Of the four, only the knee is synovial, and a joint cavity — even a potential one — exists in no other class of joint.',
      explanations: {
        A: 'The knee is a synovial joint, and a synovial joint is the only class with a cavity: potential in health, becoming a real space when effusion, blood or pus collects.',
        B: 'The intervertebral joint is a secondary cartilaginous joint, whose fibrocartilaginous disc fills the space entirely. Picked by students who imagine the nucleus pulposus as fluid in a cavity — it is a gel within cartilage, with no synovial lining.',
        C: 'A suture is fibrous and the bones are held edge to edge by a sutural ligament, with no gap at all. In old age it does not open; it ossifies shut.',
        D: 'The inferior tibio-fibular joint is a syndesmosis, held by an interosseous ligament. Chosen because a ligament between two bones suggests a gap, but the ligament fills it.',
      },
    },
    {
      key: 'which-of-the-following-is-true-in-respect-to-the-elbow-joint-1bea29e3',
      conceptKey: 'elbow-joint-type-bones-ligaments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the ligaments, the type, and the vessels and nerves of the elbow, and reject the ones borrowed from elsewhere.',
      answerOverride: 'A',
      answerOverrideReason: 'This copy printed no key. The near-identical row `which-of-the-following-is-true-in-respect-to-the-elbow-joint-b4b873c4` is keyed A, and A is the only true statement of the four: the radial and ulnar collateral ligaments are the elbow\'s named ligaments.',
      explanations: {
        A: 'The radial collateral runs from the lateral epicondyle to the anular ligament and the ulnar collateral from the medial epicondyle in three bands to the coronoid process and olecranon; between them they confine the elbow to flexion and extension.',
        B: 'A plane joint has flat surfaces and gliding movement without an axis — the intercarpal and superior tibio-fibular joints. The elbow has a trochlea articulating with a trochlear notch, which is the definition of a hinge.',
        C: 'The cephalic and basilic are veins, not arteries, and they are superficial veins of the limb that supply nothing. The elbow is supplied by the anastomosis around it, from the brachial, profunda brachii, radial and ulnar arteries.',
        D: 'The axillary nerve serves the shoulder, not the elbow; the elbow is supplied by branches of the musculocutaneous, radial, median and ulnar nerves — the nerves of the muscles that move it, which is Hilton\'s law. Picked by pairing the one elbow-crossing nerve in the list with a familiar name.',
      },
    },
    {
      key: 'an-example-of-a-secondary-cartilaginous-joint-is-2024-863c03c7',
      conceptKey: 'primary-versus-secondary-cartilaginous-joints',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived the scan — A, B and C — and a three-option question cannot be sat. The printed key is separately wrong: it names A, the shoulder joint, which is synovial ball-and-socket; the correct answer among the survivors is B, the intervertebral disc. A rescan of the 2024 page should recover option D and the row becomes usable with answer B.',
    },
    {
      key: 'regarding-the-clavicle-choose-the-correct-statement-2016-em-06090d8d',
      conceptKey: 'synovial-joint-structure-characters',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option B was lost entirely — the row carries A, C and D only — and none of the three survivors is true: the medial end articulates with the manubrium by a synovial saddle joint, not a cartilaginous one (A) and not with the body of the sternum (C), and the lateral end meets the acromion at a synovial plane joint, not a fibrous one (D). The answer was therefore in the missing B. A rescan of the 2016 page recovers it; until then the question has no correct option to key.',
    },
    {
      key: 'the-lining-of-the-brous-capsule-of-the-synovial-joint-is-the-68c63c0a',
      conceptKey: 'synovial-joint-structure-characters',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      excludeReason: 'Only three options survived — A, B and C — and a three-option question cannot be sat. The answer is not in doubt: the synovial membrane lines the fibrous capsule, so A is correct and the row becomes usable the moment a rescan of the 2023 page recovers option D. Kept so that rescan is worth doing.',
      exclude: true,
      explanations: {},
    },
    {
      key: 'regarding-the-elbow-joint-choose-the-correct-answer-1-9bff8f14',
      conceptKey: 'elbow-joint-type-bones-ligaments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The same question as `regarding-the-elbow-joint-choose-the-correct-answer-8103e900`, in a worse copy: option A is cut shorter, C and D carry OCR damage, the stem ends in a stray Arabic numeral, and this copy printed no key while the other did. The other copy is the one to use. Kept here so that whoever rescans the page knows this row is a duplicate and not a separate question.',
    },
    {
      key: 'which-of-the-following-is-true-in-respect-to-the-elbow-joint-b4b873c4',
      conceptKey: 'elbow-joint-type-bones-ligaments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The same question as `which-of-the-following-is-true-in-respect-to-the-elbow-joint-1bea29e3`, with a fifth option E — "Superior radio-ulnar joint only" — that answers no part of this stem and has evidently bled in from the neighbouring question on the page. Its key, A, is sound and is what the clean copy is overridden to. Kept so a rescan can confirm the bleed rather than treat E as a real option.',
    },
  ],
}
