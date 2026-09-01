import type { McqLeafSeed } from '../../mcq.ts'

/**
 * `104 CPS > Physiology > Respiratory System > Mechanics of Breathing` — a
 * new leaf. `find-existing.mjs` returned "safe to create" for every muscle-
 * of-breathing and intra-alveolar-pressure term searched before minting
 * (a live Year 3 pulmonology catalogue, CON-RES-* under DIS-PHY-T03, holds
 * adjacent but not identical facts — e.g. CON-RES-69811F39EAEB45,
 * "Diaphragm contraction flattens it and increases thoracic longitudinal
 * diameter" — but that catalogue is a different pipeline/textbook,
 * GENERATED_BY-blind to `existingConceptIds()` for module "104 CPS" the
 * same way documented repeatedly elsewhere in this branch; recorded as a
 * conflict below, not reused).
 *
 * `ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT`'s own `## notes` field states
 * plainly that "the basic quiet-breathing muscle/pressure sequence" is
 * "deliberately not covered by this article" because a different,
 * cross-year catalogue already teaches it from a different textbook. That
 * catalogue is exactly the GENERATED_BY-blind one above — no 104-CPS
 * article currently states the muscle-of-breathing content this leaf's own
 * bank rows test. The article is cited anyway, as the closest live
 * respiratory-mechanics article this module has, with the gap disclosed on
 * the concept rather than invented past; every fact below is standard,
 * undisputed physiology corroborated by the bank's own
 * `external-solved-book-recovered` answers (cross-checked against the
 * department's own solved-paper key).
 */
