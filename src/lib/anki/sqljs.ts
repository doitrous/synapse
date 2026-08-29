import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

let cached: Promise<SqlJsStatic> | null = null

/**
 * Resolve the sql.js wasm file on disk when running under Node (tests, SSR,
 * scripts). We can't just use `new URL(..., import.meta.url).pathname` — on a
 * repo path containing spaces or other reserved characters, `.pathname` stays
 * percent-encoded (e.g. `%20`) and `existsSync`/`readFileSync` then fail to
 * find a file that is actually there. `fileURLToPath` decodes correctly.
 *
 * Primary resolution is relative to this module's own location (works no
 * matter the process cwd); if that doesn't exist on disk for some reason, we
 * fall back to resolving from `process.cwd()`.
 */
function locateNodeWasm(file: string): string {
  const viaModuleUrl = fileURLToPath(
    new URL(`../../../node_modules/sql.js/dist/${file}`, import.meta.url),
  )
  if (existsSync(viaModuleUrl)) return viaModuleUrl

  const viaCwd = fileURLToPath(
    new URL(`node_modules/sql.js/dist/${file}`, `file://${process.cwd()}/`),
  )
  return viaCwd
}

/**
 * Load sql.js once and cache the promise. In the browser the wasm is served
 * from `/sql-wasm.wasm` (vendored into `public/`, no CDN fetch — CSP-safe).
 * Under Node (e.g. `node --test`) `locateFile` resolves the wasm file from
 * `node_modules/sql.js/dist/` on disk.
 */
export function loadSqlJs(): Promise<SqlJsStatic> {
  if (!cached) {
    cached = initSqlJs({
      locateFile: (file: string) =>
        typeof window === 'undefined' ? locateNodeWasm(file) : `/${file}`,
    })
  }
  return cached
}

/** Open an existing SQLite database from its raw bytes. */
export async function openDb(bytes: Uint8Array): Promise<Database> {
  const SQL = await loadSqlJs()
  return new SQL.Database(bytes)
}

/** Create a fresh, empty in-memory SQLite database. */
export async function newDb(): Promise<Database> {
  const SQL = await loadSqlJs()
  return new SQL.Database()
}
