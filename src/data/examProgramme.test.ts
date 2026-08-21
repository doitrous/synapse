import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { emptyModuleScheduleBlock } from './moduleSchedule.ts'
import {
  DEFAULT_REMINDER_POLICY, buildExamProgramme, dueReminder, daysUntil,
  programmeGaps, programmeIsOpen, programmeMix,
  type ExamBlock, type ExamMarkSplit, type ProgrammeContent,
} from './examProgramme.ts'

const TODAY = new Date(2026, 5, 1) // 1 June 2026, local

function exam(overrides: Partial<ExamBlock> = {}): ExamBlock {
  return {
    ...emptyModuleScheduleBlock('2026-06-15', 'final'),
    title: 'End of year — 101 ISK',
    examKind: 'eoy',
    marks: { questions: 40, written: 40, practical: 20 },
    ...overrides,
  }
}

const CONTENT: ProgrammeContent = {
  questionIds: Array.from({ length: 24 }, (_, i) => `Q${i}`),
  writtenIds: Array.from({ length: 8 }, (_, i) => `W${i}`),
  practicalIds: Array.from({ length: 6 }, (_, i) => `P${i}`),
  articleIds: Array.from({ length: 10 }, (_, i) => `A${i}`),
}

describe('Counting down to a paper', () => {
  test('days are whole days, not hours', () => {
    assert.equal(daysUntil('2026-06-15', TODAY), 14)
    assert.equal(daysUntil('2026-06-01', TODAY), 0)
    assert.equal(daysUntil('2026-05-30', TODAY), -2)
  })
})

describe('Reminders', () => {
  test('one reminder, not a backlog', () => {
    // A student who opens the app after a week away is told the exam is in
    // seven days — not handed the fourteen- and twenty-one-day ones as well,
    // which were true and are not now.
    const due = dueReminder(exam({ date: '2026-06-08' }), TODAY)
    assert.equal(due?.daysAway, 7)
    assert.equal(due?.leadDay, 7)
  })

  test('a lead day that has been passed still speaks', () => {
    // Thirteen days out, nothing sent at fourteen: "14 days" is still the right
    // thing to say, rather than waiting silently for seven.
    const due = dueReminder(exam({ date: '2026-06-14' }), TODAY)
    assert.equal(due?.daysAway, 13)
    assert.equal(due?.leadDay, 14)
  })

  test('nothing before the first lead day', () => {
    assert.equal(dueReminder(exam({ date: '2026-07-30' }), TODAY), null)
  })

  test('silence on the day itself, by default', () => {
    // A student sitting the paper in three hours cannot act on anything said
    // here, and listing what they have not covered is unkind rather than useful.
    assert.equal(dueReminder(exam({ date: '2026-06-01' }), TODAY), null)
    const loud = dueReminder(exam({ date: '2026-06-01' }), TODAY,
      { ...DEFAULT_REMINDER_POLICY, quietOnExamDay: false })
    assert.equal(loud?.daysAway, 0)
  })

  test('nothing for an exam that has been sat', () => {
    assert.equal(dueReminder(exam({ date: '2026-05-20' }), TODAY), null)
  })

  test('an admin can switch them off entirely', () => {
    assert.equal(dueReminder(exam({ date: '2026-06-08' }), TODAY,
      { ...DEFAULT_REMINDER_POLICY, enabled: false }), null)
  })

  test('an admin can set their own lead days', () => {
    const policy = { ...DEFAULT_REMINDER_POLICY, leadDays: [30, 2] }
    assert.equal(dueReminder(exam({ date: '2026-06-20' }), TODAY, policy)?.leadDay, 30)
    assert.equal(dueReminder(exam({ date: '2026-06-02' }), TODAY, policy)?.leadDay, 2)
  })

  test('a lecture is not an exam', () => {
    const lecture = { ...exam({ date: '2026-06-08' }), type: 'lecture' as const }
    assert.equal(dueReminder(lecture, TODAY), null)
  })
})

describe('The mix follows the marks', () => {
  test('a paper marked three parts written to one practical is planned that way', () => {
    const mix = programmeMix({ questions: 0, written: 60, practical: 20 }, CONTENT)
    assert.ok(mix.written > mix.practical)
    assert.ok(Math.abs(mix.written / mix.practical - 3) < 0.001)
    assert.equal(mix.questions, 0, 'the paper sets no questions, so the plan contains none')
  })

  test('a kind the paper does not examine gets nothing, however much content exists', () => {
    // Content a student is not examined on is not revision; it is a distraction
    // with a deadline.
    const mix = programmeMix({ questions: 100, written: 0, practical: 0 }, CONTENT)
    assert.equal(mix.written, 0)
    assert.equal(mix.practical, 0)
    assert.ok(mix.questions > 0)
  })

  test('a kind with no content gets nothing, however many marks it carries', () => {
    const mix = programmeMix({ questions: 50, written: 50, practical: 0 },
      { ...CONTENT, writtenIds: [] })
    assert.equal(mix.written, 0)
  })

  test('reading always takes a share, because a plan that only tests teaches nothing', () => {
    const mix = programmeMix({ questions: 100, written: 0, practical: 0 }, CONTENT)
    assert.ok(mix.reading > 0)
    assert.ok(Math.abs(mix.questions + mix.reading - 1) < 0.001)
  })

  test('the shares add up to one', () => {
    const mix = programmeMix({ questions: 40, written: 40, practical: 20 }, CONTENT)
    const total = mix.questions + mix.written + mix.practical + mix.reading
    assert.ok(Math.abs(total - 1) < 0.001, String(total))
  })

  test('a paper with no marks recorded still produces a legible plan', () => {
    const mix = programmeMix({ questions: 0, written: 0, practical: 0 }, CONTENT)
    const total = mix.questions + mix.written + mix.practical + mix.reading
    assert.ok(Math.abs(total - 1) < 0.001)
    assert.ok(mix.written > 0, 'rather than showing only whichever kind is most numerous')
  })
})

