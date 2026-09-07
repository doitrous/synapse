import test from 'node:test'
import assert from 'node:assert/strict'
import { assertBlindQuestion, buildValidationAnalytics, validatorQuestionSnapshot } from './mcqValidation.js'
import { isValidationAdmin } from './routes/mcqValidation.js'
import { validatorApiPathAllowed } from './auth.js'

test('validator question snapshots contain answer choices but no key or explanations', () => {
  const snapshot = validatorQuestionSnapshot({
    id: 'q-1', kind: 'question', title: 'Which vessel?', subjectId: 'anatomy',
    fields: { Vignette: 'A clinical vignette', Topic: 'Thorax' },
    questionData: {
      correctAnswer: 'B', explanation: 'secret rationale',
      answers: [
        { label: 'A', text: 'Aorta', explanation: 'wrong because…' },
        { label: 'B', text: 'Pulmonary artery', explanation: 'correct because…' },
      ],
    },
  })
  assert.equal(snapshot.answers.length, 2)
  assert.equal(assertBlindQuestion(snapshot), true)
  assert.equal(JSON.stringify(snapshot).includes('secret rationale'), false)
  assert.equal(JSON.stringify(snapshot).includes('correctAnswer'), false)
  assert.equal(assertBlindQuestion({ stem: 'Which explanation is most likely?', answers: [] }), true)
  assert.equal(assertBlindQuestion({ stem: 'Question', explanation: 'secret' }), false)
})

test('validator snapshots preserve supporting media through validator-only URLs', () => {
  const snapshot = validatorQuestionSnapshot({
    id: 'q-media', title: 'Interpret the image',
    questionData: {
      attachedImage: '/media/legacy-image',
      attachments: [{ id: 'a1', type: 'audio', name: 'Heart sounds', url: '/media/sound-1' }],
      media: [{ id: 'p1', mediaId: 'm1', slot: 'stem' }],
      answers: [{ label: 'A', text: 'One' }, { label: 'B', text: 'Two' }],
    },
  }, new Map([['m1', { id: 'm1', mediaType: 'image', title: 'ECG', mimeType: 'image/png' }]]))
  assert.equal(snapshot.attachedImage, '/mcq-validator/media/legacy-image')
  assert.equal(snapshot.attachments[0].url, '/mcq-validator/media/sound-1')
  assert.equal(snapshot.mediaRecords[0].url, '/mcq-validator/media/m1')
  assert.equal(assertBlindQuestion(snapshot), true)
})

test('cross-university validation analytics are limited to administrator roles', () => {
  for (const role of ['admin', 'editor', 'super_admin']) assert.equal(isValidationAdmin(role), true)
  for (const role of ['student', 'mcq_validator', 'reviewer', null]) assert.equal(isValidationAdmin(role), false)
})

test('validator API access is an explicit self-service allowlist', () => {
  for (const path of ['/api/me', '/api/auth/logout', '/api/mcq-validator/workspace', '/api/mcq-validator/batches/b1']) {
    assert.equal(validatorApiPathAllowed(path), true, path)
  }
  for (const path of ['/api/content/questions', '/api/state/nishany-admin-content-ledger-v4', '/api/user-state/x', '/api/admin/mcq-validation/analytics']) {
    assert.equal(validatorApiPathAllowed(path), false, path)
  }
})

test('analytics calculate completion, dimensions, flags and disagreements', () => {
  const validators = [
    { validatorId: 'v1', validatorName: 'One', universityId: 'UNI' },
    { validatorId: 'v2', validatorName: 'Two', universityId: 'UNI' },
  ]
  const assignments = [
    { validatorId: 'v1', validatorName: 'One', universityId: 'UNI', status: 'completed' },
    { validatorId: 'v2', validatorName: 'Two', universityId: 'UNI', status: 'started' },
  ]
  const submissions = [
    { validatorId: 'v1', validatorName: 'One', universityId: 'UNI', questionId: 'q1', selectedAnswer: 'A', isCorrect: 1, confidence: 5, timeSeconds: 30, curriculumRelevance: 'taught', issueCategory: null, academicYear: 'Y2', term: 'T1', moduleId: 'M1', moduleName: 'CVS', subjectId: 'S1', subjectName: 'Anatomy' },
    { validatorId: 'v2', validatorName: 'Two', universityId: 'UNI', questionId: 'q1', selectedAnswer: 'B', isCorrect: 0, confidence: 3, timeSeconds: 50, curriculumRelevance: 'uncertain', issueCategory: 'incorrect_answer_key', academicYear: 'Y2', term: 'T1', moduleId: 'M1', moduleName: 'CVS', subjectId: 'S1', subjectName: 'Anatomy' },
  ]
  const out = buildValidationAnalytics({ validators, assignments, submissions })
  assert.equal(out.summary.totalValidators, 2)
  assert.equal(out.summary.completionRate, 0.5)
  assert.equal(out.summary.accuracy, 0.5)
  assert.equal(out.summary.averageConfidence, 4)
  assert.equal(out.summary.flags.incorrect_answer_key, 1)
  assert.equal(out.accuracy.byModule[0].label, 'CVS')
  assert.equal(out.agreement[0].disagreement, true)
  assert.deepEqual(out.agreement[0].answerDistribution, { A: 1, B: 1 })
})

test('agreement follows the question across universities and year metrics fall back to year id', () => {
  const submissions = [
    { validatorId: 'v1', universityId: 'UNI-1', questionId: 'q-shared', selectedAnswer: 'A', isCorrect: 1, confidence: 4, timeSeconds: 20, curriculumRelevance: 'taught', yearId: 'UNI-1:Y2' },
    { validatorId: 'v2', universityId: 'UNI-2', questionId: 'q-shared', selectedAnswer: 'A', isCorrect: 1, confidence: 5, timeSeconds: 30, curriculumRelevance: 'not_taught', yearId: 'UNI-2:Y2' },
  ]
  const out = buildValidationAnalytics({ validators: [], assignments: [], submissions })
  assert.equal(out.agreement[0].validatorCount, 2)
  assert.equal(out.agreement[0].universityId, 'UNI-1, UNI-2')
  assert.equal(out.agreement[0].answerAgreement, 1)
  assert.deepEqual(out.agreement[0].relevanceDistribution, { taught: 1, not_taught: 1 })
  assert.deepEqual(out.accuracy.byYear.map((row) => row.id), ['UNI-1:Y2', 'UNI-2:Y2'])
})
