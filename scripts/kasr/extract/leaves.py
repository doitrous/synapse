"""Keyword rules mapping a question stem onto a leaf of the 101 ISK subject tree
(docs/Kasr-Source-Imports/academic/101-isk-structure.md). Approximate by design:
a stem is scored against every leaf and assigned the best-scoring one.
"""
TREE = [
 ("Anatomy","Basis of Anatomy","Introduction",["anatomical position","anatomical term","median plane","sagittal","coronal","transverse plane","proximal","distal","supine","prone","anterior surface","planes of the body"]),
 ("Anatomy","Basis of Anatomy","Fascia",["fascia","fasciae","superficial fascia","deep fascia","retinaculum"]),
 ("Anatomy","Basis of Anatomy","Skeletal system",["bone","bones","ossification","cartilage","skeleton","periosteum","epiphys","diaphys","medullary cavity"]),
 ("Anatomy","Basis of Anatomy","Articular system",["synovial joint","fibrous joint","cartilaginous joint","symphysis","suture","joint capsule","types of joints"]),
 ("Anatomy","Basis of Anatomy","Muscular system",["skeletal muscle","smooth muscle","cardiac muscle","tendon","aponeurosis","muscle fibre","muscle fiber","origin and insertion"]),
 ("Anatomy","Basis of Anatomy","Cardiovascular system",["artery","arteries","capillary","circulation","heart","anastomosis","end artery"]),
 ("Anatomy","Basis of Anatomy","Lymphatic system",["lymph","lymphatic","lymph node","spleen","thymus","tonsil"]),
 ("Anatomy","Basis of Anatomy","Nervous system",["neuron","central nervous","spinal cord","ganglion","autonomic","sympathetic","parasympathetic","dermatome"]),
 ("Anatomy","General Embryology","Gametes",["gamete","spermatogenesis","oogenesis","spermatozoon","sperm","oocyte","ovum","meiosis","polar body"]),
 ("Anatomy","General Embryology","First Week of Development",["fertilization","fertilisation","cleavage","morula","blastocyst","zygote","zona pellucida"]),
 ("Anatomy","General Embryology","Second Week of Development",["bilaminar","epiblast","hypoblast","amniotic cavity","syncytiotrophoblast","cytotrophoblast","implantation","second week"]),
 ("Anatomy","General Embryology","Third Week of Development",["gastrulation","primitive streak","trilaminar","notochord","neural tube","neurulation","somite formation","third week","intraembryonic mesoderm"]),
 ("Anatomy","General Embryology","Embryonic Period",["organogenesis","pharyngeal arch","branchial arch","embryonic period","fourth week","somites","limb bud"]),
 ("Anatomy","General Embryology","Fetal Period",["fetal period","foetal period","fetus","foetus","crown rump"]),
 ("Anatomy","General Embryology","Fetal Membranes",["placenta","amnion","amniotic fluid","chorion","umbilical cord","yolk sac","allantois","decidua","twin"]),
 ("Anatomy","Upper Limb","Pectoral Region",["pectoralis","pectoral region","clavipectoral","breast","mammary","suspensory ligament of axilla","nipple"]),
 ("Anatomy","Upper Limb","Shoulder Region",["shoulder joint","deltoid","rotator cuff","supraspinatus","infraspinatus","teres minor","subscapularis","glenoid","acromion","quadrangular space"]),
 ("Anatomy","Upper Limb","Muscles of the Back",["trapezius","latissimus dorsi","rhomboid","levator scapulae","serratus posterior","muscles of the back"]),
 ("Anatomy","Upper Limb","Axilla",["axilla","axillary artery","axillary vein","axillary sheath","brachial plexus","axillary lymph","apex of axilla","walls of the axilla"]),
 ("Anatomy","Upper Limb","Arm",["biceps","triceps","brachialis","coracobrachialis","spiral groove","brachial artery","profunda brachii","front of the arm","back of the arm"]),
 ("Anatomy","Upper Limb","Forearm",["forearm","pronator","supinator","flexor carpi","extensor carpi","flexor digitorum","extensor digitorum","radial artery","ulnar artery","cubital fossa","interosseous","brachioradialis"]),
 ("Anatomy","Upper Limb","Hand",["hand","palmar arch","thenar","hypothenar","lumbrical","interossei","carpal bone","metacarpal","snuffbox","palmar aponeurosis","carpal tunnel","fingers"]),
 ("Anatomy","Upper Limb","Joints of Upper Limb",["elbow joint","wrist joint","sternoclavicular","acromioclavicular","radioulnar joint","interphalangeal joint","metacarpophalangeal"]),
 ("Anatomy","Upper Limb","Nerve Supply of Upper Limb & Nerve Injuries",["median nerve","ulnar nerve","radial nerve","musculocutaneous","axillary nerve","erb","klumpke","claw hand","wrist drop","ape hand","nerve injury","palsy","long thoracic nerve","thoracodorsal","nerve lesion","winging"]),
 ("Anatomy","Upper Limb","Veins of the Upper Limb",["cephalic vein","basilic vein","median cubital","venous drainage of the upper limb"]),
 ("Histology","Introduction","Microscopes",["microscope","magnification","resolution","resolving power","objective lens","electron microscope"]),
 ("Histology","Introduction","Microtechniques",["fixation","fixative","embedding","microtome","paraffin","staining","stain","haematoxylin","hematoxylin","eosin","pas reaction","frozen section","freezing technique","dehydration"]),
 ("Histology","Cytology","The cell",["cell membrane","plasmalemma","plasma membrane","glycocalyx","unit membrane","fluid mosaic","cell coat"]),
 ("Histology","Cytology","Cytoplasm",["mitochondri","ribosome","endoplasmic reticulum","golgi","lysosome","peroxisome","centriole","cytoskeleton","microtubule","microfilament","inclusion","organelle","phagosome","pinocytosis","endocytosis"]),
 ("Histology","Cytology","Nucleus",["nucleus","nucleolus","chromatin","nuclear envelope","chromosome","nuclear pore","karyo","heterochromatin","euchromatin"]),
 ("Histology","Blood","Red Blood Corpuscles",["erythrocyte","red blood","rbcs","rbc","haemoglobin","hemoglobin","rouleaux","reticulocyte","spherocytosis","anemia","anaemia"]),
 ("Histology","Blood","Blood Platelets",["platelet","thrombocyte","hyalomere","granulomere","megakaryocyte"]),
 ("Histology","Blood","Granular leukocytes",["neutrophil","eosinophil","basophil","granulocyte","granular leucocyte","granular leukocyte","specific granule","azurophilic"]),
 ("Histology","Blood","Non granular leukocytes",["lymphocyte","monocyte","agranulocyte","non granular","macrophage in blood"]),
 ("Histology","Blood","Haemopoiesis",["haemopoiesis","hemopoiesis","erythropoiesis","granulopoiesis","bone marrow","myeloblast","promyelocyte","normoblast","stem cell","haemocytoblast"]),
 ("Histology","Connective Tissue","Connective Tissue Cells",["fibroblast","macrophage","mast cell","plasma cell","adipocyte","fat cell","histiocyte","pericyte","mesenchymal cell"]),
 ("Histology","Connective Tissue","Connective Tissue Fibres",["collagen","elastic fibre","elastic fiber","reticular fibre","reticular fiber","collagenous"]),
 ("Histology","Connective Tissue","Types of Connective Tissue Proper",["areolar","adipose","dense connective","loose connective","mucoid tissue","reticular tissue","connective tissue proper"]),
 ("Histology","Epithelial Tissues","Surface Epithelium",["simple squamous","stratified squamous","columnar epithelium","cuboidal epithelium","transitional epithelium","pseudostratified","surface epithelium","keratinized"]),
 ("Histology","Epithelial Tissues","Glandular Epithelium",["gland","exocrine","endocrine","acinus","acini","merocrine","holocrine","apocrine","serous","mucous cell","secretory unit","duct"]),
 ("Histology","Epithelial Tissues","Neuro Epithelium",["neuroepithelium","neuro epithelium","taste bud","olfactory","sensory epithelium"]),
 ("Histology","Epithelial Tissues","Myo Epithelium",["myoepithelial","myoepithelium","myo epithelium"]),
 ("Histology","Epithelial Tissues","Polarity and Membranous Specializations",["microvilli","stereocilia","cilia","desmosome","tight junction","junctional complex","basement membrane","brush border","terminal bar","hemidesmosome","gap junction","zonula","basal lamina","polarity"]),
]

def classify(text):
    low = text.lower()
    best, score = None, 0
    for subj, chap, leaf, keys in TREE:
        s = sum(1 for k in keys if k in low)
        if s > score:
            best, score = (subj, chap, leaf), s
    return best if best else (None, None, None)
