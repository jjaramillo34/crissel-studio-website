'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Column,
  Grid,
  IconButton,
  Row,
  Text,
} from '@once-ui-system/core'
import { payload } from '@/lib/payload'
import { SectionHeader } from './SectionHeader'

interface TestimonialData {
  id: string
  name: string
  content: string
  rating: number
  service?: string
  isFeatured?: boolean
}

const fallbackTestimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'María G.',
    content:
      'Salí encantada con mis pestañas. El resultado se ve natural y el trato fue súper cálido desde que entré.',
    rating: 5,
    service: 'Extensiones de pestañas',
  },
  {
    id: '2',
    name: 'Andrea P.',
    content:
      'Me asesoraron con honestidad sobre qué técnica me convenía. Mis cejas quedaron perfectas para mi rostro.',
    rating: 5,
    service: 'Diseño de cejas',
  },
  {
    id: '3',
    name: 'Carolina R.',
    content:
      'Ambiente limpio, profesional y relajado. Volveré seguro para el maquillaje de mi próximo evento.',
    rating: 5,
    service: 'Maquillaje profesional',
  },
]

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(fallbackTestimonials)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await payload.getTestimonials({ limit: 10 })
        if (response.error) {
          throw new Error('No se pudieron cargar los testimonios')
        }
        const docs = response.docs as TestimonialData[]
        if (docs.length > 0) {
          const featured = docs.filter((t) => t.isFeatured)
          setTestimonials(featured.length > 0 ? featured : docs)
        }
      } catch {
        // keep fallback
      }
    }
    fetchTestimonials()
  }, [])

  const visible = [
    testimonials[index % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ].filter(Boolean)

  return (
    <section id="reseñas" className="crissel-section crissel-section--blush">
      <div className="crissel-section__inner">
        <Row fillWidth horizontal="center" gap="16" s={{ direction: 'column' }}>
          <SectionHeader
            eyebrow="Reseñas de clientas"
            title="Lo que dicen sobre"
            titleAccent="Crissel Studio"
            description="Experiencias reales. Sin filtros."
          />
          <Row gap="8">
            <IconButton
              icon="chevronLeft"
              variant="secondary"
              tooltip="Anterior"
              onClick={() =>
                setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
            />
            <IconButton
              icon="chevronRight"
              variant="secondary"
              tooltip="Siguiente"
              onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            />
          </Row>
        </Row>

        <Grid columns="3" gap="20" m={{ columns: 1 }} fillWidth>
          {visible.map((item) => (
            <Column
              key={`${item.id}-${index}`}
              background="surface"
              border="neutral-alpha-weak"
              radius="l"
              padding="24"
              gap="16"
              fillHeight
            >
              <Text variant="label-default-s" onBackground="brand-medium">
                {'★'.repeat(item.rating || 5)}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-medium">
                “{item.content}”
              </Text>
              <Column gap="4">
                <Text variant="label-strong-s">{item.name}</Text>
                {item.service && (
                  <Text variant="label-default-xs" onBackground="neutral-weak">
                    {item.service}
                  </Text>
                )}
              </Column>
            </Column>
          ))}
        </Grid>

        <Button
          variant="tertiary"
          href="https://instagram.com/crisselstudio.ec"
          label="Ver más en Instagram"
          arrowIcon
        />
      </div>
    </section>
  )
}

export default TestimonialsCarousel
