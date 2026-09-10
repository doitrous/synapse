import { Pause, Play } from 'lucide-react'
import { usePomodoro } from '@/components/shell/PomodoroTimer'
import { useT } from '@/lib/i18n'

/**
 * Starts the study timer from inside the room — the SAME clock the top-bar menu
 * runs (PomodoroProvider). The in-room timer face is gone; this button is how a
 * student starts it, and once running it carries the live countdown so both
 * places always agree.
 */
export function StudyTimerButton({ className }: { className?: string }) {
  const t = useT()
  const engine = usePomodoro()
  if (!engine) return null
  const running = engine.running
  const start = () => {
    // Starting from idle always begins a focus block, not whatever break the
    // menu happened to be parked on.
    if (!running && engine.current.mode !== 'focus') engine.selectMode('focus')
    engine.startPause()
  }
  return (
    <button
      type="button"
      className={`study-timer-button ${running ? 'is-running' : ''} ${className ?? ''}`}
      onClick={start}
      aria-label={running ? `${t(engine.modeLabel)} ${engine.timeLabel} · ${t('Pause')}` : t('Start focus timer')}
    >
      {running ? <Pause size={15} /> : <Play size={15} />}
      {running ? (
        <span className="study-timer-live">
          <span className="study-timer-mode">{t(engine.modeLabel)}</span>
          <span className="tnum study-timer-time">{engine.timeLabel}</span>
        </span>
      ) : (
        <span>{t('Start focus timer')}</span>
      )}
    </button>
  )
}
