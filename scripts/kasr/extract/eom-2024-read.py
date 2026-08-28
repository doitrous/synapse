#!/usr/bin/env python3
"""The 5 December 2024 end-of-module paper, read off the page images.

`eom.py` recovered 77 of this paper's 120 questions and not one of their
options, and I recorded on the sitting that it needed "a reader or a vision
model, not another OCR pass". That was right about OCR — at 400 dpi under psm 4,
6 and 11, "ribosomes" comes back "Posomes" — and wrong to stop there. The pages
render perfectly legibly; it is tesseract that cannot read them, because a
candidate ringed their answers and the ink crosses the option letters.

So this is the paper read from the rendered images rather than extracted:
all 120 questions with all four options each, transcribed by eye.

Two things deliberately NOT done here.

**No answers.** The pen marks are a candidate's working, not a key — the
answer-key recovery pass classified this file as "hand marks, no key" — and a
candidate can be wrong. Some marks are plainly eliminations rather than
selections. Recording them as answers would put one student's guesses into the
bank as the faculty's. Answers come from the department book at authoring, as
they did for the other sat-paper rows.

**No corrections.** Where the paper misspells — "Ppponens pollicis",
"Corona radiate", "Blasoceole", "peridontal", "metaphysic" — the transcription
keeps it. Those are the examiner's words, and a student sitting the real paper
met them as printed.

    python3 scripts/kasr/extract/eom-2024-read.py
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "eom-2024-read.json")

SOURCE_ID = "src_16f747e1171423933757"
FILE = "EOM ISK EOM exam 2024.pdf"

# The cover, read from page 1: `Module Name: Introduction and Skeletal System`,
# `Module Code: ISK-101`, `End of Module Exam`, `Date: 5 / 12 /2024`,
# `Time allowed: 120 minutes`, `Total Marks: 72 marks`, `Number of pages: 11`,
# `The exam consists of 120 MCQs to be answered in the bubble sheet`.
COVER = {
    "moduleName": "Introduction and Skeletal System",
    "moduleCode": "ISK-101",
    "satOn": "2024-12-05",
    "timeAllowed": 120,
    "totalMarks": 72,
    "pageCount": 11,
    "statedQuestions": 120,
    "formCode": "CMD0QF180003",
}

# (page, number, stem, a, b, c, d)
Q = [
 (1, 1, "Metachromatic stain is........:", "Toluidine blue", "Trypan blue", "Indian ink", "Sudan III"),
 (1, 2, "Reticulocytes are stained by ............ stain:", "Silver", "Brilliant cresyl blue", "Leishman", "Janus green"),
 (1, 3, "The following is a non-membranous organelle:", "Cell membrane", "Mitochondria", "Golgi apparatus", "Ribosomes"),
 (1, 4, "Regarding the peroxisomes (microbodies):", "Budd from smooth endoplasmic reticulum (sER)", "Divide by simple division", "Numerous in cardiac muscle", "produce energy stored as ATP"),
 (1, 5, "Heterolysosome is formed of primary lysosome and ..............:", "Pinocytic vesicle", "Destroyed organelle", "Residual body", "Phagosome"),
 (1, 6, "The nucleus of active protein forming cell appears:", "Condensed", "Vesicular", "heterochromatic", "Electron dense by E.M"),
 (1, 7, "The cytoplasmic organelle concerned with detoxification of drugs is:", "sER", "rER", "Golgi apparatus", "Lysosomes"),
 (1, 8, "The intermediate filament found in cells of connective tissue is:", "Desmin", "Vimentin", "Cytokeratin", "Glial fibrillar acidic protein"),
 (1, 9, "The shaft of cilia is composed of .............. microtubules:", "9", "27", "18", "20"),
 (1, 10, "Regarding the microfilaments:", "Formed of tubulin", "Form microvilli", "Diameter 8-10nm", "Include lamins"),

 (2, 11, "Which statement applies to the ribosomes:", "Arise from Golgi apparatus", "Cause cytoplasmic acidophilia", "Bind to rER at ribophorins", "Form the steroid hormones"),
 (2, 12, "The secretory vesicles in a cell arise from:", "SER", "rER", "Golgi apparatus", "Mitochondria"),
 (2, 13, "Which statement is correct about the mitochondria?", "Responsible for cell digestion", "Inner membrane form cristae", "Form intracellular pathway", "Stain orange with silver"),
 (2, 14, "Pars amorpha of nucleolus is ..........:", "Light area", "Filaments of rRNA", "Strands of DNA", "Granules of rRNA"),
 (2, 15, "Regarding the Golgi apparatus, it is:", "Formed of saccules covered by ribosomes", "The power house of the cell", "Stained by silver", "A non-membranous organelle"),
 (2, 16, "Glycogen in the liver can be stained by..............:", "PAS", "Silver", "Iron hematoxylin", "Sudan III"),
 (2, 17, "Formation of mitotic spindle in mitosis is related to:", "Actin", "Microvilli", "Centriole", "Lysosome"),
 (2, 18, "The C.T. cell with mitochondria rich in cytochrome oxidase is .......... cell:", "Reticular", "Multilocular fat", "Unilocular fat", "Plasma"),
 (2, 19, "Type of connective tissue proper forming stroma of organs is .......... C.T.:", "Reticular", "white fibrous", "Loose areolar", "Brown adipose"),
 (2, 20, "The following cell can give rise to endothelial cell:", "Fibroblast", "Mast cell", "Histiocyte", "Pericyte"),
 (2, 21, "Monocytes are the origin of .......... cells:", "Plasma", "Mast", "Macrophages", "Fibroblasts"),
 (2, 22, "Reticular fibers can be specially stained with:", "H&E", "Van Gieson", "PAS", "Orcein"),
 (2, 23, "Endocrine secretion of leptin is a function of:", "Fibroblast", "Unilocular fat cell", "Reticulocyte", "Pericytes"),
 (2, 24, "The antigen presenting C.T. cell is:", "Histiocyte", "Plasma cell", "Mast cell", "Fibroblast"),

 (3, 25, "Mast cell show:", "Deep acidophilic cytoplasm", "Clock face nucleus", "Surface receptor for IgE", "Non granular cytoplasm"),
 (3, 26, "The ............ synthesize C.T. fibers and ground substance:", "Macrophage", "Mast cell", "Plasma cell", "Fibroblast"),
 (3, 27, "Regarding the holocrine mode of glandular secretion:", "No change in secretory cells", "Apex of cell come out with secretion", "The whole cell is lost with secretion", "The most common type"),
 (3, 28, "Simple cubical epithelium is found in the following site:", "Bowman's capsule of kidney", "Convoluted tubules of kidney", "Endothelium of blood vessels", "Epidermis of the skin"),
 (3, 29, "Lung bronchioles are lined with:", "Simple squamous epithelium", "Simple columnar epithelium", "Simple columnar ciliated epithelium", "Stratified squamous epithelium"),
 (3, 30, "Basement membrane shows the following types of collagen:", "III, IV & VII", "I, III & IV", "IV, V & VII", "II, III & IV"),
 (3, 31, "The strongest type of junctions is ......... :", "Adherent junction", "Desmosome", "Gap junction", "Tight junction"),
 (3, 32, "Pseudostratified columnar ciliated epithelium with stereocilia lines:", "Fallopian tube", "Esophagus", "Ureter", "Epididymis"),
 (3, 33, "Lung alveoli are lined by:", "Simple squamous epithelium", "Stratified columnar epithelium", "Respiratory epithelium", "Transitional epithelium"),
 (3, 34, "Passage of impulses between muscle cells is helped by:", "Zonula adherens", "Nexus", "Macula adherens", "Occluding junction"),
 (3, 35, "Regarding the RBCs:", "Basophilic by L.M.", "Show crenation in hypotonic solution", "Contain carbonic anhydrase enzyme", "single nucleus"),
 (3, 36, "Lysosomes in blood platelets are present in:", "Lambda granule", "Alpha granule", "Delta granule", "canalicular system"),
 (3, 37, "The cell of origin of platelets is characterized by:", "Multinucleated", "Acidophilic", "Seen in blood film", "Size 50-70 um"),

 (4, 38, "The blood cells with receptor for IgE are:", "Basophils", "RBCs", "Lymphocytes", "Eosinophils"),
 (4, 39, "Oval specific granules with electron dense core is seen in:", "Neutrophil", "Monocyte", "Basophil", "Eosinophil"),
 (4, 40, "Neutrophils:", "Decrease in parasitic disease", "Terminate allergic reaction", "Increase in pyogenic infections", "Responsible for cell mediated immunity"),
 (4, 41, "The ratio between immature WBCs to immature RBCs in bone marrow is:", "5:1", "1:5", "3:1", "1:10"),
 (4, 42, "The perforins are secreted from the following type of T-lymphocyte:", "Regulatory cell", "CD8+ T-cell", "Memory cell", "CD4+ T-cell"),
 (4, 43, "Natural killer cells are characterized by:", "Mature in thymus", "CD16+ cell", "Humoral immunity", "Memory cell"),
 (4, 44, "A condition with decreased number of WBCs below 4000 /mm3 is called:", "Leukemia", "Leukopenia", "Anemia", "Pancytopenia"),
 (4, 45, "Considering the movement of the radio-ulnar joint:", "In supination, the axis of supination-pronation is oblique to the axis of the forearm.", "In pronation, the bones of the forearm are parallel", "Pronation is the stronger movement.", "Supination with the elbow in extension is done by biceps."),
 (4, 46, "Regarding the palmar arterial arches:", "The superficial palmar arch is formed by union of the ulnar artery with the superficial palmar branch of radial artery.", "Five digital arteries arise from the convexity of the superficial palmar arch.", "The deep palmar arch is at a level of distal border of extended thumb.", "The deep palmar arch lies superficial to the long flexor tendons of the fingers"),
 (4, 47, "After drinking heavily on a Saturday night, a man fell asleep with his arm over the back of a chair. When he woke up in the morning, he had flexion at the elbow with inability to extend his hand. The most probable nerve injury is to the:", "radial nerve above the elbow", "innervation of the triceps muscle.", "radial nerve in the axilla", "posterior cord"),
 (4, 48, "The posterior wall of axilla is formed by:", "Pectoralis minor", "Teres major", "Supraspinatus", "Serratus anterior"),

 (5, 49, "Regarding the triceps brachii muscle:", "It has a lateral, a medial and a short head", "Long head takes origin from supraglenoid tubercle of scapula", "It is supplied by ulnar nerve", "It is inserted into the olecranon process of ulna"),
 (5, 50, "The muscles supplied by posterior interosseous nerve in forearm include:", "Anconeus", "Extensor carpi radialis longus", "Extensor indicis", "Brachialis"),
 (5, 51, "The muscles supplied by deep branch of ulnar nerve in hand include:", "Abductor pollicis brevis", "Flexor pollicis brevis", "Lateral two lumbricals", "All interossei"),
 (5, 52, "If the median nerve was injured above the elbow, which of the following muscles would retain function?", "Pronators", "Ppponens pollicis", "Palmaris longus", "Flexor carpi ulnaris"),
 (5, 53, "Opposition of thumb is dependent upon the functional integrity of this nerve:", "Axillary nerve", "Median nerve", "Radial nerve", "Ulnar nerve"),
 (5, 54, "The mid-palmar space (central compartment) of the palm contains the:", "Terminal branches of musculocutaneous nerve", "Ulnar synovial bursa", "Lumbrical muscles", "Tendon of flexor carpi ulnaris muscle"),
 (5, 55, "Regarding ulnar nerve injury:", "often occurs where the nerve passes posterior to medial epicondyle of the humerus", "The patient experiences numbness and tingling sensation on lateral part of the palm", "The patient exhibit \"waiter's tip\" hand", "Power of abduction is impaired"),
 (5, 56, "Concerning the muscles of the rotator cuff:", "Infraspinatus acts as a medial rotator at the shoulder", "The subscapularis is intimately related to the subacromial bursa", "The supraspinatus is supplied by a branch of the posterior cord of the brachial plexus", "They are the main factor in stabilizing the shoulder joint"),
 (5, 57, "A man came with fracture of the surgical neck of the humerus, the first movement of the shoulder joint that you would test to confirm the nerve injury is:", "Flexion", "Extension", "Rotation", "Abduction"),
 (5, 58, "A woman injured her wrist in trying to commit suicide. On examination, all the metacarpophalangeal joints of her fingers were extended and the interphalangeal joints were flexed. The most probable injury was to the:", "Palmar branches of median and ulnar nerves", "Median nerve", "Ulnar nerve", "Both median and ulnar nerves"),

 (6, 59, "After a dislocation of acromioclavicular joint, several structures could be torn, including the one that gives the joint its greatest strength and stability, namely:", "acromioclavicular ligament.", "coracoacromial ligament", "coracoclavicular ligament.", "supraspinatus tendon"),
 (6, 60, "A fracture of the surgical neck of the humerus, which artery may be injured?", "Subscapular", "Posterior humeral circumflex", "Radial recurrent", "Deep brachial"),
 (6, 61, "Patient was unable to retract his scapula because of paralysis of trapezius and:", "Infraspinatus", "Levator scapulae", "Rhomboids", "Serratus posterior superior"),
 (6, 62, "Lymphatics that accompany the cephalic vein drain into the:", "Pectoral group of axillary lymph nodes", "Subscapular group of axillary lymph nodes", "Central group of axillary lymph nodes.", "Apical group of axillary lymph nodes"),
 (6, 63, "The median nerve:", "supplies flexor carpi ulnaris and half of flexor digitorum profundus.", "gives rise to most of its branches in the upper arm.", "may be compressed between the two heads of pronator teres.", "enters cubital fossa lateral to the brachial artery"),
 (6, 64, "Select the correct statement; the musculocutaneous nerve:", "it is anterior to the biceps brachii muscle but deep to the brachialis", "arises from the medial cord of the brachial plexus.", "becomes the lateral cutaneous nerve of the forearm lateral to the biceps tendon.", "supplies the brachioradialis muscle."),
 (6, 65, "Lymphatics from the nipple and areola drain into the:", "pectoral group of axillary lymph nodes", "subscapular group of axillary lymph nodes", "central group of axillary lymph nodes", "apical group of axillary lymph nodes"),
 (6, 66, "A fracture of the midshaft of the humerus is most likely to injure which nerve?", "ulnar nerve", "median nerve", "radial nerve", "axillary nerve"),
 (6, 67, "The biceps brachii muscle is primarily involved in:", "extension of the forearm", "flexion and supination of the forearm", "pronation of the forearm", "flexion of the wrist"),
 (6, 68, "The glenohumeral joint is classified as a:", "hinge joint", "pivot joint", "ball-and-socket joint", "saddle joint"),

 (7, 69, "In a patient with Erb-Duchenne palsy, a nerve arising from the superior trunk of the brachial plexus is nonfunctional. This nerve is the:", "suprascapular", "dorsal scapular", "long thoracic", "lateral pectoral"),
 (7, 70, "Which muscle is the strongest medial rotator of the arm?", "teres minor", "infraspinatus", "subscapularis", "supraspinatus"),
 (7, 71, "A person has a fracture of the upper end of humerus. During the repair the surgeon ties off the artery traveling through the quadrangular space to stop the hemorrhage. Which artery did he ligate?", "dorsal scapular", "posterior circumflex humeral", "scapular circumflex", "subscapular"),
 (7, 72, "The following facts is true of the serratus anterior muscle:", "it arises as digitations from the lower eight ribs", "the upper four digitations insert into the lateral border of the costal surface of scapula", "the lower digitations rotate the scapula upward during abduction", "it is innervated by intercostal nerves"),
 (7, 73, "Considering the nerve supply of pectoralis major; it is innervated by:", "lateral pectoral nerve.", "medial pectoral nerve", "both medial and pectoral nerves.", "nerve to pectoralis major."),
 (7, 74, "The superficial muscles of front of forearm include:", "pronator quadratus", "flexor carpi radialis", "flexor pollicis longus", "supinator"),
 (7, 75, "The contents of cubital fossa include:", "brachial artery", "musculocutaneous nerve", "ulnar nerve", "tendon of brachialis"),
 (7, 76, "The muscles supplied by anterior interosseous nerve in forearm include:", "flexor pollicis longus", "pronator teres", "palmaris longus", "lateral half of flexor digitorum profundus"),
 (7, 77, "The deep muscles of back of forearm include:", "extensor carpi radialis longus", "extensor carpi radialis brevis", "supinator.", "extensor carpi ulnaris."),
 (7, 78, "The structures passing deep to flexor retinaculum include:", "tendon of flexor digitorum profundus", "ulnar artery", "radial artery", "ulnar nerve"),
 (7, 79, "Concerning the anatomical snuff box:", "the ulnar artery lies in the floor of snuff box", "the scaphoid forms the floor", "it is visible when the thumb is fully flexed.", "it contains the ulnar artery."),

 (8, 80, "Clavicular part of deltoid is associated with:", "lateral rotation", "medial rotation", "abduction", "adduction"),
 (8, 81, "What muscles are necessary to raise the arm above the shoulder?", "first the deltoid, next the supraspinatus, and then the serratus anterior.", "first the supraspinatus, next the deltoid, and then the serratus anterior.", "first the supraspinatus, next the serratus anterior, and then the deltoid.", "first the serratus anterior, next the deltoid, and then the supraspinatus"),
 (8, 82, "Which structure passes through the carpal tunnel?", "ulnar nerve", "radial artery", "median nerve", "brachial artery"),
 (8, 83, "The elbow joint is classified as a:", "ball and socket joint", "hinge joint", "pivot joint", "saddle joint"),
 (8, 84, "A 45-year-old man is stabbed in the lateral chest wall. He now presents with winging of scapula when pushing against a wall. Which nerve is likely damaged?", "axillary nerve", "long thoracic nerve.", "dorsal scapular nerve", "thoracodorsal nerve."),
 (8, 85, "A 45-year-old man arrived at the emergency department with injuries to his left elbow after he fell in a bicycle race. Plain radiographic and magnetic resonance imaging (MRI) examinations show a fracture of the medial epicondyle and an injured ulnar nerve. Which of the following muscles will most likely be paralyzed?", "flexor digitorum superficialis", "biceps brachii", "brachioradialis", "flexor carpi ulnaris"),
 (8, 86, "The trapezius muscle is supplied by the ......................... nerve:", "cranial accessory", "spinal accessory", "long thoracic", "dorsal scapular"),
 (8, 87, "When the deep branch of the ulnar nerve has been destroyed by compression, the patient presents with:", "paralysis of abductor pollicis brevis", "an ape-like deformity of the hand", "paralysis of adductor pollicis", "loss of sensation over palmar surface of little finger"),
 (8, 88, "Loss of sensation from the tip of the index finger is indicative of injury to which nerve?", "radial", "median", "ulnar", "musculocutaneous"),
 (8, 89, "What is the innervation of the lumbrical muscles?", "all ulnar n.", "all radial n.", "all median n.", "half median & half ulnar nerves"),

 (9, 90, "The ulnar nerve", "it is a terminal branch of the lateral cord of the brachial plexus", "it lies behind the medial epicondyle of the humerus", "it descends with the long head of the triceps", "it innervates the triceps muscle"),
 (9, 91, "The cephalic vein is located on which aspect of the upper limb?", "lateral", "medial", "anterior", "posterior"),
 (9, 92, "As it emerges from the axilla, the median nerve lies where with regards to the brachial artery?", "lateral", "anterior", "medial", "posterior"),
 (9, 93, "The rotator cuff muscles attached to the greater tuberosity of the humerus include the following except", "supraspinatus", "infraspinatus", "teres minor", "subscapularis"),
 (9, 94, "Considering the vessels of the upper limb:", "the cephalic vein is the medial continuation of the dorsal venous plexus of the hand.", "the basilic vein unites with the venae commitantes of brachial artery to form basilic vein.", "the brachial artery divides into radial and ulnar arteries at the apex of the cubital fossa.", "the ulnar artery is the smaller division of the brachial artery."),
 (9, 95, "Longitudinal growth in a growing bone passes through which of the following?", "metaphysic", "diaphysis", "epiphyseal plate", "epiphyseal line"),
 (9, 96, "Which of the following bones is a sesamoid bone?", "pisiform", "scaphoid", "triquetral", "hamate"),
 (9, 97, "In what joint is the root of the tooth attached to a peridontal ligament and held into a tooth socket?", "gomphosis", "suture", "syndesmosis", "serrate suture"),
 (9, 98, "Which is an example of hyaline cartilage?", "intervertebral discs", "symphysis pubis", "epiphyses", "auricle of the ear"),
 (9, 99, "An example of a secondary cartilaginous joint is:", "shoulder joint", "intervertebral disc", "inferior tibiofibular joint", "lambdoid suture (head)."),
 (9, 100, "Regarding the deep fascia", "it is present in the face", "it forms the retinaculae", "it contains blood vessels and nerves", "it is loosely attached to the skin"),

 (10, 101, "Which of the following terms describes a muscle that assists the prime mover in performing its action?", "agonist", "antagonist", "synergist", "fixator"),
 (10, 102, "Which of the following bones is classified as a flat bone?", "scapula", "femur", "carpals", "patella"),
 (10, 103, "Which of the following bones forms part of the axial skeleton?", "clavicle", "ulna", "sternum", "scapula"),
 (10, 104, "A plane which separates the body into an anterior and posterior part is called a:", "median plane", "sagittal plane", "horizontal plane", "coronal plane"),
 (10, 105, "What does the term \"superior\" indicate in this description?", "closer to the midline", "farther from the body surface", "closer to the head", "farther from the point of origin."),
 (10, 106, "Which of the following vessels is part of the systemic circulation?", "Pulmonary veins", "Pulmonary artery", "Aorta", "Coronary arteries"),
 (10, 107, "Which chamber of the heart pumps deoxygenated blood to the lungs?", "right atrium", "left atrium", "right ventricle", "Left ventricle"),
 (10, 108, "Which of the following does NOT take place during fertilization?", "Cleavage initiated", "Endometrial implantation occurs.", "Restoration of a diploid genome", "Determination of genetic sex of the embryo"),
 (10, 109, "Which structure bounds cells after fertilization as they compact to form the morula?", "Zona pellucida", "Corona radiate", "Pronucleus", "Inner cell mass"),
 (10, 110, "cells of the embryoblast form the hypoblast and epiblast, which begin to form:", "Chorionic cavity", "Antrum", "Blasoceole", "Amniotic cavity"),
 (10, 111, "On day nine, trophoblastic lacunae and maternal sinusoids begin to form around what cells:", "Syncytiotrophoblast", "Extraembryonic coelom", "Extraembryonic splanchnopleuric", "Exocoelomic"),
 (10, 112, "Notochord is developed from", "The epiblast cells at the primitive streak", "The hypoblast cells", "Intraembryonic mesoderm", "Epiblast cells at the wall of primitive pit"),

 (11, 113, "Placenta previa", "Is the implantation of blastocyst in the lower segment of uterine cavity?", "Is the implantation of blastocyst in the uterine tube?", "Is the implantation of blastocyst at the surface of ovary?", "Is the implantation of blastocyst in the pelvic cavity?"),
 (11, 114, "Regarding sclerotome of somite:", "It is dorsolateral part of the somite", "It forms vertebral column", "It forms skeletal muscles behind vertebral column", "It forms three meninges around spinal cord"),
 (11, 115, "After folding, the most cranial structure in the head fold is", "Buccopharyngeal membrane", "Cloacal membrane", "Septum transversum", "Pericardium"),
 (11, 116, "The finger-like projections of cytotrophoblast into syncytiotrophoblast are called:", "Somatic villi", "Splanchnic villi", "Primary chorionic villi", "Secondary chorionic villi"),
 (11, 117, "Which of the following is responsible for bladder development?", "Allantois", "Yolk sac", "Amniotic fluid", "Primordial gut"),
 (11, 118, "Abnormally long umbilical cord may lead to", "Formation of false knots.", "Early separation of placenta during delivery.", "Strangulation of the baby during delivery.", "Adhesion between fetus with wall of uterus"),
 (11, 119, "Yolk sac shares in the formation of", "Forebrain, midbrain and hind brain", "Kidneys", "Foregut, midgut and hindgut", "Spleen"),
 (11, 120, "Regarding monozygotic twin", "Is the commonest type", "Twins are always of same sex", "Are non-identical in shape", "Are developed by fertilization of two ova"),
]


def main():
    rows = [{
        "sourceId": SOURCE_ID, "file": FILE, "satOn": COVER["satOn"],
        "page": page, "number": number, "stem": stem,
        "options": {"a": a, "b": b, "c": c, "d": d},
        # Read from the image, so every option is present and the stem is the
        # examiner's. No answer: the marks on this script are a candidate's
        # working, not a key.
        "answer": None, "answerConfidence": "none",
        "confidence": "high", "readBy": "image",
    } for page, number, stem, a, b, c, d in Q]

    missing = sorted(set(range(1, 121)) - {row["number"] for row in rows})
    json.dump({"cover": COVER, "readBy": "page images at 150 dpi, transcribed by eye",
               "count": len(rows), "missingNumbers": missing, "questions": rows},
              open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} of {COVER['statedQuestions']} questions -> {OUT}")
    if missing:
        print(f"  missing numbers: {missing}")


if __name__ == "__main__":
    main()
