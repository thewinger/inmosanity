import { arrayToString, stringToArray } from '@/lib/helpers'
import { FiltersDD, ParentLocalizacion } from '@/lib/interfaces'
import * as Slider from '@radix-ui/react-slider'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useRouter, useSearchParams } from 'next/navigation'
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
  habitaciones: number
  banos: number
  operacion: string
  localizacion: string | undefined
  tipo: string
  precio: number[]
}

const FilterBar = ({
  bathroomsDD,
  bedroomsDD,
  priceRentDD,
  priceSaleDD,
  localizacionDD,
  operacionDD,
  tipoDD,
  total,
}: FiltersDD) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialState = {
    operacion: 'en-venta',
    tipo: 'tipo-adosado',
    localizacion: undefined,
    banos: bathroomsDD,
    habitaciones: bedroomsDD,
    precio: [0, priceSaleDD],
  }
  const [filters, setFilters] = useState<Filters>(initialState)
  const [priceLive, setPriceLive] = useState<number[]>([
    filters.precio[0],
    filters.precio[1],
  ])
  const precioStepsRent = 100
  const precioStepsSale = 25000

  function updateFilters(key: string, value: string | number | number[]) {
    if (key === 'operacion' && value === 'en-alquiler') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        precio: [0, priceRentDD],
        [key]: value,
      }))
      setPriceLive([0, priceRentDD])
      console.log('operacion in if', filters.precio)
    } else if (key === 'operacion' && value !== 'en-alquiler') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        precio: [0, priceSaleDD],
        [key]: value as string,
      }))
      setPriceLive([0, priceSaleDD])
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }))
    }

    console.log('operacion out if', filters.precio)
  }

  function createNumArray(maxNum: number) {
    const arr: number[] = []
    for (let i = 0; i <= maxNum; i++) {
      arr.push(i)
    }
    return arr
  }

  if (searchParams) {
    for (let [key, value] of searchParams.entries()) {
      let newValue: string | number | number[] = value
      if (key === 'precio') {
        let array = stringToArray(value)
        newValue = array
        setPriceLive([newValue[0], newValue[1]])
      } else if (key === 'banos' || key === 'habitaciones') {
        newValue = Number(value)
      }
      updateFilters(key, newValue)
    }
  }

  const createQueryString = useCallback(
    (filters: Filters) => {
      const params = new URLSearchParams(searchParams || '')
      for (const [key, value] of Object.entries(filters)) {
        let newValue: string = value
        if (key === 'precio') {
          newValue = arrayToString(value)
        } else if (key === 'banos' || key === 'habitaciones') {
          newValue = value.toString()
        }
        params.set(key, newValue)
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <div className='relative'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='inset-0 w-full bg-white px-4 py-2 shadow-sm shadow-zinc-200 md:px-6 '
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
              defaultValue={filters.banos.toString()}
              onValueChange={(value) => updateFilters('banos', value)}
              aria-label='Baños'
            >
              {createNumArray(bathroomsDD).map((i) => (
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
              defaultValue={filters.habitaciones.toString()}
              onValueChange={(value) => updateFilters('habitaciones', value)}
              aria-label='Habitaciones'
            >
              {createNumArray(bedroomsDD).map((i) => (
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

          <div className='flex gap-4'>
            <div className='grid w-full  items-center justify-stretch gap-1'>
              <div className='flex justify-between'>
                <Label>Precio</Label>
                <div>
                  Desde {priceLive[0]} hasta {priceLive[1]}{' '}
                </div>
              </div>
              {filters.operacion === 'en-alquiler' ? (
                <Slider.Root
                  className='relative flex h-5 w-full touch-none select-none items-center'
                  defaultValue={[0, priceRentDD]}
                  onValueChange={(value) => setPriceLive(value)}
                  onValueCommit={(value) => updateFilters('precio', value)}
                  max={priceRentDD}
                  step={precioStepsRent}
                  minStepsBetweenThumbs={1}
                  aria-label='precio'
                >
                  <Slider.Track className='relative h-2 grow rounded-full bg-zinc-200'>
                    <Slider.Range className='absolute h-full rounded-full bg-green-600' />
                  </Slider.Track>
                  <Slider.Thumb className='block h-5 w-5 rounded-full border-2 border-green-600 bg-white shadow-sm shadow-zinc-200 ' />
                  <Slider.Thumb className='block h-5 w-5  rounded-full border-2 border-green-600 bg-white shadow-sm shadow-zinc-200 ' />
                </Slider.Root>
              ) : (
                <Slider.Root
                  className='relative flex h-5 w-full touch-none select-none items-center'
                  defaultValue={[0, priceSaleDD]}
                  onValueChange={(value) => setPriceLive(value)}
                  onValueCommit={(value) => updateFilters('precio', value)}
                  max={priceSaleDD}
                  step={precioStepsSale}
                  minStepsBetweenThumbs={1}
                  aria-label='precio'
                >
                  <Slider.Track className='relative h-2 grow rounded-full bg-zinc-200'>
                    <Slider.Range className='absolute h-full rounded-full bg-green-600' />
                  </Slider.Track>
                  <Slider.Thumb className='block h-5 w-5 rounded-full border-2 border-green-600 bg-white shadow-sm shadow-zinc-200 ' />
                  <Slider.Thumb className='block h-5 w-5  rounded-full border-2 border-green-600 bg-white shadow-sm shadow-zinc-200 ' />
                </Slider.Root>
              )}
            </div>
          </div>

          <button
            onClick={() => handleFilters()}
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
