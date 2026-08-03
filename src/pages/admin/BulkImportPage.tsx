import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, FileSpreadsheet, FileText, Loader2, RotateCcw, Upload, XCircle } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { usePersistentState } from '@/lib/usePersistentState'
import { cn } from '@/lib/cn'
import { CONTENT_KIND_LABEL, CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ContentKind, type ManagedContentItem } from '@/data/contentControl'
import { IMPORT_SCHEMAS, importRowToContent, validateImportRow } from '@/data/bulkImport'

interface SourceSheet { name: string; headers: string[]; rows: string[][] }
interface ImportJournal { fingerprint: string; rowKeys: string[]; imported: number; failed: number; updatedAt: string }
interface MappedRow { index: number; values: Record<string, string>; errors: string[]; rowKey: string }

const IGNORE = '__ignore__'
const steps = ['Choose a file', 'Confirm worksheet', 'Map columns', 'Full preview', 'Skipped rows', 'Import options']
const routeFor: Record<ContentKind, string> = { question: 'questions', article: 'library', practical: 'practical', resource: 'resources' }

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

function guessMapping(header: string, kind: ContentKind) {
  const normalized = normalize(header)
  const aliases: Record<string, string> = { stem: 'question', question_text: 'question', correct: 'correct_answer', answer: 'correct_answer', university: 'universities', year: 'years', reading_minutes: 'reading_time', traps: 'lose_the_mark', mark_scheme_items: 'mark_scheme' }
  const guessed = aliases[normalized] ?? normalized
  return IMPORT_SCHEMAS[kind].fields.some((field) => field.key === guessed) ? guessed : IGNORE
}

function parseCsv(text: string) {
  const records: string[][] = []
  let row: string[] = []
  let value = ''
  let quoted = false
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (char === '"') {
      if (quoted && text[index + 1] === '"') { value += '"'; index++ } else quoted = !quoted
    } else if (char === ',' && !quoted) { row.push(value.trim()); value = '' }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[index + 1] === '\n') index++
      row.push(value.trim()); value = ''
      if (row.some((cell) => cell !== '')) records.push(row)
      row = []
    } else value += char
  }
  row.push(value.trim())
  if (row.some((cell) => cell !== '')) records.push(row)
  return records
}

function parseMarkdown(text: string): SourceSheet {
  const documents = text.split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean)
  const objects = documents.map((document) => {
    const result: Record<string, string> = {}
    const h1 = document.match(/^#\s+(.+)$/m)?.[1]?.trim()
    const matcher = /^##\s+(.+)\s*\n([\s\S]*?)(?=^##\s+|$)/gm
    let match: RegExpExecArray | null
    while ((match = matcher.exec(document))) result[normalize(match[1])] = match[2].trim()
    if (h1 && normalize(h1) !== 'item' && !result.title) result.title = h1
    return result
  })
  const headers = [...new Set(objects.flatMap((object) => Object.keys(object)))]
  return { name: 'Markdown items', headers, rows: objects.map((object) => headers.map((header) => object[header] ?? '')) }
}

function cellText(value: unknown) {
  if (value instanceof Date) return value.toISOString()
  return value == null ? '' : String(value)
}

function fingerprint(file: File, kind: ContentKind) {
  return `${kind}:${file.name}:${file.size}:${file.lastModified}`
}

function mergeImported(existing: ManagedContentItem, imported: ManagedContentItem, overrideEmpty: boolean) {
  if (overrideEmpty) return imported
  const fields = { ...existing.fields }
  Object.entries(imported.fields).forEach(([key, value]) => { if (value.trim()) fields[key] = value })
  return { ...existing, ...imported, title: imported.title || existing.title, subjectId: imported.subjectId || existing.subjectId, fields }
}

