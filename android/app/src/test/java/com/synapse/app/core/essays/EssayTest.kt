package com.synapse.app.core.essays

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class EssayTest {

    // --- coveredCount ---------------------------------------------------------

    @Test fun coveredCountIsNullWhenNotYetMarked() {
        assertNull(coveredCount(null, listOf("kp-0", "kp-1")))
    }

    @Test fun coveredCountCountsOnlyPointsThatStillExist() {
        val result = coveredCount(listOf("kp-0", "kp-stale"), listOf("kp-0", "kp-1"))
        assertEquals(CoveredCount(covered = 1, total = 2), result)
    }

    @Test fun coveredCountCanBeZeroButNotNullOnceMarked() {
        val result = coveredCount(emptyList(), listOf("kp-0", "kp-1"))
        assertEquals(CoveredCount(covered = 0, total = 2), result)
    }

    // --- EssayProjection --------------------------------------------------------

    private val publishedEssay = """
        { "id":"E1","kind":"essay","title":"Discuss heart failure","subjectId":"SYS_CVS","status":"Published",
          "essayData":{"prompt":"Discuss the pathophysiology of heart failure.",
            "keyPoints":[{"id":"kp-0-reduced-e","text":"Reduced ejection fraction","legible":true},
                          {"id":"kp-1-raas","text":"RAAS activation"}],
            "examinerNote":"Look for the RAAS mechanism.","modelAnswer":"Heart failure occurs when..."}}
    """.trimIndent()

    // Draft essays never reach a student, same rule as questions.
    private val draftEssay = """
        { "id":"E2","kind":"essay","title":"Draft essay","subjectId":"SYS_CVS","status":"Draft",
          "essayData":{"prompt":"x","keyPoints":[{"id":"kp-0","text":"x"}],"examinerNote":"","modelAnswer":""}}
    """.trimIndent()

    // No key points -> nothing to mark against -> dropped.
    private val noKeyPointsEssay = """
        { "id":"E3","kind":"essay","title":"No key points","subjectId":"SYS_CVS","status":"Published",
          "essayData":{"prompt":"x","keyPoints":[],"examinerNote":"","modelAnswer":""}}
    """.trimIndent()

    // Blank prompt -> dropped.
    private val blankPromptEssay = """
        { "id":"E4","kind":"essay","title":"Blank prompt","subjectId":"SYS_CVS","status":"Published",
          "essayData":{"prompt":"   ","keyPoints":[{"id":"kp-0","text":"x"}],"examinerNote":"","modelAnswer":""}}
    """.trimIndent()

    // kind != "essay" -> ignored entirely, even a written question authored as format:"essay".
    private val questionKindItem = """
        { "id":"Q1","kind":"question","title":"Not an essay item","subjectId":"SYS_CVS","status":"Published",
          "questionData":{"format":"essay","writtenParts":[]}}
    """.trimIndent()

    @Test fun projectsOnlyThePublishedMarkableEssay() {
        val ledgerJson = "[$publishedEssay,$draftEssay,$noKeyPointsEssay,$blankPromptEssay,$questionKindItem]"

        val essays = EssayProjection.project(ledgerJson)

        assertEquals(1, essays.size)
        val essay = essays.single()
        assertEquals("E1", essay.id)
        assertEquals("Discuss heart failure", essay.title)
        assertEquals("SYS_CVS", essay.subjectId)
        assertEquals("Discuss the pathophysiology of heart failure.", essay.prompt)
        assertEquals("Look for the RAAS mechanism.", essay.examinerNote)
        assertEquals("Heart failure occurs when...", essay.modelAnswer)
        assertEquals(2, essay.keyPoints.size)
        assertEquals(EssayKeyPoint("kp-0-reduced-e", "Reduced ejection fraction", legible = true), essay.keyPoints[0])
        assertEquals(EssayKeyPoint("kp-1-raas", "RAAS activation", legible = false), essay.keyPoints[1])
    }

    @Test fun acceptsLedgerWrappedInItemsObject() {
        val ledgerJson = """{ "items": [$publishedEssay] }"""

        val essays = EssayProjection.project(ledgerJson)

        assertEquals(1, essays.size)
        assertTrue(essays.single().id == "E1")
    }
}
