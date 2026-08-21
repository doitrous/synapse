<!--
  Atomic claims for 108 INT — the evidence pass the module's OWED ledger was
  waiting on, and the only thing that could clear `medical:presence` for the two
  concept batches. `resourceIds` and `atomicClaimIds` are on the must-populate
  list and `NOTE_EXCUSES` in scripts/check-concept-presence.mjs does not include
  either, so a correctly-keyed `field_notes` reason could never have cleared
  them. Only real evidence could.

  One claim per assertion, each pointing at a concept that already exists in
  ../concept/108-INT-concepts-pathology.md or
  ../concept/108-INT-concepts-pharmacology.md. NO CONCEPT ID IS DERIVED HERE;
  every one is copied from the committed batch.

  Sources are read from the committed page-text cache at
  scripts/kasr/extract/pagetext/. No extractor was re-run. The page offset was
  established per source by reading the footer number off each cached page, and
  THE TWO BOOKS DO NOT AGREE:

    pathology book   src_e294bafc730fe7111b06   printed page = index + 1
                     (index 0 ends "1", index 20 ends "21", index 21 is "22")
    pharmacology     src_af30e4191cb4087f8d3f   printed page = index
                     (index 0 is the cover "I", index 1 ends "1", index 33
                     ends "33"; index 27 is a table and carries no footer)
    ILO sheet        src_b4f736e3bd809dbee187   no printed numbers at all;
                     locators are the 1-based PDF page

  WHY ALMOST NOTHING HERE IS 'verified'. A department book establishes what this
  faculty teaches. It does not establish that a fact is true, and the
  programme's source hierarchy wants a current authoritative source for medical
  correctness. This pass has none: every citation in ./108-INT-citations.md is
  local_curriculum and every one is marked counts_as_claim_evidence: no, so
  reconcileClaimEvidence leaves these claims at needs_evidence rather than
  promoting them off a single university textbook. That is the honest state and
  it is what these records should say until an independent source is attached.

  Nothing is 'conflicted'. The two books disagree with themselves in wording and
  in typography — the pathology book prints "Morphologic Alternations" for
  Alterations, "due to in part to", and a formative-assessment answer key with
  five answers to four questions and an option "g" that its own list does not
  offer; the pharmacology book's OCR gives "latrogenic", "Inthe", "2\"4
  messengers". None of those is a disagreement about a fact, so none is recorded
  as a conflict. They are recorded in the citation's context_note where they
  fall, and quoted rather than corrected.

  WHAT IS DELIBERATELY NOT CLAIMED. Three concepts assert more than these eleven
  files support, and the claim written for each is narrower than its concept's
  label rather than padded out to match it:

    CON-FND-2CDE9A5C884133  "Necrosis and apoptosis differ in cell size,
      membrane integrity and inflammation". The book states membrane integrity
      and inflammation for both, and gives no side-by-side comparison and no
      statement that necrotic cells enlarge. The claim asserts the two axes the
      book states and says so in its qualifiers.
    CON-FND-4388E0D8A75FD4  "full agonist, partial agonist, inverse agonist or
      antagonist". The pharmacology book teaches three ligand types. The string
      "inverse" does not occur anywhere in its 34 cached pages. The claim covers
      the three the book teaches.
    CON-FND-6A60CE8D2E7C5C  "enteral, parenteral and topical". The book never
      uses the word "enteral" — the string does not occur except inside
      "Parenteral". The claim states the numbered series of routes the book
      actually enumerates.

  Nothing rests on an exam paper. The four EOY papers are native text and their
  wording is quotable, but all four are unsolved — the manifest records 0 of 102
  and 0 of 148 answer rules carrying any text — so an option in an MCQ is not
  known to be the right one, and quoting one as evidence of a fact would be
  asserting a key that does not exist. They are recorded as resources and used
  for weighting on the concepts' `exam_signal`, and no claim cites them.

  Nothing rests on the practical book either, and this one is worth recording:
  src_a2ffe25e8362fe840ceb has a native text layer, the manifest and the corpus
  index both say so, and the extraction ran in native mode — and every one of
  its twelve cached pages is whitespace. The text layer is present and
  undecodable. Its resource record stands, because the file exists and the
  module uses it; no span can be quoted from it, so none is.

  Import: Evidence > Import, after ./108-INT-resources.md and before
  ./108-INT-citations.md.
-->

# Item
## id
CLM-FND-PATH-SCOPE-01
## concept_id
CON-FND-E9DDE81591D0A7
## subject
Pathology
## predicate
is learned in
## object
two stages, general pathology and systemic pathology
## display_text
Pathology is the scientific study of disease, covering functional and structural changes from the molecular level to the effects on the individual, and it is learned in two stages: general pathology, the study of the main types of disease process, and systemic pathology, the description of specific diseases as they affect organs or organ systems.
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
scope: the division is by what is described, not by difficulty

---

# Item
## id
CLM-FND-PATH-DISEASE-HEADINGS-01
## concept_id
CON-FND-1712C0F57AAD45
## subject
Each disease entity
## predicate
is studied under
## object
six characteristics: epidemiology, etiology, pathogenesis, morphological changes, complications and sequelae, and prognosis
## display_text
Every disease entity is described under six headings — epidemiology or incidence, etiology or cause, pathogenesis or mechanism, morphological changes gross and microscopic together with functional and clinical changes, complications and sequelae, and prognosis or outcome.
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
count: six headings

---

# Item
## id
CLM-FND-PATH-DISEASE-CLASSIFICATION-01
## concept_id
CON-FND-0BE3CE88A36BB5
## subject
The most widely used general classification of disease
## predicate
is based on
## object
pathogenesis, dividing diseases into congenital and acquired
## display_text
The most widely used general classification of disease is the one based on pathogenesis or disease mechanism, under which most diseases fall into congenital — genetic or non-genetic — or acquired, which subdivides into inflammatory, hemodynamic, growth disorders, disordered immunity, and metabolic and degenerative disease.
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
basis: pathogenesis, not etiology or organ

---

# Item
## id
CLM-FND-CELL-STRESS-OUTCOMES-01
## concept_id
CON-FND-D53E254A82F334
## subject
Excessive physiological stress or an adverse pathologic stimulus
## predicate
results in
## object
one of three outcomes: adaptation, reversible injury, or irreversible injury and cell death
## display_text
A cell meets excessive physiological stress or an adverse pathologic stimulus with one of three outcomes — adaptation, reversible injury, or irreversible injury and cell death — and these responses form a continuum of progressive impairment of cell structure and function rather than three separate states.
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
count: three outcomes
state: continuum, not discrete categories

---

# Item
## id
CLM-FND-CELL-ADAPTATION-FORMS-01
## concept_id
CON-FND-DF726F864C8BC3
## subject
Cellular adaptation
## predicate
takes the forms of
## object
hypertrophy, hyperplasia, atrophy and metaplasia
## display_text
Adaptation occurs when a physiological or pathologic stressor induces a new state that changes the cell but otherwise preserves its viability, and it takes four forms: hypertrophy, hyperplasia, atrophy and metaplasia.
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
count: four forms
state: cell viability preserved

---

# Item
## id
CLM-FND-HYPOXIA-CAUSES-01
## concept_id
CON-FND-8989A49BEBCF14
## subject
Oxygen deprivation
## predicate
reaches the cell through
## object
ischemia, inadequate oxygenation, or loss of the oxygen-carrying capacity of the blood
## display_text
Oxygen deprivation impairs aerobic respiration and therefore the ability to generate ATP, which the book calls an extremely important and common cause of cell injury and death, and it arises three ways: ischemia or deficient blood supply, inadequate oxygenation as in cardiorespiratory failure, and loss of the oxygen-carrying capacity of the blood as in anemia or carbon monoxide poisoning.
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
count: three routes

---

# Item
## id
CLM-FND-ATP-DEPLETION-EFFECTS-01
## concept_id
CON-FND-375B9454502DE8
## subject
Reduction of ATP following interference with mitochondrial oxidative phosphorylation
## predicate
injures the cell by
## object
reducing sodium pump activity, interfering with protein synthesis, and increasing intracellular calcium
## display_text
Interference with aerobic respiration in mitochondria reduces ATP and so impairs biochemical processes in the cell through three effects: reduced sodium pump activity, which accumulates sodium inside the cell and draws water in so the cell swells; interference with protein synthesis; and a rise in intracellular calcium, whose levels are normally kept in check by ATP-dependent enzymes.
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
count: three effects

