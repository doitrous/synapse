package com.synapse.app.core.adaptive

/**
 * A small, fast, seeded PRNG.
 *
 * Ported from the two seed helpers in `src/data/adaptive/blockBuilder.ts`
 * (the block builder itself is not ported this task — only [Readiness] needs
 * a deterministic draw, for held-out reservation and assessment assembly).
 * Determinism is a product requirement, not a convenience: a stored seed is
 * what lets a support conversation reproduce the exact assessment a student
 * is looking at.
 *
 * All arithmetic below is 32-bit and wraps exactly as the JS `>>> 0` /
 * `Math.imul` original does — Kotlin `Int` overflow already wraps mod 2^32,
 * and every multiply, xor and shift here operates on the same bit pattern the
 * JS version does, so the two only need to agree bit-for-bit, not on sign.
 */

/** Mulberry32: returns a generator of doubles in [0, 1). */
fun mulberry32(seed: Int): () -> Double {
    var a = seed
    return {
        a += 0x6d2b79f5
        var t = (a xor (a ushr 15)) * (a or 1)
        t = (t + ((t xor (t ushr 7)) * (t or 61))) xor t
        (Integer.toUnsignedLong(t xor (t ushr 14))).toDouble() / 4294967296.0
    }
}

/** A deterministic seed from a string, so an id alone reproduces a draw (FNV-1a, 32-bit). */
fun seedFrom(text: String): Int {
    var hash = -0x7ee3623b // two's-complement Int for the FNV offset basis 0x811c9dc5
    for (ch in text) {
        hash = hash xor ch.code
        hash *= 0x01000193
    }
    return hash
}
