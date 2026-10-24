'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button, Column, Grid, Heading, Icon, RevealFx, Row, Text } from '@once-ui-system/core'
import { SectionHeader } from './sections/SectionHeader'

const WHATSAPP = '593992950683'

type ShopCategory = 'todas' | 'pestanas' | 'parches' | 'otros'

type ShopProduct = {
  id: string
  name: string
  short: string
  description: string
  category: Exclude<ShopCategory, 'todas'>
  highlight?: string
}

const products: ShopProduct[] = [
  {
    id: 'nagaraku-ext-classic',
    name: 'Extensiones Nagaraku — clásico & natural',
    short: 'Pestañas sintéticas premium para look natural o rimel.',
    description:
      'Fibras suaves, curvatura estable y compatibilidad con técnica clásica o volumen ligero. Ideales para retoques y aplicación profesional en estudio.',
    category: 'pestanas',
    highlight: 'Best seller',
  },
  {
    id: 'nagaraku-ext-volume',
    name: 'Extensiones Nagaraku — volumen & híbrido',
    short: 'Más densidad y drama sin perder ligereza.',
    description:
      'Opciones para efecto híbrido o volumen ruso según disponibilidad. Pregunta por curvaturas (C, D, etc.) y grosor para tu diseño.',
    category: 'pestanas',
  },
  {
    id: 'nagaraku-patches-gel',
    name: 'Parches de hidrogel Nagaraku',
    short: 'Protección y comodidad durante el servicio de pestañas.',
    description:
      'Parches para aislar pestañas inferiores, adherencia uniforme y retiro suave. Indicados para extensiones y procedimientos de mirada.',
    category: 'parches',
    highlight: 'Esencial en cabina',
  },
  {
    id: 'nagaraku-patches-thin',
    name: 'Parches finos / flex Nagaraku',
    short: 'Alternativas según técnica y sensibilidad de la clienta.',
    description:
      'Formatos que se adaptan al contorno del ojo. Consulta en tienda qué referencia tenemos en stock.',
    category: 'parches',
  },
  {
    id: 'nagaraku-glue-accessories',
    name: 'Pegamentos y auxiliares (según stock)',
    short: 'Complementos profesionales para aplicación segura.',
    description:
      'Adhesivos y consumibles de línea compatible Nagaraku cuando disponemos de importación. Disponibilidad sujeta a pedido.',
    category: 'otros',
  },
  {
    id: 'nagaraku-tools',
    name: 'Accesorios de aplicación',
    short: 'Anillos, micropinceles, esenciales de mesa de trabajo.',
    description:
      'Herramientas y accesorios que usamos en el estudio y podemos ofrecerte para tu kit profesional o retoque en casa (según catálogo vigente).',
    category: 'otros',
  },
]

const categoryLabels: Record<ShopCategory, string> = {
  todas: 'Todas',
  pestanas: 'Pestañas',
  parches: 'Parches',
  otros: 'Más productos',
}

const categoryIcons: Record<ShopProduct['category'], string> = {
  pestanas: 'eye',
  parches: 'sparkle',
  otros: 'package',
}

const perks = [
  { icon: 'shieldCheck', label: 'Marca profesional' },
  { icon: 'sparkle', label: 'La usamos en cabina' },
  { icon: 'mapPin', label: 'Retiro en Ambato' },
]

const steps = [
  {
    number: '01',
    icon: 'shoppingBag',
    title: 'Elige tus productos',
    text: 'Revisa el catálogo y anota lo que te interesa: referencia, curvatura o formato.',
  },
  {
    number: '02',
    icon: 'whatsapp',
    title: 'Escríbenos',
    text: 'Te confirmamos stock, precio y formatos al instante por WhatsApp.',
  },
  {
    number: '03',
    icon: 'mapPin',
    title: 'Retira o recibe',
    text: 'Pasa por el estudio en Ambato o coordinamos el envío según disponibilidad.',
  },
]

const waLink = (productName: string) => {
  const text = `Hola Crissel Studio 👋 Me interesa: ${productName}. ¿Disponibilidad y precio?`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
}

/** Editorial product card: outlined number, category eyebrow, serif name, coral tagline */
const ProductCard = ({ product, number }: { product: ShopProduct; number: number }) => (
  <article className="crissel-shop-card">
    <span className="crissel-shop-card__number font-display" aria-hidden>
      {String(number).padStart(2, '0')}
    </span>

    <div className="crissel-shop-card__top">
      <span className="crissel-shop-card__category">
        <Icon name={categoryIcons[product.category]} size="xs" />
        {categoryLabels[product.category]}
      </span>
      {product.highlight && <span className="crissel-tx__badge">{product.highlight}</span>}
    </div>

    <h3 className="crissel-shop-card__name font-display">{product.name}</h3>
    <p className="crissel-shop-card__short">{product.short}</p>
    <p className="crissel-shop-card__desc">{product.description}</p>

    <a href={waLink(product.name)} className="crissel-shop-card__link">
      <Icon name="whatsapp" size="xs" />
      Consultar disponibilidad
      <span aria-hidden>→</span>
    </a>
  </article>
)

