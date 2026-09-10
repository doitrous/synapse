import { useCallback, useEffect, useState } from 'react'
import { API_MODE, apiGet, apiPost } from './api'

/**
 * The friend graph, as the server holds it.
 *
 * Nothing is invented in the browser: a friendship needs two people to agree,
 * so the only honest source is the server that both of them talk to.
 */

export interface FriendProfile {
  userId: string
  displayName: string
  universityId: string | null
  year: string | null
  /** Self-set, shown read-only next to the name. See status_message in accounts.js. */
  statusMessage?: string | null
}

export const FRIEND_REFUSALS: Record<string, string> = {
  invalid_target: 'That student could not be found.',
  already_pending: 'You have already asked. They have not answered yet.',
  already_friends: 'You are already friends.',
  not_pending: 'That request has already been answered.',
  expired: 'That invite link has expired. Ask for a new one.',
  used: 'That invite link has already been used.',
  self: 'That is your own invite link.',
  facebook_disabled: 'Finding friends through Facebook is not switched on yet.',
  already_linked: 'That Facebook account is already connected to another student here.',
}

export function useFriends() {
  const [friends, setFriends] = useState<FriendProfile[]>([])
  const [incoming, setIncoming] = useState<FriendProfile[]>([])
  const [outgoing, setOutgoing] = useState<FriendProfile[]>([])
  const [blocked, setBlocked] = useState<FriendProfile[]>([])
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) { setLoading(false); return }
    try {
      const data = await apiGet<{
        friends: FriendProfile[]
        requests: { incoming: FriendProfile[]; outgoing: FriendProfile[] }
        blocked: FriendProfile[]
      }>('/friends')
      setFriends(data?.friends ?? [])
      setIncoming(data?.requests?.incoming ?? [])
      setOutgoing(data?.requests?.outgoing ?? [])
      setBlocked(data?.blocked ?? [])
    } catch {
      setFriends([])
      setIncoming([])
      setOutgoing([])
      setBlocked([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])

  // The POST has already decided `ok`/`reason` by the time it resolves — the
  // reload after it is only picking up a graph a second device might also
  // have changed, so it no longer holds the caller up. `respond`/`remove`
  // below skip it more or less entirely: they already know the shape of their
  // own change and apply it straight to `friends`/`incoming`/`outgoing`.
  const request = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean; reason?: string }>('/friends/request', { userId })
    void reload()
    return result
  }, [reload])

  const respond = useCallback(async (userId: string, accept: boolean) => {
    // Captured from inside the updater rather than read off `incoming` in
    // this closure, so `respond`'s identity stays stable across renders (it
    // is threaded down as a prop) and a concurrent request answered
    // elsewhere is never read stale.
    let person: FriendProfile | null = null
    setIncoming((current) => {
      const match = current.find((entry) => entry.userId === userId) ?? null
      person = match
      return match ? current.filter((entry) => entry.userId !== userId) : current
    })
    if (accept && person) {
      const added = person
      setFriends((current) => (current.some((entry) => entry.userId === userId) ? current : [...current, added]))
    }
    // Undoes only this call's own effect — a second, unrelated request
    // answered in between must not be put back or clobbered by this restore.
    const undo = () => {
      if (person) {
        const restored = person
        setIncoming((current) => (current.some((entry) => entry.userId === userId) ? current : [...current, restored]))
      }
      if (accept) setFriends((current) => current.filter((entry) => entry.userId !== userId))
    }
    try {
      const result = await apiPost<{ ok: boolean; reason?: string }>('/friends/respond', { userId, accept })
      if (!result.ok) undo()
      else void reload()
      return result
    } catch (error) {
      undo()
      throw error
    }
  }, [reload])

  const remove = useCallback(async (userId: string) => {
    let removed: FriendProfile | null = null
    setFriends((current) => {
      const match = current.find((entry) => entry.userId === userId) ?? null
      removed = match
      return match ? current.filter((entry) => entry.userId !== userId) : current
    })
    // ponytail: rollback re-appends rather than restoring the exact original
    // position; a failed remove is rare, and the next reload fixes ordering.
    const undo = () => {
      if (removed) {
        const restored = removed
        setFriends((current) => (current.some((entry) => entry.userId === userId) ? current : [...current, restored]))
      }
    }
    try {
      const result = await apiPost<{ ok: boolean }>('/friends/remove', { userId })
      if (!result.ok) undo()
      else void reload()
      return result
    } catch (error) {
      undo()
      throw error
    }
  }, [reload])

  // Blocking touches three things a reload already recomputes correctly — the
  // friends list (a block removes any friendship), the directory (a blocked
  // user stops appearing server-side), and the blocked list itself — so this
  // reloads afterwards rather than guessing the new state like `remove` does.
  const block = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean; reason?: string }>('/friends/block', { userId })
    void reload()
    return result
  }, [reload])

  const unblock = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean }>('/friends/unblock', { userId })
    void reload()
    return result
  }, [reload])

  // Minting needs no reload: nothing about the viewer's own friend graph
  // changes until someone else redeems the link.
  const mintInvite = useCallback(async () => {
    return apiPost<{ token: string }>('/friends/invite')
  }, [])

  const redeemInvite = useCallback(async (token: string) => {
    const result = await apiPost<{ ok: boolean; reason?: string; userId?: string }>('/friends/invite/redeem', { token })
    void reload()
    return result
  }, [reload])

  // A search, not a mutation: nothing about the viewer's own graph changes
  // until a request is actually sent, so there is nothing here to reload.
  const searchDirectory = useCallback(async (query: string) => {
    return apiGet<{ people: FriendProfile[] }>(`/friends/directory?q=${encodeURIComponent(query)}`)
  }, [])

  // Points this account at a Facebook id. Reloading afterwards is what turns
  // `already_linked` into a message rather than a silent no-op: the graph
  // itself never changes from this call, only the link that feeds matching.
  const linkFacebook = useCallback(async (fbUserId: string) => {
    return apiPost<{ ok: boolean; reason?: string }>('/friends/facebook/link', { fbUserId })
  }, [])

  const unlinkFacebook = useCallback(async () => {
    return apiPost<{ ok: boolean }>('/friends/facebook/unlink')
  }, [])

  // A search, exactly like `searchDirectory`, over a different source: the
  // caller's own Facebook friend ids rather than a name. Nothing about the
  // viewer's graph changes until a match is actually sent a request.
  const matchFacebook = useCallback(async (fbFriendIds: string[]) => {
    return apiPost<{ people: FriendProfile[] }>('/friends/facebook/match', { fbFriendIds })
  }, [])

  return {
    friends, incoming, outgoing, blocked, loading, reload, request, respond, remove,
    block, unblock,
    mintInvite, redeemInvite, searchDirectory, linkFacebook, unlinkFacebook, matchFacebook,
  }
}
