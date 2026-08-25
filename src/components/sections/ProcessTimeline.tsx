'use client'

import { Button, Column, Grid, Heading, Row, Text } from '@once-ui-system/core'

const steps = [
  {
    number: '01',
    title: 'Te escuchamos',
    description:
      'Cada cita empieza con una conversación. Queremos saber qué deseas, cómo es tu rutina y qué resultado es realista para ti.',
    detail: 'Antes de cada primer servicio · unos minutos',
  },
  {
    number: '02',
    title: 'Tratamiento a tu medida',
    description:
      'No hay fórmulas fijas. Ajustamos técnica, productos y enfoque a ti, para que el resultado se vea y se sienta natural.',
    detail: 'Según el servicio · 60 a 180 minutos',
  },
  {
    number: '03',
    title: 'Cuidado después',
    description:
      'Te llevas una guía clara de mantenimiento. Y si surge alguna duda, puedes escribirnos cuando lo necesites.',
    detail: 'Por WhatsApp · cuando lo necesites',
  },
]

const ProcessTimeline = () => {
  return (
    <Column as="section" id="proceso" fillWidth horizontal="center" paddingX="l" gap="40">
      <Column fillWidth maxWidth="l" gap="16">
        <Column gap="16" maxWidth={40}>
          <Text variant="label-default-s" onBackground="brand-medium">
            Cómo trabajamos
          </Text>
          <Heading as="h2" variant="display-strong-s" className="font-display">
            Asesoría personal.
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
            Da igual si vienes por pestañas, cejas o maquillaje: cada tratamiento empieza con un
            diálogo.
          </Text>
          <Text variant="heading-default-s" onBackground="neutral-medium">
            “Antes de recomendar, queremos entender qué buscas y qué es realista.”
          </Text>
        </Column>
      </Column>

      <Grid columns="3" gap="20" m={{ columns: 1 }} fillWidth maxWidth="l">
        {steps.map((step) => (
          <Column
            key={step.number}
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
            padding="24"
            gap="16"
            fillHeight
          >
            <Text variant="label-default-s" onBackground="brand-medium">
              {step.number}
            </Text>
            <Heading as="h3" variant="heading-strong-m" className="font-display">
              {step.title}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {step.description}
            </Text>
            <Text variant="label-default-xs" onBackground="neutral-weak">
              {step.detail}
            </Text>
          </Column>
        ))}
      </Grid>

      <Column
        fillWidth
        maxWidth="l"
        background="brand-alpha-weak"
        border="brand-alpha-medium"
        radius="l"
        padding="32"
        gap="20"
        horizontal="between"
        s={{ direction: 'column' }}
      >
        <Column gap="8" maxWidth={32}>
          <Heading as="h3" variant="heading-strong-m" className="font-display">
            ¿Lista para tu cita?
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-medium">
            Reserva online o escríbenos. Te ayudamos a elegir el tratamiento ideal.
          </Text>
        </Column>
        <Row gap="12" s={{ direction: 'column', fillWidth: true }}>
          <Button href="https://bit.ly/crisselstudio" label="Reservar cita" />
          <Button variant="secondary" href="#contacto" label="Contacto" />
        </Row>
      </Column>
    </Column>
  )
}

export default ProcessTimeline
