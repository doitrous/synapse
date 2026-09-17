import { useEffect, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import '@/lib/reader/pdfCompat'
import { applyMeasurement, sizesAreUniform, type PageSize } from '@/lib/reader/pageLayout'
import { apiFetchFile } from '@/lib/api'
import { resolveMediaSource } from '@/lib/mediaStorage'

/**
 * One shared module worker for the whole app, built from our own entry so the
 * runtime shims load into the worker realm before pdf.js does. pdf.js supports
 * a reused `workerPort`, and this reader only opens one document at a time, so
 * a singleton avoids leaking a worker on every file change.
 */
let pdfWorker: Worker | null = null
function ensurePdfWorker(pdfjs: typeof import('pdfjs-dist')): void {
  if (pdfWorker) return
  pdfWorker = new Worker(new URL('./pdfWorker.ts', import.meta.url), { type: 'module' })
  pdfjs.GlobalWorkerOptions.workerPort = pdfWorker
}

export interface OutlineEntry {
  title: string
  page: number | null
  depth: number
}

export interface PdfDocumentState {
  doc: PDFDocumentProxy | null
  /** One entry per page, at scale 1. Page 1's size until each is measured. */
  sizes: PageSize[]
  outline: OutlineEntry[]
  loading: boolean
  error: string | null
}

/** Measured in batches so a 600-page book does not stall on open. */
const MEASURE_BATCH = 32

/**
 * Load a document, then learn its real shape without making anyone wait.
 *
 * Page 1 is measured immediately and its size assumed for every other page, so
 * the scroller has a height and is usable within a frame. The rest are measured
 * in the background and corrected as they arrive — except when the first few
 * agree, which is nearly every textbook, in which case there is nothing to
 * correct and the sweep is skipped. Assuming page 1's size *permanently*, as
 * the old reader did, is wrong for any document with a landscape plate in it.
 */
export function usePdfDocument(
  /** A server path, or an IndexedDB reference for a file that never left this browser. */
  source: { filePath: string | null; localRef: string | null },
  hasFile: boolean,
  errorMessage: string,
): PdfDocumentState {
  const [state, setState] = useState<PdfDocumentState>({
    doc: null, sizes: [], outline: [], loading: true, error: null,
  })
  const { filePath, localRef } = source

  useEffect(() => {
    if ((!filePath && !localRef) || !hasFile) {
      setState({ doc: null, sizes: [], outline: [], loading: false, error: null })
      return
    }

    let cancelled = false
    let task: { destroy: () => Promise<void> } | null = null
    setState({ doc: null, sizes: [], outline: [], loading: true, error: null })

    void (async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        // Resolved through Vite rather than a CDN, so the reader keeps working
        // offline and under the app's own content policy.
        ensurePdfWorker(pdfjs)
        const data = localRef
          ? await (await fetch((await resolveMediaSource(localRef)).url)).arrayBuffer()
          : await apiFetchFile(filePath as string)
        if (cancelled) return

        const loadingTask = pdfjs.getDocument({ data })
        task = loadingTask
        const doc = await loadingTask.promise
        if (cancelled) { void loadingTask.destroy(); return }

        const first = await doc.getPage(1)
        const { width, height } = first.getViewport({ scale: 1, rotation: 0 })
        const assumed: PageSize[] = Array.from({ length: doc.numPages }, () => ({ width, height }))
        first.cleanup()
        if (cancelled) return
        setState({ doc, sizes: assumed, outline: [], loading: false, error: null })

        void measureRest(doc, assumed, () => cancelled, (sizes) => {
          setState((current) => (current.doc === doc ? { ...current, sizes } : current))
        })
        void loadOutline(doc, () => cancelled, (outline) => {
          setState((current) => (current.doc === doc ? { ...current, outline } : current))
        })
      } catch {
        if (!cancelled) setState({ doc: null, sizes: [], outline: [], loading: false, error: errorMessage })
      }
    })()

    return () => { cancelled = true; void task?.destroy() }
    // `errorMessage` is a translated string; re-running on it would re-download.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath, localRef, hasFile])

  return state
}

async function measureRest(
  doc: PDFDocumentProxy,
  assumed: PageSize[],
  cancelled: () => boolean,
  publish: (sizes: PageSize[]) => void,
) {
  let sizes = assumed
  for (let start = 2; start <= doc.numPages; start += MEASURE_BATCH) {
    if (cancelled()) return
    const numbers = []
    for (let page = start; page < start + MEASURE_BATCH && page <= doc.numPages; page++) numbers.push(page)

    const measured = await Promise.all(numbers.map(async (page) => {
      const loaded = await doc.getPage(page)
      const { width, height } = loaded.getViewport({ scale: 1, rotation: 0 })
      // Release the parsed page: measuring a whole book should not hold it.
      loaded.cleanup()
      return { page, width, height }
    }))
    if (cancelled()) return

    let changed = false
    for (const entry of measured) {
      const next = applyMeasurement(sizes, entry.page - 1, { width: entry.width, height: entry.height })
      if (next !== sizes) { sizes = next; changed = true }
    }
    if (changed) publish(sizes)

    // Most books are one page size throughout. Once the opening pages agree,
    // there is nothing left to correct and the rest of the sweep is waste.
    if (start === 2 && !changed && sizesAreUniform(sizes, Math.min(MEASURE_BATCH, doc.numPages))) return
    await new Promise((resolve) => setTimeout(resolve, 0))
  }
}

async function loadOutline(
  doc: PDFDocumentProxy,
  cancelled: () => boolean,
  publish: (outline: OutlineEntry[]) => void,
) {
  const raw = await doc.getOutline().catch(() => null)
  if (cancelled() || !raw?.length) return
  const flat: OutlineEntry[] = []
  const walk = async (items: typeof raw, depth: number) => {
    for (const item of items) {
      let page: number | null = null
      try {
        const dest = typeof item.dest === 'string' ? await doc.getDestination(item.dest) : item.dest
        if (dest?.[0]) page = (await doc.getPageIndex(dest[0] as never)) + 1
      } catch { /* an unresolvable destination is still a readable heading */ }
      flat.push({ title: item.title, page, depth })
      if (item.items?.length) await walk(item.items, depth + 1)
    }
  }
  await walk(raw, 0)
  if (!cancelled()) publish(flat)
}
