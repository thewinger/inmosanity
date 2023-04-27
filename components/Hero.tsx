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

const Hero = ({ operacionDD, localizacionDD, tipoDD }: FiltersDD) => {
  const initialState = {
    operacion: 'en-venta',
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
    <div className='relative mb-60 h-56 w-full bg-heroImg bg-cover bg-center bg-no-repeat pt-40 md:mb-44 lg:mb-24 lg:h-[480px]'>
      <div className='absolute left-1/2 grid w-full max-w-5xl -translate-x-1/2 auto-rows-auto grid-cols-1 gap-3 rounded-xl border-2 border-white/20 bg-zinc-200/90 p-4 pb-6 shadow-xl backdrop-blur md:grid-cols-2 md:grid-rows-3 lg:-bottom-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4 lg:pb-4'>
        <ToggleGroup.Root
          className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
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
          <SelectTrigger className='hover:shadow-inset md:col-span-1 md:row-start-2 lg:col-span-2 lg:row-start-2'>
            <SelectValue placeholder='Seleccione un tipo de propiedad...' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {tipoDD?.map((item) => (
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
          <SelectTrigger className='md:col-span-1 md:col-start-2 md:row-start-2 lg:col-span-2'>
            <SelectValue placeholder='Selecciona una localización...' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {localizacionDD?.map((localizacion: ParentLocalizacion) => (
              <SelectGroup key={localizacion.value}>
                <SelectLabel>{localizacion.name}</SelectLabel>
                {localizacion.children.map((child) => (
                  <SelectItem key={child.value} value={child.value}>
                    - {child.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <button
          onClick={() => handleFilters()}
          className='inline-flex h-9 items-center justify-center gap-1 rounded-md bg-gradient-to-b from-green-500 via-green-600 via-60%  to-green-700 font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 md:col-span-2 md:row-start-3 lg:col-span-4'
        >
          <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
          Buscar
        </button>
      </div>
    </div>
  )
}

export default Hero
