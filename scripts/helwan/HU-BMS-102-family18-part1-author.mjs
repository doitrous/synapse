import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = join(process.cwd(), 'docs/Helwan-Source-Imports')
const carrier = 'src_96d779ff8df7da5cf16c'
const articles = {
  structure: 'ART-HU-BMS102-MIC-F18P1-VIRUS-NATURE-STRUCTURE',
  culture: 'ART-HU-BMS102-MIC-F18P1-CELL-CULTURE-LINES',
  eclipse: 'ART-HU-BMS102-MIC-F18P1-VIRAL-ECLIPSE',
}

const sources = [
  { id: 'src_0fc230c86383f76329b6', title: 'General virology recap screenshot — slide 7 of 53', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.58.14.jpg', sha: '0fc230c86383f76329b6ff269e5be00a416944a71f3f2a052fdcc1120f3fca60', media: 'image/jpeg', pages: 1, scope: 'Family-18 Q01 on slide 7', qualification: 'Tier-6 auxiliary screenshot of one source-native recap slide. The red box is an embedded teaching-answer mark corroborated by the complete lecture carrier; it is not an official examination key.' },
  { id: 'src_e0928be0be4ed846220d', title: 'General virology recap screenshot — slide 21 of 53', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.58.12.jpg', sha: 'e0928be0be4ed846220d6971077e3e0b4c76b5528b0cfdff285725687160f923', media: 'image/jpeg', pages: 1, scope: 'Family-18 Q03 and Q04 on slide 21', qualification: 'Tier-6 auxiliary screenshot of one source-native recap slide. The red boxes are embedded teaching-answer marks corroborated by the complete lecture carrier; they are not an official examination key.' },
  { id: 'src_ec1ee4de5212860ccb3e', title: 'General virology recap screenshot — slide 28 of 53', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.58.09.jpg', sha: 'ec1ee4de5212860ccb3ebdba21fc4158e7edfad45e377d3cebd397fa67f9644b', media: 'image/jpeg', pages: 1, scope: 'Family-18 Q06, Q07 and Q08 on slide 28', qualification: 'Tier-6 auxiliary screenshot of one source-native recap slide. The red circles are embedded teaching-answer marks corroborated by the complete lecture carrier; they are not an official examination key.' },
  { id: 'src_e11ef4bbfe64901c50cc', title: 'General virology recap screenshot — slide 33 of 53', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.58.05.jpg', sha: 'e11ef4bbfe64901c50cc5824785a1fd247b4b6777368f2f042bb1ee87c3660c7', media: 'image/jpeg', pages: 1, scope: 'Family-18 Q12 on slide 33', qualification: 'Tier-6 auxiliary screenshot of one source-native recap slide. The red circle is an embedded teaching-answer mark corroborated by the complete lecture carrier; it is not an official examination key.' },
  { id: carrier, title: 'General virology and general mycology — complete local lecture carrier', path: 'Year 1/BMS 102/Microbiology/Theoretical/Lec 9 - General Virology & Mycology/lec8 General virology 2.pdf', sha: '96d779ff8df7da5cf16c7a6349b8594fc8f1a9d34168df587302e5a86d82cbda', media: 'application/pdf', pages: 53, scope: 'Complete carrier for the Family-18 recap slides', qualification: 'Tier-4 Helwan theoretical teaching deck visibly attributed to Dr Reem Abdelrahman, Faculty of Medicine, Helwan University, 2024–2025. It proves the recap selections are embedded teaching answers and supplies declarative teaching, but it has no examiner, sitting, marks, departmental bank designation or official key.' },
]

const concepts = [
  {
    ref: 'Q01', id: 'CON-INF-76B26CD6DAF02D', key: 'viruses-smallest-infectious-agents-broad-host-range', article: articles.structure,
    label: 'Viruses are the smallest infectious agents and infect diverse hosts', aliases: ['Virus introductory definition', 'Broad viral host range'], type: 'definition',
    definition: 'In the source framework, viruses are described as the smallest known infectious agents and as capable of infecting humans, animals, insects, plants and bacteria. This is a broad introductory teaching definition and is not promoted to an absolute comparative claim across every acellular infectious entity.',
    objective: 'Select the source definition that combines very small infectious-agent status with a broad host range.',
    pitfalls: 'Choosing largest infectious agents, limiting viral hosts to humans, calling viruses eukaryotic cells, or treating the source summary as an unrestricted taxonomic absolute.',
    micro: 'General viral properties', nano: 'Introductory definition and host range', subjectText: 'Viruses', predicate: 'are described as', object: 'the smallest infectious agents with a broad host range',
    display: 'Viruses are described as the smallest infectious agents and can infect humans, animals, insects, plants and bacteria.',
    screenshot: sources[0].id, slide: 7, teachingPages: '3–4 and 7', teaching: 'They are the smallest infectious agents known. They can infect man, animals, insects, plants and bacteria.',
    limitation: 'The smallest-agent and broad-host-range wording is preserved as a source-framed introductory statement rather than generalized beyond the governed lecture.', related: [], rejected: [],
  },
  {
    ref: 'Q03', id: 'CON-INF-42D3CD63BED44A', key: 'viral-capsomers-arrangement-determines-symmetry', article: articles.structure,
    label: 'Capsomer arrangement determines viral capsid symmetry', aliases: ['Capsomer arrangement and viral symmetry', 'Viral capsid symmetry determinant'], type: 'structure_function_relationship',
    definition: 'A viral capsid is composed of small protein subunits called capsomers. The arrangement of those capsomers determines the symmetry of the virion rather than the shape of one capsomer alone.',
    objective: 'Identify capsomer arrangement as the structural determinant of viral symmetry.',
    pitfalls: 'Calling capsid subunits pilin, assigning symmetry to one capsomer shape, or claiming capsomer arrangement has no role.',
    micro: 'Viral structure', nano: 'Capsid and symmetry', subjectText: 'Capsomer arrangement', predicate: 'determines', object: 'viral capsid symmetry',
    display: 'The arrangement of capsomers determines viral capsid symmetry.',
    screenshot: sources[1].id, slide: 21, teachingPages: '11–12 and 21', teaching: 'It is composed of small protein subunits called capsomers. The arrangement of the capsomers determines virus symmetry.',
    limitation: 'Live CON-INF-80960EC6FD48EC covers capsomer composition but not this arrangement-to-symmetry relation and is therefore not merged.', related: ['CON-INF-265E03F8F60BAD'], rejected: ['CON-INF-80960EC6FD48EC'],
  },
  {
    ref: 'Q04', id: 'CON-INF-265E03F8F60BAD', key: 'viral-nucleic-acid-infectivity', article: articles.structure,
    label: 'Viral nucleic acid is the infectious component in the source framework', aliases: ['Viral genome infectivity', 'Coreless viral particle non-infectivity'], type: 'structure_function_relationship',
    definition: 'The source identifies viral nucleic acid as the infectious component and describes particles lacking the nucleic-acid core as non-infectious. This statement is retained at the lecture’s tested grain and is not generalized to every experimental genome-infectivity condition.',
    objective: 'Identify viral nucleic acid as the infectious component in the source option set.',
    pitfalls: 'Assigning attachment to nucleic acid, denying its role in replication, or extrapolating the recap statement beyond its source-defined context.',
    micro: 'Viral structure', nano: 'Genome function and infectivity', subjectText: 'Viral nucleic acid', predicate: 'is presented as', object: 'the infectious viral component',
    display: 'Viral nucleic acid is presented as the infectious viral component in the source framework.',
    screenshot: sources[1].id, slide: 21, teachingPages: '14 and 21', teaching: 'It is the infectious part of the virus; coreless particles are non-infectious.',
    limitation: 'The source-framed genome-infectivity statement remains needs_evidence and is not generalized to every virus or experimental condition.', related: ['CON-INF-42D3CD63BED44A'], rejected: [],
  },
  {
    ref: 'Q06', id: 'CON-INF-9074A869E98589', key: 'cell-culture-monolayer-definition', article: articles.culture,
    label: 'Cell culture forms a monolayer from separated animal or human tissue cells', aliases: ['Cell-culture monolayer definition', 'Tissue-derived cell monolayer'], type: 'definition',
    definition: 'For viral cultivation, pieces of animal or human tissue are separated into cells and grown with medium on a flat-sided glass or plastic vessel. Within days, the cells form a monolayer or sheet on the flat surface.',
    objective: 'Recognize formation of a tissue-derived cellular monolayer on a flat-sided container as the source definition of cell culture.',
    pitfalls: 'Confusing cell culture with intact organ culture or omitting the separated-cell monolayer step.',
    micro: 'Viral cultivation', nano: 'Cell-culture monolayer', subjectText: 'Cell culture', predicate: 'forms', object: 'a monolayer or sheet of tissue-derived cells',
    display: 'Cell culture forms a monolayer or sheet of separated animal or human tissue cells on a flat-sided container.',
    screenshot: sources[2].id, slide: 28, teachingPages: '22 and 28', teaching: 'Pieces of animal or human tissues are trypsinized to get separate cells. A monolayer or sheet of cells is formed on the flat side of the container.',
    limitation: 'The wording is limited to the source’s introductory viral-cultivation framework.', related: ['CON-INF-24E073714A7D81', 'CON-INF-083E248577DEC6'], rejected: [],
  },
  {
    ref: 'Q07', id: 'CON-INF-24E073714A7D81', key: 'primary-versus-human-diploid-cell-line-origin', article: articles.culture,
    label: 'Primary cell lines differ from human embryonic fibroblast diploid lines', aliases: ['Primary versus diploid cell-line origin', 'Human embryonic fibroblast diploid line'], type: 'classification',
    definition: 'In the source classification, primary cell lines are derived from organ fragments and divide for four to six passages. Fibroblasts derived from human embryonic tissue are classified as human diploid cell lines rather than primary cell lines.',
    objective: 'Distinguish primary cell lines from human embryonic fibroblast diploid cell lines by source and finite passage pattern.',
    pitfalls: 'Calling every finite cell culture primary or assigning human embryonic fibroblasts to the primary-line category.',
    micro: 'Viral cultivation', nano: 'Primary versus diploid cell lines', subjectText: 'Human embryonic fibroblast cultures', predicate: 'are classified as', object: 'human diploid rather than primary cell lines',
    display: 'Human embryonic fibroblast cultures are classified as diploid rather than primary cell lines in the source framework.',
    screenshot: sources[2].id, slide: 28, teachingPages: '22 and 28', teaching: 'Primary cell lines: organ fragments; divide for 4–6 passages. Human diploid cell lines: fibroblasts from human embryo tissues.',
    limitation: 'The distinction is preserved exactly at the source’s teaching-classification grain.', related: ['CON-INF-9074A869E98589'], rejected: [],
  },
  {
    ref: 'Q08', id: 'CON-INF-083E248577DEC6', key: 'human-diploid-cell-line-finite-passages', article: articles.culture,
    label: 'Human diploid cell lines divide for up to 50 passages in the source classification', aliases: ['Diploid cell-line finite passages', 'Human diploid line 50-passage limit'], type: 'classification',
    definition: 'The lecture classifies human diploid cell lines as finite cultures that divide for up to 50 passages, in contrast to continuous heteroploid lines that can divide indefinitely. The numerical limit is retained as this source’s teaching value rather than a universal property of every line.',
    objective: 'Recall the source value of up to 50 passages for human diploid cell lines.',
    pitfalls: 'Confusing the source’s 50-passage diploid limit with the four-to-six passages of primary cultures or indefinite division of continuous lines.',
    micro: 'Viral cultivation', nano: 'Human diploid cell-line lifespan', subjectText: 'Human diploid cell lines', predicate: 'divide for', object: 'up to 50 passages in the source classification',
    display: 'Human diploid cell lines divide for up to 50 passages in the source classification.',
    screenshot: sources[2].id, slide: 28, teachingPages: '22 and 28', teaching: 'Human diploid cell lines: fibroblasts from human embryo tissues. Divide for (50) passages.',
    limitation: 'The 50-passage value is source-specific teaching and is not generalized to every diploid line or laboratory condition.', related: ['CON-INF-9074A869E98589'], rejected: [],
  },
  {
    ref: 'Q12', id: 'CON-INF-C72D67C0E285FD', key: 'viral-eclipse-no-detectable-infectious-virus', article: articles.eclipse,
    label: 'The viral eclipse period has no detectable infectious virus after penetration', aliases: ['Viral eclipse definition', 'Post-penetration eclipse period'], type: 'definition',
    definition: 'The eclipse period is the interval after viral penetration during which no infectious virus can be detected inside the host cell. Viral nucleic acid and proteins are being synthesized before mature particles are assembled.',
    objective: 'Define the viral eclipse as the post-penetration interval without detectable infectious virus.',
    pitfalls: 'Confusing eclipse with attachment, extracellular release, clinical latency or absence of viral biosynthesis.',
    micro: 'Viral replication', nano: 'Eclipse period', subjectText: 'The viral eclipse period', predicate: 'contains', object: 'no detectable infectious virus after penetration',
    display: 'During the viral eclipse period, no infectious virus is detectable inside the host cell after penetration.',
    screenshot: sources[3].id, slide: 33, teachingPages: '31 and 33', teaching: 'It is the period after penetration during which no infectious virus can be detected inside the host cell.',
    limitation: 'The statement defines the source’s intracellular replication stage and does not describe clinical latency.', related: [], rejected: [],
  },
]

for (const c of concepts) {
  c.claim = `CLM-HU102-F18P1-${c.ref}-01`
  c.currCit = `CIT-HU102-F18P1-${c.ref}-CURR`
  c.imgCit = `CIT-HU102-F18P1-${c.ref}-IMG`
  c.span = `SPN-HU102-F18P1-${c.ref}-01`
  c.question = `Q-HU102-MIC-F18-${c.ref}`
}
const byRef = Object.fromEntries(concepts.map((c) => [c.ref, c]))

const questions = [
  {
    ref: 'Q01', type: 'sba', stem: 'Which of the following best defines viruses?', key: 'A',
    options: [
      'They are the smallest infectious agents known. They can infect man, animals, insects, plants and bacteria',
      'They are the largest infectious agents known. They can infect man, animals, insects, plants and bacteria.',
      'They are the smallest infectious agents known. They can infect only man.',
      'They are the smallest eukaryotic cells known. They can infect man, animals, insects, plants and bacteria.',
    ],
    reasons: [
      'this is the exact first-position teaching answer and combines the source’s small-agent description with its broad host list',
      'the source describes viruses as the smallest rather than the largest infectious agents',
      'the source explicitly includes animals, insects, plants and bacteria as well as humans',
      'viruses are acellular infectious agents rather than eukaryotic cells',
    ],
  },
  {
    ref: 'Q03', type: 'sba', stem: '1. Which of the following is true about viral capsid?', key: 'C',
    options: [
      'It is composed of single protein unit called capsomer. The shape of the single capsomer determines virus symmetry.',
      'It is composed of small protein subunits called capsomers. The arrangement of the capsomers has no role in virus symmetry.',
      'It is composed of small protein subunits called capsomers. The arrangement of the capsomers determines virus symmetry.',
      'It is composed of small protein subunits called pilin the arrangement of the pilin determines virus symmetry.',
    ],
    reasons: [
      'capsids contain multiple capsomers and symmetry depends on their arrangement, not the shape of one subunit',
      'capsomer arrangement has a defining role in viral symmetry',
      'this exactly matches the lecture definition of capsid composition and symmetry',
      'pilin is not the source term for viral capsid subunits',
    ],
  },
  {
    ref: 'Q04', type: 'sba', stem: '1. As regarding function of viral nucleic acid, which of the following is true?', key: 'A',
    options: [
      'It is the infectious part of the virus; coreless particles are non-infectious.',
      'It is the infectious part of the virus; but coreless particles are also infectious.',
      'Plays a role in virus attachment to host cell.',
      'Non infectious but responsible for virus replication.',
    ],
    reasons: [
      'this is the exact source-framed teaching answer about genome infectivity and coreless particles',
      'the source rejects infectivity of coreless particles',
      'attachment is assigned principally to capsid surface proteins or envelope glycoproteins rather than the genome',
      'the source presents nucleic acid as the infectious component as well as the genetic basis of replication',
    ],
  },
  { ref: 'Q06', type: 'tf', stem: '(true- false): cell culture can be defined as pieces of animal or human tissue, from which a monolayer or sheet of cells is formed on a flat side container.', key: 'A', truth: true, reason: 'the lecture describes separated animal or human tissue cells forming a monolayer on a flat-sided culture vessel' },
  { ref: 'Q07', type: 'tf', stem: '(true- false): primary cell lines are prepared from fibroblsts derived from human embryo tissue.', key: 'B', truth: false, reason: 'the lecture classifies human embryonic fibroblasts as human diploid cell lines, while primary lines derive from organ fragments' },
  { ref: 'Q08', type: 'tf', stem: '(true- false): human diploid cell line can divide up to 50 passages.', key: 'A', truth: true, reason: 'the lecture assigns human diploid cell lines a finite lifespan of up to 50 passages' },
  { ref: 'Q12', type: 'tf', stem: '(true- false): eclipse is the period after penetration during which no infectious virus can be detected inside the host cell.', key: 'A', truth: true, reason: 'this is the lecture’s definition of the post-penetration eclipse period' },
]

const sourceRows = sources.map((s) => `# Item
## id
${s.id}
## title
${s.title}
## institution
${s.id === carrier ? 'Faculty of Medicine, Helwan University; Dr Reem Abdelrahman' : 'Helwan University local corpus'}
## collection_id
hu-y1
## source_relative_path
${s.path}
## media_type
${s.media}
## languages
en
## page_count
${s.pages}
## sha256
${s.sha}
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
${s.qualification} Scope used in this slice: ${s.scope}.
## is_assessment
${s.id === carrier ? 'no' : 'yes'}`).join('\n---\n\n')

const articleSpecs = [
  {
    id: articles.structure, title: 'Virus nature, capsid symmetry and nucleic-acid function', micro: 'General viral properties and structure', nano: 'Definition, capsid and genome', refs: ['Q01', 'Q03', 'Q04'],
    summary: 'Viruses are introduced in this lecture as very small infectious agents with a wide host range. Their capsids are built from capsomers whose arrangement determines symmetry, while the viral nucleic acid is presented as the infectious genomic component.',
    sections: `### Definition
The source describes viruses as the smallest infectious agents and lists humans, animals, insects, plants and bacteria among their possible hosts. This is retained as an introductory lecture statement rather than an unrestricted comparison with every acellular infectious entity.

Viruses are described as the smallest infectious agents and can infect humans, animals, insects, plants and bacteria.

### Mechanism
A capsid is assembled from small protein subunits called capsomers. Their higher-order arrangement produces viral symmetry. Viral nucleic acid supplies the genetic information for replication and is presented by the recap as the infectious component.

The arrangement of capsomers determines viral capsid symmetry. Viral nucleic acid is presented as the infectious viral component in the source framework.

### Key determinants
The correct viral definition combines very small infectious-agent status with a broad host list. Capsomers, not pilin, compose the capsid, and their arrangement rather than one capsomer shape determines symmetry. Attachment is principally mediated by surface proteins rather than the genome.

### Clinical significance
Capsid architecture and viral genomes influence classification, host interaction and diagnostic strategy. These foundational distinctions support later study of viral entry, replication and laboratory detection.

### Exam approach
Preserve the source’s exact qualifiers. Reject largest-agent, human-only and eukaryotic-cell alternatives; distinguish capsomer arrangement from individual subunit shape; and keep the nucleic-acid claim at the source’s tested grain.

### Authority limitation
The answers are embedded teaching selections in a Helwan lecture, not an official examination key. The broad Q01 and Q04 statements remain Draft and needs_evidence pending medical and faculty review.`,
    holds: ['Viruses are described as the smallest infectious agents and can infect humans, animals, insects, plants and bacteria.', 'The arrangement of capsomers determines viral capsid symmetry.', 'Viral nucleic acid is presented as the infectious viral component in the source framework.'],
    lose: ['Calling viruses eukaryotic cells or limiting them to human hosts.', 'Calling capsid subunits pilin or denying the role of capsomer arrangement.', 'Promoting source-framed genome infectivity beyond the lecture’s tested context.'],
  },
  {
    id: articles.culture, title: 'Cell-culture monolayers and finite viral-cultivation cell lines', micro: 'Viral cultivation', nano: 'Cell-culture lines', refs: ['Q06', 'Q07', 'Q08'],
    summary: 'Viral cell culture uses separated animal or human tissue cells to form a monolayer on a flat-sided vessel. The lecture distinguishes primary cultures from human diploid embryonic fibroblast lines and assigns the latter a finite limit of up to 50 passages.',
    sections: `### Definition
Cell culture for viral cultivation begins with pieces of animal or human tissue that are separated into cells and grown in nutrient medium on flat-sided glass or plastic vessels. A cellular monolayer or sheet forms on the flat surface.

Cell culture forms a monolayer or sheet of separated animal or human tissue cells on a flat-sided container.

### Mechanism
Primary cultures arise from organ fragments and divide for only four to six passages in the lecture table. Human diploid cell lines arise from human embryonic fibroblasts and divide for up to 50 passages, whereas continuous heteroploid lines divide indefinitely.

Human embryonic fibroblast cultures are classified as diploid rather than primary cell lines in the source framework. Human diploid cell lines divide for up to 50 passages in the source classification.

### Key determinants
Monolayer formation identifies the cell-culture definition. Human embryonic fibroblasts belong to the diploid category, not the primary category. The source’s 50-passage value distinguishes diploid lines from both primary and continuous lines.

### Clinical significance
Cell-culture selection affects viral isolation and observation of cytopathic effects. Finite and continuous systems differ in origin, lifespan and suitability, so category labels should not be used interchangeably.

### Exam approach
Read each statement as a category comparison. Use the source table to match organ fragments with primary lines, embryonic fibroblasts with diploid lines, and indefinite division with continuous lines.

### Authority limitation
These are embedded teaching answers from a local lecture rather than an official examination key. The numerical passage count is a source-specific teaching value and remains needs_evidence.`,
    holds: ['Cell culture forms a monolayer or sheet of separated animal or human tissue cells on a flat-sided container.', 'Human embryonic fibroblast cultures are classified as diploid rather than primary cell lines in the source framework.', 'Human diploid cell lines divide for up to 50 passages in the source classification.'],
    lose: ['Treating intact organ fragments and a separated-cell monolayer as the same preparation.', 'Calling human embryonic fibroblasts primary cell lines.', 'Confusing the source’s finite diploid lifespan with indefinite continuous-line growth.'],
  },
  {
    id: articles.eclipse, title: 'The eclipse period in viral replication', micro: 'Viral replication', nano: 'Eclipse period', refs: ['Q12'],
    summary: 'The viral eclipse is the intracellular interval after penetration during which no infectious virus can be detected. Viral genome and protein synthesis precede assembly of mature particles, so lack of detectable infectious virions does not mean that replication has stopped.',
    sections: `### Definition
The eclipse period begins after viral penetration and is defined by absence of detectable infectious virus inside the host cell.

During the viral eclipse period, no infectious virus is detectable inside the host cell after penetration.

### Mechanism
After uncoating, viral nucleic acid and proteins are synthesized using host-cell resources. Infectious mature particles are not detectable until genome and coat components are assembled.

### Key determinants
Eclipse follows penetration and precedes assembly. It concerns intracellular infectious virions, not absence of viral components or metabolic activity.

### Clinical significance
Understanding eclipse helps interpret time-dependent viral culture and replication experiments. It is a replication-stage term and should not be confused with clinical latency.

### Exam approach
Anchor the definition to sequence and detectability: after penetration, before mature-particle assembly, no infectious virus detectable inside the host cell.

### Authority limitation
The statement and answer are embedded teaching content in a Helwan lecture, not an official examination key, and remain Draft pending review.`,
    holds: ['During the viral eclipse period, no infectious virus is detectable inside the host cell after penetration.', 'Viral synthesis precedes assembly of mature infectious particles.'],
    lose: ['Confusing eclipse with attachment or release.', 'Equating absent infectious particles with absent viral synthesis.', 'Confusing intracellular eclipse with clinical latency.'],
  },
]

const articleRow = (a) => {
  const cs = a.refs.map((ref) => byRef[ref])
  const sourceIds = [...new Set(cs.flatMap((c) => [c.screenshot, carrier]))]
  return `# Item
## id
${a.id}
## title
${a.title}
## arabic_title

## aliases
Family-18 ${a.micro}
HU-BMS-102 ${a.nano}
## subject
inf
## topic
Microbiology
## subtopic
General virology
## microtopic
${a.micro}
## nanotopic
${a.nano}
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-MIC
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
${a.refs.length > 1 ? 6 : 4}
## high_yield
Medium
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Microbiology faculty
## final_publisher
Admin team
## summary
${a.summary}
## sections
${a.sections}
## published_summary

## published_sections

## hold_these
${a.holds.join('\n')}
## lose_the_mark
${a.lose.join('\n')}
Treating embedded teaching answers as an official examination key.
## related_concepts
${cs.map((c) => c.id).join('\n')}
## related_articles
${Object.values(articles).filter((id) => id !== a.id).join('\n')}
## question_ids
${cs.map((c) => c.question).join('\n')}
## resource_ids
${sourceIds.join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > General virology > ${a.micro} > ${a.nano}
## university_notes
hu: Restricted to HU-BMS-102 Year 1. The screenshots are exact tier-6 recap occurrences; the complete tier-4 local Helwan lecture establishes their embedded teaching-answer convention without supplying official examination authority.
## annotations
${cs.map((c) => `### definition_of · ${c.id}\nQuote: ${c.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${cs.map((c) => `### ${c.display}\nClaims: ${c.claim}\nCitations: ${c.currCit}, ${c.imgCit}\nSpan: ${c.span}`).join('\n\n')}
## article_source_ids
${sourceIds.join('\n')}
## claim_ids
${cs.map((c) => c.claim).join('\n')}
## span_ids
${cs.map((c) => c.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Exact screenshot occurrences plus the complete, visibly attributed Helwan lecture carrier and its source-native embedded teaching selections. No official examination or official key is claimed.
## evidence_gaps
Independent medical verification and named Helwan microbiology faculty review remain required before publication. No sitting, marks, recurrence or official-key evidence is available.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-18 Part1 includes only Q01, Q03, Q04, Q06, Q07, Q08 and Q12. Q02, Q05, Q09, Q10, Q11, Q13 and Q14 remain cross-university dependency holds with no student-facing records.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; source images are cited but not redistributed.
mediaRecommendations: No additional visual is required for these tested distinctions.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`
}

const conceptRow = (c) => `# Item
## label
${c.label}
## id
${c.id}
## canonical_key
${c.key}
## aliases
${c.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${c.definition}
## explicit_objective
${c.objective}
## pitfalls
${c.pitfalls}
## concept_type
${c.type}
## status
Draft
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-MIC
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > General virology > ${c.micro} > ${c.nano}
## article_ids
${c.article}
## related_article_ids
${Object.values(articles).filter((id) => id !== c.article).join('\n')}
## related_concept_ids
${c.related.length ? c.related.join('\n') : '[clear]'}
## resource_ids
${c.screenshot}
${carrier}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.58
## exam_weight_by_year
HU_Y1=0.58
## clinical_relevance
0.52
## academic_relevance
0.94
## weight_confidence
0.48
## confidence
0.88
## exam_signal
${c.screenshot} | tier-6 auxiliary recap screenshot | Family-18 ${c.ref}; ${carrier} | tier-4 local teaching carrier | embedded teaching answer, no official-key authority
## atomic_claim_ids
${c.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching ${c.teachingPages}] ${c.teaching}
[Family-18 ${c.ref}] ${questions.find((q) => q.ref === c.ref).stem}
## merge_ids
[clear]
## rejected_merge_candidate_ids
${c.rejected.length ? c.rejected.join('\n') : '[clear]'}
## conflicts
[clear]
## uncertainty
${c.limitation}
## evidence_gaps
No official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan microbiology faculty review remain required before publication.
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Microbiology faculty
## final_publisher
Admin team
## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
drafted_not_reviewed
## exclusion_reason

## field_notes
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: No distinct source-supported Arabic alias has been reviewed.
microtopicId: No reviewed microtopic ID exists beneath the canonical placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed screenshot and complete-carrier pages.
sourceCandidateIds: Family 18 completed the governed four-query search-before-mint gate.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: ${c.rejected.length ? `Narrower concept ${c.rejected.join(', ')} does not cover this exact tested relation.` : 'No rival same-scope concept survived triage.'}
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New Family-18 question-led concept after governed no-same-scope adjudication.`

const correctExplanation = (q, c) => {
  const option = q.options['ABCD'.indexOf(q.key)]
  return `${option} is the exact source-native teaching answer because ${q.reasons['ABCD'.indexOf(q.key)]}. The complete Helwan lecture supplies the teaching context and proves the selection is embedded in the recap slide. ${c.limitation}`
}
const wrongExplanation = (q, i) => `${q.options[i]} is not the best source-framed answer because ${q.reasons[i]}. The embedded teaching selection is ${q.options['ABCD'.indexOf(q.key)]}; the question remains Draft pending medical and faculty review.`
const tfExplanation = (q, optionTrue, c) => {
  const isCorrect = optionTrue === q.truth
  const verdict = optionTrue ? 'True' : 'False'
  if (isCorrect) return `${verdict} is the exact source-native teaching answer because ${q.reason}. The complete Helwan lecture proves the answer circle is embedded teaching content rather than a later screenshot inference. ${c.limitation}`
  return `${verdict} would reverse the source-supported classification because ${q.reason}. The opposite truth value is the embedded teaching answer. The item remains Draft and carries no official examination-key authority.`
}

const questionRow = (q) => {
  const c = byRef[q.ref]
  const answerBlock = q.type === 'sba'
    ? q.options.map((o, i) => `## answer_${'abcd'[i]}\n${o}\n## explanation_${'abcd'[i]}\n${'ABCD'[i] === q.key ? correctExplanation(q, c) : wrongExplanation(q, i)}`).join('\n')
    : `## answer_a\nTrue\n## explanation_a\n${tfExplanation(q, true, c)}\n## answer_b\nFalse\n## explanation_b\n${tfExplanation(q, false, c)}`
  return `# Item
## id
${c.question}
## title
${q.stem}
## subject
inf
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${q.stem}
## format
${q.type === 'sba' ? 'single best answer' : 'true or false'}
## derived_from

## correct_answer
${q.key}
${answerBlock}
## topic
General virology
## subtopic
${c.micro}
## difficulty
Moderate
## question_type
${q.type === 'sba' ? 'Microbiology' : 'True/False'}
## main_concept
${c.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > General virology > ${c.micro} > ${c.nano}
## clinical_relevance
0.52
## academic_relevance
0.94
## cognitive_effort_score
0.44
## exam_weight_by_year
HU_Y1=0.58
## question_only_for
HU_Y1
## concept_ids
${c.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
Low
## setting
Academic
## reasoning_level
1
## inferred_difficulty
44
## exam_relevance
6
## contextual_concept_ids

## library_ids
${c.article}
## resource_ids
${c.screenshot}
${carrier}
## learning_objective
${c.objective}
## media_recommendations

## source_citation
${c.screenshot}, slide ${c.slide} of 53, Family-18 ${q.ref}: literal screenshot wording, option order and selected response preserved. ${carrier}, pp${c.teachingPages}: complete visibly attributed Helwan lecture carrier, direct teaching and the exact source-native recap selection. The answer has teaching authority only; no official exam, official key, sitting, marks or recurrence is inferred.
## attachments

## attached_image

## author_notes
Literal source wording, capitalization, punctuation and option order are preserved${q.ref === 'Q01' ? '; the source-unlabelled four positions are mapped to importer positions A–D without changing their order' : ''}${q.ref === 'Q07' ? ', including `fibroblsts`' : ''}. ${c.limitation} Family-18 Q02, Q05, Q09, Q10, Q11, Q13 and Q14 remain cross-university dependency holds and have no student-facing records.
## estimated_seconds
${q.type === 'sba' ? 60 : 45}
## randomise_answers
${q.type === 'sba' ? 'yes' : 'no'}`
}

const claimRow = (c) => `# Item
## id
${c.claim}
## concept_id
${c.id}
## subject
inf
## predicate
${c.predicate}
## object
${c.object}
## display_text
${c.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.88
## freshness
stable_local_teaching_fact
## time_sensitive
no
## qualifiers
authority: tier-4 local Helwan teaching carrier plus exact tier-6 recap screenshot; embedded teaching answer only, with no official examination-key authority. limitation: ${c.limitation}`

const carrierCitation = (c) => `# Item
## id
${c.currCit}
## claim_id
${c.claim}
## resource_id
${carrier}
## evidence_role
local_curriculum
## support_span
${c.teaching}
## locator_type
page
## locator_page
${c.teachingPages}
## locator_section
General virology — ${c.micro}, teaching and recap answer
## locator_detail
Direct teaching plus the exact embedded recap selection for Family-18 ${c.ref}
## context_note
Tier-4 visibly attributed Helwan teaching carrier. Its embedded selection is a printed teaching answer, not an official examination key, and ${c.limitation.toLowerCase()}
## confidence
0.90
## counts_as_claim_evidence
no`

const imageCitation = (c) => `# Item
## id
${c.imgCit}
## claim_id
${c.claim}
## resource_id
${c.screenshot}
## evidence_role
auxiliary_assessment
## support_span
${questions.find((q) => q.ref === c.ref).stem} Selected teaching answer: ${questions.find((q) => q.ref === c.ref).key}.
## locator_type
page
## locator_page
1
## locator_section
General vir... slide ${c.slide} of 53 — Family-18 ${c.ref}
## locator_detail
Exact screenshot wording, option order and red source-native answer mark
## context_note
Tier-6 auxiliary screenshot occurrence. The complete Helwan carrier proves the mark is embedded teaching content; it is not an official examination key.
## confidence
0.92
## counts_as_claim_evidence
no`

const spanRow = (c) => `# Item
## id
${c.span}
## article_id
${c.article}
## section_id
${c.article.toLowerCase()}-${c.ref.toLowerCase()}
## text
${c.display}
## claim_ids
${c.claim}
## citation_ids
${c.currCit}
${c.imgCit}`

const relationSpecs = [
  ['Q03', 'Q04', 'capsid structure and viral nucleic acid are distinct structural components assessed on the same recap slide'],
  ['Q06', 'Q07', 'the general cell-culture definition provides the setting for distinguishing primary and diploid line origins'],
  ['Q06', 'Q08', 'the general cell-culture definition provides the setting for the finite passage property of human diploid lines'],
]
const relationRows = relationSpecs.map(([from, to, scope]) => {
  const a = byRef[from]
  const b = byRef[to]
  return `# Item
## source
${a.id}
## type
related_concepts
## target
${b.id}
## evidence_claim_ids
${a.claim}
${b.claim}
## citation_ids
${a.currCit}
${b.currCit}
## verification_status
needs_evidence
## confidence
0.82
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Microbiology faculty`
}).join('\n---\n\n')

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family18-part1-sources.md', sourceRows],
  ['article/HU-BMS-102-microbiology-family18-part1-articles.md', articleSpecs.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-microbiology-family18-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family18-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family18-part1-citations.md', [...concepts.map(carrierCitation), ...concepts.map(imageCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family18-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-microbiology-family18-part1-relations.md', relationRows],
  ['question/HU-BMS-102-microbiology-family18-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '18-part1', refs: questions.map((q) => q.ref), answers: questions.map((q) => `${q.ref}:${q.key}`),
  released: { sources: 5, articles: 3, concepts: 7, newConcepts: 7, questions: 7, claims: 7, citations: 14, spans: 7, relations: 3 },
  holds: { crossUniversityDependency: ['Q02', 'Q05', 'Q09', 'Q10', 'Q11', 'Q13', 'Q14'] },
}, null, 2))
