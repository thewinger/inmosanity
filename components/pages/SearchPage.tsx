import { Propiedad } from '@/lib/interfaces'
import clsx from 'clsx'
import Link from 'next/link'
import PropiedadCard from '../ui/PropiedadCard'

type SearchPage = {
  results: Propiedad[]
}

const SearchPage = ({ results }: SearchPage) => {
  return (
    <div className='mx-auto max-w-5xl px-4 py-24 lg:px-6 lg:py-24'>
      <h2 className=' py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
        {results.length > 1 || results.length == 0
          ? `${results.length} Resultados`
          : `${results.length} Resultado`}
      </h2>
      <div
        className={clsx(
          'grid  grid-cols-cards gap-4',
          results.length > 1 ? 'justify-center' : ''
        )}
      >
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
