export type LandingLanguage = 'en' | 'ar'

/**
 * Copy for the marketing landing page, both languages.
 *
 * The page is deliberately small — six blocks — after the crowded ten-section
 * layout tested heavy: the word's own meaning as the hero artwork, three
 * steps, one product surface, pricing in a line, and a close. Anything that
 * needs more room (plan details, feature tours) lives on the pricing page or
 * inside the product itself.
 */
export interface NishanyLandingCopy {
  lang: LandingLanguage
  nav: { why: string; menu: string; close: string; start: string }
  hero: {
    /** The brand word itself — always Arabic script, on both pages. */
    word: string
    /** Latin pronunciation, set in mono beside the word. */
    pron: string
    /** The dictionary-style meaning line the artwork illustrates. */
    gloss: string
    title: string
    body: string
    primary: string
    trust: string
  }
  today: {
    title: string
    university: string
    date: string
    institution: string
    personal: string
    next: string
    module: string
    institutionTime: string
    personalTime: string
    nextTime: string
  }
  steps: { k: string; title: string; line: string }[]
  proof: {
    eyebrow: string
    title: string
    body: string
    university: string
    year: string
    ready: string
  }
  pricing: { title: string; sub: string; cta: string }
  close: { title: string; sub: string; button: string }
  footer: string
}

export const NISHANY_EN: NishanyLandingCopy = {
  lang: 'en',
  nav: {
    why: 'Why Nishany',
    menu: 'Open menu',
    close: 'Close menu',
    start: 'Start 3 days free',
  },
  hero: {
    word: 'نيشاني',
    pron: '/ni·shaa·ni/',
    gloss: '“my target.”',
    title: 'Medical school, right on target.',
    body: 'Nishany is built around your university’s own curriculum — clinical questions, OSCE stations, and a plan that points at exactly what to study next.',
    primary: 'Start 3 days free',
    trust: 'Full access for 3 days. No card.',
  },
  today: {
    title: 'Today in Nishany',
    university: 'Kasr Al Ainy · Year 2',
    date: 'Monday · 19 October',
    institution: 'University session',
    personal: 'Your study block',
    next: 'Recommended next',
    module: 'Cardiovascular block · Heart failure',
    institutionTime: '10:00–11:30',
    personalTime: '18:30–19:15',
    nextTime: '12 min',
  },
  steps: [
    { k: '01', title: 'Your year is already loaded', line: 'Choose your university and year once. The curriculum, sessions and exam windows arrive already arranged.' },
    { k: '02', title: 'Practise the way you’re examined', line: 'Clinical questions, cases and OSCE stations — every answer explained back to its source.' },
    { k: '03', title: 'Always know what’s next', line: 'Nishany tracks what is settling and points at the one thing worth your attention today.' },
  ],
  proof: {
    eyebrow: 'One calm workspace',
    title: 'Begin inside your actual year — not another search box.',
    body: 'Pick your university and year, and today’s plan is waiting: your university’s sessions, your own study blocks, and one recommended next step.',
    university: 'Kasr Al Ainy',
    year: 'Year 2',
    ready: 'Scope ready',
  },
  pricing: {
    title: 'One membership. EGP 1,000 a term.',
    sub: 'Starts with 3 days free · up to 200 scholarships per university, each year.',
    cta: 'See pricing',
  },
  close: {
    title: 'Start your first 3 days.',
    sub: 'Full access from the first minute. No card.',
    button: 'Start 3 days free',
  },
  footer: 'Nishany by Connect · Undergraduate medical learning, built in Egypt.',
}

export const NISHANY_AR: NishanyLandingCopy = {
  lang: 'ar',
  nav: {
    why: 'لماذا نيشاني',
    menu: 'افتح القائمة',
    close: 'أغلق القائمة',
    start: 'ابدأ ٣ أيام مجانًا',
  },
  hero: {
    word: 'نيشاني',
    pron: 'nishany',
    gloss: 'بالمصري — يعني: «هدفي».',
    title: 'مذاكرة الطب، في قلب الهدف.',
    body: 'نيشاني مبنية حول منهج جامعتك نفسه — أسئلة سريرية ومحطات OSCE وخطة تشير بالضبط إلى ما تذاكره تاليًا.',
    primary: 'ابدأ ٣ أيام مجانًا',
    trust: 'وصول كامل لمدة ٣ أيام. من دون بطاقة.',
  },
  today: {
    title: 'اليوم في نيشاني',
    university: 'قصر العيني · السنة الثانية',
    date: 'الاثنين · ١٩ أكتوبر',
    institution: 'جلسة الجامعة',
    personal: 'وقت مذاكرتك',
    next: 'المقترح التالي',
    module: 'وحدة القلب والأوعية · فشل القلب',
    institutionTime: '١٠:٠٠–١١:٣٠',
    personalTime: '١٨:٣٠–١٩:١٥',
    nextTime: '١٢ دقيقة',
  },
  steps: [
    { k: '٠١', title: 'سنتك جاهزة بالفعل', line: 'اختر جامعتك وسنتك مرة واحدة. يصل المنهج والجلسات ومواعيد الامتحانات مرتّبة بالفعل.' },
    { k: '٠٢', title: 'تدرّب كما تُمتحن', line: 'أسئلة سريرية وحالات ومحطات OSCE — وكل إجابة مشروحة حتى مصدرها.' },
    { k: '٠٣', title: 'اعرف دائمًا ما التالي', line: 'تتابع نيشاني ما يثبت لديك وتشير إلى الشيء الوحيد الذي يستحق انتباهك اليوم.' },
  ],
  proof: {
    eyebrow: 'مساحة واحدة هادئة',
    title: 'ابدأ من سنتك الفعلية — لا من مربع بحث جديد.',
    body: 'اختر جامعتك وسنتك، وستجد خطة اليوم في انتظارك: جلسات جامعتك، وأوقات مذاكرتك، وخطوة تالية واحدة مقترحة.',
    university: 'قصر العيني',
    year: 'السنة الثانية',
    ready: 'النطاق جاهز',
  },
  pricing: {
    title: 'عضوية واحدة. ١٬٠٠٠ ج.م في الفصل.',
    sub: 'تبدأ بـ ٣ أيام مجانًا · وحتى ٢٠٠ منحة لكل جامعة سنويًا.',
    cta: 'شاهد الأسعار',
  },
  close: {
    title: 'ابدأ أول ٣ أيام.',
    sub: 'وصول كامل من الدقيقة الأولى. من دون بطاقة.',
    button: 'ابدأ ٣ أيام مجانًا',
  },
  footer: 'نيشاني من Connect · تعلّم طبي جامعي، مبني في مصر.',
}

export function nishanyCopy(lang: LandingLanguage): NishanyLandingCopy {
  return lang === 'ar' ? NISHANY_AR : NISHANY_EN
}
