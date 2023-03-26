import { ReactNode } from 'react'

import 'styles/global.css'

import { Inter } from '@next/font/google'

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

type Props = {
  children?: ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={`${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
