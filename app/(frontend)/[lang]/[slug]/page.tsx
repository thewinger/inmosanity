import { Locale, i18n } from '@/i18n-config'
import { getAllPagesSlug, getPageBySlug } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    slug: string
    lang: Locale
  }
}

export default async function Page({ params: { slug, lang } }: Props) {
  const pageData = getPageBySlug(slug, lang)
  const page = await pageData

  if (slug !== 'aviso-legal') {
    redirect(`/${lang}/propiedades?operacion=${slug}`)
  }

  return (
    <article className='prose prose-zinc mx-auto px-4 py-12'>
      <PortableText value={page.content} />
    </article>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllPagesSlug()
  const locales = i18n.locales

  const params = locales!.flatMap((locale) => {
    return slugs!.map((slug) => {
      return { lang: locale, slug: slug }
    })
  })

  return params
}