---

# Item
## id
CLM-FND-OXIDATIVE-STRESS-01
## concept_id
CON-FND-7B96FFE8FC4285
## subject
Oxidative stress
## predicate
is
## object
free radicals overcoming the antioxidant defence mechanisms and interacting with membrane lipids, cellular proteins and DNA
## display_text
Free radicals, including reactive oxygen species, are chemical species with a single unpaired electron in an outer orbit and are highly reactive; normally a balance exists between them and defence mechanisms such as vitamin E and superoxide dismutase, and oxidative stress is the situation where those defences are overcome and free radicals interact with membrane lipids by peroxidation, with cellular proteins and with DNA.
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
state: defence mechanisms overcome

---

# Item
## id
CLM-FND-REPERFUSION-FREE-RADICALS-01
## concept_id
CON-FND-2126819970522D
## subject
Free radicals
## predicate
play a major role in
## object
reperfusion injury following restoration of blood flow in ischemic tissue, cellular aging, chemical injury and radiation damage
## display_text
Free radicals play a major role in reperfusion injury, which follows the restoration of blood flow in ischemic tissue, and also in cellular aging, chemical injury and radiation damage.
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
state: after blood flow is restored, not during the ischaemia

---

# Item
## id
CLM-FND-REVERSIBLE-INJURY-MORPHOLOGY-01
## concept_id
CON-FND-2DDF56DA42A0A8
## subject
Reversible cell injury
## predicate
appears morphologically as
## object
cloudy swelling, then hydropic or vacuolar change, then fatty change
## display_text
Reversible injury shows three morphological stages: cloudy swelling, one of the earliest changes, in which loss of the sodium pump accumulates sodium and water so the cell swells and the cytoplasm appears granular; hydropic, ballooning or vacuolar change, the same mechanism further advanced, with pale cytoplasm and multiple vacuoles; and fatty change, in which lipid appears as empty cytoplasmic vacuoles in cells involved in or dependent on fat metabolism.
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
count: three stages
sites: liver cells, myocardial cells and renal tubular cells

---

# Item
## id
CLM-FND-NECROSIS-DEFINITION-01
## concept_id
CON-FND-4CD77608FB35DF
## subject
Necrosis
## predicate
is
## object
death of a group of cells within a living body
## display_text
Necrosis is the death of a group of cells within a living body; with severe or prolonged moderate injury there is loss of membrane integrity and release of lysosomal enzymes into the cytosol, cell constituents leak into the surrounding tissue and provoke an inflammatory response, and the necrotic areas are removed by macrophages and repaired by fibrosis.
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
state: a group of cells, in a living body
sequela: dystrophic calcification may occur

---

# Item
## id
CLM-FND-NECROSIS-MORPHOLOGY-01
## concept_id
CON-FND-8DA30AD870AC1E
## subject
Necrotic cells
## predicate
are recognised by
## object
karyolysis, pyknosis and karyorrhexis in the nucleus and increased eosinophilia in the cytoplasm
## display_text
Necrosis is recognised down the microscope by three nuclear changes — karyolysis, the fading of nuclear basophilia; pyknosis, nuclear shrinkage followed by karyorrhexis; and karyorrhexis, destructive nuclear fragmentation — after which the nucleus disappears completely, while the cytoplasm becomes more eosinophilic because it loses the RNA that binds haematoxylin and gains denatured proteins that bind eosin.
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
stain: haematoxylin and eosin

---

# Item
## id
CLM-FND-COAGULATIVE-NECROSIS-01
## concept_id
CON-FND-5285A9707E61CA
## subject
Coagulative necrosis
## predicate
preserves
## object
the cellular outlines, because the injury denatures the proteolytic enzymes as well as the structural proteins
## display_text
Coagulative necrosis follows acute ischemia and is due to protein denaturation: the injury denatures the enzymes that would cause autolysis as well as the structural proteins, so cellular outlines are maintained for some time and the tissue appears as a ghost of the original, with loss of nuclei and increased cytoplasmic eosinophilia.
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
cause: acute ischemia
sites: infarction of kidney, spleen and heart

---

# Item
## id
CLM-FND-LIQUEFACTIVE-NECROSIS-01
## concept_id
CON-FND-88508ABAB84A67
## subject
Liquefactive necrosis
## predicate
occurs in
## object
CNS infarctions, where the tissue is rich in lipid and lacks supporting stroma, and in the pus of suppurative inflammation
## display_text
Liquefactive or colliquative necrosis occurs in CNS infarctions, where the tissue is rich in lipid, soft and lacks supporting stroma, so the necrotic area becomes surrounded by glial tissue and is changed into a cyst; the pus of suppurative inflammation is also liquefactive necrosis.
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
sites: central nervous system infarct; suppurative inflammation

---

# Item
## id
CLM-FND-CASEATION-NECROSIS-01
## concept_id
CON-FND-5B3B6BA12670C7
## subject
Caseation necrosis
## predicate
occurs mainly in
## object
tuberculosis, through tissue digestion by activated macrophages
## display_text
Caseation necrosis is necrosis in which the tissue appears semi-solid, yellowish and cheese-like, and under the microscope granular structureless pink material; it occurs mainly in tuberculosis, through tissue digestion by activated macrophages, and lipid liberated from the tubercle bacilli capsule adds to the cheese-like appearance.
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
association: tuberculosis

---

# Item
## id
CLM-FND-FAT-NECROSIS-01
## concept_id
CON-FND-6626C19B61A23B
## subject
Fat necrosis
## predicate
is of two types
## object
traumatic and enzymatic, the enzymatic form splitting fat into fatty acids that combine with calcium to form white calcium soaps
## display_text
Fat necrosis is traumatic or enzymatic: trauma to adipose tissue releases intracellular fat which provokes an inflammatory response, macrophages engulf the fat and fibrosis follows, commonly in the breast where it produces a palpable mass; while in acute pancreatitis leaked pancreatic lipase acts on mesenteric fat cells, splitting fat into fatty acids which combine with calcium to form white calcium soaps.
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
count: two types
sites: breast for traumatic, mesentery for enzymatic

---

# Item
## id
CLM-FND-FIBRINOID-NECROSIS-01
## concept_id
CON-FND-BA0739479AD0FC
## subject
Fibrinoid necrosis
## predicate
is seen with
## object
collagen damage in some autoimmune diseases and in immune reactions involving blood vessels
## display_text
Fibrinoid necrosis is a special form of necrosis whose necrotic material has staining reactions resembling fibrin, appearing deep red and homogenous with haematoxylin and eosin, and it is seen with collagen damage in some autoimmune diseases such as rheumatoid arthritis and in immune reactions involving blood vessels such as polyarteritis nodosa.
## risk_class
clinical_non_treatment
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
stain: deep red and homogenous with H&E

---

# Item
## id
CLM-FND-APOPTOSIS-DEFINITION-01
## concept_id
CON-FND-11D3CBC654E7F3
## subject
Apoptosis
## predicate
is
## object
an energy-dependent programmed cell death that deletes individual cells whose membranes remain intact, so it provokes no inflammatory response
## display_text
Apoptosis is programmed cell death which is energy dependent; it deletes individual cells, and because their membranes remain intact it does not provoke an inflammatory response.
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
scale: individual cells, not groups
inflammation: absent

---

# Item
## id
CLM-FND-APOPTOSIS-CONTROL-01
## concept_id
CON-FND-C6661CBD045436
## subject
Apoptosis
## predicate
is controlled by and executed by
## object
the bcl2 protein family and a group of enzymes called caspases
## display_text
Apoptosis is controlled by the bcl2 protein family and is brought about by the activation of a group of enzymes called caspases, which destroy the nuclear membrane and activate DNAses that degrade nuclear DNA.
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
control: bcl2 protein family
execution: caspases

---

# Item
## id
CLM-FND-APOPTOSIS-CAUSES-01
## concept_id
CON-FND-A40D59DAB245EA
## subject
Apoptosis
## predicate
occurs in
## object
physiological conditions as well as pathological ones
## display_text
Apoptosis occurs in physiological conditions — programmed destruction of cells during embryogenesis, hormone-dependent involution such as the endometrium during menstruation, cell deletion in proliferating populations such as intestinal epithelium to hold cell number constant, and removal of cells with significant DNA damage — and in pathological ones, including virus-infected cells, irradiation damage, elimination of cancer cells, T-lymphocyte cytotoxicity in transplant rejection, accumulation of misfolded proteins, and pathologic atrophy after duct obstruction.
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
scope: physiological and pathological

