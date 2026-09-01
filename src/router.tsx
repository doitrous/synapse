import { lazy, Suspense, useEffect, type ComponentType, type ReactElement } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/shell/AppShell'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { RouteBoundary } from '@/components/shell/RouteBoundary'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { RequireImportKind } from '@/components/auth/RequireImportKind'
import { ADMIN_TAB_VIEWS } from '@/data/adminTabs'
import { useIdentity } from '@/lib/useIdentity'
import { ADMIN_ORIGIN, STUDENT_ORIGIN, isAdminHost, isStudentHost, samePathOn } from '@/lib/portalHost'

/**
 * A route component that can also be fetched before it is rendered, so the
 * chunk is already in memory by the time a click lands on the link.
 */
type Preloadable = ComponentType<Record<string, unknown>> & { preload: () => void }

function lazyNamed(loader: () => Promise<Record<string, unknown>>, exportName: string): Preloadable {
  const component = lazy(async () => ({ default: (await loader())[exportName] as ComponentType<Record<string, unknown>> })) as unknown as Preloadable
  // The browser caches the module, so repeated calls cost one request at most
  // and a failure here is silent: it only means the click pays for it instead.
  component.preload = () => { void loader().catch(() => undefined) }
  return component
}

/**
 * One screen, with both of the things a lazily-loaded screen needs.
 *
 * The boundary is outside the `Suspense`, because the thing it exists to catch
 * is the import itself rejecting — which is what a tab left open across a
 * deployment does the moment it opens a new screen. Inside, `Suspense` would
 * never see the rejection and the route would render blank. `/login` had a
 * message for this only because the router supplies one at the top level;
 * everything under `/app` and `/admin` showed an empty page instead.
 */
function render(Page: ComponentType<Record<string, unknown>>, props: Record<string, unknown> = {}): ReactElement {
  return (
    <RouteBoundary>
      <Suspense fallback={<RouteLoading />}><Page {...props} /></Suspense>
    </RouteBoundary>
  )
}

/**
 * Hand this path to the other portal's origin.
 *
 * `replace` rather than `assign` so the back button returns to wherever the
 * student came from, not to a page that will only bounce them again.
 */
function HandOver({ origin }: { origin: string }): ReactElement {
  useEffect(() => { window.location.replace(samePathOn(origin)) }, [origin])
  return <RouteLoading />
}

const Landing = lazyNamed(() => import('@/pages/Landing'), 'Landing')
const LandingAr = lazyNamed(() => import('@/pages/LandingAr'), 'LandingAr')
const PricingEn = lazyNamed(() => import('@/pages/PricingEn'), 'PricingEn')
const PricingAr = lazyNamed(() => import('@/pages/PricingAr'), 'PricingAr')
const NotFound = lazyNamed(() => import('@/pages/NotFound'), 'NotFound')
const Placeholder = lazyNamed(() => import('@/pages/Placeholder'), 'Placeholder')

const Login = lazyNamed(() => import('@/pages/auth/Login'), 'Login')
const Signup = lazyNamed(() => import('@/pages/auth/Signup'), 'Signup')
const VerifyEmail = lazyNamed(() => import('@/pages/auth/VerifyEmail'), 'VerifyEmail')
const MfaSetup = lazyNamed(() => import('@/pages/auth/MfaSetup'), 'MfaSetup')
const ForgotPassword = lazyNamed(() => import('@/pages/auth/ForgotPassword'), 'ForgotPassword')
const ResetPassword = lazyNamed(() => import('@/pages/auth/ResetPassword'), 'ResetPassword')
const Logout = lazyNamed(() => import('@/pages/auth/Logout'), 'Logout')
const Unsubscribe = lazyNamed(() => import('@/pages/Unsubscribe'), 'Unsubscribe')
const SharedDocument = lazyNamed(() => import('@/pages/SharedDocument'), 'SharedDocument')

