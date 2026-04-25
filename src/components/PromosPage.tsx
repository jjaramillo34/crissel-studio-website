'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  CalendarHeart,
  Copy,
  Gift,
  MessageCircle,
  Sparkles,
  Check,
} from 'lucide-react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Seo } from '@/components/Seo'
import {
  MADRE_COUPON_WHATSAPP_MESSAGE,
  PROMO_WHATSAPP_LINES,
  promos,
  whatsappHref,
} from '@/data/promos'
import { PromosNoticeBanner } from '@/components/promos/PromosNoticeBanner'
import { RaffleSection } from '@/components/promos/RaffleSection'

const PromosPage = () => {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const featured = promos.filter((p) => p.featured)
  const couponCode = featured[0]?.couponCode

  const copyCoupon = useCallback(async () => {
    if (!couponCode) return
    try {
      await navigator.clipboard.writeText(couponCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [couponCode])

  return (
    <>
      <Seo
        title="Promociones y cupones | Crissel Studio Ambato"
        description="Promos, 20 cupones orden de llegada, sorteo de maquillaje y cupón MADRE (5%) al reservar por WhatsApp. Crissel Studio Ambato."
        type="website"
      />
      <div className="relative min-h-screen overflow-hidden px-4 pb-20 pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(244,180,196,0.45),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_50%,rgba(212,175,55,0.12),transparent_50%),radial-gradient(ellipse_70%_50%_at_0%_80%,rgba(229,115,115,0.08),transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c45c5c' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-6xl sm:px-2">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0.3 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }
            className="mb-10"
          >
            <div className="mb-8 flex justify-center sm:justify-start">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-rose-200/80 bg-white/90 px-4 py-2.5 text-sm font-medium text-[#c45c5c] shadow-sm backdrop-blur-sm transition-all hover:border-[#E57373]/50 hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                Volver al inicio
              </Link>
            </div>

            <SectionHeader
              titleAs="h1"
              titleClassName="text-4xl sm:text-5xl lg:text-[2.85rem] max-w-3xl mx-auto leading-[1.12]"
              eyebrow="Edición limitada"
              eyebrowIcon={Sparkles}
              title={
                <>
                  Promos que{' '}
                  <span className="bg-gradient-to-r from-[#9a6b2f] via-[#c9a227] to-[#E57373] bg-clip-text text-transparent">
                    enamoran
                  </span>
                </>
              }
              description="Cupones, combos y fechas especiales. Escríbenos por WhatsApp con el mensaje listo y menciona tu cupón para aplicar descuentos."
              align="center"
            />
          </motion.div>

          <PromosNoticeBanner />

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {featured.map((promo, index) => (
              <motion.article
                key={promo.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.3 }
                    : { delay: 0.08 * index, duration: 0.65, ease: [0.22, 1, 0.36, 1] }
                }
                className="group relative overflow-hidden rounded-[2rem] border border-rose-200/60 bg-gradient-to-br from-white/95 via-rose-50/40 to-amber-50/30 p-1 shadow-[0_24px_80px_-24px_rgba(196,92,92,0.35)] backdrop-blur-md"
              >
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-amber-200/30 to-rose-200/20 blur-2xl" aria-hidden />
                <div className="relative rounded-[1.85rem] bg-white/70 p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-50 to-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900/90">
                      <CalendarHeart className="h-3.5 w-3.5" aria-hidden />
                      {promo.tag}
                    </span>
                    <span className="text-sm font-medium text-neutral-600">{promo.validLabel}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                    {promo.title}
                  </h2>
                  <p className="mt-2 text-lg text-neutral-700">{promo.subtitle}</p>

                  <ul className="mt-6 space-y-2">
                    {promo.services.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm font-medium text-neutral-800"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E57373]/15 to-amber-100/80 text-[#c45c5c]">
                          <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:items-center">
                    <div className="relative overflow-hidden rounded-2xl border border-rose-100/90 bg-neutral-50/80 shadow-inner">
                      <Image
                        src={promo.imageSrc}
                        alt={promo.imageAlt}
                        width={640}
                        height={800}
                        className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-5">
                      <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/90 to-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber-900/70">
                          Inversión promo
                        </p>
                        <p className="mt-1 font-display text-5xl font-bold tracking-tight text-[#8b5a2b] sm:text-6xl">
                          {promo.price}
                        </p>
                        {promo.priceNote && (
                          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-700">
                            <Gift className="h-4 w-4 shrink-0 text-rose-500" aria-hidden />
                            {promo.priceNote}
                          </p>
                        )}
                      </div>
                      {promo.perks.map((perk) => (
                        <p
                          key={perk}
                          className="text-center font-display text-lg font-semibold text-[#c45c5c] sm:text-left"
                        >
                          {perk}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.aside
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
              className="flex flex-col gap-6"
            >
              <div className="rounded-3xl border border-rose-200/70 bg-white/85 p-6 shadow-lg shadow-rose-200/20 backdrop-blur-md sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-600/90">
                  Cupón activo
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="font-display text-4xl font-bold tracking-[0.2em] text-neutral-900">
                    {couponCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyCoupon}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-2 text-sm font-semibold text-[#c45c5c] transition hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden />
                        Copiar código
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Menciona el cupón <strong className="text-neutral-800">{couponCode}</strong> al
                  agendar por WhatsApp y obtén{' '}
                  <strong className="text-neutral-800">5% de descuento</strong> sobre tu servicio
                  elegible.
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200/80 bg-gradient-to-b from-white to-rose-50/30 p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-neutral-900">
                  Agenda por WhatsApp
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  El mensaje ya incluye tu cupón. Elige la línea que prefieras:
                </p>
                <p className="mt-3 rounded-xl border border-dashed border-rose-200/80 bg-white/80 p-3 text-xs leading-relaxed text-neutral-600">
                  «{MADRE_COUPON_WHATSAPP_MESSAGE}»
                </p>
                <ul className="mt-5 space-y-3">
                  {PROMO_WHATSAPP_LINES.map((line) => (
                    <li key={line.id}>
                      <a
                        href={whatsappHref(line.waE164, MADRE_COUPON_WHATSAPP_MESSAGE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
                      >
                        <span className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
                          <span>
                            WhatsApp {line.label}
                            <span className="block text-xs font-normal opacity-90">
                              {line.displayNational}
                            </span>
                          </span>
                        </span>
                        <span className="shrink-0 text-xs font-bold uppercase opacity-95">Abrir</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-amber-100/90 bg-gradient-to-br from-amber-50/50 to-white p-6 text-center sm:text-left">
                <p className="font-display text-sm font-semibold text-amber-900/80">
                  Próximas promos
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Seguiremos sumando campañas y fechas especiales en esta misma página.
                </p>
              </div>
            </motion.aside>
          </div>

          <RaffleSection />
        </div>
      </div>
    </>
  )
}

export default PromosPage
