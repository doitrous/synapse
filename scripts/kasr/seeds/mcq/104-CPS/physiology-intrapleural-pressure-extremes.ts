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
  ],
}
