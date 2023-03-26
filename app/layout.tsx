import 'styles/global.css'

import { ReactNode } from 'react'
import { Inter } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})
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
