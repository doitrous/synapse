import Foundation
import Testing
@testable import Synapse

/// Term Grid is shared as a link carrying a seed: the friend who opens it
/// rebuilds the crossword locally and must land on the identical grid, square
/// for square. These lock the generator to that promise, and to the web's, so a
/// puzzle minted on the phone matches one minted in the browser.
struct TermGridTests {

    private static let pool: [GridTerm] = [
        GridTerm(term: "ARTERY", clue: "A vessel carrying blood from the heart"),
        GridTerm(term: "VEIN", clue: "A vessel returning blood to the heart"),
        GridTerm(term: "NEURON", clue: "A nerve cell"),
        GridTerm(term: "CORTEX", clue: "The outer layer of an organ"),
        GridTerm(term: "RENAL", clue: "Relating to the kidney"),
        GridTerm(term: "HEPATIC", clue: "Relating to the liver"),
        GridTerm(term: "MARROW", clue: "Where blood cells are made"),
        GridTerm(term: "ENZYME", clue: "A protein that speeds a reaction"),
        GridTerm(term: "ANTIGEN", clue: "What an antibody binds"),
        GridTerm(term: "PLASMA", clue: "The liquid part of blood"),
        GridTerm(term: "TENDON", clue: "Connects muscle to bone"),
        GridTerm(term: "ALVEOLI", clue: "Air sacs of the lung"),
    ]

    @Test("the built grid matches the web's, square for square")
    func parity() {
        // Captured from src/data/crossword.ts buildGrid(pool, 12345) via node.
        // If the port drifts, sharing silently breaks, so this is pinned.
        let grid = TermGrid.buildGrid(terms: Self.pool, seed: 12345)
        #expect(grid.width == 14)
        #expect(grid.height == 12)
        #expect(grid.skipped.isEmpty)

        // term, row, column, direction, number
        let expected: [(String, Int, Int, GridDirection, Int)] = [
            ("PLASMA", 0, 4, .down, 1),
            ("CORTEX", 0, 8, .down, 2),
            ("TENDON", 2, 1, .down, 3),
            ("ARTERY", 2, 4, .across, 4),
            ("VEIN", 2, 12, .down, 5),
            ("ENZYME", 4, 0, .across, 6),
            ("HEPATIC", 4, 7, .across, 7),
            ("ANTIGEN", 4, 10, .down, 8),
            ("NEURON", 6, 7, .down, 9),
            ("ALVEOLI", 7, 4, .across, 10),
            ("RENAL", 9, 9, .across, 11),
            ("MARROW", 10, 3, .across, 12),
        ]
        #expect(grid.words.count == expected.count)
        for (word, want) in zip(grid.words, expected) {
            #expect(word.term == want.0)
            #expect(word.row == want.1)
            #expect(word.column == want.2)
            #expect(word.direction == want.3)
            #expect(word.number == want.4)
        }
        #expect(TermGrid.givenTerms(grid, seed: 12345, count: 2) == ["ALVEOLI", "CORTEX"])
    }

    @Test("the same seed builds the identical grid")
    func deterministic() {
        let a = TermGrid.buildGrid(terms: Self.pool, seed: 999)
        let b = TermGrid.buildGrid(terms: Self.pool, seed: 999)
        #expect(a == b)
    }

    @Test("a different seed generally builds a different grid")
    func seedMatters() {
        let a = TermGrid.buildGrid(terms: Self.pool, seed: 1)
        let b = TermGrid.buildGrid(terms: Self.pool, seed: 2)
        // Layout or numbering must differ; a stuck generator would tie every
        // seed to one grid.
        #expect(a.words.map(\.term) != b.words.map(\.term)
                || a.words.map(\.row) != b.words.map(\.row)
                || a.words.map(\.column) != b.words.map(\.column))
    }

    @Test("too few usable terms is refused rather than shown as a stub puzzle")
    func refusesBelowMinimum() {
        let grid = TermGrid.buildGrid(terms: Array(Self.pool.prefix(5)), seed: 1)
        #expect(grid.words.isEmpty)
        #expect(grid.width == 0 && grid.height == 0)
        #expect(!grid.skipped.isEmpty)
    }

    @Test("answers normalise to bare Latin letters, dropping accents and punctuation")
    func normalisation() {
        #expect(TermGrid.normalizeAnswer("  Béta-cell's  ") == "BETACELLS")
        #expect(TermGrid.normalizeAnswer("Naïve") == "NAIVE")
        #expect(TermGrid.normalizeLetter("xya") == "A")
        #expect(TermGrid.normalizeLetter("") == "")
    }

    @Test("every placed word interlocks and stays inside the cropped bounds")
    func wellFormed() {
        let grid = TermGrid.buildGrid(terms: Self.pool, seed: 12345)
        for word in grid.words {
            let endRow = word.direction == .down ? word.row + word.term.count - 1 : word.row
            let endCol = word.direction == .across ? word.column + word.term.count - 1 : word.column
            #expect(word.row >= 0 && word.column >= 0)
            #expect(endRow < grid.height)
            #expect(endCol < grid.width)
        }
    }
}
