/**
 * The voice half of a study room: a mediasoup SFU.
 *
 * Twenty students in a mesh is 380 peer connections and nineteen upstreams per
 * phone, which is not a thing a phone does. So every member sends one audio
 * stream up and receives one per speaker down, and this module is the thing in
 * the middle. It owns workers, one router per active room, and the transports,
 * producers and consumers of each member; `roomsRealtime.js` owns the socket
 * that carries the messages, and knows nothing about mediasoup.
 *
 * mediasoup is imported lazily, inside a try. It ships a native worker binary,
 * and a host that cannot run it is a host where voice is unavailable — not a
 * host where the server fails to boot and takes the whole product down with
 * it. Everything else in a study room (the seats, the presence, the sessions)
 * works without a single byte of audio, and it keeps working here.
 */
import os from 'node:os'

/** Opus, and nothing else. A study room is a conversation, not a broadcast. */
const MEDIA_CODECS = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
    parameters: {
      // Speech, not music: the browser's own default, stated rather than
      // assumed so a change of default cannot quietly change the sound.
      useinbandfec: 1,
    },
  },
]

/** With no TURN configured, this is all a client is given. See `docs/rooms-voice.md`. */
export const DEFAULT_STUN_URL = 'stun:stun.l.google.com:19302'

/**
 * Everything the SFU reads from the environment, in one place and pure.
 *
 * Split out so the deployment can be tested — a bad port range or a missing
 * announced address is a configuration bug that should be found by a unit test
 * and named in a log line, not discovered by a student whose audio never
 * arrives.
 */
export function sfuConfig(env = process.env) {
  // Four ports per member in voice (UDP + TCP on each of a send and a receive
  // transport). The old 101-port default capped the host at about twenty-five
  // concurrent speakers — barely one full room — which is not a default, it is
  // a trap. 401 ports is roughly a hundred.
  const min = Number(env.SFU_RTC_MIN_PORT) || 40000
  const max = Number(env.SFU_RTC_MAX_PORT) || 40400
  return {
    listenIp: env.SFU_LISTEN_IP || '0.0.0.0',
    // No default is possible: this is the address other people's browsers dial,
    // and guessing it would produce a room that connects on the host itself and
    // nowhere else. Unset is a warning at boot, not a substitution.
    announcedAddress: env.SFU_ANNOUNCED_IP || null,
    rtcMinPort: Math.min(min, max),
    rtcMaxPort: Math.max(min, max),
    workers: Math.max(1, os.cpus()?.length ?? 1),
    iceServers: iceServersFrom(env),
  }
}

/**
 * The ICE servers a client is handed.
 *
 * A TURN server is only included when all three of its variables are set: a
 * URL with no credential is not a relay, it is a connection attempt that will
 * fail slowly. With none configured this is STUN alone, which is enough for
 * most home connections and not enough for symmetric NAT or many mobile
 * carriers — the case a real deployment has to answer with coturn.
 */
export function iceServersFrom(env = process.env) {
  const urls = String(env.TURN_URLS || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)
  const username = env.TURN_USERNAME
  const credential = env.TURN_CREDENTIAL
  if (urls.length && username && credential) {
    return [{ urls: [DEFAULT_STUN_URL] }, { urls, username, credential }]
  }
  return [{ urls: [DEFAULT_STUN_URL] }]
}

/**
 * One line that says what this deployment's voice actually is.
 *
 * Printed at boot beside "voice ready". A worker that starts is not a room
 * that connects: the address other browsers dial, the port range they dial it
 * on and whether there is a relay for the ones that cannot are all invisible
 * from inside the process, and every one of them has been misconfigured
 * silently. Credentials are never part of the line.
 */
export function describeConfig(config) {
  const turn = config.iceServers
    .filter((server) => server.username)
    .flatMap((server) => server.urls)
  return [
    `announced ${config.announcedAddress ?? 'UNSET'}`,
    `udp/tcp ${config.rtcMinPort}-${config.rtcMaxPort}`,
    `turn ${turn.length ? turn.join(' ') : 'none'}`,
  ].join(', ')
}

/**
 * How many transports one member may hold: one to send, one to receive.
 *
 * Each `createWebRtcTransport` binds a UDP and a TCP port out of a range shared
 * by every room on the host, so "as many as you ask for" is a way for one
 * member to take the whole host's voice down in about fifty messages.
 */
export const MAX_TRANSPORTS_PER_PEER = 2

/** How long a probe transport stays open for an outside reachability check. */
export const PROBE_TTL_MS = 30_000

/** The room a probe transport lives in; no member can ever be in it. */
const PROBE_ROOM = '__voice_probe__'

