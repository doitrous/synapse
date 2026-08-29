package com.synapse.app.core.api
import com.synapse.app.core.model.*

interface SynapseApi {
    suspend fun session(): SessionDto
    suspend fun manifest(): Manifest
    suspend fun getState(key: String): StateDoc
    suspend fun getUserState(key: String): StateDoc
    suspend fun putUserState(key: String, doc: StateDoc)
    suspend fun getAttempts(month: String): List<AttemptRecord>
    suspend fun postAttempt(attempt: AttemptRecord)
}
