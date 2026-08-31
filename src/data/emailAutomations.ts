import {
  eyebrowFor, isTransactional, renderEmail, styleBodyHtml,
  type EmailAction, type EmailDetail, type RenderedEmail,
} from './emailTemplate.ts'

/**
 * Automated emails: what triggers them, and what they say.
 *
 * Unlike most demo data these are NOT suppressed in live mode — an automation is
 * configuration, not sample content, and the admin needs to see and edit the real
 * set in production. The list below is the seed; the working copy lives in
 * app_state under EMAIL_AUTOMATIONS_STORAGE_KEY, so toggles and template edits
 * survive a reload.
 *
 * Every message is written as the blocks the wrapper lays out rather than as one
 * run of HTML: a preheader, a title, the paragraphs, at most one action, the facts
 * worth keeping, and a quieter closing note. That split is what makes the rules
 * hold across all of them — one action per email, no empty detail panel, the note
 * never a second button — instead of depending on each author remembering.
 * Placeholders are substituted before sending; see PLACEHOLDERS and fillTemplate.
 */

export type AutomationCategory =
  | 'Onboarding'
  | 'Study & learning'
  | 'Collaboration'
  | 'Billing & subscription'
  | 'Security & account'
  | 'Privacy & data'
  | 'Operations'

export interface Automation {
  id: string
  name: string
  description: string
  /** What fires it, in the admin's language. */
  trigger: string
  enabled: boolean
  category: AutomationCategory
  audience: 'student' | 'admin'
  /** Subject line. Supports placeholders. */
  subject: string
  /**
   * The grey line beside the subject in the inbox list, around 85 characters.
   * Never repeats the greeting, because that is the line it exists to replace.
   */
  preheader: string
  /** Overrides the title above the body. Empty means the subject, which is the norm. */
  title?: string
  /** The paragraphs, as simple HTML. No call to action, no note, no sign-off. */
  body: string
  /** The one thing this message asks for. Omitted on mail that asks nothing. */
  action?: EmailAction
  /** Facts the reader may want later. Omitted entirely when there are none. */
  details?: EmailDetail[]
  /** The quieter last word, below a hairline. Never a second button. */
  note?: string
}

export const EMAIL_AUTOMATIONS_STORAGE_KEY = 'synapse-email-automations-v1'

/** The order categories are rendered in. */
export const automationCategories: AutomationCategory[] = [
  'Onboarding',
  'Study & learning',
  'Collaboration',
  'Billing & subscription',
  'Security & account',
  'Privacy & data',
  'Operations',
]

/** Every placeholder an automation may use, with the sample used for previews and tests. */
export const PLACEHOLDERS: Record<string, string> = {
  '{{studentName}}': 'Maya',
  '{{universityName}}': 'Kasr Alainy',
  '{{yearName}}': 'Year 3',
  '{{actionUrl}}': 'https://nishany.com/app',
  '{{amount}}': '£69.00',
  '{{planName}}': 'Student — annual',
  '{{date}}': '1 September 2026',
  '{{deviceName}}': 'Chrome on macOS',
  '{{subjectName}}': 'Cardiovascular',
  '{{count}}': '24',
  '{{score}}': '74% · 24 of 32',
}

/** Replace every known placeholder. Unknown ones are left visible on purpose. */
export function fillTemplate(text: string, values: Record<string, string> = PLACEHOLDERS): string {
  return Object.entries(values).reduce((out, [token, value]) => out.split(token).join(value), text)
}

/** Fill every string an automation carries, so a preview fills the same way a send does. */
export function fillAutomation(automation: Automation, values: Record<string, string> = PLACEHOLDERS) {
  return {
    subject: fillTemplate(automation.subject, values),
    preheader: fillTemplate(automation.preheader, values),
    title: automation.title ? fillTemplate(automation.title, values) : undefined,
    body: fillTemplate(automation.body, values),
    action: automation.action
      ? { label: fillTemplate(automation.action.label, values), url: fillTemplate(automation.action.url, values) }
      : undefined,
    details: automation.details?.map((detail) => ({
      label: fillTemplate(detail.label, values),
      value: fillTemplate(detail.value, values),
    })),
    note: automation.note ? fillTemplate(automation.note, values) : undefined,
  }
}

