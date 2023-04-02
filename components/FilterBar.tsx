'use client'

import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

import { IFiltersDD } from '@/lib/interfaces'

import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { Collapsible } from './ui/collapsible'

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
}: IFiltersDD) {
  const [filtersDD, setFiltersDD] = useState<IFiltersDD>({
    priceRentDD,
    priceSaleDD,
    bathroomsDD,
    bedroomsDD,
    localizacionDD,
    operacionDD,
    tipoDD,
  })

  const [filters, setFilters] = useState<IFilters>({})
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

      return console.log(params.toString())
    },
    [searchParams]
  )

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <div className="flex items-center gap-2 border-b-2 border-zinc-200 px-4 py-2 md:px-6">
      <Select onValueChange={(value) => updateFilters('operacion', value)}>
        <SelectTrigger className="self-stretch">
          <SelectValue placeholder="Tipo de Operacion" className="text-left" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]"
        >
          {filtersDD.operacionDD?.map((item) => (
            <SelectItem key={item} value={item}>
              {item.replace('-', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="tipo">Tipo de propiedad</Label>
        <Select
          name="tipo"
          defaultValue="Todas"
          onValueChange={(value) => updateFilters('tipo', value)}
        >
          <SelectTrigger className="self-stretch">
            <SelectValue
              placeholder="Tipo de Propiedad"
              className="text-left"
            />
          </SelectTrigger>
          <SelectContent>
            {filtersDD.tipoDD?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={handleFilters}
        className="flex gap-1 rounded-md bg-green-600 p-2 text-white"
      >
        <SearchIcon className="h-6 w-6" />
        <span className="sr-only hidden md:inline">Buscar</span>
      </button>
    </div>
  )
}
