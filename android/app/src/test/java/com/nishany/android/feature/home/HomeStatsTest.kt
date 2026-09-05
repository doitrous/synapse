package com.nishany.android.feature.home

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [HomeStats] is a pure port of `TodaysTarget.tsx`'s `greetingKey()` and
 * status line, and `nameFor` in `src/lib/useIdentity.tsx` (the email
 * fallback only -- see the class doc for why Android has no roster name or
 * sign-up metadata to prefer first). No [android.content.Context], no clock
 * to fake beyond a plain `Int` hour, matching the discipline `QBankStatsTest`
 * uses for `QBankStats`.
 */
class HomeStatsTest {

    @Test
    fun `before noon is a good morning`() {
        assertEquals("Good morning", HomeStats.greetingKey(0))
        assertEquals("Good morning", HomeStats.greetingKey(11))
    }

    @Test
    fun `from noon to six is a good afternoon`() {
        assertEquals("Good afternoon", HomeStats.greetingKey(12))
        assertEquals("Good afternoon", HomeStats.greetingKey(17))
    }

    @Test
    fun `six onward is a good evening`() {
        assertEquals("Good evening", HomeStats.greetingKey(18))
        assertEquals("Good evening", HomeStats.greetingKey(23))
    }

    @Test
    fun `the greeting carries the student's name`() {
        assertEquals("Good evening, Omar", HomeStats.greeting(20, "Omar"))
    }

    @Test
    fun `an empty name leaves the greeting bare, never a trailing comma`() {
        assertEquals("Good evening", HomeStats.greeting(20, ""))
        assertEquals("Good evening", HomeStats.greeting(20, "   "))
    }

    @Test
    fun `the display name is the email's local part`() {
        assertEquals("omar.elbasat", HomeStats.displayName("omar.elbasat@example.com"))
    }

    @Test
    fun `no email at all falls back to Student, never an invented name`() {
        assertEquals("Student", HomeStats.displayName(null))
        assertEquals("Student", HomeStats.displayName(""))
    }

    @Test
    fun `remaining never goes negative once the goal is passed`() {
        assertEquals(12, HomeStats.remaining(28, 40))
        assertEquals(0, HomeStats.remaining(41, 40))
    }

    @Test
    fun `the target is earned at exactly the goal, not only past it`() {
        assertFalse(HomeStats.earned(39, 40))
        assertTrue(HomeStats.earned(40, 40))
        assertTrue(HomeStats.earned(50, 40))
    }

    @Test
    fun `the status line counts down until the target is earned`() {
        assertEquals(
            "28 of 40 questions done — 12 more to hit your mark.",
            HomeStats.statusText(28, 40),
        )
    }

    @Test
    fun `the status line celebrates once the target is hit`() {
        assertEquals("Target hit for today — nice shooting", HomeStats.statusText(40, 40))
        assertEquals("Target hit for today — nice shooting", HomeStats.statusText(52, 40))
    }
}
