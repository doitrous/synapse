/**
 * Automated emails: what triggers them, and what they say.
 *
 * Unlike most demo data these are NOT suppressed in live mode — an automation is
 * configuration, not sample content, and the admin needs to see and edit the real
 * set in production. The list below is the seed; the working copy lives in
 * app_state under EMAIL_AUTOMATIONS_STORAGE_KEY, so toggles and template edits
 * survive a reload.
 *
 * Bodies are deliberately plain: short, transactional, no marketing scaffolding.
 * Placeholders are substituted before sending — see PLACEHOLDERS and fillTemplate.
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
  /** Body, as simple HTML. Supports placeholders. */
  body: string
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

/** Every placeholder an automation body may use, with the sample used for tests. */
export const PLACEHOLDERS: Record<string, string> = {
  '{{studentName}}': 'Maya',
  '{{universityName}}': 'Kasr Alainy',
  '{{yearName}}': 'Year 3',
  '{{actionUrl}}': 'https://synapse.doitrous.com/app',
  '{{amount}}': '£69.00',
  '{{planName}}': 'Student — annual',
  '{{date}}': '1 September 2026',
  '{{deviceName}}': 'Chrome on macOS',
  '{{subjectName}}': 'Cardiovascular',
  '{{count}}': '24',
}

/** Replace every known placeholder. Unknown ones are left visible on purpose. */
export function fillTemplate(text: string, values: Record<string, string> = PLACEHOLDERS): string {
  return Object.entries(values).reduce((out, [token, value]) => out.split(token).join(value), text)
}

