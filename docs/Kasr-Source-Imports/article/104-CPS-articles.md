<!--
  Library articles for 104 CPS — Cardiopulmonary System, Year 1, Kasr Al Ainy (kau).

  Thirteen articles covering all 22 concepts in ../concept/104-CPS-concepts.md,
  grouped the way the three departments teach them rather than one article per
  concept. The physiology articles follow the module's physiology book chapter
  by chapter; the anatomy articles follow the thorax chapters of the anatomy
  book; the histology articles follow its Chapter II (Lymphatic and Macrophage
  System), Chapter IV (Cytogenetics), the A-V connections section of Chapter I
  and the conducting-portion section of Chapter III.

  Sources of record, all native-text extractions already in the corpus:
    - physiology  src_a11a7faed67c95e2d636  (printed page = page index)
    - anatomy     src_4bd55e9eaf092282818c  (printed page = page index + 1)
    - histology   src_18d3a953df4ca83c4e74  (printed page = page index)
  Page text is cached at scripts/kasr/extract/pagetext/<sourceId>.json. No
  extractor was re-run to write these; the committed cache was read.

  Every figure, percentage, pressure and layer count below is the department
  book's own. Where the book is silent the article says so in `evidence_gaps`
  rather than borrowing a number from another textbook.

  The link direction that matters: `related_concepts` on the article is what
  puts the article's ID onto the concept at import (validate-content-batch.mjs
  :120-131), and the coverage check reads it back from the concept. A concept
  row carrying an article ID does nothing.

  The repository holds no medical images. Every micrograph, tracing and diagram
  these articles need is written as a `media_recommendations` block for a human
  to source. Nothing here attaches or invents an asset.

  Import: Content Setup > Bulk Import > Library articles.
-->

# Item
## id
ART-104-PHY-CARDIAC-ACTION-POTENTIAL
## title
Ionic basis of the cardiac myocyte action potential
## arabic_title
الأساس الأيوني لجهد الفعل في خلية عضلة القلب
## aliases
Non-pacemaker action potential | Fast response action potential | Ventricular action potential | Phases of the cardiac action potential
## subject
cvs
## topic
Physiology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T02
## secondary_node_ids
SYS-CVS-T01-S01-M04
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
The working cardiac myocyte fires a five-phase action potential, and the two phases the examiner asks about are the two nobody can reconstruct from the resting membrane alone. Phase 1 is a brief repolarizing notch carried by a transient outward potassium current. Phase 2 is the plateau — around 200 msec of almost flat membrane potential that exists not because nothing is moving but because two large opposing currents cancel. Getting phase 2 right means naming both currents and saying which way each charge is going.
## sections
### Definition
The cardiac myocyte action potential, also called the non-pacemaker or fast-response action potential, is the electrical event that occurs when a working myocyte is depolarized from its resting membrane potential of -90 mV to the firing level of -65 mV, normally by current spreading from an adjacent active myocyte.

It has five phases, numbered 0 to 4. Phase 4 is the resting membrane potential, held by a slow outward potassium leak through inward-rectifying channels. Phase 0 is the rapid upstroke to about +20 mV, produced by activation of the fast sodium channels and a fall in potassium conductance; it is the speed of this upstroke that earns the whole event the name fast response. Phase 3 is rapid repolarization back to rest.

Phases 1 and 2 sit between the upstroke and rapid repolarization, and they are the subject of this article.

### Mechanism
Phase 1 is a rapid, small initial repolarization — the notch that follows the peak. Three things produce it together. Transient outward potassium channels open and carry a transient outward repolarizing current, Ito. Chloride moves into the cell. And the fast sodium channels, having carried the upstroke, inactivate, so the inward depolarizing current that made phase 0 is withdrawn.

Phase 2 is the plateau. In a ventricular myocyte it lasts about 200 msec, and the membrane potential is held nearly constant, sustained around zero millivolts. The plateau is not a pause. It is a balance between two opposing currents of comparable size.

The outward limb is a small outward positive current, the efflux of potassium through delayed rectifier potassium channels.

The inward limb is a positive current entering the cell, and it has two components. Calcium enters through long-lasting, L-type calcium channels, carrying the current known as ICaL. Then, in the late part of the plateau, the rising intracellular calcium concentration drives the sodium-calcium exchanger harder: it moves one calcium ion out for every three sodium ions in, so each cycle admits a net influx of one positive charge.

While these two limbs remain equal in size and opposite in sign, the membrane potential does not move. The plateau ends when the calcium current inactivates and the delayed rectifier current grows, tipping the balance outward and starting phase 3.

### Key determinants
The length of the plateau is what makes cardiac muscle behave unlike skeletal muscle, and it is set by the balance described above rather than by either current alone.

Anything that increases calcium conductance — a positive inotropic drug, sympathetic stimulation, a higher extracellular calcium — makes the inward limb larger and holds the plateau higher and longer. Anything that increases potassium conductance makes the outward limb larger and shortens the plateau. Because the two currents are of similar magnitude, a small proportional change in either moves the whole plateau, which is why drugs and electrolyte disturbances that look minor on paper change the shape of the action potential visibly.

The firing level of -65 mV and the resting potential of -90 mV are fixed points a student should be able to give without hesitating, because the whole sequence is described relative to them.

### Clinical significance
The plateau is the electrical basis of the long refractory period of cardiac muscle, and therefore of the fact that the ventricle cannot be tetanised. A pump that could be tetanised would not fill.

The calcium that enters during phase 2 is also the trigger for calcium-induced calcium release from the sarcoplasmic reticulum, so phase 2 is the point at which the electrical event becomes a mechanical one. Blocking the L-type channel reduces the inward limb of the plateau and, with it, contractility.

Because the plateau depends on potassium conductance as well, disturbances of serum potassium alter its duration, and the ventricular myocyte's electrical behaviour changes with them.

### Common misconceptions
The commonest error is to read the flat plateau as a period in which no current flows. Two large currents are flowing; they cancel. Saying "no net current" is right, saying "no current" is wrong, and the second answer cannot explain why a small change in calcium or potassium conductance moves the plateau at all.

The second error is to attribute phase 1 to the closure of the calcium channels. Calcium channels are opening at that moment, not closing; phase 1 belongs to the transient outward potassium current, the chloride influx and the inactivation of the fast sodium channels.
## published_summary

## published_sections

## hold_these
Phase 1 is a small rapid repolarization carried by transient outward potassium channels (Ito), with chloride influx and inactivation of the fast sodium channels.
Phase 2 is the plateau, about 200 msec in a ventricular myocyte, held near zero millivolts.
The plateau is two opposing currents cancelling: potassium efflux through delayed rectifier channels outward, calcium entry through L-type channels plus the sodium-calcium exchanger inward.
The sodium-calcium exchanger moves one calcium ion out for three sodium ions in, a net influx of one positive charge.
Resting membrane potential is -90 mV and the firing level is -65 mV; phase 0 peaks at about +20 mV.
## lose_the_mark
Calling the plateau a period without current. It is two large opposing currents cancelling, which is why any small change in either conductance moves it.
Writing that calcium leaves the cell during the plateau. The current is inward; the department book's own wording on this page is a slip.
Giving phase 1 to the calcium channels. They are opening, not closing; phase 1 is the transient outward potassium current.
Describing the cardiac action potential as fast-response because of the plateau. It is fast-response because of the upstroke of phase 0.
## callout_evidence

## related_concepts
CON-CVS-818EC10C20A623
## related_articles
ART-104-PHY-CARDIAC-PUMP-FUNCTION: the mechanical event the calcium entering during phase 2 triggers
## question_ids

## resource_ids
src_a11a7faed67c95e2d636
## article_source_ids
src_a11a7faed67c95e2d636
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart
## university_notes
kau: The Kasr Alainy physiology book numbers the phases 4, 0, 1, 2, 3 in the order they occur, and asks phase 1 and phase 2 together as one eight-mark question.
## annotations
### definition_of · CON-CVS-818EC10C20A623
Quote: Phase 1 is a rapid, small initial repolarization — the notch that follows the peak.
Block: body

### mechanism_step_before · CON-CVS-818EC10C20A623
Quote: While these two limbs remain equal in size and opposite in sign, the membrane potential does not move.
Block: body
## media

## media_recommendations
### graph · Ventricular myocyte action potential with the five phases labelled and the ionic current responsible for each drawn as an arrow, inward currents below the trace and outward currents above it
Purpose: The plateau is a statement about two arrows of equal length pointing in opposite directions. Prose can name them but cannot show that they are equal, which is the whole of the answer.
Priority: required
Status: needed
Kind: graph
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 1-5
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · The sodium-calcium exchanger in the myocyte membrane, three sodium ions moving in against one calcium ion moving out, with the net charge movement labelled
Purpose: The stoichiometry is the reason the exchanger contributes an inward positive current, and a student who reads "3 Na in, 1 Ca out" as a sentence routinely writes it down without noticing the charge does not balance.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn
Rights: newly drawn for this product, or CC-BY
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy physiology department book, "Cardiopulmonary (Cardiovascular)", Chapter 1, printed pages 11-12 (manifest src_a11a7faed67c95e2d636). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
No independent citation has been attached to any figure here. Every number is traceable to one department book.
The book does not give the magnitude of either plateau current, so the statement that they are of comparable size rests on the fact that they cancel, not on a measured value.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts
The physiology book, printed page 12, lists the L-type calcium current as "Efflux of Ca++ (ICaL)" while placing it under the heading "Inward positive current". The two cannot both be true. The solved copy of the 2025 paper writes it as inward, and an inward current is what makes the plateau balance work. This article follows the solved copy and records the book's wording as a slip rather than correcting it silently.
## last_reviewed

## review_due

## notes
Written from the department book only. The live article ART-CVS-CARDIAC-ELECTRICAL covers ECG foundations and afterdepolarizations from the pilot corpus; it carries none of this module's concepts and is not a rival record, but the two should be cross-linked once 104 CPS and the pilot CVS tree are reconciled.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures this article needs are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-PHY-CARDIAC-PUMP-FUNCTION
## title
Ventricular ejection, the pressure-volume loop and cardiac reserve
## arabic_title
القذف البطيني وحلقة الضغط والحجم والاحتياطي القلبي
## aliases
Rapid and reduced ejection | Ventricular pressure-volume loop | ESPVR | Cardiac reserve | Heart rate reserve and stroke volume reserve
## subject
cvs
## topic
Physiology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T02
## secondary_node_ids
SYS-CVS-T01-S02-M01 | SYS-CVS-T01-S02-M02
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
12
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Three questions about the same pump, asked in the same paper. How does the ventricle empty, and why does ejection continue after the pressure gradient has reversed? What happens to the pressure-volume loop when contractility rises, and which corner of the loop moves? And how much more can the heart do than it is doing now? The thread running through all three is the difference between moving along one curve and moving onto a different one.
## sections
### Definition
Ventricular ejection is the part of systole in which the semilunar valves are open and blood leaves the ventricle. It runs in two phases, rapid ejection and reduced ejection, and both of them run with the valves open.

The ventricular pressure-volume loop is the same cardiac cycle plotted as ventricular pressure against ventricular volume, so that one beat is one closed loop. Its upper left corner — the end of ejection — lies on the end-systolic pressure-volume relation, the ESPVR, whose slope is the contractility of the ventricle. Its lower right corner is end-diastolic volume, the preload.

Cardiac reserve is the maximum percentage increase in cardiac output above normal that the heart can produce in response to increased body demand.

### Mechanism
Ejection begins when ventricular pressure exceeds arterial pressure and the semilunar valves open.

In rapid ejection the ventricle is still developing force. Ventricular pressure rises to its peak, about 120 mmHg on the left and 25 mmHg on the right; arterial pressure rises with it; and ventricular volume falls steeply as most of the stroke volume leaves.

In reduced ejection the pressure gradient has reversed, and yet ejection continues. It continues on the momentum of the moving column of blood, not on a pressure gradient. Ventricular and arterial pressure are both falling now, and ventricular volume falls slowly to the end-systolic volume of about 60 ml. When the momentum is spent, the rate of ejection falls to zero, and a small backflow of blood from the aorta towards the ventricle produces a sharp dip in the aortic pressure trace — the dicrotic notch, or incisura — immediately before the semilunar valves close.

The arithmetic of the loop follows: end-diastolic volume of about 130 ml minus end-systolic volume of about 60 ml gives a stroke volume of about 70 ml.

A positive inotropic intervention changes that arithmetic by moving the ESPVR. Increased inotropy shifts the end-systolic pressure-volume relation upwards and to the left. Contraction still begins at the same end-diastolic volume, so the right-hand edge of the loop does not move, but the ventricle now empties to a lower end-systolic volume. The loop is therefore wider, and stroke volume is larger at the same preload.

### Key determinants
Cardiac reserve in a normal young adult is 300 to 400 per cent — a rise from about 5 l/min at rest to 20 to 25 l/min at maximal exercise. In a well-trained athlete it reaches 600 per cent, about 35 l/min. In an elderly person it falls to 200 per cent or less, and in heart failure it can fall to zero.

That reserve is realised through three mechanisms, and two of them are asked by name.

Heart rate reserve is the span between the resting rate, about 75 per minute, and the maximal rate, estimated as 220 minus age in years — approximately 200 beats per minute in a normal young adult.

Stroke volume reserve is the span between about 70 ml at rest and up to 200 ml at maximal exercise. It is obtained two ways: by raising end-diastolic volume through Starling's mechanism, and by lowering end-systolic volume through sympathetic stimulation or other positive inotropic influences. Those two are the right-hand and left-hand edges of the pressure-volume loop respectively, which is why the loop and the reserve are the same subject.

The third mechanism is an increase in the size of the heart. Eccentric, volume-overload hypertrophy occurs in endurance athletes: heart mass rises by 50 to 60 per cent with an increased end-diastolic volume, so the heart pumps a greater stroke volume. Concentric, pressure-overload hypertrophy follows prolonged high afterload: the ventricular wall thickens without an increase in ventricular volume, so the ventricle pumps with greater strength, but compliance falls and filling may become deficient.

### Normal values
End-diastolic volume about 130 ml, end-systolic volume about 60 ml, stroke volume about 70 ml. Peak ventricular pressure about 120 mmHg on the left and 25 mmHg on the right. Resting heart rate about 75/min, maximal heart rate 220 minus age. Resting cardiac output about 5 l/min, maximal 20 to 25 l/min in a normal young adult.

### Clinical significance
Reading the loop correctly is what separates a preload problem from a contractility problem at the bedside. A wider loop that starts further to the right is a preload effect. A wider loop that starts in the same place and ends further to the left is an inotropic effect. Only the second is a change in the ventricle itself.

Cardiac reserve is the number that says how much a patient has left. It is the reason an elderly patient with a resting cardiac output indistinguishable from a young adult's becomes breathless climbing stairs, and the reason a failing heart is symptomatic at rest only at the very end.

Training raises stroke volume reserve and cardiac mass. It does not raise maximal heart rate, which is set by age.

### Common misconceptions
Ejection is often described as stopping the moment ventricular pressure falls below arterial pressure. It does not. It continues on momentum through the whole of reduced ejection, and it is the loss of that momentum, not the crossing of the two pressures, that ends it and produces the dicrotic notch.

The semilunar valves are sometimes offered as the thing that distinguishes rapid from reduced ejection. They do not distinguish anything: they are open in both. What differs is the pressure gradient, the rate of emptying and the direction in which the pressures are moving.
## published_summary

## published_sections

## hold_these
Both ejection phases run with the semilunar valves open; the phases differ in the pressure gradient and the rate of emptying, not in valve state.
In rapid ejection ventricular pressure rises to its peak (about 120 mmHg left, 25 mmHg right), arterial pressure rises with it, and ventricular volume falls steeply.
In reduced ejection ventricular and arterial pressure both fall, ventricular volume falls slowly to an end-systolic volume of about 60 ml, and ejection continues on momentum.
The dicrotic notch is produced by a small backflow when the momentum is spent, immediately before the semilunar valves close.
Increased inotropy shifts the ESPVR upwards and to the left; the loop begins at the same end-diastolic volume and ends at a lower end-systolic volume.
Heart rate reserve runs from about 75/min to 220 minus age, about 200/min in a normal young adult.
Stroke volume reserve runs from about 70 ml to about 200 ml, obtained by raising EDV through Starling's mechanism and lowering ESV through positive inotropy.
Cardiac reserve is 300-400% in a normal young adult, 600% in a trained athlete, 200% or less in the elderly, and can fall to zero in heart failure.
## lose_the_mark
Answering the ejection comparison with the valves. They are open in both phases; the answer is the gradient, the rate and the direction the pressures are moving.
Expecting ejection to stop when ventricular pressure falls below arterial pressure. Momentum carries it through reduced ejection.
Reading a wider pressure-volume loop as a preload effect. Preload moves the right-hand edge; inotropy moves the ESPVR and therefore the left-hand edge.
Treating maximal heart rate as trainable. Training raises stroke volume reserve and cardiac mass; maximal rate is set by age.
Giving cardiac reserve as an absolute cardiac output. It is a percentage increase above normal.
## callout_evidence

## related_concepts
CON-CVS-A70930DB23A5B4 | CON-CVS-C1D705743C07E3 | CON-CVS-A99309543A270D
## related_articles
ART-104-PHY-CARDIAC-ACTION-POTENTIAL: the electrical event whose plateau supplies the calcium for this contraction
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX: where the end-diastolic volume on the right-hand edge of the loop comes from
## question_ids

## resource_ids
src_a11a7faed67c95e2d636
## article_source_ids
src_a11a7faed67c95e2d636
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Cardiac Function
## university_notes
kau: The 2025 end-of-year paper asked the ejection comparison and the inotropy loop in adjacent questions, and paired the loop with heart rate and stroke volume reserve in one ten-mark question.
## annotations
### contrasts_with · CON-CVS-A70930DB23A5B4
Quote: In reduced ejection the pressure gradient has reversed, and yet ejection continues.
Block: body

### definition_of · CON-CVS-C1D705743C07E3
Quote: Increased inotropy shifts the end-systolic pressure-volume relation upwards and to the left.
Block: body

