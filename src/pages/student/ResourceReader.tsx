import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, List, Minus, Plus, Search, X } from 'lucide-react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { useLiveResources } from '@/lib/useLiveResources'
import { useRecentResources } from '@/lib/useRecentResources'
import { apiFetchFile, apiOpenFile, API_MODE } from '@/lib/api'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/**
 * Reading a source inside the app.
 *
 * Opening a resource used to fetch the file, make a blob URL and push it into a
 * new tab, leaving the student in the browser's own viewer with the app behind
 * them. The page reference came from a regex over free-text metadata and usually
 * missed, so a citation to page 412 opened at page 1.
 *
 * pdf.js is imported dynamically, so none of it is downloaded until someone
 * actually opens a document, and pages render only while they are near the
 * viewport — a 600-page book opens as fast as a 10-page one.
 */

/** Rendered lazily; a page far from the viewport is a blank box of the right size. */
interface PageState {
  number: number
  width: number
  height: number
}

interface OutlineEntry {
  title: string
  page: number | null
  depth: number
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3] as const

export function ResourceReader() {
  const t = useT()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const resources = useLiveResources()
  const { noteOpened } = useRecentResources()

  const resource = resources.find((item) => item.id === id)
  const requestedPage = Number(params.get('page')) || 1

  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null)
  const [pages, setPages] = useState<PageState[]>([])
  const [outline, setOutline] = useState<OutlineEntry[]>([])
  const [current, setCurrent] = useState(requestedPage)
  const [zoom, setZoom] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [panel, setPanel] = useState<'none' | 'outline' | 'search'>('none')
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<{ page: number; snippet: string }[] | null>(null)
  const [searching, setSearching] = useState(false)

  const scrollerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef(new Map<number, HTMLDivElement>())

  // Load the document. pdf.js and the file both arrive only on this route.
  useEffect(() => {
    if (!resource?.hasFile) { setLoading(false); return }
    let cancelled = false
    let loaded: PDFDocumentProxy | null = null
    // Teardown belongs to the loading task, not the document proxy.
    let task: { destroy: () => Promise<void> } | null = null

    void (async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        // The worker is resolved through Vite rather than a CDN, so the reader
        // keeps working offline and under the app's own content policy.
        pdfjs.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.mjs?url')).default
        const data = await apiFetchFile(`/medical-resources/${encodeURIComponent(resource.id)}`)
        if (cancelled) return
        const loadingTask = pdfjs.getDocument({ data })
        task = loadingTask
        loaded = await loadingTask.promise
        if (cancelled) { void loadingTask.destroy(); return }

        // Measure every page up front — cheap, and it is what lets the scroller
        // have its true height before a single page has been drawn.
        const first = await loaded.getPage(1)
        const viewport = first.getViewport({ scale: 1 })
        setPages(Array.from({ length: loaded.numPages }, (_, index) => ({
          number: index + 1,
          width: viewport.width,
          height: viewport.height,
        })))
        setDoc(loaded)
        setLoading(false)
        noteOpened({ id: resource.id, title: resource.title, type: resource.type, subjectId: resource.subjectId, meta: resource.meta })

        const raw = await loaded.getOutline().catch(() => null)
        if (cancelled || !raw?.length) return
        const flat: OutlineEntry[] = []
        const walk = async (items: typeof raw, depth: number) => {
          for (const item of items) {
            let page: number | null = null
            try {
              const dest = typeof item.dest === 'string' ? await loaded!.getDestination(item.dest) : item.dest
              if (dest?.[0]) page = (await loaded!.getPageIndex(dest[0] as never)) + 1
            } catch { /* an unresolvable destination is still a readable heading */ }
            flat.push({ title: item.title, page, depth })
            if (item.items?.length) await walk(item.items, depth + 1)
          }
        }
        await walk(raw, 0)
        if (!cancelled) setOutline(flat)
      } catch {
        if (!cancelled) { setError(t('This file could not be opened here.')); setLoading(false) }
      }
    })()

    return () => {
      cancelled = true
      void task?.destroy()
    }
    // `noteOpened` and `t` are stable enough that re-running on them would mean
    // re-downloading the document.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource?.id, resource?.hasFile])

  const goToPage = useCallback((page: number) => {
    const node = pageRefs.current.get(page)
    if (node) node.scrollIntoView({ block: 'start', behavior: 'smooth' })
    setCurrent(page)
  }, [])

  // Land on the cited page once the document knows how many it has.
  useEffect(() => {
    if (!doc || requestedPage <= 1) return
    goToPage(Math.min(requestedPage, doc.numPages))
  }, [doc, requestedPage, goToPage])

  // Which page is being read, for the toolbar and the deep link.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !pages.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.page))
      },
      { root: scroller, threshold: [0.1, 0.5] },
    )
    pageRefs.current.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [pages])

  async function runSearch(term: string) {
    if (!doc || !term.trim()) { setHits(null); return }
    setSearching(true)
    const found: { page: number; snippet: string }[] = []
    const needle = term.trim().toLowerCase()
    for (let page = 1; page <= doc.numPages && found.length < 80; page += 1) {
      const content = await doc.getPage(page).then((p) => p.getTextContent())
      const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ')
      const at = text.toLowerCase().indexOf(needle)
      if (at !== -1) {
        found.push({ page, snippet: `…${text.slice(Math.max(0, at - 40), at + needle.length + 60).trim()}…` })
      }
    }
    setHits(found)
    setSearching(false)
  }

  if (!resource) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-[15px] font-semibold text-ink">{t('That resource is not here')}</p>
        <p className="mt-1.5 text-[13px] text-ink-3">{t('It may have been removed, or the link may be out of date.')}</p>
        <Link to="/app/resources" className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-accent-strong">
          <Icon icon={ArrowLeft} size={15} />{t('Back to resources')}
        </Link>
      </div>
    )
  }

  const unavailable = !resource.hasFile

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 flex-col bg-paper">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 sm:px-4">
        <button type="button" onClick={() => navigate(-1)} className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-ink-2 hover:bg-inset hover:text-ink sm:min-h-8">
          <Icon icon={ArrowLeft} size={15} />
          <span className="hidden sm:inline">{t('Back')}</span>
        </button>
        <span className="hidden h-5 w-px bg-line sm:block" />
        <h1 className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-ink">{resource.title}</h1>

        {doc && (
          <>
            <div className="hidden items-center gap-1 md:flex">
              <button type="button" onClick={() => goToPage(Math.max(1, current - 1))} disabled={current <= 1} className="grid size-8 place-items-center rounded-md text-ink-2 hover:bg-inset disabled:opacity-40" aria-label={t('Previous page')}>
                <Icon icon={ChevronLeft} size={16} />
              </button>
              <span className="tnum font-mono text-[12px] text-ink-2">{current} / {doc.numPages}</span>
              <button type="button" onClick={() => goToPage(Math.min(doc.numPages, current + 1))} disabled={current >= doc.numPages} className="grid size-8 place-items-center rounded-md text-ink-2 hover:bg-inset disabled:opacity-40" aria-label={t('Next page')}>
                <Icon icon={ChevronRight} size={16} />
              </button>
            </div>
            <div className="hidden items-center gap-1 lg:flex">
              <button type="button" onClick={() => setZoom((z) => ZOOM_STEPS[Math.max(0, ZOOM_STEPS.indexOf(z as never) - 1)] ?? z)} className="grid size-8 place-items-center rounded-md text-ink-2 hover:bg-inset" aria-label={t('Zoom out')}>
                <Icon icon={Minus} size={15} />
              </button>
              <span className="tnum w-11 text-center font-mono text-[12px] text-ink-2">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((z) => ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, ZOOM_STEPS.indexOf(z as never) + 1)] ?? z)} className="grid size-8 place-items-center rounded-md text-ink-2 hover:bg-inset" aria-label={t('Zoom in')}>
                <Icon icon={Plus} size={15} />
              </button>
            </div>
            <button type="button" onClick={() => setPanel((p) => (p === 'search' ? 'none' : 'search'))} className={cn('grid size-9 place-items-center rounded-md hover:bg-inset sm:size-8', panel === 'search' ? 'bg-accent-tint text-accent-strong' : 'text-ink-2')} aria-label={t('Search this document')}>
              <Icon icon={Search} size={16} />
            </button>
            <button type="button" onClick={() => setPanel((p) => (p === 'outline' ? 'none' : 'outline'))} className={cn('grid size-9 place-items-center rounded-md hover:bg-inset sm:size-8', panel === 'outline' ? 'bg-accent-tint text-accent-strong' : 'text-ink-2')} aria-label={t('Contents')}>
              <Icon icon={List} size={16} />
            </button>
          </>
        )}
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)]">
        {panel !== 'none' && (
          <aside className="absolute inset-y-0 end-0 z-20 mt-12 w-[min(22rem,100vw)] overflow-y-auto border-s border-line bg-surface shadow-pop">
            <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
              <h2 className="flex-1 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">
                {panel === 'outline' ? t('Contents') : t('Search this document')}
              </h2>
              <button type="button" onClick={() => setPanel('none')} className="grid size-8 place-items-center rounded-md text-ink-3 hover:bg-inset" aria-label={t('Close')}>
                <Icon icon={X} size={15} />
              </button>
            </div>

            {panel === 'outline' ? (
              outline.length ? (
                <ul className="p-2">
                  {outline.map((entry, index) => (
                    <li key={`${entry.title}-${index}`}>
                      <button
                        type="button"
                        disabled={entry.page == null}
                        onClick={() => entry.page && goToPage(entry.page)}
                        style={{ paddingInlineStart: `${0.5 + entry.depth * 0.85}rem` }}
                        className="flex w-full items-center gap-2 rounded-md py-2 pe-2 text-start text-[12.5px] text-ink-2 hover:bg-inset hover:text-ink disabled:text-ink-3"
                      >
                        <span className="min-w-0 flex-1 truncate">{entry.title}</span>
                        {entry.page != null && <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{entry.page}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-8 text-center text-[12.5px] text-ink-3">{t('This document has no contents list. Search it instead.')}</p>
              )
            ) : (
              <div className="p-3">
                <form onSubmit={(event) => { event.preventDefault(); void runSearch(query) }}>
                  <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Find in this document…')} />
                </form>
                {searching && <p className="mt-3 text-[12.5px] text-ink-3">{t('Searching…')}</p>}
                {!searching && hits?.length === 0 && <p className="mt-3 text-[12.5px] text-ink-3">{t('No match in this document.')}</p>}
                {!searching && hits && hits.length > 0 && (
                  <ul className="mt-3 divide-y divide-line">
                    {hits.map((hit) => (
                      <li key={hit.page}>
                        <button type="button" onClick={() => goToPage(hit.page)} className="w-full py-2.5 text-start hover:bg-inset">
                          <span className="tnum font-mono text-[11px] text-accent-strong">{t('Page')} {hit.page}</span>
                          <span className="mt-0.5 block text-[12px] leading-relaxed text-ink-2">{hit.snippet}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </aside>
        )}

        <div ref={scrollerRef} className="min-h-0 overflow-y-auto overscroll-contain px-3 py-4 sm:px-6">
          {loading && <p className="py-16 text-center text-[13px] text-ink-3">{t('Opening…')}</p>}

          {!loading && unavailable && (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="text-[14px] font-semibold text-ink">{t('Source file not uploaded yet')}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-3">
                {API_MODE
                  ? t('This resource is catalogued, but its file has not been added.')
                  : t('Files are available once this deployment is connected to its library.')}
              </p>
              {resource.meta && <p className="mt-3 font-mono text-[11.5px] text-ink-3">{resource.meta}</p>}
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="text-[14px] font-semibold text-ink">{error}</p>
              <Button
                className="mt-4"
                variant="secondary"
                size="sm"
                iconLeft={ExternalLink}
                onClick={() => void apiOpenFile(`/medical-resources/${encodeURIComponent(resource.id)}`)}
              >
                {t('Open it in a new tab instead')}
              </Button>
            </div>
          )}

          {doc && pages.map((page) => (
            <PdfPage
              key={page.number}
              doc={doc}
              page={page}
              zoom={zoom}
              root={scrollerRef}
              register={(node) => {
                if (node) pageRefs.current.set(page.number, node)
                else pageRefs.current.delete(page.number)
              }}
            />
          ))}
        </div>
      </div>

      {/* Keeps the address bar honest, so this page can be linked to and shared. */}
      <PageSync page={current} params={params} setParams={setParams} />
    </div>
  )
}

/** Writes the current page into the URL without pushing a history entry per scroll. */
function PageSync({ page, params, setParams }: { page: number; params: URLSearchParams; setParams: (next: URLSearchParams, options?: { replace?: boolean }) => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (Number(params.get('page')) === page) return
      const next = new URLSearchParams(params)
      next.set('page', String(page))
      setParams(next, { replace: true })
    }, 400)
    return () => window.clearTimeout(timer)
  }, [page, params, setParams])
  return null
}

/**
 * One page, drawn only when it is near the viewport.
 *
 * The placeholder keeps the page's real height from the start, so the scrollbar
 * is accurate before anything has rendered and scrolling never jumps.
 */
function PdfPage({
  doc,
  page,
  zoom,
  root,
  register,
}: {
  doc: PDFDocumentProxy
  page: PageState
  zoom: number
  root: React.RefObject<HTMLDivElement | null>
  register: (node: HTMLDivElement | null) => void
}) {
  const holder = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [near, setNear] = useState(false)
  const width = useMemo(() => page.width * zoom, [page.width, zoom])
  const height = useMemo(() => page.height * zoom, [page.height, zoom])

  useEffect(() => {
    const node = holder.current
    if (!node) return
    // A generous margin means a page is drawn before it is scrolled to, so
    // reading downwards never waits.
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { root: root.current, rootMargin: '1200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [root])

  useEffect(() => {
    if (!near) return
    let cancelled = false
    let task: { cancel: () => void } | null = null

    void (async () => {
      const rendered = await doc.getPage(page.number)
      if (cancelled) return
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (!canvas || !context) return
      // Draw at device resolution, then let CSS size it back down, so text is
      // sharp on a retina screen rather than upscaled.
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const viewport = rendered.getViewport({ scale: zoom * ratio })
      canvas.width = viewport.width
      canvas.height = viewport.height
      const render = rendered.render({ canvas, canvasContext: context, viewport })
      task = render
      try { await render.promise } catch { /* superseded by a newer zoom */ }
    })()

    return () => { cancelled = true; task?.cancel() }
  }, [doc, near, page.number, zoom])

  return (
    <div
      ref={(node) => { holder.current = node; register(node) }}
      data-page={page.number}
      className="mx-auto mb-4 overflow-hidden rounded-lg border border-line bg-surface shadow-panel"
      style={{ width, maxWidth: '100%' }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', aspectRatio: `${page.width} / ${page.height}` }} />
      {!near && <div style={{ height }} aria-hidden />}
    </div>
  )
}
