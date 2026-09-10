import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_STUN_URL, MAX_TRANSPORTS_PER_PEER, describeConfig, formatCandidates, iceServersFrom, loadSfu, resetSfu, sfuConfig, workerForRoom,
} from './roomsSfu.js'

test('the defaults are the documented ones', () => {
  const config = sfuConfig({})
  assert.equal(config.listenIp, '0.0.0.0')
  assert.equal(config.rtcMinPort, 40000)
  assert.equal(config.rtcMaxPort, 49999)
  assert.ok(config.workers >= 1)
})

test('there is no default announced address, because a guess would be wrong', () => {
  assert.equal(sfuConfig({}).announcedAddress, null)
  assert.equal(sfuConfig({ SFU_ANNOUNCED_IP: '203.0.113.9' }).announcedAddress, '203.0.113.9')
})

test('a port range given backwards is still a range', () => {
  const config = sfuConfig({ SFU_RTC_MIN_PORT: '41100', SFU_RTC_MAX_PORT: '41000' })
  assert.equal(config.rtcMinPort, 41000)
  assert.equal(config.rtcMaxPort, 41100)
})

test('an unparseable port range falls back rather than listening on NaN', () => {
  const config = sfuConfig({ SFU_RTC_MIN_PORT: 'soon', SFU_RTC_MAX_PORT: '' })
  assert.equal(config.rtcMinPort, 40000)
  assert.equal(config.rtcMaxPort, 49999)
})

test('with nothing configured a client gets STUN alone', () => {
  assert.deepEqual(iceServersFrom({}), [{ urls: [DEFAULT_STUN_URL] }])
})

test('a full TURN triple is passed through, after STUN', () => {
  const servers = iceServersFrom({
    TURN_URLS: 'turn:t.example:3478, turns:t.example:5349',
    TURN_USERNAME: 'nishany',
    TURN_CREDENTIAL: 'secret',
  })
  assert.equal(servers.length, 2)
  assert.deepEqual(servers[1], {
    urls: ['turn:t.example:3478', 'turns:t.example:5349'],
    username: 'nishany',
    credential: 'secret',
  })
})

test('a half-configured TURN server is not offered at all', () => {
  // A URL with no credential is not a relay; it is a connection attempt that
  // will fail slowly, which is worse than never trying.
  assert.deepEqual(iceServersFrom({ TURN_URLS: 'turn:t.example:3478' }), [{ urls: [DEFAULT_STUN_URL] }])
  assert.deepEqual(
    iceServersFrom({ TURN_URLS: 'turn:t.example:3478', TURN_USERNAME: 'nishany' }),
    [{ urls: [DEFAULT_STUN_URL] }],
  )
})

test('rooms are spread across the worker pool', () => {
  assert.deepEqual([0, 1, 2, 3, 4].map((i) => workerForRoom(i, 3)), [0, 1, 2, 0, 1])
  assert.equal(workerForRoom(5, 0), 0)
})

test('the default port range leaves room for a real room, not a quarter of one', () => {
  // Four ports per member in voice (UDP + TCP on a send and a receive
  // transport). The old 40000–40100 default capped the whole host at about
  // twenty-five concurrent speakers.
  const config = sfuConfig({})
  const ports = config.rtcMaxPort - config.rtcMinPort + 1
  assert.ok(ports / 4 >= 100, `only ${Math.floor(ports / 4)} concurrent voice members fit`)
})

test('a peer may hold one transport to send and one to receive, and no more', () => {
  assert.equal(MAX_TRANSPORTS_PER_PEER, 2)
})

/* ── The real engine ─────────────────────────────────────────────────────── */

/**
 * These start actual mediasoup workers, so they are skipped where the native
 * worker cannot run — a musl image, or a machine without the binary. That is
 * the same condition under which `loadSfu` reports the SFU unavailable, so
 * skipping is honest rather than convenient.
 */
const engineAvailable = await (async () => {
  try {
    await import('mediasoup')
    return true
  } catch {
    return false
  }
})()

test('a peer asking for a third transport gets its second one replaced, not a third port pair', { skip: !engineAvailable }, async () => {
  resetSfu()
  const sfu = await loadSfu({ SFU_RTC_MIN_PORT: '41000', SFU_RTC_MAX_PORT: '41100' })
  assert.equal(sfu.available, true)
  try {
    const first = await sfu.createTransport('room-a', 'u1', 'send')
    const second = await sfu.createTransport('room-a', 'u1', 'recv')
    const third = await sfu.createTransport('room-a', 'u1', 'send')
    assert.notEqual(third.id, first.id)
    // The replaced one is gone: connecting to it now fails rather than holding
    // its ports for the life of the process.
    await assert.rejects(
      () => sfu.connectTransport('room-a', 'u1', first.id, {}),
      /unknown_transport/,
    )
    // …and the receive transport was untouched by the send replacement.
    assert.ok(second.id)
  } finally {
    await sfu.close()
    resetSfu()
  }
})

test('a member who asks for capabilities and never produces does not leak a router', { skip: !engineAvailable }, async () => {
  resetSfu()
  const sfu = await loadSfu({ SFU_RTC_MIN_PORT: '41200', SFU_RTC_MAX_PORT: '41300' })
  try {
    // Join voice pressed; `device.load` or the microphone then failed, so no
    // transport was ever created and this member never became a peer.
    await sfu.rtpCapabilities('room-b')
    assert.deepEqual(sfu.closePeer('room-b', 'u1'), [])
    // The router is gone with them rather than sitting on a worker forever.
    assert.deepEqual(sfu.producersFor('room-b', 'u2'), [])
    assert.equal(sfu._rooms(), 0)
  } finally {
    await sfu.close()
    resetSfu()
  }
})

