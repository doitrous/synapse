import {
  Upload,
  Pencil,
  HardDrive,
  BookMarked,
  PlayCircle,
  ScrollText,
  Layers,
  Newspaper,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ResourceType } from '@/data/types'
import { resources } from '@/data/resources'
import { storage } from '@/data/admin'
import { getSubject } from '@/data/student'
import { scopeUniversities, scopeYear } from '@/data/universities'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { IconButton } from '@/components/ui/IconButton'
import { Meter } from '@/components/ui/Meter'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}
const SIZE_MB: Record<ResourceType, number> = { Book: 4.2, Video: 182, Guideline: 1.1, Deck: 8.4, Article: 0.4 }

function fmtSize(mb: number) {
  return mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : `${mb.toFixed(1)} MB`
}

export function ResourcesMedia() {
  const [universityCatalogue] = useUniversityCatalogue()
  const pct = Math.round((storage.usedGb / storage.totalGb) * 100)

  return (
    <PageContainer>
      <PageHeader
        title="Resources & Media"
        description="Upload and manage resources and media, and control how they surface."
        actions={
          <Button variant="primary" size="md" iconLeft={Upload}>
            Upload
          </Button>
        }
      />

      <Panel className="mb-4 flex flex-wrap items-center gap-4 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
          <Icon icon={HardDrive} size={18} />
        </span>
        <div className="flex-1">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[13px] font-medium text-ink">Storage</span>
            <span className="tnum font-mono text-[12.5px] text-ink-2">
              {storage.usedGb} GB of {storage.totalGb} GB
            </span>
          </div>
          <Meter value={pct} tone={pct > 85 ? 'warning' : 'accent'} />
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="All media" hint={`${resources.length} files`} />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Title</Th>
              <Th>Type</Th>
              <Th>Subject</Th>
              <Th>Scope</Th>
              <Th align="right">Size</Th>
              <Th align="right">Year</Th>
              <Th>Status</Th>
              <Th align="right" className="pr-4">
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r, i) => (
              <Tr key={r.id} hover>
                <Td className="pl-4">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded border border-line bg-surface-2 text-ink-2">
                      <Icon icon={TYPE_ICON[r.type]} size={14} />
                    </span>
                    <span className="font-medium">{r.title}</span>
                  </span>
                </Td>
                <Td className="text-ink-2">{r.type}</Td>
                <Td>
                  <span className="inline-flex items-center gap-1.5 text-ink-2">
                    <SubjectDot id={r.subjectId} />
                    {getSubject(r.subjectId).short}
                  </span>
                </Td>
                <Td>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-2">
                      {scopeYear(r.subjectId).replace('Year ', 'Y')}
                    </span>
                    {scopeUniversities(r.id).map((id) => (
                      <span
                        key={id}
                        className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3"
                      >
                        {universityFrom(universityCatalogue, id)?.short}
                      </span>
                    ))}
                  </div>
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {fmtSize(SIZE_MB[r.type])}
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {r.year}
                </Td>
                <Td>
                  <StatusBadge status={i === 4 ? 'Archived' : 'Published'} />
                </Td>
                <Td align="right" className="pr-4">
                  <IconButton icon={Pencil} label="Edit resource" size="sm" />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
