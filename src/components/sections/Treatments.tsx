'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Column, Icon, Text } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const treatments = [
  {
    number: '01',
    title: 'Extensiones de pestañas',
    subtitle: 'Classic · Hybrid · Volume',
    description:
      'Cada pestaña se aplica con paciencia y precisión. El resultado debe sentirse como si siempre hubiera sido tuyo: natural, cómodo y a tu estilo.',
    points: [
      'Técnicas para cada look',
      'Retoques y mantenimiento',
      'Asesoría incluida',
      'Productos profesionales',
    ],
    image: '/assets/gallery/extensiones-pestanas-1.jpg',
    href: '/productos',
  },
  {
    number: '02',
    title: 'Diseño de cejas',
    subtitle: 'Laminado · Depilación · Diseño',
    description:
      'Definimos la forma que mejor encaja con tu rostro. Cejas ordenadas, con volumen y expresión — sin exagerar, con intención.',
    points: [
      'Diseño personalizado',
      'Laminado y lifting',
      'Depilación con hilo',
      'Resultado natural',
    ],
    image: '/assets/gallery/planchado-cejas-1.jpg',
    href: '/productos',
  },
  {
    number: '03',
    title: 'Maquillaje profesional',
    subtitle: 'Social · Eventos · Editorial',
    description:
      'Maquillaje pensado para tu ocasión y tu piel. Te asesoramos en tonos y acabados para que te sientas segura desde que sales del estudio.',
    points: [
      'Maquillaje social',
      'Eventos y sesiones',
      'Prueba de look',
      'Productos de calidad',
    ],
    image: '/assets/gallery/maquillaje-social-1.jpg',
    href: '/productos',
  },
  {
    number: '04',
    title: 'Uñas',
    subtitle: 'Manicure · Semipermanente · Acrílicas · Nail art',
    description:
      'Manos y pies cuidados, con acabados que duran. Desde un manicure clásico hasta uñas acrílicas o polygel con el diseño que imaginas.',
    points: [
      'Manicure y pedicure',
      'Esmaltado semipermanente',
      'Acrílicas y polygel',
      'Nail art y diseños',
    ],
    image: '/assets/gallery/unas-2.jpg',
    isNew: true,
    href: '/productos#unas',
  },
]

/**
 * Interactive treatments list: numbered tabs on the left swap the photo and details
 * on the right (desktop). On small screens the same markup becomes an accordion —
 * CSS `order` moves the single panel directly under the active tab.
 */
const Treatments = () => {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = treatments[active]

  const focusTab = (index: number) => {
    const next = (index + treatments.length) % treatments.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: treatments.length - 1,
    }
    if (event.key in moves) {
      event.preventDefault()
      focusTab(moves[event.key])
    }
  }

  return (
    <section id="servicios" className="crissel-section crissel-section--cream">
      <div className="crissel-section__inner">
        <SectionHeader
          eyebrow="Nuestros tratamientos"
          title="Pestañas & belleza."
          titleAccent="Todo en un estudio"
          description="Cada cita sigue el mismo principio: primero entenderte, después trabajar. Con calma y el tiempo que hace falta."
        />

        <div
          className="crissel-tx"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Tratamientos"
          style={{ ['--active' as string]: active }}
        >
          {treatments.map((treatment, index) => {
            const isActive = index === active
            return (
              <button
                key={treatment.number}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                id={`tx-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="tx-panel"
                tabIndex={isActive ? 0 : -1}
                className="crissel-tx__tab"
                data-active={isActive}
                style={{ order: index * 2 }}
                onClick={() => setActive(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') setActive(index)
                }}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className="crissel-tx__number">{treatment.number}</span>
                <span className="crissel-tx__title font-display">{treatment.title}</span>
                {treatment.isNew && <span className="crissel-tx__badge">Nuevo</span>}
                <span className="crissel-tx__arrow" aria-hidden>
                  →
                </span>
              </button>
            )
          })}

          <div
            id="tx-panel"
            role="tabpanel"
            aria-labelledby={`tx-tab-${active}`}
            className="crissel-tx__panel"
            style={{ order: active * 2 + 1 }}
          >
            <div className="crissel-tx__media">
              {treatments.map((treatment, index) =>
                treatment.image ? (
                  <Image
                    key={treatment.number}
                    src={treatment.image}
                    alt={index === active ? treatment.title : ''}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={`object-cover crissel-tx__photo${index === active ? ' is-active' : ''}`}
                  />
                ) : (
                  <Column
                    key={treatment.number}
                    fill
                    center
                    gap="12"
                    className={`crissel-tx__photo${index === active ? ' is-active' : ''}`}
                    aria-hidden
                  >
                    <Icon name="nails" size="xl" onBackground="brand-medium" />
                    <Text variant="label-default-s" onBackground="brand-medium">
                      Nuevo en Crissel Studio
                    </Text>
                  </Column>
                ),
              )}
            </div>

            <div key={active} className="crissel-tx__details">
              <p className="crissel-treatment__subtitle">{current.subtitle}</p>
              <p className="crissel-treatment__desc">{current.description}</p>
              <ul className="crissel-treatment__points crissel-tx__points">
                {current.points.map((point) => (
                  <li key={point}>
                    <span className="crissel-treatment__check" aria-hidden>
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={current.href} className="crissel-treatment__link">
                Más información sobre {current.title.toLowerCase()} →
              </Link>
            </div>
          </div>
        </div>

        <Button href="https://bit.ly/crisselstudio" label="Reservar cita" prefixIcon="calendar" />
      </div>
    </section>
  )
}

export default Treatments
