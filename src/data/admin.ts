/* Admin console mock data. Student identities are anonymised (codes), matching
   the platform's privacy stance; staff are named. */

export type Status = 'Published' | 'Draft' | 'In review' | 'Archived'

/* ---- Control dashboard ------------------------------------------------- */

export const overview = {
  activeStudents: 1248,
  newThisMonth: 86,
  contentItems: 3412,
  mrr: 7180,
  openTickets: 14,
  completionRate: 71,
}

export const enrolmentByMonth = [
  { month: 'Mar', students: 1042 },
  { month: 'Apr', students: 1090 },
  { month: 'May', students: 1131 },
  { month: 'Jun', students: 1168 },
  { month: 'Jul', students: 1204 },
  { month: 'Aug', students: 1248 },
]

export const atRiskStudents = [
  { code: 'S-4471', year: 'Year 3', lastActive: '9 days ago', readiness: 38, reason: 'Low activity' },
  { code: 'S-2093', year: 'Year 2', lastActive: '6 days ago', readiness: 44, reason: 'Failing Qbank accuracy' },
  { code: 'S-7752', year: 'Year 3', lastActive: '5 days ago', readiness: 41, reason: 'Missed 3 assessments' },
  { code: 'S-1180', year: 'Year 1', lastActive: '8 days ago', readiness: 47, reason: 'Low activity' },
]

export const contentHealth = [
  { area: 'Library', items: 642, coverage: 88 },
  { area: 'Question Bank', items: 3200, coverage: 74 },
  { area: 'Practical', items: 96, coverage: 61 },
  { area: 'Resources', items: 418, coverage: 92 },
]

export const recentActivity = [
  { id: 'a1', actor: 'Dr Owusu', action: 'published 12 questions in Cardiovascular', when: '18 min ago' },
  { id: 'a2', actor: 'Dr Fielding', action: 'edited Library topic “Acid–base balance”', when: '1 hour ago' },
  { id: 'a3', actor: 'System', action: 'sent “Exam block reminder” to 1,204 students', when: '3 hours ago' },
  { id: 'a4', actor: 'Sr. Patel', action: 'signed off 8 practical skills', when: '5 hours ago' },
  { id: 'a5', actor: 'Dr Owusu', action: 'created OSCE station “Abdominal examination”', when: 'Yesterday' },
]

/* ---- Academic setup ---------------------------------------------------- */

export const academicYears = [
  { year: 'Year 1', students: 312, courses: 6, status: 'Active' },
  { year: 'Year 2', students: 298, courses: 7, status: 'Active' },
  { year: 'Year 3', students: 284, courses: 8, status: 'Active' },
  { year: 'Year 4', students: 201, courses: 5, status: 'Active' },
  { year: 'Year 5', students: 153, courses: 4, status: 'Active' },
]

export const courses = [
  { id: 'c1', name: 'Cardiovascular system', year: 'Year 2', block: 'Block 3', students: 298, lead: 'Dr Owusu', status: 'Published' as Status },
  { id: 'c2', name: 'Respiratory system', year: 'Year 2', block: 'Block 4', students: 298, lead: 'Dr Fielding', status: 'Published' as Status },
  { id: 'c3', name: 'Renal & urinary', year: 'Year 2', block: 'Block 5', students: 291, lead: 'Dr Shah', status: 'Published' as Status },
  { id: 'c4', name: 'Clinical pharmacology', year: 'Year 3', block: 'Block 1', students: 284, lead: 'Dr Owusu', status: 'In review' as Status },
  { id: 'c5', name: 'Neurology', year: 'Year 3', block: 'Block 2', students: 284, lead: 'Dr Mensah', status: 'Draft' as Status },
]

export const termDates = [
  { name: 'Autumn term', start: '22 Sep 2026', end: '12 Dec 2026' },
  { name: 'Spring term', start: '12 Jan 2027', end: '27 Mar 2027' },
  { name: 'Summer term', start: '20 Apr 2027', end: '3 Jul 2027' },
]

/* ---- Content status (Library / Questions / Practical / Resources) ------ */

export const libraryTopicMeta: Record<string, { status: Status; updated: string; author: string }> = {
  hf: { status: 'Published', updated: '2 days ago', author: 'Dr Owusu' },
  acs: { status: 'Published', updated: '5 days ago', author: 'Dr Owusu' },
  asthma: { status: 'Published', updated: '1 week ago', author: 'Dr Fielding' },
  acidbase: { status: 'In review', updated: '1 hour ago', author: 'Dr Shah' },
  diuretics: { status: 'Published', updated: '2 weeks ago', author: 'Dr Owusu' },
  'cranial-nerves': { status: 'Draft', updated: '3 days ago', author: 'Dr Mensah' },
}

