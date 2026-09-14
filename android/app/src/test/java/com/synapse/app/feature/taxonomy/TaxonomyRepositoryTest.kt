package com.synapse.app.feature.taxonomy

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.StateDoc
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * [TaxonomyRepository] projects the shared glossary catalogue into
 * student-facing terms/categories. Read-only — no [com.synapse.app.core.sync.SyncEngine]
 * involved, unlike `LibraryRepositoryTest`'s read/write round-trip, since this
 * surface holds no user data.
 */
class TaxonomyRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var repository: TaxonomyRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        repository = TaxonomyRepository(localStore, json)
    }

    @Test
    fun catalogueIsEmptyWhenNothingIsStoredLocally() = runTest {
        val catalogue = repository.catalogue()
        assertTrue(catalogue.categories.isEmpty())
        assertTrue(catalogue.terms.isEmpty())
    }

    @Test
    fun catalogueProjectsTheStoredGlossaryDocument() = runTest {
        seedCatalogue(
            GLOSSARY_KEY,
            """
            { "categories": [ { "key": "Word parts", "ar": "مكوّنات الكلمة" } ],
              "terms": [ { "id": "s-itis", "term": "-itis", "ar": "لاحقة: التهاب", "category": "Word parts",
                "def": "Inflammation of a part.", "defAr": "لاحقة تعني التهاب العضو." } ] }
            """.trimIndent(),
        )

        val catalogue = repository.catalogue()

        assertEquals(1, catalogue.categories.size)
        assertEquals("s-itis", catalogue.terms.single().id)
    }

    @Test
    fun catalogueIsEmptyWhenTheStoredValueIsNotValidJson() = runTest {
        localStore.putCatalogue(GLOSSARY_KEY, "2026-08-29T00:00:00Z", "not json at all")

        val catalogue = repository.catalogue()

        assertTrue(catalogue.categories.isEmpty())
        assertTrue(catalogue.terms.isEmpty())
    }

    // --- fixtures ------------------------------------------------------------------

    private suspend fun seedCatalogue(key: String, valueJson: String) {
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(key, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val GLOSSARY_KEY = "synapse-medical-glossary-v1"
    }
}

// --- Fake --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, AttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<AttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<AttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}
