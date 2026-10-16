import { Check, Handshake, Mic } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SERVICES, SERVICES_SECTION, TOPICS, type ServiceOffer } from '../data/offer'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { WhatsAppLink } from './WhatsAppLink'

const SERVICE_ICONS: Record<ServiceOffer['icon'], LucideIcon> = {
  mic: Mic,
  handshake: Handshake,
}

export function Services() {
  return (
    <section id="services" className="bg-brand-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader
          label={SERVICES_SECTION.label}
          title={SERVICES_SECTION.title}
          intro={SERVICES_SECTION.intro}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon]

            return (
              <Reveal key={service.id} delay={index * 120} className="h-full">
                <article
                  aria-labelledby={`service-${service.id}`}
                  className="flex h-full flex-col rounded-md border border-brand-brownLight/25 border-t-4 border-t-brand-orange bg-brand-beigeLight p-6 shadow-sm sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-brown text-brand-white">
                      <Icon size={26} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="font-heading text-5xl font-extrabold leading-none text-brand-brownLight/50">
                      {service.number}
                    </span>
                  </div>

                  <h3 id={`service-${service.id}`} className="mt-6 text-2xl font-extrabold sm:text-3xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-semibold text-brand-brownMid">{service.tagline}</p>
                  <p className="mt-4 leading-7 text-brand-gray">{service.description}</p>

                  <p className="mt-5 rounded-md bg-brand-beige px-4 py-3 text-sm leading-6 text-brand-brown">
                    <span className="font-bold">Cocok untuk: </span>
                    {service.bestFor}
                  </p>

                  <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brownMid">
                    Yang ditangani
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {service.scope.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-brand-brown">
                        <Check size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Format dan fokus">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-brand-brownLight/50 bg-brand-white px-3 py-1 text-xs font-semibold text-brand-brown"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <dl className="grid gap-3 border-t border-brand-brownLight/25 pt-6 sm:grid-cols-3 sm:gap-4">
                      {service.proof.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1"
                        >
                          <dt className="text-xs font-semibold leading-5 text-brand-gray">{item.label}</dt>
                          <dd className="order-first w-28 shrink-0 font-heading text-xl font-extrabold leading-tight text-brand-orange sm:w-auto xl:text-2xl">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <WhatsAppLink className="mt-8 w-full sm:w-auto" intent={service.cta.intent}>
                      {service.cta.label}
                    </WhatsAppLink>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-20">
          <h3 className="text-2xl font-extrabold sm:text-3xl">{TOPICS.title}</h3>
          <p className="mt-3 max-w-3xl leading-8 text-brand-gray">{TOPICS.intro}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.items.map((topic) => (
              <li key={topic.title} className="border-t-2 border-brand-brownLight/50 pt-4">
                <h4 className="font-heading text-lg font-extrabold">{topic.title}</h4>
                <p className="mt-2 text-sm leading-6 text-brand-gray">{topic.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-col gap-5 rounded-md bg-brand-beige p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-xl font-semibold leading-7 text-brand-brown">{SERVICES_SECTION.helper.text}</p>
            <WhatsAppLink variant="secondary" className="shrink-0" intent={SERVICES_SECTION.helper.cta.intent}>
              {SERVICES_SECTION.helper.cta.label}
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
