package com.synapse.app.core.practical

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class PracticalProjectionTest {

    @Test
    fun projectIsEmptyForBlankOrMalformedLedgerJson() {
        assertTrue(PracticalProjection.project("").isEmpty())
        assertTrue(PracticalProjection.project("not json").isEmpty())
        assertTrue(PracticalProjection.project("{}").isEmpty())
    }

    @Test
    fun projectIgnoresNonPracticalKinds() {
        val ledger = """[{ "id":"Q1","kind":"question","title":"x","status":"Published" }]"""
        assertTrue(PracticalProjection.project(ledger).isEmpty())
    }

    @Test
    fun projectDropsAnUnpublishedOrUntitledItem() {
        val ledger = """[
            { "id":"P1","kind":"practical","title":"Draft station","status":"Draft" },
            { "id":"P2","kind":"practical","title":"","status":"Published" }
        ]"""
        assertTrue(PracticalProjection.project(ledger).isEmpty())
    }

    @Test
    fun projectsAnOsceStationWithMarkSectionsFromMixedStringAndObjectItems() {
        val ledger = """[{
            "id":"os-cvs","kind":"practical","title":"Cardiovascular examination","subjectId":"cvs","status":"Published",
            "fields":{"Type":"OSCE station","Difficulty":"Moderate","Duration":"8","Marks":"24"},
            "practicalData":{
                "learningObjective":"Perform a CVS exam",
                "candidateInstructions":"Examine this patient's cardiovascular system.",
                "markSections":[
                    { "id":"sec-intro", "title":"Introduction", "items":["Washes hands", {"text":"Introduces self"}, {"label":"Gains consent"}] }
                ],
                "debrief":"Well done.",
                "references":["Talley & O'Connor"]
            }
        }]"""

        val items = PracticalProjection.project(ledger)

        assertEquals(1, items.size)
        val station = items.single()
        assertEquals("os-cvs", station.id)
        assertEquals("OSCE station", station.type)
        assertEquals(8, station.minutes)
        assertEquals(24, station.marks)
        assertEquals("Examine this patient's cardiovascular system.", station.candidateInstructions)
        assertEquals(1, station.markSections.size)
        assertEquals(listOf("Washes hands", "Introduces self", "Gains consent"), station.markSections.single().items)
        assertEquals(3, station.totalMarkItems())
        assertEquals("Well done.", station.debrief)
        assertEquals(listOf("Talley & O'Connor"), station.references)
    }

    @Test
    fun projectsAClinicalCaseWithDecisionsAndQuestionExplanationAliases() {
        val ledger = """[{
            "id":"cc-chest","kind":"practical","title":"Acute central chest pain","subjectId":"cvs","status":"Published",
            "fields":{"Type":"Clinical case","Duration":"12"},
            "practicalData":{
                "decisions":[
                    { "id":"d1","title":"Initial assessment","context":"A 58-year-old presents with crushing chest pain.","question":"What is your first investigation?","explanation":"A 12-lead ECG." }
                ]
            }
        }]"""

        val case = PracticalProjection.project(ledger).single()

        assertEquals("Clinical case", case.type)
        assertEquals(1, case.decisions.size)
        val decision = case.decisions.single()
        assertEquals("What is your first investigation?", decision.prompt)
        assertEquals("A 12-lead ECG.", decision.answer)
        assertTrue(case.markSections.isEmpty())
    }

    @Test
    fun aSkillsChecklistItemWithNoMarkSectionsProjectsWithAnEmptyMarkScheme() {
        val ledger = """[{
            "id":"sk-bp","kind":"practical","title":"Blood pressure measurement","subjectId":"cvs","status":"Published",
            "fields":{"Type":"Skills checklist"}
        }]"""

        val skill = PracticalProjection.project(ledger).single()

        assertEquals("Skills checklist", skill.type)
        assertTrue(skill.markSections.isEmpty())
        assertEquals(0, skill.totalMarkItems())
        assertNull(skill.candidateInstructions)
    }

    @Test
    fun defaultsTypeAndDifficultyWhenFieldsAreMissing() {
        val ledger = """[{ "id":"p1","kind":"practical","title":"Untyped item","status":"Published" }]"""

        val item = PracticalProjection.project(ledger).single()

        assertEquals("Practical", item.type)
        assertEquals("Moderate", item.difficulty)
    }
}
