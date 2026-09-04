package com.synapse.android.core.reader

import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.ContentStatus
import com.synapse.android.core.model.LedgerItem
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [ArticleReaderProjection], the evidence gate that decides whether unverified
 * medical writing reaches a student -- see that object's own doc. These guard
 * the gate, not the layout.
 */
class ArticleReaderProjectionTest {

    private fun article(id: String = "a1", title: String = "Title", raw: String): LedgerItem =
        LedgerItem(
            id = id,
            kind = ContentKind.ARTICLE,
            title = title,
            subjectId = "sub-1",
            status = ContentStatus.PUBLISHED,
            updatedAt = null,
            raw = raw,
            universityIds = emptyList(),
            yearIds = emptyList(),
            searchText = "",
        )

    private fun texts(article: Article): List<String> = article.blocks.mapNotNull {
        when (it) {
            is ArticleBlock.Paragraph -> it.text
            is ArticleBlock.Heading -> it.text
            is ArticleBlock.Fact -> it.text
            is ArticleBlock.Callout -> it.text
            is ArticleBlock.SourcesHeader -> null
        }
    }

    @Test
    fun `malformed record contributes nothing`() {
        assertNull(ArticleReaderProjection.project(article(raw = "not json"), ReaderEvidence.EMPTY, emptyMap()))
    }

    @Test
    fun `non-article ledger row is rejected`() {
        val item = LedgerItem(
            "r1", ContentKind.RESOURCE, "R", "s", ContentStatus.PUBLISHED, null, "{}", emptyList(), emptyList(), "",
        )
        assertNull(ArticleReaderProjection.project(item, ReaderEvidence.EMPTY, emptyMap()))
    }

    @Test
    fun `ungated article renders draft prose and fields`() {
        val raw = """
            {
              "articleData": {
                "sections": [
                  {"id": "s1", "heading": "Overview", "body": "First para.\n\nSecond para."}
                ],
                "summary": "A short summary."
              },
              "fields": {"Topic": "Cardiology", "Reading time": "9"}
            }
        """.trimIndent()
        val result = ArticleReaderProjection.project(article(raw = raw), ReaderEvidence.EMPTY, emptyMap())!!
        assertEquals("Cardiology", result.chapter)
        assertEquals(9, result.readingMinutes)
        assertEquals("A short summary.", result.summary)
        assertTrue(texts(result).contains("Overview"))
        assertTrue(texts(result).contains("First para."))
        assertTrue(texts(result).contains("Second para."))
    }

    @Test
    fun `gated section with unresolved evidence spans suppresses draft body`() {
        // publishedSections present -> gated. The section names a span that is
        // absent from the evidence store, so its draft body must NOT be shown.
        val raw = """
            {
              "articleData": {
                "publishedSections": [
                  {"id": "s1", "heading": "Mechanism", "body": "Unreviewed draft.", "spanIds": ["missing-span"]}
                ]
              },
              "fields": {}
            }
        """.trimIndent()
        val result = ArticleReaderProjection.project(article(raw = raw), ReaderEvidence.EMPTY, emptyMap())!!
        assertTrue(texts(result).contains("Mechanism")) // heading still shows
        assertTrue("draft body must be gated out", texts(result).none { it.contains("Unreviewed draft") })
    }

    @Test
    fun `gated narrative shows and resolved facts move to sources`() {
        val evidence = ReaderEvidence.decode(
            """
            {
              "articleSpans": [
                {"id": "sp1", "articleId": "a1", "sectionId": "s1", "text": "Verified statement."}
              ]
            }
            """.trimIndent(),
        )
        val raw = """
            {
              "articleData": {
                "publishedSections": [
                  {"id": "s1", "heading": "Mechanism", "narrative": "Reviewed prose here.", "spanIds": ["sp1"]}
                ]
              },
              "fields": {}
            }
        """.trimIndent()
        val result = ArticleReaderProjection.project(article(raw = raw), evidence, emptyMap())!!
        assertTrue(texts(result).contains("Reviewed prose here."))
        // The fact is listed once, under a Sources header, after the prose.
        assertTrue(result.blocks.any { it is ArticleBlock.SourcesHeader })
        val fact = result.blocks.filterIsInstance<ArticleBlock.Fact>().singleOrNull()
        assertEquals("Verified statement.", fact?.text)
    }

    @Test
    fun `ungated callouts publish verbatim, gated callouts need evidence`() {
        val ungatedRaw = """
            {"articleData": {"sections": [{"id":"s1","body":"x"}], "holdThese": ["Point A", "Point B"]}, "fields": {}}
        """.trimIndent()
        val ungated = ArticleReaderProjection.project(article(raw = ungatedRaw), ReaderEvidence.EMPTY, emptyMap())!!
        assertEquals(listOf("Point A", "Point B"), ungated.keyPoints)

        // Gated: only the line whose evidence resolves (or that a human signed
        // off) survives.
        val evidence = ReaderEvidence.decode(
            """{"citations":[{"id":"c1"}]}""",
        )
        val gatedRaw = """
            {
              "articleData": {
                "publishedSections": [{"id":"s1","narrative":"prose"}],
                "loseTheMark": ["Resolves", "Reviewed by hand", "Dangling"],
                "calloutEvidence": {
                  "Resolves": {"citationIds": ["c1"]},
                  "Reviewed by hand": {"reviewedBy": "Dr X"},
                  "Dangling": {"citationIds": ["nope"]}
                }
              },
              "fields": {}
            }
        """.trimIndent()
        val gated = ArticleReaderProjection.project(article(raw = gatedRaw), evidence, emptyMap())!!
        assertEquals(listOf("Resolves", "Reviewed by hand"), gated.traps)
    }

    @Test
    fun `related links survive only when they lead to a readable article`() {
        val raw = """
            {"articleData": {"sections": [{"id":"s1","body":"x"}], "relatedArticleIds": ["a1", "live", "dead"],
              "fieldNotes": {"relatedArticle:live": "Because reasons"}}, "fields": {}}
        """.trimIndent()
        val result = ArticleReaderProjection.project(
            article(id = "a1", raw = raw),
            ReaderEvidence.EMPTY,
            mapOf("live" to "Live Article"),
        )!!
        // "a1" is self (dropped), "dead" has no readable title (dropped).
        assertEquals(1, result.relatedArticles.size)
        assertEquals("Live Article", result.relatedArticles[0].title)
        assertEquals("Because reasons", result.relatedArticles[0].reason)
    }

    @Test
    fun `paragraphs split on blank lines and join wrapped lines`() {
        val blocks = ArticleReaderProjection.paragraphs("Line one\nstill one\n\nLine two")
        val paras = blocks.filterIsInstance<ArticleBlock.Paragraph>().map { it.text }
        assertEquals(listOf("Line one\nstill one", "Line two"), paras)
    }

    @Test
    fun `prose decodes html entities and leaves unknown ones`() {
        assertEquals("a & b", Prose.decodeEntities("a &amp; b"))
        assertEquals("5°C", Prose.decodeEntities("5&deg;C"))
        assertEquals("A", Prose.decodeEntities("&#65;"))
        assertEquals("&bogus;", Prose.decodeEntities("&bogus;"))
    }
}
