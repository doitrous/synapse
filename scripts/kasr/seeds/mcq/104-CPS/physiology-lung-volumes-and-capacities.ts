/**
 * `104 CPS > Physiology > Respiratory System > Pulmonary Compliance` — lung
 * volumes/capacities, the work of breathing, and the obstructive-versus-
 * restrictive pattern on pulmonary function testing.
 *
 * **Article-coverage gap, disclosed rather than hidden.** `articleId` points
 * at the already-live `ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT`
 * (`104-CPS-articles.md`), the same article `physiology-pulmonary-
 * compliance-and-surfactant.ts` uses, because a brand-new
 * `ART-104-PHY-LUNG-VOLUMES-AND-VENTILATORY-MECHANICS` id was tried first and
 * failed the real gate: `medical:simulate` (not just `medical:batch`)
 * reported `article ... does not exist` for all 18 questions below, because
 * no such article is live or in any sibling batch. Pointing at the real,
 * live, evidenced `LUNG-RECOIL-AND-SURFACTANT` article clears that error, but
 * its current prose does not yet teach lung volumes/spirometry or the
 * obstructive/restrictive PFT pattern — only elastic recoil and surfactant.
 * **This is a real, open content gap, not a silently-accepted one**: the
 * article-authoring lane should add sections on lung volumes/capacities, the
 * work of breathing, and the obstructive-vs-restrictive pattern (Kasr
 * Alainy physiology department book, "Cardiopulmonary (Respiration)",
 * Chapter 2 "Pulmonary Compliance") to close it — see PROGRESS.md. Until
 * then these 18 questions cite a live article whose prose has not yet caught
 * up with what they test.
 *
 * A large live concept catalogue already exists for lung volumes and
 * capacities (`CON-RES-37824D44CE9505` "FRC is the lung volume remaining
 * after normal expiration", `CON-RES-F6F63B084F0575` "FRC formula",
 * `CON-RES-52BCF311FC9DFA` "chest-wall deformity reduces VC", and others),
 * per `ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE`'s own `## notes`: "a large
 * existing live catalogue (Year 3 pulmonology course, CON-RES-* under
 * DIS-PHY-T03) already teaches that material from a different textbook".
 * That catalogue's own source batch is no longer present anywhere in this
 * checkout (already imported, fully consumed), it carries no `104 CPS`
 * module tag, and it sits at `learner_years: [3]`, not Year 1 — so there is
 * no hand-authored file left in this repo to pin a matching canonical_key
 * against for `existingConceptIds()` to find. The concept below is minted
 * fresh under a deliberately distinct canonical_key rather than guessed at a
 * collision with that catalogue's ids; reconciling the two is a cross-lane/
 * cross-textbook consolidation call for the chief of staff, not something to
 * resolve silently here (see PROGRESS.md).
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Pulmonary Compliance",
  modulePath: "104 CPS > Physiology > Respiratory System > Pulmonary Compliance",
  articleId: "ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT",

  concepts: [
    {
      key: "lung-volumes-and-capacities.definitions-and-relationships",
      label: "The four non-overlapping lung volumes (TV, IRV, ERV, RV) combine into four capacities — IC = TV+IRV, FRC = ERV+RV, VC = IRV+TV+ERV, TLC = VC+RV",
      definition: "The four lung volumes are non-overlapping: tidal volume (TV, about 500 mL, the air moved in a normal quiet breath), inspiratory reserve volume (IRV, about 3000 mL, the extra air that can be inspired above a normal tidal inspiration), expiratory reserve volume (ERV, about 1100 mL, the extra air that can be forcibly expired after a normal tidal expiration), and residual volume (RV, about 1200 mL, the air remaining in the lungs after a maximal forced expiration, which can never be exhaled and so cannot be measured by spirometry). Two or more volumes combine into four capacities: inspiratory capacity (IC = TV + IRV, the total air that can be inspired starting from the end of a normal tidal expiration); functional residual capacity (FRC = ERV + RV, the air remaining in the lungs at the end of a normal tidal expiration); vital capacity (VC = IRV + TV + ERV, the maximum air that can be expired after a maximum inspiration, and so the one capacity that excludes RV); and total lung capacity (TLC = VC + RV, all the air the lungs can hold). Any volume or capacity not directly measured can be found from the others by this arithmetic, provided enough of the surrounding figures are known.",
      objective: "State the four lung volumes and four capacities, the formula relating each capacity to the volumes that compose it, and calculate an unmeasured volume or capacity from the others when enough of them are given.",
      pitfall: "Trying to calculate inspiratory reserve volume from vital capacity and tidal volume alone. VC = IRV + TV + ERV still has ERV unknown once IRV is asked for, so IRV cannot be isolated without also knowing ERV (or an equivalent, such as FRC and RV) — a question that gives only VC and TV is testing whether a student notices the calculation cannot be done, not asking for the arithmetic itself.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Pulmonary Compliance",
      type: "definition",
      aliases: ["Lung volumes", "Lung capacities", "TV IRV ERV RV", "Spirometry volumes", "FRC formula", "Vital capacity formula"],
    },
    {
      key: "work-of-breathing.elastic-vs-frictional-resistance",
      label: "In normal quiet breathing, elastic resistance of the lung and chest wall is the largest component of the work of breathing; airway (frictional) resistance dominates only once pathologically raised",
      definition: "The work of breathing is spent against three loads: the elastic resistance of the lung and chest wall (stretching them to change volume), the frictional (viscous) resistance of gas flowing through the airways, and the much smaller inertia of the moving tissues and gas. In a normally breathing, healthy individual at rest, elastic resistance is by far the largest of the three, so most of the work of quiet breathing overcomes elastic resistance, not airway friction or inertia; airway resistance becomes the dominant load only once it is pathologically raised, as in bronchial asthma. Because pulmonary surfactant lowers the surface tension that makes up the larger share of the lung's elastic resistance, a normal amount of surfactant reduces the work of breathing rather than adding to it; any process that stiffens the lung or chest wall (fibrosis, a surfactant deficiency, or a skeletal deformity such as kyphoscoliosis) or narrows the airways (bronchial asthma) raises the work of breathing above normal.",
      objective: "Identify elastic resistance as the dominant load in the work of breathing during normal quiet breathing, and recognise which conditions raise the work of breathing (airway narrowing, a stiffened lung or chest wall, a surfactant deficiency) versus which do not (a normal amount of surfactant).",
      pitfall: "Assuming whatever raises airway resistance always dominates the work of breathing. In normal quiet breathing, elastic resistance — stretching the lung and chest wall — is the largest component; airway resistance only becomes the dominant load once it is pathologically increased, as in obstructive airway disease.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Pulmonary Compliance",
      type: "mechanism",
      aliases: ["Work of breathing", "Elastic vs airway resistance work", "Load of quiet breathing"],
    },
    {
      key: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      label: "Obstructive disease lowers FEV1/FVC and raises RV, FRC and (in emphysema) TLC and compliance; restrictive disease lowers all lung volumes together while preserving or raising FEV1/FVC",
      definition: "Obstructive disease (e.g. bronchial asthma, emphysema) narrows the airways and raises airway resistance, so forced expiration is slowed: FEV1 falls more than FVC, giving a reduced FEV1/FVC ratio, while air trapping raises residual volume and functional residual capacity — and, in emphysema specifically, where destroyed elastic fibres also raise lung compliance, total lung capacity rises too. Restrictive disease (e.g. pulmonary fibrosis, kyphoscoliosis) instead stiffens the lung or chest wall and lowers compliance, so all lung volumes and capacities fall together, including vital capacity, total lung capacity and functional residual capacity, while the FEV1/FVC ratio is preserved or even increased because the stiffened lung still empties quickly relative to its now-smaller volume. Functional residual capacity is a useful discriminator between the two patterns: it rises in obstructive disease (air trapping) but falls in restrictive disease (a stiffer, smaller lung) — a genuine reversal, unlike vital capacity, which falls in both.",
      objective: "Contrast the obstructive and restrictive patterns of lung disease by their effect on the FEV1/FVC ratio, residual volume, total lung capacity and functional residual capacity, and identify emphysema's increased lung compliance and total lung capacity as findings that distinguish it from a restrictive process such as pulmonary oedema.",
      pitfall: "Assuming every lung volume and capacity moves in the same direction in obstructive disease as in restrictive disease. Functional residual capacity is the clearest counterexample: it rises with air trapping in obstructive disease but falls with a stiffened, smaller lung in restrictive disease — the two patterns are genuinely opposite on this measurement, not merely different in degree.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Pulmonary Compliance",
      type: "comparison",
      aliases: ["Obstructive vs restrictive lung disease", "PFT pattern", "FEV1/FVC ratio", "Emphysema physiology"],
    },
  ],

  questions: [
    {
      key: "a-35-year-old-man-has-a-vital-capacity-vc-of-5-l-a-tidal-vol-d5f494f1",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options (A, B, C) survived extraction/repair — below the platform's 4-to-5-option import contract. The calculation is otherwise soundly recoverable (ERV = VC - IC = 5 - 3.5 = 1.5 L, option C, per the bank's own editorial reasoning) but a fourth distractor was never captured to complete a valid option set.",
    },
    {
      key: "functional-residual-capacity-0a3774f5",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that functional residual capacity equals expiratory reserve volume plus residual volume.",
      explanations: {
        A: "Residual volume plus tidal volume is not a named capacity; FRC pairs residual volume with expiratory reserve volume, not tidal volume.",
        B: "Correct. Functional residual capacity is the air left in the lungs after a normal tidal expiration, and it is composed of the two volumes below tidal breathing: expiratory reserve volume plus residual volume (FRC = ERV + RV).",
        C: "Total lung capacity minus tidal volume does not equal FRC; TLC minus vital capacity equals residual volume, and FRC is ERV + RV, a different combination.",
        D: "Tidal volume plus inspiratory reserve volume is inspiratory capacity, not functional residual capacity — the two capacities sit on opposite sides of a normal tidal breath.",
      },
    },
    {
      key: "if-the-vital-capacity-is-4-5l-and-the-tidal-volume-is-525cc-db7fe474",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Hard",
      questionType: "Calculation",
      learningObjective: "Recognise that inspiratory reserve volume cannot be calculated from vital capacity and tidal volume alone.",
      explanations: {
        A: "3975 mL follows only from VC - TV (4.5 L - 0.525 L) treated as if it were IRV alone, which wrongly assumes ERV is zero — a real lung has a non-zero expiratory reserve volume, so this arithmetic does not give IRV.",
        B: "2075 mL does not follow from any correct rearrangement of the lung-volume formulas using only the two figures given; it cannot be derived without also knowing ERV.",
        C: "1050 mL likewise does not follow from a valid calculation using only vital capacity and tidal volume; it would require an assumed ERV that the question does not supply.",
        D: "Correct. Inspiratory reserve volume equals vital capacity minus tidal volume minus expiratory reserve volume (IRV = VC - TV - ERV). Vital capacity and tidal volume alone leave expiratory reserve volume unknown, so IRV cannot be isolated from only these two figures — a third figure (ERV, or an equivalent such as FRC and RV) is needed.",
      },
    },
    {
      key: "inspiratory-capacity-is-7707dbb8",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Define inspiratory capacity as tidal volume plus inspiratory reserve volume.",
      explanations: {
        A: "Correct. Inspiratory capacity is the maximum volume that can be inspired starting from the end of a normal tidal expiration — it equals tidal volume plus inspiratory reserve volume (IC = TV + IRV).",
        B: "\"The total amount of exchangeable air\" more closely describes vital capacity, the full range between maximal inspiration and maximal expiration, not inspiratory capacity, which starts only from the end of a normal tidal breath.",
        C: "Inspiratory capacity is not another name for functional residual capacity; the two are different capacities measured from opposite ends of a normal tidal breath (IC = TV + IRV; FRC = ERV + RV).",
        D: "Air inspired after a normal tidal inspiration, rather than after a tidal expiration, is not a named lung capacity in this scheme; inspiratory capacity is measured starting from the end of expiration, not from a point already at the top of a tidal breath.",
      },
    },
    {
      key: "total-lung-capacity-is-equal-to-2db2d4f5",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that total lung capacity equals residual volume plus vital capacity.",
      explanations: {
        A: "Vital capacity multiplied by tidal volume is not a meaningful physiological quantity and does not equal total lung capacity, which is a sum of volumes, not a product.",
        B: "Functional residual capacity plus expiratory reserve volume double-counts ERV (FRC already includes it, since FRC = ERV + RV) and omits inspiratory reserve volume and tidal volume entirely, so it cannot equal total lung capacity.",
        C: "Anatomical dead space plus alveolar dead space is the definition of physiologic dead space, an airway-conduction concept unrelated to total lung capacity, which is a sum of lung volumes.",
        D: "Correct. Total lung capacity is all the air the lungs can hold, and it equals residual volume plus vital capacity (TLC = RV + VC) — the one volume never expired (RV) added to the full range that can be (VC).",
      },
    },
    {
      key: "vital-capacity-includes-all-the-following-luag-volumes-excep-e6d312c5",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Recall of a false statement",
      learningObjective: "Identify residual volume as excluded from vital capacity, unlike IRV, TV and ERV.",
      explanations: {
        A: "Inspiratory reserve volume is one of the three volumes that make up vital capacity, so not the exception.",
        B: "Expiratory reserve volume is one of the three volumes that make up vital capacity, so not the exception.",
        C: "Tidal volume is one of the three volumes that make up vital capacity, so not the exception.",
        D: "The exception, and the answer. Vital capacity is the sum of inspiratory reserve volume, tidal volume and expiratory reserve volume (VC = IRV + TV + ERV); residual volume is specifically excluded, since it is the air that can never be exhaled and so cannot contribute to a volume defined by maximal exhalation.",
      },
    },
    {
      key: "vital-capacity-is-1f9c3d29",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "Define vital capacity and reject common false claims about sex- and pregnancy-related differences in it.",
      explanations: {
        A: "Correct. Vital capacity is the maximum volume of air that can be forcibly expired after a maximum inspiration — the full range of a lung's usable volume, excluding only the residual volume that can never be exhaled.",
        B: "Vital capacity is typically reduced, not increased, in pregnancy: the enlarging uterus elevates the diaphragm and reduces the space available for lung expansion.",
        C: "Total lung capacity minus tidal volume does not equal vital capacity; TLC minus residual volume equals vital capacity (TLC = VC + RV), a different subtraction.",
        D: "Vital capacity is generally lower in females than in males, reflecting smaller average body and lung size, not higher by 10% — this reverses the usual sex difference.",
      },
    },
    {
      key: "volume-of-air-inspired-above-tidal-volume-is-called-4a62b818",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Name inspiratory reserve volume as the extra air inspired above a normal tidal inspiration.",
      explanations: {
        A: "Residual volume is the air remaining after maximal expiration, unrelated to air inspired above tidal volume.",
        B: "Inspiratory capacity is tidal volume plus inspiratory reserve volume together (IC = TV + IRV), not the extra volume alone — the extra volume by itself is IRV, not IC.",
        C: "Total lung capacity is the sum of all four lung volumes, not specifically the air inspired above a tidal breath.",
        D: "Correct. The extra air that can be inspired above a normal tidal inspiration is the inspiratory reserve volume, by definition.",
      },
    },
    {
      key: "which-of-the-following-variables-must-be-known-to-calculate-fc4c8bf3",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Calculation",
      learningObjective: "State that IRV = VC - TV - ERV, so exactly tidal volume, vital capacity and expiratory reserve volume are needed to calculate it.",
      explanations: {
        A: "Tidal volume and expiratory reserve volume alone omit vital capacity, without which IRV cannot be isolated from the VC = IRV + TV + ERV relationship.",
        B: "Tidal volume and residual volume are not part of the vital-capacity relationship that IRV comes from (VC = IRV + TV + ERV); residual volume does not appear in that equation at all.",
        C: "Correct. Vital capacity equals inspiratory reserve volume plus tidal volume plus expiratory reserve volume (VC = IRV + TV + ERV), so rearranging gives IRV = VC - TV - ERV: exactly tidal volume, vital capacity and expiratory reserve volume, and no other variable, are needed.",
        D: "Tidal volume, vital capacity and residual volume includes a variable (RV) that IRV's formula does not use, while never substituting for the expiratory reserve volume the formula actually needs.",
      },
    },
    {
      key: "which-volume-or-capacity-remains-in-the-lungs-after-a-tidal-a2c3de77",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Identify functional residual capacity as what remains after a tidal volume is expired.",
      explanations: {
        A: "Vital capacity is the full range of air that can move in and out of the lungs, not the volume left after one tidal breath is expired.",
        B: "Expiratory reserve volume is only part of what remains after a tidal expiration; residual volume remains too, and together they make up functional residual capacity, the more complete answer.",
        C: "Residual volume is only part of what remains after a tidal expiration; expiratory reserve volume also remains, and together the two make up functional residual capacity.",
        D: "Correct. What remains in the lungs after a normal tidal volume is expired is the functional residual capacity — the combination of expiratory reserve volume and residual volume still present at the resting end-expiratory point.",
      },
    },
    {
      key: "which-volume-remains-in-the-lungs-after-a-tidal-volume-ty-is-3ab2bbec",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Identify functional residual capacity as what remains after a tidal volume is expired.",
      explanations: {
        A: "Correct. What remains in the lungs after a tidal volume is expired is the functional residual capacity — expiratory reserve volume plus residual volume together, the lung's resting end-expiratory volume.",
        B: "Vital capacity is the full range of air that can be moved in and out of the lungs, not the volume that remains after a single tidal breath is expired.",
        C: "Expiratory reserve volume alone is only part of what remains; residual volume also remains, and the two together are properly named functional residual capacity.",
        D: "Residual volume alone is only part of what remains; expiratory reserve volume also remains, and the two together are properly named functional residual capacity.",
      },
    },
    {
      key: "concerning-the-residual-volume-a-represents-more-than-30-of-b7834ad1",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank's own extraction already flags this row unkeyed and unrecoverable: the stem's embedded claims about residual volume (>30% of TLC; averaging 2200 mL) have no surviving option letters, options A and B are both garbled duplicate labels ('vital capacity (VC)') rather than distinct statements, option D is confidently false (RV is not the sum of tidal volume and expiratory reserve volume), and option C's claim ('aerates blood between breaths') more precisely describes functional residual capacity as a whole, not residual volume specifically — no confident single answer survives.",
    },
    {
      key: "all-of-the-following-increase-the-work-of-breathing-except-17128ff7",
      conceptKey: "work-of-breathing.elastic-vs-frictional-resistance",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify a normal amount of surfactant as reducing, not increasing, the work of breathing.",
      explanations: {
        A: "Bronchial asthma narrows the airways and raises frictional (airway) resistance, genuinely increasing the work of breathing — an obstructive cause, not the exception.",
        B: "Lung fibrosis stiffens the lung with excess fibrous tissue, lowering its compliance and raising elastic resistance — a restrictive cause of increased work of breathing, not the exception.",
        C: "The exception, and the answer. A normal amount of surfactant lowers alveolar surface tension, the larger share of the lung's elastic resistance, and so reduces — rather than increases — the work of breathing; only a surfactant deficiency, not a normal amount, raises it.",
        D: "Kyphoscoliosis deforms and stiffens the chest wall, raising the elastic resistance the respiratory muscles must overcome — a restrictive cause of increased work of breathing, not the exception.",
      },
    },
    {
      key: "in-a-normally-breathing-individual-maximum-amount-of-work-of-05c34262",
      conceptKey: "work-of-breathing.elastic-vs-frictional-resistance",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that elastic resistance is the largest component of the work of breathing in normal quiet breathing.",
      explanations: {
        A: "Correct. In a normally breathing individual, most of the work of breathing is spent stretching the lung and chest wall against their elastic resistance — chiefly the surface tension of the alveolar lining fluid — the largest of the three loads (elastic resistance, frictional/airway resistance, and inertia) during quiet breathing.",
        B: "Frictional (airway) resistance is a real component of the work of breathing, but in a normally breathing individual it is smaller than elastic resistance; it becomes the dominant load only once it is pathologically raised, as in airway obstruction.",
        C: "Inertia — resistance to acceleration of the moving gas and tissues — is the smallest of the three loads in normal breathing and is not the answer here.",
        D: "Muscle relaxants are not a component of the work of breathing at all; they are a pharmacological agent, not one of the physical loads the respiratory muscles work against.",
      },
    },
    {
      key: "in-an-asthmatic-patient-which-of-the-following-abnormalities-62396ded",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Identify a decreased FEV1/FVC ratio as the defining PFT abnormality of asthma.",
      explanations: {
        A: "Residual volume is increased, not decreased, in asthma: airway narrowing causes air trapping, leaving more air in the lungs after a maximal expiration than normal.",
        B: "Correct. Airway narrowing in asthma slows forced expiration disproportionately to any change in the total volume expired, so the FEV1/FVC ratio falls — the defining functional signature of an obstructive pattern.",
        C: "FVC (forced vital capacity) is typically reduced or unchanged in asthma, not increased; air trapping raises residual volume, which leaves less room for vital capacity, if anything.",
        D: "FEV1 (forced expiratory volume in one second) is decreased in asthma, not increased, precisely because the narrowed airways slow the rate of forced expiration.",
      },
    },
    {
      key: "in-emphysema-which-of-the-following-abnormalities-is-most-li-4f610452",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify increased total lung capacity as a hallmark finding of emphysema.",
      explanations: {
        A: "Functional residual capacity is increased in emphysema, not decreased: destroyed elastic fibres reduce lung recoil, so the lung comes to rest at a larger volume.",
        B: "Residual volume is increased, not decreased, in emphysema: loss of elastic recoil and airway collapse on forced expiration trap air, raising the volume left in the lungs after maximal expiration.",
        C: "The FEV1/FVC ratio is decreased, not increased, in emphysema — it is an obstructive disease, and airway narrowing/collapse slows forced expiration relative to the volume expired.",
        D: "Correct. Emphysema destroys alveolar walls and elastic fibres, reducing lung recoil so the lung is easier to inflate (increased compliance) and comes to rest, and can be inflated, to a larger volume — total lung capacity rises above normal, a hallmark of emphysema's hyperinflation.",
      },
    },
    {
      key: "in-obstructive-lung-disease-which-of-following-abnormalities-529e2575",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify increased residual volume as the classic obstructive-pattern finding.",
      explanations: {
        A: "FRC is increased, not decreased, in obstructive lung disease: airway narrowing and loss of recoil (in emphysema) or airway collapse on expiration (in asthma) trap air and raise the resting lung volume.",
        B: "TLC is preserved or increased in obstructive disease, not decreased — a decreased TLC is instead the hallmark of a restrictive pattern.",
        C: "The FEV1/FVC ratio is decreased in obstructive disease, not increased; a preserved or increased ratio is instead characteristic of a restrictive pattern, where the stiff lung still empties quickly relative to its reduced volume.",
        D: "Correct. Air trapping from airway narrowing, collapse on expiration or lost elastic recoil raises the volume of air remaining after maximal expiration — residual volume is increased, the classic obstructive-pattern finding.",
      },
    },
    {
      key: "which-of-the-following-is-a-characteristic-of-emphysema-but-6292d534",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Hard",
      questionType: "Comparison",
      learningObjective: "Identify abnormally high lung compliance as a feature specific to emphysema, not shared by pulmonary oedema.",
      explanations: {
        A: "Hypoxaemia can occur in both emphysema and pulmonary oedema (both impair gas exchange), so it does not distinguish emphysema specifically — the stem asks for a feature of emphysema that pulmonary oedema does not share.",
        B: "A diffusion barrier is created between the alveolar air and the blood — recovered here from this question's parallel clean occurrence (`which-of-the-following-is-a-characteristic-of-emphysema-but-be11426a`), this option's own text is OCR-garbled in this occurrence's source scan. A thickened diffusion barrier is the defining lesion of pulmonary oedema (fluid thickens the path gas must cross), not of emphysema, where alveolar walls are destroyed rather than thickened — so this favours oedema, not the answer for emphysema.",
        C: "Correct. Emphysema destroys alveolar walls and elastic fibres, so the lung loses recoil and becomes abnormally easy to inflate — an abnormally high compliance. Pulmonary oedema instead fills the interstitium and alveoli with fluid, which stiffens the lung and lowers compliance, the opposite change — so high compliance is specific to emphysema here.",
        D: "Airway resistance is not characteristically low in emphysema; loss of the radial traction elastic tissue normally provides on small airways tends to let them collapse and narrow on expiration, if anything raising resistance rather than lowering it.",
      },
    },
    {
      key: "which-of-the-following-is-a-characteristic-of-emphysema-but-be11426a",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Moderate",
      questionType: "Comparison",
      learningObjective: "Identify abnormally high lung compliance as a feature specific to emphysema, not shared by pulmonary oedema.",
      explanations: {
        A: "Hypoxaemia can occur in both emphysema and pulmonary oedema (both impair gas exchange), so it does not distinguish emphysema specifically — the stem asks for a feature of emphysema that pulmonary oedema does not share.",
        B: "A diffusion barrier created between the alveolar air and the blood is the defining lesion of pulmonary oedema (fluid thickens the path gas must cross), not of emphysema, where alveolar walls are destroyed rather than thickened — so this favours oedema, not the answer for emphysema.",
        C: "Correct. Emphysema destroys alveolar walls and elastic fibres, so the lung loses recoil and becomes abnormally easy to inflate — an abnormally high compliance. Pulmonary oedema instead fills the interstitium and alveoli with fluid, which stiffens the lung and lowers compliance, the opposite change — so high compliance is specific to emphysema here.",
        D: "Airway resistance is not characteristically low in emphysema; loss of the radial traction elastic tissue normally provides on small airways tends to let them collapse and narrow on expiration, if anything raising resistance rather than lowering it.",
      },
    },
    {
      key: "which-one-of-the-following-would-increase-in-obstructive-but-e520e873",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Hard",
      questionType: "Comparison",
      learningObjective: "Identify functional residual capacity as rising in obstructive disease while falling in restrictive disease.",
      explanations: {
        A: "Vital capacity falls in both obstructive and restrictive disease (from air trapping in the former, from a stiffened smaller lung in the latter), so it does not selectively rise in obstructive disease only.",
        B: "Maximum breathing capacity falls in obstructive disease, where airway narrowing limits how much air can be moved per minute — it does not rise.",
        C: "FEV1 falls in obstructive disease, since airway narrowing slows forced expiration — it does not rise.",
        D: "Correct. Functional residual capacity rises in obstructive disease, from air trapping (airway narrowing or collapse on expiration) or from lost elastic recoil in emphysema, while it falls in restrictive disease, where the lung and/or chest wall are stiffened and volumes shrink together — making FRC one of the few measurements that moves in opposite directions in the two patterns.",
      },
    },

    // --- run43: Lung Volumes and Capacities cluster (9 remaining -> 0) ---
    {
      key: "a-72-kg-woman-would-have-approximately-how-much-dead-space-i-055268e0",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 2 options (A 148 ml, C 280 ml) survived extraction, recovered externally against Dr. Shebl's solved book (pairsOk: 2) — below the platform's 4-to-5-option import contract; options B and D were never captured by any occurrence, the same class of exclusion as this module's other 2-surviving-option rows.",
    },
    {
      key: "how-do-you-calculate-how-much-inspired-air-actually-ventilat-91ab164f",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank's own credited answer (option C, \"Subtract the volume of dead space from the tidal volume and multiply it by the number of\") is truncated mid-sentence at extraction, and option B (\"Subtract both the dead space volume that was already in the lungs plus the dead space of the\") is truncated too; this source is not in the pagetext cache to render by eye. Per the law of priority, a truncated correct-answer option is never completed from what a textbook probably says — the same reasoning already applied to this cluster's sibling truncated-key exclusion in the Gas exchange in the lung leaf.",
    },
    {
      key: "the-residual-volume-37dc4b1c",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "State that residual volume cannot be measured directly by spirometry and is excluded from vital capacity.",
      explanations: {
        A: "Correct. Residual volume is the air remaining in the lungs after a maximal forced expiration, and because it can never be exhaled, a spirometer — which measures only volumes of air actually moved in and out — cannot record it directly; it must instead be inferred indirectly, for example by helium dilution, nitrogen washout or body plethysmography.",
        B: "Residual volume is specifically excluded from vital capacity: VC = IRV + TV + ERV deliberately leaves RV out, since RV is by definition the air that no maximal expiratory effort can remove.",
        C: "Residual volume is not part of expiratory reserve volume; the two are separate, non-overlapping volumes that together make up functional residual capacity (FRC = ERV + RV), with RV lying beyond the point ERV can reach.",
        D: "The lung's own elastic tissue always recoils inward, tending to collapse it, at every lung volume from TLC down to RV; residual volume is reached only because further expiration is limited by the chest wall's growing outward recoil and the limits of expiratory muscle strength, not because the lung itself starts recoiling outward.",
      },
    },
    {
      key: "tidal-volume-is-air-66461af4",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Define tidal volume as the air exchanged during normal quiet breathing.",
      explanations: {
        A: "Air remaining in the lungs after a forced expiration describes residual volume, not tidal volume — tidal volume is the air actually moved during a breath, not what is left behind afterward.",
        B: "Correct. Tidal volume is the volume of air moved into and out of the lungs during one normal, quiet breathing cycle — the air genuinely exchanged in ordinary resting breathing, before any reserve volume is called on.",
        C: "Air inhaled beyond a normal quiet inspiration describes inspiratory reserve volume, the extra volume available above tidal volume, not tidal volume itself.",
        D: "Air forcibly expelled after a normal expiration describes expiratory reserve volume, not tidal volume; tidal volume is exchanged passively during quiet breathing, not by an additional forced effort.",
      },
    },
    {
      key: "vital-capacity-e6eee7c9",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 2 options (A, B) survived extraction, keyed editorially with no printed key — below the platform's 4-to-5-option import contract, the same class of exclusion as this cluster's sibling 2-option row (a-72-kg-woman...), despite the bank's own editorial explanation (VC depends on lung/chest-wall compliance) being otherwise sound and consistent with this file's own restrictive-disease concept.",
    },
    {
      key: "vital-capacity-is-reduced-by-all-except-75ee187f",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify normal athletic training, rather than a restrictive process, as not reducing vital capacity.",
      explanations: {
        A: "Reduces vital capacity — not the exception. Lung fibrosis stiffens the lung, lowering its compliance, and this restrictive pattern reduces all lung volumes together, including vital capacity.",
        B: "Reduces vital capacity — not the exception. A deformed, stiffened chest wall lowers overall thoracic compliance by the same restrictive mechanism as lung fibrosis, shrinking vital capacity along with the other lung volumes.",
        C: "Correct. Athletes typically have a normal or even increased vital capacity, reflecting greater respiratory muscle strength and often larger lung and thoracic volumes from training, rather than any process that stiffens the lung or chest wall — the exception, and the answer.",
        D: "Reduces vital capacity — not the exception. Less surfactant raises alveolar surface tension, stiffening the lung and lowering its compliance, the same restrictive mechanism by which fibrosis and chest-wall deformity shrink vital capacity.",
      },
    },
    {
      key: "which-of-the-following-concerning-average-lung-volumes-and-c-ade8fafa",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Moderate",
      questionType: "Comparison",
      learningObjective: "Rank total lung capacity, vital capacity, functional residual capacity and tidal volume by typical resting size.",
      explanations: {
        A: "TLC > VC > TV > FRC is not correct: functional residual capacity (about 2300 mL, ERV + RV) is larger than tidal volume (about 500 mL) in a resting adult, so this ordering places FRC too low relative to TV.",
        B: "TLC > FRC > VC > TV is not correct: vital capacity (about 4600 mL) is larger than functional residual capacity (about 2300 mL) — VC sums IRV, TV and ERV, while FRC is only ERV + RV, so VC must exceed FRC, not the reverse.",
        C: "Correct. Using typical resting adult values, total lung capacity (about 6000 mL) exceeds vital capacity (about 4600 mL), which exceeds functional residual capacity (about 2300 mL), which exceeds tidal volume (about 500 mL): TLC > VC > FRC > TV.",
        D: "TLC > FRC > TV > VC reverses the relationship between vital capacity and both functional residual capacity and tidal volume: vital capacity (about 4600 mL) is by far the largest of the three, not the smallest.",
      },
    },
    {
      key: "which-one-of-the-following-components-of-a-pulmonary-functio-1aeacf86",
      conceptKey: "obstructive-vs-restrictive-lung-disease.pft-pattern-changes",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify a preserved or increased FEV1/FVC ratio as the defining PFT signature of restrictive lung disease.",
      explanations: {
        A: "FEV1 falls in restrictive lung disease, since the stiffened lung has an overall smaller volume to expire from in the first second, even though it empties that smaller volume quickly.",
        B: "FVC falls in restrictive lung disease: a stiffened lung or chest wall reduces all lung volumes together, including the maximum volume that can be forcibly exhaled.",
        C: "TLC falls in restrictive lung disease, since reduced compliance shrinks all the lung volumes and capacities that sum into it — unlike in obstructive disease, and especially emphysema, where TLC is preserved or increased.",
        D: "Correct. In restrictive lung disease the stiffened lung still empties quickly relative to its now-smaller volume, so the FEV1/FVC ratio is preserved or even increased, the opposite of obstructive disease, where airway narrowing lowers the ratio.",
      },
    },
    {
      key: "which-volume-remains-in-the-lungs-after-a-maximal-expiration-1d4cbfd2",
      conceptKey: "lung-volumes-and-capacities.definitions-and-relationships",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Identify residual volume as what remains in the lungs after a maximal forced expiration.",
      explanations: {
        A: "Tidal volume is the air moved during a normal quiet breath, not what remains after a maximal forced expiration.",
        B: "Vital capacity is the volume that CAN be expired by a maximal effort, not what is left behind afterward — the two describe opposite ends of the same manoeuvre.",
        C: "Expiratory reserve volume is the extra air that can still be forcibly expired beyond a normal tidal expiration; by definition it has already been expelled once expiration is maximal, so it is not what remains afterward.",
        D: "Correct. Residual volume is the air that remains in the lungs after even a maximal forced expiration — it can never be exhaled by any voluntary effort, which is also why it cannot be measured directly by spirometry.",
      },
    },
  ],
}
