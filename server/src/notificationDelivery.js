/**
 * Delivering admin notification campaigns to a student, server-side.
 *
 * The campaigns live in one `nishany-notification-campaigns-v1` document that
 * every author edits. It is on the student-readable list so the bell can show
 * them — but read whole it hands every student every campaign: the ones turned
 * off, the ones scheduled for next week, and the ones written for another
 * university and year. The client already filters, but a field removed only in
 * the browser has already been delivered.
 *
 * So the same match the browser makes is made here, before delivery: a student
 * receives only the campaigns that are active, due, and addressed to their
 * cohort. Nothing else leaves the server. The per-student preference toggles
 * (review / calendar reminders) are deliberately left to the client — they are
 * device-local and the `automation` field the client needs to apply them is
 * kept intact.
 */

export const NOTIFICATION_CAMPAIGNS_KEY = 'nishany-notification-campaigns-v1'

/** An empty target list means "everyone"; a named one reaches only that cohort. */
function matchesCohort(campaign, profile) {
  const inList = (list, value) => !Array.isArray(list) || list.length === 0 || list.includes(value)
  return inList(campaign.universityIds, profile.universityId)
    && inList(campaign.years, profile.year)
    && inList(campaign.groups, profile.group)
}

/** Immediate and automated always count; a scheduled one waits for its time. */
function isDue(campaign, now) {
  if (campaign.delivery === 'Immediate' || campaign.delivery === 'Automated') return true
  return new Date(campaign.scheduledAt).getTime() <= now
}

/**
 * The campaigns this student should actually receive.
 *
 * `campaigns` is the raw document (anything, since it is author-controlled),
 * `profile` is the caller's cohort, `now` is epoch millis. Returns a new array
 * of only the deliverable campaigns, order preserved.
 */
export function projectCampaignsForStudent(campaigns, profile, now = Date.now()) {
  if (!Array.isArray(campaigns)) return []
  const who = {
    universityId: profile?.universityId ?? null,
    year: profile?.year ?? null,
    group: profile?.group ?? null,
  }
  return campaigns.filter((campaign) =>
    campaign && typeof campaign === 'object'
    && campaign.active === true
    && isDue(campaign, now)
    && matchesCohort(campaign, who))
}
