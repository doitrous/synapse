/**
 * `101 ISK > Anatomy > Basis of Anatomy > Fascia` — the question books' MCQs.
 *
 * Thirty-eight rows land on this leaf and fourteen are about it. The other
 * twenty-four are upper-limb items — the clavipectoral fascia, the extensor
 * retinaculum, the suspensory ligament of the axilla, the palmar spaces — which
 * reached the leaf on the word "fascia" and belong to the Pectoral Region,
 * Axilla, Forearm and Hand leaves. They are left to their authors.
 *
 * The chapter is three pages and the books ask it in exactly two shapes. The
 * first is "one of the functions of superficial / deep fascia is", where every
 * distractor is a real function of the *other* layer — that is the whole
 * question, and it is a good one, because the two lists are the thing students
 * merge. The second is a set of four stems sharing one option block: the same
 * four statements are printed under "The intermuscular septa and interosseous
 * membranes", "The retinacula", and twice more, and the student must match the
 * named part of deep fascia to its job. Both concepts already exist from the
 * written papers and are reused with their keys and definitions verbatim.
 *
 * Five rows are sittable and nine are not. One of the five printed no key and
 * is overridden from the department chapter, which states its answer outright.
 *
 * Three more would have been sittable but for the scan: each lost one option,
 * and each has an answer the chapter states word for word. They are excluded
 * anyway, because the import contract is four to five options and a
 * three-option item is not a single-best-answer question however obvious its
 * answer is. Their exclusion reasons carry the answer, so a rescan that
 * recovers the missing option can restore all three without re-deciding
 * anything.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Fascia',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Fascia',
  articleId: 'ART-101-ANA-FASCIA',

  concepts: [
    {
      key: 'superficial-fascia-features',
      label: 'Superficial fascia insulates, smooths, mobilises, conducts, and carries muscles and glands',
      definition: 'Superficial fascia is a layer of loose connective tissue just deep to the skin, allowing the skin to move more or less freely over the underlying structures. It contains a variable quantity of fat, more in females — abundant in the gluteal region, anterior abdominal wall and breast, less in the limbs, absent in the eyelid, penis and scrotum. Its functions are to prevent heat loss as a thermal insulator; to soften and smooth the body surface; to facilitate movement of the skin over underlying structures; to act as the medium conducting nerves, vessels and lymphatics to the skin; to contain skin muscles, as the muscles of expression in the face; and to contain special glands such as the mammary glands.',
      objective: 'List the six functions of the superficial fascia the department book gives.',
      pitfall: 'Giving fat storage as the function. The fat is the material; the functions are what the layer does with it — insulation, contour, mobility, conduction, and housing muscles and glands.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Fascia',
      type: 'structure_function_relationship',
      aliases: ['Subcutaneous tissue', 'Hypodermis'],
    },
    {
      key: 'deep-fascia-parts-functions',
      label: 'Deep fascia is one non-elastic collagen membrane that takes five different forms, each with its own job',
      definition: 'Deep fascia is an inelastic membrane of compact regular collagen fibres, well defined in the limbs and absent in the face and the anterior abdominal wall. It forms broad sheets around groups of muscles, which fix underlying structures in position, give attachment to muscles and help venous return; intermuscular septa and interosseous membranes, which separate muscle groups of different action and nerve supply and add surface for attachment; retinacula, thickened transverse bands at wrist and ankle that hold the tendons in place; the palmar and plantar aponeuroses, thick layers protecting the vessels, nerves and tendons beneath; and fibrous sheaths around large vessels, such as the carotid sheath around the carotid arteries, internal jugular vein and vagus nerve.',
      objective: 'List the functions of deep fascia by naming the structures it forms and what each achieves.',
      pitfall: 'Answering with the functions of superficial fascia — insulation, smoothing the contour, carrying vessels to the skin. Those belong to the other layer, and deep fascia is where the question is.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Fascia',
      type: 'structure_function_relationship',
    },
  ],

  questions: [
    {
      key: 'one-of-the-functions-of-superficial-fascia-is-5ea28dfd',
      conceptKey: 'superficial-fascia-features',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate a function of superficial fascia from three that belong to deep fascia.',
      explanations: {
        A: 'Correct. Superficial fascia contains the skin muscles — the muscles of facial expression are the book\'s example, and they are there precisely because the face has no deep fascia to hold them.',
        B: 'An aponeurosis — palmar, plantar — is deep fascia. Tempting because both layers are connective tissue sheets, but only the deep layer is dense enough to make one.',
        C: 'Broad sheets around muscle groups are the first of the five forms deep fascia takes. Superficial fascia surrounds nothing; it lies flat under the skin.',
        D: 'Interosseous membranes are deep fascia, spanning between two bones to separate muscle groups. Superficial fascia never reaches bone.',
      },
    },
    {
      key: 'one-of-the-functions-of-super-cial-fascia-is-dep-book-y-f6e3d536',
      conceptKey: 'superficial-fascia-features',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `one-of-the-functions-of-superficial-fascia-is-5ea28dfd` with the same four options and no key. The keyed copy is imported.',
    },
    {
      key: 'one-of-the-functions-of-superficial-fascia-is-presence-of-sk-803f809c',
      conceptKey: 'superficial-fascia-features',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A third copy of the same question, doubly damaged: the first option was swallowed by the stem ("@- Presence of skin muscles") and option C is gone as well, leaving two distractors and no answer. The keyed copy `one-of-the-functions-of-superficial-fascia-is-5ea28dfd` is imported.',
    },
    {
      key: 'concerning-the-super-cial-fascia-select-the-correct-statemen-3405bb28',
      conceptKey: 'superficial-fascia-features',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the one property that belongs to superficial rather than deep fascia.',
      answerOverride: 'A',
      answerOverrideReason: 'The 2018 source printed no key. The department book states that superficial fascia contains a variable quantity of fat, and attributes retinacula, intermuscular septa and vessel sheaths to deep fascia, so A is the only option the chapter supports.',
      explanations: {
        A: 'Correct. Fat is the defining content of superficial fascia — abundant in the gluteal region, anterior abdominal wall and breast, less in the limbs, absent in the eyelid, penis and scrotum.',
        B: 'Retinacula are localised transverse thickenings of *deep* fascia at the wrist and ankle. Picked by students who remember that a retinaculum is superficially placed, which is a statement about depth rather than about which layer it is made of.',
        C: 'Intermuscular septa are deep fascia dipping between muscle groups. Superficial fascia has no septa; it does not descend between muscles at all.',
        D: 'Sheaths around great vessels, such as the carotid sheath, are deep fascia. The superficial layer conducts vessels *to the skin* rather than wrapping the big ones, and that near-miss is what makes this the strongest distractor.',
      },
    },
    {
      key: 'one-of-the-functions-of-deep-fascia-is-that-it-3a321c9c',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate a function of deep fascia from three that belong to superficial fascia.',
      explanations: {
        A: 'Facilitating the movement of the skin over the structures beneath is a function of superficial fascia. Deep fascia is inelastic and anchors things rather than freeing them.',
        B: 'Preventing heat loss is superficial fascia acting as a thermal insulator, and it does it with its fat. Deep fascia has no fat.',
        C: 'The glands — the mammary gland is the book\'s example — sit in superficial fascia. This option is the mirror image of the previous two: a superficial-fascia function offered under the deep layer\'s name.',
        D: 'Correct. Interosseous membranes are one of the five forms deep fascia takes, separating muscle groups of different action and nerve supply and adding surface for their attachment.',
      },
    },
    {
      key: 'one-of-the-functions-of-deep-fascia-is-that-it-dep-book-y-ad-ceb92c53',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `one-of-the-functions-of-deep-fascia-is-that-it-3a321c9c` whose first option was swallowed by the stem, which ends "y ad Aca- Facilitates the movement of the skin". Three options and no key. The clean, keyed copy is imported.',
    },
    {
      key: 'deep-fascia-dep-book-daaf07e9',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived — the row runs A, B, D — and the import contract is four to five, so the item cannot be sat as printed however clear its answer is. The answer would be D: the department book states outright that deep fascia is absent in the face and in the anterior wall of the abdomen, which makes D true and A its exact contradiction, while B transplants to deep fascia a sex difference the book makes only of the fat in superficial fascia. Recoverable by rescanning the page for option C.',
    },
    {
      key: 'regarding-the-deep-fascia-2024-e2e720a0',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option D was lost and only three survived, against an import contract of four to five. The answer would be B, which the book states outright — deep fascia forms the retinacula at the wrist and ankle — while A contradicts the book\'s statement that deep fascia is absent in the face, and C describes superficial fascia, the layer that conducts nerves and vessels to the skin. Recoverable by rescanning the page for option D.',
    },
    {
      key: 'the-intermuscular-septa-and-interosseous-membranes-7412a329',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Match the intermuscular septa and interosseous membranes to their job among the four forms of deep fascia.',
      explanations: {
        A: 'Surrounding the muscles of the limbs is what the broad sheets of deep fascia do — the first of its five forms, and the one the septa arise from. The septa are what dips inward from those sheets, not the sheets themselves.',
        B: 'Correct. Septa and interosseous membranes separate groups of muscles that have different actions and different nerve supplies, and give extra surface for attachment.',
        C: 'That is the retinaculum, printed here as a distractor because this leaf\'s four stems share one option block and each stem\'s answer is another stem\'s distractor.',
        D: 'Tough sheaths around big vessels are the carotid sheath and its like — the fifth form of deep fascia, not the septa.',
      },
    },
    {
      key: 'the-intermuscular-septa-and-interosseous-membranes-dep-book-2cbe6dbd',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-intermuscular-septa-and-interosseous-membranes-7412a329` that lost its fourth option and printed no key. The complete, keyed copy is imported.',
    },
    {
      key: 'the-retinacula-960897ed',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Match the retinacula to their job among the four forms of deep fascia.',
      explanations: {
        A: 'The broad sheets of deep fascia surround the limb muscles. A retinaculum is a band across a joint, not a sleeve around a muscle group.',
        B: 'Separating muscle groups of different action is the work of the intermuscular septa, which is the answer to the neighbouring stem sharing this option block.',
        C: 'Correct. Retinacula are localised transverse thickened bands of deep fascia at the wrist and ankle that keep the tendons in position as they cross the joint.',
        D: 'Fibrous sheaths around great vessels — the carotid sheath — are a different form of deep fascia. Both are "wrappings", which is what makes this option worth printing.',
      },
    },
    {
      key: 'the-retinacula-dep-book-em-em-em-em-em-caf9fde3',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-retinacula-960897ed` with the same four options and no key. The keyed copy is imported.',
    },
    {
      key: 'the-retinacula-dep-book-6b0d84fd',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A different printing of "The retinacula", with a different option block from the copy imported above, no key, and option B lost — three options against a contract of four to five. The answer would be C, which is the book\'s own wording, retinacula keep the underlying tendons in position; A describes what the intermuscular septa do and D contradicts the book\'s siting of retinacula at the wrist and ankle. Recoverable by rescanning the page for option B.',
    },
    {
      key: '1i-082658d0',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Not a question. The stem is the fragment "1i" and the three options are lines lifted from three different questions on the page — "Fibroplastin", "Formation of aponeurosis" and "Surround the muscles of the upper and lower limbs". There is no stem to rescan; what is on the page is the wreckage of a column break.',
    },
    {
      key: 'regarding-the-deep-fascia-puis-ae-ee-ps-i-forms-the-retinacu-4ca6d512',
      conceptKey: 'deep-fascia-parts-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Two questions in one row, with `options` empty, from the ringed 2024 script. The stem is question 100, "Regarding the deep fascia", whose four statements are inside it and half-destroyed \u2014 "forms the retinaculae", "it contains \u2026 and nerves", "loosely attached to the skin" \u2014 and it then runs on into question 101, "Which of the following terms describes a muscle that assists the prime mover in performing its action?", with its own four options. The department book\u2019s answers are that the deep fascia does form the retinacula, and that the muscle assisting the prime mover is the synergist. Neither half can be sat while they share a stem, and no seed can split a bank stem; a rescan of an unringed copy recovers both.',
    },
  ],
}
