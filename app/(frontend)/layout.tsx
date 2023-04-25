import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ReactNode } from 'react'

export default function IndexRoute({ children }: { children: ReactNode }) {
  /* const token = getPreviewToken() */
  return (
    <>
      <Header />
      <main className='relative bg-zinc-50'>{children}</main>
      <Footer />
      <TailwindIndicator />
    </>
  )
}
