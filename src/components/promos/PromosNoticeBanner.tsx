'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Crown, Ticket, Wand2 } from 'lucide-react'
import { COUPON_FCFS_LIMIT } from '@/data/raffle'

export function PromosNoticeBanner() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-r from-amber-50/95 via-white to-rose-50/90 p-1 shadow-lg shadow-amber-100/40"
    >
      <div className="relative rounded-[1.4rem] bg-white/60 px-5 py-6 sm:px-8 sm:py-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-amber-200/40 to-transparent blur-2xl"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-1 gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-300/50">
              <Ticket className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-amber-950 sm:text-xl">
                Solo {COUPON_FCFS_LIMIT} cupones promo — orden de llegada
              </p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-neutral-700">
                Estamos entregando <strong>{COUPON_FCFS_LIMIT} cupones</strong> para las{' '}
                <strong>primeras {COUPON_FCFS_LIMIT} personas</strong> que reserven durante esta
                campaña. <span className="whitespace-nowrap">Primero en llegar, primero en servirse.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-1 gap-4 border-t border-amber-100/90 pt-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E57373] to-rose-400 text-white shadow-md shadow-rose-200/50">
              <Wand2 className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <p className="flex items-center gap-2 font-display text-lg font-bold text-neutral-900 sm:text-xl">
                <Crown className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />
                Sorteo: maquillaje
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
                Participa con tu número abajo. <strong>El lunes</strong> publicamos a la ganadora y
                <strong> nos pondremos en contacto</strong> por teléfono para coordinar tu cita.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
