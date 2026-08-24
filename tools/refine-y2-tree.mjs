import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2];
if (!root) throw new Error('Usage: node tools/refine-y2-tree.mjs <y2-root>');

function uniqueDest(dest, size) {
  if (!fs.existsSync(dest)) return dest;
  if (fs.statSync(dest).isFile() && fs.statSync(dest).size === size) return null;
  const ext = path.extname(dest), stem = dest.slice(0, -ext.length);
  let n = 2, candidate;
  do candidate = `${stem} (${n++})${ext}`; while (fs.existsSync(candidate));
  return candidate;
}
function moveFile(src, destDir) {
  fs.mkdirSync(destDir, {recursive:true});
  const dest = uniqueDest(path.join(destDir, path.basename(src)), fs.statSync(src).size);
  if (dest) fs.renameSync(src, dest);
  return Boolean(dest);
}
function mergeDir(src, dest) {
  if (!fs.existsSync(src)) return 0;
  let moved = 0;
  for (const entry of fs.readdirSync(src, {withFileTypes:true})) {
    const from = path.join(src, entry.name), to = path.join(dest, entry.name);
    if (entry.isDirectory()) moved += mergeDir(from, to);
    else { fs.mkdirSync(dest, {recursive:true}); moved += moveFile(from, dest) ? 1 : 0; }
  }
  try { fs.rmdirSync(src); } catch {}
  return moved;
}

let moved = 0;
const merges = [
  ['208 INT/Pharmacology Dr. كتور عبدالله [2nd priority]', '208 INT/Pharmacology Dr. Abdallah Salah [2nd priority]'],
  ['208 INT/Pharmacology Dr. Abdallah Salah [3rd priority]', '208 INT/Pharmacology Dr. Abdallah Salah [2nd priority]'],
  ['208 INT/Pharmacology Dr. الرحمن سيد [9th priority]', '208 INT/Pharmacology Abdelrahman Sayed [9th priority]'],
  ['208 INT/Pathology Dr. طارق [2nd priority]', '208 INT/Pathology Dr. Tarek [2nd priority]'],
  ['208 INT/Pathology Dr. Tarek [6th priority]', '208 INT/Pathology Dr. Tarek [2nd priority]'],
  ['208 INT/Pharmacology Dr. Amr Elabd [7th priority]', '208 INT/Pharmacology Dr. Amr El-Abed [6th priority]'],
  ['213 Psychology/Psychology Dr. له [3rd priority]', '213 Psychology/Psychology MedMap [3rd priority]'],
  ['213 Psychology/Psychology Dr. كتورة عفت [5th priority]', '213 Psychology/Psychology Dr. Effat [5th priority]'],
  ['213 Psychology/Psychology Dr. Effat [6th priority]', '213 Psychology/Psychology Dr. Effat [5th priority]'],
  ['213 Psychology/Pathology Dpt Pathology [1st priority]', '213 Psychology/Psychology Dpt Psychology [1st priority]']
];
for (const [from, to] of merges) moved += mergeDir(path.join(root, from), path.join(root, to));

function allFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...allFiles(full)); else out.push(full);
  }
  return out;
}

const subjectFor = name => /histo|slide|jar|microscop/i.test(name) ? 'Histology'
  : /pharma|drug/i.test(name) ? 'Pharmacology'
  : /patho/i.test(name) ? 'Pathology'
  : /physio/i.test(name) ? 'Physiology'
  : /anatom|embryo|radiology/i.test(name) ? 'Anatomy' : 'General';
const moduleFor = name => /\b205\b|\bNEU\b/i.test(name) ? '205 NEU'
  : /\b206\b|\bDIG\b/i.test(name) ? '206 DIG'
  : /\b207\b|\bEND\b/i.test(name) ? '207 END'
  : /\b208\b|\bINT\b/i.test(name) ? '208 INT'
  : /\b210\b|\bPAT\b/i.test(name) ? '210 PAT' : null;
const practicalRe = /practical|microscop|\bhisto mic\b|histo.?slides|\bjars?\b|data show/i;

for (const file of allFiles(root)) {
  if (file.includes(`${path.sep}_Catalog${path.sep}`)) continue;
  const rel = path.relative(root, file), name = path.basename(file);
  const secondaryOrLoose = rel.startsWith(`2ry Modules${path.sep}`) || rel.startsWith(`Practical 2nd Year${path.sep}EOY${path.sep}`);
  if (!secondaryOrLoose) continue;
  if (practicalRe.test(name)) {
    moved += moveFile(file, path.join(root, 'Practical 2nd Year', subjectFor(name), 'Recovered from linked branch')) ? 1 : 0;
    continue;
  }
  const moduleName = moduleFor(name);
  if (moduleName) {
    const category = /^EOM\b/i.test(name) ? 'EOM' : 'EOY';
    moved += moveFile(file, path.join(root, moduleName, category)) ? 1 : 0;
  }
}

// Remove directories left empty by moves.
function pruneEmpty(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) if (entry.isDirectory()) pruneEmpty(path.join(dir, entry.name));
  if (dir !== root && fs.readdirSync(dir).length === 0) try { fs.rmdirSync(dir); } catch {}
}
pruneEmpty(root);

let duplicatesArchived = 0;
for (const file of allFiles(root)) {
  if (file.includes(`${path.sep}_Catalog${path.sep}`)) continue;
  const ext = path.extname(file), stem = file.slice(0, -ext.length);
  const m = stem.match(/^(.*) \(2\)$/);
  if (!m) continue;
  const base = `${m[1]}${ext}`;
  if (!fs.existsSync(base) || fs.statSync(base).size !== fs.statSync(file).size) continue;
  const relativeDir = path.relative(root, path.dirname(file));
  duplicatesArchived += moveFile(file, path.join(root, '_Catalog', 'Exact Duplicates', relativeDir)) ? 1 : 0;
}
pruneEmpty(root);

const report = {movedOrMergedFiles:moved, duplicatesArchived, refinedAt:new Date().toISOString()};
fs.writeFileSync(path.join(root, '_Catalog', 'Refinement Summary.json'), JSON.stringify(report, null, 2));
process.stdout.write(JSON.stringify(report, null, 2));
