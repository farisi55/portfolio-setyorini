import { PROOF_VALUES } from '../data/offer'

const highlights = [
  { value: PROOF_VALUES.years, label: 'Tahun Pengalaman' },
  { value: PROOF_VALUES.mous, label: 'MoU & Sponsorship' },
  { value: PROOF_VALUES.activities, label: 'Aktivitas Terdokumentasi' },
  { value: PROOF_VALUES.webinars, label: 'Webinar Di-host' },
]

export function Stats() {
  return (
    <section aria-label="Ringkasan pencapaian" className="bg-brand-brown py-12">
      <div className="section-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-heading text-4xl font-extrabold text-brand-brownLight sm:text-5xl">{item.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-white">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
