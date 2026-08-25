import { CONTENT_LEDGER_STORAGE_KEY, type AnswerLabel, type ManagedContentItem } from './contentControl.ts'
import { questions, type Question } from './qbank.ts'
import {
  ATTEMPT_INDEX_KEY, EMPTY_INDEX, attemptMonth, attemptMonthKey, indexAttempt,
  type AttemptIndex, type AttemptMonth, type AttemptRecord,
} from './attempts.ts'
import { STUDY_BLOCKS_STORAGE_KEY, isoDay, type StudyBlock } from './studyBlocks.ts'
import { plainTextToEditorJson, type Note as NotebookNote } from './notebook.ts'
import {
  WHITEBOARD_COLLECTION_KEY, emptyWhiteboardCollection,
  type BoardState, type WhiteboardCollection, type WhiteboardDocument,
} from './whiteboard.ts'
import { CONCEPT_STORAGE_KEY, type Concept, type ConceptGraph } from './conceptGraph.ts'
import { MASTERY_STORAGE_KEY, recordEvidence, type MasteryLedger } from './mastery.ts'
import { PRACTICAL_PROGRESS_STORAGE_KEY, type PracticalProgress } from './practicalProgress.ts'

export const DEMO_SHOWCASE_MARKER_KEY = 'synapse.demo.showcase.version'
export const DEMO_SHOWCASE_VERSION = '2026-08-25.1'

export const DEMO_SESSION_NAMES_KEY = 'synapse.qbank.sessionNames.v1'
export const DEMO_SESSION_QUESTIONS_KEY = 'synapse.qbank.sessionQuestions.v1'
export const DEMO_MARKED_QUESTIONS_KEY = 'synapse.qbank.marked.v1'
export const DEMO_NOTEBOOK_KEY = 'synapse.notebook.notes'
export const DEMO_BOOKMARKS_KEY = 'synapse.bookmarks.resources.v1'

interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

const LABELS: AnswerLabel[] = ['A', 'B', 'C', 'D', 'E', 'F']

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function conceptIdFor(question: Question): string {
  return `demo.${question.subjectId}.${slug(question.topic)}`
}

