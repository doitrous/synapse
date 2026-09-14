package com.synapse.app.core.media

import com.synapse.app.core.api.RetrofitQBankApi
import kotlinx.coroutines.test.runTest
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.io.File

/**
 * [ResourceFileCache] mirrors `MediaCacheTest`'s coverage, against the
 * `medical-resources/{id}` endpoint instead of `media/{id}`.
 */
class ResourceFileCacheTest {

    @get:Rule
    val tempFolder = TemporaryFolder()

    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitQBankApi
    private lateinit var cacheDir: File
    private lateinit var cache: ResourceFileCache

    @Before
    fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitQBankApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
        cacheDir = File(tempFolder.newFolder("resource-file-cache"), "nested") // doesn't exist yet
        cache = ResourceFileCache(cacheDir, api)
    }

    @After
    fun teardown() = server.shutdown()

    @Test
    fun ensureDownloadsOnceThenServesFromDiskWithoutASecondRequest() = runTest {
        val bytes = "%PDF-1.4 fake bytes"
        server.enqueue(MockResponse().setResponseCode(200).setBody(bytes))

        val first = cache.ensure("r-kc")
        assertEquals(bytes, first.readText())
        assertEquals(1, server.requestCount)

        val request = server.takeRequest()
        assertTrue(request.path!!.contains("medical-resources/r-kc"))
        assertEquals("Bearer test-token", request.getHeader("Authorization"))

        val second = cache.ensure("r-kc")
        assertEquals(first.absolutePath, second.absolutePath)
        assertEquals(1, server.requestCount) // still just the one request
    }

    @Test
    fun isCachedReflectsDiskStateBeforeAndAfterDownload() = runTest {
        assertFalse(cache.isCached("r-2"))

        server.enqueue(MockResponse().setResponseCode(200).setBody("data-2"))
        cache.ensure("r-2")

        assertTrue(cache.isCached("r-2"))
    }

    @Test
    fun cachedFileIsContentAddressedByIdInsideTheCacheDir() {
        assertEquals(File(cacheDir, "abc123"), cache.cachedFile("abc123"))
    }

    @Test
    fun noLeftoverTempFileAfterASuccessfulDownload() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("payload"))
        cache.ensure("r-3")

        val remaining = cacheDir.listFiles()?.map { it.name }.orEmpty()
        assertEquals(listOf("r-3"), remaining)
    }

    @Test
    fun removeDropsTheOnDiskCopy() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("payload"))
        cache.ensure("r-4")
        assertTrue(cache.isCached("r-4"))

        cache.remove("r-4")

        assertFalse(cache.isCached("r-4"))
    }
}
