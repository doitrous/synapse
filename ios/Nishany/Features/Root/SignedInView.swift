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
    /// Set once `/api/me` answers and `aiConsentAt` is missing. Stays false
    /// while that request is in flight, so a slow network never flashes the
    /// sheet on for a student who already agreed.
    @State private var showingAIDisclaimer = false

    enum Destination: String, Hashable { case today, library, questions, resources, more }

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
            await checkAIConsent()
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
        .sheet(isPresented: $showingAIDisclaimer) {
            AIDisclaimerView(api: auth.api)
                .localisedSheet()
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

        return TabView(selection: $tab) {
            Tab(strings("Today"), systemImage: "sun.max", value: Destination.today) {
                DashboardView(
                    store: container.store, sync: container.sync,
                    user: user, auth: auth, audienceStore: container.audienceStore,
                    openTab: { tab = $0 }
                )
            }
            Tab(strings("Library"), systemImage: "books.vertical", value: Destination.library) {
                LibraryView(store: container.store, sync: container.sync, api: auth.api, audience: audience)
            }
            Tab(strings("Questions"), systemImage: "questionmark.circle", value: Destination.questions) {
                QuestionBankView(store: container.store, sync: container.sync, api: auth.api, audience: audience)
            }
            Tab(strings("Resources"), systemImage: "folder", value: Destination.resources) {
                ResourcesView(store: container.store, sync: container.sync, audience: audience, api: auth.api)
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

    /// Gate the AI disclaimer on the account, not on this install.
    ///
    /// A missing or offline `/api/me` leaves this false rather than showing
    /// the sheet: flashing a consent prompt at a student who is simply
    /// offline, every time they are offline, would be worse than asking once
    /// more than strictly necessary the next time the request succeeds.
    private func checkAIConsent() async {
        guard let me = try? await auth.api.me() else { return }
        showingAIDisclaimer = me.aiConsentAt == nil
    }

    private struct Container {
        let store: LocalStore
        let sync: SyncEngine
        let audienceStore: AudienceStore
    }
}
