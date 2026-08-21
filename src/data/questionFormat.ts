/**
 * What kind of question this is, and what may be derived from what.
 *
 * The bank was built around one shape: a stem, four to six lettered options and
 * exactly one correct letter. That is the commonest thing a faculty sets and it
 * is not the only thing. Kasr Al Ainy's own Year 1 papers include matching
 * blocks — one EPE paper is twenty matching items out of thirty-two — as well
 * as true/false, completion, labelling, and written questions carrying several
 * marked subparts.
 *
 * A source question in an unsupported format used to leave two choices:
 * translate it into an MCQ, which loses what it was actually testing, or skip
 * it, which lets the importer decide what a student gets taught. Naming the
 * format is what makes the third option possible — record the question as the
 * thing it is.
 *
 * Formats are additive. `mcq_single_best` is the default, so everything already
 * authored keeps working untouched and nothing has to be migrated.
 */

export const QUESTION_FORMATS = [
  'mcq_single_best',
  'mcq_multi',
  'true_false',
  'matching',
  'completion',
  'labeling',
  'image_based',
  'short_answer',
  'structured_written',
  'essay',
  'comparison_table',
  'multipart_written',
] as const

export type QuestionFormat = (typeof QUESTION_FORMATS)[number]

export const DEFAULT_QUESTION_FORMAT: QuestionFormat = 'mcq_single_best'

/**
 * Formats whose answer is prose a person writes, rather than an option chosen.
 *
 * These are the ones that carry `writtenParts`, and the ones a derivation may
 * not invent — see `mayDerive`.
 */
export const WRITTEN_FORMATS = [
  'short_answer', 'structured_written', 'essay', 'comparison_table', 'multipart_written',
] as const

/** Formats built from a fixed set of options the student picks between. */
export const CHOICE_FORMATS = [
  'mcq_single_best', 'mcq_multi', 'true_false', 'image_based',
] as const

export function isWrittenFormat(format: QuestionFormat): boolean {
  return (WRITTEN_FORMATS as readonly string[]).includes(format)
}

export function isChoiceFormat(format: QuestionFormat): boolean {
  return (CHOICE_FORMATS as readonly string[]).includes(format)
}

/** Human-readable, for admin surfaces and validator messages. */
export const QUESTION_FORMAT_LABELS: Record<QuestionFormat, string> = {
  mcq_single_best: 'Single best answer',
  mcq_multi: 'Multiple response',
  true_false: 'True or false',
  matching: 'Matching',
  completion: 'Completion',
  labeling: 'Labelling',
  image_based: 'Image-based',
  short_answer: 'Short answer',
  structured_written: 'Structured written',
  essay: 'Essay',
  comparison_table: 'Comparison table',
  multipart_written: 'Multipart written',
}

/**
 * One marked subpart of a written question.
 *
 * A faculty written question is rarely one prompt. It is "(a) enumerate the
 * contents of the femoral triangle [5 marks]; (b) summarise the ligaments of
 * the hip joint [5 marks]", and the marks and the expected components are the
 * question. Flattening that into one prose blob loses the mark scheme, which is
 * the only thing that makes such a question markable at all.
 */
export interface WrittenPart {
  id: string
  /** `a`, `b`, `i` — as the paper labels it. */
  label: string
  prompt: string
  /** Marks this part carries, as printed. Zero when the paper does not say. */
  marks: number
  /**
   * The components an answer must contain to earn the marks, one per line.
   * A mark scheme, not a model essay.
   */
  expectedPoints: string[]
  /** Concepts this part assesses. Each is co-primary with the others. */
  conceptIds: string[]
  /** When a part cannot be answered without the part above it. */
  dependsOnPartId?: string
}

/**
 * Whether a question of `from` may be used as the sole precedent for creating
 * a new question of `to`.
 *
 * Two restrictions, and they are absolute:
 *
 *  1. A **written** question may only be derived when an existing written
 *     question tests the same concept. Not from an MCQ, not from a true/false
 *     item, not from a textbook passage, not from a concept on its own.
 *  2. A **practical** question may only be derived from an existing practical.
 *
 * The reason is that a written question is not an MCQ with the options removed.
 * What a faculty asks a student to write, how many marks each part carries and
 * which components earn them are conventions of that faculty's papers, and they
 * cannot be inferred from a question that never had them. Inventing a written
 * question from an MCQ produces something that looks like the real thing and
 * trains a student for an exam nobody sets.
 *
 * Everything else may be derived from anything that is not written or
 * practical — an MCQ may become a matching item, a concept drawn from a
 * department book may become a true/false item.
 */
