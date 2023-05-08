'use client'

import { Locale } from '@/i18n-config'
import { Propiedad } from '@/lib/interfaces'
import { getSearchProperties } from '@/lib/sanity.client'
import { clsx } from 'clsx'
import { useParams, useSearchParams } from 'next/navigation'

export default function SearchResults() {
  const params = useParams()
  const searchParams = useSearchParams()
  const propiedades: Propiedad[] = getSearchProperties(
    searchParams,
    params.lang as Locale
  )

  console.log(`propiedades`, propiedades)
  console.log(`searchparams`, searchParams.entries())

  return (
    <>
      {propiedades && (
        <>
          {/* <h2 className=' py-2 text-sm font-semibold uppercase  tracking-wide text-zinc-800 lg:px-0'>
            {propiedades.length > 1 || propiedades.length == 0
              ? `${propiedades.length} Resultados`
              : `${propiedades.length} Resultado`}
          </h2> */}
          <div
            className={clsx(
              'grid  grid-cols-cards gap-4',
              propiedades.length > 1 ? 'justify-center' : ''
            )}
          >
            {JSON.stringify(propiedades)}
            {/* {propiedades.map((propiedad) => (
              <Link
                key={propiedad.slug}
                href={`/${params.lang}/propiedad/${propiedad.slug}`}
              >
                <PropiedadCard propiedad={propiedad} />
              </Link>
            ))} */}
          </div>
        </>
      )}
    </>
  )
}
