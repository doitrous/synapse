/**
 * Who wins when a browser holds a crash-recovery copy of a document that the
 * server also has: the local copy, or the stored one?
 *
 * A recovery copy exists for one reason — to survive a write that never reached
 * the server. So it may only win when it is genuinely newer than what the server
 * holds. If it wins unconditionally, an idle tab shows stale data and then
 * re-uploads it, silently reverting anything written server-side since. That is
 * how a completed migration can appear not to have happened.
 */
export function recoveryCopyWins(
  savedAt: string | null | undefined,
  serverUpdatedAt: string | null | undefined,
): boolean {
  if (savedAt == null) return false
  const saved = Date.parse(savedAt)
  // A recovery copy with an unreadable timestamp cannot be shown to be newer.
  if (Number.isNaN(saved)) return false
  if (serverUpdatedAt == null) return true
  const server = Date.parse(serverUpdatedAt)
  // No usable server timestamp — an older server, or a key never written — so
  // there is nothing to compare against and the offline edit is kept.
  if (Number.isNaN(server)) return true
  // Strictly newer: an equal timestamp means the server already has this write.
  return saved > server
}
