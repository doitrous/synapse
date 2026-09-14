package com.synapse.app.core.resources

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class ResourceTest {

    @Test
    fun asResourceTypeFallsBackToArticleForAnythingUnrecognised() {
        assertEquals("Book", asResourceType("Book"))
        assertEquals("Article", asResourceType("Podcast"))
        assertEquals("Article", asResourceType(null))
    }

    @Test
    fun groupResourcesByChapterOrdersAlphabeticallyWithUnfiledLast() {
        val folders = groupResourcesByChapter(
            listOf(
                resource("r1", chapters = listOf("Diuretics")),
                resource("r2", chapters = emptyList()),
                resource("r3", chapters = listOf("Asthma")),
            ),
        )

        assertEquals(listOf("Asthma", "Diuretics", "Unfiled"), folders.map { it.title })
        assertEquals(listOf("r3"), folders[0].resources.map { it.id })
        assertEquals(listOf("r2"), folders[2].resources.map { it.id })
    }

    @Test
    fun groupResourcesByChapterSortsResourcesWithinAFolderByTitle() {
        val folders = groupResourcesByChapter(
            listOf(
                resource("r1", title = "Zebra", chapters = listOf("Cardiology")),
                resource("r2", title = "Apple", chapters = listOf("Cardiology")),
            ),
        )

        assertEquals(listOf("r2", "r1"), folders.single().resources.map { it.id })
    }

    @Test
    fun pageFromMetaExtractsAPageNumber() {
        assertEquals(412, pageFromMeta("p. 412"))
        assertEquals(23, pageFromMeta("page 23"))
        assertEquals(5, pageFromMeta("Page5"))
    }

    @Test
    fun pageFromMetaIsNullWhenThereIsNoPageNumber() {
        assertNull(pageFromMeta("Ch. 23 · Cardiology"))
        assertNull(pageFromMeta("12:30"))
        assertNull(pageFromMeta(""))
    }

    @Test
    fun isPdfIsFalseWhenThereIsNoFileAtAll() {
        assertEquals(false, resource("r1", hasFile = false).isPdf)
    }

    @Test
    fun isPdfDefaultsTrueWhenMediaTypeIsUnspecified() {
        assertEquals(true, resource("r1", hasFile = true, mediaType = null).isPdf)
    }

    @Test
    fun isPdfIsFalseForANonPdfMediaType() {
        assertEquals(false, resource("r1", hasFile = true, mediaType = "video").isPdf)
    }

    private fun resource(
        id: String,
        title: String = id,
        chapters: List<String> = emptyList(),
        hasFile: Boolean = false,
        mediaType: String? = null,
    ) = MedicalResource(
        id = id, title = title, type = "Book", subjectId = "cvs", source = "—", meta = "",
        year = null, chapters = chapters, universityIds = emptyList(), yearIds = emptyList(),
        hasFile = hasFile, mediaType = mediaType, sourceUri = null, pageCount = null,
    )
}
