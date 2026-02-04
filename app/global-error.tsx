'use client'

import { useEffect } from 'react'

/**
 * Global error boundary for the root layout.
 * Catches errors that occur in the root layout itself.
 *
 * Must include <html> and <body> tags since this replaces
 * the entire document when the root layout fails.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              backgroundColor: '#fef2f2',
              borderRadius: '50%',
              padding: '1rem',
            }}
          >
            <svg
              style={{ width: '48px', height: '48px', color: '#dc2626' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2
            style={{
              marginTop: '1rem',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#27272a',
            }}
          >
            ¡Algo salió mal! | Something went wrong!
          </h2>
          <p style={{ marginTop: '0.5rem', color: '#71717a' }}>
            Ha ocurrido un error crítico. / A critical error occurred.
          </p>
          {error.digest && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#a1a1aa' }}>
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={() => reset()}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Intentar de nuevo / Try again
          </button>
        </div>
      </body>
    </html>
  )
}
