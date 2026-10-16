import { AtSign, MessageCircle, Network } from 'lucide-react'
import { PERSONAL } from '../data/content'
import { FOOTER_TAGLINE } from '../data/offer'
import { buildIntentUrl } from '../lib/whatsapp'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-brand-brown px-5 py-8 text-brand-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm text-brand-white/85">
            © {CURRENT_YEAR} {PERSONAL.name}
          </p>
          <p className="mt-1 text-xs text-brand-white/70">{FOOTER_TAGLINE}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={buildIntentUrl('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-brand-brownLight/40 text-brand-white transition hover:bg-brand-brownMid"
            aria-label="WhatsApp (membuka tab baru)"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-brand-brownLight/40 text-brand-white transition hover:bg-brand-brownMid"
            aria-label="LinkedIn"
          >
            <Network size={18} aria-hidden="true" />
          </a>
          <a
            href="https://instagram.com/setyorinisafitri"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-brand-brownLight/40 text-brand-white transition hover:bg-brand-brownMid"
            aria-label="Instagram"
          >
            <AtSign size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
