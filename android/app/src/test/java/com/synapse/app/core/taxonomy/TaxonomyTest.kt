package com.synapse.app.core.taxonomy

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** Pure search/grouping logic: [searchTerms] and [groupByCategory]. */
class TaxonomyTest {

    private val anatomy = TaxonomyCategory("Directional & anatomy", "الاتجاهات والتشريح")
    private val wordParts = TaxonomyCategory("Word parts", "مكوّنات الكلمة")

    private val anterior = TaxonomyTerm("anterior", "Anterior", "أمامي", anatomy.key, "Toward the front of the body.", "باتجاه مقدمة الجسم.", null)
    private val posterior = TaxonomyTerm("posterior", "Posterior", "خلفي", anatomy.key, "Toward the back of the body.", "باتجاه مؤخرة الجسم.", null)
    private val itis = TaxonomyTerm("s-itis", "-itis", "لاحقة: التهاب", wordParts.key, "Inflammation of a part.", "لاحقة تعني التهاب العضو.", "Hepatitis = inflammation of the liver.")

    private val terms = listOf(anterior, posterior, itis)

    // --- searchTerms ------------------------------------------------------------

    @Test fun blankQueryReturnsEveryTerm() {
        assertEquals(terms, searchTerms(terms, "   "))
    }

    @Test fun matchesTheEnglishTermCaseInsensitively() {
        assertEquals(listOf(anterior), searchTerms(terms, "ANT"))
    }

    @Test fun matchesTheArabicTranslation() {
        assertEquals(listOf(anterior), searchTerms(terms, "أمامي"))
    }

    @Test fun matchesInsideTheEnglishDefinition() {
        assertEquals(listOf(itis), searchTerms(terms, "inflammation"))
    }

    @Test fun matchesInsideTheArabicDefinition() {
        assertEquals(listOf(posterior), searchTerms(terms, "مؤخرة"))
    }

    @Test fun noMatchesReturnsAnEmptyList() {
        assertTrue(searchTerms(terms, "nonexistent").isEmpty())
    }

    // --- groupByCategory ----------------------------------------------------------

    @Test fun groupsTermsUnderTheirPublishedCategoryInDocumentOrder() {
        val groups = groupByCategory(listOf(anatomy, wordParts), terms)

        assertEquals(2, groups.size)
        assertEquals(anatomy, groups[0].category)
        assertEquals(listOf(anterior, posterior), groups[0].terms)
        assertEquals(wordParts, groups[1].category)
        assertEquals(listOf(itis), groups[1].terms)
    }

    @Test fun aCategoryWithNoMatchingTermsIsOmitted() {
        val empty = TaxonomyCategory("Pharmacology", "علم الأدوية")
        val groups = groupByCategory(listOf(anatomy, empty), terms)

        assertEquals(1, groups.size)
        assertEquals(anatomy, groups.single().category)
    }

    @Test fun aTermWhoseCategoryMatchesNoPublishedCategoryIsNotShownUnderAnyGroup() {
        val orphan = anterior.copy(id = "orphan", category = "Unknown category")
        val groups = groupByCategory(listOf(anatomy), listOf(orphan))
        assertTrue(groups.isEmpty())
    }
}
