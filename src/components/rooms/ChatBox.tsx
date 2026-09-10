import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import type { ChatMessage } from '@/lib/rooms/roomChannel'

/** Who a private line is addressed to, or being composed for. Just enough to label a bubble or a chip. */
export interface ChatTarget {
  id: string
  name: string
}

/**
 * The room's chat: one scrollable history and one composer for both a public
 * line and a private one.
 *
 * There is no separate "DM view" — a private message is a public one with a
 * `to`, and the box shows both in the same list, the private ones marked so
 * neither the sender nor the reader mistakes them for something the whole
 * room saw. Which member a send is addressed to is entirely the composer's
 * state (`target`); the box itself does not know why it changed, only that it
 * did — `RoomView` sets it from the seat menu.
 */
export function ChatBox({
  messages,
  selfId,
  selfName,
  members,
  target,
  onClearTarget,
  onSend,
}: {
  /** Oldest first, already capped by the channel reducer. */
  messages: ChatMessage[]
  selfId: string
  selfName: string
  /** Enough of the roster to turn a `from`/`to` userId into a name. */
  members: { userId: string; displayName: string }[]
  /** The member the next send goes to alone, or null for the whole room. */
  target: ChatTarget | null
  onClearTarget: () => void
  onSend: (text: string, toUserId?: string) => void
}) {
  const t = useT()
  const [draft, setDraft] = useState('')
  const scroller = useRef<HTMLDivElement>(null)

  // Follow the conversation down, the same way the assistant panel does —
  // only on new lines, so a student scrolling up to reread something is not
  // yanked back down by somebody else's message.
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  function nameFor(userId: string): string {
    if (userId === selfId) return selfName
    return members.find((member) => member.userId === userId)?.displayName || t('Student')
  }

  function submit() {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    onSend(text, target?.id)
  }

  return (
    <Panel className="flex h-[420px] flex-col">
      <PanelHeader title={t('Chat')} icon={MessageCircle} />

      {/* The private target, as a removable chip. Clearing it — not sending —
          is what returns the composer to the whole room. */}
      {target && (
        <div className="flex items-center gap-2 border-b border-line bg-primary-tint/40 px-3 py-2">
          <span className="min-w-0 truncate text-[12px] text-ink-2">
            {t('To')} <span className="font-semibold text-primary-strong">{target.name}</span>
          </span>
          <button
            type="button"
            onClick={onClearTarget}
            aria-label={t('Message everyone instead')}
            title={t('Message everyone instead')}
            className="ms-auto grid size-6 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink"
          >
            <Icon icon={X} size={13} />
          </button>
        </div>
      )}

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {messages.length === 0 ? (
          <p className="text-[12.5px] text-ink-3">{t('No messages yet. Say hello.')}</p>
        ) : (
          <div className="grid gap-2.5">
            {messages.map((message) => {
              const mine = message.from === selfId
              return (
                <div key={message.id} className={cn('max-w-[85%]', mine ? 'ms-auto text-end' : 'me-auto')}>
                  {/* A public line from somebody else is labelled with their
                      name; a private one is labelled with who it went to or
                      came from either way — that label is the whole reason a
                      whisper cannot be mistaken for something everyone saw. */}
                  <p className="mb-0.5 text-[11px] text-ink-3">
                    {message.private ? (
                      mine
                        ? <>{t('To')} {nameFor(message.to ?? '')} · {t('Private')}</>
                        : <>{t('From')} {nameFor(message.from)} · {t('Private')}</>
                    ) : (
                      !mine && nameFor(message.from)
                    )}
                  </p>
                  <p
                    className={cn(
                      'whitespace-pre-wrap rounded-xl px-3 py-2 text-[13px] leading-relaxed',
                      mine
                        ? 'bg-primary text-on-primary'
                        : message.private
                          ? 'border border-primary-line bg-primary-tint/30 text-ink'
                          : 'border border-line bg-surface-2/60 text-ink',
                    )}
                  >
                    {message.text}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="border-t border-line p-2.5">
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              // Enter sends; Shift+Enter is a newline — same convention as
              // the study assistant's composer, so the room does not teach a
              // second one.
              if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit() }
            }}
            placeholder={target ? t('Message privately…') : t('Message the room…')}
            className="max-h-24 min-h-10 w-full resize-none rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-ink placeholder:text-ink-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!draft.trim()}
            aria-label={t('Send')}
            className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-strong disabled:opacity-40"
          >
            <Icon icon={Send} size={15} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </Panel>
  )
}
