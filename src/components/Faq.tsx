import { Plus } from 'lucide-react'
import { FAQ_SECTION } from '../data/offer'
import { SectionHeader } from './SectionHeader'
import { WhatsAppLink } from './WhatsAppLink'

export function Faq() {
  return (
    <section id="faq" className="bg-brand-white py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader label={FAQ_SECTION.label} title={FAQ_SECTION.title} intro={FAQ_SECTION.intro} />
          <WhatsAppLink variant="secondary" className="mt-8" intent={FAQ_SECTION.cta.intent}>
            {FAQ_SECTION.cta.label}
          </WhatsAppLink>
        </div>

        <div className="divide-y divide-brand-brownLight/25 rounded-md border border-brand-brownLight/25 bg-brand-beigeLight">
          {FAQ_SECTION.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-md px-5 py-5 text-left font-heading font-bold text-brand-brown marker:content-none sm:px-6 [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <Plus
                  size={20}
                  className="shrink-0 text-brand-orange transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-6 pr-12 leading-7 text-brand-gray sm:px-6 sm:pr-14">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
