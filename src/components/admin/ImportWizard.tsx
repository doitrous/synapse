import { useMemo, useRef, useState } from 'react'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, FileSpreadsheet, FileText, Loader2, RotateCcw, Upload, XCircle } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { cn } from '@/lib/cn'

export interface ImportField { key: string; label: string; required?: boolean; help?: string }

export interface ImportWizardProps {
  title: string
  description?: string
  noun: string
  fields: ImportField[]
  markdownExample?: string
  /** Column-header → field-key aliases used to guess the mapping. */
  aliases?: Record<string, string>
  /** Validate one mapped row → list of error messages (empty = valid). */
  validateRow: (values: Record<string, string>) => string[]
  /** A short label for the preview table's second column (e.g. subject/system). */
  previewSecondary?: { header: string; get: (values: Record<string, string>) => string }
  /** Commit the valid rows. Returns a batch report. */
  commit: (rows: Array<Record<string, string>>) => { imported: number; failed: number; errors: string[] }
  backTo: string
  backLabel: string
  /** Optional extra control rendered on step 0 (e.g. a target university selector). */
  contextControl?: React.ReactNode
}

interface SourceSheet { name: string; headers: string[]; rows: string[][] }
interface MappedRow { index: number; values: Record<string, string>; errors: string[]; rowKey: string }

