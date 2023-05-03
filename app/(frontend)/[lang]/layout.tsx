import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ReactNode } from 'react'

export default function IndexRoute({ children }: { children: ReactNode }) {
  /* const token = getPreviewToken() */
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='relative grow bg-zinc-50'>{children}</main>
      <Footer />
      <TailwindIndicator />
    </div>
  )
}
