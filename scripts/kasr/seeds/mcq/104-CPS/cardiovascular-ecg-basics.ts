import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Electrocardiogram Basics",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
  // No 104-CPS-scoped article teaching ECG waveform interpretation exists
  // yet (grepped docs/Kasr-Source-Imports/article/104-CPS-physiology.md for
  // "Electrocardiogram"/"ECG" titles: no hit). The one ECG article that does
  // exist, SYS-CVS-ARTICLE-T09, belongs to the cross-university Systems-view
  // pipeline (moduleIds carries no 104 CPS entry) — same "different
  // pipeline, no safe reuse path" situation this branch has documented
  // repeatedly for cross-catalogue overlaps (see cardiovascular-av-
  // connections-histology.ts). ART-104-PHY-CARDIAC-CONDUCTION is the
  // closest real, live-module article — its own aliases already name
  // "AV nodal delay" and its evidence covers conduction velocity through
  // the system whose depolarization the ECG waveforms record — used here
  // with the gap below recorded rather than silently assumed.
  articleId: "ART-104-PHY-CARDIAC-CONDUCTION",

  concepts: [
    {
      // Fresh mint. find-existing.mjs "ECG P wave QRS complex T wave
      // electrophysiological correlate" -> "Safe to create one."
      key: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      label: "The ECG's P wave records atrial depolarization, the QRS complex records ventricular depolarization, and the T wave records ventricular repolarization, while atrial repolarization has no visible wave of its own because it is buried inside the QRS complex",
      definition: "Each deflection on a normal ECG tracing corresponds to a specific electrical event of the cardiac cycle. The P wave is produced by atrial depolarization. The QRS complex is produced by ventricular depolarization; because the ventricular mass is far larger than the atrial mass, it is also the largest deflection on the tracing. The T wave is produced by ventricular repolarization. Atrial repolarization does occur, but it produces no visible wave of its own: its small electrical signal happens at the same time as — and is completely masked by — the much larger QRS complex.",
      objective: "Match each ECG wave (P, QRS, T) to the electrical event it records, and state that atrial repolarization has no visible wave because it coincides with, and is masked by, the QRS complex.",
      pitfall: "Assuming every phase of the cardiac cycle's electrical activity has its own visible ECG wave. Atrial repolarization genuinely happens but produces no wave a reader can see, because its small signal is swamped by the much larger, simultaneously occurring QRS complex.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "structural_description",
      aliases: ["P wave", "QRS complex", "T wave", "Atrial repolarization (hidden)"],
      gaps: [
        "This leaf's own articleId (ART-104-PHY-CARDIAC-CONDUCTION) does not itself state the P/QRS/T-to-event correlation or the atrial-repolarization-masking fact; it covers autonomic control, conduction velocity and refractoriness instead. No 104-CPS-scoped article currently teaches ECG waveform interpretation directly — flagged for a future 104 CPS physiology-article-authoring pass, same class of gap as the Purkinje-fibre histology concept documented in cardiovascular-conducting-system-histology.ts.",
      ],
    },
    {
      // Fresh mint. find-existing.mjs "ST segment QT interval PR segment
      // ECG timing" -> "Safe to create one."
      key: "ecg.intervals-and-segments.pr-qt-st-timing",
      label: "The PR segment marks the AV nodal delay between atrial and ventricular depolarization, the QT interval spans the whole of ventricular depolarization and repolarization, and the ST segment marks the fully depolarized, isoelectric plateau of the ventricles",
      definition: "Three named intervals/segments on the ECG mark specific timing relationships. The PR segment is the isoelectric stretch after the P wave ends and before the QRS complex begins — it represents the delay between atrial depolarization finishing and ventricular depolarization starting, produced mainly by the slow conduction through the AV node. The QT interval runs from the start of the Q wave to the end of the T wave, representing the total time taken for both depolarization and repolarization of the ventricular muscle. The ST segment runs from the end of the QRS complex to the start of the T wave; it is normally isoelectric (flat at baseline) because the ventricles are, at that moment, completely and uniformly depolarized, corresponding to the plateau phase of the ventricular myocyte action potential.",
      objective: "Define the PR segment, QT interval and ST segment by their start/end points and the electrical event each one represents, and state that the ST segment is normally isoelectric because the ventricles are fully depolarized at that point.",
      pitfall: "Confusing the PR SEGMENT (isoelectric gap between P and QRS, representing the AV delay alone) with the PR INTERVAL (start of P to start of QRS, which also includes the P wave's own duration) — the two are not the same measurement, and a question asking for the time between atrial and ventricular depolarization specifically wants the segment, not the interval.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "structural_description",
      aliases: ["PR segment", "QT interval", "ST segment", "AV nodal delay (ECG correlate)"],
      gaps: [
        "Same gap as the waveform-correlates concept above: no 104-CPS-scoped article yet states these ECG interval/segment definitions explicitly; ART-104-PHY-CARDIAC-CONDUCTION is used as the closest live-module article because it does cover the AV nodal delay the PR segment records.",
      ],
    },
    {
      // Fresh mint. find-existing.mjs "ECG paper speed calibration limb
      // leads Einthoven lead II" -> "Safe to create one."
      key: "ecg.recording-technique.paper-speed-and-limb-leads",
      label: "Standard ECG paper runs at 25 mm/sec so each horizontal millimetre represents 0.04 seconds, and standard limb lead II records the potential difference between the left leg and the right arm",
      definition: "Two technical facts govern how a standard ECG tracing is read. First, ECG paper is calibrated to a standard recording speed of 25 mm/sec, so each 1 mm along the horizontal (time) axis represents 0.04 seconds — this calibration is what lets interval and segment durations be read directly off the paper's own grid. Second, the three standard (bipolar) limb leads defined by Einthoven's triangle each record the potential difference between two limbs: lead I is left arm minus right arm, lead II is left leg minus right arm, and lead III is left leg minus left arm.",
      objective: "State that 1 mm on the horizontal axis of standard ECG paper represents 0.04 seconds, and that standard limb lead II records the potential difference between the left leg and the right arm.",
      pitfall: "Mixing up which two limbs a given standard lead compares. Lead II is left leg (positive) versus right arm (negative) — not left leg versus left arm (that is lead III), and not left arm versus right arm (that is lead I).",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "structural_description",
      aliases: ["ECG paper speed", "Standard limb leads", "Einthoven's triangle", "Lead II"],
      gaps: [
        "Same gap as the two concepts above: no 104-CPS-scoped article currently states ECG paper calibration or the standard limb lead definitions; ART-104-PHY-CARDIAC-CONDUCTION is the closest live-module article available.",
      ],
    },
    {
      // Fresh mint. find-existing.mjs "myocardial ischemia electrical
      // activity Na-K ATPase hyperkalemia" -> "Safe to create one."
      key: "myocardial-ischemia.electrical-effects.na-k-atpase-inhibition",
      label: "Myocardial ischemia depletes ATP and inhibits the Na+-K+ ATPase, letting intracellular Na+ and extracellular K+ rise, which disturbs the electrical activity of the affected myocardium and predisposes to arrhythmia",
      definition: "Ischemic myocardium is starved of the oxygen needed for oxidative ATP production. Because the Na+-K+ ATPase depends on a continuous ATP supply to keep pumping 3 Na+ out for every 2 K+ it pumps in, falling ATP levels inhibit the pump's activity. Inhibiting the Na+-K+ ATPase lets intracellular Na+ rise and extracellular K+ accumulate around the ischemic cells (rather than being pumped back in), which alters the myocyte's resting membrane potential and its action potential's excitability and conduction — a well-recognised electrical disturbance that predisposes ischemic tissue to arrhythmia.",
      objective: "Trace the causal chain from myocardial ischemia through ATP depletion to Na+-K+ ATPase inhibition, and state the resulting ionic disturbance (intracellular Na+ rises, extracellular K+ rises around the ischemic tissue) and its electrical consequence.",
      pitfall: "Assuming ischemia causes extracellular hypokalemia. The opposite occurs locally: pump inhibition traps K+ outside the ischemic cells (they cannot be pumped back in as fast as they leak out), raising local extracellular K+, not lowering it.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Myocardial ischemia", "Na-K ATPase inhibition", "Ischemic hyperkalemia"],
      gaps: [
        "No 104-CPS-scoped article currently covers the clinical/pathophysiological electrical effects of myocardial ischemia; this leaf's articleId (ART-104-PHY-CARDIAC-CONDUCTION) covers the normal autonomic/conduction physiology this concept builds on but not the ischemic disease state itself. Flagged for a future clinical-correlate article-authoring pass.",
      ],
    },
  ],

  questions: [
    {
      key: "p-wave-is-due-to-bb56baa3",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that the P wave is produced by atrial depolarization, not repolarization, systole or diastole.",
      explanations: {
        A: "Correct. The P wave is the ECG's record of atrial depolarization — the spread of the electrical impulse from the SA node through both atria.",
        B: "Atrial repolarization is a real event, but it produces no visible wave of its own — its small signal is masked by the much larger, simultaneously occurring QRS complex.",
        C: "Atrial systole is a mechanical event (contraction), not the electrical depolarization event the P wave itself records, even though systole follows shortly after depolarization.",
        D: "Atrial diastole is the relaxed, filling phase of the atria, unrelated to what generates the P wave, which records depolarization, an electrical (not mechanical/relaxation) event.",
      },
    },
    {
      key: "qrs-complex-is-due-to-0e1de663",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that the QRS complex is produced by ventricular depolarization, not repolarization or atrial events.",
      explanations: {
        A: "Ventricular repolarization produces the T wave, a separate and later deflection, not the QRS complex.",
        B: "Correct. The QRS complex records ventricular depolarization — the spread of the impulse through the ventricular myocardium via the bundle branches and Purkinje fibres — and is the largest deflection on the tracing because the ventricular mass is so much greater than the atrial mass.",
        C: "Atrial depolarization produces the P wave, an earlier and much smaller deflection than the QRS complex.",
        D: "Atrial repolarization produces no wave of its own at all — it is masked by the QRS complex, not the cause of it.",
      },
    },
    {
      key: "the-longest-wave-in-ecg-is-a-p-wave-b-t-wave-0b634196",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "Identify the T wave as the longest (widest) wave of the normal ECG, reflecting the relatively slow, less synchronised repolarization of the ventricular myocardium.",
      explanations: {
        A: "The P wave is a comparatively brief, small deflection reflecting the smaller atrial mass depolarizing — shorter in duration than the T wave.",
        B: "Correct. Ventricular repolarization proceeds more gradually and less synchronously across the ventricular wall than depolarization does, spreading the T wave's own electrical signal out over a longer duration than any other single wave on the tracing.",
        C: "The Q wave is only the small initial downward deflection of the QRS complex, a brief component of a brief complex, not a long wave.",
        D: "The S wave is likewise only a small component of the brief QRS complex, not a separately long wave.",
      },
    },
    {
      key: "concerning-the-ecg-of-an-aciult-human-all-are-true-except-a9cb2ea6",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that the Q wave coincides with the start of ventricular depolarization, not atrial depolarization, as the exception among otherwise true statements about the adult ECG.",
      explanations: {
        A: "True, so not the exception: the P wave coincides with, and is produced by, depolarization of the atria.",
        B: "True, so not the exception: a normal PR interval is about 0.12-0.20 seconds, so a PR interval of 0.3 seconds is prolonged and does indicate impaired (delayed) AV conduction.",
        C: "True, so not the exception, in the sense the book intends: the R wave, as part of the QRS complex, reflects depolarization spreading through the ventricular myocardium including toward the apex.",
        D: "The exception, and the answer. The Q wave is the initial deflection of the QRS complex and coincides with the start of VENTRICULAR depolarization, not atrial depolarization — atrial depolarization is what the P wave, not the Q wave, records.",
      },
    },
    {
      // 4 option letters (A-D) survive extraction, but B and C are OCR-
      // garbled beyond safe reconstruction: B mixes in an unrelated cardiac-
      // cycle phase name ('Rapid ejection phase') rather than a candidate
      // ECG wave, and C is pure noise ('70% cy'). Only A and D read as
      // genuine, on-topic options for "which wave is absent in a normal
      // ECG." Publishing B/C as extracted would show students unreadable
      // text; reconstructing them outright would mean inventing option text
      // not actually recoverable from the source. Corrupted duplicate of
      // this same fact also excluded in cardiovascular-working-myocyte-
      // action-potential.ts (long-activation-of-fast-voltage-sodium-
      // channels-44...-f5860e77) — no unique teaching content lost.
      key: "which-of-the-following-has-absent-wave-in-recorded-normal-ec-bfb3d84b",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "4 option letters survive but B ('Rapid ejection phase...') and C ('70% cy') are OCR-garbled/off-topic and cannot be safely reconstructed as genuine ECG-wave options without inventing text absent from the source. The underlying fact (atrial repolarization is the wave absent from a normal ECG) is stated cleanly in this leaf's own concept definition instead. A corrupted duplicate of this same row is separately excluded in cardiovascular-working-myocyte-action-potential.ts.",
    },
    {
      key: "in-an-ecg-recording-the-time-between-atria-depolarization-ve-bf64f74f",
      conceptKey: "ecg.intervals-and-segments.pr-qt-st-timing",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "Identify the PR segment, not the PR interval, P wave or S-T interval, as the ECG element representing the time between atrial depolarization ending and ventricular depolarization beginning.",
      explanations: {
        A: "The P wave itself is atrial depolarization, not the gap between it and ventricular depolarization.",
        B: "The QRS complex is ventricular depolarization itself, the event that ENDS the interval this question asks about, not the interval leading up to it.",
        C: "The S-T interval/segment falls after the QRS complex, representing the fully depolarized ventricular plateau, not the gap before ventricular depolarization begins.",
        D: "Correct. The PR segment — the isoelectric stretch after the P wave ends and before the QRS complex begins — is exactly the delay between atrial depolarization finishing and ventricular depolarization starting, produced by the slow AV nodal conduction.",
      },
    },
    {
      key: "the-q-t-interval-of-ecg-6a6d5c17",
      conceptKey: "ecg.intervals-and-segments.pr-qt-st-timing",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "Define the QT interval as spanning the start of the Q wave to the end of the T wave, representing total ventricular depolarization plus repolarization time, and state that it shortens (not lengthens) in hypercalcemia.",
      explanations: {
        A: "The QT interval is measured from the START of the Q wave to the END of the T wave, not to the beginning of the T wave — ending at the beginning of the T wave would exclude the whole repolarization process the T wave itself represents.",
        B: "Correct. The QT interval captures the full time course of ventricular electrical activity in one beat: depolarization (QRS) plus repolarization (T wave) together.",
        C: "Hypercalcemia shortens, not prolongs, the QT interval (by speeding repolarization); it is hypocalcemia that prolongs it.",
        D: "Not all of the above, since option C is false (hypercalcemia shortens, rather than prolongs, the QT interval) and option A mismeasures the interval's own endpoint — only B is correct.",
      },
    },
    {
      key: "the-s-t-segment-of-ecg-1b4348b3",
      conceptKey: "ecg.intervals-and-segments.pr-qt-st-timing",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "State that the ST segment is normally isoelectric and represents complete ventricular depolarization (the plateau phase), and identify it as typically shortened, not prolonged, in myocardial ischemia.",
      explanations: {
        A: "Backwards. The ST segment is normally isoelectric (flat at baseline) precisely because the ventricles are uniformly, completely depolarized at that moment, with no net current flowing to deflect the tracing.",
        B: "The ST segment is measured from the END of the QRS complex (the S wave) to the beginning of the T wave, not from the S wave's own beginning.",
        C: "Correct. The ST segment coincides with the plateau phase of the ventricular myocyte action potential — the ventricles are, at this point, completely and uniformly depolarized, which is exactly why the segment is normally flat.",
        D: "Myocardial ischemia classically produces ST-segment DEVIATION (elevation or depression) from the isoelectric baseline, which is a displacement rather than simply a prolongation of the segment's own duration.",
      },
    },
    {
      key: "at-the-horizontal-axis-of-ecg-paper-cach-millimeter-represen-eee2b8c1",
      conceptKey: "ecg.recording-technique.paper-speed-and-limb-leads",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that 1 mm on the horizontal (time) axis of standard ECG paper represents 0.04 seconds.",
      explanations: {
        A: "0.4 sec would be ten times the correct value — a common slip when the decimal point is misplaced.",
        B: "Correct. Standard ECG paper runs at 25 mm/sec, so each 1 mm horizontally represents 1/25 sec = 0.04 sec — the calibration that lets interval durations be read directly off the grid.",
        C: "0.004 sec is ten times too small, the opposite decimal-point error from option A.",
        D: "0.01 sec does not correspond to the standard 25 mm/sec paper speed used for these calculations.",
      },
    },
    {
      key: "as-regard-the-standard-limb-leads-of-ecg-lead-ii-represents-a738ddad",
      conceptKey: "ecg.recording-technique.paper-speed-and-limb-leads",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "State that standard limb lead II records the potential difference between the left leg (positive) and the right arm (negative).",
      explanations: {
        A: "The potential difference between the left arm and the right arm is lead I, not lead II.",
        B: "The potential difference between the left leg and the left arm is lead III, not lead II.",
        C: "Correct. Lead II records the potential difference between the left leg and the right arm — the diagonal of Einthoven's triangle most closely aligned with the heart's mean electrical axis, which is why it is often used as the reference rhythm strip.",
        D: "Not correct, since option C states the right pairing for lead II.",
      },
    },
    {
      // Bank extraction genuinely recovered only 3 options (A, B, D — no C
      // survived at all), below the 4-to-5-option contract.
      key: "qrs-complex-lies-in-5e77a6b3",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A, B, D — no C at all), below the platform's 4-to-5-option import contract. The tested fact (the QRS complex, ventricular depolarization, triggers the isovolumetric contraction phase of the cardiac cycle) is correctly keyed (A) but not taught elsewhere in this cluster; a genuine, not merely duplicate, loss.",
    },
    {
      key: "an-effect-of-myocardial-ischemia-on-the-electrical-activity-4e43148c",
      conceptKey: "myocardial-ischemia.electrical-effects.na-k-atpase-inhibition",
      difficulty: "Hard",
      questionType: "Recall of a mechanism",
      learningObjective: "Trace myocardial ischemia's ATP depletion to Na+-K+ ATPase inhibition, and identify the resulting rise in extracellular K+ (not a fall) as the electrical disturbance produced.",
      explanations: {
        A: "Backwards. Ischemia causes local extracellular HYPERkalemia, not hypokalemia — pump inhibition leaves K+ unable to be returned into the cell as fast as it leaks out, so it accumulates outside the ischemic cells.",
        B: "Correct. ATP depletion from inadequate oxidative metabolism directly inhibits the ATP-dependent Na+-K+ ATPase, letting intracellular Na+ rise and extracellular K+ accumulate around the ischemic myocardium — a well-recognised electrical disturbance that predisposes to arrhythmia.",
        C: "Backwards. Ischemia causes ATP DEPLETION, not accumulation, because the oxidative metabolism that generates ATP is impaired by the inadequate oxygen supply.",
        D: "Ischemia impairs conduction and excitability rather than steepening phase 0's slope; a reduced, not increased, upstroke velocity is the more typical electrical consequence of the ionic disturbance ischemia produces.",
      },
    },
    {
      // Leaf-mismatch: this bank row is tagged leaf "Electrical Activity of
      // the Heart" but its content is Control of Respiration material
      // (pneumotaxic centre). That cluster was already fully closed earlier
      // in this branch (PROGRESS.md: "Control of Respiration: 15/15
      // triaged... 0 remaining bank rows") via physiology-control-of-
      // respiration.ts, which already teaches this exact fact (pneumotaxic
      // centre limits inspiration) under concept `respiratory-center.drg-
      // vrg-pontine-groups-and-rhythm-generation`. Not re-authored here to
      // avoid touching an already-closed sibling file outside this cluster's
      // own scope; recorded as excluded from THIS leaf's own count rather
      // than silently dropped. Flagged in PROGRESS.md for whoever next
      // touches Control of Respiration to fold in as a routed addition.
      key: "pneumotaxic-center-functions-primarily-to-9eda7d1c",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Easy",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Leaf-mismatch: this is Control of Respiration content (pneumotaxic centre), not Electrical Activity of the Heart. That cluster is already closed elsewhere in this branch (physiology-control-of-respiration.ts), which already teaches this exact fact under a different concept. Not authored here to avoid touching an already-closed sibling file; flagged in PROGRESS.md for a future routed addition there.",
    },
    {
      // Same leaf-mismatch as the row above — a duplicate/OCR-noisy variant
      // of the same pneumotaxic-centre question.
      key: "pneumotaxic-center-functions-primarily-to-a-limit-inspiratio-e9225808",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Easy",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Leaf-mismatch, same fact and same disposition as `pneumotaxic-center-functions-primarily-to-9eda7d1c` above — Control of Respiration content, already closed elsewhere in this branch, not re-authored here.",
    },
    {
      // Ambiguous key, not re-verified against the department book's own
      // page text this pass: the corrupted stem merges an unrelated
      // fragment in, option C's text is itself missing/blank in the
      // extraction, and the bank's own "handwritten-recovered" answer B
      // (atrial rate 200-300/min) sits closer to standard teaching for
      // atrial FLUTTER than fibrillation (classically 350-600/min,
      // irregularly irregular, with absent P waves as the single most
      // unambiguous ECG hallmark — option D). Per the ANSWER-KEY GAPS
      // ruling a wrong key is worse than a missing one, and this branch's
      // own convention only overrides a key against a directly re-verified
      // department-book page (see the cytogenetics answerOverride examples)
      // — not attempted here, so excluded rather than guessed at either way.
      key: "in-ecg-atrial-fibrillation-shows-253f1614",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option C's text is missing from the extraction (only A, B, D survive with content) and the bank's own 'handwritten-recovered' answer (B, atrial rate 200-300/min) conflicts with standard teaching (atrial fibrillation is classically 350-600/min with absent P waves as the defining ECG sign, option D) without a re-verified department-book page to settle it either way. Excluded rather than overridden without that verification, or kept with a key this leaf's own author does not trust.",
    },
    {
      // Corrupted, merged stem (mixes 'Ventricular repolarization.' with a
      // separately numbered '45,' exam item); the bank's own 'handwritten-
      // recovered' answer B ('V1 chest lead is present at the left 5th
      // intercostal space') describes V1's standard placement wrongly (V1
      // is at the right 4th intercostal space; left 5th ICS is V4's
      // location) without a re-verified department-book page to confirm
      // whether this department teaches a non-standard convention.
      key: "ventricular-repolarization-45-which-of-the-following-is-corr-9258256a",
      conceptKey: "ecg.intervals-and-segments.pr-qt-st-timing",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Stem is an OCR merge of two separately numbered exam items. The bank's own 'handwritten-recovered' answer (B, V1 at the left 5th intercostal space) conflicts with standard ECG lead placement (V1 is the right 4th intercostal space; left 5th ICS is V4) without a re-verified department-book page to confirm either reading. Excluded rather than overridden or kept with an unverified key.",
    },
    {
      key: "about-the-pacemaker-potential-all-the-following-are-true-exc-233246b9",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already excluded at the bank/editorial-keying stage (editorialExcluded, answerConfidence none): the likely false statement is embedded unlettered in the stem, and the three surviving lettered options are all independently true statements about the pacemaker potential — no letter to assign the intended exception to. Recorded here as a seed exclude for this leaf's own complete accounting, per this branch's standing practice (see A-V Connections' 'record 4 already-known corrupted rows as seed excludes').",
    },
    {
      key: "cardiac-muscle-cannot-be-tetanized-because-of-e311a248",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already excluded at the bank/editorial-keying stage: two of the three surviving options contain internally reversed wording (calcium 'efflux' where the plateau is actually calcium influx; fast Na+ channels' 'long activation' where it is actually their rapid inactivation), so neither can be confidently selected as precisely correct. Recorded here as a seed exclude for this leaf's own complete accounting.",
    },
    {
      key: "describe-the-ionic-bases-of-phase-1-and-phase-2-in-cardiac-m-b46ebbe9",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already excluded at the bank/editorial-keying stage: this is a written-exam model-answer page (prose/bullet content describing phase 1 and 2 ionic mechanisms), not a single-best-answer MCQ with genuine distractors — the surviving 'options' are fragments of the model answer itself. Recorded here as a seed exclude for this leaf's own complete accounting.",
    },
    {
      key: "regarding-the-ionic-basis-of-action-potential-in-cardiomyocy-5f570010",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already excluded at the bank/editorial-keying stage: each of the four surviving options correctly describes its own respective action-potential phase in general terms, with no obvious factual error singled out among them, and no context survives on how they were originally paired with phase labels to identify the intended exception. Recorded here as a seed exclude for this leaf's own complete accounting.",
    },
    {
      key: "superior-cervical-cardiac-branch-of-left-vagus-66af8666",
      conceptKey: "ecg.waveform-electrophysiological-correlates.p-qrs-t",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already excluded at the bank/editorial-keying stage: the stem is a bare anatomical noun phrase with no question attached, and the surviving options mix unrelated anatomical phrase variants with an unrelated term ('Excitability') that does not fit the apparent topic. Recorded here as a seed exclude for this leaf's own complete accounting.",
    },
  ],
}
