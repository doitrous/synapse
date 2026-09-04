package com.synapse.android.core.reader

import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.LedgerItem
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull

/**
 * The Reader's article model, projection and evidence gate.
 *
 * A port of iOS `Core/Model/Article.swift` + `Core/Model/ArticleProjection.swift`
 * (themselves ports of `src/data/articleProjection.ts` + `calloutPolicy.ts`).
 * This renders the *article* half of the library Reader -- authored prose, not
 * PDF. The resource (PDF + ink-annotation) reader is a separate, heavier port
 * that needs a native PDF engine; see the milestone report.
 *
 * The rules in [ArticleReaderProjection] are not presentation choices: they are
 * the **evidence gate** that decides whether unverified medical writing reaches
 * a student. An article carrying a `publishedSections` projection has been
 * through review, and from then on its draft prose is not student-readable --
 * only reviewed narrative, statements whose evidence resolves in the published
 * store, and lines a human signed off. Keep this in step with the web/iOS
 * ports; do not "simplify" the gate.
 */

/** One piece of a rendered article. Mirrors iOS `ArticleBlock` / web `LibBlock`. */
sealed interface ArticleBlock {
    data class Heading(val text: String) : ArticleBlock
    data class Paragraph(val text: String) : ArticleBlock
    data class Callout(val title: String, val text: String) : ArticleBlock

    /** A verified statement carrying its evidence chain, by span id. */
    data class Fact(val text: String, val spanId: String?) : ArticleBlock

    /** The header that introduces the sources at the end of the article. */
    data class SourcesHeader(val count: Int) : ArticleBlock
}

/** A link to another article the student can actually open. */
data class RelatedArticle(val id: String, val title: String, val reason: String?)

/** An article as a student reads it. */
data class Article(
    val id: String,
    val title: String,
    val subjectId: String,
    val chapter: String,
    val readingMinutes: Int,
    val summary: String,
    val blocks: List<ArticleBlock>,
    /** "Hold these" -- reviewed teaching points. */
    val keyPoints: List<String>,
    /** "Where people lose the mark". */
    val traps: List<String>,
    val relatedArticles: List<RelatedArticle>,
    val taxonomyNodeIds: List<String>,
)

/** One evidence span the gate resolves against. */
data class ArticleSpan(
    val id: String,
    val articleId: String,
    val sectionId: String,
    val text: String?,
)

/**
 * The published-evidence catalogue (`synapse-medical-evidence-published-v1`)
 * reduced to what the gate consults: which claims and citations exist, and the
 * article spans (by id and by `articleId|sectionId`). A port of the
 * claims/citations/articleSpans branches of iOS `EvidenceStore.decode`.
 *
 * The resource-openability half of the same document lives in
 * `core/library/EvidenceIndex`; the two decode disjoint parts, so neither
 * needs the other.
 */
class ReaderEvidence(
    private val claimIds: Set<String>,
    private val citationIds: Set<String>,
    private val spansById: Map<String, ArticleSpan>,
    private val spansBySection: Map<String, List<ArticleSpan>>,
) {
    fun span(id: String): ArticleSpan? = spansById[id]
    fun spansInSection(articleId: String, sectionId: String): List<ArticleSpan> =
        spansBySection["$articleId|$sectionId"].orEmpty()

    fun hasClaim(id: String): Boolean = id in claimIds
    fun hasCitation(id: String): Boolean = id in citationIds

    companion object {
        val EMPTY = ReaderEvidence(emptySet(), emptySet(), emptyMap(), emptyMap())

        fun decode(json: String?): ReaderEvidence {
            if (json.isNullOrBlank()) return EMPTY
            val root = runCatching { Json.parseToJsonElement(json) }.getOrNull() as? JsonObject ?: return EMPTY

            val claimIds = (root["claims"] as? JsonArray).orEmptyArray()
                .mapNotNull { (it as? JsonObject)?.get("id").str() }.toSet()
            val citationIds = (root["citations"] as? JsonArray).orEmptyArray()
                .mapNotNull { (it as? JsonObject)?.get("id").str() }.toSet()

            val spansById = LinkedHashMap<String, ArticleSpan>()
            val spansBySection = LinkedHashMap<String, MutableList<ArticleSpan>>()
            for (element in (root["articleSpans"] as? JsonArray).orEmptyArray()) {
                val obj = element as? JsonObject ?: continue
                val id = obj["id"].str() ?: continue
                val articleId = obj["articleId"].str() ?: continue
                val sectionId = obj["sectionId"].str() ?: continue
                val span = ArticleSpan(id, articleId, sectionId, obj["text"].str())
                spansById[id] = span
                spansBySection.getOrPut("$articleId|$sectionId") { mutableListOf() }.add(span)
            }
            return ReaderEvidence(claimIds, citationIds, spansById, spansBySection)
        }
    }
}

