package com.synapse.android.core.api

import com.synapse.android.core.sync.StateOwnership
import java.io.IOException
import java.time.Instant
import java.time.format.DateTimeParseException
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
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
)

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

/**
 * The only thing in this app that speaks HTTP.
 *
 * It holds no cache and no state — that belongs to the sync engine, which is
 * the only caller and the only thing that decides when to fetch. This class
 * knows three things only: how to attach a token, how to reach the handful
 * of routes the app needs, and how to turn a status code into an [ApiError]
 * the caller can act on.
 */
class SynapseApi(
    private val baseUrl: String,
    private val client: OkHttpClient,
    private val tokenProvider: suspend () -> String?,
) {
    private val json = Json { ignoreUnknownKeys = true }

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

    /** Issues the request and parses the body as a JSON object, translating both HTTP and shape failures into [ApiError]. */
    private suspend fun requestObject(method: String, path: String, body: String? = null): JsonObject {
        val raw = request(method, path, body)
        val element = try {
            json.parseToJsonElement(raw)
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
    }
}
