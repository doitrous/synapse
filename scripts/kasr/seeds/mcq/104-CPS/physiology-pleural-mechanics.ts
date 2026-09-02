import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Thoracic Cavity — Pneumothorax and Inspiration Mechanics",
  modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
  articleId: "ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT",

  concepts: [
    {
      key: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      label: "The lung recoils inward from its elastic tissue and alveolar surface tension; the chest wall springs outward from its own elasticity, and these two opposing pulls keep intrapleural pressure negative",
      definition: "The lung's inward recoil has two sources: its collagen and elastin fibres, which account for about one third, and the surface tension of the fluid lining the alveoli, which accounts for about two thirds. The chest wall's outward tendency comes from the elasticity of its muscles, tendons and ligaments. Each has a relaxation volume of its own, about 1 litre for the lungs and 5 litres for the thorax, and at the end of a quiet expiration their combined volume is about 2.3 litres — so the lungs are partially stretched and pulling in while the thorax is partially compressed and pushing out. These two opposing pulls are what keep intrapleural pressure negative. Opening the pleural space (pneumothorax) lets each structure spring to its own relaxation volume: the lung collapses towards 1 litre while the chest wall on the affected side springs outward towards 5 litres, and the intrapleural pressure's normal negativity is lost as the space equalises with atmospheric pressure.",
      objective: "Give the causes of the lung's recoil tendency and the chest wall's expansion tendency, and predict what happens to each, and to intrapleural pressure, when the pleural space is opened.",
      pitfall: "Giving elastic tissue alone as the cause of lung recoil — surface tension is the larger of the two contributions, which is why surfactant matters so much to the work of breathing; and assuming pneumothorax makes the affected side of the chest look smaller, when the chest wall's own outward spring in fact makes it look larger.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: ["SYS-RES-T01-S02-M01"],
      modulePath: "104 CPS > Physiology > Respiratory System > Organization of the Respiratory System",
      type: "mechanism",
      aliases: ["Lung recoil and chest wall expansion", "Pneumothorax mechanism"],
    },
  ],

  questions: [
    {
      key: "inspiration-occurs-when-1-b7f33c4b",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that inspiration requires atmospheric pressure to exceed intra-alveolar pressure, driving air down its pressure gradient into the lung.",
      explanations: {
        A: "This is the correct answer. Air flows down a pressure gradient, so inspiration occurs when the diaphragm and external intercostals expand the thoracic cavity, lowering intra-alveolar pressure below atmospheric pressure — with atmospheric pressure now the higher of the two, air is driven into the alveoli until the pressures equalise.",
        B: "When atmospheric and intra-alveolar pressure are equal there is no pressure gradient to drive airflow in either direction — this describes a momentary pause between phases of breathing, not active inspiration.",
        C: "If intra-alveolar pressure exceeded atmospheric pressure, air would flow out of the lung down that gradient — this is the condition for expiration, the reverse of what this question asks about.",
        D: "Intrapleural pressure exceeding intra-alveolar pressure is not the physiological relationship that drives airflow — intrapleural pressure is normally the more negative of the two throughout the breathing cycle, and it is the alveolar-to-atmospheric gradient, not this one, that moves air.",
      },
    },
    {
      key: "inspiration-occurs-when-74707d57",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that inspiration requires atmospheric pressure to exceed intra-alveolar pressure, driving air down its pressure gradient into the lung.",
      explanations: {
        A: "This is the correct answer. Air flows down a pressure gradient, so inspiration occurs when the diaphragm and external intercostals expand the thoracic cavity, lowering intra-alveolar pressure below atmospheric pressure — with atmospheric pressure now the higher of the two, air is driven into the alveoli until the pressures equalise.",
        B: "When atmospheric and intra-alveolar pressure are equal there is no pressure gradient to drive airflow in either direction — this describes a momentary pause between phases of breathing, not active inspiration.",
        C: "If intra-alveolar pressure exceeded atmospheric pressure, air would flow out of the lung down that gradient — this is the condition for expiration, the reverse of what this question asks about.",
        D: "Intrapleural pressure exceeding intra-alveolar pressure is not the physiological relationship that drives airflow — intrapleural pressure is normally the more negative of the two throughout the breathing cycle, and it is the alveolar-to-atmospheric gradient, not this one, that moves air.",
      },
    },
    {
      key: "effects-of-unilateral-pneumothorax-include-aa6dfa35",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Predict that the chest wall on the affected side expands outward when a unilateral pneumothorax releases it from the lung's inward pull.",
      explanations: {
        A: "Unilateral pneumothorax collapses the lung on the SAME (affected) side, released from the opposing chest wall to reach its own smaller relaxation volume of about 1 litre — it does not collapse the opposite lung, which remains in its own separate pleural space.",
        B: "Lymph flow is not the effect this mechanism produces — the defining consequence of opening the pleural space is that the lung and chest wall each spring to their own relaxation volume, not a change in lymphatic drainage.",
        C: "This is the correct answer. Once the pleural space is opened, the chest wall on the affected side is released from the lung's inward pull and springs outward towards its own relaxation volume of about 5 litres, which is exactly why the affected side of the chest looks larger, not smaller.",
        D: "Venous return is more directly affected by intrathoracic pressure changes with breathing generally, but the defining, directly observable effect of a unilateral pneumothorax that this question targets is the ipsilateral chest wall's outward expansion, not a change in venous return.",
      },
    },
    {
      key: "in-pneumothorax-the-following-occurs-c7cba9bf",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that pneumothorax abolishes the normal negativity of intrapleural pressure on the affected side.",
      explanations: {
        A: "Pneumothorax does not increase venous and lymph return — opening the pleural space to atmospheric pressure removes the normal negative intrapleural pressure that assists venous filling, if anything working against, not for, venous return.",
        B: "This is the correct answer. Once air enters the pleural space, it is no longer sealed, and the normal negative intrapleural pressure on the affected side is lost as the space equalises with atmospheric pressure.",
        C: "The lung on the affected side collapses in pneumothorax, released from the chest wall's outward pull towards its own smaller relaxation volume — it does not expand.",
        D: "Since venous/lymph return is not increased and the lung does not expand, \"all of the above\" cannot be correct — only the loss of negative intrapleural pressure on the affected side is an accurate effect of pneumothorax.",
      },
    },
    {
      key: "during-quiet-inspiration-169438d8",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "State that the volume of the chest increases during quiet inspiration, which is what drives the fall in intra-alveolar pressure that pulls air in.",
      explanations: {
        A: "Correct: during quiet inspiration the diaphragm and external intercostals expand the thoracic cavity, increasing chest volume — this is the mechanical event that lowers intra-alveolar pressure below atmospheric and drives air in.",
        B: "Intrapleural pressure becomes more negative, not less negative, during inspiration, as the expanding chest pulls further on the pleural space.",
        C: "Intra-alveolar pressure falls below, not rises above, atmospheric pressure during inspiration — that fall is exactly what drives air into the lung.",
        D: "The abdominal muscles are accessory expiratory muscles; they do not contract during quiet inspiration, which relies on the diaphragm and external intercostals.",
      },
    },
    // run41 — bank-tagged "Mechanics of Breathing", a leaf-mismatch reroute
    // onto this file's own already-claimed lung-recoil/chest-wall concept:
    // the pneumothorax mechanism (lung collapses towards its own smaller
    // relaxation volume, chest wall springs outward towards its own
    // larger one) is exactly what effects-of-unilateral-pneumothorax-
    // include-aa6dfa35 (kept above) already teaches; this is the same
    // fact from a different bank source book, a duplicate occurrence.
    {
      key: "the-most-likely-response-in-a-patient-with-pneumothorax-upon-4477f37f",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Predict that opening the pleural space collapses the lung inward while the chest wall on that side springs outward, once each is released from the other's opposing pull.",
      explanations: {
        A: "The chest wall does not collapse inward — released from the lung's inward pull once the pleural space is opened, it springs OUTWARD towards its own larger relaxation volume of about 5 litres, which is why the affected side of the chest looks larger, not smaller.",
        B: "This is the correct answer. Air entering the pleural space lets the lung and chest wall each spring to their own separate relaxation volume: the lung, no longer held stretched by the chest wall's outward pull, collapses inward towards about 1 litre, while the chest wall, no longer held compressed by the lung's inward pull, springs outward towards about 5 litres.",
        C: "The lungs do not expand outward in pneumothorax — released from the chest wall's outward pull, the lung's own elastic and surface-tension recoil collapses it inward, the opposite of expansion.",
        D: "Neither structure expands outward together: the lung collapses inward while only the chest wall springs outward — the two move in OPPOSITE directions once the pleural space no longer couples them, not the same direction.",
      },
    },
    // run41 — bank-tagged "Mechanics of Breathing", a leaf-mismatch reroute
    // onto the same concept: functional residual capacity is precisely the
    // volume at which the lung's inward recoil and the chest wall's
    // outward recoil balance with no respiratory muscle active — the
    // concept's own definition already states this equilibrium volume
    // (about 2.3 L) at the end of a quiet, muscle-relaxed expiration.
    {
      key: "when-the-respiratory-muscles-are-relaxed-the-lungs-are-at-f4ccf2fa",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "State that functional residual capacity is the lung volume at which the inward pull of lung recoil and the outward pull of the chest wall balance with no respiratory muscle contracting.",
      explanations: {
        A: "Residual volume is the air left after a MAXIMAL forced expiration, driven by active expiratory muscle contraction — not the passive, muscles-relaxed equilibrium volume this question asks about.",
        B: "Expiratory reserve volume is the extra air that CAN be actively exhaled below a normal tidal expiration — it describes a capacity for further active exhalation, not the resting volume reached when the muscles are relaxed.",
        C: "This is the correct answer. With every respiratory muscle relaxed, the lung's own inward elastic and surface-tension recoil and the chest wall's own outward elastic recoil pull against each other until they balance — that equilibrium volume, reached passively at the end of a normal quiet expiration, is the functional residual capacity.",
        D: "Inspiratory reserve volume is the extra air that CAN be actively inhaled above a normal tidal inspiration, requiring further muscle contraction — the opposite of the muscles-relaxed resting state this question describes.",
      },
    },
    // run41 — bank-tagged "Mechanics of Breathing", a leaf-mismatch reroute
    // onto the same concept: passive quiet expiration is driven by exactly
    // the two recoil sources (elastic tissue and alveolar surface tension)
    // the concept's own definition already names as the causes of the
    // lung's inward pull.
    {
      key: "in-quiet-breathing-expiration-is-e59e87c7",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that quiet expiration is passive, driven by the lung's own elastic-tissue and alveolar-surface-tension recoil once the inspiratory muscles relax, not by active muscle contraction.",
      explanations: {
        A: "Elastic tissue alone understates the lung's recoil: alveolar surface tension is the LARGER of its two sources (about two-thirds of the total), so leaving it out of the passive-recoil answer misses most of the driving force.",
        B: "This is the correct answer. Once the inspiratory muscles relax at the end of inspiration, the lung's own inward recoil — from its elastic tissue (about one third) and, more, from alveolar surface tension (about two thirds) — passively drives the air back out with no active muscle contraction needed for quiet breathing.",
        C: "The internal intercostals are accessory EXPIRATORY muscles recruited only for forced (active) expiration; they do not contract during ordinary quiet breathing, which is passive.",
        D: "The diaphragm is an inspiratory muscle; it relaxes, rather than contracts, once inspiration ends, which is exactly why quiet expiration is passive rather than driven by further diaphragmatic contraction.",
      },
    },
    // run41 — bank-tagged "Mechanics of Breathing", two duplicate-occurrence
    // rows of the same basic inspiration mechanism (lung volume rises,
    // intrapleural pressure becomes more negative) this file's own
    // during-quiet-inspiration-169438d8 question already tests, with a
    // different distractor set (a false air-pressure-equality option, a
    // false lung-volume-decrease option).
    {
      key: "inspiration-50a94c7d",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "State that inspiration is accomplished by increasing lung volume, not by any change that leaves intrapulmonary pressure equal to atmospheric or decreases lung volume.",
      explanations: {
        A: "This is the correct answer. Inspiration is accomplished by the diaphragm and external intercostals expanding the thoracic cavity, which increases lung volume — that volume increase is the mechanical event that lowers intra-alveolar pressure and draws air in.",
        B: "Air pressure in the lungs equalling atmospheric pressure describes the brief pause between breaths, with no pressure gradient to drive airflow — not active inspiration, during which alveolar pressure is instead driven below atmospheric.",
        C: "Intrapleural pressure becomes MORE negative, not increased in the sense of less negative, during inspiration, as the expanding chest pulls further on the pleural space.",
        D: "Lung volume increases, not decreases, during inspiration — a decrease in lung volume is what happens during expiration, the opposite phase.",
      },
    },
    {
      key: "inspiration-i-1730519e",
      conceptKey: "respiratory-mechanics.causes-of-lung-recoil-and-chest-wall-expansion",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "State that inspiration is accomplished by increasing lung volume, not by any change that leaves intrapulmonary pressure equal to atmospheric or decreases lung volume.",
      explanations: {
        A: "This is the correct answer. Inspiration is accomplished by the diaphragm and external intercostals expanding the thoracic cavity, which increases lung volume — that volume increase is the mechanical event that lowers intra-alveolar pressure and draws air in.",
        B: "Air pressure in the lungs equalling atmospheric pressure describes the brief pause between breaths, with no pressure gradient to drive airflow — not active inspiration, during which alveolar pressure is instead driven below atmospheric.",
        C: "Intrapleural pressure becomes MORE negative, not increased in the sense of less negative, during inspiration, as the expanding chest pulls further on the pleural space.",
        D: "Lung volume increases, not decreases, during inspiration — a decrease in lung volume is what happens during expiration, the opposite phase.",
      },
    },
  ],
}
