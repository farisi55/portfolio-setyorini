import { Quote } from 'lucide-react'
import { TESTIMONIALS, TESTIMONIALS_SECTION } from '../data/offer'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section id="testimonials" className="bg-brand-beige py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader label={TESTIMONIALS_SECTION.label} title={TESTIMONIALS_SECTION.title} />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={`${item.name}-${item.organization}`}>
              <Reveal className="h-full">
                <figure className="flex h-full flex-col rounded-md border border-brand-brownLight/25 bg-brand-white p-6 shadow-sm">
                  <Quote size={28} className="text-brand-orange" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 leading-7 text-brand-brown">{item.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-brownLight/20 pt-4">
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt=""
                        loading="lazy"
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-brand-brown">{item.name}</p>
                      <p className="text-sm text-brand-gray">
                        {item.role}, {item.organization}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
