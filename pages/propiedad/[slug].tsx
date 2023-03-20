import PropiedadPage from 'components/PropiedadPage'
import { IPropiedad } from 'lib/interfaces'
import { getAllPropiedadesSlug, getPropiedadBySlug } from 'lib/sanity.client'
import { GetStaticProps } from 'next'

interface PageProps {
  propiedad: IPropiedad
}

interface Query {
  [key: string]: string
}

export default function PropiedadSlugRoute(props: PageProps) {
  const { propiedad } = props

  return <PropiedadPage propiedad={propiedad} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx

  const propiedad = await getPropiedadBySlug(params.slug)

  if (!propiedad) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      propiedad,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPropiedadesSlug()

  return {
    paths: slugs?.map(({ slug }) => `/propiedad/${slug}`) || [],
    fallback: 'blocking',
  }
}
