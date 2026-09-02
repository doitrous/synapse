import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Device, Producer, Transport } from 'mediasoup-client/types'
import { createMicGuard, stopStream } from './micSession'
import type { RoomChannel } from './useRoomChannel'

/**
 * Voice in a study room.
 *
 * The shape of the call: every member sends one audio stream up to the SFU in
 * `server/src/roomsSfu.js` and receives one stream down per person who is
 * talking. Twenty students in a mesh would be 380 peer connections and
 * nineteen upstreams per phone, which is not a thing a phone does.
 *
 * The negotiation rides the room's WebSocket (`useRoomChannel`), which is also
 * what carries presence and speaking. Speaking is still measured locally — an
 * analyser on your own microphone, exactly as before — because the server does
 * not decode audio and should not have to; the result is broadcast so everyone
 * else's hall lights the same ring at the same moment.
 *
 * Three things can be true, and the room says which:
 *  - **A call.** There is a socket and the server has an SFU.
 *  - **Your own level only.** There is no socket (demo mode) or the server has
 *    no SFU. The microphone still opens, the mute button still works, and
 *    `reason` says nobody can hear you. This is the shape WP5 shipped, kept
 *    because it is honest rather than because it is useful.
 *  - **Nothing.** No secure context, no `getUserMedia`, or a refused prompt.
 */

export type RoomAudioState = 'unsupported' | 'idle' | 'joining' | 'live' | 'error'

export interface RoomAudio {
  state: RoomAudioState
  muted: boolean
  /** Member ids currently speaking: yours from your own analyser, everyone else's from the room. */
  speaking: Set<string>
  join(): Promise<void>
  leave(): void
  toggleMute(): void
  /**
   * Why voice is not what a student expects, in a sentence they can read.
   *
   * Absent when this is a real call and nothing is wrong. Otherwise a local
   * problem names itself, or the transport sentence says the room has no way
   * to carry a voice — true of demo mode and of a server without an SFU, and
   * never shown when people can actually hear each other.
   */
  reason?: string
  /** True when audio is flowing through the SFU rather than into a level meter. */
  callActive: boolean
  /**
   * The socket dropped while the student had voice on, and the call is being
   * rebuilt. Distinct from `callActive: false` with no reason, because it is
   * temporary and the student should be told to wait rather than to rejoin.
   */
  voiceReconnecting: boolean
}

/**
 * The standing reason, and the one the room's inset repeats.
 *
 * Exported so the UI states it in exactly the words the hook does; two
 * paraphrases of "nobody can hear you" would eventually disagree.
 */
export const VOICE_TRANSPORT_REASON = 'Voice is unavailable right now.'

/**
 * The call was agreed but the audio never arrived: ICE failed to reach the
 * media server. Exported for the same reason as the transport reason.
 */
export const VOICE_MEDIA_REASON = 'Voice could not reach the media server, so nobody can hear you in this room.'

/** Demo mode has no server to carry a call, and says so rather than blaming the browser. */
export const DEMO_VOICE_REASON = 'Voice needs the connected server.'

/** How loud (RMS, 0–1) counts as speech rather than a room's own hum. */
const SPEAKING_RMS = 0.035
/** Sustained for this long before the ring lights — a cough is not a turn to speak. */
const ONSET_MS = 120
/** Held for this long after it drops, so ordinary pauses between words do not flicker. */
const RELEASE_MS = 400
/** How often the analyser is read. Fast enough for a 120 ms onset to be measured. */
const SAMPLE_MS = 50

interface MicRig {
  stream: MediaStream
  context: AudioContext
  timer: number
}

interface RemoteVoice {
  element: HTMLAudioElement
  consumerId: string
  close(): void
}

interface CallRig {
  device: Device
  send: Transport
  recv: Transport
  producer: Producer | null
  /** producerId → the element playing it. */
  consumers: Map<string, RemoteVoice>
}

/**
 * Whether this browser can open a microphone at all.
 *
 * `getUserMedia` is absent outside a secure context, which in practice means
 * the app served over plain HTTP on a phone — worth naming, because "nothing
 * happened" is the least useful thing a Join button can do.
 */
function micReason(): string | null {
  if (typeof window === 'undefined') return null
  if (!window.isSecureContext) {
    return 'A microphone can only be opened over a secure (https) connection.'
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    return 'This browser does not offer microphone access.'
  }
  if (typeof window.AudioContext === 'undefined') {
    return 'This browser cannot measure microphone level.'
  }
  return null
}

