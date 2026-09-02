// Per-item explanations, concept-root mapping, topic/subtopic and difficulty
// for the HU-ORL-305 Ophthalmology lane-1 cluster. Keyed by the bank's own
// item number within each chapter (matches
// scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology.json).
// Printed keys stand as printed throughout; doubts noted in author_notes.

const ANAT_TOPIC = 'Ophthalmology'
const ANAT_SUBTOPIC_CH1 = 'Ocular anatomy and physiology'
const EXAM_SUBTOPIC = 'Clinical ophthalmic examination'
const PROTECTIVE_SUBTOPIC = 'Eyelid, lacrimal system and orbit'

export const QUESTIONS_CH1 = {
  1: { root: 'aqueousHumour', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: 'The anterior chamber angle is the site of aqueous drainage via the trabecular meshwork, not its site of secretion.',
    b: 'Aqueous humour is secreted by the ciliary body, specifically the non-pigmented epithelium of its pars plicata, into the posterior chamber. From there it flows through the pupil into the anterior chamber before draining at the angle. This secretory role is what maintains normal intraocular pressure and nourishes the avascular cornea and lens.',
    c: 'The posterior iris surface is not a secretory structure for aqueous humour; the ciliary body immediately behind it is.',
    d: 'The lens has no secretory function; it is a refractive structure suspended by the zonules, not a source of aqueous humour.',
  } },
  2: { root: 'aqueousHumour', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: "Aqueous humour drains through the anterior chamber angle, where the trabecular meshwork channels it into Schlemm's canal and onward into the episcleral venous system. This drainage pathway regulates intraocular pressure, since production and drainage must balance for pressure to stay normal. Obstruction along this route, most classically at the trabecular meshwork, is the basis of glaucoma.",
    b: 'The ciliary body is where aqueous humour is produced, not where it drains.',
    c: 'The posterior iris surface plays no role in aqueous drainage; it lies upstream, near the site of secretion.',
    d: 'The lens is not part of the drainage pathway; aqueous flows around it, not through it.',
  } },
  3: { root: 'aqueousHumour', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: 'Aqueous humour is produced in the posterior, not the anterior, chamber; it only reaches the anterior chamber after flowing through the pupil.',
    b: "Aqueous humour is produced in the posterior chamber, behind the iris and in front of the lens and its zonules, by the ciliary body's non-pigmented epithelium. It then passes forward through the pupil into the anterior chamber, where it eventually drains at the angle. Because the posterior, not the anterior, chamber is the true production site, confusing the two is a common source of error.",
    c: 'The vitreous cavity is filled with vitreous gel, not aqueous humour, and plays no part in aqueous production.',
    d: 'The trabecular meshwork is a drainage structure at the angle, not a site of aqueous production.',
  } },
  4: { root: 'eyeOuterCoat', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'The outer coat is formed of the cornea and sclera only; the iris belongs to the middle (uveal), not the outer, coat.',
    b: 'The outer coat is not only protective — the cornea, its anterior part, also provides the eye\'s principal refractive power.',
    c: 'The cornea does have refractive function; it contributes the larger share of the eye\'s total refractive power, more than the lens.',
    d: "The outer fibrous coat — cornea anteriorly, sclera posteriorly — forms a tough protective shell around the eye's contents. Beyond its mechanical role, it acts as a barrier against the invasion of micro-organisms, helping keep the eye's interior sterile. This protective function is distinct from, and in addition to, the cornea's separate optical role in refraction.",
  } },
  5: { root: 'uvealTract', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: "The uveal tract — iris, ciliary body and choroid — forms the eye's middle coat and is also known as the vascular coat because of its rich blood supply, which nourishes adjacent structures. It commonly carries pigment, but 'vascular coat' is the description this bank's key affirms as correct here. This vascularity distinguishes the uvea from the avascular cornea and lens, and from the outer fibrous coat.",
    b: "While the uveal tract may indeed be pigmented, that is not the property this question's key selects as correct — 'the vascular coat' description is.",
    c: 'The middle coat is the iris, ciliary body and choroid, not the retina — the retina belongs to the innermost, neurosensory coat, a separate layer.',
    d: "'Neurosensory coat' refers to the retina, the innermost layer, not the vascular middle coat that this question concerns.",
  } },
  6: { root: 'nasolacrimalDuct', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: 'Tears drain into the inferior, not the superior, nasal meatus.',
    b: "The nasolacrimal duct carries tears from the lacrimal sac down into the nose, opening into the inferior meatus, beneath the inferior nasal concha. This detail matters clinically because obstruction anywhere along this pathway — from the punctum through the canaliculi, sac and duct to this opening — causes epiphora and predisposes to dacryocystitis. The duct's course runs within the lateral wall of the nose, ending specifically at this inferior point.",
    c: 'The duct opens into the inferior, not the middle, nasal meatus.',
    d: 'The nasopharynx is not where the nasolacrimal duct opens; it opens into the nasal cavity itself, at the inferior meatus.',
  } },
  7: { root: 'corneaEpithelium', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: 'Keratinised epithelium covers the skin, not the cornea; a keratinised corneal surface would be opaque and incompatible with clear vision.',
    b: "The corneal surface is covered by non-keratinised stratified squamous epithelium, continuous at the limbus with the conjunctival epithelium. Being non-keratinised keeps the surface smooth, transparent, and able to stay adequately hydrated by the tear film, which the eye's optical function depends on. This is one of several features, alongside avascularity and regular stromal collagen spacing, that keep the cornea transparent.",
    c: 'Pseudo-stratified columnar epithelium lines structures such as the respiratory tract, not the cornea.',
    d: "Stratified columnar epithelium is not the corneal epithelial type; the cornea's epithelium is stratified squamous, non-keratinised specifically.",
  } },
  8: { root: 'corneaTransparency', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'Compact, regular arrangement of the stromal collagen fibres is a genuine transparency factor, so it is not the exception.',
    b: 'Avascularity (lack of blood vessels) is a genuine corneal transparency factor, so it is not the exception.',
    c: "The cornea's sensory nerve fibres, making it one of the most densely innervated tissues in the body, are unmyelinated within the stroma and epithelium — myelination only begins more peripherally, near the limbus. Myelinated fibres running through the central cornea would scatter light and disrupt transparency, so the cornea's nerve supply is specifically non-myelinated as a transparency-preserving feature. This is why 'myelinated nerve fibres' is the false statement among genuine transparency factors such as avascularity, epithelial non-keratinisation, and regular stromal collagen spacing.",
    d: 'Non-keratinised stratified squamous epithelium is a genuine transparency factor, so it is not the exception.',
  } },
  9: { root: 'corneaTransparency', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: "The cornea has five histological layers (epithelium, Bowman's, stroma, Descemet's, endothelium), not three.",
    b: 'The cornea is avascular, not richly vascularised; rich vasculature would in fact impair, not support, its transparency.',
    c: "The corneal endothelium maintains the stroma's relative dehydration through active Na+/K+-ATPase ion pumps, continuously pumping fluid out of the stroma against the cornea's tendency to imbibe water. This active endothelial pump function is essential for corneal transparency: stromal oedema from pump failure clouds the cornea. It is this active, energy-dependent pumping, not passive properties like vascularity or fibre arrangement, that this question's key identifies as the defining feature here.",
    d: 'The stromal collagen fibrils are regularly, not irregularly, arranged in parallel lamellae; irregular arrangement would scatter light and impair transparency.',
    e: 'The cornea in fact maintains relative dehydration, not rich water content; excess water content (oedema) would impair, not support, transparency.',
  } },
  10: { root: 'lensRefractivePower', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: "10 dioptres understates the lens's typical relaxed refractive contribution, which is closer to 20.",
    b: "The relaxed crystalline lens contributes roughly 20 dioptres to the eye's total refractive power of about 60 dioptres, with the cornea supplying the larger remaining share. This division of labour between cornea (fixed, larger contribution) and lens (variable, smaller contribution, able to increase with accommodation) lets the eye focus on both distant and near objects. The lens's own power can rise further during accommodation as the ciliary muscle contracts and the lens rounds up.",
    c: "30 dioptres overstates the lens's typical relaxed contribution; that figure is closer to the cornea's own share.",
    d: "40 dioptres is closer to the cornea's refractive contribution, not the lens's, which is roughly half that.",
  } },
  11: { root: 'corneaLayers', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: "Bowman's membrane is a genuine corneal layer, lying just beneath the epithelium, so it is not the exception.",
    b: 'The corneal stroma is a genuine corneal layer — indeed the thickest one — so it is not the exception.',
    c: "Bruch's membrane is not a layer of the cornea at all: it is a distinct structure within the choroid, separating the retinal pigment epithelium from the choroidal capillaries at the back of the eye. The cornea's own layers are the epithelium, Bowman's layer, the stroma, Descemet's membrane and the endothelium. Because Bruch's membrane belongs to an entirely different part of the eye, it is the one option here that is not a corneal layer.",
    d: 'The endothelium is a genuine corneal layer, its innermost one, so it is not the exception.',
  } },
  12: { root: 'corneaTransparency', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'Corneal avascularity is a genuine transparency factor, so it is not the exception.',
    b: 'The endothelial pump is a genuine transparency factor, so it is not the exception.',
    c: 'Regular arrangement of the stromal lamellae is a genuine transparency factor, so it is not the exception.',
    d: "A keratinised epithelium is not one of the cornea's transparency factors — quite the opposite. The cornea's actual epithelium is non-keratinised, which is itself part of what keeps the surface smooth and transparent; keratinisation, the process that makes skin opaque and protective, would cloud the corneal surface. This is why keratinised epithelium is the exception among genuine transparency factors such as avascularity, the endothelial pump and regular stromal collagen arrangement.",
  } },
  13: { root: 'uvealTract', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: 'The iris is a genuine component of the uveal tract, so it is not the exception.',
    b: 'The ciliary body is a genuine component of the uveal tract, so it is not the exception.',
    c: "The uveal tract is composed of the iris, ciliary body and choroid — collectively the eye's vascular middle coat. The retina is a separate structure entirely: the innermost, neurosensory coat, developmentally and anatomically distinct from the uvea. Because the retina is never one of the uveal tract's own components, it is the exception among these four options.",
    d: 'The choroid is a genuine component of the uveal tract, so it is not the exception.',
  } },
  14: { root: 'posteriorChamber', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: "The posterior chamber is the narrow space bounded anteriorly by the posterior surface of the iris and posteriorly by the crystalline lens (with its zonular fibres), lying behind the iris and in front of the lens. This is the simplified boundary pair most texts use to describe the chamber, distinguishing it from the anterior chamber (between the iris and the cornea) on the other side of the iris. The ciliary body also borders the chamber peripherally, but the iris and the lens are its two defining anterior/posterior boundaries.",
    b: 'The lens and the vitreous meet at the exit of the posterior chamber into the vitreous cavity, but that is not the boundary pair this key selects.',
    c: 'The iris and the cornea bound the anterior, not the posterior, chamber.',
    d: "The ciliary body borders the posterior chamber peripherally, and the lens is one of its true boundaries, but this key specifically selects the iris/lens boundary pair, not the ciliary-body/lens pair.",
  } },
  15: { root: 'conjunctiva', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'The palpebral part is a genuine conjunctival division, lining the inner eyelid, so it is not the exception.',
    b: 'The bulbar part is a genuine conjunctival division, covering the anterior sclera, so it is not the exception.',
    c: 'The fornices are genuine conjunctival divisions, where the palpebral and bulbar parts reflect into each other, so they are not the exception.',
    d: "The tarsus is not a part of the conjunctiva — it is the dense fibrous connective-tissue plate that gives the eyelid its shape and structural rigidity, lying deep to the palpebral conjunctiva rather than being part of the conjunctival membrane itself. The conjunctiva's own three continuous parts are the palpebral conjunctiva, the bulbar conjunctiva, and the fornices. Because the tarsus is a different tissue layer entirely, it is the one option here that is not a conjunctival part.",
  } },
  16: { root: 'ophthalmicExamComponents', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'Autorefractometry is a routine part of the ophthalmic examination, so it is not the exception.',
    b: 'Indirect ophthalmoscopy is a routine part of fundus examination, so it is not the exception.',
    c: "Optical coherence tomography is a specialised cross-sectional imaging investigation, reserved for specific indications such as macular or optic-nerve disease, rather than a component performed as part of every routine ophthalmic examination. The routine examination itself centres on visual acuity, pupillary reflexes, slit-lamp assessment, tonometry, autorefractometry and ophthalmoscopy. Because OCT sits outside that routine set, per this bank's key, it is the exception here.",
    d: 'Tonometry (intraocular pressure measurement) is a routine part of the ophthalmic examination, so it is not the exception.',
  } },
  17: { root: 'redReflex', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'A white (leukocoric) reflex genuinely can indicate mature cataract, so this statement is true, not the false one asked for.',
    b: "There is no recognised 'blue' red-reflex finding associated with glaucoma. Glaucoma is instead diagnosed from raised intraocular pressure, optic disc cupping and visual field loss — none of which produce a distinctive reflex colour change of the kind a white, black or yellow reflex represents for cataract, vitreous haemorrhage or endophthalmitis. Because this pairing of 'blue reflex' with glaucoma does not correspond to any real clinical sign, it is the false statement among the four.",
    c: 'A black reflex genuinely can be seen in dense vitreous haemorrhage, so this statement is true, not the false one asked for.',
    d: 'A yellow reflex genuinely can point to endophthalmitis, so this statement is true, not the false one asked for.',
  } },
  18: { root: 'orbitSinusRelations', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'The orbit is a four-walled, not three-walled, pyramidal structure (roof, floor, medial and lateral walls), so this statement is false.',
    b: "The bony orbit is closely related to the surrounding paranasal sinuses on three of its four walls: the roof borders the frontal sinus, the floor borders the maxillary sinus, and the medial wall borders the ethmoid sinus. This close relationship is clinically important, since sinus disease can spread into the orbit through these thin bony walls. It is this genuine anatomical closeness, not a false claim, that makes this the true statement among the four.",
    c: "The orbit communicates with adjacent spaces through several named canals and fissures (optic canal, superior and inferior orbital fissures, and smaller foramina), not a settled count of '4 main ports', so this statement is not the one the key affirms.",
    d: 'The commonest cause of orbital cellulitis is spread from sinusitis (particularly ethmoiditis), not simple conjunctivitis, so this statement is false.',
  } },
  19: { root: 'corneaLayers', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'The cornea has five histological layers (epithelium, Bowman\'s, stroma, Descemet\'s, endothelium), not seven, so this statement is false.',
    b: "The corneal stroma, the cornea's thickest layer, is made of collagen fibrils arranged in regularly spaced parallel lamellae. This precise, near-crystalline regularity of spacing, not the mere presence of collagen, is what allows destructive light-scattering interference between adjacent fibrils to cancel out, keeping the stroma transparent. It is this genuine structural fact, among several false statements about corneal anatomy, that the key affirms here.",
    c: 'Corneal transparency is due to avascularity, not vascularity — blood vessels in the cornea would scatter light and cause opacity, which is why corneal vascularisation is a pathological finding.',
    d: 'The active endothelial pump plays a major, not minor, role in transparency, continuously removing fluid to keep the stroma relatively dehydrated.',
  } },
  20: { root: 'cornealLightReflex', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Hard', explanations: {
    a: '10 dioptres corresponds to about 1mm of reflex decentration, not the 2mm described here.',
    b: '20 dioptres would correspond to roughly 1.3mm of decentration on the working Hirschberg estimate, not the full 2mm described here.',
    c: "The Hirschberg test estimates the angle of manifest strabismus from how far the corneal light reflex is displaced from the pupil centre, using the working estimate that each millimetre of decentration corresponds to roughly 15 dioptres of deviation. A reflex displaced 2mm temporal to the pupil in the right eye is consistent with the eye being turned inward (esotropia), and 2mm at ~15 dioptres/mm works out to about 30 dioptres. This bedside estimate lets a clinician quantify a squint without needing a prism bar.",
    d: '40 dioptres would correspond to a decentration greater than the 2mm described in this scenario.',
  } },
  21: { root: 'fundusExamMethods', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'Slit-lamp biomicroscopy with an accessory fundus lens is a genuine fundus-examination method, so it is not the exception.',
    b: 'Direct ophthalmoscopy is a genuine fundus-examination method, so it is not the exception.',
    c: 'Indirect ophthalmoscopy is a genuine fundus-examination method, so it is not the exception.',
    d: "Retinoscopy is not a fundus-examination method — despite using a similarly styled instrument and observing a light reflex from the eye, its purpose is entirely different: it objectively measures the eye's refractive error by observing how the retinoscopic reflex moves as lenses are interposed, rather than examining the retina's structure. Genuine fundus-examination methods are direct and indirect ophthalmoscopy and slit-lamp biomicroscopy with a fundus lens. Because retinoscopy serves a refractive, not a fundus-examination, purpose, it is the exception among these four.",
  } },
  22: { root: 'visualFieldConfrontation', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'An enlarged blind spot is too small and localised a defect for the coarse resolution of confrontation testing to reliably detect.',
    b: "A paracentral scotoma is too small and localised a defect for confrontation testing's coarse resolution to reliably detect.",
    c: "Confrontation visual field testing, comparing the patient's field to the examiner's own quadrant by quadrant, is a quick bedside screening method. Its resolution is coarse, but it is well suited to detecting a large field defect such as a hemianopia — loss of an entire half of the visual field, typically from a lesion affecting the optic tract or radiations behind the chiasm. Smaller, more localised defects such as a paracentral scotoma or a subtle nasal step generally need formal, more sensitive perimetry to detect reliably.",
    d: "A subtle nasal step is too small a defect for confrontation testing's coarse resolution to reliably detect.",
  } },
  23: { root: 'orbitSinusRelations', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'The ethmoid sinus genuinely lies medial to the orbit, so this statement is true, not the exception.',
    b: 'The orbital roof genuinely separates the orbit from the frontal sinus above it, so this statement is true, not the exception.',
    c: "The orbit's lateral wall borders the temporal fossa, not the sphenoid sinus — the sphenoid sinus instead lies posterior to the orbital apex, related to the back of the orbit rather than its lateral wall. The orbit's genuine sinus relationships are the frontal sinus (roof), the ethmoid sinus (medial wall) and the maxillary sinus (floor). Because the lateral wall's stated relation to the sphenoid sinus does not hold, this is the false statement among the four.",
    d: 'The orbital floor genuinely separates the orbit from the maxillary sinus below it, so this statement is true, not the exception.',
  } },
  24: { root: 'lensZonules', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Easy', explanations: {
    a: "'Sutures' refers to the internal lines where lens fibres meet within the lens substance, not to the suspensory mechanism.",
    b: "The crystalline lens is suspended in position by the zonule of Zinn — a ring of fine fibres running from the ciliary body's processes to the lens capsule's equator. Zonular tension at rest flattens the lens for distance focus; when the ciliary muscle contracts during accommodation, zonular tension relaxes and the lens rounds up to increase its refractive power for near vision. This suspension keeps the lens centred on the visual axis between the iris and the vitreous.",
    c: "The lens capsule is the lens's own outer covering, not the structure that suspends it from the ciliary body.",
    d: 'Lens fibres are the lens\'s own internal cellular structure, not the suspensory apparatus that holds the lens in place.',
  } },
  25: { root: 'acAngleStructures', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Moderate', explanations: {
    a: 'The trabecular meshwork is a genuine structure of the anterior chamber angle, so it is not the exception.',
    b: 'The scleral spur is a genuine structure of the anterior chamber angle, forming its posterior landmark, so it is not the exception.',
    c: "The retinal pigment epithelium is a layer of the retina, at the back of the eye — it has no anatomical place in the anterior chamber angle at the front. The angle's own genuine structures are the trabecular meshwork (the drainage filter), Schwalbe's line (the peripheral end of Descemet's membrane) and the scleral spur (the posterior boundary). Because the retinal pigment epithelium belongs to an entirely different part of the eye, it is the one option here that is not a structure of the angle.",
    d: "Schwalbe's line is a genuine structure of the anterior chamber angle, marking the peripheral termination of Descemet's membrane, so it is not the exception.",
  } },
  26: { root: 'sofContents', topic: ANAT_TOPIC, subtopic: ANAT_SUBTOPIC_CH1, difficulty: 'Hard', explanations: {
    a: 'The ophthalmic artery enters the orbit through the optic canal, alongside the optic nerve, not through the superior orbital fissure.',
    b: "The superior orbital fissure, between the greater and lesser wings of the sphenoid, transmits the ophthalmic (first) division of the trigeminal nerve into the orbit, along with the oculomotor, trochlear and abducens nerves and the superior ophthalmic vein. This is distinct from the optic canal, which instead carries the optic nerve and the ophthalmic artery. Knowing which structures pass through which of these two adjacent openings matters clinically for localising lesions at the orbital apex or cavernous sinus.",
    c: 'The optic nerve passes through the optic canal, not the superior orbital fissure.',
    d: "The central retinal artery is a branch of the ophthalmic artery that reaches the eye within the optic nerve's sheath, via the optic canal, not through the superior orbital fissure.",
  } },
}

