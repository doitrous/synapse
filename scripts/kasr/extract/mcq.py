#!/usr/bin/env python3
"""Extract MCQs from a Kasr Al Ainy module's instructor question books.

    python3 scripts/kasr/extract/mcq.py [--module "104 CPS"]

Defaults to module 101 ISK, whose results are committed at the unprefixed
paths; any other module writes into extract/<module-slug>/, caches included.

Transcription only: text is copied out of the PDFs, never authored or completed.
Resumable -- each file's result is written to parts/<sourceId>.json and mcq.json
is re-merged after every file, so a kill loses at most one file of work.
"""
import json, os, re, subprocess, sys, tempfile, unicodedata
from concurrent.futures import ThreadPoolExecutor

from kasr_module import DEFAULT_MODULE, module_sources, out_path, parse_module, \
    report_textlayer_fallback

OCR_PAGE_CAP = 40
DPI = 120

# Set from --module in main(). The page cache is this script's own, not the
# shared pagetext/ written by pagetext.py: the two record different shapes, and
# a run that read the other's records would mislabel every page it loaded.
MODULE = DEFAULT_MODULE
PARTS = out_path(MODULE, "parts")
TEXTCACHE = out_path(MODULE, "pagetext")
OUT = out_path(MODULE, "mcq.json")

# The 101 pass named its question books one by one. A module without such a
# list takes every instructor-material PDF the manifest gives it.
TARGETS = [
    "101 mcq all after edit(3)-نسخ.pdf",
    "Anatomy MCQ Book [2025] [first priority].pdf",
    "Anatomy MCQ by Dr.Jalal [Embryology] (1).pdf",
    "Anatomy Question [Basis] (1).pdf",
    "Anatomy Question [Embryo] (1).pdf",
    "Anatomy Question [Upper Limb] (1).pdf",
    "Anatomy by Dr.Alaa [Upper Limb][MCQ].pdf",
    "Basis MCQ by Dr.Jalal (1).pdf",
    "Blood MCQ pdf_87895.pdf",
    "Blood MCQ answer.pdf_87896.pdf",
    "Blood | Module 101 questions.pdf.pdf",
    "CT MCQ 2024 JPG.pdf",
    "CT MCQ answer JPG.pdf",
    "Cytology Mcq_87432.pdf",
    "Cytology MCQ answers_87421.pdf",
    "Cytology | Module 101 questions.pdf.pdf",
    "Dpt Book HISTO MCQ [Blood] (1).pdf",
    "Dpt Book HISTO MCQ [Connective Tissue] (1).pdf",
    "Dpt Book HISTO MCQ [Cytology] (1).pdf",
    "Dpt Book HISTO MCQ [Epithelium] (1).pdf",
    "Dpt Book MCQ histo 101 .NEW (1).pdf",
    "Eithelium mcq 2025  JPG.pdf",
    "Epithelium MCQ 2025 answers.pdf",
    "Epithelium | Module 101 questions.pdf.pdf",
    "Histo MCQ by Dr.Zahra [Blood].pdf",
    "Histo MCQ by Dr.Zahra [Connective Tissue].pdf",
    "Histo MCQ by Dr.Zahra [Cytology].pdf",
    "Histo MCQ by Dr.Zahra [Epithelium].pdf",
    "Upper MCQ Dr.jalal (1).pdf",
    "galal Upper .pdf",
    "Upper Limb Formative Assessment.pdf",
    "Anatomy Quiz (Arm) (4).pdf",
    "Anatomy Quiz (Forearm) (3).pdf",
    "Forearm Quiz (3).pdf",
]

# question book -> separate answer-key file
ANSWER_PAIRS = {
    "Blood MCQ pdf_87895.pdf": "Blood MCQ answer.pdf_87896.pdf",
    "CT MCQ 2024 JPG.pdf": "CT MCQ answer JPG.pdf",
    "Cytology Mcq_87432.pdf": "Cytology MCQ answers_87421.pdf",
    "Eithelium mcq 2025  JPG.pdf": "Epithelium MCQ 2025 answers.pdf",
}
KEY_FILES = set(ANSWER_PAIRS.values())

