<!--
  Sparse updates for ASU-LOCO (Locomotor System, ASU_Y1 Term 2, Physiology) onto
  concept ids that exist only in Kasr Year 1's unimported batches, per the Ain Shams
  LANE-BRIEF.md §6 minting ruling (2026-08-22, law for every university): a key hit
  in another lane's unimported batch is a sparse update written here, never a second
  full record, because the importer would silently create a stub for an update row
  whose id is not live.

  Every one of these 20 canonical keys was searched with find-existing.mjs before
  this file was written (docs/Ain-Shams-Source-Imports/coverage/ASU-LOCO-triage.md
  Section D records the earlier spot-checks; the full set was re-verified during
  authoring). All 20 are near-exact or exact matches for facts tested by the ASU
  Locomotor Physiology MCQ paper (src_3be9856ba9380e79cb01) -- Kasr's 103 BMS
  Physiology department covers the same skeletal-muscle-physiology curriculum ASU
  teaches, so the same medical idea already has a concept id; this batch only adds
  the ASU university/year/module tags.

  Validate with:
    npm run medical:batch -- docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-physiology.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

  Do not apply this file until the Kasr file each record targets (named per record
  below, and in INDEX.md) is live. Kasr Year 1 is queued ahead of Ain Shams in the
  chief-of-staff's import order.
-->

# Item

## id
CON-MSK-3013AA61E917B7

## label
Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site

## definition
The T tubule is an invagination of the muscle fibre membrane carrying extracellular fluid into the depth of the fibre, and the action potential spreads over the membrane and into it. The tubule's voltage-sensitive dihydropyridine receptor senses the depolarisation and, through foot processes, opens the ryanodine calcium channel on the terminal cisterna of the sarcoplasmic reticulum, so calcium floods the cytoplasm. Calcium binds troponin C; troponin changes conformation, tropomyosin moves off the myosin-binding site on actin, and the cross-bridges attach. Relaxation follows when the calcium pump on the reticulum removes calcium and tropomyosin re-covers the site.

## explicit_objective
Trace excitation–contraction coupling from the T tubule to the uncovered actin site, naming the two receptors and the three regulatory proteins.

## arabic_label
اقتران الإثارة بالانقباض

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-287D88DF2F6B8C

## label
Myosin has two heavy chains forming flexible cross-bridge heads, and actin's active site is covered at rest by tropomyosin held in place by the three troponin subunits

## definition
The myosin molecule is built of two heavy chains and four light chains. The two heavy chains form a helix; their terminal portions, together with the four light chains, form two arms ending in globular heads, the cross-bridges. Each head carries an actin-binding site, an ATP-binding site and an ATPase site, and the cross-bridge is flexible at two hinges, one between arm and body and one between arm and head. The actin molecule is two chains coiled as a helix, and it carries a specific site for myosin, the active site. At rest, tropomyosin molecules cover this active site. Troponin, a small globular protein, attaches tropomyosin to actin and is built of three subunits: troponin I, which has a strong affinity for actin and binds it; troponin T, which has a strong affinity for tropomyosin and binds it; and troponin C, which has a strong affinity for Ca2+, and whose binding to Ca2+ initiates the contraction process.

## explicit_objective
Describe the structure of the myosin cross-bridge and the actin filament, and name the three troponin subunits with the one binding partner each is defined by.

## arabic_label
بنية بروتينات العضلة: الميوسين والأكتين والتروبونين

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-0824FE988ADA00

## label
The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle

## definition
The sarcomere is the portion of a myofibril between two adjacent Z lines. It includes one dark (A) band and the two halves of the light (I) bands on either side of it, and it is the basic contractile unit of striated muscle, considered the functional unit of contraction. Within the sarcomere, thick myosin filaments are restricted to the A band; thin actin filaments attach to the Z line, pass through the I band, and extend into the A band as far as the start of the H zone. The A band appears dark because it holds both myosin and actin; the H zone, its central paler region, holds only myosin; the M line, which bisects the H zone, is produced by interconnections of adjacent myosin filaments; the I band appears light because it holds only actin; and the Z line is dense with condensed actin filaments and accessory proteins that keep the thick and thin filaments precisely aligned. On contraction, the I bands shorten and the H zone is abolished while the A band's length stays constant, because the filaments overlap further rather than shortening themselves.

## explicit_objective
Define the sarcomere by its Z-line boundaries, name its component bands and lines, state which filament occupies each, and explain why the A band does not change length on contraction while the I band does.

## arabic_label
الوحدة القِسيمية العضلية

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-histology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-B2B106C1D81C30

