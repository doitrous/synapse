package com.synapse.android.core.cache.entities

import androidx.room.TypeConverter
import java.time.Instant
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/**
 * Every `@TypeConverter` the database needs, in one class.
 *
 * Kept as a single class so a timestamp written by one table (say `outbox`)
 * decodes with the exact same rule a different table (`documents`) reads it
 * back with — two converter classes could drift, and epoch millis would mean
 * something different in each table.
 *
 * Both a nullable and a non-null overload are provided for [Instant]: Room
 * resolves converters by the field's own nullability, and a single
 * nullable-only pair would leave a non-null `Instant` field with no matching
 * converter to satisfy the Kotlin null-check in the generated code.
 */
class Converters {

    @TypeConverter
    fun fromInstant(value: Instant): Long = value.toEpochMilli()

    @TypeConverter
    fun toInstant(value: Long): Instant = Instant.ofEpochMilli(value)

    @TypeConverter
    fun fromInstantOrNull(value: Instant?): Long? = value?.toEpochMilli()

    @TypeConverter
    fun toInstantOrNull(value: Long?): Instant? = value?.let(Instant::ofEpochMilli)

    @TypeConverter
    fun fromStringList(value: List<String>): String = Json.encodeToString(value)

    @TypeConverter
    fun toStringList(value: String): List<String> = Json.decodeFromString(value)
}
