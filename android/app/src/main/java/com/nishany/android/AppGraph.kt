package com.nishany.android

import android.content.Context
import androidx.glance.appwidget.updateAll
import com.nishany.android.core.ConnectivityMonitor
import com.nishany.android.core.api.SynapseApi
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.calendar.CALENDAR_TASKS_KEY
import com.nishany.android.core.calendar.MODULE_SCHEDULES_KEY
import com.nishany.android.core.calendar.buildAgendaSnapshot
import com.nishany.android.core.auth.AuthBackend
import com.nishany.android.core.auth.AuthModel
import com.nishany.android.core.auth.EncryptedSessionStore
import com.nishany.android.core.auth.SupabaseAuthBackend
import com.nishany.android.core.cache.CortexDatabase
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.config.AppConfig
import com.nishany.android.core.sync.SyncEngine
import com.nishany.android.design.LanguagePreference
import com.nishany.android.design.ThemePreference
import com.nishany.android.feature.focus.CalendarWidgetStore
import com.nishany.android.feature.focus.FocusCalendarWidget
import java.time.LocalDate
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient

/**
 * One instance of everything the app needs, held for the life of the
 * process by [SynapseApp].
 *
 * `CortexDatabase` must be one instance per process -- Room hands out a
 * connection pool per instance, so two instances over the same file are two
 * writers that do not see each other's invalidations, and a [kotlinx.coroutines.flow.Flow]
 * from one goes quiet after the other writes, with no error anywhere.
 * [database] is therefore a plain `val`, constructed once here and never
 * again -- see [CortexDatabase.build] for why nothing else may open the
 * file directly.
 *
 * The network half -- [sessionStore], [authBackend], [api], [auth], [sync]
 * -- is `by lazy`. When [config] is unconfigured, `RootScreen` renders
 * `NotConfiguredScreen` straight from [config] and never touches any of
 * these; if they were built eagerly, constructing a Supabase client against
 * a blank host would throw inside `Application.onCreate`, before anything
 * could render the explanation. [sessionStore] in particular reaches into
 * the Android Keystore (see `SessionStore.kt`), which a Robolectric test --
 * or an unconfigured build -- must never be asked to do.
 */
class AppGraph(context: Context, val config: AppConfig) {
    private val http = OkHttpClient()

    // Plain SharedPreferences, not lazy: unlike sessionStore below, this
    // never reaches into the Keystore and is never affected by whether the
    // build is configured, so it is built eagerly like database is -- see
    // ThemePreference's own class doc for why it is never encrypted or
    // synced.
    val themePreference = ThemePreference(context.applicationContext)

    // Same reasoning, same eagerness -- see LanguagePreference's own class doc.
    val languagePreference = LanguagePreference(context.applicationContext)

    // Touches only ConnectivityManager.getSystemService, never the network or
    // the Keystore, so -- like themePreference and languagePreference above --
    // there is nothing an unconfigured build needs to avoid here.
    val connectivity = ConnectivityMonitor(context.applicationContext)

    // Typed as the concrete class, not as SessionStore, because it backs two
    // separate things out of the one encrypted file: the Supabase session
    // (SessionStore, for the backend) and the last confirmed identity
    // (SessionUserCache, for AuthModel).
    private val sessionStore: EncryptedSessionStore by lazy { EncryptedSessionStore(context.applicationContext) }

    // The backend owns the token. Built first, its reader handed to the API,
    // so the apparent cycle (api needs a token, auth needs the api)
    // resolves without a lateinit or a holder object.
    val authBackend: AuthBackend by lazy { SupabaseAuthBackend(config, sessionStore, http) }
    val api: SynapseApi by lazy { SynapseApi(config.apiBaseUrl, http, authBackend::accessToken) }
    val auth: AuthModel by lazy { AuthModel(config, api, authBackend, sessionStore) }

    // The only correct way to open the file: it pins the name and forces
    // applicationContext, so the database cannot capture an Activity.
    val database: CortexDatabase = CortexDatabase.build(context)
    val store = LocalStore(database)
    val sync: SyncEngine by lazy { SyncEngine(api, store) }

    // Keeps the home-screen calendar widget's [CalendarWidgetStore] snapshot
    // current. The widget's own process must not open Room (see that store's
    // doc), so the app -- the one place that already holds the single database
    // instance -- precomputes the agenda here and hands it over. Observing the
    // two source documents covers both triggers the brief asks for at once: a
    // SyncEngine refresh writes them, and the calendar screen's own task edits
    // write CALENDAR_TASKS_KEY, and either emission rebuilds and re-pushes.
    // Local-only work (no network), so unlike the lazy fields above it is safe
    // eagerly -- but still gated on isConfigured so an unconfigured build (and
    // the Robolectric graph tests, which construct exactly that) never spins it
    // up against a database they tear down.
    private val widgetSnapshotScope = backgroundWorkScope("CalendarWidgetSnapshot")

    init {
        if (config.isConfigured) {
            val appContext = context.applicationContext
            val widgetStore = CalendarWidgetStore(appContext)
            widgetSnapshotScope.launch {
                combine(
                    store.documentFlow(MODULE_SCHEDULES_KEY),
                    store.documentFlow(CALENDAR_TASKS_KEY),
                ) { schedule, tasks -> schedule?.json to tasks?.json }
                    .collect { (scheduleJson, tasksJson) ->
                        widgetStore.write(buildAgendaSnapshot(scheduleJson, tasksJson, LocalDate.now()))
                        FocusCalendarWidget().updateAll(appContext)
                    }
            }
        }
    }
}
