import SwiftUI

/// The app once someone is signed in.
///
/// Holds the two things every surface depends on — the local cache and the sync
/// engine — and builds them once. Screens receive the store; only `SyncEngine`
/// talks to the network.
struct SignedInView: View {
    let user: SessionUser
    let auth: AuthModel

    @State private var container: Container?
    @State private var failure: String?

    var body: some View {
        Group {
            if let container {
                tabs(container)
            } else if let failure {
                EmptyStateView(
                    symbol: "exclamationmark.triangle",
                    title: "Synapse could not start",
                    detail: failure
                )
            } else {
                ProgressView().tint(Theme.accent)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Theme.paper)
            }
        }
        .task { await start() }
    }

    /// Five tabs, deliberately.
    ///
    /// A sixth makes iOS fold one away into "More", and the one it folds is the
    /// last — so a study surface would disappear behind a menu. Account is
    /// reached from the Today screen instead: it is opened once a term, not
    /// once a session.
    private func tabs(_ container: Container) -> some View {
        TabView {
            Tab("Today", systemImage: "sun.max") {
                DashboardView(store: container.store, sync: container.sync, user: user, auth: auth)
            }
            Tab("Library", systemImage: "books.vertical") {
                LibraryView(
                    store: container.store, sync: container.sync,
                    universityId: nil, yearId: nil
                )
            }
            Tab("Questions", systemImage: "questionmark.circle") {
                QuestionBankView(
                    store: container.store, sync: container.sync,
                    universityId: nil, yearId: nil
                )
            }
            Tab("Resources", systemImage: "folder") {
                ResourcesView(
                    store: container.store, sync: container.sync,
                    universityId: nil, yearId: nil
                )
            }
            Tab("Progress", systemImage: "chart.bar") {
                PerformanceView(store: container.store, sync: container.sync)
            }
        }
        .tint(Theme.accent)
    }

    private func start() async {
        guard container == nil else { return }
        do {
            let store = try LocalStore(path: LocalStore.defaultURL().path)
            let sync = SyncEngine(api: auth.api, store: store)
            container = Container(store: store, sync: sync)
            await sync.refresh()
        } catch {
            // The cache could not be opened — a full disk, or a file the app
            // cannot write. Say so rather than showing an empty library, which
            // would look like missing content.
            failure = "The offline store could not be opened. \(error.localizedDescription)"
        }
    }

    private struct Container {
        let store: LocalStore
        let sync: SyncEngine
    }
}

/// Account, sync state, and signing out.
struct AccountView: View {
    let user: SessionUser
    let auth: AuthModel
    let sync: SyncEngine

    var body: some View {
        NavigationStack {
            List {
                Section("Account") {
                    row("Email", user.email ?? "—")
                    row("Role", user.role)
                }
                .listRowBackground(Theme.surface)

                Section("Sync") {
                    row("Status", statusText)
                    if sync.pendingUploads > 0 {
                        // Work that has not reached the server yet. Worth
                        // surfacing: it is the difference between "saved" and
                        // "saved on this phone only".
                        row("Waiting to upload", "\(sync.pendingUploads)")
                    }
                    Button("Refresh now") {
                        Task { await sync.refresh() }
                    }
                    .tint(Theme.accent)
                }
                .listRowBackground(Theme.surface)

                Section {
                    Button("Sign out", role: .destructive) {
                        Task {
                            await sync.clearForSignOut()
                            await auth.signOut()
                        }
                    }
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle("Account")
        }
    }

    private var statusText: String {
        switch sync.status {
        case .idle: "Not synced yet"
        case .syncing: "Syncing…"
        case .done(let changed, _): changed == 0 ? "Up to date" : "Updated \(changed) catalogue\(changed == 1 ? "" : "s")"
        case .failed(let message): message
        }
    }

    private func row(_ label: LocalizedStringKey, _ value: String) -> some View {
        HStack {
            Text(label)
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)
            Spacer()
            Text(value)
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink)
        }
    }
}
