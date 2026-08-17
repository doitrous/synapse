/**
 * Adaptive Study.
 *
 * Synapse selects the most useful next learning action while preserving exam
 * coverage, medical-content safety, student autonomy, and an auditable
 * explanation. It optimises preparation quality — not engagement volume, and
 * not a guaranteed exam result.
 *
 * The tab order is the argument the product makes: what to do now, do it,
 * where you stand, what it knows about you, when to do it, and finally how all
 * of that was decided. "How this works" is last but not optional — a student
 * who cannot inspect the rules cannot meaningfully exercise the overrides on
 * the Concepts tab.
 */

import { useState } from 'react'
import {
  Braces, CalendarRange, ClipboardCheck, Compass, PlayCircle, ScrollText,
} from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Today } from '@/components/adaptive/Today'
import { Practice } from '@/components/adaptive/Practice'
import { Readiness } from '@/components/adaptive/Readiness'
import { Concepts } from '@/components/adaptive/Concepts'
import { Plan } from '@/components/adaptive/Plan'
import { HowItWorks } from '@/components/adaptive/HowItWorks'
import { useAdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useLatestReadiness } from '@/lib/adaptive/useReadiness'

const TABS = [
  { value: 'today', label: 'Today', icon: Compass },
  { value: 'practice', label: 'Practice', icon: PlayCircle },
  { value: 'readiness', label: 'Readiness', icon: ClipboardCheck },
  { value: 'concepts', label: 'Concepts', icon: Braces },
  { value: 'plan', label: 'Plan', icon: CalendarRange },
  { value: 'how', label: 'How this works', icon: ScrollText },
]

export function AdaptiveStudy() {
  const [tab, setTab] = useState('today')
  const study = useAdaptiveStudy()
  const readiness = useLatestReadiness()

  return (
    <PageContainer>
      <PageHeader
        title="Adaptive Study"
        description="Synapse keeps finding what you are most likely to forget or misunderstand, revisits it at the right time, and keeps your practice aligned with your exam blueprint."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">Algorithm v{study.config.version}</Badge>
            {study.daysToExam !== null && (
              <Badge tone="accent" dot>
                <span className="tnum font-mono">{study.daysToExam}</span> days to exam
              </Badge>
            )}
          </div>
        }
      />

      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />

      {study.scopeUnknown ? (
        // Every figure on this page is scoped to a university and year. Rendering
        // it without one would show a blueprint that belongs to nobody.
        <Panel>
          <EmptyState
            icon={Compass}
            title="Your university and year are not set"
            description="Adaptive Study works against your own exam blueprint, so it needs to know which programme you are on. Set it in your account and this page will fill in."
          />
        </Panel>
      ) : (
        <>
          {tab === 'today' && (
            <Today
              study={study}
              readiness={readiness}
              onPractice={() => setTab('practice')}
              onReadiness={() => setTab('readiness')}
            />
          )}
          {tab === 'practice' && <Practice study={study} />}
          {tab === 'readiness' && <Readiness study={study} />}
          {tab === 'concepts' && <Concepts study={study} />}
          {tab === 'plan' && <Plan study={study} />}
          {tab === 'how' && <HowItWorks study={study} />}
        </>
      )}
    </PageContainer>
  )
}
