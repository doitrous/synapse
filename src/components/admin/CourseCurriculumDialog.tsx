import { useMemo, useState } from 'react'
import { BookOpenText, FileQuestion, Filter, FolderOpen, GitFork, Layers3, Plus, Stethoscope, X } from 'lucide-react'
import type { CurriculumCourse } from '@/data/universities'
import type { ManagedContentItem } from '@/data/contentControl'
import type { ConceptGraph } from '@/data/conceptGraph'
import { buildCurriculumMembership } from '@/data/curriculumMembership'
import { indexMedicalTaxonomy } from '@/data/medicalLibraryTaxonomy'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { subjects } from '@/data/subjects'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Tabs } from '@/components/ui/Tabs'
import { LibraryTopicPicker } from '@/components/admin/LibraryTopicPicker'

/** Where a module's chosen content lives, keyed `${universityId}:${year}:${courseId}`. */
export const COURSE_CURRICULA_STORAGE_KEY = 'synapse-course-curricula-v1'

export interface CourseCurriculumSelection {
  articleIds: string[]
  questionIds: string[]
  practicalIds: string[]
  /**
   * Library topics this module covers. Records intent, where the id lists record
   * outcome — so "everything under Valve disease" survives content being added
   * later, and the admin can re-run it rather than re-tick it.
   */
  topicNodeIds?: string[]
  conceptIds?: string[]
  resourceIds?: string[]
}

type CurriculumTab = 'topics' | 'question' | 'practical' | 'concept' | 'resource'

const EMPTY: CourseCurriculumSelection = { articleIds: [], questionIds: [], practicalIds: [], topicNodeIds: [], conceptIds: [], resourceIds: [] }

/** Which list on the selection each content tab writes to. */
const TAB_FIELD = {
  question: 'questionIds',
  practical: 'practicalIds',
  concept: 'conceptIds',
  resource: 'resourceIds',
} as const

