<!--
  Article spans for 104 CPS — the sentence-level link between what a student
  reads in ../article/104-CPS-articles.md and the claims that support it.

  Every 'text' is an exact substring of the article section it names, checked
  against the committed batch before this file was written. section_id follows
  the importer's own rule (parseSections in src/data/bulkImport.ts): the article
  id lower-cased, then the heading slug, so a span survives a section being
  inserted or reordered.

  text_hash is left out on purpose. spanFromRow derives it from the text when it
  is absent, which is what keeps a span attached to its sentence through a
  reflow; writing one by hand would only be a chance to write it wrong.

  58 spans across all 13 articles. Every claim in ./104-CPS-claims.md is named by
  at least one span. Coverage is heaviest on ART-104-HIS-LYMPHOID-ORGANS, which
  carries 19 of the module's 39 concepts.
-->

# Item
## id
SPN-104-PHY-AP-01
## article_id
ART-104-PHY-CARDIAC-ACTION-POTENTIAL
## section_id
art-104-phy-cardiac-action-potential-mechanism
## text
Phase 1 is a rapid, small initial repolarization — the notch that follows the peak.
## claim_ids
CLM-104-PHY-AP-PHASE1-01
## citation_ids
CIT-104-PHY-AP-PHASE1-01-LOCAL

---

# Item
## id
SPN-104-PHY-AP-02
## article_id
ART-104-PHY-CARDIAC-ACTION-POTENTIAL
## section_id
art-104-phy-cardiac-action-potential-mechanism
## text
It is a balance between two opposing currents of comparable size.
## claim_ids
CLM-104-PHY-AP-PHASE2-01
## citation_ids
CIT-104-PHY-AP-PHASE2-01-BALANCE | CIT-104-PHY-AP-PHASE2-01-CONFLICT

---

# Item
## id
SPN-104-PHY-AP-03
## article_id
ART-104-PHY-CARDIAC-ACTION-POTENTIAL
## section_id
art-104-phy-cardiac-action-potential-mechanism
## text
Calcium enters through long-lasting, L-type calcium channels, carrying the current known as ICaL.
## claim_ids
CLM-104-PHY-AP-PHASE2-01
## citation_ids
CIT-104-PHY-AP-PHASE2-01-BALANCE | CIT-104-PHY-AP-PHASE2-01-CONFLICT

---

# Item
## id
SPN-104-PHY-PUMP-01
## article_id
ART-104-PHY-CARDIAC-PUMP-FUNCTION
## section_id
art-104-phy-cardiac-pump-function-definition
## text
It runs in two phases, rapid ejection and reduced ejection, and both of them run with the valves open.
## claim_ids
CLM-104-PHY-EJECTION-PHASES-01
## citation_ids
CIT-104-PHY-EJECTION-PHASES-01-LOCAL

---

# Item
## id
SPN-104-PHY-PUMP-02
## article_id
ART-104-PHY-CARDIAC-PUMP-FUNCTION
## section_id
art-104-phy-cardiac-pump-function-mechanism
## text
The arithmetic of the loop follows: end-diastolic volume of about 130 ml minus end-systolic volume of about 60 ml gives a stroke volume of about 70 ml.
## claim_ids
CLM-104-PHY-STROKE-VOLUME-ARITHMETIC-01
## citation_ids
CIT-104-PHY-STROKE-VOLUME-ARITHMETIC-01-LOCAL

---

# Item
## id
SPN-104-PHY-PUMP-03
## article_id
ART-104-PHY-CARDIAC-PUMP-FUNCTION
## section_id
art-104-phy-cardiac-pump-function-mechanism
## text
Increased inotropy shifts the end-systolic pressure-volume relation upwards and to the left.
## claim_ids
CLM-104-PHY-INOTROPY-ESPVR-01
## citation_ids
CIT-104-PHY-INOTROPY-ESPVR-01-LOOP | CIT-104-PHY-INOTROPY-ESPVR-01-SLOPE

---

