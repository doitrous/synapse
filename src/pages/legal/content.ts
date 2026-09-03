import { AR_LEGAL } from '@/data/i18n-ar/legal'

/**
 * The four footer documents, as structure rather than markup.
 *
 * These are documents, not interface: the prose is written once, in English,
 * and the page renders it. It is deliberately *not* wrapped in `t()` — a
 * translated contract is a different contract, and a machine-adjacent Arabic
 * rendering of terms is worse than an honest note that the Arabic version is
 * still being reviewed (see `LegalPage`).
 *
 * Nothing here invents a company fact. Anything Nishany has not confirmed —
 * the legal entity, the registered address, the governing law, retention
 * periods, refund processing times, a phone number — is left as a bracketed
 * placeholder, and the section carrying it is marked `needsReview` so the page
 * shows a "Needs legal review" badge next to the heading. That way an
 * unfinished document reads as unfinished to a student and to whoever has to
 * finish it, instead of reading as settled policy.
 */

/** The support inbox students already write to (see `Account`, `Billing`). */
export const SUPPORT_ADDRESS = 'help@nishany.com'

/**
 * Set on the day each document is approved. Left as a placeholder because a
 * "last updated" date on an unreviewed draft is itself a false statement.
 */
const UPDATED = '[DATE — set before publishing]'

export interface LegalSection {
  /** Anchor id, also the key in the section index. */
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
  /** Renders a "Needs legal review" badge beside the heading. */
  needsReview?: boolean
}

