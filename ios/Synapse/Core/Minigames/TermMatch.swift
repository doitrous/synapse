import Foundation

/// One seeded source of randomness, shared by everything that has to be the
/// same for two people at once.
///
/// A bit-exact port of `seededRandom` in `src/data/seededRandom.ts`. Term Match
/// is shared by sending a link with a seed in it: both players build the
/// identical board locally, with no server and nothing to be out of step — and
/// that only holds while the phone's generator produces the very same sequence
/// the web's does. So this is 32-bit arithmetic on purpose (splitmix mix, then
/// xorshift32), matching JavaScript's `Math.imul` and `>>>` exactly; a `Double`
/// RNG would look right and silently hand two friends different boards.
struct SeededRandom {
    private var state: UInt32

    init(seed: Int) {
        var s: UInt32 = UInt32(truncatingIfNeeded: seed) &* 0x9e37_79b1 ^ 0x85eb_ca6b
        s = (s ^ (s >> 16)) &* 0x21f0_aaad
        s = (s ^ (s >> 15)) &* 0x735a_2d97
        s = s ^ (s >> 15)
        // xorshift32 is dead at zero, so nudge it off that one bad state.
        state = s == 0 ? 0x6d2b_79f5 : s
    }

    /// The next value in [0, 1), advancing the state.
    mutating func next() -> Double {
        state ^= state << 13
        state ^= state >> 17
        state ^= state << 5
        return Double(state) / 4_294_967_296  // 2^32
    }

    /// Fisher-Yates, drawing only from this seeded source.
    mutating func shuffle<T>(_ items: [T]) -> [T] {
        var out = items
        var i = out.count - 1
        while i > 0 {
            let j = Int(next() * Double(i + 1))
            out.swapAt(i, j)
            i -= 1
        }
        return out
    }
}

/// What the right-hand tile shows.
enum MatchMode: String, CaseIterable, Sendable {
    case arabic, definition
}

struct MatchTile: Identifiable, Equatable, Sendable {
    let id: String
    /// The pair this tile belongs to — two tiles share one pairId.
    let pairId: String
    let text: String
    let side: Side
    /// Set on Arabic tiles so the UI can mark them right-to-left.
    var isArabic = false

    enum Side: Sendable { case term, partner }
}

struct MatchBoard: Equatable, Sendable {
    let mode: MatchMode
    /// Fixed left column: the selected authored terms.
    let termTiles: [MatchTile]
    /// Shuffled right column: the Arabic translation or definition tiles.
    let partnerTiles: [MatchTile]
    let pairs: Int
    /// Why there is no board, when there are none.
    let refusal: Refusal?

    enum Refusal: Sendable { case tooFewTerms }
}

/// Pairs-board rules over the medical glossary — a port of `src/data/termMatch.ts`.
///
/// Pure: no clock, no storage, no `Int.random`. Both which terms make the board
/// and how the answer column is shuffled draw from the one seed, so a shared
/// link rebuilds the identical board tile-for-tile.
enum TermMatch {

    /// Below this, refuse. A five-pair board is a round that ends before it
    /// starts — better to say there is not enough material than to hand a
    /// student a board that reads as a bug.
    static let minPairs = 6
    /// The default board size: enough tiles for a round without sprawling.
    static let defaultPairs = 8

    private static func partnerText(_ term: MedicalTerm, _ mode: MatchMode) -> String {
        mode == .arabic ? term.ar : term.def
    }

    static func buildBoard(
        terms: [MedicalTerm], mode: MatchMode, seed: Int, pairs: Int = defaultPairs
    ) -> MatchBoard {
        // A term with nothing on the other side of the match cannot be used in
        // this mode — skip it rather than render a tile with a blank partner.
        let usable = terms.filter { !partnerText($0, mode).trimmingCharacters(in: .whitespaces).isEmpty }

        guard usable.count >= minPairs else {
            return MatchBoard(mode: mode, termTiles: [], partnerTiles: [], pairs: 0, refusal: .tooFewTerms)
        }

        var random = SeededRandom(seed: seed)
        let chosen = Array(random.shuffle(usable).prefix(min(pairs, usable.count)))

        var termTiles: [MatchTile] = []
        var partnerTiles: [MatchTile] = []
        for term in chosen {
            termTiles.append(MatchTile(id: "\(term.id)-term", pairId: term.id, text: term.term, side: .term))
            partnerTiles.append(MatchTile(
                id: "\(term.id)-partner", pairId: term.id, text: partnerText(term, mode),
                side: .partner, isArabic: mode == .arabic
            ))
        }

        // Drawing from the same `random` again (not a fresh seed) keeps the
        // whole board one deterministic sequence.
        let shuffledPartners = random.shuffle(partnerTiles)
        return MatchBoard(
            mode: mode, termTiles: termTiles, partnerTiles: shuffledPartners,
            pairs: chosen.count, refusal: nil
        )
    }

    /// True only for two tiles that share a pairId and sit on opposite sides.
    static func isPair(_ a: MatchTile, _ b: MatchTile) -> Bool {
        a.pairId == b.pairId && a.side != b.side
    }
}
