import FrontPage from 'components/FrontPage'
import { GetStaticProps } from 'next'
import { getFrontPage } from 'lib/sanity.client'
import { IFeatured, IPropiedad } from 'lib/interfaces'

interface PageProps {
  featured: IFeatured[]
  latest?: IPropiedad[]
}

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
