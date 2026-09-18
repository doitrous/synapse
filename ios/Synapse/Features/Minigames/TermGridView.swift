import SwiftUI
import UIKit
import Observation

/// Loads the glossary Term Grid draws its words and clues from — the same
/// document Term Match and the Terminology page read (`SyncEngine.glossaryKey`).
@MainActor
@Observable
final class TermGridModel {
    private(set) var terms: [MedicalTerm] = []
    private(set) var isLoading = true

    private let store: LocalStore
    init(store: LocalStore) { self.store = store }

    /// Categories that carry at least the crossword's floor of usable terms,
    /// in first-seen order — a category with too few words to interlock is not
    /// offered, so a student never picks one that only refuses.
    var categories: [String] {
        var counts: [String: Int] = [:]
        var order: [String] = []
        for term in terms where !term.def.trimmingCharacters(in: .whitespaces).isEmpty
            && TermGrid.normalizeAnswer(term.term).count >= 3 {
            let key = term.category.isEmpty ? "General" : term.category
            if counts[key] == nil { order.append(key) }
            counts[key, default: 0] += 1
        }
        return order.filter { counts[$0]! >= TermGrid.minTerms }
    }

    func gridTerms(category: String) -> [GridTerm] {
        terms
            .filter { ($0.category.isEmpty ? "General" : $0.category) == category }
            .map { GridTerm(term: $0.term, clue: $0.def) }
    }

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

/// Term Grid — a crossword built from the glossary, one term per clue. A port
/// of the web's `TermGridPage`; the grid built for a category and seed is
/// identical to the web's, so a shared link opens the same puzzle on either
/// platform.
struct TermGridView: View {
    @Environment(\.strings) private var strings
    @State private var model: TermGridModel
    @State private var category = ""
    @State private var seed = Int.random(in: 0..<0x7fff_ffff)

    init(store: LocalStore) {
        _model = State(wrappedValue: TermGridModel(store: store))
    }

    private var resolvedCategory: String {
        if !category.isEmpty, model.categories.contains(category) { return category }
        return model.categories.first ?? ""
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if model.isLoading {
                    ProgressView().frame(maxWidth: .infinity).padding(.top, 40)
                } else if model.categories.isEmpty {
                    notEnough
                } else {
                    controls
                    let terms = model.gridTerms(category: resolvedCategory)
                    TermGridBoardView(
                        grid: TermGrid.buildGrid(terms: terms, seed: seed),
                        seed: seed
                    ) { seed = Int.random(in: 0..<0x7fff_ffff) }
                    .id("\(resolvedCategory)-\(seed)")
                }
            }
            .padding(16)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
        .navigationTitle(strings("Term Grid"))
        .navigationBarTitleDisplayMode(.inline)
        .task { await model.load() }
    }

    private var controls: some View {
        HStack(spacing: 12) {
            Menu {
                Picker("", selection: $category) {
                    ForEach(model.categories, id: \.self) { Text(strings($0)).tag($0) }
                }
            } label: {
                HStack(spacing: 4) {
                    Text(strings(resolvedCategory)).font(Theme.ui(14, weight: 600)).lineLimit(1)
                    Image(systemName: "chevron.up.chevron.down").font(.system(size: 10, weight: .semibold))
                }
                .foregroundStyle(Theme.ink)
                .padding(.horizontal, 12).frame(height: 34)
                .background(Theme.surface).clipShape(Capsule())
                .overlay(Capsule().stroke(Theme.line, lineWidth: 1))
            }
            .onAppear { if category.isEmpty { category = resolvedCategory } }

            Spacer()

            // A friend who opens this link — on the phone or the website — gets
            // the identical puzzle, because category and seed rebuild it exactly.
            ShareLink(item: shareURL) {
                Image(systemName: "square.and.arrow.up").font(.system(size: 17, weight: .semibold))
            }
            .tint(Theme.primary)
        }
    }

    private var shareURL: URL {
        var components = URLComponents(string: "https://nishany.com/app/term-grid")!
        components.queryItems = [
            URLQueryItem(name: "category", value: resolvedCategory),
            URLQueryItem(name: "seed", value: String(seed)),
        ]
        return components.url!
    }

    private var notEnough: some View {
        VStack(spacing: 10) {
            Image(systemName: "grid").font(.system(size: 28)).foregroundStyle(Theme.ink3)
            Text(strings("Not enough terms for Term Grid"))
                .font(Theme.ui(16, weight: 700)).foregroundStyle(Theme.ink)
            Text(strings("Term Grid needs a category of at least eight terms with definitions — there are too few published for your cohort right now."))
                .font(Theme.ui(13)).foregroundStyle(Theme.ink3)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 40)
    }
}

