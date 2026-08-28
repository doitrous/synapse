import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Respiratory System — Dead Space and Alveolar Ventilation",
  modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
  articleId: "ART-104-PHY-AIRWAY-ANATOMY-AND-DEAD-SPACE",

  concepts: [
    {
      key: "dead-space.conducting-airway-functions",
      label: "The anatomical dead space (conducting airways) warms and humidifies inspired air, filters particulate matter and bacteria from it, and conducts it to the respiratory membrane, but takes no part in warming already-warm expired air",
      definition: "The anatomical dead space is the volume of the conducting airways (from the nose down to the terminal bronchioles) that takes no part in gas exchange. Its functions all concern preparing inspired air on the way in: warming it to body temperature, saturating it with water vapour, filtering out bacteria and other particulate matter, and simply conducting the now-warmed, humidified, filtered air onward to the respiratory membrane where gas exchange happens. Expired air arrives at the conducting airways already at body temperature and already saturated from its time in the alveoli, so warming expired air is not one of the dead space's functions — there is nothing left for it to do on the way out that it has not already done on the way in.",
      objective: "List the functions of the anatomical dead space on inspired air (warming, humidifying, filtering, conducting) and state that warming expired air is not one of them, since expired air is already warm and saturated.",
      pitfall: "Assuming the conducting airways do the same conditioning work in both directions. Their warming and humidifying function only matters for air moving inward, since air moving outward from the alveoli is already at body temperature and already saturated with water vapour.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
      type: "definition",
      aliases: ["Functions of dead space", "Conducting airway functions"],
    },
    {
      key: "alveolar-ventilation.calculation-formula",
      label: "Alveolar ventilation, the air per minute actually reaching gas-exchanging surfaces, equals (tidal volume minus dead space volume) times respiratory rate, unlike minute ventilation, which uses tidal volume alone",
      definition: "Of each breath's tidal volume, only the portion beyond the anatomical dead space reaches alveoli that can exchange gas; the dead space's own share is rebreathed without ever taking part in exchange. Alveolar ventilation per minute is therefore (tidal volume - dead space volume) x respiratory rate, not tidal volume x respiratory rate (which instead gives total minute ventilation, an overestimate of what is actually available for gas exchange). A change in breathing pattern that keeps minute ventilation constant can still change alveolar ventilation substantially, because the dead space's volume does not scale down with a smaller tidal volume — rapid, shallow breathing wastes a larger fraction of each breath on dead space and so lowers alveolar ventilation even at an unchanged minute ventilation.",
      objective: "State and apply the formula alveolar ventilation = (tidal volume - dead space volume) x respiratory rate, distinguishing it from minute ventilation (tidal volume x respiratory rate).",
      pitfall: "Multiplying tidal volume directly by respiratory rate and calling the result alveolar ventilation. That calculation gives minute ventilation; dead space volume must be subtracted from tidal volume first to isolate the portion that actually reaches gas-exchanging alveoli.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
      type: "mechanism",
      aliases: ["Alveolar ventilation formula", "VA = (TV - VD) x RR"],
    },
  ],

  questions: [
    {
      key: "one-of-the-following-is-not-a-function-of-dead-space-1f2a2109",
      conceptKey: "dead-space.conducting-airway-functions",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify warming expired air as not a function of the anatomical dead space, unlike humidifying inspired air, filtering it and conducting it to the respiratory membrane.",
      explanations: {
        A: "The exception, and the answer: expired air arrives at the conducting airways already at body temperature from its time in the alveoli, so warming it is not something the dead space does — its warming function applies only to inspired air on the way in.",
        B: "Saturating inspired air with water vapour is a genuine function of the dead space, so not the exception.",
        C: "Removing bacteria and other particulate matter from inspired air is a genuine function of the dead space, so not the exception.",
        D: "Conducting the warmed, humidified, filtered air on to the respiratory membrane is a genuine function of the dead space, so not the exception.",
      },
    },
    {
      key: "a-25-year-old-min-is-under-water-in-the-swimming-pool-and-br-7c09a85e",
      conceptKey: "alveolar-ventilation.calculation-formula",
      difficulty: "Moderate",
      questionType: "Calculation",
      learningObjective: "Calculate alveolar ventilation as (tidal volume - dead space volume) x respiratory rate.",
      explanations: {
        A: "2500 ml/min would follow from (550 - 250) x [a rate below 10]/min; at the stated rate of 10 breaths/min the correct product is 3000 ml/min, not 2500.",
        B: "Correct: alveolar ventilation = (tidal volume - dead space volume) x respiratory rate = (550 - 250) x 10 = 300 x 10 = 3000 ml/min.",
        C: "3500 ml/min overstates the result; with tidal volume 550 ml and dead space 250 ml, the effective volume per breath is 300 ml, not enough to reach 3500 ml/min at a rate of 10/min.",
        D: "4000 ml/min would only follow from using the full tidal volume (550 ml) without subtracting the dead space at all (550 x [a rate below 10]), which is minute ventilation reasoning, not alveolar ventilation.",
      },
    },
    {
      key: "a-patient-has-a-dead-space-volume-of-130-ml-a-respiratory-ra-f754de6b",
      conceptKey: "alveolar-ventilation.calculation-formula",
      difficulty: "Moderate",
      questionType: "Calculation",
      learningObjective: "Calculate alveolar ventilation as (tidal volume - dead space volume) x respiratory rate.",
      explanations: {
        A: "8050 ml/min does not follow from these figures by the alveolar ventilation formula; the correct effective volume per breath (460 - 130 = 330 ml) times the stated rate of 15/min gives 4950 ml/min.",
        B: "6900 ml/min is what tidal volume alone, without subtracting dead space, gives at this rate (460 x 15 = 6900) — that is minute ventilation, not alveolar ventilation.",
        C: "4620 ml/min does not match (tidal volume - dead space) x respiratory rate at the stated figures; the correct product of 330 ml x 15/min is 4950 ml/min.",
        D: "Correct: alveolar ventilation = (tidal volume - dead space volume) x respiratory rate = (460 - 130) x 15 = 330 x 15 = 4950 ml/min.",
      },
    },
    {
      key: "a-person-with-a-ventilation-perfusion-v-q-defect-has-hypoxem-1492d57e",
      conceptKey: "alveolar-ventilation.calculation-formula",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option A's text is an OCR merge of what should be two separate choices ('dead space' and 'shunt' run together with garbled characters between them), collapsing 4 intended options (dead space, shunt, low V/Q, V/Q=0) into only 3 selectable slots — below the platform's 4-to-5-option import contract.",
    },
  ],
}
