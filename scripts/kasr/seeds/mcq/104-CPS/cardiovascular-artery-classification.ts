import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Histology Cardiovascular System — Artery Classification",
  modulePath: "104 CPS > Histology > Cardiovascular System > Arteries",
  articleId: "ART-104-HIS-ARTERIES-AND-VEINS",

  concepts: [
    {
      key: "artery-classification.elastic-muscular-and-arteriolar-types",
      label: "Arteries are classed as large elastic, medium muscular or small arterioles, distinguished chiefly by their tunica media",
      definition: "Arteries fall into three histological classes. Large elastic (conducting) arteries — the aorta and its large branches — carry blood from the heart; they have very wide lumina and thick walls, an intima with a thin, inconspicuous internal elastic lamina, and a thick media of 40 to 70 circularly arranged fenestrated elastic membranes (increasing with age) with some smooth muscle, collagen and proteoglycan. Medium-sized muscular (distributing) arteries, the most common type, deliver blood to organs; their intima carries a prominent internal elastic lamina that distinguishes them from elastic arteries, and their thick media is almost entirely circular smooth muscle with elastic fibres between the cells, often with a recognisable external elastic lamina. Small arteries (arterioles), the smallest branches of muscular arteries, regulate flow to the capillaries; their wall thins gradually with diameter — a thin subendothelium and a disappearing internal elastic lamina, only one or two smooth-muscle layers in the media, and a very thin, ill-defined adventitia.",
      objective: "Name the three histological classes of artery, give one example of each, and say what distinguishes their tunica intima and media.",
      pitfall: "Using the presence of an internal elastic lamina alone to separate the classes. All three have some form of it; what separates elastic from muscular arteries is that the muscular artery's IEL is prominent and distinct from the media, where the elastic artery's is not — its media is already made of the same elastic membranes.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > Arteries",
      type: "classification",
      aliases: ["Elastic artery", "Muscular artery", "Arteriole classification", "Types of arteries"],
    },
  ],

  questions: [
    {
      key: "all-characters-of-basilar-arteries-except-a2a3bf98",
      conceptKey: "artery-classification.elastic-muscular-and-arteriolar-types",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Recognise a muscular (medium-sized) artery's tunica intima and adventitia by its prominent internal elastic lamina and its only recognisable, not sharply clear, external elastic lamina.",
      explanations: {
        A: "True of a muscular artery, so not the exception. The book states that the internal elastic lamina is prominent in medium-sized muscular arteries — it is what distinguishes them from elastic arteries, whose IEL is thin and inconspicuous.",
        B: "True of a muscular artery's media, so not the exception — a thin tunica media is not what the book describes here; muscular arteries have a thick media of almost entirely circular smooth muscle.",
        C: "The exception, and the answer. The book describes a muscular artery's external elastic lamina as merely 'recognisable' in many muscular arteries, not as a sharply defined, 'clear' layer — that stronger description overstates what the book says. A common trap: using the presence of an internal elastic lamina alone to separate the classes.",
        D: "True of a muscular artery's adventitia, so not the exception — it is a thin, loose connective-tissue coat, in contrast to the thick media that dominates the wall.",
      },
    },
    {
      key: "all-characters-of-medium-arteries-except-724680ef",
      conceptKey: "artery-classification.elastic-muscular-and-arteriolar-types",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that medium (muscular) arteries carry more smooth muscle and less elastic tissue in their media than elastic arteries, not the reverse.",
      explanations: {
        A: "True, so not the exception. Muscular arteries supply most muscular and organ arteries — the book's own description of where this type is found.",
        B: "The exception, and the answer. The book states medium arteries have more smooth muscle fibres and less elastic fibres in the tunica media than elastic arteries — this option reverses that relationship. A common trap: using the presence of an internal elastic lamina alone to separate the classes.",
        C: "True, so not the exception. A prominent internal elastic lamina and a recognisable external elastic lamina are exactly what the book uses to identify a muscular artery.",
        D: "True, so not the exception. The tunica media, almost entirely circular smooth muscle, is the thickest layer of a medium artery's wall.",
      },
    },
    {
      key: "all-characters-of-medium-sized-artery-except-a1d1c716",
      conceptKey: "artery-classification.elastic-muscular-and-arteriolar-types",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a medium artery does not collapse and holds no blood after death, unlike a medium vein.",
      explanations: {
        A: "True of a medium artery, so not the exception — a thick wall around a narrow, rounded lumen is exactly how the book's own comparison table describes it, against a vein's wide, thin-walled lumen.",
        B: "The exception, and the answer. The book's comparison table gives collapsing and holding blood after death as the vein's characteristics; the medium artery's are the opposite — it does not collapse and has no blood in it after death. A common trap: using the presence of an internal elastic lamina alone to separate the classes.",
        C: "True, so not the exception. A clear internal elastic lamina and the absence of valves are both listed as artery, not vein, features.",
        D: "True, so not the exception. The book's table describes the artery's tunica intima as thick and rich in elastic fibres, in contrast with the vein's thin, elastic-poor intima.",
      },
    },
    {
      key: "is-the-commonest-type-of-arteries-00813a7c",
      conceptKey: "artery-classification.elastic-muscular-and-arteriolar-types",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name medium-sized (muscular) arteries as the book's stated commonest type of artery.",
      explanations: {
        A: "Large elastic arteries are limited to the aorta and its large branches — the book does not call these the commonest type.",
        B: "Correct. The book describes medium-sized muscular arteries as the most common type of artery, delivering blood to organs. A common trap: using the presence of an internal elastic lamina alone to separate the classes.",
        C: "Small arteries (arterioles) are the smallest branches of muscular arteries, regulating flow into capillaries — not the type the book calls commonest.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "the-thickest-layer-in-large-elastic-arteries-is-49c219c7",
      conceptKey: "artery-classification.elastic-muscular-and-arteriolar-types",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the tunica media, with its 40-70 fenestrated elastic membranes, as the thickest layer of a large elastic artery's wall.",
      explanations: {
        A: "Tunica intima is described as the thinnest layer of a large elastic artery such as the aorta, not the thickest.",
        B: "Correct. The book describes the tunica media of a large elastic artery as the thickest layer, formed of 40 to 70 circularly arranged fenestrated elastic membranes. A common trap: using the presence of an internal elastic lamina alone to separate the classes.",
        C: "Tunica adventitia is a thin, loose connective-tissue coat in a large elastic artery — not the thickest layer.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "all-characters-of-t-media-except-6df57b9b",
      conceptKey: "artery-classification.elastic-muscular-and-arteriolar-types",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the aorta's tunica media, not its intima, is where the 40-70 fenestrated elastic membranes lie.",
      explanations: {
        A: "True of the aorta's tunica media, so not the exception — the book describes numerous fenestrated elastic membranes as its main component.",
        B: "True, so not the exception. The book states these membranes number 40 to 70 circularly arranged layers in adults, and increase with age.",
        C: "True, so not the exception. The book states the fenestrae in these elastic layers are important to facilitate substance diffusion.",
        D: "The exception, and the answer. This describes the tunica intima, not the tunica media — the intima is loose connective tissue and, in the aorta specifically, the book states its internal elastic lamina is not prominent, the opposite of the media's own thick, elastic-membrane-dominated structure. A common trap: using the presence of an internal elastic lamina alone to separate the classes.",
      },
    },
  ],
}
