/**
 * Building a block, and answering it.
 *
 * Two things here are load-bearing:
 *
 *  - **The preview is honest.** The allocation shown before the block is built
 *    from the same plan the builder uses, including any shortage. A preview that
 *    promises eight weakness items where the pool holds three is worse than none.
 *  - **Tutor and Exam differ only in feedback timing.** Both render the same
 *    approved stem, options and key. `feedbackVisible` is the single gate, so no
 *    component here can leak an answer by rendering a rationale it should not.
 */

import { useCallback, useMemo, useState } from 'react'
import {
  CheckCircle2, ChevronLeft, ChevronRight, CircleHelp, PlayCircle, Sparkles, Timer,
} from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Segmented } from '@/components/ui/Tabs'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, Select } from '@/components/ui/Field'
import { QuestionView } from '@/components/qbank/QuestionView'
import { QuestionNavigator, type QuestionState } from '@/components/qbank/QuestionNavigator'
import { Caveat, ShareRow, SubHeading, percent } from './parts'
import { ALLOCATION_NEEDS, NEED_LABEL } from '@/data/adaptive/config'
import { clampBlockSize, planAllocation } from '@/data/adaptive/allocation'
import { buildBlock, type AdaptiveBlock } from '@/data/adaptive/blockBuilder'
import { blockSummary, explainBlock, shortageNotice } from '@/data/adaptive/explain'
import { RELAXABLE_CONSTRAINT_LABEL } from '@/data/adaptive/config'
import { usedRepairQuestions } from '@/data/adaptive/boosts'
import { correctOptionIndex } from '@/data/adaptive/item'
import type { AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useRecordAdaptiveAnswer } from '@/lib/adaptive/useAdaptiveEvidence'
import {
  feedbackVisible, useAdaptiveSession, type StoredDiagnostics,
} from '@/lib/adaptive/useAdaptiveSession'
import type { Confidence } from '@/data/adaptive/evidenceLedger'
import { cn } from '@/lib/cn'

const SIZES = [20, 25, 30, 35, 40]

/** What the block will contain, built from the same plan the builder will use. */
function AllocationPreview({ study, size }: { study: AdaptiveStudy; size: number }) {
  const plan = useMemo(
    () => planAllocation(size, study.shares, study.debt, study.config),
    [size, study.shares, study.debt, study.config],
  )

  return (
    <div className="space-y-3.5">
      {ALLOCATION_NEEDS.map((need) => (
        <ShareRow
          key={need}
          label={NEED_LABEL[need]}
          value={plan.targets[need]}
          max={size}
          right={`${plan.targets[need]} of ${size}`}
          tone={need === 'weakness' ? 'primary' : 'neutral'}
        />
      ))}
      {plan.debtRepaid > 0 && (
        <Caveat>
          <span className="tnum font-mono">{plan.debtRepaid}</span> extra slot
          {plan.debtRepaid === 1 ? ' is' : 's are'} going to blueprint coverage to repay a shortfall from earlier blocks.
        </Caveat>
      )}
    </div>
  )
}

/** Reduce a freshly built block to what the session needs to keep. */
function storeDiagnostics(block: AdaptiveBlock, config: AdaptiveStudy['config']): StoredDiagnostics {
  return {
    reasons: Object.fromEntries(block.slots.map((slot) => [slot.item.id, slot.reason])),
    summary: blockSummary(block),
    notice: shortageNotice(block),
    relaxed: block.relaxed.map((rule) => RELAXABLE_CONSTRAINT_LABEL[rule]),
    redistributed: block.redistributions.map((entry) => ({ need: NEED_LABEL[entry.from], slots: entry.slots })),
    targets: { ...block.targets },
    served: { ...block.served },
    unseenShare: block.unseenShare,
    demandingShare: block.demandingShare,
    seed: block.seed,
    configVersion: config.version,
  }
}

