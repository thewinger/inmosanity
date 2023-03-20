import 'styles/global.css'

import { Inter } from '@next/font/google'
import { AppProps } from 'next/app'

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${sans.style.fontFamily};
          }
        `}
      </style>

      <Component {...pageProps} />
    </>
  )
}
