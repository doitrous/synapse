package com.nishany.android.core.practical

/**
 * The two practical lists that are not published content at all: the Skills
 * checklist and the Oral question bank.
 *
 * Ported verbatim, ids included, from `src/data/practical.ts`'s `skills` and
 * `oralQuestions` arrays -- the ids are what `nishany.practical.progress.v1`
 * keys a student's skill status under (see [PracticalProgress]), so an id
 * invented here would record a status no other client will ever read back.
 *
 * This is a second copy of that data, not a synchronised one: nothing here
 * detects or reacts to the web file changing. See this task's report for
 * that consequence -- no sync mechanism is built in this milestone.
 */
data class Skill(val id: String, val name: String, val category: String)

data class OralQuestion(
    val id: String,
    val subjectId: String,
    val topic: String,
    val question: String,
    val modelAnswer: String,
)

/** `Skill.category` values, verbatim from the web's `Skill['category']` union. */
const val SKILL_CATEGORY_EXAMINATION = "Examination"
const val SKILL_CATEGORY_PROCEDURES = "Procedures"
const val SKILL_CATEGORY_COMMUNICATION = "Communication"

/** Ported verbatim from `src/data/practical.ts:68-81`. */
val PRACTICAL_SKILLS: List<Skill> = listOf(
    Skill("sk-bp", "Blood pressure measurement", SKILL_CATEGORY_EXAMINATION),
    Skill("sk-cvs", "Cardiovascular examination", SKILL_CATEGORY_EXAMINATION),
    Skill("sk-resp", "Respiratory examination", SKILL_CATEGORY_EXAMINATION),
    Skill("sk-abdo", "Abdominal examination", SKILL_CATEGORY_EXAMINATION),
    Skill("sk-vene", "Venepuncture", SKILL_CATEGORY_PROCEDURES),
    Skill("sk-cann", "IV cannulation", SKILL_CATEGORY_PROCEDURES),
    Skill("sk-ecg", "ECG recording", SKILL_CATEGORY_PROCEDURES),
    Skill("sk-cath", "Urinary catheterisation", SKILL_CATEGORY_PROCEDURES),
    Skill("sk-bls", "Basic life support", SKILL_CATEGORY_PROCEDURES),
    Skill("sk-consent", "Explaining a procedure & consent", SKILL_CATEGORY_COMMUNICATION),
    Skill("sk-breaking", "Breaking bad news", SKILL_CATEGORY_COMMUNICATION),
    Skill("sk-handover", "Structured handover (SBAR)", SKILL_CATEGORY_COMMUNICATION),
)

/** Ported verbatim from `src/data/practical.ts:100-124`. */
val PRACTICAL_ORAL_QUESTIONS: List<OralQuestion> = listOf(
    OralQuestion(
        id = "or-hf-1", subjectId = "cvs", topic = "Heart failure",
        question = "Define heart failure and classify it by ejection fraction.",
        modelAnswer = "Heart failure is a clinical syndrome in which the heart cannot deliver output sufficient for metabolic demand at normal filling pressures. By ejection fraction it is classified as HFrEF (≤40%), HFmrEF (41–49%), and HFpEF (≥50%).",
    ),
    OralQuestion(
        id = "or-hf-2", subjectId = "cvs", topic = "Heart failure",
        question = "What are the four pillars of prognostic therapy in HFrEF?",
        modelAnswer = "ARNI (or ACE inhibitor/ARB), a beta-blocker, a mineralocorticoid receptor antagonist, and an SGLT2 inhibitor. They are started early at low dose and up-titrated together; they work by interrupting maladaptive compensation, not by inotropy.",
    ),
    OralQuestion(
        id = "or-acs-1", subjectId = "cvs", topic = "Acute coronary syndromes",
        question = "How do you distinguish STEMI, NSTEMI, and unstable angina?",
        modelAnswer = "By the 12-lead ECG and serial troponin. STEMI has persistent ST elevation (or new LBBB) with troponin rise; NSTEMI has a troponin rise without ST elevation; unstable angina has ischaemic symptoms without a troponin rise.",
    ),
    OralQuestion(
        id = "or-asth-1", subjectId = "resp", topic = "Asthma",
        question = "What spirometric finding supports a diagnosis of asthma?",
        modelAnswer = "Reversible airflow obstruction — a ≥12% (and ≥200 mL) improvement in FEV₁ after a bronchodilator — supported by diurnal peak-flow variability, raised FeNO, and eosinophilia.",
    ),
    OralQuestion(
        id = "or-asth-2", subjectId = "resp", topic = "Asthma",
        question = "Why is SABA-only reliever therapy discouraged?",
        modelAnswer = "It relieves bronchospasm but leaves airway inflammation untreated, and frequent SABA use is associated with a higher risk of severe exacerbations. Modern guidelines centre inhaled corticosteroids, increasingly as ICS-formoterol reliever therapy.",
    ),
    OralQuestion(
        id = "or-ab-1", subjectId = "renal", topic = "Acid–base balance",
        question = "Describe a structured approach to interpreting an arterial blood gas.",
        modelAnswer = "Five steps: read the pH (acidaemia/alkalaemia); identify the primary respiratory (CO₂) or metabolic (HCO₃⁻) driver; assess whether compensation is appropriate; calculate the anion gap in a metabolic acidosis; then interpret in the clinical context.",
    ),
    OralQuestion(
        id = "or-diur-1", subjectId = "pharm", topic = "Diuretics",
        question = "Classify diuretics by their site of action along the nephron.",
        modelAnswer = "Loop diuretics act on the Na-K-2Cl cotransporter in the thick ascending limb (most potent); thiazides block Na-Cl in the distal convoluted tubule; potassium-sparing agents/MRAs act in the collecting duct; carbonic anhydrase inhibitors act proximally.",
    ),
    OralQuestion(
        id = "or-cn-1", subjectId = "neuro", topic = "Cranial nerves",
        question = "What does forehead sparing indicate in a facial nerve palsy?",
        modelAnswer = "An upper motor neurone lesion. The forehead receives bilateral cortical input, so it is spared in a UMN lesion but involved in a lower motor neurone (Bell) palsy, which affects the whole half of the face.",
    ),
    OralQuestion(
        id = "or-gi-1", subjectId = "gi", topic = "Abdominal examination",
        question = "How would you present the signs of chronic liver disease found on examination?",
        modelAnswer = "Peripheral: leuconychia, clubbing, palmar erythema, Dupuytren's, spider naevi, gynaecomastia. Abdominal: distension, caput medusae, splenomegaly, ascites (shifting dullness). Complete by assessing for encephalopathy (asterixis) and jaundice.",
    ),
    OralQuestion(
        id = "or-endo-1", subjectId = "endo", topic = "Diabetes",
        question = "How is diabetes mellitus diagnosed biochemically?",
        modelAnswer = "Fasting glucose ≥7.0 mmol/L, random/2-hour OGTT glucose ≥11.1 mmol/L, or HbA1c ≥48 mmol/mol (6.5%). In an asymptomatic patient the abnormal result should be confirmed on a second occasion.",
    ),
)
