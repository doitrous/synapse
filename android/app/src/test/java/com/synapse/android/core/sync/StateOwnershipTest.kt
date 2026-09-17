package com.synapse.android.core.sync

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class StateOwnershipTest {

    private val userOwned = listOf(
        "nishany-lang",
        "nishany.notebook.abc",
        "nishany.whiteboard.board-1",
        "nishany.calendar.blocks",
        "nishany.library.read",
        "nishany.library.userArticles",
        "nishany.library.personalTags",
        "nishany.library.marks.article-9",
        "nishany.account.profile",
        "nishany-notification-read-v1-camp1",
        "nishany-applied-voucher-v1",
        "nishany.qbank.activeSession.v1",
        "nishany.practical.ticks.station-2",
        "nishany.highlights.article-3",
        "nishany.annotations.doc-4",
        "nishany.reader.settings",
        "nishany.bookmarks.v1",
        "nishany.progress.attemptIndex.v1",
        "nishany.progress.attempts.2026-08",
    )

    private val catalogue = listOf(
        "nishany-admin-content-ledger-v4",
        "nishany-concept-graph-v2",
        "nishany-medical-library-taxonomy-v1",
        "nishany-plans-v1",
        "nishany-system-colors-v1",
    )

    @Test
    fun `every student-owned key routes to the user store`() {
        for (key in userOwned) assertTrue(key, StateOwnership.isUserOwned(key))
    }

    @Test
    fun `catalogue documents do not`() {
        for (key in catalogue) assertFalse(key, StateOwnership.isUserOwned(key))
    }

    @Test
    fun `library marks are user-owned`() {
        // Left out of the pattern list, marks route to the shared catalogue,
        // which only an admin may write — so every highlight a student made
        // would be refused by the server and dropped.
        assertTrue(StateOwnership.isUserOwned("nishany.library.marks.article-1"))
    }

    @Test
    fun `synapse-lang matches only exactly`() {
        assertTrue(StateOwnership.isUserOwned("nishany-lang"))
        assertFalse(StateOwnership.isUserOwned("nishany-language-packs-v1"))
    }

    @Test
    fun `the path follows the ownership`() {
        assertEquals("/api/user-state/nishany.qbank.activeSession.v1",
            StateOwnership.pathFor("nishany.qbank.activeSession.v1"))
        assertEquals("/api/state/nishany-plans-v1",
            StateOwnership.pathFor("nishany-plans-v1"))
    }
}
