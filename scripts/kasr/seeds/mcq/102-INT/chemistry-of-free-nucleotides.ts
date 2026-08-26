/**
 * `102 INT > Biochemistry > Chemistry of Free Nucleotides` — the question
 * books' MCQs.
 *
 * Twelve rows, triaged against the department book's own chapter
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * p66-p72). Eight rows keep their printed answer key. Two need an override
 * the book itself supplies: `p50-q1` has no printed key at all, but the
 * book's own purine list and its base/nucleoside/nucleotide naming table
 * settle that adenine is a purine base; `p51-q9`'s two OCR passes of the
 * printed key disagreed between (a) and (d), and the same naming table
 * settles it as (d) — Uridine is the nucleoside, not the nucleotide (UMP).
 * Two rows are excluded: `p50-q4` has its options (d) and (e) corrupted by a
 * different question's stem and options bleeding in via OCR, and `p50-q7`
 * asks about the phosphodiester bond linking adjacent nucleotides in a
 * chain — a fact this chapter's own seven pages never state; it belongs to
 * the following "Chemistry of Nucleic Acids" chapter instead (physical p73:
 * "the nucleotides are linked together by phosphodiester bonds").
 *
 * Three concepts cover the ten sittable rows, none reused from the existing
 * 102 INT catalogue: neither `nucleotide-coenzyme-hydrogen-carriers` nor
 * `free-nucleotide-biological-functions` is what any of these ten rows
 * actually tests (no row asks about NAD+/FAD-style coenzymes or about
 * matching a nucleotide derivative to its biological role) — reusing either
 * would misdescribe what the question is teaching, so both stay unused here.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Chemistry of Free Nucleotides',
  modulePath: '102 INT > Biochemistry > Chemistry of Free Nucleotides',
  articleId: 'ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES',

  concepts: [
    {
      key: 'nucleotide-hydrolysis-hierarchy-and-naming',
      label:
        "Hydrolysis breaks a nucleotide down to a nucleoside plus phosphate, and a nucleoside down to its nitrogenous base plus pentose; the book names each base, nucleoside and nucleotide by a fixed table (Adenine→Adenosine→AMP, Uracil→Uridine→UMP, and so on)",
      definition:
        "Nucleotides are the building units of DNA and RNA. Hydrolysis breaks a nucleotide into a nucleoside plus phosphate, and a nucleoside into a nitrogenous base plus a pentose. The nitrogenous bases split into purines (adenine, guanine) and pyrimidines (cytosine, uracil, thymine); the pentose is ribose, or 2-deoxyribose in DNA nucleotides only. The book names each base, its nucleoside, and its nucleotide by a fixed table: Adenine/Adenosine/Adenosine monophosphate (AMP), Guanine/Guanosine/Guanosine monophosphate (GMP), Xanthine/Xanthosine/Xanthosine monophosphate (XMP), Hypoxanthine/Inosine/Inosine monophosphate (IMP), Cytosine/Cytidine/Cytidine monophosphate (CMP), Uracil/Uridine/Uridine monophosphate (UMP), and Thymine/Thymidine/Thymidine monophosphate (TMP).",
      objective:
        "State the hydrolysis hierarchy nucleotide→nucleoside→base+sugar, classify a named base as purine or pyrimidine, and use the book's naming table to move between a base, its nucleoside and its nucleotide.",
      pitfall:
        "Treating 'nucleoside' and 'nucleotide' as interchangeable, or assuming a compound's name settles which one it is without checking the table. A nucleoside (e.g. Adenosine, Uridine) is base+sugar only; only adding phosphate turns it into the corresponding nucleotide (e.g. AMP, UMP) — the book's naming table is what fixes which is which.",
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Free Nucleotides',
      type: 'classification',
      aliases: ['Purine', 'Pyrimidine', 'Nucleoside', 'Base-sugar-phosphate hierarchy'],
    },
    {
      key: 'nucleotide-and-nucleoside-structural-linkages',
      label:
        "The base attaches to the pentose by an N-glycosidic bond, phosphate esterifies to the pentose's 5' carbon, and only DNA nucleotides use 2-deoxyribose in place of ribose",
      definition:
        "Each nucleoside is formed of a nitrogenous base and a pentose, where C1' of the pentose forms an N-linked glycoside with N1 of a pyrimidine or N9 of a purine — the glycosidic bond. Each nucleotide adds a phosphate group, usually attached by an ester bond to the terminal alcohol group of the pentose, the 5' hydroxyl group — so the phosphate is esterified at C5. Deoxynucleosides or deoxynucleotides contain 2-deoxyribose as their pentose instead of ribose, and their names are preceded by 'deoxy' (or the letter d), e.g. dCMP. Because thymine is present only in DNA and uracil only in RNA, a thymine-containing nucleotide always carries 2-deoxyribose, while a uracil-containing nucleotide always carries ribose; cytosine and adenine, present in both nucleic acids, can pair with either sugar.",
      objective:
        "Name the glycosidic bond as the base-to-sugar linkage, the ester bond at C5 as the sugar-to-phosphate linkage, and state which pentose (ribose or 2-deoxyribose) a nucleotide carries based on its base and whether it belongs to RNA or DNA.",
      pitfall:
        "Assuming every base can be found paired with either ribose or deoxyribose. The book restricts thymine to DNA (so always deoxyribose) and uracil to RNA (so always ribose); only cytosine and adenine are named as present in both nucleic acids and so can appear with either sugar.",
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Free Nucleotides',
      type: 'mechanism',
      aliases: ['Glycosidic bond', "5' phosphate ester bond", 'Deoxyribose', 'Ribose'],
    },
    {
      key: 'nucleotide-full-composition-in-named-examples',
      label: 'A nucleotide is base + pentose + phosphate; applying this, uridylic acid is uracil + ribose + phosphate, and ATP is itself a nucleotide (adenine + ribose + three phosphates)',
      definition:
        "Each nucleotide is formed of a nitrogenous base, a pentose, and phosphate. Applying this definition to named compounds: uridylic acid is Uridine monophosphate (UMP), composed of uracil, ribose and phosphate. ATP (adenosine triphosphate) is likewise a nucleotide, built from the base adenine, the sugar ribose, and — in its case — three phosphate groups rather than one; the book introduces ATP, ADP and AMP together under free nucleotides' energy-transduction role, describing the bonds between the phosphate groups as high-energy bonds.",
      objective: "Apply the base+pentose+phosphate definition of a nucleotide to name what a specific compound (uridylic acid, ATP) is composed of, and classify ATP itself as a nucleotide.",
      pitfall:
        "Assuming a compound with more than one phosphate, like ATP, must belong to some other category than 'nucleotide.' The book's definition of a nucleotide does not cap the phosphate count at one — ATP, ADP and AMP are all discussed together as forms of the same nucleotide, differing only in how many phosphates they carry.",
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Free Nucleotides',
      type: 'definition',
      aliases: ['Uridylic acid', 'UMP', 'ATP'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p50-q1',
      conceptKey: 'nucleotide-hydrolysis-hierarchy-and-naming',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: "Classify adenine as a purine base, and distinguish it from its nucleoside (Adenosine) and nucleotide (AMP) forms.",
      answerOverride: 'a',
      answerOverrideReason:
        "No printed key survived for this row (correctSource: \"none\"). The book's own nitrogenous-bases section classifies adenine directly: \"Adenine and Guanine are the two main purines that are present in the structure of nucleic acids\" (physical p67), and its naming table (physical p68) lists Adenine only as the base, with Adenosine as its nucleoside and AMP as its nucleotide — so adenine itself is a purine base, not a nucleoside or nucleotide.",
      explanations: {
        a: 'Correct. The book classifies adenine, with guanine, as one of the two main purines. Its own naming table confirms adenine is the base — Adenosine is the nucleoside built from it, and AMP is the nucleotide.',
        b: "The book's pyrimidine bases are cytosine, uracil and thymine; adenine is explicitly grouped with guanine among the purines instead.",
        c: "A nucleoside adds a pentose sugar to the base. The book's naming table shows adenine's nucleoside is Adenosine, a distinct name — adenine itself remains just the base.",
        d: "A nucleotide adds sugar and phosphate to the base. The book's naming table shows adenine's nucleotide is AMP, a distinct name — adenine itself is only the base.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p50-q2',
      conceptKey: 'nucleotide-hydrolysis-hierarchy-and-naming',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define a nucleoside as base plus pentose sugar.',
      explanations: {
        a: 'Correct. The book defines a nucleoside as formed of a nitrogenous base and a pentose — base plus sugar, nothing more.',
        b: 'A nucleoside has no phosphate at all; base-plus-phosphate without a sugar does not match the book\'s definition of any of the three building units.',
        c: "Base-sugar-phosphate is the book's definition of a nucleotide, one step further than a nucleoside — the nucleoside itself lacks the phosphate.",
        d: "Sugar-phosphate omits the base entirely; the book's nucleoside always includes the nitrogenous base as one of its two parts.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p50-q3',
      conceptKey: 'nucleotide-and-nucleoside-structural-linkages',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: "State that the phosphate group of a nucleotide is esterified to the 5' carbon of the pentose.",
      explanations: {
        a: "C1' is where the base attaches to the pentose by a glycosidic bond, not where the phosphate esterifies.",
        b: "C3' carries a free hydroxyl in the mononucleotide, but it is not where this chapter's single-nucleotide phosphate ester bond forms.",
        c: "C4' is part of the pentose ring itself, not the site of the phosphate ester bond.",
        d: "Correct. The book states the phosphate group is usually attached by ester bond to the terminal alcohol group of the pentose, termed the 5' hydroxyl group — so the linkage is at C5.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p50-q4',
      conceptKey: 'excluded.nucleotides.option-set-corrupted-by-ocr',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option set corrupted by OCR (bank flags "option ran on"). Option (d)\'s legitimate content, "Hexose," runs directly into an unrelated question\'s stem and options ("5S. Identify the purine base of nucleic acids in the following: a) Cytosine b) Thymine"), and option (e), "Uracil d) Adenine," is nothing but that other question\'s remaining two choices. Option (e) is not a genuine fifth choice for this stem at all.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p50-q6',
      conceptKey: 'nucleotide-and-nucleoside-structural-linkages',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify uracil as the base the book restricts to RNA, and so to ribose, unlike cytosine and adenine which appear in both nucleic acids.',
      explanations: {
        a: 'The book states thymine is present only in DNA, so a thymine nucleotide always carries 2-deoxyribose, never ribose.',
        b: 'Correct. The book states uracil is present only in RNA, so a uracil nucleotide always carries ribose, never deoxyribose — the only one of these four bases the book restricts to RNA alone.',
        c: 'The book lists adenine among the purines present in the structure of both nucleic acids (RNA and DNA), so an adenine nucleotide is not uniquely tied to ribose the way uracil\'s is.',
        d: 'The book states cytosine is present in both nucleic acids, so, like adenine, a cytosine nucleotide can carry either ribose or deoxyribose depending on which nucleic acid it is part of.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p50-q7',
      conceptKey: 'excluded.nucleotides.phosphodiester-bond-out-of-chapter-range',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not taught within this chapter\'s page range. This chapter\'s physical p66-p72 text never mentions the phosphodiester bond that links adjacent nucleotides into a chain — that fact belongs to the following "Chemistry of Nucleic Acids" chapter (physical p73: "In each strand, the nucleotides are linked together by phosphodiester bonds"). The printed key is plausibly right, but grounding the correct-option explanation in this leaf\'s own chapter text is not possible, so it is excluded rather than sourced from an adjacent chapter.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p51-q8',
      conceptKey: 'nucleotide-hydrolysis-hierarchy-and-naming',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify cytosine as a pyrimidine base, as distinct from the purines guanine and adenine.',
      explanations: {
        a: "Correct. The book's major pyrimidines are cytosine, uracil and thymine — cytosine is the only one of these four options that appears on that list.",
        b: "Hypoxanthine appears only in the book's nucleoside/nucleotide naming table (as the base for Inosine/IMP), not among the major purines or pyrimidines it names directly.",
        c: "Guanine is explicitly one of the book's two main purines, not a pyrimidine.",
        d: "Adenine is the other of the book's two main purines, not a pyrimidine.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p51-q9',
      conceptKey: 'nucleotide-hydrolysis-hierarchy-and-naming',
      difficulty: 'Challenging',
      questionType: 'Classification',
      learningObjective: "Use the book's base/nucleoside/nucleotide naming table to classify Uridine precisely as a nucleoside, resolving a row where the two OCR passes of the printed key disagreed.",
      answerOverride: 'd',
      answerOverrideReason:
        "The two OCR passes of the printed key disagreed between (a) and (d). The book's own naming table (physical p68) settles it: Uracil is listed as the base, Uridine as its nucleoside, and Uridine monophosphate (UMP) as its nucleotide — three distinct names for three distinct things. Since the row asks about \"Uridine\" specifically, and the table places Uridine in the nucleoside column (not the nucleotide column, which is UMP), the correct answer is (d).",
      explanations: {
        a: 'Nucleotide is the book\'s name for the phosphorylated form — Uridine monophosphate (UMP), not Uridine itself. The naming table keeps Uridine (nucleoside) and UMP (nucleotide) as two distinct entries.',
        b: "Uridine is a nucleoside built from a pyrimidine base (uracil), but the term 'pyrimidine' in the book's own scheme names the base category, not the nucleoside built from it — a precision the naming table insists on.",
        c: 'Uracil-derived compounds belong to the pyrimidine family in the book\'s classification, never the purine family.',
        d: "Correct. The book's naming table lists Uridine specifically under the 'NUCLEOSIDES' column, built from the base Uracil, and distinct from the nucleotide UMP.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p51-q10',
      conceptKey: 'nucleotide-hydrolysis-hierarchy-and-naming',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify Adenosine as a purine nucleoside, built from the purine base adenine.',
      explanations: {
        a: 'Cytosine is a pyrimidine base, not a nucleoside, and not a purine.',
        b: "Adenine is the purine base itself, not its nucleoside; the book's naming table gives Adenine's nucleoside a separate name, Adenosine.",
        c: "Correct. The book's naming table pairs the purine base Adenine with the nucleoside Adenosine — a purine nucleoside.",
        d: 'Uracil is a pyrimidine base, not a nucleoside, and not a purine.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p51-q11',
      conceptKey: 'nucleotide-and-nucleoside-structural-linkages',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the glycosidic bond as the linkage between a nitrogenous base and its pentose sugar.',
      explanations: {
        a: "Correct. The book states that C1' of the pentose forms an N-linked glycoside with N1 of a pyrimidine or N9 of a purine — a glycosidic bond.",
        b: "An amide bond is not how the book describes the base-sugar link; that describes the peptide-bond-forming reaction of amino acids, a different chapter's chemistry.",
        c: 'Hydrogen bonds hold the two strands of a double helix together, a different chapter\'s topic; the base-to-sugar link within one nucleoside is covalent, not hydrogen bonding.',
        d: 'A phosphoanhydride bond is what links the phosphate groups of a compound like ATP to each other, not what links the base to the sugar.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p51-q12',
      conceptKey: 'nucleotide-full-composition-in-named-examples',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Apply the nucleotide definition (base + pentose + phosphate) to name uridylic acid\'s three components.',
      explanations: {
        a: "Uracil alone is only the base; uridylic acid (UMP) is the full nucleotide, which per the book's definition needs a pentose and phosphate as well.",
        b: 'Uracil and ribose together describe Uridine, the nucleoside — one step short of uridylic acid, which per the book\'s definition also carries a phosphate.',
        c: 'Ribose and phosphate without the base omits the nitrogenous base that gives uridylic acid its identity as a uracil-containing compound.',
        d: "Correct. Uridylic acid is Uridine monophosphate (UMP), and the book defines a nucleotide as base + pentose + phosphate — here, uracil, ribose and phosphate.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p51-q13',
      conceptKey: 'nucleotide-full-composition-in-named-examples',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify ATP as a nucleotide, built from adenine, ribose and phosphate groups.',
      explanations: {
        a: 'A nucleoside lacks phosphate entirely (base + sugar only); ATP carries three phosphate groups, well past the nucleoside stage.',
        b: 'Correct. The book introduces ATP alongside ADP and AMP as forms of the adenine nucleotide, differing only in phosphate count — ATP fits the book\'s base + pentose + phosphate definition of a nucleotide, with three phosphates.',
        c: "ATP is not a vitamin anywhere in the book's account; it is discussed purely as a nucleotide serving an energy-transduction role.",
        d: 'A nucleic acid (DNA or RNA) is a polymer of many nucleotides linked together; ATP is a single free nucleotide, not a polymer.',
      },
    },
  ],
}
