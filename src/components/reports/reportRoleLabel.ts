import type { EffectiveRole } from '@/data/adminRoles'
import type { ReporterRole } from '@/data/contentReports'

/**
 * Client mirror of `reporterRoleLabel` in `server/src/contentReports.js`.
 *
 * The server stamps this on every server-authoritative field (report creation,
 * event actors written from a delta save) — this copy exists only for the two
 * places a report is built or amended locally before the server has answered:
 * the demo build (no server to stamp anything) and the optimistic local event
 * a console action appends before `usePersistentState` saves it. Both must
 * agree with the server's own label, or "who did this" would read differently
 * depending on which path wrote it.
 */
export function reporterRoleLabel(role: EffectiveRole | string | null | undefined): ReporterRole {
  switch (role) {
    case 'reviewer': return 'Reviewer'
    case 'admin': return 'Admin'
    case 'editor': return 'Editor'
    case 'super_admin': return 'Superadmin'
    default: return 'Student'
  }
}
