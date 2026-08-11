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
import { storage } from '@/data/admin'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
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
import { useLiveResources } from '@/lib/useLiveResources'
import { usePersistentState } from '@/lib/usePersistentState'
import { API_MODE } from '@/lib/api'

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}

const RESOURCE_TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']

function resourceType(value?: string): ResourceType {
  return RESOURCE_TYPES.includes(value as ResourceType) ? value as ResourceType : 'Article'
}

function managedResource(item: ManagedContentItem) {
  return {
    id: item.id,
    title: item.title,
    type: resourceType(item.fields.Type),
    subjectId: item.subjectId,
    year: Number(item.fields.Year) || null,
    status: item.status,
    universityIds: item.resourceData?.universityIds ?? [],
  }
}

export function ResourcesMedia() {
  const demoResources = useLiveResources()
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [universityCatalogue] = useUniversityCatalogue()
  const resources = (API_MODE
    ? ledger.filter((item) => item.kind === 'resource' && item.status !== 'Archived').map(managedResource)
    : demoResources.map((resource) => ({
      ...resource,
      status: 'Published' as const,
      universityIds: scopeUniversities(resource.id),
    })))
    .sort((a, b) => (a.universityIds[0] ?? '').localeCompare(b.universityIds[0] ?? '') || a.title.localeCompare(b.title))
  const pct = storage.totalGb > 0 ? Math.round((storage.usedGb / storage.totalGb) * 100) : 0

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
              {storage.totalGb > 0 ? `${storage.usedGb} GB of ${storage.totalGb} GB` : 'Usage is measured by the production volume'}
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
            {resources.map((r) => (
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
                    {r.universityIds.map((id) => (
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
                  —
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {r.year ?? '—'}
                </Td>
                <Td>
                  <StatusBadge status={r.status} />
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