function at(now: Date, daysAgo: number, hour = 18, minute = 0): string {
  const date = new Date(now)
  date.setHours(hour, minute, 0, 0)
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

function questionItem(question: Question, index: number, now: Date): ManagedContentItem {
  const correctIndex = Math.max(0, question.options.findIndex((option) => option.correct))
  const mainConceptId = conceptIdFor(question)
  const effort = question.difficulty === 'Easy' ? 'Low' : question.difficulty === 'Moderate' ? 'Medium' : 'High'
  return {
    id: question.id,
    kind: 'question',
    title: question.stem,
    subjectId: question.subjectId,
    status: 'Published',
    owner: 'Demo content team',
    updatedAt: at(now, Math.min(30, index + 2), 10, 30),
    fields: {
      Topic: question.topic,
      Difficulty: question.difficulty,
      Vignette: question.vignette,
      Explanation: question.explanation,
    },
    source: { origin: 'internal', reference: 'Demo preview fixture' },
    questionData: {
      format: 'mcq_single_best',
      attachments: question.attachments ?? [],
      media: question.media ?? [],
      correctAnswer: LABELS[correctIndex] ?? 'A',
      answers: question.options.map((option, optionIndex) => ({
        label: LABELS[optionIndex] ?? 'A',
        text: option.text,
        explanation: option.rationale,
      })),
      attachedImage: question.attachedImage ?? '',
      libraryIds: question.libraryRefs.map((reference) => reference.id),
      resourceIds: question.resourceRefs,
      tags: {
        module: 'Demo clinical module',
        topic: question.topic,
        subtopic: question.topic,
        conceptIds: [mainConceptId],
        mainConceptIds: [mainConceptId],
        contextualConceptIds: [],
        years: [],
        universityIds: [],
        cognitiveEffort: effort,
        setting: 'Both',
        intendedDifficulty: question.difficulty,
        clinicalReasoningLevel: question.difficulty === 'Easy' ? 1 : question.difficulty === 'Moderate' ? 2 : 3,
        inferredDifficulty: question.difficulty === 'Easy' ? 0.3 : question.difficulty === 'Moderate' ? 0.58 : 0.82,
        examRelevance: 0.8,
      },
      learningObjective: question.learningObjective ?? `Apply the core principles of ${question.topic}.`,
      authorNotes: 'Demo-only preview content. Never used when the live API is configured.',
      sourceCitation: question.resourceRefs.join('; '),
      estimatedSeconds: 90,
      randomiseAnswers: true,
    },
  }
}

function blockedMediaQuestion(now: Date): ManagedContentItem {
  const base = questionItem(questions[0], 0, now)
  const id = 'demo-media-request-question'
  return {
    ...base,
    id,
    title: 'Demo review queue · ECG image required',
    status: 'In review',
    owner: 'Media review team',
    fields: { ...base.fields, Vignette: 'A demo question held out of student view until its required ECG image is supplied.' },
    questionData: {
      ...base.questionData!,
      mediaRequests: [{
        id: 'demo-media-request-ecg',
        ownerId: id,
        ownerKind: 'question',
        medium: 'image',
        kind: 'imaging example',
        brief: 'Add a rights-cleared 12-lead ECG that demonstrates the finding described in the stem.',
        teachingPurpose: 'The reviewer workspace needs a realistic required-media item; this draft must remain unpublished.',
        section: 'Clinical vignette',
        anchorQuote: 'ECG image required',
        priority: 'required',
        status: 'needed',
        slot: 'stem',
        sourceDirection: 'Rights-cleared teaching ECG library',
        reviewComments: [{
          id: 'demo-media-comment',
          anchor: 'Clinical vignette',
          kind: 'comment',
          text: 'Confirm the lead labels remain legible on a student phone before fulfilment.',
          author: 'Demo reviewer',
          createdAt: at(now, 1, 11, 15),
        }],
      }],
    },
  }
}

function blockedVideoPractical(now: Date): ManagedContentItem {
  const id = 'demo-media-request-video-practical'
  return {
    id,
    kind: 'practical',
    title: 'Demo review queue · respiratory examination video required',
    subjectId: 'resp',
    status: 'In review',
    owner: 'Media review team',
    updatedAt: at(now, 0, 14, 20),
    fields: {
      Format: 'OSCE',
      Difficulty: 'Moderate',
      Description: 'A demo station held out of student view until its required examination clip is supplied and reviewed.',
    },
    source: { origin: 'internal', reference: 'Demo preview fixture' },
    practicalData: {
      format: 'osce',
      candidateInstructions: 'Examine this patient’s respiratory system and describe the visible clinical signs.',
      actorOpening: 'You are comfortable at rest and answer the student’s questions briefly.',
      actorSections: [],
      actorFlags: [],
      markSections: [{
        id: 'demo-video-marks',
        title: 'Observation and interpretation',
        marks: 3,
        items: [
          { id: 'demo-video-mark-1', text: 'Uses a structured inspection sequence.' },
          { id: 'demo-video-mark-2', text: 'Identifies the demonstrated clinical sign.' },
          { id: 'demo-video-mark-3', text: 'Explains its likely clinical significance.' },
        ],
      }],
      difficulty: 'Moderate',
      references: [],
      conceptTags: { mainConceptIds: [], conceptIds: [], contextualConceptIds: [] },
      mediaRequests: [{
        id: 'demo-media-request-respiratory-video',
        ownerId: id,
        ownerKind: 'practical',
        medium: 'video',
        kind: 'clinical photograph',
        brief: 'Upload a short, rights-cleared clip showing the required respiratory inspection finding.',
        teachingPurpose: 'Students need to observe the sign in motion before explaining its clinical significance.',
        section: 'station',
        anchorQuote: 'Examine this patient’s respiratory system',
        priority: 'required',
        status: 'needed',
        sourceDirection: 'Consented teaching recording or licensed clinical-media library',
        reviewComments: [],
      }],
    },
  }
}

function histologyItem(now: Date): ManagedContentItem {
  return {
    id: 'demo-histology-myocardium',
    kind: 'histology',
    title: 'Illustrative myocardium interface demo',
    subjectId: 'cvs',
    status: 'Published',
    owner: 'Demo content team',
    updatedAt: at(now, 3, 9, 0),
    fields: {
      Tissue: 'Illustrative myocardium',
      Stain: 'H&E-style demo palette',
      Description: 'A clearly labelled illustrative specimen used only to preview the microscope controls, objectives, pins, minimap, zoom, fullscreen, and tissue-information panel. It is not diagnostic material.',
    },
    source: { origin: 'internal', reference: 'Interface demonstration only' },
    histologyData: {
      tissue: 'Illustrative myocardium',
      stain: 'H&E-style demo palette',
      views: [
        { objective: 4, image: '/demo/histology/myocardium-4x.svg' },
        { objective: 10, image: '/demo/histology/myocardium-10x.svg' },
        { objective: 40, image: '/demo/histology/myocardium-40x.svg' },
      ],
      structures: [
        { id: 'demo-fibres', label: 'Illustrative muscle fibres', note: 'Demo pin for testing reveal behaviour.', at: { 4: { x: 0.57, y: 0.37 }, 10: { x: 0.62, y: 0.46 }, 40: { x: 0.55, y: 0.62 } } },
        { id: 'demo-nuclei', label: 'Illustrative central nuclei', note: 'Demo pin for testing high-power navigation.', at: { 10: { x: 0.38, y: 0.61 }, 40: { x: 0.65, y: 0.36 } } },
        { id: 'demo-stroma', label: 'Illustrative connective-tissue space', note: 'Demo pin for testing the full-slide thumbnail.', at: { 4: { x: 0.31, y: 0.69 }, 10: { x: 0.29, y: 0.44 } } },
      ],
    },
  }
}

function deckItem(now: Date): ManagedContentItem {
  return {
    id: 'demo-deck-cvs', kind: 'deck', title: 'Heart failure · rapid review', subjectId: 'cvs', status: 'Published',
    owner: 'Demo content team', updatedAt: at(now, 4), fields: { Description: 'A compact published deck for previewing the keyboard-first card runner.' },
    deckData: {
      description: 'Six high-yield cards demonstrating the flashcard queue and keyboard shortcuts.',
      cards: [
        { id: 'demo-card-1', front: 'What does HFrEF stand for?', back: 'Heart failure with reduced ejection fraction.' },
        { id: 'demo-card-2', front: 'Name the four prognostic pillars of HFrEF therapy.', back: 'ARNI/ACEi, beta-blocker, MRA, and SGLT2 inhibitor.' },
        { id: 'demo-card-3', front: 'Which drug group primarily relieves congestion?', back: 'Loop diuretics.' },
        { id: 'demo-card-4', front: 'Why are beta-blockers useful in HFrEF?', back: 'They oppose chronic sympathetic activation and adverse remodelling.' },
        { id: 'demo-card-5', front: 'What happens to the Frank–Starling curve in heart failure?', back: 'It flattens and shifts downward.' },
        { id: 'demo-card-6', front: 'What does NYHA class describe?', back: 'Current functional limitation from symptoms.' },
      ],
    },
  }
}

function essayItem(now: Date): ManagedContentItem {
  return {
    id: 'demo-essay-hf', kind: 'essay', title: 'Explain neurohormonal compensation in HFrEF', subjectId: 'cvs', status: 'Published',
    owner: 'Demo content team', updatedAt: at(now, 5), fields: { Topic: 'Heart failure' },
    essayData: {
      prompt: 'In a structured answer, explain how sympathetic and renin–angiotensin–aldosterone activation initially supports circulation but later contributes to progressive HFrEF.',
      keyPoints: [
        { id: 'demo-essay-1', text: 'Reduced cardiac output activates sympathetic drive and RAAS.' },
        { id: 'demo-essay-2', text: 'Vasoconstriction supports pressure but increases afterload.' },
        { id: 'demo-essay-3', text: 'Sodium and water retention raise preload and congestion.' },
        { id: 'demo-essay-4', text: 'Chronic activation promotes adverse remodelling.' },
      ],
      examinerNote: 'Credit a clear sequence from short-term compensation to long-term harm.',
      modelAnswer: 'Falling output triggers sympathetic and RAAS activation. These mechanisms temporarily maintain perfusion through tachycardia, contractility, vasoconstriction, and fluid retention, but persistent activation raises myocardial demand, preload, and afterload and contributes to adverse remodelling and congestion.',
    },
  }
}

export function demoManagedContent(now = new Date()): ManagedContentItem[] {
  return [
    ...questions.map((question, index) => questionItem(question, index, now)),
    histologyItem(now),
    deckItem(now),
    essayItem(now),
    blockedMediaQuestion(now),
    blockedVideoPractical(now),
  ]
}

export function demoAttemptRecords(now = new Date()): AttemptRecord[] {
  const sessions = [
    { id: 'demo-cvs-foundations', daysAgo: 12, hour: 19, duration: 730, overtime: 0 },
    { id: 'demo-respiratory-review', daysAgo: 7, hour: 17, duration: 820, overtime: 0 },
    { id: 'demo-mixed-block', daysAgo: 3, hour: 20, duration: 1015, overtime: 25 },
    { id: 'demo-paced-retest', daysAgo: 1, hour: 18, duration: 645, overtime: 0 },
  ]
  const pace = [39, 52, 68, 84, 103, 44, 59, 76, 91, 48, 64]
  return sessions.flatMap((session, sessionIndex) => questions.map((question, questionIndex) => {
    const correctIndex = Math.max(0, question.options.findIndex((option) => option.correct))
    const correct = (questionIndex + sessionIndex * 2) % 5 !== 0
    const answeredAt = new Date(at(now, session.daysAgo, session.hour, questionIndex * 2))
    return {
      id: `${session.id}:qbank:${question.id}`,
      at: answeredAt.toISOString(),
      surface: 'qbank' as const,
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      subtopic: question.topic,
      difficulty: question.difficulty,
      conceptIds: [conceptIdFor(question)],
      correct,
      seconds: Math.max(30, pace[questionIndex] - sessionIndex * 3),
      selectedIndex: correct ? correctIndex : (correctIndex + 1) % question.options.length,
      correctIndex,
      sessionDurationSeconds: session.duration,
      sessionOvertimeSeconds: session.overtime,
      sessionId: session.id,
    }
  }))
}

export function demoAttemptDocuments(now = new Date()): { index: AttemptIndex; months: AttemptMonth[] } {
  const records = demoAttemptRecords(now)
  const index = records.reduce(indexAttempt, EMPTY_INDEX)
  const grouped = new Map<string, AttemptRecord[]>()
  for (const record of records) {
    const month = attemptMonth(record.at)
    grouped.set(month, [...(grouped.get(month) ?? []), record])
  }
  return {
    index,
    months: [...grouped.entries()].map(([month, monthRecords]) => ({ version: 1, month, records: monthRecords })),
  }
}

export function demoConceptGraph(): ConceptGraph {
  const concepts: Concept[] = [...new Map(questions.map((question) => [conceptIdFor(question), {
    id: conceptIdFor(question),
    label: question.topic,
    aliases: [],
    definition: `Demo preview concept for the ${question.topic} question set.`,
    status: 'active' as const,
    articleIds: question.libraryRefs.map((reference) => reference.id),
    subjectId: question.subjectId,
    publicationStatus: 'published',
  }])).values()]
  return { concepts, relations: [] }
}

export function demoMastery(now = new Date()): MasteryLedger {
  return demoAttemptRecords(now).reduce((ledger, record) => recordEvidence(ledger, {
    conceptIds: record.conceptIds,
    source: 'question',
    correct: Boolean(record.correct),
    at: record.at,
  }), {} as MasteryLedger)
}

export function demoStudyBlocks(now = new Date()): StudyBlock[] {
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1)
  const nextDay = new Date(now); nextDay.setDate(nextDay.getDate() + 2)
  return [
    { id: 'demo-block-review', title: 'Review heart failure mistakes', date: isoDay(now), start: '09:00', end: '09:45', subjectId: 'cvs', kind: 'Library reading', done: true },
    { id: 'demo-block-qbank', title: 'Mixed timed question block', date: isoDay(now), start: '15:30', end: '16:15', subjectId: 'cvs', kind: 'Question bank' },
    { id: 'demo-block-histology', title: 'Histology microscope practice', date: isoDay(now), start: '19:00', end: '19:35', subjectId: 'cvs', kind: 'Practical' },
    { id: 'demo-block-osce', title: 'Respiratory examination station', date: isoDay(tomorrow), start: '17:00', end: '17:45', subjectId: 'resp', kind: 'Practical' },
    { id: 'demo-block-flashcards', title: 'Due flashcards', date: isoDay(nextDay), start: '18:30', end: '19:00', subjectId: 'pharm', kind: 'Study block' },
  ]
}

