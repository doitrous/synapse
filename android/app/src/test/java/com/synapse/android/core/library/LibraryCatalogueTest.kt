package com.synapse.android.core.library

import com.synapse.android.core.model.LedgerDecoder
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Covers the pure decoding/grouping/flattening the Library reads its two
 * catalogue documents through -- the logic that must contribute nothing rather
 * than crash on a malformed or absent document.
 */
class LibraryCatalogueTest {

    private fun item(raw: String) = LedgerDecoder.decode("[$raw]").items.single()

    private val book = """
        {"id":"r1","kind":"resource","status":"Published","subjectId":"cvs","title":"Kumar & Clark",
         "fields":{"Type":"Book","Source":"Elsevier","Location":"Ch. 23","Year":"2020","Chapter":"Cardiology"},
         "resourceData":{"storageKey":"files/r1.pdf"}}
    """.trimIndent()

    // -- ResourceProjection ------------------------------------------------

    @Test
    fun `a resource row projects its fields`() {
        val resource = ResourceProjection.project(item(book))!!
        assertEquals(ResourceType.BOOK, resource.type)
        assertEquals("Elsevier", resource.source)
        assertEquals("Ch. 23", resource.meta)
        assertEquals(2020, resource.year)
        assertEquals("Cardiology", resource.chapter)
        assertTrue(resource.hasFile)
    }

