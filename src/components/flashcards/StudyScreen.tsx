import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import {
  ArrowLeft, Layers, Plus, Search, BarChart3, Flag, Archive, RotateCcw, CalendarClock,
  Ban, Info, History, Timer, Pencil, X, Mic, Volume2, AudioLines, Pause,
} from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { Meter } from '@/components/ui/Meter'
import { Dialog } from '@/components/ui/Dialog'
import { Toggle } from '@/components/ui/Toggle'
import { Field, TextInput } from '@/components/ui/Field'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { useLocalJsonPreference } from '@/lib/useLocalPreference'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { useVoiceRecorder } from '@/lib/useVoiceRecorder'
import { useCommands, useScope } from '@/lib/shortcuts/useShortcuts'
import type { Command } from '@/lib/shortcuts/registry'
import type { CardWithMeta, FlashcardsApi } from '@/lib/useFlashcards'
import type { FlashcardsView } from '@/pages/student/Flashcards'
import type { CardSchedule, Grade } from '@/data/srs'
import { GRADES } from '@/data/flashcards/scheduler'
import { FLAGS, flagForDigit } from '@/data/flashcards/flag'
import { noteAudio } from '@/data/flashcards/model'
import { localDay } from '@/data/flashcards/time'
import { StudyCardFace } from './StudyCardFace'
import { StudyCardAudio, type CardAudioHandle } from './StudyCardAudio'
import { DeckOptionsDialog } from './DeckOptionsDialog'
import { CardInfoBody } from './CardInfo'

