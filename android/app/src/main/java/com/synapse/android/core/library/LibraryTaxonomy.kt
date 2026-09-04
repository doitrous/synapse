package com.synapse.android.core.library

import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.LedgerItem
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull

/**
 * How a student chooses to come at the library, and the branch of the medical
 * taxonomy each choice browses.
 *
 * Four of the five the website and iOS offer, with their labels and blurbs.
 * The fifth, "My Curriculum", filters by the student's cohort rather than a
 * taxonomy division; the audience/cohort is not modelled on Android yet, so it
 * is left out of this first pass (TODO: add once StudentAudience is ported).
 */
enum class LibraryDivision(val division: String, val label: String, val detail: String) {
    SYSTEM(
        "system",
        "Systems & General",
        "Organ systems, foundations, life stages, infection, emergencies, and population health.",
    ),
    DISCIPLINE(
        "discipline",
        "By Discipline",
        "Basic sciences, clinical specialties, and the subjects used in university teaching.",
    ),
    SKILLS(
        "skills",
        "Clinical Skills",
        "History, examination, interpretation, procedures, prescribing, communication, and reasoning.",
    ),
    KNOWLEDGE(
        "knowledge",
        "Clinical Knowledge",
        "Presentations, diagnosis, management, therapeutics, emergencies, prevention, and evidence.",
    ),
}

/** One branch of the medical library taxonomy. */
data class TaxonomyNode(
    val id: String,
    val parentId: String?,
    val division: String,
    val title: String,
    val depth: Int,
)

/**
 * A library article as a browsing list and a metadata card need it -- title,
 * where it sits, and its short summary. Deliberately NOT the article's body
 * blocks: rendering those is the Reader's job, a separate later port.
 */
data class ArticleCard(
    val id: String,
    val title: String,
    val subjectId: String,
    val chapter: String,
    val summary: String,
    val readingMinutes: Int,
    /** The taxonomy nodes this article is placed on (primary + secondary). */
    val nodeIds: List<String>,
)

/**
 * Projects a ledger `article` row into an [ArticleCard].
 *
 * A lean port of the metadata half of iOS `ArticleProjection.project`: it
 * reads only what the browse list and the detail card show, and the placement
 * (`primaryNodeId` + `secondaryNodeIds`) that hangs the article on the tree.
 */
object ArticleProjection {
    private const val DEFAULT_READING_MINUTES = 6
    private const val DEFAULT_CHAPTER = "New articles"

    fun projectCard(item: LedgerItem): ArticleCard? {
        if (item.kind != ContentKind.ARTICLE) return null
        val record = runCatching { Json.parseToJsonElement(item.raw) }.getOrNull() as? JsonObject ?: return null
        val data = record["articleData"] as? JsonObject
        val fields = record["fields"] as? JsonObject

        val primary = data?.get("primaryNodeId")?.str()?.takeIf { it.isNotEmpty() }
        val secondary = (data?.get("secondaryNodeIds") as? JsonArray)?.mapNotNull { it.str() }.orEmpty()

        return ArticleCard(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            chapter = fields?.get("Topic")?.str()?.trim()?.takeIf { it.isNotEmpty() } ?: DEFAULT_CHAPTER,
            summary = data?.get("publishedSummary")?.str()?.takeIf { it.isNotEmpty() }
                ?: data?.get("summary")?.str()?.takeIf { it.isNotEmpty() }
                ?: fields?.get("Summary")?.str().orEmpty(),
            readingMinutes = fields?.get("Reading time")?.str()?.trim()?.toIntOrNull() ?: DEFAULT_READING_MINUTES,
            nodeIds = listOfNotNull(primary) + secondary,
        )
    }
}

/**
 * The medical taxonomy, indexed for browsing, with the articles hung off the
 * branches they were placed on.
 *
 * A flat list of ~1,900 nodes arrives from `synapse-medical-library-taxonomy-v1`;
 * this turns it into something a screen can walk. A port of iOS
 * `Core/Library/LibraryAtlas.swift` -- the subtree counts are precomputed once
 * (not walked per row) and the walk is iterative, because the taxonomy is
 * authored data and a cycle in it must not turn into a stack overflow on open.
 */