# Scans so degraded that OCR interleaves options between neighbouring questions.
# Everything from these is forced to low confidence and flagged for manual work.
POOR_OCR = {"Basis MCQ by Dr.Jalal (1).pdf"}

TOPIC_RULES = [
    ("Embryology", ("embryo",)),
    ("Connective Tissue", ("connective tissue", "ct mcq")),
    ("Upper Limb", ("upper limb", "upper", "arm", "forearm")),
    ("Cytology", ("cytology", "cyto")),
    ("Epithelium", ("epithelium", "eithelium", "epitheli")),
    ("Blood", ("blood",)),
    ("Basis", ("basis",)),
    ("Histology-general", ("histo",)),
]


def log(msg):
    print(msg, flush=True)


def topic_for(name):
    low = name.lower()
    for topic, keys in TOPIC_RULES:
        if any(k in low for k in keys):
            return topic
    return "unknown"


def run(cmd, timeout):
    return subprocess.run(cmd, capture_output=True, timeout=timeout)


# ---------------------------------------------------------------- text sourcing
def native_pages(path, npages):
    try:
        r = run(["pdftotext", "-layout", path, "-"], 180)
    except subprocess.TimeoutExpired:
        return None
    if r.returncode != 0:
        return None
    txt = r.stdout.decode("utf-8", "replace")
    pages = txt.split("\f")
    if pages and not pages[-1].strip():
        pages.pop()
    return pages


def ocr_page(path, pageno):
    with tempfile.TemporaryDirectory() as td:
        stub = os.path.join(td, "p")
        try:
            r = run(["pdftoppm", "-f", str(pageno), "-l", str(pageno), "-r", str(DPI),
                     "-png", "-singlefile", path, stub], 180)
            if r.returncode != 0:
                return ""
            png = stub + ".png"
            if not os.path.exists(png):
                return ""
            r = run(["tesseract", png, "stdout", "-l", "eng+ara", "--psm", "6"], 240)
            return r.stdout.decode("utf-8", "replace")
        except subprocess.TimeoutExpired:
            return ""
        except Exception:
            return ""


def ocr_pages(path, npages):
    n = min(npages or OCR_PAGE_CAP, OCR_PAGE_CAP)
    idx = list(range(1, n + 1))
    with ThreadPoolExecutor(max_workers=4) as ex:
        return list(ex.map(lambda p: ocr_page(path, p), idx))


# ---------------------------------------------------------------- parsing
Q_START = re.compile(r"^\s*[\(\[]?(\d{1,3})\s*[\)\].:\-\u2013]\s*(.*)$")
OPT_LINE = re.compile(r"^\s*[\(\[]?\s*\*?\s*([a-eA-E])\s*[\)\].:\-\u2013]\s+(.*)$")
OPT_INLINE = re.compile(r"(?:(?<=\s)|^)[\(\[]?\*?([a-eA-E])[\)\].:]\s+")
ANS_LINE = re.compile(
    r"(?i)^\s*(?:the\s+)?(?:correct\s+)?(?:answer|ans|answ|key|correct)\s*(?:is)?\s*[:\-\u2013\)]?\s*[\(\[]?([a-eA-E])[\)\]]?\s*$")
ANS_INLINE = re.compile(
    r"(?i)\b(?:answer|ans|key)\s*(?:is)?\s*[:\-\u2013\)]?\s*[\(\[]?([a-eA-E])[\)\]]?(?![a-z])")
KEY_PAIR = re.compile(r"(?<![A-Za-z0-9])(\d{1,3})\s*[\.\-\):]?\s*[\(\[]?([a-eA-E])[\)\]]?(?![A-Za-z0-9])")
ANS_HEADING = re.compile(r"(?i)^\s*(?:model\s+)?answers?\s*(?:key)?\s*[:\-]?\s*$")

NOISE_OK = set(" \t.,;:!?()[]{}'\"-/%+&*#=<>|_\n\u2013\u2019\u201c\u201d")


