/**
 * The client's twin of `server/src/roles.js`.
 *
 * Declared rather than imported: the server module is untyped JavaScript
 * outside `src`, so importing it into app code would put an unchecked file into
 * the Vite bundle and fail `tsc -b`. `adminRoles.test.ts` imports both and
 * asserts they agree — test files are excluded from `tsconfig.app.json` and run
 * on Node, which is where a cross-boundary import belongs.
 *
 * The server is the authority. This exists so a control is never drawn for an
 * action the API would refuse.
 */

export type StoredRole = 'student' | 'reviewer' | 'admin' | 'editor'
export type EffectiveRole = StoredRole | 'super_admin'

export const ROLE_RANK: Record<EffectiveRole, number> = {
  student: 0,
  reviewer: 1,
  admin: 1,
  editor: 2,
  super_admin: 3,
}

export const STORED_ROLES: StoredRole[] = ['student', 'reviewer', 'admin', 'editor']
export const CONSOLE_ROLES: EffectiveRole[] = ['reviewer', 'admin', 'editor', 'super_admin']

/** Editor and above. Reviewer and Admin are given no role-management power. */
const ROLE_MANAGER_RANK = 2

/** How each role is named on screen. Super admin is stated, never offered. */
export const ROLE_LABEL: Record<EffectiveRole, string> = {
  student: 'Student',
  reviewer: 'Reviewer',
  admin: 'Admin',
  editor: 'Editor',
  super_admin: 'Super admin',
}

export function rank(role: string): number {
  return ROLE_RANK[role as EffectiveRole] ?? 0
}

export function hasConsoleAccess(role: string): boolean {
  return rank(role) >= 1
}

export function canSetRole(actorRole: string, targetRole: string, nextRole: string): boolean {
  if (!STORED_ROLES.includes(nextRole as StoredRole)) return false
  if (rank(actorRole) < ROLE_MANAGER_RANK) return false
  return rank(actorRole) > rank(targetRole) && rank(actorRole) > rank(nextRole)
}

export function assignableRoles(actorRole: string, targetRole: string = 'student'): StoredRole[] {
  return STORED_ROLES.filter((role) => canSetRole(actorRole, targetRole, role))
}
