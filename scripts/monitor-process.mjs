#!/usr/bin/env node

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import os from 'node:os'

const run = promisify(execFile)

function argument(name, fallback) {
  const exact = process.argv.find((value) => value.startsWith(`--${name}=`))
  return exact ? exact.slice(name.length + 3) : fallback
}

const pid = Number(argument('pid', ''))
const intervalMs = Number(argument('interval-ms', '500'))
const label = argument('label', 'server')
if (!Number.isInteger(pid) || pid < 1) throw new Error('--pid must identify a running process')
if (!Number.isFinite(intervalMs) || intervalMs < 100) throw new Error('--interval-ms must be at least 100')

const samples = []
let stopping = false
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { stopping = true })

function percentile(sorted, ratio) {
  if (!sorted.length) return 0
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1)]
}

function rounded(value, digits = 1) {
  return Number(value.toFixed(digits))
}

function summary(values) {
  const sorted = [...values].sort((a, b) => a - b)
  return {
    average: rounded(values.reduce((sum, value) => sum + value, 0) / values.length),
    p95: rounded(percentile(sorted, 0.95)),
    peak: rounded(percentile(sorted, 1)),
  }
}

async function sample() {
  const { stdout } = await run('ps', ['-p', String(pid), '-o', '%cpu=,rss=,vsz='])
  const [cpuPct, rssKiB, vszKiB] = stdout.trim().split(/\s+/).map(Number)
  if (![cpuPct, rssKiB, vszKiB].every(Number.isFinite)) throw new Error('process metrics were unreadable')
  samples.push({
    at: new Date().toISOString(),
    cpuPct,
    rssMiB: rssKiB / 1024,
    vszMiB: vszKiB / 1024,
    hostLoad1: os.loadavg()[0],
  })
}

console.log(`Monitoring ${label} process ${pid} every ${intervalMs} ms`)
while (!stopping) {
  const started = performance.now()
  try {
    await sample()
  } catch (error) {
    if (!stopping) console.error(`Monitoring stopped: ${error.message}`)
    break
  }
  const wait = Math.max(0, intervalMs - (performance.now() - started))
  await new Promise((resolve) => setTimeout(resolve, wait))
}

if (!samples.length) throw new Error('No process samples were collected')

const rss = samples.map((sample) => sample.rssMiB)
console.log(JSON.stringify({
  label,
  pid,
  intervalMs,
  samples: samples.length,
  observedSeconds: rounded((new Date(samples.at(-1).at) - new Date(samples[0].at)) / 1_000, 2),
  cpuPctOfOneCore: summary(samples.map((sample) => sample.cpuPct)),
  residentMemoryMiB: {
    ...summary(rss),
    baseline: rounded(rss[0]),
    growth: rounded(Math.max(...rss) - rss[0]),
  },
  virtualMemoryMiB: summary(samples.map((sample) => sample.vszMiB)),
  hostLoad1: summary(samples.map((sample) => sample.hostLoad1)),
}, null, 2))