---

# Item
## id
CLM-FND-APOPTOSIS-MORPHOLOGY-01
## concept_id
CON-FND-46B3AD5A2D8294
## subject
An apoptotic cell
## predicate
shrinks and fragments into
## object
membrane-bound apoptotic bodies that are removed by adjacent cells or macrophages
## display_text
In apoptosis the cytoplasm condenses and the cell shrinks while retaining an intact plasma membrane, the nucleus shrinks and fragments, surface blebs form and later break off as membrane-bound apoptotic bodies made of a dark nuclear fragment surrounded by eosinophilic cytoplasm, and both the apoptotic cells and the bodies are removed by adjacent cells or macrophages.
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
membrane: remains intact throughout

---

# Item
## id
CLM-FND-NECROSIS-VS-APOPTOSIS-01
## concept_id
CON-FND-2CDE9A5C884133
## subject
Necrosis and apoptosis
## predicate
differ in
## object
membrane integrity and in whether they provoke inflammation
## display_text
Cell death occurs primarily through two morphologic patterns and mechanisms, necrosis and apoptosis, and the department book separates them on two points: in necrosis there is loss of membrane integrity and leakage of cell constituents into the surrounding tissue, which provokes an inflammatory response, whereas in apoptosis the cell shrinks with its plasma membrane intact and so provokes none.
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
axis: membrane integrity and inflammation
limit: the book states no side-by-side comparison and does not say necrotic cells enlarge

---

# Item
## id
CLM-FND-INTRACELLULAR-ACCUMULATION-01
## concept_id
CON-FND-0A32C902A825AA
## subject
Intracellular accumulation
## predicate
occurs when
## object
a normal endogenous substance outruns its removal or its metabolism is defective, an abnormal endogenous substance cannot be folded or degraded, or an abnormal exogenous substance cannot be degraded at all
## display_text
Cells accumulate abnormal amounts of a substance in three circumstances: a normal endogenous substance produced at a normal rate but not removed fast enough, or one that accumulates through a genetic or acquired defect in its metabolism; an abnormal endogenous substance, the product of a mutated gene, that accumulates through defective folding or transport and inadequate degradation; and an abnormal exogenous substance that normal cells are unable to degrade.
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
count: three mechanisms

---

# Item
## id
CLM-FND-STEATOSIS-DEFINITION-01
## concept_id
CON-FND-3B89025E2FB4E0
## subject
Steatosis
## predicate
is
## object
an abnormal accumulation of triglycerides within parenchymal cells, typically reversible
## display_text
Steatosis or fatty change is an abnormal accumulation of triglycerides within parenchymal cells, due either to excessive entry or to defective metabolism; it is typically reversible, but it can lead to inflammation and fibrosis, and its most common site is the liver although it also occurs in heart, muscle and kidney.
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
reversibility: typically reversible
sites: liver most common, also heart, muscle, kidney

---

# Item
## id
CLM-FND-HEPATIC-STEATOSIS-PATHOGENESIS-01
## concept_id
CON-FND-A0BC07E35554B1
## subject
Hepatic steatosis
## predicate
arises through
## object
increased fatty acid entry, decreased fatty acid oxidation, increased triglyceride formation, or impaired lipoprotein secretion
## display_text
Hepatic steatosis follows one of four routes: increased fatty acids entering the liver, as in starvation or with corticosteroids; decreased fatty acid oxidation, as in hypoxia; increased triglyceride formation, as with alcohol; and impaired lipoprotein secretion from the liver, also with alcohol.
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
count: four routes

---

# Item
## id
CLM-FND-FATTY-LIVER-MORPHOLOGY-01
## concept_id
CON-FND-70554B38361679
## subject
The fatty liver
## predicate
appears as
## object
an enlarged soft organ with rounded borders and a yellow greasy cut section, whose hepatocytes take a signet ring appearance
## display_text
A fatty liver is enlarged and soft with rounded borders and a yellow, greasy cut section; microscopically small intracytoplasmic droplets or large vacuoles of fat accumulate in the liver cells and the nucleus is flattened and pushed to one side, giving the cell a signet ring appearance.
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
level: gross and microscopic

---

# Item
## id
CLM-FND-MYOCARDIAL-FATTY-CHANGE-01
## concept_id
CON-FND-4354823564BAB3
## subject
Fatty change in the myocardium
## predicate
is
## object
spotty in ischemia and diffuse in toxemia
## display_text
Fatty change in the myocardium can be spotty, in the case of ischemia, or diffuse, in the case of toxemia such as diphtheria.
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
distribution: spotty vs diffuse
example of toxemia: diphtheria

---

# Item
## id
CLM-FND-CHOLESTEROL-ACCUMULATION-01
## concept_id
CON-FND-3BB4FF8F2223FF
## subject
Cholesterol and cholesterol esters
## predicate
accumulate as
## object
cleft-like spaces in atherosclerosis and as clusters of foamy macrophages in xanthomas
## display_text
In atherosclerosis cholesterol and cholesterol esters accumulate in arterial wall smooth muscle cells and macrophages, and the extracellular accumulations appear microscopically as cleft-like spaces because the cholesterol crystals dissolve during normal histologic processing; in acquired and hereditary hyperlipidemias the same lipids accumulate in foamy macrophages that cluster in subcutaneous tissues and tendons to form masses called xanthomas.
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
artefact: the clefts are where dissolved crystals were

---

# Item
## id
CLM-FND-HYALINE-CHANGE-01
## concept_id
CON-FND-5CB8B822A9A6AF
## subject
Hyaline
## predicate
is
## object
a descriptive histologic term for a homogeneous, glassy, pink appearance, not a specific marker of cell injury
## display_text
Hyaline refers to an alteration within cells or in the extracellular space that gives a homogeneous, glassy, pink appearance in routine sections stained with haematoxylin and eosin; it is widely used as a descriptive histologic term rather than a specific marker for cell injury, and it covers intracellular examples such as Russell bodies and Mallory alcoholic hyaline as well as extracellular ones such as old scars, leiomyoma and hyalinized renal arterioles in long-standing hypertension and diabetes.
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
nature: a description of appearance, not one substance

---

# Item
## id
CLM-FND-GLYCOGEN-ACCUMULATION-01
## concept_id
CON-FND-2D8B89A2F75643
## subject
Excessive intracellular glycogen
## predicate
is seen as
## object
clear vacuoles, in the glycogen storage diseases
## display_text
Glycogen is commonly stored within cells as a ready energy source, and excessive intracellular deposits, seen as clear vacuoles, occur in the glycogen storage diseases, also called glycogenoses.
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
appearance: clear vacuoles

---

# Item
## id
CLM-FND-ANTHRACOSIS-01
## concept_id
CON-FND-57B12823E95B52
## subject
Inhaled carbon particles
## predicate
blacken
## object
the lung and the tracheobronchial lymph nodes, and in coal miners may induce a fibroblastic reaction
## display_text
Carbon particles in polluted air are picked up on inhalation by alveolar macrophages and carried through lymphatic channels to the regional tracheobronchial lymph nodes, and accumulations of this pigment blacken the tissues of the lungs — anthracosis — and the involved nodes; in coal miners the aggregates of carbon dust may induce a fibroblastic reaction and so cause the serious lung disease known as coal worker's pneumoconiosis.
## risk_class
clinical_non_treatment
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
route: inhalation, then alveolar macrophages, then lymphatics

---

# Item
## id
CLM-FND-LIPOFUSCIN-01
## concept_id
CON-FND-2A370D3EF3EDCF
## subject
Lipofuscin
## predicate
is
## object
an insoluble wear-and-tear pigment derived through lipid peroxidation of cellular membranes, which is not injurious to the cell
## display_text
Lipofuscin, also known as lipochrome or wear-and-tear pigment, is an insoluble pigment derived through lipid peroxidation of cellular membranes; it is not injurious to the cell or its functions and is a sign of free radical injury and lipid peroxidation throughout cell life, appearing as a yellow brown, finely granular, often perinuclear cytoplasmic pigment in the liver and heart cells of aging patients or of patients with severe malnutrition and cancer.
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
harm: none to the cell

---

