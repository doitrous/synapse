/**
 * Our own pdf.js worker entry: install the runtime shims into the worker
 * realm FIRST (it has its own global scope and inherits nothing from the main
 * thread), then hand off to pdf.js's real worker. Loaded via `workerPort` in
 * usePdfDocument so page parsing still happens off the main thread.
 */
import '@/lib/reader/pdfCompat'
import 'pdfjs-dist/build/pdf.worker.mjs'