export function demoNotes(now = new Date()): NotebookNote[] {
  const notes = [
    {
      id: 'demo-note-hf', title: 'Heart failure · compensation to treatment',
      text: 'Core idea\nA fall in cardiac output triggers sympathetic and RAAS compensation. These support perfusion in the short term but increase afterload, preload, oxygen demand, and adverse remodelling.\n\nFour pillars\nARNI or ACE inhibitor, evidence-based beta-blocker, MRA, and SGLT2 inhibitor.\n\nExam trap\nLoop diuretics improve congestion but are not a mortality-modifying pillar.',
      tags: ['Cardiovascular', 'Heart failure', 'High yield'], subjectId: 'cvs', subtopicId: 'hf-patho', subtopicTitle: 'Pathophysiology', daysAgo: 1,
    },
    {
      id: 'demo-note-abg', title: 'ABG · five-step approach',
      text: '1. Decide whether the blood is acidotic or alkalotic.\n2. Identify the primary respiratory or metabolic driver.\n3. Check whether compensation is appropriate.\n4. Calculate the anion gap in metabolic acidosis.\n5. Return to the clinical context.',
      tags: ['Renal', 'Acid–base', 'Checklist'], subjectId: 'renal', subtopicId: 'ab-approach', subtopicTitle: 'Structured approach', daysAgo: 3,
    },
  ]
  return notes.map((note) => ({
    id: note.id, title: note.title, body: note.text, plainText: note.text,
    editorJson: plainTextToEditorJson(note.text), revision: 1,
    tags: note.tags, subjectId: note.subjectId, subtopicId: note.subtopicId, subtopicTitle: note.subtopicTitle,
    updatedAt: at(now, note.daysAgo, 18, 20),
  }))
}

