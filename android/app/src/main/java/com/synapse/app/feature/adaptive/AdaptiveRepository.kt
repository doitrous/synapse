package com.synapse.app.feature.adaptive

import com.synapse.app.core.adaptive.AdaptiveConfig
import com.synapse.app.core.adaptive.AdaptiveEvidenceEvent
import com.synapse.app.core.adaptive.AdaptiveItem
import com.synapse.app.core.adaptive.AttemptOutcome
import com.synapse.app.core.adaptive.Blueprint
import com.synapse.app.core.adaptive.BlueprintNode
import com.synapse.app.core.adaptive.BlueprintScope
import com.synapse.app.core.adaptive.Confidence
import com.synapse.app.core.adaptive.ConceptRole
import com.synapse.app.core.adaptive.CoverageDebt
import com.synapse.app.core.adaptive.DEFAULT_ADAPTIVE_CONFIG
import com.synapse.app.core.adaptive.EMPTY_COVERAGE_DEBT
import com.synapse.app.core.adaptive.EMPTY_HELD_OUT
import com.synapse.app.core.adaptive.ExposureState
import com.synapse.app.core.adaptive.HeldOutRegistry
import com.synapse.app.core.adaptive.PresentationMode
import com.synapse.app.core.adaptive.ReadinessResult
import com.synapse.app.core.adaptive.blueprintFor
import com.synapse.app.core.adaptive.normaliseNodes
import com.synapse.app.core.auth.AccountIdentityStore
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.qbank.AttemptRecord
import com.synapse.app.core.qbank.ManagedContentItem
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.qbank.QuestionProjection
import com.synapse.app.core.qbank.dedup
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import java.time.Instant
import java.time.ZoneId
import java.time.temporal.ChronoUnit
import javax.inject.Inject

/** The shared, admin-published algorithm configuration every student is scored against. */
private const val ADAPTIVE_CONFIG_KEY = "synapse-adaptive-config-v1"

/** The shared, admin-published blueprints (weighted concept lists) students are measured against. */
private const val ADAPTIVE_BLUEPRINTS_KEY = "synapse-adaptive-blueprints-v1"

/** The shared held-out item registry readiness assessments draw from. */
private const val ADAPTIVE_HELDOUT_KEY = "synapse-adaptive-heldout-v1"

/** The shared, admin-authored ledger every student question catalogue is projected from. Duplicated from `feature.qbank` rather than imported — see [LibraryRepository]'s doc comment: decoupled features sharing a storage key, not a namespace. */
private const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

/** This student's own concept overrides (snooze / out-of-scope). */
const val ADAPTIVE_OVERRIDES_KEY = "synapse.progress.adaptive.overrides.v1"

/** This student's own rolling coverage-debt carry. Read-only here: nothing on Android produces a new value yet (that lands with the block builder — see [AdaptiveRepository]'s doc comment). */
const val ADAPTIVE_COVERAGE_DEBT_KEY = "synapse.progress.adaptive.coverageDebt.v1"

/** This student's own readiness assessment history, newest last. Read-only here: the Readiness tab that produces new results is deferred. */
const val ADAPTIVE_READINESS_RESULTS_KEY = "synapse.progress.adaptive.readiness.v1"

/** How long a snoozed concept stays out of selection before it returns on its own. Matches web's `SNOOZE_DAYS`. */
const val ADAPTIVE_SNOOZE_DAYS = 14L

/**
 * Months of QBank attempt history folded into the evidence ledger for a
 * mastery rebuild.
 *
 * ponytail: [LocalStore] only exposes attempts one calendar month at a time
 * (no "every month this student has" query), so this is a bounded lookback
 * rather than true full history. Eight months is not an arbitrary round
 * number: [DEFAULT_ADAPTIVE_CONFIG]'s mastery decay half-life is 60 days, so
 * evidence past ~4 half-lives (240 days, just under 8 months) has already
 * decayed to a small fraction of its original weight — a longer lookback
 * would mostly re-fetch records the model barely counts. Upgrade path: add a
 * `LocalStore.allAttemptMonths()`/similar once a feature needs true
 * full-history replay (e.g. a "your history" export).
 */
private const val EVIDENCE_LOOKBACK_MONTHS = 8

/** How a student has overridden one concept. Port of web's `useConceptOverrides.ts`. */
@Serializable
enum class OverrideMode {
    @SerialName("normal") NORMAL,
    @SerialName("snoozed") SNOOZED,
    @SerialName("out-of-scope") OUT_OF_SCOPE,
}

@Serializable
data class ConceptOverride(val mode: OverrideMode, val at: String, val until: String? = null)

typealias OverrideLedger = Map<String, ConceptOverride>

/** Concepts the student has taken off their blueprint entirely. */
fun outOfScopeConcepts(overrides: OverrideLedger): Set<String> =
    overrides.filterValues { it.mode == OverrideMode.OUT_OF_SCOPE }.keys

