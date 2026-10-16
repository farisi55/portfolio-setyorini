import { MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import type { WhatsAppIntent } from '../data/offer'
import { buildIntentUrl } from '../lib/whatsapp'

const VARIANT_CLASSES = {
  primary: 'bg-brand-brown text-brand-white hover:bg-brand-brownMid',
  secondary: 'border border-brand-brown text-brand-brown hover:border-brand-orange hover:text-brand-orange',
} as const

const SIZE_CLASSES = {
  md: 'px-6 py-4',
  sm: 'px-4 py-2.5',
} as const

type WhatsAppLinkProps = {
  intent: WhatsAppIntent
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  className?: string
}

export function WhatsAppLink({
  intent,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: WhatsAppLinkProps) {
  return (
    <a
      href={buildIntentUrl(intent)}
      target="_blank"
      rel="noopener noreferrer"
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      <MessageCircle size={size === 'sm' ? 16 : 18} aria-hidden="true" />
      {children}
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  )
}
