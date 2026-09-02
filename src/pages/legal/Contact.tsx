import { LegalPage } from './LegalPage'
import { ContactForm } from './ContactForm'
import { LEGAL_PAGES } from './content'

/**
 * The form belongs under the document's last section ("Send us a message"),
 * which is where the explanation of the `mailto:` behaviour sits.
 */
export function Contact() {
  return <LegalPage page={LEGAL_PAGES.contact} after={(lang) => <ContactForm lang={lang} />} />
}
