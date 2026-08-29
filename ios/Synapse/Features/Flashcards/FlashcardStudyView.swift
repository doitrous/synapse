import SwiftUI

/// The study loop: reveal a card, then say how it went.
///
/// The queue is snapshotted on arrival so grading a card does not reshuffle the
/// deck under the student mid-session. Each of the four answers shows the
/// interval it would earn, previewed from the deck's own scheduler, before it is
/// committed — the same information the website's answer buttons carry.
struct FlashcardStudyView: View {
    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss

    @Bindable var store: FlashcardStore
    let deckId: String

    @State private var queue: [String] = []
    @State private var index = 0
    @State private var revealed = false
    @State private var studied = 0
    @State private var shownAt = Date()

    private var currentId: String? { index < queue.count ? queue[index] : nil }

    var body: some View {
        VStack(spacing: 0) {
            header
            Divider().overlay(Theme.line)
            if let id = currentId, let card = store.card(id), let note = store.note(card.noteId) {
                cardBody(card: card, note: note)
                footer(cardId: id)
            } else {
                done
            }
        }
        .background(Theme.paper)
        .onAppear {
            queue = store.studyQueue(forDeck: deckId)
            shownAt = Date()
        }
    }

    private var header: some View {
        HStack {
            Button { dismiss() } label: {
                Image(systemName: "xmark").font(.system(size: 16, weight: .semibold)).foregroundStyle(Theme.ink2)
            }
            Spacer()
            if !queue.isEmpty {
                Text("\(min(index + 1, queue.count)) / \(queue.count)")
                    .font(Theme.numeric(13)).foregroundStyle(Theme.ink3)
            }
            Spacer()
            // Balances the close button so the counter stays centred.
            Image(systemName: "xmark").font(.system(size: 16, weight: .semibold)).foregroundStyle(.clear)
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 14)
    }

