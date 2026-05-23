import { BadgeCheck, CheckCircle2, PenTool } from 'lucide-react'
import { CERTIFICATIONS, CORE_SKILLS, SOFTWARE_TOOLS } from '../data/content'

export function Skills() {
  return (
    <section id="skills" className="bg-brand-beigeLight py-20 sm:py-24">
      <div className="section-shell">
        <p className="section-label">Skills</p>
        <div className="mb-10 flex max-w-3xl flex-col gap-4">
          <h2 className="section-title">Clear operating rhythm for programs, partners, and communities.</h2>
          <p className="leading-8 text-brand-gray">
            A practical toolkit spanning planning, coordination, stakeholder communication, reporting, and live
            learning experiences.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xl font-extrabold">
              <PenTool size={21} className="text-brand-orange" aria-hidden="true" /> Core Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {CORE_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-brand-brownLight/60 bg-brand-beige px-4 py-2 text-sm font-semibold text-brand-brown"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xl font-extrabold">
              <BadgeCheck size={22} className="text-brand-orange" aria-hidden="true" /> Certifications
            </h3>
            <ol className="space-y-3">
              {CERTIFICATIONS.map((cert, index) => (
                <li key={cert} className="flex gap-3 rounded-md bg-brand-white p-4 shadow-sm">
                  <span className="font-heading text-sm font-extrabold text-brand-brownLight">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden="true" />
                  <span className="text-sm font-medium leading-6 text-brand-brown">{cert}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-brownLight/25 pt-8">
          <h3 className="mb-5 text-xl font-extrabold">Software & Tools</h3>
          <div className="flex flex-wrap gap-3">
            {SOFTWARE_TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-brand-brownLight/30 bg-brand-white px-4 py-3 text-sm font-semibold text-brand-brown shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
