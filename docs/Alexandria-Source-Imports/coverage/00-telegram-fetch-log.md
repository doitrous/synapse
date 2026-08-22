# Alexandria Telegram fetch log — Year 1 lane (F1)

Session: browser turn 2026-08-22 20:22 EEST onward. Chrome is Omar's personal, logged-in
Telegram Web (`web.telegram.org/k/`). Scope: Year 1 gap-ledger rows only (LANE-BRIEF §17,
gap ledger §(iii) Tier 1/2 rows 1, 7, 8, 9, 10; any Year-1 orientation/syllabus document).

Format per search term: term → channels seen (name, link, public/private, joined?) →
candidates (message link, filename, size, description) → decision → filed path.

---

## Search: "Alexandria medicine"
Channels seen:
- **Alexandria Medicine | طب الإسكندرية** — `@AlexandriaMedicine`, public group, 246 members, NOT joined. Live student discussion (admissions/orientation chat, e.g. "متى يبدأ الدوام لسنة اولى طب بشري في الاسكندرية"). Message text previews visible without joining; searched in-chat for "orientation" (Arabic transliteration) with no hits. No document/file sharing observed in the visible scrollback — this looks like a chat channel, not an archive. Not joined (brief: never click Join). **needs Omar to join** if he wants to monitor it, but low file-archive value observed so far.

## Search: "ASM Minds" (led here by Alexandria Medicine chat context — "ASM" = Alexandria med-student community running one channel per cohort year)
Channels seen (all public broadcast channels, not joined — subscribe not clicked):
- ASM Minds 1st year (2025-2030) — `@ASM_2025_2030`, 1,893 subscribers — **current Year-1 cohort, in scope**
- ASM Minds 2nd year (2024-2029) — `@ASM2029`, 2,237 subscribers
- ASM Minds 3rd year (2023-2028) — 2,502 subscribers
- ASM Minds 4th year (2022-2027) — `@ASMMinds2027`, 3,129 subscribers
- ASM Minds Interns (2020-2025) — `@ASM_Minds_2025`, 3,115 subscribers
- ASM Minds 5th year (2021-2026) — 3,715+ subscribers (two entries seen)
- ASM Minds (2019-2024) — 2,395 subscribers
Public channels render post history without joining (unlike the Alexandria Medicine group, which needed the in-chat preview). Worked the 1st-year channel in full; did not open the others (out of Year-1 scope per brief §17), except to note they exist for the orchestrator/next lane.

