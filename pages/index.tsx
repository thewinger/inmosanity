import FrontPage from 'components/FrontPage'
import { GetStaticProps } from 'next'
import { getFrontPage } from 'lib/sanity.client'
import { IFeatured, IPropiedad } from 'lib/interfaces'
import Layout from '@/components/Layout'

interface PageProps {
  featured: IFeatured[]
  latest?: IPropiedad[]
}
let priceInit = {
  min: '0',
  max: '100000',
}

let bedroomsInit = {
  min: '0',
  max: '5',
}

let bathroomsInit = {
  min: '0',
  max: '5',
}

let operacionInit = [
  {
    name: 'Todas',
    value: 'all',
  },
  {
    name: 'En Venta',
    value: 'en-venta',
  },
  {
    name: 'En Alquiler',
    value: 'en-alquiler',
  },
  {
    name: 'Obra nueva',
    value: 'obra-nueva',
  },
]

let localizacionInit = [
  {
    name: 'Todas',
    value: 'all',
  },
]

let tipoInit = [
  {
    name: 'Todas',
    value: 'all',
  },
]

export default function IndexPage(props: PageProps) {
  const { featured, latest } = props

  return <FrontPage featured={featured} latest={latest} />
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { featured, latest } = await getFrontPage()

  return {
    props: {
      featured,
      latest,
    },
  }
}