export function mayDerive(from: QuestionFormat | 'concept' | 'practical', to: QuestionFormat): boolean {
  if (isWrittenFormat(to)) return from !== 'concept' && from !== 'practical' && isWrittenFormat(from)
  // Non-written targets may come from anything, including a written source —
  // capturing the written original is required either way, and a written
  // question is a legitimate inspiration for a non-written one.
  return true
}

/** Why a derivation was refused, for a validator message that explains itself. */
export function derivationRefusal(
  from: QuestionFormat | 'concept' | 'practical',
  to: QuestionFormat,
): string | null {
  if (mayDerive(from, to)) return null
  const source = from === 'concept'
    ? 'a concept'
    : from === 'practical'
      ? 'a practical question'
      : `a ${QUESTION_FORMAT_LABELS[from].toLowerCase()} question`
  return `a ${QUESTION_FORMAT_LABELS[to].toLowerCase()} question may only be derived from an existing written question, and this one was derived from ${source}`
}

/** Marks a written question carries in total, as its parts add up. */
export function writtenTotalMarks(parts: readonly WrittenPart[]): number {
  return parts.reduce((total, part) => total + (Number.isFinite(part.marks) ? part.marks : 0), 0)
}

/**
 * Formats a student can actually be shown today.
 *
 * The rest exist in `QUESTION_FORMATS` so that a source question can be
 * *classified* correctly while the surfaces to run it are built. Importing one
 * before then is what this list prevents, and the reason is that the failures
 * are silent rather than loud:
 *
 * Every format currently has one. The list stays because it is the thing that
 * stops a format being imported ahead of the surface that shows it, which is
 * the mistake it was written to prevent.
 *
 * `mcq_multi` was here for a while and is the reason the list exists: it used to
 * render through the single-best-answer path, where `correctAnswer` holds one
 * letter, so a question with three correct options was marked as though only
 * the first counted and a student who answered it perfectly was told they were
 * wrong. It now carries its own answer set and its own runner.
 *
 * Being refused at import is the loud failure. Add a format here only when
 * something can genuinely render and mark it.
 */
export const RUNNABLE_FORMATS = [
  'mcq_single_best', 'true_false', 'image_based', 'matching', 'mcq_multi', 'labeling',
  'completion',
  'short_answer', 'structured_written', 'essay', 'comparison_table', 'multipart_written',
] as const

export function isRunnableFormat(format: QuestionFormat): boolean {
  return (RUNNABLE_FORMATS as readonly string[]).includes(format)
}

/* ---- reading a format and its parts out of an import row ---------------- */

/** Every spelling of a format an author might reasonably write. */
const FORMAT_ALIASES: Record<string, QuestionFormat> = {
  'single best answer': 'mcq_single_best', sba: 'mcq_single_best', mcq: 'mcq_single_best',
  'best answer': 'mcq_single_best', 'single best': 'mcq_single_best',
  'multiple response': 'mcq_multi', 'multiple answer': 'mcq_multi', 'select all': 'mcq_multi',
  'true or false': 'true_false', 'true/false': 'true_false', 'true false': 'true_false',
  matching: 'matching', match: 'matching', emq: 'matching', 'extended matching': 'matching',
  completion: 'completion', 'fill in the blank': 'completion', 'fill in': 'completion',
  labelling: 'labeling', labeling: 'labeling', identification: 'labeling',
  'image based': 'image_based', image: 'image_based',
  'short answer': 'short_answer', saq: 'short_answer',
  'structured written': 'structured_written', structured: 'structured_written',
  essay: 'essay',
  'comparison table': 'comparison_table', comparison: 'comparison_table',
  'multipart written': 'multipart_written', multipart: 'multipart_written',
}

