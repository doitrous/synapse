import SwiftUI

/// Reading an article.
///
/// The measure is the point. Medical students read these for hours, so the
/// column is kept narrow, the body is serif, and nothing competes with the
/// prose. Everything that is not the article — key points, traps, sources,
/// related reading — sits after it rather than beside it.
struct ArticleReaderView: View {
    @Environment(\.strings) private var strings
    let article: Article
    var library: UserLibrary?
    /// Resolves a related article's id, so "read next" leads somewhere.
    var lookup: ((String) -> Article?)?
    /// The published evidence, so a fact can show where it came from.
    var evidence: EvidenceStore = .empty
    /// Open a source document at a page.
    var openSource: ((_ resourceId: String, _ page: Int?) -> Void)?
    /// The concepts whose terms should be pressable in this article's prose.
    var concepts = ConceptTerms()

    @State private var showingEvidence: EvidenceStore.ArticleSpan?

    @State private var tagDraft = ""
    @State private var addingTag = false

    /// A concept term the reader pressed — hosted here now that the markable
    /// prose is a `UITextView` and cannot open its own sheet the way `ConceptText`
    /// did.
    @State private var openedConcept: Concept?
    /// The mark whose note is open for reading or editing.
    @State private var editingMark: LibraryMark?

    /// The blocks a student can mark: the serif reading prose. Callouts, key
    /// points and headings are left out, exactly the prose/heading split the web
    /// draws with `data-mark-block`.
    private var markableBlocks: [(id: String, text: String)] {
        article.blocks.compactMap { block in
            switch block {
            case .paragraph(let text): (block.id, text)
            case .fact(let text, _): (block.id, text)
            default: nil
            }
        }
    }

