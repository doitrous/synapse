import Foundation

/// Term Grid — building a crossword out of the medical glossary.
///
/// A bit-exact port of `src/data/crossword.ts`. Sharing a puzzle is a link
/// carrying a seed, not a row in a table: the friend who opens the link runs
/// this same generator over the same terms and must get the same grid, square
/// for square. So `buildGrid` is a function in the strict sense — same inputs,
/// same output, every time — and there is deliberately no `Int.random` anywhere
/// in this file. The shuffle draws from the `seed` through `SeededRandom` (the
/// same generator Term Match shares, bit-exact with the web's). A single stray
/// random call would break sharing silently: two people would see different
/// puzzles and nothing would report an error.
///
/// Pure: no SwiftUI, no storage, no clock.

struct GridTerm: Equatable, Sendable {
    /// The answer. Normalised to uppercase letters before it reaches the grid.
    let term: String
    /// The definition, shown to the solver as the clue.
    let clue: String
}

enum GridDirection: Sendable { case across, down }

struct PlacedWord: Identifiable, Equatable, Sendable {
    let term: String
    let clue: String
    /// Row of the word's first letter, 0-based from the top of the cropped grid.
    let row: Int
    /// Column of the word's first letter, 0-based from the left.
    let column: Int
    let direction: GridDirection
    /// The clue number printed in the start square.
    let number: Int

    var id: String { "\(number)-\(direction == .across ? "A" : "D")" }
}

struct Grid: Equatable, Sendable {
    let words: [PlacedWord]
    let width: Int
    let height: Int
    /// Terms that never made it in, so the caller can say so rather than hide it.
    let skipped: [String]
}

enum TermGrid {

    /// Below this, refuse. A three-word puzzle is not a smaller crossword, it
    /// is a broken one. A floor on words *actually interlocked*, not merely
    /// offered.
    static let minTerms = 8
    /// The default ceiling: past this the board stops reading as a quick puzzle.
    static let defaultMaxTerms = 15
    /// How many derived seeds to lay out before picking the best of them.
    static let seedAttempts = 8

    // MARK: - Working types

    /// One square of the working grid, before cropping.
    private struct Square { var letter: Character; var across = false; var down = false }

    private struct Placement {
        let term: String
        let clue: String
        let row: Int
        let column: Int
        let direction: GridDirection
    }

    /// The extent the board covers so far, in working (uncropped) coordinates.
    private struct Bounds { var minRow: Int; var minColumn: Int; var maxRow: Int; var maxColumn: Int }

    private static func key(_ row: Int, _ column: Int) -> String { "\(row),\(column)" }

    // MARK: - Answer normalisation

    /// The answer form Term Grid uses everywhere: built terms, typed cells,
    /// pasted text and completion checks. Ignores presentation characters
    /// students copy from articles — spaces, punctuation, apostrophes, hyphens
    /// and accents — while keeping the crossword one Latin letter per square.
    static func normalizeAnswer(_ input: String) -> String {
        let nfkd = input.decomposedStringWithCompatibilityMapping
        let stripped = nfkd.unicodeScalars.filter { !($0.value >= 0x0300 && $0.value <= 0x036f) }
        let upper = String(String.UnicodeScalarView(stripped)).uppercased()
        return String(upper.filter { $0 >= "A" && $0 <= "Z" })
    }

    /// The single square value to store after typing or pasting into one cell.
    static func normalizeLetter(_ input: String) -> String {
        String(normalizeAnswer(input).suffix(1))
    }

    // MARK: - Seeds

    /// The seed for one retry. Striding by a large odd constant keeps each
    /// seed's window to itself; attempt 0 is the seed itself.
    private static func derivedSeed(_ seed: Int, _ attempt: Int) -> Int {
        let s = Int32(truncatingIfNeeded: seed)
        let a = Int32(truncatingIfNeeded: attempt) &* Int32(bitPattern: 0x9e37_79b1)
        return Int(s &+ a)
    }

    /// Deterministic givens for the finished grid — the same prefilled answers
    /// for everyone who opens the link.
    static func givenTerms(_ grid: Grid, seed: Int, count: Int = 2) -> [String] {
        if grid.words.isEmpty || count <= 0 { return [] }
        // Unique terms, first occurrence order (mirrors JS `new Map` keys).
        var seen = Set<String>()
        var unique: [String] = []
        for word in grid.words where seen.insert(word.term).inserted { unique.append(word.term) }
        var random = SeededRandom(seed: seed ^ 0x6d2b_79f5)
        return Array(random.shuffle(unique).prefix(min(count, unique.count)))
    }

    // MARK: - Placement geometry

