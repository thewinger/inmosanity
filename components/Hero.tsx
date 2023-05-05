'use client'

import { FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { MagnifyingGlassIcon } from './ui/icons'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

interface Filters {
  operacion: string
  localizacion?: string
  tipo: string
}

type Props = {
  dict: {
    filters: {
      search_button: string
      localizacion_placeholder: string
    }
    slogan: string
  }
  filtersDD: FiltersDD
}

export default function Hero({ dict, filtersDD }: Props) {
  const { operacionDD, localizacionDD, tipoDD } = filtersDD

  const initialState = {
    operacion: 'operacion-en-venta',
    tipo: 'tipo-adosado',
  }

  const [filters, setFilters] = useState<Filters>(initialState)
  const router = useRouter()
  const searchParams = useSearchParams()! as unknown as URLSearchParams

  const updateFilters = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const createQueryString = useCallback(
    (filters: Filters) => {
      const params = new URLSearchParams(searchParams)
      for (const [key, value] of Object.entries(filters)) {
        params.set(key, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <div className='relative mb-64 h-56 w-full bg-heroImg bg-cover bg-center bg-no-repeat pt-40 md:mb-48 lg:mb-24 lg:h-[480px]'>
      <div className='absolute grid w-full max-w-5xl auto-rows-auto grid-cols-1 gap-3 rounded-xl  bg-gray-200/80 p-4 pb-6 shadow-xl backdrop-blur md:auto-rows-min md:grid-cols-2 lg:-bottom-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4 lg:pb-4 xl:left-1/2 xl:-translate-x-1/2 '>
        <h2 className='scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight text-green-950 transition-colors first:mt-0 md:col-span-2'>
          {dict.slogan}
        </h2>

        <ToggleGroup
          className='col-span-2 md:row-start-2 lg:col-span-2 lg:col-start-2'
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
          defaultValue={initialState.tipo}
          onValueChange={(value) => updateFilters('tipo', value)}
        >
          <SelectTrigger className='hover:shadow-inset col-span-2 md:col-span-1 md:row-start-3 lg:col-span-2 lg:row-start-2'>
            <SelectValue
              className='truncate'
              placeholder='Seleccione un tipo de propiedad...'
            />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {tipoDD.map((item) => (
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
          <SelectTrigger className='col-span-2 md:col-span-1 md:col-start-2 md:row-start-3 lg:col-span-2'>
            <SelectValue placeholder={dict.filters.localizacion_placeholder} />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {localizacionDD &&
              localizacionDD.map((localizacion: ParentLocalizacion) => (
                <SelectGroup key={localizacion.value}>
                  <SelectLabel>{localizacion.name}</SelectLabel>
                  {localizacion.children &&
                    localizacion.children.map((child) => (
                      <SelectItem key={child.value} value={child.value}>
                        {child.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))}
          </SelectContent>
        </Select>
        <button
          onClick={() => handleFilters()}
          className='col-span-2 inline-flex h-9 items-center justify-center gap-1 rounded-md bg-gradient-to-b from-green-500 via-green-600 via-60% to-green-700  font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 md:col-span-2  md:row-start-4 lg:col-span-4'
        >
          <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
          {dict.filters.search_button}
        </button>
      </div>
    </div>
  )
}
