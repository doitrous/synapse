package com.synapse.android.design

import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * The Connect Cortex palette, ported field-for-field from the `@theme` block
 * and the `:root[data-theme='dark']` block of `src/index.css`. Every screen
 * reads its colours from [LocalCortex] rather than from Material defaults.
 */
@Immutable
data class CortexColors(
    val paper: Color, val surface: Color, val surface2: Color, val inset: Color,
    val ink: Color, val ink2: Color, val ink3: Color,
    val line: Color, val line2: Color,
    val primary: Color, val primaryStrong: Color, val primaryTint: Color,
    val primarySoft: Color,
    val primaryLine: Color, val onPrimary: Color,
    val accent: Color, val accentStrong: Color, val accentTint: Color,
    val accentLine: Color, val onAccent: Color,
    val success: Color, val successTint: Color, val onSuccess: Color,
    val warning: Color, val warningTint: Color, val onWarning: Color,
    val danger: Color, val dangerTint: Color, val onDanger: Color,
)

val LightCortexColors = CortexColors(
    paper = Color(0xFFF5F7FB), surface = Color(0xFFFFFFFF),
    surface2 = Color(0xFFEEF1F7), inset = Color(0xFFE4E9F2),
    ink = Color(0xFF161920), ink2 = Color(0xFF5D636F), ink3 = Color(0xFF949AA8),
    line = Color(0xFFE3E7EF), line2 = Color(0xFFCCD3E0),
    primary = Color(0xFFD13A63), primaryStrong = Color(0xFFA82449),
    primaryTint = Color(0xFFFFF5F5), primarySoft = Color(0xFFEF8FA3),
    primaryLine = Color(0xFFF4C8D6),
    onPrimary = Color(0xFFFFFFFF),
    accent = Color(0xFF1553B3), accentStrong = Color(0xFF0E3F8C),
    accentTint = Color(0xFFEAF1FD), accentLine = Color(0xFFC4D9F7),
    onAccent = Color(0xFFF8FBFF),
    success = Color(0xFF1A6E56), successTint = Color(0xFFE3F2EC), onSuccess = Color(0xFFF4FBF8),
    warning = Color(0xFF8A5A0A), warningTint = Color(0xFFFBF0D9), onWarning = Color(0xFFFFFAF0),
    danger = Color(0xFFA8121E), dangerTint = Color(0xFFFCE7E9), onDanger = Color(0xFFFFF7F7),
)

/**
 * Warm restates the grounds, inks, rules and tints and inherits everything
 * else from light -- the fills and the `on-*` pairs are deliberately shared.
 * A `copy` keeps that true: a token added to light arrives in warm as well,
 * which is what the CSS cascade does. Ported field-for-field from the
 * partial override at `:root[data-theme='warm']` (`src/index.css:153-187`).
 */
val WarmCortexColors = LightCortexColors.copy(
    paper = Color(0xFFF7F2EA), surface = Color(0xFFFFFDF9),
    surface2 = Color(0xFFF1EBE1), inset = Color(0xFFE9E1D4),
    ink = Color(0xFF1F1B16), ink2 = Color(0xFF675E51), ink3 = Color(0xFF9B9284),
    line = Color(0xFFE9E0D2), line2 = Color(0xFFD7CCB9),
    primaryTint = Color(0xFFFDEFEF), primaryLine = Color(0xFFF0C8D1),
    accentTint = Color(0xFFEEF1F8), accentLine = Color(0xFFCBD8EE),
    successTint = Color(0xFFE8EFDF),
    warningTint = Color(0xFFF7EDD7),
    dangerTint = Color(0xFFF9E6E3),
)

val DarkCortexColors = CortexColors(
    paper = Color(0xFF0D1117), surface = Color(0xFF151B24),
    surface2 = Color(0xFF1D2531), inset = Color(0xFF0A0E14),
    ink = Color(0xFFE8ECF3), ink2 = Color(0xFFA2ABBB), ink3 = Color(0xFF7D8798),
    line = Color(0xFF232B37), line2 = Color(0xFF38424F),
    primary = Color(0xFFD13A63), primaryStrong = Color(0xFFF193AB),
    primaryTint = Color(0xFF2A141D), primarySoft = Color(0xFF8C2745),
    primaryLine = Color(0xFF4A2130),
    onPrimary = Color(0xFFFFFFFF),
    accent = Color(0xFF6FA5FF), accentStrong = Color(0xFFA3C5FF),
    accentTint = Color(0xFF11203A), accentLine = Color(0xFF24406B),
    onAccent = Color(0xFF0A1120),
    success = Color(0xFF4DC79B), successTint = Color(0xFF0E2B23), onSuccess = Color(0xFF06130F),
    warning = Color(0xFFE3A83F), warningTint = Color(0xFF2E2410), onWarning = Color(0xFF1A1305),
    danger = Color(0xFFFF6B6B), dangerTint = Color(0xFF331416), onDanger = Color(0xFF1A0708),
)

object CortexRadius {
    val sm: Dp = 6.dp
    val md: Dp = 8.dp
    val lg: Dp = 10.dp
    val xl: Dp = 12.dp

    /** The largest the design system allows. Cards are never pill-rounded. */
    val xxl: Dp = 16.dp
}

val LocalCortex = staticCompositionLocalOf { LightCortexColors }

