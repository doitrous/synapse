package com.synapse.app.core.resources

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * Decodes the raw `synapse-medical-evidence-published-v1` catalogue (a
 * `StateDoc.value` JSON string) into id -> [ResourceFile], the register of
 * which catalogued resources actually have bytes (or an external link)
 * behind them. Ported from iOS `EvidenceStore.decode`'s `resources` branch
 * (`Core/Model/Article.swift`) and the server's `medicalResourceRecords()`
 * (`server/src/index.js`).
 *
 * A resource is only entered into the map when it has a `storageKey` or a
 * `sourceUri` — exactly iOS's rule — so `id in map` doubles as "openable"
 * with no separate boolean to keep in sync.
 */
object ResourceFileProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(evidenceJson: String): Map<String, ResourceFile> {
        val document = runCatching { json.decodeFromString(EvidenceDocumentDto.serializer(), evidenceJson) }
            .getOrNull() ?: return emptyMap()

        return document.resources
            .filter { !it.storageKey.isNullOrEmpty() || !it.sourceUri.isNullOrEmpty() }
            .associate { dto ->
                dto.id to ResourceFile(
                    id = dto.id,
                    title = dto.title.ifBlank { dto.id },
                    mediaType = dto.mediaType.ifBlank { "pdf" },
                    pageCount = dto.pageCount,
                    sourceUri = dto.sourceUri?.takeIf { it.isNotEmpty() },
                )
            }
    }
}

/** One entry of the medical-evidence registry's resource records — the ground truth for whether a resource can be opened. */
data class ResourceFile(
    val id: String,
    val title: String,
    val mediaType: String,
    val pageCount: Int?,
    val sourceUri: String?,
)

@Serializable
private data class EvidenceDocumentDto(val resources: List<ResourceRecordDto> = emptyList())

@Serializable
private data class ResourceRecordDto(
    val id: String,
    val title: String = "",
    val mediaType: String = "",
    val pageCount: Int? = null,
    val storageKey: String? = null,
    val sourceUri: String? = null,
)
