import SwiftUI

// MARK: - Calendar

/// A student's own study blocks, plus the university timetable when there is
/// one.
///
/// The curriculum layer is empty on this deployment — no schedule has been
/// published — so the screen leads with what a student can control, and says
/// plainly that the timetable is missing rather than showing a blank grid.
struct StudyBlock: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    /// `YYYY-MM-DD`, as the web app stores it.
    var date: String
    var start: String
    var end: String
    var subjectId: String
    var kind: String
    var done: Bool?

    static let storageKey = "synapse.calendar.blocks"
}

struct CalendarView: View {
    let store: LocalStore
    let sync: SyncEngine
    let audienceStore: AudienceStore
    let api: SynapseAPI

    @State private var blocks: [StudyBlock] = []
    @State private var hasCurriculum = false
    @State private var isLoading = true
    @State private var adding = false

    var body: some View {
        Group {
            if isLoading {
                ProgressView().tint(Theme.accent)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                List {
                    if !hasCurriculum {
                        Section {
                            Text("Your university has not published a timetable yet. Anything you plan below is your own, and syncs to the website.")
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink2)
                        }
                        .listRowBackground(Theme.surface)
                    }

                    if blocks.isEmpty {
                        Section {
                            Text("Nothing planned yet.")
                                .font(Theme.ui(14))
                                .foregroundStyle(Theme.ink3)
                        }
                        .listRowBackground(Theme.surface)
                    } else {
                        ForEach(grouped, id: \.date) { group in
                            Section {
                                ForEach(group.blocks) { block in
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(block.title)
                                            .font(Theme.ui(15, weight: 500))
                                            .foregroundStyle(Theme.ink)
                                        Text("\(block.start)–\(block.end)")
                                            .font(Theme.numeric(11))
                                            .foregroundStyle(Theme.ink3)
                                    }
                                    .listRowBackground(Theme.surface)
                                    .swipeActions {
                                        Button("Delete", role: .destructive) {
                                            Task { await remove(block) }
                                        }
                                    }
                                }
                            } header: {
                                Text(group.date)
                                    .font(Theme.panelTitle())
                                    .foregroundStyle(Theme.ink2)
                                    .textCase(nil)
                            }
                        }
                    }
                }
                .listStyle(.insetGrouped)
                .scrollContentBackground(.hidden)
                .background(Theme.paper)
            }
        }
        .background(Theme.paper)
        .navigationTitle("Calendar")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button { adding = true } label: { Image(systemName: "plus") }
                    .tint(Theme.accent)
            }
        }
        .sheet(isPresented: $adding) {
            StudyBlockEditor { block in Task { await add(block) } }
        }
        .task { await load() }
    }

    private var grouped: [(date: String, blocks: [StudyBlock])] {
        Dictionary(grouping: blocks, by: \.date)
            .map { (date: $0.key, blocks: $0.value.sorted { $0.start < $1.start }) }
            .sorted { $0.date < $1.date }
    }

    private func load() async {
        isLoading = true
        defer { isLoading = false }

        if let remote = try? await api.userState([StudyBlock].self, key: StudyBlock.storageKey) {
            blocks = remote.value ?? []
        }
        if let document = try? await store.catalogue(key: SyncEngine.moduleSchedulesKey),
           let value = try? JSONSerialization.jsonObject(with: document) {
            // A published schedule is a non-empty object keyed by cohort.
            hasCurriculum = ((value as? [String: Any])?.isEmpty == false)
                || ((value as? [Any])?.isEmpty == false)
        }
    }

    private func add(_ block: StudyBlock) async {
        blocks.append(block)
        await sync.write(key: StudyBlock.storageKey, value: blocks)
    }

    private func remove(_ block: StudyBlock) async {
        blocks.removeAll { $0.id == block.id }
        await sync.write(key: StudyBlock.storageKey, value: blocks)
    }
}

private struct StudyBlockEditor: View {
    let save: (StudyBlock) -> Void
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var date = Date()
    @State private var start = Date()
    @State private var end = Date().addingTimeInterval(3600)

    var body: some View {
        NavigationStack {
            Form {
                TextField("What are you studying?", text: $title)
                DatePicker("Day", selection: $date, displayedComponents: .date)
                DatePicker("From", selection: $start, displayedComponents: .hourAndMinute)
                DatePicker("To", selection: $end, displayedComponents: .hourAndMinute)
            }
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle("Plan a session")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Cancel") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Add") {
                        save(StudyBlock(
                            id: UUID().uuidString,
                            title: title.trimmed,
                            date: Self.day.string(from: date),
                            start: Self.time.string(from: start),
                            end: Self.time.string(from: end),
                            subjectId: "", kind: "Study", done: false
                        ))
                        dismiss()
                    }
                    .disabled(title.trimmed.isEmpty)
                }
            }
        }
    }

    /// The formats the web app stores, so a block added here reads correctly there.
    private static let day: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter
    }()

    private static let time: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter
    }()
}