/** Concepts currently deferred. An expired snooze is simply not returned, rather than cleaned up on read. */
fun snoozedConcepts(overrides: OverrideLedger, now: Instant): Set<String> =
    overrides.filterValues { it.mode == OverrideMode.SNOOZED && (it.until == null || Instant.parse(it.until) > now) }.keys

/**
 * The Adaptive Study data layer: reads the shared algorithm config, published
 * blueprints and held-out registry ([config], [blueprints], [heldOutRegistry]),
 * projects the shared content ledger into [AdaptiveItem]s ([items]), rebuilds
 * the evidence ledger from this student's own QBank attempt history
 * ([evidenceEvents]), and reads/writes this student's own concept overrides
 * ([overrides], [setOverride]).
 *
 * **Evidence source.** Web and iOS write a dedicated
 * `synapse.progress.adaptive.evidence.*` ledger as a student answers
 * questions. Android does not maintain a second copy of that ledger: per this
 * task's brief, [evidenceEvents] instead replays the QBank attempts store
 * ([LocalStore.attempts], already written by
 * `com.synapse.app.feature.qbank.QBankRepository.recordAttempts`) into
 * [AdaptiveEvidenceEvent]s. That QBank record does not carry everything the
 * web ledger does — no confidence rating, no exposure (repeat-after-reveal)
 * tracking, no presentation mode — so those fields fall back to their safest
 * neutral value ([Confidence.UNSTATED], [ExposureState.FIRST],
 * [PresentationMode.TUTOR]) rather than a guess. Upgrade path: extend
 * `core.qbank.AttemptRecord` to capture those once the QBank session UI
 * collects them, and this projection starts producing richer evidence for
 * free.
 *
 * **Scope.** Web resolves a blueprint from `useIdentity()`'s
 * university/year plus the concept graph's own derived weights
 * ([com.synapse.app.core.adaptive] does not port `deriveBlueprint` either —
 * see `Blueprint.kt`'s doc comment: no concept graph exists on this client).
 * Android has no concept-graph port, so it still cannot *derive* weights —
 * but it does now have a student identity source
 * ([com.synapse.app.core.auth.AccountIdentityStore], shipped with Account).
 * [storedBlueprint]/[blueprintNodes] default their [BlueprintScope] to this
 * student's own university/yearId when [AccountIdentity.isKnown][com.synapse.app.core.auth.AccountIdentity.isKnown],
 * and fall back to the same unscoped `BlueprintScope("", "")` as before when
 * there is no enrolment yet — never a fabricated scope. [blueprintNodes]
 * still reads the *published* blueprint's own nodes directly rather than a
 * derived-and-overlaid set (`feature.qbank`'s own scope picker is manual,
 * topic-by-topic — see `QBankScope.kt`); that half of the gap closes once a
 * concept-graph port exists.
 */
