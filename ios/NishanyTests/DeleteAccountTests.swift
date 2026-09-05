import Testing
@testable import Nishany

/// Deleting an account.
///
/// The confirmation rule, which is the only part of this the app decides — the
/// erasing itself is the server's, and is tested there against the schema.
@Suite struct DeleteAccountTests {

    /// Mirrors `DeleteAccountView.canDelete`.
    private func confirms(_ typed: String) -> Bool {
        typed.trimmingCharacters(in: .whitespacesAndNewlines).uppercased() == "DELETE"
    }

    @Test func theWordHasToBeTypedBeforeAnythingCanHappen() {
        #expect(!confirms(""))
        #expect(!confirms("delet"))
        #expect(!confirms("my account"))
        // A near miss is still a miss: this is the last point at which a
        // student who misunderstood can be stopped.
        #expect(!confirms("DELETE MY ACCOUNT"))
    }

    @Test func aStudentWhoTypedItProperlyIsNotFoughtOverCaseOrSpacing() {
        // Having read the warning is the point, not typing precision. iOS
        // capitalises and a keyboard adds trailing spaces.
        #expect(confirms("DELETE"))
        #expect(confirms("delete"))
        #expect(confirms("Delete"))
        #expect(confirms("  DELETE  "))
    }
}
