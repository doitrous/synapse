import { mkdir, writeFile } from 'node:fs/promises'

const websocketUrl = process.argv[2]
const outputDirectory = process.argv[3] ?? '/private/tmp/osler-mobile-scenarios'
if (!websocketUrl) throw new Error('Pass the Chrome DevTools websocket URL.')

const scenarios = [
  { name: 'question-editor', route: '/admin/questions', label: 'Add question' },
  { name: 'article-editor', route: '/admin/library', label: 'Add article' },
  { name: 'practical-editor', route: '/admin/practical', label: 'Add practical item' },
  { name: 'curriculum-editor', route: '/admin/academic', label: 'Curriculum' },
  { name: 'schedule-editor', route: '/admin/academic', label: 'Schedule' },
  { name: 'calendar-block', route: '/app/calendar', label: 'Add block' },
  { name: 'practical-runner', route: '/app/practical', label: 'Start' },
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
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  })
  for (const scenario of scenarios) {
    await call('Page.navigate', { url: `http://127.0.0.1:5175${scenario.route}` })
    await wait(400)
    await call('Runtime.evaluate', {
      expression: `(() => {
        const target = [...document.querySelectorAll('button')].find((button) =>
          button.textContent.trim().startsWith(${JSON.stringify(scenario.label)})
        );
        target?.click();
        return Boolean(target);
      })()`,
    })
    await wait(350)
    const capture = await call('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    })
    await writeFile(`${outputDirectory}/${scenario.name}.png`, Buffer.from(capture.result.data, 'base64'))
  }
  socket.close()
})
