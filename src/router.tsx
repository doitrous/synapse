import { lazy, Suspense, useEffect, type ComponentType, type ReactElement } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/shell/AppShell'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { RouteBoundary } from '@/components/shell/RouteBoundary'
import { RequireAuth } from '@/components/auth/RequireAuth'
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
const AdaptiveStudy = lazyNamed(() => import('@/pages/student/AdaptiveStudy'), 'AdaptiveStudy')
const Resources = lazyNamed(() => import('@/pages/student/Resources'), 'Resources')
const ResourceReader = lazyNamed(() => import('@/pages/student/ResourceReader'), 'ResourceReader')
const MedicalTaxonomy = lazyNamed(() => import('@/pages/student/MedicalTaxonomy'), 'MedicalTaxonomy')
const Practical = lazyNamed(() => import('@/pages/student/Practical'), 'Practical')
const Flashcards = lazyNamed(() => import('@/pages/student/Flashcards'), 'Flashcards')
const CalendarPage = lazyNamed(() => import('@/pages/student/Calendar'), 'CalendarPage')
const Performance = lazyNamed(() => import('@/pages/student/Performance'), 'Performance')
const Whiteboard = lazyNamed(() => import('@/pages/student/Whiteboard'), 'Whiteboard')
const Notebook = lazyNamed(() => import('@/pages/student/Notebook'), 'Notebook')
const StudyTogether = lazyNamed(() => import('@/pages/student/StudyTogether'), 'StudyTogether')
const Billing = lazyNamed(() => import('@/pages/student/Billing'), 'Billing')
const Account = lazyNamed(() => import('@/pages/student/Account'), 'Account')

const ControlDashboard = lazyNamed(() => import('@/pages/admin/ControlDashboard'), 'ControlDashboard')
const AcademicSetup = lazyNamed(() => import('@/pages/admin/AcademicSetup'), 'AcademicSetup')
const PaymentsFinance = lazyNamed(() => import('@/pages/admin/PaymentsFinance'), 'PaymentsFinance')
const EmailAutomations = lazyNamed(() => import('@/pages/admin/EmailAutomations'), 'EmailAutomations')
const PrivacySupport = lazyNamed(() => import('@/pages/admin/PrivacySupport'), 'PrivacySupport')
const AdminSettings = lazyNamed(() => import('@/pages/admin/Settings'), 'Settings')
const AuditSecurity = lazyNamed(() => import('@/pages/admin/AuditSecurity'), 'AuditSecurity')
const MedicalCoverageReview = lazyNamed(() => import('@/pages/admin/MedicalCoverageReview'), 'MedicalCoverageReview')
const ReportsReview = lazyNamed(() => import('@/pages/admin/ReportsReview'), 'ReportsReview')
const VoucherManagement = lazyNamed(() => import('@/pages/admin/VoucherManagement'), 'VoucherManagement')
const AssistantSetup = lazyNamed(() => import('@/pages/admin/AssistantSetup'), 'AssistantSetup')
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
const ConceptsImportPage = lazyNamed(() => import('@/pages/admin/ConceptsImportPage'), 'ConceptsImportPage')
const RelationsImportPage = lazyNamed(() => import('@/pages/admin/RelationsImportPage'), 'RelationsImportPage')
const MediaRequests = lazyNamed(() => import('@/pages/admin/MediaRequests'), 'MediaRequests')
const EvidenceImportPage = lazyNamed(() => import('@/pages/admin/EvidenceImportPage'), 'EvidenceImportPage')
const AcademicImportPage = lazyNamed(() => import('@/pages/admin/AcademicImportPage'), 'AcademicImportPage')
const MarksWeights = lazyNamed(() => import('@/pages/admin/MarksWeights'), 'MarksWeights')
const SubjectsImportPage = lazyNamed(() => import('@/pages/admin/SubjectsImportPage'), 'SubjectsImportPage')
const MailBox = lazyNamed(() => import('@/pages/admin/MailBox'), 'MailBox')
const GlossarySetup = lazyNamed(() => import('@/pages/admin/GlossarySetup'), 'GlossarySetup')
const GlossaryImportPage = lazyNamed(() => import('@/pages/admin/GlossaryImportPage'), 'GlossaryImportPage')

