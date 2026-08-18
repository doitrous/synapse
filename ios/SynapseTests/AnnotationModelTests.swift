import CoreGraphics
import Foundation
import Testing
@testable import Synapse

/// The annotation model is a port, and its failure mode is silence: a stroke
/// encoded differently, a key spelled differently or an axis flipped the wrong
/// way does not raise anything. It produces a second, invisible set of notes,
/// or marks that land upside down.
///
/// The literals below are not this implementation's own output. They were taken
/// by running `src/lib/reader/strokeCodec.ts` and `annotationKey.ts` under Node
/// against the same inputs, so a change on either side that breaks
/// compatibility fails here rather than in a student's book:
///
///     encodePoints([{x:0.1,y:0.2},{x:0.2,y:0.2},{x:0.3,y:0.25}])
///       → [410, 819, 409, 0, 410, 205]
///     annotationScope('resource', 'a'.repeat(200))  → "r-h4e48052d"
///     simplify(60-point sine curve).length          → 43
struct AnnotationModelTests {

    @Suite("Stroke encoding")
    struct Encoding {

        /// The stored shape is `[x0, y0, dx1, dy1, …]`: the first pair absolute,
        /// every other an offset from the one before.
        @Test("points are quantised and delta-encoded")
        func encodesDeltas() {
            let points = [
                InkPoint(x: 0.1, y: 0.2),
                InkPoint(x: 0.2, y: 0.2),
                InkPoint(x: 0.3, y: 0.25),
            ]
            // Quantised: 0.1 → 410, 0.2 → 819, 0.25 → 1024, 0.3 → 1229.
            // Stored: the first pair absolute, then 819−410, 819−819,
            // 1229−819, 1024−819.
            #expect(StrokeCodec.encode(points) == [410, 819, 409, 0, 410, 205])
        }

        @Test("an empty stroke encodes to nothing")
        func empty() {
            #expect(StrokeCodec.encode([]).isEmpty)
            #expect(StrokeCodec.decode([]).isEmpty)
        }

        @Test("a stroke survives a round trip within a quantum")
        func roundTrip() {
            let points = (0..<40).map {
                InkPoint(x: Double($0) * 0.02, y: 0.5 + sin(Double($0) / 4) * 0.1)
            }
            let decoded = StrokeCodec.decode(StrokeCodec.encode(points))

            #expect(decoded.count == points.count)
            for (original, result) in zip(points, decoded) {
                // One quantum is 1/4096 of a page width — a hundredth of a
                // millimetre on A4.
                #expect(abs(original.x - result.x) <= 1 / StrokeCodec.quantum)
                #expect(abs(original.y - result.y) <= 1 / StrokeCodec.quantum)
            }
        }

        /// JavaScript's `Math.round` is `floor(x + 0.5)`; Swift's `rounded()`
        /// is half-away-from-zero. They disagree on exactly `-n.5`, and two
        /// encoders producing different integers for one stroke is the kind of
        /// drift that surfaces much later as a mysterious mismatch.
        @Test("rounding matches JavaScript on the half")
        func roundsLikeJavaScript() {
            #expect(StrokeCodec.quantise(0.5 / StrokeCodec.quantum) == 1)
            #expect(StrokeCodec.quantise(-0.5 / StrokeCodec.quantum) == 0)
            #expect(StrokeCodec.quantise(-1.5 / StrokeCodec.quantum) == -1)
        }

        /// Only the first pair is absolute, so moving a stroke is two additions
        /// however long it is — which is what makes dragging a selection of two
        /// hundred strokes cost nothing.
        @Test("a stroke can be moved without decoding it")
        func translatesInPlace() {
            let points = [InkPoint(x: 0.1, y: 0.1), InkPoint(x: 0.2, y: 0.15)]
            let encoded = StrokeCodec.encode(points)
            let translated = StrokeCodec.translate(encoded, dx: 0.05, dy: -0.02)
            // The web produces exactly this for the same input.
            #expect(translated == [615, 328, 409, 204])

            let moved = StrokeCodec.decode(translated)
            #expect(abs(moved[0].x - 0.15) < 0.001)
            #expect(abs(moved[0].y - 0.08) < 0.001)
            // The shape is unchanged: the second point moved by the same amount.
            #expect(abs((moved[1].x - moved[0].x) - 0.1) < 0.001)
        }

