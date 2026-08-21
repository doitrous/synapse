# Practical media requests — 104 CPS histology

The practical half of module 104 CPS is a slide-identification exam, and the file
the department runs it from is `104 Tissue  (2) (1).pdf`
(`src_5adcc001e9c3bb86bb75`, 74 pages, native text layer). Of those 74 pages,
**65 carry no text at all**. They are not blank: they are the slides. The text
layer holds a title page, eight one-word section dividers, and nothing else.

That is the whole finding. Everything a student is asked to identify in this
module's practical lives in images this repository does not have, and cannot
lawfully copy.

**Why this file exists.** `media-audit.md` established that the repository holds
zero medical images — no micrograph, no anatomy plate, no radiograph. Nothing
here was generated, downloaded or saved. These are written requests, to be
fulfilled by a human who records a licence.

---

## The station map, proved against the source

The eight dividers in the atlas's text layer, and the image-only pages behind
each. `104 Tissue  (2) (1).pdf` = `src_5adcc001e9c3bb86bb75`.

| Station | Divider page | Image-only slide pages | Slides | Subject |
|---|---|---|---|---|
| Lymph nodes | 2 | 3–6 | 4 | `haem` |
| Spleen | 7 | 8–12 | 5 | `haem` |
| Tonsil | 13 | 14–16 | 3 | `haem` |
| Thymus | 17 | 18–21 | 4 | `haem` |
| Aorta | 22 | 23–34 | 12 | `cvs` |
| Medium-sized artery & vein | 35 | 36–51 | 16 | `cvs` |
| Trachea | 52 | 53–62 | 10 | `resp` |
| Adult lung | 63 | 64–74 | 11 | `resp` |

65 image-only pages, which is exactly the count the extraction cache records as
empty. The title page names the authors: Dr Shereen Elgendy, Dr Dhay
Abdalhamed, Dr Sarah Abbas.

**Subject assignment.** `cvs` for the aorta and for the medium-sized artery and
vein, because those are vessel walls and the department teaches them in Chapter I
(Cardiovascular System). `resp` for the trachea and the adult lung, Chapter III
(Respiratory System). `haem` for the lymph node, spleen, tonsil and thymus —
Chapter II is *Lymphatic and Macrophage System*, and the catalogue's subject for
that material is `haem`, "Blood and lymphoreticular"
(`src/data/curriculumCatalog.ts:305`). It is not `imm`: the slides are organ
architecture, not immune mechanism.

---

## What the slides must show

The department's own account of each organ is in the histology book,
`Dpt Book Book of Histology (CPS 104) 2026 1st Year (2).pdf`
(`src_18d3a953df4ca83c4e74`, 53 pages, native).

**The page offset, proved rather than assumed.** This volume is printed as
*Part II* of a three-department book, and a book in parts can carry a different
offset per part. Physical page 4 prints the header `Histology- First Year   3`;
physical page 5 prints `4`; physical page 53 prints `52`. The offset is
**printed = physical − 1**, and it holds unbroken across all 53 pages of this
part, on both odd and even sides. Every printed page cited below has been
resolved through that offset and read.

| Chapter | Printed pages | Physical pages |
|---|---|---|
| I — Cardiovascular System (heart, arteries, veins, A-V connections) | 3–13 | 4–14 |
| II — Lymphatic and Macrophage System (lymph node, spleen, tonsils, thymus, macrophage system) | 14–25 | 15–26 |
| III — Respiratory System (conducting portion, respiratory portion, alveolar phagocytes) | 26–37 | 27–38 |

---

## Format

Each block below is a `media_needed` / `media_recommendations` entry in the
grammar parsed by `parseMediaRequests` (`src/data/bulkImport.ts:485`): a
`### <medium> · <label>` heading, then labelled lines. `Kind:` is drawn from
`MEDIA_REQUEST_KINDS`, `Priority:` from `MEDIA_REQUEST_PRIORITIES`, `Status:`
from `MEDIA_REQUEST_STATUSES` (`src/data/contentControl.ts:104-128`).

A medium-led heading names a **location**, not the brief — so every block here
carries an explicit `Brief:`, and a block without one is silently dropped rather
than rejected. The tail after `·` becomes the request's `Section:`, which must
name a real `###` question heading in the owning item or the literal `station`
(`src/data/bulkImport.ts:962`).

Paste a block into the `media_needed` column of the practical row named above it.

