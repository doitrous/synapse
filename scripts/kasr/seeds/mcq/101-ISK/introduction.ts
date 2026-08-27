/**
 * `101 ISK > Anatomy > Basis of Anatomy > Introduction` — the question books' MCQs.
 *
 * The bank files fifty-four rows under this leaf and only sixteen of them are
 * about it. The rest are upper-limb items — flexor pollicis longus, the wrist
 * joint, the carrying angle, the brachial artery — that reached this leaf
 * because their stems carry words like "proximal" and "lateral", which is
 * exactly the vocabulary this chapter teaches. Those rows belong to the Upper
 * Limb leaves and are left to their authors rather than dragged in here; a
 * question is not about anatomical terminology merely because it uses it.
 *
 * What is left is a three-page chapter asked in three ways, over and over: what
 * the anatomical position is, what each plane cuts, and what one term of
 * position means. Eight rows are sittable and eight are not, and the split is
 * almost entirely between a clean printing and a "(DEP BOOK)" reprint of the
 * same question that lost its key, its first option, or both.
 *
 * The two anatomical-position rows show why the copy with the answer is not
 * always the copy to import. `anatomical-position-is-ebd3fee8` is keyed and was
 * asked twice, but its options C and D are both truncated to "…with feet
 * parallel and", so the one thing that separates them — palms forwards against
 * palms backwards — is missing from the page. Its unkeyed twin prints both in
 * full. The twin is imported with the key its sibling supplies, and the keyed
 * copy is excluded, with the reason recorded rather than the truncation
 * quietly repaired.
 *
 * One answer conflicts with the department book. `near-to-the-median-plane-is`
 * is keyed D, "Inferior", and the book's own table of terms of position gives
 * medial as "nearer to the median plane". The override says so.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Introduction',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Introduction',
  articleId: 'ART-101-ANA-INTRODUCTION',

  concepts: [
    {
      key: 'anatomical-erect-position-is-the-reference-for-all-description',
      label: 'Every anatomical description assumes the erect position: standing, eyes forward, arms at the sides, palms facing forwards',
      definition: 'The anatomical erect position is the reference position for describing the anatomy of the body: the body stands erect, the eyes look forwards, the upper limbs hang by the sides, the palms face forwards and the thumbs are directed laterally. Every term of position — anterior, medial, proximal — is stated as though the body were in it, whatever posture the patient is actually in. The other four positions are clinical postures, not references: supine, lying on the back; prone, lying on the face; lithotomy, on the back with hip and knee flexed and the hips abducted; and lateral decubitus, lying on the right or left side.',
      objective: 'State the anatomical erect position in full and name its four other positions.',
      pitfall: 'Forgetting the palms. Every other element of the position is the posture a person naturally stands in; supinated forearms are the one deliberate part, and it is the part examiners test.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Introduction',
      type: 'structural_description',
      aliases: ['Anatomical position'],
    },
    {
      key: 'anatomical-planes-median-coronal-horizontal',
      label: 'The three anatomical planes are named by the two parts each one leaves behind',
      definition: 'The median (sagittal) plane is the vertical plane passing in the midline of the body, dividing it into equal right and left halves; a paramedian plane is parallel to it and near it, and therefore gives unequal halves. The coronal (frontal) plane cuts the body vertically into an anterior part towards the front and a posterior part towards the back. The horizontal (transverse) plane runs horizontally, cutting the body into an upper (superior) and a lower (inferior) part.',
      objective: 'Name each anatomical plane, say in which direction it runs and which two parts it divides the body into.',
      pitfall: 'Reading "vertical" as identifying the plane. Both the median and the coronal plane are vertical; what separates them is the pair of parts left behind — right and left for the median, front and back for the coronal.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Introduction',
      type: 'classification',
      aliases: ['Planes of the body', 'Sagittal plane', 'Frontal plane', 'Transverse plane'],
    },
    {
      key: 'terms-of-position-medial-lateral-proximal-distal',
      label: 'Medial and lateral are measured from the median plane; proximal and distal from the root of the limb',
      definition: 'There are fourteen terms of position. Median is exactly in the midline; medial is nearer to the median plane and lateral away from it. Proximal is nearer to the root of the limb and distal away from it. Anterior (ventral) is nearer the front and posterior (dorsal, retro-) nearer the back; superior (cranial) is upper and inferior (caudal) lower; external (outer) is near or on the surface and internal (inner) inside; superficial is towards the skin and deep away from it; peri- means around.',
      objective: 'Give the term for a stated relation, and name the reference — the median plane, the root of the limb, or the skin — that each pair is measured from.',
      pitfall: 'Using medial and proximal interchangeably because both mean "towards the middle of something". They measure from different things: medial from the median plane of the body, proximal from where the limb joins the trunk.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Introduction',
      type: 'classification',
      aliases: ['Terms of position', 'Anatomical terminology'],
    },
  ],

  questions: [
    {
      key: 'anatomical-position-is-dep-book-vi-65a19742',
      conceptKey: 'anatomical-erect-position-is-the-reference-for-all-description',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Pick the full statement of the anatomical erect position from four near-identical postures.',
      answerOverride: 'C',
      answerOverrideReason: 'This copy printed no key. The identical row `anatomical-position-is-ebd3fee8`, asked twice, is keyed C — and this is the only copy in which C and D are printed in full, so it is the only copy in which the key can be acted on at all.',
      explanations: {
        A: 'Sitting is not the reference. A position that changes with the chair could not be a reference for describing anything; the anatomical position is standing, and it is fixed.',
        B: 'Lying down with the arms at the sides is the supine position, named separately. It is a clinical posture, not the reference posture.',
        C: 'This is complete: erect, facing front, feet parallel, arms hanging at the sides, palms facing forwards. The palms are what make this statement the right one.',
        D: 'Identical to C except that the palms face backwards — which is where they naturally hang, and therefore the option a student who has never noticed the detail will pick. In the anatomical position the forearms are supinated so the palms face forwards and the thumbs point laterally.',
      },
    },
    {
      key: 'anatomical-position-is-ebd3fee8',
      conceptKey: 'anatomical-erect-position-is-the-reference-for-all-description',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The keyed copy, and unusable because of where the page was cut. Options C and D both end at "with feet parallel and", so the two are word-for-word identical as extracted and the whole discrimination — palms forwards against palms backwards — is off the page. Its unkeyed twin `anatomical-position-is-dep-book-vi-65a19742` prints both options in full and is imported instead, carrying this row\'s key. Kept here so a rescan knows this row is that question and not a second one.',
    },
    {
      key: 'the-following-statement-describes-the-anatomical-position-2c2d48ff',
      conceptKey: 'anatomical-erect-position-is-the-reference-for-all-description',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Identify the one statement about the anatomical position that is true, given three that invert a detail of it.',
      explanations: {
        A: 'Reversed. The eyes look forwards; a body facing one way with the eyes looking the other is not a posture anyone could hold, which is what makes this the easiest option to eliminate.',
        B: 'The upper limbs hang by the sides — the only one of the four statements printed as given.',
        C: 'Reversed, and the commonest error in this leaf. The palms face forwards, not backwards; this is the one element of the position that is not the way a body naturally stands.',
        D: 'Reversed. The thumbs are directed laterally, which follows from the palms facing forwards. A student who put the palms backwards will put the thumbs medially too, so the two errors travel together.',
      },
    },
    {
      key: 'the-following-statement-describes-the-anatomical-position-de-8d4f558c',
      conceptKey: 'anatomical-erect-position-is-the-reference-for-all-description',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-following-statement-describes-the-anatomical-position-2c2d48ff` whose first option was swallowed by the stem — the stem ends "ad ad ViPa- The eyes are looking backwards" — so the row carries three options and no key. The clean, keyed copy is imported. Kept so a rescan reads this as a duplicate rather than a lost question.',
    },
    {
      key: 'the-plane-which-divides-the-body-into-2-equal-halves-right-a-10cc7567',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the plane that divides the body into equal right and left halves.',
      answerOverride: 'A',
      answerOverrideReason: 'This copy printed no key. Its twin `the-plane-which-divides-the-body-into-2-equal-halves-right-a-8f461c93` is keyed A, and A is what the department book states: the median (sagittal) plane passes in the midline and gives equal right and left halves.',
      explanations: {
        A: 'The median or sagittal plane runs vertically in the midline, and the word "equal" is what selects it over the paramedian plane.',
        B: 'The coronal plane is vertical too, which is why it is picked. It divides the body into anterior and posterior parts, not right and left.',
        C: 'The trap the word "equal" is in the stem for. The paramedian plane is parallel to the median plane and near it, so it also gives a right and a left part — unequal ones.',
        D: 'The horizontal plane cuts across the body into an upper and a lower part. It divides nothing into right and left.',
      },
    },
    {
      key: 'the-plane-which-divides-the-body-into-2-equal-halves-right-a-8f461c93',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The same question as `the-plane-which-divides-the-body-into-2-equal-halves-right-a-10cc7567`, keyed A, but its option A reads "l\'\'edian plane" — the answer itself is the option the scan mangled. The clean copy is imported and carries this row\'s key. Kept so the key is not lost with the row.',
    },
    {
      key: 'a-plane-which-separates-the-body-into-an-anterior-and-poster-c24619ff',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the plane that separates the body into an anterior and a posterior part.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. The department book defines the coronal (frontal) plane as the one cutting the body vertically into an anterior part towards the front and a posterior part towards the back, so D is the only option that answers the stem.',
      explanations: {
        A: 'The median plane is vertical like the coronal, but it separates right from left.',
        B: '"Sagittal" is the second name of the median plane, so this option is A again under another name — and two identical options cannot both be the answer, which is itself a way to eliminate them.',
        C: 'The horizontal plane gives an upper and a lower part. A student picks it when reading "separates the body into two parts" and stopping there.',
        D: 'Coronal, also called frontal: a vertical plane leaving an anterior part in front and a posterior part behind.',
      },
    },
    {
      key: 'which-of-the-following-is-true-about-the-coronal-plane-3a7e46a0',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Say both what the coronal plane cuts and which way it runs.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. B is the only true statement: the coronal plane divides the body into an anterior and a posterior part. The book says "parts" rather than "halves", and the item\'s wording is looser than the book\'s, but no other option is defensible — A and C describe the horizontal plane and D the median.',
      explanations: {
        A: 'The coronal plane is vertical, not horizontal. This option and C are the same error stated twice, which is a sign that neither is the answer.',
        B: 'In the exact wording: the coronal plane cuts the body vertically into an anterior part towards the front and a posterior part towards the back. The wording says "parts"; only a plane through the exact mid-thickness of the body would give halves.',
        C: 'Upper and lower is the horizontal (transverse) plane. Picked by students who remember that the coronal plane is a cross-section of some kind without remembering which way it faces.',
        D: 'A correct definition of the median plane, offered under the coronal plane\'s name. Both are vertical, which is what makes the swap tempting.',
      },
    },
    {
      key: 'which-of-the-following-is-true-about-the-coronal-plane-dep-b-733516bc',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `which-of-the-following-is-true-about-the-coronal-plane-3a7e46a0` with the same four options and no key either. Neither copy was keyed, so nothing is gained by importing both and a student would meet the same item twice.',
    },
    {
      key: 'if-you-are-asked-to-draw-a-section-through-the-human-body-th-1835c0a6',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option C was lost, and it is the answer. Three options survived — horizontal, lateral sagittal and median — and none of them shows the heart with both lungs: a horizontal cut takes one slice, a median cut misses both lungs, a lateral sagittal cut takes one lung. The plane that shows all three is the coronal, which is the option that is not on the page. Recoverable only by rescanning; nothing in the surviving text reconstructs it.',
    },
    {
      key: 'the-anatomical-term-that-means-away-from-the-median-plane-is-6401c54f',
      conceptKey: 'terms-of-position-medial-lateral-proximal-distal',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Give the term for a position away from the median plane.',
      explanations: {
        A: 'Lateral is away from the median plane; medial is towards it.',
        B: 'The exact opposite, and the option a student picks by matching the words "median" and "medial" rather than reading the direction.',
        C: 'Distal is away from the root of the limb, not away from the midline. Both mean "further out", which is why the two pairs are confused; they measure from different reference points.',
        D: 'Proximal is nearer the root of the limb — the wrong axis and the wrong direction at once.',
      },
    },
    {
      key: 'the-anatomical-term-that-means-away-from-the-median-plane-is-1fd0c26c',
      conceptKey: 'terms-of-position-medial-lateral-proximal-distal',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-anatomical-term-that-means-away-from-the-median-plane-is-6401c54f` with the same four options and no key. The keyed copy, asked twice, is imported.',
    },
    {
      key: 'the-anatomical-term-that-means-nearer-to-the-root-of-the-lim-b67ab878',
      conceptKey: 'terms-of-position-medial-lateral-proximal-distal',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Give the term for a position nearer the root of the limb.',
      explanations: {
        A: 'Lateral is measured from the median plane of the body, not along the limb.',
        B: 'Medial is the other half of that same pair, and belongs to the trunk axis rather than the limb axis.',
        C: 'The exact opposite: distal is away from the root of the limb. A student who reads only "root" and answers by feel takes this half the time.',
        D: 'Proximal is nearer to the root of the limb — the shoulder for the upper limb, the hip for the lower.',
      },
    },
    {
      key: 'the-anatomical-term-that-means-nearer-to-the-root-of-the-lim-7cc0ca30',
      conceptKey: 'terms-of-position-medial-lateral-proximal-distal',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-anatomical-term-that-means-nearer-to-the-root-of-the-lim-b67ab878` with the same four options and no key. The keyed copy is imported.',
    },
    {
      key: 'x7-the-anatomical-term-that-rneans-nearer-to-the-root-of-the-c272bd1e',
      conceptKey: 'terms-of-position-medial-lateral-proximal-distal',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A third copy of the same question, and the worst scan of it: the stem reads "rneans", option B has been replaced by "Stratifled squamous epithellum" from a histology question elsewhere on the page, and no key came with it. Bleed-through of that kind means the option set cannot be trusted even where it looks right.',
    },
    {
      key: 'near-to-the-median-plane-is-dep-book-em-em-f2012d4f',
      conceptKey: 'terms-of-position-medial-lateral-proximal-distal',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Give the term for a position nearer the median plane.',
      answerOverride: 'C',
      answerOverrideReason: 'The bank carries D, "Inferior", which cannot stand: inferior means lower, and has nothing to do with the median plane. The department book\'s own table of terms of position gives medial as "nearer the median plane", so the answer is C. The extractor appears to have read a page mark rather than a key.',
      explanations: {
        A: 'Lateral is the opposite — away from the median plane.',
        B: 'Proximal is measured along a limb, from its root, not from the midline of the body.',
        C: 'This is the overridden answer. Medial is nearer to the median plane; median itself is exactly in the midline.',
        D: 'The answer the extractor took from this page, and the reason for the override. Inferior means lower or caudal; it names a position on the vertical axis and says nothing about the midline.',
      },
    },
    {
      key: 'regarding-the-anatomical-planes-choose-the-correct-answer-e008c529',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Say which of the anatomical planes divides the body into two equal halves, and which two parts each of the others leaves behind.',
      answerOverride: 'c',
      answerOverrideReason: 'The 2020 paper printed no key and the recovered answer sheet does not cover this source, so the answer comes from the department book. The book defines the median (sagittal) plane as the vertical plane in the midline "dividing it into equal right and left halves" \u2014 the only one of the four planes it describes with the word equal. Of the coronal plane it says only that it cuts the body into an anterior and a posterior part, and of the horizontal plane into an upper and a lower part, with no claim of equality; that single word is what separates option c from options b and d.',
      explanations: {
        a: 'Wrong on both counts: a sagittal plane is vertical and never divides upper from lower. This is the option that pairs the right plane name with the wrong pair of parts, and it is the easiest of the four to eliminate.',
        b: 'The coronal plane does divide the body into anterior and posterior parts, but not into equal halves \u2014 the definition says "an anterior part towards the front and a posterior part towards the back" and no more, and any coronal plane through the body qualifies. The option is true in its direction and false in the word equal, which is precisely the discrimination this question is built on.',
        c: 'The median, or sagittal, plane passes vertically in the midline and divides the body into equal right and left halves. A plane parallel to it and near it is the paramedian plane, and that one gives unequal halves \u2014 which is why it is named separately.',
        d: 'The transverse (horizontal) plane divides the body into upper and lower parts, but again not equal ones: it can be taken at any level. It fails on the same word as option b.',
      },
    },
    {
      key: 'which-of-the-following-bones-fo-ms-bart-of-the-axial-skeleto-a2e4a76e',
      conceptKey: 'anatomical-planes-median-coronal-horizontal',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Two questions in one row, with `options` empty, from the ringed 2024 script. The stem is question 103, "Which of the following bones forms part of the axial skeleton?", whose options the pen destroyed entirely \u2014 not one of them survives \u2014 and it then runs on into question 104, "A plane which separates the body into an anterior and posterior part is called a", with four options that are partly readable: median plane, sagittal plane, horizontal plane, coronal plane. The concept named here is the one that owns the readable half; the axial-skeleton half is sittable elsewhere in this bank as `which-of-the-following-bones-forms-part-of-the-axial-skeleto-0eaf1181`. The department book\u2019s answer to the plane question is the coronal (frontal) plane. A rescan of an unringed copy recovers both.',
    },
  ],
}
