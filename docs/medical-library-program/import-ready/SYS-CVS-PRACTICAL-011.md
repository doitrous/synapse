# Item
## id
PRA-CVS-CASE-ECG-REPEATED
## title
The ECG that looked abnormal until it was repeated
## subject
cvs
## type
Clinical case
## status
Draft
## owner
Clinical skills team
## duration
14
## marks
5
## difficulty
Moderate
## decisions
### What the machine is actually recording
Mr Kareem Sabry, 49, has an ECG before a hernia repair. The report reads "abnormal, ?anterior infarct". He has no symptoms and has never had chest pain.
Concept: CON-CVS-CEF955ABD51569
Difficulty: Easy
Q: What does the electrocardiogram record?
*= The heart's electrical activity, detected at the body surface
Why: Correct. The trace is a record of cardiac electrical activity picked up at the skin, and says nothing directly about how well the heart is pumping.
* The mechanical performance of the ventricles
Why: The most consequential misconception about the ECG: organised electrical activity can coexist with no cardiac output at all.
* Blood flow through the coronary arteries
Why: Ischaemia changes the trace, but flow is not what is recorded, and a normal trace does not establish normal coronary flow.
* The pressure generated inside the chambers
Why: Pressure is measured by catheter. Nothing on the trace is a pressure.
Rationale: Electrical, not mechanical, and measured at the surface. Every artefact in this case follows from that last part — what lies between the heart and the electrode changes what is recorded.

### How many electrodes, and where
Concept: CON-CVS-11B3FD36CE3B72
Difficulty: Easy
Q: The technician is asked to repeat the recording. How many electrodes does a 12-lead ECG use?
*= Ten — one on each limb and six on the chest
Why: Correct. Ten electrodes generate twelve leads, because a lead is a view constructed from electrodes rather than a wire of its own.
* Twelve, one per lead
Why: The obvious inference from the name and the single commonest error about the ECG. Leads are views, not electrodes.
* Six, one for each chest position
Why: Omits the limb electrodes, from which six of the twelve leads are derived.
* Fifteen, including the posterior and right-sided positions
Why: Those are added for an extended recording. The standard twelve come from ten.
Rationale: Twelve views from ten electrodes. Knowing that a lead is constructed rather than wired is what makes a misplaced chest electrode an obvious candidate when a trace looks wrong.

### Why placement changes the trace
Concept: CON-CVS-D9A834BAEAFF68
Difficulty: Moderate
Q: The repeat trace, with the chest electrodes correctly placed, is normal. Why does a couple of centimetres of electrode position matter so much?
*= The body conducts, so each electrode samples the heart's current from its own position — move it and you sample a different projection
Why: Correct. The tissues act as a volume conductor; the signal at the skin depends on where on that conductor you measure, so position determines the projection recorded.
* The electrode only works when it is directly over the heart
Why: Electrodes record from anywhere on the body, which is why limb leads work at all.
* The signal is carried to the electrode by nerves, which follow fixed paths
Why: Cardiac nerves carry autonomic traffic to the heart. Nothing relays the myocardial signal outwards to the skin.
* Skin resistance changes between positions, altering the size of the waves
Why: Contact quality genuinely affects the trace, and is worth checking — but it does not explain a reproducible pseudo-infarct pattern that resolves with correct placement.
Rationale: The whole body is the conductor and the electrode samples one point on it. High chest electrodes are a classic cause of a false anterior infarct pattern, and the fix is to repeat the recording rather than to refer the patient.

