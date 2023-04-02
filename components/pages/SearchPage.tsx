import { IPropiedad } from 'lib/interfaces'
import Link from 'next/link'

import Layout from './Layout'

interface IProps {
  propiedades: IPropiedad[]
}

export default function SearchPage({ propiedades }: IProps) {
  return (
    <Layout>
      <>
        <div>SearchPage</div>
      </>
    </Layout>
  )
}
