import FeaturedSlider from '@/components/FeaturedSlider'
import Hero from '@/components/Hero'
import PropiedadCard from '@/components/ui/PropiedadCard'
import { getDictionary } from '@/get-dictionary'
import { Locale, i18n } from '@/i18n-config'
import { getFiltersDropdownValues, getFrontPage } from '@/lib/sanity.client'
import { Metadata } from 'next'
import { Suspense } from 'react'

function HeroFallBack() {
  return <>placeholder</>
}

export async function generateMetadata(
  props: {
    params: Promise<{ lang: Locale }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const title =
    params.lang === 'en'
      ? 'InmoGolfBonalba | Your real estate agent in Bonalba Golf Club'
      : 'InmoGolfBonalba | Tu inmobiliaria en Club de Golf Bonalba'
  const description =
    params.lang === 'en'
      ? 'InmoGolf Bonalba, your real estate agent in Bonalba Golf Club'
      : 'Inmogolf Bonalba, tu Inmobiliaria en el campo de golf Bonalba'

  return {
    title: {
      default: title,
      template: 'InmoGolf Bonalba | %s',
    },
    description: description,
  }
}

export default async function FrontPage(
  props: {
    params: Promise<{ lang: Locale }>
  }
) {
  const params = await props.params;
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
            <PropiedadCard
              key={propiedad.slug}
              params={params}
              dict={dict}
              propiedad={propiedad}
            />
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
