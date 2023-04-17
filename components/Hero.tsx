import { IFiltersDD, IFilterString } from '@/lib/interfaces'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface IFilters {
  operacion?: string
  localizacion?: string
  tipo?: string
}

const Hero = ({
  bathroomsDD,
  bedroomsDD,
  priceRentDD,
  priceSaleDD,
  localizacionDD,
  operacionDD,
  tipoDD,
  total,
}: IFiltersDD) => {
  const [filtersDD, setFiltersDD] = useState<IFiltersDD>({
    priceRentDD,
    priceSaleDD,
    bathroomsDD,
    bedroomsDD,
    localizacionDD,
    operacionDD,
    tipoDD,
    total,
  })

  const [filters, setFilters] = useState<IFilters>({})
  const router = useRouter()
  const searchParams = useSearchParams()!

  function formatOperacionDD(arr: string[]) {
    let name = ''
    const array: IFilterString[] = []
    arr.map((item: string) => {
      if (item == 'en-alquiler') {
        name = 'Alquilar'
      } else if (item == 'en-venta') {
        name = 'Comprar'
      } else if (item == 'obra-nueva') {
        name = 'Obra nueva'
      }

      array.push({ name: name, value: item })
    })

    return array
  }

  const formattedOperacionDD = formatOperacionDD(operacionDD)

  const updateFilters = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const createQueryString = useCallback(
    (filters: IFilters) => {
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

  console.log(filtersDD.localizacionDD)
  return (
    <div className='relative mb-40 h-56 w-full bg-heroImg bg-cover bg-center bg-no-repeat pt-40'>
      <div className='relative grid w-full auto-rows-auto grid-cols-1 gap-2 rounded-b-lg rounded-t-xl bg-green-500 p-4'>
        <ToggleGroup.Root
          className='inline-flex gap-1 rounded-lg bg-green-600 p-1'
          type='single'
          defaultValue='en-venta'
          aria-label='Tipo de operación'
        >
          {formattedOperacionDD.map((item) => (
            <ToggleGroup.Item
              key={item.value}
              className='h-10 w-full items-center justify-center rounded-md bg-gradient-to-b from-green-600 to-green-600 text-base font-medium capitalize text-white hover:from-green-700 hover:to-green-700  focus:z-10 focus:outline-none  data-[state=on]:bg-input data-[state=on]:text-zinc-700 data-[state=on]:shadow-input '
              value={item.value}
            >
              {item.name}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>

        <Select
          name='tipo'
          defaultValue={filtersDD.tipoDD[0].value}
          onValueChange={(value) => updateFilters('tipo', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Seleccione un tipo de propiedad...' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {filtersDD.tipoDD?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          name='localizacion'
          defaultValue={filtersDD.localizacionDD[0].value}
          onValueChange={(value) => updateFilters('localizacion', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Seleccione una localización...' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={1}
            className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
          >
            {filtersDD.localizacionDD?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Hero
