import Foundation

/// Which of the two document stores a key belongs to.
///
/// A direct port of `USER_OWNED_PATTERNS` in `src/lib/stateOwnership.ts`, and it
/// must stay a direct port. The server decides the owner from the verified
/// session, so a mismatch here is not a security hole — it is worse in a
/// quieter way: the phone would write a student's notes to a key the web app
/// never reads, and their work would simply not be there when they opened a
/// laptop. Neither side would report an error.
///
/// The convention the patterns encode: a dotted prefix (`nishany.qbank.…`)
/// means the document belongs to one student.
enum StateOwnership {

    private static let userOwnedPatterns: [NSRegularExpression] = {
        let sources = [
            "^nishany-lang$",
            "^nishany\\.notebook\\.",
            "^nishany\\.whiteboard\\.",
            "^nishany\\.calendar\\.blocks$",
            "^nishany\\.library\\.(read|userArticles|personalTags|marks)",
            "^nishany\\.account\\.",
            "^nishany-notification-read-v1-",
            "^nishany-applied-voucher-v1$",
            "^nishany\\.qbank\\.",
            "^nishany\\.flashcards\\.",
            "^nishany\\.practical\\.",
            "^nishany\\.essay\\.",
            "^nishany\\.highlights\\.",
            "^nishany\\.annotations\\.",
            "^nishany\\.reader\\.",
            "^nishany\\.bookmarks\\.",
            "^nishany\\.progress\\.",
            "^nishany\\.terminology\\.",
            "^nishany\\.myDocuments\\.",
            "^nishany\\.termgrid\\.",
        ]
        return sources.compactMap { try? NSRegularExpression(pattern: $0) }
    }()

    /// True when this document belongs to the signed-in student rather than to
    /// the shared catalogue.
    static func isUserOwned(_ key: String) -> Bool {
        let range = NSRange(key.startIndex..., in: key)
        return userOwnedPatterns.contains { $0.firstMatch(in: key, range: range) != nil }
    }
}

/// Who wins when the device holds a copy of a document the server also has.
///
/// A port of `recoveryCopyWins` in `src/lib/statePrecedence.ts`. The rule is
/// deliberately conservative: a local copy may only win when it can be *shown*
/// to be newer. Letting it win by default is how an idle device re-uploads
/// stale data and silently reverts work done elsewhere.
enum StatePrecedence {

    /// - Parameters:
    ///   - localSavedAt: when the device last wrote its copy, or nil if it has none.
    ///   - serverUpdatedAt: the server's own stamp, or nil if the key was never written.
    static func localCopyWins(localSavedAt: Date?, serverUpdatedAt: Date?) -> Bool {
        guard let localSavedAt else { return false }
        // Nothing on the server to compare against — an unwritten key, or an
        // older server that does not send the stamp — so keep the offline edit.
        guard let serverUpdatedAt else { return true }
        // Strictly newer. An equal stamp means the server already has this write.
        return localSavedAt > serverUpdatedAt
    }
}
