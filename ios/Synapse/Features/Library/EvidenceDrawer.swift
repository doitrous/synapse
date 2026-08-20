import SwiftUI

/// Where a stated fact came from.
///
/// A port of the web's evidence drawer. Every fact in an article carries a
/// stable id and the exact sources behind it — the document, the page, and the
/// sentence in it that supports the statement. Showing that is the difference
/// between a revision app and one a student can check.
struct EvidenceDrawer: View {
    let span: EvidenceStore.ArticleSpan
    let evidence: EvidenceStore
    /// Open a source document at a page, when there is one to open.
    var openSource: ((_ resourceId: String, _ page: Int?) -> Void)?

    @Environment(\.dismiss) private var dismiss

    private var citations: [EvidenceStore.Citation] {
        span.citationIds.compactMap { evidence.citations[$0] }
    }

    private var claims: [EvidenceStore.Claim] {
        span.claimIds.compactMap { evidence.claims[$0] }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 14) {
                    statement
                    ForEach(citations) { citation in
                        source(citation)
                    }

                    if citations.isEmpty {
                        // The gate lets an article through on claims alone, so
                        // a fact can be verified without an exact page behind
                        // it. Saying so is better than an empty drawer.
                        Text("This fact is verified, but no exact page in a source document has been recorded for it yet.")
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink2)
                    }
                }
                .padding(20)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .navigationTitle("Where this comes from")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(Theme.ui(16, weight: 600))
                        .tint(Theme.primary)
                }
            }
        }
    }

    private var statement: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let text = span.text, !text.isEmpty {
                Text(text)
                    .font(Theme.serifBody(16))
                    .foregroundStyle(Theme.ink)
                    .lineSpacing(4)
            }

            HStack(spacing: 6) {
                ForEach(claims, id: \.id) { claim in
                    Text(claim.label)
                        .font(Theme.ui(10, weight: 600))
                        .foregroundStyle(claim.isVerified ? Theme.success : Theme.warning)
                        .padding(.horizontal, 7)
                        .padding(.vertical, 2)
                        .background(
                            (claim.isVerified ? Theme.successTint : Theme.warningTint),
                            in: Capsule()
                        )
                }

                Spacer()

                // The id is stable across edits, which is what makes a fact
                // quotable in a way that survives the article being rewritten.
                Text(span.id)
                    .font(Theme.numeric(10))
                    .foregroundStyle(Theme.ink3)
                    .lineLimit(1)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }

    private func source(_ citation: EvidenceStore.Citation) -> some View {
        let file = evidence.resourceFiles[citation.resourceId]
        let title = evidence.resourceTitles[citation.resourceId] ?? citation.resourceId

        return VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top, spacing: 10) {
                Image(systemName: "doc.text")
                    .foregroundStyle(Theme.ink3)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(Theme.ui(14, weight: 600))
                        .foregroundStyle(Theme.ink)
                    if let place = citation.placeLabel {
                        Text(place)
                            .font(Theme.numeric(12))
                            .foregroundStyle(Theme.ink2)
                    }
                }
            }

            if let support = citation.supportSpan {
                Text(support)
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
                    .padding(.leading, 10)
                    .overlay(alignment: .leading) {
                        // Blue: this is a source, and sources are structural
                        // rather than actionable.
                        Rectangle().fill(Theme.accent).frame(width: 2)
                    }
            }

            HStack {
                Text(citation.countsAsClaimEvidence ? "Evidence for this fact" : "Background for the article")
                    .font(Theme.ui(11))
                    .foregroundStyle(Theme.ink3)

                Spacer()

                // Only offered when the document is actually here to open. A
                // citation naming a resource nobody has uploaded is still worth
                // showing — a student can find it in a library — but a button
                // that leads to "nothing here" teaches them to stop pressing.
                if file != nil {
                    Button {
                        openSource?(citation.resourceId, citation.page)
                        dismiss()
                    } label: {
                        Label(
                            citation.page != nil ? "Open at this page" : "Open the source",
                            systemImage: "arrow.up.forward.square"
                        )
                        .font(Theme.ui(12, weight: 600))
                    }
                    .tint(Theme.accent)
                } else {
                    Text("Not uploaded yet")
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                }
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }
}
