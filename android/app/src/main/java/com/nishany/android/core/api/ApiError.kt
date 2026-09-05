package com.nishany.android.core.api

/**
 * What a status code means for the caller, not what it meant for the server.
 *
 * `SynapseApi` is the only thing that ever sees an HTTP status; everything
 * downstream — the sync engine especially — needs to know one of three
 * things about a failure, and only one of three: keep retrying, give up on
 * this document for good, or the session itself is over. Those three answers
 * are what separate a stalled sync queue from one that drains, so the status
 * code is translated here, once, rather than re-interpreted at every call
 * site.
 */
sealed class ApiError(message: String) : Exception(message) {

    /** The session is unauthenticated or the token has expired. Not a retryable request — the caller needs a new session. */
    object Unauthorized : ApiError("unauthorized")

    /** The caller is authenticated but not entitled to this document. Permanent for this key; retrying changes nothing. */
    object Forbidden : ApiError("forbidden")

    /** The route or document does not exist. Callers fall back rather than retry. */
    object NotFound : ApiError("not found")

    /** A server-side or network failure that may succeed on a later attempt. [status] is null for a failure with no HTTP response at all. */
    data class Transient(val status: Int?) : ApiError("transient failure (status=$status)")

    /** The response did not have the shape this call expected. */
    data class Malformed(val reason: String) : ApiError("malformed response: $reason")

    /** Whether the same request is worth attempting again. Only [Transient] is — everything else is a permanent answer. */
    val isRetryable: Boolean get() = this is Transient
}
