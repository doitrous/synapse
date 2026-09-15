#!/usr/bin/env node
// Scans MCQ seeds + emitted question batches + evidence records + the PDF
// tree on disk, for ALL universities, and emits tools/mcq-viz/mcq-index.json
// for the local MCQ-visualization tool.
// Contract: tools/mcq-viz/SCHEMA.md. Node builtins only, no deps.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(HERE, "../..");
const HOME = os.homedir();
const DESKTOP_ROOT = path.join(HOME, "Desktop/Universities");
const SHA_CACHE_DIR = path.join(HOME, ".cache/nishany-pdfsha");
const OUT_PATH = path.join(HERE, "mcq-index.json");

// docsDir -> Desktop/Universities/<desk> mapping. `extraSeedDirs` fold
// hand-authored seed trees that live outside docs/ (Kasr/ASU) into the
// same university.
const UNIVERSITIES = [
  { docsDir: "6October-Source-Imports", desk: "6 October University" },
  { docsDir: "Ain-Shams-Source-Imports", desk: "Ain Shams", extraSeedDirs: ["scripts/asu/seeds"] },
  { docsDir: "AlAzharDamietta-Source-Imports", desk: "Al-Azhar University Damietta" },
  { docsDir: "Alexandria-Source-Imports", desk: "Alexandria University" },
  { docsDir: "Assiut-Source-Imports", desk: "Assiut University" },
  { docsDir: "FOMSCU-Source-Imports", desk: "FOMSCU" },
  { docsDir: "Fayoum-Source-Imports", desk: "Fayoum University" },
  { docsDir: "Helwan-Source-Imports", desk: "helwan" },
  { docsDir: "Kasr-Source-Imports", desk: "Kasr Alainy", extraSeedDirs: ["scripts/kasr/seeds"] },
  { docsDir: "MUST-Source-Imports", desk: "MUST" },
  { docsDir: "Mansoura-Source-Imports", desk: "Mansoura University" },
  { docsDir: "Menoufia-Source-Imports", desk: "Menoufia University" },
  { docsDir: "Qina-Source-Imports", desk: "Qina University" },
  { docsDir: "Zagazig-Source-Imports", desk: "Zagazig University" },
].map((u) => ({
  ...u,
  docsBase: path.join(BASE, "docs", u.docsDir),
  pdfRoot: path.join(DESKTOP_ROOT, u.desk),
  extraSeedDirs: (u.extraSeedDirs || []).map((d) => path.join(BASE, d)),
}));

function walkFiles(dir, exts) {
  let out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walkFiles(p, exts));
    else if (!exts || exts.some((ext) => e.name.toLowerCase().endsWith(ext))) out.push(p);
  }
  return out;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ---- seeds -----------------------------------------------------------
// Every *.json under a university's docs tree (or its folded extra seed
// dirs) that has a top-level `questions` array. Non-seed json (manifests,
// claim-links, article-links, ...) has no `questions` key and is skipped.
function loadSeedsFor(cfg) {
  const files = [
    ...walkFiles(cfg.docsBase, [".json"]),
    ...cfg.extraSeedDirs.flatMap((d) => walkFiles(d, [".json"])),
  ];
  const seeds = [];
  for (const f of files) {
    let json;
    try {
      json = JSON.parse(fs.readFileSync(f, "utf8"));
    } catch (e) {
      console.error(`skip ${f}: parse error: ${e.message}`);
      continue;
    }
    if (!Array.isArray(json.questions)) continue;
    seeds.push({ file: f, json });
  }
  return seeds;
}

// ---- srcId -> PDF metadata --------------------------------------------
function loadCorpusIndex(cfg) {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(cfg.docsBase, "evidence/corpus-source-index.json"), "utf8"));
    return j.sources || {};
  } catch {
    return {};
  }
}

