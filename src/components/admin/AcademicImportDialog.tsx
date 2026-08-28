import { useMemo, useState } from 'react'
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react'
import type { University, UniYear } from '@/data/universities'
import { universityYearId } from '@/data/universities'
import { parseAcademicOutline } from '@/data/academicImport'
import { moduleKey, type ModuleSubjectStore } from '@/data/moduleSubjects'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { overlayPortal } from '@/lib/overlayPortal'

const TEMPLATE = `# Year 1
## Term 1
- Foundations of Medicine [MED 01]
  - Anatomy (written EOM 20, written EOY 30, practical EOY 15)
    - Upper Limb
    - Embryology
  - Histology (written EOY 25)
- Cell & Molecular Biology [CEL 03]
  - Biochemistry
  - Physiology

# Year 2
## Term 1
- Cardiovascular System [CVS 01]
  - Anatomy
  - Physiology`

export function AcademicImportDialog({ open, university, onClose, onImport }: {
  open: boolean
  university: University
  onClose: () => void
  onImport: (years: UniYear[], subjects: ModuleSubjectStore) => void
}) {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'replace' | 'append'>('append')
  // The catalogue's own module IDs, so a shorthand like `101` in the outline
  // resolves onto the existing `101 ISK` instead of minting a rival module.
  const knownModuleIds = useMemo(
    () => university.years.flatMap((y) => y.courses.map((c) => c.moduleId).filter((id): id is string => Boolean(id))),
    [university],
  )
  const result = useMemo(
    () => (text.trim()
      ? parseAcademicOutline(text, { universityShort: university.short, knownModuleIds })
      : null),
    [text, university.short, knownModuleIds],
  )

  if (!open) return null

  const commit = () => {
    if (!result || result.years.length === 0) return

    /**
     * Subjects are keyed by the year they were parsed under, and appending can
     * rename a year to keep its ID unique. Re-key them alongside, or a renamed
     * year silently loses every subject tree the outline just described.
     */
    const rekey = (renames: Map<string, string>): ModuleSubjectStore => {
      const out: ModuleSubjectStore = {}
      for (const [key, subjects] of Object.entries(result.subjects)) {
        const [, yearId, courseId] = key.split(':')
        out[moduleKey(university.id, renames.get(yearId) ?? yearId, courseId)] = subjects
      }
      return out
    }

    if (mode === 'replace') {
      const renames = new Map(result.years.map((y) => [y.id, y.id]))
      onImport(result.years, rekey(renames))
      return
    }

    // Append: keep year labels unique so each year keeps a distinct year_ID.
    const taken = new Set(university.years.map((y) => y.year.toLowerCase()))
    const renames = new Map<string, string>()
    const deduped = result.years.map((y) => {
      if (!taken.has(y.year.toLowerCase())) {
        taken.add(y.year.toLowerCase())
        const id = universityYearId(university.short, y.year)
        renames.set(y.id, id)
        return { ...y, id }
      }
      let n = 2
      let label = `${y.year} (${n})`
      while (taken.has(label.toLowerCase())) { n++; label = `${y.year} (${n})` }
      taken.add(label.toLowerCase())
      const id = universityYearId(university.short, label)
      renames.set(y.id, id)
      return { ...y, id, year: label }
    })
    onImport([...university.years, ...deduped], rekey(renames))
  }

  return overlayPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="academic-import-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,720px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <div className="animate-pop max-h-[calc(100dvh-2rem)] overflow-hidden rounded-t-2xl border border-line bg-surface shadow-pop sm:rounded-xl">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={Upload} size={17} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="academic-import-title" className="font-serif text-[18px] font-semibold text-ink">Bulk import — {university.short} structure</h2>
              <p className="text-[12px] text-ink-3">Years, terms, modules, and the subjects inside them, from a markdown outline.</p>
            </div>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close"><Icon icon={X} size={18} /></button>
          </div>

          <div className="max-h-[62vh] space-y-4 overflow-y-auto p-5">
            <div className="rounded-lg border border-line bg-surface-2/40 p-3">
              <div className="mb-1.5 flex items-center gap-2 text-[12px] font-semibold text-ink-2"><Icon icon={FileText} size={14} />Format & steps</div>
              <ol className="ms-4 list-decimal space-y-0.5 text-[12px] text-ink-2">
                <li><code className="rounded bg-inset px-1"># Year name</code> starts a year (gets a unique year_ID automatically).</li>
                <li><code className="rounded bg-inset px-1">## Term name</code> starts a term inside that year.</li>
                <li><code className="rounded bg-inset px-1">- Module name [MOD 01]</code> adds a module. An <code>[ID]</code> already in this university is reused, so <code>[101]</code> lands on <code>101 ISK</code> rather than making a second module.</li>
                <li>Indent a <code className="rounded bg-inset px-1">- Subject</code> beneath a module to add it, and indent further to nest — as deep as the curriculum goes.</li>
                <li>A module's direct subjects may carry marks: <code className="rounded bg-inset px-1">- Anatomy (written EOM 20, practical EOY 15)</code>.</li>
              </ol>
              <button type="button" onClick={() => setText(TEMPLATE)} className="mt-2 text-[12px] font-medium text-primary-strong hover:text-primary">Load template ↓</button>
            </div>

            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder={TEMPLATE} className="font-mono text-[12.5px]" />

            {result && (
              <div className="rounded-lg border border-line p-3 text-[12.5px]">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-ink-2">
                  <span><span className="tnum font-mono font-semibold text-ink">{result.yearsAdded}</span> years</span>
                  <span><span className="tnum font-mono font-semibold text-ink">{result.terms}</span> terms</span>
                  <span><span className="tnum font-mono font-semibold text-ink">{result.modules}</span> modules</span>
                  <span><span className="tnum font-mono font-semibold text-ink">{result.subjectCount}</span> subjects</span>
                </div>
                {result.resolvedShorthand.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-[11.5px] text-ink-2">
                    {result.resolvedShorthand.map((r) => (
                      <li key={r.wrote}>• <code className="rounded bg-inset px-1">{r.wrote}</code> matched the existing module <code className="rounded bg-inset px-1">{r.resolvedTo}</code>.</li>
                    ))}
                  </ul>
                )}
                {result.errors.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-[11.5px] text-danger">{result.errors.map((e, i) => <li key={i}>• {e}</li>)}</ul>
                )}
                {result.errors.length === 0 && result.modules > 0 && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-success"><Icon icon={CheckCircle2} size={13} />Ready to import.</p>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium text-ink-3">On import</span>
              {(['append', 'replace'] as const).map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full border px-3 py-1 text-[12px] ${mode === m ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2'}`}>
                  {m === 'append' ? 'Add to existing years' : 'Replace all years'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" disabled={!result || result.modules === 0 || result.errors.length > 0} onClick={commit}>Import {result?.modules ?? 0} modules</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
