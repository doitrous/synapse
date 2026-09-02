#!/usr/bin/env python3
"""Second recovery pass: fuzzy STEM matching for rows match_recover.py missed.

match_recover.py only pairs a keyless bank row with a solved-book question
when their normalised stems are byte-identical. This pass catches near-misses
(trailing punctuation, one garbled word, an OCR-dropped "the") by requiring a
high stem similarity ratio (>= STEM_MIN) *and* the same option-set validation
match_recover.py already uses, so a generic short stem still cannot match on
stem alone.

Reads recovered-answers.json (from match_recover.py) and only tries the rows
still listed as keyless there. Merges its own findings into the same file
under a separate "fuzzyStemRecovered" key so the exact-stem recoveries are
never touched or re-decided.
"""
import json, re, os, glob, collections, time
from difflib import SequenceMatcher

HERE = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(HERE, "..", "mcq-bank.json")
REC_PATH = os.path.join(HERE, "recovered-answers.json")

MIN_PAIR_RATIO = 0.55
MIN_MARGIN = 0.12
MIN_PAIRS_OK = 3
STEM_MIN = 0.90


def norm(s):
    s = re.sub(r"[^a-z0-9 ]", " ", (s or "").lower())
    return re.sub(r"\s+", " ", s).strip()


def ratio(a, b):
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a, b).ratio()


def try_match(bank_q, book_q):
    bank_opts = {k: norm(v) for k, v in bank_q["options"].items()}
    book_opts = {k: norm(v) for k, v in book_q["options"].items()}
    book_ans_letter = book_q.get("answer")
    book_ans_text = book_opts.get(book_ans_letter, "")
    if not book_ans_text:
        return None
    best_for_bank = {}
    for bk, bv in bank_opts.items():
        scores = sorted(((ratio(bv, ov), ok) for ok, ov in book_opts.items()), reverse=True)
        best_for_bank[bk] = scores[0] if scores else (0.0, None)
    pairs_ok = sum(1 for s, _ in best_for_bank.values() if s >= MIN_PAIR_RATIO)
    if pairs_ok < min(MIN_PAIRS_OK, len(bank_opts)):
        return None
    ranked = sorted(((ratio(bv, book_ans_text), bk) for bk, bv in bank_opts.items()), reverse=True)
    if not ranked:
        return None
    top_score, top_letter = ranked[0]
    second_score = ranked[1][0] if len(ranked) > 1 else 0.0
    if top_score < MIN_PAIR_RATIO or top_score - second_score < MIN_MARGIN:
        return None
    mean_ratio = sum(s for s, _ in best_for_bank.values()) / len(best_for_bank)
    return top_letter, mean_ratio, pairs_ok


def main():
    t0 = time.time()
    bank = json.load(open(BANK_PATH, encoding="utf-8"))
    rec = json.load(open(REC_PATH, encoding="utf-8"))
    bank_by_key = {q["key"]: q for q in bank["questions"]}
    still_keys = rec["stillKeylessKeys"]
    still = [bank_by_key[k] for k in still_keys]
    print(f"still-keyless rows to try fuzzy-stem on: {len(still)}", flush=True)

    # coarse bucket by first normalised word + length decile to cut comparisons
    def bucket(stem):
        n = norm(stem)
        first = n.split(" ", 1)[0] if n else ""
        return (first, len(n) // 10)

    buckets = collections.defaultdict(list)
    for q in still:
        buckets[bucket(q["stem"])].append(q)

    books = sorted(glob.glob(os.path.join(HERE, "*-mcq*.json")))
    book_qs = []
    for bpath in books:
        book = json.load(open(bpath, encoding="utf-8"))
        bname = os.path.basename(bpath)
        for q in book["questions"]:
            if q.get("answer"):
                book_qs.append((bname, book.get("book", bname), q))

    hits_by_key = collections.defaultdict(list)
    checked = 0
    for i, (bname, bookname, q) in enumerate(book_qs):
        n = norm(q["stem"])
        first = n.split(" ", 1)[0] if n else ""
        ln = len(n) // 10
        cand_bank_qs = []
        for d in (-1, 0, 1):
            cand_bank_qs.extend(buckets.get((first, ln + d), []))
        for bank_q in cand_bank_qs:
            checked += 1
            sr = ratio(n, norm(bank_q["stem"]))
            if sr < STEM_MIN:
                continue
            m = try_match(bank_q, q)
            if not m:
                continue
            letter, mean_ratio, pairs_ok = m
            hits_by_key[bank_q["key"]].append((letter, {
                "book": bname, "sourceBook": bookname, "page": q.get("page"),
                "q": q.get("q"), "stemRatio": round(sr, 3),
                "meanOptionRatio": round(mean_ratio, 3), "pairsOk": pairs_ok,
            }))
        if i % 200 == 0:
            print(f"  progress: {i}/{len(book_qs)} book Qs scanned, "
                  f"{len(hits_by_key)} candidate bank rows hit so far "
                  f"({time.time()-t0:.0f}s elapsed)", flush=True)

    fuzzy_recovered = {}
    fuzzy_conflicting = {}
    for key, hits in hits_by_key.items():
        letters = {h[0] for h in hits}
        if len(letters) == 1:
            fuzzy_recovered[key] = {
                "answer": next(iter(letters)),
                "confidence": "fuzzy-stem-and-optionset",
                "agreeingBooks": len({h[1]["book"] for h in hits}),
                "occurrences": [h[1] for h in hits],
            }
        else:
            fuzzy_conflicting[key] = {"letters": sorted(letters),
                                       "occurrences": [h[1] for h in hits]}

    rec["fuzzyStemRecovered"] = fuzzy_recovered
    rec["fuzzyStemConflicting"] = fuzzy_conflicting
    rec["fuzzyStemRecoveredCount"] = len(fuzzy_recovered)
    remaining = [k for k in still_keys if k not in fuzzy_recovered and k not in fuzzy_conflicting]
    rec["afterFuzzyStemStillKeylessKeys"] = remaining
    rec["afterFuzzyStemStillKeylessCount"] = len(remaining)

    with open(REC_PATH, "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=1)

    print(f"DONE: fuzzy-stem recovered {len(fuzzy_recovered)}, "
          f"conflicting {len(fuzzy_conflicting)}, "
          f"still keyless after both passes: {len(remaining)} "
          f"({time.time()-t0:.0f}s total)", flush=True)


if __name__ == "__main__":
    main()