const IGNORE = '__ignore__'
const steps = ['Choose a file', 'Confirm worksheet', 'Map columns', 'Full preview', 'Skipped rows', 'Import options']

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}
function cellText(value: unknown) {
  if (value instanceof Date) return value.toISOString()
  return value == null ? '' : String(value)
}
function parseCsv(text: string) {
  const records: string[][] = []
  let row: string[] = []; let value = ''; let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '"') { if (quoted && text[i + 1] === '"') { value += '"'; i++ } else quoted = !quoted }
    else if (c === ',' && !quoted) { row.push(value.trim()); value = '' }
    else if ((c === '\n' || c === '\r') && !quoted) { if (c === '\r' && text[i + 1] === '\n') i++; row.push(value.trim()); value = ''; if (row.some((x) => x !== '')) records.push(row); row = [] }
    else value += c
  }
  row.push(value.trim())
  if (row.some((x) => x !== '')) records.push(row)
  return records
}
function parseMarkdown(text: string): SourceSheet {
  const docs = text.split(/^\s*---\s*$/m).map((p) => p.trim()).filter(Boolean)
  const objects = docs.map((doc) => {
    const result: Record<string, string> = {}
    const h1 = doc.match(/^#\s+(.+)$/m)?.[1]?.trim()
    const matcher = /^##\s+(.+)\s*\n([\s\S]*?)(?=^##\s+|$)/gm
    let m: RegExpExecArray | null
    while ((m = matcher.exec(doc))) result[normalize(m[1])] = m[2].trim()
    if (h1 && normalize(h1) !== 'item' && !result.title) result.title = h1
    return result
  })
  const headers = [...new Set(objects.flatMap((o) => Object.keys(o)))]
  return { name: 'Markdown items', headers, rows: objects.map((o) => headers.map((h) => o[h] ?? '')) }
}

/** A generic, schema-driven bulk-import wizard shared across admin catalogues. */
export function ImportWizard(props: ImportWizardProps) {
  const { fields, aliases = {}, validateRow, commit } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [sheets, setSheets] = useState<SourceSheet[]>([])
  const [sheetName, setSheetName] = useState('')
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [parseError, setParseError] = useState('')
  const [loading, setLoading] = useState(false)
  const [includeInvalid, setIncludeInvalid] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [importResult, setImportResult] = useState<{ imported: number; failed: number; errors: string[] } | null>(null)

  const sheet = sheets.find((c) => c.name === sheetName) ?? sheets[0]
  const guess = (header: string) => {
    const n = normalize(header)
    const g = aliases[n] ?? n
    return fields.some((f) => f.key === g) ? g : IGNORE
  }

  const mappedRows = useMemo<MappedRow[]>(() => {
    if (!sheet) return []
    return sheet.rows.map((row, index) => {
      const values = Object.fromEntries(fields.map((f) => [f.key, ''])) as Record<string, string>
      sheet.headers.forEach((header, col) => { const t = mapping[header]; if (t && t !== IGNORE) values[t] = row[col] ?? '' })
      return { index: index + 2, values, errors: validateRow(values), rowKey: `${sheet.name}:${index + 2}` }
    })
  }, [sheet, mapping, fields, validateRow])

  const skippedRows = useMemo(() => mappedRows.filter((r) => r.errors.length > 0 && !includeInvalid), [mappedRows, includeInvalid])

  async function loadFile(next: File) {
    setLoading(true); setParseError(''); setImportResult(null)
    try {
      const ext = next.name.split('.').pop()?.toLowerCase()
      let nextSheets: SourceSheet[]
      if (ext === 'csv') { const recs = parseCsv(await next.text()); nextSheets = recs.length ? [{ name: 'CSV data', headers: recs[0].map(cellText), rows: recs.slice(1).map((r) => r.map(cellText)) }] : [] }
      else if (ext === 'md' || ext === 'markdown') nextSheets = [parseMarkdown(await next.text())]
      else if (ext === 'xlsx') { const { default: readXlsxFile } = await import('read-excel-file/browser'); const wb = await readXlsxFile(next); nextSheets = wb.map((s) => ({ name: s.sheet, headers: (s.data[0] ?? []).map(cellText), rows: s.data.slice(1).map((r) => r.map(cellText)) })) }
      else throw new Error('Unsupported file. Choose .xlsx, .csv, .md, or .markdown.')
      nextSheets = nextSheets.filter((c) => c.headers.length > 0)
      if (!nextSheets.length) throw new Error('No header row and data rows were detected in this file.')
      setFile(next); setSheets(nextSheets); setSheetName(nextSheets[0].name); setStep(1)
    } catch (e) { setParseError(e instanceof Error ? e.message : 'The file could not be read.') }
    finally { setLoading(false) }
  }
  function confirmSheet() { if (!sheet) return; setMapping(Object.fromEntries(sheet.headers.map((h) => [h, guess(h)]))); setStep(2) }

  async function runImport() {
    if (!confirmed) return
    setImporting(true); setProgress(0)
    const valid = mappedRows.filter((r) => includeInvalid || r.errors.length === 0)
    await new Promise<void>((res) => requestAnimationFrame(() => res()))
    setProgress(60)
    const report = commit(valid.map((r) => r.values))
    setProgress(100)
    setImportResult(report)
    setImporting(false)
  }
  function reset() { setStep(0); setFile(null); setSheets([]); setSheetName(''); setMapping({}); setParseError(''); setConfirmed(false); setImportResult(null); setProgress(0) }

  return (
    <PageContainer className="max-w-[88rem]">
      <PageHeader title={props.title} description={props.description} actions={<ButtonLink to={props.backTo} variant="secondary" iconLeft={ArrowLeft}>{props.backLabel}</ButtonLink>} />

      <Panel className="mb-4 overflow-hidden">
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 xl:grid-cols-6">{steps.map((label, index) => <button key={label} type="button" disabled={index > step || importing} onClick={() => index <= step && setStep(index)} className={cn('flex min-h-16 items-center gap-2 bg-surface px-3 py-2 text-start', index === step && 'bg-primary-tint/55', index < step && 'text-ink', index > step && 'text-ink-3')}><span className={cn('grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px]', index < step ? 'border-success bg-success text-on-success' : index === step ? 'border-primary bg-primary text-on-primary' : 'border-line-2')}>{index < step ? <Check size={12} /> : index + 1}</span><span className="text-[11.5px] font-semibold leading-tight">{label}</span></button>)}</div>
      </Panel>

      {step === 0 && <div className="grid gap-4 xl:grid-cols-[1fr_25rem]">
        <div className="space-y-4">
          {props.contextControl}
          <Panel className="p-5 sm:p-8"><button type="button" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) void loadFile(f) }} className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-line-2 bg-surface-2/40 px-5 text-center transition-colors hover:border-primary hover:bg-primary-tint/25"><span className="grid size-12 place-items-center rounded-xl bg-primary-tint text-primary"><Icon icon={loading ? Loader2 : Upload} size={23} className={loading ? 'animate-spin' : ''} /></span><strong className="mt-4 text-[16px] text-ink">Choose a file or drop it here</strong><span className="mt-1 text-[12.5px] text-ink-3">.xlsx, .csv, .md, or .markdown</span><span className="mt-4 rounded-md border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink">Browse files</span></button><input ref={inputRef} type="file" accept=".xlsx,.csv,.md,.markdown" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) void loadFile(f) }} />{parseError && <div role="alert" className="mt-4 flex gap-2 rounded-lg border border-danger/30 bg-danger-tint p-3 text-[12.5px] text-danger"><Icon icon={XCircle} size={16} className="shrink-0" />{parseError}</div>}</Panel>
        </div>
        <Panel className="overflow-hidden"><PanelHeader title="Columns & format" icon={FileText} /><div className="p-4"><p className="text-[12.5px] leading-relaxed text-ink-2">A spreadsheet/CSV header row maps to these fields (required marked *):</p><ul className="mt-2 space-y-1">{fields.map((f) => <li key={f.key} className="text-[11.5px] text-ink-2"><span className="font-mono text-primary-strong">{f.key}</span>{f.required && <span className="text-danger"> *</span>} — {f.label}</li>)}</ul>{props.markdownExample && <><p className="mt-3 text-[11.5px] font-semibold text-ink-2">Markdown alternative</p><pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-inset p-3 font-mono text-[10.5px] leading-relaxed text-ink-2">{props.markdownExample}</pre></>}</div></Panel>
      </div>}

      {step === 1 && sheet && <Panel className="overflow-hidden"><PanelHeader title="Confirm the worksheet" icon={FileSpreadsheet} hint={file?.name} /><div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[20rem_1fr]"><div><label className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Worksheet</label><Select value={sheetName} onChange={(e) => setSheetName(e.target.value)}>{sheets.map((c) => <option key={c.name}>{c.name}</option>)}</Select><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-lg border border-line bg-surface-2 p-3"><p className="font-mono text-[23px] font-semibold text-ink">{sheet.rows.length}</p><p className="text-[11.5px] text-ink-3">rows detected</p></div><div className="rounded-lg border border-line bg-surface-2 p-3"><p className="font-mono text-[23px] font-semibold text-ink">{sheet.headers.length}</p><p className="text-[11.5px] text-ink-3">columns detected</p></div></div></div><div className="min-w-0 overflow-x-auto rounded-lg border border-line"><table className="w-full text-[12px]"><thead><tr>{sheet.headers.map((h) => <th key={h} className="whitespace-nowrap border-b border-line bg-surface-2 px-3 py-2 text-start font-semibold text-ink">{h || 'Untitled column'}</th>)}</tr></thead><tbody>{sheet.rows.slice(0, 4).map((row, i) => <tr key={i}>{sheet.headers.map((h, col) => <td key={`${h}-${col}`} className="max-w-56 truncate border-b border-line px-3 py-2 text-ink-2 last:border-b-0">{row[col] || '—'}</td>)}</tr>)}</tbody></table></div></div><div className="flex justify-end border-t border-line px-4 py-3"><Button variant="primary" iconRight={ArrowRight} onClick={confirmSheet}>Confirm worksheet</Button></div></Panel>}

      {step === 2 && sheet && <Panel className="overflow-hidden"><PanelHeader title="Map and inspect every uploaded column" hint={`${sheet.headers.length} source columns`} /><div className="divide-y divide-line">{sheet.headers.map((header, col) => { const mapped = fields.find((f) => f.key === mapping[header]); return <div key={`${header}-${col}`} className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(10rem,0.7fr)_1.2rem_minmax(13rem,1fr)] sm:items-center"><div><p className="font-mono text-[12px] font-semibold text-ink">{header || `Column ${col + 1}`}</p><p className="mt-0.5 truncate text-[11px] text-ink-3">Example: {sheet.rows[0]?.[col] || 'blank'}</p></div><ArrowRight size={14} className="hidden text-ink-3 sm:block" /><div><Select value={mapping[header] ?? IGNORE} onChange={(e) => setMapping((cur) => ({ ...cur, [header]: e.target.value }))}><option value={IGNORE}>Ignore this column</option>{fields.map((f) => <option key={f.key} value={f.key}>{f.label}{f.required ? ' *' : ''}</option>)}</Select>{mapped?.help && <p className="mt-1 text-[11px] text-ink-3">{mapped.help}</p>}</div></div> })}</div><div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3"><p className="text-[11.5px] text-ink-3">Required destinations are marked with *.</p><Button variant="primary" iconRight={ArrowRight} onClick={() => setStep(3)} disabled={mappedRows.length === 0}>Preview all rows</Button></div></Panel>}

      {step === 3 && <Panel className="overflow-hidden"><PanelHeader title="Full import preview" hint={`${mappedRows.length} rows`} action={<Badge tone={mappedRows.some((r) => r.errors.length) ? 'warning' : 'success'}>{mappedRows.filter((r) => r.errors.length).length} invalid</Badge>} /><div className="max-h-[38rem] overflow-auto"><table className="w-full min-w-[40rem] text-[12px]"><thead className="sticky top-0 z-10"><tr><th className="border-b border-line bg-surface-2 px-3 py-2 text-start">Row</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-start">Title</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-start">{props.previewSecondary?.header ?? 'Detail'}</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-start">Validation</th></tr></thead><tbody>{mappedRows.map((r) => <tr key={r.rowKey} className={r.errors.length ? 'bg-warning-tint/25' : ''}><td className="border-b border-line px-3 py-2 font-mono text-ink-3">{r.index}</td><td className="max-w-md border-b border-line px-3 py-2 font-medium text-ink">{r.values.title || r.values.label || r.values.module || r.values.name || 'Untitled'}</td><td className="border-b border-line px-3 py-2 text-ink-2">{props.previewSecondary?.get(r.values) || '—'}</td><td className="border-b border-line px-3 py-2">{r.errors.length ? <span className="text-warning">{r.errors.join(' · ')}</span> : <span className="inline-flex items-center gap-1 text-success"><CheckCircle2 size={13} /> Ready</span>}</td></tr>)}</tbody></table></div><div className="flex justify-end border-t border-line px-4 py-3"><Button variant="primary" iconRight={ArrowRight} onClick={() => setStep(4)}>Inspect skipped rows</Button></div></Panel>}

      {step === 4 && <Panel className="overflow-hidden"><PanelHeader title="Rows that will be skipped" icon={AlertTriangle} hint={`${skippedRows.length} rows`} /><div className="divide-y divide-line">{skippedRows.map((r) => <div key={r.rowKey} className="grid gap-1 px-4 py-3 sm:grid-cols-[5rem_1fr]"><span className="font-mono text-[11px] text-ink-3">Row {r.index}</span><div><p className="text-[12.5px] font-semibold text-ink">{r.values.title || r.values.label || r.values.module || 'Untitled row'}</p><p className="mt-0.5 text-[11.5px] leading-relaxed text-warning">{r.errors.join(' · ')}</p></div></div>)}{skippedRows.length === 0 && <div className="px-5 py-12 text-center"><CheckCircle2 size={24} className="mx-auto text-success" /><p className="mt-2 text-[13px] font-semibold text-ink">No rows will be skipped</p></div>}</div><div className="flex justify-end border-t border-line px-4 py-3"><Button variant="primary" iconRight={ArrowRight} onClick={() => setStep(5)}>Choose import options</Button></div></Panel>}

      {step === 5 && <div className="grid gap-4 xl:grid-cols-[1fr_24rem]">
        <Panel className="overflow-hidden"><PanelHeader title="Import options and submit" /><div className="space-y-4 p-4 sm:p-5"><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface p-3"><input type="checkbox" className="mt-0.5" checked={includeInvalid} onChange={(e) => setIncludeInvalid(e.target.checked)} /><span><strong className="block text-[13px] text-ink">Import invalid rows too</strong><span className="mt-0.5 block text-[11.5px] leading-relaxed text-ink-3">Include rows with validation errors instead of skipping them.</span></span></label><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-primary-line bg-primary-tint/35 p-4"><input type="checkbox" className="mt-0.5" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} /><span className="text-[12.5px] font-medium leading-relaxed text-ink">I reviewed all mappings, all preview rows, all visible errors, and the skipped-row list.</span></label>{importing && <div><div className="mb-2 flex items-center justify-between text-[12px]"><span className="inline-flex items-center gap-2 text-ink-2"><Loader2 size={14} className="animate-spin" />Importing</span><span className="font-mono text-ink">{progress}%</span></div><Meter value={progress} tone="primary" /></div>}{importResult && <div className={cn('rounded-lg border p-4', importResult.failed ? 'border-warning/35 bg-warning-tint/40' : 'border-success/30 bg-success-tint/50')}><p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><Icon icon={importResult.failed ? AlertTriangle : CheckCircle2} size={16} className={importResult.failed ? 'text-warning' : 'text-success'} />{importResult.imported} imported · {importResult.failed} failed</p>{importResult.errors.length > 0 && <ul className="mt-2 space-y-1 text-[11.5px] text-warning">{importResult.errors.map((error) => <li key={error}>{error}</li>)}</ul>}</div>}<div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-between"><Button variant="ghost" iconLeft={RotateCcw} onClick={reset} disabled={importing}>Start over</Button><Button variant="primary" iconLeft={Upload} onClick={() => void runImport()} disabled={!confirmed || importing || Boolean(importResult)} loading={importing}>Import {mappedRows.length - skippedRows.length} rows</Button></div></div></Panel>
        <Panel className="h-fit overflow-hidden"><PanelHeader title="Import summary" /><dl className="divide-y divide-line px-4"><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">File</dt><dd className="max-w-48 truncate text-[12px] font-medium text-ink">{file?.name}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Rows detected</dt><dd className="font-mono text-[12px] text-ink">{mappedRows.length}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Will skip</dt><dd className="font-mono text-[12px] text-warning">{skippedRows.length}</dd></div></dl></Panel>
      </div>}
    </PageContainer>
  )
}
