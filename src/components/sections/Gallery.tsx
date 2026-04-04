'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Eye, Sparkles, Star, Heart, Crown } from 'lucide-react';
import { SectionHeader } from './SectionHeader';



// Use public folder paths for gallery images
const galleryImageFiles = [
  'extensiones-pestanas-1.jpg',
  'extensiones-pestanas-2.jpg',
  'extensiones-pestanas-3.jpg',
  'extensiones-pestanas-4.jpg',
  'maquillaje-fantasia-1.jpg',
  'maquillaje-fantasia-2.jpg',
  'maquillaje-fantasia-3.jpg',
  'maquillaje-fantasia-4.jpg',
  'maquillaje-fantasia-5.jpg',
  'maquillaje-fantasia-6.jpg',
  'maquillaje-fantasia-7.jpg',
  'maquillaje-fantasia-8.jpg',
  'maquillaje-fantasia-9.jpg',
  'maquillaje-fantasia-10.jpg',
  'maquillaje-fantasia-11.jpg',
  'maquillaje-social-1.jpg',
  'microblading-cejas-1.jpg',
  'microblading-cejas-2.jpg',
  'planchado-cejas-1.jpg',
  'planchado-cejas-2.jpg',
]

const images = galleryImageFiles.map((name) => ({
  src: `/assets/gallery/${name}`,
  name,
}))

// Map filenames to categories
const imageCategories: Record<string, string> = {
  // Lashes
  'extensiones-pestanas-1.jpg': 'lashes',
  'extensiones-pestanas-2.jpg': 'lashes',
  'extensiones-pestanas-3.jpg': 'lashes',
  'extensiones-pestanas-4.jpg': 'lashes',
  // Brows
  'microblading-cejas-1.jpg': 'brows',
  'microblading-cejas-2.jpg': 'brows',
  'planchado-cejas-1.jpg': 'brows',
  'planchado-cejas-2.jpg': 'brows',
  // Makeup
  'maquillaje-fantasia-1.jpg': 'makeup',
  'maquillaje-fantasia-2.jpg': 'makeup',
  'maquillaje-fantasia-3.jpg': 'makeup',
  'maquillaje-fantasia-4.jpg': 'makeup',
  'maquillaje-fantasia-5.jpg': 'makeup',
  'maquillaje-fantasia-6.jpg': 'makeup',
  'maquillaje-fantasia-7.jpg': 'makeup',
  'maquillaje-fantasia-8.jpg': 'makeup',
  'maquillaje-fantasia-9.jpg': 'makeup',
  'maquillaje-fantasia-10.jpg': 'makeup',
  'maquillaje-fantasia-11.jpg': 'makeup',
  'maquillaje-social-1.jpg': 'makeup',
}

const categories = [
  { id: 'all', label: 'Todo', icon: Star },
  { id: 'lashes', label: 'Extensiones de Pestañas', icon: Eye },
  { id: 'brows', label: 'Diseño de Cejas', icon: Crown },
  { id: 'makeup', label: 'Maquillaje', icon: Heart },
]

const categoryIconMap = {
  lashes: Eye,
  brows: Crown,
  makeup: Heart,
} as const