const GRADE_LABEL: Record<Grade, string> = { again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' }
const GRADE_TONE: Record<Grade, string> = {
  again: 'border-danger/30 bg-danger-tint text-danger hover:brightness-95',
  hard: 'border-line-2 bg-surface text-ink hover:bg-surface-2',
  good: 'border-primary-strong/25 bg-primary text-on-primary shadow-action hover:bg-primary-hover',
  easy: 'border-success/30 bg-success-tint text-success hover:brightness-95',
}

/** Compact Anki-style interval text: "10m", "4d", "3mo", "1y". */
export function formatInterval(schedule: CardSchedule, from: Date): string {
  if (schedule.state === 'review') {
    const days = schedule.interval
    if (days < 1) return '<1d'
    if (days < 30) return `${days}d`
    if (days < 365) return `${Math.max(1, Math.round(days / 30))}mo`
    return `${(days / 365).toFixed(days < 3650 ? 1 : 0)}y`
  }
  const minutes = Math.max(1, Math.round((Date.parse(schedule.due) - from.getTime()) / 60_000))
  if (minutes < 60) return `${minutes}m`
  if (minutes < 1440) return `${Math.round(minutes / 60)}h`
  return `${Math.round(minutes / 1440)}d`
}

interface AutoAdvanceConfig {
  enabled: boolean
  questionSeconds: number
  answerSeconds: number
  answerGrade: Grade
}
const AUTO_ADVANCE_DEFAULT: AutoAdvanceConfig = { enabled: false, questionSeconds: 20, answerSeconds: 10, answerGrade: 'good' }

/**
 * Study one deck: reveal, grade, and every study action, all keyboard-first.
 *
 * The queue is snapshotted at mount so a session works through what was due when
 * the student sat down; a card graded back into learning is re-queued for later
 * in the same session rather than re-derived (which would loop forever the
 * moment its one-minute step elapsed). Every action — grade, flag, bury, reset,
 * set-due, suspend — runs through the command registry in the 'study' scope, so
 * `B` buries here and does nothing while typing, and a dialog opened over the
 * card takes an exclusive scope so a grade can't fire underneath it.
 */
export function StudyScreen({
  api,
  deckId,
  onExit,
  onNavigate,
  onEditNote,
}: {
  api: FlashcardsApi
  deckId: string
  onExit: () => void
  onNavigate: (view: FlashcardsView) => void
  onEditNote: (noteId: string) => void
}) {
  const t = useT()
  const deck = api.getDeck(deckId)
  const logAttempt = useRecordAttempt()
  const [sessionId] = useState(() => `card-${deckId}-${Date.now().toString(36)}`)
  const [autoAdvance, setAutoAdvance] = useLocalJsonPreference<AutoAdvanceConfig>('nishany.flashcards.autoAdvance', AUTO_ADVANCE_DEFAULT)

  const [queue, setQueue] = useState<string[]>(() => api.studyQueue(deckId).map((c) => c.card.id))
  const [total] = useState(queue.length)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studied, setStudied] = useState(0)
  const [prevCardId, setPrevCardId] = useState<string | null>(null)
  const shownAt = useRef<number>(Date.now())

  // Dialog state
  const [infoOpen, setInfoOpen] = useState(false)
  const [prevInfoOpen, setPrevInfoOpen] = useState(false)
  const [setDueOpen, setSetDueOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [autoOpen, setAutoOpen] = useState(false)
  const flagTrigger = usePopoverTrigger()

  const voice = useVoiceRecorder()

  const currentId = queue[0]
  const current: CardWithMeta | undefined = currentId ? api.cardById(currentId) : undefined

  // Card audio (authored on the note, distinct from the student's own-voice
  // recording above). The R/P shortcuts drive the player through this handle.
  const cardAudioRef = current ? noteAudio(current.note) : undefined
  const cardAudio = useRef<CardAudioHandle>(null)

  useEffect(() => { shownAt.current = Date.now() }, [currentId])
  // A recording belongs to the card it was made on; drop it when the card turns.
  // `voice.reset` is stable; depending on the whole recorder would reset mid-record.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { voice.reset() }, [currentId])

  const toggleVoice = useCallback(() => {
    if (voice.state === 'recording') voice.stop()
    else voice.start()
  }, [voice])

  const advance = useCallback((nextSchedule: CardSchedule | null) => {
    setQueue((q) => {
      const [head, ...rest] = q
      // A card still in its learning/relearning steps comes back this session.
      if (nextSchedule && (nextSchedule.state === 'learning' || nextSchedule.state === 'relearning')) {
        return [...rest, head]
      }
      return rest
    })
    setShowAnswer(false)
  }, [])

  const commitGrade = useCallback(
    (answer: Grade) => {
      if (!current) return
      const now = new Date()
      const next = api.schedulerFor(deckId).grade(current.meta.schedule, answer, now)
      api.grade(current.card.id, answer, Date.now() - shownAt.current)
      logAttempt({
        surface: 'card', itemId: `${deckId}:${current.card.id}`, subjectId: deck?.subjectId ?? '',
        topic: deck?.name ?? '', difficulty: 'Moderate', conceptIds: [], correct: null, seconds: null, sessionId,
      })
      setPrevCardId(current.card.id)
      setStudied((n) => n + 1)
      advance(next)
    },
    [current, api, deckId, deck, logAttempt, sessionId, advance],
  )

  const reveal = useCallback(() => setShowAnswer(true), [])

  const doBury = useCallback(() => { if (current) { api.bury(current.card.id, true); advance(null) } }, [current, api, advance])
  const doSuspend = useCallback(() => { if (current) { api.suspend(current.card.id, true); advance(null) } }, [current, api, advance])
  const doReset = useCallback(() => { if (current) { api.reset(current.card.id); setResetOpen(false); advance(null) } }, [current, api, advance])
  const toggleFlag = useCallback(
    (digit: number) => {
      if (!current) return
      const flag = flagForDigit(digit)
      if (!flag) return
      api.setFlag(current.card.id, current.meta.flag === flag ? null : flag)
    },
    [current, api],
  )

  // ---- Shortcut registration (study scope) ---------------------------------
  useScope('study')
  const anyDialogOpen = infoOpen || prevInfoOpen || setDueOpen || resetOpen || optionsOpen || autoOpen
  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      { id: 'study.reveal', title: 'Show answer', group: 'Study', scopes: ['study'], keys: 'Space', when: () => !showAnswer && !!current, run: reveal },
      { id: 'study.escape', title: 'Leave study', group: 'Study', scopes: ['study'], keys: 'Escape', hidden: true, run: onExit },
      { id: 'study.bury', title: 'Bury card', group: 'Study', scopes: ['study'], keys: 'B', when: () => !!current, run: doBury },
      { id: 'study.suspend', title: 'Suspend card', group: 'Study', scopes: ['study'], keys: 'S', when: () => !!current, run: doSuspend },
      { id: 'study.reset', title: 'Reset card', group: 'Study', scopes: ['study'], keys: 'Mod+Shift+R', destructive: true, when: () => !!current, run: () => setResetOpen(true) },
      { id: 'study.setDue', title: 'Set due date', group: 'Study', scopes: ['study'], keys: 'Mod+Shift+D', when: () => !!current, run: () => setSetDueOpen(true) },
      { id: 'study.options', title: 'Deck options', group: 'Study', scopes: ['study'], keys: 'O', run: () => setOptionsOpen(true) },
      { id: 'study.info', title: 'Card info', group: 'Study', scopes: ['study'], keys: 'I', when: () => !!current, run: () => setInfoOpen(true) },
      { id: 'study.prevInfo', title: 'Previous card info', group: 'Study', scopes: ['study'], keys: 'Shift+I', when: () => !!prevCardId, run: () => setPrevInfoOpen(true) },
      { id: 'study.autoAdvance', title: 'Toggle auto advance', group: 'Study', scopes: ['study'], keys: 'Shift+A', run: () => setAutoAdvance((c) => ({ ...c, enabled: !c.enabled })) },
      { id: 'study.edit', title: 'Edit note', group: 'Study', scopes: ['study'], keys: 'E', when: () => !!current, run: () => current && onEditNote(current.note.id) },
      { id: 'study.recordVoice', title: 'Record your voice', group: 'Study', scopes: ['study'], keys: 'V', run: toggleVoice },
      { id: 'study.replayVoice', title: 'Replay your voice', group: 'Study', scopes: ['study'], keys: 'Shift+V', when: () => voice.hasRecording, run: voice.play },
      { id: 'study.replayCardAudio', title: 'Replay card audio', group: 'Study', scopes: ['study'], keys: 'R', when: () => !!cardAudioRef, run: () => cardAudio.current?.replay() },
      { id: 'study.toggleCardAudio', title: 'Pause / resume card audio', group: 'Study', scopes: ['study'], keys: 'P', when: () => !!cardAudioRef, run: () => cardAudio.current?.toggle() },
    ]
    for (const answer of GRADES) {
      const digit = String(GRADES.indexOf(answer) + 1)
      list.push({
        id: `study.grade.${answer}`, title: GRADE_LABEL[answer], group: 'Study', scopes: ['study'], keys: digit,
        when: () => showAnswer && !!current, run: () => commitGrade(answer),
      })
    }
    for (let i = 1; i <= 7; i++) {
      const flag = flagForDigit(i)!
      list.push({
        id: `study.flag.${flag}`, title: `Flag: ${flag}`, group: 'Flags', scopes: ['study'], keys: `Mod+${i}`,
        when: () => !!current, run: () => toggleFlag(i),
      })
    }
    return list
  }, [showAnswer, current, prevCardId, reveal, onExit, doBury, doSuspend, commitGrade, toggleFlag, onEditNote, setAutoAdvance, toggleVoice, voice.hasRecording, voice.play, cardAudioRef])
  useCommands(commands)

  // ---- Auto advance --------------------------------------------------------
  useEffect(() => {
    if (!autoAdvance.enabled || !current || anyDialogOpen) return
    if (!showAnswer) {
      const id = setTimeout(reveal, autoAdvance.questionSeconds * 1000)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => commitGrade(autoAdvance.answerGrade), autoAdvance.answerSeconds * 1000)
    return () => clearTimeout(id)
  }, [autoAdvance, showAnswer, current, anyDialogOpen, reveal, commitGrade])

  // ---- Render --------------------------------------------------------------
  if (!current) {
    return (
      <div className="mx-auto max-w-[42rem] px-4 py-6 sm:px-6">
        <BackLink onExit={onExit} title={deck?.name ?? ''} />
        <Panel className="p-10 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full border border-line bg-surface-2 text-ink-3">
            <Icon icon={studied > 0 ? Info : RotateCcw} size={22} />
          </div>
          <h2 className="mt-3 font-serif text-[19px] font-semibold text-ink">
            {studied > 0 ? t('Session complete') : t('Nothing due right now')}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-2">
            {studied > 0
              ? <>{t('You studied')} <span className="tnum font-medium text-ink">{studied}</span> {studied === 1 ? t('card') : t('cards')}.</>
              : t('You are all caught up on this deck for today.')}
          </p>
          <Button className="mt-5" variant="secondary" onClick={onExit}>{t('Back to Flashcards')}</Button>
        </Panel>
      </div>
    )
  }

  const position = total - queue.length + 1
  const now = new Date()
  const preview = api.schedulerFor(deckId).preview(current.meta.schedule, now)

  return (
    <div className="mx-auto max-w-[44rem] px-4 py-6 sm:px-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <BackLink onExit={onExit} title={deck?.name ?? ''} />
        {autoAdvance.enabled && (
          <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-3"><Icon icon={Timer} size={13} /> {t('Auto advance on')}</span>
        )}
      </div>

      <StudyToolbar
        current={current}
        onNavigate={onNavigate}
        onExit={onExit}
        flagRef={flagTrigger.setAnchor}
        onFlagToggle={flagTrigger.toggle}
        onBury={doBury}
        onSuspend={doSuspend}
        onReset={() => setResetOpen(true)}
        onSetDue={() => setSetDueOpen(true)}
        onOptions={() => setOptionsOpen(true)}
        onInfo={() => setInfoOpen(true)}
        onPrevInfo={() => setPrevInfoOpen(true)}
        onEdit={() => onEditNote(current.note.id)}
        onAuto={() => setAutoOpen(true)}
        autoOn={autoAdvance.enabled}
        hasPrev={!!prevCardId}
        recording={voice.state === 'recording'}
        hasRecording={voice.hasRecording}
        onRecordVoice={toggleVoice}
        onReplayVoice={voice.play}
        hasCardAudio={!!cardAudioRef}
        onReplayCardAudio={() => cardAudio.current?.replay()}
        onToggleCardAudio={() => cardAudio.current?.toggle()}
      />
      {(voice.state === 'denied' || voice.state === 'unsupported' || voice.state === 'error') && (
        <p className="mt-2 text-[11.5px] text-danger" role="status">
          {voice.state === 'denied' ? t('Microphone permission was denied. Allow it in your browser to record.')
            : voice.state === 'unsupported' ? t('Voice recording is not available in this browser.')
              : t('Recording failed. Please try again.')}
        </p>
      )}

      <div className="mb-4 mt-3 flex items-center gap-3">
        <Meter value={position} max={total} target className="flex-1" />
        <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">{position} / {total}</span>
      </div>

      <Panel className="flex min-h-[16rem] flex-col justify-center p-8">
        <StudyCardFace entry={current} showAnswer={showAnswer} />
        {cardAudioRef && <StudyCardAudio key={cardAudioRef} ref={cardAudio} src={cardAudioRef} />}
        {!showAnswer && (
          <div className="mt-6 text-center">
            <Button variant="primary" onClick={reveal}>{t('Show answer')}</Button>
            <p className="mt-2.5 text-[11.5px] text-ink-3">{t('Press')} <Kbd>Space</Kbd></p>
          </div>
        )}
      </Panel>

      {showAnswer && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {GRADES.map((answer, index) => (
              <button
                key={answer}
                type="button"
                onClick={() => commitGrade(answer)}
                className={cn(
                  'rounded-lg border px-3 py-3 text-[13.5px] font-semibold transition-colors active:translate-y-px',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                  GRADE_TONE[answer],
                )}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {t(GRADE_LABEL[answer])}
                  <span className="tnum font-normal opacity-80">{formatInterval(preview[answer], now)}</span>
                  <Kbd>{index + 1}</Kbd>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {flagTrigger.open && flagTrigger.anchor && (
        <FlagMenu current={current} anchor={flagTrigger.anchor} onClose={flagTrigger.close} onPick={(digit) => { toggleFlag(digit); flagTrigger.close() }} />
      )}
      {infoOpen && current && <CardInfoDialog api={api} entry={current} onClose={() => setInfoOpen(false)} />}
      {prevInfoOpen && prevCardId && api.cardById(prevCardId) && (
        <CardInfoDialog api={api} entry={api.cardById(prevCardId)!} previous onClose={() => setPrevInfoOpen(false)} />
      )}
      {setDueOpen && current && <SetDueDialog onClose={() => setSetDueOpen(false)} onConfirm={(day) => { api.setDue(current.card.id, day); setSetDueOpen(false); advance(null) }} />}
      {resetOpen && <ResetConfirmDialog onClose={() => setResetOpen(false)} onConfirm={doReset} />}
      {optionsOpen && deck && <DeckOptionsDialog api={api} deck={deck} onClose={() => setOptionsOpen(false)} />}
      {autoOpen && <AutoAdvanceDialog config={autoAdvance} onChange={setAutoAdvance} onClose={() => setAutoOpen(false)} />}
    </div>
  )
}

function BackLink({ onExit, title }: { onExit: () => void; title: string }) {
  const t = useT()
  return (
    <button type="button" onClick={onExit} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink">
      <Icon icon={ArrowLeft} size={15} /> {t('Flashcards')}{title && ` · ${title}`}
    </button>
  )
}

interface ToolbarProps {
  current: CardWithMeta
  onNavigate: (view: FlashcardsView) => void
  onExit: () => void
  flagRef: (el: HTMLElement | null) => void
  onFlagToggle: () => void
  onBury: () => void
  onSuspend: () => void
  onReset: () => void
  onSetDue: () => void
  onOptions: () => void
  onInfo: () => void
  onPrevInfo: () => void
  onEdit: () => void
  onAuto: () => void
  autoOn: boolean
  hasPrev: boolean
  recording: boolean
  hasRecording: boolean
  onRecordVoice: () => void
  onReplayVoice: () => void
  hasCardAudio: boolean
  onReplayCardAudio: () => void
  onToggleCardAudio: () => void
}

function StudyToolbar(props: ToolbarProps) {
  const t = useT()
  const flag = props.current.meta.flag
  const flagColor = flag ? FLAGS.find((f) => f.color === flag) : undefined
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-line bg-surface-2/50 p-1.5">
      <ToolButton icon={Layers} label={t('Decks')} onClick={props.onExit} />
      <ToolButton icon={Plus} label={t('Add')} onClick={() => props.onNavigate('add')} />
      <ToolButton icon={Search} label={t('Browse')} onClick={() => props.onNavigate('browse')} />
      <ToolButton icon={BarChart3} label={t('Stats')} onClick={() => props.onNavigate('stats')} />
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <button
        type="button"
        ref={props.flagRef}
        onClick={props.onFlagToggle}
        className="grid size-8 place-items-center rounded-md transition-colors hover:bg-surface"
        style={{ color: flagColor ? flagColor.token : 'var(--color-ink-2)' }}
        aria-label={flagColor ? t('Flagged') + `: ${t(flagColor.label)}` : t('Flag')}
        title={t('Flag')}
      >
        <Icon icon={Flag} size={16} />
      </button>
      <ToolButton icon={Archive} label={t('Bury')} onClick={props.onBury} />
      <ToolButton icon={Ban} label={t('Suspend')} onClick={props.onSuspend} />
      <ToolButton icon={RotateCcw} label={t('Reset')} onClick={props.onReset} />
      <ToolButton icon={CalendarClock} label={t('Set due date')} onClick={props.onSetDue} />
      <ToolButton icon={Pencil} label={t('Edit note')} onClick={props.onEdit} />
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolButton icon={Info} label={t('Card info')} onClick={props.onInfo} />
      <ToolButton icon={History} label={t('Previous card info')} onClick={props.onPrevInfo} disabled={!props.hasPrev} />
      <ToolButton icon={Timer} label={t('Auto advance')} onClick={props.onAuto} active={props.autoOn} />
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolButton icon={Mic} label={props.recording ? t('Stop recording') : t('Record your voice')} onClick={props.onRecordVoice} active={props.recording} />
      <ToolButton icon={Volume2} label={t('Replay your voice')} onClick={props.onReplayVoice} disabled={!props.hasRecording} />
      {props.hasCardAudio && (
        <>
          <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          <ToolButton icon={AudioLines} label={t('Replay card audio')} onClick={props.onReplayCardAudio} />
          <ToolButton icon={Pause} label={t('Pause / resume card audio')} onClick={props.onToggleCardAudio} />
        </>
      )}
    </div>
  )
}

function ToolButton({ icon, label, onClick, disabled, active }: { icon: typeof Layers; label: string; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <IconButton icon={icon} label={label} size="sm" onClick={onClick} disabled={disabled} active={active} />
  )
}

function FlagMenu({ current, anchor, onClose, onPick }: { current: CardWithMeta; anchor: HTMLElement; onClose: () => void; onPick: (digit: number) => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  return (
    <Popover anchor={anchor} onClose={onClose} role="menu" label={t('Flag')} placement="bottom-start">
      <div className="w-44 p-1">
        {FLAGS.map((f, i) => (
          <button
            key={f.color}
            type="button"
            role="menuitem"
            onClick={() => onPick(i + 1)}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-start text-[13px] text-ink-2 hover:bg-surface-2"
          >
            <span className="size-3 rounded-full border border-line-2" style={{ backgroundColor: f.token }} aria-hidden />
            <span className="flex-1">{t(f.label)}</span>
            {current.meta.flag === f.color && <Icon icon={X} size={13} className="text-ink-3" />}
            <Kbd>⌘{i + 1}</Kbd>
          </button>
        ))}
      </div>
    </Popover>
  )
}

function CardInfoDialog({ api, entry, previous, onClose }: { api: FlashcardsApi; entry: CardWithMeta; previous?: boolean; onClose: () => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  return (
    <Dialog onClose={onClose} label={t('Card info')} size="md">
      <PanelHeader
        title={previous ? t('Previous card info') : t('Card info')}
        icon={Info}
        action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />}
      />
      <div className="max-h-[65vh] overflow-y-auto p-5">
        <CardInfoBody entry={entry} events={api.reviewEvents.filter((e) => e.cardId === entry.card.id)} />
      </div>
    </Dialog>
  )
}

function SetDueDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: (day: string) => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  const [value, setValue] = useState(localDay(new Date()))
  return (
    <Dialog onClose={onClose} label={t('Set due date')} size="sm">
      <PanelHeader title={t('Set due date')} icon={CalendarClock} />
      <div className="space-y-4 p-5">
        <Field label={t('Due date')} htmlFor="due-date" hint={t('The card becomes a review due on this day.')}>
          <TextInput id="due-date" type="date" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
        </Field>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" onClick={() => onConfirm(value)} disabled={!value}>{t('Set due date')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function ResetConfirmDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  return (
    <Dialog onClose={onClose} label={t('Reset this card')} size="sm">
      <PanelHeader title={t('Reset this card')} icon={RotateCcw} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {t('This returns the card to New and clears its schedule. Its review history is kept. This is recorded in the card’s history.')}
        </p>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="danger" iconLeft={RotateCcw} onClick={onConfirm}>{t('Reset card')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function AutoAdvanceDialog({ config, onChange, onClose }: { config: AutoAdvanceConfig; onChange: Dispatch<SetStateAction<AutoAdvanceConfig>>; onClose: () => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  return (
    <Dialog onClose={onClose} label={t('Auto advance')} size="sm">
      <PanelHeader title={t('Auto advance')} icon={Timer} />
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[13.5px] text-ink-2">{t('Advance automatically')}</span>
          <Toggle checked={config.enabled} onChange={(v) => onChange((c) => ({ ...c, enabled: v }))} label={t('Auto advance')} />
        </div>
        <Field label={t('Seconds to show the question')} htmlFor="aa-q">
          <TextInput id="aa-q" type="number" min={1} value={String(config.questionSeconds)} onChange={(e) => onChange((c) => ({ ...c, questionSeconds: Math.max(1, Number(e.target.value) || 1) }))} />
        </Field>
        <Field label={t('Seconds to show the answer')} htmlFor="aa-a">
          <TextInput id="aa-a" type="number" min={1} value={String(config.answerSeconds)} onChange={(e) => onChange((c) => ({ ...c, answerSeconds: Math.max(1, Number(e.target.value) || 1) }))} />
        </Field>
        <Field label={t('Automatic answer')} htmlFor="aa-grade" hint={t('The grade applied when the answer time elapses.')}>
          <div className="flex gap-1.5">
            {GRADES.map((g) => (
              <button key={g} type="button" onClick={() => onChange((c) => ({ ...c, answerGrade: g }))}
                className={cn('flex-1 rounded-md border px-2 py-1.5 text-[12.5px] font-medium', config.answerGrade === g ? 'border-primary-strong/30 bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-surface-2')}>
                {t(GRADE_LABEL[g])}
              </button>
            ))}
          </div>
        </Field>
        <div className="flex justify-end border-t border-line pt-4">
          <Button variant="primary" onClick={onClose}>{t('Done')}</Button>
        </div>
      </div>
    </Dialog>
  )
}