    /// Where every mark on this article resolves now, and which are orphaned.
    /// Recomputed when `library.marks` changes because reading it here makes the
    /// body observe it.
    private var placement: (placements: [String: [LibraryMarks.Placement]], orphans: [LibraryMark]) {
        guard let library else { return ([:], []) }
        return LibraryMarks.place(library.marks(on: article.id), in: markableBlocks)
    }

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
                if library != nil { yourMarks }
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
            ToolbarItem(placement: .topBarTrailing) {
                AssistantButton(surface: "Library")
            }
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
        .environment(\.evidence, evidence)
        .sheet(item: $showingEvidence) { span in
            EvidenceDrawer(span: span, evidence: evidence, openSource: openSource)
            .localisedSheet()
        }
        .sheet(item: $openedConcept) { concept in
            ConceptSheet(concept: concept, index: concepts)
            .localisedSheet()
        }
        .sheet(item: $editingMark) { mark in
            MarkNoteSheet(
                mark: mark,
                onCommit: { updated in Task { await library?.updateMark(updated) } },
                onRemove: { Task { await library?.removeMark(articleID: article.id, markID: mark.id) } }
            )
            .localisedSheet()
        }
        .alert(strings("Add a tag"), isPresented: $addingTag) {
            TextField(strings("Tag"), text: $tagDraft)
            Button(strings("Cancel"), role: .cancel) { tagDraft = "" }
            Button(strings("Add")) {
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
                Text(strings("Your tags"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                if mine.isEmpty {
                    Text(strings("None yet. A tag is yours alone — nobody else sees it."))
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
                    Text(strings("Reuse"))
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
                    Label(strings("Add a tag"), systemImage: "plus")
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

    /// Reading prose. Selectable-and-markable when a library is attached — the
    /// live app — and plain `ConceptText` otherwise, so previews and tests that
    /// build the reader without a store still render.
    @ViewBuilder
    private func prose(_ text: String, blockId: String, uiFont: UIFont, font: Font) -> some View {
        if let library {
            MarkableText(
                text: text,
                blockId: blockId,
                font: uiFont,
                concepts: concepts,
                placements: placement.placements[blockId] ?? [],
                strings: strings,
                onOpenConcept: { openedConcept = $0 },
                onOpenMark: { id in
                    editingMark = library.marks(on: article.id).first { $0.id == id }
                },
                onCreate: { range, tone, openNote in
                    Task {
                        let mark = await library.addMark(
                            articleID: article.id, block: blockId, text: text,
                            range: range, tone: tone
                        )
                        if openNote, let mark { editingMark = mark }
                    }
                }
            )
        } else {
            ConceptText(text, font: font, index: concepts)
        }
    }

    /// Every mark on this article, in one place — a highlight halfway down a
    /// long article is otherwise easy to lose. Orphans, whose words an edit
    /// removed, are listed apart so nothing a student wrote disappears silently.
    @ViewBuilder private var yourMarks: some View {
        let all = library?.marks(on: article.id) ?? []
        if !all.isEmpty {
            let orphanIds = Set(placement.orphans.map(\.id))
            let live = all.filter { !orphanIds.contains($0.id) }

            VStack(alignment: .leading, spacing: 10) {
                HStack(spacing: 6) {
                    Image(systemName: "highlighter").foregroundStyle(Theme.primary)
                    Text(strings("Your marks"))
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.ink2)
                    Text("\(all.count)")
                        .font(Theme.numeric(11))
                        .foregroundStyle(Theme.ink3)
                }

                ForEach(live) { mark in
                    markRow(mark, orphaned: false)
                }

                if !placement.orphans.isEmpty {
                    Text(placement.orphans.count == 1
                         ? strings("One mark no longer matches the article")
                         : strings("Some marks no longer match the article"))
                        .font(Theme.ui(12, weight: 600))
                        .foregroundStyle(Theme.ink2)
                        .padding(.top, 4)
                    Text(strings("The words they were made on were edited or removed. They are kept so nothing you wrote is lost."))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                    ForEach(placement.orphans) { mark in
                        markRow(mark, orphaned: true)
                    }
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
            .padding(.top, 8)
        }
    }

    private func markRow(_ mark: LibraryMark, orphaned: Bool) -> some View {
        Button {
            editingMark = mark
        } label: {
            HStack(alignment: .top, spacing: 8) {
                Circle()
                    .fill(MarkTonePalette.color(mark.tone))
                    .frame(width: 10, height: 10)
                    .padding(.top, 4)
                VStack(alignment: .leading, spacing: 3) {
                    Text("“\(mark.anchor.exact)”")
                        .font(Theme.serifBody(14))
                        .foregroundStyle(orphaned ? Theme.ink3 : Theme.ink)
                        .italic(orphaned)
                        .lineLimit(3)
                    if !mark.note.trimmed.isEmpty {
                        HStack(alignment: .top, spacing: 5) {
                            Image(systemName: "text.bubble").font(.system(size: 11)).foregroundStyle(Theme.ink3)
                            Text(mark.note)
                                .font(Theme.ui(12))
                                .foregroundStyle(Theme.ink2)
                                .lineLimit(4)
                        }
                    }
                }
                Spacer(minLength: 0)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(
            (mark.note.trimmed.isEmpty ? strings("Your highlight") : strings("Your note"))
            + ": " + mark.anchor.exact
        )
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
            prose(text, blockId: block.id, uiFont: Theme.serifBodyFont(17), font: Theme.serifBody(17))

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
                    prose(text, blockId: block.id, uiFont: Theme.serifBodyFont(16), font: Theme.serifBody(16))

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
                Text(strings("Sources"))
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
                    Text(strings("·")).foregroundStyle(Theme.ink3)
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
            Text(strings("Read next"))
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

/// Reading, writing and removing one mark's note and tone.
///
/// The note is written on the way out rather than per keystroke: this is a
/// stored document shared with every other surface, and a note is usually a
/// sentence — the same choice the web's `MarkNotePopover` makes. Changing the
/// tone commits at once, because there is nothing to compose.
private struct MarkNoteSheet: View {
    let mark: LibraryMark
    let onCommit: (LibraryMark) -> Void
    let onRemove: () -> Void

    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss
    @State private var draft: String
    @State private var tone: String

    init(mark: LibraryMark, onCommit: @escaping (LibraryMark) -> Void, onRemove: @escaping () -> Void) {
        self.mark = mark
        self.onCommit = onCommit
        self.onRemove = onRemove
        _draft = State(initialValue: mark.note)
        _tone = State(initialValue: mark.tone)
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    Text("“\(mark.anchor.exact)”")
                        .font(Theme.serifBody(15))
                        .foregroundStyle(Theme.ink2)
                        .italic()
                        .padding(.leading, 10)
                        .overlay(alignment: .leading) {
                            Rectangle().fill(Theme.primaryLine).frame(width: 2)
                        }

                    VStack(alignment: .leading, spacing: 6) {
                        Text(strings("Your note"))
                            .font(Theme.panelTitle(11))
                            .foregroundStyle(Theme.ink3)
                        TextEditor(text: $draft)
                            .font(Theme.ui(15))
                            .frame(minHeight: 120)
                            .scrollContentBackground(.hidden)
                            .padding(8)
                            .background(Theme.surface2)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                            .accessibilityLabel(strings("Your note"))
                    }

                    HStack(spacing: 10) {
                        ForEach(LibraryMarks.offeredTones, id: \.self) { option in
                            Button {
                                tone = option
                                onCommit(LibraryMark(
                                    id: mark.id, articleId: mark.articleId, anchor: mark.anchor,
                                    tone: option, note: draft, createdAt: mark.createdAt
                                ))
                            } label: {
                                Circle()
                                    .fill(MarkTonePalette.color(option))
                                    .frame(width: 22, height: 22)
                                    .overlay(
                                        Circle().stroke(tone == option ? Theme.ink : Theme.line, lineWidth: tone == option ? 2 : 1)
                                    )
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel(strings(MarkTonePalette.label(option)))
                            .accessibilityAddTraits(tone == option ? [.isSelected] : [])
                        }
                        Spacer()
                    }
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .navigationTitle(strings("Your note"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button(strings("Remove"), role: .destructive) {
                        onRemove()
                        dismiss()
                    }
                    .tint(Theme.danger)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button(strings("Done")) { commit(); dismiss() }.tint(Theme.primary)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func commit() {
        guard draft != mark.note || tone != mark.tone else { return }
        onCommit(LibraryMark(
            id: mark.id, articleId: mark.articleId, anchor: mark.anchor,
            tone: tone, note: draft, createdAt: mark.createdAt
        ))
    }
}
