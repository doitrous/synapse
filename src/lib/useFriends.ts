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
  const [loading, setLoading] = useState(API_MODE)

  const reload = useCallback(async () => {
    if (!API_MODE) { setLoading(false); return }
    try {
      const data = await apiGet<{ friends: FriendProfile[]; requests: { incoming: FriendProfile[]; outgoing: FriendProfile[] } }>('/friends')
      setFriends(data?.friends ?? [])
      setIncoming(data?.requests?.incoming ?? [])
      setOutgoing(data?.requests?.outgoing ?? [])
    } catch {
      setFriends([])
      setIncoming([])
      setOutgoing([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void reload() }, [reload])

  const request = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean; reason?: string }>('/friends/request', { userId })
    await reload()
    return result
  }, [reload])

  const respond = useCallback(async (userId: string, accept: boolean) => {
    const result = await apiPost<{ ok: boolean; reason?: string }>('/friends/respond', { userId, accept })
    await reload()
    return result
  }, [reload])

  const remove = useCallback(async (userId: string) => {
    const result = await apiPost<{ ok: boolean }>('/friends/remove', { userId })
    await reload()
    return result
  }, [reload])

  // Minting needs no reload: nothing about the viewer's own friend graph
  // changes until someone else redeems the link.
  const mintInvite = useCallback(async () => {
    return apiPost<{ token: string }>('/friends/invite')
  }, [])

  const redeemInvite = useCallback(async (token: string) => {
    const result = await apiPost<{ ok: boolean; reason?: string; userId?: string }>('/friends/invite/redeem', { token })
    await reload()
    return result
  }, [reload])

  // A search, not a mutation: nothing about the viewer's own graph changes
  // until a request is actually sent, so there is nothing here to reload.
  const searchDirectory = useCallback(async (query: string) => {
    return apiGet<{ people: FriendProfile[] }>(`/friends/directory?q=${encodeURIComponent(query)}`)
  }, [])

  return { friends, incoming, outgoing, loading, reload, request, respond, remove, mintInvite, redeemInvite, searchDirectory }
}