# Item
## id
CLM-FND-BROWN-ATROPHY-01
## concept_id
CON-FND-063F60318B4D20
## subject
Brown atrophy of the heart
## predicate
is
## object
a senile atrophy of the heart with excess lipofuscin pigment
## display_text
Brown atrophy of the heart is a senile atrophy with excess lipofuscin: the heart is reduced in size and brown in colour, the coronaries appear more tortuous because normal-length arteries now run over a smaller heart, and the pericardial fat is replaced by oedematous jelly-like tissue; microscopically the muscle fibres are thin and atrophic with excess fine yellowish brown lipofuscin on both sides of the nucleus.
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
population: aging heart
level: gross and microscopic

---

# Item
## id
CLM-FND-MELANIN-01
## concept_id
CON-FND-AA9A76DBB4EE6B
## subject
Melanin
## predicate
is formed when
## object
the enzyme tyrosinase catalyzes the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes
## display_text
Melanin is an endogenous, non-haemoglobin-derived, brown-black pigment formed when the enzyme tyrosinase catalyzes the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes, and increased melanin is seen in five named conditions: prolonged sun exposure, melanocytic nevi and melanomas, chloasma of pregnancy, Addison disease, and cafe au lait patches in neurofibromatosis.
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
enzyme: tyrosinase
count: five conditions of increased melanin

---

# Item
## id
CLM-FND-HEMOSIDERIN-01
## concept_id
CON-FND-5DBC795B58DC74
## subject
Hemosiderin
## predicate
is
## object
a haemoglobin-derived golden yellow-to-brown granular pigment formed of aggregated ferritin micelles when iron is in excess
## display_text
Hemosiderin is a haemoglobin-derived, golden yellow-to-brown, granular pigment: iron is normally carried by transferrins and stored with apoferritin as ferritin micelles, and when there is a local or systemic excess of iron the ferritin forms hemosiderin granules that aggregate and become visible by light microscopy; the excess may be localized, from haemorrhage into tissue, or generalized, from increased dietary absorption, haemolytic anaemias or repeated blood transfusions.
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
distribution: localized after bleeding, generalized in overload
stain: visualized by the Prussian blue reaction

---

# Item
## id
CLM-FND-HAEMOCHROMATOSIS-01
## concept_id
CON-FND-B9A3C8B28B1443
## subject
Primary hemochromatosis
## predicate
is
## object
a congenital disorder due to a gene defect on chromosome 6 that reaches dangerous iron levels only in homozygotes
## display_text
Primary hemochromatosis is the most common form of iron overload and is a congenital disorder due to a gene defect on chromosome 6; heterozygotes have increased iron absorption but only in homozygotes does this reach dangerous levels, and the defect causes increased absorption of iron in the small intestine even while transferrin is fully saturated.
## risk_class
clinical_non_treatment
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
genetics: chromosome 6; dangerous only in homozygotes

---

# Item
## id
CLM-FND-HEMOZOIN-01
## concept_id
CON-FND-C96C66BC1A17DF
## subject
Hemozoin
## predicate
is not reactive to
## object
Prussian blue
## display_text
Hemozoin is a brownish iron-containing pigment produced by parasites feeding on blood cells, as in malaria and bilharziasis; it is not reactive to Prussian blue, and the pigment is released into the blood and taken up by macrophages of the liver, spleen and other organs.
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
polarity: negative on the Prussian blue reaction
contrast: hemosiderin is Prussian blue positive

---

# Item
## id
CLM-FND-DYSTROPHIC-CALCIFICATION-01
## concept_id
CON-FND-33466CEBFC4EBA
## subject
Dystrophic calcification
## predicate
occurs in
## object
tissues already affected by disease, with a normal serum calcium
## display_text
Pathological calcification is the abnormal deposition of calcium salts in tissue other than teeth or bone, and it is dystrophic or metastatic; dystrophic calcification occurs in tissues already affected by disease with a normal serum calcium, through local precipitation of insoluble calcium salts, in atheromatous plaques, congenital bicuspid aortic valves, areas of necrosis as in old tuberculous lesions, old thrombi, lithopedion and fat necrosis.
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
serum calcium: normal
tissue: already damaged

---

# Item
## id
CLM-FND-METASTATIC-CALCIFICATION-01
## concept_id
CON-FND-87392C49DB246C
## subject
Metastatic calcification
## predicate
occurs in
## object
viable tissues, in cases of hypercalcemia
## display_text
Metastatic calcification occurs in viable tissues in cases of hypercalcemia, whose causes are elevated parathyroid hormone, bone destruction, hypervitaminosis D and the milk alkali syndrome; it deposits in the interstitial tissue of the gastric mucosa, kidney, lungs, systemic arteries and pulmonary veins, usually causes no clinical dysfunction, and only massive renal deposits — nephrocalcinosis — may in time cause renal failure.
## risk_class
clinical_non_treatment
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
serum calcium: raised
tissue: viable

---

# Item
## id
CLM-FND-CALCIFICATION-MORPHOLOGY-01
## concept_id
CON-FND-718662116D90C4
## subject
Dystrophic and metastatic calcification
## predicate
are indistinguishable by
## object
their morphology, which is chalky white granular material grossly and basophilic amorphous granular material microscopically
## display_text
Both dystrophic and metastatic calcification appear grossly as chalky white granular material and microscopically as basophilic amorphous granular calcium salts, so morphology does not separate them; what separates them is the serum calcium, which is normal in dystrophic calcification and raised in metastatic calcification.
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
discriminator: serum calcium, not appearance

---

# Item
## id
CLM-FND-AMYLOID-DEFINITION-01
## concept_id
CON-FND-D955408D228002
## subject
Amyloidosis
## predicate
is
## object
extracellular deposition of an abnormal protein of beta-pleated configuration together with the glycoprotein amyloid P
## display_text
Amyloidosis is the extracellular deposition of an abnormal protein having a beta-pleated configuration together with a glycoprotein, amyloid P protein; it is deposited on basement membrane, reticulin fibres and the walls of small blood vessels, the affected tissue becomes hard and waxy, and it results from abnormal folding of proteins which become insoluble, aggregate and deposit as fibrils after the quality control mechanisms that normally degrade misfolded protein fail.
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
location: extracellular
configuration: beta-pleated

---

# Item
## id
CLM-FND-AMYLOID-PROTEIN-TYPES-01
## concept_id
CON-FND-8151AE03EA25C5
## subject
The two commonest amyloid proteins
## predicate
are
## object
AL, immunoglobulin light chains derived from plasma cells, and AA, derived from the acute phase protein SAA
## display_text
Of more than 20 distinct forms of amyloid protein the two commonest are amyloid light chain or AL protein, which is immunoglobulin light chains derived from plasma cells, and amyloid-associated or AA protein, a non-immunoglobulin protein derived from a larger serum precursor called serum amyloid-associated protein which hepatocytes synthesise as part of the acute phase response.
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
count: more than 20 forms, two commonest

---

# Item
## id
CLM-FND-SYSTEMIC-AMYLOIDOSIS-01
## concept_id
CON-FND-E3F496F6DDD7C3
## subject
Systemic amyloidosis
## predicate
is classified by etiology into
## object
primary or myeloma-associated, secondary or reactive, and senile, each with its own protein
## display_text
Systemic amyloidosis deposits in many organs — liver, spleen, tongue, heart and kidney — causing organomegaly and organ dysfunction, and is classified by etiology into three: primary or myeloma-associated amyloidosis, whose material is AL protein from the single class of immunoglobulin light chain produced by a plasma cell tumour; secondary or reactive amyloidosis, whose material is AA protein derived from the acute-phase SAA secreted by the liver under cytokine stimulation and which is therefore secondary to long-lasting chronic inflammatory disorders; and senile amyloidosis, minute deposits of transthyretin in the heart and vessel walls that only rarely cause significant clinical disease.
## risk_class
clinical_non_treatment
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
count: three etiological types

---

# Item
## id
CLM-FND-LOCALIZED-AMYLOIDOSIS-01
## concept_id
CON-FND-42A1BD1A1DAAE6
## subject
Localized amyloidosis
## predicate
is limited to
## object
a single tissue or organ, as in medullary thyroid carcinoma, Alzheimer disease and the islets in type 2 diabetes mellitus
## display_text
In localized amyloidosis the deposits are limited to a single tissue or organ: in medullary carcinoma of the thyroid, a tumour of the calcitonin-secreting C cells, calcitonin precursor molecules in beta-pleated sheets are seen in the stroma around the tumour cells and have no clinical effect but help identify the tumour; cerebral amyloid is found in Alzheimer disease in neuritic plaques and vessel walls; deposits are rarely seen without obvious cause in skin, laryngeal wall, lung, ureter and urinary system; and amyloid deposits in the islets of Langerhans in type 2 diabetes mellitus.
## risk_class
clinical_non_treatment
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
extent: one tissue or organ