        @Test("simplification drops collinear samples and keeps the ends")
        func simplifies() {
            let straight = (0..<20).map { InkPoint(x: Double($0) * 0.01, y: 0.5) }
            let simplified = StrokeCodec.simplify(straight)

            #expect(simplified.count == 2, "a straight line needs two points")
            #expect(simplified.first == straight.first)
            #expect(simplified.last == straight.last)
        }

        @Test("a real curve keeps its shape through simplification")
        func keepsCurves() {
            let curve = (0..<60).map {
                InkPoint(x: Double($0) * 0.01, y: 0.5 + sin(Double($0) / 6) * 0.2)
            }
            let simplified = StrokeCodec.simplify(curve)

            // 43 is what the web's RDP returns for this curve at the shared
            // epsilon. Pinning the number pins the epsilon: a different value
            // would still look like a curve while storing a different stroke.
            #expect(simplified.count == 43)
            for point in simplified {
                let nearest = curve.map { abs($0.x - point.x) }.min() ?? 1
                #expect(nearest < 0.0001, "simplification must not invent points")
            }
        }

        @Test("bounds are padded by half the stroke width")
        func bounds() {
            let points = [InkPoint(x: 0.2, y: 0.3), InkPoint(x: 0.6, y: 0.5)]
            let box = StrokeCodec.bounds(points, padding: 0.01)
            #expect(box == [0.19, 0.29, 0.61, 0.51])
        }
    }

    @Suite("Storage keys")
    struct Keys {

        /// Sixteen pages to a shard: page 1 and page 16 share one, page 17
        /// starts the next.
        @Test("pages map to shards in sixteens")
        func shardIndexes() {
            #expect(AnnotationKey.shardIndex(forPage: 1) == 0)
            #expect(AnnotationKey.shardIndex(forPage: 16) == 0)
            #expect(AnnotationKey.shardIndex(forPage: 17) == 1)
            #expect(AnnotationKey.shardIndex(forPage: 300) == 18)
            // A page number below 1 is a bug elsewhere, but it must not index
            // backwards into another document's shard.
            #expect(AnnotationKey.shardIndex(forPage: 0) == 0)
        }

        @Test("a shard covers the range it says")
        func pageRanges() {
            #expect(AnnotationKey.pageRange(forShard: 0) == 1...16)
            #expect(AnnotationKey.pageRange(forShard: 1) == 17...32)
        }

