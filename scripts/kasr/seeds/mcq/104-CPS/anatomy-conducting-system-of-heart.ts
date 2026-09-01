/**
 * `104 CPS > Anatomy > Heart > Conducting system` — 6 bank rows, 5 bank-
 * tagged leaf "Electrical Activity of the Heart" (leaf null, reclustered by
 * the ledger's own keyword heuristic — genuinely gross anatomy, not
 * physiology) and 1 bank-tagged "The heart". All 6 restate one already-
 * hand-authored, pinned anatomy concept — `conducting-system-of-heart.
 * components` (CON-CVS-6799821893D6D2, docs/Kasr-Source-Imports/concept/
 * 104-CPS-anatomy-concepts.md) — from many different question-book angles:
 * the component list itself, the correct SA-to-Purkinje pathway sequence,
 * and one distractor-elimination row (papillary muscle is not part of it).
 * No new search needed beyond confirming this pinned record's own text
 * against the department anatomy book (pp.78-79, read via pagetext.mjs) —
 * it already covers every fact below verbatim.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Anatomy Cardiovascular System — The Heart's Conducting System (components)",
  modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
  articleId: "ART-104-ANA-HEART-SKELETON-AND-CONDUCTION",

  concepts: [
    {
      // Sparse reuse, not a fresh mint: CON-CVS-6799821893D6D2, canonical_key
      // already pinned in 104-CPS-anatomy-concepts.md, module_subject
      // "104 CPS > Anatomy > Heart", article_ids ART-104-ANA-HEART-SKELETON-
      // AND-CONDUCTION — found by grepping that file for "conducting" before
      // minting anything. Declaring the same key here resolves to the
      // pinned id and emits a sparse update; every other field below is
      // inert for the build, restated close to the pinned record's own
      // wording (confirmed against the department book, pp.78-79).
      key: "conducting-system-of-heart.components",
      label: "The conducting system runs SA node to AV node to AV bundle to right and left bundle branches to Purkinje fibres, arranged so each ventricle contracts from the apex upwards",
      definition: "The conducting system is built of specialised cardiac muscle, not nerve tissue. The sino-atrial node, in the right atrial wall behind the SVC opening, is the pacemaker that initiates each cardiac impulse. The atrio-ventricular node, in the lower posterior interatrial septum above the coronary sinus opening, relays it to the atrioventricular bundle (bundle of His), the sole muscular bridge across the fibrous skeleton, which descends along the membranous septum before splitting into a right branch — running under the septal endocardium to the moderator band and the anterior papillary muscle — and a left branch, running under the septal endocardium towards the apex. Both branches break into a Purkinje network that encircles the papillary muscle bases and ascends beneath the endocardium towards the ventricular base, so each ventricle contracts from below upwards and empties into its outflow artery rather than trapping blood.",
      objective: "Name the five components of the conducting system in order from the SA node to the Purkinje fibres, and explain why the ventricles contract from apex to base.",
      pitfall: "Treating the conducting system as nervous tissue, or crediting a purely mechanical structure such as the chordae tendinae or a papillary muscle with membership in it. The book states explicitly it is formed of specialised cardiac muscle fibres, not nerve tissue, and its five components are all electrical — chordae tendinae and papillary muscles are the valve-support apparatus, a separate mechanical system entirely.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M04"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "mechanism",
      aliases: ["Sino-atrial node", "Atrio-ventricular node", "Bundle of His", "Purkinje fibres"],
    },
  ],

  questions: [
    {
      // Bank-tagged leaf null, reclustered by the ledger under "Electrical
      // Activity of the Heart" — genuinely gross anatomy, this file's own
      // conducting-system concept, not the physiology of pacemaker
      // electrophysiology this leaf name shares a topic with.
      key: "the-following-are-a-parts-of-the-conductive-system-of-the-he-98ca9ab2",
      conceptKey: "conducting-system-of-heart.components",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the chordae tendinae as the exception among listed parts of the heart's conductive system.",
      explanations: {
        A: "True, so not the exception. Purkinje fibres are the terminal, most distal component of the conducting system, encircling the papillary-muscle bases before ascending beneath the endocardium.",
        B: "True, so not the exception. The sino-atrial node, in the right atrial wall behind the SVC opening, is the conducting system's own point of origin.",
        C: "The exception, and the answer. The chordae tendinae are fibrous cords connecting the atrioventricular valve cusps to the papillary muscles — part of the mechanical valve-support apparatus, not the electrical conduction system at all. A common trap: assuming any structure closely associated with the ventricular cavity's own machinery must belong to the conducting system, when the two systems (electrical and mechanical) are built and named separately.",
        D: "True, so not the exception. The atrioventricular bundle is the sole muscular bridge across the fibrous skeleton, carrying the impulse from the AV node into the ventricles.",
        E: "True, so not the exception. The atrioventricular node relays the impulse from the atria, after a deliberate conduction delay, into the AV bundle.",
      },
    },
    {
      key: "the-following-are-parts-of-the-conductive-system-of-the-hear-baaf7de3",
      conceptKey: "conducting-system-of-heart.components",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the chordae tendinae as the exception among listed parts of the heart's conductive system.",
      explanations: {
        A: "True, so not the exception. Purkinje fibres are the terminal, most distal component of the conducting system, encircling the papillary-muscle bases before ascending beneath the endocardium.",
        B: "True, so not the exception. The sino-atrial node, in the right atrial wall behind the SVC opening, is the conducting system's own point of origin.",
        C: "The exception, and the answer. This is a duplicate of the identical question asked elsewhere in the same paper; the chordae tendinae remain the correct exception because they are mechanical valve-support cords, connecting the AV valve cusps to the papillary muscles, not electrical conduction tissue.",
        D: "True, so not the exception. The atrioventricular bundle is the sole muscular bridge across the fibrous skeleton, carrying the impulse from the AV node into the ventricles.",
        E: "True, so not the exception. The atrioventricular node relays the impulse from the atria, after a deliberate conduction delay, into the AV bundle.",
      },
    },
    {
      key: "what-is-the-correct-pathway-of-impulses-through-the-conducti-26e4ed5e",
      conceptKey: "conducting-system-of-heart.components",
      difficulty: "Moderate",
      questionType: "Recall of a sequence",
      learningObjective: "Sequence the conducting system correctly: SA node, AV node, AV bundle, bundle branches, Purkinje fibres.",
      explanations: {
        A: "Correct. The impulse starts at the SA node, is relayed through the AV node's own deliberate delay to the AV bundle, splits there into the right and left bundle branches, and finally spreads through the Purkinje network — the department book's own component order, followed in exactly this sequence.",
        B: "Placing the AV node before the SA node reverses the true origin of the impulse: the SA node initiates it, and the AV node only relays what the SA node has already generated.",
        C: "Starting from the Purkinje fibres reverses the entire pathway; the Purkinje network is the terminal, most distal component, not the point of origin, and the SA node — omitted here entirely — is where the impulse actually begins.",
        D: "Placing the Purkinje fibres before the bundle branches reverses their true order: the AV bundle splits INTO the bundle branches, which THEN break up into the Purkinje network — the branches are always upstream of the Purkinje fibres they feed, never downstream of them.",
      },
    },
    {
      key: "which-of-the-following-is-the-correct-pathway-of-impulses-th-bcc9a59a",
      conceptKey: "conducting-system-of-heart.components",
      difficulty: "Moderate",
      questionType: "Recall of a sequence",
      learningObjective: "Sequence the conducting system correctly: SA node, AV node, AV bundle, bundle branches, Purkinje fibres.",
      explanations: {
        A: "Correct. The impulse starts at the SA node, is relayed through the AV node's own deliberate delay to the AV bundle, splits there into the right and left bundle branches, and finally spreads through the Purkinje network — the department book's own component order, followed in exactly this sequence.",
        B: "Placing the AV node before the SA node reverses the true origin of the impulse: the SA node initiates it, and the AV node only relays what the SA node has already generated.",
        C: "Starting from the Purkinje fibres reverses the entire pathway; the Purkinje network is the terminal, most distal component, not the point of origin, and the SA node — omitted here entirely — is where the impulse actually begins.",
        D: "Placing the Purkinje fibres before the bundle branches reverses their true order: the AV bundle splits INTO the bundle branches, which THEN break up into the Purkinje network — the branches are always upstream of the Purkinje fibres they feed, never downstream of them.",
      },
    },
    {
      key: "which-of-the-following-is-not-a-part-of-the-specialized-seij-44db1b50",
      conceptKey: "conducting-system-of-heart.components",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify the papillary muscle as not a part of the specialized self-excitable conducting system, unlike the SA node, AV node and bundle of His.",
      explanations: {
        A: "The SA node is a genuine component of the specialized conducting system — its own point of origin — so not the answer sought.",
        B: "The AV node is a genuine component of the specialized conducting system, relaying the impulse from the atria to the AV bundle after its own deliberate delay — so not the answer sought.",
        C: "Correct. A papillary muscle is part of the ventricle's mechanical valve-support apparatus — anchoring the AV valve cusps' chordae tendinae — not part of the specialized, self-excitable electrical conducting system at all, even though both sit inside the same ventricular cavity.",
        D: "The bundle of His (AV bundle) is a genuine component of the specialized conducting system, the sole muscular bridge across the fibrous skeleton — so not the answer sought.",
      },
    },
    // Bank-tagged leaf "The heart" — genuinely this file's own conducting-
    // system concept (SA node location relative to the SVC), a leaf-
    // mismatch reroute onto an already-pinned fact, no new search needed.
    {
      key: "regarding-the-heart-mark-one-correct-statement-d8600a96",
      conceptKey: "conducting-system-of-heart.components",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Locate the SA node in the right atrial wall behind the entrance of the superior vena cava, as opposed to incorrect apex, valve-projection, coronary-supply and trabeculae-carneae statements.",
      explanations: {
        A: "The apex of the heart is opposite the LEFT fifth intercostal space, not the fourth — a common, closely-related but incorrect distractor figure.",
        B: "The mitral valve's surface projection lies behind the left half of the sternal body at the level of the fourth left sternocostal junction, not the third left costal cartilage — that figure instead describes the pulmonary valve's own projection.",
        C: "The left coronary artery supplies the SA node in about 40% of people, not 60% — the right coronary artery is the majority (60%) source, a frequently swapped pair of figures.",
        D: "Correct. The sino-atrial node is situated in the wall of the right atrium behind the opening of the superior vena cava — the department book's own stated location, and the fact from which its 'pacemaker' role follows: it is the first tissue an impulse-initiating stimulus reaches on that pathway.",
        E: "Trabeculae carneae are muscular ridges in the interior of the ventricles, not the right atrium — the right atrium's own ridged feature is instead the musculi pectinati of its rough anterior part.",
      },
    },
  ],
}