function demoBoardState(): BoardState {
  return {
    frames: [
      { id: 'demo-frame-mechanism', x: 80, y: 80, width: 760, height: 330, title: 'Mechanism → consequence' },
      { id: 'demo-frame-action', x: 900, y: 80, width: 470, height: 330, title: 'Treatment targets' },
    ],
    notes: [
      { id: 'demo-wb-output', x: 130, y: 150, text: '↓ Cardiac output', tone: 'rose' },
      { id: 'demo-wb-sns', x: 390, y: 125, text: 'Sympathetic activation\n↑ HR · vasoconstriction', tone: 'amber' },
      { id: 'demo-wb-raas', x: 390, y: 270, text: 'RAAS activation\nNa⁺ / water retention', tone: 'teal' },
      { id: 'demo-wb-remodel', x: 660, y: 190, text: 'Adverse remodelling\n+ congestion', tone: 'rose' },
      { id: 'demo-wb-pillars', x: 960, y: 145, text: 'Four pillars\nARNI · β-blocker\nMRA · SGLT2i', tone: 'sage' },
      { id: 'demo-wb-diuretic', x: 1130, y: 285, text: 'Loop diuretic\nSymptom relief', tone: 'paper' },
    ],
    links: [
      { id: 'demo-link-1', from: 'demo-wb-output', to: 'demo-wb-sns' },
      { id: 'demo-link-2', from: 'demo-wb-output', to: 'demo-wb-raas' },
      { id: 'demo-link-3', from: 'demo-wb-sns', to: 'demo-wb-remodel' },
      { id: 'demo-link-4', from: 'demo-wb-raas', to: 'demo-wb-remodel' },
      { id: 'demo-link-5', from: 'demo-wb-remodel', to: 'demo-wb-pillars' },
    ],
    ink: [{ id: 'demo-ink', points: [960, 390, 1030, 430, 1110, 410, 1210, 450], color: 'var(--color-primary)', width: 4 }],
  }
}

