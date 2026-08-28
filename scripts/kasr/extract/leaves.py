"""Keyword rules mapping a question stem onto a leaf of a module's subject tree.

Approximate by design: a stem is scored against every leaf and assigned the
best-scoring one.

The table is per-module, selected exactly the way `mcq.py`'s MODULE_CATEGORIES
is, because a module's leaves are its own. 101 ISK's tree is upper limb,
cytology, blood and epithelium; 104 CPS's is thorax, the cardiovascular,
lymphatic, respiratory and cytogenetics chapters of histology, and the
physiology chapters. Scoring 104's stems against 101's vocabulary would file a
cardiac-cycle question under "Cardiovascular system" of *Basis of Anatomy* and
report the rest as unmapped -- a coverage table that looks like a gap in the
corpus when it is a gap in the table.

`TREE` stays bound to 101 ISK at import time so every existing caller keeps the
tree it already had; `use(module)` or `classify(text, module=...)` selects
another. A leaf is `(subject, chapter, leaf, keywords)`; `leaf` is None where
the book's own structure has only two levels, which is how 104's Anatomy is
printed (docs/Kasr-Source-Imports/academic/104-cps-structure.md).
"""
TREE_101 = [
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

# Module 104 CPS. Taken from docs/Kasr-Source-Imports/academic/104-cps-structure.md,
# which reproduces the three department books' own chapter headings. Anatomy prints
# no sub-chapters, so its leaves are None rather than a repeat of the chapter name.
TREE_104 = [
 ("Anatomy","Thoracic Cage",None,["thoracic cage","typical rib","atypical rib","costal cartilage","sternum","manubrium","xiphoid","costal groove","rib","ribs","sternal angle","thoracic inlet","thoracic outlet"]),
 ("Anatomy","Intercostal Spaces",None,["intercostal space","external intercostal","internal intercostal","innermost intercostal","intercostal nerve","intercostal artery","intercostal vein","subcostal nerve","anterior intercostal membrane","posterior intercostal membrane","transversus thoracis"]),
 ("Anatomy","Thoracic Cavity",None,["thoracic cavity","pleura","pleural cavity","pleural recess","costodiaphragmatic","pneumothorax","haemothorax","pyothorax","pleural effusion","parietal pleura","visceral pleura","endothoracic fascia","suprapleural membrane"]),
 ("Anatomy","Lungs",None,["lung","lungs","bronchopulmonary segment","hilum of the lung","oblique fissure","horizontal fissure","lingula","bronchial tree","segmental bronchus","apex of the lung","root of the lung"]),
 ("Anatomy","The Diaphragm",None,["diaphragm","crus of the diaphragm","phrenic nerve","central tendon","oesophageal hiatus","aortic opening","caval opening","diaphragmatic hernia"]),
 ("Anatomy","Mediastinum",None,["mediastinum","superior mediastinum","anterior mediastinum","middle mediastinum","posterior mediastinum","thymus"]),
 ("Anatomy","Pericardium",None,["pericardium","pericardial","fibrous pericardium","serous pericardium","transverse sinus","oblique sinus","pericardial effusion","cardiac tamponade"]),
 ("Anatomy","Heart",None,["right atrium","left atrium","right ventricle","left ventricle","interventricular septum","coronary artery","coronary sinus","cardiac vein","sinuatrial node","sino-atrial node","atrioventricular node","bundle of his","purkinje","chordae tendineae","papillary muscle","crista terminalis","fossa ovalis","apex beat","surfaces of the heart","conducting system of the heart"]),
 ("Anatomy","Large Arteries of the Thorax",None,["arch of the aorta","ascending aorta","descending thoracic aorta","pulmonary trunk","brachiocephalic artery","subclavian artery","internal thoracic artery","ligamentum arteriosum","coarctation"]),
 ("Anatomy","Large Veins of the Thorax",None,["superior vena cava","inferior vena cava","brachiocephalic vein","azygos","hemiazygos","superior intercostal vein","s.v.c","svc obstruction","pulmonary vein"]),
 ("Anatomy","Large Nerves of the Thorax",None,["vagus nerve","recurrent laryngeal","phrenic","sympathetic trunk","splanchnic nerve","thoracic sympathetic","cardiac plexus","pulmonary plexus"]),
 ("Anatomy","Large Tubes of the Thorax",None,["trachea","tracheal","oesophagus","esophagus","main bronchus","carina","oesophageal constriction"]),
 ("Anatomy","Lymphatics of the Thorax",None,["thoracic duct","cisterna chyli","right lymphatic duct","tracheobronchial lymph node","mediastinal lymph node","lymphatic drainage of the thorax"]),
 ("Anatomy","Development of the Respiratory System",None,["laryngotracheal","respiratory diverticulum","lung bud","tracheo-oesophageal fistula","development of the lung","pseudoglandular","canalicular stage","alveolar stage","surfactant development"]),
 ("Anatomy","Development of the Heart",None,["heart tube","bulbus cordis","truncus arteriosus","sinus venosus","septum primum","septum secundum","endocardial cushion","aortic arches","fallot","atrial septal defect","ventricular septal defect","patent ductus","transposition of the great","development of the heart","vitelline artery","dorsal aorta"]),

 ("Histology","Cardiovascular System","The heart",["endocardium","myocardium","epicardium","cardiac muscle fibre","cardiac muscle fiber","intercalated disc","purkinje fibre","purkinje fiber","cardiac skeleton","heart valve histology"]),
 ("Histology","Cardiovascular System","Arteries",["tunica intima","tunica media","tunica adventitia","internal elastic lamina","external elastic lamina","elastic artery","muscular artery","arteriole","aorta wall","vasa vasorum","metarteriole","basilar artery","coronary artery histology","hypertension develops"]),
 ("Histology","Cardiovascular System","Veins",["vein","veins","venule","venous sinusoid","valves of veins","medium sized vein","large vein"]),
 ("Histology","Cardiovascular System","A-V Connections",["capillary","capillaries","continuous capillary","fenestrated capillary","sinusoidal capillary","blood sinusoid","pericyte","arterio-venous anastomos","precapillary sphincter","glomus"]),
 ("Histology","Lymphatic and Macrophage System","Lymph node",["lymph node","subcapsular sinus","medullary cord","paracortex","afferent lymphatic","efferent lymphatic","littoral cell","post capillary venule","post-capillary venule","high endothelial venule","germinal centre","lymphatic follicle","lymphatic nodule"]),
 ("Histology","Lymphatic and Macrophage System","Spleen",["spleen","splenic","white pulp","red pulp","billroth","malpighian corpuscle","splenic sinusoid","stave cell","periarteriolar lymphatic sheath","central arteriole","marginal zone","splenic trabecula"]),
 ("Histology","Lymphatic and Macrophage System","Tonsils",["tonsil","palatine tonsil","pharyngeal tonsil","lingual tonsil","tonsillar crypt","tonsillitis","tonsillectomy"]),
 ("Histology","Lymphatic and Macrophage System","Thymus",["thymus","thymic","hassall","reticular epithelial cell","blood thymic barrier","thymulin","thymopoietin","thymopietin","thymic selection","thymic education","thymocyte","involution of the thymus"]),
 ("Histology","Lymphatic and Macrophage System","Macrophage system",["mononuclear phagocytic","macrophage system","phagocytic system","kupffer","histiocyte","microglia","osteoclast"]),
 ("Histology","Respiratory System","Conducting Portion",["nasal cavity","olfactory mucosa","larynx","vocal cord","trachea histology","bronchus histology","bronchiole","terminal bronchiole","clara cell","goblet cell","respiratory epithelium","pseudostratified ciliated","conducting portion","sustentacular cell"]),
 ("Histology","Respiratory System","Respiratory Portion",["alveolus","alveoli","alveolar duct","alveolar sac","respiratory bronchiole","interalveolar septum","interalveolar septa","type i pneumocyte","type ii pneumocyte","type | pneumocyte","blood air barrier","surfactant","alveolar pore"]),
 ("Histology","Respiratory System","Alveolar Phagocytes",["alveolar macrophage","alveolar phagocyte","dust cell","heart failure cell"]),
 ("Histology","Cytogenetics","The Cell Cycle",["cell cycle","interphase","g1 phase","g2 phase","s phase","restriction point","cyclin","checkpoint"]),
 ("Histology","Cytogenetics","Cell Division",["mitosis","meiosis","prophase","metaphase","anaphase","telophase","cytokinesis","spindle","crossing over","chiasma","synaptonemal","cell division"]),
 ("Histology","Cytogenetics","Human Chromosome",["chromosome","karyotype","centromere","telomere","chromatid","metacentric","acrocentric","submetacentric","barr body","banding","autosome","sex chromosome","idiogram"]),
 ("Histology","Cytogenetics","Chromosomal Aberrations (Abnormalities)",["trisomy","monosomy","down syndrome","turner","klinefelter","edward","patau","translocation","deletion","nondisjunction","non-disjunction","mosaicism","aneuploidy","polyploidy","chromosomal aberration","chromosomal abnormalit"]),

 ("Physiology","Cardiovascular System","Electrical Activity of the Heart",["action potential","pacemaker","funny channel","sino-atrial node","sinoatrial node","rhythmicity","depolarization","repolarization","refractory period","ecg","electrocardiogram","p wave","qrs","conductivity","excitability","all or none","syncytium","intercalated disc","phase 4"]),
 ("Physiology","Cardiovascular System","Mechanical Properties of Cardiac Muscle",["excitation contraction coupling","inotropic","starling","preload","afterload","contractility","sarcomere","velocity of shortening","serca","calcium influx","cardiac muscle fiber","cardiac muscle fibers"]),
 ("Physiology","Cardiovascular System","Cardiac Function",["cardiac output","stroke volume","cardiac cycle","ejection fraction","end diastolic volume","end systolic volume","isovolumetric","dicrotic notch","heart sound","murmur","cardiac reserve","pressure volume loop","atrial systole","reduced filling","venous return"]),
 ("Physiology","Cardiovascular System","Vascular Function",["blood pressure","arterial pressure","peripheral resistance","poiseuille","laminar flow","turbulent flow","viscosity","compliance of vessels","pulse pressure","mean arterial pressure","capillary exchange","starling forces","oedema","edema"]),
 ("Physiology","Cardiovascular System","Basic Mechanisms of Circulatory Control",["baroreceptor","chemoreceptor","vasomotor centre","vasomotor center","bainbridge","renin angiotensin","vasoconstrictor","vasodilator","autoregulation","sympathetic tone","circulatory shock","haemorrhage","hemorrhage"]),
 ("Physiology","Cardiovascular System","Special Circulation",["coronary circulation","cerebral circulation","cutaneous circulation","splanchnic circulation","pulmonary circulation","skeletal muscle blood flow","special circulation","fetal circulation"]),
 ("Physiology","Respiratory System","Organization of the Respiratory System",["dead space","conducting zone","respiratory zone","organization of the respiratory","pleural pressure","intrapleural pressure","muscles of respiration","respiratory system organization"]),
 ("Physiology","Respiratory System","Pulmonary Compliance",["compliance","surfactant","surface tension","elastic recoil","lung volumes","tidal volume","vital capacity","residual volume","functional residual capacity","spirometry","fev1","airway resistance","work of breathing","atelectasis"]),
 ("Physiology","Respiratory System","Gas exchange in the lung",["diffusion capacity","alveolar ventilation","ventilation perfusion","v/q","partial pressure of oxygen","alveolar gas","gas exchange","respiratory membrane","shunt"]),
 ("Physiology","Respiratory System","Gas Transport by the Blood",["oxygen dissociation curve","haemoglobin saturation","hemoglobin saturation","bohr effect","haldane","carbaminohaemoglobin","carbaminohemoglobin","bicarbonate","chloride shift","carbon dioxide transport","oxygen transport","cyanosis","hypoxia","carbon monoxide"]),
 ("Physiology","Respiratory System","Control of Respiration",["respiratory centre","respiratory center","pneumotaxic","apneustic","hering breuer","hering-breuer","central chemoreceptor","peripheral chemoreceptor","control of respiration","periodic breathing","cheyne stokes","hypercapnia","apnoea","apnea"]),
]

TREES = {"101 ISK": TREE_101, "104 CPS": TREE_104}
DEFAULT_MODULE = "101 ISK"

# Bound at import so every caller that predates `--module` keeps 101's tree.
TREE = TREE_101


def use(module):
    """Point the module-level `TREE` at `module`'s leaves and return it."""
    global TREE
    TREE = TREES.get(module, TREE_101)
    return TREE


def tree_for(module):
    return TREES.get(module, TREE_101)


def classify(text, module=None):
    low = text.lower()
    best, score = None, 0
    for subj, chap, leaf, keys in (tree_for(module) if module else TREE):
        s = sum(1 for k in keys if k in low)
        if s > score:
            best, score = (subj, chap, leaf), s
    return best if best else (None, None, None)
