// Rasterizes the Nishany identity assets and Open Graph cards.
// Run with: npm run og. The committed PNGs in public/ are what ships.
// The nishany-lockup*.png files (which need real Baloo 2 rendering, not
// resvg's system-font fallback) are generated separately — see BRAND.md.
import { Resvg } from '@resvg/resvg-js'
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const PAPER = '#f5f7fb' // --color-paper
const FONT = { loadSystemFonts: true }

const jobs = [
  { src: '../../public/brand/nishany-mark.svg', out: '../../public/brand/nishany-mark.png', width: 512 },
  { src: '../../public/brand/nishany-mark-dark.svg', out: '../../public/brand/nishany-mark-dark.png', width: 512 },
  { src: '../../public/brand/nishany-mark-mono.svg', out: '../../public/brand/nishany-mark-mono.png', width: 512 },
  { src: '../../public/brand/nishany-mark-white.svg', out: '../../public/brand/nishany-mark-white.png', width: 512 },
  { src: '../../public/brand/nishany-mark.svg', out: '../../public/favicon.png', width: 128 },
  { src: './og-image.svg', out: '../../public/og-image.png', width: 1200, background: PAPER },
  { src: './og-image-ar.svg', out: '../../public/og-image-ar.png', width: 1200, background: PAPER },
]

for (const job of jobs) {
  const svg = readFileSync(fileURLToPath(new URL(job.src, import.meta.url)), 'utf8')
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: job.width },
    font: FONT,
    ...(job.background ? { background: job.background } : {}),
  })
    .render()
    .asPng()
  const outPath = fileURLToPath(new URL(job.out, import.meta.url))
  writeFileSync(outPath, png)
  console.log(`rendered ${job.out} (${png.length} bytes)`)
}

copyFileSync(
  fileURLToPath(new URL('../../public/og-image.png', import.meta.url)),
  fileURLToPath(new URL('../../public/social-preview.png', import.meta.url)),
)
