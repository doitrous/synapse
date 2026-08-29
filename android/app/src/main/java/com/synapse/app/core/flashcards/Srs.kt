package com.synapse.app.core.flashcards

import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import kotlin.math.floor

/**
 * When a flashcard should come back.
 *
 * Every number in [AnkiDefaults] is Anki 25.02.5's own default preset, and the
 * algorithm is the SM-2 scheduler those defaults belong to. FSRS ships in that
 * version but is opt-in, so a student who has only ever pressed "Add" is on
 * SM-2 — and matching what they already know is the point.
 *
 * FSRS is deliberately not implemented. It fits its parameters against a
 * review history, and on day one there is none; it would be guessing with more
 * arithmetic. It becomes worth revisiting once students have logged reviews.
 *
 * Lateness is credited the way Anki credits it — see [gradeReview]. It is not
 * an embellishment to simplify away: without it, a student returning from a
 * week off has every interval shortened for having remembered longer.
 *
 * [Instant] is a parameter rather than a call to `Instant.now()` inside. A
 * scheduler that reads its own clock can only be asserted against itself, and
 * a card that comes back on the wrong day does not throw — it just quietly
 * reappears weeks late. Passing the clock in is what makes the intervals
 * testable.
 *
 * A verbatim port of `src/data/srs.ts`.
 */
enum class Grade { Again, Hard, Good, Easy }

enum class CardState { New, Learning, Review, Relearning }

data class CardSchedule(
    val state: CardState,
    /** Index into the learning or relearning step list; unused while in review. */
    val step: Int,
    /** Whole days. Zero until the card graduates — the step states count minutes. */
    val interval: Int,
    /** SM-2 ease factor, where 2.5 means "multiply the interval by two and a half". */
    val ease: Double,
    val lapses: Int,
    val reps: Int,
    /** ISO 8601, so a schedule survives a round trip through storage unchanged. */
    val due: String,
)

data class SrsConfig(
    val newPerDay: Int,
    val maxReviewsPerDay: Int,
    /** Minutes. */
    val learningSteps: List<Double>,
    /** Minutes. */
    val relearningSteps: List<Double>,
    /** Days. */
    val graduatingInterval: Int,
    /** Days. */
    val easyInterval: Int,
    val startingEase: Double,
    val easyBonus: Double,
    val hardMultiplier: Double,
    /** Percent of the old interval a lapse leaves behind. */
    val lapseNewIntervalPercent: Double,
    /** Days. */
    val minimumInterval: Int,
    /** Days. */
    val maximumInterval: Int,
    val leechThreshold: Int,
)

val AnkiDefaults = SrsConfig(
    newPerDay = 20,
    maxReviewsPerDay = 200,
    learningSteps = listOf(1.0, 10.0),
    relearningSteps = listOf(10.0),
    graduatingInterval = 1,
    easyInterval = 4,
    startingEase = 2.5,
    easyBonus = 1.3,
    hardMultiplier = 1.2,
    lapseNewIntervalPercent = 0.0,
    minimumInterval = 1,
    maximumInterval = 36500,
    leechThreshold = 8,
)

/**
 * Anki's own floor. Without it a card the student keeps failing drives its own
 * ease towards zero and then returns every single day forever, which is how a
 * deck becomes unusable rather than merely hard.
 */
private const val MINIMUM_EASE = 1.3

private const val EASE_DELTA_HARD = -0.15
private const val EASE_DELTA_EASY = 0.15
private const val EASE_DELTA_LAPSE = -0.2

private const val MINUTE_MS = 60_000L
private const val DAY_MS = 86_400_000L

/** Mirrors JS `Date#toISOString()`: always exactly three fractional digits, always `Z`. */
private val ISO_FORMATTER: DateTimeFormatter =
    DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneOffset.UTC)

private fun isoString(instant: Instant): String = ISO_FORMATTER.format(instant)

private fun atMinutes(now: Instant, minutes: Double): String =
    isoString(now.plusMillis((minutes * MINUTE_MS).toLong()))

private fun atDays(now: Instant, days: Int): String =
    isoString(now.plusMillis(days * DAY_MS))

private fun clampEase(ease: Double): Double = maxOf(MINIMUM_EASE, ease)

/** Cards are due on a day, not at an instant, so every interval lands on a whole one. */
private fun clampInterval(days: Double, config: SrsConfig): Int =
    minOf(config.maximumInterval, Math.round(days).toInt())

fun newCard(now: Instant, config: SrsConfig = AnkiDefaults): CardSchedule = CardSchedule(
    state = CardState.New,
    step = 0,
    interval = 0,
    ease = config.startingEase,
    lapses = 0,
    reps = 0,
    due = isoString(now),
)

fun isDue(card: CardSchedule, now: Instant): Boolean = Instant.parse(card.due) <= now

