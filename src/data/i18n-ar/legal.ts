/**
 * Arabic for Terms, Privacy, Refund Policy, Contact, Accessibility (WP6).
 *
 * Owned by that package alone — every package writes only its own file, so two
 * agents adding strings on the same day cannot collide in `i18n-ar.ts`.
 *
 * Only the *chrome* is here: page names, the section index, the review badge,
 * the contact form's labels. The documents themselves stay in English on both
 * marketing shells and carry a visible notice saying the Arabic version is
 * still under review — a half-translated contract is worse than an honest one
 * in the other language. See `src/pages/legal/content.ts`.
 *
 * These keys are read through `legalLabel()` off the marketing language, not
 * through the app-wide `t()`, so they do not depend on the student's in-app
 * language preference.
 */
export const AR_LEGAL: Record<string, string> = {
  // ---- Page names (also the footer's second row) ----------------------------
  'Terms and Conditions': 'الشروط والأحكام',
  'Privacy Policy': 'سياسة الخصوصية',
  'Refund Policy': 'سياسة الاسترداد',
  'Contact Us': 'تواصل معنا',
  'Accessibility Statement': 'بيان إمكانية الوصول',

  // ---- Document chrome ------------------------------------------------------
  'Last updated': 'آخر تحديث',
  'On this page': 'في هذه الصفحة',
  'Needs legal review': 'بحاجة إلى مراجعة قانونية',

  // ---- Contact form ---------------------------------------------------------
  'Your name': 'الاسم',
  'Your email address': 'بريدك الإلكتروني',
  'Your message': 'رسالتك',
  'Support request': 'طلب دعم',
  'Message sent — a person reads it. Thank you.': 'تم إرسال الرسالة — سيقرأها أحدنا. شكرًا لك.',
  'That did not send. Try again, or write to': 'تعذّر الإرسال. حاول مرة أخرى، أو راسلنا على',
  'directly.': 'مباشرة.',
  'Send message': 'إرسال الرسالة',
  'Goes straight to the support inbox.': 'تصل مباشرة إلى صندوق الدعم.',
}
