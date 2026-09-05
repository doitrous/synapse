import Foundation
import Testing
@testable import Nishany

/// The projection decides whether unverified medical writing reaches a student,
/// so these are correctness tests, not formatting ones. The failure they guard
/// against is silent: a gated article rendering its draft prose looks exactly
/// like a gated article rendering its reviewed prose.
struct ArticleProjectionTests {

    private func item(_ articleData: [String: Any], fields: [String: String] = [:], id: String = "A1", title: String = "Aortic stenosis") -> LedgerItem {
        let (items, _) = LedgerDecoder.decode([[
            "id": id, "kind": "article", "title": title, "subjectId": "SYS_CVS",
            "status": "Published", "fields": fields, "articleData": articleData,
        ]])
        return items[0]
    }

    private func project(
        _ articleData: [String: Any],
        fields: [String: String] = [:],
        evidence: EvidenceStore = .empty,
        readableTitles: [String: String] = [:]
    ) -> Article? {
        ArticleProjection.project(
            item: item(articleData, fields: fields),
            evidence: evidence, concepts: .empty, readableTitles: readableTitles
        )
    }

    private var texts: (Article?) -> [String] {
        { article in
            (article?.blocks ?? []).compactMap { block in
                switch block {
                case .paragraph(let text), .heading(let text), .fact(let text, _): text
                case .callout(_, let text): text
                case .sourcesHeader: nil
                }
            }
        }
    }

    // MARK: - The evidence gate

