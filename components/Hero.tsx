'use client'

import { FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
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

interface Filters {
  operacion: string
  localizacion?: string
  tipo: string
}

const Hero = (filtersInit: FiltersDD) => {
  const initialState = {
    operacion: 'en-venta',
    tipo: 'tipo-adosado',
  }

  const [filters, setFilters] = useState<Filters>(initialState)
  const router = useRouter()
  const searchParams = useSearchParams()

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
    <div className='relative mb-52 h-56 w-full bg-heroImg bg-cover bg-center bg-no-repeat pt-40'>
      <div className='absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-b to-zinc-50' />
      <div className='xbg-green-600/90 xshadow-xl relative grid w-full auto-rows-auto grid-cols-1 gap-3 rounded-b-none rounded-t-xl border-2 border-white/30 bg-zinc-200/90 p-4 pb-6 shadow-xl backdrop-blur'>
        <ToggleGroup.Root
          className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
          type='single'
          defaultValue={initialState.operacion}
          onValueChange={(value) => updateFilters('operacion', value)}
          aria-label='Tipo de operación'
        >
          {filtersInit.operacionDD.map((item) => (
            <ToggleGroup.Item
              key={item.value}
              className='xtext-white  h-10 w-full items-center justify-center rounded-md  font-medium capitalize text-zinc-700 hover:bg-input  hover:ring-1 hover:ring-zinc-200   focus:z-10 focus:outline-none  data-[state=on]:bg-input data-[state=on]:text-zinc-700 data-[state=on]:shadow-input '
              value={item.value}
            >
              {item.name}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>

        <Select
          name='tipo'
          defaultValue={initialState.tipo}
          onValueChange={(value) => updateFilters('tipo', value)}
        >
          <SelectTrigger className='hover:shadow-inset'>
            <SelectValue placeholder='Seleccione un tipo de propiedad...' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {filtersInit.tipoDD?.map((item) => (
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
          <SelectTrigger>
            <SelectValue placeholder='Selecciona una localización...' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {filtersInit.localizacionDD?.map(
              (localizacion: ParentLocalizacion) => (
                <SelectGroup key={localizacion.value}>
                  <SelectLabel>{localizacion.name}</SelectLabel>
                  {localizacion.children.map((child) => (
                    <SelectItem key={child.value} value={child.value}>
                      - {child.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )
            )}
          </SelectContent>
        </Select>
        <button
          onClick={() => handleFilters()}
          className='inline-flex h-10 items-center justify-center gap-1 rounded-md bg-gradient-to-b  from-green-500 via-green-600 via-60% to-green-700 font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 '
        >
          <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
          Buscar
        </button>
      </div>
    </div>
  )
}

export default Hero
