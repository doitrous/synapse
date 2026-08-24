/**
 * Conversion copy for Maristana's single-membership offer.
 *
 * Prices stay in the catalogue; this file only supplies the language around
 * them. Keeping the page bilingual as one typed document makes it difficult
 * for the Arabic route to lose a section when the English offer changes.
 */

export interface FaqItem {
  q: string
  a: string
}

export interface PricingContent {
  path: string
  otherPath: string
  documentTitle: string
  metaDescription: string
  breadcrumb: string
  navLabel: string
  teaser: {
    eyebrow: string
    title: string
    sub: string
    termLabel: string
    termDetail: string
    scholarship: string
    link: string
    cta: string
  }
  h1: string
  sub: string
  assurances: string[]
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
  documentTitle: 'Maristana pricing — One complete medical learning membership',
  metaDescription:
    'Choose one month or one academic term of complete Maristana access. Start with 3 full days, no card, then keep a free daily sampler.',
  breadcrumb: 'Home',
  navLabel: 'Pricing',
  teaser: {
    eyebrow: 'Simple by design',
    title: 'One Maristana. Choose your study window.',
    sub: 'The whole platform is included. Start with 3 full days, no card, then choose the time that fits your semester.',
    termLabel: 'Academic term · 3 months',
    termDetail: 'Save EGP 200 · EGP 333/month equivalent',
    scholarship: 'Private 100%-off scholarships are available through your year representative or Student Union.',
    link: 'See pricing and scholarships',
    cta: 'Start 3 days free',
  },
  h1: 'One Maristana. Choose your study window.',
  sub:
    'No feature gates and no plan comparison to decode. Your curriculum, Practice Suite, adaptive study, workspace, and study rooms are included together.',
  assurances: [
    'Full access for 3 days',
    'No card to start',
    'Free daily sampler after the trial',
  ],
  offer: {
    eyebrow: 'Complete membership',
    title: 'Everything in Maristana',
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
    fullAccess: 'Full Maristana access for the selected period',
    cta: 'Start 3 days free',
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
      'Connect Academy provides up to 200 scholarships per year, per university, for students who genuinely need them.',
    facts: [
      'Begin through your year representative or Student Union.',
      'Approved access uses a one-time, 100%-off code.',
      'Scholarship status is never shown in rankings, profiles, or social spaces.',
    ],
    note: 'Terms and availability apply. Maristana does not ask you to publish financial-need information.',
  },
  next: {
    title: 'What happens next',
    sub: 'See the product first. Paying is not part of starting the trial.',
    steps: [
      { number: '01', title: 'Create your account', line: 'Choose your university and year so Maristana opens in the right curriculum.' },
      { number: '02', title: 'Use everything for 3 days', line: 'No card. Explore the full platform with your real study scope.' },
      { number: '03', title: 'Choose after you have studied', line: 'Continue with a study window, or keep the diagnostic and 10 questions a day for free.' },
    ],
  },
  faqTitle: 'Before you start',
  faqSub: 'Clear answers about access, privacy, and what happens after the trial.',
  faq: [
    {
      q: 'What happens when the 3-day trial ends?',
      a: 'You are not charged. Full access closes and your account moves to the permanent free sampler: diagnostic access and 10 questions per day. Your work remains in your account.',
    },
    {
      q: 'How long is an academic term?',
      a: 'The academic-term window is 3 months from activation. It costs EGP 1,000, saving EGP 200 compared with three separate monthly windows.',
    },
    {
      q: 'Does the trial or membership renew automatically?',
      a: 'The no-card trial cannot renew or charge you. When hosted payment opens, the checkout will show the selected access window, final EGP amount, and renewal terms before you pay.',
    },
    {
      q: 'Is my university supported?',
      a: 'Available university and year combinations appear during setup. Curriculum mapping expands cohort by cohort, so you only enter a scope that Maristana currently supports.',
    },
    {
      q: 'Who can see that I received a scholarship?',
      a: 'No other student can. Scholarship status is private and never appears in rankings, profiles, study rooms, or other social surfaces.',
    },
    {
      q: 'How do cancellations and refunds work?',
      a: 'The trial needs no cancellation because it takes no card. The published cancellation and refund terms for paid access will be shown during checkout before any payment is confirmed.',
    },
    {
      q: 'What happens to my notes and uploads after paid access expires?',
      a: 'They remain attached to your account. The free sampler keeps your learning history available while full membership features pause until you reactivate access.',
    },
    {
      q: 'When will the full-year option be available?',
      a: 'It is coming soon. We will publish the price only when yearly access is ready to buy; there is no placeholder price or working checkout today.',
    },
  ],
  closingTitle: 'Start with the product, not a payment form.',
  closingSub: 'Three full days of Maristana. No card, and nothing is charged when the trial ends.',
  closingPrimary: 'Start 3 days free',
  closingSecondary: 'Sign in',
}

