import { ChaoticOrbit } from '@uiball/loaders'
import { Suspense } from 'react'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>
}

const Fallback = () => {
  return <ChaoticOrbit size={25} speed={1.5} color='black' />
}
