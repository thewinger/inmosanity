import { Propiedad } from '@/lib/interfaces'
import Link from 'next/link'
import PropiedadCard from '../ui/PropiedadCard'

type SearchPage = {
  results: Propiedad[]
}

const SearchPage = ({ results }: SearchPage) => {
  return (
    <div className='grid grid-cols-1 gap-6'>
      {results.map((propiedad) => (
        <Link key={propiedad.slug} href={`/propiedad/${propiedad.slug}`}>
          <PropiedadCard propiedad={propiedad} />
        </Link>
      ))}
    </div>
  )
}

export default SearchPage
