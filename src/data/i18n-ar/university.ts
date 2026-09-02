/**
 * Arabic for the Your University page (WP15b).
 *
 * The page predates the redesign packages and had no owner file. Its own
 * vocabulary — terms, modules, marks, timetable — collides with three existing
 * dictionaries where the same English word means something else, so three call
 * sites there were re-keyed rather than overriding an earlier package:
 *
 * - `Terms` is Medical Terminology's «المصطلحات» in `learn.ts`; the semester
 *   count asks for `Academic terms`.
 * - `marks` is the reader's highlight marks in `learn.ts`; the term summary asks
 *   for the whole sentence `{modules} modules · {marks} marks`.
 * - `credits` is Build Maristanas' construction credit in `maristanas.ts`; the
 *   assessment badge asks for `credit hours`.
 */
export const AR_UNIVERSITY: Record<string, string> = {

  /* ---- Page frame ------------------------------------------------------- */
  'Your University': 'جامعتك',
  'Your own year, laid out clearly: modules and terms, how each is marked, and the timetable your faculty has published so far.':
    'سنتك أنت، معروضة بوضوح: المقررات والفصول، وكيف تُوزَّع درجات كل منها، والجدول الذي نشرته كليتك حتى الآن.',
  'Qbank': 'بنك الأسئلة',
  'Something went wrong loading your university page. Please try again in a moment.':
    'حدث خطأ أثناء تحميل صفحة جامعتك. أعد المحاولة بعد قليل.',
  'Loading your university page': 'جارٍ تحميل صفحة جامعتك',
  'Just a moment while we bring in your modules, timetable and marks.':
    'لحظة واحدة ريثما نُحضر مقرراتك وجدولك ودرجاتك.',
  'Tell Nishany where you study': 'أخبر نِشاني أين تدرس',
  'Add your university and year to your account, and this page will fill in with your own modules and timetable.':
    'أضف جامعتك وسنتك إلى حسابك، فتمتلئ هذه الصفحة بمقرراتك وجدولك أنت.',
  'Open account settings': 'افتح إعدادات الحساب',
  'This year is being set up': 'يجري إعداد هذه السنة',
  "You're enrolled, but your faculty's curriculum for this year hasn't been published yet. Check back soon.":
    'أنت مقيَّد بالفعل، لكن منهج كليتك لهذه السنة لم يُنشر بعد. عاود الاطّلاع قريبًا.',
  'preview data': 'بيانات معاينة',
  'This is sample data so you can see how your university page will look and feel.':
    'هذه بيانات نموذجية لترى كيف ستبدو صفحة جامعتك.',
  "This page shows only what's yours — {year} at {university}, nothing from any other university or year.":
    'تعرض هذه الصفحة ما يخصّك وحدك — {year} في {university}، ولا شيء من أي جامعة أو سنة أخرى.',

  /* ---- The year at a glance --------------------------------------------- */
  'Academic terms': 'الفصول الدراسية',
  'Modules': 'المقررات',
  'Total marks': 'مجموع الدرجات',
  'unavailable': 'غير متاح',
  'your year': 'سنتك',
  'Term {n}': 'الفصل {n}',
  '{modules} modules · {marks} marks': '{modules} مقررًا · {marks} درجة',
  'No modules published for your year yet': 'لم تُنشر مقررات لسنتك بعد',
  "Once your faculty's modules are published, they'll appear here, organised by term. Library and Qbank still work in the meantime.":
    'حين تُنشر مقررات كليتك ستظهر هنا مرتّبة بحسب الفصل. وتظلّ المكتبة وبنك الأسئلة يعملان في هذه الأثناء.',

  /* ---- Module card ------------------------------------------------------- */
  'topic': 'موضوع',
  'session': 'حصة',
  'Topics covered': 'الموضوعات المُغطّاة',
  'Timetable': 'الجدول',
  "Your faculty hasn't published a topic breakdown for this module yet.":
    'لم تنشر كليتك تفصيلًا لموضوعات هذا المقرر بعد.',
  "Schedule coming soon — your faculty hasn't published this module's timetable yet.":
    'الجدول قريبًا — لم تنشر كليتك جدول هذا المقرر بعد.',
  'Date to be announced': 'الموعد يُعلَن لاحقًا',
  'resources linked': 'مصدرًا مرتبطًا',

  /* ---- Marks and their confidence states --------------------------------- */
  'Not published yet': 'لم يُنشر بعد',
  'credit hours': 'ساعة معتمدة',
  "Your faculty hasn't published how this module's marks break down yet.":
    'لم تنشر كليتك بعد كيف تتوزّع درجات هذا المقرر.',
  'Marks confirmed': 'الدرجات مؤكَّدة',
  'Continued from last year': 'مستمرّ من السنة الماضية',
  'Estimated': 'تقديري',
  'Being confirmed': 'قيد التأكيد',
  'Marks coming soon': 'الدرجات قريبًا',
  'Schedule coming soon': 'الجدول قريبًا',
  // `FRIENDLY_STATE`, rendered through `t()` in `FriendlyBadges`.
  'Confirmed': 'مؤكَّد',
  'Estimated from your marks': 'مُقدَّر من درجاتك',
  'From last year': 'من السنة الماضية',
  'Still being finalised': 'قيد الاستكمال',

  /* ---- The side rail ------------------------------------------------------ */
  'Coming up': 'القادم',
  'next {n}': 'أقرب {n}',
  'Nothing upcoming yet — your faculty hasn\'t published future timetable dates for this year. Past sessions may still show on a module as "from last year".':
    'لا شيء قادم بعد — لم تنشر كليتك مواعيد جدول مستقبلية لهذه السنة. وقد تظل الحصص السابقة ظاهرة على المقرر بوصفها «من السنة الماضية».',
  'Your enrolment': 'قيدك',
  "You're set up as a": 'أنت مسجَّل بوصفك طالب',
  'student at': 'في',
  '. Wrong university or year?': '. الجامعة أو السنة غير صحيحة؟',
  'Update in account settings': 'حدِّثها من إعدادات الحساب',
  'This year at a glance': 'هذه السنة في لمحة',
  'Timetable sessions': 'حصص الجدول',
  "Some modules' marks haven't been published yet — check back closer to exams.":
    'لم تُنشر درجات بعض المقررات بعد — عاود الاطّلاع مع اقتراب الامتحانات.',
}
