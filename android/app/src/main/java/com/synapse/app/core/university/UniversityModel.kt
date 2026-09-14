package com.synapse.app.core.university

import kotlinx.serialization.Serializable
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId

/**
 * A 1:1 port of `src/pages/student/universityModel.ts`'s **live** path —
 * [StudentUniversityProjection] (the wire shape `GET /api/me/university`
 * returns) and [normalizeStudentUniversityProjection] (the pure function that
 * turns it into the badges/totals/schedule-sorted shape the screen renders).
 *
 * **Deliberately not ported: `buildDemoStudentUniversityProjection`.** That
 * function assembles a projection from local catalogue stores
 * (`ModuleSubjectStore`, `ModuleScheduleStore`, `AssessmentScheme`) for web's
 * `DemoUniversity`, which only runs when the web app has no authenticated
 * session (`API_MODE` false — see `University.tsx`'s `export function
 * University()`). The native app is always authenticated, so it always takes
 * the `LiveUniversity` path this file mirrors; porting the demo builder would
 * mean also porting `data/moduleSubjects.ts`, `data/moduleSchedule.ts`,
 * `data/assessmentScheme.ts` and `data/universities.ts` for a code path this
 * app can never reach. `universityModel.test.ts`'s third vector (which
 * exercises the demo builder) is skipped for the same reason; the other two
 * (the live-projection and being-verified vectors) are ported verbatim in
 * `UniversityModelTest`.
 *
 * One more simplification from the TS source: the wire `assessment.displayTotal`
 * field is typed `number | 'unavailable'` there. The server (`schemeProjection`
 * in `server/src/academic.js`) always derives it from the same value as
 * `total` (`declaredTotal ?? componentTotal ?? 'unavailable'`), so it carries
 * no information `total` doesn't already have; this port derives
 * [StudentAssessmentMap.displayTotal] from [ProjectionAssessment.total] alone
 * and never decodes the wire `displayTotal` field. Every real server response
 * and both ported test vectors are unaffected — the only case that would
 * differ (a wire payload with `displayTotal` a number but `total` absent)
 * never occurs on the wire.
 */

// --- Wire shapes (`GET /api/me/university`) -----------------------------------

@Serializable
data class StudentUniversityProjection(
    val profile: ProjectionProfile? = null,
    val university: ProjectionUniversity? = null,
    val year: ProjectionYear? = null,
    val terms: List<ProjectionTerm> = emptyList(),
    val modules: List<ProjectionModuleSummary> = emptyList(),
    val status: String = "missing_profile",
)

@Serializable
data class ProjectionProfile(
    val studentId: String? = null,
    val universityId: String? = null,
    val year: String? = null,
    val yearId: String? = null,
    val group: String? = null,
)

@Serializable
data class ProjectionUniversity(val id: String, val name: String, val short: String, val region: String)

@Serializable
data class ProjectionYear(
    val id: String,
    val year: String,
    val active: Boolean = true,
    val terms: List<String> = emptyList(),
)

/** The slim `modules` list on the wire root — see [ProjectionModule] for the rich per-term one. */
@Serializable
data class ProjectionModuleSummary(val id: String, val name: String, val moduleId: String? = null, val term: String = "")

@Serializable
data class ProjectionTerm(val term: String = "", val modules: List<ProjectionModule> = emptyList())

@Serializable
data class ProjectionModule(
    val id: String,
    val name: String = "",
    val moduleId: String? = null,
    val term: String = "",
    val evidenceState: String? = null,
    val labels: List<String> = emptyList(),
    val assessment: ProjectionAssessment? = null,
    val subjects: List<ProjectionSubject> = emptyList(),
    val schedule: List<ProjectionScheduleRow> = emptyList(),
    val coverage: ProjectionCoverage? = null,
)

@Serializable
data class ProjectionAssessment(
    val status: String? = null,
    val declaredTotal: Double? = null,
    val componentTotal: Double? = null,
    val total: Double? = null,
    val credits: Double? = null,
    val passRule: String? = null,
    val components: List<ProjectionAssessmentComponent> = emptyList(),
)

@Serializable
data class ProjectionAssessmentComponent(
    val id: String? = null,
    val label: String? = null,
    val kind: String? = null,
    val marks: Double? = null,
    val subjectAllocations: List<ProjectionAssessmentAllocation> = emptyList(),
    val passRule: String? = null,
)

@Serializable
data class ProjectionAssessmentAllocation(
    val subjectId: String? = null,
    val label: String? = null,
    val marks: Double? = null,
)

