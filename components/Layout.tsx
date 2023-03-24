import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className={ `${inter.variable} font-sans mx-auto my-6` }>{children}</main>
      <Footer />
    </>
  )
}
