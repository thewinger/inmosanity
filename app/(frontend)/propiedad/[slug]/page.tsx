import PropiedadPage from '@/components/pages/PropiedadPage'
import { getAllPropiedadesSlug, getPropiedadBySlug } from 'lib/sanity.client'
import type { Metadata } from 'next'

interface IParams {
  params: {
    slug: string
  }
}

export default async function PropiedadSlugRoute({
  params: { slug },
}: IParams) {
  const propiedadData = getPropiedadBySlug({ slug })
  const propiedad = await propiedadData

  return <PropiedadPage propiedad={propiedad} />
}

export async function generateMetadata({
  params: { slug },
}: IParams): Promise<Metadata> {
  const propiedadData = getPropiedadBySlug({ slug })
  const propiedad = await propiedadData

  return {
    title: `Propiedad ${propiedad.title}`,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPropiedadesSlug()

  return slugs
}
