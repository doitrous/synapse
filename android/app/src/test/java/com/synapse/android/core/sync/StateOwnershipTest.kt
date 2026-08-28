package com.synapse.android.core.sync

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class StateOwnershipTest {

    private val userOwned = listOf(
        "synapse-lang",
        "synapse.notebook.abc",
        "synapse.whiteboard.board-1",
        "synapse.calendar.blocks",
        "synapse.library.read",
        "synapse.library.userArticles",
        "synapse.library.personalTags",
        "synapse.library.marks.article-9",
        "synapse.account.profile",
        "synapse-notification-read-v1-camp1",
        "synapse-applied-voucher-v1",
        "synapse.qbank.activeSession.v1",
        "synapse.practical.ticks.station-2",
        "synapse.highlights.article-3",
        "synapse.annotations.doc-4",
        "synapse.reader.settings",
        "synapse.bookmarks.v1",
        "synapse.progress.attemptIndex.v1",
        "synapse.progress.attempts.2026-08",
    )

    private val catalogue = listOf(
        "synapse-admin-content-ledger-v4",
        "synapse-concept-graph-v2",
        "synapse-medical-library-taxonomy-v1",
        "synapse-plans-v1",
        "synapse-system-colors-v1",
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
        assertTrue(StateOwnership.isUserOwned("synapse.library.marks.article-1"))
    }

    @Test
    fun `synapse-lang matches only exactly`() {
        assertTrue(StateOwnership.isUserOwned("synapse-lang"))
        assertFalse(StateOwnership.isUserOwned("synapse-language-packs-v1"))
    }

    @Test
    fun `the path follows the ownership`() {
        assertEquals("/api/user-state/synapse.qbank.activeSession.v1",
            StateOwnership.pathFor("synapse.qbank.activeSession.v1"))
        assertEquals("/api/state/synapse-plans-v1",
            StateOwnership.pathFor("synapse-plans-v1"))
    }
}
