import { Button, Column, Heading, Text } from '@once-ui-system/core'

export default function BlogPostNotFound() {
  return (
    <Column as="main" fillWidth center minHeight="100vh" paddingX="24" gap="16">
      <Heading as="h1" variant="display-strong-xs" onBackground="brand-strong" align="center">
        Artículo no encontrado
      </Heading>
      <Text onBackground="neutral-medium" align="center" style={{ maxWidth: '28rem' }}>
        No pudimos encontrar el contenido que buscas. Puede que el enlace haya cambiado o el
        artículo ya no esté disponible.
      </Text>
      <Button href="/blog" variant="secondary" prefixIcon="arrowLeft" label="Volver al blog" />
    </Column>
  )
}
