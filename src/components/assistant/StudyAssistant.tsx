import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bot, RotateCcw, Send, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useI18n } from '@/lib/i18n'
import { useAssistant, type AssistantContext } from '@/lib/useAssistant'
import { surfaceFor } from '@/lib/assistantSurface'

/**
 * The study assistant, as a panel the student opens.
 *
 * A docked panel rather than a page: the question a student wants to ask is
 * almost always about what is already on screen, and sending them somewhere
 * else to ask it loses the thing they were asking about. The current surface is
 * passed as context for the same reason.
 *
 * It does not render at all when the assistant is off, unconfigured, or not on
 * the student's plan. A launcher that opens onto "unavailable" is worse than no
 * launcher — see `docs/assistant-testing.md`, S4.
 */

export function StudyAssistant() {
  const { t, lang, dir } = useI18n()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')

  const context = useMemo<AssistantContext>(() => ({ surface: surfaceFor(pathname) }), [pathname])
  const { status, available, turns, pending, failure, returned, send, reset, clearFailure } =
    useAssistant({ lang, context })

  const scroller = useRef<HTMLDivElement>(null)
  const composer = useRef<HTMLTextAreaElement>(null)

  // A failed send hands the text back rather than dropping it.
  useEffect(() => { if (returned) setDraft(returned) }, [returned])

  useEffect(() => {
    if (!open) return
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [turns, pending, open])

  useEffect(() => {
    if (open) composer.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!available || !status) return null

  const exhausted = status.remaining <= 0
  const suggestions = [
    t('What should I study today?'),
    t('Explain preload and afterload'),
    t('Where is heart failure covered?'),
  ]

  function submit() {
    const text = draft.trim()
    if (!text || pending || exhausted) return
    setDraft('')
    clearFailure()
    void send(text)
  }

  return (
    <>
      {/* ---- Launcher ---- */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 end-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface px-4 text-[13.5px] font-semibold text-ink shadow-pop transition-colors hover:bg-surface-2"
        >
          <Icon icon={Bot} size={17} className="text-primary-strong" />
          {t('Study assistant')}
        </button>
      )}

      {/* ---- Panel ---- */}
      {open && (
        <div
          dir={dir}
          role="dialog"
          aria-label={t('Study assistant')}
          className="fixed inset-x-0 bottom-0 z-40 flex h-[min(560px,80dvh)] flex-col rounded-t-2xl border border-line bg-surface shadow-pop sm:inset-x-auto sm:bottom-4 sm:end-4 sm:w-[400px] sm:rounded-2xl"
        >
          <header className="flex items-center gap-3 border-b border-line px-4 py-3">
            <Icon icon={Bot} size={17} className="shrink-0 text-primary-strong" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold text-ink">{t('Study assistant')}</p>
              <p className="tnum truncate text-[11.5px] text-ink-3">
                {status.remaining} / {status.dailyMessages} {t('left today')} · {status.plan}
              </p>
            </div>
            {turns.length > 0 && (
              <button
                type="button"
                onClick={() => { reset(); setDraft('') }}
                aria-label={t('Start over')}
                className="grid size-8 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink"
              >
                <Icon icon={RotateCcw} size={15} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('Close')}
              className="grid size-8 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink"
            >
              <Icon icon={X} size={16} />
            </button>
          </header>

          <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            {turns.length === 0 && (
              <div>
                <p className="text-[13px] leading-relaxed text-ink-2">
                  {t('Ask about anything you are studying, or about how Connect Cortex works.')}
                </p>
                <div className="mt-3 grid gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => { clearFailure(); void send(suggestion) }}
                      disabled={exhausted}
                      className="rounded-lg border border-line bg-surface-2/50 px-3 py-2 text-start text-[12.5px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-3">
              {turns.map((turn) => (
                <div
                  key={turn.id}
                  className={cn(
                    'max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-[13px] leading-relaxed',
                    turn.role === 'user'
                      ? 'ms-auto bg-primary text-on-primary'
                      : 'me-auto border border-line bg-surface-2/60 text-ink',
                  )}
                >
                  {turn.content}
                </div>
              ))}

              {pending && (
                <p className="me-auto text-[12.5px] text-ink-3" aria-live="polite">{t('Thinking…')}</p>
              )}

              {failure && (
                <p
                  role="status"
                  className="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-[12.5px] leading-relaxed text-ink"
                >
                  {failure === 'quota' && t('You have used all your assistant messages for today. They reset at midnight.')}
                  {failure === 'not_on_plan' && t('The assistant is not included on your plan.')}
                  {failure === 'unavailable' && t('The assistant is unavailable right now.')}
                  {failure === 'error' && t('That did not go through. Your message is back in the box — try again.')}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-line px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={composer}
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  // Enter sends; Shift+Enter is a newline. A question is one
                  // line far more often than it is several.
                  if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit() }
                }}
                disabled={exhausted}
                placeholder={exhausted ? t('No messages left today') : t('Ask a question')}
                className="max-h-32 min-h-11 w-full resize-none rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] text-ink placeholder:text-ink-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] disabled:opacity-60"
              />
              <button
                type="button"
                onClick={submit}
                disabled={!draft.trim() || pending || exhausted}
                aria-label={t('Send')}
                className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-strong disabled:opacity-40"
              >
                <Icon icon={Send} size={16} className="rtl:-scale-x-100" />
              </button>
            </div>
            {/* Permanent, not a one-time notice: the claim it qualifies is made
                by every answer, so it belongs next to every answer. */}
            <p className="mt-2 text-[11px] leading-snug text-ink-3">
              {t('A study tool, not clinical guidance. Never use it for a decision about a patient.')}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
