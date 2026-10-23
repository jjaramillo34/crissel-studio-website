'use client'

import React from 'react'
import { Button, Column, Heading, Text } from '@once-ui-system/core'

const serializeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack
  }
  return JSON.stringify(error, null, 2)
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Column fillWidth center minHeight="100vh" padding="24">
          <Column
            fillWidth
            maxWidth="s"
            background="surface"
            border="danger-alpha-medium"
            radius="l"
            padding="32"
            gap="16"
          >
            <Heading as="h2" variant="heading-strong-xl" onBackground="danger-strong">
              Algo salió mal
            </Heading>
            <Text onBackground="neutral-medium">
              Lo sentimos, ha ocurrido un error inesperado. Por favor, recarga la página o contacta
              con nosotros si el problema persiste.
            </Text>
            {/* Stack traces are for developers only; don't show them to visitors */}
            {process.env.NODE_ENV !== 'production' && (
              <details>
                <summary>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Detalles del error
                  </Text>
                </summary>
                <Column
                  as="pre"
                  marginTop="8"
                  background="neutral-alpha-weak"
                  radius="m"
                  padding="16"
                  overflow="auto"
                  maxHeight={16}
                  textVariant="code-default-xs"
                >
                  {serializeError(this.state.error)}
                </Column>
              </details>
            )}
            <Button label="Recargar página" prefixIcon="refresh" onClick={() => window.location.reload()} />
          </Column>
        </Column>
      )
    }

    return this.props.children
  }
}