    @Test("an ungated article renders its authored body")
    func ungatedRendersBody() throws {
        let article = try #require(project([
            "summary": "A narrowing.",
            "sections": [["id": "s1", "heading": "Definition", "body": "The valve narrows."]],
        ]))
        #expect(texts(article).contains("The valve narrows."))
    }

    /// The whole point of gating. `publishedSections` is the reviewed
    /// projection; `sections` remains the admin draft and must not be read.
    @Test("a gated article renders the reviewed projection, not the draft")
    func gatedPrefersPublished() throws {
        let article = try #require(project([
            "summary": "Draft summary.",
            "publishedSummary": "Reviewed summary.",
            "sections": [["id": "s1", "heading": "Definition", "body": "DRAFT TEXT"]],
            "publishedSections": [["id": "s1", "heading": "Definition", "narrative": "Reviewed text."]],
        ]))

        #expect(article.summary == "Reviewed summary.")
        #expect(texts(article).contains("Reviewed text."))
        #expect(!texts(article).contains("DRAFT TEXT"), "draft prose must never reach a student")
    }

    /// A section naming evidence spans is asserting those statements need
    /// support. If the store has none, falling back to the draft body would
    /// publish exactly what the author said needed checking.
    @Test("a section whose named evidence is missing renders nothing")
    func missingEvidenceRendersNothing() throws {
        let article = try #require(project([
            "publishedSections": [[
                "id": "s1", "heading": "Pathophysiology",
                "body": "UNVERIFIED DRAFT", "spanIds": ["span-does-not-exist"],
            ]],
        ]))

        #expect(!texts(article).contains("UNVERIFIED DRAFT"))
        #expect(article.blocks.contains(.heading("Pathophysiology")))
    }

    @Test("a section with no prose still shows its verified facts")
    func factsStandInForProse() throws {
        var evidence = EvidenceStore.empty
        let span = EvidenceStore.ArticleSpan(
            id: "span-1", articleId: "A1", sectionId: "s1",
            text: "Peak gradient above 40 mmHg is severe.", claimIds: [], citationIds: []
        )
        evidence.spansById["span-1"] = span
        evidence.spansBySection["A1|s1"] = [span]

        let article = try #require(project([
            "publishedSections": [["id": "s1", "heading": "Severity", "spanIds": ["span-1"]]],
        ], evidence: evidence))

        #expect(texts(article).contains("Peak gradient above 40 mmHg is severe."))
    }

    @Test("reviewed prose moves its facts to a sources section at the end")
    func factsMoveToSources() throws {
        var evidence = EvidenceStore.empty
        let span = EvidenceStore.ArticleSpan(
            id: "span-1", articleId: "A1", sectionId: "s1",
            text: "A cited fact.", claimIds: [], citationIds: []
        )
        evidence.spansById["span-1"] = span
        evidence.spansBySection["A1|s1"] = [span]

        let article = try #require(project([
            "publishedSections": [[
                "id": "s1", "heading": "Definition",
                "narrative": "It reads as prose.", "spanIds": ["span-1"],
            ]],
        ], evidence: evidence))

        let blocks = article.blocks
        let sourcesIndex = try #require(blocks.firstIndex { if case .sourcesHeader = $0 { return true }; return false })
        let proseIndex = try #require(blocks.firstIndex(of: .paragraph("It reads as prose.")))
        let factIndex = try #require(blocks.firstIndex(of: .fact(text: "A cited fact.", spanId: "span-1")))

        #expect(proseIndex < sourcesIndex, "the article reads as prose first")
        #expect(sourcesIndex < factIndex, "its facts are listed after the sources header")
    }

    @Test("the generated components listing never reaches a student")
    func dropsComponentsSection() throws {
        let article = try #require(project([
            "sections": [
                ["id": "s1", "heading": "Definition", "body": "Real content."],
                ["id": "s2", "heading": "Components and relations", "body": "MACHINE DUMP", "kind": "components"],
            ],
        ]))
        #expect(!texts(article).contains("MACHINE DUMP"))
        #expect(texts(article).contains("Real content."))
    }

    @Test("an evidence-not-yet-available placeholder is not shown")
    func dropsPlaceholder() throws {
        let article = try #require(project([
            "sections": [["id": "s1", "heading": "Prognosis", "body": "Evidence not yet available for this section."]],
        ]))
        #expect(texts(article).isEmpty)
    }

    // MARK: - Callouts

    @Suite("Teaching callouts")
    struct Callouts {
        private let helper = ArticleProjectionTests()

        @Test("an ungated article publishes its callouts as before")
        func ungatedPublishes() throws {
            let article = try #require(helper.project([
                "holdThese": ["Murmur radiates to the carotids."],
                "loseTheMark": ["Do not give a vasodilator."],
            ]))
            #expect(article.keyPoints == ["Murmur radiates to the carotids."])
            #expect(article.traps == ["Do not give a vasodilator."])
        }

        /// The failure the web app's comment records: an earlier version
        /// discarded reviewed teaching on gating and substituted hardcoded
        /// filler. Nothing may be invented — a line publishes or is absent.
        @Test("a gated callout with neither evidence nor review is withheld")
        func gatedWithoutEvidenceWithheld() throws {
            let article = try #require(helper.project([
                "publishedSections": [["id": "s1", "heading": "H", "narrative": "Prose."]],
                "holdThese": ["An unsupported claim."],
                "loseTheMark": ["Another unsupported claim."],
            ]))
            #expect(article.traps.isEmpty)
            #expect(!article.keyPoints.contains("An unsupported claim."))
        }

        @Test("a gated callout publishes when its evidence resolves")
        func resolvingEvidencePublishes() throws {
            var evidence = EvidenceStore.empty
            evidence.claimIds = ["claim-1"]

            let article = try #require(helper.project([
                "publishedSections": [["id": "s1", "heading": "H", "narrative": "Prose."]],
                "holdThese": ["A supported claim."],
                "calloutEvidence": ["A supported claim.": ["claimIds": ["claim-1"]]],
            ], evidence: evidence))

            #expect(article.keyPoints == ["A supported claim."])
        }

        /// Part of a statement being unsupported is not a weaker kind of
        /// supported.
        @Test("a partially resolving chain does not publish")
        func partialChainWithheld() throws {
            var evidence = EvidenceStore.empty
            evidence.claimIds = ["claim-1"]  // claim-2 is absent

            let article = try #require(helper.project([
                "publishedSections": [["id": "s1", "heading": "H", "narrative": "Prose."]],
                "holdThese": ["A half-supported claim."],
                "calloutEvidence": ["A half-supported claim.": ["claimIds": ["claim-1", "claim-2"]]],
            ], evidence: evidence))

            #expect(article.keyPoints.isEmpty || !article.keyPoints.contains("A half-supported claim."))
        }

        @Test("a named reviewer publishes the line")
        func reviewerPublishes() throws {
            let article = try #require(helper.project([
                "publishedSections": [["id": "s1", "heading": "H", "narrative": "Prose."]],
                "loseTheMark": ["A reviewed warning."],
                "calloutEvidence": ["A reviewed warning.": ["reviewedBy": "Dr Halim"]],
            ]))
            #expect(article.traps == ["A reviewed warning."])
        }

        @Test("an article-level review date publishes its callouts")
        func articleReviewPublishes() throws {
            let article = try #require(helper.project([
                "publishedSections": [["id": "s1", "heading": "H", "narrative": "Prose."]],
                "lastReviewed": "2026-06-01",
                "holdThese": ["A line covered by the article review."],
            ]))
            #expect(article.keyPoints == ["A line covered by the article review."])
        }
    }

    // MARK: - Related reading

    @Test("a related link to an unreadable article is dropped")
    func dropsDeadLinks() throws {
        let article = try #require(project(
            ["relatedArticleIds": ["A2", "A-archived", "A1"]],
            readableTitles: ["A2": "Mitral regurgitation"]
        ))
        #expect(article.relatedArticles.map(\.id) == ["A2"], "a link to nothing must not be rendered")
    }

    @Test("a link carries the reason recorded for that pair")
    func carriesReason() throws {
        let article = try #require(project([
            "relatedArticleIds": ["A2"],
            "fieldNotes": ["relatedArticle:A2": "Often confused on auscultation."],
        ], readableTitles: ["A2": "Mitral regurgitation"]))

        #expect(article.relatedArticles.first?.reason == "Often confused on auscultation.")
    }

    // MARK: - Metadata

    @Test("reading time and chapter fall back sensibly")
    func metadataFallbacks() throws {
        let withFields = try #require(project([:], fields: ["Reading time": "12", "Topic": "Valvular disease"]))
        #expect(withFields.readingMinutes == 12)
        #expect(withFields.chapter == "Valvular disease")

        let without = try #require(project([:]))
        #expect(without.readingMinutes == 6)
        #expect(without.chapter == "New articles")
    }

    @Test("only articles project")
    func onlyArticles() {
        let (items, _) = LedgerDecoder.decode([[
            "id": "Q1", "kind": "question", "title": "A question", "subjectId": "S", "status": "Published",
        ]])
        #expect(ArticleProjection.project(item: items[0], evidence: .empty, concepts: .empty, readableTitles: [:]) == nil)
    }
}

