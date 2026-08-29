# Enabling Android push for Question of the Day

Android alert delivery for the Question of the Day reminder is **built and dormant**:
- Server: `server/src/fcm.js` sends via FCM HTTP v1, but no-ops (`sendFcmAlert` returns
  `false` without attempting a send) whenever `FCM_SERVICE_ACCOUNT` is unset.
- App: the FirebaseMessagingService + token registrar are written as inert
  `.kt.txt` templates under `android/app/push-prepared/`, outside every Gradle
  source set, so the app **builds and ships today with no Firebase dependency
  at all**. They are not wired into the manifest or the dependency graph.

Nothing here sends a single Android push until every step below is done.

## 1. Create the Firebase project

1. In the [Firebase console](https://console.firebase.google.com), create a project
   (or add Firebase to an existing GCP project, if one is already used for anything
   else Synapse-related).
2. Add an Android app with package name `com.synapse.android` (matches
   `applicationId` in `android/app/build.gradle.kts`).
3. Download the generated `google-services.json`.

## 2. Wire the app build

1. Place the downloaded file at `android/app/google-services.json`. **Do not
   commit it if the repo is public** — it is not a secret on its own (it only
   identifies the Firebase project), but treat it the same as other build
   config that varies by environment; check the project's existing convention
   for `secrets.properties`-style files before deciding whether to commit it.
2. Apply the Google Services Gradle plugin. In the root `android/build.gradle.kts`
   (or the version catalog, matching how `android/gradle/libs.versions.toml`
   declares the other plugins used in `android/app/build.gradle.kts`), add:
   ```kotlin
   plugins {
       id("com.google.gms.google-services") version "4.4.2" apply false
   }
   ```
   Then in `android/app/build.gradle.kts`, add to the `plugins { }` block:
   ```kotlin
   id("com.google.gms.google-services")
   ```
3. Add the Firebase Messaging dependency (via the version catalog, matching the
   existing `libs.androidx.*` style) to `android/app/build.gradle.kts`:
   ```kotlin
   implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
   implementation("com.google.firebase:firebase-messaging")
   ```
   Prefer adding these through `android/gradle/libs.versions.toml` for
   consistency with how every other dependency in this module is declared.

## 3. Move the prepared sources into the build

1. Move both files out of `android/app/push-prepared/` into
   `android/app/src/main/java/com/synapse/android/core/push/`, dropping the
   `.kt.txt` extension so they become real `.kt` sources:
   - `QotdMessagingService.kt.txt` → `QotdMessagingService.kt`
   - `PushTokenRegistrar.kt.txt` → `PushTokenRegistrar.kt`
2. Delete the (now empty) `android/app/push-prepared/` directory.
3. Wire the placeholders each file leaves for real values:
   - `QotdMessagingService.onNewToken` currently passes a hardcoded empty
     `baseUrl` and a `null` bearer token — wire these to
     `(applicationContext as SynapseApp).graph.config.apiBaseUrl` and the same
     `authBackend::accessToken` pattern `AppGraph.kt` already uses for
     `SynapseApi`, per that file's own comment.
   - Call `PushTokenRegistrar.requestPermissionAndRegister(activity, baseUrl, bearerToken)`
     from a sensible, user-legible moment — after sign-in or first QotD view,
     not cold launch, matching the rule the iOS lane (`PushRegistrar.swift`)
     follows for the same reason.
   - Forward `onRequestPermissionsResult` for `PushTokenRegistrar.PERMISSION_REQUEST_CODE`
     to `PushTokenRegistrar.fetchAndRegister(...)`.
   - Replace the placeholder small icon
     (`android.R.drawable.ic_dialog_info`) with a real notification icon from
     `android/app/src/main/res/`.

## 4. Register the service in the manifest

Add to `android/app/src/main/AndroidManifest.xml`, inside `<application>`:

```xml
<service
    android:name=".core.push.QotdMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

And add the runtime permission declaration (Android 13+):

```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

## 5. Configure the server

1. In the Firebase console, generate a service account key for this project
   (Project settings → Service accounts → Generate new private key). This
   downloads a JSON file with `project_id`, `client_email`, `private_key`, etc.
2. Set `FCM_SERVICE_ACCOUNT` on the server to either:
   - the raw JSON contents of that file, or
   - the same JSON base64-encoded (recommended — avoids newline-mangling in
     most deployment forms; `server/src/fcm.js`'s `readServiceAccount`
     accepts either).
3. Restart the server. `sendFcmAlert` starts sending for real the moment
   `FCM_SERVICE_ACCOUNT` decodes to a valid service account — no other server
   change is required; `server/src/qotdReminders.js` already routes
   `platform: 'android'` device rows to it.
4. Confirm with a test device: register a token via `POST /api/devices`
   (`{ platform: 'android', token: '<fcm-token>' }`), then either wait for the
   next 12:00 Africa/Cairo dispatch or invoke `sendFcmAlert` directly from a
   scratch script pointed at that device row.

## 6. Ship a Play Store release

The permission request and the messaging service only take effect once
students are running a build that includes them — this is an app update, not
a server-only change. Cut a release through the normal Play Store process
once steps 1–4 are done and verified against at least one test device.

## Summary checklist

- [ ] Firebase project created; Android app registered with `com.synapse.android`
- [ ] `google-services.json` added to `android/app/`
- [ ] `com.google.gms.google-services` plugin applied + `firebase-messaging` dependency added
- [ ] `QotdMessagingService.kt` + `PushTokenRegistrar.kt` moved into `src/main/java/.../core/push/` and wired to real config/token values
- [ ] Service registered in `AndroidManifest.xml`; `POST_NOTIFICATIONS` permission declared
- [ ] `FCM_SERVICE_ACCOUNT` set on the server
- [ ] Test send verified against a real device
- [ ] Play Store release shipped
