/**
 * Arabic for the Performance page and the session ledger (WP15).
 *
 * Performance predates the redesign packages, so it had no file of its own and
 * its strings would otherwise land in `i18n-ar.ts`, which only WP0 edits. One
 * more file per the split's own rule — a package appends where nobody else is
 * writing — keeps the sweep out of that shared object.
 */
export const AR_PERFORMANCE: Record<string, string> = {

  // ---- Page frame and personal totals
  'Your progress, curriculum coverage, and verified peer rankings.':
    'تقدّمك، وتغطية المنهج، وترتيبك الموثَّق بين أقرانك.',
  'Personal progress': 'تقدّمك الشخصي',
  'Loading your record…': 'جارٍ تحميل سجلّك…',
  'Overall accuracy': 'الدقة الإجمالية',
  'overall accuracy, on your own log': 'دقة إجمالية، بحسب سجلّك أنت',
  'Secured concepts': 'المفاهيم الراسخة',
  'secured concepts, on your own log': 'مفاهيم راسخة، بحسب سجلّك أنت',
  'Concepts mastered': 'المفاهيم المُتقَنة',
  '“Secured concepts” comes from the mastery model, not raw volume — grinding easy questions does not climb it.':
    '«المفاهيم الراسخة» تأتي من نموذج الإتقان لا من عدد الإجابات — وحلّ الأسئلة السهلة بكثرة لا يرفعها.',
  'A concept counts as secured after at least three marked attempts at 80% accuracy or better. This rewards breadth of reliable knowledge, not answer volume alone.':
    'يُعدّ المفهوم راسخًا بعد ثلاث محاولات مصحّحة على الأقل بدقة 80% أو أعلى. وهذا يكافئ اتساع المعرفة الموثوقة، لا عدد الإجابات وحده.',
  'Items covered': 'العناصر المُغطّاة',
  'Attempts recorded': 'المحاولات المسجَّلة',
  'attempts in total': 'محاولات إجمالًا',
  'Attempts': 'المحاولات',
  '% correct': '% صحيحة',
  'Right': 'صحيح',
  'Wrong': 'خطأ',
  'Unmarked': 'غير مصحَّح',
  'Evidence': 'الأدلة',
  'None found': 'لم يُعثر على شيء',
  'This page reports on your own marked answers. It needs at least':
    'تتناول هذه الصفحة إجاباتك المصحّحة أنت. وتحتاج إلى ما لا يقل عن',
  'before any figure here would mean anything — you have': 'قبل أن يعني أي رقم هنا شيئًا — ولديك',
  'No marked answers yet.': 'لا توجد إجابات مصحّحة بعد.',
  'Nothing answered in this window.': 'لم تُجِب عن شيء في هذه المدة.',
  'Demo figures': 'أرقام تجريبية',
  'Demo cohort preview': 'معاينة دفعة تجريبية',

  // ---- Where the work goes, and study habits
  'Where does the work go?': 'أين يذهب مجهودك؟',
  'Your study habits': 'عاداتك في المذاكرة',
  'When you actually study': 'متى تذاكر فعلًا',
  'Answers committed, by hour of day': 'الإجابات المثبَّتة، حسب ساعة اليوم',
  'Attempts by surface': 'المحاولات حسب الواجهة',
  'Attempts — where your practice is concentrated': 'المحاولات — أين يتركّز تدريبك',
  'Coverage by subject': 'التغطية حسب المادة',
  'Reading': 'قراءة',
  'Solving': 'حلّ',
  'Other study': 'مذاكرة أخرى',
  'Reading is time in the reader, library and glossary; solving is the Question Bank and other answer-and-do surfaces; other study is notebook, whiteboard and flashcards. Each is a count of active minutes on that surface over the last week.':
    'القراءة هي الوقت في القارئ والمكتبة والقاموس؛ والحلّ هو بنك الأسئلة وبقية واجهات الإجابة والتطبيق؛ والمذاكرة الأخرى هي دفتر الملاحظات واللوحة والبطاقات. وكل منها عدد الدقائق النشطة على تلك الواجهة خلال الأسبوع الماضي.',
  'Average time studying': 'متوسط وقت المذاكرة',
  'Time logged': 'الوقت المسجَّل',
  'per day, all study surfaces': 'يوميًا، عبر كل واجهات المذاكرة',
  'Per day, last': 'يوميًا، آخر',
  'of last': 'من آخر',
  'Total active-study time needs the server connection and has not loaded.':
    'يحتاج إجمالي وقت المذاكرة النشط إلى الاتصال بالخادم، ولم يُحمَّل بعد.',
  'Sporadic': 'متقطّع',
  'Focused on reasoning': 'مركَّز على الاستدلال',
  'How you highlight': 'كيف تُظلِّل',
  'Highlights per question': 'التظليلات لكل سؤال',
  'On the explanation or rationale': 'على الشرح أو التعليل',
  'No highlights yet': 'لا توجد تظليلات بعد',
  'Highlight the key points inside a question and a read on your habit appears here.':
    'ظلّل النقاط الأساسية داخل السؤال ليظهر هنا قراءة لعادتك.',
  'Answer changes and highlighting, from your own activity': 'تغييرات الإجابة والتظليل، من نشاطك أنت',
  'You highlight the reasoning — the explanation and rationale. Keep it up.':
    'أنت تُظلِّل الاستدلال — الشرح والتعليل. واصِل على ذلك.',
  'Your highlights are a mix of the reasoning and the scenario. Leaning into the explanation and rationale pays off most.':
    'تظليلاتك مزيج من الاستدلال ونصّ الحالة. والتركيز على الشرح والتعليل هو الأعلى مردودًا.',
  'Your highlights scatter across the scenario and options. Try marking the explanation and rationale — the "why" — instead.':
    'تتناثر تظليلاتك على نصّ الحالة والخيارات. جرّب بدل ذلك تعليم الشرح والتعليل — أي «لماذا».',

  // ---- Re-attempts, weaknesses and the session ledger
  'When you re-answer a question': 'عندما تعيد الإجابة عن سؤال',
  'Re-attempt a question you have answered before to see how your answer moves.':
    'أعد محاولة سؤال أجبت عنه من قبل لترى كيف تتحرك إجابتك.',
  'No repeats yet': 'لا توجد إعادات بعد',
  'on repeats': 'في الإعادات',
  'question re-attempted': 'سؤال أُعيدت محاولته',
  'questions re-attempted': 'أسئلة أُعيدت محاولتها',
  'change': 'تغيير',
  'changes': 'تغييرات',
  'Wrong, then right': 'خطأ ثم صحيح',
  'Right, then wrong': 'صحيح ثم خطأ',
  'Wrong both times': 'خطأ في المرتين',
  'Where are you weak?': 'أين تضعف؟',
  'Lowest accuracy first': 'الأقل دقة أولًا',
  'Nothing stands out as a weakness yet.': 'لا شيء يبرز كنقطة ضعف بعد.',
  'No subject has enough marked answers to report on yet.':
    'لا توجد مادة لديها إجابات مصحّحة كافية للتقرير عنها بعد.',
  'Subjects with at least': 'المواد التي لديها على الأقل',
  'Accuracy by difficulty': 'الدقة حسب الصعوبة',
  'As the author graded each item': 'كما صنّف المؤلِّف كل عنصر',
  'Where you lost marks': 'أين فقدت الدرجات',
  'Repeated weakness': 'ضعف متكرر',
  'Revisit': 'عُد إلى',
  'Revisit the misses from your last session before starting something new.':
    'راجع أخطاء جلستك الأخيرة قبل أن تبدأ شيئًا جديدًا.',
  'Your last session was clean. Keep the spacing effect and revisit it later rather than repeating it now.':
    'كانت جلستك الأخيرة نظيفة. حافظ على أثر التباعد بمراجعتها لاحقًا بدل تكرارها الآن.',
  '— it has cost marks more than once.': '— فقد كلّفك درجات أكثر من مرة.',
  'missed in': 'أخطأت في',
  'while the reasoning is still fresh.': 'والاستدلال ما زال طازجًا.',
  'Session ledger': 'سجل الجلسات',
  'Your recent sittings, in the detail you took them': 'جلساتك الأخيرة، بالتفصيل الذي أدّيتها به',
  'No sessions yet': 'لا توجد جلسات بعد',
  'No timed sessions yet': 'لا توجد جلسات موقوتة بعد',
  'Finish a timed block in the Question bank and it will be logged here, question by question.':
    'أنهِ فترة موقوتة في بنك الأسئلة وستُسجَّل هنا سؤالًا بسؤال.',
  'Best session': 'أفضل جلسة',
  'Pace mix': 'مزيج السرعة',
  'Overtime': 'وقت إضافي',
  'Average / question': 'المتوسط / سؤال',
  'Average per question': 'المتوسط لكل سؤال',
  'Median / question': 'الوسيط / سؤال',
  'Median per question': 'الوسيط لكل سؤال',
  'Mean across all timed answers': 'المتوسط عبر كل الإجابات الموقوتة',
  'Open Question bank': 'افتح بنك الأسئلة',
  'Open shared tests': 'افتح الاختبارات المشتركة',
  'Stations, checklists and written questions are self-scored, so they count as attempts but never toward an accuracy. Cohort comparison is not available: nothing in Maristana aggregates other students yet.':
    'المحطات وقوائم التحقق والأسئلة المقالية تُصحَّح ذاتيًا، لذا تُحتسب محاولات ولا تدخل في الدقة أبدًا. والمقارنة بالدفعة غير متاحة: فلا شيء في Maristana يجمع بيانات الطلاب الآخرين بعد.',

  // ---- Peer standing and the cohort leaderboard
  'Your standing': 'ترتيبك',
  'Your standing — still private': 'ترتيبك — ما زال خاصًّا',
  'Standing unavailable': 'الترتيب غير متاح',
  'How you compare': 'كيف تقارن',
  'Percentile standing by accuracy': 'ترتيبك المئيني حسب الدقة',
  'You scored better than': 'تفوّقت على',
  'of ranked peers, by accuracy.': 'من الأقران المصنَّفين، حسب الدقة.',
  'in your cohort.': 'في دفعتك.',
  'You\'re': 'أنت',
  'Rank': 'الترتيب',
  'Peer median': 'وسيط الأقران',
  'Top performers': 'الأعلى أداءً',
  'This term’s top performers': 'الأعلى أداءً هذا الفصل الدراسي',
  'No eligible performers yet': 'لا يوجد مؤهَّلون بعد',
  'Needs cohort data': 'يحتاج إلى بيانات الدفعة',
  'Leaderboard unavailable': 'لوحة الصدارة غير متاحة',
  'Loading leaderboard': 'جارٍ تحميل لوحة الصدارة',
  'How this board works': 'كيف تعمل هذه اللوحة',
  'Your university, year, and current term': 'جامعتك وسنتك الدراسية وفصلك الحالي',
  'Scoped to your university, year, and term — never a global board.':
    'محصورة في جامعتك وسنتك الدراسية وفصلك — وليست لوحة عالمية أبدًا.',
  'Eligibility — verified answers this term': 'الأهلية — الإجابات الموثَّقة هذا الفصل',
  'Accuracy includes students with at least 100 server-verified answers this term. Ties are resolved by evidence volume, then recent verified activity.':
    'تشمل الدقة الطلاب الذين لديهم 100 إجابة موثَّقة من الخادم على الأقل هذا الفصل. ويُفضّ التعادل بحجم الأدلة، ثم بالنشاط الموثَّق الحديث.',
  'ranked peers in your university, year and current term, each with at least 100 server-verified answers this term.':
    'أقران مصنَّفون في جامعتك وسنتك الدراسية وفصلك الحالي، لكلٍّ منهم 100 إجابة موثَّقة من الخادم على الأقل هذا الفصل.',
  'more verified answers and you join the board — shared tests and readiness assessments count.':
    'إجابات موثَّقة إضافية وتنضم إلى اللوحة — وتُحتسب الاختبارات المشتركة وتقييمات الجاهزية.',
  'Rankings count only server-verified answers — solo self-scored work cannot inflate them.':
    'لا تُحتسب في الترتيب إلا الإجابات الموثَّقة من الخادم — فالعمل الفردي المصحَّح ذاتيًا لا يستطيع تضخيمها.',
  'Only server-verified answers count, so solo self-scored work cannot inflate a position.':
    'لا تُحتسب إلا الإجابات الموثَّقة من الخادم، فالعمل الفردي المصحَّح ذاتيًا لا يستطيع تضخيم أي مركز.',
  'Personal stats elsewhere on this page never show a percentile; comparison lives only here, on verified data.':
    'لا تعرض الإحصاءات الشخصية في بقية هذه الصفحة أي ترتيب مئيني؛ فالمقارنة تعيش هنا وحدها، على بيانات موثَّقة.',
  'Public rankings require the connected server. Demo and historical client-only attempts remain private.':
    'يتطلب الترتيب العام خادمًا متصلًا. وتبقى المحاولات التجريبية والقديمة المحفوظة في المتصفح وحده خاصة.',
  'Nobody in your university, year and current term has enough server-verified answers yet to compare against. This fills in once ranked peers exist.':
    'لا أحد في جامعتك وسنتك الدراسية وفصلك الحالي لديه إجابات موثَّقة كافية للمقارنة بعد. وتمتلئ هذه اللوحة بمجرد وجود أقران مصنَّفين.',
  'The board appears once students in this university and year have enough verified evidence.':
    'تظهر اللوحة بمجرد أن تتوفّر لدى طلاب هذه الجامعة والسنة أدلة موثَّقة كافية.',
  'The peer ranking could not be loaded. Your private performance data has not been substituted.':
    'تعذّر تحميل ترتيب الأقران. ولم تُستبدَل بياناتك الشخصية عن الأداء.',
  'The verified ranking could not be loaded. Your private performance data has not been substituted.':
    'تعذّر تحميل الترتيب الموثَّق. ولم تُستبدَل بياناتك الشخصية عن الأداء.',

  // ---- Fix round 1 — the concept-mastery panel (review A1)
  'Concept mastery': 'إتقان المفاهيم',
  'Built from questions and practicals you have answered': 'مبني على الأسئلة والعملي الذي أجبت عنه',
  'Nothing recorded yet. Answer a question, work through a clinical case, or read an interpretation set, and the concepts each item assesses will appear here.':
    'لم يُسجَّل شيء بعد. أجب عن سؤال، أو اعمل على حالة سريرية، أو اقرأ مجموعة تفسير، وستظهر هنا المفاهيم التي يقيسها كل عنصر.',
  'Only concepts an item actually tests are counted. A concept a scenario merely mentions is left out, so nothing here sends you to revise something you were never asked.':
    'لا تُحتسب إلا المفاهيم التي يختبرها العنصر فعلًا. أما المفهوم الذي يذكره نصّ الحالة عرَضًا فيُستبعد، حتى لا يرسلك شيء هنا لمراجعة ما لم تُسأل عنه أصلًا.',
  '{concepts} concepts measured across {answers} marked answers':
    '{concepts} مفاهيم مقيسة عبر {answers} إجابات مصحّحة',
  'Accuracy on marked answers': 'الدقة في الإجابات المصحّحة',
  'Practised on a station, never marked': 'تدرَّب عليها في محطة، ولم تُصحَّح قط',
  'Weakest first': 'الأضعف أولًا',
  'A station or checklist is scored by you, so it counts as practice rather than a marked answer. Concepts a scenario only mentions are never counted.':
    'المحطة أو قائمة التحقق تصحّحها أنت، لذا تُحتسب تدريبًا لا إجابة مصحّحة. أما المفاهيم التي يذكرها نصّ الحالة عرَضًا فلا تُحتسب أبدًا.',
  // ---- Coverage by source (WP15b)
  'Coverage by source': 'التغطية بحسب المصدر',
  'Questions and concepts you have seen, by source': 'الأسئلة والمفاهيم التي اطّلعت عليها، بحسب المصدر',
}
