/**
 * Arabic for the Question Bank's "Your progress" panel (WP11).
 *
 * Its own file for the same reason every other package has one: the panel's
 * strings arrived while three other agents were editing `qbank.ts`, and a
 * shared object is where that collides. Only the strings this panel introduces
 * live here — anything it reuses ('All', 'Accuracy', 'Last 7 days', the
 * weekday initials) is already translated where it was first written, and
 * restating it here would silently override that translation.
 */
export const AR_QBANK_STATS: Record<string, string> = {
  /* ---- The panel and its filter --------------------------------------- */
  'Your progress': 'تقدّمك',
  'Which bank these figures cover': 'البنك الذي تعبّر عنه هذه الأرقام',

  /* ---- What the ring is counting, per bank ---------------------------- */
  'Everything covered': 'ما غطّيته إجمالًا',
  'Practical items covered': 'العناصر العملية المغطّاة',
  'Essays covered': 'المقالات المغطّاة',

  /* ---- What "accuracy" means in each bank ------------------------------ */
  // Said under the heading rather than left implicit: accuracy is three
  // different measurements here, and a bar that does not say which is a bar
  // nobody can act on.
  'Items passed, by the same rule your missed list uses.':
    'العناصر التي نجحت فيها، بالقاعدة نفسها التي تستخدمها قائمة ما فاتك.',
  'Key points you ticked, out of the key points the answer carries.':
    'النقاط الأساسية التي أشّرتها، من مجموع نقاط الإجابة.',
  'Every marked answer, passed item and ticked key point, counted once each.':
    'كل إجابة مصحَّحة وعنصر ناجح ونقطة أساسية مؤشَّرة، كلٌّ منها مرة واحدة.',

  /* ---- Quick start paging ---------------------------------------------- */
  // The arrows moved into the header row, where they page presets rather than
  // scroll a deck, so the labels name what they move through.
  'Previous preset': 'الاختيار السابق',
  'Next preset': 'الاختيار التالي',

  /* ---- Empty states, one per bank -------------------------------------- */
  'Answer a few questions in a subject and its accuracy appears here.':
    'أجب عن بضعة أسئلة في مادة وستظهر دقتك فيها هنا.',
  'No practical items attempted yet.': 'لم تجرّب أي عنصر عملي بعد.',
  'No essays marked yet.': 'لم تصحّح أي مقال بعد.',
  'Nothing recorded in any bank yet. Sit anything and its accuracy appears here.':
    'لا شيء مسجَّل في أي بنك بعد. اجلس لأي اختبار وستظهر دقتك هنا.',
}
