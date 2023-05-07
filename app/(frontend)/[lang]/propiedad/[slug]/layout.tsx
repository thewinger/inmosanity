import { ReactNode } from 'react'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default function SlugRoute({ children }: { children: ReactNode }) {
  return <>{children}</>
}
