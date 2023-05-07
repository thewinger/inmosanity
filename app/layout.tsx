import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import 'styles/global.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: 'Inmogolf Bonalba',
  description: 'Inmobiliaria en el campo de golf Bonalba',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

type Props = {
  children?: ReactNode
  params: { lang: string }
}

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang} className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
