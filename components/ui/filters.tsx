'use client'

import { FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import { createNumArray, getRoundedZeros } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { MagnifyingGlassIcon } from '../ui/icons'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

interface Filters {
  habitaciones?: string
  banos?: string
  operacion: string
  localizacion?: string
  tipo: string
  precioMin: string
  precioMax: string
}

type FilterBarProps = {
  filtersDD: FiltersDD
  searchParams: { [key: string]: string | string[] }
}

const Filters = ({ filtersDD, searchParams }: FilterBarProps) => {
  const router = useRouter()

  const {
    bathroomsDD,
    bedroomsDD,
    operacionDD,
    localizacionDD,
    tipoDD,
    priceSaleDD,
    priceRentDD,
  } = filtersDD

  const precioSaleArrayDD = createNumArray(getRoundedZeros(priceSaleDD), 50000)
  const precioRentArrayDD = createNumArray(getRoundedZeros(priceRentDD), 100)

  let initialState = {
    operacion: 'en-venta',
    tipo: 'tipo-adosado',
    precioMin: '0',
    precioMax: precioSaleArrayDD.slice(-1).toString(),
  }

  for (const [key, value] of Object.entries(searchParams)) {
    if (key == 'operacion' && value == 'en-alquiler') {
      initialState.precioMax = precioRentArrayDD.slice(-1).toString()
    }
    initialState[key] = value
  }

  const [filters, setFilters] = useState<Filters>(initialState)

  const bathroomsArrayDD = createNumArray(bathroomsDD, 1)
  const bedroomsArrayDD = createNumArray(bedroomsDD, 1)

  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  })

  function updateFilters(key: string, value: string) {
    if (key === 'operacion' && value === 'en-alquiler') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
        precioMax: precioRentArrayDD.slice(-1).toString(),
      }))
    } else if (key == 'operacion' && value !== 'en-alquiler') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
        precioMax: precioSaleArrayDD.slice(-1).toString(),
      }))
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }))
    }

    console.log('rent', precioRentArrayDD.slice(-1).toString())
  }

  const createQueryString = useCallback((filters: Filters) => {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
      if (value !== '') {
        params.set(key, value)
      }
    }

    return params.toString()
  }, [])

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <div className='grid w-full auto-rows-auto grid-cols-1 gap-4 @container'>
      <ToggleGroup
        className='bg-zinc-700/10'
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
        defaultValue={filters.tipo}
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
          {tipoDD?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* TODO Update valor correcto y no undefined */}
      <Select
        name='localizacion'
        defaultValue={filters.localizacion}
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
          {localizacionDD?.map((localizacion: ParentLocalizacion) => (
            <SelectGroup key={localizacion.value}>
              <SelectLabel>{localizacion.name}</SelectLabel>
              {localizacion.children.map((child) => (
                <SelectItem key={child.value} value={child.value}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      <div className='grid w-full  items-center justify-stretch gap-1'>
        <Label>Baños</Label>
        <ToggleGroup
          className='bg-zinc-700/10'
          type='single'
          defaultValue={filters.banos}
          onValueChange={(value) => updateFilters('banos', value)}
          aria-label='Baños'
        >
          {bathroomsArrayDD.map((i) => (
            <ToggleGroupItem key={i} value={i.toString()}>
              {i}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className='grid w-full  items-center justify-stretch gap-1'>
        <Label>Habitaciones</Label>
        <ToggleGroup
          className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
          type='single'
          defaultValue={filters.habitaciones}
          onValueChange={(value) => updateFilters('habitaciones', value)}
          aria-label='Habitaciones'
        >
          {bedroomsArrayDD.map((i) => (
            <ToggleGroupItem key={i} value={i.toString()}>
              {i}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className='flex gap-4 @[17.5rem]:flex @[17.5rem]:flex-col'>
        <div className='grid w-full items-center justify-stretch gap-1'>
          <Label>Precio min.</Label>
          <Select
            name='precio'
            defaultValue={filters.precioMin}
            onValueChange={(value) => updateFilters('precioMin', value)}
          >
            <SelectTrigger className='hover:shadow-inset'>
              <SelectValue placeholder='Seleccione un rango de precios...' />
            </SelectTrigger>
            <SelectContent
              position='popper'
              sideOffset={1}
              className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
            >
              {filters.operacion === 'en-alquiler'
                ? precioRentArrayDD?.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatter.format(item)}
                    </SelectItem>
                  ))
                : precioSaleArrayDD?.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatter.format(item)}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>

        <div className='grid w-full items-center justify-stretch gap-1'>
          <Label>Precio max.</Label>
          <Select
            name='precio'
            defaultValue={filters.precioMax}
            onValueChange={(value) => updateFilters('precioMax', value)}
          >
            <SelectTrigger className='hover:shadow-inset'>
              <SelectValue placeholder='Seleccione un rango de precios...' />
            </SelectTrigger>
            <SelectContent
              position='popper'
              sideOffset={1}
              className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
            >
              {filters.operacion === 'en-alquiler'
                ? precioRentArrayDD?.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatter.format(item)}
                    </SelectItem>
                  ))
                : precioSaleArrayDD?.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatter.format(item)}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <button
        onClick={handleFilters}
        className='inline-flex h-10 w-full items-center justify-center gap-1 rounded-md bg-gradient-to-b  from-green-500 via-green-600 via-60% to-green-700 font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 '
      >
        <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
        Buscar
      </button>
    </div>
  )
}

export default Filters
