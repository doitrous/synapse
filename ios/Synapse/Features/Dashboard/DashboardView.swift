import SwiftUI

/// What to do next.
///
/// The product's first principle is answering "what should I study today?", so
/// this leads with what is actually outstanding rather than with a wall of
/// totals. Everything is computed from the local record, so it is right offline
/// and right immediately after a sitting.
struct DashboardView: View {
    @Environment(\.strings) private var strings
    @State private var model: PerformanceModel
    @State private var mastery: MasteryModel
    let sync: SyncEngine
    let library: LocalStore
    let user: SessionUser
    let auth: AuthModel
    let audienceStore: AudienceStore

    @State private var articleCount = 0
    @State private var questionCount = 0
    @State private var showingAccount = false
    @State private var showingQotd = false
    /// Both calendars, merged, so "what is next" answers from whichever has it.
    /// Concept id → the name a person would recognise.
    ///
    /// The review queue is keyed by concept id, and an id is not a thing a
    /// student can act on: "CON-CVS-5692E7C9DCE9F5 is due" tells them nothing
    /// about what to open.
    @State private var conceptLabels: [String: String] = [:]
    @State private var upcoming: [UpcomingItem] = []
    @State private var recent: [RecentResource] = []
    private let api: SynapseAPI

    init(store: LocalStore, sync: SyncEngine, user: SessionUser, auth: AuthModel, audienceStore: AudienceStore) {
        _model = State(wrappedValue: PerformanceModel(store: store))
        _mastery = State(wrappedValue: MasteryModel(api: auth.api, sync: sync))
        self.sync = sync
        self.library = store
        self.user = user
        self.auth = auth
        self.audienceStore = audienceStore
        self.api = auth.api
    }

    private var audience: StudentAudience { audienceStore.audience }