// `## key` / value(s) / `---` record format used by *-resources.md AND by
// the emitted question/pending-live MCQ batches. Records are meant to be
// `---`-separated, but at least one file (206-DIG) is missing a separator
// between two records — so a fresh `## id` header while mid-record also
// starts a new record (id is always each record's first field).
function parseResourcesMd(text) {
  const records = [];
  let current = null;
  let currentKey = null;
  const flush = () => {
    if (current && Object.keys(current).length) records.push(current);
    current = null;
    currentKey = null;
  };
  for (const line of text.split("\n")) {
    if (/^-{3,}\s*$/.test(line.trim())) {
      flush();
      continue;
    }
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      const key = m[1].trim().toLowerCase();
      if (key === "id" && current) flush();
      if (!current) current = {};
      currentKey = key;
      current[currentKey] = "";
      continue;
    }
    if (/^#\s+/.test(line)) continue; // top-level "# Item" header
    if (current && currentKey) {
      const val = line.trim();
      if (val) current[currentKey] = current[currentKey] ? `${current[currentKey]} ${val}` : val;
    }
  }
  flush();
  return records;
}

function loadResourceRecords(cfg) {
  const map = new Map(); // srcId -> record (first-seen wins; evidence/ preferred over resource/)
  for (const dir of [path.join(cfg.docsBase, "evidence"), path.join(cfg.docsBase, "resource")]) {
    let files = [];
    try {
      files = fs.readdirSync(dir).filter((f) => f.endsWith("-resources.md"));
    } catch {
      continue; // dir absent
    }
    for (const f of files) {
      const text = fs.readFileSync(path.join(dir, f), "utf8");
      for (const rec of parseResourcesMd(text)) {
        if (!rec.id || map.has(rec.id)) continue;
        // Older resource/ records have no `source_relative_path` field; the path
        // is embedded in the description as `corpusRelativePath "<path>"`.
        if (!rec["source_relative_path"] && rec["description"]) {
          const m = rec["description"].match(/corpusRelativePath\s+"([^"]+)"/);
          if (m) rec["source_relative_path"] = m[1];
        }
        // module lives in `module_ids` in that format
        if (!rec["module"] && rec["module_ids"]) rec["module"] = rec["module_ids"];
        map.set(rec.id, rec);
      }
    }
  }
  return map;
}

// ---- PDFs on disk ------------------------------------------------------
function loadPdfIndex(cfg) {
  const map = new Map(); // basename -> [abspath, ...]
  for (const f of walkFiles(cfg.pdfRoot, [".pdf"])) {
    const base = path.basename(f);
    if (!map.has(base)) map.set(base, []);
    map.get(base).push(f);
  }
  return map;
}

function sha256File(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

function resolvePdf(basename, expectedSha256, pdfIndex) {
  const candidates = pdfIndex.get(basename) || [];
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];
  if (expectedSha256) {
    for (const c of candidates) {
      try {
        if (sha256File(c) === expectedSha256) return c;
      } catch {
        /* unreadable candidate, skip */
      }
    }
  }
  // ponytail: ambiguous collision with no sha match, best-effort first candidate
  return candidates[0];
}

function toPdfUrl(abspath) {
  const rel = path.relative(HOME, abspath);
  return rel.split(path.sep).map(encodeURIComponent).join("/");
}

// ---- disk-cached sha256 (keyed by abspath+size+mtime) ------------------
// Hashing every PDF under a 149GB tree is the expensive step; cache it so
// re-runs only re-hash files that actually changed.
function loadShaCache(cfg) {
  const file = path.join(SHA_CACHE_DIR, `${slugify(cfg.desk)}.json`);
  let map = new Map();
  try {
    map = new Map(Object.entries(JSON.parse(fs.readFileSync(file, "utf8"))));
  } catch {
    /* absent/corrupt cache, start fresh */
  }
  return { file, map };
}

function saveShaCache(cache) {
  try {
    fs.mkdirSync(SHA_CACHE_DIR, { recursive: true });
    fs.writeFileSync(cache.file, JSON.stringify(Object.fromEntries(cache.map)));
  } catch (e) {
    console.error(`warn: could not write sha cache ${cache.file}: ${e.message}`);
  }
}