export function BulkImportPage() {
  const params = useParams()
  const kind: ContentKind = ['question', 'article', 'practical', 'resource'].includes(params.kind ?? '') ? params.kind as ContentKind : 'question'
  const schema = IMPORT_SCHEMAS[kind]
  const inputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [sheets, setSheets] = useState<SourceSheet[]>([])
  const [sheetName, setSheetName] = useState('')
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [parseError, setParseError] = useState('')
  const [loading, setLoading] = useState(false)
  const [includeInvalid, setIncludeInvalid] = useState(false)
  const [mergeMode, setMergeMode] = useState<'create' | 'update'>('update')
  const [overrideEmpty, setOverrideEmpty] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [importResult, setImportResult] = useState<{ imported: number; failed: number; errors: string[] } | null>(null)
  const [items, setItems] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [journal, setJournal] = usePersistentState<ImportJournal[]>('osler-import-journal-v1', [])

  const sheet = sheets.find((candidate) => candidate.name === sheetName) ?? sheets[0]
  const fileFingerprint = file ? fingerprint(file, kind) : ''
  const importedKeys = useMemo(() => new Set(journal.find((entry) => entry.fingerprint === fileFingerprint)?.rowKeys ?? []), [fileFingerprint, journal])
  const mappedRows = useMemo<MappedRow[]>(() => {
    if (!sheet) return []
    return sheet.rows.map((row, index) => {
      const values = Object.fromEntries(schema.fields.map((field) => [field.key, ''])) as Record<string, string>
      sheet.headers.forEach((header, columnIndex) => {
        const target = mapping[header]
        if (target && target !== IGNORE) values[target] = row[columnIndex] ?? ''
      })
      const rowKey = `${fileFingerprint}:${sheet.name}:${index + 2}`
      return { index: index + 2, values, errors: validateImportRow(kind, values), rowKey }
    })
  }, [fileFingerprint, kind, mapping, schema.fields, sheet])

  const skippedRows = useMemo(() => mappedRows.map((row) => {
    const duplicate = importedKeys.has(row.rowKey)
    const existing = row.values.id && items.some((item) => item.id === row.values.id)
    const reasons = [...row.errors]
    if (duplicate) reasons.push('Already imported in this file run')
    if (mergeMode === 'create' && existing) reasons.push('Canonical ID already exists')
    return { ...row, reasons }
  }).filter((row) => row.reasons.length > 0 && (!includeInvalid || row.reasons.some((reason) => /already imported|already exists/i.test(reason)))), [importedKeys, includeInvalid, items, mappedRows, mergeMode])

  async function loadFile(nextFile: File) {
    setLoading(true)
    setParseError('')
    setImportResult(null)
    try {
      const extension = nextFile.name.split('.').pop()?.toLowerCase()
      let nextSheets: SourceSheet[]
      if (extension === 'csv') {
        const records = parseCsv(await nextFile.text())
        nextSheets = records.length ? [{ name: 'CSV data', headers: records[0].map(cellText), rows: records.slice(1).map((row) => row.map(cellText)) }] : []
      } else if (extension === 'md' || extension === 'markdown') nextSheets = [parseMarkdown(await nextFile.text())]
      else if (extension === 'xlsx') {
        const { default: readXlsxFile } = await import('read-excel-file/browser')
        const workbook = await readXlsxFile(nextFile)
        nextSheets = workbook.map((workbookSheet) => ({ name: workbookSheet.sheet, headers: (workbookSheet.data[0] ?? []).map(cellText), rows: workbookSheet.data.slice(1).map((row) => row.map(cellText)) }))
      } else throw new Error('Unsupported file. Choose .xlsx, .csv, .md, or .markdown. Save legacy .xls files as .xlsx or .csv first.')
      nextSheets = nextSheets.filter((candidate) => candidate.headers.length > 0)
      if (!nextSheets.length) throw new Error('No header row and data rows were detected in this file.')
      setFile(nextFile)
      setSheets(nextSheets)
      setSheetName(nextSheets[0].name)
      setStep(1)
    } catch (error) {
      setParseError(error instanceof Error ? error.message : 'The file could not be read.')
    } finally { setLoading(false) }
  }

  function confirmSheet() {
    if (!sheet) return
    setMapping(Object.fromEntries(sheet.headers.map((header) => [header, guessMapping(header, kind)])))
    setStep(2)
  }

  async function runImport() {
    if (!confirmed) return
    setImporting(true)
    setProgress(0)
    const permanentSkips = new Set(skippedRows.map((row) => row.rowKey))
    const candidates = mappedRows.filter((row) => !importedKeys.has(row.rowKey) && !permanentSkips.has(row.rowKey) && (includeInvalid || row.errors.length === 0))
    const errors: string[] = []
    let imported = 0
    const completedKeys: string[] = []
    const batchSize = 25
    for (let start = 0; start < candidates.length; start += batchSize) {
      const batch = candidates.slice(start, start + batchSize)
      const converted: ManagedContentItem[] = []
      for (const row of batch) {
        try { converted.push(importRowToContent(kind, row.values, row.rowKey)); completedKeys.push(row.rowKey); imported++ }
        catch (error) { errors.push(`Row ${row.index}: ${error instanceof Error ? error.message : 'Import failed'}`) }
      }
      setItems((current) => {
        let next = [...current]
        converted.forEach((incoming) => {
          const index = next.findIndex((item) => item.id === incoming.id)
          if (index >= 0 && mergeMode === 'update') next[index] = mergeImported(next[index], incoming, overrideEmpty)
          else if (index < 0) next.unshift(incoming)
        })
        return next
      })
      setProgress(Math.round((Math.min(start + batchSize, candidates.length) / Math.max(1, candidates.length)) * 100))
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    }
    setJournal((current) => {
      const existing = current.find((entry) => entry.fingerprint === fileFingerprint)
      const entry: ImportJournal = { fingerprint: fileFingerprint, rowKeys: [...new Set([...(existing?.rowKeys ?? []), ...completedKeys])], imported: (existing?.imported ?? 0) + imported, failed: (existing?.failed ?? 0) + errors.length, updatedAt: new Date().toISOString() }
      return existing ? current.map((item) => item.fingerprint === fileFingerprint ? entry : item) : [entry, ...current]
    })
    setImportResult({ imported, failed: errors.length, errors })
    setProgress(100)
    setImporting(false)
  }

  function reset() {
    setStep(0); setFile(null); setSheets([]); setSheetName(''); setMapping({}); setParseError(''); setConfirmed(false); setImportResult(null); setProgress(0)
  }

  return (
    <PageContainer className="max-w-[88rem]">
      <PageHeader title={`Bulk import ${schema.noun}`} description="Open a spreadsheet, CSV, or Codex-authored Markdown file; inspect every mapping and row before committing resumable batches." actions={<Link to={`/admin/${routeFor[kind]}`}><Button variant="secondary" iconLeft={ArrowLeft}>Back to {CONTENT_KIND_LABEL[kind].plural.toLowerCase()}</Button></Link>} />

      <Panel className="mb-4 overflow-hidden">
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 xl:grid-cols-6">{steps.map((label, index) => <button key={label} type="button" disabled={index > step || importing} onClick={() => index <= step && setStep(index)} className={cn('flex min-h-16 items-center gap-2 bg-surface px-3 py-2 text-left', index === step && 'bg-accent-tint/55', index < step && 'text-ink', index > step && 'text-ink-3')}><span className={cn('grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px]', index < step ? 'border-success bg-success text-white' : index === step ? 'border-accent bg-accent text-on-accent' : 'border-line-2')}>{index < step ? <Check size={12} /> : index + 1}</span><span className="text-[11.5px] font-semibold leading-tight">{label}</span></button>)}</div>
      </Panel>

      {step === 0 && <div className="grid gap-4 xl:grid-cols-[1fr_25rem]">
        <Panel className="p-5 sm:p-8"><button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const dropped = event.dataTransfer.files[0]; if (dropped) void loadFile(dropped) }} className="flex min-h-72 w-full flex-col items-center justify-center rounded-xl border border-dashed border-line-2 bg-surface-2/40 px-5 text-center transition-colors hover:border-accent hover:bg-accent-tint/25"><span className="grid size-12 place-items-center rounded-xl bg-accent-tint text-accent"><Icon icon={loading ? Loader2 : Upload} size={23} className={loading ? 'animate-spin' : ''} /></span><strong className="mt-4 text-[16px] text-ink">Choose a file or drop it here</strong><span className="mt-1 text-[12.5px] text-ink-3">.xlsx, .csv, .md, or .markdown · files open directly</span><span className="mt-4 rounded-md border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink">Browse files</span></button><input ref={inputRef} type="file" accept=".xlsx,.csv,.md,.markdown" className="sr-only" onChange={(event) => { const selected = event.target.files?.[0]; if (selected) void loadFile(selected) }} />{parseError && <div role="alert" className="mt-4 flex gap-2 rounded-lg border border-danger/30 bg-danger-tint p-3 text-[12.5px] text-danger"><Icon icon={XCircle} size={16} className="shrink-0" />{parseError}</div>}</Panel>
        <Panel className="overflow-hidden"><PanelHeader title="Markdown format" icon={FileText} hint="Codex-ready" /><div className="p-4"><p className="text-[12.5px] leading-relaxed text-ink-2">Use one <code className="font-mono text-accent-strong"># Item</code> block per record. Each field is a level-two heading. Separate items with a line containing <code className="font-mono text-accent-strong">---</code>.</p><pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-inset p-3 font-mono text-[10.5px] leading-relaxed text-ink-2">{schema.markdownExample}</pre><p className="mt-3 text-[11.5px] leading-relaxed text-ink-3">Canonical IDs should be used for subjects, concepts, linked content, and universities. Multi-value sections accept one value per line, a semicolon, or a vertical bar.</p></div></Panel>
      </div>}

      {step === 1 && sheet && <Panel className="overflow-hidden"><PanelHeader title="Confirm the worksheet" icon={FileSpreadsheet} hint={file?.name} /><div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[20rem_1fr]"><div><label className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Worksheet</label><Select value={sheetName} onChange={(event) => setSheetName(event.target.value)}>{sheets.map((candidate) => <option key={candidate.name}>{candidate.name}</option>)}</Select><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-lg border border-line bg-surface-2 p-3"><p className="font-mono text-[23px] font-semibold text-ink">{sheet.rows.length}</p><p className="text-[11.5px] text-ink-3">rows detected</p></div><div className="rounded-lg border border-line bg-surface-2 p-3"><p className="font-mono text-[23px] font-semibold text-ink">{sheet.headers.length}</p><p className="text-[11.5px] text-ink-3">columns detected</p></div></div></div><div className="min-w-0 overflow-x-auto rounded-lg border border-line"><table className="w-full text-[12px]"><thead><tr>{sheet.headers.map((header) => <th key={header} className="whitespace-nowrap border-b border-line bg-surface-2 px-3 py-2 text-left font-semibold text-ink">{header || 'Untitled column'}</th>)}</tr></thead><tbody>{sheet.rows.slice(0, 4).map((row, index) => <tr key={index}>{sheet.headers.map((header, column) => <td key={`${header}-${column}`} className="max-w-56 truncate border-b border-line px-3 py-2 text-ink-2 last:border-b-0">{row[column] || '—'}</td>)}</tr>)}</tbody></table></div></div><div className="flex justify-end border-t border-line px-4 py-3"><Button variant="primary" iconRight={ArrowRight} onClick={confirmSheet}>Confirm worksheet</Button></div></Panel>}

      {step === 2 && sheet && <Panel className="overflow-hidden"><PanelHeader title="Map and inspect every uploaded column" hint={`${sheet.headers.length} source columns`} /><div className="divide-y divide-line">{sheet.headers.map((header, column) => { const mapped = schema.fields.find((field) => field.key === mapping[header]); return <div key={`${header}-${column}`} className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(10rem,0.7fr)_1.2rem_minmax(13rem,1fr)] sm:items-center"><div><p className="font-mono text-[12px] font-semibold text-ink">{header || `Column ${column + 1}`}</p><p className="mt-0.5 truncate text-[11px] text-ink-3">Example: {sheet.rows[0]?.[column] || 'blank'}</p></div><ArrowRight size={14} className="hidden text-ink-3 sm:block" /><div><Select value={mapping[header] ?? IGNORE} onChange={(event) => setMapping((current) => ({ ...current, [header]: event.target.value }))}><option value={IGNORE}>Ignore this column</option>{schema.fields.map((field) => <option key={field.key} value={field.key}>{field.label}{field.required ? ' *' : ''}</option>)}</Select>{mapped && <p className="mt-1 text-[11px] text-ink-3">{mapped.help}</p>}</div></div>})}</div><div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3"><p className="text-[11.5px] text-ink-3">Required destinations are marked with *.</p><Button variant="primary" iconRight={ArrowRight} onClick={() => setStep(3)} disabled={mappedRows.length === 0}>Preview all rows</Button></div></Panel>}

      {step === 3 && <Panel className="overflow-hidden"><PanelHeader title="Full import preview" hint={`${mappedRows.length} rows`} action={<Badge tone={mappedRows.some((row) => row.errors.length) ? 'warning' : 'success'}>{mappedRows.filter((row) => row.errors.length).length} invalid</Badge>} /><div className="max-h-[38rem] overflow-auto"><table className="w-full min-w-[48rem] text-[12px]"><thead className="sticky top-0 z-10"><tr><th className="border-b border-line bg-surface-2 px-3 py-2 text-left">Row</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-left">Title</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-left">Subject</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-left">Status</th><th className="border-b border-line bg-surface-2 px-3 py-2 text-left">Validation</th></tr></thead><tbody>{mappedRows.map((row) => <tr key={row.rowKey} className={row.errors.length ? 'bg-warning-tint/25' : ''}><td className="border-b border-line px-3 py-2 font-mono text-ink-3">{row.index}</td><td className="max-w-md border-b border-line px-3 py-2 font-medium text-ink">{row.values.title || row.values.question || 'Untitled'}</td><td className="border-b border-line px-3 py-2 text-ink-2">{row.values.subject || '—'}</td><td className="border-b border-line px-3 py-2 text-ink-2">{row.values.status || 'Draft'}</td><td className="border-b border-line px-3 py-2">{row.errors.length ? <span className="text-warning">{row.errors.join(' · ')}</span> : <span className="inline-flex items-center gap-1 text-success"><CheckCircle2 size={13} /> Ready</span>}</td></tr>)}</tbody></table></div><div className="flex justify-end border-t border-line px-4 py-3"><Button variant="primary" iconRight={ArrowRight} onClick={() => setStep(4)}>Inspect skipped rows</Button></div></Panel>}

      {step === 4 && <Panel className="overflow-hidden"><PanelHeader title="Rows that will be skipped" icon={AlertTriangle} hint={`${skippedRows.length} rows`} /><div className="divide-y divide-line">{skippedRows.map((row) => <div key={row.rowKey} className="grid gap-1 px-4 py-3 sm:grid-cols-[5rem_1fr]"><span className="font-mono text-[11px] text-ink-3">Row {row.index}</span><div><p className="text-[12.5px] font-semibold text-ink">{row.values.title || row.values.question || 'Untitled row'}</p><p className="mt-0.5 text-[11.5px] leading-relaxed text-warning">{row.reasons.join(' · ')}</p></div></div>)}{skippedRows.length === 0 && <div className="px-5 py-12 text-center"><CheckCircle2 size={24} className="mx-auto text-success" /><p className="mt-2 text-[13px] font-semibold text-ink">No rows will be skipped</p><p className="mt-1 text-[12px] text-ink-3">Every row has passed the currently selected rules.</p></div>}</div><div className="flex justify-end border-t border-line px-4 py-3"><Button variant="primary" iconRight={ArrowRight} onClick={() => setStep(5)}>Choose import options</Button></div></Panel>}

      {step === 5 && <div className="grid gap-4 xl:grid-cols-[1fr_24rem]">
        <Panel className="overflow-hidden"><PanelHeader title="Import options and submit" /><div className="space-y-4 p-4 sm:p-5"><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface p-3"><input type="checkbox" className="mt-0.5" checked={includeInvalid} onChange={(event) => setIncludeInvalid(event.target.checked)} /><span><strong className="block text-[13px] text-ink">Import invalid rows too</strong><span className="mt-0.5 block text-[11.5px] leading-relaxed text-ink-3">Include rows with validation errors instead of skipping them. Duplicate rows and conflicting IDs in create-only mode remain blocked.</span></span></label><div className="grid gap-3 sm:grid-cols-2"><label className="rounded-lg border border-line p-3"><span className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Existing canonical IDs</span><Select value={mergeMode} onChange={(event) => setMergeMode(event.target.value as 'create' | 'update')}><option value="update">Update matching items</option><option value="create">Create only; skip matches</option></Select></label><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line p-3"><input type="checkbox" className="mt-0.5" checked={overrideEmpty} onChange={(event) => setOverrideEmpty(event.target.checked)} /><span><strong className="block text-[12.5px] text-ink">Override with blanks</strong><span className="mt-0.5 block text-[11px] leading-relaxed text-ink-3">Allow empty imported fields to replace existing content.</span></span></label></div><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-accent-line bg-accent-tint/35 p-4"><input type="checkbox" className="mt-0.5" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span className="text-[12.5px] font-medium leading-relaxed text-ink">I reviewed all mappings, all preview rows, all visible errors, the skipped-row list, and the selected merge/override options.</span></label>{importing && <div><div className="mb-2 flex items-center justify-between text-[12px]"><span className="inline-flex items-center gap-2 text-ink-2"><Loader2 size={14} className="animate-spin" />Importing in batches of 25</span><span className="font-mono text-ink">{progress}%</span></div><Meter value={progress} tone="accent" /></div>}{importResult && <div className={cn('rounded-lg border p-4', importResult.failed ? 'border-warning/35 bg-warning-tint/40' : 'border-success/30 bg-success-tint/50')}><p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><Icon icon={importResult.failed ? AlertTriangle : CheckCircle2} size={16} className={importResult.failed ? 'text-warning' : 'text-success'} />{importResult.imported} imported · {importResult.failed} failed</p>{importResult.errors.length > 0 && <ul className="mt-2 space-y-1 text-[11.5px] text-warning">{importResult.errors.map((error) => <li key={error}>{error}</li>)}</ul>}<p className="mt-2 text-[11.5px] text-ink-3">Completed row identities were recorded. Re-running this file will not import them twice.</p></div>}<div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-between"><Button variant="ghost" iconLeft={RotateCcw} onClick={reset} disabled={importing}>Start over</Button><Button variant="primary" iconLeft={Upload} onClick={() => void runImport()} disabled={!confirmed || importing || Boolean(importResult)} loading={importing}>Import {mappedRows.length - skippedRows.length} rows</Button></div></div></Panel>
        <Panel className="h-fit overflow-hidden"><PanelHeader title="Import summary" /><dl className="divide-y divide-line px-4"><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">File</dt><dd className="max-w-48 truncate text-[12px] font-medium text-ink">{file?.name}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Worksheet</dt><dd className="text-[12px] font-medium text-ink">{sheet?.name}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Rows detected</dt><dd className="font-mono text-[12px] text-ink">{mappedRows.length}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Previously imported</dt><dd className="font-mono text-[12px] text-ink">{mappedRows.filter((row) => importedKeys.has(row.rowKey)).length}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Will skip</dt><dd className="font-mono text-[12px] text-warning">{skippedRows.length}</dd></div><div className="flex justify-between py-3"><dt className="text-[12px] text-ink-3">Batch size</dt><dd className="font-mono text-[12px] text-ink">25</dd></div></dl></Panel>
      </div>}
    </PageContainer>
  )
}