        /// These strings are the contract. A key that differs by one character
        /// is a second set of notes nobody can find.
        @Test("keys match the web's exactly")
        func keyStrings() {
            let scope = AnnotationKey.scope(kind: .resource, id: "src_3cbca0e699baf9104cb9")
            #expect(scope == "r-src_3cbca0e699baf9104cb9")
            #expect(
                AnnotationKey.manifestKey(scope: scope)
                    == "synapse.annotations.v1.r-src_3cbca0e699baf9104cb9.idx"
            )
            #expect(
                AnnotationKey.shardKey(scope: scope, index: 3)
                    == "synapse.annotations.v1.r-src_3cbca0e699baf9104cb9.s3"
            )
        }

        @Test("a student's own upload gets its own prefix")
        func documentScope() {
            #expect(AnnotationKey.scope(kind: .document, id: "abc123") == "d-abc123")
        }

        /// The column is 160 characters. Truncating would let two documents
        /// collide silently and share each other's notes, so a long id is
        /// hashed instead.
        @Test("an id too long for the column is hashed, not cut")
        func longIdsHash() {
            let long = String(repeating: "a", count: 200)
            let scope = AnnotationKey.scope(kind: .resource, id: long)

            // Exactly what the web produces for the same id.
            #expect(scope == "r-h4e48052d")
            #expect(AnnotationKey.manifestKey(scope: scope).count <= 160)

            // Two different long ids must not land on the same scope.
            let other = String(repeating: "b", count: 200)
            #expect(AnnotationKey.scope(kind: .resource, id: other) == "r-h5d151cc5")
            #expect(AnnotationKey.scope(kind: .resource, id: other) != scope)
        }

        @Test("characters the key column cannot hold are replaced")
        func sanitises() {
            #expect(AnnotationKey.scope(kind: .resource, id: "a/b c:d") == "r-a_b_c_d")
            #expect(AnnotationKey.scope(kind: .resource, id: "keeps.these-_") == "r-keeps.these-_")
        }

        /// Hashing the sanitised id would make two ids differing only in
        /// punctuation collide — the exact thing hashing is here to prevent.
        @Test("the hash is taken over the original id")
        func hashesOriginal() {
            let a = String(repeating: "x", count: 130) + "/1"
            let b = String(repeating: "x", count: 130) + "/2"
            #expect(AnnotationKey.scope(kind: .resource, id: a) != AnnotationKey.scope(kind: .resource, id: b))
        }

        /// FNV-1a over UTF-16 code units, as `charCodeAt` yields.
        @Test("the hash matches the web's FNV-1a")
        func fnvMatchesWeb() {
            // Reference values from the same algorithm the web runs.
            #expect(AnnotationKey.fnv1a("") == "811c9dc5")
            #expect(AnnotationKey.fnv1a("a") == "e40c292c")
            #expect(AnnotationKey.fnv1a("foobar") == "bf9cf968")
        }

        @Test("a page range names every shard it touches")
        func shardsForRange() {
            #expect(AnnotationKey.shards(fromPage: 1, toPage: 16) == [0])
            #expect(AnnotationKey.shards(fromPage: 10, toPage: 40) == [0, 1, 2])
        }
    }

    @Suite("Page space")
    struct Space {
        // A4 at 72dpi.
        private let a4 = PageMetrics(width: 595, height: 842)

        /// Both axes divide by the *width*. Dividing y by the height would
        /// squash every mark on a page that is not square.
        @Test("y runs past 1 on a portrait page")
        func heightExceedsOne() {
            #expect(abs(a4.pageSpaceHeight - 842.0 / 595.0) < 0.0001)
            #expect(a4.pageSpaceHeight > 1.4)
        }

        @Test("screen and page space round-trip")
        func roundTrip() {
            let onScreen = CGPoint(x: 240, y: 500)
            let inPage = PageSpace.toPageSpace(onScreen, metrics: a4, scale: 2)
            let back = PageSpace.fromPageSpace(inPage, metrics: a4, scale: 2)

            #expect(abs(back.x - onScreen.x) < 0.001)
            #expect(abs(back.y - onScreen.y) < 0.001)
        }

        /// The flip PDFKit needs. A mark that skips it is not obviously wrong —
        /// it is upside down on the page, near where it belongs.
        @Test("the PDFKit y-axis is flipped, and flips back")
        func pdfFlip() {
            // The top-left of the page in stored form.
            let topLeft = InkPoint(x: 0, y: 0)
            let pdfTopLeft = PageSpace.toPDFPoint(topLeft, metrics: a4)
            #expect(pdfTopLeft.x == 0)
            #expect(abs(pdfTopLeft.y - 842) < 0.001, "top of the page is y = height in PDFKit")

            // And a point partway down.
            let midway = InkPoint(x: 0.5, y: 0.5)
            let pdf = PageSpace.toPDFPoint(midway, metrics: a4)
            #expect(abs(pdf.x - 297.5) < 0.001)
            #expect(abs(pdf.y - (842 - 297.5)) < 0.001)

            let back = PageSpace.fromPDFPoint(pdf, metrics: a4)
            #expect(abs(back.x - midway.x) < 0.0001)
            #expect(abs(back.y - midway.y) < 0.0001)
        }

        @Test("a width scales by the same divisor as a coordinate")
        func widthsScale() {
            #expect(PageSpace.lengthOnScreen(0.003, metrics: a4, scale: 1) == 0.003 * 595)
        }

        /// Clamping y to 1 would refuse the bottom third of every portrait page.
        @Test("clamping respects the page's proportions")
        func clamping() {
            let low = PageSpace.clamp(InkPoint(x: 0.5, y: 1.3), metrics: a4)
            #expect(low.y == 1.3, "1.3 is on an A4 page")

            let past = PageSpace.clamp(InkPoint(x: 1.5, y: 99), metrics: a4)
            #expect(past.x == 1)
            #expect(abs(past.y - a4.pageSpaceHeight) < 0.0001)
        }

        @Test("culling rejects rects that do not meet")
        func culling() {
            #expect(PageSpace.intersects([0, 0, 0.5, 0.5], [0.4, 0.4, 1, 1]))
            #expect(!PageSpace.intersects([0, 0, 0.3, 0.3], [0.4, 0.4, 1, 1]))
        }
    }

    @Suite("Objects")
    struct Objects {

        /// A shard may hold a kind this build predates. Dropping it would
        /// destroy work the moment an older phone opened a newer document.
        @Test("every kind survives a round trip")
        func roundTrips() throws {
            let objects: [AnnotationObject] = [
                .ink(kind: .ink, tool: "ball", color: "#241d16", width: 0.003, alpha: nil,
                     points: [InkPoint(x: 0.1, y: 0.1), InkPoint(x: 0.4, y: 0.3)],
                     page: 1, z: 1, stamp: 1_700_000_000_000),
                .ink(kind: .highlighter, tool: "highlighter", color: "#c2691c", width: 0.012,
                     alpha: 0.35, points: [InkPoint(x: 0.2, y: 0.2), InkPoint(x: 0.8, y: 0.2)],
                     page: 2, z: 2, stamp: 1_700_000_000_001),
                .widget(kind: .note, rect: [0.1, 0.1, 0.38, 0.26], tone: .amber, text: "Remember",
                        color: nil, size: nil, page: 3, z: 3, stamp: 1_700_000_000_002),
                .widget(kind: .textbox, rect: [0.1, 0.5, 0.5, 0.6], tone: nil, text: "Note",
                        color: "#b23a3a", size: 0.022, page: 3, z: 4, stamp: 1_700_000_000_003),
                .widget(kind: .tape, rect: [0.2, 0.2, 0.6, 0.3], tone: .slate, text: nil,
                        color: nil, size: nil, page: 4, z: 5, stamp: 1_700_000_000_004),
                .marker(title: "Valves", page: 5, z: 6, stamp: 1_700_000_000_005),
            ]

            let data = try JSONEncoder().encode(objects)
            #expect(try JSONDecoder().decode([AnnotationObject].self, from: data) == objects)
        }

        /// The renderer treats `t` as "this changed", so two marks made inside
        /// one millisecond must still be ordered.
        @Test("timestamps are strictly increasing")
        func monotonicStamps() {
            let first = AnnotationObject.nextStamp(after: nil)
            let second = AnnotationObject.nextStamp(after: first)
            let third = AnnotationObject.nextStamp(after: second)

            #expect(second > first)
            #expect(third > second)
        }

        @Test("ids are ten lowercase alphanumerics, as the web generates")
        func ids() {
            let ids = (0..<200).map { _ in AnnotationObject.newID() }
            for id in ids {
                #expect(id.count == 10)
                #expect(id.allSatisfy { $0.isLowercase && $0.isLetter || $0.isNumber })
            }
            #expect(Set(ids).count == ids.count, "a collision here silently merges two marks")
        }

        /// Only notes and textboxes carry text, so only they are indexed —
        /// and the order has to match so a search reads the same on both.
        @Test("the note index holds text, in page then id order")
        func noteIndex() {
            let objects: [AnnotationObject] = [
                .widget(kind: .note, rect: [0, 0, 1, 1], tone: .amber, text: "second",
                        color: nil, size: nil, page: 4, z: 1, stamp: 1),
                .widget(kind: .textbox, rect: [0, 0, 1, 1], tone: nil, text: "first",
                        color: "#000", size: 0.02, page: 2, z: 2, stamp: 2),
                .widget(kind: .tape, rect: [0, 0, 1, 1], tone: .slate, text: nil,
                        color: nil, size: nil, page: 1, z: 3, stamp: 3),
                .ink(kind: .ink, tool: "ball", color: "#000", width: 0.003, alpha: nil,
                     points: [InkPoint(x: 0, y: 0)], page: 1, z: 4, stamp: 4),
            ]

            let entries = AnnotationManifest.entries(from: objects)
            #expect(entries.map(\.text) == ["first", "second"])
            #expect(entries.map(\.kind) == ["textbox", "note"])
        }
    }
}

