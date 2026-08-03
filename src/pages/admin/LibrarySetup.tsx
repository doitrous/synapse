import { useState } from 'react'
import { Plus, Pencil } from 'lucide-react'
import { libraryTopics } from '@/data/library'
import { libraryTopicMeta } from '@/data/admin'
import { getSubject } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { IconButton } from '@/components/ui/IconButton'
import { SearchInput } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { SubjectDot } from '@/components/ui/Subject'

export function LibrarySetup() {
  const [query, setQuery] = useState('')
  const rows = libraryTopics.filter((t) =>
    `${t.title} ${getSubject(t.subjectId).name}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <PageContainer>
      <PageHeader
        title="Library Setup"
        description="Author and organise topics, subtopics, and their consolidated notes."
        actions={
          <Button variant="primary" size="md" iconLeft={Plus}>
            New topic
          </Button>
        }
      />

      <div className="mb-4">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics…"
          className="max-w-xs"
        />
      </div>

      <Panel>
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Topic</Th>
              <Th>Subject</Th>
              <Th align="right">Subtopics</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
              <Th>Author</Th>
              <Th align="right" className="pr-4">
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const meta = libraryTopicMeta[t.id]
              const subj = getSubject(t.subjectId)
              return (
                <Tr key={t.id} hover>
                  <Td className="pl-4 font-medium">{t.title}</Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 text-ink-2">
                      <SubjectDot id={subj.id} />
                      {subj.name}
                    </span>
                  </Td>
                  <Td align="right" className="tnum font-mono text-ink-2">
                    {t.subtopics.length}
                  </Td>
                  <Td>{meta ? <StatusBadge status={meta.status} /> : null}</Td>
                  <Td className="whitespace-nowrap text-[12.5px] text-ink-2">{meta?.updated}</Td>
                  <Td className="whitespace-nowrap text-[12.5px] text-ink-2">{meta?.author}</Td>
                  <Td align="right" className="pr-4">
                    <IconButton icon={Pencil} label="Edit topic" size="sm" />
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Table>
      </Panel>
    </PageContainer>
  )
}