test('a room is dropped when its last peer leaves, and rebuilt on demand', { skip: !engineAvailable }, async () => {
  resetSfu()
  const sfu = await loadSfu({ SFU_RTC_MIN_PORT: '41400', SFU_RTC_MAX_PORT: '41500' })
  try {
    await sfu.createTransport('room-c', 'u1', 'send')
    assert.equal(sfu._rooms(), 1)
    sfu.closePeer('room-c', 'u1')
    assert.equal(sfu._rooms(), 0)
    await sfu.rtpCapabilities('room-c')
    assert.equal(sfu._rooms(), 1)
  } finally {
    await sfu.close()
    resetSfu()
  }
})

test('a worker that dies takes its rooms out of the cache and the SFU says so', { skip: !engineAvailable }, async () => {
  resetSfu()
  const sfu = await loadSfu({ SFU_RTC_MIN_PORT: '41600', SFU_RTC_MAX_PORT: '41700' })
  try {
    await sfu.rtpCapabilities('room-d')
    assert.equal(sfu._rooms(), 1)
    const before = sfu._workers()

    // What a segfault looks like from here.
    await sfu._killAWorker()
    assert.equal(sfu._rooms(), 0, 'routers on the dead worker must not be handed back')

    // The pool refills. Waited on by size rather than on `available`, which on
    // a multi-core host is still true the instant after one of ten workers
    // dies — and closing the engine with a replacement still in flight leaves a
    // stray worker process behind.
    const deadline = Date.now() + 10_000
    while (sfu._workers() < before && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 25))
    }
    assert.equal(sfu._workers(), before, 'the worker should have been replaced')
    assert.equal(sfu.available, true)
    await sfu.rtpCapabilities('room-d')
    assert.equal(sfu._rooms(), 1)
  } finally {
    await sfu.close()
    resetSfu()
  }
})

test('the boot line names the announced address, the port range and the relay, never the credential', () => {
  assert.equal(
    describeConfig(sfuConfig({})),
    'announced UNSET, udp/tcp 40000-49999, turn none',
  )
  assert.equal(
    describeConfig(sfuConfig({
      SFU_ANNOUNCED_IP: '203.0.113.9',
      SFU_RTC_MIN_PORT: '50000',
      SFU_RTC_MAX_PORT: '50100',
      TURN_URLS: 'turn:203.0.113.9:3478?transport=udp, turn:203.0.113.9:3478?transport=tcp',
      TURN_USERNAME: 'nishany',
      TURN_CREDENTIAL: 'hunter2',
    })),
    'announced 203.0.113.9, udp/tcp 50000-50100, turn turn:203.0.113.9:3478?transport=udp turn:203.0.113.9:3478?transport=tcp',
  )
  assert.ok(!describeConfig(sfuConfig({ TURN_URLS: 'turn:x', TURN_USERNAME: 'u', TURN_CREDENTIAL: 'hunter2' })).includes('hunter2'))
})

test('candidates format as one dialable address per line entry, newer field first', () => {
  assert.equal(
    formatCandidates([
      { protocol: 'udp', address: '203.0.113.9', port: 40012 },
      { protocol: 'tcp', ip: '203.0.113.9', port: 40013 },
    ]),
    'udp://203.0.113.9:40012 tcp://203.0.113.9:40013',
  )
})

test('the probe offers the announced address on both protocols and reuses its transport inside the window', { skip: !engineAvailable }, async () => {
  resetSfu()
  const sfu = await loadSfu({ SFU_RTC_MIN_PORT: '41200', SFU_RTC_MAX_PORT: '41300', SFU_ANNOUNCED_IP: '203.0.113.9' })
  assert.equal(sfu.available, true)
  try {
    const first = await sfu.probe()
    assert.deepEqual(first.candidates.map((c) => [c.protocol, c.address]).sort(), [['tcp', '203.0.113.9'], ['udp', '203.0.113.9']])
    for (const candidate of first.candidates) assert.ok(candidate.port >= 41200 && candidate.port <= 41300)
    const second = await sfu.probe()
    assert.equal(second, first)
  } finally {
    await sfu.close()
    resetSfu()
  }
})

test('SFU denies audio consumers and resume across table boundaries', {skip:!engineAvailable},async()=>{
  resetSfu();const sfu=await loadSfu({SFU_RTC_MIN_PORT:'42600',SFU_RTC_MAX_PORT:'42700'})
  try{
    const send=await sfu.createTransport('scope-room','speaker','send')
    const recv=await sfu.createTransport('scope-room','listener','recv')
    const {producerId}=await sfu.produce('scope-room','speaker',send.id,'audio',{codecs:[{mimeType:'audio/opus',payloadType:111,clockRate:48000,channels:2,parameters:{},rtcpFeedback:[]}],headerExtensions:[],encodings:[{ssrc:987654321}],rtcp:{cname:'scope-test'}},{scope:'table',tableId:'pair-8'})
    const caps=await sfu.rtpCapabilities('scope-room')
    assert.deepEqual(sfu.producersFor('scope-room','listener','pair-10'),[])
    await assert.rejects(()=>sfu.consume('scope-room','listener',recv.id,producerId,caps,'pair-10'),/voice_audience_mismatch/)
    const consumer=await sfu.consume('scope-room','listener',recv.id,producerId,caps,'pair-8')
    await assert.rejects(()=>sfu.resume('scope-room','listener',consumer.id,'pair-10'),/voice_audience_mismatch/)
    assert.deepEqual(await sfu.resume('scope-room','listener',consumer.id,'pair-8'),{ok:true})
  }finally{await sfu.close();resetSfu()}
})
