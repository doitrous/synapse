import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

/**
 * A stopwatch for a study session, kept beside the page.
 *
 * The elapsed value is written straight into a ref'd node by an animation
 * frame rather than held in state: a tick per second would re-render the whole
 * reader sixty times a minute to move two digits.
 *
 * It survives a reload because a study session outlasts a page load — closing
 * a tab by accident should not reset the hour you have been sitting there.
 */

const STORAGE_KEY = 'synapse.reader.timer.v1'

interface Stored {
  startedAt: number | null
  accumulated: number
}

function read(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Stored
  } catch { /* private browsing — the timer simply starts fresh */ }
  return { startedAt: null, accumulated: 0 }
}

function clock(ms: number): string {
  const total = Math.floor(ms / 1000)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  const pad = (value: number) => String(value).padStart(2, '0')
  return hours ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`
}

export function StudyTimer({ onClose }: { onClose: () => void }) {
  const t = useT()
  const [state, setState] = useState<Stored>(read)
  const display = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* nothing to remember with */ }
  }, [state])

  useEffect(() => {
    let frame = 0
    const tick = () => {
      const elapsed = state.accumulated + (state.startedAt ? Date.now() - state.startedAt : 0)
      if (display.current) display.current.textContent = clock(elapsed)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [state])

  const running = state.startedAt !== null

  return (
    <div className="absolute end-3 top-3 z-30 flex items-center gap-1.5 rounded-xl border border-line bg-surface px-2.5 py-1.5 shadow-raised">
      <span ref={display} className="tnum min-w-[3.5rem] text-center font-mono text-[15px] font-semibold text-ink">
        {clock(state.accumulated)}
      </span>
      <button
        type="button"
        onClick={() => setState((current) => current.startedAt
          ? { startedAt: null, accumulated: current.accumulated + (Date.now() - current.startedAt) }
          : { startedAt: Date.now(), accumulated: current.accumulated })}
        aria-label={running ? t('Pause the timer') : t('Start the timer')}
        className="grid size-7 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink"
      >
        <Icon icon={running ? Pause : Play} size={14} />
      </button>
      <button
        type="button"
        onClick={() => setState({ startedAt: null, accumulated: 0 })}
        aria-label={t('Reset the timer')}
        className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
      >
        <Icon icon={RotateCcw} size={13} />
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label={t('Close the timer')}
        className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
      >
        <Icon icon={X} size={13} />
      </button>
    </div>
  )
}
