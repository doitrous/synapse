import SwiftUI

/// Reading an article.
///
/// The measure is the point. Medical students read these for hours, so the
/// column is kept narrow, the body is serif, and nothing competes with the
/// prose. Everything that is not the article — key points, traps, sources,
/// related reading — sits after it rather than beside it.
struct ArticleReaderView: View {
    let article: Article
    var library: UserLibrary?
    /// Resolves a related article's id, so "read next" leads somewhere.
    var lookup: ((String) -> Article?)?
    /// The published evidence, so a fact can show where it came from.
    var evidence: EvidenceStore = .empty
    /// Open a source document at a page.
    var openSource: ((_ resourceId: String, _ page: Int?) -> Void)?

    @State private var showingEvidence: EvidenceStore.ArticleSpan?

    @State private var tagDraft = ""
    @State private var addingTag = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                header

                ForEach(article.blocks) { block in
                    blockView(block)
                }

                if !article.keyPoints.isEmpty {
                    panel("Hold these", items: article.keyPoints, tone: .accent)
                }
                if !article.traps.isEmpty {
                    panel("Where people lose the mark", items: article.traps, tone: .warning)
                }
                if !article.relatedArticles.isEmpty {
                    relatedReading
                }
                if library != nil { yourTags }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 24)
            // Long-form reading wants a measure, not the full width of an iPad.
            .frame(maxWidth: 680, alignment: .leading)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(Theme.paper)
        .navigationTitle(article.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if let library {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        Task { await library.toggleRead(article.id) }
                    } label: {
                        Image(systemName: library.hasRead(article.id)
                            ? "checkmark.circle.fill" : "checkmark.circle")
                    }
                    .tint(library.hasRead(article.id) ? Theme.success : Theme.primary)
                    .accessibilityLabel(library.hasRead(article.id) ? "Mark as unread" : "Mark as read")
                }
            }
        }
        .sheet(item: $showingEvidence) { span in
            EvidenceDrawer(span: span, evidence: evidence, openSource: openSource)
        }
        .alert("Add a tag", isPresented: $addingTag) {
            TextField("Tag", text: $tagDraft)
            Button("Cancel", role: .cancel) { tagDraft = "" }
            Button("Add") {
                Task { await library?.add(tag: tagDraft, to: article.id) }
                tagDraft = ""
            }
        }
    }

    /// How many exact sources sit behind a fact, said plainly.
    private func sourceCount(_ span: EvidenceStore.ArticleSpan) -> String {
        let count = span.citationIds.count
        if count == 0 { return "Where this comes from" }
        return count == 1 ? "1 source" : "\(count) sources"
    }

    /// What this student calls this article.
    ///
    /// The tags they have used elsewhere are offered alongside: someone who
    /// tagged one article "exam" means "exam" on the next one too, and
    /// retyping it invites "Exam" and "exams" to join it.
    @ViewBuilder private var yourTags: some View {
        if let library {
            let mine = library.tags(on: article.id)
            let reusable = library.allTags.filter { tag in
                !mine.contains { $0.caseInsensitiveCompare(tag) == .orderedSame }
            }

            VStack(alignment: .leading, spacing: 10) {
                Text("Your tags")
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                if mine.isEmpty {
                    Text("None yet. A tag is yours alone — nobody else sees it.")
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink3)
                } else {
                    HStack(spacing: 6) {
                        ForEach(mine, id: \.self) { tag in
                            Button {
                                Task { await library.remove(tag: tag, from: article.id) }
                            } label: {
                                HStack(spacing: 4) {
                                    Text(tag)
                                    Image(systemName: "xmark").font(.system(size: 8))
                                }
                                .font(Theme.ui(12))
                                .foregroundStyle(Theme.primary)
                                .padding(.horizontal, 9)
                                .padding(.vertical, 4)
                                .background(Theme.primaryTint, in: Capsule())
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }

                if !reusable.isEmpty {
                    Text("Reuse")
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                    HStack(spacing: 6) {
                        ForEach(reusable.prefix(8), id: \.self) { tag in
                            Button {
                                Task { await library.add(tag: tag, to: article.id) }
                            } label: {
                                Text(tag)
                                    .font(Theme.ui(12))
                                    .foregroundStyle(Theme.ink2)
                                    .padding(.horizontal, 9)
                                    .padding(.vertical, 4)
                                    .background(Theme.inset, in: Capsule())
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }

                Button {
                    addingTag = true
                } label: {
                    Label("Add a tag", systemImage: "plus")
                        .font(Theme.ui(13, weight: 600))
                        .foregroundStyle(Theme.primary)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.top, 8)
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(article.title)
                .font(Theme.display(28))
                .foregroundStyle(Theme.ink)

            Text("\(article.readingMinutes) min read")
                .font(Theme.numeric(12))
                .foregroundStyle(Theme.ink3)

            if !article.summary.isEmpty {
                Text(article.summary)
                    .font(Theme.ui(17))
                    .foregroundStyle(Theme.ink2)
                    .padding(.top, 4)
            }
        }
    }

    @ViewBuilder
    private func blockView(_ block: ArticleBlock) -> some View {
        switch block {
        case .heading(let text):
            Text(text)
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)
                .padding(.top, 8)

        case .paragraph(let text):
            Text(text)
                .font(Theme.serifBody(17))
                .foregroundStyle(Theme.ink)
                .lineSpacing(6)
                .textSelection(.enabled)

        case .callout(let title, let text):
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(Theme.panelTitle(12))
                    .foregroundStyle(Theme.primaryStrong)
                Text(text)
                    .font(Theme.ui(15))
                    .foregroundStyle(Theme.ink)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(14)
            .background(Theme.primaryTint)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.primaryLine, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))

        case .fact(let text, let spanId):
            // A verified statement. Marked so a student can see at a glance
            // which sentences carry evidence behind them — and pressable, so
            // they can see exactly what that evidence is.
            let span = spanId.flatMap { evidence.spansById[$0] }

            HStack(alignment: .top, spacing: 10) {
                // A cited statement is a source, so it takes the structural
                // blue rather than the action crimson.
                Rectangle()
                    .fill(Theme.accentLine)
                    .frame(width: 2)

                VStack(alignment: .leading, spacing: 6) {
                    Text(text)
                        .font(Theme.serifBody(16))
                        .foregroundStyle(Theme.ink)
                        .lineSpacing(5)
                        .textSelection(.enabled)

                    if let span {
                        Button {
                            showingEvidence = span
                        } label: {
                            Label(
                                sourceCount(span),
                                systemImage: "text.magnifyingglass"
                            )
                            .font(Theme.ui(11, weight: 600))
                            .foregroundStyle(Theme.accent)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .fixedSize(horizontal: false, vertical: true)

        case .sourcesHeader(let count):
            HStack(spacing: 8) {
                Text("Sources")
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)
                Text("\(count)")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
                Rectangle().fill(Theme.line).frame(height: 1)
            }
            .padding(.top, 12)
        }
    }

    private enum Tone { case accent, warning }

    private func panel(_ title: LocalizedStringKey, items: [String], tone: Tone) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(Theme.panelTitle())
                .foregroundStyle(tone == .accent ? Theme.primaryStrong : Theme.warning)

            ForEach(items, id: \.self) { item in
                HStack(alignment: .top, spacing: 8) {
                    Text("·").foregroundStyle(Theme.ink3)
                    Text(item)
                        .font(Theme.ui(15))
                        .foregroundStyle(Theme.ink)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Theme.surface)
        .overlay(
            RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }

    private var relatedReading: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Read next")
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)

            ForEach(article.relatedArticles) { related in
                // A link that leads somewhere, when the article it names is one
                // this student can read. Until now this was text that looked
                // like a link and did nothing.
                if let destination = lookup?(related.id) {
                    NavigationLink {
                        ArticleReaderView(article: destination, library: library, lookup: lookup)
                    } label: {
                        relatedRow(related, leadsSomewhere: true)
                    }
                    .buttonStyle(.plain)
                } else {
                    relatedRow(related, leadsSomewhere: false)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.top, 8)
    }

    /// Named the same whether or not it leads anywhere, but only coloured as a
    /// link when it does — an article withdrawn since this one was written is
    /// still worth naming, and is not worth pretending to offer.
    private func relatedRow(_ related: RelatedArticle, leadsSomewhere: Bool) -> some View {
        HStack(alignment: .top, spacing: 8) {
            VStack(alignment: .leading, spacing: 2) {
                Text(related.title)
                    .font(Theme.ui(15, weight: 500))
                    .foregroundStyle(leadsSomewhere ? Theme.primary : Theme.ink2)
                if let reason = related.reason {
                    Text(reason)
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink3)
                }
            }
            Spacer(minLength: 4)
            if leadsSomewhere {
                Image(systemName: "chevron.right")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(Theme.ink3)
                    .flipsForRightToLeftLayoutDirection(true)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .contentShape(Rectangle())
    }
}