### Reading direction from size
Concept: CON-CVS-6CDC248C167C59
Difficulty: Moderate
Q: On the corrected trace, one limb lead shows the tallest positive R wave of all six. What does that indicate?
*= The mean depolarisation vector points closest to that lead's positive axis
Why: Correct. Each lead records the projection of the vector onto its own axis, so the largest positive deflection belongs to the most closely aligned lead.
* The muscle nearest that electrode is the thickest
Why: Wall thickness influences the size of the vector, but the *relative* sizes across leads report direction, not thickness.
* That lead has the best electrode contact
Why: Poor contact degrades a trace, but good contact does not produce a selectively tall R wave in one lead.
* The heart is displaced towards that electrode
Why: Position does affect the trace, and it is why this is chosen — but the systematic relationship between deflection size and lead axis is what is being tested.
Rationale: Size is projection. Once you read a deflection as the shadow the vector casts on that lead's axis, working out the axis becomes geometry rather than recall.

### Placing the axis
Concept: CON-CVS-8BB9DF2D4A4452
Difficulty: Hard
Q: Leads I and II show equally tall positive R waves. Where does the mean vector lie, and how do you know?
*= At about +30°, because it projects equally onto the axes of leads I and II, which lie at 0° and +60°
Why: Correct. Equal projections onto two known axes place the vector midway between them, and lead I at 0° with lead II at +60° gives +30°.
* At 0°, because lead I is positive
Why: A vector at 0° lies along lead I and would give lead I the largest deflection, not one equal to lead II.
* At +60°, because lead II is positive
Why: The mirror error: at +60° lead II would dominate rather than match lead I.
* It cannot be determined without aVF
Why: Two independent axes are enough to place a vector in the frontal plane. Checking a third lead is good practice, not a requirement.
Rationale: Two leads, two known axes, one geometric answer. Reading the axis this way survives when a remembered table does not.
## debrief
The case turns on one property of the ECG: it is a surface recording made through a conducting body, so where the electrodes sit determines what is recorded. A pseudo-infarct pattern from high chest electrodes is repeated, not referred. The last two decisions are the constructive half of the same fact — deflection size is projection, and two projections place the axis.
## main_concept
CON-CVS-D9A834BAEAFF68
## concept_ids
CON-CVS-CEF955ABD51569
CON-CVS-11B3FD36CE3B72
CON-CVS-6CDC248C167C59
CON-CVS-8BB9DF2D4A4452
## contextual_concept_ids
CON-CVS-2AD0E4A433C94D
## learning_objective
Explain why electrode placement changes an ECG, and determine a frontal-plane axis from the relative size of the limb-lead deflections.
## media_needed
### image · Why placement changes the trace
Brief: Paired 12-lead ECGs from one patient, the first with chest electrodes placed two intercostal spaces too high showing poor R-wave progression, the second correctly placed and normal
Kind: graph
Purpose: The artefact is only convincing when the same heart is seen recorded two ways.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
### image · Placing the axis
Brief: Hexaxial reference diagram with the six limb-lead axes labelled in degrees and a vector drawn at +30 degrees
Kind: diagram
Purpose: The geometry has to be seen for equal projections to place the vector.
Priority: strongly helpful
Status: needed
Source direction: openly licensed ECG teaching library
## references
Cardiac electrical activity and ECG foundations
PHYSIO CARDIOVASCULAR SYSTEM.pdf

---

# Item
## id
PRA-CVS-CASE-IRREGULAR-PREOP
## title
An irregular pulse found before an operation
## subject
cvs
## type
Clinical case
## status
Draft
## owner
Clinical skills team
## duration
15
## marks
5
## difficulty
Hard
## decisions
### What the missing wave means
Mrs Zeinab Roushdy, 74, is found to have an irregularly irregular pulse at 96 during a pre-operative assessment. The ECG shows no discrete P waves.
Concept: CON-CVS-236CE7171C7289
Difficulty: Easy
Q: What does the absence of discrete P waves indicate?
*= There is no single organised atrial depolarisation, as in atrial fibrillation
Why: Correct. A P wave is the record of one coordinated atrial depolarisation; chaotic atrial activity produces no discrete wave.
* The atria are electrically silent and are not depolarising at all
Why: In fibrillation the atria are electrically very active. Disorganised is not the same as absent.
* The sinoatrial node has stopped and a ventricular escape rhythm has taken over
Why: That gives a slow, regular rhythm with broad complexes, not an irregularly irregular one at 96.
* The P waves are buried within the QRS complexes
Why: This does happen in some rhythms and is worth looking for, but it would not produce an irregularly irregular ventricular response.
Rationale: No organised atrial depolarisation, so no P wave and no coordinated atrial contraction. Everything that follows in this case is the loss of that contraction.

