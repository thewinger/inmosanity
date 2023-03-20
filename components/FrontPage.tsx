import { IFeatured, IPropiedad } from 'sanity/lib/sanity.interfaces'

export interface IFrontPageProps {
  featured: IFeatured[]
  latest: IPropiedad[]
}

export default function FrontPage(props: IFrontPageProps) {
  const { featured, latest } = props

  return (
    <>
      <h1>Frontpage</h1>
      <h2>Destacados</h2>
      <div>{JSON.stringify(featured)}</div>
      <h2>Recientes</h2>
      <div>{JSON.stringify(latest)}</div>
    </>
  )
}
