import { useCallback, useEffect, useState } from 'react'
import { apiPost } from './api'

/**
 * Web push subscribe/unsubscribe flow for QotD reminders.
 *
 * `supported` gates whether a caller should render the control at all —
 * Safari on iOS below 16.4 and any browser without `PushManager` never sees
 * it. `subscribe()` walks the full permission → registration → subscription
 * → server-registration chain and reports `false` at any step that fails
 * rather than throwing: a declined permission prompt is an ordinary outcome
 * here, not an error the caller needs to catch.
 *
 * The server never sees the VAPID *private* key — only `webPush.js` does.
 * The client only ever needs the public key, read from
 * `VITE_VAPID_PUBLIC_KEY`; with it unset, `subscribe()` simply returns false.
 */
export interface UseWebPushState {
  supported: boolean
  permission: NotificationPermission | 'unsupported'
  subscribed: boolean
  subscribe: () => Promise<boolean>
  unsubscribe: () => Promise<boolean>
}

/** Web push wants the VAPID key as a raw Uint8Array, not the base64url string it is issued as. */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i += 1) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}

const SUPPORTED =
  typeof navigator !== 'undefined' && 'serviceWorker' in navigator &&
  typeof window !== 'undefined' && 'PushManager' in window

export function useWebPush(): UseWebPushState {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(
    SUPPORTED && typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
  )
  const [subscribed, setSubscribed] = useState(false)

  // Reflect an existing subscription (e.g. granted in a previous session) once
  // on mount, so the control shows "subscribed" without the student having to
  // click through the flow again.
  useEffect(() => {
    if (!SUPPORTED) return
    let alive = true
    navigator.serviceWorker
      .getRegistration('/sw.js')
      .then((registration) => registration?.pushManager.getSubscription() ?? null)
      .then((subscription) => { if (alive) setSubscribed(Boolean(subscription)) })
      .catch(() => { /* no existing registration — stay unsubscribed */ })
    return () => { alive = false }
  }, [])

  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!SUPPORTED) return false
    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined
    if (!vapidKey) return false

    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      const result = await Notification.requestPermission()
      setPermission(result)
      if (result !== 'granted') return false

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        // `BufferSource` here, not the DOM lib's newer `Uint8Array<ArrayBuffer>` —
        // a plain Uint8Array built from a string is typed `ArrayBufferLike`,
        // which the stricter alias rejects even though every runtime accepts it.
        applicationServerKey: urlBase64ToUint8Array(vapidKey) as BufferSource,
      })
      await apiPost('/devices', { platform: 'web', subscription })
      setSubscribed(true)
      return true
    } catch {
      return false
    }
  }, [])

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!SUPPORTED) return false
    try {
      const registration = await navigator.serviceWorker.getRegistration('/sw.js')
      const subscription = (await registration?.pushManager.getSubscription()) ?? null
      const endpoint = subscription?.endpoint
      await subscription?.unsubscribe()
      if (endpoint) await apiPost('/devices/web/unsubscribe', { endpoint })
      setSubscribed(false)
      return true
    } catch {
      return false
    }
  }, [])

  return { supported: SUPPORTED, permission, subscribed, subscribe, unsubscribe }
}
