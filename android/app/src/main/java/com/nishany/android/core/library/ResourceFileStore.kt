package com.nishany.android.core.library

import android.content.Context
import com.nishany.android.core.api.ApiError
import com.nishany.android.core.api.NishanyApi
import java.io.File
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * Downloading and keeping the source PDFs behind library resources.
 *
 * A port of iOS `Core/Library/ResourceFileStore.swift`. These are textbooks
 * -- tens of megabytes each -- so they are streamed to disk via
 * [NishanyApi.downloadResourceFile] rather than held in memory, and kept once
 * fetched: a student who downloads an anatomy PDF on wifi should still have
 * it on the ward.
 *
 * Held once in [com.nishany.android.AppGraph], not per-screen: an in-flight
 * download must survive the student navigating away from the reader and back
 * (unlike a ViewModel, which the nav graph tears down on that same trip).
 */
class ResourceFileStore(
    private val api: NishanyApi,
    private val filesDir: File,
) {
    sealed interface State {
        data object NotDownloaded : State
        data class Downloading(val fraction: Float?) : State
        data class Ready(val file: File) : State
        data class Failed(val message: String) : State
    }

    // ponytail: SupervisorJob rather than per-download cancellation
    // plumbing through a UI layer -- [cancel] below tears down and restarts
    // this scope's children directly, which is all a "cancel this download"
    // button needs.
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val jobs = mutableMapOf<String, Job>()
    private val _states = MutableStateFlow<Map<String, State>>(emptyMap())
    val states: StateFlow<Map<String, State>> = _states.asStateFlow()

    /** Where a resource lives once downloaded. Not `context.cacheDir`: the system may evict that under disk pressure, and a textbook disappearing the night before an exam is exactly what this store exists to prevent. */
    private fun directory(): File = File(filesDir, "resources").apply { mkdirs() }

    /** The id comes from authored content, so it is not trusted as a path component -- anything but the expected shape is refused rather than allowed to escape the directory. */
    private fun fileFor(id: String): File? {
        val safe = id.filter { it.isLetterOrDigit() || it == '_' || it == '-' }
        if (safe != id || safe.isEmpty()) return null
        return File(directory(), "$safe.pdf")
    }

    fun state(id: String): State {
        _states.value[id]?.let { return it }
        val existing = fileFor(id)?.takeIf { it.exists() }
        if (existing != null) {
            _states.update { it + (id to State.Ready(existing)) }
            return State.Ready(existing)
        }
        return State.NotDownloaded
    }

    fun download(id: String) {
        if (jobs[id] != null) return
        if (state(id) is State.Ready) return

        val destination = fileFor(id)
        if (destination == null) {
            _states.update { it + (id to State.Failed("That resource has an unusable identifier.")) }
            return
        }

        _states.update { it + (id to State.Downloading(fraction = null)) }
        jobs[id] = scope.launch {
            try {
                api.downloadResourceFile(id, destination) { fraction ->
                    _states.update { it + (id to State.Downloading(fraction)) }
                }
                _states.update { it + (id to State.Ready(destination)) }
            } catch (e: ApiError.NotFound) {
                _states.update { it + (id to State.Failed("This resource has not been uploaded yet.")) }
            } catch (e: Exception) {
                _states.update { it + (id to State.Failed("Could not download it. Check your connection and try again.")) }
            } finally {
                jobs.remove(id)
            }
        }
    }

    fun cancel(id: String) {
        jobs.remove(id)?.cancel()
        _states.update { it + (id to State.NotDownloaded) }
    }
}
