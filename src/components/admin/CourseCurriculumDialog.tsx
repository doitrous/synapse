import { useMemo, useState, type DragEvent } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, BookOpenText, ChevronRight, Eraser, FileQuestion, Filter, FolderOpen, GitFork, GripVertical, Indent, Layers3, Library, Minus, Outdent, Pencil, Plus, Stethoscope, Trash2, TriangleAlert, X, type LucideIcon } from 'lucide-react'
import type { CurriculumCourse } from '@/data/universities'
import type { ManagedContentItem } from '@/data/contentControl'
import type { ConceptGraph } from '@/data/conceptGraph'
import { buildCurriculumMembership } from '@/data/curriculumMembership'
import { COURSE_CURRICULA_STORAGE_KEY, EMPTY_CURRICULUM_SELECTION as EMPTY, curriculumCount, type CourseCurriculumSelection } from '@/data/courseCurriculum'
import {
  addSubject, canMoveSubject, curriculumOfTree, findSubject, marksLostByMove, mergeCurricula,
  moveSubject, newModuleSubject, parentOf, removeSubject, siblingsOf, subjectPath, updateSubject,
  walkSubjects, type ModuleSubject, type SubjectDrop,
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
import { overlayPortal } from '@/lib/overlayPortal'

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

/** The rail's own id for the whole-module row, which is no subject at all. */
const WHOLE_MODULE = '\u0000whole-module'

/** Back to the top of the module, where a subject's marks are counted again. */
const TO_TOP: SubjectDrop = { kind: 'inside', targetId: null }

/** What a drag is currently proposing, so the row under the pointer can show it. */
interface DropHint { targetId: string; kind: SubjectDrop['kind'] }

/**
 * Everything a rail row needs from the dialog around it.
 *
 * The row used to be declared inside the dialog. That gave React a new
 * component type on every render, so the whole rail was thrown away and rebuilt
 * on each keystroke — taking the caret in the name being typed to the end of
 * the field with it. Handing the row its context instead is what keeps it one
 * stable component, and the caret where the author put it.
 */
interface Rail {
  subjects: ModuleSubject[]
  active: string | null
  collapsed: string[]
  renaming: string | null
  nameDraft: string
  arranging: boolean
  dragging: string | null
  hint: DropHint | null
  select: (id: string | null) => void
  toggleOpen: (id: string) => void
  setNameDraft: (value: string) => void
  startRename: (subject: ModuleSubject) => void
  cancelRename: () => void
  saveName: (id: string) => void
  add: (parentId: string | null) => void
  remove: (id: string) => void
  setDragging: (id: string | null) => void
  setHint: (hint: DropHint | null) => void
  /** Every rearrangement — dragged or pressed — asks through here. */
  move: (id: string, drop: SubjectDrop) => void
}

/**
 * One subject in the rail, and everything beneath it.
 *
 * A row can be dragged anywhere the tree allows: onto the top or bottom edge of
 * another row to sit beside it, or into its middle to sit under it. The same
 * four moves are on buttons under `Arrange`, because a curriculum of eighteen
 * lectures is not a thing anyone should have to drag one at a time, and because
 * a drag is not a gesture a keyboard has.
 */
function RailRow({ subject, depth, rail }: { subject: ModuleSubject; depth: number; rail: Rail }) {
  const children = subject.children ?? []
  const isOpen = !rail.collapsed.includes(subject.id)
  const isActive = rail.active === subject.id
  const covered = curriculumCount(curriculumOfTree(subject))
  const name = subject.name || 'subject'

  const siblings = siblingsOf(rail.subjects, subject.id)
  const index = siblings.findIndex((entry) => entry.id === subject.id)
  const above = index > 0 ? siblings[index - 1] : null
  const below = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null
  const parent = parentOf(rail.subjects, subject.id)

  /** The four pressable moves. Each is disabled where it has nowhere to go. */
  const moves: { icon: LucideIcon; label: string; mirror?: boolean; drop: SubjectDrop | null }[] = [
    { icon: ArrowUp, label: `Move ${name} up`, drop: above ? { kind: 'before', targetId: above.id } : null },
    { icon: ArrowDown, label: `Move ${name} down`, drop: below ? { kind: 'after', targetId: below.id } : null },
    { icon: Outdent, mirror: true, label: `Move ${name} out from under ${parent?.name || 'its parent'}`, drop: parent ? { kind: 'after', targetId: parent.id } : null },
    { icon: Indent, mirror: true, label: `Move ${name} under ${above?.name || 'the subject above'}`, drop: above ? { kind: 'inside', targetId: above.id } : null },
  ]

  const hint = rail.hint?.targetId === subject.id ? rail.hint.kind : null

  /**
   * What releasing here would mean: the top and bottom edges place the dragged
   * subject beside this one, the middle puts it inside. Null when the tree
   * would not survive it, which is also how the row knows not to light up.
   */
  function proposalAt(event: DragEvent<HTMLElement>): SubjectDrop | null {
    if (!rail.dragging) return null
    const box = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientY - box.top) / (box.height || 1)
    const kind = ratio < 0.28 ? 'before' : ratio > 0.72 ? 'after' : 'inside'
    const drop = { kind, targetId: subject.id } as SubjectDrop
    return canMoveSubject(rail.subjects, rail.dragging, drop) ? drop : null
  }

  return (
    <li>
      {rail.renaming === subject.id ? (
        <form
          className="flex items-center gap-1 py-0.5"
          style={{ paddingInlineStart: `${depth * 0.85}rem` }}
          onSubmit={(event) => { event.preventDefault(); rail.saveName(subject.id) }}
        >
          <TextInput
            value={rail.nameDraft}
            onChange={(event) => rail.setNameDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') { event.preventDefault(); rail.saveName(subject.id) }
              if (event.key === 'Escape') { event.preventDefault(); rail.cancelRename() }
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
          draggable
          onDragStart={(event) => { event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', subject.id); rail.setDragging(subject.id) }}
          onDragEnd={() => { rail.setDragging(null); rail.setHint(null) }}
          onDragOver={(event) => {
            const drop = proposalAt(event)
            if (!drop) return
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
            rail.setHint({ targetId: subject.id, kind: drop.kind })
          }}
          onDrop={(event) => {
            const drop = proposalAt(event)
            const dragged = rail.dragging
            rail.setHint(null)
            if (!drop || !dragged) return
            event.preventDefault()
            rail.move(dragged, drop)
          }}
          className={cn(
            'group flex items-center gap-0.5 rounded-lg',
            isActive ? 'bg-primary-tint' : 'hover:bg-inset',
            rail.dragging === subject.id && 'opacity-40',
            hint === 'inside' && 'ring-2 ring-primary',
            hint === 'before' && 'shadow-[inset_0_2px_0_0_var(--color-primary)]',
            hint === 'after' && 'shadow-[inset_0_-2px_0_0_var(--color-primary)]',
          )}
          style={{ paddingInlineStart: `${depth * 0.85}rem` }}
        >
          <span className="grid size-4 shrink-0 cursor-grab place-items-center text-ink-3/45 active:cursor-grabbing" title={`Drag to move ${name}`}>
            <Icon icon={GripVertical} size={12} />
          </span>
          <button
            type="button"
            onClick={() => rail.toggleOpen(subject.id)}
            className={cn('grid size-6 shrink-0 place-items-center rounded text-ink-3', children.length === 0 && 'invisible')}
            aria-label={isOpen ? `Collapse ${name}` : `Expand ${name}`}
            aria-expanded={isOpen}
          >
            <Icon icon={ChevronRight} size={12} className={cn('chevron-turn')} open={isOpen} />
          </button>
          <button
            type="button"
            onClick={() => rail.select(subject.id)}
            onDoubleClick={() => rail.startRename(subject)}
            className={cn('min-w-0 flex-1 truncate py-2 pe-1 text-start text-[12.5px]', isActive ? 'font-medium text-primary-strong' : 'text-ink-2')}
          >
            {subject.name || 'Untitled subject'}
            <span className="tnum ms-1.5 font-mono text-[10.5px] text-ink-3">{covered}</span>
          </button>
          {rail.arranging ? (
            moves.map((move) => (
              <button
                key={move.label}
                type="button"
                disabled={!move.drop}
                onClick={() => { if (move.drop) rail.move(subject.id, move.drop) }}
                className="grid size-6 shrink-0 place-items-center rounded text-ink-3 hover:text-primary-strong disabled:pointer-events-none disabled:opacity-25"
                aria-label={move.label}
                title={move.label}
              >
                <Icon icon={move.icon} size={12} className={cn(move.mirror && 'rtl:-scale-x-100')} />
              </button>
            ))
          ) : (
            <>
              <button type="button" onClick={() => rail.add(subject.id)} className="grid size-7 shrink-0 place-items-center rounded text-ink-3 hover:text-primary-strong" aria-label={`Add a subject under ${name}`}>
                <Icon icon={Plus} size={12} />
              </button>
              <button type="button" onClick={() => rail.startRename(subject)} className="grid size-7 shrink-0 place-items-center rounded text-ink-3 hover:text-ink" aria-label={`Rename ${name}`}>
                <Icon icon={Pencil} size={12} />
              </button>
              <button type="button" onClick={() => rail.remove(subject.id)} className="grid size-7 shrink-0 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label={`Remove ${name}`}>
                <Icon icon={Trash2} size={12} />
              </button>
            </>
          )}
        </div>
      )}
      {isOpen && children.length > 0 && (
        <ul className="space-y-0.5">
          {children.map((child) => <RailRow key={child.id} subject={child} depth={depth + 1} rail={rail} />)}
        </ul>
      )}
    </li>
  )
}

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
  const [arranging, setArranging] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)
  const [hint, setHint] = useState<DropHint | null>(null)
  /** A move that would cost the module marks, held until it is confirmed. */
  const [pending, setPending] = useState<{ id: string; drop: SubjectDrop; marks: number } | null>(null)
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

  function applyMove(id: string, drop: SubjectDrop) {
    setModuleSubjects((currentSubjects) => moveSubject(currentSubjects, id, drop))
    // A subject dropped into a collapsed parent would otherwise vanish.
    if (drop.kind === 'inside' && drop.targetId) setCollapsed((current) => current.filter((entry) => entry !== drop.targetId))
    setPending(null)
  }

  /**
   * Every rearrangement, dragged or pressed, comes through here — and every one
   * that would stop a subject's marks counting towards the module is held for
   * an answer first rather than quietly changing what the module is worth.
   */
  function requestMove(id: string, drop: SubjectDrop) {
    if (!canMoveSubject(moduleSubjects, id, drop)) return
    const marks = marksLostByMove(moduleSubjects, id, drop)
    if (marks > 0) { setPending({ id, drop, marks }); return }
    applyMove(id, drop)
  }

  const rail: Rail = {
    subjects: moduleSubjects,
    active, collapsed, renaming, nameDraft, arranging, dragging, hint,
    select: setActive,
    toggleOpen: (id) => setCollapsed((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id])),
    setNameDraft,
    startRename: (subject) => { setRenaming(subject.id); setNameDraft(subject.name) },
    cancelRename: () => setRenaming(null),
    saveName,
    add: addBranch,
    remove: dropBranch,
    setDragging,
    setHint,
    move: requestMove,
  }

  /** The subject a held move would land beneath, named in the warning. */
  const pendingParent = pending
    ? pending.drop.kind === 'inside'
      ? (pending.drop.targetId ? findSubject(moduleSubjects, pending.drop.targetId) : undefined)
      : parentOf(moduleSubjects, pending.drop.targetId) ?? undefined
    : undefined

  const tabNoun = tab === 'question' ? 'questions' : tab === 'practical' ? 'practical items' : tab === 'resource' ? 'resources' : tab === 'concept' ? 'concepts' : 'articles'
  const filteredIds = tab === 'concept' ? filteredConcepts.map((concept) => concept.id) : filtered.map((item) => item.id)
  const filteredSelected = filteredIds.filter((id) => selected.includes(id))
  const trail = current ? subjectPath(moduleSubjects, current.id) : []

  return overlayPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/25 p-0 backdrop-blur-[2px] sm:p-4" role="dialog" aria-modal="true" aria-labelledby="course-curriculum-title">
      <div className="flex h-full max-h-none w-full max-w-6xl flex-col overflow-hidden border border-line bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-pop sm:h-[90vh] sm:rounded-2xl sm:pb-0 sm:pt-0">
        <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-3 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={BookOpenText} size={17} /></span>
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
            {/* Also where a subject is dropped to bring it back to the top of
                the module — the one level at which marks are counted. */}
            <button
              type="button"
              onClick={() => setActive(null)}
              onDragOver={(event) => {
                if (!dragging || !canMoveSubject(moduleSubjects, dragging, TO_TOP)) return
                event.preventDefault()
                event.dataTransfer.dropEffect = 'move'
                setHint({ targetId: WHOLE_MODULE, kind: 'inside' })
              }}
              onDragLeave={() => setHint((current) => (current?.targetId === WHOLE_MODULE ? null : current))}
              onDrop={(event) => {
                event.preventDefault()
                setHint(null)
                if (dragging) requestMove(dragging, TO_TOP)
              }}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-start text-[12.5px] font-semibold',
                wholeModule ? 'bg-primary-tint text-primary-strong' : 'text-ink hover:bg-inset',
                hint?.targetId === WHOLE_MODULE && 'ring-2 ring-primary',
              )}
            >
              <Icon icon={Library} size={15} />
              <span className="flex-1 truncate">Whole module</span>
              <span className="tnum font-mono text-[11px] text-ink-3">{curriculumCount(merged)}</span>
            </button>

            <div className="mb-1 mt-3 flex items-center gap-1 px-2.5">
              <p className="min-w-0 flex-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">Subjects</p>
              <button
                type="button"
                onClick={() => setArranging((current) => !current)}
                aria-pressed={arranging}
                className={cn(
                  'flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold',
                  arranging ? 'bg-primary-tint text-primary-strong' : 'text-ink-3 hover:bg-inset hover:text-ink-2',
                )}
              >
                <Icon icon={ArrowUpDown} size={11} />
                Arrange
              </button>
            </div>
            <ul className="space-y-0.5">
              {moduleSubjects.map((subject) => <RailRow key={subject.id} subject={subject} depth={0} rail={rail} />)}
            </ul>

            {pending && (
              <div className="sticky bottom-0 z-10 mt-2 rounded-lg border border-warning bg-warning-tint px-3 py-2.5 shadow-pop">
                <p className="text-[11.5px] leading-relaxed text-ink-2">
                  <Icon icon={TriangleAlert} size={13} className="me-1 inline align-[-2px] text-warning" />
                  Putting <strong className="text-ink">{findSubject(moduleSubjects, pending.id)?.name || 'this subject'}</strong>{' '}
                  under <strong className="text-ink">{pendingParent?.name || 'another subject'}</strong> stops its{' '}
                  {pending.marks} {pending.marks === 1 ? 'mark' : 'marks'} counting towards the module total. The number
                  stays on the subject — only a module’s own subjects are added up.
                </p>
                <div className="mt-2 flex justify-end gap-1.5">
                  <Button type="button" size="sm" variant="ghost" onClick={() => setPending(null)}>Leave it</Button>
                  <Button type="button" size="sm" variant="primary" onClick={() => applyMove(pending.id, pending.drop)}>Move anyway</Button>
                </div>
              </div>
            )}

            <Button className="mt-2 w-full" variant="secondary" size="sm" iconLeft={Plus} onClick={() => addBranch(null)}>Add subject</Button>
            <p className="mt-2 px-2.5 text-[11px] leading-relaxed text-ink-3">
              {arranging
                ? 'Drag a subject onto another’s middle to nest it, or onto an edge to sit beside it. Drop on Whole module to bring it back to the top.'
                : 'Marks stay on a module’s own subjects. Splitting one does not change what it is worth.'}
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
                  <div className="flex flex-wrap items-center gap-2 border-b border-line bg-primary-tint/25 px-4 py-2.5">
                    <span className="text-[11.5px] font-semibold text-primary-strong">From {current?.name || 'this subject'}&rsquo;s library topics</span>
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
                              <label key={concept.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-primary-line bg-primary-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                                <input type="checkbox" checked={checked} onChange={() => toggle(concept.id)} className="mt-1 size-4 accent-[var(--color-primary)]" />
                                <span className="min-w-0 flex-1"><span className="line-clamp-2 block text-[13px] font-semibold leading-snug text-ink">{concept.label}</span><span className="mt-1 block truncate font-mono text-[10px] text-ink-3">{concept.id}</span></span>
                              </label>
                            )
                          })
                          : filtered.map((item) => {
                            const checked = selected.includes(item.id)
                            const system = subjects.find((candidate) => candidate.id === item.subjectId)
                            return (
                              <label key={item.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-primary-line bg-primary-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                                <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} className="mt-1 size-4 accent-[var(--color-primary)]" />
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
