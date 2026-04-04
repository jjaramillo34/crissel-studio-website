'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const logoImage = '/assets/images/logo_photo.png'
const heroImage = '/assets/images/hero.jpeg'

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const highlightMetrics = [
    { value: '+1.5K', label: 'Clientes felices' },
    { value: '10+', label: 'Años de experiencia' },
    { value: '4.9★', label: 'Reseñas' },
  ]

  return (
    <section
      id="hero"
      className="mesh-hero relative min-h-screen overflow-hidden pt-20 flex flex-col"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-subtle opacity-[0.35]"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="absolute -top-40 right-[-10%] h-[min(55vw,520px)] w-[min(55vw,520px)] rounded-full bg-gradient-to-br from-[#E57373]/12 via-rose-200/20 to-transparent blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.5, 0.75, 0.5], scale: [1, 1.03, 1] }
        }
        transition={
          prefersReducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="relative z-10 flex flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 w-full">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center text-center lg:text-left lg:max-w-xl"
          >
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-neutral-600 shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E57373]" />
                Ambato · 2026
              </span>
            </div>

            <div className="mb-6 flex items-center justify-center gap-4 lg:justify-start">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-md ring-1 ring-black/5">
                <Image
                  src={logoImage}
                  alt="Logo de Crissel Studio"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-1"
                  priority
                />
              </div>
              <div className="text-left">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Crissel Studio
                </p>
                <p className="text-sm text-neutral-500">By Cris Pestañas</p>
              </div>
            </div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-neutral-900"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? undefined : { delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
            >
              Mirada, cejas y maquillaje{' '}
              <span className="bg-gradient-to-r from-[#c45c5c] via-[#E57373] to-rose-400 bg-clip-text text-transparent">
                con estilo editorial
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 text-lg text-neutral-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? undefined : { delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
            >
              Especialistas en extensiones de pestañas, diseño de cejas y maquillaje profesional en Ambato.
              Técnicas actuales, productos de calidad y un espacio pensado para que te sientas cómoda.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? undefined : { delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E57373] to-[#e8899f] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-300/40 transition-all hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Reservar una cita en Crissel Studio (se abre en una nueva pestaña)"
              >
                <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                Reservar cita
              </motion.a>

              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur transition-colors hover:border-neutral-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                aria-label="Desplazarse a la sección de servicios"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-[#E57373]" aria-hidden />
                Ver servicios
              </motion.button>

              <Link
                href="/galeria"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-[#b85c5c] transition-colors hover:text-[#9e4e4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Ir a la galería de trabajos"
              >
                Galería
              </Link>
            </motion.div>

            <p className="mt-8 inline-flex items-center justify-center gap-2 text-sm text-neutral-500 lg:justify-start">
              <MapPin className="h-4 w-4 shrink-0 text-[#E57373]" aria-hidden />
              Centro Comercial La Galería, Mera entre Rocafuerte y Bolívar, Ambato
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0.4 } : { delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
            className="flex-1 w-full max-w-xl mx-auto lg:max-w-none"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-neutral-200 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
              <Image
                src={heroImage}
                alt="Interior y ambiente de Crissel Studio en Ambato"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#E57373]/10 via-transparent to-rose-100/25"
                aria-hidden
              />
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/75 px-4 py-3 text-left shadow-lg backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Experiencia</p>
                <p className="font-display text-lg text-neutral-900">Belleza natural, resultado profesional</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0.4 } : { delay: 0.35, duration: 0.6 }}
        className="relative z-10 w-full px-4 pb-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200/80 rounded-2xl border border-neutral-200/60 bg-white/60 px-6 py-5 shadow-sm backdrop-blur-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {highlightMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center justify-center py-4 text-center sm:py-2"
            >
              <p className="font-display text-2xl font-semibold tabular-nums text-neutral-900">{metric.value}</p>
              <p className="mt-1 text-sm text-neutral-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0.4 } : { delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:flex flex-col items-center gap-1 text-neutral-400"
        aria-hidden
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-5 rounded-full border border-neutral-300/80 p-1"
        >
          <span className="block mx-auto h-1.5 w-1 rounded-full bg-neutral-400" />
        </motion.span>
      </motion.div>
    </section>
  )
}

export default Hero
