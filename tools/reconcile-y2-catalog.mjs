import fs from 'node:fs';
import path from 'node:path';

const [root, logPath, manifestPath] = process.argv.slice(2);
if (!manifestPath) throw new Error('Usage: node tools/reconcile-y2-catalog.mjs <root> <log> <manifest>');
const log = JSON.parse(fs.readFileSync(logPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const clean = s => String(s || '').normalize('NFC').replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase().replace(/[‐‑‒–—]/g, '-');
const canonical = name => clean(name)
  .replace(/^(?:eom|eoy)\s*-?\s*/i, '')
  .replace(/\s*\(\d+\)(?=\.[^.]+$)/, '');
function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(f)); else out.push(f);
  }
  return out;
}
const all = walk(root);
const resources = all.filter(f => !f.includes(`${path.sep}_Catalog${path.sep}`) || f.includes(`${path.sep}_Catalog${path.sep}Exact Duplicates${path.sep}`));
const byCanonical = new Set(resources.map(f => canonical(path.basename(f))));
const unresolved = log.filter(x => {
  const wanted = canonical(x.name);
  if (byCanonical.has(wanted)) return false;
  if (x.name.includes('…')) {
    const [pre, post] = clean(x.name).split('…');
    if (resources.some(f => { const n = clean(path.basename(f)); return n.startsWith(pre) && n.endsWith(post); })) return false;
  }
  return true;
});

const unique = [...new Map(unresolved.map(x => [`${x.sourceUrl}|${x.name}`, x])).values()];
const body = unique.map(x => `- ${x.sourceUrl} — ${x.name} (${x.status})`).join('\n');
fs.writeFileSync(path.join(root, '_Catalog', 'Unresolved Attachments.md'), `# Unresolved Attachments\n\nThese Telegram attachments were mapped but no matching file was found in the organized tree. The source links are retained for a future retry.\n\n${body || 'None.'}\n`);

const main = all.filter(f => !f.includes(`${path.sep}_Catalog${path.sep}`));
const examPrefixFailures = main.filter(f => (f.includes(`${path.sep}EOM${path.sep}`) && !path.basename(f).startsWith('EOM')) || (f.includes(`${path.sep}EOY${path.sep}`) && !path.basename(f).startsWith('EOY')));
const media = main.filter(f => /\.(mp3|mp4|m4a|ogg|wav|mov|webm)$/i.test(f));
const zero = main.filter(f => fs.statSync(f).size === 0);
const summary = {
  sourceLinksCatalogued: manifest.length,
  mappedTelegramAttachments: log.length,
  organizedMainFiles: main.length,
  exactDuplicatesArchived: resources.filter(f => f.includes(`${path.sep}_Catalog${path.sep}Exact Duplicates${path.sep}`)).length,
  unresolvedAttachmentsAfterReconciliation: unique.length,
  examPrefixFailures: examPrefixFailures.length,
  excludedMediaFound: media.length,
  zeroByteFiles: zero.length,
  verifiedAt: new Date().toISOString()
};
fs.writeFileSync(path.join(root, '_Catalog', 'Final Verification.json'), JSON.stringify(summary, null, 2));
process.stdout.write(JSON.stringify(summary, null, 2));
