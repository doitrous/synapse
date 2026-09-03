import SwiftUI
import UserNotifications

/// The study icons a student can pick, matching `PROFILE_ICONS` in
/// `src/data/profileIcons.ts` id for id — the id is what round-trips through
/// `profileIcon` on the server, so a mismatch here would show one icon on the
/// phone and a different one on the website.
private let profileIconOptions: [(id: String, symbol: String, label: LocalizedStringKey)] = [
    ("stethoscope", "stethoscope", "Stethoscope"),
    ("neuron", "brain.head.profile", "Neuron"),
    ("capsule", "pills.fill", "Capsule"),
    ("microscope", "microscope", "Microscope"),
    ("heart", "heart.fill", "Heart"),
    ("book", "book.fill", "Book"),
]

/// Account, profile, appearance, help and the two irreversible actions —
/// signing out and deleting the account. Presented as a sheet from the Today
/// screen: reached once a term, not once a session, which is why it does not
/// hold a tab of its own.
///
/// Order matters here and is not incidental: sign out sits near the bottom
/// because that is where iOS expects it, and delete account is the very last
/// row in the whole screen — required by App Store guideline 5.1.1(v), and
/// kept a full screen turn away from sign out because the two are one tap
/// apart and only one of them is reversible.
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

    // Profile
    @State private var meProfile: MeResponse.Profile?
    @State private var iconId = "stethoscope"
    @State private var username = ""
    @State private var statusMessage = ""
    @State private var usernameStatus: UsernameStatus = .idle
    @State private var usernameCheckTask: Task<Void, Never>?
    @State private var profileSaving = false
    @State private var profileSaved = false
    @State private var profileError: String?

    private enum UsernameStatus: Equatable {
        case idle, checking, available, taken, invalid
    }

    // Enrolment change request
    @State private var requestField = "university"
    @State private var requestedUniversityId = ""
    @State private var requestedYear = ""
    @State private var requestReason = ""
    @State private var requesting = false
    @State private var requestError: String?
    @State private var requestSent = false
    @State private var pendingRequests: [SynapseAPI.EnrollmentChangeRequest] = []
    @State private var requestsState: LoadState = .loading

    // Contact us
    @State private var supportSubject = ""
    @State private var supportMessage = ""
    @State private var sendingSupport = false
    @State private var supportSendError: String?
    @State private var supportSent = false
    @State private var supportHistory: [SynapseAPI.SupportRequest] = []
    @State private var supportHistoryState: LoadState = .loading

    @State private var showingAIDisclaimer = false

    /// The three shapes a loaded list can take, shared across every small
    /// data-backed subsection on this screen.
    private enum LoadState: Equatable { case loading, loaded, dropped }

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
                profileSection
                preferencesSection

                Section(strings("Account")) {
                    row("Email", user.email ?? "—")
                    row("Role", user.role)
                }
                .listRowBackground(Theme.surface)

                cohort
                enrolmentChangeSection
                remindersSection
                syncSection
                helpSection
                aboutSection

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
                    // Kept as the very last row in the screen for the same
                    // reason.
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
            .sheet(isPresented: $showingAIDisclaimer) {
                AIDisclaimerView(api: auth.api)
                    .localisedSheet()
            }
        }
        .task {
            await prefs.load()
            // Recorded on arrival, so a student who has travelled is not sent a
            // reminder at four in the morning by a server that still thinks
            // they are where they signed up.
            await prefs.syncTimezone()
            await PushRegistrar.shared.refreshReminderAuthorization()
            await loadProfile()
            await loadEnrolmentRequests()
            await loadSupportHistory()
        }
    }

    // MARK: - Profile

    @ViewBuilder
    private var profileSection: some View {
        Section {
            iconPicker

            TextField(strings("Username"), text: $username)
                .font(Theme.ui(15))
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .onChange(of: username) { _, value in scheduleUsernameCheck(value) }

            usernameStatusRow

            VStack(alignment: .leading, spacing: 4) {
                TextField(strings("Say what you're up to (optional)"), text: $statusMessage, axis: .vertical)
                    .font(Theme.ui(14))
                    .lineLimit(1...3)
                    .onChange(of: statusMessage) { _, value in
                        if value.count > 140 { statusMessage = String(value.prefix(140)) }
                    }
                Text("\(statusMessage.count)/140")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }

            if let profileError {
                Text(profileError)
                    .font(Theme.ui(12.5))
                    .foregroundStyle(Theme.danger)
            }

            Button {
                Task { await saveProfile() }
            } label: {
                HStack {
                    if profileSaving { ProgressView().controlSize(.small) }
                    Text(strings(profileSaved && !profileDirty ? "Saved" : "Save profile"))
                }
            }
            .tint(Theme.primary)
            .disabled(!canSaveProfile)
        } header: {
            Text(strings("Profile"))
        } footer: {
            Text(strings("Your username and study icon are shown to classmates in study rooms and leaderboards."))
                .font(Theme.ui(12))
        }
        .listRowBackground(Theme.surface)
    }

    private var iconPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(profileIconOptions, id: \.id) { option in
                    Button {
                        iconId = option.id
                        profileSaved = false
                    } label: {
                        VStack(spacing: 4) {
                            Image(systemName: option.symbol)
                                .font(.system(size: 18))
                                .frame(width: 44, height: 44)
                                .background(iconId == option.id ? Theme.primaryTint : Theme.surface2)
                                .foregroundStyle(iconId == option.id ? Theme.primaryStrong : Theme.ink2)
                                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                                .overlay(
                                    RoundedRectangle(cornerRadius: Theme.Radius.lg)
                                        .strokeBorder(iconId == option.id ? Theme.primary : .clear, lineWidth: 1.5)
                                )
                            Text(strings(option.label))
                                .font(Theme.ui(10))
                                .foregroundStyle(Theme.ink3)
                        }
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(strings(option.label))
                    .accessibilityAddTraits(iconId == option.id ? [.isButton, .isSelected] : .isButton)
                }
            }
            .padding(.vertical, 2)
        }
        .listRowInsets(EdgeInsets(top: 10, leading: 16, bottom: 6, trailing: 16))
    }

    @ViewBuilder
    private var usernameStatusRow: some View {
        switch usernameStatus {
        case .idle:
            EmptyView()
        case .checking:
            Label {
                Text(strings("Checking…")).font(Theme.ui(12)).foregroundStyle(Theme.ink3)
            } icon: {
                ProgressView().controlSize(.mini)
            }
        case .available:
            Label(strings("Available"), systemImage: "checkmark.circle.fill")
                .font(Theme.ui(12))
                .foregroundStyle(Theme.success)
        case .taken:
            Label(strings("That username is already taken"), systemImage: "xmark.circle.fill")
                .font(Theme.ui(12))
                .foregroundStyle(Theme.danger)
        case .invalid:
            Label(strings("Use letters, numbers, dots, underscores or hyphens"), systemImage: "exclamationmark.circle.fill")
                .font(Theme.ui(12))
                .foregroundStyle(Theme.danger)
        }
    }

    private var profileDirty: Bool {
        iconId != (meProfile?.profileIcon ?? "stethoscope")
            || username != (meProfile?.username ?? "")
            || statusMessage != (meProfile?.statusMessage ?? "")
    }

    private var canSaveProfile: Bool {
        profileDirty && !profileSaving && usernameStatus != .taken && usernameStatus != .checking
            && audienceStore.audience.isKnown
    }

    private func loadProfile() async {
        guard let me = try? await auth.api.me() else { return }
        meProfile = me.profile
        iconId = me.profile?.profileIcon ?? "stethoscope"
        username = me.profile?.username ?? ""
        statusMessage = me.profile?.statusMessage ?? ""
    }

    /// Debounced so the server is not asked on every keystroke — the same
    /// 400 ms the website waits before checking.
    private func scheduleUsernameCheck(_ value: String) {
        profileSaved = false
        usernameCheckTask?.cancel()
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, trimmed != meProfile?.username else {
            usernameStatus = .idle
            return
        }
        usernameStatus = .checking
        usernameCheckTask = Task {
            try? await Task.sleep(nanoseconds: 400_000_000)
            guard !Task.isCancelled else { return }
            do {
                let result = try await auth.api.usernameAvailable(handle: trimmed)
                guard !Task.isCancelled else { return }
                usernameStatus = result.available ? .available : (result.reason == "invalid" ? .invalid : .taken)
            } catch {
                guard !Task.isCancelled else { return }
                // Offline or the endpoint is not there yet: say nothing rather
                // than claim it is taken when the honest answer is "unknown".
                usernameStatus = .idle
            }
        }
    }

    private func saveProfile() async {
        profileSaving = true
        profileError = nil
        defer { profileSaving = false }
        do {
            let result = try await auth.api.saveProfile(
                universityId: audienceStore.audience.universityId,
                year: audienceStore.audience.year,
                group: audienceStore.audience.group,
                username: username.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nil : username,
                profileIcon: iconId,
                statusMessage: statusMessage
            )
            meProfile = result.profile ?? meProfile
            profileSaved = true
        } catch {
            profileError = isConflict(error)
                ? strings("That username was just taken. Try another.")
                : strings("That profile could not be saved. Check your connection and try again.")
        }
    }

    // MARK: - Preferences

    private var preferencesSection: some View {
        Section {
            Picker(strings("Theme"), selection: Binding(
                get: { theme.appearance },
                set: { theme.use($0) }
            )) {
                ForEach([AppTheme.light, .warm, .dark, .oled], id: \.self) {
                    Text(strings($0.label)).tag($0)
                }
            }
            .pickerStyle(.menu)

            // In each language's own name. Someone looking for Arabic is
            // looking for "العربية", not for the English word for it.
            //
            // ponytail: the language switch itself is fully wired (locale +
            // RTL layout flip everywhere), but per-string Arabic coverage is
            // ~637 entries and growing — a string not yet in
            // ArabicStrings.table falls back to its English source rather
            // than showing a blank or a key. Filling remaining gaps is a
            // later content task, not a blocker here.
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
            Text(strings("Preferences"))
        } footer: {
            Text(strings("Warm is the paper-coloured ground. OLED goes to true black, which turns those pixels off on an OLED screen. Language applies everywhere, and follows you to the website."))
                .font(Theme.ui(12))
        }
        .listRowBackground(Theme.surface)
    }

    // MARK: - Cohort (self-declared, when there is no roster row)

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
        yearOptions(for: university)
    }

    private func yearOptions(for universityId: String) -> [String] {
        let listed = audienceStore.universities.first { $0.id == universityId }?.yearLabels ?? []
        return listed.isEmpty
            ? ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Internship 1"]
            : listed
    }

    // MARK: - Request a university or year change (admin-reviewed)

    /// Formal, admin-reviewed change — distinct from the self-declare picker
    /// above. Only reachable once the roster has a cohort to change: a
    /// student with nothing on record yet uses the picker, not this.
    @ViewBuilder
    private var enrolmentChangeSection: some View {
        if audienceStore.fromRoster {
            Section {
                Picker(strings("Field"), selection: $requestField) {
                    Text(strings("University")).tag("university")
                    Text(strings("Year")).tag("year")
                }
                .pickerStyle(.segmented)
                .onChange(of: requestField) { _, _ in requestSent = false }

                if requestField == "university" {
                    Picker(strings("New university"), selection: $requestedUniversityId) {
                        Text(strings("Choose")).tag("")
                        ForEach(audienceStore.universities) { Text($0.name).tag($0.id) }
                    }
                } else {
                    Picker(strings("New year"), selection: $requestedYear) {
                        Text(strings("Choose")).tag("")
                        ForEach(yearOptions(for: audienceStore.audience.universityId), id: \.self) { Text(strings($0)).tag($0) }
                    }
                }

                TextField(strings("Why are you asking for this?"), text: $requestReason, axis: .vertical)
                    .font(Theme.ui(14))
                    .lineLimit(2...4)

                if let requestError {
                    Text(requestError).font(Theme.ui(12.5)).foregroundStyle(Theme.danger)
                }
                if requestSent {
                    Text(strings("Request sent. An administrator will review it."))
                        .font(Theme.ui(12.5))
                        .foregroundStyle(Theme.success)
                }

                Button {
                    Task { await submitEnrolmentChange() }
                } label: {
                    HStack {
                        if requesting { ProgressView().controlSize(.small) }
                        Text(strings("Submit request"))
                    }
                }
                .tint(Theme.primary)
                .disabled(!canSubmitRequest)

                enrolmentRequestsList
            } header: {
                Text(strings("Request a university or year change"))
            } footer: {
                Text(strings("Needs administrator approval and at least a short reason. The change only takes effect once it is approved."))
                    .font(Theme.ui(12))
            }
            .listRowBackground(Theme.surface)
        }
    }

    private var requestedValue: String {
        requestField == "university" ? requestedUniversityId : requestedYear
    }

    private var canSubmitRequest: Bool {
        !requestedValue.isEmpty && requestReason.trimmed.count >= 12 && !requesting
    }

    @ViewBuilder
    private var enrolmentRequestsList: some View {
        switch requestsState {
        case .loading:
            HStack { Spacer(); ProgressView().controlSize(.small); Spacer() }
        case .dropped:
            HStack {
                Text(strings("Your requests could not be loaded.")).font(Theme.ui(12)).foregroundStyle(Theme.ink3)
                Spacer()
                Button(strings("Retry")) { Task { await loadEnrolmentRequests() } }
                    .font(Theme.ui(12)).tint(Theme.primary)
            }
        case .loaded:
            if !pendingRequests.isEmpty {
                ForEach(pendingRequests) { request in
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(strings(request.field == "university" ? "University change" : "Year change"))
                                .font(Theme.ui(13, weight: 500))
                                .foregroundStyle(Theme.ink)
                            Text("→ \(request.requestedValue)")
                                .font(Theme.ui(12))
                                .foregroundStyle(Theme.ink2)
                        }
                        Spacer()
                        Text(strings(statusLabel(request.status)))
                            .font(Theme.ui(11, weight: 600))
                            .foregroundStyle(statusColor(request.status))
                    }
                }
            }
        }
    }

    private func statusLabel(_ status: String) -> String {
        switch status {
        case "pending": "Pending"
        case "approved": "Approved"
        case "rejected": "Rejected"
        default: status
        }
    }

    private func statusColor(_ status: String) -> Color {
        switch status {
        case "approved": Theme.success
        case "rejected": Theme.danger
        default: Theme.warning
        }
    }

    private func loadEnrolmentRequests() async {
        requestsState = .loading
        do {
            pendingRequests = try await auth.api.myEnrollmentChangeRequests()
            requestsState = .loaded
        } catch {
            requestsState = .dropped
        }
    }

    private func submitEnrolmentChange() async {
        requesting = true
        requestError = nil
        defer { requesting = false }
        do {
            try await auth.api.requestEnrollmentChange(field: requestField, requestedValue: requestedValue, reason: requestReason.trimmed)
            requestSent = true
            requestReason = ""
            await loadEnrolmentRequests()
        } catch {
            requestError = isConflict(error)
                ? strings("You already have a pending request for this field.")
                : strings("Your request could not be sent. Try again, or contact support if it keeps happening.")
        }
    }

    /// A 409 — "taken" or "already pending" — the only status either caller
    /// treats differently from an ordinary failure.
    private func isConflict(_ error: Error) -> Bool {
        if case APIError.transient(let status) = error { return status == 409 }
        return false
    }

    // MARK: - Reminders

    @ViewBuilder
    private var remindersSection: some View {
        Section {
            // The one system prompt this app shows, primed rather than asked
            // for cold — iOS shows it exactly once, and asking on a path
            // nobody chose teaches a student to decline it.
            PermissionPrimerRow(
                symbol: "bell.badge",
                title: "Enable reminders",
                rationale: "So we can tell you when a review is due or a lecture time changes.",
                isGranted: PushRegistrar.shared.reminderAuthorization == .authorized
            ) {
                await PushRegistrar.shared.requestReminderPermission()
            }

            // Two choices rather than one: wanting to be told a lecture moved
            // is not the same as wanting to be told a concept is fading.
            //
            // Rows rather than `Toggle`s. This is the third place in the app
            // where a stock control drew itself correctly and then took no
            // taps at all, and the fix is the same one the resources filter
            // and the question-bank footer already use: a plain button that
            // says what it is.
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

    // MARK: - Sync

    private var syncSection: some View {
        Section(strings("Sync")) {
            row("Status", statusText)
            // Whether a change made elsewhere reaches this phone at once or
            // waits for the next refresh. Worth saying: the difference is
            // invisible until you are looking for it.
            row("Instant updates", instantUpdates)
            if sync.pendingUploads > 0 {
                row("Waiting to upload", "\(sync.pendingUploads)")
            }
            Button(strings("Refresh now")) {
                Task { await sync.refresh() }
            }
            .tint(Theme.primary)
        }
        .listRowBackground(Theme.surface)
    }

    /// Whether the silent nudge is working, in a student's terms.
    private var instantUpdates: String {
        let push = PushRegistrar.shared
        if push.nudgesReceived > 0 { return "On · \(push.nudgesReceived) received" }
        if push.isRegistered { return "On" }
        return push.deviceToken == nil ? "Off — updates arrive on refresh" : "Registering"
    }

    private var statusText: String {
        switch sync.status {
        case .idle: "Not synced yet"
        case .syncing: "Syncing…"
        case .done(let changed, _): changed == 0 ? "Up to date" : "Updated \(changed) catalogue\(changed == 1 ? "" : "s")"
        case .failed(let message): message
        }
    }

    // MARK: - Help

    @ViewBuilder
    private var helpSection: some View {
        Section {
            Link(destination: URL(string: "https://nishany.com/app/tutorial")!) {
                Label(strings("App tutorials"), systemImage: "play.rectangle")
            }

            Link(destination: URL(string: "mailto:help@nishany.com")!) {
                Label(strings("help@nishany.com"), systemImage: "envelope")
            }

            VStack(alignment: .leading, spacing: 8) {
                Text(strings("Or send a message from here"))
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
                TextField(strings("Subject (optional)"), text: $supportSubject)
                    .font(Theme.ui(14))
                TextField(strings("What's going on?"), text: $supportMessage, axis: .vertical)
                    .font(Theme.ui(14))
                    .lineLimit(2...5)
                if let supportSendError {
                    Text(supportSendError).font(Theme.ui(12)).foregroundStyle(Theme.danger)
                }
                if supportSent {
                    Text(strings("Sent. We'll reply to your account email."))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.success)
                }
                Button {
                    Task { await sendSupport() }
                } label: {
                    HStack {
                        if sendingSupport { ProgressView().controlSize(.small) }
                        Text(strings("Send"))
                    }
                }
                .tint(Theme.primary)
                .disabled(supportMessage.trimmed.isEmpty || sendingSupport)
            }

            supportHistoryList
        } header: {
            Text(strings("Help"))
        }
        .listRowBackground(Theme.surface)
    }

    @ViewBuilder
    private var supportHistoryList: some View {
        switch supportHistoryState {
        case .loading:
            HStack { Spacer(); ProgressView().controlSize(.small); Spacer() }
        case .dropped:
            HStack {
                Text(strings("Your messages could not be loaded.")).font(Theme.ui(12)).foregroundStyle(Theme.ink3)
                Spacer()
                Button(strings("Retry")) { Task { await loadSupportHistory() } }
                    .font(Theme.ui(12)).tint(Theme.primary)
            }
        case .loaded:
            if !supportHistory.isEmpty {
                ForEach(supportHistory) { request in
                    HStack {
                        Text(request.subject?.isEmpty == false ? request.subject! : strings("Message"))
                            .font(Theme.ui(12.5))
                            .foregroundStyle(Theme.ink2)
                            .lineLimit(1)
                        Spacer()
                        Text(strings(request.status == "open" ? "Waiting" : "Answered"))
                            .font(Theme.ui(11, weight: 600))
                            .foregroundStyle(request.status == "open" ? Theme.warning : Theme.success)
                    }
                }
            }
        }
    }

    private func sendSupport() async {
        sendingSupport = true
        supportSendError = nil
        defer { sendingSupport = false }
        do {
            try await auth.api.postSupport(
                subject: supportSubject.trimmed.isEmpty ? nil : supportSubject.trimmed,
                message: supportMessage.trimmed
            )
            supportSent = true
            supportSubject = ""
            supportMessage = ""
            await loadSupportHistory()
        } catch {
            supportSendError = strings("That could not be sent. Check your connection, or email help@nishany.com directly.")
        }
    }

    private func loadSupportHistory() async {
        supportHistoryState = .loading
        do {
            supportHistory = try await auth.api.mySupportRequests()
            supportHistoryState = .loaded
        } catch {
            supportHistoryState = .dropped
        }
    }

    // MARK: - About & legal

    @ViewBuilder
    private var aboutSection: some View {
        Section {
            Link(destination: URL(string: "https://nishany.com/terms")!) {
                Label(strings("Terms and Conditions"), systemImage: "doc.text")
            }
            Link(destination: URL(string: "https://nishany.com/privacy")!) {
                Label(strings("Privacy Policy"), systemImage: "hand.raised")
            }
            NavigationLink {
                AccessibilityStatementView()
            } label: {
                Label(strings("Accessibility statement"), systemImage: "accessibility")
            }
            Button {
                showingAIDisclaimer = true
            } label: {
                Label(strings("About AI in Nishany"), systemImage: "sparkles")
            }
            .tint(Theme.ink)
            row("App version", appVersion)
        } header: {
            Text(strings("About"))
        }
        .listRowBackground(Theme.surface)
    }

    private var appVersion: String {
        (Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String) ?? "—"
    }

    // MARK: - Shared

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

/// A simple statement of intent — not a generated audit. WCAG 2.1 AA is the
/// bar the rest of the compliance pack is aiming the app at; this is where a
/// reviewer or a student can read that in plain language.
struct AccessibilityStatementView: View {
    @Environment(\.strings) private var strings

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                Text(strings("Nishany aims to meet WCAG 2.1 Level AA — the widely used standard for making software usable by people with disabilities. That means readable contrast in every theme, text that respects your device's Dynamic Type setting, VoiceOver labels on controls, and layouts that work in both English and Arabic, including full right-to-left support."))
                Text(strings("This is a standard we design toward, not a certificate — if something in the app is hard to use with assistive technology, tell us. Use Contact Us in Help, or email help@nishany.com, and say what you were trying to do and what happened."))
            }
            .font(Theme.ui(14))
            .foregroundStyle(Theme.ink2)
            .padding(20)
        }
        .background(Theme.paper)
        .navigationTitle(strings("Accessibility"))
        .navigationBarTitleDisplayMode(.inline)
    }
}
