/**
 * Who outranks whom, and what follows from that.
 *
 * No database, no Express, no imports — the same split `identity.js` makes, for
 * the same reason: rules that need a driver loaded to be tested do not get
 * tested. `auth.js` reads these; the client mirrors them in
 * `src/data/adminRoles.ts` and a parity test holds the two together.
 *
 * `super_admin` is deliberately absent from `STORED_ROLES`. It is derived from
 * the signed-in email, so there is no row to write — which is what makes it
 * neither grantable nor removable, by anyone, including another super admin.
 */

export const ROLE_RANK = {
  student: 0,
  mcq_validator: 0,
  reviewer: 1,
  admin: 1,
  editor: 2,
  super_admin: 3,
}

/** The five values `user_access.role` accepts. Ordered by rank, then by name. */
export const STORED_ROLES = ['student', 'mcq_validator', 'reviewer', 'admin', 'editor']

/** Every role that may open the admin console at all. */
export const CONSOLE_ROLES = ['reviewer', 'admin', 'editor', 'super_admin']

/**
 * The console roles a second factor is forced on, as a consequence of rank.
 *
 * `reviewer` opens the console but is deliberately absent: a reviewer's whole
 * console is Media Requests and Content Reports and it holds no role-management
 * power, so it is no longer required to enrol a second factor. Everyone able to
 * hand out console access — admin and above — still must. `mfaSatisfied` in
 * `auth.js` is the one place this list decides anything.
 */
export const MFA_ENFORCED_ROLES = ['admin', 'editor', 'super_admin']

/** Whether a second factor is mandatory for this role, regardless of opt-in. */
export function mfaEnforced(role) {
  return MFA_ENFORCED_ROLES.includes(role)
}

/**
 * The rank at which somebody may change another account's role.
 *
 * Editor and above. Reviewer and Admin are given no role-management power, so
 * outranking a student is not enough — without this an admin could "set" a
 * student to student, and a reviewer could too. Admin still holds the Users tab
 * and everything else on it; promotion is the one thing that is not theirs.
 */
const ROLE_MANAGER_RANK = 2

export function rank(role) {
  return ROLE_RANK[role] ?? 0
}

export function hasConsoleAccess(role) {
  return rank(role) >= 1
}

/** `SUPER_ADMIN_EMAILS`, split and lowercased. Blank entries are dropped. */
export function parseSuperAdminEmails(raw) {
  return String(raw ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
}

/**
 * The role this identity actually has.
 *
 * The allowlist wins over the row, so a super admin whose row says `student` is
 * still a super admin — there is no state a database edit could put them in
 * that locks them out.
 */
export function effectiveRole(email, storedRole, superAdminEmails) {
  const address = String(email ?? '').trim().toLowerCase()
  if (address && superAdminEmails.includes(address)) return 'super_admin'
  return STORED_ROLES.includes(storedRole) ? storedRole : 'student'
}

/**
 * Whether `actorRole` may change `targetRole` into `nextRole`.
 *
 * Three tests, and every stated rule falls out of them: role management starts
 * at editor; you must outrank the person you are changing; and you must outrank
 * what you are making them. The last is what stops an editor creating a peer it
 * could never demote.
 */
export function canSetRole(actorRole, targetRole, nextRole) {
  if (!STORED_ROLES.includes(nextRole)) return false
  if (rank(actorRole) < ROLE_MANAGER_RANK) return false
  return rank(actorRole) > rank(targetRole) && rank(actorRole) > rank(nextRole)
}

/**
 * The roles this actor may give this target, for a control that cannot lie.
 *
 * Defined in terms of `canSetRole` rather than beside it, so the control can
 * never offer something the route would refuse. Callers drop the target's
 * current role from this list; an empty result is the honest signal that this
 * actor has no role to give this person.
 */
export function assignableRoles(actorRole, targetRole = 'student') {
  return STORED_ROLES.filter((role) => canSetRole(actorRole, targetRole, role))
}
