/**
 * The configuration surfaces, one per area of the algorithm.
 *
 * They all take a draft and a setter rather than writing directly. Nothing an
 * admin types here is live until it is published with a dated note, because a
 * threshold that changes without a change note is a threshold nobody can explain
 * to the students whose status moved because of it.
 */

import {
  Boxes, Brain, ClipboardCheck, CalendarRange, Layers, SlidersHorizontal, Timer, Zap,
} from 'lucide-react'
import { NumberSetting, OrderEditor, SettingGroup, ShareEditor, ToggleSetting } from './controls'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Caveat } from '@/components/adaptive/parts'
import {
  ALLOCATION_NEEDS, NEED_LABEL, NON_NEGOTIABLE_CONSTRAINTS, RELAXABLE_CONSTRAINT_LABEL,
  type AdaptiveConfig, type AllocationNeed, type RelaxableConstraint,
} from '@/data/adaptive/config'
import type { HeldOutRegistry } from '@/data/adaptive/readiness'

export type Draft = AdaptiveConfig
export type SetDraft = (edit: (draft: Draft) => Draft) => void

/**
 * The config sections that are flat records of numbers.
 *
 * Named explicitly rather than derived, because the generic spread below is only
 * sound for object-valued sections — `version` and `updatedAt` are not editable
 * this way, and the type should say so rather than fail at the spread.
 */
type NumericSection = 'priority' | 'mastery' | 'validity' | 'statuses' | 'reviewIntervalDays' | 'interventions' | 'constraints' | 'readiness' | 'schedule'

/** Edit one nested field without spreading three levels at every call site. */
function field<K extends NumericSection>(setDraft: SetDraft, section: K) {
  return (key: keyof AdaptiveConfig[K], value: number) =>
    setDraft((draft) => ({ ...draft, [section]: { ...draft[section], [key]: value } }))
}

// ---- selection -------------------------------------------------------------

