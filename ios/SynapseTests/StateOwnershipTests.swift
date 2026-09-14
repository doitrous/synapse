import Foundation
import Testing
@testable import Synapse

/// These lock the iOS routing rules to the web app's.
///
/// The two must agree exactly. If they drift, nothing throws — a student's work
/// is simply written somewhere the other platform never looks, and it appears
/// to have vanished.
struct StateOwnershipTests {

    @Test("a student's own work is routed to their private store", arguments: [
        "nishany.qbank.marked.v1",
        "nishany.qbank.activeSession.v1",
        "nishany.progress.attempts.2026-08",
        "nishany.progress.mastery.v1",
        "nishany.notebook.notes",
        "nishany.calendar.blocks",
        "nishany.practical.progress.v1",
        "nishany.bookmarks.resources.v1",
        "nishany.library.read",
        "nishany.library.personalTags",
        "nishany.library.userArticles",
        "nishany.library.marks.v1",
        "nishany.annotations.v1.doc42.s0",
        "nishany.reader.fit",
        "nishany.account.prefs.v1",
        "nishany.whiteboard.board",
        "nishany.highlights.doc42",
        "nishany.terminology.progress.v1",
        "nishany-lang",
        "nishany-applied-voucher-v1",
        "nishany-notification-read-v1-student",
    ])
    func userOwned(key: String) {
        #expect(StateOwnership.isUserOwned(key), "\(key) must go to /api/user-state")
    }

    @Test("shared catalogue documents are not student-writable", arguments: [
        "nishany-admin-content-ledger-v4",
        "nishany-taxonomy-tree-v4",
        "nishany-concept-graph-v2",
        "nishany-system-colors-v1",
        "nishany-plans-v1",
        "nishany-medical-glossary-v1",
    ])
    func shared(key: String) {
        #expect(!StateOwnership.isUserOwned(key), "\(key) must go to /api/state")
    }

    /// The dotted prefix is what distinguishes the two stores, so a key that
    /// merely starts with the same letters must not be captured.
    @Test("the match is anchored, not a substring")
    func anchoring() {
        #expect(!StateOwnership.isUserOwned("prefixed-synapse.qbank.marked"))
        #expect(!StateOwnership.isUserOwned("nishany-qbank-marked"))
        #expect(!StateOwnership.isUserOwned("nishany-langx"))
        // `synapse-lang` is anchored at both ends, unlike the dotted families.
        #expect(StateOwnership.isUserOwned("nishany-lang"))
    }

    /// This is the one the web app's own comment warns about: a stale local copy
    /// that wins by default will re-upload itself and silently revert newer work.
    @Suite("Precedence between a local copy and the server's")
    struct Precedence {

        @Test("a local edit made after the server's write wins")
        func newerLocalWins() {
            let server = Date(timeIntervalSince1970: 1_000)
            let local = Date(timeIntervalSince1970: 2_000)
            #expect(StatePrecedence.localCopyWins(localSavedAt: local, serverUpdatedAt: server))
        }

        @Test("an older local copy loses")
        func olderLocalLoses() {
            let server = Date(timeIntervalSince1970: 2_000)
            let local = Date(timeIntervalSince1970: 1_000)
            #expect(!StatePrecedence.localCopyWins(localSavedAt: local, serverUpdatedAt: server))
        }

        @Test("an equal timestamp means the server already has this write")
        func equalLoses() {
            let when = Date(timeIntervalSince1970: 1_500)
            #expect(!StatePrecedence.localCopyWins(localSavedAt: when, serverUpdatedAt: when))
        }

        @Test("with nothing stored on the server, the offline edit is kept")
        func noServerCopy() {
            #expect(StatePrecedence.localCopyWins(localSavedAt: Date(), serverUpdatedAt: nil))
        }

        @Test("with no local copy there is nothing to prefer")
        func noLocalCopy() {
            #expect(!StatePrecedence.localCopyWins(localSavedAt: nil, serverUpdatedAt: Date()))
            #expect(!StatePrecedence.localCopyWins(localSavedAt: nil, serverUpdatedAt: nil))
        }
    }
}
