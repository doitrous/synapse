/**
 * The sql.js WebAssembly binary, resolved by Vite to a hashed, content-addressed
 * asset URL under `/assets/`.
 *
 * This is imported ONLY from the browser branch of `loadSqlJs` (via a dynamic
 * import), never under Node — `?url` is a Vite-only suffix that Node's module
 * resolver cannot load, and Node locates the wasm on disk instead.
 *
 * Why not a hardcoded `/sql-wasm.wasm`: in production the app is served by an
 * Express SPA catch-all, so a request for a root path that isn't a real static
 * file comes back as `index.html`. Handing that HTML to `WebAssembly.instantiate`
 * fails with "expected magic word 00 61 73 6d, found 3c 21 64 6f" (`<!do…`). A
 * bundled `/assets/…` URL is emitted by the build and served by the same static
 * handler that serves the app's JS, so it resolves in dev and prod alike.
 */
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'

export default wasmUrl
