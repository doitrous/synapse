package com.synapse.app.core.minigames

/**
 * One seeded source of randomness, ported bit-for-bit from web's
 * `src/data/seededRandom.ts`, so a game seeded the same number plays out
 * identically on both clients — the same reason web keeps this pure and
 * `Math.random()`-free: Spotter, Term Match and Term Grid links all carry a
 * seed, and a stray platform-native random call in the port would make the
 * "same" game diverge silently between two students.
 *
 * The mixing constants below are `0x9e3779b1`, `0x85ebca6b`, `0x21f0aaad`,
 * `0x735a2d97` and `0x6d2b79f5` from the web source, written as their signed
 * 32-bit two's-complement values because a Kotlin `Int` literal cannot hold
 * them unsigned. Kotlin's `Int` arithmetic already wraps modulo 2^32 the same
 * way JavaScript's `Math.imul`/`|0` do, so no extra masking is needed except
 * at the final step, which must reinterpret the raw bits as unsigned before
 * dividing.
 */

/**
 * The golden-ratio-derived 32-bit constant web reuses in two places: mixing a
 * seed here, and striding between derived seeds in `crossword.ts`'s
 * `derivedSeed`. Exposed (not private) so [com.synapse.app.core.minigames]'s
 * Term Grid port can reuse the exact same constant rather than a second copy.
 */
const val SEED_GOLDEN_GAMMA = -1640531535 // 0x9e3779b1

private const val SEED_XOR = -2048144789 // 0x85ebca6b
private const val MIX_1 = 569420461 // 0x21f0aaad
private const val MIX_2 = 1935289751 // 0x735a2d97

/** Used both as the xorshift's dead-state escape and (elsewhere, in Term Grid) as a seed-derivation XOR mask, matching web. */
const val SEED_FALLBACK_STATE = 1831565813 // 0x6d2b79f5

/**
 * A deterministic source for one seed: each call returns the next draw in
 * `[0, 1)`, exactly mirroring web's `seededRandom(seed): () => number`.
 */
fun seededRandom(seed: Int): () -> Double {
    var state = seed
    state = (state * SEED_GOLDEN_GAMMA) xor SEED_XOR
    state = (state xor (state ushr 16)) * MIX_1
    state = (state xor (state ushr 15)) * MIX_2
    state = state xor (state ushr 15)
    // xorshift32 is dead at zero, so nudge it off that one bad state.
    if (state == 0) state = SEED_FALLBACK_STATE

    return {
        state = state xor (state shl 13)
        state = state xor (state ushr 17)
        state = state xor (state shl 5)
        (state.toLong() and 0xFFFFFFFFL).toDouble() / 4294967296.0
    }
}

/** Fisher–Yates, drawing only from [random] — ported from web's `shuffle`. */
fun <T> shuffle(items: List<T>, random: () -> Double): List<T> {
    val out = items.toMutableList()
    for (i in out.size - 1 downTo 1) {
        val j = (random() * (i + 1)).toInt()
        val tmp = out[i]
        out[i] = out[j]
        out[j] = tmp
    }
    return out
}