/** Where a reader goes to switch a category off. Per-recipient in a real send. */
export const UNSUBSCRIBE_URL = 'https://nishany.com/unsubscribe?token=preview'

/**
 * One automation, as the message that goes out.
 *
 * The preview, the test send and the real send all come through here, so the
 * rules cannot hold in one of them and lapse in another: the eyebrow is dropped
 * on security mail, and the unsubscribe line appears only on mail the reader is
 * allowed to switch off. Deciding that at each call site is how three surfaces
 * come to disagree about what the same message looks like.
 */
export function renderAutomation(
  automation: Automation,
  { values = PLACEHOLDERS, unsubscribeUrl = UNSUBSCRIBE_URL }: { values?: Record<string, string>; unsubscribeUrl?: string } = {},
): RenderedEmail {
  const filled = fillAutomation(automation, values)
  return renderEmail({
    subject: filled.subject,
    preheader: filled.preheader,
    eyebrow: eyebrowFor(automation.category),
    title: filled.title,
    bodyHtml: styleBodyHtml(filled.body),
    action: filled.action,
    details: filled.details,
    note: filled.note,
    category: automation.category,
    unsubscribeUrl: isTransactional(automation.category) ? undefined : unsubscribeUrl,
  })
}

const URL = '{{actionUrl}}'

