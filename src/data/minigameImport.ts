import type { ImportFieldDefinition, ImportSchemaDefinition } from './bulkImport.ts'
import {
  validateMiniGamePack,
  type MiniGameKind,
  type MiniGamePack,
  type OrderedMiniGamePack,
  type OrderedStep,
  type RedFlagFinding,
  type RedFlagSortPack,
} from './minigamePacks.ts'

const MINI_GAME_KINDS: MiniGameKind[] = ['clinical_sequence', 'mechanism_chain', 'red_flag_sort']
const RED_FLAG_LANES: RedFlagFinding['lane'][] = ['urgent', 'routine']

export const MINIGAME_IMPORT_FIELDS: ImportFieldDefinition[] = [
  { key: 'id', label: 'Pack ID', required: true, help: 'Stable authored game-pack ID. Required so game history, party sessions, and review notes can address the same pack after re-import.' },
  { key: 'kind', label: 'Game kind', required: true, help: 'clinical_sequence, mechanism_chain, or red_flag_sort.' },
  { key: 'title', label: 'Title', required: true, help: 'Student-facing title.' },
  { key: 'subject', label: 'Subject ID', required: true, help: 'Canonical subject ID such as cvs, resp, fnd, pharm, or path.' },
  { key: 'topic', label: 'Topic', required: true, help: 'Topic or subtopic the pack practises.' },
  { key: 'summary', label: 'Summary', required: true, help: 'One short reviewed summary shown in the minigames hub.' },
  { key: 'prompt', label: 'Prompt', required: true, help: 'Instruction shown before the activity starts.' },
  { key: 'source_label', label: 'Source label', required: true, help: 'Reviewed source pack, faculty handout, or internal authoring source. Do not cite generated medical facts.' },
  { key: 'source_url', label: 'Source URL', help: 'Optional source URL or internal source reference.' },
  { key: 'reviewed_by', label: 'Reviewed by', required: true, help: 'Reviewer or review team that approved the medical facts.' },
  { key: 'reviewed_at', label: 'Reviewed at', help: 'ISO date when the facts were reviewed.' },
  { key: 'steps', label: 'Ordered steps', help: 'For clinical_sequence and mechanism_chain. One line per step as "step_id | text", in the correct authored order.' },
  { key: 'explanation', label: 'Explanation', help: 'For ordered games. Reviewed explanation of the correct sequence or mechanism chain.' },
  { key: 'urgent_lane', label: 'Urgent lane label', help: 'For red_flag_sort. Label for the urgent/escalation column.' },
  { key: 'routine_lane', label: 'Routine lane label', help: 'For red_flag_sort. Label for the routine/review column.' },
  { key: 'findings', label: 'Red flag findings', help: 'For red_flag_sort. One line per finding as "finding_id | urgent|routine | finding text | rationale".' },
]

export const MINIGAME_IMPORT_SCHEMA: ImportSchemaDefinition = {
  noun: 'medicine minigame packs',
  fields: MINIGAME_IMPORT_FIELDS,
  markdownExample: `# Item

## id
CS-EMERG-PRIMARY-SURVEY-001

## kind
clinical_sequence

## title
Basic life support primary survey

## subject
fnd

## topic
Emergencies & red flags

## summary
Order the first response steps for an unresponsive adult in a teaching scenario.

## prompt
Place the actions in the order a responder should take before ongoing reassessment.

## source_label
Reviewed emergency-skills source pack

## reviewed_by
Content operations

## steps
danger | Check the scene for danger before approaching.
response | Check responsiveness and call for help.
airway | Open the airway.
breathing | Check breathing.
compressions | Start chest compressions if breathing is absent or abnormal.

## explanation
The game uses this authored order exactly; it never generates clinical steps.`,
}

const text = (values: Record<string, string>, key: string) => values[key]?.trim() ?? ''

function parseKind(value: string): MiniGameKind | undefined {
  const normalized = value.trim().toLowerCase().replace(/[-\s]+/g, '_')
  return (MINI_GAME_KINDS as readonly string[]).includes(normalized) ? normalized as MiniGameKind : undefined
}