// Lazily hash every PDF under a university's tree, keyed by the first 20 hex
// of its sha256 — the same slice srcIds are minted from
// (srcId === "src_" + sha[0:20]). Only invoked when a university still has
// srcIds unresolved by basename, so a university with good evidence/resource
// coverage never pays this cost.
const shaPrefixIndexCache = new Map(); // desk -> Map(prefix -> abspath)
function shaPrefixIndexFor(cfg) {
  if (shaPrefixIndexCache.has(cfg.desk)) return shaPrefixIndexCache.get(cfg.desk);
  const cache = loadShaCache(cfg);
  const files = walkFiles(cfg.pdfRoot, [".pdf"]);
  console.log(`[${cfg.desk}] hashing up to ${files.length} PDFs for sha fallback (${cache.map.size} cached)...`);
  const idx = new Map();
  let hashed = 0;
  let hits = 0;
  const t0 = Date.now();
  for (const f of files) {
    let st;
    try {
      st = fs.statSync(f);
    } catch {
      continue;
    }
    const cached = cache.map.get(f);
    let sha;
    if (cached && cached.size === st.size && cached.mtimeMs === st.mtimeMs) {
      sha = cached.sha;
      hits++;
    } else {
      try {
        sha = sha256File(f);
      } catch {
        continue;
      }
      cache.map.set(f, { size: st.size, mtimeMs: st.mtimeMs, sha });
      hashed++;
      if (hashed % 500 === 0) console.log(`[${cfg.desk}] ...hashed ${hashed} new files so far`);
    }
    const pref = sha.slice(0, 20);
    if (!idx.has(pref)) idx.set(pref, f);
  }
  saveShaCache(cache);
  console.log(
    `[${cfg.desk}] sha index ready: ${idx.size} unique files (${hashed} newly hashed, ${hits} cache hits, ${(
      (Date.now() - t0) /
      1000
    ).toFixed(1)}s)`
  );
  shaPrefixIndexCache.set(cfg.desk, idx);
  return idx;
}

// ---- page resolution -----------------------------------------------------
function resolvePage(rawPage, fieldNotes, sourceCitationRaw) {
  if (typeof rawPage === "number" && Number.isInteger(rawPage)) {
    return { page: rawPage, pageSource: "page" };
  }
  // Field-note values, but skip the answer-key location: a `keySource` note (or
  // any value mentioning the answer/key table) cites the KEY table page, not the
  // question's page — using it put many questions on the last page. Better to
  // fall through to "unknown" than to record a confidently-wrong page.
  const notes = Object.entries(fieldNotes || {})
    .filter(([k, v]) => !/key/i.test(k) && !/\b(answer|key)\b/i.test(String(v)))
    .map(([, v]) => String(v));
  for (const t of [...notes, String(sourceCitationRaw || "")]) {
    const m = t.match(/\bp(?:age)?\.?\s*(\d+)/i);
    if (m) return { page: parseInt(m[1], 10), pageSource: "field_notes" };
  }
  return { page: null, pageSource: "unknown" };
}

function buildStem(question) {
  return String(question || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/:$/, "");
}

function defaultId(json, q) {
  const lane = (json.lane || "").replace(/-/g, "");
  const cluster = (json.cluster || "").toUpperCase();
  const key = (q.key || "").toUpperCase().replace(/[^A-Z0-9]/g, "-");
  return `QST-${lane}-${cluster}-${key}`;
}

function firstSrcToken(str) {
  if (!str) return null;
  const m = String(str).match(/\bsrc_[0-9a-f]+\b/i);
  return m ? m[0] : null;
}

// `*_Y(\d)` (e.g. KAU_Y2, ASU_Y1, +O6U_Y1) -> "Year N"; else infer from the
// module's own numeric code (1xx/2xx/3xx); else "Other".
function deriveYear(yearsRaw, moduleRaw) {
  const yv = Array.isArray(yearsRaw) ? yearsRaw[0] : yearsRaw;
  if (yv) {
    const m = String(yv).match(/_Y(\d)/i);
    if (m) return `Year ${m[1]}`;
  }
  if (moduleRaw) {
    const m = String(moduleRaw).match(/\b([1-3])\d{2}\b/);
    if (m) return `Year ${m[1]}`;
  }
  return "Other";
}

