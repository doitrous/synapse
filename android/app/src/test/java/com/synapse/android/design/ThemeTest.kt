package com.synapse.android.design

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
}
