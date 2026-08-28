import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import {
  AlertTriangle, ArrowLeft, CheckCircle2, ClipboardCheck, FileJson,
  FolderLock, GraduationCap, KeyRound, ListTree, PlayCircle, Scale,
  ShieldCheck, UploadCloud,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CourseCurriculumSelection } from '@/data/courseCurriculum'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import type { ModuleSubjectStore } from '@/data/moduleSubjects'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { API_MODE, apiPost } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { cn } from '@/lib/cn'
import {
  ASSESSMENT_SCHEMES_KEY,
  CURRICULA_KEY,
  PROVENANCE_KEY,
  SCHEDULE_KEY,
  SUBJECTS_KEY,
  UNIVERSITY_KEY,
  buildStagedAcademicDocuments,
  countAssessmentSchemes,
  countSubjectTree,
  hasExpectedVersions,
  packageUniversities,
  parseAcademicIntakePackage,
  type AcademicDocumentKey,
  type AcademicIntakePackage,
  type AssessmentSchemeStore,
  type CurrentAcademicDocuments,
  type MarkReconciliationRow,
  type ProvenanceStore,
  type ServerPreviewResult,
  type StagedIntake,
} from './academicIntakeModel'

type PublishResult = { ok: boolean; changedKeys: string[]; versions: Record<string, number | null>; fingerprints: Record<string, string> }