// MARK: - Medical taxonomy

/// The bilingual AR⇄EN glossary.
struct GlossaryView: View {
    let store: LocalStore
    let sync: SyncEngine

    @State private var terms: [Term] = []
    @State private var isLoading = true
    @State private var query = ""

    struct Term: Identifiable, Equatable {
        let id: String
        let english: String
        let arabic: String
        let category: String
    }

    var body: some View {
        Group {
            if isLoading {
                ProgressView().tint(Theme.accent)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if terms.isEmpty {
                EmptyStateView(
                    symbol: "character.book.closed",
                    title: "No glossary yet",
                    detail: "No bilingual terms have been published yet."
                )
            } else {
                List(filtered) { term in
                    VStack(alignment: .leading, spacing: 3) {
                        Text(term.english)
                            .font(Theme.ui(16, weight: 500))
                            .foregroundStyle(Theme.ink)
                        Text(term.arabic)
                            .font(Theme.ui(16))
                            .foregroundStyle(Theme.ink2)
                            // Arabic is right-to-left whatever the interface
                            // language is.
                            .environment(\.layoutDirection, .rightToLeft)
                        if !term.category.isEmpty {
                            Text(term.category)
                                .font(Theme.numeric(10))
                                .foregroundStyle(Theme.ink3)
                        }
                    }
                    .listRowBackground(Theme.surface)
                }
                .listStyle(.insetGrouped)
                .scrollContentBackground(.hidden)
                .background(Theme.paper)
                .searchable(text: $query, prompt: "Search terms")
            }
        }
        .background(Theme.paper)
        .navigationTitle("Medical taxonomy")
        .navigationBarTitleDisplayMode(.inline)
        .task { await load() }
    }

    private var filtered: [Term] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return terms }
        return terms.filter {
            $0.english.localizedCaseInsensitiveContains(trimmed) || $0.arabic.contains(trimmed)
        }
    }

    private func load() async {
        isLoading = true
        defer { isLoading = false }

        guard
            let document = try? await store.catalogue(key: SyncEngine.glossaryKey),
            let raw = try? JSONSerialization.jsonObject(with: document) as? [[String: Any]]
        else { return }

        terms = raw.compactMap { entry in
            guard let english = (entry["en"] as? String ?? entry["english"] as? String
                                 ?? entry["term"] as? String)?.trimmed.nilIfEmpty else { return nil }
            return Term(
                id: entry["id"] as? String ?? english,
                english: english,
                arabic: (entry["ar"] as? String ?? entry["arabic"] as? String)?.trimmed ?? "",
                category: (entry["category"] as? String)?.trimmed ?? ""
            )
        }
        .sorted { $0.english.localizedCaseInsensitiveCompare($1.english) == .orderedAscending }
    }
}

// MARK: - Billing

/// Plan and entitlement.
///
/// Read-only by design, and no purchase route: App Store rules require in-app
/// purchase for digital content bought inside an app, so buying stays on the
/// website until that is a deliberate decision. There is no link out either —
/// that is what the rules forbid.
struct BillingView: View {
    let audienceStore: AudienceStore

    var body: some View {
        List {
            Section("Your plan") {
                row("Plan", audienceStore.entitlement?.plan ?? "Free")
                row("Status", stateLabel)
                if let expires = audienceStore.entitlement?.expiresAt {
                    row("Renews", String(expires.prefix(10)))
                }
                if let days = audienceStore.entitlement?.daysLeft {
                    row("Days left", "\(days)")
                }
            }
            .listRowBackground(Theme.surface)

            Section {
                Text("Synapse does not take payments in the app. Your plan is managed on the website.")
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
            }
            .listRowBackground(Theme.surface)
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .navigationTitle("Billing")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var stateLabel: String {
        switch audienceStore.entitlement?.state {
        case "active": "Active"
        case "trialing": "Trial"
        case "expired": "Expired"
        case "cancelled": "Cancelled"
        default: "No subscription"
        }
    }

    private func row(_ label: LocalizedStringKey, _ value: String) -> some View {
        HStack {
            Text(label).font(Theme.panelTitle()).foregroundStyle(Theme.ink2)
            Spacer()
            Text(value).font(Theme.ui(14)).foregroundStyle(Theme.ink)
        }
    }
}
