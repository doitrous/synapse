/**
 * `101 ISK > Histology > Epithelial Tissues > Polarity and Membranous
 * Specializations` — the question books' MCQs.
 *
 * Eighty-seven rows; sixty are authored and twenty-seven excluded. The
 * commonest reason by a long way is a lost option: sixteen rows arrived with
 * three options or two, almost all of them junction questions whose option set
 * was printed as a short list and clipped further by the scan. Seven more are
 * surface-epithelium or connective-tissue questions the extraction filed here,
 * and the rest are OCR damage — a table run into a stem, an option swallowed by
 * the stem above it, an answer truncated mid-phrase.
 *
 * `cilium-origin-and-ultrastructure` is not minted here. It is already a
 * concept, from the 2025 end-of-year paper, and its label, definition,
 * objective and pitfall below are copied from that batch verbatim, so
 * re-emitting it is an update that adds the question-book occurrences to its
 * exam signal and changes nothing else. What it does add is a conflict, and the
 * conflict matters: that concept says the beat is produced by dynein arms, and
 * this faculty's own answer key to `movement-of-cilia-can-be-done-by-84c882f9`
 * says the answer is "none of the above". The department book attributes the
 * beat to the bending of adjacent doublets and never mentions dynein, nexin or
 * radial spokes. A student sitting this paper has to know both things.
 *
 * Three answers are overridden against the source and are argued in place:
 * `the-basement-membrane-one-of-the-following-is-false-8973190b`, where the
 * printed key marks a true statement as the false one, and two rows where the
 * source printed no key at all.
 *
 * Three rows from the sat end-of-module papers are added at the end and all three
 * are live, which makes this the only histology leaf in the batch with no
 * exclusions. `intermediate-filam` is the one row whose answer was recovered from a
 * marked script, and it is authored despite a stem the scanner cut down to
 * "Intermediate filam : é a A ae": every option is identifiable and the key is
 * high-confidence, so the row is kept with the damage recorded in its
 * `answerOverrideReason` rather than set aside. Its stem needs retyping before a
 * student sees it. `intermediate-filament-types-and-tumour-diagnosis` is copied
 * verbatim from `cytoplasm.ts`, where it was minted.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Polarity and Membranous Specializations',
  modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
  articleId: 'ART-101-HIS-MEMBRANOUS-SPECIALISATIONS',

  concepts: [
    {
      key: 'cilium-origin-and-ultrastructure',
      label: 'A cilium arises from a basal body and is built on a 9+2 axoneme',
      definition:
        'A cilium develops from a basal body, itself derived from a centriole, which migrates to the apical cell surface. On electron microscopy the shaft contains an axoneme of nine peripheral microtubule doublets around a central pair, with dynein arms on the doublets that produce the beat.',
      objective: 'Describe where a cilium comes from and what its 9+2 axoneme looks like on electron microscopy.',
      pitfall: 'Giving microvilli the same answer. A microvillus has an actin core and no axoneme, and does not beat.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
      conflicts: [
        'This concept states that dynein arms produce the beat. The department book does not: it attributes the beat to the bending of adjacent doublets against one another and names no dynein arm, nexin link or radial spoke anywhere. The question books follow the book — the answer key to "Movement of cilia can be done by: dynein arms / nexin / radial spokes / none of the above" is "none of the above". Both facts are recorded because a student needs the department\'s answer to pass and the real mechanism to go on learning.',
        'The three parts of the cilium and their microtubule counts are stated by the book as basal body 27 in 9 triplets, shaft 20 as 9 doublets plus 2 singlets, and rootlets 9. This concept states only the shaft arrangement; the other two counts are examined just as often.',
      ],
    },
    {
      key: 'microvillus-and-stereocilium-against-the-cilium',
      label: 'A microvillus has an actin core and absorbs; a stereocilium is a long non-motile microvillus; only the cilium is built of microtubules and beats',
      definition:
        'The apical specialisations differ in their core and in what they do. A microvillus is a short finger-like projection whose core is actin filaments inserted into a terminal web; it has no axoneme, no basal body and no rootlets, it does not move, and it increases the surface area for absorption. Seen by light microscopy a carpet of microvilli is the brush or striated border of the absorptive columnar cell of the intestine. A stereocilium is not a cilium at all: it is a long, non-motile microvillus with an actin core, and it helps absorption in the epididymis. A cilium is a motile process with a microtubular core, and a flagellum has the same axoneme but is far longer and moves the cell itself.',
      objective:
        'Tell a microvillus, a stereocilium and a cilium apart by their core filament, their motility and their function, and name the light-microscopic appearance of each.',
      pitfall:
        'Reading "stereocilium" as a kind of cilium. The name says cilium and the structure is a microvillus — long, actin-cored and motionless — and the book says so explicitly.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'comparison',
      aliases: ['Microvilli', 'Brush border', 'Striated border', 'Stereocilia', 'Terminal web'],
      gaps: [
        'The department book gives no length or diameter for a microvillus, a stereocilium, a cilium or a flagellum, so "short" and "long" here are relative to each other and not to a stated figure.',
      ],
    },
    {
      key: 'zonula-occludens-seals-the-space-between-cells',
      label: 'The zonula occludens fuses adjacent membranes at points, encircles the apex of the cell, and seals the space between cells',
      definition:
        'The tight or occluding junction is the most apical of the lateral junctions. The two adjacent plasma membranes fuse at points through transmembrane proteins contributed by each cell, so the intercellular space at those points is obliterated, and the junction completely encircles the apex of the cell like a belt. Its effect is to restrict the passage of substances between adjacent cells — it makes the epithelium a barrier rather than a sieve, and forces anything crossing it to pass through the cells rather than between them.',
      objective:
        'State what the zonula occludens does to the intercellular space, where it sits on the cell, and what the seal achieves.',
      pitfall:
        'Confusing the seal with adhesion. Both the zonula occludens and the zonula adherens are belts around the apex, but only the occludens closes the space; the adherens leaves a wide gap and holds the cells together across it.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
      aliases: ['Tight junction', 'Occluding junction', 'Zonula occludens'],
      gaps: [
        'The department book names no transmembrane protein family for any junction — no occludin or claudin appears — and describes them only as transmembrane protein molecules.',
      ],
    },
    {
      key: 'zonula-adherens-against-macula-adherens',
      label: 'The zonula adherens is a belt anchoring actin; the macula adherens is a spot anchoring intermediate filaments, and it is the strongest junction',
      definition:
        'Both adherens junctions leave a wide intercellular space and both depend on calcium ions to link the extracellular parts of their transmembrane proteins, and there the resemblance ends. The zonula adherens encircles the cell like a belt, and on its cytoplasmic side condensed proteins bind the junction to actin filaments; it provides lateral adhesion. The macula adherens, or desmosome, does not encircle the cell — it is scattered as circular disc-shaped spots, each with a thickened cytoplasmic attachment plaque of several proteins into which bundles of intermediate filaments (tonofilaments) are anchored, and the wide space between the two plaques shows a dark midline. It is the strongest of the junctions, which is why it is abundant between the cells of stratified squamous epithelium, where the surface is subjected to friction.',
      objective:
        'Distinguish the two adherens junctions by shape — belt against spot — and by the filament each anchors, and say which is the strongest junction and where it is abundant.',
      pitfall:
        'Swapping the two. Zonula means a belt and macula means a spot, and the filaments follow: the belt takes actin, the spot takes intermediate filaments.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'comparison',
      aliases: ['Desmosome', 'Macula adherens', 'Zonula adherens', 'Tonofilaments', 'Adhering junction'],
    },
    {
      key: 'gap-junction-lets-ions-and-small-molecules-through',
      label: 'The gap junction is the only junction material passes through: paired channels of six subunits each carry ions, small molecules and impulses between cells',
      definition:
        'The gap junction, or nexus, is a communicating junction. The gap between the two membranes is narrow and is bridged by channels, each channel formed of six symmetrical transmembrane protein molecules, and through them ions and small molecules pass directly from the interior of one cell to the interior of the next. Between muscle cells the same channels carry impulses. It is the only one of the four lateral junctions through which anything actually passes, and it is not part of the junctional complex.',
      objective:
        'State what a gap junction lets through, how many subunits form one channel, and why it is classed as communicating rather than occluding or adhering.',
      pitfall:
        'Treating it as a hole in the membrane. The channel is narrow and selective — ions and small molecules only — and large proteins do not cross it.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
      aliases: ['Nexus', 'Communicating junction', 'Gap junction'],
      gaps: [
        'The department book does not use the word connexin or connexon, describing the channel only as six symmetrical transmembrane protein molecules. Question books that ask for connexin are asking beyond this faculty\'s stated source.',
      ],
    },
    {
      key: 'junctional-complex-is-three-junctions-not-four',
      label: 'The junctional complex is the zonula occludens, the zonula adherens and the macula adherens together — the gap junction is not part of it',
      definition:
        'Where the first three lateral junctions occur together between adjacent cells, running from the apex downwards as zonula occludens, then zonula adherens, then macula adherens, the arrangement is called the junctional complex. The classic site is between the simple columnar cells lining the small intestine, and the superficial cells of transitional epithelium are joined by it too. The gap junction is the fourth lateral junction and is not one of the three.',
      objective:
        'Name the three junctions of the junctional complex, in order from the apex, and say which junction is excluded from it.',
      pitfall:
        'Counting four. The book recognises four lateral junctions and three members of the complex, and the one left out is the gap junction — the only one that is not an adhesion or a seal.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'classification',
      aliases: ['Junctional complex', 'Terminal bar'],
    },
    {
      key: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      label: 'The basement membrane has an epithelial basal lamina and a connective-tissue reticular lamina, and hemidesmosomes fix the epithelium to it',
      definition:
        'Every epithelium rests on a basement membrane, and having one is what distinguishes epithelium from the tissues around it. On light microscopy it is an amorphous dense layer staining red with PAS or brown with silver, and it may be clear and thick, as in skin, or non-clear and thin, as in transitional epithelium. On electron microscopy it is two layers named for the tissue that made each: the basal lamina, the epithelial component, an electron-dense sheet of type IV collagen and glycoproteins, itself resolvable into a lamina lucida and a lamina densa; and the reticular lamina, the connective-tissue component, of type III collagen — the reticular fibres — and ground substance. Hemidesmosomes, shaped like half a desmosome on the basal surface of the basal cells, fix the epithelium to it. Its functions are support, attachment, and control of the passage of molecules, which in the kidney glomerulus and the lung alveolus is filtration and gas exchange.',
      objective:
        'Name the two electron-microscopic layers of the basement membrane, say which tissue makes each and what collagen it contains, and name the structure that attaches the epithelium to it.',
      pitfall:
        'Naming the basal lamina as the connective-tissue layer. The basal lamina is the epithelium\'s own contribution; the reticular lamina is the connective tissue\'s. The two-layer question is also asked twice with different answers depending on whether it names the basement membrane or the basal lamina, and the sub-layers of the basal lamina are lamina lucida and lamina densa.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
      aliases: ['Basal lamina', 'Reticular lamina', 'Lamina densa', 'Lamina lucida', 'Hemidesmosome'],
      gaps: [
        'The lamina lucida and lamina densa subdivision of the basal lamina is asked by the question books but is not stated in the department book, which resolves the basement membrane into basal lamina and reticular lamina and stops there.',
      ],
    },
    {
      key: 'basal-infoldings-serve-ion-transport',
      label: 'Basal infoldings increase the basal surface area, with mitochondria stacked vertically between them to power active transport',
      definition:
        'Basal infoldings are invaginations of the basal cell membrane that increase the surface area available for transport. Mitochondria are arranged vertically in the compartments between them, supplying on the spot the energy that active transport needs. They are therefore found in ion-transporting cells, of which the book\'s example is the cells of the kidney tubules.',
      objective:
        'Explain why basal infoldings and vertically arranged mitochondria occur together, and name the cells that have them.',
      pitfall:
        'Placing the infoldings laterally or apically. They are basal, which is the surface that faces the connective tissue and the blood supply the transported ions are going to or coming from.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
      aliases: ['Basal infoldings', 'Basal striations', 'Ion-transporting cell'],
    },
    {
      key: 'immotile-cilia-cause-respiratory-infection-and-infertility',
      label: 'Cilia that cannot beat let secretions accumulate and infection follow, and because the sperm tail has the same axoneme the same defect causes male infertility',
      definition:
        'The ciliary beat moves secretions and particles across the epithelial surface in one direction, which in the respiratory tract is the clearance of mucus. When the cilia cannot move, secretions accumulate and bacterial infection develops on top of them, giving repeated or chronic respiratory infection that does not settle with the usual treatment. The flagellum of the spermatozoon has exactly the same axonemal structure, so the same defect immobilises the sperm tail and causes male infertility — one structural fault producing two apparently unconnected clinical pictures.',
      objective:
        'Explain why immotile cilia produce chronic respiratory infection, and why the same defect causes male infertility.',
      pitfall:
        'Treating a patient with repeated, treatment-resistant respiratory infection as simply unlucky with bacteria. The clue in these stems is that the usual medications do not work, which points at the clearance mechanism rather than at the organism.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'clinical_correlation',
      aliases: ['Immotile cilia syndrome', 'Ciliary dyskinesia'],
      gaps: [
        'The department book describes the consequences without naming the disease. "Immotile cilia syndrome" appears in the question books as an option and is used here because they use it, not because this faculty\'s text does.',
      ],
    },
    {
      key: 'intermediate-filament-types-and-tumour-diagnosis',
      label: 'Intermediate filaments are supportive, 8–10 nm, and each tissue has its own protein — which is what makes them diagnostic',
      definition:
        'Intermediate filaments are 8–10 nm across, between the microfilaments and the microtubules in size, and are formed by the polymerisation of tetrameric subunits that differ chemically from tissue to tissue. Their role is supportive rather than motile. Cytokeratin is the intermediate filament of epithelium, vimentin of connective tissue and muscle, desmin of muscle, neurofilaments of neurons, glial fibrillary acidic protein of glial cells, and the lamins of the nuclear envelope. Because each is tissue-specific, identifying the intermediate filament protein of a tumour by immunocytochemistry reveals the cell the tumour arose from, and that matters for its diagnosis and its treatment.',
      objective:
        'Give the diameter and subunit of an intermediate filament, name the six proteins and their tissues, and explain why they are used in tumour diagnosis.',
      pitfall:
        'Choosing microtubules for the tumour question because chemotherapy acts on microtubules. Two different tumour questions sit side by side in these books: microtubules are what a drug blocks, and intermediate filaments are what a pathologist stains.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
      aliases: ['Cytokeratin', 'Vimentin', 'Desmin', 'Neurofilament', 'GFAP', 'Lamins'],
    },
  ],

  questions: [
    {
      key: 'in-absorbing-columnar-cell-the-brush-border-seen-by-l-m-is-de950095',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the structure whose carpet is seen as a brush border by light microscopy.',
      explanations: {
        A: 'Cilia are visible by light microscopy too, but as a distinct fringe of beating processes on a ciliated epithelium — not as the fine even border of an absorptive cell.',
        B: 'A flagellum in the human body is the sperm tail, one per cell. It does not form a border of any kind.',
        C: 'Correct. Microvilli are too small to resolve individually, so the light microscope sees the whole carpet as a single brush or striated border on the apex of the absorptive cell.',
        D: 'Stereocilia are long microvilli, but they are found in the epididymis and not on the absorptive columnar cell of the intestine.',
      },
    },
    {
      key: 'one-of-the-following-is-a-character-of-the-shaft-of-cilia-e03ad5f9',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Attribute the microtubule doublets to the ciliary shaft and the brush border to microvilli.',
      explanations: {
        A: 'Increasing surface area for absorption is what a microvillus does. This is the pitfall the whole question is built on — three of the four options describe a microvillus.',
        B: 'The brush border of the renal tubule is microvilli. Cilia do not form a border.',
        C: 'The brush border of the intestine is microvilli as well, for the same reason.',
        D: 'Correct. The shaft — the axoneme — is nine peripheral doublets of microtubules around two central singlets. Doublets are the giveaway: the basal body has triplets and a microvillus has no microtubules at all.',
      },
    },
    {
      key: 'pseudo-stratified-columnar-ciliated-epithelium-can-be-found-95634271',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a membranous specialisations question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question — where pseudostratified columnar ciliated epithelium is found — filed here because the word "ciliated" appears in it. Its concept is declared on the Surface Epithelium leaf, and the emitter only lets a question reference a concept declared on its own leaf. Correct the bank\'s `leaf` field and it imports unchanged.',
    },
    {
      key: 'pseudo-stratified-columnar-ciliated-epithelium-is-characteri-c1b1f024',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not a membranous specialisations question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question — that all cells of a pseudostratified epithelium rest on the basement membrane — filed here on the word "ciliated". Belongs to the Surface Epithelium leaf; correct the `leaf` field and it imports unchanged.',
    },
    {
      key: 'stereocilia-are-abeb07fe',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define a stereocilium as a long microvillus.',
      explanations: {
        A: 'Right kind of structure, wrong length. Ordinary microvilli are the short ones; the "stereo-" prefix here is about length.',
        B: 'Correct. A stereocilium is a long, non-motile microvillus with an actin core, and the book is explicit that it is not a true cilium.',
        C: 'The trap the name is built for. Stereocilia do not move at all — they have no axoneme to move with.',
        D: 'Not a cilium of any length. There is no basal body, no rootlet and no microtubule in a stereocilium.',
      },
    },
    {
      key: 'which-of-the-following-is-involved-in-cell-to-cell-communica-de3a9961',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the junction through which material actually passes between cells.',
      explanations: {
        A: 'Correct. The gap junction is the communicating junction: its channels carry ions and small molecules from the interior of one cell to the interior of the next, and impulses between muscle cells.',
        B: 'A desmosome holds cells together and passes nothing. It is chosen because it is the junction students know best.',
        C: 'Demilunes are the crescents of serous cells capping a mucous acinus in a salivary gland — a gland structure, not a junction at all.',
        D: 'The basal lamina lies underneath the epithelium, between it and the connective tissue. It is not between two epithelial cells.',
      },
    },
    {
      key: 'a-male-patient-complains-of-repeated-upper-respiratory-tract-1bada6ea',
      conceptKey: 'immotile-cilia-cause-respiratory-infection-and-infertility',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Read treatment-resistant repeated infection as a failure of clearance rather than of the drug.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The stem\'s discriminating detail is that the infections repeat and do not respond to the usual medication, which points at the mucociliary clearance mechanism; the book states directly that immotile cilia let secretions accumulate and bacterial infection follow. Options A and B restate the presentation rather than explain it, and stereocilia are in the epididymis and clear nothing.',
      explanations: {
        A: 'This names the infections again rather than saying why they keep coming back. Repeated viral infection is what has to be explained, not the explanation.',
        B: 'Same objection, and it also conflicts with the stem: the usual medications are not working, which is exactly what ordinary bacterial infection would respond to.',
        C: 'Correct. Cilia that cannot beat cannot move mucus up the airway, secretions accumulate, and bacteria grow on top of them — so the infections recur however they are treated.',
        D: 'Stereocilia are long non-motile microvilli in the epididymis. They never moved anything, so a defect in them cannot impair clearance, and they are nowhere near the respiratory tract.',
      },
    },
    {
      key: 'a-male-patient-complains-of-repeated-upper-respiratory-tract-a8e27c95',
      conceptKey: 'immotile-cilia-cause-respiratory-infection-and-infertility',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Name the ciliary defect behind repeated treatment-resistant respiratory infection.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The same question as `a-male-patient-complains-of-repeated-upper-respiratory-tract-1bada6ea` with the syndrome named in the option, and the same reasoning applies: only immotile cilia explain why the infections recur despite treatment.',
      explanations: {
        A: 'Restates the problem instead of explaining it, and does not account for the failure of treatment.',
        B: 'Bacterial infection is what happens on top of retained secretions; the question asks what let the secretions be retained.',
        C: 'Correct. Immotile cilia syndrome stops the mucociliary escalator, secretions accumulate and infection follows — and because the sperm flagellum shares the axoneme, the same patient may also be infertile.',
        D: 'Stereocilia are non-motile microvilli of the epididymis. A defect in them would show as a problem of male fertility, not of the airway, and it is worth noticing that the airway and the fertility clue point at the same axoneme by two different routes.',
      },
    },
    {
      key: 'absorptive-membranes-are-lined-with-9673ec52',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match absorption to the microvillous columnar cell.',
      explanations: {
        A: 'Cilia move material along a surface; they do not take it up. A ciliated epithelium is a transporting one, not an absorbing one.',
        B: 'Correct. Absorption needs surface area, and a tall cell carrying a carpet of microvilli is how the epithelium gets it.',
        C: 'Simple squamous epithelium is thin for diffusion and filtration, and its whole point is that it presents as little material as possible, not as much surface as possible.',
        D: 'A hedge, and unnecessary — option B is exactly right.',
      },
    },
    {
      key: 'actin-filaments-96a8b411',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived — both of them wrong answers about cilia and flagella — and the option naming microvilli, which is the answer, was lost along with a fourth. The stem also carries a stray apostrophe and both options a trailing table rule. A rescan should recover it; the four-option version of the same question is `actin-filaments-share-in-formation-of-a7ac37ec`, which is itself damaged.',
    },
    {
      key: 'actin-filaments-share-in-formation-of-a7ac37ec',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was swallowed by option B, which reads "Flagella. Mitotic spindle" — two options welded into one — leaving three labelled options where the contract wants four. The answer is microvilli, whose core is actin inserted into the terminal web. Recoverable by rescanning the page and splitting B.',
    },
    {
      key: 'basal-lamina-by-em-is-formed-of-two-layers-54e9bdc7',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Separate the two layers of the basal lamina from the two layers of the basement membrane.',
      explanations: {
        A: 'The basement membrane is the whole structure, of which the basal lamina is one part; a part cannot contain the whole. This option is the answer to the neighbouring question read backwards.',
        B: 'Correct. Within the basal lamina, electron microscopy shows an electron-lucent lamina lucida against the epithelial cell and an electron-dense lamina densa beneath it.',
        C: 'The lamina reticularis is the connective-tissue half of the basement membrane, not part of the epithelium\'s basal lamina. Pairing it with the lamina lucida mixes the two levels of the question.',
        D: 'Same error the other way round: the lamina densa is inside the basal lamina, so the two cannot be listed as siblings.',
      },
    },
    {
      key: 'basement-membrane-by-em-is-formed-of-two-layers-41978ed1',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the two layers of the basement membrane and the tissue that makes each.',
      explanations: {
        A: 'The lamina lucida is a subdivision of the basal lamina, so this pairs a structure with one of its own parts.',
        B: 'Same fault: the lamina densa also lies within the basal lamina.',
        C: 'Correct. The basement membrane is the epithelium\'s basal lamina — type IV collagen — plus the connective tissue\'s lamina reticularis of type III collagen, which is the reticular fibres.',
        D: 'A hedge, chosen when the two-level structure has become confusing. Option C is the book\'s own answer.',
      },
    },
    {
      key: 'cell-junction-that-prevent-leakage-passage-of-fluids-is-d3e03da8',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only — gap junction, zonula occludens, zonula adherens — against a contract of four to five, the fourth having been lost with the macula adherens. The answer is the zonula occludens. `cell-junction-that-restrict-passage-of-substances-in-between-f8ac48bc` asks the same thing with four options and is the copy to use.',
    },
    {
      key: 'cell-junction-that-restrict-passage-of-substances-in-between-f8ac48bc',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the junction that closes the route between adjacent cells.',
      explanations: {
        A: 'The gap junction does the opposite — it opens a route, though between the interiors of the cells rather than between them.',
        B: 'Correct. The zonula occludens fuses the two membranes at points and encircles the apex, so nothing passes down the intercellular space.',
        C: 'The zonula adherens leaves a wide intercellular space and holds the cells together across it. It adheres; it does not seal.',
        D: 'A hedge with no reason to be chosen — the zonula occludens answers the stem exactly.',
      },
    },
    {
      key: 'cell-membrane-modifications-mean-c8b42079',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Recognise that the apical specialisations are all modifications of the same membrane.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source key gives B, which cannot be right: A, B and C are each individually true — microvilli, cilia and flagella are all modifications of the cell membrane — so an option reading "all of the above" must be the answer. Selecting cilia alone would make two printed options false that are not.',
      explanations: {
        A: 'True, but not the whole answer. A microvillus is a finger of plasma membrane over an actin core.',
        B: 'True, but not the whole answer. A cilium is a process of plasma membrane over a microtubular axoneme.',
        C: 'True, but not the whole answer. A flagellum is the same arrangement as a cilium, far longer.',
        D: 'Correct. All three are the plasma membrane pushed outwards over a different cytoskeletal core, which is exactly what "membranous specialisation" names.',
      },
    },
    {
      key: 'centrioles-share-in-the-the-formation-of-the-following-excep-340fa48c',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Recall that the centriole makes microtubular structures, and that the microvillus is not one.',
      explanations: {
        A: 'True, so not the exception. The centrioles organise the mitotic spindle, which is microtubular.',
        B: 'The exception, and the answer. The microvillus has an actin core inserted into a terminal web, with no microtubules and no basal body, so nothing about it comes from a centriole.',
        C: 'True, so not the exception. A centriole duplicates, migrates apically and becomes the basal body of a cilium.',
        D: 'True, so not the exception. The flagellum has the same axoneme and the same basal-body origin as a cilium.',
      },
    },
    {
      key: 'cilia-1fb388d6',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four options are true as printed: "are motile structures on the surface of some epithelial cells" and "have 9+2 microtubule arrangement". A single-best-answer item with two correct options cannot be sat, and the source key names only the first. Extraction confidence on this row is low, so option D may have been printed with a different count — 9+3 or 9 triplets would make the question sound — and a rescan is the way to find out.',
    },
    {
      key: 'cilia-is-formed-of-4420f59e',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name all three parts of a cilium rather than stopping at the shaft.',
      explanations: {
        A: 'True, but not the whole answer. The basal body is the migrated centriole at the base, 27 microtubules in 9 triplets.',
        B: 'True, but not the whole answer. The shaft is the axoneme, 9 doublets plus 2 singlets.',
        C: 'True, but not the whole answer. The rootlets are 9 microtubules growing down into the cytoplasm from the C tubule of each basal-body triplet, and they anchor the cilium against its own beat.',
        D: 'Correct. All three, and the reason to know all three is that each has its own microtubule count — 27, 20 and 9 — and the exam asks for them separately.',
      },
    },
    {
      key: 'concerning-sterocilia-which-of-the-following-is-true-f304ebd1',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give both the function and the site of the stereocilium.',
      explanations: {
        A: 'True, but not the whole answer. Being a long microvillus, its job is to increase surface area for absorption.',
        B: 'True, but not the whole answer. The epididymis is where the book puts them, in the male genital system.',
        C: 'Correct. Both are true, and a student who takes the first true option has given half the answer.',
        D: 'Moving mucus is what a cilium does. A stereocilium is not motile at all, which is the single most examined fact about it.',
      },
    },
    {
      key: 'concerning-the-basement-membrane-one-statement-is-true-54a2a3ac',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give the basement membrane\'s position, and the origin of each of its two layers.',
      explanations: {
        A: 'True, but not the whole answer. It lies between the epithelium above and the connective tissue below, and supports the one on the other.',
        B: 'True, but not the whole answer. The basal lamina is the epithelial contribution — type IV collagen and glycoproteins made by the epithelial cells themselves.',
        C: 'True, but not the whole answer. The lamina reticularis is type III collagen laid down by the connective tissue.',
        D: 'Correct. The structure is made by two tissues from either side, which is why it has two layers and why naming which tissue made which layer is the question this material is always asked as.',
      },
    },
    {
      key: 'concerning-the-zonula-adherens-one-statement-is-true-f8ee5afc',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, and no answer printed. Worse, none of the three printed options is true of the zonula adherens — intermediate filaments and disc shape belong to the macula adherens and channels to the gap junction — so the correct option is the one that was lost. Unusable until the page is rescanned.',
    },
    {
      key: 'connexin-protein-is-found-in-0d4b2e5f',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only against a contract of four to five. The answer is the gap junction. Worth flagging separately: the department book never uses the word connexin, describing the channel only as six symmetrical transmembrane protein molecules, so even once rescanned this question asks for a term no source in this corpus supplies.',
    },
    {
      key: 'desmosome-macula-adherence-90dad123',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give the full electron-microscopic picture of a desmosome.',
      explanations: {
        A: 'True, but not the whole answer. The attachment plaque is a disc of electron-dense protein on the cytoplasmic face of each membrane.',
        B: 'True, but not the whole answer. Bundles of intermediate filaments — tonofilaments — are anchored into that plaque.',
        C: 'True, but not the whole answer. The wide intercellular space between the two plaques shows a dense midline where the transmembrane proteins of the two cells meet.',
        D: 'Correct. Plaque, intermediate filaments and midline are three parts of one picture, and the desmosome question is normally set as a picture rather than as a single fact.',
      },
    },
    {
      key: 'each-channel-in-gap-junction-is-formed-of-symmetrical-subuni-245337d0',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Easy',
      questionType: 'Normal values',
      learningObjective: 'State how many subunits form one gap-junction channel.',
      explanations: {
        A: 'Correct. Each channel is built of six symmetrical transmembrane protein molecules, which is the one number the book gives for this junction.',
        B: 'Eight is not a count the book gives anywhere in this chapter.',
        C: 'Nine is the ciliary number — nine doublets in the shaft, nine triplets in the basal body, nine rootlet microtubules — and it is picked when the numbers of this chapter run together.',
        D: 'Five is not a count the book gives.',
      },
    },
    {
      key: 'encircle-apex-of-cell-like-belt-715e6dd8',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Identify the junction that encircles the apex of the cell.',
      explanations: {
        A: 'Correct. The zonula occludens is the most apical junction and completely encircles the cell like a belt, which is what "zonula" means.',
        B: 'The zonula adherens is a belt too, which makes this a genuinely close call — but it lies below the occludens rather than at the apex, and the apical position is what the stem specifies.',
        C: 'A desmosome is a spot, not a belt: "macula" against "zonula" is exactly this distinction.',
        D: 'Gap junctions are patches of channels scattered on the lateral surface and encircle nothing.',
      },
    },
    {
      key: 'epithelial-tissue-is-distinguished-from-connective-tissue-mu-0dec34ad',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy',
      questionType: 'Comparison',
      learningObjective: 'Name the feature that identifies a tissue as epithelium.',
      explanations: {
        A: 'A large extracellular matrix is the mark of connective tissue. Epithelial cells are crowded with minimal intercellular space, which is the opposite.',
        B: 'Contractility belongs to muscle — and to the one epithelium modified for it, the myo-epithelium, which is why the option is not absurd.',
        C: 'Carrying action potentials is nerve. Neuro-epithelium receives a stimulus but does not conduct it.',
        D: 'Correct. Resting on a basement membrane is what all four classes of epithelium have in common and what none of the other tissues has.',
      },
    },
    {
      key: 'epithelial-tissue-that-can-resist-friction-would-have-many-cdf847f9',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Connect resistance to friction to the strongest junction.',
      explanations: {
        A: 'Correct. The desmosome is the strongest junction, and the book states it is abundant between the cells of stratified squamous epithelium precisely where the surface is subjected to friction.',
        B: 'Gap junctions communicate and contribute no mechanical strength at all.',
        C: 'Tight junctions seal. They stop material passing between the cells; they are not what holds the cells together when the surface is rubbed.',
        D: '"Basement junction" is not a structure. Hemidesmosomes attach the epithelium to the basement membrane, which resists being peeled off rather than being rubbed.',
      },
    },
    {
      key: 'fix-epithelium-to-basement-membrane-and-c-t-7f40e27f',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the structure that attaches the epithelium to the basement membrane.',
      explanations: {
        A: 'Correct. A hemidesmosome is half a desmosome on the basal surface of a basal cell, and it fixes the epithelium to the basement membrane and the connective tissue below.',
        B: 'The basement membrane is what the epithelium is being fixed to, not what does the fixing. It is the commonest wrong answer because the stem names it.',
        C: 'Basal infoldings increase surface area for transport; they attach nothing.',
        D: 'A desmosome joins two epithelial cells to each other. It is the whole of which the hemidesmosome is half, and the half is what faces the basement membrane.',
      },
    },
    {
      key: 'gap-junction-nexus-is-8e59691f',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Class the gap junction as communicating rather than occluding or adhering.',
      explanations: {
        A: 'Occluding is the zonula occludens, which seals rather than connects.',
        B: 'Adhering covers the two adherens junctions, which hold cells together mechanically and pass nothing.',
        C: 'Correct. The gap junction is the communicating junction — the only one of the four through which ions, small molecules and impulses actually pass.',
        D: 'The three categories are alternatives, and the gap junction belongs to exactly one of them.',
      },
    },
    {
      key: 'gap-junctions-189b5d79',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'State what a gap junction does and does not carry, and where else it is found.',
      explanations: {
        A: 'The channel is narrow and selective. Ions and small molecules cross it; large proteins do not, and this is the standard overstatement of what a gap junction does.',
        B: 'The classical junctional complex is three junctions — zonula occludens, zonula adherens and macula adherens — and the gap junction is the one left out.',
        C: 'Not exclusive to epithelium at all, and that is the point of the correct option: gap junctions between cardiac and smooth muscle cells carry the impulse.',
        D: 'Correct. Impulses pass through gap junctions at electrical synapses and between muscle cells, which is the same channel doing the same thing in a different tissue.',
      },
    },
    {
      key: 'glia-f-push-fiuids-in-one-direction-g-digestion-table-ill-4-6b50598a',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a question at all as extracted. The stem is the tail of one matching table welded to the head of another ("Glia f Push fiuids in one direction g. Digestion Table Ill 4. Tight junction a Intestinal cells 2. Adherens junction b. Narrow intercellular space"), and the options are three fragments of the second table, one carrying the start of a further item ("5, Junctional complex"). Nothing here can be reconstructed without the page; a rescan should yield two or three separate matching items.',
    },
    {
      key: 'help-absorption-in-male-genital-system-5ca9c8b7',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Place the stereocilium in the male genital tract and give its function.',
      explanations: {
        A: 'Correct. Stereocilia are long non-motile microvilli in the epididymis, and like all microvilli they increase surface area for absorption.',
        B: 'Cilia occur in the female genital tract, moving the ovum along the fallopian tube — the mirror-image fact, and the reason this option is tempting.',
        C: 'Microvilli absorb, but the book\'s named site for them is the intestine; in the male genital system the microvillus takes the long non-motile form and the name stereocilium.',
        D: 'The flagellum in the male genital system is the sperm tail, which moves the cell rather than absorbing anything.',
      },
    },
    {
      key: 'in-epithelia-a-junctional-complex-eb6a5c00',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The correct option is truncated mid-list — "Generally consists of three regions: zonula occludens, zonula" — so the answer cannot be read to its end and the third member is missing. The question is sound and is worth recovering; `junctional-complex-is-composed-of-the-following-except-666a174d` and `the-classical-description-of-a-junctional-complex-includes-t-fe68875c` cover the same ground intact in the meantime.',
    },
    {
      key: 'in-zonula-adherens-transmembrane-is-attached-to-filament-9223675e',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the filament anchored at the zonula adherens.',
      explanations: {
        A: 'Correct. Condensed proteins on the cytoplasmic side of the zonula adherens bind the junction to actin filaments.',
        B: 'Myosin is the motor that acts on actin, not the filament anchored at the junction. The book names actin here and nothing else.',
        C: 'Intermediate filaments belong to the macula adherens. Swapping the two adherens junctions is the single commonest error on this material.',
        D: 'There is a filament, and the answer is actin.',
      },
    },
    {
      key: 'inability-of-cilia-to-move-result-in-3bd32a99',
      conceptKey: 'immotile-cilia-cause-respiratory-infection-and-infertility',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Give the chain from immotile cilia through retained secretions to chronic infection.',
      explanations: {
        A: 'True, but not the whole answer. Bacteria grow in the secretions the cilia can no longer clear.',
        B: 'True, but not the whole answer. Repeated bacterial infection on retained secretions is what chronic respiratory infection means here.',
        C: 'Also true in life — the sperm flagellum has the same axoneme, so the same defect causes male infertility — but this option is not part of the source\'s combined answer, which pairs the two respiratory consequences.',
        D: 'Correct as the source has it. The bacterial infection and the chronic respiratory picture are one sequence, and naming only one of them describes half of it.',
      },
    },
    {
      key: 'intercellular-space-is-zero-in-36504471',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only — zonula adherens, zonula occludens, macula adherens — where the contract wants four; the gap junction option was lost. The answer is the zonula occludens, whose membranes fuse at points so that no space remains. `which-feature-is-characteristic-for-zonula-occludens-d97ff22a` tests the same fact with four options.',
    },
    {
      key: 'junction-complex-include-all-except-2c6c9238',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the junction excluded from the junctional complex.',
      explanations: {
        A: 'True, so not the exception. The tight junction is the most apical member of the complex.',
        B: 'True, so not the exception. The zonula adherens is the middle member.',
        C: 'True, so not the exception. The desmosome is the deepest member.',
        D: 'The exception, and the answer. The book recognises four lateral junctions and three members of the complex, and the gap junction is the one left out — it communicates rather than sealing or adhering.',
      },
    },
    {
      key: 'junctional-complex-are-e32cc69d',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract wants four, and the third is "all of the above", so the loss leaves an item with two substantive options and a hedge. The answer is that both are true — the complex is those three junctions, and it is found between the epithelial cells of the small intestine. Recoverable by rescanning.',
    },
    {
      key: 'junctional-complex-is-composed-of-the-following-except-666a174d',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that fascia adherens is not a member of the epithelial junctional complex.',
      explanations: {
        A: 'True, so not the exception. Zonula occludens is the first of the three.',
        B: 'True, so not the exception. Zonula adherens is the second.',
        C: 'The exception, and the answer. A fascia adherens is a band-shaped adhering junction of cardiac muscle, not one of the four lateral junctions of epithelium, and it is convincing here because it is built from the same two words as the two junctions that are.',
        D: 'True, so not the exception. Macula adherens — the desmosome — is the third member.',
      },
    },
    {
      key: 'junctional-complex-is-formed-of-three-types-of-junctions-47b3eeb9',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived, both of them lists of three junctions differing in the last member. The answer is A — zonula occludens, zonula adherens and macula adherens. A two-option item cannot be sat; a rescan should recover the other two.',
    },
    {
      key: 'lon-transporting-cells-are-characterized-by-16ecbb33',
      conceptKey: 'basal-infoldings-serve-ion-transport',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Connect basal infoldings and their mitochondria to active ion transport.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. Only A describes a structure the book attributes to ion-transporting cells: basal infoldings with mitochondria arranged vertically between them, whose energy drives the active transport. Lateral infoldings are not a structure the book names, and stereocilia and cilia are apical specialisations with no transport role.',
      explanations: {
        A: 'Correct. The infoldings multiply the basal membrane area available for transport, and the mitochondria stacked vertically between them supply the ATP on the spot. The kidney tubule cell is the book\'s example.',
        B: 'Lateral infoldings are not a specialisation the book names. The lateral surface carries junctions, not folds.',
        C: 'Stereocilia are apical, absorb passively and are found in the epididymis. Nothing about them transports ions.',
        D: 'Apical cilia move material across the surface. They face the lumen, which is the wrong end of the cell for a structure whose job is to move ions towards the blood.',
      },
    },
    {
      key: 'long-motile-structures-on-the-surface-of-some-epithelial-cel-ee364fb9',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name the motile process on the surface of an epithelial cell.',
      explanations: {
        A: 'Microvilli are short and do not move. They are the structure most often given a cilium\'s answer.',
        B: 'Correct. Cilia are the motile processes on the free surface of an epithelium, moving secretions and particles across it in one direction.',
        C: 'A flagellum is longer still and has the same axoneme, but in the human body there is exactly one — the sperm tail — and it moves the cell rather than sitting on an epithelial surface.',
        D: 'Stereocilia are long, which makes them tempting here, but they are non-motile microvilli.',
      },
    },
    {
      key: 'macula-adherence-desmosome-is-characterized-by-252781cf',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give the feature that identifies a desmosome and reject the three that belong to other junctions.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Only D is true of a desmosome: intermediate filaments anchored into the attachment plaques. Encircling the cell is the zonula, and passing ions and intercellular communication are the gap junction, so each of the other three options describes a different junction.',
      explanations: {
        A: 'Encircling the cell is what a zonula does. Macula means a spot, and the desmosome is scattered as discs rather than running round the cell.',
        B: 'Passing ions is the gap junction. A desmosome passes nothing at all — it is purely mechanical.',
        C: 'Intercellular communication is the gap junction again, stated the other way round.',
        D: 'Correct. Bundles of intermediate filaments are anchored into the dense cytoplasmic plaque on each side, which is what makes the desmosome the strongest junction.',
      },
    },
    {
      key: 'microtubules-share-in-the-formation-of-the-following-except-5f71c245',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Recall that the microvillus is the apical specialisation with no microtubules in it.',
      explanations: {
        A: 'True, so not the exception. The mitotic spindle is built of microtubules.',
        B: 'The exception, and the answer. A microvillus has a core of actin filaments inserted into the terminal web, and not one microtubule.',
        C: 'True, so not the exception. The ciliary shaft is nine doublets around two singlets.',
        D: 'True, so not the exception. A flagellum has the same axoneme as a cilium.',
      },
    },
    {
      key: 'microvilli-under-light-microscope-are-described-as-81667f54',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Give both light-microscopic names for a carpet of microvilli.',
      explanations: {
        A: 'True, but not the whole answer. Brush border is the usual name in the intestine.',
        B: 'True, but not the whole answer. Striated border is the same appearance under another name, used especially of the kidney tubule.',
        C: 'Correct. The two terms describe one appearance, and a question offering both separately is testing whether the student knows they are synonyms.',
        D: 'Microvilli are certainly visible in aggregate by light microscopy — it is only the individual microvillus that is not.',
      },
    },
    {
      key: 'movement-of-cilia-can-be-done-by-84c882f9',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective:
        'Answer this faculty\'s question from this faculty\'s source, while knowing that the wider literature gives dynein arms.',
      explanations: {
        A: 'Dynein arms are the accepted mechanism in the general literature, and they are what the concept record for the cilium states. They are not, however, in the department book, which attributes the beat to the bending of adjacent doublets and never names them — which is why the printed key rejects this option.',
        B: 'Nexin links hold neighbouring doublets together so that sliding becomes bending. The department book does not mention them either.',
        C: 'Radial spokes run from each doublet to the central pair. Again real, again absent from the department book.',
        D: 'The answer as this faculty keys it. The book gives the beat as the bending of adjacent doublets against one another and names no protein at all, so none of the three named structures is in the material the examiner set. Learn the department\'s answer for the paper and the dynein mechanism for everything after it — the disagreement is recorded on the concept.',
      },
    },
    {
      key: 'one-of-the-following-is-a-character-of-the-shaft-of-cilia-a-b7ad7d9c',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The first option has been swallowed by the stem, which reads "One of the following is a character of the shaft of cilia: a. increase the surface area for absorption", and the correct option has been welded onto the tail of option C ("Form the brush border in cells fining the intestine d Contain doublets of microtubules"). Three labelled options remain and the answer is inside one of them. The intact copy is `one-of-the-following-is-a-character-of-the-shaft-of-cilia-e03ad5f9`, which is the one to use.',
    },
    {
      key: 'permit-exchange-of-ions-passage-of-impulses-e96dc01c',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match ion exchange and impulse transmission to the gap junction.',
      explanations: {
        A: 'The tight junction stops movement between cells rather than permitting it.',
        B: 'The adherens junction holds cells together across a wide space and lets nothing through.',
        C: 'The desmosome is the strongest junction and the least permeable — a mechanical rivet.',
        D: 'Correct. The gap junction\'s six-subunit channels carry ions and small molecules between cell interiors, and impulses between muscle cells.',
      },
    },
    {
      key: 'pseudostratified-columnar-ciliated-epithelium-is-characteriz-09770e3a',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, and a surface-epithelium question at that. The answer is that all cells lie on the basement membrane, which is what makes a pseudostratified epithelium simple. Needs both a rescan and a `leaf` correction to Surface Epithelium.',
    },
    {
      key: 'regarding-transitional-epithelium-the-following-statement-is-a99becd0',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Recognise the junctional complex as the joining of the superficial cells of transitional epithelium.',
      explanations: {
        A: '5–30 layers is stratified squamous epithelium. Transitional is 6–8 layers when the bladder is empty and 3–4 when it is full.',
        B: 'The bladder\'s basement membrane is non-clear and thin; the thick, clear, wavy one belongs to the oesophagus, and this option is the oesophagus\'s answer given to the bladder.',
        C: 'Correct. The dome-shaped superficial cells are joined to one another by junctional complexes — zonula occludens, zonula adherens and macula adherens together — which is part of how the surface stays impermeable to urine.',
        D: 'Cilia move material along a surface. Nothing in the urinary tract needs sweeping, and the superficial cell\'s luminal specialisation is a rigid plaque, not a cilium.',
      },
    },
    {
      key: 'shaft-of-cilia-contains-a-peripheral-9-triplets-2-central-si-ee40eaf0',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has been absorbed into the stem, which reads "Shaft of cilia contains: a-Peripheral 9 triplets+2 central singlets", leaving three labelled options. The answer is 9 peripheral doublets plus 2 central singlets, and the option now sitting in the stem is the standard distractor — the basal body\'s triplets given to the shaft. A rescan restores it.',
    },
    {
      key: 'simple-columnar-ciliated-epithelium-is-found-in-1-0f21f5d6',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The fourth option has been welded onto the third — "Gastric secretory cells. 0. Trachea" — leaving three labelled options, and the stem carries a stray "1". The answer is the fallopian tube. It is also a surface-epithelium question rather than a specialisations one; both faults need fixing.',
    },
    {
      key: 'simple-columnar-ciliated-epithelium-is-found-in-c4826e89',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same question from a second book with the same damage — "Gastric secretory cells. d, Trachea" as one option — and the same two faults: three surviving options, and a surface-epithelium question filed under this leaf.',
    },
    {
      key: 'simple-columnar-epithelium-of-the-intestine-is-provided-with-bd66ef1e',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Give the apical specialisation of the intestinal absorptive cell.',
      explanations: {
        A: 'Cilia would sweep the contents along, which the intestine achieves by muscular contraction instead. The absorptive cell needs surface area, not motion.',
        B: 'Correct. Microvilli, seen by light microscopy as the striated or brush border, multiply the absorptive surface of the intestinal cell.',
        C: 'Stereocilia are long microvilli of the epididymis. The structure is nearly right and the site is wrong.',
        D: 'The only human flagellum is the sperm tail.',
      },
    },
    {
      key: 'stratified-columnar-ciliated-epithelium-can-be-found-in-633c1cd1',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a membranous specialisations question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question about where stratified columnar ciliated epithelium occurs — the fetal oesophagus — filed here on the word "ciliated". Its concept is declared on the Surface Epithelium leaf. Correct the bank\'s `leaf` field and it imports unchanged.',
    },
    {
      key: 'stratified-columnar-ciliated-epithelium-can-be-found-in-a-ut-b19b28e1',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same question from another book, with option A absorbed into the stem ("can be found in: : a, Uterus. b. Fallopian tubes") so that only three labelled options remain, and with no answer printed. It is also filed under the wrong leaf. The intact copy is `stratified-columnar-ciliated-epithelium-can-be-found-in-633c1cd1`, whose answer is the fetal oesophagus.',
    },
    {
      key: 'strongest-type-of-junction-c947aa1c',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the strongest of the four lateral junctions.',
      explanations: {
        A: 'The tight junction is the tightest seal, which is not the same as the strongest bond. It resists leakage, not traction.',
        B: 'The adherens junction does adhere, but across a wide space and onto actin, which is a lighter anchorage than the desmosome\'s.',
        C: 'Correct. The desmosome anchors intermediate filaments into a dense plaque on each side, and the book names it the strongest junction — which is why stratified squamous epithelium, the tissue that takes friction, is full of them.',
        D: 'The gap junction is a set of channels and contributes essentially no mechanical strength.',
      },
    },
    {
      key: 'the-absorptive-columnar-cells-area-characterized-by-presence-769797d3',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Give the defining apical feature of an absorptive columnar cell.',
      explanations: {
        A: 'The nucleus of a columnar cell is oval and basal, not apical and not flat — a flat nucleus belongs to a squamous cell.',
        B: 'The microvillus core is actin, and myosin is not what the book names in it. The option swaps the contractile partner for the structural one.',
        C: 'Correct. Apical microvilli, seen as a brush border, are what make the cell absorptive.',
        D: 'Cilia move material past a cell. An absorptive cell takes material in, which needs surface rather than motion.',
      },
    },
    {
      key: 'the-actin-filaments-form-the-core-of-the-microvilli-it-is-em-d17cbb9b',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the structure the actin core of a microvillus is anchored into.',
      explanations: {
        A: 'The basal body anchors a cilium, not a microvillus, and it is made of microtubules. This is the cilium\'s answer given to the microvillus.',
        B: 'The kinetochore is the attachment point of spindle microtubules on a chromosome — a mitotic structure with nothing to do with the apical surface.',
        C: 'Correct. The actin filaments of each microvillus run down into a mat of filaments beneath the apical membrane, the terminal web.',
        D: 'The centrosome is the microtubule organising centre near the nucleus, and it is the ancestor of the basal body rather than of anything in a microvillus.',
      },
    },
    {
      key: 'the-basement-membrane-one-of-the-following-is-false-8973190b',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Recall that both the epithelium and the connective tissue build the basement membrane.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source key marks B — "is composed of type IV collagen" — as the false statement, but that is true: the basal lamina is type IV collagen and glycoproteins. The statement that is actually false is D, that the basement membrane is produced by the connective tissue alone; the basal lamina is made by the epithelial cells and only the reticular lamina by the connective tissue. Keeping the printed key would teach a true statement as false.',
      explanations: {
        A: 'True, so not the false one. The basement membrane stains red with PAS and brown with silver, which is how it is seen at all by light microscopy.',
        B: 'True, so not the false one, although the printed key says otherwise. The basal lamina is type IV collagen with glycoproteins; the reticular lamina adds type III.',
        C: 'True, so not the false one. The basal lamina is the epithelial half of the basement membrane.',
        D: 'The false statement, and the answer. Two tissues build it from either side — the epithelium lays down the basal lamina and the connective tissue the reticular lamina — and "alone" is the word that makes the option false.',
      },
    },
    {
      key: 'the-classical-description-of-a-junctional-complex-includes-t-fe68875c',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name the three members of the junctional complex and reject an invented fourth.',
      explanations: {
        A: 'The exception, and the answer. There is no fascia occludens. It is manufactured from the vocabulary of the real junctions — fascia from fascia adherens, occludens from zonula occludens — and it is convincing for exactly that reason.',
        B: 'True, so not the exception. The zonula occludens is the most apical member.',
        C: 'True, so not the exception. The zonula adherens is the middle member.',
        D: 'True, so not the exception. The macula adherens, the desmosome, is the deepest.',
      },
    },
    {
      key: 'the-epithelial-cells-connect-to-the-basement-membrane-throug-803a6220',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the junction between an epithelial cell and the basement membrane.',
      explanations: {
        A: 'Gap junctions connect one cell to another cell, not a cell to a matrix.',
        B: 'A desmosome joins two epithelial cells. It is the right family, and the trap is that the answer is only half of it.',
        C: 'Correct. A hemidesmosome is half a desmosome facing the basement membrane instead of a neighbouring cell.',
        D: 'The zonula occludens is at the apex, sealing the space between cells. It is at the opposite end of the cell from the basement membrane.',
      },
    },
    {
      key: 'the-epithelium-is-characterized-by-cfcfcad0',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Recall the general characters of epithelium, including that its basement membrane may be clear or not.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Three of the four options state the negation of a character the book gives: epithelium has a high power of regeneration, minimal intercellular space, and is avascular because vessels cannot penetrate between its cells. Only D is true — the book states the basement membrane may be clear or not clear.',
      explanations: {
        A: 'The reverse of the truth: epithelium has a high power of regeneration, which is why a graze heals and why the gut lining can be renewed continuously.',
        B: 'Wide intercellular spaces are connective tissue. Epithelial cells are crowded with minimal space between them.',
        C: 'Epithelium is avascular — blood and lymph vessels cannot penetrate between its cells, though nerves can — and it is fed by diffusion from the connective tissue below.',
        D: 'Correct. Every epithelium rests on a basement membrane, and the book explicitly allows it to be clear, as in skin, or not clear, as in transitional epithelium.',
      },
    },
    {
      key: 'the-following-can-be-found-on-the-apical-surface-of-intestin-228b55bc',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Distinguish a microvillus from an intestinal villus and from the lateral and basal junctions.',
      explanations: {
        A: 'The best distractor on the page. A villus is a finger of the whole mucosa, visible to the naked eye, containing connective tissue and a blood supply; a microvillus is a projection of one cell\'s membrane. The question is asking about a cell surface, so the answer is the small one.',
        B: 'A hemidesmosome is on the basal surface, attaching the cell to the basement membrane — the opposite end of the cell.',
        C: 'A desmosome is on the lateral surface, joining the cell to its neighbours.',
        D: 'Correct. Microvilli are the apical specialisation of the intestinal absorptive cell, seen by light microscopy as the striated border.',
      },
    },
    {
      key: 'the-following-is-lined-with-simple-columnar-ciliated-epithel-719781d3',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C has been welded onto option B — "Ureter ©. Uterus" — leaving three labelled options, and no answer was printed. The answer is the uterus. The clean copy of the same question is `the-following-is-lined-with-simple-columnar-partially-ciliat-c55e4ac9`, which is itself filed under the wrong leaf.',
    },
    {
      key: 'the-following-is-lined-with-simple-columnar-partially-ciliat-c55e4ac9',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not a membranous specialisations question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A surface-epithelium question — which organ is lined by simple columnar partially ciliated epithelium, the answer being the uterus — filed here on the word "ciliated". Its concept is declared on the Surface Epithelium leaf. Correct the bank\'s `leaf` field and it imports unchanged.',
    },
    {
      key: 'the-following-statements-concerning-gap-junction-nexus-are-t-b3caecab',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Separate the gap junction\'s narrow bridged gap from the tight junction\'s membrane fusion.',
      explanations: {
        A: 'True, so not the exception. The channels link the interior of one cell directly to the interior of the next.',
        B: 'True, so not the exception. Ions and small molecules are exactly what passes.',
        C: 'True, so not the exception. At electrical synapses and between muscle cells the junction carries the impulse.',
        D: 'The exception, and the answer. Actual fusion of the two membranes is the zonula occludens. The gap junction leaves a narrow gap — hence the name — and bridges it with channels rather than closing it.',
      },
    },
    {
      key: 'the-followings-are-characters-of-c-t-except-0cd23978',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy',
      questionType: 'Comparison',
      learningObjective: 'Not a membranous specialisations question.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A connective-tissue question — its exception is that connective tissue is not one type of cell resting on a basement membrane — filed under this leaf because the basement membrane is mentioned in the distractor. It belongs to a connective tissue leaf, where another lane holds the concepts. Correct the bank\'s `leaf` field and it imports unchanged.',
    },
    {
      key: 'the-followings-are-free-surface-specialization-except-43978072',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'List the apical specialisations and recognise that a process is not one of them.',
      explanations: {
        A: 'True, so not the exception. Microvilli are apical.',
        B: 'True, so not the exception. Cilia are apical.',
        C: 'True, so not the exception. Stereocilia are apical, being long microvilli.',
        D: 'The exception, and the answer. Phagocytosis is something a cell does, not a structure on its surface, and the question is asking for structures. It is chosen by students who read the list as "things that happen at the free surface" rather than "specialisations of the free surface".',
      },
    },
    {
      key: 'the-junction-which-prevents-entrance-of-extracellular-substa-7644adf0',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the junction that bars the intercellular route.',
      explanations: {
        A: 'The gap junction lets things through, which is the opposite of what the stem describes.',
        B: 'The adherens junction leaves a wide intercellular space open and merely holds the cells together across it.',
        C: 'Correct. The occluding junction fuses the two membranes at points around the apex, so extracellular material cannot pass down between the cells.',
        D: 'The desmosome is a spot with a wide space around it, so it seals nothing — it is strong, not tight, and those are different properties.',
      },
    },
    {
      key: 'the-microvilli-containing-cells-in-functional-aspect-are-c3c07510',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Infer function from the presence of microvilli.',
      explanations: {
        A: 'Covering is what surface epithelium does generally, and it needs no microvilli — a simple squamous covering has none.',
        B: 'Stem cells divide to replace others. Nothing about a microvillus serves division.',
        C: 'A secretory cell exports material and is recognised by its granules and its rough endoplasmic reticulum, not by its surface area.',
        D: 'Correct. Microvilli exist to multiply surface area, and surface area is what absorption needs.',
      },
    },
    {
      key: 'the-strongest-type-of-junctions-is-fbdbf445',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the strongest junction, using its Latin name.',
      explanations: {
        A: 'Zonula occludens is the seal. Tightness against leakage is not mechanical strength.',
        B: 'Zonula adherens adheres, but anchors actin across a wide space and is the weaker of the two adherens junctions.',
        C: 'Correct. Macula adherens — the desmosome — anchors intermediate filaments into dense plaques and is the strongest of the four.',
        D: 'The gap junction is for communication and adds no strength.',
      },
    },
    {
      key: 'the-type-of-filament-inserted-in-the-dense-plaque-of-desmoso-1b97c63e',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the filament anchored in the desmosomal plaque.',
      explanations: {
        A: 'Thin filaments are actin, and actin is anchored at the zonula adherens. This is the swap the whole topic turns on.',
        B: 'Thick filaments are myosin, a muscle structure, and are not anchored at any epithelial junction.',
        C: 'Correct. Bundles of intermediate filaments — tonofilaments in an epithelial cell — insert into the dense attachment plaque of the desmosome.',
        D: 'Neurofilaments are the intermediate filaments of a nerve cell. Right class of filament, wrong cell entirely.',
      },
    },
    {
      key: 'the-type-of-filaments-present-in-macula-adherens-desmosome-i-6a59b00a',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only against a contract of four to five. The answer is intermediate filaments, or tonofilaments. `the-type-of-filament-inserted-in-the-dense-plaque-of-desmoso-1b97c63e` asks the same thing with four options and is the copy to use.',
    },
    {
      key: 'the-type-of-filaments-present-in-zonula-adherens-adhering-ju-92d37833',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, from the same run of items as the desmosome question above. The answer is actin filaments. `in-zonula-adherens-transmembrane-is-attached-to-filament-9223675e` asks the same thing with four options and is the copy to use.',
    },
    {
      key: 'these-are-motile-has-like-structures-on-surface-some-epithel-eaff59b2',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Identify the motile hair-like process of an epithelial surface.',
      explanations: {
        A: 'A flagellum is motile and hair-like, but there is one per cell and in humans only on the spermatozoon — not a covering of an epithelial surface.',
        B: 'Stereocilia look like hairs and are not motile at all, which is precisely the trap the name sets.',
        C: 'Correct. Cilia are the motile hair-like processes covering the free surface of a ciliated epithelium.',
        D: 'Microvilli are neither hair-like at light-microscope resolution nor motile; they appear as a continuous border.',
      },
    },
    {
      key: 'transitional-epithelium-is-characterized-by-e5408f84',
      conceptKey: 'junctional-complex-is-three-junctions-not-four',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options survived, the third trailing a stray "i", and no answer was printed. It is also a surface-epithelium question. The answer is the rigid luminal plaques of the dome-shaped superficial cells; the option calling the basement membrane well-defined is false, since the bladder\'s is non-clear. Needs a rescan and a `leaf` correction.',
    },
    {
      key: 'what-cell-surface-modification-is-made-of-microtubules-89068b2e',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only — microvilli, stereocilia, cilia — where the contract wants four; the fourth was almost certainly flagella. The answer is cilia. `microtubules-share-in-the-formation-of-the-following-except-5f71c245` tests the same distinction with four options.',
    },
    {
      key: 'what-of-the-following-facts-about-the-epithelial-tissue-is-t-9d579ce1',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Identify the basement membrane as the constant feature of epithelium.',
      explanations: {
        A: 'Epithelium is avascular. Vessels cannot penetrate between its cells, which is why it depends on diffusion from the connective tissue beneath.',
        B: 'Epithelium is a tissue in its own right, not a connective tissue fibre. The fibres are collagen, reticular and elastic.',
        C: 'Correct. Every epithelium rests on a basement membrane, and it is the feature that distinguishes epithelium from the tissues around it.',
        D: 'Transitional epithelium is stratified, not simple. The epithelium that looks stratified and is simple is the pseudostratified one, and this option swaps the two.',
      },
    },
    {
      key: 'which-feature-is-characteristic-for-zonula-occludens-d97ff22a',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give the electron-microscopic feature that identifies a tight junction.',
      explanations: {
        A: 'Correct. The two adjacent plasma membranes fuse at points through transmembrane proteins from each cell, which is what obliterates the space between them.',
        B: 'Cytokeratin is an intermediate filament, and intermediate filaments gather at the desmosome. This option describes the wrong junction.',
        C: 'The basal region is the wrong end of the cell: the zonula occludens encircles the apex, which is why anything entering must pass the seal first.',
        D: 'A dense intracellular plaque is the desmosome\'s attachment plaque. The zonula occludens has no plaque.',
      },
    },
    {
      key: 'which-of-the-following-specializations-are-described-in-the-ea8e61d9',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Connect stratified epithelium to the junction that resists friction.',
      explanations: {
        A: 'Microvilli belong to absorptive simple epithelia. A stratified epithelium exists to protect, and multiplying its surface area would work against that.',
        B: 'Cilia sit on simple and pseudostratified columnar epithelia. A stratified surface that is constantly abraded would not keep them.',
        C: 'Correct. Desmosomes are abundant between the cells of stratified squamous epithelium, because that is the tissue exposed to friction and the desmosome is the strongest junction.',
        D: 'Gap junctions occur widely but are not what the book singles out as the specialisation of stratified epithelium.',
      },
    },
    {
      key: 'which-of-the-following-statements-is-the-best-description-of-0a182387',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State the functional consequence of the tight junction rather than its structure.',
      explanations: {
        A: 'Correct. The seal is a barrier to free diffusion along the intercellular space, which is what makes an epithelium able to keep two compartments different from each other.',
        B: 'Exchange of small molecules and ions is the gap junction, and it is between cell interiors rather than along the space between them.',
        C: 'Anchoring the cell to the basement membrane is the hemidesmosome, at the opposite end of the cell.',
        D: 'Mechanical stability and resistance is the desmosome. Tight and strong are the two properties this topic keeps asking students to separate.',
      },
    },
    {
      key: 'which-structure-forms-the-brush-border-3c354a3a',
      conceptKey: 'microvillus-and-stereocilium-against-the-cilium',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the structure whose carpet is the brush border.',
      explanations: {
        A: 'Secretory granules sit inside the cell, in the apical cytoplasm. They are not on its surface and form no border.',
        B: 'The basal body is the base of a cilium, inside the cell. Its name makes it sound basal in position, which is a separate confusion worth clearing up: it lies in the apical cytoplasm.',
        C: 'Correct. A dense carpet of microvilli is resolved by the light microscope as a single brush or striated border.',
        D: 'Cilia are longer and are seen individually as a fringe, not as a solid border.',
      },
    },
    {
      key: 'which-type-of-cell-junction-shares-in-the-formation-of-barri-e8ea79f1',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the junction that makes an epithelium a barrier.',
      explanations: {
        A: 'The zonula adherens holds cells together across an open space, so material can still pass along it.',
        B: 'Correct. The zonula occludens is what turns a sheet of cells into a barrier, by closing the only route that goes round the cells rather than through them.',
        C: 'A fascia adherens is a cardiac muscle junction and is not part of the epithelial set at all.',
        D: 'The gap junction is a route, not a barrier.',
      },
    },
    {
      key: 'which-type-of-junction-is-located-more-near-apex-of-the-cell-0420e243',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Order the junctions from the apex of the cell downwards.',
      explanations: {
        A: 'The zonula adherens lies immediately below the tight junction, which makes it the closest wrong answer.',
        B: 'Correct. The tight junction is the most apical of the lateral junctions, which is what lets it seal everything below it off from the lumen.',
        C: 'Desmosomes are the deepest member of the junctional complex and are also scattered further down the lateral surface.',
        D: 'Gap junctions are not part of the complex and lie on the lateral surface without a fixed apical position.',
      },
    },
    {
      key: 'wide-inter-cell-space-show-dark-midline-e7eb4074',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Identify a desmosome from its electron-microscopic appearance.',
      explanations: {
        A: 'The tight junction has no intercellular space at the points of fusion, so it cannot show a midline in a space that is not there.',
        B: 'The zonula adherens does have a wide intercellular space, which makes this the real competitor — but the dense midline in the middle of that space is described of the desmosome, and the zonula adherens is distinguished instead by being a belt anchoring actin.',
        C: 'Correct. The desmosome shows a wide intercellular space with a dense midline where the transmembrane proteins of the two cells meet, flanked by an attachment plaque on each side.',
        D: 'The gap junction\'s space is narrow — that is what "gap" names — and it is crossed by channels rather than marked by a midline.',
      },
    },
    {
      key: 'chronic-respiratory-tract-infection-may-be-caused-by-abnorma-e07e980f',
      conceptKey: 'immotile-cilia-cause-respiratory-infection-and-infertility',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Trace chronic respiratory infection back to immotile cilia.',
      answerOverride: 'a',
      answerOverrideReason:
        'The 2020 paper printed no key and the highlight recovery does not cover that sitting, so the answer comes from the department book, which states in its own applied note that inability of the cilia to move results in bacterial infection on top of accumulated secretions, causing chronic respiratory infections.',
      explanations: {
        a: 'Correct. Cilia sweep mucus and trapped particles up out of the airway; when they cannot beat, the secretions sit still and bacteria grow in them, which is the mechanism the book gives for chronic respiratory infection.',
        b: 'Microvilli increase surface area for absorption and have an actin core with no motility at all. They are found in the small intestine, not the airway, so nothing they do could clear a secretion.',
        c: 'Neurofilaments are the intermediate filaments of neurons and are purely supportive. This option is here for a student who has learnt that cilia contain filaments without learning which.',
        d: 'The nuclear lamina is made of lamins, also intermediate filaments, and lies inside the nucleus against the inner nuclear membrane. It is as far from the apical surface of a respiratory cell as anything in the cell can be.',
      },
    },
    {
      key: 'the-communicating-type-of-junction-is-a60d9b6b',
      conceptKey: 'gap-junction-lets-ions-and-small-molecules-through',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the junction classed as communicating and say what it lets through.',
      answerOverride: 'c',
      answerOverrideReason:
        'No key was printed on the 2021 paper and none was recovered for that sitting, so the answer is taken from the department book, which names the gap junction the nexus or communicating junction and gives it as the only one of the four through which ions, small molecules and impulses pass.',
      explanations: {
        a: 'The tight junction is occluding: it fuses adjacent membranes into a belt round the apex of the cell precisely to stop substances passing between cells. It is the opposite of communicating.',
        b: 'The adherens junction is adhering. Its transmembrane proteins are joined across a wide space with the help of calcium and anchored to actin filaments, and it holds cells together without conducting anything.',
        c: 'Correct. Each channel of the gap junction is six symmetrical transmembrane protein molecules, and through them ions and small molecules move directly from one cytoplasm to the next — and impulses between muscle cells.',
        d: 'Desmosomes are the maculae adherentes, the strongest junction, anchoring intermediate filaments at scattered spots. Strength is what they provide, not passage.',
      },
    },
    {
      key: 'intermediate-filam-a-a-ae-9348dba3',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      // Excluded on the stem, not on the answer.
      //
      // Everything below is right and worth keeping: the recovered key resolves
      // this to option a, the department book agrees, and all four options are
      // identifiable under the scanner noise. What cannot be fixed by knowing
      // the answer is the question. The stem is "Intermediate filam : é a A ae"
      // — that is what a student would be shown, and no amount of correct
      // marking makes it sittable. Retyping it here would be writing a new
      // question and attributing it to the 2022 paper.
      //
      // A rescan of page 1 of that paper recovers it, and the analysis below
      // tells whoever does that what the row should say.
      exclude: true,
      excludeReason:
        'The stem is scanner-cut to "Intermediate filam : é a A ae" and three of '
        + 'four options carry stray characters ("Form lamins. () (", "forested '
        + 'Microvilli.", "Form mitotic spin ri | division."). The answer is not in '
        + 'doubt — the recovered key gives a, and the book lists lamins among the '
        + 'six intermediate filament proteins — but a question whose stem cannot '
        + 'be read is not a question. Rescan page 1 of the 2022 end-of-module '
        + 'paper; the explanations below are already written and correct.',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the lamins of the nuclear envelope as intermediate filaments, and keep microtubule and microfilament jobs off the class.',
      answerOverride: 'a',
      answerOverrideReason:
        'This row is covered by the recovered key: the highlight on the 2022 script resolves to option a with high confidence, and the department book agrees — lamins are the sixth of its six named intermediate filament proteins, sited in the nuclear envelope. The row is authored despite heavy scanner noise: the stem has been cut down to "Intermediate filam : é a A ae" and three of the four options carry stray characters ("Form lamins. () (", "forested Microvilli.", "Form mitotic spin ri | division."). Every option is still identifiable and the answer is keyed, so the row is kept rather than set aside — but the stem needs retyping before a student sees it, and a rescan of page 1 of the 2022 paper is the proper fix.',
      explanations: {
        a: 'Correct, and confirmed by the recovered key. Lamins make up the nuclear lamina against the inner nuclear membrane, and the department book lists them among the intermediate filament proteins alongside cytokeratin, vimentin, desmin, neurofilaments and glial fibrillar acidic protein.',
        b: 'Microvilli are formed by microfilaments — a core of actin inserted into the terminal web. The option is printed here as "forested Microvilli", which is "Form Microvilli" read badly.',
        c: 'The mitotic spindle is microtubular and is organised by the centrioles. Intermediate filaments have exactly one function in this book, support, and take no part in cell division.',
        d: 'Actin is the subunit of microfilaments. Intermediate filaments are the one system with chemically differing subunits — six of them, one per tissue — which is what makes identifying them useful in naming a tumour\'s cell of origin.',
      },
    },
    {
      key: 'concerning-zonula-occludens-occluding-junction-619cc1d9',
      conceptKey: 'zonula-occludens-seals-the-space-between-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the zonula occludens from a set that describes the other three junctions.',
      answerOverride: 'b',
      answerOverrideReason:
        'One of the strays the extractor could not file to a leaf; it is authored here because it is a lateral junction question. The 2022 paper printed no key for it and the highlight recovery returned nothing, so the answer comes from the department book: the tight or occluding junction is where two adjacent cell membranes fuse at certain points through transmembrane proteins, encircling the apex of the cell like a belt. The book also groups all four junctions as lateral specialisations, which is what makes option a false.',
      explanations: {
        a: 'The apical specialisations are cilia, flagella, microvilli and stereocilia. The zonula occludens sits at the apical end of the *lateral* membrane, and the book classes it with the lateral specialisations — a distinction of position against class that this option is built on.',
        b: 'Correct. The two membranes fuse at points via transmembrane proteins on each cell, and the belt of fusion is what restricts passage of substances between the cells.',
        c: 'Widely separated membranes describe the zonula adherens and the desmosome, where the gap is bridged by calcium-dependent proteins. Fusion and separation are opposite arrangements, and only one junction fuses.',
        d: 'Occurring as scattered spots is the macula adherens — macula means spot. The zonula occludens is a zonula, a belt, and encircles the cell completely.',
      },
    },
    {
      key: 'the-intercellular-space-in-macula-adherens-measures-0dd7cc14',
      conceptKey: 'zonula-adherens-against-macula-adherens',
      difficulty: 'Hard', questionType: 'Structural detail',
      learningObjective: 'Not sittable: no establishable answer.',
      explanations: {},
      exclude: true,
      excludeReason: 'The answer cannot be established from any source this faculty accepts. The row is intact — one of the strays the extractor could not file to a leaf, with four clean numeric options, Zero, 3 nm, 15-20 nm and 30 nm — but the 2021 paper printed no key, the highlight recovery does not cover that sitting, and the department book gives no measurement for the intercellular space of any junction: it says only that the macula adherens has a wide intercellular space, against the narrow gap of the gap junction and the fusion of the zonula occludens. The general literature is not agreed either, putting the desmosome gap at anything from 20 to 35 nm, so two of the four options are defensible. Excluded rather than authored to a guess. Recoverable if a marked script of the 2021 paper turns up, or if the department publishes a figure.',
    },
  ],
}