---

# Item
## id
CLM-FND-CONGO-RED-01
## concept_id
CON-FND-4867DD3814D088
## subject
Amyloid stained with Congo red and examined under polarised light
## predicate
appears as
## object
an apple-green light against a dark background
## display_text
Congo red stains amyloid orange red, and when the section is examined under polarised light, using two filters in the path of the microscope’s light with one fixed and one rotating, the amyloid appears as an apple-green light against a dark background — apple green birefringence; grossly, tissue immersed in Lugol’s iodine stains amyloid dark brown against a yellow background, which is where the name amyloid, starch-like, comes from.
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
requirement: polarised light, not Congo red alone

---

# Item
## id
CLM-FND-RENAL-AMYLOIDOSIS-01
## concept_id
CON-FND-699152CE450385
## subject
Renal amyloidosis
## predicate
presents as
## object
proteinuria and later renal failure, after amyloid obliterates the glomerular capillary
## display_text
In renal amyloidosis the kidney is enlarged with a pale yellow cut surface showing brown waxy dots, and contracts in long-standing cases from secondary ischaemic change; amyloid is deposited in the basement membrane of the glomerular capillaries and in the mesangium until the whole glomerular capillary is obliterated and appears as a homogeneous pink mass, arteriolar walls thicken, tubules atrophy, and the patient presents clinically with proteinuria and later renal failure.
## risk_class
clinical_non_treatment
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
sequence: proteinuria first, renal failure later

---

# Item
## id
CLM-FND-HEPATIC-SPLENIC-AMYLOIDOSIS-01
## concept_id
CON-FND-00024C3C0A7C4F
## subject
Amyloid in the liver and spleen
## predicate
produces
## object
a firm rubbery liver with waxy streaks, and a spleen that is either sago or lardaceous
## display_text
The amyloid liver is enlarged, heavy, firm and rubbery with sharp borders and a cut surface showing waxy light brown streaks on a yellow background, with amyloid deposited in the walls of the sinusoids as pink streaks and atrophy of liver cells from pressure and anoxia; the spleen takes one of two forms — sago spleen, where amyloid deposits in the central arterioles of the white pulp follicles and the cut surface shows brown glassy dots against a red background, and the less common diffuse or lardaceous amyloid spleen, markedly enlarged, with amyloid widely deposited in the sinusoids of the red pulp and an atrophic white pulp.
## risk_class
clinical_non_treatment
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
spleen: two named patterns

---

# Item
## id
CLM-FND-CARDIAC-GI-AMYLOIDOSIS-01
## concept_id
CON-FND-13BFC600597FD6
## subject
Amyloid in the heart and gastrointestinal tract
## predicate
causes
## object
cardiac arrhythmias and heart failure, and macroglossia with malabsorption and protein loss
## display_text
In cardiac amyloidosis amyloid is deposited in the walls of small blood vessels and in the interstitial tissue surrounding and replacing muscle fibres, the heart is enlarged and the myocardium thickened and firm, and the effects are cardiac arrhythmias and heart failure; in the gastrointestinal tract deposits in the tongue cause macroglossia, and intestinal deposits, at first in blood vessels and later extending into submucosa, muscularis and subserosa with mucosal atrophy, produce malabsorption and protein loss.
## risk_class
clinical_non_treatment
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
organs: heart and gastrointestinal tract

---

# Item
## id
CLM-FND-AMYLOIDOSIS-DIAGNOSIS-01
## concept_id
CON-FND-A69F39242D6698
## subject
The diagnosis of amyloidosis
## predicate
depends on
## object
the histologic demonstration of amyloid deposits in tissue, most commonly by kidney, rectal or gingival biopsy
## display_text
The diagnosis of amyloidosis depends on the histologic demonstration of amyloid deposits in tissues; the most common sites biopsied are the kidney when renal manifestations are present, or a rectal or gingival biopsy in patients suspected of having systemic amyloidosis.
## risk_class
clinical_non_treatment
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
modality: tissue biopsy, not a blood test

---

# Item
## id
CLM-FND-PK-VS-PD-01
## concept_id
CON-FND-6BB35F11EBD54B
## subject
Pharmacokinetics
## predicate
describes
## object
what the body does to the drug, while pharmacodynamics describes what the drug does to the body
## display_text
Pharmacokinetics describes what the body does to the drug and covers absorption, distribution, metabolism and excretion; pharmacodynamics describes what the drug does to the body and covers the pharmacological actions of drugs and their mechanisms of action.
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
direction: body-on-drug vs drug-on-body

---

# Item
## id
CLM-FND-SIMPLE-DIFFUSION-01
## concept_id
CON-FND-584FCF6897C35E
## subject
Simple diffusion
## predicate
is
## object
the chief process by which drugs are absorbed and distributed, needing no energy and no carrier
## display_text
Simple diffusion is the chief process involved in the absorption and distribution of drugs and requires neither energy nor a carrier; it depends on the concentration gradient, on molecular size — the smaller the better absorbed — on lipid solubility and the lipid/water partition coefficient, and on the degree of ionization, since the more ionized a drug is the less lipid soluble it is.
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
energy: none required
carrier: none required

---

# Item
## id
CLM-FND-CARRIER-TRANSPORT-01
## concept_id
CON-FND-9D7D3A5B015805
## subject
Carrier-mediated transport
## predicate
is of two types
## object
one moving drug along its concentration gradient without energy, one moving it against the gradient using energy, and both requiring a carrier
## display_text
Carrier-mediated transport is of two types: one carries substances too large or too lipid-insoluble to diffuse passively along their concentration gradient and requires no energy, and the other moves drug against its concentration gradient and requires energy; both require a carrier, and because a carrier can be occupied the process is saturable and is a site for competition between drugs.
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
count: two types
saturability: the book states it of active tubular excretion

---

# Item
## id
CLM-FND-PKA-PH-IONIZATION-01
## concept_id
CON-FND-ED16C95CE71A4B
## subject
A drug's pKa together with the pH of the medium
## predicate
determines
## object
what fraction of the drug is non-ionised, and therefore how lipid-soluble and how well absorbed it is
## display_text
The pKa of a drug is the pH at which half of it is ionized and half non-ionized; most drugs are weak acids or weak bases, and a weak acid is better absorbed in an acidic medium and a weak base in an alkaline one, because in each case the drug is less ionized and so more lipid soluble.
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
rule: less ionized means more lipid soluble means better absorbed

---

# Item
## id
CLM-FND-ION-TRAPPING-01
## concept_id
CON-FND-97E55D75DE9ED1
## subject
A drug that ionises in a compartment
## predicate
is trapped in
## object
that compartment, which is why urinary pH is altered to speed the excretion of an acidic or basic drug
## display_text
Ion trapping is the accumulation of a drug in a compartment whose pH ionizes it so that it cannot diffuse back out: basic drugs ionize and accumulate in breast milk, which is more acidic than plasma, and in the kidney the same principle is used deliberately — acidifying the urine increases excretion of basic drugs and alkalinizing it increases excretion of acidic drugs.
## risk_class
treatment_or_action
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
mechanism: the ionized form cannot cross the membrane back
application: deliberate alteration of urinary pH

---

# Item
## id
CLM-FND-ORAL-ABSORPTION-FACTORS-01
## concept_id
CON-FND-F2DD5E50875917
## subject
Oral absorption
## predicate
is determined by
## object
the surface area and health of the absorbing surface, gut motility and gastric emptying, the pH within the gut, and the gut contents
## display_text
Oral absorption is set by the absorbing surface — the intestine has a thousand times the surface area of the stomach and a rich blood flow, so absorption from the intestine exceeds absorption from the stomach — and by the state of health of that surface, by gut motility and the rate of dissolution, by the pH within the gut, by specific factors such as intrinsic factor, and by the gut contents including food and other drugs.
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
key comparison: intestine > stomach, by surface area

---

