package com.synapse.app.core.essays

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class WrittenQuestionTest {

    private val partA = WrittenPart(
        id = "p-a", label = "a", prompt = "Enumerate the contents of the femoral triangle.",
        marks = 4, expectedPoints = listOf("Femoral nerve", "Femoral artery", "Femoral vein", "Lymphatics"),
    )
    private val partB = WrittenPart(
        id = "p-b", label = "b", prompt = "Summarise the ligaments of the hip joint.",
        marks = 6, expectedPoints = listOf("Iliofemoral", "Pubofemoral", "Ischiofemoral"),
    )

    // --- markWritten ------------------------------------------------------------

    @Test fun markWrittenIsNullWhenNotYetMarked() {
        assertNull(markWritten(null, listOf(partA, partB)))
    }

    @Test fun markWrittenApportionsMarksAcrossExpectedPointsPerPart() {
        val ticks = mapOf("p-a" to listOf("Femoral nerve", "Femoral artery"), "p-b" to listOf("Iliofemoral"))

        val score = markWritten(ticks, listOf(partA, partB))!!

        assertEquals(2, score.parts.size)
        assertEquals(2, score.parts[0].covered)
        assertEquals(4, score.parts[0].total)
        assertEquals(2.0, score.parts[0].marks, 0.0001) // 2/4 of 4 marks
        assertEquals(1, score.parts[1].covered)
        assertEquals(3, score.parts[1].total)
        assertEquals(2.0, score.parts[1].marks, 0.0001) // 1/3 of 6 marks
        assertEquals(4.0, score.marks, 0.0001)
        assertEquals(10, score.outOf)
    }

    @Test fun markWrittenIntersectsTicksWithPointsThatStillExist() {
        val ticks = mapOf("p-a" to listOf("Femoral nerve", "A stale point that no longer exists"))

        val score = markWritten(ticks, listOf(partA))!!

        assertEquals(1, score.parts.single().covered)
    }

    @Test fun markWrittenScoresZeroForAPartWithNoPublishedScheme() {
        val unmarkablePart = partA.copy(expectedPoints = emptyList())
        val ticks = mapOf("p-a" to emptyList<String>())

        val score = markWritten(ticks, listOf(unmarkablePart))!!

        assertEquals(0.0, score.parts.single().marks, 0.0001)
        assertEquals(4, score.parts.single().outOf)
    }

    // --- writtenFullyMarked -------------------------------------------------------

    @Test fun writtenFullyMarkedIsFalseWhenNotMarkedAtAll() {
        assertFalse(writtenFullyMarked(null, listOf(partA, partB)))
    }

    @Test fun writtenFullyMarkedRequiresEveryMarkablePartToBeTicked() {
        val onlyA = mapOf("p-a" to listOf("Femoral nerve"))
        assertFalse(writtenFullyMarked(onlyA, listOf(partA, partB)))

        val both = mapOf("p-a" to listOf("Femoral nerve"), "p-b" to emptyList<String>())
        assertTrue(writtenFullyMarked(both, listOf(partA, partB)))
    }

    @Test fun writtenFullyMarkedTreatsAPartWithNoExpectedPointsAsDone() {
        val unmarkablePart = partA.copy(expectedPoints = emptyList())
        assertTrue(writtenFullyMarked(emptyMap(), listOf(unmarkablePart)))
    }

    // --- WrittenProjection --------------------------------------------------------

    private val publishedWritten = """
        { "id":"W1","kind":"question","title":"Femoral triangle and hip ligaments","subjectId":"SYS_MSK","status":"Published",
          "fields":{"Topic":"Lower limb"},
          "questionData":{"format":"structured_written","learningObjective":"Recall regional anatomy.",
            "writtenParts":[
              {"id":"p-a","label":"a","prompt":"Enumerate the contents of the femoral triangle.","marks":4,
                "expectedPoints":["Femoral nerve","Femoral artery","Femoral vein","Lymphatics"],"conceptIds":["C1"]},
              {"id":"p-b","label":"b","prompt":"Summarise the ligaments of the hip joint.","marks":6,
                "expectedPoints":["Iliofemoral","Pubofemoral","Ischiofemoral"],"conceptIds":["C2"],"dependsOnPartId":"p-a"}
            ],
            "tags":{"mainConceptIds":["C1","C2"],"conceptIds":["C1","C2"]}}}
    """.trimIndent()

    // status != Published -> dropped.
    private val draftWritten = """
        { "id":"W2","kind":"question","title":"Draft written","subjectId":"SYS_MSK","status":"Draft",
          "questionData":{"format":"essay","writtenParts":[{"id":"p-a","label":"a","prompt":"x","marks":5,"expectedPoints":["x"]}]}}
    """.trimIndent()

    // format not in WRITTEN_FORMATS (single-best MCQ) -> dropped, even with writtenParts present.
    private val nonWrittenFormat = """
        { "id":"W3","kind":"question","title":"An MCQ","subjectId":"SYS_MSK","status":"Published",
          "questionData":{"format":"mcq_single_best","writtenParts":[{"id":"p-a","label":"a","prompt":"x","marks":5,"expectedPoints":["x"]}]}}
    """.trimIndent()

    // No parts -> nothing to mark against -> dropped.
    private val noPartsWritten = """
        { "id":"W4","kind":"question","title":"No parts","subjectId":"SYS_MSK","status":"Published",
          "questionData":{"format":"short_answer","writtenParts":[]}}
    """.trimIndent()

    // kind != "question" -> ignored entirely.
    private val nonQuestionItem = """
        { "id":"E1","kind":"essay","title":"Not a written question","subjectId":"SYS_MSK","status":"Published",
          "essayData":{"prompt":"x","keyPoints":[{"id":"kp-0","text":"x"}]}}
    """.trimIndent()

    @Test fun projectsOnlyThePublishedMarkableWrittenQuestion() {
        val ledgerJson = "[$publishedWritten,$draftWritten,$nonWrittenFormat,$noPartsWritten,$nonQuestionItem]"

        val questions = WrittenProjection.project(ledgerJson)

        assertEquals(1, questions.size)
        val q = questions.single()
        assertEquals("W1", q.id)
        assertEquals("Femoral triangle and hip ligaments", q.title)
        assertEquals("SYS_MSK", q.subjectId)
        assertEquals("Lower limb", q.topic)
        assertEquals("Femoral triangle and hip ligaments", q.stem)
        assertEquals(2, q.parts.size)
        assertEquals(10, q.totalMarks)
        assertEquals("Recall regional anatomy.", q.learningObjective)
        assertEquals(listOf("C1", "C2"), q.conceptIds)
        assertEquals("p-a", q.parts[0].id)
        assertEquals(4, q.parts[0].marks)
        assertEquals("p-a", q.parts[1].dependsOnPartId)
    }

    @Test fun acceptsLedgerWrappedInItemsObject() {
        val ledgerJson = """{ "items": [$publishedWritten] }"""

        val questions = WrittenProjection.project(ledgerJson)

        assertEquals(1, questions.size)
        assertEquals("W1", questions.single().id)
    }
}
