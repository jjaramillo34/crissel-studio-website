'use client'

import { Column, Grid, Heading, Icon, RevealFx, Text } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const standards = [
  {
    number: '01',
    icon: 'shieldCheck',
    title: 'Higiene sin atajos',
    description:
      'Instrumental desinfectado, superficies limpias y protocolos claros en cada cita. Es parte no negociable del servicio.',
  },
  {
    number: '02',
    icon: 'sparkle',
    title: 'Productos profesionales',
    description:
      'Trabajamos con marcas y materiales pensados para el salón. Calidad que se nota en el resultado y en la comodidad.',
  },
  {
    number: '03',
    icon: 'academic',
    title: 'Formación continua',
    description:
      'Actualizamos técnicas y tendencias para ofrecerte lo que realmente funciona hoy — no lo de hace años.',
  },
  {
    number: '04',
    icon: 'chat',
    title: 'Asesoría honesta',
    description:
      'Te recomendamos solo lo que te favorece. Si algo no te conviene, te lo decimos. El buen resultado importa más que vender de más.',
  },
]

/** Dark plum band: breaks up the pastel sections between Treatments and the CTA */
const Standards = () => {
  return (
    <section id="estandares" className="crissel-section crissel-section--ink">
      <div className="crissel-section__inner">
        <SectionHeader
          tone="dark"
          eyebrow="Nuestros estándares"
          title="En lo que puedes"
          titleAccent="confiar"
          description="El cuidado se nota en los detalles. Estos cuatro estándares aplican en cada tratamiento."
        />

        <Grid columns="4" m={{ columns: 2 }} s={{ columns: 1 }} gap="20" fillWidth>
          {standards.map((item, index) => (
            <RevealFx key={item.number} delay={index * 0.1} translateY="16" fill>
              <Column as="article" fill gap="16" className="crissel-standard">
                <span className="crissel-standard__number font-display" aria-hidden>
                  {item.number}
                </span>
                <span className="crissel-standard__icon">
                  <Icon name={item.icon} size="m" />
                </span>
                <Heading as="h3" variant="heading-strong-l" className="font-display crissel-standard__title">
                  {item.title}
                </Heading>
                <Text variant="body-default-s" className="crissel-standard__desc">
                  {item.description}
                </Text>
              </Column>
            </RevealFx>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default Standards
