'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Eye,
  ShoppingBag,
  Sparkles,
  Package,
  MessageCircle,
} from 'lucide-react'
import { SectionHeader } from './sections/SectionHeader'
import { Seo } from '@/components/Seo'

const WHATSAPP = '593992950683'

type ShopCategory = 'todas' | 'pestanas' | 'parches' | 'otros'

type ShopProduct = {
  id: string
  name: string
  short: string
  description: string
  category: Exclude<ShopCategory, 'todas'>
  highlight?: string
}

const products: ShopProduct[] = [
  {
    id: 'nagaraku-ext-classic',
    name: 'Extensiones Nagaraku — clásico & natural',
    short: 'Pestañas sintéticas premium para look natural o rimel.',
    description:
      'Fibras suaves, curvatura estable y compatibilidad con técnica clásica o volumen ligero. Ideales para retoques y aplicación profesional en estudio.',
    category: 'pestanas',
    highlight: 'Best seller',
  },
  {
    id: 'nagaraku-ext-volume',
    name: 'Extensiones Nagaraku — volumen & híbrido',
    short: 'Más densidad y drama sin perder ligereza.',
    description:
      'Opciones para efecto híbrido o volumen ruso según disponibilidad. Pregunta por curvaturas (C, D, etc.) y grosor para tu diseño.',
    category: 'pestanas',
  },
  {
    id: 'nagaraku-patches-gel',
    name: 'Parches de hidrogel Nagaraku',
    short: 'Protección y comodidad durante el servicio de pestañas.',
    description:
      'Parches para aislar pestañas inferiores, adherencia uniforme y retiro suave. Indicados para extensiones y procedimientos de mirada.',
    category: 'parches',
    highlight: 'Esencial en cabina',
  },
  {
    id: 'nagaraku-patches-thin',
    name: 'Parches finos / flex Nagaraku',
    short: 'Alternativas según técnica y sensibilidad de la clienta.',
    description:
      'Formatos que se adaptan al contorno del ojo. Consulta en tienda qué referencia tenemos en stock.',
    category: 'parches',
  },
  {
    id: 'nagaraku-glue-accessories',
    name: 'Pegamentos y auxiliares (según stock)',
    short: 'Complementos profesionales para aplicación segura.',
    description:
      'Adhesivos y consumibles de línea compatible Nagaraku cuando disponemos de importación. Disponibilidad sujeta a pedido.',
    category: 'otros',
  },
  {
    id: 'nagaraku-tools',
    name: 'Accesorios de aplicación',
    short: 'Anillos, micropinceles, esenciales de mesa de trabajo.',
    description:
      'Herramientas y accesorios que usamos en el estudio y podemos ofrecerte para tu kit profesional o retoque en casa (según catálogo vigente).',
    category: 'otros',
  },
]

const categoryLabels: Record<ShopCategory, string> = {
  todas: 'Todas',
  pestanas: 'Pestañas',
  parches: 'Parches',
  otros: 'Más productos',
}

const waLink = (productName: string) => {
  const text = `Hola Crissel Studio 👋 Me interesa: ${productName}. ¿Disponibilidad y precio?`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
}

