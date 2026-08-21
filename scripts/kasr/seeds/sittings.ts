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
  'elbow-joint-type-bones-ligaments': [
    'src_bd5efc3c8bfaac0c23d9 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'radial-nerve-origin-roots-branches': [
    'src_bd5efc3c8bfaac0c23d9 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  'embryonic-folding-types-and-causes': [
    'src_ec930bfde4ad26924402 | resit | 2023 | p1 | 101 ISK',
    'src_bd5efc3c8bfaac0c23d9 | end_of_year | 2023 | p1 | 101 ISK',
  ],
  // The July 2023 model answer covers this objective, and it is the department's
  // own mark scheme rather than one authored from the book.
  'lysosome-types-electron-microscopy': [
    'src_cd60acf6ffe62830b01d | end_of_year | 2023 | p1 | 101 ISK',
  ],
}
