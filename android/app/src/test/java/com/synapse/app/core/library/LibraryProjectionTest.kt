package com.synapse.app.core.library

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Pure-logic ledger projection: only `kind == "article"` items are projected,
 * and only when Published with `articleData` present — ported from
 * `visibleLibraryArticles` in `src/data/libraryOutline.ts`.
 */
class LibraryProjectionTest {

    private val publishedItem = """
        { "id":"A1","kind":"article","title":"Heart failure","subjectId":"SYS_CVS","status":"Published","updatedAt":"2026-08-01T00:00:00Z",
          "fields":{"Topic":"Heart"},
          "articleData":{"summary":"HF overview","sections":[{"id":"s1","heading":"Definition","body":"A syndrome."}],
            "holdThese":["Four pillars"],"loseTheMark":["NYHA vs stage"],"questionIds":["q1"],"resourceIds":["r1"]}}
    """.trimIndent()

    private val draftItem = """
        { "id":"A2","kind":"article","title":"Draft","subjectId":"SYS_CVS","status":"Draft",
          "articleData":{"summary":"x","sections":[]}}
    """.trimIndent()

    private val missingArticleDataItem = """
        { "id":"A3","kind":"article","title":"No data","subjectId":"SYS_CVS","status":"Published"}
    """.trimIndent()

    private val blankTitleItem = """
        { "id":"A4","kind":"article","title":"","subjectId":"SYS_CVS","status":"Published",
          "articleData":{"summary":"x","sections":[]}}
    """.trimIndent()

    private val nonArticleItem = """
        { "id":"A5","kind":"question","title":"Not an article","subjectId":"SYS_CVS","status":"Published",
          "articleData":{"summary":"x","sections":[]}}
    """.trimIndent()

    @Test fun projectsOnlyThePublishedArticleWithData() {
        val ledgerJson = "[$publishedItem,$draftItem,$missingArticleDataItem,$blankTitleItem,$nonArticleItem]"

        val articles = LibraryProjection.project(ledgerJson)

        assertEquals(1, articles.size)
        val article = articles.single()
        assertEquals("A1", article.id)
        assertEquals("Heart failure", article.title)
        assertEquals("SYS_CVS", article.subjectId)
        assertEquals("Heart", article.chapter)
        assertEquals("HF overview", article.summary)
        assertEquals(1, article.sections.size)
        assertEquals(LibrarySection("s1", "Definition", "A syndrome."), article.sections.single())
        assertEquals(listOf("Four pillars"), article.keyPoints)
        assertEquals(listOf("NYHA vs stage"), article.traps)
        assertEquals(listOf("q1"), article.questionIds)
        assertEquals(listOf("r1"), article.resourceIds)
    }

    @Test fun aDraftArticleIsNotOfferedToStudents() {
        assertTrue(LibraryProjection.project("[$draftItem]").isEmpty())
    }

    @Test fun anArticleMissingArticleDataIsDropped() {
        assertTrue(LibraryProjection.project("[$missingArticleDataItem]").isEmpty())
    }

    @Test fun aBlankTitleArticleIsDropped() {
        assertTrue(LibraryProjection.project("[$blankTitleItem]").isEmpty())
    }

    @Test fun aNonArticleItemIsIgnoredEvenIfWellFormed() {
        assertTrue(LibraryProjection.project("[$nonArticleItem]").isEmpty())
    }

    @Test fun acceptsLedgerWrappedInItemsObject() {
        val ledgerJson = """{ "items": [$publishedItem] }"""
        assertEquals(1, LibraryProjection.project(ledgerJson).size)
    }

    @Test fun blankTopicFallsBackToNewArticlesChapter() {
        val item = """
            { "id":"A6","kind":"article","title":"Untitled chapter","subjectId":"SYS_CVS","status":"Published",
              "fields":{"Topic":""},"articleData":{"summary":"x","sections":[]}}
        """.trimIndent()
        assertEquals("New articles", LibraryProjection.project("[$item]").single().chapter)
    }

    @Test fun preferPublishedSectionsAndSummaryOverDraftOnesWhenBothArePresent() {
        val item = """
            { "id":"A7","kind":"article","title":"Evidence gated","subjectId":"SYS_CVS","status":"Published",
              "articleData":{"summary":"Draft summary","publishedSummary":"Gated summary",
                "sections":[{"id":"s1","heading":"Draft","body":"draft body"}],
                "publishedSections":[{"id":"s1","heading":"Gated","body":"gated body"}]}}
        """.trimIndent()

        val article = LibraryProjection.project("[$item]").single()
        assertEquals("Gated summary", article.summary)
        assertEquals("Gated", article.sections.single().heading)
    }

    @Test fun aSectionsNarrativePrevailsOverItsBodyWhenPresent() {
        val item = """
            { "id":"A8","kind":"article","title":"Reviewed","subjectId":"SYS_CVS","status":"Published",
              "articleData":{"summary":"x","sections":[{"id":"s1","heading":"H","body":"draft body","narrative":"reviewed prose"}]}}
        """.trimIndent()

        assertEquals("reviewed prose", LibraryProjection.project("[$item]").single().sections.single().body)
    }
}
