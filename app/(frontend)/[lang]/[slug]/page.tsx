import { Locale } from '@/i18n-config'
import { getPageBySlug } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'

type Props = {
  params: {
    slug: string
    lang: Locale
  }
}

export default async function Page({ params: { slug, lang } }: Props) {
  const pageData = getPageBySlug(slug, lang)
  const page = await pageData

  return (
    <article className='prose prose-zinc mx-auto px-4 py-12'>
      <PortableText value={page.content} />
    </article>
  )
}

/* export async function generateStaticParams() {
  const slugs = await getAllPagesSlug()

  return { slugs }
} */