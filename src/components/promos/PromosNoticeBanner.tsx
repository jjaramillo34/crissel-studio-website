'use client'

import { Column, Icon, Line, Row, Text } from '@once-ui-system/core'
import { COUPON_FCFS_LIMIT, SORTEO_COPY_BANNER } from '@/data/raffle'

const NoticeIcon = ({ name, tone }: { name: string; tone: 'accent' | 'brand' }) => (
  <Row center width="56" height="56" radius="l" solid={`${tone}-strong`} style={{ flexShrink: 0 }}>
    <Icon name={name} size="l" onSolid={`${tone}-strong`} />
  </Row>
)

export function PromosNoticeBanner() {
  return (
    <Row
      fillWidth
      background="surface"
      border="accent-alpha-medium"
      radius="xl"
      padding="32"
      gap="40"
      m={{ direction: 'column', gap: '24' }}
      s={{ padding: '20' }}
    >
      <Row flex={1} gap="16">
        <NoticeIcon name="ticket" tone="accent" />
        <Column gap="8">
          <Text variant="heading-strong-l">Solo {COUPON_FCFS_LIMIT} cupones promo — orden de llegada</Text>
          <Text variant="body-default-s" onBackground="neutral-medium">
            Estamos entregando <strong>{COUPON_FCFS_LIMIT} cupones</strong> para las{' '}
            <strong>primeras {COUPON_FCFS_LIMIT} personas</strong> que reserven durante esta campaña.
            Primero en llegar, primero en servirse.
          </Text>
        </Column>
      </Row>

      <Line vert background="accent-alpha-medium" m={{ hide: true }} />

      <Row flex={1} gap="16">
        <NoticeIcon name="wand" tone="brand" />
        <Column gap="8">
          <Row gap="8" vertical="center">
            <Icon name="crown" size="s" onBackground="accent-strong" />
            <Text variant="heading-strong-l">Sorteo: maquillaje</Text>
          </Row>
          <Text variant="body-default-s" onBackground="neutral-medium">
            Participa con tu número abajo. {SORTEO_COPY_BANNER}
          </Text>
        </Column>
      </Row>
    </Row>
  )
}
