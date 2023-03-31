import 'styles/global.css'

import { ReactNode } from 'react'
import { Inter } from '@next/font/google'
import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
