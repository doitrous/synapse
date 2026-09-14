package com.synapse.app.core.calendar

import org.junit.Assert.assertEquals
import org.junit.Test

/** Port of web's `durationMinutes` tests (`src/data/studyBlocks.ts` has no dedicated test file; behavior confirmed against its doc comment: "floored at zero"). */
class StudyBlockTest {

    @Test
    fun minutesBetweenTwoTimesOnTheSameHour() {
        assertEquals(90, durationMinutes("17:00", "18:30"))
    }

    @Test
    fun anEndBeforeTheStartFloorsAtZeroRatherThanGoingNegative() {
        assertEquals(0, durationMinutes("18:00", "17:00"))
    }

    @Test
    fun equalStartAndEndIsZero() {
        assertEquals(0, durationMinutes("09:00", "09:00"))
    }
}
