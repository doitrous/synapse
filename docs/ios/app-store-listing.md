# App Store listing — Connect Cortex

Everything App Store Connect asks for, in the order it asks. Fields marked
**decide** are yours: they are commitments about the business, not facts about
the code, and I should not invent them.

Character limits are Apple's and are counted, not estimated.

---

## Identity

| Field | Value | Count |
|---|---|---|
| **App name** | `Connect Cortex` | 14 / 30 |
| **Subtitle** | `Medical study, built to stick` | 29 / 30 |
| **Bundle ID** | `com.synapse.app` | — |
| **SKU** | `connect-cortex-ios` | — |
| **Primary category** | Education | — |
| **Secondary category** | Medical | — |

The bundle identifier keeps the `synapse` name deliberately. It is an address,
not branding: changing it makes a different app, orphaning every install and
every device token. The display name is what a student reads, and that is
already `Connect Cortex`.

---

## Promotional text

Changeable without review, so use it for what is true this term.

> Adaptive Study now plans your week around what you actually got wrong — and
> says why, in numbers you can argue with.

*(116 / 170)*

---

## Description

*(1,693 / 4,000)*

> Connect Cortex is a study platform for undergraduate medical students, built
> around a simple idea: the app should be able to explain every claim it makes
> about you.
>
> **A library that shows its sources.** Articles carry key points, pitfalls and
> exact page citations back to the books they came from. Highlight, annotate and
> tag; everything syncs to the website.
>
> **A question bank that tells you why.** Tutor mode explains each option as you
> go. Timed mode does not. Flag questions, keep notes on them, and resume a
> sitting exactly where you left it.
>
> **Spaced review that is measured, not guessed.** Concepts come back before
> they fade. Answering three questions wrong on one concept records three
> mistakes and one weakness — and the app will show you that distinction rather
> than hiding it.
>
> **Adaptive Study.** A weekly plan built from your own evidence and your exam
> blueprint. It never schedules every free minute, never stacks the hardest work
> together, and names the work that would not fit instead of dropping it
> silently. It also states plainly that finishing the plan is not the same as
> being ready — readiness is measured separately.
>
> **A reader for real textbooks.** Ten annotation tools, a ruler, page thumbnails
> and search, over your own PDFs.
>
> **Practical stations, a notebook, a whiteboard and a shared study room**, all
> in the same account.
>
> **Works offline.** Your library, questions and notes are on the device. What
> you do without signal syncs when there is signal.
>
> **English and Arabic**, with the interface mirrored properly for Arabic
> readers.
>
> Connect Cortex is a study tool. It is not clinical guidance, and nothing in it
> should be used for a decision about a patient.

---

## Keywords

`medical,anatomy,MCQ,qbank,spaced repetition,flashcards,USMLE,med school,revision,physiology`

*(91 / 100 — comma-separated, no spaces after commas, which Apple counts.)*

Deliberately absent: the app name and subtitle words, which Apple already
indexes; and any university's name, which would be a claim about a syllabus
this app does not make.

---

## URLs

| Field | Value |
|---|---|
| **Support URL** | ⚠️ **does not exist yet** |
| **Marketing URL** | `https://synapse.doitrous.com` |
| **Privacy Policy URL** | ⚠️ **does not exist yet** |

**This is a submission blocker.** `src/router.tsx` defines no `/privacy`,
`/terms` or `/support` route — those paths fall through to the catch-all and
render the not-found page. They return HTTP 200 only because the site is a
single-page app that serves the same `index.html` for every path, so a status
check does not reveal it. Both a privacy policy and a support page must exist
and resolve before the listing can be submitted.

---

## App Privacy

These answers must match `ios/Synapse/Resources/PrivacyInfo.xcprivacy` exactly;
a mismatch between the manifest and these answers is a rejection.

**Does this app collect data?** Yes.
**Does it track users?** No — no advertising, no analytics SDK, and nothing
joined to data from other companies.

| Data type | Collected | Linked to identity | Used for tracking | Purpose |
|---|---|---|---|---|
| Email address | Yes | Yes | No | App Functionality |
| Name | Yes | Yes | No | App Functionality |
| Phone number | Yes | Yes | No | App Functionality |
| Other user content — notes, whiteboards, annotations | Yes | Yes | No | App Functionality |
| Product interaction — which questions were answered, and how | Yes | Yes | No | App Functionality |

All of it is linked to the account on purpose: one set of work across a laptop
and a phone is the product.

---

## Age rating

**decide** — but the honest answer to the one question that matters:

**Medical or Treatment Information: Infrequent/Mild.** The app is a medical
curriculum; it discusses disease, anatomy and treatment in an educational
register. Every other category is None.

That produces **12+**. Do not answer "None" here to chase a 4+ rating: the
content is plainly medical, and a rating that understates it is the kind of
thing App Review corrects for you.

---

## Sign-in for App Review

App Review must be able to see everything, so a demo account is required.

- **Sign-in required:** Yes
- **Demo account:** **decide** — create one for review rather than handing over
  a real student's login, and give it a university and year so the year-scoped
  content resolves. An account with no cohort set shows empty surfaces and reads
  as a broken app.
- **Notes for review:** worth stating plainly that the app has no purchase route
  by design, that plan changes happen on the website, and that the assistant has
  a daily message cap which is a product limit rather than a fault.

---

## Export compliance

`ITSAppUsesNonExemptEncryption` is already `false` in `Config/Info.plist`. The
app uses HTTPS and the system keychain and nothing else, which is the exemption
that key declares. No CCATS or year-end self-classification report is needed.

---

## Screenshots

**Required:** iPhone 6.9" — 1320 × 2868 or 1290 × 2796.
**Also required, because the app declares iPad support** (`TARGETED_DEVICE_FAMILY
= 1,2`): iPad 13" — 2064 × 2752.

If the iPad layout is not going to be designed for, dropping to iPhone-only
removes this requirement *and* removes the risk of App Review judging the app on
an iPad layout that is currently a narrow column in a lot of empty space.

Planned set, in order — each shows a claim the description makes:

1. **Today** — streak, what is due, weakest topics.
2. **A question, mid-sitting** — options, with the tutor-mode explanation.
3. **Adaptive Study → Plan** — the week, with "deliberately left free" visible.
4. **The reader** — a real page with annotation tools out.
5. **Library article** — key points and an exact page citation.
6. **Study assistant** — a real answer, with the quota and the disclaimer.

---

## Version

| Field | Value |
|---|---|
| **Version** | `0.1.0` → **decide**; `1.0` is the conventional first submission |
| **Build** | `1` |
| **Copyright** | **decide** — e.g. `2026 <legal entity>` |

## What's New

First submission, so this is the description's opening rather than a change log.

---

## Before submitting

- [ ] Privacy policy page exists and resolves — **blocker**
- [ ] Support page exists and resolves — **blocker**
- [ ] In-app account deletion — **blocker**, guideline 5.1.1(v)
- [ ] App icon replaced with a designed 1024 original (the current one is
      upscaled from a 256px favicon)
- [ ] Demo account created for App Review
- [ ] Screenshots captured at 6.9" (and 13" iPad, unless iPad support is dropped)
- [ ] Tested on a physical device — nothing has ever run on one
