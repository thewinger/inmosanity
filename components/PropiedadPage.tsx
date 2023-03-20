import { IPropiedad } from 'lib/interfaces'
import { notFound } from 'next/navigation'
import Layout from './Layout'

export interface PropiedadPageProps {
  preview?: boolean
  loading?: boolean
  propiedad: IPropiedad
}

export default function PropiedadPage(props: PropiedadPageProps) {
  const { propiedad } = props

  const slug = propiedad?.slug

  if (!slug) {
    notFound()
  }

  return (
    <Layout>
      <h1>{propiedad.title}</h1>
      <div>{JSON.stringify(propiedad)}</div>
    </Layout>
  )
}