### definition_of · CON-CVS-A99309543A270D
Quote: Heart rate reserve is the span between the resting rate, about 75 per minute, and the maximal rate, estimated as 220 minus age in years — approximately 200 beats per minute in a normal young adult.
Block: body
## media

## media_recommendations
### graph · Left ventricular pressure-volume loop with the four corners labelled, the ESPVR drawn through the upper left corner and the end-diastolic pressure-volume relation through the lower right, and a second loop showing increased inotropy overlaid in a contrasting colour
Purpose: The answer to the inotropy question is which corner moves and which does not. Two loops on one pair of axes carry that in a glance; two sentences describing two loops do not.
Priority: required
Status: needed
Kind: graph
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 3-15
Rights: must be CC-BY or public domain, or newly drawn for this product

### graph · Aortic and left ventricular pressure traces through one cardiac cycle with rapid ejection, reduced ejection and the dicrotic notch marked, and the ventricular volume trace on the same time axis
Purpose: The point of the ejection comparison is that two curves cross and then separate while volume keeps falling. Three traces on one time axis show the crossing; a table of four rows hides it.
Priority: required
Status: needed
Kind: graph
Section: Mechanism
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### diagram · Eccentric versus concentric ventricular hypertrophy in cross-section, chamber volume and wall thickness drawn to scale against a normal ventricle
Purpose: The distinction is entirely geometric — one enlarges the cavity, the other thickens the wall — and students who learn it as two phrases reliably swap them.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Key determinants
Source direction: openly licensed physiology or pathology text
Rights: must be CC-BY or public domain
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy physiology department book, "Cardiopulmonary (Cardiovascular)", Chapter 3, printed pages 25, 36-37 and 40-41 (manifest src_a11a7faed67c95e2d636). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
No independent citation has been attached to any figure here; every number is traceable to one department book.
The book gives peak right ventricular pressure of 25 mmHg in its cardiac cycle chapter but does not repeat it in the ejection section, so the two figures are joined by the reader rather than by the book.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The solved copy of the 2025 paper contaminates the arterial-pressure row of its ejection table with jugular-venous-pulse text about x and v waves, which belongs to a different table. That row is taken from the department book instead, as recorded on concept CON-CVS-A70930DB23A5B4.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. All three figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book and the solved paper agree on everything this article states; no source disagreement was found to record.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX
## title
Venous return and the arterial baroreceptor reflex
## arabic_title
العود الوريدي ومنعكس المستقبلات الضغطية الشريانية
## aliases
Mean systemic filling pressure | MSFP | Venous return curve | Thoracic pump | Respiratory pump | Baroreceptor reflex | Buffer reflex
## subject
cvs
## topic
Physiology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T02
## secondary_node_ids
SYS-CVS-T01-S02-M02 | SYS-CVS-T01-S02-M03
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
12
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Blood gets back to the heart because there is a pressure upstream, a lower pressure downstream, and a resistance between them. Name those three and the venous return curve stops being a curve to memorise and becomes an equation to read: raise the upstream pressure and the curve shifts, raise the downstream pressure and you move along it. The same downstream pressure is what breathing changes, and the same arterial pressure the whole system exists to hold steady is what the baroreceptors watch.
## sections
### Definition
Venous return is the volume of blood that flows back to the heart per minute. Under normal steady conditions it equals cardiac output, about 5 l/min.

It is determined by the interplay of three variables. Mean systemic filling pressure is the pressure present throughout the systemic circulation when the heart stops pumping and flow is zero, at which point arterial pressure and right atrial pressure have equalised; normally it is 6 to 8 mmHg, and it is the force that drives blood back to the heart. Right atrial pressure, normally 0 to 2 mmHg, is the pressure the returning blood must push against, so a higher right atrial pressure opposes venous return. The difference between the two is the pressure gradient for venous return. Resistance to venous return is the vascular resistance the blood meets on the way, normally about 1.4 mmHg per l/min.

The arterial baroreceptors are mechanical stretch receptors that act as pressure sensors monitoring the level of arterial blood pressure. They lie in the carotid sinus and the aortic arch.

### Mechanism
The venous return curve plots venous return against right atrial pressure. It shows that increasing right atrial pressure decreases venous return, and decreasing right atrial pressure increases it. Venous return falls to zero when right atrial pressure has risen to equal the mean systemic filling pressure, because at that point the gradient is gone.

A change in mean systemic filling pressure moves the whole curve rather than moving a point along it. Raising it shifts the venous return curve up and to the right without changing its slope, so at any given right atrial pressure venous return is greater; lowering it shifts the curve down and to the left. Mean systemic filling pressure reflects blood volume against the capacity of the circulation, and the capacity of the circulation is mainly the capacity of the veins. It rises with an increase in blood volume, as in renal failure, and with a decrease in the capacity of the circulation, as in sympathetic venoconstriction. It falls with haemorrhage and with sympathetic withdrawal. Changing the resistance to venous return, by contrast, does not change the mean systemic filling pressure at all; it changes the slope of the curve, and whatever the resistance, venous return is still zero when right atrial pressure equals mean systemic filling pressure.

The thoracic pump works on the downstream end of the same gradient. During inspiration the intrapleural pressure falls from about -4 mmHg to about -8 mmHg. That fall is transmitted to the intrathoracic great veins and to the right atrium, whose pressure falls with it, so the gradient that moves blood from the abdominal veins back to the heart widens and venous return increases. During expiration intrapleural pressure rises from about -8 mmHg back to about -4 mmHg, right atrial and caval pressures rise with it, the gradient narrows and venous return decreases. Two other mechanical aids work alongside it: the heartbeat itself, through atrial suction during rapid ejection and ventricular suction during rapid filling, and the muscle pump, in which contracting skeletal muscle compresses the deep veins of the limbs.

The baroreceptor reflex regulates the pressure at the arterial end of the same circulation. The carotid sinus receptors report through the carotid sinus nerve, Hering's nerve, a branch of the glossopharyngeal nerve; the aortic arch receptors report through the aortic nerve, a branch of the vagus. Both are called buffer nerves and both end in the nucleus of the tractus solitarius. At a normal mean arterial pressure of about 90 mmHg the receptors discharge tonically at a low rate, and the nucleus of the tractus solitarius sends inhibitory signals to the vasomotor area and excitatory signals to the cardiac inhibitory area.

When arterial pressure rises, baroreceptor discharge increases. The vasomotor area is inhibited more, so sympathetic discharge to the heart falls — lowering heart rate, stroke volume and cardiac output — and sympathetic discharge to the vessels falls, giving vasodilatation. At the same time the cardiac inhibitory area is excited more, so vagal tone rises and heart rate and cardiac output fall further. Arterial pressure returns towards normal.

When arterial pressure falls, discharge decreases and every one of those changes reverses: less inhibition of the vasomotor area raises sympathetic drive to heart and vessels, giving a higher rate, stroke volume and cardiac output with vasoconstriction, and less excitation of the cardiac inhibitory area withdraws vagal tone. Arterial pressure rises back towards normal.

### Key determinants
Mean systemic filling pressure is 6 to 8 mmHg; central venous pressure is 0 to 2 mmHg; the resistance to venous return is about 1.4 mmHg per l/min. Central venous pressure falls in haemorrhage, because blood volume and therefore venous return fall, and rises in right-sided heart failure, because the failing ventricle cannot pump forward what arrives.

For the baroreceptors, three numbers matter. The threshold for stimulation is about 50 mmHg. Discharge increases with pressure up to about 160 mmHg, above which no further increase occurs. And the receptors are more sensitive to pulsatile than to constant pressure, so a fall in pulse pressure reduces discharge even when mean pressure has not changed.

### Clinical significance
The venous return curve is where the effect of a fluid bolus and the effect of a vasopressor separate. Volume raises mean systemic filling pressure and shifts the whole curve; venoconstriction does the same by reducing the capacity of the circulation. Neither is the same as changing the resistance to venous return, which pivots the curve instead.

The thoracic pump is why venous return is phasic with breathing and why raised intrathoracic pressure — positive-pressure ventilation, a tension pneumothorax, a Valsalva manoeuvre — reduces it: all three raise the downstream pressure at the right atrium.

The baroreflex is the reflex that compensates for a sudden change in arterial pressure, whether from a change in posture or from haemorrhage. In carotid sinus syndrome the receptors are unusually sensitive, and external pressure on the carotid sinus — a tight collar, shaving — triggers marked bradycardia or a fall in arterial pressure severe enough to cause fainting, sometimes requiring a permanent pacemaker.

### Common misconceptions
The thoracic pump is often described as the chest sucking blood in. It does not suck; it lowers the downstream pressure at the right atrium. The driving pressure is still the mean systemic filling pressure upstream, and it is unchanged by breathing.

A change in mean systemic filling pressure is often confused with a change in resistance to venous return. The first shifts the curve in parallel; the second pivots it by changing its slope. Both raise or lower venous return, but they are different interventions and the examiner draws them differently.

The baroreceptor question is frequently answered with the atrial volume receptors. Those are the low-pressure cardiopulmonary receptors, and their reflex is about volume, not arterial pressure — and it is the answer the solved copy of the 2025 paper actually gives.
## published_summary

## published_sections

## hold_these
Venous return depends on mean systemic filling pressure minus right atrial pressure, divided by the resistance to venous return.
Mean systemic filling pressure is the pressure everywhere in the systemic circulation at zero flow, normally 6-8 mmHg; central venous pressure is 0-2 mmHg.
Raising mean systemic filling pressure shifts the venous return curve up and to the right in parallel; changing resistance to venous return pivots it by changing its slope.
Venous return is zero when right atrial pressure equals mean systemic filling pressure, whatever the resistance.
During inspiration intrapleural pressure falls from about -4 to -8 mmHg, right atrial pressure falls with it, and venous return increases; expiration reverses this.
Arterial baroreceptors sit in the carotid sinus and the aortic arch and report through Hering's nerve and the aortic nerve to the nucleus of the tractus solitarius.
A rise in arterial pressure increases baroreceptor discharge, inhibiting the vasomotor area and exciting the cardiac inhibitory area; a fall does the opposite.
Baroreceptor threshold is about 50 mmHg and discharge saturates at about 160 mmHg.
## lose_the_mark
Answering the arterial baroreceptor question with the atrial volume receptors. Those are low-pressure receptors and their reflex is about volume.
Describing the thoracic pump as the chest sucking blood in. It lowers the downstream pressure; the driving pressure upstream is unchanged.
Confusing a shift of the venous return curve with a change in its slope. Mean systemic filling pressure shifts it; resistance to venous return pivots it.
Naming only the carotid sinus. The aortic arch receptors and the aortic nerve are half the answer.
Forgetting the vagal limb. The reflex has a sympathetic arm through the vasomotor area and a parasympathetic arm through the cardiac inhibitory area, and a full answer names both.
## callout_evidence

## related_concepts
CON-CVS-B21C3D54DE291E | CON-CVS-08B8764A5D501B | CON-CVS-C3E60AC7A9EDB1
## related_articles
ART-104-PHY-CARDIAC-PUMP-FUNCTION: venous return sets the end-diastolic volume this article's gradient delivers
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT: why intrapleural pressure is negative in the first place, and what makes it swing
## question_ids

## resource_ids
src_a11a7faed67c95e2d636
## article_source_ids
src_a11a7faed67c95e2d636
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Physiology > Cardiovascular System > Vascular Function
104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control
## university_notes
kau: The Kasr Alainy physiology book teaches the thoracic pump, the heartbeat effects and the muscle pump together as the mechanical factors aiding venous return, and the 2025 paper asked the thoracic pump alone.
## annotations
### definition_of · CON-CVS-B21C3D54DE291E
Quote: Raising it shifts the venous return curve up and to the right without changing its slope, so at any given right atrial pressure venous return is greater; lowering it shifts the curve down and to the left.
Block: body

### mechanism_step_before · CON-CVS-08B8764A5D501B
Quote: During inspiration the intrapleural pressure falls from about -4 mmHg to about -8 mmHg.
Block: body

### definition_of · CON-CVS-C3E60AC7A9EDB1
Quote: When arterial pressure rises, baroreceptor discharge increases.
Block: body
## media

## media_recommendations
### graph · Venous return curve, venous return against right atrial pressure, with a normal curve and two parallel shifts for raised and lowered mean systemic filling pressure, plus a third curve of altered slope for changed resistance to venous return
Purpose: The entire question is the difference between a parallel shift and a change of slope, and that difference exists only on a pair of axes. Prose can assert it; only the graph demonstrates it.
Priority: required
Status: needed
Kind: graph
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 4-11
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · The baroreceptor reflex arc: carotid sinus and aortic arch receptors, Hering's nerve and the aortic nerve, the nucleus of the tractus solitarius, and its inhibitory output to the vasomotor area alongside its excitatory output to the cardiac inhibitory area
Purpose: The reflex is a wiring diagram in which one afferent produces opposite signs at two efferent centres. A student who has only the prose routinely writes both outputs with the same sign.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 5-6
Rights: must be CC-BY or public domain, or newly drawn for this product

### graph · Rate of baroreceptor discharge against mean arterial pressure, showing threshold at about 50 mmHg and saturation at about 160 mmHg
Purpose: The reflex has a working range, and the two ends of it are marks in their own right. A sigmoid curve makes the saturation obvious in a way two numbers in a sentence do not.
Priority: strongly helpful
Status: needed
Kind: graph
Section: Key determinants
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 5-7
Rights: must be CC-BY or public domain, or newly drawn for this product
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy physiology department book, "Cardiopulmonary (Cardiovascular)", Chapter 4, printed pages 48-53, and Chapter 5, printed pages 75-77 (manifest src_a11a7faed67c95e2d636). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
No independent citation has been attached to any figure here; every number is traceable to one department book.
The book gives the resistance to venous return as a worked example, 7-0 divided by 5, rather than as a quoted normal range, so the figure of about 1.4 mmHg/l/min is that worked example and not a stated normal.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
Concept CON-CVS-B21C3D54DE291E already records typed neighbours CON-CVS-245C56665C0240 and CON-CVS-59DE21D055FA34, which are live concepts on the pilot CVS tree. Those two are not taught here; the relation batch is where the edge belongs.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. All three figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book states all of this without qualification; the only disagreement is with the solved paper's answer to the baroreceptor question, which is recorded as a pitfall rather than as a source conflict.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## title
Elastic recoil, the chest wall and pulmonary surfactant
## arabic_title
الارتداد المرن للرئة وجدار الصدر والفاعل بالسطح الرئوي
## aliases
Recoil tendency of the lung | Expansion tendency of the chest wall | Negativity of intrapleural pressure | Pulmonary surfactant | Causes of surfactant deficiency
## subject
resp
## topic
Physiology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T03
## secondary_node_ids
SYS-RES-T01-S02-M01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
10
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
The lung is always trying to collapse and the chest wall is always trying to spring open. That standing disagreement is what keeps the intrapleural pressure negative, and it is the reason a punctured chest empties the lung. Two thirds of the lung's pull is not elastic tissue at all but the surface tension of the fluid lining the alveoli — which is exactly why the substance that lowers that surface tension is worth a whole question of its own.
## sections
### Definition
Intrapleural pressure is negative because of the continuous tendency of the lungs to recoil inwards against the continuous tendency of the chest wall to expand outwards. Neither tendency is a response to the other; both are present in the relaxed system, and the negative pressure between them is what remains.

Surfactant is a surface-active agent: it spreads over the surface of a fluid and greatly reduces its surface tension. Pulmonary surfactant is secreted by the type II alveolar cells.

### Mechanism
The lung's inward recoil comes from two sources. The first is elastic: its collagen and elastin fibres. The second is the surface tension of the fluid lining the alveoli. Surface tension arises from the attraction between fluid molecules at an air-fluid interface, which makes the surface tend to shrink; in a moist alveolus the water molecules attract each other more strongly than they attract air, and the result is an inward force that reduces alveolar size. Of the lung's total recoil, roughly one third is elastic tissue and roughly two thirds is surface tension.

The chest wall's outward tendency is elastic and comes from the elasticity of its muscles, tendons and ligaments.

Each structure has a relaxation volume of its own — the volume it would take up if it were free of the other. For the lungs that is about 1 litre; for the thorax about 5 litres. At the end of a normal expiration, with the respiratory muscles relaxed, their combined volume is about 2.3 litres. The lungs are therefore held above their own relaxation volume, slightly stretched and pulling inward, while the thorax is held below its own, slightly compressed and pushing outward. Neither gets what it wants, and the pleural space between them is held at sub-atmospheric pressure.

Surfactant acts on the surface-tension half of that recoil. It is a mixture of dipalmitoyl phosphatidyl choline, a phospholipid that forms a layer at the air-fluid interface with its hydrophilic ends facing the alveolar fluid and its hydrophobic ends facing the air, and of apoproteins and calcium ions that help the phospholipid spread rapidly. By replacing an air-fluid interface with an air-lipid-fluid interface it lowers surface tension, and from that one action all three of its functions follow.

First, it facilitates lung expansion: less surface tension means less effort is needed to distend the lung during inspiration.

Second, it prevents alveolar collapse during expiration. Laplace's law states that the collapsing pressure P equals 2T over r, so a small alveolus with a small radius has a higher collapsing pressure. But as an alveolus shrinks during expiration its surfactant molecules crowd closer together, and the surface tension T falls faster than the radius does. The collapsing pressure therefore falls instead of rising, and the alveolus stays open.

Third, it prevents pulmonary oedema. Surface tension itself is a force favouring filtration of fluid from blood into the alveoli; by reducing it, surfactant opposes that filtering force.

### Key determinants
Relaxation volume of the lungs about 1 litre, of the thorax about 5 litres, combined at the end of quiet expiration about 2.3 litres.

Surfactant is deficient in seven named conditions. Infant respiratory distress syndrome of prematurity, also called hyaline membrane disease, in which surfactant may appear as early as week 24 and is almost always present by week 35, and a lecithin to sphingomyelin ratio above 2:1 in amniotic fluid reflects mature levels. Long-term inhalation of 100 per cent oxygen, or the use of a pump oxygenator in cardiac surgery, which reduces synthesis. Occlusion of a branch of the pulmonary artery by a thrombus, after which the alveoli receiving no blood supply fail to synthesise it. Cigarette smoking, which inhibits secretion. Hypothyroidism, because production requires thyroxine. Hypocorticism, because maturation depends on cortisol. And hyperinsulinism, because insulin inhibits secretion — which is why infants of diabetic mothers, who are hyperinsulinaemic in utero, have more respiratory distress syndrome.

