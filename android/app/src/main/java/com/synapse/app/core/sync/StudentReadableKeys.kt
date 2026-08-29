package com.synapse.app.core.sync

/**
 * The hyphenated, shared/read-only catalogue keys a student pulls in
 * [SyncEngine]'s manifest-diffed refresh. Direct port of the web server's
 * `STUDENT_READABLE_STATE` (`server/src/index.js`) plus `MEDIA_STATE_KEY`
 * (`server/src/mediaLibrary.js`) so a student's catalogue data round-trips
 * identically across web, iOS and Android. All keys are hyphenated (not
 * dotted), so [StateOwnership.isUserOwned] returns false for every one of
 * them — correct, since they route to the read-only `/state/:key` endpoint,
 * not the per-user endpoint.
 */
val STUDENT_READABLE_KEYS: List<String> = listOf(
    "synapse-media-library-v1",
    "synapse-library-trees-v1",
    "synapse-academic-universities-v1",
    "synapse-course-curricula-v1",
    "synapse-module-schedules-v1",
    "synapse-admin-content-ledger-v4",
    "synapse-concept-graph-v2",
    "synapse-relation-types-v1",
    "synapse-taxonomy-tree-v4",
    "synapse-medical-library-taxonomy-v1",
    "synapse-medical-glossary-v1",
    "synapse-medical-evidence-published-v1",
    "synapse-plans-v1",
    "synapse-notification-campaigns-v1",
    "synapse-vouchers-v1",
    "synapse-system-colors-v1",
    "synapse-plan-catalog-v1",
    "synapse-student-id-discount-v1",
    "synapse-storage-limits-v1",
    "synapse-maristana-config-v1",
    "synapse-adaptive-config-v1",
    "synapse-adaptive-blueprints-v1",
    "synapse-adaptive-heldout-v1",
)
