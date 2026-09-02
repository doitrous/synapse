import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Thoracic Cavity — Pleura",
  modulePath: "104 CPS > Anatomy > Thoracic Cavity",
  articleId: "ART-104-ANA-PLEURA-STRUCTURE-AND-SURFACE-ANATOMY",

  concepts: [
    {
      key: "pleura.divisions-and-recesses",
      label: "Each pleural sac has a visceral layer adherent to the lung and a parietal layer lining the thoracic wall, mediastinum and diaphragm, separated by a thin-fluid-filled cavity",
      definition: "Each pleural sac is a closed serous sac invaginated from its medial side by the lung, forming a visceral layer adherent to the lung and a parietal layer, with the pleural cavity between them holding only a thin film of fluid. The parietal pleura is subdivided by the wall it lines: cervical pleura over the lung apex, costal pleura against the ribs and intercostal spaces, mediastinal pleura against the sides of the mediastinum — which encloses the root of the lung and continues below it as the pulmonary ligament, a loose fold that gives the pulmonary veins room to distend — and diaphragmatic pleura over the diaphragm. Two recesses in each sac are not occupied by lung except in forced inspiration: the costomediastinal recess, between costal and mediastinal pleura behind the sternum, and the costodiaphragmatic recess, between costal and diaphragmatic pleura at the outlet of the thorax.",
      objective: "Name the four regions of the parietal pleura and the two pleural recesses, and state the function of the pulmonary ligament.",
      pitfall: "Saying the visceral pleura lines the thoracic cavity — it is the parietal pleura that lines the thoracic wall; the visceral pleura instead adheres directly to the lung itself.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-RES-T01-S01-M03"],
      modulePath: "104 CPS > Anatomy > Thoracic Cavity",
      type: "structural_description",
      aliases: ["Pleural layers", "Pleural recesses", "Pulmonary ligament"],
    },
    {
      key: "pleura.surface-anatomy",
      label: "The pleura's inferior border crosses the eighth rib in the midclavicular line and the tenth rib in the midaxillary line, about two ribs lower than the lung's own border at each landmark",
      definition: "The cervical pleura is represented by a curved line, convex upwards, from the junction of the medial and middle thirds of the clavicle to the sternoclavicular joint, its highest point about 3 cm above the medial third of the clavicle. The anterior border descends from the sternoclavicular joint to the sternal angle identically on both sides; below that, the right border continues vertically to the xiphisternal junction while the left deviates laterally at the fourth costal cartilage to leave room for the heart before rejoining the sternal margin at the sixth cartilage. The inferior border runs obliquely backwards, crossing the eighth rib in the midclavicular line, the tenth in the midaxillary line and the twelfth spine posteriorly, and the posterior border ascends vertically alongside the vertebral column from the twelfth to the first thoracic spine.",
      objective: "Reproduce the surface markings of the four borders of the pleura, including where the right and left anterior borders diverge.",
      pitfall: "Mixing up which rib the inferior border crosses at which line — it is the eighth rib in the midclavicular line but the tenth rib in the midaxillary line, about two ribs lower than the lung's own border at each landmark, the gap the costodiaphragmatic recess occupies.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Thoracic Cavity",
      type: "structural_description",
      aliases: ["Pleural surface markings", "Pleural borders"],
    },
  ],

  questions: [
    {
      key: "all-characters-of-pleura-except-64c37eaa",
      conceptKey: "pleura.divisions-and-recesses",
      difficulty: "Easy",
      questionType: "Recall of a false statement",
      learningObjective: "State that the visceral pleura adheres to the lung, not the thoracic wall.",
      explanations: {
        A: "True, and so not the answer sought. The parietal pleura lines the thoracic cavity — its subdivisions (cervical, costal, mediastinal, diaphragmatic) are named for exactly the walls of that cavity they line.",
        B: "This is the false statement, and the correct answer. It is the parietal pleura, not the visceral pleura, that lines the thoracic cavity's walls — the visceral pleura instead adheres directly and closely to the surface of the lung itself.",
        C: "True, and so not the answer sought. The thin film of fluid in the pleural cavity lubricates the space between the two pleural layers, letting the lung slide against the thoracic wall with minimal friction during breathing.",
        D: "True, and so not the answer sought. The pleura, like other serous membranes, is a serous membrane lined by a single layer of flat mesothelial cells over its connective-tissue support.",
      },
    },
    {
      key: "regarding-pleurae-the-following-statements-are-true-except-22eb58e4",
      conceptKey: "pleura.surface-anatomy",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the pleura's inferior border crosses the tenth, not the eighth, rib in the midaxillary line.",
      explanations: {
        A: "True, and so not the answer sought. The visceral pleura shares the lung's own autonomic nerve supply and, matching that, is not sensitive to somatic pain.",
        B: "True, and so not the answer sought. The parietal pleura is supplied territorially — costal pleura by the corresponding intercostal nerves, and mediastinal/central diaphragmatic pleura by the phrenic nerve.",
        C: "True, and so not the answer sought. The pleural cavity is exactly the potential space between the visceral and parietal pleurae, holding only a thin film of fluid.",
        D: "True, and so not the answer sought. The pulmonary ligament is a loose, empty fold of mediastinal pleura below the lung root, existing precisely to give the pulmonary veins room to distend when venous return rises.",
        E: "This is the false statement, and the correct answer. The pleura's inferior border crosses the TENTH rib in the midaxillary line, not the eighth — the eighth rib is where it crosses in the midclavicular line instead. Mixing up which rib goes with which line is exactly the trap this option sets.",
      },
    },
  ],
}
