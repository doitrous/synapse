package com.synapse.app.feature.minigames

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.minigames.MiniGameKind
import com.synapse.app.core.minigames.MiniGamePack
import com.synapse.app.core.minigames.validMiniGamePacks
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.taxonomy.TaxonomyCatalogue
import com.synapse.app.core.taxonomy.TaxonomyProjection
import kotlinx.serialization.json.Json
import javax.inject.Inject

/** The shared, admin-authored bilingual glossary — Spotter, Term Match and Term Grid's only content source. Read-only: no per-user data. */
private const val GLOSSARY_KEY = "synapse-medical-glossary-v1"

/**
 * The Minigames hub's data layer.
 *
 * [glossary] reads the same shared, already-student-readable catalogue
 * `feature/taxonomy/TaxonomyRepository` reads, via the same
 * [TaxonomyProjection] — this feature keeps its own copy of that plumbing
 * (rather than depending on `feature.taxonomy`) because no feature here
 * imports another feature's repository (see how the shell only ever imports
 * `*Route` entry points across features).
 *
 * [packs] is a plain pass-through to the built-in, static
 * `MINI_GAME_PACKS` — no I/O, since that list ships in the app rather than
 * syncing from a catalogue. See `core/minigames/MinigamePacks.kt`'s KDoc for
 * why admin-authored packs (`synapse-minigame-packs-v1`) are deferred rather
 * than fetched here.
 */
class MinigamesRepository @Inject constructor(
    private val localStore: LocalStore,
    private val json: Json,
) {

    /** The published glossary, projected. Empty catalogue if absent/unparseable. */
    suspend fun glossary(): TaxonomyCatalogue = TaxonomyProjection.project(catalogueJsonOrEmpty())

    /** The built-in, reviewed game packs, optionally filtered to one [kind]. */
    fun packs(kind: MiniGameKind? = null): List<MiniGamePack> = validMiniGamePacks(kind)

    private suspend fun catalogueJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(GLOSSARY_KEY) ?: return "{}"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("{}")
    }
}