/// One puzzle, from first tap through the finish panel. Remounted (via `.id`)
/// when the category or seed changes, so a new puzzle starts from clean state.
private struct TermGridBoardView: View {
    @Environment(\.strings) private var strings
    let grid: Grid
    let seed: Int
    let onReplay: () -> Void

    // Typed letters keyed "row,column". Given letters are seeded here at build
    // and never counted as the student's own; revealed words land here too so
    // the board shows them and a crossing word can still be finished.
    @State private var typed: [String: Character] = [:]
    @State private var revealed: Set<String> = []
    @State private var selected: String?
    @State private var direction: GridDirection = .across
    @State private var startedAt = Date()
    @State private var finishedAt: Date?

    private let puzzle: Puzzle

    init(grid: Grid, seed: Int, onReplay: @escaping () -> Void) {
        self.grid = grid
        self.seed = seed
        self.onReplay = onReplay
        self.puzzle = Puzzle(grid: grid, givens: Set(TermGrid.givenTerms(grid, seed: seed, count: 2)))
        _typed = State(initialValue: puzzle.givenLetters)
    }

    var body: some View {
        if grid.words.isEmpty {
            EmptyView()
        } else if let finishedAt {
            finish(finishedAt)
        } else {
            VStack(alignment: .leading, spacing: 16) {
                gridView
                clueBar
                clueList
                // A hidden key catcher parked off-screen: it receives each typed
                // letter and each Backspace directly (no text-binding to race),
                // so fast typing and paste never drop characters.
                KeyCatcher(isActive: selected != nil, onInsert: insert, onDelete: deleteBack)
                    .frame(width: 1, height: 1).opacity(0.01)
            }
        }
    }

    // MARK: - Grid

    private var cellSize: CGFloat {
        // Fit the width to the screen, but never shrink a cell past legibility;
        // a wide grid scrolls horizontally instead.
        let usable = min(UIScreen.main.bounds.width - 32, 648)
        return max(24, min(38, usable / CGFloat(grid.width)))
    }

