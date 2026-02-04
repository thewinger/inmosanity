/**
 * Metadata exports for Sanity Studio
 * These must be in a server component (layout.tsx) separate from the client component page
 */
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
