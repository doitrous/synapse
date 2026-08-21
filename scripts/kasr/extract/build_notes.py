#!/usr/bin/env python3
"""Assembles notes.json for the 101 ISK Notes / Important & Summaries /
Orientation batch. Content below is transcribed from the extracted page text
(see notes.py for the extraction); nothing is added from outside the sources."""
import json, os

SID = {
    "blood":  "src_450c71dc6273b2e64ca3",
    "ct":     "src_d56198df979fc164f6c6",
    "cyto":   "src_0abbf6bc25c43a087d36",
    "embryo": "src_e84b7068de7e199d218f",
    "epi":    "src_79ef34f0f9d8de85acae",
    "basis":  "src_8054875331d47d3f225a",
    "upper":  "src_8ebe255353ca4d184c5f",
    "summ":   "src_647a13d829db0d2a6584",
    "orient": "src_74fc311be0aa4fb140d6",
}
FN = {
    "blood":  "Blood  word JPG 2025.pdf",
    "ct":     "Connective tissue word 2025 JPG.pdf",
    "cyto":   "Cytology word 2025 JPG.pdf",
    "embryo": "Embryology  book end (1)-1-نسخ (1).pdf",
    "epi":    "Epithelium text 2025 JPG.pdf",
    "basis":  "UII9G23_09_2025_12_36_07.pdf",
    "upper":  "Upper 2026_87065.pdf",
    "summ":   "ملخص أسئلة سنين101  (3)IMPORTANT SUMMARY.pdf",
    "orient": "Orientation of Final Written Anatomy Exam (First Year-2025) (2).pdf",
}
H = "101 ISK > Histology"
A = "101 ISK > Anatomy"

def T(k, page, path, title, kp, nums=None, mn=None, figs=None):
    return {"sourceId": SID[k], "file": FN[k], "startPage": page,
            "subjectPath": path, "title": title, "keyPoints": kp,
            "numbers": nums or [], "mnemonics": mn or [], "figures": figs or []}

def Q(k, page, text, year=None, kind="mcq", topic=None):
    return {"sourceId": SID[k], "page": page, "text": text, "year": year,
            "kind": kind, "topic": topic}

FILES = [
 {"file": FN["blood"], "sourceId": SID["blood"], "pages": 15, "method": "ocr", "capped": False,
  "whatItIs": "Prof. Dalia El Marakby's (Kasr Al Ainy Histology) scanned tabular lecture handout on Blood — RBCs, platelets, granular and non-granular leucocytes, leucocytic counts and haemopoiesis.",
  "language": "en"},
 {"file": FN["ct"], "sourceId": SID["ct"], "pages": 12, "method": "ocr", "capped": False,
  "whatItIs": "Prof. Dalia El Marakby's scanned Histology handout on Connective Tissue — C.T. cells, fibres and the types of C.T. proper.",
  "language": "en"},
 {"file": FN["cyto"], "sourceId": SID["cyto"], "pages": 18, "method": "ocr", "capped": False,
  "whatItIs": "Prof. Dalia El Marakby's scanned Histology handout on Cytology — cell membrane, every organelle, inclusions and the nucleus.",
  "language": "en"},
 {"file": FN["embryo"], "sourceId": SID["embryo"], "pages": 55, "method": "native", "capped": False,
  "whatItIs": "A VIP Academy illustrated revision book, 'Module 101 — General Embryology', running from gametes to the fetal period and twins, with a 'Test yourself' MCQ page closing each chapter.",
  "language": "en"},
 {"file": FN["epi"], "sourceId": SID["epi"], "pages": 10, "method": "ocr", "capped": False,
  "whatItIs": "Prof. Dalia El Marakby's scanned Histology handout on Epithelium — surface, glandular, neuro- and myo-epithelium plus junctions and the basement membrane.",
  "language": "en"},
 {"file": FN["basis"], "sourceId": SID["basis"], "pages": 58, "method": "native", "capped": False,
  "whatItIs": "Not an unknown file: it is the VIP Academy illustrated revision book 'Module 101 — Basis of Human Anatomy', covering Introduction, Fascia, Skeletal, Articular, Muscular, Nervous, Cardiovascular and Lymphatic systems, with per-chapter 'Test yourself' MCQs; the filename is only a scanner-generated string.",
  "language": "en"},
 {"file": FN["upper"], "sourceId": SID["upper"], "pages": 164, "method": "native", "capped": False,
  "whatItIs": "The VIP Academy illustrated revision book for the Upper Limb — 23 indexed chapters from bones to joints and arterial surface anatomy, with 23 'Test yourself' MCQ pages; note its cover reads 'Module 205' while every content page runs the header 'Module 101 Upper limb'.",
  "language": "en"},
 {"file": FN["summ"], "sourceId": SID["summ"], "pages": 29, "method": "ocr", "capped": False,
  "whatItIs": "Confirmed by reading: despite the Arabic title ('summary of past years' questions'), the body is entirely English and is a past-question-driven revision digest — model answers filed under the exam question stems that recur, grouped Muscles / Nerves / Arteries / Joints / Spaces / Embryo / Basis, with question stems marked 'Q.' and a few carrying stated mark values.",
  "language": "mixed"},
 {"file": FN["orient"], "sourceId": SID["orient"], "pages": 1, "method": "native", "capped": False,
  "whatItIs": "The Department of Anatomy and Embryology's one-page orientation for the end-of-year written Anatomy exam 2025-2026, stating the mark allocation, the paper format and the examinable topic list.",
  "language": "mixed"},
]

ORIENTATION = {
 "verbatim": """1st Year- Department of Anatomy and Embryology
Orientation of final Anatomy Exam (End of Year, 2025- 2026)
(1st Year Medical Students-Modular System)

Module    Marks
101       60

Topics of Introduction Module MSK (101) (marks 60)
- 8 SAQ (2 basis-2 embryology) 6 marks each and (4 upper) 7 marks each with total 54 mark.
- 2 cases, 3 marks each with total 6 mark.

I) Introduction to basis of Human anatomy
   Fascia (Superficial & Deep)
   Bones
   Joints (Fibrous, Cartilaginous and Synovial)
   Muscles

II) General Embryology:
   Fertilization
   Implantation
   Decidua
   Notochord
   Intra-embryonic mesoderm
   Folding
   Fetal membranes (Chorion-Amnion- Placenta- Umbilical cord)

III) Upper Limb:
   Muscles: All muscles (attachment, nerve supply and action) except muscles of the hand (nerve supply and action).
   Nerves: Brachial plexus, Median, Radial, Ulnar, Axillary, Musculo-cutaneous nerves (origin, root value, end, course, name of branches with areas supplied by these branches and the effect of injury) and cutaneous nerve supply of upper limb.
   Vessels: All arteries of the upper limb (beginning, course, end and name of the branches and areas supplied by these branches with anastomosis or arches if present) and all veins of the upper limb (beginning, course, end and name of the tributaries and areas drained by these tributaries).
   Spaces: Intermuscular spaces of shoulder, Axilla, Cubital fossa, Snuff box, Carpal tunnel.
   Fasciae: clavipectoral fascia, flexor & extensor retinaculae.
   Joints: All joints except joints of the hand (type, subtype, articulating surfaces, ligaments, movements and name of muscles producing these movements).

رئيس مجلس قسم التشريح
أ.د.حنان نبيه جادالله
[Head of the Anatomy Department Board — Prof. Dr Hanan Nabih Gadallah]""",
 "marksStated": [
   {"scope": "Module 101, end of year written Anatomy", "marks": 60},
   {"scope": "8 SAQ total", "marks": 54},
   {"scope": "each basis SAQ (2 questions)", "marks": 6},
   {"scope": "each embryology SAQ (2 questions)", "marks": 6},
   {"scope": "each upper limb SAQ (4 questions)", "marks": 7},
   {"scope": "2 cases total", "marks": 6},
   {"scope": "each case (2 cases)", "marks": 3}
 ],
 "formatsStated": [
   "8 short-answer questions (SAQ): 2 on basis of anatomy, 2 on embryology, 4 on upper limb",
   "2 clinical cases",
   "Topic list is explicitly bounded: hand muscles are excluded from the nerve-supply/action requirement and joints of the hand are excluded from the joints requirement"
 ]
}

TOPICS = []

