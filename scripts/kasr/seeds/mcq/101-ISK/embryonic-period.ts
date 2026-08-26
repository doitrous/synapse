/**
 * `101 ISK > Anatomy > General Embryology > Embryonic Period` — the question books' MCQs.
 *
 * Nine rows and three distinct questions. The books print each of the three
 * between two and four times, and in every case one printing is clean and the
 * rest carry a reader's pencil annotations — "(DEP BOOK)", strings of "Ac ad ad",
 * and in three of them the answer itself written into the stem. Six rows are
 * excluded on that ground and each names the clean printing to use instead, on
 * the pattern `blood-platelets.ts` set for duplicated questions with unequal
 * scans. Nothing here needs a reviewer; it needs a rescan of six pages, and the
 * questions themselves are sound.
 *
 * Two concepts, both minted. `paraxial-mesoderm-somite-derivatives` already
 * exists from the 2022 paper and is deliberately not reused: it is about how one
 * somite differentiates into sclerotome and dermomyotome, and every question in
 * this leaf is about when somites appear and how many of them there are in each
 * region — a different objective a student can hold one of and not the other.
 *
 * On whether the books ask timing the department book never states: they do not,
 * here. The 16-somite question needs the book's own formula, Age in days =
 * (number of somites − 1)/3 + 20, which is printed on page 88, and the four
 * occipital pairs are in the book's regional list on the same page.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Embryonic Period',
  modulePath: '101 ISK > Anatomy > General Embryology > Embryonic Period',
  articleId: 'ART-101-ANA-EMBRYONIC-PERIOD',

  concepts: [
    {
      key: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      label: 'Somites segment from the occipital region caudally, and there are 4 occipital, 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 8–10 coccygeal pairs',
      definition:
        'The paraxial mesoderm, lying on both sides of the notochord and the neural tube, divides transversely into segments called somites. Segmentation begins at the occipital region and extends caudally to the coccygeal region, so the occipital somites are the oldest and the coccygeal the youngest. Cephalic to the first occipital somite the paraxial mesoderm forms smaller unsegmented masses called somitomeres. The somites are classified regionally from cranial to caudal into 4 occipital, 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 8–10 coccygeal pairs, and 42–44 pairs are present in all by the 40th day.',
      objective:
        'Name the region where somite segmentation begins and the direction it proceeds, and give the number of pairs in each region.',
      pitfall:
        'Starting the count at the cervical region because that is where the vertebral column is usually described from. Segmentation starts one region higher, at the occipital, and the four occipital pairs are the ones that go on to build the base of the skull rather than vertebrae — which is why they are easy to forget and easy to examine.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Embryonic Period',
      type: 'developmental_process',
      aliases: ['Occipital somites', 'Somitomeres', 'Segmentation of paraxial mesoderm'],
    },
    {
      key: 'somite-period-dates-and-the-age-from-somite-number-formula',
      label: 'The first somite pair appears on day 20 and three pairs are added each day, so the number of somites gives the embryo\'s age',
      definition:
        'The intra-embryonic mesoderm divides into its three parts on the 17th gestational day. The first pair of occipital somites separates on the 20th day, and from then three pairs are added each day until the 30th day; this stretch of regular segmentation, day 21 to day 30, is the somite period. Segmentation then continues at a slower and irregular rate until the 35th to 40th day, by which time 42–44 pairs are present. Because the rate is fixed while segmentation is regular, the number of somites dates the embryo, and the department book gives the arithmetic: age in days = (number of somites − 1) / 3 + 20.',
      objective:
        'Give the day the first somite appears and the rate at which pairs are added, and use the book\'s formula to date an embryo from its somite count.',
      pitfall:
        'Guessing the age instead of using the formula. Sixteen somites is not sixteen days or twenty-plus-sixteen; it is (16 − 1)/3 + 20 = 25 days, and the distractors are set one day either side so that only the arithmetic separates them.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Embryonic Period',
      type: 'developmental_process',
      aliases: ['Somite period', 'Age of the embryo', 'Somite number'],
    },
  ],

  questions: [
    {
      key: 'segmentation-of-somites-starts-at-2371b78d',
      conceptKey: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Name where somite segmentation begins and infer the direction it runs.',
      explanations: {
        A: 'Correct. Segmentation begins at the occipital region and extends caudally from there.',
        B: 'The cervical region is the first one most students think of, because the vertebral column is usually recited from the neck down. Segmentation has already passed through four occipital pairs by the time it reaches it.',
        C: 'The thoracic somites are the largest group, twelve pairs, which makes them memorable — but they are third in order, not first.',
        D: 'The lumbar region is nearly the end of the sequence. If segmentation began there the occipital and cervical somites would be the youngest, and the whole craniocaudal gradient of development would run backwards.',
      },
    },
    {
      key: 'at-the-occipital-region-the-embryo-has-somites-fec42a5b',
      conceptKey: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Give the number of occipital somite pairs from the regional list.',
      answerOverride: 'A',
      answerOverrideReason:
        'Neither printing of this question in the books carries a key. The department book\'s regional list on page 88 gives 4 occipital, 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 8–10 coccygeal pairs, so the answer is four.',
      explanations: {
        A: 'Correct. Four pairs of occipital somites, the first of the six regional groups and the first to segment.',
        B: 'Six is not a count in the book\'s regional list at all. It is the number a student reaches for when they remember the occipital group as a middling one rather than the smallest of the six.',
        C: 'Three is the number of pairs added per day during the somite period, not the number in the occipital region. The two figures sit a line apart in the book and are easily transposed.',
        D: 'Five is the count for both the lumbar and the sacral regions, and a student who has learnt the list as a run of numbers rather than as region-to-number pairs will often land on it.',
      },
    },
    {
      key: 'the-age-of-an-embryo-with-16-pairs-of-somites-is-062154e3',
      conceptKey: 'somite-period-dates-and-the-age-from-somite-number-formula',
      difficulty: 'Hard', questionType: 'Calculation',
      learningObjective: 'Apply the book\'s somite-age formula rather than estimating.',
      answerOverride: 'C',
      answerOverrideReason:
        'None of the three printings of this question in the books carries a key. The department book\'s formula on page 88 is age in days = (number of somites − 1)/3 + 20, which for 16 somites gives (16 − 1)/3 + 20 = 5 + 20 = 25 days.',
      explanations: {
        A: '23 days is what comes out if the twenty-day starting point is kept but the three-pairs-a-day rate is applied to the wrong quantity — it corresponds to about ten somites, not sixteen.',
        B: '24 days is one day short, the answer of a student who divides sixteen by three and rounds down instead of subtracting the first pair before dividing. The "− 1" in the formula exists because the first pair marks day 20 itself.',
        C: 'Correct. (16 − 1)/3 + 20 = 25 days.',
        D: '26 days is one day long, from dividing sixteen by three and rounding up. Both neighbours are printed deliberately: the question is testing the arithmetic, not the recall.',
      },
    },
    {
      key: 'at-the-occipital-region-the-embryo-has-somites-dep-book-ac-a-ecc9d1b3',
      conceptKey: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has a reader\'s pencil annotation run into it — "(DEP BOOK) Ac ad Ac ad ad ad" — which is neither part of the question nor readable as anything. The same question is clean at `at-the-occipital-region-the-embryo-has-somites-fec42a5b`, which is the copy to use. Kept so a rescan treats this row as the duplicate it is.',
    },
    {
      key: 'segmentation-of-somites-starts-at-dep-book-0ace27b0',
      conceptKey: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate whose stem carries the annotation "(DEP BOOK)". Its options and its key agree with the clean printing at `segmentation-of-somites-starts-at-2371b78d`, so nothing is lost by excluding it. Recoverable by rescanning an unannotated copy, but there is no reason to: the question is already in this file intact.',
    },
    {
      key: 'segmentation-of-somites-starts-at-a-occipital-region-68b43e77',
      conceptKey: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two defects, either one fatal. The stem reads "Segmentation of somites starts at | a- Occipital region", so the answer is printed inside the question; and only three options survived — C, the thoracic region, was lost. A student shown this row is told the answer before being asked. Intact at `segmentation-of-somites-starts-at-2371b78d`.',
    },
    {
      key: 'segmentation-of-somites-starts-at-occipital-region-b79414ad',
      conceptKey: 'somite-segmentation-craniocaudal-order-and-regional-counts',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The worst of the four printings of this question: the stem has swallowed option A along with Arabic marginalia, and only B and D survive as options. Two options cannot be sat, and the surviving stem gives the answer away. Intact at `segmentation-of-somites-starts-at-2371b78d`.',
    },
    {
      key: 'the-age-of-an-embryo-with-16-pairs-of-somites-is-dep-book-ac-c425bf06',
      conceptKey: 'somite-period-dates-and-the-age-from-somite-number-formula',
      difficulty: 'Hard', questionType: 'Calculation',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has two of its own options annotated into it — "(DEP BOOK) Ac P a- 23 days. P Vi b- 24 days" — which both restates the option list inside the question and points at two answers, neither of which is right. The clean printing is `the-age-of-an-embryo-with-16-pairs-of-somites-is-062154e3`.',
    },
    {
      key: 'the-age-of-an-embryo-with-16-pairs-of-somites-is-i-735e660c',
      conceptKey: 'somite-period-dates-and-the-age-from-somite-number-formula',
      difficulty: 'Hard', questionType: 'Calculation',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options survived, and one of the three is not an answer to this stem: option B reads "Six", which has bled in from the occipital-somites question on the same page. Option C, the correct 25 days, was lost altogether, so the question as extracted cannot be answered correctly at all. A rescan recovers it — the clean printing at `the-age-of-an-embryo-with-16-pairs-of-somites-is-062154e3` already carries the same question with its full option set.',
    },
  ],
}