export const LEAF: McqLeafSeed = {
  leaf: "Physiology Respiratory System — Mechanics of Breathing",
  modulePath: "104 CPS > Physiology > Respiratory System > Mechanics of Breathing",
  articleId: "ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT",

  concepts: [
    {
      key: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      label: "Quiet inspiration uses the diaphragm and external intercostals alone; quiet expiration is passive; forced inspiration adds accessory muscles and forced expiration recruits the internal intercostals and abdominal muscles",
      definition: "Quiet (normal) inspiration is produced by two muscles only: the diaphragm, which contracts and flattens, descending to increase the thoracic cavity's vertical diameter, and the external intercostal muscles, which contract to elevate the ribs and increase the thoracic cavity's antero-posterior diameter. Quiet expiration takes no muscle contraction at all — it is passive, driven once the inspiratory muscles relax by the lung's own elastic and surface-tension recoil pulling the chest back to its resting (functional residual capacity) volume. Forced (deep) inspiration recruits accessory muscles on top of the diaphragm and external intercostals — chiefly the sternocleidomastoid and scalene muscles, which further elevate the upper ribs and sternum. Forced expiration is active, recruiting the internal intercostal muscles, which depress the ribs, and the abdominal muscles, which contract to push the relaxed diaphragm further upward, both reducing thoracic volume below its resting value.",
      objective: "Name the diaphragm and external intercostals as the sole muscles of quiet inspiration, state that quiet expiration is passive, and name the accessory muscles recruited for forced inspiration (sternocleidomastoid, scalenii) and forced expiration (internal intercostals, abdominal muscles).",
      pitfall: "Assuming the internal intercostals assist inspiration because they are 'the other' intercostal layer. The internal intercostals are expiratory, not inspiratory — only the external intercostals raise the ribs; the internal intercostals depress them, which is why they are recruited for forced, active expiration instead.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Mechanics of Breathing",
      type: "mechanism",
      aliases: ["Muscles of inspiration", "Muscles of expiration", "Accessory muscles of respiration"],
      conflicts: [
        "A live, cross-year catalogue (CON-RES-69811F39EAEB45, 'Diaphragm contraction flattens it and increases thoracic longitudinal diameter'; CON-RES-58E46604D5D495, 'Expiratory muscles act during exercise and voluntary forced expiration') states overlapping facts from a different textbook (Year 3 pulmonology, DIS-PHY-T03). GENERATED_BY-blind to existingConceptIds() for module \"104 CPS\" — build-batches.ts only scans docs/Kasr-Source-Imports/concept/104-CPS-*.md — the same reasoning documented repeatedly elsewhere in this branch for cross-catalogue overlaps. Not reused; recorded for a future consolidation pass.",
      ],
      gaps: [
        "No 104-CPS respiratory article currently states this muscle-of-breathing sequence in its own prose — ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT's own notes explicitly defer it to the cross-year catalogue above. Standard, undisputed physiology; flagged for a future 104-CPS mechanics-of-breathing article.",
      ],
    },
    {
      key: "intra-alveolar-pressure.changes-through-the-quiet-breathing-cycle",
      label: "Intra-alveolar pressure equals atmospheric during the pause between breaths, falls to about 1 mmHg below atmospheric during inspiration, and rises to about 1 mmHg above atmospheric during expiration",
      definition: "Intra-alveolar (intrapulmonary) pressure oscillates by only about 1 mmHg around atmospheric pressure across the quiet breathing cycle — a small swing compared with intrapleural pressure's own larger, more negative excursion. During the momentary pause between breaths, with no airflow, intra-alveolar pressure equals atmospheric pressure exactly. As inspiration begins, thoracic expansion lowers intra-alveolar pressure to about 1 mmHg below (negative to) atmospheric, and this small pressure gradient is what drives air down into the alveoli; by the end of inspiration, once airflow has equalised the pressures again, it returns to atmospheric. During expiration the reverse occurs: intra-alveolar pressure rises to about 1 mmHg above (positive to) atmospheric, driving air back out, before returning to atmospheric at the next pause.",
      objective: "State that intra-alveolar pressure is atmospheric at the pause between breaths, about 1 mmHg negative during inspiration and about 1 mmHg positive during expiration — a much smaller swing than intrapleural pressure's own range.",
      pitfall: "Confusing intra-alveolar pressure's small, roughly 1 mmHg swing with intrapleural pressure's own larger, more negative range (about -3 cmH2O at end-expiration to -6 to -8 cmH2O at end-inspiration). The two are different pressures at different sites: intrapleural pressure is always negative in quiet breathing, while intra-alveolar pressure swings on both sides of, and returns to, atmospheric with every breath.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Mechanics of Breathing",
      type: "mechanism",
      aliases: ["Intra-alveolar pressure", "Intrapulmonary pressure", "Alveolar pressure during breathing"],
      gaps: [
        "No 104-CPS respiratory article currently states this specific pressure sequence in its own prose, for the same reason as the muscles-of-breathing concept above — deferred by ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT's own notes to a cross-year catalogue. Standard, undisputed physiology; flagged for the same future article.",
      ],
    },
  ],

  questions: [
    {
      key: "a-healthy-45-year-old-man-is-reading-the-newspaper-which-of-39a53f44",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Name the diaphragm and external intercostals as the two muscles used for quiet breathing.",
      explanations: {
        A: "The internal intercostals are expiratory (recruited only for forced expiration), not inspiratory, so they do not belong in an inspiration/quiet-breathing pairing with the diaphragm.",
        B: "The abdominal muscles are accessory expiratory muscles, recruited only for forced expiration; they play no role in quiet breathing, and internal intercostals are likewise expiratory, not inspiratory.",
        C: "This is the correct answer. A healthy person breathing quietly at rest uses only the diaphragm and the external intercostal muscles — the two muscles of quiet inspiration — with expiration following passively.",
        D: "The sternocleidomastoid is an accessory muscle recruited only for forced (deep) inspiration, not for ordinary quiet breathing at rest.",
      },
    },
    {
      key: "concerning-respiration-a-expiratory-muscles-act-during-norma-6bd951ba",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that external intercostal contraction increases the antero-posterior diameter of the thorax, as distinct from the false claims that expiratory muscles act in normal expiration or that the diaphragm is the only respiratory muscle.",
      explanations: {
        A: "Expiratory muscles (internal intercostals, abdominal muscles) do NOT act during NORMAL (quiet) expiration — quiet expiration is passive, driven by elastic recoil alone; those muscles are recruited only for forced expiration.",
        B: "The diaphragm is not the only respiratory muscle — the external intercostals contract alongside it in quiet inspiration, and further accessory and expiratory muscles are recruited for forced breathing.",
        C: "This is the correct answer. Contraction of the external intercostal muscles elevates the ribs, which increases the thorax's antero-posterior diameter — one of the two mechanical events (with the diaphragm's vertical-diameter effect) that expands the chest during quiet inspiration.",
        D: "The scalene muscles are accessory muscles recruited only for forced (deep) inspiration, not muscles that act in ordinary respiration at rest.",
      },
    },
    {
      key: "during-forced-expiration-f768b49b",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that forced expiration is active, recruiting the abdominal muscles, not a passive process with rib elevation or external intercostal contraction.",
      explanations: {
        A: "Forced expiration is active, not passive — it is precisely the muscle recruitment beyond passive elastic recoil (internal intercostals, abdominal muscles) that makes an expiration 'forced' rather than quiet.",
        B: "The external intercostal muscles are inspiratory; forced expiration instead recruits their opposite-acting counterpart, the internal intercostals, which depress rather than elevate the ribs.",
        C: "Ribs are depressed, not elevated, during expiration (forced or quiet) — rib elevation is what the external intercostals do during INSPIRATION, the opposite phase.",
        D: "This is the correct answer. Forced expiration recruits the abdominal muscles, which contract to raise intra-abdominal pressure and push the relaxed diaphragm further upward, actively reducing thoracic volume beyond what passive recoil alone achieves.",
      },
    },
    {
      key: "inira-alveolar-pressure-during-normal-inspiration-2dec0ace",
      conceptKey: "intra-alveolar-pressure.changes-through-the-quiet-breathing-cycle",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that intra-alveolar pressure becomes about 1 mmHg negative to atmospheric pressure during normal inspiration.",
      explanations: {
        A: "Intra-alveolar pressure does change during inspiration — it falls below atmospheric pressure, which is exactly the small pressure gradient that draws air into the alveoli.",
        B: "This is the correct answer. During normal (quiet) inspiration, intra-alveolar pressure falls to about 1 mmHg negative to atmospheric pressure — a small gradient, but the one that drives airflow into the lung.",
        C: "Intra-alveolar pressure returns to atmospheric (not positive) once airflow stops at the end of inspiration; it only becomes positive during expiration, the following phase.",
        D: "A fall to -6 mmHg describes the larger swing of intrapleural pressure, not intra-alveolar pressure — intra-alveolar pressure's own normal-inspiration swing is only about -1 mmHg, a much smaller change.",
      },
    },
    {
      key: "intra-alveolar-pressure-during-normal-inspiration-43eb14c9",
      conceptKey: "intra-alveolar-pressure.changes-through-the-quiet-breathing-cycle",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that intra-alveolar pressure becomes about 1 mmHg negative to atmospheric pressure during normal inspiration.",
      explanations: {
        A: "Intra-alveolar pressure does change during inspiration — it falls below atmospheric pressure, which is exactly the small pressure gradient that draws air into the alveoli.",
        B: "This is the correct answer. During normal (quiet) inspiration, intra-alveolar pressure falls to about 1 mmHg negative to atmospheric pressure — a small gradient, but the one that drives airflow into the lung.",
        C: "Intra-alveolar pressure returns to atmospheric (not positive) once airflow stops at the end of inspiration; it only becomes positive during expiration, the following phase.",
        D: "A fall to -6 mmHg describes the larger swing of intrapleural pressure, not intra-alveolar pressure — intra-alveolar pressure's own normal-inspiration swing is only about -1 mmHg, a much smaller change.",
      },
    },
    {
      key: "intra-alveolar-pressure-b9340fd1",
      conceptKey: "intra-alveolar-pressure.changes-through-the-quiet-breathing-cycle",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that intra-alveolar pressure equals atmospheric pressure during the pause between inspiration and expiration, rather than staying negative throughout quiet breathing or reaching the larger magnitudes intrapleural pressure does.",
      explanations: {
        A: "Intra-alveolar pressure is not negative throughout normal quiet breathing — it is negative only during inspiration, returns to atmospheric (zero) at the pause, and becomes positive during expiration.",
        B: "This is the correct answer. Intra-alveolar pressure equals atmospheric pressure (taken as zero) during the momentary pause between inspiration and expiration, when airflow has stopped and no pressure gradient remains.",
        C: "5-6 mmHg during quiet expiration is far too large a swing for intra-alveolar pressure, whose normal quiet-breathing range is only about 1 mmHg on either side of atmospheric; a swing that size instead describes intrapleural pressure's own larger excursions.",
        D: "More negative than 5-6 mmHg during quiet inspiration likewise overstates intra-alveolar pressure's real swing (about -1 mmHg); that magnitude belongs to intrapleural pressure, not intra-alveolar pressure.",
      },
    },
    {
      key: "intra-alveolar-pressure-a-is-negative-throughout-normal-quie-fa946e59",
      conceptKey: "intra-alveolar-pressure.changes-through-the-quiet-breathing-cycle",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Corrupted stem: option A's own text ('a-Is negative throughout normal quiet breathing') has bled into the stem itself, leaving only 3 distinguishable surviving options (B, C, D) — below the platform's 4-to-5-option import contract. A clean, complete 4-option occurrence of this exact same question survives intact as intra-alveolar-pressure-b9340fd1 (kept above); not re-authored here to avoid a duplicate concept-question pairing over a corrupted source row when a clean one already exists.",
    },
    {
      key: "regarding-respiration-and-the-changes-in-the-thorax-all-the-69394d4b",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the root of the lung, unlike the other listed thoracic changes, DOES move during inspiration, rather than staying fixed.",
      explanations: {
        A: "True, so not the exception. Diaphragmatic contraction flattens the dome and increases the thorax's vertical diameter — one of the two mechanical events (with intercostal contraction) that expand the chest during inspiration.",
        B: "True, so not the exception. External intercostal contraction elevates the ribs, increasing the thorax's antero-posterior diameter alongside the diaphragm's vertical-diameter effect.",
        C: "True, so not the exception. Quiet expiration is a passive phenomenon, driven by elastic recoil once the inspiratory muscles relax, with no muscle contraction of its own.",
        D: "The exception, and the answer. The root of the lung does move with inspiration: as the diaphragm descends and the thorax expands, the mediastinal structures — including the hilum and root of each lung — shift downward with it, rather than staying fixed in place. (Standard thoracic anatomy; not spelled out verbatim by this leaf's own currently authored article — flagged as a gap for the article-authoring lane.)",
        E: "True, so not the exception. Deep (forced) inspiration produces the maximum increase in thoracic capacity, recruiting accessory muscles on top of the diaphragm and external intercostals used in quiet breathing.",
      },
    },
    {
      key: "the-muscles-of-inspiration-include-all-of-the-following-exce-c11b2e68",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Easy",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify the internal intercostal as the one listed muscle that is expiratory, not inspiratory.",
      explanations: {
        A: "True, so not the exception. The diaphragm is a (indeed the principal) muscle of inspiration.",
        B: "True, so not the exception. The external intercostals are muscles of quiet inspiration, elevating the ribs.",
        C: "True, so not the exception. The sternocleidomastoid is an accessory muscle of forced inspiration.",
        D: "The exception, and the answer. The internal intercostal is an EXPIRATORY muscle — it depresses the ribs and is recruited for forced expiration, not inspiration — the opposite role from its external counterpart.",
      },
    },
    {
      key: "which-ef-the-following-are-muscles-of-inspiration-0eea2c0f",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Name the diaphragm and external intercostals as the muscles of (quiet) inspiration.",
      explanations: {
        A: "Abdominal muscles are expiratory (forced expiration only), not inspiratory, so pairing them with the external intercostals as inspiratory muscles is incorrect.",
        B: "Abdominal muscles are expiratory, not inspiratory, so pairing them with the diaphragm as inspiratory muscles is incorrect.",
        C: "This is the correct answer. The diaphragm and the external intercostal muscles are the muscles of (quiet) inspiration.",
        D: "The internal intercostal is expiratory, not inspiratory — the diaphragm pairs with the EXTERNAL, not internal, intercostals for inspiration.",
      },
    },
    {
      key: "which-of-the-following-are-muscles-of-inspiration-5936e8bb",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Name the diaphragm and external intercostals as the muscles of (quiet) inspiration.",
      explanations: {
        A: "Abdominal muscles are expiratory (forced expiration only), not inspiratory, so pairing them with the external intercostals as inspiratory muscles is incorrect.",
        B: "Abdominal muscles are expiratory, not inspiratory, so pairing them with the diaphragm as inspiratory muscles is incorrect.",
        C: "This is the correct answer. The diaphragm and the external intercostal muscles are the muscles of (quiet) inspiration.",
        D: "The internal intercostal is expiratory, not inspiratory — the diaphragm pairs with the EXTERNAL, not internal, intercostals for inspiration.",
      },
    },
    {
      key: "which-of-the-following-does-not-happen-during-inspiration-61b7b571",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify that the diaphragm flattens and descends, rather than 'lifting up,' during inspiration.",
      explanations: {
        A: "True, so not the exception. Contraction of the external intercostals elevates the ribs during inspiration.",
        B: "The exception, and the answer. The diaphragm does NOT lift up during inspiration — it contracts and FLATTENS, moving DOWNWARD, which is exactly what increases the thoracic cavity's vertical diameter.",
        C: "True, so not the exception. External intercostal contraction increases the antero-posterior dimension of the chest during inspiration.",
        D: "True, so not the exception. Rib elevation during inspiration also widens the thorax transversely (the 'bucket-handle' movement of the ribs), increasing the transverse dimension.",
      },
    },
    {
      key: "which-of-the-following-occurs-during-inspiration-d111eb4c",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the diaphragm contracts and flattens during inspiration, while intrathoracic pressure falls, the external intercostals contract (not relax), and thoracic volume rises (not falls).",
      explanations: {
        A: "This is the correct answer. During inspiration, the diaphragm contracts and flattens, descending to increase the thoracic cavity's vertical diameter — the principal mechanical event of quiet inspiration.",
        B: "Intrathoracic (intrapleural) pressure does change during inspiration — it becomes more negative as the expanding chest pulls further on the pleural space, not unchanged.",
        C: "The external intercostals CONTRACT, not relax, during inspiration — their contraction is what elevates the ribs and increases the thorax's antero-posterior diameter.",
        D: "Thoracic volume increases, not decreases, during inspiration — a volume decrease is what happens during expiration, the opposite phase.",
      },
    },
    // 2 rows left deliberately excluded — genuine option-count/content
    // corruption, not authored either way.
    {
      key: "during-inspiration-there-is-29880fe3",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survive extraction (A, B, D — no C), below the platform's 4-to-5-option import contract. Independently of the missing option, none of the 3 surviving options is physiologically true (A, 'contraction of the internal intercostal muscles', is backwards — the EXTERNAL, not internal, intercostals contract in inspiration; B, 'passive increase in thorax volume', is backwards — inspiration is active, not passive; D, 'relaxation of the diaphragm', is backwards — the diaphragm contracts, not relaxes, in inspiration), which is consistent with the bank's own credited answer (A) being a letter-mapping artefact of the missing option C rather than a real key. The genuine facts these three false options invert are taught cleanly by this leaf's other kept questions.",
    },
    {
      key: "forced-expiration-b-7d9febd4",
      conceptKey: "muscles-of-breathing.quiet-vs-forced-inspiration-and-expiration",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survive extraction (A, C, D — no B), below the platform's 4-to-5-option import contract. The bank's own credited option C ('caused by contraction of both internal AND external intercostal muscles') also contradicts this leaf's own sourced muscles-of-breathing concept, under which the external intercostals are inspiratory and only the internal intercostals (with the abdominal muscles) are recruited for forced expiration — a genuine content conflict on top of the missing option, not merely a corrupted stem. The genuine forced-expiration muscle facts are taught cleanly by this leaf's during-forced-expiration-f768b49b question above.",
    },
  ],
}