### Normal values
Intrapleural pressure is -3 cmH2O at the end of a normal expiration and -6 to -8 cmH2O at the end of a normal inspiration. In forced inspiration against a closed glottis, Müller's experiment, it becomes -30 to -40 cmH2O; in forced expiration against a closed glottis, Valsalva's experiment, it becomes positive and may reach +50 cmH2O.

### Clinical significance
Because the lung is stretched and the chest wall compressed at the end of every quiet breath, opening the pleural space lets each go to its own relaxation volume: the lung collapses towards 1 litre and the chest wall springs out towards 5 litres. That is a pneumothorax, and it is why the chest wall of an affected side looks larger, not smaller.

In emphysema, elastic fibres are destroyed, the recoil tendency of the lung falls and intrapleural pressure becomes less negative.

Surfactant deficiency is the reason a premature infant can generate the inspiratory effort and still not keep the lungs open: the fetus makes respiratory movements in utero but the lungs remain collapsed until birth, and it is surfactant that keeps them from collapsing again after the first strong breaths.

### Common misconceptions
Answering the recoil question with elastic tissue alone loses most of the mark, because surface tension is the larger of the two contributions. It is also the reason surfactant matters so much to the work of breathing: the intervention acts on the bigger half.

Laplace's law is often quoted to argue that a small alveolus must empty into a large one. It would, if T were the same in both. It is not: the smaller alveolus has its surfactant more concentrated, so its surface tension is lower, and the law does not apply with a fixed T.
## published_summary

## published_sections

## hold_these
Intrapleural pressure is negative because the lung continuously tends to recoil inwards while the chest wall continuously tends to expand outwards.
The lung's recoil has two causes: its collagen and elastin fibres, about one third, and alveolar surface tension, about two thirds.
The chest wall's outward tendency comes from the elasticity of its muscles, tendons and ligaments.
Relaxation volume is about 1 litre for the lungs and 5 litres for the thorax; combined at the end of quiet expiration it is about 2.3 litres.
Surfactant is secreted by type II alveolar cells and is mainly dipalmitoyl phosphatidyl choline with apoproteins and calcium.
Its three functions are facilitating lung expansion, preventing alveolar collapse in expiration, and preventing pulmonary oedema.
As an alveolus shrinks, its surfactant molecules crowd closer and lower surface tension faster than the falling radius raises the collapsing pressure P = 2T/r.
Deficiency: prematurity, prolonged 100% oxygen or pump oxygenator, pulmonary artery occlusion, smoking, hypothyroidism, hypocorticism, hyperinsulinism.
## lose_the_mark
Giving elastic tissue as the only cause of lung recoil. Surface tension is the larger contribution and the one surfactant acts on.
Using Laplace's law to argue that small alveoli empty into large ones. Surfactant is more concentrated in the smaller alveolus, so T is not fixed.
Naming only respiratory distress syndrome as a cause of deficiency when four causes are asked for.
Saying surfactant increases surface tension to hold alveoli open. It lowers surface tension; the collapsing pressure falls with it.
Attributing the chest wall's outward spring to the lungs. Each structure has its own relaxation volume and its own elasticity.
## callout_evidence

## related_concepts
CON-RES-1BA6BE714676EC | CON-RES-4D4CBF3BB8AF1E
## related_articles
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX: the same intrapleural pressure, read from the circulation's side
ART-104-ANA-PLEURA-AND-MEDIASTINUM: the membrane the pressure sits between, and what supplies it
## question_ids

## resource_ids
src_a11a7faed67c95e2d636
## article_source_ids
src_a11a7faed67c95e2d636
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Organization of the Respiratory System
## university_notes
kau: The Kasr Alainy respiratory book gives intrapleural pressures in cmH2O and venous pressures in mmHg in the same course; keep the units the book uses in each answer.
## annotations
### definition_of · CON-RES-1BA6BE714676EC
Quote: Intrapleural pressure is negative because of the continuous tendency of the lungs to recoil inwards against the continuous tendency of the chest wall to expand outwards.
Block: body

### definition_of · CON-RES-4D4CBF3BB8AF1E
Quote: Surfactant is a surface-active agent: it spreads over the surface of a fluid and greatly reduces its surface tension.
Block: body

### decreases · CON-RES-4D4CBF3BB8AF1E
Quote: But as an alveolus shrinks during expiration its surfactant molecules crowd closer together, and the surface tension T falls faster than the radius does.
Block: body
## media

## media_recommendations
### diagram · Lung and chest wall drawn as two opposed springs across the pleural space, each labelled with its relaxation volume (1 litre and 5 litres) and the combined 2.3 litres at the end of quiet expiration
Purpose: The whole answer is a force balance between two structures held away from their preferred volumes. Two springs show the balance; a paragraph makes the reader construct it.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 9
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · Two alveoli of different radius at end-inspiration and end-expiration, showing surfactant molecules spread apart in the large alveolus and crowded together in the small one
Purpose: The escape from Laplace's law is a change in the packing density of the molecules, which is a spatial fact. Students who read the sentence still draw a fixed T and reach the wrong conclusion.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figure 11
Rights: must be CC-BY or public domain, or newly drawn for this product
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy physiology department book, "Cardiopulmonary (Respiration)", Chapter 1, printed pages 105-106 and 108-109 (manifest src_a11a7faed67c95e2d636). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The one-third to two-thirds split between elastic tissue and surface tension is stated by the concept record and by the paper's mark scheme; the department book names both causes but does not print the proportion on these pages, so the split is not sourced to the book.
No independent citation has been attached to any figure here; every other number is traceable to one department book.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The live concept CON-RES-5D76C8ED496E54, on the pilot respiratory tree, states the combined-compliance consequence of the same opposed recoils. It is recorded on CON-RES-1BA6BE714676EC as a rejected merge candidate, not taught here.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book and the solved paper agree on this material; no source disagreement was found to record.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-PHY-OXYGEN-DISSOCIATION-CURVE
## title
Shifts of the haemoglobin-oxygen dissociation curve
## arabic_title
انزياحات منحنى تفكك الهيموغلوبين والأكسجين
## aliases
Oxygen dissociation curve | P50 | Left shift of the oxygen dissociation curve | Factors decreasing P50 | Bohr effect
## subject
resp
## topic
Physiology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-PHY-T03
## secondary_node_ids
SYS-RES-T01-S02-M04
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
7
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
P50 is one number that tells you where the whole curve sits. Push it down and haemoglobin holds oxygen more tightly — loading well and unloading badly. Push it up and the reverse. Almost every factor on the list works through one of two handles: the Bohr effect, or the ability of a haemoglobin chain to bind 2,3-DPG. Carbon monoxide is the exception that makes the point, because it moves the curve left while doing the opposite of good.
## sections
### Definition
P50 is the partial pressure of oxygen at which haemoglobin is 50 per cent saturated. The normal P50 for human blood is 27 mmHg, and locating that point fixes the position of the whole dissociation curve.

Haemoglobin with a greater affinity for oxygen has a lower P50 and a curve shifted to the left. Haemoglobin with reduced affinity has a higher P50 and a curve shifted to the right. A left shift means that at any given partial pressure of oxygen more oxygen stays bound to haemoglobin, so the blood loads oxygen readily and gives it up to the tissues with difficulty.

### Mechanism
Six factors shift the curve to the left, and they work through three mechanisms.

The first three are the Bohr effect run backwards. A decrease in temperature, a decrease in PCO2 and an increase in pH all move the curve left. Carbon dioxide and hydrogen ions combine with sites on haemoglobin and change its configuration so that oxygen comes off more easily; withdraw them and oxygen stays on. This is why resting, cool, alkalotic tissue extracts less oxygen than exercising muscle, in which the reverse changes shift the curve right.

The fourth is 2,3-diphosphoglycerate, an end product of red cell metabolism. It combines with the beta chains of deoxygenated haemoglobin, which reduces affinity and helps unloading. A fall in 2,3-DPG therefore shifts the curve to the left. A rise, as in hypoxia at altitude or in exercise, shifts it right.

The fifth is carbon monoxide. It combines with haemoglobin to form carboxyhaemoglobin, and its affinity for the oxygen-binding sites is more than two hundred times greater than that of oxygen. The shift arises not only from the sites it occupies but from what it does to the sites it does not: when carbon monoxide is bound, the oxygen molecules still attached to that haemoglobin are not easily released.

The sixth is fetal haemoglobin. Adult haemoglobin has a pair of alpha and a pair of beta chains, and the beta chains bind 2,3-DPG, lowering affinity. Fetal haemoglobin has a pair of alpha and a pair of gamma chains, and the gamma chains cannot combine with 2,3-DPG. Affinity is therefore higher and the fetal curve lies to the left of the adult one — which is how the fetus takes oxygen across the placenta from maternal blood.

### Key determinants
Normal P50 is 27 mmHg. A lower P50 is a left shift and a higher affinity; a higher P50 is a right shift and a lower affinity.

The mirror list is worth holding alongside: an increase in temperature, an increase in PCO2, a decrease in pH and an increase in 2,3-DPG all shift the curve to the right. Exercise produces all four at once in the working muscle, which is precisely when more oxygen must be delivered.

### Applied physiology
Myoglobin shows what an extreme left shift looks like. It carries one iron atom and one oxygen molecule, and its dissociation curve is a rectangular hyperbola that stays horizontal until the oxygen tension is very low and then falls vertically. It gives up its oxygen only in severe exercise, when haemoglobin has already given up most of its own, and reloads from the blood afterwards.

### Clinical significance
A left shift is not a favour to the tissues. High affinity means the blood loads oxygen well and unloads it badly, and that is exactly why carbon monoxide poisoning is dangerous: not only is some haemoglobin unavailable, but what oxygen remains bound is held more tightly. A measured saturation can look reassuring while delivery is failing.

Stored blood loses 2,3-DPG, which shifts the curve left and reduces the oxygen a transfusion actually delivers until the red cells regenerate it.

The fetal left shift is physiological and directional: it exists so that oxygen moves from mother to fetus at the placenta.

### Common misconceptions
The most damaging error is to read a left shift as a good thing because saturation is higher. Saturation is a measure of loading, not of delivery, and the two move in opposite directions when the curve shifts.

The second is to attribute the fetal left shift to something special about the gamma chain's oxygen binding. The gamma chain's distinguishing feature is negative: it cannot bind 2,3-DPG, and the affinity follows from that absence.
## published_summary

## published_sections

## hold_these
P50 is the PO2 at which haemoglobin is 50% saturated; normal is 27 mmHg.
A left shift is a lower P50 and higher affinity: more oxygen bound at any PO2, and harder unloading at the tissues.
Left shift is produced by decreased temperature, decreased PCO2, increased pH, decreased 2,3-DPG, carbon monoxide and fetal haemoglobin.
The temperature, PCO2 and pH effects are the Bohr effect; increased temperature, increased PCO2 and decreased pH shift the curve right.
Carbon monoxide binds the oxygen sites with more than 200 times the affinity of oxygen and holds the remaining oxygen more tightly.
Fetal haemoglobin has gamma chains in place of beta chains, and gamma chains cannot combine with 2,3-DPG.
## lose_the_mark
Treating a left shift as good for the tissues. It loads well and unloads badly, which is why carbon monoxide poisoning is dangerous at any measured saturation.
Writing that 2,3-DPG shifts the curve left. A rise in 2,3-DPG shifts it right; it is the fall that shifts it left.
Reversing the Bohr effect. Acidosis and hypercapnia shift the curve right, towards delivery.
Explaining the fetal shift by the gamma chain binding oxygen better. The gamma chain simply cannot bind 2,3-DPG.
## callout_evidence

## related_concepts
CON-RES-D95A9FD64ABF25
## related_articles
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT: the mechanical half of the same respiratory course
## question_ids

## resource_ids
src_a11a7faed67c95e2d636
## article_source_ids
src_a11a7faed67c95e2d636
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Physiology > Respiratory System > Gas Transport by the Blood
## university_notes
kau: The Kasr Alainy respiratory book teaches the right-shift list first and the left-shift list as its mirror; the 2025 paper asked only for the left shift, for twelve marks.
## annotations
### definition_of · CON-RES-D95A9FD64ABF25
Quote: Haemoglobin with a greater affinity for oxygen has a lower P50 and a curve shifted to the left.
Block: body

### decreases · CON-RES-D95A9FD64ABF25
Quote: A fall in 2,3-DPG therefore shifts the curve to the left.
Block: body
## media

## media_recommendations
### graph · Haemoglobin-oxygen dissociation curve with a normal curve at P50 27 mmHg and left- and right-shifted curves overlaid, each factor labelled against the direction it moves the curve
Purpose: The entire answer is a direction on a pair of axes, and the sigmoid shape is what makes the consequence for delivery visible. A list of factors without the curve is a list a student cannot check.
Priority: required
Status: needed
Kind: graph
Section: Mechanism
Source direction: openly licensed physiology text, or purpose-drawn following the department book's figures 26 and 27
Rights: must be CC-BY or public domain, or newly drawn for this product

### graph · Myoglobin dissociation curve drawn as a rectangular hyperbola on the same axes as the haemoglobin curve
Purpose: Myoglobin is the limiting case of a left shift, and putting the two curves on one set of axes is what makes "holds on until the tension is very low" mean something concrete.
Priority: optional
Status: needed
Kind: graph
Section: Applied physiology
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy physiology department book, "Cardiopulmonary (Respiration)", Chapter 4, printed pages 129-130 (manifest src_a11a7faed67c95e2d636). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
No independent citation has been attached to any figure here; every number is traceable to one department book.
The loss of 2,3-DPG in stored blood is standard transfusion physiology but is not stated on these pages of the department book, so it is offered as clinical context rather than as taught content.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
Concept CON-RES-D95A9FD64ABF25 records a typed neighbour, CON-RES-AA4C315125E587, on the pilot respiratory tree. That concept is not taught here; the edge belongs in the relation batch.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book and the solved paper agree on this material; no source disagreement was found to record.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-ANA-THORACIC-WALL-VEINS
## title
Venous drainage of the thoracic wall and the azygos system
## arabic_title
التصريف الوريدي لجدار الصدر وجهاز الوريد الأزيغوسي
## aliases
Posterior intercostal veins | Subcostal vein | Superior intercostal veins | Azygos vein | Hemiazygos veins
## subject
cvs
## topic
Anatomy
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-ANA-T04
## secondary_node_ids
SYS-RES-T01-S01-M04
## template_id
TPL-ANATOMY
## archetype
anatomy
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
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Eleven posterior intercostal veins and a subcostal vein on each side, and the two sides do not end the same way. On the right they reach the azygos vein directly; on the left they must cross the midline first, which is what the two hemiazygos veins exist to do. The one vein students lose on both sides is the first, because it belongs to neither pattern — it goes straight to the brachiocephalic vein.
## sections
### Overview and position
The thoracic wall drains forwards into the internal thoracic vein and backwards into the azygos system. The anterior intercostal veins accompany the anterior intercostal arteries — nine pairs, two in each of the upper nine spaces — and drain into the internal thoracic vein or its tributaries: the ninth, eighth and seventh spaces into the venae comitantes of the musculophrenic artery, the sixth, fifth and fourth into the venae comitantes of the internal thoracic artery, and the third, second and first directly into the internal thoracic vein itself.

The posterior drainage is the asymmetric one, and it is the one this article is about. There are eleven posterior intercostal veins and a subcostal vein on each side.

### Structure
On the right side, the pattern is in three parts. The first vein ends in the right brachiocephalic vein. The second, third and fourth unite to form the right superior intercostal vein, which ends in the arch of the azygos vein. The remaining posterior intercostal veins, the fifth to the eleventh, and the subcostal vein open separately into the azygos vein.

On the left side there are four parts, because there is no vein on the left running the length of the thorax to receive them. The first vein ends in the left brachiocephalic vein. The second, third and fourth unite to form the left superior intercostal vein, which also ends in the left brachiocephalic vein. The fifth, sixth, seventh and eighth open into the superior hemiazygos vein, which begins as a continuation of the fifth and ends in the azygos vein. The ninth, tenth and eleventh, together with the subcostal vein, open into the inferior hemiazygos vein, which begins in variable ways and also ends in the azygos vein.

The azygos vein itself — the unpaired vein — connects the back of the inferior vena cava in the abdomen with the back of the superior vena cava in the thorax. It most commonly arises from the back of the inferior vena cava opposite L2 and enters the thorax through the aortic opening of the diaphragm. It ascends in the posterior mediastinum as far as the T4/T5 disc, then in the superior mediastinum, where it arches forwards just above the root of the right lung to end in the middle of the back of the superior vena cava, just before that vein pierces the pericardium, opposite the second right costal cartilage. It drains most of the thoracic wall — directly on the right, and indirectly through the two hemiazygos veins on the left.

### Relations
In the posterior mediastinum the azygos vein has the oesophagus and the root of the right lung in front of it, and the lower eight thoracic vertebrae behind, separated from them by the right posterior intercostal arteries. On its right lie the right pleura and lung and the greater splanchnic nerve; on its left, the thoracic duct and the descending aorta.

The arch of the azygos vein, in the superior mediastinum, has the root of the right lung below it, the right pleura and lung on its right, and the oesophagus, trachea and right vagus nerve on its left.

### Blood supply, innervation and lymphatics
These are veins, so the question is what they receive rather than what supplies them. Each posterior intercostal vein accompanies the corresponding posterior intercostal artery and intercostal nerve in the costal groove of the rib above its space, the vein lying uppermost of the three. The territory drained is the same territory that artery supplies: the intercostal muscles, the parietal pleura lining the space, and the overlying skin of the thoracic wall.

