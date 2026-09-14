package com.synapse.app.core.api

import com.synapse.app.core.config.AppConfig
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.ResponseBody
import retrofit2.HttpException
import retrofit2.Retrofit
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query
import java.io.IOException

/**
 * Wire shapes for **My Documents** (`server/src/index.js` ~484-596, the student's
 * own uploaded files) and **Shares** (~618-678, notes/boards published behind a
 * link — see `server/src/shares.js`'s `shape()` for the exact field set a share
 * response carries). Mirrors [QBankApi]/[LeaderboardApi]/[MaristanaApi]: a
 * self-contained Retrofit interface + thin implementation, its own Hilt wiring
 * in `di/SharesApiModule.kt` rather than folded into `AppModule`.
 */

// --- My Documents ------------------------------------------------------------

@Serializable
data class MyDocument(
    val id: String,
    val title: String,
    /** `pdf` for anything the in-app reader opens, `file` for everything else — see web's `MyDocument.mediaType` doc. */
    val mediaType: String? = null,
    val fileName: String? = null,
    val mimeType: String? = null,
    val sizeBytes: Long = 0,
    val pageCount: Int? = null,
    val sourceKind: String? = null,
    val sourceId: String? = null,
    val createdAt: String = "",
)

@Serializable
data class MyDocumentsResponse(
    val items: List<MyDocument> = emptyList(),
    val usedBytes: Long = 0,
    val quotaBytes: Long = 0,
    val plan: String? = null,
)

@Serializable
data class CreateMyDocumentBody(
    val title: String,
    val fileName: String,
    val mimeType: String? = null,
    val sourceKind: String = "resource",
    val sourceId: String? = null,
)

@Serializable
data class CreateMyDocumentResponse(
    val id: String,
    val uploadId: String,
    val chunkMaxBytes: Long = 0,
    val mediaType: String? = null,
)

@Serializable
data class ChunkUploadResponse(val ok: Boolean = false, val index: Int = 0, val sizeBytes: Long = 0)

@Serializable
data class CompleteUploadBody(val totalChunks: Int, val sizeBytes: Long, val pageCount: Int? = null)

/** `assembleChunks`'s result, spread onto `{ ok: true, id }` by the route. */
@Serializable
data class CompleteUploadResponse(
    val ok: Boolean = false,
    val id: String? = null,
    val sizeBytes: Long = 0,
    val sha256: String? = null,
    val chunks: Int = 0,
)

@Serializable
data class RenameDocumentBody(val title: String)

// --- Shares --------------------------------------------------------------------

/** `kind`/`topic`/`subtopic` are the only fields `readTopics` (server) keeps. */
@Serializable
data class ShareTopicMapping(val subjectId: String? = null, val topic: String? = null, val subtopic: String? = null)

/** A share as listed by `GET /api/shares` (discoverable) or `GET /api/shares/mine` — payload left out server-side. */
@Serializable
data class ShareSummary(
    val id: String,
    /** `"note"` or `"whiteboard"` — kept as a string, not an enum, so a kind neither client knows about yet still decodes (mirrors `WhiteboardDocument.permission`'s choice). */
    val kind: String,
    val title: String,
    /** `"private"`, `"view"` or `"edit"`. */
    val access: String,
    val permission: String? = null,
    val revision: Int = 1,
    val updatedAt: String = "",
    val createdAt: String = "",
    val ownerName: String? = null,
    val ownerUsername: String? = null,
    val ownerIcon: String? = null,
    val subjectId: String? = null,
    val topics: List<String> = emptyList(),
    val topicMappings: List<ShareTopicMapping> = emptyList(),
    val starCount: Int = 0,
    val starred: Boolean = false,
    val following: Boolean = false,
    val collaborators: List<String> = emptyList(),
    /** What this viewer may do — the server's answer (`viewerRights`), never worked out client-side. */
    val isOwner: Boolean = false,
    val canEdit: Boolean = false,
)

/** One shared document with its content, from `GET /api/shares/:id` or a successful `PUT /api/shares/:id`. */
@Serializable
data class ShareDetail(
    val id: String,
    val kind: String,
    val title: String,
    val access: String,
    /** A `SharedNote`-shaped object for `kind == "note"`, a `BoardState` for `kind == "whiteboard"` — decoded by the caller once [kind] is known. */
    val payload: JsonElement = JsonNull,
    val revision: Int = 1,
    val updatedAt: String = "",
    val createdAt: String = "",
    val isOwner: Boolean = false,
    val canEdit: Boolean = false,
)

@Serializable
data class CreateShareBody(val kind: String, val title: String, val access: String, val payload: JsonElement)

@Serializable
data class CreateShareResponse(val ok: Boolean = false, val id: String, val access: String = "view", val revision: Int = 1)

