import fs from 'node:fs';

const input = process.argv[2];
if (!input) throw new Error('Usage: node tools/build-y2-manifest.mjs <pasted-text.txt>');

const raw = fs.readFileSync(input, 'utf8');
const lines = raw.split(/\r?\n/);
const urlRe = /https:\/\/t\.me\/[A-Za-z0-9_]+\/\d+/gi;
let moduleName = 'General';
let subject = 'General';
let blockStart = 0;
let downloadMode = false;
let departmentMode = false;
const items = [];

function normalizeModule(line) {
  const m = line.match(/Module\s+(205|206|207|208|210)\s*\[?([A-Z]{3})?/i);
  if (m) return `${m[1]} ${m[2] || ({205:'NEU',206:'DIG',207:'END',208:'INT',210:'PAT'})[m[1]]}`;
  if (/Psychology/i.test(line) || /علم النفس/.test(line)) return '213 Psychology';
  if (/Practical 2nd Year|Anatomy Practical|Physio Practical|Histo Practical|Pharma Practical|Patho Practical/i.test(line)) return 'Practical';
  if (/Secondary Modules/i.test(line)) return '2ry Modules';
  if (/Research\s*-?\s*234|RES-234/i.test(line)) return '2ry Modules/RES-234 Research';
  return null;
}

function normalizeSubject(line) {
  const tests = [
    ['Anatomy', /Anatomy/i], ['Physiology', /Physio/i], ['Histology', /Histo/i],
    ['Biochemistry', /Biochem|\bBio\b/i], ['Pharmacology', /Pharma/i],
    ['Pathology', /Patho/i], ['Psychology', /Psychology|Psycho|سايكو/i],
    ['Research', /Research|RES-234/i], ['MPE', /\bMPE\b/i], ['EPE', /\bEPE\b/i],
    ['Health Economics', /Health economics/i], ['Computer', /Computer/i],
    ['Entrepreneurship', /Entrepreneurship|ريادة/i]
  ];
  return tests.find(([,re]) => re.test(line))?.[0] || null;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) {
    blockStart = i + 1;
    downloadMode = false;
    departmentMode = false;
    continue;
  }
  const mod = normalizeModule(line);
  if (mod && (/^🟥|^🟩|^Module|Practical|Psychology|Research/i.test(line))) moduleName = mod;
  if (/^🟩|^🟨|^🟥.*Practical/i.test(line)) {
    const sub = normalizeSubject(line);
    if (sub) subject = sub;
  }
  if (/DOWNLOAD/i.test(line)) {
    downloadMode = true;
    departmentMode ||= /DOWNLOAD\s*DPT/i.test(line);
  }
  const urls = line.match(urlRe) || [];
  for (const url of urls) {
    const context = lines.slice(Math.max(blockStart, i - 8), i + 1)
      .map(s => s.replace(urlRe, '').trim()).filter(Boolean).join(' ');
    const lower = context.toLowerCase();
    let category = 'Subject Resources';
    if (/end of module|\beom\b/.test(lower)) category = 'EOM';
    else if (/\bfinal\b|end of year|\beoy\b/.test(lower)) category = 'EOY';
    else if (/orientation/.test(lower)) category = 'Orientation';
    else if (/practical/.test(lower)) category = 'Practical';
    else if (/mcq|question|exam|اسئلة|اختبار/.test(lower)) category = departmentMode ? 'Department Questions' : 'Questions';
    else if (/book|كتاب القسم|department book/.test(lower)) category = 'Department Book';
    const inferredSubject = normalizeSubject(context) || subject;
    if (downloadMode) items.push({url, module: moduleName, subject: inferredSubject, category, department: departmentMode, context, line: i + 1});
  }
}