def clean(s):
    s = s.replace("\u00a0", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s.strip(" .\u2013-")


def noise_ratio(s):
    if not s:
        return 1.0
    bad = 0
    for ch in s:
        if ch.isalnum() or ch in NOISE_OK:
            continue
        cat = unicodedata.category(ch)
        if cat.startswith("L") or cat.startswith("N"):
            continue
        bad += 1
    return bad / len(s)


def split_inline_options(line):
    """Return [(letter, text)] when one line packs several options, else []."""
    marks = list(OPT_INLINE.finditer(line))
    if len(marks) < 2:
        return []
    letters = [m.group(1).upper() for m in marks]
    if letters != sorted(set(letters), key=letters.index):
        return []
    out = []
    for i, m in enumerate(marks):
        end = marks[i + 1].start() if i + 1 < len(marks) else len(line)
        out.append((m.group(1).upper(), clean(line[m.end():end])))
    return out


def key_line_pairs(line):
    """If the line is essentially just number/letter answer-key pairs, return them."""
    s = line.strip()
    if not s or len(s) > 200:
        return []
    pairs = KEY_PAIR.findall(s)
    if not pairs:
        return []
    residue = KEY_PAIR.sub(" ", s)
    residue = re.sub(r"[\s\.\-\):\|\u2013]", "", residue)
    if len(residue) > max(3, len(s) * 0.25):
        return []
    return [(int(n), l.upper()) for n, l in pairs if 1 <= int(n) <= 999]


def flatten(pages):
    """[(page_no, line)] over the whole document."""
    out = []
    for pno, ptext in enumerate(pages, start=1):
        for line in ptext.splitlines():
            out.append((pno, line.rstrip()))
    return out


def find_key_blocks(lines):
    """Locate runs of answer-key rows. Returns (set_of_line_indices, [(end_idx, mapping)])."""
    n = len(lines)
    consumed = set()
    blocks = []
    i = 0
    while i < n:
        pairs = key_line_pairs(lines[i][1])
        heading = ANS_HEADING.match(lines[i][1])
        if not pairs and not heading:
            i += 1
            continue
        j = i
        run_idx = []
        key_rows = 0
        mapping = {}
        gap = 0
        while j < n:
            text = lines[j][1]
            p = key_line_pairs(text)
            if p:
                key_rows += 1
                run_idx.append(j)
                for num, letter in p:
                    mapping.setdefault(num, letter)
                gap = 0
            elif not text.strip() or ANS_HEADING.match(text) or len(text.strip()) <= 30:
                # blank lines, the ANSWERS heading and page furniture may sit inside a grid
                run_idx.append(j)
                gap += 1
                if gap > 3:
                    break
            else:
                break
            j += 1
        # A real answer grid is substantial and densely numbered. A handful of
        # number/letter pairs scraped out of OCR noise is not a key.
        nums = sorted(mapping)
        dense = bool(nums) and (nums[-1] - nums[0] + 1) <= 3 * len(nums)
        big = len(mapping) >= 5 and dense
        if big and (key_rows >= 3 or (heading and key_rows >= 1)):
            while run_idx and not key_line_pairs(lines[run_idx[-1]][1]):
                run_idx.pop()
            if heading:
                run_idx.append(i)
            consumed.update(run_idx)
            blocks.append((max(run_idx) if run_idx else i, mapping))
            i = j
        else:
            i += 1
    return consumed, blocks


def options_ahead(lines, skip, idx):
    """Count option markers between this numbered line and the next one (max 12 lines)."""
    n = len(lines)
    count = 0
    seen = set()
    for j in range(idx + 1, min(n, idx + 13)):
        if j in skip:
            break
        text = lines[j][1]
        if not text.strip():
            continue
        if Q_START.match(text):
            break
        inline = split_inline_options(text)
        if inline:
            for letter, _ in inline:
                seen.add(letter)
            continue
        mo = OPT_LINE.match(text)
        if mo:
            seen.add(mo.group(1).upper())
    return len(seen)


def parse_questions(lines, skip):
    """Walk document lines and pull out numbered MCQs. `skip` = answer-key line indices."""
    qs = []
    cur = None
    expected = None

    def close():
        nonlocal cur
        if cur is not None:
            cur["stem"] = clean(" ".join(cur["stem_lines"]))
            del cur["stem_lines"]
            qs.append(cur)
            cur = None

    for idx, (pno, raw) in enumerate(lines):
        if idx in skip:
            # an answer grid ends the current chapter's numbering
            close()
            expected = None
            continue
        line = raw
        if not line.strip():
            continue

        m = ANS_LINE.match(line)
        if m and cur is not None:
            cur["answer"] = m.group(1).upper()
            continue

        if cur is not None:
            inline = split_inline_options(line)
            if inline:
                for letter, text in inline:
                    cur["options"].setdefault(letter, text)
                continue
            mo = OPT_LINE.match(line)
            if mo:
                letter = mo.group(1).upper()
                if "*" in raw[:max(1, raw.index(mo.group(1)) + 1)]:
                    cur["answer"] = cur["answer"] or letter
                cur["options"].setdefault(letter, clean(mo.group(2)))
                continue

        mq = Q_START.match(line)
        if mq:
            num = int(mq.group(1))
            rest = mq.group(2)
            plausible = expected is None or num == 1 or (expected <= num <= expected + 3)
            if not plausible:
                # numbering may be mangled (OCR); trust the layout instead
                plausible = options_ahead(lines, skip, idx) >= 2
            if plausible and num <= 500:
                close()
                cur = {"page": pno, "number": num, "stem_lines": [],
                       "options": {}, "answer": None, "idx": idx}
                expected = num + 1
                if rest.strip():
                    ai = ANS_INLINE.search(rest)
                    if ai:
                        cur["answer"] = ai.group(1).upper()
                        rest = rest[:ai.start()]
                    inline = split_inline_options(rest)
                    if inline:
                        head = rest[:OPT_INLINE.search(rest).start()]
                        if head.strip():
                            cur["stem_lines"].append(head)
                        for letter, text in inline:
                            cur["options"].setdefault(letter, text)
                    else:
                        cur["stem_lines"].append(rest)
                continue

        if cur is not None and not cur["options"]:
            ai = ANS_INLINE.search(line)
            if ai:
                cur["answer"] = ai.group(1).upper()
                line = line[:ai.start()]
            if line.strip():
                cur["stem_lines"].append(line)
    close()
    return qs


def apply_inline_keys(questions, blocks):
    """Each answer grid answers the run of questions immediately before it."""
    used = 0
    prev_end = -1
    for end_idx, mapping in blocks:
        seg = [q for q in questions if prev_end < q["idx"] < end_idx]
        # A key answers its own chapter: nearly every number it lists should be a
        # question in that segment. If most of its numbers match nothing, it is not
        # this segment's key and applying it would invent answers.
        segnums = {q["number"] for q in seg}
        matched = sum(1 for n in mapping if n in segnums)
        if not seg or not mapping or matched < 0.7 * len(mapping):
            prev_end = end_idx
            continue
        for q in seg:
            if q["answer"] is None:
                letter = mapping.get(q["number"])
                if letter:
                    q["answer"] = letter
                    q["answerFrom"] = "same-file"
                    used += 1
        prev_end = end_idx
    return used


def parse_answer_key(pages):
    key = {}
    for _pno, line in flatten(pages):
        for num, letter in key_line_pairs(line):
            key.setdefault(num, letter)
    return key


# ---------------------------------------------------------------- per file
def load_manifest(module):
    by_name = {}
    for s in module_sources(module, category="Instructor material"):
        by_name[s["fileName"]] = s
    return by_name


def get_pages(entry, info):
    """Page text for a file, cached to pagetext/ so re-parsing never re-runs OCR."""
    cache = os.path.join(TEXTCACHE, entry["sourceId"] + ".json")
    if os.path.exists(cache):
        with open(cache, encoding="utf-8") as fh:
            c = json.load(fh)
        info.update({k: c[k] for k in ("method", "pagesRead", "capped") if k in c})
        if c.get("pagesRemaining"):
            info["pagesRemaining"] = c["pagesRemaining"]
        if c.get("error"):
            info["error"] = c["error"]
        return c["pages"]

    path = entry["absolutePath"]
    npages = entry.get("pageCount") or 0
    if not os.path.exists(path):
        info["error"] = "file not found at manifest absolutePath"
        info["method"] = "none"
        pages = []
    else:
        pages = native_pages(path, npages) or []
        if len("".join(pages).strip()) < 200:
            info["method"] = "ocr"
            pages = ocr_pages(path, npages)
            if npages and len(pages) < npages:
                info["capped"] = True
                info["pagesRemaining"] = npages - len(pages)
        info["pagesRead"] = len(pages)
        report_textlayer_fallback(entry, "ocr" if info["method"] == "ocr" else "native")

    with open(cache, "w", encoding="utf-8") as fh:
        json.dump({"pages": pages, "method": info["method"],
                   "pagesRead": info.get("pagesRead", 0), "capped": info["capped"],
                   "pagesRemaining": info.get("pagesRemaining"),
                   "error": info.get("error")}, fh, ensure_ascii=False)
    return pages


def extract_file(entry):
    name = entry["fileName"]
    npages = entry.get("pageCount") or 0
    info = {"file": name, "sourceId": entry["sourceId"], "pages": npages,
            "pagesRead": npages, "capped": False, "extracted": 0,
            "method": "text", "isAnswerKey": name in KEY_FILES}

    pages = get_pages(entry, info)
    if not pages:
        return info, [], {}

    if name in KEY_FILES:
        key = parse_answer_key(pages)
        info["role"] = "answer-key"
        info["keyEntries"] = len(key)
        return info, [], key

    lines = flatten(pages)
    skip, blocks = find_key_blocks(lines)
    questions = parse_questions(lines, skip)
    matched = apply_inline_keys(questions, blocks)
    info["inFileAnswerGrids"] = len(blocks)
    info["answersFromInFileGrid"] = matched
    return info, questions, {}


def finalise(info, questions, key, key_from):
    rows = []
    method = info["method"]
    topic = topic_for(info["file"])
    for q in questions:
        opts = {k: v for k, v in q["options"].items() if v}
        answer = q.get("answer")
        asrc = "same-file" if answer else "none"
        if answer and q.get("answerFrom"):
            asrc = q["answerFrom"]
        if not answer and key:
            k = key.get(q["number"])
            if k:
                answer = k
                asrc = "answer-key"
        stem = q["stem"]
        nr = max(noise_ratio(stem), noise_ratio(" ".join(opts.values())))
        ocr_noise = method == "ocr" and nr > 0.05
        if len(stem) < 15 or len(opts) < 3 or nr > 0.12:
            conf = "low"
        elif method == "ocr" or len(opts) < 4:
            conf = "medium"
        else:
            conf = "high"
        qtype = "mcq" if len(opts) >= 2 else "no-options"
        if info["file"] in POOR_OCR:
            conf = "low"
        # An answer naming an option the question does not have cannot be trusted to
        # mark anything. Keep the raw letter so it stays fixable, but do not assert it.
        unresolved = None
        if answer and opts and answer not in opts:
            unresolved, answer, asrc = answer, None, "none"
        row = {
            "sourceId": info["sourceId"], "file": info["file"], "page": q["page"],
            "number": q["number"], "questionType": qtype,
            "stem": stem, "options": opts,
            "answer": answer, "answerSource": asrc, "topic": topic,
            "confidence": conf, "ocrNoise": bool(ocr_noise),
        }
        if unresolved:
            row["unresolvedAnswerLetter"] = unresolved
        if info["file"] in POOR_OCR:
            row["needsManualTranscription"] = True
        if asrc == "answer-key":
            row["answerKeyFile"] = key_from
        rows.append(row)
    info["extracted"] = len(rows)
    info["mcqRows"] = sum(1 for r in rows if r["questionType"] == "mcq")
    info["noOptionRows"] = sum(1 for r in rows if r["questionType"] == "no-options")
    info["withAnswer"] = sum(1 for r in rows if r["answer"])
    return rows


def merge_and_write():
    files, questions = [], []
    for fn in sorted(os.listdir(PARTS)):
        if not fn.endswith(".json"):
            continue
        with open(os.path.join(PARTS, fn), encoding="utf-8") as fh:
            part = json.load(fh)
        files.append(part["info"])
        questions.extend(part["questions"])
    doc = {
        "generatedFrom": "Kasr Al Ainy corpus, module " + MODULE +
                         ", sourceCategory 'Instructor material' "
                         "(paths resolved via docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json)",
        "ocrPageCap": OCR_PAGE_CAP,
        "totalQuestions": len(questions),
        "totalMcq": sum(1 for q in questions if q["questionType"] == "mcq"),
        "totalWithAnswer": sum(1 for q in questions if q["answer"]),
        "files": files,
        "questions": questions,
    }
    tmp = OUT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, OUT)
    return len(questions)