    private var gridView: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            VStack(spacing: 2) {
                ForEach(0..<grid.height, id: \.self) { row in
                    HStack(spacing: 2) {
                        ForEach(0..<grid.width, id: \.self) { column in
                            cell(row, column)
                        }
                    }
                }
            }
        }
    }

    @ViewBuilder
    private func cell(_ row: Int, _ column: Int) -> some View {
        let key = "\(row),\(column)"
        if puzzle.solution[key] != nil {
            let isSelected = selected == key
            let inActive = activeCells.contains(key)
            let letter = typed[key].map(String.init) ?? ""
            let wrong = !letter.isEmpty && typed[key] != puzzle.solution[key]

            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 4)
                    .fill(isSelected ? Theme.primaryTint : (inActive ? Theme.primaryTint.opacity(0.4) : Theme.surface))
                    .overlay(RoundedRectangle(cornerRadius: 4).stroke(isSelected ? Theme.primary : Theme.line, lineWidth: isSelected ? 1.5 : 1))
                if let number = puzzle.numbers[key] {
                    Text("\(number)").font(.system(size: 8, weight: .semibold))
                        .foregroundStyle(Theme.ink3).padding(1.5)
                }
                Text(letter)
                    .font(Theme.ui(cellSize * 0.46, weight: 600))
                    .foregroundStyle(puzzle.givenCells.contains(key) ? Theme.ink3 : (wrong ? Theme.danger : Theme.ink))
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .frame(width: cellSize, height: cellSize)
            .contentShape(Rectangle())
            .onTapGesture { select(key) }
        } else {
            Color.clear.frame(width: cellSize, height: cellSize)
        }
    }

    // MARK: - Clue bar + list

    @ViewBuilder
    private var clueBar: some View {
        if let word = activeWord {
            HStack(alignment: .top, spacing: 12) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(word.number) \(word.direction == .across ? strings("Across") : strings("Down"))")
                        .font(Theme.ui(11, weight: 700)).tracking(0.6).foregroundStyle(Theme.primaryStrong)
                    Text(word.clue).font(Theme.serifBody(15)).foregroundStyle(Theme.ink)
                }
                Spacer(minLength: 8)
                Button(strings("Reveal")) { reveal(word) }
                    .font(Theme.ui(12, weight: 600)).foregroundStyle(Theme.danger)
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .card(Theme.Radius.lg)
        }
    }

    private var clueList: some View {
        VStack(alignment: .leading, spacing: 14) {
            clueColumn(strings("Across"), .across)
            clueColumn(strings("Down"), .down)
        }
    }

    private func clueColumn(_ title: String, _ dir: GridDirection) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title.uppercased()).font(Theme.ui(11, weight: 700)).tracking(1.2).foregroundStyle(Theme.ink3)
            ForEach(grid.words.filter { $0.direction == dir }.sorted { $0.number < $1.number }) { word in
                Button { select(startKey(word)); direction = dir } label: {
                    HStack(alignment: .top, spacing: 8) {
                        Text("\(word.number)").font(Theme.numeric(12)).foregroundStyle(Theme.ink3)
                            .frame(width: 20, alignment: .trailing)
                        Text(word.clue)
                            .font(Theme.ui(13))
                            .foregroundStyle(isSolved(word) ? Theme.success : Theme.ink2)
                            .strikethrough(isSolved(word), color: Theme.success)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
                .buttonStyle(.plain)
            }
        }
    }

    private func finish(_ at: Date) -> some View {
        HStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 2) {
                Text(strings("Time taken")).font(Theme.ui(11, weight: 700)).tracking(1).foregroundStyle(Theme.ink3)
                Text(TermGridBoardView.elapsed(at.timeIntervalSince(startedAt)))
                    .font(Theme.numeric(20)).foregroundStyle(Theme.ink)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text(strings("Revealed")).font(Theme.ui(11, weight: 700)).tracking(1).foregroundStyle(Theme.ink3)
                Text("\(revealed.count)").font(Theme.numeric(20)).foregroundStyle(Theme.ink)
            }
            Spacer()
            Button(strings("New puzzle")) { onReplay() }
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

    // MARK: - Active word

    private var activeWord: PlacedWord? {
        guard let selected else { return nil }
        return puzzle.word(at: selected, direction: direction)
            ?? puzzle.word(at: selected, direction: direction == .across ? .down : .across)
    }

    private var activeCells: Set<String> {
        guard let word = activeWord else { return [] }
        return Set(puzzle.cells(of: word))
    }

    // MARK: - Interaction

    private func select(_ key: String) {
        if selected == key {
            // Re-tap flips direction, but only where both a down and an across
            // word actually run through the square.
            if puzzle.word(at: key, direction: direction == .across ? .down : .across) != nil {
                direction = direction == .across ? .down : .across
            }
            return
        }
        selected = key
        // Keep the current direction if this square has a word in it; otherwise
        // switch to the one it does have.
        if puzzle.word(at: key, direction: direction) == nil {
            direction = direction == .across ? .down : .across
        }
    }

    /// One or more characters arriving from the keyboard (fast typing and paste
    /// both come through here). Each letter fills the selected cell and moves on.
    private func insert(_ text: String) {
        for character in text {
            let letter = TermGrid.normalizeLetter(String(character))
            guard !letter.isEmpty else { continue }
            guard let current = selected else { break }
            if !puzzle.givenCells.contains(current) { typed[current] = Character(letter) }
            guard let next = step(from: current, forward: true) else { break }
            selected = next
        }
        checkComplete()
    }

    /// Backspace: clear this cell, or step back and clear the one before it.
    private func deleteBack() {
        guard let sel = selected else { return }
        if !puzzle.givenCells.contains(sel), typed[sel] != nil {
            typed[sel] = nil
        } else if let prev = step(from: sel, forward: false) {
            selected = prev
            if !puzzle.givenCells.contains(prev) { typed[prev] = nil }
        }
    }

    /// The next (or previous) cell along the active word, or nil at the end.
    private func step(from key: String, forward: Bool) -> String? {
        guard let word = activeWord else { return nil }
        let cells = puzzle.cells(of: word)
        guard let index = cells.firstIndex(of: key) else { return nil }
        let target = forward ? index + 1 : index - 1
        return cells.indices.contains(target) ? cells[target] : nil
    }

    private func reveal(_ word: PlacedWord) {
        revealed.insert(word.term)
        for key in puzzle.cells(of: word) { typed[key] = puzzle.solution[key] }
        checkComplete()
    }

    private func isSolved(_ word: PlacedWord) -> Bool {
        puzzle.cells(of: word).allSatisfy { typed[$0] == puzzle.solution[$0] }
    }

    private func checkComplete() {
        guard finishedAt == nil else { return }
        let done = puzzle.solution.allSatisfy { key, letter in typed[key] == letter }
        if done { finishedAt = Date() }
    }

    private func startKey(_ word: PlacedWord) -> String { "\(word.row),\(word.column)" }

    /// 75s → "1m 15s"; under a minute → "42s".
    static func elapsed(_ seconds: TimeInterval) -> String {
        let total = max(0, Int(seconds.rounded()))
        return total >= 60 ? "\(total / 60)m \(total % 60)s" : "\(total)s"
    }
}

