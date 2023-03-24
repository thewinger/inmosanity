import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="overflow-x-hidden bg-zinc-50 font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