# Item
## id
SPN-104-PHY-PUMP-04
## article_id
ART-104-PHY-CARDIAC-PUMP-FUNCTION
## section_id
art-104-phy-cardiac-pump-function-key-determinants
## text
Heart rate reserve is the span between the resting rate, about 75 per minute, and the maximal rate, estimated as 220 minus age in years — approximately 200 beats per minute in a normal young adult.
## claim_ids
CLM-104-PHY-CARDIAC-RESERVE-01
## citation_ids
CIT-104-PHY-CARDIAC-RESERVE-01-LOCAL

---

# Item
## id
SPN-104-PHY-PUMP-05
## article_id
ART-104-PHY-CARDIAC-PUMP-FUNCTION
## section_id
art-104-phy-cardiac-pump-function-key-determinants
## text
Stroke volume reserve is the span between about 70 ml at rest and up to 200 ml at maximal exercise.
## claim_ids
CLM-104-PHY-STROKE-VOLUME-RESERVE-01
## citation_ids
CIT-104-PHY-STROKE-VOLUME-RESERVE-01-LOCAL

---

# Item
## id
SPN-104-PHY-VR-01
## article_id
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX
## section_id
art-104-phy-venous-return-and-baroreflex-mechanism
## text
Raising it shifts the venous return curve up and to the right without changing its slope, so at any given right atrial pressure venous return is greater; lowering it shifts the curve down and to the left.
## claim_ids
CLM-104-PHY-MSFP-VR-CURVE-01 | CLM-104-PHY-MSFP-VALUE-01
## citation_ids
CIT-104-PHY-MSFP-VR-CURVE-01-LOCAL | CIT-104-PHY-MSFP-VALUE-01-LOCAL

---

# Item
## id
SPN-104-PHY-VR-02
## article_id
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX
## section_id
art-104-phy-venous-return-and-baroreflex-mechanism
## text
During inspiration the intrapleural pressure falls from about -4 mmHg to about -8 mmHg.
## claim_ids
CLM-104-PHY-THORACIC-PUMP-01
## citation_ids
CIT-104-PHY-THORACIC-PUMP-01-LOCAL

---

# Item
## id
SPN-104-PHY-VR-03
## article_id
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX
## section_id
art-104-phy-venous-return-and-baroreflex-mechanism
## text
Both are called buffer nerves and both end in the nucleus of the tractus solitarius.
## claim_ids
CLM-104-PHY-BARORECEPTOR-SITE-01
## citation_ids
CIT-104-PHY-BARORECEPTOR-SITE-01-LOCAL

---

# Item
## id
SPN-104-PHY-VR-04
## article_id
ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX
## section_id
art-104-phy-venous-return-and-baroreflex-mechanism
## text
When arterial pressure rises, baroreceptor discharge increases.
## claim_ids
CLM-104-PHY-BAROREFLEX-OPPOSES-01
## citation_ids
CIT-104-PHY-BAROREFLEX-OPPOSES-01-LOCAL

---

# Item
## id
SPN-104-PHY-LR-01
## article_id
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## section_id
art-104-phy-lung-recoil-and-surfactant-definition
## text
Intrapleural pressure is negative because of the continuous tendency of the lungs to recoil inwards against the continuous tendency of the chest wall to expand outwards.
## claim_ids
CLM-104-PHY-LUNG-RECOIL-SOURCES-01
## citation_ids
CIT-104-PHY-LUNG-RECOIL-SOURCES-01-LOCAL

---

# Item
## id
SPN-104-PHY-LR-02
## article_id
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## section_id
art-104-phy-lung-recoil-and-surfactant-mechanism
## text
The lung's inward recoil comes from two sources.
## claim_ids
CLM-104-PHY-LUNG-RECOIL-SOURCES-01
## citation_ids
CIT-104-PHY-LUNG-RECOIL-SOURCES-01-LOCAL

---

# Item
## id
SPN-104-PHY-LR-03
## article_id
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## section_id
art-104-phy-lung-recoil-and-surfactant-definition
## text
Pulmonary surfactant is secreted by the type II alveolar cells.
## claim_ids
CLM-104-PHY-SURFACTANT-SOURCE-01
## citation_ids
CIT-104-PHY-SURFACTANT-SOURCE-01-LOCAL

