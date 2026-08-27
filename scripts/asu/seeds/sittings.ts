/**
 * Sittings a concept was examined in, known from an index rather than a paper.
 *
 * Copied from `scripts/kasr/seeds/sittings.ts` as a shape, emptied of Kasr's
 * seeds — the entries there are readings of Kasr's own corpus (student
 * compilations, departmental topic sheets) and do not belong in this
 * toolchain. See that file for the full rationale; unchanged here.
 *
 * A concept minted from one Ain Shams paper that also appears on another
 * sitting's topic index has been asked twice, and repetition is the
 * strongest blueprint evidence a corpus like this holds. Fill this in as the
 * Ain Shams corpus is read the same way Kasr's was — `match-sittings.ts`
 * scores every topic against every concept and this file holds only the
 * unambiguous matches a reader confirmed.
 */

/** `sourceId | tier | year | page | module`, the exam_signal column's grammar. */
export const SITTING_SIGNALS: Record<string, string[]> = {}
