import { useState } from 'react'
import { Plus, Pencil, Flag, Upload } from 'lucide-react'
import { questions } from '@/data/qbank'
import { questionMeta } from '@/data/admin'
import { subjects, getSubject } from '@/data/student'
import { YEARS, scopeUniversities, scopeYear } from '@/data/universities'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { IconButton } from '@/components/ui/IconButton'
import { FilterChip } from '@/components/ui/FilterChip'
import { Select } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { SubjectDot } from '@/components/ui/Subject'
import { BulkImport } from '@/components/admin/BulkImport'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'

const STATUSES = ['All', 'Published', 'In review', 'Draft']

const SAMPLE = `stem,subject,topic,difficulty,university,year
Which vessel is occluded in an inferior STEMI?,Cardiovascular,ACS,Moderate,OMS;MMS,Year 3
First-line management of anaphylaxis?,Pharmacology,Emergencies,Easy,OMS,Year 2
Which nerve lesion causes wrist drop?,Neurology,Peripheral nerves,Hard,OMS;NUM,Year 3
Typical ECG change in hyperkalaemia?,Renal & Urinary,Electrolytes,Moderate,MMS,Year 2`

function diffTone(d: string): 'success' | 'warning' | 'danger' {
  return d === 'Easy' ? 'success' : d === 'Moderate' ? 'warning' : 'danger'
}

export function QuestionsSetup() {
  const [universityCatalogue] = useUniversityCatalogue()
  const [status, setStatus] = useState('All')
  const [uni, setUni] = useState('all')
  const [year, setYear] = useState('all')
  const [subject, setSubject] = useState('all')
  const [importOpen, setImportOpen] = useState(false)
  const [imported, setImported] = useState(0)

  const rows = questions.filter((q) => {
    if (status !== 'All' && questionMeta[q.id]?.status !== status) return false
    if (uni !== 'all' && !scopeUniversities(q.id).includes(uni)) return false
    if (year !== 'all' && scopeYear(q.subjectId) !== year) return false
    if (subject !== 'all' && q.subjectId !== subject) return false
    return true
  })
  const inReview = questions.filter((q) => questionMeta[q.id]?.status === 'In review').length

  return (
    <PageContainer>
      <PageHeader
        title="Questions Setup"
        description="Write, review, filter, and bulk-import question-bank items."
        actions={
          <>
            <Button variant="secondary" size="md" iconLeft={Upload} onClick={() => setImportOpen(true)}>
              Bulk import
            </Button>
            <Button variant="primary" size="md" iconLeft={Plus}>
              New question
            </Button>
          </>
        }
      />

      {imported > 0 && (
        <div className="mb-4 rounded-lg border border-success/25 bg-success-tint/70 px-4 py-2.5 text-[13px] text-ink">
          {imported} questions imported and added to the review queue.
        </div>
      )}

      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <FilterChip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s}
            </FilterChip>
          ))}
          {inReview > 0 && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-[12.5px] text-warning">
              <Flag size={13} />
              {inReview} awaiting review
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12px] font-medium text-ink-3">Filter</span>
          <Select value={uni} onChange={(e) => setUni(e.target.value)} className="w-52">
            <option value="all">All universities</option>
            {universityCatalogue.map((u) => (
              <option key={u.id} value={u.id}>
                {u.short} — {u.name}
              </option>
            ))}
          </Select>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-36">
            <option value="all">All years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
          <Select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-44">
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Panel>
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Question</Th>
              <Th>Subject</Th>
              <Th>Year</Th>
              <Th>Universities</Th>
              <Th>Difficulty</Th>
              <Th>Status</Th>
              <Th align="center">Flags</Th>
              <Th align="right" className="pr-4">
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => {
              const meta = questionMeta[q.id]
              const subj = getSubject(q.subjectId)
              return (
                <Tr key={q.id} hover>
                  <Td className="max-w-xs pl-4">
                    <span className="line-clamp-1 font-medium">{q.stem}</span>
                    <span className="text-[11.5px] text-ink-3">{q.topic}</span>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 text-ink-2">
                      <SubjectDot id={subj.id} />
                      {subj.short}
                    </span>
                  </Td>
                  <Td className="whitespace-nowrap text-[12.5px] text-ink-2">{scopeYear(q.subjectId)}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-1">
                      {scopeUniversities(q.id).map((id) => (
                        <span
                          key={id}
                          className="rounded bg-inset px-1.5 py-0.5 text-[10.5px] font-medium text-ink-2"
                        >
                          {universityFrom(universityCatalogue, id)?.short}
                        </span>
                      ))}
                    </div>
                  </Td>
                  <Td>
                    <Badge tone={diffTone(q.difficulty)}>{q.difficulty}</Badge>
                  </Td>
                  <Td>{meta ? <StatusBadge status={meta.status} /> : null}</Td>
                  <Td align="center">
                    {meta && meta.flags > 0 ? (
                      <span className="tnum inline-flex items-center gap-1 font-mono text-[12px] text-danger">
                        <Flag size={12} />
                        {meta.flags}
                      </span>
                    ) : (
                      <span className="text-ink-3">—</span>
                    )}
                  </Td>
                  <Td align="right" className="pr-4">
                    <IconButton icon={Pencil} label="Edit question" size="sm" />
                  </Td>
                </Tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[13px] text-ink-3">
                  No questions match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Panel>

      <BulkImport
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="Bulk import questions"
        itemNoun="questions"
        fields={['Stem', 'Subject', 'Topic', 'Difficulty', 'University', 'Year', 'Explanation']}
        sampleCsv={SAMPLE}
        onImport={(n) => setImported(n)}
      />
    </PageContainer>
  )
}
