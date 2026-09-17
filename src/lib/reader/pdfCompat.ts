/**
 * Runtime shims for the JS APIs pdfjs-dist@6 calls unconditionally but which
 * mobile Safari / older Android WebViews do not ship yet.
 *
 * pdf.js 6.2 calls `Map.prototype.getOrInsertComputed` (a 2024/2025 TC39
 * proposal, absent even in current Node) as the FIRST statement of
 * `PDFPageProxy.render()`, plus `Promise.withResolvers` (Safari 17.4+) and
 * `Uint8Array` base64 codecs (Safari 18.4+). None are polyfilled by the
 * bundle, so on a phone below those versions `render()` throws synchronously
 * and the page canvas stays blank — while desktop Chrome (which has them)
 * renders fine. esbuild's `target` downlevels syntax only; it cannot add a
 * missing runtime method. So we add them ourselves, idempotently, and import
 * this module into BOTH the main thread and the pdf worker (separate realms).
 *
 * The implementations are exported so they can be unit-tested directly (the
 * install below is a no-op wherever the engine already ships the real API).
 */

export function getOrInsertComputed<K, V>(
  this: Map<K, V> | WeakMap<K & object, V>,
  key: K,
  callback: (key: K) => V,
): V {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = this as any
  if (map.has(key)) return map.get(key)
  const value = callback(key)
  map.set(key, value)
  return value
}

export function withResolvers<T>(): {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: unknown) => void
} {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej })
  return { promise, resolve, reject }
}

export function toBase64(bytes: Uint8Array, options?: { alphabet?: string }): string {
  let binary = ''
  // Chunked to avoid blowing the argument limit of String.fromCharCode on big buffers.
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  const base64 = btoa(binary)
  return options?.alphabet === 'base64url'
    ? base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    : base64
}

export function fromBase64(source: string, options?: { alphabet?: string }): Uint8Array {
  const normalized = options?.alphabet === 'base64url'
    ? source.replace(/-/g, '+').replace(/_/g, '/')
    : source
  const binary = atob(normalized)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function define(target: object, name: string, value: unknown): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (target as any)[name] !== 'function') {
    Object.defineProperty(target, name, { value, writable: true, configurable: true })
  }
}

// The TC39 "upsert" proposal adds this to both Map and WeakMap.
define(Map.prototype, 'getOrInsertComputed', getOrInsertComputed)
define(WeakMap.prototype, 'getOrInsertComputed', getOrInsertComputed)
if (typeof (Promise as { withResolvers?: unknown }).withResolvers !== 'function') {
  ;(Promise as { withResolvers?: unknown }).withResolvers = withResolvers
}
define(Uint8Array.prototype, 'toBase64', function (this: Uint8Array, options?: { alphabet?: string }) {
  return toBase64(this, options)
})
if (typeof (Uint8Array as { fromBase64?: unknown }).fromBase64 !== 'function') {
  ;(Uint8Array as { fromBase64?: unknown }).fromBase64 = fromBase64
}
