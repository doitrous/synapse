import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js'

let cached: Promise<SqlJsStatic> | null = null

/**
 * Minimal shapes of the two Node builtins we need at runtime under Node
 * (tests, scripts) but must never reference statically: this module ships in
 * the browser bundle, checked against a browser-only tsconfig that carries no
 * `@types/node` at all (`types: ["vite/client"]`). TypeScript special-cases
 * `node:*` specifiers — even a literal `import('node:fs')` inside a dynamic
 * `import()`, or a `declare module 'node:fs'` augmentation, gets rejected
 * ("cannot be found... install @types/node") because that program has no
 * Node types to resolve or augment. Passing the specifier through a plain
 * string parameter (see `importNode` below) keeps it a runtime-only value:
 * TypeScript never tries to resolve a non-literal specifier, so it types the
 * dynamic import as `Promise<any>` and we cast it to the shape we need here.
 */
interface NodeUrlModule {
  fileURLToPath(url: URL | string): string
}
interface NodeFsModule {
  existsSync(path: string): boolean
}
interface NodeProcessModule {
  cwd(): string
}

async function importNode<T>(specifier: string): Promise<T> {
  return (await import(specifier)) as T
}

/**
 * Resolve the sql.js wasm file on disk when running under Node (tests, SSR,
 * scripts). We can't just use `new URL(..., import.meta.url).pathname` — on a
 * repo path containing spaces or other reserved characters, `.pathname` stays
 * percent-encoded (e.g. `%20`) and `existsSync`/`readFileSync` then fail to
 * find a file that is actually there. `fileURLToPath` decodes correctly.
 *
 * Primary resolution is relative to this module's own location (works no
 * matter the process cwd); if that doesn't exist on disk for some reason, we
 * fall back to resolving from the current working directory.
 */
async function locateNodeWasm(file: string): Promise<string> {
  const { fileURLToPath } = await importNode<NodeUrlModule>('node:url')
  const { existsSync } = await importNode<NodeFsModule>('node:fs')

  const viaModuleUrl = fileURLToPath(
    new URL(`../../../node_modules/sql.js/dist/${file}`, import.meta.url),
  )
  if (existsSync(viaModuleUrl)) return viaModuleUrl

  const { cwd } = await importNode<NodeProcessModule>('node:process')
  return fileURLToPath(new URL(`node_modules/sql.js/dist/${file}`, `file://${cwd()}/`))
}

/**
 * Load sql.js once and cache the promise. In the browser the wasm is a Vite
 * asset URL (hashed, under `/assets/`, served by the same static handler as the
 * app's JS in dev and prod — see `sqljsWasmUrl.ts` for why a root path fails).
 * Under Node (e.g. `node --test`) `locateFile` resolves the wasm file from
 * `node_modules/sql.js/dist/` on disk. Either way resolution happens once,
 * before `initSqlJs` is called, so the `locateFile` callback stays a plain
 * synchronous function (sql.js does not await it). The `?url` import lives in a
 * separate module loaded only here, in the browser, so Node never sees it.
 */
export function loadSqlJs(): Promise<SqlJsStatic> {
  if (!cached) {
    cached = (async () => {
      const wasmPath =
        typeof window === 'undefined'
          ? await locateNodeWasm('sql-wasm.wasm')
          : (await import('./sqljsWasmUrl.ts')).default

      return initSqlJs({
        locateFile: (file: string) => wasmPath ?? `/${file}`,
      })
    })()
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