/** `udp://203.0.113.9:40012 tcp://203.0.113.9:40013`, for a log line. */
export function formatCandidates(candidates) {
  return candidates
    .map((candidate) => `${candidate.protocol}://${candidate.address ?? candidate.ip}:${candidate.port}`)
    .join(' ')
}

/** Round-robin across the worker pool, one router (one room) at a time. */
export function workerForRoom(index, count) {
  return count > 0 ? index % count : 0
}

/**
 * Whether a room's audio is worth keeping a router for.
 *
 * A router with nobody in it costs a little memory forever, and a study room
 * that emptied at 3am should not still be holding one at noon.
 */
function isEmpty(room) {
  return room.peers.size === 0
}

/* ── The lazily-loaded engine ────────────────────────────────────────────── */

let enginePromise = null

/**
 * The SFU, or a clear statement of why there isn't one.
 *
 * Resolves to `{ available: false, reason }` rather than throwing: "voice is
 * unavailable right now" is a state the room renders, and a rejected promise
 * at the top of a socket handler is a 500 nobody can read.
 */
export function loadSfu(env = process.env) {
  enginePromise ??= startEngine(env).catch((error) => ({
    available: false,
    reason: `The voice server could not start (${error?.message || 'unknown error'}).`,
  }))
  return enginePromise
}

/** Only for tests, and for a host that wants to retry after fixing its config. */
export function resetSfu() {
  enginePromise = null
}