---

# Item
## id
SPN-104-PHY-LR-04
## article_id
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## section_id
art-104-phy-lung-recoil-and-surfactant-mechanism
## text
First, it facilitates lung expansion: less surface tension means less effort is needed to distend the lung during inspiration.
## claim_ids
CLM-104-PHY-SURFACTANT-FUNCTIONS-01
## citation_ids
CIT-104-PHY-SURFACTANT-FUNCTIONS-01-LOCAL

---

# Item
## id
SPN-104-PHY-ODC-01
## article_id
ART-104-PHY-OXYGEN-DISSOCIATION-CURVE
## section_id
art-104-phy-oxygen-dissociation-curve-definition
## text
P50 is the partial pressure of oxygen at which haemoglobin is 50 per cent saturated.
## claim_ids
CLM-104-PHY-ODC-P50-01
## citation_ids
CIT-104-PHY-ODC-P50-01-LOCAL

---

# Item
## id
SPN-104-PHY-ODC-02
## article_id
ART-104-PHY-OXYGEN-DISSOCIATION-CURVE
## section_id
art-104-phy-oxygen-dissociation-curve-mechanism
## text
A decrease in temperature, a decrease in PCO2 and an increase in pH all move the curve left.
## claim_ids
CLM-104-PHY-ODC-LEFT-SHIFT-01
## citation_ids
CIT-104-PHY-ODC-LEFT-SHIFT-01-CHEM | CIT-104-PHY-ODC-LEFT-SHIFT-01-CO | CIT-104-PHY-ODC-LEFT-SHIFT-01-HBF

---

# Item
## id
SPN-104-PHY-ODC-03
## article_id
ART-104-PHY-OXYGEN-DISSOCIATION-CURVE
## section_id
art-104-phy-oxygen-dissociation-curve-mechanism
## text
A fall in 2,3-DPG therefore shifts the curve to the left.
## claim_ids
CLM-104-PHY-ODC-LEFT-SHIFT-01
## citation_ids
CIT-104-PHY-ODC-LEFT-SHIFT-01-CHEM | CIT-104-PHY-ODC-LEFT-SHIFT-01-CO | CIT-104-PHY-ODC-LEFT-SHIFT-01-HBF

---

# Item
## id
SPN-104-ANA-TWV-01
## article_id
ART-104-ANA-THORACIC-WALL-VEINS
## section_id
art-104-ana-thoracic-wall-veins-overview-and-position
## text
There are eleven posterior intercostal veins and a subcostal vein on each side.
## claim_ids
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01 | CLM-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01
## citation_ids
CIT-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01-LOCAL | CIT-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01-LOCAL

---

# Item
## id
SPN-104-ANA-TWV-02
## article_id
ART-104-ANA-THORACIC-WALL-VEINS
## section_id
art-104-ana-thoracic-wall-veins-structure
## text
The second, third and fourth unite to form the right superior intercostal vein, which ends in the arch of the azygos vein.
## claim_ids
CLM-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01
## citation_ids
CIT-104-ANA-POST-INTERCOSTAL-VEINS-RIGHT-01-LOCAL

---

# Item
## id
SPN-104-ANA-TWV-03
## article_id
ART-104-ANA-THORACIC-WALL-VEINS
## section_id
art-104-ana-thoracic-wall-veins-structure
## text
The fifth, sixth, seventh and eighth open into the superior hemiazygos vein, which begins as a continuation of the fifth and ends in the azygos vein.
## claim_ids
CLM-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01
## citation_ids
CIT-104-ANA-POST-INTERCOSTAL-VEINS-LEFT-01-LOCAL

---

# Item
## id
SPN-104-ANA-PM-01
## article_id
ART-104-ANA-PLEURA-AND-MEDIASTINUM
## section_id
art-104-ana-pleura-and-mediastinum-blood-supply-innervation-and-lymphatics
## text
It is not sensitive to somatic stimuli such as pain and temperature.
## claim_ids
CLM-104-ANA-PLEURA-NERVE-SUPPLY-01
## citation_ids
CIT-104-ANA-PLEURA-NERVE-SUPPLY-01-LOCAL

