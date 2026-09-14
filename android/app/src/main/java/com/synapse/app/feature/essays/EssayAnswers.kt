package com.synapse.app.feature.essays

import com.synapse.app.core.essays.WrittenTicks
import kotlinx.serialization.Serializable

/**
 * One student's attempt at one practice essay. Ported from
 * `src/lib/useEssayAnswers.ts` — same shape, same storage key
 * (`synapse.essay.answers.v1`).
 *
 * There is no `correct` field: a written answer is marked by the person who
 * wrote it, ticking the key points they actually made.
 */
@Serializable
data class EssayAnswer(
    /** What the student wrote, kept so they can reread it. */
    val text: String = "",
    /** Key point ids they ticked, or null when they have not marked it yet. */
    val ticked: List<String>? = null,
    /**
     * Whether the helpers have been opened. Kept apart from [ticked] because
     * revealing and marking are different events — see [isRevealed].
     */
    val revealed: Boolean? = null,
    val updatedAt: String = "",
)

/**
 * Which stage a question reopens on. Ported from `initialStage` in
 * `src/data/essay.ts`: [revealed] is the fact; the fallback to `ticked !=
 * null` is only for answers written before that field existed, and it errs
 * the same way — a student who has ticked something has certainly already
 * seen the helpers.
 */
fun EssayAnswer?.isRevealed(): Boolean = this?.revealed ?: (this?.ticked != null)

/**
 * One student's attempt at one written exam question. Ported from
 * `src/lib/useWrittenAnswers.ts` — same shape, same storage key
 * (`synapse.written.answers.v1`).
 *
 * Kept apart from [EssayAnswer] because the shapes differ where it matters: a
 * written exam question is several parts, each with its own text and its own
 * mark scheme, where an essay is one prompt with one flat list of ticks.
 */
@Serializable
data class WrittenAnswer(
    /** What the student wrote, per part id, kept so they can reread it. */
    val text: Map<String, String> = emptyMap(),
    /** Expected points ticked, per part id, or null when not yet marked. */
    val ticks: WrittenTicks? = null,
    /** Whether the mark scheme has been opened. See [EssayAnswer.revealed]. */
    val revealed: Boolean? = null,
    val updatedAt: String = "",
)

fun WrittenAnswer?.isRevealed(): Boolean = this?.revealed ?: (this?.ticks != null)
