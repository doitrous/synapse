import { useState } from 'react'
import { Users, Hash, Copy, Check, Play, Plus, RotateCcw, LogIn } from 'lucide-react'
import { subjects } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { Field, TextInput } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { FilterChip } from '@/components/ui/FilterChip'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'

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
  const questions = usePublishedQuestions()
  const [name, setName] = useState('')
  const [subs, setSubs] = useState<Set<string>>(new Set(['cvs']))
  const [count, setCount] = useState(10)
  const [timed, setTimed] = useState(true)
  const [created, setCreated] = useState<Created | null>(null)
  const [copied, setCopied] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [joined, setJoined] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  const withQuestions = subjects.filter((s) => questions.some((q) => q.subjectId === s.id))

  function toggle(id: string) {
    setSubs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  function create() {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase()
    setCreated({ name: name.trim() || 'Untitled test', code })
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
        title="Study Together"
        description="Create or join a shared test with a short code, then work through it live with classmates."
      />

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {created ? (
          <Panel>
            <PanelHeader title="Test ready to share" icon={Hash} action={started ? <Badge tone="success">Open now</Badge> : undefined} />
            <div className="space-y-5 p-5">
              <div>
                <p className="font-serif text-[20px] font-semibold text-ink">{created.name}</p>
                <p className="mt-1 text-[13px] text-ink-3">
                  {count} questions · {timed ? 'Timed' : 'Untimed'} · {subs.size} subject
                  {subs.size === 1 ? '' : 's'}
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
                  {copied ? 'Copied' : 'Copy code'}
                </Button>
              </div>

              <div className="rounded-lg border border-line p-4">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  Lobby
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {LOBBY.map((p) => (
                      <Avatar key={p} name={p} size="sm" className="ring-2 ring-surface" />
                    ))}
                  </div>
                  <span className="text-[13px] text-ink-2">
                    You and 2 others joined · waiting for more…
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="primary" size="md" iconLeft={Play} onClick={() => setStarted((value) => !value)}>
                  {started ? 'Finish test' : 'Start test'}
                </Button>
                <Button variant="ghost" size="md" onClick={() => setCreated(null)}>
                  Edit test
                </Button>
              </div>
            </div>
          </Panel>
        ) : (
          <Panel>
            <PanelHeader title="Create a shared test" icon={Plus} />
            <div className="space-y-5 p-5">
              <Field label="Test name">
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cardiology crunch"
                />
              </Field>

              <div>
                <p className="mb-2 text-[12.5px] font-medium text-ink-2">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {withQuestions.map((s) => (
                    <FilterChip key={s.id} active={subs.has(s.id)} onClick={() => toggle(s.id)} color={s.color}>
                      {s.name}
                    </FilterChip>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">Questions</p>
                  <Segmented
                    value={String(count)}
                    onChange={(v) => setCount(Number(v))}
                    items={[
                      { value: '10', label: '10' },
                      { value: '20', label: '20' },
                      { value: '30', label: '30' },
                    ]}
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-2.5 pb-1 text-[13px] text-ink-2">
                  Timed
                  <Toggle checked={timed} onChange={setTimed} label="Timed" />
                </label>
              </div>

              <div className="border-t border-line pt-4">
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={Hash}
                  onClick={create}
                  disabled={subs.size === 0}
                >
                  Create test code
                </Button>
              </div>
            </div>
          </Panel>
        )}

        <div className="space-y-4">
        <Panel className="h-fit">
          <PanelHeader title="Join with a code" icon={LogIn} />
          <div className="p-4">
            <Field label="Test code" hint={joined ? `Joined ${joined}` : 'Codes contain six letters or numbers.'}>
              <div className="flex gap-2"><TextInput value={joinCode} onChange={(event) => setJoinCode(event.target.value.toUpperCase().slice(0, 6))} placeholder="e.g. ACUTE7" className="font-mono uppercase tracking-[0.12em]" /><Button variant="primary" onClick={() => joinCode.length >= 4 && setJoined(joinCode)} disabled={joinCode.length < 4}>Join</Button></div>
            </Field>
          </div>
        </Panel>
        <Panel className="h-fit">
          <PanelHeader title="Open now" icon={Users} hint={`${OPEN_NOW.length} tests`} />
          <ul className="divide-y divide-line">
            {OPEN_NOW.map((test) => <li key={test.id} className="flex items-center gap-3 px-4 py-3"><div className="min-w-0 flex-1"><p className="truncate text-[13.5px] font-medium text-ink">{test.name}</p><p className="mt-0.5 text-[12px] text-ink-3">{test.joined} joined · {test.questions} questions · code <span className="font-mono">{test.code}</span></p></div><Button size="sm" variant="secondary" onClick={() => { setJoinCode(test.code); setJoined(test.code) }}>Join</Button></li>)}
          </ul>
        </Panel>
        <Panel className="h-fit">
          <PanelHeader title="Finished" icon={Check} />
          <ul className="divide-y divide-line">
            {PAST.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink">{t.name}</p>
                  <p className="mt-0.5 text-[12px] text-ink-3">
                    {t.joined} joined · {t.when}
                  </p>
                </div>
                <Badge tone="neutral">avg {t.avg}%</Badge>
                <Button size="sm" variant="ghost" iconLeft={RotateCcw} onClick={() => { setName(t.name); setCreated(null) }}>Sit it again</Button>
              </li>
            ))}
          </ul>
        </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