/**
 * Maps the Cortex palette onto every Material 3 [ColorScheme] slot, so
 * unstyled Material components still land inside the palette instead of
 * showing Material's baseline purple. The required mappings are `primary`,
 * `onPrimary`, `secondary` (accent), `onSecondary` (onAccent), `background`
 * (paper), `onBackground` (ink), `surface`, `onSurface` (ink), `surfaceVariant`
 * (surface2), `outline` (line2), `error` (danger) and `onError` (onDanger).
 * Every remaining slot is filled from the nearest palette member rather than
 * left at the Material default.
 */
fun CortexColors.toMaterialScheme(dark: Boolean): ColorScheme {
    // A scrim must stay a dark overlay regardless of theme; paper is the
    // darkest token in dark mode, ink is the darkest token in light mode.
    val scrimColor = if (dark) paper else ink

    return if (dark) {
        darkColorScheme(
            primary = primary,
            onPrimary = onPrimary,
            primaryContainer = primaryTint,
            onPrimaryContainer = primaryStrong,
            inversePrimary = primaryTint,
            secondary = accent,
            onSecondary = onAccent,
            secondaryContainer = accentTint,
            onSecondaryContainer = accentStrong,
            tertiary = success,
            onTertiary = onSuccess,
            tertiaryContainer = successTint,
            onTertiaryContainer = success,
            background = paper,
            onBackground = ink,
            surface = surface,
            onSurface = ink,
            surfaceVariant = surface2,
            onSurfaceVariant = ink2,
            surfaceTint = primary,
            // ink flips polarity between themes (near-black in light, near-white
            // in dark), which is exactly what an inverse surface/on-surface
            // pair needs.
            inverseSurface = ink,
            inverseOnSurface = paper,
            error = danger,
            onError = onDanger,
            errorContainer = dangerTint,
            onErrorContainer = danger,
            outline = line2,
            outlineVariant = line,
            scrim = scrimColor,
            surfaceBright = surface,
            surfaceContainer = surface2,
            surfaceContainerHigh = surface,
            surfaceContainerHighest = surface,
            surfaceContainerLow = surface2,
            surfaceContainerLowest = paper,
            surfaceDim = inset,
            primaryFixed = primary,
            primaryFixedDim = primaryStrong,
            onPrimaryFixed = onPrimary,
            onPrimaryFixedVariant = primaryStrong,
            secondaryFixed = accentTint,
            secondaryFixedDim = accent,
            onSecondaryFixed = accentStrong,
            onSecondaryFixedVariant = accentStrong,
            tertiaryFixed = successTint,
            tertiaryFixedDim = success,
            onTertiaryFixed = onSuccess,
            onTertiaryFixedVariant = success,
        )
    } else {
        lightColorScheme(
            primary = primary,
            onPrimary = onPrimary,
            primaryContainer = primaryTint,
            onPrimaryContainer = primaryStrong,
            inversePrimary = primaryTint,
            secondary = accent,
            onSecondary = onAccent,
            secondaryContainer = accentTint,
            onSecondaryContainer = accentStrong,
            tertiary = success,
            onTertiary = onSuccess,
            tertiaryContainer = successTint,
            onTertiaryContainer = success,
            background = paper,
            onBackground = ink,
            surface = surface,
            onSurface = ink,
            surfaceVariant = surface2,
            onSurfaceVariant = ink2,
            surfaceTint = primary,
            inverseSurface = ink,
            inverseOnSurface = paper,
            error = danger,
            onError = onDanger,
            errorContainer = dangerTint,
            onErrorContainer = danger,
            outline = line2,
            outlineVariant = line,
            scrim = scrimColor,
            surfaceBright = surface,
            surfaceContainer = surface2,
            surfaceContainerHigh = surface,
            surfaceContainerHighest = surface,
            surfaceContainerLow = surface2,
            surfaceContainerLowest = paper,
            surfaceDim = inset,
            primaryFixed = primary,
            primaryFixedDim = primaryStrong,
            onPrimaryFixed = onPrimary,
            onPrimaryFixedVariant = primaryStrong,
            secondaryFixed = accentTint,
            secondaryFixedDim = accent,
            onSecondaryFixed = accentStrong,
            onSecondaryFixedVariant = accentStrong,
            tertiaryFixed = successTint,
            tertiaryFixedDim = success,
            onTertiaryFixed = onSuccess,
            onTertiaryFixedVariant = success,
        )
    }
}

/**
 * Renders [content] under the reader's chosen [CortexThemeChoice]. Warm maps
 * to the light Material scheme -- [WarmCortexColors] restates only the
 * grounds, inks, rules and tints, so it needs the same `on-*` mapping as
 * light, never dark's.
 */
@Composable
fun CortexTheme(choice: CortexThemeChoice, content: @Composable () -> Unit) {
    val colors = when (choice) {
        CortexThemeChoice.LIGHT -> LightCortexColors
        CortexThemeChoice.WARM -> WarmCortexColors
        CortexThemeChoice.DARK -> DarkCortexColors
    }
    val dark = choice == CortexThemeChoice.DARK
    CompositionLocalProvider(LocalCortex provides colors) {
        MaterialTheme(
            colorScheme = colors.toMaterialScheme(dark),
            typography = CortexTypography,
            content = content,
        )
    }
}
