// src/lib/whatsapp.ts
// Helper tautan WhatsApp dan email. Nomor diturunkan dari PERSONAL.phone agar tidak ada duplikasi data.
import { PERSONAL } from '../data/content'
import { CONTACT_COPY, WHATSAPP_MESSAGES, type InquiryNeed, type WhatsAppIntent } from '../data/offer'

/** Mengubah nomor lokal (diawali 0) menjadi format internasional tanpa tanda plus, sesuai kebutuhan wa.me. */
export function toWhatsAppNumber(localPhone: string): string {
  const digits = localPhone.replace(/\D/g, '')
  if (digits.startsWith('62')) return digits
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  if (digits.startsWith('8')) return `62${digits}`
  return digits
}

export const WHATSAPP_NUMBER = toWhatsAppNumber(PERSONAL.phone)

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildIntentUrl(intent: WhatsAppIntent): string {
  return buildWhatsAppUrl(WHATSAPP_MESSAGES[intent])
}

export type InquiryFields = {
  name: string
  email: string
  need: InquiryNeed
  date: string
  message: string
}

function needLabel(need: InquiryNeed): string {
  return CONTACT_COPY.needs.find((item) => item.value === need)?.label ?? 'Lainnya'
}

export function buildInquiryMessage(fields: InquiryFields): string {
  const name = fields.name.trim()
  const email = fields.email.trim()
  const date = fields.date.trim()
  const message = fields.message.trim()

  return [
    `Halo Kak Setyorini, saya ${name || 'pengunjung website'}.`,
    `Kebutuhan: ${needLabel(fields.need)}`,
    date ? `Perkiraan waktu: ${date}` : null,
    email ? `Email: ${email}` : null,
    '',
    message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
}

export function buildInquiryWhatsAppUrl(fields: InquiryFields): string {
  return buildWhatsAppUrl(buildInquiryMessage(fields))
}

export function buildInquiryMailto(fields: InquiryFields, to: string): string {
  const name = fields.name.trim() || 'Website Visitor'
  const subject = encodeURIComponent(`Inquiry ${needLabel(fields.need)} dari ${name}`)
  const body = encodeURIComponent(buildInquiryMessage(fields))
  return `mailto:${to}?subject=${subject}&body=${body}`
}
