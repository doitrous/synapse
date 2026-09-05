package com.nishany.android.core.api

import com.nishany.android.core.CortexJson
import com.nishany.android.core.model.QotdAnswerResult
import com.nishany.android.core.rooms.RoomMember
import com.nishany.android.core.rooms.RoomProtocol
import com.nishany.android.core.model.QotdFriends
import com.nishany.android.core.model.QotdLeaderboard
import com.nishany.android.core.model.QotdToday
import com.nishany.android.core.model.RoomMutation
import com.nishany.android.core.model.RoomSummary
import com.nishany.android.core.model.StudyRoom
import com.nishany.android.core.sync.StateOwnership
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.net.URLEncoder
import java.time.Instant
import java.time.format.DateTimeParseException
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.put
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response

/** The identity `GET /api/session` and `GET /api/me` both carry. */
data class SessionUser(
    val id: String,
    val email: String?,
    val role: String?,
    val aal: String?,
    val mfaRequired: Boolean,
)

/** The roster row for the caller, or null when the university has not set one up yet — a state to render, not an error. */
data class Profile(
    val studentId: String,
    val name: String?,
    val email: String?,
    val universityId: String?,
    val year: String?,
    val group: String?,
    val status: String?,
    val username: String?,
    val profileIcon: String?,
    /** ≤140 plain text, editable from Settings. Null and "" both mean "no status set" — the server clears on an empty string rather than dropping the key. */
    val statusMessage: String?,
    /** Null until the student accepts the AI-use disclaimer; see the settings AI-consent gate. */
    val aiConsentAt: Instant?,
)

/** `GET /api/me/username-available`'s answer. [reason] is only ever present when [available] is false. */
data class UsernameAvailability(val available: Boolean, val reason: String?)

/** One of the caller's own support messages, as `GET /api/me/support` lists them. */
data class SupportTicket(val id: String?, val subject: String?, val message: String, val createdAt: Instant?, val status: String?)

/** What the caller has paid for. Always present — the server substitutes a "none" default rather than omitting it. */
data class Entitlement(
    val state: String,
    val plan: String?,
    val expiresAt: Instant?,
    val daysLeft: Int?,
)

data class MeResponse(
    val user: SessionUser,
    val profile: Profile?,
    val subscription: JsonElement?,
    val entitlement: Entitlement?,
)

/** The envelope both document routes share: the stored value, and when it was last written. Both null when the key has never been written. */
data class RemoteState(val value: JsonElement?, val updatedAt: Instant?)

/** `GET /api/assistant/status`'s answer -- enough for a client to decide whether to draw a launcher at all, never more (see `assistant.js:statusFor`'s own doc). */
data class AssistantStatus(
    val available: Boolean,
    /** Why not, when [available] is false: `"disabled"`, `"unconfigured"`, or `"not_on_plan"`. Null when it is. */
    val reason: String?,
    val plan: String,
    val dailyMessages: Int,
    val used: Int,
    val remaining: Int,
)

/** One turn of `POST /api/assistant/chat`'s `messages` array. [role] is `"user"` or `"assistant"`, the server's own wire values. */
data class AssistantMessage(val role: String, val content: String)

/** `POST /api/assistant/chat`'s success shape. [reply] is null when the model returned nothing -- see `assistant.js:616`; the caller treats that as a failed turn, not an empty one. */
data class AssistantChatResult(
    val reply: String?,
    val plan: String,
    val dailyMessages: Int,
    val used: Int,
    val remaining: Int,
)

/** One voucher, as the shared catalogue stores it and [NishanyApi.redeemVoucher] echoes it back. Admin-only fields (eligibility windows, redemption counts) are left off -- this app never edits a voucher, only applies one. */
data class Voucher(
    val id: String,
    val code: String,
    val name: String?,
    val discountType: String?,
    val amount: Double?,
    val grant: String?,
    val trialDays: Int?,
)

/** `POST /api/vouchers/redeem`'s answer. Always a 200 -- a refusal is [ok] == false with a server-worded [message], not an [ApiError]; see `vouchers.js`'s own doc for why. */
data class VoucherRedeemResult(val ok: Boolean, val reason: String?, val message: String?, val voucher: Voucher?)

/** The voucher this student currently has applied, or null -- `GET /api/vouchers/mine`'s `redemption`. */
data class VoucherRedemption(val voucherId: String, val code: String, val redeemedAt: Instant?)

/** `GET /api/pricing/quote`'s answer for one billing period (`"month"` or `"term"`). */
data class PricingQuote(
    val period: String,
    val currency: String,
    val baseAmount: Double,
    val totalAmount: Double,
    /** `"promo"` or `"voucher"`, when [totalAmount] is discounted off [baseAmount]. Null at the plain base price. */
    val discountKind: String?,
    val discountCode: String?,
)

/** A study party (a study room) as `POST /api/parties/join` returns it. Members carry the same shape `presence` broadcasts. */
data class JoinedParty(
    val id: String,
    val code: String,
    val name: String?,
    val members: List<RoomMember>,
)