export function parseMiniGameSteps(value = ''): OrderedStep[] {
  return value.split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split('|').map((part) => part.trim())
      if (parts.length >= 2) return { id: parts[0], text: parts.slice(1).join('|').trim() }
      return { id: `step-${index + 1}`, text: parts[0] ?? '' }
    })
    .filter((step) => step.id && step.text)
}

export function parseRedFlagFindings(value = ''): RedFlagFinding[] {
  return value.split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split('|').map((part) => part.trim())
      const lane = parts[1]?.toLowerCase().replace(/[-\s]+/g, '_')
      return {
        id: parts[0] || `finding-${index + 1}`,
        lane: (RED_FLAG_LANES as readonly string[]).includes(lane) ? lane as RedFlagFinding['lane'] : 'routine',
        text: parts[2] ?? '',
        rationale: parts.slice(3).join('|').trim(),
      }
    })
    .filter((finding) => finding.id && finding.text)
}

export function miniGamePackFromRow(values: Record<string, string>): MiniGamePack {
  const kind = parseKind(values.kind) ?? 'clinical_sequence'
  const base = {
    id: text(values, 'id'),
    kind,
    title: text(values, 'title'),
    subjectId: text(values, 'subject').toLowerCase(),
    topic: text(values, 'topic'),
    summary: text(values, 'summary'),
    source: {
      label: text(values, 'source_label'),
      reviewedBy: text(values, 'reviewed_by'),
      ...(text(values, 'source_url') ? { url: text(values, 'source_url') } : {}),
      ...(text(values, 'reviewed_at') ? { reviewedAt: text(values, 'reviewed_at') } : {}),
    },
  }

  if (kind === 'red_flag_sort') {
    return {
      ...base,
      kind,
      prompt: text(values, 'prompt'),
      lanes: {
        urgent: text(values, 'urgent_lane'),
        routine: text(values, 'routine_lane'),
      },
      findings: parseRedFlagFindings(values.findings),
    } satisfies RedFlagSortPack
  }

  return {
    ...base,
    kind,
    prompt: text(values, 'prompt'),
    steps: parseMiniGameSteps(values.steps),
    explanation: text(values, 'explanation'),
  } satisfies OrderedMiniGamePack
}

export function validateMiniGameRow(values: Record<string, string>): string[] {
  const errors: string[] = []
  for (const field of MINIGAME_IMPORT_FIELDS) {
    if (field.required && !text(values, field.key)) errors.push(`${field.label} is required`)
  }
  const kind = parseKind(values.kind)
  if (values.kind?.trim() && !kind) errors.push(`Game kind must be one of ${MINI_GAME_KINDS.join(', ')}`)

  if (kind === 'red_flag_sort') {
    if (!text(values, 'urgent_lane') || !text(values, 'routine_lane')) errors.push('Red Flag Sort needs urgent_lane and routine_lane')
    if (!text(values, 'findings')) errors.push('Red Flag Sort needs findings')
  } else if (kind) {
    if (!text(values, 'steps')) errors.push(`${kind} needs steps`)
    if (!text(values, 'explanation')) errors.push(`${kind} needs an explanation`)
  }

  const pack = miniGamePackFromRow(values)
  errors.push(...validateMiniGamePack(pack))
  return [...new Set(errors)]
}

export function miniGamePackToRow(pack: MiniGamePack): Record<string, string> {
  const base = {
    id: pack.id,
    kind: pack.kind,
    title: pack.title,
    subject: pack.subjectId,
    topic: pack.topic,
    summary: pack.summary,
    prompt: pack.prompt,
    source_label: pack.source.label,
    source_url: pack.source.url ?? '',
    reviewed_by: pack.source.reviewedBy,
    reviewed_at: pack.source.reviewedAt ?? '',
  }
  if (pack.kind === 'red_flag_sort') {
    return {
      ...base,
      urgent_lane: pack.lanes.urgent,
      routine_lane: pack.lanes.routine,
      findings: pack.findings.map((finding) => `${finding.id} | ${finding.lane} | ${finding.text} | ${finding.rationale}`).join('\n'),
    }
  }
  return {
    ...base,
    steps: pack.steps.map((step) => `${step.id} | ${step.text}`).join('\n'),
    explanation: pack.explanation,
  }
}