export function demoWhiteboards(now = new Date()): WhiteboardCollection {
  const base = emptyWhiteboardCollection('local-student', 'Student', 'asu', '1')
  const own: WhiteboardDocument = {
    ...base.boards[0], id: 'demo-board-hf', title: 'Heart failure map', state: demoBoardState(),
    topics: ['Cardiovascular', 'Heart failure'], revision: 3, updatedAt: at(now, 1, 20, 0),
  }
  const second: WhiteboardDocument = {
    ...base.boards[0], id: 'demo-board-abg', title: 'ABG workflow',
    state: {
      frames: [{ id: 'demo-abg-frame', x: 100, y: 100, width: 900, height: 290, title: 'Five-step interpretation' }],
      notes: [
        { id: 'demo-abg-1', x: 150, y: 175, text: '1 · pH', tone: 'teal' },
        { id: 'demo-abg-2', x: 360, y: 175, text: '2 · Primary process', tone: 'amber' },
        { id: 'demo-abg-3', x: 600, y: 175, text: '3 · Compensation', tone: 'sage' },
        { id: 'demo-abg-4', x: 840, y: 175, text: '4 · Anion gap', tone: 'rose' },
      ],
      links: [
        { id: 'demo-abg-l1', from: 'demo-abg-1', to: 'demo-abg-2' },
        { id: 'demo-abg-l2', from: 'demo-abg-2', to: 'demo-abg-3' },
        { id: 'demo-abg-l3', from: 'demo-abg-3', to: 'demo-abg-4' },
      ],
    },
    topics: ['Renal', 'Acid–base'], revision: 1, updatedAt: at(now, 4, 16, 0),
  }
  const shared: WhiteboardDocument = {
    ...own, id: 'demo-shared-board', title: 'Cranial nerve localisation', ownerId: 'demo-classmate', ownerName: '@neuro-nora',
    permission: 'view', collaborators: [{ userId: 'demo-colleague', username: 'neuro-nora', permission: 'view' }],
    topics: ['Neurology', 'Cranial nerves'], stars: ['demo-a', 'demo-b', 'demo-c'], follows: ['local-student'], revision: 6,
    updatedAt: at(now, 0, 13, 40),
  }
  return { activeBoardId: own.id, boards: [own, second], sharedBoards: [shared], migratedFromSingleBoard: true }
}

