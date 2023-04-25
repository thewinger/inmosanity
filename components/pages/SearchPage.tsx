import { Propiedad } from '@/lib/interfaces'
import Link from 'next/link'
import PropiedadCard from '../ui/PropiedadCard'

type SearchPage = {
  results: Propiedad[]
}

const SearchPage = ({ results }: SearchPage) => {
  return (
    <div className='py-24'>
      <h2 className='xtext-lg p-2 px-4 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
        {results.length > 1
          ? `${results.length} Resultados`
          : `${results.length} Resultado`}
      </h2>
      <div className='grid grid-cols-1 gap-6'>
        {results.map((propiedad) => (
          <Link key={propiedad.slug} href={`/propiedad/${propiedad.slug}`}>
            <PropiedadCard propiedad={propiedad} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
