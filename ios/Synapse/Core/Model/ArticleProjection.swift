import Foundation

/// Turns a ledger article into what a student may read.
///
/// A port of `articleToSubtopic` and `calloutPolicy.ts`. The rules here are not
/// presentation choices — they decide whether unverified medical writing
/// reaches a student, and the web app's own comments record what went wrong
/// when they were skipped. Keep this in step with `src/data/articleProjection.ts`
/// and `src/data/calloutPolicy.ts`.
///
/// The central idea is the **evidence gate**. An article carrying a
/// `publishedSections` projection has been through review, and from then on its
/// draft prose is not student-readable — only reviewed narrative, statements
/// whose evidence resolves in the published store, and lines a human signed off.
enum ArticleProjection {

    /// Build the readable article, or `nil` if the record is not an article.
    static func project(
        item: LedgerItem,
        evidence: EvidenceStore,
        concepts: ConceptIndex,
        readableTitles: [String: String]
    ) -> Article? {
        guard item.kind == .article else { return nil }
        guard let record = try? JSONSerialization.jsonObject(with: item.raw) as? [String: Any] else { return nil }

        let data = record["articleData"] as? [String: Any]
        let fields = record["fields"] as? [String: String] ?? [:]
        let gated = data?["publishedSections"] != nil

        var blocks: [ArticleBlock] = []
        // Facts are gathered as we go and listed once at the end, under Sources,
        // so the article reads as prose rather than as a column of sourced
        // sentences.
        var sourceBlocks: [ArticleBlock] = []

        for section in sections(from: data) {
            if let heading = section.heading?.trimmed, !heading.isEmpty {
                blocks.append(.heading(heading))
            }

            let spans = sectionSpans(articleId: item.id, section: section, evidence: evidence)
            let facts: [ArticleBlock] = spans.compactMap { span in
                guard let text = span.text?.trimmed, !text.isEmpty else { return nil }
                return .fact(text: text, spanId: span.id)
            }

            if let narrative = section.narrative?.trimmed, !narrative.isEmpty {
                // Reviewed prose: read the article, then check its sources.
                blocks.append(contentsOf: paragraphs(narrative))
                sourceBlocks.append(contentsOf: facts)
            } else if !facts.isEmpty {
                // No prose written yet — keep the verified facts inline rather
                // than dropping content a student can already read.
                blocks.append(contentsOf: facts)
            } else if section.spanIds.isEmpty, let body = section.body?.trimmed, !body.isEmpty {
                // Never fall back to draft prose when a section names evidence
                // spans that are absent from the published store: the author
                // asserted those statements need evidence, and it did not
                // resolve.
                blocks.append(contentsOf: paragraphs(body))
            }
        }

        // University notes are authored asides, not reviewed content, so a
        // gated article drops them.
        if !gated {
            for note in data?["universityNotes"] as? [[String: Any]] ?? [] {
                guard let text = (note["text"] as? String)?.trimmed, !text.isEmpty else { continue }
                let university = note["universityId"] as? String ?? ""
                blocks.append(.callout(title: "\(university) only", text: text))
            }
        }

        if !sourceBlocks.isEmpty {
            blocks.append(.sourcesHeader(count: sourceBlocks.count))
            blocks.append(contentsOf: sourceBlocks)
        }

        let traps = publishableCallouts(kind: .trap, data: data, evidence: evidence)
        let authoredKeyPoints = publishableCallouts(kind: .hold, data: data, evidence: evidence)

        // `blocks` already holds the source facts, so reading both would repeat
        // every one. Verified facts stand in only when the policy publishes no
        // authored key points, so a gated article still shows something.
        let factKeyPoints = blocks.compactMap { block -> String? in
            if case .fact(let text, _) = block { return text }
            return nil
        }.prefix(5)

        return Article(
            id: item.id,
            title: item.title,
            subjectId: item.subjectId,
            chapter: fields["Topic"]?.trimmed.nilIfEmpty ?? "New articles",
            readingMinutes: Int(fields["Reading time"] ?? "") ?? 6,
            summary: (data?["publishedSummary"] as? String)?.nilIfEmpty
                ?? (data?["summary"] as? String)?.nilIfEmpty
                ?? fields["Summary"] ?? "",
            blocks: blocks,
            keyPoints: authoredKeyPoints.isEmpty ? Array(factKeyPoints) : authoredKeyPoints,
            traps: traps,
            relatedArticles: relatedArticles(
                ids: data?["relatedArticleIds"] as? [String],
                readableTitles: readableTitles,
                selfId: item.id,
                reasons: data?["fieldNotes"] as? [String: String]
            ),
            linkedQuestionIds: []
        )
    }

    // MARK: - Sections

    struct Section {
        let id: String?
        let heading: String?
        let body: String?
        let narrative: String?
        let spanIds: [String]
    }

    /// The sections a student may read, in order.
    ///
    /// `publishedSections` wins when present — that *is* the student
    /// projection. The generated "components" listing is a machine dump of
    /// concepts and relations, never reading material.
    private static func sections(from data: [String: Any]?) -> [Section] {
        let raw = (data?["publishedSections"] as? [[String: Any]])
            ?? (data?["sections"] as? [[String: Any]])
            ?? []

        return raw.compactMap { entry -> Section? in
            if entry["kind"] as? String == "components" { return nil }

            let heading = (entry["heading"] as? String)?.trimmed
            let body = (entry["body"] as? String)?.trimmed
            let narrative = (entry["narrative"] as? String)?.trimmed

            // A section with nothing in it renders as a stray heading.
            guard [heading, body, narrative].contains(where: { !($0 ?? "").isEmpty }) else { return nil }
            // A placeholder the pipeline writes where evidence is still missing.
            if let body, body.range(of: "^Evidence not yet available", options: [.regularExpression, .caseInsensitive]) != nil {
                return nil
            }

            return Section(
                id: entry["id"] as? String,
                heading: heading, body: body, narrative: narrative,
                spanIds: entry["spanIds"] as? [String] ?? []
            )
        }
    }