export const questionMeta: Record<string, { status: Status; author: string; updated: string; flags: number }> = {
  'q-hf-1': { status: 'Published', author: 'Dr Owusu', updated: '3 days ago', flags: 0 },
  'q-hf-4': { status: 'Published', author: 'Dr Owusu', updated: '3 days ago', flags: 0 },
  'q-acs-1': { status: 'Published', author: 'Dr Fielding', updated: '1 week ago', flags: 1 },
  'q-acs-2': { status: 'In review', author: 'Dr Fielding', updated: '2 hours ago', flags: 0 },
  'q-as-1': { status: 'Published', author: 'Dr Fielding', updated: '2 weeks ago', flags: 0 },
  'q-di-1': { status: 'Published', author: 'Dr Owusu', updated: '1 week ago', flags: 0 },
  'q-ab-1': { status: 'Draft', author: 'Dr Shah', updated: '1 day ago', flags: 0 },
  'q-cn-1': { status: 'In review', author: 'Dr Mensah', updated: '4 hours ago', flags: 2 },
}

export const resourceMeta: Record<string, { sizeMb: number; downloads: number; status: Status }> = {}

export const storage = { usedGb: 214, totalGb: 500 }

/* ---- Email & automations ----------------------------------------------- */

export const campaigns = [
  { id: 'm1', subject: 'Cardiovascular exam block — key dates', status: 'Sent', recipients: 1204, openRate: 68, when: '3 days ago' },
  { id: 'm2', subject: 'New: OSCE practice stations are live', status: 'Sent', recipients: 1180, openRate: 74, when: '1 week ago' },
  { id: 'm3', subject: 'August newsletter', status: 'Scheduled', recipients: 1248, openRate: 0, when: 'in 2 days' },
  { id: 'm4', subject: 'Welcome to your Year 3 curriculum', status: 'Draft', recipients: 284, openRate: 0, when: '—' },
]

export const automations = [
  { id: 'au1', name: 'Onboarding sequence', description: 'Three emails over the first week for new students', trigger: 'On sign-up', enabled: true },
  { id: 'au2', name: 'Due-review nudge', description: 'Reminds students when reviews pile up', trigger: '5+ overdue reviews', enabled: true },
  { id: 'au3', name: 'Inactivity re-engagement', description: 'Checks in after 7 days of no activity', trigger: '7 days inactive', enabled: true },
  { id: 'au4', name: 'Exam countdown', description: 'Weekly readiness summary before an exam block', trigger: '4 weeks to exam', enabled: false },
]

/* ---- Payments & finance ------------------------------------------------ */

export const finance = { mrr: 7180, arr: 86160, activeSubs: 1132, churnPct: 2.4, arpu: 6.34 }

export const revenueByMonth = [
  { month: 'Mar', revenue: 5820 },
  { month: 'Apr', revenue: 6110 },
  { month: 'May', revenue: 6440 },
  { month: 'Jun', revenue: 6720 },
  { month: 'Jul', revenue: 6950 },
  { month: 'Aug', revenue: 7180 },
]

export const plans = [
  { name: 'Student — annual', price: '£69/yr', subs: 842, active: true },
  { name: 'Student — monthly', price: '£8/mo', subs: 214, active: true },
  { name: 'Institutional licence', price: 'Custom', subs: 76, active: true },
]

export const transactions = [
  { id: 'INV-9921', code: 'S-4471', plan: 'Student — annual', amount: '£69.00', status: 'Paid', date: '1 Aug 2026' },
  { id: 'INV-9920', code: 'S-2093', plan: 'Student — monthly', amount: '£8.00', status: 'Paid', date: '1 Aug 2026' },
  { id: 'INV-9919', code: 'S-7752', plan: 'Student — annual', amount: '£69.00', status: 'Refunded', date: '31 Jul 2026' },
  { id: 'INV-9918', code: 'S-1180', plan: 'Student — monthly', amount: '£8.00', status: 'Failed', date: '31 Jul 2026' },
  { id: 'INV-9917', code: 'INST-04', plan: 'Institutional licence', amount: '£2,400.00', status: 'Paid', date: '30 Jul 2026' },
]

/* ---- Privacy & support ------------------------------------------------- */

