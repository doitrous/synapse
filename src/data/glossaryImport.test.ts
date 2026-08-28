import test from 'node:test'
import assert from 'node:assert/strict'
import { applyGlossaryRows, glossaryTermFromRow, validateGlossaryImportRow } from './glossaryImport.ts'

test('the authored Arabic-definition heading maps to the stored glossary field', () => {
  const term = glossaryTermFromRow({
    id: 'tachycardia',
    term: 'Tachycardia',
    ar: 'تسرّع القلب',
    category: 'Signs & symptoms',
    def: 'A faster than normal heart rate.',
    definition_ar: 'تسارع ضربات القلب عن المعدل الطبيعي.',
  })

  assert.equal(term.defAr, 'تسارع ضربات القلب عن المعدل الطبيعي.')
  assert.equal(term.id, 'tachycardia')
})

test('glossary rows create and update without duplicating a canonical id', () => {
  const result = applyGlossaryRows([
    {
      id: 'tachycardia',
      term: 'Tachycardia',
      ar: 'تسرّع القلب',
      category: 'Signs & symptoms',
      def: 'Old definition.',
      defAr: 'تعريف قديم.',
    },
  ], [
    {
      id: 'tachycardia',
      term: 'Tachycardia',
      ar: 'تسرّع القلب',
      category: 'Signs & symptoms',
      def: 'A faster than normal heart rate.',
      definition_ar: 'تسارع ضربات القلب عن المعدل الطبيعي.',
    },
    {
      term: 'Auscultation',
      ar: 'التسمّع',
      category: 'Examination',
      def: 'Listening to body sounds.',
      definition_ar: 'الاستماع إلى أصوات الجسم.',
    },
  ])

  assert.equal(result.created, 1)
  assert.equal(result.updated, 1)
  assert.equal(result.rejected, 0)
  assert.equal(result.records.length, 2)
  assert.equal(result.records.find((term) => term.id === 'tachycardia')?.def, 'A faster than normal heart rate.')
  assert.equal(result.records.find((term) => term.id === 'auscultation')?.defAr, 'الاستماع إلى أصوات الجسم.')
})

test('glossary validation rejects categories the student filters cannot show', () => {
  assert.deepEqual(validateGlossaryImportRow({
    term: 'Tachycardia',
    category: 'Cardiology',
    def: 'A faster than normal heart rate.',
  }), ['“Cardiology” is not one of the glossary categories'])
})