// ---- per-university state ----------------------------------------------
function makeUniverseState(cfg) {
  const corpusIndex = loadCorpusIndex(cfg);
  const resourceRecords = loadResourceRecords(cfg);
  const pdfIndex = loadPdfIndex(cfg);
  const sourcesMap = new Map(); // srcId -> mutable source record
  const unresolvedSrcIds = new Set();
  const noSourceBuckets = new Map(); // "desk|year|module" -> bucket

  function getOrCreateSource(srcId) {
    if (sourcesMap.has(srcId)) return sourcesMap.get(srcId);

    let sourceRelativePath = null;
    let sha256 = null;
    let pageCount = null;
    let title = srcId;
    let institution = null;
    let collection = null;

    const corpusMeta = corpusIndex[srcId];
    const resourceRec = resourceRecords.get(srcId);
    if (corpusMeta) {
      sourceRelativePath = corpusMeta.sourceRelativePath || null;
      sha256 = corpusMeta.sha256 || null;
      pageCount = corpusMeta.pageCount ?? null;
      title = sourceRelativePath ? path.basename(sourceRelativePath, path.extname(sourceRelativePath)) : srcId;
    } else if (resourceRec) {
      sourceRelativePath = resourceRec["source_relative_path"] || null;
      sha256 = resourceRec["sha256"] || null;
      pageCount = resourceRec["page_count"] ? parseInt(resourceRec["page_count"], 10) : null;
      title = resourceRec["title"] || srcId;
      institution = resourceRec["institution"] || null;
      collection = resourceRec["collection_id"] || null;
    } else {
      unresolvedSrcIds.add(srcId);
    }

    let pdfFound = false;
    let pdfUrl = null;
    let pdfResolvedBy = null;
    let module = null;
    let abspath = null;
    if (sourceRelativePath) {
      const segments = sourceRelativePath.split("/");
      if (segments.length > 1) module = segments[0];
      const basename = path.basename(sourceRelativePath);
      const hit = resolvePdf(basename, sha256, pdfIndex);
      if (hit) {
        pdfFound = true;
        abspath = hit;
        pdfUrl = toPdfUrl(hit);
        pdfResolvedBy = "basename";
      }
    }
    // Fallback: match by content-hash prefix. Recovers renamed files and records
    // with no usable path, since srcId === "src_" + sha256[0:20].
    if (!pdfFound) {
      const prefix = (sha256 && sha256.slice(0, 20)) || (srcId.startsWith("src_") ? srcId.slice(4) : null);
      const hit = prefix && shaPrefixIndexFor(cfg).get(prefix);
      if (hit) {
        pdfFound = true;
        abspath = hit;
        pdfUrl = toPdfUrl(hit);
        pdfResolvedBy = "sha256";
      }
    }
    if (!module && resourceRec && resourceRec["module"]) module = resourceRec["module"];

    const source = {
      srcId,
      university: cfg.desk,
      year: null,
      title,
      module,
      sourceRelativePath,
      pdfUrl,
      pdfFound,
      pdfResolvedBy,
      sha256,
      pageCount,
      institution,
      collection,
      mcqCount: 0,
      heldCount: 0,
      pageHistogram: {},
      _abspath: abspath,
    };
    sourcesMap.set(srcId, source);
    return source;
  }

  // Questions with no resolvable source PDF — kept visible and browsable,
  // bucketed per (year, module) so they nest under University → Year → Module
  // instead of collapsing into one flat "(no source)" pile.
  function getNoSourceSource(year, module) {
    const yr = year || "Other";
    const mod = module || null;
    const key = `nosrc:${slugify(cfg.desk)}|${yr}|${mod || "(none)"}`;
    let b = noSourceBuckets.get(key);
    if (!b) {
      b = {
        srcId: key,
        university: cfg.desk,
        year: yr,
        title: mod ? `${mod} — no source PDF` : "(no source PDF)",
        module: mod,
        sourceRelativePath: null,
        pdfUrl: null,
        pdfFound: false,
        pdfResolvedBy: null,
        sha256: null,
        pageCount: null,
        institution: null,
        collection: null,
        mcqCount: 0,
        heldCount: 0,
        pageHistogram: {},
        _abspath: null,
        _noSource: true,
      };
      sourcesMap.set(b.srcId, b);
      noSourceBuckets.set(key, b);
    }
    return b;
  }

  return { cfg, getOrCreateSource, getNoSourceSource, sourcesMap, unresolvedSrcIds };
}

