import { InitialReadBoundary } from '@/components/loading/InitialReadBoundary'
import { loadingLayoutFor } from '@/components/loading/routeSkeletons'
import { lazy, Suspense, useEffect, useState, type ComponentType, type ReactElement } from 'react'
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { AppShell } from '@/components/shell/AppShell'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { RouteBoundary } from '@/components/shell/RouteBoundary'
import { RedirectWithSearch } from '@/components/shell/RedirectWithSearch'
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
function PageReads({ children }: { children: ReactElement }) {
  const { pathname, search } = useLocation()
  // Dashboard sections load independently. Canvas/reader pages own their
  // viewport and use their local content and media loaders.
  const layout = loadingLayoutFor(pathname, search)
  if (['dashboard', 'reader', 'whiteboard', 'atlas', 'room'].includes(layout.shape)) return children
  return <InitialReadBoundary key={pathname} layout={layout} tab={new URLSearchParams(search).get('tab') ?? undefined}>{children}</InitialReadBoundary>
}

function render(Page: ComponentType<Record<string, unknown>>, props: Record<string, unknown> = {}): ReactElement {
  return (
    <RouteBoundary>
      <Suspense fallback={<RouteLoading />}><PageReads><Page {...props} /></PageReads></Suspense>
    </RouteBoundary>
  )
}

/**
 * How many hand-overs in a row stop being a redirect and start being a loop.
 *
 * Two origins that each decide the other one owns this path will bounce a
 * browser between them until it gives up, and `location.replace` leaves no
 * history to escape through. Nothing in the app should produce a second hop —
 * but "should not" is what this counter exists to survive, and a person stuck
 * in it deserves a sentence and a way out rather than a spinning tab.
 */
const HOP_KEY = 'nishany.handoff.hops'
const HOP_WINDOW_MS = 10_000

function countHop(): number {
  try {
    const stored = JSON.parse(sessionStorage.getItem(HOP_KEY) ?? 'null') as { n: number; firstAt: number } | null
    const fresh = stored && Date.now() - stored.firstAt < HOP_WINDOW_MS ? stored : { n: 0, firstAt: Date.now() }
    const next = { n: fresh.n + 1, firstAt: fresh.firstAt }
    sessionStorage.setItem(HOP_KEY, JSON.stringify(next))
    return next.n
  } catch {
    // No sessionStorage (private mode, an embedded webview): the redirect is
    // still the right answer, it simply cannot be counted.
    return 1
  }
}

/**
 * Hand this path to the other portal's origin.
 *
 * `replace` rather than `assign` so the back button returns to wherever the
 * student came from, not to a page that will only bounce them again.
 *
 * The session used to live in this origin's localStorage and nowhere else, so
 * arriving plain meant the other origin saw nobody signed in — hence the
 * one-time handoff code that used to ride along in the URL. The session is now
 * a single cookie both hostnames send, so there is nothing to carry: the
 * browser simply goes there, already signed in.
 */
function HandOver({ origin }: { origin: string }): ReactElement {
  const [looping, setLooping] = useState(false)
  useEffect(() => {
    if (countHop() > 2) { setLooping(true); return }
    window.location.replace(samePathOn(origin))
  }, [origin])
  if (!looping) return <RouteLoading />
  return (
    <Panel
      title="This page keeps being handed back and forth"
      body="The student site and the admin console each think this address belongs to the other. Signing out and back in usually settles it; if it does not, the address is not one your account can open."
    />
  )
}

/**
 * A dead end, said plainly, with the one control that is genuinely available.
 *
 * Both cases below are a page that cannot be rendered for this account and has
 * nowhere honest to redirect to. Redirecting anyway is what turned each of them
 * into a loop.
 */
function Panel({ title, body }: { title: string; body: string }): ReactElement {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-3 px-6 text-center">
      <h1 className="text-[20px] font-semibold text-ink">{title}</h1>
      <p className="text-[13px] leading-relaxed text-ink-2">{body}</p>
      <p>
        <a href="/logout" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line-2 bg-surface px-4 text-[13px] font-semibold text-ink hover:bg-inset">Sign out</a>
      </p>
    </div>
  )
}

