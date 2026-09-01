/**
 * `104 CPS > Anatomy > Heart > Coronary vessels, plexuses and surface
 * markings` — the last 12 kept rows of run40's "The heart" batch (31 bank
 * rows: 21 kept across four files, 10 excluded). Five concepts are sparse
 * reuses of already-pinned, hand-authored records in 104-CPS-anatomy-
 * concepts.md (right/left coronary artery, coronary sinus/cardiac veins,
 * pulmonary trunk, cardiac plexuses) — found by grepping that file for
 * "coronary"/"cardiac.plexus"/"pulmonary-trunk" before minting anything.
 * The sixth, cardiac-valve surface markings and auscultatory areas, is a
 * fresh mint after find-existing.mjs surfaced a LIVE, cross-catalogue
 * record for the pulmonary-valve fact alone (CON-CVS-CD77400CEDD059, no
 * 104-CPS module — the same "different pipeline, no safe sparse-update
 * path" situation documented repeatedly elsewhere in this branch) —
 * verified in full against the department anatomy book's own "Surface
 * Anatomy of the Heart" section (pagetext.mjs, pp.80-82) before authoring.
 *
 * Two answers overridden against a directly re-verified department-book
 * page, per this branch's own answerOverride convention: the bank's
 * editorial/externally-recovered keys for
 * `the-anterior-interventricular-artery-is-accompanied-by-46e16a29` and
 * `regarding-the-arterial-supply-of-the-heart-the-following-sta-726ad32b`
 * both credit the wrong coronary artery with a branch the book (p.89)
 * states plainly belongs to the other one.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Anatomy Cardiovascular System — The Heart's Coronary Vessels, Plexuses and Surface Markings",
  modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
  articleId: "ART-104-ANA-HEART-VESSELS-NERVES-FIXATION",

  concepts: [
    // Sparse reuse, not a fresh mint: CON-CVS-2A21F1B4F30B61, canonical_key
    // already pinned in 104-CPS-anatomy-concepts.md, this same article.
    {
      key: "right-coronary-artery.course-and-distribution",
      label: "The right coronary artery runs the coronary sulcus to give the marginal and posterior interventricular arteries, supplying the whole right side of the heart and, in most people, the whole conducting system",
      definition: "The right coronary artery arises from the anterior aortic sinus of the ascending aorta, passes between the pulmonary trunk and right auricle to the anterior coronary sulcus, descends to the junction of the right and inferior borders where it gives the marginal artery, then turns back along the posterior sulcus to give the posterior (inferior) interventricular artery — which also supplies the AV node and bundle — before anastomosing with the circumflex artery. It supplies the whole right atrium, the whole right ventricle except a strip beside the anterior interventricular groove, a strip of the left ventricle's diaphragmatic surface, the posterior third of the interventricular septum, and the whole conducting system in most people: the SA node in 60% and the AV node and bundle branches in 80%.",
      objective: "Trace the right coronary artery's course from its aortic sinus origin to its anastomosis, and state which parts of the conducting system it supplies and in what proportion of people.",
      pitfall: "Crediting the right coronary artery with the anterior interventricular artery. That branch belongs to the LEFT coronary artery; the right coronary artery's own terminal branch, given after it reaches the posterior sulcus, is the posterior (inferior) interventricular artery instead.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M03"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "mechanism",
      aliases: ["Marginal artery", "Posterior interventricular artery", "Right dominance"],
    },
    // Sparse reuse: CON-CVS-1F1AB4B70AB06D, canonical_key already pinned in
    // 104-CPS-anatomy-concepts.md.
    {
      key: "left-coronary-artery.branches-and-distribution",
      label: "The left coronary artery divides into the anterior interventricular and circumflex arteries, together supplying the left atrium, most of the left ventricle and the anterior two thirds of the septum",
      definition: "The left coronary artery, larger than the right, arises from the left posterior aortic sinus, passes between the pulmonary trunk and left auricle to the top of the anterior interventricular groove, and ends by dividing into the anterior interventricular artery — which descends with the great cardiac vein in the anterior interventricular groove, turns round the inferior border and anastomoses with the right coronary artery's posterior interventricular branch, supplying the sternocostal surface of the left ventricle, a strip of the right ventricle and the anterior two thirds of the septum — and the circumflex artery, which supplies the left atrium and, through its marginal branch, the left ventricle down to the apex, and the SA node in 40% and the AV node in 20% of people.",
      objective: "Name the two terminal branches of the left coronary artery and state what each supplies, including its share of the conducting system and which cardiac vein accompanies the anterior interventricular artery.",
      pitfall: "Crediting the middle cardiac vein with accompanying the anterior interventricular artery. It is the GREAT cardiac vein that ascends in the anterior interventricular groove alongside this artery; the middle cardiac vein instead runs in the posterior interventricular groove with the posterior interventricular artery — a different vessel pair entirely.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M03"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "mechanism",
      aliases: ["Anterior interventricular artery", "Left anterior descending artery", "Circumflex artery"],
    },
    // Sparse reuse: CON-CVS-929D9DDCB95482, canonical_key already pinned in
    // 104-CPS-anatomy-concepts.md, this same article.
    {
      key: "coronary-venous-drainage.coronary-sinus-and-cardiac-veins",
      label: "Most cardiac veins end in the coronary sinus, which lies in the posterior coronary sulcus and receives the great, middle and small cardiac veins and the oblique vein of the left atrium",
      definition: "The coronary sinus is a short, wide venous channel (3-4 cm) in the posterior coronary sulcus, beginning as the continuation of the great cardiac vein and opening into the right atrium between the IVC opening and the tricuspid orifice, guarded by a small valve. Its tributaries are the great cardiac vein, the middle cardiac vein, the small cardiac vein and the oblique vein of the left atrium. A separate set of veins bypasses the sinus entirely: the anterior cardiac veins, 3-4 small veins on the right ventricle's sternocostal surface, and the minute venae cordis minimae in the myocardium, both opening directly into the right atrium.",
      objective: "Name the four tributaries of the coronary sinus, state where it opens, and name the two types of cardiac vein that bypass it to open directly into the right atrium instead.",
      pitfall: "Assuming every cardiac vein drains through the coronary sinus. The anterior cardiac veins and the venae cordis minimae bypass it entirely and open straight into the right atrium — a real exception, not an approximation.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M03"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Great cardiac vein", "Middle cardiac vein", "Small cardiac vein", "Coronary sinus", "Anterior cardiac veins"],
    },
    // Sparse reuse: CON-CVS-A723ADE6F4E726, canonical_key already pinned in
    // 104-CPS-anatomy-concepts.md. Own pinned article_ids is ART-104-ANA-
    // PULMONARY-TRUNK-AND-AORTA (a different article from this leaf's own
    // articleId) — inert for the build, per this branch's established
    // sparse-reuse convention (see run31's own precedent).
    {
      key: "pulmonary-trunk.origin-course-and-ligamentum-arteriosum",
      label: "The pulmonary trunk runs entirely within the fibrous pericardium and ends at the sternal angle level by dividing into right and left pulmonary arteries, joined to the aortic arch by the ligamentum arteriosum",
      definition: "The pulmonary trunk begins at the pulmonary orifice, runs upwards, backwards and to the left winding round the ascending aorta's left side — its whole length inside the fibrous pericardium — and ends at the level of the sternal angle by dividing into right and left pulmonary arteries. The ligamentum arteriosum, the obliterated fetal ductus arteriosus, is a flattened fibrous band between the left pulmonary artery and the concavity of the aortic arch, with the superficial cardiac plexus on its right anterior aspect and the left recurrent laryngeal nerve on its left posterior aspect — three structures that all occupy this same small triangular space between the arch of the aorta and the pulmonary trunk/bifurcation.",
      objective: "State where the pulmonary trunk begins and ends, and name the three structures that share the space between the concavity of the aortic arch and the pulmonary trunk.",
      pitfall: "Naming only one of the three structures crowded into the space between the aortic arch's concavity and the pulmonary trunk. The ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve all occupy it together, which is exactly why exam questions list them as a single set rather than testing each in isolation.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Ligamentum arteriosum", "Ductus arteriosus", "Superficial cardiac plexus location"],
    },
    // Sparse reuse: CON-CVS-B12EDEA332E53F, canonical_key already pinned in
    // 104-CPS-anatomy-concepts.md, this same article.
    {
      key: "heart.nerve-supply-and-cardiac-plexuses",
      label: "The heart's autonomic supply is parasympathetic from the two vagi and sympathetic from the upper five thoracic segments, meeting in superficial and deep cardiac plexuses that only modulate rate, never initiate it",
      definition: "The heart's rate and contractile strength are controlled by autonomic fibres, sympathetic increasing both and parasympathetic decreasing them; neither initiates or propagates the cardiac impulse, which is the conducting system's own job. Sympathetic preganglionic fibres arise in the lateral horn of the upper five thoracic segments, relay in the cervical and upper five thoracic sympathetic ganglia, and travel onward as postganglionic cardiac branches. These converge, together with the parasympathetic vagal cardiac branches, in the superficial cardiac plexus, in the concavity of the aortic arch on the ligamentum arteriosum, and the deep cardiac plexus, in front of the tracheal bifurcation deep to the arch.",
      objective: "State which autonomic division increases and which decreases heart rate, name the two cardiac plexuses and where each lies, and state which spinal segments supply the sympathetic component.",
      pitfall: "Crediting the autonomic nerves with starting the heartbeat. The book is explicit that they are not responsible for initiation or propagation of the impulse — only the SA node and conducting system do that; the nerves only speed it up or slow it down.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "mechanism",
      aliases: ["Superficial cardiac plexus", "Deep cardiac plexus"],
    },
    {
      // Fresh mint. find-existing.mjs "pulmonary valve" surfaced a LIVE,
      // cross-catalogue record (CON-CVS-CD77400CEDD059, "Anatomical
      // projection of the pulmonary valve", no 104-CPS module — the same
      // "different pipeline, no safe sparse-update path" situation
      // documented repeatedly elsewhere in this branch for GENERATED_BY-
      // blind and cross-catalogue overlaps). "valve surface projection" /
      // "aortic valve auscultation" / "mitral valve apex" / "tricuspid
      // valve xiphisternal" all returned "safe to create" — no 104-CPS-
      // scoped record covers the full four-valve set. Verified in full
      // against the department book's own "Surface Anatomy of the Heart"
      // section (pagetext.mjs, pp.80-82) before minting: the PAMT
      // surface-marking mnemonic, the valve cusp counts and the four
      // auscultatory areas are all read directly off the cached page text,
      // not assumed from general knowledge.
      key: "cardiac-valve.surface-markings-cusp-counts-and-auscultatory-areas",
      label: "The four heart valves' surface markings run PAMT from above downwards behind the coronary sulcus, each has three cusps except the two-cusped mitral valve, and each valve's sound is heard best at a separate auscultatory area, not its own anatomical projection",
      definition: "The surface markings of the four cardiac valves are arranged, from above downwards and to the right, in the order Pulmonary, Aortic, Mitral, Tricuspid (PAMT), all lying on or below and to the left of the coronary sulcus: the pulmonary valve behind the third left costal cartilage at its sternal junction; the aortic valve behind the left margin of the sternum opposite the third left intercostal space; the mitral valve behind the left half of the sternal body opposite the fourth left sternocostal junction; and the tricuspid valve behind the centre of the sternum opposite the fourth intercostal space. Each valve has three cusps except the mitral, which has two: the tricuspid has anterior, posterior and septal cusps; the pulmonary has two anterior and one posterior cusp; the aortic has one anterior and two posterior cusps. Because of how heart sounds physically propagate, none of the four valves is heard best over its own anatomical projection — clinically, the pulmonary valve is heard best at the second left sternocostal junction, the aortic valve at the second right sternocostal junction, the mitral valve at the apex of the heart, and the tricuspid valve at the xiphisternal junction.",
      objective: "State the PAMT order and costal-cartilage level of each valve's surface projection, each valve's cusp count and naming, and each valve's separate auscultatory area.",
      pitfall: "Assuming a valve's surface (anatomical) projection is where its sound is best heard. The department book states this explicitly is not so: sound propagation carries each valve's closure sound to a separate auscultatory area, distinct from its own surface marking — most strikingly for the pulmonary valve, whose projection (3rd left costal cartilage) and auscultatory area (2nd left sternocostal junction) sit one full space apart.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M02"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["PAMT mnemonic", "Valve surface markings", "Valve auscultatory areas", "Pulmonary valve projection"],
      conflicts: [
        "CON-CVS-CD77400CEDD059 (live, cross-catalogue, no 104-CPS module) states the pulmonary valve's own surface projection alone, sourced from the same department-book page (CIT-124A496DEA7B9E). Not reused: existingConceptIds() for module '104 CPS' only scans docs/Kasr-Source-Imports/concept/104-CPS-*.md, so a live record outside that scope is invisible to this build, and mintConceptId under this canonical_key would not reproduce that record's own id in any case — the same 'different pipeline, no safe sparse-update path' situation documented repeatedly elsewhere in this branch. Minted fresh under 104 CPS instead, as the full four-valve PAMT/cusp-count/auscultatory-area synthesis this leaf's own bank rows need, not a duplicate of the single pulmonary-valve fact alone.",
      ],
    },
  ],

  questions: [
    {
      key: "blood-flows-into-the-coronary-arteries-arises-from-the-20f83d05",
      conceptKey: "right-coronary-artery.course-and-distribution",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that both coronary arteries arise from the ascending aorta's own aortic sinuses, not the descending aorta, pulmonary trunk or superior vena cava.",
      explanations: {
        A: "The descending aorta lies well beyond the aortic sinuses, giving rise to the intercostal, subcostal, bronchial and oesophageal branches — not the coronary arteries.",
        B: "Correct. Blood flows into the coronary arteries from the ascending aorta's own aortic sinuses, immediately above the aortic valve — the right coronary artery from the anterior sinus, the left from the left posterior sinus — which is exactly why coronary filling depends on aortic root pressure and occurs predominantly during diastole, when the aortic valve cusps are closed.",
        C: "The pulmonary trunk carries deoxygenated blood to the lungs and plays no normal role in coronary artery origin.",
        D: "The superior vena cava is a systemic vein returning blood to the right atrium; it has no arterial branches and cannot be a source of the coronary arteries.",
      },
    },
    {
      key: "regarding-the-coronary-arteries-all-the-following-statements-402c0dd1",
      conceptKey: "right-coronary-artery.course-and-distribution",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that the AV node usually receives arterial supply from the RIGHT, not the left, coronary artery as the exception among otherwise true statements.",
      explanations: {
        A: "True, so not the exception. The left coronary artery does arise from the left posterior aortic sinus, one of its defining anatomical facts.",
        C: "The exception, and the answer. In the great majority of hearts, the AV node and bundle receive their arterial supply from the RIGHT coronary artery (in about 80% of people), via its posterior interventricular branch — not the left coronary artery, which supplies the AV node in only about 20%.",
        D: "True, so not the exception. The anterior interventricular artery is indeed a branch of the left coronary artery, descending in the anterior interventricular groove to supply the anterior two thirds of the septum.",
        E: "True, so not the exception. Coronary filling does occur predominantly during ventricular diastole, when the aortic valve cusps are closed and the intramural vessels are no longer compressed by systolic contraction.",
      },
    },
    {
      key: "regarding-the-coronary-arteries-the-following-statements-are-db3acfda",
      conceptKey: "right-coronary-artery.course-and-distribution",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that the RIGHT, not the left, coronary artery is the usual source of blood supply to the sinoatrial node as the exception among otherwise true statements.",
      explanations: {
        A: "True, so not the exception. Both coronary arteries are branches of the ascending aorta, arising from its right and left posterior aortic sinuses respectively.",
        B: "True, so not the exception. The coronary arteries are considered functional end arteries — anastomoses between them are present but poor, especially in youth, and inadequate to provide efficient collateral flow if a large branch is suddenly blocked.",
        C: "True, so not the exception. Coronary filling occurs predominantly during diastole, when the intramural vessels are no longer compressed by ventricular systole.",
        D: "The exception, and the answer. The RIGHT coronary artery, not the left, is the usual (majority) source of blood supply to the sinoatrial node — in about 60% of people, against the left coronary artery's 40%.",
      },
    },
    {
      key: "regarding-the-right-coronary-artery-select-the-correct-state-6545e80e",
      conceptKey: "right-coronary-artery.course-and-distribution",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the right coronary artery usually gives a posterior interventricular branch, as opposed to incorrect course, AV-node-percentage and SA-node-percentage statements.",
      explanations: {
        A: "The right coronary artery courses between the pulmonary trunk and the RIGHT auricle, not the left auricle, on its way to the anterior coronary sulcus; the infundibulum is supplied along the way by its small conus branch, not itself part of the artery's own course.",
        B: "The right coronary artery supplies the AV node in about 80% of people, not 60% — 60% is instead the figure for its share of the SA node.",
        C: "Correct. The right coronary artery usually has a posterior (inferior) interventricular branch, given after it reaches the posterior part of the coronary sulcus, running towards the apex to supply the adjoining parts of both ventricles, the posterior third of the septum and the AV node and bundle.",
        D: "The right coronary artery supplies the SA node in about 60% of people, not 30% — an understated figure for what is in fact the majority share.",
      },
    },
    // Answer overridden against a directly re-verified department-book
    // page (p.89), per this branch's own answerOverride convention: the
    // bank's own editorial (no-printed-key) answer credits the RIGHT
    // coronary artery with giving the anterior interventricular artery as
    // the false/EXCEPT statement's own claim — but the book states plainly
    // this branch belongs to the LEFT coronary artery, making option B,
    // not A, the true exception. Option A (right coronary artery arises
    // from the anterior aortic sinus) is independently confirmed true by
    // this same file's own right-coronary-artery.course-and-distribution
    // concept, sourced from the same book (pp.83-84).
    {
      key: "regarding-the-arterial-supply-of-the-heart-the-following-sta-726ad32b",
      conceptKey: "right-coronary-artery.course-and-distribution",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that the RIGHT coronary artery does NOT give the anterior interventricular artery — that branch belongs to the left coronary artery — as the exception among otherwise true statements about the heart's arterial supply.",
      explanations: {
        A: "True, so not the exception (despite the bank's own unverified editorial key marking it as the answer). The department book states plainly that the right coronary artery 'arises from the anterior aortic sinus of the ascending aorta' (p.83) — a genuinely true statement, not the exception this EXCEPT-question is looking for.",
        B: "The exception, and the correct answer (overridden against the department book, p.86, which states the anterior interventricular artery 'descends with the great cardiac vein' as a branch of the LEFT, not the right, coronary artery). The right coronary artery's own terminal branch, given once it reaches the posterior coronary sulcus, is instead the posterior (inferior) interventricular artery — a different vessel entirely.",
        C: "True, so not the exception. The left marginal artery is indeed a branch of the circumflex artery, descending along the left aspect of the heart to supply the left ventricle down to the apex.",
        D: "True, so not the exception. The right marginal artery runs close to the inferior border of the heart towards the apex, accompanied by the small cardiac vein.",
        E: "True, so not the exception. The coronary arteries are considered functional end arteries, since the anastomoses between them are poor and inadequate for efficient collateral flow if a large branch is suddenly blocked.",
      },
      answerOverride: "B",
      answerOverrideReason: "The department anatomy book (pagetext.mjs, p.86, under the left coronary artery's own branches) states without qualification that the anterior interventricular artery 'descends with the great cardiac vein in the anterior interventricular groove' as a branch of the LEFT coronary artery — directly contradicting the bank's own unverified editorial key (A, 'the right coronary artery arises from the anterior aortic sinus', which the same book (p.83) independently confirms as TRUE, the opposite of what an EXCEPT-question's answer should be). Overridden to B, the department book's own stated exception.",
    },
    // Answer overridden against a directly re-verified department-book
    // page (p.89), per this branch's own answerOverride convention: the
    // bank's own externally-recovered answer (from a solved question book,
    // high confidence) credits the middle cardiac vein, but the department
    // book states plainly the great cardiac vein accompanies this artery.
    {
      key: "the-anterior-interventricular-artery-is-accompanied-by-46e16a29",
      conceptKey: "left-coronary-artery.branches-and-distribution",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "State that the anterior interventricular artery is accompanied by the great cardiac vein, not the middle, small or anterior cardiac vein or the coronary sinus.",
      explanations: {
        A: "The anterior cardiac veins are a separate set of 3-4 small veins on the right ventricle's own sternocostal surface that bypass the coronary sinus entirely, unrelated to the anterior interventricular artery's own course.",
        B: "Correct (overridden against the department book, p.89, which states the great cardiac vein 'ascends in anterior interventricular groove in company with anterior interventricular artery'). The great cardiac vein begins near the apex on the sternocostal surface and ascends alongside this artery through the whole of the anterior interventricular groove, before curving back in the coronary sulcus to join the coronary sinus's own left end.",
        C: "The coronary sinus itself lies in the posterior part of the coronary sulcus, receiving the great cardiac vein at its termination rather than running alongside the anterior interventricular artery through the groove.",
        D: "This is the bank's own externally-recovered (but incorrect) answer. The middle cardiac vein instead runs in the POSTERIOR (inferior) interventricular groove, in company with the posterior interventricular artery — a different vessel-artery pair on the opposite surface of the heart.",
        E: "The small cardiac vein runs close to the inferior border of the heart in company with the marginal branch of the right coronary artery, an entirely different course from the anterior interventricular groove.",
      },
      answerOverride: "B",
      answerOverrideReason: "The department anatomy book (pagetext.mjs, p.89) states without qualification that the great cardiac vein 'ascends in anterior interventricular groove in company with anterior interventricular artery', and separately (same page) that the middle cardiac vein 'runs backwards in the posterior (inferior) interventricular groove in company with the posterior (inferior) interventricular artery' — a different vessel pair on the opposite surface. The bank's own externally-recovered answer (D, middle cardiac vein) directly contradicts this directly re-verified page; overridden to B.",
    },
    {
      key: "one-of-the-followings-is-correct-concerning-the-coronary-sin-cbb41e7c",
      conceptKey: "coronary-venous-drainage.coronary-sinus-and-cardiac-veins",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the coronary sinus ends in the right atrium between the openings of the IVC and the right atrioventricular orifice, as opposed to incorrect length, position and origin statements.",
      explanations: {
        A: "The coronary sinus is a short, wide venous channel about 3-4 CENTIMETRES long, not 3-4 inches — a tenfold overstatement of its true length.",
        B: "The coronary sinus lies in the POSTERIOR part of the coronary sulcus, between the base of the heart and its diaphragmatic surface, not the anterior part.",
        C: "The coronary sinus begins as a continuation of the GREAT cardiac vein, not the middle cardiac vein, which is instead one of its four tributaries joining it partway along its own course.",
        D: "Correct. The coronary sinus ends by opening into the right atrium between the opening of the inferior vena cava and the right atrioventricular orifice, guarded by a small semilunar valve.",
      },
    },
    {
      key: "regarding-the-cardiac-veins-one-is-true-877d38e6",
      conceptKey: "coronary-venous-drainage.coronary-sinus-and-cardiac-veins",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the anterior cardiac vein ends in the right atrium directly, bypassing the coronary sinus, as opposed to incorrect statements about the great, middle and oblique veins.",
      explanations: {
        A: "The great cardiac vein accompanies the ANTERIOR interventricular artery, ascending in the anterior interventricular groove, not the posterior descending (inferior interventricular) artery — that pairing instead belongs to the middle cardiac vein.",
        B: "The middle cardiac vein ends by joining the CORONARY SINUS at its middle, not the right atrium directly — it is one of the sinus's own four tributaries, not one of the veins that bypasses it.",
        C: "Correct. The anterior cardiac veins are one of the two vein types that bypass the coronary sinus entirely, crossing the anterior coronary sulcus to open directly into the right atrium — 3-4 small veins lying on the right ventricle's own sternocostal surface.",
        D: "The oblique vein of the left atrium ends by joining the CORONARY SINUS near its left end, not the left atrium itself — despite descending on the back of the left atrium along its own course.",
      },
    },
    {
      key: "structures-passing-between-arch-0-pene-a-and-pulmonary-trunk-c8fde235",
      conceptKey: "pulmonary-trunk.origin-course-and-ligamentum-arteriosum",
      difficulty: "Moderate",
      questionType: "Comprehensive true/false combination",
      learningObjective: "State that the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve all occupy the space between the arch of the aorta and the pulmonary trunk.",
      explanations: {
        A: "True on its own: the ligamentum arteriosum, the obliterated fetal ductus arteriosus, is a flattened fibrous band running between the left pulmonary artery and the concavity of the aortic arch, directly in this space. Combined with B and C, this makes D the correct comprehensive answer.",
        B: "True on its own: the superficial cardiac plexus lies in the concavity of the aortic arch on the ligamentum arteriosum, on the ligament's own right anterior aspect.",
        C: "True on its own: the left recurrent laryngeal nerve hooks around the arch of the aorta immediately lateral to the ligamentum arteriosum, on its own left posterior aspect, before ascending in the tracheo-oesophageal groove.",
        D: "Correct. All three structures — the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve — genuinely occupy this same crowded space between the arch of the aorta and the pulmonary trunk, which is exactly why questions and clinical teaching (the recurrent laryngeal nerve's vulnerability during PDA ligation) treat them as a set rather than testing each in isolation.",
        E: "Incorrect, since A, B and C are each independently true — 'none of the above' cannot be right when real structures do occupy this space.",
      },
    },
    {
      key: "with-respect-to-the-cardiac-plexuses-one-is-true-1f95d468",
      conceptKey: "heart.nerve-supply-and-cardiac-plexuses",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the sympathetic fibres of both cardiac plexuses arise from the cervical and upper thoracic sympathetic ganglia, as opposed to incorrect superficial-plexus-position, deep-plexus-size and plexus-composition statements.",
      explanations: {
        A: "The superficial cardiac plexus lies in the concavity of the aortic arch, in front of the ligamentum arteriosum, not to its right — a subtly reversed position from the true relation.",
        B: "The deep cardiac plexus lies in front of the tracheal bifurcation, deep to the arch of the aorta, not in front of the ligamentum arteriosum — that position instead belongs to the superficial plexus.",
        C: "The cardiac plexuses carry both sympathetic AND parasympathetic (vagal) fibres together, not sympathetic fibres alone — the two divisions converge here before distributing to the heart.",
        D: "Correct. The sympathetic fibres of both cardiac plexuses arise from the cervical sympathetic ganglia and the upper four to five thoracic sympathetic ganglia, having relayed there after leaving the spinal cord's own upper thoracic segments — a shared origin for the sympathetic contribution to both plexuses.",
      },
    },
    {
      key: "regarding-the-heart-valves-which-of-the-followings-is-correc-af88156c",
      conceptKey: "cardiac-valve.surface-markings-cusp-counts-and-auscultatory-areas",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the pulmonary valve's surface projection lies at the level of the third left costal cartilage, as opposed to incorrect aortic-cusp-count, tricuspid-cusp-naming and mitral-level statements.",
      explanations: {
        A: "The aortic valve has THREE semilunar cusps (one anterior and two posterior), not two — a common undercount of the standard three-cusp semilunar-valve pattern shared by both the aortic and pulmonary valves.",
        B: "Correct. The pulmonary valve's surface marking is a horizontal line lying behind the third left costal cartilage at its junction with the sternum — the topmost of the four valve projections in the department book's own PAMT (Pulmonary, Aortic, Mitral, Tricuspid) surface-marking sequence.",
        C: "The tricuspid valve's three cusps are named anterior, posterior and SEPTAL, not 'medial' — the septal cusp lies against the interventricular septum, matching the right ventricle's own septal papillary muscle.",
        D: "The mitral valve's surface projection lies opposite the FOURTH left sternocostal junction, not the sixth — one full valve-level below the pulmonary valve in the PAMT sequence, not two.",
      },
    },
    {
      key: "the-pulmonary-valve-sound-is-best-heard-at-indicate-the-corr-22983fbe",
      conceptKey: "cardiac-valve.surface-markings-cusp-counts-and-auscultatory-areas",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the pulmonary valve's sound is heard best at the second left sternocostal junction (its auscultatory area), not at its own anatomical surface projection or another valve's auscultatory area.",
      explanations: {
        A: "The third left sternocostal junction is the pulmonary valve's own anatomical surface projection, not its auscultatory area — the department book states explicitly that a valve's sound is not heard best over its own anatomical position, because of how sound propagates through the tissues.",
        B: "Correct. Because of the mechanics of sound propagation, the pulmonary valve's closure sound is heard best not over its own surface marking but at its separate auscultatory area, the second left sternocostal junction — one intercostal space above the valve's own anatomical projection.",
        C: "The second right sternocostal junction is the AORTIC valve's own auscultatory area, its mirror-image partner across the sternum, not the pulmonary valve's.",
        D: "The apex of the heart is the MITRAL valve's own auscultatory area, reflecting where its sound is transmitted along the direction of blood flow into the left ventricle — not the pulmonary valve's.",
        E: "The right half of the lower sternum approximates the TRICUSPID valve's own auscultatory area (more precisely, the xiphisternal junction), not the pulmonary valve's.",
      },
    },
  ],
}