// ---- main ----------------------------------------------------------------
const universeStates = UNIVERSITIES.map(makeUniverseState);
const cfgByDesk = new Map(UNIVERSITIES.map((u) => [u.desk, u]));
const perUniStats = new Map(
  UNIVERSITIES.map((u) => [u.desk, { seedMcqs: 0, held: 0, batchAdded: 0, batchSkippedDup: 0 }])
);

const allMcqs = [];
let totalHeld = 0;
// Global dedup: seeds win. Collected across ALL universities first (phase 1)
// so phase-2 batch parsing can skip any id a seed already emitted/held.
const seenIds = new Set();

// ---- phase 1: seeds ----
for (const st of universeStates) {
  const { cfg } = st;
  const stats = perUniStats.get(cfg.desk);
  const seeds = loadSeedsFor(cfg);
  for (const { json, file } of seeds) {
    const defaults = json.defaults || {};
    for (const q of json.questions) {
      const resourceIds = q.resource_ids ?? defaults.resource_ids;
      const srcId = resourceIds && resourceIds[0];
      const id = q.id || defaultId(json, q);

      if (q.hold) {
        totalHeld++;
        stats.held++;
        seenIds.add(id);
        if (srcId) st.getOrCreateSource(srcId).heldCount++;
        continue;
      }

      seenIds.add(id);
      const rawPage = q.page ?? defaults.page;
      const fieldNotes = q.field_notes ?? defaults.field_notes ?? {};
      const sourceCitationRaw = q.source_citation ?? defaults.source_citation ?? "";
      const { page, pageSource } = resolvePage(rawPage, fieldNotes, sourceCitationRaw);
      const sourceCitation = sourceCitationRaw.replace(/\{page\}/g, rawPage != null ? String(rawPage) : "");

      const concept =
        q.main_concept ??
        (q.concept_ids && q.concept_ids[0]) ??
        defaults.main_concept ??
        (defaults.concept_ids && defaults.concept_ids[0]) ??
        null;
      const questionText = q.question ?? defaults.question ?? "";
      const moduleVal = q.module ?? defaults.module ?? null;
      const yearsVal = q.years ?? defaults.years ?? null;
      const year = deriveYear(yearsVal, moduleVal);
      const source = srcId ? st.getOrCreateSource(srcId) : st.getNoSourceSource(year, moduleVal);
      if (!srcId) console.error(`warn: ${file} question ${q.key} no resource_ids → ${cfg.desk} ${year} ${moduleVal || "(no module)"}`);

      allMcqs.push({
        id,
        key: q.key ?? null,
        srcId: source.srcId,
        university: cfg.desk,
        year,
        module: moduleVal,
        cluster: json.cluster || null,
        page,
        pageRaw: rawPage ?? null,
        pageSource,
        title: q.title ?? defaults.title ?? "",
        question: questionText,
        options: q.options ?? defaults.options ?? {},
        correct: q.correct ?? defaults.correct ?? null,
        explanations: q.explanations ?? defaults.explanations ?? {},
        concept,
        topic: q.topic ?? defaults.topic ?? null,
        subtopic: q.subtopic ?? defaults.subtopic ?? null,
        difficulty: q.difficulty ?? defaults.difficulty ?? null,
        sourceCitation,
        fieldNotes,
        stem: buildStem(questionText),
      });

      source.mcqCount++;
      if (!source.year) source.year = year;
      const histKey = page == null ? "unknown" : String(page);
      source.pageHistogram[histKey] = (source.pageHistogram[histKey] || 0) + 1;
      stats.seedMcqs++;
    }
  }
}

