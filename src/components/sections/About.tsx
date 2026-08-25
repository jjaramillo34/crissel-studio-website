'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const credentials = [
  'Especialistas en mirada y cejas',
  'Productos profesionales certificados',
  'Consulta personalizada en cada cita',
  '+1.5K clientas felices en Ambato',
]

const About = () => {
  return (
    <section id="sobre-nosotros" className="crissel-section crissel-section--blush">
      <div className="crissel-section__inner">
        <article className="crissel-treatment">
          <div className="crissel-treatment__media">
            <Image
              src="/assets/team/team1.jpg"
              alt="Equipo de Crissel Studio"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="crissel-treatment__copy">
            <SectionHeader
              align="start"
              eyebrow="Sobre nosotras"
              title="Crissel Studio."
              titleAccent="Tu mirada, en buenas manos"
              titleEnd="."
              description="By Cris Pestañas · Ambato"
            />

            <p className="crissel-treatment__desc">
              Somos un estudio de belleza en el Centro Comercial La Galería. Cada tratamiento
              comienza escuchándote: qué buscas, cómo es tu día a día y qué resultado se siente
              natural en ti. Trabajamos con técnicas actuales y productos de calidad, sin promesas
              vacías.
            </p>

            <ul className="crissel-treatment__points">
              {credentials.map((item) => (
                <li key={item}>
                  <span className="crissel-treatment__check" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button href="https://bit.ly/crisselstudio" label="Reservar cita" size="s" />
              <Link href="/galeria" className="crissel-treatment__link">
                Ver galería →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default About
