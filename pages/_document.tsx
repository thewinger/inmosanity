import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-slate-50 dark:bg-slate-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
