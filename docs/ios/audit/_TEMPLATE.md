# Port spec — <Feature>

_Audit for the native iOS port of the Connect Cortex student app. iOS work lives in `ios/`. Web reference lives in `src/`. This spec is the source of truth for implementing `<Feature>` on iOS._

## 1. Web behavior inventory
Every student-visible surface, button, gesture, and state of the web feature. Cite `src/...:line`. Include:
- Screens / routes and how they nest.
- Every interactive control and what it does.
- Data model: TypeScript types, storage keys (localStorage / user-state), and API endpoints hit.
- Empty / loading / error / offline states.

## 2. iOS current state
What exists in `ios/` today for this feature (files, types, tests), and exactly what is missing or read-only. Cite `ios/...:line`. If greenfield, say so and name the nearest existing iOS pattern to mirror.

## 3. Gap list (web → iOS)
Bullet list, each a discrete portable unit of work, ordered by dependency.

## 4. Port spec
- **Data layer:** Swift types, where they live (`ios/Synapse/Core/<Area>`), persistence (LocalStore/GRDB vs user-state sync — mirror `StateOwnership.swift` key names exactly), pure + testable.
- **UI:** screens/components under `ios/Synapse/Features/<Area>`, matching the Theme design system (tokens only, `useT`/`strings` for copy, light/warm/dark, RTL).
- **Sync/offline:** how it participates in `SyncEngine` / outbox, if at all.
- **Tests:** the Swift Testing (`@Test`) cases that pin correctness (list them).
- **Suggested build order:** small, independently-committable increments.

## 5. Open questions / blockers
Anything needing an Omar decision or a web-behavior clarification. Flag Telegram-only or server-dependent gaps.
