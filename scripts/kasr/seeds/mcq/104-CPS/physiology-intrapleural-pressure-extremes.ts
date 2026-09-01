import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Thoracic Cavity — Intrapleural Pressure Extremes",
  modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
  articleId: "ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE",

  concepts: [
    {
      key: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      label: "Transpulmonary pressure equals intra-alveolar minus intrapleural pressure; intrapleural pressure runs about -3 to -8 cmH2O in normal breathing, can fall to -30 to -40 cmH2O in Muller's experiment, and can rise to about +50 cmH2O (positive) in Valsalva's experiment",
      definition: "Transpulmonary (transmural) pressure equals intra-alveolar pressure minus intrapleural pressure, and is the force that expands the lungs against their elastic recoil: at the end of normal expiration it is about 3 cmH2O (0 - (-3)), and at the end of normal inspiration about 6 cmH2O (0 - (-6)). Intrapleural pressure itself is about -3 cmH2O at the end of normal expiration and ranges -6 to -8 cmH2O at the end of normal inspiration; in Muller's experiment (forced inspiration against a closed glottis) it can fall to -30 to -40 cmH2O, and in Valsalva's experiment (forced expiration against a closed glottis) it can rise to about +50 cmH2O, becoming positive. In diseases that destroy elastic fibres, such as emphysema, reduced lung recoil makes the intrapleural pressure less negative than normal at any given lung volume.",
      objective: "State the formula for transpulmonary pressure and the intrapleural pressure ranges in normal breathing, Muller's experiment and Valsalva's experiment.",
      pitfall: "Assuming intrapleural pressure is always negative — a Valsalva-type forced expiratory effort against a closed glottis can drive it strongly positive, to about +50 cmH2O; and assuming emphysema makes intrapleural pressure MORE negative, when reduced recoil in fact makes it LESS negative.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
      type: "mechanism",
      aliases: ["Transpulmonary pressure", "Intrapleural pressure ranges", "Muller's and Valsalva's experiments"],
    },
  ],

  questions: [
    {
      key: "during-which-of-the-foliowing-would-the-intra-pleura-pressur-de1dd666",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify forced expiration against a closed glottis (Valsalva's experiment) as the condition that drives intrapleural pressure positive.",
      explanations: {
        A: "During active inspiration intrapleural pressure becomes more negative than the resting value (about -6 to -8 cmH2O), not positive — the opposite direction from what this question asks about.",
        B: "During passive expiration intrapleural pressure returns towards its resting value (about -3 cmH2O), still negative relative to atmospheric pressure, not positive.",
        C: "Forced inspiration with the glottis closed is Muller's experiment, which drives intrapleural pressure strongly negative, down to about -30 to -40 cmH2O — the opposite extreme from becoming positive.",
        D: "This is the correct answer. Forced expiration with the glottis closed is Valsalva's experiment, which can drive intrapleural pressure positive, to about +50 cmH2O, because the expiratory effort compresses the sealed thorax against a closed airway.",
      },
    },
    {
      key: "during-which-of-the-following-would-the-intra-pleural-pressu-232671b6",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify forced expiration against a closed glottis (Valsalva's experiment) as the condition that drives intrapleural pressure positive.",
      explanations: {
        A: "During active inspiration intrapleural pressure becomes more negative than the resting value (about -6 to -8 cmH2O), not positive — the opposite direction from what this question asks about.",
        B: "During passive expiration intrapleural pressure returns towards its resting value (about -3 cmH2O), still negative relative to atmospheric pressure, not positive.",
        C: "Forced inspiration with the glottis closed is Muller's experiment, which drives intrapleural pressure strongly negative, down to about -30 to -40 cmH2O — the opposite extreme from becoming positive.",
        D: "This is the correct answer. Forced expiration with the glottis closed is Valsalva's experiment, which can drive intrapleural pressure positive, to about +50 cmH2O, because the expiratory effort compresses the sealed thorax against a closed airway.",
      },
    },
    {
      key: "during-which-of-the-following-would-the-intra-pleural-pressu-e2dafb02",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify forced expiration against a closed glottis (Valsalva's experiment) as the condition that drives intrapleural pressure positive.",
      explanations: {
        A: "During active inspiration intrapleural pressure becomes more negative than the resting value (about -6 to -8 cmH2O), not positive — the opposite direction from what this question asks about.",
        B: "During passive expiration intrapleural pressure returns towards its resting value (about -3 cmH2O), still negative relative to atmospheric pressure, not positive.",
        C: "Forced inspiration with the glottis closed is Muller's experiment, which drives intrapleural pressure strongly negative, down to about -30 to -40 cmH2O — the opposite extreme from becoming positive.",
        D: "This is the correct answer. Forced expiration with the glottis closed is Valsalva's experiment, which can drive intrapleural pressure positive, to about +50 cmH2O, because the expiratory effort compresses the sealed thorax against a closed airway.",
      },
    },
    {
      key: "intra-pleural-pressure-1-92185ac4",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that intrapleural pressure is sub-atmospheric throughout normal quiet breathing.",
      explanations: {
        A: "This is the correct answer. Intrapleural pressure stays sub-atmospheric (negative) throughout both normal inspiration and normal expiration, ranging from about -3 cmH2O at end-expiration to about -6 to -8 cmH2O at end-inspiration.",
        B: "Intrapleural pressure becomes MORE sub-atmospheric (more negative), not less, during inspiration — the lung's own expansion pulls it further below atmospheric pressure as the chest cavity enlarges.",
        C: "Intrapleural pressure becomes LESS negative in emphysema, not more — destroyed elastic fibres reduce the lung's inward recoil, so less negative pressure is needed to balance the chest wall's outward pull at any given volume.",
        D: "Muller's experiment (forced inspiration against a closed glottis) drives intrapleural pressure to about -30 to -40 cmH2O — a strongly negative value, not a positive 30 cmH2O reading.",
      },
    },
    {
      key: "which-of-the-following-is-true-under-normal-conditions-145d5832",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that intrapleural pressure stays below atmospheric pressure throughout normal quiet breathing.",
      explanations: {
        A: "The opposite is true: intrapleural pressure is always LESS than intrapulmonary (intra-alveolar) pressure in normal breathing — that positive difference (transpulmonary pressure) is what keeps the lung expanded against its own recoil.",
        B: "Intrapulmonary pressure is not always greater than atmospheric pressure; it oscillates around atmospheric, falling below it during inspiration and rising above it only during expiration.",
        C: "Correct: intrapleural pressure stays sub-atmospheric throughout normal quiet breathing, from about -3 cmH2O at end-expiration to about -6 to -8 cmH2O at end-inspiration.",
        D: "Intrapulmonary pressure is not always less than atmospheric pressure; it falls below atmospheric during inspiration but rises above it during expiration, driving air back out.",
      },
    },
    {
      key: "in-muller-s-experiment-it-reaches-30cmh20-26-the-intrapleura-fe19c8c8",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The stem merges two separate items: a fragment about Muller's experiment reaching 30 cmH2O (a distinct fact already covered by this leaf's Muller/Valsalva questions) bled into the start of a differently-numbered next item ('The intrapleural pressure at the end of inspiration is:'), leaving it unclear which question is actually being asked. Independently, two of its options ('+ 4 mm Hg', '+ 6mm Hg') begin with a literal '+', which the import format reserves as an append sigil rather than literal text — the same defect that excludes its sibling row below.",
    },
    {
      key: "the-intrapleural-pressure-at-the-end-of-inspiration-is-9c8970b0",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Options B ('+4 mm Hg') and D ('+6 mm Hg') begin with a literal '+', which the platform's import format reserves as an append sigil for that column rather than literal text — medical:batch confirms this: 'answer_b starts with \"+\", but this column does not take an append ... the record keeps a value nothing will ever match'. Not fixable from the seed, since question option text has no override field; only a re-transcription of the source without the leading plus signs would resolve it.",
    },
    {
      key: "the-intrapleural-pressure-is-positive-in-90a4bb0f",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify Valsalva's experiment (forced expiration against a closed glottis) as the condition that drives intrapleural pressure positive.",
      explanations: {
        A: "Intrapleural pressure is still negative (about -3 cmH2O) at the end of normal expiration, not positive.",
        B: "Muller's experiment (forced inspiration against a closed glottis) drives intrapleural pressure strongly negative, to about -30 to -40 cmH2O — the opposite extreme from becoming positive.",
        C: "Correct: Valsalva's experiment (forced expiration against a closed glottis) can drive intrapleural pressure positive, to about +50 cmH2O, because the expiratory effort compresses the sealed thorax against a closed airway.",
        D: "Deep inspiration makes intrapleural pressure more negative than normal quiet inspiration, not positive.",
      },
    },
    // run41 — bank-tagged "Mechanics of Breathing", a leaf-mismatch reroute
    // onto this file's own already-claimed concept: intrapleural pressure
    // running more negative during inspiration than during expiration is
    // exactly the range this concept's own definition already states
    // (about -3 cmH2O at end-expiration, -6 to -8 cmH2O at end-inspiration).
    {
      key: "which-of-the-following-is-true-during-inspiration-b760feb5",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that intrapleural pressure is more negative during inspiration than during expiration, not that alveolar pressure equals or exceeds atmospheric or that lung volume falls below FRC.",
      explanations: {
        A: "During inspiration lung volume rises above, not falls below, the functional residual capacity it sat at before the breath began.",
        B: "Alveolar pressure falls BELOW, not equals, atmospheric pressure during inspiration — that pressure gradient is exactly what drives air into the lung.",
        C: "Alveolar pressure is lower than, not higher than, atmospheric pressure during inspiration; a higher alveolar pressure is the condition for expiration, the reverse phase.",
        D: "This is the correct answer. As the thorax expands during inspiration, intrapleural pressure is pulled further below atmospheric — about -6 to -8 cmH2O at end-inspiration compared with about -3 cmH2O at end-expiration — making it more negative during inspiration than during expiration.",
      },
    },
    // run41 — bank-tagged "Mechanics of Breathing", the same corrupted-
    // stem-plus-missing-option hazard already excluded twice in this file
    // (in-muller-s-experiment...fe19c8c8, the-intrapleural-pressure-at-
    // the-end-of-inspiration-is...9c8970b0): option A's own text ("-1
    // mmHg") has bled into the stem itself, leaving only 3 clean surviving
    // options (B, C, D).
    {
      key: "during-quiet-inspiration-ipp-equals-a-1mmug-003c6ae3",
      conceptKey: "transpulmonary-pressure.definition-and-intrapleural-pressure-extremes",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Corrupted stem: option A's own text ('a-- 1mmHg') has bled into the stem itself ('During quiet inspiration, IPP equals: a-- 1mmug'), leaving only 3 distinguishable surviving options (B, C, D) — below the platform's 4-to-5-option import contract. The same corruption class already excludes two sibling rows in this file (in-muller-s-experiment-it-reaches-30cmh20...fe19c8c8, the-intrapleural-pressure-at-the-end-of-inspiration-is...9c8970b0); the genuine intrapleural-pressure-range fact is taught cleanly by this file's own concept and its five kept questions above.",
    },
  ],
}
