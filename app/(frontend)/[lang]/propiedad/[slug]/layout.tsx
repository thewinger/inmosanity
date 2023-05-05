import { i18n } from '@/i18n-config'
import { ReactNode } from 'react'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function SlugRoute({ children }: { children: ReactNode }) {
  return <>{children}</>
}
