/**
 * Conversion copy for Nishany's single-membership offer.
 *
 * Prices stay in the catalogue; this file only supplies the language around
 * them. Keeping the page bilingual as one typed document makes it difficult
 * for the Arabic route to lose a section when the English offer changes.
 */

import { findPlan, promoPrice, MARISTANA_PLAN_ID, type PlanCatalog } from '../../data/planCatalog.ts'
import { formatNumber } from '../../lib/pricing.ts'

/** The one shared last-resort constant on the frontend when the catalog document is empty. */
export const SEED_MARISTANA_PRICES = { month: 400, term: 1000 }

export interface PricingAmounts { month: number; term: number; savings: number; termMonthly: number }

/**
 * The Nishany price, promo included, that the whole pricing page shows.
 *
 * Reads the same catalog document the admin console edits, so a promo
 * toggled on in PlanCatalogEditor changes what this returns without a
 * second place to update. Falls back to the seed only when the catalog has
 * no maristana plan or no price for that period at all.
 */
export function offerAmounts(catalog: PlanCatalog): PricingAmounts {
  const plan = findPlan(catalog, MARISTANA_PLAN_ID)
  const month = (plan ? promoPrice(plan, 'month') : null) ?? SEED_MARISTANA_PRICES.month
  const term = (plan ? promoPrice(plan, 'term') : null) ?? SEED_MARISTANA_PRICES.term
  const savings = Math.max(0, month * 3 - term)
  const termMonthly = Math.round(term / 3)
  return { month, term, savings, termMonthly }
}

/** A copy field that is either fixed text or derived from the catalog's live price. */
export type Priced<T> = T | ((amounts: PricingAmounts) => T)

/** Resolve a `Priced<T>` field against the current amounts. */
export function resolvePriced<T>(value: Priced<T>, amounts: PricingAmounts): T {
  return typeof value === 'function' ? (value as (amounts: PricingAmounts) => T)(amounts) : value
}

export interface FaqItem {
  q: string
  a: Priced<string>
}

export interface PricingContent {
  path: string
  otherPath: string
  documentTitle: string
  metaDescription: Priced<string>
  breadcrumb: string
  navLabel: string
  teaser: {
    eyebrow: string
    title: string
    sub: Priced<string>
    termLabel: string
    termDetail: Priced<string>
    scholarship: string
    link: string
    cta: string
  }
  h1: string
  sub: string
  assurances: Priced<string[]>
  offer: {
    eyebrow: string
    title: string
    description: string
    month: string
    monthDetail: string
    term: string
    termDetail: string
    year: string
    yearDetail: string
    comingSoon: string
    currency: string
    save: string
    equivalent: string
    fullAccess: string
    cta: string
    unavailable: string
  }
  includedTitle: string
  includedSub: string
  included: { title: string; items: string[] }[]
  scholarship: {
    eyebrow: string
    title: string
    sub: string
    facts: string[]
    note: string
  }
  next: {
    title: string
    sub: string
    steps: { number: string; title: string; line: string }[]
  }
  faqTitle: string
  faqSub: string
  faq: FaqItem[]
  closingTitle: string
  closingSub: string
  closingPrimary: string
  closingSecondary: string
}

