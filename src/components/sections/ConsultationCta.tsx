'use client'

import Image from 'next/image'
import { Button, Column } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const ConsultationCta = () => {
  return (
    <section className="crissel-band" aria-labelledby="consulta-title">
      <div className="crissel-band__media">
        <Image
          src="/assets/gallery/maquillaje-fantasia-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="crissel-band__wash" aria-hidden />
      </div>
      <Column className="crissel-band__content" gap="24" horizontal="center" paddingX="l">
        <SectionHeader
          tone="dark"
          eyebrow="Cómo trabajamos"
          title="Asesoría"
          titleAccent="personal"
          description="Antes de recomendar, queremos entender qué buscas y qué es realista para ti."
        />
        <Button href="https://bit.ly/crisselstudio" label="Agendar consulta" prefixIcon="calendar" />
      </Column>
    </section>
  )
}

export default ConsultationCta
