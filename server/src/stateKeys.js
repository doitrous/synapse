/**
 * Forward-compatibility for the state-key rebrand.
 *
 * Every persisted document used to be addressed with a `synapse…` key; the
 * platform is now Nishany and both the app and this server address each
 * document as `nishany…`. The stored rows are renamed once, in `migrate()`, so
 * the row and the code agree — but a browser still running the pre-rebrand
 * bundle keeps sending the old key until it reloads. This maps that old key
 * forward to the migrated row, so such a request is served correctly rather
 * than reading as an empty document. A current `nishany…` key passes straight
 * through.
 */

// [retired prefix, current prefix]. The three separators the keys use.
const PREFIX_PAIRS = [
  ['synapse-', 'nishany-'],
  ['synapse.', 'nishany.'],
  ['synapse:', 'nishany:'],
]

/** A request's key (possibly from an old bundle) → the current stored key. */
export function canonicalStateKey(key) {
  if (typeof key !== 'string') return key
  for (const [retired, current] of PREFIX_PAIRS) {
    if (key.startsWith(retired)) return current + key.slice(retired.length)
  }
  return key
}
