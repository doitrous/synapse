import { useCallback, useEffect, useRef, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { buildPageText, findMatches, type Match, type PageText } from '@/lib/reader/searchIndex'

/**
 * Search that finds everything and can be called off.
 *
 * The old scan awaited each page in turn with no abort, kept the first hit per
 * page and stopped at eighty — so typing a second character raced the first
 * search, and a page mentioning a term four times reported it once.
 *
 * Pages are read once and cached for the session. The cache is memory only:
 * a book's extracted text is megabytes, and it belongs to the document, not to
 * the student.
 */

const PAGES_PER_SLICE = 10
const MAX_MATCHES = 500

export interface SearchState {
  query: string
  matches: Match[]
  /** Index into `matches`, or -1 before anything is stepped to. */
  currentIndex: number
  /** Pages scanned so far, for a progress line on a long document. */
  scanned: number
  total: number
  running: boolean
  truncated: boolean
}

const IDLE: SearchState = { query: '', matches: [], currentIndex: -1, scanned: 0, total: 0, running: false, truncated: false }

export function useDocumentSearch(doc: PDFDocumentProxy | null) {
  const [state, setState] = useState<SearchState>(IDLE)
  const cache = useRef(new Map<number, PageText>())
  const run = useRef(0)

  useEffect(() => { cache.current = new Map(); setState(IDLE) }, [doc])
  useEffect(() => () => { run.current += 1 }, [])

  const search = useCallback(async (query: string) => {
    // Every call invalidates the one before it, which is what makes typing safe.
    const token = ++run.current
    if (!doc || !query.trim()) { setState({ ...IDLE, query }); return }

    setState({ query, matches: [], currentIndex: -1, scanned: 0, total: doc.numPages, running: true, truncated: false })
    const found: Match[] = []

    for (let page = 1; page <= doc.numPages; page += 1) {
      if (run.current !== token) return
      let text = cache.current.get(page)
      if (!text) {
        const loaded = await doc.getPage(page)
        if (run.current !== token) return
        const content = await loaded.getTextContent()
        text = buildPageText(page, content.items.map((item) => ({ str: 'str' in item ? item.str : '' })))
        cache.current.set(page, text)
        loaded.cleanup()
      }
      found.push(...findMatches(text, query))

      if (page % PAGES_PER_SLICE === 0 || page === doc.numPages || found.length >= MAX_MATCHES) {
        const truncated = found.length >= MAX_MATCHES
        const matches = truncated ? found.slice(0, MAX_MATCHES) : [...found]
        setState({
          query, matches, currentIndex: matches.length ? 0 : -1,
          scanned: page, total: doc.numPages, running: !truncated && page < doc.numPages, truncated,
        })
        if (truncated) return
        // Yield, so a long document does not freeze the interface it is in.
        await new Promise((resolve) => setTimeout(resolve, 0))
      }
    }
  }, [doc])

  const step = useCallback((direction: 1 | -1) => {
    setState((current) => {
      if (!current.matches.length) return current
      const next = (current.currentIndex + direction + current.matches.length) % current.matches.length
      return { ...current, currentIndex: next }
    })
  }, [])

  const goTo = useCallback((index: number) => {
    setState((current) => ({ ...current, currentIndex: index }))
  }, [])

  const clear = useCallback(() => { run.current += 1; setState(IDLE) }, [])

  return { ...state, search, step, goTo, clear }
}
