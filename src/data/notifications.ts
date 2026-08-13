import type { AudienceProfile } from './vouchers'

export type NotificationDelivery = 'Immediate' | 'Scheduled' | 'Automated'
export type NotificationAutomation = 'None' | 'Before calendar event' | 'Review becomes due' | 'New content published' | 'Weekly progress summary'

export interface NotificationCampaign {
  id: string
  title: string
  message: string
  to: string
  active: boolean
  delivery: NotificationDelivery
  scheduledAt: string
  automation: NotificationAutomation
  leadMinutes: number
  universityIds: string[]
  years: string[]
  groups: string[]
  createdAt: string
  sentAt?: string
}

export const NOTIFICATION_STORAGE_KEY = 'synapse-notification-campaigns-v1'
export const NOTIFICATION_READ_STORAGE_KEY = 'synapse-notification-read-v1'

export const initialNotificationCampaigns: NotificationCampaign[] = [
  {
    id: 'notification-review-window',
    title: 'Review window opens today',
    message: 'Acute coronary syndromes · 24 questions are ready for review.',
    to: '/app/qbank?topics=cvs',
    active: true,
    delivery: 'Immediate',
    scheduledAt: new Date(2026, 7, 3, 8, 0).toISOString(),
    automation: 'None',
    leadMinutes: 0,
    universityIds: ['oms'],
    years: ['Year 3'],
    groups: [],
    createdAt: new Date(2026, 7, 2, 14, 0).toISOString(),
    sentAt: new Date(2026, 7, 3, 8, 0).toISOString(),
  },
  {
    id: 'notification-study-block',
    title: 'Study block starts in 30 minutes',
    message: 'Heart failure pharmacology · 45 minutes.',
    to: '/app/calendar',
    active: true,
    delivery: 'Automated',
    scheduledAt: new Date(2026, 7, 3, 18, 30).toISOString(),
    automation: 'Before calendar event',
    leadMinutes: 30,
    universityIds: [],
    years: ['Year 3'],
    groups: ['Cardiovascular block'],
    createdAt: new Date(2026, 7, 1, 12, 0).toISOString(),
  },
]

/**
 * Whether this campaign was addressed to this student.
 *
 * An empty list means "everyone", so an untargeted campaign reaches a student
 * whose profile is still incomplete. A campaign that does name universities,
 * years or groups reaches nobody we cannot place — which is the right way round
 * for a message written for one cohort.
 */
export function notificationMatchesStudent(notification: NotificationCampaign, profile: AudienceProfile) {
  return notification.active
    && (notification.universityIds.length === 0 || notification.universityIds.includes(profile.universityId))
    && (notification.years.length === 0 || notification.years.includes(profile.year))
    && (notification.groups.length === 0 || notification.groups.includes(profile.group))
}

/**
 * Whether the student has asked to see this kind of notice.
 *
 * The Account page has always offered these two toggles and nothing has ever
 * read them. A preference that changes nothing is worse than no preference, so
 * the bell now honours them.
 */
export function notificationAllowedByPrefs(
  notification: NotificationCampaign,
  prefs: { reviewReminders: boolean; calendarReminders: boolean },
): boolean {
  if (notification.automation === 'Review becomes due') return prefs.reviewReminders
  if (notification.automation === 'Before calendar event') return prefs.calendarReminders
  return true
}

export function notificationIsDue(notification: NotificationCampaign) {
  if (notification.delivery === 'Immediate') return true
  if (notification.delivery === 'Automated') return true
  return new Date(notification.scheduledAt).getTime() <= Date.now()
}
