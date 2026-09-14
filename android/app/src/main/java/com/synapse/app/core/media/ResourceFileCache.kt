package com.synapse.app.core.media

import com.synapse.app.core.api.QBankApi
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/**
 * On-device cache of downloaded resource-library documents (books,
 * guidelines, decks, articles), content-addressed by the resource's own id —
 * the same shape as [MediaCache], kept as a separate small class rather than
 * a shared abstraction because it downloads from a different endpoint
 * (`GET /api/medical-resources/:id`, via [QBankApi.getMedicalResource]) with
 * different failure semantics (the server may 302 to an external host when
 * the resource has no stored bytes) — see that method's doc comment for why
 * [MediaCache] itself was left untouched rather than generalized.
 *
 * [ensure] is the only path that writes: a cache hit returns the existing
 * file with no network call at all, and a miss downloads via [api]. Bytes
 * land in a sibling temp file first and are only promoted to the real path
 * once fully written, so a cancelled or crashed download never leaves a
 * corrupt file at `cacheDir/<id>` masquerading as a complete one.
 */
class ResourceFileCache(
    private val cacheDir: File,
    private val api: QBankApi,
    /**
     * Where the byte copy runs. Overridable (default [Dispatchers.IO]) so a
     * ViewModel test can share its `StandardTestDispatcher`'s scheduler here
     * — otherwise the copy runs on a real thread the test's virtual
     * scheduler knows nothing about, and `advanceUntilIdle()` returns before
     * it finishes.
     */
    private val ioDispatcher: CoroutineDispatcher = Dispatchers.IO,
) {
    init {
        cacheDir.mkdirs()
    }

    /** The on-device path [id] would live at, whether or not it exists yet. */
    fun cachedFile(id: String): File = File(cacheDir, id)

    fun isCached(id: String): Boolean = cachedFile(id).exists()

    /**
     * Returns the cached file for [id], downloading it first if it isn't
     * already on disk. [kotlin.coroutines.cancellation.CancellationException]
     * propagates untouched; any other failure from [api] propagates too (the
     * temp file is cleaned up either way, and nothing is ever renamed on
     * failure), leaving the caller to decide how to handle it.
     */
    suspend fun ensure(id: String): File {
        val dest = cachedFile(id)
        if (dest.exists()) return dest

        cacheDir.mkdirs()
        val tempFile = File(cacheDir, "$id.part-${System.nanoTime()}")
        try {
            val body = api.getMedicalResource(id)
            withContext(ioDispatcher) {
                body.use { responseBody ->
                    tempFile.outputStream().use { out -> responseBody.byteStream().copyTo(out) }
                }
            }
            if (!dest.exists() && !tempFile.renameTo(dest)) {
                // Cross-filesystem or a losing race with a concurrent ensure(id);
                // fall back to a copy so a correctly-downloaded file is never lost.
                tempFile.copyTo(dest, overwrite = true)
            }
        } finally {
            tempFile.delete()
        }
        return dest
    }

    /** Drop the on-device copy of [id], if any — e.g. to reclaim space, or force a re-download. */
    fun remove(id: String) {
        cachedFile(id).delete()
    }
}
