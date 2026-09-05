package com.nishany.android.design

import androidx.compose.ui.graphics.Color
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

class ThemeTest {

    @Test
    fun `light palette matches the web tokens`() {
        assertEquals(Color(0xFFF5F7FB), LightCortexColors.paper)
        assertEquals(Color(0xFFD13A63), LightCortexColors.primary)
        assertEquals(Color(0xFF1553B3), LightCortexColors.accent)
    }

    @Test
    fun `dark grounds are dark and dark ink is light`() {
        assertEquals(Color(0xFF0D1117), DarkCortexColors.paper)
        assertEquals(Color(0xFFE8ECF3), DarkCortexColors.ink)
    }

    @Test
    fun `the inset goes darker than the page in dark, as the web does`() {
        assertEquals(Color(0xFF0A0E14), DarkCortexColors.inset)
    }

    @Test
    fun `accent is re-picked for dark rather than reused`() {
        // #1553b3 is unreadable on a dark ground. A dark palette that simply
        // reuses the light accent is the tell that the port was mechanical.
        assertNotEquals(LightCortexColors.accent, DarkCortexColors.accent)
        assertEquals(Color(0xFF6FA5FF), DarkCortexColors.accent)
    }

    @Test
    fun `the primary fill holds its value across themes`() {
        // White on #d13a63 is 4.67:1 on any ground, so the fill does not move;
        // the *text* step moves up the ramp instead.
        assertEquals(LightCortexColors.primary, DarkCortexColors.primary)
        assertNotEquals(LightCortexColors.primaryStrong, DarkCortexColors.primaryStrong)
    }

    @Test
    fun `light material scheme carries the Cortex tokens, not Material defaults`() {
        val scheme = LightCortexColors.toMaterialScheme(dark = false)
        assertEquals(LightCortexColors.primary, scheme.primary)
        assertEquals(LightCortexColors.onPrimary, scheme.onPrimary)
        assertEquals(LightCortexColors.paper, scheme.background)
        assertEquals(LightCortexColors.surface, scheme.surface)
        assertEquals(LightCortexColors.ink, scheme.onSurface)
        assertEquals(LightCortexColors.danger, scheme.error)
    }

    @Test
    fun `dark material scheme carries the Cortex tokens, not Material defaults`() {
        val scheme = DarkCortexColors.toMaterialScheme(dark = true)
        assertEquals(DarkCortexColors.primary, scheme.primary)
        assertEquals(DarkCortexColors.onPrimary, scheme.onPrimary)
        assertEquals(DarkCortexColors.paper, scheme.background)
        assertEquals(DarkCortexColors.surface, scheme.surface)
        assertEquals(DarkCortexColors.ink, scheme.onSurface)
        assertEquals(DarkCortexColors.danger, scheme.error)
    }

    @Test
    fun `OLED goes true black, unlike dark`() {
        // src/index.css:479 -- true black is the whole point of an OLED
        // ground (the pixels are actually off), and it is darker than dark
        // mode's #0d1117, not the same value relabelled.
        assertEquals(Color(0xFF000000), OledCortexColors.paper)
        assertNotEquals(DarkCortexColors.paper, OledCortexColors.paper)
    }

    @Test
    fun `OLED reuses dark's fills rather than re-picking them`() {
        // src/index.css:495-529 says "Same fills as Dark" for exactly these
        // tokens -- a hand-written OLED palette that quietly drifted from
        // dark's primary/accent/success/warning/danger would fail here.
        assertEquals(DarkCortexColors.primary, OledCortexColors.primary)
        assertEquals(DarkCortexColors.primaryStrong, OledCortexColors.primaryStrong)
        assertEquals(DarkCortexColors.accent, OledCortexColors.accent)
        assertEquals(DarkCortexColors.accentStrong, OledCortexColors.accentStrong)
        assertEquals(DarkCortexColors.success, OledCortexColors.success)
        assertEquals(DarkCortexColors.warning, OledCortexColors.warning)
        assertEquals(DarkCortexColors.danger, OledCortexColors.danger)
    }

    @Test
    fun `OLED material scheme is dark, not light`() {
        val scheme = OledCortexColors.toMaterialScheme(dark = true)
        assertEquals(OledCortexColors.paper, scheme.background)
        assertEquals(OledCortexColors.ink, scheme.onSurface)
    }

    @Test
    fun `headings resolve to the serif and body copy to the sans, as the web does`() {
        // src/index.css h1-h5 take --font-serif; body takes --font-sans. Getting
        // this backwards is silent at compile time, so it is pinned here.
        assertEquals(CortexSerif, CortexTypography.headlineSmall.fontFamily)
        assertEquals(CortexSerif, CortexTypography.titleLarge.fontFamily)
        assertEquals(CortexSerif, CortexTypography.titleMedium.fontFamily)
        assertEquals(CortexSans, CortexTypography.bodyLarge.fontFamily)
        assertEquals(CortexSans, CortexTypography.bodyMedium.fontFamily)
        assertEquals(CortexSans, CortexTypography.labelLarge.fontFamily)
    }
}
