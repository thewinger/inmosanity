import FilterBar from '@/components/FilterBar'
import Filters from '@/components/ui/filters'

import PropiedadCard from '@/components/ui/PropiedadCard'
import {
  getFiltersDropdownValues,
  getSearchProperties,
} from '@/lib/sanity.client'
import clsx from 'clsx'
import Link from 'next/link'

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] }
}) {
  const filtersDD = await getFiltersDropdownValues()
  const results = await getSearchProperties({ searchParams })

  return (
    <>
      <FilterBar filtersDD={filtersDD} searchParams={searchParams} />
      <div className=' mx-auto flex max-w-5xl flex-col gap-6 px-4 py-24 lg:flex-row lg:px-6 lg:py-12'>
        <div className='relative isolate hidden w-[18.5rem] flex-col lg:flex'>
          <h2 className='py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
            Filtros
          </h2>
          <Filters filtersDD={filtersDD} searchParams={searchParams} />
        </div>

        <div className='grow'>
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
      </div>
    </>
  )
}