export const tickets = [
  { id: 'T-3391', subject: 'Cannot access Year 3 question bank', code: 'S-4471', status: 'Open', priority: 'High', age: '2h' },
  { id: 'T-3390', subject: 'Billing — charged twice', code: 'S-2093', status: 'Open', priority: 'High', age: '5h' },
  { id: 'T-3388', subject: 'Request to change registered email', code: 'S-7752', status: 'Pending', priority: 'Normal', age: '1d' },
  { id: 'T-3385', subject: 'Video won’t play on mobile', code: 'S-1180', status: 'Pending', priority: 'Low', age: '2d' },
  { id: 'T-3379', subject: 'Feedback on OSCE mark scheme', code: 'S-5540', status: 'Resolved', priority: 'Low', age: '4d' },
]

export const dataRequests = [
  { id: 'DR-118', type: 'Export', code: 'S-4471', status: 'Completed', date: '29 Jul 2026' },
  { id: 'DR-117', type: 'Erasure', code: 'S-9902', status: 'In progress', date: '31 Jul 2026' },
  { id: 'DR-116', type: 'Export', code: 'S-2093', status: 'Completed', date: '24 Jul 2026' },
]

export const consentSettings = [
  { id: 'cs1', name: 'Analytics cookies', description: 'Product usage analytics, off by default', enabled: false },
  { id: 'cs2', name: 'Study reminders by email', description: 'Students may opt out individually', enabled: true },
  { id: 'cs3', name: 'Data retention: 24 months after graduation', description: 'Automatic erasure schedule', enabled: true },
]

/* ---- Settings ---------------------------------------------------------- */

export const institution = {
  name: 'Osler School of Medicine',
  domain: 'oslermed.ac.uk',
  region: 'United Kingdom',
  contact: 'admin@oslermed.ac.uk',
}

export const roles = [
  { name: 'Administrator', members: 4, description: 'Full access to all settings and data' },
  { name: 'Curriculum lead', members: 9, description: 'Authors and publishes content' },
  { name: 'Faculty', members: 38, description: 'Authors content, signs off skills' },
  { name: 'Support', members: 6, description: 'Handles tickets and data requests' },
]

export const integrations = [
  { name: 'Single sign-on (SAML)', description: 'University identity provider', connected: true },
  { name: 'Stripe', description: 'Payments and subscriptions', connected: true },
  { name: 'Zoom', description: 'Live sessions and recordings', connected: false },
  { name: 'Slack', description: 'Admin alerts and digests', connected: false },
]

export const featureFlags = [
  { id: 'ff1', name: 'Study Together', description: 'Shared live tests', enabled: true },
  { id: 'ff2', name: 'Infinite whiteboard', description: 'Concept-map workspace', enabled: true },
  { id: 'ff3', name: 'AI study suggestions', description: 'Beta — recommended next topics', enabled: false },
]

/* ---- Audit & security -------------------------------------------------- */

export const auditLog = [
  { id: 'e1', time: '10:42', actor: 'Dr Owusu', action: 'Published', target: '12 questions · Cardiovascular', ip: '192.0.2.14' },
  { id: 'e2', time: '10:31', actor: 'admin@osler', action: 'Changed role', target: 'S-5540 → Faculty', ip: '192.0.2.9' },
  { id: 'e3', time: '09:58', actor: 'Dr Fielding', action: 'Edited', target: 'Library · Acid–base balance', ip: '198.51.100.7' },
  { id: 'e4', time: '09:20', actor: 'System', action: 'Exported', target: 'Data request DR-118', ip: '—' },
  { id: 'e5', time: '08:47', actor: 'Sr. Patel', action: 'Signed off', target: '8 practical skills', ip: '203.0.113.22' },
  { id: 'e6', time: '08:12', actor: 'admin@osler', action: 'Sign-in', target: 'Admin console', ip: '192.0.2.9' },
]

export const securityChecks = [
  { name: 'Two-factor authentication for staff', status: 'pass', detail: 'Enforced for all 57 staff accounts' },
  { name: 'Data encryption at rest', status: 'pass', detail: 'AES-256 on all stores' },
  { name: 'Inactive admin sessions', status: 'warn', detail: '2 admin accounts inactive > 90 days' },
  { name: 'Backups', status: 'pass', detail: 'Last verified restore: 3 days ago' },
  { name: 'Password policy', status: 'pass', detail: 'Minimum 12 characters, breach-checked' },
] as const
