import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-beige/90 shadow-sm backdrop-blur-xl' : 'bg-brand-beige/70 backdrop-blur-md'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-md" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-brown font-heading text-sm font-extrabold text-brand-white">
            SS
          </span>
          <span className="hidden font-heading text-sm font-bold text-brand-brown sm:block">Setyorini Safitri</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const id = link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring group rounded-md py-2 text-sm font-semibold text-brand-brown transition hover:text-brand-orange"
              >
                {link.label}
                <span
                  className={`mt-1 block h-0.5 bg-brand-orange transition-all ${
                    active === id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            )
          })}
        </div>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-md border border-brand-brownLight/50 text-brand-brown md:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-brand-brownLight/20 bg-brand-beige transition-all md:hidden ${
          open ? 'max-h-80' : 'max-h-0 border-transparent'
        }`}
      >
        <div className="section-shell flex flex-col py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md py-3 font-semibold text-brand-brown"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
