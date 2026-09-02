import type { McqLeafSeed } from '../../mcq.ts'

// Tested-but-untaught: the department book's own Gas Transport chapter (pages
// 124-134) does not carry a hypoxia classification, a cyanosis threshold or a
// carbon-monoxide-poisoning account — confirmed by a full re-read of the
// printed range, not assumed. Per the lane's own ruling, a minimal,
// exam-matched section has been added to ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
// itself, cited to a standard physiology textbook (Guyton & Hall) rather than
// the department book, and scoped to exactly what these bank rows ask — not a
// general hypoxia/cyanosis treatise. A separate, already-live Year-3
// pulmonology catalogue holds the fuller clinical treatment (central vs
// peripheral cyanosis, CO-poisoning management) and is not duplicated here.
export const LEAF: McqLeafSeed = {
  leaf: "Physiology Respiratory System — Gas Transport by the Blood",
  modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
  articleId: "ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT",

  concepts: [
    {
      key: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      label: "Hypoxia is classified by where the defect sits — hypoxic, anaemic, stagnant or histotoxic — and only the types with a normal total haemoglobin sitting unsaturated (hypoxic, stagnant) classically produce cyanosis; CO poisoning produces neither a fall in arterial PO2 nor cyanosis",
      definition: "Hypoxia is classified by mechanism. Hypoxic hypoxia is a fall in arterial PO2 itself (hypoventilation, diffusion defect, ventilation-perfusion mismatch, right-to-left shunt, or high altitude); arterial saturation falls with it. Anaemic hypoxia (too little haemoglobin) and histotoxic hypoxia (cells unable to use delivered oxygen) both leave arterial PO2 and % saturation normal. Stagnant (circulatory) hypoxia, from reduced blood flow, lets tissues extract more O2 per unit of blood that does pass. Cyanosis — bluish discolouration of skin and mucous membranes — classically appears once capillary blood contains more than 5 g of reduced (deoxygenated) haemoglobin per 100 ml, an absolute quantity rather than a percentage or saturation figure; this is why it is classically seen in hypoxic hypoxia and stagnant hypoxia (normal total haemoglobin, enough of it sitting unsaturated to cross the 5 g/dL threshold) but classically absent in anaemic hypoxia (too little total haemoglobin to reach that absolute threshold even fully desaturated) and in histotoxic hypoxia (blood remains normally saturated). Carbon monoxide poisoning produces neither a fall in arterial PO2 (so it is not itself hypoxic hypoxia) nor cyanosis: CO's roughly 200-fold greater affinity for haemoglobin than O2 means carboxyhaemoglobin, not reduced haemoglobin, accumulates, giving the classic cherry-red rather than blue skin colour. Oxygen therapy is correspondingly of limited value in stagnant hypoxia (a flow problem, not an oxygen-content one) and in histotoxic hypoxia such as cyanide poisoning (a cellular-use problem): supplemental O2 raises dissolved and Hb-bound O2 further, which cannot compensate for a pump or a poisoned enzyme.",
      objective: "Name the four mechanisms of hypoxia, state the absolute (not percentage) threshold for cyanosis, and explain why carbon monoxide poisoning produces neither a fall in arterial PO2 nor cyanosis.",
      pitfall: "Assuming any severe hypoxia produces cyanosis. Cyanosis depends on an ABSOLUTE quantity of reduced haemoglobin (>5 g/dL) being present, which is why profound anaemic hypoxia and CO poisoning — both of which leave too little reduced (as opposed to carboxy-) haemoglobin to cross that threshold — can be severely hypoxic without ever appearing cyanosed.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
      type: "classification",
      aliases: ["Types of hypoxia", "Cyanosis threshold", "Carbon monoxide poisoning", "Cherry-red skin", "Stagnant hypoxia", "Histotoxic hypoxia"],
      gaps: ["The department book's own Gas Transport chapter does not teach this classification; sourced instead to a standard physiology textbook (Guyton & Hall) at minimal, exam-matched scope — see the article's own evidence_gaps field."],
    },
  ],

  questions: [
    {
      key: "cyanosis-1-60b08503",
      conceptKey: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "Attribute cyanosis to severe ventilation-perfusion imbalance — a form of hypoxic hypoxia with normal total haemoglobin available to sit unsaturated.",
      explanations: {
        A: "States the standard threshold figure for cyanosis (reduced haemoglobin exceeding roughly 5 g/100 ml capillary blood), but on its own names only the number, not a clinical setting — the question is testing which SITUATION reliably produces that threshold being crossed, which option D names directly and unambiguously.",
        B: "Histotoxic hypoxia leaves arterial blood normally oxygenated — the defect is in the tissue's ability to use the oxygen delivered to it, not in how much reduced haemoglobin is circulating — so it is not classically accompanied by cyanosis.",
        C: "Carbon monoxide poisoning does not produce cyanosis: CO's much higher affinity for haemoglobin than O2 means carboxyhaemoglobin accumulates instead of reduced haemoglobin, giving a cherry-red rather than blue discolouration.",
        D: "This is the correct answer. Severe ventilation-perfusion imbalance is a form of hypoxic hypoxia — arterial PO2 and saturation fall while total haemoglobin remains normal — which is exactly the combination that lets enough reduced haemoglobin accumulate to cross the cyanosis threshold, unlike anaemic, histotoxic hypoxia or CO poisoning.",
      },
    },
    {
      key: "cyanosis-3ce6dbd2",
      conceptKey: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "Attribute cyanosis to severe ventilation-perfusion imbalance, the same reasoning as its sibling row.",
      explanations: {
        A: "States the standard threshold figure for cyanosis, but names only the number rather than a clinical setting — the question is testing which situation reliably crosses that threshold, which option D names directly.",
        B: "Histotoxic hypoxia leaves arterial blood normally oxygenated, so there is no excess reduced haemoglobin for cyanosis to appear — the defect is purely in the tissue's ability to use the oxygen it receives.",
        C: "Carbon monoxide poisoning produces carboxyhaemoglobin, not reduced haemoglobin, and so gives a cherry-red rather than a cyanosed appearance despite genuine tissue hypoxia.",
        D: "This is the correct answer. Severe ventilation-perfusion imbalance — a form of hypoxic hypoxia — lowers arterial PO2 and saturation while total haemoglobin stays normal, exactly the combination needed for enough reduced haemoglobin to accumulate and cross the cyanosis threshold.",
      },
    },
    {
      key: "hypoxic-hypoxia-3-7fa250af",
      conceptKey: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that hypoxic hypoxia is classically accompanied by cyanosis.",
      explanations: {
        A: "This describes anaemic or histotoxic hypoxia, not hypoxic hypoxia — hypoxic hypoxia is defined by a LOW arterial PO2 and low haemoglobin saturation, the opposite of what this option states.",
        B: "This is the correct answer. Hypoxic hypoxia leaves total haemoglobin normal while lowering its saturation, so enough reduced haemoglobin accumulates to cross the cyanosis threshold — hypoxic hypoxia is one of the two mechanisms (with stagnant hypoxia) classically accompanied by visible cyanosis.",
        C: "Carbon monoxide poisoning leaves arterial PO2 normal — CO occupies haemoglobin's binding sites without lowering dissolved O2 — so it is not itself an instance of hypoxic hypoxia, which is defined by a fall in arterial PO2.",
        D: "Low haemoglobin content describes anaemic hypoxia, a separate category — hypoxic hypoxia by definition has a normal total haemoglobin, just an abnormally low fraction of it saturated with oxygen.",
      },
    },
    {
      key: "hypoxic-hypoxia-b97facbb",
      conceptKey: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that hypoxic hypoxia is classically accompanied by cyanosis, the same reasoning as its sibling row.",
      explanations: {
        A: "Hypoxic hypoxia is defined by a LOW arterial oxygen tension and low haemoglobin saturation — this option instead describes a hypoxia type with normal blood gases, such as anaemic or histotoxic hypoxia.",
        B: "This is the correct answer. With total haemoglobin normal but its saturation reduced, hypoxic hypoxia lets enough reduced haemoglobin build up to cross the cyanosis threshold, making it (with stagnant hypoxia) one of the two mechanisms classically accompanied by visible cyanosis.",
        C: "Carbon monoxide poisoning does not lower arterial PO2 — it displaces O2 from haemoglobin's binding sites without changing dissolved O2 — so it is not a form of hypoxic hypoxia by definition.",
        D: "A low haemoglobin content describes anaemic hypoxia, a distinct category from hypoxic hypoxia, which by definition has normal total haemoglobin and only an abnormally low fraction of it saturated.",
      },
    },
    {
      key: "oxygen-therapy-is-of-limited-value-in-which-of-the-following-4b8eb82e",
      conceptKey: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "State that supplemental O2 has limited value in stagnant hypoxia and in histotoxic hypoxia such as cyanide poisoning, since neither is a problem of insufficient oxygen reaching the blood.",
      explanations: {
        A: "Acute respiratory distress syndrome is a form of hypoxic hypoxia (severe ventilation-perfusion mismatch and shunting); raising inspired O2 still increases the oxygen available to whatever alveoli remain adequately perfused and ventilated, so it retains meaningful (if sometimes incomplete) value — unlike the two situations named in D, where the defect lies entirely beyond how much oxygen the blood carries.",
        B: "Correct as one half of the answer (see D). In stagnant (circulatory) hypoxia the defect is a reduced rate of blood flow, not insufficient oxygen content in the blood that does flow — raising inspired O2 cannot substitute for restoring flow.",
        C: "Correct as the other half of the answer (see D). Cyanide poisoning is a form of histotoxic hypoxia — the cells cannot use the oxygen delivered to them because cytochrome oxidase is blocked — so supplemental O2 cannot correct the underlying defect.",
        D: "This is the correct answer. Oxygen therapy is of limited value precisely where the problem lies beyond how much oxygen reaches or is dissolved in the blood: stagnant hypoxia (B, a flow problem) and histotoxic hypoxia such as cyanide poisoning (C, a cellular-use problem). Both differ fundamentally from hypoxic or anaemic hypoxia, where raising the oxygen actually delivered (or, in anaemia, at least its partial pressure and dissolved fraction) still helps.",
      },
    },

    // --- Excluded: corrupted or unrecoverable beyond what this pipeline can fix ---

    {
      key: "all-of-the-followings-are-correct-as-regards-cyanosis-except-1cb68242",
      conceptKey: "hypoxia.classification-cyanosis-and-carbon-monoxide-poisoning",
      difficulty: "Hard",
      questionType: "Not sittable as printed.",
      learningObjective: "Not sittable as printed.",
      explanations: {},
      exclude: true,
      excludeReason: "Options B (\"Only T lymphocytes\") and C (\"No Plasma cells\") are unrelated lymph-node-histology fragments that have contaminated this row during extraction — neither is a statement about cyanosis at all, and the bank's own answer (C) points at one of those two contaminated options rather than at any genuine cyanosis claim. With half the option set not belonging to the question's own topic, no coherent single-answer determination can be made; the row's genuine cyanosis content (option A, the >5 g/dL reduced-Hb threshold, and option D, cyanosis's link to hypoxic hypoxia) is already covered cleanly by the sibling rows cyanosis-1-60b08503 and cyanosis-3ce6dbd2.",
    },
  ],
}
