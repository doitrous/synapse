package com.synapse.app.core.flashcards

import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 1 (Plan 05 — Flashcards): the SM-2 scheduler.
 *
 * A verbatim port of `src/data/srs.test.ts`, same fixture timestamp
 * (`2026-08-20T09:00:00.000Z`), same grades, same expected numbers.
 */
class SrsTest {

    private val isoFormatter: DateTimeFormatter =
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneOffset.UTC)

    private val at: Instant = Instant.parse("2026-08-20T09:00:00.000Z")

    private fun minutes(n: Double): String = isoFormatter.format(at.plusMillis((n * 60_000).toLong()))

    private fun days(n: Int): String = isoFormatter.format(at.plusMillis(n * 86_400_000L))

    private fun review(
        state: CardState = CardState.Review,
        step: Int = 0,
        interval: Int = 10,
        ease: Double = 2.5,
        lapses: Int = 0,
        reps: Int = 5,
        due: String = isoFormatter.format(at),
    ): CardSchedule = CardSchedule(
        state = state,
        step = step,
        interval = interval,
        ease = ease,
        lapses = lapses,
        reps = reps,
        due = due,
    )

    @Test
    fun `a new card starts due, with the starting ease`() {
        val card = newCard(at)
        assertEquals(CardState.New, card.state)
        assertEquals(2.5, card.ease, 1e-9)
        assertEquals(0, card.interval)
        assertTrue(isDue(card, at))
    }

    @Test
    fun `Good on a new card enters learning at the second step, ten minutes out`() {
        val card = grade(newCard(at), Grade.Good, at, AnkiDefaults)
        assertEquals(CardState.Learning, card.state)
        assertEquals(1, card.step)
        assertEquals(minutes(10.0), card.due)
    }

    @Test
    fun `Again on a new card stays on the first step, one minute out`() {
        val card = grade(newCard(at), Grade.Again, at, AnkiDefaults)
        assertEquals(CardState.Learning, card.state)
        assertEquals(0, card.step)
        assertEquals(minutes(1.0), card.due)
    }

    @Test
    fun `Easy on a new card graduates straight to four days`() {
        val card = grade(newCard(at), Grade.Easy, at, AnkiDefaults)
        assertEquals(CardState.Review, card.state)
        assertEquals(4, card.interval)
        assertEquals(days(4), card.due)
    }

    @Test
    fun `Hard on a learning card repeats the step it is on`() {
        val learning = newCard(at).copy(state = CardState.Learning, step = 1)
        val card = grade(learning, Grade.Hard, at, AnkiDefaults)
        assertEquals(1, card.step)
        assertEquals(minutes(10.0), card.due)
    }

    @Test
    fun `Good on the last learning step graduates to one day`() {
        val learning = newCard(at).copy(state = CardState.Learning, step = 1)
        val card = grade(learning, Grade.Good, at, AnkiDefaults)
        assertEquals(CardState.Review, card.state)
        assertEquals(1, card.interval)
    }

    @Test
    fun `Good on a review card multiplies the interval by its ease`() {
        val card = grade(review(interval = 10, ease = 2.5), Grade.Good, at, AnkiDefaults)
        assertEquals(25, card.interval)
        assertEquals(2.5, card.ease, 1e-9)
    }

    @Test
    fun `Hard on a review card uses the hard multiplier and drops ease by fifteen`() {
        val card = grade(review(interval = 10, ease = 2.5), Grade.Hard, at, AnkiDefaults)
        assertEquals(12, card.interval)
        assertEquals(2.35, card.ease, 1e-9)
    }

    @Test
    fun `Easy on a review card adds the easy bonus and raises ease by fifteen`() {
        val card = grade(review(interval = 10, ease = 2.5), Grade.Easy, at, AnkiDefaults)
        assertEquals(33, card.interval)
        assertEquals(2.65, card.ease, 1e-9)
    }

    @Test
    fun `Again on a review card lapses it into relearning`() {
        val card = grade(review(interval = 10, ease = 2.5), Grade.Again, at, AnkiDefaults)
        assertEquals(CardState.Relearning, card.state)
        assertEquals(1, card.lapses)
        assertEquals(2.3, card.ease, 1e-9)
        // New interval after a lapse is 0% of the old one, floored at the minimum.
        assertEquals(1, card.interval)
        assertEquals(minutes(10.0), card.due)
    }

    @Test
    fun `ease never falls below its floor however often a card lapses`() {
        var card = review(ease = 1.35)
        repeat(5) {
            card = grade(card.copy(state = CardState.Review), Grade.Again, at, AnkiDefaults)
        }
        assertEquals(1.3, card.ease, 1e-9)
    }

    @Test
    fun `an interval never exceeds the maximum`() {
        val card = grade(review(interval = 30000, ease = 2.5), Grade.Easy, at, AnkiDefaults)
        assertEquals(AnkiDefaults.maximumInterval, card.interval)
    }

    @Test
    fun `graduating from relearning returns the card to review`() {
        val relearning = review().copy(state = CardState.Relearning, step = 0, interval = 1)
        val card = grade(relearning, Grade.Good, at, AnkiDefaults)
        assertEquals(CardState.Review, card.state)
    }

    @Test
    fun `a card is not due before its time`() {
        assertFalse(isDue(review(due = days(1)), at))
        assertTrue(isDue(review(due = minutes(-1.0)), at))
    }

    @Test
    fun `Hard on the first learning step averages the first two steps, as Anki does`() {
        val learning = newCard(at).copy(state = CardState.Learning, step = 0)
        val card = grade(learning, Grade.Hard, at, AnkiDefaults)
        assertEquals(0, card.step)
        // (1 + 10) / 2 = 5.5 minutes.
        assertEquals(minutes(5.5), card.due)
    }

    @Test
    fun `with a single learning step there is nothing to average, so Hard repeats it`() {
        val config = AnkiDefaults.copy(learningSteps = listOf(10.0))
        val learning = newCard(at).copy(state = CardState.Learning, step = 0)
        assertEquals(minutes(10.0), grade(learning, Grade.Hard, at, config).due)
    }

    @Test
    fun `a review card graded late is credited half the overdue days on Good`() {
        val late = review(interval = 10, ease = 2.5, due = days(-10))
        // (10 + 10/2) * 2.5 = 37.5, rounded.
        assertEquals(38, grade(late, Grade.Good, at, AnkiDefaults).interval)
    }

    @Test
    fun `Hard credits a quarter of the overdue days`() {
        val late = review(interval = 10, ease = 2.5, due = days(-10))
        // (10 + 10/4) * 1.2 = 15
        assertEquals(15, grade(late, Grade.Hard, at, AnkiDefaults).interval)
    }

    @Test
    fun `Easy credits all of them`() {
        val late = review(interval = 10, ease = 2.5, due = days(-10))
        // (10 + 10) * 2.5 * 1.3 = 65
        assertEquals(65, grade(late, Grade.Easy, at, AnkiDefaults).interval)
    }

    @Test
    fun `a card answered early is credited nothing`() {
        val early = review(interval = 10, ease = 2.5, due = days(5))
        assertEquals(25, grade(early, Grade.Good, at, AnkiDefaults).interval)
    }
}
