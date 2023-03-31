'use client'
import { IFiltersDD } from '@/lib/interfaces'
import TuneIcon from '@mui/icons-material/Tune'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
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

interface IFilter {
  min: string
  max: string
}

interface IFilterOption {
  name: string
  value: string
}

interface IFilters {
  priceInit: IFilter
  bedroomsInit: IFilter
  bathroomsInit: IFilter
  operacionInit: IFilterOption[]
  localizacionInit: IFilterOption[]
  tipoInit: IFilterOption[]
}

const PAGE_SIZE = 2

let priceInit = {
  min: '0',
  max: '100000',
}

let bedroomsInit = {
  min: '0',
  max: '5',
}

let bathroomsInit = {
  min: '0',
  max: '5',
}

let operacionInit = [
  {
    name: 'Todas',
    value: 'all',
  },
  {
    name: 'En Venta',
    value: 'en-venta',
  },
  {
    name: 'En Alquiler',
    value: 'en-alquiler',
  },
  {
    name: 'Obra nueva',
    value: 'obra-nueva',
  },
]

let localizacionInit = [
  {
    name: 'Todas',
    value: 'all',
  },
]

let tipoInit = [
  {
    name: 'Todas',
    value: 'all',
  },
]

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
    bathroomsDD,
    bedroomsDD,
    priceRentDD,
    priceSaleDD,
    localizacionDD,
    operacionDD,
    tipoDD,
  })
  /* const [priceState, setPriceState] = useState<IFilter>(priceInit)
  const [bedroomsState, setBedroomsState] = useState<IFilter>(bedroomsInit)
  const [bathroomsState, setbathroomsState] = useState<IFilter>(bathroomsInit)
  const [tipoState, setTipoState] = useState<IFilterOption>(tipoInit[0])
  const [operacionState, setOperacionState] = useState<IFilterOption>(
    operacionInit[0]
  )
  const [localizacionState, setLocalizacionState] = useState<IFilterOption>(
    localizacionInit[0]
  )

  useEffect(() => {}, []) */

  /* const handleApplyFilters = () => {
    const queryFilters = {
      precio: `${priceState.min}_${priceState.max}`,
      habitaciones: `${bedroomsState.min}_${bedroomsState.max}`,
      baños: `${bathroomsState.min}_${bathroomsState.max}`,
      tipo: tipoState.value,
      operacion: operacionState.value,
      localizacion: localizacionState.value,
    } */
  /* router.push({
      pathname: '/propiedades',
      query: queryFilters,
    })
  } */

  return (
    <div className="flex items-center gap-2 border-b-2 border-zinc-200 px-4 py-2 md:px-6">
      <Select>
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
                <Select name="tipo" defaultValue="Todas">
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <button className="flex gap-1 rounded-md bg-green-600 p-2  text-white">
        <SearchIcon className="h-6 w-6" />
        <span className="hidden md:inline">Buscar</span>
      </button>
    </div>
  )
}