export function CourseCurriculumDialog({ course, year, items, graph, value, onClose, onSave }: {
  course: CurriculumCourse | null
  year: string
  items: ManagedContentItem[]
  graph: ConceptGraph
  value?: CourseCurriculumSelection
  onClose: () => void
  onSave: (value: CourseCurriculumSelection) => void
}) {
  const [draft, setDraft] = useState<CourseCurriculumSelection>(() => ({ ...EMPTY, ...structuredClone(value ?? EMPTY) }))
  const [tab, setTab] = useState<CurriculumTab>('topics')
  const [query, setQuery] = useState('')
  const [subjectId, setSubjectId] = useState('all')
  const [topic, setTopic] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [medicalTaxonomy] = useMedicalTaxonomy()

  const taxonomyIndex = useMemo(() => indexMedicalTaxonomy(medicalTaxonomy), [medicalTaxonomy])
  const membership = useMemo(() => buildCurriculumMembership({ items, graph, medicalTaxonomy }), [items, graph, medicalTaxonomy])

  const contentKind = tab === 'question' ? 'question' : tab === 'practical' ? 'practical' : tab === 'resource' ? 'resource' : 'article'
  const kindItems = useMemo(() => items.filter((item) => item.kind === contentKind), [items, contentKind])
  const topics = useMemo(() => [...new Set(kindItems.map((item) => item.fields.Topic).filter(Boolean))].sort(), [kindItems])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (tab === 'concept') return []
    return kindItems.filter((item) => {
      if (subjectId !== 'all' && item.subjectId !== subjectId) return false
      if (topic !== 'all' && item.fields.Topic !== topic) return false
      if (difficulty !== 'all' && item.fields.Difficulty !== difficulty) return false
      return !normalized || `${item.title} ${Object.values(item.fields).join(' ')}`.toLowerCase().includes(normalized)
    })
  }, [difficulty, kindItems, query, subjectId, tab, topic])

  const filteredConcepts = useMemo(() => {
    if (tab !== 'concept') return []
    const normalized = query.trim().toLowerCase()
    return graph.concepts.filter((concept) => !normalized || `${concept.label} ${concept.id} ${concept.definition}`.toLowerCase().includes(normalized))
  }, [graph.concepts, query, tab])

  const chosenTopics = draft.topicNodeIds ?? []

  if (!course) return null

  const field = tab === 'topics' ? 'articleIds' : TAB_FIELD[tab]
  const selected = draft[field] ?? []
  const counts = {
    topics: chosenTopics.length,
    question: draft.questionIds.length,
    practical: draft.practicalIds.length,
    concept: (draft.conceptIds ?? []).length,
    resource: (draft.resourceIds ?? []).length,
  }

  const add = (key: keyof CourseCurriculumSelection, ids: string[]) =>
    setDraft((current) => ({ ...current, [key]: [...new Set([...((current[key] as string[] | undefined) ?? []), ...ids])] }))

  function toggle(id: string) {
    setDraft((current) => {
      const list = (current[field] as string[] | undefined) ?? []
      return { ...current, [field]: list.includes(id) ? list.filter((entry) => entry !== id) : [...list, id] }
    })
  }

  /** Everything the active tab would take from one topic. */
  function underTopic(nodeId: string): string[] {
    if (tab === 'question') return membership.questionsUnder(nodeId).map((item) => item.id)
    if (tab === 'practical') return membership.practicalsUnder(nodeId).map((item) => item.id)
    if (tab === 'resource') return membership.resourcesUnder(nodeId).map((item) => item.id)
    if (tab === 'concept') return membership.conceptsUnder(nodeId).map((concept) => concept.id)
    return membership.articlesUnder(nodeId).map((item) => item.id)
  }

  const tabNoun = tab === 'question' ? 'questions' : tab === 'practical' ? 'practical items' : tab === 'resource' ? 'resources' : tab === 'concept' ? 'concepts' : 'articles'

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/25 p-0 backdrop-blur-[2px] sm:p-4" role="dialog" aria-modal="true" aria-labelledby="course-curriculum-title">
      <div className="flex h-full max-h-none w-full max-w-5xl flex-col overflow-hidden border border-line bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-pop sm:h-[90vh] sm:rounded-2xl sm:pb-0 sm:pt-0">
        <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-3 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={BookOpenText} size={17} /></span>
          <div className="min-w-0 flex-1"><h2 id="course-curriculum-title" className="truncate font-serif text-[18px] font-semibold text-ink">{course.name} curriculum</h2><p className="truncate text-[11.5px] text-ink-3">{year} · {course.block} · define the exact module catalogue</p></div>
          <button type="button" onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close curriculum editor"><Icon icon={X} size={18} /></button>
          <div className="flex basis-full justify-end gap-2 sm:contents"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="button" variant="primary" onClick={() => onSave(draft)}>Save curriculum</Button></div>
        </header>

        <Tabs
          className="shrink-0 bg-surface px-4"
          value={tab}
          onChange={(next) => { setTab(next as CurriculumTab); setQuery(''); setTopic('all'); setDifficulty('all') }}
          items={[
            { value: 'topics', label: 'Library topics', icon: Layers3, count: counts.topics },
            { value: 'question', label: 'Questions by filters', icon: FileQuestion, count: counts.question },
            { value: 'practical', label: 'Practical questions', icon: Stethoscope, count: counts.practical },
            { value: 'concept', label: 'Concepts', icon: GitFork, count: counts.concept },
            { value: 'resource', label: 'Resources', icon: FolderOpen, count: counts.resource },
          ]}
        />

        {/* One press per chosen topic, on every tab — including this one, where it
            takes the articles that sit under the topic rather than the topic itself. */}
        {chosenTopics.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-primary-tint/25 px-4 py-2.5">
            <span className="text-[11.5px] font-semibold text-primary-strong">From your library topics</span>
            {chosenTopics.map((nodeId) => {
                  const node = taxonomyIndex.byId.get(nodeId)
                  const title = node?.title ?? nodeId
                  const available = underTopic(nodeId)
                  const fresh = available.filter((id) => !selected.includes(id))
                  // Three states, and they mean different things: nothing exists there
                  // yet, everything there is already in, or there is work to do.
                  const empty = available.length === 0
                  return (
                    <Button
                      key={nodeId}
                      type="button"
                      size="sm"
                      variant="secondary"
                      iconLeft={empty ? undefined : Plus}
                      disabled={fresh.length === 0}
                      onClick={() => add(field, available)}
                      title={empty ? `Nothing is tagged to this topic yet.` : fresh.length === 0 ? 'Every one of these is already in the module.' : undefined}
                    >
                      {empty
                        ? `No ${tabNoun} under ${title} yet`
                        : fresh.length === 0
                          ? `All ${tabNoun} under ${title} added`
                          : `Add all ${tabNoun} under ${title} (${fresh.length})`}
                </Button>
              )
            })}
          </div>
        )}

        {tab === 'topics' ? (
          <div className="flex min-h-0 flex-1 flex-col px-3 pt-3 sm:px-4">
            <p className="mb-2 text-[12px] text-ink-3">
              The same tree students browse. Tick the topics this module covers — every tab can then take everything under them in one press.
            </p>
            <LibraryTopicPicker
              nodes={medicalTaxonomy}
              chosen={chosenTopics}
              onChange={(topicNodeIds) => setDraft((current) => ({ ...current, topicNodeIds }))}
              counts={(nodeId) => membership.articlesUnder(nodeId).length}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
              <Icon icon={Filter} size={15} className="shrink-0 text-ink-3" />
              <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search available ${tabNoun}…`} className="w-56" />
              {tab !== 'concept' && (
                <>
                  <Select aria-label="Filter by subject" value={subjectId} onChange={(event) => setSubjectId(event.target.value)} className="w-36"><option value="all">All subjects</option>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</Select>
                  <Select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)} className="w-40"><option value="all">All topics</option>{topics.map((item) => <option key={item}>{item}</option>)}</Select>
                  {(tab === 'question' || tab === 'practical') && <Select aria-label="Filter by difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="w-32"><option value="all">All difficulty</option><option>Easy</option><option>Moderate</option><option>Hard</option><option>Challenging</option></Select>}
                </>
              )}
              <Button
                type="button"
                size="sm"
                iconLeft={Plus}
                className="ms-auto"
                onClick={() => add(field, tab === 'concept' ? filteredConcepts.map((concept) => concept.id) : filtered.map((item) => item.id))}
              >
                Include filtered ({tab === 'concept' ? filteredConcepts.length : filtered.length})
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <div className="grid gap-2 md:grid-cols-2">
                {tab === 'concept'
                  ? filteredConcepts.map((concept) => {
                    const checked = selected.includes(concept.id)
                    return (
                      <label key={concept.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-primary-line bg-primary-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(concept.id)} className="mt-1 size-4 accent-[var(--color-primary)]" />
                        <span className="min-w-0 flex-1"><span className="line-clamp-2 block text-[13px] font-semibold leading-snug text-ink">{concept.label}</span><span className="mt-1 block truncate font-mono text-[10px] text-ink-3">{concept.id}</span></span>
                      </label>
                    )
                  })
                  : filtered.map((item) => {
                    const checked = selected.includes(item.id)
                    const subject = subjects.find((candidate) => candidate.id === item.subjectId)
                    return (
                      <label key={item.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-primary-line bg-primary-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} className="mt-1 size-4 accent-[var(--color-primary)]" />
                        <span className="min-w-0 flex-1"><span className="line-clamp-2 block text-[13px] font-semibold leading-snug text-ink">{item.title}</span><span className="mt-1 flex flex-wrap gap-1.5"><Badge tone="outline">{subject?.short ?? item.subjectId}</Badge>{item.fields.Topic && <Badge tone="neutral">{item.fields.Topic}</Badge>}{item.fields.Difficulty && <Badge tone="warning">{item.fields.Difficulty}</Badge>}</span></span>
                      </label>
                    )
                  })}
              </div>
              {(tab === 'concept' ? filteredConcepts.length : filtered.length) === 0 && (
                <div className="py-16 text-center">
                  <p className="text-[13px] font-medium text-ink">No {tabNoun} match these filters</p>
                  <p className="mt-1 text-[12px] text-ink-3">Change a filter to broaden the curriculum pool.</p>
                </div>
              )}
            </div>
          </>
        )}

        <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line bg-surface px-4 py-3 text-[11.5px] text-ink-3 sm:px-5 sm:text-[12px]">
          <span>{counts.topics} topics · {draft.articleIds.length} library · {counts.question} questions · {counts.practical} practical · {counts.concept} concepts · {counts.resource} resources</span>
          <span className="sm:ms-auto">Saved per university, year, and module.</span>
        </footer>
      </div>
    </div>
  )
}
