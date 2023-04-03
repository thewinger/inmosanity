import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export default function IndexRoute({ children }: { children: ReactNode }) {
  /* const token = getPreviewToken() */
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      <main className="pt-32">{children}</main>
      <Footer />
    </>
  )
}