### The contraction she has lost
Concept: CON-CVS-F9B09809C7715B
Difficulty: Moderate
Q: When in the cardiac cycle does atrial systole normally occur, and what does it contribute?
*= In late ventricular diastole, topping up filling just before the ventricle contracts
Why: Correct. Atrial systole occupies the end of ventricular diastole and adds the final portion of ventricular filling.
* At the start of ventricular systole, helping to close the atrioventricular valves
Why: Valve closure is driven by the rising ventricular pressure, and atrial contraction has finished by then.
* Throughout diastole, driving filling continuously
Why: Most of diastolic filling is passive and continuous; the atrial contribution is a discrete event at the end.
* During isovolumetric relaxation, before the atrioventricular valves open
Why: Nothing enters the ventricle while all valves are closed, which is what isovolumetric means.
Rationale: The atrium contracts last, into a ventricle that is already largely full. That timing is why losing it is tolerable at rest and much less so when diastole is short.

### The other irregular beat
Concept: CON-CVS-3909BF5F3376A2
Difficulty: Moderate
Q: Her daughter also has an irregular pulse, but hers is regular with occasional extra beats followed by a pause. What is that?
*= Premature beats — extra beats arising earlier than the next expected one
Why: Correct. An impulse arising early produces a beat out of sequence, and the compensatory pause that follows is what is felt as a skip.
* Atrial fibrillation, in a milder form
Why: Atrial fibrillation is irregularly irregular throughout, with no underlying regular rhythm to be early against.
* Intermittent atrioventricular block, with dropped beats
Why: Would give a pause with no preceding early beat, and the pattern described has one.
* Normal sinus arrhythmia varying with respiration
Why: A real and benign phenomenon, and a genuine differential — but it is a gradual cyclical variation, not discrete early beats with pauses.
Rationale: Irregularly irregular with no P waves is fibrillation; regular with early beats and pauses is ectopy. Distinguishing them at the pulse is the point of the comparison.

### Why the gate matters more now
Concept: CON-CVS-3FEBA4CA87A0BD
Difficulty: Moderate
Q: The atrioventricular node is limiting how many fibrillatory impulses reach her ventricles. What is the normal purpose of the delay at that node?
*= To let the atria complete their contribution to filling before the ventricles contract
Why: Correct. The hold separates atrial from ventricular systole so the atrial contribution is not wasted against a contracting ventricle.
* To slow the heart rate to a physiological range
Why: The rate is set by the sinoatrial node. The nodal delay times each beat; it does not set the rate.
* To allow the coronary arteries to fill before systole
Why: Coronary filling occurs during diastole but is not what the atrioventricular delay is timed for.
* To give the ventricular muscle time to repolarise after the previous beat
Why: At normal rates repolarisation is complete well before the next atrial impulse arrives.
Rationale: The delay exists for coordinated filling. In fibrillation that coordination is already lost, and the node's refractoriness — a separate property — is what protects the ventricles from the atrial rate.

