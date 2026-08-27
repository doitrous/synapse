import { useMemo, useState } from 'react'
import { Building2, Users, Plug, Flag, IdCard, Hammer, Activity, Highlighter, RotateCcw, CircleCheck, TrendingDown, TrendingUp } from 'lucide-react'
import { institution, roles, integrations, featureFlags } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { Field, TextInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { EmptyState } from '@/components/ui/EmptyState'
import { usePersistentState } from '@/lib/usePersistentState'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { QUESTION_HIGHLIGHTS_STORAGE_KEY, type QuestionHighlightStore } from '@/data/questionHighlights'
import {
  DEFAULT_STUDENT_ID_DISCOUNT, STUDENT_ID_DISCOUNT_STORAGE_KEY, normaliseDiscountPercent,
  type StudentIdDiscount,
} from '@/data/studentDiscount'
import {
  DEFAULT_MARISTANA_CONFIG, MARISTANA_CONFIG_KEY, normaliseMaristanaConfig,
  projectedModuleHospitals, type MaristanaConfig,
} from '@/data/maristanas'
import {
  analyzeHighlightBehavior, classifyAnswerChanges, DEFAULT_STUDY_TRACKING_SETTINGS, flattenHighlightStore,
  STUDY_TRACKING_SETTINGS_KEY, type StudyTrackingSettings,
} from '@/data/studyTracking'

export function Settings() {
  const [profile, setProfile] = useState(institution)
  const [notice, setNotice] = useState('')
  const [studentId, setStudentId] = usePersistentState<StudentIdDiscount>(STUDENT_ID_DISCOUNT_STORAGE_KEY, DEFAULT_STUDENT_ID_DISCOUNT)
  const [maristana, setMaristana] = usePersistentState<MaristanaConfig>(MARISTANA_CONFIG_KEY, DEFAULT_MARISTANA_CONFIG)
  const [studyTracking, setStudyTracking] = usePersistentState<StudyTrackingSettings>(STUDY_TRACKING_SETTINGS_KEY, DEFAULT_STUDY_TRACKING_SETTINGS)
  const [connected, setConnected] = useState<Set<string>>(
    () => new Set(integrations.filter((i) => i.connected).map((i) => i.name)),
  )
  const [flags, setFlags] = useState<Set<string>>(
    () => new Set(featureFlags.filter((f) => f.enabled).map((f) => f.id)),
  )
  const toggleIn = (name: string) =>
    setConnected((p) => {
      const n = new Set(p)
      if (n.has(name)) n.delete(name)
      else n.add(name)
      return n
    })
  const toggleFlag = (id: string) =>
    setFlags((p) => {
      const n = new Set(p)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  /**
   * No admin-scoped endpoint reads another student's attempts or highlights —
   * `/api/user-state/:key` (which backs both `synapse.progress.*` and
   * `synapse.qbank.questionHighlights`) is always scoped to the caller's own
   * identity, and the shared `/api/state` catalogue store never holds
   * per-student activity. So this preview can only ever show what is
   * available in this browser's own session, and is labelled as such below
   * rather than presented as a cohort report.
   */
  const attemptHistory = useAttemptHistory()
  const [highlightStore] = usePersistentState<QuestionHighlightStore>(QUESTION_HIGHLIGHTS_STORAGE_KEY, {})
  const answerChangeSummary = useMemo(() => classifyAnswerChanges(attemptHistory.records), [attemptHistory.records])
  const highlightSummary = useMemo(
    () => analyzeHighlightBehavior(flattenHighlightStore(highlightStore)),
    [highlightStore],
  )
  const hasPreviewData = answerChangeSummary.totalTransitions > 0 || highlightSummary.totalHighlights > 0

  return (
    <PageContainer>
      <PageHeader title="Settings" description="Institution profile, roles, integrations, and feature flags." />

      {notice && (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint px-4 py-2.5 text-[13px] text-ink">
          <span className="flex-1">{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="text-[12px] font-medium text-ink-3 hover:text-ink">Dismiss</button>
        </div>
      )}

      <Panel className="mb-4">
        <PanelHeader title="Institution" icon={Building2} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Institution name">
            <TextInput value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} />
          </Field>
          <Field label="Primary domain">
            <TextInput value={profile.domain} onChange={(event) => setProfile((current) => ({ ...current, domain: event.target.value }))} />
          </Field>
          <Field label="Region">
            <TextInput value={profile.region} onChange={(event) => setProfile((current) => ({ ...current, region: event.target.value }))} />
          </Field>
          <Field label="Admin contact">
            <TextInput value={profile.contact} onChange={(event) => setProfile((current) => ({ ...current, contact: event.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <Button variant="primary" size="md" onClick={() => setNotice('Institution profile saved for this browser session.')}>
              Save changes
            </Button>
          </div>
        </div>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader title="Student discounts" icon={IdCard} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5">
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium text-ink">Student ID upload</p>
            <p className="mt-0.5 max-w-xl text-[12.5px] leading-relaxed text-ink-2">
              Offers students an upload on their Billing page to claim a discount. Never part of sign-up:
              asking someone for an identity document before they have seen the product is the wrong first
              request. While this is off, no student can tell the option exists.
            </p>
          </div>
          <Field label="Discount">
            <div className="flex items-center gap-1.5">
              <TextInput
                type="number"
                min={0}
                max={100}
                value={studentId.percent}
                onChange={(event) => setStudentId((current) => ({ ...current, percent: normaliseDiscountPercent(event.target.value) }))}
                aria-label="Student ID discount percent"
                className="tnum h-9 w-20 font-mono"
              />
              <span className="text-[12.5px] text-ink-3">%</span>
            </div>
          </Field>
          <label className="flex items-center gap-2 pt-5 text-[12.5px] text-ink-2">
            <Toggle
              checked={studentId.enabled}
              onChange={(enabled) => setStudentId((current) => ({ ...current, enabled }))}
              label="Offer the student ID discount"
            />
            {studentId.enabled ? 'Offered' : 'Not offered'}
          </label>
        </div>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader title="Student Activity Tracking" icon={Activity} hint="Answer changes and highlighting behaviour" />
        <div className="border-b border-line p-5">
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
            When a signal below is on, the platform reads it from the same attempt log and Question Bank
            highlights already recorded for study reports, and does not collect anything new from students.
          </p>
        </div>

        <div className="border-b border-line p-5">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium text-ink">Track answer changes</p>
              <p className="mt-0.5 max-w-xl text-[12.5px] leading-relaxed text-ink-2">
                Whether a student's verdict on a question changes between two attempts at it — did a later
                answer flip from right to wrong, from wrong to right, or stay wrong.
              </p>
            </div>
            <Toggle
              checked={studyTracking.answerChanges}
              onChange={(enabled) => setStudyTracking((current) => ({ ...current, answerChanges: enabled }))}
              label="Track answer changes"
            />
          </div>

          <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
            <li className="flex items-center gap-4 px-3.5 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink">Correct became incorrect</p>
                <p className="mt-0.5 text-[12px] text-ink-2">A student answered a question correctly, then later got the same question wrong.</p>
              </div>
              <Toggle
                checked={studyTracking.trackCorrectToIncorrect}
                onChange={(enabled) => setStudyTracking((current) => ({ ...current, trackCorrectToIncorrect: enabled }))}
                label="Track correct became incorrect"
              />
            </li>
            <li className="flex items-center gap-4 px-3.5 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink">Incorrect became correct</p>
                <p className="mt-0.5 text-[12px] text-ink-2">A student answered a question incorrectly, then later got it right — a sign of learning.</p>
              </div>
              <Toggle
                checked={studyTracking.trackIncorrectToCorrect}
                onChange={(enabled) => setStudyTracking((current) => ({ ...current, trackIncorrectToCorrect: enabled }))}
                label="Track incorrect became correct"
              />
            </li>
            <li className="flex items-center gap-4 px-3.5 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink">Incorrect stayed incorrect</p>
                <p className="mt-0.5 text-[12px] text-ink-2">A student answered a question incorrectly more than once, without ever getting it right.</p>
              </div>
              <Toggle
                checked={studyTracking.trackIncorrectToIncorrect}
                onChange={(enabled) => setStudyTracking((current) => ({ ...current, trackIncorrectToIncorrect: enabled }))}
                label="Track incorrect stayed incorrect"
              />
            </li>
          </ul>
        </div>

        <div className="border-b border-line p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium text-ink">Track highlighting behaviour</p>
              <p className="mt-0.5 max-w-xl text-[12.5px] leading-relaxed text-ink-2">
                Whether a student's highlights in the Question Bank land on the reasoning behind an answer —
                the explanation and rationale text — or scatter across the scenario and answer choices instead.
              </p>
            </div>
            <Toggle
              checked={studyTracking.highlightBehavior}
              onChange={(enabled) => setStudyTracking((current) => ({ ...current, highlightBehavior: enabled }))}
              label="Track highlighting behaviour"
            />
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.06em] text-ink-3">Preview</h4>
            <Badge tone="outline">Preview from available data</Badge>
          </div>
          <p className="mb-4 max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
            No admin-scoped source currently exposes another student's attempts or highlights — the state that
            backs both signals is stored per student and is only ever readable by that student's own session.
            The numbers below are computed the same way a cohort report would be, but from whatever activity is
            present in this browser session, not from every student. Treat this as a preview of the calculation,
            not a cohort figure.
          </p>

          {!hasPreviewData ? (
            <EmptyState
              icon={Activity}
              title="No activity available to preview"
              description="Once this session has recorded question-bank attempts or highlights, a preview of the tracked signals appears here."
              className="rounded-lg border border-dashed border-line bg-surface-2/40 py-10"
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {studyTracking.answerChanges && (
                <div className="rounded-lg border border-line p-4">
                  <p className="text-[12px] font-semibold text-ink-2">Answer changes</p>
                  <p className="mt-1 text-[12px] text-ink-3">
                    {answerChangeSummary.itemsWithRepeatedAttempts} question{answerChangeSummary.itemsWithRepeatedAttempts === 1 ? '' : 's'} attempted more than once ·{' '}
                    {answerChangeSummary.totalTransitions} transition{answerChangeSummary.totalTransitions === 1 ? '' : 's'}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {studyTracking.trackCorrectToIncorrect && (
                      <li className="flex items-center gap-2 text-[12.5px] text-ink">
                        <TrendingDown className="size-3.5 shrink-0 text-danger" />
                        <span className="flex-1 text-ink-2">Correct became incorrect</span>
                        <span className="tnum font-mono font-semibold">{answerChangeSummary.counts.correctToIncorrect}</span>
                      </li>
                    )}
                    {studyTracking.trackIncorrectToCorrect && (
                      <li className="flex items-center gap-2 text-[12.5px] text-ink">
                        <TrendingUp className="size-3.5 shrink-0 text-success" />
                        <span className="flex-1 text-ink-2">Incorrect became correct</span>
                        <span className="tnum font-mono font-semibold">{answerChangeSummary.counts.incorrectToCorrect}</span>
                      </li>
                    )}
                    {studyTracking.trackIncorrectToIncorrect && (
                      <li className="flex items-center gap-2 text-[12.5px] text-ink">
                        <RotateCcw className="size-3.5 shrink-0 text-warning" />
                        <span className="flex-1 text-ink-2">Incorrect stayed incorrect</span>
                        <span className="tnum font-mono font-semibold">{answerChangeSummary.counts.incorrectToIncorrect}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {studyTracking.highlightBehavior && (
                <div className="rounded-lg border border-line p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold text-ink-2">Highlighting behaviour</p>
                    <Badge tone={highlightSummary.focusLabel === 'focused' ? 'success' : highlightSummary.focusLabel === 'sporadic' ? 'warning' : 'neutral'} dot>
                      {highlightSummary.focusLabel === 'focused' ? 'Focused on reasoning'
                        : highlightSummary.focusLabel === 'mixed' ? 'Mixed'
                        : highlightSummary.focusLabel === 'sporadic' ? 'Sporadic'
                        : 'No highlights yet'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-3">
                    {highlightSummary.totalHighlights} highlight{highlightSummary.totalHighlights === 1 ? '' : 's'} across{' '}
                    {highlightSummary.questionsHighlighted} question{highlightSummary.questionsHighlighted === 1 ? '' : 's'}
                  </p>
                  <ul className="mt-3 space-y-2 text-[12.5px] text-ink">
                    <li className="flex items-center gap-2">
                      <CircleCheck className="size-3.5 shrink-0 text-ink-3" />
                      <span className="flex-1 text-ink-2">On the explanation or rationale</span>
                      <span className="tnum font-mono font-semibold">{Math.round(highlightSummary.keyBlockShare * 100)}%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Highlighter className="size-3.5 shrink-0 text-ink-3" />
                      <span className="flex-1 text-ink-2">Highlights per question</span>
                      <span className="tnum font-mono font-semibold">{highlightSummary.highlightsPerQuestion.toFixed(1)}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader title="Build Maristanas economy" icon={Hammer} hint="25 construction steps per hospital" />
        <div className="border-b border-line bg-surface-2/40 px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-ink">Learning-to-construction balance</p>
              <p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
                The default projects about <strong className="font-semibold text-ink">{projectedModuleHospitals(maristana).toFixed(1)} hospitals</strong> from
                a representative module: 30 active study hours, 300 scored questions at 75% accuracy, and ten 75% assessment sessions.
                Changing a multiplier rebalances existing collections because stages are derived from evidence, never stored as an editable score.
              </p>
            </div>
            <label className="flex items-center gap-2 text-[12.5px] text-ink-2">
              <Toggle
                checked={maristana.enabled}
                onChange={(enabled) => setMaristana((current) => normaliseMaristanaConfig({ ...current, enabled }))}
                label="Build Maristanas"
              />
              {maristana.enabled ? 'Available to students' : 'Paused'}
            </label>
          </div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
          <Field label="Credits per construction step" hint="A hospital always has 25 steps.">
            <TextInput
              type="number" min={20} max={10000} step={10}
              value={maristana.creditsPerStep}
              onChange={(event) => setMaristana((current) => normaliseMaristanaConfig({ ...current, creditsPerStep: event.target.value }))}
              className="tnum font-mono"
            />
          </Field>
          <Field label="Credits per active study minute" hint="Recorded only on visible, recently active study surfaces.">
            <TextInput
              type="number" min={0} max={100} step={0.25}
              value={maristana.creditsPerStudyMinute}
              onChange={(event) => setMaristana((current) => normaliseMaristanaConfig({ ...current, creditsPerStudyMinute: event.target.value }))}
              className="tnum font-mono"
            />
          </Field>
          <Field label="Credits per scored question" hint="Awarded for the attempt, regardless of result.">
            <TextInput
              type="number" min={0} max={500} step={1}
              value={maristana.creditsPerQuestion}
              onChange={(event) => setMaristana((current) => normaliseMaristanaConfig({ ...current, creditsPerQuestion: event.target.value }))}
              className="tnum font-mono"
            />
          </Field>
          <Field label="Correct-answer bonus" hint="Added only after the server verifies the answer key.">
            <TextInput
              type="number" min={0} max={1000} step={1}
              value={maristana.creditsPerCorrectAnswer}
              onChange={(event) => setMaristana((current) => normaliseMaristanaConfig({ ...current, creditsPerCorrectAnswer: event.target.value }))}
              className="tnum font-mono"
            />
          </Field>
          <Field label="Assessment minimum questions" hint="A scored session at or above this length earns score credit.">
            <TextInput
              type="number" min={5} max={200} step={1}
              value={maristana.assessmentMinimumQuestions}
              onChange={(event) => setMaristana((current) => normaliseMaristanaConfig({ ...current, assessmentMinimumQuestions: event.target.value }))}
              className="tnum font-mono"
            />
          </Field>
          <Field label="Credits per assessment percentage point" hint="Example: 80% × 1.5 = 120 credits.">
            <TextInput
              type="number" min={0} max={100} step={0.1}
              value={maristana.creditsPerAssessmentPercent}
              onChange={(event) => setMaristana((current) => normaliseMaristanaConfig({ ...current, creditsPerAssessmentPercent: event.target.value }))}
              className="tnum font-mono"
            />
          </Field>
        </div>
      </Panel>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Roles & permissions"
            icon={Users}
            action={<ButtonLink to="/admin/access" variant="ghost" size="sm">Manage access</ButtonLink>}
          />
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Role</Th>
                <Th align="end">Members</Th>
                <Th className="pr-4">Access</Th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <Tr key={r.name} hover>
                  <Td className="pl-4 font-medium">{r.name}</Td>
                  <Td align="end" className="tnum font-mono text-ink-2">
                    {r.members}
                  </Td>
                  <Td className="pr-4 text-[12.5px] text-ink-2">{r.description}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <Panel>
          <PanelHeader title="Integrations" icon={Plug} />
          <ul className="divide-y divide-line">
            {integrations.map((i) => (
              <li key={i.name} className="flex items-center gap-4 px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13.5px] font-medium text-ink">{i.name}</p>
                    {connected.has(i.name) && (
                      <Badge tone="success" dot>
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-ink-2">{i.description}</p>
                </div>
                <Toggle checked={connected.has(i.name)} onChange={() => toggleIn(i.name)} label={i.name} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title="Feature flags" icon={Flag} />
        <ul className="divide-y divide-line">
          {featureFlags.map((f) => (
            <li key={f.id} className="flex items-center gap-4 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{f.name}</p>
                <p className="mt-0.5 text-[12.5px] text-ink-2">{f.description}</p>
              </div>
              <Toggle checked={flags.has(f.id)} onChange={() => toggleFlag(f.id)} label={f.name} />
            </li>
          ))}
        </ul>
      </Panel>
    </PageContainer>
  )
}