const ShopPage = () => {
  const prefersReducedMotion = useReducedMotion()
  const [filter, setFilter] = useState<ShopCategory>('todas')

  const filtered = useMemo(() => {
    if (filter === 'todas') return products
    return products.filter((p) => p.category === filter)
  }, [filter])

  return (
    <>
      <Seo
        title="Tienda Nagaraku | Crissel Studio"
        description="Compra extensiones de pestañas Nagaraku, parches de hidrogel y accesorios profesionales. Retiro en Ambato o consulta por WhatsApp."
        type="article"
      />
      <div className="section-brand relative min-h-screen px-4 pb-16 pt-20">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#F8BBD9]/25 blur-3xl"
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.4, 0.65, 0.4], scale: [1, 1.06, 1] }
          }
          transition={
            prefersReducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <div className="relative mx-auto max-w-6xl sm:px-2">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0.4 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
            }
            className="mb-12"
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
              titleClassName="text-4xl sm:text-5xl lg:text-[2.75rem] max-w-3xl mx-auto leading-[1.15]"
              eyebrow="Tienda oficial"
              title={
                <>
                  Productos{' '}
                  <span className="bg-gradient-to-r from-[#c45c5c] via-[#E57373] to-rose-400 bg-clip-text text-transparent">
                    Nagaraku
                  </span>
                </>
              }
              description="Extensiones de pestañas, parches de hidrogel y complementos profesionales de la marca Nagaraku. Compra en el estudio o coordina tu pedido por WhatsApp."
              align="center"
              className="mb-0"
            />
          </motion.div>

          <div className="mb-10 rounded-2xl border border-rose-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E57373] to-[#F8BBD9] text-white shadow-sm">
                  <ShoppingBag className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-neutral-900">Calidad profesional</p>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                    Trabajamos con referencias Nagaraku para nuestros servicios; también puedes llevarte
                    productos según stock. Precios y formatos te los confirmamos al instante.
                  </p>
                </div>
              </div>
              <a
                href={waLink('catálogo Nagaraku')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-r from-[#E57373] to-[#e8899f] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:brightness-105 md:self-center"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {(Object.keys(categoryLabels) as ShopCategory[]).map((key) => {
              const active = filter === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`rounded-2xl border-2 px-4 py-2 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373] ${
                    active
                      ? 'border-transparent bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white shadow-md shadow-rose-200/35'
                      : 'border-rose-100 bg-white text-neutral-700 hover:bg-rose-50'
                  }`}
                  aria-pressed={active}
                >
                  {categoryLabels[key]}
                </button>
              )
            })}
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {filtered.map((product, index) => (
              <motion.li
                key={product.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.3 }
                    : { duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }
                }
                className="flex h-full flex-col rounded-2xl border border-rose-200/70 bg-white/95 p-6 shadow-md shadow-rose-100/20 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#E57373] ring-1 ring-rose-100">
                      {product.category === 'pestanas' ? (
                        <Eye className="h-5 w-5" aria-hidden />
                      ) : product.category === 'parches' ? (
                        <Sparkles className="h-5 w-5" aria-hidden />
                      ) : (
                        <Package className="h-5 w-5" aria-hidden />
                      )}
                    </span>
                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#c45c5c]">
                      {categoryLabels[product.category]}
                    </span>
                  </div>
                  {product.highlight ? (
                    <span className="shrink-0 rounded-full bg-gradient-to-r from-[#E57373]/15 to-[#F8BBD9]/30 px-3 py-1 text-xs font-semibold text-[#b85c5c]">
                      {product.highlight}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#c45c5c]">{product.short}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{product.description}</p>
                <a
                  href={waLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#E57373] bg-white py-3 text-sm font-semibold text-[#c45c5c] transition-all hover:bg-gradient-to-r hover:from-[#E57373] hover:to-[#F8BBD9] hover:text-white hover:border-transparent"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Consultar disponibilidad
                </a>
              </motion.li>
            ))}
          </ul>

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-neutral-600">No hay productos en esta categoría por ahora.</p>
          ) : null}

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-2xl border border-rose-200/80 bg-gradient-to-br from-[#E57373]/10 via-white to-[#F8BBD9]/25 p-8 text-center shadow-sm"
          >
            <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
              ¿Prefieres ver todo en persona?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-600">
              Pasa por Crissel Studio en Ambato o escríbenos para reservar retiro o envío según disponibilidad.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/productos"
                className="inline-flex rounded-2xl border-2 border-[#E57373] bg-white/90 px-6 py-3 text-sm font-semibold text-[#c45c5c] transition-colors hover:bg-rose-50"
              >
                Ver servicios y tarifas
              </Link>
              <a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:brightness-105"
              >
                Reservar cita
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ShopPage
