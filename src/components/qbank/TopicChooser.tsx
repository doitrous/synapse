import { useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { subjects } from '@/data/subjects'
import type { Subject } from '@/data/types'
import type { LibTopic } from '@/data/library'
import type { Question } from '@/data/qbank'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { Segmented } from '@/components/ui/Tabs'
import { useSystemColor } from '@/data/systemColors'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { chooserTopics, scopeCounts, topicKey, subtopicKey, type Scope } from '@/data/qbankScope'
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
      {!checked && partial && <span className="size-2 rounded-[2px] bg-primary" />}
    </span>
  )
}

/**
 * A guard for the left accent's colour: `getSubject` always supplies a plain
 * 6-digit hex, but a future colour source (a named CSS colour, an admin typo)
 * shouldn't crash the tree — it just falls back to a neutral line.
 */
function accentColor(hex: string): string {
  return /^#([0-9a-f]{6})$/i.test(hex) ? hex : 'var(--color-line-2)'
}

/**
 * One system's row plus its expanded chapters. Split out of the main tree so
 * it can call `useSystemColor` — the same reactive colour source `SubjectDot`
 * renders, including any admin override from Subjects & Topics — without
 * calling a hook inside the `groups.map` loop above it.
 */
function SubjectGroup({
  subj,
  topics,
  value,
  counts,
  isOpen,
  onToggleOpen,
  toggleSubject,
  toggleTopic,
  toggleSub,
  expanded,
  setExpanded,
  t,
}: {
  subj: Subject
  topics: LibTopic[]
  value: Scope
  counts: { topics: Record<string, number>; subtopics: Record<string, number> }
  isOpen: boolean
  onToggleOpen: () => void
  toggleSubject: (subjectId: string) => void
  toggleTopic: (topicId: string) => void
  toggleSub: (topicId: string, subId: string) => void
  expanded: Record<string, boolean>
  setExpanded: Dispatch<SetStateAction<Record<string, boolean>>>
  t: (s: string) => string
}) {
  const color = useSystemColor(subj.id)
  const selectedTopics = topics.filter((topic) => value.has(topicKey(topic.id)))
  const anyGranular = topics.some((topic) => topic.subtopics.some((sub) => value.has(subtopicKey(sub.id))))
  const allSelected = selectedTopics.length === topics.length
  const someSelected = selectedTopics.length > 0 || anyGranular
  const questionCount = topics.reduce((sum, topic) => sum + (counts.topics[topic.id] ?? 0), 0)

  return (
    <div>
      {/* Two targets in one row: the checkbox half takes the whole system,
          the chevron opens it. Every system used to dump all its chapters
          inline, so twenty systems was one long scroll with no way to put
          any of it away.

          The row stays neutral; the subject's brand colour lives only in the
          thick accent line down its start edge, so the tree reads as a calm
          list keyed by a colour rather than a stack of coloured bars. */}
      <div
        className="flex w-full items-center gap-1 bg-surface-2/60 pe-2 transition-colors hover:bg-surface-2"
        style={{ borderInlineStart: `4px solid ${accentColor(color)}` }}
      >
        <button
          type="button"
          onClick={() => toggleSubject(subj.id)}
          aria-pressed={allSelected}
          className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 text-start"
        >
          <Box checked={allSelected} partial={!allSelected && someSelected} />
          <SubjectDot id={subj.id} />
          <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold uppercase tracking-[0.07em] text-ink-2">{subj.name}</span>
          <span
            className={cn(
              'tnum shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10.5px]',
              someSelected ? 'bg-surface text-ink-2' : 'text-ink-3',
            )}
          >
            {questionCount}
          </span>
        </button>
        <button
          type="button"
          onClick={onToggleOpen}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? t('Hide') : t('Show')} ${subj.name}`}
          className="grid size-7 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
        >
          <Icon icon={ChevronRight} size={15} className={cn('chevron-turn')} open={isOpen} />
        </button>
      </div>
      {isOpen && topics.map((topic) => {
        const topicSelected = value.has(topicKey(topic.id))
        const selectedSubs = topic.subtopics.filter((s) => value.has(subtopicKey(s.id)))
        const partial = !topicSelected && selectedSubs.length > 0
        const topicOpen = expanded[topic.id] ?? false
        return (
          <div key={topic.id}>
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-2 transition-colors',
                topicSelected ? 'bg-primary-tint/70' : partial ? 'bg-primary-tint/30' : 'hover:bg-inset/50',
              )}
            >
              <button type="button" onClick={() => toggleTopic(topic.id)} className="flex min-w-0 flex-1 items-center gap-2.5 text-start">
                <Box checked={topicSelected} partial={partial} />
                <span className="truncate text-[13.5px] font-medium text-ink">{topic.title}</span>
              </button>
              <span
                className={cn(
                  'tnum rounded-md px-1.5 py-0.5 font-mono text-[11px]',
                  topicSelected || partial ? 'bg-surface text-primary-strong' : 'bg-inset text-ink-3',
                )}
              >
                {counts.topics[topic.id]}
              </span>
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [topic.id]: !topicOpen }))}
                aria-expanded={topicOpen}
                aria-label={t('Toggle subtopics')}
                className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
              >
                <Icon icon={ChevronRight} size={15} className={cn('chevron-turn')} open={topicOpen} />
              </button>
            </div>
            {topicOpen && (
              <div className="ms-[1.6rem] border-s border-line-2 ps-2">
                {topic.subtopics.map((s) => {
                  const checked = topicSelected || value.has(subtopicKey(s.id))
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSub(topic.id, s.id)}
                      className="flex w-full items-center gap-2.5 px-3 py-1.5 text-start hover:bg-inset/50"
                    >
                      <Box checked={checked} />
                      <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-2">{s.title}</span>
                      <span className="tnum font-mono text-[10.5px] text-ink-3">{counts.subtopics[s.id]}</span>
                    </button>
                  )
                })}
              </div>
            )}
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
  // scopeCounts walks every topic × subtopic × question. Unmemoised it ran on
  // every render — so on every keystroke and every checkbox in this tree.
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
  const moduleGroups = useMemo(() => {
    return moduleContent.groups
      .map((mod) => {
        const articleIds = new Set(mod.articleIds)
        const moduleTopics = libraryTopics.filter((topic) => {
          if (existsCounts.topics[topic.id] <= 0) return false
          if (articleIds.has(topic.id)) return true
          if (topic.subtopics.some((s) => articleIds.has(s.id))) return true
          return pool.some(
            (q) =>
              (q.topic.toLowerCase() === topic.title.toLowerCase() ||
                q.libraryRefs.some((ref) => topic.subtopics.some((s) => s.id === ref.id))) &&
              q.libraryRefs.some((ref) => articleIds.has(ref.id)),
          )
        })
        const systemGroups = subjects
          .map((subj) => ({ subj, topics: moduleTopics.filter((tp) => tp.subjectId === subj.id) }))
          .filter((g) => g.topics.length > 0)
        const questionCount = moduleTopics.reduce((sum, topic) => sum + (counts.topics[topic.id] ?? 0), 0)
        return { moduleId: mod.moduleId, moduleName: mod.moduleName, topics: moduleTopics, systemGroups, questionCount }
      })
      .filter((mod) => mod.topics.length > 0)
  }, [moduleContent.groups, libraryTopics, existsCounts, pool, counts])

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
  const activeTopics = activeGrouping === 'module' ? moduleModeTopics : groups.flatMap((g) => g.topics)

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
  const selectedTopicCount = activeTopics.filter((topic) => value.has(topicKey(topic.id))).length
  const totalQuestionCount = activeTopics.reduce((sum, topic) => sum + (counts.topics[topic.id] ?? 0), 0)

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

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      {/* Grouping toggle. Module is the default — students think in terms of
          "what's on my course this term" before they think in terms of
          medical systems — with system view (the original tree) one tap away
          for whoever prefers it, or whenever there's nothing to group by
          module yet (see the empty state below). */}
      <div className="flex items-center border-b border-line bg-surface-2/60 px-3 py-2">
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
      <div className="flex items-center gap-2.5 border-b border-line bg-surface-2/60 px-3 py-2">
        <button
          type="button"
          onClick={toggleAllTopics}
          aria-pressed={allTopicsSelected}
          className="flex min-w-0 flex-1 items-center gap-2.5 text-start"
        >
          <Box checked={allTopicsSelected} partial={!allTopicsSelected && anySelectedAnywhere} />
          <span className="text-[12px] font-semibold text-ink">{t('Select all topics')}</span>
        </button>
        <span className="tnum shrink-0 rounded-md bg-inset px-1.5 py-0.5 font-mono text-[10.5px] text-ink-3">
          {selectedTopicCount}/{totalTopics} · {totalQuestionCount}
        </span>
      </div>
      {activeGrouping === 'system' ? (
        <div className="max-h-[22rem] divide-y divide-line overflow-y-auto">
          {groups.map(({ subj, topics }) => (
            <SubjectGroup
              key={subj.id}
              subj={subj}
              topics={topics}
              value={value}
              counts={counts}
              isOpen={openSubjects[subj.id] ?? false}
              onToggleOpen={() => setOpenSubjects((current) => ({ ...current, [subj.id]: !(current[subj.id] ?? false) }))}
              toggleSubject={() => toggleSubjectTopics(topics)}
              toggleTopic={toggleTopic}
              toggleSub={toggleSub}
              expanded={expanded}
              setExpanded={setExpanded}
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
            className="mt-3 inline-flex items-center rounded-md border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-inset"
          >
            {t('Browse by system instead')}
          </button>
        </div>
      ) : (
        <div className="max-h-[22rem] divide-y divide-line overflow-y-auto">
          {moduleGroups.map((mod) => {
            const isOpen = openModules[mod.moduleId] ?? false
            return (
              <div key={mod.moduleId}>
                {/* Neutral, boxy header — the colour lives one level down, on
                    each system's accent line, so the module row stays calm
                    and reads purely as "a level above" rather than competing
                    with it. */}
                <button
                  type="button"
                  onClick={() => setOpenModules((current) => ({ ...current, [mod.moduleId]: !(current[mod.moduleId] ?? false) }))}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-2.5 bg-surface-2 px-3 py-2.5 text-start hover:bg-inset/40"
                >
                  <Icon icon={ChevronRight} size={15} className="chevron-turn shrink-0 text-ink-3" open={isOpen} />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink">{mod.moduleName}</span>
                  <span className="tnum shrink-0 rounded-md bg-inset px-1.5 py-0.5 font-mono text-[10.5px] text-ink-3">
                    {mod.questionCount}
                  </span>
                </button>
                {isOpen && (
                  <div className="divide-y divide-line border-t border-line/70">
                    {mod.systemGroups.map(({ subj, topics }) => {
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
                          value={value}
                          counts={counts}
                          isOpen={openSubjects[rowKey] ?? false}
                          onToggleOpen={() => setOpenSubjects((current) => ({ ...current, [rowKey]: !(current[rowKey] ?? false) }))}
                          toggleSubject={() => toggleSubjectTopics(topics)}
                          toggleTopic={toggleTopic}
                          toggleSub={toggleSub}
                          expanded={expanded}
                          setExpanded={setExpanded}
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
    </div>
  )
}
