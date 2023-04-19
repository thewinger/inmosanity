import { Featured, Propiedad } from 'lib/interfaces'
import Link from 'next/link'
import FeaturedSlider from '../FeaturedSlider'
import PropiedadCard from '../ui/PropiedadCard'

export interface IFrontPageProps {
  featured: Featured[]
  latest: Propiedad[]
}

export default function FrontPage(props: IFrontPageProps) {
  const { featured, latest } = props

  return (
    <>
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
}
