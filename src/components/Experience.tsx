import { useState } from 'react'
import { EXPERIENCES, type Experience as ExperienceType } from '../data/content'

function LogoFallback({ experience }: { experience: ExperienceType }) {
  const [missing, setMissing] = useState(false)

  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-md border border-brand-brownLight/30 bg-brand-white p-2">
      {!missing && (
        <img
          src={experience.logo}
          alt={`${experience.org} logo`}
          className="max-h-full max-w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
            setMissing(true)
          }}
        />
      )}
      <span className={`text-center text-xs font-extrabold text-brand-brown ${missing ? '' : 'hidden'}`}>
        {experience.org}
      </span>
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="bg-brand-white py-20 sm:py-24">
      <div className="section-shell">
        <p className="section-label">Experience</p>
        <div className="mb-12 max-w-3xl">
          <h2 className="section-title">A timeline of community programs, partnerships, and operational delivery.</h2>
        </div>

        <div className="relative space-y-8 before:absolute before:bottom-0 before:left-8 before:top-0 before:w-px before:bg-brand-brownLight/30 md:before:left-[2rem]">
          {EXPERIENCES.map((experience, index) => (
            <article
              key={experience.org}
              className={`relative ml-0 rounded-md border border-brand-brownLight/20 p-5 shadow-sm sm:p-7 ${
                index % 2 === 0 ? 'bg-brand-beigeLight' : 'bg-brand-white'
              }`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <LogoFallback experience={experience} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brownLight">Organization</p>
                  <h3 className="mt-2 text-2xl font-extrabold">{experience.org}</h3>
                </div>
              </div>

              <div className="mt-8 space-y-7">
                {experience.roles.map((role) => (
                  <div key={`${experience.org}-${role.title}`} className="border-l border-brand-brownLight/40 pl-5">
                    <span className="inline-flex rounded-full bg-brand-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-orange shadow-sm">
                      {role.period}
                    </span>
                    <h4 className="mt-3 text-xl font-extrabold">{role.title}</h4>

                    {role.responsibilities.length > 0 && (
                      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {role.responsibilities.map((item) => (
                          <div key={item.area} className="rounded-md border border-brand-brownLight/20 bg-brand-white p-4">
                            <p className="font-heading text-sm font-extrabold text-brand-brown">{item.area}</p>
                            <p className="mt-2 text-sm leading-6 text-brand-gray">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {experience.stats && (
                <div className="mt-8 grid gap-3 border-t border-brand-brownLight/20 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {experience.stats.map((stat) => (
                    <div key={`${experience.org}-${stat.label}`} className="rounded-md bg-brand-white p-4">
                      <p className="font-heading text-3xl font-extrabold text-brand-orange">{stat.value}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gray">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
