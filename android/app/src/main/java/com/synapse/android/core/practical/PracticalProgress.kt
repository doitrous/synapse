package com.synapse.android.core.practical

import kotlinx.serialization.Serializable

/**
 * What a student has done on the practical surfaces.
 *
 * A port of `src/data/practicalProgress.ts`, function for function. This is
 * the whole `nishany.practical.progress.v1` document -- web, iOS and Android
 * all read and write it, so a field spelled differently here does not throw,
 * it silently stops counting on the other clients.
 *
 * The sign-off distinction is deliberate and load-bearing. A student can
 * record that they have practised a skill and that they consider themselves
 * ready. Only an assessor can sign one off, and no assessor identity exists
 * in this product yet -- so nothing here has a `signedOffBy` field, and no
 * screen may imply one exists.
 */
const val PRACTICAL_PROGRESS_KEY = "nishany.practical.progress.v1"

@Serializable
data class StationProgress(
    val attempts: Int,
    /** Best marks achieved, out of the station's own total. */
    val bestMarks: Int,
    /** The station's mark total when [bestMarks] was set, so a percentage is honest. */
    val outOf: Int,
    val lastAt: String,
    /** Mark-scheme items ticked on the most recent run, so it can be resumed. */
    val checkedItems: List<String> = emptyList(),
)

/** `"not-started"`, `"in-progress"` or `"completed"`. */
@Serializable
data class CaseProgress(
    val status: String,
    /** How far through the decision points the student reached. */
    val lastStep: Int,
    val steps: Int,
    val lastAt: String,
)

@Serializable
data class LabProgress(val done: Int, val items: Int, val lastAt: String)

/** What the student says about a skill. Never what an assessor says. `"not-started"`, `"practised"` or `"ready"`. */
@Serializable
data class SkillProgress(val status: String, val lastAt: String)

/**
 * The whole document. [stations], [cases], [labs] and [skills] must all
 * survive every re-encode, including the ones this app's own screens never
 * touch -- see this task's brief, "The one way this task loses a student's
 * work". Declaring all four here, and reading the document whole rather than
 * patching one section, is what makes that true: every station the web wrote
 * comes back out of a fold this app made for a lab.
 *
 * What it does **not** buy is safety against the shared document *growing*.
 * `Json { ignoreUnknownKeys = true }` lets an unfamiliar key through the
 * decoder, but nothing carries it to the encoder, so it is gone on the way
 * back out -- and a whole new top-level section the web adds later (say
 * `"vivas"`) is an unfamiliar key like any other, dropped exactly the same
 * way. Only the four sections named above survive an Android write. Any
 * client adding a fifth has to be matched here before this app writes to a
 * document that has one.
 */
@Serializable
data class PracticalProgress(
    val version: Int = 1,
    val stations: Map<String, StationProgress> = emptyMap(),
    val cases: Map<String, CaseProgress> = emptyMap(),
    val labs: Map<String, LabProgress> = emptyMap(),
    val skills: Map<String, SkillProgress> = emptyMap(),
)

private const val CASE_COMPLETED = "completed"
private const val CASE_IN_PROGRESS = "in-progress"

/** `"not-started"`, `"practised"` or `"ready"` -- the only valid [SkillProgress.status] values. */
const val SKILL_NOT_STARTED = "not-started"
const val SKILL_PRACTISED = "practised"
const val SKILL_READY = "ready"

/**
 * Fold a finished station run in.
 *
 * The best score only moves up, and it carries the mark total it was scored
 * against -- a station later re-authored out of 30 must not make an old
 * 18/20 read as 18/30. The comparison is on the *share* (`marks / outOf`),
 * and it is `>=`, not `>`: a first run is always the best one, even though
 * `current` is null and there is nothing to compare against yet.
 *
 * [checkedItems] is overwritten by every run regardless of the score -- those
 * are the ticks to resume from, not the ticks of the best attempt.
 */
fun recordStationRun(
    progress: PracticalProgress,
    stationId: String,
    marks: Int,
    outOf: Int,
    checkedItems: List<String>,
    at: String,
): PracticalProgress {
    val current = progress.stations[stationId]
    val previousShare = if (current != null && current.outOf != 0) current.bestMarks.toDouble() / current.outOf else -1.0
    val thisShare = if (outOf != 0) marks.toDouble() / outOf else 0.0
    val better = thisShare >= previousShare
    val updated = StationProgress(
        attempts = (current?.attempts ?: 0) + 1,
        bestMarks = if (better) marks else current!!.bestMarks,
        outOf = if (better) outOf else current!!.outOf,
        lastAt = at,
        checkedItems = checkedItems,
    )
    return progress.copy(stations = progress.stations + (stationId to updated))
}

/**
 * Once completed, revisiting a case does not demote it to in-progress.
 * [CaseProgress.lastStep] never goes backwards; [CaseProgress.steps] is
 * always the latest (an author can add or remove decisions after a student
 * has already started).
 */
fun recordCaseStep(
    progress: PracticalProgress,
    caseId: String,
    lastStep: Int,
    steps: Int,
    completed: Boolean,
    at: String,
): PracticalProgress {
    val current = progress.cases[caseId]
    val updated = CaseProgress(
        status = if (completed || current?.status == CASE_COMPLETED) CASE_COMPLETED else CASE_IN_PROGRESS,
        lastStep = maxOf(lastStep, current?.lastStep ?: 0),
        steps = steps,
        lastAt = at,
    )
    return progress.copy(cases = progress.cases + (caseId to updated))
}

/** [LabProgress.done] never goes backwards; [LabProgress.items] is always the latest. */
fun recordLabAnswered(
    progress: PracticalProgress,
    labId: String,
    done: Int,
    items: Int,
    at: String,
): PracticalProgress {
    val current = progress.labs[labId]
    val updated = LabProgress(
        done = maxOf(done, current?.done ?: 0),
        items = items,
        lastAt = at,
    )
    return progress.copy(labs = progress.labs + (labId to updated))
}

/**
 * A status of [SKILL_NOT_STARTED] *removes* the entry rather than storing it
 * -- there is no fact to record about a skill nobody has touched. A skill is
 * never signed off by anyone: this product has no assessor identity, so no
 * status but these three ever reaches this function.
 */
fun setSkillStatus(
    progress: PracticalProgress,
    skillId: String,
    status: String,
    at: String,
): PracticalProgress {
    if (status == SKILL_NOT_STARTED) {
        return progress.copy(skills = progress.skills - skillId)
    }
    return progress.copy(skills = progress.skills + (skillId to SkillProgress(status = status, lastAt = at)))
}

data class SkillsSummary(val practised: Int, val ready: Int, val total: Int)

/**
 * How the skills list stands.
 *
 * [total] is passed in from the live list rather than stored, so the
 * headline can never disagree with the list beneath it. [SkillsSummary.practised]
 * counts both `"practised"` and `"ready"` skills -- ready is a stronger claim
 * than practised, not a separate track.
 */
fun summariseSkills(progress: PracticalProgress, total: Int): SkillsSummary {
    val values = progress.skills.values
    return SkillsSummary(
        practised = values.count { it.status == SKILL_PRACTISED || it.status == SKILL_READY },
        ready = values.count { it.status == SKILL_READY },
        total = total,
    )
}
