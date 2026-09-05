package com.nishany.android.core.reader

import kotlin.math.abs
import kotlin.math.sin
import kotlin.math.PI
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [StrokeCodec] must produce the exact same integers `src/lib/reader/strokeCodec.ts`
 * does for the same points -- that is the whole cross-device contract. The
 * fixture below is not just "a stroke shaped like the web's test": it is the
 * literal input/output pair captured by running the real
 * `encodePoints`/`stroke()` from `strokeCodec.test.ts` under Node (`node -e`)
 * against a 12-point stroke, so a mismatch here means Android's encoder has
 * genuinely diverged from the one running in production, not just from a
 * hand-written approximation of it.
 */
class StrokeCodecTest {

    /** The same wobbly-arc generator as `strokeCodec.test.ts`'s `stroke()`. */
    private fun stroke(count: Int): List<InkPoint> = (0 until count).map { index ->
        val t = index.toDouble() / (count - 1)
        InkPoint(
            x = 0.1 + t * 0.8,
            y = 0.3 + sin(t * PI) * 0.2 + sin(t * 40) * 0.0015,
        )
    }

    @Test
    fun `encoding matches the real web algorithm byte for byte`() {
        // Captured verbatim from: node -e '...same encodePoints+stroke as strokeCodec.ts...' on a 12-point stroke.
        val expected = listOf(
            410, 1229, 297, 228, 298, 220, 298, 165, 298, 138, 298, 56,
            298, 5, 298, -65, 298, -133, 298, -165, 298, -224, 297, -221,
        )

        val encoded = StrokeCodec.encode(stroke(12))

        assertEquals(expected, encoded)
    }

    @Test
    fun `points survive the round trip within the quantum`() {
        val original = stroke(120)
        val decoded = StrokeCodec.decode(StrokeCodec.encode(original))

        assertEquals(original.size, decoded.size)
        for (index in original.indices) {
            // 1/4096 of a page width -- under 0.05mm on A4.
            assertTrue(abs(decoded[index].x - original[index].x) < 1.0 / 4096)
            assertTrue(abs(decoded[index].y - original[index].y) < 1.0 / 4096)
        }
    }

    @Test
    fun `an empty or single-point stroke round-trips too`() {
        assertEquals(emptyList<Int>(), StrokeCodec.encode(emptyList()))
        assertEquals(emptyList<InkPoint>(), StrokeCodec.decode(emptyList()))

        val single = StrokeCodec.decode(StrokeCodec.encode(listOf(InkPoint(0.5, 0.25))))
        assertEquals(1, single.size)
        assertTrue(abs(single[0].x - 0.5) < 1.0 / 4096)
    }

    @Test
    fun `simplification keeps both ends exactly`() {
        val original = stroke(80)
        val simplified = StrokeCodec.simplify(original)

        assertEquals(original.first(), simplified.first())
        assertEquals(original.last(), simplified.last())
    }

    @Test
    fun `a straight line collapses to its two ends`() {
        val line = (0 until 50).map { InkPoint(it / 49.0, 0.5) }
        assertEquals(2, StrokeCodec.simplify(line).size)
    }

    @Test
    fun `translate shifts only the first pair`() {
        val encoded = StrokeCodec.encode(stroke(5))
        val moved = StrokeCodec.translate(encoded, dx = 0.1, dy = -0.2)

        assertEquals(encoded[0] + StrokeCodec.quantise(0.1), moved[0])
        assertEquals(encoded[1] + StrokeCodec.quantise(-0.2), moved[1])
        // Every delta after the first pair is untouched.
        assertEquals(encoded.drop(2), moved.drop(2))
    }
}