### Why the QRS stays narrow
Concept: CON-CVS-77AA16A0BD5F70
Difficulty: Hard
Q: Despite the chaos above, her QRS complexes are narrow. What does that tell you, and what property of the working myocyte underlies it?
*= The impulse is reaching the ventricles through the conducting system; working myocytes have a fast response, and the specialised fibres exploit it to activate both ventricles almost together
Why: Correct. A narrow QRS means rapid, near-simultaneous ventricular activation by the conducting system. The fast sodium-driven upstroke of the working myocyte is what allows conduction to be quick once the impulse arrives.
* The ventricles are being activated muscle-to-muscle, which is the faster route
Why: Inverts the two routes. Muscle-to-muscle conduction is the slower one and widens the QRS.
* The atria are activating the ventricles directly across the fibrous skeleton
Why: The fibrous skeleton does not conduct; the atrioventricular bundle is the only route.
* Working myocytes have a slow response, like nodal tissue, which keeps the complex narrow
Why: Working myocytes have a fast response; nodal cells are the slow ones. The attributes are the right way round only in the correct answer.
Rationale: A narrow complex is a statement about the route taken. It says the conducting system is intact, which is reassuring in a patient whose atria have stopped working in an organised way at all.
## debrief
One finding — no P waves — accounts for the irregular pulse, the lost atrial contribution to filling, and the symptoms that appear on exertion rather than at rest. The narrow QRS is the reassuring half: however disorganised the atria, the impulse is still reaching the ventricles by the fast route.
## main_concept
CON-CVS-236CE7171C7289
## concept_ids
CON-CVS-F9B09809C7715B
CON-CVS-3909BF5F3376A2
CON-CVS-3FEBA4CA87A0BD
CON-CVS-77AA16A0BD5F70
## contextual_concept_ids
CON-CVS-D50119DD90A9D7
CON-CVS-C2030AF413E220
## learning_objective
Recognise atrial fibrillation from the absent P wave and the irregular ventricular response, and explain a narrow QRS from the route the impulse takes.
## media_needed
### image · What the missing wave means
Brief: Rhythm strip of atrial fibrillation beside one of sinus rhythm with premature atrial beats, both at a similar rate
Kind: graph
Purpose: The two irregular pulses in this case are distinguished by eye, and only a side-by-side comparison teaches it.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
## references
Cardiac electrical activity and ECG foundations
Cardiac cycle and heart sounds
Cardiac conduction system
PHYSIO CARDIOVASCULAR SYSTEM.pdf

---

# Item
## id
PRA-CVS-CASE-ENERGY-DRINKS
## title
Palpitations after three energy drinks
## subject
cvs
## type
Clinical case
## status
Draft
## owner
Clinical skills team
## duration
15
## marks
5
## difficulty
Hard
## decisions
### Naming the abnormal depolarisation
Youssef Ghanem, 21, has palpitations during exam week after several energy drinks and little sleep. His ECG between episodes shows frequent extra beats.
Concept: CON-CVS-8AC3AE83A9DFA9
Difficulty: Easy
Q: An extra beat can arise from an abnormal depolarisation triggered by the preceding action potential. What is that called?
*= An afterdepolarisation
Why: Correct. It is a depolarisation triggered by a preceding action potential, and if it reaches threshold it starts a new one.
* A pacemaker potential
Why: The normal slow diastolic depolarisation of a pacemaker cell — spontaneous, not triggered by the beat before it.
* A threshold potential
Why: The voltage at which an action potential fires, not a depolarisation in its own right.
* A repolarisation reserve
Why: A real concept in describing how well a cell resists prolonged repolarisation, but not the name of the depolarisation itself.
Rationale: Triggered activity depends on a preceding beat, which is exactly what separates it from the spontaneous automaticity of a pacemaker cell.

### The kind that follows the beat
Concept: CON-CVS-B4232A29680959
Difficulty: Moderate
Q: One arising after repolarisation is complete, favoured by calcium loading, is which type — and what does it do at threshold?
*= A delayed afterdepolarisation, which triggers a full action potential once threshold is reached
Why: Correct. It occurs after repolarisation, is promoted by intracellular calcium loading and adrenergic drive, and triggers a propagated beat at threshold.
* An early afterdepolarisation, occurring once repolarisation is complete
Why: Self-contradictory: early afterdepolarisations interrupt repolarisation rather than follow it.
* A delayed afterdepolarisation, which cannot trigger a propagated beat
Why: Half right, and the wrong half matters — reaching threshold is precisely what makes it propagate.
* A subthreshold oscillation, which never produces a clinical beat
Why: Below threshold nothing propagates, which describes the case where no extra beat occurs.
Rationale: Calcium loading and adrenergic drive both favour this mechanism, which is why stimulants and stress produce it. Threshold is the step that turns a membrane abnormality into a beat the patient feels.

