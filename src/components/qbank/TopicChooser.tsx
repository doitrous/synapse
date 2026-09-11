import { useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { subjects } from '@/data/subjects'
import type { Subject } from '@/data/types'
import type { LibTopic } from '@/data/library'
import type { Question } from '@/data/qbank'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import {
  chooserTopics,
  filterTopicsInContainer,
  matchesQuery,
  scopeCounts,
  topicInModule,
  topicKey,
  subtopicKey,
  type Scope,
} from '@/data/qbankScope'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { useIdentity } from '@/lib/useIdentity'
import { useModuleLibraryContent } from '@/lib/useModuleLibraryContent'

function Box({ checked, partial }: { checked: boolean; partial?: boolean }) {
  return (
    <span
      className={cn(
        'grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors',
        checked ? 'border-primary bg-primary text-on-primary' : partial ? 'border-primary-line bg-primary-tint' : 'border-line-2 bg-surface',
      )}
    >
      {checked && <Icon icon={Check} size={13} strokeWidth={2.8} />}
      {!checked && partial && <span className="h-0.5 w-2 rounded-[1px] bg-primary" />}
    </span>
  )
}

/** The chevron control, its own 28 px target (44 px below `sm`) beside a row. */
function Chevron({ open, label, onClick }: { open: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={label}
      className="grid size-11 shrink-0 place-items-center rounded-[7px] text-ink-3 transition-colors hover:bg-inset hover:text-ink sm:size-7"
    >
      <Icon icon={ChevronRight} size={15} className="chevron-turn" open={open} />
    </button>
  )
}

/**
 * One system's row plus its expanded chapters.
 *
 * Deliberately carries no system colour of any kind — no accent bar, no dot.
 * The only colour in the tree is the tick and its tint, so a wall of twenty
 * systems reads as one calm list rather than a stack of coloured bars.
 */
function SubjectGroup({
  subj,
  topics,
  allTopics,
  value,
  counts,
  isOpen,
  onToggleOpen,
  toggleSubject,
  toggleTopic,
  toggleSub,
  expanded,
  setExpanded,
  query,
  containerMatched,
  t,
}: {
  subj: Subject
  /** The chapters actually rendered — the search's slice of `allTopics`. */
  topics: LibTopic[]
  /**
   * Every chapter this system has in the active view, search or no search.
   *
   * The count and the checkbox describe the whole system, so a search that
   * hides three of four chapters still reads "1 of 4" and still shows a
   * partial tick. The toggle below stays on `topics`: a control acts on what
   * the student can see.
   */
  allTopics: LibTopic[]
  value: Scope
  counts: { topics: Record<string, number>; subtopics: Record<string, number> }
  isOpen: boolean
  onToggleOpen: () => void
  toggleSubject: (subjectId: string) => void
  toggleTopic: (topicId: string) => void
  toggleSub: (topicId: string, subId: string) => void
  expanded: Record<string, boolean>
  setExpanded: Dispatch<SetStateAction<Record<string, boolean>>>
  /** The live search text, so a row that only matched through a subtopic opens itself. */
  query: string
  /**
   * True when the search matched this system's own name (or its module's), so
   * every chapter under it is here because the container was the hit — not
   * because anything inside it matched. Chapters then stay as the student left
   * them instead of all springing open.
   */
  containerMatched: boolean
  t: (s: string) => string
}) {
  const selectedTopics = allTopics.filter((topic) => value.has(topicKey(topic.id)))
  const anyGranular = allTopics.some((topic) => topic.subtopics.some((sub) => value.has(subtopicKey(sub.id))))
  const allSelected = allTopics.length > 0 && selectedTopics.length === allTopics.length
  const someSelected = selectedTopics.length > 0 || anyGranular
  const questionCount = allTopics.reduce((sum, topic) => sum + (counts.topics[topic.id] ?? 0), 0)
  const chapterWord = allTopics.length === 1 ? t('{n} chapter') : t('{n} chapters')
  const closedCount = `${chapterWord.replace('{n}', String(allTopics.length))} · ${questionCount}`
  const openCount = t('{n} of {m}').replace('{n}', String(selectedTopics.length)).replace('{m}', String(allTopics.length))

  return (
    <div className="divide-y divide-line/60">
      {/* Two targets in one row: the checkbox half takes the whole system,
          the chevron opens it. Every system used to dump all its chapters
          inline, so twenty systems was one long scroll with no way to put
          any of it away. */}
      <div className="flex w-full items-center gap-2.5 bg-surface pe-2 ps-3.5 transition-colors hover:bg-inset/50">
        <button
          type="button"
          onClick={() => toggleSubject(subj.id)}
          aria-pressed={allSelected}
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-start sm:min-h-[46px]"
        >
          <Box checked={allSelected} partial={!allSelected && someSelected} />
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-ink">{subj.name}</span>
          <span className={cn('tnum shrink-0 text-[11.5px]', someSelected ? 'text-primary-strong' : 'text-ink-3')}>
            {isOpen ? openCount : closedCount}
          </span>
        </button>
        <Chevron open={isOpen} label={`${isOpen ? t('Hide') : t('Show')} ${subj.name}`} onClick={onToggleOpen} />
      </div>
      {isOpen && topics.map((topic) => {
        const topicSelected = value.has(topicKey(topic.id))
        const selectedSubs = topic.subtopics.filter((s) => value.has(subtopicKey(s.id)))
        const partial = !topicSelected && selectedSubs.length > 0
        // A chapter that only survived the search because one of its
        // subtopics matched has to open itself, or the match is invisible.
        // The student's own open/closed state is never written to here, so
        // clearing the search restores exactly what they had open.
        const forcedOpen =
          query.trim().length > 0 &&
          !containerMatched &&
          topic.subtopics.length > 0 &&
          !matchesQuery(topic.title, query)
        const topicOpen = forcedOpen || (expanded[topic.id] ?? false)
        return (
          <div key={topic.id} className="divide-y divide-line/60">
            <div
              className={cn(
                'flex items-center gap-2.5 pe-2 ps-11 transition-colors',
                topicSelected ? 'bg-primary-tint' : partial ? 'bg-primary-tint/40' : 'bg-surface hover:bg-inset/50',
              )}
            >
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                aria-pressed={topicSelected}
                className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-start sm:min-h-[42px]"
              >
                <Box checked={topicSelected} partial={partial} />
                <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink">{topic.title}</span>
                <span className={cn('tnum shrink-0 text-[11.5px]', topicSelected || partial ? 'text-primary-strong' : 'text-ink-3')}>
                  {counts.topics[topic.id]}
                </span>
              </button>
              {topic.subtopics.length > 0 ? (
                <Chevron
                  open={topicOpen}
                  label={t('Toggle subtopics')}
                  onClick={() => setExpanded((prev) => ({ ...prev, [topic.id]: !(prev[topic.id] ?? false) }))}
                />
              ) : (
                <span aria-hidden className="size-11 shrink-0 sm:size-7" />
              )}
            </div>
            {topicOpen && topic.subtopics.map((s) => {
              const checked = topicSelected || value.has(subtopicKey(s.id))
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSub(topic.id, s.id)}
                  aria-pressed={checked}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-2.5 pe-[3.25rem] ps-[74px] text-start transition-colors sm:min-h-[38px]',
                    checked ? 'bg-primary-tint' : 'bg-surface hover:bg-inset/50',
                  )}
                >
                  <Box checked={checked} />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-2">{s.title}</span>
                  <span className={cn('tnum shrink-0 text-[11.5px]', checked ? 'text-primary-strong' : 'text-ink-3')}>
                    {counts.subtopics[s.id]}
                  </span>
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Subject → topic → subtopic chooser. A student can select a whole topic
 * (chapter) or drill into individual subtopics under it. Shared by the Question
 * Bank and Study Together test creation.
 */
export function TopicChooser({
  value,
  onChange,
  pool,
  countPool,
}: {
  value: Scope
  onChange: (next: Scope) => void
  pool: Question[]
  /**
   * The subset counts are drawn from, when it differs from `pool`.
   *
   * `pool` still decides which chapters exist to pick from — the tree itself
   * never reshuffles as a student narrows their source. `countPool` (e.g. only
   * their flagged questions) decides what number lands on each row, so a
   * chapter with nothing under the current source reads 0 rather than
   * disappearing or showing a count that belongs to a different source.
   * Defaults to `pool`, which is the original single-pool behaviour.
   */
  countPool?: Question[]
}) {
  const t = useT()
  // Both hooks are called unconditionally, ahead of every early return below —
  // `identity` decides only which grouping is offered as the default, and
  // `moduleContent` is cheap (empty groups) for a viewer with no enrolment,
  // so neither needs to be gated behind a conditional call.
  const identity = useIdentity()
  const moduleContent = useModuleLibraryContent(identity.audience.universityId, identity.audience.yearId)
  // The same chapter tree the Library shows — not the demo seed — plus any
  // topic the questions name that the library has no article for yet.
  const { topics: publishedTopics } = useLiveLibrary()
  const libraryTopics = useMemo(() => chooserTopics(pool, publishedTopics), [pool, publishedTopics])
  // Count once per bank/tree snapshot, not on every checkbox or expansion.
  // Computed from `pool`, never `countPool`: this is what decides whether a
  // chapter ever has anything in it at all, which is what the group filter
  // below uses to decide whether the chapter is offered as an option.
  const existsCounts = useMemo(() => scopeCounts(pool, libraryTopics), [pool, libraryTopics])
  // What is actually printed next to each row. Same values as `existsCounts`
  // unless a narrower `countPool` was supplied.
  const counts = useMemo(
    () => (countPool ? scopeCounts(countPool, libraryTopics) : existsCounts),
    [countPool, libraryTopics, existsCounts],
  )
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  /** Systems start closed: the list is a menu of twenty, not a wall of chapters. */
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({})
  /** Modules start closed too, for the same reason. */
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({})
  /**
   * The search text. Filtering is derived, never written back into
   * `expanded` / `openSubjects` / `openModules` — a container holding a match
   * is forced open for as long as the query stands, and clearing the field
   * drops straight back to whatever the student had open before.
   */
  const [query, setQuery] = useState('')
  const searching = query.trim().length > 0

  // Module is the default view. The one exception: a viewer whose enrolment
  // is unresolved (or genuinely blank) has no modules to group by at all, so
  // once that's settled the default quietly falls back to system — unless the
  // student has already touched the toggle themselves, in which case their
  // choice wins.
  const [grouping, setGroupingRaw] = useState<'module' | 'system'>('module')
  const [groupingTouched, setGroupingTouched] = useState(false)
  const setGrouping = (next: 'module' | 'system') => {
    setGroupingTouched(true)
    setGroupingRaw(next)
  }
  const audienceUnknown = identity.audienceSettled && identity.audienceUnknown
  const activeGrouping: 'module' | 'system' = !groupingTouched && audienceUnknown ? 'system' : grouping

  const groups = useMemo(() => subjects
    .map((subj) => ({ subj, topics: libraryTopics.filter((tp) => tp.subjectId === subj.id && existsCounts.topics[tp.id] > 0) }))
    .filter((g) => g.topics.length > 0), [libraryTopics, existsCounts])

  /**
   * Module → system → topic grouping.
   *
   * `moduleContent.groups` names each module's published library articles
   * (`articleIds`), in the same id space as a chooser topic's id, a subtopic's
   * id, and `Question.libraryRefs[].id`. A topic belongs to a module when
   * either it or one of its subtopics IS one of those article ids, or —
   * covering a topic whose questions were tagged to the module's articles
   * before the chooser topic itself existed — when any question filed under
   * the topic cites one of those articles. A topic can legitimately match more
   * than one module (its questions cite articles split across two modules) or
   * none (no module has claimed its articles yet); either is fine, it just
   * shows up under every module it matches, or under none in module view.
   *
   * Within a module the matching topics are then grouped by system exactly
   * the way the top-level `groups` above does, so `SubjectGroup` renders
   * identically whichever view is active.
   */
  const allModules = useMemo(() => {
    return moduleContent.groups.map((mod) => {
      const articleIds = new Set(mod.articleIds)
      // A question names its module by the module's id or its display name, so
      // match on both — the article-coverage id space and the curriculum name
      // space can each be the one the author tagged.
      const moduleTokens = new Set(
        [mod.moduleId, mod.moduleName].map((token) => token?.trim().toLowerCase()).filter(Boolean) as string[],
      )
      const moduleTopics = libraryTopics.filter(
        (topic) => existsCounts.topics[topic.id] > 0 && topicInModule(topic, pool, articleIds, moduleTokens),
      )
      const systemGroups = subjects
        .map((subj) => ({ subj, topics: moduleTopics.filter((tp) => tp.subjectId === subj.id) }))
        .filter((g) => g.topics.length > 0)
      const questionCount = moduleTopics.reduce((sum, topic) => sum + (counts.topics[topic.id] ?? 0), 0)
      return { moduleId: mod.moduleId, moduleName: mod.moduleName, topics: moduleTopics, systemGroups, questionCount }
    })
  }, [moduleContent.groups, libraryTopics, existsCounts, pool, counts])

  /**
   * The modules that actually have something to offer. Still what decides
   * whether module view has anything to show at all — a module the curriculum
   * names but nothing is published under is listed (inert) rather than being
   * counted as content.
   */
  const moduleGroups = useMemo(() => allModules.filter((mod) => mod.topics.length > 0), [allModules])

  // Every topic shown across every module, deduped — a topic that matches two
  // modules must still only count once for the master "select all" control.
  const moduleModeTopics = useMemo(() => {
    const seen = new Map<string, LibTopic>()
    moduleGroups.forEach((mod) => mod.topics.forEach((topic) => seen.set(topic.id, topic)))
    return [...seen.values()]
  }, [moduleGroups])

  // What "select all" and its counters act on: the topics the active view is
  // actually showing right now, not the whole library. In module view that
  // can be a strict subset of system view (a topic no module has claimed yet
  // is simply absent) so the two views' totals can legitimately differ.
  // Deliberately unaffected by the search box: search hides rows, it does not
  // narrow what the master control or the footer are talking about.
  const activeTopics = activeGrouping === 'module' ? moduleModeTopics : groups.flatMap((g) => g.topics)

  /**
   * The system view, narrowed to the search. Each entry keeps `allTopics` — the
   * system's full chapter list — so its row can go on describing the whole
   * system while only the hits are rendered under it.
   */
  const visibleGroups = useMemo(() => {
    if (!searching) return groups.map((g) => ({ ...g, allTopics: g.topics }))
    return groups
      .map((g) => ({ ...g, allTopics: g.topics, topics: filterTopicsInContainer([g.subj.name], g.topics, query) }))
      .filter((g) => g.topics.length > 0)
  }, [groups, query, searching])

  /** The module view, narrowed to the search (a module with no hit drops out). */
  const visibleModules = useMemo(() => {
    if (!searching) {
      return allModules.map((mod) => ({
        ...mod,
        systemGroups: mod.systemGroups.map((g) => ({ ...g, allTopics: g.topics })),
      }))
    }
    return allModules
      .map((mod) => ({
        ...mod,
        systemGroups: mod.systemGroups
          .map((g) => ({
            ...g,
            allTopics: g.topics,
            topics: filterTopicsInContainer([mod.moduleName, g.subj.name], g.topics, query),
          }))
          .filter((g) => g.topics.length > 0),
      }))
      // A module named by the search stays even when it has nothing published
      // under it — the student asked for it by name, so saying "nothing
      // published yet" answers them; saying nothing at all does not.
      .filter((mod) => mod.systemGroups.length > 0 || matchesQuery(mod.moduleName, query))
  }, [allModules, query, searching])

  const toggleTopic = (topicId: string) => {
    const next = new Set(value)
    const tk = topicKey(topicId)
    const topic = libraryTopics.find((tp) => tp.id === topicId)!
    if (next.has(tk)) {
      next.delete(tk)
    } else {
      next.add(tk)
      // Whole-topic selection supersedes any granular subtopic picks.
      topic.subtopics.forEach((s) => next.delete(subtopicKey(s.id)))
    }
    onChange(next)
  }

  /**
   * Select or clear one `SubjectGroup`'s worth of topics.
   *
   * The subject row was a header with no behaviour, so picking "everything
   * cardiovascular" meant ticking each chapter under it in turn. Selecting adds
   * every topic passed in and clears any granular subtopic picks beneath them,
   * which is what whole-topic selection already does one level down.
   *
   * Takes the topic list directly rather than looking a system up by id: the
   * same system can be rendered twice in module view (once per module it has
   * topics in), each time with a different topic subset, and each row's
   * checkbox must only affect the slice it's actually showing — not every
   * topic that system has anywhere in the library.
   */
  const toggleSubjectTopics = (topics: LibTopic[]) => {
    const next = new Set(value)
    const allSelected = topics.every((topic) => next.has(topicKey(topic.id)))
    for (const topic of topics) {
      topic.subtopics.forEach((sub) => next.delete(subtopicKey(sub.id)))
      if (allSelected) next.delete(topicKey(topic.id))
      else next.add(topicKey(topic.id))
    }
    onChange(next)
  }

  const toggleSub = (topicId: string, subId: string) => {
    const next = new Set(value)
    const tk = topicKey(topicId)
    const sk = subtopicKey(subId)
    const topic = libraryTopics.find((tp) => tp.id === topicId)!
    if (next.has(tk)) {
      // Break the whole-topic selection into its individual subtopics, minus this one.
      next.delete(tk)
      topic.subtopics.forEach((s) => s.id !== subId && next.add(subtopicKey(s.id)))
    } else if (next.has(sk)) {
      next.delete(sk)
    } else {
      next.add(sk)
    }
    onChange(next)
  }

  // Whether the whole tree currently on screen — every topic `activeTopics`
  // lists, whichever grouping is active — is already selected, for the master
  // control below. Deliberately computed from the data, not from
  // `openSubjects`/`openModules`/`expanded` (what's visually open), so
  // collapsing everything never makes this look wrong.
  const allTopicsSelected = activeTopics.length > 0 && activeTopics.every((topic) => value.has(topicKey(topic.id)))
  const anySelectedAnywhere = activeTopics.some(
    (topic) => value.has(topicKey(topic.id)) || topic.subtopics.some((s) => value.has(subtopicKey(s.id))),
  )
  const totalTopics = activeTopics.length
  const totalQuestionCount = activeTopics.reduce((sum, topic) => sum + (counts.topics[topic.id] ?? 0), 0)

  /** Chapters with anything ticked in them, whole or granular — what "in scope" means. */
  const scopeChapters = activeTopics.filter(
    (topic) => value.has(topicKey(topic.id)) || topic.subtopics.some((s) => value.has(subtopicKey(s.id))),
  )
  const scopeQuestionCount = scopeChapters.reduce((sum, topic) => {
    if (value.has(topicKey(topic.id))) return sum + (counts.topics[topic.id] ?? 0)
    return sum + topic.subtopics.reduce((n, sub) => (value.has(subtopicKey(sub.id)) ? n + (counts.subtopics[sub.id] ?? 0) : n), 0)
  }, 0)

  const chaptersLabel = (n: number) => (n === 1 ? t('{n} chapter') : t('{n} chapters')).replace('{n}', String(n))
  const questionsLabel = (n: number) => (n === 1 ? t('{n} question') : t('{n} questions')).replace('{n}', String(n))

  /**
   * One flip for the whole tree currently shown. Reuses `toggleSubjectTopics`'s
   * all-or-nothing pattern, just widened to every topic the active grouping
   * displays: selecting adds every topic key in `activeTopics` (clearing
   * granular subtopic picks beneath them, same as `toggleTopic`/
   * `toggleSubjectTopics` already do), clearing removes every topic and
   * subtopic key that belongs to it. One `onChange` call either way.
   */
  const toggleAllTopics = () => {
    const next = new Set(value)
    for (const topic of activeTopics) {
      topic.subtopics.forEach((sub) => next.delete(subtopicKey(sub.id)))
      if (allTopicsSelected) next.delete(topicKey(topic.id))
      else next.add(topicKey(topic.id))
    }
    onChange(next)
  }

  // An empty box is not an answer. It happens when the bank has no questions in
  // scope at all, and it should say so rather than look broken.
  if (!groups.length) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface-2/40 px-4 py-6 text-center">
        <p className="text-[12.5px] text-ink-3">
          {pool.length
            ? t('These questions are not filed under a chapter yet. Start a session and the whole bank is used.')
            : t('No questions have been published yet.')}
        </p>
      </div>
    )
  }

  const noSearchHits = (
    <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('No chapters match that search.')}</p>
  )

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {/* Search plus the grouping toggle. Module is the default — students
          think in terms of "what's on my course this term" before they think
          in terms of medical systems — with system view one tap away for
          whoever prefers it, or whenever there's nothing to group by module
          yet (see the empty state below). */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-line px-3.5 py-3">
        {/* `SearchInput` puts its own relative wrapper around the field, so the
            flex sizing has to go on a box outside it. */}
        <div className="min-w-[9rem] flex-1">
          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('Search chapters…')}
            aria-label={t('Search chapters')}
          />
        </div>
        <Segmented
          items={[
            { value: 'module', label: t('By module') },
            { value: 'system', label: t('By system') },
          ]}
          value={activeGrouping}
          onChange={(next) => setGrouping(next as 'module' | 'system')}
        />
      </div>
      {/* Master control: one flip for every topic currently on screen, so a
          student who wants "the whole bank" doesn't have to open every
          module or system and tick each one. What counts as "on screen"
          follows the active grouping via `activeTopics`. */}
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2.5">
        <button
          type="button"
          onClick={toggleAllTopics}
          aria-pressed={allTopicsSelected}
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-start sm:min-h-0"
        >
          <Box checked={allTopicsSelected} partial={!allTopicsSelected && anySelectedAnywhere} />
          <span className="min-w-0 truncate text-[12.5px] text-ink-2">
            <span className="font-semibold text-ink">{t('Select all')}</span>
            {` · ${chaptersLabel(totalTopics)} · ${questionsLabel(totalQuestionCount)}`}
          </span>
        </button>
        <span
          className={cn(
            'inline-flex h-[26px] shrink-0 items-center rounded-full border px-2.5 text-[12px] font-semibold',
            scopeChapters.length > 0
              ? 'border-primary-line bg-primary-tint text-primary-strong'
              : 'border-line bg-surface text-ink-2',
          )}
        >
          {scopeChapters.length > 0
            ? t('{k} selected · {q}')
                .replace('{k}', String(scopeChapters.length))
                .replace('{q}', questionsLabel(scopeQuestionCount))
            : t('Nothing selected')}
        </span>
      </div>
      {activeGrouping === 'system' ? (
        <div className="max-h-[22rem] divide-y divide-line/60 overflow-y-auto">
          {visibleGroups.length === 0 ? noSearchHits : visibleGroups.map(({ subj, topics, allTopics }) => (
            <SubjectGroup
              key={subj.id}
              subj={subj}
              topics={topics}
              allTopics={allTopics}
              value={value}
              counts={counts}
              // A system holding a search hit opens itself; the student's own
              // open/closed state is left untouched underneath it.
              isOpen={searching || (openSubjects[subj.id] ?? false)}
              onToggleOpen={() => setOpenSubjects((current) => ({ ...current, [subj.id]: !(current[subj.id] ?? false) }))}
              toggleSubject={() => toggleSubjectTopics(topics)}
              toggleTopic={toggleTopic}
              toggleSub={toggleSub}
              expanded={expanded}
              setExpanded={setExpanded}
              query={query}
              containerMatched={searching && matchesQuery(subj.name, query)}
              t={t}
            />
          ))}
        </div>
      ) : moduleContent.availability.kind === 'loading' ? (
        // The module map depends on the curriculum projection loading
        // separately from the questions/library — a brief gap, not a fault.
        <p className="animate-pulse px-4 py-6 text-center text-[12.5px] text-ink-3">{t('Loading modules…')}</p>
      ) : moduleGroups.length === 0 ? (
        // No module has claimed any of these topics yet — a normal state for
        // a year whose curriculum hasn't been mapped, or a demo account with
        // no enrolment. Not an error: say so, and make the escape hatch to
        // the system tree (which always has something) obvious.
        <div className="px-4 py-6 text-center">
          <p className="text-[12.5px] text-ink-3">
            {t('No modules are mapped for this year yet.')}
          </p>
          <button
            type="button"
            onClick={() => setGrouping('system')}
            className="mt-3 inline-flex min-h-11 items-center rounded-md border border-line bg-surface px-3 text-[12.5px] font-medium text-ink hover:bg-inset sm:min-h-0 sm:py-1.5"
          >
            {t('Browse by system instead')}
          </button>
        </div>
      ) : (
        <div className="max-h-[22rem] divide-y divide-line/60 overflow-y-auto">
          {visibleModules.length === 0 ? noSearchHits : visibleModules.map((mod) => {
            const isOpen = searching || (openModules[mod.moduleId] ?? false)
            if (mod.systemGroups.length === 0) {
              // A module the curriculum names but nothing has been published
              // under yet. It stays on the list — its absence would read as a
              // gap in the course — just visibly inert.
              return (
                <div key={mod.moduleId} className="flex min-h-10 items-center gap-2.5 bg-mist px-3.5 py-2 opacity-55">
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink-2">{mod.moduleName}</span>
                  <span className="shrink-0 text-[11.5px] text-ink-3">
                    <span className="tnum">0</span>
                    {` · ${t('nothing published yet')}`}
                  </span>
                </div>
              )
            }
            return (
              <div key={mod.moduleId}>
                {/* A quiet group header, not a row: no checkbox and no colour,
                    just the name and how many questions live under it. */}
                <button
                  type="button"
                  onClick={() => setOpenModules((current) => ({ ...current, [mod.moduleId]: !(current[mod.moduleId] ?? false) }))}
                  aria-expanded={isOpen}
                  className="flex min-h-11 w-full items-center gap-2.5 bg-mist px-3.5 text-start transition-colors hover:bg-mist-2 sm:min-h-10"
                >
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink-2">{mod.moduleName}</span>
                  <span className="tnum shrink-0 text-[11.5px] text-ink-3">{mod.questionCount}</span>
                  <Icon icon={ChevronRight} size={15} className="chevron-turn shrink-0 text-ink-3" open={isOpen} />
                </button>
                {isOpen && (
                  <div className="divide-y divide-line/60 border-t border-line/60">
                    {mod.systemGroups.map(({ subj, topics, allTopics }) => {
                      // Keyed by module + subject: the same system can appear
                      // under more than one module, each with a different
                      // topic slice, and each occurrence opens/closes and
                      // selects independently of the others.
                      const rowKey = `${mod.moduleId}:${subj.id}`
                      return (
                        <SubjectGroup
                          key={rowKey}
                          subj={subj}
                          topics={topics}
                          allTopics={allTopics}
                          value={value}
                          counts={counts}
                          isOpen={searching || (openSubjects[rowKey] ?? false)}
                          onToggleOpen={() => setOpenSubjects((current) => ({ ...current, [rowKey]: !(current[rowKey] ?? false) }))}
                          toggleSubject={() => toggleSubjectTopics(topics)}
                          toggleTopic={toggleTopic}
                          toggleSub={toggleSub}
                          expanded={expanded}
                          setExpanded={setExpanded}
                          query={query}
                          containerMatched={searching && (matchesQuery(mod.moduleName, query) || matchesQuery(subj.name, query))}
                          t={t}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      {/* What the picks actually add up to, and the way back out of them. */}
      <div className="flex items-center gap-2.5 border-t border-line bg-surface-2/60 px-3.5 py-2.5">
        <span className="min-w-0 flex-1 text-[12.5px] text-ink-2">
          {t('{chapters} in scope · {questions}. Nothing selected draws from the whole bank.')
            .replace('{chapters}', chaptersLabel(scopeChapters.length))
            .replace('{questions}', questionsLabel(scopeQuestionCount))}
        </span>
        <button
          type="button"
          onClick={() => onChange(new Set<string>())}
          disabled={!anySelectedAnywhere}
          className="min-h-11 shrink-0 rounded-md px-1.5 py-1 text-[12.5px] font-semibold text-primary-strong transition-colors sm:min-h-0 hover:bg-primary-tint disabled:cursor-default disabled:text-ink-3 disabled:hover:bg-transparent"
        >
          {t('Clear')}
        </button>
      </div>
    </div>
  )
}
