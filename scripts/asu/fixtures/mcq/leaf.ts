/**
 * Throwaway MCQ leaf for the scripts/asu toolchain proof.
 *
 * Not a real question book — never move this into `scripts/asu/seeds/mcq/`.
 * See `scripts/asu/README.md` for how this fixture is run and torn down.
 */
import type { McqLeafSeed } from '../../seeds/mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'ASU-FIXTURE-fixture-topic.md',
  modulePath: 'ASU-FIXTURE > Foundations > Fixture Topic',
  articleId: 'ART-FIX-0000000000',
  concepts: [
    {
      key: 'asu-fixture-second-concept',
      label: 'The single-best-answer route mints a concept from a question bank, not a paper.',
      definition: 'A concept minted while reading the fixture question bank, used only to prove the SBA-question route of the scripts/asu toolchain.',
      objective: 'State that an SBA question is authored through the MCQ bank/leaf route rather than the written-paper route.',
      pitfall: 'Treating this as a real Ain Shams concept — it is fixture-only.',
      subject: 'fnd',
      primary: 'SYS-FND-T01',
      secondary: [],
      modulePath: 'ASU-FIXTURE > Foundations > Fixture Topic',
      type: 'definition',
    },
  ],
  questions: [
    {
      key: 'fixture-sba-1',
      conceptKey: 'asu-fixture-second-concept',
      explanations: {
        A: 'Correct — a fixture record is the only kind of record this toolchain proof mints for a non-real module.',
        B: 'A live concept is a real, published record; this proof never touches live state to create one.',
        C: 'A manifest source describes a corpus file, not a validated record type.',
        D: 'A department book chapter is real Ain Shams content, which this proof never authors.',
      },
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Identify what a fixture record in this toolchain is for.',
    },
  ],
}
