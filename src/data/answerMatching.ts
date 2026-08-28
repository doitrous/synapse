/**
 * Deciding whether a written answer means the same as the mark scheme's.
 *
 * Shared by labelling and completion, which have the same problem: a student
 * types a structure's name and it has to be marked without a person reading it.
 * Both need the same two properties, and they pull against each other.
 *
 * **Lenient about wording.** Case, punctuation, articles and the abbreviations a
 * student actually writes are all ignored, so "the biceps brachii muscle" and
 * "Biceps brachii" are one answer and so are "median n." and "Median nerve". A
 * marker that fails those is wrong about anatomy in order to be right about
 * typing, and a student who meets it twice stops trusting it.
 *
 * **Strict about structure.** An earlier version of this stripped the class
 * word — "nerve", "artery", "muscle" — as noise, which made "median nerve" and
 * "median artery" the same string. That marks a student correct for naming a
 * different structure, which is worse than marking them wrong.
 */

/**
 * The class words an anatomical answer ends in, and every way they are written.
 *
 * A trailing single letter is the abbreviation; a leading one is an article, so
 * `a` is only read as artery when something comes before it.
 */
const CLASS_WORDS: Record<string, string> = {
  n: 'nerve', nn: 'nerve', nerve: 'nerve', nerves: 'nerve',
  m: 'muscle', mm: 'muscle', muscle: 'muscle', muscles: 'muscle',
  a: 'artery', aa: 'artery', artery: 'artery', arteries: 'artery',
  v: 'vein', vv: 'vein', vein: 'vein', veins: 'vein',
  lig: 'ligament', ligament: 'ligament', ligaments: 'ligament',
}

export function normaliseAnswer(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    // Strip combining marks, so an accented form still matches its plain one.
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:'"()\[\]]/g, ' ')
    // Only true articles. Class words stay — see `splitClassWord`.
    .replace(/\b(the|of)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * An answer as its stem and the kind of structure it names.
 *
 * "median nerve" is `median` + `nerve`; "median artery" is `median` + `artery`;
 * "biceps brachii" is `biceps brachii` + nothing.
 */
export function splitClassWord(normalised: string): { stem: string; kind: string } {
  const words = normalised.split(' ').filter(Boolean)
  if (words.length < 2) return { stem: normalised, kind: '' }
  const kind = CLASS_WORDS[words[words.length - 1]]
  if (!kind) return { stem: normalised, kind: '' }
  return { stem: words.slice(0, -1).join(' '), kind }
}

/**
 * Whether two answers name the same structure.
 *
 * The stems must be the same. The class word is optional only when **one side
 * leaves it out** — a student writing "biceps brachii" for "biceps brachii
 * muscle" is right, and so is one writing "median n." for "median nerve". When
 * both sides name a kind and the kinds differ, they are different structures:
 * "median nerve" and "median artery" share a stem and are not the same answer,
 * and marking them equal would credit a student for naming the wrong thing.
 */
export function sameStructure(a: string, b: string): boolean {
  if (a === b) return true
  const left = splitClassWord(a)
  const right = splitClassWord(b)
  if (left.stem !== right.stem) return false
  if (!left.kind || !right.kind) return true
  return left.kind === right.kind
}

/**
 * Whether what a student wrote counts as one of the accepted answers.
 */
export function matchesAnswer(written: string, accepted: readonly string[]): boolean {
  const given = normaliseAnswer(written)
  if (!given) return false
  return accepted.some((option) => sameStructure(normaliseAnswer(option), given))
}
