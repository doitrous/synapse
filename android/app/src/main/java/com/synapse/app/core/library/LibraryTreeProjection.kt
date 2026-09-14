package com.synapse.app.core.library

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * Decodes the raw `synapse-library-trees-v1` catalogue (a `StateDoc.value`
 * JSON string) into scope -> roots, for taxonomy browse. Ported from
 * `LibraryTreesDocument`/`LibraryTreeNode` in `src/data/libraryTrees.ts`.
 *
 * A tree scope is `module:<moduleId>` or `year:<yearId>` — the key a faculty
 * filed a module's or year's reading list under. Malformed or absent input
 * decodes to an empty map rather than throwing: a browse screen with nothing
 * to show is recoverable, a crash on launch is not.
 */
object LibraryTreeProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(treesJson: String): Map<String, List<LibraryTreeNode>> {
        val document = runCatching { json.decodeFromString(LibraryTreesDocumentDto.serializer(), treesJson) }
            .getOrNull() ?: return emptyMap()
        return document.trees.mapValues { (_, nodes) -> nodes.map(::toDomain) }
    }

    private fun toDomain(dto: LibraryTreeNodeDto): LibraryTreeNode =
        LibraryTreeNode(
            id = dto.id,
            title = dto.title,
            children = dto.children?.map(::toDomain).orEmpty(),
            articleIds = dto.articleIds.orEmpty(),
        )
}

@Serializable
private data class LibraryTreesDocumentDto(val trees: Map<String, List<LibraryTreeNodeDto>> = emptyMap())

@Serializable
private data class LibraryTreeNodeDto(
    val id: String,
    val title: String = "",
    val children: List<LibraryTreeNodeDto>? = null,
    val articleIds: List<String>? = null,
)
