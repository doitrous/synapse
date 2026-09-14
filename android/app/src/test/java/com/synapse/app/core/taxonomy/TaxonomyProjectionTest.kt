package com.synapse.app.core.taxonomy

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Pure-logic catalogue projection: valid entries are kept, an entry missing
 * its `id` or `term` is dropped, and a structurally broken element doesn't
 * take the rest of the document down with it. Ported from `GlossaryDoc` in
 * `src/data/glossary.ts`.
 */
class TaxonomyProjectionTest {

    private val validDoc = """
        {
          "version": 1,
          "categories": [
            { "key": "Directional & anatomy", "ar": "الاتجاهات والتشريح" },
            { "key": "Word parts", "ar": "مكوّنات الكلمة" }
          ],
          "terms": [
            { "id": "anterior", "term": "Anterior", "ar": "أمامي", "category": "Directional & anatomy",
              "def": "Toward the front of the body.", "defAr": "باتجاه مقدمة الجسم.", "example": "The sternum is anterior to the heart." },
            { "id": "s-itis", "term": "-itis", "ar": "لاحقة: التهاب", "category": "Word parts",
              "def": "Inflammation of a part.", "defAr": "لاحقة تعني التهاب العضو." }
          ]
        }
    """.trimIndent()

    @Test fun projectsCategoriesAndTermsFromAWellFormedDocument() {
        val catalogue = TaxonomyProjection.project(validDoc)

        assertEquals(2, catalogue.categories.size)
        assertEquals(TaxonomyCategory("Directional & anatomy", "الاتجاهات والتشريح"), catalogue.categories[0])
        assertEquals(2, catalogue.terms.size)

        val anterior = catalogue.terms.first { it.id == "anterior" }
        assertEquals("Anterior", anterior.term)
        assertEquals("أمامي", anterior.arabic)
        assertEquals("Directional & anatomy", anterior.category)
        assertEquals("Toward the front of the body.", anterior.definition)
        assertEquals("باتجاه مقدمة الجسم.", anterior.definitionAr)
        assertEquals("The sternum is anterior to the heart.", anterior.example)
    }

    @Test fun aTermWithNoExampleProjectsANullExampleRatherThanBlank() {
        val catalogue = TaxonomyProjection.project(validDoc)
        assertNull(catalogue.terms.first { it.id == "s-itis" }.example)
    }

    @Test fun aTermMissingItsEnglishHeadwordIsDropped() {
        val json = """{ "categories": [], "terms": [ { "id": "x", "ar": "شيء" } ] }"""
        assertTrue(TaxonomyProjection.project(json).terms.isEmpty())
    }

    @Test fun aTermWithABlankIdIsDropped() {
        val json = """{ "categories": [], "terms": [ { "id": "  ", "term": "Something" } ] }"""
        assertTrue(TaxonomyProjection.project(json).terms.isEmpty())
    }

    @Test fun aTermWithABlankEnglishTermIsDropped() {
        val json = """{ "categories": [], "terms": [ { "id": "x", "term": "   " } ] }"""
        assertTrue(TaxonomyProjection.project(json).terms.isEmpty())
    }

    @Test fun aStructurallyBrokenTermIsDroppedWithoutFailingTheRestOfTheDocument() {
        // "term" is a number here, which fails to decode as a String — that one
        // element is skipped, the well-formed one beside it still projects.
        val json = """
            { "categories": [], "terms": [
              { "id": "bad", "term": 123 },
              { "id": "good", "term": "Good" }
            ] }
        """.trimIndent()

        val terms = TaxonomyProjection.project(json).terms
        assertEquals(1, terms.size)
        assertEquals("good", terms.single().id)
    }

    @Test fun emptyCatalogueWhenTheDocumentIsNotAJsonObject() {
        val catalogue = TaxonomyProjection.project("[]")
        assertTrue(catalogue.categories.isEmpty())
        assertTrue(catalogue.terms.isEmpty())
    }

    @Test fun emptyCatalogueWhenTheJsonIsUnparseable() {
        val catalogue = TaxonomyProjection.project("not json")
        assertTrue(catalogue.categories.isEmpty())
        assertTrue(catalogue.terms.isEmpty())
    }

    @Test fun emptyCatalogueWhenCategoriesAndTermsAreAbsent() {
        val catalogue = TaxonomyProjection.project("{}")
        assertTrue(catalogue.categories.isEmpty())
        assertTrue(catalogue.terms.isEmpty())
    }
}
