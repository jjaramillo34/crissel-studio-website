'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Background,
  Button,
  Column,
  Dialog,
  Icon,
  Media,
  Row,
  SegmentedControl,
  Text,
} from '@once-ui-system/core'
import { SectionHeader } from './sections/SectionHeader'

type GalleryCategory = 'extensiones' | 'cejas' | 'maquillaje' | 'unas'

const imageCategories: Record<string, { label: string; path: GalleryCategory }> = {
  'unas-1.jpg': { label: 'Uñas', path: 'unas' },
  'unas-nail-art-video.mp4': { label: 'Nail art', path: 'unas' },
  'unas-2.jpg': { label: 'Uñas', path: 'unas' },
  'unas-3.jpg': { label: 'Uñas', path: 'unas' },
  'extensiones-pestanas-1.jpg': { label: 'Extensión de pestañas', path: 'extensiones' },
  'extensiones-pestanas-2.jpg': { label: 'Extensión de pestañas', path: 'extensiones' },
  'extensiones-pestanas-3.jpg': { label: 'Extensión de pestañas', path: 'extensiones' },
  'extensiones-pestanas-4.jpg': { label: 'Extensión de pestañas', path: 'extensiones' },
  'maquillaje-fantasia-1.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-2.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-3.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-4.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-5.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-6.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-7.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-8.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-9.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-10.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-11.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-catrina-1.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-gato-1.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-mario-bros.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-catrina-novia-1.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-mariposa.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-catrina-2.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-gato-2.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-calavera.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-catrinas.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-joker-catrina.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-catrina-3.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-fantasia-catrina-novia-2.jpg': { label: 'Maquillaje de fantasía', path: 'maquillaje' },
  'promo-maquillaje-fantasia.jpg': { label: 'Promo · Maquillaje de fantasía', path: 'maquillaje' },
  'maquillaje-social-1.jpg': { label: 'Maquillaje social', path: 'maquillaje' },
  'microblading-cejas-1.jpg': { label: 'Microblading de cejas', path: 'cejas' },
  'microblading-cejas-2.jpg': { label: 'Microblading de cejas', path: 'cejas' },
  'planchado-cejas-1.jpg': { label: 'Planchado de cejas', path: 'cejas' },
  'planchado-cejas-2.jpg': { label: 'Planchado de cejas', path: 'cejas' },
}

/**
 * Real pixel sizes, so each photo keeps its shape in the masonry wall (nothing gets cropped).
 * Photos missing here (e.g. new uñas photos) are shown as squares.
 */
const imageSizes: Record<string, [number, number]> = {
  'maquillaje-fantasia-1.jpg': [905, 1280],
  'maquillaje-fantasia-2.jpg': [1200, 1600],
  'maquillaje-fantasia-6.jpg': [1132, 1600],
  'maquillaje-fantasia-7.jpg': [940, 788],
  'maquillaje-fantasia-8.jpg': [1200, 1600],
  'maquillaje-fantasia-10.jpg': [1131, 1600],
  'maquillaje-fantasia-gato-1.jpg': [1200, 1600],
  'maquillaje-fantasia-mario-bros.jpg': [768, 1024],
  'maquillaje-fantasia-catrina-novia-1.jpg': [1200, 1600],
  'maquillaje-fantasia-catrina-1.jpg': [768, 1024],
  'maquillaje-fantasia-mariposa.jpg': [768, 1024],
  'maquillaje-fantasia-gato-2.jpg': [540, 521],
  'maquillaje-fantasia-catrina-2.jpg': [768, 1024],
  'maquillaje-fantasia-calavera.jpg': [768, 1024],
  'maquillaje-fantasia-joker-catrina.jpg': [768, 1024],
  'maquillaje-fantasia-catrina-3.jpg': [768, 1024],
  'maquillaje-fantasia-catrinas.jpg': [1024, 768],
  'maquillaje-fantasia-catrina-novia-2.jpg': [768, 1024],
  'unas-1.jpg': [1200, 1600],
  'unas-2.jpg': [1600, 1200],
  'unas-3.jpg': [720, 1280],
  'unas-nail-art-video.mp4': [480, 848],
}

type CategoryFilter = 'all' | GalleryCategory

const categories: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'Todo', icon: 'sparkle' },
  { id: 'extensiones', label: 'Extensiones de Pestañas', icon: 'eye' },
  { id: 'cejas', label: 'Diseño de Cejas', icon: 'crown' },
  { id: 'maquillaje', label: 'Maquillaje', icon: 'heart' },
  { id: 'unas', label: 'Uñas', icon: 'nails' },
]

/** File names can't hold accents, so restore them for display titles */
const accentFixes: Record<string, string> = {
  Unas: 'Uñas',
  Fantasia: 'Fantasía',
  Pestanas: 'Pestañas',
}

const formatTitle = (name: string) =>
  name
    .replace(/\..+$/, '')
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .map((word) => accentFixes[word] ?? word)
    .join(' ')

const galleryItems = Object.entries(imageCategories).map(([name, meta]) => {
  const [width, height] = imageSizes[name] ?? [1, 1]
  return {
    name,
    src: `/assets/gallery/${name}`,
    title: formatTitle(name),
    meta,
    ratio: `${width} / ${height}`,
    isVideo: name.endsWith('.mp4'),
  }
})

/**
 * Fades photos up as they scroll into view. On first load, photos already on screen are shown
 * as-is (no flicker); after a filter change, the visible ones animate in too.
 */
