import { useMemo, useState } from 'react'
import { BookOpenText, ChevronRight, Eraser, FileQuestion, Filter, FolderOpen, GitFork, Layers3, Library, Minus, Pencil, Plus, Stethoscope, Trash2, X } from 'lucide-react'
import type { CurriculumCourse } from '@/data/universities'
import type { ManagedContentItem } from '@/data/contentControl'
import type { ConceptGraph } from '@/data/conceptGraph'
import { buildCurriculumMembership } from '@/data/curriculumMembership'
import { COURSE_CURRICULA_STORAGE_KEY, EMPTY_CURRICULUM_SELECTION as EMPTY, curriculumCount, type CourseCurriculumSelection } from '@/data/courseCurriculum'
import {
  addSubject, curriculumOfTree, findSubject, mergeCurricula, newModuleSubject, removeSubject,
  subjectPath, updateSubject, walkSubjects, type ModuleSubject,
} from '@/data/moduleSubjects'
import { indexMedicalTaxonomy } from '@/data/medicalLibraryTaxonomy'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { subjects } from '@/data/subjects'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Tabs } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import { LibraryTopicPicker } from '@/components/admin/LibraryTopicPicker'

export { COURSE_CURRICULA_STORAGE_KEY }
export type { CourseCurriculumSelection }

type CurriculumTab = 'topics' | 'question' | 'practical' | 'concept' | 'resource'

/** Which list on the selection each content tab writes to. */
const TAB_FIELD = {
  question: 'questionIds',
  practical: 'practicalIds',
  concept: 'conceptIds',
  resource: 'resourceIds',
} as const

/**
 * What a module covers, chosen one subject at a time — and one branch of a
 * subject at a time.
 *
 * Content used to be picked for the module as a whole, which left its topics,
 * questions and practicals in one undifferentiated pile with no relationship to
 * the disciplines that are examined. The rail on the left is the module's
 * subjects, and a subject may be split as far as the curriculum goes: Anatomy
 * into Basis of Anatomy into Osteology, with library topics chosen at whichever
 * level they actually belong to.
 *
 * Marks stay on a module's direct subjects. Splitting one never moves what it
 * is worth, which is why nothing here re-parents an existing subject — a new
 * branch is always a new, empty one.
 */
