package com.nishany.android.core.rooms

import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong
import kotlin.random.Random
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener

/**
 * One study room's live socket — the Android peer of `useRoomChannel.ts`.
 *
 * Everything it *decides* lives in [RoomProtocol] and is tested there; this
 * owns only the WebSocket, the retries, and the request/response bookkeeping —
 * the parts that need OkHttp. The token is re-read on every attempt, so a
 * reconnect after a long sleep never presents the one that expired while the
 * phone was off.
 *
 * The bearer token rides as a WebSocket subprotocol (a browser cannot set an
 * `Authorization` header on a socket, and the server settled on the
 * subprotocol for every client); the header is also sent for good measure —
 * the server accepts it but still requires the `nishany.bearer` subprotocol be
 * offered, which it is.
 */
class RoomChannel(
    private val baseUrl: String?,
    private val code: String,
    private val client: OkHttpClient,
    private val tokenProvider: suspend () -> String?,
    private val scope: CoroutineScope,
) {
    private val _state = MutableStateFlow(RoomChannelState())
    val state: StateFlow<RoomChannelState> = _state.asStateFlow()

    val connected: Boolean get() = _state.value.status == RoomStatus.OPEN
    val selfId: String? get() = _state.value.selfId
    val sfu: RoomSfu? get() = _state.value.sfu

    private val pending = ConcurrentHashMap<Long, CompletableDeferred<JsonObject>>()
    private val nextRequestId = AtomicLong(0)

    @Volatile private var socket: WebSocket? = null
    @Volatile private var generation = 0
    @Volatile private var stopped = false
    @Volatile private var permanent = false
    private var retries = 0

    /** Whether a 4403 asked the caller to re-read the party (the room moved on). */
    @Volatile var shouldRereadParty = false
        private set

    fun start() {
        if (stopped) return
        connect()
    }

    private fun connect() {
        val mine = ++generation
        scope.launch {
            if (stopped || mine != generation) return@launch
            _state.update { RoomProtocol.onConnecting(it) }

            val token = runCatching { tokenProvider() }.getOrNull()
            if (stopped || mine != generation) return@launch
            val url = RoomProtocol.roomSocketUrl(baseUrl, code)
            if (token == null || url == null) {
                // No session (or no base): no socket, and no point retrying.
                permanent = true
                _state.update { RoomProtocol.onClosed(it, permanent = true) }
                return@launch
            }

            val request = Request.Builder()
                .url(url)
                .header("Sec-WebSocket-Protocol", RoomProtocol.bearerSubprotocolHeader(token))
                .header("Authorization", "Bearer $token")
                .build()
            socket = client.newWebSocket(request, listenerFor(mine))
        }
    }

    private fun listenerFor(mine: Int) = object : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response) {
            if (mine == generation) retries = 0
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            if (mine != generation) return
            val message = RoomProtocol.parse(text) ?: return
            val requestId = RoomProtocol.requestIdOf(message)
            if (requestId != null) {
                val waiter = pending.remove(requestId)
                if (waiter != null) {
                    if (RoomProtocol.typeOf(message) == "error") {
                        waiter.completeExceptionally(RoomRequestException(message.errorText()))
                    } else {
                        waiter.complete(message)
                    }
                    // A refusal is also room state (the hall must be able to say
                    // voice is unavailable), so it keeps falling through.
                    if (RoomProtocol.typeOf(message) != "sfu:unavailable") return
                }
            }
            _state.update { RoomProtocol.onMessage(it, message) }
        }

        override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
            if (mine != generation) return
            webSocket.close(1000, null)
            terminate(code)
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
            if (mine != generation) return
            terminate(code)
        }

        override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
            if (mine != generation) return
            // A failed handshake or a dropped connection carries no close code;
            // a real refusal arrives as a close frame handled above. Treat this
            // as transient and let the backoff decide.
            terminate(response?.code ?: RoomProtocol.CLOSE_TRANSIENT)
        }
    }

    private fun terminate(code: Int) {
        socket = null
        failPending("The room connection closed.")
        val perm = RoomProtocol.isPermanentClose(code)
        if (perm) permanent = true
        if (RoomProtocol.shouldRereadParty(code)) shouldRereadParty = true
        _state.update { RoomProtocol.onClosed(it, perm) }
        scheduleReconnect()
    }

    private fun scheduleReconnect() {
        if (stopped || permanent) return
        val wait = RoomProtocol.backoffDelayMs(retries++) + Random.nextLong(0, 400)
        val mine = generation
        scope.launch {
            delay(wait)
            if (!stopped && !permanent && mine == generation) connect()
        }
    }

    private fun failPending(reason: String) {
        val snapshot = pending.values.toList()
        pending.clear()
        for (waiter in snapshot) waiter.completeExceptionally(RoomRequestException(reason))
    }

    /** Fire and forget: `speaking`, `presence:refresh`. No-op when the socket is not open. */
    fun send(frame: JsonObject) {
        socket?.send(frame.serialized())
    }

    /**
     * Ask and wait. Rejects if the socket closes, the answer never comes within
     * [RoomProtocol.REQUEST_TIMEOUT_MS], or the server answers `error`.
     */
    suspend fun request(frame: JsonObject): JsonObject {
        val sock = socket ?: throw RoomRequestException("The room is not connected.")
        val id = nextRequestId.incrementAndGet()
        val waiter = CompletableDeferred<JsonObject>()
        pending[id] = waiter
        val withId = JsonObject(frame + ("requestId" to JsonPrimitive(id)))
        if (!sock.send(withId.serialized())) {
            pending.remove(id)
            throw RoomRequestException("The room could not send the request.")
        }
        return try {
            withTimeoutOrNull(RoomProtocol.REQUEST_TIMEOUT_MS) { waiter.await() }
                ?: throw RoomRequestException("The room did not answer in time.")
        } catch (e: CancellationException) {
            throw e
        } finally {
            pending.remove(id)
        }
    }

    fun close() {
        stopped = true
        generation++
        failPending("The room was closed.")
        val open = socket
        socket = null
        // 1000: a deliberate close, so the server drops this member's sockets at
        // once rather than waiting for the ping to notice.
        runCatching { open?.close(1000, "left") }
        _state.update { RoomProtocol.onClosed(it, permanent = true) }
    }

    private fun JsonObject.serialized(): String =
        with(RoomProtocol) { serialize() }
}

/** A request that failed — no answer, a closed socket, or the server said `error`. */
class RoomRequestException(message: String) : Exception(message)

private fun JsonObject.errorText(): String =
    (this["error"] as? JsonPrimitive)?.content ?: "failed"