## label
Tension in skeletal muscle is generated by the four-step cycling of the cross-bridges

## definition
Tension is the force a muscle develops when it contracts, and it is produced by cross-bridges cycling through four steps: actin and myosin bind spontaneously once calcium has bound troponin C and tropomyosin has moved off the active site; the cross-bridge bends and slides the actin filament across the myosin, using energy from ATP hydrolysis; the cross-bridge detaches when ADP and inorganic phosphate leave and a new ATP takes their place; and it returns to its upright position to cycle again. Cycling continues while calcium remains on troponin C and ATP is available, and the force passes through actin to the Z disc, the sarcolemma and the tendon.

## explicit_objective
Explain the four steps by which cross-bridge cycling generates tension in a skeletal muscle fibre, and state what keeps the cycle running.

## arabic_label
توليد التوتر بدورة الجسور المتصالبة

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-AC42FE7AB41DF2

## label
A cross-bridge cannot detach without a fresh ATP, and without ATP the muscle goes into contracture

## definition
Detaching a cross-bridge from actin requires that ADP and inorganic phosphate leave the head and a new ATP molecule take their place; the new ATP is what lowers the head's affinity for the active site. If no ATP is available the thick and thin filaments cannot be separated, and the muscle is held in contracture — the same loss of ATP that puts every muscle of the body into the rigidity of rigor mortis after death.

## explicit_objective
Explain why ATP is needed to end a cross-bridge cycle rather than to start it, and predict what happens to a muscle when ATP runs out.

## arabic_label
دور الـ ATP في فك ارتباط الجسور المتصالبة

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-43CD79301071ED

## label
Skeletal muscle is over four hundred voluntary muscles attached to bone, and contraction that depends on nerve supply serves four functions

## definition
Skeletal muscles are attached to the bones, and the human body contains over four hundred voluntary skeletal muscles whose contraction depends on their nerve supply. Skeletal muscle performs four major functions: force production for locomotion and breathing; force production for maintaining posture and stabilising joints; heat production; and helping venous drainage.

## explicit_objective
State how many voluntary skeletal muscles the body contains, that their contraction depends on nerve supply, and list the four major functions the book gives for skeletal muscle.

## arabic_label
نظرة عامة على العضلات الهيكلية ووظائفها الأربع

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-3B9143FBE075E4

## label
Skeletal muscle's own action potential resembles the nerve's but finishes before contraction starts, which is why the fibre can be tetanised

## definition
The electrical events in skeletal muscle and the ionic fluxes behind them resemble those in nerve, with some differences: the resting membrane potential of skeletal muscle is about −90 mV, its action potential lasts 2 to 4 msec, it is conducted along the muscle fibre at about 5 m/sec, and it precedes the contraction by about 2 msec. During its own action potential, a skeletal muscle fibre is refractory to restimulation, exactly as a nerve fibre is. But because the action potential precedes the mechanical contraction, by the time the fibre actually begins to contract it has already regained its excitability and can respond to a second stimulus — which is why skeletal muscle can be tetanised, unlike cardiac muscle, whose action potential and contraction overlap.

## explicit_objective
State the resting potential, action-potential duration and conduction velocity of skeletal muscle, and explain from the timing of the action potential relative to contraction why skeletal muscle, but not cardiac muscle, can be tetanised.

## arabic_label
التغيرات الكهربائية والاستثارية بعد تنبيه العضلة الهيكلية

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-AF4E727C85510D

## label
A single skeletal muscle fibre obeys the all-or-none law: it contracts maximally or not at all, and a threshold stimulus already produces the maximal single-fibre contraction

## definition
A single skeletal muscle fibre obeys the all-or-none law: it contracts maximally, or it does not contract at all. A threshold stimulus already produces a maximal contraction in that fibre, provided the experimental conditions stay the same — a supra-threshold stimulus to one fibre produces no bigger a contraction than a threshold one.

## explicit_objective
State the all-or-none law as it applies to a single skeletal muscle fibre, and explain why increasing stimulus strength above threshold does not increase that one fibre's contraction.

## arabic_label
قانون كل أو لا شيء لليفة العضلية الهيكلية المفردة

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-242998842BE25C

## label
A muscle twitch is a single, brief contraction and relaxation cycle produced by one action potential, starting about 2 msec after depolarisation

## definition
The muscle twitch is a brief contraction followed by relaxation, produced by a single action potential. The twitch begins about 2 msec after the membrane depolarises — the same delay by which the book states the action potential precedes contraction.

## explicit_objective
Define the muscle twitch and state how long after membrane depolarisation it begins.

