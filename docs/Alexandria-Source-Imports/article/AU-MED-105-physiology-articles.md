<!--
  AU-MED-105 Physiology · the three articles teaching this lane's 11 NEW
  concepts (concept/AU-MED-105-physiology-concepts.md). Both directions of
  LANE-BRIEF §22's two-sided coverage rule are written: each article names
  every concept it teaches in related_concepts, and the concept file (already
  committed to disk) names each article back in its own article_ids.

  Continuous conduction is sourced from this module's own AU-MED-105 Physiology
  department book (Dr_ Gawad book.pdf, src_7b3e43ce7d0febdb4856). The ten
  cardiac-electrophysiology concepts are sourced from the sibling AU-MED-106
  Physiology department book by the same lecturer (Physiology - Dr. Gawad.pdf,
  src_7cde132d457b51ef9203) rather than an external standard textbook, because
  AU-MED-105's own two Physiology books teach no cardiac muscle content at all
  (confirmed in the triage) while this real, page-quotable Alexandria corpus
  source does — a stronger, better-attested source than an uncited textbook
  chapter, per the law of priority's own source-tier ranking (department files
  over standard textbooks). See each article's evidence_basis and field_notes.

  Validate: npm run medical:batch -- docs/Alexandria-Source-Imports/article/AU-MED-105-physiology-articles.md
-->

# Item

## id
ART-NEU-CONTINUOUS-CONDUCTION

## title
Continuous conduction in the unmyelinated nerve fibre

## arabic_title
التوصيل المستمر في الألياف العصبية العارية من الميالين

## aliases
Continuous conduction
Point-to-point nerve conduction
Local-circuit conduction in unmyelinated fibres

## subject
neuro

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU-T01-S02-M03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
An unmyelinated nerve fibre has no insulated internode to let its impulse jump across, so it conducts the only way it can: continuously, patch by patch, along its entire bare membrane. This article explains why that mechanism is slower and more metabolically costly than the saltatory conduction of a myelinated fibre of similar diameter, and why the two are easy to tell apart on an exam stem once the underlying structural difference is clear.

## sections
### Definition
Continuous conduction is the propagation of a nerve action potential along an unmyelinated fibre by depolarising every successive patch of membrane in turn, with no segment skipped. It is the default conduction mechanism for any fibre that has no myelin sheath to insulate stretches of its length.

### Mechanism
An effective (threshold) stimulus at one point of an unmyelinated fibre opens voltage-gated Na+ channels at that point, and the resulting depolarisation sets up a local circuit of current between the newly depolarised patch and the immediately adjacent resting membrane. That local current depolarises the neighbouring patch to its own threshold, opening its voltage-gated Na+ channels in turn, and the process repeats continuously along the entire length of the fibre in both directions away from the original stimulus. Because every patch of membrane, not just discrete specialised points, must be individually excitable, there is no membrane segment for the current to skip, and the impulse cannot travel any faster than one adjacent patch of membrane can depolarise the next.

### Key determinants
Conduction velocity in an unmyelinated fibre is set by fibre diameter (a wider fibre offers lower internal resistance to the local circuit current and so conducts somewhat faster) and by how quickly each successive patch reaches threshold. Typical unmyelinated-fibre conduction velocities are in the range of about 0.5–3 m/s, far slower than a myelinated fibre of comparable diameter. Because every excited patch of membrane must also be restored afterwards by the Na+/K+ pump, continuous conduction over a given distance is also more metabolically costly than saltatory conduction covering the same distance.

### Clinical significance
Unmyelinated C fibres, which conduct by this continuous mechanism, carry slow, dull, poorly localised pain and are the reason a second, delayed wave of pain is felt after an initial sharp sensation carried by faster myelinated fibres. Recognising continuous conduction as the mechanism specific to unmyelinated fibres is also what correctly separates it from a demyelinating process, which slows conduction in a fibre that used to be myelinated, a different pathological picture from a fibre that was never myelinated in the first place.

### Common misconceptions
A diagram showing the impulse "moving along" a fibre is sometimes read as showing saltatory conduction regardless of which fibre type is drawn. Continuous conduction is defined by the absence of any myelinated internode: there is no low-resistance insulated segment for the local current to leap across, so every adjacent patch of bare membrane must be depolarised in sequence rather than skipped, which is the opposite of what happens at a node of Ranvier in a myelinated fibre.

