package com.synapse.app.core.qbank

import kotlinx.serialization.Serializable

/**
 * Minimal wire shape of one item in the managed-content authoring ledger
 * (the `StateDoc.value` array for the content-ledger key). Only the fields
 * [QuestionProjection] needs are modeled; everything else is ignored via
 * `Json { ignoreUnknownKeys = true }`.
 */
@Serializable
data class ManagedContentItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val fields: Map<String, String> = emptyMap(),
    val questionData: QuestionAuthoringData? = null,
)

/** Authoring payload for `kind == "question"` items. */
@Serializable
data class QuestionAuthoringData(
    val correctAnswer: String? = null,
    val answers: List<RawAnswer> = emptyList(),
    val learningObjective: String? = null,
    val estimatedSeconds: Int? = null,
    val libraryIds: List<String> = emptyList(),
    val tags: QuestionTags? = null,
)

/** One raw answer choice as authored; may be a blank placeholder row. */
@Serializable
data class RawAnswer(
    val label: String = "",
    val text: String = "",
    val explanation: String = "",
)

/** Scoping + concept-tagging metadata for a question. */
@Serializable
data class QuestionTags(
    val universityIds: List<String> = emptyList(),
    val years: List<String> = emptyList(),
    val mainConceptIds: List<String>? = null,
    val conceptIds: List<String> = emptyList(),
    val topic: String? = null,
)
