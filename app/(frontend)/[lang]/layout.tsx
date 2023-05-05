import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  params: { lang: Locale }
}

export default async function IndexRoute({ children, params }: Props) {
  const dict = await getDictionary(params.lang)
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='relative grow bg-zinc-50'>{children}</main>
      <Footer params={params} dict={dict} />
      <TailwindIndicator />
    </div>
  )
}