# Item
## id
CLM-FND-BIOAVAILABILITY-01
## concept_id
CON-FND-CF40F32A8A74A0
## subject
Bioavailability
## predicate
is
## object
the fraction of the unchanged drug that reaches the systemic circulation, reduced from an oral dose by first-pass metabolism
## display_text
Bioavailability is the fraction of the unchanged drug that reaches the systemic circulation after administration by any route; it is 100 per cent after intravenous administration and variable after oral administration, and the two things that determine oral bioavailability are the amount of drug absorbed and first-pass metabolism, which is metabolism of the drug in the gut content and wall or in the liver before it reaches the systemic circulation.
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
reference: 100 per cent by the intravenous route

---

# Item
## id
CLM-FND-DISTRIBUTION-PATTERNS-01
## concept_id
CON-FND-040D2633B0A2FE
## subject
Drugs
## predicate
distribute in
## object
one of four patterns: confined to the intravascular compartment, to the extracellular fluid, to total body water, or concentrated in a particular tissue
## display_text
A drug follows one of four distribution patterns: a one-compartment or intravascular pattern, for drugs of large molecular weight or high plasma protein binding that are trapped in the vascular space; a two-compartment or extracellular pattern, for drugs of low molecular weight that are not lipid soluble; a multicompartment pattern reaching total body fluids, for drugs of low molecular weight that are lipid soluble; and a fourth in which a drug has a special affinity for a particular tissue.
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
count: four patterns

---

# Item
## id
CLM-FND-DISTRIBUTION-FACTORS-01
## concept_id
CON-FND-53FF18E42BC94B
## subject
Drug distribution
## predicate
is affected by
## object
the physicochemical properties of the drug, binding to plasma proteins, and passage across barriers
## display_text
Distribution is affected by three things: the physicochemical properties of the drug, namely molecular weight, degree of ionization and lipid solubility; binding to plasma proteins, chiefly albumin, which splits the drug into a free form that is pharmacologically active, diffusible, metabolized and excreted and a bound form that is none of these and acts as a reservoir; and passage across barriers.
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
count: three factors in the book's list
note: only the free form is active

---

# Item
## id
CLM-FND-BARRIER-PASSAGE-01
## concept_id
CON-FND-3CECD012838275
## subject
The blood-brain barrier, the placental barrier and breast milk
## predicate
each admit
## object
non-ionized lipid-soluble drugs preferentially, and each has a clinical consequence
## display_text
Non-ionized, lipid-soluble drugs cross the blood-brain barrier while ionized ones do not, and inflammation of the meninges increases its permeability so that drugs which cannot cross normal meninges can cross inflamed ones; the placental barrier behaves like a cell membrane, so the same non-ionized lipid-soluble drugs pass from mother to fetus more easily; and most drugs given to a lactating woman are detectable in her milk.
## risk_class
clinical_non_treatment
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
selector: non-ionized and lipid soluble
state: inflamed meninges are more permeable than normal ones

---

# Item
## id
CLM-FND-METABOLISM-SITES-01
## concept_id
CON-FND-C3B843D7032C7F
## subject
The liver
## predicate
is
## object
the main site of drug biotransformation, with the lungs, skin, kidneys, plasma and gut flora also metabolising drugs
## display_text
The aim of drug metabolism in most cases is to change active lipid-soluble drugs into inactive water-soluble metabolites that are easily excreted; the liver is the main site of biotransformation, but the lungs, the skin, the kidneys, plasma esterases and the gut flora all metabolise substances too.
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
primary site: liver
aim: lipid-soluble active to water-soluble excretable

---

# Item
## id
CLM-FND-METABOLISM-PHASES-01
## concept_id
CON-FND-44B6AE3E7DDA55
## subject
Phase I metabolism
## predicate
comprises
## object
oxidation, reduction and hydrolysis, while Phase II is synthetic conjugation, and most drugs undergo Phase I then Phase II
## display_text
Drug metabolism runs in two phases: Phase I, the non-synthetic phase, is oxidation, reduction and hydrolysis; Phase II is synthetic conjugation and usually leads to inactivation. Phase I may inactivate the drug, which is the commonest fate, but may also activate a prodrug, maintain activity, or produce a toxic metabolite. Most drugs undergo Phase I then Phase II, and some take the reverse order.
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
order: usually I then II, but not always
phase I outcomes: inactivation, activation, maintained activity, toxification

---

# Item
## id
CLM-FND-MICROSOMAL-ENZYMES-01
## concept_id
CON-FND-E34035C5B4FF80
## subject
Hepatic microsomal enzymes
## predicate
differ from non-microsomal enzymes in
## object
site, organs, the reactions they catalyse, and above all inducibility
## display_text
Microsomal drug-metabolizing enzymes sit in the smooth endoplasmic reticulum, are mainly hepatic, catalyse Phase I oxidation and reduction through cytochrome P-450 and Phase II glucuronidation only, are inducible, and usually act on lipophilic substrates; non-microsomal enzymes sit in the cytoplasm and mitochondria, occur in all organs, catalyse oxidation, reduction and hydrolysis and every conjugation except glucuronidation, are NOT inducible, and act on both lipophilic and hydrophilic substrates.
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
discriminator: inducibility
axes: site, organs, phase I, phase II, induction, substrates

---

# Item
## id
CLM-FND-ENZYME-INDUCTION-INHIBITION-01
## concept_id
CON-FND-450B67836EBF1A
## subject
Hepatic microsomal enzyme inducers
## predicate
increase
## object
the metabolism of co-administered drugs and of themselves, while inhibitors decrease it
## display_text
A hepatic microsomal enzyme inducer increases the amount and activity of those enzymes, so it increases the metabolism of other drugs and shortens their duration of action, and it may increase its own metabolism as well — auto-induction, which produces kinetic tolerance; an inhibitor does the opposite, decreasing the metabolism of co-administered drugs and of itself, raising their plasma level and so causing toxicity.
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
symmetry: inducer shortens duration, inhibitor raises plasma level
self-effect: both act on their own metabolism too

---

# Item
## id
CLM-FND-RENAL-EXCRETION-01
## concept_id
CON-FND-88101C454AAF1D
## subject
Renal excretion of a drug
## predicate
is the result of
## object
glomerular filtration, active tubular secretion and tubular reabsorption together
## display_text
Renal excretion is the result of glomerular filtration together with active tubular secretion and reabsorption: glomerular filtration is passive and takes water-soluble non-protein-bound drugs of molecular weight under 500 daltons, while active tubular excretion is saturable and is a site for competition between drugs and therefore for drug interactions.
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
count: three processes
saturable: the tubular secretion step, not filtration

---

# Item
## id
CLM-FND-NON-RENAL-EXCRETION-01
## concept_id
CON-FND-67D5E471045317
## subject
Drugs
## predicate
are also excreted through
## object
the lungs, the alimentary tract including bile and saliva, and the skin glands including sweat and milk
## display_text
The kidney is the most important route of drug removal but not the only one: the lungs excrete gases and volatile liquids, the alimentary tract excretes drugs in saliva, from the stomach, and in bile — from which a drug may be reabsorbed in the small intestine and undergo enterohepatic circulation — and the skin glands excrete drugs in sweat and in milk, where they may affect a suckling baby.
## risk_class
clinical_non_treatment
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
hazard: milk reaches the infant
mechanism: biliary excretion may recycle through enterohepatic circulation

---

# Item
## id
CLM-FND-FIRST-ZERO-ORDER-01
## concept_id
CON-FND-BB7BEEC27836BE
## subject
First-order elimination
## predicate
removes
## object
a fixed fraction of the drug per unit time, whereas zero-order removes a fixed amount because the enzyme or carrier is saturated
## display_text
In first-order kinetics the kinetics of the drug are proportional to its concentration, a fixed fraction of the drug is eliminated per unit time, the disappearance curve is linear and the half-life is constant; in zero-order kinetics the capacity is limited by saturation of the enzyme or carrier, so the rate is fixed and not proportional to concentration, a fixed amount is eliminated per unit time, the curve is non-linear, and the half-life increases as concentration increases.
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
first order: fixed fraction, constant t1/2
zero order: fixed amount, t1/2 rises with concentration

---

