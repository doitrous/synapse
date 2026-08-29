import { useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { subjects } from '@/data/subjects'
import type { Subject } from '@/data/types'
import type { LibTopic } from '@/data/library'
import type { Question } from '@/data/qbank'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { useSystemColor } from '@/data/systemColors'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { chooserTopics, scopeCounts, topicKey, subtopicKey, type Scope } from '@/data/qbankScope'
import { useLiveLibrary } from '@/lib/useLiveLibrary'

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
 * A subject's brand colour as a translucent wash, so it reads as a tint over
 * whatever the row's real background is (surface in light mode, inset in
 * dark) rather than a flat, theme-breaking fill. Guarded against anything
 * that isn't a plain 6-digit hex — `getSubject` always supplies one, but a
 * future colour source (a named CSS colour, an admin typo) shouldn't crash
 * the tree, it should just fall back to no tint at all.
 */
function tint(hex: string, alpha: number): string | undefined {
  const match = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!match) return undefined
  const n = parseInt(match[1], 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
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
  // Selection strengthens the wash — unselected systems get just enough of
  // their colour to read as "this one's cardiovascular", selected/partial
  // systems get enough that the pick is obvious at a glance without ever
  // becoming a solid fill.
  const wash = tint(color, allSelected ? 0.16 : someSelected ? 0.1 : 0.05)

  return (
    <div>
      {/* Two targets in one row: the checkbox half takes the whole system,
          the chevron opens it. Every system used to dump all its chapters
          inline, so twenty systems was one long scroll with no way to put
          any of it away. */}
      <div
        className="flex w-full items-center gap-1 pe-2 transition-colors hover:brightness-95"
        style={{
          backgroundColor: wash,
          borderInlineStart: `3px solid ${color}`,
        }}
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

  const groups = useMemo(() => subjects
    .map((subj) => ({ subj, topics: libraryTopics.filter((tp) => tp.subjectId === subj.id && existsCounts.topics[tp.id] > 0) }))
    .filter((g) => g.topics.length > 0), [libraryTopics, existsCounts])

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
   * Select or clear a whole system.
   *
   * The subject row was a header with no behaviour, so picking "everything
   * cardiovascular" meant ticking each chapter under it in turn. Selecting adds
   * every topic in the group and clears any granular subtopic picks beneath
   * them, which is what whole-topic selection already does one level down.
   */
  const toggleSubject = (subjectId: string) => {
    const group = groups.find((entry) => entry.subj.id === subjectId)
    if (!group) return
    const next = new Set(value)
    const allSelected = group.topics.every((topic) => next.has(topicKey(topic.id)))
    for (const topic of group.topics) {
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

  // Whether the whole tree — every topic in every system — is already
  // selected, for the master control below. Deliberately computed from
  // `groups` (the data), not from `openSubjects`/`expanded` (what's visually
  // open), so collapsing every system never makes this look wrong.
  const allTopicsSelected = groups.length > 0 && groups.every((g) => g.topics.every((topic) => value.has(topicKey(topic.id))))
  const anySelectedAnywhere = groups.some((g) =>
    g.topics.some((topic) => value.has(topicKey(topic.id)) || topic.subtopics.some((s) => value.has(subtopicKey(s.id)))),
  )
  const totalTopics = groups.reduce((sum, g) => sum + g.topics.length, 0)
  const selectedTopicCount = groups.reduce((sum, g) => sum + g.topics.filter((topic) => value.has(topicKey(topic.id))).length, 0)
  const totalQuestionCount = groups.reduce(
    (sum, g) => sum + g.topics.reduce((s, topic) => s + (counts.topics[topic.id] ?? 0), 0),
    0,
  )

  /**
   * One flip for the entire tree. Reuses `toggleSubject`'s all-or-nothing
   * pattern, just widened from one system to every system: selecting adds
   * every topic key across every group (clearing granular subtopic picks
   * beneath them, same as `toggleTopic`/`toggleSubject` already do), clearing
   * removes every topic and subtopic key that belongs to the tree. One
   * `onChange` call either way.
   */
  const toggleAllTopics = () => {
    const next = new Set(value)
    for (const group of groups) {
      for (const topic of group.topics) {
        topic.subtopics.forEach((sub) => next.delete(subtopicKey(sub.id)))
        if (allTopicsSelected) next.delete(topicKey(topic.id))
        else next.add(topicKey(topic.id))
      }
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
      {/* Master control: one flip for every topic in every system, so a
          student who wants "the whole bank" doesn't have to open twenty
          systems and tick each one. */}
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
            toggleSubject={toggleSubject}
            toggleTopic={toggleTopic}
            toggleSub={toggleSub}
            expanded={expanded}
            setExpanded={setExpanded}
            t={t}
          />
        ))}
      </div>
    </div>
  )
}
