#!/usr/bin/env python3
"""Third recovery pass: token-overlap stem candidates + stricter option check.

Passes 1-2 (match_recover.py, fuzzy_stem_pass.py) require the stem to be
near-identical (exact norm, or >=0.90 char-level ratio in the same first-word
bucket). Real papers reorder clauses ("one is false" vs "one is true", a
question mark dropped, "regarding X" vs "concerning X") enough that some
genuine duplicates never land in the same bucket.

This pass widens candidate generation to word-set Jaccard overlap (order-
independent, catches reordering) but compensates with a STRICTER option-match
requirement, since a looser stem test alone would happily pair two different
questions about the same organ. A candidate is only accepted when at least 3
options score >= 0.60 (vs 0.55 in earlier passes) with the same margin rule.

Only tried on the two-pass leftovers so passes 1-2's more confident matches
are never re-litigated. Merges into recovered-answers.json as a third bucket.
"""
import json, re, os, glob, collections, time
from difflib import SequenceMatcher

HERE = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(HERE, "..", "mcq-bank.json")
REC_PATH = os.path.join(HERE, "recovered-answers.json")

MIN_PAIR_RATIO = 0.60
MIN_MARGIN = 0.14
MIN_PAIRS_OK = 3
JACCARD_MIN = 0.55


def norm(s):
    s = re.sub(r"[^a-z0-9 ]", " ", (s or "").lower())
    return re.sub(r"\s+", " ", s).strip()


def tokens(s):
    return set(norm(s).split())


def ratio(a, b):
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a, b).ratio()


def jaccard(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


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
    still_keys = rec["afterFuzzyStemStillKeylessKeys"]
    still = [bank_by_key[k] for k in still_keys]
    print(f"still-keyless rows to try token-overlap on: {len(still)}", flush=True)

    still_tok = [(q, tokens(q["stem"])) for q in still]
    # inverted index: token -> list index, to avoid O(n*m) full scan per book Q
    inv = collections.defaultdict(set)
    for i, (q, toks) in enumerate(still_tok):
        for t in toks:
            inv[t].add(i)

    books = sorted(glob.glob(os.path.join(HERE, "*-mcq*.json")))
    book_qs = []
    for bpath in books:
        book = json.load(open(bpath, encoding="utf-8"))
        bname = os.path.basename(bpath)
        for q in book["questions"]:
            if q.get("answer"):
                book_qs.append((bname, book.get("book", bname), q))

    hits_by_key = collections.defaultdict(list)
    for i, (bname, bookname, q) in enumerate(book_qs):
        btoks = tokens(q["stem"])
        if len(btoks) < 3:
            continue
        cand_idx = set()
        for t in btoks:
            cand_idx |= inv.get(t, set())
        for ci in cand_idx:
            bank_q, ntoks = still_tok[ci]
            jac = jaccard(btoks, ntoks)
            if jac < JACCARD_MIN:
                continue
            m = try_match(bank_q, q)
            if not m:
                continue
            letter, mean_ratio, pairs_ok = m
            hits_by_key[bank_q["key"]].append((letter, {
                "book": bname, "sourceBook": bookname, "page": q.get("page"),
                "q": q.get("q"), "jaccard": round(jac, 3),
                "meanOptionRatio": round(mean_ratio, 3), "pairsOk": pairs_ok,
            }))
        if i % 200 == 0:
            print(f"  progress: {i}/{len(book_qs)} book Qs scanned, "
                  f"{len(hits_by_key)} candidate bank rows hit so far "
                  f"({time.time()-t0:.0f}s elapsed)", flush=True)

    tok_recovered = {}
    tok_conflicting = {}
    for key, hits in hits_by_key.items():
        letters = {h[0] for h in hits}
        if len(letters) == 1:
            tok_recovered[key] = {
                "answer": next(iter(letters)),
                "confidence": "fuzzy-token-overlap-and-optionset",
                "agreeingBooks": len({h[1]["book"] for h in hits}),
                "occurrences": [h[1] for h in hits],
            }
        else:
            tok_conflicting[key] = {"letters": sorted(letters),
                                     "occurrences": [h[1] for h in hits]}

    rec["tokenOverlapRecovered"] = tok_recovered
    rec["tokenOverlapConflicting"] = tok_conflicting
    rec["tokenOverlapRecoveredCount"] = len(tok_recovered)
    remaining = [k for k in still_keys if k not in tok_recovered and k not in tok_conflicting]
    rec["finalStillKeylessKeys"] = remaining
    rec["finalStillKeylessCount"] = len(remaining)

    with open(REC_PATH, "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=1)

    total_recovered = (rec["recoveredCount"] + rec["fuzzyStemRecoveredCount"]
                       + len(tok_recovered))
    print(f"DONE: token-overlap recovered {len(tok_recovered)}, "
          f"conflicting {len(tok_conflicting)}, "
          f"TOTAL recovered so far: {total_recovered}/915, "
          f"final still keyless: {len(remaining)} "
          f"({time.time()-t0:.0f}s total)", flush=True)


if __name__ == "__main__":
    main()