const Dashboard = lazyNamed(() => import('@/pages/student/Dashboard'), 'Dashboard')
const Library = lazyNamed(() => import('@/pages/student/Library'), 'Library')
const QuestionBank = lazyNamed(() => import('@/pages/student/QuestionBank'), 'QuestionBank')
const QuestionNotes = lazyNamed(() => import('@/pages/student/QuestionNotes'), 'QuestionNotes')
const AdaptiveStudy = lazyNamed(() => import('@/pages/student/AdaptiveStudy'), 'AdaptiveStudy')
const Resources = lazyNamed(() => import('@/pages/student/Resources'), 'Resources')
const ResourceReader = lazyNamed(() => import('@/pages/student/ResourceReader'), 'ResourceReader')
const MedicalTaxonomy = lazyNamed(() => import('@/pages/student/MedicalTaxonomy'), 'MedicalTaxonomy')
const TermGridPage = lazyNamed(() => import('@/components/termgrid/TermGridPage'), 'TermGridPage')
const SpotterPage = lazyNamed(() => import('@/components/games/SpotterPage'), 'SpotterPage')
const TermMatchPage = lazyNamed(() => import('@/components/games/TermMatchPage'), 'TermMatchPage')
const MinigamesHubPage = lazyNamed(() => import('@/components/games/MinigamesHubPage'), 'MinigamesHubPage')
const ClinicalSequencePage = lazyNamed(() => import('@/components/games/ClinicalSequencePage'), 'ClinicalSequencePage')
const MechanismChainPage = lazyNamed(() => import('@/components/games/MechanismChainPage'), 'MechanismChainPage')
const RedFlagSortPage = lazyNamed(() => import('@/components/games/RedFlagSortPage'), 'RedFlagSortPage')
const Practical = lazyNamed(() => import('@/pages/student/Practical'), 'Practical')
const Flashcards = lazyNamed(() => import('@/pages/student/Flashcards'), 'Flashcards')
const EssayQuestions = lazyNamed(() => import('@/pages/student/EssayQuestions'), 'EssayQuestions')
const CalendarPage = lazyNamed(() => import('@/pages/student/Calendar'), 'CalendarPage')
const UniversityPage = lazyNamed(() => import('@/pages/student/University'), 'University')
const Performance = lazyNamed(() => import('@/pages/student/Performance'), 'Performance')
const Maristanas = lazyNamed(() => import('@/pages/student/Maristanas'), 'Maristanas')
const Whiteboard = lazyNamed(() => import('@/pages/student/Whiteboard'), 'Whiteboard')
const Notebook = lazyNamed(() => import('@/pages/student/Notebook'), 'Notebook')
const Tutorial = lazyNamed(() => import('@/pages/student/Tutorial'), 'Tutorial')
const StudyTogether = lazyNamed(() => import('@/pages/student/StudyTogether'), 'StudyTogether')
const QuestionOfTheDay = lazyNamed(() => import('@/pages/student/QuestionOfTheDay'), 'QuestionOfTheDay')
const Billing = lazyNamed(() => import('@/pages/student/Billing'), 'Billing')
const Account = lazyNamed(() => import('@/pages/student/Account'), 'Account')