export function SelectionTab({ draft, setDraft }: { draft: Draft; setDraft: SetDraft }) {
  const constraint = field(setDraft, 'constraints')
  const priority = field(setDraft, 'priority')

  return (
    <div className="space-y-5">
      <SettingGroup
        title="Default allocation"
        icon={Layers}
        hint="Used when no exam is on the timetable"
        hypothesis
      >
        <ShareEditor
          entries={ALLOCATION_NEEDS.map((need) => ({
            key: need, label: NEED_LABEL[need], value: draft.defaultShares[need],
          }))}
          onChange={(key, value) => setDraft((current) => ({
            ...current,
            defaultShares: { ...current.defaultShares, [key as AllocationNeed]: value },
          }))}
        />
        <Caveat>
          These are allocation targets, not separate item pools. A single question may satisfy several needs and always
          consumes exactly one slot.
        </Caveat>
      </SettingGroup>

      <SettingGroup title="Exam-horizon allocation" icon={CalendarRange} hypothesis>
        <p className="text-[13px] leading-relaxed text-ink-2">
          Blueprint coverage is a <strong>floor</strong> in each band, never a ceiling — every selected question counts
          toward actual coverage whichever need bought its slot.
        </p>
        {draft.horizonBands.map((band, index) => (
          <div key={band.id} className="rounded-lg border border-line bg-surface-2 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-semibold text-ink">{band.label}</p>
              <Badge tone="outline">
                {band.maxDaysToExam === null ? 'No exam, or further out' : `≤ ${band.maxDaysToExam} days`}
              </Badge>
            </div>
            <ShareEditor
              entries={ALLOCATION_NEEDS.map((need) => ({
                key: need, label: NEED_LABEL[need], value: band.shares[need],
              }))}
              onChange={(key, value) => setDraft((current) => {
                const bands = [...current.horizonBands]
                bands[index] = {
                  ...bands[index],
                  shares: { ...bands[index].shares, [key as AllocationNeed]: value },
                }
                return { ...current, horizonBands: bands }
              })}
            />
          </div>
        ))}
      </SettingGroup>

      <SettingGroup title="Priority weights" icon={SlidersHorizontal} hypothesis>
        <NumberSetting
          label="Concept weakness" value={draft.priority.conceptWeakness} min={0} max={1} step={0.01}
          onChange={(value) => priority('conceptWeakness', value)}
          explain="How far a concept sits below the weak threshold, measured from its own evidence."
        />
        <NumberSetting
          label="Topic or subtopic gap" value={draft.priority.topicOrSubtopicGap} min={0} max={1} step={0.01}
          onChange={(value) => priority('topicOrSubtopicGap', value)}
          explain="Breadth around the concept that its own weakness does not already explain. Kept separate so parent and child are never charged twice for the same gap."
        />
        <NumberSetting
          label="Exam blueprint deficit" value={draft.priority.examBlueprintDeficit} min={0} max={1} step={0.01}
          onChange={(value) => priority('examBlueprintDeficit', value)}
          explain="Blueprint weight this question would newly cover."
        />
        <NumberSetting
          label="Spaced review urgency" value={draft.priority.spacedReviewUrgency} min={0} max={1} step={0.01}
          onChange={(value) => priority('spacedReviewUrgency', value)}
          explain="How overdue the concept's review is. Saturating, so one very old concept cannot outrank every genuinely urgent one."
        />
        <NumberSetting
          label="Information gain" value={draft.priority.informationGain} min={0} max={1} step={0.01}
          onChange={(value) => priority('informationGain', value)}
          explain="How much asking this would reduce uncertainty. This is what funds practice on concepts nothing has measured."
        />
        <NumberSetting
          label="Recent error boost" value={draft.priority.recentErrorBoost} min={0} max={1} step={0.01}
          onChange={(value) => priority('recentErrorBoost', value)}
          explain="Bounded contribution of error burden. Three errors on one concept make repair more urgent without creating three weak concepts."
        />
        <NumberSetting
          label="Novelty" value={draft.priority.novelty} min={0} max={1} step={0.01}
          onChange={(value) => priority('novelty', value)}
          explain="Preference for questions this student has never seen."
        />
        <NumberSetting
          label="Repetition penalty" value={draft.priority.repetitionPenalty} min={0} max={1} step={0.01}
          onChange={(value) => priority('repetitionPenalty', value)}
          explain="Subtracted when the concept or topic was asked about in recent blocks."
        />
        <NumberSetting
          label="Exposure penalty" value={draft.priority.exposurePenalty} min={0} max={1} step={0.01}
          onChange={(value) => priority('exposurePenalty', value)}
          explain="Subtracted in proportion to how often this student has already seen the item."
        />
        <NumberSetting
          label="Fatigue penalty" value={draft.priority.fatiguePenalty} min={0} max={1} step={0.01}
          onChange={(value) => priority('fatiguePenalty', value)}
          explain="Subtracted from demanding items when the student has already worked heavily today."
        />
      </SettingGroup>

      <SettingGroup title="Block size and hard constraints" icon={Boxes}>
        <NumberSetting
          label="Minimum block size" value={draft.constraints.minBlockSize} min={5} max={40} suffix="questions"
          onChange={(value) => constraint('minBlockSize', value)}
          explain="The smallest block a student may request."
        />
        <NumberSetting
          label="Maximum block size" value={draft.constraints.maxBlockSize} min={10} max={100} suffix="questions"
          onChange={(value) => constraint('maxBlockSize', value)}
          explain="The largest block a student may request."
        />
        <NumberSetting
          label="Items per dominant concept" value={draft.constraints.maxItemsPerPrimaryConcept} min={1} max={6}
          onChange={(value) => constraint('maxItemsPerPrimaryConcept', value)}
          explain="How many questions in one block may be chiefly about the same concept. Higher values turn a block into a drill."
        />
        <NumberSetting
          label="Consecutive items from one topic" value={draft.constraints.maxConsecutiveSameTopic} min={1} max={10}
          onChange={(value) => constraint('maxConsecutiveSameTopic', value)}
          explain="Blocked topics let a student settle into one mode of thinking, which inflates within-block accuracy."
        />
        <NumberSetting
          label="Minimum unseen share" value={draft.constraints.minUnseenShare} min={0} max={1} step={0.05}
          onChange={(value) => constraint('minUnseenShare', value)}
          explain="Fraction of each block that must be questions this student has never seen."
        />
        <NumberSetting
          label="Exposures per item" value={draft.constraints.maxExposuresPerItem} min={1} max={5}
          onChange={(value) => constraint('maxExposuresPerItem', value)}
          explain="How many times one question may be served within the exposure window."
        />
        <NumberSetting
          label="Exposure window" value={draft.constraints.exposureWindowBlocks} min={1} max={20} suffix="blocks"
          onChange={(value) => constraint('exposureWindowBlocks', value)}
          explain="How many recent blocks exposure is counted over."
        />
        <NumberSetting
          label="Quota tolerance" value={draft.constraints.quotaTolerance} min={0} max={5} suffix="slots"
          onChange={(value) => constraint('quotaTolerance', value)}
          explain="How far a block may deviate from its slot targets before it is reported as off-target."
        />
        <NumberSetting
          label="Rolling debt window" value={draft.constraints.rollingDebtWindowBlocks} min={1} max={12} suffix="blocks"
          onChange={(value) => constraint('rollingDebtWindowBlocks', value)}
          explain="How many blocks a coverage shortfall is repaid across. Short windows force repayment into one block; long ones let debt linger."
        />
        <NumberSetting
          label="Target demanding share" value={draft.constraints.targetDemandingShare} min={0} max={1} step={0.05}
          onChange={(value) => constraint('targetDemandingShare', value)}
          explain="Soft target for the share of Moderate-and-above items in a block."
        />
        <NumberSetting
          label="Target high-cognitive share" value={draft.constraints.targetHighCognitiveShare} min={0} max={1} step={0.05}
          onChange={(value) => constraint('targetHighCognitiveShare', value)}
          explain="Soft target for the share of items requiring several reasoning steps."
        />
      </SettingGroup>

      <SettingGroup title="Constraint relaxation order" icon={Boxes}>
        <p className="text-[13px] leading-relaxed text-ink-2">
          When the pool cannot satisfy every rule, they are relaxed in this order, one at a time, and each relaxation
          raises a recorded shortage. Blocks are never filled silently with whatever topic has the most questions.
        </p>
        <OrderEditor
          items={draft.relaxationOrder}
          labels={RELAXABLE_CONSTRAINT_LABEL}
          onChange={(next: RelaxableConstraint[]) => setDraft((current) => ({ ...current, relaxationOrder: next }))}
        />
        <div>
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3">Never relaxed</p>
          <div className="flex flex-wrap gap-2">
            {NON_NEGOTIABLE_CONSTRAINTS.map((rule) => (
              <Badge key={rule} tone="success" dot>{rule}</Badge>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-2">
            These are not configurable at any pool size. A shortage of questions is never a reason to show a student
            unapproved or out-of-scope content, or to spend a held-out measurement item on practice.
          </p>
        </div>
      </SettingGroup>
    </div>
  )
}

// ---- mastery ---------------------------------------------------------------

export function MasteryTab({ draft, setDraft }: { draft: Draft; setDraft: SetDraft }) {
  const mastery = field(setDraft, 'mastery')
  const validity = field(setDraft, 'validity')
  const statuses = field(setDraft, 'statuses')
  const intervals = field(setDraft, 'reviewIntervalDays')

  return (
    <div className="space-y-5">
      <SettingGroup title="Decayed Beta model" icon={Brain} hypothesis>
        <NumberSetting
          label="Decay half-life" value={draft.mastery.decayHalfLifeDays} min={7} max={365} suffix="days"
          onChange={(value) => mastery('decayHalfLifeDays', value)}
          explain="How long accumulated evidence takes to fall halfway back to the prior. Shorter means the model forgets faster and asks for re-confirmation sooner."
        />
        <NumberSetting
          label="Prior alpha" value={draft.mastery.priorAlpha} min={0.1} max={10} step={0.1}
          onChange={(value) => mastery('priorAlpha', value)}
          explain="Pseudo-successes before any evidence. Keep conservative: a new concept is unknown, not assumed competent."
        />
        <NumberSetting
          label="Prior beta" value={draft.mastery.priorBeta} min={0.1} max={10} step={0.1}
          onChange={(value) => mastery('priorBeta', value)}
          explain="Pseudo-failures before any evidence."
        />
        <NumberSetting
          label="Minimum difficulty credit" value={draft.mastery.minDifficultyCredit} min={0.1} max={1} step={0.05}
          onChange={(value) => mastery('minDifficultyCredit', value)}
          explain="Weight given to an Easy item. The clamp is what stops one hard question outweighing a week of consistent work."
        />
        <NumberSetting
          label="Maximum difficulty credit" value={draft.mastery.maxDifficultyCredit} min={1} max={3} step={0.05}
          onChange={(value) => mastery('maxDifficultyCredit', value)}
          explain="Weight given to a Challenging item."
        />
        <NumberSetting
          label="Main concept relevance" value={draft.mastery.mainConceptRelevance} min={0.1} max={1} step={0.05}
          onChange={(value) => mastery('mainConceptRelevance', value)}
          explain="Weight for a concept the item is chiefly assessing."
        />
        <NumberSetting
          label="Secondary concept relevance" value={draft.mastery.secondaryConceptRelevance} min={0} max={1} step={0.05}
          onChange={(value) => mastery('secondaryConceptRelevance', value)}
          explain="Weight for a concept the item also assesses. Lower, because the question was not built to measure it."
        />
        <NumberSetting
          label="High-confidence error weight" value={draft.mastery.highConfidenceErrorWeight} min={1} max={3} step={0.05}
          onChange={(value) => mastery('highConfidenceErrorWeight', value)}
          explain="Multiplier on a wrong answer the student said they were sure of — the strongest misconception evidence available."
        />
      </SettingGroup>

      <SettingGroup title="Attempt validity" icon={Timer}>
        <Caveat>
          Response time alone never proves or disproves knowledge. These settings only reduce how much an attempt is
          allowed to move an estimate; the raw record is never altered.
        </Caveat>
        <NumberSetting
          label="Fast-response threshold" value={draft.validity.fastResponseRatio} min={0.05} max={1} step={0.05}
          onChange={(value) => validity('fastResponseRatio', value)}
          explain="Fraction of the item's expected time below which an answer is treated as too fast to have been reasoned."
        />
        <NumberSetting
          label="Fast wrong weight" value={draft.validity.fastWrongWeight} min={0} max={1} step={0.05}
          onChange={(value) => validity('fastWrongWeight', value)}
          explain="Weight kept by an abnormally fast wrong answer — possible carelessness rather than a knowledge gap."
        />
        <NumberSetting
          label="Fast correct weight" value={draft.validity.fastCorrectWeight} min={0} max={1} step={0.05}
          onChange={(value) => validity('fastCorrectWeight', value)}
          explain="Weight kept by an abnormally fast correct answer — possible recall of a seen item rather than understanding."
        />
        <NumberSetting
          label="Exposed repeat weight" value={draft.validity.exposedRepeatWeight} min={0} max={0.5} step={0.05}
          onChange={(value) => validity('exposedRepeatWeight', value)}
          explain="Weight kept by an attempt at a question whose answer this student has already seen."
        />
        <NumberSetting
          label="Blank or timeout weight" value={draft.validity.blankWeight} min={0} max={1} step={0.05}
          onChange={(value) => validity('blankWeight', value)}
          explain="Weight of a non-answer. A blank is a separate outcome, never equivalent to a selected wrong option."
        />
        <NumberSetting
          label="Default expected seconds" value={draft.validity.defaultExpectedSeconds} min={10} max={600} suffix="s"
          onChange={(value) => validity('defaultExpectedSeconds', value)}
          explain="Assumed for items whose author recorded no estimate."
        />
      </SettingGroup>

      <SettingGroup title="Status thresholds" icon={Brain} hypothesis>
        <NumberSetting
          label="Weak below" value={draft.statuses.weakBelow} min={0.1} max={0.9} step={0.01}
          onChange={(value) => statuses('weakBelow', value)}
          explain="Mastery mean below which a concept may be called weak, given enough distinct evidence."
        />
        <NumberSetting
          label="Secure at or above" value={draft.statuses.secureAtOrAbove} min={0.5} max={0.99} step={0.01}
          onChange={(value) => statuses('secureAtOrAbove', value)}
          explain="Mastery mean required for secure, alongside distinct items and a spaced success."
        />
        <NumberSetting
          label="Distinct items to be measured" value={draft.statuses.measuredDistinctItems} min={1} max={6}
          onChange={(value) => statuses('measuredDistinctItems', value)}
          explain="Below this, a concept stays unmeasured whatever its accuracy. One lucky answer must never read as knowledge."
        />
        <NumberSetting
          label="Distinct items to assert weak" value={draft.statuses.weakDistinctItems} min={1} max={6}
          onChange={(value) => statuses('weakDistinctItems', value)}
          explain="Repeated independent evidence required before a weakness label is shown to a student."
        />
        <NumberSetting
          label="Distinct items to assert secure" value={draft.statuses.secureDistinctItems} min={2} max={8}
          onChange={(value) => statuses('secureDistinctItems', value)}
          explain="Four is the safer operational default. Three remains a documented pilot hypothesis — set it here to run that arm."
        />
        <NumberSetting
          label="Spaced success minimum gap" value={draft.statuses.spacedSuccessMinHours} min={1} max={168} suffix="hours"
          onChange={(value) => statuses('spacedSuccessMinHours', value)}
          explain="How long after the previous evidence a correct answer must come to count as retention rather than recall."
        />
        <NumberSetting
          label="High-confidence errors for weak" value={draft.statuses.weakHighConfidenceErrors} min={1} max={5}
          onChange={(value) => statuses('weakHighConfidenceErrors', value)}
          explain="Confident wrong answers that justify weak status on their own, without the mastery threshold."
        />
      </SettingGroup>

      <SettingGroup title="Review intervals" icon={CalendarRange}>
        {(['attention', 'weak', 'developing', 'secure'] as const).map((status) => (
          <NumberSetting
            key={status}
            label={`${status[0].toUpperCase()}${status.slice(1)}`}
            value={draft.reviewIntervalDays[status]}
            min={1} max={180} suffix="days"
            onChange={(value) => intervals(status, value)}
            explain={`How long a ${status} concept waits before it is worth revisiting.`}
          />
        ))}
      </SettingGroup>
    </div>
  )
}

// ---- interventions ---------------------------------------------------------

export function InterventionsTab({ draft, setDraft }: { draft: Draft; setDraft: SetDraft }) {
  const intervention = field(setDraft, 'interventions')

  return (
    <div className="space-y-5">
      <SettingGroup title="Temporary boost" icon={Zap} hypothesis>
        <Caveat>
          A small multiplier may not reorder a short block at all. That is why a repeated or confident error also creates
          a transfer-check obligation — the obligation is the guarantee, the multiplier is only the preference.
        </Caveat>
        <NumberSetting
          label="Boost multiplier" value={draft.interventions.boostMultiplier} min={1} max={2} step={0.01}
          onChange={(value) => intervention('boostMultiplier', value)}
          explain="Selection multiplier applied to a concept after a wrong answer."
        />
        <NumberSetting
          label="Stacked cap" value={draft.interventions.stackedMultiplierCap} min={1} max={3} step={0.01}
          onChange={(value) => intervention('stackedMultiplierCap', value)}
          explain="Ceiling on stacked boosts however many errors accumulate. This is what stops a bad session turning the next block into a single-concept drill."
        />
        <NumberSetting
          label="Eligible blocks" value={draft.interventions.remainingEligibleBlocks} min={1} max={10} suffix="blocks"
          onChange={(value) => intervention('remainingEligibleBlocks', value)}
          explain="How long a boost survives. Only spent on blocks that could actually have served the concept."
        />
        <NumberSetting
          label="Repairs to cancel a boost" value={draft.interventions.repairsToCancelBoost} min={1} max={5}
          onChange={(value) => intervention('repairsToCancelBoost', value)}
          explain="Distinct successful repair questions needed. Re-answering the same question never counts."
        />
        <NumberSetting
          label="Spaced repairs required" value={draft.interventions.spacedRepairsRequired} min={0} max={3}
          onChange={(value) => intervention('spacedRepairsRequired', value)}
          explain="How many of those repairs must come after the spacing window rather than immediately."
        />
        <NumberSetting
          label="Transfer check due within" value={draft.interventions.transferCheckWithinBlocks} min={1} max={6} suffix="blocks"
          onChange={(value) => intervention('transferCheckWithinBlocks', value)}
          explain="How soon an owed transfer check must be served after a repeated or confident error."
        />
        <NumberSetting
          label="Delayed transfer gap" value={draft.interventions.delayedTransferHours} min={1} max={168} suffix="hours"
          onChange={(value) => intervention('delayedTransferHours', value)}
          explain="How long before a repaired concept is checked again. Re-asking in the same sitting tests the explanation just read, not knowledge."
        />
      </SettingGroup>

      <SettingGroup title="Escalation" icon={Brain}>
        <NumberSetting
          label="Misconception escalation" value={draft.interventions.misconceptionEscalationCount} min={1} max={5}
          onChange={(value) => intervention('misconceptionEscalationCount', value)}
          explain="Selections of the same distractor before it is named to the student and targeted directly. Choosing it once is ordinary; twice is a belief."
        />
        <NumberSetting
          label="Repeat-miss escalation" value={draft.interventions.repeatMissEscalationCount} min={1} max={5}
          onChange={(value) => intervention('repeatMissEscalationCount', value)}
          explain="Misses of the same concept before stronger highlighting and a short resource are offered."
        />
        <NumberSetting
          label="Resource recommendations" value={draft.interventions.maxResourceRecommendations} min={0} max={3}
          onChange={(value) => intervention('maxResourceRecommendations', value)}
          explain="Approved video or article segments offered per wrong answer. Never shown during timed exam mode."
        />
        <Caveat>
          Watching a resource schedules a transfer check. It never clears a weak status by itself — only new independent
          question evidence does that.
        </Caveat>
      </SettingGroup>
    </div>
  )
}

// ---- readiness -------------------------------------------------------------

export function ReadinessTab({
  draft,
  setDraft,
  registry,
  setRegistry,
  poolSize,
  heldOutCount,
}: {
  draft: Draft
  setDraft: SetDraft
  registry: HeldOutRegistry
  setRegistry: (next: HeldOutRegistry) => void
  poolSize: number
  heldOutCount: number
}) {
  const readiness = field(setDraft, 'readiness')

  return (
    <div className="space-y-5">
      <SettingGroup
        title="Held-out items"
        icon={ClipboardCheck}
        action={<Badge tone="outline">{heldOutCount} of {poolSize} reserved</Badge>}
      >
        <Caveat>
          Readiness is the only unbiased measurement this product has. Spending a reserved item on practice destroys it,
          so held-out exclusion is never relaxed at any pool size.
        </Caveat>
        <ToggleSetting
          label="Automatic reservation"
          checked={registry.autoReserveEnabled}
          onChange={(next) => setRegistry({ ...registry, autoReserveEnabled: next, updatedAt: new Date().toISOString() })}
          explain="Deterministically reserves a share of each concept's pool where no admin flag exists. Concepts with fewer than five questions reserve none, so no blueprint node is left with nothing to practise."
        />
        <NumberSetting
          label="Automatic reserve share" value={draft.readiness.autoReserveShare} min={0} max={0.5} step={0.01}
          onChange={(value) => readiness('autoReserveShare', value)}
          explain="Fraction of an eligible pool reserved when reservation is automatic."
          disabled={!registry.autoReserveEnabled}
        />
        <NumberSetting
          label="Exposure exclusion" value={draft.readiness.exposureExclusionDays} min={0} max={365} suffix="days"
          onChange={(value) => readiness('exposureExclusionDays', value)}
          explain="How long a practice-exposed item is barred from an assessment. A recently seen item measures recall of that session, not preparedness."
        />
      </SettingGroup>

      <SettingGroup title="Assessment protocol" icon={Timer}>
        <NumberSetting
          label="Assessment size" value={draft.readiness.assessmentSize} min={10} max={200} suffix="questions"
          onChange={(value) => readiness('assessmentSize', value)}
          explain="Items in a standard readiness assessment. Smaller assessments produce wider ranges, not more precise scores."
        />
        <NumberSetting
          label="Seconds per item" value={draft.readiness.secondsPerItem} min={20} max={300} suffix="s"
          onChange={(value) => readiness('secondsPerItem', value)}
          explain="Time allowance, used to set the overall limit."
        />
        <NumberSetting
          label="Minimum items per topic report" value={draft.readiness.minItemsPerTopicReport} min={1} max={20}
          onChange={(value) => readiness('minItemsPerTopicReport', value)}
          explain="Below this, a topic reports no interval rather than a meaningless one."
        />
        <NumberSetting
          label="Interval confidence" value={draft.readiness.intervalConfidence} min={0.5} max={0.99} step={0.01}
          onChange={(value) => readiness('intervalConfidence', value)}
          explain="Confidence level of the reported Wilson interval. Higher means wider and more cautious."
        />
        <Caveat>
          A readiness assessment cannot be converted into Tutor mode, and no question is substituted adaptively once it
          has started. Both are protocol, not preferences.
        </Caveat>
      </SettingGroup>
    </div>
  )
}

// ---- planning --------------------------------------------------------------

export function PlanningTab({ draft, setDraft }: { draft: Draft; setDraft: SetDraft }) {
  const schedule = field(setDraft, 'schedule')

  return (
    <div className="space-y-5">
      <SettingGroup title="Weekly capacity" icon={CalendarRange}>
        <Caveat>
          Never schedule every free minute, never stack several high-effort sessions, and never punish a missed day with
          an impossible catch-up. These three settings are how that is enforced.
        </Caveat>
        <NumberSetting
          label="Capacity buffer" value={draft.schedule.capacityBufferShare} min={0} max={0.5} step={0.01}
          onChange={(value) => schedule('capacityBufferShare', value)}
          explain="Fraction of stated availability held back, taken after fixed university events rather than before them."
        />
        <NumberSetting
          label="Catch-up share" value={draft.schedule.catchUpShare} min={0} max={1} step={0.05}
          onChange={(value) => schedule('catchUpShare', value)}
          explain="Fraction of missed work carried into the next plan. Carrying all of it is how a planner becomes unusable after one bad day."
        />
        <NumberSetting
          label="Minimum task length" value={draft.schedule.minTaskMinutes} min={5} max={60} suffix="min"
          onChange={(value) => schedule('minTaskMinutes', value)}
          explain="Shortest schedulable session."
        />
        <NumberSetting
          label="Maximum task length" value={draft.schedule.maxTaskMinutes} min={15} max={180} suffix="min"
          onChange={(value) => schedule('maxTaskMinutes', value)}
          explain="Longest single session before the work is split."
        />
        <NumberSetting
          label="Consecutive high-effort sessions" value={draft.schedule.maxConsecutiveHighEffort} min={1} max={4}
          onChange={(value) => schedule('maxConsecutiveHighEffort', value)}
          explain="How many assessments or practical stations may sit back to back in a day before a lighter task is required between them."
        />
        <NumberSetting
          label="Minimum tier share" value={draft.schedule.minimumTierShare} min={0} max={1} step={0.05}
          onChange={(value) => schedule('minimumTierShare', value)}
          explain="Share of the week marked as the minimum a student should manage, so a bad day still has a defined win."
        />
        <NumberSetting
          label="Recommended tier share" value={draft.schedule.recommendedTierShare} min={0} max={1} step={0.05}
          onChange={(value) => schedule('recommendedTierShare', value)}
          explain="Share marked recommended. Whatever remains is optional stretch work."
        />
        <NumberSetting
          label="Mock lead time" value={draft.schedule.mockLeadDays} min={1} max={60} suffix="days"
          onChange={(value) => schedule('mockLeadDays', value)}
          explain="How far before an exam a mock is placed. A mock two days out measures anxiety and leaves no time to act on what it found."
        />
      </SettingGroup>

      <SettingGroup title="Crash-course horizons" icon={Layers}>
        <p className="text-[13px] leading-relaxed text-ink-2">
          Crash programmes compress the same blueprint and the same evidence model. They do not replace it with
          "high-yield only" — which in practice means whichever topics happen to have the most questions.
        </p>
        <Table>
          <thead>
            <tr>
              <Th align="end">Days</Th>
              <Th>Emphasis</Th>
              <Th>Assessment cadence</Th>
              <Th>Recovery policy</Th>
              <Th align="end">Coverage share</Th>
            </tr>
          </thead>
          <tbody>
            {[...draft.crashHorizons].sort((a, b) => a.days - b.days).map((band) => (
              <Tr key={band.days}>
                <Td align="end" className="tnum font-mono text-[12.5px]">{band.days}</Td>
                <Td className="text-[12.5px]">{band.emphasis}</Td>
                <Td className="text-[12.5px] text-ink-2">{band.assessmentCadence}</Td>
                <Td className="text-[12.5px] text-ink-2">{band.recoveryPolicy}</Td>
                <Td align="end" className="tnum font-mono text-[12.5px]">{Math.round(band.shares.coverage * 100)}%</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        {draft.crashHorizons.map((band, index) => (
          <div key={band.days} className="rounded-lg border border-line bg-surface-2 p-4">
            <p className="mb-3 text-[13px] font-semibold text-ink">{band.days}-day programme</p>
            <ShareEditor
              entries={ALLOCATION_NEEDS.map((need) => ({
                key: need, label: NEED_LABEL[need], value: band.shares[need],
              }))}
              onChange={(key, value) => setDraft((current) => {
                const bands = [...current.crashHorizons]
                bands[index] = { ...bands[index], shares: { ...bands[index].shares, [key as AllocationNeed]: value } }
                return { ...current, crashHorizons: bands }
              })}
            />
          </div>
        ))}
      </SettingGroup>
    </div>
  )
}
