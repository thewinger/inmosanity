'use client'
import { Suspense, useEffect } from 'react'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>
}

const Fallback = () => {
  useEffect(() => {
    import('ldrs').then(({ ring }) => {
      ring.register()
    })
  }, [])

  return <l-ring size="25" speed="1.5" color="black"></l-ring>
}
