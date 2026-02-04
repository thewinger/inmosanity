import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

// Pre-generate the root studio path, catch-all handles client-side navigation
export function generateStaticParams() {
  return [{ index: [] }]
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
