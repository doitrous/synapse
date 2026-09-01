import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "The Typical Intercostal Nerve",
  modulePath: "104 CPS > Anatomy > Intercostal Spaces",
  articleId: "ART-104-ANA-INTERCOSTAL-MUSCLES-NERVES-VESSELS",

  concepts: [
    {
      // Reuse: canonical_key already pinned in
      // docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md (line 813).
      key: "typical-intercostal-nerve.course-and-branches",
      label: "The typical intercostal nerve (T2-T6) runs in the costal groove between the internal and innermost intercostal muscles, below the vein and artery (VAN order), and gives ganglionic, collateral, muscular, cutaneous, articular and pleural branches",
      definition: "A typical intercostal nerve, the anterior primary ramus of T2 to T6, starts posteriorly between the parietal pleura and the posterior intercostal membrane, behind the sympathetic chain; runs forward in the costal groove within the neurovascular bundle, between the internal and innermost intercostal muscles, BELOW the vein and artery (the neurovascular bundle's order, top to bottom, is vein, artery, nerve — VAN); then crosses in front of the internal thoracic vessels near the sternum before piercing the wall as the anterior cutaneous branch. The first nerve mostly joins the brachial plexus; the twelfth (subcostal) runs entirely in the abdominal wall; the second to sixth are typical; the seventh to eleventh are non-typical, running part of their course in the thorax and part in the abdomen, supplying the muscles of the anterior abdominal wall. The typical nerve gives ganglionic rami communicantes to the sympathetic chain, a collateral branch along the rib below, muscular branches, a lateral cutaneous branch (which in the second space becomes the intercostobrachial nerve to the axillary floor and medial arm instead of dividing locally), the terminal anterior cutaneous branch, articular branches to the rib joints, and pleural branches (sensory, not motor) to the adjacent parietal pleura.",
      objective: "State the VAN order of the neurovascular bundle in the costal groove, and name the typical intercostal nerve's six branches.",
      pitfall: "Placing the intercostal nerve above the vessels in the costal groove, or between the artery and the vein. The order from top to bottom is vein, artery, nerve (VAN) — the nerve runs lowest of the three, not above or between them.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Intercostal Spaces",
      type: "structural_description",
      aliases: ["VAN order", "Intercostobrachial nerve", "Costal groove", "Neurovascular bundle of the intercostal space"],
    },
  ],

  questions: [
    {
      key: "concerning-the-intercostal-nerves-select-the-false-statement-c001aebb",
      conceptKey: "typical-intercostal-nerve.course-and-branches",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the intercostal nerve runs below, not above, the intercostal vessels in the costal groove.",
      explanations: {
        A: "True, so not the answer sought. Intercostal nerves are the ventral (anterior) primary rami of the thoracic spinal nerves.",
        B: "True, so not the answer sought. The intercostal nerve lies deep to the internal intercostal muscle, running in the neurovascular bundle between the internal and innermost intercostal layers.",
        C: "This is the false statement, and the answer. The intercostal nerve lies BELOW, not above, the intercostal vessels in the costal groove — the neurovascular bundle's order from top to bottom is vein, artery, nerve (VAN), with the nerve running lowest of the three.",
        D: "True, so not the answer sought. Near the sternum, the intercostal nerve crosses in front of the internal thoracic vessels before piercing the wall as its anterior cutaneous branch.",
      },
    },
    {
      key: "concerning-the-typical-intercostal-nerves-select-the-correct-c3dcf961",
      conceptKey: "typical-intercostal-nerve.course-and-branches",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that typical intercostal nerves are the ventral rami of the thoracic spinal nerves.",
      explanations: {
        A: "This is the correct answer. Typical intercostal nerves are the ventral (anterior) primary rami of the thoracic spinal nerves — specifically the second to sixth, the segment the department book defines as \"typical\".",
        B: "The intercostal nerve lies between the INTERNAL and innermost intercostal muscles, not deep to the innermost layer alone — placing it deep to the innermost muscle would put it one plane too far posterior.",
        C: "The intercostal nerve lies BELOW, not above, the intercostal vessels in the costal groove — the VAN order places the nerve lowest of the three (vein, artery, nerve).",
        D: "As best interpretable through the extraction's garbled text, this option numbers the typical intercostal nerves from T1 to T9 — incorrect either way: the typical nerves are T2 to T6 only, since T1 mostly joins the brachial plexus and T7-T11 are non-typical.",
      },
    },
    {
      key: "in-the-chest-wall-one-is-correct-2b79c80a",
      conceptKey: "typical-intercostal-nerve.course-and-branches",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "State that the posterior intercostal artery lies between the intercostal nerve and vein — the artery is the middle element of the VAN order.",
      explanations: {
        A: "The posterior intercostal artery is NOT more superficial than the vein — the vein lies uppermost of the three neurovascular structures, with the artery immediately below it.",
        B: "This is the correct answer. The neurovascular bundle's order from top to bottom is vein, artery, nerve (VAN) — which means the artery lies literally between the vein above it and the nerve below it, exactly as this option states.",
        C: "The innermost intercostal muscle is the DEEPEST of the three layers, not sandwiched between the external and internal — it lies deep to the internal intercostal, separated from it only by the neurovascular bundle.",
        D: "The neurovascular bundle lies between the INTERNAL and innermost intercostal muscles, not between the external and internal — that placement is one layer too superficial.",
      },
    },
    {
      key: "regarding-the-intercostal-arteries-all-the-following-stateme-487c3bb6",
      conceptKey: "typical-intercostal-nerve.course-and-branches",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the intercostal artery runs below, not above, its accompanying vein in the costal groove.",
      explanations: {
        A: "True, so not the exception. Perforating branches of the anterior intercostal (internal thoracic) system supply the skin and the medial breast.",
        B: "True, so not the exception. The upper two posterior intercostal arteries are indirect branches of the costocervical trunk, via the superior intercostal artery.",
        C: "True of standard intercostal artery anatomy, so not the exception sought here — posterior intercostal arteries give small spinal branches through the intervertebral foramina to supply the spinal cord and its coverings, alongside their main course in the costal groove.",
        D: "This is the exception, and the answer. In the costal groove, the intercostal artery runs BELOW its accompanying vein, not above it — the VAN order places the vein highest of the three neurovascular structures, with the artery directly beneath it and the nerve lowest of all.",
        E: "True, so not the exception. Each anterior intercostal space is supplied by two anterior intercostal arteries, one from each of the internal thoracic artery's own upper branches (or, lower down, from the musculophrenic artery).",
      },
    },
    {
      key: "regarding-the-intercostal-nerves-one-is-false-482d0ad2",
      conceptKey: "typical-intercostal-nerve.course-and-branches",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the seventh intercostal nerve is non-typical, not typical.",
      explanations: {
        A: "True, so not the answer sought. The anterior primary ramus of the twelfth thoracic nerve is the subcostal nerve, which runs entirely in the abdominal wall.",
        B: "This is the false statement, and the answer. The seventh intercostal nerve is NON-typical, not typical — the department book classifies only the second to sixth intercostal nerves as typical; the seventh to eleventh run part of their course in the thorax and part in the abdomen.",
        C: "True, so not the answer sought. The intercostal nerves lie in the costal groove of the rib above their own space.",
        D: "True, so not the answer sought. The second intercostal nerve's lateral cutaneous branch becomes the intercostobrachial nerve, supplying skin over the axillary floor.",
      },
    },
    {
      key: "regarding-the-intercostal-nerves-the-following-statements-ar-de5ec519",
      conceptKey: "typical-intercostal-nerve.course-and-branches",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the intercostal nerve runs below, not above, its accompanying vessels in the costal groove.",
      explanations: {
        A: "True, so not the exception. The first intercostal nerve mostly joins the brachial plexus and has no typical anterior cutaneous branch of its own.",
        B: "True, so not the exception. The lateral cutaneous branch of the second intercostal nerve is renamed the intercostobrachial nerve, supplying the axillary floor and medial arm.",
        C: "True, so not the exception. The lower five intercostal nerves continue their course onto the anterior abdominal wall, supplying its muscles alongside the subcostal nerve.",
        D: "This is the exception, and the answer. In the costal groove, the intercostal nerve lies BELOW, not above, its accompanying vessels — the VAN order (vein, artery, nerve) places the nerve lowest of the three.",
      },
    },
  ],
}