// MARK: - Stabilisation

/// Pinned to the output of the real `src/lib/reader/stabilize.ts` run under
/// Node, for the same 12-point zigzag. A stroke smoothed differently on the two
/// platforms is not an error anywhere — it is just a line that looks wrong when
/// the student opens the same page in a browser.
struct StabilizerTests {

    private var zigzag: [InkPoint] {
        (0..<12).map { InkPoint(x: Double($0) / 100, y: $0 % 2 == 0 ? 0.2 : 0.24, pressure: 0.5) }
    }

    @Test func matchesTheWebPointForPoint() {
        let out = Stabilizer.path(zigzag, strength: 0.35)

        // 12 samples plus the four catch-up steps.
        #expect(out.count == 16)
        #expect(abs(out[1].x - 0.00685) < 1e-9)
        #expect(abs(out[1].y - 0.2274) < 1e-9)

        let tail = out.suffix(3)
        #expect(abs(tail[tail.startIndex].x - 0.107700737) < 1e-9)
        #expect(abs(tail[tail.startIndex + 1].y - 0.237604555) < 1e-9)
    }

    /// The point of the catch-up: the stroke must end exactly where the finger
    /// lifted, not where the filter had got to.
    @Test func endsWhereTheFingerLifted() {
        let out = Stabilizer.path(zigzag, strength: 0.35)
        #expect(abs(out[out.count - 1].x - 0.11) < 1e-12)
        #expect(abs(out[out.count - 1].y - 0.24) < 1e-12)
    }