const Landing = lazyNamed(() => import('@/pages/Landing'), 'Landing')
const LandingAr = lazyNamed(() => import('@/pages/LandingAr'), 'LandingAr')
const PricingEn = lazyNamed(() => import('@/pages/PricingEn'), 'PricingEn')
const PricingAr = lazyNamed(() => import('@/pages/PricingAr'), 'PricingAr')
const Terms = lazyNamed(() => import('@/pages/legal/Terms'), 'Terms')
const Privacy = lazyNamed(() => import('@/pages/legal/Privacy'), 'Privacy')
const Accessibility = lazyNamed(() => import('@/pages/legal/Accessibility'), 'Accessibility')
const RefundPolicy = lazyNamed(() => import('@/pages/legal/RefundPolicy'), 'RefundPolicy')
const Contact = lazyNamed(() => import('@/pages/legal/Contact'), 'Contact')
const NotFound = lazyNamed(() => import('@/pages/NotFound'), 'NotFound')
const Placeholder = lazyNamed(() => import('@/pages/Placeholder'), 'Placeholder')

const Login = lazyNamed(() => import('@/pages/auth/Login'), 'Login')
const Signup = lazyNamed(() => import('@/pages/auth/Signup'), 'Signup')
const VerifyEmail = lazyNamed(() => import('@/pages/auth/VerifyEmail'), 'VerifyEmail')
const CompleteProfile = lazyNamed(() => import('@/pages/auth/CompleteProfile'), 'CompleteProfile')
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
const MedicalTerminology = lazyNamed(() => import('@/pages/student/MedicalTerminology'), 'MedicalTerminology')
const TermGridPage = lazyNamed(() => import('@/components/termgrid/TermGridPage'), 'TermGridPage')
const SpotterPage = lazyNamed(() => import('@/components/games/SpotterPage'), 'SpotterPage')
const TermMatchPage = lazyNamed(() => import('@/components/games/TermMatchPage'), 'TermMatchPage')
const MinigamesHubPage = lazyNamed(() => import('@/components/games/MinigamesHubPage'), 'MinigamesHubPage')
const ClinicalSequencePage = lazyNamed(() => import('@/components/games/ClinicalSequencePage'), 'ClinicalSequencePage')
const MechanismChainPage = lazyNamed(() => import('@/components/games/MechanismChainPage'), 'MechanismChainPage')
const RedFlagSortPage = lazyNamed(() => import('@/components/games/RedFlagSortPage'), 'RedFlagSortPage')
const Practical = lazyNamed(() => import('@/pages/student/Practical'), 'Practical')
// Oral questions, Skills and Histology left Practical's tab strip and are
// their own destinations on the Practice hub.
const OralQuestions = lazyNamed(() => import('@/pages/student/OralQuestions'), 'OralQuestions')
const Skills = lazyNamed(() => import('@/pages/student/Skills'), 'Skills')
const Histology = lazyNamed(() => import('@/pages/student/Histology'), 'Histology')
const Flashcards = lazyNamed(() => import('@/pages/student/Flashcards'), 'Flashcards')
const EssayQuestions = lazyNamed(() => import('@/pages/student/EssayQuestions'), 'EssayQuestions')
const CalendarPage = lazyNamed(() => import('@/pages/student/Calendar'), 'CalendarPage')
const UniversityPage = lazyNamed(() => import('@/pages/student/University'), 'University')
const Performance = lazyNamed(() => import('@/pages/student/Performance'), 'Performance')
const Maristanas = lazyNamed(() => import('@/pages/student/Maristanas'), 'Maristanas')
const Whiteboard = lazyNamed(() => import('@/pages/student/Whiteboard'), 'Whiteboard')
const Notebook = lazyNamed(() => import('@/pages/student/Notebook'), 'Notebook')
const Tutorial = lazyNamed(() => import('@/pages/student/Tutorial'), 'Tutorial')
const StudyRooms = lazyNamed(() => import('@/pages/student/StudyRooms'), 'StudyRooms')
const AnatomyAtlas = lazyNamed(() => import('@/pages/student/AnatomyAtlas'), 'AnatomyAtlas')
const Practice = lazyNamed(() => import('@/pages/student/Practice'), 'Practice')
const Revise = lazyNamed(() => import('@/pages/student/Revise'), 'Revise')
const QuestionOfTheDay = lazyNamed(() => import('@/pages/student/QuestionOfTheDay'), 'QuestionOfTheDay')
const Account = lazyNamed(() => import('@/pages/student/Account'), 'Account')

