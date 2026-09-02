import { PageContainer, PageHeader } from '@/components/shell/Page'
import { QuestionNotesPanel } from '@/components/notebook/QuestionNotesPanel'
import { useT } from '@/lib/i18n'

/**
 * The question notes, on their own page.
 *
 * They now live inside the Notebook as its third tab — that is where a student
 * meets them, and `/app/question-notes` redirects there. This page is kept so
 * that anything still importing `QuestionNotes` renders the same panel rather
 * than a missing export, and it is the panel itself that is shared, not a copy.
 */
export function QuestionNotes() {
  const t = useT()
  return (
    <PageContainer>
      <PageHeader
        title={t('Question Notes')}
        description={t('Everything you have written while answering Question Bank items, next to how each question has gone for you.')}
      />
      <QuestionNotesPanel />
    </PageContainer>
  )
}
