import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { libraryTopics as SEED_TOPICS, updatedAtFor as seedUpdatedAtFor, type LibTopic, type Subtopic, type LibBlock } from '@/data/library'
import { universities } from '@/data/universities'
import { subjects } from '@/data/student'
import { API_MODE } from './api'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type MedicalEvidenceStore } from '@/data/medicalEvidence'

export type LiveSubtopic = Subtopic & { topicId: string; topicTitle: string; subjectId: string }

/** Split a section body into paragraph blocks. */
function bodyToBlocks(body: string): LibBlock[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({ type: 'p', text }))
}

/** Apply an admin ledger article item's edits on top of a seeded subtopic. */
function overlaySubtopic(sub: Subtopic, item: ManagedContentItem | undefined): Subtopic {
  if (!item) return sub
  const d = item.articleData
  const sections = (d?.sections ?? []).filter((s) => s.heading?.trim() || s.body?.trim())
  const hasEditedBody = sections.some((s) => s.body?.trim())

  let blocks: LibBlock[] = sub.blocks
  if (hasEditedBody) {
    blocks = []
    sections.forEach((s) => {
      if (s.heading?.trim()) blocks.push({ type: 'h', text: s.heading.trim() })
      if (s.body?.trim()) blocks.push(...bodyToBlocks(s.body))
    })
    ;(d?.loseTheMark ?? []).filter(Boolean).forEach((text) => blocks.push({ type: 'callout', tone: 'warning', text }))
  }

  // University-only notes render as a distinct accent callout wherever the article appears.
  const notes = (d?.universityNotes ?? []).filter((n) => n.text?.trim())
  if (notes.length) {
    blocks = [
      ...blocks,
      ...notes.map((n): LibBlock => {
        const short = universities.find((u) => u.id === n.universityId)?.short ?? n.universityId
        return { type: 'callout', tone: 'accent', title: `${short} only`, text: n.text.trim() }
      }),
    ]
  }

  const keyPoints = (d?.holdThese ?? []).filter(Boolean)
  return {
    ...sub,
    title: item.title?.trim() || sub.title,
    summary: (d?.summary || item.fields.Summary || sub.summary),
    readingMin: Number(item.fields['Reading time']) || sub.readingMin,
    keyPoints: keyPoints.length ? keyPoints : sub.keyPoints,
    blocks,
    updatedAt: item.updatedAt || sub.updatedAt,
  }
}

/** Build a fresh subtopic from an admin-created article that has no seed. */
function articleToSubtopic(item: ManagedContentItem, evidence: MedicalEvidenceStore): Subtopic {
  const d = item.articleData
  const sections = (d?.sections ?? [])
    .filter((s) => s.heading?.trim() || s.body?.trim())
    .filter((s) => !/^Evidence not yet available/i.test(s.body.trim()))
    .sort((a, b) => (a.kind === 'components' ? 1 : 0) - (b.kind === 'components' ? 1 : 0))
  const blocks: LibBlock[] = []
  sections.forEach((s) => {
    if (s.heading?.trim()) blocks.push({ type: 'h', text: s.heading.trim() })
    const spans = (s.spanIds ?? []).map((id) => evidence.articleSpans.find((span) => span.id === id)).filter(Boolean)
    if (spans.length) {
      spans.forEach((span) => blocks.push({ type: 'fact', text: span!.text, spanId: span!.id, claimIds: span!.claimIds, citationIds: span!.citationIds }))
    } else if (s.body?.trim()) blocks.push(...bodyToBlocks(s.body))
  })
  ;(d?.loseTheMark ?? []).filter(Boolean).forEach((text) => blocks.push({ type: 'callout', tone: 'warning', text }))
  ;(d?.universityNotes ?? []).filter((n) => n.text?.trim()).forEach((n) => {
    const short = universities.find((u) => u.id === n.universityId)?.short ?? n.universityId
    blocks.push({ type: 'callout', tone: 'accent', title: `${short} only`, text: n.text!.trim() })
  })
  return {
    id: item.id,
    title: item.title,
    readingMin: Number(item.fields['Reading time']) || 6,
    summary: d?.summary || item.fields.Summary || '',
    blocks,
    keyPoints: (d?.holdThese ?? []).filter(Boolean),
    questions: [],
    resources: (d?.resourceIds ?? []).map((id) => evidence.resources.find((resource) => resource.id === id)?.title ?? id),
    updatedAt: item.updatedAt,
    universityIds: d?.universityIds ?? [],
    yearIds: d?.yearIds ?? [],
    moduleIds: d?.moduleIds ?? [],
    relatedConceptIds: d?.relatedConceptIds ?? [],
    resourceIds: d?.resourceIds ?? [],
    evidenceState: item.fields['Evidence state'],
    publicationGate: d?.publicationGate,
  }
}

/**
 * The library as students should see it right now: the seeded topics with every
 * admin edit from the content ledger overlaid, plus any brand-new articles
 * created in Library Setup (grouped under their chapter). Archived articles are
 * hidden. This is the single source the student Library reads.
 */
export function useLiveLibrary() {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)

  return useMemo(() => {
    const articleItems = ledger.filter((i) => i.kind === 'article' && i.status !== 'Archived' && (!API_MODE || i.status === 'Published'))
    const byId = new Map(articleItems.map((i) => [i.id, i]))
    const baseTopics = API_MODE ? [] : SEED_TOPICS
    const seededIds = new Set(baseTopics.flatMap((t) => t.subtopics.map((s) => s.id)))

    // 1) Seeded topics with overlays, dropping any article the admin archived.
    const topics: LibTopic[] = baseTopics.map((tp) => ({
      ...tp,
      subtopics: tp.subtopics
        .filter((s) => byId.has(s.id) || !ledger.some((i) => i.id === s.id)) // hide only if explicitly archived
        .map((s) => overlaySubtopic(s, byId.get(s.id))),
    }))

    // 2) Admin-created articles with no seed → grouped under a matching chapter.
    const topicByKey = new Map(topics.map((t) => [`${t.subjectId}::${t.title.toLowerCase()}`, t]))
    articleItems
      .filter((i) => !seededIds.has(i.id))
      .forEach((item) => {
        const chapter = (item.fields.Topic || 'New articles').trim()
        const key = `${item.subjectId}::${chapter.toLowerCase()}`
        let topic = topicByKey.get(key)
        if (!topic) {
          topic = { id: `live-${item.subjectId}-${chapter.toLowerCase().replace(/\s+/g, '-')}`, title: chapter, subjectId: item.subjectId, subtopics: [] }
          topics.push(topic)
          topicByKey.set(key, topic)
        }
        topic.subtopics.push(articleToSubtopic(item, evidence))
      })

    const orderedTopics = topics.filter((t) => t.subtopics.length > 0)
    const subtopics: LiveSubtopic[] = orderedTopics.flatMap((t) =>
      t.subtopics.map((s) => ({ ...s, topicId: t.id, topicTitle: t.title, subjectId: t.subjectId })),
    )

    const updatedAtFor = (id: string): Date => {
      const s = subtopics.find((x) => x.id === id)
      return s?.updatedAt ? new Date(s.updatedAt) : seedUpdatedAtFor(id)
    }

    return { topics: orderedTopics, subtopics, updatedAtFor, subjects }
  }, [evidence, ledger])
}
