import FilterBar from '@/components/FilterBar'

import SearchPage from '@/components/pages/SearchPage'
import { FadersIcon } from '@/components/ui/icons'
import {
  getFiltersDropdownValues,
  getSearchProperties,
} from '@/lib/sanity.client'
import { ChaoticOrbit } from '@uiball/loaders'
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

const PropiedadesPage = async ({ searchParams }: SearchParams) => {
  const filtersDD = await getFiltersDropdownValues()
  console.log('searchParams', searchParams)
  const searchResults = await getSearchProperties({ searchParams })

  console.log('resutls', searchResults)

  return (
    <>
      <Suspense fallback={<div>Filter</div>}>
        <FilterBar filtersDD={filtersDD} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<ChaoticOrbit size={48} speed={5} />}>
        <SearchPage results={searchResults} />
      </Suspense>
    </>
  )
}
export default PropiedadesPage