const PlatformDashboard = lazyNamed(() => import('@/pages/admin/PlatformDashboard'), 'PlatformDashboard')
const ControlDashboard = lazyNamed(() => import('@/pages/admin/ControlDashboard'), 'ControlDashboard')
const AcademicSetup = lazyNamed(() => import('@/pages/admin/AcademicSetup'), 'AcademicSetup')
const PaymentsFinance = lazyNamed(() => import('@/pages/admin/PaymentsFinance'), 'PaymentsFinance')
const EmailAutomations = lazyNamed(() => import('@/pages/admin/EmailAutomations'), 'EmailAutomations')
const PrivacySupport = lazyNamed(() => import('@/pages/admin/PrivacySupport'), 'PrivacySupport')
const AdminSettings = lazyNamed(() => import('@/pages/admin/Settings'), 'Settings')
const AuditSecurity = lazyNamed(() => import('@/pages/admin/AuditSecurity'), 'AuditSecurity')
const AccessControl = lazyNamed(() => import('@/pages/admin/AccessControl'), 'AccessControl')
const MedicalCoverageReview = lazyNamed(() => import('@/pages/admin/MedicalCoverageReview'), 'MedicalCoverageReview')
const ReportsReview = lazyNamed(() => import('@/pages/admin/ReportsReview'), 'ReportsReview')
const EscalationsQueue = lazyNamed(() => import('@/pages/admin/EscalationsQueue'), 'EscalationsQueue')
const VoucherManagement = lazyNamed(() => import('@/pages/admin/VoucherManagement'), 'VoucherManagement')
const AssistantSetup = lazyNamed(() => import('@/pages/admin/AssistantSetup'), 'AssistantSetup')
const TutorialSetup = lazyNamed(() => import('@/pages/admin/TutorialSetup'), 'TutorialSetup')
const NotificationCampaigns = lazyNamed(() => import('@/pages/admin/NotificationCampaigns'), 'NotificationCampaigns')
const BulkImportPage = lazyNamed(() => import('@/pages/admin/BulkImportPage'), 'BulkImportPage')
const ConceptsSetup = lazyNamed(() => import('@/pages/admin/ConceptsSetup'), 'ConceptsSetup')
const RelationshipsSetup = lazyNamed(() => import('@/pages/admin/RelationshipsSetup'), 'RelationshipsSetup')
const TaxonomySetup = lazyNamed(() => import('@/pages/admin/TaxonomySetup'), 'TaxonomySetup')
const StudentsManagement = lazyNamed(() => import('@/pages/admin/StudentsManagement'), 'StudentsManagement')
const UsersManagement = lazyNamed(() => import('@/pages/admin/UsersManagement'), 'UsersManagement')
const QuestionsSetup = lazyNamed(() => import('@/pages/admin/QuestionsSetup'), 'QuestionsSetup')
const AdaptiveSetup = lazyNamed(() => import('@/pages/admin/AdaptiveSetup'), 'AdaptiveSetup')
const ResourcesSetup = lazyNamed(() => import('@/pages/admin/ResourcesSetup'), 'ResourcesSetup')
const PracticalSetup = lazyNamed(() => import('@/pages/admin/PracticalSetup'), 'PracticalSetup')
const FlashcardsSetup = lazyNamed(() => import('@/pages/admin/FlashcardsSetup'), 'FlashcardsSetup')
const WrittenSetup = lazyNamed(() => import('@/pages/admin/WrittenSetup'), 'WrittenSetup')
const HistologySetup = lazyNamed(() => import('@/pages/admin/HistologySetup'), 'HistologySetup')
const ConceptsImportPage = lazyNamed(() => import('@/pages/admin/ConceptsImportPage'), 'ConceptsImportPage')
const RelationsImportPage = lazyNamed(() => import('@/pages/admin/RelationsImportPage'), 'RelationsImportPage')
const MediaRequests = lazyNamed(() => import('@/pages/admin/MediaRequests'), 'MediaRequests')
const EvidenceImportPage = lazyNamed(() => import('@/pages/admin/EvidenceImportPage'), 'EvidenceImportPage')
const AcademicImportPage = lazyNamed(() => import('@/pages/admin/AcademicImportPage'), 'AcademicImportPage')
const AcademicIntakePage = lazyNamed(() => import('@/pages/admin/AcademicIntakePage'), 'AcademicIntakePage')
const MarksWeights = lazyNamed(() => import('@/pages/admin/MarksWeights'), 'MarksWeights')
const SubjectsImportPage = lazyNamed(() => import('@/pages/admin/SubjectsImportPage'), 'SubjectsImportPage')
const MailBox = lazyNamed(() => import('@/pages/admin/MailBox'), 'MailBox')
const GlossarySetup = lazyNamed(() => import('@/pages/admin/GlossarySetup'), 'GlossarySetup')
const GlossaryImportPage = lazyNamed(() => import('@/pages/admin/GlossaryImportPage'), 'GlossaryImportPage')

const studentPages: Record<string, Preloadable> = {
  library: Library,
  qbank: QuestionBank,
  'question-notes': QuestionNotes,
  adaptive: AdaptiveStudy,
  resources: Resources,
  taxonomy: MedicalTaxonomy,
  'term-grid': TermGridPage,
  spotter: SpotterPage,
  'term-match': TermMatchPage,
  minigames: MinigamesHubPage,
  'clinical-sequence': ClinicalSequencePage,
  'mechanism-chain': MechanismChainPage,
  'red-flag-sort': RedFlagSortPage,
  practical: Practical,
  flashcards: Flashcards,
  essays: EssayQuestions,
  calendar: CalendarPage,
  university: UniversityPage,
  performance: Performance,
  maristanas: Maristanas,
  whiteboard: Whiteboard,
  notebook: Notebook,
  tutorial: Tutorial,
  'study-together': StudyTogether,
  qotd: QuestionOfTheDay,
  billing: Billing,
  account: Account,
}

const studentBuilt: Record<string, ReactElement> = Object.fromEntries(
  Object.entries(studentPages).map(([path, Page]) => [path, render(Page)]),
)

/**
 * Fetch a student route's chunk ahead of the click. Called on hover and focus
 * of a nav link: by the time the pointer travels the last few pixels, or the
 * keyboard user presses Enter, the code has usually already arrived.
 */
