import 'styles/global.css'

import { Inter } from '@next/font/google'
import { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.variable};
          }
        `}
      </style>

      <Component {...pageProps} />
    </>
  )
}