export function CourseCurriculumDialog({ course, year, items, graph, value, onClose, onSave }: {
  course: CurriculumCourse | null
  year: string
  items: ManagedContentItem[]
  graph: ConceptGraph
  value?: ModuleSubject[]
  onClose: () => void
  onSave: (subjects: ModuleSubject[]) => void
}) {
  const [moduleSubjects, setModuleSubjects] = useState<ModuleSubject[]>(
    () => (value?.length ? structuredClone(value) : [newModuleSubject('General')]),
  )
  /** The selected subject's id, or null for the whole-module summary. */
  const [active, setActive] = useState<string | null>(() => (value?.length ? value[0].id : null))
  const [collapsed, setCollapsed] = useState<string[]>([])
  const [renaming, setRenaming] = useState<string | null>(null)
  const [nameDraft, setNameDraft] = useState('')
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

  if (!course) return null

  const current = active ? findSubject(moduleSubjects, active) : undefined
  const wholeModule = !current
  const draft = current?.curriculum ?? EMPTY
  const merged = mergeCurricula(moduleSubjects)

  /** Every write lands on the selected subject, wherever it sits in the tree. */
  const setDraft = (updater: (selection: CourseCurriculumSelection) => CourseCurriculumSelection) => {
    if (!current) return
    setModuleSubjects((currentSubjects) => updateSubject(currentSubjects, current.id, (subject) => ({
      ...subject,
      curriculum: updater(subject.curriculum),
    })))
  }

  const chosenTopics = draft.topicNodeIds ?? []
  const field = tab === 'topics' ? 'articleIds' : TAB_FIELD[tab]
  const selected = (draft[field] as string[] | undefined) ?? []
  const counts = {
    topics: chosenTopics.length,
    question: draft.questionIds.length,
    practical: draft.practicalIds.length,
    concept: (draft.conceptIds ?? []).length,
    resource: (draft.resourceIds ?? []).length,
  }

  const add = (key: keyof CourseCurriculumSelection, ids: string[]) =>
    setDraft((selection) => ({ ...selection, [key]: [...new Set([...((selection[key] as string[] | undefined) ?? []), ...ids])] }))

  /** The other half of `add`: take these back out, wherever they came from. */
  const drop = (key: keyof CourseCurriculumSelection, ids: string[]) => {
    const gone = new Set(ids)
    setDraft((selection) => ({ ...selection, [key]: (((selection[key] as string[] | undefined) ?? []).filter((id) => !gone.has(id))) }))
  }

  function toggle(id: string) {
    setDraft((selection) => {
      const list = (selection[field] as string[] | undefined) ?? []
      return { ...selection, [field]: list.includes(id) ? list.filter((entry) => entry !== id) : [...list, id] }
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

  /* ---- The rail ---------------------------------------------------------- */

  function addBranch(parentId: string | null) {
    const child = newModuleSubject('')
    setModuleSubjects((currentSubjects) => addSubject(currentSubjects, parentId, child))
    if (parentId) setCollapsed((current) => current.filter((id) => id !== parentId))
    setActive(child.id)
    setRenaming(child.id)
    setNameDraft('')
  }

  function dropBranch(id: string) {
    setModuleSubjects((currentSubjects) => removeSubject(currentSubjects, id))
    if (active === id || subjectPath(moduleSubjects, active ?? '').some((entry) => entry.id === id)) setActive(null)
  }

  function saveName(id: string) {
    const name = nameDraft.trim()
    setRenaming(null)
    if (!name) return
    setModuleSubjects((currentSubjects) => updateSubject(currentSubjects, id, (subject) => ({ ...subject, name })))
  }

  const tabNoun = tab === 'question' ? 'questions' : tab === 'practical' ? 'practical items' : tab === 'resource' ? 'resources' : tab === 'concept' ? 'concepts' : 'articles'
  const filteredIds = tab === 'concept' ? filteredConcepts.map((concept) => concept.id) : filtered.map((item) => item.id)
  const filteredSelected = filteredIds.filter((id) => selected.includes(id))
  const trail = current ? subjectPath(moduleSubjects, current.id) : []

  function RailRow({ subject, depth }: { subject: ModuleSubject; depth: number }) {
    const children = subject.children ?? []
    const isOpen = !collapsed.includes(subject.id)
    const isActive = active === subject.id
    const covered = curriculumCount(curriculumOfTree(subject))

    return (
      <li>
        {renaming === subject.id ? (
          <form
            className="flex items-center gap-1 py-0.5"
            style={{ paddingInlineStart: `${depth * 0.85}rem` }}
            onSubmit={(event) => { event.preventDefault(); saveName(subject.id) }}
          >
            <TextInput
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') { event.preventDefault(); saveName(subject.id) }
                if (event.key === 'Escape') { event.preventDefault(); setRenaming(null) }
              }}
              className="h-8 min-w-0 flex-1"
              autoFocus
              placeholder="Subject name"
              aria-label="Subject name"
            />
            <Button type="submit" variant="primary" size="sm">OK</Button>
          </form>
        ) : (
          <div
            className={cn('group flex items-center gap-0.5 rounded-lg', isActive ? 'bg-accent-tint' : 'hover:bg-inset')}
            style={{ paddingInlineStart: `${depth * 0.85}rem` }}
          >
            <button
              type="button"
              onClick={() => setCollapsed((current) => current.includes(subject.id) ? current.filter((id) => id !== subject.id) : [...current, subject.id])}
              className={cn('grid size-6 shrink-0 place-items-center rounded text-ink-3', children.length === 0 && 'invisible')}
              aria-label={isOpen ? `Collapse ${subject.name || 'subject'}` : `Expand ${subject.name || 'subject'}`}
              aria-expanded={isOpen}
            >
              <Icon icon={ChevronRight} size={12} className={cn('transition-transform', isOpen && 'rotate-90')} />
            </button>
            <button
              type="button"
              onClick={() => setActive(subject.id)}
              onDoubleClick={() => { setRenaming(subject.id); setNameDraft(subject.name) }}
              className={cn('min-w-0 flex-1 truncate py-2 pe-1 text-start text-[12.5px]', isActive ? 'font-medium text-accent-strong' : 'text-ink-2')}
            >
              {subject.name || 'Untitled subject'}
              <span className="tnum ms-1.5 font-mono text-[10.5px] text-ink-3">{covered}</span>
            </button>
            <button type="button" onClick={() => addBranch(subject.id)} className="grid size-7 shrink-0 place-items-center rounded text-ink-3 hover:text-accent-strong" aria-label={`Add a subject under ${subject.name || 'this subject'}`}>
              <Icon icon={Plus} size={12} />
            </button>
            <button type="button" onClick={() => { setRenaming(subject.id); setNameDraft(subject.name) }} className="grid size-7 shrink-0 place-items-center rounded text-ink-3 hover:text-ink" aria-label={`Rename ${subject.name || 'subject'}`}>
              <Icon icon={Pencil} size={12} />
            </button>
            <button type="button" onClick={() => dropBranch(subject.id)} className="grid size-7 shrink-0 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label={`Remove ${subject.name || 'subject'}`}>
              <Icon icon={Trash2} size={12} />
            </button>
          </div>
        )}
        {isOpen && children.length > 0 && (
          <ul className="space-y-0.5">
            {children.map((child) => <RailRow key={child.id} subject={child} depth={depth + 1} />)}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/25 p-0 backdrop-blur-[2px] sm:p-4" role="dialog" aria-modal="true" aria-labelledby="course-curriculum-title">
      <div className="flex h-full max-h-none w-full max-w-6xl flex-col overflow-hidden border border-line bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-pop sm:h-[90vh] sm:rounded-2xl sm:pb-0 sm:pt-0">
        <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-3 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpenText} size={17} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="course-curriculum-title" className="truncate font-serif text-[18px] font-semibold text-ink">{course.name} curriculum</h2>
            <p className="truncate text-[11.5px] text-ink-3">
              {trail.length > 0 ? trail.map((entry) => entry.name || 'Untitled').join(' › ') : `${year} · ${course.block} · name the subjects, then choose what each one covers`}
            </p>
          </div>
          <button type="button" onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close curriculum editor"><Icon icon={X} size={18} /></button>
          <div className="flex basis-full justify-end gap-2 sm:contents"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="button" variant="primary" onClick={() => onSave(moduleSubjects.filter((subject) => subject.name.trim() || curriculumCount(curriculumOfTree(subject)) > 0))}>Save curriculum</Button></div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* Subjects rail — the same list the Marks & Exams dialog edits, and
              whatever each subject has been split into beneath it. */}
          <aside className="max-h-[30vh] shrink-0 overflow-y-auto border-b border-line bg-surface-2/40 p-2 lg:max-h-none lg:w-72 lg:border-b-0 lg:border-e">
            <button
              type="button"
              onClick={() => setActive(null)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-start text-[12.5px] font-semibold',
                wholeModule ? 'bg-accent-tint text-accent-strong' : 'text-ink hover:bg-inset',
              )}
            >
              <Icon icon={Library} size={15} />
              <span className="flex-1 truncate">Whole module</span>
              <span className="tnum font-mono text-[11px] text-ink-3">{curriculumCount(merged)}</span>
            </button>

            <p className="mb-1 mt-3 px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">Subjects</p>
            <ul className="space-y-0.5">
              {moduleSubjects.map((subject) => <RailRow key={subject.id} subject={subject} depth={0} />)}
            </ul>
            <Button className="mt-2 w-full" variant="secondary" size="sm" iconLeft={Plus} onClick={() => addBranch(null)}>Add subject</Button>
            <p className="mt-2 px-2.5 text-[11px] leading-relaxed text-ink-3">
              Marks stay on a module’s own subjects. Splitting one does not change what it is worth.
            </p>
          </aside>

          <div className="flex min-h-0 flex-1 flex-col">
            {wholeModule ? (
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <p className="text-[12.5px] text-ink-2">Everything this module covers, gathered from its subjects and everything beneath them. Read-only — choose a subject on the left to change what it takes.</p>
                <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
                  {walkSubjects(moduleSubjects).map((subject) => {
                    const depth = subjectPath(moduleSubjects, subject.id).length - 1
                    return (
                      <li key={subject.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5" style={{ paddingInlineStart: `${1 + depth * 1.1}rem` }}>
                        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{subject.name || 'Untitled subject'}</span>
                        <span className="text-[11.5px] text-ink-3">
                          {(subject.curriculum.topicNodeIds ?? []).length} topics · {subject.curriculum.articleIds.length} library · {subject.curriculum.questionIds.length} questions · {subject.curriculum.practicalIds.length} practical · {(subject.curriculum.conceptIds ?? []).length} concepts · {(subject.curriculum.resourceIds ?? []).length} resources
                        </span>
                      </li>
                    )
                  })}
                  {moduleSubjects.length === 0 && <li className="px-4 py-6 text-center text-[12.5px] text-ink-3">No subjects yet.</li>}
                </ul>
              </div>
            ) : (
              <>
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

                {/* One press per chosen topic, on every tab — and the same press
                    in reverse, because a mis-click that adds two hundred items
                    needs an undo that is not two hundred clicks. */}
                {chosenTopics.length > 0 && tab !== 'topics' && (
                  <div className="flex flex-wrap items-center gap-2 border-b border-line bg-accent-tint/25 px-4 py-2.5">
                    <span className="text-[11.5px] font-semibold text-accent-strong">From {current?.name || 'this subject'}&rsquo;s library topics</span>
                    {chosenTopics.map((nodeId) => {
                      const node = taxonomyIndex.byId.get(nodeId)
                      const title = node?.title ?? nodeId
                      const available = underTopic(nodeId)
                      const fresh = available.filter((id) => !selected.includes(id))
                      const here = available.filter((id) => selected.includes(id))
                      const empty = available.length === 0
                      return (
                        <span key={nodeId} className="inline-flex items-center gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            iconLeft={empty ? undefined : Plus}
                            disabled={fresh.length === 0}
                            onClick={() => add(field, available)}
                            title={empty ? 'Nothing is tagged to this topic yet.' : fresh.length === 0 ? 'Every one of these is already in this subject.' : undefined}
                          >
                            {empty
                              ? `No ${tabNoun} under ${title} yet`
                              : fresh.length === 0
                                ? `All ${tabNoun} under ${title} added`
                                : `Add all ${tabNoun} under ${title} (${fresh.length})`}
                          </Button>
                          {here.length > 0 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              iconLeft={Minus}
                              onClick={() => drop(field, available)}
                              title={`Take the ${here.length} ${tabNoun} under ${title} back out`}
                            >
                              {here.length}
                            </Button>
                          )}
                        </span>
                      )
                    })}
                  </div>
                )}

                {tab === 'topics' ? (
                  <div className="flex min-h-0 flex-1 flex-col px-3 pt-3 sm:px-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="min-w-0 flex-1 text-[12px] text-ink-3">
                        The same tree students browse. Tick the topics <strong className="text-ink-2">{current?.name || 'this subject'}</strong> covers — every tab can then take everything under them in one press.
                      </p>
                      {chosenTopics.length > 0 && (
                        <Button type="button" size="sm" variant="ghost" iconLeft={Eraser} onClick={() => setDraft((selection) => ({ ...selection, topicNodeIds: [] }))}>
                          Clear {chosenTopics.length} {chosenTopics.length === 1 ? 'topic' : 'topics'}
                        </Button>
                      )}
                    </div>
                    <LibraryTopicPicker
                      nodes={medicalTaxonomy}
                      chosen={chosenTopics}
                      onChange={(topicNodeIds) => setDraft((selection) => ({ ...selection, topicNodeIds }))}
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
                          <Select aria-label="Filter by system" value={subjectId} onChange={(event) => setSubjectId(event.target.value)} className="w-36"><option value="all">All systems</option>{subjects.map((system) => <option key={system.id} value={system.id}>{system.name}</option>)}</Select>
                          <Select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)} className="w-40"><option value="all">All topics</option>{topics.map((item) => <option key={item}>{item}</option>)}</Select>
                          {(tab === 'question' || tab === 'practical') && <Select aria-label="Filter by difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="w-32"><option value="all">All difficulty</option><option>Easy</option><option>Moderate</option><option>Hard</option><option>Challenging</option></Select>}
                        </>
                      )}
                      <div className="ms-auto flex flex-wrap items-center gap-1.5">
                        <Button
                          type="button"
                          size="sm"
                          iconLeft={Plus}
                          disabled={filteredIds.length === filteredSelected.length}
                          onClick={() => add(field, filteredIds)}
                        >
                          Include filtered ({filteredIds.length - filteredSelected.length})
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          iconLeft={Minus}
                          disabled={filteredSelected.length === 0}
                          onClick={() => drop(field, filteredIds)}
                          title="Take the filtered items back out of this subject"
                        >
                          Remove filtered ({filteredSelected.length})
                        </Button>
                        {selected.length > 0 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            iconLeft={Eraser}
                            onClick={() => setDraft((selection) => ({ ...selection, [field]: [] }))}
                            title={`Take all ${selected.length} ${tabNoun} out of this subject`}
                          >
                            Clear all ({selected.length})
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-4">
                      <div className="grid gap-2 md:grid-cols-2">
                        {tab === 'concept'
                          ? filteredConcepts.map((concept) => {
                            const checked = selected.includes(concept.id)
                            return (
                              <label key={concept.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-accent-line bg-accent-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                                <input type="checkbox" checked={checked} onChange={() => toggle(concept.id)} className="mt-1 size-4 accent-[var(--color-accent)]" />
                                <span className="min-w-0 flex-1"><span className="line-clamp-2 block text-[13px] font-semibold leading-snug text-ink">{concept.label}</span><span className="mt-1 block truncate font-mono text-[10px] text-ink-3">{concept.id}</span></span>
                              </label>
                            )
                          })
                          : filtered.map((item) => {
                            const checked = selected.includes(item.id)
                            const system = subjects.find((candidate) => candidate.id === item.subjectId)
                            return (
                              <label key={item.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-accent-line bg-accent-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                                <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} className="mt-1 size-4 accent-[var(--color-accent)]" />
                                <span className="min-w-0 flex-1"><span className="line-clamp-2 block text-[13px] font-semibold leading-snug text-ink">{item.title}</span><span className="mt-1 flex flex-wrap gap-1.5"><Badge tone="outline">{system?.short ?? item.subjectId}</Badge>{item.fields.Topic && <Badge tone="neutral">{item.fields.Topic}</Badge>}{item.fields.Difficulty && <Badge tone="warning">{item.fields.Difficulty}</Badge>}</span></span>
                              </label>
                            )
                          })}
                      </div>
                      {filteredIds.length === 0 && (
                        <div className="py-16 text-center">
                          <p className="text-[13px] font-medium text-ink">No {tabNoun} match these filters</p>
                          <p className="mt-1 text-[12px] text-ink-3">Change a filter to broaden the curriculum pool.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line bg-surface px-4 py-3 text-[11.5px] text-ink-3 sm:px-5 sm:text-[12px]">
          <span>
            {walkSubjects(moduleSubjects).length} {walkSubjects(moduleSubjects).length === 1 ? 'subject' : 'subjects'} · {(merged.topicNodeIds ?? []).length} topics · {merged.articleIds.length} library · {merged.questionIds.length} questions · {merged.practicalIds.length} practical · {(merged.conceptIds ?? []).length} concepts · {(merged.resourceIds ?? []).length} resources
          </span>
          <span className="sm:ms-auto">Saved per university, year, and module.</span>
        </footer>
      </div>
    </div>
  )
}