---

# Item
## id
SPN-104-ANA-PM-02
## article_id
ART-104-ANA-PLEURA-AND-MEDIASTINUM
## section_id
art-104-ana-pleura-and-mediastinum-structure
## text
Behind lie the lower eight thoracic vertebrae, T5 to T12.
## claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01
## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-BOUNDARIES-01-LOCAL

---

# Item
## id
SPN-104-ANA-PM-03
## article_id
ART-104-ANA-PLEURA-AND-MEDIASTINUM
## section_id
art-104-ana-pleura-and-mediastinum-structure
## text
Arteries: the descending thoracic aorta and its branches.
## claim_ids
CLM-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01
## citation_ids
CIT-104-ANA-POSTERIOR-MEDIASTINUM-CONTENTS-01-LOCAL

---

# Item
## id
SPN-104-ANA-CA-01
## article_id
ART-104-ANA-CORONARY-ARTERIES
## section_id
art-104-ana-coronary-arteries-overview-and-position
## text
The division occurs at the upper end of the anterior interventricular groove, and that is where the circumflex begins.
## claim_ids
CLM-104-ANA-CIRCUMFLEX-ORIGIN-END-01
## citation_ids
CIT-104-ANA-CIRCUMFLEX-ORIGIN-END-01-LOCAL

---

# Item
## id
SPN-104-ANA-CA-02
## article_id
ART-104-ANA-CORONARY-ARTERIES
## section_id
art-104-ana-coronary-arteries-structure
## text
It ends there by anastomosing with the right coronary artery.
## claim_ids
CLM-104-ANA-CIRCUMFLEX-ORIGIN-END-01
## citation_ids
CIT-104-ANA-CIRCUMFLEX-ORIGIN-END-01-LOCAL

---

# Item
## id
SPN-104-ANA-CA-03
## article_id
ART-104-ANA-CORONARY-ARTERIES
## section_id
art-104-ana-coronary-arteries-structure
## text
The artery to the sinu-atrial node, present in 40 per cent of people.
## claim_ids
CLM-104-ANA-CIRCUMFLEX-BRANCHES-01
## citation_ids
CIT-104-ANA-CIRCUMFLEX-BRANCHES-01-LOCAL

---

# Item
## id
SPN-104-ANA-AA-01
## article_id
ART-104-ANA-AORTIC-ARCH-AND-ITS-DEVELOPMENT
## section_id
art-104-ana-aortic-arch-and-its-development-development
## text
The stem and the left horn together form the proximal part of the arch of the aorta.
## claim_ids
CLM-104-ANA-AORTIC-SAC-FATE-01
## citation_ids
CIT-104-ANA-AORTIC-SAC-FATE-01-LOCAL

---

# Item
## id
SPN-104-ANA-AA-02
## article_id
ART-104-ANA-AORTIC-ARCH-AND-ITS-DEVELOPMENT
## section_id
art-104-ana-aortic-arch-and-its-development-development
## text
The right horn forms the brachiocephalic artery, which is continuous with the right common carotid artery, derived from the third aortic arch, and with the right subclavian artery, derived from the fourth.
## claim_ids
CLM-104-ANA-AORTIC-SAC-FATE-01
## citation_ids
CIT-104-ANA-AORTIC-SAC-FATE-01-LOCAL

---

# Item
## id
SPN-104-ANA-AA-03
## article_id
ART-104-ANA-AORTIC-ARCH-AND-ITS-DEVELOPMENT
## section_id
art-104-ana-aortic-arch-and-its-development-clinical-correlations
## text
A localised dilatation of the arch compresses the contents of the superior mediastinum and produces the mediastinal syndrome.
## claim_ids
CLM-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01
## citation_ids
CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-ANEURYSM | CIT-104-ANA-AORTIC-ANEURYSM-MEDIASTINAL-SYNDROME-01-SYNDROME

---

