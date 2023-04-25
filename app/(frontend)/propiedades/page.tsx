import FilterBar from '@/components/FilterBar'
import { FadersIcon } from '@/components/ui/icons'
import { getFiltersDropdownValues } from '@/lib/sanity.client'
import { Suspense } from 'react'

const FilterbarFallback = () => {
  return (
    <button
      className={`relative flex h-10 w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-800  shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
    >
      <FadersIcon weight='bold' size={16} />
      <span>Filtros</span>
    </button>
  )
}

const PropiedadesPage = async () => {
  const filtersDD = await getFiltersDropdownValues()

  return (
    <>
      <Suspense fallback={<FilterbarFallback />}>
        <FilterBar {...filtersDD} />
      </Suspense>
      <div>{}</div>
    </>
  )
}
export default PropiedadesPage
