import SearchResults from '@/components/SearchResults'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { getFiltersDropdownValues } from '@/lib/sanity.client'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

type Props = {
  params: {
    lang: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PropiedadesPage({
  params,
  searchParams,
}: {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] }
}) {
  const dict = await getDictionary(params.lang)
  const filtersDD = await getFiltersDropdownValues(params.lang)

  console.log('propiedades params', params)
  console.log('propiedades searchparams', searchParams)

  return (
    <>
      {/* <div className=' mx-auto flex max-w-5xl flex-col gap-6 px-4 py-24 lg:flex-row lg:px-6 lg:py-12'>
        <div className='relative isolate hidden w-[18.5rem] flex-col lg:flex'>
          <h2 className='py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
            Filtros
          </h2>
          <Filters dict={dict.filters} filtersDD={filtersDD} />
        </div>
      </div> */}

      <div className='grow'>
        <Suspense fallback={<ResultsFallBack />}>
          <SearchResults />
        </Suspense>
      </div>
    </>
  )
}

function ResultsFallBack() {
  return <>Loading Results…</>
}