## arabic_label
الرجفة العضلية المفردة وتوقيتها

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-87D5C5A48AB5D9

## label
In isometric contraction the muscle's length is held fixed while tension rises; in isotonic contraction tension is held fixed once threshold is reached and the muscle shortens

## definition
Skeletal muscle contains, besides its contractile element, elastic and viscous elements arranged in series with it, mainly in the tendons — the series elastic component. In an isometric contraction, an isolated muscle is fixed at one end, a heavy load stretches it at the other end to a set degree, and a support is placed to prevent further stretch. When stimulated, the muscle cannot shorten because the load is too heavy, but the sarcomeres inside the myocytes do shorten, stretching the series elastic elements; tension inside the muscle rises to a maximum while the whole muscle's length stays constant. In an isotonic contraction, a smaller load is used and stretched the same degree before being supported. On stimulation, contraction begins isometrically and tension rises until it reaches a level that can lift the load; from that point, the muscle shortens while tension stays constant. With a heavier load, the isometric phase before shortening starts lasts longer, and the rate and extent of the subsequent isotonic shortening are both less; if the load is too large, the maximum tension the muscle can develop in the isometric phase is never enough to lift it at all.

## explicit_objective
Describe the experimental setup that defines isometric and isotonic contraction, explain the role of the series elastic component in each, and state the two effects of a heavier load on the isotonic sequence.

## arabic_label
تعريف الانقباض متساوي الطول ومتساوي التوتر والعنصر المرن المتسلسل

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-8CD0C1C03D5333

## label
Isometric and isotonic contraction differ in tension, length, sliding, duration, energy use, external work and mechanical efficiency

## definition
The book compares isometric and isotonic contraction across seven properties. Tension increases in isometric contraction but stays constant in isotonic. Length stays constant in isometric but shortens in isotonic. Sliding of the myofibrils along each other is less in isometric and more in isotonic. Duration is shorter for isometric and longer for isotonic. Energy need is less for isometric, since the load is not moved, and greater for isotonic, since the load is moved a distance. Work done is zero in isometric, since no load moves, and positive in isotonic, since the load moves a distance. Mechanical efficiency — the percentage of energy input converted into work — is zero for isometric contraction and 20 to 25 percent for isotonic. The book's own examples: isometric contraction is tensing the quadriceps to keep the knee stiff while standing; isotonic contraction, starting isometric and finishing isotonic, is lifting a heavy weight with the biceps; and running mixes both, isometric when a leg hits the ground and isotonic to move the limbs.

## explicit_objective
Reproduce the seven-row comparison the book gives between isometric and isotonic contraction, including the numeric mechanical efficiency figure, and match each contraction type to the book's own worked example.

## arabic_label
الفروق الأساسية بين الانقباض متساوي الطول ومتساوي التوتر

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-01E9132FDDF9F2

## label
Skeletal muscle develops maximal isometric tension at a sarcomere length of about 2.2 micrometres, where thick and thin filament overlap is optimal

## definition
The length-tension relationship plots the increasing initial (preload) muscle fibre length on the x-axis against the maximal active tension developed by isometric contraction on the y-axis. At minimal fibre length, with no passive stretch, isometric tension is zero. As initial length increases (more stretch), isometric tension rises up to a limit, beyond which further stretch decreases it. The mechanism is the overlap between thick and thin filaments: maximal force is developed at a sarcomere length of about 2.2 micrometres, the muscle's own resting length inside the body, where every cross-bridge on the thick filament has an actin filament opposite it. Stretching the sarcomere beyond 2.2 micrometres reduces the overlap, so some cross-bridges have no actin to bind, and force falls. Shortening the sarcomere below 2.2 micrometres also reduces force, because the two actin filaments now overlap each other as well as the myosin filament, which makes it harder for the muscle to develop tension.

## explicit_objective
Describe the shape of the length-tension curve, state the sarcomere length at which tension is maximal, and explain from filament overlap why tension falls on either side of that optimum.

## arabic_label
علاقة الطول بالتوتر وطول الساركومير الأمثل

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-B7A8FEB348BC9E

## label
As afterload increases, an isotonic muscle shortens more slowly and less, and the theoretical maximal shortening velocity occurs only at zero load

## definition
For a muscle to shorten during isotonic contraction, it must lift a weight called the afterload — the load the muscle encounters only after it has already started to contract. Increasing the afterload has two effects: the velocity of shortening decreases, because each cross-bridge cycle takes longer under a heavier load, and the amount of shortening decreases as well. The maximal velocity of shortening, V-max, occurs when there is no external load at all, but the book notes this is theoretical only, since a real load can never actually be zero.