describe('Building the programme', () => {
  test('it opens only once the exam is near enough to act on', () => {
    assert.equal(programmeIsOpen(exam({ date: '2026-09-01' }), TODAY), false)
    assert.equal(programmeIsOpen(exam({ date: '2026-06-15' }), TODAY), true)
    assert.equal(buildExamProgramme(exam({ date: '2026-09-01' }), CONTENT, TODAY), null)
  })

  test('one day per day remaining, counting down', () => {
    const plan = buildExamProgramme(exam({ date: '2026-06-15' }), CONTENT, TODAY)!
    assert.equal(plan.days.length, 14)
    assert.equal(plan.days[0].date, '2026-06-01')
    assert.equal(plan.days[0].daysBefore, 14)
    assert.equal(plan.days.at(-1)!.daysBefore, 1)
  })

  test('every kind the paper marks appears in the plan', () => {
    const plan = buildExamProgramme(exam({ date: '2026-06-15' }), CONTENT, TODAY)!
    const kinds = new Set(plan.days.flatMap((day) => day.items.map((item) => item.kind)))
    assert.ok(kinds.has('questions'))
    assert.ok(kinds.has('written'), 'the written half of the paper must be practised')
    assert.ok(kinds.has('practical'))
    assert.ok(kinds.has('reading'))
  })

  test('nothing the exam covers is left out of the plan', () => {
    // Dealing content across days must lose none of it — a question that never
    // appears is one the student is never shown before the paper.
    const plan = buildExamProgramme(exam({ date: '2026-06-15' }), CONTENT, TODAY)!
    const newWork = plan.days.filter((day) => !day.isConsolidation)
    const seen = new Set(newWork.flatMap((day) => day.items.flatMap((item) => item.itemIds)))
    for (const id of [...CONTENT.questionIds, ...CONTENT.writtenIds, ...CONTENT.practicalIds, ...CONTENT.articleIds]) {
      assert.ok(seen.has(id), `${id} never appears in the plan`)
    }
  })

  test('the last days go back over things rather than meeting new work', () => {
    const plan = buildExamProgramme(exam({ date: '2026-06-15' }), CONTENT, TODAY)!
    const last = plan.days.at(-1)!
    assert.equal(last.isConsolidation, true)
    const questions = last.items.find((item) => item.kind === 'questions')
    assert.equal(questions?.itemIds.length, CONTENT.questionIds.length, 'all of it, not a slice')
  })

  test('an exam tomorrow still gets a day', () => {
    const plan = buildExamProgramme(exam({ date: '2026-06-02' }), CONTENT, TODAY)!
    assert.equal(plan.days.length, 1)
    assert.ok(plan.days[0].items.length > 0)
  })

  test('minutes follow the mix', () => {
    const plan = buildExamProgramme(
      exam({ date: '2026-06-15', marks: { questions: 0, written: 80, practical: 0 } }),
      CONTENT, TODAY, { minutesPerDay: 100 })!
    const day = plan.days[0]
    const written = day.items.find((item) => item.kind === 'written')!
    const reading = day.items.find((item) => item.kind === 'reading')!
    assert.equal(written.minutes, 80)
    assert.equal(reading.minutes, 20)
    assert.equal(day.items.find((item) => item.kind === 'practical'), undefined)
  })

  test('a paper already sat has no programme', () => {
    assert.equal(buildExamProgramme(exam({ date: '2026-05-25' }), CONTENT, TODAY), null)
  })
})

describe('Telling an admin what is missing', () => {
  test('marks with nothing behind them are named', () => {
    const gaps = programmeGaps(
      exam({ marks: { questions: 40, written: 40, practical: 20 } as ExamMarkSplit }),
      { questionIds: ['Q1'], writtenIds: [], practicalIds: [], articleIds: [] })
    assert.ok(gaps.some((gap) => /40 marks of written/.test(gap)))
    assert.ok(gaps.some((gap) => /20 marks of practical/.test(gap)))
    assert.ok(!gaps.some((gap) => /marks of questions/.test(gap)), 'questions are covered')
  })

  test('a fully covered exam has nothing to report but reading', () => {
    assert.deepEqual(programmeGaps(exam(), CONTENT), [])
  })
})

test('the two lists of exam block types cannot drift apart', async () => {
  // `examProgramme.ts` keeps its own copy to avoid a runtime import cycle. That
  // is only safe while the copies agree, so this is what makes them agree.
  const { EXAM_BLOCK_TYPES } = await import('./moduleSchedule.ts')
  const { EXAM_BLOCK_TYPE_NAMES } = await import('./examProgramme.ts')
  assert.deepEqual([...EXAM_BLOCK_TYPE_NAMES].sort(), [...EXAM_BLOCK_TYPES].sort())
})