### ASM Minds 1st year (2025-2030) — findings
In-channel searches: "MED 101" (0 hits), "توجيه"/orientation (0 hits), "pdf" (5 hits, all listed below).
Candidates found (all posted by admins, mostly "ASM Stores"/"Grade Gain" (GG) paid-revision-brand promo posts with one free sample or gift attached):
1. **CVS book sample.pdf** (9.9 MB, posted twice — Apr 8 and pinned again later) — labelled "CVS and Respiratory module" teaching book sample, advertising ASM Stores / gradegain.net paid product. **Skipped** — MED 106 (Cardiorespiratory System) already has adequate teaching-text coverage per gap ledger (Physiology 80 files, Biochemistry 14, etc.); the module's actual gap (row 7) is an EOM/EOY *exam paper*, which this is not, and "sample" ad-content is not a genuine complete source.
2. **Pulmonary Book sample.pdf** (Apr 13) — same ASM Stores promo pattern, Pulmonary module. **Skipped**, same reason as above.
3. **Sample of GG cardiopulmonary module Question Bank 2026.pdf** (May 15) — a paid-product sample/teaser, explicitly labelled "Sample". **Skipped** — a marketing sample, not a genuine complete bank; would not meet the manual's "genuine source" bar.
4. **Practical CVS Qs Bank, ASM Minds.pdf** (May 23, 4.9 MB) — message text: "عيدية ASM لطلابنا الغاليين في أولى طب: إليكم بنك اسئلة عملي موديول ال CVS-respiratory بالكامل هدية مجانية لكم" (ASM's free Eid gift: the complete CVS-Respiratory practical question bank for Year-1 students). Attached thumbnails show practical-exam-style questions labelled by department (Physiology, Histology, Biochemistry, Anatomy). This is real free/complete assessment material for **MED 106**, which currently has **zero exam papers of any kind** (gap row 7). **DOWNLOADED.**
   - sha256 `0ef8500b16cfac84538fd98635e3acd88db7256528db16115cc0a5d1567ff30f` — not found in `docs/Alexandria-Source-Imports/manifest/*.json` or `scripts/alexandria/intake/inventory.json` → not a duplicate.
   - Filed: `/Users/doitrous/Desktop/Alexandria University/y1/MED 106 - Cardiorespiratory System & Communication and Basic Clinical Skills (2)/Cardiorespiratory System/General/Telegram/Practical CVS Qs Bank, ASM Minds.pdf`
   - Fills gap row 7 (MED 106 — any EOM/EOY-equivalent assessment paper) with a genuine practical question bank; it is not an EOM/EOY *written* paper, so row 7 is **partially** filled — a written EOM/EOY for MED 106 is still wanted.
5. **Skill lab ASM MINDS 2024.pdf** (Jun 9) — title suggests Communication & Basic Clinical Skills (2) skill-lab material. Message text and thumbnails checked: appears to be the same "Skill lab book first year final edition.pdf" family already noted as present in the corpus per the gap ledger (MED 106 note: "Skill lab book first year final edition.pdf ... is a genuine complete substitute text"). **Not downloaded without checking** — see HAZARD below; flagged for a follow-up hash check rather than blind download, given time budget.

In-channel search "Genetics": 0 hits. Search "Terminology": several hits, all in a pinned
index message (an admin-authored resource list, re-pinned multiple times) that links to:
- "Terminology lectures by ASM Minds" → a list of **YouTube video links only** (Word
  Root/Suffix, Prefix, Gastroenterology/MSK/Endocrine-Respiratory/Special-Senses/
  Cardiovascular/Urinary-neuro-psychiatry Terminology). No downloadable file — video content
  is out of scope per brief. Not fetched.
- "Terminology books and QS bank" → resolves to a Google Form + Google Maps pickup point for
  **physical book collection** ("فورم حجز كتب أولى طب" — Year-1 book reservation form, pickup
  location given), not a digital source. Not fetched.
- "FOUNDATION books By ASM Minds" → text says the complete Foundation books are available at
  the physical "ASM Store, Mowasah branch" — again physical distribution, not digital. Not
  fetched.
- "Foundation physiology/Biochemistry lectures", "... Gold revision" → branded ASM
  Minds/Grade Gain paid-course products advertised through the channel; no free/complete
  attachment found for these in the time available. Not fetched (would need Omar's judgement
  on whether to purchase — out of this lane's remit).
- "Skill lab ASM MINDS 2024.pdf" (Jun 9, 5.3 MB) — genuine complete file ("يحتوي على كل ما
  تحتاجونه لمقرر ال skill lab", with a QR-code index to free YouTube walkthroughs) covering
  Hand hygiene / History Taking / Vital Signs and more, for Communication & Basic Clinical
  Skills. **Not downloaded** — the gap ledger already records "Skill lab book first year
  final edition.pdf" as a genuine complete substitute text for this exact department
  (MED 106 note), and the fetch list's Tier-1/2 rows for Year 1 do not ask for Clinical-Skills
  teaching material. Flagged in HAZARDS below in case the orchestrator wants a hash-compare
  against the corpus copy anyway.

**Overall assessment of ASM Minds 1st year (2025-2030):** this channel is dominated by two
paid-content brands ("ASM Stores" and "Grade Gain") advertising books/QBanks/revision
products with occasional free "gift" attachments (the CVS practical bank was one such gift).
It is a live, current-cohort channel and worth Omar's own subscription for future gifts, but
in this pass it yielded exactly one Year-1-gap-filling free download.

---

## Session 2 (second sitting, 2026-08-23) — remaining search terms + AlexAid follow-up

Resumed in the same shared Chrome. A tab was already open on `web.telegram.org/k/#@AlexAid_31`
— evidence the first (cut) sitting had started exploring a channel family called "AlexAid"
before the transcript was lost; never logged. Recorded here for the first time (see ODD THINGS).

### Search: "MED 101 Alexandria" (global search)
0 results. Confirmed via screenshot ("No results / Try a different search term").

### Search: "Foundation Alexandria MED 102" (global search)
0 results.

### Search: "Blood immune MED 103 Alexandria" (global search)
0 results.

### AlexAid 1st Year (2031 Class) — `@AlexAid_31`, public channel, 196 subscribers, NOT joined
Not in the previous log; found already open from the cut first sitting. This is a small,
brand-new channel (created 2026-08-10, ~10 posts through 2026-08-21 — i.e. its entire history)
run by "AlexAid" (a tutoring/resource brand, `www.alexaid.org`) explicitly for the **incoming
2031-cohort Year-1 students** — content is squarely orientation-shaped: a welcome message
listing what the "college book" is for, a post titled "نظام الحضور — الجزء الأول" (Attendance
System, Part 1) explaining lecture/practical attendance rules, minimum-attendance-to-sit-exam
thresholds, the exam types (نظري/عملي), and department rotation; a follow-up post "الأدوات
اللي هتحتاجها" (The tools you'll need) listing required kit (stethoscope-adjacent items,
laptop, id/access card, dues) and which items are genuinely mandatory vs. optional. Read the
entire scrollback (channel creation to its most recent post — there is no more).
**No downloadable file exists in this channel at all**: in-channel search for "pdf" returned
zero hits, and every post observed is either plain chat text or a graphic/banner image (not a
document). This content is exactly what gap-ledger row 13 (orientation/syllabus, MED 101 row 1)
is asking for in substance, but the brief restricts fetches to PDF/PPTX/DOCX — there is nothing
in that shape to take. **Not downloaded** (no file exists to download, not a judgement call).
Flagged below as worth Omar's subscription for future posts, and worth another look if the
channel later posts an actual "college book" or attendance-policy document.

### ASM Minds 1st year (2025-2030) — re-checked
Re-opened the pinned index message (the same one logged in Session 1 — YouTube-only
Terminology lecture links, ASM/WhatsApp group links, no PDF/orientation document). No new
content since Session 1's pass; did not re-search all of Session 1's terms. Did not reach
MED 105 (row 9, MSK Biochemistry) or the "genuine key confirmation" sweep (row 14/Tier 3)
before the 20-minute browsing budget ran out — carry these to the next sitting.

### LANDED
None this sitting.

### NOT LANDED
- Row 1 / row 13 (MED 101, orientation/syllabus) — AlexAid_31 channel is on-topic but has no
  file in it (see above); ASM Minds 1st-year pinned index re-checked, still no orientation doc.
  "MED 101 Alexandria" global search: 0 hits.
- Row 10 (MED 102 Pathology/Genetics) — "Foundation Alexandria MED 102" global search: 0 hits.
- Row 8 (MED 103 Anatomy + Medical Terminology subject) — "Blood immune MED 103 Alexandria"
  global search: 0 hits.
- Row 9 (MED 105 MSK Biochemistry) — not attempted this sitting; time ran out.
- Row 7 (MED 106 EOM/EOY) — no further attempt; Session 1 already partially filled it.

### CHANNELS WORTH OMAR JOINING
- `@AlexAid_31` — AlexAid 1st Year (2031 Class), public, 196 subscribers. Orientation-shaped
  text content for the incoming cohort; no files yet but worth watching (and worth checking
  again once the 2031 cohort actually starts classes — this channel is only 11 days old).
- `@ASM_2025_2030` — ASM Minds 1st year (2025-2030), 1,894 subscribers — already flagged in
  Session 1, still standing.
- "AlexAid 1st Year Chat" (linked discussion group under `@AlexAid_31`) — seen in the chat
  list with recent activity but **not opened**: it is a group chat, not a channel broadcast,
  and the brief restricts this lane to channel links and the search box.

### ODD THINGS
- A `navigate` call to `web.telegram.org/k/#@ASM_2025_2030` changed the browser's URL bar but
  did **not** switch the open chat inside Telegram's single-page app — the visible channel
  stayed `@AlexAid_31` until the chat was opened through the UI (global search result click).
  Direct hash-navigation is not reliable for this app; use the in-app search box instead.
- The Claude-in-Chrome extension briefly reported "not connected" mid-session (roughly 1-2
  minutes) and recovered on its own with no action taken; noted in case it recurs for the
  next lane.
- The tab reused from the first sitting had already navigated to `@AlexAid_31` before this
  session started — the first sitting was mid-exploration of a channel never mentioned in its
  logged output. Worth the orchestrator knowing the cut sitting's untranscribed work is not
  fully recoverable from the log alone.

