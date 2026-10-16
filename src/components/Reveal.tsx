import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  /** Jeda animasi dalam milidetik, untuk efek stagger antar kartu. */
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      className={`reveal ${className}`.trim()}
    >
      {children}
    </div>
  )
}
