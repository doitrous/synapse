package com.synapse.app.core.library

import org.junit.Assert.assertEquals
import org.junit.Test

class LibraryTest {

    private fun article(id: String, title: String, chapter: String, subjectId: String = "SYS_CVS") =
        LibraryArticle(id, title, subjectId, chapter, "", emptyList(), emptyList(), emptyList(), emptyList(), emptyList(), "")

    @Test fun groupsBySubjectThenChapterCaseInsensitivelyAndSortsArticlesByTitle() {
        val chapters = groupIntoChapters(
            listOf(
                article("a", "Zebra topic", "Heart"),
                article("b", "Apple topic", "HEART"),
                article("c", "Solo", "Renal"),
            )
        )

        assertEquals(2, chapters.size)
        val heart = chapters.first { it.title.equals("Heart", ignoreCase = true) }
        assertEquals(listOf("b", "a"), heart.articleIds)
    }

    @Test fun preservesFirstAppearanceOrderOfChapters() {
        val chapters = groupIntoChapters(
            listOf(article("a", "One", "Second"), article("b", "Two", "First")),
        )
        assertEquals(listOf("Second", "First"), chapters.map { it.title })
    }
}
