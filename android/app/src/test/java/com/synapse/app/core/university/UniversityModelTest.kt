package com.synapse.app.core.university

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant

/**
 * Ported test vectors from `universityModel.test.ts`'s first two cases (the
 * live-projection path). The third vector (`buildDemoStudentUniversityProjection`)
 * is intentionally not ported — see the doc comment on [UniversityModel.kt]
 * (`com.synapse.app.core.university`) for why.
 */
class UniversityModelTest {

    private val now = Instant.parse("2026-08-26T12:00:00Z")

    @Test
    fun liveProjectionNormalizesOnlyTheAuthenticatedCohortAndKeepsUnavailableTotalsHonest() {
        val projection = StudentUniversityProjection(
            profile = ProjectionProfile(studentId = "s1", universityId = "hu", year = "Year 2", yearId = "HU_Y2", group = "A"),
            university = ProjectionUniversity(id = "hu", name = "Helwan University", short = "HU", region = "Cairo"),
            year = ProjectionYear(id = "HU_Y2", year = "Year 2", active = true, terms = listOf("Term 1")),
            status = "ready",
            terms = listOf(
                ProjectionTerm(
                    term = "Term 1",
                    modules = listOf(
                        ProjectionModule(
                            id = "inh",
                            name = "INH 201",
                            moduleId = "INH 201",
                            term = "Term 1",
                            labels = listOf("verified"),
                            assessment = ProjectionAssessment(
                                status = "exact",
                                declaredTotal = 360.0,
                                componentTotal = 360.0,
                                total = 360.0,
                                credits = 6.0,
                                components = listOf(
                                    ProjectionAssessmentComponent(id = "written", label = "Final written", kind = "final-written", marks = 347.5),
                                ),
                            ),
                            subjects = listOf(
                                ProjectionSubject(
                                    id = "s1",
                                    name = "Anatomy",
                                    labels = listOf("verified"),
                                    coverage = ProjectionCoverage(articleIds = listOf("ART-1")),
                                    children = listOf(ProjectionSubject(id = "s1-a", name = "Neuroanatomy")),
                                ),
                            ),
                            schedule = listOf(
                                ProjectionScheduleRow(
                                    id = "row-1",
                                    type = "lecture",
                                    title = "Safe row",
                                    date = "2026-12-15",
                                    startTime = "09:00",
                                    endTime = "10:00",
                                    labels = listOf("inferred", "carried-forward"),
                                    links = ProjectionScheduleLinks(articleIds = listOf("ART-2"), conceptIds = listOf("CON-2")),
                                ),
                            ),
                            coverage = ProjectionCoverage(counts = mapOf("articleIds" to 2, "conceptIds" to 1)),
                        ),
                        ProjectionModule(
                            id = "crs",
                            name = "CRS 204",
                            moduleId = "CRS 204",
                            term = "Term 1",
                            assessment = ProjectionAssessment(status = "partial", components = emptyList()),
                        ),
                    ),
                ),
            ),
            modules = listOf(
                ProjectionModuleSummary(id = "inh", name = "INH 201", moduleId = "INH 201", term = "Term 1"),
                ProjectionModuleSummary(id = "crs", name = "CRS 204", moduleId = "CRS 204", term = "Term 1"),
            ),
        )

        val map = normalizeStudentUniversityProjection(projection, now)

        assertEquals("hu", map.university?.id)
        assertEquals("HU_Y2", map.year?.id)
        assertEquals(2, map.modules.size)
        assertEquals("360", map.modules[0].assessment.displayTotal)
        assertEquals("347.5", map.modules[0].assessment.components[0].displayMarks)
        assertEquals(2, map.modules[0].schedule[0].linkCount)
        assertEquals(listOf(ModuleBadge.Verified, ModuleBadge.CarriedForward, ModuleBadge.Inferred), map.modules[0].badges)
        assertEquals("unavailable", map.modules[1].assessment.displayTotal)
        assertEquals(listOf(ModuleBadge.NeedsMarks, ModuleBadge.NeedsSchedule), map.modules[1].badges)
        assertEquals(360.0, map.totals.marks)
        assertTrue(map.totals.marksUnavailable)
    }

    @Test
    fun beingVerifiedProjectionStaysEmptyWithoutInventingACatalogueYear() {
        val projection = StudentUniversityProjection(
            profile = ProjectionProfile(studentId = "s1", universityId = "hu", year = "Year 4", yearId = null, group = null),
            university = ProjectionUniversity(id = "hu", name = "Helwan University", short = "HU", region = "Cairo"),
            year = null,
            terms = emptyList(),
            modules = emptyList(),
            status = "being_verified",
        )

        val map = normalizeStudentUniversityProjection(projection, now)

        assertEquals("being_verified", map.status)
        assertEquals(null, map.year)
        assertTrue(map.modules.isEmpty())
    }
}
