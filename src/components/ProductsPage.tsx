'use client'

import {
  Background,
  Button,
  Column,
  Flex,
  Grid,
  Heading,
  Icon,
  Media,
  RevealFx,
  Row,
  Text,
} from '@once-ui-system/core'
import { SectionHeader } from './sections/SectionHeader'

const BOOKING_URL = 'https://bit.ly/crisselstudio'

type Service = {
  id: string
  title: string
  subtitle: string
  icon: string
  /** Omit until photos exist; a branded placeholder is shown instead */
  mainImage?: string
  benefitsImage?: string
  detailsImage?: string
  description: string
  duration?: string
  serviceTime?: string
  prices?: { name: string; price: string; description: string }[]
  /** Sub-services without a listed price */
  options?: { name: string; description: string }[]
  price?: string
  benefits: string[]
}

const services: Service[] = [
  {
    id: 'extensiones',
    title: 'Extensiones de Pestañas',
    subtitle: 'By Crissel',
    icon: 'eye',
    mainImage: '/assets/gallery/maquillaje-fantasia-10.jpg',
    benefitsImage: '/assets/gallery/maquillaje-fantasia-3.jpg',
    detailsImage: '/assets/gallery/maquillaje-fantasia-6.jpg',
    description:
      'Servicio diseñado para vernos perfectas desde el momento de despertar, al salir de la ducha y cuando vamos a una piscina. Logramos un efecto de volumen y mucho más largas, logramos reajustar la forma de tus ojos, protegemos tus pestañas naturales, no afectan los ojos, y no causan irritación.',
    duration: 'Tiempo de duración de 8 meses a 1 año',
    serviceTime: 'Tiempo de servicio de 2 horas a 2:30',
    prices: [
      { name: 'Efecto Rimel', price: '$30.00', description: 'Look natural y elegante' },
      { name: 'Efecto Híbrido', price: '$40.00', description: 'Combinación perfecta' },
      { name: 'Efecto Volumen', price: '$45.00', description: 'Máximo impacto y volumen' },
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
    title: 'Planchado de Cejas',
    subtitle: 'Perfección Natural',
    icon: 'crown',
    mainImage: '/assets/gallery/maquillaje-fantasia-5.jpg',
    description:
      'Técnica profesional que logra cejas perfectas con apariencia completa, ideal para cejas escasas.',
    benefits: ['Cejas peinadas', 'Cejas perfectas', 'Apariencia completa', 'Ideal para cejas escasas'],
    price: 'Consultar precio',
  },
  {
    id: 'depilacion',
    title: 'Depilación con Hilo',
    subtitle: 'Precisión Perfecta',
    icon: 'sparkle',
    mainImage: '/assets/gallery/maquillaje-fantasia-4.jpg',
    description:
      'Técnica de depilación exacta que cuida la elasticidad de tu piel con mayor tiempo de duración.',
    benefits: [
      'Cejas perfectas',
      'Depilación exacta',
      'Mayor tiempo de duración',
      'Cuida la elasticidad de tu piel',
    ],
    price: 'Consultar precio',
  },
  {
    id: 'maquillaje',
    title: 'Maquillaje Social',
    subtitle: 'Elegancia y Estilo',
    icon: 'heart',
    mainImage: '/assets/gallery/maquillaje-fantasia-9.jpg',
    description: 'Maquillaje profesional para eventos sociales que resalta tu belleza natural.',
    benefits: ['Mímate', 'Deslumbra con tu llegada', 'Fotografías perfectas', 'Alimenta tu autoestima'],
    price: 'Consultar precio',
  },
  {
    id: 'unas',
    title: 'Uñas',
    subtitle: 'Nuevo en Crissel Studio',
    icon: 'nails',
    mainImage: '/assets/gallery/unas-2.jpg',
    benefitsImage: '/assets/gallery/unas-1.jpg',
    detailsImage: '/assets/gallery/unas-3.jpg',
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
    price: 'Consultar precio',
  },
]

const contacts = [
  { icon: 'phone', lines: ['0995059403', '0992950683'] },
  { icon: 'mail', lines: ['crisseleon1990@gmail.com'] },
  { icon: 'mapPin', lines: ['Calle Mera entre Bolívar y Rocafuerte'], note: 'Ambato, Ecuador' },
]

const IconTile = ({ name, size = 'm' }: { name: string; size?: 'm' | 'l' }) => (
  <Row
    center
    width={size === 'l' ? '64' : '48'}
    height={size === 'l' ? '64' : '48'}
    radius="l"
    background="brand-alpha-weak"
    border="brand-alpha-medium"
  >
    <Icon name={name} size={size} onBackground="brand-strong" />
  </Row>
)

const ServiceRow = ({ service, reverse }: { service: Service; reverse: boolean }) => (
  <Flex
    id={service.id}
    fillWidth
    gap="48"
    vertical="center"
    direction={reverse ? 'row-reverse' : 'row'}
    m={{ direction: 'column' }}
    style={{ scrollMarginTop: '6rem' }}
  >
    <Column flex={1} gap="24">
      <Row gap="16" vertical="center">
        <IconTile name={service.icon} size="l" />
        <Column gap="4">
          <Heading as="h2" variant="display-strong-xs">
            {service.title}
          </Heading>
          <Text variant="body-strong-l" onBackground="brand-medium">
            {service.subtitle}
          </Text>
        </Column>
      </Row>

      <Text variant="body-default-l" onBackground="neutral-medium">
        {service.description}
      </Text>

      {service.duration && (
        <Column gap="8">
          {[
            { icon: 'clock', text: service.duration },
            { icon: 'calendar', text: service.serviceTime },
          ].map((detail) => (
            <Row key={detail.icon} gap="8" vertical="center">
              <Icon name={detail.icon} size="s" onBackground="brand-medium" />
              <Text variant="body-default-m" onBackground="neutral-medium">
                {detail.text}
              </Text>
            </Row>
          ))}
        </Column>
      )}

      {service.prices ? (
        <Column gap="16">
          <Heading as="h3" variant="heading-strong-l">
            Precios
          </Heading>
          <Grid columns="3" s={{ columns: 1 }} gap="16">
            {service.prices.map((price) => (
              <Column
                key={price.name}
                background="surface"
                border="neutral-alpha-weak"
                radius="l"
                padding="20"
                gap="4"
              >
                <Text variant="heading-strong-s">{price.name}</Text>
                <Text variant="display-strong-xs" onBackground="brand-strong">
                  {price.price}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {price.description}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      ) : (
        <>
          {service.options && (
            <Column gap="16">
              <Heading as="h3" variant="heading-strong-l">
                Servicios
              </Heading>
              <Grid columns="2" s={{ columns: 1 }} gap="12">
                {service.options.map((option) => (
                  <Column
                    key={option.name}
                    background="surface"
                    border="neutral-alpha-weak"
                    radius="l"
                    padding="16"
                    gap="4"
                  >
                    <Text variant="heading-strong-s">{option.name}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {option.description}
                    </Text>
                  </Column>
                ))}
              </Grid>
            </Column>
          )}
          <Column background="brand-alpha-weak" border="brand-alpha-medium" radius="l" padding="24">
            <Text variant="heading-strong-l" onBackground="brand-strong">
              {service.price}
            </Text>
          </Column>
        </>
      )}

      <Column gap="16">
        <Heading as="h3" variant="heading-strong-l">
          Beneficios
        </Heading>
        <Grid columns="2" s={{ columns: 1 }} gap="12">
          {service.benefits.map((benefit) => (
            <Row
              key={benefit}
              background="surface"
              border="neutral-alpha-weak"
              radius="l"
              padding="12"
              gap="12"
              vertical="center"
            >
              <Icon name="star" size="s" onBackground="brand-medium" />
              <Text variant="body-strong-m" onBackground="neutral-strong">
                {benefit}
              </Text>
            </Row>
          ))}
        </Grid>
      </Column>

      <Button
        href={BOOKING_URL}
        size="l"
        prefixIcon="calendar"
        label={`Reservar ${service.title}`}
      />
    </Column>

    <Column flex={1} gap="16" fillWidth>
      {service.mainImage ? (
        <Media
          src={service.mainImage}
          alt={service.title}
          aspectRatio="4 / 3"
          radius="l"
          border="neutral-alpha-weak"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      ) : (
        <Column
          fillWidth
          aspectRatio="4 / 3"
          center
          gap="12"
          radius="l"
          background="brand-alpha-weak"
          border="brand-alpha-medium"
          aria-hidden
        >
          <Icon name={service.icon} size="xl" onBackground="brand-medium" />
          <Text variant="label-default-s" onBackground="brand-medium">
            Fotos muy pronto
          </Text>
        </Column>
      )}
      {service.benefitsImage && (
        <Grid columns="2" gap="16">
          {[service.benefitsImage, service.detailsImage].filter(Boolean).map((src) => (
            <Media
              key={src}
              src={src as string}
              alt=""
              aspectRatio="1 / 1"
              radius="l"
              border="neutral-alpha-weak"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </Grid>
      )}
    </Column>
  </Flex>
)

const ProductsPage = () => {
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
        gap="104"
      >
        <Column gap="32" horizontal="center">
          <Button href="/" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al inicio" />
          <SectionHeader
            titleAs="h1"
            eyebrow="Catálogo"
            title="Nuestros"
            titleAccent="productos & servicios"
            description="Extensiones de pestañas, cejas, depilación con hilo y maquillaje social — todo con el mismo estándar profesional de Crissel Studio en Ambato."
          />
        </Column>

        {services.map((service, index) => (
          <RevealFx key={service.id} translateY="16" fillWidth>
            <ServiceRow service={service} reverse={index % 2 === 1} />
          </RevealFx>
        ))}

        <Column
          background="surface"
          border="neutral-alpha-weak"
          radius="xl"
          padding="48"
          s={{ padding: '24' }}
          gap="32"
          horizontal="center"
          align="center"
        >
          <Column gap="12" horizontal="center">
            <Heading as="h2" variant="display-strong-s" align="center">
              ¿Lista para tu transformación?
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-medium" align="center">
              Contáctanos para agendar tu cita y descubrir el poder de realzar tu mirada
            </Text>
          </Column>

          <Grid columns="3" m={{ columns: 1 }} gap="16" fillWidth>
            {contacts.map((contact) => (
              <Column
                key={contact.icon}
                background="page"
                border="neutral-alpha-weak"
                radius="l"
                padding="20"
                gap="8"
                horizontal="center"
              >
                <IconTile name={contact.icon} />
                {contact.lines.map((line) => (
                  <Text key={line} variant="body-strong-m" align="center" style={{ overflowWrap: 'anywhere' }}>
                    {line}
                  </Text>
                ))}
                {contact.note && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {contact.note}
                  </Text>
                )}
              </Column>
            ))}
          </Grid>

          <Row gap="12" s={{ direction: 'column', fillWidth: true }} horizontal="center">
            <Button href={BOOKING_URL} size="l" prefixIcon="calendar" label="Reservar cita online" />
            <Button
              href="https://instagram.com/crisselstudio.ec"
              variant="secondary"
              size="l"
              label="Síguenos en Instagram"
            />
          </Row>
        </Column>
      </Column>
    </Column>
  )
}

export default ProductsPage
