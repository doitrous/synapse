import { useId, type ReactNode } from 'react'
import { useT } from '@/lib/i18n'

/**
 * A few hand-rolled charts in the Clinical Chart idiom — no charting library,
 * just SVG and divs coloured from tokens. Every one carries a visually-hidden
 * table of the same numbers, so a screen reader gets the data the marks encode;
 * bars and cells are focusable with a `<title>` and `aria-label`, so the tooltip
 * is reachable by keyboard, not only hover. Motion is CSS-driven (or none), so
 * `prefers-reduced-motion` is honoured without a JS branch.
 */

export interface ColumnDatum {
  label: string
  value: number
  /** Optional running total, drawn as a line on its own right-hand scale. */
  cumulative?: number
  hint?: string
}

/** A screen-reader table mirroring a chart's data. */
function DataTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: (string | number)[][] }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>))}</tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * Vertical columns with an optional cumulative line. Bars are focusable and
 * titled; a long series thins its x labels so they stay legible.
 */
export function ColumnChart({
  data,
  caption,
  valueLabel,
  cumulativeLabel,
  color = 'var(--color-primary)',
  height = 160,
  formatValue = (n) => String(n),
}: {
  data: ColumnDatum[]
  caption: string
  valueLabel: string
  cumulativeLabel?: string
  color?: string
  height?: number
  formatValue?: (n: number) => string
}) {
  const t = useT()
  const clipId = useId()
  if (data.length === 0) return <EmptyChart label={t('No data yet')} />

  const maxValue = Math.max(1, ...data.map((d) => d.value))
  const hasCumulative = data.some((d) => d.cumulative !== undefined)
  const maxCumulative = Math.max(1, ...data.map((d) => d.cumulative ?? 0))
  const width = Math.max(data.length * 8, 320)
  const gap = width / data.length
  const barW = Math.max(2, gap * 0.66)
  const labelEvery = Math.ceil(data.length / 8)

  const linePath = hasCumulative
    ? data
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * gap + gap / 2} ${height - ((d.cumulative ?? 0) / maxCumulative) * height}`)
        .join(' ')
    : ''

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height + 18}`}
          width="100%"
          height={height + 18}
          preserveAspectRatio="none"
          role="img"
          aria-label={caption}
          className="min-w-full"
        >
          <clipPath id={clipId}><rect x="0" y="0" width={width} height={height} /></clipPath>
          {data.map((d, i) => {
            const h = (d.value / maxValue) * height
            const x = i * gap + (gap - barW) / 2
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={height - h}
                  width={barW}
                  height={h}
                  rx={Math.min(2, barW / 2)}
                  fill={color}
                  tabIndex={0}
                  className="outline-none focus-visible:opacity-70"
                >
                  <title>
                    {d.hint ?? d.label}: {formatValue(d.value)} {valueLabel}
                    {d.cumulative !== undefined && cumulativeLabel ? ` · ${d.cumulative} ${cumulativeLabel}` : ''}
                  </title>
                </rect>
                {i % labelEvery === 0 && (
                  <text x={i * gap + gap / 2} y={height + 13} textAnchor="middle" className="fill-[var(--color-ink-3)]" style={{ fontSize: 9 }}>
                    {shortLabel(d.label)}
                  </text>
                )}
              </g>
            )
          })}
          {hasCumulative && (
            <path d={linePath} fill="none" stroke="var(--color-accent)" strokeWidth={1.5} clipPath={`url(#${clipId})`} />
          )}
        </svg>
      </div>
      <DataTable
        caption={caption}
        columns={hasCumulative && cumulativeLabel ? [t('Point'), valueLabel, cumulativeLabel] : [t('Point'), valueLabel]}
        rows={data.map((d) => (hasCumulative ? [d.label, d.value, d.cumulative ?? 0] : [d.label, d.value]))}
      />
    </figure>
  )
}

/** A horizontal stacked bar with a labelled legend (never colour-only). */
export function StackBar({
  segments,
  caption,
}: {
  segments: { key: string; label: string; value: number; color: string }[]
  caption: string
}) {
  const t = useT()
  const total = segments.reduce((a, s) => a + s.value, 0)
  if (total === 0) return <EmptyChart label={t('No cards yet')} />
  return (
    <figure className="m-0 space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-inset" role="img" aria-label={caption}>
        {segments.filter((s) => s.value > 0).map((s) => (
          <div key={s.key} style={{ width: `${(s.value / total) * 100}%`, backgroundColor: s.color }} title={`${s.label}: ${s.value}`} />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5 text-[12px] text-ink-2">
            <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} aria-hidden />
            {s.label}
            <span className="tnum font-mono text-ink">{s.value}</span>
            <span className="tnum text-ink-3">{total === 0 ? '0%' : `${Math.round((s.value / total) * 100)}%`}</span>
          </li>
        ))}
      </ul>
      <DataTable caption={caption} columns={[t('Segment'), t('Count'), t('Share')]} rows={segments.map((s) => [s.label, s.value, `${Math.round((s.value / total) * 100)}%`])} />
    </figure>
  )
}

export function EmptyChart({ label }: { label: string }) {
  return (
    <div className="grid h-32 place-items-center rounded-lg border border-dashed border-line-2 text-[12.5px] text-ink-3">
      {label}
    </div>
  )
}

/** A labelled stat with a big tabular figure, for summary rows. */
export function StatFigure({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{label}</p>
      <p className="tnum mt-1 font-mono text-[19px] font-semibold text-ink">{value}</p>
      {sub && <p className="tnum mt-0.5 text-[11.5px] text-ink-3">{sub}</p>}
    </div>
  )
}

function shortLabel(label: string): string {
  // `2026-08-20` → `08-20`; leaves short labels (hours, buckets) alone.
  const m = /^\d{4}-(\d{2}-\d{2})$/.exec(label)
  return m ? m[1] : label
}
