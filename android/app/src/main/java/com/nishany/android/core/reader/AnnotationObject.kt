package com.nishany.android.core.reader

import kotlinx.serialization.Serializable

/**
 * What a student writes on a resource, and where it lives on the page.
 *
 * A port of `src/lib/reader/annotations.ts` (mirrored by iOS
 * `Core/Reader/AnnotationObject.swift`).
 *
 * **Coordinates.** Everything is stored in *page space*: both axes divided by
 * the page's width in points. `x` runs 0..1; `y` runs 0..(height/width),
 * about 1.414 on A4. Dividing both by the same number is what keeps a circle
 * round and lets one divisor convert stroke widths too -- so a mark survives
 * zooming, resizing the window, a different screen, and a device with a
 * different pixel ratio, without any of them being recorded.
 *
 * **[kind] is a plain string, not a closed enum.** TypeScript's `ObjectKind`
 * union is a compile-time-only check -- nothing on the web validates it at
 * runtime -- so a kind this build has never heard of already passes straight
 * through JS untouched. A Kotlin enum would instead throw the moment it saw
 * one, corrupting the whole shard it lives in. This build only *renders*
 * `ink`/`highlighter`; everything else (`tape`, `note`, `textbox`, `marker`)
 * is decoded and re-encoded through the same flat set of optional fields
 * below, so a mark made on web or iOS is carried, unrendered, rather than
 * dropped -- see `AnnotationObjectTest` for the round-trip proof.
 *
 * A single flat class rather than a sealed hierarchy, for the same reason:
 * the stored JSON is one object whose fields depend on `kind`, and every
 * field any *known* kind uses is modelled here so a round trip through
 * [com.nishany.android.core.CortexJson] never has to drop one. The one edge
 * this does not cover -- a brand new kind introduced with a field name none
 * of the six existing kinds ever used -- would still be dropped by
 * [com.nishany.android.core.CortexJson]'s `ignoreUnknownKeys`, exactly as it
 * would for any other synced document in this app; that is an accepted,
 * documented ceiling (see `CortexJson`'s own doc), not one this model tries
 * to solve on its own.
 */
@Serializable
data class AnnotationObject(
    /** Short and random: a UUID is 36 bytes, and a book holds thousands. */
    val id: String,
    val kind: String,
    /** 1-based, matching everything else the reader says about pages. */
    val page: Int,
    /** Fractional, so inserting between two marks never renumbers a page. */
    val z: Double,
    /** `[x0, y0, x1, y1]` in page space. */
    val bbox: List<Double>,
    /** Updated-at, ms since epoch. Must be strictly monotonic. */
    val t: Double,

    // Ink and highlighter
    /** `ball | fountain | brush | pencil | highlighter`. */
    val tool: String? = null,
    /** Literal sRGB: a red pen is red in every theme. */
    val color: String? = null,
    /** Base stroke width, in page-space units. */
    val w: Double? = null,
    /** 0..1; the highlighter is translucent, ink is not. */
    val a: Double? = null,
    /** Quantised, delta-encoded points. See [StrokeCodec]. */
    val p: List<Int>? = null,

    // Tape, note, textbox (not authored or rendered by this build -- see class doc)
    /** `[x0, y0, x1, y1]` in page space. */
    val r: List<Double>? = null,
    val tone: String? = null,
    val text: String? = null,
    /** Page-space units, like a stroke width -- so it scales with the page. */
    val size: Double? = null,

    // Marker (not authored or rendered by this build -- see class doc)
    val title: String? = null,
) {
    val isInk: Boolean get() = kind == KIND_INK || kind == KIND_HIGHLIGHTER

    companion object {
        const val KIND_INK = "ink"
        const val KIND_HIGHLIGHTER = "highlighter"

        private val ID_ALPHABET = ('0'..'9') + ('a'..'z')

        /** Ten lowercase alphanumerics, matching the web's `newObjectId`. */
        fun newId(): String = (1..10).map { ID_ALPHABET.random() }.joinToString("")

        /** A timestamp always greater than [previous], so two marks in the same millisecond still order. */
        fun nextStamp(previous: Double?): Double {
            val now = System.currentTimeMillis().toDouble()
            return if (previous == null) now else maxOf(now, previous + 1)
        }

        /** A fresh ink or highlighter mark, points simplified and encoded exactly as [StrokeCodec] specifies. */
        fun ink(
            kind: String,
            tool: String,
            color: String,
            width: Double,
            alpha: Double?,
            points: List<InkPoint>,
            page: Int,
            z: Double,
            stamp: Double,
        ): AnnotationObject {
            val simplified = StrokeCodec.simplify(points)
            return AnnotationObject(
                id = newId(),
                kind = kind,
                page = page,
                z = z,
                bbox = StrokeCodec.bounds(simplified, padding = width / 2),
                t = stamp,
                tool = tool,
                color = color,
                w = width,
                a = alpha,
                p = StrokeCodec.encode(simplified),
            )
        }
    }
}