## explicit_objective
Define afterload, state the two effects of increasing afterload on isotonic shortening, and explain why V-max is described as theoretical.

## arabic_label
علاقة الحمل بسرعة التقصر والحمل اللاحق والسرعة القصوى

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-C14F65CD68F720

## label
The whole muscle's contraction is graded by recruiting more motor units and by raising stimulation frequency toward tetanus, and Treppe raises twitch tension over the first few stimuli of a rested muscle

## definition
A motor unit is one spinal motor neuron together with all the muscle fibres its branching axon supplies; small units of 3 to 6 fibres serve fine, precise movements such as the hand and eye muscles, while large units of 100 to 200 fibres serve gross movements such as the leg and back muscles. The whole muscle's contraction is graded by two independent mechanisms. First, the strength of the stimulus sets recruitment: increasing stimulus strength activates more motor units, so the whole-muscle response rises gradually until a maximal stimulus activates every motor unit, after which a supramaximal stimulus adds nothing further, since each fibre already responds maximally under the all-or-none law. Second, the frequency of stimulation sets summation: raising it releases more Ca2+ from the sarcoplasmic reticulum with each stimulus, so contractions with incomplete relaxation between them (incomplete tetanus, or clonus) fuse at a high enough rate into complete tetanus, with no relaxation at all, and complete tetanus develops about four times the tension of an individual twitch because free Ca2+ accumulates in the myofibrils and the cross-bridges cycle continuously. Treppe, the staircase phenomenon, is the progressive rise in the size of separate twitch contractions to a plateau during repetitive stimulation of a previously rested muscle, explained by the same persistent rise in free cytoplasmic Ca2+.

## explicit_objective
Define a motor unit and give its typical fibre count in fine versus gross muscles, distinguish recruitment from frequency summation as the two mechanisms of grading, and define Treppe and its cause.

## arabic_label
تدرج تقلص العضلة عبر تجنيد الوحدات الحركية وزيادة التردد وظاهرة الدرج

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-3E5F54D8D58E9C

## label
Red slow fibres are oxidative and fatigue-resistant; pale fast fibres are glycolytic, powerful and quick to tire

## definition
Slow red type I fibres are small, innervated by small slowly conducting motor neurones, rich in oxidative enzymes and mitochondria, low in ATPase, surrounded by extensive capillaries and high in myoglobin, which stores oxygen; together these give a slow contractile mechanism, a large aerobic capacity and high resistance to fatigue. Fast pale type IIb fibres are larger, innervated by large rapidly conducting motor neurones, carry an extensive sarcoplasmic reticulum for rapid calcium release, large amounts of glycolytic enzymes and a high ATPase activity, and have less blood supply, less myoglobin and fewer mitochondria; they contract rapidly and fatigue quickly. Postural muscles such as soleus are mainly slow; muscles of fine skilled movement such as the extraocular muscles are mainly fast.

## explicit_objective
Contrast the two skeletal muscle fibre types by enzyme profile, capillary supply, myoglobin, mitochondria and fatigue resistance, and predict which predominates in a given muscle.

## arabic_label
أنواع الألياف العضلية الهيكلية

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-9A2D57D133DB52

## label
Muscle ATP is regenerated by three systems in sequence — phosphagen, glycogen-lactic acid, and aerobic — and the extra oxygen consumed afterward to restore them is the oxygen debt

## definition
At rest, skeletal muscle spends energy maintaining the resting membrane potential, synthesising substances such as glycogen, and producing muscle tone. During contraction, energy consumption rises sharply; ATP is the only immediate energy source, hydrolysed anaerobically by the myosin ATPase into ADP and inorganic phosphate, and the ATP already inside the muscle can support maximal contraction for only 5 to 6 seconds. Three systems reform it. The phosphagen system transfers energy from phosphocreatine to ADP almost instantly; muscle cells hold two to three times as much phosphocreatine as ATP, and together the phosphagen system can power maximal activity for 10 to 15 seconds, enough for a 100-metre run; phosphocreatine is restored later, during relaxation, by the reverse reaction. The glycogen-lactic acid system adds a further 30 to 40 seconds of activity by anaerobic glycolysis, producing lactic acid, which itself limits the system by causing extreme fatigue; the lactic acid is later partly oxidised to pyruvic acid, partly reconverted by the liver into glucose to replenish muscle glycogen, and partly used as fuel by the heart. The aerobic system oxidises glucose, fatty acids and amino acids in the mitochondria and can, in principle, sustain activity indefinitely as long as nutrients and oxygen are available; free fatty acids are the main substrate for resting muscle and for recovery. During recovery, ventilation and oxygen consumption stay elevated above resting levels to remove excess lactate and replenish ATP, creatine phosphate and myoglobin-bound oxygen — this extra post-exercise oxygen consumption is the oxygen debt, measured by subtracting the basal oxygen consumption from the total consumed until a constant basal level is reached again.

