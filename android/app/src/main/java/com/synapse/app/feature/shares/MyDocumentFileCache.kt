package com.synapse.app.feature.shares

import com.synapse.app.core.api.SharesApi
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/**
 * On-device cache of downloaded **My Documents** files, content-addressed by
 * the document's own id. A near-duplicate of
 * [com.synapse.app.core.media.ResourceFileCache] kept as its own small class
 * rather than a shared abstraction — same reasoning that class's doc comment
 * gives for not generalizing over [SharesApi.getMyDocumentFile] vs.
 * `QBankApi.getMedicalResource`: a different endpoint, a different feature,
 * self-contained on purpose (see `di/SharesApiModule.kt`'s doc comment).
 *
 * The app sandbox has nowhere durable outside app storage to hand a document
 * back to the student (no public "Downloads" write without extra permission
 * plumbing this task didn't scope) — so, matching the brief, a document is
 * cached here and opened/previewed from this cache, never written to shared
 * storage.
 */
class MyDocumentFileCache(
    private val cacheDir: File,
    private val api: SharesApi,
    private val ioDispatcher: CoroutineDispatcher = Dispatchers.IO,
) {
    init {
        cacheDir.mkdirs()
    }

    fun cachedFile(id: String): File = File(cacheDir, id)

    fun isCached(id: String): Boolean = cachedFile(id).exists()

    /**
     * Returns the cached file for [id], downloading it first if needed.
     * [kotlin.coroutines.cancellation.CancellationException] and any other
     * failure from [api] propagate untouched — the temp file is always
     * cleaned up, and nothing is ever renamed on failure.
     */
    suspend fun ensure(id: String): File {
        val dest = cachedFile(id)
        if (dest.exists()) return dest

        cacheDir.mkdirs()
        val tempFile = File(cacheDir, "$id.part-${System.nanoTime()}")
        try {
            val body = api.getMyDocumentFile(id)
            withContext(ioDispatcher) {
                body.use { responseBody ->
                    tempFile.outputStream().use { out -> responseBody.byteStream().copyTo(out) }
                }
            }
            if (!dest.exists() && !tempFile.renameTo(dest)) {
                tempFile.copyTo(dest, overwrite = true)
            }
        } finally {
            tempFile.delete()
        }
        return dest
    }

    /** Drop the on-device copy of [id], if any. */
    fun remove(id: String) {
        cachedFile(id).delete()
    }
}