**Counts.** 14 requests · 11 required · 3 strongly helpful · 0 optional.
Ten belong to the four new 104 items; four are routed to existing system-bank
items, as section B explains.

**Priority rule applied here.** `required` means the station cannot be answered
without the image. That is true of every "identify this slide" question, because
the stem carries no text the answer could be read off — the stem exists only to
describe, in words, a field the student is supposed to be looking at.
`strongly helpful` is used where the teaching point survives, degraded, on the
station's main plate: a second tonsil for comparison, a higher-power red pulp.

**Rights, and why every block says the same thing.** These are the university's
own teaching slides. We cannot redistribute them, and no request below asks
anyone to scan the department's PDF. Each asks for an **openly licensed
equivalent** — CC-BY, CC0 or public domain — or for an original slide
photographed by the department and released under an open licence, with the
licence and the photographer recorded before release. The atlas pages are cited
so that a fulfiller knows what the equivalent has to show, not as a source to
copy from.

---

## A · The four lymphoreticular stations

*10 requests. These are the requests carried inline by
`docs/Kasr-Source-Imports/practical/104-CPS-practical.md`; they are reproduced
here so the media catalogue is complete on its own.*

#### Owner: `PRA-HAEM-104-SLIDE-LYMPH-NODE`

### image · station
Brief: Low-power light micrograph of a whole lymph node in section, showing the entire capsule-to-hilum span in one frame, with the capsule, the septa, the cortical follicles, the subcapsular and trabecular sinuses, the paracortex and the medulla all inside the field.
Kind: histology
Purpose: The station asks the student to identify the organ from its architecture and then to name the marked zones. The stem describes the field in words only because no image exists; with the plate, the first question becomes an act of looking rather than of reading.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. The departmental atlas plates themselves are not redistributable — source an equivalent, do not scan the PDF.
Notes: Stain: H&E. Magnification: scanning power (about 4x), the whole node in one frame. Structures that must be visible and markable: thin fibrous capsule; connective-tissue septa running in from its deep surface; rounded cortical follicles; subcapsular and trabecular sinuses as clear spaces; paracortex as a follicle-free band; medullary cords and medullary sinuses; hilum. Corresponds to 104 Tissue  (2) (1).pdf (src_5adcc001e9c3bb86bb75) pp. 3-6. Described in src_18d3a953df4ca83c4e74 at printed pp. 14-17.

### image · The pale centre inside a follicle
Brief: High-power light micrograph of a single secondary lymphatic follicle, with the dark peripheral rim of small lymphocytes and the pale germinal centre both fully in frame, and individual large activated lymphocytes, plasma cells and macrophages resolvable within the centre.
Kind: histology
Purpose: The distinction between a primary and a secondary follicle is a distinction between cell sizes, and it cannot be made at the magnification that shows the whole node. The question is unanswerable without a second, higher-power field.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: high power (about 40x). Structures that must be visible and markable: dark peripheral zone of small lymphocytes; pale germinal centre; large activated B lymphocytes with pale nuclei; plasma cells with eccentric nuclei and basophilic cytoplasm; macrophages. Corresponds to src_5adcc001e9c3bb86bb75 pp. 3-6. Described at printed pp. 15 of src_18d3a953df4ca83c4e74.

#### Owner: `PRA-HAEM-104-SLIDE-SPLEEN`

### image · station
Brief: Low-power light micrograph of the spleen showing the thick capsule, at least two thick trabeculae carrying vessels, and several white-pulp nodules scattered in the red pulp, all in one frame.
Kind: histology
Purpose: The station opens by asking the student to identify the organ from its capsule, trabeculae and parenchymal pattern, none of which can be judged from a written description. Without the plate the first question is a memory test rather than a slide reading.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. The departmental atlas plates are the university's own teaching slides and may not be redistributed — source an equivalent rather than scanning the PDF.
Notes: Stain: H&E. Magnification: scanning to low power (about 4x). Structures that must be visible and markable: thick capsule with serosal covering; thick trabeculae containing trabecular vessels; white-pulp nodules (Malpighian corpuscles) scattered irregularly; red pulp as the background. Corresponds to src_5adcc001e9c3bb86bb75 pp. 8-12. Described in src_18d3a953df4ca83c4e74 at printed pp. 17-20.

