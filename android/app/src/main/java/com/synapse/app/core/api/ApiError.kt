package com.synapse.app.core.api
sealed interface ApiError {
    data object Unauthorized : ApiError            // 401 — stop draining, keep everything
    data object Forbidden : ApiError               // 403 — abandon this entry permanently
    data class Retryable(val cause: Throwable) : ApiError
}
class ApiException(val error: ApiError) : Exception()
