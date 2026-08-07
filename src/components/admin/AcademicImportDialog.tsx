import { useMemo, useState } from 'react'
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react'
import type { University, UniYear, CurriculumCourse } from '@/data/universities'
import { defaultModuleId } from '@/data/universities'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'

const TEMPLATE = `# Year 1
## Term 1
- Foundations of Medicine [MED 01]
- Anatomy & Physiology [ANA 02]
## Term 2
- Cell & Molecular Biology [CEL 03]

# Year 2
## Term 1
- Cardiovascular System [CVS 01]
- Respiratory System [RES 02]
## Term 2
- Renal & Urinary [REN 03]`

interface ParseResult {
  years: UniYear[]
  yearsAdded: number
  terms: number
  modules: number
  errors: string[]
}

/**
 * Parse an academic-structure markdown outline:
 *   # Year          → a year
 *   ## Term         → a term inside the current year
 *   - Module [ID]   → a module inside the current term (ID optional)
 * Module IDs are made unique across the whole university; a missing ID is
 * auto-generated as CODE NN from the module name.
 */
function parse(md: string): ParseResult {
  const errors: string[] = []
  const years: UniYear[] = []
  const takenIds = new Set<string>()
  let curYear: UniYear | null = null
  let curTerm: string | null = null
  let terms = 0
  let modules = 0
  let seq = 0

  const uniqueId = (base: string): string => {
    let candidate = base
    let n = 2
    while (takenIds.has(candidate.toUpperCase())) { candidate = `${base}-${n}`; n++ }
    takenIds.add(candidate.toUpperCase())
    return candidate
  }

  md.split('\n').forEach((raw, idx) => {
    const line = raw.trim()
    if (!line) return
    if (line.startsWith('## ')) {
      if (!curYear) { errors.push(`Line ${idx + 1}: term "${line.slice(3)}" has no year above it.`); return }
      curTerm = line.slice(3).trim()
      curYear.terms = [...(curYear.terms ?? []), curTerm]
      terms++
    } else if (line.startsWith('# ')) {
      curYear = { year: line.slice(2).trim(), students: 0, courses: [], terms: [] }
      years.push(curYear)
      curTerm = null
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!curYear) { errors.push(`Line ${idx + 1}: module "${line.slice(2)}" has no year.`); return }
      const term = curTerm ?? 'Term 1'
      if (!curYear.terms?.includes(term)) curYear.terms = [...(curYear.terms ?? []), term]
      const body = line.slice(2).trim()
      const m = body.match(/^(.*?)\s*\[([^\]]+)\]\s*$/)
      const name = (m ? m[1] : body).trim()
      if (!name) { errors.push(`Line ${idx + 1}: empty module name.`); return }
      seq++
      const moduleId = uniqueId((m ? m[2] : defaultModuleId(name, seq)).trim())
      const course: CurriculumCourse = { id: `imp-${Date.now()}-${seq}`, name, block: term, moduleId, term }
      curYear.courses.push(course)
      modules++
    } else {
      errors.push(`Line ${idx + 1}: unrecognised "${line}". Use # Year, ## Term, or - Module [ID].`)
    }
  })

  return { years, yearsAdded: years.length, terms, modules, errors }
}

export function AcademicImportDialog({ open, university, onClose, onImport }: {
  open: boolean
  university: University
  onClose: () => void
  onImport: (years: UniYear[]) => void
}) {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'replace' | 'append'>('append')
  const result = useMemo(() => (text.trim() ? parse(text) : null), [text])

  if (!open) return null

  const commit = () => {
    if (!result || result.years.length === 0) return
    if (mode === 'replace') { onImport(result.years); return }
    // Append: keep year labels unique so each year keeps a distinct year_ID.
    const taken = new Set(university.years.map((y) => y.year.toLowerCase()))
    const deduped = result.years.map((y) => {
      if (!taken.has(y.year.toLowerCase())) { taken.add(y.year.toLowerCase()); return y }
      let n = 2
      let label = `${y.year} (${n})`
      while (taken.has(label.toLowerCase())) { n++; label = `${y.year} (${n})` }
      taken.add(label.toLowerCase())
      return { ...y, year: label }
    })
    onImport([...university.years, ...deduped])
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="academic-import-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,720px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <div className="animate-pop max-h-[calc(100dvh-2rem)] overflow-hidden rounded-t-2xl border border-line bg-surface shadow-pop sm:rounded-xl">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={Upload} size={17} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="academic-import-title" className="font-serif text-[18px] font-semibold text-ink">Bulk import — {university.short} structure</h2>
              <p className="text-[12px] text-ink-3">Years, terms, and modules from a markdown outline.</p>
            </div>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close"><Icon icon={X} size={18} /></button>
          </div>

          <div className="max-h-[62vh] space-y-4 overflow-y-auto p-5">
            <div className="rounded-lg border border-line bg-surface-2/40 p-3">
              <div className="mb-1.5 flex items-center gap-2 text-[12px] font-semibold text-ink-2"><Icon icon={FileText} size={14} />Format & steps</div>
              <ol className="ms-4 list-decimal space-y-0.5 text-[12px] text-ink-2">
                <li><code className="rounded bg-inset px-1"># Year name</code> starts a year (gets a unique year_ID automatically).</li>
                <li><code className="rounded bg-inset px-1">## Term name</code> starts a term inside that year.</li>
                <li><code className="rounded bg-inset px-1">- Module name [MOD 01]</code> adds a module; the <code>[ID]</code> is optional and is made unique.</li>
              </ol>
              <button type="button" onClick={() => setText(TEMPLATE)} className="mt-2 text-[12px] font-medium text-accent-strong hover:text-accent">Load template ↓</button>
            </div>

            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder={TEMPLATE} className="font-mono text-[12.5px]" />

            {result && (
              <div className="rounded-lg border border-line p-3 text-[12.5px]">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-ink-2">
                  <span><span className="tnum font-mono font-semibold text-ink">{result.yearsAdded}</span> years</span>
                  <span><span className="tnum font-mono font-semibold text-ink">{result.terms}</span> terms</span>
                  <span><span className="tnum font-mono font-semibold text-ink">{result.modules}</span> modules</span>
                </div>
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
                <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full border px-3 py-1 text-[12px] ${mode === m ? 'border-accent-line bg-accent-tint text-accent-strong' : 'border-line bg-surface text-ink-2'}`}>
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
