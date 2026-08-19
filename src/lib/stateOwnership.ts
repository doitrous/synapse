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
  // `marks` is the student's highlights and sticky notes on library articles.
  // Left out of this list it would be routed to the shared catalogue store,
  // which only an admin may write — so every save a student made would be
  // refused by the server and dropped.
  /^synapse\.library\.(read|userArticles|personalTags|marks)/,
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
