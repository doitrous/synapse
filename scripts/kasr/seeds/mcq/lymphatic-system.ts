/**
 * `101 ISK > Anatomy > Basis of Anatomy > Lymphatic system` — the question books' MCQs.
 *
 * The thinnest of the eight Basis leaves, and the thinness is the finding.
 * Seventy-one rows carry this leaf tag; two of them are questions about this
 * chapter. Everything else is the axillary lymph nodes and the lymph drainage
 * of the breast — Axilla and Pectoral Region, where they are already authored —
 * or B and T lymphocytes, which are histology and belong to Non granular
 * leukocytes. The word "lymph" is what gathered them, and it gathers almost
 * everything in first year.
 *
 * The chapter itself is four pages and teaches the parts of the lymphatic
 * system, the two kinds of lymph vessel, the two great ducts and what each
 * drains, the characters of lymph vessels, the four factors moving lymph, the
 * sites and three functions of lymph nodes, the thymus, and the spleen with its
 * four functions and the rule that it is not palpable until enlarged three
 * times. A search of the whole 2704-row bank for spleen, thymus, thymosin,
 * cisterna chyli, lymphoid tissue, oedema and filariasis returns nothing. The
 * question books ask this chapter two questions, both about the vessels and the
 * ducts, and nothing at all about the organs — which is worth recording as a
 * blueprint fact rather than padding the leaf to look fuller than it is.
 *
 * Two further rows exist and neither can be sat. Both concern the thoracic
 * duct, and both are also carried, excluded, in `seeds/mcq/glandular-epithelium.ts`,
 * where the extractor had filed them under the word "duct"; that file marks them
 * as needing a leaf correction, and this is the leaf. Their reasons are restated
 * here in full so this leaf's record is complete, and because one of them turns
 * out to be worse than a missing option: its four options appear elsewhere in
 * the bank attached to a stem about the segments of the spinal cord.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Lymphatic system',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Lymphatic system',
  articleId: 'ART-101-ANA-LYMPHATIC-SYSTEM',

  concepts: [
    {
      key: 'thoracic-duct-and-right-lymphatic-duct-territories',
      label: 'The right lymphatic duct drains one quadrant of the body and the thoracic duct drains the other three',
      definition: 'All the lymph vessels of the body are collected into two large lymph ducts in the root of the neck, each opening into a large vein there. The right lymphatic duct drains the right side of the head and neck, the right half of the thorax and the right upper limb — the right upper quadrant of the body and nothing else. The thoracic duct drains everything that is left: the left side of the head and neck, the left upper limb, the left half of the thorax, and the whole of the body below the diaphragm.',
      objective: 'State the drainage territory of each of the two great lymph ducts, and say which regions belong to which.',
      pitfall: 'Splitting the body left and right and giving each duct a half. The division is not symmetrical: everything below the diaphragm, on both sides, goes to the thoracic duct.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Lymphatic system',
      type: 'structural_description',
      aliases: ['Thoracic duct', 'Right lymphatic duct'],
    },
    {
      key: 'lymph-vessel-characters-and-where-they-are-absent',
      label: 'Lymph vessels begin blindly in the tissue spaces, have wide pores and many valves, and are missing from four kinds of tissue',
      definition: 'Lymph vessels are fine vessels beginning blindly in the tissue spaces and uniting into larger vessels that reach the lymph nodes. Their walls contain wide pores, which is what lets fat and protein enter them, and they carry many valves, so lymph flows in one direction only. Afferent vessels open into the periphery of a lymph node at its convex border and carry lymph to it; efferent vessels emerge from the hilum and carry lymph away. They are absent from the brain and spinal cord, from bone marrow, and from avascular structures such as cartilage, cornea and hair. Lymph is moved along them by arterial pulsations, muscular contractions, negative intrathoracic pressure and the peristaltic movement of the intestine.',
      objective: 'Give the characters of a lymph vessel, distinguish afferent from efferent vessels by where they meet the node, and name the sites where lymph vessels are absent.',
      pitfall: 'Reading "begins blindly" as "has no valves". The blind beginning is about where the vessel starts; the valves are what make the lymph leave it in one direction, and a lymphatic has more of them than a vein of the same size.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Lymphatic system',
      type: 'structure_function_relationship',
      aliases: ['Afferent lymph vessels', 'Efferent lymph vessels'],
      gaps: [
        'The chapter also teaches the sites and three functions of the lymph nodes, the thymus and its thymosin, and the spleen with its four functions and the rule that it is not palpable until enlarged at least three times. No row in the 2704-question bank asks about any of them, so this leaf carries no exam signal at all for the lymphoid organs — half of its own chapter.',
        'The chapter\'s ILO list asks for the structure of the lymph node, and the chapter gives no histological structure of the node.',
      ],
    },
  ],

  questions: [
    {
      key: 'the-right-lymphatic-duct-drains-4eabf9f5',
      conceptKey: 'thoracic-duct-and-right-lymphatic-duct-territories',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'State what the right lymphatic duct drains.',
      explanations: {
        A: 'The whole body below the diaphragm drains to the thoracic duct, both sides of it. This is the option that catches a student who has divided the body into a right half and a left half.',
        B: 'The right lower limb is below the diaphragm and therefore thoracic duct territory. Its being on the right side is exactly the resemblance that makes this wrong.',
        C: 'The right lymphatic duct drains the right upper limb, with the right side of the head and neck and the right half of the thorax.',
        D: 'The right half of the abdomen is below the diaphragm, so it too goes to the thoracic duct. Three of the four options are on the right side of the body, which is what makes the question a test of the diaphragm rather than of the midline.',
      },
    },
    {
      key: 'concerning-the-lymph-vessels-of-body-choose-the-correct-answ-2f07a5ad',
      conceptKey: 'lymph-vessel-characters-and-where-they-are-absent',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Identify the true statement about lymph vessels among three that invert a stated character.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. D is the department chapter\'s own list, word for word — lymph vessels are absent in brain and spinal cord, bone marrow and avascular structures such as cartilage, cornea and hair. A and C each invert a character the chapter states, and B concerns a trunk the chapter never describes.',
      explanations: {
        A: 'Reversed. Afferent vessels carry lymph *to* the node, opening into its periphery at the convex border; it is the efferent vessels, leaving the hilum, that carry it away. The prefixes are the whole distinction and they are easy to swap under time pressure.',
        B: 'The right bronchomediastinal trunk is not described in this chapter, which stops at the two great ducts in the root of the neck. An option naming a structure the course does not teach cannot be the answer a first-year examiner intends, and the detail it adds about the left lobe of the liver is there to look authoritative.',
        C: 'Half of this is the chapter\'s own wording — lymph vessels do end blindly in the tissue spaces and do have wide pores — and the last four words reverse it. They have many valves, which is what makes lymph flow in one direction. A statement that is three-quarters true is the hardest kind of distractor.',
        D: 'This is the overridden answer. The four sites are brain and spinal cord, bone marrow, and the avascular structures — cartilage, cornea, hair. The pattern behind the list is worth keeping: a tissue with no blood vessels has no lymphatics either.',
      },
    },
    {
      key: 'the-thoracic-duct-drains-ee7d8e41',
      conceptKey: 'thoracic-duct-and-right-lymphatic-duct-territories',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option C was lost, and it is the answer. The three that survived — the right side of the head and neck, the right lower limb, the right half of the thorax — are all wrong for the thoracic duct: the first and third are right lymphatic duct territory and the second, while genuinely thoracic duct territory, would make the option true only by accident of being below the diaphragm rather than for the reason the stem is testing. Whatever the examiner meant by option C is off the page. Also carried, excluded, in `seeds/mcq/glandular-epithelium.ts`, where the extractor had filed it under the word "duct"; this leaf is the correction that file asks for.',
    },
    {
      key: 'the-right-thoracic-duct-drains-the-ipka-7e4611d8',
      conceptKey: 'thoracic-duct-and-right-lymphatic-duct-territories',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Two faults, and the second is fatal. The stem names a "right thoracic duct", which is not a structure the chapter describes — the duct on the right is the right lymphatic duct, and the thoracic duct is the left one — so the stem conflates the two vessels the question is supposedly testing. And this row\'s four options ("Right side of the abdomen", "Right lower limb", "Right upper limb", "Right side pelvis") appear elsewhere in the bank attached to a completely different stem, `the-segments-of-the-spinal-cord-are-dep-book-vi-ad-3a3a95e4`, which is excluded in `seeds/mcq/nervous-system.ts` for carrying them. When one option block has been printed under two unrelated stems, neither pairing can be trusted. Also carried, excluded, in `seeds/mcq/glandular-epithelium.ts`; this leaf is the correction that file asks for.',
    },
  ],
}
