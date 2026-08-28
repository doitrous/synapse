import fs from 'node:fs';
import path from 'node:path';

const [manifestPath, logPath, textPath, downloadsDir, targetRoot] = process.argv.slice(2);
if (!targetRoot) throw new Error('Usage: node tools/organize-y2-downloads.mjs manifest log text downloads target');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).map((x, idx) => {
  const m = x.url.match(/t\.me\/([^/]+)\/(\d+)/i);
  return {...x, idx, channelKey: m?.[1].toLowerCase(), id: Number(m?.[2])};
});
const rawLog = JSON.parse(fs.readFileSync(logPath, 'utf8'));
const textOnly = JSON.parse(fs.readFileSync(textPath, 'utf8'));

const stripControlChars = value => Array.from(String(value || ''), ch => ch.charCodeAt(0) <= 0x1f ? ' ' : ch).join('');
const clean = s => stripControlChars(s).normalize('NFC').replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, ' ').trim();
const ordinal = n => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th'}`;
const canonical = name => clean(name).toLowerCase().replace(/\s*\(\d+\)(?=\.[^.]+$)/, '').replace(/[‐‑‒–—]/g, '-');

function closestItem(entry) {
  const ch = String(entry.channel || '').toLowerCase();
  const candidates = manifest.filter(x => x.channelKey === ch && x.id <= entry.docMid && entry.docMid - x.id <= 7);
  return candidates.sort((a, b) => b.id - a.id || b.idx - a.idx)[0] || manifest[entry.itemIdx] || entry;
}

const logs = rawLog.map(x => ({...x, assigned: closestItem(x)}));

