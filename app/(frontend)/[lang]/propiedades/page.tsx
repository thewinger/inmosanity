import Filters from '@/components/ui/filters'
import PropiedadCard from '@/components/ui/PropiedadCard'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import {
  getFiltersDropdownValues,
  getSearchProperties,
} from '@/lib/sanity.client'
import clsx from 'clsx'
import Link from 'next/link'

export default async function PropiedadesPage({
  searchParams,
  params: { lang },
}: {
  searchParams: { [key: string]: string | string[] }
  params: { lang: Locale }
}) {
  const filtersDD = await getFiltersDropdownValues(lang)
  const propiedades = await getSearchProperties(searchParams, lang)
  const dict = await getDictionary(lang)

  return (
    <>
      <div className=' mx-auto flex max-w-5xl flex-col gap-6 px-4 py-24 lg:flex-row lg:px-6 lg:py-12'>
        <div className='relative isolate hidden w-[18.5rem] flex-col lg:flex'>
          <h2 className='py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
            Filtros
          </h2>
          <Filters
            dict={dict.filters}
            filtersDD={filtersDD}
            searchParams={searchParams}
          />
        </div>
      </div>

      <div className='grow'>
        <h2 className=' py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
          {propiedades.length > 1 || propiedades.length == 0
            ? `${propiedades.length} Resultados`
            : `${propiedades.length} Resultado`}
        </h2>
        <div
          className={clsx(
            'grid  grid-cols-cards gap-4',
            propiedades.length > 1 ? 'justify-center' : ''
          )}
        >
          {propiedades.map((propiedad) => (
            <Link key={propiedad.slug} href={`/propiedad/${propiedad.slug}`}>
              <PropiedadCard propiedad={propiedad} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