@Serializable
data class UpdateShareBody(
    val title: String? = null,
    val access: String? = null,
    val payload: JsonElement? = null,
    /** Required whenever [title]/[payload] change — the server 409s as `stale_revision` otherwise. See `revisionVerdict` in `sharePolicy.js`. */
    val expectedRevision: Int? = null,
)

@Serializable
data class SetStarBody(val starred: Boolean)

@Serializable
data class SetFollowBody(val following: Boolean)

@Serializable
data class ShareRevision(
    val revision: Int,
    val actorId: String? = null,
    val actorName: String? = null,
    val title: String? = null,
    val topics: List<ShareTopicMapping> = emptyList(),
    val createdAt: String = "",
)

interface SharesApi {

    // --- My Documents ---

    suspend fun listMyDocuments(): MyDocumentsResponse
    suspend fun createMyDocument(body: CreateMyDocumentBody): CreateMyDocumentResponse
    suspend fun putDocumentChunk(id: String, uploadId: String, index: Int, chunk: ByteArray): ChunkUploadResponse
    suspend fun completeDocumentUpload(id: String, uploadId: String, body: CompleteUploadBody): CompleteUploadResponse
    suspend fun renameMyDocument(id: String, title: String)

    /** Raw bytes for `GET /api/my-documents/:id/file`. Caller closes the body. */
    suspend fun getMyDocumentFile(id: String): ResponseBody
    suspend fun deleteMyDocument(id: String)

    // --- Shares ---

    suspend fun createShare(body: CreateShareBody): CreateShareResponse
    suspend fun listDiscoverableShares(kind: String? = null): List<ShareSummary>
    suspend fun listMyShares(kind: String? = null): List<ShareSummary>
    suspend fun getShare(id: String): ShareDetail

    /** Raw bytes for a managed asset (an image) referenced by a readable share. Caller closes the body. */
    suspend fun getShareAsset(shareId: String, documentId: String): ResponseBody
    suspend fun updateShare(id: String, body: UpdateShareBody): ShareDetail
    suspend fun setShareStar(id: String, starred: Boolean): ShareSummary
    suspend fun setShareFollow(id: String, following: Boolean): ShareSummary

    /**
     * Defaulted rather than required of every test double (same reasoning as
     * [QBankApi.getMedicalResource]): revision history is a secondary surface
     * `feature/shares` does not currently render — see
     * `feature.shares.SharesViewModel`'s doc comment — so a fake that never
     * exercises it needs no changes to keep compiling.
     */
    suspend fun getShareRevisions(id: String): List<ShareRevision> =
        throw UnsupportedOperationException("getShareRevisions not implemented")

    suspend fun deleteShare(id: String)
}

/**
 * The thin, stateless Retrofit-backed [SharesApi]. Mirrors [RetrofitMaristanaApi]:
 * the Supabase access token is read fresh per request via [tokenProvider] and
 * sent as a Bearer header, [CancellationException] always propagates first, and
 * every other transport/HTTP failure is mapped to [ApiException].
 */