# ---- Cytology (Dr Dalia El Marakby) ----
TOPICS += [
 T("cyto", 2, H+" > Cytology > The cell", "The cell — definition, size, shape, structure", [
   "Definition: the basic structural and functional unit of the living body.",
   "Functions listed: absorption, respiration, secretion, excretion, sensation, conduction, contraction, movement, growth and reproduction.",
   "Shapes: rounded, oval, flat, stellate, polygonal, cubical, columnar.",
   "The animal cell is eukaryotic and is formed of cytoplasm and nucleus.",
   "Cytoplasmic contents are classified into organelles (vital functions), inclusions (results of cell activity) and fluid/ground substance; organelles are grouped by whether they have a limiting membrane."],
   ["size range 4 microns (granular cells of the cerebellum) to 150 microns (ovum)"]),
 T("cyto", 3, H+" > Cytology > Cytoplasm", "Membranous vs non-membranous organelles; the cell membrane", [
   "Membranous organelles: plasma membrane, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, peroxisomes.",
   "Non-membranous organelles: ribosomes and cytoskeleton (microtubules — centrioles, cilia, flagella; filaments — thin and intermediate).",
   "Cell membrane is too thin to be seen by LM; demonstrated with silver (Ag) or PAS stains.",
   "EM: two electron-dense layers separated by an electron-lucent one — a trilaminar or 'unit membrane'; a fuzzy outer coat is the glycocalyx.",
   "Phospholipids form a bilayer, hydrophilic heads outwards and tails inwards; selective permeability makes the membrane a barrier between internal and external environment.",
   "Cholesterol lies among the hydrophobic fatty acids: restricts phospholipid movement (stabilises) and modulates fluidity."],
   ["membrane thickness 7.5-10 nm"],
   None,
   [{"page": 3, "caption": "Fluid-mosaic diagram of the cell membrane labelling protein channel, cholesterol, integral/peripheral protein, hydrophilic heads and hydrophobic tails", "kind": "diagram"}]),
 T("cyto", 4, H+" > Cytology > Cytoplasm", "Membrane proteins, carbohydrates and the cell coat", [
   "Protein is about 50% of total membrane mass, in two forms: peripheral (small molecules, non-continuous layer outside the bilayer, loosely attached, on both surfaces) and integral (embedded in the bilayer).",
   "Integral proteins are of two types: channel proteins for ions and water, and carrier proteins for small polar molecules such as glucose and ions (Na-K pump).",
   "Carbohydrate sits on the external surface as oligosaccharide attached to protein (glycoprotein) or to phospholipid (glycolipid).",
   "Cell coat (glycocalyx) is formed of glycoproteins and glycolipids on the external surface, includes receptors for drugs, hormones, bacteria and viruses.",
   "Functions of the cell coat: cell immunity, identification (receptor), adhesion and protection."],
   ["protein about 50% of total membrane mass"]),
 T("cyto", 5, H+" > Cytology > Cytoplasm", "Endocytosis and exocytosis", [
   "Endocytosis: bulk movement of substances into the cell by forming vesicles; three forms — phagocytosis, pinocytosis, receptor-mediated endocytosis.",
   "Exocytosis: bulk movement from inside to outside by vesicles which fuse with the cell membrane and discharge into the extracellular space without affecting the continuity of the cell membrane."],
   [], None,
   [{"page": 5, "caption": "Three-panel diagram contrasting phagocytosis (phagosome/food vacuole), pinocytosis (vesicle) and receptor-mediated endocytosis (coated vesicle)", "kind": "diagram"}]),
 T("cyto", 6, H+" > Cytology > Cytoplasm", "Mitochondria", [
   "Membranous organelles containing the enzymes of aerobic respiration and energy production — 'the powerhouse of the cell'; found in the area of most activity.",
   "More numerous in active cells; increase in number by simple division.",
   "LM: make cytoplasm acidophilic when abundant; special stains iron haematoxylin (dark blue) and Janus green (green); appear as granules or rods.",
   "EM: rounded or oval vesicles surrounded by two unit membranes; the inner is thrown into cristae.",
   "Energy from metabolites via Krebs (citric acid) cycle enzymes; most energy stored as ATP by oxidative phosphorylation enzymes; some released as heat."],
   ["about 2000 mitochondria per liver cell"],
   None,
   [{"page": 6, "caption": "EM structure of a mitochondrion showing cristae, outer and inner membranes and elementary particles", "kind": "diagram"}]),
 T("cyto", 7, H+" > Cytology > Cytoplasm", "Endoplasmic reticulum and Golgi apparatus", [
   "ER: communicating membranous channels and cisternae extending from nucleus to cell membrane; two types by presence or absence of ribosomes on the surface (rough / smooth).",
   "rER when abundant causes basophilia (diffuse basophilia); sER when abundant causes acidophilia.",
   "Golgi apparatus: membranous organelle responsible for secretion, well developed in secretory cells; each stack has an entry (cis) face receiving transfer vesicles from rER and an exit (trans) face budding secretory vesicles or lysosomes.",
   "Golgi functions: packing, concentration and storage of protein from rER; chemical modification of proteins and lipids by adding carbohydrate; formation of lysosomes and secretory vesicles; discharge of hormones in secretory vesicles; renewal and maintenance of the cell membrane."]),
 T("cyto", 9, H+" > Cytology > Cytoplasm", "Lysosomes and peroxisomes", [
   "Lysosome: membranous organelle for intracytoplasmic digestion, containing hydrolytic enzymes (protease, sulfatase); a secretory vesicle arising from Golgi.",
   "Enzymes are formed in rER, transferred to Golgi as transfer vesicles and released as lysosomes; abundant in phagocytic cells (macrophages, neutrophils).",
   "Not detected by H&E; detected by histochemical stain for the hydrolytic enzymes.",
   "Primary lysosome = newly released, homogeneous moderate electron density; secondary = heterogeneous with variable contents — phagolysosome (with solid particles), multivesicular body (with pinocytic vesicle), autolysosome (with autophagic vesicle e.g. destroyed mitochondria).",
   "Undigested material stays as residual bodies, discharged by exocytosis (cytostool) or accumulating over years in long-lived cells (nerve, cardiac muscle) as lipofuscin (age) pigment.",
   "Lysosome functions: digest nutrients, bacteria and viruses; remove non-functional organelles; postmortem autolysis; fertilization (sperm head penetrating the ovum); activation of thyroid hormones.",
   "Medical application stated: lack of lysosomal sulfatase raises sulfated compounds and interferes with normal nerve cell function.",
   "Peroxisomes (microbodies): membranous vesicles budding from rER containing oxidases and catalase; more in liver and kidney cells; divide by fission.",
   "Peroxisome function: beta-oxidation of long-chain fatty acid giving energy released as heat (not stored as ATP) plus toxic H2O2, which catalase breaks down to H2O + O2."]),
 T("cyto", 10, H+" > Cytology > Cytoplasm", "Ribosomes and protein synthesis", [
   "Non-membranous particles formed of rRNA and protein; formed in the nucleolus and pass through nuclear pores to the cytoplasm.",
   "Abundant in protein-forming cells such as plasma cells; when abundant they make cytoplasm basophilic (due to acidity of phosphate).",
   "EM: small electron-dense granules formed of a small and a large subunit, united by mRNA; the large subunit has a central groove holding the polypeptide chain.",
   "Two forms: free ribosomes/polysomes, and ribosomes bound to the outer surface of rER by their large subunits at glycoprotein receptors (ribophorins).",
   "mRNA carries the amino-acid sequence; tRNA brings amino acids to the ribosome (rRNA), the polypeptide chain passes through the groove into the rER cisterna.",
   "Free ribosomes form proteins for the cell itself (e.g. glycolytic enzymes); attached ribosomes form export proteins (digestive enzymes, protein hormones)."]),
 T("cyto", 11, H+" > Cytology > Cytoplasm", "Cytoskeleton — microtubules, microfilaments, intermediate filaments", [
   "Cytoskeleton = microtubules + microfilaments + intermediate filaments plus linking proteins, forming a micro-trabecular lattice.",
   "Microtubules: hollow cylinders of fixed diameter, wall of 13 protofilaments of alpha and beta tubulin; length changes by polymerization directed by the microtubule organizing centre (MTOC) which contains gamma tubulin.",
   "Microfilaments: fine strands of 2 chains of globular G actin coiled to form filamentous F actin; sited under the cell membrane, in microvilli and cilia.",
   "Intermediate filaments: formed by polymerization of tetrameric subunits of different proteins; support function.",
   "Named intermediate filaments: keratin in epithelial cells, vimentin in connective tissue and muscle, filaments in muscle cells, in neurons, in glial cells of nervous tissue, and lamins in the nuclear envelope.",
   "Microtubule functions: determine cell shape and elongation; intracellular transport of macromolecules, vesicles and organelles; form the mitotic spindle; form centrioles, cilia and flagella.",
   "Microfilament functions: cell shape change in endocytosis, exocytosis and amoeboid movement; intracellular transport; cleavage during cell division; muscle contraction; form the microvillus core.",
   "Medical application stated: cancer chemotherapy arrests tumour cell proliferation by preventing microtubule formation; immunohistochemical identification of intermediate-filament protein helps tumour diagnosis and treatment."],
   ["microtubule diameter 25 nm (page states 25nm alongside the other filament diameters)"]),
 T("cyto", 13, H+" > Cytology > Cytoplasm", "Centrioles, cilia, flagella, microvilli and stereocilia", [
   "Centrioles: cylindrical structures composed of microtubules; appear with iron haematoxylin as two dark bodies near the nucleus; 2 cylinders at right angles surrounded by a matrix of tubulin (centrosome).",
   "Each centriole is formed of 27 microtubules arranged in 9 bundles of 3 (triplets), i.e. 9 x 3 = 27.",
   "Centriole functions: form the mitotic spindle (centrosome duplicates, moves to opposite poles, becomes MTOC) and share in the formation of cilia and flagella.",
   "Cilium is formed of 3 parts: basal body, shaft and rootlets. The basal body is a single centriole of 27 microtubules in 9 triplets, embedded in the cytoplasm.",
   "Shaft axoneme: from each triplet the inner two microtubules (A and B) push the cell membrane forwards giving 9 doublets peripherally plus 2 central singlets = 20 microtubules.",
   "Rootlets are formed by growth of microtubule C of each triplet into the cytoplasm (9 MT) and fix the basal body and shaft.",
   "Cilia function: repeated beating by bending adjacent doublets moves secretions or particles in one direction (respiratory system, female genital system); modified cilia act as receptors, e.g. rods and cones of the retina.",
   "Flagella have the same axoneme (9 peripheral doublets + 2 central singlets) but are extremely longer; form the sperm tail.",
   "Medical application stated: immotile cilia cause chronic respiratory infection; immotile flagella cause male infertility.",
   "Stereocilia: long microvilli, not true cilia; LM apical striated brush border; sites given as small intestine and epididymis."]),
 T("cyto", 15, H+" > Cytology > Cytoplasm", "Cytoplasmic inclusions", [
   "Inclusions are either produced by the cell or taken from outside; pigments possess a colour of their own nature.",
   "Glycogen: stored in liver and muscle cells; dissolves in H&E and appears as vacuoles; Best's carmine gives red granules, PAS gives magenta red; EM single granules or rosette-shaped aggregations.",
   "Fat: in fat cells as large globules, in liver cells as small droplets; appears as vacuoles in H&E as fat dissolves; Sudan III gives orange globules; concentrated in areas of cytoplasm rich in sER.",
   "Pigments named: haemoglobin in RBCs (carries O2 and CO2); melanin in skin (colour and UV protection); lipofuscin in cardiac muscle and nerve cells; carbon/dust particles in dust cells of the lung; carotene; tattoo dyes taken up by phagocytic cells."]),
 T("cyto", 16, H+" > Cytology > Nucleus", "The nucleus — general features and nuclear membrane", [
   "Largest component of the cell; present in all cells except RBCs and platelets (which the source calls not true cells).",
   "Usually one nucleus; binucleated as in liver cells; multinucleated as in osteoclasts and skeletal muscle.",
   "Position may be central, eccentric, basal or peripheral; shape rounded, flattened, oval, kidney-shaped, segmented, bilobed or multilobed; basophilic in H&E due to DNA and RNA content.",
   "Vesicular (pale) nucleus in active cells e.g. nerve cells; dark nucleus in inactive cells e.g. small lymphocytes.",
   "Four components: nuclear membrane (envelope), chromatin material, nucleolus, nuclear sap.",
   "Nuclear envelope: two parallel unit membranes separated by a perinuclear space, interrupted by nuclear pores; outer membrane rough with ribosomes and continuous with rER; inner associated with nuclear lamina of lamins that stabilise the nucleus.",
   "Nuclear pores: circular openings where inner and outer membranes fuse, formed of about 30 nucleoporin proteins in an octagonal ring; transport proteins into the nucleus and RNA/ribosomal subunits out."],
   ["perinuclear space 30-50 nm", "about 30 nucleoporin proteins per pore"]),
 T("cyto", 17, H+" > Cytology > Nucleus", "Chromatin, nucleolus and nuclear sap", [
   "Chromatin: uncoiled chromosomal material in non-dividing nuclei, formed of nucleoproteins (DNA + histone and non-histone protein).",
   "Euchromatin is extended (uncoiled) and predominates in active protein-forming cells with a pale basophilic nucleus; heterochromatin is coiled (inactive) and predominates in inactive cells e.g. small lymphocytes with a dark basophilic nucleus.",
   "Heterochromatin distribution: peripheral chromatin attached to the inner nuclear membrane, chromatin islands in the nuclear sap, and nucleolus-associated chromatin condensed around the nucleolus.",
   "Chromatin functions: carries genetic information, controls protein formation, forms RNA (mRNA, rRNA, tRNA). Alterations are associated with tumours and genetic diseases.",
   "Nucleolus: rounded deeply basophilic mass rich in nucleic acids surrounded by chromatin, one or two per nucleus, spongy and not limited by a membrane.",
   "Nucleolar parts: pars amorpha (nucleolar organizer, DNA filaments carrying the genes encoding rRNA), pars fibrosa (strands of newly formed rRNA) and pars granulosa (granules of mature rRNA) — the last two together called nucleolonema; plus nucleolar sap.",
   "Nucleolus function: formation of ribosomal RNA and ribosomal subunits which pass through nuclear pores to the cytoplasm. Large nucleoli are found in rapidly growing malignant cells.",
   "Nuclear sap: colloidal solution of nucleoproteins, enzymes, sugars, calcium, potassium and phosphorous ions filling spaces between chromatin and nucleolus; provides a medium for RNA transport.",
   "Nucleus functions: carries genetic and hereditary information, controls cell functions including protein synthesis, forms RNA, directs cell division."]),
]

# ---- Epithelium ----
TOPICS += [
 T("epi", 2, H+" > Epithelial Tissues", "Epithelium — definition, general characters and classification", [
   "Epithelium is the tissue that covers surfaces or lines the cavities of the body.",
   "General characters given: formed of cells with minimal intercellular substance; one surface is free while the basal surface rests on a basement membrane which may be clear or non-clear; avascular — blood and lymph vessels cannot penetrate between epithelial cells but nerve fibres can, nutrition coming from the underlying C.T.; high power of regeneration (renewal).",
   "Four classes: I surface epithelium (covers surfaces / lines cavities); II glandular epithelium (modified to form secretions); III neuroepithelium (modified to act as receptors); IV myoepithelium (contracts).",
   "Surface epithelium is simple (only one layer of cells) or stratified (more than one layer)."]),
 T("epi", 3, H+" > Epithelial Tissues > Surface Epithelium", "Simple epithelium — squamous, cuboidal, columnar, ciliated", [
   "Simple squamous: one layer of flat cells with flat nuclei; gives a smooth surface for easy passage of fluids and easy movement of organs, and a thin membrane for gas exchange.",
   "Simple squamous sites: lines heart and blood vessels; lines lung alveoli (thin membrane for gas exchange); lines serous membranes (pleura, peritoneum, pericardium); lines Bowman's capsule of the kidney (filtration of blood).",
   "Simple cuboidal: one layer of cube-like cells; secretion and reabsorption; sites — convoluted tubules of kidney, secretory acini of glands, thyroid follicles.",
   "Simple columnar: one layer of tall columnar cells with basal oval nuclei; secretion and absorption; sites — stomach, small and large intestine.",
   "Simple columnar ciliated: same with cilia which transport fluid or particles in one direction; sites — female genital tract (uterus and fallopian tube) and the lower respiratory tract (lung bronchioles)."]),
 T("epi", 4, H+" > Epithelial Tissues > Surface Epithelium", "Pseudostratified columnar epithelium and the classification of stratified epithelium", [
   "Pseudostratified: actually one layer of columnar cells, all resting on the basement membrane but some not reaching the surface; cells are crowded so nuclei lie at more than one level, giving a false appearance of being stratified.",
   "Three varieties given: (a) pseudostratified columnar ciliated with motile cilia and goblet cells — upper respiratory tract; (b) pseudostratified columnar with non-motile cilia (stereocilia — not true cilia but long microvilli) — male genital tract; (c) pseudostratified columnar non-ciliated.",
   "Stratified epithelium: more than one layer of cells; function is protection; classified by the shape of the superficial cells into stratified squamous, transitional (stratified cuboidal), stratified cubical and stratified columnar."]),
 T("epi", 5, H+" > Epithelial Tissues > Surface Epithelium", "Stratified squamous and transitional epithelium", [
   "Intermediate layers of stratified squamous: polyhedral cells with central rounded nuclei joined by desmosomes, becoming smaller towards the surface; superficial layer is flat cells with flat nuclei.",
   "Two forms of stratified squamous named: non-keratinized (cornea, oral cavity, oesophagus, vagina, tip of urethra, anal canal) and keratinized (epidermis of the skin).",
   "Transitional epithelium: many layers of polyhedral cells with rounded nuclei; in the empty viscus superficial cells are dome-shaped with an upper convex surface and central rounded nuclei; in the full bladder cells are pushed laterally to decrease epithelial thickness and accommodate more urine, and the superficial cells become flat.",
   "The superficial transitional cells are covered with rigid plaques that act as a barrier against the effect of urine."]),
 T("epi", 6, H+" > Epithelial Tissues > Surface Epithelium", "Stratified cuboidal and stratified columnar epithelium", [
   "Stratified cuboidal: a rare type of few layers, usually two layers of cubical cells, as in ducts of sweat glands.",
   "Stratified columnar: similar to stratified squamous but with fewer layers and superficial cells columnar, ciliated or non-ciliated.",
   "Non-ciliated stratified columnar sites: large ducts of glands, male urethra (penile part), recto-anal junction.",
   "Ciliated stratified columnar: rare type found in fetal oesophagus."]),
 T("epi", 7, H+" > Epithelial Tissues > Glandular Epithelium", "Glandular epithelium — definition and classification of glands", [
   "Definition: epithelium modified to act as a gland and produce secretion.",
   "Exocrine glands have secretory portions plus an excretory portion (duct system) carrying secretion outside; endocrine glands are groups of secretory cells whose secretion (hormones) is carried by blood; mixed glands have both an exocrine part with ducts and an endocrine part without.",
   "By number of cells: unicellular (one cell) or multicellular.",
   "By mode of secretion: merocrine — no change occurs in the secretory cell, secretion discharged by exocytosis, the most common mechanism; apocrine — the apex of the cell comes out with the secretion; holocrine — secretion accumulates, cells swell and rupture and the whole cell is lost with the secretion.",
   "By nature: watery secretion, serous (watery with enzymes), mucous.",
   "N.B. under abnormal conditions one type of epithelium may transform into another (metaplasia), the example given being heavy cigarette smokers."]),
 T("epi", 8, H+" > Epithelial Tissues > Glandular Epithelium", "Shape of the secretory part; neuroepithelium and myoepithelium", [
   "By shape of the secretory part: tubular (secretory unit a tube), alveolar/acinar (rounded), tubuloalveolar (flask shape).",
   "By duct system: simple — the duct is single and not branched with a non-branching secretory part; simple branched — single unbranched duct with a branched secretory part; compound — ducts branch like a tree and each duct branch has a secretory part.",
   "The combinations are listed as simple tubular, simple coiled tubular, simple branched tubular, compound tubular; simple alveolar, simple branched alveolar, compound alveolar; simple tubulo-alveolar, simple branched tubulo-alveolar, compound tubulo-alveolar.",
   "Neuroepithelium: special epithelium whose sensory cells are modified to act as receptors for some sensation, e.g. taste buds in the tongue for taste sensation.",
   "Myoepithelium: epithelium modified to contract, present between the base of the secretory cell and its basement membrane; contracts to squeeze secretory cells and discharge secretion into the ducts; e.g. around acini of salivary, mammary and sweat glands."]),
 T("epi", 9, H+" > Epithelial Tissues > Polarity and Membranous Specializations", "Cell junctions", [
   "Apical specializations cross-referenced to cytology: cilia, flagella, microvilli and stereocilia.",
   "Tight junction encircles the apex of the cell like a belt; the two adjacent cell membranes are fused; function is to prevent passage of substances between adjacent cells.",
   "Zonula adherens encircles the cell as a belt (zonula); the two cell membranes are separated by a wide space and extracellular components of transmembrane protein of the two adjacent cells are connected by Ca ions; on the cytoplasmic side condensed protein molecules bind transmembrane protein to actin filaments (cytoskeleton); function is lateral adhesion between epithelial cells subjected to friction.",
   "Desmosome (macula) does not encircle the cell but is scattered as circular spots (maculae); membranes separated by a wide space, joined via Ca ions; the cytoplasmic side is thickened by an attachment plaque of several proteins into which filaments are inserted; strongest type of junction, present especially in stratified squamous epithelium.",
   "Gap junction: the two cell membranes are separated by a narrow gap with channels; functions are exchange of small molecules and ions between adjacent epithelial cells and passage of impulses between muscle cells."]),
 T("epi", 10, H+" > Epithelial Tissues > Polarity and Membranous Specializations", "Hemidesmosome, basement membrane and basal infoldings", [
   "Hemidesmosome takes the shape of half a desmosome, present at the basal part of epithelial cells; fixes the epithelium to the underlying basement membrane and C.T.",
   "Basement membrane: an amorphous dense layer present under the epithelium; seen by LM with silver stain (brown) and PAS (red); may be thick as in skin or thin as in transitional epithelium.",
   "Two components: basal lamina = epithelial component, an electron-dense layer of collagen (type IV) and glycoproteins; reticular lamina = C.T. component of collagen type III (reticular fibres) and ground substance. Both layers are fixed to C.T. by collagen.",
   "Basement membrane functions: support the epithelium and fix it to C.T.; control the passage of nutrients and ions, e.g. kidney capillaries and lung alveoli.",
   "Basal infoldings: in ion-transporting cells such as kidney tubules the basal cell membrane shows invaginations increasing surface area, with vertical mitochondria between the invaginations supplying energy for active transport."]),
]

