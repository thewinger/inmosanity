'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { IFiltersDD } from '@/lib/interfaces'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

interface IFilters {
  price?: string
  bedrooms?: number
  bathrooms?: number
  operacion?: string
  localizacion?: string
  tipo?: string
}

export default function FilterBar({
  bathroomsDD,
  bedroomsDD,
  priceRentDD,
  priceSaleDD,
  localizacionDD,
  operacionDD,
  tipoDD,
  total,
}: IFiltersDD) {
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
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()!

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

  console.log(filtersDD)

  return (
    <div className='relative'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='inset-0 w-full bg-white px-4 py-2 shadow-sm shadow-zinc-200 md:px-6 '
      >
        <div className='flex items-center gap-2'>
          <Select onValueChange={(value) => updateFilters('operacion', value)}>
            <SelectTrigger className='shrink-0 grow  self-stretch'>
              <SelectValue placeholder='Tipo de operación' className='' />
            </SelectTrigger>
            <SelectContent
              position='popper'
              className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
            >
              {filtersDD.operacionDD?.map((item, i) => (
                <SelectItem key={i} value={item}>
                  {item.replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <CollapsibleTrigger asChild>
            <button
              className={`${
                isOpen
                  ? 'bg-gradient-to-b from-zinc-100 to-zinc-50'
                  : 'bg-gradient-to-b from-white to-zinc-50'
              } relative flex h-10 shrink grow-0 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-700  shadow-sm outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
            >
              <span>Filtros</span>
              {isOpen ? (
                <CloseIcon className='h-4 w-4' />
              ) : (
                <TuneIcon className='h-4 w-4' />
              )}
            </button>
          </CollapsibleTrigger>

          <button
            onClick={handleFilters}
            className='flex gap-1 rounded-md bg-gradient-to-b from-green-600 to-emerald-700 p-2 text-white'
          >
            <SearchIcon className='h-6 w-6' />
            <span className='sr-only hidden md:inline'>Buscar</span>
          </button>
        </div>

        <CollapsibleContent className=''>
          <div className='my-6 flex flex-col gap-4 '>
            <div className='grid w-full max-w-sm items-center justify-stretch gap-1.5'>
              <Label htmlFor='tipo'>Tipo de propiedad</Label>
              <Select
                name='tipo'
                onValueChange={(value) => updateFilters('tipo', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder='Seleccione un tipo de propiedad...'
                    className=''
                  />
                </SelectTrigger>
                <SelectContent
                  position='popper'
                  className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
                >
                  {filtersDD.tipoDD?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='grid w-full max-w-sm items-center justify-stretch gap-1.5'>
              <Label htmlFor='tipo'>Localizacion</Label>
              <Select
                name='localizacion'
                onValueChange={(value) => updateFilters('localizacion', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder='Seleccione localizacion...'
                    className=''
                  />
                </SelectTrigger>
                <SelectContent
                  position='popper'
                  className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
                >
                  {filtersDD.tipoDD?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