### image · The vessel inside the nodule
Brief: High-power light micrograph of a single splenic white-pulp nodule with the eccentric central arteriole clearly visible, and the periarteriolar sheath, germinal centre, follicular zone and marginal zone all distinguishable in the same field.
Kind: histology
Purpose: Two questions in this set turn on the arteriole and on the concentric order of the four zones. Both need a magnification at which the arteriolar wall and the zone boundaries can be seen at once, which the whole-organ view cannot give.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: high power (about 40x). Structures that must be visible and markable: central (follicular) arteriole with its muscular wall, lying eccentrically; periarteriolar lymphatic sheath; germinal centre; follicular zone; marginal zone at the periphery. Corresponds to src_5adcc001e9c3bb86bb75 pp. 8-12. Described at printed pp. 18 of src_18d3a953df4ca83c4e74.

### image · The background the nodules sit in
Brief: High-power light micrograph of splenic red pulp showing Billroth cords packed with blood cells alongside a wide barrel-shaped sinusoid whose elongated stave-cell lining and the gaps between those cells are individually resolvable.
Kind: histology
Purpose: The teaching point is that the sinusoidal wall is discontinuous, and a discontinuity has to be seen to be believed — at lower power the sinusoid reads as an ordinary space and the question loses its answer.
Priority: strongly helpful
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: high power (about 40x). Structures that must be visible and markable: splenic (Billroth) cords with erythrocytes and leucocytes; blood sinusoid with elongated stave cells; intercellular gaps in the sinusoidal lining; littoral macrophages in and around the wall. Corresponds to src_5adcc001e9c3bb86bb75 pp. 8-12. Described at printed pp. 18 of src_18d3a953df4ca83c4e74.

#### Owner: `PRA-HAEM-104-SLIDE-TONSIL`

### image · station
Brief: Low-power light micrograph of a palatine tonsil showing the non-keratinised stratified squamous surface epithelium, at least two tonsillar crypts running into the lymphoid tissue, the nodules arranged around them, and the dense connective tissue of the deep aspect.
Kind: histology
Purpose: The identification turns on the relationship between an epithelial surface, the crypts it forms and the nodules around them — a spatial relationship that a written stem can assert but not demonstrate.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. The departmental atlas plates may not be redistributed — source an openly licensed equivalent instead of scanning the PDF.
Notes: Stain: H&E. Magnification: scanning to low power (about 4x). Structures that must be visible and markable: non-keratinised stratified squamous epithelium; tonsillar crypts with their contents; lymphatic nodules with germinal centres around the crypts; diffuse lymphatic tissue; incomplete dense connective-tissue capsule on the deep aspect. Corresponds to src_5adcc001e9c3bb86bb75 pp. 14-16. Described in src_18d3a953df4ca83c4e74 at printed pp. 20-21.

### image · Two tonsils, two fates for the crypts
Brief: Low-power light micrograph of a lingual tonsil at the base of the tongue, with a crypt in frame and the duct of a mucous gland visibly opening into the base of that crypt.
Kind: histology
Purpose: The comparison question rests on where the gland duct opens, which is a single visible junction. Without a plate that shows the duct entering the crypt base, the answer can only be recited.
Priority: strongly helpful
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: low power (about 10x). Structures that must be visible and markable: non-keratinised stratified squamous epithelium; crypt; mucous gland with its duct opening into the crypt base; lymphatic nodules; absence of a capsule at the deep aspect. Corresponds to src_5adcc001e9c3bb86bb75 pp. 14-16. Described at printed pp. 21 of src_18d3a953df4ca83c4e74.

### image · The tonsil that has no crypts
Brief: Low-power light micrograph of a pharyngeal tonsil showing folded pseudostratified columnar ciliated epithelium with goblet cells over lymphoid tissue containing nodules, with no crypts present.
Kind: histology
Purpose: The question asks the student to place the specimen from its epithelium and to note the absence of crypts. An absence cannot be shown in prose without giving the answer away; on a plate it is simply what is there to be seen.
Priority: strongly helpful
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: low power (about 10x). Structures that must be visible and markable: folded pseudostratified columnar ciliated epithelium with goblet cells; lymphatic nodules; incomplete connective-tissue capsule; absence of crypts. Corresponds to src_5adcc001e9c3bb86bb75 pp. 14-16. Described at printed pp. 22 of src_18d3a953df4ca83c4e74.

#### Owner: `PRA-HAEM-104-SLIDE-THYMUS`

