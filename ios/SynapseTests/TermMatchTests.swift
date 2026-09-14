import Foundation
import Testing
@testable import Synapse

/// Term Match is shared as a link carrying a seed: the friend who opens it
/// rebuilds the board locally and must land on the identical one. These lock
/// the generator to that promise, and to the web's, so a board minted on the
/// phone matches a board minted in the browser tile-for-tile.
struct TermMatchTests {

    private func term(_ id: String, _ en: String, ar: String = "", def: String = "") -> MedicalTerm {
        MedicalTerm(id: id, term: en, ar: ar, category: "General", def: def, defAr: "", example: nil)
    }

    private func terms(_ n: Int) -> [MedicalTerm] {
        (1...n).map { term("t\($0)", "term\($0)", ar: "ar\($0)", def: "def\($0)") }
    }

    @Test("the same seed and mode build the identical board")
    func deterministic() {
        let pool = terms(20)
        let a = TermMatch.buildBoard(terms: pool, mode: .arabic, seed: 12345)
        let b = TermMatch.buildBoard(terms: pool, mode: .arabic, seed: 12345)
        #expect(a == b)
        #expect(a.termTiles.map(\.id) == b.termTiles.map(\.id))
        #expect(a.partnerTiles.map(\.id) == b.partnerTiles.map(\.id))
    }

    @Test("a different seed generally builds a different board")
    func seedMatters() {
        let pool = terms(20)
        let a = TermMatch.buildBoard(terms: pool, mode: .arabic, seed: 1)
        let b = TermMatch.buildBoard(terms: pool, mode: .arabic, seed: 2)
        // Not a strict guarantee for every pair of seeds, but for these two the
        // chosen terms or their order must differ — a stuck generator would tie
        // every seed to one board.
        #expect(a.partnerTiles.map(\.id) != b.partnerTiles.map(\.id)
                || a.termTiles.map(\.id) != b.termTiles.map(\.id))
    }

    @Test("the RNG matches the web's sequence bit for bit")
    func rngParity() {
        // Captured from src/data/seededRandom.ts seededRandom(1) — the first
        // three draws. If the port drifts, sharing silently breaks, so this is
        // pinned rather than derived.
        var r = SeededRandom(seed: 1)
        let first = (0..<3).map { _ in r.next() }
        let expected = [0.5615960138384253, 0.9137822075281292, 0.8968408461660147]
        for (got, want) in zip(first, expected) {
            #expect(abs(got - want) < 1e-12, "got \(got), want \(want)")
        }
    }

    @Test("the default board is eight pairs, one partner per term")
    func size() {
        let board = TermMatch.buildBoard(terms: terms(20), mode: .definition, seed: 7)
        #expect(board.refusal == nil)
        #expect(board.pairs == TermMatch.defaultPairs)
        #expect(board.termTiles.count == TermMatch.defaultPairs)
        #expect(board.partnerTiles.count == TermMatch.defaultPairs)
        // Every term tile has exactly one partner sharing its pairId.
        for t in board.termTiles {
            #expect(board.partnerTiles.filter { $0.pairId == t.pairId }.count == 1)
        }
    }

    @Test("a term missing the side this mode needs is skipped, not shown blank")
    func skipsUnmatchable() {
        // Ten terms, but only six carry Arabic — the arabic board must use only
        // those six and never mint a tile with a blank partner.
        var pool = terms(10).map { MedicalTerm(id: $0.id, term: $0.term, ar: "", category: "G", def: $0.def, defAr: "", example: nil) }
        for i in 0..<6 { pool[i] = MedicalTerm(id: pool[i].id, term: pool[i].term, ar: "ar\(i)", category: "G", def: pool[i].def, defAr: "", example: nil) }
        let board = TermMatch.buildBoard(terms: pool, mode: .arabic, seed: 3)
        #expect(board.refusal == nil)
        #expect(board.pairs == 6)
        #expect(board.partnerTiles.allSatisfy { !$0.text.isEmpty })
    }

    @Test("too few usable terms is refused rather than shown as a stub round")
    func refusesBelowMinimum() {
        let board = TermMatch.buildBoard(terms: terms(5), mode: .arabic, seed: 1)
        #expect(board.refusal == .tooFewTerms)
        #expect(board.termTiles.isEmpty)
    }

    @Test("only opposite-side tiles that share a pair match")
    func pairing() {
        let board = TermMatch.buildBoard(terms: terms(10), mode: .arabic, seed: 9)
        let t = board.termTiles[0]
        let partner = board.partnerTiles.first { $0.pairId == t.pairId }!
        let other = board.partnerTiles.first { $0.pairId != t.pairId }!
        #expect(TermMatch.isPair(t, partner))
        #expect(!TermMatch.isPair(t, other))
        #expect(!TermMatch.isPair(t, board.termTiles[1]), "two terms are never a pair, even mismatched sides aside")
    }
}