### Development
The azygos system develops from the paired posterior cardinal, subcardinal and supracardinal veins of the embryo, and it is the incomplete and asymmetric regression of those channels that leaves an unpaired vein on the right and two crossing hemiazygos veins on the left. That embryological asymmetry is the reason the adult pattern must be learnt as two different lists rather than one mirrored list.

### Surface and imaging anatomy
The arch of the azygos vein is the structure that appears at the right tracheobronchial angle on a frontal chest radiograph, where it may be visible as a small rounded opacity. Its size varies with posture and with venous pressure, and it enlarges when flow through the azygos system increases.

### Clinical correlations
The azygos vein is the main route through which collateral venous circulation passes when the superior or inferior vena cava is obstructed, which is what makes an otherwise unremarkable vein clinically important. Obstruction of the superior vena cava above the entry of the azygos arch lets blood from the head, neck and upper limbs reach the right atrium by reversing down the azygos system into the inferior vena cava.

### Variations and anomalies
The inferior hemiazygos vein begins in variable ways, and the department book says so rather than fixing a single origin. Variation in where the two hemiazygos veins cross the midline, and in whether they join each other before joining the azygos, is common and is the reason the left-sided list is the harder one to reproduce.
## published_summary

## published_sections

## hold_these
There are eleven posterior intercostal veins and a subcostal vein on each side, and the two sides terminate differently.
On the right: the 1st ends in the right brachiocephalic vein; the 2nd, 3rd and 4th form the right superior intercostal vein, which ends in the arch of the azygos vein; the 5th to 11th and the subcostal vein open separately into the azygos vein.
On the left: the 1st ends in the left brachiocephalic vein; the 2nd, 3rd and 4th form the left superior intercostal vein, which also ends in the left brachiocephalic vein.
On the left: the 5th to 8th open into the superior hemiazygos vein, which begins as a continuation of the 5th; the 9th to 11th and the subcostal vein open into the inferior hemiazygos vein.
Both hemiazygos veins cross the midline to end in the azygos vein.
The right superior intercostal vein ends in the azygos arch; the left superior intercostal vein does not — it ends in the left brachiocephalic vein.
The azygos vein connects the back of the inferior vena cava to the back of the superior vena cava and is the main collateral route when either is obstructed.
## lose_the_mark
Forgetting the first vein on either side. It joins no part of the azygos system and goes straight to the brachiocephalic vein — and the solved copy of the 2025 paper leaves it out.
Mirroring the right-sided pattern onto the left. The left superior intercostal vein ends in the left brachiocephalic vein, not in an azygos arch.
Letting the subcostal vein disappear. It is named in the question and it ends with the lowest group on each side.
Giving the superior hemiazygos vein the 5th to 11th veins. It takes the 5th to 8th; the 9th to 11th go to the inferior hemiazygos.
## callout_evidence

## related_concepts
CON-CVS-19E63D8A8E7EDA
## related_articles
ART-104-ANA-PLEURA-AND-MEDIASTINUM: the compartment the azygos system runs in, and what it shares it with
## question_ids

## resource_ids
src_4bd55e9eaf092282818c
## article_source_ids
src_4bd55e9eaf092282818c
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Anatomy > Intercostal Spaces
## university_notes
kau: The Kasr Alainy anatomy book asks the posterior intercostal and subcostal veins as one six-mark question and expects both sides in full, group by group.
## annotations
### drains_into · CON-CVS-19E63D8A8E7EDA
Quote: The first vein ends in the right brachiocephalic vein.
Block: body

### drains_into · CON-CVS-19E63D8A8E7EDA
Quote: The fifth, sixth, seventh and eighth open into the superior hemiazygos vein, which begins as a continuation of the fifth and ends in the azygos vein.
Block: body
## media

## media_recommendations
### diagram · The azygos system drawn as a whole: azygos vein on the right with its arch, superior and inferior hemiazygos veins on the left crossing the midline, and every posterior intercostal vein numbered 1 to 11 with the subcostal vein, on both sides
Purpose: The answer is a pattern of which numbered vein joins which channel, and it is asymmetric. One labelled plate lets a student check their list; eleven sentences per side do not.
Priority: required
Status: needed
Kind: diagram
Section: Structure
Source direction: openly licensed anatomy atlas, or purpose-drawn following the department book's figure 21
Rights: must be CC-BY or public domain, or newly drawn for this product

### image · Frontal chest radiograph with the azygos arch marked at the right tracheobronchial angle
Purpose: The one place a student meets this vein outside a diagram is a plain film, and the opacity is unremarkable unless it has been pointed out once.
Priority: strongly helpful
Status: needed
Kind: radiograph
Section: Surface and imaging anatomy
Source direction: openly licensed radiology teaching case
Rights: must be CC-BY or public domain, and de-identified
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy anatomy department book, thorax section, printed pages 16-17 (manifest src_4bd55e9eaf092282818c; printed page = page index + 1). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The Development section is general embryology of the cardinal venous system and is not stated on these pages of the department book; it is written as orientation and is not examinable content from this source.
The radiographic appearance of the azygos arch is not covered by the department book's thorax chapter and is offered as clinical orientation only.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The concept this article teaches, CON-CVS-19E63D8A8E7EDA, is subject cvs while its module-subject leaf is Anatomy > Intercostal Spaces; the article follows the concept's subject so the two agree in the library navigator.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book states this without qualification; the solved paper's omission of the first vein is recorded as a pitfall, not as a source conflict.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-ANA-PLEURA-AND-MEDIASTINUM
## title
The pleura and the posterior mediastinum
## arabic_title
الجنبة والمنصف الخلفي
## aliases
Nerve supply of the pleura | Visceral pleura | Parietal pleura | Posterior mediastinum | Boundaries and contents of the posterior mediastinum
## subject
resp
## topic
Anatomy
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-ANA-T04
## secondary_node_ids
SYS-RES-T01-S01-M03 | SYS-RES-T01-S01-M04
## template_id
TPL-ANATOMY
## archetype
anatomy
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
10
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
One rule explains the nerve supply of the pleura completely: each layer takes the nerves of what it is attached to. The visceral layer belongs to the lung and takes the lung's autonomic supply, so it does not feel pain. The parietal layer belongs to the wall, and takes the somatic nerve of whichever part of the wall it lines — which is why diaphragmatic irritation refers to the shoulder in one place and to the abdominal wall a few centimetres away. Behind that pleura, between pericardium and vertebrae, sits the posterior mediastinum and its five groups of contents.
## sections
### Overview and position
The pleura is a serous membrane in two layers. The visceral, or pulmonary, pleura covers the lung; the parietal pleura lines the thoracic cavity. The parietal layer is named by region: cervical pleura above the first rib, costal pleura against the ribs and intercostal spaces, mediastinal pleura against the mediastinum, and diaphragmatic pleura on the diaphragm.

The posterior mediastinum is the compartment lying behind the pericardium and in front of the lower thoracic vertebrae. It is one of the four subdivisions of the mediastinum below the plane between the superior and inferior mediastinum, alongside the anterior and middle compartments.

### Structure
The boundaries of the posterior mediastinum are stated in two lines. In front lie the pericardium above and the diaphragm below. Behind lie the lower eight thoracic vertebrae, T5 to T12.

Its contents fall into five groups, and the count is what the mark scheme rewards.

Arteries: the descending thoracic aorta and its branches.

Veins: the azygos and hemiazygos venous system.

Nerves: the two vagi, which form the oesophageal plexuses, together with the sympathetic trunks and their splanchnic branches.

Tubes: the oesophagus, and the thoracic duct running along its right side.

Lymph nodes: the posterior mediastinal lymph nodes.

### Relations
The descending thoracic aorta begins on the left of the T4/T5 disc and runs down first on the left of the bodies of T5 to T7, then in front of T8 to T12, ending at the lower border of T12 at the aortic opening of the diaphragm. In front of it, from above downwards, lie the left principal bronchus, the pericardium, the oesophagus and the diaphragm; behind it the bodies of the lower five thoracic vertebrae and the two hemiazygos veins crossing at T8 and T9; and on its right side the oesophagus above, and the thoracic duct and azygos vein along its whole length.

The two vagi enter the compartment behind the roots of the lungs, break up into the posterior pulmonary plexuses, and reunite as the anterior and posterior oesophageal plexuses on the front and back of the oesophagus respectively — the left vagus in front, the right behind. They re-form as single nerves near the diaphragm and pass through the oesophageal opening as the anterior and posterior gastric nerves.

### Blood supply, innervation and lymphatics
The nerve supply of the pleura follows one principle: each layer takes the innervation of the structure it belongs to.

The visceral, or pulmonary, pleura is supplied by the same autonomic innervation as the lung, through the anterior and posterior pulmonary plexuses. It is not sensitive to somatic stimuli such as pain and temperature.

The parietal pleura is supplied by the same somatic innervation as the thoracic wall, mediastinum and diaphragm, according to the part concerned. The cervical pleura is supplied by the first intercostal nerve. The costal pleura is supplied segmentally by the corresponding intercostal nerve. The mediastinal pleura and the central part of the diaphragmatic pleura are supplied by the phrenic nerve. The peripheral part of the diaphragmatic pleura is supplied by the lower intercostal nerves.

The blood supply follows the same principle: the visceral pleura from the bronchial vessels, which supply the lung, and the parietal pleura from the internal thoracic and intercostal arteries, which supply the thoracic wall.

So does the lymphatic drainage: the visceral pleura into the bronchopulmonary and tracheobronchial nodes, which drain the lung, and the parietal pleura into the parasternal, intercostal, posterior mediastinal and diaphragmatic nodes, which drain the wall, mediastinum and diaphragm.

### Development
The two pleural layers derive from the lateral plate mesoderm: the visceral layer from the splanchnopleuric layer that invests the lung bud, the parietal layer from the somatopleuric layer that lines the body wall. That embryological origin is the reason the innervation splits the way it does — splanchnopleuric structures take autonomic nerves, somatopleuric structures take somatic ones — and it turns a list of nerves into a single rule.

### Surface and imaging anatomy
The cervical pleura rises about 2.5 cm above the medial third of the clavicle, which is why a supraclavicular needle can enter it. On a frontal chest radiograph the posterior mediastinal structures are largely hidden behind the heart and the vertebral column; a paravertebral opacity or a widened paraspinal line is the sign that something has appeared in the compartment.

### Clinical correlations
Because visceral pleura carries no somatic sensation and parietal pleura does, pleuritic pain arises only when the parietal layer is involved, and it is referred where that part of the parietal pleura's own nerve refers.

The split innervation of the diaphragmatic pleura has a direct consequence. Its central part is phrenic, C3, C4 and C5, so irritation there is referred to the shoulder tip. Its periphery is supplied by the lower intercostal nerves, so irritation a short distance away is referred to the abdominal wall instead and can imitate an abdominal emergency.

The posterior mediastinum is where a descending aortic aneurysm, an oesophageal tumour or enlarged posterior mediastinal nodes will sit, and each declares itself through the neighbours listed under Relations above.

### Variations and anomalies
The origin of the inferior hemiazygos vein within this compartment is variable, and the level at which the two hemiazygos veins cross the midline varies with it. The thoracic duct's course along the right side of the oesophagus is the usual arrangement rather than an invariable one, and duplication of the duct in the lower thorax is described.
## published_summary

## published_sections

## hold_these
Visceral pleura takes the same autonomic supply as the lung, through the anterior and posterior pulmonary plexuses, and is not sensitive to pain or temperature.
Parietal pleura takes the somatic nerve of the structure it lines.
Cervical pleura: 1st intercostal nerve. Costal pleura: the corresponding intercostal nerve, segmentally.
Mediastinal pleura and the central part of the diaphragmatic pleura: phrenic nerve. Peripheral part of the diaphragmatic pleura: lower intercostal nerves.
Posterior mediastinum boundaries: pericardium above and diaphragm below in front, the lower eight thoracic vertebrae, T5 to T12, behind.
Its contents are five groups: descending thoracic aorta and branches; azygos and hemiazygos veins; the two vagi with the sympathetic trunks and splanchnic branches; oesophagus and thoracic duct; and the posterior mediastinal lymph nodes.
Blood supply and lymphatic drainage of the pleura follow the same rule as the nerve supply — visceral with the lung, parietal with the wall.
## lose_the_mark
Giving the phrenic nerve the whole diaphragmatic pleura. Only its central part is phrenic; the periphery is intercostal, which is why referred pain moves from shoulder tip to abdominal wall across a few centimetres.
Stopping at four groups of contents. The posterior mediastinal lymph nodes are the fifth, and they are the group the solved copy of the 2025 paper loses.
Writing that the visceral pleura is insensitive because it has no nerve supply. It has one; it is autonomic, and autonomic afferents do not carry somatic pain.
Giving T5 to T12 as seven vertebrae. It is eight, and the book says "lower 8 thoracic vertebrae" in the same line.
## callout_evidence

## related_concepts
CON-RES-3AB5ED388161A2 | CON-RES-03AB23DA654BAF
## related_articles
ART-104-ANA-THORACIC-WALL-VEINS: the azygos system named in this compartment's contents, in full
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT: why the space between the two pleural layers is at sub-atmospheric pressure
## question_ids

## resource_ids
src_4bd55e9eaf092282818c
## article_source_ids
src_4bd55e9eaf092282818c
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Anatomy > Thoracic Cavity
104 CPS > Anatomy > Mediastinum
## university_notes
kau: The Kasr Alainy anatomy book asks the nerve supply of the pleura and the boundaries and contents of the posterior mediastinum as two separate six-mark questions, and expects the parietal pleura broken down by region in the first.
## annotations
### definition_of · CON-RES-3AB5ED388161A2
Quote: The visceral, or pulmonary, pleura is supplied by the same autonomic innervation as the lung, through the anterior and posterior pulmonary plexuses.
Block: body

### contains · CON-RES-03AB23DA654BAF
Quote: In front lie the pericardium above and the diaphragm below.
Block: body

### contains · CON-RES-03AB23DA654BAF
Quote: Lymph nodes: the posterior mediastinal lymph nodes.
Block: body
## media

## media_recommendations
### diagram · Coronal section of the thorax with the four named regions of parietal pleura shaded separately and each labelled with its nerve, and the visceral pleura shaded differently and labelled with the pulmonary plexuses
Purpose: The answer is a map of four territories with four different nerves, and the boundary between central and peripheral diaphragmatic pleura is the one students cannot place from prose.
Priority: required
Status: needed
Kind: diagram
Section: Blood supply, innervation and lymphatics
Source direction: openly licensed anatomy atlas, or purpose-drawn
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · Sagittal section of the mediastinum showing the four compartments, with the posterior mediastinum shaded and its anterior and posterior boundaries labelled at T5 and T12
Purpose: The boundaries are a spatial claim about which structure is in front and which behind, and a sagittal section settles it in one look where two clauses of prose do not.
Priority: required
Status: needed
Kind: diagram
Section: Structure
Source direction: openly licensed anatomy atlas, or purpose-drawn following the department book's figure 23
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · Transverse section at T8 showing the descending thoracic aorta, oesophagus, thoracic duct, azygos vein and sympathetic trunks in their relative positions
Purpose: The relations question is answered by the arrangement in cross-section; a list of neighbours in prose leaves the student unable to say which lies to the right of which.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Relations
Source direction: openly licensed anatomy atlas or a cross-sectional anatomy teaching set
Rights: must be CC-BY or public domain
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy anatomy department book, thorax section, printed pages 24, 53, 96 and 105 (manifest src_4bd55e9eaf092282818c; printed page = page index + 1). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The Development section is general embryology of the somatopleuric and splanchnicopleuric layers and is not stated in the department book's thorax chapter; it is written as orientation and is not examinable content from this source.
The 2.5 cm the cervical pleura rises above the clavicle is standard surface anatomy but is not printed on the pages read for this article, so it is not sourced to the book.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The department book's own "mediastinal syndrome" note appears on the posterior mediastinum page but describes compression of the superior mediastinum's contents. That material is taught in ART-104-ANA-AORTIC-ARCH-AND-ITS-DEVELOPMENT, where the 2025 paper's case belongs.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. All three figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book states both topics without qualification; the solved paper's omission of the fifth group of contents is recorded as a pitfall, not as a source conflict.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-ANA-CORONARY-ARTERIES
## title
The left coronary artery and its circumflex branch
## arabic_title
الشريان التاجي الأيسر وفرعه المنعطف
## aliases
Circumflex artery | Left circumflex | Left marginal artery | Branches of the left coronary artery
## subject
cvs
## topic
Anatomy
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-ANA-T04
## secondary_node_ids
SYS-CVS-T01-S01-M03
## template_id
TPL-ANATOMY
## archetype
anatomy
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
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
The left coronary artery divides into two, and the circumflex is the one that goes round the back. It starts at the top of the anterior interventricular groove, turns the left border of the heart, and ends by anastomosing with the right coronary artery in the posterior part of the coronary sulcus, with the coronary sinus running beside it the whole way. Two of its branches are the reason a circumflex occlusion can present as a rhythm problem: it supplies the sinu-atrial node in 40 per cent of people and the atrioventricular node in 20 per cent.
## sections
### Overview and position
The left coronary artery arises from the left posterior aortic sinus of the ascending aorta and divides into two terminal branches: the anterior interventricular artery and the circumflex artery. The division occurs at the upper end of the anterior interventricular groove, and that is where the circumflex begins.

### Structure
The circumflex artery passes to the left in the anterior part of the coronary sulcus, turns around the left border of the heart, and continues in the posterior part of the sulcus. It ends there by anastomosing with the right coronary artery.

Its named branches are five.

The left marginal artery descends along the left aspect of the heart, supplying the left ventricle down to the apex.

Branches to the left atrium.

Branches to the left ventricle, running on its anterior and diaphragmatic surfaces.

The artery to the sinu-atrial node, present in 40 per cent of people.

The artery to the atrioventricular node and bundle, present in 20 per cent of people, especially to the left bundle branch.

The other terminal branch, the anterior interventricular artery, descends with the great cardiac vein in the anterior interventricular groove, reaches the inferior border about 1.5 cm to the right of the apex, turns round it into the posterior interventricular groove and anastomoses there with the posterior interventricular branch of the right coronary artery. It supplies the sternocostal surface of the left ventricle, a narrow band of the right ventricle beside the anterior interventricular groove, and the anterior two thirds of the interventricular septum, and it gives the left conus artery near its origin.