class AdaptiveRepository @Inject constructor(
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val json: Json,
    private val accountIdentityStore: AccountIdentityStore,
) {

    /** Serializes [setOverride] so two concurrent writes can't clobber each other. */
    private val writeMutex = Mutex()

    private val overridesSerializer = MapSerializer(String.serializer(), ConceptOverride.serializer())

    /** The published algorithm configuration. Falls back to [DEFAULT_ADAPTIVE_CONFIG] if absent/unparseable — never a bespoke guess. */
    suspend fun config(): AdaptiveConfig =
        catalogueOrNull(ADAPTIVE_CONFIG_KEY, AdaptiveConfig.serializer()) ?: DEFAULT_ADAPTIVE_CONFIG

    /** Every published blueprint. Empty if absent/unparseable. */
    suspend fun blueprints(): List<Blueprint> =
        catalogueOrNull(ADAPTIVE_BLUEPRINTS_KEY, ListSerializer(Blueprint.serializer())) ?: emptyList()

    /**
     * The published blueprint governing [scope], or null when none is
     * published for it. [scope] defaults to this student's own — see
     * [defaultScope] — null rather than a default value because Kotlin
     * cannot evaluate a suspend call as a default parameter expression.
     */
    suspend fun storedBlueprint(scope: BlueprintScope? = null): Blueprint? =
        blueprintFor(blueprints(), scope ?: defaultScope())

    /** This student's blueprint nodes — see this class's doc comment on why these are read as published rather than derived-and-overlaid. */
    suspend fun blueprintNodes(scope: BlueprintScope? = null): List<BlueprintNode> =
        normaliseNodes(storedBlueprint(scope ?: defaultScope())?.nodes.orEmpty())

    /** The shared held-out item registry. Falls back to [EMPTY_HELD_OUT] (nothing reserved) if absent/unparseable. */
    suspend fun heldOutRegistry(): HeldOutRegistry =
        catalogueOrNull(ADAPTIVE_HELDOUT_KEY, HeldOutRegistry.serializer()) ?: EMPTY_HELD_OUT

    /** Every approved, markable question the student's QBank can serve, projected into the adaptive engine's shape. */
    suspend fun items(): List<AdaptiveItem> = AdaptiveItemProjection.project(ledgerJsonOrEmpty())

    /**
     * This student's evidence ledger, rebuilt from their QBank attempt
     * history over the last [EVIDENCE_LOOKBACK_MONTHS] months. See this
     * class's doc comment for why QBank attempts are the source and what
     * that costs in evidence fidelity.
     */
    suspend fun evidenceEvents(now: Instant): List<AdaptiveEvidenceEvent> {
        val itemsById = items().associateBy { it.id }
        val configVersion = config().version
        val records = lookbackMonths(now).flatMap { localStore.attempts(it) }
            .mapNotNull { stored ->
                runCatching { json.decodeFromJsonElement(AttemptRecord.serializer(), stored.payload) }.getOrNull()
            }
            .filter { it.surface == "qbank" }
        return dedup(records).flatMap { toEvidenceEvents(it, itemsById, configVersion) }
    }

    /** This student's rolling coverage-debt carry. Falls back to [EMPTY_COVERAGE_DEBT] if absent/unparseable. */
    suspend fun coverageDebt(): CoverageDebt =
        userStateOrNull(ADAPTIVE_COVERAGE_DEBT_KEY, CoverageDebt.serializer()) ?: EMPTY_COVERAGE_DEBT

    /** This student's most recent readiness assessment, or null when none has been taken. */
    suspend fun latestReadiness(): ReadinessResult? =
        userStateOrNull(ADAPTIVE_READINESS_RESULTS_KEY, ListSerializer(ReadinessResult.serializer()))
            ?.maxByOrNull { it.at }

    /** This student's own concept overrides. Empty if none set. */
    suspend fun overrides(): OverrideLedger =
        userStateOrNull(ADAPTIVE_OVERRIDES_KEY, overridesSerializer) ?: emptyMap()

    /**
     * Set (or clear, via [OverrideMode.NORMAL]) one concept's override.
     *
     * Never touches evidence: an override only changes what future selection
     * may offer, so restoring [OverrideMode.NORMAL] returns the concept to
     * exactly the state it would have had if it were never overridden.
     */
    suspend fun setOverride(conceptId: String, mode: OverrideMode, now: Instant) {
        writeMutex.withLock {
            val current = overrides()
            val next = if (mode == OverrideMode.NORMAL) {
                current - conceptId
            } else {
                val until = if (mode == OverrideMode.SNOOZED) now.plus(ADAPTIVE_SNOOZE_DAYS, ChronoUnit.DAYS).toString() else null
                current + (conceptId to ConceptOverride(mode = mode, at = now.toString(), until = until))
            }
            syncEngine.write(ADAPTIVE_OVERRIDES_KEY, json.encodeToString(overridesSerializer, next), now)
        }
    }

    /** This student's own [BlueprintScope] from [AccountIdentityStore]; the same unscoped `BlueprintScope("", "")` as before when no enrolment is known yet — never a fabricated guess. */
    private suspend fun defaultScope(): BlueprintScope {
        val identity = accountIdentityStore.current()
        return if (identity.isKnown) BlueprintScope(identity.universityId, identity.yearId) else BlueprintScope("", "")
    }

    /** The content ledger's raw `value` JSON, stringified for [AdaptiveItemProjection]. */
    private suspend fun ledgerJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(CONTENT_LEDGER_KEY) ?: return "[]"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("[]")
    }

    /** A shared/admin catalogue key, decoded from its stored `StateDoc.value`. Null if absent or unparseable — callers supply the honest fallback. */
    private suspend fun <T> catalogueOrNull(key: String, serializer: KSerializer<T>): T? {
        val stored = localStore.getCatalogue(key) ?: return null
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            json.decodeFromJsonElement(serializer, doc.value)
        }.getOrNull()
    }

    /** A per-user document, decoded directly (no `StateDoc` wrapper — [LocalStore.getUserState] stores the raw value). Null if absent or unparseable. */
    private suspend fun <T> userStateOrNull(key: String, serializer: KSerializer<T>): T? {
        val stored = localStore.getUserState(key) ?: return null
        return runCatching { json.decodeFromString(serializer, stored) }.getOrNull()
    }

    /** The last [EVIDENCE_LOOKBACK_MONTHS] calendar months (`YYYY-MM`, in the system default zone), most recent first. */
    private fun lookbackMonths(now: Instant): List<String> {
        val zoned = now.atZone(ZoneId.systemDefault())
        return (0 until EVIDENCE_LOOKBACK_MONTHS).map { offset ->
            val month = zoned.minusMonths(offset.toLong())
            "%04d-%02d".format(month.year, month.monthValue)
        }
    }

    /**
     * One QBank attempt fans out into one [AdaptiveEvidenceEvent] per
     * concept the matching [AdaptiveItem] assesses — main and secondary
     * alike — which is the mechanism the whole mastery model relies on
     * (three wrong answers on one concept are three events sharing a
     * `conceptId`, not three concepts). When the item can no longer be
     * found (deleted or unpublished since the attempt), [AttemptRecord.conceptIds]
     * is used as a safe fallback, all treated as [ConceptRole.MAIN] since the
     * role split is no longer knowable.
     */
    private fun toEvidenceEvents(record: AttemptRecord, itemsById: Map<String, AdaptiveItem>, configVersion: Int): List<AdaptiveEvidenceEvent> {
        val item = itemsById[record.itemId]
        val mainIds = item?.mainConceptIds ?: record.conceptIds
        val secondaryIds = item?.secondaryConceptIds.orEmpty()
        val outcome = if (record.correct != null) AttemptOutcome.ANSWERED else AttemptOutcome.BLANK

        fun event(conceptId: String, role: ConceptRole) = AdaptiveEvidenceEvent(
            id = "${record.id}:$conceptId",
            at = record.at,
            attemptId = record.id,
            blockId = record.sessionId,
            questionId = record.itemId,
            questionVersion = item?.version ?: "unknown",
            conceptId = conceptId,
            role = role,
            correct = record.correct,
            outcome = outcome,
            confidence = Confidence.UNSTATED,
            seconds = record.seconds?.toDouble(),
            expectedSeconds = item?.estimatedSeconds,
            mode = PresentationMode.TUTOR,
            exposure = ExposureState.FIRST,
            difficulty = record.difficulty,
            configVersion = configVersion,
        )

        return mainIds.map { event(it, ConceptRole.MAIN) } + secondaryIds.map { event(it, ConceptRole.SECONDARY) }
    }
}