// ---- phase 2: emitted batches (question/ + pending-live/), dedup against seeds ----
for (const st of universeStates) {
  const { cfg } = st;
  const stats = perUniStats.get(cfg.desk);
  const files = [
    ...walkFiles(path.join(cfg.docsBase, "question"), [".md"]),
    ...walkFiles(path.join(cfg.docsBase, "pending-live"), [".md"]),
  ];
  for (const f of files) {
    let text;
    try {
      text = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const rec of parseResourcesMd(text)) {
      if (!rec.correct_answer && !rec.answer_a) continue; // not an MCQ record (concept/article/overlay)
      if (!rec.id) continue; // can't dedup or reference without an id

      if (seenIds.has(rec.id)) {
        stats.batchSkippedDup++;
        continue;
      }
      seenIds.add(rec.id);
      stats.batchAdded++;

      // Some hand-authored batches (e.g. Kasr 101-ISK, cross-referenced across
      // several department books) carry no `resource_ids` field at all — the
      // src_ ids only show up in a free-text "Manifest src_X, src_Y, ..." note
      // inside `source_citation`. Fall back to scanning it so these still land
      // on a real source instead of the "(no source)" bucket.
      const srcId = firstSrcToken(rec.resource_ids) || firstSrcToken(rec.source_citation);
      const sourceCitationRaw = rec.source_citation || "";
      const { page, pageSource } = resolvePage(null, {}, sourceCitationRaw);
      const moduleVal = rec.module || null;
      const yearsVal = rec.years || null;
      const year = deriveYear(yearsVal, moduleVal);
      const source = srcId ? st.getOrCreateSource(srcId) : st.getNoSourceSource(year, moduleVal);
      const concept = rec.main_concept || (rec.concept_ids ? rec.concept_ids.split(/\s+/)[0] : null) || null;

      const options = {};
      const explanations = {};
      for (const L of ["a", "b", "c", "d"]) {
        if (rec[`answer_${L}`] !== undefined) options[L.toUpperCase()] = rec[`answer_${L}`];
        if (rec[`explanation_${L}`] !== undefined) explanations[L.toUpperCase()] = rec[`explanation_${L}`];
      }

      allMcqs.push({
        id: rec.id,
        key: null,
        srcId: source.srcId,
        university: cfg.desk,
        year,
        module: moduleVal,
        cluster: null,
        page,
        pageRaw: null,
        pageSource,
        title: rec.title || "",
        question: rec.question || "",
        options,
        correct: rec.correct_answer || null,
        explanations,
        concept,
        topic: rec.topic || null,
        subtopic: rec.subtopic || null,
        difficulty: rec.difficulty || null,
        sourceCitation: sourceCitationRaw,
        fieldNotes: {},
        stem: buildStem(rec.question || ""),
      });

      source.mcqCount++;
      if (!source.year) source.year = year;
      const histKey = page == null ? "unknown" : String(page);
      source.pageHistogram[histKey] = (source.pageHistogram[histKey] || 0) + 1;
    }
  }
}

const sourcesArr = universeStates.flatMap((st) => [...st.sourcesMap.values()]);

// ---- tree: University -> Year -> [resolved-path folders...] -> source ----
const YEAR_SEG_RE = /^(y|yr|year)[\s_-]*\d+$/i;

function stripLeadingYearSeg(segs) {
  return segs.length > 1 && YEAR_SEG_RE.test(segs[0]) ? segs.slice(1) : segs;
}

function insertFolder(nodes, segments, leafName, srcId, mcqCount) {
  if (segments.length === 0) {
    nodes.push({ name: leafName, type: "source", srcId, mcqCount });
    return;
  }
  const [head, ...rest] = segments;
  let folder = nodes.find((n) => n.type === "folder" && n.name === head);
  if (!folder) {
    folder = { name: head, type: "folder", mcqCount: 0, children: [] };
    nodes.push(folder);
  }
  folder.mcqCount += mcqCount;
  insertFolder(folder.children, rest, leafName, srcId, mcqCount);
}

