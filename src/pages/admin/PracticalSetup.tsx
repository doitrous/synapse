import { useState } from 'react'
import { Plus, Pencil, Stethoscope, ClipboardList, ListChecks, Upload } from 'lucide-react'
import { osceStations, clinicalCases, skills } from '@/data/practical'
import { getSubject } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { IconButton } from '@/components/ui/IconButton'
import { Tabs } from '@/components/ui/Tabs'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { SubjectDot } from '@/components/ui/Subject'
import { BulkImport } from '@/components/admin/BulkImport'

const SAMPLE = `title,type,subject,minutes,marks
Thyroid examination,OSCE,Endocrine,8,22
Diabetic foot assessment,OSCE,Endocrine,8,20
Chest X-ray interpretation,Imaging,Respiratory,5,10`

const CYCLE = ['Published', 'Published', 'Draft', 'In review', 'Published']
const st = (i: number) => CYCLE[i % CYCLE.length]

function EditCell() {
  return (
    <Td align="right" className="pr-4">
      <IconButton icon={Pencil} label="Edit" size="sm" />
    </Td>
  )
}

export function PracticalSetup() {
  const [tab, setTab] = useState('osce')
  const [importOpen, setImportOpen] = useState(false)
  const [imported, setImported] = useState(0)

  return (
    <PageContainer>
      <PageHeader
        title="Practical Setup"
        description="Build OSCE stations, clinical cases, and skills checklists — or bulk-import them."
        actions={
          <>
            <Button variant="secondary" size="md" iconLeft={Upload} onClick={() => setImportOpen(true)}>
              Bulk import
            </Button>
            <Button variant="primary" size="md" iconLeft={Plus}>
              New item
            </Button>
          </>
        }
      />

      {imported > 0 && (
        <div className="mb-4 rounded-lg border border-success/25 bg-success-tint/70 px-4 py-2.5 text-[13px] text-ink">
          {imported} practical items imported and queued for review.
        </div>
      )}

      <Tabs
        value={tab}
        onChange={setTab}
        className="mb-4"
        items={[
          { value: 'osce', label: 'OSCE stations', icon: Stethoscope, count: osceStations.length },
          { value: 'cases', label: 'Clinical cases', icon: ClipboardList, count: clinicalCases.length },
          { value: 'skills', label: 'Skills', icon: ListChecks, count: skills.length },
        ]}
      />

      {tab === 'osce' && (
        <Panel>
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Station</Th>
                <Th>Subject</Th>
                <Th align="right">Minutes</Th>
                <Th align="right">Marks</Th>
                <Th>Status</Th>
                <Th align="right" className="pr-4">
                  <span className="sr-only">Actions</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {osceStations.map((s, i) => (
                <Tr key={s.id} hover>
                  <Td className="pl-4 font-medium">{s.title}</Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 text-ink-2">
                      <SubjectDot id={s.subjectId} />
                      {getSubject(s.subjectId).short}
                    </span>
                  </Td>
                  <Td align="right" className="tnum font-mono text-ink-2">
                    {s.minutes}
                  </Td>
                  <Td align="right" className="tnum font-mono text-ink-2">
                    {s.marks}
                  </Td>
                  <Td>
                    <StatusBadge status={st(i)} />
                  </Td>
                  <EditCell />
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      )}

      {tab === 'cases' && (
        <Panel>
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Case</Th>
                <Th>Subject</Th>
                <Th align="right">Steps</Th>
                <Th>Status</Th>
                <Th align="right" className="pr-4">
                  <span className="sr-only">Actions</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {clinicalCases.map((c, i) => (
                <Tr key={c.id} hover>
                  <Td className="pl-4">
                    <span className="font-medium">{c.title}</span>
                    <span className="text-[11.5px] text-ink-3">{c.presentation}</span>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 text-ink-2">
                      <SubjectDot id={c.subjectId} />
                      {getSubject(c.subjectId).short}
                    </span>
                  </Td>
                  <Td align="right" className="tnum font-mono text-ink-2">
                    {c.steps}
                  </Td>
                  <Td>
                    <StatusBadge status={st(i + 1)} />
                  </Td>
                  <EditCell />
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      )}

      {tab === 'skills' && (
        <Panel>
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Skill</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th align="right" className="pr-4">
                  <span className="sr-only">Actions</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <Tr key={s.id} hover>
                  <Td className="pl-4 font-medium">{s.name}</Td>
                  <Td>
                    <Badge tone="neutral">{s.category}</Badge>
                  </Td>
                  <Td>
                    <StatusBadge status="Published" />
                  </Td>
                  <EditCell />
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      )}
      <BulkImport
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="Bulk import practical items"
        itemNoun="items"
        fields={['Title', 'Type', 'Subject', 'Duration', 'Marks', 'Mark scheme']}
        sampleCsv={SAMPLE}
        onImport={(n) => setImported(n)}
      />
    </PageContainer>
  )
}