@Serializable
data class ProjectionSubject(
    val id: String? = null,
    val name: String = "",
    val type: String? = null,
    val evidenceState: String? = null,
    val labels: List<String> = emptyList(),
    val coverage: ProjectionCoverage? = null,
    val children: List<ProjectionSubject> = emptyList(),
)

@Serializable
data class ProjectionCoverage(
    val articleIds: List<String>? = null,
    val questionIds: List<String>? = null,
    val practicalIds: List<String>? = null,
    val topicNodeIds: List<String>? = null,
    val conceptIds: List<String>? = null,
    val resourceIds: List<String>? = null,
    val counts: Map<String, Int>? = null,
)

@Serializable
data class ProjectionScheduleRow(
    val id: String? = null,
    val type: String? = null,
    val title: String? = null,
    val date: String? = null,
    val startTime: String? = null,
    val endTime: String? = null,
    val location: String? = null,
    val carriedForwardFrom: String? = null,
    val labels: List<String> = emptyList(),
    val links: ProjectionScheduleLinks? = null,
)

@Serializable
data class ProjectionScheduleLinks(
    val subjectId: String? = null,
    val topicNodeIds: List<String> = emptyList(),
    val conceptIds: List<String> = emptyList(),
    val articleIds: List<String> = emptyList(),
    val resourceIds: List<String> = emptyList(),
    val assessmentComponentIds: List<String> = emptyList(),
)

// --- Normalized, screen-ready shapes (ported `Student*Map` types) -------------

data class StudentAssessmentAllocation(val subjectId: String?, val label: String, val marks: Double?, val displayMarks: String)

data class StudentAssessmentComponent(
    val id: String,
    val label: String,
    val kind: String,
    val marks: Double?,
    val displayMarks: String,
    val allocations: List<StudentAssessmentAllocation>,
)

data class StudentAssessmentMap(
    val status: String,
    val declaredTotal: Double?,
    val componentTotal: Double?,
    val total: Double?,
    val displayTotal: String,
    val credits: Double?,
    val passRule: String?,
    val components: List<StudentAssessmentComponent>,
)

data class StudentScheduleMap(
    val id: String,
    val type: String,
    val label: String,
    val title: String,
    val date: String?,
    val startTime: String?,
    val endTime: String?,
    val location: String?,
    val carriedForwardFrom: String?,
    val labels: List<String>,
    val start: Instant?,
    val isFuture: Boolean,
    val isExam: Boolean,
    val linkCount: Int,
)

data class StudentSubjectMap(
    val id: String,
    val name: String,
    val type: String,
    val labels: List<String>,
    val coverageCount: Int,
    val children: List<StudentSubjectMap>,
)

/** Ported from the TS `StudentModuleMap['badges']` string union. */
enum class ModuleBadge { Verified, CarriedForward, Inferred, BeingVerified, NeedsMarks, NeedsSchedule }

data class StudentModuleMap(
    val id: String,
    val name: String,
    val moduleId: String,
    val term: String,
    val labels: List<String>,
    val assessment: StudentAssessmentMap,
    val subjects: List<StudentSubjectMap>,
    val subjectCount: Int,
    val schedule: List<StudentScheduleMap>,
    val futureBlocks: Int,
    val coverageCount: Int,
    val badges: List<ModuleBadge>,
)

data class StudentTermMap(val term: String, val modules: List<StudentModuleMap>, val marks: Double?)

/**
 * One upcoming timetable block, plus which module it belongs to. TS expresses
 * this as `StudentScheduleMap & { moduleName, moduleId }` (an intersection
 * type); composition reads the same here without duplicating every schedule
 * field.
 */
data class UpcomingSession(val schedule: StudentScheduleMap, val moduleName: String, val moduleId: String)

data class StudentTotals(
    val terms: Int,
    val modules: Int,
    val marks: Double?,
    val marksUnavailable: Boolean,
    val subjects: Int,
    val scheduleRows: Int,
)

data class StudentCurriculumMap(
    val profile: ProjectionProfile?,
    val university: ProjectionUniversity?,
    val year: ProjectionYear?,
    val status: String,
    val terms: List<StudentTermMap>,
    val modules: List<StudentModuleMap>,
    val upcoming: List<UpcomingSession>,
    val totals: StudentTotals,
)

// --- Pure normalization (ported `normalizeStudentUniversityProjection`) ------

/** Ported from `moduleSchedule.ts`'s `MODULE_BLOCK_LABEL`. */
private val MODULE_BLOCK_LABEL: Map<String, String> = mapOf(
    "lecture" to "Lecture",
    "practical" to "Practical session",
    "review" to "Review session",
    "midterm" to "Mid-term exam",
    "midyear" to "Mid-year exam",
    "term" to "Term exam",
    "final" to "Final exam",
    "logbook" to "Logbook task",
)

