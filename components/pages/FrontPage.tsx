'use client'

import FeaturedSlider from '../FeaturedSlider'
import PropiedadCard from '../ui/PropiedadCard'
import { IFeatured, IPropiedad } from 'lib/interfaces'
import Link from 'next/link'

export interface IFrontPageProps {
  featured: IFeatured[]
  latest: IPropiedad[]
}

export default function FrontPage(props: IFrontPageProps) {
  const { featured, latest } = props

  return (
    <>
      <section className="relative pb-6">
        <h2 className="p-2 px-4 text-lg font-semibold uppercase tracking-wide text-zinc-800 lg:px-0">
          Destacados
        </h2>
        <FeaturedSlider propiedades={featured} />
      </section>
      <section className="relative p-4">
        <h2 className="py-2 text-lg font-semibold uppercase tracking-wide text-zinc-800 lg:px-0">
          Ultimos añadidos{' '}
        </h2>
        <div className="grid grid-cols-1 gap-6">
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
