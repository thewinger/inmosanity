'use client'

import { FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import { createNumArray, formatEUR, getRoundedZeros } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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

  let precioSaleArrayDD = createNumArray(getRoundedZeros(priceSaleDD), 50000)
  let precioRentArrayDD = createNumArray(getRoundedZeros(priceRentDD), 100)
  const [precioMinRentArrayDD, setPrecioMinRentArrayDD] = useState<number[]>([
    0, 100, 200, 300, 400, 500,
  ])
  const [precioMaxRentArrayDD, setPrecioMaxRentArrayDD] = useState<number[]>([
    100, 200, 300, 400, 500, 600,
  ])
  const [precioMinSaleArrayDD, setPrecioMinSaleArrayDD] = useState<number[]>([
    0, 50000, 100000, 150000, 200000, 250000,
  ])
  const [precioMaxSaleArrayDD, setPrecioMaxSaleArrayDD] = useState<number[]>([
    50000, 100000, 150000, 200000, 250000, 300000,
  ])

  useEffect(() => {
    setPrecioMinRentArrayDD(
      precioRentArrayDD.slice(0, precioRentArrayDD.length - 1)
    )
    setPrecioMaxRentArrayDD(
      precioRentArrayDD.slice(1, precioRentArrayDD.length)
    )
    setPrecioMinSaleArrayDD(
      precioSaleArrayDD.slice(0, precioSaleArrayDD.length - 1)
    )
    setPrecioMaxSaleArrayDD(
      precioSaleArrayDD.slice(1, precioSaleArrayDD.length)
    )
  }, [])

  const [filters, setFilters] = useState<Filters>({
    operacion: 'en-venta',
    tipo: 'tipo-adosado',
    precioMin: '0',
    precioMax: precioSaleArrayDD.slice(-1).toString(),
  })

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

  const bathroomsArrayDD = createNumArray(bathroomsDD, 1)
  const bedroomsArrayDD = createNumArray(bedroomsDD, 1)

  function handleOperacion(value: string) {
    value == 'en-alquiler'
      ? setFilters((prevFilters) => ({
          ...prevFilters,
          operacion: value,
          precioMin: precioMinRentArrayDD[0].toString(),
          precioMax: precioMaxRentArrayDD.slice(-1).toString(),
        }))
      : setFilters((prevFilters) => ({
          ...prevFilters,
          operacion: value,
          precioMin: precioMinSaleArrayDD[0].toString(),
          precioMax: precioMaxSaleArrayDD.slice(-1).toString(),
        }))
  }

  function handlePrecioMin(value: string) {
    filters.operacion == 'en-alquiler'
      ? setPrecioMaxRentArrayDD(
          precioMaxRentArrayDD.filter((f) => f > Number(value))
        )
      : setPrecioMaxSaleArrayDD(
          precioMaxSaleArrayDD.filter((f) => f > Number(value))
        )

    setFilters((prevFilters) => ({
      ...prevFilters,
      precioMin: value,
    }))
  }

  function handlePrecioMax(value: string) {
    filters.operacion == 'en-alquiler'
      ? setPrecioMinRentArrayDD(
          precioMinRentArrayDD.filter((f) => f < Number(value))
        )
      : setPrecioMinSaleArrayDD(
          precioMinSaleArrayDD.filter((f) => f < Number(value))
        )

    setFilters((prevFilters) => ({
      ...prevFilters,
      precioMax: value,
    }))
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
            handleOperacion(value)
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
        onValueChange={(value) =>
          setFilters((prevFilters) => ({
            ...prevFilters,
            tipo: value,
          }))
        }
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

      <Select
        name='localizacion'
        defaultValue={filters.localizacion}
        onValueChange={(value) =>
          setFilters((prevFilters) => ({
            ...prevFilters,
            localizacion: value,
          }))
        }
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
          onValueChange={(value) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              banos: value,
            }))
          }
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
          onValueChange={(value) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              habitaciones: value,
            }))
          }
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
            value={filters.precioMin}
            onValueChange={(value) => handlePrecioMin(value)}
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
                ? precioMinRentArrayDD.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatEUR(item)}
                    </SelectItem>
                  ))
                : precioMinSaleArrayDD.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatEUR(item)}
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
            value={filters.precioMax}
            onValueChange={(value) => handlePrecioMax(value)}
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
                ? precioMaxRentArrayDD.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatEUR(item)}
                    </SelectItem>
                  ))
                : precioMaxSaleArrayDD.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {formatEUR(item)}
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
