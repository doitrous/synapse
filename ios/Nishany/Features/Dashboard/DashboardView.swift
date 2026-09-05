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
    @State private var focusStore: FocusSessionStore
    @State private var focusTasks = FocusTasksStore()
    let sync: SyncEngine
    let library: LocalStore
    let user: SessionUser
    let auth: AuthModel
    let audienceStore: AudienceStore
    /// Switches the app's own tab, so "Continue session" and the grid cards
    /// that lead to another tab land there directly rather than pushing a
    /// second copy of that surface onto this tab's own stack.
    let openTab: (SignedInView.Destination) -> Void

    @State private var questionCount = 0
    @State private var resourceCount = 0
    @State private var showingAccount = false
    @State private var showingQotd = false
    @State private var showingFlashcardsComingSoon = false
    @State private var showingFocusTimer = false
    /// The sitting still in progress, if there is one — read straight from
    /// `LiveSession.key` rather than through `QBankStore`, so the resume card
    /// does not have to stand up the whole question-bank stack just to ask
    /// one question.
    @State private var liveSession: LiveSession?
    /// Both calendars, merged, so "what is next" answers from whichever has it.
    /// Concept id → the name a person would recognise.
    ///
    /// The review queue is keyed by concept id, and an id is not a thing a
    /// student can act on: "CON-CVS-5692E7C9DCE9F5 is due" tells them nothing
    /// about what to open.
    @State private var conceptLabels: [String: String] = [:]
    @State private var upcoming: [UpcomingItem] = []
    @State private var recent: [RecentResource] = []
    /// Set once the first `refresh()` + `mastery.load()` pass has finished, so
    /// the screen shows a spinner rather than a dashboard flashing zeros while
    /// the local record is still being read.
    @State private var hasLoadedOnce = false
    private let api: NishanyAPI

    /// No per-student daily target exists in settings yet. Forty questions is
    /// a sensible default sitting — enough to matter, short enough to
    /// actually finish — until the app exposes one to set. Mirrors
    /// `DAILY_GOAL` in `src/components/dashboard/TodaysTargetHero.tsx`.
    /// ponytail: hardcoded goal; make it configurable if that's asked for.
    private static let dailyQuestionGoal = 40

    init(
        store: LocalStore, sync: SyncEngine, user: SessionUser, auth: AuthModel,
        audienceStore: AudienceStore, openTab: @escaping (SignedInView.Destination) -> Void
    ) {
        _model = State(wrappedValue: PerformanceModel(store: store))
        _mastery = State(wrappedValue: MasteryModel(api: auth.api, sync: sync))
        _focusStore = State(wrappedValue: FocusSessionStore(api: auth.api))
        self.sync = sync
        self.library = store
        self.user = user
        self.auth = auth
        self.audienceStore = audienceStore
        self.openTab = openTab
        self.api = auth.api
    }

    private var audience: StudentAudience { audienceStore.audience }

    /// What to call this student, the way the web derives it in `nameFor` —
    /// a profile name first, then the part of their email before the "@",
    /// then a plain fallback. iOS only ever has the email.
    private var studentName: String {
        let local = user.email?
            .split(separator: "@", maxSplits: 1)
            .first
            .map(String.init)?
            .trimmingCharacters(in: .whitespacesAndNewlines)
        return (local?.isEmpty == false ? local : nil) ?? strings("Student")
    }

    /// The single letter in the header's avatar circle.
    private var avatarInitial: String {
        studentName.first.map { String($0).uppercased() } ?? "?"
    }

    /// "Good morning" / "Good afternoon" / "Good evening", by the phone's own
    /// clock — the same three-way split `greetingKey` uses on the web.
    private var greeting: String {
        let hour = Calendar.current.component(.hour, from: Date())
        let key: String
        if hour < 12 { key = "Good morning" }
        else if hour < 18 { key = "Good afternoon" }
        else { key = "Good evening" }

        // Arabic separates the greeting from the name with "، " rather than
        // ", ", as the web's own `TodaysTarget` does.
        let separator = strings.language == .ar ? "، " : ", "
        return "\(strings(key))\(separator)\(studentName)"
    }

    /// "**28 of 40** questions done — 12 more to hit your mark," with only
    /// the count set in the bold primary colour, or the earned line once the
    /// goal is met. A port of the same branch in `TodaysTarget.tsx`.
    ///
    /// Arabic reorders this rather than just translating it word for word —
    /// "أنجزت **٢٨ من ٤٠** سؤالًا — أكمل ١٢ سؤالًا لتصيب هدفك." opens on a verb
    /// that has no English counterpart, and puts a second verb ("أكمل") ahead
    /// of the remaining count rather than trailing it — so the sentence is
    /// built from pieces around the two numbers rather than one template
    /// string, with `Money.number` giving each count Arabic-Indic digits.
    private var targetLine: Text {
        let done = model.summary.todayQuestions
        let goal = Self.dailyQuestionGoal
        let language = strings.language
        guard done < goal else {
            return Text(strings("Target hit for today — nice shooting"))
        }
        let remaining = goal - done
        let isArabic = language == .ar

        let lead = Text(isArabic ? "أنجزت " : "")

        let count = Text("\(Money.number(Double(done), language)) \(strings("of")) \(Money.number(Double(goal), language))")
            .font(Theme.ui(13, weight: 700))
            .foregroundStyle(Theme.primaryStrong)

        let remainingLead = isArabic ? "أكمل " : ""
        let tail = Text(
            " \(strings("questions done")) — \(remainingLead)\(Money.number(Double(remaining), language)) \(strings("more to hit your mark."))"
        )

        return lead + count + tail
    }

    /// Only during the very first load, and only when there is genuinely
    /// nothing local to fall back on — this device has never synced and has
    /// no connection to do it now. Once anything has loaded once, the cache is
    /// readable and stays readable; a later hiccup on the network-only widgets
    /// (mastery, the resume card, recent resources) degrades those quietly
    /// rather than blocking the whole dashboard, the same as `SyncEngine`
    /// leaves a stale-but-readable cache after a failed sync.
    private var firstLoadError: String? {
        guard !hasLoadedOnce, !Connectivity.shared.isOnline, questionCount == 0, resourceCount == 0
        else { return nil }
        return "You're offline, and nothing has synced to this device yet. Connect once and the rest of the app works offline from there."
    }

    private func retryFirstLoad() {
        Task {
            await mastery.load()
            await refresh()
            hasLoadedOnce = true
        }
    }

    /// Open the Question of the Day if a reminder tap asked for it, and consume
    /// the pending route so it fires once.
    private func openQotdIfRequested() {
        guard PushRegistrar.shared.pendingRoute == "/app/qotd" else { return }
        _ = PushRegistrar.shared.consumePendingRoute()
        showingQotd = true
    }

    var body: some View {
        NavigationStack {
            StateSurface(isLoading: !hasLoadedOnce, error: firstLoadError, retry: retryFirstLoad) {
                ScrollView {
                    VStack(alignment: .leading, spacing: 18) {
                        header
                        Text(greeting)
                            .font(Theme.display(22))
                            .foregroundStyle(Theme.ink)
                        targetHero
                        if let liveSession {
                            resumeCard(liveSession)
                        }
                        todayGrid
                        QotdCard { showingQotd = true }
                        nextOnSchedule
                        dueReviews
                        lastUsed
                    }
                    .padding(16)
                    .frame(maxWidth: 680)
                    .frame(maxWidth: .infinity)
                }
                .background(Theme.paper)
            }
            // The header row above draws the wordmark and the account
            // avatar itself, so the system bar this screen would otherwise
            // get — a plain title and two toolbar buttons — is redundant.
            .toolbar(.hidden, for: .navigationBar)
            .sheet(isPresented: $showingAccount) {
                AccountView(user: user, auth: auth, sync: sync, audienceStore: audienceStore)
            .localisedSheet()
            }
            .sheet(isPresented: $showingQotd) {
                QotdView(store: library, sync: sync, api: api, audience: audience)
            }
            .sheet(isPresented: $showingFlashcardsComingSoon) {
                EmptyStateView(
                    symbol: "rectangle.stack",
                    title: "Flashcards",
                    detail: strings("Flashcards are on their way — check back soon.")
                )
                .presentationDetents([.medium])
            }
            .sheet(isPresented: $showingFocusTimer) {
                FocusTimerView(store: focusStore, tasks: focusTasks)
                    .presentationDetents([.large])
                    .localisedSheet()
            }
        }
        .task {
            await mastery.load()
            await refresh()
            hasLoadedOnce = true
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

    // MARK: - Header

    private var header: some View {
        HStack(spacing: 10) {
            Wordmark(height: 30)
            Spacer(minLength: 8)
            Button { showingFocusTimer = true } label: {
                Image(systemName: "timer")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(Theme.ink2)
                    .frame(width: 34, height: 34)
                    .background(Theme.surface2)
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(strings("Focus timer"))
            AssistantButton(surface: "Dashboard")
            Button { showingAccount = true } label: {
                Text(avatarInitial)
                    .font(Theme.ui(13, weight: 600))
                    .foregroundStyle(Theme.accentStrong)
                    .frame(width: 34, height: 34)
                    .background(Theme.accentTint)
                    .overlay(Circle().stroke(Theme.accentLine, lineWidth: 1))
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(strings("Account"))
        }
    }

    // MARK: - Today's target

    /// The screen's hero: the ring, the day's line, and the one action that
    /// actually moves it. A port of `TodaysTargetHero.tsx`.
    private var targetHero: some View {
        HStack(alignment: .center, spacing: 16) {
            // 88pt, not the web's 132 — this card sits in a phone-width column
            // rather than a 60rem desktop panel, and 132 would crowd the copy
            // beside it off the card entirely on the narrowest phones.
            TargetSeed(done: model.summary.todayQuestions, goal: Self.dailyQuestionGoal, size: 88)

            VStack(alignment: .leading, spacing: 5) {
                Text(strings("Today's target"))
                    .font(Theme.ui(15.5, weight: 700))
                    .foregroundStyle(Theme.ink)
                targetLine
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
                    .lineSpacing(3)

                Button { openTab(.questions) } label: {
                    Text(strings("Continue session"))
                        .font(Theme.ui(13, weight: 600))
                        .foregroundStyle(Theme.onPrimary)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Theme.primary)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
                }
                .buttonStyle(.plain)
                .padding(.top, 4)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(18)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xxl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xxl))
        .shadow(color: .black.opacity(0.05), radius: 2, y: 1)
    }

    // MARK: - Resume
    //
    // A port of `ResumeSessionCard.tsx`: renders nothing when there is no
    // sitting to jump back into.

    /// "Cardiology · question 128 of 300" — named for the sitting when it has
    /// a name, plain when it does not.
    private func resumeSubtitle(_ session: LiveSession) -> String {
        let position = "\(strings("question")) \(session.idx + 1) \(strings("of")) \(session.questionIds.count)"
        return session.name.isEmpty ? position : "\(session.name) · \(position)"
    }

    private func resumeCard(_ session: LiveSession) -> some View {
        Button { openTab(.questions) } label: {
            HStack(spacing: 10) {
                VStack(alignment: .leading, spacing: 3) {
                    Text(strings("Pick up where you left off"))
                        .font(Theme.ui(13.5, weight: 600))
                        .foregroundStyle(Theme.ink)
                    Text(resumeSubtitle(session))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink2)
                }
                Spacer(minLength: 8)
                Text(strings("Resume"))
                    .font(Theme.ui(12, weight: 600))
                    .foregroundStyle(Theme.primaryStrong)
                    .padding(.horizontal, 13)
                    .padding(.vertical, 6)
                    .background(Theme.primaryTint)
                    .overlay(Capsule().stroke(Theme.primaryLine, lineWidth: 1))
                    .clipShape(Capsule())
            }
        }
        .buttonStyle(.plain)
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }

    // MARK: - The 2×2 grid
    //
    // Four doors off the hero, each carrying the one stat that surface
    // already reports elsewhere — the same bank total Questions' own tab
    // shows, the same published count Resources itself lists — so nothing
    // here can read differently from the page it opens onto. A port of
    // `DashboardNavGrid.tsx`. Reviews and Performance, the previous grid's
    // other two tiles, are unchanged and one tap away in More.

    private var todayGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible())], spacing: 12) {
            Button { openTab(.questions) } label: {
                gridCard(symbol: "target", title: "Practice") {
                    Text(questionCount > 0
                        ? "\(Money.number(Double(questionCount), strings.language)) \(strings("questions"))"
                        : strings("Every exam format"))
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .buttonStyle(.plain)

            // No native Flashcards screen exists yet — ponytail: placeholder
            // sheet rather than a fabricated study surface; wire it to a real
            // screen once one exists.
            Button { showingFlashcardsComingSoon = true } label: {
                gridCard(symbol: "rectangle.stack", title: "Flashcards") {
                    Text(strings("Coming soon"))
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .buttonStyle(.plain)

            Button { openTab(.library) } label: {
                gridCard(symbol: "books.vertical", title: "Library") {
                    Text(strings("Concepts & sources"))
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .buttonStyle(.plain)

            Button { openTab(.resources) } label: {
                gridCard(symbol: "folder", title: "Resources") {
                    Text(resourceCount > 0
                        ? "\(Money.number(Double(resourceCount), strings.language)) \(strings("resources"))"
                        : strings("Books & videos"))
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .buttonStyle(.plain)
        }
    }

    /// One tile: a stroke icon, a label, and whatever sublabel its caller
    /// wants — a grouped count in `Theme.numeric`, or a plain phrase.
    private func gridCard<Sublabel: View>(
        symbol: String, title: String, @ViewBuilder sublabel: () -> Sublabel
    ) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Image(systemName: symbol)
                .font(.system(size: 22))
                .foregroundStyle(Theme.accentStrong)
                .accessibilityHidden(true)
            Text(strings(title))
                .font(Theme.ui(13.5, weight: 600))
                .foregroundStyle(Theme.ink)
            sublabel()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }

    /// Counts what the student can actually open, not what is in the ledger.
    ///
    /// `itemCount` includes drafts and items under review — 290 rather than
    /// 162 here — and telling someone their library holds a hundred articles
    /// they cannot reach is worse than telling them nothing.
    private func refresh() async {
        await model.load()
        questionCount = (try? await library.items(kind: .question, audience: audience).count) ?? 0
        resourceCount = (try? await library.items(kind: .resource, audience: audience).count) ?? 0

        // The resume card only offers a sitting that is actually still open —
        // one already scored is a finished sitting, not one to pick back up.
        let saved = (try? await api.userState(LiveSession.self, key: LiveSession.key))?.value
        liveSession = saved?.phase == "running" ? saved : nil

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
        // The home-screen calendar widget can't read this app's local store —
        // publish what it needs to the App Group so it has something to show.
        WidgetSnapshot.publish(upcoming)
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
                            .accessibilityHidden(true)

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
                    .accessibilityHidden(true)
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