# Item
## id
CLM-FND-PLASMA-HALF-LIFE-01
## concept_id
CON-FND-955AD7B6FE6F03
## subject
Plasma half-life
## predicate
is
## object
the time needed for the plasma drug concentration to decrease to one half
## display_text
Plasma half-life is the time needed for the plasma drug concentration to decrease to one half. It is constant only under first-order elimination, since in zero-order kinetics the half-life increases as the drug concentration increases; and for some drugs the biological half-life exceeds the plasma half-life, where the effect persists after the drug has left the plasma.
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
constancy: only in first-order elimination

---

# Item
## id
CLM-FND-HALF-LIFE-APPLICATIONS-01
## concept_id
CON-FND-3D0ACE759233EC
## subject
Four to five half-lives
## predicate
are needed for
## object
a drug to reach steady state on repeated dosing, and for more than 95 per cent of it to leave the body after stopping
## display_text
Repeated administration of a drug that follows first-order elimination at regular intervals reaches a plateau or steady-state plasma concentration within four to five half-lives, and more than 95 per cent of the drug disappears from the body within four to five half-lives after its intake stops; the half-life is therefore what determines the frequency and route of administration.
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
symmetry: the same four to five half-lives fill and empty the body
precondition: first-order elimination

---

# Item
## id
CLM-FND-STEADY-STATE-01
## concept_id
CON-FND-7A66C16BA5029C
## subject
Steady state
## predicate
is reached when
## object
the rate of drug administration equals the rate of drug elimination
## display_text
A steady-state concentration is maintained when the dose regimen replaces the medication at approximately the rate at which it is eliminated, so that the rate of drug administration equals the rate of drug elimination; the most accurate way to achieve this is a constant intravenous infusion, and an approximation to it can be reached with repeated doses.
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
condition: rate in equals rate out

---

# Item
## id
CLM-FND-DRUG-ACTION-MECHANISMS-01
## concept_id
CON-FND-1A18E2FEA47B37
## subject
Drugs
## predicate
act through
## object
physical or chemical means, interference with cell division or a metabolic pathway, enzyme inhibition, action on ion channels or membrane carriers, or action on specific receptors
## display_text
Drugs may act through one or more of eight mechanisms: physical, such as adsorption or osmosis; chemical, such as neutralization or chelation; interference with cell division; interference with a metabolic pathway; inhibition of enzymes; action on ionic channels in the cell membrane; inhibition of membrane carriers; and action on specific receptors, which the book calls the most common mechanism of drug action.
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
count: eight mechanisms
most common: action on specific receptors

---

# Item
## id
CLM-FND-RECEPTOR-AFFINITY-01
## concept_id
CON-FND-38CD8C0BD5B4DE
## subject
A receptor
## predicate
is
## object
a chemo-sensitive and chemo-selective protein macromolecule that interacts specifically with a ligand to produce a biological response
## display_text
A receptor is a chemo-sensitive and chemo-selective protein macromolecule that interacts specifically with a ligand — a drug, transmitter or hormone — to produce a biological response, and it may lie in the cell membrane, the cytoplasm or the nucleus. Affinity is the ability of a drug to fit onto the receptor and form a drug-receptor complex; efficacy, or intrinsic activity, is the ability of that complex to evoke a response. The two are separate properties, and an antagonist has the first without the second.
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
distinction: affinity is binding, efficacy is producing an effect

---

# Item
## id
CLM-FND-POTENCY-VS-EFFICACY-01
## concept_id
CON-FND-17149EED384DCA
## subject
Efficacy
## predicate
is compared by
## object
the maximum effect a drug can produce, whereas potency is compared by the dose needed to produce the same submaximal effect
## display_text
On a log dose-response curve, efficacy is compared between drugs by their Emax and potency by the doses that produce the same submaximal effect, so the two are read off different axes: a drug can be more potent than another — needing a smaller dose — while reaching a lower maximum effect, and therefore having lower efficacy.
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
efficacy: read off Emax
potency: read off the dose for an equal submaximal effect

---

# Item
## id
CLM-FND-LIGAND-TYPES-01
## concept_id
CON-FND-4388E0D8A75FD4
## subject
Ligands
## predicate
are classified by
## object
their interaction with the receptor into agonists, antagonists and partial agonists
## display_text
Drugs are classified according to the nature of their interaction with receptors into agonists, which have affinity, efficacy and rapid dissociation; antagonists, which block receptors and have affinity, no efficacy and slow dissociation; and partial agonists, which produce a lower response than a full agonist even at full receptor occupancy and which behave like a weak agonist when no agonist is present and like an antagonist in the presence of a full agonist.
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
count: three types in this book
limit: the book teaches no inverse agonist; the string "inverse" does not occur in its 34 cached pages

---

# Item
## id
CLM-FND-COMPETITIVE-ANTAGONISM-01
## concept_id
CON-FND-138FC0AB7A3461
## subject
A competitive antagonist
## predicate
produces
## object
a surmountable block that shifts the agonist curve right without reducing Emax, whereas a non-competitive antagonist produces a non-surmountable block that reduces Emax
## display_text
A competitive antagonist binds reversibly and can be displaced by excess agonist, so the block is surmountable: the agonist concentration-response curve shifts to the right, potency falls, and there is no effect on the maximum response, so efficacy is unchanged. A non-competitive antagonist is not displaced by agonist, so the block is non-surmountable, and it decreases the maximum response to the agonist.
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
competitive: Emax unchanged, curve shifts right
non-competitive: Emax reduced

---

# Item
## id
CLM-FND-IRREVERSIBLE-ANTAGONISM-01
## concept_id
CON-FND-390F2D9EC3D6DC
## subject
An irreversible antagonist
## predicate
binds
## object
covalently, so its block ends only with the resynthesis of new receptors
## display_text
A reversible non-competitive antagonist's block ends by metabolism of the antagonist and is usually short-acting; an irreversible one binds covalently to the receptor, so its block ends only by resynthesis of new receptors and is usually long-acting.
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
bond: covalent
termination: new receptor synthesis, not metabolism of the blocker

---

# Item
## id
CLM-FND-RECEPTOR-TYPES-01
## concept_id
CON-FND-42F34977A8DF23
## subject
The four receptor types
## predicate
transduce signals over
## object
four different timescales, from milliseconds at a ligand-gated ion channel to hours at a gene-active intracellular receptor
## display_text
There are four types of receptor and each works on its own timescale: a ligand-gated ionic channel receptor changes membrane permeability to ions within milliseconds of binding; a G-protein-coupled receptor works through second messengers or ion channels over a few seconds to minutes; an enzyme-linked tyrosine kinase receptor gives non-genomic actions in seconds to minutes and genomic actions over hours; and a gene-active intracellular receptor modulates gene transcription and protein synthesis with a delayed lasting effect measured in hours.
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
count: four types
axis: latency from binding to cellular response

---

# Item
## id
CLM-FND-ADR-CLASSIFICATION-01
## concept_id
CON-FND-D957928472CA57
## subject
Adverse drug reactions
## predicate
are classified into
## object
five types, A augmented, B bizarre, C chronic, D delayed and E end-of-use
## display_text
An adverse drug reaction is a noxious and unintended response to a medicine, and the department book classifies them into five lettered types: Type A, augmented or predictable; Type B, bizarre or unpredictable; Type C, the effects of prolonged use; Type D, delayed effects appearing long afterwards, even after the drug is stopped; and Type E, end-of-use effects following sudden withdrawal after long-term treatment.
## risk_class
clinical_non_treatment
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
count: five types, A to E
definition source: European Medicines Agency, as the book attributes it

---

# Item
## id
CLM-FND-ADR-TYPE-A-B-01
## concept_id
CON-FND-062BA29B028382
## subject
Type A adverse reactions
## predicate
are
## object
predictable effects related to the drug's normal pharmacological actions, whereas Type B reactions are bizarre and unpredictable from them
## display_text
Type A reactions are predictable undesirable effects related to the normal pharmacological actions of the drug, and include side effects, secondary effects, overdose, supersensitivity, drug intolerance, direct cytotoxic effects and drug interactions; Type B reactions are bizarre and unpredictable, are not extensions of the drug's pharmacology, and comprise allergy and idiosyncrasy.
## risk_class
clinical_non_treatment
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
type A: predictable from pharmacology
type B: not predictable from pharmacology

---

