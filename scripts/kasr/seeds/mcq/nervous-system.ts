/**
 * `101 ISK > Anatomy > Basis of Anatomy > Nervous system` — the question books' MCQs.
 *
 * Sixteen rows, and only one of them is actually the general-anatomy nervous
 * system chapter: "the segments of the spinal cord are". The leaf classifier
 * pulled in four cytology questions on intermediate filaments — they mention
 * neurons and glia — and eight embryology questions on the neural tube, the
 * neural crest and the intra-embryonic mesoderm, because they mention the
 * central nervous system. That is a mis-assignment in the bank rather than a
 * fact about the chapter, and it is reported rather than fixed here: the bank
 * is not edited by hand.
 *
 * The consequence is that three of this leaf's four concepts do not sit on this
 * leaf's path. `intermediate-filament-types-and-tumour-diagnosis` is reused
 * verbatim from the Cytoplasm leaf, where it belongs and where it already
 * exists. The two embryology concepts are minted under
 * `> General Embryology > Third Week of Development`, not under Basis of
 * Anatomy, so that whichever lane authors the Third Week leaf reuses these keys
 * rather than minting rivals — the keys to reuse are
 * `neural-tube-and-neural-crest-derivatives` and
 * `intra-embryonic-mesoderm-divisions-and-derivatives`. Their subject follows
 * their own path, which is what `subjectForPath` checks.
 *
 * On the leaf's own concept: the brief asked for subject `neuro`, and
 * `subjectForPath` gives `msk` for everything under `> Basis of Anatomy`. The
 * build refuses `neuro` outright, so `spinal-cord-segments-and-structure` is
 * `msk`. Reported rather than worked around.
 *
 * Eight of sixteen rows are excluded, which is high and is the same
 * mis-assignment showing again: the books ask the neural-tube question three
 * times and the ganglia question twice, and the extra copies are duplicates
 * with lost or bled-in options. Two more are excluded as reviewer problems
 * rather than scan problems — each has two defensible answers.
 *
 * Four answers overridden, two of them because the printed key is wrong.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Nervous system',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Nervous system',
  articleId: 'ART-101-ANA-NERVOUS-SYSTEM',

  concepts: [
    {
      key: 'spinal-cord-segments-and-structure',
      label: 'The spinal cord is 31 segments — 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 1 coccygeal — around an H of grey matter',
      definition: 'The spinal cord is a tube about 45 cm long lying inside the vertebral column, with a cervical and a lumbar enlargement where the limb plexuses arise and a tapering lower end, the conus medullaris. It is divided into 31 segments — 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 1 coccygeal — each giving one pair of spinal nerves. In section it has outer white matter carrying the nervous tracts, inner H-shaped grey matter of nerve cells, and a central canal. The grey matter forms two dorsal horns with sensory nuclei, two ventral horns with motor nuclei, and two lateral horns holding sympathetic nuclei in the thoracic and upper two lumbar segments and parasympathetic nuclei in the second, third and fourth sacral segments.',
      objective: 'Give the number of spinal cord segments region by region, and name what the white and grey matter contain.',
      pitfall: 'Counting eight cervical vertebrae to match the eight cervical segments. There are seven cervical vertebrae and eight cervical cord segments, and the mismatch is the reason the numbers have to be learnt rather than derived.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Nervous system',
      type: 'structural_description',
    },
    {
      // Verbatim from the Cytoplasm leaf, where this concept belongs and
      // already exists. Four rows of this leaf are cytology questions the
      // classifier misfiled here because they name neurons and glia.
      key: 'intermediate-filament-types-and-tumour-diagnosis',
      label: 'Intermediate filaments are supportive, 8–10 nm, and each tissue has its own protein — which is what makes them diagnostic',
      definition: 'Intermediate filaments are 8–10 nm across, between the microfilaments and the microtubules in size, and are formed by the polymerisation of tetrameric subunits that differ chemically from tissue to tissue. Their role is supportive rather than motile. Cytokeratin is the intermediate filament of epithelium, vimentin of connective tissue and muscle, desmin of muscle, neurofilaments of neurons, glial fibrillary acidic protein of glial cells, and the lamins of the nuclear envelope. Because each is tissue-specific, identifying the intermediate filament protein of a tumour by immunocytochemistry reveals the cell the tumour arose from, and that matters for its diagnosis and its treatment.',
      objective: 'Give the diameter and subunit of an intermediate filament, name the six proteins and their tissues, and explain why they are used in tumour diagnosis.',
      pitfall: 'Choosing microtubules for the tumour question because chemotherapy acts on microtubules. Two different tumour questions sit side by side in these books: microtubules are what a drug blocks, and intermediate filaments are what a pathologist stains.',
      subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
    },
    {
      key: 'neural-tube-and-neural-crest-derivatives',
      label: 'The neural tube becomes the central nervous system; the neural crest beside it becomes almost everything peripheral',
      definition: 'The neural plate of ectoderm, induced by the underlying notochord, sinks as a neural groove whose lips are the neural folds. The folds meet and fuse, beginning in the cervical region and closing towards both ends, to give the neural tube; the tube becomes the brain and the spinal cord — that is, the whole central nervous system, grey matter and white matter alike. As the folds fuse, cells at their crests separate as the neural crest and migrate. The neural crest gives the sensory, sympathetic and parasympathetic ganglia, the Schwann cells, the melanocytes and the suprarenal medulla. Both are ectodermal in origin, and neither gives rise to any mesodermal structure.',
      objective: 'Separate the derivatives of the neural tube from those of the neural crest, and name the germ layer both come from.',
      pitfall: 'Giving the peripheral nerves to the neural tube because the central nervous system is its derivative and nerves look like an extension of it. The tube gives only the central nervous system; the peripheral ganglia and Schwann cells come from the crest.',
      subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
    },
    {
      key: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      label: 'Intra-embryonic mesoderm divides into paraxial, intermediate and lateral plate, and each division has its own derivatives',
      definition: 'The intra-embryonic mesoderm arises from the primitive streak and divides into three on each side of the midline: paraxial mesoderm beside the notochord and neural tube, from the cranial part of the streak, which segments into somites and so into the vertebrae, the dermis and the skeletal muscles; intermediate mesoderm, from the middle of the streak, which forms the urogenital system; and lateral plate mesoderm, from the caudal part, which the coelom splits into somatopleuric mesoderm forming the trunk wall connective tissue and the parietal serous layers and splanchnopleuric mesoderm forming the connective tissue and smooth muscle of gut and respiratory tract, cardiac muscle and the visceral serous layers. The lining epithelium of the gut is endodermal and the central nervous system ectodermal, so neither is a mesodermal derivative.',
      objective: 'Name the three divisions of intra-embryonic mesoderm and give what each forms, and reject the endodermal and ectodermal structures offered beside them.',
      pitfall: 'Reading "urogenital system" as endodermal because the bladder is. The kidney and gonad come from intermediate mesoderm; only the lining epithelium of the bladder and urethra is endodermal.',
      subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'classification',
    },
  ],

  questions: [
    {
      key: 'desmin-intermediate-filaments-are-present-0bed278d',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attach desmin to muscle and say what it holds together there.',
      explanations: {
        A: 'Hair is keratin. Picked because both are tough structural proteins, but keratin is the epithelial filament and desmin is not found in hair at all.',
        B: 'Desmin is the intermediate filament of muscle, and it ties neighbouring myofibrils to each other at the Z line so the whole cell shortens as one.',
        C: 'Neurons carry neurofilaments. The four options here are the four tissue-specific filaments, and each question in this set moves the same list on by one.',
        D: 'Glial cells carry glial fibrillary acidic protein, which is the filament a pathologist stains to prove a brain tumour is glial.',
      },
    },
    {
      key: 'neural-tube-gives-rise-to-c2cadaa3',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Give the neural tube its one derivative and hand the rest to the neural crest.',
      explanations: {
        A: 'Peripheral nerves grow from cells of the neural crest and from motor cells whose axons leave the cord; the tube itself does not become them. Picked because nerve and cord look continuous in a dissection.',
        B: 'All three ganglia are neural crest derivatives, which is the single most examined fact in this pair. The crest separates from the folds as they fuse and migrates away; the tube stays behind.',
        C: 'The suprarenal medulla is also neural crest — its chromaffin cells are modified postganglionic sympathetic neurons, which is why it secretes adrenaline on sympathetic command.',
        D: 'The neural tube becomes the brain and the spinal cord, and therefore the central nervous system entire.',
      },
    },
    {
      key: 'one-of-the-following-is-a-derivative-of-intra-embryonic-meso-0a9eba8c',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Assign each offered structure to its germ layer and pick the mesodermal one.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. Only the urogenital system is mesodermal — it comes from the intermediate mesoderm. The intestinal lining is endodermal, the central nervous system ectodermal, and the connecting stalk extra-embryonic rather than intra-embryonic mesoderm.',
      explanations: {
        A: 'The lining epithelium of the intestine is endoderm. Its muscle and connective tissue coats are splanchnopleuric mesoderm, and the question asks about the lining, which is the distinction being tested.',
        B: 'The intermediate mesoderm, the middle of the three divisions, forms the urogenital system — kidney, ureter and gonad.',
        C: 'The central nervous system is ectoderm, by way of the neural tube. Chosen because the notochord that induces it is mesodermal, but the induced tissue keeps its own layer.',
        D: 'The connecting stalk is extra-embryonic mesoderm, outside the embryo proper and destined for the umbilical cord. The stem says intra-embryonic, and that word is the whole question.',
      },
    },
    {
      key: 'keratin-filaments-are-present-in-ca21300c',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attach cytokeratin to epithelium and to the keratinised structures epithelium makes.',
      explanations: {
        A: 'Cytokeratin is the intermediate filament of epithelial cells, and hair and nail are the keratinised products of epidermal epithelium.',
        B: 'Connective tissue carries vimentin. The two are the pair a pathologist uses to tell a carcinoma from a sarcoma, so swapping them reverses the diagnosis.',
        C: 'Neurons carry neurofilaments, not keratin.',
        D: 'Glial cells carry glial fibrillary acidic protein, not keratin.',
      },
    },
    {
      key: 'neurofilaments-are-present-in-bfcd9f27',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attach neurofilaments to the neuron and not to the glia beside it.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. The name is the answer: neurofilaments are the intermediate filament of neurons, and the other three options carry keratin, vimentin and glial fibrillary acidic protein respectively.',
      explanations: {
        A: 'Epidermis and hair carry cytokeratin. Chosen when the four options of this recurring set are answered in the wrong order.',
        B: 'Connective tissue carries vimentin.',
        C: 'Neurofilaments are the intermediate filament of the neuron, running the length of the axon and supporting it.',
        D: 'The nearest miss, and the one worth knowing: glial tissue has its own intermediate filament, glial fibrillary acidic protein, distinct from the neurofilaments of the neuron it supports. That distinctness is what makes the stain diagnostic.',
      },
    },
    {
      key: 'sensory-sympathetic-and-parasympathetic-ganglia-are-develope-03698d82',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Give the peripheral ganglia to the neural crest.',
      answerOverride: 'A',
      answerOverrideReason: 'The book prints C, surface ectoderm, which is what forms the epidermis and is the key belonging to the neighbouring question on that page. All three ganglia are neural crest derivatives, and the book\'s own list of ectodermal derivatives puts them under "derivatives of the neural crest".',
      explanations: {
        A: 'Cells at the crest of the fusing neural folds separate and migrate to form the sensory, sympathetic and parasympathetic ganglia, along with the Schwann cells, the melanocytes and the suprarenal medulla.',
        B: 'The neural tube gives the central nervous system only. Picked because the ganglia lie so close to the cord and because tube and crest arise in one movement.',
        C: 'Surface ectoderm forms the epidermis, and the printed key names it here — evidently carried over from the "epidermis of skin is derived from" question that follows it in these books.',
        D: 'Intra-embryonic mesoderm forms bone, muscle and the urogenital system, no nervous tissue at all. Nervous tissue is ectodermal throughout.',
      },
    },
    {
      key: 'the-segments-of-the-spinal-cord-are-9d471d6f',
      conceptKey: 'spinal-cord-segments-and-structure',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Give the number of spinal cord segments in each region.',
      explanations: {
        A: 'Ten thoracic segments, when there are twelve. Picked by students who half-remember the count and correct the wrong number: it is the cervical eight that is the odd one, not the thoracic twelve.',
        B: 'Ten cervical segments, when there are eight. Chosen by rounding the odd number to a tidier one.',
        C: 'One sacral segment, when there are five. The sacral segments matter: the parasympathetic nuclei of the lateral horn sit in the second, third and fourth of them.',
        D: 'Eight cervical, twelve thoracic, five lumbar, five sacral and one coccygeal — thirty-one segments and therefore thirty-one pairs of spinal nerves.',
      },
    },
    {
      key: 'vimentin-intermediate-filaments-are-present-in-6d5e785d',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attach vimentin to connective tissue and muscle, and say why muscle appears in two answers of this set.',
      answerOverride: 'B',
      answerOverrideReason: 'The source printed no key. Vimentin is the intermediate filament of connective tissue and of muscle, which is exactly what B states; the other three options name the tissues of keratin, neurofilaments and glial fibrillary acidic protein.',
      explanations: {
        A: 'Hair is keratin, the epithelial filament.',
        B: 'Vimentin is the intermediate filament of mesenchymal tissue — connective tissue and muscle — which is why a vimentin-positive tumour is a sarcoma rather than a carcinoma.',
        C: 'Neurons carry neurofilaments.',
        D: 'Glial tissue carries glial fibrillary acidic protein. Muscle appears in both the vimentin and the desmin answers of this set, and that is not an error: muscle carries vimentin as a mesenchymal tissue and desmin as its own specialised filament.',
      },
    },
    {
      key: 'neural-tube-gives-rise-to-dep-book-c5c7cd7d',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The same question as `neural-tube-gives-rise-to-c2cadaa3`, which the books ask twice as often and which is keyed correctly. This copy is keyed A, peripheral nerves, which is wrong — the neural tube gives the central nervous system, option D. Kept so a reviewer can see the two copies disagree rather than meeting the wrong key on its own.',
    },
    {
      key: 'neural-tube-gives-rise-to-7-dcd03d68',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A third copy of `neural-tube-gives-rise-to-c2cadaa3`, and the worst of the three: option C was lost, leaving A, B and D, the stem ends in a stray "7", and no key was printed. A rescan would recover C, but the intact copy already exists and is the one to use.',
    },
    {
      key: 'one-of-the-following-is-a-derivative-of-intra-embryonic-meso-aba47993',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The same question as `one-of-the-following-is-a-derivative-of-intra-embryonic-meso-0a9eba8c`, which the books ask twice as often. Its options are intact and identical; only the OCR tail on the stem differs. Kept as a duplicate rather than deleted so a rescan does not treat it as a lost question.',
    },
    {
      key: 'one-of-the-following-structures-is-not-a-derivative-of-the-n-1a2f1ea7',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Hard', questionType: 'Classification',
      learningObjective: 'Not sittable as printed.',
      explanations: {},
      exclude: true,
      excludeReason: 'A reviewer problem, not a scan problem: two options are defensibly "not a derivative of the neural crest". C, the grey matter of the spinal cord, comes from the neural tube; D, the enamel of the teeth, comes from oral ectoderm by way of the ameloblasts — it is the dentine, from the odontoblasts, that is the neural crest derivative. The printed key is separately wrong: it names B, Schwann cells, which are a neural crest derivative and one of the book\'s own examples. The question needs the enamel option rewritten before it can be sat.',
    },
    {
      key: 'regarding-formation-of-central-nervous-system-mark-the-1-0-c-91b9c855',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option A was pulled into the stem — the stem ends "2( Itis derived from ectoderm" — leaving only B, C and D as options, and A is the correct one. Option D has additionally absorbed the opening of the next question on the page, on the volume of amniotic fluid. A clean copy of the same question exists in the bank under the Third Week of Development leaf; that is the copy to author, and a rescan of this page is not needed.',
    },
    {
      key: 'regarding-the-derivatives-of-the-intraembryonic-mesoderm-mar-3ec80929',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Hard', questionType: 'Classification',
      learningObjective: 'Not sittable as printed.',
      explanations: {},
      exclude: true,
      excludeReason: 'A reviewer problem, not a scan problem: C, lateral plate mesoderm, and D, somites, are both derivatives of the intra-embryonic mesoderm — the first is one of its three divisions and the second the segmentation of another — so the question has two correct answers as written. The printed key is separately wrong: it names A, the lining epithelium of the duodenum, which is endoderm. One of C and D must be removed before this can be sat.',
    },
    {
      key: 'sensory-sympathetic-and-parasympathetic-ganglia-are-develope-7437149a',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option C, surface ectoderm, was lost, and what stands in the E slot — "Epidermis of skin is derived from" — is the stem of the next question bleeding in rather than an option. That leaves three real options. The intact copy is `sensory-sympathetic-and-parasympathetic-ganglia-are-develope-03698d82` and is the one to use.',
    },
    {
      key: 'the-segments-of-the-spinal-cord-are-dep-book-vi-ad-3a3a95e4',
      conceptKey: 'spinal-cord-segments-and-structure',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The stem and the options belong to two different questions. The stem asks for the segments of the spinal cord; the four options — right side of the abdomen, right lower limb, right upper limb, right side of the pelvis — answer a question about a region, almost certainly the neighbouring one on drainage or supply. No option can be keyed. A rescan of the page recovers both questions; the intact copy of this one is `the-segments-of-the-spinal-cord-are-9d471d6f`.',
    },
  ],
}
