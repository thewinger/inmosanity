import FrontPage from '@/components/pages/FrontPage'
import { getFrontPage } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'

export default async function IndexRoute() {
  const { featured, latest } = await getFrontPage()

  if (!featured && !latest) {
    notFound()
  }

  return <FrontPage featured={featured} latest={latest} />
}
