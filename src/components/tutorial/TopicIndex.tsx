import { useRef, useState, type KeyboardEvent } from 'react'
import { Check, Play } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { tutorialHubLabel, type TutorialTopic } from '@/data/tutorials'

/**
 * The topics of the chosen hub — or, while a search is typed, the matches from
 * every hub — as one box row each.
 *
 * Rows are real buttons, and the arrows walk them: the list is short, but it is
 * the page's navigation, and tabbing through five to six rows to reach the
 * reader is not navigation. Focus moves on its own (a roving `tabindex`);
 * Enter or Space is what actually opens a topic, so arrowing past a row does
 * not swap the article out from under someone reading it.
 */
export function TopicIndex({
  id,
  labelledBy,
  label,
  topics,
  selectedId,
  onSelect,
  readIds,
  hasVideo,
  showHub = false,
  className,
}: {
  /** The id the hub row's `aria-controls` points at. */
  id: string
  /** id of the hub tab that owns this panel, when one is lit. */
  labelledBy?: string
  /** Names the panel while no tab owns it — the search results. */
  label?: string
  topics: TutorialTopic[]
  selectedId: string | undefined
  onSelect: (topicId: string) => void
  readIds: string[]
  hasVideo: (topicId: string) => boolean
  /** Search results span hubs, so each row says which one it came from. */
  showHub?: boolean
  className?: string
}) {
  const t = useT()
  const listRef = useRef<HTMLUListElement>(null)
  const [rovingId, setRovingId] = useState<string | undefined>(undefined)

  const ids = topics.map((topic) => topic.id)
  // Whatever the roving focus last landed on, so long as it is still listed;
  // otherwise the open topic, otherwise the first row. Recomputed rather than
  // stored, so switching hub or typing a search cannot leave the tab stop on a
  // row that is no longer there.
  const activeId = (rovingId && ids.includes(rovingId) ? rovingId : undefined)
    ?? (selectedId && ids.includes(selectedId) ? selectedId : undefined)
    ?? ids[0]

  function focusRow(index: number) {
    const rows = listRef.current?.querySelectorAll<HTMLButtonElement>('button[data-topic]')
    rows?.[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const index = ids.indexOf(activeId)
    if (index < 0) return
    let next = -1
    if (event.key === 'ArrowDown') next = (index + 1) % ids.length
    else if (event.key === 'ArrowUp') next = (index - 1 + ids.length) % ids.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = ids.length - 1
    if (next < 0) return
    event.preventDefault()
    setRovingId(ids[next])
    focusRow(next)
  }

  const withVideo = topics.filter((topic) => hasVideo(topic.id)).length
  const read = topics.filter((topic) => readIds.includes(topic.id)).length

  return (
    // The panel the hub row switches. No `tabIndex` on it: every row inside is
    // a real button, and a tabpanel that holds focusable content stays out of
    // the tab order itself.
    <Panel
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={cn('p-2', className)}
    >
      <ul ref={listRef} onKeyDown={handleKeyDown} className="space-y-0.5">
        {topics.map((topic) => {
          const selected = topic.id === selectedId
          const isRead = readIds.includes(topic.id)
          return (
            <li key={topic.id}>
              <button
                type="button"
                data-topic={topic.id}
                tabIndex={topic.id === activeId ? 0 : -1}
                aria-current={selected ? 'true' : undefined}
                onClick={() => {
                  setRovingId(topic.id)
                  onSelect(topic.id)
                }}
                className={cn(
                  'flex min-h-11 w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-start text-[13.5px] leading-snug transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                  selected
                    ? 'border-primary-line bg-primary-tint font-semibold text-primary-strong'
                    : 'border-transparent text-ink-2 hover:bg-inset hover:text-ink',
                )}
              >
                <span className="min-w-0 flex-1">
                  {t(topic.label)}
                  {showHub && (
                    <span className={cn('mt-0.5 block text-[11.5px] font-medium', selected ? 'text-primary-strong/80' : 'text-ink-3')}>
                      {t(tutorialHubLabel(topic.hub))}
                    </span>
                  )}
                </span>
                {isRead && (
                  <>
                    <Icon icon={Check} size={14} className="text-success" />
                    <span className="sr-only">{t('Marked as read')}</span>
                  </>
                )}
                {hasVideo(topic.id) && (
                  <>
                    <Icon icon={Play} size={12} className={selected ? 'text-primary' : 'text-ink-3'} />
                    <span className="sr-only">{t('Has a video')}</span>
                  </>
                )}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="tnum mx-1 mt-2 border-t border-line pt-2.5 text-[11.5px] text-ink-3">
        {t('{k} of {n} have a video · {r} read')
          .replace('{k}', String(withVideo))
          .replace('{n}', String(topics.length))
          .replace('{r}', String(read))}
      </p>
    </Panel>
  )
}
