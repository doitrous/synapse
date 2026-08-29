package com.synapse.app.core.media

import com.synapse.app.core.api.QBankApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/**
 * On-device cache of downloaded question-bank media (images, audio, etc.),
 * content-addressed by the media [id] the server hands out — [id] is already
 * a sha-derived identity, so the file's own name inside [cacheDir] doubles as
 * its cache key, with no separate index to keep in sync.
 *
 * [ensure] is the only path that writes: a cache hit returns the existing
 * file with no network call at all, and a miss downloads via [api] (Bearer
 * auth is [api]'s concern, not this class's). Bytes land in a sibling temp
 * file first and are only promoted to the real path once fully written, so a
 * cancelled or crashed download never leaves a corrupt file at `cacheDir/<id>`
 * masquerading as a complete one.
 */
class MediaCache(
    private val cacheDir: File,
    private val api: QBankApi,
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
            val body = api.getMedia(id)
            withContext(Dispatchers.IO) {
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
}
