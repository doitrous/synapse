package com.synapse.app.core.sync
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
class StateOwnershipTest {
    @Test fun userOwnedDottedFamilies() {
        listOf(
            "synapse.notebook.notes", "synapse.whiteboard.boards.v1",
            "synapse.qbank.session.2026-08", "synapse.flashcards.decks.v1",
            "synapse.flashcards.dailyCounts.v1", "synapse.annotations.v1.d-abc.s0",
            "synapse.reader.prefs", "synapse.bookmarks.resources.v1",
            "synapse.progress.mastery.v1", "synapse.maristanas.tour",
            "synapse.myDocuments.v1", "synapse.termgrid.state",
            "synapse.practical.progress", "synapse.essay.answers",
            "synapse.written.answers.v1",
            "synapse.highlights.x", "synapse.account.prefs",
            "synapse.calendar.blocks",
            "synapse.library.marks", "synapse.library.read",
            "synapse.library.userArticles", "synapse.library.personalTags",
        ).forEach { assertTrue(it, StateOwnership.isUserOwned(it)) }
    }
    @Test fun userOwnedExactAndHyphenated() {
        assertTrue(StateOwnership.isUserOwned("synapse-lang"))
        assertTrue(StateOwnership.isUserOwned("synapse-applied-voucher-v1"))
        assertTrue(StateOwnership.isUserOwned("synapse-notification-read-v1-user42"))
    }
    @Test fun sharedCatalogueKeysAreNotUserOwned() {
        listOf(
            "synapse-admin-content-ledger-v4", "synapse-lang-extra",
            "synapse.library", "synapse.calendar.blocks.extra",
            "synapse-applied-voucher-v1-x", "app_state",
        ).forEach { assertFalse(it, StateOwnership.isUserOwned(it)) }
    }
}
