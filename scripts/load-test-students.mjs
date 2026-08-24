#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises'
import http from 'node:http'
import https from 'node:https'
import { dirname, join, posix, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const JOURNEYS = [
  { name: 'dashboard', share: 0.35, route: '/app', chunk: 'Dashboard-' },
  { name: 'question-bank', share: 0.30, route: '/app/qbank', chunk: 'QuestionBank-' },
  { name: 'library', share: 0.20, route: '/app/library', chunk: 'Library-' },
  { name: 'practical', share: 0.15, route: '/app/practical', chunk: 'Practical-' },
]

function argument(name, fallback) {
  const exact = process.argv.find((value) => value.startsWith(`--${name}=`))
  return exact ? exact.slice(name.length + 3) : fallback
}

function positiveInteger(name, fallback) {
  const parsed = Number(argument(name, String(fallback)))
  if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`--${name} must be a positive integer`)
  return parsed
}

const target = new URL(argument('target', 'http://127.0.0.1:4173'))
const users = positiveInteger('users', 5_000)
const browserConnections = positiveInteger('browser-connections', 6)
const timeoutMs = positiveInteger('timeout-ms', 15_000)
const allowRemote = process.argv.includes('--allow-remote')
const localHosts = new Set(['127.0.0.1', 'localhost', '::1', '[::1]'])

if (target.username || target.password) throw new Error('Target must not include credentials')
if (!['http:', 'https:'].includes(target.protocol)) throw new Error('Target must use http or https')

if (!localHosts.has(target.hostname) && !allowRemote) {
  throw new Error(
    `Refusing to send a load test to ${target.origin}. `
    + 'Remote targets require the explicit --allow-remote flag.',
  )
}

if (allowRemote && localHosts.has(target.hostname)) {
  console.warn('--allow-remote was supplied, but the target is local; continuing with the local preview target.')
}

function percentile(sorted, value) {
  if (!sorted.length) return 0
  return sorted[Math.min(sorted.length - 1, Math.ceil(value * sorted.length) - 1)]
}

function rounded(value, digits = 1) {
  return Number(value.toFixed(digits))
}

