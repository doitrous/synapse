import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Aortic Arch Relations and Cardiac Plexuses",
  modulePath: "104 CPS > Anatomy > Large Arteries of the Thorax",
  articleId: "ART-104-ANA-PULMONARY-TRUNK-AND-AORTA",

  concepts: [
    {
      key: "arch-of-aorta.relations-and-branches",
      label: "The aortic arch's upper convex aspect carries its three branches and is crossed by the left brachiocephalic vein; its right posterior aspect carries the deep cardiac plexus at the tracheal bifurcation",
      definition: "The arch of the aorta continues the ascending aorta from the second right sternocostal junction, passing upwards, backwards and to the left in front of the trachea, then backwards and downwards on its left side, to end on the left of the T4/T5 disc as the descending thoracic aorta. Its upper convex aspect gives its three branches — brachiocephalic, left common carotid and left subclavian, in that order — and is crossed by the left brachiocephalic vein; its lower concave aspect overlies the pulmonary trunk's bifurcation, the left principal bronchus, the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve; its left anterior aspect is crossed by the left phrenic and vagus nerves, cardiac branches and the left superior intercostal vein, separating it from the left pleura and lung; and its right posterior aspect is related to the trachea, the deep cardiac plexus at the tracheal bifurcation, the oesophagus, the left recurrent laryngeal nerve and the thoracic duct.",
      objective: "Name the three branches of the aortic arch in order and the structures related to each of its four aspects.",
      pitfall: "Assigning the right brachiocephalic vein to the arch's upper border — it is the LEFT brachiocephalic vein that runs obliquely along the arch's upper aspect, in front of the origins of its three branches, on its way to join the right brachiocephalic vein and form the SVC.",
      subject: "cvs",
      primary: "DIS-ANA-T03",
      secondary: ["SYS-CVS-T01-S02"],
      modulePath: "104 CPS > Anatomy > Large Arteries of the Thorax",
      type: "structural_description",
      aliases: ["Aortic arch relations", "Aortic arch branches", "Deep cardiac plexus location"],
    },
  ],

  questions: [
    {
      key: "regarding-arch-of-aorta-select-the-false-statement-b86a56ca",
      conceptKey: "arch-of-aorta.relations-and-branches",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the false statement about the aortic arch's four-aspect relations.",
      explanations: {
        A: "True, and so not the answer sought. The arch of the aorta is confined to the superior mediastinum, from the second right sternocostal junction to the left of the T4/T5 disc, where it becomes the descending thoracic aorta in the posterior mediastinum.",
        B: "This is the false statement, and the correct answer. It is the LEFT brachiocephalic vein, not the right, that runs along the arch's upper border — it passes obliquely down and to the right, along the upper aspect of the aortic arch and in front of the origins of its three branches, before joining the right brachiocephalic vein to form the SVC. The right brachiocephalic vein descends on the right side, nowhere near the arch itself.",
        C: "True, and so not the answer sought. The arch's lower concave aspect overlies the left principal bronchus, alongside the pulmonary trunk's bifurcation, the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve.",
        D: "True, and so not the answer sought. The arch's left anterior aspect is crossed by the left phrenic and left vagus nerves (with cardiac branches and the left superior intercostal vein), which is exactly what separates this aspect of the arch from the left pleura and lung.",
      },
    },
    {
      key: "the-deep-cardiac-plexus-indicate-the-correct-statement-909f5571",
      conceptKey: "arch-of-aorta.relations-and-branches",
      difficulty: "Hard",
      questionType: "Recall of the correct statement",
      learningObjective: "Locate the deep cardiac plexus at the tracheal bifurcation, on the aortic arch's right posterior aspect.",
      explanations: {
        A: "This is the correct answer. The deep cardiac plexus sits on the aortic arch's right posterior aspect, in front of the tracheal bifurcation — a different aspect of the arch from the one carrying its three named branches (brachiocephalic, left common carotid, left subclavian) off the upper convexity, which is exactly the distinction this question is built to test.",
        B: "The deep cardiac plexus is formed from cardiac branches of BOTH sympathetic chains and BOTH vagi, carrying parasympathetic as well as sympathetic fibres — it is not sympathetic-only.",
        C: "The superficial and deep cardiac plexuses are connected only by a few filaments (the superficial plexus sends branches down to the deep plexus), not \"freely\" or extensively interconnected — treating them as one continuous, freely-connected network overstates a limited anatomical link.",
        D: "The deep cardiac plexus receives cardiac branches from both vagi and both sympathetic chains, not from the vagus alone — a vagus-only origin describes neither cardiac plexus.",
      },
    },
    {
      key: "the-parasympathetic-root-of-the-superficial-cardiac-plexus-o-d9fa56cb",
      conceptKey: "arch-of-aorta.relations-and-branches",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The department book (article ART-104-ANA-HEART-SKELETON-AND-CONDUCTION) states the superficial cardiac plexus's parasympathetic root is the left vagus's INFERIOR cervical cardiac branch, with the SUPERIOR cervical cardiac branch instead being the sympathetic (not parasympathetic) contribution, from the left sympathetic chain. The bank's surviving options are A) superior cervical cardiac branch of left vagus, C) inferior thoracic cardiac branch of right vagus, D) superior cervical cardiac branch of right vagus — option B, almost certainly the textbook-correct 'inferior cervical cardiac branch of left vagus', is missing from the extraction (OCR/page-bleed loss, a recurring pattern in this bank). The row's own editorial-no-printed-key answer (A) directly contradicts the department book's own stated mechanism, so keying it A would teach an inverted fact rather than a gap. Per the ANSWER-KEY GAPS ruling, a wrong key is worse than a missing one; excluded rather than keyed against the source.",
    },
  ],
}