export function useRoomAudio(roomId: string, selfId: string, channel?: RoomChannel | null): RoomAudio {
  const unsupportedReason = useMemo(() => micReason(), [])
  const [state, setState] = useState<RoomAudioState>(unsupportedReason ? 'unsupported' : 'idle')
  const [localReason, setLocalReason] = useState<string | null>(unsupportedReason)
  const [muted, setMuted] = useState(false)
  const [selfSpeaking, setSelfSpeaking] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const [voiceReconnecting, setVoiceReconnecting] = useState(false)

  const rig = useRef<MicRig | null>(null)
  const call = useRef<CallRig | null>(null)
  const mutedRef = useRef(false)
  const aboveSince = useRef<number | null>(null)
  const belowSince = useRef<number | null>(null)
  const guard = useRef(createMicGuard())
  /**
   * Whether the student asked to be *in the call*, as opposed to merely having
   * the microphone open. Survives a dropped socket, which is the whole point:
   * it is what tells the reconnect whether to rebuild anything.
   */
  const wantCall = useRef(false)
  /** One rebuild at a time; a flapping connection must not stack negotiations. */
  const rebuilding = useRef(false)

  // The channel object is rebuilt on every render of its owner; the async join
  // needs the current one without being re-created for it.
  const channelRef = useRef<RoomChannel | null>(channel ?? null)
  channelRef.current = channel ?? null

  const closeCall = useCallback(() => {
    const current = call.current
    call.current = null
    setCallActive(false)
    if (!current) return
    for (const voice of current.consumers.values()) voice.close()
    current.consumers.clear()
    try { current.producer?.close() } catch { /* already closed */ }
    try { current.send.close() } catch { /* already closed */ }
    try { current.recv.close() } catch { /* already closed */ }
    channelRef.current?.send({ type: 'sfu:close' })
  }, [])

  const teardown = useCallback(() => {
    // Bumped first, so a `getUserMedia` still waiting on the permission prompt
    // is already stale by the time it resolves and stops its own stream.
    guard.current.release()
    closeCall()
    const current = rig.current
    rig.current = null
    aboveSince.current = null
    belowSince.current = null
    if (!current) return
    window.clearInterval(current.timer)
    stopStream(current.stream)
    void current.context.close().catch(() => undefined)
  }, [closeCall])

  const leave = useCallback(() => {
    wantCall.current = false
    setVoiceReconnecting(false)
    teardown()
    channelRef.current?.send({ type: 'speaking', speaking: false })
    setSelfSpeaking(false)
    setMuted(false)
    mutedRef.current = false
    setState(unsupportedReason ? 'unsupported' : 'idle')
    setLocalReason(unsupportedReason)
  }, [teardown, unsupportedReason])

  /**
   * Play one remote producer.
   *
   * The element stays muted until the server has resumed the consumer, because
   * a consumer starts paused: attaching an unmuted element to a stream that is
   * not flowing yet is how the first syllable of every sentence is lost.
   */
  const consumeProducer = useCallback(async (producerId: string) => {
    const live = channelRef.current
    const current = call.current
    if (!live?.connected || !current || current.consumers.has(producerId)) return

    const params = await live.request<{ id: string; kind: string; rtpParameters: unknown }>({
      type: 'sfu:consume',
      transportId: current.recv.id,
      producerId,
      rtpCapabilities: current.device.rtpCapabilities,
    })
    // The call may have been torn down while the answer was in flight.
    if (call.current !== current) return

    const consumer = await current.recv.consume({
      id: params.id,
      producerId,
      kind: params.kind as 'audio',
      rtpParameters: params.rtpParameters as never,
    })
    if (call.current !== current) {
      consumer.close()
      return
    }

    const element = new Audio()
    element.autoplay = true
    element.muted = true
    element.srcObject = new MediaStream([consumer.track])

    const voice = {
      element,
      consumerId: consumer.id,
      close() {
        try { consumer.close() } catch { /* already closed */ }
        element.pause()
        element.srcObject = null
      },
    }

    /*
     * Registered only once the resume has landed.
     *
     * Registering first and resuming after looks tidier and is wrong: if the
     * resume times out, the entry is in the map with `muted = true`, so the
     * effect below sees this producer as already handled and never retries it.
     * That peer is then permanently inaudible to this listener, silently. Now a
     * failed resume tears the consumer down and leaves the producer unclaimed,
     * so the next pass through the effect tries again.
     */
    try {
      await live.request({ type: 'sfu:resume', consumerId: consumer.id })
    } catch (error) {
      voice.close()
      throw error
    }
    if (call.current !== current) {
      voice.close()
      return
    }
    current.consumers.set(producerId, voice)
    element.muted = false
    // Autoplay is allowed here: the student pressed Join voice and granted the
    // microphone in the same gesture. A refusal is one voice that stays silent,
    // not a failed call, so it is swallowed.
    void element.play().catch(() => undefined)
  }, [])

  /**
   * Negotiate a real call for an open microphone.
   *
   * Returns false — without throwing — when there is no transport to negotiate
   * over. The microphone stays open and the level meter still works, which is
   * the only truthful thing left to offer; the room says so in `reason`.
   */
  const startCall = useCallback(async (stream: MediaStream, token: number): Promise<boolean> => {
    const live = channelRef.current
    if (!live?.connected || !live.sfu?.available) return false

    // Loaded on demand so demo mode never downloads an SFU client it has no
    // server for, and the rooms bundle stays the size of the rooms.
    const { Device } = await import('mediasoup-client')
    if (!guard.current.isCurrent(token)) return false

    const capabilities = await live.request<{ rtpCapabilities: unknown; iceServers?: RTCIceServer[] }>({
      type: 'sfu:rtpCapabilities',
    })
    if (!guard.current.isCurrent(token)) return false

    const device = new Device()
    await device.load({ routerRtpCapabilities: capabilities.rtpCapabilities as never })
    if (!guard.current.isCurrent(token)) return false

    const openTransport = async (direction: 'send' | 'recv'): Promise<Transport> => {
      const params = await live.request<{
        id: string
        iceParameters: unknown
        iceCandidates: unknown
        dtlsParameters: unknown
        iceServers?: RTCIceServer[]
      }>({ type: 'sfu:createTransport', direction })
      const options = {
        id: params.id,
        iceParameters: params.iceParameters,
        iceCandidates: params.iceCandidates,
        dtlsParameters: params.dtlsParameters,
        iceServers: params.iceServers ?? capabilities.iceServers,
      } as never
      const transport = direction === 'send'
        ? device.createSendTransport(options)
        : device.createRecvTransport(options)

      transport.on('connect', ({ dtlsParameters }, callback, errback) => {
        live.request({ type: 'sfu:connectTransport', transportId: transport.id, dtlsParameters })
          .then(() => callback())
          .catch((error) => errback(error as Error))
      })

      /*
       * The signalling above only proves the server agreed to a call; the
       * audio itself rides ICE to the addresses in `iceCandidates`, and when
       * those are unreachable — a media port range the firewall does not open,
       * an announced address that is the server's private one — nothing here
       * ever rejects. `produce` resolves, the room says you are in the call,
       * and everyone hears silence. So a transport that reaches `failed` is
       * torn down with a reason the student can read, and the addresses it
       * was dialling are logged for whoever is debugging the deployment.
       */
      transport.on('connectionstatechange', (connectionState) => {
        if (connectionState !== 'failed') return
        const dialled = (params.iceCandidates as { protocol?: string; address?: string; ip?: string; port?: number }[])
          .map((candidate) => `${candidate.protocol ?? '?'}://${candidate.address ?? candidate.ip ?? '?'}:${candidate.port ?? '?'}`)
        console.warn(`[rooms] voice ${direction} transport failed; media server candidates: ${dialled.join(' ')}`)
        if (!guard.current.isCurrent(token) || !call.current) return
        closeCall()
        setLocalReason(VOICE_MEDIA_REASON)
      })
      return transport
    }

    const send = await openTransport('send')
    const recv = await openTransport('recv')
    if (!guard.current.isCurrent(token)) {
      send.close()
      recv.close()
      return false
    }

    send.on('produce', ({ kind, rtpParameters }, callback, errback) => {
      live.request<{ producerId: string }>({ type: 'sfu:produce', transportId: send.id, kind, rtpParameters })
        .then((result) => callback({ id: result.producerId }))
        .catch((error) => errback(error as Error))
    })

    const [track] = stream.getAudioTracks()
    if (!track) {
      send.close()
      recv.close()
      return false
    }
    const producer = await send.produce({ track })
    if (mutedRef.current) await producer.pause()
    if (!guard.current.isCurrent(token)) {
      producer.close()
      send.close()
      recv.close()
      return false
    }

    call.current = { device, send, recv, producer, consumers: new Map() }
    setCallActive(true)

    // Whoever was already talking when we walked in. New arrivals come through
    // the channel as `sfu:newProducer` and are picked up by the effect below.
    try {
      const existing = await live.request<{ producers: { producerId: string; userId: string }[] }>({
        type: 'sfu:producers',
      })
      for (const info of existing.producers ?? []) await consumeProducer(info.producerId)
    } catch {
      // A room whose existing producers could not be listed is still a room you
      // can talk in; the next person to speak arrives through the channel.
    }
    return true
  }, [consumeProducer, closeCall])

  const join = useCallback(async () => {
    if (unsupportedReason) return
    if (rig.current) return
    const token = guard.current.begin()
    setState('joining')
    setLocalReason(null)
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (error) {
      // Even a refusal is only worth reporting to a room the student is still
      // standing in; otherwise this sets state on a component nobody is looking at.
      if (!guard.current.isCurrent(token)) return
      setState('error')
      setLocalReason(
        (error as DOMException | undefined)?.name === 'NotAllowedError'
          ? 'Microphone access was refused, so nothing is being captured.'
          : 'That microphone could not be opened.',
      )
      return
    }

    // The student may have left the room while the permission prompt was open.
    // `adopt` stops every track and returns false when they have, which is the
    // only chance to avoid a live capture nothing will ever tear down again.
    if (!guard.current.adopt(token, stream)) return

    try {
      const context = new AudioContext()
      const source = context.createMediaStreamSource(stream)
      const analyser = context.createAnalyser()
      analyser.fftSize = 1024
      source.connect(analyser)
      // Deliberately not connected to `context.destination`: routing your own
      // microphone to your own speakers is feedback, not monitoring.

      const samples = new Float32Array(analyser.fftSize)
      const timer = window.setInterval(() => {
        analyser.getFloatTimeDomainData(samples)
        let sum = 0
        for (const sample of samples) sum += sample * sample
        const rms = Math.sqrt(sum / samples.length)
        const now = Date.now()
        if (mutedRef.current) {
          aboveSince.current = null
          belowSince.current = null
          setSelfSpeaking(false)
          return
        }
        if (rms >= SPEAKING_RMS) {
          belowSince.current = null
          aboveSince.current ??= now
          if (now - aboveSince.current >= ONSET_MS) setSelfSpeaking(true)
        } else {
          aboveSince.current = null
          belowSince.current ??= now
          if (now - belowSince.current >= RELEASE_MS) setSelfSpeaking(false)
        }
      }, SAMPLE_MS)

      rig.current = { stream, context, timer }
      setState('live')
    } catch {
      stopStream(stream)
      if (!guard.current.isCurrent(token)) return
      setState('error')
      setLocalReason('That microphone could not be measured.')
      return
    }

    // The microphone is open and honest either way; the call is the part that
    // can fail, and failing it must not take the level meter down with it.
    wantCall.current = Boolean(channelRef.current)
    try {
      await startCall(stream, token)
    } catch {
      if (!guard.current.isCurrent(token)) return
      closeCall()
      setLocalReason('Voice could not connect, so nobody can hear you in this room.')
    }
  }, [unsupportedReason, startCall, closeCall])

  /**
   * The socket came back, or went away, while the student was in the call.
   *
   * A dropped socket is not a pause on the server: `hub.remove` runs
   * `sfu.closePeer`, which closes this member's transports and producers. So
   * after three seconds of bad wifi the objects this hook holds name things
   * that no longer exist — every `sfu:consume` is answered `unknown_transport`,
   * the producer is gone, and nobody can hear anybody. Nothing used to rebuild
   * them, and because `callActive` stayed true the room went on telling the
   * student they were in the room's voice while the feature was silently and
   * permanently dead. The only recovery was Leave then Join, which nothing
   * suggested.
   *
   * So: losing the socket tears the call down honestly, and getting it back
   * negotiates a fresh one from the microphone that is still open.
   */
  const connected = channel?.connected ?? false
  useEffect(() => {
    if (state !== 'live' || !wantCall.current) return

    if (!connected) {
      if (callActive) {
        closeCall()
        setVoiceReconnecting(true)
      }
      return
    }
    if (callActive || rebuilding.current) return

    rebuilding.current = true
    setVoiceReconnecting(true)
    void (async () => {
      // A fresh token, so a teardown during the rebuild invalidates it exactly
      // as it would invalidate a join. `closeCall` first, or `send.produce`
      // would run twice against two transports.
      const token = guard.current.begin()
      closeCall()
      try {
        const stream = rig.current?.stream
        if (stream) await startCall(stream, token)
      } catch {
        if (guard.current.isCurrent(token)) {
          closeCall()
          setLocalReason('Voice could not reconnect, so nobody can hear you in this room.')
        }
      } finally {
        rebuilding.current = false
        setVoiceReconnecting(false)
      }
    })()
  }, [connected, state, callActive, closeCall, startCall])

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current
      mutedRef.current = next
      // Muting has to actually stop the track, not just stop drawing the ring:
      // an "off" button that only hid a dot would have been broadcasting all along.
      for (const track of rig.current?.stream.getAudioTracks() ?? []) track.enabled = !next
      const producer = call.current?.producer
      if (producer) {
        try {
          if (next) void producer.pause()
          else void producer.resume()
        } catch { /* the transport is already gone */ }
        channelRef.current?.send({ type: 'sfu:pause', producerId: producer.id, paused: next })
      }
      if (next) {
        setSelfSpeaking(false)
        channelRef.current?.send({ type: 'speaking', speaking: false })
      }
      return next
    })
  }, [])

  /** Leaving the page, the room, or switching rooms all release the microphone. */
  useEffect(() => () => teardown(), [teardown])
  useEffect(() => {
    leave()
    // Only when the room itself changes: `leave` is stable, and re-running this
    // on every render would drop the microphone as fast as it was opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  /** Your own ring is local; everyone else's copy of it comes from the room. */
  useEffect(() => {
    if (state !== 'live') return
    channelRef.current?.send({ type: 'speaking', speaking: selfSpeaking })
  }, [selfSpeaking, state])

  /**
   * Somebody started talking who was not talking before.
   *
   * Driven by the channel's producer list rather than by an event handler, so a
   * producer that arrived while the transports were still being built is picked
   * up the moment they exist, and one that arrived twice is consumed once.
   */
  const producers = channel?.producers
  useEffect(() => {
    if (!callActive || !producers) return
    const current = call.current
    if (!current) return
    const wanted = new Set(producers.map((producer) => producer.producerId))
    for (const [producerId, voice] of current.consumers) {
      if (wanted.has(producerId)) continue
      voice.close()
      current.consumers.delete(producerId)
    }
    for (const producer of producers) {
      if (current.consumers.has(producer.producerId)) continue
      void consumeProducer(producer.producerId).catch(() => undefined)
    }
  }, [producers, callActive, consumeProducer])

  /**
   * The whole room's speaking, not just yours.
   *
   * A fresh set each time rather than a shared singleton: `speaking` is typed
   * `Set<string>`, so a consumer that calls `.add()` on it would otherwise be
   * mutating one object every room in the app shares.
   */
  const remoteSpeaking = channel?.speaking
  const speaking = useMemo(() => {
    const set = new Set(remoteSpeaking ?? [])
    if (!selfId) return set
    if (selfSpeaking) set.add(selfId)
    else set.delete(selfId)
    return set
  }, [remoteSpeaking, selfSpeaking, selfId])

  /**
   * Why nobody can hear you, when that is the case.
   *
   * Nothing at all once the call is up: a standing note saying voice does not
   * work, printed under a working call, is worse than no note.
   */
  const transportReason = callActive || voiceReconnecting
    ? null
    : channel
      ? (channel.sfu && !channel.sfu.available && channel.sfu.reason) || VOICE_TRANSPORT_REASON
      : DEMO_VOICE_REASON

  return {
    state,
    muted,
    speaking,
    join,
    leave,
    toggleMute,
    reason: localReason ?? transportReason ?? undefined,
    callActive,
    voiceReconnecting,
  }
}