### Relations
The circumflex artery is accompanied throughout by the coronary sinus, which drains most of the cardiac veins; the blood in the two vessels runs in the same direction. The great cardiac vein turns to the left at the upper end of the interventricular groove and then curves backwards in the anterior part of the coronary sulcus in company with the circumflex, ending in the left end of the coronary sinus.

In the posterior part of the coronary sulcus the circumflex lies between the left atrium above and the left ventricle below, on the base and diaphragmatic surface of the heart, with the oblique vein of the left atrium descending across the atrium behind it.

### Blood supply, innervation and lymphatics
Taken as a whole, the left coronary artery supplies the whole left atrium; the whole left ventricle except a narrow band on its diaphragmatic surface beside the posterior interventricular groove; a band of the sternocostal surface of the right ventricle beside the anterior interventricular groove; the anterior two thirds of the interventricular septum; and the sinu-atrial node in 40 per cent of people together with the atrioventricular node and bundle in 20 per cent.

Read from the conducting system's side, the same figures are the ones to hold: the sinu-atrial node is supplied by the right coronary artery in 60 per cent and the left in 40 per cent; the atrioventricular node and bundle by the right in 80 per cent and the left in 20 per cent.

The coronary arteries carry sympathetic and parasympathetic fibres from the cardiac plexuses. Cardiac lymphatics run back along the vessels to the tracheobronchial nodes.

### Development
The coronary arteries do not grow out of the aorta; the vascular plexus of the developing epicardium grows into it, and the two coronary stems connect to the aortic sinuses secondarily. This explains why the origin of a coronary artery from the wrong sinus is a recognised anomaly rather than an impossibility.

### Surface and imaging anatomy
The coronary sulcus, in which the circumflex runs, corresponds to the line of the atrioventricular groove and can be drawn on the surface between the borders of the heart. On coronary angiography the circumflex is the vessel that runs away from the operator around the left atrioventricular groove, with the obtuse marginal branch descending from it; on the left anterior oblique view it and the right coronary artery are seen approaching each other in the posterior part of the sulcus, where they anastomose.

### Clinical correlations
The anastomosis between the right and left coronary arteries is poor, especially in youth. It improves with age but remains inadequate as a collateral supply if a large artery is blocked suddenly, because the anastomosis opens slowly. Blockage of a coronary artery or one of its main branches, as in coronary thrombosis, causes myocardial infarction. Narrowing of a large branch causes ischaemia, and the pain of angina pectoris is felt behind the sternum and referred to the left shoulder and the medial side of the arm.

The nodal branches are the reason the circumflex has a rhythm consequence. The right coronary artery supplies most of the conducting system, and blockage of its branches is the classic cause of arrhythmia — but in the 40 per cent of people whose sinu-atrial node comes from the circumflex, and the 20 per cent whose atrioventricular node does, a circumflex occlusion can do the same.

### Variations and anomalies
The proportions are the variation. Whether the sinu-atrial and atrioventricular nodes are supplied from the right or the left is a normal variant, not an abnormality, and dominance — which artery gives the posterior interventricular branch — varies with it.
## published_summary

## published_sections

## hold_these
The circumflex artery is one of the two terminal branches of the left coronary artery and arises at the upper end of the anterior interventricular groove.
It passes left in the anterior part of the coronary sulcus, turns round the left border of the heart, and ends in the posterior part of the sulcus by anastomosing with the right coronary artery.
It is accompanied by the coronary sinus, and the blood in the two vessels runs in the same direction.
Its branches: left marginal artery; branches to the left atrium; branches to the anterior and diaphragmatic surfaces of the left ventricle; artery to the sinu-atrial node in 40%; artery to the atrioventricular node and bundle in 20%.
Sinu-atrial node: right coronary 60%, left coronary 40%. Atrioventricular node and bundle: right coronary 80%, left coronary 20%.
The coronary anastomosis is poor, opens slowly, and cannot protect against a sudden block of a large artery.
## lose_the_mark
Assuming the nodal arteries are always from the right coronary artery. The circumflex supplies the sinu-atrial node in 40% and the atrioventricular node in 20%.
Ending the circumflex at the left border of the heart. It turns the border and ends in the posterior part of the coronary sulcus.
Answering for the whole left coronary artery when the question names the circumflex branch, or the reverse.
Giving the coronary sinus as running opposite to the circumflex. The two run alongside each other in the same direction.
## callout_evidence

## related_concepts
CON-CVS-CFF45F193765C4
## related_articles
ART-104-ANA-AORTIC-ARCH-AND-ITS-DEVELOPMENT: the vessel the left coronary artery arises from, and where that vessel comes from
## question_ids

## resource_ids
src_4bd55e9eaf092282818c
## article_source_ids
src_4bd55e9eaf092282818c
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Anatomy > Heart
## university_notes
kau: The Kasr Alainy anatomy book prints the branch list of the circumflex as item 2 under the left coronary artery, and the 2025 paper's marked answer reproduces that list and nothing else.
## annotations
### definition_of · CON-CVS-CFF45F193765C4
Quote: The division occurs at the upper end of the anterior interventricular groove, and that is where the circumflex begins.
Block: body

### supplies · CON-CVS-CFF45F193765C4
Quote: The artery to the sinu-atrial node, present in 40 per cent of people.
Block: body
## media

## media_recommendations
### diagram · Anterior and posterior views of the heart side by side with the left and right coronary arteries and all named branches labelled, and the circumflex traced continuously from its origin round the left border to its anastomosis
Purpose: The circumflex's course crosses from the front of the heart to the back, so it cannot be seen whole in any single view. Two views on one plate is the only way a student follows it end to end.
Priority: required
Status: needed
Kind: diagram
Section: Structure
Source direction: openly licensed anatomy atlas, or purpose-drawn following the department book's figures 38 and 39
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · The coronary sulcus in posterior view showing the circumflex artery and the coronary sinus running side by side, with arrows marking that arterial and venous flow are in the same direction
Purpose: An artery and a vein running the same way is counter-intuitive and is exactly the detail the book singles out; an arrow pair settles it where a sentence invites a second reading.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Relations
Source direction: purpose-drawn following the department book's coronary sinus description
Rights: newly drawn for this product, or CC-BY
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy anatomy department book, thorax section, printed pages 86-89 (manifest src_4bd55e9eaf092282818c; printed page = page index + 1). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The Development section is general embryology of the coronary circulation and is not stated in the department book's thorax chapter; it is written as orientation and is not examinable content from this source.
The angiographic description in Surface and imaging anatomy is not covered by the department book and is offered as clinical orientation only.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts
The unsolved copy of the 2025 paper renders this question as "Mention origin, end and branches of left covonary artery", without the words "circumflex branch of". The solved copy carries them, and its marked answer reproduces only the circumflex branch list. The fuller reading is taken, because OCR drops words rather than inventing three coherent ones. The article teaches the whole left coronary artery so that either reading of the question is answerable from it.
## last_reviewed

## review_due

## notes
The live article ART-CVS-CORONARY-CIRCULATION covers coronary supply and venous drainage from the pilot corpus. It carries none of this module's concepts and is written to a different section contract, so it is not a rival record; the two should be reconciled when the pilot CVS tree and the Kasr module tree are merged.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-ANA-AORTIC-ARCH-AND-ITS-DEVELOPMENT
## title
The arch of the aorta: development, relations and the mediastinal syndrome
## arabic_title
قوس الأورطي: تطوره وعلاقاته ومتلازمة المنصف
## aliases
Aortic sac | Fate of the aortic sac | Derivatives of the aortic sac | Arch of the aorta | Aortic arch aneurysm | Mediastinal syndrome
## subject
cvs
## topic
Anatomy
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-ANA-T04
## secondary_node_ids
DIS-EMB-T03 | SYS-CVS-T01-S01 | SYS-CVS-T07-S02-M01
## template_id
TPL-ANATOMY
## archetype
anatomy
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
11
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
The arch of the aorta is built from four different embryonic sources, and the aortic sac supplies two of them: its right horn becomes the brachiocephalic artery, and its stem and left horn become the proximal part of the arch. In the adult, the same arch is defined by what it is related to — and when it dilates, those relations are what tells you it has. A triad of arrhythmia, dysphagia and hoarseness is a list of three neighbours in order.
## sections
### Overview and position
The arch of the aorta begins at the second right sternocostal junction as the continuation of the ascending aorta. It passes first upwards, backwards and to the left in front of the trachea, then backwards and downwards on the left side of the trachea, and ends on the left side of the disc between T4 and T5 by becoming the descending thoracic aorta. It lies in the superior mediastinum.

### Structure
The arch gives three large branches from its upper convex aspect: the brachiocephalic artery, the left common carotid artery and the left subclavian artery.

The arch itself is made of three parts of different embryonic origin, and the boundary between them is not visible in the adult vessel.

### Relations
The upper convex aspect is related to the origins of its three large branches and to the left brachiocephalic vein, which runs obliquely along its upper border.

The lower concave aspect is related to the bifurcation of the pulmonary trunk into right and left pulmonary arteries, the left principal bronchus, the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve.

The left anterior aspect is related to the mediastinal surfaces of the left pleura and lung, and to the structures crossing the arch: the left phrenic nerve with the pericardiacophrenic vessels, the left vagus nerve crossed superficially by the left phrenic, the superior cervical cardiac branch of the left sympathetic chain, the inferior cervical cardiac branch of the left vagus, and the left superior intercostal vein.

The right posterior aspect is related to the trachea, to the deep cardiac plexus lying on the tracheal bifurcation, to the oesophagus behind the trachea, to the left recurrent laryngeal nerve, and to the thoracic duct behind the left border of the oesophagus.

The left recurrent laryngeal nerve deserves its own line, because it is the relation the examiner reaches for. It arises from the left vagus as that nerve lies on the left anterior aspect of the arch, hooks below the arch behind and to the left of the ligamentum arteriosum, and ascends deep to the arch in the groove between the trachea and the oesophagus on the left.

### Blood supply, innervation and lymphatics
The wall of the arch is supplied by vasa vasorum from the aorta itself and from neighbouring mediastinal branches. Its innervation is autonomic, from the cardiac plexuses, and its adventitia carries the aortic arch baroreceptors, whose afferents run in the aortic nerve, a branch of the vagus. Lymphatics from the arch drain to the tracheobronchial and paratracheal nodes of the superior mediastinum.

### Development
The two ventral aortae fuse, after the two endocardial heart tubes have fused, to form the aortic sac. The sac is composed of a stem and two horns, right and left. It is connected caudally with the truncus arteriosus and cranially with the first aortic arch artery, and it sends a branch into each pharyngeal arch, giving the six pairs of aortic arch arteries.

The fate of the aortic sac is asked in two parts.

The right horn forms the brachiocephalic artery, which is continuous with the right common carotid artery, derived from the third aortic arch, and with the right subclavian artery, derived from the fourth.

The stem and the left horn together form the proximal part of the arch of the aorta.

The rest of the arch comes from elsewhere. Its middle part arises from the left fourth aortic arch artery. Its distal part arises from the lower part of the left dorsal aorta, down to the seventh cervical intersegmental artery.

The same development explains the asymmetry of the recurrent laryngeal nerves. Both supply the sixth pair of pharyngeal arches and hook around them. On the right, the distal part of the sixth aortic arch and the whole fifth arch disappear, so the nerve moves up and hooks around the right subclavian artery in the neck. On the left, the nerve hooks around the ductus arteriosus, formed from the distal part of the left sixth arch artery; after birth the ductus becomes the ligamentum arteriosum, and the nerve stays around it and around the arch of the aorta.

### Surface and imaging anatomy
The arch lies behind the manubrium, and its upper limit reaches the level of the middle of the manubrium. On a frontal chest radiograph it forms the aortic knuckle, the rounded prominence at the top of the left heart border; a dilated arch widens that shadow and displaces the trachea. On a lateral film the arch is seen end-on with the trachea passing behind it.

### Clinical correlations
A localised dilatation of the arch compresses the contents of the superior mediastinum and produces the mediastinal syndrome. The department book defines that syndrome by what is compressed: compression of veins or arteries gives venous congestion or ischaemia of the upper limb, head and neck; compression of the trachea or oesophagus gives dyspnoea or dysphagia; and compression of the left recurrent laryngeal nerve gives hoarseness of voice.

An aneurysm of the arch therefore declares itself through the structures the arch is related to, and a clinical triad is a list of those relations in order.

The pain is retrosternal and pulsatile and is worse on effort, which is what identifies the lesion as arterial and as an aneurysm rather than a solid mass.

Irregular heartbeats come from the superficial cardiac plexus, which lies on the concavity of the arch. A dilating arch pulls and stretches it, and the disturbance of cardiac autonomic traffic is felt as an irregular rhythm.

Dysphagia comes from the oesophagus, which lies behind the arch on its right posterior aspect and is compressed by it.

Hoarseness of voice comes from the left recurrent laryngeal nerve, which hooks under the arch beside the ligamentum arteriosum and is stretched by it. The department book records the same mechanism for compression by enlarged tracheobronchial lymph nodes and in lung cancer.

### Variations and anomalies
A right-sided aortic arch, a double aortic arch and an aberrant right subclavian artery all follow from a different pattern of regression among the aortic arch arteries and the dorsal aortae, and each changes which structures the arch is related to. An aberrant right subclavian artery passes behind the oesophagus and can itself cause dysphagia.
## published_summary

## published_sections

## hold_these
The aortic sac forms from fusion of the two ventral aortae and consists of a stem and a right and a left horn.
The right horn of the aortic sac becomes the brachiocephalic artery, continuous with the right common carotid from the third arch and the right subclavian from the fourth.
The stem and the left horn together become the proximal part of the arch of the aorta.
The middle part of the arch comes from the left fourth aortic arch artery; the distal part from the left dorsal aorta.
The concavity of the arch is related to the pulmonary trunk bifurcation, the left principal bronchus, the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve.
The oesophagus lies behind the arch, on its right posterior aspect, behind the trachea.
Arch aneurysm gives the mediastinal syndrome: irregular heartbeats from the superficial cardiac plexus, dysphagia from the oesophagus, hoarseness from the left recurrent laryngeal nerve.
The left recurrent laryngeal nerve hooks under the arch beside the ligamentum arteriosum; the right hooks round the right subclavian artery in the neck.
## lose_the_mark
Handing the whole arch of the aorta to the aortic sac. Only its proximal part is sac-derived; the middle is the left fourth aortic arch and the distal is left dorsal aorta.
Blaming the right recurrent laryngeal nerve for the hoarseness. Only the left one is related to the arch, so an arch lesion gives a left cord palsy.
Explaining the arrhythmia by compression of the conducting system. The arch is nowhere near it; the structure on the concavity is the superficial cardiac plexus.
Placing the oesophagus in front of the arch. It lies behind, on the right posterior aspect, behind the trachea.
Naming the ductus arteriosus in an adult. After birth it is the ligamentum arteriosum, and that is what the nerve hooks around.
## callout_evidence

## related_concepts
CON-DEV-9A66BF99D1BD3D | CON-CVS-4F6394A2A7C0C5
## related_articles
ART-104-ANA-CORONARY-ARTERIES: the branches of the vessel immediately upstream of the arch
ART-104-ANA-PLEURA-AND-MEDIASTINUM: the compartment behind this one, and the descending aorta the arch becomes
## question_ids

## resource_ids
src_4bd55e9eaf092282818c
## article_source_ids
src_4bd55e9eaf092282818c
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Anatomy > Development of the Heart
104 CPS > Anatomy > Large Arteries of the Thorax
## university_notes
kau: The Kasr Alainy anatomy book teaches the fate of the aortic sac and the fate of the aortic arches on facing pages, and the 2025 paper asked the sac alone for six marks and the arch aneurysm as a four-mark case.
## annotations
### definition_of · CON-DEV-9A66BF99D1BD3D
Quote: The right horn forms the brachiocephalic artery, which is continuous with the right common carotid artery, derived from the third aortic arch, and with the right subclavian artery, derived from the fourth.
Block: body

### presents_as · CON-CVS-4F6394A2A7C0C5
Quote: An aneurysm of the arch therefore declares itself through the structures the arch is related to, and a clinical triad is a list of those relations in order.
Block: body

### causes · CON-CVS-4F6394A2A7C0C5
Quote: Hoarseness of voice comes from the left recurrent laryngeal nerve, which hooks under the arch beside the ligamentum arteriosum and is stretched by it.
Block: body
## media

## media_recommendations
### diagram · The aortic sac with its stem and two horns, the six pairs of aortic arch arteries and the two dorsal aortae, colour-coded to the adult vessel each becomes, with the three sources of the arch of the aorta shown in three colours on one adult arch alongside
Purpose: The whole answer is a mapping from embryonic segments to adult vessels, and a colour correspondence carries it in one look where a table of eight rows has to be re-read against a second figure.
Priority: required
Status: needed
Kind: diagram
Section: Development
Source direction: openly licensed embryology text, or purpose-drawn following the department book's aortic arch figures
Rights: must be CC-BY or public domain, or newly drawn for this product

### diagram · The arch of the aorta in situ from the left, with the superficial cardiac plexus on its concavity, the oesophagus behind it, and the left recurrent laryngeal nerve hooking beneath it at the ligamentum arteriosum, each labelled with the symptom its compression produces
Purpose: The clinical triad is three anatomical relations, and the point of the case is that they are all in the same small space. A single annotated plate makes the case answerable; three separate sentences make it memorisable but not reconstructable.
Priority: required
Status: needed
Kind: diagram
Section: Clinical correlations
Source direction: openly licensed anatomy atlas, or purpose-drawn following the department book's figure 42
Rights: must be CC-BY or public domain, or newly drawn for this product

