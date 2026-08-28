import { useMemo, useState } from 'react'
import { Upload, ArrowRight, ArrowLeft, Check, X, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { overlayPortal } from '@/lib/overlayPortal'

const IGNORE = 'Ignore'

function parseCsv(raw: string): { headers: string[]; rows: string[][] } {
  const lines = raw.trim().split(/\r?\n/).filter((l) => l.trim())
  if (lines.length === 0) return { headers: [], rows: [] }
  const split = (l: string) => l.split(',').map((s) => s.trim())
  return { headers: split(lines[0]), rows: lines.slice(1).map(split) }
}

function guess(header: string, fields: string[]): string {
  const h = header.toLowerCase()
  return (
    fields.find(
      (f) => f.toLowerCase() === h || h.includes(f.toLowerCase()) || f.toLowerCase().includes(h),
    ) ?? IGNORE
  )
}

export function BulkImport({
  open,
  onClose,
  title,
  itemNoun,
  fields,
  sampleCsv,
  onImport,
}: {
  open: boolean
  onClose: () => void
  title: string
  itemNoun: string
  fields: string[]
  sampleCsv: string
  onImport: (count: number) => void
}) {
  const [step, setStep] = useState<'paste' | 'map' | 'done'>('paste')
  const [raw, setRaw] = useState(sampleCsv)
  const [mapping, setMapping] = useState<Record<string, string>>({})

  const parsed = useMemo(() => parseCsv(raw), [raw])

  if (!open) return null

  function goToMap() {
    const p = parseCsv(raw)
    const m: Record<string, string> = {}
    p.headers.forEach((h) => (m[h] = guess(h, fields)))
    setMapping(m)
    setStep('map')
  }

  function reset() {
    setStep('paste')
    setRaw(sampleCsv)
    onClose()
  }

  const mappedFields = parsed.headers.filter((h) => mapping[h] && mapping[h] !== IGNORE)

  return overlayPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={reset} aria-label="Close import dialog" />
      <div className="absolute left-1/2 top-1/2 w-[min(94vw,700px)] -translate-x-1/2 -translate-y-1/2">
        <div className="animate-pop overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
            <Icon icon={Upload} size={17} className="text-primary" />
            <h2 className="flex-1 font-serif text-[17px] font-semibold text-ink">{title}</h2>
            <button type="button" onClick={reset} className="grid size-11 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink sm:size-9" aria-label="Close">
              <Icon icon={X} size={18} />
            </button>
          </div>

          {/* Steps indicator */}
          {step !== 'done' && (
            <div className="flex items-center gap-2 border-b border-line px-5 py-2.5 text-[12px]">
              <span className={cn('font-medium', step === 'paste' ? 'text-primary' : 'text-ink-3')}>
                1 · Paste data
              </span>
              <Icon icon={ArrowRight} size={12} className="text-ink-3" />
              <span className={cn('font-medium', step === 'map' ? 'text-primary' : 'text-ink-3')}>
                2 · Map & preview
              </span>
            </div>
          )}

          <div className="max-h-[64vh] overflow-y-auto p-5">
            {step === 'paste' && (
              <div>
                <p className="mb-2 text-[13px] text-ink-2">
                  Paste CSV with a header row. Columns are matched to fields on the next step.
                </p>
                <textarea
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  spellCheck={false}
                  className="h-48 w-full resize-none rounded-md border border-line bg-surface-2 p-3 font-mono text-[12.5px] leading-relaxed text-ink outline-none focus:border-primary"
                />
                <p className="mt-2 text-[12px] text-ink-3">
                  {parsed.rows.length} rows · {parsed.headers.length} columns detected
                </p>
              </div>
            )}

            {step === 'map' && (
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                    Column mapping
                  </p>
                  <div className="space-y-2">
                    {parsed.headers.map((h) => (
                      <div key={h} className="flex items-center gap-3">
                        <span className="tnum w-40 shrink-0 truncate font-mono text-[12.5px] text-ink-2">
                          {h}
                        </span>
                        <Icon icon={ArrowRight} size={14} className="text-ink-3" />
                        <Select
                          value={mapping[h] ?? IGNORE}
                          onChange={(e) => setMapping((m) => ({ ...m, [h]: e.target.value }))}
                          className="max-w-xs"
                        >
                          <option value={IGNORE}>Ignore column</option>
                          {fields.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                    Preview · first {Math.min(3, parsed.rows.length)} rows
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-line">
                    <table className="w-full text-[12.5px]">
                      <thead>
                        <tr>
                          {mappedFields.map((h) => (
                            <th
                              key={h}
                              className="whitespace-nowrap border-b border-line bg-surface-2 px-3 py-2 text-start font-semibold text-ink-2"
                            >
                              {mapping[h]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {parsed.rows.slice(0, 3).map((row, ri) => (
                          <tr key={ri}>
                            {mappedFields.map((h) => (
                              <td
                                key={h}
                                className="whitespace-nowrap border-b border-line px-3 py-2 text-ink last:border-b-0"
                              >
                                {row[parsed.headers.indexOf(h)] ?? '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {step === 'done' && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-3 grid size-12 place-items-center rounded-xl bg-success-tint text-success">
                  <Icon icon={CircleCheck} size={26} />
                </div>
                <h3 className="font-serif text-[19px] font-semibold text-ink">Import complete</h3>
                <p className="mt-1 text-[13.5px] text-ink-2">
                  {parsed.rows.length} {itemNoun} queued for review.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-line px-5 py-3">
            {step === 'paste' && (
              <>
                <Button variant="ghost" size="md" onClick={reset}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  iconRight={ArrowRight}
                  disabled={parsed.rows.length === 0}
                  onClick={goToMap}
                >
                  Continue
                </Button>
              </>
            )}
            {step === 'map' && (
              <>
                <Button variant="ghost" size="md" iconLeft={ArrowLeft} onClick={() => setStep('paste')}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={Check}
                  onClick={() => {
                    onImport(parsed.rows.length)
                    setStep('done')
                  }}
                >
                  Import {parsed.rows.length} {itemNoun}
                </Button>
              </>
            )}
            {step === 'done' && (
              <Button variant="primary" size="md" className="ml-auto" onClick={reset}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