/** What the builder actually managed, including anything it could not. */
function BlockDiagnostics({ diagnostics, tolerance }: { diagnostics: StoredDiagnostics; tolerance: number }) {
  return (
    <div className="space-y-4">
      <p className="text-[13.5px] leading-relaxed text-ink-2">{diagnostics.summary}</p>

      <div className="space-y-3">
        <SubHeading>Slots filled</SubHeading>
        {ALLOCATION_NEEDS.map((need) => {
          const target = diagnostics.targets[need] ?? 0
          const served = diagnostics.served[need] ?? 0
          return (
            <ShareRow
              key={need}
              label={NEED_LABEL[need]}
              value={served}
              max={Math.max(1, target)}
              right={`${served} of ${target}`}
              tone={Math.abs(target - served) <= tolerance ? 'neutral' : 'warning'}
            />
          )
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="outline">{percent(diagnostics.unseenShare)} new to you</Badge>
        <Badge tone="outline">{percent(diagnostics.demandingShare)} demanding</Badge>
        <Badge tone="outline">Config v{diagnostics.configVersion}</Badge>
      </div>

      {diagnostics.redistributed.length > 0 && (
        <Caveat>
          {diagnostics.redistributed.map((entry) => (
            <span key={entry.need} className="block">
              Nothing in the bank could serve {entry.need.toLowerCase()} right now, so its{' '}
              <span className="tnum font-mono">{entry.slots}</span> slots went to the needs that could.
            </span>
          ))}
        </Caveat>
      )}

      {diagnostics.notice && (
        <Caveat>
          {diagnostics.notice}
          {diagnostics.relaxed.length > 0 && (
            <span className="mt-1 block">Relaxed, in order: {diagnostics.relaxed.join(', ')}.</span>
          )}
        </Caveat>
      )}
    </div>
  )
}

/** The per-slot disclosure: why this question, in the student's words. */
function WhyThis({ reason, expanded, onToggle }: { reason: string; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-lg border border-line bg-surface-2 px-3 py-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 text-start text-[12.5px] font-medium text-ink-2 hover:text-ink"
      >
        <Icon icon={Sparkles} size={14} className="shrink-0 text-primary" />
        <span className="min-w-0 flex-1 truncate">{expanded ? 'Why this question' : reason}</span>
      </button>
      {expanded && <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{reason}</p>}
    </div>
  )
}

export function Practice({ study }: { study: AdaptiveStudy }) {
  const [size, setSize] = useState(20)
  const [mode, setMode] = useState<'tutor' | 'exam'>('tutor')
  const [expandedReason, setExpandedReason] = useState(false)
  const { session, start, answer, markCommitted, goTo, submit, discard } = useAdaptiveSession()
  const record = useRecordAdaptiveAnswer(study.config)

  const itemsById = useMemo(() => new Map(study.items.map((item) => [item.id, item])), [study.items])

  /**
   * Rebuild the running block from its stored ids.
   *
   * Not re-selected: re-running the builder mid-block would change the questions
   * under the student's feet as their own answers moved their concept states.
   */
  const activeItems = useMemo(
    () => (session?.itemIds ?? []).map((id) => itemsById.get(id)).filter((item) => item !== undefined),
    [session, itemsById],
  )

  /**
   * The empty block, when the bank could not supply one.
   *
   * Held in component state rather than the session, because there is no session
   * to hold it — a block with no slots is never started, and the student still
   * needs to be told why nothing appeared.
   */
  const [emptyBuild, setEmptyBuild] = useState<AdaptiveBlock | null>(null)

  const build = useCallback(() => {
    const clamped = clampBlockSize(size, study.config)
    const blockId = `blk-${Date.now().toString(36)}-${clamped}`
    const plan = planAllocation(clamped, study.shares, study.debt, study.config)

    const block = explainBlock(buildBlock({
      blockId,
      items: study.items,
      // Fatigue carried from earlier work today, not from within this block: the
      // block is built once, and rebuilding it as the student tires would move
      // questions under their feet mid-session.
      context: study.context(study.fatigue),
      targets: plan.targets,
      size: clamped,
      mode,
      scope: study.scope,
      heldOutIds: study.heldOut,
      // A question already used to repair a concept is never that concept's
      // repair again — re-answering it proves the explanation was read.
      excludedQuestionIds: usedRepairQuestions(study.boosts, [...study.states.keys()]),
      debtBefore: study.debt.slots,
      debtAfter: study.debt.slots,
      blueprintVersion: study.blueprint.stored?.version ?? null,
      createdAt: new Date().toISOString(),
    }))

    if (block.slots.length > 0) {
      setEmptyBuild(null)
      start({
        blockId,
        itemIds: block.slots.map((slot) => slot.item.id),
        mode,
        diagnostics: storeDiagnostics(block, study.config),
      })
    } else {
      setEmptyBuild(block)
    }
  }, [size, mode, study, start])

  const commit = useCallback(() => {
    if (!session) return
    const committed: string[] = []
    for (const item of activeItems) {
      const given = session.answers[item.id]
      if (!given || given.committed) continue
      const correctIndex = correctOptionIndex(item)
      record({
        item,
        blockId: session.blockId,
        chosenIndex: given.chosenIndex,
        correct: given.chosenIndex === null ? null : given.chosenIndex === correctIndex,
        outcome: given.chosenIndex === null ? 'blank' : 'answered',
        confidence: given.confidence,
        seconds: given.seconds,
        mode: session.mode,
        // An item the student has already been shown the answer to contributes
        // limited evidence, so which showing this is has to be recorded.
        exposure: (study.exposure.get(item.id) ?? 0) > 0 ? 'repeat-after-reveal' : 'first',
      })
      committed.push(item.id)
    }
    markCommitted(committed)
    submit()
  }, [session, activeItems, record, markCommitted, submit, study.exposure])

  if (!study.items.length) {
    return (
      <Panel>
        <EmptyState
          icon={CircleHelp}
          title="No approved questions in scope"
          description="Adaptive practice reads the same published question bank as everything else. Nothing yet matches your university, year and modules."
        />
      </Panel>
    )
  }

  // ---- setup ---------------------------------------------------------------
  if (!session) {
    return (
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel>
          <PanelHeader title="Build an adaptive block" icon={PlayCircle} />
          <div className="space-y-5 p-5">
            <Field label="Questions">
              <Select value={String(size)} onChange={(event) => setSize(Number(event.target.value))}>
                {SIZES.map((option) => <option key={option} value={option}>{option} questions</option>)}
              </Select>
            </Field>

            <div>
              <p className="mb-2 text-[12.5px] font-medium text-ink-2">Presentation</p>
              <Segmented
                value={mode}
                onChange={(next) => setMode(next as typeof mode)}
                items={[{ value: 'tutor', label: 'Tutor' }, { value: 'exam', label: 'Exam' }]}
              />
              <p className="mt-2 text-[12px] leading-relaxed text-ink-3">
                {mode === 'tutor'
                  ? 'The answer and explanation appear as soon as you respond to each question.'
                  : 'Feedback is withheld until you submit the whole block. The questions themselves are identical.'}
              </p>
            </div>

            <Button variant="primary" iconLeft={PlayCircle} onClick={build} className="w-full">
              Build the block
            </Button>

            {emptyBuild && emptyBuild.slots.length === 0 && (
              <Caveat>
                The bank could not supply a single question that satisfies your scope and the selection rules. This is a
                content shortage and has been recorded.
              </Caveat>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="What it will contain" icon={Sparkles} hint={`${size} slots`} />
          <div className="p-5"><AllocationPreview study={study} size={size} /></div>
        </Panel>
      </div>
    )
  }

  // ---- runner --------------------------------------------------------------
  const index = Math.min(session.cursor, Math.max(0, activeItems.length - 1))
  const item = activeItems[index]
  const reason = item ? session.diagnostics.reasons[item.id] : undefined
  const given = item ? session.answers[item.id] : undefined
  const revealed = item ? feedbackVisible(session, item.id) : false
  const answered = Object.keys(session.answers).length

  if (!item) {
    return (
      <Panel>
        <EmptyState
          icon={CircleHelp}
          title="This block could not be restored"
          description="The questions it referred to are no longer in your scope, so it cannot be shown."
          action={<Button onClick={discard}>Start again</Button>}
        />
      </Panel>
    )
  }

  /**
   * Where each question in the block stands.
   *
   * The same five states the Question Bank reports, from this session's own
   * record: `omitted` is a question the student reached and moved past without
   * answering, which is the one worth naming — it is what somebody scanning for
   * unfinished work is actually looking for, and it is not the same as one they
   * have never seen. Right and wrong are only reported once the feedback for
   * that question is visible, so the strip cannot give away an answer that the
   * question itself is still withholding.
   */
  // Captured, because narrowing from the guards above does not survive into a
  // function that could in principle be called later.
  const block = session
  function stateFor(position: number): QuestionState {
    const entry = activeItems[position]
    const state = entry ? block.answers[entry.id] : undefined
    if (!entry || state?.chosenIndex == null) return position < index ? 'omitted' : 'unseen'
    if (!feedbackVisible(block, entry.id)) return 'answered'
    return correctOptionIndex(entry) === state.chosenIndex ? 'correct' : 'incorrect'
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* `min-w-0` on the grid items, not just the grid: a grid child defaults to
          `min-width: auto`, so a truncating label widens the whole column rather
          than ellipsing, and the page scrolls sideways on a phone. */}
      <div className="min-w-0 space-y-4">
        {/* The same strip the Question Bank uses, in the same place: above the
            question rather than in the rail beside it. It used to be a bespoke
            grid that could only say answered or not — no right or wrong after
            submitting, no omitted, and no legend to read any of it by. */}
        <QuestionNavigator
          count={activeItems.length}
          current={index}
          stateFor={stateFor}
          isFlagged={() => false}
          onJump={goTo}
          graded={Boolean(session.submittedAt) || session.mode === 'tutor'}
        />

        <Panel>
          <PanelHeader
            title={`Question ${index + 1} of ${activeItems.length}`}
            icon={Timer}
            hint={session.mode === 'tutor' ? 'Tutor — feedback now' : 'Exam — feedback on submit'}
            action={
              <Badge tone={session.submittedAt ? 'success' : 'outline'}>
                {session.submittedAt ? 'Submitted' : `${answered}/${activeItems.length} answered`}
              </Badge>
            }
          />
          <div className="space-y-4 p-5">
            {reason && <WhyThis reason={reason} expanded={expandedReason} onToggle={() => setExpandedReason((v) => !v)} />}

            <QuestionView
              question={item.question}
              chosen={given?.chosenIndex ?? null}
              revealed={revealed}
              correctIndex={correctOptionIndex(item)}
              onChoose={(chosenIndex) => {
                // Confidence is captured with the answer, not after it: asking
                // afterwards in tutor mode would ask a student who has just been
                // told they were wrong how sure they had been.
                if (session.answers[item.id]?.committed) return
                answer(item.id, {
                  chosenIndex,
                  confidence: given?.confidence ?? 'unstated',
                  seconds: null,
                })
              }}
            />

            {!given?.committed && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2.5">
                <span className="text-[12.5px] text-ink-2">How sure are you?</span>
                {(['sure', 'unsure'] as Confidence[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => answer(item.id, {
                      chosenIndex: given?.chosenIndex ?? null,
                      confidence: given?.confidence === level ? 'unstated' : level,
                      seconds: given?.seconds ?? null,
                    })}
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-[12px] font-medium transition-colors',
                      given?.confidence === level
                        ? 'border-primary bg-primary-tint text-primary-strong'
                        : 'border-line text-ink-2 hover:border-line-2 hover:text-ink',
                    )}
                  >
                    {level === 'sure' ? 'Sure' : 'Not sure'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Panel>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button iconLeft={ChevronLeft} onClick={() => goTo(Math.max(0, index - 1))} disabled={index === 0}>
            Previous
          </Button>
          <div className="flex gap-2">
            {!session.submittedAt && (
              <Button variant="primary" iconLeft={CheckCircle2} onClick={commit}>
                Submit block
              </Button>
            )}
            {session.submittedAt && <Button onClick={discard}>Finish</Button>}
            <Button
              iconRight={ChevronRight}
              onClick={() => goTo(Math.min(activeItems.length - 1, index + 1))}
              disabled={index >= activeItems.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="min-w-0 space-y-4">
        <Panel>
          <PanelHeader title="How this block was built" icon={Sparkles} />
          <div className="p-5">
            <BlockDiagnostics
              diagnostics={session.diagnostics}
              tolerance={study.config.constraints.quotaTolerance}
            />
          </div>
        </Panel>
      </div>
    </div>
  )
}