export interface LegalPageContent {
  /** Route path, used as the canonical URL. */
  slug: string
  title: string
  /** `<title>` for the tab and the search result. */
  documentTitle: string
  description: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export type LegalPageKey = 'terms' | 'privacy' | 'refund' | 'contact' | 'accessibility'

/** The exact line the pricing page already shows, reused as the refund opener. */
const REFUND_LINE = '14-day refund window, subject to the published refund policy and abuse controls.'

const TERMS: LegalPageContent = {
  slug: '/terms',
  title: 'Terms and Conditions',
  documentTitle: 'Terms and Conditions · Nishany',
  description: 'The terms that apply when you use Nishany — accounts, subscriptions, acceptable use, content ownership and termination.',
  updated: UPDATED,
  intro:
    'These terms describe what you can expect from Nishany and what Nishany expects from you. They apply whenever you create an account, take a trial, or pay for access. If you do not agree with them, do not use the service.',
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who these terms are with',
      needsReview: true,
      paragraphs: [
        'Nishany is a study platform for medical students in Egypt, operated by [COMPANY LEGAL NAME], registered at [REGISTERED ADDRESS]. In these terms, "we", "us" and "Nishany" mean that company, and "you" means the person using the account.',
        'These terms are governed by the law of [JURISDICTION]. The company details, the registration number and the governing law above have not been confirmed for publication yet.',
      ],
    },
    {
      id: 'accounts',
      heading: 'Your account and eligibility',
      paragraphs: [
        'You need an account to use Nishany. You give a real email address, verify it, and tell us the university and academic year you study in, because the curriculum you see is scoped to that cohort.',
        'The account is personal. It belongs to one student and is meant to be used by that student alone.',
        'You are responsible for what happens under your account, including keeping your sign-in details private. Tell us straight away if you think someone else has your credentials.',
      ],
      bullets: [
        'One account per student.',
        'Accurate university and year, so your content is the right content.',
        'A working email address, because access and billing notices go there.',
      ],
    },
    {
      id: 'subscription',
      heading: 'Trial, subscription and payment',
      needsReview: true,
      paragraphs: [
        'New accounts start with a 3-day full-access trial. The trial is part of onboarding, not a product you buy, and it does not require a card.',
        'After the trial you can continue on a paid plan. Plans are sold in Egyptian pounds (EGP) and the current prices, periods and any active promotion are the ones shown on the pricing page at the moment you buy. A voucher and a promotion never stack: the lower valid price is applied.',
        'Paid access runs for the period you bought and does not renew by itself. When a period ends, membership features pause until you buy again; your own material stays attached to your account.',
        'Payments are taken by [PAYMENT PROCESSOR], which handles the card details — we do not store them. The payment terms, the processor and any applicable taxes still need to be confirmed before publication.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      paragraphs: [
        'Nishany only works if the question bank stays intact and the accounts stay individual. The rules below are the ones we actually enforce.',
        'If we see behaviour on this list we may limit features, suspend the account, or close it, depending on how serious it is.',
      ],
      bullets: [
        'Do not share your account, sell access to it, or sign in on behalf of somebody else.',
        'Do not scrape, bulk-download, screenshot systematically, or otherwise copy the question bank, the explanations or the library out of the platform.',
        'Do not republish, resell or redistribute Nishany content, in any format, including in private study groups and paid revision courses.',
        'Do not attempt to break, probe or overload the service, or to reach data that is not yours.',
        'Do not upload material you have no right to upload, and do not post anything abusive or unlawful in shared surfaces such as study rooms.',
      ],
    },
    {
      id: 'content-ownership',
      heading: 'Content and ownership',
      paragraphs: [
        'Nishany contains two kinds of material. Some of it is university teaching material — lecture content, past papers and prescribed sources — which stays the property of the university or the original author; Nishany organises and presents it, and does not claim to own it.',
        'The rest is Nishany\'s own work: the written questions and answer choices, the explanations, the concept map, the tagging, the flashcards and the software itself. That is ours, and your subscription is a personal licence to study with it, not a transfer of any rights in it.',
        'The licence lasts as long as your access does, is personal and non-transferable, and covers your own studying only.',
      ],
    },
    {
      id: 'your-content',
      heading: 'Your notes and uploads',
      paragraphs: [
        'Anything you make in Nishany — notes, whiteboards, highlights, bookmarks, plans, uploaded files — stays yours. We do not claim ownership of it and we do not sell it.',
        'To run the service we need permission to store it, back it up, and show it back to you on your devices, and to show it to anybody you deliberately share it with (a shared note link, a study room you join).',
        'You are responsible for what you upload: that you are allowed to upload it, and that it does not breach somebody else\'s rights.',
      ],
    },
    {
      id: 'medical-content',
      heading: 'Study material, not clinical advice',
      paragraphs: [
        'Everything in Nishany is educational material written to help you pass your exams. It is not clinical guidance and must not be used to make a decision about a real patient.',
        'We work to keep the content correct and we act on reported errors, but we cannot guarantee that every question, explanation or source is free of mistakes. Your course, your textbooks and your supervisors remain the authority.',
      ],
    },
    {
      id: 'availability',
      heading: 'Availability and changes to the service',
      needsReview: true,
      paragraphs: [
        'We aim to keep Nishany available continuously, but we do not promise uninterrupted service. Maintenance, upstream provider incidents and faults happen.',
        'Features are added, changed and occasionally retired. What we owe you when something you paid for is withdrawn mid-period — an equivalent feature, a partial refund, or neither — is [WITHDRAWN-FEATURE REMEDY TO CONFIRM], and nothing on this page should be read as a commitment to either until it is settled.',
      ],
    },
    {
      id: 'termination',
      heading: 'Suspension, closure and what happens to your data',
      paragraphs: [
        'You can stop using Nishany at any time, and you can ask us to close your account and delete your data by writing to ' + SUPPORT_ADDRESS + '.',
        'We may suspend or close an account that breaks the acceptable use rules, that is used fraudulently, or that we are required to act on by law. Where it is fair to do so we will warn you first and give you a chance to put it right.',
        'If we close your account for a breach, we are not obliged to refund the remaining period. If we close it for any other reason, we will refund the unused part.',
      ],
    },
    {
      id: 'liability',
      heading: 'Disclaimers and liability',
      needsReview: true,
      paragraphs: [
        'Nishany is provided as it is. We do not warrant that using it will produce any particular exam result.',
        'Nothing in these terms limits liability that cannot be limited by law. Subject to that, our total liability to you for any claim connected with the service is limited to the amount you paid us in the [LIABILITY PERIOD] before the claim arose.',
        'The exact wording of this section, and whether these limits are enforceable, depend on the governing law and have not been reviewed.',
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing law and disputes',
      needsReview: true,
      paragraphs: [
        'These terms are governed by the law of [JURISDICTION], and the courts of [COURTS / VENUE] have jurisdiction over any dispute about them.',
        'Before going to court, please write to us at ' + SUPPORT_ADDRESS + ' — most problems are a billing question or a content error and are resolved the same way.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      paragraphs: [
        'We may update these terms as the service changes or the law requires. The date at the top of this page is the date of the version you are reading.',
        'If a change materially affects you — pricing structure, refund mechanics, how your data is used — we will tell you by email or in the app before it takes effect. Continuing to use Nishany after that date means you accept the new version.',
      ],
    },
    {
      id: 'contact',
      heading: 'How to contact us',
      paragraphs: [
        'Questions about these terms go to ' + SUPPORT_ADDRESS + ', or through the contact page.',
      ],
    },
  ],
}

