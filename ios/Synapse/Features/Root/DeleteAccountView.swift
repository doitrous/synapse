import SwiftUI

/// Deleting an account, from inside the app.
///
/// Required by App Store guideline 5.1.1(v), and written on the assumption that
/// the student means it but may not have understood it. So the consequence is
/// stated in full before the button exists at all, and the button only appears
/// once they have typed the word — not because a typed word is a security
/// measure, but because it is the difference between reading the warning and
/// having read it.
///
/// There is no grace period and no way back. That is worth saying plainly here
/// rather than discovering afterwards.
struct DeleteAccountView: View {
    let auth: AuthModel

    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss

    @State private var typed = ""
    @State private var isDeleting = false
    @State private var failure: String?

    /// Typed to confirm. Deliberately a word rather than the email address:
    /// an address can be copied from the field above it without being read.
    private let confirmation = "DELETE"

    private var canDelete: Bool {
        typed.trimmed.uppercased() == confirmation && !isDeleting
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 12) {
                        Text(strings("This cannot be undone."))
                            .font(Theme.ui(15).weight(.semibold))
                            .foregroundStyle(Theme.ink)

                        Text(strings("Deleting your account removes your notes, highlights and annotations, your whiteboards, your study plan, and your whole answer history. Support cannot recover any of it afterwards."))
                            .font(Theme.ui(13.5))
                            .foregroundStyle(Theme.ink2)

                        Text(strings("Your account on the website is the same account, so it is deleted too."))
                            .font(Theme.ui(13.5))
                            .foregroundStyle(Theme.ink2)
                    }
                    .padding(.vertical, 4)
                }
                .listRowBackground(Theme.surface)

                Section {
                    TextField(strings("Type DELETE"), text: $typed)
                        .font(Theme.ui(15))
                        .textInputAutocapitalization(.characters)
                        .autocorrectionDisabled()
                        .disabled(isDeleting)
                } header: {
                    Text(strings("To confirm, type DELETE"))
                } footer: {
                    if let failure {
                        Text(failure)
                            .font(Theme.ui(12.5))
                            .foregroundStyle(Theme.danger)
                    }
                }
                .listRowBackground(Theme.surface)

                Section {
                    Button(role: .destructive) {
                        Task { await delete() }
                    } label: {
                        HStack {
                            if isDeleting { ProgressView().controlSize(.small) }
                            Text(strings(isDeleting ? "Deleting…" : "Delete my account"))
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .disabled(!canDelete)
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("Delete account"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button(strings("Cancel")) { dismiss() }
                        .tint(Theme.primary)
                        .disabled(isDeleting)
                }
            }
        }
        .interactiveDismissDisabled(isDeleting)
    }

    private func delete() async {
        guard canDelete else { return }
        isDeleting = true
        failure = nil
        defer { isDeleting = false }

        do {
            // Before the account goes, while the token that authorises removing
            // this device is still valid.
            await PushRegistrar.shared.signOut()
            try await auth.api.deleteAccount()
            // The records are gone; the session in memory is not, and a signed
            // -in app with no account behind it shows failures on every screen.
            await auth.signOut()
        } catch {
            // Nothing was deleted — the server does the whole thing in one
            // transaction — so saying "try again" is honest rather than hopeful.
            failure = strings("Your account was not deleted. Nothing has been removed. Please check your connection and try again.")
        }
    }
}
