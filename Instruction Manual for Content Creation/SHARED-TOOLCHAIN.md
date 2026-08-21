# Shared toolchain

[`CLAIMS.md`](CLAIMS.md) keeps **output files** apart, one row per
`(canonical node, content type)`. It does not keep the **extractor** apart, and that is
where the collisions are actually landing. This file covers the shared surface.

Six module lanes are live at once: `101 ISK`, `102 INT`, `103 BMS`, `104 CPS`, `108 INT`,
each in its own worktree and branch, all writing into one `scripts/kasr/`.

---

## 1. Results are not module-namespaced

Every path below is **tracked**, is rewritten by a module run, and carries no module in
its name. Two lanes running the same step overwrite each other, and the second to merge
wins.

| Path | Why it collides |
|---|---|
| `scripts/kasr/extract/deptbook.json` | one department book per run, fixed path |
| `scripts/kasr/extract/mcq.json`, `mcq-bank.json`, `mcq-report.md` | one question bank per run, fixed path |
| `scripts/kasr/extract/practical.json` | carries a top-level `moduleId` — one module only |
| `scripts/kasr/extract/notes.json`, `retry-silent-pages.json` | per-run extraction state |
| `scripts/kasr/questions.json` | per-run question dump |
| `scripts/kasr/seeds/articles.ts` | one registry every module appends to |

**Rule.** Write results to `scripts/kasr/extract/<module-slug>/` — for example
`scripts/kasr/extract/102-INT/mcq.json`. Leave the existing unprefixed files alone; they
are 101's, and `101-isk` moves them when it lands.

## 2. Do not edit a hardcoded script in place

Every `.py` and `.ts` under `scripts/kasr/` hardcodes `101`/`ISK`. Five lanes editing the
same file five ways is five conflicts.

**Rule.** Give the script a `--module` argument, defaulting to `101 ISK` so nothing that
already works breaks. Change it **once**, in one branch, and post a **Wanted** row in
`CLAIMS.md` so the other lanes rebase onto it instead of each writing their own copy.

`scripts/kasr/extract/pagetext.py` is the worked example and is already correct:

```
python3 scripts/kasr/extract/pagetext.py --module "102 INT" [--tier-max 5]
```

It takes manifest source IDs, decides native-vs-OCR from the manifest's own `textLayer`,
and caches to the gitignored `pagetext/`. **Use it rather than writing a sixth text
extractor.** It currently exists, byte-identical, untracked in two lanes — whoever commits
it first owns it; the rest delete their copy and take that one.

## 3. Output directories are already named — match them

The 101 pass set the shape. A lane that invents a neighbour splits the corpus in two.

- `docs/Kasr-Source-Imports/media-requests/` — **not** `media/`
- `docs/Kasr-Source-Imports/written/` holds written and essay questions; `question/` holds
  everything else. 101 moved its EOY paper from `question/` to `written/`; claim the one
  that matches what you are extracting.

Module-name every file inside them, including the ones 101 left bare:
`102-INT-media-audit.md`, not `media-audit.md`.

## 4. Nobody edits `package.json`

Five lanes each adding an npm script conflicts on every merge. Invoke by path until the
lanes have merged.

## 5. `CLAIMS.md` conflicts on its own anchor

Every lane inserts at the same line — the `| — | — | — | — | — |` placeholder in **Open**.
Three lanes did exactly that today. **Append your rows to the bottom of the table**, and
leave the placeholder row alone until the last lane removes it.

## 6. Rebase on `main` before every push

Other sessions land mid-task. Re-fetch first, every time.
