package com.synapse.android.design

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import com.synapse.android.R

/**
 * The two faces from `src/index.css`: `--font-sans` (Geist Variable) for body
 * copy and chrome, `--font-serif` (Source Serif 4 Variable) for headings.
 * Both files carry their whole weight axis, so weight is selected through
 * [FontWeight] on each text style rather than by adding a `Font` entry per
 * weight.
 */
val CortexSans = FontFamily(Font(R.font.geist_variable))
val CortexSerif = FontFamily(Font(R.font.source_serif_4_variable))

/**
 * `h1, h2, h3, h4, h5` in `src/index.css:320-326`: the serif, at weight 560,
 * with -0.011em tracking and a 1.14 line-height multiple. 560 is not one of
 * Material's named [FontWeight] constants, but it is a legal weight and the
 * variable font renders it exactly, so it is spelled out numerically rather
 * than rounded to [FontWeight.SemiBold].
 */
private val HeadingWeight = FontWeight(560)
private val HeadingLetterSpacing = (-0.011).em
private const val HeadingLineHeightMultiple = 1.14

private fun headingStyle(fontSizeSp: Int) = TextStyle(
    fontFamily = CortexSerif,
    fontWeight = HeadingWeight,
    fontSize = fontSizeSp.sp,
    lineHeight = (fontSizeSp * HeadingLineHeightMultiple).sp,
    letterSpacing = HeadingLetterSpacing,
)

val CortexTypography = Typography(
    // body in src/index.css:296-298: the sans, at 0.9375rem (15sp at a 16sp
    // root) with a 1.55 line-height multiple (15 * 1.55 = 23.25, rounded to
    // the web's rendered 23sp).
    bodyLarge = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Normal,
        fontSize = 15.sp,
        lineHeight = 23.sp,
    ),
    bodyMedium = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    titleLarge = headingStyle(fontSizeSp = 22),
    titleMedium = headingStyle(fontSizeSp = 16),
    labelLarge = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    headlineSmall = headingStyle(fontSizeSp = 24),
)
