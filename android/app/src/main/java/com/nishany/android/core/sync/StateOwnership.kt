package com.nishany.android.core.sync

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

    // `src/lib/stateOwnership.ts` was rebranded to `nishany…` patterns; this
    // list was not. Both prefixes are matched below rather than replacing one
    // with the other, because [com.nishany.android.core.sync.SyncEngine]'s
    // own [com.nishany.android.core.sync.SyncEngine.USER_STATE_KEYS] still
    // spells its existing entries `synapse.qbank.…` and `synapse.practical.…`
    // -- the server canonicalises those on the wire (`stateKeys.js`), but this
    // regex runs before that, against the raw key, to pick the endpoint. A
    // key added after the rebrand (notebook, calendar tasks) is only ever
    // spelled `nishany…`, so it only needs that half added.
    private val userOwnedPatterns: List<Regex> = listOf(
        """^synapse-lang$""",
        """^nishany-lang$""",
        """^synapse\.notebook\.""",
        """^nishany\.notebook\.""",
        """^synapse\.whiteboard\.""",
        """^nishany\.whiteboard\.""",
        """^synapse\.calendar\.blocks$""",
        """^nishany\.calendar\.blocks$""",
        """^nishany\.calendar\.tasks""",
        """^synapse\.library\.(read|userArticles|personalTags|marks)""",
        """^nishany\.library\.(read|userArticles|personalTags|marks)""",
        """^synapse\.account\.""",
        """^nishany\.account\.""",
        """^synapse-notification-read-v1-""",
        """^nishany-notification-read-v1-""",
        """^synapse-applied-voucher-v1$""",
        """^nishany-applied-voucher-v1$""",
        """^synapse\.qbank\.""",
        """^nishany\.qbank\.""",
        """^synapse\.practical\.""",
        """^nishany\.practical\.""",
        """^synapse\.highlights\.""",
        """^nishany\.highlights\.""",
        """^synapse\.annotations\.""",
        """^nishany\.annotations\.""",
        """^synapse\.reader\.""",
        """^nishany\.reader\.""",
        """^synapse\.bookmarks\.""",
        """^nishany\.bookmarks\.""",
        """^synapse\.progress\.""",
        """^nishany\.progress\.""",
    ).map(::Regex)

    fun isUserOwned(key: String): Boolean =
        userOwnedPatterns.any { it.containsMatchIn(key) }

    fun pathFor(key: String): String =
        if (isUserOwned(key)) "/api/user-state/$key" else "/api/state/$key"
}