/// Typography is settled once at projection time so every surface shows the
/// same text.
struct ProseTests {

    @Test("straight quotes become typographic ones, by what precedes them")
    func quotes() {
        #expect(Prose.normalize("her heart keeps \"jumping\"") == "her heart keeps \u{201C}jumping\u{201D}")
        #expect(Prose.normalize("\"Opening at the start\"") == "\u{201C}Opening at the start\u{201D}")
    }

    @Test("an apostrophe after a word is not an opening quote")
    func apostrophes() {
        #expect(Prose.normalize("the patient's murmur") == "the patient\u{2019}s murmur")
        #expect(Prose.normalize("don't") == "don\u{2019}t")
    }

    @Test("entities are decoded before quotes are decided")
    func entities() {
        #expect(Prose.normalize("&quot;quoted&quot;") == "\u{201C}quoted\u{201D}")
        #expect(Prose.normalize("A &amp; B") == "A & B")
        #expect(Prose.normalize("&#176;C") == "\u{00B0}C")
        #expect(Prose.normalize("&#x00B0;C") == "\u{00B0}C")
    }

    /// A literal `&amp;quot;` in the source is the text `&quot;`, not a quote.
    @Test("a double-escaped entity is only decoded once")
    func doubleEscaping() {
        #expect(Prose.normalize("&amp;quot;") == "&quot;")
    }

    @Test("an unknown entity is left alone")
    func unknownEntity() {
        #expect(Prose.normalize("&notanentity;") == "&notanentity;")
    }

    @Test("only a spaced double dash becomes an em dash")
    func dashes() {
        #expect(Prose.normalize("a -- b") == "a\u{2014}b")
        #expect(Prose.normalize("COVID--19") == "COVID--19", "an unspaced pair is far more likely a range or an identifier")
    }

    @Test("exactly three dots become an ellipsis")
    func ellipsis() {
        #expect(Prose.normalize("wait...") == "wait\u{2026}")
        #expect(Prose.normalize("wait....") == "wait....", "a longer run is left alone")
    }

    @Test("Arabic text is left intact")
    func arabic() {
        let arabic = "تضيق الصمام الأورطي"
        #expect(Prose.normalize(arabic) == arabic)
    }
}
