/**
 * `101 ISK > Histology > Epithelial Tissues > Neuro Epithelium` — the question
 * books' MCQs.
 *
 * Three questions, and one concept rather than three. The book teaches this
 * leaf in three bullet points (`scripts/kasr/extract/deptbook.json`, p. 59):
 * neuro-epithelium is epithelium, its cells are modified as receptors, and the
 * example is the taste bud. Two of the questions ask for the example and one
 * asks which way round the modification runs; a student who knows the
 * definition knows all three, so splitting them would split one mastery across
 * three records.
 *
 * The direction question is the interesting one. Every distractor on it is a
 * grammatically plausible sentence about nerve and epithelium, and only the
 * true one has epithelium as the thing that changed.
 *
 * `ART-101-HIS-NEURO-EPITHELIUM` does not exist yet; another lane is writing
 * it. Cited anyway.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Neuro Epithelium',
  modulePath: '101 ISK > Histology > Epithelial Tissues > Neuro Epithelium',
  articleId: 'ART-101-HIS-NEURO-EPITHELIUM',

  concepts: [
    {
      key: 'neuro-epithelium-is-epithelium-modified-as-receptor',
      label: 'Neuro-epithelium is epithelium whose cells are modified to act as sensory receptors, as in the taste buds',
      definition:
        'Neuro-epithelium is a special type of epithelial tissue whose cells — the sensory cells — are modified to act as receptors and receive the stimulus for some sensation. It is one of the four classes of epithelial tissue, alongside surface, glandular and myo-epithelium. The standard example is the taste buds of the tongue, which receive the sensation of taste.',
      objective:
        'Define neuro-epithelium as epithelium modified for a sensory function, and name the taste bud as its example.',
      pitfall:
        'Reading the name as nerve tissue that has turned into epithelium, or as a claim that nerve and epithelium share an origin. Neither is what the term means: the cell is an epithelial cell that has taken on a receptor function, and the "neuro-" describes the job, not the ancestry.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Neuro Epithelium',
      type: 'structural_description',
      aliases: ['Neuroepithelium', 'Sensory epithelium', 'Sensory cells', 'Taste bud'],
      gaps: [
        'Only the taste bud is named here. Neuro-epithelium is not extended to the olfactory mucosa, the retina or the hair cells of the inner ear, all of which general histology includes. Only the taste bud is taught in this course, and only the taste bud is examinable.',
      ],
    },
  ],

  questions: [
    {
      key: 'one-statement-is-true-8a7ac641',
      conceptKey: 'neuro-epithelium-is-epithelium-modified-as-receptor',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective:
        'Get the direction of the modification right: an epithelial cell takes on a sensory function, rather than a nerve cell becoming epithelial.',
      explanations: {
        A: 'The modification runs the other way. This option makes the cell a nerve cell first, which would put the tissue in the nervous system; neuro-epithelium is classed among the four types of *epithelial* tissue.',
        B: 'Neuro-epithelium is epithelium whose cells are modified to act as receptors and receive the stimulus of a sensation — the standard definition, and the taste bud is its example.',
        C: 'A statement about embryology rather than about structure. Some epithelia are ectodermal, as the nervous system is, but shared origin is not what the term neuro-epithelium asserts, and no such claim is made.',
        D: 'The most tempting wrong answer, because it sounds like a mechanism. Nothing develops from the nerve here; the epithelium is already epithelium and acquires a receptor function without changing what it is.',
      },
    },
    {
      key: 'the-epithelium-forming-the-taste-buds-is-110475b2',
      conceptKey: 'neuro-epithelium-is-epithelium-modified-as-receptor',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify the taste bud as neuro-epithelium.',
      explanations: {
        A: 'The taste bud is the classic example of neuro-epithelium: epithelial cells modified as receptors for the sensation of taste.',
        B: 'Glandular epithelium secretes. Chosen because the tongue does carry glands — the serous glands of von Ebner empty into the trough around the taste bud — but the bud itself receives, it does not secrete.',
        C: 'Simple epithelium is a classification by layer count within *surface* epithelium, so this answers a different question entirely. It also cannot be right on its own terms: the taste bud sits within a stratified squamous covering.',
        D: 'The epithelium around the taste bud is indeed stratified squamous, which is what makes this attractive. The question asks what forms the bud, not what surrounds it.',
      },
    },
    {
      key: 'the-taste-bud-is-an-example-of-bc71050c',
      conceptKey: 'neuro-epithelium-is-epithelium-modified-as-receptor',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify the taste bud as neuro-epithelium.',
      explanations: {
        A: 'Glandular epithelium is modified to secrete. The taste bud is modified to receive, which is the other of the four classes.',
        B: 'Absorptive epithelium is not one of the four classes at all. It is a description of what simple columnar epithelium does in the gut, borrowed here as a plausible-sounding category.',
        C: 'Neuro-epithelium is epithelium modified as a receptor, and the taste bud is the standard example.',
        D: 'Endothelium is the name simple squamous epithelium takes when it lines blood vessels and the heart. It has nothing to do with sensation, and is picked when "endo-" and "neuro-" are treated as interchangeable prefixes rather than read.',
      },
    },
  ],
}