const PlatformDashboard = lazyNamed(() => import('@/pages/admin/PlatformDashboard'), 'PlatformDashboard')
const AcademicSetup = lazyNamed(() => import('@/pages/admin/AcademicSetup'), 'AcademicSetup')
const PaymentsFinance = lazyNamed(() => import('@/pages/admin/PaymentsFinance'), 'PaymentsFinance')
const EmailAutomations = lazyNamed(() => import('@/pages/admin/EmailAutomations'), 'EmailAutomations')
const PrivacySupport = lazyNamed(() => import('@/pages/admin/PrivacySupport'), 'PrivacySupport')
const AdminSettings = lazyNamed(() => import('@/pages/admin/Settings'), 'Settings')
const AuditSecurity = lazyNamed(() => import('@/pages/admin/AuditSecurity'), 'AuditSecurity')
const AccessControl = lazyNamed(() => import('@/pages/admin/AccessControl'), 'AccessControl')
const MedicalCoverageReview = lazyNamed(() => import('@/pages/admin/MedicalCoverageReview'), 'MedicalCoverageReview')
const Inbox = lazyNamed(() => import('@/pages/admin/Inbox'), 'Inbox')
const VoucherManagement = lazyNamed(() => import('@/pages/admin/VoucherManagement'), 'VoucherManagement')
const AssistantSetup = lazyNamed(() => import('@/pages/admin/AssistantSetup'), 'AssistantSetup')
const TutorialSetup = lazyNamed(() => import('@/pages/admin/TutorialSetup'), 'TutorialSetup')
const LegalPagesSetup = lazyNamed(() => import('@/pages/admin/LegalPagesSetup'), 'LegalPagesSetup')
const NotificationCampaigns = lazyNamed(() => import('@/pages/admin/NotificationCampaigns'), 'NotificationCampaigns')
const BulkImportPage = lazyNamed(() => import('@/pages/admin/BulkImportPage'), 'BulkImportPage')
const KnowledgeGraph = lazyNamed(() => import('@/pages/admin/KnowledgeGraph'), 'KnowledgeGraph')
const TaxonomySetup = lazyNamed(() => import('@/pages/admin/TaxonomySetup'), 'TaxonomySetup')
const People = lazyNamed(() => import('@/pages/admin/People'), 'People')
const QuestionsSetup = lazyNamed(() => import('@/pages/admin/QuestionsSetup'), 'QuestionsSetup')
const AdaptiveSetup = lazyNamed(() => import('@/pages/admin/AdaptiveSetup'), 'AdaptiveSetup')
const ConceptsImportPage = lazyNamed(() => import('@/pages/admin/ConceptsImportPage'), 'ConceptsImportPage')
const RelationsImportPage = lazyNamed(() => import('@/pages/admin/RelationsImportPage'), 'RelationsImportPage')
const EvidenceImportPage = lazyNamed(() => import('@/pages/admin/EvidenceImportPage'), 'EvidenceImportPage')
const AcademicImportPage = lazyNamed(() => import('@/pages/admin/AcademicImportPage'), 'AcademicImportPage')
const AcademicIntakePage = lazyNamed(() => import('@/pages/admin/AcademicIntakePage'), 'AcademicIntakePage')
const MarksWeights = lazyNamed(() => import('@/pages/admin/MarksWeights'), 'MarksWeights')
const SubjectsImportPage = lazyNamed(() => import('@/pages/admin/SubjectsImportPage'), 'SubjectsImportPage')
const MailBox = lazyNamed(() => import('@/pages/admin/MailBox'), 'MailBox')
const GlossarySetup = lazyNamed(() => import('@/pages/admin/GlossarySetup'), 'GlossarySetup')
const GlossaryImportPage = lazyNamed(() => import('@/pages/admin/GlossaryImportPage'), 'GlossaryImportPage')
const ValidationAnalytics = lazyNamed(() => import('@/pages/admin/ValidationAnalytics'), 'ValidationAnalytics')
const StudentAnalytics = lazyNamed(() => import('@/pages/admin/StudentAnalytics'), 'StudentAnalytics')
const ValidatorWorkspace = lazyNamed(() => import('@/pages/validator/ValidatorWorkspace'), 'ValidatorWorkspace')

