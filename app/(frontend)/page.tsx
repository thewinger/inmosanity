import FeaturedSlider from '@/components/FeaturedSlider'
import Hero from '@/components/Hero'
import PropiedadCard from '@/components/ui/PropiedadCard'
import { getFiltersDropdownValues, getFrontPage } from '@/lib/sanity.client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

function HeroFallBack() {
  return <>placeholder</>
}

export default async function FrontPage(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  const { featured, latest } = await getFrontPage()
  const filters = await getFiltersDropdownValues()

  if (!featured || !latest) {
    notFound()
  }

  return (
    <>
      <Suspense fallback={<HeroFallBack />}>
        <Hero {...filters} />
      </Suspense>
      <section className='relative pb-6'>
        <h2 className='xtext-lg p-2 px-4 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
          Destacados
        </h2>
        <FeaturedSlider propiedades={featured} />
      </section>
      <section className='relative p-4'>
        <h2 className='py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
          Ultimos añadidos{' '}
        </h2>
        <div className='grid grid-cols-1 gap-6'>
          {latest.map((propiedad) => (
            <Link key={propiedad.slug} href={`/propiedad/${propiedad.slug}`}>
              <PropiedadCard propiedad={propiedad} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
  /* <FrontPage filters={filters} featured={featured} latest={latest} /> */
}
