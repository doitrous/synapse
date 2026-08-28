import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Respiratory System — Non-Chemical Control of Respiration",
  modulePath: "104 CPS > Physiology > Respiratory System > Control of Respiration",
  articleId: "ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS",

  concepts: [
    {
      key: "non-chemical-nervous-regulation-of-respiration.afferent-sources",
      label: "Non-chemical (nervous) regulation of respiration works through reflex afferents from higher centres, the upper airway, the lungs, the chest wall, proprioceptors and the cardiovascular system, distinct from the chemical (PCO2/pH/PO2) drive",
      definition: "Alongside the chemical control of breathing by PCO2, pH and PO2, the respiratory centre is regulated by nervous reflexes that are independent of blood gases. Afferents from higher centres carry voluntary control from the cerebral cortex (talking, singing, voluntary apnoea/breath-holding, ended by the 'break point' when rising PCO2 and falling PO2 become overwhelming), pain and emotion from the limbic system, and temperature from the hypothalamus. Afferents from upper airway receptors give the coughing reflex (irritant receptors in trachea/larynx/bronchi, vagal afferents, forced expiration against a closed then suddenly opened glottis) and the sneezing reflex (irritant receptors in nasal mucosa, trigeminal afferents, glottis stays open). Afferents from lung receptors give the Hering-Breuer stretch reflex and the lung irritant reflex (coughing, bronchospasm). Afferents from chest wall muscle spindles set tidal volume; afferents from proprioceptors drive the ventilation rise of exercise. Afferents from the cardiovascular system carry the arterial baroreceptor reflex (a rise in arterial pressure inhibits the respiratory centre) and the atrial stretch-receptor reflex (a rise in venous return stimulates it, Harrison's reflex). Visceral reflexes give swallowing apnoea and hiccup.",
      objective: "List the non-chemical (nervous) sources of respiratory drive by their afferent pathway — higher centres, upper airway, lung, chest wall, proprioceptors, cardiovascular system, visceral reflexes — and distinguish each from the chemical (PCO2/pH/PO2) control of breathing.",
      pitfall: "Treating hypercapnia (a rise in arterial PCO2) as one item on the non-chemical list. PCO2 is the major controller of respiration through central and peripheral chemoreceptors — the chemical route — and it sits in a separate section from 'Non-Chemical (Nervous) Regulation of Respiratory Activity'. Coughing, swallowing and pain, by contrast, are genuinely nervous reflexes filed under the non-chemical heading.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Control of Respiration",
      type: "mechanism",
      aliases: ["Nervous regulation of respiration", "Non-chemical control of breathing"],
    },
  ],

  questions: [
    {
      key: "non-chemical-influence-on-respiration-includes-all-of-the-fo-3dfb369c",
      conceptKey: "non-chemical-nervous-regulation-of-respiration.afferent-sources",
      difficulty: "Moderate",
      questionType: "Classification",
      learningObjective: "Separate the chemical (PCO2) drive to breathe from the nervous, non-chemical afferents that also regulate the respiratory centre.",
      explanations: {
        A: "A genuine non-chemical influence. The 'Afferents from Higher Centers' pathway carries pain and emotional stimuli by the limbic system and temperature by the hypothalamus into the respiratory centre — both nervous routes, not chemical ones.",
        B: "A genuine non-chemical influence. Swallowing is one of the visceral reflexes: mechanoreceptors in the pharynx send a glossopharyngeal afferent that inhibits respiration (swallowing apnoea) to keep food out of the airway.",
        C: "A genuine non-chemical influence, not the exception. Coughing is the first example under 'Afferents from Upper Airway Receptors' — irritant receptors in the trachea, larynx and bronchi, carried by the vagus, producing deep inspiration then forced expiration against a glottis that opens suddenly.",
        D: "The exception, and the answer. A rise in arterial PCO2 (hypercapnia) belongs under chemical control of respiration, not under 'Non-Chemical (Nervous) Regulation' — PCO2 is stated as the major controller of ventilation acting through central and peripheral chemoreceptors, the one route on this list that is not a nervous reflex. A common trap: treating hypercapnia (a rise in arterial PCO2) as one item on the non-chemical list.",
      },
      answerOverride: "D",
      answerOverrideReason: "The chapter structure contradicts the printed key. 'Non-Chemical (Nervous) Regulation of Respiratory Activity' (physiology department book p149-153) explicitly lists pain/limbic afferents, coughing and swallowing as nervous reflex sources of respiratory drive. Hypercapnia (raised PCO2) sits in a separate, earlier section, 'Ventilatory Response to Changes in CO2' (p148-149), stated as the major controller of respiration through chemoreceptors — the chemical route the non-chemical section is being contrasted against. It is therefore the one option that is not a non-chemical influence, not option C.",
    },
  ],
}
