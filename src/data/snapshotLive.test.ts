import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { createServer, type Server } from 'node:http'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * `snapshot-live.mjs` and `snapshot-staleness.mjs`, driven against a stub server.
 *
 * A stub rather than a mock, because the behaviour under test is what the script
 * does with a *response* — a 403 from a token that skipped MFA, a 200 carrying
 * an HTML error page, an empty body. Those are the cases that decide whether the
 * fixture survives, and none of them exist in a mocked `fetch`.
 *
 * Production is never called: the stub listens on 127.0.0.1 and the scripts are
 * pointed at it with `MEDICAL_API_BASE`.
 *
 * The rule these exist to hold: **the fixture must survive every failure.** It
 * is what `medical:simulate` and `find-existing` read as live state, and a run
 * that half-wrote it would leave every lane resolving against a truncated
 * library while every gate stayed green.
 */

const scripts = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts')

/** A one-route stub. Returns the port it is listening on. */
async function stub(handler: (url: string, auth: string) => { status: number, body: string, type?: string }) {
  const server: Server = createServer((req, res) => {
    const { status, body, type } = handler(req.url ?? '', req.headers.authorization ?? '')
    res.writeHead(status, { 'content-type': type ?? 'application/json' })
    res.end(body)
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = (server.address() as { port: number }).port
  return { port, close: () => new Promise<void>((resolve) => { server.close(() => resolve()) }) }
}

/**
 * Run a script against the stub and await its exit.
 *
 * `spawn`, not `spawnSync`: the stub listens in *this* process, and a
 * synchronous spawn blocks the event loop, so the server can never accept the
 * child's connection and both sides wait forever. The first version of this
 * file deadlocked exactly there.
 */
function run(script: string, root: string, port: number, token = 'test-token') {
  return new Promise<{ code: number, output: string }>((resolve, reject) => {
    const child = spawn(process.execPath, [join(scripts, script)], {
      cwd: root,
      env: { ...process.env, MEDICAL_API_BASE: `http://127.0.0.1:${port}`, MEDICAL_API_TOKEN: token },
    })
    let output = ''
    child.stdout.on('data', (chunk) => { output += chunk })
    child.stderr.on('data', (chunk) => { output += chunk })
    child.on('error', reject)
    child.on('close', (code) => resolve({ code: code ?? 1, output }))
  })
}

/** A working tree with a fixture already in place. */
function withFixture(fixture: unknown) {
  const root = mkdtempSync(join(tmpdir(), 'snapshot-'))
  mkdirSync(join(root, 'server', 'data'), { recursive: true })
  writeFileSync(join(root, 'server', 'data', 'medical-library-v1.json'), JSON.stringify(fixture, null, 2))
  return root
}

const EXISTING = {
  migrationId: '2026-08-11-medical-library-reader-quality-v7',
  generatedAt: '2026-08-11T03:09:06.253Z',
  states: { 'synapse-concept-graph-v2': { concepts: [{ id: 'CON-OLD' }] } },
  demoStudentIds: ['demo-1'],
  report: { universities: 12 },
}

const fixtureIn = (root: string) =>
  JSON.parse(readFileSync(join(root, 'server', 'data', 'medical-library-v1.json'), 'utf8'))

test('a 200 snapshot replaces the states and marks the file as production-derived', async () => {
  const states = { 'synapse-concept-graph-v2': { concepts: [{ id: 'CON-NEW' }] }, 'synapse-relation-types-v1': [] }
  const server = await stub(() => ({ status: 200, body: JSON.stringify(states) }))
  const root = withFixture(EXISTING)
  try {
    const { code, output } = await run('snapshot-live.mjs', root, server.port)
    assert.equal(code, 0, output)
    const written = fixtureIn(root)
    assert.deepEqual(written.states, states)
    // The marker is the point: without it a snapshot and a bundle build are
    // indistinguishable on disk.
    assert.equal(written.source, 'production /api/state')
    // The envelope the rest of the repo reads is preserved, not invented.
    assert.equal(written.migrationId, EXISTING.migrationId)
    assert.deepEqual(written.demoStudentIds, EXISTING.demoStudentIds)
    assert.notEqual(written.generatedAt, EXISTING.generatedAt, 'generatedAt should be stamped fresh')
  } finally {
    await server.close()
    rmSync(root, { recursive: true, force: true })
  }
})

test('the token never appears in the output', async () => {
  // A snapshot run is the thing most likely to be pasted into a chat window when
  // it goes wrong, and the token is a super-admin credential.
  const secret = 'super-secret-aal2-token-value'
  const server = await stub(() => ({ status: 403, body: JSON.stringify({ error: 'mfa_required' }) }))
  const root = withFixture(EXISTING)
  try {
    const { output } = await run('snapshot-live.mjs', root, server.port, secret)
    assert.ok(!output.includes(secret), 'the token must never be echoed')
  } finally {
    await server.close()
    rmSync(root, { recursive: true, force: true })
  }
})

test('the fixture survives every failure the route can return', async () => {
  const cases: { name: string, reply: { status: number, body: string, type?: string } }[] = [
    { name: '401 expired token', reply: { status: 401, body: '{"error":"unauthorized"}' } },
    { name: '403 MFA not completed', reply: { status: 403, body: '{"error":"mfa_required"}' } },
    { name: '500 with an HTML error page', reply: { status: 500, body: '<html>nope</html>', type: 'text/html' } },
    // The dangerous one: a 200 that is not the payload. Written blindly it would
    // replace the whole library with nothing and every gate would report clean.
    { name: '200 carrying HTML', reply: { status: 200, body: '<html>login</html>', type: 'text/html' } },
    { name: '200 carrying an empty object', reply: { status: 200, body: '{}' } },
    { name: '200 carrying an array', reply: { status: 200, body: '[]' } },
  ]
  for (const { name, reply } of cases) {
    const server = await stub(() => reply)
    const root = withFixture(EXISTING)
    try {
      const { code, output } = await run('snapshot-live.mjs', root, server.port)
      assert.equal(code, 1, `${name}: expected a refusal, got exit ${code}\n${output}`)
      assert.deepEqual(fixtureIn(root), EXISTING, `${name}: the fixture was modified`)
    } finally {
      await server.close()
      rmSync(root, { recursive: true, force: true })
    }
  }
})

test('missing environment variables are refused before anything is read', async () => {
  const root = withFixture(EXISTING)
  try {
    const result = spawnSync(process.execPath, [join(scripts, 'snapshot-live.mjs')], {
      cwd: root, encoding: 'utf8', env: { ...process.env, MEDICAL_API_BASE: '', MEDICAL_API_TOKEN: '' },
    })
    assert.equal(result.status, 2)
    assert.match(`${result.stderr}`, /MEDICAL_API_TOKEN MISSING/)
    assert.deepEqual(fixtureIn(root), EXISTING)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('staleness reports which keys moved after the fixture was built, and changes nothing', async () => {
  const server = await stub(() => ({
    status: 200,
    body: JSON.stringify({
      keys: {
        // 11 days after the fixture's generatedAt.
        'synapse-concept-graph-v2': '2026-08-22T03:09:06.253Z',
        // Before it — production has not touched this since, so it is not behind.
        'synapse-relation-types-v1': '2026-08-01T00:00:00.000Z',
        'synapse-module-schedules-v1': null,
      },
    }),
  }))
  const root = withFixture(EXISTING)
  try {
    const { code, output } = await run('snapshot-staleness.mjs', root, server.port)
    assert.equal(code, 0, output)
    assert.match(output, /synapse-concept-graph-v2\s+11\.0 days newer/)
    assert.match(output, /synapse-relation-types-v1\s+not changed since/)
    assert.match(output, /synapse-module-schedules-v1\s+not stored in production/)
    assert.match(output, /1 of 3 key\(s\) have moved/)
    // It measures; it must not edit.
    assert.deepEqual(fixtureIn(root), EXISTING)
  } finally {
    await server.close()
    rmSync(root, { recursive: true, force: true })
  }
})

test('staleness reports rather than failing when the fixture is behind', async () => {
  // A fixture behind production is the normal state of affairs. A gate that goes
  // red for the normal state of affairs stops being read.
  const server = await stub(() => ({
    status: 200,
    body: JSON.stringify({ keys: { 'synapse-concept-graph-v2': '2027-01-01T00:00:00.000Z' } }),
  }))
  const root = withFixture(EXISTING)
  try {
    const { code } = await run('snapshot-staleness.mjs', root, server.port)
    assert.equal(code, 0, 'being out of date is not a failure')
  } finally {
    await server.close()
    rmSync(root, { recursive: true, force: true })
  }
})

test('the scripts exist where package.json says they do', () => {
  for (const name of ['snapshot-live.mjs', 'snapshot-staleness.mjs']) {
    assert.ok(existsSync(join(scripts, name)), `${name} is missing`)
  }
})
