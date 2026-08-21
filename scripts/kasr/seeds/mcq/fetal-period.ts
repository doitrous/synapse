/**
 * `101 ISK > Anatomy > General Embryology > Fetal Period` — the question books' MCQs.
 *
 * Six rows and only three distinct questions: the books print the fetal-period
 * question twice and the birth-weight question three times. Two of those extra
 * printings carry a reader's marginal annotation — "(DEP BOOK)", and in one case
 * a scrawl the scanner ran straight into the stem — and both are excluded as the
 * worse copy of a question that is intact elsewhere in this file, on the same
 * grounds as the duplicated platelet questions in `blood-platelets.ts`.
 *
 * The annotations matter beyond the OCR, because the two annotated copies key
 * the birth weight to 1400–2100 g while the clean copy keys it to 3000–3400 g.
 * 3000–3400 g is right, and 1400–2100 g is the weight at 28–32 weeks in the very
 * growth table the question is drawn from — a key read off the wrong row. The
 * department book's Table 1 is the source of both figures and the extraction
 * carries it only as an image, so this cannot be settled against the book's own
 * text; it is settled against the table's internal logic and against the clean
 * printing, and the reasoning is written out in full on the overridden row.
 *
 * On the reporting question of whether the books ask about timing the department
 * book never states: not in this leaf. Every date the three live questions turn
 * on — the 9th week, the head at a quarter of crown-heel length at birth — is
 * stated in the book's own text on pages 106–107.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Fetal Period',
  modulePath: '101 ISK > Anatomy > General Embryology > Fetal Period',
  articleId: 'ART-101-ANA-FETAL-PERIOD',

  concepts: [
    {
      key: 'fetal-period-begins-at-the-ninth-week-and-is-growth-not-organogenesis',
      label: 'The fetal period runs from the beginning of the 9th week — the start of the 3rd month — until birth, and is maturation and growth rather than organ formation',
      definition:
        'The fetal period is the period from the beginning of the 9th week until birth. It is characterised by maturation of the tissues and organs already laid down, and by rapid growth of the body — not by the formation of new organs, which is the work of the embryonic period that precedes it. Pregnancy lasts about 280 days, or 40 weeks, counted from the first day of the last menstrual period, and about 266 days, or 38 weeks, counted from fertilisation, which is the more accurate of the two. The external features change on a fixed schedule within the period: the face becomes human-looking and the limbs lengthen in the 3rd month, the external genitalia are differentiated at the end of the 3rd month, lanugo hair appears from the 4th month, vernix caseosa covers the skin at the 5th month, fetal movements are clearly felt from the 5th month, the skin stays wrinkled until the end of the 6th month for want of subcutaneous fat, and the testes descend into the scrotum just before birth.',
      objective:
        'State when the fetal period begins, in weeks and in months, and say what distinguishes it from the embryonic period.',
      pitfall:
        'Counting in months when the book counts in weeks, and landing a month early. The 9th week is the beginning of the 3rd month, not of the 2nd: weeks 1–4 are the first month and weeks 5–8 the second, so the eight weeks of the embryonic period fill two whole months and the fetal period starts as the third begins.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Period',
      type: 'developmental_process',
      aliases: ['Fetal life', 'Ninth week', 'Third month of pregnancy'],
    },
    {
      key: 'fetal-head-to-body-proportion-changes-through-the-fetal-period',
      label: 'The head falls from half the crown-rump length in the 3rd month to a third of crown-heel length in the 5th and a quarter of it at birth',
      definition:
        'The fetus is measured two ways: crown-rump length, the sitting height, and crown-heel length, from the vertex of the skull to the heel, which is the standing height. The head grows more slowly than the rest of the body through the fetal period, so its share of the whole falls on a schedule the book tabulates: at the beginning of the 3rd month the head is one half of the crown-rump length, at the beginning of the 5th month one third of the crown-heel length, and at birth one quarter of the crown-heel length. The head is still disproportionately large at birth by adult standards — an adult head is about one eighth of standing height — which is why the proportion is examined at all.',
      objective:
        'Give the head\'s fraction of body length at the beginning of the 3rd month, the beginning of the 5th month and at birth, and say which measurement each fraction is taken against.',
      pitfall:
        'Answering with the fraction from the neighbouring stage. One third is the 5th month and one half is the 3rd month, and both are printed as distractors beside the correct one quarter; a student who has learnt the three numbers as a list without their dates will pick whichever comes to mind first.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Period',
      type: 'developmental_process',
      aliases: ['Crown-rump length', 'Crown-heel length', 'CRL', 'CHL'],
    },
    {
      key: 'fetal-weight-at-full-term',
      label: 'A full-term fetus weighs 3000–3400 g, and the smaller figures in the growth table belong to the preterm weeks',
      definition:
        'At full term — 38 weeks after fertilisation — the fetus weighs about 3000 to 3400 grams. The figure sits at the end of the growth table that runs through the fetal period, and the rows above it are the weights of a fetus that is not yet term: roughly 900–1300 g at 25–28 weeks and 1400–2100 g at 28–32 weeks. Weight rises fastest in the last two months, when subcutaneous fat is laid down and the wrinkled skin of the 6th month fills out.',
      objective:
        'Give the weight of the fetus at full term, and place the smaller weights in the table at the preterm weeks they belong to.',
      pitfall:
        'Reading the answer off the wrong row of the growth table. 1400–2100 g is a real figure from that table and belongs to 28–32 weeks, which is why it is the distractor that catches most students — and why one printing of this question in the books is keyed to it in error.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Period',
      type: 'developmental_process',
      aliases: ['Birth weight', 'Full term weight'],
    },
  ],

  questions: [
    {
      key: 'fetal-period-starts-at-the-beginning-of-a32cd7a3',
      conceptKey: 'fetal-period-begins-at-the-ninth-week-and-is-growth-not-organogenesis',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Convert the 9th week into the month the book counts it as.',
      explanations: {
        A: 'The 2nd month is weeks 5 to 8, which is the second half of the embryonic period — the organs are still being formed. Picked by students who count the eight embryonic weeks as one month.',
        B: 'Correct. The fetal period begins at the beginning of the 9th week, and the 9th week opens the 3rd month.',
        C: 'By the 4th month the fetus is already a month into the fetal period: lanugo hair is appearing and the external genitalia differentiated at the end of the previous month.',
        D: 'The 5th month is when vernix caseosa appears and movements are first clearly felt — events within the fetal period, not its start.',
      },
    },
    {
      key: 'at-full-term-the-head-of-the-fetus-represent-about-358a7434',
      conceptKey: 'fetal-head-to-body-proportion-changes-through-the-fetal-period',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Attach the right fraction to birth rather than to a mid-fetal stage.',
      explanations: {
        A: 'One fifth is not one of the book\'s three figures at all. It reads plausibly because it lies between the newborn\'s quarter and the adult\'s eighth, and it is the option a student picks when they remember only that the head shrinks in proportion.',
        B: 'One sixth would make the newborn head nearer adult proportions than it is; the disproportionately large head is the whole point of the newborn figure.',
        C: 'One third is the true figure for the beginning of the 5th month, taken against crown-heel length. It is the most tempting distractor here because it is the adjacent stage on the same measurement, and a student who has memorised the fractions without their dates will reach for it.',
        D: 'Correct. At birth the head is about one quarter of the crown-heel length, down from one half of the crown-rump length at the beginning of the 3rd month.',
      },
    },
    {
      key: 'the-weight-of-fetus-at-full-tern-l-ranges-between-61619abe',
      conceptKey: 'fetal-weight-at-full-term',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the full-term weight and recognise the preterm weights beside it.',
      explanations: {
        A: '900–1300 g is the weight around 25–28 weeks — a fetus at the edge of viability, less than half of term weight.',
        B: '1400–2100 g is the weight at 28–32 weeks. It is the commonest wrong answer because it is a real row of the same growth table, and one printing of this very question in the books is keyed to it in error.',
        C: 'Correct. A full-term fetus weighs 3000–3400 g, the last row of the growth table.',
        D: '4600–5300 g is well above any normal birth weight; a baby of that size is macrosomic and a recognised complication, not the norm.',
      },
    },
    {
      key: 'the-weight-of-fetus-at-full-term-ranges-between-083d9e47',
      conceptKey: 'fetal-weight-at-full-term',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the full-term weight and recognise the preterm weights beside it.',
      answerOverride: 'C',
      answerOverrideReason:
        'This printing carries no key. The same question is printed elsewhere in the books keyed to C, 3000–3400 g, and that is the figure the growth table gives at term; the two annotated printings keyed to B are reading the 28–32 week row. Set to C.',
      explanations: {
        A: '900–1300 g is the weight around 25–28 weeks. A term newborn of that weight would be severely growth-restricted.',
        B: '1400–2100 g belongs to 28–32 weeks, a preterm fetus. It is the trap on this question, and it catches students because it is genuinely printed in the table they revised from — one row too high.',
        C: 'Correct. 3000–3400 g is the full-term weight.',
        D: '4600–5300 g is macrosomia, seen with maternal diabetes; it is not the normal range.',
      },
    },
    {
      key: 'fetal-period-starts-at-the-beginning-of-dep-book-ad-ad-vip-a-e06047ce',
      conceptKey: 'fetal-period-begins-at-the-ninth-week-and-is-growth-not-organogenesis',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has a reader\'s marginal annotation run into it and reads "Fetal period starts at the beginning of (DEP BOOK) ad ad ViP a- 2nd month" — the annotation names an answer inside the question, which gives the game away and names the wrong month besides. The same question is intact and keyed at `fetal-period-starts-at-the-beginning-of-a32cd7a3`, which is the copy to use. Kept so that whoever rescans this page knows the row is a duplicate and not a separate question. A rescan of a clean, unannotated copy would recover it.',
    },
    {
      key: 'the-weight-of-fetus-at-full-term-ranges-between-dep-book-3c62c98f',
      conceptKey: 'fetal-weight-at-full-term',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The worse of three printings of one question: a reader\'s "(DEP BOOK)" annotation has run into the stem and a second scrawl, "ViP Ac", into option A. It is also the printing whose key I believe is wrong — it is keyed to 1400–2100 g, which is the 28–32 week row of the growth table, while the clean printing at `the-weight-of-fetus-at-full-tern-l-ranges-between-61619abe` is keyed to 3000–3400 g. Both defects point the same way, so it is excluded rather than overridden: the clean printing is already in this file and carries the same teaching. The disagreement between the printings is a reviewer\'s question, not a scanner\'s — the department book settles it in Table 1 on page 106, which the extraction holds only as an image.',
    },
  ],
}
