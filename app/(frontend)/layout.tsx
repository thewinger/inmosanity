import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ReactNode } from 'react'

export default function IndexRoute({ children }: { children: ReactNode }) {
  /* const token = getPreviewToken() */
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      <main className=''>{children}</main>
      <Footer />
      <TailwindIndicator />
    </>
  )
}