    @Test func smoothingOnlyEverRemovesWobble() {
        #expect(abs(Stabilizer.totalCurvature(zigzag) - 26.516353273) < 1e-8)
        #expect(abs(Stabilizer.totalCurvature(Stabilizer.path(zigzag, strength: 0.35)) - 22.722380098) < 1e-8)
        #expect(abs(Stabilizer.totalCurvature(Stabilizer.path(zigzag, strength: 0.9)) - 11.300231991) < 1e-8)
    }

    @Test func zeroStrengthIsTheRawInput() {
        let out = Stabilizer.path(zigzag, strength: 0)
        #expect(out.count == zigzag.count)
        #expect(zip(out, zigzag).allSatisfy { $0.x == $1.x && $0.y == $1.y })
    }

    /// A two-point drag has no tremor in it, so it is passed through rather
    /// than lengthened by four catch-up samples that say nothing.
    @Test func aStraightDragIsLeftAlone() {
        #expect(Stabilizer.path(Array(zigzag.prefix(2)), strength: 0.9).count == 2)
    }
}

// MARK: - Hit testing

/// Pinned to the output of the real `src/lib/reader/hitTest.ts` run under Node,
/// for the same three objects. The eraser is the one tool that destroys work, so
/// "erased something the web would have kept" and "kept something the web would
/// have erased" both have to be impossible.
struct HitTestTests {

    private func ink(_ id: String, _ points: [InkPoint], width: Double = 0.003) -> AnnotationObject {
        AnnotationObject(
            id: id, kind: .ink, page: 1, z: 1,
            bbox: StrokeCodec.bounds(points, padding: width / 2), t: 1,
            tool: "ball", color: "#000", w: width, p: StrokeCodec.encode(points)
        )
    }

    private var horizontal: AnnotationObject {
        ink("aaa", [InkPoint(x: 0.1, y: 0.5), InkPoint(x: 0.4, y: 0.5)])
    }

