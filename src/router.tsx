import { lazy, Suspense, type ComponentType, type ReactElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/shell/AppShell'
import { RouteLoading } from '@/components/shell/RouteLoading'

function lazyNamed(loader: () => Promise<Record<string, unknown>>, exportName: string) {
  return lazy(async () => ({ default: (await loader())[exportName] as ComponentType<Record<string, unknown>> }))
}

function render(Page: ComponentType<Record<string, unknown>>, props: Record<string, unknown> = {}): ReactElement {
  return <Suspense fallback={<RouteLoading />}><Page {...props} /></Suspense>
}

const Landing = lazyNamed(() => import('@/pages/Landing'), 'Landing')
const LandingAr = lazyNamed(() => import('@/pages/LandingAr'), 'LandingAr')
const NotFound = lazyNamed(() => import('@/pages/NotFound'), 'NotFound')
const Placeholder = lazyNamed(() => import('@/pages/Placeholder'), 'Placeholder')

const Login = lazyNamed(() => import('@/pages/auth/Login'), 'Login')
const Signup = lazyNamed(() => import('@/pages/auth/Signup'), 'Signup')
const VerifyEmail = lazyNamed(() => import('@/pages/auth/VerifyEmail'), 'VerifyEmail')
const MfaSetup = lazyNamed(() => import('@/pages/auth/MfaSetup'), 'MfaSetup')
const ForgotPassword = lazyNamed(() => import('@/pages/auth/ForgotPassword'), 'ForgotPassword')
const ResetPassword = lazyNamed(() => import('@/pages/auth/ResetPassword'), 'ResetPassword')
const Logout = lazyNamed(() => import('@/pages/auth/Logout'), 'Logout')

const Dashboard = lazyNamed(() => import('@/pages/student/Dashboard'), 'Dashboard')
const Library = lazyNamed(() => import('@/pages/student/Library'), 'Library')
const QuestionBank = lazyNamed(() => import('@/pages/student/QuestionBank'), 'QuestionBank')
const Resources = lazyNamed(() => import('@/pages/student/Resources'), 'Resources')
const MedicalTaxonomy = lazyNamed(() => import('@/pages/student/MedicalTaxonomy'), 'MedicalTaxonomy')
const Practical = lazyNamed(() => import('@/pages/student/Practical'), 'Practical')
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
const NotificationCampaigns = lazyNamed(() => import('@/pages/admin/NotificationCampaigns'), 'NotificationCampaigns')
const BulkImportPage = lazyNamed(() => import('@/pages/admin/BulkImportPage'), 'BulkImportPage')
const ConceptsSetup = lazyNamed(() => import('@/pages/admin/ConceptsSetup'), 'ConceptsSetup')
const RelationshipsSetup = lazyNamed(() => import('@/pages/admin/RelationshipsSetup'), 'RelationshipsSetup')
const TaxonomySetup = lazyNamed(() => import('@/pages/admin/TaxonomySetup'), 'TaxonomySetup')
const StudentsManagement = lazyNamed(() => import('@/pages/admin/StudentsManagement'), 'StudentsManagement')
const UsersManagement = lazyNamed(() => import('@/pages/admin/UsersManagement'), 'UsersManagement')
const QuestionsSetup = lazyNamed(() => import('@/pages/admin/QuestionsSetup'), 'QuestionsSetup')
const ResourcesSetup = lazyNamed(() => import('@/pages/admin/ResourcesSetup'), 'ResourcesSetup')
const PracticalSetup = lazyNamed(() => import('@/pages/admin/PracticalSetup'), 'PracticalSetup')
const ConceptsImportPage = lazyNamed(() => import('@/pages/admin/ConceptsImportPage'), 'ConceptsImportPage')
const RelationsImportPage = lazyNamed(() => import('@/pages/admin/RelationsImportPage'), 'RelationsImportPage')
const MediaRequests = lazyNamed(() => import('@/pages/admin/MediaRequests'), 'MediaRequests')
const EvidenceImportPage = lazyNamed(() => import('@/pages/admin/EvidenceImportPage'), 'EvidenceImportPage')
const AcademicImportPage = lazyNamed(() => import('@/pages/admin/AcademicImportPage'), 'AcademicImportPage')
const SubjectsImportPage = lazyNamed(() => import('@/pages/admin/SubjectsImportPage'), 'SubjectsImportPage')
const MailBox = lazyNamed(() => import('@/pages/admin/MailBox'), 'MailBox')

const studentBuilt: Record<string, ReactElement> = {
  library: render(Library),
  qbank: render(QuestionBank),
  resources: render(Resources),
  taxonomy: render(MedicalTaxonomy),
  practical: render(Practical),
  calendar: render(CalendarPage),
  performance: render(Performance),
  whiteboard: render(Whiteboard),
  notebook: render(Notebook),
  'study-together': render(StudyTogether),
  billing: render(Billing),
  account: render(Account),
}

const adminBuilt: Record<string, ReactElement> = {
  academic: render(AcademicSetup),
  library: render(ControlDashboard, { initialKind: 'article', lockedKind: true }),
  questions: render(QuestionsSetup),
  concepts: render(ConceptsSetup),
  relationships: render(RelationshipsSetup),
  taxonomy: render(TaxonomySetup),
  practical: render(PracticalSetup),
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
}

const studentPaths = ['library', 'qbank', 'practical', 'resources', 'taxonomy', 'calendar', 'performance', 'whiteboard', 'notebook', 'study-together', 'billing', 'account']
const adminPaths = ['academic', 'library', 'questions', 'concepts', 'relationships', 'taxonomy', 'practical', 'resources', 'reports', 'users', 'students', 'notifications', 'vouchers', 'email', 'mailbox', 'payments', 'privacy', 'settings', 'audit']

const studentRoutes = studentPaths.map((path) => ({ path, element: studentBuilt[path] ?? render(Placeholder) }))
const adminRoutes = adminPaths.map((path) => ({ path, element: adminBuilt[path] ?? render(Placeholder) }))

export const router = createBrowserRouter([
  { path: '/', element: render(LandingAr) },
  { path: '/en', element: render(Landing) },
  { path: '/ar', element: render(LandingAr) },
  { path: '/login', element: render(Login) },
  { path: '/signup', element: render(Signup) },
  { path: '/logout', element: render(Logout) },
  { path: '/auth/verify-email', element: render(VerifyEmail) },
  { path: '/auth/mfa', element: render(MfaSetup) },
  { path: '/auth/forgot-password', element: render(ForgotPassword) },
  { path: '/auth/reset-password', element: render(ResetPassword) },
  {
    path: '/app',
    element: <AppShell portal="student" />,
    children: [{ index: true, element: render(Dashboard) }, ...studentRoutes],
  },
  {
    path: '/admin',
    element: <AppShell portal="admin" />,
    children: [
      { index: true, element: render(ControlDashboard) },
      { path: 'import/:kind', element: render(BulkImportPage) },
      { path: 'concepts/import', element: render(ConceptsImportPage) },
      { path: 'relationships/import', element: render(RelationsImportPage) },
      { path: 'academic/import', element: render(AcademicImportPage) },
      { path: 'taxonomy/import', element: render(SubjectsImportPage) },
      { path: 'library/coverage', element: render(MedicalCoverageReview) },
      { path: 'library/media', element: render(MediaRequests) },
      { path: 'library/evidence/import', element: render(EvidenceImportPage) },
      ...adminRoutes,
    ],
  },
  { path: '*', element: render(NotFound) },
])