### image · station
Brief: Low-power light micrograph of the thymus showing several incompletely separated lobules, each with a dark cortex and a pale medulla, the medullae of adjacent lobules visibly continuous, and at least one Hassall's corpuscle in frame.
Kind: histology
Purpose: The identification depends on lobulation, on the cortex-medulla contrast and on the continuity of the medullae between lobules. All three are relationships between regions of the field and cannot be judged from a written description.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. The departmental atlas plates are the university's own teaching slides and may not be redistributed — an openly licensed equivalent is required.
Notes: Stain: H&E. Magnification: scanning to low power (about 4x). Structures that must be visible and markable: thin capsule; thin septa producing incomplete lobules; darkly staining cortex; pale medulla; continuity of medulla between adjacent lobules; Hassall's corpuscles. Corresponds to src_5adcc001e9c3bb86bb75 pp. 18-21. Described in src_18d3a953df4ca83c4e74 at printed pp. 22-24.

### image · The bodies in the pale zone
Brief: High-power light micrograph of a single Hassall's corpuscle, with the acidophilic degenerating centre and the concentric layers of flattened epithelial reticular cells around it both clearly resolved.
Kind: histology
Purpose: The corpuscle is the structure that names the organ, and the question asks the student to describe its construction. At the magnification that shows the lobules it is only a dot.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: high power (about 40x). Structures that must be visible and markable: central acidophilic mass of degenerating reticular cells; concentric layers of flattened epithelial reticular cells; surrounding medullary lymphocytes for scale. Corresponds to src_5adcc001e9c3bb86bb75 pp. 18-21. Described at printed pp. 23 of src_18d3a953df4ca83c4e74.

---

## B · The four cardiovascular and respiratory stations

*4 requests, and they do **not** belong to a new 104 item.*

The aorta, the medium-sized artery and vein, the trachea and the adult lung are
already taught by slide-identification items in the system banks, and those
items already exist in `docs/import-ready/practical/`. Authoring a second set for
104 would be re-authoring an existing station, so this lane did not. What the
104 atlas adds is not new questions but the plates those existing items are
still waiting for — and the atlas is where a fulfiller can see exactly which
slide the department examines on.

| 104 station | Existing item that already teaches it | File |
|---|---|---|
| Aorta | `PRA-CVS-LAB-SLIDE-ARTERIES` — "Slide: telling an elastic artery from a muscular one" | `docs/import-ready/practical/SYS-CVS-PRACTICAL-007.md` |
| Medium-sized artery & vein | `PRA-CVS-LAB-SLIDE-ARTERIES`, and "Slide: venules, veins and the vessels that bypass the bed" | `docs/import-ready/practical/SYS-CVS-PRACTICAL-007.md` |
| Trachea | "Slide: the trachea, layer by layer" | `docs/import-ready/practical/SYS-RES-PRACTICAL-006.md` |
| Adult lung | "Slide: the alveolus, its cells and the pleural space"; "Slide: which alveolar cell, and why it matters" | `docs/import-ready/practical/SYS-RES-PRACTICAL-005.md`, `SYS-RES-PRACTICAL-009.md` |

Paste each block below into the `media_needed` column of the item named above
it. Each names `station` as its section, because each is the whole slide the
item is built around rather than the illustration of one question.

#### Owner: `PRA-CVS-LAB-SLIDE-ARTERIES` (SYS-CVS-PRACTICAL-007)

### image · station
Brief: Transverse light micrograph of the wall of the aorta, spanning lumen to adventitia in one frame, with the concentric fenestrated elastic membranes of the tunica media resolvable as separate layers and the vasa vasorum visible in the adventitia.
Kind: histology
Purpose: The item asks the student to recognise an elastic artery from a media dominated by concentric elastic sheets rather than by muscle. That is a judgement about the proportion of two tissues across the wall, and it cannot be made without the wall in front of them.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence. An elastic stain (orcein, Verhoeff or resorcin-fuchsin) alongside the H&E field would be ideal.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. The department's own atlas plates may not be redistributed.
Notes: Stain: H&E, and an elastic stain if a second field can be sourced. Magnification: low power (about 10x) for the full wall thickness. Structures that must be visible and markable: endothelium; thick subendothelial connective tissue; internal elastic lamina, deliberately inconspicuous here; tunica media with 40-70 concentric fenestrated elastic membranes; tunica adventitia with longitudinal collagen and vasa vasorum. Corresponds to 104 Tissue  (2) (1).pdf (src_5adcc001e9c3bb86bb75) pp. 23-34, the twelve image-only plates behind the "Aorta" divider on p. 22 — the largest single station in the atlas. Described in src_18d3a953df4ca83c4e74 at printed pp. 6.

