import SwiftUI
import Observation

/// Loads the glossary terms Term Match draws from — the same document the
/// Terminology page and the website read (`SyncEngine.glossaryKey`).
@MainActor
@Observable
final class TermMatchModel {
    private(set) var terms: [MedicalTerm] = []
    private(set) var isLoading = true

    private let store: LocalStore

    init(store: LocalStore) { self.store = store }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        struct Doc: Codable { var terms: [MedicalTerm]? }
        if let document = try? await store.catalogue(key: SyncEngine.glossaryKey),
           let doc = try? JSONDecoder().decode(Doc.self, from: document) {
            terms = doc.terms ?? []
        }
    }
}

/// Term Match — pick two tiles at a time, a term against its Arabic translation
/// or its plain definition. A port of the web's `TermMatchPage`; the board it
/// builds for a given seed and mode is identical to the web's, so a shared link
/// opens the same board on either platform.
struct TermMatchView: View {
    @Environment(\.strings) private var strings
    @State private var model: TermMatchModel
    @State private var mode: MatchMode = .arabic
    @State private var seed = Int.random(in: 0..<0x7fff_ffff)

    init(store: LocalStore) {
        _model = State(wrappedValue: TermMatchModel(store: store))
    }

    private var board: MatchBoard {
        TermMatch.buildBoard(terms: model.terms, mode: mode, seed: seed)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if model.isLoading {
                    ProgressView().frame(maxWidth: .infinity).padding(.top, 40)
                } else if board.refusal != nil {
                    notEnough
                } else {
                    controls
                    TermMatchBoardView(board: board) { seed = Int.random(in: 0..<0x7fff_ffff) }
                        .id("\(mode.rawValue)-\(seed)")
                }
            }
            .padding(16)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
        .navigationTitle(strings("Term Match"))
        .navigationBarTitleDisplayMode(.inline)
        .task { await model.load() }
    }

    private var controls: some View {
        HStack {
            Picker("", selection: $mode) {
                Text(strings("Arabic")).tag(MatchMode.arabic)
                Text(strings("Definition")).tag(MatchMode.definition)
            }
            .pickerStyle(.segmented)
            .frame(maxWidth: 240)

            Spacer()

            // A friend who opens this link — on the phone or the website — gets
            // the identical board, because the seed and mode rebuild it exactly.
            ShareLink(item: URL(string: "https://nishany.com/app/term-match?seed=\(seed)&mode=\(mode.rawValue)")!) {
                Image(systemName: "square.and.arrow.up").font(.system(size: 17, weight: .semibold))
            }
            .tint(Theme.primary)
        }
    }

    private var notEnough: some View {
        VStack(spacing: 10) {
            Image(systemName: "shuffle").font(.system(size: 28)).foregroundStyle(Theme.ink3)
            Text(strings("Not enough terms for Term Match"))
                .font(Theme.ui(16, weight: 700)).foregroundStyle(Theme.ink)
            Text(strings("Term Match needs at least six terms with a translation or definition — there are too few published for your cohort right now."))
                .font(Theme.ui(13)).foregroundStyle(Theme.ink3)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 40)
    }
}

/// One board, from first tap through the finish panel. Remounted (via `.id`)
/// when the seed or mode changes, so a new game starts from clean local state.
private struct TermMatchBoardView: View {
    @Environment(\.strings) private var strings
    let board: MatchBoard
    let onReplay: () -> Void

    @State private var selectedId: String?
    @State private var matched: Set<String> = []
    @State private var wrong: Set<String> = []
    @State private var wrongAttempts = 0
    @State private var startedAt = Date()
    @State private var finishedAt: Date?

    /// How long a wrong pair stays flagged before it clears — long enough to
    /// register, short enough not to slow the round.
    private let mismatchFlash: Duration = .milliseconds(650)

    private var byId: [String: MatchTile] {
        Dictionary(uniqueKeysWithValues: (board.termTiles + board.partnerTiles).map { ($0.id, $0) })
    }

    var body: some View {
        if let finishedAt {
            finish(finishedAt)
        } else {
            HStack(alignment: .top, spacing: 12) {
                column(strings("Terms"), tiles: board.termTiles)
                column(board.mode == .arabic ? strings("Arabic") : strings("Definition"),
                       tiles: board.partnerTiles)
            }
        }
    }