### The kind that interrupts it
Concept: CON-CVS-C09D8C1327DFB7
Difficulty: Moderate
Q: His QT interval is long. Which type of afterdepolarisation does that favour, and why?
*= An early afterdepolarisation, because prolonged repolarisation gives one time to develop and reach threshold
Why: Correct. Early afterdepolarisations arise during repolarisation, so lengthening that phase widens the window in which one can occur.
* A delayed afterdepolarisation, because the long QT loads the cell with calcium
Why: Delayed afterdepolarisations are calcium-related but arise after repolarisation, and are not the ones a long QT favours.
* Neither, because the QT interval reflects only ventricular size
Why: The QT interval is a repolarisation time, not a size, and its length is directly relevant here.
* Both equally, since the QT interval covers the whole action potential
Why: The interval does span depolarisation and repolarisation, which is why this is tempting — but only the early type arises within repolarisation itself.
Rationale: The timing names the mechanism, and the mechanism points at the cause. Reading the QT interval is what tells you which of the two you are dealing with.

### The drug that acts on the pathway
Concept: CON-CVS-BD9C1C359D7284
Difficulty: Moderate
Q: During one episode his rate is 200 and regular, and adenosine is discussed. By what cellular mechanism does adenosine act?
*= It inhibits cAMP production, reducing contractility and slowing nodal tissue
Why: Correct. Adenosine acts through receptors that inhibit adenylate cyclase; the fall in cAMP reduces contractility and slows the nodal tissue that depends on that signalling.
* It raises cAMP, slowing the node while increasing contractility
Why: Right pathway, wrong direction, and internally inconsistent — raising cAMP speeds nodal tissue.
* It blocks fast sodium channels in the working myocardium
Why: The mechanism of a different drug class, acting on ventricular muscle rather than on the node.
* It acts only on vascular smooth muscle, with no cardiac effect
Why: Its vascular effects are real and cause its side effects, but a purely vascular action would not explain a cardiac one.
Rationale: cAMP is the common currency: catecholamines raise it and speed the node, adenosine lowers it and slows both nodal tissue and contractility. Caffeine and the drinks he has taken push the same pathway the other way.

### The single bridge the impulse must cross
Concept: CON-CVS-CF48F93FFC8A7A
Difficulty: Hard
Q: The team explains that slowing conduction between atria and ventricles will terminate the rhythm. What is the anatomical course of the only conducting bridge between them?
*= The atrioventricular bundle passes from the atrioventricular node through the fibrous skeleton onto the interventricular septum
Why: Correct. The bundle penetrates the non-conducting fibrous skeleton and continues onto the septum, and it is the sole electrical connection between the chambers.
* Several bundles cross the fibrous skeleton in every heart, giving alternative routes
Why: An accessory pathway is an abnormality present in a minority of hearts, not a normal second route.
* The bundle runs in the coronary sulcus with the circumflex artery before entering the septum
Why: Confuses the conducting pathway with a vessel's course; the bundle does not travel in the sulcus.
* Conduction passes directly through the fibrous rings, which conduct slowly
Why: The fibrous skeleton does not conduct at all, which is exactly why the bundle exists.
Rationale: One bridge across one insulating plate. That is why slowing conduction at the node can stop a re-entrant rhythm that depends on crossing it, and why block at that point leaves the ventricles with nothing but an escape rhythm.
## debrief
Two afterdepolarisations, told apart by when they occur: delayed ones follow repolarisation and are driven by calcium and adrenergic tone, early ones interrupt a prolonged repolarisation. The stimulants push the first mechanism; the QT interval reports the second. The final decision is the anatomy that makes the treatment make sense — one bundle, one plate, one place to intervene.
## main_concept
CON-CVS-8AC3AE83A9DFA9
## concept_ids
CON-CVS-B4232A29680959
CON-CVS-C09D8C1327DFB7
CON-CVS-BD9C1C359D7284
CON-CVS-CF48F93FFC8A7A
## contextual_concept_ids
CON-CVS-3909BF5F3376A2
CON-CVS-8452EED3F9CFB2
## learning_objective
Distinguish early from delayed afterdepolarisations by their timing and their triggers, and explain nodal drugs through the cAMP pathway.
## media_needed
### image · The kind that interrupts it
Brief: Action potential traces showing an early afterdepolarisation interrupting phase 3 and a delayed afterdepolarisation following phase 4, side by side
Kind: graph
Purpose: The two mechanisms are defined by where they sit on the action potential, which is a shape rather than a sentence.
Priority: required
Status: needed
Source direction: openly licensed cardiac electrophysiology figure
## references
Cardiac electrical activity and ECG foundations
Cardiac conduction system
Cardiac output, preload and afterload
PHYSIO CARDIOVASCULAR SYSTEM.pdf

