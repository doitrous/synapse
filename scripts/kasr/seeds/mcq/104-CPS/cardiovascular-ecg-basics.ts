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
  ],
}