    @Test
    fun `an unknown type reads as an article, not an empty label`() {
        val raw = book.replace(""""Type":"Book"""", """"Type":"Podcast"""")
        assertEquals(ResourceType.ARTICLE, ResourceProjection.project(item(raw))!!.type)
    }

    @Test
    fun `a resource with no source falls back to an em dash`() {
        val raw = book.replace(""""Source":"Elsevier",""", "")
        assertEquals("—", ResourceProjection.project(item(raw))!!.source)
    }

    @Test
    fun `a catalogued resource with no storage key is not openable-by-file`() {
        val raw = book.replace(""""resourceData":{"storageKey":"files/r1.pdf"}""", """"resourceData":{}""")
        assertFalse(ResourceProjection.project(item(raw))!!.hasFile)
    }

    // -- EvidenceIndex -----------------------------------------------------

    @Test
    fun `the evidence index lists only resources with a file or source uri`() {
        val json = """
            {"resources":[
              {"id":"r1","storageKey":"files/r1.pdf"},
              {"id":"r2","sourceUri":"https://example.org/x"},
              {"id":"r3"},
              {"id":"r4","storageKey":""}
            ]}
        """.trimIndent()
        val index = EvidenceIndex.decode(json)
        assertEquals(setOf("r1", "r2"), index.openableIds)
    }

    @Test
    fun `a missing or malformed evidence document yields an empty index`() {
        assertEquals(EvidenceIndex.EMPTY, EvidenceIndex.decode(null))
        assertEquals(EvidenceIndex.EMPTY, EvidenceIndex.decode("not json"))
        assertEquals(EvidenceIndex.EMPTY, EvidenceIndex.decode("""{"claims":[]}"""))
    }

    @Test
    fun `applying the evidence index marks only the openable resources`() {
        val resources = listOf(
            ResourceProjection.project(item(book))!!,
            ResourceProjection.project(item(book.replace(""""id":"r1"""", """"id":"r9""""))) !!,
        )
        val marked = EvidenceIndex(setOf("r1")).applyTo(resources)
        assertTrue(marked.first { it.id == "r1" }.isOpenable)
        assertFalse(marked.first { it.id == "r9" }.isOpenable)
    }

    // -- Folder grouping ---------------------------------------------------

    private fun resource(id: String, title: String, type: ResourceType, chapter: String?) = LibraryResource(
        id = id, title = title, type = type, subjectId = "", source = "—", meta = "", year = null,
        chapters = chapter?.let { listOf(it) }.orEmpty(), hasFile = false,
    )

    @Test
    fun `grouping by chapter sorts folders alphabetically with unfiled last`() {
        val resources = listOf(
            resource("a", "Zeta", ResourceType.BOOK, "Renal"),
            resource("b", "Alpha", ResourceType.BOOK, "Cardiology"),
            resource("c", "Orphan", ResourceType.BOOK, null),
        )
        val folders = groupResources(resources, ResourceGrouping.CHAPTER)
        assertEquals(listOf("Cardiology", "Renal", "Unfiled"), folders.map { it.title })
    }

    @Test
    fun `resources within a folder are sorted by title`() {
        val resources = listOf(
            resource("a", "Zeta", ResourceType.BOOK, "Cardiology"),
            resource("b", "Alpha", ResourceType.BOOK, "Cardiology"),
        )
        val folder = groupResources(resources, ResourceGrouping.CHAPTER).single()
        assertEquals(listOf("Alpha", "Zeta"), folder.resources.map { it.title })
    }

    @Test
    fun `grouping by type files each resource under its type`() {
        val resources = listOf(
            resource("a", "One", ResourceType.VIDEO, "Cardiology"),
            resource("b", "Two", ResourceType.BOOK, "Cardiology"),
        )
        val folders = groupResources(resources, ResourceGrouping.TYPE)
        assertEquals(setOf("Book", "Video"), folders.map { it.title }.toSet())
    }

    @Test
    fun `search filters on title, source and chapter, case-insensitively`() {
        val resources = listOf(
            resource("a", "Cardiology basics", ResourceType.BOOK, "Heart"),
            resource("b", "Renal guide", ResourceType.BOOK, "Kidney"),
        )
        assertEquals(listOf("a"), filterResources(resources, "cardio").map { it.id })
        assertEquals(listOf("b"), filterResources(resources, "kidney").map { it.id })
        assertEquals(2, filterResources(resources, "  ").size)
    }

    // -- Taxonomy atlas ----------------------------------------------------

    private val article = """
        {"id":"a1","kind":"article","status":"Published","subjectId":"cvs","title":"Heart failure",
         "fields":{"Topic":"Cardiology","Reading time":"9"},
         "articleData":{"publishedSummary":"A syndrome.","primaryNodeId":"leaf","secondaryNodeIds":["other"]}}
    """.trimIndent()

    @Test
    fun `an article card reads its metadata and placement`() {
        val card = ArticleProjection.projectCard(item(article))!!
        assertEquals("Cardiology", card.chapter)
        assertEquals(9, card.readingMinutes)
        assertEquals("A syndrome.", card.summary)
        assertEquals(listOf("leaf", "other"), card.nodeIds)
    }

    @Test
    fun `an article with no reading time falls back to six minutes`() {
        val raw = article.replace(""""Reading time":"9"""", """"Reading time":""""")
        assertEquals(6, ArticleProjection.projectCard(item(raw))!!.readingMinutes)
    }

    private val taxonomy = """
        [
          {"id":"root","division":"system","title":"Cardiovascular system","depth":0},
          {"id":"leaf","parentId":"root","division":"system","title":"Heart failure","depth":1},
          {"id":"empty","parentId":"root","division":"system","title":"Nothing here","depth":1}
        ]
    """.trimIndent()

    @Test
    fun `the atlas hangs articles on their nodes and counts the subtree`() {
        val cards = listOf(ArticleProjection.projectCard(item(article))!!)
        val atlas = LibraryAtlas.build(taxonomy, cards)

        assertEquals(listOf("root"), atlas.roots("system").map { it.id })
        // Children are sorted by title: "Heart failure" (leaf) before "Nothing here" (empty).
        assertEquals(listOf("leaf", "empty"), atlas.children("root").map { it.id })
        assertEquals(listOf("a1"), atlas.articlesOn("leaf"))
        assertEquals(1, atlas.articleCount("root")) // bubbles up from the leaf
        assertTrue(atlas.hasArticles("root"))
        assertFalse(atlas.hasArticles("empty"))
        assertEquals(listOf("a1"), atlas.articleIdsUnder("root"))
        assertEquals(1, atlas.divisionCount("system"))
    }

    @Test
    fun `an article placed twice under one root is counted once`() {
        val card = ArticleProjection.projectCard(item(article))!! // placed on leaf + other
        val atlas = LibraryAtlas.build(taxonomy, listOf(card)) // "other" is not in this tree
        assertEquals(1, atlas.articleCount("root"))
    }

    @Test
    fun `a missing or malformed taxonomy document yields an empty atlas`() {
        assertEquals(0, LibraryAtlas.build(null, emptyList()).roots("system").size)
        assertEquals(0, LibraryAtlas.build("not json", emptyList()).roots("system").size)
        assertEquals(0, LibraryAtlas.build("""[{"no":"id"}]""", emptyList()).roots("system").size)
    }
}
