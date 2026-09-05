package com.nishany.android.design

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import com.nishany.android.R

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

private fun headingStyle(
    fontSizeSp: Int,
    fontWeight: FontWeight = HeadingWeight,
    lineHeightMultiple: Double = HeadingLineHeightMultiple,
    letterSpacing: TextUnit = HeadingLetterSpacing,
) = TextStyle(
    fontFamily = CortexSerif,
    fontWeight = fontWeight,
    fontSize = fontSizeSp.sp,
    lineHeight = (fontSizeSp * lineHeightMultiple).sp,
    letterSpacing = letterSpacing,
)

/**
 * The big headings are the one place the web does not simply inherit the
 * `h1..h5` rule: the hero and page titles carry their own utility classes,
 * which override it with `font-semibold` and tighter tracking the larger the
 * type gets. Ported here rather than left on the base rule, because a 42sp
 * heading at the body rule's tracking sits visibly loose.
 *
 * Every size below is the web's *phone* size. Each of these headings also has
 * an `sm:` step -- 58, 50, 36, 32 -- that a phone viewport never reaches, so
 * porting those would make Android's headings a size larger than the site's
 * on the same screen.
 */
private val DisplayWeight = FontWeight.SemiBold
private val DisplayLetterSpacing = (-0.025).em

/**
 * The sans slots. Small text on the site is the same face at the same sizes;
 * what changes between them is weight, and -- for the eyebrow labels -- the
 * open tracking that makes uppercase legible at 11px.
 */
private fun sansStyle(
    fontSizeSp: Int,
    lineHeightSp: Int,
    fontWeight: FontWeight = FontWeight.Normal,
    letterSpacing: TextUnit = TextUnit.Unspecified,
) = TextStyle(
    fontFamily = CortexSans,
    fontWeight = fontWeight,
    fontSize = fontSizeSp.sp,
    lineHeight = lineHeightSp.sp,
    letterSpacing = letterSpacing,
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
    // text-[12px] in the same places body copy appears, e.g. the runner's
    // supporting lines in src/components/practical/PracticalRunner.tsx:326 --
    // 12 * 1.55 = 18.6, rounded to the web's rendered 19sp.
    bodySmall = sansStyle(fontSizeSp = 12, lineHeightSp = 19),

    titleLarge = headingStyle(fontSizeSp = 22),
    titleMedium = headingStyle(fontSizeSp = 16),
    // text-[14px] font-medium: the label on a row that is a heading only in
    // the sense that it names what is under it, e.g.
    // src/pages/student/Practical.tsx. The sans, not the serif -- the site
    // does not put the serif below 16px.
    titleSmall = sansStyle(fontSizeSp = 14, lineHeightSp = 20, fontWeight = FontWeight.Medium),

    labelLarge = TextStyle(
        fontFamily = CortexSans,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    // text-[12px] font-semibold, e.g.
    // src/components/practical/PracticalRunner.tsx:657 -- chips, counts and
    // the smaller buttons.
    labelMedium = sansStyle(fontSizeSp = 12, lineHeightSp = 16, fontWeight = FontWeight.SemiBold),
    // The eyebrow: text-[11px] font-semibold uppercase tracking-[0.07em],
    // src/components/practical/PracticalRunner.tsx:286 and a dozen more.
    // The tracking is the point of it; Compose has no `uppercase` in a
    // TextStyle, so callers that want the web's look uppercase the string.
    labelSmall = sansStyle(
        fontSizeSp = 11,
        lineHeightSp = 16,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = 0.07.em,
    ),

    // src/pages/landing/LandingShell.tsx:59 -- the hero, text-[42px]
    // font-semibold leading-[1.06] tracking-[-0.025em].
    displayLarge = headingStyle(
        fontSizeSp = 42,
        fontWeight = DisplayWeight,
        lineHeightMultiple = 1.06,
        letterSpacing = DisplayLetterSpacing,
    ),
    // src/pages/landing/PricingPage.tsx:97 -- text-[38px], leading-[1.08].
    displayMedium = headingStyle(
        fontSizeSp = 38,
        fontWeight = DisplayWeight,
        lineHeightMultiple = 1.08,
        letterSpacing = DisplayLetterSpacing,
    ),
    // src/components/library/MedicalLibraryAtlas.tsx:77 -- text-[34px],
    // leading-[1.08]. The largest heading inside the app itself, as opposed
    // to the marketing pages above.
    displaySmall = headingStyle(
        fontSizeSp = 34,
        fontWeight = DisplayWeight,
        lineHeightMultiple = 1.08,
        letterSpacing = DisplayLetterSpacing,
    ),
    // src/pages/landing/PricingPage.tsx:161 -- text-[28px] font-semibold
    // leading-[1.1] tracking-[-0.02em].
    headlineLarge = headingStyle(
        fontSizeSp = 28,
        fontWeight = DisplayWeight,
        lineHeightMultiple = 1.1,
        letterSpacing = (-0.02).em,
    ),
    // The section heading the site uses over and over -- text-[27px]
    // font-semibold tracking-[-0.015em], e.g.
    // src/pages/landing/LandingShell.tsx:104. It keeps the base 1.14
    // line-height, which those classes do not override.
    headlineMedium = headingStyle(
        fontSizeSp = 27,
        fontWeight = DisplayWeight,
        letterSpacing = (-0.015).em,
    ),
    headlineSmall = headingStyle(fontSizeSp = 24),
)
