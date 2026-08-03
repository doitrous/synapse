import { mkdir, writeFile } from 'node:fs/promises'

const websocketUrl = process.argv[2]
const outputDirectory = process.argv[3] ?? '/private/tmp/osler-mobile-captures'
const viewportWidth = Number(process.argv[4] ?? 390)
const viewportHeight = Number(process.argv[5] ?? 844)

if (!websocketUrl) throw new Error('Pass the Chrome DevTools websocket URL.')

const routes = [
  '/app', '/app/library', '/app/qbank', '/app/practical', '/app/resources',
  '/app/calendar', '/app/performance', '/app/whiteboard', '/app/notebook',
  '/app/study-together', '/app/billing', '/app/account', '/admin',
  '/admin/academic', '/admin/library', '/admin/questions', '/admin/practical',
  '/admin/resources', '/admin/email', '/admin/payments', '/admin/privacy',
  '/admin/reports', '/admin/notifications', '/admin/vouchers',
  '/admin/import/question', '/admin/import/article', '/admin/import/practical',
  '/admin/import/resource', '/admin/settings', '/admin/audit',
]

const socket = new WebSocket(websocketUrl)
let nextId = 0
const pending = new Map()

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  const resolve = pending.get(message.id)
  if (resolve) {
    pending.delete(message.id)
    resolve(message)
  }
})

function call(method, params = {}) {
  return new Promise((resolve) => {
    const id = ++nextId
    pending.set(id, resolve)
    socket.send(JSON.stringify({ id, method, params }))
  })
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

socket.addEventListener('open', async () => {
  await mkdir(outputDirectory, { recursive: true })
  await call('Emulation.setDeviceMetricsOverride', {
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
    mobile: true,
  })

  for (const [index, route] of routes.entries()) {
    await call('Page.navigate', { url: `http://127.0.0.1:5175${route}` })
    await wait(350)
    const capture = await call('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    })
    const name = `${String(index + 1).padStart(2, '0')}-${route.slice(1).replaceAll('/', '-') || 'home'}.png`
    await writeFile(`${outputDirectory}/${name}`, Buffer.from(capture.result.data, 'base64'))
  }

  socket.close()
})