export const AR_PRICING: PricingContent = {
  path: '/ar/pricing',
  otherPath: '/pricing',
  documentTitle: 'أسعار Maristana — عضوية واحدة متكاملة لتعلّم الطب',
  metaDescription:
    'اختر شهرًا أو فصلًا دراسيًا كاملًا في Maristana. ابدأ بثلاثة أيام كاملة دون بطاقة، ثم احتفظ بعينة يومية مجانية.',
  breadcrumb: 'الرئيسية',
  navLabel: 'الأسعار',
  teaser: {
    eyebrow: 'بساطة مقصودة',
    title: 'Maristana واحدة. اختر مدة مذاكرتك.',
    sub: 'كل المنصة مشمولة. ابدأ بثلاثة أيام كاملة دون بطاقة، ثم اختر المدة التي تناسب فصلك الدراسي.',
    termLabel: 'فصل دراسي · ٣ أشهر',
    termDetail: 'وفّر ٢٠٠ ج.م · ما يعادل ٣٣٣ ج.م شهريًا',
    scholarship: 'تتوفر منح خاصة بخصم ١٠٠٪ من خلال ممثل دفعتك أو اتحاد الطلاب.',
    link: 'اطّلع على الأسعار والمنح',
    cta: 'ابدأ ٣ أيام مجانًا',
  },
  h1: 'Maristana واحدة. اختر مدة مذاكرتك.',
  sub:
    'لا خصائص محجوبة ولا جداول خطط تحتاج إلى فكّها. منهجك ومجموعة التدريب والمذاكرة التكيّفية ومساحة عملك وغرف الدراسة كلها مشمولة معًا.',
  assurances: [
    'وصول كامل لمدة ٣ أيام',
    'دون بطاقة للبدء',
    'عينة يومية مجانية بعد التجربة',
  ],
  offer: {
    eyebrow: 'عضوية متكاملة',
    title: 'كل ما في Maristana',
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
    fullAccess: 'وصول Maristana الكامل طوال المدة المختارة',
    cta: 'ابدأ ٣ أيام مجانًا',
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
      'توفّر Connect Academy ما يصل إلى ٢٠٠ منحة سنويًا لكل جامعة للطلاب الذين يحتاجون إليها فعلًا.',
    facts: [
      'ابدأ من خلال ممثل دفعتك أو اتحاد الطلاب.',
      'الوصول المقبول يتم بكود استخدام واحد بخصم ١٠٠٪.',
      'لا تظهر حالة المنحة في الترتيب أو الملف الشخصي أو المساحات الاجتماعية.',
    ],
    note: 'تُطبّق الشروط والتوافر. لا تطلب Maristana منك نشر معلومات عن احتياجك المادي.',
  },
  next: {
    title: 'ماذا يحدث بعد ذلك؟',
    sub: 'جرّب المنتج أولًا. الدفع ليس جزءًا من بدء التجربة.',
    steps: [
      { number: '٠١', title: 'أنشئ حسابك', line: 'اختر جامعتك وسنتك لتفتح Maristana على المنهج الصحيح.' },
      { number: '٠٢', title: 'استخدم كل شيء ٣ أيام', line: 'دون بطاقة. استكشف المنصة كاملة داخل نطاق مذاكرتك الحقيقي.' },
      { number: '٠٣', title: 'اختر بعد أن تذاكر', line: 'واصل بمدة مدفوعة، أو احتفظ بالتشخيص و١٠ أسئلة يوميًا مجانًا.' },
    ],
  },
  faqTitle: 'قبل أن تبدأ',
  faqSub: 'إجابات واضحة عن الوصول والخصوصية وما يحدث بعد التجربة.',
  faq: [
    {
      q: 'ماذا يحدث عند انتهاء تجربة الأيام الثلاثة؟',
      a: 'لن تُحصّل منك أي مبالغ. ينتهي الوصول الكامل وينتقل حسابك إلى العينة المجانية الدائمة: وصول تشخيصي و١٠ أسئلة يوميًا. ويبقى عملك محفوظًا في حسابك.',
    },
    {
      q: 'ما مدة الفصل الدراسي؟',
      a: 'مدة الفصل الدراسي ٣ أشهر من تاريخ التفعيل. تكلف ١٬٠٠٠ ج.م، وتوفّر ٢٠٠ ج.م مقارنة بثلاث مدد شهرية منفصلة.',
    },
    {
      q: 'هل تتجدد التجربة أو العضوية تلقائيًا؟',
      a: 'تجربة دون بطاقة لا يمكن أن تتجدد أو تحصّل منك مبلغًا. وعند فتح الدفع المستضاف سيعرض لك صفحة الدفع المدة المختارة والمبلغ النهائي بالجنيه وشروط التجديد قبل أن تدفع.',
    },
    {
      q: 'هل جامعتي مدعومة؟',
      a: 'تظهر الجامعات والسنوات المتاحة أثناء الإعداد. يتوسع ربط المناهج دفعة بعد دفعة، لذلك لن تدخل إلا نطاقًا تدعمه Maristana حاليًا.',
    },
    {
      q: 'من يستطيع معرفة أنني حصلت على منحة؟',
      a: 'لا يراها أي طالب آخر. حالة المنحة خاصة ولا تظهر في الترتيب أو الملف الشخصي أو غرف الدراسة أو أي مساحة اجتماعية.',
    },
    {
      q: 'كيف يعمل الإلغاء والاسترداد؟',
      a: 'لا تحتاج التجربة إلى إلغاء لأنها لا تطلب بطاقة. وستظهر سياسة الإلغاء والاسترداد المنشورة للوصول المدفوع أثناء الدفع قبل تأكيد أي عملية.',
    },
    {
      q: 'ماذا يحدث لملاحظاتي وملفاتي بعد انتهاء الوصول المدفوع؟',
      a: 'تظل مرتبطة بحسابك. وتحافظ العينة المجانية على سجل تعلّمك بينما تتوقف خصائص العضوية الكاملة حتى تعيد تفعيل الوصول.',
    },
    {
      q: 'متى تتوفر مدة السنة الكاملة؟',
      a: 'ستتوفر قريبًا. لن ننشر سعرًا إلا عندما يصبح الوصول السنوي جاهزًا للشراء؛ لا يوجد سعر افتراضي أو صفحة دفع عاملة حاليًا.',
    },
  ],
  closingTitle: 'ابدأ بالمنتج، لا بنموذج دفع.',
  closingSub: 'ثلاثة أيام كاملة في Maristana. دون بطاقة، ولن تُحصّل منك أي مبالغ عند انتهائها.',
  closingPrimary: 'ابدأ ٣ أيام مجانًا',
  closingSecondary: 'تسجيل الدخول',
}

export function pricingFor(lang: 'ar' | 'en'): PricingContent {
  return lang === 'ar' ? AR_PRICING : EN_PRICING
}
