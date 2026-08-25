'use client'

import {
  Column,
  Grid,
  Logo,
  Row,
  SmartLink,
  Text,
} from '@once-ui-system/core'

const logoImage = '/assets/images/logo_photo.png'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Column
      as="footer"
      fillWidth
      horizontal="center"
      paddingX="l"
      paddingTop="80"
      paddingBottom="40"
      gap="48"
      className="crissel-footer"
    >
      <Grid columns="4" gap="32" m={{ columns: 2 }} s={{ columns: 1 }} fillWidth maxWidth="l">
        <Column gap="16">
          <Row gap="8" vertical="center">
            <Logo icon={logoImage} size="s" href="/" />
            <Text variant="label-strong-m" className="font-display crissel-footer__title">
              Crissel Studio
            </Text>
          </Row>
          <Text variant="body-default-s" className="crissel-footer__muted">
            Pestañas, cejas y maquillaje profesional en Ambato.
          </Text>
        </Column>

        <Column gap="12">
          <Text variant="label-default-s" onBackground="brand-medium">
            Tratamientos
          </Text>
          <SmartLink href="/productos">
            <Text variant="body-default-s" className="crissel-footer__link">
              Productos y servicios
            </Text>
          </SmartLink>
          <SmartLink href="/galeria">
            <Text variant="body-default-s" className="crissel-footer__link">
              Galería
            </Text>
          </SmartLink>
          <SmartLink href="/tienda">
            <Text variant="body-default-s" className="crissel-footer__link">
              Tienda Nagaraku
            </Text>
          </SmartLink>
          <SmartLink href="/promos">
            <Text variant="body-default-s" className="crissel-footer__link">
              Promos
            </Text>
          </SmartLink>
        </Column>

        <Column gap="12">
          <Text variant="label-default-s" onBackground="brand-medium">
            Estudio
          </Text>
          <SmartLink href="/#sobre-nosotros">
            <Text variant="body-default-s" className="crissel-footer__link">
              Sobre nosotras
            </Text>
          </SmartLink>
          <SmartLink href="/#servicios">
            <Text variant="body-default-s" className="crissel-footer__link">
              Servicios
            </Text>
          </SmartLink>
          <SmartLink href="/#faq">
            <Text variant="body-default-s" className="crissel-footer__link">
              FAQ
            </Text>
          </SmartLink>
          <SmartLink href="/#contacto">
            <Text variant="body-default-s" className="crissel-footer__link">
              Contacto
            </Text>
          </SmartLink>
        </Column>

        <Column gap="12">
          <Text variant="label-default-s" onBackground="brand-medium">
            Síguenos
          </Text>
          <SmartLink href="https://instagram.com/crisselstudio.ec">
            <Text variant="body-default-s" className="crissel-footer__link">
              Instagram
            </Text>
          </SmartLink>
          <SmartLink href="https://wa.me/593992950683">
            <Text variant="body-default-s" className="crissel-footer__link">
              WhatsApp
            </Text>
          </SmartLink>
          <SmartLink href="https://bit.ly/crisselstudio">
            <Text variant="body-default-s" className="crissel-footer__link">
              Reservar cita
            </Text>
          </SmartLink>
        </Column>
      </Grid>

      <Row
        fillWidth
        maxWidth="l"
        horizontal="between"
        s={{ direction: 'column', gap: '8', horizontal: 'start' }}
        paddingTop="24"
        className="crissel-footer__bottom"
      >
        <Text variant="label-default-xs" className="crissel-footer__muted">
          © {year} Crissel Studio · Ambato, Ecuador
        </Text>
        <Text variant="label-default-xs" className="crissel-footer__muted">
          By Cris Pestañas
        </Text>
      </Row>
    </Column>
  )
}

export default Footer
