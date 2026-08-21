<!--
  101 ISK Histology practical (spot) items — one per distinct slide subject.

  Source: `scripts/kasr/extract/practical.json`, which catalogues 170 slides from
  the Histology Department's practical book `DPT Practical Histo 101 (1).pdf`
  (src_b4cb8bf9f0c7a6584b4b, 210 pp.) and the data-show revision deck
  `DPT 1- ISK 101 - Final Revision (1).pdf` (src_05a0b0c29acc94017b8f, 68 pp.).
  Those 170 slides are 64 distinct subjects: six plates of simple columnar
  epithelium are one item, not six. The catalogue's own findings key records that
  the revision deck is largely a re-print of the book's question/answer pairs, so
  the two are de-duplicated here rather than imported twice.

  How this faculty runs the spot exam, from the book itself. The book is four
  blocks — Cytology pp.1-73, Blood pp.74-115, Connective Tissue pp.116-164,
  Epithelium pp.165-210 — and each block runs titled teaching plates, then an
  explicit divider (p.32 "DATA SHOW MODEL EXAM", p.89 "BLOOD - Trial test",
  p.138 "Test"), then question/answer plate pairs on consecutive pages. The
  question page carries a micrograph marked with coloured arrows, stars,
  rectangles and circles; the facing page is the model answer. The stems are
  open-set — "Give 1 visible character", "Mention 2 visible characters",
  "Identify the tissue (be specific)" — and the marked answer accepts any valid
  feature. A stem almost always opens by asking what the preparation and the
  stain are before it asks about any marked structure.

  `lab_questions` needs options, which the real exam does not have. The four
  options per question are therefore written so that the three wrong ones are
  the confusions this faculty itself sets up: the pairs it prints on facing
  pages and the pairs Prof. Dalia El Marakby tabulates in her departmental
  handouts (Cytology src_0abbf6bc25c43a087d36, Blood src_450c71dc6273b2e64ca3,
  Connective tissue src_d56198df979fc164f6c6, Epithelium src_79ef34f0f9d8de85acae).
  No distractor is invented.

  MEDIA. The repository holds zero medical images — see
  `docs/Kasr-Source-Imports/media-requests/media-audit.md`. Every item here is
  unrunnable until a human sources its micrograph. That is recorded, not worked
  around: each `media_needed` block cross-references the written request in
  `docs/Kasr-Source-Imports/media-requests/practical-media-requests.md` by its
  exact heading. Nothing was generated, downloaded or saved.

  Concepts: `docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md`
  (43 new identification concepts) and
  `docs/Kasr-Source-Imports/concept/101-ISK-concepts.md` (6 reused).
-->

