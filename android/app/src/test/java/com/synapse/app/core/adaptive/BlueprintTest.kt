package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * `blueprint.ts` has no dedicated `*.test.ts` on the web. `deriveBlueprint`
 * itself is not ported (see the ponytail note in `Blueprint.kt`); these cover
 * the resolution functions that are.
 */
class BlueprintTest {
    private val derived = listOf(
        BlueprintNode("CON-A", "A", "GRP-0", "Group 0", 0.6, false),
        BlueprintNode("CON-B", "B", "GRP-0", "Group 0", 0.4, false),
    )

    @Test
    fun `an unpublished blueprint never overrides the derived weights`() {
        val draft = draftBlueprint("Draft", BlueprintScope("UNI-1", "OMS_Y3"), derived)
            .copy(nodes = listOf(BlueprintNode("CON-A", "A", "GRP-0", "Group 0", 0.9, true)))
        assertEquals(derived, resolveBlueprint(derived, draft))
    }

    @Test
    fun `a published override replaces a node's weight and re-normalises`() {
        val stored = Blueprint(
            id = "bp-1", name = "Published", version = 2, universityId = "UNI-1", yearId = "OMS_Y3", moduleIds = emptyList(),
            nodes = listOf(BlueprintNode("CON-A", "A", "GRP-0", "Group 0", 0.9, true)),
            publishedAt = "2026-01-01", changeNotes = emptyList(),
        )
        val resolved = resolveBlueprint(derived, stored)
        val a = resolved.first { it.conceptId == "CON-A" }
        val b = resolved.first { it.conceptId == "CON-B" }
        assertTrue(a.overridden)
        // 0.9 and the untouched 0.4 renormalise to sum to 1.
        assertEquals(1.0, a.weight + b.weight, 1e-9)
        assertEquals(0.9 / 1.3, a.weight, 1e-9)
    }

    @Test
    fun `normaliseNodes drops zero-weight nodes and rescales the rest to sum to 1`() {
        val nodes = listOf(
            BlueprintNode("CON-A", "A", "GRP-0", "Group 0", 0.5, false),
            BlueprintNode("CON-B", "B", "GRP-0", "Group 0", 0.0, false),
        )
        val normalised = normaliseNodes(nodes)
        assertEquals(1, normalised.size)
        assertEquals(1.0, normalised.single().weight, 1e-9)
    }

    @Test
    fun `weightByGroup sums weight per group`() {
        val groups = weightByGroup(derived)
        assertEquals(1, groups.size)
        assertEquals(1.0, groups.single().weight, 1e-9)
        assertEquals(2, groups.single().concepts)
    }

    @Test
    fun `blueprintFor prefers the most specific, then the newest, blueprint`() {
        val universityWide = Blueprint("bp-uni", "Uni", 1, "UNI-1", "", emptyList(), derived, "2026-01-01", emptyList())
        val yearScopedOld = Blueprint("bp-year-1", "Year v1", 1, "UNI-1", "OMS_Y3", emptyList(), derived, "2026-01-01", emptyList())
        val yearScopedNew = Blueprint("bp-year-2", "Year v2", 2, "UNI-1", "OMS_Y3", emptyList(), derived, "2026-02-01", emptyList())

        val winner = blueprintFor(listOf(universityWide, yearScopedOld, yearScopedNew), BlueprintScope("UNI-1", "OMS_Y3"))
        assertEquals("bp-year-2", winner?.id)
    }

    @Test
    fun `blueprintFor returns null with no published candidate`() {
        val draft = Blueprint("bp-draft", "Draft", 1, "UNI-1", "OMS_Y3", emptyList(), derived, null, emptyList())
        assertNull(blueprintFor(listOf(draft), BlueprintScope("UNI-1", "OMS_Y3")))
    }
}
