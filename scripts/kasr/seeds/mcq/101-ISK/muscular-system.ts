/**
 * `101 ISK > Anatomy > Basis of Anatomy > Muscular system` — the question books' MCQs.
 *
 * Forty-seven rows carry this leaf tag and four of them are sittable questions
 * about this chapter. The rest are connective tissue (tendon, elastic fibres,
 * mast cells), cytology (intermediate filaments, lipofuscin), embryology
 * (somites and sclerotome) and upper limb (the brachial artery, the snuff box,
 * the flexor synovial sheaths) — all of them reached this leaf on the word
 * "muscle". They are left to the leaves that own them.
 *
 * The chapter itself is five pages and the books ask three things from it:
 * which of the three muscle types a description fits, what shape class a named
 * muscle's fibres take, and what the four roles in a movement are called. The
 * third is where the books are weakest — of the three rows asking about muscle
 * action, one is keyed to the wrong role, one lost the option that was the
 * answer, and one lost an option and fell below the four-option contract.
 *
 * Two concepts are reused rather than minted, and both are copied verbatim from
 * where they already exist. `skeletal-muscle-form-classification-by-fibre-
 * direction` was minted in `seeds/mcq/101-ISK/shoulder-region.ts` for the pennate
 * examples — an example of a bipennate muscle, of a strap muscle — and the
 * deltoid-fibre question here tests exactly that objective from the general
 * chapter instead of from the shoulder. One concept, asked from two leaves.
 * `muscle-attachment-types` already exists from the 2025 end-of-year paper; the
 * copy here adds a `gaps` note and changes nothing else.
 *
 * That gap is worth stating plainly: the chapter's own ILO list asks the
 * student to "define tendon, aponeurosis and synovial sheathes", and the
 * chapter text defines none of the three. One question book asks where the
 * synovial sheaths lie and keys it to "between bone and skin", which is a
 * bursa. With no departmental definition to test the key against and an option
 * missing from the scan, that row is excluded rather than corrected.
 *
 * The pennate-example rows the extractor filed under Shoulder Region — an
 * example of a bipennate, multipennate or strap-like muscle — are authored in
 * `seeds/mcq/101-ISK/shoulder-region.ts` and are not touched here, including the two
 * damaged reprints that leaf did not take.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Muscular system',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Muscular system',
  articleId: 'ART-101-ANA-MUSCLE-ATTACHMENTS',

  concepts: [
    {
      key: 'muscle-types-skeletal-smooth-cardiac',
      label: 'The three muscle types are told apart by four things at once: where they are, whether they are voluntary, whether they are striated, and which nerves supply them',
      definition: 'Muscle tissue is characterised by contraction — the ability of its fibres to shorten — and by structure and function there are three types. Skeletal muscle is attached to the skeleton, contracts voluntarily, is striated, and is supplied by somatic nerves. Smooth muscle is in the wall of blood vessels and viscera, contracts involuntarily, has no striations, and is supplied by autonomic nerves. Cardiac muscle is in the myocardium of the heart, contracts involuntarily, is striated but less so than skeletal muscle, and is supplied by autonomic nerves.',
      objective: 'Assign a muscle to one of the three types from its site, its control, its striations or its nerve supply.',
      pitfall: 'Using striation alone to mean voluntary. Cardiac muscle is striated and involuntary at once, which is why the department book tabulates four columns rather than one.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Muscular system',
      type: 'classification',
      aliases: ['Types of muscle', 'Skeletal muscle', 'Smooth muscle', 'Cardiac muscle'],
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
      key: 'muscle-action-roles-prime-mover-antagonist-fixator-synergist',
      label: 'A purposeful movement needs four kinds of muscle, and each is named for what it does to the movement rather than for where it lies',
      definition: 'No purposeful movement is done by one muscle; a group acts together, and by role there are four types of muscle action. The prime mover, or agonist, initiates and maintains the movement. The antagonist opposes the action of the prime mover. The fixator, or stabiliser, fixes the origin of the prime mover, or stabilises the joint on which it acts, so that the pull has something to work against. The synergist contracts to eliminate unwanted movements at the other joints the prime mover crosses, so that its action on the joint that matters becomes maximal.',
      objective: 'Name the role a muscle is playing in a described movement, and give the department book\'s definition of each of the four roles.',
      pitfall: 'Merging fixator and synergist because both are "helpers". The fixator holds the prime mover\'s origin still; the synergist cancels the prime mover\'s effect at a joint it crosses on the way.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Muscular system',
      type: 'functional_relationship',
      aliases: ['Prime mover', 'Agonist', 'Antagonist', 'Fixator', 'Stabilizer', 'Synergist'],
      conflicts: [
        '`which-of-the-following-terms-describes-a-muscle-that-assists-ef68e5d8` is keyed to "antagonist" for a stem asking which muscle assists the prime mover. The department chapter defines the antagonist as the muscle that *opposes* the prime mover, and the synergist as the one that acts so the prime mover\'s action becomes maximal.',
      ],
    },
    {
      key: 'muscle-attachment-types',
      label: 'A muscle attaches either directly to bone or through a tendon or an aponeurosis',
      definition: 'A muscle may attach directly, its fibres inserting into the periosteum, or indirectly through a tendon, a cord of dense regular connective tissue, or an aponeurosis, a flattened sheet of the same. The attachments are named origin and insertion, the origin conventionally the more fixed end.',
      objective: 'Name the types of muscle attachment and say how each differs in form.',
      pitfall: 'Treating origin and insertion as fixed anatomical facts. Which end moves depends on which is stabilised, and the two reverse in ordinary movements.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Muscular system',
      type: 'structural_description',
      gaps: [
        'The chapter\'s ILO list asks the student to "define tendon, aponeurosis and synovial sheathes", and the chapter text defines none of the three — tendon is mentioned only in passing as a mode of attachment. A question book nevertheless asks where the synovial sheaths lie, so the faculty examines a term its own text never gives.',
      ],
    },
  ],

  questions: [
    {
      key: 'the-skeletal-muscles-are-b81b3875',
      conceptKey: 'muscle-types-skeletal-smooth-cardiac',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Identify the property that belongs to skeletal and not to smooth or cardiac muscle.',
      explanations: {
        A: 'Involuntary control belongs to smooth and cardiac muscle. Skeletal muscle is the voluntary one, supplied by somatic nerves.',
        B: 'The muscle of the heart is cardiac muscle — striated like skeletal muscle, which is why students who go by appearance put them together, but involuntary and autonomically supplied.',
        C: 'The wall of a blood vessel holds smooth muscle.',
        D: 'Correct. Skeletal muscle is defined by its attachment to the skeleton, and it is the only one of the three with that attachment.',
      },
    },
    {
      key: 'the-skeletal-muscles-are-dep-book-ad-ad-vipa-involuntary-c65a13f8',
      conceptKey: 'muscle-types-skeletal-smooth-cardiac',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-skeletal-muscles-are-b81b3875` whose first option was swallowed by the stem, which ends "ad ad ViPa- Involuntary". Three options and no key. The clean copy, asked twice, is imported.',
    },
    {
      key: 'the-smooth-muscles-are-062f2779',
      conceptKey: 'muscle-types-skeletal-smooth-cardiac',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Identify the site that belongs to smooth and not to skeletal or cardiac muscle.',
      explanations: {
        A: 'Smooth muscle is involuntary. Voluntary control is skeletal muscle, and this option is the exact inversion the paired question about skeletal muscle uses.',
        B: 'The heart is cardiac muscle. It is involuntary like smooth muscle, so a student who has learnt only "involuntary means smooth" takes this one — the striations are what separate them.',
        C: 'Correct. Smooth muscle is in the wall of blood vessels and of the viscera, has no striations, and is supplied by autonomic nerves.',
        D: 'Attachment to bone is skeletal muscle.',
      },
    },
    {
      key: 'the-smooth-muscles-are-dep-book-6730a5a1',
      conceptKey: 'muscle-types-skeletal-smooth-cardiac',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `the-smooth-muscles-are-062f2779` with the same four options and no key. The keyed copy, asked twice, is imported.',
    },
    {
      key: 'deltoid-muscle-fibers-are-e06568c1',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Classify the deltoid by the arrangement of its fibres.',
      explanations: {
        A: 'Parallel or strap-like fibres run the whole length of the muscle, as in sartorius. Deltoid\'s fibres are short and set obliquely, which is why it is powerful over a short range rather than long-travelled.',
        B: 'A unipennate muscle has its fibres on one side of a tendon, like the barbs on one edge of a feather — flexor pollicis longus is the example.',
        C: 'Correct. Deltoid is the department book\'s example of a multipennate muscle: a series of bipennate units side by side, separated by tendinous septa, which is what lets a muscle of that size abduct the whole limb.',
        D: 'A circumpennate muscle is cylindrical, with a central tendon and bipennate units converging on it from all round — tibialis anterior. It is the closest class to multipennate, and the reason it is printed here.',
      },
    },
    {
      key: 'deltoid-muscle-fibers-are-1-3dfa3e56',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A second copy of `deltoid-muscle-fibers-are-e06568c1` with the same four options and no key. The keyed copy, asked three times, is imported.',
    },
    {
      key: 'deltoid-muscle-bers-are-dep-book-em-em-em-em-em-320fdef2',
      conceptKey: 'skeletal-muscle-form-classification-by-fibre-direction',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A third copy of `deltoid-muscle-fibers-are-e06568c1`, and the one that would do harm: it is keyed A, "Parallel muscle fibers", against the department book\'s own naming of deltoid as its multipennate example. The copy asked three times is keyed C and is the one imported; this row is kept so the wrong key stays visible rather than being deleted along with the duplicate.',
    },
    {
      key: 'the-muscle-which-initiate-a-certain-movement-is-called-2022-91d02abf',
      conceptKey: 'muscle-action-roles-prime-mover-antagonist-fixator-synergist',
      difficulty: 'Easy', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option D was lost and three survived, against an import contract of four to five. The answer would be B: the department chapter defines the prime mover (agonist) as "the muscle which initiates and maintains a movement", which is this stem word for word, while the synergist and the antagonist are defined as doing something else entirely. Recoverable by rescanning the page for option D.',
    },
    {
      key: 'which-of-the-following-terms-describes-a-muscle-that-assists-ef68e5d8',
      conceptKey: 'muscle-action-roles-prime-mover-antagonist-fixator-synergist',
      difficulty: 'Moderate', questionType: 'Definition',
      learningObjective: 'Name the muscle role that assists the prime mover rather than opposing it or holding it steady.',
      answerOverride: 'C',
      answerOverrideReason: 'The bank carries B, "Antagonist", which the department chapter contradicts in one line: the antagonist is defined as the muscle which *opposes* the action of the prime mover, and cannot be the muscle that assists it. Of the four options only the synergist is described by the chapter as acting so that the prime mover\'s action becomes maximal.',
      explanations: {
        A: 'The agonist is the prime mover itself. The stem asks for a muscle that assists it, so a term meaning the same muscle cannot answer.',
        B: 'The answer printed in this book, and the reason for the override. The antagonist opposes the prime mover; it is the exact opposite of a muscle assisting it, and choosing it inverts the chapter\'s definition.',
        C: 'Correct, and the override. The synergist contracts to eliminate unwanted movements at joints the prime mover crosses, so that the prime mover\'s action on the joint that matters becomes maximal — assistance by subtraction.',
        D: 'The fixator, or stabiliser, also assists — but by fixing the *origin* of the prime mover or the joint it acts on, not by working on the movement itself. It is the strongest distractor here and the reason this item is worth sitting.',
      },
    },
    {
      key: 'regarding-the-types-of-muscle-actions-the-stabilizer-is-dep-5a58cb09',
      conceptKey: 'muscle-action-roles-prime-mover-antagonist-fixator-synergist',
      difficulty: 'Moderate', questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The answer is the option that was lost. Three survived, and each defines one of the *other* three roles — "initiates and maintains a movement" is the prime mover, "opposes the action of the prime mover" is the antagonist, "eliminates the unwanted movements" is the synergist. The chapter\'s definition of the stabiliser, that it fixes the origin of the prime mover or stabilises the joint it acts on, is not on the page. Recoverable only by rescanning.',
    },
    {
      key: 'regarding-the-synovial-sheaths-they-are-located-2017-ac-ad-a-8e83000d',
      conceptKey: 'muscle-attachment-types',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Three faults at once. Option D is missing. The printed key is B, "between bone and skin", which describes a bursa rather than a synovial sheath. And the department chapter gives no definition of a synovial sheath at all to test that key against — its ILO list asks the student to define the term and its text never does. The surviving option C, "around the tendons of the muscles", is what a synovial sheath is in every other source, but resolving the key from outside the faculty\'s own book would be inventing the department\'s position rather than recording it. The gap is noted on the concept.',
    },
    {
      key: 'regarding-the-classification-of-the-muscles-according-to-the-bfa2875b',
      conceptKey: 'muscle-action-roles-prime-mover-antagonist-fixator-synergist',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the four roles a muscle can play in a movement, and recognise a term that belongs to joints rather than to muscles.',
      answerOverride: 'd',
      answerOverrideReason: 'Filed here rather than in `articular-system.ts`, where the slice put it on the word "symphysis": the question classifies muscles by action, and this leaf owns that concept and the department chapter it comes from. The 2020 paper printed no key and the recovered answer sheet does not cover this source, so the answer comes from the department book, which gives exactly four types of muscle action \u2014 prime mover (agonist), antagonist, fixator (stabiliser) and synergist. A symphysis is a secondary cartilaginous joint and is on no list of muscle actions.',
      explanations: {
        a: 'True as a type of muscle action: the prime mover, or agonist, is the muscle that initiates and maintains the movement.',
        b: 'True: the antagonist is the muscle that opposes the action of the prime mover. Students hesitate here because "opposing" sounds like something outside a classification of how muscles produce a movement \u2014 but a movement needs its brake as much as its motor.',
        c: 'True: the fixator, or stabiliser, fixes the origin of the prime mover or steadies the joint it acts on, so that the pull has something to work against.',
        d: 'Correct \u2014 this is the one that is not true, and the answer. A symphysis is a secondary cartilaginous joint, such as the pubic symphysis or an intervertebral disc; it is a way of joining bones, not a role a muscle plays. The fourth muscle role the option displaces is the synergist, which cancels unwanted movement at the other joints the prime mover crosses.',
      },
    },
  ],
}
