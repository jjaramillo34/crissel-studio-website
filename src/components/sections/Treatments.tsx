'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@once-ui-system/core'
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
    reverse: false,
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
    reverse: true,
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
    reverse: false,
  },
]

const Treatments = () => {
  return (
    <section id="servicios" className="crissel-section crissel-section--cream">
      <div className="crissel-section__inner crissel-treatments">
        <SectionHeader
          eyebrow="Nuestros tratamientos"
          title="Pestañas & belleza."
          titleAccent="Todo en un estudio"
          description="Cada cita sigue el mismo principio: primero entenderte, después trabajar. Con calma y el tiempo que hace falta."
        />

        {treatments.map((treatment) => (
          <article
            key={treatment.number}
            className={`crissel-treatment${treatment.reverse ? ' crissel-treatment--reverse' : ''}`}
          >
            <div className="crissel-treatment__media">
              <Image
                src={treatment.image}
                alt={treatment.title}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="crissel-treatment__copy">
              <p className="crissel-treatment__number">{treatment.number}</p>
              <h3 className="crissel-treatment__title font-display">{treatment.title}</h3>
              <p className="crissel-treatment__subtitle">{treatment.subtitle}</p>
              <p className="crissel-treatment__desc">{treatment.description}</p>
              <ul className="crissel-treatment__points">
                {treatment.points.map((point) => (
                  <li key={point}>
                    <span className="crissel-treatment__check" aria-hidden>
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={treatment.href} className="crissel-treatment__link">
                Más información →
              </Link>
            </div>
          </article>
        ))}

        <Button href="https://bit.ly/crisselstudio" label="Reservar cita" prefixIcon="calendar" />
      </div>
    </section>
  )
}

export default Treatments
