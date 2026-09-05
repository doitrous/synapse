package com.nishany.android.feature.home

/**
 * The pure arithmetic behind the Home screen's hero card: no [android.content.Context],
 * no [com.nishany.android.core.cache.LocalStore] -- every input here is a plain
 * value, so each rule can be tested without a ViewModel or a clock to fake.
 *
 * A port of the web's `TodaysTarget.tsx`: [greetingKey] mirrors its
 * `greetingKey()`, [displayName] mirrors `nameFor` in `src/lib/useIdentity.tsx`
 * (this app carries no roster profile or sign-up metadata, so the email's
 * local part is the only fallback it has), and [statusText] mirrors the
 * hero's status line.
 */
object HomeStats {

    /**
     * No per-student daily target exists in settings yet. Forty questions is
     * a sensible default sitting -- enough to matter, short enough to
     * actually finish -- until the app exposes one to set. Ported verbatim
     * from `DAILY_QUESTION_GOAL` in `TodaysTarget.tsx`.
     */
    const val DAILY_QUESTION_GOAL = 40

    /** "Good morning" before noon, "Good afternoon" before 6pm, else "Good evening". A port of `greetingKey()`. */
    fun greetingKey(hour: Int): String = when {
        hour < 12 -> "Good morning"
        hour < 18 -> "Good afternoon"
        else -> "Good evening"
    }

    /** The greeting bucket plus the student's name, e.g. "Good evening, Omar". */
    fun greeting(hour: Int, displayName: String): String {
        val name = displayName.trim()
        return if (name.isNotEmpty()) "${greetingKey(hour)}, $name" else greetingKey(hour)
    }

    /**
     * The name to greet someone by, never invented: the email's local part,
     * trimmed, or "Student" when there is nothing to read.
     *
     * The web's `nameFor` (`src/lib/useIdentity.tsx`) prefers a roster
     * profile name, then sign-up metadata, before falling back to the email.
     * Android carries neither of those -- [com.nishany.android.core.api.SessionUser]
     * has only an id, an email, a role and an aal -- so the email fallback is
     * the whole of this port.
     */
    fun displayName(email: String?): String {
        val local = email?.substringBefore('@')?.trim()
        return if (!local.isNullOrEmpty()) local else "Student"
    }

    /** How many more questions close out today's target. Never negative. */
    fun remaining(todayCount: Int, goal: Int = DAILY_QUESTION_GOAL): Int = maxOf(0, goal - todayCount)

    /** Whether today's target has been met. */
    fun earned(todayCount: Int, goal: Int = DAILY_QUESTION_GOAL): Boolean = todayCount >= goal

    /**
     * The hero's status line, plain text. `HomeScreen` rebuilds the "X of Y"
     * portion as bold [androidx.compose.ui.text.AnnotatedString] itself
     * rather than parsing this string -- this function exists so the
     * decision (which message, which numbers) is tested without Compose.
     */
    fun statusText(todayCount: Int, goal: Int = DAILY_QUESTION_GOAL): String =
        if (earned(todayCount, goal)) {
            "Target hit for today — nice shooting"
        } else {
            "$todayCount of $goal questions done — ${remaining(todayCount, goal)} more to hit your mark."
        }
}
