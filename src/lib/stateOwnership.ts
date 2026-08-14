/**
 * Student-owned state is never stored in the shared catalogue document store.
 * The API derives the owner from the verified session; these patterns only
 * choose the endpoint and are not themselves a security boundary.
 */
const USER_OWNED_PATTERNS = [
  /^synapse-lang$/,
  /^synapse\.notebook\./,
  /^synapse\.whiteboard\./,
  /^synapse\.calendar\.blocks$/,
  /^synapse\.library\.(read|userArticles|personalTags)/,
  /^synapse\.account\./,
  /^synapse-notification-read-v1-/,
  /^synapse-applied-voucher-v1$/,
  /^synapse\.qbank\./,
  /^synapse\.practical\./,
  /^synapse\.highlights\./,
  /^synapse\.annotations\./,
  /^synapse\.reader\./,
  /^synapse\.bookmarks\./,
  /^synapse\.progress\./,
]

export function isUserOwnedState(key: string): boolean {
  return USER_OWNED_PATTERNS.some((pattern) => pattern.test(key))
}
