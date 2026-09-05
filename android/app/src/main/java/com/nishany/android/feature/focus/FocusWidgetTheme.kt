package com.nishany.android.feature.focus

import androidx.glance.material3.ColorProviders
import com.nishany.android.design.DarkCortexColors
import com.nishany.android.design.LightCortexColors
import com.nishany.android.design.toMaterialScheme

/**
 * The Cortex palette for Glance widgets, built through the exact same
 * [toMaterialScheme] mapping [com.nishany.android.design.CortexTheme] uses
 * for in-app Material -- see that function's doc for the token mapping.
 *
 * Light/dark rather than the reader's in-app choice (light/warm/dark/oled):
 * a home-screen widget renders outside any Activity, so it has no
 * `LocalCortex` to read, and a `SharedPreferences` peek at
 * [com.nishany.android.design.ThemePreference] would still only say
 * "light-family" or "dark-family" -- warm and oled are both in-app-only
 * refinements of one of those two. System day/night is the nearest a widget
 * can honor without that reader-specific lookup.
 */
val GlanceCortexColors = ColorProviders(
    light = LightCortexColors.toMaterialScheme(dark = false),
    dark = DarkCortexColors.toMaterialScheme(dark = true),
)
