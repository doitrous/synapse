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
 * Task 5 (Plan 03 — Question Bank): on-device media cache, content-addressed
 * by the (already sha-derived) media id the server hands out.
 */
class MediaCacheTest {

    @get:Rule
    val tempFolder = TemporaryFolder()

    private lateinit var server: MockWebServer
    private lateinit var api: RetrofitQBankApi
    private lateinit var cacheDir: File
    private lateinit var cache: MediaCache

    @Before
    fun setup() {
        server = MockWebServer()
        server.start()
        api = RetrofitQBankApi(baseUrl = server.url("/api/").toString(), tokenProvider = { "test-token" })
        cacheDir = File(tempFolder.newFolder("media-cache"), "nested") // doesn't exist yet
        cache = MediaCache(cacheDir, api)
    }

    @After
    fun teardown() = server.shutdown()

    @Test
    fun ensureDownloadsOnceThenServesFromDiskWithoutASecondRequest() = runTest {
        val bytes = "hello media bytes"
        server.enqueue(MockResponse().setResponseCode(200).setBody(bytes))

        val first = cache.ensure("media-1")
        assertEquals(bytes, first.readText())
        assertEquals(1, server.requestCount)

        val request = server.takeRequest()
        assertTrue(request.path!!.contains("media/media-1"))
        assertEquals("Bearer test-token", request.getHeader("Authorization"))

        // Second call must not hit the network at all.
        val second = cache.ensure("media-1")
        assertEquals(first.absolutePath, second.absolutePath)
        assertEquals(bytes, second.readText())
        assertEquals(1, server.requestCount) // still just the one request
    }

    @Test
    fun isCachedReflectsDiskStateBeforeAndAfterDownload() = runTest {
        assertFalse(cache.isCached("media-2"))

        server.enqueue(MockResponse().setResponseCode(200).setBody("data-2"))
        cache.ensure("media-2")

        assertTrue(cache.isCached("media-2"))
    }

    @Test
    fun cachedFileIsContentAddressedByIdInsideTheCacheDir() {
        assertEquals(File(cacheDir, "abc123"), cache.cachedFile("abc123"))
    }

    @Test
    fun noLeftoverTempFileAfterASuccessfulDownload() = runTest {
        server.enqueue(MockResponse().setResponseCode(200).setBody("payload"))
        cache.ensure("media-3")

        val remaining = cacheDir.listFiles()?.map { it.name }.orEmpty()
        assertEquals(listOf("media-3"), remaining)
    }
}
