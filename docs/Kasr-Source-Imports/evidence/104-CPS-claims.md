<!--
  Atomic claims for 104 CPS — the evidence pass the four audit findings were waiting on.

  One claim per assertion, each pointing at a concept that already exists in
  ../concept/104-CPS-concepts.md or ../concept/104-CPS-practical-concepts.md.
  No concept ID is derived here; every one is copied from the committed batch.

  Sources are the three department books, read from the committed page-text cache
  at scripts/kasr/extract/pagetext/. No extractor was re-run:
    physiology  src_a11a7faed67c95e2d636   printed page = page index
    anatomy     src_4bd55e9eaf092282818c   printed page = page index + 1
    histology   src_18d3a953df4ca83c4e74   printed page = page index

  Why almost nothing here is 'verified'. A department book establishes what this
  faculty teaches. It does not establish that a fact is true, and the programme's
  source hierarchy wants a current authoritative source for medical correctness.
  This pass has none: every citation is local_curriculum and every one is marked
  counts_as_claim_evidence: no, so reconcileClaimEvidence leaves these claims at
  needs_evidence rather than promoting them off a single university textbook.
  That is the honest state, and it is what these records should say until an
  independent source is attached.

  Two claims are 'conflicted' rather than 'needs_evidence', because the
  department book disagrees with itself on the page and the disagreement is
  carried rather than resolved:
    CLM-104-PHY-AP-PHASE2-01   'Efflux of Ca++' printed under 'Inward positive current'
    CLM-104-HIS-TONSIL-CAPSULE-01  tonsils 'incompletely encapsulated' on p20, lingual
                                   'No C.T. capsule' on p21

  One claim is clinical_non_treatment rather than foundational_stable:
    CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01. Everything else in this
  module is structure and function. Nothing here is treatment_or_action; the one
  page that names an intervention is quoted but not claimed from.

  Import: Evidence > Import, after ./104-CPS-resources.md has landed.
-->

# Item
## id
CLM-104-PHY-AP-PHASE1-01
## concept_id
CON-CVS-818EC10C20A623
## subject
Phase 1 of the cardiac myocyte action potential
## predicate
is produced by
## object
efflux of potassium through transient outward potassium channels, influx of chloride, and inactivation of the fast sodium channels
## display_text
Phase 1 of the cardiac myocyte action potential is a rapid small initial repolarization produced by potassium efflux through transient outward potassium channels (Ito), chloride influx, and inactivation of the fast sodium channels.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
population: working (non-pacemaker) cardiac myocyte
state: immediately after the phase 0 upstroke

---

# Item
## id
CLM-104-PHY-AP-PHASE2-01
## concept_id
CON-CVS-818EC10C20A623
## subject
Phase 2 of the cardiac myocyte action potential
## predicate
is held near zero millivolts by
## object
a balance between a small outward potassium current through delayed rectifier channels and an inward positive current carried by L-type calcium channels and the sodium-calcium exchanger
## display_text
Phase 2 of the cardiac myocyte action potential lasts about 200 msec in a ventricular myocyte and is held near zero millivolts by a balance between two opposing currents: potassium efflux through delayed rectifier channels outward, and an inward positive current made of calcium moving through long-lasting (L-type) channels together with the sodium-calcium exchanger, which admits one net positive charge for each calcium ion it removes.
## risk_class
foundational_stable
## verification_status
conflicted
## conflict_status
The physiology department book, printed page 12, prints the L-type calcium current as "Efflux of Ca++ (ICaL)" while listing it under the heading "Inward positive current". The two cannot both be true. The claim follows the heading — calcium enters — and the book's word "efflux" is recorded here as a slip rather than corrected silently. No independent source has been consulted to settle it.
## confidence
0.7
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
duration: about 200 msec in a ventricular myocyte
state: plateau, sustained around zero mV
stoichiometry: one Ca++ out for three Na+ in, a net influx of one positive charge

---

# Item
## id
CLM-104-PHY-EJECTION-PHASES-01
## concept_id
CON-CVS-A70930DB23A5B4
## subject
Rapid and reduced ejection
## predicate
both run with
## object
the semilunar valves open, differing in the pressure gradient and in what sustains the flow
## display_text
Ventricular ejection runs in a rapid and a reduced phase, both with the semilunar valves open; in reduced ejection the pressure gradient between ventricle and artery has fallen and ejection continues on the momentum of the ejected blood.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
state: ventricular systole, semilunar valves open

