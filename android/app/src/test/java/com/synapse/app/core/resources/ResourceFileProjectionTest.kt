package com.synapse.app.core.resources

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ResourceFileProjectionTest {

    @Test
    fun projectIsEmptyForBlankOrMalformedInput() {
        assertTrue(ResourceFileProjection.project("{}").isEmpty())
        assertTrue(ResourceFileProjection.project("not json").isEmpty())
    }

    @Test
    fun aResourceWithAStorageKeyIsOpenable() {
        val files = ResourceFileProjection.project(
            """{ "resources": [ { "id":"r-kc","title":"Kumar & Clark","mediaType":"pdf","pageCount":812,"storageKey":"abc123" } ] }""",
        )

        assertTrue("r-kc" in files)
        val file = files.getValue("r-kc")
        assertEquals("Kumar & Clark", file.title)
        assertEquals("pdf", file.mediaType)
        assertEquals(812, file.pageCount)
        assertNull(file.sourceUri)
    }

    @Test
    fun aResourceWithOnlyASourceUriIsAlsoOpenable() {
        val files = ResourceFileProjection.project(
            """{ "resources": [ { "id":"r-video","title":"A video","sourceUri":"https://example.com/v" } ] }""",
        )

        assertTrue("r-video" in files)
        assertEquals("https://example.com/v", files.getValue("r-video").sourceUri)
        // mediaType defaults to "pdf" when the registry doesn't say, matching iOS.
        assertEquals("pdf", files.getValue("r-video").mediaType)
    }

    @Test
    fun aResourceWithNeitherIsNotEnteredIntoTheMap() {
        val files = ResourceFileProjection.project(
            """{ "resources": [ { "id":"r-catalogued-only","title":"Not uploaded yet" } ] }""",
        )

        assertFalse("r-catalogued-only" in files)
        assertTrue(files.isEmpty())
    }

    @Test
    fun anEmptyStorageKeyStringDoesNotCountAsOpenable() {
        val files = ResourceFileProjection.project(
            """{ "resources": [ { "id":"r1","title":"x","storageKey":"","sourceUri":"" } ] }""",
        )

        assertTrue(files.isEmpty())
    }
}
