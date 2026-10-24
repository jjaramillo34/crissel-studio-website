'use client'

import Image from 'next/image'
import { Button, Icon, Row, SmartLink } from '@once-ui-system/core'
import { SectionHeader } from './sections/SectionHeader'
import ConsultationCta from './sections/ConsultationCta'
import Contact from './sections/Contact'

const BOOKING_URL = 'https://bit.ly/crisselstudio'
const WHATSAPP_NUMBER = '593992950683'

type Service = {
  id: string
  number: string
  /** Short label for the index at the top of the page */
  shortTitle: string
  title: string
  subtitle: string
  mainImage: string
  /** Up to two smaller photos shown under the main one */
  extraImages?: string[]
  description: string
  duration?: string
  serviceTime?: string
  prices?: { name: string; price: string; description: string }[]
  /** Sub-services without a listed price */
  options?: { name: string; description: string }[]
  benefits: string[]
  isNew?: boolean
}

const services: Service[] = [
  {
    id: 'extensiones',
    number: '01',
    shortTitle: 'Pestañas',
    title: 'Extensiones de pestañas',
    subtitle: 'By Crissel · Rimel · Híbrido · Volumen',
    mainImage: '/assets/gallery/extensiones-pestanas-3.jpg',
    extraImages: ['/assets/gallery/planchado-cejas-1.jpg', '/assets/gallery/extensiones-pestanas-2.jpg'],
    description:
      'Servicio diseñado para vernos perfectas desde el momento de despertar, al salir de la ducha y cuando vamos a una piscina. Logramos un efecto de volumen y mucho más largas, logramos reajustar la forma de tus ojos, protegemos tus pestañas naturales, no afectan los ojos, y no causan irritación.',
    duration: 'Duran de 8 meses a 1 año',
    serviceTime: 'Servicio de 2 h a 2 h 30',
    prices: [
      { name: 'Efecto Rimel', price: '$30', description: 'Look natural y elegante' },
      { name: 'Efecto Híbrido', price: '$40', description: 'Combinación perfecta' },
      { name: 'Efecto Volumen', price: '$45', description: 'Máximo impacto y volumen' },
    ],
    benefits: [
      'ADIÓS!!! rimel',
      'Disfruta de la piscina',
      'Perfecta desde que despiertas',
      'Ahorras tiempo en las mañanas',
    ],
  },
  {
    id: 'planchado',
    number: '02',
    shortTitle: 'Planchado',
    title: 'Planchado de cejas',
    subtitle: 'Perfección natural',
    mainImage: '/assets/gallery/microblading-cejas-2.jpg',
    description:
      'Técnica profesional que logra cejas perfectas con apariencia completa, ideal para cejas escasas.',
    benefits: ['Cejas peinadas', 'Cejas perfectas', 'Apariencia completa', 'Ideal para cejas escasas'],
  },
  {
    id: 'depilacion',
    number: '03',
    shortTitle: 'Depilación',
    title: 'Depilación con hilo',
    subtitle: 'Precisión perfecta',
    mainImage: '/assets/gallery/microblading-cejas-1.jpg',
    description:
      'Técnica de depilación exacta que cuida la elasticidad de tu piel con mayor tiempo de duración.',
    benefits: [
      'Cejas perfectas',
      'Depilación exacta',
      'Mayor tiempo de duración',
      'Cuida la elasticidad de tu piel',
    ],
  },
  {
    id: 'maquillaje',
    number: '04',
    shortTitle: 'Maquillaje',
    title: 'Maquillaje social',
    subtitle: 'Elegancia y estilo',
    mainImage: '/assets/gallery/maquillaje-social-1.jpg',
    description: 'Maquillaje profesional para eventos sociales que resalta tu belleza natural.',
    benefits: ['Mímate', 'Deslumbra con tu llegada', 'Fotografías perfectas', 'Alimenta tu autoestima'],
  },
  {
    id: 'unas',
    number: '05',
    shortTitle: 'Uñas',
    title: 'Uñas',
    subtitle: 'Manicure · Semipermanente · Acrílicas · Nail art',
    mainImage: '/assets/gallery/unas-2.jpg',
    extraImages: ['/assets/gallery/unas-1.jpg', '/assets/gallery/unas-3.jpg'],
    description:
      'Manos y pies impecables, con el mismo detalle de cada servicio del estudio. Desde un manicure clásico hasta uñas acrílicas o polygel con el diseño que imaginas.',
    options: [
      { name: 'Manicure y pedicure', description: 'Limpieza, forma y esmaltado tradicional' },
      { name: 'Esmaltado semipermanente', description: 'Color con brillo que dura más' },
      { name: 'Acrílicas y polygel', description: 'Largo y forma a tu medida' },
      { name: 'Nail art', description: 'Francesa, cromado y diseños personalizados' },
    ],
    benefits: [
      'Acabado profesional',
      'Diseños a tu estilo',
      'Manos y pies cuidados',
      'Ideal para eventos y el día a día',
    ],
    isNew: true,
  },
]

