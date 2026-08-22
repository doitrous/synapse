import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Cytogenetics — Cell Cycle Phase Details",
  modulePath: "104 CPS > Histology > Cytogenetics > The Cell Cycle",
  articleId: "ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH",

  concepts: [
    {
      key: "cell-cycle.phases-g1-s-g2-m-and-g0",
      label: "The cell cycle is mitosis plus a three-phase interphase, with a G0 stable phase for cells that have left the cycle",
      definition: "The cell cycle is a series of events within the cell that prepare it for division into two daughter cells, recognised in two phases. Mitosis is the period of division itself, changes visible by microscope, lasting about one hour. Interphase is the period between two successive divisions, changes not detectable by microscope, lasting about 20 hours in rapidly dividing cells, and subdivided into three phases. Gap 1 (G1), about 8 hours: the daughter cell's nucleus holds 46 single chromosomes (s-chromosomes, or chromatids); the cell grows and acquires energy as ATP; RNA and protein synthesis needed for DNA duplication occurs; and the cell becomes a specialised working cell — the more specialised, the longer G1 and the lower the rate of division. Synthesis (S), about 8 hours: DNA duplicates, so each cell now holds 46 double (d-) chromosomes, and the centrioles duplicate. Gap 2 (G2), about 4 hours: RNA and proteins essential for division are synthesised, energy for mitosis is stored, tubulin is made to build the mitotic microtubules, and any DNA replication error is corrected. Cells that have left the cycle are said to be in the stable, or G0, phase — a resting stage outside the cycle in which most specialised working cells spend a prolonged G1.",
      objective: "Name the cell cycle's phases in order, state the chromosome number and type at G1 versus S, and define G0.",
      pitfall: "Confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
      subject: "fnd",
      primary: "DIS-HIS-T01",
      secondary: [],
      modulePath: "104 CPS > Histology > Cytogenetics > The Cell Cycle",
      type: "mechanism",
      aliases: ["Interphase", "G0 phase", "G1, S and G2 phases"],
    },
  ],

  questions: [
    {
      key: "gap-1-phase-is-characterized-by-d374ecc7",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that G1 is when the daughter cell grows in size and acquires energy.",
      explanations: {
        A: "Lasting about 4 hours is what the book states of G2, not G1 (G1 lasts about 8 hours).",
        B: "Containing 46 double chromosomes (d-chromosomes) describes the state after S phase, not G1, where the cell still has 46 single chromosomes (chromatids).",
        C: "Correct. The book lists cell growth and acquiring energy (ATP) among G1's own characteristics, alongside RNA/protein synthesis and cells becoming specialised. A common trap: confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
        D: "Duplication of DNA and of the centriole are S-phase events, not G1's.",
      },
    },
    {
      key: "all-characters-of-mitosis-except-643938b7",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "State that mitosis's changes are visible under the microscope, not undetectable — that description belongs to interphase.",
      explanations: {
        A: "True of mitosis, so not the exception. It is the period in which the cell divides into two daughter cells.",
        B: "True, so not the exception. Mitosis is made of the four stages the book names, starting with prophase.",
        C: "The exception, and the answer. The book states mitosis's changes ARE visible with the microscope; it is interphase, the period between divisions, whose changes cannot be detected with the microscope. A common trap: confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
        D: "True, so not the exception. The book states mitosis lasts for a short period, about one hour.",
      },
    },
    {
      key: "synthesis-of-for-building-its-required-for-mitosis-02ca0e2f",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "State that tubulin, synthesised in G2, is what builds the microtubules mitosis requires.",
      explanations: {
        A: "DNA is duplicated during S phase, not synthesised in G2 to build microtubules.",
        B: "RNA and protein synthesis in G2 supports the essentials of division generally, but the specific molecule built into microtubules is tubulin, a distinct G2 event the book names separately.",
        C: "Energy storage for mitosis is a separate G2 characteristic from tubulin synthesis, and does not itself build microtubules.",
        D: "Correct. The book states that in G2, tubulin is formed to build the microtubules required for mitosis. A common trap: confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
      },
    },
    {
      key: "tubulin-is-synthesized-in-b98e6a5a",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that tubulin, for building mitotic microtubules, is synthesised in G2.",
      explanations: {
        A: "S phase is when DNA and the centriole duplicate, not when tubulin is synthesised.",
        B: "Correct. The book states that in G2, tubulin is formed to build the microtubules required for mitosis. A common trap: confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
        C: "G1 is characterised by cell growth, energy acquisition and RNA/protein synthesis for DNA duplication, not tubulin synthesis specifically.",
        D: "Prophase is a mitotic stage that uses the already-synthesised tubulin to build the spindle, not the phase where tubulin itself is made.",
      },
    },
    {
      key: "duplication-of-the-centrioles-occurs-at-6f1f4942",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that centriole duplication happens in S phase, alongside DNA duplication.",
      explanations: {
        A: "G1 is when the cell grows and prepares for DNA duplication, before S phase's actual duplication events.",
        B: "Correct. The book states that S phase is characterised by duplication of DNA (so each cell contains 46 d-chromosomes) and duplication of centrioles. A common trap: confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
        C: "G2 follows S phase, synthesising RNA/protein and tubulin for division — not where duplication of the centriole itself happens.",
        D: "G0 is the resting phase outside the active cycle, where no duplication occurs at all.",
      },
    },
    {
      key: "synthesis-phase-is-characterized-by-c3e187d1",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that S phase is characterised by duplication of DNA and the centriole.",
      explanations: {
        A: "Lasting about 4 hours is the book's stated duration for G2, not S phase (which the book gives as about 8 hours).",
        B: "Correct. The book states S phase is characterised by duplication of DNA, giving each cell 46 d-chromosomes, and duplication of the centrioles. A common trap: confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.",
        C: "Synthesising RNA, protein and storing energy for mitosis are G2's characteristics, not S phase's.",
        D: "Synthesising tubulin is a G2 event, not an S-phase one.",
      },
    },
    {
      key: "the-more-the-specialized-the-cell-the-g1-phase-the-rate-of-d-fc019d05",
      conceptKey: "cell-cycle.phases-g1-s-g2-m-and-g0",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that a more specialised cell has a longer G1 and a lower rate of division.",
      explanations: {
        A: "The book pairs a longer G1 with a lower, not higher, rate of division for a more specialised cell.",
        B: "Correct. The book states directly: 'The more specialized cell, the longer G1-phase & less rate of division.' The mechanism is that G1 is when a cell carries out its specialised working function rather than preparing to divide, so a cell doing more specialised work spends longer there before committing to another round of DNA synthesis. The thing worth remembering: G1's length is not fixed like S or G2's — it is the one phase whose duration tracks how differentiated the cell already is, from a highly dividing stem cell at one end to a non-renewing neuron effectively frozen in an extended G1 at the other.",
        C: "The book's relationship runs the other way — a longer G1, not a smaller one, goes with greater specialisation.",
        D: "Both halves of this pairing are wrong: the book pairs greater specialisation with a longer G1 and a lower rate of division, not a smaller phase and smaller rate change in this direction.",
      },
    },
  ],
}