## published_summary


## published_sections


## hold_these
Continuous conduction depolarises every patch of bare membrane in sequence; there is no insulated segment for current to skip, which is what makes it slow.
Typical unmyelinated conduction velocity is about 0.5–3 m/s, and it costs more metabolic energy per unit distance than saltatory conduction, because every excited patch must be restored by the Na+/K+ pump.

## lose_the_mark
Calling continuous conduction "saltatory" once a diagram shows the impulse moving along the fibre, instead of checking whether the fibre is myelinated.
Assuming continuous conduction is a non-propagated, decaying response like the local excitatory state — it is a true, fully propagated action potential, just a slow one.

## callout_evidence


## related_concepts
CON-NEU-C578CBFD9ED6A9

## related_articles
ART-CVS-CARDIAC-PACEMAKER-AP: this lane's other new AU-MED-105 Physiology article, for a reader working through this batch's whole excitable-tissue coverage (the closer thematic match, ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION on saltatory conduction/myelination, is a Kasr article the batch validator cannot resolve outside its own directory — see field_notes)

## question_ids


## resource_ids
src_7b3e43ce7d0febdb4856

## article_source_ids
src_7b3e43ce7d0febdb4856

## claim_ids
CLM-NEU-CONTINUOUS-CONDUCTION-01

## span_ids
SPN-NEU-CONTINUOUS-CONDUCTION-01

## universities
au

## years
AU_Y1

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Properties of the nerve > Conduction of the nerve impulse

## university_notes


## annotations
### definition_of · CON-NEU-C578CBFD9ED6A9
Quote: Continuous conduction is the propagation of a nerve action potential along an unmyelinated fibre by depolarising every successive patch of membrane in turn, with no segment skipped.
Block: body

## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
This department's two Physiology teaching texts (Dr_ Aliaa book.pdf and Dr_ Gawad book.pdf, both AU-MED-105) state and describe continuous conduction directly. The mechanism, sequence and typical velocity range above are drawn and quoted from Dr_ Gawad book.pdf p21 (src_7b3e43ce7d0febdb4856), cited with page locators in this lane's evidence file.

## evidence_gaps
[clear]

## conflicts


## last_reviewed


## review_due


## notes


## field_notes
arabicTitle: Researched and supplied.
aliases: Already filled above.
microtopicId: No finer canonical microtopic exists under DIS-PHY-T07 for this specific mechanism beyond the nerve-conduction subtopic already named.
nanotopicId: Same reason as microtopicId.
media: No rights-cleared asset exists yet for this article.
universityNotes: Alexandria's own bank (lec 3 physiology MSK Q2) tests this exact mechanism directly against the department's own teaching; no divergent local teaching to record.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-CVS-CARDIAC-PACEMAKER-AP

## title
The cardiac pacemaker: automaticity, the pacemaker potential, intrinsic rate and the pacemaker action potential

## arabic_title
جهد فعل الناظمة القلبية وآلية التلقائية

## aliases
Cardiac automaticity
Pacemaker potential
Slow (nodal) cardiac action potential
Intrinsic heart rate

## subject
cvs

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic


## nanotopic


## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
9

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
The heart does not need a nerve to tell it to beat: its own specialised conducting cells are myogenic, capable of firing spontaneously, and the sinoatrial (SA) node normally wins the race to threshold because it discharges fastest of all of them. This article follows that automaticity down to the ionic mechanism — why the pacemaker potential never sits still, what the funny current does, and how the resulting slow (nodal) action potential differs from the fast action potential of ordinary working heart muscle, including the plateau that couples the fast action potential to contraction.

## sections
### Definition
Cardiac automaticity is the capacity of the heart's own specialised conducting tissue — the sinoatrial (SA) node, the atrioventricular (AV) node, and the Purkinje system — to generate rhythmic action potentials spontaneously, without any external nerve stimulus. Because the SA node's cells discharge spontaneously and rapidly, at about 60–100 times a minute, faster than any other part of the conducting system can discharge on its own, the SA node is the heart's normal pacemaker: its own rate of discharge is what determines the heart rate. This spontaneous, unstable SA-node discharge rate, before any autonomic modulation, is what is meant by the intrinsic heart rate.

