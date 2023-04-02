import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function IndexRoute({ children }: { children: ReactNode }) {
  /* const token = getPreviewToken() */
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      {children}
      <Footer />
    </>
  )
}