function n(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function stateError(...errors: Array<string | null | undefined>): string {
  return errors.find(Boolean) ?? ''
}

function idempotencyKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `academic-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function describeError(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') return error.message
  return 'Request failed.'
}

function Metric({
  label,
  value,
  hint,
  icon,
}: {
  label: string
  value: string
  hint: string
  icon: typeof FileJson
}) {
  return (
    <Panel className="p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">{label}</span>
        <span className="grid size-8 place-items-center rounded-lg bg-inset text-ink-3"><Icon icon={icon} size={16} /></span>
      </div>
      <div className="tnum font-serif text-[28px] font-semibold leading-none tracking-[-0.03em] text-ink">{value}</div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{hint}</p>
    </Panel>
  )
}

function FileDrop({
  fileName,
  errors,
  onFile,
}: {
  fileName: string
  errors: string[]
  onFile: (file: File) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const choose = () => inputRef.current?.click()
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) onFile(file)
  }
  return (
    <Panel className={cn('overflow-hidden border-dashed', dragging && 'border-primary bg-primary-tint/50')}>
      <div
        role="button"
        tabIndex={0}
        onClick={choose}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose() } }}
        onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className="p-5 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="application/json,.json"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0]
            if (file) onFile(file)
            event.currentTarget.value = ''
          }}
        />
        <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl border border-line bg-surface-2 text-primary">
          <Icon icon={UploadCloud} size={22} />
        </div>
        <h3 className="font-serif text-[18px] font-semibold text-ink">Drop academic-intake-package.json</h3>
        <p className="mx-auto mt-1 max-w-md text-[13px] leading-relaxed text-ink-2">
          Admin-only package intake. The browser stages documents locally first; publish is unavailable until the backend preview returns expected versions.
        </p>
        <Button type="button" className="mt-4" variant="secondary" iconLeft={FileJson}>Choose package</Button>
        {fileName && <p className="mt-3 break-all font-mono text-[11.5px] text-ink-3">{fileName}</p>}
      </div>
      {errors.length > 0 && (
        <ul className="border-t border-danger/25 bg-danger-tint px-4 py-3 text-start text-[12.5px] text-danger">
          {errors.map((error) => <li key={error}>• {error}</li>)}
        </ul>
      )}
    </Panel>
  )
}

function WaveSelector({
  pkg,
  universityId,
  selectedYearIds,
  setUniversityId,
  setSelectedYearIds,
}: {
  pkg: AcademicIntakePackage
  universityId: string
  selectedYearIds: string[]
  setUniversityId: (value: string) => void
  setSelectedYearIds: (value: string[]) => void
}) {
  const options = packageUniversities(pkg)
  const chosen = options.find((option) => option.id === universityId) ?? options[0]
  return (
    <Panel className="p-4">
      <Field label="Selected university wave" hint="Only checked years from this university are merged. Unsupported years stay exactly as they are.">
        <Select
          value={universityId}
          onChange={(event) => {
            const next = event.target.value
            setUniversityId(next)
            setSelectedYearIds(options.find((option) => option.id === next)?.years.map((year) => year.id) ?? [])
          }}
        >
          {options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </Select>
      </Field>
      {chosen && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {chosen.years.map((year) => {
            const checked = selectedYearIds.includes(year.id)
            return (
              <label key={year.id} className={cn('flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5', checked ? 'border-primary-line bg-primary-tint' : 'border-line bg-surface-2 hover:bg-inset')}>
                <input
                  type="checkbox"
                  className="size-4 accent-[var(--color-primary)]"
                  checked={checked}
                  onChange={(event) => {
                    setSelectedYearIds(event.target.checked
                      ? [...selectedYearIds, year.id]
                      : selectedYearIds.filter((id) => id !== year.id))
                  }}
                />
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-ink">{year.year}</span>
                  <span className="text-[11.5px] text-ink-3">{year.id} · {year.courses?.length ?? 0} modules</span>
                </span>
              </label>
            )
          })}
        </div>
      )}
    </Panel>
  )
}

function MarkReconciliation({ rows }: { rows: MarkReconciliationRow[] }) {
  const tone = (status: MarkReconciliationRow['status']) =>
    status === 'exact' ? 'success' : status === 'partial' ? 'warning' : 'danger'
  return (
    <Panel className="overflow-hidden">
      <PanelHeader title="Mark reconciliation" hint={`${rows.length} schemes`} icon={Scale} />
      {rows.length === 0 ? (
        <EmptyState icon={Scale} title="No assessment schemes in this wave" description="The sixth academic document is still staged, but this selected wave has no scheme rows." />
      ) : (
        <ul className="divide-y divide-line">
          {rows.map((row) => (
            <li key={row.key} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-[13.5px] font-semibold text-ink">{row.moduleLabel}</h3>
                  <p className="mt-0.5 break-all font-mono text-[11px] text-ink-3">{row.key}</p>
                </div>
                <Badge tone={tone(row.status)} dot>{row.status}</Badge>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg bg-surface-2 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Declared</p>
                  <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{row.declaredTotal}</p>
                </div>
                <div className="rounded-lg bg-surface-2 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Components</p>
                  <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{row.componentTotal}</p>
                </div>
                <div className="rounded-lg bg-surface-2 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Rows</p>
                  <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{row.components}</p>
                </div>
              </div>
              {row.errors.length > 0 && (
                <ul className="mt-3 rounded-lg border border-danger/25 bg-danger-tint px-3 py-2 text-[12.5px] text-danger">
                  {row.errors.map((error) => <li key={error}>• {error}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

function DocumentDiff({ staged, serverPreview }: { staged: StagedIntake | null; serverPreview: ServerPreviewResult | null }) {
  const changed = staged?.summary.changedKeys ?? []
  return (
    <Panel className="overflow-hidden">
      <PanelHeader title="Six-key document preview" hint={serverPreview?.ok ? 'server accepted' : 'local staging'} icon={ClipboardCheck} />
      <div className="grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
        {([
          [UNIVERSITY_KEY, 'Catalogue'],
          [CURRICULA_KEY, 'Curricula'],
          [SCHEDULE_KEY, 'Schedules'],
          [SUBJECTS_KEY, 'Subjects'],
          [PROVENANCE_KEY, 'Provenance'],
          [ASSESSMENT_SCHEMES_KEY, 'Assessment schemes'],
        ] as Array<[AcademicDocumentKey, string]>).map(([key, label]) => (
          <div key={key} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-semibold text-ink">{label}</span>
              <Badge tone={changed.includes(key) ? 'primary' : 'neutral'}>{changed.includes(key) ? 'staged' : 'preserved'}</Badge>
            </div>
            <p className="mt-1 break-all font-mono text-[11px] text-ink-3">{key}</p>
            {serverPreview?.fingerprints?.[key] && <p className="mt-2 break-all font-mono text-[10.5px] text-ink-3">sha {serverPreview.fingerprints[key]}</p>}
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function AcademicIntakePage() {
  const [universities, , universityStatus] = useUniversityCatalogue()
  const [subjects, , subjectStatus] = usePersistentState<ModuleSubjectStore>(SUBJECTS_KEY, {})
  const [schedules, , scheduleStatus] = usePersistentState<ModuleScheduleStore>(SCHEDULE_KEY, {})
  const [curricula, , curriculaStatus] = usePersistentState<Record<string, CourseCurriculumSelection>>(CURRICULA_KEY, {})
  const [provenance, , provenanceStatus] = usePersistentState<ProvenanceStore>(PROVENANCE_KEY, {})
  const [assessmentSchemes, , assessmentStatus] = usePersistentState<AssessmentSchemeStore>(ASSESSMENT_SCHEMES_KEY, {})

  const [fileName, setFileName] = useState('')
  const [parseErrors, setParseErrors] = useState<string[]>([])
  const [pkg, setPkg] = useState<AcademicIntakePackage | null>(null)
  const [universityId, setUniversityId] = useState('')
  const [selectedYearIds, setSelectedYearIds] = useState<string[]>([])
  const [serverPreview, setServerPreview] = useState<ServerPreviewResult | null>(null)
  const [previewHash, setPreviewHash] = useState('')
  const [previewing, setPreviewing] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null)
  const [lastIdempotencyKey, setLastIdempotencyKey] = useState('')

  const loading = !universityStatus.hydrated || !subjectStatus.hydrated || !scheduleStatus.hydrated
    || !curriculaStatus.hydrated || !provenanceStatus.hydrated || !assessmentStatus.hydrated
  const error = stateError(universityStatus.error, subjectStatus.error, scheduleStatus.error, curriculaStatus.error, provenanceStatus.error, assessmentStatus.error)

  const currentDocuments = useMemo<CurrentAcademicDocuments>(() => ({
    universities,
    curricula,
    schedules,
    subjects,
    provenance,
    assessmentSchemes,
  }), [assessmentSchemes, curricula, provenance, schedules, subjects, universities])

  const staged = useMemo(() => (
    pkg && universityId
      ? buildStagedAcademicDocuments(pkg, currentDocuments, universityId, selectedYearIds)
      : null
  ), [currentDocuments, pkg, selectedYearIds, universityId])
  const selectedYearKey = selectedYearIds.join('|')

  useEffect(() => {
    setServerPreview(null)
    setPreviewHash('')
    setPublishResult(null)
    setRequestError('')
  }, [pkg?.id, selectedYearKey, universityId])

  const loadPackage = useCallback(async (file: File) => {
    setFileName(file.name)
    setParseErrors([])
    setPkg(null)
    setServerPreview(null)
    setPreviewHash('')
    setPublishResult(null)
    const text = await file.text()
    const parsed = parseAcademicIntakePackage(text)
    if (!parsed.ok || !parsed.package) {
      setParseErrors(parsed.errors)
      return
    }
    const options = packageUniversities(parsed.package)
    const first = options[0]
    setPkg(parsed.package)
    setUniversityId(first?.id ?? '')
    setSelectedYearIds(first?.years.map((year) => year.id) ?? [])
  }, [])

  async function previewOnServer() {
    if (!staged) return
    setPreviewing(true)
    setRequestError('')
    setPublishResult(null)
    try {
      const result = await apiPost<ServerPreviewResult>('/admin/academic/preview', { documents: staged.documents })
      setServerPreview(result)
      setPreviewHash(staged.fingerprint)
    } catch (err) {
      setRequestError(describeError(err))
      setServerPreview(null)
      setPreviewHash('')
    } finally {
      setPreviewing(false)
    }
  }

  async function publish() {
    if (!staged || !serverPreview || !hasExpectedVersions(serverPreview) || previewHash !== staged.fingerprint) return
    const key = idempotencyKey()
    setPublishing(true)
    setRequestError('')
    setLastIdempotencyKey(key)
    try {
      const result = await apiPost<PublishResult>('/admin/academic/publish', {
        documents: staged.documents,
        expectedVersions: serverPreview.versions,
        idempotencyKey: key,
      })
      setPublishResult(result)
    } catch (err) {
      setRequestError(describeError(err))
    } finally {
      setPublishing(false)
    }
  }

  const expectedVersionsReady = hasExpectedVersions(serverPreview)
  const previewIsCurrent = Boolean(staged && serverPreview?.ok && previewHash === staged.fingerprint)
  const blockingReasons = [
    ...(API_MODE ? [] : ['Live backend is not configured; preview/publish requires VITE_API_BASE.']),
    ...(staged?.blockingReasons ?? []),
    ...(serverPreview && !serverPreview.ok ? ['Server preview refused this staged batch.'] : []),
    ...(serverPreview && !expectedVersionsReady ? ['Server preview did not return expected versions for all six academic keys.'] : []),
    ...(serverPreview && !previewIsCurrent ? ['Staged documents changed after preview; preview again.'] : []),
  ]
  const publishDisabled = publishing || previewing || !staged || blockingReasons.length > 0 || !previewIsCurrent || !expectedVersionsReady

  return (
    <PageContainer>
      <PageHeader
        title="Academic Intake Workbench"
        description="Load a generated academic package, stage the selected university wave, preview it against live versions, then publish with an idempotent final action."
        actions={
          <>
            <ButtonLink to="/admin/academic" variant="ghost" iconLeft={ArrowLeft}>Academic setup</ButtonLink>
            <Button variant="secondary" iconLeft={PlayCircle} onClick={previewOnServer} disabled={!API_MODE || !staged || loading || staged.blockingReasons.length > 0 || previewing} loading={previewing}>Preview with server</Button>
            <Button variant="primary" iconLeft={CheckCircle2} disabled={publishDisabled} loading={publishing} onClick={publish}>Publish</Button>
          </>
        }
      />

      {error && (
        <Panel className="mb-4 border-danger/35 bg-danger-tint p-4 text-[13px] text-ink-2">
          The academic state could not be read safely ({error}). No preview or publish action is available until the read succeeds.
        </Panel>
      )}
      {requestError && (
        <Panel className="mb-4 border-danger/35 bg-danger-tint p-4 text-[13px] text-danger">
          {requestError}
        </Panel>
      )}

      <div className="mb-4 grid gap-4 xl:grid-cols-[22rem_1fr]">
        <div className="space-y-4">
          <FileDrop fileName={fileName} errors={parseErrors} onFile={loadPackage} />
          {pkg && (
            <WaveSelector
              pkg={pkg}
              universityId={universityId}
              selectedYearIds={selectedYearIds}
              setUniversityId={setUniversityId}
              setSelectedYearIds={setSelectedYearIds}
            />
          )}
          <Panel className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">One-time schedule migration</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">
              The package already contains every approved 2025 → 2026 clone. No date rule runs in the site or publish API. Materialized rows in this wave: <span className="tnum font-semibold text-ink">{staged?.summary.carriedForwardRows ?? 0}</span>.
            </p>
          </Panel>
        </div>

        {loading ? (
          <Panel>
            <EmptyState icon={GraduationCap} title="Reading academic state" description="The workbench waits for all six academic documents before staging a package." />
          </Panel>
        ) : !pkg || !staged ? (
          <Panel>
            <EmptyState icon={FileJson} title="Choose an intake package" description="Start with academic-intake-package.json generated by the package builder." />
          </Panel>
        ) : (
          <div className="min-w-0 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Metric label="Package modules" value={n(staged.summary.modules)} hint={`${staged.summary.selectedYearIds.join(', ')} for ${staged.summary.universityName}.`} icon={ListTree} />
              <Metric label="Subject nodes" value={n(staged.summary.subjects)} hint={`${n(countSubjectTree(subjects))} currently persisted before staging.`} icon={FolderLock} />
              <Metric label="Assessment schemes" value={n(staged.summary.assessmentSchemes)} hint={`${n(countAssessmentSchemes(assessmentSchemes))} currently persisted; staged as the sixth key.`} icon={Scale} />
              <Metric label="Source refs" value={n(staged.summary.sourceRefs)} hint={`${n(staged.summary.sourceFiles)} files represented by package snapshots.`} icon={ShieldCheck} />
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
              <DocumentDiff staged={staged} serverPreview={serverPreview} />
              <Panel className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">Backend gate</p>
                <div className="mt-3 space-y-2">
                  <Badge tone={serverPreview?.ok ? 'success' : 'neutral'} dot>preview {serverPreview?.ok ? 'accepted' : 'not accepted'}</Badge>
                  <Badge tone={expectedVersionsReady ? 'success' : 'warning'} dot>expected versions</Badge>
                  <Badge tone={(staged?.summary.carriedForwardRows ?? 0) > 0 ? 'warning' : 'neutral'} dot>{staged?.summary.carriedForwardRows ?? 0} carried rows</Badge>
                </div>
                {lastIdempotencyKey && (
                  <p className="mt-3 break-all font-mono text-[11px] text-ink-3">
                    last idempotency key: {lastIdempotencyKey}
                  </p>
                )}
              </Panel>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Panel className="overflow-hidden">
                <PanelHeader title="Publish blockers" hint={String(blockingReasons.length)} icon={AlertTriangle} />
                {blockingReasons.length === 0 ? (
                  <div className="flex items-center gap-2 p-4 text-[13px] text-success">
                    <Icon icon={CheckCircle2} size={16} />
                    No blockers. The final publish action will mint a fresh idempotency key.
                  </div>
                ) : (
                  <ul className="divide-y divide-line">
                    {blockingReasons.map((reason) => (
                      <li key={reason} className="flex gap-2 px-4 py-3 text-[12.8px] leading-relaxed text-ink-2">
                        <Icon icon={AlertTriangle} size={15} className="mt-0.5 shrink-0 text-danger" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>

              <Panel className="overflow-hidden">
                <PanelHeader title="Warnings and drafts" hint={String(staged.warnings.length)} icon={KeyRound} />
                {staged.warnings.length === 0 ? (
                  <div className="p-4 text-[13px] text-ink-2">No package warnings for this staged wave.</div>
                ) : (
                  <ul className="divide-y divide-line">
                    {staged.warnings.map((warning) => <li key={warning} className="px-4 py-3 text-[12.8px] text-ink-2">{warning}</li>)}
                  </ul>
                )}
              </Panel>
            </div>

            <MarkReconciliation rows={staged.markReconciliation} />

            {serverPreview && (
              <Panel className={cn('p-4', serverPreview.ok ? 'border-success/35 bg-success-tint' : 'border-danger/35 bg-danger-tint')}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-[18px] font-semibold text-ink">Server preview result</h3>
                    <p className="mt-1 text-[13px] text-ink-2">
                      {serverPreview.ok ? 'Preview accepted. Publish requires these expected versions and the same staged fingerprint.' : 'Preview refused. Resolve validation/protection errors before publishing.'}
                    </p>
                  </div>
                  <Badge tone={serverPreview.ok ? 'success' : 'danger'}>{serverPreview.changedKeys.length} changed keys</Badge>
                </div>
              </Panel>
            )}

            {publishResult && (
              <Panel className="border-success/35 bg-success-tint p-4">
                <h3 className="font-serif text-[18px] font-semibold text-ink">Published</h3>
                <p className="mt-1 text-[13px] text-ink-2">
                  Changed {publishResult.changedKeys.length} keys. Schedule rows were published exactly as previewed from the immutable package.
                </p>
              </Panel>
            )}

            <Panel className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-[18px] font-semibold text-ink">Safe publish contract</h3>
                  <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-ink-2">
                    The page stages six documents, preserves years outside the selected wave, rejects HU_Y1 mentions, keeps conflicts unpublished, calls `/api/admin/academic/preview`, and publishes only with returned expected versions.
                  </p>
                </div>
                <Link to="/admin/audit" className="text-[13px] font-semibold text-primary-strong hover:text-primary">Open audit trail</Link>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11.5px] text-ink-3">
                  <span>Preview readiness</span>
                  <span>{previewIsCurrent && expectedVersionsReady ? 'ready' : 'waiting'}</span>
                </div>
                <Meter value={previewIsCurrent && expectedVersionsReady ? 100 : serverPreview?.ok ? 65 : staged.blockingReasons.length ? 20 : 45} tone={previewIsCurrent && expectedVersionsReady ? 'success' : 'warning'} />
              </div>
            </Panel>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