export function demoPracticalProgress(now = new Date()): PracticalProgress {
  return {
    version: 1,
    stations: {
      'os-cvs': { attempts: 2, bestMarks: 20, outOf: 24, lastAt: at(now, 2, 16), checkedItems: ['inspection', 'pulse', 'heart-sounds'] },
      'os-resp': { attempts: 1, bestMarks: 17, outOf: 22, lastAt: at(now, 6, 17), checkedItems: ['inspection', 'expansion', 'auscultation'] },
    },
    cases: {
      'cc-breath': { status: 'completed', lastStep: 6, steps: 6, lastAt: at(now, 4, 20) },
      'cc-chest': { status: 'in-progress', lastStep: 3, steps: 5, lastAt: at(now, 1, 21) },
    },
    labs: {
      'li-abg': { done: 12, items: 20, lastAt: at(now, 3, 18) },
      'li-ecg': { done: 8, items: 30, lastAt: at(now, 5, 19) },
    },
    skills: {
      'sk-bp': { status: 'ready', lastAt: at(now, 2, 10) },
      'sk-cvs': { status: 'practised', lastAt: at(now, 2, 16) },
      'sk-ecg': { status: 'practised', lastAt: at(now, 5, 19) },
    },
  }
}

export function demoPlatformReport(now = new Date()) {
  const gib = 1024 ** 3
  return {
    generatedAt: now.toISOString(),
    storage: {
      usedBytes: 22.8 * gib,
      bySource: { resource: 14.2 * gib, notebook: 3.1 * gib, whiteboard: 5.5 * gib },
      reachedThresholdGb: 20,
      acknowledgedThresholdGb: null,
      warning: true,
      acknowledgedBy: null,
      acknowledgedAt: null,
    },
    students: { total: 2847, active: 1936, signups30d: 218 },
    subscriptions: { active: 1724, revenueCurrency: 'EGP', revenue30d: 624000 },
    engagement: { verifiedAnswers30d: 486210, activeAnswerers30d: 1658 },
    verifiedQuestionActivity: { answers30d: 486210 },
    contentHealth: { total: 8421, published: 7816, invalid: 14 },
    mediaBlockedContent: 37,
    reports: { open: 18, total: 326 },
    pendingEnrollmentChanges: 12,
    notificationDelivery: { outbound30d: 118420, problem30d: 29 },
  }
}

