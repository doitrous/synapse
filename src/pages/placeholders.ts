export interface PlaceholderSpec {
  description: string
  phase: 'Phase 2' | 'Phase 3'
  plan: string[]
}

/** Honest "what this surface will hold" copy, drawn from the product spec, so
 *  every route reads as intentional while the flagship dashboard leads. */
export const PLACEHOLDERS: Record<string, PlaceholderSpec> = {
  // ---- Student -------------------------------------------------------
  '/app/library': {
    description:
      'Every topic and subtopic gathered in one place — consolidated notes, diagrams, and the questions and resources that reference them.',
    phase: 'Phase 2',
    plan: [
      'Organ-system topic tree with nested subtopics',
      'One consolidated note per subtopic — no scattered PDFs',
      'Inline diagrams and anatomical plates',
      'Jump straight to linked questions and resources',
    ],
  },
  '/app/qbank': {
    description:
      'Exam-style questions with worked explanations, each cross-linked back to the library and to source resources.',
    phase: 'Phase 2',
    plan: [
      'Timed and tutor modes with custom sets',
      'Worked explanations with rationale for every option',
      'Reference back to the relevant library subtopic',
      'Difficulty and subject tagging feeding Performance',
    ],
  },
  '/app/practical': {
    description:
      'OSCE stations, clinical reasoning cases, skills sign-off, and lab & imaging interpretation.',
    phase: 'Phase 2',
    plan: [
      'Timed OSCE stations with mark schemes',
      'Branching clinical cases',
      'Skills checklist with supervisor sign-off',
      'Lab values and imaging interpretation drills',
    ],
  },
  '/app/resources': {
    description:
      'Every resource — textbooks, videos, guidelines, and decks — filterable by subject, type, and year.',
    phase: 'Phase 2',
    plan: [
      'Filter by subject, media type, and year',
      'Saved and recently opened shelves',
      'Open a resource in its library context',
      'Faculty-recommended flags',
    ],
  },
  '/app/calendar': {
    description:
      'The university curriculum and your personal study plan in one clean view — kept visually separate, with toggles.',
    phase: 'Phase 2',
    plan: [
      'Curriculum and personal layers, distinct but combined',
      'Toggle each layer on and off',
      'Week and month views',
      'Drag sessions to reshape your plan',
    ],
  },
  '/app/performance': {
    description:
      'Progress by subject and by question type, cohort context through an anonymous leaderboard, and time management.',
    phase: 'Phase 2',
    plan: [
      'Performance by subject',
      'Performance by question type',
      'Anonymous top-performers board for your year',
      'Time-per-question and pacing analysis',
    ],
  },
  '/app/whiteboard': {
    description: 'An infinite canvas to sketch, take notes, and connect ideas together.',
    phase: 'Phase 2',
    plan: [
      'Infinite pan and zoom',
      'Sticky notes, text, and freehand ink',
      'Draw connections between concepts',
      'Export a board or share it',
    ],
  },
  '/app/notebook': {
    description: 'Your written notes, organised and searchable, linked back to the library.',
    phase: 'Phase 2',
    plan: [
      'Rich text notes with tags',
      'Backlinks to library subtopics',
      'Full-text search',
      'Turn a note into review cards',
    ],
  },
  '/app/study-together': {
    description: 'Create a test and solve it together with classmates through a shared link.',
    phase: 'Phase 2',
    plan: [
      'Assemble a shared question set',
      'Invite by link — no accounts required to join',
      'Attempt it live, together',
      'Compare answers and explanations afterward',
    ],
  },
  '/app/billing': {
    description: 'Your plan, invoices, and payment method.',
    phase: 'Phase 2',
    plan: ['Current plan and renewal', 'Invoice history', 'Payment method on file', 'Institutional access'],
  },

  // ---- Admin ---------------------------------------------------------
  '/admin': {
    description:
      'The operational overview: enrolment, content health, engagement, and revenue at a glance.',
    phase: 'Phase 3',
    plan: [
      'Cohort enrolment and activation',
      'Content coverage and gaps',
      'Engagement and at-risk students',
      'Revenue and subscription health',
    ],
  },
  '/admin/academic': {
    description: 'Define years, modules, blocks, and the curriculum map the whole platform hangs on.',
    phase: 'Phase 3',
    plan: ['Years, cohorts, and intakes', 'Modules and teaching blocks', 'Curriculum map and outcomes', 'Term dates and scheduling'],
  },
  '/admin/library': {
    description: 'Author and organise library topics, subtopics, and their consolidated notes.',
    phase: 'Phase 3',
    plan: ['Topic and subtopic structure', 'Rich content authoring', 'Diagram and media embedding', 'Publish and version control'],
  },
  '/admin/questions': {
    description: 'Write, review, and tag question-bank items and their explanations.',
    phase: 'Phase 3',
    plan: ['Item authoring with options and rationale', 'Peer review workflow', 'Subject and difficulty tagging', 'Link items to library and resources'],
  },
  '/admin/practical': {
    description: 'Build OSCE stations, clinical cases, and skills checklists.',
    phase: 'Phase 3',
    plan: ['OSCE station builder with mark schemes', 'Case authoring', 'Skills checklists and sign-off rules', 'Lab & imaging sets'],
  },
  '/admin/resources': {
    description: 'Upload and manage resources and media, and control how they surface.',
    phase: 'Phase 3',
    plan: ['Upload and transcode media', 'Tag by subject, type, and year', 'Recommend and feature', 'Storage and access rules'],
  },
  '/admin/email': {
    description: 'Compose announcements and configure automated student communications.',
    phase: 'Phase 3',
    plan: ['Broadcast and segmented announcements', 'Automated onboarding and reminders', 'Templates', 'Delivery logs'],
  },
  '/admin/payments': {
    description: 'Plans, subscriptions, invoicing, and revenue reporting.',
    phase: 'Phase 3',
    plan: ['Plans and pricing', 'Subscriptions and institutional licences', 'Invoicing and refunds', 'Revenue reporting'],
  },
  '/admin/privacy': {
    description: 'Data-privacy controls, consent, and the student support queue.',
    phase: 'Phase 3',
    plan: ['Consent and data-retention policy', 'Data export and erasure requests', 'Support ticket queue', 'Help-centre content'],
  },
  '/admin/settings': {
    description: 'Institution profile, branding, roles, and platform configuration.',
    phase: 'Phase 3',
    plan: ['Institution profile and branding', 'Roles and permissions', 'Integrations', 'Feature flags'],
  },
  '/admin/audit': {
    description: 'Access logs, security posture, and a full audit trail.',
    phase: 'Phase 3',
    plan: ['Immutable audit trail', 'Access and sign-in logs', 'Security posture checks', 'Alerts and exports'],
  },
}