### image · station
Brief: One low-power light micrograph containing a medium-sized muscular artery and its accompanying vein side by side in the same field, so that wall thickness, lumen shape and the elastic laminae can be compared without changing slide.
Kind: histology
Purpose: The department examines the artery and the vein as a comparison, and every point of the comparison — thick against thin wall, rounded against collapsed lumen, a clear internal elastic lamina against none — is a relative judgement that needs both vessels in one frame.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original neurovascular-bundle slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: low power (about 10x), both vessels in one field. Structures that must be visible and markable: in the artery — thick wall, narrow rounded lumen, folded intima, prominent internal elastic lamina, thick muscular media, external elastic lamina where present, thin adventitia; in the vein — thin wall, wide collapsed lumen, no internal elastic lamina, thin media, thick adventitia; a valve if the plane of section allows. Corresponds to src_5adcc001e9c3bb86bb75 pp. 36-51, the sixteen image-only plates behind the "Medium A & V" divider on p. 35. Described in src_18d3a953df4ca83c4e74 at printed pp. 7 and 9, where the department sets the comparison out as a table.

#### Owner: "Slide: the trachea, layer by layer" (SYS-RES-PRACTICAL-006)

### image · station
Brief: Transverse light micrograph of the tracheal wall spanning lumen to adventitia in one frame, with the pseudostratified ciliated columnar epithelium, the submucosal seromucous glands and a hyaline cartilage ring all present in the same field.
Kind: histology
Purpose: The item asks the student to name the four layers in order and to use the glands and the cartilage to place a section along the airway. Both depend on seeing the layers in their true relative thicknesses, which no description supplies.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. The department's own atlas plates may not be redistributed.
Notes: Stain: H&E. Magnification: low power (about 10x) for the full wall, with a high-power inset of the epithelium if a second field can be sourced. Structures that must be visible and markable: respiratory epithelium with cilia and goblet cells; lamina propria; elastic membrane; submucosa with mucous and serous glands and lymphoid nodules; fibrocartilaginous coat with a C-shaped hyaline cartilage ring and its perichondrium; adventitia; trachealis muscle at the free ends of the ring if the section reaches the posterior wall. Corresponds to src_5adcc001e9c3bb86bb75 pp. 53-62, behind the "Trachea" divider on p. 52. Described in src_18d3a953df4ca83c4e74 at printed pp. 31-32.

#### Owner: "Slide: the alveolus, its cells and the pleural space" (SYS-RES-PRACTICAL-005)

### image · station
Brief: Low-power light micrograph of adult lung showing alveoli, an alveolar duct, a respiratory bronchiole and an accompanying pulmonary vessel in one frame, with the interalveolar septa thin enough that individual capillaries within them can be made out.
Kind: histology
Purpose: The item asks the student to place a small airway on the tree and to identify the alveolar wall as the exchange surface. Both are judgements about the relative size and wall structure of neighbouring spaces, which only a single field containing several of them can support.
Priority: required
Status: needed
Source direction: An openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department and released under an open licence.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission recorded before release. Record the licence and the photographer.
Notes: Stain: H&E. Magnification: low power (about 10x), with a high-power field of an interalveolar septum if a second image can be sourced. Structures that must be visible and markable: alveoli; interalveolar septa with their capillary network; alveolar duct with smooth muscle knobs limited to the alveolar openings; respiratory bronchiole with cuboidal epithelium and interrupted wall; alveolar macrophages (dust cells) in or on the septa; a branch of the pulmonary vessel; visceral pleura if the section includes the surface. Corresponds to src_5adcc001e9c3bb86bb75 pp. 64-74, behind the "Adult lung" divider on p. 63. Described in src_18d3a953df4ca83c4e74 at printed pp. 34-36.

---

## Concept links still pending

The four lymphoreticular items in
`docs/Kasr-Source-Imports/practical/104-CPS-practical.md` have **no
`main_concept` and no per-question `Concept:` lines**, and the batch validator
reports twenty-four errors for exactly that reason. Nothing was minted to
silence them.

