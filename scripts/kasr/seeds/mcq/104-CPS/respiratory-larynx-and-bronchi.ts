import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Respiratory System — Larynx and Airway Wall",
  modulePath: "104 CPS > Histology > Respiratory System > Conducting Portion",
  articleId: "ART-104-HIS-LARYNX-TRACHEA-BRONCHI",

  concepts: [
    {
      key: "larynx.vocal-cords-and-cartilages",
      label: "The larynx is mostly respiratory epithelium over hyaline and elastic cartilages, except at the true vocal cords",
      definition: "The larynx connects the pharynx with the trachea. It is lined with respiratory epithelium, except over the true vocal cords and the lingual surface of the epiglottis, which are covered by stratified squamous epithelium; its connective-tissue lamina propria contains the laryngeal cartilages. The large cartilages — thyroid, cricoid and most of the arytenoids — are hyaline and may calcify with age; the small cartilages — epiglottis, cuneiform, corniculate and the tip of the arytenoids — are elastic and do not calcify. Two pairs of folds extend into the laryngeal lumen. The upper pair, the false vocal cords (vestibular folds), are lined by respiratory epithelium and prevent food and fluid from entering the larynx. The lower pair, the true vocal cords, are lined by non-keratinized stratified squamous epithelium and produce voice. Overall the larynx produces voice through the true vocal cords, maintains an open airway through its cartilages, and, through the epiglottis and false vocal cords, prevents food and fluid from entering the respiratory passages.",
      objective: "State which parts of the larynx are lined by stratified squamous rather than respiratory epithelium, and contrast the false and true vocal cords by lining and function.",
      pitfall: "Assuming the whole larynx is lined the same way because 'respiratory epithelium' is stated first. The true vocal cords and the lingual epiglottis are the two named exceptions, and it is exactly those two mechanically abraded surfaces that switch to a tougher, non-keratinized stratified squamous lining.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Conducting Portion",
      type: "structural_description",
      aliases: ["True and false vocal cords", "Laryngeal cartilages", "Vestibular folds"],
    },
    {
      key: "conducting-portion.airway-wall-components-and-functions",
      label: "The conducting portion's wall pairs cartilage and collagen to prevent airway collapse with elastic fibres and smooth muscle for the airway's flexibility and extensibility",
      definition: "The conducting portion of the respiratory system conducts and conditions inspired air. Conduction relies on two paired components of the airway wall: cartilage and collagen fibres, which prevent the airway from collapsing and so ensure a continuous supply of air; and elastic fibres and smooth muscle, which give the airway the flexibility and extensibility it needs as it conducts that air. Conditioning (cleaning, moistening and warming the inspired air) is carried out separately, by the respiratory epithelium (pseudostratified columnar ciliated with goblet cells) and by the vascular network, mucous glands and serous glands of the connective tissue beneath it.",
      objective: "Pair the conducting portion's structural components with their function: cartilage and collagen against collapse, elastic fibres and smooth muscle for flexibility and extensibility, epithelium and glands for conditioning the air.",
      pitfall: "Swapping the two pairings — crediting cartilage with flexibility or elastic fibre/smooth muscle with preventing collapse. The book pairs them the other way: the rigid components (cartilage, collagen) resist collapse, and the compliant components (elastic fibre, smooth muscle) supply flexibility and extensibility.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: [],
      modulePath: "104 CPS > Histology > Respiratory System > Conducting Portion",
      type: "structure_function_relationship",
      aliases: ["Conducting portion wall structure", "Airway wall components"],
    },
  ],

  questions: [
    {
      key: "cartilage-in-epiglottis-cuneiform-corniculate-is-ee6e989d",
      conceptKey: "larynx.vocal-cords-and-cartilages",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Classify the epiglottis, cuneiform and corniculate cartilages, and the tip of the arytenoids, as the larynx's small elastic cartilages, against the large hyaline ones.",
      explanations: {
        A: "Hyaline cartilage is what the book names for the larynx's large cartilages — thyroid, cricoid, and most of the arytenoids — not this list of small ones.",
        B: "Correct. The book classes the epiglottis, cuneiform, corniculate and the tip of the arytenoid cartilages as the larynx's small cartilages, and states they are elastic cartilage. A common trap: assuming the whole larynx is lined the same way because 'respiratory epithelium' is stated first.",
        C: "White fibrocartilage is not a category the book applies to any of the laryngeal cartilages.",
        D: "Not applicable — a correct single answer is listed among the options.",
      },
    },
    {
      key: "for-flexibility-extensibility-during-conduction-of-air-c29fe2d7",
      conceptKey: "conducting-portion.airway-wall-components-and-functions",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Pair elastic fibres and smooth muscle with the conducting airway's flexibility and extensibility, distinct from cartilage's role against collapse.",
      explanations: {
        A: "Cartilage and collagen fibres are what the book credits with preventing collapse, not with flexibility and extensibility.",
        B: "Collagen fibres sit with cartilage in the book's 'prevent collapse' pairing, and elastic fibre alone is not the full pairing the book gives for flexibility.",
        C: "Cartilage again belongs to the collapse-prevention pairing; collagen fibre alone is not the book's stated pairing for flexibility and extensibility either.",
        D: "Correct. The book pairs elastic fibres and smooth muscle with the airway's flexibility and extensibility during air conduction, as distinct from cartilage and collagen, which prevent collapse. A common trap: swapping the two pairings — crediting cartilage with flexibility or elastic fibre/smooth muscle with preventing collapse.",
      },
    },
    {
      key: "large-laryngeal-cartilage-is-characterized-by-all-except-0455c101",
      conceptKey: "larynx.vocal-cords-and-cartilages",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the larynx's large cartilages are hyaline and may calcify with age, unlike the small elastic ones, which do not calcify.",
      explanations: {
        A: "True of the large laryngeal cartilages (thyroid, cricoid, most of the arytenoids), so not the exception — the book classes them as hyaline cartilage.",
        B: "True, so not the exception. The book states the large laryngeal cartilages may calcify with age.",
        C: "The exception, and the answer. Not undergoing calcification is what the book states of the larynx's small cartilages (epiglottis, cuneiform, corniculate, arytenoid tips), which are elastic — the opposite is true of the large hyaline ones this question asks about. A common trap: assuming the whole larynx is lined the same way because 'respiratory epithelium' is stated first.",
        D: "Not applicable — the true exception is named among the other options.",
      },
    },
    {
      key: "prevent-collapse-ensure-continuous-supply-of-air-d7f3beea",
      conceptKey: "conducting-portion.airway-wall-components-and-functions",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Pair cartilage and collagen fibres with preventing airway collapse, distinct from elastic fibre and smooth muscle's flexibility role.",
      explanations: {
        A: "Cartilage is correctly half of this pairing, but elastic fibre belongs to the book's other pairing (flexibility and extensibility), not to preventing collapse.",
        B: "Collagen fibre is correctly one component the book pairs with cartilage for this function, but elastic fibre is not its partner here either.",
        C: "Correct. The book pairs cartilage and collagen fibres as what prevent airway collapse and ensure a continuous supply of air. A common trap: swapping the two pairings — crediting cartilage with flexibility or elastic fibre/smooth muscle with preventing collapse.",
        D: "Elastic fibre and smooth muscle are the book's pairing for flexibility and extensibility, a separate function from preventing collapse.",
      },
    },
  ],
}
