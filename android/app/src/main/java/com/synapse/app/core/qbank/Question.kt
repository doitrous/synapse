package com.synapse.app.core.qbank

/** MCQ answer shape. Only single/multi-correct MCQs are modeled today. */
enum class QuestionFormat { McqSingle, McqMulti }

/** One selectable answer choice, with its own rationale text. */
data class AnswerOption(val label: String, val text: String, val explanation: String)

/**
 * A student-facing question, projected from the raw authoring ledger
 * (see [QuestionProjection]). Every instance here is guaranteed markable:
 * [options] is non-empty and [correctLabel] matches one of [options].
 */
data class Question(
    val id: String,
    val subjectId: String,
    val topic: String,
    val difficulty: String = "Moderate",
    val vignette: String,
    val stem: String,
    val options: List<AnswerOption>,
    val correctLabel: String,
    val explanation: String,
    val learningObjective: String? = null,
    val estimatedSeconds: Int? = null,
    val libraryIds: List<String> = emptyList(),
    val conceptIds: List<String> = emptyList(),
    val universityIds: List<String> = emptyList(),
    val years: List<String> = emptyList(),
) {
    fun isCorrect(label: String): Boolean = label == correctLabel
}