---

# Item
## id
CLM-104-PHY-STROKE-VOLUME-ARITHMETIC-01
## concept_id
CON-CVS-A70930DB23A5B4
## subject
Stroke volume
## predicate
equals
## object
end-diastolic volume of about 130 ml minus end-systolic volume of about 60 ml, giving about 70 ml
## display_text
After reduced ejection about 60 ml remains in each ventricle — the end-systolic volume — and subtracting it from an end-diastolic volume of about 130 ml gives a stroke volume of about 70 ml.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
numbers: EDV 130 ml, ESV 60 ml, SV 70 ml
population: normal young adult at rest

---

# Item
## id
CLM-104-PHY-INOTROPY-ESPVR-01
## concept_id
CON-CVS-C1D705743C07E3
## subject
Increased inotropy
## predicate
shifts
## object
the end-systolic pressure-volume relation upwards and to the left, so contraction begins at the same end-diastolic volume and reaches a lower end-systolic volume
## display_text
Increased inotropy shifts the end-systolic pressure-volume relation upwards and to the left, so ventricular contraction begins at the same end-diastolic volume and reaches a lower end-systolic volume.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
state: preload held constant

---

# Item
## id
CLM-104-PHY-CARDIAC-RESERVE-01
## concept_id
CON-CVS-A99309543A270D
## subject
Heart rate reserve
## predicate
runs from
## object
a resting rate of about 75 per minute to a maximal rate of 220 minus age in years
## display_text
Maximal heart rate is estimated as 220 minus age in years, so from a normal resting rate of about 75 per minute the heart rate reserve during exercise runs from 75 to about 200 beats per minute in a young adult.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.8
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
population: normal young adult
equation: maximal heart rate = 220 - age in years

---

# Item
## id
CLM-104-PHY-STROKE-VOLUME-RESERVE-01
## concept_id
CON-CVS-A99309543A270D
## subject
Stroke volume reserve
## predicate
runs from
## object
about 70 ml at rest to about 200 ml at maximal exercise
## display_text
Stroke volume can be increased from about 70 ml in a normal young adult up to about 200 ml during maximal exercise, by raising end-diastolic volume through the Frank-Starling mechanism and by lowering end-systolic volume through positive inotropy.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.8
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
population: normal young adult
numbers: 70 ml at rest, 200 ml at maximal exercise

---

# Item
## id
CLM-104-PHY-MSFP-VALUE-01
## concept_id
CON-CVS-B21C3D54DE291E
## subject
Mean systemic filling pressure
## predicate
is
## object
the pressure present throughout the systemic circulation when the heart stops pumping, normally 6 to 8 mmHg
## display_text
Mean systemic filling pressure is the pressure present all over the systemic circulation when the heart stops pumping and flow is zero, normally between 6 and 8 mmHg, and it is the force that drives venous return.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
numbers: 6-8 mmHg
state: zero blood flow

---

# Item
## id
CLM-104-PHY-MSFP-VR-CURVE-01
## concept_id
CON-CVS-B21C3D54DE291E
## subject
An increase in mean systemic filling pressure
## predicate
produces
## object
a parallel shift of the venous return curve up and to the right
## display_text
Increasing mean systemic filling pressure shifts the venous return curve up and to the right in parallel, so that at any given right atrial pressure venous return is higher; decreasing it shifts the curve down and to the left.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
state: resistance to venous return held constant

---

# Item
## id
CLM-104-PHY-THORACIC-PUMP-01
## concept_id
CON-CVS-08B8764A5D501B
## subject
Inspiration
## predicate
increases
## object
venous return, by making intrapleural pressure more negative and lowering right atrial and caval pressure
## display_text
During inspiration intrapleural pressure falls from about -4 mmHg to about -8 mmHg; that fall is transmitted to the right atrium and the venae cavae, so the gradient moving blood from the abdominal veins back to the heart widens and venous return increases.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
numbers: intrapleural pressure -4 to -8 mmHg
state: quiet inspiration

---

