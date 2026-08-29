package com.synapse.app.core.model
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject

@Serializable data class StateDoc(val value: JsonElement, val version: Long? = null, val updatedAt: String? = null)
@Serializable data class SessionDto(val userId: String)
@Serializable data class AttemptRecord(val id: String, val month: String, val payload: JsonObject)
typealias Manifest = Map<String, String>