const whatsappFor = (service: Service) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola Crissel Studio, quisiera información sobre ${service.title.toLowerCase()}.`,
  )}`

/** Arched main photo with an offset coral outline, plus up to two small photos */
const ServiceMedia = ({ service }: { service: Service }) => (
  <div className="crissel-product__media">
    <div className="crissel-product__collage">
      <div className="crissel-product__frame">
        <Image
          src={service.mainImage}
          alt={service.title}
          fill
          sizes="(max-width: 900px) 90vw, 40vw"
          className="object-cover"
        />
      </div>
      {service.isNew && <span className="crissel-product__badge">Nuevo</span>}
    </div>
    {service.extraImages && (
      <div className="crissel-product__thumbs">
        {service.extraImages.map((src) => (
          <div key={src} className="crissel-product__thumb">
            <Image src={src} alt="" fill sizes="(max-width: 900px) 45vw, 18vw" className="object-cover" />
          </div>
        ))}
      </div>
    )}
  </div>
)

/** Salon-menu rows: name and note on the left, a dotted leader, price on the right */
const ServiceMenu = ({ service }: { service: Service }) => {
  const rows = service.prices ?? service.options?.map((option) => ({ ...option, price: undefined }))
  if (!rows) return null

  return (
    <div className="crissel-menu">
      <p className="crissel-menu__title">{service.prices ? 'Precios' : 'Servicios'}</p>
      <ul className="crissel-menu__list">
        {rows.map((row) => (
          <li key={row.name} className="crissel-menu__row">
            <span className="crissel-menu__name">
              <span className="font-display">{row.name}</span>
              <span className="crissel-menu__note">{row.description}</span>
            </span>
            {row.price && (
              <>
                <span className="crissel-menu__leader" aria-hidden />
                <span className="crissel-menu__price font-display">{row.price}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const ServiceSection = ({ service, index }: { service: Service; index: number }) => {
  const reverse = index % 2 === 1
  const titleId = `${service.id}-title`

  return (
    <section
      id={service.id}
      aria-labelledby={titleId}
      className={`crissel-section ${reverse ? 'crissel-section--soft' : 'crissel-section--cream'} crissel-product`}
    >
      <div className="crissel-section__inner">
        <div className={`crissel-treatment${reverse ? ' crissel-treatment--reverse' : ''}`}>
          <ServiceMedia service={service} />

          <div className="crissel-treatment__copy crissel-product__copy">
            <p className="crissel-treatment__number">
              {service.number} — {service.shortTitle}
            </p>
            <h2 id={titleId} className="crissel-treatment__title font-display">
              {service.title}
            </h2>
            <p className="crissel-treatment__subtitle">{service.subtitle}</p>
            <p className="crissel-treatment__desc">{service.description}</p>

            {service.duration && (
              <div className="crissel-product__meta">
                {[
                  { icon: 'clock', text: service.duration },
                  { icon: 'calendar', text: service.serviceTime },
                ].map((detail) => (
                  <span key={detail.icon} className="crissel-product__chip">
                    <Icon name={detail.icon} size="xs" />
                    {detail.text}
                  </span>
                ))}
              </div>
            )}

            <ServiceMenu service={service} />

            {!service.prices && <p className="crissel-product__price-note">Precio: consúltanos por WhatsApp</p>}

            <ul className="crissel-treatment__points crissel-product__points">
              {service.benefits.map((benefit) => (
                <li key={benefit}>
                  <span className="crissel-treatment__check" aria-hidden>
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Row gap="12" s={{ direction: 'column', fillWidth: true }} className="crissel-product__ctas">
              <Button href={BOOKING_URL} prefixIcon="calendar" label="Reservar cita" />
              <Button href={whatsappFor(service)} variant="secondary" prefixIcon="whatsapp" label="Preguntar" />
            </Row>
          </div>
        </div>
      </div>
    </section>
  )
}

const ProductsPage = () => {
  return (
    <main className="crissel-products">
      <section className="crissel-section crissel-section--blush crissel-products__intro">
        <div className="crissel-section__inner">
          <Button href="/" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al inicio" />
          <SectionHeader
            titleAs="h1"
            eyebrow="Catálogo"
            title="Nuestros"
            titleAccent="productos & servicios"
            description="Extensiones de pestañas, cejas, depilación con hilo, maquillaje social y uñas — todo con el mismo estándar profesional de Crissel Studio en Ambato."
          />

          <nav aria-label="Servicios" className="crissel-pindex">
            {services.map((service) => (
              <SmartLink key={service.id} unstyled href={`#${service.id}`} className="crissel-pindex__item">
                <span className="crissel-pindex__thumb">
                  <Image src={service.mainImage} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="crissel-pindex__number">{service.number}</span>
                <span className="crissel-pindex__title font-display">{service.shortTitle}</span>
                {service.isNew && <span className="crissel-tx__badge">Nuevo</span>}
              </SmartLink>
            ))}
          </nav>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      <ConsultationCta />
      <Contact />
    </main>
  )
}

export default ProductsPage