    private var vertical: AnnotationObject {
        ink("bbb", [InkPoint(x: 0.6, y: 0.2), InkPoint(x: 0.6, y: 0.8)])
    }

    private var note: AnnotationObject {
        AnnotationObject(
            id: "ccc", kind: .note, page: 1, z: 2,
            bbox: [0.7, 0.1, 0.9, 0.2], t: 1,
            r: [0.7, 0.1, 0.9, 0.2], tone: .amber, text: "hi"
        )
    }

    private var page: [AnnotationObject] { [horizontal, vertical, note] }

    @Test func erasesWhatTheSweepCrosses() {
        let hit = HitTest.strokesAlongPath(
            page, path: [InkPoint(x: 0.2, y: 0.4), InkPoint(x: 0.2, y: 0.6)], radius: 0.012
        )
        #expect(hit == ["aaa"])
    }

    /// The reason the sweep is treated as a path rather than as its samples:
    /// here no reported point is anywhere near the stroke, but the line between
    /// two of them goes straight through it. A fast scrub reports points this
    /// far apart, and testing only them would rub out almost nothing.
    @Test func erasesWhatFellBetweenTwoSamples() {
        let hit = HitTest.strokesAlongPath(
            page, path: [InkPoint(x: 0.5, y: 0.5), InkPoint(x: 0.7, y: 0.5)], radius: 0.001
        )
        #expect(hit == ["bbb"])
    }

    /// A widget has no path to trace, so it goes when the sweep touches its box.
    @Test func erasesAWidgetByTouchingIt() {
        let hit = HitTest.strokesAlongPath(
            page, path: [InkPoint(x: 0.75, y: 0.15), InkPoint(x: 0.8, y: 0.15)], radius: 0.001
        )
        #expect(hit == ["ccc"])
    }

    @Test func leavesEverythingElseAlone() {
        let hit = HitTest.strokesAlongPath(
            page, path: [InkPoint(x: 0.05, y: 0.05), InkPoint(x: 0.06, y: 0.06)], radius: 0.001
        )
        #expect(hit.isEmpty)
    }

    /// The stroke's own width counts toward the reach, so ink is grabbable where
    /// it looks grabbable rather than only along its centre line.
    @Test func aStrokeIsAsWideAsItLooks() {
        #expect(HitTest.strokeHitsPoint(horizontal, InkPoint(x: 0.25, y: 0.5015), tolerance: 0.001))
        #expect(!HitTest.strokeHitsPoint(horizontal, InkPoint(x: 0.25, y: 0.6), tolerance: 0.001))
    }

    @Test func crossingSegmentsAreZeroApart() {
        #expect(HitTest.segmentDistance(
            InkPoint(x: 0, y: 0), InkPoint(x: 1, y: 1), InkPoint(x: 0, y: 1), InkPoint(x: 1, y: 0)
        ) == 0)
        #expect(abs(HitTest.segmentDistance(
            InkPoint(x: 0, y: 0), InkPoint(x: 1, y: 0), InkPoint(x: 0, y: 0.5), InkPoint(x: 1, y: 0.5)
        ) - 0.5) < 1e-12)
    }

    @Test func picksTheTopmostMarkUnderAPoint() {
        #expect(HitTest.topmost(page, at: InkPoint(x: 0.25, y: 0.5), tolerance: 0.005)?.id == "aaa")
        #expect(HitTest.topmost(page, at: InkPoint(x: 0.02, y: 0.02), tolerance: 0.005) == nil)
    }

    @Test func slopWidensAWidgetsBox() {
        #expect(HitTest.insideRect(InkPoint(x: 0.71, y: 0.11), [0.7, 0.1, 0.9, 0.2]))
        #expect(!HitTest.insideRect(InkPoint(x: 0.69, y: 0.11), [0.7, 0.1, 0.9, 0.2]))
        #expect(HitTest.insideRect(InkPoint(x: 0.69, y: 0.11), [0.7, 0.1, 0.9, 0.2], slop: 0.02))
    }
}