export const initialAutomations: Automation[] = [
  /* ---- Onboarding ------------------------------------------------------ */
  {
    id: 'au-verify-email',
    name: 'Confirm your email address',
    description: 'Sent immediately after sign-up so the student can verify their address.',
    trigger: 'On sign-up',
    enabled: true,
    category: 'Onboarding',
    audience: 'student',
    subject: 'Confirm your email address',
    preheader: 'One tap confirms your address and finishes setting up your account.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Confirm your email address to finish setting up your Nishany account. It takes one tap and you will not be asked again.</p>`,
    action: { label: 'Confirm my email', url: URL },
    note: 'If you did not create an account, no address has been confirmed and you can ignore this message.',
  },
  {
    id: 'au-welcome',
    name: 'Welcome to Nishany',
    description: 'The first email a new student receives once their address is confirmed.',
    trigger: 'Email confirmed',
    enabled: true,
    category: 'Onboarding',
    audience: 'student',
    subject: 'Welcome to Nishany',
    preheader: 'Your library is ready, organised the way you study rather than the way it was filed.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your ${'{{universityName}}'} ${'{{yearName}}'} library is ready. Everything is organised the way you study: by system, by discipline, by clinical skill, or straight from your curriculum.</p>`,
    action: { label: 'Open your library', url: URL },
    details: [
      { label: 'University', value: '{{universityName}}' },
      { label: 'Year', value: '{{yearName}}' },
    ],
  },

  /* ---- Study & learning ------------------------------------------------ */
  {
    id: 'au-review-due',
    name: 'A Review is Due',
    description: 'Nudges the student when spaced-repetition reviews come due.',
    trigger: 'Reviews due',
    enabled: true,
    category: 'Study & learning',
    audience: 'student',
    subject: `${'{{count}}'} reviews are ready for you`,
    preheader: 'Reviewing them today is what keeps them in place before the exam.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{count}}'} items are due for review. Reviewing them today is what keeps them in place before the exam — a day late costs more than the review itself.</p>`,
    action: { label: 'Start reviewing', url: URL },
  },
  {
    id: 'au-study-session',
    name: 'Your Planned Study Session',
    description: 'Reminder shortly before a planned study block on the calendar.',
    trigger: '30 min before block',
    enabled: true,
    category: 'Study & learning',
    audience: 'student',
    subject: `${'{{subjectName}}'} starts in 30 minutes`,
    preheader: 'Your planned block is about to start. Everything for it is already open.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your planned block on ${'{{subjectName}}'} starts in 30 minutes. The material for it is already gathered, so there is nothing to set up.</p>`,
    action: { label: 'Open the session', url: URL },
  },
  {
    id: 'au-assessment',
    name: 'Your assessment result is ready',
    description: 'Sent when an assessment has been marked and results are published.',
    trigger: 'Assessment graded',
    enabled: true,
    category: 'Study & learning',
    audience: 'student',
    subject: 'Your assessment result is ready',
    preheader: 'Your assessment has been marked — the breakdown shows what to revisit.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your ${'{{subjectName}}'} assessment has been marked. The breakdown shows which topics to revisit first, and your review schedule has already adjusted to match.</p>`,
    action: { label: 'See your result', url: URL },
    details: [
      { label: 'Subject', value: '{{subjectName}}' },
      { label: 'Score', value: '{{score}}' },
    ],
    note: `Results stay in <a href="${URL}">Performance</a> for the whole year, so there is nothing to save.`,
  },
  {
    id: 'au-schedule-changed',
    name: 'Your Curriculum Schedule Changed',
    description: 'Notifies students when the curriculum calendar is updated.',
    trigger: 'Schedule changed',
    enabled: true,
    category: 'Study & learning',
    audience: 'student',
    subject: 'Your curriculum schedule has changed',
    preheader: 'Your schedule has been updated and your planned blocks have moved to match.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your ${'{{universityName}}'} ${'{{yearName}}'} schedule has been updated. Your planned blocks have moved to match, so nothing you had scheduled is now out of step.</p>`,
    action: { label: 'View the schedule', url: URL },
  },

  /* ---- Collaboration --------------------------------------------------- */
  {
    id: 'au-study-invite',
    name: 'A Nishany Study Invitation',
    description: 'Invites a student to a shared Study Together session.',
    trigger: 'Study invite sent',
    enabled: true,
    category: 'Collaboration',
    audience: 'student',
    subject: `${'{{studentName}}'} invited you to study together`,
    preheader: 'A shared session is waiting for you to join it.',
    body: `<p>Hello,</p><p>${'{{studentName}}'} invited you to a shared session on ${'{{subjectName}}'}. You will both see the same material, and the notes stay with whoever wrote them.</p>`,
    action: { label: 'Join the session', url: URL },
  },

  /* ---- Billing & subscription ------------------------------------------ */
  {
    id: 'au-receipt',
    name: 'Nishany Payment Receipt',
    description: 'Receipt for a successful payment.',
    trigger: 'Payment succeeded',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your Nishany receipt',
    preheader: 'Payment received. Your receipt and billing history are below.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We received ${'{{amount}}'} for ${'{{planName}}'}. Thank you.</p>`,
    action: { label: 'View your billing history', url: URL },
    details: [
      { label: 'Plan', value: '{{planName}}' },
      { label: 'Amount', value: '{{amount}}' },
      { label: 'Date', value: '{{date}}' },
    ],
  },
  {
    id: 'au-payment-attention',
    name: 'Nishany Payment Needs Attention',
    description: 'A payment failed and the student needs to update their method.',
    trigger: 'Payment failed',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your payment needs attention',
    preheader: 'A payment did not go through. Your access continues while you update it.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We could not take ${'{{amount}}'} for ${'{{planName}}'}. Your access continues for now — updating your payment method keeps it that way.</p>`,
    action: { label: 'Update payment method', url: URL },
    details: [
      { label: 'Plan', value: '{{planName}}' },
      { label: 'Amount', value: '{{amount}}' },
    ],
    note: 'Nothing is lost while this is outstanding. Your notes, reviews and history stay exactly where they are.',
  },
  {
    id: 'au-renewal',
    name: 'Upcoming Nishany Renewal',
    description: 'Reminder ahead of an automatic renewal.',
    trigger: '3 days to renewal',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: `Your Nishany plan renews on ${'{{date}}'}`,
    preheader: 'Your plan renews automatically. No action is needed to continue.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{planName}}'} renews on ${'{{date}}'} at ${'{{amount}}'}. No action is needed to continue.</p>`,
    action: { label: 'Manage your plan', url: URL },
    details: [
      { label: 'Plan', value: '{{planName}}' },
      { label: 'Renews', value: '{{date}}' },
      { label: 'Amount', value: '{{amount}}' },
    ],
  },
  {
    id: 'au-trial-ending',
    name: 'Your Nishany Trial is Ending',
    description: 'Reminder that a free trial is about to end.',
    trigger: '2 days to trial end',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your trial ends in 2 days',
    preheader: 'Choosing a plan keeps your library, notes and review history as they are.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your trial ends on ${'{{date}}'}. Choosing a plan keeps your library, notes and review history exactly as they are.</p>`,
    action: { label: 'Choose a plan', url: URL },
    details: [{ label: 'Trial ends', value: '{{date}}' }],
  },
  {
    id: 'au-sub-cancelled',
    name: 'Nishany Subscription cancelled',
    description: 'Confirms a subscription has been cancelled.',
    trigger: 'Subscription cancelled',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your Nishany subscription is cancelled',
    preheader: 'Cancelled and will not renew. Your access continues until the date below.',
    // No action: a cancellation confirmation that pitches is a cancellation
    // confirmation the reader does not trust.
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{planName}}'} is cancelled and will not renew.</p>`,
    details: [
      { label: 'Plan', value: '{{planName}}' },
      { label: 'Access until', value: '{{date}}' },
    ],
    note: 'Your notes and review history stay saved, so coming back later picks up where you left off.',
  },
  // Off until the flows behind them exist — an automation that can never fire
  // should not sit in the list looking active.
  {
    id: 'au-grace',
    name: 'Your Nishany Grace Period Started',
    description: 'A failed payment has entered its grace period before access is limited.',
    trigger: 'Grace period started',
    enabled: false,
    category: 'Billing & subscription',
    audience: 'student',
    subject: `Your access continues until ${'{{date}}'}`,
    preheader: 'A second attempt did not go through. Access continues while you update it.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We still could not take ${'{{amount}}'}. Your access continues until ${'{{date}}'} while you update your details.</p>`,
    action: { label: 'Update payment method', url: URL },
    details: [
      { label: 'Amount', value: '{{amount}}' },
      { label: 'Access until', value: '{{date}}' },
    ],
  },
  {
    id: 'au-refund',
    name: 'Nishany Refund Update',
    description: 'Status update on a requested refund.',
    trigger: 'Refund processed',
    enabled: false,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your refund has been processed',
    preheader: 'The refund has left us. Banks usually take a few working days to show it.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{amount}}'} has been refunded to your original payment method.</p>`,
    details: [
      { label: 'Amount', value: '{{amount}}' },
      { label: 'Refunded to', value: 'Original payment method' },
    ],
    note: 'Banks usually take a few working days to show it, so it may not appear straight away.',
  },
  {
    id: 'au-dispute',
    name: 'Payment Dispute Reported',
    description: 'Notifies of a reported payment dispute or chargeback.',
    trigger: 'Dispute opened',
    enabled: false,
    category: 'Billing & subscription',
    audience: 'admin',
    subject: `Payment dispute opened — ${'{{amount}}'}`,
    preheader: 'A dispute needs evidence submitted before the processor deadline.',
    body: `<p>A dispute was opened for ${'{{amount}}'} on ${'{{planName}}'}. Evidence has to be submitted before the processor's deadline or the dispute is lost by default.</p>`,
    action: { label: 'Open in Payments', url: URL },
    details: [
      { label: 'Amount', value: '{{amount}}' },
      { label: 'Plan', value: '{{planName}}' },
    ],
  },

  /* ---- Security & account ---------------------------------------------- */
  // No eyebrow on any of these: the title is already the whole point, and a
  // category label above it only delays the sentence the reader opened for.
  {
    id: 'au-password-reset',
    name: 'Reset your password',
    description: 'Sent when a student requests a password reset.',
    trigger: 'Password reset requested',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'Reset your Nishany password',
    preheader: 'Choose a new password. The link expires one hour after it was sent.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Use the button below to choose a new password. It expires in one hour, and it works once.</p>`,
    action: { label: 'Reset my password', url: URL },
    note: 'If you did not ask for this, no change has been made and you can ignore this message.',
  },
  {
    id: 'au-new-signin',
    name: 'New Nishany Sign-In from a New Device',
    description: 'Alerts on a sign-in from an unrecognised device.',
    trigger: 'New device sign-in',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'New sign-in to your account',
    preheader: 'A sign-in from a device we have not seen before. Details are below.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your account was signed in to from a device we have not seen before. If that was you, there is nothing to do — keep this as the record.</p>`,
    action: { label: 'Secure my account', url: URL },
    details: [
      { label: 'Device', value: '{{deviceName}}' },
      { label: 'When', value: '{{date}}' },
    ],
    note: 'If it was not you, use the button above now: change your password and sign out every other device.',
  },
  {
    id: 'au-2fa-added',
    name: 'A 2-Factor Authentication was Added to Your Account',
    description: 'Confirms two-factor authentication was enabled.',
    trigger: '2FA enabled',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'Two-factor authentication is on',
    preheader: 'You will be asked for a code the next time you sign in.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Two-factor authentication is now enabled on your account. You will be asked for a code the next time you sign in.</p>`,
    action: { label: 'Review my security', url: URL },
    note: 'If this was not you, use the button above straight away — someone else has access to your account.',
  },
  {
    id: 'au-2fa-removed',
    name: 'A 2-Factor Authentication was Removed From Your Account',
    description: 'Confirms two-factor authentication was disabled.',
    trigger: '2FA disabled',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'Two-factor authentication is off',
    preheader: 'Your account is now protected by its password alone.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Two-factor authentication has been turned off on your account. It is now protected by its password alone.</p>`,
    action: { label: 'Review my security', url: URL },
    note: 'If this was not you, use the button above straight away — someone else has access to your account.',
  },
  {
    id: 'au-security-changed',
    name: 'Your Nishany Security Changed',
    description: 'Confirms a change to account security settings.',
    trigger: 'Security setting changed',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'A security setting changed',
    preheader: 'A change was made to how your account is protected. Details are below.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>A security setting on your account was changed. If that was you, there is nothing to do.</p>`,
    action: { label: 'Review my security', url: URL },
    details: [
      { label: 'Device', value: '{{deviceName}}' },
      { label: 'When', value: '{{date}}' },
    ],
    note: 'If it was not you, use the button above now and change your password.',
  },
  {
    id: 'au-support',
    name: 'Nishany Support Update',
    description: 'Update on a support ticket the student raised.',
    trigger: 'Support ticket updated',
    // Student-facing, so it belongs with the student's own account mail rather
    // than under the admin Operations alerts it used to sit in.
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'Update on your support request',
    preheader: 'We have replied to the support request you raised.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We have replied to your support request. The full thread is in your account, so you can answer from there.</p>`,
    action: { label: 'Read the reply', url: URL },
  },

  /* ---- Privacy & data --------------------------------------------------- */
  {
    id: 'au-export',
    name: 'Your Nishany Export is Ready',
    description: 'A requested data export is ready to download.',
    trigger: 'Export completed',
    enabled: true,
    category: 'Privacy & data',
    audience: 'student',
    subject: 'Your data export is ready',
    preheader: 'The export you asked for is ready. The download link works for seven days.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>The export you asked for is ready. It contains everything held on your account, in a format you can open without Nishany.</p>`,
    action: { label: 'Download my data', url: URL },
    note: 'The link works for seven days, after which you can request the export again at any time.',
  },
  {
    id: 'au-privacy',
    name: 'Nishany Privacy Request Update',
    description: 'Update on a privacy or data request (access, deletion).',
    trigger: 'Privacy request updated',
    enabled: true,
    category: 'Privacy & data',
    audience: 'student',
    subject: 'Update on your privacy request',
    preheader: 'There is an update on the privacy request you submitted.',
    body: `<p>Hello ${'{{studentName}}'},</p><p>There is an update on the privacy request you submitted. It sets out what has been done and what happens next.</p>`,
    action: { label: 'View the update', url: URL },
  },

  /* ---- Operations (admin-facing) ---------------------------------------- */
  {
    id: 'au-review-assigned',
    name: 'A Nishany Review is Assigned',
    description: 'Assigns a content review task to a reviewer.',
    trigger: 'Review assigned',
    enabled: true,
    category: 'Operations',
    audience: 'admin',
    subject: `${'{{count}}'} items assigned for review`,
    preheader: 'Items are waiting on your review before they can be published.',
    body: `<p>${'{{count}}'} items in ${'{{subjectName}}'} are waiting on your review. Nothing in the batch is published to students until it clears.</p>`,
    action: { label: 'Open the review queue', url: URL },
    details: [
      { label: 'Subject', value: '{{subjectName}}' },
      { label: 'Items', value: '{{count}}' },
    ],
  },
  {
    id: 'au-incident',
    name: 'Nishany Operational Incident',
    description: 'Alerts admins to an operational incident.',
    trigger: 'Incident opened',
    enabled: true,
    category: 'Operations',
    audience: 'admin',
    subject: 'Operational incident opened',
    preheader: 'An incident has been opened and is waiting for an owner.',
    body: `<p>An operational incident has been opened. It stays open, and unowned, until somebody takes it.</p>`,
    action: { label: 'View the incident', url: URL },
  },
  {
    id: 'au-provider-outage',
    name: 'Nishany Provider Outage',
    description: 'Notifies of a third-party provider outage affecting service.',
    trigger: 'Provider outage',
    enabled: true,
    category: 'Operations',
    audience: 'admin',
    subject: 'Third-party provider outage',
    preheader: 'A provider outage is affecting Nishany. Status is below.',
    body: `<p>A provider outage is affecting Nishany. Students may see failures in whatever depends on it until the provider recovers.</p>`,
    action: { label: 'View status', url: URL },
  },
]