class LibraryAtlas private constructor(
    private val nodesById: Map<String, TaxonomyNode>,
    private val childrenOf: Map<String, List<TaxonomyNode>>,
    private val rootsByDivision: Map<String, List<TaxonomyNode>>,
    private val articlesOn: Map<String, List<String>>,
    private val subtreeCount: Map<String, Int>,
) {
    fun node(id: String): TaxonomyNode? = nodesById[id]

    fun roots(division: String): List<TaxonomyNode> = rootsByDivision[division].orEmpty()

    fun children(nodeId: String): List<TaxonomyNode> = childrenOf[nodeId].orEmpty()

    /** Article ids pinned directly on a node (not its descendants). */
    fun articlesOn(nodeId: String): List<String> = articlesOn[nodeId].orEmpty()

    /** How many distinct articles sit at or beneath a node -- a lookup, not a walk. */
    fun articleCount(nodeId: String): Int = subtreeCount[nodeId] ?: 0

    fun hasArticles(nodeId: String): Boolean = articleCount(nodeId) > 0

    /** Distinct articles reachable anywhere in a division (counted as a set, so a doubly-placed article is not double-counted). */
    fun divisionCount(division: String): Int {
        val seen = HashSet<String>()
        for (root in roots(division)) seen += articleIdsUnder(root.id)
        return seen.size
    }

    /**
     * Every article at or beneath a node, gathered from the whole subtree --
     * tapping "Cardiovascular system" means everything under it, not only what
     * happens to be pinned to that exact node.
     */
    fun articleIdsUnder(nodeId: String): List<String> {
        val found = LinkedHashSet<String>()
        val seen = HashSet<String>()
        val stack = ArrayDeque<String>()
        stack.addLast(nodeId)
        while (stack.isNotEmpty()) {
            val current = stack.removeLast()
            if (!seen.add(current)) continue
            found += articlesOn(current)
            children(current).forEach { stack.addLast(it.id) }
        }
        return found.toList()
    }

    companion object {
        val EMPTY = LibraryAtlas(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap())

        /**
         * @param taxonomyJson the raw `synapse-medical-library-taxonomy-v1`
         * document (a JSON array of nodes), or null when nothing has synced.
         */
        fun build(taxonomyJson: String?, articles: List<ArticleCard>): LibraryAtlas {
            if (taxonomyJson.isNullOrBlank()) return EMPTY
            val array = runCatching { Json.parseToJsonElement(taxonomyJson) }.getOrNull() as? JsonArray ?: return EMPTY

            val nodesById = LinkedHashMap<String, TaxonomyNode>()
            for (element in array) {
                val raw = element as? JsonObject ?: continue
                val id = raw["id"].str() ?: continue
                val division = raw["division"].str() ?: continue
                val title = raw["title"].str() ?: continue
                nodesById[id] = TaxonomyNode(
                    id = id,
                    parentId = raw["parentId"].str(),
                    division = division,
                    title = title,
                    depth = (raw["depth"] as? JsonPrimitive)?.intOrNull ?: 0,
                )
            }
            if (nodesById.isEmpty()) return EMPTY

            val childrenOf = HashMap<String, MutableList<TaxonomyNode>>()
            val rootsByDivision = HashMap<String, MutableList<TaxonomyNode>>()
            // Ordered by title so a branch reads the same way twice.
            for (node in nodesById.values.sortedBy { it.title.lowercase() }) {
                val parent = node.parentId
                if (parent != null && nodesById.containsKey(parent)) {
                    childrenOf.getOrPut(parent) { mutableListOf() }.add(node)
                } else {
                    rootsByDivision.getOrPut(node.division) { mutableListOf() }.add(node)
                }
            }

            val articlesOn = HashMap<String, MutableList<String>>()
            for (article in articles) {
                for (nodeId in article.nodeIds) {
                    if (nodesById.containsKey(nodeId)) {
                        articlesOn.getOrPut(nodeId) { mutableListOf() }.add(article.id)
                    }
                }
            }

            val subtreeCount = computeSubtreeCounts(childrenOf, rootsByDivision, articlesOn)
            return LibraryAtlas(nodesById, childrenOf, rootsByDivision, articlesOn, subtreeCount)
        }

        /**
         * One iterative post-order pass, deepest first, so each node unions its
         * children's article sets into its own. Iterative, not recursive: a
         * cycle in authored taxonomy would overflow a recursive walk.
         */
        private fun computeSubtreeCounts(
            childrenOf: Map<String, List<TaxonomyNode>>,
            rootsByDivision: Map<String, List<TaxonomyNode>>,
            articlesOn: Map<String, List<String>>,
        ): Map<String, Int> {
            val articleSets = HashMap<String, Set<String>>()
            val counts = HashMap<String, Int>()

            for (root in rootsByDivision.values.flatten()) {
                val stack = ArrayDeque<Pair<String, Boolean>>()
                stack.addLast(root.id to false)
                val guardSeen = HashSet<String>()

                while (stack.isNotEmpty()) {
                    val (id, expanded) = stack.removeLast()
                    if (expanded) {
                        val set = HashSet(articlesOn[id].orEmpty())
                        for (child in childrenOf[id].orEmpty()) {
                            set += articleSets[child.id].orEmpty()
                        }
                        articleSets[id] = set
                        counts[id] = set.size
                    } else {
                        if (!guardSeen.add(id)) continue
                        stack.addLast(id to true)
                        childrenOf[id].orEmpty().forEach { stack.addLast(it.id to false) }
                    }
                }
            }
            return counts
        }
    }
}

private fun JsonElement?.str(): String? = (this as? JsonPrimitive)?.contentOrNull
