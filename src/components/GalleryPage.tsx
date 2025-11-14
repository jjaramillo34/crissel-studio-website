import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, Sparkles, Star, X } from 'lucide-react'
import { SectionHeader } from './sections/SectionHeader'
import { Seo } from '@/components/Seo'

const galleryFiles = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true
}) as Record<string, { default: string }>

const gallerySourceMap: Record<string, string> = Object.fromEntries(
  Object.entries(galleryFiles).map(([path, mod]) => {
    const name = path.split('/').pop() ?? path
    return [name, mod.default]
  })
)

type GalleryCategory = 'extensiones' | 'cejas' | 'maquillaje'

const imageCategories: Record<string, { label: string; path: GalleryCategory; accent: string }> = {
  'extensiones-pestanas-1.jpg': { label: 'Extensión de pestañas', path: 'extensiones', accent: 'from-[#E57373] to-[#F8BBD9]' },
  'extensiones-pestanas-2.jpg': { label: 'Extensión de pestañas', path: 'extensiones', accent: 'from-[#E57373] to-[#F8BBD9]' },
  'extensiones-pestanas-3.jpg': { label: 'Extensión de pestañas', path: 'extensiones', accent: 'from-[#E57373] to-[#F8BBD9]' },
  'extensiones-pestanas-4.jpg': { label: 'Extensión de pestañas', path: 'extensiones', accent: 'from-[#E57373] to-[#F8BBD9]' },
  'maquillaje-fantasia-1.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-2.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-3.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-4.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-5.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-6.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-7.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-8.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-9.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-10.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-fantasia-11.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'maquillaje-social-1.jpg': { label: 'Maquillaje social', path: 'maquillaje', accent: 'from-[#F8BBD9] to-[#FDECF6]' },
  'microblading-cejas-1.jpg': { label: 'Microblading de cejas', path: 'cejas', accent: 'from-[#FDECF6] to-[#F8BBD9]' },
  'microblading-cejas-2.jpg': { label: 'Microblading de cejas', path: 'cejas', accent: 'from-[#FDECF6] to-[#F8BBD9]' },
  'planchado-cejas-1.jpg': { label: 'Planchado de cejas', path: 'cejas', accent: 'from-[#FDECF6] to-[#F8BBD9]' },
  'planchado-cejas-2.jpg': { label: 'Planchado de cejas', path: 'cejas', accent: 'from-[#FDECF6] to-[#F8BBD9]' }
}

const categories = [
  { id: 'all', label: 'Todo', icon: Sparkles },
  { id: 'extensiones', label: 'Extensiones de Pestañas', icon: Eye },
  { id: 'cejas', label: 'Diseño de Cejas', icon: Star },
  { id: 'maquillaje', label: 'Maquillaje', icon: Sparkles }
] as const

const galleryItems = Object.entries(imageCategories)
  .map(([name, meta]) => {
    const src = gallerySourceMap[name]
    if (!src) return null
    return { name, src, meta }
  })
  .filter((item): item is { name: string; src: string; meta: (typeof imageCategories)[string] } => item !== null)

const categoryIconMap = {
  extensiones: Eye,
  cejas: Star,
  maquillaje: Sparkles
} as const

const formatTitle = (name: string) =>
  name.replace(/[-_]/g, ' ').replace(/\..+$/, '').replace(/\b\w/g, (char) => char.toUpperCase())

const GalleryPage = () => {
  const prefersReducedMotion = useReducedMotion()
  const [selected, setSelected] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]['id']>('all')
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryItems
    return galleryItems.filter((item) => item.meta.path === activeCategory)
  }, [activeCategory])

  const openLightbox = useCallback((index: number) => {
    setSelected(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelected(null)
  }, [])

  const showPrevious = useCallback(() => {
    setSelected((prev) => {
      if (prev === null) return prev
      return prev > 0 ? prev - 1 : prev
    })
  }, [])

  const showNext = useCallback(() => {
    setSelected((prev) => {
      if (prev === null) return prev
      return prev < filteredImages.length - 1 ? prev + 1 : prev
    })
  }, [filteredImages.length])

  useEffect(() => {
    if (!isKeyboardNav) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      } else if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeLightbox, isKeyboardNav, showNext, showPrevious])

  useEffect(() => {
    if (selected !== null && selected >= filteredImages.length) {
      setSelected(filteredImages.length ? filteredImages.length - 1 : null)
    }
  }, [filteredImages.length, selected])

  useEffect(() => {
    if (selected !== null) {
      setIsKeyboardNav(true)
    }
  }, [selected])

  return (
    <>
      <Seo
        title="Galería Crissel Studio"
        description="Inspírate con nuestros antes y después en extensiones, cejas y maquillaje. Filtra por categoría y conoce el trabajo de nuestras especialistas."
      />
      <motion.section
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#E57373]/20 blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.35 }
              : { opacity: [0.25, 0.6, 0.25], scale: [1, 1.1, 1] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 right-10 h-64 w-64 rounded-full bg-[#F8BBD9]/20 blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.35 }
              : { opacity: [0.3, 0.5, 0.3], scale: [0.95, 1.08, 0.95] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }
          }
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.7, ease: 'easeOut' }}
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/80 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Transformaciones reales de nuestras clientas
            </motion.div>
            <motion.h1
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="mb-3 text-4xl font-bold text-[#E57373] sm:text-5xl"
            >
              Galería de Belleza
            </motion.h1>
            <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
              Explora nuestros looks más recientes en extensiones de pestañas, diseño de cejas y maquillaje profesional.
              Cada imagen refleja nuestro compromiso con la precisión y el cuidado personalizado.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = category.id === activeCategory
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373] ${
                    isActive
                      ? 'border-transparent bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white shadow-lg'
                      : 'border-[#E57373]/30 bg-white/80 text-[#E57373] hover:border-[#E57373]/60 hover:shadow'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {category.label}
                </motion.button>
              )
            })}
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 20 }) },
              visible: {
                opacity: 1,
                ...(prefersReducedMotion ? {} : { y: 0 }),
                transition: prefersReducedMotion
                  ? { duration: 0.4 }
                  : { duration: 0.4, staggerChildren: 0.05, ease: 'easeOut' }
              }
            }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          >
            {filteredImages.map((item, index) => {
              const { name, src, meta } = item
              const title = formatTitle(name)
              const categoryLabel = meta.label
              const ServiceIcon = categoryIconMap[meta.path] ?? Sparkles
              return (
                <motion.article
                  key={name}
                  variants={{
                    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { scale: 0.96 }) },
                    visible: {
                      opacity: 1,
                      ...(prefersReducedMotion ? {} : { scale: 1 }),
                      transition: prefersReducedMotion ? { duration: 0.3 } : { duration: 0.35, ease: 'easeOut' }
                    }
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                    aria-label={`Ver imagen ${title}`}
                  >
                    <img
                      src={src}
                      alt={title}
                      className="h-40 w-full object-cover transition-transform duration-300 sm:h-48 md:h-56 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-left text-white">
                      <p className="text-sm font-semibold">{categoryLabel}</p>
                      <span className="text-xs text-white/70">Crissel Studio</span>
                    </div>
                    <span
                      className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-0"
                    >
                      <span className={`block h-2 w-2 rounded-full bg-gradient-to-r ${meta.accent}`} />
                      {categoryLabel}
                    </span>
                  </button>
                </motion.article>
              )
            })}
          </motion.div>
        </div>

        {selected !== null && filteredImages[selected] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={closeLightbox}
          >
            {(() => {
              const currentItem = filteredImages[selected]
              const title = formatTitle(currentItem.name)
              return (
                <motion.div
                  className="relative flex w-full max-w-4xl flex-col items-center gap-6 rounded-3xl bg-white/10 p-6 backdrop-blur-xl"
                  onClick={(event) => event.stopPropagation()}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.4, ease: 'easeOut' }}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Imagen ${title}`}
                >
                  <motion.button
                    type="button"
                    onClick={closeLightbox}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white shadow-lg hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    whileHover={prefersReducedMotion ? undefined : { rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Cerrar galería ampliada"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>

                  <figure className="flex w-full flex-col items-center gap-4">
                    <img
                      src={currentItem.src}
                      alt={title}
                      className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl"
                    />
                    <figcaption className="text-center text-white">
                      <p className="text-lg font-semibold">{title}</p>
                      <p className="text-sm text-white/80">
                        {selected + 1} / {filteredImages.length} &nbsp;•&nbsp; Crissel Studio
                      </p>
                    </figcaption>
                  </figure>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <motion.button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        showPrevious()
                      }}
                      disabled={selected === 0}
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Ver imagen anterior"
                    >
                      Anterior
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        showNext()
                      }}
                      disabled={selected === filteredImages.length - 1}
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Ver imagen siguiente"
                    >
                      Siguiente
                    </motion.button>
                  </div>
                </motion.div>
              )
            })()}
          </motion.div>
        )}
      </motion.section>
    </>
  )
}

export default GalleryPage