    /// Open the Question of the Day if a reminder tap asked for it, and consume
    /// the pending route so it fires once.
    private func openQotdIfRequested() {
        guard PushRegistrar.shared.pendingRoute == "/app/qotd" else { return }
        _ = PushRegistrar.shared.consumePendingRoute()
        showingQotd = true
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    QotdCard { showingQotd = true }
                    if model.summary.attempts == 0 {
                        firstRun
                        nextOnSchedule
                    } else {
                        todayLine
                        nextOnSchedule
                        dueReviews
                        stats
                        weakest
                    }
                    lastUsed
                    catalogue
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .navigationTitle(strings("Today"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantButton(surface: "Dashboard")
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showingAccount = true } label: {
                        Image(systemName: "person.crop.circle")
                    }
                    .tint(Theme.primary)
                    .accessibilityLabel(strings("Account"))
                }
            }
            .sheet(isPresented: $showingAccount) {
                AccountView(user: user, auth: auth, sync: sync, audienceStore: audienceStore)
            .localisedSheet()
            }
            .sheet(isPresented: $showingQotd) {
                QotdView(store: library, sync: sync, api: api, audience: audience)
            }
        }
        .task {
            await mastery.load()
            await refresh()
            openQotdIfRequested()
        }
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await refresh(); await mastery.load() } }
        }
        // A tapped daily reminder deep-links here. Consuming the route is this
        // screen's job — SignedInView only brings the Today tab forward.
        .onChange(of: PushRegistrar.shared.pendingRoute) { _, _ in openQotdIfRequested() }
        .refreshable {
            await sync.refresh()
            await mastery.load()
            await refresh()
        }
    }

    /// Counts what the student can actually open, not what is in the ledger.
    ///
    /// `itemCount` includes drafts and items under review — 290 rather than
    /// 162 here — and telling someone their library holds a hundred articles
    /// they cannot reach is worse than telling them nothing.
    private func refresh() async {
        await model.load()
        articleCount = (try? await library.items(kind: .article, audience: audience).count) ?? 0
        questionCount = (try? await library.items(kind: .question, audience: audience).count) ?? 0

        // Two calendars with two owners, read as one list. A student whose
        // university has published nothing — which is most of them, most of the
        // time — still has their own plan to be told about.
        let universities = try? await library.catalogue(key: SyncEngine.universitiesKey)
        let schedules = try? await library.catalogue(key: SyncEngine.moduleSchedulesKey)
        let sessions = StudentSchedule.sessions(
            universities: universities.flatMap { try? JSONSerialization.jsonObject(with: $0) },
            schedules: schedules.flatMap { try? JSONSerialization.jsonObject(with: $0) },
            audience: audience
        )
        let blocks = (try? await api.userState([StudyBlock].self, key: StudyBlock.storageKey))?.value ?? []
        upcoming = Upcoming.merge(sessions: sessions, blocks: blocks)
        recent = (try? await api.userState([RecentResource].self, key: RecentResource.key))?.value ?? []

        // The same catalogue document the reader uses to match terms, read here
        // only for its labels.
        if let graph = try? await library.catalogue(key: SyncEngine.conceptGraphKey),
           let decoded = try? JSONDecoder().decode(ConceptGraph.self, from: graph) {
            conceptLabels = Dictionary(
                decoded.concepts.map { ($0.id, $0.label) },
                uniquingKeysWith: { first, _ in first }
            )
        }
    }

    /// What to call a concept on screen.
    ///
    /// Falls back to the id rather than to a blank or a guess: a concept the
    /// catalogue has not caught up with is still due, and saying so with an
    /// ugly name beats not saying it.
    private func conceptName(_ conceptId: String) -> String {
        let label = conceptLabels[conceptId]
        return (label?.isEmpty == false ? label : nil) ?? conceptId
    }

    // MARK: - What is next

    /// The next thing on either calendar, and the one or two after it.
    @ViewBuilder private var nextOnSchedule: some View {
        if let next = Upcoming.next(upcoming) {
            let rest = upcoming
                .drop { $0.id != next.id }
                .dropFirst()
                .prefix(2)

            VStack(alignment: .leading, spacing: 12) {
                Text(strings("Next on your schedule"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                VStack(alignment: .leading, spacing: 6) {
                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                        Text(clock(next.start))
                            .font(Theme.numeric(15))
                            .foregroundStyle(Theme.primary)
                        Text(next.title)
                            .font(Theme.ui(15, weight: 600))
                            .foregroundStyle(Theme.ink)
                            .lineLimit(2)
                    }

                    HStack(spacing: 6) {
                        // Which calendar this came from, said plainly: a
                        // student needs to know whether their university
                        // expects them somewhere or they promised themselves.
                        Label(next.source == .faculty ? "Your university" : "Your plan",
                              systemImage: next.source == .faculty ? "building.columns" : "person")
                            .font(Theme.ui(11, weight: 600))
                            .foregroundStyle(next.source == .faculty ? Theme.primaryStrong : Theme.ink2)
                            .padding(.horizontal, 7)
                            .padding(.vertical, 3)
                            .background(next.source == .faculty ? Theme.primaryTint : Theme.surface2)
                            .clipShape(Capsule())

                        if !next.kind.isEmpty {
                            Text(next.kind)
                                .font(Theme.ui(11))
                                .foregroundStyle(Theme.ink3)
                        }
                        if let location = next.location {
                            Label(location, systemImage: "mappin")
                                .font(Theme.ui(11))
                                .foregroundStyle(Theme.ink3)
                                .lineLimit(1)
                        }
                    }
                }

                if !rest.isEmpty {
                    Divider().overlay(Theme.line)
                    ForEach(rest) { item in
                        HStack(spacing: 10) {
                            Text(clock(item.start))
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink3)
                                .frame(width: 44, alignment: .leading)
                            Text(item.title)
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink2)
                                .lineLimit(1)
                            Spacer(minLength: 0)
                        }
                    }
                }
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    // MARK: - Last used

    /// Documents this student actually opened. Absent until one has been.
    @ViewBuilder private var lastUsed: some View {
        if !recent.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                Text(strings("Last used resources"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                ForEach(recent.prefix(4)) { item in
                    HStack(spacing: 10) {
                        Image(systemName: symbol(item.type))
                            .font(.system(size: 15))
                            .foregroundStyle(Theme.ink2)
                            .frame(width: 28, height: 28)
                            .background(Theme.surface2)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))

                        VStack(alignment: .leading, spacing: 1) {
                            Text(item.title)
                                .font(Theme.ui(14))
                                .foregroundStyle(Theme.ink)
                                .lineLimit(1)
                            if !item.meta.isEmpty {
                                Text(item.meta)
                                    .font(Theme.ui(11.5))
                                    .foregroundStyle(Theme.ink3)
                                    .lineLimit(1)
                            }
                        }

                        Spacer(minLength: 8)

                        if let opened = ISO8601DateFormatter.read(item.openedAt) {
                            Text(opened.formatted(.relative(presentation: .numeric)))
                                .font(Theme.numeric(11))
                                .foregroundStyle(Theme.ink3)
                        }
                    }
                }
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    private func clock(_ date: Date) -> String {
        date.formatted(date: Calendar.current.isDateInToday(date) ? .omitted : .abbreviated,
                       time: .shortened)
    }

    private func symbol(_ type: String) -> String {
        switch type.lowercased() {
        case "video": "play.circle"
        case "guideline": "scroll"
        case "deck": "rectangle.stack"
        case "article": "newspaper"
        default: "book.closed"
        }
    }

    /// Nothing answered yet. Say what to do, not how well it went.
    private var firstRun: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(strings("Start where you like"))
                .font(Theme.display(22))
                .foregroundStyle(Theme.ink)
            Text(strings("Answer some questions and this becomes a record of what you know and what is slipping."))
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }

    private var todayLine: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(model.summary.streak > 0
                 ? "\(model.summary.streak) day\(model.summary.streak == 1 ? "" : "s") running"
                 : "Pick it back up")
                .font(Theme.display(22))
                .foregroundStyle(Theme.ink)
            Text("\(model.summary.attempts) question\(model.summary.attempts == 1 ? "" : "s") answered so far.")
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
        }
    }

    private var stats: some View {
        HStack(spacing: 10) {
            StatTile(
                label: "Accuracy",
                value: model.hasEnoughForAccuracy
                    ? model.summary.accuracy.map { "\(Int(($0 * 100).rounded()))%" } ?? "—"
                    : "—",
                detail: model.hasEnoughForAccuracy
                    ? "of \(model.summary.marked) marked"
                    : "after \(PerformanceModel.minimumMarked) answers"
            )
            StatTile(
                label: "Answered",
                value: "\(model.summary.attempts)",
                detail: model.summary.medianSeconds.map { "~\($0)s each" } ?? ""
            )
        }
    }

    /// What to study next, which is the whole point of the screen.
    @ViewBuilder
    private var weakest: some View {
        let weak = Array(model.summary.bySubject.prefix(3))
        if !weak.isEmpty {
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("Weakest topics"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                ForEach(weak) { row in
                    HStack {
                        Text(row.topic.isEmpty ? row.subjectId : row.topic)
                            .font(Theme.ui(14))
                            .foregroundStyle(Theme.ink)
                            .lineLimit(1)
                        Spacer()
                        Text("\(Int((row.accuracy * 100).rounded()))%")
                            .font(Theme.numeric(13))
                            .foregroundStyle(row.accuracy < 0.5 ? Theme.danger : Theme.ink2)
                    }
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    /// What the ledger says is worth going back to.
    ///
    /// The first principle of the product, and until now absent from this
    /// platform entirely. Every row here is something the student has actually
    /// demonstrated and not seen since — nothing is fixed, and nothing appears
    /// for a concept never met.
    @ViewBuilder private var dueReviews: some View {
        if !mastery.due.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text(strings("Due for review"))
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.ink2)
                    Spacer()
                    Text("\(mastery.due.count)")
                        .font(Theme.numeric(12))
                        .foregroundStyle(Theme.ink3)
                }

                ForEach(mastery.due.prefix(5)) { item in
                    HStack(spacing: 10) {
                        Circle()
                            .fill(colour(item.band))
                            .frame(width: 7, height: 7)

                        Text(conceptName(item.conceptId))
                            .font(Theme.ui(14))
                            .foregroundStyle(Theme.ink)
                            .lineLimit(1)

                        Spacer(minLength: 8)

                        // Accuracy where there is any. A concept only ever
                        // practised on a station has none, and inventing one
                        // would dress a tick as a mark.
                        if let accuracy = item.accuracyPct {
                            Text("\(accuracy)%")
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink2)
                        }

                        Text(overdue(item.dueInDays))
                            .font(Theme.ui(11))
                            .foregroundStyle(item.dueInDays < 0 ? Theme.warning : Theme.ink3)
                    }
                }

                if mastery.due.count > 5 {
                    Text("and \(mastery.due.count - 5) more")
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        } else if !mastery.upcoming.isEmpty {
            // Nothing to do is worth saying plainly, with when the next thing
            // lands — an empty panel reads as something broken.
            HStack(spacing: 10) {
                Image(systemName: "checkmark.circle")
                    .foregroundStyle(Theme.success)
                VStack(alignment: .leading, spacing: 2) {
                    Text(strings("Nothing due today"))
                        .font(Theme.ui(14, weight: 600))
                        .foregroundStyle(Theme.ink)
                    if let next = mastery.upcoming.first {
                        Text(next.dueInDays == 1 ? "Next one tomorrow." : "Next one in \(next.dueInDays) days.")
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink2)
                    }
                }
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    private func overdue(_ days: Int) -> String {
        switch days {
        case 0: "today"
        case -1: "1 day over"
        default: "\(-days) days over"
        }
    }

    private func colour(_ band: MasteryBand) -> Color {
        switch band {
        case .shaky: Theme.danger
        case .developing: Theme.warning
        case .practised: Theme.ink3
        case .secure: Theme.success
        case .unseen: Theme.ink3
        }
    }

    private var catalogue: some View {
        HStack(spacing: 10) {
            StatTile(label: "Articles", value: "\(articleCount)", detail: "in your library")
            StatTile(label: "Questions", value: "\(questionCount)", detail: "available")
        }
    }
}

struct StatTile: View {
    @Environment(\.strings) private var strings
    let label: LocalizedStringKey
    let value: String
    let detail: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(Theme.panelTitle(11))
                .foregroundStyle(Theme.ink2)
            Text(value)
                .font(Theme.numeric(26, weight: 500))
                .foregroundStyle(Theme.ink)
            if !detail.isEmpty {
                Text(detail)
                    .font(Theme.ui(11))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }
}
