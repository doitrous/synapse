// Rasterizes the Open Graph / link-preview cards (SVG -> PNG at 1200x630).
// Run with: npm run og
// Arabic text shapes via the host's system fonts (Geeza Pro et al.), so run
// on macOS for faithful output. The committed PNGs in public/ are what ships.
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const PAPER = '#f5f7fb' // --color-paper
const BRAND_BLUE = '#1553b3' // --brand-blue on the light ground
const BRAND_ROSE = '#d13a63' // --brand-rose on the light ground

// The logotype's stack. Jost is a webfont and resvg only reads installed faces,
// so on a Mac this lands on Futura — the geometric sans Jost is a revival of,
// and the closest thing the machine actually has. The whole list is kept so the
// fallback order stays visible rather than implied.
const BRAND_STACK = "'Jost','Century Gothic','Futura','Avenir Next',Helvetica,Arial,sans-serif"

const FONT = { loadSystemFonts: true }

// The brand mark is the supplied PNG, not a traced vector, so it is inlined as
// a data URI at render time. Keeping it out of the .svg files means those stay
// readable and diffable instead of carrying 150KB of base64 each.
const markPath = fileURLToPath(new URL('../../public/brand/logo.png', import.meta.url))
const MARK = `data:image/png;base64,${readFileSync(markPath).toString('base64')}`

/** Ink bounds of one run set in the logotype's stack. */
function inkWidth(text, size, tracking) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="400"><text x="0" y="200" font-family="${BRAND_STACK}" font-size="${size}" font-weight="500" letter-spacing="${tracking}">${text}</text></svg>`
  return new Resvg(svg, { font: FONT }).getBBox().width
}

/**
 * How far the pen travels across `text` — its advance width plus the one
 * tracking step that follows it.
 *
 * Ink bounds alone are short by the glyphs' side bearings, and resvg exposes no
 * advance widths, so it is measured as the difference a run makes: appending a
 * C to a run grows that run's ink by exactly the run's advance plus a tracking
 * step, because the C's own bearings and ink appear in both measurements and
 * cancel. That makes the lockup self-measuring — it stays correct if the font
 * stack resolves differently on another machine.
 */
function penWidth(text, size, tracking) {
  return inkWidth(text + 'C', size, tracking) - inkWidth('C', size, tracking)
}

/**
 * The brand lockup, composed the way `src/components/brand/Wordmark.tsx`
 * composes it: **the mark IS the O in CONNECT**, so the wordmark and the symbol
 * are one thing rather than a symbol standing next to a word. Jost 500,
 * uppercase, 0.045em tracking; the mark at 1.06em with a 0.015em gap either
 * side, seated 0.25em below the baseline. CONNECT is blue, CORTEX is rose.
 *
 * SVG has no inline flow, so where a browser lets the mark sit in the text run
 * on its own, here each piece is placed at a measured x.
 *
 * Give `x` to set the lockup from its left edge, or `right` to hang it off its
 * right edge — the Arabic card mirrors, but the logotype itself stays LTR: it
 * is a name, not running text.
 */
function lockup({ x, right, baseline, size }) {
  const tracking = size * 0.045
  const mark = size * 1.06
  const gap = size * 0.015

  // Where the O would start, and how wide the rest of the word runs. The
  // trailing tracking step is dropped from the tail so the right edge is the
  // last glyph, not the space after it.
  const afterC = penWidth('C', size, tracking)
  const tail = penWidth('NNECTCORTEX', size, tracking) - tracking
  const width = afterC + gap + mark + gap + tail

  const startX = x ?? right - width
  const markX = startX + afterC + gap
  const tailX = markX + mark + gap
  const markY = baseline + size * 0.25 - mark
  const type = `font-family="${BRAND_STACK}" font-size="${size}" font-weight="500" letter-spacing="${tracking.toFixed(3)}"`
  const round = (n) => n.toFixed(2)

  return [
    `<text x="${round(startX)}" y="${baseline}" ${type} fill="${BRAND_BLUE}">C</text>`,
    `<image xlink:href="__MARK__" x="${round(markX)}" y="${round(markY)}" width="${round(mark)}" height="${round(mark)}"/>`,
    `<text x="${round(tailX)}" y="${baseline}" ${type}><tspan fill="${BRAND_BLUE}">NNECT</tspan><tspan fill="${BRAND_ROSE}">CORTEX</tspan></text>`,
  ].join('\n  ')
}

const jobs = [
  {
    src: './og-image.svg',
    out: '../../public/og-image.png',
    // Left margin of the card, on the same rule as the headline below it.
    lockup: { x: 90, baseline: 152, size: 56 },
  },
  {
    src: './og-image-ar.svg',
    out: '../../public/og-image-ar.png',
    // Hung off the right margin, where the Arabic copy is anchored.
    lockup: { right: 1110, baseline: 152, size: 56 },
  },
]

for (const job of jobs) {
  const svg = readFileSync(fileURLToPath(new URL(job.src, import.meta.url)), 'utf8')
    .replaceAll('__LOCKUP__', lockup(job.lockup))
    .replaceAll('__MARK__', MARK)
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: FONT,
    background: PAPER,
  })
    .render()
    .asPng()
  const outPath = fileURLToPath(new URL(job.out, import.meta.url))
  writeFileSync(outPath, png)
  console.log(`rendered ${job.out} (${png.length} bytes)`)
}