const studentPages: Record<string, Preloadable> = {
  library: Library,
  qbank: QuestionBank,
  adaptive: AdaptiveStudy,
  resources: Resources,
  taxonomy: MedicalTaxonomy,
  practical: Practical,
  flashcards: Flashcards,
  calendar: CalendarPage,
  performance: Performance,
  whiteboard: Whiteboard,
  notebook: Notebook,
  'study-together': StudyTogether,
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
  resources: render(ResourcesSetup),
  reports: render(ReportsReview),
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
  assistant: render(AssistantSetup),
}

const studentPaths = ['library', 'qbank', 'adaptive', 'practical', 'flashcards', 'resources', 'taxonomy', 'calendar', 'performance', 'whiteboard', 'notebook', 'study-together', 'billing', 'account']
const adminPaths = ['academic', 'library', 'questions', 'adaptive', 'concepts', 'relationships', 'taxonomy', 'glossary', 'practical', 'flashcards', 'resources', 'reports', 'users', 'students', 'notifications', 'vouchers', 'email', 'mailbox', 'payments', 'privacy', 'settings', 'audit', 'assistant']

const studentRoutes = [
  ...studentPaths.map((path) => ({ path, element: studentBuilt[path] ?? render(Placeholder) })),
  // Reading a source is its own screen, not a modal over the catalogue: it owns
  // the viewport, and it has to be linkable at a page.
  { path: 'resources/:id', element: render(ResourceReader) },
]
const adminRoutes = adminPaths.map((path) => ({ path, element: adminBuilt[path] ?? render(Placeholder) }))

// Which portal this origin serves. Everywhere else — localhost, previews — both
// halves stay mounted, so development is unaffected by the production split.
const adminHost = isAdminHost()
const studentHost = isStudentHost()

const toStudentSite = <HandOver origin={STUDENT_ORIGIN} />

const studentApp = {
  path: '/app',
  element: <RequireAuth><AppShell portal="student" /></RequireAuth>,
  children: [{ index: true, element: render(Dashboard) }, ...studentRoutes],
}

const adminApp = {
  path: '/admin',
  element: <RequireAuth role="admin"><AppShell portal="admin" /></RequireAuth>,
  children: [
    { index: true, element: render(ControlDashboard) },
    { path: 'import/:kind', element: render(BulkImportPage) },
    { path: 'concepts/import', element: render(ConceptsImportPage) },
    { path: 'relationships/import', element: render(RelationsImportPage) },
    { path: 'academic/import', element: render(AcademicImportPage) },
    { path: 'academic/marks', element: render(MarksWeights) },
    { path: 'taxonomy/import', element: render(SubjectsImportPage) },
    { path: 'glossary/import', element: render(GlossaryImportPage) },
    { path: 'library/coverage', element: render(MedicalCoverageReview) },
    { path: 'library/media', element: render(MediaRequests) },
    { path: 'library/evidence/import', element: render(EvidenceImportPage) },
    ...adminRoutes,
  ],
}

export const router = createBrowserRouter([
  // On the admin domain the root is the dashboard. The public site and the student
  // app belong to the other origin, so they are handed over rather than rendered —
  // the admin build is the same bundle, but this domain only ever shows one half.
  // English at the root. `/ar` and `/en` stay explicit, and the Arabic page is
  // offered by a dismissible strip rather than an automatic redirect — a
  // redirect on `navigator.language` means a shared link shows the sender and
  // the receiver different pages, and splits what crawlers index.
  { path: '/', element: adminHost ? <Navigate to="/admin" replace /> : render(Landing) },
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
