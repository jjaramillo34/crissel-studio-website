'use client'

import { useEffect, useState } from 'react'
import { Button, IconButton, Row, Text } from '@once-ui-system/core'
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

/** Each marquee row repeats reviews until it has at least this many cards, so it never looks sparse */
const MIN_CARDS_PER_ROW = 6

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

const fillRow = (items: TestimonialData[]) => {
  if (items.length === 0) return []
  const out: TestimonialData[] = []
  while (out.length < MIN_CARDS_PER_ROW) out.push(...items)
  return out
}

const ReviewCard = ({ item, duplicate }: { item: TestimonialData; duplicate: boolean }) => {
  const rating = item.rating || 5
  return (
    <figure
      className="crissel-review"
      aria-hidden={duplicate || undefined}
      data-dup={duplicate || undefined}
    >
      <span className="crissel-review__mark font-display" aria-hidden>
        ”
      </span>
      <span className="crissel-review__stars" aria-label={`${rating} de 5 estrellas`}>
        {'★'.repeat(rating)}
      </span>
      <blockquote className="crissel-review__text">“{item.content}”</blockquote>
      <figcaption className="crissel-review__author">
        <span className="crissel-review__avatar" aria-hidden>
          {initials(item.name)}
        </span>
        <span className="crissel-review__who">
          <span className="crissel-review__name">{item.name}</span>
          {item.service && <span className="crissel-review__service">{item.service}</span>}
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * One marquee row. The card list is rendered twice and the track slides by -50%
 * for a seamless loop; only the first copy of each review is exposed to assistive tech.
 */
const MarqueeRow = ({
  items,
  uniqueCount,
  direction,
  decorative = false,
}: {
  items: TestimonialData[]
  uniqueCount: number
  direction: 'left' | 'right'
  decorative?: boolean
}) => (
  <div
    className="crissel-reviews__row"
    data-direction={direction}
    data-decorative={decorative || undefined}
    aria-hidden={decorative || undefined}
    style={{ ['--duration' as string]: `${items.length * 9}s` }}
  >
    <div className="crissel-reviews__track">
      {[...items, ...items].map((item, i) => (
        <ReviewCard
          key={`${item.id}-${i}`}
          item={item}
          duplicate={decorative || i >= uniqueCount}
        />
      ))}
    </div>
  </div>
)

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(fallbackTestimonials)
  const [paused, setPaused] = useState(false)

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

  const rowA = fillRow(testimonials)
  // Second row starts mid-list so the two rows don't show the same review side by side
  const rowB = fillRow([
    ...testimonials.slice(Math.ceil(testimonials.length / 2)),
    ...testimonials.slice(0, Math.ceil(testimonials.length / 2)),
  ])
  const average =
    testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / Math.max(testimonials.length, 1)

  return (
    <section id="reseñas" className="crissel-section crissel-section--blush crissel-section--clip">
      <div className="crissel-section__inner">
        <SectionHeader
          eyebrow="Reseñas de clientas"
          title="Lo que dicen sobre"
          titleAccent="Crissel Studio"
          description="Experiencias reales. Sin filtros."
        />

        <Row gap="8" vertical="center" className="crissel-reviews__summary">
          <span className="crissel-review__stars" aria-hidden>
            ★
          </span>
          <Text variant="label-strong-m">{average.toFixed(1)} de 5</Text>
          <Text variant="label-default-m" onBackground="neutral-weak">
            · {testimonials.length} {testimonials.length === 1 ? 'reseña' : 'reseñas'}
          </Text>
        </Row>

        <div className={`crissel-reviews${paused ? ' is-paused' : ''}`}>
          <MarqueeRow items={rowA} uniqueCount={testimonials.length} direction="left" />
          <MarqueeRow items={rowB} uniqueCount={0} direction="right" decorative />
        </div>

        <Row gap="12" vertical="center">
          <Button
            variant="tertiary"
            href="https://instagram.com/crisselstudio.ec"
            label="Ver más en Instagram"
            arrowIcon
          />
          <IconButton
            className="crissel-reviews__toggle"
            icon={paused ? 'play' : 'pause'}
            variant="secondary"
            tooltip={paused ? 'Reanudar reseñas' : 'Pausar reseñas'}
            aria-label={paused ? 'Reanudar reseñas' : 'Pausar reseñas'}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          />
        </Row>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
