package com.synapse.app.core.minigames

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/**
 * [seededRandom]/[shuffle] pinned against exact draws computed from web's
 * `src/data/seededRandom.ts` (via Node, same algorithm) — verifies the Kotlin
 * port is bit-for-bit identical, not merely "a" deterministic generator.
 */
class SeededRandomTest {

    @Test
    fun seedTwelveMatchesTheWebReferenceDraws() {
        val random = seededRandom(12)
        val draws = List(4) { random() }
        assertEquals(
            listOf(0.9815752319991589, 0.5502960567828268, 0.8502697281073779, 0.623423894867301),
            draws,
        )
    }

    @Test
    fun sameSeedProducesTheSameSequence() {
        val a = seededRandom(42)
        val b = seededRandom(42)
        assertEquals(List(5) { a() }, List(5) { b() })
    }

    @Test
    fun differentSeedsDiverge() {
        val a = seededRandom(1)
        val b = seededRandom(2)
        assertNotEquals(a(), b())
    }

    @Test
    fun shuffleIsDeterministicForAGivenSeed() {
        val items = listOf("danger", "response", "airway", "breathing", "compressions", "aed")
        val a = shuffle(items, seededRandom(12))
        val b = shuffle(items, seededRandom(12))
        assertEquals(a, b)
        assertEquals(items.toSet(), a.toSet())
    }

    @Test
    fun shuffleMatchesTheWebReferenceOrderForSeedTwelve() {
        val items = listOf("danger", "response", "airway", "breathing", "compressions", "aed")
        assertEquals(
            listOf("danger", "compressions", "response", "breathing", "airway", "aed"),
            shuffle(items, seededRandom(12)),
        )
    }
}
