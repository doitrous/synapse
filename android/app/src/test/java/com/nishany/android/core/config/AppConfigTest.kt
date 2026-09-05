package com.nishany.android.core.config

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class AppConfigTest {

    @Test
    fun `reports every missing field by name`() {
        val config = AppConfig("", "", "")
        assertFalse(config.isConfigured)
        assertEquals(
            listOf("SUPABASE_HOST", "SUPABASE_ANON_KEY", "API_BASE_URL"),
            config.missing,
        )
    }

    @Test
    fun `adds back the scheme an xcconfig-style host omits`() {
        val config = AppConfig("abc.supabase.co", "key", "https://api.example.com")
        assertTrue(config.isConfigured)
        assertEquals("https://abc.supabase.co", config.supabaseUrl)
    }

    @Test
    fun `tolerates a host pasted with its scheme`() {
        val config = AppConfig("https://abc.supabase.co", "key", "https://api.example.com")
        assertEquals("https://abc.supabase.co", config.supabaseUrl)
    }

    @Test
    fun `trims a trailing slash from the api base so paths do not double up`() {
        val config = AppConfig("abc.supabase.co", "key", "https://api.example.com/")
        assertEquals("https://api.example.com", config.apiBaseUrl)
    }
}
