package com.synapse.app.core.resources

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class ResourceProjectionTest {

    @Test
    fun projectIsEmptyForAnEmptyArray() {
        assertTrue(ResourceProjection.project("[]").isEmpty())
    }

    @Test
    fun projectsAPublishedResourceFromAJsonArray() {
        val entries = ResourceProjection.project("[$PUBLISHED_RESOURCE_JSON]")

        assertEquals(1, entries.size)
        val entry = entries.single()
        assertEquals("r-kc", entry.id)
        assertEquals("Kumar & Clark's Clinical Medicine", entry.title)
        assertEquals("Book", entry.type)
        assertEquals("cvs", entry.subjectId)
        assertEquals("Elsevier", entry.source)
        assertEquals("Ch. 23 · Cardiology", entry.meta)
        assertEquals(2024, entry.year)
        assertEquals(listOf("Cardiology"), entry.chapters)
        assertEquals(listOf("uni-cairo"), entry.universityIds)
        assertEquals(listOf("y3"), entry.yearIds)
    }

    @Test
    fun ignoresNonResourceKinds() {
        val entries = ResourceProjection.project(
            """[{ "id":"a1","kind":"article","title":"An article","status":"Published" }]""",
        )
        assertTrue(entries.isEmpty())
    }

    @Test
    fun dropsADraftResource() {
        val entries = ResourceProjection.project(
            """[{ "id":"r1","kind":"resource","title":"Draft resource","status":"Draft" }]""",
        )
        assertTrue(entries.isEmpty())
    }

    @Test
    fun dropsAPublishedResourceWithABlankTitle() {
        val entries = ResourceProjection.project(
            """[{ "id":"r1","kind":"resource","title":"","status":"Published" }]""",
        )
        assertTrue(entries.isEmpty())
    }

    @Test
    fun unrecognisedTypeFallsBackToArticle() {
        val entries = ResourceProjection.project(
            """[{ "id":"r1","kind":"resource","title":"Something","status":"Published","fields":{"Type":"Podcast"} }]""",
        )
        assertEquals("Article", entries.single().type)
    }

    @Test
    fun fallsBackToTheFieldsChapterWhenNoAuthoredChaptersExist() {
        val entries = ResourceProjection.project(
            """[{ "id":"r1","kind":"resource","title":"Something","status":"Published","fields":{"Chapter":"Diuretics"} }]""",
        )
        assertEquals(listOf("Diuretics"), entries.single().chapters)
    }

    @Test
    fun acceptsAnObjectWrapperWithAnItemsArray() {
        val entries = ResourceProjection.project("""{ "items": [$PUBLISHED_RESOURCE_JSON] }""")
        assertEquals(1, entries.size)
    }

    @Test
    fun aMalformedLedgerItemIsSkippedRatherThanFailingTheWholeBatch() {
        val entries = ResourceProjection.project(
            """[{ "notAnId": true }, $PUBLISHED_RESOURCE_JSON]""",
        )
        assertEquals(1, entries.size)
    }

    private companion object {
        val PUBLISHED_RESOURCE_JSON = """
            { "id":"r-kc","kind":"resource","title":"Kumar & Clark's Clinical Medicine","subjectId":"cvs",
              "status":"Published","fields":{"Type":"Book","Source":"Elsevier","Location":"Ch. 23 · Cardiology","Year":"2024"},
              "resourceData":{"chapters":["Cardiology"],"universityIds":["uni-cairo"],"yearIds":["y3"]} }
        """.trimIndent()
    }
}
