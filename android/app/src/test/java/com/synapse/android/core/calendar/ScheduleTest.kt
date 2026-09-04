package com.synapse.android.core.calendar

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [flattenPublishedSchedule], the decoder that pulls the `ModuleScheduleStore`
 * document's blocks and reserved `__schedulePublishState__` map apart --
 * see that function's own doc for why this reads every published module
 * rather than scoping to one student's courses.
 */
class ScheduleTest {

    private fun scheduleDoc(vararg entries: Pair<String, String>): String {
        val modules = entries.joinToString(",") { (key, block) -> "\"$key\":[$block]" }
        val published = entries.joinToString(",") { (key, _) -> "\"$key\":true" }
        return "{$modules,\"__schedulePublishState__\":{$published}}"
    }

    private fun block(id: String, date: String, time: String = "09:00", type: String = "lecture") =
        """{"id":"$id","type":"$type","title":"Block $id","date":"$date","startTime":"$time","endTime":"10:00","location":"Hall A"}"""

    @Test
    fun `only published modules contribute blocks`() {
        val json = """
            {
              "mod-a": [${block("a1", "2024-05-02")}],
              "mod-b": [${block("b1", "2024-05-01")}],
              "__schedulePublishState__": {"mod-a": true}
            }
        """.trimIndent()
        val result = flattenPublishedSchedule(json)
        assertEquals(listOf("a1"), result.map { it.block.id })
    }

    @Test
    fun `results are sorted by start time across modules`() {
        val json = scheduleDoc(
            "mod-a" to block("later", "2024-05-05"),
            "mod-b" to block("earlier", "2024-05-01"),
        )
        val result = flattenPublishedSchedule(json)
        assertEquals(listOf("earlier", "later"), result.map { it.block.id })
    }

    @Test
    fun `a block with an unparseable date is dropped, not fatal`() {
        val json = scheduleDoc("mod-a" to block("bad", "not-a-date"))
        assertEquals(emptyList<Any>(), flattenPublishedSchedule(json))
    }

    @Test
    fun `an unpublished module's blocks never appear even though they decode fine`() {
        val json = """
            {
              "mod-a": [${block("a1", "2024-05-02")}],
              "__schedulePublishState__": {"mod-a": false}
            }
        """.trimIndent()
        assertEquals(emptyList<Any>(), flattenPublishedSchedule(json))
    }

    @Test
    fun `exam types are flagged`() {
        val json = scheduleDoc("mod-a" to block("final-1", "2024-06-01", type = "final"))
        assertTrue(flattenPublishedSchedule(json).single().isExam)
    }

    @Test
    fun `malformed JSON yields an empty agenda rather than throwing`() {
        assertEquals(emptyList<Any>(), flattenPublishedSchedule("not json"))
    }
}