export function preloadStudentRoute(to: string): void {
  studentPages[to.replace(/^\/app\/?/, '')]?.preload()
}

const adminBuilt: Record<string, ReactElement> = {
  academic: render(AcademicSetup),
  library: render(ControlDashboard, { initialKind: 'article', lockedKind: true }),
  questions: render(QuestionsSetup),
  adaptive: render(AdaptiveSetup),
  concepts: render(ConceptsSetup),
  relationships: render(RelationshipsSetup),
  taxonomy: render(TaxonomySetup),
  glossary: render(GlossarySetup),
  practical: render(PracticalSetup),
  flashcards: render(FlashcardsSetup),
  written: render(WrittenSetup),
  histology: render(HistologySetup),
  resources: render(ResourcesSetup),
  escalations: render(EscalationsQueue),
  reports: render(ReportsReview),
  tutorial: render(TutorialSetup),
  students: render(StudentsManagement),
  users: render(UsersManagement),
  notifications: render(NotificationCampaigns),
  vouchers: render(VoucherManagement),
  payments: render(PaymentsFinance),
  email: render(EmailAutomations),
  mailbox: render(MailBox),
  privacy: render(PrivacySupport),
  settings: render(AdminSettings),
  audit: render(AuditSecurity),
  access: render(AccessControl),
  assistant: render(AssistantSetup),
}

// Keep mounted routes and preloadable student pages in one registry so a new
// page cannot be linked in navigation while silently falling through to 404.
const studentPaths = Object.keys(studentPages)
const adminPaths = ['academic', 'library', 'questions', 'adaptive', 'concepts', 'relationships', 'taxonomy', 'glossary', 'practical', 'flashcards', 'written', 'histology', 'resources', 'escalations', 'reports', 'tutorial', 'users', 'students', 'notifications', 'vouchers', 'email', 'mailbox', 'payments', 'privacy', 'settings', 'audit', 'assistant', 'access']

const studentRoutes = [
  ...studentPaths.map((path) => ({ path, element: studentBuilt[path] ?? render(Placeholder) })),
  // Reading a source is its own screen, not a modal over the catalogue: it owns
  // the viewport, and it has to be linkable at a page.
  { path: 'resources/:id', element: render(ResourceReader) },
]
/**
 * The tab that owns each admin path.
 *
 * Derived from the same registry the sidebar reads, so a link that is offered
 * and a page that renders can never disagree — and neither can disagree with
 * the server, which checks the same tab when the page saves.
 */
const TAB_BY_PATH = new Map(ADMIN_TAB_VIEWS.map((view) => [view.to.replace(/^\/admin\/?/, ''), view.id]))

/** A nested path belongs to its parent's tab: `academic/marks` is Marks & Weights. */
function tabForAdminPath(path: string): string | undefined {
  const own = TAB_BY_PATH.get(path)
  if (own) return own
  const parent = path.slice(0, path.lastIndexOf('/'))
  return parent ? tabForAdminPath(parent) : undefined
}

const adminRoutes = adminPaths.map((path) => ({
  path,
  element: <RequireAuth tab={tabForAdminPath(path)}>{adminBuilt[path] ?? render(Placeholder)}</RequireAuth>,
}))

/** An admin child route, guarded by whichever tab owns its path. */
const guarded = (path: string, element: ReactElement) => ({
  path,
  element: <RequireAuth tab={tabForAdminPath(path)}>{element}</RequireAuth>,
})

/**
 * Where `/admin` goes.
 *
 * The Control Dashboard is enrolment and revenue, which a reviewer does not
 * hold, so the console cannot have one fixed front door. It opens on the first
 * tab this person actually has.
 */
function AdminHome() {
  const identity = useIdentity()
  if (identity.tabs.includes('dashboard')) return <PlatformDashboard />
  const first = ADMIN_TAB_VIEWS.find((view) => view.id !== 'dashboard' && identity.tabs.includes(view.id))
  return first ? <Navigate to={first.to} replace /> : <Navigate to="/app" replace />
}

// Which portal this origin serves. Everywhere else — localhost, previews — both
// halves stay mounted, so development is unaffected by the production split.
const adminHost = isAdminHost()
const studentHost = isStudentHost()

const toStudentSite = <HandOver origin={STUDENT_ORIGIN} />