### image · Frontal chest radiograph showing a widened aortic knuckle in arch aneurysm, alongside a normal film for comparison
Purpose: The first investigation in this presentation is a plain film, and a widened knuckle is only recognisable against a normal one.
Priority: strongly helpful
Status: needed
Kind: radiograph
Section: Surface and imaging anatomy
Source direction: openly licensed radiology teaching case
Rights: must be CC-BY or public domain, and de-identified
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy anatomy department book, thorax section, printed pages 53, 94-96, 106 and 151-153 (manifest src_4bd55e9eaf092282818c; printed page = page index + 1). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The retrosternal pulsatile pain worse on effort is taken from the 2025 paper's own stem, not from the department book, which describes the mediastinal syndrome without characterising the pain.
The radiographic appearance of the aortic knuckle is not covered by the department book and is offered as clinical orientation only.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts
The unsolved copy's page 10 is a failed scan that repeats page 9, so the wording of the aortic sac question is attested only by the solved copy. The paper's own orientation arithmetic — five anatomy short answers of six marks plus a case of four, totalling 34 — requires a fifth anatomy question and confirms one is there. The solved copy also numbers the aneurysm case "6-", which is its position within the anatomy section rather than in the paper's running numbering, and its lettering runs a, b, c, e with no d.
## last_reviewed

## review_due

## notes
docs/import-ready/article/SYS-CVS-ARTICLE-T07.md holds a pending pilot article "Aortic aneurysm" with a "Thoracic aortic aneurysm" alias. That record is a clinical condition article on the system tree and carries none of this module's concepts; this article is the anatomy-of-relations reading the 2025 case asks for, and the two are complementary rather than rivals. They should be cross-linked once both are live.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. All three figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-HIS-LYMPHOID-ORGANS
## title
The lymphoid organs: lymph node, spleen, tonsils and thymus
## arabic_title
الأعضاء اللمفاوية: العقدة اللمفية والطحال واللوزتان والغدة الزعترية
## aliases
Lymphatic organs | Lymph node histology | Splenic white pulp | Malpighian corpuscle | Periarteriolar lymphatic sheath | Palatine tonsil | Lingual tonsil | Pharyngeal tonsil | Thymus histology | Hassall's corpuscle | Blood-thymic barrier
## subject
haem
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
16
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Four organs made of the same two ingredients — a connective tissue stroma and a lymphoid parenchyma — arranged four different ways. What separates them under the microscope is not the lymphocytes, which look alike everywhere, but what surrounds them: sinuses in the lymph node, a central arteriole in the spleen, a squamous epithelium dipping in as crypts in the tonsil, and Hassall's corpuscles with no follicles at all in the thymus. Learn the surroundings and the slide names itself.
## sections
### Definition
Lymphatic tissue is built mainly of T and B lymphocytes, with plasma cells and macrophages among them, and it exists in two forms. Diffuse lymphocytes are found everywhere in loose connective tissue, usually condensed beneath mucous membranes. Lymphatic nodules are non-capsulated aggregations of lymphocytes supported by a reticular connective tissue stroma. The two forms associate to make the lymphatic organs.

The organs divide into primary, or central — the thymus and the bone marrow — and secondary, or peripheral — the lymph nodes, the spleen and the tonsils.

The lymph node is a bean- or kidney-shaped encapsulated lymphatic organ lying along the course of lymphatic vessels, with a convex surface receiving afferent lymphatics and a concave surface, the hilum, where arteries enter and veins and efferent lymphatics leave. It is found in groups all over the body — axilla, groin, neck, thorax — and ranges from the size of a small bean to the size of an almond.

The spleen is the large, single, intra-abdominal haemolymphatic organ, situated along the course of the blood stream so that it can filter blood.

Tonsils are aggregations of lymphatic tissue that are incompletely encapsulated, and there are three: palatine, lingual and pharyngeal.

The thymus is a primary lymphoid organ with an endocrine function, sited in the thoracic cavity behind the sternum. It has a double origin: mesodermal for its lymphocytes, endodermal for its epithelial reticular cells.

### Mechanism
Each organ is a filter or a factory, and its architecture is the mechanism.

In the lymph node, lymph is what moves. Afferent lymphatic vessels pierce the convex surface of the capsule. Lymph passes from the subcapsular and trabecular cortical sinuses into the medullary sinuses, filtered on the way by the macrophages lining them, and leaves through efferent lymphatic vessels at the hilum. Arteries enter at the hilum and branch to capillaries in the cortex; venous capillaries descend from the cortex to form post-capillary venules, which collect into veins that also leave at the hilum. Those post-capillary venules are lined by simple cubical epithelium carrying receptors for the homing of T lymphocytes, and they are how T cells arriving from the thymus enter the paracortex. The node's functions are filtration of lymph from micro-organisms and foreign bodies, formation of lymphocytes, and immunological function through both humoral immunity — B lymphocytes activated to plasmablasts and then to plasma cells secreting antibodies — and cell-mediated immunity, in which activated T lymphocytes destroy antigen directly.

In the spleen, blood is what moves. The splenic artery enters at the hilum and divides into trabecular arteries running in the connective tissue trabeculae; these give the follicular, or central, arterioles that enter and supply the white pulps. At the boundary of the white pulp each central arteriole branches into penicillar arterioles, ending in terminal arterial capillaries that open into the blood sinusoids of the red pulp. Whether they open into the sinusoids directly or into the tissue of the red pulp first is the subject of three accounts. The closed theory states that the capillaries open directly into the blood sinusoids. The open theory states that they deliver blood into the tissue of the red pulp, which then enters the sinusoids through openings in their walls. The open-and-closed theory reconciles the two: the circulation is closed when the spleen contracts and open when it relaxes. Blood is collected by venous sinuses into red pulp veins, then trabecular veins, and leaves at the hilum as the splenic vein. The spleen's functions are filtration of blood by macrophages, storage of blood cells and platelets, formation of blood elements in fetal life and of lymphocytes throughout life, immunological function through T and B lymphocytes with the reticular cells trapping and presenting antigen, and destruction of old red cells — the haem iron stored in macrophages, the non-iron part becoming bile pigments, and the globin broken to amino acids returned to the blood.

In the tonsil, the epithelium is what moves inwards. The free surface epithelium dips down into the lymphatic tissue as invaginations called tonsillar crypts, in which bacteria, desquamated cells, phagocytic cells and lymphocytes accumulate. The function of all three tonsils is protection of the digestive and respiratory tracts against invaders by the production of antibodies.

In the thymus, lymphocytes are what move. Stem cells formed in the bone marrow travel to the thymus and lie in the superficial part of the cortex as lymphoblasts, dividing repeatedly to form small lymphocytes. Thymocytes then mature and acquire T-cell markers — thymic education — and undergo selection: non-functioning thymocytes are eliminated, about 80 per cent of them; thymocytes that bind self-antigens are eliminated, because otherwise they would cause autoimmune disease; eliminated thymocytes die by apoptosis and are removed by local macrophages; and some of the functioning thymocytes migrate to the medulla and then to the lymph nodes and spleen, where they settle in the thymus-dependent zones. The whole of that programming happens behind the blood-thymic barrier, a wall separating the developing T lymphocytes from antigens in circulating blood. The barrier is present only in the cortex, not in the medulla, and is formed of four layers: a continuous type of capillary endothelium joined by tight junctions; a thick continuous basal lamina of that capillary; a perivascular tissue around the capillary containing macrophages that phagocytose any antigen escaping through the endothelium; and a complete layer of epithelial reticular cells joined by tight junctions, forming a sheath outside the capillary and the macrophages. Its function is to let immature T lymphocytes multiply and differentiate in an environment free of foreign antigens before they migrate to the medulla and leave.

### Key determinants
This is the section that names a slide.

The lymph node has a stroma of a thin capsule of dense irregular fibrous connective tissue with elastic fibres, containing smooth muscle only at the thickened hilum and covered with adipose tissue; connective tissue septa or trabeculae extending from the deep surface of the capsule, dividing the cortex into regular compartments and branching in the medulla into irregular ones; and a reticular connective tissue network of reticular cells and fibres that stains brown with silver. Its parenchyma is a cortex and a medulla. The cortex holds lymphatic nodules — primary nodules of aggregated mainly B lymphocytes with few T cells, which become secondary nodules on exposure to antigen when some small B lymphocytes transform into large activated lymphocytes and aggregate centrally as a germinal centre; a secondary nodule therefore has a peripheral dark region of small lymphocytes and a pale central germinal centre containing large activated B lymphocytes and plasma cells with pale nuclei, plus macrophages and a few T cells. The cortex also holds cortical lymph sinuses, the spaces separating the nodules from the capsule (subcapsular) and from the trabeculae (trabecular), lined with endothelial cells and macrophages. Between cortex and medulla lies the paracortex, the thymus-dependent zone, containing T lymphocytes that arrived through the post-capillary venules. The medulla is medullary cords — irregular branching cords of B lymphocytes, plasma cells and macrophages, sometimes continuous with the cortical follicles — and medullary sinuses, the spaces between those cords and the trabeculae, lined with endothelium and macrophages.

The spleen has a thick capsule, especially at the hilum, of dense connective tissue rich in smooth muscle and elastic fibres and covered by peritoneum; long thick trabeculae radiating mainly from the hilum, with a few short irregular ones from the capsule, carrying blood vessels and nerves and dividing the organ into irregular compartments; and a reticular network more condensed at the white pulp. Its parenchyma is white pulp scattered as rounded spots in a red background.

Each white pulp, or Malpighian corpuscle, is a rounded or oval lymphatic nodule of reticular connective tissue whose cells are arranged concentrically in four zones around an arteriole placed at one side — the central arteriole, also called the follicular arteriole, and eccentric despite its name. From inside outwards those zones are: the thymus-dependent zone, the periarteriolar lymphatic sheath, containing T lymphocytes ensheathing the arteriole; the germinal centre, a pale-stained central area of B lymphocytes, large activated lymphocytes, plasma cells and macrophages; the follicular zone, the darkly stained ring around the germinal centre, mainly B lymphocytes; and the marginal zone, forming the periphery, containing T and B lymphocytes, plasma cells and macrophages.

The red pulp appears red in fresh sections because of the number of red cells, and it is two components. Splenic cords, the cords of Billroth, lie between the white pulps and the blood sinusoids and are infiltrated with red cells, granulocytes, lymphocytes, monocytes, platelets, plasma cells and macrophages. Blood sinusoids are barrel-shaped, irregular, wide blood channels lined by a fenestrated elongated endothelium of stave cells, with large intercellular spaces and a non-continuous basal lamina — an arrangement that lets blood pass from the splenic cords into the blood stream. Macrophages, the littoral cells, lie in and around the sinusoid walls.

The department book's comparison of the two organs is worth holding whole. The lymph node is multiple and small, sited along a lymph vessel, and filters lymph; the spleen is large and single, intra-abdominal, and filters blood and stores it. The node's capsule is covered by fascia, thin and poor in smooth muscle and elastic fibres, with many afferent and efferent lymph vessels; the spleen's is covered by peritoneum, thick and rich in smooth muscle and elastic fibres, with few efferent lymph vessels and no afferents. The node's trabeculae are thin and descend from the deep surface of the capsule; the spleen's are thick and arise mainly from the hilum. The node has a cortex of regularly arranged lymph follicles with clear germinal centres and no central arterioles, separated by lymph sinuses; the spleen has irregularly arranged Malpighian corpuscles with central arterioles and no lymph sinuses at all. The node's medulla has medullary cords and medullary lymph sinuses containing lymphocytes, plasma cells and macrophages; the spleen's red pulp has splenic cords and blood sinusoids containing red cells, white cells, plasma cells and macrophages.

The palatine tonsils are paired ovoid masses in the lateral wall of the oropharynx. The free surface is covered by non-keratinized stratified squamous epithelium dipping down as multiple tonsillar crypts. The lymphatic tissue is lymphatic nodules, with or without germinal centres, arranged around the crypts, and diffuse lymphatic tissue of lymphocytes, plasma cells and macrophages. Deep to the lymphatic tissue is dense connective tissue forming an incomplete capsule that separates it from adjacent structures. Mucous glands lie in the connective tissue, and their ducts open on the surface and not at the base of the crypts, so debris is not washed out and inflammation of the crypts is common.

The lingual tonsils are multiple masses at the base, the posterior third, of the tongue. They are covered by the same non-keratinized stratified squamous epithelium, which dips down to form crypts. They are formed of lymphatic nodules and diffuse lymphatic tissue, and they have no connective tissue capsule. The ducts of their mucous glands open into the bases of the crypts, so the crypts are continuously washed and inflammation is uncommon.

The pharyngeal tonsil is a single midline mass under the mucous membrane of the nasopharynx. Its epithelium is folded and is pseudostratified columnar ciliated with goblet cells. It has no crypts, and it has an incomplete connective tissue capsule. Hypertrophy of the pharyngeal tonsil produces adenoids.

The thymus is a single bilobed structure with a thin connective tissue capsule sending incomplete thin trabeculae that incompletely subdivide the lobes into a large number of lobules, on a reticular background. Each lobule has a cortex and a medulla. The cortex is the outer zone and stains darker, being more densely populated with lymphocytes: lymphoblasts in its outer part, thymocytes in its inner part, completely surrounded by epithelial reticular cells and macrophages. The medulla of each lobule is continuous with that of the adjacent lobule, stains lighter because lymphocytes are less abundant and epithelial reticular cells more so, and contains the acidophilic Hassall's corpuscles — small rounded structures whose number increases with age, formed of a central acidophilic mass of degenerating reticular cells surrounded by concentric layers of epithelial reticular cells.

Its epithelial reticular cells are endodermal, branched, with large oval pale nuclei and prominent nucleoli, secretory granules in the cytoplasm, and long processes containing cytokeratin filaments joined by desmosomes and tight junctions into a reticulum on which other cells sit. They nurse the developing lymphocytes, forming sheets deep to the capsule and around the septa and blood vessels that isolate the cortical lymphocytes from blood-borne antigen, and they secrete the thymic hormones and factors that promote T-cell differentiation and proliferation.

Four absences define the thymus and each is a mark. Its reticular cells are endodermal, not mesodermal, and do not produce reticular fibres. It has no lymphoid nodules. It has no B lymphocytes and no plasma cells. And it has no afferent lymph vessels — which is the absence that protects the thymocytes from circulating antigen. Two positives complete the set: it contains Hassall's corpuscles, and it involutes at puberty, having begun to grow from the second year of life, while continuing to produce lymphocytes.

### Clinical significance
Infection anywhere drains to a group of lymph nodes, and infection of that group enlarges and inflames them: lymphadenitis. Malignant cells spread from a primary site along lymphatic vessels and enlarge the regional nodes, which is why examining the nodes gives information about the spread of a cancer.

The spleen's stored blood is drawn from the red pulp into the circulation when the organ contracts, which is what makes it a reservoir in an emergency such as bleeding or haemolysis.

The palatine tonsil's crypt drainage is the reason it is the tonsil that becomes infected: tonsillitis is a common cause of sore throat, and repeated infection enlarges it and makes it a focus of infection.

Hypertrophy of the pharyngeal tonsil is what adenoids are.

The thymus's selection step is where autoimmunity is prevented, by eliminating the thymocytes that bind self-antigens.

### Common misconceptions
The central arteriole of the spleen is not central. It is eccentric, placed at one side of the corpuscle; the name describes the sheath wrapped around it, not its position.

Palatine and lingual tonsils cannot be separated by epithelium. Both are non-keratinized stratified squamous. It is the site and the crypts that tell them apart — and the pharyngeal tonsil is the one with a different epithelium, pseudostratified columnar ciliated with goblet cells, and no crypts at all.

Follicles are not enough to call a slide a lymph node. The spleen has nodules too. What a lymph node has and a spleen never has is lymph sinuses; what a spleen has and a lymph node never has is a central arteriole in the nodule.

The thymus's septa are not the same thing as lobulation with follicles. The thymus has no follicles and no sinuses; its lobules show a dark cortex and a pale medulla with Hassall's corpuscles, and that pairing is unique to it.
## published_summary

## published_sections

## hold_these
Primary lymphoid organs are the thymus and bone marrow; secondary are lymph nodes, spleen and tonsils.
Lymph node: thin capsule, septa descending from its deep surface, cortex of regular follicles bounded by lymph sinuses, paracortex as the thymus-dependent zone, medulla of cords and sinuses.
A secondary follicle has a pale germinal centre of large activated B lymphocytes and plasma cells inside a dark rim of small lymphocytes; a primary follicle has no germinal centre.
Splenic white pulp has four zones around the eccentric central arteriole: periarteriolar lymphatic sheath (T cells), germinal centre, follicular zone, marginal zone.
Splenic red pulp is splenic (Billroth) cords and blood sinusoids lined by fenestrated stave cells with wide intercellular spaces and a non-continuous basal lamina; littoral cells are its macrophages.
The lymph node has lymph sinuses and no central arterioles; the spleen has central arterioles and no lymph sinuses.
Palatine and lingual tonsils are both covered by non-keratinized stratified squamous epithelium; the palatine has multiple crypts with gland ducts opening on the surface, the lingual a single crypt whose base receives the gland ducts.
The pharyngeal tonsil has pseudostratified columnar ciliated epithelium with goblet cells and no crypts.
Thymus: no follicles, no B lymphocytes, no plasma cells, no afferent lymph vessels, endodermal reticular cells that make no reticular fibres, and Hassall's corpuscles in the medulla.
The blood-thymic barrier is cortex-only and has four layers: continuous capillary endothelium with tight junctions, thick continuous basal lamina, perivascular tissue with macrophages, and a complete layer of epithelial reticular cells with tight junctions.
## lose_the_mark
Taking the central arteriole to be central. It is eccentric; the name describes the sheath around it.
Separating palatine from lingual tonsil by epithelium. Both are non-keratinized stratified squamous; site and crypts are the discriminators.
Calling any slide with follicles a lymph node. Only the lymph node has lymph sinuses; only the spleen has a central arteriole inside the nodule.
Giving the thymus lymphoid nodules. It has none, and it has no B lymphocytes or plasma cells either.
Placing the blood-thymic barrier in the medulla. It is present only in the cortex, which is where the programming happens.
Describing the thymic reticular cells as mesodermal. They are endodermal and produce no reticular fibres, unlike those of a lymph node.
Writing that the lingual tonsil is infected more often because it has crypts. Its gland ducts open at the crypt base and wash it continuously; the palatine's open on the surface and do not.
## callout_evidence

