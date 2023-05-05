import { Locale } from '@/i18n-config'
import { getPageBySlug } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'

type Props = {
  params: {
    pagina: string
    lang: Locale
  }
}

export default async function Page({ params: { pagina, lang } }: Props) {
  const pageData = getPageBySlug(pagina, lang)
  const page = await pageData

  return (
    <article className='prose prose-zinc mx-auto px-4 py-12'>
      <PortableText value={page.content} />
    </article>
  )
}
