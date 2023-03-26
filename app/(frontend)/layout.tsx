import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export default function IndexRoute({ children }: { children: ReactNode }) {
  /* const token = getPreviewToken() */
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