export function demoLeaderboard(metric: 'accuracy' | 'mastery') {
  const people = [
    ['neuro-nora', 0.94, 684, 126], ['cardio-karim', 0.92, 912, 119], ['hema-hana', 0.91, 531, 112],
    ['renal-ramy', 0.89, 740, 107], ['pharm-farah', 0.88, 608, 101], ['surg-salma', 0.87, 489, 94],
  ] as const
  return {
    rows: people.map(([username, accuracy, verifiedAnswers, securedConcepts], index) => ({
      rank: index + 1, username, profileIcon: null,
      ...(metric === 'accuracy' ? { accuracy, verifiedAnswers } : { securedConcepts, verifiedAnswers }),
      lastVerifiedAt: new Date().toISOString(),
    })),
    scope: { university: 'Ain Shams University', year: 'Year 1', term: 'Current term · demo preview' },
    viewer: { eligible: false, verifiedAnswers: 44, requiredAnswers: 100 },
  }
}

function parse<T>(storage: StorageLike, key: string): T | null {
  try {
    const value = storage.getItem(key)
    return value == null ? null : JSON.parse(value) as T
  } catch {
    return null
  }
}

function write(storage: StorageLike, key: string, value: unknown): void {
  storage.setItem(key, JSON.stringify(value))
}

function emptyRecord(value: unknown): boolean {
  return !value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length === 0
}

function boardIsUntouched(collection: WhiteboardCollection | null): boolean {
  if (!collection || collection.boards.length === 0) return true
  if (collection.boards.length !== 1 || collection.sharedBoards.length > 0) return false
  const state = collection.boards[0].state
  return state.notes.length === 0 && state.links.length === 0 && state.frames.length === 0
    && (state.images?.length ?? 0) === 0 && (state.files?.length ?? 0) === 0 && (state.ink?.length ?? 0) === 0
}

/**
 * Fill an untouched browser-only demo with showcase data once.
 *
 * `main.tsx` calls this only when there is no live API. Existing student work
 * wins: personal records are seeded only when they are still structurally
 * empty, while the shared demo catalogue is merged by id so an authored local
 * record is never overwritten.
 */