## related_concepts
CON-HEM-BF004EF03BD129 | CON-HEM-7B050DE7FE2B80
CON-HEM-D2143156B30A8A | CON-HEM-A76AED7046089F | CON-HEM-748293D5DA5D92 | CON-HEM-E3D03CE92F1D92 | CON-HEM-087A20D42875CE
CON-HEM-2F3CB0082551D1 | CON-HEM-594B1725902DAD | CON-HEM-4D47090A0B7561
CON-HEM-093013026B640A | CON-HEM-F0020DCB0BA8FD | CON-HEM-23C119B7E783BD | CON-HEM-A165FFF2DDDE92
CON-HEM-BA8773E5D84286 | CON-HEM-10B2E783E164FD | CON-HEM-02424D1AF8A169 | CON-HEM-3E38A04641F73C | CON-HEM-BB5A071CEEB78F
## related_articles
ART-104-HIS-CAPILLARY-TYPES: the sinusoid described here is the sinusoidal capillary of that article, in the organ that defines it
ART-104-HIS-NASAL-MUCOSA: the pharyngeal tonsil sits under the same respiratory epithelium described there
## question_ids

## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
104 CPS > Histology > Lymphatic and Macrophage System > Spleen
104 CPS > Histology > Lymphatic and Macrophage System > Tonsils
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
## university_notes
kau: The Kasr Alainy histology book sets the objectives for this chapter explicitly — describe lymph node, spleen and thymus and discuss their functions; define, classify and describe the tonsils — and the four practical stations for this module examine the four organs one slide each.
## annotations
### definition_of · CON-HEM-7B050DE7FE2B80
Quote: Each white pulp, or Malpighian corpuscle, is a rounded or oval lymphatic nodule of reticular connective tissue whose cells are arranged concentrically in four zones around an arteriole placed at one side — the central arteriole, also called the follicular arteriole, and eccentric despite its name.
Block: body

### contrasts_with · CON-HEM-BF004EF03BD129
Quote: Mucous glands lie in the connective tissue, and their ducts open on the surface and not at the base of the crypts, so debris is not washed out and inflammation of the crypts is common.
Block: body

### definition_of · CON-HEM-BF004EF03BD129
Quote: The lingual tonsils are multiple masses at the base, the posterior third, of the tongue.
Block: body
## media

## media_recommendations
### histology · Low-power section of a human lymph node, H&E, whole organ in one field, capsule, subcapsular sinus, cortical follicles, paracortex, medullary cords and medullary sinuses all visible
Purpose: The organ is identified by the arrangement of its parts relative to each other, which exists only at a magnification that shows the whole node. Four separate high-power fields cannot carry it.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology atlas or an institutional teaching set
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: This plate also serves the practical station PRA-HAEM-104-SLIDE-LYMPH-NODE. An unlabelled version is preferred so the same image can carry a labelling question.

### histology · High-power field of a secondary lymphatic follicle showing the pale germinal centre inside the dark rim of small lymphocytes
Purpose: Primary versus secondary follicle is a difference in staining density between two concentric regions, and no wording of "pale centre in a dark rim" substitutes for seeing the contrast.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology atlas
Rights: must be CC-BY or public domain

### histology · Section of human spleen, H&E, at least one Malpighian corpuscle with its eccentric central arteriole clearly in the field, surrounded by red pulp
Purpose: The single most reliable discriminator between spleen and lymph node is a vessel inside the nodule, and its eccentric position is the detail students get wrong from prose.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology atlas or an institutional teaching set
Rights: must be CC-BY or public domain
Notes: Also serves the practical station PRA-HAEM-104-SLIDE-SPLEEN.

### diagram · The four zones of splenic white pulp drawn concentrically around the eccentric central arteriole, each zone labelled with its name and its cell population
Purpose: Four zones in a fixed order outward from a vessel is a spatial sequence, and the marked answer is the order. A ring diagram is checkable; a list is memorisable but not checkable.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn following the department book's diagram of the spleen
Rights: newly drawn for this product, or CC-BY

### histology · Section of palatine tonsil showing non-keratinized stratified squamous epithelium dipping into the lymphoid tissue as a crypt, with the incomplete capsule on the deep side only
Purpose: "Incompletely encapsulated" is a statement about one side of the organ having a capsule and the other not, and it is invisible in prose but obvious in one low-power field.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology atlas
Rights: must be CC-BY or public domain
Notes: Also serves the practical station PRA-HAEM-104-SLIDE-TONSIL. A companion field of lingual tonsil at the base of the tongue, and one of pharyngeal tonsil under its ciliated epithelium, would let the same station ask the discrimination.

### histology · Section of thymus, H&E, showing incomplete lobulation with a dark cortex, a pale medulla continuous between adjacent lobules, and at least one Hassall's corpuscle in the field
Purpose: The thymus is identified by a pairing — dark cortex with pale medulla and no follicles anywhere — and by one structure found nowhere else. Both are visual and neither survives a description.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology atlas or an institutional teaching set
Rights: must be CC-BY or public domain
Notes: Also serves the practical station PRA-HAEM-104-SLIDE-THYMUS.

### diagram · The blood-thymic barrier in cross-section, the four layers labelled outwards from the capillary lumen: endothelium with tight junctions, basal lamina, perivascular tissue with a macrophage, and the sheath of epithelial reticular cells
Purpose: The barrier is a layered wall and the answer is the layers in order. A cross-section is the only form in which "in order, from the lumen outwards" can be checked.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn following the department book's blood-thymic barrier figure
Rights: newly drawn for this product, or CC-BY

### diagram · Splenic circulation from splenic artery to splenic vein, with the open, closed and open-and-closed routes drawn as three alternatives at the capillary-to-sinusoid junction
Purpose: The three theories differ only in what happens at one junction, and drawing all three at that junction is what makes them comparable rather than three paragraphs to memorise.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn following the department book's splenic circulation figures
Rights: newly drawn for this product, or CC-BY
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy histology department book, "Book of Histology (CPS 104)", Chapter II, Lymphatic and Macrophage System, printed pages 14-25 (manifest src_18d3a953df4ca83c4e74; printed page = page index). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The number of crypts in a lingual tonsil is not given by the department book, which says only that the epithelium "dips down to form crypts". The single-crypt answer rests on the 2025 paper's marked answer, and this article states the crypt drainage rather than a crypt count.
No independent citation has been attached to any figure here; every statement is traceable to one department book.
The four practical stations for this module test lymph node and thymus histology, for which no concept has yet been minted in ../concept/104-CPS-concepts.md. This article teaches both in full so that those concepts have an article the moment they are authored.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts
The solved copy of the 2025 paper answers "single crypt" for the lingual tonsil. The histology department book, printed page 21, writes only that the lingual epithelium "dips down to form crypts" and gives no number. The article follows the book and teaches the discriminator the book does give — where the mucous gland ducts open — recording the marked answer here rather than adopting it silently.
## last_reviewed

## review_due

## notes
This article is deliberately larger than one exam question, because the module's four practical stations examine the four organs one slide each and the two concepts in ../concept/104-CPS-concepts.md cover only tonsils and splenic white pulp. Lymph node and thymus are taught here in full but carry no concept yet; when those concepts are minted, add their IDs to related_concepts rather than writing a second article.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. All eight figures, including the six the practical stations need, are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## title
Cell renewal and the causes of aneuploidy
## arabic_title
تجدد الخلايا وأسباب اختلال الصيغة الصبغية
## aliases
Cell renewal | Non-renewing cells | Potentially renewable cells | Continuously renewing cells | Aneuploidy | Non-disjunction | Causes of aneuploidy | Mosaicism
## subject
fnd
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T01
## secondary_node_ids

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
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Two questions from the same cytogenetics chapter, and both turn on what a cell does at a division it might not make. A specialized cell is classified by whether it can go back into the cycle at all; a chromosome is counted wrong because it failed to separate, failed to duplicate, or was simply lost. The word that ties them together is G0 in the first case and non-disjunction in the second, and in both the trap is assuming that a permanent-looking state is permanent.
## sections
### Definition
The cell cycle is the series of events that prepares a cell for division into two daughter cells. It has two phases: mitosis, about one hour, in which the changes are visible under the microscope, and interphase, about twenty hours in a rapidly dividing cell, in which they are not. Interphase is subdivided into G1, about eight hours, in which the daughter cell grows, acquires ATP, synthesises the RNA and protein needed for DNA duplication and becomes a specialized working cell; S, about eight hours, in which DNA and the centrioles are duplicated so that each chromosome becomes a d-chromosome; and G2, about four hours, in which RNA and proteins for division are made, energy is stored, tubulin is formed for the spindle, and errors in DNA replication are corrected. A cell that has left the cycle is in G0, the resting or stable phase.

Aneuploidy is a chromosome number that is not an exact multiple of the haploid number: the karyotype shows the addition or the loss of a single chromosome. Trisomy is the addition of one, giving 2n + 1, as in Down syndrome, trisomy 21. Monosomy is the loss of one, giving 2n - 1, as in Turner syndrome with 45 chromosomes. It sits alongside euploidy, in which the number is an exact multiple of the haploid number and exceeds the diploid — triploid at 69 chromosomes, tetraploid at 92, and higher polyploidies.

### Mechanism
Most working specialized cells are not in an active cycle at all. They perform their specific functions in a prolonged G1, and the more specialized the cell, the longer its G1 and the lower its rate of division. Specialized cells are classified according to their ability to reproduce themselves into three types.

Non-renewing cells are highly specialized cells that leave the cycle while in G1 and go to G0 for ever — a permanent exit. They never divide again, and if they are lost they are not replaced. Heart muscle cells and nerve cells are the examples.

Potentially renewable cells also go to G0, but they can return to the cycle when replacement is needed — a transient exit. Liver cells, after destruction or partial removal, are the example.

Continuously renewing cells are highly specialized end cells that cannot themselves divide but are replaced from stem cells. Blood cells and sperms are the examples.

The stem cells behind that third group are undifferentiated cells capable of self-renewal, and they come in two kinds. Pluripotential, or multipotential, stem cells can give rise to more than one type of specialized cell, as in blood cells and the lining of the gastrointestinal tract. Unipotential stem cells produce only one type, as in the male germ cells.

Aneuploidy arises three ways.

The first is non-disjunction, and it has two forms distinguished by which structures fail to separate and by what the daughter cells look like afterwards. Primary non-disjunction is the failure of the two homologous, bivalent chromosomes to separate during the first meiotic division; the result is four abnormal daughter cells. Secondary non-disjunction is the failure of the two chromatids to separate at the centromere, either during the second meiotic division or during mitosis; in meiosis the result is two normal and two abnormal daughter cells, and in mitosis both daughter cells are abnormal. When secondary non-disjunction happens in mitosis after many normal divisions, the body's cells end up carrying more than one karyotype — 46, 47, 45 — and that is a mosaic.

The second is failure of duplication: one chromatid, one s-chromosome, fails to duplicate during the S phase.

The third is simple loss: a chromosome fails to align at metaphase, or lags in its movement during anaphase.

### Key determinants
The daughter-cell count is the discriminator between the two kinds of non-disjunction, and it is worth holding as three numbers rather than as a description. Primary, in meiosis: four abnormal. Secondary, in meiosis: two normal and two abnormal. Secondary, in mitosis: two abnormal.

The department book also names five causes of chromosomal aberration in general, and non-disjunction appears in three of them: radiation, which causes chromosomal damage and non-disjunction; viral infection such as german measles, which fragments chromosomes; pregnancy in old age, which increases the risk of non-disjunction through a very long prophase; cytotoxic drugs such as colchicine, which inhibit spindle formation; and autoimmune disease, usually associated with non-disjunction.

### Applied physiology
The three renewal classes explain three different clinical facts with one idea. A myocardial infarct heals with scar rather than with new muscle because cardiac myocytes are non-renewing. A liver regenerates after partial hepatectomy because hepatocytes are potentially renewable. And bone marrow suppression shows up first in the blood, within days, because blood cells are continuously renewing and depend on a stem cell that is dividing.

### Clinical significance
The clinical importance of chromosomal examination, as the book lists it, is the diagnosis of genetic sex in doubtful cases of hermaphroditism; identification of fetal sex from cells in amniotic fluid; diagnosis of sex chromosome abnormalities such as Turner's syndrome, XO, and Klinefelter's syndrome, XXY; diagnosis of structural abnormalities such as the deletion found in mental retardation and the translocation of chronic myeloid leukaemia; diagnosis of numerical abnormalities such as mongolism; and medico-legal use in forensic medicine.

Down syndrome results either from non-disjunction of chromosome 21, trisomy 21, or from a translocation between 21 and 14. The child's cells contain 47 chromosomes, the extra one resembling chromosome 21, and the features are mental retardation, small genital organs, cardiac abnormalities, a lateral upward slope of the eyes, small ears and a short broad nose and neck.

Klinefelter's syndrome, 47 XXY, follows non-disjunction of the X chromosomes during the first meiotic division of the oocyte: an ovum carrying two X chromosomes is fertilised by a Y-bearing sperm. The Barr body is positive, and the features are a mentally retarded tall male with small testes, large breasts and widely separated nipples.

### Common misconceptions
"Continuously renewing" does not mean continuously dividing. The end cell does not divide at all; it is the stem cell behind it that does, and the answer must name both.

Aneuploidy is not always meiotic. Mitotic non-disjunction after fertilisation gives mosaicism, which is why a karyotype taken from one tissue can read normal in an affected patient.

Aneuploidy is also not the same as polyploidy. Polyploidy is an exact multiple of the haploid number; aneuploidy is precisely the case where the number is not.
## published_summary

## published_sections

## hold_these
Specialized cells classify by ability to reproduce into non-renewing, potentially renewable and continuously renewing.
Non-renewing cells leave the cycle in G1 for G0 permanently and are not replaced when lost: heart muscle and nerve cells.
Potentially renewable cells make a transient exit to G0 and can re-enter when replacement is needed: liver cells.
Continuously renewing cells are end cells that cannot divide but are replaced from stem cells: blood cells and sperms.
Aneuploidy is a chromosome number that is not an exact multiple of the haploid number — one chromosome added (trisomy) or lost (monosomy).
Its three causes are non-disjunction, failure of duplication in S phase, and simple loss by failure to align at metaphase or lagging in anaphase.
Primary non-disjunction is failure of the two homologous chromosomes to separate at the first meiotic division, giving four abnormal daughter cells.
Secondary non-disjunction is failure of the two chromatids to separate at the centromere, giving two normal and two abnormal daughter cells in meiosis and two abnormal cells in mitosis.
Secondary non-disjunction occurring in mitosis after many normal divisions produces a mosaic, whose body cells carry more than one karyotype.
## lose_the_mark
Reading "continuously renewing" as continuously dividing. The end cell does not divide; the stem cell behind it does.
Treating aneuploidy as always meiotic. Mitotic non-disjunction after fertilisation gives mosaicism, so a karyotype from one tissue can read normal.
Giving non-disjunction as the only cause. Failure of duplication and simple loss are the other two, and the question asks for causes in the plural.
Confusing aneuploidy with polyploidy. Polyploidy is an exact multiple of the haploid number; aneuploidy is exactly the case where it is not.
Swapping the daughter-cell counts. Primary gives four abnormal cells; secondary in meiosis gives two normal and two abnormal.
Offering the liver as an example of a continuously renewing cell. It is potentially renewable — it re-enters the cycle itself rather than being replaced by a stem cell.
## callout_evidence

## related_concepts
CON-FND-A2E40256517389 | CON-DEV-C2AC39B48A8F21
## related_articles
ART-104-HIS-LYMPHOID-ORGANS: the thymus, where selection eliminates 80% of thymocytes by apoptosis rather than by a failure of division
## question_ids

## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > The Cell Cycle
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## university_notes
kau: The Kasr Alainy histology book opens its cytogenetics chapter with ten explicit objectives, and both halves of this article are on that list — types of cells according to renewal potentialities, and the types of chromosomal aberration.
## annotations
### definition_of · CON-FND-A2E40256517389
Quote: Non-renewing cells are highly specialized cells that leave the cycle while in G1 and go to G0 for ever — a permanent exit.
Block: body

### causes · CON-DEV-C2AC39B48A8F21
Quote: Primary non-disjunction is the failure of the two homologous, bivalent chromosomes to separate during the first meiotic division; the result is four abnormal daughter cells.
Block: body

### causes · CON-DEV-C2AC39B48A8F21
Quote: When secondary non-disjunction happens in mitosis after many normal divisions, the body's cells end up carrying more than one karyotype — 46, 47, 45 — and that is a mosaic.
Block: body
## media

## media_recommendations
### diagram · The cell cycle with G1, S, G2 and M drawn to their stated durations, and three exits to G0 labelled permanent, transient and end-cell-with-stem-cell-behind-it, each with its example
Purpose: The classification is three different relationships to one point on a cycle, and drawing all three against the same G0 is what makes them contrastable rather than three definitions in a row.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn following the department book's cell cycle figures
Rights: newly drawn for this product, or CC-BY