# Item
## id
SPN-104-HIS-LO-01
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-definition
## text
The lymph node is a bean- or kidney-shaped encapsulated lymphatic organ lying along the course of lymphatic vessels, with a convex surface receiving afferent lymphatics and a concave surface, the hilum, where arteries enter and veins and efferent lymphatics leave.
## claim_ids
CLM-104-HIS-LYMPH-NODE-ARCHITECTURE-01
## citation_ids
CIT-104-HIS-LYMPH-NODE-ARCHITECTURE-01-SHAPE | CIT-104-HIS-LYMPH-NODE-ARCHITECTURE-01-STROMA

---

# Item
## id
SPN-104-HIS-LO-02
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-definition
## text
Tonsils are aggregations of lymphatic tissue that are incompletely encapsulated, and there are three: palatine, lingual and pharyngeal.
## claim_ids
CLM-104-HIS-TONSIL-CAPSULE-01
## citation_ids
CIT-104-HIS-TONSIL-CAPSULE-01-CLASS | CIT-104-HIS-TONSIL-CAPSULE-01-LINGUAL

---

# Item
## id
SPN-104-HIS-LO-03
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-definition
## text
The spleen is the large, single, intra-abdominal haemolymphatic organ, situated along the course of the blood stream so that it can filter blood.
## claim_ids
CLM-104-HIS-SPLEEN-STROMA-01 | CLM-104-HIS-NODE-VS-SPLEEN-01
## citation_ids
CIT-104-HIS-SPLEEN-STROMA-01-LOCAL | CIT-104-HIS-NODE-VS-SPLEEN-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-04
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-definition
## text
It has a double origin: mesodermal for its lymphocytes, endodermal for its epithelial reticular cells.
## claim_ids
CLM-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01 | CLM-104-HIS-THYMUS-LOBULATION-01
## citation_ids
CIT-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01-ORIGIN | CIT-104-HIS-THYMIC-EPITHELIAL-RETICULAR-CELLS-01-NOFIBRE | CIT-104-HIS-THYMUS-LOBULATION-01-STROMA | CIT-104-HIS-THYMUS-LOBULATION-01-MEDULLA

---

