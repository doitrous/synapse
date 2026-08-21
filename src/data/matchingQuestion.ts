/**
 * A matching question: a bank of options, and prompts that each take one.
 *
 * This is not a niche format here. One Kasr Al Ainy EPE paper is twenty
 * matching items out of thirty-two, and the department question books use them
 * throughout. Rewriting each prompt as its own single-best-answer MCQ would
 * change what is being tested: a matching block asks a student to tell several
 * near neighbours apart *against each other*, and splitting it hands them a
 * fresh set of distractors each time.
 *
 * Options are shared and reusable. In a real paper the same option often
 * answers two prompts and some options answer none — that is the point of the
 * distractors — so nothing here requires a one-to-one pairing.
 */

export interface MatchingOption {
  /** `A`, `B`, `C` — as the paper letters them. */
  id: string
  text: string
}

export interface MatchingPrompt {
  id: string
  text: string
  /** The option this prompt takes. */
  answerId: string
}

export interface MatchingPayload {
  options: MatchingOption[]
  prompts: MatchingPrompt[]
}

/**
 * `A | Open-ended question`, `A. Open-ended question`, or `A) …`.
 *
 * Three spellings because all three appear in the corpus, and refusing two of
 * them only teaches an author to write the option somewhere the importer
 * cannot see it.
 */
const OPTION_LINE = /^\s*([A-Za-z0-9]+)\s*[|.):\-–—]\s*(.+)$/

/** `"Tell me more about that" = A`, or `… -> A`, or `… : A`. */
const PROMPT_LINE = /^(.*?)\s*(?:=|->|→|:)\s*([A-Za-z0-9]+)\s*$/

/** Option letters written more than once — each shadows the one before it. */
export function duplicateOptionIds(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  const seen = new Set<string>()
  const repeated: string[] = []
  for (const line of raw.split('\n')) {
    const match = line.match(OPTION_LINE)
    if (!match) continue
    const id = match[1].trim().toUpperCase()
    if (seen.has(id)) { if (!repeated.includes(id)) repeated.push(id) }
    else seen.add(id)
  }
  return repeated
}

export function parseMatchingOptions(raw: string | undefined): MatchingOption[] {
  if (!raw?.trim()) return []
  const out: MatchingOption[] = []
  const seen = new Set<string>()
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    const match = line.match(OPTION_LINE)
    if (!match) continue
    const id = match[1].trim().toUpperCase()
    // A repeated letter would make one of the two unreachable, and silently
    // answering a prompt with the wrong one. Keep the first and drop the rest;
    // the validator reports it.
    if (seen.has(id)) continue
    seen.add(id)
    out.push({ id, text: match[2].trim() })
  }
  return out
}

export function parseMatchingPrompts(raw: string | undefined): MatchingPrompt[] {
  if (!raw?.trim()) return []
  const out: MatchingPrompt[] = []
  raw.split('\n').forEach((line, index) => {
    if (!line.trim()) return
    const match = line.match(PROMPT_LINE)
    if (!match) return
    const text = match[1].trim().replace(/^\d+[.)]\s*/, '')
    if (!text) return
    out.push({ id: `mp-${index}`, text, answerId: match[2].trim().toUpperCase() })
  })
  return out
}

export function parseMatching(
  options: string | undefined,
  prompts: string | undefined,
): MatchingPayload {
  return { options: parseMatchingOptions(options), prompts: parseMatchingPrompts(prompts) }
}

/** Everything wrong with a matching block, in words an author can act on. */
export function matchingErrors(payload: MatchingPayload, rawOptions?: string, rawPrompts?: string): string[] {
  const errors: string[] = []
  const { options, prompts } = payload

  if (options.length < 2) errors.push('A matching question needs at least two options, written as "A | text"')
  if (!prompts.length) errors.push('A matching question needs at least one prompt, written as "prompt = A"')

  // Lines that were written but could not be read would otherwise vanish, and
  // an author would never learn that half their block did not arrive. A
  // repeated letter is reported as the repeat it is. Counting it as an
  // unreadable line would send an author looking for a typo in a line that
  // reads perfectly well.
  const repeated = duplicateOptionIds(rawOptions)
  for (const id of repeated) {
    errors.push(`Option ${id} is written more than once — only the first is used, and the rest can never be chosen`)
  }
  const optionLines = (rawOptions ?? '').split('\n').filter((line) => line.trim()).length
  const unreadable = optionLines - options.length - repeated.length
  if (unreadable > 0) {
    errors.push(`${unreadable} option line${unreadable === 1 ? '' : 's'} could not be read — write each as "A | text"`)
  }
  const promptLines = (rawPrompts ?? '').split('\n').filter((line) => line.trim()).length
  if (promptLines > prompts.length) {
    const lost = promptLines - prompts.length
    errors.push(`${lost} prompt line${lost === 1 ? '' : 's'} could not be read — write each as "prompt = A"`)
  }

  const known = new Set(options.map((option) => option.id))
  for (const prompt of prompts) {
    if (!known.has(prompt.answerId)) {
      errors.push(`Prompt "${prompt.text.slice(0, 40)}" is answered by ${prompt.answerId}, which is not one of the options`)
    }
  }
  return errors
}

/** A matching question as a student sits it. */
export interface MatchingQuestionView {
  id: string
  title: string
  subjectId: string
  stem: string
  matching: MatchingPayload
  learningObjective?: string
}

export type MatchingResponse = Record<string, string>

export interface MatchingResult {
  correct: number
  total: number
  /** Prompt id to whether it was matched correctly. */
  byPrompt: Record<string, boolean>
  /** True only when every prompt is right — what an exam would mark. */
  allCorrect: boolean
}

/**
 * Mark a matching attempt.
 *
 * Scored per prompt rather than all-or-nothing, because a paper marks it that
 * way: a block of five prompts is five marks, not one. `allCorrect` is there
 * for the surfaces that need a single yes or no, such as the attempt log.
 */
export function markMatching(response: MatchingResponse, prompts: readonly MatchingPrompt[]): MatchingResult {
  const byPrompt: Record<string, boolean> = {}
  let correct = 0
  for (const prompt of prompts) {
    const right = response[prompt.id] === prompt.answerId
    byPrompt[prompt.id] = right
    if (right) correct += 1
  }
  return { correct, total: prompts.length, byPrompt, allCorrect: prompts.length > 0 && correct === prompts.length }
}

/** Whether every prompt has been given an answer. */
export function matchingComplete(response: MatchingResponse, prompts: readonly MatchingPrompt[]): boolean {
  return prompts.every((prompt) => Boolean(response[prompt.id]))
}
