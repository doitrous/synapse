import SwiftUI

/// Reading an article.
///
/// The measure is the point. Medical students read these for hours, so the
/// column is kept narrow, the body is serif, and nothing competes with the
/// prose. Everything that is not the article — key points, traps, sources,
/// related reading — sits after it rather than beside it.
struct ArticleReaderView: View {
    let article: Article

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
                    .font(.system(size: 17))
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
                .font(.system(size: 17, design: .serif))
                .foregroundStyle(Theme.ink)
                .lineSpacing(6)
                .textSelection(.enabled)

        case .callout(let title, let text):
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(Theme.panelTitle(12))
                    .foregroundStyle(Theme.accentStrong)
                Text(text)
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.ink)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(14)
            .background(Theme.accentTint)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.accentLine, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))

        case .fact(let text, _):
            // A verified statement. Marked so a student can see at a glance
            // which sentences carry evidence behind them.
            HStack(alignment: .top, spacing: 10) {
                Rectangle()
                    .fill(Theme.accentLine)
                    .frame(width: 2)
                Text(text)
                    .font(.system(size: 16, design: .serif))
                    .foregroundStyle(Theme.ink)
                    .lineSpacing(5)
                    .textSelection(.enabled)
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
                .foregroundStyle(tone == .accent ? Theme.accentStrong : Theme.warning)

            ForEach(items, id: \.self) { item in
                HStack(alignment: .top, spacing: 8) {
                    Text("·").foregroundStyle(Theme.ink3)
                    Text(item)
                        .font(.system(size: 15))
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
                VStack(alignment: .leading, spacing: 2) {
                    Text(related.title)
                        .font(.system(size: 15, weight: .medium))
                        .foregroundStyle(Theme.accent)
                    if let reason = related.reason {
                        Text(reason)
                            .font(.system(size: 13))
                            .foregroundStyle(Theme.ink3)
                    }
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.top, 8)
    }
}