async function buildJourneyResources() {
  const html = await readFile(join(DIST, 'index.html'), 'utf8')
  const assetNames = await readdir(join(DIST, 'assets'))
  const entry = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1]
  const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => match[1])
  const icon = html.match(/<link[^>]+rel="icon"[^>]+href="([^"]+)"/)?.[1]
  if (!entry) throw new Error('Could not find the production entry module in dist/index.html')

  async function moduleGraph(startPaths) {
    const found = new Set()
    const pending = [...startPaths]
    while (pending.length) {
      const current = pending.pop()
      if (!current || found.has(current)) continue
      found.add(current)
      const source = await readFile(join(DIST, current), 'utf8')
      const imports = [
        ...source.matchAll(/\bfrom\s*["'](\.\/[^"']+\.js)["']/g),
        ...source.matchAll(/\bimport\s*["'](\.\/[^"']+\.js)["']/g),
      ]
      for (const match of imports) {
        const resolvedPath = posix.normalize(posix.join(posix.dirname(current), match[1]))
        if (!found.has(resolvedPath)) pending.push(resolvedPath)
      }
    }
    return found
  }

  const fonts = new Set()
  for (const stylesheet of styles) {
    const css = await readFile(join(DIST, stylesheet), 'utf8')
    for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
      const relative = match[1].replace(/["']/g, '')
      if (!relative.includes('-latin-wght-normal-')) continue
      fonts.add(posix.normalize(posix.join(posix.dirname(stylesheet), relative)))
    }
  }

  const resources = new Map()
  for (const journey of JOURNEYS) {
    const routeAsset = assetNames.find((name) => name.startsWith(journey.chunk) && name.endsWith('.js'))
    if (!routeAsset) throw new Error(`Could not find ${journey.chunk}*.js; run npm run build first`)
    const modules = await moduleGraph([entry.replace(/^\//, ''), `assets/${routeAsset}`])
    resources.set(journey.name, [
      ...styles,
      ...(icon ? [icon] : []),
      ...fonts,
      ...modules,
    ].map((path) => `/${path.replace(/^\//, '')}`))
  }
  return resources
}

const resourcesByJourney = await buildJourneyResources()
const transport = target.protocol === 'https:' ? https : http
const agent = new transport.Agent({
  keepAlive: true,
  maxSockets: users,
  maxFreeSockets: Math.min(users, 1_000),
  scheduling: 'fifo',
})

const metrics = {
  requests: 0,
  failed: 0,
  bytes: 0,
  active: 0,
  peakActive: 0,
  durations: [],
  statuses: new Map(),
  errors: new Map(),
}

function count(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1)
}

function hit(pathname) {
  const started = performance.now()
  metrics.active += 1
  metrics.peakActive = Math.max(metrics.peakActive, metrics.active)

  return new Promise((resolveRequest) => {
    let settled = false
    const finish = (ok, statusOrError, bytes = 0) => {
      if (settled) return
      settled = true
      const duration = performance.now() - started
      metrics.requests += 1
      metrics.bytes += bytes
      metrics.active -= 1
      metrics.durations.push(duration)
      if (ok) count(metrics.statuses, String(statusOrError))
      else {
        metrics.failed += 1
        count(metrics.errors, String(statusOrError))
      }
      resolveRequest(ok)
    }

    const url = new URL(pathname, target)
    const request = transport.request(url, {
      agent,
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': 'Connect-Cortex-Student-Load-Simulation/1.0',
      },
      timeout: timeoutMs,
    }, (response) => {
      let bytes = 0
      response.on('data', (chunk) => { bytes += chunk.length })
      response.on('end', () => {
        const status = response.statusCode ?? 0
        finish(status >= 200 && status < 400, status >= 200 && status < 400 ? status : `HTTP ${status}`, bytes)
      })
      response.on('error', (error) => finish(false, error.code ?? error.message, bytes))
    })
    request.on('timeout', () => request.destroy(new Error('request timeout')))
    request.on('error', (error) => finish(false, error.code ?? error.message))
    request.end()
  })
}

async function loadAssets(paths) {
  let cursor = 0
  let ok = true
  async function browserConnection() {
    while (cursor < paths.length) {
      const index = cursor
      cursor += 1
      if (!await hit(paths[index])) ok = false
    }
  }
  await Promise.all(Array.from({ length: Math.min(browserConnections, paths.length) }, browserConnection))
  return ok
}

function journeyFor(index) {
  const ratio = (index + 0.5) / users
  let cumulative = 0
  for (const journey of JOURNEYS) {
    cumulative += journey.share
    if (ratio <= cumulative) return journey
  }
  return JOURNEYS[JOURNEYS.length - 1]
}

const journeyMetrics = Object.fromEntries(JOURNEYS.map(({ name }) => [name, { users: 0, failedUsers: 0, durations: [] }]))
const startedAt = new Date()
const testStarted = performance.now()

console.log(`Connect Cortex load simulation: ${users.toLocaleString()} simultaneous students → ${target.origin}`)
for (const journey of JOURNEYS) {
  console.log(`  ${journey.name.padEnd(14)} ${resourcesByJourney.get(journey.name).length + 1} requests per fresh session`)
}

await Promise.all(Array.from({ length: users }, async (_, index) => {
  const journey = journeyFor(index)
  const sessionStarted = performance.now()
  journeyMetrics[journey.name].users += 1
  const documentLoaded = await hit(journey.route)
  const assetsLoaded = documentLoaded ? await loadAssets(resourcesByJourney.get(journey.name)) : false
  if (!assetsLoaded) journeyMetrics[journey.name].failedUsers += 1
  journeyMetrics[journey.name].durations.push(performance.now() - sessionStarted)
}))

const totalDurationMs = performance.now() - testStarted
agent.destroy()

const requestDurations = metrics.durations.sort((a, b) => a - b)
const userDurations = Object.values(journeyMetrics).flatMap((value) => value.durations).sort((a, b) => a - b)
const errorRate = metrics.requests ? metrics.failed / metrics.requests : 1
const pass = errorRate <= 0.01 && percentile(requestDurations, 0.95) <= 2_000 && percentile(userDurations, 0.95) <= 15_000

const report = {
  target: target.origin,
  startedAt: startedAt.toISOString(),
  users,
  durationSeconds: rounded(totalDurationMs / 1_000, 2),
  requests: metrics.requests,
  requestsPerSecond: rounded(metrics.requests / (totalDurationMs / 1_000), 1),
  failedRequests: metrics.failed,
  errorRatePct: rounded(errorRate * 100, 3),
  transferredMiB: rounded(metrics.bytes / 1024 / 1024, 2),
  throughputMbitPerSecond: rounded((metrics.bytes * 8) / (totalDurationMs / 1_000) / 1_000_000, 1),
  peakRequestsOutstanding: metrics.peakActive,
  requestLatencyMs: {
    p50: rounded(percentile(requestDurations, 0.50)),
    p95: rounded(percentile(requestDurations, 0.95)),
    p99: rounded(percentile(requestDurations, 0.99)),
    max: rounded(percentile(requestDurations, 1)),
  },
  freshSessionLoadMs: {
    p50: rounded(percentile(userDurations, 0.50)),
    p95: rounded(percentile(userDurations, 0.95)),
    p99: rounded(percentile(userDurations, 0.99)),
    max: rounded(percentile(userDurations, 1)),
  },
  statuses: Object.fromEntries(metrics.statuses),
  errors: Object.fromEntries(metrics.errors),
  journeys: Object.fromEntries(Object.entries(journeyMetrics).map(([name, value]) => {
    const sorted = value.durations.sort((a, b) => a - b)
    return [name, {
      users: value.users,
      failedUsers: value.failedUsers,
      p95SessionLoadMs: rounded(percentile(sorted, 0.95)),
    }]
  })),
  thresholds: {
    errorRate: '<= 1%',
    p95RequestLatency: '<= 2000 ms',
    p95FreshSessionLoad: '<= 15000 ms',
    passed: pass,
  },
  scope: 'Vite preview frontend delivery only: local production build, app shell, and route module graph for fresh student sessions. Production API, authentication, database, storage, and infrastructure capacity are excluded.',
}

console.log(JSON.stringify(report, null, 2))
if (!pass) process.exitCode = 1