# Item
## id
CLM-FND-ALLERGY-IDIOSYNCRASY-01
## concept_id
CON-FND-7FFD028F1C7B58
## subject
Drug allergy
## predicate
is
## object
an immune-mediated response that does not occur on first exposure, whereas idiosyncrasy is genetically determined and does occur on first exposure
## display_text
Allergy is an unpredictable abnormal response to a drug due to an immune reaction, in which the drug or its metabolite acts as an antigen or hapten, and it does not happen on first exposure to the drug; idiosyncrasy is an unpredictable abnormal response due to a genetic abnormality and does occur on first exposure. Supersensitivity is different from both: it is an exaggerated but otherwise normal pharmacological action produced by a small therapeutic dose in some individuals because their tissue is hyper-responsive.
## risk_class
clinical_non_treatment
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
discriminator: first exposure — allergy no, idiosyncrasy yes
supersensitivity: a Type A reaction, not a Type B one

---

# Item
## id
CLM-FND-ADR-TYPE-C-D-E-01
## concept_id
CON-FND-2A5DE8657047E4
## subject
Type C, D and E adverse reactions
## predicate
declare themselves
## object
late — on prolonged use, long after exposure, and on stopping the drug respectively
## display_text
The last three adverse reaction types are all late: Type C reactions are the effects of prolonged use of a drug, comprising tolerance, drug dependence and iatrogenic disease; Type D reactions are delayed effects appearing after a long time and even after the drug is stopped, comprising teratogenicity and mutagenicity, where mutation in somatic cells gives carcinogenicity and in germ cells gives infertility or teratogenicity; and Type E reactions are the adverse effects of stopping a drug suddenly after long-term treatment.
## risk_class
clinical_non_treatment
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
timing: during prolonged use, long after exposure, and on withdrawal

---

# Item
## id
CLM-FND-ACQUIRED-TOLERANCE-01
## concept_id
CON-FND-A1FC8CB691E6C5
## subject
Acquired tolerance
## predicate
arises through
## object
pharmacokinetic changes such as reduced absorption or enzyme induction, or pharmacodynamic changes such as receptor down-regulation or antibody formation
## display_text
Acquired tolerance is a progressive decrease of drug sensitivity as a result of continued administration, and its mechanism is a change in either kinetics or dynamics: pharmacokinetic changes are decreased absorption or induction of the hepatic microsomal enzymes, and pharmacodynamic changes are down-regulation of receptors or antibody formation.
## risk_class
clinical_non_treatment
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
two mechanisms: kinetic and dynamic
distinguish from: congenital or inborn tolerance, which the book treats separately

---

# Item
## id
CLM-FND-DRUG-DEPENDENCE-01
## concept_id
CON-FND-57E821D46F016D
## subject
Drug dependence
## predicate
has three subtypes
## object
habituation or psychic dependence, physical dependence, and addiction
## display_text
Habituation, or psychic dependence, is the drive for continuous administration of a drug to produce pleasure and a sense of well-being; physical dependence is a state of body adaptation to the presence of the drug in which abrupt cessation produces an intense drug-specific withdrawal syndrome whose symptoms are usually the reverse of what the substance does; and addiction, or substance dependence, is a neuropsychological disorder arising from repeated or continuous use, consisting of a strong internal drive to use the substance, in which impaired control or increasing priority must be present even though tolerance, physical dependence and withdrawal may also be expected.
## risk_class
clinical_non_treatment
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
count: three subtypes
addiction: impaired control or increasing priority is the essential feature

---

# Item
## id
CLM-FND-DRUG-INTERACTION-TYPES-01
## concept_id
CON-FND-7F618A3D1F940B
## subject
Drug interactions
## predicate
are of three types
## object
pharmaceutical, occurring outside the body before administration; pharmacokinetic, affecting ADME; and pharmacodynamic, occurring at the site of action
## display_text
Drug interactions are altered pharmacological responses due to multiple drugs acting concurrently, and may be beneficial or harmful. They are of three types: pharmaceutical interactions, which occur outside the body before administration as a physical or chemical reaction between the drugs; pharmacokinetic interactions, which affect absorption, distribution, metabolism or excretion; and pharmacodynamic interactions, which occur at sites of action, at receptor sites or through secondary physiological mechanisms.
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
count: three types
boundary: pharmaceutical interactions happen in vitro, before the drug is given

---

# Item
## id
CLM-FND-DRUG-COMBINATION-RESULTS-01
## concept_id
CON-FND-CE72B2E63A736B
## subject
Two drugs given together
## predicate
may
## object
summate, synergise, potentiate, reverse each other's action, or antagonise each other
## display_text
The results of a drug interaction are distinct and are not interchangeable words: addition or summation, where the resultant action equals the sum of the individual actions; synergism, where the resultant action exceeds that sum; potentiation, where one drug has no action of its own but increases the effect of another; reversal of action; and antagonism, which occurs when drugs of opposing actions are used.
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
count: five named results
arithmetic: the book writes them as 1+1=2, 1+1>2 and 1+0>1

---

# Item
## id
CLM-FND-CHEMICAL-PHYSIOLOGICAL-ANTAGONISM-01
## concept_id
CON-FND-A1E2092A49359C
## subject
Chemical and physiological antagonism
## predicate
work without
## object
a shared receptor — one drug inactivating the other chemically, the other opposing it through a different receptor
## display_text
Antagonism need not happen at one receptor. In chemical antagonism one drug reacts chemically with an active drug to form an inactive compound. In physiological antagonism two agonists act on two different receptors to produce opposite actions. Only pharmacological antagonism, competitive or non-competitive, involves two drugs acting on one receptor.
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
shared receptor: absent in chemical and physiological antagonism, present in pharmacological

---

# Item
## id
CLM-FND-THERAPEUTIC-INDEX-01
## concept_id
CON-FND-BB0DBAE1BC802B
## subject
The therapeutic index
## predicate
is
## object
the ratio of the median lethal dose to the median effective dose, and is a measure of safety
## display_text
The therapeutic index is the ratio of the dose that produces toxicity in half of cases to the dose that produces an effective response in half of cases, and it is a measure of a drug's safety rather than of its potency, because a larger value indicates a wide margin between effective and toxic doses. The therapeutic window is a more clinically relevant index of safety and describes the dosage range between the minimum effective therapeutic dose and the minimum toxic dose.
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
measures: safety, not potency
contrast: the therapeutic window is the more clinically relevant of the two

---

# Item
## id
CLM-FND-ROUTES-ENUMERATED-01
## concept_id
CON-FND-6A60CE8D2E7C5C
## subject
Routes of drug administration
## predicate
are taught as
## object
a numbered series — oral, sublingual and buccal, rectal, parenteral, and topical
## display_text
The department book enumerates the routes of drug administration as a numbered series: the oral route, the sublingual and buccal route, the rectal route, the parenteral routes with their subdivisions including intra-arterial, intra-cardiac, intra-thecal and intra-articular injection, and the topical route, whose target is either a local effect or a systemic one through a transdermal delivery system.
## risk_class
clinical_non_treatment
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
limit: the book never uses the word "enteral" — the string does not occur in its 34 cached pages except inside "Parenteral"

---

# Item
## id
CLM-FND-ORAL-ROUTE-01
## concept_id
CON-FND-3CC8853A7D6DA8
## subject
The oral route
## predicate
is
## object
easy, safe, economic and convenient, at the price of a delayed onset and unsuitability in several circumstances
## display_text
The oral route is administration of a drug to be swallowed through the mouth. Its advantages are that it is easy, safe, economic and convenient. It is not suitable for emergency situations because of its delayed onset, for uncooperative patients such as the comatose, psychotic, infants and children, in vomiting or severe diarrhoea, for highly irritant drugs, or for poorly absorbable drugs when a systemic effect is needed, and some drugs undergo extensive first-pass metabolism by digestive enzymes or by hepatic microsomal enzymes.
## risk_class
clinical_non_treatment
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
advantages: four named
unsuitable: six circumstances named

---

# Item
## id
CLM-FND-IV-TYPES-01
## concept_id
CON-FND-6235934A8DD0FE
## subject
Intravenous administration
## predicate
is of three types
## object
bolus, slow injection and infusion, differing in speed, in control and in the volume they can deliver
## display_text
Intravenous administration is of three types: an intravenous bolus, shot or push, in which a few millilitres are injected rapidly by syringe, with a cannula used if repeated administration is needed; a slow intravenous injection, given as a shot but over a few minutes; and an intravenous infusion, given through a catheter and cannula, by which a large volume of intravenous fluid can be administered.
## risk_class
clinical_non_treatment
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
count: three types
axis: speed, control and deliverable volume
