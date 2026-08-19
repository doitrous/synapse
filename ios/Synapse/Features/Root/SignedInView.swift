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
    @State private var strings = Localisation()

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
        // The whole app, in the student's language and reading in its
        // direction. Applied once at the root: SwiftUI lays out in leading and
        // trailing rather than left and right, so flipping this flips every
        // stack, list and navigation bar beneath it at once.
        .environment(\.strings, strings)
        .environment(\.layoutDirection, strings.layoutDirection)
        .environment(\.locale, strings.language.locale)
        .task {
            await start()
            await strings.load()
        }
    }

    /// Five tabs, deliberately.
    ///
    /// A sixth makes iOS fold one away into "More", and the one it folds is the
    /// last — so a study surface would disappear behind a menu. Account is
    /// reached from the Today screen instead: it is opened once a term, not
    /// once a session.
    private func tabs(_ container: Container) -> some View {
        let audience = container.audienceStore.audience

        return TabView {
            Tab(strings("Today"), systemImage: "sun.max") {
                DashboardView(
                    store: container.store, sync: container.sync,
                    user: user, auth: auth, audienceStore: container.audienceStore
                )
            }
            Tab(strings("Library"), systemImage: "books.vertical") {
                LibraryView(store: container.store, sync: container.sync, audience: audience)
            }
            Tab(strings("Questions"), systemImage: "questionmark.circle") {
                QuestionBankView(store: container.store, sync: container.sync, api: auth.api, audience: audience)
            }
            Tab(strings("Resources"), systemImage: "folder") {
                ResourcesView(store: container.store, sync: container.sync, audience: audience, api: auth.api)
            }
            Tab(strings("More"), systemImage: "square.grid.2x2") {
                MoreView(
                    store: container.store, sync: container.sync,
                    audience: audience, audienceStore: container.audienceStore,
                    api: auth.api
                )
            }
        }
        .tint(Theme.accent)
        // Rebuild the surfaces when the cohort resolves, so a student who set
        // their year a moment ago is not still looking at everyone's content.
        .id(audience)
    }

    private func start() async {
        guard container == nil else { return }
        do {
            let store = try LocalStore(path: LocalStore.defaultURL().path)
            let sync = SyncEngine(api: auth.api, store: store)
            strings = Localisation(api: auth.api, sync: sync)
            let audienceStore = AudienceStore(api: auth.api, store: store, sync: sync)
            container = Container(store: store, sync: sync, audienceStore: audienceStore)

            await sync.refresh()
            // After the sync: resolving the cohort needs the universities
            // catalogue, which the sync is what fetches.
            await audienceStore.load()
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
        let audienceStore: AudienceStore
    }
}

/// Account, sync state, and signing out.
struct AccountView: View {
    @Environment(\.strings) private var strings

    let user: SessionUser
    let auth: AuthModel
    let sync: SyncEngine
    let audienceStore: AudienceStore

    @State private var university = ""
    @State private var year = ""

    var body: some View {
        NavigationStack {
            List {
                Section("Account") {
                    row("Email", user.email ?? "—")
                    row("Role", user.role)
                }
                .listRowBackground(Theme.surface)

                cohort

                Section {
                    // In each language's own name. Someone looking for Arabic
                    // is looking for "العربية", not for the English word for it.
                    Picker(strings("Language"), selection: Binding(
                        get: { strings.language },
                        set: { chosen in Task { await strings.set(chosen) } }
                    )) {
                        ForEach(AppLanguage.allCases, id: \.self) {
                            Text($0.ownName).tag($0)
                        }
                    }
                    .pickerStyle(.segmented)
                } header: {
                    Text(strings("Language"))
                } footer: {
                    Text(strings("Applies everywhere, and follows you to the website."))
                        .font(Theme.ui(12))
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

    /// Where a student says which cohort they are in.
    ///
    /// The roster wins when it has a row, and then this is read-only — a
    /// student overriding their own university would quietly change what they
    /// are shown and what their results are compared against. When the roster
    /// has nothing, saying so themselves is the only way the year-scoped
    /// content can reach them at all.
    @ViewBuilder
    private var cohort: some View {
        Section {
            if audienceStore.fromRoster {
                row("University", universityName)
                row("Year", audienceStore.audience.year)
            } else if audienceStore.universities.isEmpty {
                Text("The university list has not downloaded yet.")
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            } else {
                Picker("University", selection: $university) {
                    Text("Not set").tag("")
                    ForEach(audienceStore.universities) { Text($0.name).tag($0.id) }
                }
                Picker("Year", selection: $year) {
                    Text("Not set").tag("")
                    ForEach(years, id: \.self) { Text($0).tag($0) }
                }
                Button("Save") {
                    Task {
                        await audienceStore.declare(
                            StudentAudience(universityId: university, year: year)
                        )
                    }
                }
                .tint(Theme.accent)
                .disabled(university.isEmpty || year.isEmpty)
            }
        } header: {
            Text("Your cohort")
        } footer: {
            Text(audienceStore.fromRoster
                 ? "Set by your university."
                 : "Your university has not set up your profile, so you can say which year you are in. It decides which content is meant for you.")
                .font(Theme.ui(12))
                .foregroundStyle(Theme.ink3)
        }
        .listRowBackground(Theme.surface)
        .onAppear {
            university = audienceStore.audience.universityId
            year = audienceStore.audience.year
        }
    }

    private var universityName: String {
        audienceStore.universities.first { $0.id == audienceStore.audience.universityId }?.name
            ?? audienceStore.audience.universityId
    }

    /// The years the chosen university actually runs, falling back to a sane
    /// list when the catalogue does not name them.
    private var years: [String] {
        let listed = audienceStore.universities.first { $0.id == university }?.yearLabels ?? []
        return listed.isEmpty
            ? ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Internship 1"]
            : listed
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