---

# Item
## id
PRA-CVS-CASE-SCHOOL-MURMUR
## title
A murmur heard at a school medical
## subject
cvs
## type
Clinical case
## status
Draft
## owner
Clinical skills team
## duration
14
## marks
5
## difficulty
Challenging
## decisions
### Where the aortic valve actually is
Farida Kamal, 13, is found to have a systolic murmur at a school medical. She is well, plays sport, and has no symptoms.
Concept: CON-CVS-7539FD9FAC1751
Difficulty: Easy
Q: Where does the aortic valve project onto the chest wall?
*= Behind the sternum, at about the level of the left third intercostal space
Why: Correct. The aortic orifice lies retrosternally on the left, in the middle of the group of four valve projections.
* In the second right intercostal space, at the sternal edge
Why: That is where the aortic valve is *listened to*. Projection and auscultation area are different things, which is what this case is about.
* At the apex, in the fifth left intercostal space
Why: The apex is the mitral auscultation area and is remote from the aortic orifice.
* Behind the xiphisternum, at the level of the seventh costal cartilage
Why: Too low; the valve projections cluster around the third and fourth costal cartilages.
Rationale: All four valves lie close together behind the sternum, in an oblique line. That is the anatomy; where you place a stethoscope is a separate question with a separate answer.

### What has to be exceeded for the valve to open
Concept: CON-CVS-974D60394FF346
Difficulty: Moderate
Q: During isovolumetric contraction, what determines the moment the aortic valve opens?
*= Ventricular pressure exceeding aortic pressure
Why: Correct. A semilunar valve opens when the pressure difference across it reverses — nothing else.
* Ventricular pressure exceeding atrial pressure
Why: That comparison governs closure of the mitral valve at the start of systole, not opening of the aortic valve.
* A fixed opening pressure set by the valve cusps
Why: Treats opening as a property of the valve. Cusps have no threshold of their own; they respond to the pressure across them.
* The end of atrial systole
Why: A timing landmark earlier in the cycle, with no direct bearing on when the outflow valve opens.
Rationale: A valve opens when the pressure across it reverses. Because the two ventricles face very different downstream pressures, the same contraction opens the two semilunar valves at different moments.

### Where you listen for the other left-sided valve
Concept: CON-CVS-A6FBEEAD8427BD
Difficulty: Moderate
Q: Where does the mitral valve project, and where is it auscultated?
*= It projects behind the left half of the sternum at the fourth costal cartilage, and is auscultated at the apex
Why: Correct. The projection is retrosternal; the auscultation area is at the apex, downstream in the direction of flow into the left ventricle.
* It projects at the apex and is auscultated there
Why: Collapses projection into auscultation area, which is the error this case is built to correct.
* It projects at the left second intercostal space and is auscultated at the apex
Why: The left second space corresponds to the pulmonary projection, not the mitral one.
* It projects behind the sternum and is auscultated at the left sternal edge
Why: The left sternal edge is the tricuspid area; the mitral valve is heard at the apex.
Rationale: One valve, two places, for two different reasons — anatomy for the projection, the direction of blood flow for the area. They are learned as a pair because an examiner may ask for either.

