package com.synapse.app.core.library

/**
 * What the reading atlas is built from: articles projected off the shared
 * content ledger ([LibraryProjection]), and the admin-authored module/year
 * filing trees ([LibraryTreeProjection]) a student browses them through.
 *
 * This file is pure — no Android framework, no storage — for the same reason
 * `core/flashcards/Deck.kt` is: a browse/grouping rule that reads its own
 * store can only be asserted against itself.
 *
 * **Deliberately not built here: rich in-text highlight annotations.** The
 * web/iOS `synapse.library.marks.v1` record anchors a highlight or sticky
 * note to an exact quoted span inside an article's rendered text
 * (`TextAnchor` in `src/lib/library/textAnchor.ts`). That needs a text-anchor
 * scheme with no Android equivalent yet. This MVP ships taxonomy browse,
 * the article reader, and mark-as-read (`synapse.library.read`); highlighting
 * is a tracked follow-up, not an oversight.
 */

/** One clinical section of an article's body: a heading and its text. */
data class LibrarySection(val id: String, val heading: String, val body: String)

/** An article as a student reads it. A verbatim-enough port of `ArticleAuthoringData`'s student-facing fields. */
data class LibraryArticle(
    val id: String,
    val title: String,
    val subjectId: String,
    /** The chapter heading it was filed under when authored (`fields.Topic`). "New articles" when blank. */
    val chapter: String,
    val summary: String,
    val sections: List<LibrarySection>,
    /** "High-yield" bullet points, shown at the end of the reader. */
    val keyPoints: List<String>,
    /** "Where people lose the mark" — exam traps, shown distinctly from [keyPoints]. */
    val traps: List<String>,
    val questionIds: List<String>,
    val resourceIds: List<String>,
    val updatedAt: String,
)

/** One node of an admin-authored library filing tree (`synapse-library-trees-v1`). */
data class LibraryTreeNode(
    val id: String,
    val title: String,
    val children: List<LibraryTreeNode> = emptyList(),
    /** Articles filed directly on this node (not counting descendants). */
    val articleIds: List<String> = emptyList(),
)

/** Every article filed at or beneath [node], once each — a student tapping a branch means everything under it. */
fun articleIdsUnder(node: LibraryTreeNode): List<String> {
    val seen = LinkedHashSet<String>()
    fun walk(n: LibraryTreeNode) {
        seen += n.articleIds
        n.children.forEach(::walk)
    }
    walk(node)
    return seen.toList()
}

/** A shelf entry: articles grouped by subject, then by the chapter recorded on each — the fallback browse that keeps every published article reachable even when no tree files it. */
data class LibraryChapter(val id: String, val title: String, val subjectId: String, val articleIds: List<String>)

/**
 * Group [articles] into chapters, matching iOS `LibraryModel.group` / the
 * web's `libraryOutlineFromCatalogue`: by subject, then by chapter title,
 * ordered by first appearance, articles sorted by title within a chapter.
 */
fun groupIntoChapters(articles: List<LibraryArticle>): List<LibraryChapter> {
    val byKey = LinkedHashMap<String, MutableList<LibraryArticle>>()
    for (article in articles) {
        val key = "${article.subjectId}::${article.chapter.lowercase()}"
        byKey.getOrPut(key) { mutableListOf() }.add(article)
    }
    return byKey.map { (key, grouped) ->
        val sorted = grouped.sortedBy { it.title.lowercase() }
        LibraryChapter(id = key, title = sorted.first().chapter, subjectId = sorted.first().subjectId, articleIds = sorted.map { it.id })
    }
}