/** Ported from `moduleSchedule.ts`'s `EXAM_BLOCK_TYPES`. */
private val EXAM_BLOCK_TYPES: Set<String> = setOf("midterm", "midyear", "term", "final")

/** Ported from `moduleSubjects.ts`'s `DEFAULT_TERM`. */
private const val DEFAULT_TERM = "Term 1"

private fun unique(values: List<String?>): List<String> {
    val seen = LinkedHashSet<String>()
    for (value in values) {
        val trimmed = (value ?: "").trim()
        if (trimmed.isNotEmpty()) seen += trimmed
    }
    return seen.toList()
}

/** First of [values] that isn't null/blank — Kotlin has no JS `||` truthiness, so this stands in for it. */
private fun firstNonBlank(vararg values: String?): String? = values.firstOrNull { !it.isNullOrBlank() }

private fun countCoverage(coverage: ProjectionCoverage?): Int {
    if (coverage == null) return 0
    coverage.counts?.let { counts -> return counts.values.sum() }
    return listOfNotNull(
        coverage.articleIds, coverage.questionIds, coverage.practicalIds,
        coverage.topicNodeIds, coverage.conceptIds, coverage.resourceIds,
    ).sumOf { it.size }
}

private fun formatDisplayMarks(value: Double?): String {
    if (value == null) return "unavailable"
    if (value == Math.floor(value) && !value.isInfinite()) return value.toLong().toString()
    return String.format(java.util.Locale.ROOT, "%.2f", value).trimEnd('0').trimEnd('.')
}

private fun localDateTime(date: String?, time: String?): LocalDateTime? {
    if (date.isNullOrBlank()) return null
    val dateParts = date.split("-").map { it.toIntOrNull() }
    if (dateParts.size != 3 || dateParts.any { it == null || it == 0 }) return null
    val (year, month, day) = dateParts
    val timeParts = (time?.takeIf { it.isNotBlank() } ?: "00:00").split(":").map { it.toIntOrNull() ?: 0 }
    val hour = timeParts.getOrElse(0) { 0 }
    val minute = timeParts.getOrElse(1) { 0 }
    return runCatching { LocalDateTime.of(year!!, month!!, day!!, hour, minute) }.getOrNull()
}

private fun normalizeAssessment(input: ProjectionAssessment?): StudentAssessmentMap {
    val components = (input?.components ?: emptyList())
        .filter { it.marks != null }
        .mapIndexed { index, component ->
            StudentAssessmentComponent(
                id = component.id ?: "component-${index + 1}",
                label = component.label ?: component.kind ?: "Assessment",
                kind = component.kind ?: "custom",
                marks = component.marks,
                displayMarks = formatDisplayMarks(component.marks),
                allocations = component.subjectAllocations.mapIndexed { allocationIndex, allocation ->
                    StudentAssessmentAllocation(
                        subjectId = allocation.subjectId,
                        label = allocation.label ?: allocation.subjectId ?: "Allocation ${allocationIndex + 1}",
                        marks = allocation.marks,
                        displayMarks = formatDisplayMarks(allocation.marks),
                    )
                },
            )
        }
    val total = input?.total
    return StudentAssessmentMap(
        status = input?.status ?: if (total == null) "partial" else "exact",
        declaredTotal = input?.declaredTotal,
        componentTotal = input?.componentTotal,
        total = total,
        displayTotal = formatDisplayMarks(total),
        credits = input?.credits,
        passRule = input?.passRule,
        components = components,
    )
}

private fun normalizeSubjects(subjects: List<ProjectionSubject>): List<StudentSubjectMap> =
    subjects.mapIndexed { index, subject ->
        val children = normalizeSubjects(subject.children)
        StudentSubjectMap(
            id = subject.id ?: "subject-${index + 1}",
            name = subject.name.ifBlank { "Untitled subject" },
            type = subject.type ?: if (children.isNotEmpty()) "subject" else "subsubject",
            labels = unique(subject.labels + subject.evidenceState),
            coverageCount = countCoverage(subject.coverage),
            children = children,
        )
    }

private fun countSubjectNodes(subjects: List<StudentSubjectMap>): Int =
    subjects.sumOf { 1 + countSubjectNodes(it.children) }