# Item
## id
SPN-104-HIS-LO-05
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-mechanism
## text
Those post-capillary venules are lined by simple cubical epithelium carrying receptors for the homing of T lymphocytes, and they are how T cells arriving from the thymus enter the paracortex.
## claim_ids
CLM-104-HIS-PARACORTEX-01
## citation_ids
CIT-104-HIS-PARACORTEX-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-06
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-mechanism
## text
The closed theory states that the capillaries open directly into the blood sinusoids.
## claim_ids
CLM-104-HIS-SPLENIC-CIRCULATION-THEORIES-01
## citation_ids
CIT-104-HIS-SPLENIC-CIRCULATION-THEORIES-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-07
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-mechanism
## text
The open-and-closed theory reconciles the two: the circulation is closed when the spleen contracts and open when it relaxes.
## claim_ids
CLM-104-HIS-SPLENIC-CIRCULATION-THEORIES-01
## citation_ids
CIT-104-HIS-SPLENIC-CIRCULATION-THEORIES-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-08
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-mechanism
## text
The function of all three tonsils is protection of the digestive and respiratory tracts against invaders by the production of antibodies.
## claim_ids
CLM-104-HIS-TONSIL-FUNCTION-01
## citation_ids
CIT-104-HIS-TONSIL-FUNCTION-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-09
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-mechanism
## text
The barrier is present only in the cortex, not in the medulla, and is formed of four layers: a continuous type of capillary endothelium joined by tight junctions; a thick continuous basal lamina of that capillary; a perivascular tissue around the capillary containing macrophages that phagocytose any antigen escaping through the endothelium; and a complete layer of epithelial reticular cells joined by tight junctions, forming a sheath outside the capillary and the macrophages.
## claim_ids
CLM-104-HIS-BLOOD-THYMIC-BARRIER-01
## citation_ids
CIT-104-HIS-BLOOD-THYMIC-BARRIER-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-10
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
Between cortex and medulla lies the paracortex, the thymus-dependent zone, containing T lymphocytes that arrived through the post-capillary venules.
## claim_ids
CLM-104-HIS-PARACORTEX-01
## citation_ids
CIT-104-HIS-PARACORTEX-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-11
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
The medulla is medullary cords — irregular branching cords of B lymphocytes, plasma cells and macrophages, sometimes continuous with the cortical follicles — and medullary sinuses, the spaces between those cords and the trabeculae, lined with endothelium and macrophages.
## claim_ids
CLM-104-HIS-LYMPH-NODE-MEDULLA-01
## citation_ids
CIT-104-HIS-LYMPH-NODE-MEDULLA-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-12
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
The node has a cortex of regularly arranged lymph follicles with clear germinal centres and no central arterioles, separated by lymph sinuses; the spleen has irregularly arranged Malpighian corpuscles with central arterioles and no lymph sinuses at all.
## claim_ids
CLM-104-HIS-NODE-VS-SPLEEN-01
## citation_ids
CIT-104-HIS-NODE-VS-SPLEEN-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-13
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
From inside outwards those zones are: the thymus-dependent zone, the periarteriolar lymphatic sheath, containing T lymphocytes ensheathing the arteriole; the germinal centre, a pale-stained central area of B lymphocytes, large activated lymphocytes, plasma cells and macrophages; the follicular zone, the darkly stained ring around the germinal centre, mainly B lymphocytes; and the marginal zone, forming the periphery, containing T and B lymphocytes, plasma cells and macrophages.
## claim_ids
CLM-104-HIS-WHITE-PULP-ZONES-01
## citation_ids
CIT-104-HIS-WHITE-PULP-ZONES-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-14
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
Blood sinusoids are barrel-shaped, irregular, wide blood channels lined by a fenestrated elongated endothelium of stave cells, with large intercellular spaces and a non-continuous basal lamina — an arrangement that lets blood pass from the splenic cords into the blood stream.
## claim_ids
CLM-104-HIS-RED-PULP-01
## citation_ids
CIT-104-HIS-RED-PULP-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-15
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
Deep to the lymphatic tissue is dense connective tissue forming an incomplete capsule that separates it from adjacent structures.
## claim_ids
CLM-104-HIS-PALATINE-TONSIL-STRUCTURE-01 | CLM-104-HIS-TONSIL-CAPSULE-01
## citation_ids
CIT-104-HIS-PALATINE-TONSIL-STRUCTURE-01-LOCAL | CIT-104-HIS-TONSIL-CAPSULE-01-CLASS | CIT-104-HIS-TONSIL-CAPSULE-01-LINGUAL

---

# Item
## id
SPN-104-HIS-LO-16
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
The lingual tonsils are multiple masses at the base, the posterior third, of the tongue.
## claim_ids
CLM-104-HIS-TONSIL-PALATINE-LINGUAL-01
## citation_ids
CIT-104-HIS-TONSIL-PALATINE-LINGUAL-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-17
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
It has no crypts, and it has an incomplete connective tissue capsule.
## claim_ids
CLM-104-HIS-PHARYNGEAL-TONSIL-01
## citation_ids
CIT-104-HIS-PHARYNGEAL-TONSIL-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-18
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
The medulla of each lobule is continuous with that of the adjacent lobule, stains lighter because lymphocytes are less abundant and epithelial reticular cells more so, and contains the acidophilic Hassall's corpuscles — small rounded structures whose number increases with age, formed of a central acidophilic mass of degenerating reticular cells surrounded by concentric layers of epithelial reticular cells.
## claim_ids
CLM-104-HIS-THYMUS-LOBULATION-01 | CLM-104-HIS-HASSALL-CORPUSCLE-01
## citation_ids
CIT-104-HIS-THYMUS-LOBULATION-01-STROMA | CIT-104-HIS-THYMUS-LOBULATION-01-MEDULLA | CIT-104-HIS-HASSALL-CORPUSCLE-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-19
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
And it has no afferent lymph vessels — which is the absence that protects the thymocytes from circulating antigen.
## claim_ids
CLM-104-HIS-THYMUS-ABSENCES-01
## citation_ids
CIT-104-HIS-THYMUS-ABSENCES-01-LOCAL

---