### diagram · Primary and secondary non-disjunction drawn side by side through meiosis I and meiosis II, with the four daughter cells of each shown and their chromosome counts labelled, plus a third panel showing secondary non-disjunction in mitosis producing a mosaic
Purpose: The mark is in the daughter-cell count, and the count is a consequence of which division went wrong. Only a side-by-side lineage diagram lets a student derive the counts instead of memorising them.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed genetics text, or purpose-drawn
Rights: must be CC-BY or public domain, or newly drawn for this product
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy histology department book, "Book of Histology (CPS 104)", Chapter IV, Cytogenetics, printed pages 38-40 and 46-48 (manifest src_18d3a953df4ca83c4e74; printed page = page index). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
The Applied physiology section applies the book's three renewal classes to three clinical facts the book does not itself state. It is written as orientation and is not examinable content from this source.
No independent citation has been attached to any figure here; every other statement is traceable to one department book.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The two concepts taught here come off the same 2025 paper question, which asked the renewal classification for seven marks and the causes of aneuploidy as its unmarked second half. They sit in two different subject-tree leaves and both paths are carried in module_subject.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
secondaryNodeIds: Cytogenetics has no home on any system view — it is not the cardiovascular, respiratory or haemopoietic system — so the discipline node is the only honest placement and a second one would be invented.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book and the solved paper agree on this material; no source disagreement was found to record.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-HIS-CAPILLARY-TYPES
## title
The three types of blood capillary
## arabic_title
أنواع الشعيرات الدموية الثلاثة
## aliases
Continuous capillary | Somatic capillary | Fenestrated capillary | Visceral capillary | Sinusoidal capillary | Blood sinusoid
## subject
cvs
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
7
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Three capillaries, one variable: how leaky the wall is allowed to be. A continuous capillary is a sealed tube on an unbroken basal lamina and lets almost nothing through. A sinusoid is a wide, porous, discontinuous channel that lets whole cells through. Between them sits the fenestrated capillary — pores, but covered ones, on a continuous basal lamina — and confusing it with a sinusoid is the single commonest error in this comparison.
## sections
### Definition
A blood capillary is the vessel across which exchange between blood and tissue occurs, together with the post-capillary venule. Capillaries are classified into three types by the structure of their wall: continuous, also called somatic; fenestrated, also called visceral; and sinusoidal, also called the blood sinusoid.

### Mechanism
The wall is what does the work, and it varies in four features that always move together.

A continuous, somatic capillary is small and regular in calibre. Its endothelium is continuous with no pores. Its endothelial cells are joined by tight junctions. Its basal lamina is continuous. Pericytes are present, macrophages absent. Nothing crosses that wall except by transport through the cell or through the tight junction, which is why this is the capillary of tissues that must be protected.

A fenestrated, visceral capillary is also small and regular. Its endothelium has pores, and — this is the discriminator — those pores are covered by diaphragms. A diaphragm is a non-membranous cartwheel-like structure with a central thickening and fourteen wedge-shaped gaps, derived from the glycocalyx. Tight junctions are present between the endothelial cells, and the basal lamina is continuous. Pericytes are present and macrophages absent, as in the continuous capillary.

A sinusoidal capillary, or blood sinusoid, is large and irregular. Its endothelium has pores without diaphragms. Its endothelial cells are not sealed by tight junctions but separated by wide intercellular spaces. Its basal lamina is non-continuous. Pericytes are absent and macrophages are present. That combination is why a sinusoid can pass not just plasma proteins but whole cells.

### Key determinants
The sites follow from the wall, and the book pairs each site with what it must carry.

Continuous capillaries are found all over the body: connective tissue, bone, skin, exocrine glands.

Fenestrated capillaries are found in the intestine, in endocrine glands, and in the renal glomerulus — where the fenestrae have no diaphragms, which is the one exception to the diaphragm rule and is worth stating rather than hiding.

Sinusoids are found in the liver, to carry plasma proteins; in endocrine glands, to carry hormones; in bone marrow, to carry formed blood cells; and in the spleen, to carry stored blood cells.

For contrast, a lymphatic capillary begins as a blind end rather than from an arteriole, has a larger and more permeable lumen, has a non-fenestrated endothelium with wider gaps between its cells, has an interrupted basal lamina and has no pericytes. It removes lymph from the interstitial spaces and returns it to the blood, and it removes large molecules that blood capillaries cannot carry, such as fat droplets and bacteria.

### Clinical significance
The wall type sets what a tissue can lose and what a drug can reach. A continuous capillary bed retains protein, and its failure is what makes an inflamed tissue swell. A fenestrated bed is built for bulk filtration and secretion, which is why the glomerulus and the endocrine glands have one. A sinusoidal bed is built for cell traffic, which is why haemopoiesis takes place next to bone marrow sinusoids and why the spleen can release stored cells into the circulation when it contracts.

Inflammation of lymphatic vessels, lymphangitis, is visible in the skin as painful red lines, which is the lymphatic capillary's permeability made clinical.

### Common misconceptions
A sinusoid is not a fenestrated capillary. Both have pores, but the fenestrated capillary's pores are covered by diaphragms and its basal lamina is continuous, while the sinusoid's pores are uncovered and its basal lamina is not.

"Continuous" in "continuous capillary" and "continuous" in "continuous basal lamina" are two different claims about two different structures. The continuous capillary happens to have both; the fenestrated capillary has a discontinuous endothelium on a continuous basal lamina, and quoting one where the question asks for the other loses the mark.
## published_summary

## published_sections

## hold_these
Continuous (somatic) capillary: small and regular, endothelium continuous with no pores, tight junctions present, basal lamina continuous, pericytes present, macrophages absent.
Sinusoidal capillary (blood sinusoid): large and irregular, endothelium with pores lacking diaphragms, wide intercellular spaces instead of tight junctions, basal lamina non-continuous, pericytes absent, macrophages present.
Fenestrated (visceral) capillary: pores covered by diaphragms on a continuous basal lamina — the intermediate case.
Sites: continuous all over the body (connective tissue, bone, skin, exocrine glands); sinusoids in liver, endocrine glands, bone marrow and spleen.
A diaphragm is a cartwheel-like non-membranous structure with a central thickening and fourteen wedge-shaped gaps, derived from the glycocalyx.
The renal glomerular capillary is fenestrated but its pores have no diaphragms.
## lose_the_mark
Confusing a sinusoid with a fenestrated capillary. Both have pores; only the fenestrated one's are covered by diaphragms, and only its basal lamina is continuous.
Giving tight junctions to the sinusoid. It has wide intercellular spaces instead, and that is what lets whole cells pass.
Naming one site per type when the question asks for one site for each of two types, and giving the same organ twice.
Writing that the sinusoid has no basal lamina. It has one; it is non-continuous.
## callout_evidence

## related_concepts
CON-CVS-9585A65D9EDA4D
## related_articles
ART-104-HIS-LYMPHOID-ORGANS: the splenic sinusoid and its stave cells, which is this article's third type seen in one organ
## question_ids

## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
## university_notes
kau: The Kasr Alainy histology book prints this as a three-column table and the 2025 paper asked only two of the three columns, endothelium, junctions and basal lamina, plus one site each.
## annotations
### contrasts_with · CON-CVS-9585A65D9EDA4D
Quote: A continuous, somatic capillary is small and regular in calibre.
Block: body

### definition_of · CON-CVS-9585A65D9EDA4D
Quote: Its endothelial cells are not sealed by tight junctions but separated by wide intercellular spaces.
Block: body
## media

## media_recommendations
### diagram · The three capillary types drawn in cross-section side by side, each with its endothelium, junctions, basal lamina, pericytes and macrophages labelled, and the diaphragm of the fenestrated capillary drawn at higher magnification alongside
Purpose: The comparison is a four-row table whose rows are all spatial. Three cross-sections on one plate let a student read down a column; the table in prose has to be reassembled every time.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed histology text, or purpose-drawn following the department book's capillary table figures
Rights: must be CC-BY or public domain, or newly drawn for this product

### histology · Electron micrograph of a continuous capillary and of a sinusoid at comparable magnification, the continuous basal lamina visible in the first and its interruptions in the second
Purpose: The basal lamina is an electron-microscopic feature and students who have only seen it drawn do not recognise it on a micrograph, which is where the practical asks about it.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Mechanism
Source direction: openly licensed electron microscopy teaching set
Rights: must be CC-BY or public domain
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy histology department book, "Book of Histology (CPS 104)", Chapter I, A-V connections and types of blood capillary, printed pages 11-12 (manifest src_18d3a953df4ca83c4e74; printed page = page index). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
No independent citation has been attached to any statement here; all of it is traceable to one department book.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The 2025 paper asked only the continuous and sinusoidal columns. The fenestrated capillary is taught here anyway, because the concept's own pitfall is confusing the two porous types and a student cannot avoid a confusion with a structure the article never shows them.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book and the solved paper agree on this material; no source disagreement was found to record.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.

---

# Item
## id
ART-104-HIS-NASAL-MUCOSA
## title
Respiratory and olfactory mucosa
## arabic_title
الغشاء المخاطي التنفسي والشمي
## aliases
Respiratory mucosa | Olfactory mucosa | Olfactory epithelium | Bowman's glands | Sustentacular cells | Respiratory epithelium
## subject
resp
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Two mucosae line the same nasal cavity a centimetre apart and do opposite jobs. One conditions and cleans the air, so it is thin, motile and full of goblet cells. The other detects what is in the air, so it is thick, still and has none. Every line of the comparison — thickness, basement membrane, cilia, goblet cells, glands, pigment — follows from that difference in purpose, and the cilia are where students go wrong, because the olfactory ones do not beat at all.
## sections
### Definition
The nasal cavity consists of the external vestibule and the internal nasal fossae. The vestibule is the anterior dilated portion, lined by hairy keratinized stratified squamous epithelium that becomes non-keratinized deeper in, and carrying thick short hairs, the vibrissae, that filter large particles from the air.

The nasal fossae are two chambers separated by the bony nasal septum, each with three shelf-like conchae projecting from its lateral wall. The middle and inferior conchae are covered by respiratory epithelium; the superior concha is covered by olfactory epithelium. The lamina propria of the conchae is loose connective tissue containing large venous plexuses, the swell bodies, and mucous and serous glands. Their function is to improve the conditioning of inspired air by increasing the surface area of respiratory mucosa.

Respiratory mucosa is respiratory epithelium with its underlying connective tissue. The epithelium lining most of the conducting portion is pseudostratified columnar ciliated with goblet cells.

Olfactory mucosa covers the roof and the superior conchae of the nasal cavities and is olfactory epithelium with its connective tissue lamina propria.

### Mechanism
Respiratory epithelium has five recognised cell types, and its job is to move a sheet of mucus in one direction.

Ciliated columnar cells are the most abundant, each with about three hundred motile cilia, their apical cytoplasm packed with the basal bodies of those cilia and with the mitochondria that supply the energy for beating. They push mucus with its trapped bacteria and dust outwards.

Mucous goblet cells are the next most numerous, their apical portions filled with mucin granules, and they secrete the mucus that covers the epithelium and traps the particles.

Brush cells are columnar cells with abundant apical microvilli and basal afferent nerve endings, and they act as sensory receptors.

Basal cells are small rounded cells sitting on the basal lamina without reaching the lumen; they are the stem cells that replace the other types.

Small granule cells are neuroendocrine cells of the APUD group, with numerous basal dense granules, secreting hormones such as serotonin and catecholamines that control the diameter of the airway and its blood vessels and regulate mucous and serous secretion.

Olfactory epithelium is a modified pseudostratified columnar ciliated epithelium with no goblet cells, and it has three cell types.

Olfactory neurons are bipolar nerve cells whose nuclei lie at a level between those of the supporting and basal cells. Their dendrites extend to the surface and end in an olfactory swelling, the olfactory vesicle, carrying multiple basal bodies from which cilia arise. Those cilia are few, very long and non-motile, and they exist to increase the surface exposed to odorous substances. The axons of these cells pass into the lamina propria to form the olfactory nerve fibres.

Sustentacular, or supporting, cells are tall columnar cells with wide cylindrical apices and narrow bases, apical microvilli submerged in a fluid layer, and apical yellow lipofuscin granules that give the olfactory mucosa its yellow colour. Junctional complexes bind them to the olfactory cells.

Basal cells are small pyramidal cells with basophilic cytoplasm and round nuclei, acting as stem cells for both the sensory and the supporting cells.

The lamina propria beneath is dense connective tissue containing the olfactory nerve bundles and Bowman's glands, whose serous secretion reaches the surface through ducts and forms the medium around the olfactory cilia in which odorous substances dissolve.

### Key determinants
The department book sets the comparison out in six rows, and four of them were asked in 2025.

Epithelial thickness: olfactory thicker, respiratory thinner.

Goblet cells: absent in olfactory mucosa, present in respiratory.

Cilia: the olfactory cells have few, long, non-motile cilia; respiratory epithelium has numerous true motile cilia.

Basement membrane: thin in olfactory mucosa, thick in respiratory.

Bowman's glands: present in olfactory mucosa, absent in respiratory.

Pigment: present in the sustentacular cells of olfactory mucosa, absent in respiratory.

### Clinical significance
In smokers, mucus accumulates in the small airways because the ratio of ciliated to goblet cells is reversed or because the cilia are paralysed — either way the escalator stops while the mucus keeps being made.

Allergic reaction and inflammation congest the swell bodies of both nasal fossae and limit airflow, which is the histological basis of nasal obstruction.

Epistaxis, a nosebleed, follows from the same venous plexuses lying in a thin lamina propria close to the surface, and trauma to the face is one of several causes.

Olfactory neurons are the only neurons that regenerate to a high degree, because of the capacity of their basal stem cells — a fact worth holding beside the statement in the cytogenetics chapter that nerve cells are non-renewing.

### Common misconceptions
The olfactory cilia are not motile. They do not beat; they lie in the serous fluid of Bowman's glands as receptive processes, and that fluid is where the odorants dissolve. Calling them motile also makes nonsense of the comparison, because motile cilia are what the respiratory side contributes.

"Thicker epithelium on a thinner basement membrane" reads like a contradiction and is routinely written the wrong way round. The olfactory epithelium is the thick one and its basement membrane is the thin one.

Olfactory mucosa is not simply respiratory mucosa without goblet cells. It has two structures respiratory mucosa lacks entirely — Bowman's glands and the lipofuscin pigment — and a full answer names them.
## published_summary

## published_sections

## hold_these
Olfactory mucosa covers the roof and superior conchae; the middle and inferior conchae carry respiratory epithelium.
Olfactory epithelium is thicker than respiratory epithelium and rests on a thin basement membrane; respiratory epithelium is thinner on a thick basement membrane.
Olfactory epithelium has no goblet cells; respiratory epithelium has them.
Olfactory cilia are few, very long and non-motile, arising from the olfactory vesicle; respiratory cilia are numerous, true and motile, about 300 per cell.
Olfactory mucosa has Bowman's glands and yellow lipofuscin pigment in its sustentacular cells; respiratory mucosa has neither.
Olfactory epithelium has three cell types: olfactory neurons, sustentacular cells and basal cells.
Respiratory epithelium has five: ciliated columnar, goblet, brush, basal and small granule cells.
## lose_the_mark
Calling the olfactory cilia motile. They do not beat; they are receptive processes lying in the serous fluid of Bowman's glands, where odorants dissolve.
Reversing the thickness rows. The olfactory epithelium is thicker and its basement membrane is thinner.
Describing olfactory mucosa as respiratory mucosa minus goblet cells. It also has Bowman's glands and lipofuscin pigment, which respiratory mucosa lacks.
Giving the yellow colour to a pigment in the olfactory neurons. The lipofuscin is in the sustentacular cells.
## callout_evidence

## related_concepts
CON-RES-B7F9FACECA4AFF
## related_articles
ART-104-HIS-LYMPHOID-ORGANS: the pharyngeal tonsil lies beneath this same respiratory epithelium in the nasopharynx
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY: why the regeneration of olfactory neurons is worth noticing against the rule that nerve cells are non-renewing
## question_ids

## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids

## span_ids

## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
## university_notes
kau: The Kasr Alainy histology book prints the comparison as a six-row table on printed page 30, and the 2025 paper asked four of those rows.
## annotations
### contrasts_with · CON-RES-B7F9FACECA4AFF
Quote: Those cilia are few, very long and non-motile, and they exist to increase the surface exposed to odorous substances.
Block: body

### definition_of · CON-RES-B7F9FACECA4AFF
Quote: Epithelial thickness: olfactory thicker, respiratory thinner.
Block: body
## media

## media_recommendations
### histology · Section of olfactory mucosa and of respiratory mucosa at the same magnification, side by side, both showing the full epithelial thickness down to the basement membrane
Purpose: The first two rows of the comparison are relative thicknesses, and a relative measurement is only checkable when both specimens are in the field at one magnification.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology atlas or an institutional teaching set
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure

### diagram · Olfactory epithelium in section with the olfactory neuron, its dendrite ending in the olfactory vesicle, the long non-motile cilia lying in the fluid layer, the sustentacular cell with its microvilli and pigment granules, the basal cell, and a Bowman's gland in the lamina propria
Purpose: The cilia are non-motile because of where they sit and what they sit in, and that relationship between vesicle, cilia and glandular fluid is spatial. Prose lists the parts; only the drawing shows them lying together.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed histology text, or purpose-drawn following the department book's olfactory mucosa figure
Rights: must be CC-BY or public domain, or newly drawn for this product
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy histology department book, "Book of Histology (CPS 104)", Chapter III, Respiratory System, conducting portion, printed pages 27-30 (manifest src_18d3a953df4ca83c4e74; printed page = page index). Read from the committed page-text cache rather than by re-extraction.
## evidence_gaps
No independent citation has been attached to any statement here; all of it is traceable to one department book.
The Arabic title is composed from standard Arabic medical terminology and has not been checked by an Arabic-speaking reviewer.
## conflicts

## last_reviewed

## review_due

## notes
The live article ART-RES-TOP-71AA9C3212, "Respiratory Histology", covers this ground from the pilot corpus under different section headings and carries none of this module's concepts. It is not a rival record, but the two should be reconciled when the pilot respiratory tree and the Kasr module tree are merged.
## field_notes
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
questionIds: The written batch for this paper is generated by scripts/kasr/build-batches.ts, so the reciprocal link is written by the generator and not by hand.
media: No rights-cleared asset exists in this repository. Both figures are written as requests in media_recommendations rather than left as an unexplained blank.
claimIds: AUTHORING GAP: no claim record has been authored for this module yet. It belongs in the evidence batch, and this field is left present and empty rather than pointed at an invented ID.
spanIds: AUTHORING GAP: the evidence pass has not run for 104 CPS, so no SPN- record exists to name. Left empty rather than filled with an ID that resolves to nothing.
calloutEvidence: No claim or citation record exists yet to gate a callout with, and a "Reviewed by" line without a review would be a false assertion.
conflicts: The department book and the solved paper agree on this material; no source disagreement was found to record.
publishedSummary: Status is Draft; there is no student projection to publish until the evidence gate is passed.
publishedSections: Status is Draft; there is no student projection to publish until the evidence gate is passed.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
