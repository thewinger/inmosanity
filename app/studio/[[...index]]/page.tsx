import { NextStudio } from 'next-sanity/studio'
import config from 'sanity.config'

// Pre-render at build time to avoid serverless timeout
export const dynamic = 'force-static'

// Re-export metadata and viewport from next-sanity/studio
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