# Item
## id
CLM-104-PHY-BARORECEPTOR-SITE-01
## concept_id
CON-CVS-C3E60AC7A9EDB1
## subject
The arterial baroreceptors
## predicate
report through
## object
the carotid sinus (Hering's) nerve from the glossopharyngeal and the aortic nerve from the vagus, both ending in the nucleus of the tractus solitarius
## display_text
The arterial baroreceptors are stretch receptors in the carotid sinus and the aortic arch; they report through the carotid sinus (Hering's) nerve, a branch of the glossopharyngeal, and through the aortic nerve, a branch of the vagus, and both buffer nerves end in the nucleus of the tractus solitarius.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
laterality: bilateral

---

# Item
## id
CLM-104-PHY-BAROREFLEX-OPPOSES-01
## concept_id
CON-CVS-C3E60AC7A9EDB1
## subject
The baroreceptor reflex
## predicate
opposes
## object
whichever change in arterial blood pressure caused it, through the nucleus of the tractus solitarius
## display_text
A rise in arterial pressure increases tonic baroreceptor discharge to the nucleus of the tractus solitarius, which inhibits the vasomotor area and excites the cardiac inhibitory area so that pressure falls back to normal; a fall in pressure reverses every step.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
state: from a normal mean arterial pressure of about 90 mmHg

---

# Item
## id
CLM-104-PHY-LUNG-RECOIL-SOURCES-01
## concept_id
CON-RES-1BA6BE714676EC
## subject
The inward recoil of the lung
## predicate
arises from
## object
the elasticity of its collagen and elastin fibres and the surface tension of the fluid lining the alveoli
## display_text
The lung recoils inwards from two sources — the elasticity of its collagen and elastin fibres, and the surface tension of the fluid lining the alveoli — while the chest wall springs outwards from the elasticity of its muscles, tendons and ligaments.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.8
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
state: relaxed respiratory system

---

# Item
## id
CLM-104-PHY-SURFACTANT-SOURCE-01
## concept_id
CON-RES-4D4CBF3BB8AF1E
## subject
Pulmonary surfactant
## predicate
is secreted by
## object
the type II alveolar cells, and greatly reduces the surface tension of the fluid it spreads over
## display_text
Surfactant is a surface-active agent that spreads over the surface of a fluid and greatly reduces its surface tension, and it is secreted by the type II alveolar cells.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative

---

# Item
## id
CLM-104-PHY-SURFACTANT-FUNCTIONS-01
## concept_id
CON-RES-4D4CBF3BB8AF1E
## subject
Surfactant
## predicate
has the functions of
## object
facilitating lung expansion, preventing alveolar collapse during expiration, and preventing pulmonary oedema
## display_text
Lowering alveolar surface tension gives surfactant three functions: it facilitates lung expansion, it prevents alveolar collapse during expiration, and it prevents pulmonary oedema.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: three functions

---

# Item
## id
CLM-104-PHY-ODC-P50-01
## concept_id
CON-RES-D95A9FD64ABF25
## subject
P50
## predicate
is
## object
the PO2 at which haemoglobin is 50 per cent saturated with oxygen, normally 27 mmHg
## display_text
P50 is the PO2 at which haemoglobin is 50 per cent saturated with oxygen; the normal value for human blood is 27 mmHg, and a lower P50 is a leftward shift and a higher affinity.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
numbers: 27 mmHg
population: human adult blood

---

# Item
## id
CLM-104-PHY-ODC-LEFT-SHIFT-01
## concept_id
CON-RES-D95A9FD64ABF25
## subject
The haemoglobin-oxygen dissociation curve
## predicate
is shifted to the left by
## object
a fall in temperature, PCO2 or 2,3-DPG, a rise in pH, carbon monoxide, and fetal haemoglobin
## display_text
A decrease in temperature, PCO2 or 2,3-DPG, an increase in pH, carbon monoxide, and fetal haemoglobin all shift the haemoglobin-oxygen dissociation curve to the left, so that at any given PO2 more oxygen stays bound.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: six factors

---

# Item
## id
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01
## concept_id
CON-CVS-19E63D8A8E7EDA
## subject
The posterior intercostal veins of the right side
## predicate
end in
## object
the right brachiocephalic vein, the arch of the azygos vein through the right superior intercostal vein, and the azygos vein directly
## display_text
On the right side the first posterior intercostal vein ends in the right brachiocephalic vein, the second, third and fourth unite as the right superior intercostal vein which ends in the arch of the azygos, and the fifth to eleventh with the subcostal vein open separately into the azygos vein.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
laterality: right
count: 11 posterior intercostal veins and a subcostal vein on each side

---

# Item
## id
CLM-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01
## concept_id
CON-CVS-19E63D8A8E7EDA
## subject
The posterior intercostal veins of the left side
## predicate
end in
## object
the left brachiocephalic vein directly and through the left superior intercostal vein, and the azygos vein through the superior and inferior hemiazygos veins
## display_text
On the left side the first posterior intercostal vein ends in the left brachiocephalic vein, the second to fourth unite as the left superior intercostal vein which also ends there, the fifth to eighth drain to the superior hemiazygos vein and the ninth to eleventh with the subcostal vein to the inferior hemiazygos, both of which end in the azygos vein.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
laterality: left

---

# Item
## id
CLM-104-ANA-PLEURA-NERVE-SUPPLY-01
## concept_id
CON-RES-3AB5ED388161A2
## subject
The visceral pleura
## predicate
is supplied by
## object
the autonomic innervation of the lung through the pulmonary plexuses, and is not sensitive to somatic stimuli
## display_text
The visceral pleura takes the same autonomic innervation as the lung, through the anterior and posterior pulmonary plexuses, and is not sensitive to somatic stimuli such as pain and temperature; the parietal pleura takes the somatic nerve of the part of the wall, mediastinum or diaphragm it lines.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
contrast: visceral autonomic and insensitive; parietal somatic and sensitive

---

# Item
## id
CLM-104-ANA-CIRCUMFLEX-ORIGIN-END-01
## concept_id
CON-CVS-CFF45F193765C4
## subject
The circumflex artery
## predicate
arises at
## object
the upper end of the anterior interventricular groove and ends by anastomosing with the right coronary artery in the posterior part of the coronary sulcus
## display_text
The circumflex artery is one of the two terminal branches of the left coronary artery, arising at the upper end of the anterior interventricular groove; it passes left in the anterior part of the coronary sulcus, turns the left border of the heart, and ends in the posterior part of the sulcus by anastomosing with the right coronary artery.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
laterality: left

---

# Item
## id
CLM-104-ANA-CIRCUMFLEX-BRANCHES-01
## concept_id
CON-CVS-CFF45F193765C4
## subject
The circumflex artery
## predicate
gives
## object
the left marginal artery, atrial and ventricular branches, the sinu-atrial nodal artery in 40 per cent and the atrioventricular nodal artery in 20 per cent
## display_text
The circumflex artery gives five small branches: the left marginal artery, branches to the left atrium, branches to the left ventricle, the artery to the sinu-atrial node in 40 per cent of people, and the artery to the atrioventricular node in 20 per cent.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: five branches
numbers: S-A nodal artery in 40%, A-V nodal artery in 20%

---

# Item
## id
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01
## concept_id
CON-RES-03AB23DA654BAF
## subject
The posterior mediastinum
## predicate
is bounded by
## object
the pericardium above and the diaphragm below in front, and the lower eight thoracic vertebrae T5 to T12 behind
## display_text
The posterior mediastinum lies with the pericardium above and the diaphragm below in front of it, and the lower eight thoracic vertebrae, T5 to T12, behind it.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
levels: T5 to T12

---

# Item
## id
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01
## concept_id
CON-RES-03AB23DA654BAF
## subject
The contents of the posterior mediastinum
## predicate
fall into
## object
five groups: arteries, veins, nerves, tubes and lymph nodes
## display_text
The posterior mediastinum contains five groups of structures: the descending thoracic aorta and its branches; the azygos and hemiazygos veins; the two vagi with the sympathetic trunks and their splanchnic branches; the oesophagus with the thoracic duct on its right side; and the posterior mediastinal lymph nodes.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: five groups

---

# Item
## id
CLM-104-ANA-AORTIC-SAC-FATE-01
## concept_id
CON-DEV-9A66BF99D1BD3D
## subject
The aortic sac
## predicate
gives rise to
## object
the brachiocephalic artery from its right horn, and the proximal part of the arch of the aorta from its stem and left horn
## display_text
The right horn of the aortic sac forms the brachiocephalic artery, continuous with the right common carotid from the third aortic arch and the right subclavian from the fourth; the stem and the left horn together form the proximal part of the arch of the aorta.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
stage: embryonic, pharyngeal arch period

---

# Item
## id
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01
## concept_id
CON-CVS-4F6394A2A7C0C5
## subject
An aneurysm of the arch of the aorta
## predicate
produces
## object
the mediastinal syndrome, by compressing the contents of the superior mediastinum
## display_text
An aortic aneurysm is a localized dilatation of the aorta that may compress the contents of the superior mediastinum and cause the mediastinal syndrome, whose manifestations depend on which structure is compressed: vessels give venous congestion or ischaemia, trachea or oesophagus give dyspnoea or dysphagia, and the left recurrent laryngeal nerve gives hoarseness of voice.
## risk_class
clinical_non_treatment
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.8
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: arch of the aorta, superior mediastinum

---

# Item
## id
CLM-104-HIS-TONSIL-PALATINE-LINGUAL-01
## concept_id
CON-HEM-BF004EF03BD129
## subject
The palatine and lingual tonsils
## predicate
share
## object
a non-keratinized stratified squamous covering that dips down as crypts, but differ in site
## display_text
The palatine tonsils are paired ovoid masses in the lateral wall of the oropharynx and the lingual tonsils are multiple masses at the base of the tongue; both are covered by non-keratinized stratified squamous epithelium that dips down to form crypts.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
The solved copy of the 2025 paper answers "single crypt" for the lingual tonsil. The histology department book, printed page 21, writes only that the lingual epithelium "dips down to form crypts" and gives no number, so no claim here asserts one.
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: palatine in the lateral wall of the oropharynx; lingual at the base of the tongue

---

# Item
## id
CLM-104-HIS-WHITE-PULP-ZONES-01
## concept_id
CON-HEM-7B050DE7FE2B80
## subject
Each Malpighian corpuscle of the splenic white pulp
## predicate
is arranged in
## object
four zones concentrically around the central arteriole — PALS, germinal centre, follicular zone and marginal zone
## display_text
Each Malpighian corpuscle of the splenic white pulp is reticular connective tissue whose cells are arranged concentrically around an eccentrically placed central arteriole in four zones, from inside outwards: the thymus-dependent periarteriolar lymphatic sheath, the germinal centre, the follicular zone and the marginal zone.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: four zones, from inside outwards

---

# Item
## id
CLM-104-HIS-CELL-RENEWAL-TYPES-01
## concept_id
CON-FND-A2E40256517389
## subject
Specialized cells
## predicate
are classified into
## object
non-renewing, potentially renewable, and continuously renewing types
## display_text
Specialized cells are classified by their ability to reproduce themselves into non-renewing cells, which leave the cycle in G1 for G0 permanently and are never replaced; potentially renewable cells, which go to G0 but can return; and continuously renewing cells, which are end cells replaced from stem cells.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: three types
examples: heart muscle and nerve cells; liver cells; blood cells and sperms

---

# Item
## id
CLM-104-HIS-ANEUPLOIDY-DEFINITION-01
## concept_id
CON-DEV-C2AC39B48A8F21
## subject
Aneuploidy
## predicate
is
## object
a chromosome number that is not an exact multiple of the haploid number, the karyotype showing the addition or loss of one chromosome
## display_text
Aneuploidy is a chromosome number that is not an exact multiple of the haploid number: the karyotype shows the addition of one chromosome, as in trisomy 21, or the loss of one, as in Turner syndrome with 45 chromosomes.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
karyotype: 2n + 1 for trisomy, 2n - 1 for monosomy

---

# Item
## id
CLM-104-HIS-ANEUPLOIDY-CAUSES-01
## concept_id
CON-DEV-C2AC39B48A8F21
## subject
Aneuploidy
## predicate
arises from
## object
non-disjunction, failure of duplication, or simple loss of a chromosome
## display_text
Aneuploidy arises three ways: non-disjunction, primary when the homologous chromosomes fail to separate in the first meiotic division and secondary when the chromatids fail to separate at the centromere; failure of duplication, when one chromatid does not duplicate during the S stage; and simple loss, when a chromosome fails to align at metaphase or lags in anaphase.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: three causes

---

# Item
## id
CLM-104-HIS-CAPILLARY-CONTINUOUS-01
## concept_id
CON-CVS-9585A65D9EDA4D
## subject
A continuous (somatic) capillary
## predicate
has
## object
a continuous endothelium with no pores, tight junctions, a continuous basal lamina, pericytes and no macrophages
## display_text
A continuous, somatic capillary is small and regular in calibre, its endothelium continuous with no pores, its endothelial cells joined by tight junctions, its basal lamina continuous, with pericytes present and macrophages absent.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
sites: connective tissue, bone, skin, exocrine glands

---

# Item
## id
CLM-104-HIS-CAPILLARY-SINUSOID-01
## concept_id
CON-CVS-9585A65D9EDA4D
## subject
A sinusoidal capillary (blood sinusoid)
## predicate
has
## object
pores without diaphragms, wide intercellular spaces, a non-continuous basal lamina, no pericytes and macrophages present
## display_text
A sinusoidal capillary, or blood sinusoid, is large and irregular in calibre, its endothelium carrying pores without diaphragms, its endothelial cells separated by wide intercellular spaces, its basal lamina non-continuous, with pericytes absent and macrophages present.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
sites: liver, endocrine gland, bone marrow, spleen

---

# Item
## id
CLM-104-HIS-OLFACTORY-EPITHELIUM-01
## concept_id
CON-RES-B7F9FACECA4AFF
## subject
The olfactory epithelium
## predicate
is
## object
a modified pseudostratified columnar ciliated epithelium with no goblet cells, much thicker than respiratory epithelium
## display_text
The olfactory epithelium covers the roof and the superior conchae of the nasal cavities; it is much thicker than the respiratory epithelium and is a modified pseudostratified columnar ciliated epithelium with no goblet cells, whose cilia are few, very long and non-motile.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: roof and superior conchae of the nasal cavities

---

# Item
## id
CLM-104-HIS-OLFACTORY-BASEMENT-MEMBRANE-01
## concept_id
CON-RES-B7F9FACECA4AFF
## subject
The basement membrane of olfactory mucosa
## predicate
is
## object
thin, where the respiratory one is thick
## display_text
Olfactory mucosa differs from respiratory mucosa on six counts: it is the thicker epithelium on the thinner basement membrane, it has no goblet cells, its cilia are few, long and non-motile rather than numerous and true, it has Bowman's glands, and it carries pigment in its sustentacular cells.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: six points of difference

---

# Item
## id
CLM-104-HIS-LYMPH-NODE-ARCHITECTURE-01
## concept_id
CON-HEM-D2143156B30A8A
## subject
A lymph node
## predicate
is
## object
a bean- or kidney-shaped encapsulated organ with a thin capsule, trabeculae from its deep surface, a cortex, a paracortex and a medulla
## display_text
A lymph node is a bean- or kidney-shaped encapsulated lymphatic organ lying along the course of lymphatic vessels, with a convex surface receiving afferent lymphatics and a concave hilum; its thin capsule of dense irregular fibrous connective tissue sends septa from its deep surface that divide the cortex into regular compartments and branch in the medulla into irregular ones.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
size: small bean to almond

---

# Item
## id
CLM-104-HIS-SECONDARY-FOLLICLE-01
## concept_id
CON-HEM-A76AED7046089F
## subject
A germinal centre of large activated B lymphocytes
## predicate
converts
## object
a primary lymphatic nodule into a secondary one
## display_text
A primary lymphatic nodule is an aggregate of mainly B lymphocytes with few T cells; on exposure to antigen some small B lymphocytes transform into large activated lymphocytes that aggregate centrally as a germinal centre, and that is what makes the nodule secondary.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
state: after antigen exposure

---

# Item
## id
CLM-104-HIS-PARACORTEX-01
## concept_id
CON-HEM-748293D5DA5D92
## subject
The paracortex of a lymph node
## predicate
is
## object
the thymus-dependent zone, whose T lymphocytes enter from the blood through cubical-lined post-capillary venules
## display_text
The paracortex lies between the cortex and the medulla of a lymph node and is the thymus-dependent zone: it holds T lymphocytes that migrated from the thymus and entered through post-capillary venules whose cubical lining carries receptors for the homing of T lymphocytes.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
The department book, printed page 15, calls the lining of the post-capillary venule "simple cubical epithelium". The lining of a vessel is endothelium; the cubical shape and the homing receptors are both correct, and the word "epithelium" is a slip. The claim says "cubical lining" for that reason, and the book's wording is quoted rather than corrected.
## confidence
0.85
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: between cortex and medulla

---

# Item
## id
CLM-104-HIS-LYMPH-NODE-MEDULLA-01
## concept_id
CON-HEM-E3D03CE92F1D92
## subject
The medulla of a lymph node
## predicate
is formed of
## object
medullary cords of B lymphocytes, plasma cells and macrophages, and medullary sinuses lined with endothelium and macrophages
## display_text
The medulla of a lymph node is medullary cords — irregular branching cords of B lymphocytes, plasma cells and macrophages — and medullary sinuses between those cords and the trabeculae, lined with endothelium and macrophages that filter the lymph received from the cortical sinuses.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative

---

# Item
## id
CLM-104-HIS-NODE-VS-SPLEEN-01
## concept_id
CON-HEM-087A20D42875CE
## subject
The presence of lymph sinuses without a central arteriole
## predicate
distinguishes
## object
a lymph node from a spleen, in which the Malpighian corpuscles have central arterioles and there are no lymph sinuses
## display_text
A lymph node has regularly arranged lymph follicles with clear germinal centres, no central arterioles and lymph sinuses between them; a spleen has irregularly arranged Malpighian corpuscles with central arterioles and no lymph sinuses at all.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
use: the discriminator for an unlabelled slide

---

# Item
## id
CLM-104-HIS-SPLEEN-STROMA-01
## concept_id
CON-HEM-2F3CB0082551D1
## subject
The spleen
## predicate
has
## object
a thick capsule rich in smooth muscle, long thick trabeculae radiating mainly from the hilum, and white pulp scattered in red pulp
## display_text
The spleen has a thick capsule of dense connective tissue rich in smooth muscle and elastic fibres, covered by peritoneum; its trabeculae are long and thick and radiate mainly from the hilum; and its parenchyma is white rounded scattered spots of white pulp on a red background of red pulp.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative

---

# Item
## id
CLM-104-HIS-RED-PULP-01
## concept_id
CON-HEM-594B1725902DAD
## subject
The red pulp of the spleen
## predicate
is formed of
## object
splenic cords of Billroth and blood sinusoids lined by stave cells with large intercellular spaces
## display_text
Red pulp appears red in fresh sections because of the number of red cells and is formed of the splenic cords of Billroth and blood sinusoids — barrel-shaped wide channels lined by a fenestrated elongated endothelium of stave cells, with large intercellular spaces and a non-continuous basal lamina, an arrangement that lets blood pass from the cords back into the blood stream.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative

---

# Item
## id
CLM-104-HIS-SPLENIC-CIRCULATION-THEORIES-01
## concept_id
CON-HEM-4D47090A0B7561
## subject
The connection between the terminal arterial capillaries and the splenic sinusoids
## predicate
is described by
## object
the open, the closed, and the open-and-closed theories
## display_text
Three theories describe how blood crosses from the terminal arterial capillaries into the splenic sinusoids: the closed theory, in which the capillaries open directly into the sinusoids; the open theory, in which they deliver blood into the tissue of the red pulp, which enters the sinusoids through openings in their walls; and the open-and-closed theory, in which the circulation is closed when the spleen contracts and open when it relaxes.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: three theories

---

# Item
## id
CLM-104-HIS-PALATINE-TONSIL-STRUCTURE-01
## concept_id
CON-HEM-093013026B640A
## subject
The palatine tonsil
## predicate
is formed of
## object
stratified squamous epithelium dipping in as crypts, nodules arranged around them, and dense connective tissue forming an incomplete capsule on the deep aspect
## display_text
The palatine tonsil is covered on its free surface by non-keratinized stratified squamous epithelium dipping down as tonsillar crypts, with lymphatic nodules arranged around the crypts and diffuse lymphatic tissue between them, and dense connective tissue deep to the lymphatic tissue forming an incomplete capsule; its mucous gland ducts open on the surface rather than at the base of the crypts, so inflammation of the crypts is common.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: lateral wall of the oropharynx

---

# Item
## id
CLM-104-HIS-TONSIL-CAPSULE-01
## concept_id
CON-HEM-F0020DCB0BA8FD
## subject
A tonsil
## predicate
is
## object
an aggregation of lymphatic tissue that is incompletely encapsulated
## display_text
Tonsils are aggregations of lymphatic tissue that are incompletely encapsulated, and there are three types: palatine, lingual and pharyngeal.
## risk_class
foundational_stable
## verification_status
conflicted
## conflict_status
The histology department book defines tonsils as a class on printed page 20 as "aggregation of lymphatic tissue, incompletely encapsulated", but its lingual tonsil entry on printed page 21 states "It has No C.T. capsule". Both are printed. The palatine and pharyngeal tonsils are given an incomplete capsule and the lingual none, so the class definition is looser than the entry rather than a flat contradiction — but the book is not consistent with itself and no independent source has been consulted to settle it.
## confidence
0.7
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: three types
exception: the lingual tonsil, which the same book says has no capsule

---

# Item
## id
CLM-104-HIS-PHARYNGEAL-TONSIL-01
## concept_id
CON-HEM-23C119B7E783BD
## subject
The pharyngeal tonsil
## predicate
is
## object
a single midline nasopharyngeal mass with folded pseudostratified columnar ciliated epithelium, no crypts and an incomplete capsule
## display_text
The pharyngeal tonsil is a single mass of lymphoid tissue at the midline under the mucous membrane of the nasopharynx; its epithelium is folded pseudostratified columnar ciliated with goblet cells, it has no crypts, and it has an incomplete connective tissue capsule.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
laterality: single, midline

---

# Item
## id
CLM-104-HIS-TONSIL-FUNCTION-01
## concept_id
CON-HEM-A165FFF2DDDE92
## subject
All three tonsils
## predicate
protect
## object
the digestive and respiratory systems against invaders, by the production of antibodies
## display_text
The function of all three tonsils is protection of the digestive and respiratory systems against any invader, such as bacteria and viruses, by the production of antibodies.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
scope: palatine, lingual and pharyngeal together

---

# Item
## id
CLM-104-HIS-THYMUS-LOBULATION-01
## concept_id
CON-HEM-BA8773E5D84286
## subject
The thymus
## predicate
is
## object
incompletely lobulated, with a darker cortex and a medulla continuous between adjacent lobules
## display_text
The thymus is a single bilobed organ whose thin capsule sends incomplete trabeculae that incompletely subdivide the lobes into lobules; the cortex of each lobule stains darker because it is more densely populated with lymphocytes, and the medulla of each lobule is continuous with that of the adjacent lobule.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: thoracic cavity, behind the sternum

---

# Item
## id
CLM-104-HIS-HASSALL-CORPUSCLE-01
## concept_id
CON-HEM-10B2E783E164FD
## subject
A Hassall's corpuscle
## predicate
is
## object
a small rounded acidophilic body of degenerating reticular cells surrounded by concentric layers of epithelial reticular cells, found in the thymic medulla
## display_text
Hassall's corpuscles are small rounded acidophilic structures found in the medulla of the thymus, each formed of a central acidophilic mass of degenerating reticular cells surrounded by concentric layers of epithelial reticular cells; their number increases with age.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
site: thymic medulla only

---

# Item
## id
CLM-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01
## concept_id
CON-HEM-02424D1AF8A169
## subject
The epithelial reticular cells of the thymus
## predicate
are
## object
endodermal in origin, joined by desmosomes and tight junctions into a cellular reticulum, and produce no reticular fibres
## display_text
The thymic epithelial reticular cells are derived from endoderm, unlike the mesodermal reticular cells of a lymph node or spleen; their long cytokeratin-containing processes are connected by desmosomes and tight junctions into a reticulum on which other cells sit, and they produce no reticular fibres.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
origin: endoderm

---

# Item
## id
CLM-104-HIS-THYMUS-ABSENCES-01
## concept_id
CON-HEM-3E38A04641F73C
## subject
The thymus
## predicate
has no
## object
lymphoid nodules, B lymphocytes, plasma cells or afferent lymph vessels
## display_text
The thymus has no lymphoid nodules, no B lymphocytes, no plasma cells and no afferent lymph vessels, and the last of those absences is what protects the thymocytes from circulating antigens.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: negative
count: four absences

---

# Item
## id
CLM-104-HIS-BLOOD-THYMIC-BARRIER-01
## concept_id
CON-HEM-BB5A071CEEB78F
## subject
The blood-thymic barrier
## predicate
is formed of
## object
a continuous capillary endothelium with tight junctions, a thick continuous basal lamina, a perivascular tissue with macrophages, and a complete layer of epithelial reticular cells
## display_text
The blood-thymic barrier separates developing T lymphocytes from antigens in circulating blood, is present only in the cortex of the thymus and not in the medulla, and is formed of four layers: a continuous capillary endothelium joined by tight junctions, a thick continuous basal lamina, a perivascular tissue containing macrophages, and a complete layer of epithelial reticular cells with tight junctions between them.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.9
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
polarity: affirmative
count: four layers
site: cortex only, not medulla