# ---- Blood ----
TOPICS += [
 T("blood", 2, H+" > Blood", "Blood as a tissue; the blood film; RBC shape", [
   "The four basic tissues: epithelial (ectoderm, mesoderm, endoderm); connective (mesoderm — includes C.T. proper, cartilage, bone, blood); muscular (mesoderm); nervous (ectoderm).",
   "Blood is a special type of connective tissue that circulates inside blood vessels, formed of cells and an extracellular fluid matrix (plasma).",
   "Cells: erythrocytes (RBCs), leukocytes (WBCs), platelets.",
   "Blood film: a blood drop spread on a glass slide and left to dry, stained with a neutral stain such as Leishman's — methylene blue (blue basic dye) + eosin (red acidic stain) + methyl alcohol (fixative).",
   "RBCs are non-nucleated biconcave discs; biconcavity increases surface area for gas exchange.",
   "Abnormally shaped RBCs cause anaemia; crescent shape is named among abnormal shapes."]),
 T("blood", 3, H+" > Blood > Red Blood Corpuscles", "RBC size, staining, rouleaux, membrane, life span and fate", [
   "Average diameter 7.5 micrometres; edge thickness 2.2 micrometres, central thickness 0.8 micrometres.",
   "Size abnormalities named: microcyte less than 6 micrometres, macrocyte more than 9 micrometres, anisocytosis = different sizes.",
   "With Leishman's stain RBCs are rounded, non-nucleated and acidophilic because haemoglobin is a basic protein, with a central pallor about one third of the diameter.",
   "Rouleaux: RBCs adhere to each other like a column of coins, occurring in stagnant blood (not in normal circulation); a reversible phenomenon with no damage to the cells, due to their biconcave shape.",
   "Long chains of RBCs sediment more easily — the mechanism of increased erythrocyte sedimentation rate (ESR), which rises non-specifically with inflammation.",
   "The membrane carries the antigens of the blood groups (ABO, Rh factor) and is flexible; a cytoskeletal protein keeps the shape and stability of the membrane.",
   "Life span about 120 days. Old RBCs are phagocytosed by macrophages in liver, bone marrow and spleen; iron is reused to form new RBCs and pigments are secreted as bile pigments."],
   ["7.5 micrometres average diameter", "2.2 micrometres edge thickness", "0.8 micrometres central thickness",
    "microcyte < 6 micrometres", "macrocyte > 9 micrometres", "central pallor about 1/3 of the diameter",
    "life span about 120 days"]),
 T("blood", 4, H+" > Blood > Red Blood Corpuscles", "Osmotic behaviour, RBC count, anaemia and polycythaemia", [
   "In isotonic solution RBCs keep normal shape; in hypotonic solution they swell and burst, the remaining cell membrane being known as a ghost; in hypertonic solution they shrink and show notches (shrivelled/crenated cells).",
   "Count is done with a haemocytometer or an electronic counting instrument.",
   "The male count is higher because of the stimulatory effect of male hormones on the bone marrow.",
   "Anaemia = decreased RBC number and/or decreased haemoglobin concentration; polycythaemia = RBC number above 6 million per cubic millimetre, due to hypoxia stimulating the bone marrow, and may be physiological (high altitude, muscular exercise, newborn) or from chronic heart and lung disease.",
   "Aplastic anaemia is due to damage of the bone marrow leading to pancytopenia (decreased count of all blood elements), e.g. irradiation, chemotherapy.",
   "Pernicious anaemia (vitamin B12 deficiency) is due to failed production of intrinsic factor by the stomach.",
   "Sickle cell anaemia: formation of an abnormal rigid haemoglobin (HbS) that accumulates at one side of the cell producing crescent-shaped (sickle) RBCs."],
   ["polycythaemia = RBC count above 6 million/mm3", "anaemia figure quoted on the page: 4 million/mm3"]),
 T("blood", 5, H+" > Blood > Blood Platelets", "RBC functional adaptations; platelets — origin, count, size, structure", [
   "RBC adaptations listed: flexible membrane allowing squeezing through narrow capillaries; the membrane is lipoprotein and highly selective to help gas exchange; biconcavity increases surface area; rounded edges ease passage in branched vessels; no nuclei or organelles so RBCs do not divide and there is more space for Hb; they contain enzymes such as Hb reductase (combine O2) and carbonic anhydrase (carry CO2).",
   "Platelets are small oval cytoplasmic fragments derived from megakaryocytes; not true cells.",
   "Count 200,000-400,000 per cubic millimetre; size 2-4 micrometres.",
   "Structure: oval non-nucleated fragments with two zones — a peripheral basophilic (clear) zone, the hyalomere, and a central granular zone, the granulomere.",
   "Function: help platelet aggregation (platelet plug) to stop bleeding.",
   "Cytoskeleton: microtubules maintain cell shape; actin microfilaments help platelets change shape and produce clot retraction.",
   "Open canalicular system (invaginations of the cell membrane) releases serotonin causing vasoconstriction of the injured vessel."],
   ["platelet count 200,000-400,000/mm3", "platelet size 2-4 micrometres"]),
 T("blood", 6, H+" > Blood > Blood Platelets", "Platelet granules; thrombocytopenia; RBC vs WBC comparison", [
   "Dense tubular system stores calcium.",
   "Granule types described: granules containing clotting factors and growth factor; granules containing serotonin, ATP, ADP and Ca; lysosomes for clot removal after healing of the vessel.",
   "Thrombocytopenic purpura: decrease in platelet number below 50,000 per cubic millimetre, due to decreased production in the bone marrow (bone marrow depression) or increased breakdown (autoimmune disease); characterized by prolonged bleeding.",
   "RBC vs WBC table: RBCs are not true cells with no nuclei or organelles, one type only, biconcave disc, easily haemolyzed, formed in bone marrow; WBCs are true cells with nuclei and organelles, several types, spherical, not easily haemolyzed, formed in bone marrow and lymphoid tissue.",
   "Counts in the comparison: RBC 5-5.5 million/mm3 in males and 4-5 million/mm3 in females; WBC 4,000-11,000/mm3."],
   ["thrombocytopenia below 50,000/mm3", "RBC 5-5.5 million/mm3 males", "RBC 4-5 million/mm3 females",
    "WBC 4,000-11,000/mm3"]),
 T("blood", 7, H+" > Blood > Granular leukocytes", "Granular leucocytes — neutrophil, eosinophil, basophil", [
   "Leucocytes are classified by presence or absence of specific granules into granular and non-granular; granulocytes have a short life span (few days) and are compensated from stem cells in bone marrow.",
   "Granulocyte cytoplasm contains both non-specific (azurophilic) granules — azurophilic meaning affinity for azure dye (oxidized methylene blue) — and specific granules; granulocytes are classified by the staining affinity of their specific granules.",
   "Neutrophil: 60-70% (most common), 12 micrometres, single dark segmented nucleus of 2-5 segments connected by thin chromatin threads, hence 'polymorphonuclear leucocytes (PMNs)'; numerous fine pale granules; azurophilic granules few, large and purple with azure stain. A drumstick (Barr body) appendage is present in 3-6% of cells in females.",
   "Eosinophil: 1-4%, horse-shoe (bilobed) nucleus connected by thick chromatin; large refractile acidophilic granules.",
   "Basophil: 0-1% (rarest), irregular segmented S-shaped nucleus; large granules that obscure the nucleus, basophilic and stained metachromatically with toluidine blue giving a purple colour (due to heparin)."],
   ["neutrophils 60-70%", "eosinophils 1-4%", "basophils 0-1%", "neutrophil nucleus 2-5 segments",
    "drumstick in 3-6% of neutrophils"]),
 T("blood", 8, H+" > Blood > Granular leukocytes", "Granulocyte granule contents and functions", [
   "Neutrophil granules contain collagenase, myeloperoxidase, lactoferrin, phagocytin, lysozymes; and defensins (against bacteria and viruses).",
   "Neutrophils are the first line of defence (non-specific): bacterial toxins attract them, they leave the blood by passing between blood vessel endothelium (diapedesis) to the C.T., become actively motile with pseudopodia (microphages).",
   "Neutrophil phagocytosis: specific granules release contents into the phagosome — lactoferrin binds iron important for bacterial growth (bacteriostatic), phagocytin is bactericidal, lysozyme destroys bacterial proteins, collagenase destroys collagen so facilitating neutrophil movement; then non-specific granules release myeloperoxidase which kills bacteria plus other lysing enzymes.",
   "Further neutrophil effects: dead neutrophils form pus cells; pus raises body temperature (pyrogens stimulate the heat-regulating centre in the brain); neutrophils attract monocytes to the site of infection; stimulate the bone marrow to form more neutrophils; secrete trephone substances that help wound healing.",
   "Eosinophil functions: (1) termination of allergic reaction — release histaminase and sulphatase to destroy histamine and heparin, and phagocytose antigen-antibody complexes; (2) defence against parasites — cytotoxic effect of the internum forming pores in parasite bodies, and neurotoxins causing nervous dysfunction in parasites. Granules contain histaminases, sulphatase, eosinophil-derived neurotoxin.",
   "Basophil secretions: histamine causes vasodilatation and a sudden drop in blood pressure (anaphylaxis); heparin prevents clotting and promotes allergy; leukotrienes cause bronchospasm (bronchial asthma); eosinophil chemotactic factor attracts eosinophils to the site of allergy; limited phagocytic power."]),
 T("blood", 9, H+" > Blood > Granular leukocytes", "Granulocyte count abnormalities; eosinophil and basophil summary", [
   "Neutrophilia: neutrophil percentage above 75% due to acute pyogenic infection. Neutropenia: below 60%.",
   "Eosinophilia: eosinophil percentage above 5% in allergic diseases (bronchial asthma, urticaria) and parasitic diseases; eosinopenia below 1% in treatment with cortisone, which inhibits their release from bone marrow.",
   "Summary table entries: granulocytes live a few days; monocytes weeks to months; sizes given as 10-12 micrometres and 20-30 micrometres; basophil granules are metachromatic due to histamine and heparin; the basophil carries antibody IgE; a percentage of 3-8% is given, with a stated residence of 3 days in blood and 3 months in C.T."],
   ["neutrophilia above 75%", "neutropenia below 60%", "eosinophilia above 5%", "eosinopenia below 1%",
    "3 days in blood and 3 months in C.T."]),
 T("blood", 10, H+" > Blood > Non granular leukocytes", "Monocytes", [
   "Diameter 13-20 micrometres — the largest leucocytes.",
   "Nucleus large, eccentric, kidney-shaped, pale, with 1 or 2 nucleoli; euchromatic with a clear nucleolus.",
   "Cytoplasm non-granular, pale basophilic with a frosted-glass appearance due to lysosomes (azurophilic granules); EM shows pseudopodia, primary and secondary lysosomes, well developed Golgi, rER and mitochondria.",
   "Highly phagocytic: remain in blood for 3 days, then enter C.T. and change into macrophages to phagocytose bacteria and debris; act as antigen-presenting cells; form all phagocytic cells e.g. dust cells of lung, osteoclasts of bone, Kupffer cells of liver, microglia of CNS.",
   "Monocytosis: percentage above 8% e.g. in T.B., glandular fever, syphilis. Monocytopenia: below 3%, in pancytopenia."],
   ["monocyte diameter 13-20 micrometres", "3 days in blood", "monocytosis above 8%", "monocytopenia below 3%"]),
 T("blood", 11, H+" > Blood > Non granular leukocytes", "Lymphocytes — small and large", [
   "20-30% of WBCs, the 2nd most common type; the 2nd line of body defence; 'immune competent cells' with surface markers for antigens.",
   "Two types by activity: small lymphocytes 15-20% of WBCs and large lymphocytes 5-10%.",
   "Small lymphocyte: dark nucleus filling the cell, heterochromatic; little pale basophilic cytoplasm as a rim around the nucleus containing free ribosomes, two centrioles and small azurophilic granules.",
   "Large lymphocyte: large indented pale nucleus with a clear nucleolus, euchromatic; abundant deeply basophilic cytoplasm with more ribosomes, lysosomes, Golgi and mitochondria.",
   "Large lymphocytes may be activated lymphocytes or natural killer (NK) cells.",
   "Lymphocytes are actively motile, circulate continuously between blood and lymphatic organs where they settle, are the only leucocytes which can return to the blood, and are found in blood, lymph and lymphatic tissue."],
   ["lymphocytes 20-30% of WBCs", "small lymphocytes 15-20%", "large lymphocytes 5-10%"]),
 T("blood", 12, H+" > Blood > Non granular leukocytes", "T, B and null lymphocytes", [
   "The three lymphocyte types have similar LM and EM appearance and differ only in function.",
   "T lymphocytes: stem cells from bone marrow migrate to the thymus gland where they differentiate and acquire receptors ('thymic education'); responsible for cell-mediated immunity.",
   "B lymphocytes: develop in the Bursa of Fabricius in birds and in bone marrow in mammals where they acquire receptors; responsible for humoral immunity.",
   "Null cells: develop from precursors of T and B cells, do not mature in the thymus and have neither B nor T receptors; give innate early immunity (no T-helper stimulation), act similarly to cytotoxic T cells and secrete interferon (antiviral).",
   "Cytotoxic T cells produce pores in the membrane of virally infected, transplanted or neoplastic cells, killing them directly.",
   "Suppressor T cells maintain unresponsiveness to self antigen and suppress excessive immune responses; memory T cells give a rapid response on re-exposure to the same antigen.",
   "B cells exposed to specific antigen are activated by T helper cells to become plasmablasts then plasma cells producing antibodies (humoral immunity), and memory cells responsible for the rapid second immune response."]),
 T("blood", 13, H+" > Blood > Non granular leukocytes", "Lymphocyte abnormalities and the leucocytic count", [
   "HIV (Human Immunodeficiency Virus) causes AIDS by destroying T helper cells so the patient becomes susceptible to infections.",
   "Lymphocytosis: lymphocyte percentage above 30% — physiological in children, chronic infection e.g. T.B. and whooping cough, leukaemia. Lymphopenia: below 20%, as in pancytopenia.",
   "Total leucocytic count = total number of WBCs per cubic millimetre of blood = 4,000 to 11,000/mm3, counted by haemocytometer or electronic counting instrument.",
   "Leucocytosis: total WBC above 11,000/mm3 — physiological (transient) during pregnancy, labour, cold bath and exercise; pathological due to acute or chronic infection.",
   "Leucopenia: WBC below 4,000/mm3 — X-ray, irradiation, excessive use of some antibiotics e.g. chloramphenicol, typhoid fever, influenza virus.",
   "Leukaemia: cancer starting in the bone marrow with a very high leucocytic count; peripheral blood shows abnormal forms of WBCs with immature cells.",
   "Differential leucocytic count: the percentage of each type of WBC to the total number, counted in a blood film stained with Leishman."],
   ["lymphocytosis above 30%", "lymphopenia below 20%", "total leucocytic count 4,000-11,000/mm3",
    "leucocytosis above 11,000/mm3", "leucopenia below 4,000/mm3"]),
 T("blood", 13, H+" > Blood > Haemopoiesis", "Haemopoiesis and the bone marrow", [
   "Haemopoiesis is the formation of blood cells in bone marrow and lymphatic organs e.g. thymus.",
   "Bone marrow = myeloid tissue, of 2 types.",
   "Stroma of red bone marrow — fixed cells: reticular cells which with reticular fibres form the background network, fibroblasts, undifferentiated mesenchymal cells, pericytes, osteogenic cells and fat cells (the largest cells in bone marrow).",
   "Blood sinusoids: wide irregular blood capillaries lined with endothelial cells with a non-continuous basement membrane, through whose pores blood cells leave to the blood.",
   "Free cells: developing stages of the blood cells and stem cells. The ratio of immature WBCs to immature RBCs is 5:1, because the life span of most WBCs is shorter than that of RBCs."],
   ["immature WBC : immature RBC = 5 : 1"]),
 T("blood", 15, H+" > Blood > Haemopoiesis", "Reticulocytes and megakaryocytes", [
   "Reticulocyte percentage in peripheral blood does not exceed 1%; an increase above 1% occurs in haemorrhage or destruction of RBCs.",
   "The reticulocyte is acidophilic but contains remnants of ribosomes and polysomes forming a reticulum, stained with a supravital stain.",
   "Megakaryocyte: a very large cell of 50-70 micrometres diameter with a single multilobed dark nucleus and basophilic cytoplasm.",
   "It extends pseudopodia (platelet ribbons) from which platelets detach; invaginations of the cell membrane form demarcation channels that divide the cytoplasm into small parts, the platelets."],
   ["reticulocytes not more than 1% of peripheral blood", "megakaryocyte 50-70 micrometres"],
   None,
   [{"page": 15, "caption": "Full haemopoiesis chart from stem cell through the erythroid, granulocytic, lymphoid and megakaryocyte lines", "kind": "diagram"}]),
]

