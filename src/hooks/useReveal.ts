// src/hooks/useReveal.ts
// Menandai elemen "terlihat" sekali saja saat masuk viewport. Tanpa library.
import { useEffect, useRef, useState } from 'react'

type RevealOptions = {
  threshold?: number
  rootMargin?: string
}

export function useReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null)
  // Jika IntersectionObserver tidak tersedia, konten langsung tampil (tidak pernah tersembunyi permanen).
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [visible, threshold, rootMargin])

  return { ref, visible }
}
