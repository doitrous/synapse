/**
 * Which module or year a library tree belongs to.
 *
 * The scope is the key the tree is stored under, which is what makes a
 * reviewer's permission on it exact: `year:OMS_Y2` is Year 2's tree and nothing
 * else's. The generated taxonomy could not be scoped this way — its nodes carry
 * no module or year at all — which is why that surface stayed editor-only.
 *
 * No database and no Express, so the rule is testable on its own.
 */

export const LIBRARY_TREES_STATE_KEY = 'synapse-library-trees-v1'

const KINDS = ['module', 'year']

export function treeScope(kind, id) {
  return `${kind}:${id}`
}

/**
 * The module or year a scope names, or null.
 *
 * Split on the *first* colon only: a module id is typed by a person — "101 ISK"
 * today, anything tomorrow — and one containing a colon must survive rather than
 * being truncated into a different module's tree.
 */
export function parseTreeScope(key) {
  if (typeof key !== 'string') return null
  const separator = key.indexOf(':')
  if (separator < 1) return null
  const kind = key.slice(0, separator)
  const id = key.slice(separator + 1)
  if (!KINDS.includes(kind) || !id) return null
  return { kind, id }
}