const MotionLink = motion(Link)

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState<number|null>(null)

  const prefersReducedMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const filteredImages = useMemo(() => {
    return activeCategory === 'all'
      ? images
      : images.filter(img => imageCategories[img.name ?? ''] === activeCategory)
  }, [activeCategory])
  const activeImage = selected !== null ? filteredImages[selected] : null

  const getImageTitle = useCallback((name?: string) => {
    if (!name) return 'Trabajo de belleza'
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\..+$/, '')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }, [])

  const openLightbox = useCallback((index: number) => {
    setSelected(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelected(null)
  }, [])

  const showPrevious = useCallback(() => {
    setSelected(prev => {
      if (prev === null) return prev
      return prev > 0 ? prev - 1 : prev
    })
  }, [])

  const showNext = useCallback(() => {
    setSelected(prev => {
      if (prev === null) return prev
      return prev < filteredImages.length - 1 ? prev + 1 : prev
    })
  }, [filteredImages.length])

  useEffect(() => {
    if (selected === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeLightbox, selected, showNext, showPrevious])

  useEffect(() => {
    if (selected !== null && selected >= filteredImages.length) {
      setSelected(filteredImages.length ? filteredImages.length - 1 : null)
    }
  }, [filteredImages.length, selected])

  useEffect(() => {
    if (selected !== null) {
      closeButtonRef.current?.focus({ preventScroll: true })
    }
  }, [selected])

  const containerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0 }
        }
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.1,
            duration: 0.5,
            ease: 'easeOut'
          }
        }
      }

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0 }
        }
      }
    : {
        hidden: { opacity: 0, scale: 0.9, y: 16 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.45, ease: 'easeOut' }
        }
      }

  return (
    <section id="galeria" className="section-brand relative scroll-mt-20 py-20 md:scroll-mt-24">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-[#E57373]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.1, 1], rotate: [0, 6, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#F8BBD9]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1.1, 0.95, 1.1], rotate: [5, -5, 5] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow="Galería principal"
          title="Explora los looks más pedidos del estudio"
          description="Filtra por categoría y descubre cómo transformamos pestañas, cejas y maquillaje. Cada imagen es una clienta feliz que confió en nuestro equipo."
        />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          aria-label="Filtros de la galería"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white shadow-md shadow-rose-200/40 focus-visible:outline-[#E57373]'
                    : 'bg-white text-gray-700 border-2 border-rose-100 hover:bg-rose-50 focus-visible:outline-[#F8BBD9]'
                }`}
                aria-pressed={isActive}
              >
                <category.icon className="w-5 h-5" aria-hidden="true" focusable="false" />
                <span>{category.label}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((img, index) => {
            const category = imageCategories[img.name ?? ''] ?? 'all'
            const ServiceIcon = categoryIconMap[category] ?? Sparkles
            const title = getImageTitle(img.name)
            const categoryLabel =
              category === 'all'
                ? 'Destacado'
                : categories.find(({ id }) => id === category)?.label ?? getImageTitle(category)

            return (
              <motion.article
                key={img.name ?? index}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.03, y: -10 }
                }
                className="group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E57373]"
                role="button"
                tabIndex={0}
                aria-label={`${title}. ${category === 'all' ? 'Trabajo destacado' : `Categoría: ${categoryLabel}`}`}
                onClick={() => openLightbox(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openLightbox(index)
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-rose-200/50 shadow-md shadow-rose-100/25 transition-all duration-500 hover:shadow-xl hover:border-rose-200/70">
                  {/* Actual Beauty Work Image */}
                  <div className="aspect-square relative">
                    <img 
                      src={img.src}
                      alt={title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" aria-hidden="true"></div>
                    
                    {/* Service icon overlay */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <ServiceIcon className="w-6 h-6 text-[#E57373]" aria-hidden="true" focusable="false" />
                      </div>
                    </div>

                    {/* Category chip */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur">
                        <ServiceIcon className="w-4 h-4 text-[#E57373]" aria-hidden="true" focusable="false" />
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-sm text-white/80">
                      {category === 'all'
                        ? 'Galería destacada de Crissel Studio'
                        : `Servicio de ${categoryLabel}`}
                    </p>
                  </div>

                  {/* Hover effect - border glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#E57373]/45 transition-all duration-300" aria-hidden="true" />
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.4, duration: 0.8, ease: 'easeOut' }
          }
          className="text-center mt-16"
        >
          <div className="rounded-2xl border border-rose-200/70 bg-white/90 p-8 shadow-md shadow-rose-100/30 backdrop-blur-sm">
            <SectionHeader
              eyebrow="¿Lista para lucir así?"
              title="Reserva tu cita con Crissel Studio"
              description="Agenda online o envíanos un mensaje. Nuestro equipo te guiará para elegir el servicio perfecto y preparar tu próxima transformación."
              align="center"
              className="mb-6"
            />
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MotionLink
                href="/galeria"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#E57373] bg-white/80 px-8 py-3 text-sm font-semibold text-[#c45c5c] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E57373] hover:to-[#F8BBD9] hover:text-white hover:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Ver galería completa"
              >
                Ver galería completa
              </MotionLink>
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block rounded-2xl bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-8 py-4 text-lg font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Abrir reservas online de Crissel Studio en una nueva ventana"
              >
                Reservar cita
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Lightbox Modal */}
      {activeImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={closeLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="relative max-w-4xl w-full flex flex-col items-center gap-6 rounded-3xl bg-white/5 p-6 backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
            initial={{ scale: prefersReducedMotion ? 1 : 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle del trabajo ${getImageTitle(activeImage.name)}`}
          >
            <motion.button
              ref={closeButtonRef}
              type="button"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white text-2xl leading-none hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition"
              onClick={closeLightbox}
              aria-label="Cerrar galería ampliada"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </motion.button>
            <figure className="w-full flex flex-col items-center gap-4">
              <img
                src={activeImage.src}
                alt={getImageTitle(activeImage.name)}
                className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="text-center text-white">
                <p className="text-lg font-semibold">{getImageTitle(activeImage.name)}</p>
                <p className="text-sm text-white/80">
                  {selected !== null
                    ? `Imagen ${selected + 1} de ${filteredImages.length}`
                    : null}
                </p>
              </figcaption>
            </figure>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-white font-medium backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={(event) => {
                  event.stopPropagation()
                  showPrevious()
                }}
                disabled={selected === 0}
                aria-label="Ver imagen anterior"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Anterior
              </motion.button>
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-white font-medium backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={(event) => {
                  event.stopPropagation()
                  showNext()
                }}
                disabled={selected === filteredImages.length - 1}
                aria-label="Ver imagen siguiente"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Siguiente
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Gallery