export const EN_PRICING: PricingContent = {
  path: '/pricing',
  otherPath: '/ar/pricing',
  documentTitle: 'Nishany pricing — One complete medical learning membership',
  metaDescription: (a) =>
    `One all-access medical study workspace for EGP ${formatNumber(a.month, 'en')} monthly or EGP ${formatNumber(a.term, 'en')} per academic term. Trial access is available during onboarding without buying a separate tier.`,
  breadcrumb: 'Home',
  navLabel: 'Pricing',
  teaser: {
    eyebrow: 'Simple by design',
    title: 'One Nishany. Choose your study window.',
    sub: (a) => `The whole platform is included for EGP ${formatNumber(a.month, 'en')} monthly or EGP ${formatNumber(a.term, 'en')} per term. Start in onboarding, then choose the time that fits your semester.`,
    termLabel: 'Academic term · 3 months',
    termDetail: (a) => `EGP ${formatNumber(a.term, 'en')} · save EGP ${formatNumber(a.savings, 'en')} · EGP ${formatNumber(a.termMonthly, 'en')}/month equivalent`,
    scholarship: 'Private 100%-off scholarships are available through your year representative or Student Union.',
    link: 'See pricing and scholarships',
    cta: 'Start studying',
  },
  h1: 'One Nishany. Choose your study window.',
  sub:
    'No feature gates and no plan comparison to decode. Your curriculum, Practice Suite, adaptive study, workspace, and study rooms are included together for one month or one academic term.',
  assurances: (a) => [
    `EGP ${formatNumber(a.month, 'en')} monthly`,
    `EGP ${formatNumber(a.term, 'en')} per term`,
    'Trial access is not a purchasable tier',
  ],
  offer: {
    eyebrow: 'Complete membership',
    title: 'Everything in Nishany',
    description: 'Pick a duration. The product does not change with the period you choose.',
    month: '1 month',
    monthDetail: 'A focused month of full access',
    term: 'Academic term',
    termDetail: '3 months of full access',
    year: 'Full year',
    yearDetail: 'A longer study window is on its way',
    comingSoon: 'Coming soon',
    currency: 'EGP',
    save: 'Save',
    equivalent: 'monthly equivalent',
    fullAccess: 'Full Nishany access for the selected period',
    cta: 'Start studying',
    unavailable: 'Yearly access is coming soon',
  },
  includedTitle: 'Everything included',
  includedSub: 'One membership follows the whole study cycle—from your university schedule to the concepts you still need to master.',
  included: [
    {
      title: 'Your curriculum',
      items: ['University and year schedule', 'Modules, exams, and finals', 'Personal calendar and daily plan'],
    },
    {
      title: 'Practice Suite',
      items: ['MCQs, cases, essays, labs, and imaging', 'OSCE candidate and examiner briefs', 'Virtual microscope, terminology, and minigames'],
    },
    {
      title: 'Adaptive study',
      items: ['Concept mastery beyond raw accuracy', 'Targeted review from flagged and weak material', 'Deep reports and anonymous cohort comparison'],
    },
    {
      title: 'Your workspace',
      items: ['Synced PDF reader and editor', 'Question notes, notebook, and Pomodoro', 'Whiteboards, mind maps, and shared notes'],
    },
    {
      title: 'Study together',
      items: ['Study buddies and shared tests', 'Study parties, rooms, and challenges', 'Private social discovery within your cohort'],
    },
    {
      title: 'Grow',
      items: ['A mini-maristana that grows as you study', 'Visible study progress without public identity', 'The same progress across your devices'],
    },
  ],
  scholarship: {
    eyebrow: 'Private scholarship route',
    title: 'Full access can be 100% covered.',
    sub:
      'Connect provides up to 200 scholarships per year, per university, for students who genuinely need them.',
    facts: [
      'Begin through your year representative or Student Union.',
      'Approved access uses a one-time, 100%-off code.',
      'Scholarship status is never shown in rankings, profiles, or social spaces.',
    ],
    note: 'Terms and availability apply. Nishany does not ask you to publish financial-need information.',
  },
  next: {
    title: 'What happens next',
    sub: 'See the product first. Paying is not part of starting onboarding.',
    steps: [
      { number: '01', title: 'Create your account', line: 'Choose your university and year so Nishany opens in the right curriculum.' },
      { number: '02', title: 'Start with all access', line: 'When trial access is available, it opens during onboarding without a card or a separate plan purchase.' },
      { number: '03', title: 'Choose after you have studied', line: 'Continue with one month or one academic term. The server quotes any valid promotion or voucher before payment.' },
    ],
  },
  faqTitle: 'Before you start',
  faqSub: 'Clear answers about access, privacy, and what happens after onboarding.',
  faq: [
    {
      q: 'What does the membership include?',
      a: 'All-access means the study surfaces available to your university and year: library, verified sources, question bank, explanations, practical learning, calendar, notebook, whiteboard, resources, analytics, and adaptive review.',
    },
    {
      q: 'How much does it cost?',
      a: (a) => `One month costs EGP ${formatNumber(a.month, 'en')}. One academic term costs EGP ${formatNumber(a.term, 'en')} for 3 months, saving EGP ${formatNumber(a.savings, 'en')} compared with three separate monthly windows.`,
    },
    {
      q: 'Do promotions and vouchers stack?',
      a: 'No. A timed admin promotion and a voucher can both be valid, but they are compared independently. The server applies the valid option that produces the lowest price.',
    },
    {
      q: 'Do I buy a trial?',
      a: 'No. Trial access is an onboarding state, not a plan in the catalogue and not something sold at checkout. When a trial is available, you start there and choose what to buy later.',
    },
    {
      q: 'Is my university supported?',
      a: 'Available university and year combinations appear during setup. Curriculum mapping expands cohort by cohort, so you only enter a scope that Nishany currently supports.',
    },
    {
      q: 'Who can see that I received a scholarship?',
      a: 'No other student can. Scholarship status is private and never appears in rankings, profiles, study rooms, or other social surfaces.',
    },
    {
      q: 'How do cancellations and refunds work?',
      a: 'You keep access until the end of the period you have already paid for. The published cancellation and refund terms for paid access will be shown during checkout before any payment is confirmed.',
    },
    {
      q: 'What happens to my notes and uploads after paid access expires?',
      a: 'They remain attached to your account. Notes, whiteboards, bookmarks, annotations, and uploaded files remain yours while full membership features pause until you reactivate access.',
    },
    {
      q: 'Is any of this clinical guidance?',
      a: 'No. Nishany is a study tool for undergraduate medical education. Nothing in the library, question bank, or practicals is clinical guidance.',
    },
    {
      q: 'When will the full-year option be available?',
      a: 'It is coming soon. We will publish the price only when yearly access is ready to buy; there is no placeholder price or working checkout today.',
    },
  ],
  closingTitle: 'Start with all access.',
  closingSub: 'Choose monthly or term access after onboarding. Any valid promotion or voucher is quoted by the server before payment.',
  closingPrimary: 'Start studying',
  closingSecondary: 'Sign in',
}

