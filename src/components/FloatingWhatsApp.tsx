'use client'

import { Button, IconButton, Row } from '@once-ui-system/core'

const WHATSAPP_URL = 'https://wa.me/593992950683'

const FloatingWhatsApp = () => (
  <Row position="fixed" bottom="24" left="24" zIndex={9} s={{ bottom: '16', left: '16' }}>
    <Row s={{ hide: true }}>
      <Button
        href={WHATSAPP_URL}
        size="l"
        prefixIcon="whatsapp"
        label="¿Necesitas ayuda? Escríbenos"
        aria-label="Chatea por WhatsApp con Crissel Studio"
      />
    </Row>
    <Row hide s={{ hide: false }}>
      <IconButton
        href={WHATSAPP_URL}
        size="l"
        icon="whatsapp"
        aria-label="Chatea por WhatsApp con Crissel Studio"
      />
    </Row>
  </Row>
)

export default FloatingWhatsApp
