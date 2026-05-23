import { Compass, HeartHandshake, Sparkles } from 'lucide-react'
import { PERSONAL, PERSONALITY } from '../data/content'

const icons = [Compass, Sparkles, HeartHandshake]

export function About() {
  return (
    <section id="about" className="bg-brand-white py-20 sm:py-24">
      <div className="section-shell">
        <p className="section-label">About</p>
        <div className="grid gap-5 md:grid-cols-3">
          {PERSONALITY.map((item, index) => {
            const Icon = icons[index]
            return (
              <article
                key={item.label}
                className="rounded-md border border-brand-brownLight/20 border-l-4 border-l-brand-brownLight bg-brand-white p-6 shadow-sm"
              >
                <Icon className="mb-5 text-brand-orange" size={28} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brownLight">{item.label}</p>
                <h2 className="mt-3 text-xl font-extrabold">{item.value}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-gray">{item.desc}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 max-w-4xl border-l border-brand-brownLight pl-6">
          <h2 className="section-title">Project leadership grounded in empathy, structure, and measurable impact.</h2>
          <p className="mt-5 text-base leading-8 text-brand-gray sm:text-lg">{PERSONAL.description}</p>
        </div>
      </div>
    </section>
  )
}
