import Link from 'next/link'

/**
 * Custom 404 page for the [lang] segment.
 * This is a Server Component - it renders when notFound() is called
 * or when a route doesn't match any page.
 *
 * Note: not-found.tsx cannot access route params directly,
 * so we provide bilingual content with the Spanish primary.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-green-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-zinc-800">
        Página no encontrada
        <span className="mx-2 text-zinc-400">|</span>
        <span className="text-zinc-600">Page not found</span>
      </h2>
      <p className="mt-2 max-w-md text-zinc-600">
        No hemos podido encontrar el recurso que buscas.
      </p>
      <p className="mt-1 max-w-md text-sm text-zinc-500">
        Could not find the resource you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
      >
        Volver al inicio / Go home
      </Link>
    </div>
  )
}
