import { Faders, MagnifyingGlass } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'

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

export default function FilterBar({
  priceInit,
  bedroomsInit,
  bathroomsInit,
  tipoInit,
  operacionInit,
  localizacionInit,
}: IProps) {
  const router = useRouter()
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
    <>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Tipo de Operacion" />
        </SelectTrigger>
        <SelectContent>
          {operacionInit.map((operacion) => (
            <SelectItem value={operacion.value}>{operacion.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-300 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900">
        <span>Filtros</span>
        <Faders size={24} weight="bold" />
      </button>
      <button className="flex gap-1 rounded-md bg-green-600 p-2  text-white">
        <MagnifyingGlass size={24} weight="bold" />
        <span className="hidden md:inline">Buscar</span>
      </button>
    </>
  )
}
