package com.nishany.android.feature.taxonomy

import com.nishany.android.core.taxonomy.EMPTY_GLOSSARY
import com.nishany.android.core.taxonomy.MedicalTerm
import com.nishany.android.core.taxonomy.TaxSubtopic
import com.nishany.android.core.taxonomy.TaxSystem
import com.nishany.android.core.taxonomy.TaxTopic
import com.nishany.android.core.ui.UiState
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** [glossaryUiState], [taxonomyUiState] and the pure filters they call, in isolation. */
class TerminologyUiStateTest {

    private val term = MedicalTerm(id = "dyspnoea", term = "Dyspnoea", ar = "ضيق النفس", category = "Signs & symptoms", def = "Difficulty breathing.")

    @Test
    fun `no document yet is Loading`() {
        assertEquals(UiState.Loading, glossaryUiState(null, "", null))
        assertEquals(UiState.Loading, taxonomyUiState(null, ""))
    }

    @Test
    fun `an empty catalogue is Empty`() {
        assertTrue(glossaryUiState(EMPTY_GLOSSARY, "", null) is UiState.Empty)
        assertTrue(taxonomyUiState(emptyList(), "") is UiState.Empty)
    }

    @Test
    fun `glossary search matches term, translation and definition`() {
        val doc = EMPTY_GLOSSARY.copy(terms = listOf(term))
        assertEquals(listOf(term), (glossaryUiState(doc, "dyspnoea", null) as UiState.Content).data.terms)
        assertEquals(listOf(term), (glossaryUiState(doc, "ضيق", null) as UiState.Content).data.terms)
        assertEquals(listOf(term), (glossaryUiState(doc, "breathing", null) as UiState.Content).data.terms)
        assertTrue((glossaryUiState(doc, "nonexistent", null) as UiState.Content).data.terms.isEmpty())
    }

    @Test
    fun `glossary category filter narrows the list`() {
        val other = term.copy(id = "hypertension", term = "Hypertension", category = "Common conditions", def = "High blood pressure.")
        val doc = EMPTY_GLOSSARY.copy(terms = listOf(term, other))
        val filtered = (glossaryUiState(doc, "", "Common conditions") as UiState.Content).data.terms
        assertEquals(listOf(other), filtered)
    }

    @Test
    fun `taxonomy search keeps a system if any descendant matches, pruning siblings`() {
        val tree = listOf(
            TaxSystem(
                id = "cvs", name = "Cardiovascular",
                topics = listOf(
                    TaxTopic(id = "t1", title = "Heart failure", subs = listOf(TaxSubtopic("s1", "HFrEF"), TaxSubtopic("s2", "HFpEF"))),
                    TaxTopic(id = "t2", title = "Arrhythmia", subs = listOf(TaxSubtopic("s3", "AFib"))),
                ),
            ),
        )
        val result = taxonomyUiState(tree, "hfref") as UiState.Content
        val system = result.data.single()
        val topic = system.topics.single()
        assertEquals("Heart failure", topic.title)
        assertEquals(listOf("HFrEF"), topic.subs.map { it.title })
    }

    @Test
    fun `a blank query returns the tree untouched`() {
        val tree = listOf(TaxSystem(id = "cvs", name = "Cardiovascular"))
        assertEquals(tree, (taxonomyUiState(tree, "") as UiState.Content).data)
    }
}
