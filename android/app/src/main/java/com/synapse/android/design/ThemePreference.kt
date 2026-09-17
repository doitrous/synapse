package com.synapse.android.design

import android.content.Context
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * The three grounds the website offers, in the same order and with the
 * same wire spelling as `THEMES` (`src/lib/useTheme.tsx:13`), so the value
 * this enum persists is exactly what a shared backend document would carry
 * if this preference ever needed to travel -- it deliberately never does;
 * see [ThemePreference].
 */
enum class CortexThemeChoice(val wire: String) {
    LIGHT("light"),
    WARM("warm"),
    DARK("dark");

    companion object {
        /** Any string that is not one of [wire] -- unset, corrupt, or from a future client -- is [LIGHT], never a crash. */
        fun fromWire(wire: String?): CortexThemeChoice = entries.firstOrNull { it.wire == wire } ?: LIGHT
    }
}

/**
 * The reader's chosen ground -- light, warm, or dark -- kept on this device
 * and nowhere else.
 *
 * Three deliberate choices:
 * - **Plain `SharedPreferences`, not `EncryptedSharedPreferences`.** A
 *   colour preference is not a secret, and the encrypted store reaches into
 *   the Android Keystore, which the unconfigured build (see
 *   `NotConfiguredScreen`) must never touch.
 * - **Never synced.** The website keeps this in `localStorage`, explicitly
 *   outside `usePersistentState` (`src/lib/useTheme.tsx:6-10`) -- it is a
 *   per-device choice, and putting it in the outbox would make a phone
 *   restyle a desktop.
 * - **Defaults to [CortexThemeChoice.LIGHT], not the system setting.** That
 *   is the website's own default (`src/lib/useTheme.tsx:24`); no client has
 *   a fourth "System" option, and one can be added later as a fourth stored
 *   value without touching what is already on disk.
 */
class ThemePreference(context: Context) {

    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    private val _choice = MutableStateFlow(CortexThemeChoice.fromWire(prefs.getString(KEY, null)))

    /** Read once, synchronously, by [_choice]'s initializer above -- see `MainActivity.onCreate`. */
    val choice: StateFlow<CortexThemeChoice> = _choice.asStateFlow()

    fun set(choice: CortexThemeChoice) {
        prefs.edit().putString(KEY, choice.wire).apply()
        _choice.value = choice
    }

    private companion object {
        const val PREFS_NAME = "nishany-theme"
        const val KEY = "nishany-theme"
    }
}