    @ViewBuilder
    private func cardBody(card: Card, note: FlashcardNote) -> some View {
        ScrollView {
            VStack(spacing: 20) {
                frontText(card, note)
                    .font(Theme.display(22))
                    .foregroundStyle(Theme.ink)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)

                if revealed {
                    Divider().overlay(Theme.line).padding(.horizontal, 40)
                    backText(card, note)
                        .font(Theme.ui(18))
                        .foregroundStyle(Theme.ink2)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)

                    // A cloze note's "extra" sits under the revealed sentence.
                    if note.type == .cloze, let extra = note.fields.extra, !Self.plain(extra).isEmpty {
                        Text(Self.plain(extra))
                            .font(Theme.ui(14))
                            .foregroundStyle(Theme.ink3)
                            .multilineTextAlignment(.center)
                            .frame(maxWidth: .infinity)
                    }
                }
            }
            .padding(28)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .contentShape(Rectangle())
        .onTapGesture { if !revealed { revealed = true } }
    }

    @ViewBuilder
    private func footer(cardId: String) -> some View {
        if revealed {
            gradeButtons(cardId: cardId)
        } else {
            Button { revealed = true } label: {
                Text(strings("Show answer"))
                    .font(Theme.ui(16, weight: 600))
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 15)
                    .background(Theme.primary, in: RoundedRectangle(cornerRadius: Theme.Radius.xl))
            }
            .buttonStyle(.plain)
            .padding(20)
        }
    }

    private func gradeButtons(cardId: String) -> some View {
        let preview = store.meta(cardId).map { store.scheduler(forDeck: deckId).preview($0.schedule, now: Date()) } ?? [:]
        return HStack(spacing: 8) {
            gradeButton(.again, "Again", preview, cardId, filled: false, accent: Theme.ink2)
            gradeButton(.hard, "Hard", preview, cardId, filled: false, accent: Theme.ink)
            gradeButton(.good, "Good", preview, cardId, filled: true, accent: Theme.primary)
            gradeButton(.easy, "Easy", preview, cardId, filled: false, accent: Theme.primary)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 16)
    }

    private func gradeButton(
        _ grade: Grade, _ label: String, _ preview: GradePreview,
        _ cardId: String, filled: Bool, accent: Color
    ) -> some View {
        Button {
            answer(grade, cardId: cardId)
        } label: {
            VStack(spacing: 3) {
                Text(strings(label)).font(Theme.ui(14, weight: 600))
                if let sched = preview[grade] {
                    Text(Self.intervalLabel(sched, now: Date())).font(Theme.numeric(11)).opacity(0.9)
                }
            }
            .foregroundStyle(filled ? .white : accent)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: Theme.Radius.lg)
                    .fill(filled ? accent : Theme.surface)
            )
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.lg)
                    .stroke(filled ? Color.clear : Theme.line, lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
    }

    private var done: some View {
        VStack(spacing: 10) {
            Spacer()
            Image(systemName: studied > 0 ? "checkmark.circle" : "moon.zzz")
                .font(.system(size: 34)).foregroundStyle(Theme.ink3)
            Text(strings(studied > 0 ? "Session complete" : "Nothing due right now"))
                .font(Theme.display(20)).foregroundStyle(Theme.ink)
            if studied > 0 {
                Text("\(studied) card\(studied == 1 ? "" : "s") studied")
                    .font(Theme.ui(14)).foregroundStyle(Theme.ink2)
            }
            Spacer()
            Button { dismiss() } label: {
                Text(strings("Done"))
                    .font(Theme.ui(16, weight: 600)).foregroundStyle(Theme.primary)
                    .padding(.vertical, 12)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(24)
    }

    private func answer(_ grade: Grade, cardId: String) {
        let spent = Int(Date().timeIntervalSince(shownAt) * 1000)
        Task { await store.grade(cardId, answer: grade, timeSpentMs: spent) }
        studied += 1
        index += 1
        revealed = false
        shownAt = Date()
    }

    // MARK: rendering

    /// The card's active cloze number, from its template key `c<n>`.
    private func activeNumber(_ card: Card) -> Int? {
        card.templateKey.hasPrefix("c") ? Int(card.templateKey.dropFirst()) : nil
    }

    private func frontText(_ card: Card, _ note: FlashcardNote) -> Text {
        if note.type == .cloze, let n = activeNumber(card) {
            return Self.clozeText(Cloze.renderSide(note.fields.text ?? "", activeNumber: n, side: .front))
        }
        return Text(front(note))
    }

    private func backText(_ card: Card, _ note: FlashcardNote) -> Text {
        if note.type == .cloze, let n = activeNumber(card) {
            return Self.clozeText(Cloze.renderSide(note.fields.text ?? "", activeNumber: n, side: .back))
        }
        return Text(back(note))
    }

    /// Compose cloze cells into one run: the active blank and its answer stand
    /// out in the accent; the surrounding text and sibling deletions read
    /// plainly. Whitespace inside each run is kept (unlike `plain`) so the
    /// sentence does not collapse around the blank.
    static func clozeText(_ cells: [ClozeCell]) -> Text {
        cells.reduce(Text(verbatim: "")) { acc, cell in
            switch cell {
            case .text(let t):
                return acc + Text(unhtml(t))
            case .blank(let hint):
                return acc + Text(hint.map { "[\(unhtml($0))]" } ?? "[…]").foregroundColor(Theme.primary).bold()
            case .answer(let a):
                return acc + Text(unhtml(a)).foregroundColor(Theme.primary).bold()
            }
        }
    }

    private func front(_ note: FlashcardNote) -> String {
        switch note.type {
        case .basic: return Self.plain(note.fields.front)
        case .cloze: return Self.plain(note.fields.text)
        case .imageOcclusion: return Self.plain(note.fields.header)
        }
    }

    private func back(_ note: FlashcardNote) -> String {
        switch note.type {
        case .basic: return Self.plain(note.fields.back)
        case .cloze: return Self.plain(note.fields.extra)
        case .imageOcclusion: return Self.plain(note.fields.back)
        }
    }

    /// Strip HTML tags and decode the common entities, but keep whitespace as-is.
    static func unhtml(_ s: String) -> String {
        s.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
            .replacingOccurrences(of: "&nbsp;", with: " ")
            .replacingOccurrences(of: "&amp;", with: "&")
            .replacingOccurrences(of: "&lt;", with: "<")
            .replacingOccurrences(of: "&gt;", with: ">")
            .replacingOccurrences(of: "&#39;", with: "'")
            .replacingOccurrences(of: "&quot;", with: "\"")
    }

    /// Plain text for a rich-text field. Web cards carry sanitized HTML; a
    /// full rich renderer is a later phase, so tags are stripped for now and
    /// iOS-authored plain text passes straight through.
    static func plain(_ rich: RichText?) -> String {
        guard let rich else { return "" }
        let stripped = rich.replacingOccurrences(of: "<[^>]+>", with: " ", options: .regularExpression)
        return stripped
            .replacingOccurrences(of: "&nbsp;", with: " ")
            .replacingOccurrences(of: "&amp;", with: "&")
            .replacingOccurrences(of: "&lt;", with: "<")
            .replacingOccurrences(of: "&gt;", with: ">")
            .replacingOccurrences(of: "&#39;", with: "'")
            .replacingOccurrences(of: "&quot;", with: "\"")
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    /// A short "when it comes back" label from a previewed schedule.
    static func intervalLabel(_ schedule: CardSchedule, now: Date) -> String {
        guard let due = ISO8601DateFormatter.read(schedule.due) else { return "" }
        let secs = due.timeIntervalSince(now)
        if secs < 45 * 60 { return "\(max(1, Int((secs / 60).rounded())))m" }
        if secs < 20 * 3600 { return "\(Int((secs / 3600).rounded()))h" }
        return "\(Int((secs / 86400).rounded()))d"
    }
}
