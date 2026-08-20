/**
 * How to approach a written question, not what any one answer is.
 *
 * Written once as data so the guide cannot drift between surfaces, and so the
 * tab renders it in one loop. Strings stay plain English here and are passed
 * through `t()` at the point of render, matching the rest of the data layer.
 */
export const WRITTEN_GUIDE: { title: string; body: string }[] = [
  {
    title: 'Structure carries marks.',
    body: 'An examiner reading two hundred papers finds what they are looking for in a laid-out answer and misses it in a paragraph.',
  },
  {
    title: 'Arrows show you understand.',
    body: 'A → B → C reads as a mechanism you followed; the same three facts as a list reads as three facts.',
  },
  {
    title: 'Key points beat length.',
    body: 'Marks are for points named, not words written. A short answer with every point beats a page with four of them.',
  },
  {
    title: 'Write the mark-carrying words legibly.',
    body: 'The diagnosis, the enzyme, the organism, the drug — the words the examiner is scanning for. Everything else can be untidy; these cannot.',
  },
  {
    title: 'If you do not know it exactly, write what you do know.',
    body: 'Name the class if not the drug, the mechanism if not the name. A blank earns nothing; a near miss often earns something.',
  },
  {
    title: 'Answer the question that was asked.',
    body: '"List" wants a list. "Compare" wants both sides. "Give three" stops at three.',
  },
  {
    title: 'Leave room.',
    body: 'Space after each answer to add a line if you remember it later — you often do.',
  },
]
