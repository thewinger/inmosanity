import { IFiltersDD } from '@/lib/interfaces'
import { getFiltersDropdownValues } from '@/lib/sanity.client'
import { Faders, MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface IFilter {
  min: string
  max: string
}

interface IFilterOption {
  name: string
  value: string
}

interface IProps {
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

export default function FilterBar() {
  const router = useRouter()

  const [showMore, setShowMore] = useState(false)
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const transaccionRef = useRef<HTMLButtonElement>(null)
  const buscarRef = useRef<HTMLButtonElement>(null)
  const showMoreRef = useRef<HTMLButtonElement>(null)

  const [filtersDD, setFiltersDD] = useState<IFiltersDD>()
  const [priceState, setPriceState] = useState<IFilter>(priceInit)
  const [bedroomsState, setBedroomsState] = useState<IFilter>(bedroomsInit)
  const [bathroomsState, setbathroomsState] = useState<IFilter>(bathroomsInit)
  const [tipoState, setTipoState] = useState<IFilterOption>(tipoInit[0])
  const [operacionState, setOperacionState] = useState<IFilterOption>(
    operacionInit[0]
  )
  const [localizacionState, setLocalizacionState] = useState<IFilterOption>(
    localizacionInit[0]
  )

  useEffect(() => {
    getFiltersDropdownValues().then((res) => setFiltersDD(res))
  }, [])

  console.log('filters', filtersDD)

  const handleApplyFilters = () => {
    const queryFilters = {
      precio: `${priceState.min}_${priceState.max}`,
      habitaciones: `${bedroomsState.min}_${bedroomsState.max}`,
      baños: `${bathroomsState.min}_${bathroomsState.max}`,
      tipo: tipoState.value,
      operacion: operacionState.value,
      localizacion: localizacionState.value,
    }
    router.push({
      pathname: '/propiedades',
      query: queryFilters,
    })
  }

  return (
    <div
      ref={wrapperRef} 
      className="flex items-center gap-2 border-b-2 border-zinc-200 px-4 py-2 md:px-6"
    >
      <Select>
        <SelectTrigger ref={transaccionRef} className="xgrow self-stretch">
          <SelectValue placeholder="Tipo de Operacion" className="text-left" />
        </SelectTrigger>
        <SelectContent>
          {operacionInit.map((operacion) => (
            <SelectItem key={operacion.value} value={operacion.value}>{operacion.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <button className="flex h-10  w-fit  items-center justify-between gap-2 rounded-md border border-zinc-300 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900">
        <span>Filtros</span>
        <Faders size={16} />
      </button> */}
      <Sheet>
        <SheetTrigger
          ref={showMoreRef}
          className="flex h-10  w-fit  items-center justify-between gap-2 rounded-md border border-zinc-300 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
        >
          <span>Filtros</span>
          <Faders size={16} />
        </SheetTrigger>
        <SheetContent position="bottom" size="full">
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <button
        ref={buscarRef}
        className="flex gap-1 rounded-md bg-green-600 p-2  text-white"
      >
        <MagnifyingGlass size={24} weight="bold" />
        <span className="hidden md:inline">Buscar</span>
      </button>
    </div>
  )
}
