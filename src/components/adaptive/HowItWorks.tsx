/**
 * The rules surface, written for the student being judged by them.
 *
 * This exists because the alternative — an opaque score a student cannot argue
 * with — is the thing that makes adaptive systems resented. Everything here is
 * read from the live configuration rather than transcribed, so it cannot drift
 * from what the algorithm actually did.
 *
 * What is deliberately *not* here: item parameters, held-out answers, fraud
 * thresholds, and anything else that would let the system be gamed. The
 * governing principles are public; the levers are not.
 *
 * Every string is wrapped for translation, including the shared constants in
 * `explain.ts` and `config.ts`. That matters more here than anywhere else in
 * Adaptive Study: this is the page a student reads when they disagree with a
 * status, and a page that explains itself only in English cannot do that job for
 * a student studying in Arabic.
 */

import { AlertTriangle, BookOpenCheck, Gauge, ScrollText, ShieldCheck } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Caveat, SubHeading, percent } from './parts'
import {
  MEASUREMENT_SEPARATION, PREDICTION_CAVEAT, STATUS_EXPLANATION,
  WRONG_ATTEMPTS_VS_WEAK_CONCEPTS,
} from '@/data/adaptive/explain'
import { CONCEPT_STATUS_LABEL, type ConceptStatus } from '@/data/adaptive/masteryModel'
import { ALLOCATION_NEEDS, NEED_LABEL, NON_NEGOTIABLE_CONSTRAINTS, RELAXABLE_CONSTRAINT_LABEL } from '@/data/adaptive/config'
import { rawWrongTotal, type AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useI18n } from '@/lib/i18n'

/** What is measured, in the order it is measured. */
const MEASURED = [
  ['Concept mastery', 'A decayed estimate per concept, rebuilt from every answer you have given. It carries a range, not a single number, and the range widens as evidence ages.'],
  ['Blueprint coverage', 'How much of your exam blueprint, by weight, has any evidence behind it. Covered means practised at all — not mastered.'],
  ['Retention', 'Whether a concept survives a gap. A correct answer at least two days after the last one counts differently from four in a row.'],
  ['Uncertainty', 'How little is known about a concept. This is what funds practice on things you have never been asked about.'],
  ['Readiness', 'A separate, blueprint-balanced, timed measurement using questions held back from your practice.'],
] as const

const NOT_MEASURED = [
  'Time spent in the app, or how often you open it.',
  'How many questions you have completed.',
  'Your accuracy inside adaptive blocks — those deliberately oversample your weak areas, so it reads lower than your real standing.',
  'Anything about other students. No figure here is a comparison.',
] as const

