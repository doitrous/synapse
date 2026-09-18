package com.synapse.app.core.model
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject

@Serializable data class StateDoc(val value: JsonElement, val version: Long? = null, val updatedAt: String? = null)
/**
 * `GET /api/session` response. The server nests the confirmed identity under
 * `user` (`{ "user": { "id", "email", ... } }`), or returns `user: null` when
 * the token is not accepted — a populated `user` is the server-side half of the
 * two-gate sign-in. The secondary constructor keeps test fakes that build from a
 * bare id (`SessionDto("u")`) compiling; only the primary field is serialized.
 */
@Serializable
data class SessionDto(val user: SessionUser? = null) {
    constructor(userId: String) : this(SessionUser(userId))
    val userId: String? get() = user?.id
}

@Serializable data class SessionUser(val id: String)
@Serializable data class AttemptRecord(val id: String, val month: String, val payload: JsonObject)
typealias Manifest = Map<String, String>
