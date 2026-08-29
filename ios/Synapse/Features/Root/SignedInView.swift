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
    @State private var theme = ThemeStore()
    /// One assistant for the app: the quota is a single server fact, and a
    /// conversation should survive moving between surfaces.
    @State private var assistant = AssistantModel()
    /// Which tab is showing, so a screen settles on arrival rather than on
    /// every redraw.
    @State private var tab = Destination.today

    enum Destination: String, Hashable { case today, questions, flashcards, library, more }

    var body: some View {
        Group {
            if let container {
                tabs(container)
            } else if let failure {
                EmptyStateView(
                    symbol: "exclamationmark.triangle",
                    title: "Nishany could not start",
                    detail: failure
                )
            } else {
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Theme.paper)
            }
        }
        // The whole app, in the student's language and reading in its
        // direction. Applied once at the root: SwiftUI lays out in leading and
        // trailing rather than left and right, so flipping this flips every
        // stack, list and navigation bar beneath it at once.
        .environment(\.strings, strings)
        .environment(\.themeStore, theme)
        .environment(\.assistant, assistant)
        // The palette is read through static members, so a change repaints by
        // rebuilding the tree beneath rather than by observation.
        .id(theme.appearance)
        .environment(\.layoutDirection, strings.layoutDirection)
        .environment(\.locale, strings.language.locale)
        .task {
            await start()
            await strings.load()
            // Asked once, at the root: every entry point checks the answer
            // before drawing itself.
            await assistant.loadStatus()
        }
        // A tapped daily reminder brings the Today tab forward; DashboardView
        // hosts the Question of the Day card and sheet, so it consumes the
        // "/app/qotd" route and opens the screen. Any other route is handled
        // (and consumed) here.
        .onChange(of: PushRegistrar.shared.pendingRoute) { _, route in
            guard let route else { return }
            tab = .today
            if route != "/app/qotd" { _ = PushRegistrar.shared.consumePendingRoute() }
        }
    }

    /// Five tabs, deliberately — the two surfaces a student opens every day get
    /// one, the rest are one tap deeper.
    ///
    /// iOS folds a sixth tab into a menu it names itself, so five is the budget.
    /// Questions and Flashcards are the daily practice-and-review loop and each
    /// earns a slot; the Library holds all reading, with Resources reached from
    /// its toolbar; everything occasional lives in the More hub. Account is
    /// reached from the Today screen: it is opened once a term, not once a
    /// session.
    private func tabs(_ container: Container) -> some View {
        let audience = container.audienceStore.audience

        return TabView(selection: $tab) {
            Tab(strings("Today"), systemImage: "sun.max", value: Destination.today) {
                DashboardView(
                    store: container.store, sync: container.sync,
                    user: user, auth: auth, audienceStore: container.audienceStore,
                    openTab: { tab = $0 }
                )
            }
            Tab(strings("Questions"), systemImage: "questionmark.circle", value: Destination.questions) {
                QuestionBankView(store: container.store, sync: container.sync, api: auth.api, audience: audience)
            }
            Tab(strings("Flashcards"), systemImage: "rectangle.on.rectangle.angled", value: Destination.flashcards) {
                FlashcardsView(store: container.store, sync: container.sync, api: auth.api, audience: audience)
            }
            Tab(strings("Library"), systemImage: "books.vertical", value: Destination.library) {
                LibraryView(store: container.store, sync: container.sync, api: auth.api, audience: audience)
            }
            Tab(strings("More"), systemImage: "square.grid.2x2", value: Destination.more) {
                MoreView(
                    store: container.store, sync: container.sync,
                    audience: audience, audienceStore: container.audienceStore,
                    api: auth.api
                )
            }
        }
        .tint(Theme.primary)
        // Eight points on arrival, keyed on the destination: the shell stays
        // put and only the page beneath it re-settles.
        .screenIn(tab)
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
            assistant = AssistantModel(api: auth.api)
            let audienceStore = AudienceStore(api: auth.api, store: store, sync: sync)
            container = Container(store: store, sync: sync, audienceStore: audienceStore)

            // Instant sync: a change made on the website nudges this device,
            // which then refreshes through the ordinary path. Set before the
            // first refresh so a nudge arriving during it is not dropped.
            PushRegistrar.shared.onNudge = { [weak sync] in await sync?.refresh() }
            await PushRegistrar.shared.start(api: auth.api)

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
    @Environment(\.themeStore) private var theme

    let user: SessionUser
    let auth: AuthModel
    let sync: SyncEngine
    let audienceStore: AudienceStore

    @State private var university = ""
    @State private var year = ""
    @State private var prefs: AccountPrefsStore
    @State private var deletingAccount = false

    init(user: SessionUser, auth: AuthModel, sync: SyncEngine, audienceStore: AudienceStore) {
        self.user = user
        self.auth = auth
        self.sync = sync
        self.audienceStore = audienceStore
        _prefs = State(wrappedValue: AccountPrefsStore(api: auth.api, sync: sync))
    }

    var body: some View {
        NavigationStack {
            List {
                Section(strings("Account")) {
                    row("Email", user.email ?? "—")
                    row("Role", user.role)
                }
                .listRowBackground(Theme.surface)

                cohort

                Section {
                    Picker(strings("Theme"), selection: Binding(
                        get: { theme.appearance },
                        set: { theme.use($0) }
                    )) {
                        ForEach(AppTheme.allCases, id: \.self) {
                            Text(strings($0.label)).tag($0)
                        }
                    }
                    .pickerStyle(.menu)
                } header: {
                    Text(strings("Appearance"))
                } footer: {
                    Text(strings("Warm is the paper-coloured ground. Light and dark are the same tokens on a cooler one."))
                        .font(Theme.ui(12))
                }
                .listRowBackground(Theme.surface)

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

                Section {
                    // Two choices rather than one: wanting to be told a lecture
                    // moved is not the same as wanting to be told a concept is
                    // fading.
                    //
                    // Rows rather than `Toggle`s. This is the third place in
                    // the app where a stock control drew itself correctly and
                    // then took no taps at all, and the fix is the same one the
                    // resources filter and the question-bank footer already
                    // use: a plain button that says what it is.
                    switchRow("Review reminders", on: prefs.prefs.reviewReminders) {
                        Task { await prefs.set(reviewReminders: !prefs.prefs.reviewReminders) }
                    }
                    switchRow("Timetable reminders", on: prefs.prefs.calendarReminders) {
                        Task { await prefs.set(calendarReminders: !prefs.prefs.calendarReminders) }
                    }
                    row("Time zone", prefs.prefs.timezone)
                } header: {
                    Text(strings("Reminders"))
                } footer: {
                    Text(strings("Reminders are sent from the server, so it records the time zone this phone is in."))
                        .font(Theme.ui(12))
                }
                .tint(Theme.primary)
                .listRowBackground(Theme.surface)

                Section(strings("Sync")) {
                    row("Status", statusText)
                    // Whether a change made elsewhere reaches this phone at
                    // once or waits for the next refresh. Worth saying: the
                    // difference is invisible until you are looking for it.
                    row("Instant updates", instantUpdates)
                    if sync.pendingUploads > 0 {
                        // Work that has not reached the server yet. Worth
                        // surfacing: it is the difference between "saved" and
                        // "saved on this phone only".
                        row("Waiting to upload", "\(sync.pendingUploads)")
                    }
                    Button(strings("Refresh now")) {
                        Task { await sync.refresh() }
                    }
                    .tint(Theme.primary)
                }
                .listRowBackground(Theme.surface)

                Section {
                    Button(strings("Sign out"), role: .destructive) {
                        Task {
                            await sync.clearForSignOut()
                            // Before the session goes: the token that
                            // authorises removing this device is the one about
                            // to be discarded, and a row left behind would send
                            // this student's nudges to whoever signs in next.
                            await PushRegistrar.shared.signOut()
                            await auth.signOut()
                        }
                    }
                }
                .listRowBackground(Theme.surface)

                Section {
                    // Required to exist in the app by App Store guideline
                    // 5.1.1(v), and separated from signing out because the two
                    // are one tap apart and only one of them is reversible.
                    Button(role: .destructive) { deletingAccount = true } label: {
                        Text(strings("Delete account"))
                    }
                } footer: {
                    Text(strings("Removes your account and everything in it, on the app and the website. This cannot be undone."))
                        .font(Theme.ui(12))
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("Account"))
            .sheet(isPresented: $deletingAccount) {
                DeleteAccountView(auth: auth)
            .localisedSheet()
            }
        }
        .task {
            await prefs.load()
            // Recorded on arrival, so a student who has travelled is not sent a
            // reminder at four in the morning by a server that still thinks
            // they are where they signed up.
            await prefs.syncTimezone()
        }
    }

    /// Whether the silent nudge is working, in a student's terms.
    private var instantUpdates: String {
        let push = PushRegistrar.shared
        // A nudge that has actually arrived is the strongest evidence there is,
        // and it is reported first: a device can be woken without this build
        // ever having completed registration, and saying "off" while updates
        // are visibly arriving would be a readout that lies.
        if push.nudgesReceived > 0 { return "On · \(push.nudgesReceived) received" }
        if push.isRegistered { return "On" }
        // Never registered is the ordinary case on a simulator, and on a device
        // with no push entitlement. Sync still works; it just is not instant.
        return push.deviceToken == nil ? "Off — updates arrive on refresh" : "Registering"
    }

    /// A setting that is either on or off, as a row that actually responds.
    private func switchRow(
        _ label: LocalizedStringKey, on: Bool, toggle: @escaping () -> Void
    ) -> some View {
        Button(action: toggle) {
            HStack {
                Text(label)
                    .font(Theme.ui(15))
                    .foregroundStyle(Theme.ink)
                Spacer()
                Image(systemName: on ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 20))
                    .foregroundStyle(on ? Theme.primary : Theme.ink3)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(on ? [.isButton, .isSelected] : .isButton)
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
                Text(strings("The university list has not downloaded yet."))
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            } else {
                Picker("University", selection: $university) {
                    Text(strings("Not set")).tag("")
                    ForEach(audienceStore.universities) { Text($0.name).tag($0.id) }
                }
                Picker("Year", selection: $year) {
                    Text(strings("Not set")).tag("")
                    ForEach(years, id: \.self) { Text($0).tag($0) }
                }
                Button(strings("Save")) {
                    Task {
                        await audienceStore.declare(
                            StudentAudience(universityId: university, year: year)
                        )
                    }
                }
                .tint(Theme.primary)
                .disabled(university.isEmpty || year.isEmpty)
            }
        } header: {
            Text(strings("Your cohort"))
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
