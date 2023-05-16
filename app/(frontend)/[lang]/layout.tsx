import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
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

type Props = {
  children?: ReactNode
  params: { lang: Locale }
}

export default async function RootLayout({ children, params }: Props) {
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang} className={inter.variable}>
      <body>
        <div className='flex min-h-screen flex-col'>
          <Header params={params} dict={dict} />
          <main className='relative grow bg-zinc-50'>{children}</main>
          <Footer params={params} dict={dict} />
          <TailwindIndicator />
        </div>
      </body>
    </html>
  )
}
