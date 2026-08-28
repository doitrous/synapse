# Privacy policy — DRAFT

**This is a draft, not a published policy.** Every factual claim below was read
off the code — the privacy manifest, the schema, and the deletion routine — and
is true of the app as it stands. Three things still need you:

1. **A lawyer, or at least someone accountable, should read it.** Egypt's Law
   151 of 2020 on Personal Data Protection applies to students here, and GDPR
   applies to anyone in the EU. I have written what the software does; whether
   that satisfies either law is not something I can certify.
2. **The bracketed placeholders are yours** — the legal entity, its address, and
   the data-protection contact.
3. **It has to be published at a real URL.** Nothing at `/privacy` resolves
   today, and the App Store submission needs it to.

---

## Privacy policy

**Last updated: [DATE]**

Connect Cortex is a study platform for undergraduate medical students, operated
by [LEGAL ENTITY], [ADDRESS]. This policy explains what we collect, why, and
what you can do about it. It covers the Connect Cortex website and the Connect
Cortex iOS app, which are one service and one account.

### What we collect

**When you create an account:** your name, email address, and phone number. Your
phone number is stored in a single international form, so that the same number
written differently cannot register twice.

**What you tell us about your studies:** your university and year of study.
These decide which content is shown to you.

**What you do while studying:** which questions you answered, what you chose,
whether it was right, how long you took, and how confident you said you were.
This is the product — it is what produces your review schedule, your weakest
topics, and your study plan. Without it the app cannot do the thing it is for.

**What you write:** your notes, highlights, annotations on documents,
whiteboards, tags, and anything you type into the study assistant.

**Your device, for notifications:** if your device registers for notifications,
we store the token your operating system issues and the time zone your device
reports. The time zone exists so a reminder is not sent at four in the morning.

**Technical records:** ordinary server logs, and the last time your account was
active.

### What we do not do

- **We do not sell your data**, and we do not share it with data brokers.
- **We do not track you across other apps or websites.** There is no advertising
  network, no analytics SDK, and no tracking pixel in the app.
- **We do not build advertising profiles**, and we do not use your study record
  for anything other than showing you your own study.
- **We do not read your notes**, except where you send them to us — for example,
  a message to the study assistant, or a file attached to a support request.

### The study assistant

If you use the study assistant, your message is sent to a third-party language
model provider so it can be answered. What is sent is your message, the
conversation you are having, the language you are writing in, and a short
description of your plan, your year, what is due today, and which screen you
were on.

**Your conversation is not stored.** It exists in the app while you have it and
is gone when you close it; the server keeps a count of how many messages you
have sent today, so your daily limit can be enforced, and a token count so we
can see what the service costs. It does not keep what you wrote.

The assistant is a study tool. It is not clinical guidance, and it should never
be used for a decision about a patient.

### Where your data is held

Your account and your work are held on servers operated on our behalf in
[REGION — confirm before publishing]. Sign-in is handled by Supabase. The study
assistant sends messages to the model provider configured at the time, which may
process them outside Egypt.

### How long we keep it

We keep your account and your work for as long as your account exists.

**If you delete your account, we delete it.** Not deactivate — delete. Your
notes, annotations, whiteboards, study plan, answer history, saved documents and
notification registrations are removed. Two things survive, and neither is
yours to erase: our record of administrative actions taken on the account (for
example a suspension), and files you attached to a support conversation, which
belong to that conversation.

Deletion is immediate and cannot be undone. Support cannot recover it
afterwards.

### How to delete your account

**In the app:** Account → Delete account.
**On the website:** [CONFIRM — the website has no deletion route today; the app
has one. Either add it or say plainly here that deletion is done in the app.]

You can also write to [DATA PROTECTION CONTACT] and ask us to do it.

### Your rights

You can ask us for a copy of what we hold about you, ask us to correct it, or
ask us to delete it. Write to [DATA PROTECTION CONTACT] and we will answer
within 30 days.

If you are in the EU or the UK, you also have the right to object to processing
and to complain to your data protection authority. If you are in Egypt, you may
complain to the Personal Data Protection Centre.

### Children

Connect Cortex is for university students and is not directed at children. We do
not knowingly collect data from anyone under 16. If you believe a child has an
account, write to us and we will remove it.

### Changes

If this policy changes in a way that affects what we do with your data, we will
say so in the app before the change takes effect.

### Contact

[DATA PROTECTION CONTACT] — currently support is reachable at
`synapse@mail.doitrous.com`.

---

## Notes for whoever finishes this

- **Two claims I could not verify and have flagged in the text:** the hosting
  region, and whether the website offers account deletion. The app does; I
  found no `/api` route the website calls for it.
- **The assistant section matters more than it looks.** It is the only place
  student text leaves our servers, and the only third party that sees anything
  a student wrote. It is stated plainly rather than buried under "service
  providers".
- **This policy and the App Store privacy answers must agree.** Both are derived
  from `ios/Synapse/Resources/PrivacyInfo.xcprivacy`; if one changes, change all
  three.
- **"We do not track you" is a checkable claim, and it is currently true** —
  there is no analytics or advertising SDK anywhere in the app. If one is ever
  added, this sentence and the manifest both become false on the same day.