# Item
## id
SPN-104-HIS-LO-20
## article_id
ART-104-HIS-LYMPHOID-ORGANS
## section_id
art-104-his-lymphoid-organs-key-determinants
## text
a secondary nodule therefore has a peripheral dark region of small lymphocytes and a pale central germinal centre containing large activated B lymphocytes and plasma cells with pale nuclei, plus macrophages and a few T cells.
## claim_ids
CLM-104-HIS-SECONDARY-FOLLICLE-01
## citation_ids
CIT-104-HIS-SECONDARY-FOLLICLE-01-LOCAL

---

# Item
## id
SPN-104-HIS-CR-01
## article_id
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## section_id
art-104-his-cell-renewal-and-aneuploidy-mechanism
## text
Specialized cells are classified according to their ability to reproduce themselves into three types.
## claim_ids
CLM-104-HIS-CELL-RENEWAL-TYPES-01
## citation_ids
CIT-104-HIS-CELL-RENEWAL-TYPES-01-LOCAL

---

# Item
## id
SPN-104-HIS-CR-02
## article_id
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## section_id
art-104-his-cell-renewal-and-aneuploidy-mechanism
## text
Aneuploidy arises three ways.
## claim_ids
CLM-104-HIS-ANEUPLOIDY-CAUSES-01
## citation_ids
CIT-104-HIS-ANEUPLOIDY-CAUSES-01-NONDISJ | CIT-104-HIS-ANEUPLOIDY-CAUSES-01-OTHER

---

# Item
## id
SPN-104-HIS-CR-03
## article_id
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## section_id
art-104-his-cell-renewal-and-aneuploidy-definition
## text
Aneuploidy is a chromosome number that is not an exact multiple of the haploid number: the karyotype shows the addition or the loss of a single chromosome.
## claim_ids
CLM-104-HIS-ANEUPLOIDY-DEFINITION-01
## citation_ids
CIT-104-HIS-ANEUPLOIDY-DEFINITION-01-LOCAL

---

# Item
## id
SPN-104-HIS-CT-01
## article_id
ART-104-HIS-CAPILLARY-TYPES
## section_id
art-104-his-capillary-types-mechanism
## text
A continuous, somatic capillary is small and regular in calibre.
## claim_ids
CLM-104-HIS-CAPILLARY-CONTINUOUS-01
## citation_ids
CIT-104-HIS-CAPILLARY-CONTINUOUS-01-LOCAL

---

# Item
## id
SPN-104-HIS-CT-02
## article_id
ART-104-HIS-CAPILLARY-TYPES
## section_id
art-104-his-capillary-types-mechanism
## text
A sinusoidal capillary, or blood sinusoid, is large and irregular.
## claim_ids
CLM-104-HIS-CAPILLARY-SINUSOID-01
## citation_ids
CIT-104-HIS-CAPILLARY-SINUSOID-01-LOCAL

---

# Item
## id
SPN-104-HIS-NM-01
## article_id
ART-104-HIS-NASAL-MUCOSA
## section_id
art-104-his-nasal-mucosa-mechanism
## text
Olfactory epithelium is a modified pseudostratified columnar ciliated epithelium with no goblet cells, and it has three cell types.
## claim_ids
CLM-104-HIS-OLFACTORY-EPITHELIUM-01
## citation_ids
CIT-104-HIS-OLFACTORY-EPITHELIUM-01-LOCAL

---

# Item
## id
SPN-104-HIS-NM-02
## article_id
ART-104-HIS-NASAL-MUCOSA
## section_id
art-104-his-nasal-mucosa-definition
## text
Olfactory mucosa covers the roof and the superior conchae of the nasal cavities and is olfactory epithelium with its connective tissue lamina propria.
## claim_ids
CLM-104-HIS-OLFACTORY-EPITHELIUM-01 | CLM-104-HIS-OLFACTORY-BASEMENT-MEMBRANE-01
## citation_ids
CIT-104-HIS-OLFACTORY-EPITHELIUM-01-LOCAL | CIT-104-HIS-OLFACTORY-BASEMENT-MEMBRANE-01-LOCAL
