package com.synapse.app.core.resources

/**
 * The resource catalogue: books, videos, guidelines, decks and articles a
 * student browses, filters, saves, and (for documents) opens in the reader.
 *
 * Pure — no Android framework, no storage — for the same reason
 * `core/library/Library.kt` is: a grouping rule that reads its own store can
 * only be asserted against itself.
 *
 * **Deliberately not built here: ink/sticky annotations on the opened
 * document.** iOS's `ResourceReaderView` anchors highlights, notes and shapes
 * to an exact page position (`AnnotationStore`/`AnnotationObject`) with a
 * full undo/redo stack. That needs a page-relative mark scheme with no
 * Android equivalent yet — this MVP ships the catalogue, filters, bookmarks,
 * and a basic paged document viewer (see `feature/resources/ResourcesScreen.kt`);
 * annotations are a tracked follow-up, not an oversight.
 */

/** A resource's kind. Unrecognised input reads as `Article`, matching web `useLiveResources`/iOS `ResourceType`. */
val RESOURCE_TYPES: List<String> = listOf("Book", "Video", "Guideline", "Deck", "Article")

fun asResourceType(raw: String?): String = if (raw in RESOURCE_TYPES) raw!! else "Article"

/**
 * A resource as a student sees it. Mirrors `LiveResource`
 * (`src/lib/useLiveResources.ts`) / `LibraryResource` (iOS `ResourceModel.swift`).
 *
 * `hasFile` is the authoritative "can this be opened" signal — sourced from
 * the published medical-evidence registry (`synapse-medical-evidence-published-v1`),
 * not from the content ledger's `resourceData.storageKey`. iOS's doc comment
 * explains why: the ledger's storageKey is only the admin's *intent* to
 * upload; of the catalogue only a fraction of items carry actual bytes, and
 * the evidence registry is the one place that knows which.
 */
data class MedicalResource(
    val id: String,
    val title: String,
    val type: String,
    val subjectId: String,
    val source: String,
    val meta: String,
    val year: Int?,
    /** Every chapter this resource covers; the first is used for grouping. */
    val chapters: List<String>,
    /** Authored scope; empty means it applies to everyone. */
    val universityIds: List<String>,
    val yearIds: List<String>,
    val hasFile: Boolean,
    /** From the evidence registry; null when [hasFile] is false. Defaults to "pdf" when unspecified, matching iOS. */
    val mediaType: String?,
    /** An external link the file redirects to, instead of storage bytes. */
    val sourceUri: String?,
    val pageCount: Int?,
) {
    val chapter: String? get() = chapters.firstOrNull()

    /** Whether the in-app document reader can be expected to open this — see `ResourcesScreen`'s reader gate. */
    val isPdf: Boolean get() = hasFile && (mediaType == null || mediaType.equals("pdf", ignoreCase = true))
}

/** A shelf entry: resources grouped by their first chapter, "Unfiled" collecting last. Mirrors iOS `ResourceModel.group(by: .system)`. */
data class ResourceFolder(val id: String, val title: String, val resources: List<MedicalResource>)

fun groupResourcesByChapter(resources: List<MedicalResource>): List<ResourceFolder> {
    val byTitle = LinkedHashMap<String, MutableList<MedicalResource>>()
    for (resource in resources) {
        val title = resource.chapter?.trim()?.takeIf { it.isNotEmpty() } ?: "Unfiled"
        byTitle.getOrPut(title) { mutableListOf() }.add(resource)
    }
    val ordered = byTitle.keys.sortedWith(compareBy({ it == "Unfiled" }, { it.lowercase() }))
    return ordered.map { title ->
        val sorted = byTitle.getValue(title).sortedBy { it.title.lowercase() }
        ResourceFolder(id = title, title = title, resources = sorted)
    }
}

/**
 * The page a citation-style `meta` string names, if any — e.g. "Ch. 23 ·
 * Cardiology" has none, "p. 412" and "page 12" both have one. Ported from the
 * web's `pageParamFor` (`src/pages/student/Resources.tsx`): only a page
 * number can be handed to a document viewer, so anything else opens at the
 * start, which is still the right document.
 */
private val PAGE_PATTERN = Regex("""(?:p\.?|page)\s*(\d+)""", RegexOption.IGNORE_CASE)

fun pageFromMeta(meta: String): Int? = PAGE_PATTERN.find(meta)?.groupValues?.get(1)?.toIntOrNull()
