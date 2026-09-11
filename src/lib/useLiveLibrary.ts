import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { useArticleIndex, useContentItem } from './content'
import { isStudentPublishable, type ManagedContentItem } from '@/data/contentControl'
import { libraryTopics as SEED_TOPICS, type LibTopic, type Subtopic } from '@/data/library'
import { subjects, getSubject } from '@/data/subjects'
import { moduleCatalogueOrder } from '@/data/contentModules'
import { compareLibraryTopics } from '@/data/libraryOrder'
import { API_MODE } from './api'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type MedicalEvidenceStore } from '@/data/medicalEvidence'
import { overlaySubtopic, articleToSubtopic } from '@/data/articleProjection'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { catalogueAvailability } from './catalogueAvailability'
import { useUniversityCatalogue } from './useUniversityCatalogue'

export type LiveSubtopic = Subtopic & { topicId: string; topicTitle: string; subjectId: string }

/** A stable empty graph, so passing it never changes a memo's dependencies. */
const EMPTY_GRAPH = initialConceptGraph()

/** Every subject's place in the curriculum, in the order `subjects` declares it. */
const subjectRank = new Map(subjects.map((subject, index) => [subject.id, index]))

/**
 * The library as students should see it right now: the seeded topics with every
 * admin edit from the content ledger overlaid, plus any brand-new articles
 * created in Library Setup (grouped under their chapter). Archived articles are
 * hidden. This is the single source the student Library reads.
 */
export function useLiveLibrary() {
  /**
   * The article *index*: every field a list needs and no article body at all.
   * Bodies are the largest thing in the catalogue and a list renders none of
   * them, so the reader fetches the one it is showing — see `useArticleWithBody`.
   */
  const [index, ledgerStatus] = useArticleIndex()
  const [evidence, , evidenceStatus] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [catalogue] = useUniversityCatalogue()
  // The concept graph is deliberately NOT read here. This projection works over
  // article *index* rows, which carry no `articleData` — so `readerAnnotations`
  // has nothing to resolve and the graph would never be consulted. Loading it
  // was ~16 MB fetched on every list and hub that mounts this hook (Library,
  // Learn, Notebook, the Question Bank hub, rooms, challenges) for no output.
  // The graph is loaded once, on demand, only when a student opens an article —
  // see `useArticleWithBody`, which needs it to render that article's inline
  // concept annotations.
  const graph = EMPTY_GRAPH

  return useMemo(() => {
    // No `kind` check: this route serves articles and nothing else, and an
    // index row does not carry the field.
    const articleItems = index.items.filter((item) => {
      if (item.status === 'Archived') return false
      if (item.status === 'Published' && !isStudentPublishable(item)) return false
      return !API_MODE || isStudentPublishable(item)
    })
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
        .filter((s) => byId.has(s.id) || !index.items.some((i) => i.id === s.id)) // hide only if explicitly archived
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
     * The link exists in one direction — a question records which library
     * articles it tests — and reading it backwards used to mean scanning every
     * question in the ledger from the browser. The server walks the same
     * questions once per published version and sends the result with the index.
     */
    for (const topic of topics) {
      for (const subtopic of topic.subtopics) {
        const linked = index.questionLinks[subtopic.id]
        if (linked) subtopic.questions = linked
      }
    }

    // By module, in the order the faculty teaches them, then by subject within
    // that module — a student browsing the library should meet a system's
    // articles together, not scattered in whatever order they happened to be
    // authored.
    const moduleRank = moduleCatalogueOrder(catalogue)
    const orderedTopics = topics
      .filter((t) => t.subtopics.length > 0)
      .sort((a, b) => compareLibraryTopics(a, b, moduleRank, subjectRank, (id) => getSubject(id).name))
    const subtopics: LiveSubtopic[] = orderedTopics.flatMap((t) =>
      t.subtopics.map((s) => ({ ...s, topicId: t.id, topicTitle: t.title, subjectId: t.subjectId })),
    )

    /** The article's real revision time, or null when it has never been recorded. */
    const updatedAtFor = (id: string): Date | null => {
      const s = subtopics.find((x) => x.id === id)
      return s?.updatedAt ? new Date(s.updatedAt) : null
    }

    /**
     * Whether this is a library with nothing in it, one that has not arrived
     * yet, or one that failed to load. In live mode all three look identical
     * from `subtopics` alone — an empty array — so the caller cannot tell them
     * apart without this.
     */
    const availability = catalogueAvailability({
      statuses: [ledgerStatus, evidenceStatus],
      itemCount: subtopics.length,
    })

    return { topics: orderedTopics, subtopics, updatedAtFor, subjects, availability }
  }, [catalogue, evidence, evidenceStatus, graph, index, ledgerStatus])
}

/**
 * One article with its body, fetched only once a student opens it.
 *
 * `useLiveLibrary` deals in index rows, which carry no `articleData` — so the
 * projection they go through produces the right title, scope and links but an
 * empty `blocks`. This re-runs the *same* projection over the full item and
 * lays it over the index row, which is what the reader renders. Until it lands
 * the index row stands in, so the article's title and place on the page are
 * there immediately rather than after a round trip.
 */
export function useArticleWithBody(
  article: LiveSubtopic | undefined,
  allSubtopics: readonly LiveSubtopic[],
): LiveSubtopic | undefined {
  const [item] = useContentItem(article?.id ?? null)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)

  return useMemo(() => {
    if (!article) return undefined
    if (!item || item.id !== article.id) return article
    // `relatedArticleLinks` only reads a title off this map, and dropping an id
    // that is not in it is the publish gate — which `allSubtopics` already is.
    const readable = new Map<string, ManagedContentItem>(
      allSubtopics.map((subtopic) => [subtopic.id, { id: subtopic.id, title: subtopic.title } as ManagedContentItem]),
    )
    const projected = articleToSubtopic(item, evidence, graph, readable)
    // `questions` comes from the index's back-links; the projection sets it
    // empty because a single item cannot know what points at it.
    return { ...article, ...projected, questions: article.questions }
  }, [article, allSubtopics, evidence, graph, item])
}