### Mechanism
A pacemaker cell never rests at a fixed membrane potential the way ordinary heart muscle does. At the end of repolarisation the membrane hyperpolarises to about −60 mV, and that hyperpolarisation is exactly what activates the "funny current" (I_f), a slow inward Na+ current that starts driving the membrane to depolarise again — this spontaneous drift is the prepotential, or diastolic depolarisation, and it is why the pacemaker potential is inherently unstable rather than a flat resting level. As the potential drifts to about −50 mV, transient (T-type) Ca2+ channels open and add a further slow inward current, carrying the membrane the rest of the way to the firing level of about −40 mV, where L-type Ca2+ channels open and produce the upstroke of the next action potential — a slow upstroke, because the fast Na+ channels available to ordinary myocardium are already inactivated at this less negative operating range. A working atrial or ventricular myocyte, in contrast, sits at a stable resting potential of about −90 mV until an external stimulus arrives, then fires a fast, high-magnitude upstroke through fast voltage-gated Na+ channels, and only then enters its own action potential: a rapid initial (phase 1) partial repolarisation through K+ efflux, then a plateau (phase 2) in which continuing Ca2+ influx through L-type channels is nearly balanced by K+ efflux, holding the membrane flat for 0.1–0.2 seconds before Ca2+ channels finally close and K+ efflux completes repolarisation (phase 3) back to the resting level.

### Key determinants
The intrinsic heart rate is a property of the SA node's own ionic currents (mainly the funny current and the T-/L-type Ca2+ currents), not of the autonomic nerves that later modulate it — at rest, parasympathetic (vagal) tone predominates over sympathetic tone on the SA node, which is why the observed resting heart rate sits below the node's own unmodulated intrinsic rate. If the SA node is damaged, a slower latent pacemaker, usually the AV node, takes over at its own, lower intrinsic rate. The plateau's Ca2+ entry is also what mechanically matters for contraction: it triggers further Ca2+ release from the sarcoplasmic reticulum (calcium-induced calcium release), which is what actually couples the fast cardiac action potential to the heart muscle's own contraction.

### Clinical significance
SA node failure or dysfunction (sick sinus syndrome) forces a slower latent pacemaker to take over, producing bradycardia at that pacemaker's own lower intrinsic rate. Drugs and disease states that shift the funny current or the T-/L-type Ca2+ currents (for example, ivabradine, which specifically blocks I_f) change heart rate by acting exactly on this prepotential mechanism, which is why understanding it matters beyond the exam room. Prolongation of the plateau (phase 2), from excess Ca2+ entry or reduced K+ efflux, prolongs the QT interval and predisposes to dangerous ventricular arrhythmias.

### Common misconceptions
Attributing the SA node's pacemaker role to its anatomical position or to a special nerve supply, rather than to its being the fastest of the heart's several automatic tissues. Assuming the pacemaker potential's drift is carried by the same fast Na+ channels that depolarise nerve and working cardiac muscle — those channels are inactivated at the pacemaker cell's less negative operating range, and the slow diastolic drift is carried first by the funny current, then by T-type and L-type Ca2+ channels. Treating the plateau as a period when "nothing is happening" electrically, when in fact two large, closely matched opposing currents (Ca2+ in, K+ out) are both active throughout it. Conflating "intrinsic heart rate" with the observed resting heart rate, which is lower because vagal tone predominates on the node at rest.

## published_summary


## published_sections


## hold_these
The SA node is the normal pacemaker purely because its own spontaneous discharge rate is the fastest of the heart's automatic tissues, not because of its position or innervation.
Hyperpolarisation itself switches on the funny current (I_f); that is the specific trigger of the pacemaker potential's instability, not a generic "leaky membrane".
The plateau is a near-balance of two large opposing currents (Ca2+ in via L-type channels, K+ out), not electrical silence, and that same Ca2+ entry drives calcium-induced calcium release, coupling the action potential to contraction.

## lose_the_mark
Saying the SA node paces the heart because of where it sits (junction of the superior vena cava and right atrium) rather than because it discharges fastest.
Attributing the pacemaker potential's slow upstroke to fast Na+ channels instead of L-type Ca2+ channels — fast Na+ channels are inactivated at the pacemaker cell's less negative resting range.
Equating the intrinsic heart rate with the resting heart rate actually observed, ignoring that vagal tone lowers the latter below the former at rest.

## callout_evidence


