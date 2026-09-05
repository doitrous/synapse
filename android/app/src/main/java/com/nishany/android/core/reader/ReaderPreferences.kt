package com.nishany.android.core.reader

import android.content.Context

/**
 * Where a student left off in a resource -- kept on this device, not synced.
 *
 * A port of iOS `Core/Reader/ToolSettings.swift`'s `ReaderPreferences`: the
 * web keeps its own reader prefs (toolbar position, and this) in
 * `localStorage` under `synapse.reader.*`, deliberately outside the synced
 * record -- resuming on the page you left is about the device in your hand,
 * not about the account, and syncing it would jump a desktop back to
 * wherever a phone happened to be left open.
 */
class ReaderPreferences(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    /** 1-based, matching everything else the reader says about pages. */
    fun lastPage(resourceId: String): Int = prefs.getInt(KEY_PREFIX + resourceId, 1)

    fun setLastPage(resourceId: String, page: Int) {
        prefs.edit().putInt(KEY_PREFIX + resourceId, page).apply()
    }

    private companion object {
        const val PREFS_NAME = "synapse-reader"
        const val KEY_PREFIX = "synapse.reader.lastPage.v1."
    }
}
