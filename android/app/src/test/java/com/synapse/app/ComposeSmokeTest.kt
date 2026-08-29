package com.synapse.app

import androidx.compose.material3.Text
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/** Proves the Compose toolchain (compiler plugin + runtime + test rule) works
 *  under the JVM/Robolectric test harness before real screens are built. */
@RunWith(RobolectricTestRunner::class)
class ComposeSmokeTest {
    @get:Rule
    val rule = createComposeRule()

    @Test
    fun rendersComposable() {
        rule.setContent { Text("hello-synapse") }
        rule.onNodeWithText("hello-synapse").assertIsDisplayed()
    }
}
