import PropiedadPage from '@/components/pages/PropiedadPage'
import { getAllPropiedadesSlug, getPropiedadBySlug } from 'lib/sanity.client'

export default async function PropiedadSlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  const propiedad = await getPropiedadBySlug({ slug: params.slug })

  return <PropiedadPage propiedad={propiedad} />
}

export async function generateStaticParams() {
  const slugs = await getAllPropiedadesSlug()

  return slugs
}
