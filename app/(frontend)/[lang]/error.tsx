'use client'

import Link from 'next/link'
import { useEffect } from 'react'

/**
 * Error boundary for the [lang] segment.
 * Must be a Client Component to handle runtime errors.
 *
 * The error boundary catches errors from child components and
 * provides a recovery UI with a reset button.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Route error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <svg
          className="h-12 w-12 text-red-600"
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
      <h2 className="mt-4 text-2xl font-semibold text-zinc-800">
        ¡Algo salió mal!
        <span className="mx-2 text-zinc-400">|</span>
        <span className="text-zinc-600">Something went wrong!</span>
      </h2>
      <p className="mt-2 max-w-md text-zinc-600">
        Ha ocurrido un error inesperado.
      </p>
      {error.digest && (
        <p className="mt-2 text-sm text-zinc-400">
          Error ID: {error.digest}
        </p>
      )}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
        >
          Intentar de nuevo / Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          Volver al inicio / Go home
        </Link>
      </div>
    </div>
  )
}
