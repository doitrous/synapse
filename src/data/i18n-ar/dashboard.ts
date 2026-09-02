/**
 * Arabic for Dashboard (WP6).
 *
 * Owned by that package alone — every package writes only its own file, so two
 * agents adding strings on the same day cannot collide in `i18n-ar.ts`.
 *
 * Only the Study rhythm panel's Question of the Day tile is new here; the rest
 * of the dashboard's strings were already translated in `i18n-ar.ts` and in
 * `shell.ts` ("Question of the Day", "Loading").
 */
export const AR_DASHBOARD: Record<string, string> = {
  'day streak': 'يوم متتالٍ',
  Answered: 'تمت الإجابة',
  // The tile's button: "answer" before today's question is done, "review"
  // after. Keyed off "Answer now" rather than a bare "Answer" — these files
  // merge into one app-wide dictionary, and `t('Answer')` is also the noun
  // heading on the flashcard answer face, where the imperative "أجب" would be
  // wrong.
  'Answer now': 'أجب الآن',
  Review: 'راجع',
  'Answer today’s question': 'أجب عن سؤال اليوم',

  // ---- Next step card, today's target (WP15 Arabic sweep)
  'Your next step': 'خطوتك التالية',
  'Start now': 'ابدأ الآن',
  'Then': 'ثم',
  'Tick it off': 'علّمها كمنجزة',
  'Next action': 'الخطوة التالية',
  'Today, weighted the way this paper is marked.': 'اليوم، موزونة بالطريقة التي يُصحَّح بها هذا الامتحان.',
  'Going back over everything — no new material this close to the paper.':
    'مراجعة شاملة — لا مادة جديدة في هذا القرب من الامتحان.',
  'of today\'s blocks are done': 'من فترات اليوم مكتملة',
  'Everything else lives one click away': 'كل ما عدا ذلك على بُعد نقرة واحدة',
  'Start a question block': 'ابدأ فترة أسئلة',
  'Open the question bank': 'افتح بنك الأسئلة',
  'Plan a study block': 'خطّط فترة مذاكرة',
  'Browse resources': 'تصفَّح المصادر',
  'full schedule': 'الجدول الكامل',
  'performance': 'الأداء',
  'review queue': 'قائمة المراجعة',

  // ---- The day strip (WP17)
  // "Streak", "day", "days", "of", "Nothing due" and the greetings are already
  // translated — app-wide in `i18n-ar.ts`, or in `plan.ts`/`revise.ts`, which
  // merge into the same dictionary ahead of this file. Only the two labels the
  // strip invents are new here.
  'Reviews due today': 'مراجعات مستحقة اليوم',
  'Today\'s blocks done': 'فترات اليوم المكتملة',

  // ---- Study rhythm panel and its captions
  'Study rhythm': 'إيقاع المذاكرة',
  'Questions answered per day · last 17 weeks': 'الأسئلة المُجابة يوميًا · آخر 17 أسبوعًا',
  'Nothing answered yet — every question you work through fills a square.':
    'لم تُجِب عن شيء بعد — كل سؤال تحلّه يملأ مربعًا.',
  'You\'ve answered': 'أجبت عن',
  'answers': 'إجابات',
  'Avg. session': 'متوسط الجلسة',
  'Last 6 months': 'آخر 6 أشهر',
  'Now': 'الآن',
  'On now': 'جارٍ الآن',
  'waiting': 'في الانتظار',
  'Loading…': 'جارٍ التحميل…',

  // ---- Progress trio, coverage and the review queue
  'Your accuracy on marked answers': 'دقتك في الإجابات المصحّحة',
  'Your accuracy over time': 'تطوّر دقتك عبر الوقت',
  'Answer at least ten questions and your accuracy over time appears here.':
    'أجب عن عشرة أسئلة على الأقل ليظهر هنا تطوّر دقتك.',
  'Answer some questions to start building this.': 'أجب عن بعض الأسئلة لتبدأ في بناء هذا.',
  'Answer some questions and the concepts worth revisiting will collect here.':
    'أجب عن بعض الأسئلة لتتجمّع هنا المفاهيم التي تستحق المراجعة.',
  'Concepts your answers put back in the queue.': 'مفاهيم أعادتها إجاباتك إلى قائمة المراجعة.',
  'Curriculum coverage': 'تغطية المنهج',
  'Coverage appears once your curriculum concepts are published.': 'تظهر التغطية بمجرد نشر مفاهيم مقرّرك.',
  'marked answers': 'إجابات مصحّحة',
  'No marked answers yet': 'لا توجد إجابات مصحّحة بعد',
  'not enough answers': 'الإجابات غير كافية',
  'Not enough answers to score': 'الإجابات غير كافية للتقييم',
  'Not enough answers yet': 'لا توجد إجابات كافية بعد',
  'Nothing answered': 'لم تُجِب عن شيء',
  'concept': 'مفهوم',
  'concepts': 'مفاهيم',
  'secure': 'راسخ',
  'developing': 'قيد الترسيخ',
  'shaky': 'غير مستقر',
  'practised only': 'تدريب فقط',

  // ---- Agenda, schedule and last-used resources
  'Nothing due': 'لا شيء مستحق',
  'Nothing left to come': 'لم يتبقَّ شيء قادم',
  'Nothing opened yet': 'لم تفتح شيئًا بعد',
  'Nothing scheduled today': 'لا شيء مجدول اليوم',
  'Nothing scheduled yet': 'لا شيء مجدول بعد',
  'Resources you open appear here, so you can pick up where you left off.':
    'تظهر هنا المصادر التي تفتحها، لتكمل من حيث توقفت.',
  'University sessions appear here once your year has a published timetable. Blocks you plan yourself appear here either way.':
    'تظهر هنا محاضرات الجامعة بمجرد نشر جدول سنتك الدراسية. أما الفترات التي تخطّطها بنفسك فتظهر هنا في الحالتين.',
  'Your university hasn\'t published a timetable for your year. Plan your own study blocks and they will show up here.':
    'لم تنشر جامعتك جدولًا لسنتك الدراسية. خطّط فترات مذاكرتك بنفسك وستظهر هنا.',
  'Your year has no further published sessions, and you have nothing planned after now.':
    'لا توجد محاضرات منشورة أخرى لسنتك الدراسية، ولا شيء مخطَّط لديك بعد الآن.',
  'Your year has no sessions today. Blocks you plan yourself appear here alongside them.':
    'لا توجد محاضرات لسنتك الدراسية اليوم. وتظهر هنا إلى جانبها الفترات التي تخطّطها بنفسك.',
  'Your university': 'جامعتك',
  'Add it in your account': 'أضِفها من حسابك',
  'Nobody has recorded where you study, so your timetable and anything scoped to your year stay empty. Everything else works as normal.':
    'لم يُسجَّل مكان دراستك بعد، لذا يبقى جدولك وكل ما يرتبط بسنتك الدراسية فارغًا. وكل ما عدا ذلك يعمل كالمعتاد.',

  // ---- Fix round 1 — the overdue badge, re-keyed so the count is not glued to the
  // day suffix (review B5). Phrased "days: N" per the counted-noun note in
  // `i18n-ar.ts`, which is the one shape grammatical at every count.
  'Overdue {count}d': 'أيام التأخير: {count}',
}
