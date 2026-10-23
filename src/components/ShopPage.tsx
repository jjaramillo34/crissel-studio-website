'use client'

import { useState } from 'react'
import {
  Background,
  Button,
  Column,
  Grid,
  Heading,
  Icon,
  RevealFx,
  Row,
  SegmentedControl,
  Tag,
  Text,
} from '@once-ui-system/core'
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

const waLink = (productName: string) => {
  const text = `Hola Crissel Studio 👋 Me interesa: ${productName}. ¿Disponibilidad y precio?`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
}

const ProductCard = ({ product }: { product: ShopProduct }) => (
  <Column
    as="article"
    fill
    background="surface"
    border="neutral-alpha-weak"
    radius="l"
    padding="24"
    gap="12"
  >
    <Row horizontal="between" vertical="center" gap="12" wrap>
      <Row gap="12" vertical="center">
        <Row center width="48" height="48" radius="m" background="brand-alpha-weak">
          <Icon name={categoryIcons[product.category]} size="s" onBackground="brand-strong" />
        </Row>
        <Tag variant="brand" size="s" label={categoryLabels[product.category]} />
      </Row>
      {product.highlight && <Tag variant="accent" size="s" label={product.highlight} />}
    </Row>

    <Heading as="h3" variant="heading-strong-l">
      {product.name}
    </Heading>
    <Text variant="body-strong-s" onBackground="brand-medium">
      {product.short}
    </Text>
    <Column flex={1}>
      <Text variant="body-default-s" onBackground="neutral-medium">
        {product.description}
      </Text>
    </Column>

    <Button
      href={waLink(product.name)}
      variant="secondary"
      fillWidth
      prefixIcon="whatsapp"
      label="Consultar disponibilidad"
    />
  </Column>
)

const ShopPage = () => {
  const [filter, setFilter] = useState<ShopCategory>('todas')
  const filtered = filter === 'todas' ? products : products.filter((p) => p.category === filter)

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
          x: 100,
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
            eyebrow="Tienda oficial"
            title="Productos"
            titleAccent="Nagaraku"
            description="Extensiones de pestañas, parches de hidrogel y complementos profesionales de la marca Nagaraku. Compra en el estudio o coordina tu pedido por WhatsApp."
          />
        </Column>

        <Row
          background="surface"
          border="neutral-alpha-weak"
          radius="l"
          padding="24"
          gap="24"
          vertical="center"
          horizontal="between"
          s={{ direction: 'column', vertical: 'start' }}
        >
          <Row gap="16" vertical="start">
            <Row center width="48" height="48" radius="l" background="brand-alpha-weak">
              <Icon name="shoppingBag" onBackground="brand-strong" />
            </Row>
            <Column gap="4" flex={1}>
              <Text variant="heading-strong-m">Calidad profesional</Text>
              <Text variant="body-default-s" onBackground="neutral-medium">
                Trabajamos con referencias Nagaraku para nuestros servicios; también puedes llevarte
                productos según stock. Precios y formatos te los confirmamos al instante.
              </Text>
            </Column>
          </Row>
          <Button href={waLink('catálogo Nagaraku')} prefixIcon="whatsapp" label="Pedir por WhatsApp" />
        </Row>

        <Row horizontal="center">
          <SegmentedControl
            fillWidth={false}
            selected={filter}
            onToggle={(value) => setFilter(value as ShopCategory)}
            buttons={(Object.keys(categoryLabels) as ShopCategory[]).map((key) => ({
              value: key,
              label: categoryLabels[key],
            }))}
          />
        </Row>

        {filtered.length > 0 ? (
          <Grid columns="2" s={{ columns: 1 }} gap="24">
            {filtered.map((product, index) => (
              <RevealFx key={product.id} delay={index * 0.05} translateY="8" fill>
                <ProductCard product={product} />
              </RevealFx>
            ))}
          </Grid>
        ) : (
          <Text align="center" onBackground="neutral-medium" paddingY="48">
            No hay productos en esta categoría por ahora.
          </Text>
        )}

        <Column
          background="surface"
          border="neutral-alpha-weak"
          radius="xl"
          padding="40"
          s={{ padding: '24' }}
          gap="24"
          horizontal="center"
          marginTop="24"
        >
          <Column gap="12" horizontal="center" maxWidth="s">
            <Heading as="h2" variant="display-strong-xs" align="center">
              ¿Prefieres ver todo en persona?
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-medium" align="center">
              Pasa por Crissel Studio en Ambato o escríbenos para reservar retiro o envío según
              disponibilidad.
            </Text>
          </Column>
          <Row gap="12" s={{ direction: 'column', fillWidth: true }} horizontal="center">
            <Button href="/productos" variant="secondary" label="Ver servicios y tarifas" />
            <Button href="https://bit.ly/crisselstudio" prefixIcon="calendar" label="Reservar cita" />
          </Row>
        </Column>
      </Column>
    </Column>
  )
}

export default ShopPage
