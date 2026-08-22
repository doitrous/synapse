import SwiftUI

// MARK: - Calendar

/// A student's own study blocks, plus the university timetable when there is
/// one.
///
/// The curriculum layer is empty on this deployment — no schedule has been
/// published — so the screen leads with what a student can control, and says
/// plainly that the timetable is missing rather than showing a blank grid.
/// One planned block of study.
///
/// Every field the website writes is held, including the two this app does not
/// yet offer. The list is stored as one array and rewritten whole, and Swift
/// drops keys it does not know — so a missing field would be erased from every
/// block the moment any one of them was ticked off on the phone.
struct StudyBlock: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    /// `YYYY-MM-DD`, as the web app stores it.
    var date: String
    /// `HH:MM`, local.
    var start: String
    var end: String
    var subjectId: String
    /// The module this block belongs to, e.g. `"CVS 01"`. Optional, because a
    /// student can plan against a subject without naming a module.
    var moduleId: String?
    var kind: String
    /// Set when the student ticks it off.
    var done: Bool?
    /// The timetable session this was planned from, when it came from one.
    var sourceSessionId: String?

    static let storageKey = "synapse.calendar.blocks"

    /// Minutes between the two `HH:MM` values, floored at zero.
    var minutes: Int {
        func parse(_ value: String) -> Int? {
            let parts = value.split(separator: ":")
            guard parts.count == 2, let h = Int(parts[0]), let m = Int(parts[1]) else { return nil }
            return h * 60 + m
        }
        guard let from = parse(start), let to = parse(end) else { return 0 }
        return max(0, to - from)
    }
}

struct CalendarView: View {
    @Environment(\.strings) private var strings
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
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                List {
                    if !hasCurriculum {
                        Section {
                            Text(strings("Your university has not published a timetable yet. Anything you plan below is your own, and syncs to the website."))
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink2)
                        }
                        .listRowBackground(Theme.surface)
                    }

                    if blocks.isEmpty {
                        Section {
                            Text(strings("Nothing planned yet."))
                                .font(Theme.ui(14))
                                .foregroundStyle(Theme.ink3)
                        }
                        .listRowBackground(Theme.surface)
                    } else {
                        ForEach(grouped, id: \.date) { group in
                            Section {
                                ForEach(group.blocks) { block in
                                    Button {
                                        Task { await toggle(block) }
                                    } label: {
                                        HStack(spacing: 10) {
                                            // Ticking one off is the whole
                                            // point of planning it, and the
                                            // field was being stored with
                                            // nothing able to set it.
                                            Image(systemName: block.done == true
                                                ? "checkmark.circle.fill" : "circle")
                                                .foregroundStyle(block.done == true ? Theme.success : Theme.ink3)

                                            VStack(alignment: .leading, spacing: 2) {
                                                Text(block.title)
                                                    .font(Theme.ui(15, weight: 500))
                                                    .foregroundStyle(block.done == true ? Theme.ink2 : Theme.ink)
                                                    .strikethrough(block.done == true, color: Theme.ink3)

                                                HStack(spacing: 6) {
                                                    Text("\(block.start)–\(block.end)")
                                                    if block.minutes > 0 {
                                                        Text("· \(block.minutes) min")
                                                    }
                                                    if let module = block.moduleId, !module.isEmpty {
                                                        Text("· \(module)")
                                                    }
                                                }
                                                .font(Theme.numeric(11))
                                                .foregroundStyle(Theme.ink3)
                                            }
                                        }
                                    }
                                    .buttonStyle(.plain)
                                    .listRowBackground(Theme.surface)
                                    .swipeActions {
                                        Button(strings("Delete"), role: .destructive) {
                                            Task { await remove(block) }
                                        }
                                    }
                                }
                            } header: {
                                HStack {
                                    Text(dayLabel(group.date))
                                    Spacer()
                                    // What the day actually asks of you, which
                                    // is the number worth seeing before it
                                    // starts.
                                    let planned = group.blocks.reduce(0) { $0 + $1.minutes }
                                    if planned > 0 {
                                        Text("\(planned) min")
                                            .font(Theme.numeric(11))
                                    }
                                }
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
        .navigationTitle(strings("Calendar"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button { adding = true } label: { Image(systemName: "plus") }
                    .tint(Theme.primary)
            }
        }
        .sheet(isPresented: $adding) {
            StudyBlockEditor { block in Task { await add(block) } }
        .localisedSheet()
        }
        .task { await load() }
    }

    /// Today and tomorrow by name, everything else by date — a student
    /// scanning the list is looking for "today" first.
    private func dayLabel(_ iso: String) -> String {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .current

        let formatter = DateFormatter()
        formatter.calendar = calendar
        formatter.dateFormat = "yyyy-MM-dd"
        guard let date = formatter.date(from: iso) else { return iso }

        if calendar.isDateInToday(date) { return "Today" }
        if calendar.isDateInTomorrow(date) { return "Tomorrow" }
        if calendar.isDateInYesterday(date) { return "Yesterday" }
        return date.formatted(.dateTime.weekday(.abbreviated).day().month(.abbreviated))
    }

    /// Tick a block off, or put it back.
    private func toggle(_ block: StudyBlock) async {
        guard let index = blocks.firstIndex(where: { $0.id == block.id }) else { return }
        blocks[index].done = !(blocks[index].done ?? false)
        await sync.write(key: StudyBlock.storageKey, value: blocks)
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
    @Environment(\.strings) private var strings
    let save: (StudyBlock) -> Void
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var date = Date()
    @State private var start = Date()
    @State private var end = Date().addingTimeInterval(3600)

    var body: some View {
        NavigationStack {
            Form {
                TextField(strings("What are you studying?"), text: $title)
                DatePicker("Day", selection: $date, displayedComponents: .date)
                DatePicker("From", selection: $start, displayedComponents: .hourAndMinute)
                DatePicker("To", selection: $end, displayedComponents: .hourAndMinute)
            }
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("Plan a session"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button(strings("Cancel")) { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button(strings("Add")) {
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
    @Environment(\.strings) private var strings
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
                ProgressView().tint(Theme.primary)
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
        .navigationTitle(strings("Medical taxonomy"))
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

