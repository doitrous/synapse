import type { ReactElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/shell/AppShell'
import { Landing } from '@/pages/Landing'
import { LandingAr } from '@/pages/LandingAr'
import { NotFound } from '@/pages/NotFound'
import { Placeholder } from '@/pages/Placeholder'
import { Dashboard } from '@/pages/student/Dashboard'
import { Library } from '@/pages/student/Library'
import { QuestionBank } from '@/pages/student/QuestionBank'
import { Resources } from '@/pages/student/Resources'
import { Practical } from '@/pages/student/Practical'
import { CalendarPage } from '@/pages/student/Calendar'
import { Performance } from '@/pages/student/Performance'
import { Whiteboard } from '@/pages/student/Whiteboard'
import { Notebook } from '@/pages/student/Notebook'
import { StudyTogether } from '@/pages/student/StudyTogether'
import { Billing } from '@/pages/student/Billing'
import { Account } from '@/pages/student/Account'
import { ControlDashboard } from '@/pages/admin/ControlDashboard'
import { AcademicSetup } from '@/pages/admin/AcademicSetup'
import { PaymentsFinance } from '@/pages/admin/PaymentsFinance'
import { EmailAutomations } from '@/pages/admin/EmailAutomations'
import { PrivacySupport } from '@/pages/admin/PrivacySupport'
import { Settings as AdminSettings } from '@/pages/admin/Settings'
import { AuditSecurity } from '@/pages/admin/AuditSecurity'
import { ReportsReview } from '@/pages/admin/ReportsReview'
import { VoucherManagement } from '@/pages/admin/VoucherManagement'
import { NotificationCampaigns } from '@/pages/admin/NotificationCampaigns'
import { BulkImportPage } from '@/pages/admin/BulkImportPage'

// Surfaces that are built get their real component; the rest render the
// intentional Placeholder. Adding a surface = one entry here.
const studentBuilt: Record<string, ReactElement> = {
  library: <Library />,
  qbank: <QuestionBank />,
  resources: <Resources />,
  practical: <Practical />,
  calendar: <CalendarPage />,
  performance: <Performance />,
  whiteboard: <Whiteboard />,
  notebook: <Notebook />,
  'study-together': <StudyTogether />,
  billing: <Billing />,
  account: <Account />,
}

const adminBuilt: Record<string, ReactElement> = {
  academic: <AcademicSetup />,
  library: <ControlDashboard key="library-catalogue" initialKind="article" lockedKind />,
  questions: <ControlDashboard key="questions-catalogue" initialKind="question" lockedKind />,
  practical: <ControlDashboard key="practical-catalogue" initialKind="practical" lockedKind />,
  resources: <ControlDashboard key="resources-catalogue" initialKind="resource" lockedKind />,
  reports: <ReportsReview />,
  notifications: <NotificationCampaigns />,
  vouchers: <VoucherManagement />,
  payments: <PaymentsFinance />,
  email: <EmailAutomations />,
  privacy: <PrivacySupport />,
  settings: <AdminSettings />,
  audit: <AuditSecurity />,
}

const studentPaths = [
  'library',
  'qbank',
  'practical',
  'resources',
  'calendar',
  'performance',
  'whiteboard',
  'notebook',
  'study-together',
  'billing',
  'account',
]

const adminPaths = [
  'academic',
  'library',
  'questions',
  'practical',
  'resources',
  'reports',
  'notifications',
  'vouchers',
  'email',
  'payments',
  'privacy',
  'settings',
  'audit',
]

const studentRoutes = studentPaths.map((path) => ({
  path,
  element: studentBuilt[path] ?? <Placeholder />,
}))

const adminRoutes = adminPaths.map((path) => ({
  path,
  element: adminBuilt[path] ?? <Placeholder />,
}))

export const router = createBrowserRouter([
  // Arabic-first: the root renders the Arabic landing.
  { path: '/', element: <LandingAr /> },
  { path: '/en', element: <Landing /> },
  { path: '/ar', element: <LandingAr /> },
  {
    path: '/app',
    element: <AppShell portal="student" />,
    children: [{ index: true, element: <Dashboard /> }, ...studentRoutes],
  },
  {
    path: '/admin',
    element: <AppShell portal="admin" />,
    children: [{ index: true, element: <ControlDashboard /> }, { path: 'import/:kind', element: <BulkImportPage /> }, ...adminRoutes],
  },
  { path: '*', element: <NotFound /> },
])
