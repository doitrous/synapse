package com.nishany.android.feature.settings

/** The six study-icon choices, ported from `src/data/profileIcons.ts` (id + label; the SVG paths stay web-only). */
data class ProfileIconOption(val id: String, val label: String)

val PROFILE_ICONS = listOf(
    ProfileIconOption("stethoscope", "Stethoscope"),
    ProfileIconOption("neuron", "Neuron"),
    ProfileIconOption("capsule", "Capsule"),
    ProfileIconOption("microscope", "Microscope"),
    ProfileIconOption("heart", "Heart"),
    ProfileIconOption("book", "Book"),
)

const val DEFAULT_PROFILE_ICON = "stethoscope"

/** Ported verbatim from `src/data/profileIcons.ts:15-17` -- the server compares usernames the same normalised way, so a client-side check that used a different rule would pass locally and fail on save. */
fun normaliseUsername(value: String): String = value.trim().lowercase().replace(Regex("\\s+"), "-")

/**
 * The same five checks as `usernameProblem` in `src/data/profileIcons.ts:19-25`, in the same order --
 * a local rejection here must say the same thing the server would, or a
 * student sees one message locally and a different one after Save.
 */
fun usernameProblem(value: String): String? {
    val username = normaliseUsername(value)
    if (username.length < 3) return "Use at least 3 characters."
    if (username.length > 24) return "Use 24 characters or fewer."
    if (!Regex("^[a-z0-9][a-z0-9._-]*[a-z0-9]$").matches(username)) {
        return "Use letters, numbers, dots, underscores or hyphens; start and end with a letter or number."
    }
    if (username.contains("..") || username.contains("__") || username.contains("--")) return "Avoid repeated separators."
    return null
}
