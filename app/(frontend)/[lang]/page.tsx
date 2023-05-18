import FeaturedSlider from '@/components/FeaturedSlider'
import Hero from '@/components/Hero'
import PropiedadCard from '@/components/ui/PropiedadCard'
import { getDictionary } from '@/get-dictionary'
import { Locale, i18n } from '@/i18n-config'
import { getFiltersDropdownValues, getFrontPage } from '@/lib/sanity.client'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

function HeroFallBack() {
  return <>placeholder</>
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const title =
    params.lang === 'en'
      ? 'InmoGolfBonalba | Tu real estate agent in Bonalba '
      : 'InmoGolfBonalba | Tu inmobiliaria en Bonalba'

  return {
    title: {
      default: title,
      template: 'InmoGolf Bonalba | %s',
    },
  }
}

export default async function FrontPage({
  params,
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)
  const { featured, latest } = await getFrontPage(params.lang)
  const filtersDD = await getFiltersDropdownValues(params.lang)

  return (
    <>
      <Suspense fallback={<HeroFallBack />}>
        <Hero params={params} dict={dict} filtersDD={filtersDD} />
      </Suspense>
      <section className='relative mx-auto max-w-5xl py-4 lg:px-4'>
        <h2 className='p-2 px-4 text-sm font-semibold  uppercase tracking-wide text-zinc-800 lg:px-0'>
          {dict.destacados}
        </h2>
        <div className='xhidden lg:block'>
          <FeaturedSlider params={params} propiedades={featured} />
        </div>
      </section>
      <section className='relative mx-auto max-w-5xl p-4 py-16 '>
        <h2 className='py-2 text-sm font-semibold uppercase tracking-wide text-zinc-800 lg:px-0'>
          {dict.ultimos_anadidos}
        </h2>
        <div className='grid grid-cols-cards gap-6'>
          {latest.map((propiedad) => (
            <Link
              key={propiedad.slug}
              href={`${params.lang}/propiedad/${propiedad.slug}`}
            >
              <PropiedadCard dict={dict} propiedad={propiedad} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const locales = i18n.locales

  const params = locales!.flatMap((locale) => {
    return {
      lang: locale,
    }
  })

  return params
}
