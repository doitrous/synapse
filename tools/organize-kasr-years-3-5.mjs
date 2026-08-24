#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const graphPath = process.argv[2] || '/private/tmp/kasr-y345-message-graph.json'
const targetParent = process.argv[3] || '/Users/doitrous/Desktop/Kasr Alainy'
const libraryRoot = '/Users/doitrous/Documents/yyaaaacodex/telegram-library-work'
const discoveryRoot = path.join(libraryRoot, 'discovery')
const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'))

const allowed = new Set(['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.epub', '.txt', '.md', '.csv', '.zip', '.rar', '.7z', '.jpg', '.jpeg', '.png', '.webp'])
const blocked = new Set(['.mp4', '.mov', '.mkv', '.webm', '.avi', '.mp3', '.m4a', '.wav', '.ogg', '.opus', '.aac', '.flac', '.gif', '.tgs'])
const batchForYear = { 3: 197, 4: 196, 5: 195 }
const channelForBatch = { 197: 'FUTUREDOCTORS_197', 196: 'FUTUREDOCTORS_196', 195: 'FUTUREDOCTORS_Siraj', 194: 'Futuredoctors194' }
const stripControlChars = value => Array.from(String(value || ''), ch => ch.charCodeAt(0) <= 0x1f ? ' ' : ch).join('')

const stateSpecs = [
  [3, 197, 'current', 'year3-current-batch197-download-state.json'],
  [3, 197, 'archive', 'year3-batch197-download-state.json'],
  [4, 196, 'current', 'year4-current-batch196-download-state.json'],
  [4, 196, 'archive', 'year4-batch196-download-state.json'],
  [5, 195, 'current', 'year5-current-batch195-download-state.json'],
  [5, 195, 'archive', 'year5-batch195-download-state.json'],
]