const ShopPage = () => {
  const [filter, setFilter] = useState<ShopCategory>('todas')
  const filtered = filter === 'todas' ? products : products.filter((p) => p.category === filter)

  return (
    <main className="crissel-products">
      <section className="crissel-section crissel-section--blush crissel-products__intro">
        <div className="crissel-section__inner">
          <Button href="/" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al inicio" />
          <SectionHeader
            titleAs="h1"
            eyebrow="Tienda oficial"
            title="Productos"
            titleAccent="Nagaraku"
            description="Extensiones de pestañas, parches de hidrogel y complementos profesionales de la marca Nagaraku. Compra en el estudio o coordina tu pedido por WhatsApp."
          />

          <ul className="crissel-shop-perks">
            {perks.map((perk) => (
              <li key={perk.label} className="crissel-shop-perks__item">
                <span className="crissel-shop-perks__icon">
                  <Icon name={perk.icon} size="xs" />
                </span>
                {perk.label}
              </li>
            ))}
          </ul>

          <Button href={waLink('catálogo Nagaraku')} size="l" prefixIcon="whatsapp" label="Pedir por WhatsApp" />
        </div>
      </section>

      <section className="crissel-section crissel-section--cream" aria-labelledby="catalogo-title">
        <div className="crissel-section__inner">
          <SectionHeader
            titleId="catalogo-title"
            eyebrow="Catálogo"
            title="Lo que usamos"
            titleAccent="en cabina"
            description="Precios y formatos te los confirmamos al instante; la disponibilidad depende del stock."
          />

          <div className="crissel-shop-filters" role="group" aria-label="Filtrar por categoría">
            {(Object.keys(categoryLabels) as ShopCategory[]).map((key) => {
              const count =
                key === 'todas' ? products.length : products.filter((p) => p.category === key).length
              return (
                <button
                  key={key}
                  type="button"
                  className="crissel-shop-filters__chip"
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {categoryLabels[key]}
                  <span className="crissel-shop-filters__count">{count}</span>
                </button>
              )
            })}
          </div>

          <Grid key={filter} columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="20" fillWidth>
            {filtered.map((product, index) => (
              <RevealFx key={product.id} delay={index * 0.06} translateY="8" fill>
                <ProductCard product={product} number={products.indexOf(product) + 1} />
              </RevealFx>
            ))}
          </Grid>
        </div>
      </section>

      <section className="crissel-section crissel-section--ink" aria-labelledby="comprar-title">
        <div className="crissel-section__inner">
          <SectionHeader
            tone="dark"
            titleId="comprar-title"
            eyebrow="Cómo comprar"
            title="Simple y"
            titleAccent="personal"
            description="Sin carrito ni complicaciones: te atendemos directamente, como en el estudio."
          />

          <Grid columns="3" m={{ columns: 1 }} gap="20" fillWidth>
            {steps.map((step, index) => (
              <RevealFx key={step.number} delay={index * 0.1} translateY="16" fill>
                <Column as="article" fill gap="16" className="crissel-standard">
                  <span className="crissel-standard__number font-display" aria-hidden>
                    {step.number}
                  </span>
                  <span className="crissel-standard__icon">
                    <Icon name={step.icon} size="m" />
                  </span>
                  <Heading as="h3" variant="heading-strong-l" className="font-display crissel-standard__title">
                    {step.title}
                  </Heading>
                  <Text variant="body-default-s" className="crissel-standard__desc">
                    {step.text}
                  </Text>
                </Column>
              </RevealFx>
            ))}
          </Grid>
        </div>
      </section>

      <section className="crissel-section crissel-section--blush" aria-labelledby="visita-title">
        <div className="crissel-section__inner">
          <div className="crissel-shop-visit">
            <div className="crissel-product__collage crissel-shop-visit__photo">
              <div className="crissel-product__frame">
                <Image
                  src="/assets/gallery/extensiones-pestanas-3.jpg"
                  alt="Clienta durante un servicio de extensiones en Crissel Studio"
                  fill
                  sizes="(max-width: 900px) 80vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="crissel-shop-visit__copy">
              <SectionHeader
                align="start"
                size="compact"
                titleId="visita-title"
                eyebrow="Visítanos"
                title="¿Prefieres verlo"
                titleAccent="en persona"
                titleEnd="?"
                description="Pasa por Crissel Studio en Ambato o escríbenos para reservar retiro o envío según disponibilidad."
              />
              <p className="crissel-shop-visit__address">
                <Icon name="mapPin" size="xs" />
                Calle Mera entre Bolívar y Rocafuerte, Ambato
              </p>
              <Row gap="12" s={{ direction: 'column', fillWidth: true }}>
                <Button href="https://bit.ly/crisselstudio" prefixIcon="calendar" label="Reservar cita" />
                <Button href="/productos" variant="secondary" label="Ver servicios y tarifas" />
              </Row>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ShopPage