async function startEngine(env) {
  const config = sfuConfig(env)

  let mediasoup
  try {
    mediasoup = await import('mediasoup')
  } catch (error) {
    return {
      available: false,
      reason: `The voice server is not installed on this host (${error?.message || 'mediasoup missing'}).`,
    }
  }

  if (!config.announcedAddress) {
    console.warn(
      'SFU_ANNOUNCED_IP is unset. Study room voice will only connect from the server host itself — '
      + 'set it to the public IP of this machine and open UDP '
      + `${config.rtcMinPort}-${config.rtcMaxPort}.`,
    )
  }
  if (config.iceServers.length === 1) {
    console.warn(
      'No TURN server configured (TURN_URLS / TURN_USERNAME / TURN_CREDENTIAL). '
      + 'Study room voice will fail behind symmetric NAT and on many mobile networks.',
    )
  }

  /** roomId → { router, worker, peers: Map<userId, peer> } */
  const rooms = new Map()
  let roomCount = 0
  const workers = []
  let downReason = null
  let closing = false

  const spawnWorker = async () => {
    const worker = await mediasoup.createWorker({
      logLevel: 'warn',
      rtcMinPort: config.rtcMinPort,
      rtcMaxPort: config.rtcMaxPort,
    })
    /*
     * A worker segfault used to be logged and otherwise ignored, which left
     * every room it hosted holding a *closed* router in the cache. `routerFor`
     * handed that router back forever, so those rooms failed every transport
     * with an opaque error while the SFU still reported itself available and
     * the boot log still said "voice ready". Only a restart cleared it.
     *
     * Now: drop the routers that died with it, take the worker out of the pool,
     * report the SFU unavailable with a reason a student can read, and try to
     * put a replacement in its place. Rooms rebuild on the next request.
     */
    // A replacement that finishes arriving after shutdown began must not join
    // a pool nobody will ever close again — that is a stray worker process for
    // the life of the host, and an event loop that never drains.
    if (closing) {
      worker.close()
      return worker
    }
    worker.on('died', () => handleWorkerDeath(worker))
    workers.push(worker)
    return worker
  }

  function handleWorkerDeath(worker) {
    if (closing) return
    const index = workers.indexOf(worker)
    if (index === -1) return
    console.error(`mediasoup worker ${worker.pid} died; rebuilding.`)
    workers.splice(index, 1)
    for (const [roomId, room] of [...rooms]) {
      if (room.worker === worker) rooms.delete(roomId)
    }
    if (!workers.length) downReason = 'The voice server is restarting. Try again in a moment.'
    void spawnWorker()
      .then(() => { downReason = null })
      .catch((error) => {
        downReason = `The voice server could not restart (${error?.message || 'unknown error'}).`
        console.error('mediasoup worker could not be replaced:', error?.message ?? error)
      })
  }

  for (let index = 0; index < config.workers; index++) await spawnWorker()

  async function routerFor(roomId) {
    const existing = rooms.get(roomId)
    if (existing) return existing
    if (!workers.length) throw new Error(downReason ?? 'no_worker')
    const worker = workers[workerForRoom(roomCount++, workers.length)]
    const router = await worker.createRouter({ mediaCodecs: MEDIA_CODECS })
    const room = { router, worker, peers: new Map() }
    rooms.set(roomId, room)
    return room
  }

  function peerFor(room, userId) {
    let peer = room.peers.get(userId)
    if (!peer) {
      peer = { transports: new Map(), producers: new Map(), consumers: new Map() }
      room.peers.set(userId, peer)
    }
    return peer
  }

  function dropRoomIfEmpty(roomId) {
    const room = rooms.get(roomId)
    if (!room || !isEmpty(room)) return
    room.router.close()
    rooms.delete(roomId)
  }

  function listenInfos() {
    return ['udp', 'tcp'].map((protocol) => ({
      protocol,
      ip: config.listenIp,
      ...(config.announcedAddress ? { announcedAddress: config.announcedAddress } : {}),
      portRange: { min: config.rtcMinPort, max: config.rtcMaxPort },
    }))
  }

  /** `{ transport, result }` of the current probe, while one is open. */
  let probe = null

  return {
    /*
     * Read on every message rather than captured once: a worker can die at any
     * moment, and a room that says "voice ready" while every transport fails is
     * worse than one that says voice is unavailable.
     */
    get available() {
      return workers.length > 0 && downReason === null
    },
    get reason() {
      return downReason ?? 'Voice is unavailable right now.'
    },

    async rtpCapabilities(roomId) {
      const room = await routerFor(roomId)
      return room.router.rtpCapabilities
    },

    iceServers() {
      return config.iceServers
    },

    describe() {
      return describeConfig(config)
    },

    /**
     * A throwaway transport, so the media path can be checked from outside.
     *
     * Everything a browser dials is decided here — the announced address, the
     * port a worker picked, whether the host forwards it — and none of it can
     * be seen from a log line that says "voice ready". The probe opens one
     * transport in a room of its own, reports the candidates it would offer,
     * and keeps it open for `PROBE_TTL_MS` so a `curl` and a TCP connect from
     * anywhere can prove the address is reachable. One at a time: a second
     * request inside the window gets the same answer, so nobody can use it to
     * eat the port range.
     */
    async probe() {
      if (probe && !probe.transport.closed) return probe.result
      const room = await routerFor(PROBE_ROOM)
      const transport = await room.router.createWebRtcTransport({
        listenInfos: listenInfos(),
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
        appData: { probe: true },
      })
      const result = {
        candidates: transport.iceCandidates.map((candidate) => ({
          protocol: candidate.protocol,
          address: candidate.address ?? candidate.ip,
          port: candidate.port,
          type: candidate.type,
        })),
        openUntil: new Date(Date.now() + PROBE_TTL_MS).toISOString(),
      }
      probe = { transport, result }
      const timer = setTimeout(() => {
        try { transport.close() } catch { /* already closed */ }
        if (probe?.transport === transport) probe = null
        dropRoomIfEmpty(PROBE_ROOM)
      }, PROBE_TTL_MS)
      timer.unref?.()
      return result
    },

    async createTransport(roomId, userId, direction) {
      const room = await routerFor(roomId)
      const peer = peerFor(room, userId)
      /*
       * One transport per direction, and asking again replaces it.
       *
       * Replacing rather than refusing is what a reconnecting client needs: its
       * old transports were closed server-side when its socket dropped, and it
       * has to build new ones. Refusing outright would make a reconnect
       * impossible; accumulating them lets one member exhaust the host's whole
       * media port range in about fifty messages.
       */
      for (const [id, existing] of [...peer.transports]) {
        if (existing.appData?.direction !== direction) continue
        try { existing.close() } catch { /* already closed */ }
        peer.transports.delete(id)
      }
      if (peer.transports.size >= MAX_TRANSPORTS_PER_PEER) throw new Error('too_many_transports')

      const transport = await room.router.createWebRtcTransport({
        listenInfos: listenInfos(),
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
        appData: { direction, userId },
      })
      peer.transports.set(transport.id, transport)
      /*
       * The one place the media path is visible from the server. A call whose
       * signalling succeeded and whose audio never arrived leaves no trace
       * anywhere else; these three lines per transport are what a deployment
       * log needs to tell "the firewall" from "the announced address" from
       * "it worked and the problem is the browser".
       */
      const label = `[voice] ${direction} transport for ${userId}`
      console.log(`${label} offers ${formatCandidates(transport.iceCandidates)}`)
      transport.on('icestatechange', (state) => console.log(`${label} ice ${state}`))
      transport.on('dtlsstatechange', (state) => console.log(`${label} dtls ${state}`))
      return {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
        iceServers: config.iceServers,
      }
    },

    async connectTransport(roomId, userId, transportId, dtlsParameters) {
      const transport = rooms.get(roomId)?.peers.get(userId)?.transports.get(transportId)
      if (!transport) throw new Error('unknown_transport')
      await transport.connect({ dtlsParameters })
      return { ok: true }
    },

    async produce(roomId, userId, transportId, kind, rtpParameters) {
      const room = rooms.get(roomId)
      const transport = room?.peers.get(userId)?.transports.get(transportId)
      if (!transport) throw new Error('unknown_transport')
      // Audio only. A video producer on a router with no video codec would fail
      // anyway; refusing it here says so in a word rather than in a stack trace.
      if (kind !== 'audio') throw new Error('unsupported_kind')
      const producer = await transport.produce({ kind, rtpParameters, appData: { userId } })
      const peer = peerFor(room, userId)
      peer.producers.set(producer.id, producer)
      producer.on('transportclose', () => peer.producers.delete(producer.id))
      return { producerId: producer.id }
    },

    async consume(roomId, userId, transportId, producerId, rtpCapabilities) {
      const room = rooms.get(roomId)
      const transport = room?.peers.get(userId)?.transports.get(transportId)
      if (!transport) throw new Error('unknown_transport')
      if (!room.router.canConsume({ producerId, rtpCapabilities })) throw new Error('cannot_consume')
      const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        // Started paused, always. A consumer that is playing before the client
        // has attached it to an element loses the first second of speech, and
        // the client resumes it the moment it is ready.
        paused: true,
      })
      const peer = peerFor(room, userId)
      peer.consumers.set(consumer.id, consumer)
      consumer.on('transportclose', () => peer.consumers.delete(consumer.id))
      consumer.on('producerclose', () => peer.consumers.delete(consumer.id))
      return {
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        producerUserId: producerUserIdOf(room, producerId),
      }
    },

    async resume(roomId, userId, consumerId) {
      const consumer = rooms.get(roomId)?.peers.get(userId)?.consumers.get(consumerId)
      if (!consumer) throw new Error('unknown_consumer')
      await consumer.resume()
      return { ok: true }
    },

    async pauseProducer(roomId, userId, producerId, paused) {
      const producer = rooms.get(roomId)?.peers.get(userId)?.producers.get(producerId)
      if (!producer) throw new Error('unknown_producer')
      await (paused ? producer.pause() : producer.resume())
      return { ok: true }
    },

    /** Every producer in the room that is not this member's own. */
    producersFor(roomId, userId) {
      const room = rooms.get(roomId)
      if (!room) return []
      const list = []
      for (const [peerId, peer] of room.peers) {
        if (peerId === userId) continue
        for (const producerId of peer.producers.keys()) list.push({ producerId, userId: peerId })
      }
      return list
    },

    /**
     * Everything one member holds, closed.
     *
     * Closing the transports is enough — mediasoup closes the producers and
     * consumers on them — but the maps are cleared too, so a reconnecting
     * member does not inherit ids that name closed objects.
     */
    closePeer(roomId, userId) {
      const room = rooms.get(roomId)
      const peer = room?.peers.get(userId)
      if (!peer) {
        // A member who asked for RTP capabilities and then failed — a refused
        // microphone, an ICE failure, a closed tab — created the room's router
        // and never became a peer. Returning here without this line leaked one
        // router per such attempt for the life of the process.
        dropRoomIfEmpty(roomId)
        return []
      }
      const closedProducerIds = [...peer.producers.keys()]
      for (const transport of peer.transports.values()) transport.close()
      peer.transports.clear()
      peer.producers.clear()
      peer.consumers.clear()
      room.peers.delete(userId)
      dropRoomIfEmpty(roomId)
      return closedProducerIds
    },

    /**
     * Test seams. Underscored because nothing in the product may call them:
     * the router cache and the worker pool are this module's own business, and
     * the two things a test cannot otherwise observe are how many routers are
     * alive and what happens when one of them dies with its worker.
     */
    _rooms() {
      return rooms.size
    },
    _workers() {
      return workers.length
    },
    async _killAWorker() {
      const worker = workers[0]
      if (!worker) return
      // A genuinely dead worker, then the handler a segfault would run. Killing
      // it with `close()` alone does not emit `died` — that event is reserved
      // for a crash — so the handler is invoked directly against a worker that
      // really is gone, which is the same state the event describes.
      const closed = new Promise((resolve) => worker.observer.once('close', resolve))
      worker.close()
      await closed
      handleWorkerDeath(worker)
    },

    /** For tests and for a clean shutdown. */
    async close() {
      closing = true
      for (const [roomId, room] of rooms) {
        room.router.close()
        rooms.delete(roomId)
      }
      for (const worker of workers.splice(0)) worker.close()
    },
  }
}

function producerUserIdOf(room, producerId) {
  for (const [peerId, peer] of room.peers) {
    if (peer.producers.has(producerId)) return peerId
  }
  return null
}
