import type { Metadata, Viewport } from 'next'

// Force static generation to avoid serverless timeout
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: 'noindex, nofollow',
  referrer: 'same-origin',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
