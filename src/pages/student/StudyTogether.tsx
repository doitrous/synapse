import { useState } from 'react'
import { Users, Hash, Copy, Check, Play, Plus, RotateCcw, LogIn } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { Field, TextInput } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { questionsInScope, type Scope } from '@/data/qbankScope'
import { useT } from '@/lib/i18n'

const MAX_QUESTIONS = 40

interface Created {
  name: string
  code: string
}

const PAST = [
  { id: 't1', name: 'Cardiology crunch', joined: 4, when: '3 days ago', avg: 76 },
  { id: 't2', name: 'Pharmacology rapid-fire', joined: 6, when: '1 week ago', avg: 68 },
  { id: 't3', name: 'Neuro localisation', joined: 3, when: '2 weeks ago', avg: 71 },
]

const LOBBY = ['Maya Adeyemi', 'Sam Okoro', 'Priya Nair']
const OPEN_NOW = [
  { id: 'o1', name: 'Acute care sprint', code: 'ACUTE7', joined: 3, questions: 10 },
  { id: 'o2', name: 'Renal rapid-fire', code: 'RENAL4', joined: 2, questions: 20 },
]

export function StudyTogether() {
  const t = useT()
  const questions = usePublishedQuestions()
  const [name, setName] = useState('')
  const [scope, setScope] = useState<Scope>(() => new Set())
  const [lenChoice, setLenChoice] = useState<'5' | '10' | '20' | '40' | 'custom'>('10')
  const [customLen, setCustomLen] = useState(15)
  const count = lenChoice === 'custom' ? Math.min(MAX_QUESTIONS, Math.max(1, customLen || 1)) : Number(lenChoice)
  const [timed, setTimed] = useState(true)
  const [created, setCreated] = useState<Created | null>(null)
  const [copied, setCopied] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [joined, setJoined] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  const available = questionsInScope(questions, scope)

  function create() {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase()
    setCreated({ name: name.trim() || t('Untitled test'), code })
  }
  function copy() {
    if (!created) return
    navigator.clipboard?.writeText(created.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Study Together')}
        description={t('Create or join a shared test with a short code, then work through it live with classmates.')}
      />

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {created ? (
          <Panel>
            <PanelHeader title={t('Test ready to share')} icon={Hash} action={started ? <Badge tone="success">{t('Open now')}</Badge> : undefined} />
            <div className="space-y-5 p-5">
              <div>
                <p className="font-serif text-[20px] font-semibold text-ink">{created.name}</p>
                <p className="mt-1 text-[13px] text-ink-3">
                  {count} {t('questions')} · {timed ? t('Timed') : t('Untimed')} · {scope.size === 0 ? t('whole bank') : `${scope.size} ${t('selected')}`}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 p-2 pl-3">
                <Icon icon={Hash} size={16} className="text-ink-3" />
                <span className="tnum flex-1 truncate font-mono text-[18px] font-semibold tracking-[0.16em] text-ink">
                  {created.code}
                </span>
                <Button
                  variant={copied ? 'secondary' : 'primary'}
                  size="sm"
                  iconLeft={copied ? Check : Copy}
                  onClick={copy}
                >
                  {copied ? t('Copied') : t('Copy code')}
                </Button>
              </div>

              <div className="rounded-lg border border-line p-4">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  {t('Lobby')}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {LOBBY.map((p) => (
                      <Avatar key={p} name={p} size="sm" className="ring-2 ring-surface" />
                    ))}
                  </div>
                  <span className="text-[13px] text-ink-2">
                    {t('You and 2 others joined · waiting for more…')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="primary" size="md" iconLeft={Play} onClick={() => setStarted((value) => !value)}>
                  {started ? t('Finish test') : t('Start test')}
                </Button>
                <Button variant="ghost" size="md" onClick={() => setCreated(null)}>
                  {t('Edit test')}
                </Button>
              </div>
            </div>
          </Panel>
        ) : (
          <Panel>
            <PanelHeader title={t('Create a shared test')} icon={Plus} />
            <div className="space-y-5 p-5">
              <Field label={t('Test name')}>
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('e.g. Cardiology crunch')}
                />
              </Field>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[12.5px] font-medium text-ink-2">{t('Choose a topic or subtopic')}</p>
                  {scope.size > 0 && (
                    <button onClick={() => setScope(new Set())} className="text-[12px] font-medium text-accent hover:text-accent-strong">
                      {t('Clear')}
                    </button>
                  )}
                </div>
                <TopicChooser value={scope} onChange={setScope} pool={questions} />
                <p className="mt-2 text-[11.5px] text-ink-3">
                  {scope.size === 0
                    ? t('Nothing selected — questions are drawn from the whole bank.')
                    : `${Math.min(count, available.length)} ${t('of')} ${available.length} ${t('available questions')}`}
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Number of questions')}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Segmented
                      value={lenChoice}
                      onChange={(v) => setLenChoice(v as typeof lenChoice)}
                      items={[
                        { value: '5', label: '5' },
                        { value: '10', label: '10' },
                        { value: '20', label: '20' },
                        { value: '40', label: '40' },
                        { value: 'custom', label: t('Custom') },
                      ]}
                    />
                    {lenChoice === 'custom' && (
                      <input
                        type="number"
                        min={1}
                        max={MAX_QUESTIONS}
                        value={customLen}
                        onChange={(e) => setCustomLen(Math.min(MAX_QUESTIONS, Math.max(1, Number(e.target.value) || 1)))}
                        className="h-9 w-20 rounded-md border border-line bg-surface px-2.5 text-[13.5px] text-ink focus:border-accent focus:outline-none"
                        aria-label={t('Number of questions')}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-[12px] text-ink-3">{t('Up to 40 questions per block.')}</p>
                </div>
                <label className="flex cursor-pointer items-center gap-2.5 pb-1 text-[13px] text-ink-2">
                  {t('Timed')}
                  <Toggle checked={timed} onChange={setTimed} label={t('Timed')} />
                </label>
              </div>

              <div className="border-t border-line pt-4">
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={Hash}
                  onClick={create}
                >
                  {t('Create test code')}
                </Button>
              </div>
            </div>
          </Panel>
        )}

        <div className="space-y-4">
        <Panel className="h-fit">
          <PanelHeader title={t('Join with a code')} icon={LogIn} />
          <div className="p-4">
            <Field label={t('Test code')} hint={joined ? `${t('Joined')} ${joined}` : t('Codes contain six letters or numbers.')}>
              <div className="flex gap-2"><TextInput value={joinCode} onChange={(event) => setJoinCode(event.target.value.toUpperCase().slice(0, 6))} placeholder="e.g. ACUTE7" className="font-mono uppercase tracking-[0.12em]" /><Button variant="primary" onClick={() => joinCode.length >= 4 && setJoined(joinCode)} disabled={joinCode.length < 4}>{t('Join')}</Button></div>
            </Field>
          </div>
        </Panel>
        <Panel className="h-fit">
          <PanelHeader title={t('Open now')} icon={Users} hint={`${OPEN_NOW.length} ${t('tests')}`} />
          <ul className="divide-y divide-line">
            {OPEN_NOW.map((test) => <li key={test.id} className="flex items-center gap-3 px-4 py-3"><div className="min-w-0 flex-1"><p className="truncate text-[13.5px] font-medium text-ink">{test.name}</p><p className="mt-0.5 text-[12px] text-ink-3">{test.joined} {t('joined')} · {test.questions} {t('questions')} · {t('code')} <span className="font-mono">{test.code}</span></p></div><Button size="sm" variant="secondary" onClick={() => { setJoinCode(test.code); setJoined(test.code) }}>{t('Join')}</Button></li>)}
          </ul>
        </Panel>
        <Panel className="h-fit">
          <PanelHeader title={t('Finished')} icon={Check} />
          <ul className="divide-y divide-line">
            {PAST.map((past) => (
              <li key={past.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink">{past.name}</p>
                  <p className="mt-0.5 text-[12px] text-ink-3">
                    {past.joined} {t('joined')} · {past.when}
                  </p>
                </div>
                <Badge tone="neutral">{t('avg')} {past.avg}%</Badge>
                <Button size="sm" variant="ghost" iconLeft={RotateCcw} onClick={() => { setName(past.name); setCreated(null) }}>{t('Sit it again')}</Button>
              </li>
            ))}
          </ul>
        </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
