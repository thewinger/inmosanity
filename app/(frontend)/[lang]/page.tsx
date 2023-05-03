import FeaturedSlider from '@/components/FeaturedSlider'
import Hero from '@/components/Hero'
import ProductSlider from '@/components/ProductSlider'
import PropiedadCard from '@/components/ui/PropiedadCard'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { getFiltersDropdownValues, getFrontPage } from '@/lib/sanity.client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Image } from 'sanity'

function HeroFallBack() {
  return <>placeholder</>
}

export default async function FrontPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  console.log(lang)
  const dict = await getDictionary(lang)
  const { featured, latest } = await getFrontPage()
  const filters = await getFiltersDropdownValues()

  if (!featured || !latest) {
    notFound()
  }

  let slides: Image[] = []

  featured.map((item) => {
    slides.push(item.coverImage)
  })

  return (
    <>
      <Suspense fallback={<HeroFallBack />}>
        <Hero {...filters} />
      </Suspense>
      <section className='relative mx-auto max-w-5xl py-4 lg:px-4'>
        <h2 className='p-2 px-4 text-sm font-semibold  uppercase tracking-wide text-zinc-800 lg:px-0'>
          {dict.destacados}
        </h2>
        <div className='lg:hidden'>
          <FeaturedSlider propiedades={featured} />
        </div>
        <div className='hidden lg:block'>
          <ProductSlider slides={slides} />
        </div>
      </section>
      <section className='relative mx-auto max-w-5xl p-4 py-16 '>
        <h2 className='py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
          {dict.ultimos_anadidos}
        </h2>
        <div className='grid grid-cols-cards gap-6'>
          {latest.map((propiedad) => (
            <Link key={propiedad.slug} href={`/propiedad/${propiedad.slug}`}>
              <PropiedadCard propiedad={propiedad} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
