import { ArrowDown, BadgeCheck, Handshake, Mic } from 'lucide-react'
import { useState } from 'react'
import { HERO } from '../data/offer'
import { PERSONAL } from '../data/content'
import { WhatsAppLink } from './WhatsAppLink'

export function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false)

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-brand-beige pt-28">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full border border-brand-brownLight/30" />
      <div className="pointer-events-none absolute right-[-5rem] top-28 h-48 w-48 rounded-full border-[28px] border-brand-brownLight/20" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-brand-brownLight/10" />

      <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="animate-fade-up">
          <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-brand-brownMid">
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand-orange" />
            {PERSONAL.name}
          </p>
          <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[1.04] text-brand-brown sm:text-6xl lg:text-7xl">
            {HERO.headline.primary}{' '}
            <span className="mt-3 block text-3xl leading-tight text-brand-brownMid sm:text-4xl lg:text-5xl">
              {HERO.headline.secondary}
            </span>
          </h1>
          <p className="mt-6 font-heading text-xl font-bold text-brand-brown sm:text-2xl">{HERO.brandLine}</p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-brand-brownMid sm:text-lg">{HERO.paragraph}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WhatsAppLink intent={HERO.primaryCta.intent}>{HERO.primaryCta.label}</WhatsAppLink>
            <WhatsAppLink variant="secondary" intent={HERO.secondaryCta.intent}>
              {HERO.secondaryCta.label}
            </WhatsAppLink>
            <a
              href={HERO.tertiaryCta.href}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-brand-brown underline-offset-4 transition hover:text-brand-orange hover:underline"
            >
              {HERO.tertiaryCta.label}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Sertifikasi dan kemampuan">
            {HERO.badges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-brand-brownLight/50 bg-brand-white/70 px-3 py-1.5 text-xs font-semibold text-brand-brown"
              >
                <BadgeCheck size={14} className="text-brand-orange" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up-delay flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-[30rem]">
            <div className="absolute inset-0 rounded-full border-[18px] border-brand-brownLight/40" />
            <div className="absolute inset-8 rotate-6 rounded-[38%] border border-brand-brownLight" />
            <div className="absolute inset-12 overflow-hidden rounded-[42%] bg-brand-beigeLight shadow-2xl">
              {!photoMissing && (
                <img
                  src={PERSONAL.photo}
                  alt={`${PERSONAL.name} portrait`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                    setPhotoMissing(true)
                  }}
                />
              )}
              <span
                className={`grid h-full w-full place-items-center px-8 text-center font-heading text-3xl font-extrabold text-brand-brown ${
                  photoMissing ? '' : 'hidden'
                }`}
              >
                Setyorini Safitri
              </span>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-12 left-0 hidden items-center gap-2 rounded-full bg-brand-white px-4 py-2.5 text-sm font-bold text-brand-brown shadow-lg sm:flex"
            >
              <Mic size={16} className="text-brand-orange" />
              MC &amp; Public Speaker
            </span>
            <span
              aria-hidden="true"
              className="absolute right-0 top-14 hidden items-center gap-2 rounded-full bg-brand-white px-4 py-2.5 text-sm font-bold text-brand-brown shadow-lg sm:flex"
            >
              <Handshake size={16} className="text-brand-orange" />
              Community Partnership
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
