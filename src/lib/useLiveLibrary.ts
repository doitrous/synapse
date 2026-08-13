import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { libraryTopics as SEED_TOPICS, type LibTopic, type LinkedQuestion, type Subtopic } from '@/data/library'
import { subjects } from '@/data/subjects'
import { API_MODE } from './api'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type MedicalEvidenceStore } from '@/data/medicalEvidence'
import { overlaySubtopic, articleToSubtopic } from '@/data/articleProjection'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'

export type LiveSubtopic = Subtopic & { topicId: string; topicTitle: string; subjectId: string }

/**
 * The library as students should see it right now: the seeded topics with every
 * admin edit from the content ledger overlaid, plus any brand-new articles
 * created in Library Setup (grouped under their chapter). Archived articles are
 * hidden. This is the single source the student Library reads.
 */
export function useLiveLibrary() {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)

  return useMemo(() => {
    const articleItems = ledger.filter((i) => i.kind === 'article' && i.status !== 'Archived' && (!API_MODE || i.status === 'Published'))
    const byId = new Map(articleItems.map((i) => [i.id, i]))
    // Related reading may only point at an article this projection will render,
    // so the same filtered set decides both what exists and what may be linked.
    const readable = byId
    const baseTopics = API_MODE ? [] : SEED_TOPICS
    const seededIds = new Set(baseTopics.flatMap((t) => t.subtopics.map((s) => s.id)))

    // 1) Seeded topics with overlays, dropping any article the admin archived.
    const topics: LibTopic[] = baseTopics.map((tp) => ({
      ...tp,
      subtopics: tp.subtopics
        .filter((s) => byId.has(s.id) || !ledger.some((i) => i.id === s.id)) // hide only if explicitly archived
        .map((s) => overlaySubtopic(s, byId.get(s.id), evidence, graph, readable)),
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
        topic.subtopics.push(articleToSubtopic(item, evidence, graph, readable))
      })

    /**
     * The published questions that name each article, keyed by article id.
     *
     * The link already exists in one direction — a question records which
     * library articles it tests — but nothing read it backwards, so
     * `articleToSubtopic` set `questions: []` and every authored article
     * advertised "Test yourself · 0 questions" no matter how many pointed at it.
     */
    const questionsByArticle = new Map<string, LinkedQuestion[]>()
    for (const item of ledger) {
      if (item.kind !== 'question' || item.status !== 'Published') continue
      const stem = item.title
      for (const articleId of item.questionData?.libraryIds ?? []) {
        questionsByArticle.set(articleId, [...(questionsByArticle.get(articleId) ?? []), { id: item.id, stem }])
      }
    }
    for (const topic of topics) {
      for (const subtopic of topic.subtopics) {
        const linked = questionsByArticle.get(subtopic.id)
        if (linked) subtopic.questions = linked
      }
    }

    const orderedTopics = topics.filter((t) => t.subtopics.length > 0)
    const subtopics: LiveSubtopic[] = orderedTopics.flatMap((t) =>
      t.subtopics.map((s) => ({ ...s, topicId: t.id, topicTitle: t.title, subjectId: t.subjectId })),
    )

    /** The article's real revision time, or null when it has never been recorded. */
    const updatedAtFor = (id: string): Date | null => {
      const s = subtopics.find((x) => x.id === id)
      return s?.updatedAt ? new Date(s.updatedAt) : null
    }

    return { topics: orderedTopics, subtopics, updatedAtFor, subjects }
  }, [evidence, graph, ledger])
}