const studentPages: Record<string, Preloadable> = {
  library: Library,
  qbank: QuestionBank,
  adaptive: AdaptiveStudy,
  resources: Resources,
  // Both names resolve to the same page: `terminology` is canonical, `taxonomy`
  // is what every existing link, bookmark and deck id already says.
  terminology: MedicalTerminology,
  taxonomy: MedicalTerminology,
  'term-grid': TermGridPage,
  spotter: SpotterPage,
  'term-match': TermMatchPage,
  minigames: MinigamesHubPage,
  'clinical-sequence': ClinicalSequencePage,
  'mechanism-chain': MechanismChainPage,
  'red-flag-sort': RedFlagSortPage,
  practical: Practical,
  oral: OralQuestions,
  skills: Skills,
  histology: Histology,
  flashcards: Flashcards,
  essays: EssayQuestions,
  calendar: CalendarPage,
  university: UniversityPage,
  performance: Performance,
  maristanas: Maristanas,
  whiteboard: Whiteboard,
  notebook: Notebook,
  tutorial: Tutorial,
  'study-rooms': StudyRooms,
  'clinical-practice': Practice,
  'study-tools': Revise,
  'anatomy-atlas': AnatomyAtlas,
  qotd: QuestionOfTheDay,
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

// RouteLoading resolves both portals through the explicit loading-layout registry.
const adminBuilt: Record<string, ReactElement> = {
  academic: render(AcademicSetup),
  content: render(QuestionsSetup, { allKinds: true }),
  adaptive: render(AdaptiveSetup),
  knowledge: render(KnowledgeGraph),
  taxonomy: render(TaxonomySetup),
  glossary: render(GlossarySetup),
  tutorial: render(TutorialSetup),
  legal: render(LegalPagesSetup),
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
  validation: render(ValidationAnalytics),
  analytics: render(StudentAnalytics),
}

// Keep mounted routes and preloadable student pages in one registry so a new
// page cannot be linked in navigation while silently falling through to 404.
const studentPaths = Object.keys(studentPages)
const adminPaths = ['validation', 'analytics', 'academic', 'content', 'adaptive', 'knowledge', 'taxonomy', 'glossary', 'tutorial', 'legal', 'notifications', 'vouchers', 'email', 'mailbox', 'payments', 'privacy', 'settings', 'audit', 'assistant', 'access']

/**
 * Routes that were renamed, kept alive as redirects.
 *
 * None of these are removals: a URL a student bookmarked, or that a friend
 * pasted into a group chat, has to keep working. `RedirectWithSearch` carries
 * the query across, which is what makes `?party=` invites survive the rename
 * of Study Together to Study Rooms.
 */
const studentRedirects = [
  { path: 'plan', element: <RedirectWithSearch to="/app/calendar" /> },
  { path: 'learn', element: <RedirectWithSearch to="/app/library" /> },
  { path: 'practice', element: <RedirectWithSearch to="/app/qbank" /> },
  { path: 'revise', element: <RedirectWithSearch to="/app/study-tools" /> },
  { path: 'study-together', element: <RedirectWithSearch to="/app/study-rooms" /> },
  { path: 'billing', element: <RedirectWithSearch to="/app/account?tab=billing" /> },
  { path: 'question-notes', element: <RedirectWithSearch to="/app/notebook?tab=questions" /> },
]

const studentRoutes = [
  ...studentPaths.map((path) => ({ path, element: studentBuilt[path] ?? render(Placeholder) })),
  ...studentRedirects,
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
  if (first) return <Navigate to={first.to} replace />
  // Nowhere in the console belongs to this account. Sending them to `/app`
  // from the admin origin is a hand-over to the student site, which hands the
  // console path back — the loop this panel replaces.
  return (
    <Panel
      title="No console area has been assigned to your account"
      body="Your account can sign in, but no part of the admin console has been assigned to it yet. Ask a super admin to grant the areas you need."
    />
  )
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
    { index: true, element: <RouteBoundary><Suspense fallback={<RouteLoading />}><AdminHome /></Suspense></RouteBoundary> },
    // `import/:kind` is the one path whose tab depends on the parameter, so it
    // is guarded by the ledger tab that owns that content kind.
    { path: 'import/:kind', element: <RequireImportKind>{render(BulkImportPage)}</RequireImportKind> },
    { path: 'concepts/import', element: <RequireAuth tab="knowledge">{render(ConceptsImportPage)}</RequireAuth> },
    { path: 'relationships/import', element: <RequireAuth tab="knowledge">{render(RelationsImportPage)}</RequireAuth> },
    // Concepts and Relationships merged into the Knowledge Graph tab.
    { path: 'concepts', element: <RedirectWithSearch to="/admin/knowledge" /> },
    { path: 'relationships', element: <RedirectWithSearch to="/admin/knowledge?view=relationships" /> },
    guarded('academic/import', render(AcademicImportPage)),
    guarded('academic/intake', render(AcademicIntakePage)),
    guarded('academic/marks', render(MarksWeights)),
    guarded('taxonomy/import', render(SubjectsImportPage)),
    guarded('glossary/import', render(GlossaryImportPage)),
    { path: 'library/coverage', element: <RequireAuth tab="content">{render(MedicalCoverageReview)}</RequireAuth> },
    { path: 'library/evidence/import', element: <RequireAuth tab="content">{render(EvidenceImportPage)}</RequireAuth> },
    // The three moderation queues gathered behind one Inbox, each section shown
    // only to the tier that holds it. Old links land on the right section.
    { path: 'inbox', element: <RequireAuth anyTab={['media', 'escalations', 'reports']}>{render(Inbox)}</RequireAuth> },
    { path: 'library/media', element: <RedirectWithSearch to="/admin/inbox?view=media" /> },
    { path: 'escalations', element: <RedirectWithSearch to="/admin/inbox?view=escalations" /> },
    { path: 'reports', element: <RedirectWithSearch to="/admin/inbox?view=reports" /> },
    // Console Users and Students gathered under one People entry, each section
    // shown only to the capability that holds it.
    { path: 'people', element: <RequireAuth anyTab={['users', 'students']}>{render(People)}</RequireAuth> },
    { path: 'users', element: <RedirectWithSearch to="/admin/people?view=users" /> },
    { path: 'students', element: <RedirectWithSearch to="/admin/people?view=students" /> },
    // The seven per-kind setup tabs collapsed into one Content workspace; old
    // bookmarks and in-app links keep working.
    ...['library', 'questions', 'practical', 'flashcards', 'written', 'histology', 'resources']
      .map((path) => ({ path, element: <RedirectWithSearch to="/admin/content" /> })),
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
  if (identity.status === 'authenticated' && identity.role === 'mcq_validator') return <Navigate to="/validator" replace />
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
  // The footer's four pages. Public, on the student origin, in English for
  // both marketing shells — the Arabic shell links to the same URLs, and the
  // translated versions are flagged as pending rather than faked.
  { path: '/terms', element: adminHost ? toStudentSite : render(Terms) },
  { path: '/privacy', element: adminHost ? toStudentSite : render(Privacy) },
  { path: '/accessibility', element: adminHost ? toStudentSite : render(Accessibility) },
  { path: '/refund-policy', element: adminHost ? toStudentSite : render(RefundPolicy) },
  { path: '/contact', element: adminHost ? toStudentSite : render(Contact) },
  // Auth stays on both origins: RequireAuth sends a signed-out admin to /login, and
  // a session lives per-origin, so the admin domain needs its own way in.
  { path: '/login', element: render(Login) },
  { path: '/signup', element: adminHost ? toStudentSite : render(Signup) },
  { path: '/logout', element: render(Logout) },
  { path: '/validator', element: adminHost
    ? toStudentSite
    : <RequireAuth validator>{render(ValidatorWorkspace)}</RequireAuth> },
  // Followed from an inbox, signed out, on either host — never behind auth.
  { path: '/unsubscribe', element: render(Unsubscribe) },
  // A note or a board somebody shared. Deliberately outside `/app`: whoever
  // opens it may have no account, and the server decides what they may do.
  { path: '/s/:id', element: render(SharedDocument) },
  { path: '/auth/verify-email', element: render(VerifyEmail) },
  // Not wrapped in RequireAuth — same as verify-email and mfa above, this
  // handles its own signed-out/loading/already-complete cases (see
  // CompleteProfile.tsx) rather than being gated by the auth it needs to sit
  // outside of. `student` routes redirect here from RequireAuth once
  // enrolment is settled but phone/nationality is still missing.
  { path: '/auth/complete-profile', element: render(CompleteProfile) },
  { path: '/auth/mfa', element: render(MfaSetup) },
  { path: '/auth/forgot-password', element: render(ForgotPassword) },
  { path: '/auth/reset-password', element: render(ResetPassword) },
  adminHost ? { path: '/app/*', element: toStudentSite } : studentApp,
  studentHost ? { path: '/admin/*', element: <HandOver origin={ADMIN_ORIGIN} /> } : adminApp,
  { path: '*', element: render(NotFound) },
], {
  // `/` in production. A preview build mounted under a path (see `base` in
  // vite.config.ts) tells the router the same prefix, so every `to="/app/…"`
  // above keeps working without a rewrite.
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || undefined,
})
