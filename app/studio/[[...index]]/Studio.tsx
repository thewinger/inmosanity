'use client'

import dynamic from 'next/dynamic'

const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#101112',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      Loading Studio...
    </div>
  ),
})

export default function Studio() {
  const config = require('sanity.config').default
  return <NextStudio config={config} />
}