# ---- Connective tissue ----
TOPICS += [
 T("ct", 2, H+" > Connective Tissue", "Connective tissue — origin, characters, functions and components", [
   "C.T. forms the link between epithelial, muscular and nervous tissues to maintain functional integration.",
   "Origin: from the middle mesodermal layer of embryonic tissue; from this layer mesenchymal cells give C.T. cells.",
   "Characters: formed of widely separated cells with a large amount of intercellular matrix; penetrated by blood vessels, lymphatics and nerves.",
   "Functions listed: support to tissues and organs; exchange of wastes, nutrients and O2 between blood and body cells; site of fat storage; defence of the body by its phagocytic cells and cells of immunity.",
   "C.T. consists of cells and matrix — soft matrix gives C.T. proper, rubbery gives cartilage, solid gives bone.",
   "Cells are stable/long-lived (undifferentiated mesenchymal cells, pericytes, fibroblasts, fat cells/adipocytes, macrophages, reticular cells) or short-lived (plasma cells, leukocytes, mast cells).",
   "Fibres: collagen, elastic, reticular."]),
 T("ct", 3, H+" > Connective Tissue > Connective Tissue Cells", "Undifferentiated mesenchymal cells, pericytes and reticular cells", [
   "UMC: in the embryo they are stem cells; in the adult they remain undifferentiated in certain areas as a source for some cells — in bone marrow giving blood cells, around blood vessels giving pericytes.",
   "UMC LM: small branched star (stellate) cells with a central large pale nucleus and visible nucleolus, many free ribosomes, euchromatic nucleus. Function: can divide and differentiate into other types of C.T. cell.",
   "Pericytes: adult mesenchymal stem cells present around blood capillaries; branched, central large pale nucleus with visible nucleolus, many free ribosomes, euchromatic nucleus, with a network of actin and myosin. In injury they can divide and differentiate into endothelium, fibroblasts and smooth muscle; their contraction causes vasoconstriction.",
   "Reticular cells: in the stroma of organs and glands such as spleen, lymph node and endocrine glands; small stellate branched cells with many processes joined by cell junctions, central pale nucleus with visible nucleolus.",
   "Reticular cell functions: supportive network with the reticular fibres; secretion of reticular fibres; phagocytic when stimulated by antigen; antigen-presenting cells to activate lymphocytes."]),
 T("ct", 4, H+" > Connective Tissue > Connective Tissue Cells", "Fibroblasts and fibrocytes", [
   "The most common cell type, found nearly in all types of C.T. proper.",
   "Active fibroblast: oval nucleus with prominent nucleolus, well developed rER, many mitochondria and Golgi.",
   "Fibrocyte (inactive): smaller nucleus and fewer rER, Golgi and mitochondria than the active fibroblast.",
   "Fibroblast functions: synthesis of C.T. fibres; synthesis of ground substance of the matrix; healing and repair of C.T. after injury; production of growth factors for cell growth and differentiation.",
   "Fibrocyte functions: continuous slow turnover of extracellular components maintaining C.T.; in injury becomes active for wound healing."]),
 T("ct", 5, H+" > Connective Tissue > Connective Tissue Cells", "Adipocytes — unilocular (white) and multilocular (brown)", [
   "Unilocular: large oval cell with fat present as a single large droplet containing dissolved carotenoids, displacing nucleus and cytoplasm peripherally; peripheral flat nucleus; H&E gives a signet-ring appearance as fat is removed during staining; Sudan stain gives orange. EM abundant sER, few mitochondria, one large electron-dense fat droplet.",
   "Multilocular: fat present as multiple small droplets, no signet-ring appearance; eccentric rounded nucleus; pigmented brown by the cytochrome pigments in the mitochondria. EM less sER, many mitochondria, multiple small electron-dense fat droplets.",
   "Unilocular functions: synthesis and storage of fat; support organs e.g. kidney; heat insulation; endocrine function — they secrete leptin hormone which inhibits food intake, stimulates metabolic rate and causes loss of body weight.",
   "Multilocular function: breakdown of fat to release heat via thermogenin protein found in their mitochondria."]),
 T("ct", 6, H+" > Connective Tissue > Connective Tissue Cells", "Mast cells, plasma cells and macrophages", [
   "Mast cells: in loose C.T. around blood vessels and under epithelium in lung and digestive tube; large oval cell with basophilic cytoplasm and basophilic granules stained metachromatically (purple or red) by toluidine blue; spherical pale nucleus; well developed Golgi, many mitochondria, few rER, electron-dense membrane-bound granules (secretory vesicles), euchromatic nucleus.",
   "Mast cells carry surface receptors for IgE and secrete heparin, histamine (vasodilatation and increased permeability), leukotrienes (smooth muscle contraction in the bronchial tree giving bronchial asthma) and eosinophil chemotactic factor (attracts eosinophils to the site of allergy).",
   "Plasma cells: abundant in lymphoid tissues; large oval cell with deeply basophilic cytoplasm showing a negative Golgi image; eccentric spherical nucleus containing heterochromatin alternating with euchromatin (cartwheel appearance described as the picture of a protein-forming cell); well developed Golgi, many mitochondria, rich rER.",
   "Macrophages: in C.T. of lymphoid tissue, bone marrow, brain, liver and lung; large irregular cell with pale basophilic cytoplasm and a dark kidney-shaped nucleus; specific stain is a vital stain such as trypan blue or India ink which the cell phagocytoses; pseudopodia, rich in lysosomes, phagocytosed particles and residual bodies, prominent Golgi, few rER, heterochromatic nucleus.",
   "Macrophage functions: phagocytosis and destruction of foreign particles, microorganisms and dead cells (debris); form giant cells by fusion of many cells to remove large particles; act as antigen-presenting cells to activate lymphocytes; found in liver and spleen."]),
 T("ct", 7, H+" > Connective Tissue > Connective Tissue Cells", "Leukocytes in C.T., allergy, and classification of C.T. cells by function", [
   "Extravasated leukocytes leave the blood through capillaries to perform their immunity functions (types cross-referenced to the blood chapter).",
   "Allergy: in some people the immune system recognizes harmless antigens (allergens) as foreign; binding of allergens to IgE on the surface of mast cells triggers release of chemical mediators, producing an allergic reaction within seconds to minutes (hypersensitivity reaction).",
   "Allergic reactions manifest as erythema and itching (skin); runny nose, sneezing, bronchospasm (respiratory passages); nausea, vomiting, diarrhoea and abdominal cramping (gastrointestinal tract).",
   "Anaphylactic shock: in highly sensitive persons, exposure to an allergen can trigger massive discharge of mast cell granules leading to severe vasodilatation and increased vascular permeability, resulting in severe hypotension.",
   "C.T. cells classified by function: (1) undifferentiated cells — UMCs, pericytes; (2) C.T. forming cells — fibroblasts, fibrocytes, reticular cells; (3) fat containing cells — unilocular and multilocular adipocytes; (4) cells responsible for immunity and defence — macrophages (fixed and free), plasma cells, mast cells and leukocytes."]),
 T("ct", 8, H+" > Connective Tissue > Connective Tissue Fibres", "Collagen, elastic and reticular fibres", [
   "Collagen fibres: wavy branching bundles formed of non-branching fibres; colourless in fresh section, white when condensed e.g. in tendons; eosin pink, Mallory trichrome blue, Van Gieson red; strong, resist stretch, flexible but not elastic; give strength and resist stretch.",
   "Elastic fibres: single thin branching fibres, yellow in the fresh state; eosin pink, orcein brown, Van Gieson yellow; stretch and recoil, giving elasticity.",
   "Reticular fibres: fine fibrillar network of elastin protein and type III collagen; not visible in H&E; due to their high sugar content stained by PAS (red) and silver stain (brown); a loose flexible supporting network forming the stroma of organs — spleen, lymph node and liver.",
   "Collagen types table: type I arranged in bundles in C.T. proper, capsule of organs, bone and tendons, formed by fibroblasts, osteoblasts and chondroblasts; type III reticular fibres in the stroma of organs, formed by fibroblasts, reticular cells and smooth muscle cells; type IV in the form of a network in the basement membrane, formed by epithelial cells; type VII anchoring fibrils, formed by fibroblasts.",
   "Clinical: vitamin C deficiency (scurvy) is due to defective collagen synthesis and is characterized by bleeding gums and unhealed wounds; keloid is a local swelling caused by abnormal healing with increased deposition of collagen in skin scars."]),
 T("ct", 9, H+" > Connective Tissue > Types of Connective Tissue Proper", "Loose areolar, reticular and mucoid C.T.", [
   "Six types of C.T. proper are listed on the page, including loose areolar, reticular, mucoid, adipose, white fibrous and yellow elastic C.T.",
   "Loose areolar C.T. is the most common type; loose, containing potential cavities (areolae) which hold large amounts of fluid or gases; flexible and well vascularized.",
   "Loose areolar sites: found everywhere in the body except the brain — filling spaces between organs, papillary layer of the dermis of skin, mucosa and serous membranes, around blood vessels and nerves.",
   "Loose areolar functions: exchange of nutrients to and from blood vessels; binds structures together; limits the spread of infection.",
   "Reticular C.T.: a delicate type forming the framework stroma of organs e.g. spleen, lymph node and liver; supportive; stained by silver (brown/black).",
   "Mucoid C.T.: jelly-like, the ground substance predominating, rich in mucus and hyaluronic acid; sites — umbilical cord (Wharton's jelly), vitreous humor of the eye, pulp of teeth; supportive."]),
 T("ct", 10, H+" > Connective Tissue > Types of Connective Tissue Proper", "Adipose tissue — white and brown fat", [
   "Adipose tissue: fat cells predominate over other components; reticular fibres form a fine network around the fat cells binding them together, and C.T. runs between the incomplete lobules.",
   "White fat: cells are unilocular; yellow-white because of carotenoids dissolved in the fat; widely distributed in the body, especially in females e.g. gluteal region and abdominal wall.",
   "Brown fat: cells are multilocular; brown from cytochrome pigments in mitochondria; present in large amounts in the newborn and lost during childhood, gradually replaced by white fat; localized in the interscapular region and the mediastinal and axillary regions.",
   "Functions listed for adipose tissue include heat production (thermogenesis) in the newly born and support of organs such as the kidney."]),
 T("ct", 11, H+" > Connective Tissue > Types of Connective Tissue Proper", "White fibrous and yellow elastic C.T.", [
   "White fibrous C.T.: cells are fibroblasts; fibres are collagen packed in bundles; very dense due to the predominance of collagen fibres with few cells; white in the fresh state; resistant and less flexible.",
   "Two arrangements: regular — regularly arranged collagen bundles with fibroblasts arranged in rows between them; irregular — irregularly arranged collagen bundles with scattered fibroblasts.",
   "Yellow elastic C.T.: condensed parallel elastic fibres, a dense type with great predominance of elastic fibres, yellow in the fresh state, with great elastic power (recoils when stretched).",
   "Yellow elastic sites: some ligaments — ligamentum flavum joining the vertebrae, ligamentum nuchae at the back of the neck, and the suspensory ligaments of the penis.",
   "Staining is the same as for collagen fibres and elastic fibres respectively."]),
]

