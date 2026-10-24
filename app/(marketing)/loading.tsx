import { Column, Heading, Media, Spinner, Text } from '@once-ui-system/core'

export default function LoadingScreen() {
  return (
    <Column fillWidth center minHeight="100vh" gap="16" padding="24">
      <Media
        src="/assets/images/logo_photo.png"
        alt="Crissel Studio Logo"
        width={8}
        height={8}
        fillWidth={false}
        objectFit="contain"
        priority
      />
      <Heading as="p" variant="display-strong-s" onBackground="brand-strong" align="center">
        Crissel Studio
      </Heading>
      <Text variant="body-default-l" onBackground="neutral-medium" align="center">
        ¡Realza el poder de tu mirada!
      </Text>
      <Spinner size="m" ariaLabel="Cargando" />
    </Column>
  )
}