class RetrofitSharesApi(
    baseUrl: String,
    private val tokenProvider: suspend () -> String?,
    okHttp: OkHttpClient = OkHttpClient(),
    json: Json = Json { ignoreUnknownKeys = true },
) : SharesApi {

    /** Construct from [AppConfig] (production path). */
    constructor(config: AppConfig, tokenProvider: suspend () -> String?) : this(config.apiBase, tokenProvider)

    private val service: Service = Retrofit.Builder()
        .baseUrl(if (baseUrl.endsWith("/")) baseUrl else "$baseUrl/")
        .client(okHttp)
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(Service::class.java)

    private suspend fun bearer(): String = "Bearer ${tokenProvider() ?: ""}"

    /** Run one call, translating HTTP/transport failures into [ApiException]. */
    private suspend fun <T> call(block: suspend () -> T): T = try {
        block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: HttpException) {
        throw ApiException(
            when (e.code()) {
                401 -> ApiError.Unauthorized
                403 -> ApiError.Forbidden
                else -> ApiError.Retryable(e)
            }
        )
    } catch (e: IOException) {
        throw ApiException(ApiError.Retryable(e))
    }

    override suspend fun listMyDocuments(): MyDocumentsResponse = call { service.listMyDocuments(bearer()) }

    override suspend fun createMyDocument(body: CreateMyDocumentBody): CreateMyDocumentResponse =
        call { service.createMyDocument(bearer(), body) }

    override suspend fun putDocumentChunk(id: String, uploadId: String, index: Int, chunk: ByteArray): ChunkUploadResponse =
        call { service.putDocumentChunk(bearer(), id, uploadId, index, chunk.toRequestBody(OCTET_STREAM)) }

    override suspend fun completeDocumentUpload(id: String, uploadId: String, body: CompleteUploadBody): CompleteUploadResponse =
        call { service.completeDocumentUpload(bearer(), id, uploadId, body) }

    override suspend fun renameMyDocument(id: String, title: String) {
        call { service.renameMyDocument(bearer(), id, RenameDocumentBody(title)).close() }
    }

    override suspend fun getMyDocumentFile(id: String): ResponseBody = call { service.getMyDocumentFile(bearer(), id) }

    override suspend fun deleteMyDocument(id: String) {
        call { service.deleteMyDocument(bearer(), id).close() }
    }

    override suspend fun createShare(body: CreateShareBody): CreateShareResponse = call { service.createShare(bearer(), body) }

    override suspend fun listDiscoverableShares(kind: String?): List<ShareSummary> =
        call { service.listDiscoverableShares(bearer(), kind) }

    override suspend fun listMyShares(kind: String?): List<ShareSummary> = call { service.listMyShares(bearer(), kind) }

    override suspend fun getShare(id: String): ShareDetail = call { service.getShare(bearer(), id) }

    override suspend fun getShareAsset(shareId: String, documentId: String): ResponseBody =
        call { service.getShareAsset(bearer(), shareId, documentId) }

    override suspend fun updateShare(id: String, body: UpdateShareBody): ShareDetail = call { service.updateShare(bearer(), id, body) }

    override suspend fun setShareStar(id: String, starred: Boolean): ShareSummary =
        call { service.setShareStar(bearer(), id, SetStarBody(starred)) }

    override suspend fun setShareFollow(id: String, following: Boolean): ShareSummary =
        call { service.setShareFollow(bearer(), id, SetFollowBody(following)) }

    override suspend fun getShareRevisions(id: String): List<ShareRevision> = call { service.getShareRevisions(bearer(), id) }

    override suspend fun deleteShare(id: String) {
        call { service.deleteShare(bearer(), id).close() }
    }

    private interface Service {
        @GET("my-documents")
        suspend fun listMyDocuments(@Header("Authorization") auth: String): MyDocumentsResponse

        @POST("my-documents")
        suspend fun createMyDocument(@Header("Authorization") auth: String, @Body body: CreateMyDocumentBody): CreateMyDocumentResponse

        @PUT("my-documents/{id}/chunks/{uploadId}/{index}")
        suspend fun putDocumentChunk(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Path("uploadId") uploadId: String,
            @Path("index") index: Int,
            @Body body: RequestBody,
        ): ChunkUploadResponse

        @POST("my-documents/{id}/chunks/{uploadId}/complete")
        suspend fun completeDocumentUpload(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Path("uploadId") uploadId: String,
            @Body body: CompleteUploadBody,
        ): CompleteUploadResponse

        @PATCH("my-documents/{id}")
        suspend fun renameMyDocument(@Header("Authorization") auth: String, @Path("id") id: String, @Body body: RenameDocumentBody): ResponseBody

        @GET("my-documents/{id}/file")
        suspend fun getMyDocumentFile(@Header("Authorization") auth: String, @Path("id") id: String): ResponseBody

        @DELETE("my-documents/{id}")
        suspend fun deleteMyDocument(@Header("Authorization") auth: String, @Path("id") id: String): ResponseBody

        @POST("shares")
        suspend fun createShare(@Header("Authorization") auth: String, @Body body: CreateShareBody): CreateShareResponse

        @GET("shares")
        suspend fun listDiscoverableShares(@Header("Authorization") auth: String, @Query("kind") kind: String?): List<ShareSummary>

        @GET("shares/mine")
        suspend fun listMyShares(@Header("Authorization") auth: String, @Query("kind") kind: String?): List<ShareSummary>

        @GET("shares/{id}")
        suspend fun getShare(@Header("Authorization") auth: String, @Path("id") id: String): ShareDetail

        @GET("shares/{id}/assets/{documentId}")
        suspend fun getShareAsset(
            @Header("Authorization") auth: String,
            @Path("id") id: String,
            @Path("documentId") documentId: String,
        ): ResponseBody

        @PUT("shares/{id}")
        suspend fun updateShare(@Header("Authorization") auth: String, @Path("id") id: String, @Body body: UpdateShareBody): ShareDetail

        @PUT("shares/{id}/star")
        suspend fun setShareStar(@Header("Authorization") auth: String, @Path("id") id: String, @Body body: SetStarBody): ShareSummary

        @PUT("shares/{id}/follow")
        suspend fun setShareFollow(@Header("Authorization") auth: String, @Path("id") id: String, @Body body: SetFollowBody): ShareSummary

        @GET("shares/{id}/revisions")
        suspend fun getShareRevisions(@Header("Authorization") auth: String, @Path("id") id: String): List<ShareRevision>

        @DELETE("shares/{id}")
        suspend fun deleteShare(@Header("Authorization") auth: String, @Path("id") id: String): ResponseBody
    }

    private companion object {
        val OCTET_STREAM = "application/octet-stream".toMediaType()
    }
}
