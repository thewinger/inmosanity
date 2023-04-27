'use client'

import { createNumArray, getRoundedZeros } from '@/lib/utils'
import { FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { FadersIcon, MagnifyingGlassIcon, XIcon } from './ui/icons'
import { Label } from './ui/label'
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

const FilterBar = ({ filtersDD, searchParams }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false)
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
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
    setIsOpen(false)
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <div className='absolute inset-x-0 z-10 '>
      {/* <Dialog>
        <DialogTrigger asChild>
          <button
            className={`relative flex h-10 w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-800  shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
          >
            <FadersIcon weight='bold' size={16} />
            <span>Filtros</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
          </DialogHeader>

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
            <ToggleGroup.Root
              className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
              type='single'
              defaultValue={filters.banos}
              onValueChange={(value) => updateFilters('banos', value)}
              aria-label='Baños'
            >
              {bathroomsArrayDD.map((i) => (
                <ToggleGroup.Item
                  key={i}
                  className='xtext-white  h-10 w-full items-center justify-center rounded-md  font-medium capitalize text-zinc-700 hover:bg-input  hover:ring-1 hover:ring-zinc-200   focus:z-10 focus:outline-none  data-[state=on]:bg-input data-[state=on]:text-zinc-700 data-[state=on]:shadow-input '
                  value={i.toString()}
                >
                  {i}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>

          <div className='grid w-full  items-center justify-stretch gap-1'>
            <Label>Habitaciones</Label>
            <ToggleGroup.Root
              className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
              type='single'
              defaultValue={filters.habitaciones}
              onValueChange={(value) => updateFilters('habitaciones', value)}
              aria-label='Habitaciones'
            >
              {bedroomsArrayDD.map((i) => (
                <ToggleGroup.Item
                  key={i}
                  className='xtext-white  h-10 w-full items-center justify-center rounded-md  font-medium capitalize text-zinc-700 hover:bg-input  hover:ring-1 hover:ring-zinc-200   focus:z-10 focus:outline-none  data-[state=on]:bg-input data-[state=on]:text-zinc-700 data-[state=on]:shadow-input '
                  value={i.toString()}
                >
                  {i}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>

          <div className='inline-flex gap-4'>
            <div className='grid w-full items-center justify-stretch gap-1'>
              <div className='flex justify-between'>
                <Label>Precio min.</Label>
              </div>
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
              <div className='flex justify-between'>
                <Label>Precio max.</Label>
              </div>
              <Select
                name='precio'
                defaultValue={precioSaleArrayDD.slice(-1).toString()}
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

          <DialogFooter>
            <button
              onClick={handleFilters}
              className='inline-flex h-10 items-center justify-center gap-1 rounded-md bg-gradient-to-b  from-green-500 via-green-600 via-60% to-green-700 font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 '
            >
              <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
              Buscar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-full bg-white px-4 py-2 shadow-sm shadow-zinc-200 md:px-6 '
      >
        <CollapsibleTrigger asChild>
          <button
            className={`${
              isOpen
                ? 'bg-gradient-to-b from-zinc-100 to-zinc-50'
                : 'bg-gradient-to-b from-white to-zinc-100'
            } relative flex h-10 w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-800  shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
          >
            {isOpen ? (
              <XIcon size={16} weight='bold' />
            ) : (
              <FadersIcon weight='bold' size={16} />
            )}
            <span>Filtros</span>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className='grid w-full auto-rows-auto grid-cols-1 gap-4 data-[state="open"]:py-6 '>
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
            <ToggleGroup.Root
              className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
              type='single'
              defaultValue={filters.banos}
              onValueChange={(value) => updateFilters('banos', value)}
              aria-label='Baños'
            >
              {bathroomsArrayDD.map((i) => (
                <ToggleGroup.Item
                  key={i}
                  className='xtext-white  h-10 w-full items-center justify-center rounded-md  font-medium capitalize text-zinc-700 hover:bg-input  hover:ring-1 hover:ring-zinc-200   focus:z-10 focus:outline-none  data-[state=on]:bg-input data-[state=on]:text-zinc-700 data-[state=on]:shadow-input '
                  value={i.toString()}
                >
                  {i}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>

          <div className='grid w-full  items-center justify-stretch gap-1'>
            <Label>Habitaciones</Label>
            <ToggleGroup.Root
              className='inline-flex gap-1 rounded-lg bg-zinc-700/10 p-1'
              type='single'
              defaultValue={filters.habitaciones}
              onValueChange={(value) => updateFilters('habitaciones', value)}
              aria-label='Habitaciones'
            >
              {bedroomsArrayDD.map((i) => (
                <ToggleGroup.Item
                  key={i}
                  className='xtext-white  h-10 w-full items-center justify-center rounded-md  font-medium capitalize text-zinc-700 hover:bg-input  hover:ring-1 hover:ring-zinc-200   focus:z-10 focus:outline-none  data-[state=on]:bg-input data-[state=on]:text-zinc-700 data-[state=on]:shadow-input '
                  value={i.toString()}
                >
                  {i}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>

          {/* TODO Update valor correcto */}
          <div className='inline-flex gap-4'>
            <div className='grid w-full items-center justify-stretch gap-1'>
              <div className='flex justify-between'>
                <Label>Precio min.</Label>
              </div>
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
              <div className='flex justify-between'>
                <Label>Precio max.</Label>
              </div>
              <Select
                name='precio'
                defaultValue={precioSaleArrayDD.slice(-1).toString()}
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
            className='inline-flex h-10 items-center justify-center gap-1 rounded-md bg-gradient-to-b  from-green-500 via-green-600 via-60% to-green-700 font-medium text-white shadow-button hover:translate-y-1 hover:shadow active:from-green-600 active:via-green-600 active:to-green-600 '
          >
            <MagnifyingGlassIcon weight='bold' className='h-5 w-5' />
            Buscar
          </button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default FilterBar