# ---- Basis of Human Anatomy (UII9G23) ----
TOPICS += [
 T("basis", 4, A+" > Basis of Anatomy > Introduction", "Anatomical positions and planes", [
   "Anatomical erect position: body standing erect, eyes looking forwards, upper limbs hanging by the sides, palms facing forwards, thumbs directed laterally.",
   "Other positions: supine (body lies on its back), prone (on its face), lateral decubitus (on its side, right or left), lithotomy (on the back with flexion of hip and knee and abduction of the hip joints).",
   "Median (sagittal) plane: vertical plane passing in the middle of the body dividing it longitudinally into equal right and left halves.",
   "Paramedian: parallel to and near the median plane. Coronal (frontal): cuts the body vertically into an anterior part towards the front and a posterior part towards the back. Horizontal: transverse plane cutting the body into upper (superior) and lower (inferior) parts."]),
 T("basis", 5, A+" > Basis of Anatomy > Introduction", "Terms of position and terms of number", [
   "Anterior (ventral) = in front; posterior (dorsal, retro) = behind. Superior (upper, cranial) = near the upper end; inferior (lower, caudal) = near the lower end.",
   "Median = in the midline or median plane; medial = near to the median plane; lateral = away from the median plane.",
   "Proximal = near the root of the limb; distal = away from the root of the limb.",
   "Superficial = towards the skin or body surface; deep = away from it. Internal (inner) = inside an organ or body; external (outer) = on the surface. Peri = around.",
   "Terms of number: uni/mono = one, bi/di = two, tri = three, quadri = four, multi/poly = many, oligo = little."],
   [], ["Terms of number prefix set: uni/mono, bi/di, tri, quadri, multi/poly, oligo"]),
 T("basis", 8, A+" > Basis of Anatomy > Fascia", "Superficial and deep fascia", [
   "Fascia is a collection of connective tissue under the skin, divided into superficial, deep and internal fasciae.",
   "Superficial fascia: loose connective tissue immediately deep to skin allowing skin to move freely on underlying structures; contains a variable quantity of fat, more in females; fat is abundant in breast, anterior abdominal wall and gluteal region, less in limbs and absent in eyelid, penis and scrotum.",
   "Superficial fascia functions: softens and smoothens the body surface; facilitates skin movement; prevents heat loss (thermal insulator); conducting medium for nerves, blood vessels and lymphatics supplying the skin; contains muscles in the face (muscles of expression); contains glands (mammary gland).",
   "Deep fascia: inelastic membrane of compact and regular collagen fibres; well defined in limbs, very strong in palm and sole, absent in the face and anterior abdominal wall.",
   "Deep fascia functions: formation of broad sheets surrounding muscle groups (fixing structures, giving muscle attachment, helping venous return); formation of intermuscular septa and interosseous membranes separating groups with different actions and nerve supply and increasing attachment area; formation of retinacula (thickened localized transverse bands at wrist and ankle keeping tendons in position); formation of palmar and plantar aponeurosis; formation of fibrous sheaths around big vessels (carotid sheath around carotid arteries, internal jugular vein and vagus nerve in the neck).",
   "Clinical: knowledge of deep fascia arrangement explains infection paths (infection can spread from the floor of the mouth to the larynx); fluid accumulation in superficial fascia leads to oedema; skin mobilization after incision occurs at the superficial fascia plane and incision along a skin crease heals with minimal scar."]),
 T("basis", 12, A+" > Basis of Anatomy > Skeletal system", "Bones — definition, functions and classification", [
   "Definition: hard type of connective tissue forming the skeleton.",
   "Functions: give specific shape and provide a central axis; protect vital organs (skull protects brain, thoracic cage protects heart and lungs); provide surface area for muscle attachment and form joints; support and transmit body weight; form blood elements in bone marrow and store calcium.",
   "By position: axial skeleton — skull, mandible, hyoid, sternum, ribs, vertebral column; appendicular (peripheral) skeleton — bones of upper and lower limbs.",
   "By ossification: intramembranous — bones develop directly from connective tissue membrane (mesenchyme), examples skull cap and clavicle, occurring at one or more ossification sites; intracartilaginous — mesenchyme changes into cartilage which dissolves and is replaced by bone, examples skull base, long bones, ribs and vertebrae."]),
 T("basis", 14, A+" > Basis of Anatomy > Skeletal system", "Classification of bones by shape", [
   "Long bones (upper and lower limbs): 2 ends (epiphysis) and a shaft (diaphysis). Epiphysis is the expanded end with a smooth articular surface covered by articular hyaline cartilage. Diaphysis is a compact bone tube with a central medullary cavity filled with bone marrow, separated from the epiphysis by an epiphyseal plate of hyaline cartilage responsible for growth in length, and surrounded by periosteum responsible for growth in width. Metaphysis is the part of diaphysis just below the epiphyseal cartilage — the most active part of the long bone.",
   "Short bones (carpal bones in the hand, tarsal bones in the foot): spongy (cancellous) bone covered by compact bone.",
   "Flat bones (scapula, ribs, skull cap): 2 plates of compact bone with a middle layer of spongy bone; in skull bones the two compact layers are the outer and inner tables and the spongy layer is the diploe. Function: protection and muscle attachment.",
   "Irregular bones: bones with projecting processes such as vertebrae; spongy bone covered by compact bone.",
   "Pneumatic bones: skull bones around the nose (frontal and maxillary) containing air cavities (paranasal air sinuses) — one air cavity (maxillary sinus) or multiple small cells (mastoid air cells). Function: decrease skull weight, resonance of voice and warming of inspired air by vascular mucosa.",
   "Sesamoid bones: small bone nodules embedded in some muscle tendons; the patella is the largest, embedded in the quadriceps femoris tendon in front of the knee. Function: diminish friction between tendons and bones."]),
 T("basis", 16, A+" > Basis of Anatomy > Skeletal system", "Growth and arterial supply of long bones", [
   "Growth in width is by the periosteum, a fibrous sheath around the shaft with an outer layer of white fibrous tissue and an inner layer containing osteoblasts, under hormonal control.",
   "Growth in length is by the epiphyseal plate of hyaline cartilage between epiphysis and diaphysis; when the bone matures the plate stops dividing and ossifies, fusing epiphysis to diaphysis — 2 years earlier in females.",
   "The plate ossifies at one end 2-3 years earlier than the other end, which is called the growing end.",
   "Nutrient artery: enters the shaft at its middle through an oblique nutrient foramen and runs away from the growing end; supplies the inner two-thirds of the shaft and the bone marrow.",
   "Metaphyseal arteries enter through minute foramina to supply the metaphysis; epiphyseal arteries supply the epiphysis and anastomose with metaphyseal arteries after ossification of the epiphyseal cartilage; periosteal arteries supply the outer third of the shaft and anastomose with the other arteries."],
   ["epiphyseal fusion 2 years earlier in females", "one end ossifies 2-3 years earlier than the growing end",
    "nutrient artery supplies inner 2/3 of shaft", "periosteal arteries supply outer 1/3 of shaft"]),
 T("basis", 18, A+" > Basis of Anatomy > Skeletal system", "Cartilage — properties and types", [
   "Cartilage is a rubbery type of connective tissue (tough and resilient) resisting friction and compression forces.",
   "It consists of mature cartilage cells (chondrocytes), fibres and matrix; it has no blood vessels (nutrition by diffusion from vessels of the perichondrium), no nerves and no lymphatics; it has great growth capacity by multiplication of chondroblasts.",
   "Hyaline (glass-like), the most widespread in the human body: numerous small rounded cells, translucent matrix. Sites — developing bones in the fetus, epiphyseal plates of long bones, articular cartilage in joints, cartilages of the larynx (except epiglottis) and tracheal rings, xiphoid process and costal cartilages. Ossification occurs in certain sites (epiphyseal cartilages and larynx).",
   "White fibrocartilage: few cells, opaque matrix rich in collagen bundles. Site — intervertebral discs. Ossification does not occur.",
   "Yellow elastic fibrocartilage: abundant cells, yellow matrix rich in yellow elastic fibres. Sites — tip of nose, auricle of ear, epiglottis of larynx. Ossification does not occur."]),
 T("basis", 22, A+" > Basis of Anatomy > Articular system", "Joints — definition, fibrous and cartilaginous joints", [
   "Definition: contact of 2 or more bones.",
   "Fibrous joints — bones connected by fibrous tissue, fixed (immobile): sutures in the skull (connected by a sutural ligament, obliterated in old age); gomphosis in teeth (roots connected to sockets in mandible and maxilla by the periodontal ligament); syndesmosis in the inferior tibio-fibular joint (lower ends of tibia and fibula connected by an interosseous ligament).",
   "Primary cartilaginous joint: example epiphyseal plate; at the ends of growing long bones between epiphysis and diaphysis; hyaline; temporary, disappears by ossification; immobile.",
   "Secondary cartilaginous joint: example intervertebral discs; in the midline; white fibrocartilage disc with articulating surfaces covered by thin hyaline cartilage, strengthened by ligaments which do not fuse to form a complete capsule; permanent; limited mobility facilitated by the elasticity of white fibrocartilage."]),
 T("basis", 24, A+" > Basis of Anatomy > Articular system", "Synovial joints — structure and stability", [
   "Synovial joints are freely mobile and present mostly in the limbs.",
   "The joint is surrounded by a strong fibrous capsule lined by synovial membrane and supported by strong ligaments.",
   "Articular cartilage: articular surfaces are covered by hyaline cartilage which is smooth and lubricated by synovial fluid; it has no blood vessels or nerves (nutrition from synovial fluid); in old age it shows irregularities due to erosion and eroded areas do not repair.",
   "Joint cavity is a potential cavity containing a thin film of synovial fluid; it becomes manifest if fluid, blood or pus collects in it.",
   "Synovial membrane is thin, moist and glistening, covering all structures inside the joint except the articular surfaces and lining the capsule; it secretes and absorbs synovial fluid.",
   "Synovial fluid is pale yellow and viscous, similar to egg albumin, containing synovial cells, macrophages and lymphocytes; it lubricates, helps nutrition and reduces erosion of articular cartilage.",
   "Structures inside the cavity of some synovial joints: articular fibrocartilaginous disc (temporomandibular joint, dividing the cavity into upper and lower compartments); menisci (knee joint, semilunar plates of fibrocartilage); ligaments (cruciate ligaments in the knee); tendon (tendon of the long head of biceps in the shoulder joint).",
   "Factors affecting stability: shape and fitting of articulating surfaces; thickness and elasticity of the capsule; position and strength of ligaments; strength of surrounding muscles.",
   "Factors affecting range of movement: tension of surrounding ligaments; contraction of antagonistic muscles; approximation and contact of soft tissues around the joint.",
   "Hilton's law: the nerve supply to a muscle acting on a specific joint gives a branch to the joint and another branch to the skin covering the joint. Articular nerves end in the fibrous capsule and related ligaments and are sensitive to pain, position and movement."],
   [], ["Hilton's law — nerve to muscle acting on a joint also supplies the joint and the skin over it"]),
 T("basis", 26, A+" > Basis of Anatomy > Articular system", "Joint movements and types of synovial joint", [
   "Movements defined: flexion (bending, approximation of two ventral aspects) and extension (straightening); abduction (movement of a limb away from the midline — middle finger in the hand, second toe in the foot) and adduction (towards it); circumduction (combination of all the above); rotation medially or laterally around a vertical axis; supination (lateral rotation of forearm) and pronation (medial rotation); inversion (sole directed inwards) and eversion (outwards); gliding (non-axial); opposition (thumb comes in contact with the other 4 fingers).",
   "Clinical importance: the cavity swells with fluid, pus or blood; articular surfaces are eroded and rough in osteoarthritis or overweight (painful); separation of articular surfaces is dislocation.",
   "By number of articulating bones: simple (between 2 bones — shoulder); compound (more than two — elbow); complex (contains intra-articular structures — knee).",
   "Uni-axial: hinge — convex articular surface trochlea-like, elbow joint, only flexion and extension around a transverse axis due to strong collateral ligaments; pivot — a central bony axis surrounded by a fibro-osseous ring, superior radio-ulnar joint, rotation around a longitudinal axis.",
   "Bi-axial: condylar — 2 separate convex condyles articulating with 2 concave surfaces (knee, bicondylar) or 1 condyle with 1 concave surface (temporomandibular, unicondylar); ellipsoid — oval convex surface (carpal bones) with an elliptical concave surface (inferior surface of radius and articular disc of ulna), wrist joint; saddle — concavo-convex surfaces, carpometacarpal joint of the thumb.",
   "Multi-axial: ball and socket — globular rounded bone with a concave socket, most freely mobile, shoulder and hip joints.",
   "Non-axial: plane — flat articular surfaces with gliding movement, inter-carpal joints, superior tibio-fibular joint and intervertebral joints."]),
 T("basis", 34, A+" > Basis of Anatomy > Muscular system", "Muscle types, attachments, form and action", [
   "Muscle tissue has the property of contraction — the capacity of muscle fibres to become short. Three types by structure and function.",
   "Skeletal: attached to the skeleton, voluntary, somatic nerve supply, striations present. Cardiac: in the myocardium, involuntary, autonomic, striations present but less than skeletal. Smooth: in walls of blood vessels and viscera, involuntary, autonomic, striations absent.",
   "Each muscle has an origin (most fixed attachment) and an insertion (most mobile attachment); in limbs origin is usually proximal and during contraction the insertion moves towards the origin; sometimes the insertion is fixed while the origin is mobile.",
   "Types of skeletal muscle attachment: to bone (commonest, by flesh or by tendon); to skin (muscles of the face); to fibrous raphe (mylohyoid); to cartilage (muscles of the larynx, cricothyroid).",
   "Muscles with parallel fibres: strap-like (sartorius); strap-like with tendinous intersections (rectus abdominis); quadrilateral (thyrohyoid); fusiform (lumbrical).",
   "Muscles with oblique fibres, pennate: unipennate — fibres on one side of the tendon (flexor pollicis longus); bipennate — both sides (rectus femoris); multipennate — a series of bipennate lying beside each other (deltoid); circumpennate — fibres converge from the periphery towards a central tendon (tibialis anterior).",
   "Non-pennate oblique: triangular (temporalis), spiral (supinator), cruciate (masseter), circular (orbicularis oris).",
   "Muscles with more than one belly or head: 2 heads biceps, 3 heads triceps, 4 heads quadriceps, 2 bellies digastric.",
   "Four types of muscle action: prime mover (agonist) initiates and maintains a movement; antagonist opposes the prime mover; fixator (stabilizer) fixes the origin of the prime mover or stabilizes the joint acted upon; synergist contracts to eliminate unwanted movement at crossed joints so the prime mover's action at the desired joint becomes maximal.",
   "Clinical: muscle atrophy occurs in immobilization after fracture, muscle disease, injury of the muscle motor nerve, spinal cord injury and affection of higher centres (brain) as in hemiplegia."]),
 T("basis", 40, A+" > Basis of Anatomy > Nervous system", "Classification of the nervous system", [
   "Brain (inside the skull) parts: cerebrum (2 cerebral hemispheres, 4 lobes — frontal, parietal, occipital, temporal); cerebellum; brainstem (midbrain, pons, medulla oblongata); diencephalon (thalamus, hypothalamus, subthalamus, metathalamus, epithalamus).",
   "Spinal cord: inside the vertebral column, 45 cm long, ending in a tapering conus medullaris; 31 segments (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal); 2 enlargements, cervical and lumbar, where nerve plexuses arise.",
   "Spinal cord structure: outer white matter of nerve fibres forming tracts; inner H-shaped grey matter of nerve cells with 2 ventral horns (motor nuclei), 2 dorsal horns (sensory nuclei) and 2 lateral horns (sympathetic nuclei in thoracic and upper 2 lumbar segments, parasympathetic nuclei in the 2nd, 3rd and 4th sacral segments); plus a central canal.",
   "Meninges are the coverings of the CNS arranged as pia, arachnoid and dura mater from inside outwards.",
   "Spinal nerves: 31 pairs (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal), arising by an anterior (ventral) root containing motor fibres and a posterior (dorsal) root containing sensory fibres; both roots unite forming a mixed trunk which divides into mixed anterior and posterior rami.",
   "Cranial nerves: 12 pairs — I olfactory, II optic, III oculomotor, IV trochlear, V trigeminal, VI abducent, VII facial, VIII auditory, IX glossopharyngeal, X vagus, XI accessory, XII hypoglossal.",
   "Autonomic nervous system: sympathetic — a pair of sympathetic chains alongside the vertebral column; parasympathetic — cranial outflow from cranial nerves III, VII, IX, X and sacral outflow from spinal segments S2-S4."],
   ["spinal cord 45 cm long", "31 spinal cord segments and 31 pairs of spinal nerves", "12 pairs of cranial nerves"]),
 T("basis", 44, A+" > Basis of Anatomy > Cardiovascular system", "The heart and the three circulations", [
   "Heart site: behind the sternum and costal cartilages (from the 2nd to the 6th); two-thirds lies to the left and one-third to the right of the median plane.",
   "Four chambers: right atrium receives deoxygenated blood from all the body through the 2 large veins (SVC and IVC) and sends it to the right ventricle through the tricuspid valve; left atrium receives oxygenated blood from the lungs through 4 pulmonary veins and sends it to the left ventricle through the mitral valve; right ventricle pumps deoxygenated blood through the pulmonary valve to the pulmonary trunk which divides into 2 branches, one for each lung; left ventricle pumps oxygenated blood through the aortic valve to the aorta and its branches.",
   "The right half contains deoxygenated (venous) blood, the left half oxygenated (arterial) blood; the heart is covered by 2 pericardial sacs, fibrous and serous pericardium.",
   "Systemic circulation: begins in the left ventricle, oxygenated blood through the aortic valve to the aorta and its branches to all body tissues; deoxygenated blood is collected by small then large veins and finally by SVC and IVC into the right atrium, which sends it through the tricuspid valve to the right ventricle where this circulation ends.",
   "Pulmonary circulation: begins in the right ventricle, deoxygenated blood through the pulmonary valve to the pulmonary artery and its 2 branches to both lungs; oxygenated blood returns through 4 pulmonary veins to the left atrium, which sends it through the mitral valve to the left ventricle.",
   "Portal circulation: venous blood from stomach, intestine, pancreas and spleen is collected by the portal vein, which enters the porta hepatis and divides into branches ending in liver sinusoids; blood leaves the sinusoids by the hepatic veins ending in the IVC. It transmits venous blood from the GIT to the liver to metabolize undigested nutrients and detoxify blood."],
   ["heart lies behind the 2nd to 6th costal cartilages", "2/3 of heart to the left, 1/3 to the right of the median plane",
    "4 pulmonary veins"]),
 T("basis", 46, A+" > Basis of Anatomy > Cardiovascular system", "Arteries, arterial anastomosis and end arteries", [
   "Artery: a blood vessel carrying oxygenated blood from the heart to the periphery, except the pulmonary and umbilical arteries which carry deoxygenated blood. Classified by size and structure into large, medium and small arteries.",
   "Arterial anastomosis: communication between arteries, mainly around joints. Functions — increase blood supply to some organs such as the stomach; equalize pressure in communicating arteries; maintain blood flow if the main artery is obstructed.",
   "Types: end to end (2 ends of 2 arteries connected — in the hand and foot, between gastric arteries, between gut arteries, between anterior and posterior intercostal arteries); by convergence (around joints, branches of a main artery above the joint converging with its branches below the joint, forming an arch; opens on gradual obstruction, e.g. anastomosis around the elbow); by terminal arterioles (between 2 arteries uniting together, e.g. between the 2 vertebral arteries).",
   "Clinical: large arteries crossing over a joint are liable to be kinked during joint movement but distal flow is not interrupted because of adequate anastomosis; sudden closure of a main artery by faulty ligation leads to death of the limb part distal to the closure because anastomosis does not open in sudden closure.",
   "End arteries do not anastomose with adjacent arteries and their obstruction leads to necrosis of tissues supplied: central retinal artery (retina), pulmonary arteries, central branches of cerebral arteries, renal artery (kidney), splenic artery (spleen)."]),
 T("basis", 48, A+" > Basis of Anatomy > Cardiovascular system", "Veins, venous return and arterio-venous connections", [
   "Vein: a blood vessel carrying deoxygenated blood from the periphery to the heart, except the pulmonary and umbilical veins which carry oxygenated blood.",
   "Factors helping venous return from the upper part of the body: gravity.",
   "From the lower limb: venous valves, arterial pulsations, muscle contraction (pump), deep fascia around muscle groups, and negative intra-thoracic pressure drawing blood from abdomen, head and neck into the thorax. From abdomen, pelvis and thorax: suction mechanism of the negative intrathoracic pressure.",
   "Arteries and veins are connected by capillaries (narrow uniform diameter), sinusoids (wide irregular diameter with dilatations and constrictions) and arterio-venous shunts (between small arteries and accompanying veins).",
   "Arterio-venous shunt sites: external ear, nail bed and palmar aspects of digits, tongue, thyroid gland, penis, alimentary tract; straight or coiled, surrounded by a thick muscular coat and supplied by sympathetic fibres controlling opening and closure.",
   "Shunt functions: regulation of body temperature and local heat (on opening, blood passes from artery to vein decreasing local heat); regulation of food absorption; role in erection.",
   "Varicose vein: one with a larger diameter than normal, elongated and tortuous, due to hereditary weakness of the vein wall, incompetent valves and elevated intra-abdominal pressure (multiple pregnancies or abdominal tumours); blood escapes from deep to superficial veins; stagnation leads to thrombosis, as deep venous thrombosis in calf muscles."]),
 T("basis", 54, A+" > Basis of Anatomy > Lymphatic system", "Lymph vessels and lymph ducts", [
   "The lymphatic system is responsible for circulation of lymph — a clear colourless fluid rich in proteins — from tissue spaces (intercellular spaces) to the blood stream.",
   "It consists of lymph vessels, lymphoid tissue (lymph nodes, spleen, tonsils, thymus) and B and T lymphocytes (free cells).",
   "Afferent vessels carry lymph to lymph nodes, opening at the periphery at the convex border; efferent vessels carry lymph away, emerging from the hilum.",
   "Lymph vessel characters: end blindly in tissue spaces, containing wide pores for fat and protein passage; have many valves allowing flow in one direction; absent in brain, spinal cord, bone marrow and avascular structures (cartilage, cornea, hair).",
   "All lymph vessels are collected in 2 large lymph ducts in the root of the neck. Thoracic duct drains the left side of head and neck, left upper limb, left side of thorax and the body below the diaphragm. Right lymphatic duct drains the right side of head and neck, right upper limb and right side of thorax. Both open into 2 large veins at the root of the neck.",
   "Factors helping lymph flow: arterial pulsation, muscular contraction, negative intra-thoracic pressure, peristaltic intestinal movement."]),
 T("basis", 56, A+" > Basis of Anatomy > Lymphatic system", "Lymph nodes, spleen and thymus", [
   "Lymph nodes are oval or kidney-shaped small bodies along the course of lymph vessels, in groups at fixed sites: in the neck on the sides and at the junction with the head; in the chest close to trachea and bronchi and in the chest wall; in the abdomen around the abdominal aorta and close to abdominal organs; in the pelvis around blood vessels and close to pelvic organs; at the root of the upper limb the axillary nodes; at the root of the lower limb the inguinal nodes.",
   "Lymph node functions: filtration of lymph from bacteria and foreign bodies; formation and production of lymphocytes; site of interaction between microorganisms (antigens) and lymphocytes and phagocytes.",
   "Spleen: a haemo-lymphatic organ in the upper left part of the abdominal cavity below the left dome of the diaphragm, behind the stomach, protected by the 9th, 10th and 11th ribs; not palpable unless enlarged at least 3 times.",
   "Spleen functions: in the fetus plays a role in blood cell formation; in the adult it stores and concentrates blood cells to be used in haemorrhage; destroys old expired red cells; filters blood from harmful substances (the spleen filters blood while lymph nodes filter lymph).",
   "Thymus gland: a lymphatic organ with endocrine function (secretes thymosine hormone), formed of 2 lobes, lying behind the sternum; its size increases until puberty then decreases with advancing age.",
   "Clinical: extensive destruction of lymph vessels (in surgery) or obstruction (in filariasis) leads to oedema of the part drained; lymph nodes may swell in inflammation, metastases or primary tumour; in lymph node enlargement the area drained should be examined and in any lesion the draining lymph nodes should be examined."],
   ["spleen protected by the 9th, 10th and 11th ribs", "spleen not palpable unless enlarged at least 3 times"]),
]

