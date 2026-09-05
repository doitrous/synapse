package com.nishany.android.design

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.sp
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Material gives a [androidx.compose.material3.Typography] fifteen slots and
 * silently fills any the app leaves out with Roboto at Material's own sizes.
 * A component reaching for an unported slot therefore does not fail; it just
 * renders in the wrong face, which is exactly the kind of thing nobody
 * notices until a screenshot goes past a designer. These tests are the
 * backstop: every slot ported, none of them Roboto, and the ladder still in
 * descending order.
 */
class TypographyTest {

    private val slots: List<Pair<String, TextStyle>> = with(CortexTypography) {
        listOf(
            "displayLarge" to displayLarge,
            "displayMedium" to displayMedium,
            "displaySmall" to displaySmall,
            "headlineLarge" to headlineLarge,
            "headlineMedium" to headlineMedium,
            "headlineSmall" to headlineSmall,
            "titleLarge" to titleLarge,
            "titleMedium" to titleMedium,
            "titleSmall" to titleSmall,
            "bodyLarge" to bodyLarge,
            "bodyMedium" to bodyMedium,
            "bodySmall" to bodySmall,
            "labelLarge" to labelLarge,
            "labelMedium" to labelMedium,
            "labelSmall" to labelSmall,
        )
    }

    @Test
    fun `every slot is one of the two brand faces`() {
        assertEquals("all fifteen slots must be listed here", 15, slots.size)
        for ((name, style) in slots) {
            val family: FontFamily? = style.fontFamily
            assertTrue(
                "$name falls back to Material's default face instead of a brand one",
                family == CortexSans || family == CortexSerif,
            )
        }
    }

    @Test
    fun `every slot carries a size and a line height`() {
        for ((name, style) in slots) {
            assertTrue("$name has no font size", style.fontSize.value > 0f)
            assertTrue("$name has no line height", style.lineHeight.value > 0f)
            assertTrue(
                "$name's line height is smaller than its type",
                style.lineHeight.value >= style.fontSize.value,
            )
        }
    }

    @Test
    fun `the ladder descends within each role`() {
        // The role a component picks should be the size it gets. A slot out
        // of order means a "small" heading rendering larger than a "medium".
        for (role in listOf("display", "headline", "title", "body", "label")) {
            val ladder = slots.filter { it.first.startsWith(role) }.map { it.second.fontSize.value }
            assertEquals("$role should have three steps", 3, ladder.size)
            assertEquals(
                "$role does not descend: $ladder",
                ladder.sortedDescending(),
                ladder,
            )
        }
    }

    @Test
    fun `headings are the serif and small text is the sans`() {
        // src/index.css:320-326 puts the serif on h1..h5 only; nothing below
        // 16px on the site is set in it.
        for ((name, style) in slots.filter { it.first.startsWith("display") || it.first.startsWith("headline") }) {
            assertEquals("$name should be the serif", CortexSerif, style.fontFamily)
        }
        for ((name, style) in slots.filter { it.first.startsWith("label") || it.first.startsWith("body") }) {
            assertEquals("$name should be the sans", CortexSans, style.fontFamily)
        }
    }

    @Test
    fun `the eyebrow keeps the open tracking that makes it legible`() {
        // text-[11px] font-semibold uppercase tracking-[0.07em] in
        // src/components/practical/PracticalRunner.tsx:286. Dropped tracking
        // is the difference between a label and a smudge.
        assertEquals(11.sp, CortexTypography.labelSmall.fontSize)
        assertTrue(
            "labelSmall lost its tracking",
            CortexTypography.labelSmall.letterSpacing.value > 0f,
        )
    }
}
