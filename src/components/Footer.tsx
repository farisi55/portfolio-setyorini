import { AtSign, Network } from 'lucide-react'
import { PERSONAL } from '../data/content'

export function Footer() {
  return (
    <footer className="bg-brand-brown px-5 py-8 text-brand-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-brand-white/85">Made with care - Setyorini Safitri © 2025</p>
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-brand-brownLight/40 text-brand-white transition hover:bg-brand-brownMid"
            aria-label="LinkedIn"
          >
            <Network size={18} />
          </a>
          <a
            href="https://instagram.com/setyorinisafitri"
            target="_blank"
            rel="noreferrer"
            className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-brand-brownLight/40 text-brand-white transition hover:bg-brand-brownMid"
            aria-label="Instagram"
          >
            <AtSign size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