/// An off-screen first responder that catches keystrokes for the crossword.
///
/// A crossword cell is not a text field: the same square can belong to an
/// across and a down word, and one keystroke writes one cell and moves the
/// cursor along the active word. Binding a `TextField` and diffing its string
/// races with fast typing (characters injected between SwiftUI updates are
/// lost). `UIKeyInput` hands us each `insertText`/`deleteBackward` as it
/// happens, so nothing is dropped.
private struct KeyCatcher: UIViewRepresentable {
    var isActive: Bool
    var onInsert: (String) -> Void
    var onDelete: () -> Void

    func makeUIView(context: Context) -> KeyCatcherView {
        let view = KeyCatcherView()
        view.onInsert = onInsert
        view.onDelete = onDelete
        return view
    }

    func updateUIView(_ view: KeyCatcherView, context: Context) {
        view.onInsert = onInsert
        view.onDelete = onDelete
        if isActive, !view.isFirstResponder {
            view.becomeFirstResponder()
        } else if !isActive, view.isFirstResponder {
            view.resignFirstResponder()
        }
    }
}

final class KeyCatcherView: UIView, UIKeyInput {
    var onInsert: ((String) -> Void)?
    var onDelete: (() -> Void)?

    override var canBecomeFirstResponder: Bool { true }
    var hasText: Bool { true }

    func insertText(_ text: String) { onInsert?(text) }
    func deleteBackward() { onDelete?() }

    // Ask for a plain capital-letters keyboard with nothing helpful in the way.
    var keyboardType: UIKeyboardType = .asciiCapable
    var autocorrectionType: UITextAutocorrectionType = .no
    var autocapitalizationType: UITextAutocapitalizationType = .allCharacters
    var spellCheckingType: UITextSpellCheckingType = .no
}

/// The grid expanded into cell lookups the board reads while playing — which
/// letter belongs in each square, which squares carry a clue number, and which
/// word runs through a square in each direction.
private struct Puzzle {
    let solution: [String: Character]
    let givenCells: Set<String>
    let givenLetters: [String: Character]
    let numbers: [String: Int]
    private let acrossAt: [String: PlacedWord]
    private let downAt: [String: PlacedWord]
    private var cellsByWord: [String: [String]] = [:]

    init(grid: Grid, givens: Set<String>) {
        var solution: [String: Character] = [:]
        var numbers: [String: Int] = [:]
        var across: [String: PlacedWord] = [:]
        var down: [String: PlacedWord] = [:]
        var givenCells: Set<String> = []
        var givenLetters: [String: Character] = [:]
        var byWord: [String: [String]] = [:]

        for word in grid.words {
            let letters = Array(word.term)
            var cells: [String] = []
            for (i, ch) in letters.enumerated() {
                let row = word.direction == .down ? word.row + i : word.row
                let column = word.direction == .across ? word.column + i : word.column
                let key = "\(row),\(column)"
                cells.append(key)
                solution[key] = ch
                if word.direction == .across { across[key] = word } else { down[key] = word }
                if givens.contains(word.term) {
                    givenCells.insert(key)
                    givenLetters[key] = ch
                }
            }
            byWord[word.id] = cells
            let startKey = "\(word.row),\(word.column)"
            if numbers[startKey] == nil { numbers[startKey] = word.number }
        }

        self.solution = solution
        self.numbers = numbers
        self.acrossAt = across
        self.downAt = down
        self.givenCells = givenCells
        self.givenLetters = givenLetters
        self.cellsByWord = byWord
    }

    func word(at key: String, direction: GridDirection) -> PlacedWord? {
        direction == .across ? acrossAt[key] : downAt[key]
    }

    func cells(of word: PlacedWord) -> [String] { cellsByWord[word.id] ?? [] }
}
