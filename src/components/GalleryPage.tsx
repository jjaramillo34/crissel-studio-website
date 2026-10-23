'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Background,
  Button,
  Column,
  Dialog,
  Grid,
  Icon,
  Media,
  RevealFx,
  Row,
  SegmentedControl,
  Text,
} from '@once-ui-system/core'
import { SectionHeader } from './sections/SectionHeader'

type GalleryCategory = 'extensiones' | 'cejas' | 'maquillaje' | 'unas'

const imageCategories: Record<string, { label: string; path: GalleryCategory }> = {
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
  'maquillaje-social-1.jpg': { label: 'Maquillaje social', path: 'maquillaje' },
  'microblading-cejas-1.jpg': { label: 'Microblading de cejas', path: 'cejas' },
  'microblading-cejas-2.jpg': { label: 'Microblading de cejas', path: 'cejas' },
  'planchado-cejas-1.jpg': { label: 'Planchado de cejas', path: 'cejas' },
  'planchado-cejas-2.jpg': { label: 'Planchado de cejas', path: 'cejas' },
}

type CategoryFilter = 'all' | GalleryCategory

const categories: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'Todo', icon: 'sparkle' },
  { id: 'extensiones', label: 'Extensiones de Pestañas', icon: 'eye' },
  { id: 'cejas', label: 'Diseño de Cejas', icon: 'crown' },
  { id: 'maquillaje', label: 'Maquillaje', icon: 'heart' },
  { id: 'unas', label: 'Uñas', icon: 'nails' },
]

const formatTitle = (name: string) =>
  name.replace(/[-_]/g, ' ').replace(/\..+$/, '').replace(/\b\w/g, (char) => char.toUpperCase())

const galleryItems = Object.entries(imageCategories).map(([name, meta]) => ({
  name,
  src: `/assets/gallery/${name}`,
  title: formatTitle(name),
  meta,
}))

const GalleryPage = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const filteredImages =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.meta.path === activeCategory)

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
            description="Transformaciones reales: extensiones de pestañas, diseño de cejas y maquillaje. Filtra por categoría y ve el trabajo del estudio en Ambato."
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
          <Grid columns="4" m={{ columns: 3 }} s={{ columns: 2 }} gap="16">
            {filteredImages.map((item, index) => (
              <RevealFx key={item.name} delay={Math.min(index, 8) * 0.05} translateY="8" fill>
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
                    aspectRatio="4 / 3"
                    radius="l"
                    border="neutral-alpha-weak"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <Column className="crissel-gallery-thumb__caption" gap="2" padding="12">
                    <Text variant="body-strong-s" onSolid="neutral-strong">
                      {item.meta.label}
                    </Text>
                    <Text variant="body-default-xs" onSolid="neutral-weak">
                      Crissel Studio
                    </Text>
                  </Column>
                </Column>
              </RevealFx>
            ))}
          </Grid>
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
            aspectRatio="4 / 3"
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