## explicit_objective
Name the three ATP-regeneration systems in the order the muscle draws on them, state each one's endurance time and its immediate fuel, and define oxygen debt and how it is measured.

## arabic_label
الأنظمة الثلاثة لتجديد الطاقة العضلية ودَين الأكسجين

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-2E4061334D52EA

## label
Muscle fatigue weakens and prolongs contraction and leaves relaxation incomplete, from lactic acid, ATP/glycogen/creatine phosphate depletion, impaired neuromuscular transmission and interrupted blood flow

## definition
Prolonged, strong contraction of a muscle leads to muscle fatigue, which decreases the strength of contraction, prolongs its duration, and leaves relaxation incomplete — a contracture. Four things cause it: accumulation of metabolites such as lactic acid, which raises intracellular acidity; depletion of muscle ATP, glycogen and creatine phosphate; diminished transmission at the neuromuscular junction; and interruption of blood flow through the contracting muscle, with loss of nutrient and especially oxygen supply.

## explicit_objective
Define muscle fatigue by its three functional effects on contraction, and list the four causes the book gives.

## arabic_label
إجهاد العضلة وأسبابه

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-6087C9C091ED85

## label
Rigor mortis is the total, permanent contracture of every muscle after death from loss of the ATP needed to separate actin and myosin, and it is used to help estimate time of death

## definition
Several hours after death, all the muscles of the body go into a state of contracture and become rigid even without any action potentials — rigor mortis. It is caused by the loss of ATP, which is needed to separate the actin and myosin filaments during relaxation; without it, the cross-bridges cannot detach and the filaments stay locked together. The muscles remain in rigor until the muscle proteins themselves are destroyed by bacterial putrefaction, 15 to 25 hours later. Rigor mortis has medicolegal importance because it helps in estimating the time of death.

## explicit_objective
State the mechanism of rigor mortis in terms of the ATP-dependent cross-bridge detachment step, give the time window before it resolves by putrefaction, and state its medicolegal use.

## arabic_label
التيبس الرمي وآليته وأهميته الطبية الشرعية

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-1030B9F3A5996A

## label
Denervated muscle passes through atrophy, then visible fasciculation from the dying nerve, then fibrillation from the muscle's own denervation hypersensitivity to acetylcholine

## definition
If the nerve supply to a muscle is injured, the muscle is paralysed — a lower motor neuron lesion — and passes through three changes. Muscle atrophy is a decrease in muscle size as the fibres are gradually replaced by fibrous tissue. Muscle fasciculation is spontaneous contraction of whole motor units, strong enough to be seen under the skin, occurring in the first few days after nerve damage as the degenerating nerve fibres discharge spontaneous impulses; it can be picked up on EMG by metal disc electrodes on the skin. Muscle fibrillation is spontaneous contraction of separate individual muscle fibres, occurring after the motor nerve fibres have completely degenerated; it is caused by denervation hypersensitivity — the denervated muscle becomes more sensitive to circulating acetylcholine and discharges spontaneously — and, because it cannot be seen under the skin, it can only be picked up on EMG by needle electrodes inserted into the muscle.

## explicit_objective
Sequence the three consequences of denervation, distinguish fasciculation from fibrillation by their cause, visibility and required EMG electrode, and name the mechanism behind fibrillation.

## arabic_label
استجابة العضلة لفقد التعصيب: الضمور والرجفان الحُزمي والرجفان الليفي

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.

---

# Item

## id
CON-MSK-2A62AFCCE09E9F

## label
Electromyography records a muscle's electrical activity through surface or needle electrodes on an oscilloscope

## definition
Electromyography is a record of a muscle's electrical activity using a cathode ray oscilloscope. The electrical activity is picked up either by a metal disc electrode placed on the skin overlying the muscle, or by a hypodermic needle electrode inserted into the muscle itself.

## explicit_objective
Define electromyography and name its two electrode techniques.

## arabic_label
تخطيط كهربية العضل وأسلوب تسجيله

## universities
+asu

## learner_years
+1

## modules
+ASU-LOCO

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
asuTeaching: ASU Year 1 Locomotor Physiology (Term 2) tests this exact fact in `MCQs - Locomotor Physiology Questions.pdf` (manifest src_3be9856ba9380e79cb01); no ASU-specific variance from the Kasr text found.