const studentApp = {
  path: '/app',
  element: <RequireAuth student><AppShell portal="student" /></RequireAuth>,
  children: [{ index: true, element: render(Dashboard) }, ...studentRoutes],
}

const adminApp = {
  path: '/admin',
  element: <RequireAuth console><AppShell portal="admin" /></RequireAuth>,
  children: [
    { index: true, element: <AdminHome /> },
    // `import/:kind` is the one path whose tab depends on the parameter, so it
    // is guarded by the ledger tab that owns that content kind.
    { path: 'import/:kind', element: <RequireImportKind>{render(BulkImportPage)}</RequireImportKind> },
    guarded('concepts/import', render(ConceptsImportPage)),
    guarded('relationships/import', render(RelationsImportPage)),
    guarded('academic/import', render(AcademicImportPage)),
    guarded('academic/intake', render(AcademicIntakePage)),
    guarded('academic/marks', render(MarksWeights)),
    guarded('taxonomy/import', render(SubjectsImportPage)),
    guarded('glossary/import', render(GlossaryImportPage)),
    guarded('library/coverage', render(MedicalCoverageReview)),
    guarded('library/media', render(MediaRequests)),
    guarded('library/evidence/import', render(EvidenceImportPage)),
    { path: 'content', element: <RequireAuth tab="library">{render(ControlDashboard)}</RequireAuth> },
    ...adminRoutes,
  ],
}

/**
 * The site root belongs to whoever arrives: a signed-in student goes straight
 * to their dashboard, everyone else gets the landing page. Only `/` behaves
 * this way — `/en` and `/ar` are shared marketing URLs, and a link someone was
 * sent should show the page they were sent, signed in or not. Demo builds keep
 * the landing page too: "demo" is a mode, not a login. Downstream guards still
 * decide what /app means for the arriving role (reviewers bounce to /admin,
 * unverified accounts to verification), so nothing is re-checked here.
 */
function RootGate() {
  const identity = useIdentity()
  if (identity.status === 'loading') return <RouteLoading />
  if (identity.status === 'authenticated') return <Navigate to="/app" replace />
  return render(Landing)
}

export const router = createBrowserRouter([
  // On the admin domain the root is the dashboard. The public site and the student
  // app belong to the other origin, so they are handed over rather than rendered —
  // the admin build is the same bundle, but this domain only ever shows one half.
  // English at the root. `/ar` and `/en` stay explicit, and the Arabic page is
  // offered by a dismissible strip rather than an automatic redirect — a
  // redirect on `navigator.language` means a shared link shows the sender and
  // the receiver different pages, and splits what crawlers index.
  { path: '/', element: adminHost ? <Navigate to="/admin" replace /> : <RootGate /> },
  { path: '/en', element: adminHost ? toStudentSite : render(Landing) },
  { path: '/ar', element: adminHost ? toStudentSite : render(LandingAr) },
  // Pricing is its own page rather than an anchor on the landing page: it is
  // what people search for by name, and a section cannot carry a title, a
  // description, or the answered objections that close the decision.
  { path: '/pricing', element: adminHost ? toStudentSite : render(PricingEn) },
  { path: '/en/pricing', element: adminHost ? toStudentSite : <Navigate to="/pricing" replace /> },
  { path: '/ar/pricing', element: adminHost ? toStudentSite : render(PricingAr) },
  // Auth stays on both origins: RequireAuth sends a signed-out admin to /login, and
  // a session lives per-origin, so the admin domain needs its own way in.
  { path: '/login', element: render(Login) },
  { path: '/signup', element: adminHost ? toStudentSite : render(Signup) },
  { path: '/logout', element: render(Logout) },
  // Followed from an inbox, signed out, on either host — never behind auth.
  { path: '/unsubscribe', element: render(Unsubscribe) },
  // A note or a board somebody shared. Deliberately outside `/app`: whoever
  // opens it may have no account, and the server decides what they may do.
  { path: '/s/:id', element: render(SharedDocument) },
  { path: '/auth/verify-email', element: render(VerifyEmail) },
  { path: '/auth/mfa', element: render(MfaSetup) },
  { path: '/auth/forgot-password', element: render(ForgotPassword) },
  { path: '/auth/reset-password', element: render(ResetPassword) },
  adminHost ? { path: '/app/*', element: toStudentSite } : studentApp,
  studentHost ? { path: '/admin/*', element: <HandOver origin={ADMIN_ORIGIN} /> } : adminApp,
  { path: '*', element: render(NotFound) },
])