/** `POST /api/parties/join`'s answer. A wrong code or wrong-cohort join is [ok] == false with a server [reason], not an [ApiError]. */
data class JoinPartyResult(val ok: Boolean, val reason: String?, val party: JoinedParty?)

/**
 * The only thing in this app that speaks HTTP.
 *
 * It holds no cache and no state — that belongs to the sync engine, which is
 * the only caller and the only thing that decides when to fetch. This class
 * knows three things only: how to attach a token, how to reach the handful
 * of routes the app needs, and how to turn a status code into an [ApiError]
 * the caller can act on.
 */
class NishanyApi(
    private val baseUrl: String,
    private val client: OkHttpClient,
    private val tokenProvider: suspend () -> String?,
) {
    /**
     * `GET /api/session` never returns 401 — an anonymous caller gets a 200
     * with a null user. A null result here is that normal, signed-out
     * answer, not a failure.
     */
    suspend fun session(): SessionUser? {
        val root = requestObject("GET", "/api/session")
        val userElement = root["user"]
        if (userElement == null || userElement is JsonNull) return null
        return decodeSessionUser(userElement.asObjectOrMalformed("user"))
    }

    suspend fun me(): MeResponse {
        val root = requestObject("GET", "/api/me")
        val user = decodeSessionUser(root["user"].asObjectOrMalformed("user"))
        // Nullable by design: server/src/index.js:158-163 says a missing
        // roster row is a 200 with nulls rather than a 404 — "your
        // university has not set up your profile yet" is a state the app
        // renders, not an error.
        val profileElement = root["profile"]
        val profile = if (profileElement == null || profileElement is JsonNull) {
            null
        } else {
            decodeProfile(profileElement.asObjectOrMalformed("profile"))
        }
        val subscription = root["subscription"]?.takeUnless { it is JsonNull }
        val entitlementElement = root["entitlement"]
        val entitlement = if (entitlementElement == null || entitlementElement is JsonNull) {
            null
        } else {
            decodeEntitlement(entitlementElement.asObjectOrMalformed("entitlement"))
        }
        return MeResponse(user = user, profile = profile, subscription = subscription, entitlement = entitlement)
    }

    /**
     * Timestamps only, keyed by every key the caller is allowed to read.
     * A key that has never been written comes back as `null` rather than
     * being dropped — that distinction ("nothing stored yet" vs. "not in the
     * contract") only survives if the null entry is put into the map, so no
     * filtering happens here.
     */
    suspend fun manifest(): Map<String, Instant?> {
        val root = requestObject("GET", "/api/state/manifest")
        val keys = root["keys"].asObjectOrMalformed("keys")
        val out = LinkedHashMap<String, Instant?>()
        for ((key, value) in keys) {
            out[key] = if (value is JsonNull) null else parseInstant(value, "keys.$key")
        }
        return out
    }

    suspend fun readState(key: String): RemoteState {
        val root = requestObject("GET", StateOwnership.pathFor(key))
        return decodeRemoteState(root)
    }

    /** Body is `{"value": ...}` on both document routes. A student write to a catalogue key is a 403 by design; this does not special-case it away. */
    suspend fun writeState(key: String, value: JsonElement) {
        val body = JsonObject(mapOf("value" to value)).toString()
        request("PUT", StateOwnership.pathFor(key), body)
    }

    // --- Question of the Day ---

    /** Today's QotD status for the caller's cohort. The question body is resolved from the local ledger by [QotdToday.questionId]. */
    suspend fun qotdToday(): QotdToday = decodeQotdToday(requestObject("GET", "/api/qotd/today"))

    /**
     * Answer today's question. `answerIndex` is a position in the option list
     * (blank options dropped, the order the server marks against), not a label.
     * The server marks it and returns the outcome; the app never self-marks QotD.
     */
    suspend fun qotdAnswer(questionId: String, answerIndex: Int): QotdAnswerResult {
        val body = buildJsonObject {
            put("questionId", questionId)
            put("answerIndex", answerIndex)
        }.toString()
        return decodeQotdAnswer(requestObject("POST", "/api/qotd/answer", body))
    }

    /** The cohort leaderboard (server caps the size; no query is sent). */
    suspend fun qotdLeaderboard(): QotdLeaderboard = decodeQotdLeaderboard(requestObject("GET", "/api/qotd/leaderboard"))

    /** Today's results for the caller's friends. */
    suspend fun qotdFriends(): QotdFriends = decodeQotdFriends(requestObject("GET", "/api/qotd/friends"))

    /**
     * `POST /api/maristanas/study-heartbeat` -- the one path that credits
     * study minutes, shared by every study surface (web's `StudyActivityTracker`
     * included). [bucket] must be computed fresh at send time: the server
     * rejects a bucket more than 2 minutes off its own clock.
     */
    suspend fun studyHeartbeat(bucket: Long, sessionId: String, surface: String): Boolean {
        val body = buildJsonObject {
            put("bucket", bucket)
            put("sessionId", sessionId)
            put("surface", surface)
        }.toString()
        val root = requestObject("POST", "/api/maristanas/study-heartbeat", body)
        return root["accepted"].booleanOrMalformed("maristanas.study-heartbeat.accepted")
    }

    // --- Settings ---

    /** Whether [handle] is free to take, compared the same case-insensitive way the server stores it. Debounce on the caller's side — this hits the network on every call. */
    suspend fun usernameAvailable(handle: String): UsernameAvailability {
        val encoded = URLEncoder.encode(handle, "UTF-8")
        val root = requestObject("GET", "/api/me/username-available?handle=$encoded")
        return UsernameAvailability(
            available = root["available"].booleanOrMalformed("available"),
            reason = root["reason"].stringOrNull(),
        )
    }

    /**
     * `PUT /api/me/enrolment`. [universityId] and [year] are the caller's own
     * locked values, resent unchanged — `saveOwnEnrolment` on the server
     * (server/src/accounts.js:848) still 400s without them even when only
     * [statusMessage] is what actually changed, so a status-only edit is not
     * a smaller request than a full one.
     *
     * [statusMessage] is sent whenever non-null, empty string included —
     * that is how the caller clears it; a null here leaves it untouched
     * rather than clearing it.
     */
    suspend fun updateEnrolment(
        universityId: String?,
        year: String?,
        group: String? = null,
        username: String? = null,
        profileIcon: String? = null,
        statusMessage: String? = null,
    ): Profile {
        val body = buildJsonObject {
            universityId?.let { put("universityId", it) }
            year?.let { put("year", it) }
            group?.let { put("group", it) }
            username?.let { put("username", it) }
            profileIcon?.let { put("profileIcon", it) }
            if (statusMessage != null) put("statusMessage", statusMessage)
        }.toString()
        val root = requestObject("PUT", "/api/me/enrolment", body)
        return decodeProfile(root["profile"].asObjectOrMalformed("profile"))
    }

    /** `POST /api/me/enrollment-change-requests`. [field] is `"university"` or `"year"`; the server rejects any other value. */
    suspend fun requestEnrollmentChange(field: String, requestedValue: String, reason: String) {
        val body = buildJsonObject {
            put("field", field)
            put("requestedValue", requestedValue)
            put("reason", reason)
        }.toString()
        request("POST", "/api/me/enrollment-change-requests", body)
    }

    /** `POST /api/me/support`. [subject] is optional; the server is free to default it. */
    suspend fun submitSupport(subject: String?, message: String) {
        val body = buildJsonObject {
            subject?.let { put("subject", it) }
            put("message", message)
        }.toString()
        request("POST", "/api/me/support", body)
    }

    /**
     * `GET /api/me/support`. The list key isn't pinned by this task's brief
     * yet, so every plausible name is tried in turn — the same defensive
     * shape as `manifest()`'s null-tolerant reads, because a wrong guess here
     * should degrade to an empty history, not break Settings' Help section.
     */
    suspend fun listSupport(): List<SupportTicket> {
        val root = requestObject("GET", "/api/me/support")
        val array = SUPPORT_LIST_KEYS.firstNotNullOfOrNull { root[it] as? JsonArray } ?: JsonArray(emptyList())
        return array.mapNotNull { element ->
            val obj = element as? JsonObject ?: return@mapNotNull null
            SupportTicket(
                id = obj["id"].stringOrNull(),
                subject = obj["subject"].stringOrNull(),
                message = obj["message"].stringOrNull() ?: "",
                createdAt = obj["createdAt"]?.takeUnless { it is JsonNull }?.let { runCatching { parseInstant(it, "support.createdAt") }.getOrNull() },
                status = obj["status"].stringOrNull(),
            )
        }
    }

    /** `POST /api/me/consent/ai`. Records that the student accepted the AI-use disclaimer; returns the timestamp the server stamped it with. */
    suspend fun consentAi(): Instant {
        val root = requestObject("POST", "/api/me/consent/ai")
        return parseInstant(root["aiConsentAt"] ?: throw ApiError.Malformed("expected aiConsentAt"), "aiConsentAt")
    }

    /** `DELETE /api/account`. Hard-deletes the caller's own account, on the server, in one transaction — see `DeleteAccountDialog`'s doc for why nothing here is a soft delete. */
    suspend fun deleteAccount() {
        request("DELETE", "/api/account")
    }

    // --- Library / resources ---

    /**
     * Streams `GET /api/medical-resources/:id`'s bytes to [destination] --
     * this is the one route in the app whose response is not JSON. Written
     * via a `.part` sibling file, renamed into place only once the whole
     * body has landed, so a cancelled or failed download never leaves a
     * half-written PDF at [destination] for [com.nishany.android.core.library.ResourceFileStore]
     * to mistake for a complete one.
     *
     * [onProgress] is called with a 0..1 fraction whenever the server sends
     * a `Content-Length`; it is never called at all otherwise (chunked
     * responses have no known total), so callers must treat "no progress
     * update" as "can't tell", not as "stuck".
     *
     * A resource with no source URI and no uploaded file is a 404
     * ([ApiError.NotFound]), matching `server/src/index.js`'s
     * `/api/medical-resources/:resourceId` -- a source-URI resource 302s
     * straight to it, which OkHttp follows transparently.
     */
    suspend fun downloadResourceFile(id: String, destination: File, onProgress: (Float) -> Unit = {}) {
        val token = tokenProvider()
        val builder = Request.Builder().url("$baseUrl/api/medical-resources/$id")
        if (token != null) builder.header("Authorization", "Bearer $token")

        val response = client.newCall(builder.get().build()).await()
        response.use {
            val status = it.code
            if (status !in 200..299) {
                throw when (status) {
                    401 -> ApiError.Unauthorized
                    403 -> ApiError.Forbidden
                    404 -> ApiError.NotFound
                    else -> ApiError.Transient(status)
                }
            }
            val body = it.body ?: throw ApiError.Malformed("empty resource body")
            val total = body.contentLength()

            val partial = File(destination.parentFile, "${destination.name}.part")
            body.byteStream().use { input ->
                FileOutputStream(partial).use { output ->
                    val buffer = ByteArray(64 * 1024)
                    var written = 0L
                    while (true) {
                        val read = input.read(buffer)
                        if (read == -1) break
                        output.write(buffer, 0, read)
                        written += read
                        if (total > 0) onProgress((written.toFloat() / total).coerceIn(0f, 1f))
                    }
                }
            }
            destination.delete()
            if (!partial.renameTo(destination)) throw ApiError.Malformed("could not save downloaded resource")
        }
    }

    // --- Study assistant ---

    /** `GET /api/assistant/status`. Always 200 for a signed-in caller (`assistant.js:354`) — a launcher checks [AssistantStatus.available] before drawing itself, rather than treating a load failure and "switched off" as different things. */
    suspend fun assistantStatus(): AssistantStatus = decodeAssistantStatus(requestObject("GET", "/api/assistant/status"))

    /**
     * `POST /api/assistant/chat`. [messages] is the whole turn history the
     * caller wants answered, oldest first — the server trims to its own
     * window (`assistant.js`'s `MAX_TURNS`), so nothing here has to.
     *
     * A refusal (quota exhausted, not on plan, assistant disabled, upstream
     * failure) comes back as a non-2xx status with no typed body on this
     * path — [request] turns it into the matching [ApiError] (403 =
     * [ApiError.Forbidden] for "not on plan", 429/503/502 =
     * [ApiError.Transient]) the same way every other write in this class
     * does. Only the 2xx body is decoded here.
     */
    suspend fun assistantChat(messages: List<AssistantMessage>, lang: String, context: JsonElement? = null): AssistantChatResult {
        val body = buildJsonObject {
            put("messages", JsonArray(messages.map { buildJsonObject { put("role", it.role); put("content", it.content) } }))
            put("lang", lang)
            context?.let { put("context", it) }
        }.toString()
        return decodeAssistantChatResult(requestObject("POST", "/api/assistant/chat", body))
    }

    // --- Study rooms ---

    /**
     * `POST /api/parties/join`. Joins the party for [code] (idempotent — already
     * a member is fine) and returns it so the caller can open the room socket.
     * A wrong code, or a party in another cohort, is a normal `{ ok: false,
     * reason }` answer (the two look the same from outside, by design), not a
     * thrown [ApiError].
     */
    suspend fun joinParty(code: String): JoinPartyResult {
        val body = buildJsonObject { put("code", code.trim().uppercase()) }.toString()
        val root = requestObject("POST", "/api/parties/join", body)
        val ok = (root["ok"] as? JsonPrimitive)?.booleanOrNull ?: false
        val party = (root["party"] as? JsonObject)?.let(::decodeJoinedParty)
        return JoinPartyResult(ok = ok, reason = root["reason"].stringOrNull(), party = party)
    }

    private fun decodeJoinedParty(obj: JsonObject): JoinedParty {
        val members = (obj["members"] as? JsonArray).orEmpty().mapNotNull { element ->
            (element as? JsonObject)?.let(RoomProtocol::memberFromJson)
        }
        return JoinedParty(
            id = obj["id"].stringOrMalformed("party.id"),
            code = obj["code"].stringOrMalformed("party.code"),
            name = obj["name"].stringOrNull(),
            members = members,
        )
    }

    // --- Study Together (shared tests, `/api/study-rooms/*`) ---
    //
    // A separate system from "Study rooms" above (`/api/parties/*`, voice-only):
    // an asynchronous shared test. A host builds a room from a frozen list of
    // question ids, everyone joins by code, the host starts it, and everyone
    // answers the same set at their own pace -- see `server/src/studyRooms.js`'s
    // own doc for why this is deliberately not a live/websocket surface.

    /** `POST /api/study-rooms`. A refusal (no valid questions, catalogue locked) is `{ ok: false, reason }`, not a thrown [ApiError]. */
    suspend fun createStudyRoom(name: String, questionIds: List<String>, timed: Boolean, secondsPerQuestion: Int?): RoomMutation {
        val body = buildJsonObject {
            put("name", name)
            put("questionIds", JsonArray(questionIds.map { JsonPrimitive(it) }))
            put("timed", timed)
            put("secondsPerQuestion", secondsPerQuestion?.let { JsonPrimitive(it) } ?: JsonNull)
        }.toString()
        return decodeRoomMutation(requestObject("POST", "/api/study-rooms", body))
    }

    /** `POST /api/study-rooms/join`. A wrong or closed code is `{ ok: false, reason }`, not a thrown [ApiError]. */
    suspend fun joinStudyRoom(code: String): RoomMutation {
        val body = buildJsonObject { put("code", code) }.toString()
        return decodeRoomMutation(requestObject("POST", "/api/study-rooms/join", body))
    }

    /** `GET /api/study-rooms/mine`. Rooms this student hosts or has joined, most recent first. */
    suspend fun myStudyRooms(): List<RoomSummary> {
        val root = requestObject("GET", "/api/study-rooms/mine")
        val array = root["rooms"] as? JsonArray ?: JsonArray(emptyList())
        return array.mapNotNull { (it as? JsonObject)?.let(::decodeRoomSummary) }
    }

    /** `GET /api/study-rooms/:id`. A non-member gets the same 404 as a non-existent room -- see the route's own doc on the server. */
    suspend fun studyRoom(id: String): StudyRoom =
        decodeStudyRoomOrThrow(requestObject("GET", "/api/study-rooms/$id")["room"])

    /** `POST /api/study-rooms/:id/start`. Host-only, enforced by the server (`reason: "not_host"` otherwise). */
    suspend fun startStudyRoom(id: String): RoomMutation =
        decodeRoomMutation(requestObject("POST", "/api/study-rooms/$id/start"))

    /**
     * `POST /api/study-rooms/:id/answers`.
     *
     * [chosenIndex] is a position in the question's option list, not a label.
     * The server marks it against the same published projection the app reads
     * for the solo bank, which drops blank options in the same order -- so the
     * indexes line up. Sending a label here would mark every answer against
     * the wrong option. The server never trusts a client-supplied verdict:
     * this call's [RoomMutation.room] is null on success (the server answers
     * `{ ok: true, correct, correctIndex }` here, not a fresh room) -- the
     * caller re-fetches via [studyRoom] to see the marked answer reflected.
     */
    suspend fun submitStudyRoomAnswer(roomId: String, questionId: String, chosenIndex: Int, seconds: Int): RoomMutation {
        val body = buildJsonObject {
            put("questionId", questionId)
            put("chosenIndex", chosenIndex)
            put("seconds", seconds)
        }.toString()
        return decodeRoomMutation(requestObject("POST", "/api/study-rooms/$roomId/answers", body))
    }

    /** `POST /api/study-rooms/:id/finish`. Idempotent -- finishing twice is a no-op success, matching the server's `ON DUPLICATE`-free `WHERE finished_at IS NULL` guard. */
    suspend fun finishStudyRoom(id: String): RoomMutation =
        decodeRoomMutation(requestObject("POST", "/api/study-rooms/$id/finish"))

    private fun decodeStudyRoomOrThrow(element: JsonElement?): StudyRoom =
        decodeStudyRoom(element.asObjectOrMalformed("room"))

    private fun decodeStudyRoom(obj: JsonObject): StudyRoom = StudyRoom(
        id = obj["id"].stringOrMalformed("room.id"),
        code = obj["code"].stringOrMalformed("room.code"),
        name = obj["name"].stringOrMalformed("room.name"),
        isHost = obj["isHost"].booleanOrMalformed("room.isHost"),
        status = obj["status"].stringOrMalformed("room.status"),
        timed = obj["timed"].booleanOrMalformed("room.timed"),
        secondsPerQuestion = (obj["secondsPerQuestion"] as? JsonPrimitive)?.intOrNull,
        questionCount = obj["questionCount"].intOrMalformed("room.questionCount"),
        questionIds = (obj["questionIds"] as? JsonArray)?.mapNotNull { it.stringOrNull() } ?: emptyList(),
        resultsOpen = obj["resultsOpen"].booleanOrMalformed("room.resultsOpen"),
        members = (obj["members"] as? JsonArray)?.mapNotNull { (it as? JsonObject)?.let(::decodeRoomMember) } ?: emptyList(),
        myAnswers = (obj["myAnswers"] as? JsonArray)?.mapNotNull { (it as? JsonObject)?.let(::decodeRoomAnswer) } ?: emptyList(),
        myFinished = obj["myFinished"].booleanOrMalformed("room.myFinished"),
    )

    private fun decodeRoomMember(obj: JsonObject): StudyRoom.Member = StudyRoom.Member(
        userId = obj["userId"].stringOrMalformed("member.userId"),
        displayName = obj["displayName"].stringOrNull(),
        finished = obj["finished"].booleanOrMalformed("member.finished"),
        answered = obj["answered"].intOrMalformed("member.answered"),
        correct = (obj["correct"] as? JsonPrimitive)?.intOrNull,
    )

    private fun decodeRoomAnswer(obj: JsonObject): StudyRoom.Answer = StudyRoom.Answer(
        questionId = obj["questionId"].stringOrMalformed("answer.questionId"),
        chosenIndex = obj["chosenIndex"].intOrMalformed("answer.chosenIndex"),
        correct = obj["correct"].booleanOrMalformed("answer.correct"),
    )

    private fun decodeRoomSummary(obj: JsonObject): RoomSummary = RoomSummary(
        id = obj["id"].stringOrMalformed("roomSummary.id"),
        code = obj["code"].stringOrMalformed("roomSummary.code"),
        name = obj["name"].stringOrMalformed("roomSummary.name"),
        status = obj["status"].stringOrMalformed("roomSummary.status"),
        questionCount = obj["questionCount"].intOrMalformed("roomSummary.questionCount"),
    )

    /** [RoomMutation.room] and [RoomMutation.id] are both genuinely optional -- see the class doc. */
    private fun decodeRoomMutation(obj: JsonObject): RoomMutation = RoomMutation(
        ok = (obj["ok"] as? JsonPrimitive)?.booleanOrNull,
        reason = obj["reason"].stringOrNull(),
        room = (obj["room"] as? JsonObject)?.let(::decodeStudyRoom),
        id = obj["id"].stringOrNull(),
    )

    // --- Vouchers & pricing ---

    /** `POST /api/vouchers/redeem`. See [VoucherRedeemResult]'s doc — a refused code is a normal answer, not a thrown [ApiError]. */
    suspend fun redeemVoucher(code: String): VoucherRedeemResult {
        val body = buildJsonObject { put("code", code) }.toString()
        val root = requestObject("POST", "/api/vouchers/redeem", body)
        return VoucherRedeemResult(
            ok = root["ok"].booleanOrMalformed("vouchers.redeem.ok"),
            reason = root["reason"].stringOrNull(),
            message = root["message"].stringOrNull(),
            voucher = (root["voucher"] as? JsonObject)?.let(::decodeVoucher),
        )
    }

    /** `DELETE /api/vouchers/redemption`. Releasing when nothing is applied is not an error — the server answers `{ ok: true, released: null }` either way, so there is nothing here worth returning to the caller. */
    suspend fun releaseVoucher() {
        request("DELETE", "/api/vouchers/redemption")
    }

    /** `GET /api/vouchers/mine`. Null when nothing is currently applied. */
    suspend fun myVoucher(): VoucherRedemption? {
        val root = requestObject("GET", "/api/vouchers/mine")
        val redemption = root["redemption"]
        if (redemption == null || redemption is JsonNull) return null
        val obj = redemption.asObjectOrMalformed("vouchers.mine.redemption")
        return VoucherRedemption(
            voucherId = obj["voucherId"].stringOrMalformed("vouchers.mine.redemption.voucherId"),
            code = obj["code"].stringOrMalformed("vouchers.mine.redemption.code"),
            redeemedAt = obj["redeemedAt"]?.takeUnless { it is JsonNull }?.let { parseInstant(it, "vouchers.mine.redemption.redeemedAt") },
        )
    }

    /** `GET /api/pricing/quote?period=&voucher=`. [period] is `"month"` or `"term"` — the server's own two period ids (`pricing.js:normalisePeriodId`). */
    suspend fun pricingQuote(period: String, voucherCode: String? = null): PricingQuote {
        val encodedPeriod = URLEncoder.encode(period, "UTF-8")
        val voucherParam = voucherCode?.takeIf { it.isNotBlank() }?.let { "&voucher=${URLEncoder.encode(it, "UTF-8")}" }.orEmpty()
        val root = requestObject("GET", "/api/pricing/quote?period=$encodedPeriod$voucherParam")
        val discount = root["appliedDiscount"] as? JsonObject
        return PricingQuote(
            period = root["period"].stringOrMalformed("pricing.quote.period"),
            currency = root["currency"].stringOrMalformed("pricing.quote.currency"),
            baseAmount = root["baseAmount"].doubleOrMalformed("pricing.quote.baseAmount"),
            totalAmount = root["totalAmount"].doubleOrMalformed("pricing.quote.totalAmount"),
            discountKind = discount?.get("kind").stringOrNull(),
            discountCode = discount?.get("code").stringOrNull(),
        )
    }

    private fun decodeAssistantStatus(obj: JsonObject): AssistantStatus = AssistantStatus(
        available = obj["available"].booleanOrMalformed("assistant.status.available"),
        reason = obj["reason"].stringOrNull(),
        plan = obj["plan"].stringOrMalformed("assistant.status.plan"),
        dailyMessages = obj["dailyMessages"].intOrMalformed("assistant.status.dailyMessages"),
        used = obj["used"].intOrMalformed("assistant.status.used"),
        remaining = obj["remaining"].intOrMalformed("assistant.status.remaining"),
    )

    private fun decodeAssistantChatResult(obj: JsonObject): AssistantChatResult = AssistantChatResult(
        reply = obj["reply"].stringOrNull(),
        plan = obj["plan"].stringOrMalformed("assistant.chat.plan"),
        dailyMessages = obj["dailyMessages"].intOrMalformed("assistant.chat.dailyMessages"),
        used = obj["used"].intOrMalformed("assistant.chat.used"),
        remaining = obj["remaining"].intOrMalformed("assistant.chat.remaining"),
    )

    private fun decodeVoucher(obj: JsonObject): Voucher = Voucher(
        id = obj["id"].stringOrMalformed("voucher.id"),
        code = obj["code"].stringOrMalformed("voucher.code"),
        name = obj["name"].stringOrNull(),
        discountType = obj["discountType"].stringOrNull(),
        amount = (obj["amount"] as? JsonPrimitive)?.doubleOrNull,
        grant = obj["grant"].stringOrNull(),
        trialDays = (obj["trialDays"] as? JsonPrimitive)?.intOrNull,
    )

    private fun decodeRemoteState(root: JsonObject): RemoteState {
        val value = root["value"]?.takeUnless { it is JsonNull }
        val updatedAtElement = root["updatedAt"]
        val updatedAt = if (updatedAtElement == null || updatedAtElement is JsonNull) {
            null
        } else {
            parseInstant(updatedAtElement, "updatedAt")
        }
        return RemoteState(value, updatedAt)
    }

    private fun decodeSessionUser(obj: JsonObject): SessionUser = SessionUser(
        id = obj["id"].stringOrMalformed("user.id"),
        email = obj["email"].stringOrNull(),
        role = obj["role"].stringOrNull(),
        aal = obj["aal"].stringOrNull(),
        // Always sent, coerced with Boolean(...) at server/src/index.js:151
        // (session) and :168 (me) — a missing or non-boolean value means the
        // shape drifted, so it is Malformed rather than defaulted to false.
        mfaRequired = obj["mfaRequired"].booleanOrMalformed("user.mfaRequired"),
    )

    private fun decodeProfile(obj: JsonObject): Profile = Profile(
        studentId = obj["studentId"].stringOrMalformed("profile.studentId"),
        name = obj["name"].stringOrNull(),
        email = obj["email"].stringOrNull(),
        universityId = obj["universityId"].stringOrNull(),
        year = obj["year"].stringOrNull(),
        group = obj["group"].stringOrNull(),
        status = obj["status"].stringOrNull(),
        username = obj["username"].stringOrNull(),
        profileIcon = obj["profileIcon"].stringOrNull(),
        statusMessage = obj["statusMessage"].stringOrNull(),
        aiConsentAt = obj["aiConsentAt"]?.takeUnless { it is JsonNull }?.let { parseInstant(it, "profile.aiConsentAt") },
    )

    private fun decodeEntitlement(obj: JsonObject): Entitlement = Entitlement(
        // state and plan are always present, including in the server's own
        // fallback entitlement at server/src/index.js:172.
        state = obj["state"].stringOrMalformed("entitlement.state"),
        plan = obj["plan"].stringOrMalformed("entitlement.plan"),
        // Genuinely nullable: the server's fallback entitlement at
        // server/src/index.js:172 is
        // { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null }.
        expiresAt = obj["expiresAt"]?.takeUnless { it is JsonNull }?.let { parseInstant(it, "entitlement.expiresAt") },
        daysLeft = (obj["daysLeft"] as? JsonPrimitive)?.intOrNull,
    )

    private fun parseInstant(element: JsonElement, field: String): Instant {
        val text = (element as? JsonPrimitive)?.takeIf { it.isString }?.contentOrNull
            ?: throw ApiError.Malformed("expected a timestamp string at $field")
        return try {
            Instant.parse(text)
        } catch (e: DateTimeParseException) {
            throw ApiError.Malformed("invalid timestamp at $field: $text")
        }
    }

    private fun JsonElement?.asObjectOrMalformed(field: String): JsonObject =
        this as? JsonObject ?: throw ApiError.Malformed("expected an object at $field")

    private fun JsonElement?.stringOrNull(): String? = (this as? JsonPrimitive)?.takeIf { it.isString }?.contentOrNull

    private fun JsonElement?.stringOrMalformed(field: String): String =
        stringOrNull() ?: throw ApiError.Malformed("expected a string at $field")

    private fun JsonElement?.booleanOrMalformed(field: String): Boolean =
        (this as? JsonPrimitive)?.booleanOrNull ?: throw ApiError.Malformed("expected a boolean at $field")

    private fun JsonElement?.intOrMalformed(field: String): Int =
        (this as? JsonPrimitive)?.intOrNull ?: throw ApiError.Malformed("expected an int at $field")

    private fun JsonElement?.doubleOrMalformed(field: String): Double =
        (this as? JsonPrimitive)?.doubleOrNull ?: throw ApiError.Malformed("expected a number at $field")

    private fun decodeQotdToday(obj: JsonObject): QotdToday = QotdToday(
        date = obj["date"].stringOrMalformed("qotd.today.date"),
        questionId = obj["questionId"].stringOrNull(),
        answered = obj["answered"].booleanOrMalformed("qotd.today.answered"),
        answerIndex = (obj["answerIndex"] as? JsonPrimitive)?.intOrNull,
        correct = (obj["correct"] as? JsonPrimitive)?.booleanOrNull,
        current = obj["current"].intOrMalformed("qotd.today.current"),
        longest = obj["longest"].intOrMalformed("qotd.today.longest"),
        history = ((obj["history"] as? JsonArray) ?: emptyList()).mapNotNull { it.stringOrNull() },
    )

    private fun decodeQotdAnswer(obj: JsonObject): QotdAnswerResult = QotdAnswerResult(
        correct = obj["correct"].booleanOrMalformed("qotd.answer.correct"),
        correctIndex = obj["correctIndex"].intOrMalformed("qotd.answer.correctIndex"),
        current = obj["current"].intOrMalformed("qotd.answer.current"),
        longest = obj["longest"].intOrMalformed("qotd.answer.longest"),
    )

    private fun decodeQotdLeaderboard(obj: JsonObject): QotdLeaderboard {
        val scope = obj["scope"].asObjectOrMalformed("qotd.leaderboard.scope")
        val viewer = obj["viewer"].asObjectOrMalformed("qotd.leaderboard.viewer")
        return QotdLeaderboard(
            scope = QotdLeaderboard.Scope(
                universityId = scope["universityId"].stringOrMalformed("qotd.leaderboard.scope.universityId"),
                year = scope["year"].stringOrMalformed("qotd.leaderboard.scope.year"),
            ),
            rows = ((obj["rows"] as? JsonArray) ?: emptyList()).map { row ->
                val r = row.asObjectOrMalformed("qotd.leaderboard.row")
                QotdLeaderboard.Row(
                    rank = r["rank"].intOrMalformed("qotd.leaderboard.row.rank"),
                    userId = r["userId"].stringOrMalformed("qotd.leaderboard.row.userId"),
                    username = r["username"].stringOrMalformed("qotd.leaderboard.row.username"),
                    profileIcon = r["profileIcon"].stringOrNull(),
                    current = r["current"].intOrMalformed("qotd.leaderboard.row.current"),
                    totalCorrect = r["totalCorrect"].intOrMalformed("qotd.leaderboard.row.totalCorrect"),
                    totalAnswered = r["totalAnswered"].intOrMalformed("qotd.leaderboard.row.totalAnswered"),
                )
            },
            viewer = QotdLeaderboard.Viewer(
                rank = (viewer["rank"] as? JsonPrimitive)?.intOrNull,
                total = viewer["total"].intOrMalformed("qotd.leaderboard.viewer.total"),
                current = viewer["current"].intOrMalformed("qotd.leaderboard.viewer.current"),
            ),
        )
    }

    private fun decodeQotdFriends(obj: JsonObject): QotdFriends = QotdFriends(
        date = obj["date"].stringOrMalformed("qotd.friends.date"),
        viewerAnswered = obj["viewerAnswered"].booleanOrMalformed("qotd.friends.viewerAnswered"),
        friends = ((obj["friends"] as? JsonArray) ?: emptyList()).map { element ->
            val friend = element.asObjectOrMalformed("qotd.friends.friend")
            QotdFriends.Friend(
                userId = friend["userId"].stringOrMalformed("qotd.friends.friend.userId"),
                name = friend["name"].stringOrMalformed("qotd.friends.friend.name"),
                answered = friend["answered"].booleanOrMalformed("qotd.friends.friend.answered"),
                correct = (friend["correct"] as? JsonPrimitive)?.booleanOrNull,
            )
        },
    )

    /** Issues the request and parses the body as a JSON object, translating both HTTP and shape failures into [ApiError]. */
    private suspend fun requestObject(method: String, path: String, body: String? = null): JsonObject {
        val raw = request(method, path, body)
        val element = try {
            CortexJson.parseToJsonElement(raw)
        } catch (e: Exception) {
            throw ApiError.Malformed("response was not valid JSON")
        }
        return element as? JsonObject ?: throw ApiError.Malformed("expected a JSON object")
    }

    /** Issues the request, attaches the bearer token when present, and turns a non-2xx status into an [ApiError]. Returns the raw response body on success. */
    private suspend fun request(method: String, path: String, body: String? = null): String {
        val token = tokenProvider()
        val builder = Request.Builder().url(baseUrl + path)
        if (token != null) builder.header("Authorization", "Bearer $token")
        when (method) {
            "GET" -> builder.get()
            "PUT" -> builder.put((body ?: "{}").toRequestBody(JSON_MEDIA_TYPE))
            "POST" -> builder.post((body ?: "{}").toRequestBody(JSON_MEDIA_TYPE))
            "DELETE" -> builder.delete()
            else -> throw IllegalArgumentException("unsupported method $method")
        }

        val call = client.newCall(builder.build())
        val response = call.await()
        response.use {
            val status = it.code
            if (status in 200..299) {
                return it.body?.string().orEmpty()
            }
            throw when (status) {
                401 -> ApiError.Unauthorized
                403 -> ApiError.Forbidden
                404 -> ApiError.NotFound
                else -> ApiError.Transient(status)
            }
        }
    }

    private suspend fun Call.await(): Response = suspendCancellableCoroutine { continuation ->
        continuation.invokeOnCancellation { cancel() }
        enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                if (continuation.isCancelled) return
                continuation.resumeWithException(ApiError.Transient(null))
            }

            override fun onResponse(call: Call, response: Response) {
                continuation.resume(response)
            }
        })
    }

    private companion object {
        val JSON_MEDIA_TYPE = "application/json; charset=utf-8".toMediaType()

        /** Tried in this order against `GET /api/me/support`'s root object; see [listSupport]. */
        val SUPPORT_LIST_KEYS = listOf("tickets", "requests", "items", "support")
    }
}
