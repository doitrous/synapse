/**
 * `101 ISK > Anatomy > Upper Limb > Pectoral Region` — the question books' MCQs.
 *
 * Thirty-four rows and about sixteen distinct questions, and the leaf is not
 * purely anatomical: four rows are histology that the books file here because
 * the specimen is a breast — brown fat, the compound alveolar gland, the
 * unicellular gland, and a breast biopsy showing dense irregular white fibrous
 * tissue. Those four take the histology concepts that already exist rather
 * than anatomical ones, which is why this leaf emits questions under `fnd` as
 * well as `msk`. A concept keeps its own subject and its own curriculum path;
 * only the ones minted for the pectoral region itself are `msk`.
 *
 * Six concepts are reused verbatim rather than minted:
 * `pectoralis-major-attachment-action-nerve`,
 * `long-thoracic-nerve-serratus-anterior-winging` and
 * `scapular-rotation-abduction-beyond-90-muscles` from the sat papers, and
 * `white-versus-brown-adipose-connective-tissue`,
 * `goblet-cell-the-unicellular-exocrine-gland` and
 * `exocrine-gland-classification-by-duct-branching-and-secretory-shape` from
 * the histology leaves of this same bank.
 *
 * Four keys are minted here that the neighbouring leaves should reuse rather
 * than re-mint: `axilla-four-walls-and-the-axillary-folds`,
 * `breast-extent-bed-and-nipple-position` and
 * `axillary-artery-parts-relations-and-branches` are all used again by the
 * Axilla leaf, and `dense-white-fibrous-ct-regular-versus-irregular` belongs
 * by rights to Connective Tissue Fibres, which no lane has authored yet.
 * `shoulder-rotators-medial-and-lateral` is likewise offered to the Shoulder
 * Region lane.
 *
 * `axillary-artery-parts-relations-and-branches` deliberately covers the whole
 * artery rather than only the superior thoracic branch the questions here ask
 * about. "Which branch comes from which part" is one objective, and the Axilla
 * leaf asks it eight more times; two concepts for it would split a student's
 * mastery between the two leaves.
 *
 * Fifteen answers are overridden — eleven where the books printed no key, four
 * against a key that is wrong. One item is kept with a caveat rather than an
 * override: the superior thoracic artery question, where the examiner's answer
 * is loose and none of the four options is strictly true as printed. That is
 * flagged in the option explanations and on the concept as a conflict, because
 * it is a wording problem a rescan cannot fix.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Pectoral Region',
  modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
  articleId: 'ART-101-ANA-PECTORALIS-MAJOR',

  concepts: [
    {
      key: 'pectoralis-major-attachment-action-nerve',
      label: 'Pectoralis major adducts and medially rotates the arm, supplied by both pectoral nerves',
      definition: 'Pectoralis major arises by a clavicular head from the medial half of the clavicle and a sternocostal head from the sternum and upper six costal cartilages, and inserts into the lateral lip of the bicipital groove. It adducts and medially rotates the arm; the clavicular head flexes the arm and the sternocostal head extends it from flexion. It is supplied by the lateral and medial pectoral nerves.',
      objective: 'Give the attachments, actions and nerve supply of pectoralis major, including the different action of each head.',
      pitfall: 'Giving one action for the whole muscle. The two heads oppose each other in flexion and extension, which is why the question asks for both.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
      type: 'structural_description',
    },
    {
      key: 'clavipectoral-fascia-and-the-axillary-septum',
      label: 'The clavipectoral fascia with subclavius, pectoralis minor and the suspensory ligament forms the axillary septum, and four structures pierce it',
      definition: 'The clavipectoral fascia is a strong sheet lying deep to pectoralis major. Above it splits to enclose subclavius and gains attachment to the clavicle; in the middle it splits to enclose pectoralis minor; below the muscle it continues as the suspensory ligament of the axilla to the axillary fascia, which it holds up to make the hollow of the armpit. Subclavius, the clavipectoral fascia, pectoralis minor and the suspensory ligament together form the deep layer of the anterior wall of the axilla, called the axillary septum. Four structures pierce the fascia: the cephalic vein and the lymphatics from the breast passing inwards, and the thoraco-acromial artery and the lateral pectoral nerve passing outwards.',
      objective: 'Name the four components of the axillary septum and the four structures that pierce the clavipectoral fascia.',
      pitfall: 'Counting the axillary sheath as part of the septum. The sheath is a downward prolongation of the prevertebral fascia of the neck wrapped round the axillary vessels and the plexus; it lies within the axilla rather than forming a wall of it.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
      type: 'structural_description',
    },
    {
      key: 'axilla-four-walls-and-the-axillary-folds',
      label: 'The axilla has four walls, and the two folds a hand can grip are the lower borders of the anterior and posterior ones',
      definition: 'The axilla is a pyramidal space with four walls. The anterior wall is pectoralis major with, deep to it, subclavius, the clavipectoral fascia and pectoralis minor. The posterior wall is subscapularis on the front of the scapula with teres major and latissimus dorsi below it. The medial wall is the upper four or five ribs with their intercostal muscles, covered by the upper digitations of serratus anterior. The lateral wall is the narrow bicipital groove of the humerus with coracobrachialis and the short head of biceps. The anterior fold of the axilla is the lower border of pectoralis major alone; the posterior fold is the lower borders of teres major and latissimus dorsi together.',
      objective: 'Name the muscles forming each of the four walls of the axilla and say which muscles make each axillary fold.',
      pitfall: 'Putting pectoralis minor into the anterior fold. The fold is what a hand can pinch at the front of the armpit, and pectoralis minor ends on the coracoid process well above it — only pectoralis major reaches down that far.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
      type: 'structural_description',
    },
    {
      key: 'breast-extent-bed-and-nipple-position',
      label: 'The breast lies from the second to the sixth rib on a bed of pectoralis major, serratus anterior and external oblique',
      definition: 'The breast lies in the superficial fascia of the front of the chest, extending vertically from the second to the sixth rib and horizontally from the lateral border of the sternum to the mid-axillary line, with an axillary tail piercing the deep fascia to enter the axilla. Its bed is formed by pectoralis major over the medial two thirds and by serratus anterior and the aponeurosis of external oblique laterally and below, separated from the muscles by the retromammary space of loose areolar tissue. The nipple lies at the level of the fourth intercostal space in the male and the nulliparous female, and is surrounded by the pigmented areola.',
      objective: 'Give the vertical and horizontal extent of the breast, the muscles forming its bed, and the level of the nipple.',
      pitfall: 'Putting the nipple in the sixth space because the breast reaches the sixth rib. The gland extends further down than its nipple; the nipple sits at the fourth space, and that level is what the clinical examination uses.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-GYN-T06-S01-M01'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
      type: 'structural_description',
    },
    {
      key: 'shoulder-rotators-medial-and-lateral',
      label: 'Only two muscles laterally rotate the arm, and everything large and anterior rotates it medially',
      definition: 'Lateral rotation of the arm at the shoulder is produced by infraspinatus, the principal lateral rotator, with teres minor, assisted by the posterior fibres of deltoid. Medial rotation is produced by subscapularis, pectoralis major, latissimus dorsi and teres major, assisted by the anterior fibres of deltoid. The medial rotators are far the more numerous and the more powerful, which is why the arm rests in slight medial rotation and why a dislocated or a stiff shoulder loses lateral rotation first.',
      objective: 'Name the lateral rotators of the arm and the medial rotators, and say which set is the stronger.',
      pitfall: 'Reading teres major as a lateral rotator because teres minor is one. The two lie side by side and differ in almost everything that matters: teres minor is a rotator cuff muscle supplied by the axillary nerve and rotates laterally, teres major is not part of the cuff, takes the lower subscapular nerve, and rotates medially.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
      type: 'functional_relationship',
    },
    {
      key: 'axillary-artery-parts-relations-and-branches',
      label: 'Pectoralis minor divides the axillary artery into three parts, and each part gives its own branches',
      definition: 'The axillary artery is the continuation of the subclavian artery from the outer border of the first rib to the lower border of teres major, where it becomes the brachial artery. Pectoralis minor divides it into three parts: the first above the muscle, the second behind it and the third below it. The first part gives one branch, the superior (highest) thoracic artery, a small vessel running downwards and medially behind pectoralis minor and in front of serratus anterior to the first two intercostal spaces. The second part gives the thoraco-acromial artery, which pierces the clavipectoral fascia, and the lateral thoracic artery, which runs along the lower border of pectoralis minor and supplies the breast. The third part gives the subscapular artery — the largest branch of all, which gives the circumflex scapular artery and continues as the thoracodorsal — with the anterior and posterior circumflex humeral arteries. The axillary vein lies medial to the artery throughout; the cords of the plexus are named for their position around the second part, and the third part is crossed in front by the medial root of the median nerve and has the ulnar nerve on its medial side.',
      objective: 'Give the extent of the axillary artery, the three parts pectoralis minor divides it into, the branches of each part, and the relation of each part to the vein and the plexus.',
      pitfall: 'Giving the superior thoracic artery the breast, or calling it the largest branch. The vessel that supplies the breast from the axilla is the lateral thoracic, from the second part, and the largest branch of all is the subscapular, from the third; the superior thoracic is the smallest and goes no lower than the second intercostal space.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T02-S01-M01'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
      type: 'structural_description',
      conflicts: [
        'The books ask "the superior thoracic artery … arises behind the pectoralis minor" and key it as correct. Strictly it is not: the artery arises from the first part of the axillary artery, which lies above the upper border of pectoralis minor, and only then passes behind the muscle. The option is the examiner\'s answer by elimination — the other three name the thoraco-acromial and the lateral thoracic — but the wording needs a faculty eye before students sit it.',
      ],
    },
    {
      key: 'long-thoracic-nerve-serratus-anterior-winging',
      label: 'Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula',
      definition: 'The long thoracic nerve (C5, C6, C7) runs on the surface of serratus anterior on the medial wall of the axilla, where it is exposed during axillary clearance. Serratus anterior rotates the scapula upward and holds its medial border against the chest wall, so its paralysis prevents abduction of the arm above the shoulder and lets the medial border stand off — a winged scapula.',
      objective: 'Explain why a mastectomy patient cannot abduct above the shoulder, and name the deformity that accompanies it.',
      pitfall: 'Blaming the axillary nerve. That would weaken abduction to ninety degrees and numb the regimental badge area; it is loss of scapular rotation above the shoulder, with winging, that names the long thoracic nerve.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
      type: 'clinical_correlation',
    },
    {
      key: 'scapular-rotation-abduction-beyond-90-muscles',
      label: 'Beyond ninety degrees the scapula rotates, by trapezius and serratus anterior',
      definition: 'Abduction of the arm beyond about ninety degrees cannot happen at the shoulder joint, because the greater tuberosity meets the coraco-acromial ligament; the arm is raised further by the scapula rotating on the chest wall so the glenoid cavity faces upwards. That rotation is produced by the upper and lower fibres of trapezius, supplied motor by the spinal root of the accessory nerve with sensory C3 and C4, acting with the lower five digitations of serratus anterior, supplied by the nerve to serratus anterior (long thoracic nerve, nerve of Bell). Serratus anterior is also the powerful protractor of the scapula and fixes it against the chest wall, so its paralysis wings the scapula.',
      objective: 'Name the muscles that rotate the scapula to carry abduction beyond ninety degrees, and give the nerve supply and action of each.',
      pitfall: 'Answering with deltoid and supraspinatus. Those carry abduction to ninety degrees; past it the question is about the shoulder girdle, and the answer is trapezius and serratus anterior.',
      subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
      modulePath: '101 ISK > Anatomy > Upper Limb > Shoulder Region',
      type: 'structure_function_relationship',
    },
    {
      key: 'white-versus-brown-adipose-connective-tissue',
      label: 'White adipose tissue is unilocular and stores fat; brown adipose tissue is multilocular and burns it for heat',
      definition: 'White adipose connective tissue is made of unilocular fat cells and is white because it is poorly vascularised and its droplets hold carotenoids; it is affected by diet and by hormones, lies under the skin and around organs, and stores fat. Brown adipose connective tissue is made of multilocular fat cells and is brown from its richer blood supply and the cytochrome pigments of its many mitochondria; it is affected by hormones but not by diet, is abundant in fetal life and in the newborn, is lost during childhood and replaced by white fat, and performs thermogenesis — burning fat to release heat through the thermogenin of its mitochondria.',
      objective: 'Contrast white and brown adipose tissue by fat cell type, colour, age distribution and function.',
      pitfall: 'Attributing thermogenesis to white fat because it insulates. Insulating against heat loss and generating heat are different jobs and belong to different tissues.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'dense-white-fibrous-ct-regular-versus-irregular',
      label: 'Dense white fibrous connective tissue is regular when its collagen bundles run one way and irregular when they run in every direction',
      definition: 'Dense white fibrous connective tissue is packed with collagen bundles and holds few cells and little ground substance. It is regular when the bundles are parallel and the pull is in one direction — tendons, ligaments and aponeuroses — and irregular when the bundles interweave in different planes to resist pull from any direction, as in the dermis of the skin, the capsules of organs, the periosteum and perichondrium, and the stroma that surrounds the lobules of the mammary gland. Both are dense; the direction of the bundles is what separates them, and it follows from the direction of the force.',
      objective: 'Tell dense regular from dense irregular white fibrous connective tissue on a section and name a site of each.',
      pitfall: 'Reading "densely packed collagen with few cells" as regular. That much is true of both; the word that decides it is whether the bundles run one way or many, and a capsule or a gland stroma is surrounded from all sides and so is irregular.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      label: '"Simple" and "compound" describe the duct, "branched" describes the secretory part, and "tubular" or "alveolar" describes its shape',
      definition: 'An exocrine gland consists of a secretory part and a duct, and each is classified separately. By branching of the duct a gland is simple, meaning its duct does not branch, or compound, meaning the duct branches like a tree with each branch carrying a secretory part; a simple gland whose secretory portion alone branches is called simple branched. By the shape of the secretory part a gland is tubular, when the secretory unit is a tube, alveolar or acinar, when it is rounded, or tubulo-alveolar, when it is flask-shaped. Every named gland carries one term from each list.',
      objective: 'Say which structure the word "simple", "compound", "branched", "tubular" or "alveolar" is describing in a gland\'s name.',
      pitfall: 'Taking "simple branched tubular" to mean a branching duct. Simple has already settled the duct — it does not branch — so the only thing left for "branched" to describe is the secretory part.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'classification',
    },
    {
      key: 'goblet-cell-the-unicellular-exocrine-gland',
      label: 'The goblet cell is a unicellular exocrine gland: one flask-shaped mucous-secreting cell sitting within a surface epithelium',
      definition: 'By number of cells an exocrine gland is unicellular, formed of a single cell, or multicellular. The goblet cell is the unicellular example: a single flask-shaped cell that secretes mucus onto a free surface, scattered within the pseudostratified columnar ciliated epithelium of the respiratory tract and within the simple columnar epithelium of the intestine. It is exocrine because its secretion reaches a surface, and it needs no duct because it already sits on one.',
      objective: 'Identify the goblet cell as a unicellular mucous exocrine gland and say where it is found.',
      pitfall: 'Calling it multicellular because it lives among many cells. The classification counts the cells that make the secretion, and there is exactly one.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Glandular Epithelium',
      type: 'structural_description',
    },
  ],

  questions: [
    {
      key: 'the-axillary-septum-doesn-t-includes-b4f7f2f0',
      conceptKey: 'clavipectoral-fascia-and-the-axillary-septum',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the four components of the axillary septum and separate them from the axillary sheath.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. The axillary septum is subclavius, the clavipectoral fascia, pectoralis minor and the suspensory ligament of the axilla — three of which are offered here. The axillary sheath is a prolongation of the prevertebral fascia of the neck around the vessels and plexus and forms no part of it.',
      explanations: {
        A: 'Part of the septum, so not the answer. The clavipectoral fascia splits to enclose pectoralis minor, and muscle and fascia together make the middle of the deep layer.',
        B: 'Part of the septum, so not the answer. Below pectoralis minor the fascia continues to the axillary fascia as the suspensory ligament, and it is that pull which makes the hollow of the armpit.',
        C: 'Not part of the septum, and the answer. The axillary sheath comes down from the neck as a prolongation of the prevertebral fascia, wrapped round the axillary vessels and the cords of the plexus. Students include it because everything else in the list is fascia in the axilla — but the sheath is a content of the space, not a wall of it.',
        D: 'Part of the septum, so not the answer. The fascia splits above to enclose subclavius and attach to the clavicle.',
      },
    },
    {
      key: 'brown-adipose-c-t-is-present-in-the-following-site-in-adults-070c511d',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the site where brown adipose tissue persists into adult life.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Brown fat is largely replaced by white fat during childhood, and the interscapular region is the classical site where a remnant persists in the adult; the other three sites hold white fat.',
      explanations: {
        A: 'The interscapular region between the shoulder blades is where brown adipose tissue is most abundant in the newborn and where a remnant survives into adult life, along with the root of the neck and around the great vessels.',
        B: 'The fat of the mammary gland is white, unilocular and stores energy. The option is tempting only because the question sits among breast material in these books.',
        C: 'The fat of the abdominal wall is white subcutaneous fat — the type that is affected by diet and that increases with age, which is the opposite of the brown fat this question asks about.',
        D: 'The mesentery holds white fat around the vessels of the gut. Nothing about a fat depot deep in the abdomen makes it thermogenic.',
      },
    },
    {
      key: 'the-following-muscle-can-abduct-the-arm-d4f8fe3c',
      conceptKey: 'scapular-rotation-abduction-beyond-90-muscles',
      difficulty: 'Easy', questionType: 'Movements',
      learningObjective: 'Identify the one muscle among four that abducts the arm rather than adducting it.',
      explanations: {
        A: 'Pectoralis major is a powerful adductor and medial rotator, and it lies in front of the joint. It cannot lift the arm away from the trunk.',
        B: 'Teres major adducts and medially rotates the arm with latissimus dorsi. Students choose it because it arises from the scapula and looks as if it should raise the humerus, but its line of pull is downwards.',
        C: 'The key. Supraspinatus runs from the supraspinous fossa over the top of the joint to the greater tuberosity, so it initiates abduction — the first fifteen degrees, before deltoid can act efficiently.',
        D: 'Latissimus dorsi is the strongest adductor of all; it is the muscle that pulls the raised arm back down against the trunk.',
      },
    },
    {
      key: 'winging-of-the-scapula-is-due-to-581a6470',
      conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Attribute a winged scapula to the muscle that normally holds the medial border against the chest wall.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. Serratus anterior holds the medial border of the scapula flat against the ribs, so it is the only one of the four whose paralysis lets the border lift away.',
      explanations: {
        A: 'Serratus anterior arises from the ribs and inserts along the costal surface of the medial border, pressing it against the chest wall; when the long thoracic nerve is lost the border stands off like a wing on pushing.',
        B: 'Pectoralis major is on the front of the chest and has no attachment to the scapula at all. Its loss changes the anterior axillary fold, not the position of the scapula.',
        C: 'Deltoid runs from the girdle to the humerus and moves the arm on the scapula, not the scapula on the chest. Its paralysis flattens the shoulder.',
        D: 'Teres major runs from the scapula to the humerus, so it pulls the arm towards the scapula and never the scapula towards the ribs.',
      },
    },
    {
      key: 'a-43-year-old-woman-presented-with-a-breast-mass-examination-d695c44c',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Read "densely packed collagen oriented in different directions with few cells" as dense irregular white fibrous connective tissue.',
      answerOverride: 'A',
      answerOverrideReason: 'The source printed no key. The stem gives the diagnostic wording of dense irregular white fibrous connective tissue — collagen bundles in different directions with few cells between — and describes the interlobular stroma of the breast, which surrounds each lobule from all sides.',
      explanations: {
        A: 'Bundles running in different directions with few cells between them is the definition of dense irregular white fibrous connective tissue, and it is what surrounds and separates the lobules of the mammary gland.',
        B: 'The half the stem rules out explicitly. Dense regular tissue also has densely packed collagen and few cells, but its bundles are parallel because they resist pull along one line — a tendon, a ligament or an aponeurosis, none of which surrounds a gland.',
        C: 'Yellow elastic tissue is dominated by branching elastic fibres, not collagen, and it stains and behaves quite differently. The stem names collagen.',
        D: 'Loose areolar tissue has abundant ground substance, many cells of every type and sparse fibres — the opposite of the description given. It does occur in the breast, in the retromammary space, but not as the tissue described here.',
      },
    },
    {
      key: 'a-53-year-old-lady-recovered-following-a-surgical-removing-o-fd886a3f',
      conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the nerve at risk on the medial wall of the axilla during breast surgery, from the deformity it leaves behind.',
      explanations: {
        A: 'The nerve to latissimus dorsi — the thoracodorsal — runs on the posterior wall of the axilla and is also at risk in this operation. Its injury costs extension and adduction of the arm and leaves the scapula lying flat, so it does not explain the sign.',
        B: 'The key. The long thoracic nerve runs on the surface of serratus anterior on the medial wall of the axilla, unprotected, and axillary clearance is the classic way it is divided.',
        C: 'The pectoral nerves lie on the anterior wall. Losing them weakens adduction of the arm and wastes the anterior axillary fold, with no effect on the scapula.',
        D: 'Same wall, same absence of any scapular sign. Pectoralis minor pulls the scapula forwards and downwards, so its paralysis does not lift the medial border away from the chest.',
      },
    },
    {
      key: 'choose-the-correct-answer-which-of-the-following-muscles-for-a451e9d6',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the single muscle whose lower border forms the anterior fold of the axilla.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. The anterior fold of the axilla is the lower border of pectoralis major and of nothing else; the other three muscles offered all end well above the level of the fold.',
      explanations: {
        A: 'Deltoid caps the shoulder above and lateral to the fold and inserts into the humerus halfway down the arm. It is on the wrong side of the armpit altogether.',
        B: 'The free lower border of pectoralis major, running to the lateral lip of the bicipital groove, is exactly what a hand grips at the front of the armpit.',
        C: 'Pectoralis minor is the commonest wrong answer here. It is part of the anterior wall, but it ends on the coracoid process well above the fold, so it is never palpable as one.',
        D: 'Subclavius lies under the clavicle at the very top of the anterior wall, further still from the fold.',
      },
    },
    {
      key: 'considering-the-nerve-supply-of-pectoralis-major-it-is-inner-b5b0d5da',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Easy', questionType: 'Nerve supply',
      learningObjective: 'State that pectoralis major takes both pectoral nerves, one to each head.',
      answerOverride: 'c',
      answerOverrideReason: 'The source printed no key. Pectoralis major is the standard example of a doubly innervated muscle: the lateral pectoral nerve supplies the clavicular head and the medial pectoral nerve, after passing through pectoralis minor, supplies the sternocostal head.',
      explanations: {
        a: 'Half the supply. The lateral pectoral nerve, from the lateral cord, reaches the clavicular head — but the sternocostal head has its own nerve.',
        b: 'The other half. The medial pectoral nerve, from the medial cord, pierces pectoralis minor and supplies the sternocostal head, and it also supplies pectoralis minor on its way.',
        c: 'Both pectoral nerves supply it, which is what makes pectoralis major the muscle the books ask about whenever they want double innervation.',
        d: 'There is no nerve of that name. It is invented by analogy with the nerve to serratus anterior and the nerve to subclavius, and the invented name is the giveaway.',
      },
    },
    {
      key: 'principal-muscle-concerned-in-lateral-rotation-of-the-should-5c4789c8',
      conceptKey: 'shoulder-rotators-medial-and-lateral',
      difficulty: 'Hard', questionType: 'Movements',
      learningObjective: 'Pick the lateral rotator of the arm from a list dominated by medial rotators.',
      answerOverride: 'D',
      answerOverrideReason: 'The bank carries B, but the anterior fibres of deltoid rotate the arm medially — it is the posterior fibres that rotate it laterally. Of the four offered, teres minor is the only lateral rotator; the principal lateral rotator overall, infraspinatus, is not among the options.',
      explanations: {
        A: 'Pectoralis major is one of the strong medial rotators, along with latissimus dorsi and subscapularis.',
        B: 'The answer the extractor read off this page, and the reason for the override. Deltoid does rotate — but its anterior fibres rotate medially, and only its posterior fibres rotate laterally, so the option names the wrong half of the muscle.',
        C: 'Teres major sits directly beside teres minor and rotates the arm the other way. It is not a rotator cuff muscle, it takes the lower subscapular nerve, and it is a medial rotator with latissimus dorsi.',
        D: 'As the options stand, teres minor is a rotator cuff muscle running to the lowest facet of the greater tuberosity and rotates the arm laterally. Strictly the principal lateral rotator is infraspinatus, which this item does not offer — so teres minor is the answer here by being the only lateral rotator on the list.',
      },
    },
    {
      key: 'regarding-pectoralis-major-mark-one-correct-statement-dep-bo-0219bfa1',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the insertion, nerve supply, wall of the axilla and action of pectoralis major, and reject the three false versions of each.',
      explanations: {
        A: 'The key. The tendon of pectoralis major is inserted into the lateral lip of the bicipital groove, in front of the tendon of latissimus dorsi, which takes the floor.',
        B: 'The wrong cord. The pectoral nerves come from the lateral and medial cords; the posterior cord supplies the extensors on the back of the limb and never reaches the front of the chest.',
        C: 'The wrong wall. Pectoralis major forms the anterior wall of the axilla; the medial wall is the ribs and intercostals covered by serratus anterior.',
        D: 'The wrong direction of rotation. Pectoralis major is a medial rotator — it lies in front of the joint and pulls the humerus across the chest — and lateral rotation belongs to infraspinatus and teres minor.',
      },
    },
    {
      key: 'regarding-pectoralis-major-mark-one-correct-statement-dep-bo-f8998e68',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the insertion, nerve supply, wall of the axilla and action of pectoralis major, and reject the three false versions of each.',
      explanations: {
        A: 'The key. Pectoralis major inserts into the lateral lip of the bicipital groove; latissimus dorsi takes the floor and teres major the medial lip.',
        B: 'The pectoral nerves arise from the lateral and medial cords, not the posterior. The posterior cord\'s branches all go behind the limb.',
        C: 'Pectoralis major is the anterior wall of the axilla. The medial wall is serratus anterior over the upper ribs.',
        D: 'Pectoralis major medially rotates the arm. Lateral rotation is infraspinatus and teres minor, and no muscle in front of the joint can do it.',
      },
    },
    {
      key: 'regarding-the-breast-5c714a67',
      conceptKey: 'breast-extent-bed-and-nipple-position',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Give the extent, the bed and the nipple level of the breast, and reject the three near-misses.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. The bed of the breast is pectoralis major with serratus anterior and the aponeurosis of external oblique, so C is true as printed. The other three each miss the standard figure by one or two ribs or by a whole boundary.',
      explanations: {
        A: 'Off at both ends. The breast extends from the second to the sixth rib, not the third to the eighth — an error of one rib above and two below, and the sort of near-miss that is only caught by having learnt the actual numbers.',
        B: 'Stops short laterally. The breast reaches the mid-axillary line, not the mid-clavicular line, and its axillary tail goes further still, piercing the deep fascia to enter the axilla. Medially the boundary is the lateral border of the sternum, which is the half of this option that is right.',
        C: 'Pectoralis major forms the bed over the medial two thirds and serratus anterior, with the external oblique aponeurosis, forms it laterally and below.',
        D: 'Two spaces too low, and the mistake follows from the extent: because the gland reaches the sixth rib students place the nipple near there. The nipple lies at the fourth intercostal space.',
      },
    },
    {
      key: 'regarding-the-pectoralis-major-muscle-2019-ac-ad-ac-ad-ad-ad-ff951b6a',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Recognise that pectoralis major works with latissimus dorsi in adduction, and reject the three statements that invert its nerve supply, insertion and respiratory role.',
      answerOverride: 'D',
      answerOverrideReason: 'The source printed no key. Pectoralis major and latissimus dorsi are the two powerful adductors of the arm and act together, so D is true. A gives only one of its two nerves, B gives the wrong lip of the groove, and C makes it an expiratory muscle when it is accessory to inspiration.',
      explanations: {
        A: 'The word "only" is what makes it false. The medial pectoral nerve does supply the sternocostal head, but the lateral pectoral nerve supplies the clavicular head, and it is the double supply that these books ask about.',
        B: 'The wrong lip, and the classic error at this insertion. Pectoralis major takes the lateral lip, latissimus dorsi the floor and teres major the medial lip of the intertubercular groove.',
        C: 'The right idea inverted. With the arms fixed above the head pectoralis major pulls the ribs up towards the humerus and so acts as an accessory muscle of forced inspiration, not expiration — which is why a breathless patient leans on their hands.',
        D: 'Both muscles reach the intertubercular groove from opposite sides and both pull the arm hard against the trunk, which is why they are the pair named whenever adduction is asked.',
      },
    },
    {
      key: 'the-anterior-fold-of-axilla-is-formed-by-2017-dep-book-2019-afd7525d',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the muscle that forms the anterior fold of the axilla and distinguish the fold from the wall.',
      answerOverride: 'B',
      answerOverrideReason: 'The bank carries C, but subclavius lies beneath the clavicle and pectoralis minor ends on the coracoid process, so neither reaches the fold. The anterior fold of the axilla is the lower border of pectoralis major alone.',
      explanations: {
        A: 'Pectoralis minor is part of the anterior wall but ends on the coracoid process, far above the free border that forms the fold.',
        B: 'The lower free border of pectoralis major, running laterally towards the bicipital groove, is the anterior fold — the ridge that can be pinched at the front of the armpit.',
        C: 'The answer the extractor took from this page, and the reason for the override. Both named muscles belong to the anterior wall, which is why the option is plausible, but both lie at the top of that wall and neither reaches down to make a fold.',
        E: 'The distinction the whole item rests on: the wall is made by both pectoral muscles, the fold by pectoralis major alone. Choosing this means reading "fold" as "wall".',
      },
    },
    {
      key: 'the-anterior-wall-of-axilla-is-formed-by-all-the-following-e-b16758ca',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate the components of the anterior wall of the axilla from those of the posterior wall.',
      explanations: {
        A: 'True, so not the exception. Pectoralis major is the superficial layer of the anterior wall.',
        B: 'The exception, and the key. Subscapularis lies on the front of the scapula and forms the posterior wall of the axilla — directly opposite the wall the stem is asking about.',
        C: 'True, so not the exception. Pectoralis minor lies deep to pectoralis major in the anterior wall.',
        D: 'True, so not the exception. The clavipectoral fascia joins subclavius and pectoralis minor into the deep layer of the same wall.',
      },
    },
    {
      key: 'the-anterior-wall-of-the-axilla-is-formed-by-all-of-the-foll-63438044',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate the components of the anterior wall of the axilla from those of the posterior wall.',
      answerOverride: 'B',
      answerOverrideReason: 'The bank carries A, which cannot stand: pectoralis major is the anterior wall of the axilla, not the exception to it. Teres major belongs to the posterior wall with subscapularis and latissimus dorsi, so B is the exception.',
      explanations: {
        A: 'The answer the extractor took from this page, and the reason for the override. Pectoralis major is the most superficial and the most obvious component of the anterior wall.',
        B: 'The exception, and the answer. Teres major runs from the lateral border of the scapula to the medial lip of the bicipital groove and forms the lower part of the posterior wall.',
        C: 'True, so not the exception. Pectoralis minor lies deep to pectoralis major within the wall.',
        D: 'True, so not the exception. Subclavius lies at the top of the wall, under the clavicle.',
        E: 'True, so not the exception. The clavipectoral fascia binds subclavius and pectoralis minor into the deep layer of the wall.',
      },
    },
    {
      key: 'the-anterior-wall-of-the-axilla-is-formed-by-all-of-the-foll-ed174086',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate the components of the anterior wall of the axilla from those of the posterior wall.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. Pectoralis major, pectoralis minor, subclavius and the clavipectoral fascia are the four components of the anterior wall; teres major is a posterior wall muscle and is the exception.',
      explanations: {
        A: 'True, so not the exception. Pectoralis major is the superficial layer of the anterior wall.',
        B: 'The exception, and the answer. Teres major forms the lower part of the posterior wall, with subscapularis above it and latissimus dorsi wrapping round it.',
        C: 'True, so not the exception. Pectoralis minor is the deep muscle of the anterior wall.',
        D: 'True, so not the exception. Subclavius sits under the clavicle at the top of the wall.',
        E: 'True, so not the exception. The clavipectoral fascia is what joins the deep components into one layer.',
      },
    },
    {
      key: 'the-axillary-septum-doesn-t-include-dep-book-ad-p-9519ddab',
      conceptKey: 'clavipectoral-fascia-and-the-axillary-septum',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the four components of the axillary septum and reject a posterior-wall muscle.',
      answerOverride: 'C',
      answerOverrideReason: 'The bank carries A, but pectoralis minor with its fascia is one of the four components of the axillary septum. Subscapularis is a posterior wall muscle and belongs to no part of the anterior wall, so C is the exception.',
      explanations: {
        A: 'The answer the extractor read off this page, and the reason for the override. Pectoralis minor and the fascia that splits to enclose it form the middle of the axillary septum.',
        B: 'Part of the septum. Below pectoralis minor the fascia runs on to the axillary fascia as the suspensory ligament.',
        C: 'Not part of the septum, and the answer. Subscapularis lies on the anterior surface of the scapula and forms the posterior wall of the axilla — the opposite wall entirely.',
        D: 'Part of the septum. The fascia splits above to enclose subclavius and reach the clavicle.',
      },
    },
    {
      key: 'the-compound-alveolar-glands-are-met-with-in-342470ce',
      conceptKey: 'exocrine-gland-classification-by-duct-branching-and-secretory-shape',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Apply the duct-and-secretory-shape classification to four named organs.',
      explanations: {
        A: 'The salivary glands are compound, but their secretory units are tubulo-alveolar rather than purely alveolar — flask-shaped, part tube and part acinus. The duct half of the answer is right and the shape half is not.',
        B: 'A sweat gland is simple coiled tubular: one unbranched duct and a coiled tube for a secretory unit, and nothing alveolar about it.',
        C: 'The kidney is not an exocrine gland in this classification at all. Its tubules are nephrons, not secretory acini fed by a branching duct system.',
        D: 'The key. The mammary gland has a branching duct system opening at the nipple, each branch ending in rounded alveoli — a compound alveolar gland, and the one every student has a specimen of.',
      },
    },
    {
      key: 'the-following-muscle-has-double-innervation-dep-book-4334dad1',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Easy', questionType: 'Nerve supply',
      learningObjective: 'Name the pectoral muscle supplied by two nerves rather than one.',
      explanations: {
        A: 'The key. The lateral pectoral nerve supplies the clavicular head and the medial pectoral nerve the sternocostal head, so the muscle takes a branch from each cord that gives one.',
        B: 'Pectoralis minor takes the medial pectoral nerve only — the same nerve that goes on through it to reach the sternocostal head of pectoralis major, which is what makes this the closest wrong answer.',
        C: 'Subclavius has its own single named branch, the nerve to subclavius, from the upper trunk.',
        D: 'Deltoid takes the axillary nerve alone, and it is the loss of that single supply that flattens the shoulder.',
      },
    },
    {
      key: 'the-posterior-wall-of-axilla-is-formed-by-2024-05e912e9',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the three muscles of the posterior wall of the axilla.',
      answerOverride: 'B',
      answerOverrideReason: 'The bank carries C, but supraspinatus lies above the spine of the scapula, on the back of it and outside the axilla altogether. The posterior wall is subscapularis, teres major and latissimus dorsi, so B is the only one of the four that belongs to it.',
      explanations: {
        A: 'Pectoralis minor is in the anterior wall, deep to pectoralis major and directly across the axilla from the wall being asked about.',
        B: 'Teres major forms the lower part of the posterior wall, with subscapularis above it and latissimus dorsi curling round its lower border.',
        C: 'The answer the extractor took from this page, and the reason for the override. Supraspinatus is on the dorsum of the scapula above the spine, roofed by the coraco-acromial arch; it never lines the axilla.',
        D: 'Serratus anterior forms the medial wall, over the upper ribs. It is the wall carrying the long thoracic nerve, which is why it is well remembered and often reached for.',
      },
    },
    {
      key: 'the-superior-thoracic-artery-choose-the-correct-answer-dep-b-680dd9e1',
      conceptKey: 'axillary-artery-parts-relations-and-branches',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Assign each branch of the axillary artery to its part, and separate the superior thoracic from the thoraco-acromial and the lateral thoracic.',
      explanations: {
        A: 'The wrong part. The superior thoracic is the single branch of the first part of the axillary artery, above the upper border of pectoralis minor; the second part gives the thoraco-acromial and the lateral thoracic.',
        B: 'The key, and it needs a caveat rather than a defence. The artery does run behind pectoralis minor on its way down to the first two intercostal spaces — but it arises above the muscle, from the first part, so "arises behind" is loose. It is the examiner\'s answer because the other three name a different artery outright, and the wording should be corrected before a student is asked to choose it.',
        C: 'The thoraco-acromial artery is the vessel that pierces the clavipectoral fascia and divides into its four named branches on the surface. It comes from the second part.',
        D: 'The lateral thoracic artery supplies the breast, running along the lower border of pectoralis minor. It too comes from the second part, and it is the branch students confuse with this one because both are called thoracic.',
      },
    },
    {
      key: 'the-superior-thoracic-artery-choose-the-correct-answer-f735dff5',
      conceptKey: 'axillary-artery-parts-relations-and-branches',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Assign each branch of the axillary artery to its part, and separate the superior thoracic from the thoraco-acromial and the lateral thoracic.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key; the keyed copy of the same question, `the-superior-thoracic-artery-choose-the-correct-answer-dep-b-680dd9e1`, marks B, and B is the only option that names this artery at all — A gives it the wrong part, C describes the thoraco-acromial and D the lateral thoracic. The wording of B is loose and is flagged on the concept as a conflict: the artery arises from the first part, above pectoralis minor, and only then passes behind the muscle.',
      explanations: {
        A: 'The superior thoracic arises from the first part of the axillary artery, not the second. The second part gives the thoraco-acromial and the lateral thoracic.',
        B: 'The examiner\'s answer, and the only option describing this vessel. The artery descends behind pectoralis minor and in front of serratus anterior to the first two intercostal spaces; the option\'s "arises" should read "runs", since the origin is from the first part above the muscle.',
        C: 'Piercing the clavipectoral fascia belongs to the thoraco-acromial artery, which surfaces there and divides into pectoral, acromial, clavicular and deltoid branches.',
        D: 'Supplying the breast belongs to the lateral thoracic artery, along the lower border of pectoralis minor. Both arteries carry "thoracic" in the name, which is the whole trap.',
      },
    },
    {
      key: 'unicellular-gland-is-6f30f803',
      conceptKey: 'goblet-cell-the-unicellular-exocrine-gland',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the one gland in the body formed of a single cell.',
      explanations: {
        A: 'The key. The goblet cell is a single flask-shaped mucous-secreting cell within a surface epithelium, and it is the only unicellular gland taught.',
        B: 'A salivary gland is multicellular and compound, with a branching duct system and thousands of secretory units.',
        C: 'A sebaceous gland is multicellular and simple branched alveolar, discharging by the holocrine mode into a hair follicle.',
        D: 'A lactating mammary gland is multicellular and compound alveolar. It is chosen here because the question sits among breast material, and because a gland made of one kind of cell is easily read as a gland made of one cell.',
      },
    },
    {
      key: 'when-does-winging-of-the-scapula-happen-2021-1c3275fd',
      conceptKey: 'long-thoracic-nerve-serratus-anterior-winging',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'State that winging follows paralysis of serratus anterior rather than its contraction.',
      explanations: {
        A: 'The reverse. A contracting serratus anterior presses the medial border of the scapula firmly against the ribs — the sign appears only when it cannot.',
        B: 'The key. With serratus anterior paralysed, pushing forward against a wall lets the medial border lift away from the chest wall.',
        C: 'Pectoralis major does not attach to the scapula, so nothing it does — contracting or not — moves the medial border.',
        D: 'Same absence of an attachment. Paralysing pectoralis major wastes the anterior axillary fold and weakens adduction; it leaves the scapula sitting flat.',
      },
    },
    {
      key: 'which-of-the-following-statements-is-true-for-pectoralis-maj-79b99555',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the direction of pull of pectoralis major and reject reversed attachments and the wrong nerve.',
      explanations: {
        A: 'Origin and insertion reversed. Pectoralis major arises from the clavicle, sternum and costal cartilages and inserts into the humerus — the humerus is the bone it moves, not the bone it comes from.',
        B: 'Also reversed, and impossible besides: the muscle arises from costal cartilages, not from the bony ribs, and it ends on the humerus.',
        C: 'The key. Pectoralis major adducts the arm — with latissimus dorsi it is one of the two powerful adductors — and medially rotates it.',
        D: 'The wrong nerve entirely. The median nerve is a nerve of the forearm and hand formed from both cords; pectoralis major takes the lateral and medial pectoral nerves.',
      },
    },
    {
      key: 'a-43-year-old-woman-presented-with-a-breast-mass-examination-602b039f',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option B has been swallowed into option A — the line reads "Dense irregular white fibrous 0.7. _b. Dese regular white fibrous C.T", so the two alternatives the question turns on are printed as one option and only three remain. Recoverable by rescanning, but the intact copy is `a-43-year-old-woman-presented-with-a-breast-mass-examination-d695c44c`, which carries all four options.',
    },
    {
      key: 'deep-layer-axillary-septum-subclavius-clavipectoral-fascia-p-0842ebfa',
      conceptKey: 'clavipectoral-fascia-and-the-axillary-septum',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not a question.',
      explanations: {},
      exclude: true,
      excludeReason: 'Not a multiple-choice question at all. The extractor has picked up a block of running lecture notes — "Deep layer (axillary septum): Subclavius, clavipectoral fascia, pectoralis minor & suspensory ligament of axilla" — as a stem, and the two surviving "options" D and E are the next two lines of the same notes, describing the posterior and medial walls. No rescan produces a question here because the page never printed one; the row should be dropped from the bank when the extraction is next revised.',
    },
    {
      key: 'paralysis-of-the-following-muscle-leads-to-flat-shoulder-6fa711bd',
      conceptKey: 'shoulder-rotators-medial-and-lateral',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option C was lost, leaving only A, B and D. The Muscles of the Back leaf holds two intact copies of this question, `paralysis-of-the-following-muscle-leads-to-at-shoulder-dep-b-e7467d8c` and `paralysis-of-the-following-muscle-leads-to-flat-shoulder-dep-beea5638`, and it is authored there against `axillary-nerve-injury-shoulder-dislocation`. A rescan of this page would recover a third copy of a question the bank already has twice.',
    },
    {
      key: 'profunda-brachil-artery-69-thoracic-artery-choose-the-correc-47eb0d3f',
      conceptKey: 'axillary-artery-parts-relations-and-branches',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Two questions have been merged into one row. The stem opens on the profunda brachii artery and then runs into a second stem about a thoracic artery, and the surviving options belong to the lateral thoracic — "runs along the lower border of pectoralis major", "supplies the medial of the mammary gland" — while option A about the second part of the axillary artery has been printed out of order after D. Nothing here is a single answerable item. A rescan would separate the two questions; repairing them from this row would mean inventing text.',
    },
    {
      key: 'regarding-pectoralis-major-muscle-mark-one-correct-statement-051124b9',
      conceptKey: 'pectoralis-major-attachment-action-nerve',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option A — which is the correct answer — has been swallowed into the stem, which ends "Inserted into the lateral lip of the bicipital groove". Three options remain and none of them is true, so the item cannot be sat at all. Two intact copies exist at `regarding-pectoralis-major-mark-one-correct-statement-dep-bo-0219bfa1` and `regarding-pectoralis-major-mark-one-correct-statement-dep-bo-f8998e68`.',
    },
    {
      key: 'the-coracoid-process-of-the-scapula-gives-attachment-to-pect-69cec547',
      conceptKey: 'axilla-four-walls-and-the-axillary-folds',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option A has been swallowed into the stem, which ends "@- Pectoralis minor." — and pectoralis minor is the answer, since the coracoid process gives attachment to pectoralis minor, coracobrachialis and the short head of biceps. Three options remain, none of them true. A rescan recovers the item; the bank holds no other copy of it, so this one is worth returning to the page for.',
    },
    {
      key: 'the-following-muscle-can-abduct-the-arm-pectoralis-major-mus-1f772560',
      conceptKey: 'scapular-rotation-abduction-beyond-90-muscles',
      difficulty: 'Easy', questionType: 'Movements',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The worst-damaged copy in the leaf: option A has run into the stem and option C — supraspinatus, the correct answer — has been lost entirely, leaving two options. The intact copy is `the-following-muscle-can-abduct-the-arm-d4f8fe3c`, which is keyed and asked twice, so a rescan of this page adds nothing.',
    },
    {
      key: 'the-superior-thoracic-artery-choose-the-correct-answer-arise-3230d338',
      conceptKey: 'axillary-artery-parts-relations-and-branches',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option A has been swallowed into the stem — the question ends "Arises from the 2nd part of axillary artery" — leaving three options. The other two copies of this question, `the-superior-thoracic-artery-choose-the-correct-answer-dep-b-680dd9e1` and `the-superior-thoracic-artery-choose-the-correct-answer-f735dff5`, are complete, so nothing is lost; both carry the wording problem flagged as a conflict on the concept.',
    },
  ],
}