    private static func letterAt(_ p: Placement, _ index: Int) -> (row: Int, column: Int) {
        (row: p.direction == .down ? p.row + index : p.row,
         column: p.direction == .across ? p.column + index : p.column)
    }

    /// Can this word go here? Four rejections (see crossword.ts for the full
    /// reasoning): disagreeing crossing, an overlap in the same direction, a
    /// filled end square that would lengthen a neighbour, and a square sitting
    /// flush alongside where this word does not itself cross.
    private static func fits(_ placement: Placement, _ occupied: [String: Square]) -> Bool {
        let term = Array(placement.term)
        let acrossWord = placement.direction == .across

        for i in 0..<term.count {
            let (row, column) = letterAt(placement, i)
            if let square = occupied[key(row, column)] {
                if square.letter != term[i] { return false }
                if acrossWord ? square.across : square.down { return false }
                continue
            }
            let sideA = acrossWord ? occupied[key(row - 1, column)] : occupied[key(row, column - 1)]
            let sideB = acrossWord ? occupied[key(row + 1, column)] : occupied[key(row, column + 1)]
            if sideA != nil || sideB != nil { return false }
        }

        let before = letterAt(placement, -1)
        let after = letterAt(placement, term.count)
        if occupied[key(before.row, before.column)] != nil { return false }
        if occupied[key(after.row, after.column)] != nil { return false }
        return true
    }

    /// Write a placed word into the working squares.
    private static func occupy(_ placement: Placement, _ occupied: inout [String: Square]) {
        let term = Array(placement.term)
        for i in 0..<term.count {
            let (row, column) = letterAt(placement, i)
            let at = key(row, column)
            var square = occupied[at] ?? Square(letter: term[i])
            if placement.direction == .across { square.across = true } else { square.down = true }
            occupied[at] = square
        }
    }

    /// Grow the running extent to include a newly placed word.
    private static func extend(_ bounds: Bounds, _ placement: Placement) -> Bounds {
        let start = letterAt(placement, 0)
        let end = letterAt(placement, Array(placement.term).count - 1)
        return Bounds(
            minRow: min(bounds.minRow, start.row),
            minColumn: min(bounds.minColumn, start.column),
            maxRow: max(bounds.maxRow, end.row),
            maxColumn: max(bounds.maxColumn, end.column)
        )
    }

    private static func spanOf(_ b: Bounds) -> Int {
        max(b.maxRow - b.minRow + 1, b.maxColumn - b.minColumn + 1)
    }
    private static func areaOf(_ b: Bounds) -> Int {
        (b.maxRow - b.minRow + 1) * (b.maxColumn - b.minColumn + 1)
    }

    private static func countCrossings(_ placement: Placement, _ occupied: [String: Square]) -> Int {
        let term = Array(placement.term)
        var crossings = 0
        for i in 0..<term.count {
            let (row, column) = letterAt(placement, i)
            if occupied[key(row, column)] != nil { crossings += 1 }
        }
        return crossings
    }

    /// The best legal placement rather than merely the first: smallest bounding
    /// box, then most crossings, then topmost/leftmost/across-before-down.
    private static func bestFit(
        _ candidate: GridTerm, _ placements: [Placement],
        _ occupied: [String: Square], _ bounds: Bounds
    ) -> Placement? {
        var best: Placement?
        var bestSpan = Int.max
        var bestArea = Int.max
        var bestCrossings = -1

        let candTerm = Array(candidate.term)
        for placed in placements {
            let direction: GridDirection = placed.direction == .across ? .down : .across
            let placedTerm = Array(placed.term)
            for j in 0..<placedTerm.count {
                for i in 0..<candTerm.count where candTerm[i] == placedTerm[j] {
                    let cross = letterAt(placed, j)
                    let attempt = Placement(
                        term: candidate.term, clue: candidate.clue,
                        row: direction == .down ? cross.row - i : cross.row,
                        column: direction == .across ? cross.column - i : cross.column,
                        direction: direction
                    )
                    if !fits(attempt, occupied) { continue }
                    let grown = extend(bounds, attempt)
                    let span = spanOf(grown)
                    let area = areaOf(grown)
                    let crossings = countCrossings(attempt, occupied)
                    if best == nil || beats(attempt, span, area, crossings, best!, bestSpan, bestArea, bestCrossings) {
                        best = attempt; bestSpan = span; bestArea = area; bestCrossings = crossings
                    }
                }
            }
        }
        return best
    }

    private static func beats(
        _ attempt: Placement, _ span: Int, _ area: Int, _ crossings: Int,
        _ best: Placement, _ bestSpan: Int, _ bestArea: Int, _ bestCrossings: Int
    ) -> Bool {
        if span != bestSpan { return span < bestSpan }
        if area != bestArea { return area < bestArea }
        if crossings != bestCrossings { return crossings > bestCrossings }
        if attempt.row != best.row { return attempt.row < best.row }
        if attempt.column != best.column { return attempt.column < best.column }
        return attempt.direction == .across && best.direction == .down
    }

