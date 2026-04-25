/** Pre-filled WhatsApp text for cupón MADRE (5% descuento). */
export const MADRE_COUPON_WHATSAPP_MESSAGE =
  'Hola, quiero hacer una cita y mencionar el cupón MADRE para obtener el 5% de descuento.'

export const MADRE_COUPON_CODE = 'MADRE'

export type StudioWhatsAppLine = {
  id: string
  label: string
  /** Digits only, country code + Ecuador mobile without leading 0 */
  waE164: string
  /** Human-friendly national format */
  displayNational: string
}

export const PROMO_WHATSAPP_LINES: StudioWhatsAppLine[] = [
  { id: 'a', label: 'Reservas', waE164: '593995059403', displayNational: '099 505 9403' },
  { id: 'b', label: 'Atención', waE164: '593992950683', displayNational: '099 295 0683' },
]

export function whatsappHref(waE164: string, message: string): string {
  const q = encodeURIComponent(message)
  return `https://wa.me/${waE164}?text=${q}`
}

export type PromoEntry = {
  id: string
  /** Short label for badges */
  tag: string
  title: string
  subtitle: string
  validLabel: string
  price: string
  priceNote?: string
  services: string[]
  perks: string[]
  /** Path under /public */
  imageSrc: string
  imageAlt: string
  featured: boolean
  /** If set, show coupon strip + use MADRE message on CTAs */
  couponCode?: string
  couponDiscountLabel?: string
  accent: 'rose-gold'
}

export const promos: PromoEntry[] = [
  {
    id: 'dia-mamita-2026',
    tag: 'Día de la Mamita',
    title: 'Promo Día de la Mamita',
    subtitle: 'Extensión de pestañas + laminado de cejas',
    validLabel: 'Del 5 al 15 de mayo de 2026',
    price: '$40',
    priceNote: 'Incluye obsequio especial',
    services: ['Extensión de pestañas', 'Laminado de cejas'],
    perks: ['Recibe un hermoso obsequio', '¡Agenda tu cita!'],
    imageSrc: '/assets/promos/dia-de-la-mamita-2026.png',
    imageAlt: 'Promoción Día de la Mamita — Crissel Studio',
    featured: true,
    couponCode: MADRE_COUPON_CODE,
    couponDiscountLabel: '5% de descuento adicional',
    accent: 'rose-gold',
  },
]
