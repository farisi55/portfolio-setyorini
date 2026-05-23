import { ArrowRight, Mail } from 'lucide-react'
import { useState } from 'react'
import { PERSONAL } from '../data/content'

export function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false)

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-brand-beige pt-28">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full border border-brand-brownLight/30" />
      <div className="pointer-events-none absolute right-[-5rem] top-28 h-48 w-48 rounded-full border-[28px] border-brand-brownLight/20" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-brand-brownLight/10" />

      <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="animate-fade-up">
          <p className="section-label">Community Builder / Project Manager</p>
          <h1 className="max-w-4xl font-heading text-5xl font-extrabold leading-[1.02] text-brand-brown sm:text-6xl lg:text-7xl">
            COMMUNITY PROJECT & PARTNERSHIP LEAD
          </h1>
          <p className="mt-6 font-heading text-3xl font-extrabold text-brand-brown sm:text-4xl">SETYORINI SAFITRI</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-gray sm:text-lg">{PERSONAL.tagline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#experience"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-brand-brown px-6 py-4 text-sm font-semibold text-brand-white transition hover:bg-brand-brownMid"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-brand-brown px-6 py-4 text-sm font-semibold text-brand-brown transition hover:border-brand-orange hover:text-brand-orange"
            >
              Let's Connect <Mail size={18} />
            </a>
          </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}
