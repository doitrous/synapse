// Rasterizes the Open Graph / link-preview cards (SVG -> PNG at 1200x630).
// Run with: npm run og
// Arabic text shapes via the host's system fonts (Geeza Pro et al.), so run
// on macOS for faithful output. The committed PNGs in public/ are what ships.
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const PAPER = '#f5f7fb' // --color-paper

// The brand mark is the supplied PNG, not a traced vector, so it is inlined as
// a data URI at render time. Keeping it out of the .svg files means those stay
// readable and diffable instead of carrying 150KB of base64 each.
const markPath = fileURLToPath(new URL('../../public/brand/logo.png', import.meta.url))
const MARK = `data:image/png;base64,${readFileSync(markPath).toString('base64')}`

const jobs = [
  ['./og-image.svg', '../../public/og-image.png'],
  ['./og-image-ar.svg', '../../public/og-image-ar.png'],
]

for (const [src, out] of jobs) {
  const svg = readFileSync(fileURLToPath(new URL(src, import.meta.url)), 'utf8').replaceAll('__MARK__', MARK)
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
    background: PAPER,
  })
    .render()
    .asPng()
  const outPath = fileURLToPath(new URL(out, import.meta.url))
  writeFileSync(outPath, png)
  console.log(`rendered ${out} (${png.length} bytes)`)
}
