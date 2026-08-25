'use client'

import { Column, Grid, Heading, Row, Text } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const standards = [
  {
    number: '01',
    title: 'Higiene sin atajos',
    description:
      'Instrumental desinfectado, superficies limpias y protocolos claros en cada cita. Es parte no negociable del servicio.',
  },
  {
    number: '02',
    title: 'Productos profesionales',
    description:
      'Trabajamos con marcas y materiales pensados para el salón. Calidad que se nota en el resultado y en la comodidad.',
  },
  {
    number: '03',
    title: 'Formación continua',
    description:
      'Actualizamos técnicas y tendencias para ofrecerte lo que realmente funciona hoy — no lo de hace años.',
  },
  {
    number: '04',
    title: 'Asesoría honesta',
    description:
      'Te recomendamos solo lo que te favorece. Si algo no te conviene, te lo decimos. El buen resultado importa más que vender de más.',
  },
]

const Standards = () => {
  return (
    <section id="estandares" className="crissel-section crissel-section--rose">
      <div className="crissel-section__inner">
        <SectionHeader
          eyebrow="Nuestros estándares"
          title="En lo que puedes"
          titleAccent="confiar"
          description="El cuidado se nota en los detalles. Estos cuatro estándares aplican en cada tratamiento."
        />

        <Grid columns="2" gap="20" s={{ columns: 1 }} fillWidth>
          {standards.map((item) => (
            <Column
              key={item.number}
              background="surface"
              border="neutral-alpha-weak"
              radius="l"
              padding="24"
              gap="16"
            >
              <Row gap="16" vertical="start">
                <Text variant="label-default-s" onBackground="brand-medium">
                  {item.number}
                </Text>
                <Column gap="8">
                  <Heading as="h3" variant="heading-strong-m" className="font-display">
                    {item.title}
                  </Heading>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                </Column>
              </Row>
            </Column>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default Standards