function inferredModule(entry) {
  const hay = `${entry.name} ${entry.caption}`;
  if (/\bMPE\b|Ethics\s*&?\s*Law/i.test(hay)) return '2ry Modules/MPE-227';
  if (/Entrepreneur/i.test(hay)) return '2ry Modules/Entrepreneurship';
  if (/\bEPE[-\s(]/i.test(hay)) return '2ry Modules/EPE-230';
  if (/\bRES[-\s{(]|Research|Protocol Writing|Medical statistics|\bEBM\b/i.test(hay)) return '2ry Modules/RES-234 Research';
  return entry.assigned.module || entry.module || 'General';
}

function inferredCategory(entry) {
  const hay = `${entry.name} ${entry.caption} ${entry.assigned.context || ''}`;
  if (/\bEOM\b|End\s+of\s+(?:the\s+)?Module|End\s+Module/i.test(hay)) return 'EOM';
  if (/\bEOY\b/i.test(hay)) return 'EOY';
  return entry.assigned.category || entry.category || 'Subject Resources';
}

function extractSource(context) {
  const text = String(context || '').replace(/DOWNLOAD\s*DPT/gi, ' ').replace(/DOWNLOAD/gi, ' ');
  const english = [...text.matchAll(/(?:Dr\.?|DR\.?)\s*([A-Za-z][A-Za-z.-]*(?:\s+[A-Za-z][A-Za-z.-]*){0,2})/g)]
    .map(m => m[1].replace(/\b(?:MCQ|Questions?|Exam|Notes?|Written|Practical|Department|Book|Endocrine|Male|Female|GIT|CVS|RSP)\b.*$/i, '').trim())
    .filter(Boolean);
  if (english.length) return `Dr. ${english.at(-1)}`;
  const arabic = [...text.matchAll(/(?:د\.?|دكتور|الدكتور|الدكتورة)\s*([\u0600-\u06ff]+(?:\s+[\u0600-\u06ff]+)?)/g)].map(m => m[1].trim());
  if (arabic.length) return `Dr. ${arabic.at(-1)}`;
  const by = [...text.matchAll(/\bby\s+([A-Z][A-Za-z.]+(?:\s+[A-Z][A-Za-z.]+){0,2})/g)].map(m => m[1].trim());
  if (by.length) return by.at(-1);
  if (/Guyton/i.test(text)) return 'Guyton';
  if (/Pretest/i.test(text)) return 'Pretest';
  return 'Other';
}

const priorityMaps = new Map();
for (const item of manifest) {
  if (item.department || ['EOM','EOY','Orientation','Department Book','Department Questions','Practical'].includes(item.category)) continue;
  const key = `${item.module}|${item.subject}`;
  if (!priorityMaps.has(key)) priorityMaps.set(key, new Map());
  const source = extractSource(item.context);
  const map = priorityMaps.get(key);
  if (!map.has(source)) map.set(source, map.size + 2);
}

function sourceFolder(moduleName, subject, item) {
  const safeSubject = clean(subject || 'General');
  if (item.department || ['Department Book','Department Questions'].includes(item.category)) {
    return `${safeSubject} Dpt ${safeSubject} [1st priority]`;
  }
  const source = extractSource(item.context);
  const key = `${item.module}|${item.subject}`;
  const n = priorityMaps.get(key)?.get(source) || 2;
  const label = source === 'Other' ? `${safeSubject} Other` : `${safeSubject} ${source}`;
  return `${clean(label)} [${ordinal(n)} priority]`;
}

function subfolder(entry, category) {
  const hay = `${entry.name} ${entry.caption} ${entry.assigned.context || ''}`;
  if (category === 'Department Book') return 'Books';
  if (category === 'Practical') return 'Practical';
  if (/written|match|explain|definition|essay|short note/i.test(hay)) return 'Written Questions';
  if (/mcq|question|exam|quiz|assessment|test|اسئلة|اختبار/i.test(hay)) return 'MCQs';
  return 'Files';
}

function destination(entry) {
  const item = entry.assigned;
  const moduleName = inferredModule(entry) === 'Practical' ? 'Practical 2nd Year' : inferredModule(entry);
  const category = inferredCategory(entry);
  if (category === 'EOM' || category === 'EOY' || category === 'Orientation') return path.join(moduleName, category);
  if (moduleName === 'General') return path.join('General', 'Student Guide');
  if (moduleName === 'Practical 2nd Year') return path.join(moduleName, clean(item.subject || 'General'), sourceFolder(moduleName, item.subject, item), subfolder(entry, category));
  if (category === 'Practical' && moduleName.startsWith('2ry Modules/')) return path.join(moduleName, 'Practical', sourceFolder(moduleName, item.subject, item));
  return path.join(moduleName, sourceFolder(moduleName, item.subject, item), subfolder(entry, category));
}

function outputName(entry) {
  let name = clean(entry.name) || `Telegram file ${entry.channel}-${entry.docMid}`;
  const category = inferredCategory(entry);
  if ((category === 'EOM' || category === 'EOY') && !new RegExp(`^${category}\\b`, 'i').test(name)) name = `${category} - ${name}`;
  return name;
}

const downloadNames = fs.readdirSync(downloadsDir, {withFileTypes:true}).filter(d => d.isFile()).map(d => {
  const full = path.join(downloadsDir, d.name);
  const st = fs.statSync(full);
  return {name:d.name, full, canon:canonical(d.name), mtime:st.mtimeMs, size:st.size};
});

function findSource(wanted) {
  const wc = canonical(wanted);
  let matches = downloadNames.filter(x => x.canon === wc);
  if (!matches.length && wanted.includes('…')) {
    const [pre, post] = clean(wanted).toLowerCase().split('…');
    matches = downloadNames.filter(x => clean(x.name).toLowerCase().startsWith(pre) && clean(x.name).toLowerCase().endsWith(post));
  }
  if (!matches.length) {
    const stem = wc.replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
    if (stem.length > 12) matches = downloadNames.filter(x => canonical(x.name).replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}]+/gu, ' ').includes(stem.slice(0, Math.min(28, stem.length))));
  }
  return matches.sort((a,b) => b.mtime - a.mtime)[0];
}

