import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import 'styles/global.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Inmogolf Bonalba',
  description: 'Inmobiliaria en el campo de golf Bonalba',
}

type Props = {
  children?: ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      {/* <body className={`bg-zinc-50 ${RemoveScroll.classNames.fullWidth}`}> */}
      <body className={`bg-zinc-50 !mr-0`}>{children}</body>
    </html>
  )
}
