<!--
  Citations for the 104 CPS claims in ./104-CPS-claims.md.

  Every support_span is copied out of the committed page-text cache
  (scripts/kasr/extract/pagetext/<sourceId>.json), never paraphrased and never
  typed from memory. Each was checked back against the cached page before this
  file was written; a sentence that could not be found on the page it was
  supposed to be on was not cited.

  What the quotes preserve and what they do not:
    - Wording, spelling and punctuation are as printed, including the book's own
      slips ('Efflux of Ca++' under 'Inward positive current', 'simple cubical
      epithelium' lining a venule, 'Gl' and 'GO' for G1 and G0).
    - '...' marks text cut from inside a quote.
    - Runs of whitespace are collapsed, and decorative bullet glyphs that the PDF
      carries in a symbol font (private-use code points) are dropped. Neither
      changes a word.
    - Three quotes are comparison tables, where the text layer interleaves the
      columns line by line. They are quoted tangled, as extracted, with the
      column order explained in context_note, rather than untangled into
      something the page does not literally say.

  locator_type is printed_page and locator_page is the number printed on the
  page. locator_detail carries the zero-based index into the cached pages array,
  because that is what a reader needs to find it again:
    physiology  printed = index       anatomy  printed = index + 1
    histology   printed = index

  counts_as_claim_evidence is 'no' on every row. Not because the locator is
  vague — each has an exact page — but because a university department book is
  local curriculum, not independent verification, and one of them must not by
  itself promote a claim to 'verified'. Flip a row to 'yes' only when an
  independent authoritative source has been read and cited alongside it.
-->

# Item
## id
CIT-104-PHY-AP-PHASE1-01-LOCAL
## claim_id
CLM-104-PHY-AP-PHASE1-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Phase 1: • Rapid small initial repolarization • Cause: 1. Efflux of K+: Activation of transient outward K+ channels → conduct transient outward repolarizing current (Ito). 2. Influx of Cl- 3. Inactivation of fast Na+ channels.
## locator_type
printed_page
## locator_page
11
## locator_section
Cardiac Myocyte Action Potential — Phase 1
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book's own bullet list. It establishes what this faculty teaches; it is not an independent check on the physiology.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-AP-PHASE2-01-BALANCE
## claim_id
CLM-104-PHY-AP-PHASE2-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Phase 2: • Known as the plateau. • Duration in ventricular myocyte is about 200 msec. • Membrane potential is nearly constant (sustained around zero mV). • Cause: Balance between two opposing currents:
## locator_type
printed_page
## locator_page
12
## locator_section
Cardiac Myocyte Action Potential — Phase 2
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The plateau, its duration and the fact that it is a balance of two currents. The book's own wording.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-AP-PHASE2-01-CONFLICT
## claim_id
CLM-104-PHY-AP-PHASE2-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
2. Inward positive current: a. Efflux of Ca++ (ICaL): through long-lasting Ca++ channels. b. Increased activity of Na+-Ca++ exchanger during the late part of the plateau due to increased Ca++ inside the myocyte: One Ca++ out and 3 Na+ in, i.e., a net influx of one positive charge.
## locator_type
printed_page
## locator_page
12
## locator_section
Cardiac Myocyte Action Potential — Phase 2, inward positive current
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
This is the conflicted passage, quoted whole so the disagreement is visible: the heading says "Inward positive current" and the sub-item says "Efflux of Ca++". Quoted as printed; not corrected.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-EJECTION-PHASES-01-LOCAL
## claim_id
CLM-104-PHY-EJECTION-PHASES-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
It occurs in rapid ejection and reduced ejection phases when ventricular pressure exceeds arterial pressure leading to opening of semilunar valves. During reduced ejection phase, ejection continues in spite of decreased pressure gradient between ventricular pressure and arterial pressure due to the momentum of ejected blood.
## locator_type
printed_page
## locator_page
25
## locator_section
Ventricular Ejection
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book's account of the two ejection phases.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-STROKE-VOLUME-ARITHMETIC-01-LOCAL
## claim_id
CLM-104-PHY-STROKE-VOLUME-ARITHMETIC-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
After reduced ejection phase, volume of blood remains in each ventricle is about 60 ml. This is known as the end-systolic volume “ESV”. It equals EDV (130 ml) - ESV (60 ml) = 70 ml and is known as the stroke volume SV.
## locator_type
printed_page
## locator_page
25
## locator_section
Ventricular Ejection
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
Quoted as printed. The book's sentence mislabels the subtraction — "It equals EDV - ESV" follows a sentence whose subject is the end-systolic volume — but the three numbers and the result are unambiguous.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-INOTROPY-ESPVR-01-LOOP
## claim_id
CLM-104-PHY-INOTROPY-ESPVR-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
• Increased inotropy shifts ESPVR upwards and to the left. • Ventricular contraction begins at the same EDV and reaches lower ESV (point “1a”).
## locator_type
printed_page
## locator_page
37
## locator_section
Effect of increasing inotropic state on SV using the ventricular pressure-volume loop
## locator_detail
cached page index 37 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book states both halves of the claim in one place.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-INOTROPY-ESPVR-01-SLOPE
## claim_id
CLM-104-PHY-INOTROPY-ESPVR-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Important: The slope of the ESPVR depends on the inotropic state of ventricular muscle. - Positive inotropic stimuli increase the slope of the ESPVR (i.e., shifts the ESPVR upwards and to the left).
## locator_type
printed_page
## locator_page
30
## locator_section
End-systolic pressure-volume relationship ESPVR
## locator_detail
cached page index 30 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The same statement earlier in the chapter, where the ESPVR is defined; it supplies the reason the line moves — its slope is contractility.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-CARDIAC-RESERVE-01-LOCAL
## claim_id
CLM-104-PHY-CARDIAC-RESERVE-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Maximal heart rate = 220 – age in years. This equals approximately 200 beats/min in normal young adults. The normal resting heart rate is about 75 /min. So, the reserve for heart rate during exercise is from 75 to 200 beats per minute.
## locator_type
printed_page
## locator_page
41
## locator_section
Cardiac reserve depends on the following mechanisms — 1- Heart rate reserve
## locator_detail
cached page index 41 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book's own equation and worked reserve.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-STROKE-VOLUME-RESERVE-01-LOCAL
## claim_id
CLM-104-PHY-STROKE-VOLUME-RESERVE-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
2- Stroke volume reserve: Stroke volume can be increased from 70 ml in normal young adults up to 200 ml during maximal exercise. This can be achieved by: a. Increasing EDV (Frank-Starling’s mechanism). b. Decreasing ESV (by sympathetic stimulation or other positive inotropics).
## locator_type
printed_page
## locator_page
41
## locator_section
Cardiac reserve depends on the following mechanisms — 2- Stroke volume reserve
## locator_detail
cached page index 41 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book's second mechanism of cardiac reserve, quoted whole.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-MSFP-VALUE-01-LOCAL
## claim_id
CLM-104-PHY-MSFP-VALUE-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
This is the pressure present all over the systemic circulation if the heart stops pumping. When the heart stops pumping, and cardiac output reaches zero (i.e., there is no blood flow in circulation) arterial pressure becomes equal to right atrial pressure (figure 4-10). This pressure at zero blood flow is known as the mean systemic filling pressure (MSFP). - Normally, the value of MSFP ranges between 6-8 mmHg.
## locator_type
printed_page
## locator_page
50
## locator_section
1- Mean Systemic Filling Pressure (MSFP)
## locator_detail
cached page index 50 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book's definition and normal range.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-MSFP-VR-CURVE-01-LOCAL
## claim_id
CLM-104-PHY-MSFP-VR-CURVE-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Effect of changes in MSFP on venous return curve: (figure 4-12). - Increasing MSFP (e.g., by increasing blood volume or decreasing capacity of the circulation) → parallel shift of the curve up and to the right. So, at any given RAP value, higher VR is achieved. - Conversely, decreasing MSFP → shift VR curve down and to the left.
## locator_type
printed_page
## locator_page
52
## locator_section
Effect of changes in MSFP on venous return curve
## locator_detail
cached page index 52 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The word "parallel" is the book's, and it is what carries the concept's "without changing its slope". The book states the slope change separately, under resistance to venous return.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-THORACIC-PUMP-01-LOCAL
## claim_id
CLM-104-PHY-THORACIC-PUMP-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
1. Thoracic Pump: During inspiration: The intra-pleural pressure falls from – 4 mm Hg to – 8 mm Hg. This is reflected in the right atrial pressure and in the vena cava in which the pressure decreases too. Therefore, the gradient that moves blood from abdominal veins back to the heart increases → venous return increases.
## locator_type
printed_page
## locator_page
53
## locator_section
Venous return — mechanical factors — 1. Thoracic Pump
## locator_detail
cached page index 53 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book gives intrapleural pressure in mmHg here and in cmH2O in the respiratory chapter (p. 106, -3 to -6/-8 cmH2O). The two are different units for the same fall, not a disagreement, but the numbers do not match across chapters.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-BARORECEPTOR-SITE-01-LOCAL
## claim_id
CLM-104-PHY-BARORECEPTOR-SITE-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
These are mechanical stretch receptors. They act as “pressure sensors” that monitor the level of arterial blood pressure. Site: are located in: • Carotid sinus. • Aortic arch. Innervation: • Carotid sinus nerve (Hering’s nerve) is a branch of the glossopharyngeal nerve (IX cranial nerve) that carries impulses from carotid sinus baroreceptors. • Aortic nerve (branch of vagus, X cranial nerve). • These nerves are known as “buffer nerves”: they end in nucleus of tractus solitarius.
## locator_type
printed_page
## locator_page
76
## locator_section
I. Arterial baroreceptors (high-pressure baroreceptors)
## locator_detail
cached page index 76 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
Site and innervation together, as the department book prints them.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-BAROREFLEX-OPPOSES-01-LOCAL
## claim_id
CLM-104-PHY-BAROREFLEX-OPPOSES-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
2. When arterial blood pressure increases: Tonic discharge from baroreceptors to NTS is increased. This will lead to: a- More inhibition of vasomotor area. This will decrease sympathetic discharge to the heart (decreasing heart rate, stroke volume and cardiac output) and blood vessels (vasodilation) → decrease of blood pressure back to normal. b- More excitation of cardiac inhibitory area. The vagal tone to the heart is increased → decreased heart rate and cardiac output.
## locator_type
printed_page
## locator_page
77
## locator_section
Function of Baroreceptor Reflex
## locator_detail
cached page index 77 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The rising-pressure limb. The book prints the falling-pressure limb immediately below it as the exact mirror.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-LUNG-RECOIL-SOURCES-01-LOCAL
## claim_id
CLM-104-PHY-LUNG-RECOIL-SOURCES-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
A- Elastic properties in lung and chest wall: - The elasticity of the lungs comes from collagen and elastin fibers, while the chest wall's elasticity depends on its muscles, tendons, and ligaments. ... B- Surface tension of fluid lining the alveoli: - Surface tension results from the attraction between fluid molecules at an air- fluid interface, causing the surface to shrink.
## locator_type
printed_page
## locator_page
105
## locator_section
Causes of recoil tendency of lung and expansion tendency of chest wall
## locator_detail
cached page index 105 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The book names both sources but nowhere apportions them. The one-third / two-thirds split carried by the concept and the article is not on this page or anywhere in this book, and no citation is offered for it.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-SURFACTANT-SOURCE-01-LOCAL
## claim_id
CLM-104-PHY-SURFACTANT-SOURCE-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Surfactant is a surface-active agent. It spreads over the surface of a fluid and greatly reduces its surface tension. It is secreted by type II alveolar cells.
## locator_type
printed_page
## locator_page
108
## locator_section
Surfactant
## locator_detail
cached page index 108 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The department book's opening definition of surfactant.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-SURFACTANT-FUNCTIONS-01-LOCAL
## claim_id
CLM-104-PHY-SURFACTANT-FUNCTIONS-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
Functions of Surfactant: 1. Facilitation of lung expansion: Surfactant reduces the surface tension and therefore, facilitates lung distension. This decreases the effort needed to expand the lungs during inspiration. 2. Prevention of alveolar collapse during expiration: ... 3. Prevention of pulmonary edema: The surface tension force favors filtration of fluid from blood into alveoli.
## locator_type
printed_page
## locator_page
108
## locator_section
Functions of Surfactant
## locator_detail
cached page index 108 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The three numbered headings are on this one page, with the Laplace explanation of the second between them; the elision marks where that explanation was cut.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-ODC-P50-01-LOCAL
## claim_id
CLM-104-PHY-ODC-P50-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
P50 is the PO2 at which hemoglobin is 50% saturated with oxygen. ... • The normal P50 for human blood is 27 mmHg. • Hemoglobin with a greater O2 affinity will have a dissociation curve with a lower P50 (shift to the left).
## locator_type
printed_page
## locator_page
129
## locator_section
Shift of the Hemoglobin-Oxygen Dissociation Curve
## locator_detail
cached page index 129 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The definition, the normal value and the direction of the shift, from one page. The elision cuts a sentence about locating the point on the curve.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-ODC-LEFT-SHIFT-01-CHEM
## claim_id
CLM-104-PHY-ODC-LEFT-SHIFT-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
1- Effect of decrease of temperature, PCO2, 2,3-DPG and increase of pH: A decrease in temperature, PCO2 and 2,3-DPG and an increase in pH shift the curve to the left. It means that, at a given PO2, there is more O2 bound to hemoglobin (increased affinity of hemoglobin to O2).
## locator_type
printed_page
## locator_page
130
## locator_section
Factors that shift the curve to the left — 1
## locator_detail
cached page index 130 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The four chemical factors and what a left shift means.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-ODC-LEFT-SHIFT-01-CO
## claim_id
CLM-104-PHY-ODC-LEFT-SHIFT-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
2- Effect of CO (carbon monoxide) on O2 dissociation curve: CO combines with hemoglobin to form carboxyhemoglobin (CO-Hb) and causes shift of the O2 dissociation curve to the left.
## locator_type
printed_page
## locator_page
130
## locator_section
Factors that shift the curve to the left — 2
## locator_detail
cached page index 130 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The fifth factor.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-PHY-ODC-LEFT-SHIFT-01-HBF
## claim_id
CLM-104-PHY-ODC-LEFT-SHIFT-01
## resource_id
src_a11a7faed67c95e2d636
## evidence_role
local_curriculum
## support_span
3- Fetal hemoglobin: ... Fetal Hb contains a pair of alpha and a pair of gamma polypeptide chains. The gamma polypeptide chains cannot combine with 2,3-DPG. This increases the affinity of Hb to O2 and thus shifts the curve to the left.
## locator_type
printed_page
## locator_page
130
## locator_section
Factors that shift the curve to the left — 3
## locator_detail
cached page index 130 of scripts/kasr/extract/pagetext/src_a11a7faed67c95e2d636.json
## context_note
The sixth factor. The elision cuts the parallel sentence about adult haemoglobin's beta chains.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01-LOCAL
## claim_id
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
There are 11 posterior intercostal veins and a subcostal vein on each side. However, they have different termination on the right and left sides: On the right side: i. The 1st vein ends in the right brachiocephalic (innominate) vein. ii. The 2nd, 3rd and 4th veins unite to form the right superior intercostal vein which ends in the arch of the azygos vein. iii. The remaining posterior intercostal veins (from 5 th to 11th) and the subcostal vein open separately into the azygos vein.
## locator_type
printed_page
## locator_page
16
## locator_section
b- Posterior intercostal and subcostal veins — On the right side
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
Printed page 16 is page index 15 of the cached extraction; the offset for this book is printed = index + 1 throughout.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01-LOCAL
## claim_id
CLM-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
On the left side: i. The 1st vein ends in the left brachiocephalic vein. ii. The 2nd, 3rd and 4th veins unite to form the left superior intercostal vein which ends also in the left brachiocephalic vein. iii. The 5th, 6th, 7th and 8th veins open in the superior hemiazygos vein which begins as a continuation of the 5th vein and ends in the azygos vein. th th th iv. The 9 , 10 and 11 posterior intercostal veins and the subcostal vein open into the inferior hemiazygos vein which begins in variable ways and ends also in the azygos vein.
## locator_type
printed_page
## locator_page
16
## locator_section
b- Posterior intercostal and subcostal veins — On the left side
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The extraction renders the ordinal superscripts of "9th, 10th and 11th" on a separate line in the source; the words are otherwise as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-PLEURA-NERVE-SUPPLY-01-LOCAL
## claim_id
CLM-104-ANA-PLEURA-NERVE-SUPPLY-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
A- The visceral (pulmonary) pleura: It is supplied by the same autonomic innervation of the lung via the anterior and posterior pulmonary plexuses. It is not sensitive to somatic stimuli such as pain and temperature. B- The parietal pleura: It is supplied by the same somatic innervation of the thoracic wall, mediastinum and diaphragm, according to the part of pleura: a- Cervical pleura: by the 1st intercostal nerve. b- Costal pleura, segmentally by the corresponding intercostal nerve. c- Mediastinal and central part of diaphragmatic pleura: by phrenic nerve. d- Peripheral part of diaphragmatic pleura: by lower intercostal nerves.
## locator_type
printed_page
## locator_page
24
## locator_section
Nerve Supply of the Pleura
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The book states the insensitivity of the visceral layer explicitly; it does not state in the same place that the parietal layer is pain-sensitive, which is inferred from its somatic supply.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-CIRCUMFLEX-ORIGIN-END-01-LOCAL
## claim_id
CLM-104-ANA-CIRCUMFLEX-ORIGIN-END-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
2- Circumflex artery: Arises at the upper end of the anterior interventricular groove as one of the 2 terminal branches of the left coronary artery. It passes to the left in the anterior part of the coronary sulcus, then turns around the left border of the heart to run in the posterior part of the coronary sulcus where it ends by anastomosing with the right coronary artery.
## locator_type
printed_page
## locator_page
86
## locator_section
Left coronary artery — Branches — 2- Circumflex artery
## locator_detail
cached page index 85 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
Origin, course and end, as the department book prints them.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-CIRCUMFLEX-BRANCHES-01-LOCAL
## claim_id
CLM-104-ANA-CIRCUMFLEX-BRANCHES-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
It gives the following small branches: a- left marginal artery: descends along the left aspect of the heart supplying the left ventricle down to the apex. b- branches to the left atrium. c- branches to the left ventricle: run on its anterior and diaphragmatic surfaces. d- artery to S-A node, in 40% of people. e- artery to A-V node, in 20% of people, especially the left bundle branch.
## locator_type
printed_page
## locator_page
86
## locator_section
Left coronary artery — Circumflex artery — branches
## locator_detail
cached page index 85 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The book's lettered list. It does not say "five"; the count is the list's length.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL
## claim_id
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
Posterior Mediastinum (Fig. 23) Boundaries: In front: pericardium (above) and diaphragm (below). Behind: lower 8 thoracic vertebrae (from T5 to T12).
## locator_type
printed_page
## locator_page
53
## locator_section
Posterior Mediastinum — Boundaries
## locator_detail
cached page index 52 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The department book's boundaries, quoted whole.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01-LOCAL
## claim_id
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
Contents: 1- Arteries: descending thoracic aorta and its branches. 2- Veins: azygos and hemiazygos venous system. 3- Nerves: 2 vagi (forming esophageal plexuses) and sympathetic trunks and their splanchnic branches. 4- Tubes: esophagus and thoracic duct along its right side. 5- Lymph nodes: posterior mediastinal lymph nodes.
## locator_type
printed_page
## locator_page
53
## locator_section
Posterior Mediastinum — Contents
## locator_detail
cached page index 52 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The numbered list of five, as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-AORTIC-SAC-FATE-01-LOCAL
## claim_id
CLM-104-ANA-AORTIC-SAC-FATE-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
Fate of aortic sac 1. The right horn: It forms the brachiocephalic artery which is continuous with the right common carotid artery (from the 3rd aortic arch) and right subclavian artery (from the 4th aortic arch). 2. The stem and the left horn: They form the proximal part of arch of aorta.
## locator_type
printed_page
## locator_page
153
## locator_section
Fate of aortic sac
## locator_detail
cached page index 152 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The department book's two-part fate, quoted whole.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-ANEURYSM
## claim_id
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
2- Aortic aneurysm: a localized dilatation of aorta which may compress the contents of superior mediastinum causing mediastinal syndrome. Rupture of weakened wall of aortic aneurysm causes severe haemorrhage which is often fatal if surgical intervention is not prompt.
## locator_type
printed_page
## locator_page
99
## locator_section
Clinically Important Points — 2- Aortic aneurysm
## locator_detail
cached page index 98 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The second sentence names an emergency intervention. No claim here asserts it: the claim stops at the compression syndrome, which is why this record is clinical_non_treatment and not treatment_or_action. A claim about prompt surgery would need two independent sources under LD-08 and has none.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-SYNDROME
## claim_id
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01
## resource_id
src_4bd55e9eaf092282818c
## evidence_role
local_curriculum
## support_span
Mediastinal syndrome: it is a clinical condition caused by compression of the contents of the superior mediastinum by a space-occupying lesion e.g. tumours, enlarged lymph nodes or retrosternal thyroid gland. Its manifestations depend on the structure(s) compressed; these may be: a- Vessels: compression of veins or arteries leads to venous congestion or ischaemia of the upper limb and head and neck. b- Tubes: compression of trachea or esophagus leads to dyspnea or dysphagia, respectively c- Nerves: compression of the left recurrent laryngeal nerve leads to hoarseness of voice.
## locator_type
printed_page
## locator_page
53
## locator_section
Clinically Important points — Mediastinal syndrome
## locator_detail
cached page index 52 of scripts/kasr/extract/pagetext/src_4bd55e9eaf092282818c.json
## context_note
The syndrome is defined 46 printed pages before the aneurysm that causes it; both pages are needed to support the claim as written.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-TONSIL-PALATINE-LINGUAL-01-LOCAL
## claim_id
CLM-104-HIS-TONSIL-PALATINE-LINGUAL-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
1- The free surface is covered by non-keratinized stratified squamous epithelium which dips down into lymphatic tissue forming invaginations called tonsillar crypts. ... II- Lingual Tonsils: • Multiple masses of lymphoid tissue at the base (back) of the tongue. • They are covered with non-keratinized stratified squamous epithelium which dips down to form crypts.
## locator_type
printed_page
## locator_page
21
## locator_section
Tonsils — Histological Structure of palatine tonsil; II- Lingual Tonsils
## locator_detail
cached page index 21 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The palatine entry and the lingual entry from one page. Neither gives a crypt count for the lingual tonsil.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-WHITE-PULP-ZONES-01-LOCAL
## claim_id
CLM-104-HIS-WHITE-PULP-ZONES-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
❖ Each pulp contains an arteriole at one side called central arteriole, although eccentric. It is also called follicular arteriole. ❖ Each pulp is formed of reticular c.t. on which cells are concentrically arranged around the central arteriole into 4 zones from inside outwards: a- Thymus dependent zone (Periarteriolar Lymphatic Sheath, PALS): contain T-lymphocytes which ensheath the arteriole. b- Germinal center: pale stained central area. ... c- Follicular zone: darkly stained area around germinal centre. ... d- Marginal zone: Forms the periphery of white pulp.
## locator_type
printed_page
## locator_page
18
## locator_section
1- White pulp (Malpighian corpuscles)
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The four zones with their order. The elisions cut the cell lists under b, c and d, which the claim does not assert.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-CELL-RENEWAL-TYPES-01-LOCAL
## claim_id
CLM-104-HIS-CELL-RENEWAL-TYPES-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
1- Non-renewing cells: Highly specialized cells leave cycle while in Gl forever and go to GO, they never divide again (permanent exit). If these cells are lost they are not replaced with new cell, e.g. heart muscles and nerve cells. 2- Potentially renewable cells: Some specialized cells go to GO, but can return to continue the cycle (transient exit) on need for replacement, e.g. liver cells (if destroyed or partially removed). 3- Continuously renewing cells: Some highly specialized cells are end cells that cannot divide, but can be replaced from stem cells, e.g. blood cells and sperms.
## locator_type
printed_page
## locator_page
39
## locator_section
Cell Renewal
## locator_detail
cached page index 39 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The three numbered types with the book's examples. The extraction renders G1 and G0 as "Gl" and "GO" — an OCR-style confusion of the digit for a letter in an otherwise native text layer — and the words are quoted as they appear.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-ANEUPLOIDY-DEFINITION-01-LOCAL
## claim_id
CLM-104-HIS-ANEUPLOIDY-DEFINITION-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
b) Aneuploidy (abnormal ploidy): • The abnormality is not the exact multiple of the haploid number. • Karyotype shows the addition or loss of one chromosome. • Types of aneuploidy: - Trisomy: means the addition of an extra chromosome, so the karyotype is (2n + 1). ... - Monosomy: means missing of one chromosome, so karyotype is (2n-1).
## locator_type
printed_page
## locator_page
47
## locator_section
I. Numerical Aberrations — b) Aneuploidy
## locator_detail
cached page index 47 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The definition and its two types. The elision cuts the Down syndrome example between them.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-ANEUPLOIDY-CAUSES-01-NONDISJ
## claim_id
CLM-104-HIS-ANEUPLOIDY-CAUSES-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
• Causes of aneuploidy: 1- Non-disjunction: Primary non-disjunction: when the two homologous (bivalent) chromosomes fail to separate during the first meiotic division. This results in four abnormal daughter cells. Secondary non-disjunction: It is the failure of the two chromatids to separate at the centromere either during the second meiotic division or during mitosis.
## locator_type
printed_page
## locator_page
47
## locator_section
Causes of aneuploidy — 1- Non-disjunction
## locator_detail
cached page index 47 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The first cause, with the two forms distinguished.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-ANEUPLOIDY-CAUSES-01-OTHER
## claim_id
CLM-104-HIS-ANEUPLOIDY-CAUSES-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
2- Failure of duplication: one chromatid (s-chromosome) fails to duplicate during the S-stage. 3- Simple loss: due to failure of a chromosome to align during metaphase or lagging to move in anaphase.
## locator_type
printed_page
## locator_page
48
## locator_section
Causes of aneuploidy — 2 and 3
## locator_detail
cached page index 48 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The second and third causes, which run over onto the next printed page.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-CAPILLARY-CONTINUOUS-01-LOCAL
## claim_id
CLM-104-HIS-CAPILLARY-CONTINUOUS-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Diameter Small & regular Small & regular Large & irregular Continuous Has pores covered Has pores without Endothelium (no pores) by diaphragms diaphragms Tight junction Present Present Has wide inter- between cellular spaces endothelial cells Basal lamina Continuous Continuous Non- continuous Pericytes Present Present Absent Macrophages Absent Absent Present.
## locator_type
printed_page
## locator_page
11
## locator_section
Types of blood capillaries — comparison table, column 1
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
This is a three-column comparison table, and the text layer interleaves the row label with the cells rather than reading across. The columns are, in order, continuous (somatic), fenestrated (visceral), sinusoidal. It is quoted exactly as extracted rather than untangled, so the reader can see what the page actually contains: the first value on each row is the continuous capillary, which is this claim.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-CAPILLARY-SINUSOID-01-LOCAL
## claim_id
CLM-104-HIS-CAPILLARY-SINUSOID-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Diameter Small & regular Small & regular Large & irregular Continuous Has pores covered Has pores without Endothelium (no pores) by diaphragms diaphragms Tight junction Present Present Has wide inter- between cellular spaces endothelial cells Basal lamina Continuous Continuous Non- continuous Pericytes Present Present Absent Macrophages Absent Absent Present.
## locator_type
printed_page
## locator_page
11
## locator_section
Types of blood capillaries — comparison table, column 3
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The same three-column table, quoted exactly as extracted. The third value on each row is the sinusoidal capillary, which is this claim: large & irregular, pores without diaphragms, wide inter-cellular spaces, non-continuous basal lamina, no pericytes, macrophages present.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-OLFACTORY-EPITHELIUM-01-LOCAL
## claim_id
CLM-104-HIS-OLFACTORY-EPITHELIUM-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
• It covers the roof and the superior conchae of the nasal cavities. • Formed of olfactory mucosa: Olfactory epithelium & C.T. lamina propria. A- Olfactory epithelium: • It is the neuro-epithelium responsible for smell sensation. • It is much thicker than the respiratory epithelium. • It is a modified pseudostratified columnar ciliated epithelium with NO goblet cells,
## locator_type
printed_page
## locator_page
28
## locator_section
OLFACTORY AREA — A- Olfactory epithelium
## locator_detail
cached page index 28 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The book's bullets, including its trailing comma. The cilia description is on the same page under the olfactory neurons: "These cilia are few, very long, non-motile to increase surface area for odorous substances".
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-OLFACTORY-BASEMENT-MEMBRANE-01-LOCAL
## claim_id
CLM-104-HIS-OLFACTORY-BASEMENT-MEMBRANE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
1. Epithelial thickness Thicker Thinner 2. Goblet cells Absent Present olfactory cells have few 3. Cilia Has numerous true cilia long non motile cilia 4. Basement Thin Thick membrane 5. Bowman’s glands Present Absent 6. Pigment In sustentacular cells Absent
## locator_type
printed_page
## locator_page
30
## locator_section
Differences between Respiratory & Olfactory Mucosa
## locator_detail
cached page index 30 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
A two-column table, quoted exactly as the text layer renders it, wrapped cells and all. The first value on each row is olfactory mucosa and the second respiratory: thicker on a thin basement membrane, no goblet cells, few long non-motile cilia, Bowman’s glands present, pigment in the sustentacular cells.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-LYMPH-NODE-ARCHITECTURE-01-SHAPE
## claim_id
CLM-104-HIS-LYMPH-NODE-ARCHITECTURE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
➢ Shape: bean or kidney shaped encapsulated lymphatic organs along lymphatic vessels. Have a convex surface which receives lymph from afferent lymphatics and a concave surface (hilum), where arteries enter the node and veins and efferent lymphatics leave.
## locator_type
printed_page
## locator_page
14
## locator_section
Lymph Node — Shape
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Shape and the two surfaces.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-LYMPH-NODE-ARCHITECTURE-01-STROMA
## claim_id
CLM-104-HIS-LYMPH-NODE-ARCHITECTURE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
1. Capsule: formed of dense irregular fibrous C.T. and elastic fibers. It is thin, contains smooth muscles at the thickened hilum & covered with adipose tissue. Afferent lymphatic vessels pierce the convex surface of capsule. 2. C.T. septa or trabeculae: formed of C.T. cells & fibers, extend from deep surface of capsule, dividing the cortex into regular compartments. They branch in the medulla to divide it into irregular compartments.
## locator_type
printed_page
## locator_page
15
## locator_section
A- Stroma
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Capsule and trabeculae, which is what a slide is read from.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-SECONDARY-FOLLICLE-01-LOCAL
## claim_id
CLM-104-HIS-SECONDARY-FOLLICLE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Primary lymphatic nodules (follicles): formed of aggregated cells mainly B-lymphocytes and few T-lymphocytes. On exposure to antigen or infection, some of small B-lymphocytes are transformed to large activated lymphocytes, which aggregate in center of nodules to form the germinal center which change primary nodules into secondary nodules. Secondary lymphatic nodules (follicles): have peripheral dark, regions of small lymphocytes, and a pale region in the center, the germinal center, which contains large activated B lymphocytes and plasma cells (with pale nuclei).
## locator_type
printed_page
## locator_page
15
## locator_section
Cortex — a- Lymphatic Nodules (Follicles)
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The transformation and what the secondary nodule looks like on a slide.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-PARACORTEX-01-LOCAL
## claim_id
CLM-104-HIS-PARACORTEX-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
The paracortex (the thymus dependant zone): The area present between the cortex and medulla, it contains T-lymphocytes which have migrated from thymus through post capillary venules. These venules are lined with simple cubical epithelium (has receptors for the homing of T- lymphocytes).
## locator_type
printed_page
## locator_page
15
## locator_section
The paracortex (the thymus dependant zone)
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
"simple cubical epithelium" is the book's wording and is quoted as printed; a vessel is lined by endothelium, not epithelium.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-LYMPH-NODE-MEDULLA-01-LOCAL
## claim_id
CLM-104-HIS-LYMPH-NODE-MEDULLA-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
a- Medullary cords: ➢ They are irregular branching cords of aggregated cells. ➢ They include B-lymphocytes, plasma cells and macrophages. ➢ They may be continuous with the cortical follicles. b- Medullary sinuses: ➢ The spaces between the medullary cords and trabeculae. ➢ They are lined with endothelium and macrophages. ➢ They filter the lymph received from cortical sinuses by macrophages.
## locator_type
printed_page
## locator_page
16
## locator_section
Medulla — a- Medullary cords; b- Medullary sinuses
## locator_detail
cached page index 16 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Both components of the medulla, quoted whole.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-NODE-VS-SPLEEN-01-LOCAL
## claim_id
CLM-104-HIS-NODE-VS-SPLEEN-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Cortex & medulla White pulp & red pulp • White pulp: consists of: • Cortex: consists of: Irregularly arranged Malpighian Regularly arranged, corpuscles, Lymph follicles & lymph sinuses. No lymph sinuses. Parenchyma Lymph follicles have clear germinal Malpighian corpuscles have centers, no central arterioles. central arterioles.
## locator_type
printed_page
## locator_page
20
## locator_section
Differences between lymph node & spleen — Parenchyma
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
A two-column comparison table, quoted exactly as extracted; the text layer interleaves the two columns line by line, so "Regularly arranged, Lymph follicles & lymph sinuses" and "no central arterioles" are the lymph node, and "Irregularly arranged Malpighian corpuscles, No lymph sinuses" and "central arterioles" are the spleen. It is left tangled rather than untangled so the quote stays a quote.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-SPLEEN-STROMA-01-LOCAL
## claim_id
CLM-104-HIS-SPLEEN-STROMA-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
1- Capsule: - Thick especially at the hilum where blood vessels & nerves enter and veins & lymphatics leave. - Formed of dense C.T. (collagen fibers & fibrocytes) rich in smooth muscles and elastic fibers. - Covered by peritoneum . 2- Trabeculae: -formed of C.T. cells & fibers rich in elastic fibers & smooth muscle. - Long & thick, radiate mainly from the hilum, and few short irregular ones extend from the capsule. ... ❖ Parenchyma: cut sections of fresh spleen show that it is organized into white rounded scattered spots (white pulp) & red background (red pulp).
## locator_type
printed_page
## locator_page
17
## locator_section
Spleen — Stroma and Parenchyma
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Capsule, trabeculae and the naked-eye appearance of the parenchyma, from one page.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-RED-PULP-01-LOCAL
## claim_id
CLM-104-HIS-RED-PULP-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
2- Red pulp: It appears red in fresh sections due to large number of RBCs. It is formed of: a- Splenic cords (Billroth cords): present between white pulps and blood sinusoids infiltrated with blood cells and lymphoid cells ... b- Blood sinusoids: barrel shaped irregular wide blood channel lined with fenestrated elongated endothelium called stave cells with large inter-cellular spaces & noncontinuous basal lamina. This arrangement facilitates passage of blood from splenic cords to blood stream. Macrophages (Littoral cells) are present in and around the walls of blood sinusoids.
## locator_type
printed_page
## locator_page
18
## locator_section
2- Red pulp
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Both components. The elision cuts the cell list inside the splenic cords.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-SPLENIC-CIRCULATION-THEORIES-01-LOCAL
## claim_id
CLM-104-HIS-SPLENIC-CIRCULATION-THEORIES-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Theories of Splenic Circulation: Connection between arteries and veins 1- Open theory: It stated that capillaries open, and deliver blood directly into the tissue of the red pulp. Blood is collected by passing through openings in wall of blood sinusoids. 2- Closed theory: It stated that capillaries open directly into the blood sinusoids. 3- Open and closed theory: It stated that when the spleen contracts, the circulation is closed & when relaxes, the circulation is open.
## locator_type
printed_page
## locator_page
19
## locator_section
Theories of Splenic Circulation
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
All three theories from one page. The book numbers open first; the article states closed first, which is a presentation choice and not a disagreement.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-PALATINE-TONSIL-STRUCTURE-01-LOCAL
## claim_id
CLM-104-HIS-PALATINE-TONSIL-STRUCTURE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Histological Structure of palatine tonsil: Embedded in C.T. under the mucous membrane, it is formed of: 1- The free surface is covered by non-keratinized stratified squamous epithelium which dips down into lymphatic tissue forming invaginations called tonsillar crypts. ... 2- Lymphatic tissue is formed of: - Lymphatic nodules with or without germinal center, arranged around crypts. - Diffuse lymphatic tissue includes lymphocytes, plasma cells & macrophage. 3- Deeper to the lymphatic tissue, there is dense C.T. forming an incomplete capsule, separating it from adjacent structures. 4- Mucous glands are present in the C.T., their ducts open on the surface and not in the base of tonsillar crypts, so inflammation of crypts is common.
## locator_type
printed_page
## locator_page
21
## locator_section
Histological Structure of palatine tonsil
## locator_detail
cached page index 21 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The four numbered components. The elision cuts the sentence about what accumulates in the crypts.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-TONSIL-CAPSULE-01-CLASS
## claim_id
CLM-104-HIS-TONSIL-CAPSULE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Tonsils ➢ Definition: aggregation of lymphatic tissue, incompletely encapsulated. ➢ Types: Palatine - Lingual - Pharyngeal.
## locator_type
printed_page
## locator_page
20
## locator_section
Tonsils — Definition
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The class definition, quoted whole.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-TONSIL-CAPSULE-01-LINGUAL
## claim_id
CLM-104-HIS-TONSIL-CAPSULE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
• It has No C.T. capsule.
## locator_type
printed_page
## locator_page
21
## locator_section
II- Lingual Tonsils
## locator_detail
cached page index 21 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The entry that conflicts with the class definition, on the facing page. Quoted as printed, capital N and all.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-PHARYNGEAL-TONSIL-01-LOCAL
## claim_id
CLM-104-HIS-PHARYNGEAL-TONSIL-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
III- Pharyngeal Tonsil: • It is a single mass of lymphoid tissue under the mucous membrane of the nasopharynx, at the midline. • It has a folded epithelium (pseudostratified columnar ciliated epithelium with goblet cells). • There are no crypts. • It has an incomplete C.T. capsule . • N.B. Hypertrophy of pharyngeal tonsil results in adenoids.
## locator_type
printed_page
## locator_page
22
## locator_section
III- Pharyngeal Tonsil
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The whole entry, including the adenoid note.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-TONSIL-FUNCTION-01-LOCAL
## claim_id
CLM-104-HIS-TONSIL-FUNCTION-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
➢ Functions of Tonsils: protection of digestive and respiratory systems against any invader as bacteria, viruses ...etc., by production of antibodies.
## locator_type
printed_page
## locator_page
22
## locator_section
Functions of Tonsils
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The book's whole statement of tonsillar function. It does not say anywhere that the crypts enlarge the sampled surface area, so no claim asserts that.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-THYMUS-LOBULATION-01-STROMA
## claim_id
CLM-104-HIS-THYMUS-LOBULATION-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
➢ Structure: it is a single bilobed structure, formed of: A. Stroma: Thymus is surrounded by thin C.T. capsule, which sends incomplete thin trabeculae that incompletely subdivide the lobes into large number of lobules. A reticular network forms the background. B. Parenchyma: The incomplete thymic lobules are made of cortex & medulla. 1- Cortex: The outer zone of each lobule It’s darker in staining than the medulla as it is more populated with lymphocytes.
## locator_type
printed_page
## locator_page
22
## locator_section
Thymus — Structure
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Incomplete lobulation and the darker cortex, from one page. The sentence "The outer zone of each lobule It's darker in staining" is missing a full stop in the source and is quoted as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-THYMUS-LOBULATION-01-MEDULLA
## claim_id
CLM-104-HIS-THYMUS-LOBULATION-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
2- Medulla: The medulla of each lobule is continuous with that of the adjacent lobule. It stains lighter than the cortex as it is has less abundant lymphocytes, and more epithelial reticular cells.
## locator_type
printed_page
## locator_page
23
## locator_section
Thymus — 2- Medulla
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The continuity of the medulla between lobules, which is the feature that identifies a thymus slide.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-HASSALL-CORPUSCLE-01-LOCAL
## claim_id
CLM-104-HIS-HASSALL-CORPUSCLE-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Hassall's corpuscle: Small rounded structure found in medulla. Their numbers increase with age. They are formed of central acidophilic masses of degenerating reticular cells surrounded with concentric layers of epithelial reticular cells.
## locator_type
printed_page
## locator_page
23
## locator_section
Hassall's corpuscle
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The whole entry. The acidophilia is stated a line above, where the medulla is said to contain "acidophilic structures called Hassall's corpuscles".
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01-ORIGIN
## claim_id
CLM-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
1- Epithelial reticular cells (thymic epithelial cells): • Origin: They are derived from endoderm. • LM & EM: Branched cells with large oval pale nuclei with prominent nucleoli and their cytoplasm contains secretory granules. Their long processes contain cytokeratin filaments, connected together by desmosomes and tight junctions, to form a reticulum on which other cells are superimposed.
## locator_type
printed_page
## locator_page
23
## locator_section
1- Epithelial reticular cells (thymic epithelial cells)
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Origin and the cellular reticulum.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01-NOFIBRE
## claim_id
CLM-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Reticular cells are endodermal (not mesodermal), do not produce reticular fiber.
## locator_type
printed_page
## locator_page
24
## locator_section
Special Features of the Thymus
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The absence of reticular fibres, which the book states only in the special-features list.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-THYMUS-ABSENCES-01-LOCAL
## claim_id
CLM-104-HIS-THYMUS-ABSENCES-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
Special Features of the Thymus: Reticular cells are endodermal (not mesodermal), do not produce reticular fiber. It contains Hassall’s corpuscles. It has no lymphoid nodules, no B-lymphocytes, no plasma cells, and no afferent lymph vessels (to protect thymocytes from circulating antigens). It undergoes involution at the time of puberty.
## locator_type
printed_page
## locator_page
24
## locator_section
Special Features of the Thymus
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
The special-features list, quoted whole, including the parenthesis that gives the reason for the last absence.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-104-HIS-BLOOD-THYMIC-BARRIER-01-LOCAL
## claim_id
CLM-104-HIS-BLOOD-THYMIC-BARRIER-01
## resource_id
src_18d3a953df4ca83c4e74
## evidence_role
local_curriculum
## support_span
The Blood Thymic Barrier: • Wall that separates developing T-lymphocytes from antigens in circulating blood. • Present only in the cortex of the thymus (not in medulla). • It is formed of: 1- A continuous type of capillary endothelial cells, are connected with tight junctions. 2- A thick continuous basal lamina of the capillary. 3- A perivascular tissue around capillaries has macrophages to phagocytose any antigen escaping through endothelium. 4- A complete layer of epithelial reticular cells with tight junctions inbetween.
## locator_type
printed_page
## locator_page
24
## locator_section
The Blood Thymic Barrier
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json
## context_note
Definition, site and all four layers, from one page.
## confidence
0.9
## counts_as_claim_evidence
no
