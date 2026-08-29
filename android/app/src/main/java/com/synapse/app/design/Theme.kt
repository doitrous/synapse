package com.synapse.app.design

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/**
 * The three appearances a student can pick for the app, persisted via
 * [ThemePreference]. Mirrors the web app's `data-theme` attribute values
 * (absent/`light`, `warm`, `dark` — see `src/index.css`), minus the
 * `prefers-color-scheme` auto-detection the web build doesn't use either:
 * the choice is always explicit.
 */
enum class ThemeChoice {
    Light,
    Warm,
    Dark,
}

/**
 * Material 3 color schemes ported from the web app's CSS custom properties
 * (`src/index.css`). Role mapping: `paper`→background, `surface`/`surface-2`→
 * surface/surfaceVariant, `ink`/`ink-2`→onBackground/onSurfaceVariant,
 * `line`/`line-2`→outlineVariant/outline, `primary`(+tint/strong)→primary
 * family, `accent`(+tint/strong)→secondary family, `danger`→error. Exact hex
 * values aren't load-bearing — the goal is three readable, visibly distinct
 * palettes with a calm, medical-study feel.
 */
private val LightColors = lightColorScheme(
    primary = Color(0xFFD13A63),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFFFF5F5),
    onPrimaryContainer = Color(0xFFA82449),
    secondary = Color(0xFF1553B3),
    onSecondary = Color(0xFFF8FBFF),
    secondaryContainer = Color(0xFFEAF1FD),
    onSecondaryContainer = Color(0xFF0E3F8C),
    background = Color(0xFFF5F7FB),
    onBackground = Color(0xFF161920),
    surface = Color(0xFFFFFFFF),
    onSurface = Color(0xFF161920),
    surfaceVariant = Color(0xFFEEF1F7),
    onSurfaceVariant = Color(0xFF5D636F),
    outline = Color(0xFFCCD3E0),
    outlineVariant = Color(0xFFE3E7EF),
    error = Color(0xFFA8121E),
    onError = Color(0xFFFFFFFF),
)

/** A cream/amber-tinted light variant: same brand hues as [LightColors], warmer neutrals. */
private val WarmColors = lightColorScheme(
    primary = Color(0xFFD13A63),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFFDEFEF),
    onPrimaryContainer = Color(0xFFA82449),
    secondary = Color(0xFF1553B3),
    onSecondary = Color(0xFFF8FBFF),
    secondaryContainer = Color(0xFFEEF1F8),
    onSecondaryContainer = Color(0xFF0E3F8C),
    background = Color(0xFFF7F2EA),
    onBackground = Color(0xFF1F1B16),
    surface = Color(0xFFFFFDF9),
    onSurface = Color(0xFF1F1B16),
    surfaceVariant = Color(0xFFF1EBE1),
    onSurfaceVariant = Color(0xFF675E51),
    outline = Color(0xFFD7CCB9),
    outlineVariant = Color(0xFFE9E0D2),
    error = Color(0xFFA8121E),
    onError = Color(0xFFFFFFFF),
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFFD13A63),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFF2A141D),
    onPrimaryContainer = Color(0xFFF193AB),
    secondary = Color(0xFF6FA5FF),
    onSecondary = Color(0xFF0A1120),
    secondaryContainer = Color(0xFF11203A),
    onSecondaryContainer = Color(0xFFA3C5FF),
    background = Color(0xFF0D1117),
    onBackground = Color(0xFFE8ECF3),
    surface = Color(0xFF151B24),
    onSurface = Color(0xFFE8ECF3),
    surfaceVariant = Color(0xFF1D2531),
    onSurfaceVariant = Color(0xFFA2ABBB),
    outline = Color(0xFF38424F),
    outlineVariant = Color(0xFF232B37),
    error = Color(0xFFFF6B6B),
    onError = Color(0xFF2A141D),
)

/** A small, calm type scale. Uses the platform default font family (no custom fonts bundled yet). */
val SynapseTypography = Typography(
    titleLarge = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 22.sp, lineHeight = 28.sp),
    titleMedium = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 16.sp, lineHeight = 24.sp),
    bodyLarge = TextStyle(fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 24.sp),
    bodyMedium = TextStyle(fontWeight = FontWeight.Normal, fontSize = 14.sp, lineHeight = 20.sp),
    labelLarge = TextStyle(fontWeight = FontWeight.Medium, fontSize = 14.sp, lineHeight = 20.sp),
)

/** Applies the Material 3 [MaterialTheme] for the given [choice]. */
@Composable
fun SynapseTheme(choice: ThemeChoice, content: @Composable () -> Unit) {
    val colorScheme = when (choice) {
        ThemeChoice.Light -> LightColors
        ThemeChoice.Warm -> WarmColors
        ThemeChoice.Dark -> DarkColors
    }
    MaterialTheme(
        colorScheme = colorScheme,
        typography = SynapseTypography,
        content = content,
    )
}
