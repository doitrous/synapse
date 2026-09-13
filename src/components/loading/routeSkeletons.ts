/** Explicit loading contracts for every mounted page; aliases share their destination. */
export type PageShape = 'dashboard' | 'calendar' | 'qbank' | 'question' | 'tools' | 'practice' | 'minigames' | 'game-library' | 'game-round' | 'flashcards' | 'flashcard-editor' | 'flashcard-study' | 'terminology' | 'resources' | 'reader' | 'notebook' | 'whiteboard' | 'atlas' | 'rooms' | 'room' | 'tutorial' | 'account' | 'performance' | 'university' | 'practical' | 'oral' | 'skills' | 'essays' | 'histology' | 'adaptive' | 'hospital' | 'table' | 'editor' | 'settings' | 'report' | 'import' | 'mail' | 'academic' | 'validator' | 'landing' | 'pricing' | 'legal' | 'contact' | 'auth' | 'message'
export interface LoadingLayout { shape: PageShape; description?: boolean; actions?: number; tabs?: number; metrics?: number; fields?: number; columns?: number }
export const STUDENT_LOADING_LAYOUTS = {
  '': { shape: 'dashboard' },
  library: { shape: 'reader' },
  qbank: { shape: 'qbank' },
  qotd: { shape: 'question' },
  adaptive: { shape: 'adaptive' },
  resources: { shape: 'resources' },
  terminology: { shape: 'terminology' },
  taxonomy: { shape: 'terminology' },
  'term-grid': { shape: 'game-round' },
  'term-match': { shape: 'game-round' },
  spotter: { shape: 'game-round' },
  'clinical-sequence': { shape: 'game-round' },
  'mechanism-chain': { shape: 'game-round' },
  'red-flag-sort': { shape: 'game-round' },
  maristanas: { shape: 'hospital' },
  minigames: { shape: 'minigames' },
  practical: { shape: 'practical' },
  oral: { shape: 'oral' },
  skills: { shape: 'skills' },
  histology: { shape: 'histology' },
  flashcards: { shape: 'flashcards' },
  essays: { shape: 'essays' },
  calendar: { shape: 'calendar' },
  university: { shape: 'university' },
  performance: { shape: 'performance' },
  whiteboard: { shape: 'whiteboard' },
  notebook: { shape: 'notebook' },
  tutorial: { shape: 'tutorial' },
  'study-rooms': { shape: 'rooms' },
  'clinical-practice': { shape: 'practice' },
  'study-tools': { shape: 'tools' },
  'anatomy-atlas': { shape: 'atlas' },
  account: { shape: 'account' },
} as const satisfies Record<string, LoadingLayout>
export const ADMIN_LOADING_LAYOUTS = {
  '': { shape: 'report', metrics: 4 },
  academic: { shape: 'academic', description: true, actions: 2 },
  library: { shape: 'table', description: true, metrics: 4, tabs: 4, actions: 2 },
  content: { shape: 'table', description: true, metrics: 4, tabs: 4, actions: 2 },
  questions: { shape: 'table', description: true, metrics: 4, tabs: 4, actions: 2 },
  practical: { shape: 'table', description: true, metrics: 4, tabs: 3, actions: 2 },
  flashcards: { shape: 'table', description: true, metrics: 4, actions: 2 },
  written: { shape: 'table', description: true, metrics: 4, actions: 2 },
  histology: { shape: 'table', description: true, metrics: 4, actions: 2 },
  resources: { shape: 'table', description: true, metrics: 4, actions: 2 },
  concepts: { shape: 'table', description: true, actions: 2 },
  relationships: { shape: 'editor', description: true, actions: 2 },
  // The consolidated console mounts Concepts and Relationships as one route
  // (KnowledgeGraph) — two editors over one graph document.
  knowledge: { shape: 'editor', description: true, actions: 2 },
  taxonomy: { shape: 'academic', description: true, metrics: 5, actions: 2 },
  glossary: { shape: 'editor', description: true, actions: 2 },
  escalations: { shape: 'editor', description: true },
  reports: { shape: 'editor', description: true, metrics: 4 },
  tutorial: { shape: 'tutorial', description: true },
  legal: { shape: 'editor', description: true },
  students: { shape: 'academic', description: true, actions: 2 },
  users: { shape: 'editor', description: true, metrics: 4 },
  notifications: { shape: 'editor', description: true },
  vouchers: { shape: 'editor', description: true },
  payments: { shape: 'report', description: true, metrics: 5 },
  email: { shape: 'editor', description: true, tabs: 3 },
  mailbox: { shape: 'mail', description: true },
  privacy: { shape: 'settings', description: true, fields: 4, columns: 2 },
  settings: { shape: 'settings', description: true, tabs: 4, fields: 6, columns: 2 },
  assistant: { shape: 'settings', description: true, fields: 6 },
  access: { shape: 'table', description: true, columns: 5 },
  audit: { shape: 'report', description: true, metrics: 4 },
  adaptive: { shape: 'settings', description: true, tabs: 4, fields: 8, columns: 2 },
  validation: { shape: 'report', description: true, metrics: 5 },
  analytics: { shape: 'report', description: true, metrics: 4 },
  'academic/marks': { shape: 'academic', description: true },
  'academic/intake': { shape: 'import', description: true },
  'library/coverage': { shape: 'table', description: true, metrics: 4 },
  'library/media': { shape: 'table', description: true, metrics: 3, tabs: 3 },
} as const satisfies Record<string, LoadingLayout>
export const PUBLIC_LOADING_LAYOUTS: Record<string, LoadingLayout> = {
  '/': { shape: 'landing' }, '/en': { shape: 'landing' }, '/ar': { shape: 'landing' },
  '/pricing': { shape: 'pricing' }, '/ar/pricing': { shape: 'pricing' }, '/en/pricing': { shape: 'pricing' },
  '/terms': { shape: 'legal' }, '/privacy': { shape: 'legal' }, '/accessibility': { shape: 'legal' }, '/refund-policy': { shape: 'legal' },
  '/contact': { shape: 'contact' }, '/login': { shape: 'auth', fields: 2 }, '/signup': { shape: 'auth', fields: 5 },
  '/auth/forgot-password': { shape: 'auth', fields: 1 }, '/auth/reset-password': { shape: 'auth', fields: 2 },
  '/auth/complete-profile': { shape: 'auth', fields: 4 }, '/auth/verify-email': { shape: 'auth', fields: 1 }, '/auth/mfa': { shape: 'auth', fields: 2 },
  '/logout': { shape: 'message' }, '/unsubscribe': { shape: 'message' }, '/validator': { shape: 'validator' },
}
const ALIASES: Record<string, string> = { plan: 'calendar', learn: 'library', practice: 'qbank', revise: 'study-tools', 'study-together': 'study-rooms', billing: 'account', 'question-notes': 'notebook' }
export function loadingLayoutFor(pathname: string, search = ''): LoadingLayout {
  const path = pathname.replace(/\/$/, '') || '/'
  const params = new URLSearchParams(search)
  if (path === '/app' || path.startsWith('/app/')) {
    const suffix = path.slice(5), key = ALIASES[suffix] ?? suffix
    if (key.startsWith('resources/')) return { shape: 'reader' }
    const config = (STUDENT_LOADING_LAYOUTS as Record<string, LoadingLayout>)[key]
    if (!config) return { shape: 'message' }
    if (config.shape === 'game-library' && params.has('set')) return { shape: 'game-round' }
    if (key === 'study-rooms' && (params.has('room') || params.has('party'))) return { shape: 'room' }
    return config
  }
  if (path === '/admin' || path.startsWith('/admin/')) {
    const key = path.slice(7)
    if (key.startsWith('import/') || key.endsWith('/import')) return { shape: 'import', description: true }
    return (ADMIN_LOADING_LAYOUTS as Record<string, LoadingLayout>)[key] ?? { shape: 'message' }
  }
  if (path.startsWith('/s/')) return { shape: 'reader' }
  return PUBLIC_LOADING_LAYOUTS[path] ?? { shape: 'message' }
}