/**
 * Projects the shared content ledger into [AdaptiveItem]s.
 *
 * Markability (Published, has options, `correctAnswer` resolves to one of
 * them) is delegated entirely to [QuestionProjection] rather than
 * re-implemented here, so the adaptive engine can never disagree with QBank
 * about which questions a student can actually be asked. What
 * [QuestionProjection]'s flattened [Question.conceptIds] loses — the
 * main/secondary concept split the mastery model needs for relevance
 * weighting ([com.synapse.app.core.adaptive.roleRelevance]) — is recovered
 * by reading `questionData.tags` off the same raw ledger a second time.
 */
private object AdaptiveItemProjection {
    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<AdaptiveItem> {
        val validQuestions = QuestionProjection.project(ledgerJson).associateBy { it.id }
        if (validQuestions.isEmpty()) return emptyList()

        return decodeItems(ledgerJson)
            .filter { it.id in validQuestions }
            .map { item -> projectOne(item, validQuestions.getValue(item.id)) }
    }

    private fun decodeItems(ledgerJson: String): List<ManagedContentItem> {
        val array = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> element
            is JsonObject -> element["items"] as? JsonArray
            else -> null
        } ?: return emptyList()
        return array.mapNotNull { runCatching { json.decodeFromJsonElement(ManagedContentItem.serializer(), it) }.getOrNull() }
    }

    private fun projectOne(item: ManagedContentItem, question: Question): AdaptiveItem {
        val tags = item.questionData?.tags
        val explicitMain = tags?.mainConceptIds
        val all = (tags?.conceptIds ?: emptyList()).ifEmpty { question.conceptIds }
        val mainIds = (explicitMain ?: all).distinct()
        val secondaryIds = if (explicitMain != null) all.filterNot { it in explicitMain.toSet() }.distinct() else emptyList()

        return AdaptiveItem(
            id = question.id,
            version = contentFingerprint(item),
            subjectId = question.subjectId,
            topic = question.topic,
            difficulty = question.difficulty,
            mainConceptIds = mainIds,
            secondaryConceptIds = secondaryIds,
            conceptIds = (mainIds + secondaryIds).distinct(),
            universityIds = question.universityIds,
            years = question.years,
            estimatedSeconds = question.estimatedSeconds?.toDouble(),
        )
    }

    /** A stable fingerprint of the answerable content, so a later edit is visible as a different [AdaptiveItem.version]. Not a security hash — just enough to notice drift. */
    private fun contentFingerprint(item: ManagedContentItem): String {
        val data = item.questionData
        val basis = buildString {
            append(item.title); append('|'); append(data?.correctAnswer)
            data?.answers?.forEach { append('|'); append(it.label); append('|'); append(it.text) }
        }
        return basis.hashCode().toUInt().toString(16)
    }
}