/**
 * Answer a card, returning its next schedule. The input is never mutated: a
 * caller holding the old schedule (a Compose recomposition, an undo stack)
 * keeps it.
 */
fun grade(card: CardSchedule, answer: Grade, now: Instant, config: SrsConfig = AnkiDefaults): CardSchedule {
    val next = card.copy(reps = card.reps + 1)
    return if (card.state == CardState.Review) gradeReview(next, answer, now, config) else gradeSteps(next, answer, now, config)
}

/** New, learning and relearning cards are all scheduled in minutes off a step list. */
private fun gradeSteps(card: CardSchedule, answer: Grade, now: Instant, config: SrsConfig): CardSchedule {
    val relearning = card.state == CardState.Relearning
    val steps = if (relearning) config.relearningSteps else config.learningSteps
    val stepState = if (relearning) CardState.Relearning else CardState.Learning

    if (answer == Grade.Easy) return graduate(card, answer, now, config)

    // Hard holds the card where it is: it was not forgotten, so it does not go
    // back to the start, and it was not recalled cleanly, so it does not advance.
    val target = when (answer) {
        Grade.Again -> 0
        Grade.Hard -> card.step
        else -> card.step + 1 // Good
    }

    if (target >= steps.size) return graduate(card, answer, now, config)

    return card.copy(state = stepState, step = target, due = atMinutes(now, stepDelay(steps, answer, target)))
}

/**
 * How long a step waits.
 *
 * Hard on the *first* step is the one place this is not simply "that step".
 * Anki averages the first two steps there — 5.5 minutes for `1m 10m` — because
 * repeating a one-minute step would show the card again almost immediately,
 * which is not what "hard" is asking for. From the second step on, and with a
 * preset that has only one step to work with, it repeats the step it is on.
 */
private fun stepDelay(steps: List<Double>, answer: Grade, target: Int): Double {
    val current = steps.getOrElse(target) { 0.0 }
    if (answer != Grade.Hard || target != 0) return current
    val next = steps.getOrNull(1) ?: return current
    return (current + next) / 2
}

private fun graduate(card: CardSchedule, answer: Grade, now: Instant, config: SrsConfig): CardSchedule {
    // A relearning card already has the interval its lapse left it with; earning
    // the full graduating interval back for one correct answer would undo the lapse.
    val interval = if (card.state == CardState.Relearning) {
        clampInterval(card.interval.toDouble(), config)
    } else {
        clampInterval(
            if (answer == Grade.Easy) config.easyInterval.toDouble() else config.graduatingInterval.toDouble(),
            config,
        )
    }

    return card.copy(state = CardState.Review, step = 0, interval = interval, due = atDays(now, interval))
}

private fun gradeReview(card: CardSchedule, answer: Grade, now: Instant, config: SrsConfig): CardSchedule {
    if (answer == Grade.Again) return lapse(card, now, config)

    // The days a card sat overdue are partly credited before multiplying, the
    // way Anki does it. Without this, coming back from a week away shortens every
    // interval — the student demonstrably remembered the card for longer than it
    // was scheduled for, and shrinking the interval punishes them for the gap.
    // A card answered early gets no credit: `delay` floors at zero.
    val diffMs = now.toEpochMilli() - Instant.parse(card.due).toEpochMilli()
    val delay = maxOf(0L, floor(diffMs.toDouble() / DAY_MS).toLong())

    val interval = clampInterval(
        when (answer) {
            Grade.Hard -> (card.interval + delay / 4.0) * config.hardMultiplier
            Grade.Good -> (card.interval + delay / 2.0) * card.ease
            else -> (card.interval + delay) * card.ease * config.easyBonus // Easy
        },
        config,
    )

    val ease = clampEase(
        card.ease + when (answer) {
            Grade.Hard -> EASE_DELTA_HARD
            Grade.Easy -> EASE_DELTA_EASY
            else -> 0.0 // Good
        },
    )

    return card.copy(state = CardState.Review, step = 0, interval = interval, ease = ease, due = atDays(now, interval))
}

private fun lapse(card: CardSchedule, now: Instant, config: SrsConfig): CardSchedule {
    val interval = minOf(
        config.maximumInterval,
        maxOf(config.minimumInterval, Math.round(card.interval * config.lapseNewIntervalPercent / 100.0).toInt()),
    )
    val lapsed = card.copy(
        interval = interval,
        ease = clampEase(card.ease + EASE_DELTA_LAPSE),
        lapses = card.lapses + 1,
    )

    // A preset with no relearning steps has nowhere to send the card, so it goes
    // straight back into review on its shortened interval.
    val first = config.relearningSteps.getOrNull(0)
        ?: return lapsed.copy(state = CardState.Review, step = 0, due = atDays(now, interval))

    return lapsed.copy(state = CardState.Relearning, step = 0, due = atMinutes(now, first))
}
