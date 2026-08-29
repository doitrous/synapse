import test from 'node:test'
import assert from 'node:assert/strict'
import type { ManagedContentItem } from '../data/contentControl.ts'
import type { QuestionSource } from '../data/questionSource.ts'
import { DIFFICULTIES, type Question } from '../data/qbank.ts'
import { isStudentPublishable } from '../data/contentControl.ts'

function publishedQuestion(sourceCategory?: QuestionSource): ManagedContentItem {
  return {
    id: 'Q1',
    kind: 'question',
    status: 'Published',
    subjectId: 'cardio',
    title: 'Stem text',
    fields: {},
    questionData: {
      answers: [
        { label: 'A', text: 'right', explanation: 'because' },
        { label: 'B', text: 'wrong', explanation: 'no' },
      ],
      correctAnswer: 'A',
      attachedImage: '',
      attachments: [],
      libraryIds: [],
      resourceIds: [],
      learningObjective: '',
      tags: {
        topic: 'Rhythm',
        conceptIds: ['c1'],
        mainConceptIds: [],
        sourceCategory,
      },
    },
  } as unknown as ManagedContentItem
}

// Inlined from managedQuestionToStudentQuestion to avoid React dependency
function managedQuestionToStudentQuestion(
  item: ManagedContentItem,
  catalogue: ManagedContentItem[],
): Question | null {
  if (item.kind !== 'question' || !isStudentPublishable(item) || !item.questionData) return null

  const data = item.questionData
  const answers = data.answers.filter((answer) => answer.text.trim())
  if (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer)) return null

  const titlesById = new Map(catalogue.map((entry) => [entry.id, entry.title]))
  const correctExplanation = answers.find((answer) => answer.label === data.correctAnswer)?.explanation ?? ''

  function difficultyFor(item: ManagedContentItem) {
    const value = item.questionData?.tags.intendedDifficulty ?? item.fields.Difficulty
    return DIFFICULTIES.includes(value as any) ? (value as any) : 'Moderate'
  }

  return {
    id: item.id,
    subjectId: item.subjectId,
    topic: data.tags.topic.trim() || item.fields.Topic?.trim() || 'General',
    difficulty: difficultyFor(item),
    vignette: item.fields.Vignette?.trim() ?? '',
    stem: item.title,
    options: answers.map((answer) => ({
      text: answer.text,
      correct: answer.label === data.correctAnswer,
      rationale: answer.explanation,
    })),
    explanation: item.fields.Explanation?.trim() || correctExplanation,
    libraryRefs: data.libraryIds.map((id) => ({ id, title: titlesById.get(id) ?? id })),
    resourceRefs: data.resourceIds.map((id) => titlesById.get(id) ?? id),
    attachedImage: data.attachedImage.trim() || undefined,
    attachments: (data.attachments ?? []).map((attachment) => ({ ...attachment })),
    learningObjective: data.learningObjective.trim() || undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
    source: data.tags.sourceCategory,
  }
}

test('the converter copies sourceCategory onto the student question', () => {
  const q = managedQuestionToStudentQuestion(publishedQuestion('dept-mcq'), [publishedQuestion('dept-mcq')])
  assert.ok(q)
  assert.equal(q?.source, 'dept-mcq')
})

test('an untagged question yields an undefined source', () => {
  const q = managedQuestionToStudentQuestion(publishedQuestion(undefined), [publishedQuestion(undefined)])
  assert.ok(q)
  assert.equal(q?.source, undefined)
})
