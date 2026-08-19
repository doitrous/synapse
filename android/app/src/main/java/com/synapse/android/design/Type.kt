package com.synapse.android.design

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.synapse.android.R

/**
 * The two faces from `src/index.css`: `--font-sans` (Geist Variable) for
 * chrome/UI, `--font-serif` (Source Serif 4 Variable) for reading surfaces.
 * Both files carry their whole weight axis, so weight is selected through
 * [FontWeight] on each text style rather than by adding a `Font` entry per
 * weight.
 */
val CortexSans = FontFamily(Font(R.font.geist_variable))
val CortexSerif = FontFamily(Font(R.font.source_serif_4_variable))

val CortexTypography = Typography(
    // The reading style: long-form body copy takes the serif, per --font-serif.
    bodyLarge = TextStyle(
        fontFamily = CortexSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 17.sp,
        lineHeight = 26.sp,
    ),
    bodyMedium = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    titleLarge = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.SemiBold,
        fontSize = 22.sp,
        lineHeight = 28.sp,
    ),
    titleMedium = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Medium,
        fontSize = 16.sp,
        lineHeight = 24.sp,
    ),
    labelLarge = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    headlineSmall = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.SemiBold,
        fontSize = 24.sp,
        lineHeight = 30.sp,
    ),
)