### Reading her chest film
Concept: CON-CVS-1D2C77D7421EF7
Difficulty: Moderate
Q: A chest radiograph is normal. Which chamber forms the upper part of the right cardiac border?
*= The right atrium
Why: Correct. The right atrium forms the right border of the cardiac silhouette, so the upper cardiac border on that side is atrial.
* The right ventricle
Why: The right ventricle lies anteriorly and forms the sternocostal surface, not the right border on a frontal film.
* The left atrium
Why: The most posterior chamber, normally hidden within the silhouette and appearing at the border only when enlarged.
* The superior vena cava along its whole length
Why: The cava contributes to the mediastinal border above the heart, but the cardiac border itself is atrial.
Rationale: Each border belongs to a chamber. Knowing which turns "the heart looks normal" into a statement about specific chambers, and is what makes a subtle enlargement noticeable.

### Putting anatomy and sound together
Concept: CON-CVS-AA14CA86F39233
Difficulty: Challenging
Q: Her murmur is loudest in the second right intercostal space, yet you have just said the aortic valve lies behind the sternum on the left. Reconcile the two.
*= Sound is carried downstream in the direction of flow, so a valve is heard where its jet reaches the chest wall, not where the valve sits
Why: Correct. The auscultation areas are chosen for transmission: blood ejected through the aortic valve travels up the ascending aorta towards the right second space and the neck, carrying the sound with it.
* The projection is theoretical, and the auscultation area marks the true position
Why: Reverses which is which. The projections are the anatomical positions; the areas are chosen for where the sound arrives.
* The murmur must be arising from a different valve than the aortic
Why: A reasonable instinct, and the reason a full examination checks every area — but the mismatch described is the normal arrangement, not evidence of a different origin.
* Bone conducts the sound from the sternum to the right second space
Why: Bone conduction does not account for the specific, reproducible pattern of radiation along the direction of flow.
Rationale: Anatomy says where the valve is; haemodynamics says where you will hear it. Holding both, and knowing they differ, is what lets a student reconcile a projection diagram with a stethoscope without deciding one of them is wrong.
## debrief
The case is one reconciliation: four valves crowded behind the sternum, four listening areas spread across the praecordium, and the direction of blood flow explaining the gap between them. The two decisions in the middle supply the mechanism — a valve opens when the pressure across it reverses, and the sound of flow through it travels onward with the blood.
## main_concept
CON-CVS-AA14CA86F39233
## concept_ids
CON-CVS-7539FD9FAC1751
CON-CVS-974D60394FF346
CON-CVS-A6FBEEAD8427BD
CON-CVS-1D2C77D7421EF7
## contextual_concept_ids
CON-CVS-625E445610F27A
CON-CVS-5621D16508394C
## learning_objective
Reconcile the anatomical projection of each cardiac valve with the area at which it is auscultated, using the direction of blood flow.
## media_needed
### image · Where the aortic valve actually is
Brief: Anterior chest wall showing the four valve projections in one colour and the four auscultation areas in another, on the same figure
Kind: anatomy plate
Purpose: The distance between a valve and the place it is heard is the whole lesson, and needs both marked on one image.
Priority: required
Status: needed
Source direction: openly licensed anatomy atlas
### audio · Putting anatomy and sound together
Brief: Recording of an ejection systolic murmur at the aortic area, then the same murmur recorded over the carotid
Kind: other
Purpose: Radiation along the direction of flow is an auditory finding, demonstrated by comparing two recording sites.
Priority: strongly helpful
Status: needed
Source direction: openly licensed cardiac auscultation library
## references
Cardiac chambers, septa and valves
Cardiac cycle and heart sounds
Heart orientation and pericardium
ANATOMY CARDIOVASCULAR SYSTEM.pdf
