import FilterBar from '@/components/FilterBar'
import SearchPage from '@/components/pages/SearchPage'

import { FadersIcon } from '@/components/ui/icons'
import {
  getFiltersDropdownValues,
  getSearchProperties,
} from '@/lib/sanity.client'
import { Suspense } from 'react'

const FilterBarFallBack = () => {
  return (
    <button
      className={`relative flex h-10 w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-800  shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
    >
      <FadersIcon weight='bold' size={16} />
      <span>Filtros</span>
    </button>
  )
}

interface SearchParams {
  searchParams: { [key: string]: string | string[] }
}

export default async function PropiedadesPage({
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] }
}) {
  const filtersDD = await getFiltersDropdownValues()
  const searchResults = await getSearchProperties({ searchParams })

  console.log(searchResults)
  return (
    <>
      <Suspense fallback={<FilterBarFallBack />}>
        <FilterBar filtersDD={filtersDD} searchParams={searchParams} />
      </Suspense>
      <SearchPage results={searchResults} />
    </>
  )
}
