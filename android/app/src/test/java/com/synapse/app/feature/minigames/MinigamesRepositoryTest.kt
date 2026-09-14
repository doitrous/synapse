package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.minigames.MiniGameKind
import com.synapse.app.core.model.AttemptRecord
import com.synapse.app.core.model.StateDoc
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class MinigamesRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun glossaryIsEmptyWhenNothingIsStored() = runTest {
        val repository = MinigamesRepository(FakeLocalStore(), json)
        val glossary = repository.glossary()
        assertTrue(glossary.terms.isEmpty())
        assertTrue(glossary.categories.isEmpty())
    }

    @Test
    fun glossaryProjectsThePublishedCatalogue() = runTest {
        val localStore = FakeLocalStore()
        val valueJson = """
            { "categories": [ { "key": "Word parts", "ar": "x" } ],
              "terms": [ { "id": "s-itis", "term": "-itis", "ar": "y", "category": "Word parts", "def": "Inflammation.", "defAr": "z" } ] }
        """.trimIndent()
        val doc = StateDoc(value = json.parseToJsonElement(valueJson), updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue("synapse-medical-glossary-v1", "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))

        val repository = MinigamesRepository(localStore, json)
        val glossary = repository.glossary()
        assertEquals(1, glossary.terms.size)
        assertEquals("-itis", glossary.terms.single().term)
    }

    @Test
    fun packsPassesThroughTheBuiltInValidatedPacksOnlyNoIo() = runTest {
        val repository = MinigamesRepository(FakeLocalStore(), json)
        assertTrue(repository.packs().isNotEmpty())
        assertTrue(repository.packs(MiniGameKind.RED_FLAG_SORT).all { it.kind == MiniGameKind.RED_FLAG_SORT })
    }
}

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
