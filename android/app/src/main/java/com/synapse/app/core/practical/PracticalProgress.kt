package com.synapse.app.core.practical

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * What a student has done on the practical surface. A direct port of iOS
 * `Core/Practical/PracticalProgress.swift` / web `src/data/practicalProgress.ts` —
 * same key, same shapes, same fold rules, so a student's practice round-trips
 * across platforms.
 *
 * Everything here is what the *student* says about their own work: a station
 * is self-marked, a skill is self-rated. No assessor signs anything off in
 * this product, so nothing here may be presented as though one had (see
 * `Skill.status`'s doc comment).
 */
@Serializable
data class PracticalProgress(
    val version: Int = 1,
    val stations: Map<String, Station> = emptyMap(),
    val cases: Map<String, Case> = emptyMap(),
    val labs: Map<String, Lab> = emptyMap(),
    val skills: Map<String, Skill> = emptyMap(),
) {
    @Serializable
    data class Station(
        val attempts: Int,
        /** Best marks achieved, out of the station's own total. */
        val bestMarks: Int,
        /** The station's mark total when [bestMarks] was set, so a percentage is honest. */
        val outOf: Int,
        val lastAt: String,
        /** Mark-scheme items ticked on the most recent run, so it can be resumed. */
        val checkedItems: List<String>,
    )

    @Serializable
    enum class CaseStatus {
        @SerialName("not-started") NOT_STARTED,
        @SerialName("in-progress") IN_PROGRESS,
        @SerialName("completed") COMPLETED,
    }

    @Serializable
    data class Case(
        val status: CaseStatus,
        /** How far through the decision points the student reached. */
        val lastStep: Int,
        val steps: Int,
        val lastAt: String,
    )

    /** A lab or imaging interpretation set's progress. Decoded for cross-platform round-tripping; no Android tab writes it yet — see `feature/practical/PracticalScreen.kt`'s deferral note. */
    @Serializable
    data class Lab(val done: Int, val items: Int, val lastAt: String)

    /** What the student says about a skill. Never what an assessor says — see this file's doc comment. */
    @Serializable
    enum class SkillStatus {
        @SerialName("not-started") NOT_STARTED,
        @SerialName("practised") PRACTISED,
        @SerialName("ready") READY;

        /** Cycled rather than picked: three states on one tap is quicker than a menu, and there is no wrong order to meet them in. */
        val next: SkillStatus
            get() = when (this) {
                NOT_STARTED -> PRACTISED
                PRACTISED -> READY
                READY -> NOT_STARTED
            }
    }

    @Serializable
    data class Skill(val status: SkillStatus, val lastAt: String)

    fun statusOfSkill(id: String): SkillStatus = skills[id]?.status ?: SkillStatus.NOT_STARTED

    companion object {
        const val KEY = "synapse.practical.progress.v1"
    }
}

/**
 * Fold a finished station (or skills-checklist-with-a-mark-scheme) run in.
 * The best score only moves up, and it carries the mark total it was scored
 * against — a station later re-authored out of 30 must not make an old 18/20
 * read as 18/30.
 */
fun PracticalProgress.recordStation(id: String, marks: Int, outOf: Int, checkedItems: List<String>, at: String): PracticalProgress {
    val current = stations[id]
    val previousShare = if ((current?.outOf ?: 0) > 0) current!!.bestMarks.toDouble() / current.outOf else -1.0
    val thisShare = if (outOf > 0) marks.toDouble() / outOf else 0.0
    val better = thisShare >= previousShare
    val next = PracticalProgress.Station(
        attempts = (current?.attempts ?: 0) + 1,
        bestMarks = if (better) marks else (current?.bestMarks ?: marks),
        outOf = if (better) outOf else (current?.outOf ?: outOf),
        lastAt = at,
        checkedItems = checkedItems,
    )
    return copy(stations = stations + (id to next))
}

/** Fold a case's progress in. Once completed, revisiting a case does not demote it. */
fun PracticalProgress.recordCase(id: String, lastStep: Int, steps: Int, completed: Boolean, at: String): PracticalProgress {
    val current = cases[id]
    val next = PracticalProgress.Case(
        status = if (completed || current?.status == PracticalProgress.CaseStatus.COMPLETED) PracticalProgress.CaseStatus.COMPLETED else PracticalProgress.CaseStatus.IN_PROGRESS,
        lastStep = maxOf(lastStep, current?.lastStep ?: 0),
        steps = steps,
        lastAt = at,
    )
    return copy(cases = cases + (id to next))
}

/**
 * Set what a student says about a skill. Back to "not started" removes the
 * record rather than storing it: an absent entry and an explicit "not
 * started" mean the same thing, and keeping both lets the two disagree.
 */
fun PracticalProgress.setSkillStatus(id: String, status: PracticalProgress.SkillStatus, at: String): PracticalProgress =
    if (status == PracticalProgress.SkillStatus.NOT_STARTED) copy(skills = skills - id)
    else copy(skills = skills + (id to PracticalProgress.Skill(status = status, lastAt = at)))