export function HowItWorks({ study }: { study: AdaptiveStudy }) {
  const { t, lang } = useI18n()
  const rawWrong = rawWrongTotal(study.events)
  const weakConcepts = [...study.states.values()].filter((state) => state.status === 'weak').length
  const lastEvidence = study.events[study.events.length - 1]?.at ?? null
  // One submitted answer produces one evidence event per concept it maps to
  // (`evidenceLedger.ts`'s `<attemptId>:<conceptId>` id) — `rawWrongTotal`
  // already collapses that back to distinct attempts via `attemptId`, so this
  // has to as well, or a question tagged with several concepts would count as
  // several correct answers here.
  const correctAnswers = new Set(
    study.events.filter((event) => event.correct === true).map((event) => event.attemptId),
  ).size

  return (
    <div className="space-y-5">
      <Panel>
        <PanelHeader
          title={t('Two systems, measured separately')}
          icon={Gauge}
          action={
            <div className="flex gap-2">
              <Badge tone="outline">{t('Config')} v{study.config.version}</Badge>
              {study.blueprint.stored && <Badge tone="outline">{t('Blueprint')} v{study.blueprint.stored.version}</Badge>}
            </div>
          }
        />
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div>
            <SubHeading>{t(MEASUREMENT_SEPARATION.adaptive.heading)}</SubHeading>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{t(MEASUREMENT_SEPARATION.adaptive.body)}</p>
          </div>
          <div>
            <SubHeading>{t(MEASUREMENT_SEPARATION.readiness.heading)}</SubHeading>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{t(MEASUREMENT_SEPARATION.readiness.body)}</p>
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t(WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.heading)} icon={AlertTriangle} />
        <div className="space-y-4 p-5">
          <p className="text-[13.5px] leading-relaxed text-ink-2">{t(WRONG_ATTEMPTS_VS_WEAK_CONCEPTS.body)}</p>
          <div className="flex flex-wrap gap-2">
            {/* Split around the numeral rather than concatenated as one English
                sentence: Arabic puts the count between the two halves in a
                different order from English, and a single template with the
                number glued to one side reads wrong in one language or the other. */}
            <Badge tone="outline">
              {t('Your record:')} <span className="tnum font-mono">{rawWrong}</span> {t('wrong answers')}
            </Badge>
            <Badge tone="outline">
              <span className="tnum font-mono">{weakConcepts}</span> {t('weak concepts')}
            </Badge>
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader title={t('What Nishany measures')} icon={BookOpenCheck} />
          <div className="space-y-4 p-5">
            {MEASURED.map(([title, body]) => (
              <div key={title}>
                <p className="text-[13px] font-semibold text-ink">{t(title)}</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-2">{t(body)}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={t('What it does not measure')} icon={ShieldCheck} />
          <div className="space-y-3 p-5">
            {NOT_MEASURED.map((line) => (
              <p key={line} className="text-[12.5px] leading-relaxed text-ink-2">{t(line)}</p>
            ))}
            <Caveat>{t(PREDICTION_CAVEAT)}</Caveat>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHeader title={t('How your next block is put together')} icon={ScrollText} />
        <div className="space-y-4 p-5">
          <p className="text-[13.5px] leading-relaxed text-ink-2">
            {t('Each block is divided into slots. These are allocation targets, not separate pools — one question often satisfies several needs at once, and always takes exactly one slot.')}
          </p>
          <Table>
            <thead>
              <tr><Th>{t('Need')}</Th><Th align="end">{t('Share of your next block')}</Th></tr>
            </thead>
            <tbody>
              {ALLOCATION_NEEDS.map((need) => (
                <Tr key={need}>
                  <Td>{t(NEED_LABEL[need])}</Td>
                  <Td align="end" className="tnum font-mono text-[12.5px]">{percent(study.shares[need])}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          {study.daysToExam !== null && (
            <p className="text-[12.5px] leading-relaxed text-ink-3">
              {t('These shares reflect your exam being')}{' '}
              <span className="tnum font-mono">{study.daysToExam}</span> {t('days away.')}{' '}
              {t('Blueprint coverage rises as an exam approaches, and it is a floor rather than a ceiling — every question you answer counts toward coverage whichever need selected it.')}
            </p>
          )}
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t('Rules that are never relaxed')} icon={ShieldCheck} />
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {NON_NEGOTIABLE_CONSTRAINTS.map((rule) => (
              <Badge key={rule} tone="success" dot>{t(rule)}</Badge>
            ))}
          </div>
          <p className="text-[13px] leading-relaxed text-ink-2">
            {t('When the question bank cannot satisfy every selection rule, the rules below are relaxed in this published order, the relaxation is recorded, and a shortage is reported. Blocks are never quietly filled with whatever topic happens to have the most questions.')}
          </p>
          <ol className="space-y-1.5">
            {study.config.relaxationOrder.map((rule, index) => (
              <li key={rule} className="flex gap-2.5 text-[12.5px] text-ink-2">
                <span className="tnum font-mono text-ink-3">{index + 1}.</span>
                {t(RELAXABLE_CONSTRAINT_LABEL[rule])}
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t('What each status means')} icon={BookOpenCheck} />
        <Table>
          <thead>
            <tr><Th>{t('Status')}</Th><Th>{t('Meaning')}</Th></tr>
          </thead>
          <tbody>
            {(Object.keys(CONCEPT_STATUS_LABEL) as ConceptStatus[]).map((status) => (
              <Tr key={status}>
                <Td className="whitespace-nowrap font-medium">{t(CONCEPT_STATUS_LABEL[status])}</Td>
                <Td className="text-[12.5px] text-ink-2">{t(STATUS_EXPLANATION[status])}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>

      <Panel>
        <PanelHeader title={t('Provenance')} icon={ScrollText} />
        <Table>
          <thead>
            <tr><Th>{t('Field')}</Th><Th align="end">{t('Value')}</Th></tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{t('Most recent evidence')}</Td>
              <Td align="end" className="tnum font-mono text-[12.5px]">
                {/* Formatted in the reading language, not the browser's. A page
                    otherwise entirely in Arabic should not date itself in English. */}
                {lastEvidence ? new Date(lastEvidence).toLocaleDateString(lang === 'ar' ? 'ar-EG' : undefined) : t('None yet')}
              </Td>
            </Tr>
            <Tr>
              <Td>{t('Answers recorded')}</Td>
              <Td align="end" className="tnum font-mono text-[12.5px]">{rawWrong + correctAnswers}</Td>
            </Tr>
            <Tr>
              <Td>{t('Algorithm version')}</Td>
              <Td align="end" className="tnum font-mono text-[12.5px]">v{study.config.version}</Td>
            </Tr>
            <Tr>
              <Td>{t('Blueprint')}</Td>
              <Td align="end" className="tnum font-mono text-[12.5px]">
                {study.blueprint.stored ? `v${study.blueprint.stored.version}` : t('Derived from concept weights')}
              </Td>
            </Tr>
            <Tr>
              <Td>{t('Concepts in scope')}</Td>
              <Td align="end" className="tnum font-mono text-[12.5px]">{study.blueprint.nodes.length}</Td>
            </Tr>
          </tbody>
        </Table>
      </Panel>

      <Panel>
        <PanelHeader title={t('Change history')} icon={ScrollText} />
        {study.config.changeNotes.length === 0 ? (
          <p className="p-5 text-[13px] text-ink-3">{t('No changes recorded yet.')}</p>
        ) : (
          <div className="divide-y divide-line">
            {study.config.changeNotes.slice(0, 8).map((note) => (
              <div key={`${note.version}-${note.at}`} className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="outline">v{note.version}</Badge>
                  <span className="tnum font-mono text-[11.5px] text-ink-3">{note.at}</span>
                </div>
                {/* The lookup does the right thing on both kinds of note. The
                    configuration Nishany ships with carries a note we wrote, and
                    it is translated. A note an administrator typed has no entry,
                    so it falls back to exactly what they wrote — translating that
                    would put words in their mouth about why a student's score
                    moved. */}
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{t(note.note)}</p>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}
