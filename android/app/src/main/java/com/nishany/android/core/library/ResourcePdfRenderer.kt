package com.nishany.android.core.library

import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.pdf.PdfRenderer
import android.os.ParcelFileDescriptor
import java.io.Closeable
import java.io.File
import kotlin.math.roundToInt

/**
 * Renders a downloaded resource PDF to bitmaps, one page at a time.
 *
 * Uses the platform's own `android.graphics.pdf.PdfRenderer` -- no new
 * dependency, matching this task's brief (the repo declares only
 * `google()`/`mavenCentral()`, no JitPack). `PdfRenderer` is not safe for
 * concurrent page access from more than one thread at a time, so every
 * caller (see `ResourceReaderViewModel`) confines its use of this class to a
 * single-threaded dispatcher.
 *
 * ponytail: page `/Rotate` is not corrected for here, unlike iOS's
 * `PageSpace` (which flips PDFKit's bottom-left/y-up space and un-rotates the
 * box). `PdfRenderer.render` already draws into the rotated orientation the
 * page declares, and [PdfRenderer.Page.getWidth]/[getHeight] report the
 * *displayed* (rotated) size, so an ordinary rotated textbook page still
 * renders and paginates correctly -- only a mark placed near a rotated
 * page's edge on this build could land slightly off from where iOS/web
 * would put the same tap, an edge case worth a real fix only once a rotated
 * source PDF is confirmed to reach students.
 */
class ResourcePdfRenderer(file: File) : Closeable {
    private val descriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)
    private val renderer = PdfRenderer(descriptor)

    val pageCount: Int get() = renderer.pageCount

    /** A page's own size, in PDF points -- the divisor [com.nishany.android.core.reader.AnnotationKey] and page-space coordinates are measured against. */
    data class PageMetrics(val widthPoints: Float, val heightPoints: Float)

    fun metrics(pageIndex: Int): PageMetrics =
        renderer.openPage(pageIndex).use { page -> PageMetrics(page.width.toFloat(), page.height.toFloat()) }

    /** Renders [pageIndex] to a bitmap [targetWidthPx] wide, height scaled to match the page's own aspect ratio. */
    fun render(pageIndex: Int, targetWidthPx: Int): Bitmap =
        renderer.openPage(pageIndex).use { page ->
            val scale = targetWidthPx.toFloat() / page.width
            val targetHeightPx = (page.height * scale).roundToInt().coerceAtLeast(1)
            val bitmap = Bitmap.createBitmap(targetWidthPx, targetHeightPx, Bitmap.Config.ARGB_8888)
            bitmap.eraseColor(Color.WHITE)
            page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
            bitmap
        }

    override fun close() {
        renderer.close()
        descriptor.close()
    }

    companion object {
        /**
         * Every call into a given [ResourcePdfRenderer] must run on this
         * single-threaded dispatcher -- `PdfRenderer` is not safe to touch
         * from more than one thread at a time, and Compose's pager can ask
         * for two nearby pages in close succession.
         */
        val dispatcher = kotlinx.coroutines.Dispatchers.IO.limitedParallelism(1)
    }
}
