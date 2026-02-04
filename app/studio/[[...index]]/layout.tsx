import type { Metadata, Viewport } from 'next'

// Hardcoded metadata to avoid async operations that cause serverless timeout
export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

// Force dynamic rendering to skip prerendering
export const dynamic = 'force-dynamic'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