The reason is not an oversight. A search of live state
(`server/data/medical-library-v1.json`, 1 718 concepts) returns **no concept
describing the histological structure of the lymph node, spleen, tonsil or
thymus**. The nearest matches are functional immunology
(`CON-IMM-CAD8E07F90B2C2`, "a lymphoid organ is organized tissue where
lymphocytes interact…") and haematology (`CON-HEM-F4A6018FB59FDD`,
"hematopoiesis is blood-cell formation in bone marrow and lymphatic organs such
as thymus"). Neither is what these stations assess, and tagging them would award
mastery evidence a student never earned.

There is also no column to record the gap in. The practical import schema has
**no `field_notes` key** — its 25 columns are `id title subject status owner type
duration marks difficulty candidate_instructions actor_opening actor_sections
station_image actor_flags mark_scheme decisions debrief lab_subtype lab_questions
module_subject main_concept concept_ids contextual_concept_ids learning_objective
media_needed media_recommendations references` — and an unknown column is a
validator error in its own right. So the pending links are recorded here.

| Item | Question | Concept it needs |
|---|---|---|
| `PRA-HAEM-104-SLIDE-LYMPH-NODE` | main | Lymph node structure: capsule, septa, cortex of follicles, paracortex, medulla of cords and sinuses |
| | 1 | A lymph node is identified by a thin capsule, septa, regular cortical follicles bounded by lymph sinuses, and a medulla of cords |
| | 2 | A germinal centre marks a secondary lymphatic follicle that has met antigen |
| | 3 | The paracortex is the thymus-dependent zone, entered by T lymphocytes through cubical-lined post-capillary venules |
| | 4 | Medullary cords and medullary sinuses; macrophages lining the sinuses filter the lymph |
| | 5 | A central arteriole and the absence of lymph sinuses distinguish spleen from lymph node |
| `PRA-HAEM-104-SLIDE-SPLEEN` | main | Splenic structure: thick capsule and trabeculae, white pulp on a central arteriole, red pulp of cords and sinusoids |
| | 1 | The spleen is identified by a thick muscular capsule, thick hilar trabeculae, and nodules scattered in red pulp |
| | 2 | Every splenic white-pulp nodule is built on an eccentric central (follicular) arteriole |
| | 3 | The four zones of splenic white pulp outwards from the arteriole: PALS, germinal centre, follicular zone, marginal zone |
| | 4 | Splenic (Billroth) cords and stave-cell sinusoids with discontinuous walls |
| | 5 | Open, closed and open-and-closed theories of splenic circulation |
| `PRA-HAEM-104-SLIDE-TONSIL` | main | Tonsillar structure: covering epithelium, crypts, nodules and incomplete capsule, and the three types |
| | 1 | A palatine tonsil is stratified squamous epithelium dipping into lymphoid tissue as crypts |
| | 2 | Tonsils are incompletely encapsulated: capsule on the deep aspect, epithelium on the free surface |
| | 3 | Lingual tonsil mucous ducts open into the crypt bases, so its crypts are washed |
| | 4 | The pharyngeal tonsil is single, midline, crypt-free, and covered by respiratory epithelium |
| | 5 | Tonsillar crypts enlarge the epithelial surface exposed to swallowed and inhaled antigen |
| `PRA-HAEM-104-SLIDE-THYMUS` | main | Thymic structure: incomplete lobules, dark cortex, pale continuous medulla, Hassall's corpuscles, blood-thymic barrier |
| | 1 | The thymus is identified by incomplete lobules with a dark cortex and a pale medulla continuous between lobules |
| | 2 | A Hassall's corpuscle is a concentric epithelial body with a degenerating acidophilic centre, found only in the thymic medulla |
| | 3 | Thymic epithelial reticular cells are endodermal and produce no reticular fibres |
| | 4 | The thymus has no afferent lymphatics, which keeps circulating antigen away from thymocytes under selection |
| | 5 | The four layers of the blood-thymic barrier, and its confinement to the cortex |

**The validator has no way to accept these before they are live.** The `--with`
flag that lets a question batch name a sibling concept file is implemented only
in the question branch of `scripts/validate-content-batch.mjs` (lines 148 and
170); the practical branch resolves concepts against live state alone. So this
batch will keep reporting those twenty-four errors until the 104 concept batch
is not merely authored but **imported**. That is a sequencing fact about the
tooling, not a defect in this file.

---

## What could not be authored, and why

**`نموذج داتا شو امتحان هستو 104 (2).pdf` — `src_bf0d646ac5ee8c604b84`, 6
pages.** Read and yielded nothing usable. This is the department's "data show"
histology exam paper: an image-only document whose text layer is OCR of
photographs of slides. Five of the six pages decode to noise — runs such as
`Se ST a eS Se Samat) eg` with no recoverable words. Page 2 is the single
exception and decodes far enough to show a trachea labelling key
(`elastic mem`, `lymph follicle`, `mucous gland`, `serous gland`,
`Perrichondrium`, `hyaline cartilage`, `losse areolar CT`, against `Sub mucosa`,
`Fibrocartilagenous`, `Adentitia`), and page 3 preserves the exam's answer
format — *"a. This is a section in …; b. Red arrow points to …; c. Blue circle
surrounds …; d. Green arrow points to …; e. Numbers denote …"*. That is enough
to corroborate the trachea labelling scheme and to show what shape the real
exam takes; it is nowhere near enough to author from, and nothing in this lane
was authored from it. The file is the strongest evidence that 104's practical
assessment is image-based end to end, and it will need a human with the PDF open
before it yields anything more. **Do not re-run OCR on it** — per
`scripts/kasr/extract/README.md`, a re-run replaces the committed result rather
than checking it.

**`عملى فسيو 104 باقون (2).pdf` — `src_a6f58d72c52b74c95aa3`, 5 pages.** Read;
not authored here, and it is not what its description says. It is a set of five
*physiology* formative practical sheets with a student's handwritten answers,
and only the first is spirometry (three forced-expiratory curves, FEV₁ 4.0 L /
FVC 5.0 L, 1.2 / 3.0 and 2.7 / 3.0, with FEV₁/FVC to be calculated, plus the
Bohr equation for dead space). The other four are arterial blood pressure
measurement, the jugular venous pulse, the frog heart experiment and ECG
components. The spirometry sheet duplicates
"Spirometry: telling obstruction from restriction"
(`docs/import-ready/practical/SYS-RES-PRACTICAL-007.md`); the blood pressure,
JVP and ECG sheets duplicate items in `SYS-CVS-PRACTICAL-001`, `-002` and
`-006`. Only the frog heart is genuinely uncovered, and it needs concepts that
do not exist live either.

**`CPS-104 (practical revision) (1).pdf` — `src_5d6b69ff19de4e1c5ba5`, 115
pages, OCR'd.** Read in full; not authored here, because it is a physiology
practical revision deck rather than histology, and this lane's claim was the
slide bank. It is the largest unworked practical source in the module and worth
naming for whoever takes it next: lung volumes and capacities, timed vital
capacity, MVV, dead space and the Bohr equation, alveolar ventilation, apnoea
types, the frog heart experiments (pacemaker, temperature, extrasystole, heart
block), arterial and carotid pulse, jugular venous pulse, heart sounds and
murmurs, blood pressure measurement, a 33-page ECG section, the Hess tourniquet
test for capillary fragility, the white line and triple response, and the
demonstration of venous blood flow. An anti-duplication pass found **no existing
record** for "frog", "Hess", "triple response", "dead space" or "capillary
fragility" — five genuinely open stations, all of them blocked on the same
missing concepts.

---

## Anti-duplication pass

Run with `node "Instruction Manual for Content Creation/tools/find-existing.mjs"
<term>`, which is a plain substring search, so the shortest distinctive word is
the best query.

| Query | Result | Consequence |
|---|---|---|
| `spleen` | 5 records, all functional haematology (aged RBCs, platelet storage) | No splenic histology station exists. Authored. |
| `thymus` | 3 records: one haematopoiesis concept, one glossary term | No thymic histology station exists. Authored. |
| `tonsil` | 6 records: nasopharyngeal lamina propria, two glossary word-parts | No tonsil station exists. Authored. |
| `lymph` | 25 records, all immunology, anatomy or drainage | No lymph node histology station exists. Authored. |
| `trachea` | 14 records, including three pending slide items | Already covered — not re-authored; media request routed to `SYS-RES-PRACTICAL-006`. |
| `aorta` | 22 records, including `CON-CVS-182A0AD30A3730` "Elastic arteries" and `PRA-CVS-LAB-SLIDE-ARTERIES` | Already covered — not re-authored; media request routed to `SYS-CVS-PRACTICAL-007`. |
| `spirom` | 10 records, including four pending spirometry items | Already covered — not authored. |
| `frog`, `Hess`, `triple response`, `dead space`, `capillary fragility` | "No existing record matches" | Open; blocked on concepts, see above. |
