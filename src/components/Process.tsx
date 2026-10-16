import { PROCESS_SECTION } from '../data/offer'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { WhatsAppLink } from './WhatsAppLink'

export function Process() {
  return (
    <section id="process" className="bg-brand-beigeLight py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader label={PROCESS_SECTION.label} title={PROCESS_SECTION.title} />

        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS_SECTION.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal className="h-full" delay={index * 100}>
                <div className="relative h-full border-t-2 border-brand-brownLight/50 pt-6">
                  <span
                    aria-hidden="true"
                    className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-brand-orange"
                  />
                  <span
                    aria-hidden="true"
                    className="font-heading text-5xl font-extrabold leading-none text-brand-brownLight/60"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-gray">{step.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <WhatsAppLink intent={PROCESS_SECTION.cta.intent}>{PROCESS_SECTION.cta.label}</WhatsAppLink>
        </div>
      </div>
    </section>
  )
}
