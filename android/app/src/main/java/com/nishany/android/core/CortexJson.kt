package com.nishany.android.core

import kotlinx.serialization.json.Json

/**
 * The one JSON format for every document three clients share.
 *
 * A shared document -- anything the sync engine uploads under a
 * `synapse.*` key -- is read and written by the web app (`src/`), the iOS app
 * (`ios/`) and this one. None of them validates what the others wrote, so a
 * key that goes missing on the way out does not throw anywhere: it silently
 * loses a student's work. Both settings below are that contract, not style.
 *
 * **`encodeDefaults = true`.** kotlinx.serialization omits a property whose
 * value equals its declared default. Every TypeScript interface these models
 * port declares those same properties as *required*, so an omitted key is a
 * document the web reads as `undefined`:
 *
 *  - `src/lib/stateStore.ts:344` is `entry.value = remote.value` -- a whole
 *    document replacement, no deep merge. Whatever Android uploads becomes
 *    the document.
 *  - `src/data/attempts.ts:118` then computes `index.totals.marked + (...)`.
 *    `undefined + 0` is `NaN`, and `JSON.stringify(NaN)` is `null`, so a
 *    missing `marked` permanently destroys the student's lifetime totals and
 *    writes the wreckage back to the server.
 *  - `src/data/attemptStats.ts:19` filters `record.correct !== null`, and
 *    `undefined !== null` is *true*. An omitted `correct` turns a self-ticked
 *    OSCE station -- practice nobody marked -- into a marked-and-wrong
 *    attempt that drags the student's accuracy down.
 *
 * The visible consequence is that `AttemptRecord.correct` now encodes as
 * `"correct": null` instead of vanishing. That is the point: TypeScript
 * declares `correct: boolean | null` as a required, explicitly nullable
 * field (`src/data/attempts.ts:36`). iOS omits it via `encodeIfPresent`, and
 * where iOS and TypeScript disagree on a data contract the TypeScript wins.
 *
 * **`ignoreUnknownKeys = true`.** The web ships ahead of this app. A document
 * carrying a field Android has not modelled yet must decode, not throw --
 * otherwise one web release makes every Android screen that reads that
 * document fail to load. Note what this does *not* buy: an unknown key is
 * dropped on the way back out, so a section only the web writes still cannot
 * survive an Android write. Adding it to the model is the only fix for that.
 *
 * **Local-only documents deliberately do not use this.** The Room type
 * converters (`core/cache/entities/Converters.kt`) and the encrypted session
 * store (`core/auth/AuthModel.kt`) each have exactly one writer and one
 * reader -- this process, on this device -- and their bytes never leave it.
 * No other client can be broken by their shape, so they carry no cross-client
 * contract and are kept separate rather than being quietly bound to one.
 */
val CortexJson: Json = Json {
    ignoreUnknownKeys = true
    encodeDefaults = true
}