/* ---- Reading the older shape --------------------------------------------- */

/**
 * An automation as it was stored before the layout had blocks.
 *
 * Saved admin edits live in app_state and outlive any change here, so a record
 * written against the old shape — one `body` carrying the greeting, the call to
 * action as a bare link, the caveat and the sign-off all in a single run — has to
 * keep working. Reading it back into blocks is what lets an edited template gain
 * the new layout instead of losing its button to it.
 */
interface LegacyAutomation extends Omit<Automation, 'preheader' | 'action' | 'note'> {
  preheader?: string
  action?: EmailAction
  note?: string
}

const SIGN_OFF = /^—\s*The .* team$/
/** A caveat rather than a statement: the line that belongs under the hairline. */
const CAVEAT = /^If (you did not|this was not|it was not|that was not)\b/i
/** A paragraph that is nothing but one link is the call to action. */
const LONE_LINK = /^<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>$/i

/**
 * Bring one stored automation up to the current shape.
 *
 * Anything already carrying blocks is left alone. Anything that is not has its
 * body read apart: the lone-link paragraph becomes the action, a trailing caveat
 * becomes the note, the sign-off is dropped because the wrapper now supplies it
 * outside the card, and what is left stays the body.
 */
export function normaliseAutomation(stored: LegacyAutomation): Automation {
  const seed = initialAutomations.find((entry) => entry.id === stored.id)
  // The preheader is the marker: every record written against the current shape
  // carries one, and no record written against the older shape can. Keying off
  // the action instead would misread an admin who deliberately removed a button
  // as an old record, and hand it straight back to them.
  if (typeof stored.preheader === 'string') return stored as Automation

  const paragraphs = [...stored.body.matchAll(/<p>([\s\S]*?)<\/p>/gi)].map((match) => match[1].trim())
  // A body that was never a run of paragraphs is left exactly as authored; only
  // the blocks it plainly lacks are taken from the seed.
  if (paragraphs.length === 0) {
    return { ...stored, preheader: stored.preheader ?? seed?.preheader ?? '', action: seed?.action, details: seed?.details, note: seed?.note }
  }

  let action: EmailAction | undefined
  let note: string | undefined
  const kept: string[] = []

  paragraphs.forEach((paragraph) => {
    const link = paragraph.match(LONE_LINK)
    if (link && !action) { action = { url: link[1], label: link[2].replace(/<[^>]+>/g, '').trim() }; return }
    if (SIGN_OFF.test(paragraph.replace(/<[^>]+>/g, '').trim())) return
    if (CAVEAT.test(paragraph.replace(/<[^>]+>/g, '').trim())) { note = paragraph; return }
    kept.push(paragraph)
  })

  return {
    ...stored,
    preheader: stored.preheader ?? seed?.preheader ?? '',
    body: kept.map((paragraph) => `<p>${paragraph}</p>`).join(''),
    action: action ?? seed?.action,
    details: stored.details ?? seed?.details,
    note,
  }
}

/** Every stored automation, read into the current shape. */
export function normaliseAutomations(stored: LegacyAutomation[]): Automation[] {
  return stored.map(normaliseAutomation)
}