private fun normalizeSchedule(rows: List<ProjectionScheduleRow>, now: Instant): List<StudentScheduleMap> =
    rows.mapIndexed { index, row ->
        val type = row.type ?: "lecture"
        val start = localDateTime(row.date, row.startTime)?.atZone(ZoneId.systemDefault())?.toInstant()
        val links = row.links
        val linkCount = listOfNotNull(
            links?.subjectId?.let { listOf(it) },
            links?.topicNodeIds, links?.conceptIds, links?.articleIds, links?.resourceIds, links?.assessmentComponentIds,
        ).sumOf { it.size }
        StudentScheduleMap(
            id = row.id ?: "schedule-${index + 1}",
            type = type,
            label = MODULE_BLOCK_LABEL[type] ?: type,
            title = row.title ?: (MODULE_BLOCK_LABEL[type] ?: "Timetable block"),
            date = row.date,
            startTime = row.startTime,
            endTime = row.endTime,
            location = row.location,
            carriedForwardFrom = row.carriedForwardFrom,
            labels = row.labels,
            start = start,
            isFuture = start != null && !start.isBefore(now),
            isExam = EXAM_BLOCK_TYPES.contains(type),
            linkCount = linkCount,
        )
    }.sortedBy { it.start ?: Instant.MAX }

private fun moduleBadges(labels: List<String>, assessment: StudentAssessmentMap, schedule: List<StudentScheduleMap>): List<ModuleBadge> {
    val labelSet = labels.toSet()
    val badges = mutableListOf<ModuleBadge>()
    if (assessment.total != null && assessment.status != "partial") badges += ModuleBadge.Verified else badges += ModuleBadge.NeedsMarks
    if (labelSet.contains("carried-forward") || schedule.any { it.labels.contains("carried-forward") }) badges += ModuleBadge.CarriedForward
    if (labelSet.contains("inferred") || schedule.any { it.labels.contains("inferred") }) badges += ModuleBadge.Inferred
    if (labelSet.contains("being-verified") || assessment.status == "being_verified") badges += ModuleBadge.BeingVerified
    if (schedule.isEmpty()) badges += ModuleBadge.NeedsSchedule
    return badges
}

private fun sumMarks(values: List<Double?>): Double? =
    if (values.any { it != null }) values.sumOf { it ?: 0.0 } else null

/**
 * Port of `normalizeStudentUniversityProjection` (the live-projection path
 * only — see this file's header doc). [now] drives which schedule blocks
 * count as upcoming vs. past; callers pass an overridable clock the same way
 * every other view model in this codebase does.
 */
fun normalizeStudentUniversityProjection(projection: StudentUniversityProjection, now: Instant = Instant.now()): StudentCurriculumMap {
    val terms = projection.terms.map { term ->
        val modules = term.modules.map { raw ->
            val subjects = normalizeSubjects(raw.subjects)
            val schedule = normalizeSchedule(raw.schedule, now)
            val labels = unique(raw.labels + raw.evidenceState)
            val assessment = normalizeAssessment(raw.assessment)
            StudentModuleMap(
                id = raw.id,
                name = firstNonBlank(raw.name, raw.moduleId) ?: "Untitled module",
                moduleId = firstNonBlank(raw.moduleId) ?: raw.id,
                term = firstNonBlank(raw.term, term.term) ?: DEFAULT_TERM,
                labels = labels,
                assessment = assessment,
                subjects = subjects,
                subjectCount = countSubjectNodes(subjects),
                schedule = schedule,
                futureBlocks = schedule.count { it.isFuture },
                coverageCount = countCoverage(raw.coverage),
                badges = moduleBadges(labels, assessment, schedule),
            )
        }
        StudentTermMap(
            term = firstNonBlank(term.term) ?: DEFAULT_TERM,
            modules = modules,
            marks = sumMarks(modules.map { it.assessment.total }),
        )
    }
    val modules = terms.flatMap { it.modules }
    val upcoming = modules.flatMap { module ->
        module.schedule.filter { it.isFuture }.map { row -> UpcomingSession(row, moduleName = module.name, moduleId = module.moduleId) }
    }.sortedBy { it.schedule.start ?: Instant.EPOCH }
    val markTotals = modules.map { it.assessment.total }
    return StudentCurriculumMap(
        profile = projection.profile,
        university = projection.university,
        year = projection.year,
        status = projection.status,
        terms = terms,
        modules = modules,
        upcoming = upcoming,
        totals = StudentTotals(
            terms = terms.size,
            modules = modules.size,
            marks = sumMarks(markTotals),
            marksUnavailable = markTotals.any { it == null },
            subjects = modules.sumOf { it.subjectCount },
            scheduleRows = modules.sumOf { it.schedule.size },
        ),
    )
}