    /// Evidence spans belonging to a section: those it names, then those the
    /// store records against it.
    private static func sectionSpans(
        articleId: String, section: Section, evidence: EvidenceStore
    ) -> [EvidenceStore.ArticleSpan] {
        let named = section.spanIds.compactMap { evidence.spansById[$0] }
        let seen = Set(named.map(\.id))
        guard let sectionId = section.id else { return named }
        let derived = (evidence.spansBySection["\(articleId)|\(sectionId)"] ?? [])
            .filter { !seen.contains($0.id) }
        return named + derived
    }

    // MARK: - The callout gate

    enum CalloutKind {
        case hold, trap

        var field: String {
            switch self {
            case .hold: "holdThese"
            case .trap: "loseTheMark"
            }
        }
    }

    /// Which "Hold these" / "Where people lose the mark" lines a student sees.
    ///
    /// A port of `publishableCallouts`. The web app's note records why it is
    /// careful: an earlier version discarded both the moment an article became
    /// gated and substituted hardcoded filler, so students were shown invented
    /// text in place of reviewed teaching. Nothing here invents anything — a
    /// line either publishes or is absent.
    static func publishableCallouts(
        kind: CalloutKind, data: [String: Any]?, evidence: EvidenceStore
    ) -> [String] {
        let lines = (data?[kind.field] as? [String] ?? [])
            .map { $0.trimmed }
            .filter { !$0.isEmpty }
        guard !lines.isEmpty else { return [] }

        // An article with no student projection was never gated. Its callouts
        // are the older authoring path and publish as they always did.
        guard data?["publishedSections"] != nil else { return lines }

        let calloutEvidence = data?["calloutEvidence"] as? [String: [String: Any]] ?? [:]
        let articleReviewed = (data?["lastReviewed"] as? String)?.trimmed.nilIfEmpty

        return lines.filter { line in
            let entry = calloutEvidence[line]
            if resolves(entry: entry, in: evidence) { return true }
            // A named human stands behind this specific line.
            if let reviewer = (entry?["reviewedBy"] as? String)?.trimmed, !reviewer.isEmpty { return true }
            // Or the article as a whole was reviewed on a date.
            if articleReviewed != nil { return true }
            return false
        }
    }

    /// Whether a callout's named evidence actually exists in the published store.
    ///
    /// Note the asymmetry between the three: one span is enough, but *every*
    /// named claim or citation must resolve. A partially-resolving chain means
    /// part of the statement is unsupported, which is not a weaker version of
    /// supported — it is unsupported.
    private static func resolves(entry: [String: Any]?, in evidence: EvidenceStore) -> Bool {
        guard let entry else { return false }

        if let spanId = entry["spanId"] as? String, evidence.spansById[spanId] != nil { return true }

        let claims = entry["claimIds"] as? [String] ?? []
        if !claims.isEmpty, claims.allSatisfy({ evidence.claimIds.contains($0) }) { return true }

        let citations = entry["citationIds"] as? [String] ?? []
        if !citations.isEmpty, citations.allSatisfy({ evidence.citationIds.contains($0) }) { return true }

        return false
    }

    // MARK: - Related reading

    /// Where an article records why it links to another. The reason belongs to
    /// the pair, so it is keyed by the other article's ID.
    static func relatedReasonKey(_ targetId: String) -> String { "relatedArticle:\(targetId)" }

    /// Links a student can actually open.
    ///
    /// A link survives only if it points at an article this projection will
    /// render. A dead ID, an archived article, or one held back would otherwise
    /// render as a link to nothing.
    static func relatedArticles(
        ids: [String]?, readableTitles: [String: String], selfId: String, reasons: [String: String]?
    ) -> [RelatedArticle] {
        var seen = Set<String>()
        var links: [RelatedArticle] = []

        for id in ids ?? [] {
            let key = id.trimmed
            guard !key.isEmpty, key != selfId, !seen.contains(key) else { continue }
            guard let title = readableTitles[key] else { continue }
            seen.insert(key)
            links.append(RelatedArticle(
                id: key, title: title,
                reason: reasons?[relatedReasonKey(key)]?.trimmed.nilIfEmpty
            ))
        }
        return links
    }

    // MARK: - Prose

    /// Split a body into paragraphs, settling typography once so every surface
    /// shows the same text. Blank-line separated, as `bodyToBlocks` does.
    private static func paragraphs(_ body: String) -> [ArticleBlock] {
        Prose.normalize(body)
            .components(separatedBy: .newlines)
            .reduce(into: [String]()) { paragraphs, line in
                if line.trimmed.isEmpty {
                    if paragraphs.last?.isEmpty == false { paragraphs.append("") }
                } else if paragraphs.isEmpty || paragraphs[paragraphs.count - 1].isEmpty {
                    if paragraphs.last?.isEmpty == true { paragraphs.removeLast() }
                    paragraphs.append(line)
                } else {
                    paragraphs[paragraphs.count - 1] += "\n" + line
                }
            }
            .map { $0.trimmed }
            .filter { !$0.isEmpty }
            .map { .paragraph($0) }
    }
}

extension String {
    var trimmed: String { trimmingCharacters(in: .whitespacesAndNewlines) }
    var nilIfEmpty: String? { isEmpty ? nil : self }
}
