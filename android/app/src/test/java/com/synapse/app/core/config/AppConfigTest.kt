package com.synapse.app.core.config

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class AppConfigTest {
    @Test fun isConfiguredWhenAllPresent() {
        val c = AppConfig(apiHost = "api.example.com", supabaseHost = "sb.example.com", supabaseAnonKey = "anon-key")
        assertTrue(c.isConfigured)
        assertEquals("https://api.example.com/api", c.apiBase)
    }

    @Test fun notConfiguredWhenAnyBlank() {
        assertFalse(AppConfig("", "sb", "key").isConfigured)
        assertFalse(AppConfig("api", "", "key").isConfigured)
        assertFalse(AppConfig("api", "sb", "").isConfigured)
    }
}