/**
 * Turns a ledger `article` row into what a student may read, applying the
 * evidence gate. `null` when the record is not an article or will not parse --
 * a malformed record contributes nothing rather than crashing the Reader.
 */
object ArticleReaderProjection {

    private const val DEFAULT_READING_MINUTES = 6
    private const val DEFAULT_CHAPTER = "New articles"

    /**
     * @param readableTitles id -> title for every article a student may open,
     *   so a "read next" link survives only when it leads somewhere.
     */
    fun project(item: LedgerItem, evidence: ReaderEvidence, readableTitles: Map<String, String>): Article? {
        if (item.kind != ContentKind.ARTICLE) return null
        val record = runCatching { Json.parseToJsonElement(item.raw) }.getOrNull() as? JsonObject ?: return null

        val data = record["articleData"] as? JsonObject
        val fields = record["fields"] as? JsonObject
        val gated = data?.get("publishedSections") != null

        val blocks = mutableListOf<ArticleBlock>()
        // Facts are gathered as we go and listed once at the end, under Sources,
        // so the article reads as prose rather than a column of sourced lines.
        val sourceBlocks = mutableListOf<ArticleBlock>()

        for (section in sections(data)) {
            section.heading?.trim()?.takeIf { it.isNotEmpty() }?.let { blocks.add(ArticleBlock.Heading(it)) }

            val spans = sectionSpans(item.id, section, evidence)
            val facts = spans.mapNotNull { span ->
                span.text?.trim()?.takeIf { it.isNotEmpty() }?.let { ArticleBlock.Fact(it, span.id) }
            }

            val narrative = section.narrative?.trim().orEmpty()
            val body = section.body?.trim().orEmpty()
            when {
                narrative.isNotEmpty() -> {
                    // Reviewed prose: read the article, then check its sources.
                    blocks.addAll(paragraphs(narrative))
                    sourceBlocks.addAll(facts)
                }
                facts.isNotEmpty() -> {
                    // No prose written yet -- keep the verified facts inline
                    // rather than dropping content a student can already read.
                    blocks.addAll(facts)
                }
                // Never fall back to draft prose when a section names evidence
                // spans that are absent from the published store: the author
                // asserted those statements need evidence, and it did not resolve.
                section.spanIds.isEmpty() && body.isNotEmpty() -> blocks.addAll(paragraphs(body))
            }
        }

        // University notes are authored asides, not reviewed content, so a gated
        // article drops them.
        if (!gated) {
            for (note in (data?.get("universityNotes") as? JsonArray).orEmptyArray()) {
                val obj = note as? JsonObject ?: continue
                val text = obj["text"].str()?.trim()?.takeIf { it.isNotEmpty() } ?: continue
                val university = obj["universityId"].str().orEmpty()
                blocks.add(ArticleBlock.Callout("$university only", text))
            }
        }

        if (sourceBlocks.isNotEmpty()) {
            blocks.add(ArticleBlock.SourcesHeader(sourceBlocks.size))
            blocks.addAll(sourceBlocks)
        }

        val traps = publishableCallouts(CalloutKind.TRAP, data, evidence)
        val authoredKeyPoints = publishableCallouts(CalloutKind.HOLD, data, evidence)

        // `blocks` already holds the source facts, so a gated article with no
        // authored key points still shows something: the first few verified facts.
        val factKeyPoints = blocks.filterIsInstance<ArticleBlock.Fact>().map { it.text }.take(5)

        return Article(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            chapter = fields?.get("Topic").str()?.trim()?.takeIf { it.isNotEmpty() } ?: DEFAULT_CHAPTER,
            readingMinutes = fields?.get("Reading time").str()?.trim()?.toIntOrNull() ?: DEFAULT_READING_MINUTES,
            summary = data?.get("publishedSummary").str()?.takeIf { it.isNotEmpty() }
                ?: data?.get("summary").str()?.takeIf { it.isNotEmpty() }
                ?: fields?.get("Summary").str().orEmpty(),
            blocks = blocks,
            keyPoints = authoredKeyPoints.ifEmpty { factKeyPoints },
            traps = traps,
            relatedArticles = relatedArticles(
                ids = (data?.get("relatedArticleIds") as? JsonArray)?.mapNotNull { it.str() },
                readableTitles = readableTitles,
                selfId = item.id,
                reasons = data?.get("fieldNotes") as? JsonObject,
            ),
            taxonomyNodeIds = listOfNotNull(data?.get("primaryNodeId").str()) +
                (data?.get("secondaryNodeIds") as? JsonArray)?.mapNotNull { it.str() }.orEmpty(),
        )
    }

