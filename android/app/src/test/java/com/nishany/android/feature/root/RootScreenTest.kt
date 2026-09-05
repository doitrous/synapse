package com.nishany.android.feature.root

import android.content.Context
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.test.core.app.ApplicationProvider
import com.nishany.android.AppGraph
import com.nishany.android.core.config.AppConfig
import org.junit.After
import org.junit.Assert.assertFalse
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * The regression this task's review actually found: `RootScreen` read
 * `graph.auth.state` *before* checking `graph.config.isConfigured`, which
 * forces the whole `by lazy` chain -- `sessionStore` -> `authBackend` ->
 * `api` -> `auth` -- including `EncryptedSessionStore`'s eager Android
 * Keystore access, on a build that has no configuration to build any of
 * that from. Neither existing `AppGraphTest` case could have caught it:
 * neither one renders `RootScreen`.
 *
 * `isLazyInitialized` reaches past encapsulation on purpose -- it is the
 * only way to state the actual invariant ("this object was never built")
 * rather than a proxy for it (e.g. asserting `RootScreen` merely doesn't
 * crash, which an unrelated future change could make true or false for
 * reasons that have nothing to do with this ordering).
 */
@RunWith(RobolectricTestRunner::class)
class RootScreenTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    private var graph: AppGraph? = null

    @After
    fun tearDown() {
        graph?.database?.close()
    }

    private fun context(): Context = ApplicationProvider.getApplicationContext()

    private fun unconfigured() = AppConfig(rawSupabaseHost = "", supabaseAnonKey = "", rawApiBaseUrl = "")

    @Test
    fun `an unconfigured build shows the explanation screen and never builds the auth chain`() {
        val built = AppGraph(context(), unconfigured())
        graph = built

        composeTestRule.setContent {
            RootScreen(built)
        }

        composeTestRule.onNodeWithText("Not configured").assertExists()
        composeTestRule.onNodeWithText("• SUPABASE_HOST").assertExists()
        composeTestRule.onNodeWithText("• SUPABASE_ANON_KEY").assertExists()
        composeTestRule.onNodeWithText("• API_BASE_URL").assertExists()

        // The actual invariant: RootScreen never so much as read
        // graph.auth, graph.api, or graph.authBackend on this path -- not
        // merely that doing so happened not to crash this run.
        assertFalse(built.isLazyInitialized("sessionStore"))
        assertFalse(built.isLazyInitialized("authBackend"))
        assertFalse(built.isLazyInitialized("api"))
        assertFalse(built.isLazyInitialized("auth"))
        assertFalse(built.isLazyInitialized("sync"))
    }
}

/** Reflects into a `by lazy` property's backing delegate to ask, without triggering it, whether it has been built yet. */
private fun Any.isLazyInitialized(propertyName: String): Boolean {
    val field = javaClass.getDeclaredField("$propertyName\$delegate")
    field.isAccessible = true
    return (field.get(this) as Lazy<*>).isInitialized()
}
