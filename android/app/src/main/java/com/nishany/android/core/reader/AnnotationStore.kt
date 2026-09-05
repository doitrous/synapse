package com.nishany.android.core.reader

import com.nishany.android.core.CortexJson
import com.nishany.android.core.api.ApiError
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.decodeFromJsonElement

/**
 * A document's marks, loaded a few shards at a time.
 *
 * A port of iOS `Core/Reader/AnnotationStore.swift`. Per-document keys are
 * *dynamic* -- they are fetched here with [NishanyApi.readState] on open, not
 * pulled by [SyncEngine.refresh], and written back with [SyncEngine.write]'s
 * outbox -- exactly like [com.nishany.android.feature.reader.ArticleReaderViewModel]'s
 * `nishany.library.marks.v1`, except that document is one whole key while a
 * heavily annotated book is sharded by page range (see [AnnotationKey]) so a
 * stroke only ever rewrites sixteen pages' worth.
 *
 * v1 only ever *adds* ink/highlighter marks -- editing, moving and erasing an
 * existing mark, and the manifest of markers/notes that lets an outline list
 * them before their page has loaded, are all out of scope for this pass (see
 * this task's report). A shard containing marks of another kind is still
 * loaded, held and saved back unchanged -- see [AnnotationObject]'s class doc.
 */
class AnnotationStore(
    private val api: NishanyApi,
    private val sync: SyncEngine,
    kind: AnnotationKey.Kind,
    documentId: String,
) {
    /** Over this, a shard is refused rather than silently dropped by the server's request limit. */
    private val maxShardBytes = 1_500_000

    private val listSerializer = ListSerializer(AnnotationObject.serializer())
    val scope: String = AnnotationKey.scope(kind, documentId)

    /** Objects by page, for whatever shards are currently loaded. */
    private val objectsByPage = LinkedHashMap<Int, MutableList<AnnotationObject>>()
    private val loaded = mutableSetOf<Int>()

    // ponytail: a per-call lock rather than per-shard -- this store serves
    // one open reader screen at a time, so contention is a non-issue; a
    // finer lock would only matter if two shards could be written
    // concurrently, which the reader's own UI never asks for.
    private val mutex = Mutex()

    /** Set when a shard could not be read or an over-large write was refused, so the reader can say so rather than silently losing marks. */
    var problem: String? = null
        private set

    /** The marks on one page, in paint order. */
    fun objects(onPage: Int): List<AnnotationObject> =
        (objectsByPage[onPage] ?: emptyList()).sortedBy { it.z }

    /** The next paint order on a page -- a new mark always goes on top. */
    fun nextZ(onPage: Int): Double = (objectsByPage[onPage]?.maxOfOrNull { it.z } ?: 0.0) + 1

    /** The most recent stamp anywhere, so a new one can be made strictly later. */
    val lastStamp: Double?
        get() = objectsByPage.values.flatten().maxOfOrNull { it.t }

    /**
     * Brings in the shards around [page] that are not already loaded.
     * Cheap to call on every page change -- an already-loaded shard is
     * skipped.
     */
    suspend fun load(around: Int, window: Int = 1) = mutex.withLock {
        val centre = AnnotationKey.shardIndex(around)
        for (index in (centre - window)..(centre + window)) {
            if (index < 0 || loaded.contains(index)) continue
            loadShard(index)
        }
    }

    private suspend fun loadShard(index: Int) {
        try {
            val remote = api.readState(AnnotationKey.shardKey(scope, index))
            val value = remote.value
            val objects = if (value == null || value is JsonNull) {
                emptyList()
            } else {
                CortexJson.decodeFromJsonElement(listSerializer, value)
            }
            merge(objects)
            loaded += index
            problem = null
        } catch (e: ApiError.NotFound) {
            // Never written. An unannotated page range is the ordinary case.
            loaded += index
        } catch (e: Exception) {
            // Deliberately not marked loaded: a range whose marks failed to
            // arrive must be retried, not silently treated as unannotated --
            // and never saved over, which is what [save] checks [loaded] for.
            problem = "Some of your marks could not be loaded."
        }
    }

    private fun merge(objects: List<AnnotationObject>) {
        for (obj in objects) {
            val page = objectsByPage.getOrPut(obj.page) { mutableListOf() }
            val existingIndex = page.indexOfFirst { it.id == obj.id }
            if (existingIndex >= 0) page[existingIndex] = obj else page.add(obj)
        }
    }

    /**
     * Adds a mark and saves the shard it belongs to. The shard is chosen
     * from the mark's own page, not necessarily the page on screen -- a
     * stroke can finish after the reader has already scrolled on.
     */
    suspend fun add(objectToAdd: AnnotationObject) = mutex.withLock {
        val shardIndex = AnnotationKey.shardIndex(objectToAdd.page)
        if (!loaded.contains(shardIndex)) loadShard(shardIndex)

        objectsByPage.getOrPut(objectToAdd.page) { mutableListOf() }.add(objectToAdd)
        save(shardIndex)
    }

    /**
     * Writes one shard. Every object whose page falls in the shard's range
     * goes in, not just the page that changed -- the shard is the unit the
     * server stores, so writing a partial one would delete the other
     * fifteen pages' marks.
     */
    private suspend fun save(shardIndex: Int) {
        val range = AnnotationKey.pageRange(shardIndex)
        val objects = range.flatMap { objectsByPage[it] ?: emptyList() }

        val json = CortexJson.encodeToString(listSerializer, objects)
        // The server drops an over-large write without failing loudly, so it
        // is refused here where the student can be told.
        if (json.length > maxShardBytes) {
            problem = "These pages hold as many marks as they can. Erase some before adding more."
            return
        }

        problem = null
        sync.write(AnnotationKey.shardKey(scope, shardIndex), json)
    }
}