const useMasonryReveal = (filterKey: string) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = [...container.querySelectorAll<HTMLElement>('.crissel-masonry__item')]
    const initial = isFirstRender.current
    isFirstRender.current = false
    container.dataset.reveal = 'on'

    let batch = 0
    const show = (el: HTMLElement) => {
      el.style.setProperty('--d', String(batch++ % 8))
      el.classList.add('is-visible')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        batch = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    for (const el of items) {
      if (initial && el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-static')
      } else {
        observer.observe(el)
      }
    }
    return () => observer.disconnect()
  }, [filterKey])

  return containerRef
}

const GalleryPage = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const filteredImages =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.meta.path === activeCategory)

  const masonryRef = useMasonryReveal(activeCategory)
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const activeIcon = categories.find((c) => c.id === activeCategory)?.icon ?? 'sparkle'
  const current = selected !== null ? filteredImages[selected] : undefined
  const isFirst = selected === 0
  const isLast = selected === filteredImages.length - 1

  const showPrevious = useCallback(() => {
    setSelected((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
  }, [])

  const showNext = useCallback(() => {
    setSelected((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : prev))
  }, [filteredImages.length])

  // Dialog handles Escape, focus trap, scroll lock and focus restore; add arrow-key paging.
  useEffect(() => {
    if (selected === null) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selected, showNext, showPrevious])

  return (
    <Column as="main" fillWidth horizontal="center" overflow="hidden">
      <Background
        position="absolute"
        top="0"
        left="0"
        fill
        pointerEvents="none"
        gradient={{
          display: true,
          colorStart: 'brand-alpha-medium',
          x: 0,
          y: 0,
          width: 150,
          height: 100,
          opacity: 50,
        }}
      />

      <Column
        zIndex={1}
        fillWidth
        maxWidth="l"
        paddingX="24"
        paddingTop="104"
        paddingBottom="80"
        gap="40"
      >
        <Column gap="32" horizontal="center">
          <Button href="/" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al inicio" />
          <SectionHeader
            titleAs="h1"
            eyebrow="Inspiración"
            title="Galería de"
            titleAccent="belleza"
            description="Transformaciones reales: extensiones de pestañas, diseño de cejas, maquillaje y uñas. Filtra por categoría y ve el trabajo del estudio en Ambato."
          />
        </Column>

        <Row horizontal="center">
          <SegmentedControl
            fillWidth={false}
            selected={activeCategory}
            onToggle={(value) => {
              setActiveCategory(value as CategoryFilter)
              setSelected(null)
            }}
            buttons={categories.map((category) => ({
              value: category.id,
              label: category.label,
              prefixIcon: category.icon,
            }))}
          />
        </Row>

        {filteredImages.length === 0 ? (
          <Column
            fillWidth
            center
            gap="12"
            paddingY="64"
            radius="l"
            background="brand-alpha-weak"
            border="brand-alpha-medium"
          >
            <Icon name={activeIcon} size="xl" onBackground="brand-medium" />
            <Text variant="body-default-m" onBackground="neutral-medium" align="center">
              {activeCategory === 'unas'
                ? 'Muy pronto compartiremos fotos de nuestros trabajos de uñas.'
                : 'No hay fotos en esta categoría por ahora.'}
            </Text>
          </Column>
        ) : (
          <div ref={masonryRef} key={activeCategory} className="crissel-masonry">
            {filteredImages.map((item, index) => (
              <div key={item.name} className="crissel-masonry__item">
                <Column
                  as="button"
                  fillWidth
                  className="crissel-gallery-thumb"
                  onClick={() => setSelected(index)}
                  aria-label={`Ver imagen ${item.title}`}
                >
                  <Media
                    src={item.src}
                    alt={item.title}
                    aspectRatio={item.ratio}
                    radius="l"
                    sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    // the first row is on screen at load (and is the LCP), so don't lazy-load it
                    priority={index < 4}
                    autoplay={item.isVideo ? !reducedMotion : undefined}
                  />
                  {item.isVideo && (
                    <span className="crissel-gallery-thumb__badge" aria-hidden>
                      ▶ Video
                    </span>
                  )}
                  <Column className="crissel-gallery-thumb__caption" gap="2" padding="12">
                    <Text variant="body-strong-s" onSolid="neutral-strong">
                      {item.meta.label}
                    </Text>
                    <Text variant="body-default-xs" onSolid="neutral-weak">
                      Crissel Studio
                    </Text>
                  </Column>
                </Column>
              </div>
            ))}
          </div>
        )}
      </Column>

      <Dialog
        isOpen={current !== undefined}
        onClose={() => setSelected(null)}
        title={current?.title ?? ''}
        description={
          current ? `${(selected ?? 0) + 1} / ${filteredImages.length} · ${current.meta.label}` : undefined
        }
        maxWidth={56}
        footer={
          <Row fillWidth horizontal="between" gap="8">
            <Button
              variant="secondary"
              prefixIcon="chevronLeft"
              label="Anterior"
              onClick={showPrevious}
              disabled={isFirst}
              aria-label="Ver imagen anterior"
            />
            <Button
              variant="secondary"
              suffixIcon="chevronRight"
              label="Siguiente"
              onClick={showNext}
              disabled={isLast}
              aria-label="Ver imagen siguiente"
            />
          </Row>
        }
      >
        {current && (
          <Media
            key={current.src}
            src={current.src}
            alt={current.title}
            aspectRatio={current.ratio}
            controls={current.isVideo}
            objectFit="contain"
            radius="l"
            sizes="(max-width: 960px) 100vw, 900px"
            style={{ maxHeight: '65vh' }}
          />
        )}
      </Dialog>
    </Column>
  )
}

export default GalleryPage