    // -- Sections ----------------------------------------------------------

    private data class Section(
        val id: String?,
        val heading: String?,
        val body: String?,
        val narrative: String?,
        val spanIds: List<String>,
    )

    /**
     * The sections a student may read, in order. `publishedSections` wins when
     * present -- that *is* the student projection. The generated "components"
     * listing is a machine dump of concepts, never reading material.
     */
    private fun sections(data: JsonObject?): List<Section> {
        val raw = (data?.get("publishedSections") as? JsonArray)
            ?: (data?.get("sections") as? JsonArray)
            ?: return emptyList()

        return raw.mapNotNull { entry ->
            val obj = entry as? JsonObject ?: return@mapNotNull null
            if (obj["kind"].str() == "components") return@mapNotNull null

            val heading = obj["heading"].str()?.trim()
            val body = obj["body"].str()?.trim()
            val narrative = obj["narrative"].str()?.trim()

            // A section with nothing in it renders as a stray heading.
            if (listOf(heading, body, narrative).all { it.isNullOrEmpty() }) return@mapNotNull null
            // A placeholder the pipeline writes where evidence is still missing.
            if (body != null && EVIDENCE_MISSING.containsMatchIn(body)) return@mapNotNull null

            Section(
                id = obj["id"].str(),
                heading = heading,
                body = body,
                narrative = narrative,
                spanIds = (obj["spanIds"] as? JsonArray)?.mapNotNull { it.str() }.orEmpty(),
            )
        }
    }

    private val EVIDENCE_MISSING = Regex("^Evidence not yet available", RegexOption.IGNORE_CASE)

    /**
     * Evidence spans belonging to a section: those it names, then those the
     * store records against it (dropping duplicates).
     */
    private fun sectionSpans(articleId: String, section: Section, evidence: ReaderEvidence): List<ArticleSpan> {
        val named = section.spanIds.mapNotNull { evidence.span(it) }
        val seen = named.map { it.id }.toHashSet()
        val sectionId = section.id ?: return named
        val derived = evidence.spansInSection(articleId, sectionId).filter { it.id !in seen }
        return named + derived
    }

    // -- The callout gate --------------------------------------------------

    private enum class CalloutKind(val field: String) {
        HOLD("holdThese"),
        TRAP("loseTheMark"),
    }

    /**
     * Which "Hold these" / "Where people lose the mark" lines a student sees.
     * A port of `publishableCallouts`. Nothing here invents anything -- a line
     * either publishes or is absent.
     */
    private fun publishableCallouts(kind: CalloutKind, data: JsonObject?, evidence: ReaderEvidence): List<String> {
        val lines = (data?.get(kind.field) as? JsonArray).orEmptyArray()
            .mapNotNull { it.str()?.trim() }
            .filter { it.isNotEmpty() }
        if (lines.isEmpty()) return emptyList()

        // An article with no student projection was never gated. Its callouts
        // are the older authoring path and publish as they always did.
        if (data?.get("publishedSections") == null) return lines

        val calloutEvidence = data["calloutEvidence"] as? JsonObject
        val articleReviewed = data["lastReviewed"].str()?.trim()?.takeIf { it.isNotEmpty() }

        return lines.filter { line ->
            val entry = calloutEvidence?.get(line) as? JsonObject
            when {
                resolves(entry, evidence) -> true
                // A named human stands behind this specific line.
                !entry?.get("reviewedBy").str()?.trim().isNullOrEmpty() -> true
                // Or the article as a whole was reviewed on a date.
                articleReviewed != null -> true
                else -> false
            }
        }
    }

