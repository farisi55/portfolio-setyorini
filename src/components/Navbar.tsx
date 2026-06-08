import { Briefcase, Home, Image, Mail, Menu, Sparkles, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', href: '#home', Icon: Home },
  { label: 'About', href: '#about', Icon: User },
  { label: 'Skills', href: '#skills', Icon: Sparkles },
  { label: 'Gallery', href: '#gallery', Icon: Image },
  { label: 'Experience', href: '#experience', Icon: Briefcase },
  { label: 'Contact', href: '#contact', Icon: Mail },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const current = links
        .map((link) => link.href.replace('#', ''))
        .findLast((id) => {
          const section = document.getElementById(id)
          return section ? section.offsetTop - 140 <= window.scrollY : false
        })
      if (current) setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-brand-brownLight/10 transition-all duration-300 ${
        scrolled ? 'bg-brand-beige/92 shadow-sm backdrop-blur-xl' : 'bg-brand-beige/75 backdrop-blur-md'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#home" className="focus-ring group flex items-center gap-3 rounded-xl" onClick={() => setOpen(false)}>
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-brown via-brand-brownMid to-brand-orange p-[2px] shadow-sm transition-transform group-hover:-translate-y-0.5">
            <span className="grid h-full w-full place-items-center rounded-[14px] bg-brand-brown font-heading text-base font-extrabold tracking-tight text-brand-white">
              SS
            </span>
            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-brand-beige bg-brand-orange" />
          </span>
          <span className="hidden sm:block">
            <span className="block font-heading text-sm font-extrabold leading-tight text-brand-brown">Setyorini Safitri</span>
            <span className="block text-xs font-semibold text-brand-brownMid">Portfolio & Partnership Lead</span>
          </span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-brand-brownLight/20 bg-brand-white/35 px-2 py-1.5 shadow-sm md:flex">
          {links.map((link) => {
            const id = link.href.replace('#', '')
            const Icon = link.Icon
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`focus-ring group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-brown text-brand-white shadow-sm'
                    : 'text-brand-brown hover:bg-brand-beigeLight hover:text-brand-orange'
                }`}
              >
                <Icon size={15} strokeWidth={2.2} />
                <span>{link.label}</span>
              </a>
            )
          })}
        </div>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-brand-brownLight/40 bg-brand-white/40 text-brand-brown shadow-sm md:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-brand-brownLight/20 bg-brand-beige/98 shadow-sm transition-all md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-transparent'
        }`}
      >
        <div className="section-shell flex flex-col gap-1 py-4">
          {links.map((link) => {
            const id = link.href.replace('#', '')
            const Icon = link.Icon
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`focus-ring flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                  isActive ? 'bg-brand-brown text-brand-white' : 'text-brand-brown hover:bg-brand-white/45'
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} strokeWidth={2.2} />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </header>
  )
}