const canonicalUrl = value => String(value || '').replace(/[?#].*$/u, '').replace(/\/$/u, '').toLowerCase()
const safe = value => stripControlChars(value).normalize('NFC').replace(/[\\/:*?"<>|]/gu, '-').replace(/\s+/gu, ' ').trim()
const normalName = value => safe(value).toLowerCase().replace(/\.[^.]+$/u, '').replace(/\s*\(\d+\)$/u, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
const words = value => new Set(normalName(value).split(' ').filter(token => token.length > 1))
const parsePost = value => {
  const match = String(value || '').match(/t\.me\/([A-Za-z0-9_]+)\/(\d+)/iu)
  return match ? { channel: match[1], postId: Number(match[2]) } : null
}
const ordinal = value => `${value}${value % 100 >= 11 && value % 100 <= 13 ? 'th' : value % 10 === 1 ? 'st' : value % 10 === 2 ? 'nd' : value % 10 === 3 ? 'rd' : 'th'}`
const csv = value => `"${String(value ?? '').replaceAll('"', '""').replaceAll('\n', ' ')}"`

const graphByUrl = new Map()
graph.records.forEach((record, index) => graphByUrl.set(canonicalUrl(record.canonicalUrl || record.url), { ...record, graphIndex: index }))

// Recover the human label immediately above each Telegram URL. Telegram often
// renders the anchor itself as a bare URL, while the preceding line says what it is.
const semanticByUrl = new Map()
for (const record of graph.records) {
  const lines = String(record.exactText || '').split('\n').map(line => line.trim())
  for (let index = 0; index < lines.length; index += 1) {
    for (const match of lines[index].matchAll(/https?:\/\/t\.me\/[A-Za-z0-9_]+\/\d+/giu)) {
      const labels = []
      for (let cursor = index - 1; cursor >= 0 && labels.length < 2; cursor -= 1) {
        if (lines[cursor] && !/^https?:\/\//iu.test(lines[cursor])) labels.unshift(lines[cursor])
      }
      semanticByUrl.set(canonicalUrl(match[0]), labels.join(' — '))
    }
  }
}

const rootModule = new Map(Object.entries({
  'https://t.me/futuredoctors_197/1928': '309 INF',
  'https://t.me/futuredoctors_197/1930': '310 PAT',
  'https://t.me/futuredoctors_196/8201': 'Practical 3rd Year',
  'https://t.me/futuredoctors_197/1934': '319 Nutrition',
  'https://t.me/futuredoctors_197/1935': '314 Investigation',
  'https://t.me/futuredoctors_197/2078': '316 ENT',
  'https://t.me/futuredoctors_197/2079': '315 Ophthalmology',
  'https://t.me/futuredoctors_197/2080': '317 Forensic & Toxicology',
  'https://t.me/futuredoctors_197/1933': '327 MPE Ethics',
  'https://t.me/futuredoctors_197/2703': 'Community Issues',
  'https://t.me/futuredoctors_197/3087': 'Elective Courses',
  'https://t.me/futuredoctors_194/7643': '424 Paediatrics',
  'https://t.me/futuredoctors_194/7644': '425 Obstetrics & Gynaecology',
  'https://t.me/futuredoctors_194/7639': '423 General Surgery',
  'https://t.me/futuredoctors_194/7641': '422 Internal Medicine',
  'https://t.me/futuredoctors_194/7640': '413 Psychiatry',
  'https://t.me/futuredoctors_194/7642': 'Family Medicine',
  'https://t.me/futuredoctors_194/9009': '418 Community Medicine',
  'https://t.me/futuredoctors_194/9031': 'Palliative Medicine & Oncology',
  'https://t.me/futuredoctors_196/9761': '434 Research',
  'https://t.me/futuredoctors_194/10635': 'Surgery',
  'https://t.me/futuredoctors_194/10636': 'Internal Medicine',
  'https://t.me/futuredoctors_194/11838': 'Family Medicine',
}))

function graphContext(url) {
  const record = graphByUrl.get(canonicalUrl(url))
  const currentPost = parsePost(record?.canonicalUrl || record?.url)
  const parentPost = parsePost(record?.parentUrl)
  const sequentialDistance = currentPost && parentPost && currentPost.channel.toLowerCase() === parentPost.channel.toLowerCase()
    ? currentPost.postId - parentPost.postId
    : null
  const trustworthyParentLabel = !/^Sequential file below:/iu.test(record?.parentLabel || '')
    || (sequentialDistance >= 1 && sequentialDistance <= 2)
  return {
    record,
    semantic: semanticByUrl.get(canonicalUrl(url)) || (trustworthyParentLabel ? record?.parentLabel : '') || '',
    text: record?.exactText || '',
  }
}

function moduleFromAncestry(url) {
  let key = canonicalUrl(url)
  const seen = new Set()
  while (key && !seen.has(key)) {
    seen.add(key)
    if (rootModule.has(key)) return rootModule.get(key)
    const record = graphByUrl.get(key)
    key = canonicalUrl(record?.parentUrl)
  }
  return null
}

function moduleFromText(year, haystack) {
  const hay = String(haystack || '').toLowerCase()
  if (year === 3) {
    if (/revision git 311|revision blood\s*&\s*tissues|revision arthropods?|arthr 2026|gr a\s*&\s*b handout|8_bank_of_questions|all formative assessments held in practical|الجامع المعين/iu.test(hay)) return '309 INF'
    if (/\b309\b|\binf[- ]?309\b/iu.test(hay)) return '309 INF'
    if (/\b310\b|\bpat[- ]?310\b/iu.test(hay)) return '310 PAT'
    if (/\b314\b|\binv[- ]?314\b/iu.test(hay)) return '314 Investigation'
    if (/oph(?:\b|_)|ophth|ophthalm|opthalm|glaucoma|retina|cornea|\beye\b|\bfadia\b|written previous exams|cases key words|osce elkasr|مسعد|رمد|عيون/iu.test(hay)) return '315 Ophthalmology'
    if (/(?:\b|_)ent(?:\b|_)|otorhino|phonetic|audiolog|\bear\b|\bnose\b|\bthroat\b|osce notes|minute v4|هتشخص|الأنف|الأذن|حنجرة/iu.test(hay)) return '316 ENT'
    if (/forensic|toxic|tox|poison|shereen|extras on department presentations|\bvimp\b|ages ka|numbers v2|doc-20260322|بصمج|ملف سخن|سموم|شرعي|شيرين/iu.test(hay)) return '317 Forensic & Toxicology'
    if (/nutrition|nutri|\bntr\b|diet|vitamin|breast.?feeding/iu.test(hay)) return '319 Nutrition'
    if (/investigation|\binv\b|radiolog|clinical path/iu.test(hay)) return '314 Investigation'
    if (/\bmpe\b|ethic|medical error|syndicate/iu.test(hay)) return '327 MPE Ethics'
    if (/community issue|قضايا مجتمعية|تنبيه عن مقرر القضايا/iu.test(hay)) return 'Community Issues'
    if (/elective|اختيارية|^(?:ps|ai|hm|qs|hr)(?:\s|_|-).*(?:exam|202[4-6])/iu.test(hay)) return 'Elective Courses'
    if (/patho|pharma|drug|chemotherap|antimicrobial prophylaxis/iu.test(hay)) return '310 PAT'
    if (/micro|bacter|virol|immuno|myco|paras|\bpara\b|protozo|nemat|cestod|tremat|helminth|entom|arthropod/iu.test(hay)) return '309 INF'
  }
  if (year === 4) {
    if (/paed|pediatr|peds|(?:^|[ _-])ped(?:[ _.-]|$)|neonat|growth and development|growth mcq|children|child health|immunization|diagnostic peds|genetic|bahrawi|past written questions updated 2008-2024|^(?:nutrition|infection|ages)\s*\.pdf|بحراوى/iu.test(hay)) return '424 Paediatrics'
    if (/obgyn|obs\s*&\s*gyn|obstetric|gyna|gynec|(?:^|[ _-])gyn(?:[ _.-]|$)|(?:^|[ _-])obs(?:[ _.-]|$)|amenorr|pregnan|antenatal|normal labor|malpresentation|std kasr|bacterial std|chancroid|genital tract infection|discharge summary|nadeen|nadine|hassan omar|ahmed suliman|mona abo el ghar|akram el adawy|hesham gaber|ismail abo el fotouh|^week \d|key answer week/iu.test(hay)) return '425 Obstetrics & Gynaecology'
    if (/psychi|psychait|\bmental\b|depress|schizo|anxiety|mood disorder|somatic symptom|neurocognitive|psychoactive|corrections.*psy|theor(?:etical|itical).*4th|osce mocks\s*&\s*exams/iu.test(hay)) return '413 Psychiatry'
    if (/family medicine|family extra|\bfm\b|\bfml\b|family[_ ]physician|famli|فاملي|geriatric health|traveler medicine|adult health|adolescence health|smoking|hypertension|asthma|referral system|focused history/iu.test(hay)) return 'Family Medicine'
    if (/community|\bcom\b|communicable disease|population policy|measurements? of health|medical records?|hospital infection|demograph|epidemiol|biostat|occupation health|occupational|outbreak investigation|\bphc\b|patient safety|primary health care|school.*health|environmental|health care management|arthropod.borne/iu.test(hay)) return '418 Community Medicine'
    if (/palliative|paliative|oncolog|systemic therapy|cancer|^eor\.pdf|^ospe\.pdf|all anathesia\s*&\s*final pharma|^paper [abc](?: \(1\))?\.pdf/iu.test(hay)) return 'Palliative Medicine & Oncology'
    if (/research|res[-_ ]?434|\bebm\b|evidence based/iu.test(hay)) return '434 Research'
    if (/internal medicine|(?:^|[ _-])im(?:[ _.-]|$)|\bmed[- ]?422\b|abdominal pain|bleeding|hemoptysis|dyspnea|fever|jaundice|liver cirrhosis|heart failure|\bhtn\b|diabetes|thyroid|respiratory|disturbed conscious|motor weakness|diagnostic[-+ ]|blood report|coagulation|stool analysis|\bblood\b|\bendo\b|\bneuro(?:logy)?\b|cardio|chest|rheumat|nephro|endocrin|gastro|\bgit\b|hepat|hematolog|anemia|edema|urine analysis|hemostasis/iu.test(hay)) return '422 Internal Medicine'
    if (/surg|operative|an(?:ae|e)sthes|vascular|acute abdomen|\bbreast\b|skin and subcutaneous|\bplastic\b|emergency/iu.test(hay)) return '423 General Surgery'
  }
  if (year === 5) {
    if (/family medicine|family physician/iu.test(hay)) return 'Family Medicine'
    if (/surg|(?:^|[ _-])sur(?:[ _.-]|$)|\bsur[- ]?423\b|ortho|(?:^|[ _-])uro(?:[ _.-]|$)|uoro|urolog|androlog|an(?:ae|e)sthes|plastic|vascular|operative|neurosurg|cardiothoracic|trauma|emergency|(?:^|[ _-])er(?:[ _.-]|$)|radiology|hazem khalil|general mcq notes by dr\.?altaib|study smarter basic mcq|study smarter pediatrics|جراحة|\bgit\b|\bgi\b/iu.test(hay)) return 'Surgery'
    if (/internal medicine|all internal|(?:^|[ _-])im(?:[ _.-]|$)|باطنة|\bicu\b|cardio|chest|neuro|coordination|cordination|rheumat|tropical|derma|nephro|endocrin|gastro|hepat|hemat|infect|motor system|sensory system|cranial|lymph disorder/iu.test(hay)) return 'Internal Medicine'
  }
  return 'General'
}

function moduleFromPost(year, sourceUrl) {
  const parsed = parsePost(sourceUrl)
  if (!parsed) return null
  const channel = parsed.channel.toLowerCase()
  const id = parsed.postId
  if (year === 3 && channel === 'futuredoctors_197') {
    if ([2388, 2838].includes(id)) return '317 Forensic & Toxicology'
  }
  if (year === 4 && channel === 'futuredoctors_196') {
    if ([9272, 9406, 9412, 9770, 9777].includes(id)) return '424 Paediatrics'
    if (id >= 9863 && id <= 9868 || id === 9294) return '425 Obstetrics & Gynaecology'
    if ([9424, 9899].includes(id)) return '413 Psychiatry'
    if ([9320, 9328, 9346, 9347, 9350, 9431, 9611, 9644].includes(id)) return '422 Internal Medicine'
    if (id === 9372) return '423 General Surgery'
    if ([9540, 9541, 9733].includes(id)) return 'Palliative Medicine & Oncology'
  }
  if (year === 5 && channel === 'futuredoctors_siraj') {
    if ([7357, 7473, 7632].includes(id)) return 'Surgery'
    if (id === 7502) return 'Internal Medicine'
  }
  return null
}

function isGeneralRelevant(file) {
  const name = file.originalName
  if (file.year === 3) return /\b(?:3rd year|197|309|310|314|315|316|317|319|327)\b|study guide|student guide|final exam ka/iu.test(name)
  if (file.year === 4) return /\b(?:4th year|196|413|418|422|423|424|425|434)\b|study guide|hospital map|خريطة/iu.test(name)
  if (file.year === 5) return /\b(?:5th year|195)\b|study guide|final checklist|high.yield.mcq/iu.test(name)
  return false
}

function subjectFor(year, module, haystack) {
  const hay = String(haystack || '').toLowerCase()
  if (module === 'Practical 3rd Year') {
    if (/patho/iu.test(hay)) return 'Pathology'
    if (/pharma|drug/iu.test(hay)) return 'Pharmacology'
    if (/micro|bacter|virol|immuno/iu.test(hay)) return 'Microbiology'
    if (/para|protozo|nemat|cestod|tremat|helminth|entom/iu.test(hay)) return 'Parasitology'
    return 'General'
  }
  if (module === '309 INF') return /para|protozo|nemat|cestod|tremat|helminth|entom|arthropod/iu.test(hay) ? 'Parasitology' : 'Microbiology'
  if (module === '310 PAT') return /pharma|drug|chemotherap|antimicrobial/iu.test(hay) ? 'Pharmacology' : 'Pathology'
  if (module === '314 Investigation') {
    if (/radiolog/iu.test(hay)) return 'Radiology'
    if (/clinical path/iu.test(hay)) return 'Clinical Pathology'
    if (/micro|bacter/iu.test(hay)) return 'Microbiology'
    return 'Integrated Investigation'
  }
  if (module === '317 Forensic & Toxicology') return /toxic|\btox\b|poison|plant/iu.test(hay) ? 'Toxicology' : 'Forensic Medicine'
  if (module === '425 Obstetrics & Gynaecology') return /obstetric|\bobs\b|antenatal|pregnan/iu.test(hay) ? 'Obstetrics' : /gynae|gynec|\bgyn\b|amenorr/iu.test(hay) ? 'Gynaecology' : 'Obstetrics & Gynaecology'
  if (module === 'Palliative Medicine & Oncology') return /oncolog|cancer|systemic therapy/iu.test(hay) ? 'Oncology' : 'Palliative Medicine'
  if (year === 5 && module === 'Surgery') {
    if (/ortho/iu.test(hay)) return 'Orthopaedics'
    if (/(?:^|[ _-])uro(?:[ _.-]|$)|uoro|urolog/iu.test(hay)) return 'Urology'
    if (/androlog/iu.test(hay)) return 'Andrology'
    if (/an(?:ae|e)sthes/iu.test(hay)) return 'Anaesthesia'
    if (/plastic/iu.test(hay)) return 'Plastic Surgery'
    if (/vascular/iu.test(hay)) return 'Vascular Surgery'
    if (/neurosurg/iu.test(hay)) return 'Neurosurgery'
    if (/cardiothoracic/iu.test(hay)) return 'Cardiothoracic Surgery'
    if (/trauma|emergency|\ber\b/iu.test(hay)) return 'Emergency & Trauma'
    return 'General Surgery'
  }
  if (year === 5 && module === 'Internal Medicine') {
    if (/cardio|heart/iu.test(hay)) return 'Cardiology'
    if (/chest|respir/iu.test(hay)) return 'Chest Medicine'
    if (/neuro|motor system|sensory system|cranial|coordination/iu.test(hay)) return 'Neurology'
    if (/rheumat/iu.test(hay)) return 'Rheumatology'
    if (/tropical|infect/iu.test(hay)) return 'Tropical Medicine & Infections'
    if (/derma/iu.test(hay)) return 'Dermatology'
    if (/nephro|renal/iu.test(hay)) return 'Nephrology'
    if (/endocrin|diabet/iu.test(hay)) return 'Endocrinology'
    if (/gastro|\bgit\b|hepat|liver/iu.test(hay)) return 'Gastroenterology & Hepatology'
    if (/hemat|blood/iu.test(hay)) return 'Haematology'
    return 'General Internal Medicine'
  }
  return module.replace(/^\d+\s*/u, '') || 'General'
}

function categoryFor(year, module, haystack) {
  const hay = String(haystack || '')
  const department = /department|\bdept\b|\bdep\.?\b|\bd\.b\b|(?:^|[ _-])db(?:[ _.-]|$)|كتاب (?:ال)?قسم|اسئلة (?:ال)?قسم|أسئلة (?:ال)?قسم/iu.test(hay)
  const questions = /mcq|question|exam|past paper|previous year|previous exam|quiz|assessment|formative|written|matching|test|اسئلة|أسئلة|امتحان/iu.test(hay)
  if (year === 5 && !/\b4th year\b/iu.test(hay) && /(?:\bim\b|\bsur(?:gery)?\b).*(?:exam|paper).*(?:1st|2nd) round|(?:1st|2nd) round.*(?:\bim\b|\bsur(?:gery)?\b).*(?:exam|paper)/iu.test(hay)) return 'EOY'
  if (/\bfinal\s+module\b/iu.test(hay)) return 'EOM'
  if (module === 'Palliative Medicine & Oncology' && /all anathesia\s*&\s*final pharma/iu.test(hay)) return 'Notes & Books'
  if (module === 'Palliative Medicine & Oncology' && /\beor\b|end of round|end[- ]?round|^paper a(?: \(1\))?\.pdf/iu.test(hay)) return 'EOM'
  if (/\beom\b|end of (?:the )?module|end[- ]?module|end of round|end[- ]?round|\beor\b|\bend exam\b/iu.test(hay)) return 'EOM'
  if (/\beoy\b|end of year|end[- ]?year/iu.test(hay)) return 'EOY'
  if (/orientation|تقسيم درجات|خريطة مستشفى|study guide/iu.test(hay)) return 'Orientation'
  if (department && questions) return 'Department Questions'
  if (department || /\binf[- ]?309 book\b|study guide|student guide/iu.test(hay)) return 'Department Book'
  if ((/\bfinal\b|فاينل/iu.test(hay)) && questions) return 'EOY'
  if (/practical|\bosce\b|\bospe\b|clinical exam|clinical examination|checklist|microscope|\bjars?\b|data show|عملي/iu.test(hay)) return 'Practical & OSCE'
  if (/\bfinal\b|فاينل/iu.test(hay)) return 'EOY'
  if (questions) return 'Questions & MCQs'
  if (/book|handout|slides?|presentation|notes?|summary|mind ?maps?|scheme|tables?|atlas|كتاب|ملزمة|ملازم|سلايد/iu.test(hay)) return 'Notes & Books'
  return 'Other Useful Files'
}

function doctorFor(haystack) {
  const source = String(haystack || '').replace(/\.(?:pdf|pptx?|docx?|xlsx?)\b/giu, ' ').replace(/[_-]+/gu, ' ')
  const arabic = [...source.matchAll(/(?:^|\s)(?:د\.|دكتور|الدكتور|الدكتورة)\s*([\u0600-\u06ff]+(?:\s+[\u0600-\u06ff]+){0,1})/giu)].map(match => match[1].trim())
  if (arabic.length) return normalizeDoctor(`Dr. ${arabic.at(-1)}`)
  const matches = [...source.matchAll(/\bDr\.?\s*([A-Za-z][A-Za-z.'-]*(?:\s+[A-Za-z][A-Za-z.'-]*){0,3})/giu)]
  if (!matches.length) return null
  let name = matches.at(-1)[1]
  name = name.replace(/\b(?:MCQ|Questions?|Exam|Notes?|Book|Slides?|Final|Practical|Revision|Answered|Unanswered|Part|Volume|Module|Department|Cases?|Mind|Maps?|Year|Kasr|Edited|Highlighted|Theoretical|Clinical)\b.*$/iu, '').trim()
  return name ? normalizeDoctor(`Dr. ${name}`) : null
}

function normalizeDoctor(value) {
  let doctor = String(value || '').replace(/\bV\d*\b.*$/iu, '').replace(/\s+/gu, ' ').trim()
  const key = doctor.toLowerCase().replace(/[^a-z\u0600-\u06ff]+/gu, '')
  if (/elmatary|matary/u.test(key)) return 'Dr. El-Matary'
  if (key === 'drhazem') return 'Dr. Hazem Khalil'
  if (/elsherif/u.test(key)) return 'Dr. El-Sherif'
  if (/eltoukhy/u.test(key)) return 'Dr. El-Toukhy'
  if (/elnemr/u.test(key)) return 'Dr. El-Nemr'
  return doctor
}

function resolveStagingPath(value) {
  if (!value) return null
  if (path.isAbsolute(value)) return value
  return path.join(path.dirname(libraryRoot), value)
}

function loadState(spec) {
  const [year, batch, kind, filename] = spec
  const state = JSON.parse(fs.readFileSync(path.join(discoveryRoot, filename), 'utf8'))
  const occurrences = new Map()
  for (const occurrence of state.occurrences || []) {
    const id = String(occurrence.doc_id || occurrence.telegramDocumentId || '')
    if (!occurrences.has(id) || occurrence.status === 'staged') occurrences.set(id, occurrence)
  }
  return (state.files || []).map(file => {
    const occurrence = occurrences.get(String(file.telegramDocumentId || ''))
    const sourcePath = resolveStagingPath(file.stagingPath)
    const postId = occurrence?.mid ? Number(occurrence.mid) - 4294967296 : null
    const sourceUrl = postId > 0 ? `https://t.me/${channelForBatch[batch]}/${postId}` : null
    return {
      year, batch, kind, sourcePath, sourceUrl, postId,
      originalName: file.originalName || file.canonicalName,
      canonicalName: file.canonicalName || file.originalName,
      bytes: file.bytes,
      sha256: file.sha256,
      telegramDocumentId: file.telegramDocumentId,
    }
  }).filter(file => file.sourcePath && fs.existsSync(file.sourcePath))
}

const allYearFiles = stateSpecs.flatMap(loadState)

const moduleYear = module => /^(?:309|310|314|315|316|317|319|327)|^Practical 3rd|^Community Issues|^Elective/iu.test(module || '') ? 3
  : /^(?:413|418|422|423|424|425|434)|^Palliative/iu.test(module || '') ? 4
  : /^(?:Surgery|Internal Medicine)$/iu.test(module || '') ? 5 : null

// Match directly referenced attachments against every relevant staging collection,
// including cross-year links. Exact post URLs win; conservative title matching is
// retained for older Batch 194 material whose source metadata is incomplete.
const batch194Files = loadState([0, 194, 'archive194', 'batch194-full-download-state.json'])
const linkedSourceFiles = [...allYearFiles, ...batch194Files]
const linkedByUrl = new Map()
for (const file of linkedSourceFiles) {
  const key = canonicalUrl(file.sourceUrl)
  if (!key) continue
  if (!linkedByUrl.has(key)) linkedByUrl.set(key, [])
  linkedByUrl.get(key).push(file)
}
const batch194ByName = new Map()
for (const file of batch194Files) {
  const key = normalName(file.originalName)
  if (!batch194ByName.has(key)) batch194ByName.set(key, [])
  batch194ByName.get(key).push(file)
}

const historicalMatches = []
for (const record of graph.records) {
  if (![3, 4, 5].includes(record.year)) continue
  const key = canonicalUrl(record.canonicalUrl || record.url)
  const ancestryModule = moduleFromAncestry(key)
  const directFiles = linkedByUrl.get(key) || []
  if (ancestryModule && directFiles.length) {
    for (const direct of directFiles) {
      historicalMatches.push({
        ...direct,
        year: moduleYear(ancestryModule) || record.year,
        kind: 'directly linked historical/current source',
        sourceUrl: record.canonicalUrl || record.url,
        postId: parsePost(record.canonicalUrl || record.url)?.postId || direct.postId,
        graphIndex: graphByUrl.get(key)?.graphIndex,
      })
    }
    continue
  }
  const labels = [record.attachment?.title, semanticByUrl.get(key), String(record.exactText || '').split('\n').find(Boolean)].filter(Boolean)
  let matched = null
  for (const label of labels) {
    const normalized = normalName(label)
    if (normalized.length < 8) continue
    const exact = batch194ByName.get(normalized)
    if (exact?.length) { matched = exact[0]; break }
    const labelWords = words(label)
    if (labelWords.size < 2) continue
    let best = null
    if (!ancestryModule) continue
    for (const candidate of batch194Files) {
      const candidateWords = words(candidate.originalName)
      const overlap = [...labelWords].filter(word => candidateWords.has(word)).length
      const score = (2 * overlap) / (labelWords.size + candidateWords.size || 1)
      if (score >= 0.94 && (!best || score > best.score)) best = { candidate, score }
    }
    if (best) { matched = best.candidate; break }
  }
  if (!matched) continue
  historicalMatches.push({
    ...matched,
    year: moduleYear(ancestryModule) || record.year,
    batch: 194,
    kind: 'linked archive',
    sourceUrl: record.canonicalUrl || record.url,
    postId: parsePost(record.canonicalUrl || record.url)?.postId || matched.postId,
    graphIndex: graphByUrl.get(key)?.graphIndex,
  })
}

const obviousWrongYear = (year, name) => year === 3 && /\b(?:101|102|103|104|108|205|206|207|208|210)\b|\b(?:1st|2nd) year\b/iu.test(name)
const candidates = [...allYearFiles, ...historicalMatches].filter(file => {
  const ext = path.extname(file.sourcePath).toLowerCase()
  if (blocked.has(ext) || !allowed.has(ext) || Number(file.bytes || 0) <= 0) return false
  if (obviousWrongYear(file.year, file.originalName) && !graphByUrl.has(canonicalUrl(file.sourceUrl))) return false
  const linkedYear = moduleYear(moduleFromAncestry(file.sourceUrl))
  if (!String(file.kind).includes('directly linked') && linkedYear && linkedYear !== file.year) return false
  return true
})

const pendingHighPriority = []
for (const [declaredYear, batch, collectionKind, filename] of [...stateSpecs, [0, 194, 'archive194', 'batch194-full-download-state.json']]) {
  const state = JSON.parse(fs.readFileSync(path.join(discoveryRoot, filename), 'utf8'))
  for (const occurrence of state.occurrences || []) {
    if (occurrence.status !== 'not-downloaded') continue
    if (!/\beom\b|\beoy\b|end of (?:the )?(?:module|year|round)|end[- ]?(?:module|year|round)|\beor\b|\bfinal\b.*\bexam\b|\bexam\b.*\bfinal\b/iu.test(occurrence.name || '')) continue
    const postId = Number(occurrence.mid) - 4294967296
    if (!Number.isFinite(postId) || postId <= 0) continue
    const sourceUrl = `https://t.me/${channelForBatch[batch]}/${postId}`
    const declaredModule = moduleFromText(declaredYear, occurrence.name)
    const ancestryModule = moduleFromAncestry(sourceUrl)
    const strongYear3Module = /\b(?:309|310|314|315|316|317|319|327)\b|\binf\b|\bpat\b|\binv\b|forensic|toxic|ophthal|(?:^|[ _-])ent(?:[ _.-]|$)/iu.test(occurrence.name || '')
      ? moduleFromText(3, occurrence.name)
      : null
    const crossYearModule = [3, 4, 5].map(candidateYear => moduleFromText(candidateYear, occurrence.name)).find(candidate => candidate !== 'General')
    const explicitModule = declaredModule !== 'General' ? declaredModule : strongYear3Module && strongYear3Module !== 'General' ? strongYear3Module : ancestryModule || crossYearModule
    const module = explicitModule || 'General'
    if (collectionKind !== 'current' && !explicitModule && !moduleFromAncestry(sourceUrl)) continue
    const year = moduleYear(module) || declaredYear
    if (![3, 4, 5].includes(year)) continue
    if (obviousWrongYear(year, occurrence.name) || year === 4 && /\b3rd\b.*\bold\b/iu.test(occurrence.name)) continue
    pendingHighPriority.push({ year, module, name: occurrence.name, sourceUrl, size: occurrence.size || '', reason: occurrence.reason || 'not present in staging' })
  }
}

const enriched = candidates.map(file => {
  const context = graphContext(file.sourceUrl)
  const hay = `${file.originalName} ${context.semantic} ${context.text}`
  const ancestryModule = moduleFromAncestry(file.sourceUrl)
  const postModule = moduleFromPost(file.year, file.sourceUrl)
  const filenameModule = moduleFromText(file.year, file.originalName)
  const inferred = moduleFromText(file.year, hay)
  let module = filenameModule !== 'General' ? filenameModule
    : ancestryModule && ancestryModule !== 'General' ? ancestryModule
      : postModule || inferred
  if (module === 'General' && file.kind === 'current' && !isGeneralRelevant(file)) module = '_Needs Review'
  const inferredSubject = subjectFor(file.year, module, hay)
  const filenameSubject = subjectFor(file.year, module, file.originalName)
  const subject = module === '_Needs Review' ? 'Unclassified Current Documents'
    : module === '425 Obstetrics & Gynaecology' && filenameSubject !== 'Obstetrics & Gynaecology' ? filenameSubject
      : inferredSubject
  const categoryHay = `${file.originalName} ${context.semantic} ${context.text && context.text.length < 500 ? context.text : ''}`
  const filenameCategory = categoryFor(file.year, module, file.originalName)
  const decisiveCategories = new Set(['EOM', 'EOY', 'Orientation', 'Department Book', 'Department Questions', 'Practical & OSCE', 'Questions & MCQs'])
  const category = decisiveCategories.has(filenameCategory) ? filenameCategory : categoryFor(file.year, module, categoryHay)
  const doctor = doctorFor(file.originalName)
  const graphIndex = context.record?.graphIndex ?? file.graphIndex
  const sourceOrder = Number.isFinite(graphIndex) ? graphIndex : 100000 + Number(file.postId || 99999)
  return { ...file, context: `${context.semantic}${context.text ? ` | ${context.text}` : ''}`.trim(), module, subject, category, doctor, sourceOrder, ancestryModule }
}).filter(file => {
  if (file.year !== 3 && file.module === 'Practical 3rd Year') return false
  if (file.module !== 'General') return true
  if (file.kind === 'archive') return false
  if (file.kind === 'linked archive' && file.ancestryModule) return true
  return isGeneralRelevant(file)
})

// Prefer the latest directly staged occurrence for identical content, while keeping
// every occurrence in the provenance CSV.
const rank = entry => ({ 'current': 5, 'linked archive': 4, 'archive': 3, 'archive194': 1 }[entry.kind] || 0)
const byYearSha = new Map()
for (const entry of enriched) {
  const key = `${entry.year}:${entry.sha256 || `${entry.originalName}:${entry.bytes}`}`
  if (!byYearSha.has(key) || rank(entry) > rank(byYearSha.get(key))) byYearSha.set(key, entry)
}
const canonicalFiles = [...byYearSha.values()]

const sourcePriorities = new Map()
for (const entry of [...canonicalFiles].sort((a, b) => a.sourceOrder - b.sourceOrder || a.originalName.localeCompare(b.originalName))) {
  if (entry.category.startsWith('Department')) continue
  const group = `${entry.year}|${entry.module}|${entry.subject}`
  if (!sourcePriorities.has(group)) sourcePriorities.set(group, new Map())
  const source = entry.doctor || 'Other Useful'
  const map = sourcePriorities.get(group)
  if (!map.has(source)) map.set(source, map.size + 2)
}

function destinationParts(entry) {
  const fixed = ['EOY', 'EOM', 'Department Book', 'Department Questions', 'Orientation', 'Practical & OSCE', 'Questions & MCQs']
  if (fixed.includes(entry.category)) return [entry.module, entry.subject, entry.category]
  const group = `${entry.year}|${entry.module}|${entry.subject}`
  const source = entry.doctor || 'Other Useful'
  const priority = sourcePriorities.get(group)?.get(source) || 2
  const folder = `${entry.subject} ${source} [${ordinal(priority)} priority]`
  return [entry.module, entry.subject, safe(folder), entry.category === 'Notes & Books' ? 'Notes & Books' : 'Files']
}

function outputName(entry) {
  const ext = path.extname(entry.originalName)
  let stem = safe(entry.originalName.slice(0, ext ? -ext.length : undefined)) || `Telegram document ${entry.telegramDocumentId}`
  if (entry.category === 'EOM' || entry.category === 'EOY') {
    stem = stem.replace(/^(?:EOM|EOY)\s*[-–—:]?\s*/iu, '')
    stem = `${entry.category} - ${stem}`
    if (!/\b(?:19[0-9]|200|20\d{2})\b/u.test(stem)) stem += ` [${entry.batch || batchForYear[entry.year]}]`
  }
  return `${stem}${ext.toLowerCase()}`
}

function uniqueDestination(directory, name, bytes) {
  let destination = path.join(directory, name)
  if (!fs.existsSync(destination)) return destination
  if (fs.statSync(destination).size === Number(bytes)) return null
  const ext = path.extname(name)
  const stem = name.slice(0, ext ? -ext.length : undefined)
  let index = 2
  while (fs.existsSync(destination)) destination = path.join(directory, `${stem} (${index++})${ext}`)
  return destination
}

const reports = {}
for (const year of [3, 4, 5]) {
  const root = path.join(targetParent, `y${year}`)
  const catalogDir = path.join(root, '_Catalog')
  fs.mkdirSync(catalogDir, { recursive: true })
  const yearFiles = canonicalFiles.filter(file => file.year === year)
  const linkedRows = []
  let hardLinked = 0
  let cloned = 0
  for (const entry of yearFiles) {
    const directory = path.join(root, ...destinationParts(entry).map(safe))
    fs.mkdirSync(directory, { recursive: true })
    const destination = uniqueDestination(directory, outputName(entry), entry.bytes)
    if (!destination) continue
    try {
      fs.linkSync(entry.sourcePath, destination)
      hardLinked += 1
    } catch (error) {
      if (error?.code !== 'EXDEV' && error?.code !== 'EPERM') throw error
      fs.copyFileSync(entry.sourcePath, destination, fs.constants.COPYFILE_FICLONE)
      cloned += 1
    }
    linkedRows.push({ ...entry, destination })
  }

  const occurrences = enriched.filter(entry => entry.year === year)
  const csvRows = [['Year', 'Module', 'Subject', 'Category', 'Priority Source', 'Destination File', 'Original File', 'Source URL', 'Source Batch', 'Staging Path', 'SHA-256', 'Telegram Context']]
  for (const occurrence of occurrences) {
    const canonical = linkedRows.find(row => row.sha256 === occurrence.sha256)
    const group = `${occurrence.year}|${occurrence.module}|${occurrence.subject}`
    const priority = occurrence.category.startsWith('Department') ? '1st priority' : `${ordinal(sourcePriorities.get(group)?.get(occurrence.doctor || 'Other Useful') || 2)} priority`
    csvRows.push([year, occurrence.module, occurrence.subject, occurrence.category, `${occurrence.doctor || 'Other Useful'} [${priority}]`, canonical ? path.relative(root, canonical.destination) : '', occurrence.originalName, occurrence.sourceUrl || '', occurrence.batch, occurrence.sourcePath, occurrence.sha256 || '', occurrence.context])
  }
  fs.writeFileSync(path.join(catalogDir, 'Telegram Source Catalog.csv'), csvRows.map(row => row.map(csv).join(',')).join('\n'))

  const textOnly = graph.records.filter(record => {
    if (record.year !== year || !record.exactText || record.attachment || (record.links?.length || 0) > 1) return false
    return /exam|eom|eoy|end of (?:module|year|round)|mcq|written|question|practical|osce|ospe|امتحان|اسئلة|أسئلة/iu.test(record.exactText)
  })
  const textSections = textOnly.map(record => {
    const url = record.canonicalUrl || record.url
    const semantic = semanticByUrl.get(canonicalUrl(url)) || record.parentLabel || 'Text-only Telegram exam/question message'
    const module = moduleFromAncestry(url) || moduleFromText(year, `${semantic} ${record.exactText}`)
    return `## ${module} — ${semantic}\n\nSource: ${url}\n\n${record.exactText.trim()}\n`
  })
  fs.writeFileSync(path.join(catalogDir, 'Past Exams and Text-Only Questions.md'), `# Past Exams and Text-Only Questions — Year ${year}\n\n${textSections.join('\n---\n\n') || 'No text-only past-exam messages were exposed publicly.'}\n`)

  const indexRecords = graph.records.filter(record => record.year === year && record.exactText && ((record.links?.length || 0) > 1 || record.depth <= 1))
  fs.writeFileSync(path.join(catalogDir, 'Telegram Message Index.md'), `# Telegram Message Index — Year ${year}\n\n${indexRecords.map(record => `## ${moduleFromAncestry(record.canonicalUrl || record.url) || 'General'}\n\nSource: ${record.canonicalUrl || record.url}\n\n${record.exactText.trim()}\n`).join('\n---\n\n')}\n`)

  const matchedUrls = new Set(occurrences.map(entry => canonicalUrl(entry.sourceUrl)).filter(Boolean))
  const unresolved = graph.records.filter(record => record.year === year && (record.error || (!record.exactText && !record.attachment)) && !matchedUrls.has(canonicalUrl(record.canonicalUrl || record.url)))
  fs.writeFileSync(path.join(catalogDir, 'Unresolved Telegram Links.md'), `# Unresolved Telegram Links — Year ${year}\n\nThese endpoints were retained for provenance because Telegram did not expose readable public text or an attachment title. Files already found in staging are not listed here.\n\n${unresolved.map(record => `- ${record.canonicalUrl || record.url}${record.parentLabel ? ` — ${record.parentLabel}` : ''}`).join('\n') || 'None.'}\n`)

  const organizedNames = new Set(occurrences.map(entry => normalName(entry.originalName)))
  const missingHighPriority = pendingHighPriority
    .filter(entry => entry.year === year && !organizedNames.has(normalName(entry.name)))
    .filter((entry, index, array) => array.findIndex(candidate => normalName(candidate.name) === normalName(entry.name)) === index)
  fs.writeFileSync(path.join(catalogDir, 'Missing High-Priority Downloads.md'), `# Missing High-Priority Downloads — Year ${year}\n\nThese EOM, EOY, end-round, or final-exam files were named by Telegram and retained here with direct source links, but no matching local file was present in staging and Telegram's public preview did not expose the document payload. They were not silently omitted.\n\n${missingHighPriority.map(entry => `- **${entry.name}** — ${entry.module || 'General'} — ${entry.size || 'size unknown'} — ${entry.sourceUrl}`).join('\n') || 'None.'}\n`)

  const yearGraph = { ...graph, records: graph.records.filter(record => record.year === year) }
  fs.writeFileSync(path.join(catalogDir, 'Telegram Message Graph.json'), JSON.stringify(yearGraph, null, 2))

  const eomFiles = linkedRows.filter(row => row.category === 'EOM')
  const eoyFiles = linkedRows.filter(row => row.category === 'EOY')
  const prefixFailures = [...eomFiles.filter(row => !/^EOM\b/iu.test(path.basename(row.destination))), ...eoyFiles.filter(row => !/^EOY\b/iu.test(path.basename(row.destination)))]
  const zeroByte = linkedRows.filter(row => fs.statSync(row.destination).size === 0)
  const media = linkedRows.filter(row => blocked.has(path.extname(row.destination).toLowerCase()))
  const report = {
    year,
    sourceOccurrences: occurrences.length,
    uniqueOrganizedFiles: linkedRows.length,
    hardLinked,
    cloned,
    exactDuplicateOccurrencesDeduplicated: occurrences.length - yearFiles.length,
    EOM: eomFiles.length,
    EOY: eoyFiles.length,
    departmentBooks: linkedRows.filter(row => row.category === 'Department Book').length,
    departmentQuestions: linkedRows.filter(row => row.category === 'Department Questions').length,
    practicalAndOSCE: linkedRows.filter(row => row.category === 'Practical & OSCE').length,
    textOnlyExamMessages: textOnly.length,
    unresolvedTelegramEndpoints: unresolved.length,
    missingHighPriorityDownloads: missingHighPriority.length,
    prefixFailures: prefixFailures.map(row => path.relative(root, row.destination)),
    zeroByteFiles: zeroByte.map(row => path.relative(root, row.destination)),
    excludedMediaPresent: media.map(row => path.relative(root, row.destination)),
    generatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(path.join(catalogDir, 'Final Verification.json'), JSON.stringify(report, null, 2))
  fs.writeFileSync(path.join(root, 'README.md'), `# Kasr Al-Ainy Year ${year}\n\nOrganized by module, then subject. Department material is first priority; named doctor and other useful sources begin at second priority in Telegram appearance order. End-of-module and end-of-year files are prefixed EOM and EOY and include a year or batch code. Audio, video, voice notes, animations, and explanatory videos were excluded. Ambiguous documents from the current-year staging set are retained under _Needs Review instead of being discarded or forced into an uncertain module.\n\nSee the _Catalog folder for the Telegram source ledger, preserved text-only exam questions, full message index, unresolved endpoints, and final verification report.\n`)
  reports[`y${year}`] = report
}

process.stdout.write(`${JSON.stringify(reports, null, 2)}\n`)