fs.mkdirSync(targetRoot, {recursive:true});
let copied = 0, matched = 0, unresolvedFiles = [];
const usedDestinations = new Set();
for (const entry of logs) {
  const src = findSource(entry.name);
  if (!src) { unresolvedFiles.push(entry); continue; }
  matched++;
  const dir = path.join(targetRoot, destination(entry));
  fs.mkdirSync(dir, {recursive:true});
  let name = outputName(entry), dest = path.join(dir, name), n = 2;
  const identity = `${src.full}|${dest}`;
  if (usedDestinations.has(identity)) continue;
  while (fs.existsSync(dest) && fs.statSync(dest).size !== src.size) {
    const ext = path.extname(name), stem = name.slice(0, -ext.length);
    dest = path.join(dir, `${stem} (${n++})${ext}`);
  }
  if (!fs.existsSync(dest)) fs.copyFileSync(src.full, dest, fs.constants.COPYFILE_FICLONE);
  usedDestinations.add(identity);
  copied++;
}

const catalogDir = path.join(targetRoot, '_Catalog');
fs.mkdirSync(catalogDir, {recursive:true});
const csvEscape = v => `"${String(v ?? '').replaceAll('"','""').replaceAll('\n',' ')}"`;
const logByItem = Object.groupBy(logs, x => x.assigned.idx);
const textByItem = Object.groupBy(textOnly, x => x.itemIdx);
const rows = [['Module','Subject','Category','Source URL','Status','Document names','Context']];
for (const item of manifest) {
  const docs = logByItem[item.idx] || [], texts = textByItem[item.idx] || [];
  const status = docs.length ? `attachments: ${docs.length}` : texts.length ? 'text-only captured' : 'source link catalogued; no attachment captured';
  rows.push([item.module,item.subject,item.category,item.url,status,docs.map(x=>x.name).join(' | '),item.context]);
}
fs.writeFileSync(path.join(catalogDir, 'Telegram Source Catalog.csv'), rows.map(r => r.map(csvEscape).join(',')).join('\n'));

const textSections = [];
for (const record of textOnly) {
  const item = manifest[record.itemIdx];
  if (!item) continue;
  textSections.push(`## ${item.module} — ${item.subject}\n\nSource: ${item.url}\n\nContext: ${item.context}\n\n${record.text.trim()}\n`);
}
fs.writeFileSync(path.join(catalogDir, 'Past Exams and Text-Only Questions.md'), `# Past Exams and Text-Only Questions\n\n${textSections.join('\n---\n\n') || 'No text-only exam messages were captured.'}\n`);

const unresolvedRows = unresolvedFiles.map(x => `- ${x.sourceUrl} — ${x.name} (${x.status})`).join('\n');
fs.writeFileSync(path.join(catalogDir, 'Unresolved Attachments.md'), `# Unresolved Attachments\n\nThese Telegram items were mapped but no matching local download was found. Their source links are retained for recovery.\n\n${unresolvedRows || 'None.'}\n`);

const summary = {
  manifestLinks: manifest.length,
  mappedAttachments: logs.length,
  matchedLocalFiles: matched,
  organizedCopies: copied,
  unresolvedAttachments: unresolvedFiles.length,
  textOnlyMessages: textOnly.length,
  generatedAt: new Date().toISOString()
};
fs.writeFileSync(path.join(catalogDir, 'Extraction Summary.json'), JSON.stringify(summary, null, 2));
fs.writeFileSync(path.join(targetRoot, 'README.md'), `# Kasr Al-Ainy Year 2\n\nOrganized by module, then subject/source. Department material is first priority; named doctor sources begin at second priority in Telegram appearance order. EOM and EOY filenames are prefixed accordingly. Audio and video were excluded.\n\nSee \`_Catalog/Telegram Source Catalog.csv\` for every explored link, \`Past Exams and Text-Only Questions.md\` for text-only material, and \`Unresolved Attachments.md\` for sources that need a future retry.\n`);

process.stdout.write(JSON.stringify(summary, null, 2));
