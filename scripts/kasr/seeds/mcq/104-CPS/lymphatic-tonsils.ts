import type { McqLeafSeed } from '../../mcq.ts'

// Caveat (kasr-104-author-run38): an older hand-authored batch,
// docs/Kasr-Source-Imports/question/104-CPS-mcq-authored.md, already tests
// four of this leaf's bank keys verbatim (grepped by "Bank key <key>" before
// authoring, per the lane's Tonsils caveat) — re-authoring them here would
// duplicate the live question. Excluded below rather than re-authored:
// all-characters-of-palatine-tonsil-except-42969d66 (QM-104-BF5BA2F445EA),
// choose-the-correct-statement-about-pharyngeal-tonsil-fce585ae (QM-104-9948FB540FC6),
// concerning-palatine-tonsils-which-of-the-following-is-correc-2b7b1204 (QM-104-AC97FD7732A3),
// the-lingual-tonsils-are-not-commonly-inflamed-because-84653f3a (QM-104-5D6AC044C4D9).
export const LEAF: McqLeafSeed = {
  leaf: "Lymphatic and Macrophage System — Tonsils",
  modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
  articleId: "ART-104-HIS-LYMPHOID-ORGANS",

  concepts: [
    // Pinned outside mintConceptId in docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md
    // (CON-HEM-093013026B640A) — declared here with the identical canonical_key
    // so resolveConceptId reuses that id and emits a sparse update row.
    {
      key: "tonsil.palatine-epithelium-crypts-and-deep-capsule",
      label: "The palatine tonsil is stratified squamous epithelium dipping in as crypts, nodules arranged around them, and dense connective tissue on the deep aspect only",
      definition: "The palatine tonsils are paired ovoid masses of lymphoid tissue in the lateral wall of the oropharynx. The free surface is covered by non-keratinized stratified squamous epithelium which dips down into the lymphatic tissue as tonsillar crypts, in which bacteria, desquamated cells, phagocytic cells and lymphocytes accumulate. The lymphatic tissue is lymphatic nodules, with or without germinal centres, arranged around the crypts, together with diffuse lymphatic tissue. Deeper than the lymphatic tissue is dense connective tissue forming an incomplete capsule, and mucous glands lie in that connective tissue with ducts opening on the surface, not at the bases of the crypts, so debris is not washed out and crypt inflammation is common.",
      objective: "Identify a palatine tonsil on a stained section, name its covering epithelium and the invaginations it forms, and describe the arrangement of the nodules and the position of the capsule.",
      pitfall: "Reading a crypt as a sinus, or assuming the palatine tonsil's mucous gland ducts flush its crypts the way the lingual tonsil's do — the palatine tonsil's ducts open on the surface, outside the crypts, which is exactly why its crypts trap debris and inflame often.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
      type: "structural_description",
      aliases: ["Histological structure of the palatine tonsil", "Tonsillar crypts", "Palatine tonsil"],
    },
    // Pinned outside mintConceptId (CON-HEM-23C119B7E783BD) — same reuse mechanism.
    {
      key: "tonsil.pharyngeal-site-epithelium-and-absent-crypts",
      label: "The pharyngeal tonsil is a single midline nasopharyngeal mass with folded respiratory epithelium and no crypts",
      definition: "The pharyngeal tonsil is a single mass of lymphoid tissue at the midline, under the mucous membrane of the nasopharynx. Its epithelium is folded and is pseudostratified columnar ciliated with goblet cells. It has no crypts, and it has an incomplete connective tissue capsule. Hypertrophy of the pharyngeal tonsil results in adenoids.",
      objective: "Identify the pharyngeal tonsil from its site, its covering epithelium and the absence of crypts, and name what its hypertrophy produces.",
      pitfall: "Explaining away the missing crypts as a tangential section of a palatine tonsil, or assuming every tonsil is paired. The pseudostratified ciliated columnar epithelium with goblet cells settles the site: this is nasopharynx, where the tonsil is single, midline and has no crypts to miss.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
      type: "structural_description",
      aliases: ["Pharyngeal tonsil", "Adenoids", "Nasopharyngeal tonsil"],
    },
    {
      key: "tonsil.lingual-crypts-no-capsule-and-continuous-flushing",
      label: "The lingual tonsil is non-keratinized stratified squamous epithelium over multiple non-capsulated masses whose gland ducts open at the base of the crypts, continuously flushing them, so inflammation is uncommon",
      definition: "The lingual tonsils are multiple masses of lymphoid tissue at the base of the tongue, covered with non-keratinized stratified squamous epithelium — the same epithelium type as the palatine tonsil, not the pseudostratified columnar epithelium of the pharyngeal tonsil — which dips down to form crypts. Each mass is formed of lymphatic nodules and diffuse lymphatic tissue, and, unlike the palatine tonsil, the lingual tonsil has no connective-tissue capsule at all. Its mucous gland ducts open into the bases of the crypts, giving continuous washing that keeps debris and organisms from accumulating, which is why lingual tonsillitis is the uncommon exception rather than the rule the palatine tonsil follows.",
      objective: "State the lingual tonsil's covering epithelium, its non-capsulated structure, and why its crypt-flushing duct arrangement makes it inflame less often than the palatine tonsil.",
      pitfall: "Assigning the pharyngeal tonsil's pseudostratified columnar epithelium to the lingual tonsil, or assuming 'adenoid' hypertrophy applies to any enlarged tonsil rather than the pharyngeal tonsil specifically, which this book alone names as the source of adenoids.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
      type: "structural_description",
      aliases: ["Lingual tonsil", "Tonsillar crypts (lingual)"],
    },
    {
      key: "tonsil.epithelium-comparison-across-the-three-types",
      label: "Palatine and lingual tonsils share non-keratinized stratified squamous epithelium with crypts; the pharyngeal tonsil alone, sited in the respiratory-epithelium-lined nasopharynx, has folded pseudostratified ciliated columnar epithelium with goblet cells and no crypts",
      definition: "Of the three tonsil types, the palatine and lingual tonsils are both covered by non-keratinized stratified squamous epithelium that dips down to form crypts, matching the general oropharyngeal lining around them. The pharyngeal tonsil is the exception: sited under the mucous membrane of the nasopharynx — the uppermost, first part of the pharynx, lined by respiratory (ciliated, mucus-secreting) epithelium — it shares that same folded pseudostratified columnar ciliated epithelium with goblet cells, and has no crypts at all, only folds.",
      objective: "State which two tonsil types share non-keratinized stratified squamous epithelium, and which one instead carries the nasopharynx's own pseudostratified ciliated columnar epithelium with goblet cells and no crypts.",
      pitfall: "Assuming all three tonsil types share one epithelium. The pharyngeal tonsil's epithelium follows its nasopharyngeal site, not the oropharyngeal pattern the palatine and lingual tonsils share.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
      type: "structural_description",
      aliases: ["Tonsil epithelium comparison", "Nasopharynx"],
    },
    {
      key: "tonsil.clinical-tonsillitis-and-regional-lymphadenitis",
      label: "Tonsillitis is a palatine-tonsil disease, treated surgically by removing the palatine tonsils, and, like any local infection, it can inflame the regional (draining) lymph nodes",
      definition: "The palatine tonsil is often infected (tonsillitis), a common cause of sore throat; repeated infections lead to its enlargement and it becomes a focus of infection, for which tonsillectomy — surgical removal of the palatine tonsils — is the standard treatment. Because the palatine tonsils are open, crypt-bearing lymphoid tissue exposed to the oropharynx with mucous-gland ducts that do not flush their crypts, they trap bacteria and debris and inflame far more often than the lingual or pharyngeal tonsils. As with any local infection, tonsillitis can lead to lymphadenitis of the regional (draining) lymph nodes — the cervical nodes that drain the oropharynx — consistent with the general rule that infection in a body region enlarges and inflames the nodes that drain it.",
      objective: "State that 'tonsillectomy' means surgical removal of the palatine tonsils specifically, and that local infection such as tonsillitis can inflame the regional lymph nodes draining that area.",
      pitfall: "Assuming tonsillectomy removes the lingual or pharyngeal tonsils, or that a child's acute (infectious) tonsillitis would produce metastatic lymph nodes — a finding that implies malignancy, not infection.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
      type: "clinical_correlation",
      aliases: ["Tonsillitis", "Tonsillectomy", "Regional lymphadenitis"],
    },
    // Pinned outside mintConceptId (declared identically in
    // lymphatic-lymph-node.ts within this same module build; the two leaves'
    // occurrences merge into one concept, per build-batches.ts's cross-leaf
    // concept dedup).
    {
      key: "lymphatic-organs.primary-vs-secondary-classification",
      label: "Thymus and bone marrow are the primary (central) lymphatic organs, where lymphocytes are produced — the thymus specifically producing CD4+ and CD8+ T-lymphocytes — while lymph nodes, spleen and tonsils are secondary (peripheral) organs, where mature lymphocytes mount immune responses",
      definition: "Lymphatic tissue is organised into primary (central) and secondary (peripheral) lymphatic organs. The primary organs are the thymus and bone marrow, the sites where lymphocytes are produced: the thymus is a primary lymphoid organ with an endocrine function, of double origin (mesodermal, giving lymphocytes; endodermal, giving epithelial reticular cells), whose cortex and medulla complete T-lymphocyte production and maturation, including the CD4+ and CD8+ T-lymphocyte populations, before they seed the peripheral organs. The secondary organs are the lymph nodes, spleen and tonsils, where those already-produced lymphocytes encounter antigen and mount the immune response.",
      objective: "Classify thymus and bone marrow as primary (central) lymphatic organs and lymph node, spleen and tonsil as secondary (peripheral) ones, and state that CD4+/CD8+ T-lymphocyte production is a primary-organ (thymic) function.",
      pitfall: "Attributing a primary-organ function (production of new lymphocytes, including CD4+/CD8+ T-cells) to a secondary organ such as a tonsil. Secondary organs act on lymphocytes already produced elsewhere; they do not produce them.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: [],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Tonsils",
      type: "classification",
      aliases: ["Primary lymphatic organs", "Secondary lymphatic organs", "Central vs peripheral lymphoid organs"],
    },
  ],

  questions: [
    {
      key: "all-characters-of-lingual-tonsil-except-0ee201de",
      conceptKey: "tonsil.lingual-crypts-no-capsule-and-continuous-flushing",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the lingual tonsil's covering is non-keratinized stratified squamous epithelium, not pseudostratified columnar.",
      explanations: {
        A: "The exception, and the answer. The lingual tonsil is lined by non-keratinized stratified squamous epithelium, the same type as the palatine tonsil — pseudostratified columnar epithelium is the pharyngeal tonsil's covering instead, not the lingual tonsil's. Confusing the two epithelium types across tonsils is one of the most common ways this topic is mis-answered.",
        B: "As printed, 'adenoid' names the pharyngeal tonsil's hypertrophy specifically in this book; taken as a lingual tonsil character it is not as directly and doubly confirmed by the book as option A's epithelium mismatch, so it is not preferred as the exception here.",
        C: "True, so not the exception. The lingual tonsil has crypts and is non-capsulated — it has no connective tissue capsule at all, unlike the palatine tonsil.",
        D: "True as read. Each lingual tonsil follicle is itself a single mass of lymphatic tissue, one of the multiple such masses at the base of the tongue.",
      },
      answerOverride: "A",
      answerOverrideReason: "The printed key (B) is less well supported than A. Histology department book p22 states the lingual tonsil is 'covered with non-keratinized stratified squamous epithelium' — directly contradicting option A's 'Pseudostratified Columnar', which is instead the pharyngeal tonsil's covering (p23). This same squamous-vs-columnar distinction is independently confirmed by the sibling bank row non-keratinized-stratified-squamous-epithelium-is-the-coveri-a6b12974, whose printed answer credits squamous epithelium to 'Palatine and lingual tonsils' specifically. A is therefore the option most directly and doubly contradicted by the source, and is used as the exception instead of the printed B.",
    },
    {
      key: "choose-the-correct-statement-about-pharyngeal-tonsil-0-9929dd81",
      conceptKey: "tonsil.pharyngeal-site-epithelium-and-absent-crypts",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the pharyngeal tonsil's covering epithelium is pseudostratified columnar with goblet cells, against distractors naming crypts, oropharynx or a digestive-only function.",
      explanations: {
        A: "The pharyngeal tonsil has no crypts — it has folds instead; tonsillar crypts are a feature of the palatine and lingual tonsils.",
        B: "Correct. The pharyngeal tonsil's covering epithelium is pseudostratified columnar with goblet cells, matching the respiratory-type mucosa of the nasopharynx that surrounds it. This is the one epithelium type among the three tonsils that follows the respiratory, rather than the oropharyngeal, pattern.",
        C: "The pharyngeal tonsil sits in the nasopharynx, not the lateral wall of the oropharynx — that site belongs to the palatine tonsil instead.",
        D: "The book states tonsils generally protect both the digestive and respiratory systems against invaders; singling out only the digestive system understates the pharyngeal tonsil's role in the respiratory pathway it directly sits within.",
      },
    },
    {
      key: "choose-the-correct-statement-about-the-palatine-tonsil-7961b87c",
      conceptKey: "tonsil.palatine-epithelium-crypts-and-deep-capsule",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the palatine tonsil consists of lymphatic nodules and diffuse lymphatic tissue, against distractors misplacing its site, epithelium or capsule.",
      explanations: {
        A: "The palatine tonsil sits under the mucous membrane of the oropharynx, not the nasopharynx — the nasopharynx is where the pharyngeal tonsil sits instead.",
        B: "The palatine tonsil is covered by non-keratinized stratified squamous epithelium, not pseudostratified columnar ciliated epithelium — that covering belongs to the pharyngeal tonsil.",
        C: "Correct. The palatine tonsil's lymphatic tissue consists of lymphatic nodules (with or without germinal centres) arranged around the crypts, together with diffuse lymphatic tissue. Both components sit deep to the surface epithelium and superficial to the incomplete capsule.",
        D: "The palatine tonsil has only an incomplete capsule, on its deep aspect, not a complete one surrounding it — there is no capsule at all on its free, epithelium-covered surface.",
      },
    },
    {
      key: "nasopharynx-04301511",
      conceptKey: "tonsil.epithelium-comparison-across-the-three-types",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the nasopharynx is the first part of the pharynx, lined by respiratory epithelium and containing the pharyngeal tonsil and mucous glands.",
      explanations: {
        A: "True, so not the single answer alone. The nasopharynx is the uppermost, first part of the pharynx, continuous below with the oropharynx.",
        B: "True, so not the single answer alone. The nasopharynx is lined by respiratory-type (pseudostratified ciliated columnar) epithelium, matching the epithelium of the pharyngeal tonsil it contains.",
        C: "True, so not the single answer alone. The nasopharynx contains mucous glands in its wall and houses the pharyngeal tonsil under its mucous membrane.",
        D: "Correct. All three statements are true of the nasopharynx together, so 'all the above' is the answer that credits each of them. Its position, epithelium and contents are consistent with one another: a first, uppermost pharyngeal segment lined by the same respiratory epithelium as the tonsil and glands it houses.",
      },
    },
    {
      key: "non-keratinized-stratified-squamous-epithelium-is-the-coveri-a6b12974",
      conceptKey: "tonsil.epithelium-comparison-across-the-three-types",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that non-keratinized stratified squamous epithelium covers both the palatine and lingual tonsils, not the pharyngeal tonsil.",
      explanations: {
        A: "True of the palatine tonsil alone, so not the most complete answer — the lingual tonsil shares this same epithelium and is left out if this option alone is chosen.",
        B: "True of the lingual tonsil alone, so not the most complete answer — the palatine tonsil shares this same epithelium and is left out if this option alone is chosen.",
        C: "The pharyngeal tonsil is covered by pseudostratified columnar ciliated epithelium with goblet cells, not non-keratinized stratified squamous epithelium — this option names the wrong tonsil type entirely.",
        D: "Correct. Both the palatine and lingual tonsils are covered by non-keratinized stratified squamous epithelium, distinguishing them from the pharyngeal tonsil's respiratory-type covering. Both also form crypts by this epithelium dipping inward, unlike the pharyngeal tonsil's folds.",
      },
    },
    {
      key: "the-pharyngeal-tonsils-are-covered-by-47e66976",
      conceptKey: "tonsil.pharyngeal-site-epithelium-and-absent-crypts",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that the pharyngeal tonsil is covered by pseudostratified ciliated columnar epithelium with goblet cells.",
      explanations: {
        A: "Simple squamous epithelium is not the pharyngeal tonsil's covering — that thin, single-layered epithelium suits diffusion surfaces, not a mucosa exposed to inhaled and swallowed antigen.",
        B: "Stratified squamous epithelium — keratinized or not — covers the palatine and lingual tonsils, not the pharyngeal tonsil.",
        C: "Correct. The pharyngeal tonsil's folded epithelium is pseudostratified ciliated columnar with goblet cells, matching the respiratory mucosa of the nasopharynx around it. Its folds, rather than crypts, are also what set it apart structurally from the palatine and lingual tonsils.",
        D: "This option describes an epithelium that is neither ciliated nor goblet-cell-bearing — a combination this book does not attribute to any tonsil, let alone the pharyngeal one.",
      },
    },
    {
      key: "a-10-year-old-child-had-frequent-acute-tonsillitis-his-mothe-d637af89",
      conceptKey: "tonsil.clinical-tonsillitis-and-regional-lymphadenitis",
      difficulty: "Moderate",
      questionType: "Clinical correlation",
      learningObjective: "State that tonsillectomy removes the palatine tonsils, the tonsil type that inflames often and is the surgical target of recurrent tonsillitis.",
      explanations: {
        A: "The book does not state a specific blood picture for tonsillitis; lymphocytosis is not established here as a defining feature of this case, and it is not the option best supported by the source.",
        B: "Tonsillectomy targets the palatine tonsils, not the lingual tonsils — the lingual tonsil's flushed, non-capsulated crypts make it the tonsil type that is rarely the surgical target of recurrent infection.",
        C: "Correct. Tonsillectomy is the surgical removal of the palatine tonsils, the tonsil type whose crypts trap debris (ducts open on the surface, not the crypt base) and that consequently inflames often enough to become 'a focus of infection' warranting removal. Neither the lingual tonsil (flushed crypts, uncommon inflammation) nor the pharyngeal tonsil (no crypts at all) is the tonsillectomy target this way.",
        D: "Reactive, infected lymphoid tissue forms secondary nodules with germinal centres in response to antigen exposure, not exclusively primary (unstimulated) nodules — repeated infection would be expected to increase secondary, not all-primary, nodule formation.",
      },
      answerOverride: "C",
      answerOverrideReason: "The printed key (D) is not supported by the book, which describes antigen exposure as converting primary nodules into secondary ones with germinal centres — the opposite of 'all lymphatic nodules are of the primary type' in a repeatedly infected tonsil. Histology department book p21-23's tonsillitis note ties recurrent infection and tonsillectomy specifically to the palatine tonsil ('Palatine tonsil is often infected (tonsillitis)... a common cause of sore throat. Repeated infections... its enlargement, and become a focus of infection'), and 'tonsillectomy' as a clinical term names removal of the palatine tonsils, making C the option the source most directly supports.",
    },
    {
      key: "a-7-year-old-child-came-to-the-pediatric-clinic-presenting-w-52cb44df",
      conceptKey: "tonsil.clinical-tonsillitis-and-regional-lymphadenitis",
      difficulty: "Moderate",
      questionType: "Clinical correlation",
      learningObjective: "State that local infection such as tonsillitis inflames the regional (draining) lymph nodes, against a distractor implying malignancy.",
      explanations: {
        A: "Correct. As with any local infection, acute tonsillitis is expected to inflame the regional lymph nodes draining the oropharynx (the cervical nodes) — matching the general rule that infection in a body region enlarges and inflames the nodes that drain it. This lymphadenitis is a normal, reactive response to infection, not a sign of anything more sinister.",
        B: "Metastatic lymph nodes imply spread of malignant cells, not an acute infectious process in a child — nothing in this vignette supports a malignant, rather than infectious, cause of node involvement.",
        C: "Eosinophilia is not the expected blood picture of acute (typically bacterial or viral) tonsillitis; it is associated with allergic or parasitic processes instead.",
        D: "Basophilia is likewise not an expected finding in acute tonsillitis and is not supported by this book as a feature of the case.",
      },
      answerOverride: "A",
      answerOverrideReason: "The printed key (B, metastatic lymph nodes) is medically inconsistent with the vignette — a child's acute tonsillitis is an infectious process, and metastatic nodes imply malignancy, not infection. The department book's own general principle (p18) is that local infection enlarges and inflames the regional lymph nodes draining that area (lymphadenitis); applied to tonsillitis, this supports A, which also matches this row's own sibling a7-year-old-child-came-to-the-pediatric-clinic-presenting-wi-c1adae6b, whose printed key is already A for the identical stem and options.",
    },
    {
      key: "a7-year-old-child-came-to-the-pediatric-clinic-presenting-wi-c1adae6b",
      conceptKey: "tonsil.clinical-tonsillitis-and-regional-lymphadenitis",
      difficulty: "Moderate",
      questionType: "Clinical correlation",
      learningObjective: "State that local infection such as tonsillitis inflames the regional (draining) lymph nodes, against a distractor implying malignancy.",
      explanations: {
        A: "Correct. As with any local infection, acute tonsillitis is expected to inflame the regional lymph nodes draining the oropharynx, matching the general rule that infection in a body region enlarges and inflames the nodes that drain it. This lymphadenitis is a normal, reactive response to infection, not a sign of anything more sinister.",
        B: "Metastatic lymph nodes imply malignant spread, not an acute infectious process in a child.",
        C: "Eosinophilia is not the expected blood picture of acute tonsillitis.",
        D: "Basophilia is likewise not supported by this book as a feature of acute tonsillitis.",
      },
    },
    {
      key: "a-patient-has-an-auto-immune-disease-it-may-be-due-to-a-defe-060829f0",
      conceptKey: "lymphatic-organs.primary-vs-secondary-classification",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the thymus is the primary lymphoid organ where lymphocytes are produced, so a defect there can underlie an autoimmune disease.",
      explanations: {
        A: "As printed, this option merges two organ names ('Lymph node b-spleen') into one string, likely an extraction artifact splicing two option letters together — but under either reading, both the lymph node and the spleen are secondary (peripheral) lymphoid organs, where already-produced lymphocytes act, not where they are produced.",
        C: "The palatine tonsil is a secondary (peripheral) lymphoid organ, where mature lymphocytes mount immune responses to antigen already reaching the oropharynx — not a site of lymphocyte production.",
        D: "Correct. The thymus is a primary (central) lymphoid organ, where T-lymphocytes are produced and complete their maturation before seeding the secondary organs — a defect at this production/maturation stage is a recognised route to autoimmune disease, unlike a defect in a secondary organ that only acts on lymphocytes already made elsewhere. A thymus that fails to properly select against self-reactive T-lymphocytes can release them into circulation instead of eliminating them.",
      },
    },

    // --- Already authored in docs/Kasr-Source-Imports/question/104-CPS-mcq-authored.md ---
    {
      key: "all-characters-of-palatine-tonsil-except-42969d66",
      conceptKey: "tonsil.palatine-epithelium-crypts-and-deep-capsule",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already authored as QM-104-BF5BA2F445EA ('Which palatine tonsil statement is false') in docs/Kasr-Source-Imports/question/104-CPS-mcq-authored.md, which names this exact bank key in its author_notes ('Bank key all-characters-of-palatine-tonsil-except-42969d66'). Re-authoring it here would duplicate a question already live against this same bank row; per the lane's Tonsils caveat, an already-authored fact is a sparse reuse, not a new question.",
    },
    {
      key: "choose-the-correct-statement-about-pharyngeal-tonsil-fce585ae",
      conceptKey: "tonsil.pharyngeal-site-epithelium-and-absent-crypts",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already authored as QM-104-9948FB540FC6 ('Which pharyngeal tonsil statement is correct') in docs/Kasr-Source-Imports/question/104-CPS-mcq-authored.md, which names this exact bank key in its author_notes ('Bank key choose-the-correct-statement-about-pharyngeal-tonsil-fce585ae'). Re-authoring it here would duplicate that live question.",
    },
    {
      key: "concerning-palatine-tonsils-which-of-the-following-is-correc-2b7b1204",
      conceptKey: "tonsil.palatine-epithelium-crypts-and-deep-capsule",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already authored as QM-104-AC97FD7732A3 ('Which palatine tonsil statement is correct') in docs/Kasr-Source-Imports/question/104-CPS-mcq-authored.md, which names this exact bank key in its author_notes ('Bank key concerning-palatine-tonsils-which-of-the-following-is-correc-2b7b1204'). Re-authoring it here would duplicate that live question.",
    },
    {
      key: "the-lingual-tonsils-are-not-commonly-inflamed-because-84653f3a",
      conceptKey: "tonsil.lingual-crypts-no-capsule-and-continuous-flushing",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already authored as QM-104-5D6AC044C4D9 ('Why lingual tonsils are rarely inflamed') in docs/Kasr-Source-Imports/question/104-CPS-mcq-authored.md, which names this exact bank key in its author_notes ('Bank key the-lingual-tonsils-are-not-commonly-inflamed-because-84653f3a'). Re-authoring it here would duplicate that live question.",
    },
    // kasr-104-author-run46: Tonsils cluster, this leaf's own 3 remaining
    // bank rows. Answer confidence "none" (no printed key) for all three —
    // checked directly against the department histology book
    // (src_18d3a953df4ca83c4e74) before authoring or excluding any of them.
    {
      key: "the-palatine-tonsil-is-characterized-by-c790a1a2",
      conceptKey: "tonsil.palatine-epithelium-crypts-and-deep-capsule",
      difficulty: "Moderate",
      questionType: "Single best answer",
      learningObjective: "State that the palatine tonsil's mucous-gland ducts open on the free surface, not into the crypt bases — the opposite of the lingual tonsil's arrangement — and identify this as why palatine tonsillitis is common.",
      explanations: {
        A: "Reversed: the department book states the palatine tonsil's free surface is covered by non-keratinized stratified squamous epithelium (p.22), the pharyngeal tonsil's own site (nasopharynx) that carries pseudostratified columnar epithelium instead.",
        B: "Wrong tonsil: hypertrophy producing adenoids is specifically a PHARYNGEAL-tonsil finding, stated by this leaf's own pharyngeal-tonsil concept — the palatine tonsil's own clinical correlate is tonsillitis and tonsillectomy, not adenoids.",
        C: "Reversed: the department book states the palatine tonsil has an incomplete connective-tissue capsule deep to its lymphatic tissue (p.22, also shown in the book's own labelled diagram) — it is the LINGUAL tonsil that has no capsule at all.",
        D: "Correct. The department book states plainly (p.22): 'Mucous glands are present in the C.T., their ducts open on the surface and not in the base of tonsillar crypts, so inflammation of crypts is common' — the opposite of the lingual tonsil's crypt-flushing arrangement, and exactly why the palatine tonsil is the one that inflames often.",
      },
      answerOverride: "D",
      answerOverrideReason: "No printed key exists in the bank (answerConfidence: none). Re-verified directly against the department histology book (src_18d3a953df4ca83c4e74, p.22, 'Histological Structure of palatine tonsil', point 4): 'Mucous glands are present in the C.T., their ducts open on the surface and not in the base of tonsillar crypts' — matching option D verbatim. The other three options are each independently contradicted by the same page and this leaf's own sourced concepts (A: wrong epithelium type, that of the pharyngeal tonsil; B: wrong tonsil for adenoids; C: the palatine tonsil does have an incomplete capsule, unlike the lingual tonsil). All four options resolve cleanly against the book with no ambiguity.",
    },
    {
      key: "blood-film-from-this-patient-may-present-eosinophilia-853347f0",
      conceptKey: "tonsil.clinical-tonsillitis-and-regional-lymphadenitis",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "A clinical-vignette fragment, not a standalone question: the surviving stem ('Blood film from this patient may present eosinophilia') presupposes a patient case never extracted, option D is itself a bled-in alternate stem ('...may present basophilia'), and option A is a bare three-way organ list ('Lymph node b-spleen c- Palatine tonsil') rather than a genuine answer choice. No printed key exists (answerConfidence: none), and none of this leaf's own sourced tonsil concepts covers haematology/blood-film findings at all — leaf-tagged Tonsils in the bank, bookkept here since it is unanswerable regardless of its true topic.",
    },
    {
      key: "divide-the-spleen-into-regular-compartments-lymphatic-system-61263f5a",
      conceptKey: "tonsil.clinical-tonsillitis-and-regional-lymphadenitis",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "A two-question bleed: the stem itself is a stray fragment of a DIFFERENT, already-elsewhere-excluded splenic-trabeculae question ('Divide the spleen into regular compartments'), run on directly into an unrelated numbered item ('22. Regarding Hassall's corpuscles...') whose own 4 options survive. No printed key exists (answerConfidence: none), and the genuine content (Hassall's corpuscles) is thymus histology, not tonsil content at all — leaf-tagged Tonsils in the bank, bookkept here since the stem itself cannot be shown to a student regardless of its true topic. The underlying Hassall's-corpuscle fact (concentric layers of epithelial reticular cells, located in the thymic medulla, not cortex) is already taught cleanly by this module's own thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions concept, so no unique teaching content is lost.",
    },
    {
      // kasr-104-author-run46: this leaf's own last remaining bank row
      // (ledger's second Tonsils batch, leaf=null in the raw bank).
      // Well-grounded (this is the department book's own verbatim
      // definition of the palatine tonsil), but a genuine option-merge
      // contract violation independent of grounding.
      key: "is-aggregation-of-lymph-tissue-with-incomplete-capsule-498c1c81",
      conceptKey: "tonsil.palatine-epithelium-crypts-and-deep-capsule",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option C has absorbed a separate option D into one merged cell ('spleen d) thymus'), leaving only 3 distinguishable choices (A, B, merged-C/D) for what should be a 4-option item. The underlying claim is well-grounded — the department histology book's own opening definition of the palatine tonsil is 'aggregation of lymphatic tissue, incompletely encapsulated' (p.21), confirming option A — but the missing standalone option D means this cannot be authored as a clean 4-option item per the platform's import contract. Excluded for the contract violation, not for lack of grounding; the same fact is already taught cleanly by this leaf's own tonsil.palatine-epithelium-crypts-and-deep-capsule questions.",
    },
  ],
}
