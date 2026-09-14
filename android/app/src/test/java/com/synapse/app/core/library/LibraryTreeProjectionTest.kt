package com.synapse.app.core.library

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class LibraryTreeProjectionTest {

    @Test fun projectsScopesToRootsWithNestedChildren() {
        val treesJson = """
            { "trees": {
                "module:MOD_CVS": [
                  { "id":"n1", "title":"Heart failure", "articleIds":["A1"],
                    "children":[ { "id":"n1a", "title":"Pathophysiology", "articleIds":["A2"] } ] }
                ],
                "year:OMS_Y2": []
              } }
        """.trimIndent()

        val trees = LibraryTreeProjection.project(treesJson)

        assertEquals(setOf("module:MOD_CVS", "year:OMS_Y2"), trees.keys)
        val roots = trees.getValue("module:MOD_CVS")
        assertEquals(1, roots.size)
        val root = roots.single()
        assertEquals("n1", root.id)
        assertEquals("Heart failure", root.title)
        assertEquals(listOf("A1"), root.articleIds)
        assertEquals(1, root.children.size)
        assertEquals(LibraryTreeNode("n1a", "Pathophysiology", articleIds = listOf("A2")), root.children.single())
    }

    @Test fun malformedJsonDecodesToAnEmptyMapRatherThanThrowing() {
        assertTrue(LibraryTreeProjection.project("not json").isEmpty())
        assertTrue(LibraryTreeProjection.project("").isEmpty())
    }

    @Test fun articleIdsUnderCollectsTheWholeSubtreeOnceEach() {
        val node = LibraryTreeNode(
            id = "root",
            title = "Root",
            articleIds = listOf("A1", "A2"),
            children = listOf(
                LibraryTreeNode("c1", "Child 1", articleIds = listOf("A2", "A3")),
                LibraryTreeNode("c2", "Child 2", articleIds = listOf("A4")),
            ),
        )

        assertEquals(listOf("A1", "A2", "A3", "A4"), articleIdsUnder(node))
    }
}