## related_concepts
CON-CVS-4ECCADC8992792
CON-CVS-81E96340AE844D
CON-CVS-694550FD793D4A
CON-CVS-2E009F84C99B77
CON-CVS-A4657614AE6923

## related_articles
ART-CVS-CONDUCTION-CONTRACTILITY: the conduction-velocity and contractility article this one's pacemaker mechanism feeds into

## question_ids


## resource_ids
src_7cde132d457b51ef9203

## article_source_ids
src_7cde132d457b51ef9203

## claim_ids
CLM-CVS-SAN-PACEMAKER-DOMINANCE-01
CLM-CVS-PACEMAKER-POTENTIAL-MECHANISM-01
CLM-CVS-INTRINSIC-HEART-RATE-01
CLM-CVS-AP-PLATEAU-MECHANISM-01
CLM-CVS-PACEMAKER-VS-WORKING-AP-01

## span_ids
SPN-CVS-SAN-PACEMAKER-01
SPN-CVS-PACEMAKER-POTENTIAL-01
SPN-CVS-INTRINSIC-RATE-01
SPN-CVS-AP-PLATEAU-01
SPN-CVS-PACEMAKER-VS-WORKING-01

## universities
au

## years
AU_Y1

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Cardiac automaticity
AU-MED-105 > Physiology > Cardiac electrophysiology > Pacemaker action potential
AU-MED-105 > Physiology > Cardiac electrophysiology > Cardiac muscle action potential
AU-MED-105 > Physiology > Cardiac electrophysiology > Pacemaker versus working myocardial action potential

## university_notes


## annotations
### definition_of · CON-CVS-4ECCADC8992792
Quote: the SA node is the heart's normal pacemaker: its own rate of discharge is what determines the heart rate
Block: body

### definition_of · CON-CVS-81E96340AE844D
Quote: that hyperpolarisation is exactly what activates the "funny current" (I_f), a slow inward Na+ current that starts driving the membrane to depolarise again
Block: body

### definition_of · CON-CVS-2E009F84C99B77
Quote: a plateau (phase 2) in which continuing Ca2+ influx through L-type channels is nearly balanced by K+ efflux, holding the membrane flat for 0.1–0.2 seconds
Block: body

## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
Neither of AU-MED-105's own two Physiology department books (Dr_ Gawad book.pdf, Dr_ Aliaa book.pdf — both titled "Musculo-Skeletal System (Excitable Tissues)") mentions cardiac muscle at all; both cover nerve, skeletal-muscle and smooth-muscle physiology only (confirmed in the triage by a full read of both books, five Gawad handouts and eight Aliaa lecture boards). This is real AU-MED-105 bank content (ten of the module's own Physiology bank questions test exactly this cardiac electrophysiology), so per the chief-of-staff ruling it is authored against the best available source: the same lecturer's (Dr Gawad's) own Physiology department book for AU-MED-106, the Cardiorespiratory System module of the same Year 1 ("Physiology - Dr. Gawad.pdf", src_7cde132d457b51ef9203, pp3–12), which is a real, page-quotable Alexandria corpus source rather than an uncited external textbook chapter.

## evidence_gaps
[clear]

## conflicts


## last_reviewed


## review_due


## notes


## field_notes
arabicTitle: Researched and supplied.
aliases: Already filled above.
microtopicId: No finer canonical microtopic exists under this subtopic for the four clustered ideas this article teaches together.
nanotopicId: Same reason as microtopicId.
media: No rights-cleared asset exists yet for this article.
universityNotes: This department's own two AU-MED-105 Physiology books do not teach cardiac electrophysiology at all; the module's own bank ("MCQs - أسئلة جواد") tests it regardless, so it is taught here from the sibling AU-MED-106 Physiology department book by the same lecturer, per the chief-of-staff ruling on this triage's scope-defining surprise.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-CVS-CONDUCTION-CONTRACTILITY

## title
Cardiac conduction velocity, the Purkinje system, contractility and the Frank-Starling law

## arabic_title
سرعة التوصيل القلبي وقانون فرانك-ستارلينغ

## aliases
Cardiac conduction system
Purkinje fibre conduction
AV nodal delay
Cardiac contractility
Frank-Starling law

## subject
cvs

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic


## nanotopic


## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02 | SYS-CVS-T01-S02-M02

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
9

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Two separate cardiac properties are easy to mix up on an exam: how fast an impulse travels through different cardiac tissues, and how forcefully the heart muscle contracts once activated. This article covers the first (the deliberately slow AV node and the deliberately fast Purkinje system, and how vagal tone alters the AV node's delay) and the second (contractility as a calcium-dependent, length-independent property, and the Frank-Starling law as a distinct, length-dependent one), because the module's own bank tests both and the distinction between them is exactly what a good exam question probes.

## sections
### Definition
Cardiac conduction velocity is how fast the depolarising wavefront travels through a given type of cardiac tissue; it ranges from about 0.05 m/s in the atrioventricular (AV) node, the slowest of any cardiac tissue, up to about 4 m/s in the Purkinje system, the fastest. Cardiac contractility (the inotropic state) is a separate property: a change in the force of contraction at any given fibre length, distinct from the length-dependent Frank-Starling effect, which states that, within physiological limits, the tension a cardiac fibre develops is directly proportional to its initial length as set by end-diastolic volume (EDV, i.e. preload).

### Mechanism
Conduction velocity depends on fibre diameter and gap-junction density: the AV node's small, sparsely gap-junctioned fibres conduct slowly, deliberately delaying the impulse so the atria finish emptying into the ventricles before ventricular depolarisation begins, and so an abnormally fast atrial rhythm is not conducted straight through; parasympathetic (vagal) stimulation slows AV conduction further (a negative dromotropic effect). Purkinje fibres, by contrast, are large-diameter cells with a high density of gap junctions, conducting up to about eighty times faster than the AV node, so the wave of depolarisation they carry reaches essentially every part of both ventricles within a few tens of milliseconds of each other — near-simultaneous activation that lets the ventricles contract as one coordinated pump rather than an uncoordinated, spreading squeeze. Contractility, meanwhile, depends on the actin-myosin interaction and is lost entirely if the bathing medium is calcium-free; acute changes in it are driven mainly by how much calcium becomes available to the troponin-tropomyosin complex, with more intracellular Ca2+ increasing the number of actin-myosin cross-bridges that can form and so the force generated at a given preload — sympathetic stimulation raises contractility chiefly by increasing that Ca2+ entry. The Frank-Starling mechanism works through a different pathway: rather than adding calcium, a longer initial fibre length (from a higher EDV) increases the myofilaments' sensitivity to whatever calcium is already there, raising the force of contraction, cardiac output, and the law's own applicability, all together, within physiological limits.

### Key determinants
Fibre diameter and gap-junction density set conduction velocity; vagal tone further slows the already-slow AV node specifically. Contractility is set acutely by intracellular calcium availability (sympathetic tone, mainly) and needs ATPase activity in both systole (cross-bridge cycling) and diastole (calcium re-uptake by the sarcoplasmic reticulum); it is depressed, not raised, by hyperkalaemia, because a partially depolarised resting membrane reduces the Na+ and Ca2+ currents available on excitation. The Frank-Starling relationship is set purely by end-diastolic volume (preload) acting on myofilament calcium sensitivity, independent of any change in autonomic tone.

### Clinical significance
AV nodal delay, and its further slowing by vagal tone, is exactly what protects the ventricles from atrial fibrillation or flutter being conducted 1:1; conversely, disease or drugs that block AV conduction can produce heart block, while accessory pathways that bypass the AV node's delay (as in Wolff-Parkinson-White syndrome) risk dangerously fast ventricular rates. Purkinje system disease (bundle branch block) desynchronises ventricular activation, widening the QRS complex on the ECG. The distinction between contractility and the Frank-Starling mechanism underlies how cardiac output is optimised clinically: a failing heart's low contractility is treated with an inotrope (raising intracellular Ca2+ availability directly), while a volume-depleted heart's low output is treated by increasing preload (fluid), which works through the separate, calcium-sensitivity-based Starling mechanism.

### Common misconceptions
Assuming the SA node, the fastest pacemaker, is also the fastest conductor — pacemaking speed (rate of spontaneous discharge) and conduction speed (how fast an impulse travels once generated) are different properties, and the Purkinje system, not the SA node, conducts fastest. Assuming the ventricular myocardium, being the last part of the heart activated, must be the slowest-conducting tissue — the AV node, not ordinary ventricular muscle, is actually the slowest, its deliberate delay built into the node itself so the atria empty first. Assuming any rise in serum K+ increases contractility "because it is a cation like calcium" — hyperkalaemia in fact depresses contractility. Confusing a Frank-Starling-driven rise in force (from increased preload, via myofilament calcium sensitivity) with a true rise in contractility (from increased calcium entry, at any given preload) — the two work through different mechanisms and are often deliberately paired in exam distractors.

## published_summary


## published_sections


## hold_these
The AV node is the slowest-conducting cardiac tissue and the Purkinje system the fastest; ranked in order, conduction runs AV node, then atrial/ventricular myocardium, then the Purkinje system.
Contractility is a calcium-dependent, length-independent property (raised by sympathetic stimulation via more Ca2+ entry, depressed by hyperkalaemia); the Frank-Starling law is a length-dependent property (a higher EDV raises force via myofilament calcium sensitivity, not via more Ca2+ entering the cell).

## lose_the_mark
Naming the SA node as the fastest conductor because it is the fastest pacemaker — pacemaking rate and conduction velocity are different properties.
Assuming hyperkalaemia increases contractility because potassium is a cation — it depresses contractility by partially depolarising the resting membrane.
Treating a Frank-Starling-driven rise in contractile force as evidence of increased contractility, rather than recognising it as a separate, length-dependent mechanism.

## callout_evidence


## related_concepts
CON-CVS-57B2E1283C80AF
CON-CVS-100ED24FFCB92D
CON-CVS-EB114E0205680C
CON-CVS-859114E6FE6C90
CON-CVS-3142C436848ABD

## related_articles
ART-CVS-CARDIAC-PACEMAKER-AP: the pacemaker automaticity and action potential article this one's conduction-velocity section builds on

## question_ids


## resource_ids
src_7cde132d457b51ef9203

## article_source_ids
src_7cde132d457b51ef9203

## claim_ids
CLM-CVS-PURKINJE-CONDUCTION-VELOCITY-01
CLM-CVS-AV-CONDUCTION-VAGAL-EFFECT-01
CLM-CVS-PURKINJE-SYNCHRONISATION-01
CLM-CVS-CONTRACTILITY-CALCIUM-MECHANISM-01
CLM-CVS-FRANK-STARLING-EDV-01

## span_ids
SPN-CVS-PURKINJE-VELOCITY-01
SPN-CVS-AV-VAGAL-01
SPN-CVS-PURKINJE-SYNC-01
SPN-CVS-CONTRACTILITY-01
SPN-CVS-FRANK-STARLING-01

## universities
au

## years
AU_Y1

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Conduction system
AU-MED-105 > Physiology > Cardiac mechanics > Contractility
AU-MED-105 > Physiology > Cardiac mechanics > Preload and the Frank-Starling law

## university_notes


## annotations
### definition_of · CON-CVS-57B2E1283C80AF
Quote: Purkinje fibres, by contrast, are large-diameter cells with a high density of gap junctions, conducting up to about eighty times faster than the AV node
Block: body

### definition_of · CON-CVS-3142C436848ABD
Quote: a longer initial fibre length (from a higher EDV) increases the myofilaments' sensitivity to whatever calcium is already there, raising the force of contraction, cardiac output, and the law's own applicability, all together, within physiological limits
Block: body

## media


## media_recommendations


## publication_gate
needs_evidence

## evidence_basis
As with the pacemaker article, AU-MED-105's own two Physiology department books teach no cardiac muscle content at all. This is real bank content (the module's own "MCQs - أسئلة جواد" tests conduction velocity, Purkinje function, contractility and the Frank-Starling law directly), so it is authored against the same real, page-quotable AU-MED-106 Physiology department book by the same lecturer ("Physiology - Dr. Gawad.pdf", src_7cde132d457b51ef9203, pp9–12) used for the pacemaker article, rather than an uncited external textbook.

## evidence_gaps
[clear]

## conflicts


## last_reviewed


## review_due


## notes


## field_notes
arabicTitle: Researched and supplied.
aliases: Already filled above.
microtopicId: No finer canonical microtopic exists under either subtopic for the two clustered themes (conduction, mechanics) this article teaches together.
nanotopicId: Same reason as microtopicId.
media: No rights-cleared asset exists yet for this article.
universityNotes: This department's own AU-MED-105 Physiology books do not teach cardiac conduction or mechanics; taught here from the sibling AU-MED-106 Physiology department book, per the same chief-of-staff ruling recorded on the pacemaker article.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