export function seedDemoShowcase(storage: StorageLike, now = new Date()): void {
  if (storage.getItem(DEMO_SHOWCASE_MARKER_KEY) === DEMO_SHOWCASE_VERSION) return

  const currentContent = parse<ManagedContentItem[]>(storage, CONTENT_LEDGER_STORAGE_KEY)
  const byId = new Map((Array.isArray(currentContent) ? currentContent : []).map((item) => [item.id, item]))
  for (const item of demoManagedContent(now)) if (!byId.has(item.id)) byId.set(item.id, item)
  write(storage, CONTENT_LEDGER_STORAGE_KEY, [...byId.values()])

  const currentIndex = parse<AttemptIndex>(storage, ATTEMPT_INDEX_KEY)
  if (!currentIndex || currentIndex.totals.attempts === 0) {
    const attempts = demoAttemptDocuments(now)
    write(storage, ATTEMPT_INDEX_KEY, attempts.index)
    attempts.months.forEach((month) => write(storage, attemptMonthKey(month.month), month))
    write(storage, DEMO_SESSION_NAMES_KEY, {
      'demo-cvs-foundations': 'CVS foundations check',
      'demo-respiratory-review': 'Respiratory review',
      'demo-mixed-block': 'Mixed systems timed block',
      'demo-paced-retest': 'Paced weakness retest',
    })
    const manifests = Object.fromEntries(['demo-cvs-foundations', 'demo-respiratory-review', 'demo-mixed-block', 'demo-paced-retest']
      .map((sessionId) => [sessionId, questions.map((question) => question.id)]))
    write(storage, DEMO_SESSION_QUESTIONS_KEY, manifests)
    write(storage, DEMO_MARKED_QUESTIONS_KEY, [questions[1]?.id, questions[6]?.id].filter(Boolean))
  }

  const blocks = parse<StudyBlock[]>(storage, STUDY_BLOCKS_STORAGE_KEY)
  if (!Array.isArray(blocks) || blocks.length === 0) write(storage, STUDY_BLOCKS_STORAGE_KEY, demoStudyBlocks(now))

  const notes = parse<NotebookNote[]>(storage, DEMO_NOTEBOOK_KEY)
  if (!Array.isArray(notes) || notes.length === 0) write(storage, DEMO_NOTEBOOK_KEY, demoNotes(now))

  const boards = parse<WhiteboardCollection>(storage, WHITEBOARD_COLLECTION_KEY)
  if (boardIsUntouched(boards)) write(storage, WHITEBOARD_COLLECTION_KEY, demoWhiteboards(now))

  const practical = parse<PracticalProgress>(storage, PRACTICAL_PROGRESS_STORAGE_KEY)
  if (!practical || emptyRecord(practical.stations) && emptyRecord(practical.cases) && emptyRecord(practical.labs) && emptyRecord(practical.skills)) {
    write(storage, PRACTICAL_PROGRESS_STORAGE_KEY, demoPracticalProgress(now))
  }

  const mastery = parse<MasteryLedger>(storage, MASTERY_STORAGE_KEY)
  if (emptyRecord(mastery)) write(storage, MASTERY_STORAGE_KEY, demoMastery(now))

  const graph = parse<ConceptGraph>(storage, CONCEPT_STORAGE_KEY)
  if (!graph?.concepts?.length) write(storage, CONCEPT_STORAGE_KEY, demoConceptGraph())

  const bookmarks = parse<string[]>(storage, DEMO_BOOKMARKS_KEY)
  if (!Array.isArray(bookmarks) || bookmarks.length === 0) write(storage, DEMO_BOOKMARKS_KEY, ['r-kc', 'r-ng106', 'r-art-abg'])

  storage.setItem(DEMO_SHOWCASE_MARKER_KEY, DEMO_SHOWCASE_VERSION)
}
