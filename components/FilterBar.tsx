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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'

import { Button } from './ui/button'

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

      return console.log(params.toString())
    },
    [searchParams]
  )

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-b-2 border-zinc-200 px-4 py-2 md:px-6"
    >
      <div className="flex items-center gap-2">
        <Select onValueChange={(value) => updateFilters('operacion', value)}>
          <SelectTrigger className="shrink-0 grow  self-stretch">
            <SelectValue
              placeholder="Tipo de Operacion"
              className="text-left"
            />
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

        <CollapsibleTrigger asChild>
          <button className="relative flex h-10 shrink grow-0 items-center justify-center gap-2 rounded-md bg-white bg-gradient-to-b  from-white/[0.08] py-2 px-3 text-sm text-zinc-700 shadow-[0px_1px_1px_-1px_rgb(0_0_0_/_0.08),_0px_2px_2px_-1px_rgb(0_0_0_/_0.08),_0px_0px_0px_1px_rgb(0_0_0_/_0.06),_inset_0px_1px_0px_#fff,_inset_0px_1px_2px_1px_#fff,_inset_0px_1px_2px_rgb(0_0_0_/_.06),_inset_0px_-4px_8px_-4px_rgb(0_0_0_/_0.04)] outline-none transition ">
            <span>Filtros</span>
            <TuneIcon className="h-4 w-4" />
          </button>
        </CollapsibleTrigger>

        <button
          onClick={handleFilters}
          className="flex gap-1 rounded-md bg-green-600 p-2 text-white"
        >
          <SearchIcon className="h-6 w-6" />
          <span className="sr-only hidden md:inline">Buscar</span>
        </button>
      </div>

      <CollapsibleContent className="flex flex-col gap-2">
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
      </CollapsibleContent>
    </Collapsible>
  )
}