const PRIVACY: LegalPageContent = {
  slug: '/privacy',
  title: 'Privacy Policy',
  documentTitle: 'Privacy Policy · Nishany',
  description: 'What Nishany collects about you, why, who can see it, how long it is kept, and how to get a copy or ask for deletion.',
  updated: UPDATED,
  intro:
    'Nishany holds two things about you: who you are, and what you have studied. This page says what each of those is, why we need it, who else can see it, and what you can ask us to do with it.',
  sections: [
    {
      id: 'controller',
      heading: 'Who is responsible for your data',
      needsReview: true,
      paragraphs: [
        '[COMPANY LEGAL NAME], at [REGISTERED ADDRESS], decides how the data described here is used. Data protection questions go to ' + SUPPORT_ADDRESS + '.',
        'The legal entity, its address and any registration with a data protection authority still have to be confirmed.',
      ],
    },
    {
      id: 'what-we-collect',
      heading: 'What we collect',
      paragraphs: [
        'Account identity. Your email address and password are held by Supabase Auth, the sign-in service Nishany uses; the password is stored as a hash and is never visible to us. Alongside that we keep your display name, your university, your academic year, and whether your email is verified.',
        'Learning records. Everything you do in the study surfaces is stored against your verified account id: question attempts and their outcomes, timing, review scheduling, notes, whiteboards, highlights, bookmarks, plans, tasks and uploaded files.',
        'Devices and reminders. If you turn on reminders we store a push token for that device so a notification can reach it. Turning reminders off removes it.',
        'Technical records. Ordinary server logs — request times, IP address, browser and device type — kept for security and for finding faults.',
        'Payment records. What you bought, when, for how much, and the payment reference. Card numbers never reach Nishany; they are handled by the payment provider.',
      ],
    },
    {
      id: 'why',
      heading: 'Why we use it',
      paragraphs: [
        'Each of these has a purpose in running the service. We do not sell your data, and we do not use it for advertising.',
      ],
      bullets: [
        'To give you access to the right curriculum for your university and year.',
        'To keep your progress: to schedule reviews, draw your performance, and show your own notes back to you.',
        'To take payment and to keep the accounting records we are required to keep.',
        'To send the messages the service needs to send — verification, billing, and reminders you asked for.',
        'To keep the platform secure, to find bugs, and to detect account sharing and scraping.',
        'To understand, in aggregate, which content is working — for example that a question is misleading because most students get it wrong for the same reason.',
      ],
    },
    {
      id: 'who-sees',
      heading: 'Who can see it',
      needsReview: true,
      paragraphs: [
        'By default, only you and the small number of Nishany staff who need access to support and operate the service.',
        'The Question of the Day leaderboard is not anonymous. Other students in your university and year see your username and your profile icon on it, next to your position, your streak and how many of the daily questions you have answered correctly. There is no setting that takes you off that board today; whether one is added, and whether the board should show a name at all, is [LEADERBOARD OPT-OUT TO CONFIRM].',
        'Being findable by other students is separate, and it is opt-in: "Let classmates find me" on the Account page is off unless you turn it on, and it is what puts you in the directory of classmates in your university and year. A study room shows what you bring into it, to the people in it.',
        'Scholarship and payment status are private, and never appear in rankings, profiles or study rooms.',
        'We disclose data outside the service only where the law requires it, or to the providers listed below who process it on our behalf.',
      ],
    },
    {
      id: 'processors',
      heading: 'Services we rely on',
      needsReview: true,
      paragraphs: [
        'Supabase provides authentication and the database. [HOSTING PROVIDER] hosts the application. [PAYMENT PROCESSOR] handles payments. [EMAIL PROVIDER] delivers transactional email.',
        'Each of these only processes data in order to provide its part of the service. The named providers, their locations and the agreements with them still need confirming for publication.',
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      needsReview: true,
      paragraphs: [
        'While your account is open we keep your learning records, because they are what the service is for — removing your attempt history would erase your progress and your review schedule.',
        'After an account is closed, personal data is deleted within [RETENTION PERIOD — ACCOUNT CLOSURE]. Server logs are kept for [RETENTION PERIOD — LOGS]. Payment and invoice records are kept for [RETENTION PERIOD — FINANCIAL RECORDS] because accounting law requires it.',
        'Aggregated statistics that can no longer identify you — how a question performs across a cohort — are kept indefinitely. The retention periods above have not been set yet.',
      ],
    },
    {
      id: 'rights',
      heading: 'Your rights and choices',
      paragraphs: [
        'You can see and correct most of what we hold from inside the app: your profile and university details are on the Account page, and so is the export that gives you a copy of your own data.',
        'To have your account and its data deleted, write to ' + SUPPORT_ADDRESS + ' from the address on the account. Deletion is permanent — the notes, attempts and plans go with it.',
        'You can also object to a particular use, ask us to restrict processing, or complain to a data protection authority. Reminder notifications and opt-in social features can be switched off at any time without affecting the rest of your account.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies and local storage',
      paragraphs: [
        'Nishany does not use advertising or tracking cookies, and there is no third-party analytics tag on the student app.',
        'It does keep things in your browser\'s own storage so the app works and remembers you: the sign-in session, your language, your theme, and small preferences such as a dismissed notice or the last filter you used. This stays on your device.',
        'Clearing your browser storage signs you out and resets those preferences; it does not touch anything saved to your account.',
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      needsReview: true,
      paragraphs: [
        'Nishany is built for university medical students and is not intended for children. The minimum age for an account is [MINIMUM AGE] — a figure that depends on the governing law and is not set yet, and which no check at signup enforces today.',
        'If you believe a child has an account, write to ' + SUPPORT_ADDRESS + ' and we will remove it.',
      ],
    },
    {
      id: 'transfers',
      heading: 'Where your data is stored',
      needsReview: true,
      paragraphs: [
        'Data is stored in [DATA REGION], and may be processed by the providers above in other countries where they operate.',
        'The storage region and the safeguards that apply to any transfer out of it have not been confirmed.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      paragraphs: [
        'When this policy changes, the date at the top changes with it. If a change affects how your data is used in a way that matters, we will tell you in the app or by email rather than only editing this page.',
      ],
    },
  ],
}

const REFUND: LegalPageContent = {
  slug: '/refund-policy',
  title: 'Refund Policy',
  documentTitle: 'Refund Policy · Nishany',
  description: 'How refunds work at Nishany: the 14-day window, how to ask for one, what is excluded, and how long it takes.',
  updated: UPDATED,
  intro: REFUND_LINE,
  sections: [
    {
      id: 'window',
      heading: 'The refund window',
      needsReview: true,
      paragraphs: [
        REFUND_LINE,
        'The window runs from the moment a payment is taken, not from the day you first open the app. It applies to the purchase you are asking about, not to earlier ones.',
        'How the window interacts with a renewed or extended period, and whether it is offered more than once per account, still needs to be settled. Treat [REFUND WINDOW MECHANICS] as unconfirmed.',
      ],
    },
    {
      id: 'how-to-request',
      heading: 'How to ask for a refund',
      paragraphs: [
        'Write to ' + SUPPORT_ADDRESS + ' from the email address on the account, or use the contact page. There is no form to fill in and no reason you have to give.',
        'Tell us which payment you mean so we can find it quickly.',
      ],
      bullets: [
        'The email address on the account.',
        'The date of the payment and the amount.',
        'The payment reference from your receipt, if you still have it.',
      ],
    },
    {
      id: 'excluded',
      heading: 'What is not refundable',
      needsReview: true,
      paragraphs: [
        'Two of these follow from the published line itself. The rest are proposed, not policy: they are the exclusions we expect to apply, and they are marked so, because the only refund term Nishany has published is the 14-day window and the reference to abuse controls.',
      ],
      bullets: [
        'Requests made after the 14-day window has passed.',
        'The trial, because it is free and nothing was charged.',
        '[TO CONFIRM] Access bought with a voucher or a scholarship, to the extent nothing was paid for it.',
        '[TO CONFIRM] Accounts closed for breaking the acceptable use rules — account sharing, reselling access, or scraping the question bank.',
        '[TO CONFIRM] Repeat requests where the pattern is buy, use, refund, buy again.',
      ],
    },
    {
      id: 'timing',
      heading: 'How long it takes',
      needsReview: true,
      paragraphs: [
        'We answer refund requests within [SUPPORT RESPONSE TIME]. Once a refund is approved we send it back through the same payment method it came from.',
        'The money then takes [REFUND PROCESSING DAYS] to reach you, depending on your bank or card issuer — that part is outside our control.',
        'The response time and the processing time above have not been confirmed with the payment provider.',
      ],
    },
    {
      id: 'cancelling',
      heading: 'Cancelling without a refund',
      paragraphs: [
        'Access does not renew on its own, so there is nothing to cancel to avoid a future charge.',
        'If you are past the window, you keep access until the end of the period you paid for. Your notes, uploads, bookmarks and attempt history stay attached to your account after it ends, and are there again when you come back.',
      ],
    },
    {
      id: 'abuse',
      heading: 'Abuse controls',
      needsReview: true,
      paragraphs: [
        'The published line says the window is "subject to … abuse controls". This section is what we understand those controls to be, and it is a draft: what actually counts as abuse of the refund window, and what evidence is enough to refuse on it, is [ABUSE CONTROLS TO CONFIRM].',
        'The intent is settled even where the mechanics are not. The window exists so that a student who finds Nishany is not what they needed is not stuck with it, and not so that a term can be studied and then handed back.',
        '[TO CONFIRM] We expect to look at how an account was used before refunding, and to be able to refuse a request where the account was shared, where the content was bulk-downloaded, or where the same account has done this before.',
      ],
    },
    {
      id: 'contact',
      heading: 'Questions',
      paragraphs: [
        'Anything this page does not answer goes to ' + SUPPORT_ADDRESS + '.',
      ],
    },
  ],
}

const CONTACT: LegalPageContent = {
  slug: '/contact',
  title: 'Contact Us',
  documentTitle: 'Contact Us · Nishany',
  description: 'How to reach Nishany — the support inbox, what to include, and where to send billing, refund and privacy requests.',
  updated: UPDATED,
  intro:
    'One inbox handles everything: access problems, billing and refunds, content errors, privacy requests, and anything about your university or year. Write to us and a person reads it.',
  sections: [
    {
      id: 'email',
      heading: 'Email',
      paragraphs: [
        SUPPORT_ADDRESS + ' is the support address. Writing from the email address on your account is the fastest route, because we can find the account without asking you to prove anything.',
      ],
    },
    {
      id: 'what-to-include',
      heading: 'What to include',
      paragraphs: [
        'For most things, a sentence is enough. These few details save a round trip.',
      ],
      bullets: [
        'The email address on your account.',
        'Your university and academic year, if the question is about content.',
        'For a billing or refund question, the payment date, the amount and the reference.',
        'For a content error, the question or page it is on and what looks wrong.',
        'For a fault, what you did, what happened, and on what device or browser.',
      ],
    },
    {
      id: 'response',
      heading: 'When you will hear back',
      needsReview: true,
      paragraphs: [
        'Support is staffed [SUPPORT HOURS] and we aim to reply within [SUPPORT RESPONSE TIME].',
        'There is no published support phone number yet. If one is added it will be [SUPPORT PHONE]. The hours, the response time and the phone number are unconfirmed.',
      ],
    },
    {
      id: 'address',
      heading: 'Registered address',
      needsReview: true,
      paragraphs: [
        '[COMPANY LEGAL NAME], [REGISTERED ADDRESS].',
        'The legal entity and its registered address have not been confirmed for publication. Please use the email address above rather than writing to a postal address.',
      ],
    },
    {
      id: 'other-routes',
      heading: 'Refunds, privacy and account deletion',
      paragraphs: [
        'These all go to the same inbox, and each has its own page explaining what happens: the refund policy sets out the window and the exclusions, and the privacy policy covers exports, corrections and deletion.',
        'To have your account deleted, write from the address on the account and say so plainly. Deletion is permanent.',
      ],
    },
    {
      id: 'form',
      heading: 'Send us a message',
      paragraphs: [
        'Filling in the form below and choosing "Send message" delivers it straight to the support inbox.',
        'If it does not send, write to ' + SUPPORT_ADDRESS + ' directly instead.',
      ],
    },
  ],
}

/**
 * The accessibility statement.
 *
 * Part of `LEGAL_PAGES` / `LegalPageKey` like the other four: the admin's
 * `/admin/legal` override editor patches it the same way, and `LegalPage.tsx`
 * merges an override for it because `legalSlugOf('/accessibility')` resolves
 * to the `accessibility` slug in `src/data/legalPages.ts`'s `LEGAL_SLUGS`.
 */
export const ACCESSIBILITY: LegalPageContent = {
  slug: '/accessibility',
  title: 'Accessibility Statement',
  documentTitle: 'Accessibility Statement · Nishany',
  description: 'What Nishany does to be usable with assistive technology, what still falls short of that, and how to report a barrier.',
  updated: '2026-09-03',
  intro:
    'Nishany is built to be usable by every student who needs it, including students who use a screen reader, a keyboard alone, or a browser\'s own zoom and contrast settings. This page says what we target, where we currently fall short of it, and how to tell us about a barrier you hit.',
  sections: [
    {
      id: 'standard',
      heading: 'Conformance target',
      paragraphs: [
        'We target WCAG 2.1 level AA across the student site — the pages at nishany.com and the study application at /app.',
        'The current status is partially conformant: most of the interface meets that target, and the sections below name where it does not yet.',
      ],
    },
    {
      id: 'scope',
      heading: 'Scope',
      paragraphs: [
        'This statement covers the Nishany student site: the marketing pages, sign-in and sign-up, and the study application. It does not cover third-party content embedded inside it, such as an individual PDF a university has provided as a source.',
      ],
    },
    {
      id: 'limitations',
      heading: 'Known limitations',
      paragraphs: [
        'These are the areas we know fall short of AA today, and are working through in order of how many students they affect.',
      ],
      bullets: [
        'PDF reader annotations — highlighting and note-taking on an opened document are placed with a pointer and do not yet have a full keyboard or screen-reader equivalent.',
        'The whiteboard canvas — drawing and arranging objects on a whiteboard is a pointer-driven surface without a non-visual equivalent yet.',
        'Live study-room audio — voice study rooms have no live captioning.',
      ],
    },
    {
      id: 'feedback',
      heading: 'Reporting a barrier',
      paragraphs: [
        'If you hit a barrier that is not listed above, or one that is, tell us through the contact page and we will look at it. Include the page, what you were trying to do, and what assistive technology or browser setting you were using — that is usually enough for us to reproduce it.',
      ],
    },
  ],
}

export const LEGAL_PAGES: Record<LegalPageKey, LegalPageContent> = {
  terms: TERMS,
  privacy: PRIVACY,
  refund: REFUND,
  contact: CONTACT,
  accessibility: ACCESSIBILITY,
}

/**
 * The chrome around the document — headings, badges, form labels.
 *
 * These follow the *marketing* language (`c.lang`), not the student app's
 * `t()`: a legal page reached from `/ar` should be framed in Arabic even for a
 * reader whose in-app preference is English, and the reverse. The Arabic side
 * lives in `AR_LEGAL`, so all of this package's Arabic sits in one file.
 */
export function legalLabel(lang: 'ar' | 'en', en: string): string {
  return lang === 'ar' ? (AR_LEGAL[en] ?? en) : en
}
