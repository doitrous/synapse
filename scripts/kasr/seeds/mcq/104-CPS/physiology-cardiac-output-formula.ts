import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Cardiac Output Formula',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
  articleId: 'ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE',

  concepts: [
    {
      key: 'cardiac-output.definition-formula-and-index',
      label: 'Cardiac output is the volume each ventricle pumps per minute, equals heart rate times stroke volume, and is corrected for body size as the cardiac index',
      definition: 'Cardiac output (CO) is the volume of blood pumped by each ventricle per minute, normally about 5 litres/minute in adults. Because CO depends on body size (it is higher in people with a larger body size), it is corrected for size as the cardiac index, calculated by dividing CO in L/min by body surface area in m2; the normal cardiac index is about 3.2 L/min/m2. CO is determined by heart rate (beats per minute) and stroke volume, the volume of blood ejected by each ventricle per beat, so that CO = stroke volume x heart rate.',
      objective: 'State the definition and normal value of cardiac output, write the formula CO = SV x HR, and define cardiac index and its normal value.',
      pitfall: 'Forgetting that cardiac index divides cardiac output by body surface area, not by body weight, and treating "5 L/min" as a fixed constant rather than a value that itself scales with body size.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
      type: 'definition',
      aliases: ['CO = SV x HR', 'Cardiac index'],
    },
    {
      key: 'ventricular-ejection-fraction.normal-value-and-reduction-in-heart-failure',
      label: 'Ejection fraction is the fraction of end-diastolic volume ejected per beat, normally about 55-60% at rest, and is characteristically reduced (around 40% or less) in heart failure',
      definition: 'Ejection fraction (EF) is the stroke volume expressed as a fraction (percentage) of the end-diastolic volume: EF = stroke volume / end-diastolic volume x 100. In a resting healthy adult it is normally about 55-60% — a healthy ventricle ejects roughly three-fifths of the blood it holds at the end of filling, not all of it, leaving an end-systolic volume behind as a reserve. In systolic heart failure, when the ventricle\'s contractile performance falls, ejection fraction falls with it, characteristically to around 40% or less, and is used clinically as the chief marker of that reduced pumping performance.',
      objective: 'State the ejection fraction formula (SV / EDV), its normal resting value (~55-60%), and that it falls characteristically to ~40% or below in heart failure.',
      pitfall: 'Confusing ejection fraction (the fraction of the filled ventricle that is ejected, ~55-60% normally) with stroke volume itself (an absolute volume, ~70 ml) — a normal heart never approaches 100% ejection fraction, because some blood always remains as the end-systolic volume.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
      type: 'definition',
      aliases: ['Ejection fraction', 'EF in heart failure', 'EF = SV/EDV'],
    },
    {
      key: 'cardiac-output.determinants-and-directional-effects',
      label: 'Cardiac output rises when preload (venous return, end-diastolic volume) or contractility rises, and falls when venous return is obstructed, because each acts through stroke volume',
      definition: 'Cardiac output (CO = stroke volume x heart rate) moves in the same direction as any change that raises or lowers stroke volume at a constant heart rate. Anything that increases venous return and so raises end-diastolic volume — an increase in blood volume, for example — raises stroke volume by the Frank-Starling mechanism and so raises CO. An increase in myocardial contractility raises stroke volume directly, independent of preload, and so also raises CO. Venous obstruction works in the opposite direction: by impeding venous return to the heart, it lowers end-diastolic volume (preload), which lowers stroke volume by the Frank-Starling mechanism and so lowers cardiac output.',
      objective: 'State that increased blood volume, increased end-diastolic volume and increased contractility each raise cardiac output, while venous obstruction lowers it by reducing preload.',
      pitfall: 'Assuming every change in the cardiovascular system that sounds like a "problem" lowers cardiac output. Venous obstruction lowers CO because it specifically reduces venous return and therefore preload; increased contractility and increased preload both raise CO, even though one might intuitively expect "more resistance to flow, somewhere" to always be a bad thing for output.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
      type: 'mechanism',
      aliases: ['Determinants of cardiac output', 'What raises or lowers cardiac output'],
    },
    {
      // Fresh mint. find-existing.mjs "sympathetic stimulation effects
      // heart rate contractility cardiac output" / "effect of sympathetic
      // stimulation on the heart" -> "Safe to create one." Distinct from
      // this file's own cardiac-output.determinants-and-directional-
      // effects concept (which covers preload/venous-obstruction routes to
      // changing CO) and from physiology-cardiac-inotropy-mechanisms.ts's
      // cAMP-PKA concept (the cellular mechanism of inotropy alone): this
      // concept is the combined cardiac-side signature of sympathetic
      // stimulation across all three variables at once, directly grounded
      // in this file's own article's Mechanism section ("the cardiac-side
      // signature of dynamic exercise is: heart rate up, inotropy up,
      // total peripheral resistance down"), restated here for isolated
      // sympathetic stimulation on the heart rather than the exercise
      // context specifically — the same directional facts, not a new
      // claim.
      key: 'sympathetic-stimulation.cardiac-signature.rate-inotropy-and-cardiac-output',
      label: 'Sympathetic stimulation of the heart raises heart rate and contractility together, and because cardiac output equals heart rate times stroke volume, this combined rise in both determinants raises cardiac output',
      definition: "Sympathetic stimulation of the heart, acting mainly through beta1-adrenergic receptors, raises heart rate (a positive chronotropic effect, via a faster SA-node pacemaker current) and raises myocardial contractility (a positive inotropic effect, via increased cytoplasmic Ca++ availability) together, not as two independent, unrelated changes. Because cardiac output equals heart rate multiplied by stroke volume, and increased contractility itself raises stroke volume, both multiplicands of the cardiac output equation rise together under sympathetic drive, so cardiac output rises as well. This article's own account of dynamic exercise states the same three-part cardiac-side signature explicitly: heart rate up, inotropy up, total peripheral resistance down — the identical directional pattern applies to sympathetic stimulation of the heart considered on its own.",
      objective: 'State that sympathetic stimulation of the heart raises heart rate, contractility and (via both) cardiac output together, as a single coordinated cardiac-side signature rather than three unrelated effects.',
      pitfall: 'Treating heart rate, contractility and cardiac output as three separate facts to memorise independently, rather than recognising that a coordinated rise in the first two, under the CO = HR x SV relationship, is exactly what produces the third.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
      type: 'mechanism',
      aliases: ['Sympathetic effects on the heart', 'Cardiac-side signature of sympathetic stimulation'],
    },
  ],

  questions: [
    {
      key: 'cardiac-output-is-equal-to-4aebbffc',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the formula CO = heart rate x stroke volume.',
      explanations: {
        A: 'This is the formula for mean arterial pressure, not cardiac output — MAP approximates diastolic pressure plus one-third of the pulse pressure.',
        B: 'Cardiac output equals heart rate multiplied by stroke volume, the volume of blood pumped by each ventricle per minute.',
        C: 'This difference is stroke volume itself (end diastolic volume minus end systolic volume), not cardiac output — stroke volume must still be multiplied by heart rate to reach output per minute.',
        D: 'This combination does not correspond to any standard cardiovascular quantity; end diastolic volume minus stroke volume gives end systolic volume, and multiplying that by heart rate is not cardiac output.',
      },
    },
    {
      key: 'cardiac-output-is-equal-to-which-of-the-following-31600b33',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the formula CO = heart rate x stroke volume.',
      explanations: {
        A: 'This is the formula for mean arterial pressure, not cardiac output — MAP approximates diastolic pressure plus one-third of the pulse pressure.',
        B: 'Cardiac output equals heart rate multiplied by stroke volume, the volume of blood pumped by each ventricle per minute.',
        C: 'This difference is stroke volume itself (end diastolic volume minus end systolic volume), not cardiac output — stroke volume must still be multiplied by heart rate to reach output per minute.',
        D: 'This combination does not correspond to any standard cardiovascular quantity; end diastolic volume minus stroke volume gives end systolic volume, and multiplying that by heart rate is not cardiac output.',
      },
    },
    {
      key: 'cardiac-output-is-equal-to-which-of-the-following-diastolic-09022e39',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (B, C, D) — option A's text ('Diastolic BP + 1/3 (Systolic BP - diastolic BP)') was absorbed into the stem itself, mixed with unreadable OCR debris, below the platform's 4-to-5-option import contract. The same fact is already tested cleanly by this leaf's own cardiac-output-is-equal-to-4aebbffc and cardiac-output-is-equal-to-which-of-the-following-31600b33 questions, which preserve all 4 options.",
    },
    {
      key: 'the-following-data-are-obtained-from-a-patient-the-end-diast-40b0894f',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective: 'Calculate heart rate from cardiac output and stroke volume (end-diastolic minus end-systolic volume).',
      explanations: {
        A: 'Stroke volume here is 130 - 70 = 60 ml; dividing cardiac output (4800 ml/min) by 60 ml gives 80 beats/minute, not 70.',
        B: 'Stroke volume is end-diastolic minus end-systolic volume: 130 - 70 = 60 ml. Heart rate = cardiac output / stroke volume = 4800 / 60 = 80 beats/minute.',
        C: 'Using the correct stroke volume of 60 ml, cardiac output / stroke volume gives 80, not 90, beats/minute.',
        D: '4800 / 60 = 80, not 100; 100 beats/minute would require a smaller stroke volume than the 60 ml these figures give.',
      },
    },
    {
      key: 'the-following-data-are-obtained-from-a-patient-the-end-diast-70439a00',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective: 'Calculate heart rate from cardiac output and stroke volume (end-diastolic minus end-systolic volume).',
      explanations: {
        A: 'Stroke volume here is 120 - 70 = 50 ml; dividing cardiac output (4500 ml/min) by 50 ml gives 90 beats/minute, not 70.',
        B: 'Using the correct stroke volume of 50 ml, cardiac output / stroke volume gives 90, not 80, beats/minute.',
        C: 'Stroke volume is end-diastolic minus end-systolic volume: 120 - 70 = 50 ml. Heart rate = cardiac output / stroke volume = 4500 / 50 = 90 beats/minute.',
        D: '4500 / 50 = 90, not 100; 100 beats/minute would require a smaller stroke volume than the 50 ml these figures give.',
      },
    },
    {
      key: 'a-patient-with-heart-failure-the-ejection-fraction-is-535bf7d6',
      conceptKey: 'ventricular-ejection-fraction.normal-value-and-reduction-in-heart-failure',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'State that ejection fraction falls to around 40% in heart failure.',
      explanations: {
        A: 'Ejection fraction characteristically falls to around 40% or less in heart failure, well below the normal resting value of about 55-60%, reflecting the ventricle\'s reduced pumping performance.',
        B: '60% is within the normal resting range, not the reduced value expected in heart failure.',
        C: '70% is above even the normal resting range and is the opposite direction of change from what heart failure produces.',
        D: '80% would be an implausibly high ejection fraction even for a healthy heart, and is the opposite direction of change from heart failure.',
      },
    },
    {
      key: 'a-patient-with-heart-failure-the-ejection-fraction-is-feprat-a02135d6',
      conceptKey: 'ventricular-ejection-fraction.normal-value-and-reduction-in-heart-failure',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "The bank's keyed answer is A, but option A's text ('fePrat a 40%') was absorbed into the stem itself during extraction and does not survive as a selectable option — only B, C and D remain, so the answer letter the key names is not among the filled options. The same fact (heart failure EF ~40%) is already tested cleanly by this leaf's own a-patient-with-heart-failure-the-ejection-fraction-is-535bf7d6 question, which preserves all 4 options including A.",
    },
    {
      key: 'in-a-resting-adult-the-ventricular-ejection-fraction-is-1d96e27f',
      conceptKey: 'ventricular-ejection-fraction.normal-value-and-reduction-in-heart-failure',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the normal resting ventricular ejection fraction (~55-60%).',
      explanations: {
        A: '20% is far below normal — a value this low signals severely reduced ventricular performance, not a resting healthy adult.',
        B: '30% is still well below the normal resting range and would itself indicate significantly impaired ejection.',
        C: '40% is the value characteristic of heart failure, not the normal resting value in a healthy adult.',
        D: 'The normal ventricular ejection fraction at rest in a healthy adult is about 60% — the ventricle ejects roughly three-fifths of its end-diastolic volume each beat.',
      },
    },
    {
      key: 'in-a-resting-adult-what-s-the-normal-ventricular-ejection-fr-12088240',
      conceptKey: 'ventricular-ejection-fraction.normal-value-and-reduction-in-heart-failure',
      difficulty: 'Easy',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (B, C, D) — option A's text ('a= 20%') was absorbed into the stem itself, below the platform's 4-to-5-option import contract. The same fact is already tested cleanly by this leaf's own in-a-resting-adult-the-ventricular-ejection-fraction-is-1d96e27f and in-a-resting-adult-what-s-the-normal-ventricular-ejection-fr-dbe6d127 questions, both of which preserve all 4 options.",
    },
    {
      key: 'in-a-resting-adult-what-s-the-normal-ventricular-ejection-fr-dbe6d127',
      conceptKey: 'ventricular-ejection-fraction.normal-value-and-reduction-in-heart-failure',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the normal resting ventricular ejection fraction (~55-60%).',
      explanations: {
        A: '20% is far below normal — a value this low signals severely reduced ventricular performance, not a resting healthy adult.',
        B: '30% is still well below the normal resting range and would itself indicate significantly impaired ejection.',
        C: '40% is the value characteristic of heart failure, not the normal resting value in a healthy adult.',
        D: 'The normal ventricular ejection fraction at rest in a healthy adult is about 55%, at the lower end of the commonly quoted 55-60% resting range — the ventricle ejects roughly half to three-fifths of its end-diastolic volume each beat.',
      },
    },
    {
      key: 'the-cardiac-output-is-equal-to-b9a3f1a2',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that cardiac output equals (end-diastolic volume minus end-systolic volume) x heart rate, an equivalent form of stroke volume x heart rate.',
      explanations: {
        A: 'Correct: end-diastolic volume minus end-systolic volume is exactly stroke volume, so this difference multiplied by heart rate is another way of writing CO = stroke volume x heart rate.',
        B: 'Heart rate multiplied by end-diastolic volume alone overstates output, since it ignores that only the stroke volume portion of the end-diastolic volume — not the whole end-diastolic volume — is ejected each beat.',
        C: 'The difference between resting and exercise stroke volumes describes how much stroke volume changes with exercise, not cardiac output at either state.',
        D: 'Stroke volume multiplied by end-systolic volume does not correspond to any standard cardiovascular quantity; stroke volume must be multiplied by heart rate, not by the volume left behind after ejection.',
      },
    },
    {
      key: 'the-cardiac-output-is-equal-to-which-of-the-following-81bfc388',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that cardiac output equals (end-diastolic volume minus end-systolic volume) x heart rate, an equivalent form of stroke volume x heart rate.',
      explanations: {
        A: 'Correct: end-diastolic volume minus end-systolic volume is exactly stroke volume, so this difference multiplied by heart rate is another way of writing CO = stroke volume x heart rate.',
        B: 'Heart rate multiplied by end-diastolic volume alone overstates output, since it ignores that only the stroke volume portion of the end-diastolic volume — not the whole end-diastolic volume — is ejected each beat.',
        C: 'The difference between resting and exercise stroke volumes describes how much stroke volume changes with exercise, not cardiac output at either state.',
        D: 'Stroke volume multiplied by end-systolic volume does not correspond to any standard cardiovascular quantity; stroke volume must be multiplied by heart rate, not by the volume left behind after ejection.',
      },
    },
    {
      key: 'which-of-the-following-is-associated-with-a-decrease-in-card-e182b510',
      conceptKey: 'cardiac-output.determinants-and-directional-effects',
      difficulty: 'Moderate',
      questionType: 'Recall of a true statement',
      learningObjective: 'Identify venous obstruction, by reducing preload, as the option among these associated with a decrease in cardiac output.',
      explanations: {
        A: 'Increased blood volume raises venous return and end-diastolic volume, which by the Frank-Starling mechanism raises, not lowers, stroke volume and cardiac output.',
        B: 'Increased end-diastolic volume itself raises stroke volume by the Frank-Starling mechanism, raising cardiac output rather than lowering it.',
        C: 'Correct: venous obstruction impedes venous return, lowering end-diastolic volume (preload); by the Frank-Starling mechanism this lowers stroke volume and so lowers cardiac output.',
        D: 'Increased myocardial contractility raises stroke volume directly, independent of preload, and so raises cardiac output rather than lowering it.',
      },
    },
    {
      key: 'the-following-are-associated-with-a-decrease-in-cardiac-outp-90f40768',
      conceptKey: 'cardiac-output.determinants-and-directional-effects',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The credited option ("Blood pressure of 160/100", i.e. elevated afterload) and the listed distractor "Venous obstruction" are both mechanistically capable of lowering cardiac output (afterload mismatch versus reduced preload), so picking a single best answer between them is not defensible without a source establishing which the examiner intended as the discriminator. The cleaner sibling question testing the same underlying determinants-of-CO fact, without this ambiguity, is already kept as which-of-the-following-is-associated-with-a-decrease-in-card-e182b510.',
    },
    {
      // Leaf-mismatch reroute: bank-tagged "Mechanical Properties of
      // Cardiac Muscle" — genuinely this file's own cardiac-index concept
      // (already states CO ~5 L/min and cardiac index ~3.2 L/min/m2), no
      // new search needed since this is this pipeline's own already-
      // committed concept.
      key: 'regarding-cardiac-index-the-following-is-truc-except-80705f05',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'State that cardiac index — cardiac output per square metre of body surface area, related to a person\'s height and weight and dependent on ventricular contractility — is normally about 3.2 L/min/m2, not the ~5 L/min figure that describes cardiac output itself.',
      explanations: {
        A: 'True of cardiac index, so not the exception. Cardiac index is defined as cardiac output divided by body surface area, in L/min/m2.',
        B: 'The exception, and the answer. About 5 litres/minute is the normal value of cardiac OUTPUT itself, not cardiac index; correcting for a typical adult body surface area of roughly 1.6-1.9 m2 gives a normal cardiac index of about 3.2 L/min/m2, a materially smaller number.',
        C: 'True of cardiac index, so not the exception. Because cardiac index divides cardiac output by body surface area, and body surface area is calculated from height and weight, cardiac index is related to a person\'s height and weight.',
        D: 'True of cardiac index, so not the exception. Cardiac index rises and falls with cardiac output, which in turn depends on stroke volume — itself dependent on ventricular contractility — and heart rate.',
      },
    },
    {
      key: 'sympathetic-stimulation-has-the-following-effect-s-on-the-he-e6a61131',
      conceptKey: 'sympathetic-stimulation.cardiac-signature.rate-inotropy-and-cardiac-output',
      difficulty: 'Easy',
      questionType: 'Recall of a comprehensive true statement',
      learningObjective: 'State that sympathetic stimulation of the heart increases heart rate, cardiac output and contractility together, as a single coordinated set of effects, so the comprehensive option is correct.',
      explanations: {
        A: 'True, but incomplete alone. Sympathetic stimulation does increase heart rate (positive chronotropy) — but it produces this together with the other two listed effects, not instead of them.',
        B: 'True, but incomplete alone. Sympathetic stimulation does increase cardiac output — as the coordinated consequence of the rise in both heart rate and contractility below — but not as an effect isolated from them.',
        C: 'True, but incomplete alone. Sympathetic stimulation does increase myocardial contractility (positive inotropy), via the beta-adrenergic-cAMP-PKA pathway — but again, together with the other two effects, not alone.',
        E: 'Correct. Sympathetic stimulation of the heart raises heart rate and contractility together, and because cardiac output equals heart rate times stroke volume, this combined rise raises cardiac output as well — all three listed effects are genuine, interconnected consequences of sympathetic stimulation, so the comprehensive option is the correct choice.',
      },
    },
    {
      key: 'what-is-the-effect-of-sympathetic-stimulation-on-the-heart-836e2203',
      conceptKey: 'sympathetic-stimulation.cardiac-signature.rate-inotropy-and-cardiac-output',
      difficulty: 'Easy',
      questionType: 'Recall of a comprehensive true statement',
      learningObjective: 'State that sympathetic stimulation of the heart increases heart rate, cardiac output and contractility together, as a single coordinated set of effects, so the comprehensive option is correct.',
      explanations: {
        A: 'True, but incomplete alone. Sympathetic stimulation does increase heart rate (positive chronotropy) — but together with the other two listed effects, not instead of them.',
        B: 'True, but incomplete alone. Sympathetic stimulation does increase cardiac output, as the coordinated consequence of the rise in both heart rate and contractility — but not as an effect isolated from them.',
        C: 'True, but incomplete alone. Sympathetic stimulation does increase myocardial contractility (positive inotropy), via the beta-adrenergic-cAMP-PKA pathway — but again, together with the other two effects, not alone.',
        D: 'Correct. Sympathetic stimulation of the heart raises heart rate and contractility together, and because cardiac output equals heart rate times stroke volume, this combined rise raises cardiac output as well — all three listed effects are genuine, interconnected consequences of sympathetic stimulation, so the comprehensive option is the correct choice.',
      },
    },
  ],
}