    /**
     * Whether a callout's named evidence actually exists in the published store.
     * One span is enough, but *every* named claim or citation must resolve: a
     * partially-resolving chain is unsupported, not weakly supported.
     */
    private fun resolves(entry: JsonObject?, evidence: ReaderEvidence): Boolean {
        if (entry == null) return false

        entry["spanId"].str()?.let { if (evidence.span(it) != null) return true }

        val claims = (entry["claimIds"] as? JsonArray)?.mapNotNull { it.str() }.orEmpty()
        if (claims.isNotEmpty() && claims.all { evidence.hasClaim(it) }) return true

        val citations = (entry["citationIds"] as? JsonArray)?.mapNotNull { it.str() }.orEmpty()
        if (citations.isNotEmpty() && citations.all { evidence.hasCitation(it) }) return true

        return false
    }

    // -- Related reading ---------------------------------------------------

    /** Where an article records why it links to another, keyed by the other's id. */
    private fun relatedReasonKey(targetId: String) = "relatedArticle:$targetId"

    private fun relatedArticles(
        ids: List<String>?,
        readableTitles: Map<String, String>,
        selfId: String,
        reasons: JsonObject?,
    ): List<RelatedArticle> {
        val seen = HashSet<String>()
        val links = mutableListOf<RelatedArticle>()
        for (id in ids.orEmpty()) {
            val key = id.trim()
            if (key.isEmpty() || key == selfId || !seen.add(key)) continue
            val title = readableTitles[key] ?: continue
            links.add(
                RelatedArticle(
                    id = key,
                    title = title,
                    reason = reasons?.get(relatedReasonKey(key)).str()?.trim()?.takeIf { it.isNotEmpty() },
                ),
            )
        }
        return links
    }

    // -- Prose -------------------------------------------------------------

    /**
     * Split a body into paragraphs, blank-line separated, joining the lines
     * within a paragraph with a newline -- a port of iOS `paragraphs` /
     * `bodyToBlocks`.
     */
    internal fun paragraphs(body: String): List<ArticleBlock> {
        val paragraphs = mutableListOf<String>()
        for (line in Prose.normalize(body).split(NEWLINE)) {
            when {
                line.trim().isEmpty() -> {
                    if (paragraphs.lastOrNull()?.isEmpty() == false) paragraphs.add("")
                }
                paragraphs.isEmpty() || paragraphs.last().isEmpty() -> {
                    if (paragraphs.lastOrNull()?.isEmpty() == true) paragraphs.removeAt(paragraphs.size - 1)
                    paragraphs.add(line)
                }
                else -> paragraphs[paragraphs.size - 1] = paragraphs.last() + "\n" + line
            }
        }
        return paragraphs.map { it.trim() }.filter { it.isNotEmpty() }.map { ArticleBlock.Paragraph(it) }
    }

    private val NEWLINE = Regex("\\R")
}

/**
 * Typographic normalisation for authored prose, a lean port of iOS
 * `Prose.normalize` / `src/lib/prose.ts`. Only entity decoding is carried over:
 * it prevents a literal `&amp;` reaching the page.
 *
 * ponytail: the curly-quote and dash heuristics are cosmetic (they change
 * punctuation, not words) and are dropped for now; add them if straight/curly
 * quote mixing shows up in real articles.
 */
internal object Prose {
    fun normalize(text: String): String = if (text.isEmpty()) text else decodeEntities(text)

    private val entities = mapOf(
        "amp" to "&", "quot" to "\"", "apos" to "'", "lt" to "<", "gt" to ">",
        "nbsp" to " ",
        "ldquo" to "“", "rdquo" to "”", "lsquo" to "‘", "rsquo" to "’",
        "mdash" to "—", "ndash" to "–", "hellip" to "…",
        "deg" to "°", "micro" to "µ", "times" to "×",
    )

    private val entityPattern = Regex("&(#x?[0-9a-fA-F]+|[a-zA-Z]+);")

    /** Undo a single round of HTML escaping. Unknown entities are left verbatim. */
    fun decodeEntities(text: String): String {
        if (!text.contains('&')) return text
        return entityPattern.replace(text) { match ->
            val body = match.groupValues[1]
            if (body.startsWith("#")) {
                val isHex = body.length > 1 && (body[1] == 'x' || body[1] == 'X')
                val digits = body.drop(if (isHex) 2 else 1)
                val code = digits.toIntOrNull(if (isHex) 16 else 10)
                if (code != null && code in 1..0x10FFFF) {
                    runCatching { String(Character.toChars(code)) }.getOrDefault(match.value)
                } else {
                    match.value
                }
            } else {
                entities[body.lowercase()] ?: match.value
            }
        }
    }
}

private fun JsonElement?.str(): String? = (this as? JsonPrimitive)?.contentOrNull
private fun JsonArray?.orEmptyArray(): List<JsonElement> = this ?: emptyList()
