import { AtSign, Mail, MapPin, MessageCircle, Network, Phone } from 'lucide-react'
import { useState, type FormEvent, type MouseEvent } from 'react'
import { PERSONAL } from '../data/content'
import { CONTACT_COPY } from '../data/offer'
import {
  buildInquiryMailto,
  buildInquiryWhatsAppUrl,
  buildIntentUrl,
  type InquiryFields,
} from '../lib/whatsapp'

const contactItems = [
  { label: 'WhatsApp', value: PERSONAL.phone, icon: MessageCircle, href: buildIntentUrl('general') },
  { label: 'Phone', value: PERSONAL.phone, icon: Phone, href: `tel:${PERSONAL.phone.replace(/\D/g, '')}` },
  { label: 'Email', value: PERSONAL.email, icon: Mail, href: `mailto:${PERSONAL.email}` },
  { label: 'LinkedIn', value: 'setyorinisafitri', icon: Network, href: PERSONAL.linkedin },
  { label: 'Instagram', value: PERSONAL.instagram, icon: AtSign, href: 'https://instagram.com/setyorinisafitri' },
  { label: 'Location', value: PERSONAL.location, icon: MapPin },
]

export function Contact() {
  const [form, setForm] = useState<InquiryFields>({
    name: '',
    email: '',
    need: 'mc',
    date: '',
    message: '',
  })

  const update = <K extends keyof InquiryFields>(key: K, value: InquiryFields[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.open(buildInquiryWhatsAppUrl(form), '_blank', 'noopener,noreferrer')
  }

  const onEmailClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.form?.reportValidity()) return
    window.location.href = buildInquiryMailto(form, PERSONAL.email)
  }

  return (
    <section id="contact" className="bg-brand-beigeLight py-20 sm:py-24">
      <div className="section-shell">
        <p className="section-label">{CONTACT_COPY.label}</p>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <form onSubmit={onSubmit} className="rounded-md bg-brand-white p-5 shadow-sm sm:p-8">
            <h2 className="section-title">{CONTACT_COPY.title}</h2>
            <p className="mt-3 leading-7 text-brand-gray">{CONTACT_COPY.intro}</p>

            <div className="mt-8 grid gap-5">
              <fieldset>
                <legend className="text-sm font-semibold text-brand-brown">{CONTACT_COPY.fields.need}</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {CONTACT_COPY.needs.map((option) => (
                    <label key={option.value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="need"
                        className="peer sr-only"
                        checked={form.need === option.value}
                        onChange={() => update('need', option.value)}
                      />
                      <span className="flex h-full items-center justify-center rounded-md border border-brand-brownLight/40 bg-brand-white px-3 py-3 text-center text-sm font-semibold text-brand-brown transition hover:border-brand-brownMid peer-checked:border-brand-brown peer-checked:bg-brand-brown peer-checked:text-brand-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange peer-focus-visible:ring-offset-2">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                  {CONTACT_COPY.fields.name}
                  <input
                    required
                    value={form.name}
                    onChange={(event) => update('name', event.target.value)}
                    className="focus-ring rounded-md border border-brand-brownLight/40 bg-brand-white px-4 py-3 font-normal text-brand-brown"
                    type="text"
                    name="name"
                    autoComplete="name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                  {CONTACT_COPY.fields.email}
                  <input
                    value={form.email}
                    onChange={(event) => update('email', event.target.value)}
                    className="focus-ring rounded-md border border-brand-brownLight/40 bg-brand-white px-4 py-3 font-normal text-brand-brown"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                {CONTACT_COPY.fields.date}
                <input
                  value={form.date}
                  onChange={(event) => update('date', event.target.value)}
                  className="focus-ring rounded-md border border-brand-brownLight/40 bg-brand-white px-4 py-3 font-normal text-brand-brown"
                  type="text"
                  name="date"
                  placeholder="Contoh: 12 Desember 2026"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-brand-brown">
                {CONTACT_COPY.fields.message}
                <textarea
                  required
                  value={form.message}
                  onChange={(event) => update('message', event.target.value)}
                  className="focus-ring min-h-36 rounded-md border border-brand-brownLight/40 bg-brand-white px-4 py-3 font-normal text-brand-brown"
                  name="message"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-brown px-6 py-4 text-sm font-semibold text-brand-white transition hover:bg-brand-brownMid"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {CONTACT_COPY.whatsappButton}
                </button>
                <button
                  type="button"
                  onClick={onEmailClick}
                  className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-brand-brown px-6 py-4 text-sm font-semibold text-brand-brown transition hover:border-brand-orange hover:text-brand-orange"
                >
                  <Mail size={18} aria-hidden="true" />
                  {CONTACT_COPY.emailButton}
                </button>
              </div>

              <p className="text-xs leading-6 text-brand-gray">{CONTACT_COPY.note}</p>
            </div>
          </form>

          <div className="grid content-start gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex gap-4 rounded-md border border-brand-brownLight/20 bg-brand-white p-5 shadow-sm">
                  <Icon size={22} className="mt-1 shrink-0 text-brand-orange" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-brownMid">
                      {item.label}
                    </p>
                    <p className="mt-1 font-semibold leading-6 text-brand-brown">{item.value}</p>
                  </div>
                </div>
              )

              const isExternal = item.href?.startsWith('http') ?? false

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="focus-ring rounded-md"
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
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
