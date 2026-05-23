const highlights = [
  { value: '7+', label: 'Years Experience' },
  { value: '100+', label: 'MoUs Signed' },
  { value: '34.5K+', label: 'Activities Documented' },
  { value: '45+', label: 'Webinars Hosted' },
]

export function Stats() {
  return (
    <section className="bg-brand-brown py-12">
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
