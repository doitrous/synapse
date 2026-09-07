import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, ClipboardCheck, Clock3, FileUp, Flag, LogOut, RefreshCw } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Stat } from '@/components/ui/Stat'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Icon } from '@/components/ui/Icon'
import { MediaAttachmentView } from '@/components/ui/MediaAttachmentView'
import { API_MODE, apiGet, apiPost } from '@/lib/api'
import { mediaUrl } from '@/data/mediaLibrary'
import {
  ISSUE_LABEL, RELEVANCE_LABEL, type CurriculumRelevance, type IssueCategory,
  type SourceType, type ValidatorBatchData, type ValidatorWorkspaceData,
} from '@/data/mcqValidation'

const emptyWorkspace: ValidatorWorkspaceData = {
  totals: { assigned: 0, started: 0, completed: 0, questions: 0, submitted: 0 },
  assignments: [], submissions: [], sources: [],
}

const statusTone = (status: string): 'neutral' | 'primary' | 'success' => status === 'completed' ? 'success' : status === 'started' ? 'primary' : 'neutral'
const percent = (n: number, d: number) => d ? Math.round((n / d) * 100) : 0
const dateLabel = (value: string | null) => value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value)) : 'No due date'

function fileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.readAsDataURL(file)
  })
}

export function ValidatorWorkspace() {
  const [workspace, setWorkspace] = useState<ValidatorWorkspaceData>(emptyWorkspace)
  const [batch, setBatch] = useState<ValidatorBatchData | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const questionStartedAt = useRef(Date.now())
  const [answer, setAnswer] = useState('')
  const [confidence, setConfidence] = useState('3')
  const [relevance, setRelevance] = useState<CurriculumRelevance>('taught')
  const [issue, setIssue] = useState<IssueCategory | ''>('')
  const [correction, setCorrection] = useState('')
  const [evidence, setEvidence] = useState('')
  const [evidenceUrl, setEvidenceUrl] = useState('')
  const [sourceId, setSourceId] = useState('')
  const [sourceType, setSourceType] = useState<SourceType>('supporting_source')
  const [sourceTitle, setSourceTitle] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [sourceFile, setSourceFile] = useState<File | null>(null)

  const loadWorkspace = useCallback(async () => {
    if (!API_MODE) { setLoading(false); setError('The validator workspace requires the live Nishani backend.'); return }
    setLoading(true)
    try { setWorkspace(await apiGet<ValidatorWorkspaceData>('/mcq-validator/workspace')); setError('') }
    catch { setError('Your assigned validation work could not be loaded.') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { void loadWorkspace() }, [loadWorkspace])

  async function openBatch(batchId: string) {
    setBusy(true); setError(''); setNotice('')
    try {
      const next = await apiGet<ValidatorBatchData>(`/mcq-validator/batches/${encodeURIComponent(batchId)}`)
      setBatch(next)
      const firstOpen = next.questions.findIndex((question) => !question.submitted)
      setActiveIndex(firstOpen < 0 ? 0 : firstOpen)
      resetForm()
    } catch { setError('That batch is not assigned to this account.') }
    finally { setBusy(false) }
  }

  function resetForm() {
    setAnswer(''); setConfidence('3'); setRelevance('taught'); setIssue('')
    setCorrection(''); setEvidence(''); setEvidenceUrl(''); setSourceId('')
    questionStartedAt.current = Date.now()
  }

  const active = batch?.questions[activeIndex] ?? null
  useEffect(() => { questionStartedAt.current = Date.now() }, [active?.questionId])

  async function submit() {
    if (!batch || !active || !answer) { setError('Choose an answer before submitting.'); return }
    setBusy(true); setError(''); setNotice('')
    try {
      await apiPost(`/mcq-validator/batches/${encodeURIComponent(batch.assignment.batchId)}/submissions`, {
        questionId: active.questionId,
        selectedAnswer: answer,
        confidence: Number(confidence),
        timeSeconds: Math.max(0, Math.round((Date.now() - questionStartedAt.current) / 1000)),
        curriculumRelevance: relevance,
        issueCategory: issue || null,
        suggestedCorrection: correction || null,
        evidenceText: evidence || null,
        evidenceUrl: evidenceUrl || null,
        sourceId: sourceId || null,
      })
      const refreshed = await apiGet<ValidatorBatchData>(`/mcq-validator/batches/${encodeURIComponent(batch.assignment.batchId)}`)
      setBatch(refreshed)
      const nextOpen = refreshed.questions.findIndex((question, index) => index > activeIndex && !question.submitted)
      setActiveIndex(nextOpen >= 0 ? nextOpen : activeIndex)
      resetForm()
      setNotice('Response submitted. Answer-key results remain hidden during validation.')
      await loadWorkspace()
    } catch { setError('This response could not be submitted. A question can be submitted only once.') }
    finally { setBusy(false) }
  }

  async function uploadSource() {
    if (!sourceTitle.trim() || (!sourceUrl.trim() && !sourceFile)) { setError('Add a title and either a file or a source URL.'); return }
    if (sourceFile && sourceFile.size > 5 * 1024 * 1024) { setError('Files must be 5 MB or smaller.'); return }
    setBusy(true); setError(''); setNotice('')
    try {
      await apiPost('/mcq-validator/sources', {
        sourceType, title: sourceTitle, sourceUrl: sourceUrl || null,
        assignmentId: batch?.assignment.assignmentId ?? null,
        fileName: sourceFile?.name ?? null, mimeType: sourceFile?.type ?? null,
        contentBase64: sourceFile ? await fileAsBase64(sourceFile) : null,
      })
      setSourceTitle(''); setSourceUrl(''); setSourceFile(null)
      setNotice('Supporting source uploaded to your university validation record.')
      await loadWorkspace()
    } catch { setError('The supporting source could not be uploaded.') }
    finally { setBusy(false) }
  }

  const completion = percent(workspace.totals.submitted, workspace.totals.questions)
  const eligibleSources = useMemo(() => workspace.sources.filter((source) => !source.assignmentId || source.assignmentId === batch?.assignment.assignmentId), [workspace.sources, batch])

  return (
    <div className="min-h-screen bg-app">
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-on-primary"><Icon icon={ClipboardCheck} size={19} /></span>
          <div><p className="text-[14px] font-bold text-ink">Nishani MCQ Validation</p><p className="text-[11.5px] text-ink-3">Blind curriculum review workspace</p></div>
          <a href="/logout" className="ms-auto inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-[13px] font-semibold text-ink-2 hover:bg-inset"><Icon icon={LogOut} size={15} />Sign out</a>
        </div>
      </div>
      <PageContainer>
        <PageHeader title="Your validation work" description="Answer assigned MCQs and report curriculum fit or quality issues. You cannot edit live content from this workspace."
          actions={<Button size="sm" variant="secondary" iconLeft={RefreshCw} loading={loading} onClick={() => void loadWorkspace()}>Refresh</Button>} />
        {error && <Panel className="mb-4 border-danger/30 bg-danger-tint px-4 py-3 text-[13px] text-danger" role="alert">{error}</Panel>}
        {notice && <Panel className="mb-4 border-success/30 bg-success-tint px-4 py-3 text-[13px] text-success" role="status">{notice}</Panel>}

        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Assigned batches" value={String(workspace.totals.assigned)} sub={`${workspace.totals.started} in progress`} icon={ClipboardCheck} />
          <Stat label="Completed" value={String(workspace.totals.completed)} sub="batches" icon={CheckCircle2} />
          <Stat label="Questions submitted" value={String(workspace.totals.submitted)} sub={`${workspace.totals.questions} assigned`} icon={Flag} />
          <Stat label="Overall progress" value={`${completion}%`} sub="your work only" icon={Clock3} />
        </div>

        {!batch ? (
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
            <Panel className="overflow-hidden">
              <PanelHeader title="Assigned batches" hint={`${workspace.assignments.length} total`} />
              <div className="divide-y divide-line">
                {workspace.assignments.map((assignment) => (
                  <button key={assignment.assignmentId} type="button" onClick={() => void openBatch(assignment.batchId)} className="flex w-full items-center gap-4 px-4 py-4 text-start hover:bg-inset">
                    <span className="min-w-0 flex-1"><span className="block text-[14px] font-semibold text-ink">{assignment.title}</span><span className="mt-1 block text-[12px] text-ink-3">{[assignment.universityId, assignment.academicYear, assignment.term, assignment.moduleName, assignment.subjectName].filter(Boolean).join(' · ')}</span></span>
                    <span className="text-end"><Badge tone={statusTone(assignment.status)}>{assignment.status}</Badge><span className="mt-1 block font-mono text-[11px] text-ink-3">{assignment.submittedCount}/{assignment.questionCount} · {dateLabel(assignment.dueAt)}</span></span>
                  </button>
                ))}
                {!workspace.assignments.length && <p className="px-4 py-12 text-center text-[13px] text-ink-3">No batches have been assigned yet.</p>}
              </div>
            </Panel>
            <SourceUpload sourceType={sourceType} setSourceType={setSourceType} title={sourceTitle} setTitle={setSourceTitle} url={sourceUrl} setUrl={setSourceUrl} setFile={setSourceFile} busy={busy} upload={() => void uploadSource()} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3"><Button size="sm" variant="secondary" onClick={() => setBatch(null)}>← All batches</Button><div className="min-w-0"><h2 className="text-[18px] font-semibold text-ink">{batch.assignment.title}</h2><p className="text-[12px] text-ink-3">{batch.assignment.submittedCount}/{batch.assignment.questionCount} submitted</p></div></div>
            <div className="grid items-start gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
              <Panel className="overflow-hidden"><PanelHeader title="Questions" />
                <div className="grid grid-cols-5 gap-1 p-3 lg:grid-cols-4">{batch.questions.map((question, index) => <button key={question.questionId} type="button" onClick={() => { setActiveIndex(index); resetForm() }} className={`grid size-10 place-items-center rounded-md border text-[12px] font-semibold ${index === activeIndex ? 'border-primary bg-primary text-on-primary' : question.submitted ? 'border-success/30 bg-success-tint text-success' : 'border-line bg-surface text-ink-2 hover:bg-inset'}`}>{question.ordinalNo}</button>)}</div>
              </Panel>
              {active && <Panel className="overflow-hidden"><PanelHeader title={`Question ${active.ordinalNo}`} hint={active.question.topic || active.question.subjectId || undefined} action={active.submitted ? <Badge tone="success">Submitted</Badge> : <Badge tone="neutral">Blind answer</Badge>} />
                <div className="space-y-5 p-5">
                  {active.question.vignette && <p className="text-[14px] leading-relaxed text-ink-2">{active.question.vignette}</p>}
                  <p className="font-serif text-[18px] font-semibold leading-relaxed text-ink">{active.question.stem}</p>
                  {active.question.leadIn && <p className="text-[14px] font-medium text-ink">{active.question.leadIn}</p>}
                  {active.question.attachedImage && <MediaAttachmentView attachment={{ id: active.question.attachedImage, type: 'image', name: 'Question supporting visual', url: active.question.attachedImage.startsWith('/') || active.question.attachedImage.startsWith('http') ? active.question.attachedImage : mediaUrl(active.question.attachedImage) }} />}
                  {[...(active.question.attachments ?? []), ...(active.question.mediaRecords ?? [])].map((attachment) => <MediaAttachmentView key={`${attachment.id}:${attachment.url}`} attachment={{ ...attachment, description: 'altText' in attachment && typeof attachment.altText === 'string' ? attachment.altText : undefined }} />)}
                  <div className="space-y-2">{active.question.answers.map((option) => <label key={option.label} className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${answer === option.label ? 'border-primary bg-primary-tint' : 'border-line hover:bg-inset'}`}><input type="radio" name="validator-answer" value={option.label} checked={answer === option.label} disabled={active.submitted} onChange={() => setAnswer(option.label)} className="mt-1 accent-primary" /><span className="text-[13.5px] leading-relaxed text-ink"><strong className="me-2">{option.label}.</strong>{option.text}</span></label>)}</div>
                  {!active.submitted && <>
                    <div className="grid gap-4 sm:grid-cols-3"><Field label="Confidence"><Select value={confidence} onChange={(e) => setConfidence(e.target.value)}>{[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} — {n === 1 ? 'guessing' : n === 5 ? 'very confident' : 'moderate'}</option>)}</Select></Field><Field label="Curriculum relevance"><Select value={relevance} onChange={(e) => setRelevance(e.target.value as CurriculumRelevance)}>{Object.entries(RELEVANCE_LABEL).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</Select></Field><Field label="Issue category"><Select value={issue} onChange={(e) => setIssue(e.target.value as IssueCategory | '')}><option value="">No issue</option>{Object.entries(ISSUE_LABEL).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</Select></Field></div>
                    {issue && <div className="grid gap-4 md:grid-cols-2"><Field label="Suggested correction"><Textarea value={correction} onChange={(e) => setCorrection(e.target.value)} placeholder="Describe what should be reviewed. This does not edit the question." /></Field><Field label="Supporting evidence"><Textarea value={evidence} onChange={(e) => setEvidence(e.target.value)} placeholder="Citation, curriculum wording, page or rationale." /></Field><Field label="Evidence URL"><TextInput type="url" value={evidenceUrl} onChange={(e) => setEvidenceUrl(e.target.value)} placeholder="https://…" /></Field><Field label="Uploaded source"><Select value={sourceId} onChange={(e) => setSourceId(e.target.value)}><option value="">None</option>{eligibleSources.map((source) => <option key={source.id} value={source.id}>{source.title}</option>)}</Select></Field></div>}
                    <div className="flex justify-end"><Button variant="primary" loading={busy} onClick={() => void submit()}>Submit blind answer & feedback</Button></div>
                  </>}
                </div>
              </Panel>}
            </div>
            <SourceUpload sourceType={sourceType} setSourceType={setSourceType} title={sourceTitle} setTitle={setSourceTitle} url={sourceUrl} setUrl={setSourceUrl} setFile={setSourceFile} busy={busy} upload={() => void uploadSource()} />
          </div>
        )}

        <Panel className="mt-5 overflow-hidden"><PanelHeader title="Previous submissions" hint="Your responses only" /><Table><thead><Tr><Th>Submitted</Th><Th>Question</Th><Th>Answer</Th><Th>Confidence</Th><Th>Time</Th><Th>Curriculum</Th><Th>Issue</Th><Th>Feedback</Th></Tr></thead><tbody>{workspace.submissions.slice(0, 100).map((submission) => <Tr key={submission.id}><Td className="whitespace-nowrap text-[12px] text-ink-3">{dateLabel(submission.submittedAt)}</Td><Td className="font-mono text-[12px]">{submission.questionId}</Td><Td>{submission.selectedAnswer}</Td><Td>{submission.confidence}/5</Td><Td>{submission.timeSeconds}s</Td><Td>{RELEVANCE_LABEL[submission.curriculumRelevance]}</Td><Td>{submission.issueCategory ? ISSUE_LABEL[submission.issueCategory] : '—'}</Td><Td className="max-w-72 text-[12px] text-ink-3">{submission.suggestedCorrection || submission.evidenceText || '—'}</Td></Tr>)}</tbody></Table></Panel>
      </PageContainer>
    </div>
  )
}

function SourceUpload({ sourceType, setSourceType, title, setTitle, url, setUrl, setFile, busy, upload }: {
  sourceType: SourceType; setSourceType: (value: SourceType) => void; title: string; setTitle: (value: string) => void
  url: string; setUrl: (value: string) => void; setFile: (file: File | null) => void; busy: boolean; upload: () => void
}) {
  return <Panel><PanelHeader title="Supporting sources" icon={FileUp} hint="University-scoped" /><div className="grid gap-3 p-4 sm:grid-cols-2"><Field label="Source type"><Select value={sourceType} onChange={(e) => setSourceType(e.target.value as SourceType)}><option value="curriculum_map">Curriculum map</option><option value="schedule">Schedule</option><option value="supporting_source">Supporting source</option></Select></Field><Field label="Title"><TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Year 2 module handbook" /></Field><Field label="Source URL"><TextInput type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" /></Field><Field label="File (max 5 MB)"><TextInput type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></Field><div className="sm:col-span-2"><Button variant="secondary" loading={busy} onClick={upload}>Upload source</Button></div></div></Panel>
}