USAGE = __doc__


def main(argv):
    global MODULE, PARTS, TEXTCACHE, OUT
    if "--help" in argv or "-h" in argv:
        print(USAGE)
        return
    MODULE, argv = parse_module(argv)
    if argv:
        raise SystemExit("unexpected arguments: %s\n%s" % (" ".join(argv), USAGE))
    PARTS = out_path(MODULE, "parts")
    TEXTCACHE = out_path(MODULE, "pagetext")
    OUT = out_path(MODULE, "mcq.json")

    os.makedirs(PARTS, exist_ok=True)
    os.makedirs(TEXTCACHE, exist_ok=True)
    by_name = load_manifest(MODULE)
    log("module %s -> %s" % (MODULE, os.path.relpath(OUT, os.getcwd())))
    if MODULE == DEFAULT_MODULE:
        targets = TARGETS
    else:
        targets = sorted(by_name)
    missing = [t for t in targets if t not in by_name]
    for t in missing:
        log(f"MANIFEST-MISS {t}")

    # answer keys first so pairing has them available
    order = [t for t in targets if t in KEY_FILES] + [t for t in targets if t not in KEY_FILES]
    keys_by_file = {}

    for name in order:
        entry = by_name.get(name)
        if entry is None:
            continue
        part_path = os.path.join(PARTS, entry["sourceId"] + ".json")
        if os.path.exists(part_path):
            with open(part_path, encoding="utf-8") as fh:
                cached = json.load(fh)
            if cached.get("key"):
                keys_by_file[name] = cached["key"]
            log(f"SKIP  {name} (already done, {cached['info'].get('extracted', 0)} q)")
            continue
        try:
            info, questions, key = extract_file(entry)
        except Exception as exc:
            info = {"file": name, "sourceId": entry["sourceId"],
                    "pages": entry.get("pageCount"), "pagesRead": 0, "capped": False,
                    "extracted": 0, "method": "none", "error": f"{type(exc).__name__}: {exc}"}
            questions, key = [], {}

        key_from = ANSWER_PAIRS.get(name)
        pair_key = {}
        if key_from:
            raw = keys_by_file.get(key_from, {})
            pair_key = {int(k): v for k, v in raw.items()}
            info["answerKeyFile"] = key_from
            info["answerKeyEntries"] = len(pair_key)
        rows = finalise(info, questions, pair_key, key_from)

        with open(part_path, "w", encoding="utf-8") as fh:
            json.dump({"info": info, "questions": rows,
                       "key": {str(k): v for k, v in key.items()}}, fh, ensure_ascii=False)
        if key:
            keys_by_file[name] = {str(k): v for k, v in key.items()}
        log(f"DONE  {name} | method={info['method']} pages={info['pagesRead']}/{info.get('pages')} "
            f"capped={info['capped']} q={info['extracted']} "
            f"key={len(key) if key else ''} err={info.get('error','')}")
        total = merge_and_write()
        log(f"      merged -> {total} questions total")

    total = merge_and_write()
    log(f"ALL DONE: {total} questions")


if __name__ == "__main__":
    main(sys.argv[1:])
