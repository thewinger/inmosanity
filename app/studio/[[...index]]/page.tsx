import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

// Metadata exports from next-sanity/studio caused build errors in previous attempts
// Using hardcoded values instead (see layout.tsx for metadata/viewport)

export default function StudioPage() {
  return <NextStudio config={config} />
}