    /// One arrangement attempt: shuffle from this seed, then lay the words out.
    private static func arrange(
        _ usable: [GridTerm], seed: Int, max: Int
    ) -> (placements: [Placement], unplaced: [String]) {
        var random = SeededRandom(seed: seed)
        var order = random.shuffle(usable)
        // The longest word anchors the grid. Ties break on the shuffled order.
        var anchorIndex = 0
        for i in 1..<order.count where order[i].term.count > order[anchorIndex].term.count {
            anchorIndex = i
        }
        let anchor = order.remove(at: anchorIndex)

        var occupied: [String: Square] = [:]
        var placements: [Placement] = []
        var unplaced: [String] = []

        let first = Placement(term: anchor.term, clue: anchor.clue, row: 0, column: 0, direction: .across)
        placements.append(first)
        occupy(first, &occupied)
        var bounds = extend(Bounds(minRow: 0, minColumn: 0, maxRow: 0, maxColumn: 0), first)

        for candidate in order {
            if placements.count >= max { unplaced.append(candidate.term); continue }
            guard let placement = bestFit(candidate, placements, occupied, bounds) else {
                unplaced.append(candidate.term); continue
            }
            placements.append(placement)
            occupy(placement, &occupied)
            bounds = extend(bounds, placement)
        }
        return (placements, unplaced)
    }

    /// Build the puzzle. Below `minTerms` interlocked, the grid is refused.
    static func buildGrid(terms: [GridTerm], seed: Int, max: Int = defaultMaxTerms) -> Grid {
        var rejected: [String] = []
        var usable: [GridTerm] = []
        for entry in terms {
            let raw = entry.term.trimmingCharacters(in: .whitespaces)
            let word = normalizeAnswer(raw)
            if word.count < 3 { rejected.append(raw.uppercased()); continue }
            usable.append(GridTerm(term: word, clue: entry.clue))
        }

        func refuse() -> Grid {
            Grid(words: [], width: 0, height: 0, skipped: rejected + usable.map(\.term))
        }

        if usable.count < minTerms { return refuse() }

        var best: (placements: [Placement], unplaced: [String])?
        var bestSpan = Int.max
        var bestArea = Int.max

        for attempt in 0..<seedAttempts {
            let candidate = arrange(usable, seed: derivedSeed(seed, attempt), max: max)
            if candidate.placements.count < minTerms { continue }

            var bounds = Bounds(minRow: .max, minColumn: .max, maxRow: .min, maxColumn: .min)
            for placement in candidate.placements { bounds = extend(bounds, placement) }
            let span = spanOf(bounds)
            let area = areaOf(bounds)

            let fuller = best == nil || candidate.placements.count > best!.placements.count
            let sameSize = best != nil && candidate.placements.count == best!.placements.count
            if fuller || (sameSize && (span < bestSpan || (span == bestSpan && area < bestArea))) {
                best = candidate; bestSpan = span; bestArea = area
            }
        }

        guard let winner = best else { return refuse() }
        return crop(winner.placements, skipped: rejected + winner.unplaced)
    }

    /// Crop to the squares actually used and number the start squares.
    private static func crop(_ placements: [Placement], skipped: [String]) -> Grid {
        if placements.isEmpty { return Grid(words: [], width: 0, height: 0, skipped: skipped) }

        var bounds = Bounds(minRow: .max, minColumn: .max, maxRow: .min, maxColumn: .min)
        for placement in placements { bounds = extend(bounds, placement) }

        let shifted = placements.map {
            Placement(term: $0.term, clue: $0.clue,
                      row: $0.row - bounds.minRow, column: $0.column - bounds.minColumn,
                      direction: $0.direction)
        }

        // Reading order: top to bottom, left to right. A square starting both an
        // across and a down word carries one number, shared by both clues.
        let reading = shifted.sorted { $0.row != $1.row ? $0.row < $1.row : $0.column < $1.column }
        var numbers: [String: Int] = [:]
        var next = 1
        for placement in reading {
            let at = key(placement.row, placement.column)
            if numbers[at] == nil { numbers[at] = next; next += 1 }
        }

        let words = reading.map { placement in
            PlacedWord(
                term: placement.term, clue: placement.clue,
                row: placement.row, column: placement.column, direction: placement.direction,
                number: numbers[key(placement.row, placement.column)]!
            )
        }
        return Grid(
            words: words,
            width: bounds.maxColumn - bounds.minColumn + 1,
            height: bounds.maxRow - bounds.minRow + 1,
            skipped: skipped
        )
    }
}
