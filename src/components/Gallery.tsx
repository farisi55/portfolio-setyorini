import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import { GALLERY, type GalleryItem } from '../data/content'

const TOTAL = GALLERY.length
const MIN_SWIPE = 50

type GalleryImageProps = {
  item: GalleryItem
  className?: string
  fallbackClassName?: string
  fallbackText?: string
  fallbackTextClassName?: string
}

function GalleryImage({
  item,
  className = '',
  fallbackClassName = '',
  fallbackText = item.alt,
  fallbackTextClassName = 'font-heading text-base font-bold text-brand-brownLight',
}: GalleryImageProps) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div
        role="img"
        aria-label={item.alt}
        className={`grid h-full w-full place-items-center bg-brand-beigeLight p-8 text-center ${fallbackClassName}`}
      >
        <p className={fallbackTextClassName}>{fallbackText}</p>
      </div>
    )
  }

  return <img src={item.src} alt={item.alt} className={className} loading="lazy" onError={() => setMissing(true)} />
}

export function Gallery() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const touchStart = useRef(0)
  const touchEnd = useRef(0)
  const item = GALLERY[active]

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL) return
    setActive(index)
    setAnimKey((key) => key + 1)
  }, [])

  const prev = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.changedTouches[0].clientX
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    touchEnd.current = event.changedTouches[0].clientX
    const delta = touchStart.current - touchEnd.current

    if (Math.abs(delta) < MIN_SWIPE) return
    if (delta > 0) next()
    if (delta < 0) prev()
  }

  const renderDots = (className: string) => (
    <div role="tablist" aria-label="Gallery navigation" className={className}>
      {GALLERY.map((galleryItem, index) => (
        <button
          key={galleryItem.src}
          type="button"
          role="tab"
          aria-selected={index === active}
          aria-label={`Lihat foto ${index + 1}: ${galleryItem.tag}`}
          onClick={() => goTo(index)}
          className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
            index === active
              ? 'h-2.5 w-8 bg-brand-brown'
              : 'h-2.5 w-2.5 bg-brand-brownLight/40 hover:bg-brand-brownLight/70'
          }`}
        />
      ))}
    </div>
  )

  const renderArrowButton = (direction: 'prev' | 'next', className: string) => {
    const disabled = direction === 'prev' ? active === 0 : active === TOTAL - 1
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

    return (
      <button
        type="button"
        aria-label={direction === 'prev' ? 'Foto sebelumnya' : 'Foto berikutnya'}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={direction === 'prev' ? prev : next}
        className={`${className} ${disabled ? 'pointer-events-none opacity-30' : 'cursor-pointer'}`}
      >
        <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
      </button>
    )
  }

  return (
    <section id="gallery" className="bg-brand-beige py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-10 lg:hidden">
          <p className="section-label">Gallery</p>
          <div className="flex items-end justify-between gap-6">
            <h2 className="section-title max-w-xl">Momen &amp; Aktivitas Nyata</h2>
            <span className="font-body text-sm text-brand-gray">
              <span className="font-bold text-brand-brown">{active + 1}</span>
              <span className="mx-1 text-brand-brownLight/60">/</span>
              {TOTAL}
            </span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            {renderArrowButton(
              'prev',
              'absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-brownLight/30 bg-brand-white/90 text-brand-brown shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-brand-brown hover:bg-brand-brown hover:text-brand-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige lg:hidden',
            )}

            {renderArrowButton(
              'next',
              'absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-brownLight/30 bg-brand-white/90 text-brand-brown shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-brand-brown hover:bg-brand-brown hover:text-brand-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige lg:hidden',
            )}

            <div
              key={animKey}
              role="region"
              aria-label={`Gallery foto ${active + 1} dari ${TOTAL}`}
              tabIndex={0}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="animate-fade-up relative overflow-hidden rounded-2xl shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige"
            >
              <div className="aspect-[4/5] w-full">
                <GalleryImage
                  key={item.src}
                  item={item}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-brown/75 via-brand-brown/15 to-transparent"
              />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="inline-flex rounded-full border border-brand-brownLight/50 bg-brand-white/10 px-3 py-1 font-body text-xs font-bold uppercase tracking-[0.16em] text-brand-brownLight backdrop-blur-sm">
                  {item.tag}
                </span>
                <p className="mt-2 font-heading text-base font-semibold leading-snug text-brand-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:text-lg">
                  {item.caption}
                </p>
              </div>

              <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-xl border border-brand-white/10" />
            </div>

            {renderDots('mt-5 flex items-center justify-center gap-2.5 lg:hidden')}
          </div>

          <div className="hidden flex-col justify-center lg:flex">
            <p className="section-label">Gallery</p>
            <h2 className="section-title">Momen &amp; Aktivitas Nyata</h2>

            <div className="my-6 h-px w-16 bg-brand-brownLight/40" />

            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-full border border-brand-brownLight/40 bg-brand-beige px-3 py-1 font-body text-xs font-bold uppercase tracking-[0.16em] text-brand-brownLight">
                {item.tag}
              </span>
              <span className="font-body text-sm text-brand-gray">
                <span className="font-bold text-brand-brown">{active + 1}</span>
                <span className="mx-1 text-brand-brownLight/50">/</span>
                {TOTAL}
              </span>
            </div>

            <p className="mt-4 font-heading text-xl font-semibold leading-snug text-brand-brown sm:text-2xl">
              {item.caption}
            </p>

            <div className="my-8 h-px w-full bg-brand-brownLight/20" />

            <div className="hidden items-center gap-4 lg:flex">
              {renderArrowButton(
                'prev',
                'flex h-12 w-12 items-center justify-center rounded-full border border-brand-brownLight/30 bg-brand-white text-brand-brown shadow-md transition-all duration-200 hover:border-brand-brown hover:bg-brand-brown hover:text-brand-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige',
              )}

              {renderDots('flex items-center gap-2')}

              {renderArrowButton(
                'next',
                'flex h-12 w-12 items-center justify-center rounded-full border border-brand-brownLight/30 bg-brand-white text-brand-brown shadow-md transition-all duration-200 hover:border-brand-brown hover:bg-brand-brown hover:text-brand-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige',
              )}
            </div>

            <div className="mt-6 hidden gap-3 lg:flex">
              {GALLERY.map((galleryItem, index) => (
                <button
                  key={`thumb-${galleryItem.src}`}
                  type="button"
                  aria-label={`Pilih foto ${index + 1}: ${galleryItem.tag}`}
                  onClick={() => goTo(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige ${
                    index === active
                      ? 'scale-105 opacity-100 ring-2 ring-brand-orange ring-offset-2 ring-offset-brand-beige'
                      : 'opacity-50 hover:scale-105 hover:opacity-80'
                  }`}
                >
                  <div className="aspect-[4/5] w-16">
                    <GalleryImage
                      item={galleryItem}
                      className="h-full w-full object-cover object-center"
                      fallbackClassName="px-2"
                      fallbackText={galleryItem.tag}
                      fallbackTextClassName="font-heading text-[10px] font-extrabold leading-tight text-brand-brownLight"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