# ---- General Embryology ----
TOPICS += [
 T("embryo", 4, A+" > General Embryology > Gametes", "Male and female gametes", [
   "Male gametes (sperms) and female gametes (ova) are reproductive cells formed from primordial germ cells; the process is spermatogenesis in the male and oogenesis in the female. Site: in the gonads (testis or ovary).",
   "Timing: in males it starts at puberty and continues till old age; in females it starts in intrauterine life then is arrested, to be continued from puberty to menopause through ovarian cycles. Ovulation occurs at the 14th day of the ovarian cycle.",
   "Sperm: 55 microns long. Head 4 microns, containing a condensed nucleus carrying the hereditary material of the father (22 autosomes and X or Y sex chromosome), mostly covered by the acrosomal cap which has enzymes (hyaluronidase and acrosin) facilitating penetration of the ovum coverings; minimal cytoplasm; cell membrane.",
   "Neck: narrow part between head and middle piece. Middle piece: 6 microns, formed of a mitochondrial sheath which is the energy source for sperm motility. Tail: 45 microns, an axial filament with cell membrane around it, directing sperm movement towards the ovum then helping fertilization.",
   "Ovum: diameter about 120 microns, consisting of the secondary oocyte carrying the hereditary material of the mother (22 autosomes and X sex chromosome), large cytoplasm which is the initial source of zygote nutrition, and cell membrane.",
   "Zona pellucida: glycoprotein coat around the ootid, carrying sperm receptors for sperm attraction prior to fertilization. Corona radiata: outer cover formed of follicular cells derived from the ovary."],
   ["sperm total length 55 microns", "sperm head 4 microns", "middle piece 6 microns", "tail 45 microns",
    "ovum diameter about 120 microns", "ovulation at day 14 of the ovarian cycle"]),
 T("embryo", 8, A+" > General Embryology > First Week of Development", "Fertilization", [
   "Definition: union between the male gamete (sperm) and the female gamete (ovum) to form a zygote. Site: ampulla of the uterine tube.",
   "Sperm capacitation: removal of the glycoprotein coat from the acrosomal regions of sperms in the female genital system, taking about 7 hours.",
   "Phase I (corona radiata dispersion): only 300-500 sperms out of 200-300 million per ejaculation reach the ovum and start corona radiata dispersion by release of hyaluronidase.",
   "Phase II (zona pellucida penetration): sperms bind to the zona at specific binding sites (sperm receptors); they secrete acrosomal enzymes (acrosin and trypsin-like substances) dissolving a passage; only one sperm passes (acrosomal reaction) by tail movement; the fertilizing sperm head contacts the 2nd oocyte cell membrane.",
   "Phase III (penetration of the oocyte cell membrane): the cell membranes of sperm and ovum fuse, then open to allow passage of the sperm contents (nucleus, middle piece and axial filament) into the ovum cytoplasm, leaving the sperm cell membrane on the oocyte outer surface.",
   "Events after sperm entrance: cortical and zona reactions — the oocyte releases lysosomal enzymes from cortical granules which prevent polyspermy by changing the sperm binding sites of the zona and making the fertilized oocyte cell membrane impenetrable; the 2nd oocyte completes the 2nd meiotic division forming a mature ovum (ootid, 23 chromosomes) and the 2nd polar body (23 chromosomes); the male nucleus enlarges into the male pronucleus and contacts the female pronucleus; the nuclear membranes fuse forming the zygote nucleus.",
   "Results: zygote formation; sex determination (male XY or female XX); restoration of the diploid number (46 chromosomes); start of cleavage and zygote migration from the fertilization site to the implantation site in the uterine cavity."],
   ["capacitation about 7 hours", "300-500 sperms reach the ovum out of 200-300 million per ejaculation",
    "ootid 23 chromosomes", "2nd polar body 23 chromosomes", "diploid number 46 chromosomes"]),
 T("embryo", 10, A+" > General Embryology > First Week of Development", "Cleavage, migration and blastocyst formation", [
   "The zygote divides mitotically inside the zona pellucida giving smaller blastomeres (46 chromosomes): two-cell stage on the 1st day, four-cell on the 2nd day, 8-cell on the 3rd day, followed by 16-cell (morula), 32 and 64 cell stages.",
   "During cleavage the morula migrates inside the uterine tube to reach the uterine cavity at the 4th day, by uterine tube muscular peristalsis and cilia motion of the tubal mucosal lining.",
   "The zona pellucida starts to degenerate at the end of the 5th day; fluid passes through it forming multiple spaces between morula cells which fuse into a single cavity (blastocoele) — this stage is the blastocyst, completing development at the end of the 6th day.",
   "Blastocyst components: outer cell mass (trophoblast), a single layer of cells; inner cell mass (embryoblast), a mass of cells on one side of the inner aspect of the trophoblast; blastocoele (blastocyst cavity); embryonic pole (side corresponding to the embryoblast); abembryonic pole (opposite side)."],
   ["2-cell stage day 1", "4-cell stage day 2", "8-cell stage day 3", "morula 16 cells", "uterine cavity reached day 4",
    "zona degenerates end of day 5", "blastocyst complete end of day 6"]),
 T("embryo", 14, A+" > General Embryology > Second Week of Development", "Implantation and its abnormal sites", [
   "Definition: the process by which the blastocyst becomes embedded in the superficial layer of the endometrium. Time: starts at the 7th day and is completed at the 11th day.",
   "Site: in the endometrium of the upper part of the posterior wall of the uterus (just below the fundus), less frequently in the upper part of the anterior wall.",
   "During implantation the endometrium is in the secretory phase of the endometrial (menstrual) cycle — increased thickness, increased number and size of endometrial cells, spiral glands rich with secretions, spiral arteries showing arterio-venous anastomosis.",
   "Mechanism: the blastocyst adheres by its embryonic pole; the trophoblast proliferates at the embryonic pole forming a new cell layer with no cell walls (syncytiotrophoblast) which secretes proteolytic enzymes eroding the endometrium and forming the implantation cavity; at the 9th day the blastocyst is embedded and the penetration site is blocked by a fibrin clot; 2 days later (11th day) the endometrial epithelium overgrows and covers the clot.",
   "Changes in the blastocyst during implantation: trophoblast differentiates into outer syncytiotrophoblast and inner cytotrophoblast starting at the embryonic pole; formation of the amniotic (8th day) and yolk sac (9th day) cavities; formation of the bilaminar embryonic disc (epiblast and hypoblast).",
   "Abnormal intrauterine implantation: placenta previa — implantation at the lower segment of the uterus, in 3 types, complete (covers the internal os completely), partial (covers it partially) and marginal (lower edge at the margin of the internal os); low lying placenta — implantation in the lower segment where the lower edge lies within 2 cm of the margin of the internal os. The internal os is the upper opening of the cervical canal.",
   "Ectopic pregnancy: blastocyst implanted outside the uterus — tubal (ampulla, isthmus or intramural parts; tubal rupture is expected at the 8th week leading to severe internal haemorrhage), ovarian (on the ovary surface), omental (on the peritoneal surface)."],
   ["implantation starts day 7, completed day 11", "embedded by day 9", "amniotic cavity day 8", "yolk sac cavity day 9",
    "low lying placenta: lower edge within 2 cm of the internal os", "tubal rupture expected at the 8th week"]),
 T("embryo", 16, A+" > General Embryology > Second Week of Development", "Decidua and the daily events of the 2nd gestational week", [
   "Decidua: the endometrium of the uterus after blastocyst implantation. Features: increased endometrial thickness, increased number and size of endometrial cells, glands become spiral and full of secretions, arteries are spiral and show arterio-venous anastomosis.",
   "Parts: decidua basalis between implanted embryo and myometrium; decidua capsularis covering the embryo and separating it from the uterine cavity; decidua parietalis lining the rest of the uterine cavity.",
   "Fate: decidua basalis (decidual plate) persists as the maternal part of the placenta; decidua capsularis and parietalis come into contact and fuse, obliterating the uterine cavity, to be expelled after delivery.",
   "7th day: blastocyst begins implantation; trophoblast differentiates into inner cytotrophoblast and outer syncytiotrophoblast starting at the embryonic pole; syncytiotrophoblast cells produce proteolytic enzyme eroding the endometrium.",
   "8th day: blastocyst partially implanted; increased area of trophoblast differentiation; inner cell mass cells facing the blastocoele become cuboidal forming the hypoblast; the amniotic cavity appears within the embryoblast, with amnioblast cells forming its roof (adjacent to cytotrophoblast, secreting amniotic fluid) and tall columnar epiblast cells forming its floor in contact with hypoblast; epiblast and hypoblast form the bilaminar embryonic disc.",
   "9th and 10th days: blastocyst completely implanted; penetration site closed by fibrin clot; syncytiotrophoblast extends to surround the whole blastocyst; lacunae appear in syncytiotrophoblast (lacunar stage); flat cells (Heuser's membrane) from hypoblast line the blastocoele transforming it into the primary yolk sac.",
   "11th and 12th days: endometrial epithelium grows over the fibrin clot; lacunae fill with maternal blood forming the utero-placental circulation; extra-embryonic mesoderm forms between cytotrophoblast externally and the embryonic disc with amniotic and yolk sac cavities internally, and multiple spaces appear in it.",
   "13th day: fusion of the extraembryonic mesoderm spaces forms the extra-embryonic coelom (chorionic cavity), the blastocyst now being the chorionic vesicle with a wall called chorion (somatic extraembryonic mesoderm, cytotrophoblast and syncytiotrophoblast from inside out); the connecting stalk is the part of extraembryonic mesoderm connecting the caudal end of the embryonic disc with the chorion; new cells from hypoblast line the primary yolk sac to form the 2nd yolk sac; a large part of the 2nd yolk sac is pinched off with marked reduction in size; the allantois forms extending from the caudal wall of the yolk sac into the connecting stalk; primary chorionic villi start to appear."]),
 T("embryo", 20, A+" > General Embryology > Third Week of Development", "Chorion and chorionic villi", [
   "Chorion is the chorionic vesicle wall, formed of somatic extraembryonic mesoderm, cytotrophoblast and syncytiotrophoblast (internal to external); it secretes chorionic gonadotropin which maintains the corpus luteum (the progesterone source in the ovary) for 4 months.",
   "Chorionic villi are projections from the chorion, starting at the end of the 2nd week and completing at the end of the 3rd week.",
   "Primary villi: cytotrophoblast cells proliferate and push the syncytiotrophoblast; separated from each other by lacunae filled with maternal blood; start at the end of the 2nd week and complete at the beginning of the 3rd.",
   "Secondary villi: formed when somatic extraembryonic mesoderm enters the primary villus core, at the middle of the 3rd week; separated by intervillous spaces.",
   "Tertiary villi: formed when fetal blood vessels appear in the secondary villus mesoderm at the end of the 3rd week; separated by intervillous spaces filled with maternal blood. The cytotrophoblastic shell is formed when cytotrophoblast cells penetrate the syncytiotrophoblast and extend to surround the tertiary villi and intervillous spaces.",
   "Parts of a tertiary villus: stem (anchoring) villus extending between chorion and decidua basalis; free (floating or absorbing) villi, side branches from the stem villus floating in maternal blood in the intervillous spaces, responsible for nutrient and gas exchange.",
   "Parts of the chorion: chorion frondosum (chorionic plate) carrying well developed tertiary villi and facing the decidua basalis, which persists as the fetal part of the placenta; chorion laeve, the rest carrying degenerating tertiary villi and covered with decidua capsularis, which fuses with decidua capsularis and parietalis and degenerates."],
   ["chorionic gonadotropin maintains the corpus luteum for 4 months"]),
 T("embryo", 22, A+" > General Embryology > Third Week of Development", "Gastrulation and the notochord", [
   "Gastrulation: transformation of the bilaminar embryonic disc into a trilaminar disc, starting with development of the primitive streak and primitive node in the epiblast layer.",
   "Primitive streak: formed in the midline of the caudal part of the epiblast as a median narrow groove with bulging sides, developed by proliferation and migration of epiblast cells towards the groove. Primitive node: a rounded bulge at the cranial end of the streak with a middle primitive pit.",
   "Invagination: epiblast cells pass through the primitive groove forming the endodermal layer (replacing hypoblast), the intra-embryonic mesoderm (the middle layer) and the notochord in the median region. The remaining epiblast is called ectoderm, its junction with amnion being the amnio-ectodermal junction. All three germ layers derive from the epiblast.",
   "Buccopharyngeal membrane: rounded area of fusion between ectoderm and endoderm at the cranial part of the disc. Cloacal membrane: the same at the caudal part.",
   "During the 3rd week the disc changes from oval to pear-shaped with a broader cranial part.",
   "Notochord: temporary axial skeleton of the embryonic disc. Development in 5 steps — prenotochordal process (solid cord of cells invaginating from the primitive pit, extending cranially in the midline between ectoderm and endoderm to the buccopharyngeal membrane); notochordal canal (the primitive pit extends into the process, its roof contacting ectoderm and its floor fused with endoderm); neurenteric canal (temporary communication between amniotic cavity and yolk sac from degeneration of the canal floor with the fused median endoderm); notochordal plate (the persisting canal roof fusing with remaining endoderm); definitive notochord (the plate folds upon itself into a solid cord; endoderm regenerates so amniotic cavity and yolk sac regain separation).",
   "Notochord importance: temporary axial skeleton; its firmness limits the head fold during folding; the vertebral column is formed around it. Fate: most degenerates except the part within the intervertebral disc which persists as the nucleus pulposus.",
   "Intra-embryonic mesoderm is not present at the buccopharyngeal membrane, the cloacal membrane, the notochord site and the neural tube site."]),
 T("embryo", 28, A+" > General Embryology > Embryonic Period", "Germ layer derivatives and mesoderm differentiation", [
   "The embryonic period (period of organogenesis) is the 4th to the 8th week, when each of the 3 germ layers gives rise to derivatives.",
   "Ectoderm derivatives: central nervous system; neural crest derivatives; otic (internal ear) and lens (eye lens) placodes; peripheral nerves; sensory epithelium of ear, nose, eye and skin epidermis; pituitary gland; anterior part of the oral cavity and lower part of the anal canal.",
   "Endoderm lining epithelium: digestive system except its beginning and end; respiratory tract; most of urinary bladder and urethra; tympanic cavity and Eustachian tube. Endoderm glandular epithelium: parenchyma of liver, pancreas, thyroid, thymus, tonsils (palatine and nasopharyngeal) and parathyroid glands.",
   "At the 17th day the intraembryonic mesoderm divides into paraxial mesoderm (on both sides of notochord and neural tube), intermediate mesoderm (between paraxial and lateral plate) and lateral plate mesoderm (most lateral).",
   "Cells from the cranial part of the primitive streak form paraxial mesoderm, from the middle part intermediate mesoderm, and from the caudal part lateral plate mesoderm."],
   ["mesoderm divides at day 17"]),
 T("embryo", 30, A+" > General Embryology > Embryonic Period", "Somites, intra-embryonic coelom and lateral plate mesoderm", [
   "Somites: segmented masses of paraxial mesoderm; segmentation starts at the occipital region and extends caudally, with somitomeres cephalic to the 1st occipital somite.",
   "Segmentation time: the 1st pair appears on the 20th day, then 3 pairs per day till the 30th day (the somite period), then at a slower rate till the 35th or 40th day. Number: 42-44 somite pairs.",
   "Embryo age determination during the somite period: Age in days = (Number of somites - 1)/3 + 20.",
   "Regional classification: 4 occipital, 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 8-10 coccygeal somites.",
   "Each somite divides obliquely into the sclerotome (ventromedial part, migrating medially to surround the notochord and neural tube forming vertebrae and intervertebral disc) and the dermomyotome (dorsolateral part) which subdivides into dermatome (skin dermis) and myotome (body skeletal muscles).",
   "The dermomyotome divides into a dorsal part (skin dermis and skeletal muscle on the back of the vertebral column) and a ventral part (skin dermis and skeletal muscle of the rest of the body); each spinal nerve divides into dorsal and ventral rami to supply these parts.",
   "Intra-embryonic coelom: a horse-shoe cavity in lateral plate mesoderm whose caudal ends communicate with the extra-embryonic coelom, divided into the pericardial cavity (median-cranial part), peritoneal canals (lateral part) and pleural cavities (between pericardium and peritoneal canals).",
   "It splits lateral plate mesoderm into somatopleuric (somatic) mesoderm in contact with ectoderm, forming connective tissue of the trunk wall, parietal pleura, pericardium and peritoneum; and splanchnopleuric (splanchnic) mesoderm in contact with endoderm, forming gut and respiratory tract smooth muscle and connective tissue, cardiac muscle and visceral pleura, pericardium and peritoneum.",
   "The cardiogenic area is lateral plate mesoderm related to the pericardium; the septum transversum is the cranial part of lateral plate mesoderm which forms the central part of the diaphragm."],
   ["1st somite pair on day 20", "3 pairs per day until day 30", "slower rate till day 35-40", "42-44 somite pairs",
    "4 occipital, 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 8-10 coccygeal somites"],
   ["Age in days = (Number of somites - 1)/3 + 20"]),
 T("embryo", 32, A+" > General Embryology > Embryonic Period", "Folding of the embryonic disc", [
   "Definition: the process by which the embryonic disc becomes folded upon itself. Time: starts at the end of the 3rd week and is completed at the end of the 4th week.",
   "Types: cephalo-caudal (longitudinal) folding forming head and tail folds; lateral (transverse) folding of the right and left margins of the disc.",
   "Causes: increase in the longitudinal length of the disc due to neural tube and somite growth (causing cephalo-caudal folding); amniotic cavity expansion (causing folding in all directions).",
   "The head fold is limited by the relatively firm cranial end of the notochord; the tail fold is limited by the relatively firm primitive streak.",
   "Steps/results: amniotic cavity expansion forms the primitive umbilical ring by ventral shifting of the amnio-ectodermal junction, the ring containing connecting stalk, allantois and vitelline duct; the disc bulges into the amniotic cavity and becomes completely surrounded by it; the disc changes into a cylindrical shape with a body cavity; cranio-caudal elongation gives head and tail folds.",
   "Part of the yolk sac is incorporated inside the folded embryo forming the endoderm-lined gut — foregut in the head fold, midgut in the middle, hindgut in the tail fold; the definitive yolk sac is the part remaining outside the abdomen in the umbilical cord, connected to the midgut by the vitelline (vitellointestinal) duct.",
   "Peritoneal canals of the intraembryonic coelom surround the gut with subsequent mesentery formation; the pericardial bulge is formed by the growing heart and pericardium; the forebrain bulge forms in the head fold, separated from the pericardial bulge by the stomodeum (an ectodermal depression), the buccopharyngeal membrane separating stomodeum from foregut.",
   "Reversal of position: the septum transversum becomes caudal instead of most cranial, and the buccopharyngeal membrane becomes most cranial; the connecting stalk and allantois become ventral and cranial instead of most caudal, and the cloacal membrane becomes most caudal."]),
 T("embryo", 36, A+" > General Embryology > Fetal Membranes", "Placenta — external features, formation and structure", [
   "Fetal membranes are tissues for protection, support and nutrition of the embryo: chorion and chorionic villi, placenta, amnion, umbilical cord and yolk sac.",
   "Full-term placenta: disc shaped, diameter 15-20 cm, weight 500-600 gm, thickness 3 cm, sited mostly in the upper segment of the posterior wall of the uterine cavity near the fundus.",
   "Fetal surface faces the fetus, smooth and covered with transparent amnion, the umbilical cord attached near its centre. Maternal surface lies in contact with the uterine wall and shows 15-20 elevations (cotyledons) separated by grooves and covered by a thin layer of decidua basalis.",
   "Formed of two main parts: maternal — decidual plate (decidua basalis); fetal — chorionic plate (chorion frondosum).",
   "Chorionic plate from external to internal: amnion, somatic extraembryonic mesoderm, cytotrophoblast, syncytiotrophoblast. Decidual plate from external to internal: decidua basalis, cytotrophoblastic shell, syncytiotrophoblast lining the intervillous space.",
   "Chorionic villi (tertiary villi of chorion frondosum) are composed of syncytiotrophoblast (outer), cytotrophoblast, somatic extraembryonic mesoderm and fetal blood vessel endothelium.",
   "Intervillous spaces: intercommunicating spaces separating stem villi and receiving floating villi, containing maternal blood (150 ml changed 3-4 times per minute) derived from arterioles of decidua basalis.",
   "Placental (decidual) septa: incomplete septa extending from the decidual plate into the intervillous spaces, appearing during the 4th and 5th months; each has a decidua basalis core covered with cytotrophoblast and syncytiotrophoblast; the cotyledons are separated by grooves corresponding to their inward extension."],
   ["diameter 15-20 cm", "weight 500-600 gm", "thickness 3 cm", "15-20 cotyledons",
    "150 ml maternal blood changed 3-4 times/minute", "septa appear during the 4th and 5th months"]),
 T("embryo", 38, A+" > General Embryology > Fetal Membranes", "Placental circulation, barrier and functions", [
   "Maternal circulation: arterial blood flows to the intervillous spaces through 80-100 decidual arterioles and flows back through maternal venules; the full-term placenta contains about 150 ml of maternal blood changed 3-4 times per minute.",
   "Fetal circulation: umbilical arteries carry fetal blood to the placenta through the umbilical cord to the fetal surface where they enter tertiary villi; after exchange, fetal blood is carried back through the left umbilical vein.",
   "Early placental barrier: fetal blood vessel endothelium, somatic extraembryonic mesoderm, cytotrophoblast and syncytiotrophoblast. Late placental barrier (from the 4th month): fetal blood vessel endothelium and syncytiotrophoblast only — the membrane becomes thinner in the 2nd half of pregnancy to allow rapid exchange for the larger fetus.",
   "Barrier functions: separates fetal and maternal blood; permits gaseous, nutritive and waste product exchange; prevents passage of bacteria and most viruses (except HIV, poliomyelitis, rubella, cytomegalovirus and measles); prevents passage of most toxic material and most maternal hormones.",
   "Placental functions: exchange of metabolic products; exchange of gases; transmission of maternal antibodies to the fetus starting from the 14th week; endocrine function producing progesterone (maintains pregnancy endometrium), estrogen (stimulates uterine growth and mammary gland development), human chorionic gonadotropin (maintains the corpus luteum till the 4th month and is used to detect pregnancy) and somatomammotropin (gives the fetus priority on maternal blood glucose and promotes breast development); protective role; excretory function getting rid of fetal urea and creatinine.",
   "Placental abnormalities: in position — placenta previa (complete, partial, marginal) and low lying placenta; in shape — bilobed or trilobed; in number — twin placenta (2 identical placentae with 2 cords) and accessory placenta (main placenta with a small extra one, single cord attached to the main); in cord attachment — velamentous (cord attached through the amniotic membrane) and battledore (cord attached to the placental margin); in diameter — placenta membranacea (thinner and wider); in infiltration — accreta (till myometrium), increta (in myometrium), percreta (to covering peritoneum)."],
   ["80-100 decidual arterioles", "late barrier from the 4th month", "maternal antibodies transmitted from the 14th week",
    "HCG maintains the corpus luteum till the 4th month"]),
 T("embryo", 42, A+" > General Embryology > Fetal Membranes", "Amnion and amniotic fluid", [
   "Amnion is the amniotic cavity wall; the cavity appears at the 8th day within the embryoblast, separating amnioblasts (adjacent to cytotrophoblast) from epiblast (adjacent to hypoblast); the junction of ectoderm and amnion is the amnio-ectodermal junction.",
   "Expansion: the amnio-ectodermal junction shifts ventrally after folding and surrounds the primitive umbilical ring; with more expansion the amnion surrounds the umbilical cord and covers the fetal surface of the placenta.",
   "At the 3rd month the amnion contacts the chorion forming the amniochorionic membrane with obliteration of the chorionic cavity; by the end of the 3rd month the amniochorionic membrane covered with decidua capsularis contacts decidua parietalis, obliterating the uterine cavity.",
   "Amniotic fluid: clear watery fluid of water, electrolytes, proteins, carbohydrates, lipids, phospholipids and urea; first produced by amnioblasts then derived from maternal blood by osmosis; after renal development fetal urine is added daily from the 5th month. Volume reaches 1.0-1.5 litre from the 37th week till birth.",
   "It contains a considerable quantity of stem cells able to differentiate into various tissues including brain, liver and bone.",
   "Functions in early pregnancy: shock absorbent against external trauma; heat insulator keeping fetal temperature constant; prevents embryo adhesion to the uterine wall; prevents adhesion of fetal parts together.",
   "Functions in late pregnancy: gives space for fetal movements essential for muscle development; gives space for urine accumulation; at the beginning of the 5th month the fetus starts to swallow it, learning suckling.",
   "Functions during delivery: protects the fetus against uterine contractions; the amniotic sac forebag helps gradual cervical canal dilatation; forebag rupture is a sign of labour starting; sterile amniotic fluid washes the vagina just before fetal passage."],
   ["amniotic cavity appears day 8", "fetal urine added from the 5th month", "volume 1.0-1.5 litre from the 37th week"]),
 T("embryo", 44, A+" > General Embryology > Fetal Membranes", "Amniotic fluid abnormalities and the umbilical cord", [
   "Polyhydramnios: amniotic fluid volume more than 2 litres at full term. Causes — unknown in 35% of cases; maternal diabetes; congenital malformation such as oesophageal atresia interfering with fetal swallowing; CNS malformation such as anencephaly.",
   "Oligohydramnios: volume less than 400 ml at full term; may result from renal agenesis or urinary tract obstruction. Premature rupture of the amniotic sac is the most common cause of preterm labour.",
   "Umbilical cord: connects fetus and placenta, extending between the fetal surface of the placenta and the ventral aspect of the fetal abdominal wall; length 50-60 cm, diameter 2 cm; tortuous due to the wavy course of the umbilical arteries, a wider curve giving a false knot with no fetal stress.",
   "Structure: 2 umbilical arteries and 1 umbilical vein embedded in Wharton's jelly and covered with amnion. Functions: transmit fetal blood between fetus and placenta; allow the fetus free mobility.",
   "Development: primitive umbilical ring formed during the 4th week containing connecting stalk with allantois and umbilical vessels, plus vitelline duct and vessels; primitive umbilical cord formed as the ring contents collect inside an amnion sheath, containing connecting stalk, allantois remnant, umbilical vessels, secondary (definitive) yolk sac, vitelline duct and vessels; at the 6th week the intestinal loop herniates into the cord (physiological umbilical hernia).",
   "Definitive cord: the intestinal loop returns to the abdominal cavity by the 3rd month; the right umbilical vein and extra-embryonic parts of the vitelline vessels obliterate; the vitelline duct, 2nd yolk sac and extra-embryonic part of the allantois degenerate; Wharton's jelly forms from connecting stalk mesoderm.",
   "Cord abnormalities: short cord limits fetal movements and causes premature placental separation; long cord may encircle the fetal neck or form a true knot, both life-threatening; congenital umbilical hernia (omphalocele) where the cord contains intestinal coils that failed to return to the abdominal cavity; degeneration of one umbilical artery with persistence of the other; abnormal attachment to the placental margin (battledore) or through the amniotic membrane (velamentous)."],
   ["polyhydramnios more than 2 litres", "unknown cause in 35% of polyhydramnios cases", "oligohydramnios less than 400 ml",
    "cord length 50-60 cm", "cord diameter 2 cm", "2 umbilical arteries and 1 umbilical vein",
    "physiological umbilical hernia at the 6th week, returning by the 3rd month"]),
 T("embryo", 46, A+" > General Embryology > Fetal Membranes", "Yolk sac", [
   "Development in 3 stages: primary (primitive) yolk sac at the 9th day, when Heuser's membrane develops from hypoblast cells and migrates to line the blastocoele; secondary (definitive) yolk sac formed at the 13th day; and after folding, when the definitive yolk sac is compressed to form a vitelline (vitellointestinal) duct connecting the midgut with the part of the yolk sac remaining outside the folded embryonic disc.",
   "Changes at the 13th day: new cell generations from hypoblast line Heuser's membrane; the yolk sac is reduced in size by a part being pinched off by the chorionic cavity; the allantois forms as a diverticulum from the caudal part of the yolk sac inside the connecting stalk.",
   "Fate: the secondary (definitive) yolk sac and vitelline duct gradually reduce in size and finally degenerate.",
   "Functions: gut formation — the endodermal lining shares in forming the mucosa of foregut, midgut and hindgut after folding; formation of the apex of the urinary bladder from the proximal part of the allantois; primordial germ cell formation — at the 2nd week epiblast cells migrate to the caudal part of the yolk sac wall; vitelline vessels develop in the mesoderm around the vitelline duct, the intra-embryonic parts remaining as the gut blood supply while extraembryonic parts disappear; blood cells develop in yolk sac mesoderm in early pregnancy."]),
 T("embryo", 50, A+" > General Embryology > Fetal Period", "The fetal period", [
   "The fetal period runs from the beginning of the 9th week till birth, characterized by maturation of tissues and organs and rapid body growth.",
   "Fetal length is indicated as crown-rump length (CRL, sitting height) or crown-heel length (CHL, standing height), correlated with fetal age in weeks.",
   "Growth table given: 9-12 weeks CRL 5-8 cm / 10-45 g; 13-16 weeks 9-14 cm / 60-200 g; 17-20 weeks 15-19 cm / 250-450 g; 21-24 weeks 20-23 cm / 500-820 g; 25-28 weeks 24-27 cm / 900-1300 g; 29-32 weeks 28-30 cm / 1400-2100 g; 33-36 weeks 31-34 cm / 2200-2900 g; 37 weeks to full term 35-36 cm / 3000-3400 g.",
   "Relative head size: at the beginning of the 3rd month the head is 1/2 CR length; at the beginning of the 5th month 1/3 CH length; at birth 1/4 CH length.",
   "Changes in external features: the face becomes human-looking during the 3rd month; limbs become longer at the 3rd month; external genitalia are differentiated at the end of the 3rd month; lanugo hair covers the fetus from the 4th month; the skin is covered by vernix caseosa at the 5th month; the skin is wrinkled till the end of the 6th month due to absence of subcutaneous fat; the testes descend to the scrotum just before birth.",
   "Fetal movements are clearly recognized from the 5th month. Pregnancy duration is about 280 days (40 weeks) from the 1st day of the last menstruation, or more accurately 266 days (38 weeks) after fertilization."],
   ["full term 3000-3400 g and CRL 35-36 cm", "head 1/2 CRL at 3rd month, 1/3 CHL at 5th month, 1/4 CHL at birth",
    "pregnancy 280 days (40 weeks) from LMP or 266 days (38 weeks) after fertilization"],
   [], [{"page": 51, "caption": "Chart of fetal growth from 8 to 40 weeks and a diagram of the changing ratio of head length to fetal length", "kind": "diagram"}]),
 T("embryo", 52, A+" > General Embryology > Fetal Period", "Twins", [
   "Dizygotic (fraternal) twins: formed by 2 zygotes from simultaneous ovulation of 2 oocytes fertilized by 2 sperms; the commonest type, 0.7-1.1% of total births; offspring are not identical in shape and may be of the same or different sex; each embryo implants separately and develops its own amnion, chorion and placenta.",
   "Monozygotic (identical) twins: splitting of a fertilized ovum at variable stages of development; 0.3-0.4% of total births; offspring are identical in shape and sex; fetal membranes vary with the splitting stage.",
   "Morula splitting: the morula divides into 2 morulae developing into 2 separate blastocysts — each embryo has its own amnion, chorion and placenta.",
   "Inner cell mass splitting of the early blastocyst: a single blastocyst with 2 inner cell masses — each embryo has its own amnion, both share a common chorion and placenta.",
   "Embryonic disc splitting of the late blastocyst: a single blastocyst with 2 embryonic discs — both embryos have a common amnion, chorion and placenta.",
   "Anomalies: Siamese (fused) twins from incomplete split of the embryonic disc, fused at the head (craniopagus), thorax (thoracopagus) or pelvis (pygopagus), success of surgical separation depending on the fusion site and shared organs; twin defects — increased incidence of prematurity, low birth weight or high mortality rate."],
   ["dizygotic twins 0.7-1.1% of total births", "monozygotic twins 0.3-0.4% of total births"]),
]
