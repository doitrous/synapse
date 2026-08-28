package com.synapse.android.core.sync

/**
 * Which of the two document stores a key belongs to.
 *
 * A direct port of `USER_OWNED_PATTERNS` in `src/lib/stateOwnership.ts`, and it
 * must stay one. The server decides the owner from the verified session, so a
 * mismatch here is not a security hole — it is worse in a quieter way: the
 * phone writes a student's work to a key the web app never reads, and it is
 * simply not there when they open a laptop. Neither side reports an error.
 */
object StateOwnership {

    private val userOwnedPatterns: List<Regex> = listOf(
        """^synapse-lang$""",
        """^synapse\.notebook\.""",
        """^synapse\.whiteboard\.""",
        """^synapse\.calendar\.blocks$""",
        """^synapse\.library\.(read|userArticles|personalTags|marks)""",
        """^synapse\.account\.""",
        """^synapse-notification-read-v1-""",
        """^synapse-applied-voucher-v1$""",
        """^synapse\.qbank\.""",
        """^synapse\.practical\.""",
        """^synapse\.highlights\.""",
        """^synapse\.annotations\.""",
        """^synapse\.reader\.""",
        """^synapse\.bookmarks\.""",
        """^synapse\.progress\.""",
    ).map(::Regex)

    fun isUserOwned(key: String): Boolean =
        userOwnedPatterns.any { it.containsMatchIn(key) }

    fun pathFor(key: String): String =
        if (isUserOwned(key)) "/api/user-state/$key" else "/api/state/$key"
}