/**
 * Read a format from a cell.
 *
 * Accepts the slug, the label, and the ways a person actually writes it — the
 * corpus says "MCQ", "matching", "true/false" and "SAQ" — because rejecting a
 * legible spelling only teaches an author to write the format down somewhere
 * the importer cannot see it. Returns null for anything unrecognised, so the
 * caller can say so rather than guess.
 */
export function parseQuestionFormat(raw: string | undefined): QuestionFormat | null {
  const value = raw?.trim().toLowerCase()
  if (!value) return null
  const slug = value.replace(/[\s/-]+/g, '_')
  if ((QUESTION_FORMATS as readonly string[]).includes(slug)) return slug as QuestionFormat
  return FORMAT_ALIASES[value.replace(/[_/-]+/g, ' ')] ?? null
}

/**
 * `### (a) 5 marks` — the label and the marks a paper prints beside a part.
 *
 * Marks may be fractional. A Kasr case prints one total of 3 over four lettered
 * subparts, so each is worth 0.75, and `markWritten` already keeps a part's
 * marks fractional on purpose — rounding each part and totalling drifts from
 * the mark on the page. Requiring an integer here made those headings match
 * nothing, and an unmatched heading is not an error: the part is silently
 * dropped, so the question arrives with no mark scheme at all.
 */
const PART_HEADING = /^###\s*\(?\s*([A-Za-z0-9ivx]+)\s*\)?\s*(?:[-–—·|]\s*)?(?:(\d+(?:\.\d+)?)\s*marks?)?\s*$/i

/**
 * Read the marked subparts of a written question.
 *
 * ```
 * ### (a) 5 marks
 * Enumerate the contents of the femoral triangle.
 * Expects: Femoral nerve
 * Expects: Femoral artery
 * Concept: CON-MSK-0001
 * Depends on: a
 * ```
 *
 * A part with no `Expects:` lines is kept, not dropped — a paper often prints
 * a question whose mark scheme was never published, and losing the question
 * because its answer is unknown is the wrong trade. The validator reports it
 * instead.
 */
export function parseWrittenParts(raw: string | undefined): WrittenPart[] {
  if (!raw?.trim()) return []
  const parts: WrittenPart[] = []
  let current: WrittenPart | null = null
  const prompt: string[] = []

  const flush = () => {
    if (!current) return
    current.prompt = prompt.join('\n').trim()
    parts.push(current)
    prompt.length = 0
  }

  for (const line of raw.split('\n')) {
    const heading = line.trim().match(PART_HEADING)
    if (heading) {
      flush()
      const label = heading[1]
      current = {
        id: `part-${label.toLowerCase()}`,
        label,
        prompt: '',
        marks: heading[2] ? Number(heading[2]) : 0,
        expectedPoints: [],
        conceptIds: [],
      }
      continue
    }
    if (!current) continue
    const expects = line.match(/^\s*Expects?:\s*(.+)$/i)
    if (expects) { current.expectedPoints.push(expects[1].trim()); continue }
    const concept = line.match(/^\s*Concepts?:\s*(.+)$/i)
    if (concept) {
      current.conceptIds.push(...concept[1].split(/[|;,]/).map((id) => id.trim()).filter(Boolean))
      continue
    }
    const depends = line.match(/^\s*Depends on:\s*(.+)$/i)
    if (depends) { current.dependsOnPartId = `part-${depends[1].trim().toLowerCase()}`; continue }
    prompt.push(line)
  }
  flush()
  return parts
}

/**
 * Read `derived_from`.
 *
 * A cell may name what kind of thing it came from (`concept`, `practical`, or a
 * format), an ID, or both — `mcq_single_best · Q-CVS-014`.
 */
export function parseDerivedFrom(raw: string | undefined): {
  format?: QuestionFormat | 'concept' | 'practical'
  id?: string
} {
  const value = raw?.trim()
  if (!value) return {}
  const out: { format?: QuestionFormat | 'concept' | 'practical'; id?: string } = {}
  for (const piece of value.split(/[·|]/).map((part) => part.trim()).filter(Boolean)) {
    const lower = piece.toLowerCase()
    if (lower === 'concept') { out.format = 'concept'; continue }
    if (lower === 'practical') { out.format = 'practical'; continue }
    const format = parseQuestionFormat(piece)
    if (format) { out.format = format; continue }
    out.id = piece
  }
  return out
}