function buildTree(sources) {
  const uniNodes = new Map();
  function getUni(name) {
    let n = uniNodes.get(name);
    if (!n) {
      n = { name, type: "folder", mcqCount: 0, children: [] };
      uniNodes.set(name, n);
    }
    return n;
  }
  // Ensure every configured university appears even with zero MCQs.
  for (const u of UNIVERSITIES) getUni(u.desk);

  for (const s of sources) {
    if (s.mcqCount === 0) continue; // held-only / empty synthetic sources: no tree node
    const uniNode = getUni(s.university);
    uniNode.mcqCount += s.mcqCount;

    const yearName = s.year || "Other";
    let yearNode = uniNode.children.find((n) => n.type === "folder" && n.name === yearName);
    if (!yearNode) {
      yearNode = { name: yearName, type: "folder", mcqCount: 0, children: [] };
      uniNode.children.push(yearNode);
    }
    yearNode.mcqCount += s.mcqCount;

    if (s._noSource) {
      // No PDF, but browsable: a leaf under its year (title already reads
      // "<module> — no source PDF").
      insertFolder(yearNode.children, [], s.title, s.srcId, s.mcqCount);
      continue;
    }

    let segments;
    let leafName;
    if (s.pdfFound && s._abspath) {
      const cfg = cfgByDesk.get(s.university);
      const rel = path.relative(cfg.pdfRoot, s._abspath).split(path.sep).filter(Boolean);
      const stripped = stripLeadingYearSeg(rel);
      leafName = stripped[stripped.length - 1];
      segments = stripped.slice(0, -1);
    } else if (s.sourceRelativePath) {
      const rel = s.sourceRelativePath.split("/").filter(Boolean);
      const stripped = stripLeadingYearSeg(rel);
      leafName = stripped[stripped.length - 1];
      segments = stripped.slice(0, -1);
    } else {
      segments = ["(source PDF not found on disk)"];
      leafName = s.title || s.srcId;
    }
    insertFolder(yearNode.children, segments, leafName, s.srcId, s.mcqCount);
  }
  return [...uniNodes.values()];
}

const totals = {
  mcqs: allMcqs.length,
  held: totalHeld,
  sources: sourcesArr.length,
  sourcesResolved: sourcesArr.filter((s) => s.pdfFound).length,
  universities: UNIVERSITIES.length,
};

const sourcesOut = sourcesArr.map(({ _abspath, _noSource, ...rest }) => rest);

const output = {
  university: "all",
  generatedAt: new Date().toISOString(),
  totals,
  tree: buildTree(sourcesArr),
  sources: sourcesOut,
  mcqs: allMcqs,
};

fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));

// ---- verification-friendly console report --------------------------------
console.log("wrote", OUT_PATH);
console.log("totals", totals);

console.log("\nper-university:");
for (const u of UNIVERSITIES) {
  const stats = perUniStats.get(u.desk);
  const srcs = sourcesArr.filter((s) => s.university === u.desk);
  const resolved = srcs.filter((s) => s.pdfFound).length;
  const mcqCount = allMcqs.filter((m) => m.university === u.desk).length;
  console.log(
    `  ${u.desk}: mcqs=${mcqCount} (seed=${stats.seedMcqs}, batchAdded=${stats.batchAdded}, batchSkippedDup=${stats.batchSkippedDup}) held=${stats.held} sources=${srcs.length} resolved=${resolved}`
  );
}

const pageStats = { page: 0, field_notes: 0, unknown: 0 };
for (const m of allMcqs) pageStats[m.pageSource]++;
console.log("\npageSource breakdown", pageStats);

const resolvedBy = { basename: 0, sha256: 0, none: 0 };
for (const s of sourcesArr) resolvedBy[s.pdfResolvedBy || "none"]++;
console.log("pdfResolvedBy breakdown", resolvedBy);

const zeroResolved = UNIVERSITIES.filter(
  (u) => sourcesArr.filter((s) => s.university === u.desk && s.pdfFound).length === 0
).map((u) => u.desk);
console.log("universities with 0 resolved sources:", zeroResolved);

const notFound = sourcesArr.filter((s) => !s.pdfFound && !s._noSource);
console.log(`sources with PDF not found on disk: ${notFound.length} (showing first 20)`);
console.log(
  notFound.slice(0, 20).map((s) => ({
    university: s.university,
    srcId: s.srcId,
    basename: s.sourceRelativePath ? path.basename(s.sourceRelativePath) : s.title,
  }))
);

const outSize = fs.statSync(OUT_PATH).size;
console.log(`\noutput size: ${(outSize / 1024 / 1024).toFixed(2)} MB`);
