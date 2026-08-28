/**
 * `101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb` — the question
 * books' MCQs.
 *
 * Nine rows and only four distinct questions. "Regarding veins of upper limb"
 * appears three times and "one of the following lies deep to the extensor
 * retinaculum" three times, and between them they say what this leaf is
 * examined on: which end of the dorsal venous arch each superficial vein
 * starts at, what the median cubital vein connects, and which of the
 * structures crossing the back of the wrist is deep to the retinaculum rather
 * than superficial to it.
 *
 * `extensor-retinaculum-attachments-compartments` is not minted here. It
 * already exists, from the 2025 end-of-year paper, and its definition below is
 * copied verbatim so re-emitting it is an update that adds these occurrences
 * to its exam signal and nothing else. The Forearm lane owns the leaf that
 * concept was written for; the emitter merges concepts by key across leaves,
 * so sharing it costs nothing and minting a rival would halve a student's
 * mastery of it.
 *
 * Four answers are overridden. Three of the four are DEP BOOK rows whose
 * answers the extractor read off a page margin rather than a key, and all
 * three are wrong in the same direction — they mark the first option. The
 * fourth had no key at all.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Veins of the Upper Limb',
  modulePath: '101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb',
  articleId: 'ART-101-ANA-VEINS-OF-UPPER-LIMB',

  concepts: [
    {
      key: 'upper-limb-superficial-veins-origin-course-termination',
      label: 'The cephalic vein starts laterally and ends in the axillary vein; the basilic starts medially and helps form it',
      definition: 'The cephalic vein begins at the lateral end of the dorsal venous arch of the hand, ascends on the lateral (radial) side of the forearm and arm, runs in the deltopectoral groove, pierces the clavipectoral fascia and ends in the axillary vein. The basilic vein begins at the medial end of the same arch, ascends on the medial (ulnar) side, pierces the deep fascia about the middle of the arm and, at the lower border of teres major, joins the venae comitantes of the brachial artery to form the axillary vein. The deep veins of the limb accompany their arteries in pairs as venae comitantes as far as the brachial artery; the axillary artery has a single axillary vein and no venae comitantes.',
      objective: 'Give the origin, course and termination of the cephalic and basilic veins, and say which artery of the limb has venae comitantes and which does not.',
      pitfall: 'Swapping the two ends of the dorsal venous arch. Cephalic is lateral and basilic is medial, at their origin and along their whole course — and it is the cephalic, not the basilic, that pierces the clavipectoral fascia.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb',
      type: 'structural_description',
    },
    {
      key: 'median-cubital-vein-connections-and-venepuncture',
      label: 'The median cubital vein links cephalic to basilic across the cubital fossa, lying on the bicipital aponeurosis that protects the brachial artery',
      definition: 'The median cubital vein is a large superficial vein running upwards and medially in front of the cubital fossa, connecting the cephalic vein below and laterally to the basilic vein above and medially. It lies on the bicipital aponeurosis, which separates it from the brachial artery and the median nerve beneath. Its size, its superficial position and that protective aponeurosis make it the usual vein for venepuncture and intravenous injection.',
      objective: 'Say which two veins the median cubital vein connects, what lies deep to it, and why it is the vein chosen for venepuncture.',
      pitfall: 'Calling it a deep vein because it is the one a needle is put into. It is superficial, in the superficial fascia; what makes it safe is that the bicipital aponeurosis lies between it and the brachial artery.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb',
      type: 'clinical_correlation',
    },
    {
      key: 'extensor-retinaculum-attachments-compartments',
      label: 'The extensor retinaculum is anchored to radius and to pisiform and triquetral, and its septa make six tendon compartments',
      definition: 'The extensor retinaculum is a thick band of the deep fascia of the forearm lying obliquely across the back of the wrist, attached laterally to the anterior border of the lower end of the radius and medially to the pisiform and the triquetral. Five septa passing to ridges on the back of the lower end of the radius divide the space beneath it into six compartments, holding from lateral to medial: abductor pollicis longus with extensor pollicis brevis; extensor carpi radialis longus and brevis; extensor pollicis longus; the tendons of extensor digitorum and extensor indicis with the posterior interosseous nerve and anterior interosseous artery; extensor digiti minimi; and extensor carpi ulnaris.',
      objective: 'Give the attachments of the extensor retinaculum and name the contents of each of its six compartments in order.',
      pitfall: 'Losing the order by naming the compartments from a list of tendons rather than from Lister’s tubercle. The second compartment lies lateral to the tubercle and the third medial to it, which is what fixes the sequence.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: [],
      modulePath: '101 ISK > Anatomy > Upper Limb > Forearm',
      type: 'structural_description',
    },
  ],

  questions: [
    {
      key: 'one-of-the-following-structures-lies-deep-to-the-extensor-re-3a476aa5',
      conceptKey: 'extensor-retinaculum-attachments-compartments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the tendons that pass through the compartments of the extensor retinaculum from the veins and cutaneous nerves that cross over it.',
      explanations: {
        A: 'The basilic vein is not at the wrist at all — it begins at the medial end of the dorsal venous arch and is already in the forearm by the time the retinaculum is reached. Superficial veins never dive beneath a retinaculum; they lie in the superficial fascia.',
        B: 'A cutaneous nerve, and cutaneous nerves cross superficial to a retinaculum by definition — they are on their way to the skin, and the retinaculum lies deep to the skin. The dorsal cutaneous branch of the ulnar nerve crosses over it to reach the back of the medial fingers.',
        C: 'Extensor indicis runs with the extensor digitorum tendons in the fourth compartment, deep to the retinaculum. Everything the retinaculum holds down is a tendon; everything that crosses it is a vein or a cutaneous nerve.',
        D: 'The beginning of the cephalic vein lies in the anatomical snuff box, in the superficial fascia over the retinaculum, which is exactly why it can be cannulated there. Students pick it because the snuff box and the retinaculum are neighbours, but neighbouring is not the same as deep to.',
      },
    },
    {
      key: 'regarding-veins-of-upper-limb-choose-the-correct-answer-d354d95f',
      conceptKey: 'upper-limb-superficial-veins-origin-course-termination',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Fix each superficial vein to its own end of the dorsal venous arch and name what the median cubital vein joins.',
      explanations: {
        A: 'The two veins swapped. Lateral belongs to the cephalic; the basilic starts at the medial end of the dorsal venous arch and stays medial the whole way up.',
        B: 'The same swap in the other direction, and the commonest single error in this leaf. Cephalic is the lateral vein, from its origin at the lateral end of the arch to the deltopectoral groove.',
        C: 'The median cubital vein runs upwards and medially across the front of the cubital fossa from the cephalic to the basilic, which is why a needle in it drains into both.',
        D: 'Tempting because the brachial artery does have two venae comitantes and the axillary is its continuation upwards. It is not: the venae comitantes end by joining the basilic vein to form a single axillary vein, and from there up there is one vein, not two.',
      },
    },
    {
      key: 'one-of-the-following-structures-lies-deep-to-extensor-retina-ea4ceb49',
      conceptKey: 'extensor-retinaculum-attachments-compartments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the tendons that pass beneath the extensor retinaculum from the veins and cutaneous nerves that cross over it.',
      answerOverride: 'C',
      answerOverrideReason: 'The bank carries D, taken from this copy\'s page margin rather than a key, and D cannot stand: the cephalic vein begins in the superficial fascia over the anatomical snuff box, superficial to the retinaculum. The identical row `one-of-the-following-structures-lies-deep-to-the-extensor-re-3a476aa5`, asked twice, is keyed C, and C is the only tendon among the four options.',
      explanations: {
        A: 'The basilic vein is a superficial vein of the medial forearm and arm and never passes under a retinaculum.',
        B: 'A cutaneous nerve on its way to skin, so it crosses superficial to the retinaculum rather than under it.',
        C: 'Extensor indicis occupies the fourth compartment beneath the retinaculum with the extensor digitorum tendons. The OCR of this copy prints it as "Extensor indices" with a fragment of page furniture attached; the option is legible and is the tendon.',
        D: 'The answer the extractor read off this page, and the reason for the override. The cephalic vein does begin at the wrist, in the snuff box — but in the superficial fascia above the retinaculum, which is what makes it accessible to a cannula there.',
      },
    },
    {
      key: 'regarding-veins-of-upper-limb-choose-the-correct-answer-dep-30e82131',
      conceptKey: 'upper-limb-superficial-veins-origin-course-termination',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Fix each superficial vein to its own end of the dorsal venous arch and name what the median cubital vein joins.',
      answerOverride: 'C',
      answerOverrideReason: 'The bank carries A, which is the cephalic vein\'s origin written under the basilic vein\'s name. The identical row `regarding-veins-of-upper-limb-choose-the-correct-answer-d354d95f`, asked twice, is keyed C, and C is the only statement of the four that is true.',
      explanations: {
        A: 'The answer the extractor took from this page, and the reason for the override. Lateral is the cephalic vein\'s end of the arch; the basilic starts medially.',
        B: 'The same swap read the other way round. The cephalic vein is the lateral one throughout its course.',
        C: 'The median cubital vein crosses the cubital fossa obliquely and connects the cephalic vein to the basilic.',
        D: 'The brachial artery has two venae comitantes; the axillary artery does not. Those venae comitantes join the basilic vein at the lower border of teres major and the result is one axillary vein.',
      },
    },
    {
      key: 'regarding-veins-of-upper-limb-one-is-correct-answer-dep-book-3d755ad6',
      conceptKey: 'upper-limb-superficial-veins-origin-course-termination',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Attribute the clavipectoral fascia to the cephalic vein and the bicipital aponeurosis to the median cubital vein, and give the cephalic vein its correct origin.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. B is the only statement of the four that is true: the cephalic vein does start at the lateral end of the dorsal venous arch. A names the wrong vein under the bicipital aponeurosis, C names the wrong vein piercing the clavipectoral fascia, and D gives the axillary artery venae comitantes it does not have.',
      explanations: {
        A: 'The right relationship attached to the wrong vein. It is the median cubital vein, not the cephalic, that lies on the bicipital aponeurosis and is separated by it from the brachial artery — which is the whole reason the cubital fossa is a safe place for a needle.',
        B: 'The cephalic vein begins at the lateral end of the dorsal venous arch of the hand and remains the lateral vein of the limb.',
        C: 'The two superficial veins swapped at the point where each leaves the superficial fascia. The cephalic vein pierces the clavipectoral fascia to reach the axillary vein; the basilic pierces the deep fascia far lower, about the middle of the arm.',
        D: 'A reasonable extrapolation from the brachial artery, which does have two venae comitantes. They end by joining the basilic vein to form a single axillary vein, so above the lower border of teres major there is one vein and not a pair.',
      },
    },
    {
      key: 'the-cephalic-vein-ends-in-dep-book-p-579bb9ae',
      conceptKey: 'upper-limb-superficial-veins-origin-course-termination',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the vein the cephalic vein drains into and where it does so.',
      explanations: {
        A: 'The cephalic vein leaves the deltopectoral groove, pierces the clavipectoral fascia and ends in the axillary vein.',
        B: 'Backwards. The median cubital vein arises from the cephalic vein at the elbow and carries blood away from it into the basilic; it is a tributary relationship, not a termination.',
        C: 'One vein too far. The axillary vein becomes the subclavian only at the outer border of the first rib, by which point the cephalic vein has already joined it.',
        D: 'Chosen by students who remember the two veins being connected and settle on the connection they know. They are connected — by the median cubital vein at the elbow — but the cephalic vein\'s own ending is higher and is into the axillary vein.',
      },
    },
    {
      key: 'the-cephalic-vein-is-located-on-which-aspect-of-the-upper-li-56130f62',
      conceptKey: 'upper-limb-superficial-veins-origin-course-termination',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Place the cephalic vein on the correct side of the limb.',
      answerOverride: 'a',
      answerOverrideReason: 'The source printed no key. The cephalic vein runs on the lateral (radial) side of the forearm and arm from its origin at the lateral end of the dorsal venous arch, so A is the only possible answer.',
      explanations: {
        a: 'Lateral, or radial — the cephalic vein starts at the lateral end of the dorsal venous arch and stays lateral until it reaches the deltopectoral groove.',
        b: 'The basilic vein\'s side, and the answer given by every student who has the two names the wrong way round.',
        c: 'The vein does cross to the front of the arm as it ascends, which makes this feel half right. The question asks which aspect of the limb it belongs to, and the answer that distinguishes it from the basilic is lateral.',
        d: 'The cephalic vein begins on the back of the hand at the dorsal venous arch, which is what makes posterior tempting. It is anterior and lateral for almost its whole course above the wrist.',
      },
    },
    {
      key: 'the-median-cubital-vein-dep-book-y-y-39666898',
      conceptKey: 'median-cubital-vein-connections-and-venepuncture',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Say which veins the median cubital vein connects and why it is the vein chosen for intravenous injection.',
      answerOverride: 'C',
      answerOverrideReason: 'The bank carries A, read off this copy\'s margin, and A is wrong: the median cubital vein connects the cephalic to the basilic, not the axillary to the cephalic. C is unambiguously true and is the clinically relevant statement the item is built around. Option B was lost in extraction, so if a rescan recovers a fifth option that is also defensible, this override should be revisited before the item is sat.',
      explanations: {
        A: 'The answer the extractor took from this page, and the reason for the override. The median cubital vein connects the cephalic vein to the basilic at the elbow. The axillary vein is at the top of the limb and has no connection with it.',
        C: 'It is large, superficial and fixed in place, and the bicipital aponeurosis lies between it and the brachial artery — which is why it is the standard vein for venepuncture and intravenous injection.',
        D: 'The reason a student picks this is the needle: the vein a drip goes into feels as though it must be an important, deep one. It lies in the superficial fascia, and every vein that can be seen through the skin at the elbow is superficial by definition.',
        E: 'Valves are a general property of the superficial veins of the limb rather than a feature that identifies this one, so the statement singles out nothing and does not discriminate. If a faculty reviewer reads it as true as printed, the item has two defensible answers and needs rewording rather than rescanning.',
      },
    },
    {
      key: 'one-of-following-structures-lies-deep-to-extensor-retinaculu-f7faca42',
      conceptKey: 'extensor-retinaculum-attachments-compartments',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option B was dropped in extraction, leaving A, C and D, and the contract is four to five options. No rescan is needed: this row\'s own `variants` entry preserves the source line with all four options intact, so recovery is a re-parse of the bank rather than a return to the paper. The intact copy is `one-of-the-following-structures-lies-deep-to-the-extensor-re-3a476aa5`, which is keyed and asked twice, so nothing is lost by leaving this one out.',
    },
    {
      key: 'cept-es-regarding-the-extensor-retinaculum-the-following-sta-20891ed1',
      conceptKey: 'extensor-retinaculum-attachments-compartments',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only one option field was recovered and it holds no readable option \u2014 "The third con al Di arty , ee _ \u201c~- anlit an ae". The other three statements are inside the stem, which itself begins with the tail of the previous question ("cept: es Regarding the extensor retinaculum, the following statements are true except"). The recovered answer sheet keys this question D, and D is exactly the field that cannot be read, so the key confirms which option the scan destroyed without making the row sittable. Two of the statements that can be read are true as printed \u2014 the retinaculum is attached laterally to the anterior border of the lower end of the radius, and the cephalic and basilic veins cross it \u2014 which makes the destroyed option the likeliest place for the exception the stem asks for. A rescan of the page recovers it.',
    },
  ],
}
