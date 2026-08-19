import SwiftUI

/// What to do next.
///
/// The product's first principle is answering "what should I study today?", so
/// this leads with what is actually outstanding rather than with a wall of
/// totals. Everything is computed from the local record, so it is right offline
/// and right immediately after a sitting.
struct DashboardView: View {
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

    init(store: LocalStore, sync: SyncEngine, user: SessionUser, auth: AuthModel, audienceStore: AudienceStore) {
        _model = State(wrappedValue: PerformanceModel(store: store))
        _mastery = State(wrappedValue: MasteryModel(api: auth.api, sync: sync))
        self.sync = sync
        self.library = store
        self.user = user
        self.auth = auth
        self.audienceStore = audienceStore
    }

    private var audience: StudentAudience { audienceStore.audience }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    if model.summary.attempts == 0 {
                        firstRun
                    } else {
                        todayLine
                        dueReviews
                        stats
                        weakest
                    }
                    catalogue
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .navigationTitle("Today")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showingAccount = true } label: {
                        Image(systemName: "person.crop.circle")
                    }
                    .tint(Theme.accent)
                    .accessibilityLabel("Account")
                }
            }
            .sheet(isPresented: $showingAccount) {
                AccountView(user: user, auth: auth, sync: sync, audienceStore: audienceStore)
            }
        }
        .task {
            await mastery.load()
            await refresh()
        }
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await refresh(); await mastery.load() } }
        }
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
    }

    /// Nothing answered yet. Say what to do, not how well it went.
    private var firstRun: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Start where you like")
                .font(Theme.display(22))
                .foregroundStyle(Theme.ink)
            Text("Answer some questions and this becomes a record of what you know and what is slipping.")
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
                Text("Weakest topics")
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
                    Text("Due for review")
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

                        Text(item.conceptId)
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
                    Text("Nothing due today")
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