export const AR_PRICING: PricingContent = {
  path: '/ar/pricing',
  otherPath: '/pricing',
  documentTitle: 'أسعار نيشاني — عضوية واحدة متكاملة لتعلّم الطب',
  metaDescription: (a) =>
    `مساحة مذاكرة طبية كاملة في نيشاني بسعر ${formatNumber(a.month, 'ar')} ج.م شهريًا أو ${formatNumber(a.term, 'ar')} ج.م للفصل الدراسي. الوصول التجريبي حالة بدء وليس خطة منفصلة للشراء.`,
  breadcrumb: 'الرئيسية',
  navLabel: 'الأسعار',
  teaser: {
    eyebrow: 'بساطة مقصودة',
    title: 'نيشاني واحدة. اختر مدة مذاكرتك.',
    sub: (a) => `كل المنصة مشمولة مقابل ${formatNumber(a.month, 'ar')} ج.م شهريًا أو ${formatNumber(a.term, 'ar')} ج.م للفصل. ابدأ من الإعداد، ثم اختر المدة التي تناسب فصلك الدراسي.`,
    termLabel: 'فصل دراسي · ٣ أشهر',
    termDetail: (a) => `${formatNumber(a.term, 'ar')} ج.م · وفّر ${formatNumber(a.savings, 'ar')} ج.م · ما يعادل ${formatNumber(a.termMonthly, 'ar')} ج.م شهريًا`,
    scholarship: 'تتوفر منح خاصة بخصم ١٠٠٪ من خلال ممثل دفعتك أو اتحاد الطلاب.',
    link: 'اطّلع على الأسعار والمنح',
    cta: 'ابدأ المذاكرة',
  },
  h1: 'نيشاني واحدة. اختر مدة مذاكرتك.',
  sub:
    'لا خصائص محجوبة ولا جداول خطط تحتاج إلى فكّها. منهجك ومجموعة التدريب والمذاكرة التكيّفية ومساحة عملك وغرف الدراسة كلها مشمولة معًا لشهر واحد أو فصل دراسي.',
  assurances: (a) => [
    `${formatNumber(a.month, 'ar')} ج.م شهريًا`,
    `${formatNumber(a.term, 'ar')} ج.م للفصل`,
    'التجربة ليست خطة تُشترى',
  ],
  offer: {
    eyebrow: 'عضوية متكاملة',
    title: 'كل ما في نيشاني',
    description: 'اختر المدة فقط. المنتج لا يتغيّر بتغيّر الفترة التي تختارها.',
    month: 'شهر واحد',
    monthDetail: 'شهر مركّز بوصول كامل',
    term: 'فصل دراسي',
    termDetail: '٣ أشهر بوصول كامل',
    year: 'سنة كاملة',
    yearDetail: 'مدة أطول للمذاكرة في الطريق',
    comingSoon: 'قريبًا',
    currency: 'ج.م',
    save: 'وفّر',
    equivalent: 'ما يعادل شهريًا',
    fullAccess: 'وصول نيشاني الكامل طوال المدة المختارة',
    cta: 'ابدأ المذاكرة',
    unavailable: 'الوصول السنوي قريبًا',
  },
  includedTitle: 'كل شيء مشمول',
  includedSub: 'عضوية واحدة تتابع دورة المذاكرة كاملة—من جدول جامعتك إلى المفاهيم التي ما زالت تحتاج إلى إتقانها.',
  included: [
    {
      title: 'منهجك',
      items: ['جدول الجامعة والسنة الدراسية', 'الوحدات والاختبارات والنهائيات', 'تقويمك الشخصي وخطة اليوم'],
    },
    {
      title: 'مجموعة التدريب',
      items: ['اختيار من متعدد وحالات ومقالي ومعامل وأشعة', 'تعليمات المرشح والممتحن في محطات OSCE', 'ميكروسكوب افتراضي ومصطلحات وألعاب قصيرة'],
    },
    {
      title: 'المذاكرة التكيّفية',
      items: ['إتقان المفاهيم أبعد من نسبة الإجابات الصحيحة', 'مراجعة موجّهة لما أشّرت عليه وما لم يثبت بعد', 'تقارير عميقة ومقارنة مجهولة مع الدفعة'],
    },
    {
      title: 'مساحة عملك',
      items: ['قارئ ومحرّر PDF متزامن', 'ملاحظات الأسئلة والدفتر ومؤقت بومودورو', 'سبورات وخرائط ذهنية وملاحظات مشتركة'],
    },
    {
      title: 'ذاكر مع غيرك',
      items: ['زملاء مذاكرة واختبارات مشتركة', 'جلسات وغرف وتحديات دراسية', 'اكتشاف خاص للزملاء داخل دفعتك'],
    },
    {
      title: 'Grow',
      items: ['مارستانا مصغّرة تنمو كلما ذاكرت', 'تقدّم دراسي ظاهر دون كشف هويتك', 'نفس التقدّم على أجهزتك المختلفة'],
    },
  ],
  scholarship: {
    eyebrow: 'مسار منح يحفظ الخصوصية',
    title: 'قد تُغطّى التكلفة كاملة بنسبة ١٠٠٪.',
    sub:
      'توفّر Connect ما يصل إلى ٢٠٠ منحة سنويًا لكل جامعة للطلاب الذين يحتاجون إليها فعلًا.',
    facts: [
      'ابدأ من خلال ممثل دفعتك أو اتحاد الطلاب.',
      'الوصول المقبول يتم بكود استخدام واحد بخصم ١٠٠٪.',
      'لا تظهر حالة المنحة في الترتيب أو الملف الشخصي أو المساحات الاجتماعية.',
    ],
    note: 'تُطبّق الشروط والتوافر. لا تطلب نيشاني منك نشر معلومات عن احتياجك المادي.',
  },
  next: {
    title: 'ماذا يحدث بعد ذلك؟',
    sub: 'جرّب المنتج أولًا. الدفع ليس جزءًا من بدء الإعداد.',
    steps: [
      { number: '٠١', title: 'أنشئ حسابك', line: 'اختر جامعتك وسنتك لتفتح نيشاني على المنهج الصحيح.' },
      { number: '٠٢', title: 'ابدأ بوصول كامل', line: 'عند توفر الوصول التجريبي، يبدأ أثناء الإعداد دون بطاقة أو شراء خطة منفصلة.' },
      { number: '٠٣', title: 'اختر بعد أن تذاكر', line: 'واصل بشهر واحد أو فصل دراسي. أي عرض أو قسيمة صالحة تُسعَّر من الخادم قبل الدفع.' },
    ],
  },
  faqTitle: 'قبل أن تبدأ',
  faqSub: 'إجابات واضحة عن الوصول والخصوصية وما يحدث بعد الإعداد.',
  faq: [
    {
      q: 'ماذا تتضمن العضوية؟',
      a: 'الوصول الكامل يعني مساحات المذاكرة المتاحة لجامعتك وسنتك: المكتبة، المصادر، بنك الأسئلة، الشروح، العملي، التقويم، الملاحظات، السبورة، الموارد، التحليلات والمراجعة التكيّفية.',
    },
    {
      q: 'كم السعر؟',
      a: (a) => `الشهر الواحد ${formatNumber(a.month, 'ar')} ج.م. الفصل الدراسي ${formatNumber(a.term, 'ar')} ج.م لمدة ٣ أشهر، أي يوفر ${formatNumber(a.savings, 'ar')} ج.م مقارنة بثلاث مدد شهرية منفصلة.`,
    },
    {
      q: 'هل تتراكم العروض والقسائم؟',
      a: 'لا. قد يكون العرض والقسيمة صالحين في الوقت نفسه، لكنهما يُقارنان مستقلين. يطبّق الخادم الخيار الصالح الذي يعطي أقل سعر.',
    },
    {
      q: 'هل أشتري التجربة؟',
      a: 'لا. الوصول التجريبي حالة بدء، وليس خطة في الكتالوج ولا شيئًا يُباع عند الدفع. عند إتاحته تبدأ به ثم تختار ما تشتريه لاحقًا.',
    },
    {
      q: 'هل جامعتي مدعومة؟',
      a: 'تظهر الجامعات والسنوات المتاحة أثناء الإعداد. يتوسع ربط المناهج دفعة بعد دفعة، لذلك لن تدخل إلا نطاقًا تدعمه نيشاني حاليًا.',
    },
    {
      q: 'من يستطيع معرفة أنني حصلت على منحة؟',
      a: 'لا يراها أي طالب آخر. حالة المنحة خاصة ولا تظهر في الترتيب أو الملف الشخصي أو غرف الدراسة أو أي مساحة اجتماعية.',
    },
    {
      q: 'كيف يعمل الإلغاء والاسترداد؟',
      a: 'يبقى وصولك حتى نهاية المدة المدفوعة بالفعل. وستظهر سياسة الإلغاء والاسترداد المنشورة للوصول المدفوع أثناء الدفع قبل تأكيد أي عملية.',
    },
    {
      q: 'ماذا يحدث لملاحظاتي وملفاتي بعد انتهاء الوصول المدفوع؟',
      a: 'تظل مرتبطة بحسابك. الملاحظات والسبورات والإشارات والتعليقات والملفات التي رفعتها تظل ملكك بينما تتوقف خصائص العضوية الكاملة حتى تعيد تفعيل الوصول.',
    },
    {
      q: 'هل أي من هذا إرشاد سريري؟',
      a: 'لا. نيشاني أداة مذاكرة للتعليم الطبي الجامعي. لا شيء في المكتبة أو بنك الأسئلة أو العملي يُعدّ إرشادًا سريريًا.',
    },
    {
      q: 'متى تتوفر مدة السنة الكاملة؟',
      a: 'ستتوفر قريبًا. لن ننشر سعرًا إلا عندما يصبح الوصول السنوي جاهزًا للشراء؛ لا يوجد سعر افتراضي أو صفحة دفع عاملة حاليًا.',
    },
  ],
  closingTitle: 'ابدأ بالوصول الكامل.',
  closingSub: 'اختر شهرًا أو فصلًا بعد بدء الحساب. أي عرض أو قسيمة صالحة تُسعَّر من الخادم قبل الدفع.',
  closingPrimary: 'ابدأ المذاكرة',
  closingSecondary: 'تسجيل الدخول',
}

export function pricingFor(lang: 'ar' | 'en'): PricingContent {
  return lang === 'ar' ? AR_PRICING : EN_PRICING
}
