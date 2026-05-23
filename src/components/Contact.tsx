import { FormEvent, useState } from 'react'
import { AtSign, Mail, MapPin, Network, Phone, Send } from 'lucide-react'
import { PERSONAL } from '../data/content'

const contactItems = [
  { label: 'Phone', value: PERSONAL.phone, icon: Phone, href: `tel:${PERSONAL.phone.replace(/\s/g, '')}` },
  { label: 'Email', value: PERSONAL.email, icon: Mail, href: `mailto:${PERSONAL.email}` },
  { label: 'LinkedIn', value: 'setyorinisafitri', icon: Network, href: PERSONAL.linkedin },
  { label: 'Instagram', value: PERSONAL.instagram, icon: AtSign, href: 'https://instagram.com/setyorinisafitri' },
  { label: 'Location', value: PERSONAL.location, icon: MapPin },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'Website Visitor'}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="bg-brand-beigeLight py-20 sm:py-24">
      <div className="section-shell">
        <p className="section-label">Let's Connect</p>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <form onSubmit={onSubmit} className="rounded-md bg-brand-white p-5 shadow-sm sm:p-8">
            <h2 className="section-title">Start a conversation.</h2>
            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="focus-ring rounded-md border border-brand-brownLight/40 px-4 py-3 font-normal text-brand-brown"
                  type="text"
                  name="name"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                Email
                <input
                  required
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="focus-ring rounded-md border border-brand-brownLight/40 px-4 py-3 font-normal text-brand-brown"
                  type="email"
                  name="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                Message
                <textarea
                  required
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  className="focus-ring min-h-36 rounded-md border border-brand-brownLight/40 px-4 py-3 font-normal text-brand-brown"
                  name="message"
                />
              </label>
              <button
                type="submit"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-brand-brown px-6 py-4 text-sm font-semibold text-brand-white transition hover:bg-brand-brownMid"
              >
                Send Message <Send size={18} />
              </button>
            </div>
          </form>

          <div className="grid content-start gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex gap-4 rounded-md border border-brand-brownLight/20 bg-brand-white p-5 shadow-sm">
                  <Icon size={22} className="mt-1 shrink-0 text-brand-orange" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-brownLight">
                      {item.label}
                    </p>
                    <p className="mt-1 font-semibold leading-6 text-brand-brown">{item.value}</p>
                  </div>
                </div>
              )

              return item.href ? (
                <a key={item.label} href={item.href} className="focus-ring rounded-md" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
