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

      return params.toString()
    },
    [searchParams]
  )

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  return (
    <div className="relative">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="inset-0 bg-white shadow-sm shadow-zinc-200 px-4 py-2 w-full md:px-6 "
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
            <button
              className={`${
                isOpen
                  ? 'bg-gradient-to-b from-zinc-100 to-zinc-50'
                  : 'bg-gradient-to-b from-white to-zinc-50'
              } ring-1 ring-zinc-200 hover:ring-zinc-300 relative flex h-10 shrink grow-0 items-center justify-center gap-2 shadow-sm rounded-md  py-2 px-3 text-sm text-zinc-700  outline-none transition `}
            >
              <span>Filtros</span>
              {isOpen ? (
                <CloseIcon className="h-4 w-4" />
              ) : (
                <TuneIcon className="h-4 w-4" />
              )}
            </button>
          </CollapsibleTrigger>

          <button
            onClick={handleFilters}
            className="flex gap-1 rounded-md bg-gradient-to-b from-green-600 to-emerald-700 p-2 text-white"
          >
            <SearchIcon className="h-6 w-6" />
            <span className="sr-only hidden md:inline">Buscar</span>
          </button>
        </div>

        <CollapsibleContent className="flex flex-col gap-2 ">
          <div className="my-6">
            <div className="grid w-full justify-stretch max-w-sm items-center gap-1.5">
              <Label htmlFor="tipo">Tipo de propiedad</Label>
              <Select
                name="tipo"
                defaultValue="Todas"
                onValueChange={(value) => updateFilters('tipo', value)}
              >
                <SelectTrigger className="">
                  <SelectValue
                    placeholder="Seleccione un tipo de propiedad..."
                    className="text-left"
                  />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]"
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