    private func column(_ title: String, tiles: [MatchTile]) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title.uppercased())
                .font(Theme.ui(11, weight: 700))
                .tracking(1.2)
                .foregroundStyle(Theme.ink3)
            ForEach(tiles) { tile in
                tileButton(tile)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func tileButton(_ tile: MatchTile) -> some View {
        let state = self.state(tile)
        return Button { tap(tile) } label: {
            Text(tile.text)
                .font(Theme.ui(13.5, weight: 600))
                .multilineTextAlignment(.center)
                .frame(maxWidth: .infinity, minHeight: 56)
                .padding(.horizontal, 10).padding(.vertical, 6)
                .background(background(state))
                .foregroundStyle(foreground(state))
                .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(border(state), lineWidth: 1))
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                .environment(\.layoutDirection, tile.isArabic ? .rightToLeft : .leftToRight)
        }
        .buttonStyle(.plain)
        .disabled(state == .matched)
        .animation(.easeOut(duration: 0.15), value: state)
    }

    private func finish(_ at: Date) -> some View {
        HStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 2) {
                Text(strings("Time taken"))
                    .font(Theme.ui(11, weight: 700)).tracking(1).foregroundStyle(Theme.ink3)
                Text(TermMatchBoardView.elapsed(at.timeIntervalSince(startedAt)))
                    .font(Theme.numeric(20)).foregroundStyle(Theme.ink)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text(strings("Wrong attempts"))
                    .font(Theme.ui(11, weight: 700)).tracking(1).foregroundStyle(Theme.ink3)
                Text("\(wrongAttempts)")
                    .font(Theme.numeric(20)).foregroundStyle(Theme.ink)
            }
            Spacer()
            Button(strings("Play again")) { onReplay() }
                .font(Theme.ui(15, weight: 600))
                .padding(.horizontal, 16).frame(height: 44)
                .background(Theme.primary).foregroundStyle(Theme.onPrimary)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                .buttonStyle(.plain)
        }
        .padding(16)
        .background(Theme.successTint)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.success.opacity(0.4), lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }

    // MARK: - Interaction

    private enum TileState { case idle, selected, matched, wrong }

    private func state(_ tile: MatchTile) -> TileState {
        if matched.contains(tile.id) { return .matched }
        if wrong.contains(tile.id) { return .wrong }
        if selectedId == tile.id { return .selected }
        return .idle
    }

    private func tap(_ tile: MatchTile) {
        // While a wrong pair is flashing, the board is inert — the same beat
        // the web takes so a student sees which two they tried.
        if matched.contains(tile.id) || !wrong.isEmpty { return }
        if selectedId == tile.id { selectedId = nil; return }
        guard let firstId = selectedId, let first = byId[firstId] else {
            selectedId = tile.id
            return
        }

        if TermMatch.isPair(first, tile) {
            matched.insert(first.id); matched.insert(tile.id)
            selectedId = nil
            if matched.count == board.termTiles.count + board.partnerTiles.count {
                finishedAt = Date()
            }
            return
        }

        wrongAttempts += 1
        wrong = [first.id, tile.id]
        selectedId = nil
        Task {
            try? await Task.sleep(for: mismatchFlash)
            wrong = []
        }
    }

    // MARK: - Styling

    private func background(_ s: TileState) -> Color {
        switch s {
        case .idle: Theme.surface
        case .selected: Theme.primaryTint
        case .matched: Theme.successTint.opacity(0.4)
        case .wrong: Theme.dangerTint
        }
    }
    private func foreground(_ s: TileState) -> Color {
        switch s {
        case .idle: Theme.ink
        case .selected: Theme.primaryStrong
        case .matched: Theme.success
        case .wrong: Theme.danger
        }
    }
    private func border(_ s: TileState) -> Color {
        switch s {
        case .idle: Theme.line
        case .selected: Theme.primary
        case .matched: Theme.success.opacity(0.4)
        case .wrong: Theme.danger
        }
    }

    /// 75s → "1m 15s"; under a minute → "42s".
    static func elapsed(_ seconds: TimeInterval) -> String {
        let total = max(0, Int(seconds.rounded()))
        return total >= 60 ? "\(total / 60)m \(total % 60)s" : "\(total)s"
    }
}