const extras = [
  // Batch 198 exams (highest priority)
  ['FUTUREDOCTORS_194',15796,'206 DIG','General','EOM',true,'Batch 198 EOM 206'],
  ['FUTUREDOCTORS_194',15798,'207 END','General','EOM',true,'Batch 198 EOM 207'],
  ['FUTUREDOCTORS_194',15801,'208 INT','General','EOM',true,'Batch 198 EOM 208'],
  ['FUTUREDOCTORS_194',15806,'205 NEU','General','EOY',true,'Batch 198 EOY 1st 205'],
  ['FUTUREDOCTORS_194',15809,'206 DIG','General','EOY',true,'Batch 198 EOY 1st 206'],
  ['FUTUREDOCTORS_194',15812,'207 END','General','EOY',true,'Batch 198 EOY 1st 207'],
  ['FUTUREDOCTORS_194',15815,'208 INT','General','EOY',true,'Batch 198 EOY 1st 208'],
  ['FUTUREDOCTORS_194',15818,'210 PAT','General','EOY',true,'Batch 198 EOY 1st 210'],
  ['FUTUREDOCTORS_194',15823,'205 NEU','General','EOY',true,'Batch 198 EOY 2nd 205'],
  ['FUTUREDOCTORS_194',15826,'207 END','General','EOY',true,'Batch 198 EOY 2nd 207'],
  ['FUTUREDOCTORS_194',15829,'208 INT','General','EOY',true,'Batch 198 EOY 2nd 208'],

  // RES-234
  ['FUTUREDOCTORS_198',4264,'2ry Modules/RES-234 Research','Research','Department Book',true,'Research department book 2026'],
  ['FUTUREDOCTORS_194',15335,'2ry Modules/RES-234 Research','Research','Department Book',true,'Research college slides 2025'],
  ['FUTUREDOCTORS_194',2415,'2ry Modules/RES-234 Research','Research','Orientation',true,'Research OSPE orientation file'],
  ['FUTUREDOCTORS_198',4248,'2ry Modules/RES-234 Research','Research','Subject Resources',false,'Research Dr. Kandeel notes 2026'],
  ['FUTUREDOCTORS_194',15334,'2ry Modules/RES-234 Research','Research','Subject Resources',false,'Research OSPE laws summary'],
  ['FUTUREDOCTORS_198',4356,'2ry Modules/RES-234 Research','Research','EOY',true,'Research exam 2026 batch 198'],
  ['FUTUREDOCTORS_198',4334,'2ry Modules/RES-234 Research','Research','EOY',true,'Research previous exams 193-197'],
  ['Futuredoctors194',20362,'2ry Modules/RES-234 Research','Research','Department Questions',true,'Research questions'],
  ['Futuredoctors194',20367,'2ry Modules/RES-234 Research','Research','Practical',true,'Research OSPE questions'],
  ['FUTUREDOCTORS_Siraj',5696,'2ry Modules/RES-234 Research','Research','EOY',true,'Research previous exams'],
  ['FUTUREDOCTORS_198',4342,'2ry Modules/RES-234 Research','Research','Department Questions',true,'Research department questions'],
  ['FUTUREDOCTORS_198',4251,'2ry Modules/RES-234 Research','Research','Questions',false,'Research exams by Dr. Kandeel'],
  ['FUTUREDOCTORS_198',4252,'2ry Modules/RES-234 Research','Research','Questions',false,'Research questions by Dr. Kandeel'],
  ['FUTUREDOCTORS_196',7309,'2ry Modules/RES-234 Research','Research','EOY',true,'Research exam 2024 batch 196'],
  ['FUTUREDOCTORS_198',4283,'2ry Modules/RES-234 Research','Research','EOY',true,'Research exam 2025 batch 197'],
  ['FUTUREDOCTORS_194',15339,'2ry Modules/RES-234 Research','Research','Practical',true,'Research protocol practical questions'],

  // EPE-230
  ['FUTUREDOCTORS_194',15363,'2ry Modules/EPE-230','EPE','Orientation',true,'EPE 2 orientation'],
  ['FUTUREDOCTORS_198',4345,'2ry Modules/EPE-230','EPE','Department Book',true,'EPE department book 2026'],
  ['FUTUREDOCTORS_Siraj',5760,'2ry Modules/EPE-230','EPE','Department Book',true,'EPE department slides'],
  ['FUTUREDOCTORS_196',7083,'2ry Modules/EPE-230','EPE','Subject Resources',false,'EPE slides by Dr. Howaida'],
  ['FUTUREDOCTORS_194',15342,'2ry Modules/EPE-230','EPE','Subject Resources',false,'EPE notes by Dr. Fawzy'],
  ['FUTUREDOCTORS_198',4496,'2ry Modules/EPE-230','EPE','Subject Resources',false,'EPE notes by Dr. Alaa'],
  ['FUTUREDOCTORS_198',4543,'2ry Modules/EPE-230','EPE','EOY',true,'EPE all previous years'],
  ['FUTUREDOCTORS_198',4498,'2ry Modules/EPE-230','EPE','Questions',false,'EPE questions by Dr. Alaa'],
  ['FUTUREDOCTORS_198',4500,'2ry Modules/EPE-230','EPE','Questions',false,'EPE exam by Dr. Alaa'],
  ['FUTUREDOCTORS_196',7082,'2ry Modules/EPE-230','EPE','EOY',true,'EPE previous-year solutions by Dr. Howaida'],
  ['FUTUREDOCTORS_194',15359,'2ry Modules/EPE-230','EPE','Practical',true,'EPE practical department slides'],
  ['FUTUREDOCTORS_198',4502,'2ry Modules/EPE-230','EPE','Practical',false,'EPE practical by Dr. Alaa'],
  ['FUTUREDOCTORS_194',15375,'2ry Modules/EPE-230','EPE','Practical',true,'EPE practical questions'],
  ['FUTUREDOCTORS_194',15344,'2ry Modules/EPE-230','EPE','Practical',false,'EPE practical questions by Abdelrahman'],
  ['FUTUREDOCTORS_194',15368,'2ry Modules/EPE-230','EPE','Practical',true,'EPE practical exam batch 197'],

  // MPE-227, Entrepreneurship, Health Economics, and Computer
  ['FUTUREDOCTORS_194',15759,'2ry Modules/MPE-227','MPE','Department Book',true,'MPE department book'],
  ['FUTUREDOCTORS_198',4511,'2ry Modules/MPE-227','MPE','Subject Resources',false,'MPE notes by Dr. Kandeel 2026'],
  ['FUTUREDOCTORS_198',4601,'2ry Modules/MPE-227','MPE','EOY',true,'MPE exams batches 193-198 second sitting'],
  ['FUTUREDOCTORS_198',4540,'2ry Modules/MPE-227','MPE','EOY',true,'MPE all previous years'],
  ['FUTUREDOCTORS_194',7630,'2ry Modules/MPE-227','MPE','Department Questions',true,'MPE chapter 1 questions'],
  ['FUTUREDOCTORS_194',2450,'2ry Modules/MPE-227','MPE','Department Questions',true,'MPE chapter 2 questions'],
  ['FUTUREDOCTORS_194',15754,'2ry Modules/Entrepreneurship','Entrepreneurship','Department Book',true,'Entrepreneurship college slides'],
  ['FUTUREDOCTORS_194',15756,'2ry Modules/Entrepreneurship','Entrepreneurship','EOY',true,'Entrepreneurship exam batch 197'],
  ['FUTUREDOCTORS_196',7280,'2ry Modules/Entrepreneurship','Entrepreneurship','EOY',true,'Entrepreneurship exam batch 194'],
  ['FUTUREDOCTORS_Siraj',5795,'2ry Modules/Health Economics','Health Economics','Department Book',true,'Health Economics college slides'],
  ['FUTUREDOCTORS_198',4109,'2ry Modules/Health Economics','Health Economics','EOY',true,'Health Economics previous exams'],
  ['FUTUREDOCTORS_198',4113,'2ry Modules/Computer','Computer','EOY',true,'Computer previous exams']
].map(([channel,id,module,subject,category,department,context]) => ({
  url:`https://t.me/${channel}/${id}`, module, subject, category, department, context, line:0
}));

items.push(...extras);
for (const item of items) {
  if (item.module === 'General') {
    const m = item.context.match(/\[(205|206|207|208|210)\]/);
    if (m) item.module = `${m[1]} ${{205:'NEU',206:'DIG',207:'END',208:'INT',210:'PAT'}[m[1]]}`;
  }
}

const unique = [...new Map(items.map(x => [x.url.toLowerCase(), x])).values()];
process.stdout.write(JSON.stringify(unique, null, 2));
