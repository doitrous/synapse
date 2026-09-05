package com.nishany.android.core.reader

import com.nishany.android.core.CortexJson
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * A shard is a JSON array of [AnnotationObject] shared with web and iOS. Two
 * things must hold for that to be safe:
 *
 *  - a document this build actually authors (ink) round-trips exactly;
 *  - a document shaped like something web/iOS wrote, including a `kind` this
 *    build has never heard of, survives a decode-then-encode pass unchanged
 *    -- see the class doc on [AnnotationObject] for why `kind` is a plain
 *    string rather than an enum.
 */
class AnnotationObjectTest {

    private val listSerializer = ListSerializer(AnnotationObject.serializer())

    @Test
    fun `an ink object shaped like the web's model round-trips`() {
        // The exact JSON shape `src/lib/reader/annotations.ts`'s `InkObject`
        // serialises to, and what `AnnotationObject.swift` decodes on iOS.
        val json = """
            [{"id":"abc0123456","kind":"ink","page":3,"z":1.0,
              "bbox":[0.1,0.2,0.3,0.4],"t":1700000000000.0,
              "tool":"fountain","color":"#1a1a1a","w":0.004,"a":null,
              "p":[410,1229,297,228]}]
        """.trimIndent()

        val decoded = CortexJson.decodeFromString(listSerializer, json)
        assertEquals(1, decoded.size)
        val ink = decoded.single()
        assertEquals("ink", ink.kind)
        assertEquals(listOf(410, 1229, 297, 228), ink.p)
        assertTrue(ink.isInk)

        // Re-encoding and decoding again must reproduce the identical object
        // -- the round trip a shard goes through every time this app saves it.
        val reencoded = CortexJson.decodeFromString(
            listSerializer,
            CortexJson.encodeToString(listSerializer, decoded),
        )
        assertEquals(decoded, reencoded)
    }

    @Test
    fun `a kind this build has never heard of survives unchanged`() {
        // Simulates a future object kind added on web/iOS after this build
        // shipped. It must not be dropped, corrupted, or crash the decode of
        // the shard it shares with real ink strokes.
        val json = """
            [
              {"id":"ink0000001","kind":"ink","page":5,"z":1.0,"bbox":[0,0,1,1],"t":10.0,
               "tool":"ball","color":"#ff0000","w":0.003,"p":[100,200]},
              {"id":"future0001","kind":"sparkle","page":5,"z":2.0,"bbox":[0.2,0.2,0.5,0.5],"t":11.0,
               "color":"#00ff00","r":[0.2,0.2,0.5,0.5],"tone":"amber","text":"a future widget","size":0.02}
            ]
        """.trimIndent()

        val decoded = CortexJson.decodeFromString(listSerializer, json)
        assertEquals(2, decoded.size)

        val unknown = decoded.single { it.kind == "sparkle" }
        assertEquals(false, unknown.isInk)
        assertEquals("a future widget", unknown.text)
        assertEquals("amber", unknown.tone)

        // The full shard -- known and unknown objects together -- must come
        // back byte-identical after a save/load cycle, not just individually
        // equal: [AnnotationStore.save] always rewrites the whole shard.
        val reencoded = CortexJson.decodeFromString(
            listSerializer,
            CortexJson.encodeToString(listSerializer, decoded),
        )
        assertEquals(decoded, reencoded)
    }

    @Test
    fun `AnnotationObject ink() factory encodes points via StrokeCodec`() {
        val points = listOf(InkPoint(0.1, 0.1), InkPoint(0.5, 0.6))
        val stamp = AnnotationObject.nextStamp(null)

        val object_ = AnnotationObject.ink(
            kind = AnnotationObject.KIND_INK,
            tool = "pencil",
            color = "#123456",
            width = 0.004,
            alpha = null,
            points = points,
            page = 1,
            z = 1.0,
            stamp = stamp,
        )

        assertEquals(StrokeCodec.encode(points), object_.p)
        assertEquals(4, object_.bbox.size)
    }

    @Test
    fun `newId is ten lowercase alphanumerics`() {
        val id = AnnotationObject.newId()
        assertEquals(10, id.length)
        assertTrue(id.all { it.isDigit() || (it in 'a'..'z') })
    }
}
