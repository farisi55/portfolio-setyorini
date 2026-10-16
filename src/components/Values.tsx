import { Eye, ShieldCheck, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { VALUES_SECTION, type ValueItem } from '../data/offer'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const VALUE_ICONS: Record<ValueItem['icon'], LucideIcon> = {
  shield: ShieldCheck,
  eye: Eye,
  target: Target,
}

export function Values() {
  return (
    <section id="values" className="relative overflow-hidden bg-brand-brown py-20 text-brand-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border-[44px] border-brand-brownLight/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-28 h-64 w-64 rounded-full border border-brand-brownLight/20"
      />

      <div className="section-shell relative">
        <SectionHeader label={VALUES_SECTION.label} title={VALUES_SECTION.title} tone="dark" />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <p className="font-heading text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              <span className="block text-brand-white">{VALUES_SECTION.motto.first}</span>
              <span className="block text-brand-brownLight">{VALUES_SECTION.motto.second}</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-brand-beige/85 sm:text-lg">
              {VALUES_SECTION.motto.gloss}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-md border border-brand-brownLight/30 bg-brand-white/5 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brownLight">
                {VALUES_SECTION.dna.label}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-brand-white sm:text-3xl">
                {VALUES_SECTION.dna.title}
              </h3>
              <p className="mt-4 leading-7 text-brand-beige/85">{VALUES_SECTION.dna.text}</p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {VALUES_SECTION.values.map((value, index) => {
            const Icon = VALUE_ICONS[value.icon]

            return (
              <li key={value.name}>
                <Reveal className="h-full" delay={index * 100}>
                  <div className="h-full border-t border-brand-brownLight/40 pt-6">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-brand-brownLight/50 text-brand-orange">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-extrabold text-brand-white">{value.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-brand-beige/80">{value.text}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {VALUES_SECTION.traits.map((trait) => (
            <li key={trait.title}>
              <Reveal className="h-full">
                <div className="h-full rounded-md border border-brand-brownLight/25 bg-brand-white/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brownLight">
                    {trait.label}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-extrabold text-brand-white">{trait.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-beige/80">{trait.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
