/**
 * Web push service worker.
 *
 * Two events only: `push` shows the notification the server sent (title/body/
 * path — see `server/src/webPush.js`), and `notificationclick` routes the tap
 * into the QotD page, reusing an already-open tab when there is one instead of
 * always opening a new one.
 */

self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch { data = {} }

  const title = data.title || 'Question of the Day'
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "Today's question is waiting.",
      icon: '/brand/nishany-mark.png',
      badge: '/favicon.png',
      data: { path: data.path || '/app/qotd' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const path = event.notification.data?.path || '/app/qotd'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      const existing = wins.find((w) => 'focus' in w)
      if (existing) {
        existing.focus()
        if ('navigate' in existing) existing.navigate(path)
        return undefined
      }
      return clients.openWindow(path)
    }),
  )
})
