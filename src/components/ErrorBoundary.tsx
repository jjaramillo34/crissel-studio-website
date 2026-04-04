'use client'

import React from 'react'

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 p-4">
          <div className="max-w-2xl w-full p-6 border border-red-500 rounded-3xl bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Algo salió mal</h2>
            <p className="text-gray-700 mb-4">
              Lo sentimos, ha ocurrido un error inesperado. Por favor, recarga la página o contacta con nosotros si el problema persiste.
            </p>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 mb-2">
                Detalles del error
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
                {serializeError(this.state.error)}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#E57373] text-white rounded-full font-semibold hover:bg-[#c84d4d] transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
