import type { McqLeafSeed } from '../../mcq.ts'

// run44 — this leaf's own bank rows (tagged "Basic Mechanisms of
// Circulatory Control") were left deliberately unclaimed by run36/41/43 as
// out of scope for that leaf's own pinned article
// (ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL, which explicitly covers
// only the chemoreceptor/CNS-ischaemic/Cushing reflexes). Checked the
// department book directly (src_a11a7faed67c95e2d636) rather than
// re-trusting that scope call at face value: pp.65-70 (endothelium
// substances — NO, endothelin, prostacyclin; RAS formation and receptors),
// p.78 (carotid sinus syndrome) and pp.82-84 (long-term BP regulation via
// RAS) cover this material in full — the book supports it, the prior scope
// call was about that OTHER article's own summary, not a source gap — in
// fact ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL's own evidence_gaps already
// names this exact material ("The book names further vasoactive hormones
// (angiotensin II, vasopressin, natriuretic peptides, kinins, endothelium-
// derived NO/endothelin/prostacyclin) in this same chapter that are not
// covered by this article for reasons of scope") — so this run extends
// that same article with new sections rather than minting a new one,
// following the precedent set by the Gas Transport article's own
// hypoxia/cyanosis/CO-poisoning section addition (bdcb7e72). find-
// existing.mjs "renin angiotensin", "nitric oxide vasodilator", "carotid
// sinus syndrome", "angiotensin II receptor AT1 AT2", "vasoconstrictor
// vasodilator circulating hormones" — 0 hits each, all fresh mints below.
export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Endothelium and Vasoactive Hormones",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
  articleId: "ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL",

  concepts: [
    {
      key: "nitric-oxide.production-mechanism-and-hypertension-link",
      label: "Endothelial nitric oxide, synthesised from L-arginine by eNOS and acting through smooth-muscle cGMP, is a short-lived local vasodilator whose deficiency contributes to chronic hypertension",
      definition: "Nitric oxide (NO) is produced continuously by endothelial cells, via the action of endothelial nitric oxide synthase (eNOS) on the amino acid L-arginine. Its half-life is short (about 6 seconds) and it is rapidly inactivated by haemoglobin in blood, so it acts mainly locally, near its site of release. Shear stress from increased blood flow, acetylcholine (itself released by endothelial cells in response to shear stress), and the inflammatory mediators bradykinin and histamine all raise NO secretion; some vasoconstrictors such as angiotensin II also raise NO release, blunting their own vasoconstriction. NO acts on vascular smooth muscle in a paracrine fashion, activating guanylate cyclase to convert GTP to cyclic GMP; cGMP activates protein kinase G, which relaxes the myocyte. cGMP is degraded by phosphodiesterase-5 (PDE-5) — the target of PDE-5 inhibitors such as sildenafil, which prolong NO's vasodilator effect and are used both for penile erectile dysfunction (NO being the mediator of penile arteriolar vasodilation) and, by extension, illustrate how disrupting NO's degradation raises vasodilation. NO also inhibits platelet aggregation and contributes to coronary, cerebral and pulmonary flow regulation. Chronic hypertension and atherosclerosis can damage the endothelium and impair NO synthesis, worsening vasoconstriction and hypertension further; conversely, a primary deficiency of NO synthesis (eNOS knockout animals become hypertensive) can itself cause chronic hypertension, since a vasodilator tone is lost from the vasculature.",
      objective: "State how NO is synthesised (eNOS on L-arginine), its short half-life and paracrine, cGMP-mediated mechanism, its physiological stimuli (shear stress, acetylcholine, bradykinin, histamine), and that a deficiency of NO synthesis contributes to chronic hypertension.",
      pitfall: "Confusing NO's second messenger (cGMP, via guanylate cyclase) with cAMP, or its substrate (L-arginine) with another amino acid such as leucine — both substitutions appear as distractors in this leaf's own bank. Also assuming adrenaline/catecholamines stimulate NO synthase directly — the book's own listed stimuli are shear stress, acetylcholine, bradykinin and histamine, not circulating catecholamines.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Nitric oxide", "Endothelium-derived relaxing factor", "eNOS", "NO and hypertension"],
    },
    {
      key: "vasoactive-hormones.circulating-vasoconstrictor-and-vasodilator-classification",
      label: "The circulating hormones acting on the vasculature split into vasoconstrictors — angiotensin II, epinephrine, norepinephrine and vasopressin — and vasodilators — kinins and natriuretic peptide",
      definition: "Beyond the local (metabolic) and nervous mechanisms controlling arteriolar diameter, a systemic humoral mechanism uses circulating hormones with opposite vascular actions. The vasoconstrictor hormones are angiotensin II, epinephrine, norepinephrine and vasopressin. The vasodilator hormones are kinins (such as bradykinin) and natriuretic peptides (such as atrial natriuretic peptide). This classification sits alongside — and explains the same overall balance as — the local vasodilator metabolites (CO2, H+, adenosine) this module's own active-hyperaemia/autoregulation concept teaches, and the vasoconstrictor action of angiotensin II specifically underlies why a local rise in its concentration produces systemic arteriolar constriction.",
      objective: "Sort angiotensin II, epinephrine, norepinephrine and vasopressin as circulating vasoconstrictor hormones, and kinins and natriuretic peptide as circulating vasodilator hormones.",
      pitfall: "Assuming every circulating mediator with a vascular role is a vasoconstrictor, or misclassifying kinins (vasodilator, not vasoconstrictor) the way this leaf's own bank tests directly.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Vasoconstrictor hormones", "Vasodilator hormones", "Humoral regulation of vascular tone"],
    },
    {
      key: "renin-angiotensin-system.formation-secretion-triggers-and-long-term-role",
      label: "Renin from the juxtaglomerular apparatus cleaves hepatic angiotensinogen to angiotensin I, which ACE converts to angiotensin II, and renin secretion — raised by hypovolaemia, renal ischaemia, reduced distal Na+ delivery and sympathetic stimulation, not by hypertension — makes the RAS a major long-term regulator of arterial pressure",
      definition: "Renin is secreted by the juxtaglomerular apparatus of the kidney, a proteolytic enzyme that acts on angiotensinogen (secreted by the liver, not the juxtaglomerular apparatus itself) to form the decapeptide angiotensin I; angiotensin-converting enzyme (ACE), found in vascular endothelial cells especially of the lung, then converts angiotensin I to the octapeptide angiotensin II. Renin secretion rises with hypovolaemia and hypotension, renal ischaemia (e.g. renal artery stenosis), decreased Na+ delivery to the distal tubule, and sympathetic stimulation via β1 receptors — not with hypertension, which instead suppresses it through the same feedback logic in reverse. Angiotensin II raises arterial pressure acutely by direct vasoconstriction and increased sympathetic discharge, and its downstream effect on aldosterone secretion (from the adrenal cortex) reduces renal Na+ and water excretion; because that renal fluid-retaining action takes minutes to hours to develop and persists for as long as the stimulus does, angiotensin II — unlike the baroreceptor and chemoreceptor reflexes, which act within seconds — is one of the mechanisms responsible for intermediate-to-long-term regulation of arterial blood pressure.",
      objective: "State the RAS cascade (renin on hepatic angiotensinogen to angiotensin I; ACE to angiotensin II), the stimuli that raise renin secretion, and why angiotensin II is classed with the long-term rather than the immediate-reflex mechanisms of blood pressure regulation.",
      pitfall: "Swapping which organ secretes which precursor — angiotensinogen is hepatic, renin is renal (juxtaglomerular). Also assuming hypertension itself raises renin secretion, when the book's own list of triggers is hypovolaemia/hypotension, renal ischaemia, reduced distal Na+ delivery and sympathetic stimulation — the opposite direction.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Renin-angiotensin system", "RAS", "Renin secretion triggers", "Long-term blood pressure regulation"],
    },
    {
      key: "angiotensin-ii-receptors.at1-and-at2-actions",
      label: "AT1 receptors, widespread in adult tissue, mediate angiotensin II's vasoconstriction, aldosterone secretion and Na+/water retention, while the more limited AT2 receptors counterbalance AT1 with vasodilatation, diuresis and natriuresis",
      definition: "Angiotensin II acts through two receptor types. AT1 receptors have a widespread adult tissue distribution and mediate most of angiotensin II's actions: peripheral vasoconstriction of arterioles and veins, aldosterone secretion from the adrenal cortex (which increases distal tubular Na+ reabsorption), direct stimulation of renal tubular Na+ reabsorption, inhibition of renin secretion (negative feedback), increased sympathetic discharge and catecholamine secretion, vasopressin secretion, stimulation of thirst, and cardiac/vascular hypertrophy. AT2 receptors are much more limited in adult tissue and mediate effects that counterbalance AT1: vasodilatation, diuresis (increased renal water excretion), natriuresis (increased renal Na+ excretion) and apoptosis. So stimulating AT1 does everything except promote diuresis and natriuresis — that is what AT2 stimulation does instead.",
      objective: "Contrast the AT1 receptor's actions (vasoconstriction, aldosterone/Na+ retention, sympathetic and vasopressin drive, thirst, hypertrophy) against the AT2 receptor's opposing actions (vasodilatation, diuresis, natriuresis, apoptosis).",
      pitfall: "Assuming AT1 and AT2 share the same direction of effect because they are both angiotensin II receptors. AT2 is specifically described as counterbalancing AT1 — diuresis and natriuresis are AT2 actions, the opposite of AT1's Na+/water-retaining, vasoconstrictor profile.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["AT1 receptor", "AT2 receptor", "Angiotensin II receptor subtypes"],
    },
    {
      key: "carotid-sinus-syndrome.mechanism-and-management",
      label: "Carotid sinus syndrome is an acquired hypersensitivity of the carotid sinus baroreceptors, not a normal finding in young people, in which mild external pressure triggers marked bradycardia and hypotension that can require denervation or a pacemaker",
      definition: "In carotid sinus syndrome, the carotid sinus baroreceptors are abnormally sensitive, so external pressure that would be trivial in a normal person — a tight collar, or the pressure of shaving — activates the baroreceptor reflex strongly enough to produce marked bradycardia and a fall in arterial pressure, which can cause cerebral ischaemia and fainting. This is an acquired hypersensitivity, not a normal variant seen especially in young adults; severe or recurrent cases may need denervation of the hypersensitive carotid sinus or implantation of a permanent artificial cardiac pacemaker to manage the resulting bradycardia.",
      objective: "State that carotid sinus syndrome is abnormal baroreceptor hypersensitivity (not a normal young-adult finding), that trivial external pressure triggers bradycardia/hypotension/syncope through the same baroreceptor reflex arc, and that management can require denervation or a pacemaker.",
      pitfall: "Treating carotid sinus syndrome as a normal physiological variant seen especially in young, healthy people — it is an acquired abnormal sensitivity, and the book's own account frames it as a condition, one severe enough to sometimes need denervation or a permanent pacemaker.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Carotid sinus syndrome", "Carotid sinus hypersensitivity"],
    },
    // run44 — leaf-mismatch reroute: these two bank rows are tagged "A-V
    // Connections" (that leaf's ledger tag is known unreliable — see
    // coverage/104-CPS-LEDGER.md's own note), but the fact each tests
    // (shock-type causes, refractory-shock mechanisms) is squarely in this
    // same department-book chapter and article (pp.85-90) already extended
    // above with a new "Circulatory shock" clinical paragraph. find-
    // existing.mjs "anaphylactic shock histamine vasodilation" / "refractory
    // hemorrhagic shock mechanisms" — 0 hits each, fresh mints.
    {
      key: "circulatory-shock.types-and-etiology",
      label: "Anaphylactic, septic and neurogenic shock share a vasodilatory mechanism — histamine, bacterial toxins, and lost vasomotor tone respectively — distinct from cardiogenic shock's primary pump failure",
      definition: "Circulatory shock is inadequate tissue perfusion, and its causes fall into distinct mechanistic groups. Anaphylactic shock follows an excessive allergic reaction that releases histamine, a strong vasodilator, producing marked vasodilation. Septic shock follows severe infection releasing bacterial toxins that are themselves strong vasodilators. Neurogenic shock follows loss of vasomotor tone — from brain damage affecting the vasomotor area, deep general anaesthesia, or high spinal anaesthesia. Cardiogenic shock, by contrast, follows primary pump failure rather than inappropriate vasodilation. Because the underlying defect in anaphylactic and neurogenic shock specifically is inappropriate vasodilation, vasopressor drugs (which raise arterial pressure to maintain coronary and cerebral flow) are particularly useful in both.",
      objective: "Name histamine (anaphylactic), bacterial toxins (septic), and lost vasomotor tone (neurogenic) as the three vasodilatory causes of shock, distinct from cardiogenic shock's primary pump failure, and state why vasopressors specifically suit the vasodilatory types.",
      pitfall: "Treating all types of shock as sharing one mechanism. Anaphylactic, septic and neurogenic shock are all fundamentally vasodilatory (excess vasodilation lowering resistance and pressure), while cardiogenic shock is a primary pump problem — a distinction that determines which treatment (vasopressors versus inotropes/pump support) actually fits.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Anaphylactic shock", "Septic shock", "Neurogenic shock", "Types of circulatory shock"],
    },
    {
      key: "refractory-hemorrhagic-shock.mechanisms-and-outcome",
      label: "Refractory (irreversible) shock is a self-worsening state where cardiac output stays low even after blood volume is restored, driven by rising capillary filtration, granulocyte-released free radicals, bacterial toxin entry, and positive-feedback cerebral and cardiac ischaemia",
      definition: "Some patients with severe haemorrhage progress to refractory (irreversible) shock: the shock state persists for hours, becomes resistant to treatment, and death eventually follows even if blood volume is fully restored to normal, because cardiac output stays low regardless. Three groups of mechanism drive this. First, rising capillary hydrostatic pressure drives excessive fluid filtration out of the vessels, further lowering blood volume, while granulocytes adhering to injured capillary walls release free oxygen radicals that cause more tissue damage, and bacteria entering the blood through injured vessels release toxins that are themselves strong vasodilators. Second, severe cerebral ischaemia, from the marked fall in arterial pressure, causes failure of the medullary vasomotor centre, which lowers arterial pressure further in a deadly positive-feedback loop. Third, severe cardiac ischaemia, from that same fall in pressure, further lowers cardiac output despite coronary vasodilation, again in a self-worsening loop — so the defect is no longer simply 'too little blood', which is why restoring volume alone cannot reverse it.",
      objective: "State that refractory shock features persistently low cardiac output despite full volume restoration, and name its three mechanism groups: rising capillary filtration/granulocyte damage/bacterial toxin entry, cerebral-ischaemia vasomotor-centre failure, and cardiac-ischaemia output failure, each running as a positive-feedback loop.",
      pitfall: "Assuming refractory shock is reversed once blood volume is restored to normal — cardiac output stays low regardless, because self-worsening cerebral- and cardiac-ischaemia feedback loops, capillary damage and bacterial toxin release have by then taken over as the dominant problem, not hypovolaemia itself.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Refractory shock", "Irreversible shock", "Progressive hemorrhagic shock"],
    },
  ],

  questions: [
    {
      key: "concerning-nitric-oxide-no-the-following-are-true-except-a9c985aa",
      conceptKey: "nitric-oxide.production-mechanism-and-hypertension-link",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Identify that NO synthase is stimulated by shear stress and acetylcholine, not by adrenaline, alongside its L-arginine substrate and cGMP-mediated mechanism.",
      explanations: {
        A: "True, so not the exception. NO is formed from L-arginine by the action of endothelial NO synthase (eNOS).",
        B: "True, so not the exception. NO causes vascular smooth muscle relaxation by activating guanylate cyclase, which raises cGMP.",
        C: "The exception, and the answer. The book's own list of stimuli that activate eNOS and raise NO production is shear stress, acetylcholine, and bradykinin/histamine — adrenaline is not among them; some vasoconstrictors including angiotensin II do raise NO release, but that is a separate point from adrenaline specifically stimulating synthesis.",
        D: "True, so not the exception. Acetylcholine (released by endothelial cells in response to shear stress) and shear stress itself both increase NO synthase activity.",
      },
    },
    {
      key: "nitric-oxide-25204420",
      conceptKey: "nitric-oxide.production-mechanism-and-hypertension-link",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that a failure of NO synthesis contributes to the development of hypertension.",
      explanations: {
        A: "NO is synthesised in vascular endothelium from the amino acid L-arginine, not leucine.",
        B: "NO produces vascular smooth muscle relaxation via cGMP (through guanylate cyclase), not cAMP.",
        C: "NO is released from vascular endothelial cells, not from vascular smooth muscle itself.",
        D: "This is the correct answer. Chronic hypertension and atherosclerosis can damage the endothelium and impair NO synthesis, and a primary deficiency of NO synthesis itself can cause hypertension — animals lacking the eNOS enzyme become hypertensive, since a vasodilator tone the vasculature depends on is lost.",
      },
    },
    {
      key: "the-following-are-true-regarding-no-except-870b8ec2",
      conceptKey: "nitric-oxide.production-mechanism-and-hypertension-link",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Identify that NO induces vasodilation by raising cGMP, not cAMP, alongside its production pathway and its acetylcholine/shear-stress stimuli.",
      explanations: {
        A: "True, so not the exception. NO is produced by the action of NO synthase on L-arginine in endothelial cells.",
        B: "True, so not the exception. Acetylcholine activates the NO synthase enzyme (via shear-stress-triggered endothelial acetylcholine release).",
        C: "The exception, and the answer. NO induces vasodilation of blood vessels by activating guanylate cyclase and raising cGMP, not cAMP — the same substitution this leaf's own nitric-oxide concept flags as a common distractor.",
        D: "True, so not the exception. Shear stress increases NO production (flow-induced vasodilatation).",
      },
    },
    {
      key: "a-decrease-in-which-would-cause-chronic-hypertension-f762e6fe",
      conceptKey: "nitric-oxide.production-mechanism-and-hypertension-link",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify that a decrease in nitric oxide, unlike a decrease in renal sympathetic activity, aldosterone or angiotensin II, causes chronic hypertension because it removes a vasodilator tone.",
      explanations: {
        A: "A decrease in renal sympathetic nerve activity would lower, not raise, sympathetically driven vasoconstriction and renin release — it would tend to lower arterial pressure, not cause hypertension.",
        B: "A decrease in aldosterone would increase renal Na+ and water loss, lowering blood volume and arterial pressure — the opposite of causing hypertension.",
        C: "A decrease in angiotensin II would remove a vasoconstrictor and reduce aldosterone-driven Na+/water retention, lowering arterial pressure rather than raising it.",
        D: "This is the correct answer. Nitric oxide is a vasodilator; a decrease in its synthesis removes that vasodilator tone, permitting excessive vasoconstriction. The department book states this directly: deficiency of NO can cause hypertension, and animals lacking the eNOS enzyme become hypertensive.",
      },
    },
    {
      key: "about-mediators-and-vasoactive-substances-all-of-the-followi-ac96f885",
      conceptKey: "vasoactive-hormones.circulating-vasoconstrictor-and-vasodilator-classification",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Sort norepinephrine, angiotensin II and vasopressin as circulating vasoconstrictors and kinins as a vasodilator, not a vasoconstrictor.",
      explanations: {
        A: "True, so not the exception. Norepinephrine is one of the book's own listed circulating vasoconstrictor hormones.",
        B: "The exception, and the answer. Kinins are listed among the vasodilator hormones, not the vasoconstrictors — the opposite of this statement.",
        C: "True, so not the exception. Angiotensin II is one of the listed circulating vasoconstrictor hormones.",
        D: "True, so not the exception. Catecholamines (epinephrine, norepinephrine) and vasopressin are all listed as circulating vasoconstrictor substances.",
      },
    },
    {
      key: "systemic-arteriolar-constriction-may-result-from-an-increase-fdd3c641",
      conceptKey: "vasoactive-hormones.circulating-vasoconstrictor-and-vasodilator-classification",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify angiotensin II, not nitric oxide, atrial natriuretic peptide or hydrogen ions, as a substance whose rise causes systemic arteriolar constriction.",
      explanations: {
        A: "Nitric oxide is a vasodilator, produced locally by the endothelium — a rise in its local concentration causes vasodilation, not constriction.",
        B: "This is the correct answer. Angiotensin II is one of the book's own listed circulating vasoconstrictor hormones, producing peripheral vasoconstriction of arterioles and veins via AT1 receptors.",
        C: "Atrial natriuretic peptide is one of the listed vasodilator hormones — a rise in its concentration lowers, not raises, vascular resistance.",
        D: "Hydrogen ions are a vasodilator metabolite of active tissue (part of active hyperaemia), not a vasoconstrictor — a local rise dilates, rather than constricts, the arterioles.",
      },
    },
    {
      key: "all-about-renin-angiotensin-system-is-correct-except-28636919",
      conceptKey: "renin-angiotensin-system.formation-secretion-triggers-and-long-term-role",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Identify that angiotensinogen is secreted by the liver, not the juxtaglomerular apparatus, which instead secretes renin.",
      explanations: {
        A: "True, so not the exception. The RAS is stimulated following blood loss, since hypovolaemia and hypotension raise renin secretion.",
        B: "The exception, and the answer. Angiotensinogen is secreted by the liver, not the juxtaglomerular apparatus — the juxtaglomerular apparatus secretes renin, the enzyme that then acts on hepatic angiotensinogen.",
        C: "True, so not the exception. Angiotensin II promotes aldosterone secretion from the adrenal cortex via AT1 receptors.",
        D: "True, so not the exception. Angiotensin II can stimulate vasoconstriction via AT1 receptors.",
      },
    },
    {
      key: "renhin-is-released-in-the-following-conditions-except-1690beb3",
      conceptKey: "renin-angiotensin-system.formation-secretion-triggers-and-long-term-role",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Identify hypertension, not salt restriction, dehydration or sympathetic stimulation, as the condition that does not raise renin secretion.",
      explanations: {
        A: "True, so not the exception. Salt restriction lowers Na+ delivery to the distal tubule, one of the book's own listed triggers that raises renin secretion.",
        B: "True, so not the exception. Dehydration causes hypovolaemia and hypotension, one of the book's own listed triggers that raises renin secretion.",
        C: "True, so not the exception. Sympathetic stimulation raises renin secretion via β1 adrenoceptors, as the book states directly.",
        D: "The exception, and the answer. Hypertension is not one of the book's listed renin-raising triggers — a raised, not lowered, arterial pressure and renal perfusion instead suppresses renin secretion through the same feedback logic in reverse.",
      },
    },
    {
      key: "long-term-regulation-of-arterial-blood-pressure-is-done-by-4e2ec8e0",
      conceptKey: "renin-angiotensin-system.formation-secretion-triggers-and-long-term-role",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify the renin-angiotensin system, not the baroreceptor or chemoreceptor reflexes, as the mechanism responsible for long-term arterial pressure regulation.",
      explanations: {
        A: "Baroreceptors are a rapid, second-to-second reflex mechanism, not a long-term one — their discharge itself resets (adapts) over one to two days of a sustained pressure change, so they are not the book's own long-term regulator.",
        B: "Chemoreceptors, like baroreceptors, are a rapid reflex mechanism engaging within seconds, not a long-term regulator of arterial pressure.",
        C: "This is the correct answer. The department book states directly that angiotensin II has an important role in long-term regulation of arterial blood pressure, acting by decreasing renal Na+/water excretion and increasing aldosterone secretion — effects that build and persist over minutes to days, unlike the immediate baroreceptor and chemoreceptor reflexes.",
        D: "Not correct, since baroreceptors and chemoreceptors are rapid reflexes, not long-term regulators — only the renin-angiotensin system among the three options fits the book's own long-term classification.",
      },
    },
    {
      key: "stimalation-of-angiotensin-ii-receptors-at1-produce-all-exce-7cf8d5ad",
      conceptKey: "angiotensin-ii-receptors.at1-and-at2-actions",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Identify diuresis and natriuresis as AT2, not AT1, receptor actions.",
      explanations: {
        A: "True, so not the exception. AT1 receptor stimulation causes peripheral vasoconstriction of arterioles and veins.",
        B: "True, so not the exception. AT1 receptor stimulation stimulates renal tubular Na+ and water reabsorption directly.",
        C: "True, so not the exception. AT1 receptor stimulation causes aldosterone secretion from the adrenal cortex.",
        D: "The exception, and the answer. Diuresis and natriuresis are AT2 receptor actions, which counterbalance AT1 — AT1 stimulation instead promotes Na+/water retention, the opposite direction.",
      },
    },
    {
      key: "stimulation-of-angiotensin-ii-receptors-at-2-produce-a2994df9",
      conceptKey: "angiotensin-ii-receptors.at1-and-at2-actions",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that AT2 receptor stimulation produces diuresis and natriuresis, the actions that counterbalance AT1.",
      explanations: {
        A: "Vasoconstriction is an AT1, not AT2, receptor action — AT2 stimulation instead produces vasodilatation.",
        B: "Renal Na+ and water reabsorption is an AT1, not AT2, receptor action — AT2 stimulation instead produces diuresis, the opposite direction.",
        C: "Aldosterone secretion is an AT1, not AT2, receptor action.",
        D: "This is the correct answer. AT2 receptor stimulation produces diuresis (increased renal water excretion) and natriuresis (increased renal Na+ excretion), counterbalancing AT1's vasoconstrictor, Na+/water-retaining profile.",
      },
    },
    {
      key: "as-regard-carotid-sinus-syndrome-all-of-the-following-is-cor-11f1b928",
      conceptKey: "carotid-sinus-syndrome.mechanism-and-management",
      difficulty: "Moderate",
      questionType: "True/false-except",
      learningObjective: "Identify that carotid sinus syndrome is an acquired hypersensitivity, not a normal finding especially in young adults.",
      explanations: {
        A: "The exception, and the answer. Carotid sinus syndrome is not a normal finding especially in young adults — it is an acquired hypersensitivity of the carotid sinus baroreceptors, treated in the book as an abnormal condition.",
        B: "True, so not the exception. Slight pressure on the hypersensitive carotid sinus (e.g. a tight collar or shaving) leads to marked bradycardia, hypotension and can cause loss of consciousness through cerebral ischaemia.",
        C: "True, so not the exception. Denervation of the hypersensitive carotid sinus is one of the treatments the book names for severe or recurrent cases.",
        D: "True, so not the exception. The defining feature of the syndrome is that the carotid sinus is abnormally sensitive to pressure.",
      },
    },
    {
      key: "during-anaphylactic-shock-release-of-which-substance-causes-87214129",
      conceptKey: "circulatory-shock.types-and-etiology",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that histamine, not bradykinin, nitric oxide or atrial natriuretic peptide, is the substance released in anaphylactic shock that causes vasodilation and increased capillary permeability.",
      explanations: {
        A: "This is the correct answer. Anaphylactic shock follows an excessive allergic reaction that releases histamine — a strong vasodilator — producing marked vasodilation; histamine is also well known to raise capillary permeability, the combination that drives anaphylaxis's characteristic hypotension and tissue swelling.",
        B: "Bradykinin is a vasodilator kinin involved in inflammation and in raising NO secretion from the endothelium, but it is histamine, not bradykinin, that the department book names specifically as the mediator released in anaphylactic shock.",
        C: "Nitric oxide is a vasodilator secreted continuously by the endothelium and raised further by shear stress, acetylcholine, bradykinin and histamine — it is a downstream/parallel mediator of vasodilation, not itself the substance whose release defines anaphylactic shock.",
        D: "Atrial natriuretic peptide is a vasodilator hormone secreted in response to atrial stretch (raised blood volume), an entirely different trigger from the allergic reaction that defines anaphylactic shock.",
      },
    },
    {
      key: "which-of-the-following-is-characteristic-of-progressive-refr-ce2af6fc",
      conceptKey: "refractory-hemorrhagic-shock.mechanisms-and-outcome",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "Identify endotoxin (bacterial toxin) release as a genuine mechanism of progressive/refractory hemorrhagic shock, as opposed to increased contractility, decreased permeability, or increased active transport, all of which move the wrong direction.",
      explanations: {
        A: "The opposite happens: cardiac output stays low in refractory shock (myocardial ischaemia from the persistently low arterial pressure impairs, rather than increases, cardiac contractility), part of why the state is self-worsening and resistant to treatment.",
        B: "The opposite happens: granulocytes adhering to injured capillary walls release free oxygen radicals that cause tissue damage, which tends to raise, not decrease, capillary permeability, compounding fluid loss from the vasculature.",
        C: "This is the correct answer. Bacteria are able to enter the blood through injured vessels in refractory shock, and the bacterial toxins released are themselves strong vasodilators — endotoxin release is one of the department book's own named mechanisms driving the state's characteristic resistance to treatment and persistently low cardiac output.",
        D: "The opposite happens: ischaemia from the low-flow state impairs ATP-dependent active transport (such as the Na+-K+ ATPase) rather than increasing it, since the ATP needed to drive these pumps is itself in short supply during ischaemia.",
      },
    },
  ],
}
