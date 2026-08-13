import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { subjects } from '@/data/subjects'
import type { Question } from '@/data/qbank'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { scopeCounts, topicKey, subtopicKey, type Scope } from '@/data/qbankScope'
import { useLiveLibrary } from '@/lib/useLiveLibrary'

function Box({ checked, partial }: { checked: boolean; partial?: boolean }) {
  return (
    <span
      className={cn(
        'grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors',
        checked ? 'border-accent bg-accent text-on-accent' : partial ? 'border-accent-line bg-accent-tint' : 'border-line-2 bg-surface',
      )}
    >
      {checked && <Icon icon={Check} size={13} strokeWidth={2.8} />}
      {!checked && partial && <span className="size-2 rounded-[2px] bg-accent" />}
    </span>
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
}: {
  value: Scope
  onChange: (next: Scope) => void
  pool: Question[]
}) {
  const t = useT()
  // The same chapter tree the Library shows — not the demo seed.
  const { topics: libraryTopics } = useLiveLibrary()
  const counts = scopeCounts(pool, libraryTopics)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const groups = subjects
    .map((subj) => ({ subj, topics: libraryTopics.filter((tp) => tp.subjectId === subj.id && counts.topics[tp.id] > 0) }))
    .filter((g) => g.topics.length > 0)

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

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="max-h-[22rem] divide-y divide-line overflow-y-auto">
        {groups.map(({ subj, topics }) => (
          <div key={subj.id}>
            <div className="flex items-center gap-2 bg-surface-2/60 px-3 py-1.5">
              <SubjectDot id={subj.id} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{subj.name}</span>
            </div>
            {topics.map((topic) => {
              const topicSelected = value.has(topicKey(topic.id))
              const selectedSubs = topic.subtopics.filter((s) => value.has(subtopicKey(s.id)))
              const partial = !topicSelected && selectedSubs.length > 0
              const isOpen = expanded[topic.id] ?? false
              return (
                <div key={topic.id}>
                  <div className="flex items-center gap-2 px-3 py-2 hover:bg-inset/50">
                    <button type="button" onClick={() => toggleTopic(topic.id)} className="flex min-w-0 flex-1 items-center gap-2.5 text-start">
                      <Box checked={topicSelected} partial={partial} />
                      <span className="truncate text-[13.5px] font-medium text-ink">{topic.title}</span>
                    </button>
                    <span className="tnum font-mono text-[11px] text-ink-3">{counts.topics[topic.id]}</span>
                    <button
                      type="button"
                      onClick={() => setExpanded((prev) => ({ ...prev, [topic.id]: !isOpen }))}
                      aria-expanded={isOpen}
                      aria-label={t('Toggle subtopics')}
                      className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
                    >
                      <Icon icon={ChevronRight} size={15} className={cn('transition-transform', isOpen && 'rotate-90 rtl:-rotate-90')} />
                    </button>
                  </div>
                  {isOpen && (
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
        ))}
      </div>
    </div>
  )
}
