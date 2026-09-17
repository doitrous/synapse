import { useEffect, useRef, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import type { PageBox } from '@/lib/reader/pageLayout'

/**
 * One page: its canvas, and — when it is actually on screen — its text.
 *
 * The box is positioned from the computed layout, so its height is correct
 * before anything is drawn. The old version gave the canvas a full page of
 * height via `aspect-ratio` *and* added a spacer of the same height, so an
 * unpainted page was twice as tall as a painted one and every paint shifted
 * the document under the reader.
 */

/** Sharp on a retina screen without asking a phone for four times the pixels. */
const MAX_DEVICE_SCALE = 2

export function PdfPageView({
  doc,
  page,
  box,
  scale,
  /** Text is only worth building for pages the reader can actually see. */
  withText,
  selectable,
  children,
}: {
  doc: PDFDocumentProxy
  page: number
  box: PageBox
  scale: number
  withText: boolean
  selectable: boolean
  /** The annotation layers, stacked above the page and its text. */
  children?: React.ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    let task: { cancel: () => void } | null = null

    void (async () => {
      try {
        const rendered = await doc.getPage(page)
        if (cancelled) return
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!canvas || !context) return

        const ratio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_SCALE)
        const viewport = rendered.getViewport({ scale: scale * ratio })
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        const render = rendered.render({ canvas, canvasContext: context, viewport })
        task = render
        await render.promise
        if (cancelled) return
        setFailed(false)
        if (!withText) return

        const layer = textRef.current
        if (!layer) return
        layer.textContent = ''
        try {
          const pdfjs = await import('pdfjs-dist')
          if (cancelled) return
          const textViewport = rendered.getViewport({ scale })
          const textLayer = new pdfjs.TextLayer({
            textContentSource: await rendered.getTextContent(),
            container: layer,
            viewport: textViewport,
          })
          await textLayer.render()
        } catch { /* a page with no extractable text is still a readable page */ }
      } catch {
        // A newer scale cancels the in-flight render (expected); anything else
        // is a real failure that would otherwise leave a silently blank canvas.
        if (!cancelled) setFailed(true)
      }
    })()

    return () => { cancelled = true; task?.cancel() }
  }, [doc, page, scale, withText])

  return (
    <div
      data-page={page}
      className="absolute overflow-hidden rounded-lg border border-line bg-surface shadow-panel"
      style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
    >
      <canvas ref={canvasRef} className="block size-full" />
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-muted">
          This page couldn’t be displayed. Try reloading.
        </div>
      )}
      {withText && (
        <div
          ref={textRef}
          className="pdf-text-layer"
          data-selectable={selectable ? 'true' : 'false'}
          style={{ ['--scale-factor' as string]: String(scale) }}
        />
      )}
      {children}
    </div>
  )
}
