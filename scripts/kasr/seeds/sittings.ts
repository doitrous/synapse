/**
 * Sittings a concept was examined in, known from an index rather than a paper.
 *
 * Three sources in this corpus list what came up in each sitting without giving
 * the wording or the marks — a student's compilation, and two departmental
 * topic sheets. They cannot become questions. What they can do is corroborate:
 * a concept minted from the 2025 paper that also appears on the 2023 index has
 * been asked twice, and repetition is the strongest blueprint evidence this
 * corpus holds.
 *
 * Only topics that map to an existing concept unambiguously are here. A topic
 * naming something no concept covers yet — "brachial plexus (formation and
 * branches)", "summarise the notochord" — is left in
 * `scripts/kasr/extract/sittings.json` and picked up when that concept is
 * authored. Mapping it onto a near-neighbour would inflate that neighbour's
 * weight with evidence belonging to something else.
 *
 * The 195 cohort's topics are deliberately absent: that source marks them
 * نظام قديم, the old system, which this programme excludes.
 */

/** `sourceId | tier | year | page | module`, the exam_signal column's grammar. */
export const SITTING_SIGNALS: Record<string, string[]> = {
  // Placed by reading, from the three question compilations: `EOY 101 exams not
  // answerd`, `EOY ANATOMY Final anatomy 101 questions ( upper only )` and
  // `EOY 196 ISK 101 - WRITTEN 2023`. `scripts/kasr/match-sittings.ts` scores
  // every topic against every concept and takes only the unambiguous ones; it
  // took five and left fifty-one, because the faculty's shorthand is two or
  // three words and "Radial Nerve (Branches)" scores 1.0 against the concept
  // for its branches and 1.0 against the concept for its injuries. A machine
  // cannot choose between those and should not try. These are the ones a reader
  // could choose, and the rest stay in scripts/kasr/extract/sitting-matches.json.
  'amniotic-fluid-functions': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'chorionic-villi-types-development': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'deep-fascia-parts-functions': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'elbow-joint-type-bones-ligaments': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
    'src_bd5efc3c8bfaac0c23d9 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'extensor-retinaculum-attachments-compartments': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'fertilization-site-mechanism-results': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'fibrous-joints-types-definition': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'flexor-retinaculum-what-passes-deep-superficial-and-through-it': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'implantation-abnormal-sites': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'intermuscular-spaces-quadrangular-triangular-boundaries-contents': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'lysosome-types-secondary-fates': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_cd60acf6ffe62830b01d | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'musculocutaneous-nerve-origin-course-branches': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'palmar-arterial-arches-site-formation-branches': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'paraxial-mesoderm-somite-derivatives': [
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'placenta-anomalies': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'radial-nerve-origin-root-branches': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
    'src_bd5efc3c8bfaac0c23d9 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'rotator-cuff-four-muscles-and-shoulder-stability': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'shoulder-girdle-movements-muscles': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'shoulder-joint-movements-muscles': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'shoulder-joint-type-ligaments-movements': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'supination-pronation-muscles-attachments-nerve': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'upper-limb-cutaneous-nerve-supply': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
  ],
  'wrist-movements-and-the-muscles-that-produce-them': [
    'src_802a04dedd66193ae35b | end_of_year | 2025 | p1 | 101 ISK',
    'src_c58336a4f2f0a172b4fe | end_of_year | 2025 | p1 | 101 ISK',
    'src_ef2104d4eaede4fa1356 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'embryonic-folding-types-and-causes': [
    'src_ec930bfde4ad26924402 | baqoon | 2023 | p1 | 101 ISK',
    'src_bd5efc3c8bfaac0c23d9 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  // The July 2023 model answer covers this objective, and it is the department's
  // own mark scheme rather than one authored from the book.
}
