'use client'

import { IFiltersDD } from '@/lib/interfaces'
import TuneIcon from '@mui/icons-material/Tune'
import SearchIcon from '@mui/icons-material/Search'
import { useCallback, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Label } from './ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  const pathname = usePathname()
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
    <div className="flex items-center gap-2 border-b-2 border-zinc-200 px-4 py-2 md:px-6">
      <Select onValueChange={(value) => updateFilters('operacion', value)}>
        <SelectTrigger className="xgrow self-stretch">
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
      <Sheet>
        <SheetTrigger className="flex h-10  w-fit  items-center justify-between gap-2 rounded-md border border-zinc-300 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900">
          <span>Filtros</span>
          <TuneIcon className="h-4 w-4" />
        </SheetTrigger>
        <SheetContent position="right" size="full">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>
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
                className="flex gap-1 rounded-md bg-green-600 p-2  text-white"
              >
                <SearchIcon className="h-6 w-6" />
                <span className="hidden md:inline">Buscar</span>
              </button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <button
        onClick={handleFilters}
        className="flex gap-1 rounded-md bg-green-600 p-2  text-white"
      >
        <SearchIcon className="h-6 w-6" />
        <span className="hidden md:inline">Buscar</span>
      </button>
    </div>
  )
}
