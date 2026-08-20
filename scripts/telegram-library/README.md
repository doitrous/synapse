# Kasr Al Ainy Telegram Library Generator

This scoped tool builds the offline Kasr Al Ainy study library without changing the ClaudeSynapse application. It consumes a discovery manifest, classifies and deduplicates downloaded study files, creates Office-to-PDF previews, emits catalogs and reports, and generates a `file://`-compatible bilingual `index.html`.

## Safety contracts

- Discovery is resumable. Every Telegram or external node has a disposition.
- Audio, video, voice messages, animations, GIFs, and stickers are never copied.
- No OCR is used.
- Downloads stop when fewer than 5 GiB remain.
- Exact duplicates have one canonical physical copy; other occurrences remain in the provenance ledger.
- Conflicting or incomplete classifications are quarantined in `_Needs Review`.
- Existing ClaudeSynapse application and corpus files are not read or rewritten by this tool.

## Commands

```sh
node build.mjs --target "/Users/doitrous/Desktop/Uni Telegram Data - Organized"
node --test test/*.test.mjs
```

To add Telegram Desktop JSON exports later:

```sh
node build.mjs --target "/path/to/library" --telegram-export "/path/to/result.json"
```

The build is idempotent. Personal state in the browser is keyed by stable content identifiers and survives index regeneration.

