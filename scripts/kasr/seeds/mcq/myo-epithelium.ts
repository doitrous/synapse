/**
 * `101 ISK > Histology > Epithelial Tissues > Myo Epithelium` — the question
 * books' MCQs.
 *
 * One question, which is proportionate: the department book gives this leaf
 * four bullet points on a shared page (`scripts/kasr/extract/deptbook.json`,
 * p. 59) and the books ask it once. The single question is nevertheless a good
 * one — it turns entirely on which end of the secretory cell the myo-epithelial
 * cell sits at, which is the one fact the book states twice.
 *
 * `ART-101-HIS-MYO-EPITHELIUM` does not exist yet; another lane is writing it.
 * The citation is made anyway so the question is complete the moment the
 * article lands.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Myo Epithelium',
  modulePath: '101 ISK > Histology > Epithelial Tissues > Myo Epithelium',
  articleId: 'ART-101-HIS-MYO-EPITHELIUM',

  concepts: [
    {
      key: 'myoepithelial-cell-basal-position-and-secretion-squeeze',
      label: 'Myo-epithelial cells lie between the base of the secretory cells and the basement membrane, and contract to squeeze secretion into the duct',
      definition:
        'Myo-epithelium is a special type of epithelium modified to contract. Its cells lie between the base of the secretory cells and their basement membrane — basally, never apically — and when they contract they squeeze the secretory cells so that the secretion is discharged into the ducts. They are found around the acini of the salivary glands, the mammary glands and the sweat glands.',
      objective:
        'State where a myo-epithelial cell sits relative to the secretory cell and its basement membrane, and explain what its contraction achieves.',
      pitfall:
        'Putting the myo-epithelial cell at the apex of the secretory cell. The basement membrane is basal by definition, so nothing can lie between it and the apex; the option that says so is the standard distractor and it is self-contradictory once the geometry is drawn.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Myo Epithelium',
      type: 'structure_function_relationship',
      aliases: ['Myoepithelial cell', 'Basket cell', 'Myo-epithelium'],
      gaps: [
        'Whether myo-epithelial cells are ectodermal in origin, and whether they contain smooth-muscle actin, is left open here. Both are standard in general histology, but neither is stated in the course material, so neither is taught.',
      ],
    },
  ],

  questions: [
    {
      key: 'myoepithelial-cells-are-characterized-by-the-following-excep-9d77827a',
      conceptKey: 'myoepithelial-cell-basal-position-and-secretion-squeeze',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective:
        'Place the myo-epithelial cell at the base of the secretory cell, against the basement membrane, and not at its apex.',
      explanations: {
        A: 'True, so not the exception. Contraction is what the "myo-" in myo-epithelium names, and it is the whole of what the cell does: it squeezes the secretory cells so their secretion is driven into the duct.',
        B: 'True, so not the exception. The cell lies between the base of the secretory cells and their basement membrane, wrapped round the acinus.',
        C: 'The exception, and the answer. Picked by students who remember only that the cell lies against the basement membrane and do not check which surface that membrane is on. The basement membrane is by definition at the basal surface, so there is no space between it and the apex for anything to occupy.',
        D: 'A "none of the above" cannot be the exception when a genuinely false statement is on the list. It attracts students who could not separate B from C and hedged rather than choosing between them.',
      },
    },
  ],
}