const sign = '<p>— The Synapse team</p>'

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
    body: `<p>Hello ${'{{studentName}}'},</p><p>Confirm your email address to finish setting up your Synapse account.</p><p><a href="${'{{actionUrl}}'}">Confirm my email</a></p><p>If you did not create an account, you can ignore this message.</p>${sign}`,
  },
  {
    id: 'au-welcome',
    name: 'Welcome to Synapse',
    description: 'The first email a new student receives once their address is confirmed.',
    trigger: 'Email confirmed',
    enabled: true,
    category: 'Onboarding',
    audience: 'student',
    subject: 'Welcome to Synapse',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your ${'{{universityName}}'} ${'{{yearName}}'} library is ready. Everything is organised the way you study: by system, by discipline, by clinical skill, or straight from your curriculum.</p><p><a href="${'{{actionUrl}}'}">Open your library</a></p>${sign}`,
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
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{count}}'} items are due for review. Reviewing them today is what keeps them in place before the exam.</p><p><a href="${'{{actionUrl}}'}">Start reviewing</a></p>${sign}`,
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
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your planned block on ${'{{subjectName}}'} starts in 30 minutes.</p><p><a href="${'{{actionUrl}}'}">Open the session</a></p>${sign}`,
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
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your ${'{{subjectName}}'} assessment has been marked. The breakdown shows which topics to revisit first.</p><p><a href="${'{{actionUrl}}'}">See your result</a></p>${sign}`,
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
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your ${'{{universityName}}'} ${'{{yearName}}'} schedule has been updated. Your planned blocks have moved to match.</p><p><a href="${'{{actionUrl}}'}">View the schedule</a></p>${sign}`,
  },

  /* ---- Collaboration --------------------------------------------------- */
  {
    id: 'au-study-invite',
    name: 'A Synapse Study Invitation',
    description: 'Invites a student to a shared Study Together session.',
    trigger: 'Study invite sent',
    enabled: true,
    category: 'Collaboration',
    audience: 'student',
    subject: `${'{{studentName}}'} invited you to study together`,
    body: `<p>Hello,</p><p>${'{{studentName}}'} invited you to a shared session on ${'{{subjectName}}'}.</p><p><a href="${'{{actionUrl}}'}">Join the session</a></p>${sign}`,
  },

  /* ---- Billing & subscription ------------------------------------------ */
  {
    id: 'au-receipt',
    name: 'Synapse Payment Receipt',
    description: 'Receipt for a successful payment.',
    trigger: 'Payment succeeded',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your Synapse receipt',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We received ${'{{amount}}'} for ${'{{planName}}'}. Thank you.</p><p><a href="${'{{actionUrl}}'}">View your billing history</a></p>${sign}`,
  },
  {
    id: 'au-payment-attention',
    name: 'Synapse Payment Needs Attention',
    description: 'A payment failed and the student needs to update their method.',
    trigger: 'Payment failed',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your payment needs attention',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We could not take ${'{{amount}}'} for ${'{{planName}}'}. Your access continues for now — updating your payment method keeps it that way.</p><p><a href="${'{{actionUrl}}'}">Update payment method</a></p>${sign}`,
  },
  {
    id: 'au-renewal',
    name: 'Upcoming Synapse Renewal',
    description: 'Reminder ahead of an automatic renewal.',
    trigger: '3 days to renewal',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: `Your Synapse plan renews on ${'{{date}}'}`,
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{planName}}'} renews on ${'{{date}}'} at ${'{{amount}}'}. No action is needed to continue.</p><p><a href="${'{{actionUrl}}'}">Manage your plan</a></p>${sign}`,
  },
  {
    id: 'au-trial-ending',
    name: 'Your Synapse Trial is Ending',
    description: 'Reminder that a free trial is about to end.',
    trigger: '2 days to trial end',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your trial ends in 2 days',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your trial ends on ${'{{date}}'}. Choosing a plan keeps your library, notes and review history exactly as they are.</p><p><a href="${'{{actionUrl}}'}">Choose a plan</a></p>${sign}`,
  },
  {
    id: 'au-sub-cancelled',
    name: 'Synapse Subscription cancelled',
    description: 'Confirms a subscription has been cancelled.',
    trigger: 'Subscription cancelled',
    enabled: true,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your Synapse subscription is cancelled',
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{planName}}'} is cancelled and will not renew. You keep access until ${'{{date}}'}, and your notes stay saved if you come back.</p>${sign}`,
  },
  // Off until the flows behind them exist — an automation that can never fire
  // should not sit in the list looking active.
  {
    id: 'au-grace',
    name: 'Your Synapse Grace Period Started',
    description: 'A failed payment has entered its grace period before access is limited.',
    trigger: 'Grace period started',
    enabled: false,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your access continues until ' + '{{date}}',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We still could not take ${'{{amount}}'}. Your access continues until ${'{{date}}'} while you update your details.</p><p><a href="${'{{actionUrl}}'}">Update payment method</a></p>${sign}`,
  },
  {
    id: 'au-refund',
    name: 'Synapse Refund Update',
    description: 'Status update on a requested refund.',
    trigger: 'Refund processed',
    enabled: false,
    category: 'Billing & subscription',
    audience: 'student',
    subject: 'Your refund has been processed',
    body: `<p>Hello ${'{{studentName}}'},</p><p>${'{{amount}}'} has been refunded to your original payment method. Banks usually take a few working days to show it.</p>${sign}`,
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
    body: `<p>A dispute was opened for ${'{{amount}}'} on ${'{{planName}}'}.</p><p><a href="${'{{actionUrl}}'}">Open in Payments</a></p>`,
  },

  /* ---- Security & account ---------------------------------------------- */
  {
    id: 'au-password-reset',
    name: 'Reset your password',
    description: 'Sent when a student requests a password reset.',
    trigger: 'Password reset requested',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'Reset your Synapse password',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Use the link below to choose a new password. It expires in one hour.</p><p><a href="${'{{actionUrl}}'}">Reset my password</a></p><p>If you did not ask for this, no change has been made and you can ignore this message.</p>${sign}`,
  },
  {
    id: 'au-new-signin',
    name: 'New Synapse Sign-In from a New Device',
    description: 'Alerts on a sign-in from an unrecognised device.',
    trigger: 'New device sign-in',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'New sign-in to your account',
    body: `<p>Hello ${'{{studentName}}'},</p><p>Your account was signed in to from ${'{{deviceName}}'}. If that was you, nothing to do.</p><p>If it was not, <a href="${'{{actionUrl}}'}">secure your account</a> now.</p>${sign}`,
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
    body: `<p>Hello ${'{{studentName}}'},</p><p>Two-factor authentication is now enabled on your account.</p><p>If this was not you, <a href="${'{{actionUrl}}'}">secure your account</a> immediately.</p>${sign}`,
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
    body: `<p>Hello ${'{{studentName}}'},</p><p>Two-factor authentication has been turned off on your account.</p><p>If this was not you, <a href="${'{{actionUrl}}'}">secure your account</a> immediately.</p>${sign}`,
  },
  {
    id: 'au-security-changed',
    name: 'Your Synapse Security Changed',
    description: 'Confirms a change to account security settings.',
    trigger: 'Security setting changed',
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'A security setting changed',
    body: `<p>Hello ${'{{studentName}}'},</p><p>A security setting on your account was changed from ${'{{deviceName}}'}.</p><p>If this was not you, <a href="${'{{actionUrl}}'}">secure your account</a>.</p>${sign}`,
  },

  /* ---- Privacy & data --------------------------------------------------- */
  {
    id: 'au-export',
    name: 'Your Synapse Export is Ready',
    description: 'A requested data export is ready to download.',
    trigger: 'Export completed',
    enabled: true,
    category: 'Privacy & data',
    audience: 'student',
    subject: 'Your data export is ready',
    body: `<p>Hello ${'{{studentName}}'},</p><p>The export you asked for is ready. The link works for seven days.</p><p><a href="${'{{actionUrl}}'}">Download my data</a></p>${sign}`,
  },
  {
    id: 'au-privacy',
    name: 'Synapse Privacy Request Update',
    description: 'Update on a privacy or data request (access, deletion).',
    trigger: 'Privacy request updated',
    enabled: true,
    category: 'Privacy & data',
    audience: 'student',
    subject: 'Update on your privacy request',
    body: `<p>Hello ${'{{studentName}}'},</p><p>There is an update on the privacy request you submitted.</p><p><a href="${'{{actionUrl}}'}">View the update</a></p>${sign}`,
  },

  /* ---- Operations (admin-facing) ---------------------------------------- */
  {
    id: 'au-support',
    name: 'Synapse Support Update',
    description: 'Update on a support ticket the student raised.',
    trigger: 'Support ticket updated',
    // Student-facing, so it belongs with the student's own account mail rather
    // than under the admin Operations alerts it used to sit in.
    enabled: true,
    category: 'Security & account',
    audience: 'student',
    subject: 'Update on your support request',
    body: `<p>Hello ${'{{studentName}}'},</p><p>We have replied to your support request.</p><p><a href="${'{{actionUrl}}'}">Read the reply</a></p>${sign}`,
  },
  {
    id: 'au-review-assigned',
    name: 'A Synapse Review is Assigned',
    description: 'Assigns a content review task to a reviewer.',
    trigger: 'Review assigned',
    enabled: true,
    category: 'Operations',
    audience: 'admin',
    subject: `${'{{count}}'} items assigned for review`,
    body: `<p>${'{{count}}'} items in ${'{{subjectName}}'} are waiting on your review.</p><p><a href="${'{{actionUrl}}'}">Open the review queue</a></p>`,
  },
  {
    id: 'au-incident',
    name: 'Synapse Operational Incident',
    description: 'Alerts admins to an operational incident.',
    trigger: 'Incident opened',
    enabled: true,
    category: 'Operations',
    audience: 'admin',
    subject: 'Operational incident opened',
    body: `<p>An operational incident has been opened.</p><p><a href="${'{{actionUrl}}'}">View the incident</a></p>`,
  },
  {
    id: 'au-provider-outage',
    name: 'Synapse Provider Outage',
    description: 'Notifies of a third-party provider outage affecting service.',
    trigger: 'Provider outage',
    enabled: true,
    category: 'Operations',
    audience: 'admin',
    subject: 'Third-party provider outage',
    body: `<p>A provider outage is affecting Synapse.</p><p><a href="${'{{actionUrl}}'}">View status</a></p>`,
  },
]