export const QUESTIONS_CH2 = {
  1: { root: 'corneaDiameter', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: '8 mm understates the normal adult corneal horizontal diameter, which is closer to 12mm.',
    b: '10 mm understates the normal adult corneal horizontal diameter, which is closer to 12mm.',
    c: "The adult cornea's horizontal diameter normally measures about 12mm, larger than its vertical diameter of about 11mm, since the cornea is not perfectly circular. This value is a standard clinical reference point: a cornea substantially larger than this (congenital glaucoma/buphthalmos) or smaller (microcornea) signals significant pathology. Horizontal corneal diameter is the measurement most commonly quoted and compared to this 12mm reference.",
    d: '14 mm overstates the normal adult corneal horizontal diameter and would suggest an abnormally enlarged cornea.',
  } },
  2: { root: 'gonioscopy', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: 'Direct ophthalmoscopy examines the fundus, not the anterior chamber angle.',
    b: 'Retinoscopy measures refractive error, not the anterior chamber angle.',
    c: "Gonioscopy is the technique for examining the anterior chamber angle, using a specially designed contact lens with mirrors (or a prism) to overcome the total internal reflection that otherwise blocks a direct view of the angle through the cornea. It lets the examiner assess whether the angle is open or closed and grade its visible structures, central to diagnosing and classifying glaucoma. No other routine technique substitutes for gonioscopy in directly visualising the angle.",
    d: 'Indirect ophthalmoscopy examines the fundus, not the anterior chamber angle.',
  } },
  3: { root: 'slitLampRole', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'The slit lamp is not rarely used — it is the single most frequently used instrument in routine anterior-segment examination.',
    b: "The slit lamp biomicroscope, on its own, examines the anterior segment in detail — cornea, anterior chamber, iris and lens. With an accessory condensing or contact lens added, it can also be used to examine the fundus, extending its reach to the posterior segment. This dual capability, direct anterior-segment use plus accessory-lens-assisted posterior-segment use, is why the slit lamp is considered the single most versatile instrument in ophthalmic examination.",
    c: 'Dense vitreous haemorrhage blocks the view for fundus examination by any technique, slit lamp included — it does not enable it.',
    d: 'Anterior chamber angle examination needs a gonioscopy lens, not just any accessory lens, because the angle cannot be viewed directly even with the slit lamp alone, due to total internal reflection at the cornea.',
  } },
  4: { root: 'fundusExamDR', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "Diabetic retinopathy is diagnosed and staged entirely by what is seen on fundus examination — microaneurysms, dot-and-blot haemorrhages, hard exudates, cotton-wool spots, and, in proliferative disease, neovascularisation. Because none of these features can be inferred without directly viewing the retina, fundus examination is essential, not optional, in every patient with diabetes. Regular screening fundus examination is a core part of diabetic care specifically because retinopathy can be advanced before it affects vision or is otherwise noticed.",
    b: 'The slit lamp alone, without an accessory fundus lens, cannot examine the fundus.',
    c: 'Mature cataract is a dense media opacity that obstructs, rather than eases, a clear view of the fundus.',
    d: 'Fundus examination is not rarely used — it is a routine, essential part of ophthalmic and diabetic care, performed regularly rather than occasionally.',
  } },
  5: { root: 'corneaDiameter', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: '8 mm understates the normal adult corneal vertical diameter, which is closer to 11mm.',
    b: '13 mm overstates the normal adult corneal vertical diameter, which is closer to 11mm — that figure is too large even for the horizontal measurement.',
    c: "The adult cornea's vertical diameter normally measures about 11mm, slightly smaller than its horizontal diameter of about 12mm, reflecting the cornea's slightly oval, non-circular shape. This vertical measurement is a less commonly quoted but still standard reference figure alongside the horizontal one. Departures from either expected value can signal congenital or acquired corneal disease.",
    d: '14 mm overstates the normal adult corneal vertical diameter substantially.',
  } },
  6: { root: 'slitLampRole', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "The slit lamp, used alone, cannot adequately examine the fundus — its optical design and working distance suit the anterior segment. An accessory lens (a condensing lens held in front of the eye, or a contact fundus lens) is needed to bring the posterior segment into view through the slit lamp. This is the same reason gonioscopy needs its own special lens to view the anterior chamber angle: the slit lamp's basic optics reach the anterior segment directly but need an add-on lens for anything further back.",
    b: 'The slit lamp alone cannot adequately examine the fundus; an accessory lens is required.',
    c: 'Fundus examination is not rarely used in routine practice — it is a standard, frequently performed part of eye examination.',
    d: 'Dense vitreous haemorrhage obstructs, rather than eases, fundus examination by any technique.',
  } },
  7: { root: 'visualAcuitySequence', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "When a patient cannot identify any letters even on the largest line of the Snellen chart, acuity testing steps down the hierarchy: the next step is to test the ability to count fingers, typically starting close up and moving the examiner's hand further away to find the maximum testable distance. Only if counting fingers also fails does testing move further down, to hand movements and then to light perception. Skipping straight to a lower step would understate whatever residual vision the patient retains.",
    b: 'Hand-movement testing is a step below counting fingers in the hierarchy, tried only once counting fingers has also failed — it is not the immediate next step after the Snellen chart.',
    c: 'Light-projection testing sits near the bottom of the acuity hierarchy, well below counting fingers, and is not the immediate next step.',
    d: 'Light-perception testing sits near the bottom of the acuity hierarchy, well below counting fingers, and is not the immediate next step.',
  } },
  8: { root: 'ophthalmicExamComponents', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Visual acuity assessment genuinely is mandatory in eye examination, so this statement is true, not the exception.',
    b: 'Examination of the pupillary reflexes genuinely is an important, routine part of eye examination, so this statement is true, not the exception.',
    c: 'Fundus examination genuinely is performed by ophthalmoscopy (direct or indirect), so this statement is true, not the exception.',
    d: "Automated (computerised) visual field testing is a specialised investigation performed for specific indications — such as glaucoma assessment or suspected neurological visual field loss — rather than a component carried out on every patient who has an eye examination. The genuinely universal components of a routine eye examination are visual acuity assessment, pupillary reflex testing, and fundus examination by ophthalmoscopy. Because automated field testing is selective rather than universal, it is the exception among these four statements.",
  } },
  9: { root: 'bScanUltrasound', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'A-scan, not B-scan, ultrasound is the technique mainly used for biometry (axial length measurement).',
    b: 'B-scan is used for fundus assessment specifically when media opacity blocks the view, not simply in any eye with a clear view where direct examination would already suffice.',
    c: "B-scan ultrasound builds a two-dimensional image of the eye's internal structures and is a key tool for evaluating posterior-segment masses, including tumours such as choroidal melanoma, particularly when media opacity prevents a direct fundoscopic view. Its ability to characterise a lesion's shape, internal reflectivity and any associated features (such as retinal detachment) makes it valuable for both detecting and characterising posterior-segment tumours. This diagnostic role, rather than biometry, is B-scan's principal ophthalmic use.",
    d: 'Diagnostic ocular ultrasound uses high-, not very low-, frequency sound waves, which is what gives it the resolution needed to image fine ocular structures.',
  } },
  10: { root: 'slitLampRole', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'The slit lamp genuinely is the single most important examination system for the eye, so this statement is correct, not the wrong one asked for.',
    b: 'With accessory lenses, the slit lamp genuinely can be used for fundus examination, so this statement is correct, not the wrong one asked for.',
    c: "Without an accessory gonioscopy lens, the anterior chamber angle cannot be examined by slit lamp — the angle is hidden from direct view because light from it undergoes total internal reflection at the cornea before it can reach the examiner. A gonioscopy lens overcomes this by providing an alternative optical path (a mirror or prism) out of the eye. Because an accessory lens is required, not optional, for angle examination, the claim that it can be done 'without accessory lenses' is the wrong statement among these four.",
    d: 'The slit lamp genuinely does have several filters (for example cobalt blue, red-free) that enhance specific examination techniques, so this statement is correct, not the wrong one asked for.',
  } },
  11: { root: 'redReflex', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "In retinal detachment, the red reflex takes on a greyish quality rather than the normal bright orange-red colour, because the elevated, detached retina — pale and opacified compared with a normally attached retina against the vascular choroid — scatters and dulls the light reflected back through the pupil. This greyish change is one of several diagnostic red-reflex colour patterns, alongside the white reflex of mature cataract, the black reflex of dense vitreous haemorrhage, and the yellow reflex of endophthalmitis. Recognising it can prompt urgent fundus assessment even before formal ophthalmoscopy confirms the detachment.",
    b: 'A whitish reflex is the pattern associated with mature cataract, not retinal detachment.',
    c: 'A yellowish reflex is the pattern associated with endophthalmitis, not retinal detachment.',
    d: 'A black reflex is the pattern associated with dense vitreous haemorrhage, not retinal detachment.',
  } },
  12: { root: 'retinoscopyPurpose', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "Retinoscopy does not examine the retina's structure, despite the similarity of the name and instrument; it assesses refraction, not retinal anatomy.",
    b: 'The degree of strabismus is assessed by cover testing and related techniques, not by retinoscopy.',
    c: "Retinoscopy objectively measures the eye's refractive power by observing how a reflex from the fundus moves through the pupil as lenses are interposed in front of the eye. Because it does not require the patient to respond or read letters, it is especially useful in young children and others unable to cooperate with subjective refraction. This objective refractive assessment, not fundus examination, motility testing, or biometry, is retinoscopy's defining purpose.",
    d: 'Axial length of the eye is measured by biometry (A-scan or optical biometry), not by retinoscopy.',
    e: 'Visual acuity is assessed with a Snellen chart or equivalent, not by retinoscopy, which instead measures refractive error objectively.',
  } },
  13: { root: 'slitLampRole', topic: ANAT_TOPIC, subtopic: EXAM_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: "Detailed examination of the anterior segment — cornea, anterior chamber, iris and crystalline lens — is performed using the slit lamp biomicroscope, which provides magnified, illuminated, stereoscopic viewing of these structures. This makes it the primary anterior-segment examination tool in routine ophthalmic practice, distinct from instruments aimed at other purposes such as refraction or fundus viewing. Its versatility, extended further by accessory lenses for the fundus or the angle, is why it is central to almost every eye examination.",
    b: 'Retinoscopy assesses refractive error, not detailed anterior-segment anatomy.',
    c: 'Prisms are used to measure the angle of a manifest deviation (strabismus), not to examine anterior-segment anatomy in detail.',
    d: 'Ophthalmoscopy examines the fundus (posterior segment), not the anterior segment in detail.',
    e: 'An exophthalmometer measures the degree of globe protrusion (proptosis), not anterior-segment anatomy in detail.',
  } },
}

