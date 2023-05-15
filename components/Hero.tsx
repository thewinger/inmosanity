'use client'

import { Locale } from '@/i18n-config'
import { Dict, FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { MagnifyingGlassIcon } from './ui/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

interface Filters {
  operacion: string
}

type Props = {
  params: { lang: Locale }
  dict: Dict
  filtersDD: FiltersDD
}

export default function Hero({ params, dict, filtersDD }: Props) {
  const { operacionDD, localizacionDD, tipoDD } = filtersDD

  const preparedTipoDD = useMemo(() => {
    return [
      {
        name: `${dict.filters.tipo_allValue}`,
        value: 'tipo-todos',
      },
      ...tipoDD,
    ]
  }, [tipoDD, dict.filters.tipo_allValue])

  const preparedLocalizacionDD = useMemo(() => {
    return [
      {
        name: `${dict.filters.localizacion_allValue}`,
        value: 'localizacion-todas',
        children: [],
      },
      ...localizacionDD,
    ]
  }, [localizacionDD, dict.filters.localizacion_allValue])

  const [filters, setFilters] = useState<Filters>({
    operacion: 'operacion-en-venta',
  })
  const router = useRouter()

  const updateFilters = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const createQueryString = useCallback((filters: Filters) => {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
      searchParams.set(key, value)
    }

    return searchParams.toString()
  }, [])

  const handleFilters = async () => {
    router.push(`/${params.lang}/propiedades?` + createQueryString(filters))
  }

  return (
    <div className='relative mb-72 h-56 w-full bg-heroImg bg-cover bg-center bg-no-repeat pt-40 md:mb-48 lg:mb-24 lg:h-[480px]'>
      <div className='absolute  grid w-full max-w-4xl auto-rows-auto grid-cols-1 gap-3 rounded-xl  bg-gray-200/80 p-4 pb-6 shadow-xl backdrop-blur md:auto-rows-min md:grid-cols-2 lg:-bottom-16 lg:left-1/2 lg:-translate-x-1/2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4 lg:pb-4 '>
        {/* <h2 className='scroll-m-20 pb-2 text-center text-2xl font-semibold tracking-tight text-green-950 transition-colors first:mt-0 md:col-span-2 lg:col-span-4'>
          {dict.slogan}
        </h2> */}

        <ToggleGroup
          className='col-span-2 md:row-start-1 lg:col-span-2 lg:col-start-2'
          type='single'
          defaultValue={filters.operacion}
          value={filters.operacion}
          onValueChange={(value) => {
            if (value) {
              updateFilters('operacion', value)
            }
          }}
          aria-label='Tipo de operación'
        >
          {operacionDD.map((item) => (
            <ToggleGroupItem key={item.value} value={item.value}>
              {item.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Select
          name='tipo'
          /* defaultValue={initialState.tipo} */
          onValueChange={(value) => updateFilters('tipo', value)}
        >
          <SelectTrigger className='hover:shadow-inset xlg:row-start-3 col-span-2 md:col-span-1 md:row-start-2 lg:col-span-2'>
            <SelectValue
              className='truncate'
              placeholder={dict.filters.tipo_placeholder}
            />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {preparedTipoDD.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          name='localizacion'
          onValueChange={(value) => updateFilters('localizacion', value)}
        >
          <SelectTrigger className='col-span-2 md:col-span-1 md:col-start-2 md:row-start-2 lg:col-span-2'>
            <SelectValue placeholder={dict.filters.localizacion_placeholder} />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {preparedLocalizacionDD &&
              preparedLocalizacionDD.map((localizacion: ParentLocalizacion) => (
                <>
                  <SelectItem
                    key={localizacion.value}
                    value={localizacion.value}
                    className='py-1.5 pl-8 pr-2 text-sm font-semibold'
                  >
                    {localizacion.name}
                  </SelectItem>
                  {localizacion.children.length > 0 &&
                    localizacion.children.map((child) => (
                      <SelectItem key={child.value} value={child.value}>
                        - {child.name}
                      </SelectItem>
                    ))}
                </>
              ))}
          </SelectContent>
        </Select>
        <button
          onClick={() => handleFilters()}
          className='col-span-2 inline-flex h-9 items-center justify-center gap-1 rounded-md bg-gradient-to-b from-green-500 via-green-600 via-60% to-green-700  font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 md:col-span-2  md:row-start-3 lg:col-span-4'
        >
          <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
          {dict.filters.search_button}
        </button>
      </div>
    </div>
  )
}
