import FilterBar from '@/components/FilterBar'
import { getFiltersDropdownValues } from '@/lib/sanity.client'

const PropiedadesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const filtersDD = await getFiltersDropdownValues()
  return (
    <>
      <FilterBar filtersDD={filtersDD} searchParams={searchParams} />
      <div>{JSON.stringify(searchParams)}</div>
    </>
  )
}
export default PropiedadesPage