export const QUESTIONS_CH3 = {
  1: { root: 'thyroidEyeDisease', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "Thyroid eye disease (thyroid orbitopathy) is the commonest cause of bilateral proptosis in adults, driven by autoimmune inflammation that expands the orbital fat and extraocular muscles within the fixed bony orbit, pushing the globe forward on both sides. Orbital metastasis, lymphoma and frontal lobe meningioma can all cause proptosis, but each is a far less common cause overall and more often presents unilaterally. This is why, in an exam context, bilateral proptosis in an adult should first raise thyroid eye disease as the leading differential.",
    b: 'Orbital metastasis is a recognised but much less common cause of proptosis than thyroid eye disease, and more often presents unilaterally.',
    c: 'Lymphoma is a recognised but much less common cause of bilateral proptosis than thyroid eye disease.',
    d: 'Frontal lobe meningioma more typically causes unilateral proptosis by direct orbital extension, and is a far less common overall cause of proptosis than thyroid eye disease.',
  } },
  2: { root: 'lagophthalmos', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Seventh cranial (facial) nerve paralysis is the classic cause of lagophthalmos, since it paralyses the orbicularis oculi that normally closes the lids.',
    b: "Fifth cranial (trigeminal) nerve paralysis affects facial sensation and the muscles of mastication, not eyelid closure, which is instead controlled by the facial (seventh cranial) nerve's innervation of the orbicularis oculi. Because lagophthalmos results from failure of lid closure rather than a sensory or masticatory deficit, trigeminal nerve palsy is not a recognised cause of it — though it can indirectly worsen exposure by also removing corneal sensation and protective blink reflexes. This is why trigeminal, not facial, nerve involvement is the exception among these four causes.",
    c: 'Thyrotoxic exophthalmos can cause lagophthalmos by pushing the globe forward faster than the lids can accommodate, leaving them unable to fully close over the proptosed eye.',
    d: 'A parotid tumour, if it invades or compresses the facial nerve as it passes through the parotid gland, can cause facial nerve palsy and consequent lagophthalmos.',
  } },
  3: { root: 'dacryocystitisMgmt', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Hard', explanations: {
    a: 'Dacryocystorhinostomy (connecting the sac to the nose) is the standard elective procedure for chronic dacryocystitis, but is not the appropriate step during an acute painful exacerbation, especially in a patient already reluctant to accept surgery.',
    b: 'Probing of the lacrimal sac is not the management of an acute infective exacerbation; it is a technique more relevant to congenital nasolacrimal duct obstruction in children.',
    c: 'Intubation of the lacrimal sac is not the appropriate management of an acute painful exacerbation of chronic dacryocystitis.',
    d: "An acute, painful exacerbation of chronic dacryocystitis is an active infection, and the appropriate immediate management is systemic antibiotics to control that infection first. Surgery (dacryocystorhinostomy) remains the definitive, elective treatment for the underlying chronic obstruction, but operating during an acute inflammatory flare is not the standard approach, and is even less appropriate given this patient's own reluctance to have surgery at all. Treating the acute infection first, with surgery deferred to a later, quieter interval, is the standard sequence.",
  } },
  4: { root: 'ptosisMechanisms', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Orbicularis muscle paralysis (as in facial nerve palsy) causes lagophthalmos — impaired lid closure — not ptosis, which is a failure of lid elevation.',
    b: "Upper eyelid ptosis results from failure of the muscles that elevate the lid, principally malfunction (weakness) of the levator palpebrae superioris. This can follow damage or dysfunction anywhere along the pathway that drives the levator, from third-nerve palsy to neuromuscular junction disease such as myasthenia gravis to direct trauma or developmental dystrophy of the muscle itself. It is levator weakness, not overaction, and not a problem of the eye-closing orbicularis or the eye-elevating superior rectus, that produces ptosis.",
    c: 'Levator overaction would tend to retract, not droop, the upper lid — the opposite of ptosis.',
    d: 'Superior rectus malfunction affects upward eye movement (elevation of the globe), not eyelid position; ptosis is a lid, not a globe-movement, abnormality.',
  } },
  5: { root: 'eyelidMalposition', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: 'Rolling in of the lid margin describes entropion, the opposite malposition to ectropion.',
    b: "Ectropion is outward rolling (eversion) of the eyelid margin, away from the globe. This exposes the palpebral conjunctiva to the air, which can cause it to become dry and inflamed, and can prevent the punctum from sitting properly against the globe to draw tears away, causing epiphora (watering). It is the direct opposite of entropion, in which the margin instead rolls inward toward the globe.",
    c: 'Rubbing of the eyelashes against the cornea is the mechanical consequence of entropion (or of trichiasis), not the definition of ectropion itself.',
    d: 'Drooping of the upper eyelid describes ptosis, an entirely different eyelid abnormality from ectropion.',
  } },
  6: { root: 'thyroidEyeDisease', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Diplopia genuinely is a recognised feature of thyroid eye disease, from restrictive extraocular muscle involvement, so it is not the exception.',
    b: 'Proptosis genuinely is a recognised, indeed defining, feature of thyroid eye disease, so it is not the exception.',
    c: 'Corneal ulcer, from chronic exposure keratopathy in severe proptosis, genuinely is a recognised complication of thyroid eye disease, so it is not the exception.',
    d: "Thyroid eye disease characteristically causes upper lid retraction, not ptosis — the opposite lid position. Sympathetic overactivity and inflammatory infiltration of the lid elevators and Müller's muscle tend to raise the lid, producing the disease's classic 'staring' appearance, in contrast to the drooping of ptosis. Because ptosis runs against, rather than with, the disease's actual lid findings, it is the exception among these four presentations.",
  } },
  7: { root: 'lagophthalmos', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "Facial (seventh cranial) nerve palsy paralyses the orbicularis oculi, the muscle responsible for eyelid closure, producing lagophthalmos — incomplete lid closure. Because the cornea is then left exposed between blinks and during sleep, it dries out and is at risk of exposure keratopathy and, if unprotected, corneal ulceration. This exposure risk is the main reason facial nerve palsy needs active lubrication and lid-protection measures even though the paralysis itself is not directly painful.",
    b: 'Facial nerve palsy causes lagophthalmos, not ptosis, and does not typically cause exotropia (an eye-movement abnormality outside the facial nerve\'s territory).',
    c: 'Facial nerve palsy does not cause miosis or loss of eye sensation — miosis reflects autonomic pathways, and eye sensation is carried by the trigeminal, not the facial, nerve.',
    d: 'Facial nerve palsy does not itself cause loss of vision; its effect is on eyelid closure (motor), not on the visual pathway.',
  } },
  8: { root: 'eyelidMalposition', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: "Entropion is inward rolling (inversion) of the eyelid margin, turning the lid — and with it, the eyelashes — in toward the globe. Because the lashes then rub directly against the cornea and conjunctiva with every blink, entropion causes chronic irritation and risks corneal abrasion or ulceration if left uncorrected. It is the direct opposite of ectropion, in which the margin instead rolls outward, away from the globe.",
    b: 'An accessory row of eyelashes describes distichiasis, a separate congenital or acquired condition, not entropion.',
    c: 'Downward drooping of the upper lid describes ptosis, an entirely different eyelid abnormality from entropion.',
    d: 'Outward protrusion of the lower lid describes ectropion, the opposite malposition to entropion.',
  } },
  9: { root: 'dacryocystitisMgmt', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Probing is a technique more relevant to congenital nasolacrimal duct obstruction in infants, not the standard definitive treatment for adult chronic dacryocystitis.',
    b: 'Intubation (temporary stenting of the drainage system) is not the standard definitive procedure for adult chronic dacryocystitis.',
    c: "Dacryocystorhinostomy (DCR) is the standard definitive procedure for chronic dacryocystitis in adults: it surgically creates a new drainage channel connecting the lacrimal sac directly to the nasal cavity, bypassing the obstructed nasolacrimal duct that causes the recurrent infection and watering. Because the underlying obstruction is anatomical, medical treatment alone cannot cure it — surgery is needed once any acute infection has been controlled. This elective procedure is distinct from the systemic antibiotics used to manage an acute infective flare.",
    d: 'Massaging (Crigler massage) is used for congenital nasolacrimal duct obstruction in infants, not as definitive treatment for adult chronic dacryocystitis.',
  } },
  10: { root: 'lagophthalmos', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Easy', explanations: {
    a: "Lagophthalmos is the medical term for incomplete closure of the palpebral fissure when the eyelids are shut — the lids fail to fully appose, leaving part of the globe, typically the lower cornea, exposed. This differs from ptosis, which is drooping of the upper lid when the eyes are meant to be open, and from Bell's phenomenon, the reflex upward rolling of the eye during attempted lid closure (seen exaggerated precisely because lagophthalmos prevents the lids from covering it). Recognising lagophthalmos matters because of the corneal exposure risk it creates.",
    b: 'Ptosis is drooping of the upper lid when the eyes are open, not incomplete closure when the lids are shut.',
    c: "Bell's phenomenon is the reflex upward and outward rolling of the eye during attempted lid closure, not the incomplete closure itself.",
    d: 'Blepharochalasis is a condition of recurrent eyelid swelling leading to stretched, redundant lid skin, not incomplete lid closure.',
  } },
  11: { root: 'blepharitisTypes', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'In ulcerative blepharitis the lid margin is inflamed and ulcerated, not spared — inflammation is a defining feature, not an absent one.',
    b: 'Scaly, dandruff-like material between the lashes with a non-inflamed margin describes squamous, not ulcerative, blepharitis.',
    c: 'Ulcerative blepharitis is a staphylococcal, not a fungal, process, so antifungal drugs are not its treatment.',
    d: "Ulcerative blepharitis, typically staphylococcal in origin, is the more severe of the two classic blepharitis patterns: it produces yellow crusts along the lash line, and once these crusts are removed, true ulceration of the lid margin is revealed beneath them. This distinguishes it from squamous (seborrhoeic) blepharitis, which produces scaly debris on an otherwise non-ulcerated margin. Recognising which pattern is present guides both prognosis and treatment, since the staphylococcal process typically needs antibiotic therapy.",
  } },
  12: { root: 'ptosisMechanisms', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Blunt trauma to the eyelid, if it damages the levator muscle or its aponeurosis, is a recognised cause of (traumatic) ptosis.',
    b: "Hypertension is not a recognised cause of ptosis. Ptosis follows failure of the lid-elevating mechanism — levator muscle weakness or its nerve supply — and its well-established causes are things like third-nerve palsy, myasthenia gravis, Horner's syndrome, congenital levator dystrophy, and direct trauma to the levator, none of which hypertension produces by itself. Because hypertension does not act on the levator or its innervation, it stands apart from the genuine causes listed here.",
    c: 'Myasthenia gravis, a neuromuscular junction disorder, is a well-recognised cause of ptosis, classically fatigable and variable through the day.',
    d: "Horner's syndrome, through loss of sympathetic tone to Müller's muscle, is a well-recognised cause of a mild ptosis.",
  } },
  13: { root: 'thyroidEyeDisease', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Upper lid retraction genuinely is a classic sign of dysthyroid eye disease, so it is not the exception.',
    b: "Uveitis — inflammation of the uveal tract — is not a recognised feature of dysthyroid eye disease, which instead affects the orbital fat, extraocular muscles and eyelids through autoimmune inflammation, sparing the uvea itself. The disease's genuine signs are upper lid retraction, proptosis (unilateral or bilateral) and lid lag on downgaze, all reflecting its orbital and periocular, rather than intraocular, site of pathology. Because uveitis targets a different anatomical compartment entirely, it is the exception among these four signs.",
    c: 'Unilateral or bilateral proptosis genuinely is a defining sign of dysthyroid eye disease, so it is not the exception.',
    d: 'Lid lag on downgaze genuinely is a classic sign of dysthyroid eye disease, so it is not the exception.',
  } },
  14: { root: 'dryEyeForms', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Aqueous tear deficiency (keratoconjunctivitis sicca) is a genuine, indeed the classic, form of dry eye, so it is not the exception.',
    b: 'Mucin deficiency from widespread goblet-cell loss is a genuine form of dry eye, destabilising the tear film, so it is not the exception.',
    c: 'Dryness secondary to eyelid disease (poor lid apposition or blink mechanics) is a genuine recognised form of dry eye, so it is not the exception.',
    d: "Lid oedema — swelling of the eyelid — is not a recognised form or mechanism of dry eye disease. The genuine forms of dry eye are grouped by their underlying tear-film mechanism: reduced aqueous production, mucin deficiency from goblet-cell loss, or dryness secondary to eyelid disease disrupting normal blinking and tear spread. Lid oedema is an unrelated eyelid finding, with causes and implications of its own, not one of dry eye's recognised mechanistic forms.",
  } },
  15: { root: 'hordeolumExternum', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'A hair follicle is where a stye centres anatomically, but the specific gland this question\'s key identifies as the site of acute inflammation is the associated Zeis gland, not the follicle itself.',
    b: "Hordeolum externum — a stye — is an acute inflammation of a Zeis gland, a small sebaceous gland that opens directly into an eyelash follicle. This is distinct from hordeolum internum, which instead involves the deeper meibomian glands within the tarsal plate and tends to be a more diffuse, often more painful swelling. Because the stye is specifically a Zeis-gland process, it is this gland, among the options here, that the key identifies as the correct answer.",
    c: "Sweat glands (of Moll) are a separate accessory glandular structure of the lid margin from the Zeis gland this question's key identifies as the site of hordeolum externum.",
    d: "Wolfring's glands are accessory lacrimal glands, unrelated to lash follicles or to hordeolum externum, which is a Zeis-gland process.",
  } },
  16: { root: 'ptosisMechanisms', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Hard', explanations: {
    a: "Riolan's muscle is the ciliary (lash-line) portion of orbicularis oculi, not the muscle responsible for the ptosis of Horner's syndrome.",
    b: "'Horner's muscle' is a historical name for a small part of orbicularis oculi near the lacrimal sac, not the muscle whose paralysis produces the ptosis of Horner's syndrome.",
    c: "The mild ptosis of Horner's syndrome results from paralysis of Müller's muscle, a small smooth-muscle accessory elevator of the upper lid that receives sympathetic innervation. Because Horner's syndrome interrupts the sympathetic pathway (from hypothalamus through the cervical sympathetic chain to the eye), Müller's muscle loses its tonic sympathetic drive and the lid droops slightly — typically only 1-2mm, much less than the ptosis seen with a third-nerve palsy, which instead paralyses the much larger levator palpebrae superioris. This distinction is what allows Horner's ptosis and third-nerve ptosis to be told apart by severity as well as by their other accompanying signs.",
    d: "The levator palpebrae muscle is the main lid elevator paralysed in third-nerve palsy, producing a severe ptosis — not the small accessory muscle affected in Horner's syndrome, whose paralysis produces only a mild ptosis.",
  } },
  17: { root: 'blepharitisTypes', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "In squamous blepharitis the lid margin is typically only mildly, not dramatically, inflamed — but the defining feature this question's key affirms is the scaly debris, not an entirely uninflamed margin.",
    b: "Squamous (seborrhoeic) blepharitis is characterised by scaly, dandruff-like material scattered between and along the base of the eyelashes, reflecting excess and abnormal desquamation of the lid-margin skin. This distinguishes it from the more severe ulcerative (staphylococcal) pattern, which instead produces yellow crusts and true ulceration once the crusts are removed. Recognising the scaly, dandruff-like pattern specifically points to the seborrhoeic rather than the staphylococcal process.",
    c: 'Squamous blepharitis is a seborrhoeic, not a fungal, process, so antifungal drugs are not its treatment.',
    d: 'Ulceration of the lid margin is the hallmark of ulcerative, not squamous, blepharitis.',
  } },
  18: { root: 'ptosisMechanisms', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Increased weight of the upper lid (for example from a lid mass) is a recognised but less common mechanical cause of ptosis in general, not the typical mechanism of the congenital form.',
    b: 'Levator tendon (aponeurosis) injury or dehiscence is the classic mechanism of involutional (age-related), not congenital, ptosis.',
    c: 'Third-nerve palsy is an acquired neurological cause of ptosis, not the mechanism of the congenital form, which is a primary muscle developmental problem rather than a nerve palsy.',
    d: "Congenital ptosis is most often due to a developmental dystrophy of the levator palpebrae superioris muscle itself — the muscle fibres are replaced in part by fibrous or fatty tissue and fail to develop normal contractile strength, rather than the ptosis resulting from a nerve lesion, lid mass, or the aponeurotic dehiscence seen in age-related ptosis. This distinct developmental mechanism is why congenital ptosis often shows lid-lag on downgaze (poor levator relaxation as well as poor contraction), a feature not typical of the acquired aponeurotic form. Because the problem is primary and muscular rather than neurological or mechanical, it also tends to be stable from birth rather than progressive, unlike the gradually worsening aponeurotic ptosis of later adult life.",
  } },
  19: { root: 'proptosisDifferential', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: 'Orbital cellulitis, through inflammatory oedema expanding orbital contents, genuinely is a recognised cause of proptosis, so it is not the exception.',
    b: 'Cavernous sinus thrombosis, through venous congestion backing up into the orbit via the ophthalmic veins, genuinely is a recognised cause of proptosis, so it is not the exception.',
    c: 'Thyroid eye disease, through expansion of orbital fat and extraocular muscles, genuinely is a recognised — indeed the commonest — cause of proptosis, so it is not the exception.',
    d: "Acute angle-closure glaucoma raises pressure within the eye itself, not within the orbit around it, and it does not increase orbital content or congest orbital venous drainage. Its clinical picture is a red, acutely painful eye with a hazy cornea and a fixed, mid-dilated pupil — but it does not push the globe forward. Because it acts on intraocular, not orbital, pressure, it is the one condition among these four that is not a cause of proptosis.",
  } },
  20: { root: 'lagophthalmos', topic: ANAT_TOPIC, subtopic: PROTECTIVE_SUBTOPIC, difficulty: 'Moderate', explanations: {
    a: "When the eyelids cannot fully close, as in lagophthalmos, part of the cornea remains exposed to air between blinks and overnight, drying out the normally moist, protected corneal surface. This exposure keratopathy can progress, if unaddressed, to frank corneal ulceration, since the epithelium breaks down without adequate tear-film protection and lubrication. This exposure risk is the principal reason lagophthalmos needs active management — lubricants, taping, or surgical correction — even when the underlying cause cannot itself be quickly reversed.",
    b: 'Diplopia results from misalignment of the visual axes (an extraocular muscle or nerve problem), not from incomplete lid closure itself.',
    c: 'Anisometropia is a difference in refractive error between the two eyes, unrelated to eyelid closure.',
    d: 'Incomplete lid closure disrupts, rather than improves, tear film distribution across the ocular surface, since normal blinking is what spreads and refreshes the tear film with each closure.',
  }, authorNotes: 'sourceOptions: the bank printed only 3 lettered options (a-c) for this item; option D was added at build time per lane policy (a 3-option source item gets a 4th option, noted) as a clearly incorrect distractor, not drawn from the source.' },
}
